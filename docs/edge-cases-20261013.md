# ELEMENT ATLAS edge-case audit — 2026-10-13

This systematic edge-case audit is distinct from the earlier maintenance. Evidence is LOCAL only. No commit/push/deploy, gallery/ranking edit, delegation, provider/cost, schema/retention, bank-version, scoring or science-content change occurred.

All three named repositories were inventoried before implementation. Only the owned repository files were edited. The supplied AGENTS and architecture > api-spec > requirements > README precedence apply.

## Commands and evidence levels

N identifiers map to exact new Node test names in the catalog. They execute under npm test and the existing verify workflow. DOM doubles are labeled; they are not browser/layout evidence. B identifiers map to tools/edge-browser.mjs. Current CI runs npm test and npm run check; **it does not execute this manual browser harness**.

Browser prerequisites verified/reused: ../output/playwright/implement-20261012/package.json, Playwright1.61.1 and C:/Program Files/Google/Chrome/Application/chrome.exe. No dependency/install/CI change. PLAYWRIGHT_PACKAGE can override the installed package.json; CHROME_PATH can override the executable.

Start node tools/serve.mjs 0 in a persistent session. In PowerShell set $env:EDGE_URL='http://127.0.0.1:<printed-port>/' then run node --test tools/edge-browser.mjs. The harness requires loopback, uses isolated headed Chrome with audio muted, fresh QA contexts, and closes its own browser. No personal browser profile/records accessed.

Functional paths use actual typing, clicks, selects and keyboard input. Composition/detached controls, quota/denial, delayed/rejected files deliberately inject labeled events/failures. They are not naturally occurring quota exhaustion, real OS IME, or mobile hardware proof. Existing reusable QA flows were read/adapted; element-atlas additionally executes its existing qa-import.js.

Captures:1440×1000/390×844/320×780; numeric page-overflow checks passed. Selected desktop initial/mobile feedback/result/experiment/lesson captures were visually reviewed. Sites are scrollable documents; this is not an exhaustive visual review of all states.

## Inventory and source coverage

Clean main baseline HEADccbd5ec969f39d1ab8ab97a7593546109d0d444b;135trackedfiles including100photos,appendix. Root:dist/src/assets,docs,test,tools,.github,ignored output/.playwright-cli. requirements.md present;api-spec.md/repository AGENTS.md absent.

VERIFIED full authoritative reads:architecture/requirements/README/decisions,package/.gitattributes/.gitignore/workflow. VERIFIED relevant source/tests:app/model/learning/learning-ui/photo-model,focused tests,tools/check/serve/qa-import.js,learning-provenance. Repositoryoverall PARTIAL:elements snapshot/photo metadata/manifest/attributions/importers and oldverification appendices inventoried/selected. Existing all-ID/photohash/provenance tests ran;that is not full-file source review or physicalspecimenanalysis. No datarefresh/literatureclaim. .git/dependencies,siblings/gallery/ranking/publicsite NOT_INSPECTED.

## Results / actual failures-before / fixes-after

npm test **27/27 PASS**,fail/skip/todo0:19existing+8new. Manualbrowser **10/10 PASS**. npm run check/git diff --check PASS after normalization.

Before app.js edit: $env:EDGE_URL='http://127.0.0.1:51095/'; node --test --test-name-pattern='detached|IME|rejected file|newest import|reset invalidates' tools/edge-browser.mjs executed6,pass1/fail5:
- B4 late next must not skip question two:question2→3,S−2/Z16→Fe+2/Z26. Finalassertion additionallyusesvisible counter so repeatedprompts cannot conceal skipping.
- B5 composition must leave quiz open:explanationcount1vs0.
- B6 file read rejection must not escape handler:pageerrorcount1vs0 (QA read failure fixture).
- B7 late import must not replace latest record:answered2vs3.
- B8 reset must not be undone by pending import:answered9vs0.
- B1 olddisabledanswer already inert onbaseline:coverageaddition,notfixedbug.

Minimalfixes: next ownssubmittedquestion/consumesonce;keyboardignores composing/229;filetext rejectioncaught and displayed;generationselect/latestread and confirmedreset invalidate latecompletion. The same six regression cases passed in the full harness; the final ten-case harness passed. Eightpuretests unchangedmodel/science are coverageadditions,notRED_GREEN. Grading/data/schema/retentionunchanged.

