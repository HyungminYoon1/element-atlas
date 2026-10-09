# ELEMENT ATLAS architecture

Independent public static GitHub Pages service. Browser-native HTML/CSS/ES modules; no runtime framework, remote API, account, microphone, tracking, ranking or cloud storage. Public output is dist only. Existing services and the personal root site are not merged.

## Layers

- dist/src/elements.js: generated, reviewed numeric fact snapshot and image provenance. No DOM, fetch, storage or fictional unknown values.
- dist/src/model.js: pure table positions, deterministic randomized questions, answer evaluation and bounded practice-record validation.
- dist/src/app.js: UI, deliberate sample selection, quiz lifecycle and bounded own-key localStorage adapter. User text goes through textContent.
- dist/styles.css / index.html: responsive semantic discovery, element detail, compare, practice and source panels; no external fonts or scripts.
- dist/assets/elements: downloaded/licensed elemental sample photos. Images retain authorship, original file page, license and sample caption. Discharge tubes and compounds are never presented as pure-element appearance.
- tools/import-data.mjs: build-time read-only source download and deterministic mechanical snapshot production. It never runs in the public site. Numerical facts are distinct from third-party copyrighted prose. Original endpoints, retrieval date, provenance and unknowns are preserved.
- test / tools/check.mjs / docs: focused science/model/import/asset checks, local/browser/remote/live evidence and decision log.

## Science and data boundaries

Use PubChem for sourced numeric properties and electron configurations, CIAAW for standard atomic weights including its 2024 revisions. CPK display colors are not physical elemental colors. Atomic radius definitions, temperature/pressure and allotropes affect comparisons: do not assume all listed melting points apply at 1 atm or all densities at 25°C. Heavy synthetic bulk properties may be unmeasured; explicitly mark absent/unreviewed/predicted data and do not fabricate pure-element photographs. Crystal data must cite elemental phase and original reference; a general cell illustration is not an atom trajectory or an original CIF refinement.

Image retrieval may use Wikimedia APIs during development; the public app loads same-origin assets only. Keep an image manifest and attributions. Exclude unclear reuse terms and generic mineral/compound/reactor portraits from pure sample photos. Build-only downloads obey conservative rate limits and no credentials. No unsafe chemical synthesis or home-lab instructions.

## State

Active practice is in memory. Own key element-atlas-practice-v1 stores only bounded scheduling/error counts for element IDs; no names, raw inputs or cloud transfer. Explicit reset is recoverable through an exported practice JSON if wanted; invalid data does not silently overwrite records. Do not write web-lab-progress-v1 because existing services only understand the approved fifteen-app shared schema. Browser storage on a shared Pages origin is not path isolation.

UTF-8 without BOM / CRLF. Library-free numerical/quiz code is independently testable. Actual photos and export/UI behavior require browser checks; a passing data test is not an expert science review. Pinned existing official Actions verify before publishing dist.
