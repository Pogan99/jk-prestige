#!/usr/bin/env python3
"""
Replace a published post's meta description in place, without re-publishing
(so the post's original date is preserved).

Updates all three places the description appears, keeping them consistent:
  <meta name="description">, <meta property="og:description">, and the
  JSON-LD "description" field.

Everything at and after </head> is asserted byte-identical, so this can never
touch the article body, the CTA, or the FAQ accordion.

Usage:
  python3 blog/set_meta_desc.py <slug> "New description text"
  python3 blog/set_meta_desc.py --check <slug>
"""

import json
import re
import sys
from html import escape
from pathlib import Path

BLOG_DIR = Path(__file__).parent
MAX = 160
MIN = 70


def check(slug):
    h = (BLOG_DIR / slug / "index.html").read_text()
    m = re.search(r'<meta name="description" content="(.*?)">', h, re.S)
    d = m.group(1) if m else ""
    ok = MIN <= len(d) <= MAX
    print(f"{'OK  ' if ok else 'BAD '} {slug}: {len(d)} chars")
    return ok


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--check":
        sys.exit(0 if check(sys.argv[2]) else 1)
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    slug, new = sys.argv[1], sys.argv[2].strip()
    f = BLOG_DIR / slug / "index.html"
    if not f.exists():
        sys.exit(f"ERROR {slug}: no index.html")

    if len(new) > MAX:
        sys.exit(f"ERROR {slug}: {len(new)} chars, must be <= {MAX}")
    if len(new) < MIN:
        sys.exit(f"ERROR {slug}: {len(new)} chars, too short (min {MIN})")
    if "—" in new:
        sys.exit(f"ERROR {slug}: em dash not allowed")
    if re.search(r"<[a-zA-Z/]", new):
        sys.exit(f"ERROR {slug}: HTML not allowed")

    html = f.read_text()
    i = html.find("</head>")
    if i == -1:
        sys.exit(f"ERROR {slug}: no </head>")
    head, rest = html[:i], html[i:]

    attr = escape(new, quote=True)          # safe inside content="..."
    js = json.dumps(new)[1:-1]              # safe inside a JSON string

    head2, n1 = re.subn(r'(<meta name="description" content=")(.*?)(">)',
                        lambda m: m.group(1) + attr + m.group(3), head, count=1, flags=re.S)
    head2, n2 = re.subn(r'(<meta property="og:description" content=")(.*?)(">)',
                        lambda m: m.group(1) + attr + m.group(3), head2, count=1, flags=re.S)
    head2, n3 = re.subn(r'("description":\s*")(.*?)(",)',
                        lambda m: m.group(1) + js + m.group(3), head2, count=1, flags=re.S)

    if not n1:
        sys.exit(f"ERROR {slug}: meta description not found")

    out = head2 + rest
    if out[len(head2):] != rest:
        sys.exit(f"ERROR {slug}: body changed, refusing")

    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', out, re.S)
    if m:
        try:
            json.loads(m.group(1))
        except Exception as e:
            sys.exit(f"ERROR {slug}: would break JSON-LD ({e})")

    f.write_text(out)
    print(f"OK {slug}: {len(new)} chars (meta={n1} og={n2} jsonld={n3})")


if __name__ == "__main__":
    main()
