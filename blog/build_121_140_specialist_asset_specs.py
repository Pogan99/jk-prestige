#!/usr/bin/env python3
"""Write source specs for the specialist generated masters used by posts 121-140."""
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SPEC_DIR = ROOT / "blog" / "image-specs"


ASSETS = [
    ("tilt-up-panel-erection", "Tilt-up concrete warehouse wall panel being lifted and temporarily braced on a Florida industrial site.", ["commercial", "warehouse", "tilt_up", "preconstruction"], ["construction", "structure"], "clean", "low", "Use for tilt-up warehouse shell costs, panel erection, structural sequencing, and industrial construction guidance."),
    ("warehouse-rack-anchor-slab-interface", "Warehouse rack upright base plate, anchor bolts, control joint, and slab flatness check.", ["commercial", "warehouse", "concrete", "racking_systems"], ["inspection", "layout", "diagnosis"], "diagnostic", "low", "Use for warehouse racking, anchor planning, slab condition, floor flatness, and industrial fit-out guidance."),
    ("site-grading-stormwater-basin", "Florida commercial building pad, swale, stormwater basin, culvert inlet, and erosion-control fence.", ["commercial", "sitework", "drainage", "flood"], ["site_planning", "civil"], "clean", "low", "Use for flood-zone diligence, finished grade, drainage, stormwater, civil planning, and commercial site guidance."),
    ("commercial-driveway-access-layout", "Commercial driveway throat and curb layout connecting a prepared site to a Florida arterial corridor.", ["commercial", "sitework", "access", "permitting"], ["site_planning", "civil"], "clean", "low", "Use for controlled access, driveway permits, site circulation, civil coordination, and commercial due diligence."),
    ("brewery-production-trench-drain", "Commercial brewery production room with sealed floor, linear trench drain, equipment pad, and plumbing rough-in.", ["commercial", "brewery", "plumbing", "drainage"], ["fit_out", "construction"], "clean", "low", "Use for brewery production zones, trench drains, sanitary finishes, floor slopes, and utility coordination."),
    ("commercial-accessible-restroom-rough-in", "Commercial accessible-restroom rough-in with clear floor area, fixture backing, and plumbing connections.", ["commercial", "accessibility", "plumbing", "fit_out"], ["rough_in", "code_coordination"], "clean", "low", "Use for commercial restroom capacity, accessibility coordination, rough-in, and tenant fit-out guidance."),
    ("flat-roof-primary-emergency-scupper", "TPO roof parapet with separate lower primary scupper and higher emergency-overflow scupper.", ["commercial", "roofing", "drainage", "scupper"], ["detail", "inspection"], "clean", "low", "Use for primary and secondary roof drainage, scuppers, parapets, and reroofing guidance."),
    ("healthcare-containment-documentation", "Hospital corridor containment with protected route and blank documentation/monitoring setup.", ["healthcare", "commercial", "containment", "renovation"], ["phasing", "inspection"], "clean", "low", "Use for active-facility phasing, infection-control planning, documentation, and protected circulation."),
    ("sterile-processing-zoned-buildout", "Sterile processing department build-out with separated cleanable work zones, pass-through, MEP rough-in, and floor drain.", ["healthcare", "sterile_processing", "commercial", "mep"], ["fit_out", "coordination"], "clean", "low", "Use for sterile-processing renovations, airflow and utility coordination, cleanable finishes, and healthcare fit-outs."),
    ("home-addition-foundation-hvac-tie-in", "Florida room addition showing new slab, plumbing stubs, framing, HVAC connection, and existing-home tie-in.", ["residential", "addition", "foundation", "hvac"], ["construction", "rough_in"], "clean", "low", "Use for room additions, foundation tie-ins, HVAC extensions, residential scheduling, and permit-scope guidance."),
    ("warehouse-office-mezzanine-guardrail", "Warehouse office mezzanine with continuous guardrails, protected stairs, support columns, and enclosed office below.", ["commercial", "warehouse", "mezzanine", "office_buildout"], ["construction", "structure"], "clean", "low", "Use for warehouse office mezzanines, safe stairs, structural support, guardrails, and industrial build-outs."),
    ("coastal-home-elevated-foundation", "Coastal Florida custom home framing on a raised foundation with roof trusses and graded sandy lot.", ["residential", "coastal", "custom_home", "foundation"], ["construction", "site_planning"], "clean", "low", "Use for coastal custom-home planning, elevated foundations, roof framing, drainage, and buildable-envelope guidance."),
    ("coastal-residential-site-layout", "Coastal residential lot with survey stakes, string lines, graded house footprint, and mature vegetation.", ["residential", "coastal", "sitework", "permitting"], ["site_planning", "layout"], "clean", "low", "Use for coastal home site planning, setbacks, footprint layout, permit coordination, and buildable-envelope guidance."),
    ("multi-tenant-industrial-shell-drainage", "Tilt-up multi-tenant industrial shell with dock openings, a demising framing bay, pavement, and stormwater inlet.", ["commercial", "warehouse", "multi_tenant", "sitework"], ["construction", "site_planning"], "clean", "low", "Use for multi-tenant industrial parks, tilt-up shells, tenant delivery, docks, and site drainage."),
    ("warehouse-feasibility-massing-model", "Physical warehouse massing model with loading bays, blank plans, material sample, and calculator.", ["commercial", "warehouse", "preconstruction", "feasibility"], ["planning", "estimating"], "clean", "low", "Use for warehouse feasibility, build-versus-lease planning, project requirements, and early cost coordination."),
    ("flat-roof-drainage-layout-review", "Wide TPO commercial roof view with roof drains, tapered crickets, seams, and parapet scuppers.", ["commercial", "roofing", "drainage", "tpo"], ["inspection", "detail"], "clean", "low", "Use for roof drainage review, TPO layouts, crickets, roof drains, and reroofing guidance."),
]


def main():
    for asset_id, desc, domains, modes, tone, messiness, notes in ASSETS:
        path = SPEC_DIR / f"{asset_id}.json"
        payload = {
            "id": asset_id,
            "file": f"generated/{asset_id}.png",
            "desc": desc,
            "domains": domains,
            "modes": modes,
            "visual_tone": tone,
            "messiness": "clean" if messiness == "low" else messiness,
            "reuse_notes": notes,
        }
        path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        print(f"OK   {path.name}")


if __name__ == "__main__":
    main()
