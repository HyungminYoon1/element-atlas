import { readdir,readFile } from 'node:fs/promises';
import { dirname,resolve,sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { ELEMENTS,DATASET } from '../dist/src/elements.js';
import { validateManifest,photoCounts } from './photo-importer.mjs';
const root=resolve(import.meta.dirname,'../dist');let count=0;
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory()){await walk(path);continue;}count++;if(entry.name.endsWith('.js'))execFileSync(process.execPath,['--check',path],{stdio:'inherit'});if(!/\.(js|html|css|json)$/.test(path))continue;const bytes=await readFile(path);assert(!(bytes[0]===239&&bytes[1]===187&&bytes[2]===191),'BOM');if(!path.endsWith('.html'))continue;const html=bytes.toString('utf8');assert(html.includes('lang="ko"')&&html.includes("connect-src 'none'")&&html.includes("frame-src 'none'"));assert(!/\son\w+=|<iframe\b/i.test(html));for(const [,ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(https?:|data:)/.test(ref))continue;const target=resolve(dirname(path),ref.endsWith("/")?ref+"index.html":ref);assert(target.startsWith(root+sep));await readFile(target);}}}
await walk(root);assert.equal(ELEMENTS.length,118);assert(DATASET.photoCount>=97);assert(DATASET.crystalCount>=70);
validateManifest(JSON.parse(await readFile(resolve(root,'../tools/photo-manifest.json'),'utf8')),ELEMENTS);
for(const [key,value]of Object.entries(photoCounts(ELEMENTS)))assert.equal(DATASET[key],value);
const attributions=JSON.parse(await readFile(resolve(root,'assets/attributions.json'),'utf8'));assert.equal(attributions.coverage.length,118);assert.equal(attributions.photos.length,DATASET.photoFileCount);
for(const e of ELEMENTS)for(const p of e.photos){assert(/^assets\/elements\/[a-z0-9-]+\.(jpg|png|webp)$/.test(p.file));const bytes=await readFile(resolve(root,p.file));assert(bytes.length>1000);assert.equal(createHash('sha256').update(bytes).digest('hex'),p.sha256);assert(p.author&&p.license&&p.filePage.startsWith('https://commons.wikimedia.org/'));if(p.license==='Attribution'){assert.equal(e.symbol,'Pu');assert.equal(p.licenseUrl,'assets/licenses/LANL-NOTICE.txt');assert((await readFile(resolve(root,p.licenseUrl),'utf8')).includes('DE-AC52-06NA25396'));}else assert(p.licenseUrl.startsWith('https://'));assert(/^\d{4}-\d{2}-\d{2}/.test(p.sourceRevision)&&p.sourceSha1);}
const app=await readFile(resolve(root,'src/app.js'),'utf8');assert(!/\bfetch\s*\(|document\.cookie|sessionStorage|web-lab-progress-v1/.test(app));
console.log(`PASS ${count} public files, 118 reviewed elements, ${DATASET.photoCount} photographed elements / ${DATASET.photoFileCount} licensed files (${DATASET.specimenCount} specimen, ${DATASET.observationCount} other observations), ${DATASET.crystalCount} elements with crystal records; syntax/assets/hash/provenance/CSP/local-only state.`);
