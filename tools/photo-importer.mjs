import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,sep} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const out=resolve(root,'dist');
const phases=new Set(['solid','liquid','gas','solid-liquid','not-specified']);
const kinds=new Set(['sample','coating','micrograph','discharge','radiation','tracks','encapsulated','source']);
const specimenKinds=new Set(['sample','micrograph','coating']);
const crlf=text=>text.replace(/\r?\n/g,'\r\n');
const plain=(text='')=>text.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&#0?39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
const allowedHosts=new Set(['commons.wikimedia.org','upload.wikimedia.org','thumb.wikimedia.org']);
const pause=ms=>new Promise(r=>setTimeout(r,ms));

async function request(url,bytes=false){
 const target=new URL(url);assert(target.protocol==='https:'&&allowedHosts.has(target.hostname),'Unapproved image source');
 target.searchParams.delete('utm_source');target.searchParams.delete('utm_campaign');target.searchParams.delete('utm_content');
 for(let attempt=0;attempt<3;attempt++){
  try{
   const response=await fetch(target,{redirect:'error',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'WebLabEducation/1.1 (https://hyungminyoon1.github.io/web-lab/)'}});
   if(!response.ok)throw new Error(`Commons HTTP ${response.status}`);
   const chunks=[];let size=0;
   for await(const part of response.body){size+=part.length;if(size>12_000_000)throw new Error('Photo source exceeds 12 MB bound');chunks.push(part);}
   const buffer=Buffer.concat(chunks);return bytes?{buffer,mime:response.headers.get('content-type')}:JSON.parse(buffer.toString('utf8'));
  }catch(error){if(attempt===2)throw error;await pause(700*(attempt+1));}
 }
}
export function validateManifest(manifest,elements){
 assert.equal(manifest.schemaVersion,1);assert(/^\d{4}-\d{2}-\d{2}$/.test(manifest.reviewed));assert.equal(manifest.elements.length,118);
 const seen=new Set();
 for(const [i,row]of manifest.elements.entries()){
  assert.equal(row.z,i+1);assert.equal(row.symbol,elements[i].symbol);assert(!seen.has(row.z));seen.add(row.z);
  assert(['reviewed','source-pending','no-visible-bulk'].includes(row.status));assert(row.note&&new URL(row.reference).protocol==='https:');
  assert(Array.isArray(row.photos));assert.equal(new Set(row.photos.map(p=>p.title)).size,row.photos.length);
  for(const p of row.photos){assert(p.title.startsWith('File:'));assert(phases.has(p.phase));assert(kinds.has(p.kind));assert(p.label&&p.caption);if(p.file)assert(/^assets\/elements\/[a-z0-9-]+\.(jpg|png|webp)$/.test(p.file));}
  if(row.status!=='reviewed')assert.equal(row.photos.length,0);
 }
 return manifest;
}
export function photoCounts(elements){
 return {photoCount:elements.filter(e=>e.photos.length).length,photoFileCount:elements.reduce((n,e)=>n+e.photos.length,0),specimenCount:elements.filter(e=>e.photos.some(p=>specimenKinds.has(p.kind))).length,observationCount:elements.filter(e=>e.photos.length&&!e.photos.some(p=>specimenKinds.has(p.kind))).length,photoReviewedCount:elements.filter(e=>e.photoReview).length};
}
export async function applyPhotoManifest(elements){
 const manifest=validateManifest(JSON.parse(await readFile(resolve(root,'tools/photo-manifest.json'),'utf8')),elements);
 const titles=[...new Set(manifest.elements.flatMap(e=>e.photos.map(p=>p.title)))],metadata=new Map();
 const normalize=s=>s.replaceAll('_',' ').normalize('NFC');
 for(let offset=0;offset<titles.length;offset+=30){
  const data=await request('https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',titles:titles.slice(offset,offset+30).join('|'),prop:'imageinfo',iiprop:'url|size|sha1|timestamp|extmetadata',iiurlwidth:'1400'}));
  assert(data.query?.pages,'Commons metadata response changed');
  for(const page of Object.values(data.query.pages))if(page.imageinfo?.[0])metadata.set(normalize(page.title),page.imageinfo[0]);
  await pause(200);
 }
 const staging=resolve(root,'output','photo-import',String(Date.now()));await mkdir(staging,{recursive:true});
 const prepared=[];
 for(const row of manifest.elements){
  const old=elements[row.z-1].photos||[],photos=[];
  for(const [index,selected]of row.photos.entries()){
   const info=metadata.get(normalize(selected.title));assert(info,`Missing reviewed photo: ${selected.title}`);
   const ext=info.extmetadata||{},license=plain(ext.LicenseShortName?.value),author=plain(ext.Artist?.value);
   assert(author&&author!=='Unknown',`Unresolved authorship: ${selected.title}`);
   const lanl=selected.title==='File:Plutonium ring.jpg'&&license==='Attribution';
   assert(/^(CC BY(?:-SA)? [0-9.]+(?: [a-z]+)?|CC0|Public domain|PDM|FAL)$/.test(license)||lanl,`Unapproved license: ${selected.title}`);
   const licenseUrl=lanl?'assets/licenses/LANL-NOTICE.txt':license==='FAL'?'https://artlibre.org/licence/lal/en/':ext.LicenseUrl?.value?.replace(/^http:/,'https:')||'https://creativecommons.org/publicdomain/mark/1.0/';
   const previous=old.find(p=>normalize(p.title)===normalize(selected.title));
   let file=selected.file||previous?.file,buffer,mime;
   if(file){const path=resolve(out,file);assert(path.startsWith(out+sep));buffer=await readFile(path);}
   else{
    const data=await request(info.thumburl||info.url,true);buffer=data.buffer;mime=data.mime;
    const suffix=mime?.includes('png')?'png':mime?.includes('jpeg')?'jpg':mime?.includes('webp')?'webp':null;assert(suffix,'Unsupported photo type');
    file=`assets/elements/${row.symbol.toLowerCase()}-${index+1}.${suffix}`;
    await writeFile(resolve(staging,file.split('/').at(-1)),buffer);prepared.push({file,buffer});
    await pause(300);
   }
   photos.push({file,label:selected.label,phase:selected.phase,kind:selected.kind,caption:selected.caption,author,license,licenseUrl,filePage:info.descriptionurl,title:selected.title,description:plain(ext.ImageDescription?.value).slice(0,1200),width:info.width,height:info.height,sourceRevision:info.timestamp,sourceSha1:info.sha1,sha256:sha256(buffer),changes:'표시용 축소본'});
   console.log(`Reviewed ${row.symbol}: ${selected.label}`);
  }
  elements[row.z-1].photos=photos;elements[row.z-1].photoReview={status:row.status,note:row.note,reference:row.reference,reviewed:manifest.reviewed};
 }
 // A failed metadata/download review cannot publish a partial data snapshot.
 await mkdir(resolve(out,'assets/elements'),{recursive:true});
 for(const p of prepared)await writeFile(resolve(out,p.file),p.buffer);
 return {photoReviewed:manifest.reviewed,photoAcquired:new Date().toISOString().slice(0,10),...photoCounts(elements)};
}
export async function writeSnapshot(elements,snapshot){
 await writeFile(resolve(out,'src/elements.js'),crlf(`// Build-time factual snapshot. See tools/import-data.mjs and tools/photo-manifest.json.\nexport const DATASET = ${JSON.stringify(snapshot,null,2)};\nexport const ELEMENTS = ${JSON.stringify(elements,null,2)};\n`),'utf8');
 await writeFile(resolve(out,'assets/attributions.json'),crlf(JSON.stringify({snapshot,photos:elements.flatMap(e=>e.photos.map(p=>({symbol:e.symbol,...p}))),coverage:elements.map(e=>({z:e.z,symbol:e.symbol,name:e.name,...e.photoReview,photoCount:e.photos.length})),crystals:elements.flatMap(e=>e.crystals.map(c=>({symbol:e.symbol,...c})))},null,2)+'\n'),'utf8');
}
