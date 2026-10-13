# Verification — 2026-10-09

## 2026-10-13 자동 구현 — 통합 인계

- SOURCE VERIFIED: architecture.md > requirements.md > README.md, docs/decisions.md, 제공된 AGENTS, .gitattributes/package.json, learning/learning-ui/model/app/index와 관련 테스트·check/serve를 전체 확인했습니다. api-spec.md/저장소 AGENTS.md는 없습니다. 저장소 전체는 PARTIAL: 사진/manifest/원소 스냅샷·수집기·보조 문서는 목록 후 이 작업 관련 경로를 선택했습니다. 모든 사진 원본을 이번에 재관찰한 것으로 주장하지 않습니다.
- BUG: 기록 JSON 불러오기에서 save 실패 안내를 무조건 성공 안내가 덮었습니다. 격리 브라우저에서 setItem 실패를 주입한 회귀 검사가 먼저 `학습 기록을 불러왔습니다.`로 실패했습니다. save 결과를 반환해 성공/화면만 불러오기 안내로 나눈 뒤 tools/qa-import.js PASS. 실제 기존 12답 기록은 바이트 동일하게 보존되며 새로고침 후 answered=12입니다. 잘못된 기록을 복구/삭제하거나 저장 키를 바꾸지 않습니다.
- CONTENT/UI: 10단원의 추가 추론 도전, 첫 선택/기준/근거, 단원을 오가도 첫 선택 유지. O/O²⁻, N/O 예외, Fe³⁺, 동위원소+이온, 역과정 결합 에너지, 동소체와 관측 조건을 다룹니다. 현재 페이지 최대 10선택만 메모리에 유지하며 기본 확인/퀴즈 성적·기록에 합산하지 않습니다. UI change: YES. 개념 출처는 learning-provenance.md.
- LOCAL: npm test **19/19 PASS**, 실패/skip/todo 0. 기존 36,000 quiz cases·118전자 수·중성1–30/지원 이온 Pauli/Hund·Cr/Cu/Fe 예외·수소1s·사진 manifest/재사용 경계 검사 유지. npm run check **PASS: 114 public files, 118 reviewed elements, 97 photographed elements / 100 licensed files, 87 specimen / 10 observations, 89 crystal elements**. 사진/원소/결정/attributions/라이선스 파일은 변경하지 않았고 모든 기존 사진 해시 검사가 통과했습니다.
- ACTUAL BROWSER: 별도 QA 세션, http://127.0.0.1:52047/element-atlas/ (초기 실패 재현은 자체 loopback). 10개 도전, 틀린 첫 선택→단원 이동→복귀 후 선택 유지, 버튼 재선택 차단, 학습 전후 자체/공유 저장 동일 PASS. Fe³⁺ 3d⁵·홀전자5, 실제 철 사진 로드/원본·라이선스 캡션, 실제 1단계 이온12문제를 화면의 Z−q로 계산해 12/12, 기록 JSON 실제 다운로드와 새로고침 지속 PASS. 1440×1000 / 390×844 / 320×780 변경 패널의 페이지 가로 넘침 0, 관측한 page errors/console errors 0. 캡처 육안 확인. 첫 QA가 존재하지 않는 6문제 옵션을 요청해 멈췄고 실제 제공하는 12문제로 교정하여 전체 흐름을 통과했습니다.
- CAPTURE/SELECTORS: ignored `output/playwright/qa-20261013/application-1440.png`, `application-390.png`, `application-320.png`, `iron-detail.png`. 1단원에서 잘못된 첫 답을 고른 `.application-check`의 선택/기준/근거 상태, 철 상세는 `#element-dialog`와 실제 `#element-detail img`. 단원은 `[data-lesson=charge]` 등으로 이동합니다. QA 스크립트/다운로드는 같은 폴더; 실패 회귀 실행은 `playwright-cli -s=<isolated-session> run-code --filename tools/qa-import.js`.
- CHANGED FILES: README.md, dist/src/app.js, dist/src/learning.js, dist/src/learning-ui.js, tools/qa-import.js(new), docs/decisions.md, docs/learning-provenance.md(new), docs/verification.md.
- FINAL FILE CHECK: 변경 텍스트8개 UTF-8 no BOM/CRLF, git diff --check PASS. Node v22.23.2. 자체 QA 브라우저/임시 서버만 종료했으며 메인 통합 서버는 유지했습니다.
- LIMITS: Chromium의 위 경로만 확인했습니다. 사진 100장 전체 UI 재순회, 모든 퀴즈 난이도 E2E, 다른 브라우저/실제 하드웨어, 물리적 표본 분석·독립 전문가 검토·최신 연구 전체 조사 NOT_RUN. 기존 안전/고립 이온 모형·사진 관측 분류를 유지합니다. 갤러리/미리보기/REMOTE_CI/LIVE는 메인이 확인하며 이 세션은 커밋·푸시·배포·갤러리 편집·에이전트 생성 없이 완료했습니다.

## 2026-10-10 개념 학습 경로 — LOCAL

