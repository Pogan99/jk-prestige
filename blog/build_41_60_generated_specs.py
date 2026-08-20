#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 41 through 60.

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
    "how-to-build-pergola-jacksonville": [
        figure(
            "pergola-concrete-pier-frame",
            "Free-standing pressure-treated pergola on concrete piers beside a Florida paver patio",
            "A pergola starts with its support plan: post locations, pier or footing strategy, property setbacks, and wind exposure should be sorted out before the framing goes up.",
        ),
        figure(
            "pergola-beam-connector-detail",
            "Pergola double beams connected to a wood post with clean black structural hardware",
            "Straight beams and repeatable connections make the layout easier to inspect. Hardware and fastener choices should suit the framing and the conditions at the site rather than just look substantial.",
        ),
        figure(
            "shed-hurricane-anchor-bracket",
            "Galvanized exterior anchor bracket securing a small wood structure to a concrete slab",
            "Jacksonville weather adds wind and rain to the planning. Outdoor structures need a support and connection strategy that stays reliable after ordinary summer storms, not only on a dry installation day.",
        ),
    ],
    "how-to-seal-garage-door-bottom-jacksonville": [
        figure(
            "garage-door-exterior-context",
            "White sectional garage door and dry driveway at a modest Florida home",
            "Start at the whole opening: driveway slope, slab condition, door travel, and where rainwater collects can matter as much as the rubber seal itself.",
        ),
        figure(
            "garage-door-bottom-seal-detail",
            "Garage door bottom weather seal meeting a concrete slab beside lower track hardware",
            "A replacement seal needs a clean, even contact line across the slab. Gaps at either corner or a warped door edge can defeat a brand-new strip.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff directed through a rock-lined swale away from a Florida foundation",
            "Water control outside the garage matters too. When roof runoff is sent away from the slab, a door-bottom seal is less likely to be asked to solve a grading problem.",
        ),
    ],
    "how-to-install-soffit-vents-attic-ventilation-jacksonville": [
        figure(
            "soffit-vented-eave-intake",
            "White perforated soffit beneath a tiled Florida roof eave",
            "Soffit vents supply the intake side of the attic system. Before cutting anything, confirm that the eave construction and existing ventilation path can actually stay open.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of an airflow path near the roof edge",
            "Inside the attic, insulation and storage need to stay out of the intake route. A vent opening that is blocked immediately behind the soffit will not do its intended job.",
        ),
        figure(
            "attic-gable-vent-exterior",
            "White louvered gable vent beneath an intact Florida shingle roof",
            "Ventilation is a system, not a collection of holes. Consider the intake, any high exhaust path, insect screening, moisture conditions, and the roof assembly together.",
        ),
    ],
    "how-to-fix-sagging-door-hinges-jacksonville": [
        figure(
            "french-door-alignment-context",
            "White exterior French doors with even gaps at a shaded Florida porch",
            "A sagging door should be judged by the full reveal around the opening. Hinges, jamb movement, the threshold, and the latch side all tell you whether the problem is really limited to hardware.",
        ),
        figure(
            "french-door-hinge-detail",
            "Aligned black door hinges and even meeting-edge spacing on white French doors",
            "Tightening or replacing hinge fasteners only helps when the hinge leaf still sits flat on sound material. Record which screws are stripped or loose before changing the adjustment.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "If an exterior door keeps dropping after a hinge fix, softened jamb material or repeated water exposure may be moving the opening. That is a broader repair than a new hinge alone.",
        ),
    ],
    "how-to-install-shiplap-accent-wall-jacksonville": [
        figure(
            "shiplap-accent-wall-layout",
            "White horizontal shiplap wall with even board gaps, level, and neatly staged trim materials",
            "The visual result depends on the first layout line. Confirm the wall is reasonably flat, choose the reveal, and plan the board sequence before fastening the visible rows.",
        ),
        figure(
            "interior-door-casing-miter-detail",
            "Clean interior trim miters and an even jamb reveal beside a finished wall",
            "An accent wall has to resolve cleanly at trim, corners, and outlets. Small spacing decisions become very visible when the boards reach a door casing or painted edge.",
        ),
        figure(
            "drywall-corner-bead-repair-prep",
            "Straight drywall corner bead and thin finish compound prepared on an interior wall",
            "Finish carpentry lasts better over a stable surface. Repair damaged drywall or a proud corner first instead of using shiplap to disguise movement or an uneven wall plane.",
        ),
    ],
    "how-to-repair-water-damaged-ceiling-drywall-jacksonville": [
        figure(
            "water-damaged-ceiling-diagnosis",
            "Contained ceiling water stain and neat drywall inspection opening above protected flooring",
            "A ceiling stain is a reason to find the source before repairing the surface. Drywall can be patched, but trapped moisture or an active leak needs to be resolved first.",
        ),
        figure(
            "drywall-corner-bead-repair-prep",
            "Drywall finish materials staged for a thin, controlled repair coat",
            "Once the area is dry and stable, the repair is a sequence of sound backing, compatible patch material, thin coats, and careful sanding, not a single heavy layer of compound.",
        ),
        figure(
            "skylight-flashing-leak-diagnosis",
            "Repairable localized split seal at a skylight flashing corner on a shingle roof",
            "The stain location does not prove the leak source. Roof penetrations, flashing, plumbing, and HVAC all deserve a site-specific check before a ceiling is closed again.",
        ),
    ],
    "how-to-replace-wood-fence-post-jacksonville": [
        figure(
            "rotted-fence-post-replacement-prep",
            "Weathered fence post with decay at its base beside a braced replacement post and footing excavation",
            "When a post is decayed at grade, the work is more than swapping visible lumber. Fence loads, soil, adjacent rails, and the footing plan all need a look before the old support comes out.",
        ),
        figure(
            "fence-gate-hinge-post-detail",
            "Exterior-rated gate hinge fastened to a sturdy wood post with a diagonal brace behind it",
            "A post may carry rails, a gate, or both. Reconnect each attachment to sound material and keep the assembly plumb instead of relying on a new post to correct a warped fence section.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Roof runoff moving away from a Florida home's exterior structures through a shallow swale",
            "Water that sits around a wood post accelerates the next failure. Grade and roof runoff are part of a durable fence repair, especially in sandy or low-lying yards.",
        ),
    ],
    "how-to-regrade-yard-for-drainage-jacksonville": [
        figure(
            "downspout-yard-drainage-swale",
            "Rock-lined swale accepting downspout runoff and carrying it away from a Florida foundation",
            "A drainage plan begins with where roof water and surface water are allowed to go. Establish the discharge route before moving soil around the foundation.",
        ),
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain extension with cleanout beside a Florida home",
            "Buried pipe can supplement grading when there is a clear outlet, but it still needs a steady route and accessible maintenance point rather than a low spot that fills with sediment.",
        ),
        figure(
            "paver-patio-base-preparation",
            "Prepared exterior footprint with compacted base, edge restraint, string lines, and level",
            "Surface projects follow the grade that is already there. Set the water path first, then build patios, planting beds, or other finish work to support that plan.",
        ),
    ],
    "how-to-install-paver-patio-jacksonville": [
        figure(
            "paver-patio-base-preparation",
            "Compacted paver-patio base with edge restraint, bedding section, string line, and staged pavers",
            "The visible pavers depend on the base below. Layout, edge restraint, compaction, and the planned slope should be right before the surface pattern begins.",
        ),
        figure(
            "pergola-concrete-pier-frame",
            "Free-standing pergola supported on concrete piers within a Florida paver patio",
            "Plan permanent supports and hardscape in the right sequence. A patio can look finished while still needing a dedicated footing or pier for anything that carries structural load.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff carried away from a home through a rock-lined drainage swale",
            "Pavers should support outdoor use without sending stormwater back to the house. Check how the completed surface connects to nearby downspouts, lawn, and drainage paths.",
        ),
    ],
    "how-to-repair-deck-railing-jacksonville": [
        figure(
            "deck-railing-alignment-detail",
            "Pressure-treated deck guardrail with straight top rail, even balusters, and a level",
            "A railing repair starts with the whole guard section: post condition, rail alignment, baluster spacing, and the deck framing that supports it all matter together.",
        ),
        figure(
            "deck-stair-stringer-landing",
            "Pressure-treated deck stair framing with a secure landing and handrail post",
            "Stairs and railings meet at high-use connections. Keep the stair run, handrail, landing, and rail post working as one stable exterior assembly.",
        ),
        figure(
            "deck-ledger-flashing-detail",
            "Deck ledger with flashing, membrane, joist hangers, and exterior fasteners",
            "If a railing is loose because the deck itself is moving or wet, a cosmetic rail repair is not enough. Inspect the larger framing and water-control details before closing the scope.",
        ),
    ],
    "how-to-replace-water-heater-jacksonville": [
        figure(
            "electric-water-heater-service-context",
            "Generic electric tank water heater in an accessible utility closet with a drain pan",
            "A water-heater replacement starts with the site: access, electrical or fuel type, shutoff location, drain provisions, and the size of the existing equipment all affect the real scope.",
        ),
        figure(
            "water-heater-supply-shutoff-detail",
            "Electric water-heater top with flexible supply connectors, accessible shutoff valve, and closed electrical cover",
            "Connections have to be identified before the old tank is disturbed. A qualified installer can confirm the water shutoff, electrical arrangement, fittings, and safe isolation for the specific unit.",
        ),
        figure(
            "water-heater-drain-pan-detail",
            "Tank water heater seated in a galvanized drain pan with a routed pan drain line",
            "A pan and drain path are part of moisture-risk planning, especially when a tank sits over finished space. Their details should be verified for the actual location rather than assumed from a generic setup.",
        ),
    ],
    "how-to-install-outdoor-gfci-outlet-jacksonville": [
        figure(
            "outdoor-gfci-in-use-cover",
            "Weather-resistant GFCI receptacle protected by a clear closed in-use cover on stucco",
            "Exterior power needs protection from water and everyday use. Start by identifying the circuit, location, box condition, and the type of cover the finished outlet will need.",
        ),
        figure(
            "generator-transfer-switch-exterior",
            "Closed exterior electrical enclosure and weatherproof generator inlet on a Florida stucco wall",
            "Outdoor electrical work belongs in a planned system. Equipment location, conduit routing, weather exposure, and available capacity should be considered together rather than adding an outlet in isolation.",
        ),
        figure(
            "whole-house-surge-protector-detail",
            "Whole-house surge-protection module beside organized panel conductors",
            "Jacksonville storms add a separate electrical risk. A qualified electrician can evaluate grounding, circuit protection, and surge strategy for the home, not only the new receptacle.",
        ),
    ],
    "how-to-replace-shower-valve-cartridge-jacksonville": [
        figure(
            "shower-valve-cartridge-access",
            "Shower valve cartridge accessible through a clean tiled trim opening with puller tool staged nearby",
            "Before selecting a cartridge, identify the valve and shut off water safely. Similar-looking trim can conceal very different internal parts and removal methods.",
        ),
        figure(
            "shower-door-side-seal-detail",
            "Clear shower-door side seal meeting an even tiled jamb gap",
            "The valve repair happens inside a broader wet area. Keep adjacent seals, tile, and shower hardware protected while the trim is removed and the valve is tested.",
        ),
        figure(
            "bathroom-sink-p-trap-vanity",
            "Clean bathroom sink drain and P-trap inside an open vanity cabinet",
            "Bathroom plumbing repairs often reveal larger moisture or access concerns. If shutoffs are seized, finishes are wet, or a valve body is damaged, the scope may be more than a cartridge swap.",
        ),
    ],
    "how-to-replace-sliding-glass-door-rollers-jacksonville": [
        figure(
            "sliding-glass-door-porch-context",
            "White sliding glass patio door opening to a Florida screened porch",
            "Start with the whole opening. Frame condition, track drainage, door weight, and lock alignment help determine whether rollers are the real problem.",
        ),
        figure(
            "sliding-glass-door-track-roller",
            "Sliding glass door threshold track with roller opening, weatherstrip, and drainage path",
            "Clean grit from the track and identify the roller arrangement before removing panels. A door that still drags after cleaning may need the correct roller and adjustment procedure.",
        ),
        figure(
            "sliding-door-mortise-lock-detail",
            "Sliding patio-door handle and mortise lock at a Florida porch opening",
            "After the door rolls smoothly, test the lock and meeting edge again. A heavy or misaligned panel can make hardware problems look like a simple roller issue.",
        ),
    ],
    "how-to-replace-broken-window-glass-pane-jacksonville": [
        figure(
            "window-glass-pane-replacement-prep",
            "Window sash prepared on a padded surface beside an intact insulated replacement pane",
            "Replacement glass needs the right measurements, construction, and safe handling plan. Protect the sash and nearby surfaces before the old pane or unit is removed.",
        ),
        figure(
            "single-hung-window-balance-detail",
            "Raised single-hung sash exposing balance hardware and a jamb channel",
            "Window glass is only one part of the assembly. Check how the sash, balances, frame, and weather seals are working before assuming a pane is the entire repair.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "After glass work, recheck the exterior water-control details. A cracked pane can be obvious while a failed sill joint or soft surrounding trim remains the longer-term concern.",
        ),
    ],
    "how-to-install-chimney-step-flashing-jacksonville": [
        figure(
            "chimney-step-flashing-installation",
            "Galvanized step-flashing pieces staged course by course beside a red-brick chimney and shingle roof",
            "Step flashing is a layered roof-to-masonry transition, not a single sheet of metal. The sequence needs to work with the shingle courses before the chimney counterflashing finishes the system.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Roof drip edge integrated with underlayment at a Florida shingle eave",
            "Roof details shed water by overlap and order. Use the same layered thinking at a chimney rather than depending on surface sealant to make up for a broken transition.",
        ),
        figure(
            "skylight-flashing-finished-detail",
            "Finished layered flashing integrated with shingles around a curb-mounted skylight",
            "A watertight roof transition only works when the surrounding roof layers are sound. If shingles, decking, or masonry are deteriorated, the chimney scope may be larger than flashing alone.",
        ),
    ],
    "how-to-replace-roof-pipe-boot-flashing-jacksonville": [
        figure(
            "roof-pipe-boot-flashing-detail",
            "White plumbing vent passing through shingles with a clean black pipe boot and flashing flange",
            "A pipe boot is a small roof detail with a big job: it has to shed water around a moving roof penetration without interrupting the shingle courses above it.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Metal roof drip edge and underlayment layered with asphalt shingles at an eave",
            "The same overlap logic applies across the roof. A new boot belongs in an intact water-shedding sequence, not on top of weak shingles or compromised decking.",
        ),
        figure(
            "skylight-flashing-finished-detail",
            "Finished curb-mounted skylight flashing integrated with an asphalt-shingle roof",
            "If multiple roof penetrations show failed sealant, brittle shingles, or staining, it is worth evaluating the broader roof condition instead of replacing isolated parts one at a time.",
        ),
    ],
    "how-to-replace-bathroom-exhaust-fan-jacksonville": [
        figure(
            "bathroom-exhaust-fan-attic-housing",
            "Bathroom exhaust-fan housing between attic joists with supported duct and clear insulation",
            "A fan replacement includes the housing, duct, electrical connection, and the path to the exterior. The grille in the bathroom is only the visible end of that system.",
        ),
        figure(
            "soffit-vented-eave-intake",
            "Vented soffit at a finished Florida roof eave",
            "Humidity control depends on the larger roof and attic environment too. Do not confuse an attic intake vent with the dedicated exterior exhaust path a bathroom fan needs.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a ventilation path near roof trusses",
            "Service access and clear airflow matter after the installation. A duct that is crushed, disconnected, or buried in an inaccessible attic will not solve moisture problems in the bathroom below.",
        ),
    ],
    "how-to-install-attic-pull-down-stairs-jacksonville": [
        figure(
            "attic-pull-down-stairs-open",
            "Open wooden folding attic stair through a white trimmed ceiling hatch",
            "Pull-down stairs change a ceiling opening into a load-bearing access route. Confirm the opening, framing, landing space, and attic conditions before choosing a stair unit.",
        ),
        figure(
            "attic-access-hatch-insulation-detail",
            "Insulated attic hatch with weatherstrip, rigid foam, and raised insulation dam",
            "The new access still belongs in the home's thermal boundary. Plan how the stair or hatch will be insulated and sealed so easier attic access does not become a permanent air leak.",
        ),
        figure(
            "attic-safe-footing-access",
            "Plywood attic walkway leading safely from an access opening over ceiling framing",
            "Work does not end at the top step. A safe path across the attic protects the ceiling and gives future service work a stable route instead of loose insulation to walk on.",
        ),
    ],
    "how-to-replace-garage-door-opener-jacksonville": [
        figure(
            "garage-door-opener-rail-context",
            "Ceiling-mounted garage door opener with straight rail, trolley, and sectional door",
            "An opener replacement begins by checking the moving door system it will control. Door balance, rail alignment, upper bracket condition, and mounting location need to be sound before a new motor is selected.",
        ),
        figure(
            "garage-door-roller-hinge-detail",
            "Garage door roller seated in its track beside a metal hinge",
            "Rollers, hinges, tracks, and springs affect how hard an opener has to work. A new motor cannot safely compensate for a door that is binding or out of alignment.",
        ),
        figure(
            "garage-door-exterior-context",
            "White sectional garage door on a modest Florida home with driveway context",
            "After an upgrade, test the full door system and the weather exposure at the opening. If the door remains heavy, crooked, or unsafe, stop before spring or cable work and get the assembly assessed.",
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
    slugs = [item["slug"] for item in posts[40:60]]
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
