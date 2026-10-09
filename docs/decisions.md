# Decisions

## D01 — Sourced static science, not a live scraping proxy

Context: the user wants comprehensive current element information and actual sample images. Options: runtime scraping, a copyrighted summary dump, or reviewed build-time numeric/photo snapshots. Decision: choose primary numeric sources and Commons original photos with explicit source/license records, vendored locally. Preserve unknowns and phase-specific information; do not claim universal latestness from retrieval time. Rationale: stable Pages behavior, no external runtime tracking, traceable science and licensing. Affected: importer, elements data, attributions/source UI, checks. Review: compare updated CIAAW mass values, representative elements/allotropes, heavy-element unknowns and every included image's caption/license.

## D02 — Device-local study schedule without shared-score mutation

Context: existing apps' shared completion format allows only fifteen IDs. Options: update every existing app, add a backend, or keep chemistry study data in its own bounded key. Decision: own local key and portable JSON only; no new shared-key entries. Rationale: preserve unrelated service boundaries. Affected: model/app/practice files, gallery read-only catalog extension. Review: invalid data, bounded imports, deletion and storage denial; public rankings remain unchanged.

## D03 — Local readable UI font

Decision: use unmodified Pretendard Variable 1.3.9 under SIL OFL 1.1, retaining the full license and a system fallback. No font CDN. Options: device-dependent fallback only, remote font, local licensed font. Rationale: stable Korean UI without tracking. Files: CSS, font assets, CSP. Review: final actual capture and font load.

## D04 — Complete photo inventory with explicit observation classes

Context: the user requests all photographable elements, including condensed gases; the old 56-element selection omitted available samples. Options: collect arbitrary article lead images; label containers/discharge/compounds as elemental appearance; or curate all 118 element IDs with individual files and explicit gaps. Decision: a reviewed manifest, 97 elements / 100 authentic licensed records, with phase, observation class, source and absence status. Count 87 specimen/coating/micrograph elements separately from 10 observation-only elements. No synthetic images, misleading purity claims, compound substitutions or predicted heavy-element photographs. Retain the exact LANL notice for its attribution-only photograph.

Rationale: completeness of review does not mean all 118 elements have a visible bulk sample or that every existing image has reusable rights. A source-pending curium photo is a sourcing gap, not an assertion that curium cannot be observed. Captions separate substrates, ionization, discharge and oxidation from actual surface appearance. The architecture, runtime CSP, provider/cost, data retention and access control remain unchanged; photos stay same-origin and practice storage is untouched.

Affected: photo manifest/importer, generated elements and credits, local photo/license assets, photo model/UI, README, coverage report, tests; WEB LAB catalog and actual preview. Follow-up: visually inspect every new image; check phase selectors and all filters at desktop/mobile; assert numerical facts and crystal records unchanged; preserve original/photo licensing distinctions; check source drift before a future refresh. The photo-only importer must never refetch numerical/COD data.
