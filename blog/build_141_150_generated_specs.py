#!/usr/bin/env python3
"""Build hand-reviewed generated-only placements for blog posts 141 through 150."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "blog" / "image-specs" / "placements"
INDEX = ROOT / "blog" / "index.json"
MANIFEST = ROOT / "blog" / "media_manifest.json"


def f(image, alt, caption, before):
    return {"image": image, "alt": alt, "caption": caption, "before": before}


OVERRIDES = {
    "10-red-flags-renovation-contractor-jacksonville": [
        f("trade-qualification-document-review", "Commercial contractor qualification binder beside a blank insurance certificate and project notebook", "Ask for the contractor license, insurance certificate, references, and scope documentation early. Qualification records should support the specific work being proposed.", "<h2>1. They Can't Produce a License Number Immediately</h2>"),
        f("commercial-preconstruction-plan-table", "Commercial planning table with abstract drawings, estimating tools, and a blank notebook", "A written scope gives the owner a way to compare bids, exclusions, allowances, schedule expectations, and the actual work behind the price.", "<h2>3. They Won't Provide a Written Scope of Work</h2>"),
        f("renovation-permit-inspection-rough-in", "Commercial renovation rough-in with exposed plumbing and electrical work beside a blank permit folder", "Permits and inspections are field milestones, not paperwork to address after work starts. The project sequence should identify when each review will occur.", "<h2>8. They Avoid Discussing Permits, Inspections, and Code Compliance</h2>"),
    ],
    "commercial-renovation-cost-per-sqft-jacksonville-2025": [
        f("commercial-preconstruction-plan-table", "Commercial preconstruction table with abstract plans, measuring tools, and estimating materials", "A useful renovation estimate starts with a defined scope and current conditions. Square-foot ranges are only a starting point for comparing the actual work.", "<h2>Why Cost Per Square Foot Has Wide Ranges</h2>"),
        f("brewery-production-trench-drain", "Commercial production room with sealed floor, linear trench drain, equipment pad, and plumbing rough-in", "Specialty interior requirements such as durable floors, drainage, plumbing, power, and equipment coordination can change the cost of a commercial renovation materially.", "<h2>What Changes the Number Most on Any Commercial Renovation</h2>"),
        f("commercial-accessible-restroom-rough-in", "Commercial accessible restroom rough-in with fixture backing, plumbing connections, and clear floor area", "Accessibility and code coordination affect room geometry, rough-in, fixtures, and finish sequencing. They belong in the scope before a fixed price is finalized.", "<h2>Fixed-Price vs. Allowance Contracts for Commercial Renovation</h2>"),
    ],
    "first-generation-vs-second-generation-space-fit-out-jacksonville": [
        f("first-generation-commercial-vanilla-shell", "First-generation commercial vanilla shell with unfinished slab, storefront opening, ceiling services, and utility stubs", "A first-generation space begins as a shell. The tenant must plan the layout, services, finishes, approvals, and construction needed to make it operational.", "<h2>What First Generation Space Is</h2>"),
        f("second-generation-selective-demolition", "Second-generation commercial space under selective demolition with retained ceiling grid and controlled work areas", "A second-generation space can retain useful infrastructure, but existing conditions still need investigation before a new tenant assumes the prior layout will work.", "<h2>What Second Generation Space Is</h2>"),
        f("commercial-preconstruction-plan-table", "Commercial planning table with abstract drawings, measuring tools, and a project notebook", "Due diligence turns a promising lease space into a workable fit-out plan by documenting conditions, utility needs, code questions, scope, and budget before construction begins.", "<h2>The Hidden Cost Variable: Due Diligence on Existing Conditions</h2>"),
    ],
    "metal-roof-vs-architectural-shingle-florida-cost": [
        f("metal-vs-architectural-shingle-roof", "Residential roof comparison showing standing-seam metal beside architectural shingles at a clean valley transition", "Metal and architectural shingle roofs differ in material, attachment, detailing, maintenance, and replacement planning. Compare the complete assembly, not only the visible surface.", "<h2>What Each System Is</h2>"),
        f("standing-seam-roof-concealed-clip-detail", "Standing-seam metal roof eave with concealed clips, underlayment, and clean flashing layers", "Metal roof performance depends on the concealed clip system, panels, underlayment, flashing, and drainage details working together at the roof edge.", "<h2>Wind Performance: Where the Products Diverge</h2>"),
        f("architectural-shingle-wind-installation", "Architectural shingle roof eave under installation with layered underlayment and starter course", "Architectural shingle performance depends on the installed system, including starter course, underlayment, fastening, flashing, and edge details.", "<h2>Insurance Impact in Florida</h2>"),
    ],
    "behavioral-health-unit-construction-requirements-florida": [
        f("behavioral-health-ligature-resistant-room", "Dignified behavioral health room with rounded ligature-resistant fixtures, durable surfaces, and no occupants", "Ligature resistance is a coordinated construction requirement. Fixtures, hardware, openings, finishes, and service access need to be evaluated as a complete room assembly.", "<h2>What Ligature Resistance Means in Construction</h2>"),
        f("behavioral-health-observation-corridor", "Empty behavioral health observation corridor with durable finishes, protected glazing, and controlled room entry", "Observation, circulation, visibility, and access control influence the physical layout of a behavioral health unit. These elements need coordinated design and construction decisions.", "<h2>CPTED Principles in Behavioral Health Design</h2>"),
        f("healthcare-corridor-containment-renovation", "Healthcare renovation containment protecting an active corridor beside organized construction work", "In a licensed setting, construction must coordinate the active environment, life-safety measures, access routes, controls, and inspection requirements throughout the work.", "<h2>AHCA Licensing Requirements for Florida Behavioral Health Units</h2>"),
    ],
    "interim-life-safety-measures-hospital-construction-florida": [
        f("hospital-ilsm-impairment-coordination", "Hospital corridor construction zone with temporary protection, sprinkler work, and a blank impairment-monitoring board", "ILSM begins when construction affects a life-safety feature or operational route. The assessment identifies the temporary conditions that require managed controls.", "<h2>What ILSM Is and Why It Exists</h2>"),
        f("healthcare-containment-documentation", "Hospital corridor containment with a protected route and blank monitoring documentation setup", "The ILSM record should connect the assessed condition, mitigation, responsible team members, inspections, and changes in the active work area.", "<h2>ILSM Documentation Requirements</h2>"),
        f("healthcare-corridor-containment-renovation", "Active healthcare corridor protected by a temporary containment wall and zipper door", "A GC's field coordination must protect active routes, containment, access, work hours, and utility sequencing while construction proceeds beside hospital operations.", "<h2>The GC's Role in ILSM Documentation</h2>"),
    ],
    "st-augustine-historic-construction-contractor-florida": [
        f("commercial-preconstruction-plan-table", "Historic renovation planning table with abstract drawings, ruler, material samples, and a project notebook", "Historic work needs a clear documentation and review path before construction begins. Existing conditions, proposed scope, materials, approvals, and sequencing should be understood together.", "<h2>The HARB Review Process</h2>"),
        f("st-augustine-masonry-access-restoration", "Historic coquina masonry restoration on a narrow protected work route with contained access", "Historic masonry and constrained access make field conditions matter. Repair methods, material compatibility, protection, staging, and access need practical coordination before work begins.", "<h2>Construction Challenges in St. Augustine's Historic Building Stock</h2>"),
        f("historic-window-sill-repair", "Historic wood double-hung window with localized sill repair and retained surrounding trim", "Historic repairs work best when the scope is based on actual conditions. Localized deterioration, water path, repairability, and protected character all affect the final approach.", "<h2>How to Structure the Project for a Successful Outcome</h2>"),
    ],
    "san-marco-commercial-renovation-contractor-jacksonville": [
        f("commercial-preconstruction-plan-table", "Commercial renovation planning table with abstract drawings, measuring tools, and a blank notebook", "Commercial renovation in a historic overlay benefits from an early scope review that connects existing conditions, approvals, tenant needs, budget, and construction sequence.", "<h2>The San Marco Historic Overlay</h2>"),
        f("brewery-taproom-rough-in", "Commercial tenant fit-out with framed bar, plumbing, electrical work, and open ceiling services", "Older commercial interiors often require coordinated work behind the finishes. Plumbing, power, ventilation, framing, and layout need to fit the existing building as well as the tenant program.", "<h2>What Commercial Renovation in San Marco's Older Buildings Actually Involves</h2>"),
        f("commercial-accessible-restroom-rough-in", "Commercial accessible restroom rough-in with backing, plumbing connections, and clear floor area", "Tenant improvements should identify accessibility, occupancy, restroom, route, service, and inspection requirements before finishes make corrective work expensive.", "<h2>Tenant Fit-Out Requirements for Commercial Tenants in San Marco</h2>"),
    ],
    "avondale-historic-district-renovation-permit-guide": [
        f("commercial-preconstruction-plan-table", "Historic renovation planning table with abstract drawings, material samples, and a blank project notebook", "The review process is easier to manage when existing conditions, proposed changes, materials, and project documents are organized before the application is submitted.", "<h2>The HPC Review Process</h2>"),
        f("historic-window-sill-repair", "Historic wood double-hung window with localized sill repair and retained surrounding trim", "Historic review often turns on the difference between targeted repair and unnecessary replacement. The visible condition, water path, and retained character all matter.", "<h2>What the HPC Typically Approves and Denies in Avondale</h2>"),
        f("exterior-window-flashing-sill-membrane", "Window opening with sill flashing membrane formed into a drainage pan before exterior trim", "A historic exterior still needs durable water management. When repair or replacement is approved, flashing and sill details protect the surrounding wall assembly.", "<h2>How Renovations Work Inside Avondale's Historic Homes</h2>"),
    ],
    "warehouse-column-spacing-clear-height-florida": [
        f("warehouse-steel-frame-construction", "High-bay warehouse shell with exposed steel frame, concrete slab, and dock doors", "Clear height is set by the structural and mechanical envelope, not just a number on a plan. The building section needs to support the intended storage and operations.", "<h2>Why Clear Height Is the Primary Value Driver</h2>"),
        f("warehouse-feasibility-massing-model", "Physical warehouse feasibility model with generic loading bays, blank plans, material sample, and calculator", "Column grid, docks, circulation, office area, equipment, and expansion need to be tested together. A feasibility model helps expose the tradeoffs before the structure is fixed.", "<h2>Column Grid Decisions</h2>"),
        f("tilt-up-panel-erection", "Tilt-up concrete warehouse wall panel lifted by crane and stabilized with temporary braces", "The structural system carries through the slab, foundations, panels, steel, and connections. Early decisions about grid and clear height affect all of those components.", "<h2>Structural Implications for the Foundation</h2>"),
    ],
}


def active_ids():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {
        item["id"] for item in manifest["images"]
        if item.get("origin") == "generated"
        and item.get("source") == "codex_imagegen"
        and item.get("approved_for_blog") is True
        and item.get("asset_status") == "active"
        and item.get("metadata_stripped") is True
        and item.get("quality_review") == "approved"
    }


def main():
    posts = json.loads(INDEX.read_text(encoding="utf-8"))
    slugs = [item["slug"] for item in posts[140:150]]
    if set(slugs) != set(OVERRIDES):
        raise ValueError(f"Override mismatch. Missing: {sorted(set(slugs) - set(OVERRIDES))}; extra: {sorted(set(OVERRIDES) - set(slugs))}")
    active = active_ids()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for slug in slugs:
        figures = OVERRIDES[slug]
        if len(figures) != 3:
            raise ValueError(f"{slug} must have exactly three figures")
        for figure in figures:
            if figure["image"] not in active:
                raise ValueError(f"{slug}: {figure['image']} is not an active metadata-clean generated asset")
        result = {
            "_doc": "Generated-only hand-reviewed placement spec. Each image is inserted before the article section it directly supports.",
            "figures": figures,
        }
        (OUTPUT / f"{slug}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"OK   {slug}")


if __name__ == "__main__":
    main()
