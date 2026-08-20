#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 21 through 40.

The source placement files retain their reviewed heading anchors. This builder
swaps their legacy asset ids for active, visually reviewed generated figures
whose subject supports the paragraph that follows each anchor.
"""
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
    "how-to-repair-garage-floor-concrete-cracks-jacksonville": [
        figure(
            "garage-door-exterior-context",
            "Florida home with a white sectional garage door and dry concrete driveway",
            "A garage-floor crack should be considered in the context of the whole slab, driveway transition, roof runoff, and whether the surrounding ground has been moving.",
        ),
        figure(
            "garage-floor-concrete-crack-prep",
            "V-grooved garage-floor crack prepared for flexible filler in a Florida home",
            "Once a crack is confirmed as a surface repair, loose material and dust need to be removed so the repair material can bond to sound, dry concrete.",
        ),
        figure(
            "garage-door-bottom-seal-detail",
            "Garage door bottom seal meeting a concrete slab beside the lower track",
            "Monitoring continues after repair: slab moisture and the weather seal at the garage opening can help explain why a crack reopens after storms or seasonal changes.",
        ),
    ],
    "how-to-replace-single-hung-window-balance-jacksonville": [
        figure(
            "single-hung-window-balance-detail",
            "Raised single-hung window sash exposing a coil balance and jamb channel",
            "A sash that will not stay open should be identified by its exact window style and balance hardware before a replacement part is ordered.",
        ),
        figure(
            "exterior-window-flashing-sill-membrane",
            "Vinyl window opening with sill flashing and a visible jamb channel",
            "Dimensions, sash travel, and the jamb channel need to be recorded carefully. Similar-looking balances can have different weight ratings and attachment points.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished white exterior window trim on a Florida home after opening work",
            "After the sash operates smoothly, the frame should remain square, the weather seal even, and the exterior trim maintained through humid weather.",
        ),
    ],
    "how-to-regrout-bathroom-floor-tile-jacksonville": [
        figure(
            "bathroom-floor-grout-prep",
            "Bathroom tile floor with selected grout joints cleared for repair",
            "Open joints only make sense to regrout when the tile remains sound. A hollow, loose, or moisture-driven floor needs the cause addressed before a cosmetic finish.",
        ),
        figure(
            "toilet-flange-repair-ring",
            "Bathroom floor opening with a stainless toilet flange repair ring",
            "Fixture openings are one place to observe how the finished floor plane, grout joints, and penetrations work together. Grout should not be asked to correct movement.",
        ),
        figure(
            "shower-door-side-seal-detail",
            "Clear shower-door side seal closing evenly against a tiled bathroom jamb",
            "New grout and adjacent wet-area seals need their full cure period. Humidity and poor ventilation can make an otherwise neat repair fail early.",
        ),
    ],
    "how-to-replace-shower-door-seals-and-sweep-jacksonville": [
        figure(
            "shower-door-side-seal-detail",
            "Vertical clear shower-door side seal meeting an even tiled jamb gap",
            "Door seals work only when the door and jamb meet evenly. Check the bottom sweep, vertical seals, threshold, and frame as one water-control path.",
        ),
        figure(
            "shower-door-bottom-sweep-detail",
            "Clear shower-door bottom sweep aligned above a tile threshold",
            "Old residue has to be removed and the new sweep trimmed to fit without bowing or leaving an opening at either bottom corner.",
        ),
        figure(
            "bathroom-floor-grout-prep",
            "Bathroom floor and shower threshold prepared for careful wet-area finish work",
            "At the lower corners, tile joints and sealant condition affect where water travels. After a test shower, persistent leakage may point to frame or curb repairs.",
        ),
    ],
    "how-to-install-deck-ledger-flashing-jacksonville": [
        figure(
            "deck-ledger-flashing-detail",
            "Deck ledger with metal flashing, membrane, joist hangers, and fasteners",
            "Before flashing, inspect the ledger attachment, wall assembly, fastener layout, and any softened wood. Flashing cannot make an unsound connection safe.",
        ),
        figure(
            "deck-stair-stringer-landing",
            "Pressure-treated deck framing with a stair connection and metal supports",
            "Compatible hardware, solid structural connections, and correct drainage at exterior assemblies need attention before the deck surface closes over the work.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff directed through a rock-lined swale away from a home",
            "After heavy Florida rain, observe how runoff moves away from the house. Water that lingers at exterior connections can undermine otherwise clean flashing details.",
        ),
    ],
    "how-to-replace-deck-stair-stringers-jacksonville": [
        figure(
            "deck-stair-stringer-landing",
            "Aligned pressure-treated deck stair stringers on a concrete landing",
            "Measure the rise, run, landing, and upper attachment before removing a stringer. Small layout changes can make every tread feel uneven.",
        ),
        figure(
            "deck-ledger-flashing-detail",
            "Deck framing connection with bolted ledger, flashing, and joist hangers",
            "A stair replacement ties back into the deck framing. The upper connection needs to stay sound and aligned instead of relying on a new stringer to hide movement.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Rock-lined drainage swale carrying roof runoff away from a Florida home",
            "A firm, drained base helps outdoor wood last longer. Recheck the landing and lower stringer area after wet weather rather than allowing water to sit at end grain.",
        ),
    ],
    "how-to-install-crawl-space-vapor-barrier-jacksonville": [
        figure(
            "crawl-space-access-door-replacement",
            "Weather-resistant crawl-space access door below siding on a Florida home",
            "Inspect the crawl space for standing water, sharp debris, damaged supports, and ventilation conditions before spreading a vapor barrier.",
        ),
        figure(
            "crawl-space-vapor-barrier-seams",
            "White crawl-space vapor barrier with overlapping taped seams around block piers",
            "Continuous coverage requires overlapped seams, sealed penetrations, and careful turns at supports. Loose plastic scattered over soil does not manage ground moisture well.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout discharge routed through a swale away from a Florida foundation",
            "Crawl-space moisture control begins outside as well. Roof runoff should leave the foundation area instead of continually adding moisture beneath the house.",
        ),
    ],
    "how-to-replace-interior-door-casing-trim-jacksonville": [
        figure(
            "interior-door-casing-miter-detail",
            "White interior door casing with clean mitered corners and an even reveal",
            "Match the casing profile to the opening, wall thickness, and nearby trim before cutting. A small mismatch is obvious at every miter and return.",
        ),
        figure(
            "french-door-alignment-context",
            "Interior double-door opening with aligned hinges and an even reveal",
            "Keep the reveal even around the jamb and fasten into solid material. Trim should finish a straight opening, not pull a twisted jamb into alignment.",
        ),
        figure(
            "drywall-corner-bead-repair-prep",
            "Interior wall corner prepared with straight bead and feathered joint compound",
            "Casing and wall finish meet at a visible edge. Prime or seal cut ends before caulking and paint so humid indoor conditions do not exploit weak joints.",
        ),
    ],
    "how-to-repair-drywall-corner-bead-jacksonville": [
        figure(
            "drywall-corner-bead-repair-prep",
            "Straight metal drywall corner bead prepared for thin finish coats",
            "Remove loose compound and identify whether the bead is dented, detached, or hiding movement in the framing behind the corner.",
        ),
        figure(
            "pocket-door-wall-cavity-inspection",
            "Open interior wall cavity showing clean framing and a utility route",
            "If a corner crack keeps returning, check for movement or a framing issue before covering it with more compound. A smooth surface cannot correct a moving substrate.",
        ),
        figure(
            "interior-door-casing-miter-detail",
            "Finished interior door opening with trim set against a smooth wall plane",
            "Let each thin coat dry fully, sand gently, and prime before paint. The final wall plane should meet nearby trim without a raised repair ridge.",
        ),
    ],
    "how-to-insulate-attic-access-hatch-jacksonville": [
        figure(
            "attic-access-hatch-insulation-detail",
            "Insulated attic access hatch with weatherstrip and a raised insulation dam",
            "The hatch is part of the thermal boundary. Check the opening, weather seal, and nearby insulation before adding weight to the panel.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a ventilation path near roof trusses",
            "Fit insulation tightly to the hatch without covering a required vent or making the panel difficult to lift for service.",
        ),
        figure(
            "attic-safe-footing-access",
            "Plywood attic walkway leading safely across framing and insulation",
            "Keep a safe approach to the opening after the upgrade. A better seal is not useful if future inspections require stepping on loose insulation.",
        ),
    ],
    "how-to-replace-attic-gable-vent-jacksonville": [
        figure(
            "attic-gable-vent-exterior",
            "White louvered attic gable vent beneath a Florida roof peak",
            "A gable vent sits high in the roofline, where wind, rain, and pests can enter. Inspect the louver, trim, and surrounding wall before ordering a replacement.",
        ),
        figure(
            "attic-power-vent-fan-gable",
            "Attic ventilation equipment framed above insulation and a service walkway",
            "Ventilation works as a system. The replacement vent, attic airflow, intake path, and roof assembly should be considered together instead of as isolated parts.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Raised attic platform preserving insulation depth and a clear airflow path",
            "A damaged opening, widespread trim rot, or a combined ridge, soffit, and gable ventilation problem is a reason to evaluate the whole roof edge.",
        ),
    ],
    "how-to-replace-garage-door-rollers-and-hinges-jacksonville": [
        figure(
            "garage-door-exterior-context",
            "White sectional garage door on a modest Florida home with driveway context",
            "A garage door is a large moving assembly. Confirm that the problem is limited to rollers or hinges before disturbing springs, cables, or bottom brackets.",
        ),
        figure(
            "garage-door-roller-hinge-detail",
            "Nylon garage door roller seated in a vertical track beside a metal hinge",
            "Support the door and address one hardware component at a time. Keep clear of the spring and bottom-bracket hardware while the panel is loaded.",
        ),
        figure(
            "garage-door-bottom-seal-detail",
            "Garage door bottom seal, lower roller, track, and slab in close view",
            "If the door remains heavy, crooked, or unsafe after a simple roller or hinge repair, stop before spring or cable work and have the system assessed.",
        ),
    ],
    "how-to-adjust-french-door-alignment-jacksonville": [
        figure(
            "french-door-alignment-context",
            "White French doors with an even reveal opening to a shaded Florida porch",
            "A French-door pair depends on both leaves sharing the same reveal. Check hinges, frame movement, threshold, and the meeting edge before adjusting the strike.",
        ),
        figure(
            "french-door-hinge-detail",
            "French-door hinges with snug screws and an even gap between door leaves",
            "Resetting a loose hinge screw or adding sound backing can correct alignment. Keep hinge leaves seated flat and the jamb plumb before changing latch hardware.",
        ),
        figure(
            "interior-door-casing-miter-detail",
            "Straight interior door casing and jamb reveal in a finished room",
            "If the doors still will not latch, check for movement in the opening or wall above it before forcing the hardware into a new position.",
        ),
    ],
    "how-to-repair-rotted-exterior-door-jamb-jacksonville": [
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "The lower jamb takes standing water and splashback. Probe the jamb, threshold, trim, and adjacent wall before deciding how much material must be replaced.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished composite exterior trim with a sloped sill and narrow caulk joint",
            "A durable repair has to return the opening to a straight, drainable exterior face. New trim and sealant cannot protect wood that remains wet behind the surface.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Roof runoff moving through a shallow swale away from a Florida foundation",
            "If roof water or grade keeps wetting the opening, correct that water path as part of the repair. Otherwise a clean jamb splice can inherit the same failure.",
        ),
    ],
    "how-to-repair-sagging-fence-gate-jacksonville": [
        figure(
            "wood-fence-gate-hinge-brace",
            "Wood fence gate with strap hinges, diagonal bracing, and a latch post",
            "Check the hinge post, rails, grade, and gate frame before adjusting the latch. Sandy soil and moisture can loosen support below the visible hardware.",
        ),
        figure(
            "fence-gate-hinge-post-detail",
            "Black gate strap hinge fastened to a sturdy wood post with exterior screws",
            "The hinge side carries the gate's full weight. Sound fasteners, a stable post, and a properly braced frame matter more than forcing the latch end upward for a quick visual fix.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Runoff directed through a rock-lined swale away from outdoor structures",
            "For a gate near a pool or other safety-sensitive opening, level appearance is not enough. Confirm the post, latch, self-closing behavior, and surrounding drainage together.",
        ),
    ],
    "how-to-replace-sliding-screen-door-jacksonville": [
        figure(
            "sliding-screen-door-track-detail",
            "White sliding screen door seated in a track beside a glass patio door",
            "Salt air, sandy grit, and UV exposure affect the screen, rollers, and track together. Check the whole opening before replacing only the mesh panel.",
        ),
        figure(
            "sliding-glass-door-porch-context",
            "White sliding patio-door opening to a Florida screened porch with pavers",
            "If the frame or spline channel is bent, measure and cut carefully so the replacement panel returns square instead of forcing a damaged track to work.",
        ),
        figure(
            "sliding-glass-door-track-roller",
            "Sliding door threshold track with roller opening, weatherstrip, and drainage path",
            "A frame that is twisted, corroded, or part of a larger lanai failure may need a broader repair than a replacement screen panel.",
        ),
    ],
    "how-to-install-downspout-underground-drain-extension-jacksonville": [
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain pipe and cleanout beside a Florida home",
            "Flat, sandy lots need a planned discharge route. Start at the downspout and determine where water can go without returning to the foundation.",
        ),
        figure(
            "gutter-corner-downspout-transition",
            "Gutter corner and downspout transition at a Florida stucco home",
            "Keep the buried pipe at a steady grade away from the house. A dip in the route traps water and silt instead of carrying runoff outward.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout discharge transitioning to a shallow swale away from a foundation",
            "Drainage work is judged by where water ends up, not only by the pipe installation. Confirm the discharge point and local requirements before opening a route.",
        ),
    ],
    "how-to-replace-gutter-hangers-jacksonville": [
        figure(
            "gutter-corner-downspout-transition",
            "White rain gutter at a roof corner with fascia, soffit, and downspout transition",
            "Summer storms load gutters heavily. Inspect failed hangers, the gutter slope, fascia, and the wood behind each fastener before replacing hardware.",
        ),
        figure(
            "rain-barrel-downspout-diverter",
            "Downspout diverter and rain barrel connected to a stable paver base",
            "A gutter system only works when each component stays supported and aligned. Soft fascia or a sagging run should be corrected before fastening new hangers into the same edge.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff routed into a swale away from a Florida home foundation",
            "When hanger failure and fascia rot meet, coordinate the repair so the new gutter is not fastened back into the same unsound roof edge.",
        ),
    ],
    "how-to-replace-roof-drip-edge-jacksonville": [
        figure(
            "roof-drip-edge-underlayment-detail",
            "Metal roof drip edge with underlayment and dark shingles at a Florida eave",
            "Sun, salt air, and driving rain expose the drip edge along the lower eave. Inspect the fascia and roof deck before treating it as a simple metal swap.",
        ),
        figure(
            "skylight-flashing-finished-detail",
            "Layered roof flashing integrated with asphalt shingles around a curb-mounted skylight",
            "Eave drip edge belongs in a layered water-management sequence. Replacing it later means working existing fasteners and roof layers carefully instead of simply covering the old metal.",
        ),
        figure(
            "gutter-corner-downspout-transition",
            "Gutter edge, soffit, fascia, and downspout transition at a Florida roof corner",
            "If old metal exposes soft fascia or a spongy roof deck, the scope has changed from a parts swap into a roof-edge repair.",
        ),
    ],
    "how-to-replace-vinyl-siding-panel-jacksonville": [
        figure(
            "vinyl-siding-profile-match",
            "Matching vinyl siding profile samples beside an intact Florida exterior wall",
            "A cracked or storm-damaged panel rarely means the whole run must be replaced. Match the color, profile, and locking edge before ordering material.",
        ),
        figure(
            "exterior-window-flashing-sill-membrane",
            "Window opening with sill flashing and weather-resistive barrier before exterior trim",
            "Keep the replacement panel level before engaging the locking edge. A small error can telegraph through the wall and hide a larger water-control issue behind the siding.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior trim and siding transition on a Florida home",
            "If the wall behind a panel is soft or the surrounding siding is brittle, inspect the wider envelope before buying another piece that will not solve the cause.",
        ),
    ],
}


def approved_ids():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {
        item["id"]
        for item in manifest["images"]
        if item.get("origin") == "generated"
        and item.get("source") == "codex_imagegen"
        and item.get("approved_for_blog") is True
        and item.get("asset_status") == "active"
        and item.get("metadata_stripped") is True
        and item.get("quality_review") == "approved"
    }


def main():
    posts = json.loads(INDEX.read_text(encoding="utf-8"))
    slugs = [item["slug"] for item in posts[20:40]]
    active = approved_ids()
    OUTPUT.mkdir(parents=True, exist_ok=True)

    if set(slugs) != set(OVERRIDES):
        missing = sorted(set(slugs) - set(OVERRIDES))
        extra = sorted(set(OVERRIDES) - set(slugs))
        raise ValueError(f"Override mismatch. Missing: {missing}; extra: {extra}")

    for slug in slugs:
        original = json.loads((SOURCE / f"{slug}.json").read_text(encoding="utf-8"))
        figures = OVERRIDES[slug]
        if len(figures) != len(original["figures"]) or len(figures) != 3:
            raise ValueError(f"{slug} must have exactly three figures")

        merged = []
        for position, item in enumerate(figures):
            image = item["image"]
            if image not in active:
                raise ValueError(f"{slug}: {image} is not an active metadata-clean generated asset")
            merged.append({**item, "before": original["figures"][position]["before"]})

        result = {
            "_doc": "Generated-only replacement placement spec. Heading anchors were retained from the original reviewed placement file.",
            "figures": merged,
        }
        (OUTPUT / f"{slug}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"OK   {slug}")


if __name__ == "__main__":
    main()
