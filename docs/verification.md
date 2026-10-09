# Verification — 2026-10-09

## 2026-10-10 Photo coverage expansion — LOCAL

LOCAL TEST: 14/14 model/photo tests PASS, including the existing 36,000 quiz cases. STATIC: 111 public files, all 118 review entries, 97 photographed elements / 100 files, specimen87/other-observation10, photo hashes and individual source/license records PASS. All 118 original numerical/electron-configuration/crystal records compare exactly equal to the pre-update snapshot when photo fields are excluded. Numerical source and acquisition metadata remain unchanged.

IMPORT RUNTIME: the legacy `--photos-only` entry ran with fetch-host monitoring; only four Commons metadata requests, zero PubChem/CIAAW/COD requests and zero image downloads on refresh. All existing files were reused. A missing author/license/download now fails rather than silently publishing a partial photograph inventory.

LOCAL BROWSER: isolated Playwright CLI Chromium; all 118 element dialogs, every one of the 100 photo views decoded, 21 missing-photo explanations, all source destinations, multi-image selectors and five filters (118/97/87/10/21), 118 source inventory rows PASS. Desktop1440/mobile390/320 pages and oxygen dialogs had no horizontal overflow. Shared summary and existing own practice strings remained exactly unchanged during photo browsing. Observed page exceptions and failed asset responses: zero. Actual screenshots are under ignored `output/playwright/photo-coverage`; two contact sheets covered all 44 additions, each visually inspected. The first QA locator expected an exact label including options and timed out; it was changed to the observed selector, then the full flow passed.

SOURCE SCOPE: element-atlas architecture/requirements/README, relevant importer/UI and manifest/checks VERIFIED. Entire 118-ID photo review and 100 original-file metadata/license records VERIFIED. Subject identification and scientific physical purity PARTIAL, based on cited photographers/institutions rather than a physical assay. Missing sources and observation boundaries are documented in `docs/photo-coverage.md`. No AI specimen pictures, unsafe home chemistry procedures or new hosting/storage/ranking providers were added. Unrelated app/game code and independent expert science review NOT_INSPECTED/NOT_RUN. REMOTE_CI and LIVE are recorded separately after publication.

## 2026-10-10 REMOTE_CI / LIVE

Implementation commit `0313fed2ef693c0e21e8510c04add90f1ca93019`: [verify/deploy PASS](https://github.com/HyungminYoon1/element-atlas/actions/runs/37947822165). Public Pages uses the verified GitHub origin; normal pushes only.

LIVE HTTP: all 65 public dist files returned HTTP200 and matched the local verified SHA256 bytes. Across six affected services, 151/151 files matched after the gallery deployment completed.

LIVE BROWSER: copper detail/compare, twelve level-4 questions and single-count answers, actual study JSON download. Desktop 1440 and mobile 390/320 without page overflow; observed page errors and failed asset responses zero. Photo files are verified public assets, not invented samples.

The existing shared completion string was unchanged. Creative files stay browser-local; individual own keys are a code contract, not origin isolation between GitHub Pages paths. Physical hardware, all browsers and independent expert interoperability/scientific review remain NOT_RUN. This evidence update changes docs only.



LOCAL MODEL: 7/7 Node tests passed. 36,000 generated questions across 300 seeds and four levels, distinct choices, type coverage, deterministic replay, targeted review, electron counts for all 118 elements, CIAAW Zr/Gd/Lu revisions, pure-element crystal formula/reference checks, bounded malformed record handling.

LOCAL STATIC: initial 63 public files plus two licensed local UI font files, 118 elements, 56 licensed sample photos and 89 elements with crystal records. Syntax, asset references, UTF-8 BOM absence, image provenance, no runtime API/shared-summary access passed.

LOCAL BROWSER: isolated Playwright CLI Chromium at localhost. Copper and iron comparison, 12-question completion, answers disabled after selection, exactly 12 recorded answers, JSON download, all 56 real photo assets loaded, viewports 1440/390/320 without page-level horizontal overflow, unit-cell detail rendering, no page exceptions. A first QA locator used an exact nested label and timed out; after using the observed control ID, the flow passed. Prior favicon 404 corrected with a local SVG. Artifacts are ignored under output/playwright/creative-qa.

SOURCE REVIEW: PubChem and CIAAW numeric table endpoints VERIFIED; Commons file metadata and individual licenses VERIFIED, photo subject review PARTIAL (reviewed file descriptions and representative rendering, not a physical purity measurement). COD pure-element formula, source metadata and no theoretical/error flags VERIFIED; individual original experiments and complete CIF refinements PARTIAL. No comprehensive literature search or independent expert chemistry review claimed.

REMOTE CI / LIVE: not yet run at this point; appended separately after publication.