- SOURCE VERIFIED: architecture/requirements/README/decisions, 기존 원소·문제·사진 UI와 이번 학습 모듈/테스트/정적 검사를 검토했습니다. 기존 118원소 수치·97종 사진 100장·결정 데이터는 변경하지 않았습니다. OpenStax Chemistry 2e의 원자·양자·전자배치·주기율·결합·물질 상태 단원을 근거로 한국어 설명과 확인 문제를 자체 작성했습니다. 원문 기출문제를 복사하지 않았습니다.
- LOCAL: 19/19 tests PASS, 114 public files 정적 검사 PASS, git diff --check PASS. 중성 1–30 및 지원 이온의 전자 수/Pauli/Hund, Cr/Cu 예외·Fe 양이온의 4s 제거, 수소 1s 밀도와 적분 확률, 지원 범위 밖 입력의 거절을 검사했습니다. 기존 36,000 quiz cases도 통과합니다.
- ACTUAL BROWSER: 별도 Playwright CLI Chromium에서 10개 개념 확인, 중성 원소 30개, Fe2+/Cr, 6a0 이내 99.9% 확률, 실제 탄소 사진·전자배치 설명·기존 문제 탭 연결을 확인했습니다. 개념 확인은 기존 학습 기록을 쓰지 않습니다. desktop1440/mobile390/320에서 페이지 가로 넘침과 관측된 page errors가 없었습니다. 새 미리보기는 새로고침 후 0/10인 실제 1440×1000 실행 화면입니다.
- PARTIAL / NOT_RUN: 양자 설명은 학습용 수소 1s 해석과 제한된 전자배치입니다. 모든 원소의 수치 양자 계산, 독립 전문가 검토, 모든 기기/브라우저 검증은 하지 않았습니다. 원자·물성 규칙의 적용 범위를 각 개념에 표시합니다. 이번 변경의 REMOTE_CI/LIVE는 로컬 검증과 별도로 확인합니다. QA 파일은 ignored output/playwright/2026-10-10-improvements에 있습니다.

## 2026-10-10 Photo coverage expansion — REMOTE_CI / LIVE

REMOTE_CI: implementation `baaf8252a3db023516ea74cab4278a42ed8b387f` [verify/deploy PASS](https://github.com/HyungminYoon1/element-atlas/actions/runs/37957960728); exact-photo selection follow-up `39d170cfc6ba51d9be30d2fca7cabc8bcfa730e5` [verify/deploy PASS](https://github.com/HyungminYoon1/element-atlas/actions/runs/37958550249). Verified origin and normal fast-forward pushes; no unrelated repositories or services changed.

LIVE HTTP: all 111 public dist files returned HTTP200 and matched the verified local SHA256 bytes at the follow-up revision. Together with WEB LAB's 24 files, 135/135 public files matched. Reports and actual screenshots remain under ignored `output/playwright/photo-coverage`.

LIVE BROWSER: isolated Playwright CLI Chromium on the public Pages URL; all 118 element dialogs, all 100 photo views decoded, six condensed-state cards opened their pictured view, five filters (118/97/87/10/21), 21 missing-photo explanations and 118 source inventory rows PASS. Original-photo destinations matched the inventory. Desktop1440/mobile390/320 pages and oxygen dialogs had no horizontal overflow; observed page exceptions and failed responses zero.

STORAGE BOUNDARY: known practice/shared-summary fixtures in the isolated QA browser remained byte-identical during photo browsing. The user's actual browser profile was not inspected or modified. Physical specimen purity, independent expert chemistry review, every device/browser and a complete literature search remain NOT_RUN/PARTIAL as described in `docs/photo-coverage.md`. Missing-source and indirect-observation labels remain visible; this is not a claim that all visible specimens have been obtained. This evidence follow-up changes docs only, not the verified dist files.

## 2026-10-10 Photo coverage expansion — LOCAL

LOCAL TEST: 14/14 model/photo tests PASS, including the existing 36,000 quiz cases. STATIC: 111 public files, all 118 review entries, 97 photographed elements / 100 files, specimen87/other-observation10, photo hashes and individual source/license records PASS. All 118 original numerical/electron-configuration/crystal records compare exactly equal to the pre-update snapshot when photo fields are excluded. Numerical source and acquisition metadata remain unchanged.

IMPORT RUNTIME: the legacy `--photos-only` entry ran with fetch-host monitoring; only four Commons metadata requests, zero PubChem/CIAAW/COD requests and zero image downloads on refresh. All existing files were reused. A missing author/license/download now fails rather than silently publishing a partial photograph inventory.

LOCAL BROWSER: isolated Playwright CLI Chromium; all 118 element dialogs, every one of the 100 photo views decoded, 21 missing-photo explanations, all source destinations, multi-image selectors and five filters (118/97/87/10/21), 118 source inventory rows PASS. Desktop1440/mobile390/320 pages and oxygen dialogs had no horizontal overflow. Known shared-summary and own-practice fixtures in the isolated QA browser remained exactly unchanged during photo browsing. Observed page exceptions and failed asset responses: zero. Actual screenshots are under ignored `output/playwright/photo-coverage`; two contact sheets covered all 44 additions, each visually inspected. The first QA locator expected an exact label including options and timed out; it was changed to the observed selector, then the full flow passed.

SOURCE SCOPE: element-atlas architecture/requirements/README, relevant importer/UI and manifest/checks VERIFIED. Entire 118-ID photo review and 100 original-file metadata/license records VERIFIED. Subject identification and scientific physical purity PARTIAL, based on cited photographers/institutions rather than a physical assay. Missing sources and observation boundaries are documented in `docs/photo-coverage.md`. No AI specimen pictures, unsafe home chemistry procedures or new hosting/storage/ranking providers were added. Unrelated app/game code and independent expert science review NOT_INSPECTED/NOT_RUN. REMOTE_CI and LIVE are recorded separately after publication.

LOCAL PHASE CARD FOLLOW-UP: all six condensed-state cards now open the exact pictured photograph, including solid chlorine and superfluid helium rather than their element's first view. The entire 118-dialog/100-image/three-viewport flow was rerun and passed after this selection correction. The thumbnail screenshot is visually unchanged.

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
