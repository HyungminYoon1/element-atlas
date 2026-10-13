# Decisions

## D06 — 조건 연결 도전과 기록 불러오기 부분 성공 / 2026-10-13

Context: 자동 구현 승인에서 기본 개념을 여러 조건의 추론으로 확장합니다. 파일 불러오기 후 저장이 실패해도 성공 안내가 오류를 덮는 경로를 실제 별도 QA 브라우저에서 먼저 재현했습니다. Options: 기존 퀴즈/기록 구조 교체, 서술 AI 채점, 각 단원의 별도 추론 선택과 근거 비교. Decision: 자체 제작 10개 도전을 learning.js/learning-ui.js에 두고 선택/해설은 현재 페이지의 최대 10항목 Map에만 보관합니다. 첫 선택 후 해설을 비교하고 단원을 오갈 때 그 선택을 다시 보여줍니다. 기존 10개 기본 확인 수와 퀴즈 성적/저장/JSON에 합산하지 않습니다. save의 성공 여부에 따라 불러오기 안내를 저장 성공/화면만 성공으로 구분합니다.

Rationale: 입자 수·점유·결합·구조·관측의 연결을 연습하고 기록 복원 결과를 오해하지 않게 합니다. 사용자 원본 키/118원소 수치/사진/결정/라이선스/기존 퀴즈 의미를 유지합니다. Affected: learning.js, learning-ui.js, app.js, tools/qa-import.js, README, learning-provenance/verification. Review: QA 실패 주입은 격리 브라우저에서만 합니다. 도전은 원자·이온의 점유 모형과 지정 조건의 학습 사례이며 벌크 자성/모든 원소 최신 연구를 보증하지 않습니다. 통합 검토에서 O²⁻를 안정한 단독 기체로 오해하지 않도록 전자배치 모형이라는 조건을 명시했습니다. 새 저장소·외부 제공자·비용·공유 요약 접근이 없습니다.

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
