# Verification — 2026-10-09

LOCAL MODEL: 7/7 Node tests passed. 36,000 generated questions across 300 seeds and four levels, distinct choices, type coverage, deterministic replay, targeted review, electron counts for all 118 elements, CIAAW Zr/Gd/Lu revisions, pure-element crystal formula/reference checks, bounded malformed record handling.

LOCAL STATIC: initial 63 public files plus two licensed local UI font files, 118 elements, 56 licensed sample photos and 89 elements with crystal records. Syntax, asset references, UTF-8 BOM absence, image provenance, no runtime API/shared-summary access passed.

LOCAL BROWSER: isolated Playwright CLI Chromium at localhost. Copper and iron comparison, 12-question completion, answers disabled after selection, exactly 12 recorded answers, JSON download, all 56 real photo assets loaded, viewports 1440/390/320 without page-level horizontal overflow, unit-cell detail rendering, no page exceptions. A first QA locator used an exact nested label and timed out; after using the observed control ID, the flow passed. Prior favicon 404 corrected with a local SVG. Artifacts are ignored under output/playwright/creative-qa.

SOURCE REVIEW: PubChem and CIAAW numeric table endpoints VERIFIED; Commons file metadata and individual licenses VERIFIED, photo subject review PARTIAL (reviewed file descriptions and representative rendering, not a physical purity measurement). COD pure-element formula, source metadata and no theoretical/error flags VERIFIED; individual original experiments and complete CIF refinements PARTIAL. No comprehensive literature search or independent expert chemistry review claimed.

REMOTE CI / LIVE: not yet run at this point; appended separately after publication.
