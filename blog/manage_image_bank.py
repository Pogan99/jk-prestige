#!/usr/bin/env python3
"""Audit, retire, and reversibly archive the legacy blog image bank.

The asset policy is intentionally strict:
  - active images must be Codex-generated, manually inspected, and approved;
  - legacy assets are never selected for new placements;
  - legacy files are moved, not deleted, only after no article references them.

Usage:
  manage_image_bank.py --audit
  manage_image_bank.py --mark-legacy
  manage_image_bank.py --register-spec blog/image-specs/example.json
  manage_image_bank.py --reject-id ambiguous-example --reason "visual QA did not pass"
  manage_image_bank.py --archive-unreferenced-legacy
"""
import argparse
import json
import os
import re
import shutil
import sys
from collections import Counter
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "blog" / "media_manifest.json"
IMAGES = ROOT / "assets" / "images"
MEDIA = ROOT / "assets" / "blog-media"
BLOG = ROOT / "blog"


def approved(entry):
    return (
        entry.get("origin") == "generated"
        and entry.get("source") == "codex_imagegen"
        and entry.get("approved_for_blog") is True
        and entry.get("asset_status", "active") == "active"
    )


def generated_source(entry):
    return entry.get("origin") == "generated" and entry.get("source") == "codex_imagegen"


def read_manifest():
    with MANIFEST.open(encoding="utf-8") as handle:
        return json.load(handle)


def legacy_ids(manifest):
    return {entry["id"] for entry in manifest["images"] if not generated_source(entry)}


DIAGNOSTIC_IDS = {
    "pool-deck-crack-diagnosis",
    "pool-deck-settlement-lip",
    "toilet-flange-floor-opening",
    "toilet-flange-sunken-diagnosis",
    "sliding-door-mortise-lock-detail",
}


def post_files():
    return sorted(BLOG.glob("*/index.html"))


def legacy_references(ids):
    refs = Counter()
    for page in post_files():
        html = page.read_text(encoding="utf-8")
        for image_id in ids:
            if f"/assets/blog-media/{image_id}-" in html:
                refs[image_id] += 1
    return refs


def audit(manifest):
    legacy = legacy_ids(manifest)
    refs = legacy_references(legacy)
    active = [entry for entry in manifest["images"] if approved(entry)]
    print(json.dumps({
        "images_total": len(manifest["images"]),
        "approved_generated": len(active),
        "legacy": len(legacy),
        "legacy_ids_still_referenced": len(refs),
        "legacy_article_references": sum(refs.values()),
        "top_legacy_references": refs.most_common(20),
    }, indent=2))


def mark_legacy(manifest):
    changed = 0
    for entry in manifest["images"]:
        generated = generated_source(entry)
        rejected = generated and entry.get("asset_status") == "rejected"
        active = generated and not rejected
        target_status = "rejected" if rejected else ("active" if active else "legacy")
        target_approval = bool(active)
        if entry.get("asset_status") != target_status:
            entry["asset_status"] = target_status
            changed += 1
        if entry.get("approved_for_blog") is not target_approval:
            entry["approved_for_blog"] = target_approval
            changed += 1
        if not generated and entry.get("retire_reason") != "legacy/original image-bank asset; replaced only by inspected Codex-generated media":
            entry["retire_reason"] = "legacy/original image-bank asset; replaced only by inspected Codex-generated media"
            changed += 1
        if active:
            entry["visual_tone"] = "diagnostic" if entry["id"] in DIAGNOSTIC_IDS else entry.get("visual_tone", "clean")
            entry.setdefault("metadata_stripped", False)
            entry.setdefault("quality_review", "pending")
    with MANIFEST.open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)
        handle.write("\n")
    print(f"OK   marked image-bank policy on {len(manifest['images'])} entries ({changed} field updates)")


def master_path(entry):
    source_name = entry.get("file")
    if not source_name:
        sys.exit(f"ERROR active generated image has no master path: {entry['id']}")
    source = IMAGES / source_name
    if not source.exists():
        sys.exit(f"ERROR master is missing for {entry['id']}: {source}")
    return source