## Feature/boundary matrix

|Feature|Cases|Actual tests/results|Remaining|
|---|---|---|---|
|Quizsettings/generation|level1/4,count1/50,categories,0/5/51/fraction/string/nonfinite/unknown,unavailablecategory|N1;existing every seed and level produces four unambiguous options with stable answers:36000cases VERIFIED|Allseeds/browsercombinations NOT_RUN|
|Targetedreview|every118singleID,f-block/syntheticendpoints,immutable list,targetmaintained|N2;existing review questions target the requested elements including synthetic/f-block cases VERIFIED|All118reviewUI NOT_RUN|
|Independentgrading|ionZ−charge at endpointseeds and12actualUIanswers|N8;B9 VERIFIED|All10questiontypes independentproof NOT_RUN|
|Submit/next/terminal|firstanswer,disabledduplicates,oldnextignored,12/12result,normalEnter|B1,B4,B9 VERIFIED|Every naturalinterleave NOT_RUN|
|Lessons/restore|firstapplicationchoice retained acrossnavigation,noownwrites,lessonquizbridge|B2;existing ten authored lessons have a rule, evidence, scope, sources and an unambiguous check VERIFIED|All10applicationUI thisaudit NOT_RUN|
|Orbitalworkbench|neutral1/30,Fe3+23electrons/5unpaired,adjacentunsupportedcharge/type/nonfinite,immutabledata|N7;existing allsupportedPauli/Hund/CrCu/Fe tests;B2 VERIFIED|Beyond1–30/curatedions N/A|
|Hydrogen|0/10/outside/type/nonfinite,independentquadraturePDF at.1/1/6/10,actualHome/End.1/6|N6;existing normalizationtest;B2 VERIFIED|Everyradius/device NOT_RUN;many-electronphysics N/A|
|Parser/import|40000/40001chars,countermin/max/oneover,118entries,z1/118/outside,null/malformed/duplicate,auxfieldsstripped|N3,N5;existing local records reject malformed, oversized, duplicated and misleading counters;B9badJSON/40001bytefilepreserve VERIFIED|Exact40000byteUI NOT_RUN;parserchars/filebytes distinction|
|Recordscoring|100000answers/correct,10000errors/reviews,saturation,duplicateelementonce,immutability|N4;existing recordtest VERIFIED|Everyhistory NOT_RUN|
|Asyncfile/race|caughtrejection,oldafternewignored,oldafterresetignored|B6,B7,B8 VERIFIED:labeledFile.textfixtures|Powerloss/processkill NOT_RUN|
|Cancel/reset/restore|cancelnewquiz/import,resetcancel,export→reset→import→reload12answers|B3,B9 VERIFIED|Undo N/A;exportbackup|
|Storage/quota/isolation|failedimportmemoryonly,previousdurable4answerspreserved,sharedsentinelbyteequal|B10 executesqa-import.js;corrupt-storagecodeinspected VERIFIED/PARTIAL|Getterdenial/readbackfailure NOT_RUN thisaudit|
|Explorer/search/compare|zeroresults,map/specimenfilter,actualOphoto,cap3/fourthrefused/removal,arrowfocus29→30,Enter/Escape|B9+32.9secexploration VERIFIED|All118dialogs/all100photoUI NOT_RUN|
|Sciencesnapshot/photos|allID/count/classification/hash/provenance,nullablefacts,118electroncounts|existing photos/modeltests+check VERIFIED|Expert/source-refresh/physicalassay NOT_RUN|
|Keyboard/IME/focus/mobile|realEnter/arrow/Escape,nextfocus,composingeventfixture,3viewports|B2,B5,B9 VERIFIED|OSIME/touch/screenreader/otherbrowser NOT_RUN|
|Determinism/learningcorrectness|replayoptions/answers,independentionoracle,lessonnotquizrecord|existing generationtest+N8/B2/B9 VERIFIED|Tamperresistance N/A|
|Remoteasync/gallery/ranking|staticsame-originassets,noAPI,shared15-IDkeyforbidden|N/A|Parentintegrationseparate|

Visualreview:selecteddesktopinitial,mobileresult/lesson andreadfailure captures: no unintendedhorizontaloverflow/overlap/illegiblefeedback observed. Realexploration:zeroresultsearch,ionizationmap,specimen87,comparecap/removal,decodedliquidoxygenphoto. This does not cover allseeds/devices/photos.

