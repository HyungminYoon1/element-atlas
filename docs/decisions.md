# Decisions

## D01 — Sourced static science, not a live scraping proxy

Context: the user wants comprehensive current element information and actual sample images. Options: runtime scraping, a copyrighted summary dump, or reviewed build-time numeric/photo snapshots. Decision: choose primary numeric sources and Commons original photos with explicit source/license records, vendored locally. Preserve unknowns and phase-specific information; do not claim universal latestness from retrieval time. Rationale: stable Pages behavior, no external runtime tracking, traceable science and licensing. Affected: importer, elements data, attributions/source UI, checks. Review: compare updated CIAAW mass values, representative elements/allotropes, heavy-element unknowns and every included image's caption/license.

## D02 — Device-local study schedule without shared-score mutation

Context: existing apps' shared completion format allows only fifteen IDs. Options: update every existing app, add a backend, or keep chemistry study data in its own bounded key. Decision: own local key and portable JSON only; no new shared-key entries. Rationale: preserve unrelated service boundaries. Affected: model/app/practice files, gallery read-only catalog extension. Review: invalid data, bounded imports, deletion and storage denial; public rankings remain unchanged.

## D03 — Local readable UI font

Decision: use unmodified Pretendard Variable 1.3.9 under SIL OFL 1.1, retaining the full license and a system fallback. No font CDN. Options: device-dependent fallback only, remote font, local licensed font. Rationale: stable Korean UI without tracking. Files: CSS, font assets, CSP. Review: final actual capture and font load.
