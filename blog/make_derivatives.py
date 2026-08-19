#!/usr/bin/env python3
"""Build web-sized derivatives for the blog image bank.

Source images are 5-11MB PNGs at ~2700px. Nothing that large may ship.
Produces 1600w and 800w JPEGs, 16:9 centre crop, under assets/blog-media/.
Idempotent: skips a derivative that already exists and is newer than its source.
"""
import json, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "assets", "images")
OUT  = os.path.join(ROOT, "assets", "blog-media")
MAN  = os.path.join(ROOT, "blog", "media_manifest.json")
WIDTHS = [1600, 800]
AR = 16 / 9

def crop_16x9(im):
    w, h = im.size
    if w / h > AR:
        nw = int(h * AR); box = ((w - nw) // 2, 0, (w - nw) // 2 + nw, h)
    else:
        nh = int(w / AR); box = (0, (h - nh) // 2, w, (h - nh) // 2 + nh)
    return im.crop(box)

def main():
    os.makedirs(OUT, exist_ok=True)
    man = json.load(open(MAN))
    built = skipped = 0
    for entry in man["images"]:
        # stock images are fetched, cropped and cached by fetch_stock.py, and
        # their originals live outside the repo. Nothing to rebuild here.
        if entry.get("origin") == "stock":
            skipped += 2
            continue
        src = os.path.join(SRC, entry["file"])
        if not os.path.exists(src):
            print("MISSING SOURCE:", entry["file"]); sys.exit(1)
        for w in WIDTHS:
            dst = os.path.join(OUT, f"{entry['id']}-{w}.jpg")
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                skipped += 1; continue
            im = Image.open(src).convert("RGB")
            im = crop_16x9(im)
            im = im.resize((w, int(w / AR)), Image.LANCZOS)
            # step quality down until the file clears the budget; busy images
            # (brick, foliage) do not compress as well as sky and siding
            for q in (82, 76, 70, 64):
                im.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
                if os.path.getsize(dst) <= 400_000:
                    break
            built += 1
    # size guard: nothing over 400KB should ever reach the bucket
    over = [(f, os.path.getsize(os.path.join(OUT, f)))
            for f in os.listdir(OUT) if os.path.getsize(os.path.join(OUT, f)) > 400_000]
    if over:
        print("FAIL derivatives over 400KB:", over); sys.exit(1)
    tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f"OK   built {built}, skipped {skipped}, {len(os.listdir(OUT))} files, {tot/1_048_576:.1f} MB total")

if __name__ == "__main__":
    main()
