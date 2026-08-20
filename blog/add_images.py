#!/usr/bin/env python3
"""Inject reviewed, generated figures into an already-published blog post.

Why in place: publish.py stamps date.today(), so re-publishing a live post
silently resets its date and reorders the index. See project_jk_blog_cloud.
This script never touches the head, the FAQ, or the CTA, and asserts that the
article prose is byte-identical before and after apart from the figures it adds.

Slot model, three axes so a domain-level bank still yields three relevant images:
  lead       : after the intro paragraph, establishes the article's setting
  condition  : immediately before the section that explains the problem
  resolution : immediately before the section that explains the remedy/scope

Only image-bank entries explicitly approved as Codex-generated are eligible.
The script can replace old figure markup without touching article prose, FAQs,
or CTAs, and can apply the reusable visual treatment to an entire blog shell.

Usage:
  add_images.py --plan  <slug>                 print scored candidates per slot
  add_images.py --apply <slug> --spec <json>   inject the chosen images
  add_images.py --check <slug>                 verify what is in the post
  add_images.py --replace <slug> --spec <json> replace existing figures safely
  add_images.py --restyle <slug>               update only inline figure CSS
  add_images.py --restyle-shell <slug>         update only article-shell CSS
  add_images.py --restyle-shell-all             update all article-shell CSS
"""
import argparse, json, os, re, sys
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN  = os.path.join(ROOT, "blog", "media_manifest.json")

FIG_CSS = """<style id="post-figure-css">
/* Reviewed editorial media system. Image subjects are illustrative, not job claims. */
.post-figure { margin: clamp(2.25rem, 5vw, 4.5rem) 0; }
.post-figure img { width: 100%; aspect-ratio: 16 / 9; height: auto; object-fit: cover; display: block; border: 1px solid #e3e7ed; border-radius: 12px; background: #eef1f6; box-shadow: 0 18px 42px rgba(24, 30, 44, .12); }
.post-figure figcaption { max-width: 46rem; color: #596174; font-size: .91rem; line-height: 1.55; margin: 13px auto 0; padding: 0 0 0 14px; border-left: 2px solid #b10c2a; }
.post-figure-kicker { display: block; color: #7b3142; font-size: .67rem; font-weight: 800; letter-spacing: .12em; line-height: 1.2; margin-bottom: 4px; text-transform: uppercase; }
.post-figure--lead { margin-top: clamp(1.75rem, 4vw, 3.25rem); }
.post-figure--lead img { border-radius: 14px; box-shadow: 0 22px 50px rgba(24, 30, 44, .16); }
.post-figure--lead figcaption { color: #4d5668; }
.post-figure--diagnostic img { border-color: #d6b7a8; }
.post-figure--diagnostic figcaption { border-left-color: #9c4a2b; }
@media (min-width: 900px) {
  .post-figure--lead { width: calc(100% + 8rem); margin-left: -4rem; }
  .post-figure--lead figcaption { padding-left: 0; border-left: 0; }
}
@media (max-width: 640px) {
  .post-figure { margin: 2.25rem 0; }
  .post-figure img { border-radius: 9px; }
  .post-figure figcaption { font-size: .86rem; }
}
</style>"""

