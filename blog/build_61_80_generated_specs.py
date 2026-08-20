#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 61 through 80.

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
    "how-to-replace-pool-pump-jacksonville": [
        figure(
            "pool-pump-equipment-pad",
            "Generic pool pump on a clean Florida equipment pad with PVC unions and closed disconnect enclosure",
            "Before choosing a replacement pump, compare the existing pad, plumbing connections, electrical disconnect, filter layout, and service clearance. The right pump has to fit the whole equipment arrangement, not only the old motor's footprint.",
        ),
        figure(
            "whole-house-surge-panel-context",
            "Organized residential electrical panel with a whole-house surge device in a utility setting",
            "Electrical isolation comes before plumbing cuts. A qualified installer can identify the correct circuit, disconnect method, grounding, and available capacity for the actual pool equipment instead of relying on assumptions from a generic setup.",
        ),
        figure(
            "florida-lightning-surge-context",
            "Florida summer storm clouds beyond a residential roofline and palm trees",
            "Jacksonville storms add weather and surge exposure to pool equipment planning. After startup, check for leaks, air at the lid, vibration, and proper flow, then keep the equipment area ready for ordinary rain and lightning season.",
        ),
    ],
    "how-to-install-exterior-pet-door-jacksonville": [
        figure(
            "exterior-pet-door-weatherseal",
            "White exterior door with a clean installed pet door and dry perimeter weather seal",
            "Choose the opening from the pet's size, the host door construction, security, and the path rainwater would take across the threshold. The pet door needs a square frame and a weather-conscious location before the cutout begins.",
        ),
        figure(
            "french-door-alignment-context",
            "White exterior French doors with even reveals at a shaded Florida porch",
            "The host door should be sound and properly aligned before adding an opening. Check how it closes, whether the lower edge is dry, and whether the new frame can be kept square without weakening a damaged panel.",
        ),
        figure(
            "rotted-exterior-door-jamb-diagnosis",
            "Localized moisture-softened wood at the lower corner of an exterior door jamb",
            "If nearby exterior wood is soft or repeatedly wet, fix that water path before creating another opening. A new pet door cannot compensate for a compromised jamb, threshold, or door edge.",
        ),
    ],
    "how-to-repair-screen-enclosure-door-jacksonville": [
        figure(
            "pool-screen-enclosure-door-closer",
            "Black aluminum pool-screen enclosure door with closer, latch, and intact mesh",
            "Start with the enclosure door as a system: inspect the frame, closer, latch, hinges or rollers, and screen tension before replacing one part. A shifted opening can make a hardware repair look ineffective.",
        ),
        figure(
            "sliding-screen-door-track-detail",
            "Clean sliding screen door track and lower guide detail at an exterior opening",
            "Support the panel while worn hardware is changed, then clear grit from the lower track and threshold. Smooth travel and a consistent latch line are more useful checks than forcing a closer to overcome a dragging door.",
        ),
        figure(
            "sliding-glass-door-porch-context",
            "Sliding patio door opening to a covered Florida porch",
            "Look beyond the moving panel too. Wet debris, salt air, and standing water at the surrounding porch or enclosure sill can shorten the life of otherwise sound screen-door hardware.",
        ),
    ],
    "how-to-install-attic-radiant-barrier-jacksonville": [
        figure(
            "attic-radiant-barrier-rafter-bay",
            "Reflective radiant barrier installed beneath attic rafters above insulation and a service walkway",
            "Confirm the roof assembly, ventilation path, electrical clearances, and safe work route before adding a radiant barrier. It should support the attic strategy without covering vents or trapping moisture.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of an airflow path near the roof edge",
            "The reflective layer needs the specified air space and must stay clear of hot electrical equipment, recessed lights, and intake routes. A well-installed material still fails its purpose if it blocks the ventilation path.",
        ),
        figure(
            "attic-safe-footing-access",
            "Plywood attic walkway leading safely over ceiling framing",
            "Do not trade cooling performance for unsafe footing or crushed insulation. Plan durable service paths before the barrier goes in so future work does not damage the ceiling below.",
        ),
    ],
    "how-to-repair-rotted-window-sill-jacksonville": [
        figure(
            "rotted-window-sill-diagnosis",
            "Window sill with localized soft wood and peeling finish at a contained moisture-damaged area",
            "Probe the sill, jambs, casing, and nearby sheathing before cutting. Rotted wood is often the visible edge of a longer water path, not simply a failed paint surface.",
        ),
        figure(
            "exterior-window-flashing-sill-membrane",
            "Window opening with flexible sill flashing membrane folded into a pan shape",
            "Remove unsound material back to solid wood and preserve the drainage path. The replacement sill has to shed water outward while the flashing behind it manages the water that gets past the trim.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Before sealing the new trim, confirm the sill slope, end returns, and flashings suit the actual opening. A joint can look tight and still hold water if the geometry is wrong.",
        ),
    ],
    "how-to-replace-sump-pump-jacksonville": [
        figure(
            "sump-pump-basin-check-valve",
            "Clean sump basin with pump, float switch, discharge pipe, and accessible check valve",
            "Verify the pit, pump fit, discharge route, check valve, and backup plan before removing the old unit. The system matters most during the storm that overwhelms it.",
        ),
        figure(
            "downspout-underground-drain-extension",
            "Downspout connected to a buried drain extension with a cleanout beside a Florida home",
            "Keep sump discharge separate from roof runoff and give it a clear, serviceable route away from the foundation. A buried outlet needs a real path, not a low spot that creates a new flooding problem.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Roof runoff directed through a rock-lined swale away from a Florida foundation",
            "Test the float, check valve, alarm, and backup arrangement before closing the pit. Humid conditions, storms, and outages make routine checks more important than a one-time installation.",
        ),
    ],
    "how-to-install-hurricane-window-film-jacksonville": [
        figure(
            "hurricane-window-film-prep",
            "Clean residential window with film-installation tools staged on an unbranded sill",
            "Measure each pane and inspect the frame, glazing, and hardware first. Film is only appropriate on a sound window and is not a substitute for a failed attachment or damaged glass.",
        ),
        figure(
            "window-glass-pane-replacement-prep",
            "Window sash prepared on a padded surface beside an intact insulated replacement pane",
            "The glass must be clean, stable, and compatible with the selected film. Follow the specified edge gap and application process so dust, trapped moisture, and creases do not undermine the finish.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Treat window film as one layer of storm preparation, not a code-rated replacement for every opening. Inspect the wider window, door, roof, and shutter strategy before the next hurricane threat.",
        ),
    ],
    "how-to-replace-thermostat-jacksonville": [
        figure(
            "thermostat-wall-return-context",
            "Blank-display wall thermostat beside a clean HVAC return grille",
            "Before removing a thermostat, identify the HVAC system type, turn off the correct power source, and photograph the existing terminal wiring. Similar thermostats can control very different equipment.",
        ),
        figure(
            "whole-house-surge-panel-context",
            "Organized electrical panel with a whole-house surge device in a utility setting",
            "Mount the new base level, keep conductors from being pinched, and configure the thermostat for the actual equipment. Circuit identification and safe isolation should be confirmed before a wall control is disconnected.",
        ),
        figure(
            "whole-house-dehumidifier-attic",
            "Whole-house dehumidifier installed in an attic with insulated duct connections",
            "After startup, compare the thermostat reading with room conditions and verify heating, cooling, fan, and schedule behavior. In Jacksonville humidity, comfort and moisture control involve the whole HVAC system, not the screen setting alone.",
        ),
    ],
    "how-to-install-roof-ridge-vent-jacksonville": [
        figure(
            "roof-ridge-vent-capped",
            "Continuous black ridge vent beneath cap shingles on a finished residential roof",
            "A ridge vent has to work with the roof geometry and the available soffit intake. Check the whole ventilation system before cutting a ridge slot.",
        ),
        figure(
            "soffit-vented-eave-intake",
            "White perforated soffit providing attic intake beneath a Florida roof eave",
            "The high exhaust path only works when outside air can enter low at the eaves. Confirm that the soffit construction and existing baffles can keep this intake open.",
        ),
        figure(
            "attic-insulation-airflow-clearance",
            "Attic insulation held clear of a roof-edge airflow route",
            "Verify intake airflow from the attic side and keep insulation from closing the eave path. Exhaust without intake can worsen pressure and moisture problems rather than solve them.",
        ),
    ],
    "how-to-patch-roof-leak-jacksonville": [
        figure(
            "skylight-flashing-leak-diagnosis",
            "Localized split seal at a skylight flashing corner on a shingle roof",
            "A roof patch begins with tracing the entry point, not with the ceiling stain. Flashing, penetrations, roof covering, and the attic side of the assembly all need inspection before a permanent repair is selected.",
        ),
        figure(
            "roof-pipe-boot-flashing-detail",
            "Plumbing vent passing through shingles with a clean black pipe boot and flashing flange",
            "Roof penetrations are common leak paths because they interrupt the shingle field. A temporary cover may control immediate water, but the permanent repair must restore the layered water-shedding sequence.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Roof drip edge and underlayment layered correctly at a shingle eave",
            "After the repair, inspect from the attic during the next rain and look beyond the original stain. Lifted shingles, wet insulation, or new staining can point to a larger water path than one surface patch.",
        ),
    ],
    "how-to-replace-exterior-light-fixture-jacksonville": [
        figure(
            "exterior-wall-sconce-weatherseal",
            "Exterior wall sconce mounted on a clean wall with a neat weather-sealed perimeter",
            "Before changing an exterior fixture, identify the circuit, box, grounding path, and weather exposure. A decorative replacement cannot correct a loose or wet electrical box.",
        ),
        figure(
            "outdoor-gfci-in-use-cover",
            "Weather-resistant exterior receptacle protected by a clear in-use cover on stucco",
            "Turn off and verify the circuit, then maintain the weather-rated details at the wall. Outdoor electrical components need suitable boxes, covers, and sealing practices for the exposure they will receive.",
        ),
        figure(
            "whole-house-surge-protector-detail",
            "Whole-house surge-protection module beside organized panel conductors",
            "Jacksonville lightning and wind-driven rain add electrical risk beyond the fixture itself. Use an exterior-rated unit and keep the top and sides sealed without blocking the drainage path below.",
        ),
    ],
    "how-to-install-vinyl-fence-gate-jacksonville": [
        figure(
            "vinyl-fence-gate-alignment",
            "White vinyl fence gate aligned squarely between two posts with black hinges and latch",
            "Set the opening from the finished fence line, posts, grade, and swing clearance before the hardware is tightened. A gate needs a square, well-supported opening rather than a stronger latch alone.",
        ),
        figure(
            "fence-gate-hinge-post-detail",
            "Exterior gate hinge attached to a sturdy wood post with a diagonal brace behind it",
            "Hinges and latch hardware need solid support at the posts. Keep enough adjustment for seasonal movement and a clean latch, especially where wind can load the open gate.",
        ),
        figure(
            "rotted-fence-post-replacement-prep",
            "Weathered fence post with decay at grade beside a braced replacement post and footing excavation",
            "After rain, check the bottom rail and posts as well as the gate panel. A gate that drags often needs grade, post, or hinge correction instead of more force at the latch.",
        ),
    ],
    "how-to-replace-mailbox-post-jacksonville": [
        figure(
            "mailbox-post-concrete-footing",
            "Generic white roadside mailbox on a straight wood post set into a round concrete footing",
            "Confirm the property line, postal and HOA placement rules, road clearance, and the condition of the box before digging out the old post. The footing location has to work for both safe delivery access and the actual site.",
        ),
        figure(
            "rotted-fence-post-replacement-prep",
            "Weathered exterior wood post with decay at grade beside a braced replacement post and footing excavation",
            "A failed lower post is a reminder to plan the removal and support strategy before the new footing is poured. Keep the replacement post plumb and supported while the concrete gains strength.",
        ),
        figure(
            "paver-patio-base-preparation",
            "Prepared outdoor base with compacted material, straight string lines, and a level",
            "Check the finished height, plumb, and drainage around the post before mounting the box. Protect cut wood and avoid a flat top or joint that lets rain sit against fasteners.",
        ),
    ],
    "how-to-recaulk-bathtub-shower-jacksonville": [
        figure(
            "bathtub-shower-caulking-joint",
            "Fresh continuous white silicone caulk bead at a white bathtub and subway-tile joint",
            "Inspect the tub or shower joint, corners, trim, and movement before removing old caulk. Recaulking will not fix a leaking substrate or a loose surround.",
        ),
        figure(
            "shower-door-side-seal-detail",
            "Clear shower-door side seal meeting an even tiled jamb gap",
            "Remove loose bead and residue, dry the joint, and tool one continuous bead without leaving pinholes at corners or changes in plane. Protect nearby seals while the work is done.",
        ),
        figure(
            "bathroom-floor-grout-prep",
            "Clean bathroom tile floor with a controlled grout-joint preparation area",
            "Respect the product cure time before running water. Jacksonville humidity can slow the set, and an early shower test can make a sound new bead look like a failed seal.",
        ),
    ],
    "how-to-repair-stucco-cracks-jacksonville": [
        figure(
            "stucco-hairline-crack-prep",
            "Contained dry hairline crack in an off-white stucco wall beside intact exterior trim",
            "Classify the crack before filling it. Hairline shrinkage, recurring joints, impact damage, and movement around openings do not call for the same repair or the same level of investigation.",
        ),
        figure(
            "exterior-window-brickmould-trim",
            "Finished exterior window trim with a sloped sill and narrow caulk joint",
            "Open the repair enough to remove loose material and keep the patch compatible with the existing finish. At nearby trim and penetrations, preserve the drainage path instead of sealing water into the wall.",
        ),
        figure(
            "roof-drip-edge-underlayment-detail",
            "Roof drip edge and underlayment layered to shed water at a shingle eave",
            "Watch the repair through wet weather and seasonal movement. A crack that returns can point to moisture or substrate movement, which needs a broader assessment than another surface patch.",
        ),
    ],
    "how-to-seal-driveway-cracks-jacksonville": [
        figure(
            "driveway-crack-clean-prep",
            "Broom-finished residential driveway with a modest narrow crack in a controlled repair setting",
            "Clean and evaluate the crack before sealing. Width, edge movement, vegetation, and water below the slab determine whether a flexible seal is enough or the condition needs a different repair plan.",
        ),
        figure(
            "garage-floor-concrete-crack-prep",
            "Concrete floor crack prepared with clean edges and controlled repair materials",
            "Remove dirt and loose edges, let the joint dry, and use the product at the intended depth. A clean repair zone gives sealant room to move instead of peeling away from dust or weak concrete.",
        ),
        figure(
            "downspout-yard-drainage-swale",
            "Downspout runoff moving through a rock-lined swale away from a Florida home",
            "Keep water away from the repaired joint by correcting nearby downspout discharge and low spots. Surface sealing cannot overcome constant saturation beneath or beside the driveway.",
        ),
    ],
    "how-to-install-baseboard-trim-jacksonville": [
        figure(
            "baseboard-trim-miter-layout",
            "Clean white baseboard with a precise mitered outside corner over a pale oak floor",
            "Choose the profile, height, and reveal from the existing room before cutting. Baseboard should bridge wall and floor cleanly without hiding movement or damaged material.",
        ),
        figure(
            "interior-door-casing-miter-detail",
            "Clean interior door-casing miters and even jamb reveal beside a finished wall",
            "Cut outside corners accurately, cope inside corners where appropriate, and fasten into sound framing so the joints stay closed as the room moves through seasonal humidity.",
        ),
        figure(
            "drywall-corner-bead-repair-prep",
            "Straight drywall corner bead and thin finish compound prepared on an interior wall",
            "Fill fastener holes, caulk the correct joints, and seal cut ends before paint. Repair uneven drywall or loose corner material first rather than asking trim to disguise a moving surface.",
        ),
    ],
    "how-to-replace-garbage-disposal-jacksonville": [
        figure(
            "kitchen-sink-under-cabinet-plumbing",
            "Kitchen sink cabinet with drain piping, garbage-disposal body, and accessible shutoff valves",
            "Confirm the sink flange, cabinet clearance, drain configuration, electrical connection, and dishwasher discharge before ordering a disposal. The appliance has to fit the plumbing and the available service space.",
        ),
        figure(
            "kitchen-sink-undermount-clips",
            "Underside of a kitchen counter showing sink support clips and a clean drain opening",
            "Support the sink and loosen the mounting ring carefully. A disposal is heavy, and disturbing a sink support or seal can create a leak at the opening above it.",
        ),
        figure(
            "kitchen-sink-drop-in-countertop",
            "Stainless kitchen sink seated in a clean countertop with faucet opening and drain basket",
            "After wiring and drain connections are restored, run water through every joint and inspect the flange, trap, dishwasher inlet, and discharge for seepage before closing the cabinet.",
        ),
    ],
    "how-to-replace-kitchen-faucet-jacksonville": [
        figure(
            "kitchen-sink-drop-in-countertop",
            "Stainless kitchen sink in a clean countertop with a faucet opening and drain basket",
            "Confirm the sink-hole pattern, faucet height, supply shutoffs, and access below the cabinet before buying a replacement. The visual match above the counter is only one part of the fit.",
        ),
        figure(
            "kitchen-sink-under-cabinet-plumbing",
            "Kitchen sink cabinet with supply valves, drain piping, and disposal context",
            "Close the stops, disconnect the old supply lines, and support the faucet while its mounting hardware is removed. Tight access below the sink is where a simple swap can become a plumbing or cabinet repair.",
        ),
        figure(
            "kitchen-sink-undermount-clips",
            "Underside of a kitchen counter showing sink support clips and a clean drain opening",
            "Hand-check the new connections before tightening, then run hot and cold water while inspecting the supply nuts, spray hose route, faucet base, and the surrounding sink support details.",
        ),
    ],
    "how-to-replace-toilet-jacksonville": [
        figure(
            "toilet-installation-base",
            "Generic white porcelain toilet installed squarely on neutral tile with a plain level nearby",
            "Check the flange, finished-floor height, shutoff, and drain alignment before lifting a replacement toilet into the room. The fixture should be matched to a stable, serviceable connection below the floor.",
        ),
        figure(
            "toilet-flange-repair-ring",
            "Toilet flange reinforced with a repair ring at a clean bathroom floor opening",
            "Set the bowl on a stable, level seal and fasten without overtightening porcelain. The flange needs to support the toilet evenly around the drain, not merely hold the bolts in place.",
        ),
        figure(
            "toilet-flange-sunken-diagnosis",
            "Bathroom floor opening showing a flange set below finished floor height",
            "Flush and inspect the base, supply, and tank connections several times. A rocking toilet or damp floor points to a support or seal problem that needs attention, not a cosmetic adjustment.",
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
    slugs = [item["slug"] for item in posts[60:80]]
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
