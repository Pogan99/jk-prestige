#!/usr/bin/env python3
"""Build generated-only placement specs for blog posts 121 through 140."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path("/Users/carlosguerrero/seomachine-jk-prestige/image-bank/placements")
OUTPUT = ROOT / "blog" / "image-specs" / "placements"
INDEX = ROOT / "blog" / "index.json"
MANIFEST = ROOT / "blog" / "media_manifest.json"


def f(image, alt, caption):
    return {"image": image, "alt": alt, "caption": caption}


OVERRIDES = {
    "10-things-know-before-building-jacksonville-westside": [
        f("site-grading-stormwater-basin", "Raised commercial building pad beside a stormwater basin, swale, culvert inlet, and erosion-control fence", "Flood-zone diligence is not abstract: confirm the building pad elevation, finished grades, drainage path, and stormwater approach before the site plan is fixed."),
        f("warehouse-steel-frame-construction", "High-bay warehouse shell with steel structure, concrete slab, and dock doors", "Industrial zoning still has a practical envelope. Setbacks, buffers, impervious area, utilities, access, and the intended use have to work together before a warehouse site becomes buildable."),
        f("commercial-driveway-access-layout", "Commercial driveway throat and curb layout joining a prepared site to a wide arterial corridor", "Driveway access on a controlled corridor needs to be considered with site circulation and civil work, early enough that the permit path does not force a late redesign."),
    ],
    "warehouse-construction-cost-breakdown-florida-2025": [
        f("tilt-up-panel-erection", "Tilt-up concrete warehouse wall panel lifted by crane and stabilized with temporary braces", "Tilt-up panel casting, lifting, bracing, connections, and finish requirements are distinct shell costs. They should be carried separately from roof framing, MEP, and tenant work."),
        f("commercial-preconstruction-plan-table", "Commercial planning table with abstract drawings and estimating tools", "Use a defined scope and current site information to compare costs. A credible estimate separates shell work, tenant improvements, engineering, permitting, allowances, and contingency."),
        f("warehouse-steel-frame-construction", "High-bay warehouse shell with exposed steel frame, concrete slab, and dock doors", "The base warehouse scope still includes structure, slab, docks, utilities, and clear height. Pricing only visible interior finishes leaves major shell and site items unaccounted for."),
    ],
    "brewery-taproom-fit-out-jacksonville-florida": [
        f("brewery-taproom-rough-in", "Brick commercial taproom under construction with framed bar, plumbing, and ceiling services", "A taproom fit-out has to coordinate the bar, plumbing, electrical, ventilation, floor protection, and finish sequence. The visible room comes together only after those systems have a workable route."),
        f("brewery-production-trench-drain", "Brewery production room with sealed floor, linear trench drain, equipment pad, and plumbing rough-in", "Brewery production depends on a floor that can handle cleaning water. Drain location, slope, durable finishes, and equipment-pad coordination need to be resolved before brewing equipment arrives."),
        f("commercial-accessible-restroom-rough-in", "Commercial accessible-restroom rough-in with fixture backing, plumbing connections, and clear floor area", "Taproom occupancy affects restroom capacity, routes, and fixture layout. Accessibility is most reliable when the required room geometry and rough-in are coordinated before finishes close the walls."),
    ],
    "flat-roof-drain-scupper-design-florida-jacksonville": [
        f("flat-roof-scupper-drainage-detail", "Flashed metal roof scupper with clean TPO membrane and a small leaf accumulation", "A scupper must drain a properly sloped roof assembly, not merely create a hole through the parapet. Even a small debris accumulation is a reason to inspect the drainage path before wet weather exposes a weakness."),
        f("flat-roof-primary-emergency-scupper", "TPO parapet with a lower primary scupper and a separate higher emergency-overflow scupper", "Primary and emergency drainage need to be reviewed together. The overflow path should communicate a problem before water reaches a roof edge or an unintended opening."),
        f("flat-roof-drainage-layout-review", "Wide TPO roof with drains, tapered crickets, membrane seams, and parapet scuppers", "A drainage review belongs before the membrane specification. Drains, crickets, scuppers, seams, and the roof geometry must work as one water-management system."),
    ],
    "phased-hospital-corridor-renovation-active-facility": [
        f("healthcare-corridor-containment-renovation", "Active-facility corridor protected by a temporary containment wall and zipper door", "In an active facility, containment, clean routes, work hours, and access need to be designed before demolition begins. The construction zone must coexist with the operational corridor."),
        f("commercial-preconstruction-plan-table", "Commercial project-planning table with abstract drawings and coordination tools", "Phase work around clinical operations, utilities, inspections, and turnover criteria. A written sequence is what keeps temporary conditions from becoming an uncontrolled schedule problem."),
        f("healthcare-containment-documentation", "Hospital corridor containment with a protected route and blank documentation and monitoring setup", "Documentation belongs with the controlled work zone. Containment checks, route protection, cleaning, and field records need to be reliable enough for the facility to review them during the phase."),
    ],
    "sterile-processing-department-construction-florida": [
        f("sterile-processing-zoned-buildout", "Sterile processing build-out with separated cleanable work zones, pass-through opening, MEP rough-in, and floor drain", "Sterile processing depends on separated workflow, cleanable finishes, coordinated utilities, and verified turnover. Those requirements need to be visible in the room before equipment and finishes lock the layout in."),
        f("commercial-preconstruction-plan-table", "Commercial planning workspace with drawings and coordination tools", "Coordinate equipment, plumbing, electrical, HVAC, and inspection requirements before walls close. Specialized healthcare rooms leave little room for improvising after finishes are installed."),
        f("healthcare-corridor-containment-renovation", "Healthcare renovation containment beside organized MEP rough-in", "Active-facility phasing protects the operational areas beside a specialized interior. The boundary, access path, and service coordination are part of the sterile-processing scope, not an afterthought."),
    ],
    "submittals-rfi-log-gc-partner-expectations-florida": [
        f("commercial-preconstruction-plan-table", "Commercial planning workspace with abstract drawings, laptop, and hardhat", "A useful submittal and RFI process turns unanswered field questions into tracked decisions. The objective is to resolve details before they become change orders or rework."),
        f("brewery-taproom-rough-in", "Commercial fit-out with bar framing and coordinated plumbing and electrical rough-in", "Complex interiors show why coordination matters: equipment, plumbing, electrical, and finishes all compete for the same space. RFIs should clarify the intended assembly before trades build past the conflict."),
        f("home-addition-roof-tie-in", "Addition roof tie-in with visible flashing and framing coordination", "Interfaces between new and existing construction are especially sensitive to incomplete information. Detail approvals should protect the water, structure, and finish sequence before work proceeds."),
    ],
    "bonding-requirements-trade-subs-florida-gc": [
        f("commercial-preconstruction-plan-table", "Commercial planning workspace with abstract plans and estimating tools", "Bonding and qualification start with a defined scope, responsible parties, and documentation that can be reviewed. Good paperwork reflects real capacity rather than a generic promise."),
        f("warehouse-steel-frame-construction", "High-bay warehouse shell with steel frame and concrete slab", "Larger commercial work combines structure, schedule, and trade coordination. A subcontractor's package should make its exclusions, interfaces, and manpower plan clear before work is awarded."),
        f("home-addition-roof-tie-in", "Residential addition framing and roof tie-in at an existing wall", "Even smaller scopes have consequential interfaces. Clear responsibility for framing, flashing, permits, and inspection protects the owner and the trade partner alike."),
    ],
    "gc-partner-subcontractor-daily-report-florida": [
        f("commercial-preconstruction-plan-table", "Commercial coordination table with plans, clipboard, and laptop", "A daily report should connect work performed, manpower, deliveries, decisions, and constraints to the actual plan. Useful reporting makes a developing problem visible while it can still be managed."),
        f("healthcare-corridor-containment-renovation", "Temporary containment wall protecting an active facility corridor", "Phased sites make daily reporting essential because access, containment, and operational constraints change the work plan from one shift to the next."),
        f("home-addition-roof-tie-in", "New addition framing and roof tie-in meeting an existing stucco home", "Record weather protection, inspections, and interface work as it happens. Once a connection is covered, the project needs a clear record of how it was assembled."),
    ],
    "whole-house-renovation-occupied-home-florida": [
        f("occupied-home-renovation-dust-barrier", "Occupied home separated from renovation work by a zip-wall and protected floor route", "An occupied renovation needs a deliberate plan for dust, access, daily cleanup, storage, and work sequencing. Living through construction is feasible only when the temporary conditions are treated as part of the scope."),
        f("master-bath-shower-waterproofing", "Master-bath shower at waterproofing stage with pan, curb, membrane, and plumbing rough-in", "Bathrooms demonstrate why renovation sequencing matters: rough-in, waterproofing, inspection, tile, and finish work cannot be collapsed into one convenient weekend."),
        f("home-addition-roof-tie-in", "Florida addition framing at a layered roof and wall connection", "Whole-house work often exposes connections between old and new assemblies. Plan those interfaces early so weather protection and structural details are not delayed by finish decisions."),
    ],
    "master-bath-gut-renovation-timeline-jacksonville": [
        f("master-bath-shower-waterproofing", "Shower waterproofing stage with sloped pan, curb, membrane, and plumbing rough-in", "The waterproofing stage is one of the points where a bath timeline cannot be rushed. The pan, curb, drain, wall transitions, and inspection sequence must be right before tile hides the work."),
        f("bathroom-sink-p-trap-vanity", "Vanity cabinet with accessible sink P-trap and supply valves", "Coordinate vanity dimensions and plumbing access before countertop and finish work. A beautiful cabinet is still a poor installation if shutoffs and drains cannot be serviced."),
        f("shower-valve-cartridge-access", "Shower valve access point prepared for service behind finished wall material", "Plan serviceability with the finished wall assembly in mind. Valve, trim, and access details should be confirmed before the final closeout phase."),
    ],
    "historic-window-replacement-jacksonville-renovation": [
        f("historic-window-sill-repair", "Historic wood double-hung window with a removed lower sash and localized sill repair condition", "Start by distinguishing repairable sash and sill deterioration from a full replacement need. Preservation work is scope-sensitive: the correct answer depends on water path, wood condition, operation, and historic character."),
        f("exterior-window-flashing-sill-membrane", "Window opening with sill flashing membrane formed into a drainage pan", "If replacement or major repair is required, give the opening a reliable drainage strategy. New or restored windows still depend on the sill and flashing details around them."),
        f("exterior-window-brickmould-trim", "Finished exterior window trim with a sloped sill and narrow caulk joint", "Finish trim and sealant should direct water outward without trapping it. The visible exterior joint is only the last layer of the window's water-management assembly."),
    ],
    "orange-park-home-addition-contractor-jacksonville": [
        f("home-addition-foundation-hvac-tie-in", "Florida room addition with new slab, plumbing stubs, framed walls, HVAC connection, and existing-home tie-in", "An addition starts with a real connection between old and new: foundation, framing, utilities, HVAC, roof, and drainage. The scope has to resolve those interfaces before finish choices take over."),
        f("commercial-preconstruction-plan-table", "Planning table with abstract drawings, ruler, and estimating tools", "Define scope, setbacks, utilities, permit needs, and finish priorities before construction begins. A clear planning phase prevents the addition from becoming a chain of late decisions."),
        f("home-addition-roof-tie-in", "Florida home addition framing meeting an existing stucco wall at a layered roof tie-in", "Roof and wall integration are high-consequence addition details. Resolve flashing, framing, windows, and drainage as one assembly before the work is covered."),
    ],
    "yulee-nassau-county-commercial-construction-gc": [
        f("warehouse-steel-frame-construction", "High-bay commercial warehouse shell with steel framing and dock doors", "Commercial construction starts with site, structure, utilities, access, and the intended operating use. The shell has to support the tenant or owner plan before interior work begins."),
        f("commercial-preconstruction-plan-table", "Commercial project-planning table with drawings and coordination tools", "Early coordination around permits, civil work, utilities, and long-lead items protects the schedule. A capable GC aligns these decisions before crews are waiting on site."),
        f("flat-roof-scupper-drainage-detail", "Low-slope roof scupper and membrane drainage detail", "Envelope and drainage details are part of the commercial scope from the outset. Local rain exposure makes roof and site water management a design and maintenance issue, not a cosmetic item."),
    ],
    "neptune-beach-custom-home-builder": [
        f("coastal-residential-site-layout", "Coastal residential lot laid out with survey stakes, string lines, graded footprint, and mature vegetation", "A coastal custom home starts with the buildable envelope. Survey layout, setbacks, drainage, and the house footprint need to be understood before a permit set can be treated as complete."),
        f("coastal-home-elevated-foundation", "Coastal Florida home framing on a raised foundation with roof trusses and graded sandy lot", "Coastal construction needs the foundation, roof structure, site drainage, and exposure conditions to work together before finishes make the project look complete."),
        f("hurricane-shutter-panel-system", "Closed aluminum hurricane-shutter panel system at a Florida residential window", "Opening protection and exterior detailing should be planned with the home's architecture rather than added as an emergency accessory. Every window and door needs an opening-specific strategy."),
    ],
    "atlantic-beach-home-renovation-contractor": [
        f("commercial-preconstruction-plan-table", "Preconstruction table with abstract plans, measuring tools, and coordinated project materials", "A renovation permit path starts with a defined scope, existing conditions, and coordinated drawings. Good planning reduces late revisions once field work exposes the actual assembly."),
        f("historic-window-sill-repair", "Historic-style wood window under localized sill repair assessment", "Coastal renovation often begins with an honest assessment of water-exposed details. Repair scope should follow the actual condition of the window, trim, and surrounding assembly."),
        f("home-addition-roof-tie-in", "Florida addition framing connected to existing stucco wall and roof flashing", "When the renovation reaches an exterior connection, roof and wall integration becomes a technical project, not just an interior finish upgrade."),
    ],
    "multi-tenant-industrial-park-construction-florida": [
        f("multi-tenant-industrial-shell-drainage", "Tilt-up multi-tenant industrial shell with dock openings, demising framing bay, pavement, and stormwater inlet", "Multi-tenant industrial work needs a shell that can accommodate demising, docks, service distribution, tenant delivery, and site drainage. Early flexibility is designed into both the building and civil work."),
        f("tilt-up-panel-erection", "Tilt-up concrete warehouse wall panel lifted and temporarily braced during shell construction", "Panel erection, connections, and structural sequencing establish the shell that future tenant areas inherit. Those decisions need to anticipate how the building will be divided and served."),
        f("commercial-preconstruction-plan-table", "Commercial planning workspace with drawings and estimating tools", "Coordinate common areas, tenant interfaces, permit sequencing, and utility responsibility before construction locks in the wrong assumptions."),
    ],
    "warehouse-lease-vs-build-jacksonville-florida": [
        f("warehouse-steel-frame-construction", "Empty high-bay warehouse shell with steel frame, dock doors, and concrete floor", "Lease-versus-build starts with the operating requirements: clear height, docks, power, site circulation, office area, and expansion. A generic square-foot comparison misses the features that determine usability."),
        f("commercial-preconstruction-plan-table", "Commercial preconstruction table with abstract plan sheets and cost-planning tools", "Compare the real constraints, costs, timeline, and control of each option before deciding. A well-defined needs list makes the financial comparison more credible."),
        f("warehouse-feasibility-massing-model", "Physical warehouse massing model with generic loading bays, blank plans, material sample, and calculator", "A retained developer or owner needs to compare requirements before deciding whether to lease or build. Clear height, docks, circulation, expansion, cost, and schedule belong in the feasibility work, not in a generic square-foot comparison."),
    ],
    "racking-system-concrete-floor-spec-warehouse-florida": [
        f("warehouse-floor-flatness-check", "Concrete warehouse floor checked with a laser level and straightedge across a joint", "Racking layout begins with verified floor condition, flatness, joints, and anchor strategy. A subtle elevation change can matter when tall storage systems and precise aisles are planned."),
        f("warehouse-rack-anchor-slab-interface", "Warehouse rack upright base plate with anchor bolts, shims, concrete joint, and straightedge", "Racking anchors, base plates, shims, joints, and slab tolerance have to work together. The rack plan should be based on verified floor performance, not an idealized slab drawing."),
        f("commercial-preconstruction-plan-table", "Commercial planning table with drawings and coordination tools", "Use a coordinated specification for loads, anchors, aisle widths, equipment, and inspection. Those decisions cross structural, operational, and safety requirements."),
    ],
    "warehouse-office-mezzanine-build-out-jacksonville": [
        f("warehouse-office-mezzanine-guardrail", "Warehouse office mezzanine with continuous guardrails, protected stairs, support columns, and enclosed office below", "An office mezzanine is a structural and circulation project: load path, deck, stairs, guardrails, support bases, utilities, and office enclosure all need to be resolved as one package."),
        f("commercial-preconstruction-plan-table", "Commercial planning workspace with plans, laptop, hardhat, and estimating tools", "Coordinate code, structural support, stairs, utilities, office layout, and permits as one package. A mezzanine adds multiple scopes that need to be resolved before fabrication."),
        f("warehouse-floor-flatness-check", "Warehouse floor condition inspected with a laser level and straightedge", "Review the slab and base conditions where new supports, equipment, and partitions may land. The office build-out has to respect the industrial floor and operating environment below it."),
    ],
}


def active_ids():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {item["id"] for item in manifest["images"] if item.get("origin") == "generated" and item.get("source") == "codex_imagegen" and item.get("approved_for_blog") is True and item.get("asset_status") == "active" and item.get("metadata_stripped") is True and item.get("quality_review") == "approved"}


def main():
    posts = json.loads(INDEX.read_text(encoding="utf-8"))
    slugs = [item["slug"] for item in posts[120:140]]
    if set(slugs) != set(OVERRIDES):
        raise ValueError(f"Override mismatch. Missing: {sorted(set(slugs) - set(OVERRIDES))}; extra: {sorted(set(OVERRIDES) - set(slugs))}")
    active = active_ids()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for slug in slugs:
        original = json.loads((SOURCE / f"{slug}.json").read_text(encoding="utf-8"))
        figures = OVERRIDES[slug]
        if len(figures) != len(original["figures"]) or len(figures) != 3:
            raise ValueError(f"{slug} must have exactly three figures")
        merged = []
        for pos, item in enumerate(figures):
            if item["image"] not in active:
                raise ValueError(f"{slug}: {item['image']} is not an active metadata-clean generated asset")
            merged.append({**item, "before": original["figures"][pos]["before"]})
        result = {"_doc": "Generated-only replacement placement spec. Heading anchors retained from the original reviewed placement file.", "figures": merged}
        (OUTPUT / f"{slug}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"OK   {slug}")


if __name__ == "__main__":
    main()