SHELL_CSS = """<style id="article-visual-v2">
/* Additive visual refresh for existing published articles. */
body { background: #f7f7f5; color: #252a35; }
header { box-shadow: 0 1px 0 rgba(255,255,255,.08), 0 7px 20px rgba(0,0,0,.18); }
.article-hero { background: radial-gradient(circle at 82% -20%, rgba(177,12,42,.34), transparent 36%), linear-gradient(135deg, #171b25 0%, #30303a 100%); padding: clamp(3.25rem, 8vw, 5.75rem) 20px clamp(2.75rem, 6vw, 4.75rem); }
.article-hero-inner { max-width: 760px; }
.breadcrumb { color: #a9b5ce; font-size: .76rem; letter-spacing: .01em; }
.breadcrumb a { color: #c5d2ee; }
.post-category { color: #ff5a79; font-size: .69rem; letter-spacing: .16em; }
.article-hero h1, .article-body h2, .article-body h3, .faq-section h2 { font-family: Georgia, 'Times New Roman', serif; }
.article-hero h1 { max-width: 20ch; font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 700; letter-spacing: -.03em; line-height: 1.08; }
.article-meta { color: #c0c8d9; font-size: .8rem; }
.article-wrap { max-width: 760px; padding: clamp(2.75rem, 7vw, 5rem) 20px 5rem; }
.article-body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.075rem; line-height: 1.78; }
.article-body > p:first-child { font-family: Georgia, 'Times New Roman', serif; color: #353c4c; font-size: clamp(1.18rem, 2.25vw, 1.38rem); line-height: 1.58; }
.article-body h2 { color: #202632; font-size: clamp(1.65rem, 3vw, 2.05rem); font-weight: 700; letter-spacing: -.018em; line-height: 1.2; margin-top: clamp(3rem, 7vw, 5rem); padding-top: 1.5rem; border-top: 1px solid #dce1e9; }
.article-body h3 { font-size: 1.24rem; letter-spacing: -.012em; }
.article-body table { background: #fff; border: 1px solid #dde2ea; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(30, 38, 54, .05); }
.article-body th { background: #272d39; }
.article-body td { border-bottom-color: #e7eaf0; }
.article-body blockquote { border-left-width: 3px; border-radius: 0 8px 8px 0; }
.cta-callout { background: linear-gradient(135deg, #1a202c, #343945); border: 1px solid rgba(255,255,255,.1); box-shadow: 0 18px 36px rgba(21,26,36,.18); }
@media (max-width: 640px) { .article-hero h1 { max-width: none; } .article-body { font-size: 1.02rem; } }
</style>"""

FIGURE_RE = re.compile(r'<figure[^>]*class="post-figure(?: [^"]*)?"[^>]*>.*?</figure>', re.S)
FIG_CSS_RE = re.compile(r'<style id="post-figure-css">.*?</style>\s*', re.S)
SHELL_CSS_RE = re.compile(r'<style id="article-visual-v2">.*?</style>\s*', re.S)
LEAD_META_RE = re.compile(
    r'\s*<meta (?:property="og:image(?::alt)?"|name="twitter:(?:card|image|image:alt)") [^>]*>\s*',
    re.S,
)
LEAD_SCHEMA_RE = re.compile(r'\s*<script id="article-lead-image-schema" type="application/ld\+json">.*?</script>\s*', re.S)

# domain keywords -> manifest domains. Drives the context slot.
DOMAIN_HINTS = {
    "roofing":            ["roof", "drip edge", "shingle", "flashing", "soffit", "fascia", "gable"],
    "exterior_envelope":  ["siding", "gutter", "downspout", "caulk", "weatherstrip", "exterior", "stucco"],
    "doors_windows":      ["door", "window", "screen", "jamb", "casing", "balance", "french"],
    "interior_finish":    ["drywall", "trim", "grout", "tile", "paint", "casing", "corner bead", "bath"],
    "sitework_drainage":  ["drain", "downspout", "grade", "french drain", "sump", "crawl space"],
    "deck_outdoor":       ["deck", "stair", "stringer", "ledger", "fence", "gate", "pergola"],
    "residential":        ["home", "house", "homeowner", "garage", "attic", "jacksonville"],
    "storm":              ["storm", "hurricane", "tarp", "wind", "damage"],
    "structural_framing": ["framing", "joist", "stud", "load bearing", "structural"],
    "electrical":         ["electrical", "surge", "breaker", "generator", "transfer switch", "panel", "wiring"],
    "plumbing":           ["plumbing", "sink", "toilet", "drain", "p-trap", "faucet", "water heater"],
    "renovation":         ["renovation", "remodel", "cabinet", "backsplash", "kitchen", "vanity"],
    "commercial":         ["commercial", "warehouse", "retail", "office", "tenant", "build-out"],
    "healthcare":         ["hospital", "medical", "healthcare", "clinic", "patient"],
    "custom_home":        ["custom home", "new home", "home builder", "nocatee", "ponte vedra"],
}


def load_manifest():
    return json.load(open(MAN))


