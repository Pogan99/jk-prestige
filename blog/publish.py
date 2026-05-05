#!/usr/bin/env python3
"""
JK Prestige Blog Publisher
Converts seomachine markdown drafts to static HTML blog posts.

Usage:
  python blog/publish.py <path-to-draft.md>

What it does:
  1. Parses the markdown draft (frontmatter + body)
  2. Renders HTML using _post-template.html
  3. Writes to blog/<slug>/index.html
  4. Updates blog/index.json with post metadata
  5. Prints next step: git add . && git push
"""

import os, sys, re, json, shutil
from datetime import date, datetime
from pathlib import Path

BLOG_DIR = Path(__file__).parent
REPO_ROOT = BLOG_DIR.parent
TEMPLATE = BLOG_DIR / "_post-template.html"
INDEX_FILE = BLOG_DIR / "index.json"

CATEGORY_LABELS = {
    "homeowner":   "Homeowner Guide",
    "hospital":    "Hospital & Medical",
    "roofing":     "Roofing",
    "commercial":  "Commercial",
    "gc-partner":  "GC Partners",
    "educational": "How-To & Education",
    "renovation":  "Renovations",
    "warehouse":   "Warehouse & Industrial",
    "local":       "Jacksonville Market",
}


def parse_draft(path: Path) -> dict:
    """Extract frontmatter and body from a seomachine markdown draft."""
    text = path.read_text()

    meta = {}

    def grab(pattern, default=""):
        m = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        return m.group(1).strip() if m else default

    meta["h1_title"]       = grab(r"^#\s+(.+)$")
    meta["meta_title"]     = grab(r"Meta Title[*\s:]+(.+)")
    meta["meta_desc"]      = grab(r"Meta Description[*\s:]+(.+)")
    meta["slug"]           = grab(r"(?:URL\s*)?Slug[*\s:]+([a-z0-9-]+)")
    meta["keyword"]        = grab(r"(?:Target\s*)?Keyword[*\s:]+(.+)")
    meta["category"]       = grab(r"Category[*\s:]+(.+)").lower().replace(" ", "-")
    meta["excerpt"]        = grab(r"(?:Excerpt|Summary)[*\s:]+(.+)")
    meta["read_minutes"]   = int(grab(r"Read\s*(?:Time|Minutes)[*\s:]+(\d+)", "5"))

    # Fallback: use first non-heading paragraph as excerpt
    if not meta["excerpt"] and meta["h1_title"]:
        paras = [l.strip() for l in text.split("\n") if l.strip() and not l.startswith("#") and not l.startswith("**")]
        meta["excerpt"] = paras[0][:200] if paras else ""

    # Slug fallback from h1
    if not meta["slug"] and meta["h1_title"]:
        meta["slug"] = re.sub(r"[^a-z0-9]+", "-", meta["h1_title"].lower()).strip("-")[:80]

    # Meta title fallback
    if not meta["meta_title"]:
        meta["meta_title"] = meta["h1_title"] + " | JK Prestige Constructor"

    meta["date_iso"]     = date.today().isoformat()
    meta["date_display"] = date.today().strftime("%B %-d, %Y")

    # Extract body (everything after the first H1 line)
    lines = text.split("\n")
    body_lines = []
    past_h1 = False
    for line in lines:
        if not past_h1 and re.match(r"^#\s+", line):
            past_h1 = True
            continue
        if past_h1:
            body_lines.append(line)
    meta["body_md"] = "\n".join(body_lines).strip()

    return meta


def md_to_html(md: str) -> str:
    """Minimal markdown → HTML converter for blog bodies."""
    lines = md.split("\n")
    html_parts = []
    in_ul = False
    in_ol = False
    in_table = False
    buffer = []

    def flush_p():
        nonlocal buffer
        text = " ".join(buffer).strip()
        if text:
            html_parts.append(f"<p>{inline(text)}</p>")
        buffer = []

    def flush_ul():
        nonlocal in_ul
        if in_ul:
            html_parts.append("</ul>")
            in_ul = False

    def flush_ol():
        nonlocal in_ol
        if in_ol:
            html_parts.append("</ol>")
            in_ol = False

    def flush_table():
        nonlocal in_table
        if in_table:
            html_parts.append("</tbody></table>")
            in_table = False

    def inline(t):
        t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
        t = re.sub(r"\*(.+?)\*", r"<em>\1</em>", t)
        t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
        t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', t)
        return t

    for line in lines:
        stripped = line.strip()

        # Headings
        if stripped.startswith("### "):
            flush_p(); flush_ul(); flush_ol(); flush_table()
            html_parts.append(f"<h3>{inline(stripped[4:])}</h3>")
            continue
        if stripped.startswith("## "):
            flush_p(); flush_ul(); flush_ol(); flush_table()
            html_parts.append(f"<h2>{inline(stripped[3:])}</h2>")
            continue
        if stripped.startswith("# "):
            flush_p(); flush_ul(); flush_ol(); flush_table()
            continue  # skip — already in <h1>

        # Blockquote
        if stripped.startswith("> "):
            flush_p(); flush_ul(); flush_ol()
            html_parts.append(f"<blockquote>{inline(stripped[2:])}</blockquote>")
            continue

        # Unordered list
        if re.match(r"^[-*]\s+", stripped):
            flush_p(); flush_ol()
            if not in_ul:
                html_parts.append("<ul>")
                in_ul = True
            html_parts.append(f"<li>{inline(re.sub(r'^[-*]\s+', '', stripped))}</li>")
            continue
        else:
            flush_ul()

        # Ordered list
        if re.match(r"^\d+\.\s+", stripped):
            flush_p(); flush_ul()
            if not in_ol:
                html_parts.append("<ol>")
                in_ol = True
            html_parts.append(f"<li>{inline(re.sub(r'^\d+\.\s+', '', stripped))}</li>")
            continue
        else:
            flush_ol()

        # Table (minimal)
        if "|" in stripped and stripped.startswith("|"):
            flush_p()
            cells = [c.strip() for c in stripped.strip("|").split("|")]
            if not in_table:
                html_parts.append('<table><thead><tr>' + "".join(f"<th>{inline(c)}</th>" for c in cells) + '</tr></thead><tbody>')
                in_table = True
            elif re.match(r"^[\|:\- ]+$", stripped):
                pass  # separator row
            else:
                html_parts.append('<tr>' + "".join(f"<td>{inline(c)}</td>" for c in cells) + '</tr>')
            continue
        else:
            flush_table()

        # Blank line = paragraph break
        if not stripped:
            flush_p()
            continue

        # Skip frontmatter-like lines
        if re.match(r"^(?:\*\*)?(Meta Title|Meta Description|URL Slug|Target Keyword|Category|Excerpt|Read Time|Read Minutes|Summary)(?:\*\*)?:", stripped):
            flush_p()
            continue

        buffer.append(stripped)

    flush_p(); flush_ul(); flush_ol(); flush_table()
    return "\n".join(html_parts)


