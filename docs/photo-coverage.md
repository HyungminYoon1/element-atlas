# Photo coverage review — 2026-10-10

## Scope and result

VERIFIED: all 118 element IDs inventoried; all included file titles, author/license metadata, local bytes, phases and observation classes checked against the curated manifest. Coverage is 97 photographed elements / 100 files, not 100 pure bulk samples. There are 87 elements with specimen/coating/micrograph records and 10 with only other observations. 21 have no included photograph. Original numerical facts, electronic configurations and 89-element crystal coverage are unchanged.

PARTIAL: scientific subject identification relies on original photograph captions and cited institutions/photographers; image inspection does not measure purity. This is not a comprehensive chemistry literature review or independent expert validation. No claim that a missing photograph makes an element intrinsically invisible or impossible to condense.

## Corrected selection defects

The previous importer considered a short hardcoded list of article lead photos, not all 118 elements. Aluminium did not match the numeric source's spelling Aluminum. Photographs of most lanthanides, ordinary gases in condensed states, hafnium, mercury and several radioactive specimens were omitted by selection, not physical impossibility. The new manifest identifies files individually and reviews the absence of each missing entry.

## Observation boundaries

- Actual liquid specimens: helium, nitrogen, oxygen, fluorine and mercury. Argon and xenon records show solid/liquid coexistence. Chlorine has gas and solid records. Helium and promethium have more than one view.
- H: the photograph records particle tracks in liquid hydrogen, not a visible liquid interface. Ne/Kr: electrical discharge, not normal gas colour. Liquid/solid photographs for Ne/Kr remain source-pending.
- Tc/Po/Ra: deposited or electroplated material on a substrate, not an entire bulk piece. Captions identify the substrate/protection.
- Bk/Cf: microscopic/small actual metal specimens. Original low-resolution scientific records are not enlarged into invented detail.
- At/Ac/Pa/Es: radiation-related imaging. The uncolourized Es original is used instead of a coloured derivative. At's blue glow does not establish a blue pure elemental surface.
- Np: the displayed object is nickel-clad. An alleged bare metal button has conflicting original descriptions and was excluded. Am: the original caption does not specify chemical form; it is not counted as a pure specimen.
- Bi/V/Nb/W/Rb/Pb: captions follow the actual file's surface/allotrope/oxide/substrate description rather than a generic elemental-colour assumption.

## Missing records

Cm is source-pending: [ORNL's elemental curium study](https://www.ornl.gov/publication/electronic-structure-elemental-curium-studied-photoemission) confirms metallic curium research, but a reusable verified metal photograph was not obtained. Compound fluorescence, oxide targets and symbolic exhibition photographs were rejected.

Fr and Fm–Og have no included visible bulk photograph. Each entry links to the RSC element page; photographs of ore, apparatus, an atom diagram or a predicted rendering are not substitutes for a bulk specimen. The RSC's [fermium description](https://periodic-table.rsc.org/element/100/) explicitly distinguishes predicted metallic appearance from a sample large enough to see. [Francium](https://periodic-table.rsc.org/element/87/Francium) is studied in tiny, short-lived amounts; a rock containing trace atoms is not a photograph of the element's surface.

All entries, notes and selected original URLs are in `tools/photo-manifest.json` and public `dist/assets/attributions.json`. Individual source/license links remain in the element detail and copyright panel. Sources are retained locally, not requested from a remote image CDN at runtime. No AI images or fabricated sample colours were used.