def is_approved_generated(im):
    """A deliberate hard boundary around new placements.

    Legacy assets can remain on disk until references are migrated, but they
    cannot be selected or injected by this script.
    """
    return (
        im.get("origin") == "generated"
        and im.get("source") == "codex_imagegen"
        and im.get("approved_for_blog") is True
        and im.get("asset_status", "active") == "active"
    )


def approved_images(man):
    return {im["id"]: im for im in man["images"] if is_approved_generated(im)}


def post_path(slug):
    return os.path.join(ROOT, "blog", slug, "index.html")


def read_post(slug):
    p = post_path(slug)
    if not os.path.exists(p):
        sys.exit(f"ERROR no such post: {slug}")
    return open(p, encoding="utf-8").read()


def article_text(html):
    """Visible prose only, used for the byte-identity assertion."""
    body = FIGURE_RE.sub("", html)
    body = re.sub(r"<style[^>]*>.*?</style>", "", body, flags=re.S)
    body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.S)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip()


def without_figures(html):
    return FIG_CSS_RE.sub("", FIGURE_RE.sub("", html))


def sync_lead_image_metadata(html, image_id, alt, caption):
    """Give the actual lead figure page-level discoverability.

    This is HTML semantic metadata, distinct from embedded source-file metadata,
    which is stripped in manage_image_bank.py. The ImageObject is deliberately
    factual: it describes the illustration without claiming it is a JK project.
    """
    html = LEAD_META_RE.sub("\n", html)
    html = LEAD_SCHEMA_RE.sub("\n", html)
    url = f"https://jkprestigeconstruction.com/assets/blog-media/{image_id}-1600.jpg"
    tags = (
        f'<meta property="og:image" content="{url}">\n'
        f'<meta property="og:image:alt" content="{escape(alt, quote=True)}">\n'
        '<meta property="og:image:width" content="1600">\n'
        '<meta property="og:image:height" content="900">\n'
        '<meta name="twitter:card" content="summary_large_image">\n'
        f'<meta name="twitter:image" content="{url}">\n'
        f'<meta name="twitter:image:alt" content="{escape(alt, quote=True)}">\n'
    )
    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": url,
        "name": alt,
        "caption": caption,
        "width": 1600,
        "height": 900,
        "encodingFormat": "image/jpeg",
        "representativeOfPage": True,
        "contentLocation": {"@type": "Place", "name": "Jacksonville, Florida"},
    }, ensure_ascii=False)
    tags += f'<script id="article-lead-image-schema" type="application/ld+json">{schema}</script>\n'
    if "</head>" not in html:
        sys.exit("ERROR no closing head tag for lead-image metadata")
    return html.replace("</head>", tags + "</head>", 1)


def score_post(slug, html):
    hay = (slug + " " + " ".join(re.findall(r"<h[12][^>]*>(.*?)</h[12]>", html, flags=re.S))).lower()
    hay = re.sub(r"<[^>]+>", " ", hay)
    return {d: sum(1 for k in kws if k in hay) for d, kws in DOMAIN_HINTS.items()}


def candidates(slug, html, man):
    """Rank the bank per slot. High claim_risk is excluded outright from
    residential how-to posts: a recognisable finished building next to
    an article reads as a claim of authorship."""
    dom = score_post(slug, html)
    ranked = {}
    def topical_score(image_domains, multiplier):
        total = 0
        for domain in image_domains:
            # "residential" is a setting, not enough on its own to make an
            # image relevant. It only breaks ties after a specific match.
            weight = 0.2 if domain == "residential" else 1
            total += dom.get(domain, 0) * multiplier * weight
        return total

    for slot in ("lead", "condition", "resolution"):
        out = []
        for im in man["images"]:
            if not is_approved_generated(im) or im.get("claim_risk") == "high":
                continue
            if slot == "lead":
                s = topical_score(im["domains"], 3)
                if "finished_result" in im["modes"]:
                    s += 1
            elif slot == "condition":
                if not ({"crew_at_work", "inspection", "before_after", "plans_permits"} & set(im["modes"])):
                    continue
                s = topical_score(im["domains"], 2)
                s += 2 if "inspection" in im["modes"] else 0
            else:
                if not ({"crew_at_work", "finished_result", "inspection"} & set(im["modes"])):
                    continue
                s = topical_score(im["domains"], 2)
                s += 2 if "finished_result" in im["modes"] else 0
            if s > 0:
                out.append({"id": im["id"], "score": s, "desc": im["desc"],
                            "risk": im["claim_risk"], "tone": im.get("visual_tone", "clean")})
        ranked[slot] = sorted(out, key=lambda x: -x["score"])[:6]
    return ranked


