import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
const samples = 'Carbon Sulfur Phosphorus Silicon Germanium Boron Selenium Tellurium Iodine Bromine Lithium Sodium Potassium Magnesium Calcium Aluminium Titanium Chromium Manganese Iron Cobalt Nickel Copper Zinc Silver Gold Tin Lead Bismuth Tungsten Molybdenum Platinum Palladium Vanadium Niobium Zirconium Tantalum Osmium Iridium Ruthenium Rhodium Cadmium Indium Gallium Thorium Uranium Scandium Yttrium Hafnium Rhenium Rubidium Strontium Barium Caesium Cerium Neodymium Gadolinium Erbium'.split(' ');
const captions = {
 Carbon:'흑연과 다이아몬드. 같은 탄소지만 원자 결합 배열에 따라 모양과 성질이 다릅니다.',
 Sulfur:'천연 황 결정 표본. 노란색 부분은 원소 황이며 바탕의 암석과 구분해야 합니다.',
 Phosphorus:'붉은 인 표본. 인의 동소체 가운데 적린입니다.',
 Selenium:'셀레늄의 서로 다른 동소체 표본.', Tin:'회색 주석과 흰색 주석 표본.',
 Bismuth:'비스무트 결정과 금속 표본. 결정 표면의 무지개색은 얇은 산화막의 간섭색입니다.',
 Bromine:'용기에 봉입된 브로민. 상온에서 적갈색 액체인 원소입니다.',
 Copper:'자연 구리 표본. 표면 상태와 산화 정도에 따라 보이는 색이 달라질 수 있습니다.', Nickel:'니켈 금속 표본과 비교용 정육면체. 틈에 보이는 녹색 부분은 니켈염으로 금속 자체의 색이 아닙니다.',
 Uranium:'우라늄 금속 표본.', Thorium:'토륨 금속 표본.',
};
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
function api(host, params) { return `${host}/w/api.php?${new URLSearchParams({action:'query',format:'json',...params})}`; }
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
console.log('Numeric facts: 118; retrieving licensed samples and measured crystal records.');
const pages=[];
for(let offset=0;offset<samples.length;offset+=45){
  const result=await request(api('https://en.wikipedia.org',{titles:samples.slice(offset,offset+45).join('|'),prop:'pageimages',piprop:'original'}));
  if(!result.query?.pages)throw new Error('Image discovery API changed');
  pages.push(...Object.values(result.query.pages).filter(page=>page.original));
}
// Commons API accepts <=50 titles per request. Restrict to reviewed element sample article leads.
const photos=[];
for(let offset=0;offset<pages.length;offset+=35){
  const batch=pages.slice(offset,offset+35);
  const titles=batch.map(page=>'File:'+decodeURIComponent(new URL(page.original.source).pathname.split('/').at(-1)));
  const meta=await request(api('https://commons.wikimedia.org',{titles:titles.join('|'),prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1000'}));
  for(const record of Object.values(meta.query.pages)){
    const info=record.imageinfo?.[0];if(!info)continue;
    const normalized=s=>s.replace(/_/g,' ').normalize('NFC');
    const page=batch.find(p=>normalized(decodeURIComponent(new URL(p.original.source).pathname.split('/').at(-1)))===normalized(record.title.replace(/^File:/,'')));if(!page)continue;
    const ext=info.extmetadata||{},license=plain(ext.LicenseShortName?.value),author=plain(ext.Artist?.value).slice(0,400);
    if(!/^(CC |CC0|Public domain|PDM|FAL)/i.test(license)||!author)continue;
    const element=elements.find(e=>e.english.toLowerCase()===page.title.toLowerCase()||(e.symbol==='Cs'&&page.title==='Caesium'));if(!element)continue;
    const description=plain(ext.ImageDescription?.value).slice(0,1200);
    if(/(discharge|portrait|periodic table|uraninite|bauxite|fluorescent|spectral)/i.test(record.title+' '+description))continue;
    photos.push({element,info,license,author,description,filePage:info.descriptionurl,title:record.title});
  }
}
await pool(photos,async photo=>{
  const url=photo.info.thumburl||photo.info.url;
  try {
    const {buffer,mime}=await request(url,'bytes');
    const ext=mime?.includes('png')?'png':mime?.includes('jpeg')?'jpg':mime?.includes('webp')?'webp':null;
    if(!ext)throw new Error('Unsupported image type');
    const file=`assets/elements/${photo.element.symbol.toLowerCase()}.${ext}`;
    await writeFile(resolve(out,file),buffer);
    photo.element.photos.push({file,caption:captions[photo.element.english]||`${photo.element.name} 원소 표본. 표면의 색과 질감은 표본의 가공·산화 상태에 따라 달라질 수 있습니다.`,author:photo.author,license:photo.license,licenseUrl:photo.info.extmetadata.LicenseUrl?.value?.replace(/^http:/,"https:")||(photo.license==='FAL'?'https://artlibre.org/licence/lal/en/':'https://creativecommons.org/publicdomain/mark/1.0/'),filePage:photo.filePage,title:photo.title,description:photo.description});
  } catch(error){console.log(`Photo unavailable: ${photo.element.symbol} (${error.message})`);}
},2);
// An exact formula search is essential: el1=Cu also returns compounds with copper.
if(process.argv.includes('--photos-only')){
  const previous=await import('../dist/src/elements.js');
  for(const element of elements)element.crystals=(previous.ELEMENTS.find(e=>e.z===element.z)?.crystals||[]).filter(c=>c.authors&&c.title);
} else await pool(elements.filter(e=>e.z<=98),async element=>{
  try {
    const records=await request(`https://cod.psdi.ac.uk/result.php?${new URLSearchParams({formula:element.symbol,format:'json'})}`,'json',8_000_000);
    const candidates=records.filter(r=>r.authors&&r.title&&Number(r.nel)===1&&new RegExp(`^-${element.symbol}\\d*-$`).test(String(r.formula).replace(/\s/g,''))&&!/theoretical|errors|retracted/i.test(r.flags||'')&&!r.duplicateof&&[r.a,r.b,r.c,r.alpha,r.beta,r.gamma].every(v=>Number(v)>0));
    const score=r=>{const t=Number(r.celltemp||r.diffrtemp)||295;const pressure=Number(r.cellpressure||r.diffrpressure)||0;return Math.abs(t-295)+pressure*1000+(r.method?0:20);};
    candidates.sort((a,b)=>score(a)-score(b)||Number(b.year)-Number(a.year));
    element.crystals=candidates.slice(0,3).map(r=>({id:r.file,formula:r.formula,a:Number(r.a),b:Number(r.b),c:Number(r.c),alpha:Number(r.alpha),beta:Number(r.beta),gamma:Number(r.gamma),group:r.sg,groupNumber:Number(r.sgNumber),temperature:r.celltemp||r.diffrtemp||null,pressure:r.cellpressure||r.diffrpressure||null,phase:r.commonname||r.mineral||r.chemname||null,title:r.title,authors:r.authors,year:r.year,doi:r.doi||null,url:`https://cod.psdi.ac.uk/${r.file}.html`,cif:`https://cod.psdi.ac.uk/${r.file}.cif`,method:r.method||null,flags:r.flags||'',license:'CC0 1.0'}));
  } catch(error){console.log(`Crystal unavailable: ${element.symbol} (${error.message})`);}
},3);
const snapshot={acquired,source,weightsRevision:'CIAAW 2021 table with 2024 revisions',count:118,photoCount:elements.filter(e=>e.photos.length).length,crystalCount:elements.filter(e=>e.crystals.length).length};
const crlf=text=>text.replace(/\r?\n/g,'\r\n');
await writeFile(resolve(out,'src/elements.js'),crlf(`// Build-time factual snapshot. See source UI and tools/import-data.mjs.\nexport const DATASET = ${JSON.stringify(snapshot,null,2)};\nexport const ELEMENTS = ${JSON.stringify(elements,null,2)};\n`),'utf8');
await writeFile(resolve(out,'assets/attributions.json'),crlf(JSON.stringify({snapshot,photos:elements.flatMap(e=>e.photos.map(p=>({symbol:e.symbol,...p}))),crystals:elements.flatMap(e=>e.crystals.map(c=>({symbol:e.symbol,...c})))},null,2)+'\n'),'utf8');
console.log(JSON.stringify(snapshot));