def clean_master(source):
    """Rewrite a PNG without EXIF/IPTC/XMP/ICC metadata.

    The pixel data is copied into a fresh Pillow image before saving, so source
    info dictionaries cannot follow it. This is deliberately limited to masters
    that have already been visually selected for publication.
    """
    with Image.open(source) as original:
        flattened = ImageOps.exif_transpose(original)
        mode = "RGBA" if "A" in flattened.getbands() else "RGB"
        flattened = flattened.convert(mode)
        clean = Image.new(mode, flattened.size)
        clean.paste(flattened)
    temp = source.with_name(source.stem + ".metadata-cleaning" + source.suffix)
    if temp.exists():
        sys.exit(f"ERROR temporary cleanup path already exists: {temp}")
    clean.save(temp, "PNG", optimize=True)
    os.replace(temp, source)


def metadata_issues(source):
    with Image.open(source) as image:
        exif = image.getexif()
        sensitive_keys = {
            "exif", "icc_profile", "xmp", "XML:com.adobe.xmp",
            "photoshop", "iptc", "Raw profile type exif",
        }
        keys = sorted(key for key in image.info if key in sensitive_keys)
        return {"exif_tags": len(exif), "metadata_keys": keys}


def save_manifest(manifest):
    with MANIFEST.open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)
        handle.write("\n")


def register_spec(manifest, spec_path):
    """Append one already-inspected generated master using a reviewed spec."""
    path = Path(spec_path).resolve()
    if not path.exists():
        sys.exit(f"ERROR generated image spec does not exist: {path}")
    with path.open(encoding="utf-8") as handle:
        spec = json.load(handle)
    required = {"id", "file", "desc", "domains", "modes", "visual_tone", "messiness", "reuse_notes"}
    missing = sorted(required - set(spec))
    if missing:
        sys.exit(f"ERROR image spec lacks required fields: {', '.join(missing)}")
    if spec["visual_tone"] not in {"clean", "diagnostic"}:
        sys.exit("ERROR visual_tone must be clean or diagnostic")
    if spec["messiness"] not in {"clean", "moderate"}:
        sys.exit("ERROR messiness must be clean or moderate")
    if any(entry["id"] == spec["id"] for entry in manifest["images"]):
        sys.exit(f"ERROR image id already exists: {spec['id']}")
    master = IMAGES / spec["file"]
    if not master.exists():
        sys.exit(f"ERROR registered master does not exist: {master}")
    entry = {
        "id": spec["id"],
        "file": spec["file"],
        "origin": "generated",
        "desc": spec["desc"],
        "domains": spec["domains"],
        "modes": spec["modes"],
        "people": False,
        "brand_visible": False,
        "claim_risk": "low",
        "source": "codex_imagegen",
        "generated_date": "2026-08-20",
        "approved_for_blog": True,
        "asset_status": "active",
        "visual_tone": spec["visual_tone"],
        "messiness": spec["messiness"],
        "metadata_stripped": False,
        "quality_review": "pending",
        "reuse_notes": spec["reuse_notes"],
        "prompt_spec": str(path),
    }
    manifest["images"].append(entry)
    save_manifest(manifest)
    print(f"OK   registered approved generated asset {entry['id']}")


def reject_generated_asset(manifest, image_id, reason):
    """Keep a rejected generated asset out of all future placements.

    Rejection is deliberately non-destructive: the master and derivatives remain
    available for audit, but the manifest boundary prevents selection or reuse.
    """
    entry = next((item for item in manifest["images"] if item["id"] == image_id), None)
    if not entry:
        sys.exit(f"ERROR image id does not exist: {image_id}")
    if not generated_source(entry):
        sys.exit(f"ERROR only Codex-generated assets can be rejected here: {image_id}")
    if not reason.strip():
        sys.exit("ERROR rejection reason cannot be empty")
    entry["approved_for_blog"] = False
    entry["asset_status"] = "rejected"
    entry["quality_review"] = "rejected"
    entry["rejection_reason"] = reason.strip()
    save_manifest(manifest)
    print(f"OK   rejected generated asset {image_id}; it is now blocked from placement")