def figure_html(im_id, alt, caption, lead=False, visual_tone="clean"):
    classes = ["post-figure"]
    if lead:
        classes.append("post-figure--lead")
    if visual_tone == "diagnostic":
        classes.append("post-figure--diagnostic")
    loading = "eager" if lead else "lazy"
    priority = ' fetchpriority="high"' if lead else ""
    sizes = "(max-width: 840px) 100vw, 920px" if lead else "(max-width: 840px) 100vw, 760px"
    return (
        f'<figure class="{" ".join(classes)}" data-image-id="{im_id}" data-origin="generated" data-claim-risk="low">\n'
        f'  <img src="/assets/blog-media/{im_id}-1600.jpg"\n'
        f'       srcset="/assets/blog-media/{im_id}-800.jpg 800w, /assets/blog-media/{im_id}-1600.jpg 1600w"\n'
        f'       sizes="{sizes}"\n'
        f'       width="1600" height="900" loading="{loading}" decoding="async"{priority}\n'
        f'       alt="{escape(alt, quote=True)}">\n'
        f'  <figcaption><span class="post-figure-kicker">Editorial illustration</span>{escape(caption)}</figcaption>\n'
        f'</figure>'
    )


def apply(slug, spec, replace=False):
    html = read_post(slug)
    before_text = article_text(html)
    man = load_manifest()
    valid = approved_images(man)

    if 'class="post-figure"' in html:
        if not replace:
            sys.exit(f"ERROR {slug} already has figures. Use --replace to migrate them safely.")
        html = without_figures(html)

    used = []
    for index, item in enumerate(spec["figures"]):
        if item["image"] not in valid:
            sys.exit(f"ERROR image is not an approved generated asset: {item['image']}")
        if item["image"] in used:
            sys.exit(f"ERROR image {item['image']} used twice in one post")
        used.append(item["image"])
        for banned in ("our recent", "we built", "our project", "completed project", "our team built"):
            if banned in item["caption"].lower():
                sys.exit(f"ERROR caption makes an authorship claim: {item['caption']}")
        if "—" in item["caption"] or "—" in item["alt"]:
            sys.exit("ERROR em dash in caption or alt")

        lead = item.get("lead", index == 0)
        fig = figure_html(item["image"], item["alt"], item["caption"], lead,
                          valid[item["image"]].get("visual_tone", "clean"))
        anchor = item["before"]           # inject immediately before this exact markup
        if anchor not in html:
            sys.exit(f"ERROR anchor not found in {slug}: {anchor[:70]}")
        if html.count(anchor) != 1:
            sys.exit(f"ERROR anchor is not unique in {slug}: {anchor[:70]}")
        html = html.replace(anchor, fig + "\n\n" + anchor, 1)

    # stylesheet once, right before the first figure
    first = html.index('<figure class="post-figure')
    html = html[:first] + FIG_CSS + "\n" + html[first:]

    lead_item = next((item for index, item in enumerate(spec["figures"])
                      if item.get("lead", index == 0)), spec["figures"][0])
    html = sync_lead_image_metadata(
        html, lead_item["image"], lead_item["alt"], lead_item["caption"]
    )

    if article_text(html) != before_text:
        sys.exit("ERROR article prose changed. Aborting without writing.")

    open(post_path(slug), "w", encoding="utf-8").write(html)
    print(f"OK   {slug}: {len(used)} figures injected ({', '.join(used)})")


