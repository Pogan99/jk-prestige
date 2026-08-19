#!/usr/bin/env python3
"""Inject slotted figures into an already-published blog post, in place.

Why in place: publish.py stamps date.today(), so re-publishing a live post
silently resets its date and reorders the index. See project_jk_blog_cloud.
This script never touches the head, the FAQ, or the CTA, and asserts that the
article prose is byte-identical before and after apart from the figures it adds.

Slot model, three axes so a domain-level bank still yields three relevant images:
  context : after the intro paragraph        matched on article DOMAIN
  action  : before a named body section      matched on WORK MODE
  trust   : before "When to Call JK Prestige" matched on PEOPLE

Usage:
  add_images.py --plan  <slug>                 print scored candidates per slot
  add_images.py --apply <slug> --spec <json>   inject the chosen images
  add_images.py --check <slug>                 verify what is in the post
"""
import argparse, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN  = os.path.join(ROOT, "blog", "media_manifest.json")

FIG_CSS = """<style id="post-figure-css">
.post-figure { margin: 32px 0; }
.post-figure img { width: 100%; height: auto; display: block; border-radius: 6px; background: #eef1f6; }
.post-figure figcaption { font-size: 0.88rem; color: #5b6070; line-height: 1.5; margin-top: 10px; padding-left: 12px; border-left: 3px solid #B10C2A; }
</style>"""

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
}


def load_manifest():
    return json.load(open(MAN))


def post_path(slug):
    return os.path.join(ROOT, "blog", slug, "index.html")


def read_post(slug):
    p = post_path(slug)
    if not os.path.exists(p):
        sys.exit(f"ERROR no such post: {slug}")
    return open(p, encoding="utf-8").read()


def article_text(html):
    """Visible prose only, used for the byte-identity assertion."""
    body = re.sub(r"<figure class=\"post-figure\".*?</figure>", "", html, flags=re.S)
    body = re.sub(r"<style id=\"post-figure-css\">.*?</style>", "", body, flags=re.S)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip()


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
    for slot, axis in (("context", "domains"), ("action", "modes"), ("trust", "modes")):
        out = []
        for im in man["images"]:
            if im["claim_risk"] == "high":
                continue
            if slot == "context":
                s = sum(dom.get(d, 0) * 3 for d in im["domains"])
                if "finished_result" in im["modes"]:
                    s += 1
            elif slot == "action":
                if not ({"crew_at_work", "inspection", "before_after", "plans_permits"} & set(im["modes"])):
                    continue
                s = sum(dom.get(d, 0) * 2 for d in im["domains"])
                s += 2 if "crew_at_work" in im["modes"] else 0
            else:
                if "trust_portrait" not in im["modes"]:
                    continue
                s = 3 if im["brand_visible"] else 0
                s += sum(dom.get(d, 0) for d in im["domains"])
            if s > 0:
                out.append({"id": im["id"], "score": s, "desc": im["desc"],
                            "risk": im["claim_risk"], "brand": im["brand_visible"]})
        ranked[slot] = sorted(out, key=lambda x: -x["score"])[:6]
    return ranked


def figure_html(im_id, alt, caption):
    return (
        f'<figure class="post-figure">\n'
        f'  <img src="/assets/blog-media/{im_id}-1600.jpg"\n'
        f'       srcset="/assets/blog-media/{im_id}-800.jpg 800w, /assets/blog-media/{im_id}-1600.jpg 1600w"\n'
        f'       sizes="(max-width: 840px) 100vw, 800px"\n'
        f'       width="1600" height="900" loading="lazy" decoding="async"\n'
        f'       alt="{alt}">\n'
        f'  <figcaption>{caption}</figcaption>\n'
        f'</figure>'
    )


def apply(slug, spec):
    html = read_post(slug)
    before_text = article_text(html)
    man = load_manifest()
    valid = {i["id"] for i in man["images"]}

    if 'class="post-figure"' in html:
        sys.exit(f"ERROR {slug} already has figures. Revert before re-applying.")

    used = []
    for item in spec["figures"]:
        if item["image"] not in valid:
            sys.exit(f"ERROR unknown image id: {item['image']}")
        if item["image"] in used:
            sys.exit(f"ERROR image {item['image']} used twice in one post")
        used.append(item["image"])
        for banned in ("our recent", "we built", "our project", "completed project", "our team built"):
            if banned in item["caption"].lower():
                sys.exit(f"ERROR caption makes an authorship claim: {item['caption']}")
        if "—" in item["caption"] or "—" in item["alt"]:
            sys.exit("ERROR em dash in caption or alt")

        fig = figure_html(item["image"], item["alt"], item["caption"])
        anchor = item["before"]           # inject immediately before this exact markup
        if anchor not in html:
            sys.exit(f"ERROR anchor not found in {slug}: {anchor[:70]}")
        if html.count(anchor) != 1:
            sys.exit(f"ERROR anchor is not unique in {slug}: {anchor[:70]}")
        html = html.replace(anchor, fig + "\n\n" + anchor, 1)

    # stylesheet once, right before the first figure
    first = html.index('<figure class="post-figure">')
    html = html[:first] + FIG_CSS + "\n" + html[first:]

    if article_text(html) != before_text:
        sys.exit("ERROR article prose changed. Aborting without writing.")

    open(post_path(slug), "w", encoding="utf-8").write(html)
    print(f"OK   {slug}: {len(used)} figures injected ({', '.join(used)})")


def check(slug):
    html = read_post(slug)
    figs = re.findall(r'<figure class="post-figure">.*?</figure>', html, flags=re.S)
    print(f"{slug}: {len(figs)} figures")
    for f in figs:
        src = re.search(r'src="([^"]+)"', f).group(1)
        cap = re.search(r"<figcaption>(.*?)</figcaption>", f, flags=re.S).group(1)
        alt = re.search(r'alt="([^"]*)"', f).group(1)
        missing = "" if os.path.exists(os.path.join(ROOT, src.lstrip("/"))) else "  [MISSING FILE]"
        print(f"  {src}{missing}\n    alt: {alt}\n    cap: {cap}")
    return len(figs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--plan", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--spec")
    a = ap.parse_args()
    if a.plan:
        print(json.dumps(candidates(a.slug, read_post(a.slug), load_manifest()), indent=1))
    elif a.apply:
        apply(a.slug, json.load(open(a.spec)))
    elif a.check:
        check(a.slug)
    else:
        sys.exit("pick one of --plan / --apply / --check")


if __name__ == "__main__":
    main()
