#!/usr/bin/env python3
"""
JK Prestige FAQ backfill.

Injects an FAQ accordion into an ALREADY-PUBLISHED blog post without
re-publishing it, so the post's original date is preserved.

Why this exists: build_faq_html() in publish.py used a terminator of
(?=\n##|\Z), which also matches "\n###". The FAQ capture therefore ended at
the first question, qa_pairs came back empty, and the {{FAQ_SECTION}} slot
rendered as an empty string. Every post published before 2026-08-08 has the
empty slot. Re-running publish.py would fix the HTML but would also stamp the
post with today's date, so we patch the published HTML in place instead.

Two sources of FAQ content:
  1. --from-draft   : parse the ## Frequently Asked Questions section out of
                      the original markdown draft (exact original content).
  2. --from-json    : supply [{"q": ..., "a": ...}, ...] for posts whose draft
                      is gone and whose FAQ must be written fresh.

Usage:
  python3 blog/backfill_faq.py --from-draft <slug> <draft.md>
  python3 blog/backfill_faq.py --from-json  <slug> <faq.json>
  python3 blog/backfill_faq.py --check      <slug>

The emitted markup is byte-identical to what publish.py's build_faq_html()
produces, so backfilled posts are indistinguishable from newly published ones.
"""

import json
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent

# The published slot for a post with no FAQ: the template line is
# "    {{FAQ_SECTION}}" and the replacement was "", leaving a bare indent.
EMPTY_SLOT = "\n\n    \n\n  </article>"


def render_faq_html(qa_pairs):
    """Byte-for-byte identical to publish.py build_faq_html() output."""
    items = ""
    for q, a in qa_pairs:
        items += f"""
    <div class="faq-item">
      <div class="faq-q">{q.strip()}</div>
      <div class="faq-a">{a.strip()}</div>
    </div>"""
    return f"""
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  {items}
</div>"""


def faq_from_draft(draft_path):
    text = Path(draft_path).read_text()
    m = re.search(
        r"##\s+(?:FAQ|Frequently Asked Questions)(.+?)(?=\n##(?!#)|\Z)",
        text, re.DOTALL | re.IGNORECASE,
    )
    if not m:
        return []
    return re.findall(r"###\s+(.+?)\n+(.*?)(?=\n###|\Z)", m.group(1).strip(), re.DOTALL)


def post_file(slug):
    f = BLOG_DIR / slug / "index.html"
    if not f.exists():
        sys.exit(f"ERROR {slug}: no published index.html")
    return f


def inject(slug, qa_pairs):
    if len(qa_pairs) < 3:
        sys.exit(f"ERROR {slug}: need at least 3 Q/A pairs, got {len(qa_pairs)}")

    for q, a in qa_pairs:
        for label, val in (("question", q), ("answer", a)):
            if not val.strip():
                sys.exit(f"ERROR {slug}: empty {label}")
            # Raw insert matches publish.py; bare < or & would corrupt the page.
            if re.search(r"<[a-zA-Z/]", val) or "&" in val:
                sys.exit(f"ERROR {slug}: raw HTML or & in {label}: {val[:60]!r}")

    f = post_file(slug)
    html = f.read_text()

    if 'class="faq-q"' in html:
        print(f"SKIP {slug}: already has an FAQ")
        return False
    if html.count(EMPTY_SLOT) != 1:
        sys.exit(f"ERROR {slug}: expected exactly 1 empty FAQ slot, found "
                 f"{html.count(EMPTY_SLOT)}")

    faq_html = render_faq_html(qa_pairs)
    out = html.replace(EMPTY_SLOT, "\n\n    " + faq_html + "\n\n  </article>")

    # The only permitted change is the added FAQ block.
    if len(out) - len(html) != len(faq_html):
        sys.exit(f"ERROR {slug}: unexpected size delta, refusing to write")

    f.write_text(out)
    print(f"OK {slug}: injected {len(qa_pairs)} Q/A")
    return True


def check(slug):
    html = post_file(slug).read_text()
    qs = re.findall(r'class="faq-q">(.*?)</div>', html, re.DOTALL)
    as_ = re.findall(r'class="faq-a">(.*?)</div>', html, re.DOTALL)
    ok = len(qs) >= 3 and len(as_) == len(qs) and all(x.strip() for x in qs + as_)
    print(f"{'OK  ' if ok else 'BAD '} {slug}: {len(qs)}Q {len(as_)}A")
    return ok


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    mode, slug = sys.argv[1], sys.argv[2]

    if mode == "--check":
        sys.exit(0 if check(slug) else 1)

    if mode == "--from-draft":
        pairs = faq_from_draft(sys.argv[3])
        if not pairs:
            sys.exit(f"ERROR {slug}: no FAQ found in draft")
        inject(slug, pairs)
    elif mode == "--from-json":
        data = json.loads(Path(sys.argv[3]).read_text())
        inject(slug, [(d["q"], d["a"]) for d in data])
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
