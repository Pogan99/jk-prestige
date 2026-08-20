#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 81 through 100.

The source placement files retain their reviewed heading anchors. This builder
replaces legacy asset ids only with active, metadata-clean, visually reviewed
generated figures whose subject supports the paragraph that follows each anchor.
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
    "how-to-replace-deadbolt-exterior-door-jacksonville": [
        figure(
            "exterior-deadbolt-strike-detail",
            "Matte-black exterior deadbolt, latch bolt, and aligned strike plate on a white door",
            "Check the door slab, jamb, strike, and existing bore before ordering a deadbolt. A shifted frame or soft material can mimic a lock problem even when the cylinder itself still turns.",
        ),
        figure(
            "french-door-hinge-detail",
            "Aligned black door hinges and even meeting-edge spacing on white exterior doors",
            "Measure the backset and bore, then make sure the door closes squarely before forcing a new bolt into the strike. Lock hardware works best when the opening is already aligned and supported.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "Use corrosion-resistant exterior hardware and test the lock from both sides with the door fully closed. If the jamb is wet, soft, or moving, repair that condition before treating a new deadbolt as the whole solution.",
        ),
    ],
    "how-to-replace-door-threshold-jacksonville": [
        figure(
            "exterior-door-threshold-sweep-detail",
            "White exterior door with an even sweep contact on a clean aluminum threshold",
            "Inspect the sill, jambs, sweep, and floor before replacing a threshold. A new threshold cannot correct rot, a damaged subfloor, or a door that is out of square.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "Fit the threshold to sound material, preserve its drainage slope, and seal the ends without trapping water. Soft jamb or sill material is a broader repair than simply changing the metal cap.",
        ),
        figure(
            "exterior-pet-door-weatherseal",
            "Exterior door with a dry, neatly sealed lower opening and intact jamb weatherstrip",
            "Test the sweep, latch, and full water-shedding path with the door closed. Wind-driven rain should move outward across the stoop, not collect at the interior edge of the threshold.",
        ),
    ],
    "how-to-install-french-drain-jacksonville": [
        figure(
            "french-drain-gravel-pipe-section",
            "Perforated black French-drain pipe in washed gravel and white filter fabric in a yard trench",
            "Locate utilities, property lines, discharge points, and the low end before digging. A French drain needs a real outlet and a continuous route rather than a trench that simply moves water to another low spot.",
        ),
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain extension with a cleanout beside a Florida home",
            "Coordinate roof runoff with groundwater paths so the drain is not overloaded during a Jacksonville storm. Buried drainage remains serviceable only when its route, outlet, and cleanout strategy are planned together.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Rock-lined swale receiving controlled roof runoff away from a Florida foundation",
            "Use clean stone, properly oriented perforated pipe, and a filter layer so sandy soil does not fill the system before it can move water. Surface grading and discharge control still matter around every trench.",
        ),
    ],
    "how-to-add-attic-insulation-jacksonville": [
        figure(
            "attic-raised-storage-deck",
            "Raised attic storage platform set above intact blown insulation in a Florida truss attic",
            "Inspect air leaks, moisture, wiring, and ventilation before adding insulation. More material is not a substitute for a sound attic assembly or a safe path for future service.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a roof-edge airflow path",
            "Install insulation to a consistent depth while keeping soffit intake paths, service clearances, and recessed-light requirements visible. The insulation plan must leave the ventilation system able to work.",
        ),
        figure(
            "attic-safe-footing-access",
            "Plywood attic walkway leading safely from an access opening over ceiling framing",
            "Create safe walk boards or service paths before covering the joists. Jacksonville attic heat makes rushed footing decisions especially risky, and crushed insulation loses both performance and access value.",
        ),
    ],
    "how-to-replace-dryer-vent-jacksonville": [
        figure(
            "dryer-vent-exterior-hood",
            "White exterior dryer-vent hood with a backdraft flap on a light stucco wall",
            "Trace the dryer route from the appliance to the exterior termination before replacing a vent. Short, direct, supported runs are safer than hidden bends and an exterior hood needs to remain accessible for cleaning.",
        ),
        figure(
            "bathroom-exhaust-fan-attic-housing",
            "Attic ventilation housing with a supported duct and clear insulation around it",
            "Remove crushed or disconnected ducting and support the replacement so lint cannot collect in a sag. A dryer duct needs its own appropriate route and should not be confused with a bathroom or attic ventilation path.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a roof-edge ventilation path",
            "Verify that the dryer exhausts outdoors and does not dump humid air into the attic. Moisture and lint together create a building and fire-safety problem that calls for a corrected route, not a hidden connection.",
        ),
    ],
    "how-to-install-hurricane-shutters-jacksonville": [
        figure(
            "hurricane-shutter-panel-system",
            "Closed aluminum hurricane-shutter panel system covering a stucco-home window",
            "Record each opening, anchor condition, sill geometry, and the shutter system's required clearances before storm preparation begins. Every opening should be matched to the approved product and its intended attachment method.",
        ),
        figure(
            "hurricane-window-film-prep",
            "Clean residential window with film-preparation tools staged on the sill",
            "Install anchors into sound framing or approved substrates and keep any removable components organized by opening. Window film may be part of a broader strategy, but it is not a substitute for an opening-specific shutter system when shutters are required.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Inspect and stage the system before the forecast turns. Shutters are one part of storm readiness alongside sound windows, roof details, doors, drainage, and a power plan for the home.",
        ),
    ],
    "how-to-replace-outdoor-hose-bib-jacksonville": [
        figure(
            "outdoor-hose-bib-anti-siphon",
            "Dry brass anti-siphon outdoor hose bib on a stucco wall above a paver path",
            "Confirm the shutoff, pipe material, wall penetration, and exposure before removing an outdoor hose bib. The exterior fixture is only the visible end of a water line that needs to stay supported inside the wall.",
        ),
        figure(
            "water-heater-supply-shutoff-detail",
            "Accessible water shutoff and supply connections at a utility water heater",
            "Isolate the water supply before disturbing the connection, then support the pipe while the old fitting is removed. Do not twist or load the line hidden behind the exterior wall just to free the visible bib.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Rock-lined swale carrying water away from a Florida foundation",
            "Seal the wall penetration and verify that the shutoff closes fully before the repair is finished. Exterior plumbing and drainage both need to keep water moving outside rather than into a damp wall cavity or foundation area.",
        ),
    ],
    "how-to-replace-rotted-deck-boards-jacksonville": [
        figure(
            "rotted-deck-board-diagnosis",
            "Weathered deck board with localized darkened end grain and a small split near a fastener",
            "Probe the boards and the framing below before replacing only the softest pieces. Rot at fasteners and joist tops can spread beyond the visible surface and change the actual repair scope.",
        ),
        figure(
            "deck-ledger-flashing-detail",
            "Deck ledger with flashing, membrane, joist hangers, and exterior fasteners",
            "Cut replacement boards to maintain drainage gaps and fasten into sound framing. If water is moving behind the deck or the ledger area is compromised, a board swap is not the full repair.",
        ),
        figure(
            "deck-stair-stringer-landing",
            "Pressure-treated deck stair framing with a secure landing and handrail post",
            "Seal cut ends and keep leaves from holding moisture against the boards. Jacksonville's wet seasons reward ventilation beneath and between deck components, not a surface that stays damp after every storm.",
        ),
    ],
    "how-to-replace-fence-panel-jacksonville": [
        figure(
            "wood-fence-panel-replacement",
            "New pressure-treated wood privacy-fence panel set straight between plumb posts",
            "Check posts, rails, grade, and the neighboring panels before replacing one section. A new panel will not stay aligned on a failed post or a fence line that is already moving.",
        ),
        figure(
            "rotted-fence-post-replacement-prep",
            "Weathered fence post with decay at grade beside a braced replacement post and footing excavation",
            "Set the replacement panel plumb, keep its bottom clear of soil, and fasten into sound rails with exterior-rated hardware. A soft or loose post should be corrected before it is asked to support a fresh panel.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff directed through a rock-lined swale away from a Florida foundation",
            "Protect cut ends and maintain drainage around the fence line. Ground contact, trapped mulch, and roof runoff are common paths to repeat rot in Jacksonville yards.",
        ),
    ],
    "how-to-rescreen-pool-cage-lanai-jacksonville": [
        figure(
            "pool-cage-screen-spline-detail",
            "Black pool-cage screen mesh tensioned in an aluminum frame with spline seated in the groove",
            "Inspect the enclosure frame, spline channels, doors, and damaged panels before ordering screen. Storm damage can bend the frame as well as tear mesh, so a tight new screen is not proof that the structure is sound.",
        ),
        figure(
            "pool-screen-enclosure-door-closer",
            "Closed pool-screen enclosure door with closer, latch, aligned hinges, and taut mesh",
            "Stretch replacement mesh evenly from a sound corner and keep the spline seated without over-tensioning the frame or creating waves. The adjacent door and latch should still move freely after a panel is screened.",
        ),
        figure(
            "sliding-glass-door-porch-context",
            "Covered Florida porch opening with a sliding patio door and screened-lanai context",
            "Repair or adjust enclosure doors before final screening so panels close without rubbing fresh mesh or leaving an insect gap. The broader porch and drainage conditions affect how the enclosure ages after rain and debris.",
        ),
    ],
    "how-to-replace-window-screen-jacksonville": [
        figure(
            "window-screen-spline-replacement",
            "White aluminum window-screen frame with taut dark mesh, spline, roller, and spare spline",
            "Measure the screen frame, spline channel, and corner geometry before buying mesh. A few millimeters of error can leave the finished panel loose, bowed, or unable to sit correctly in the window.",
        ),
        figure(
            "single-hung-window-balance-detail",
            "Raised single-hung window sash exposing balance hardware and a jamb channel",
            "Remove the old spline without bending the frame, then roll the new mesh in evenly from a sound corner. Check how the screen, sash, and frame work together instead of treating the mesh as an isolated part.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Check the finished screen for gaps, loose corners, and brittle mesh. Sun, salt air, and insects make small perimeter failures noticeable quickly in Jacksonville, especially when surrounding window details are weathered too.",
        ),
    ],
    "how-to-recaulk-exterior-windows-jacksonville": [
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Inspect the window perimeter, sill, casing, and drainage before removing caulk. Sealant is not a substitute for rotten trim, missing flashing, or a sill that holds water.",
        ),
        figure(
            "rotted-window-sill-diagnosis",
            "Window sill with localized moisture-softened wood and an open lower caulk joint",
            "Remove loose material to a clean, dry joint and apply a continuous exterior-rated bead without sealing over the window's drainage openings. If the surrounding wood is soft, the repair has to extend beyond a new bead.",
        ),
        figure(
            "exterior-window-flashing-sill-membrane",
            "Window opening with sill flashing membrane folded into a drainage pan shape",
            "Check the joint after a wet-weather cycle. Jacksonville wind-driven rain will find gaps at corners, end joints, and transitions, while properly layered flashing still gives water a path back out.",
        ),
    ],
    "how-to-replace-door-weatherstripping-jacksonville": [
        figure(
            "exterior-pet-door-weatherseal",
            "Exterior door with an intact perimeter seal and dry lower weather-protected opening",
            "Inspect the stop, threshold, sweep, hinges, and latch before replacing weatherstrip. A door that is out of square will compress one side and leave a gap on the other no matter how new the seal looks.",
        ),
        figure(
            "exterior-door-threshold-sweep-detail",
            "White exterior door with an even sweep contact on a clean aluminum threshold",
            "Measure each side, cut the seal cleanly, and adjust it for even compression without making the latch difficult to engage. The sweep and threshold need to work with the jamb seal as one perimeter.",
        ),
        figure(
            "french-door-alignment-context",
            "White exterior French doors with even reveals at a shaded Florida porch",
            "Check daylight, drafts, and water at the full perimeter after installation. Good weatherstripping helps cooling performance but cannot replace a damaged threshold, shifted frame, or failed door alignment.",
        ),
    ],
    "how-to-install-storm-door-jacksonville": [
        figure(
            "storm-door-closer-threshold",
            "White full-view storm door with a black closer and even sweep at a stucco entry",
            "Confirm the entry door, trim, sill, swing, and available reveal before selecting a storm door. The new frame must not block drainage, conflict with the main latch, or bind at the threshold.",
        ),
        figure(
            "exterior-door-threshold-sweep-detail",
            "White exterior door closing evenly on an aluminum threshold with a straight sweep",
            "Keep the storm-door frame square, support the closer, and make sure the sweep clears the sill correctly. Hardware only works reliably when the opening is sound and the lower weather details can shed water.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "Adjust the sweep and closer after rain and wind. A storm door should ventilate and protect the entry without trapping water against the main door or fastening into soft trim.",
        ),
    ],
    "how-to-install-french-doors-jacksonville": [
        figure(
            "french-door-alignment-context",
            "White exterior French doors with straight threshold, even reveals, and aligned hardware",
            "French-door replacement starts with the rough opening, sill, structural support, swing, and any impact or permitting requirements for the location. The visible doors depend on the opening and water-management plan behind them.",
        ),
        figure(
            "french-door-hinge-detail",
            "Aligned black French-door hinges with even meeting-edge spacing",
            "Set the frame plumb and square, support the sill, and fasten through sound material before adjusting the active and inactive leaves. Even reveals make the hinge, lock, and weatherseal checks meaningful.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower hinge-side corner of an exterior door jamb",
            "Check the meeting stile, locks, weather seals, and sill after the first rain. If jamb material is wet or softened, small alignment errors can turn into drafts and water paths in coastal weather.",
        ),
    ],
    "how-to-replace-soffit-jacksonville": [
        figure(
            "soffit-vented-eave-intake",
            "White perforated soffit beneath a finished Florida roof eave",
            "Inspect the soffit, fascia, vents, wiring, and roof edge before removing panels. Rot can continue behind an apparently small damaged section, and the intake path needs to be understood before it is covered again.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a roof-edge airflow path",
            "Cut replacement panels to land on sound framing, keep vent openings clear, and fasten without crushing the material. The interior side of the eave must leave room for air to move past insulation.",
        ),
        figure(
            "attic-gable-vent-exterior",
            "White louvered gable vent beneath an intact Florida shingle roof",
            "Verify that the repaired soffit restores intake airflow and that insulation is not pushed into the vent path. Moisture control depends on both sides of the roof edge, not a vented panel alone.",
        ),
    ],
    "how-to-replace-fascia-board-jacksonville": [
        figure(
            "rotted-fascia-gutter-edge-diagnosis",
            "Localized rotten fascia wood behind an intact gutter edge and shingle roofline",
            "Probe the fascia, rafter tails, soffit, and gutter attachment before cutting. A rotten fascia board can be carrying more load than it appears, and the source of the repeated wetting should be found first.",
        ),
        figure(
            "gutter-corner-downspout-transition",
            "White gutter corner and downspout transition at an intact soffit and fascia",
            "Replace the board with sound backing, keep the roof edge straight, and plan gutter fasteners so they do not land in soft or unsupported material. Gutter slope and attachments are part of the fascia repair scope.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Roof drip edge and underlayment layered correctly at a shingle eave",
            "Prime cut ends and protect the gutter and roof-edge transitions. Jacksonville rain will find an unprotected joint behind the fascia quickly, so the layers above the board must shed water in the right order.",
        ),
    ],
    "how-to-replace-downspout-jacksonville": [
        figure(
            "gutter-corner-downspout-transition",
            "White gutter corner with fitted downspout transition beside soffit and fascia",
            "Confirm the gutter outlet, wall height, elbows, and discharge route before replacing a downspout. The vertical pipe is only one part of the drainage system that has to work from roof edge to final outlet.",
        ),
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain extension and cleanout beside a Florida home",
            "Assemble the new sections plumb, support them without crushing the pipe, and keep the outlet moving water away from the foundation. If the route continues underground, include a serviceable connection and outlet plan.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Rock-lined swale carrying downspout runoff away from a Florida foundation",
            "Test the discharge during a heavy flow and correct low spots or erosion at the outlet. A new downspout should move water through a controlled path, not simply relocate the problem across the yard.",
        ),
    ],
    "how-to-install-gutter-guards-jacksonville": [
        figure(
            "gutter-guard-micro-mesh-detail",
            "Fine black micro-mesh gutter guard tucked beneath shingles over a white gutter with dry pine needles above",
            "Clean and inspect the gutter, slope, end caps, and downspouts before adding guards. Covers cannot correct a sagging, leaking, or undersized gutter run.",
        ),
        figure(
            "gutter-corner-downspout-transition",
            "White gutter corner and downspout transition on a Florida home",
            "Choose a guard that matches the gutter profile and nearby roof debris, then install it without reducing the opening at a corner or downspout inlet. The details need to keep flow moving through the whole run.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Metal roof drip edge layered with underlayment above a shingle eave",
            "Pine needles and oak leaves still need seasonal checks. Gutter guards reduce cleaning frequency but do not eliminate roof-edge maintenance, drainage checks, or safe access planning in Jacksonville.",
        ),
    ],
    "how-to-replace-gutter-section-jacksonville": [
        figure(
            "gutter-corner-downspout-transition",
            "White aluminum gutter section meeting a fitted corner and downspout transition at a Florida roofline",
            "Trace the leak and check adjacent joints, hangers, fascia, and downspouts before replacing one section. Local damage can be a symptom of a longer sag or a water path that begins farther along the roof edge.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Roof drip edge and underlayment layered correctly above a shingle eave",
            "Match the profile and slope, overlap the new section in the correct direction, and support the joint so it does not pull apart during a storm. The gutter must work with the drip edge and fascia behind it.",
        ),
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain extension with a cleanout beside a Florida home",
            "Run water through the full system after the repair and watch the discharge point for erosion. Gutter work is complete only when the runoff path remains controlled all the way away from the house.",
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
    slugs = [item["slug"] for item in posts[80:100]]
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
