#!/usr/bin/env python3
"""Search a stock library, cache chosen photos locally, and register them in the
blog media manifest.

Design notes
------------
Cache, do not fetch per post. Topics repeat heavily at 20 posts a day, so every
photo is downloaded once, reviewed once, tagged once, and reused forever. That
also means no image can reach a published page without a human or agent having
looked at it first.

Originals are stored OUTSIDE the repo, at STOCK_SRC below. The deploy is
`aws s3 sync .` over the repo root, so anything inside the repo ships. Only the
resized derivatives in assets/blog-media/ belong in the repo.

The API key is read from the PEXELS_API_KEY environment variable and is never
written to disk. Do not add it to a file inside the repo, it would be published.

Pexels does not require attribution, but photographer and source URL are stored
for every image so provenance is auditable and attribution is possible later.

Usage
-----
  export PEXELS_API_KEY=...
  fetch_stock.py search "caulking gun hands" [--n 8] [--orientation landscape]
  fetch_stock.py add <photo_id> --id <manifest-id> \
      --domains interior_finish,doors_windows --modes crew_at_work \
      [--desc "override description"]
  fetch_stock.py list-stock
"""
import argparse, json, os, sys, urllib.request, urllib.parse

ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN       = os.path.join(ROOT, "blog", "media_manifest.json")
DERIV     = os.path.join(ROOT, "assets", "blog-media")
STOCK_SRC = "/Users/carlosguerrero/seomachine-jk-prestige/stock-src"   # outside the repo on purpose
WIDTHS    = [1600, 800]
AR        = 16 / 9
API       = "https://api.pexels.com/v1/search"


def key():
    k = os.environ.get("PEXELS_API_KEY", "").strip()
    if not k:
        sys.exit("ERROR set PEXELS_API_KEY in the environment. Never store it in the repo.")
    return k


def api_get(url):
    req = urllib.request.Request(url, headers={"Authorization": key(),
                                               "User-Agent": "jkprestige-blog/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def cmd_search(a):
    qs = urllib.parse.urlencode({"query": a.query, "per_page": a.n,
                                 "orientation": a.orientation})
    d = api_get(f"{API}?{qs}")
    print(f"{d.get('total_results')} results for {a.query!r}\n")
    for p in d.get("photos", []):
        print(f"  id {p['id']}")
        print(f"    alt   : {p.get('alt') or '(none)'}")
        print(f"    by    : {p.get('photographer')}")
        print(f"    size  : {p.get('width')}x{p.get('height')}")
        print(f"    review: {p['src'].get('large')}")
        print()
    print("Look at the 'review' URL before choosing. Then:")
    print("  fetch_stock.py add <id> --id <slug-style-id> --domains a,b --modes c")


def crop_resize(src, out_id):
    from PIL import Image
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if w / h > AR:
        nw = int(h * AR); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / AR); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    made = []
    for width in WIDTHS:
        dst = os.path.join(DERIV, f"{out_id}-{width}.jpg")
        r = im.resize((width, int(width / AR)), Image.LANCZOS)
        for q in (82, 76, 70, 64):
            r.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
            if os.path.getsize(dst) <= 400_000:
                break
        made.append((dst, os.path.getsize(dst)))
    return made


def cmd_add(a):
    man = json.load(open(MAN))
    if any(i["id"] == a.id for i in man["images"]):
        sys.exit(f"ERROR manifest id already exists: {a.id}")

    p = api_get(f"https://api.pexels.com/v1/photos/{a.photo_id}")
    os.makedirs(STOCK_SRC, exist_ok=True)
    os.makedirs(DERIV, exist_ok=True)

    src_path = os.path.join(STOCK_SRC, f"{a.id}.jpg")
    req = urllib.request.Request(p["src"]["original"],
                                 headers={"User-Agent": "jkprestige-blog/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(src_path, "wb") as f:
        f.write(r.read())

    made = crop_resize(src_path, a.id)

    entry = {
        "id": a.id,
        "file": None,                      # stock originals live outside the repo
        "origin": "stock",
        "desc": a.desc or (p.get("alt") or "").strip(),
        "domains": [d for d in a.domains.split(",") if d],
        "modes":   [m for m in a.modes.split(",") if m],
        "people":  a.people,
        "brand_visible": False,            # stock never carries JK marks
        "claim_risk": a.claim_risk,
        "license": "Pexels License, free for commercial use, attribution not required",
        "source": "pexels",
        "source_url": p.get("url"),
        "photographer": p.get("photographer"),
        "photographer_url": p.get("photographer_url"),
    }
    man["images"].append(entry)
    json.dump(man, open(MAN, "w"), indent=1, ensure_ascii=False)
    print(f"OK   added {a.id}")
    print(f"     desc: {entry['desc']}")
    print(f"     by  : {entry['photographer']}  {entry['source_url']}")
    for d, s in made:
        print(f"     {os.path.basename(d)}  {s//1024}KB")


def cmd_list(a):
    man = json.load(open(MAN))
    st = [i for i in man["images"] if i.get("origin") == "stock"]
    print(f"{len(st)} stock images of {len(man['images'])} total")
    for i in st:
        print(f"  {i['id']:<42} {','.join(i['domains'])[:34]:<34} {i['desc'][:46]}")


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("search"); s.add_argument("query")
    s.add_argument("--n", type=int, default=8)
    s.add_argument("--orientation", default="landscape")
    s.set_defaults(func=cmd_search)

    b = sub.add_parser("add"); b.add_argument("photo_id")
    b.add_argument("--id", required=True)
    b.add_argument("--domains", required=True)
    b.add_argument("--modes", required=True)
    b.add_argument("--desc", default="")
    b.add_argument("--people", action="store_true")
    b.add_argument("--claim-risk", dest="claim_risk", default="low",
                   choices=["low", "medium", "high"])
    b.set_defaults(func=cmd_add)

    l = sub.add_parser("list-stock"); l.set_defaults(func=cmd_list)

    a = ap.parse_args()
    a.func(a)


if __name__ == "__main__":
    main()
