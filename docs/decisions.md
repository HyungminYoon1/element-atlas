# Decisions

## D05 — Rule-first learning without a new persistence boundary

Context: the element catalog gives facts and quizzes but no starting sequence. Options: another fact dump, a decorative atomic animation, or an authored explanation-to-inference path. Decision: ten Korean units linking particle counts, quantum states, electron configuration, bonding and conditional bulk properties; each has reasoning, a scoped rule, a counterexample/boundary, an original check and source/quiz/element links. Add a bounded 1–30 atom/curated-ion occupancy workbench and the analytic nonrelativistic hydrogen 1s radial distribution. Use measured neutral configurations, preserving Cr/Cu exceptions; remove higher-n electrons first for curated positive ions. Do not depict orbital occupancy as a trajectory or make universal claims from the octet/trend rules.

Rationale: explain reusable causes, not just ask users to memorize data. Lessons and pure calculations stay separate from UI and from the reviewed 118-element snapshot. Existing numeric/photos/crystals and local practice schema are unchanged. Lesson-check feedback is transient and never awards durable quiz progress, writes shared summary, uploads information or uses an external runtime API. Affected: learning.js, learning-ui.js, index/app, scoped learning CSS, tests and README. Follow-up: verify every supported occupancy, hydrogen normalization, lesson/navigation/quiz bridges, storage fixtures, original images, source links and 320/390/1440 layouts; independent expert curriculum review is NOT_RUN.

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