def build_faq_html(md: str) -> str:
    """Extract FAQ section if present and render as accordion."""
    faq_match = re.search(
        r"##\s+(?:FAQ|Frequently Asked Questions)(.+?)(?=\n##|\Z)",
        md, re.DOTALL | re.IGNORECASE
    )
    if not faq_match:
        return ""

    faq_body = faq_match.group(1).strip()
    qa_pairs = re.findall(r"###\s+(.+?)\n+(.*?)(?=\n###|\Z)", faq_body, re.DOTALL)

    if not qa_pairs:
        return ""

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


def publish(draft_path: str):
    path = Path(draft_path).resolve()
    if not path.exists():
        sys.exit(f"Error: file not found: {draft_path}")

    print(f"Parsing: {path}")
    meta = parse_draft(path)

    if not meta["h1_title"]:
        sys.exit("Error: no H1 title found in draft. Add a # Heading.")
    if not meta["slug"]:
        sys.exit("Error: could not determine slug.")

    # Strip FAQ from body before converting (render separately)
    body_no_faq = re.sub(
        r"\n##\s+(?:FAQ|Frequently Asked Questions).+",
        "", meta["body_md"], flags=re.DOTALL | re.IGNORECASE
    )
    body_html = md_to_html(body_no_faq)
    faq_html  = build_faq_html(meta["body_md"])

    template = TEMPLATE.read_text()

    category = meta.get("category", "educational")
    category_label = CATEGORY_LABELS.get(category, category.replace("-", " ").title())

    html = (template
        .replace("{{META_TITLE}}", meta["meta_title"])
        .replace("{{META_DESCRIPTION}}", meta["meta_desc"])
        .replace("{{SLUG}}", meta["slug"])
        .replace("{{H1_TITLE}}", meta["h1_title"])
        .replace("{{DATE_ISO}}", meta["date_iso"])
        .replace("{{DATE_DISPLAY}}", meta["date_display"])
        .replace("{{READ_MINUTES}}", str(meta["read_minutes"]))
        .replace("{{PRIMARY_KEYWORD}}", meta["keyword"])
        .replace("{{CATEGORY_LABEL}}", category_label)
        .replace("{{ARTICLE_BODY}}", body_html)
        .replace("{{FAQ_SECTION}}", faq_html)
    )

    # Write post
    post_dir = BLOG_DIR / meta["slug"]
    post_dir.mkdir(parents=True, exist_ok=True)
    out = post_dir / "index.html"
    out.write_text(html)
    print(f"Written: {out}")

    # Update index.json
    posts = json.loads(INDEX_FILE.read_text()) if INDEX_FILE.exists() else []
    # Remove existing entry with same slug
    posts = [p for p in posts if p.get("slug") != meta["slug"]]
    posts.insert(0, {
        "slug":           meta["slug"],
        "title":          meta["h1_title"],
        "excerpt":        meta["excerpt"][:200],
        "category":       category,
        "category_label": category_label,
        "date":           meta["date_display"],
        "date_iso":       meta["date_iso"],
        "read_minutes":   meta["read_minutes"],
        "keyword":        meta["keyword"],
    })
    INDEX_FILE.write_text(json.dumps(posts, indent=2))
    print(f"Updated: {INDEX_FILE} ({len(posts)} posts)")

    print()
    print("Next step — deploy:")
    print(f"  cd {REPO_ROOT}")
    print(f"  git add blog/{meta['slug']}/ blog/index.json")
    print(f"  git commit -m 'blog: add {meta['slug']}'")
    print(f"  git push")
    print()
    print(f"Live URL (after push): https://jkprestigeconstruction.com/blog/{meta['slug']}/")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python blog/publish.py <path/to/draft.md>")
        sys.exit(1)
    publish(sys.argv[1])
