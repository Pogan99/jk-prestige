#!/usr/bin/env python3
"""
JK Prestige daily-run verification gate.

Catches the failure mode where publishing silently produces nothing but the
deploy step still runs and reports success. Run it BEFORE deploying (local
checks) and AGAIN after deploying (--live).

Usage:
  python3 blog/verify_run.py --preflight
  python3 blog/verify_run.py --local <slug> [<slug> ...]
  python3 blog/verify_run.py --live  <slug> [<slug> ...]

Exits non-zero on any failure, so it can gate a pipeline:
  python3 blog/verify_run.py --local $SLUGS || exit 1
"""

import datetime
import json
import re
import subprocess
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent
INDEX_FILE = BLOG_DIR / "index.json"
SITE = "https://jkprestigeconstruction.com"


def fail(msg):
    print(f"FAIL: {msg}")
    return 1


def preflight():
    """The publisher must actually parse under THIS interpreter before we start."""
    errs = 0
    try:
        # Builtin compile() parses in memory and writes nothing. py_compile would
        # leave a __pycache__ dir behind, and the S3 sync excludes *.py but not
        # *.pyc, so a compiled publisher could reach the live site.
        src = BLOG_DIR / "publish.py"
        compile(src.read_text(), str(src), "exec")
        print("OK   publish.py parses under this interpreter")
    except Exception as e:
        errs += fail(f"publish.py does not parse: {e}\n"
                     "      Every publish would fail silently. Fix before continuing.")
    if not (BLOG_DIR / "_post-template.html").exists():
        errs += fail("_post-template.html missing")
    if not INDEX_FILE.exists():
        errs += fail("index.json missing")
    else:
        try:
            posts = json.loads(INDEX_FILE.read_text())
            print(f"OK   index.json parses, {len(posts)} posts")
        except Exception as e:
            errs += fail(f"index.json is not valid JSON: {e}")
    return errs


def local(slugs):
    errs = 0
    # A run that starts before midnight and finishes after it will stamp posts
    # with the earlier date, so accept today or yesterday rather than false-fail.
    _today = datetime.date.today()
    valid_dates = {
        _today.strftime("%B %-d, %Y"),
        (_today - datetime.timedelta(days=1)).strftime("%B %-d, %Y"),
    }
    today = _today.strftime("%B %-d, %Y")
    posts = json.loads(INDEX_FILE.read_text())
    by_slug = {p["slug"]: p for p in posts}

    all_slugs = [p["slug"] for p in posts]
    if len(all_slugs) != len(set(all_slugs)):
        dupes = {s for s in all_slugs if all_slugs.count(s) > 1}
        errs += fail(f"duplicate slugs in index.json: {sorted(dupes)}")

    dated_today = [p["slug"] for p in posts if p.get("date") in valid_dates]
    if len(dated_today) < len(slugs):
        errs += fail(f"expected {len(slugs)} posts dated {today}, index has "
                     f"{len(dated_today)}")

    for s in slugs:
        e = by_slug.get(s)
        if e is None:
            errs += fail(f"{s}: no index.json entry")
            continue
        if e.get("date") not in valid_dates:
            errs += fail(f"{s}: dated {e.get('date')!r}, expected {today!r}")
        if not e.get("title") or not e.get("excerpt"):
            errs += fail(f"{s}: index entry missing title or excerpt")

        f = BLOG_DIR / s / "index.html"
        if not f.exists():
            errs += fail(f"{s}: no index.html written")
            continue
        h = f.read_text()
        if "{{" in h or "}}" in h:
            errs += fail(f"{s}: unreplaced template token")
        if len(h) < 9000:
            errs += fail(f"{s}: suspiciously small page ({len(h)} bytes)")
        if h.count("<h2") < 7:
            errs += fail(f"{s}: only {h.count('<h2')} h2 sections")
        qs = re.findall(r'class="faq-q">(.*?)</div>', h, re.DOTALL)
        as_ = re.findall(r'class="faq-a">(.*?)</div>', h, re.DOTALL)
        if len(qs) < 3 or len(qs) != len(as_) or any(not x.strip() for x in qs + as_):
            errs += fail(f"{s}: FAQ did not render ({len(qs)}Q {len(as_)}A)")
        if f"/blog/{s}/" not in h:
            errs += fail(f"{s}: canonical/og URL does not match its own slug")

    if not errs:
        print(f"OK   all {len(slugs)} posts verified locally, safe to deploy")
    return errs


def live(slugs):
    errs = 0
    for s in slugs:
        url = f"{SITE}/blog/{s}/"
        try:
            code = subprocess.run(
                ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", url],
                capture_output=True, text=True, timeout=30,
            ).stdout.strip()
        except Exception as e:
            errs += fail(f"{s}: request error {e}")
            continue
        if code != "200":
            errs += fail(f"{s}: live URL returned {code}")
    for path in ("/", "/blog/"):
        code = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", SITE + path],
            capture_output=True, text=True, timeout=30,
        ).stdout.strip()
        if code != "200":
            errs += fail(f"site {path} returned {code}")
    if not errs:
        print(f"OK   all {len(slugs)} posts live, site healthy")
    return errs


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    mode, slugs = sys.argv[1], sys.argv[2:]
    if mode == "--preflight":
        errs = preflight()
    elif mode == "--local":
        errs = local(slugs)
    elif mode == "--live":
        errs = live(slugs)
    else:
        sys.exit(__doc__)
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
