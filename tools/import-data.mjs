import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { applyPhotoManifest,writeSnapshot } from './photo-importer.mjs';

if(process.argv.includes('--photos-only')){
  await import('./import-photos.mjs');
  process.exit(0);
}

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
const acquired = new Date().toISOString().slice(0, 10);
const source = {
  pubchem: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON',
  weights: 'https://www.ciaaw.org/atomic-weights.htm',
  crystals: 'https://cod.psdi.ac.uk/',
  photos: 'https://commons.wikimedia.org/',
};
const korean = '수소 헬륨 리튬 베릴륨 붕소 탄소 질소 산소 플루오린 네온 나트륨 마그네슘 알루미늄 규소 인 황 염소 아르곤 칼륨 칼슘 스칸듐 타이타늄 바나듐 크로뮴 망가니즈 철 코발트 니켈 구리 아연 갈륨 저마늄 비소 셀레늄 브로민 크립톤 루비듐 스트론튬 이트륨 지르코늄 나이오븀 몰리브데넘 테크네튬 루테늄 로듐 팔라듐 은 카드뮴 인듐 주석 안티모니 텔루륨 아이오딘 제논 세슘 바륨 란타넘 세륨 프라세오디뮴 네오디뮴 프로메튬 사마륨 유로퓸 가돌리늄 터븀 디스프로슘 홀뮴 어븀 툴륨 이터븀 루테튬 하프늄 탄탈럼 텅스텐 레늄 오스뮴 이리듐 백금 금 수은 탈륨 납 비스무트 폴로늄 아스타틴 라돈 프랑슘 라듐 악티늄 토륨 프로트악티늄 우라늄 넵투늄 플루토늄 아메리슘 퀴륨 버클륨 캘리포늄 아인슈타이늄 페르뮴 멘델레븀 노벨륨 로렌슘 러더포듐 더브늄 시보귬 보륨 하슘 마이트너륨 다름슈타튬 뢴트게늄 코페르니슘 니호늄 플레로븀 모스코븀 리버모륨 테네신 오가네손'.split(' ');
const aliases = {4:'베릴리움',9:'불소',11:'소듐',13:'알루미늄',14:'실리콘',19:'포타슘',22:'티타늄',24:'크롬',25:'망간',32:'게르마늄',35:'브롬',41:'니오븀',42:'몰리브덴',51:'안티몬',53:'요오드',54:'크세논',57:'란탄',65:'테르븀',68:'에르븀',73:'탄탈륨'};
const periods = [[],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],[3,4,0,0,0,0,0,0,0,0,0,0,5,6,7,8,9,10],[11,12,0,0,0,0,0,0,0,0,0,0,13,14,15,16,17,18],Array.from({length:18},(_,i)=>19+i),Array.from({length:18},(_,i)=>37+i),[55,56,0,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],[87,88,0,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118]];
function plain(text='') { return text.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#0?39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim(); }
async function request(url, type='json', limit=12_000_000) {
  const response = await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'WebLabEducation/1.0 (https://hyungminyoon1.github.io/web-lab/)'}});
  if (!response.ok) throw new Error(`Source HTTP ${response.status}: ${new URL(url).hostname}`);
  const chunks=[]; let size=0;
  for await (const part of response.body) { size+=part.length;if(size>limit)throw new Error('Source exceeds byte bound');chunks.push(part); }
  const buffer=Buffer.concat(chunks);
  return type==='bytes' ? {buffer,mime:response.headers.get('content-type')} : type==='json' ? JSON.parse(buffer.toString('utf8')) : buffer.toString('utf8');
}
async function pool(items, fn, concurrency=3) {
  const results=new Array(items.length);let next=0;
  await Promise.all(Array.from({length:concurrency},async()=>{while(next<items.length){const i=next++;results[i]=await fn(items[i],i);}}));return results;
}
const [ptable,weights] = await Promise.all([request(source.pubchem),request(source.weights,'text')]);
if(ptable.Table.Row.length!==118||korean.length!==118)throw new Error('Element count mismatch');
const weightMap=new Map();
for(const row of weights.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
  const cells=[...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m=>plain(m[1]));
  if(cells.length<4||!/^\d+$/.test(cells[0]))continue;
  const mass=cells[3].replace(/\s/g,'');
  weightMap.set(Number(cells[0]),/\d/.test(mass)?mass:null);
}
if(weightMap.size<100)throw new Error('CIAAW parse changed; manual review required');
const keys=ptable.Table.Columns.Column;
const elements=ptable.Table.Row.map(row=>{
  const r=Object.fromEntries(keys.map((key,i)=>[key,row.Cell[i]]));const z=Number(r.AtomicNumber);let period,group;
  for(let p=1;p<=7;p++){const col=periods[p].indexOf(z);if(col>=0){period=p;group=col+1;}}
  if(z>=57&&z<=71){period=6;group=null;}if(z>=89&&z<=103){period=7;group=null;}
  const number=value=>value!==''&&Number.isFinite(Number(value))?Number(value):null;
  return {z,symbol:r.Symbol,name:korean[z-1],english:r.Name,alias:aliases[z]||'',period,group,family:r.GroupBlock.toLowerCase(),state:r.StandardState||'Unknown',mass:weightMap.get(z)??null,isotopeMass:number(r.AtomicMass),configuration:r.ElectronConfiguration,electronegativity:number(r.Electronegativity),radius:number(r.AtomicRadius),ionization:number(r.IonizationEnergy),affinity:number(r.ElectronAffinity),oxidation:r.OxidationStates||null,melting:number(r.MeltingPoint),boiling:number(r.BoilingPoint),density:number(r.Density),discovered:r.YearDiscovered||null,predicted:z>=104,photos:[],crystals:[]};
});
await mkdir(resolve(out,'src'),{recursive:true});await mkdir(resolve(out,'assets/elements'),{recursive:true});
console.log('Numeric facts: 118; retrieving the reviewed 118-element photo manifest and crystal records.');
const photoSnapshot=await applyPhotoManifest(elements);
// An exact formula search is essential: el1=Cu also returns compounds with copper.
await pool(elements.filter(e=>e.z<=98),async element=>{
  try {
    const records=await request(`https://cod.psdi.ac.uk/result.php?${new URLSearchParams({formula:element.symbol,format:'json'})}`,'json',8_000_000);
    const candidates=records.filter(r=>r.authors&&r.title&&Number(r.nel)===1&&new RegExp(`^-${element.symbol}\\d*-$`).test(String(r.formula).replace(/\s/g,''))&&!/theoretical|errors|retracted/i.test(r.flags||'')&&!r.duplicateof&&[r.a,r.b,r.c,r.alpha,r.beta,r.gamma].every(v=>Number(v)>0));
    const score=r=>{const t=Number(r.celltemp||r.diffrtemp)||295;const pressure=Number(r.cellpressure||r.diffrpressure)||0;return Math.abs(t-295)+pressure*1000+(r.method?0:20);};
    candidates.sort((a,b)=>score(a)-score(b)||Number(b.year)-Number(a.year));
    element.crystals=candidates.slice(0,3).map(r=>({id:r.file,formula:r.formula,a:Number(r.a),b:Number(r.b),c:Number(r.c),alpha:Number(r.alpha),beta:Number(r.beta),gamma:Number(r.gamma),group:r.sg,groupNumber:Number(r.sgNumber),temperature:r.celltemp||r.diffrtemp||null,pressure:r.cellpressure||r.diffrpressure||null,phase:r.commonname||r.mineral||r.chemname||null,title:r.title,authors:r.authors,year:r.year,doi:r.doi||null,url:`https://cod.psdi.ac.uk/${r.file}.html`,cif:`https://cod.psdi.ac.uk/${r.file}.cif`,method:r.method||null,flags:r.flags||'',license:'CC0 1.0'}));
  } catch(error){console.log(`Crystal unavailable: ${element.symbol} (${error.message})`);}
},3);
const snapshot={acquired,source,weightsRevision:'CIAAW 2021 table with 2024 revisions',count:118,...photoSnapshot,crystalCount:elements.filter(e=>e.crystals.length).length};
await writeSnapshot(elements,snapshot);
console.log(JSON.stringify(snapshot));
