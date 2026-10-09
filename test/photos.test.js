import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ELEMENTS,DATASET} from '../dist/src/elements.js';
import {PHOTO_PHASES,PHOTO_KINDS,hasSpecimen,matchesPhoto,photoCoverageLabel} from '../dist/src/photo-model.js';
import {validateManifest,photoCounts} from '../tools/photo-importer.mjs';
const manifest=JSON.parse(await readFile(new URL('../tools/photo-manifest.json',import.meta.url),'utf8'));

test('the curated inventory accounts for all 118 elements without article-name matching',()=>{
 validateManifest(manifest,ELEMENTS);
 for(const e of ELEMENTS){const row=manifest.elements[e.z-1];assert.deepEqual(e.photos.map(p=>p.title),row.photos.map(p=>p.title));assert.equal(e.photoReview.status,row.status);assert.equal(e.photoReview.reviewed,manifest.reviewed);assert(e.photoReview.note&&e.photoReview.reference);}
 for(const e of ELEMENTS.filter(e=>e.z<=83))assert(e.photos.length,`${e.symbol} no longer silently omitted`);
 assert(ELEMENTS[12].photos[0].title.includes('Aluminium'));
});
test('photo counts separate elements, files, specimens and other observations',()=>{
 const counts=photoCounts(ELEMENTS);for(const [key,value]of Object.entries(counts))assert.equal(DATASET[key],value);
 assert.equal(counts.photoCount,97);assert.equal(counts.photoFileCount,100);assert.equal(counts.specimenCount,87);assert.equal(counts.observationCount,10);assert.equal(counts.photoReviewedCount,118);
 assert.equal(ELEMENTS.filter(e=>matchesPhoto(e,'photos')).length,97);assert.equal(ELEMENTS.filter(e=>matchesPhoto(e,'specimen')).length,87);assert.equal(ELEMENTS.filter(e=>matchesPhoto(e,'observation')).length,10);assert.equal(ELEMENTS.filter(e=>matchesPhoto(e,'missing')).length,21);assert(!matchesPhoto(ELEMENTS[0],'unexpected'));
});
test('condensed gases have explicit photographic phase and all gallery states are valid',()=>{
 for(const symbol of ['He','N','O','F'])assert(ELEMENTS.find(e=>e.symbol===symbol).photos.some(p=>p.phase==='liquid'&&p.kind==='sample'));
 for(const symbol of ['Ar','Xe'])assert(ELEMENTS.find(e=>e.symbol===symbol).photos.some(p=>p.phase==='solid-liquid'));
 assert(ELEMENTS[16].photos.some(p=>p.phase==='solid'));assert(ELEMENTS[79].photos.some(p=>p.phase==='liquid'));
 for(const e of ELEMENTS)for(const p of e.photos){assert(PHOTO_PHASES[p.phase]);assert(PHOTO_KINDS[p.kind]);assert(p.label&&p.caption);}
});
test('discharge, radiation, coatings and unspecified samples cannot masquerade as bulk colour',()=>{
 for(const symbol of ['H','Ne','Kr','At','Rn','Ac','Pa','Np','Am','Es']){const e=ELEMENTS.find(e=>e.symbol===symbol);assert(!hasSpecimen(e));assert.equal(photoCoverageLabel(e),'관측 자료');assert(e.photoReview.note.length>25);}
 assert.equal(ELEMENTS[94].photos[0].kind,'source');assert.equal(ELEMENTS[92].photos[0].kind,'encapsulated');
 for(const symbol of ['Tc','Po','Ra'])assert.equal(ELEMENTS.find(e=>e.symbol===symbol).photos[0].kind,'coating');
 assert(ELEMENTS[98].photos.every(p=>p.title!=='File:Einsteinium.jpg'));
});
test('missing sources distinguish unavailable photo rights from no visible bulk sample',()=>{
 const curium=ELEMENTS[95];assert.equal(curium.photoReview.status,'source-pending');assert.match(curium.photoReview.note,/금속은 실제로 연구/);assert.equal(photoCoverageLabel(curium),'사진 원본 미확보');
 for(const e of ELEMENTS.filter(e=>e.z>=100||e.symbol==='Fr')){assert.equal(e.photos.length,0);assert.equal(e.photoReview.status,'no-visible-bulk');assert(e.photoReview.reference.startsWith('https://periodic-table.rsc.org/'));}
});
test('the manifest rejects incomplete, misidentified or unsafe photo records',()=>{
 for(const mutate of [m=>m.elements.pop(),m=>m.elements[0].symbol='He',m=>m.elements[0].photos[0].phase='purple',m=>m.elements[0].photos[0].kind='fiction',m=>m.elements[0].photos[0].file='../.env',m=>m.elements[0].status='source-pending']){const copy=structuredClone(manifest);mutate(copy);assert.throws(()=>validateManifest(copy,ELEMENTS));}
});
test('photos-only entry point cannot fetch or rewrite numerical and crystal sources',async()=>{
 const entry=await readFile(new URL('../tools/import-photos.mjs',import.meta.url),'utf8'),all=await readFile(new URL('../tools/import-data.mjs',import.meta.url),'utf8');assert.match(entry,/structuredClone\(ELEMENTS\)/);assert(!/pubchem\.ncbi|ciaaw\.org|cod\.psdi|\.crystals\s*=|\.mass\s*=/.test(entry));assert(all.indexOf("await import('./import-photos.mjs')")<all.indexOf('await Promise.all([request(source.pubchem)'));
});
