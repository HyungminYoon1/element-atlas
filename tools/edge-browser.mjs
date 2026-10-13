// Manual isolated Chrome harness; npm test/CI does not execute tools/edge-browser.mjs.
// Start tools/serve.mjs first. EDGE_URL must be an owned loopback server.
// Uses the approved reusable Playwright installation; no personal browser profile.
import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const qaRequire=createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE ?? '../output/playwright/implement-20261012/package.json'));
const {chromium}=qaRequire('playwright');
const url=process.env.EDGE_URL;
if(!url || new URL(url).hostname!=='127.0.0.1')throw Error('Set EDGE_URL to the owned loopback URL');
const out=resolve('output/playwright/edge-20261013');
let browser;
before(async()=>{await mkdir(out,{recursive:true});browser=await chromium.launch({executablePath:process.env.CHROME_PATH??'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:false,args:['--mute-audio']});});
after(async()=>{await browser?.close();});
async function fresh(t,init){
  const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
  t.after(()=>context.close());if(init)await context.addInitScript(init);
  const page=await context.newPage();page.setDefaultTimeout(5000);await page.goto(url);return page;
}
async function views(page,name,locator){
  for(const [width,height]of [[1440,1000],[390,844],[320,780]]){
    await page.setViewportSize({width,height});if(locator)await locator.scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'page overflow '+width);
    await page.screenshot({path:resolve(out,name+'-'+width+'.png'),scale:'css'});
  }
}

const key='element-atlas-practice-v1';
const record=n=>JSON.stringify({version:1,answered:n,correct:n,entries:[]});
async function start(page){await page.locator('[data-tab="practice"]').click();await page.locator('#level').selectOption('1');await page.locator('#category').selectOption('calculation');await page.locator('#start-quiz').click();}
async function answerIon(page){const s=await page.locator('.question').textContent();const m=s.match(/전하가 ([+-]?\d+).*원자번호 (\d+)/);assert.ok(m,'independent ion fixture');await page.locator('.answer').filter({hasText:new RegExp('^\\d'+(Number(m[2])-Number(m[1]))+'$')}).click();}
test('edge-browser: detached answer cannot score the next question',async t=>{
  const p=await fresh(t);await start(p);
  await p.evaluate(()=>window.oldAnswer=document.querySelector('.answer'));
  await p.locator('.answer').first().click();await p.locator('#next-question').click();
  const before=await p.evaluate(k=>localStorage.getItem(k),key);
  await p.evaluate(()=>window.oldAnswer.click());
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),before,'late answer must preserve record');
});

test('edge-browser: learning first choice restores, occupancy controls and lesson quiz bridge',async t=>{
  const p=await fresh(t);const before=await p.evaluate(()=>localStorage.getItem('element-atlas-practice-v1'));
  await p.locator('.application-check .learn-choice').first().click();const response=await p.locator('.application-check .check-feedback').textContent();
  await p.locator('[data-lesson="ions"]').click();await p.getByLabel('전자배치 원소',{exact:true}).selectOption('26');await p.getByLabel('전자배치 전하',{exact:true}).selectOption('3');
  assert.match(await p.locator('.atom-summary').textContent(),/전자 23개.*짝 없는 전자 5개/);
  await p.locator('[data-lesson="quantum"]').click();await p.getByLabel('수소 관측 반지름').focus();await p.keyboard.press('End');
  assert.match(await p.locator('.radial-result').textContent(),/6.0a₀.*99.9%/);
  await p.keyboard.press('Home');assert.match(await p.locator('.radial-result').textContent(),/0.1a₀/);
  await p.locator('[data-lesson="charge"]').click();assert.equal(await p.locator('.application-check .check-feedback').textContent(),response);
  assert.equal(await p.evaluate(()=>localStorage.getItem('element-atlas-practice-v1')),before);
  await views(p,'lesson',p.locator('#learning'));
  await p.getByRole('button',{name:'관련 문제 풀기',exact:true}).click();assert.equal(await p.locator('.question').isVisible(),true);
});
test('edge-browser: cancel replacement quiz and import preserve active question and existing bytes',async t=>{
  const p=await fresh(t);await start(p);const before=await p.locator('.quiz-top').textContent();
  p.once('dialog',d=>d.dismiss());await p.locator('#start-quiz').click();assert.equal(await p.locator('.quiz-top').textContent(),before);
  await p.locator('[data-tab="notebook"]').click();const raw=await p.evaluate(k=>localStorage.getItem(k),key);
  p.once('dialog',d=>d.dismiss());await p.locator('#import-record').setInputFiles({name:'cancel.json',mimeType:'application/json',buffer:Buffer.from(record(3))});
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),raw);
  await p.locator('[data-tab="practice"]').click();assert.equal(await p.locator('.quiz-top').textContent(),before);
});

