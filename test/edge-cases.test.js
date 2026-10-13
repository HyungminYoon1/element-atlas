import test from 'node:test';
import assert from 'node:assert/strict';
import {ELEMENTS} from '../dist/src/elements.js';
import {emptyPractice,parsePractice,recordAnswer,generateQuiz,CATEGORIES} from '../dist/src/model.js';
import {hydrogenProbability,orbitalState} from '../dist/src/learning.js';
test('edge: quiz level/count/category min/max and type/nonfinite boundaries',()=>{
  for(const level of [1,4])for(const count of [1,50])for(const category of Object.keys(CATEGORIES)){
    const q=generateQuiz({seed:4294967295,level,count,category});assert.ok(q.length===count||q.length===0);
  }
  for(const patch of [{level:0},{level:5},{level:1.1},{level:'1'},{level:NaN},{count:0},{count:51},{count:'1'},{count:Infinity},{category:'__proto__'},{category:null}])assert.throws(()=>generateQuiz({seed:1,...patch}));
});
test('edge: every single-element review including both f-block endpoints targets the requested ID',()=>{
  for(let z=1;z<=118;z++){
    const review=[z],copy=[...review],q=generateQuiz({seed:0,level:4,count:3,review});
    assert.equal(q.length,3);assert.ok(q.every(x=>x.elements.includes(z)),String(z));assert.deepEqual(review,copy);
  }
});
test('edge: practice length 40000/40001 and all counter/element boundaries',()=>{
  const base=JSON.stringify(emptyPractice());assert.deepEqual(parsePractice(base+' '.repeat(40000-base.length)),emptyPractice());
  assert.equal(parsePractice(base+' '.repeat(40001-base.length)),null);
  const max={version:1,answered:100000,correct:100000,entries:Array.from({length:118},(_,i)=>({z:i+1,errors:10000,reviews:10000}))};
  assert.deepEqual(parsePractice(JSON.stringify(max)),max);
  for(const patch of [{answered:-1},{answered:100001},{answered:NaN},{answered:'1'},{correct:100001},{correct:-1},{entries:[null]},{entries:[{z:0,errors:0,reviews:0}]},{entries:[{z:119,errors:0,reviews:0}]},{entries:[{z:1,errors:10001,reviews:0}]},{entries:[{z:1,errors:0,reviews:-1}]}])
    assert.equal(parsePractice(JSON.stringify({...max,...patch})),null);
});
test('edge: saturated counters, duplicate question element IDs and immutable scheduling records',()=>{
  const p={version:1,answered:100000,correct:99999,entries:[{z:26,errors:10000,reviews:10000}]},q={elements:[26,26]},copy=structuredClone(p);
  const wrong=recordAnswer(p,q,false);assert.equal(wrong.answered,100000);assert.equal(wrong.correct,99999);assert.deepEqual(wrong.entries,p.entries);
  const right=recordAnswer(p,q,true);assert.equal(right.correct,100000);assert.deepEqual(right.entries,p.entries);assert.deepEqual(p,copy);
});
test('edge: parse/export round trip strips auxiliary fields without mutating imported object',()=>{
  const p={...emptyPractice(),note:'untrusted auxiliary',entries:[{z:118,errors:0,reviews:1,note:'auxiliary'}]};
  const before=JSON.stringify(p),parsed=parsePractice(before);
  assert.deepEqual(parsed,{...emptyPractice(),entries:[{z:118,errors:0,reviews:1}]});assert.equal(JSON.stringify(p),before);
  assert.deepEqual(parsePractice(JSON.stringify(parsed)),parsed);
});
test('edge: hydrogen 0/10, just-outside/type/nonfinite and independent quadrature probabilities',()=>{
  for(const r of [-Number.EPSILON,10.000001,'1',NaN,Infinity,null,[]])assert.throws(()=>hydrogenProbability(r));
  assert.equal(hydrogenProbability(0).inside,0);
  for(const radius of [.1,1,6,10]){
    const n=10000,h=radius/n;let integral=0;
    // Simpson quadrature of a separately written radial density, not the CDF formula.
    for(let i=0;i<=n;i++){const r=i*h,weight=i===0||i===n?1:i%2?4:2;integral+=weight*4*r*r*Math.exp(-2*r);}
    assert.ok(Math.abs(hydrogenProbability(radius).inside-integral*h/3)<1e-9);
  }
});
test('edge: neutral endpoints and charged workbench immutability with unsupported just-outside states',()=>{
  for(const z of [1,30])assert.equal(orbitalState(ELEMENTS[z-1]).electrons,z);
  const fe=ELEMENTS[25],copy=structuredClone(fe);const state=orbitalState(fe,3);
  assert.equal(state.electrons,23);assert.equal(state.unpaired,5);assert.deepEqual(fe,copy);
  for(const [e,c]of [[null,0],[{...fe,z:0},0],[ELEMENTS[30],0],[fe,1],[fe,4],[fe,'2'],[fe,Infinity],[fe,2.5]])assert.throws(()=>orbitalState(e,c));
});
test('edge: ion answer independently follows charge conservation over endpoint seeds',()=>{
  for(const seed of [0,1,4294967295]){
    const questions=generateQuiz({seed,level:1,category:'calculation',count:50});
    for(const q of questions){assert.equal(q.type,'ion');const m=q.prompt.match(/전하가 ([+-]?\d+).*원자번호 (\d+)/);assert.ok(m);
      assert.equal(Number(q.options[q.answer]),Number(m[2])-Number(m[1]));}
  }
});

