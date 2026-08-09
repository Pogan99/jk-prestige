#!/usr/bin/env python3
"""
Remove markdown-conversion artifacts from already-published posts.

Dry-run by default. Pass --apply to write. Never touches index.json, so post
dates are preserved.

Two artifacts, both visible to readers on the live site:

1. <p>---</p>
   md_to_html() has no rule for markdown horizontal rules, so a "---" separator
   line in a draft became a paragraph containing three literal dashes, usually
   sitting directly above an <h2>. It carries no information: the heading
   already separates the sections. Dropping it (rather than emitting <hr>) is
   the change that cannot alter the page's design, since the stylesheet has no
   hr rule.

2. An inline FAQ block in the article body:
       <h3>FAQ</h3>
       <h3>Question?</h3>
       <p>Answer</p>
       ...
   Some drafts wrote "### FAQ" instead of "## Frequently Asked Questions".
   publish.py's stripper matches "\\n##\\s+", which does not match "###", so
   neither the stripper nor build_faq_html() saw those sections and the raw FAQ
   rendered into the body. Those posts now also have a proper accordion, so the
   page shows two FAQ sections.

   This script MERGES rather than deletes: the inline Q/A is appended to the
   accordion (skipping any question already there), and only then is the inline
   block removed. No author content is lost, and the page ends up with exactly
   one FAQ section.

Usage:
  python3 blog/clean_artifacts.py            # dry run
  python3 blog/clean_artifacts.py --apply
"""

import json
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent
INDEX_FILE = BLOG_DIR / "index.json"

HR_PARA = re.compile(r"[ \t]*<p>\s*-{3,}\s*</p>\n?")
INLINE_FAQ_START = re.compile(
    r"[ \t]*<h3>\s*(?:FAQ|FAQs|Frequently Asked Questions)\s*</h3>\s*",
    re.IGNORECASE,
)
# Drafts wrote the inline FAQ in two shapes. Shape A uses real subheadings;
# shape B puts the question in <strong> inside the answer paragraph, sometimes
# with a literal "H3:" label the author typed by hand.
QA_PAIR = re.compile(r"<h3>(.*?)</h3>\s*((?:<p>.*?</p>\s*)+)", re.DOTALL)
QA_PAIR_STRONG = re.compile(
    r"<p><strong>\s*(?:H3:\s*)?(.*?)</strong>\s*(.*?)</p>\s*", re.DOTALL
)
ACCORDION = re.compile(r'<div class="faq-section">.*?\n</div>', re.DOTALL)


def article_span(html):
    """(start, end) of the article body, excluding the CTA and FAQ accordion."""
    m = re.search(r"<article[^>]*>", html)
    if not m:
        return None
    start = m.end()
    for marker in ("<!-- Inline CTA", '<div class="faq-section">', "</article>"):
        i = html.find(marker, start)
        if i != -1:
            return start, i
    return None


def norm(q):
    return re.sub(r"[^a-z0-9]+", " ", re.sub("<[^>]+>", "", q).lower()).strip()


def faq_item(q, a):
    return (f'\n    <div class="faq-item">\n'
            f'      <div class="faq-q">{q.strip()}</div>\n'
            f'      <div class="faq-a">{a.strip()}</div>\n'
            f'    </div>')


def process(html):
    span = article_span(html)
    if span is None:
        return html, {}
    a, b = span
    head, body, tail = html[:a], html[a:b], html[b:]
    counts = {}

    # --- merge an inline FAQ block into the accordion, then drop it ---
    m = INLINE_FAQ_START.search(body)
    if m:
        region = body[m.end():]
        pattern = QA_PAIR if QA_PAIR.search(region) else QA_PAIR_STRONG
        pairs = pattern.findall(region)
        consumed = 0
        for full in pattern.finditer(region):
            consumed = full.end()
        leftover = region[consumed:].strip()
        # Only safe to remove the block if it runs to the end of the body.
        if pairs and not leftover:
            am = ACCORDION.search(tail)
            if am:
                acc = am.group(0)
                existing = {norm(q) for q in
                            re.findall(r'class="faq-q">(.*?)</div>', acc, re.DOTALL)}
                added = ""
                for q, ablock in pairs:
                    if norm(q) in existing:
                        continue
                    # Shape A wraps the answer in <p>; shape B hands it over bare.
                    paras = re.findall(r"<p>(.*?)</p>", ablock, re.DOTALL)
                    ans = " ".join(p.strip() for p in (paras or [ablock])).strip()
                    if not q.strip() or not ans:
                        continue
                    added += faq_item(q, ans)
                    existing.add(norm(q))
                if added:
                    new_acc = acc[: acc.rfind("\n</div>")] + added + "\n</div>"
                    tail = tail[: am.start()] + new_acc + tail[am.end():]
                    counts["merged_questions"] = added.count('class="faq-q"')
                body = body[: m.start()]
                counts["inline_faq_blocks"] = 1

    body, n = HR_PARA.subn("", body)
    if n:
        counts["hr_para"] = n

    return head + body + tail, counts


def main():
    apply = "--apply" in sys.argv
    posts = json.loads(INDEX_FILE.read_text())
    totals, changed, skipped = {}, 0, []

    for p in posts:
        f = BLOG_DIR / p["slug"] / "index.html"
        if not f.exists():
            continue
        html = f.read_text()
        out, counts = process(html)
        if not counts:
            continue

        # Guard rails: the accordion may only grow, headings may not vanish,
        # and no template token may appear.
        before_q = html.count('class="faq-q"')
        after_q = out.count('class="faq-q"')
        if after_q < before_q:
            skipped.append((p["slug"], "accordion shrank"))
            continue
        if out.count("<h2") != html.count("<h2"):
            skipped.append((p["slug"], "h2 count changed"))
            continue
        if "{{" in out:
            skipped.append((p["slug"], "template token"))
            continue

        changed += 1
        for k, v in counts.items():
            totals[k] = totals.get(k, 0) + v
        if apply:
            f.write_text(out)

    print(f"{'cleaned' if apply else 'would clean'} {changed} posts")
    for k, v in sorted(totals.items()):
        print(f"  {k}: {v}")
    if skipped:
        print(f"  SKIPPED {len(skipped)}: {skipped[:5]}")
    if not apply:
        print("\ndry run only, pass --apply to write")


if __name__ == "__main__":
    main()
