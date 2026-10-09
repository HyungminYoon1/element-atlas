import { readdir,readFile } from 'node:fs/promises';
import { dirname,resolve,sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { ELEMENTS,DATASET } from '../dist/src/elements.js';
const root=resolve(import.meta.dirname,'../dist');let count=0;
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory()){await walk(path);continue;}count++;if(entry.name.endsWith('.js'))execFileSync(process.execPath,['--check',path],{stdio:'inherit'});if(!/\.(js|html|css|json)$/.test(path))continue;const bytes=await readFile(path);assert(!(bytes[0]===239&&bytes[1]===187&&bytes[2]===191),'BOM');if(!path.endsWith('.html'))continue;const html=bytes.toString('utf8');assert(html.includes('lang="ko"')&&html.includes("connect-src 'none'")&&html.includes("frame-src 'none'"));assert(!/\son\w+=|<iframe\b/i.test(html));for(const [,ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(https?:|data:)/.test(ref))continue;const target=resolve(dirname(path),ref.endsWith("/")?ref+"index.html":ref);assert(target.startsWith(root+sep));await readFile(target);}}}
await walk(root);assert.equal(ELEMENTS.length,118);assert(DATASET.photoCount>=50);assert(DATASET.crystalCount>=70);
for(const e of ELEMENTS)for(const p of e.photos){await readFile(resolve(root,p.file));assert(p.author&&p.license&&p.licenseUrl.startsWith('https://')&&p.filePage.startsWith('https://commons.wikimedia.org/'));}
const app=await readFile(resolve(root,'src/app.js'),'utf8');assert(!/\bfetch\s*\(|document\.cookie|sessionStorage|web-lab-progress-v1/.test(app));
console.log(`PASS ${count} public files, 118 elements, ${DATASET.photoCount} licensed sample photos, ${DATASET.crystalCount} elements with crystal records; syntax/assets/CSP/local-only state.`);