test('edge-browser: detached next cannot skip an unanswered question',async t=>{
  const p=await fresh(t);await start(p);await p.locator('.answer').first().click();
  await p.evaluate(()=>window.oldNext=document.querySelector('#next-question'));
  await p.locator('#next-question').click();const before=await p.locator('.quiz-top').textContent();
  await p.evaluate(()=>window.oldNext.click());
  assert.equal(await p.locator('.quiz-top').textContent(),before,'late next must not skip question two');
});
test('edge-browser: IME numeric key cannot select an answer',async t=>{
  const p=await fresh(t);await start(p);
  await p.evaluate(()=>document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'1',isComposing:true,bubbles:true})));
  assert.equal(await p.locator('.explanation').count(),0,'composition must leave quiz open');
  await p.keyboard.press('1');assert.equal(await p.locator('.explanation').count(),1);
});
test('edge-browser: rejected file read is handled and preserves durable state',async t=>{
  const p=await fresh(t);await p.locator('[data-tab="notebook"]').click();
  await p.evaluate(k=>{localStorage.setItem(k,JSON.stringify({version:1,answered:7,correct:7,entries:[]}));File.prototype.text=function(){window.readAttempted=true;return Promise.reject(Error('QA read failure'));};},key);
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.locator('#import-record').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from(record(2))});
  await p.waitForFunction(()=>window.readAttempted);await p.waitForTimeout(100);
  assert.equal(errors.length,0,'file read rejection must not escape handler');
  assert.match(await p.locator('#status').textContent(),/읽|불러오.*실패/);
  assert.equal(JSON.parse(await p.evaluate(k=>localStorage.getItem(k),key)).answered,7);
});
test('edge-browser: newest import wins when earlier read completes late',async t=>{
  const p=await fresh(t,()=>{window.confirm=()=>true;});
  await p.locator('[data-tab="notebook"]').click();
  await p.evaluate(()=>{const original=File.prototype.text;File.prototype.text=function(){if(this.name==='slow.json')return new Promise(r=>window.resolveSlow=()=>original.call(this).then(r));return original.call(this);};});
  await p.locator('#import-record').setInputFiles({name:'slow.json',mimeType:'application/json',buffer:Buffer.from(record(2))});
  await p.waitForFunction(()=>window.resolveSlow);
  await p.locator('#import-record').setInputFiles({name:'new.json',mimeType:'application/json',buffer:Buffer.from(record(3))});
  await p.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).answered===3,key);
  await p.evaluate(()=>window.resolveSlow());await p.waitForTimeout(100);
  assert.equal(JSON.parse(await p.evaluate(k=>localStorage.getItem(k),key)).answered,3,'late import must not replace latest record');
});
test('edge-browser: reset invalidates pending import',async t=>{
  const p=await fresh(t,()=>{window.confirm=()=>true;});
  await p.locator('[data-tab="notebook"]').click();
  await p.evaluate(()=>{File.prototype.text=function(){return new Promise(r=>window.resolveRead=()=>r(JSON.stringify({version:1,answered:9,correct:9,entries:[]})));};});
  await p.locator('#import-record').setInputFiles({name:'slow.json',mimeType:'application/json',buffer:Buffer.from(record(9))});
  await p.waitForFunction(()=>window.resolveRead);await p.locator('#reset-record').click();
  await p.evaluate(()=>window.resolveRead());await p.waitForTimeout(100);
  assert.equal(JSON.parse(await p.evaluate(k=>localStorage.getItem(k),key)).answered,0,'reset must not be undone by pending import');
});
test('edge-browser: ion quiz complete, keyboard, export reload, cancel restore and malformed imports',async t=>{
  const p=await fresh(t);const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await views(p,'initial');await start(p);
  for(let i=0;i<12;i++){await answerIon(p);await p.locator('#next-question').press('Enter');}
  assert.equal(await p.locator('.result-score').textContent(),'12 / 12');
  await views(p,'result',p.locator('.result-score'));
  await p.locator('[data-tab="notebook"]').click();
  const before=await p.evaluate(k=>localStorage.getItem(k),key);
  const download=p.waitForEvent('download');await p.locator('#export-record').click();const file=await download;await file.saveAs(resolve(out,'practice.json'));
  assert.equal(JSON.parse(await readFile(resolve(out,'practice.json'),'utf8')).answered,12);
  p.once('dialog',d=>d.dismiss());await p.locator('#reset-record').click();assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),before);
  for(const buffer of [Buffer.from('{'),Buffer.alloc(40001,32)]){
    await p.locator('#import-record').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer});
    assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),before);
  }
  p.once('dialog',d=>d.accept());await p.locator('#reset-record').click();
  p.once('dialog',d=>d.accept());await p.locator('#import-record').setInputFiles(resolve(out,'practice.json'));
  await p.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).answered===12,key);
  await p.reload();assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),before);
  await p.locator('[data-tab="explore"]').click();await p.locator('[data-z="29"]').focus();await p.keyboard.press('ArrowRight');
  assert.equal(await p.evaluate(()=>document.activeElement.dataset.z),'30');await p.keyboard.press('Enter');await p.keyboard.press('Escape');
  assert.equal(await p.locator('#element-dialog').getAttribute('open'),null);assert.equal(errors.length,0);
});
test('edge-browser: quota import is memory only and other-app data remains byte identical',async t=>{
  const p=await fresh(t,()=>{localStorage.setItem('web-lab-progress-v1','QA sibling sentinel');localStorage.setItem('element-atlas-practice-v1',JSON.stringify({version:1,answered:4,correct:4,entries:[]}));});
  await p.locator('[data-tab="notebook"]').click();
  // Reuse the existing maintenance regression, clearly a storage failure fixture.
  const source=await readFile(new URL('./qa-import.js',import.meta.url),'utf8');
  const qa=Function('return ('+source+')')();await qa(p);
  assert.equal(await p.evaluate(()=>localStorage.getItem('web-lab-progress-v1')),'QA sibling sentinel');
});

