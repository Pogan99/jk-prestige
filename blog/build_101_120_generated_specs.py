#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 101 through 120."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path("/Users/carlosguerrero/seomachine-jk-prestige/image-bank/placements")
OUTPUT = ROOT / "blog" / "image-specs" / "placements"
INDEX = ROOT / "blog" / "index.json"
MANIFEST = ROOT / "blog" / "media_manifest.json"


def figure(image, alt, caption):
    return {"image": image, "alt": alt, "caption": caption}


OVERRIDES = {
    "how-to-convert-garage-to-living-space-jacksonville": [
        figure("garage-conversion-wall-assembly", "Framed garage-conversion wall with insulation, flashed window opening, and protected electrical box", "Plan the conversion as a wall, insulation, electrical, and weather-control assembly before finishes begin. A garage becomes living space only when its structure and building systems are coordinated."),
        figure("garage-floor-concrete-crack-prep", "Concrete garage floor with a contained crack-preparation area before a finish is installed", "Inspect the slab, moisture conditions, and level changes before covering the floor. Cosmetic finishes cannot solve movement, water entry, or a floor that needs a different repair scope."),
        figure("garage-door-exterior-context", "Clean sectional garage door at a Florida home's driveway", "Decide whether the existing garage opening will be retained, enclosed, or rebuilt as part of the envelope. Exterior changes need a coherent weather, framing, and permitting plan rather than a finish-only decision."),
    ],
    "how-to-add-half-bath-under-stairs-jacksonville": [
        figure("half-bath-under-stairs-rough-in", "Framed under-stairs half-bath with toilet drain, supply stubs, vent connection, and sloped stair underside", "Measure the usable height and plan the drain, vent, water lines, and access together before enclosing the small room. The stair geometry limits every fixture and service decision."),
        figure("toilet-flange-floor-opening", "Bathroom floor opening prepared for a toilet flange with plumbing access below", "Set the toilet location only after confirming the waste route and finished-floor elevation. The flange and finished floor need to work as one detail, not as separate last-minute tasks."),
        figure("bathroom-sink-p-trap-vanity", "Vanity cabinet interior with an accessible sink P-trap and supply valves", "Keep shutoffs and the trap accessible behind the vanity. A compact half bath still needs practical service space once the cabinet and door are in place."),
    ],
    "how-to-build-backyard-deck-jacksonville-florida": [
        figure("deck-post-footing-frame", "Pressure-treated deck frame supported by a post base on a concrete pier", "Start with the footing, post base, framing layout, and approved hardware. A deck's visible boards depend on the load path below them."),
        figure("deck-ledger-flashing-detail", "Deck ledger layered with flashing, membrane, joist hangers, and exterior fasteners", "Where a deck meets the house, flashing and attachment details control both structural support and water management. Do not bury a ledger connection behind finishes without a complete plan."),
        figure("deck-stair-stringer-landing", "Deck stair framing with a secure landing and handrail post", "Lay out stairs, landing, railing, and drainage as part of the frame rather than adding them after the platform is finished. Safe access is part of the deck's core structure."),
    ],
    "how-to-replace-garage-door-jacksonville": [
        figure("garage-door-exterior-context", "White sectional garage door on a modest Florida home", "Confirm opening dimensions, headroom, side room, and the condition of the jambs before ordering a replacement. The door system must fit the actual opening and its support conditions."),
        figure("garage-door-roller-hinge-detail", "Garage-door roller seated in a hinge track detail", "Inspect rollers, hinges, tracks, and brackets before assuming a new panel solves the problem. Spring and counterbalance work remains a professional safety task."),
        figure("garage-door-bottom-seal-detail", "Garage door meeting a clean bottom seal at a concrete slab", "Finish by checking the bottom seal, slab contact, photo-eyes, and full travel. A replacement should close evenly without scraping, binding, or leaving a weather gap."),
    ],
    "how-to-install-sliding-barn-door-jacksonville": [
        figure("sliding-barn-door-track-hanger", "Black sliding barn-door rail and hangers fastened through drywall into blocking", "Locate adequate blocking or framing before the rail is installed. The decorative door is only as secure as the structure carrying the rail."),
        figure("pocket-door-wall-cavity-inspection", "Open interior wall cavity showing framing and clear service space", "Check the wall for studs, utilities, and the support strategy before drilling. Sliding-door hardware needs a planned load path rather than fasteners placed wherever the finish surface happens to be."),
        figure("interior-door-casing-miter-detail", "Clean painted interior door casing with a tight mitered corner", "Set the rail and door clearances before completing surrounding trim. The finished opening should still read cleanly and allow the door to move without rubbing the casing."),
    ],
    "how-to-repair-drywall-holes-jacksonville": [
        figure("drywall-hole-patch-prep", "Small drywall opening prepared with a backing strip and feathered joint compound", "Match the repair method to the hole size and create solid backing before compound is applied. A thin surface skim over an unsupported opening will crack or telegraph through paint."),
        figure("drywall-corner-bead-repair-prep", "Drywall corner bead prepared for a controlled finish repair", "Keep the repair plane flat and feather transitions wider than the patch itself. Corners and edges reveal poor prep more quickly than broad wall fields."),
        figure("water-damaged-ceiling-diagnosis", "Localized ceiling staining prepared for moisture-source evaluation", "If a hole or stain follows moisture damage, identify and correct the source before closing the wall. A neat patch is not a repair if water is still reaching the assembly."),
    ],
    "how-to-replace-bathroom-vanity-jacksonville": [
        figure("bathroom-vanity-installation-layout", "Bathroom vanity placed before the countertop with drain and supply access visible", "Confirm wall backing, level, plumbing locations, and door clearances before the countertop goes on. The cabinet needs to stay secure while leaving room to service the plumbing."),
        figure("bathroom-sink-p-trap-vanity", "Vanity cabinet with accessible sink P-trap and supply valves", "Reconnect the drain and supplies without forcing their alignment. Accessible shutoffs and a correctly assembled trap make future service far less disruptive."),
        figure("bathroom-sink-pop-up-drain", "Bathroom sink drain body and pop-up linkage inside a vanity cabinet", "Test the drain, overflow, and pop-up before loading the cabinet. A slow leak is easier to find while the interior is empty and all connection points remain visible."),
    ],
    "how-to-install-ceiling-fan-jacksonville": [
        figure("ceiling-fan-rated-box-detail", "Metal ceiling electrical box and fan mounting bracket secured to framing", "Verify that the box and framing support are appropriate for the fan before hanging it. A standard light fixture box is not automatically a fan-support detail."),
        figure("bathroom-exhaust-fan-attic-housing", "Ceiling-mounted ventilation housing visible from attic framing", "Access above the ceiling often reveals framing, ducts, and wiring that affect a fan location. This is a different ceiling device, but it illustrates why the cavity should be checked before cutting or fastening."),
        figure("whole-house-surge-panel-context", "Residential electrical panel context with organized branch circuits", "Confirm the circuit, switch, and electrical condition before final assembly. When the scope reaches panel work or uncertain wiring, use a qualified electrician rather than treating a fan installation as a cosmetic task."),
    ],
    "how-to-install-lvp-flooring-jacksonville": [
        figure("lvp-flooring-underlayment-layout", "Luxury vinyl plank layout over underlayment with expansion spacers at the wall", "Check the substrate, manufacturer requirements, perimeter gaps, and layout before the first row locks together. Straight courses and room transitions are set at the beginning, not rescued at the end."),
        figure("garage-floor-concrete-crack-prep", "Concrete floor condition prepared for assessment before a finish is added", "Flatness and moisture conditions matter beneath any floating floor. This concrete example is an inspection cue: assess the actual substrate and correct active defects before covering it."),
        figure("baseboard-trim-miter-layout", "Interior baseboard trim staged for a clean finished-floor edge", "Leave the required expansion space, then use trim to cover the perimeter without pinning the floating floor. Finish details should protect the movement allowance rather than eliminate it."),
    ],
    "how-to-refinish-hardwood-floors-jacksonville": [
        figure("hardwood-floor-sanding-prep", "Strip-oak floor with a controlled sanded matte section and a parked floor sander", "Test the species, wear layer, fasteners, and existing finish before committing to sanding. Refinishing removes material, so a floor with limited thickness or movement may need a different approach."),
        figure("baseboard-trim-miter-layout", "Interior baseboard trim at a clean finished-floor edge", "Protect trim, transitions, and adjacent rooms before sanding and coating. The floor finish should be planned with the edge conditions instead of stopping abruptly at them."),
        figure("interior-door-casing-miter-detail", "Painted interior door casing with clean mitered trim", "Sequence the work so dust control, ventilation, and cure time do not damage nearby finishes. Floor refinishing is as much about controlling the room as it is about the wood surface."),
    ],
    "how-to-install-crown-molding-jacksonville": [
        figure("crown-molding-miter-detail", "Primed crown molding meeting at a tight inside-corner miter", "Fit and test corner joints before final fastening. Tight, consistent profiles make caulk a finish material, not a substitute for a poor cut."),
        figure("interior-door-casing-miter-detail", "Clean painted door casing with a precise mitered corner", "Measure spring angles and account for walls that are not perfectly square. The same careful test-fit approach keeps crown joints from opening after paint."),
        figure("baseboard-trim-miter-layout", "Interior trim pieces staged for a clean mitered layout", "Plan scarf joints, corners, and paint sequencing across the room before starting a long run. Consistent trim work comes from repeatable layout, not from filling every mismatch later."),
    ],
    "how-to-paint-kitchen-cabinets-jacksonville": [
        figure("kitchen-cabinet-painting-workbench", "Cabinet door and drawer fronts staged on a clean painting workbench", "Remove and label doors, drawers, and hardware before coating. A controlled staging area makes surface prep and reinstallation more reliable than painting around hinges."),
        figure("kitchen-cabinet-installation-level", "Kitchen base cabinet run checked level before countertop installation", "Correct loose boxes, uneven faces, and damaged edges before paint. Coating can improve a sound cabinet finish, but it cannot straighten a poorly supported installation."),
        figure("kitchen-backsplash-tile-setting", "Kitchen wall prepared for backsplash tile beside installed cabinets", "Protect counters, floors, and adjacent finishes while the coatings cure. Kitchen projects overlap, so schedule painting around tile, plumbing, and hardware work rather than rushing the finish."),
    ],
    "how-to-install-kitchen-cabinets-jacksonville": [
        figure("kitchen-cabinet-installation-level", "Kitchen cabinet run checked level and aligned before countertop installation", "Find studs, establish a level reference, and secure the boxes in sequence. Countertops and doors depend on the cabinet run being straight, plumb, and properly supported."),
        figure("kitchen-sink-under-cabinet-plumbing", "Kitchen sink base cabinet with supply valves, drain, and service access", "Coordinate sink, drain, water, and appliance connections before the final cabinet faces are locked in. The sink base needs access as well as a clean exterior alignment."),
        figure("kitchen-sink-undermount-clips", "Undermount kitchen sink hardware secured beneath a countertop opening", "Verify countertop and sink requirements before final fastening. Cabinet installation should leave the supports and clearances needed for the finished sink assembly."),
    ],
    "how-to-tile-kitchen-backsplash-jacksonville": [
        figure("kitchen-backsplash-tile-setting", "Kitchen backsplash tile being set in a clean prepared wall field", "Plan the layout from visible focal points and confirm the wall is flat before mixing mortar. Small alignment errors grow as tile approaches cabinets, outlets, and corners."),
        figure("kitchen-cabinet-installation-level", "Kitchen cabinets aligned level before finish work", "Use the cabinet run as a reference only after it has been checked for level and plane. A backsplash should fit the finished kitchen geometry, not hide an uneven installation."),
        figure("kitchen-sink-drop-in-countertop", "Kitchen sink seated in a clean countertop cutout", "Protect countertops, sinks, and open electrical boxes while tile is cut and grouted. Sequence the work so the backsplash finishes cleanly at fixtures and hardware."),
    ],
    "how-to-renovate-kitchen-step-by-step-jacksonville": [
        figure("kitchen-cabinet-installation-level", "Kitchen cabinet run being aligned level during renovation", "Set the renovation sequence around layout, services, cabinets, and countertop dependencies. Finishes land better when the boxes and utility locations are already verified."),
        figure("kitchen-backsplash-tile-setting", "Kitchen backsplash tile laid out on a prepared wall", "Plan finish work after the larger cabinet and countertop decisions are stable. Tile, paint, and trim should complete the kitchen rather than force a change to the underlying layout."),
        figure("kitchen-sink-under-cabinet-plumbing", "Kitchen sink base with accessible plumbing connections", "Leave access for water, drains, appliances, and future service as the room comes together. A renovation is successful when the finished kitchen is both usable and maintainable."),
    ],
    "how-to-replace-sliding-window-jacksonville": [
        figure("sliding-window-track-sash-detail", "Horizontal sliding window with sash raised from the track and rollers visible", "Inspect the frame, track, rollers, sill, and opening before choosing a replacement. A dragging sash can come from hardware, frame condition, or a larger water-management problem."),
        figure("exterior-window-flashing-sill-membrane", "Window opening with sill flashing membrane formed into a drainage pan", "Prepare the sill and flashing sequence so incidental water has a path back out. Replacement windows rely on the opening details around them, not just the new frame."),
        figure("exterior-window-brickmould-trim", "Finished exterior window trim with a sloped sill and narrow caulk joint", "Finish exterior trim and sealant without blocking drainage paths. Jacksonville wind-driven rain makes the sill, corners, and transition details part of the replacement system."),
    ],
    "how-to-replace-single-hung-window-jacksonville": [
        figure("single-hung-window-balance-detail", "Raised single-hung window sash exposing balance hardware in its jamb channel", "Confirm whether the issue is the sash balance, weatherstrip, frame, glass, or the entire unit before ordering a replacement. The visible symptom does not always define the right scope."),
        figure("exterior-window-flashing-sill-membrane", "Window opening with sill flashing membrane folded into a drainage pan", "Set the replacement on a prepared sill and integrate flashing in the correct drainage sequence. A window frame cannot compensate for a sill detail that traps water."),
        figure("exterior-window-brickmould-trim", "Finished single-hung window trim with a sloped exterior sill", "Check operation, reveals, exterior sealant, and drainage after installation. The sash should move freely while water is directed outward at the sill and trim."),
    ],
    "how-to-install-sliding-glass-door-jacksonville": [
        figure("sliding-glass-door-porch-context", "Florida porch opening with a sliding glass door and screened-lanai context", "Confirm the opening, sill condition, drainage plane, and exterior transition before setting a patio door. The threshold is part of the home's weather boundary, not just an interior finish edge."),
        figure("sliding-glass-door-track-roller", "Sliding glass door roller and lower track detail", "Keep the frame square and the track clean so the panel moves without being forced. Roller adjustment should refine an aligned installation, not compensate for a distorted opening."),
        figure("sliding-door-mortise-lock-detail", "Sliding door mortise lock and aligned strike detail", "Test the latch, panel alignment, screen, and water path before the trim is closed. A patio door needs to secure, slide, and drain as one system."),
    ],
    "how-to-replace-exterior-front-door-jacksonville": [
        figure("rotted-exterior-door-jamb-diagnosis", "Localized moisture-softened wood at the lower corner of an exterior door jamb", "Probe the sill and lower jamb before ordering a new door. Soft wood or repeated water entry can turn a door swap into a broader opening repair."),
        figure("exterior-door-threshold-sweep-detail", "Exterior door with even sweep contact at a clean aluminum threshold", "Set the frame plumb and protect the threshold drainage path before final trim. A door should seal without binding and shed water toward the exterior."),
        figure("exterior-deadbolt-strike-detail", "Exterior deadbolt latch aligned with a secure strike plate on a finished door jamb", "Verify hinge alignment, latch engagement, and deadbolt operation after the door is hung. Security hardware performs correctly only when the slab and jamb are square and stable."),
    ],
    "how-to-replace-interior-door-jacksonville": [
        figure("interior-door-casing-miter-detail", "Painted interior door casing with a tight mitered corner", "Check the rough opening, jamb, floor clearance, and casing plan before final trim. A clean reveal begins with a plumb frame, not with caulk at the end."),
        figure("french-door-hinge-detail", "Aligned door hinges with even spacing along a finished door edge", "Set hinges and shims so the slab swings freely and maintains even reveals. The hardware example shows the alignment principle; use hinges appropriate to the actual interior door."),
        figure("baseboard-trim-miter-layout", "Interior trim staged for a clean finished-floor and door-edge transition", "Finish casing, baseboard, and paint after the door is adjusted and latches correctly. Trim should complete a stable opening rather than conceal a door that rubs or drifts."),
    ],
}