def sanitize_approved_masters(manifest):
    selected = [entry for entry in manifest["images"] if approved(entry)]
    if not selected:
        sys.exit("ERROR no approved generated images found; run --mark-legacy first")
    for entry in selected:
        source = master_path(entry)
        clean_master(source)
        issues = metadata_issues(source)
        if issues["exif_tags"] or issues["metadata_keys"]:
            sys.exit(f"ERROR metadata remains on {entry['id']}: {issues}")
        entry["metadata_stripped"] = True
        entry["quality_review"] = "approved"
    save_manifest(manifest)
    print(f"OK   stripped metadata and marked {len(selected)} approved masters as visually reviewed")


def verify_approved_metadata(manifest):
    problems = []
    for entry in (entry for entry in manifest["images"] if approved(entry)):
        source = master_path(entry)
        issues = metadata_issues(source)
        if issues["exif_tags"] or issues["metadata_keys"] or not entry.get("metadata_stripped"):
            problems.append({"id": entry["id"], **issues, "manifest_marked": entry.get("metadata_stripped", False)})
    if problems:
        print(json.dumps({"ok": False, "problems": problems}, indent=2))
        sys.exit(1)
    print(f"OK   metadata clean on {sum(1 for entry in manifest['images'] if approved(entry))} approved masters")


def archive_unreferenced_legacy(manifest):
    legacy = legacy_ids(manifest)
    refs = legacy_references(legacy)
    if refs:
        preview = ", ".join(f"{name} ({count})" for name, count in refs.most_common(10))
        sys.exit("ERROR legacy assets are still referenced; no files moved. Top references: " + preview)

    image_archive = IMAGES / "_legacy-archive"
    media_archive = MEDIA / "_legacy-archive"
    image_archive.mkdir(parents=True, exist_ok=True)
    media_archive.mkdir(parents=True, exist_ok=True)
    moved = []
    for entry in manifest["images"]:
        if entry["id"] not in legacy:
            continue
        source_name = entry.get("file")
        if source_name:
            source = IMAGES / source_name
            if source.exists():
                target = image_archive / source.name
                if target.exists():
                    sys.exit(f"ERROR archive target already exists: {target}")
                shutil.move(str(source), str(target))
                entry["archive_master"] = str(target.relative_to(IMAGES))
                moved.append(str(target))
        for width in (800, 1600):
            source = MEDIA / f"{entry['id']}-{width}.jpg"
            if source.exists():
                target = media_archive / source.name
                if target.exists():
                    sys.exit(f"ERROR archive target already exists: {target}")
                shutil.move(str(source), str(target))
                moved.append(str(target))
        entry["asset_status"] = "archived"
    save_manifest(manifest)
    print(f"OK   moved {len(moved)} legacy files into reversible archives")


def main():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--audit", action="store_true")
    group.add_argument("--mark-legacy", action="store_true")
    group.add_argument("--archive-unreferenced-legacy", action="store_true")
    group.add_argument("--sanitize-approved-masters", action="store_true")
    group.add_argument("--verify-approved-metadata", action="store_true")
    group.add_argument("--register-spec", metavar="PATH")
    group.add_argument("--reject-id", metavar="ID")
    parser.add_argument("--reason", default="")
    args = parser.parse_args()
    manifest = read_manifest()
    if args.audit:
        audit(manifest)
    elif args.mark_legacy:
        mark_legacy(manifest)
    elif args.archive_unreferenced_legacy:
        archive_unreferenced_legacy(manifest)
    elif args.sanitize_approved_masters:
        sanitize_approved_masters(manifest)
    elif args.register_spec:
        register_spec(manifest, args.register_spec)
    elif args.reject_id:
        reject_generated_asset(manifest, args.reject_id, args.reason)
    elif args.reason:
        parser.error("--reason can only be used with --reject-id")
    else:
        verify_approved_metadata(manifest)


if __name__ == "__main__":
    main()