## Changes / visible UI / integration

dist/src/app.js;new test/edge-cases.test.js,tools/edge-browser.mjs;docs/decisions.md,docs/verification.md,thisreport. Scientific, photo, crystal, license and lesson data are unchanged.

Ignored output/playwright/edge-20261013:initial/result/lesson-{1440,390,320}.png,practice.json,read-failure-1440.png,red-green.txt.
VisibleUIchange **YES:newfile-read-failure noticeonly**. Refresh error-statecapture/documentation ifused:notebooktab,isolatedFile.textrejection,#status “기록 파일을 읽지 못했습니다. 기존 기록은 유지됩니다.” Use read-failure-1440.png. The nominal gallery thumbnail and layout are unchanged; the gallery was not edited.

Node22.23.2,UTF8/noBOM/CRLF,diffchecksverified. The owned browser and server were closed. The browser harness is manual; current CI does not execute it. REMOTE_CI/LIVE/DEPLOY NOT_RUN;The parent owns release.

## Exact new test catalog

- N1 — `edge: quiz level/count/category min/max and type/nonfinite boundaries` — test/edge-cases.test.js — PASS
- N2 — `edge: every single-element review including both f-block endpoints targets the requested ID` — test/edge-cases.test.js — PASS
- N3 — `edge: practice length 40000/40001 and all counter/element boundaries` — test/edge-cases.test.js — PASS
- N4 — `edge: saturated counters, duplicate question element IDs and immutable scheduling records` — test/edge-cases.test.js — PASS
- N5 — `edge: parse/export round trip strips auxiliary fields without mutating imported object` — test/edge-cases.test.js — PASS
- N6 — `edge: hydrogen 0/10, just-outside/type/nonfinite and independent quadrature probabilities` — test/edge-cases.test.js — PASS
- N7 — `edge: neutral endpoints and charged workbench immutability with unsupported just-outside states` — test/edge-cases.test.js — PASS
- N8 — `edge: ion answer independently follows charge conservation over endpoint seeds` — test/edge-cases.test.js — PASS
- B1 — `edge-browser: detached answer cannot score the next question` — tools/edge-browser.mjs — PASS
- B2 — `edge-browser: learning first choice restores, occupancy controls and lesson quiz bridge` — tools/edge-browser.mjs — PASS
- B3 — `edge-browser: cancel replacement quiz and import preserve active question and existing bytes` — tools/edge-browser.mjs — PASS
- B4 — `edge-browser: detached next cannot skip an unanswered question` — tools/edge-browser.mjs — PASS
- B5 — `edge-browser: IME numeric key cannot select an answer` — tools/edge-browser.mjs — PASS
- B6 — `edge-browser: rejected file read is handled and preserves durable state` — tools/edge-browser.mjs — PASS
- B7 — `edge-browser: newest import wins when earlier read completes late` — tools/edge-browser.mjs — PASS
- B8 — `edge-browser: reset invalidates pending import` — tools/edge-browser.mjs — PASS
- B9 — `edge-browser: ion quiz complete, keyboard, export reload, cancel restore and malformed imports` — tools/edge-browser.mjs — PASS
- B10 — `edge-browser: quota import is memory only and other-app data remains byte identical` — tools/edge-browser.mjs — PASS

## Baseline tracked inventory (names only)

Inventory does not imply every auxiliary file was fully read. Ignored QA output, dependencies and .git were not recursively reviewed. New audit files are listed above.