def approved_ids():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {
        item["id"] for item in manifest["images"]
        if item.get("origin") == "generated" and item.get("source") == "codex_imagegen"
        and item.get("approved_for_blog") is True and item.get("asset_status") == "active"
        and item.get("metadata_stripped") is True and item.get("quality_review") == "approved"
    }


def main():
    posts = json.loads(INDEX.read_text(encoding="utf-8"))
    slugs = [item["slug"] for item in posts[100:120]]
    active = approved_ids()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    if set(slugs) != set(OVERRIDES):
        raise ValueError(f"Override mismatch. Missing: {sorted(set(slugs) - set(OVERRIDES))}; extra: {sorted(set(OVERRIDES) - set(slugs))}")
    for slug in slugs:
        original = json.loads((SOURCE / f"{slug}.json").read_text(encoding="utf-8"))
        figures = OVERRIDES[slug]
        if len(figures) != len(original["figures"]) or len(figures) != 3:
            raise ValueError(f"{slug} must have exactly three figures")
        merged = []
        for position, item in enumerate(figures):
            if item["image"] not in active:
                raise ValueError(f"{slug}: {item['image']} is not an active metadata-clean generated asset")
            merged.append({**item, "before": original["figures"][position]["before"]})
        result = {"_doc": "Generated-only replacement placement spec. Heading anchors were retained from the original reviewed placement file.", "figures": merged}
        (OUTPUT / f"{slug}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"OK   {slug}")


if __name__ == "__main__":
    main()