def restyle(slug):
    html = read_post(slug)
    before_text = article_text(html)
    if not FIGURE_RE.search(html):
        sys.exit(f"ERROR {slug} has no post figures to restyle")
    html = FIG_CSS_RE.sub("", html)
    first = html.index('<figure class="post-figure')
    html = html[:first] + FIG_CSS + "\n" + html[first:]
    if article_text(html) != before_text:
        sys.exit("ERROR article prose changed. Aborting without writing.")
    open(post_path(slug), "w", encoding="utf-8").write(html)
    print(f"OK   {slug}: figure CSS refreshed")


def restyle_shell(slug):
    html = read_post(slug)
    before_text = article_text(html)
    html = SHELL_CSS_RE.sub("", html)
    if "</head>" not in html:
        sys.exit(f"ERROR {slug}: no closing head tag")
    html = html.replace("</head>", SHELL_CSS + "\n</head>", 1)
    if article_text(html) != before_text:
        sys.exit("ERROR article prose changed. Aborting without writing.")
    open(post_path(slug), "w", encoding="utf-8").write(html)
    print(f"OK   {slug}: article shell refreshed")


def restyle_shell_all():
    blog_dir = os.path.join(ROOT, "blog")
    posts = sorted(
        d for d in os.listdir(blog_dir)
        if os.path.isfile(os.path.join(blog_dir, d, "index.html"))
    )
    for slug in posts:
        restyle_shell(slug)
    print(f"OK   refreshed article shell on {len(posts)} posts")


def check(slug):
    html = read_post(slug)
    figs = FIGURE_RE.findall(html)
    print(f"{slug}: {len(figs)} figures")
    errors = []
    man = load_manifest()
    active = approved_images(man)
    if len(figs) < 3:
        errors.append(f"expected at least 3 figures, found {len(figs)}")
    for f in figs:
        src = re.search(r'src="([^"]+)"', f).group(1)
        cap = re.search(r"<figcaption>(.*?)</figcaption>", f, flags=re.S).group(1)
        alt = re.search(r'alt="([^"]*)"', f).group(1)
        missing = "" if os.path.exists(os.path.join(ROOT, src.lstrip("/"))) else "  [MISSING FILE]"
        print(f"  {src}{missing}\n    alt: {alt}\n    cap: {cap}")
        image_id = re.search(r'/assets/blog-media/([a-z0-9-]+)-1600\.jpg', src)
        if not image_id:
            errors.append(f"unexpected figure source {src}")
            continue
        image_id = image_id.group(1)
        if image_id not in active:
            errors.append(f"{image_id} is not an approved generated asset")
        if missing:
            errors.append(f"missing derivative for {image_id}")
        if len(alt.strip()) < 24:
            errors.append(f"alt text too short for {image_id}")
        visible_caption = re.sub(r"<[^>]+>", "", cap).strip()
        if len(visible_caption) < 48:
            errors.append(f"caption too short for {image_id}")
        if 'data-origin="generated"' not in f or 'data-image-id=' not in f:
            errors.append(f"missing provenance data attributes for {image_id}")
    if errors:
        print("FAIL " + "; ".join(errors))
        return 1
    print("OK   figures and provenance verified")
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug", nargs="?")
    ap.add_argument("--plan", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--replace", action="store_true")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--restyle", action="store_true")
    ap.add_argument("--restyle-shell", action="store_true")
    ap.add_argument("--restyle-shell-all", action="store_true")
    ap.add_argument("--spec")
    a = ap.parse_args()
    if a.restyle_shell_all:
        restyle_shell_all()
    elif not a.slug:
        sys.exit("a slug is required unless --restyle-shell-all is used")
    elif a.plan:
        print(json.dumps(candidates(a.slug, read_post(a.slug), load_manifest()), indent=1))
    elif a.apply or a.replace:
        if not a.spec:
            sys.exit("ERROR --apply/--replace requires --spec")
        apply(a.slug, json.load(open(a.spec)), replace=a.replace)
    elif a.check:
        sys.exit(check(a.slug))
    elif a.restyle:
        restyle(a.slug)
    elif a.restyle_shell:
        restyle_shell(a.slug)
    else:
        sys.exit("pick one of --plan / --apply / --replace / --check / --restyle / --restyle-shell")


if __name__ == "__main__":
    main()