```text
.gitattributes
.github/workflows/pages.yml
.gitignore
README.md
architecture.md
dist/assets/attributions.json
dist/assets/elements/ac-1.png
dist/assets/elements/ag.jpg
dist/assets/elements/al-1.jpg
dist/assets/elements/am-1.jpg
dist/assets/elements/ar-1.jpg
dist/assets/elements/as-1.jpg
dist/assets/elements/at-1.jpg
dist/assets/elements/au.jpg
dist/assets/elements/b.jpg
dist/assets/elements/ba.jpg
dist/assets/elements/be-1.jpg
dist/assets/elements/bi.jpg
dist/assets/elements/bk-1.jpg
dist/assets/elements/br.jpg
dist/assets/elements/c.jpg
dist/assets/elements/ca.jpg
dist/assets/elements/cd.jpg
dist/assets/elements/ce.jpg
dist/assets/elements/cf-1.jpg
dist/assets/elements/cl-1.jpg
dist/assets/elements/cl-2.jpg
dist/assets/elements/co.jpg
dist/assets/elements/cr.jpg
dist/assets/elements/cs.jpg
dist/assets/elements/cu.jpg
dist/assets/elements/dy-1.jpg
dist/assets/elements/er.jpg
dist/assets/elements/es-1.jpg
dist/assets/elements/eu-1.jpg
dist/assets/elements/f-1.jpg
dist/assets/elements/fe.jpg
dist/assets/elements/ga.png
dist/assets/elements/gd.jpg
dist/assets/elements/ge.jpg
dist/assets/elements/h-1.jpg
dist/assets/elements/he-1.jpg
dist/assets/elements/he-2.jpg
dist/assets/elements/hf-1.jpg
dist/assets/elements/hg-1.jpg
dist/assets/elements/ho-1.jpg
dist/assets/elements/i.jpg
dist/assets/elements/in.jpg
dist/assets/elements/ir.jpg
dist/assets/elements/k.jpg
dist/assets/elements/kr-1.jpg
dist/assets/elements/la-1.jpg
dist/assets/elements/li.png
dist/assets/elements/lu-1.jpg
dist/assets/elements/mg.jpg
dist/assets/elements/mn.jpg
dist/assets/elements/mo.jpg
dist/assets/elements/n-1.jpg
dist/assets/elements/na.jpg
dist/assets/elements/nb.jpg
dist/assets/elements/nd.jpg
dist/assets/elements/ne-1.jpg
dist/assets/elements/ni.jpg
dist/assets/elements/np-1.jpg
dist/assets/elements/o-1.jpg
dist/assets/elements/os.jpg
dist/assets/elements/p.jpg
dist/assets/elements/pa-1.jpg
dist/assets/elements/pb.jpg
dist/assets/elements/pd.jpg
dist/assets/elements/pm-1.png
dist/assets/elements/pm-2.png
dist/assets/elements/po-1.jpg
dist/assets/elements/pr-1.jpg
dist/assets/elements/pt.jpg
dist/assets/elements/pu-1.jpg
dist/assets/elements/ra-1.jpg
dist/assets/elements/rb.jpg
dist/assets/elements/re.jpg
dist/assets/elements/rh.jpg
dist/assets/elements/rn-1.jpg
dist/assets/elements/ru.jpg
dist/assets/elements/s.jpg
dist/assets/elements/sb-1.jpg
dist/assets/elements/sc.jpg
dist/assets/elements/se.jpg
dist/assets/elements/si.jpg
dist/assets/elements/sm-1.jpg
dist/assets/elements/sn.jpg
dist/assets/elements/sr.jpg
dist/assets/elements/ta.jpg
dist/assets/elements/tb-1.jpg
dist/assets/elements/tc-1.jpg
dist/assets/elements/te.jpg
dist/assets/elements/th.jpg
dist/assets/elements/ti.jpg
dist/assets/elements/tl-1.jpg
dist/assets/elements/tm-1.jpg
dist/assets/elements/u.jpg
dist/assets/elements/v.jpg
dist/assets/elements/w.jpg
dist/assets/elements/xe-1.jpg
dist/assets/elements/y.jpg
dist/assets/elements/yb-1.jpg
dist/assets/elements/zn.jpg
dist/assets/elements/zr.jpg
dist/assets/fonts/OFL.txt
dist/assets/fonts/PretendardVariable.woff2
dist/assets/icon.svg
dist/assets/licenses/LANL-NOTICE.txt
dist/index.html
dist/learning.css
dist/src/app.js
dist/src/elements.js
dist/src/learning-ui.js
dist/src/learning.js
dist/src/model.js
dist/src/photo-model.js
dist/styles.css
docs/decisions.md
docs/learning-provenance.md
docs/photo-coverage.md
docs/verification.md
package.json
requirements.md
test/learning.test.js
test/model.test.js
test/photos.test.js
tools/check.mjs
tools/import-data.mjs
tools/import-photos.mjs
tools/photo-importer.mjs
tools/photo-manifest.json
tools/qa-import.js
tools/serve.mjs
```

