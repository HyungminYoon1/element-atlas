import { ELEMENTS } from './elements.js';

export const PRACTICE_KEY = 'element-atlas-practice-v1';
export const FAMILY_LABELS = {'alkali metal':'알칼리 금속','alkaline earth metal':'알칼리 토금속','transition metal':'전이 금속','post-transition metal':'후전이 금속',metalloid:'준금속',nonmetal:'비금속',halogen:'할로젠','noble gas':'비활성 기체',lanthanide:'란타넘족',actinide:'악티늄족'};
export const LEVELS = ['기초 탐색','개념 연결','정량 추론','심화 도전'];
export const CATEGORIES = {all:'종합',identity:'원소·주기율표',electrons:'전자배치',properties:'주기적 성질',calculation:'이온·동위원소'};
export function rng(seed) { let s=seed>>>0;return()=>{s+=0x6d2b79f5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;}; }
export function shuffle(items, random) { const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
export function position(element) {
  if(element.z>=57&&element.z<=71)return {row:9,column:element.z-53};
  if(element.z>=89&&element.z<=103)return {row:10,column:element.z-85};
  return {row:element.period,column:element.group};
}
export function electronCount(configuration) {
  const cores={He:2,Ne:10,Ar:18,Kr:36,Xe:54,Rn:86};
  return [...configuration.matchAll(/\[([A-Z][a-z]?)\]|\d[spdf](\d+)/g)].reduce((sum,m)=>sum+(m[1]?cores[m[1]]||0:Number(m[2])),0);
}
export function emptyPractice(){return {version:1,answered:0,correct:0,entries:[]};}
export function parsePractice(raw) {
  if(typeof raw!=='string'||raw.length>40000)return null;
  try{const p=JSON.parse(raw);if(p?.version!==1||!Number.isInteger(p.answered)||!Number.isInteger(p.correct)||p.answered<0||p.answered>100000||p.correct<0||p.correct>p.answered||!Array.isArray(p.entries)||p.entries.length>118)return null;
    const ids=new Set();for(const e of p.entries){if(!Number.isInteger(e.z)||e.z<1||e.z>118||ids.has(e.z)||!Number.isInteger(e.errors)||e.errors<0||e.errors>10000||!Number.isInteger(e.reviews)||e.reviews<0||e.reviews>10000)return null;ids.add(e.z);}
    return {version:1,answered:p.answered,correct:p.correct,entries:p.entries.map(({z,errors,reviews})=>({z,errors,reviews}))};
  }catch{return null;}
}
export function recordAnswer(practice, question, correct) {
  const p=structuredClone(practice);p.answered=Math.min(100000,p.answered+1);p.correct=Math.min(p.answered,p.correct+(correct?1:0));
  for(const z of new Set(question.elements)){let entry=p.entries.find(e=>e.z===z);if(!entry){entry={z,errors:0,reviews:0};p.entries.push(entry);}entry[correct?'reviews':'errors']=Math.min(10000,entry[correct?'reviews':'errors']+1);}
  return p;
}
const find=z=>ELEMENTS[z-1];
const ions=[{z:8,charge:-2},{z:9,charge:-1},{z:11,charge:1},{z:12,charge:2},{z:13,charge:3},{z:16,charge:-2},{z:17,charge:-1},{z:19,charge:1},{z:20,charge:2},{z:26,charge:2},{z:26,charge:3},{z:29,charge:2},{z:30,charge:2}];
const isotopes=[{z:17,a:35,b:37},{z:5,a:10,b:11},{z:6,a:12,b:13},{z:3,a:6,b:7},{z:29,a:63,b:65},{z:10,a:20,b:22},{z:35,a:79,b:81}];
const oxidations=[{formula:'Fe₂O₃',z:26,n:2,oxygen:3,charge:0},{formula:'MnO₄⁻',z:25,n:1,oxygen:4,charge:-1},{formula:'Cr₂O₇²⁻',z:24,n:2,oxygen:7,charge:-2},{formula:'SO₄²⁻',z:16,n:1,oxygen:4,charge:-2},{formula:'NO₃⁻',z:7,n:1,oxygen:3,charge:-1},{formula:'Al₂O₃',z:13,n:2,oxygen:3,charge:0},{formula:'CO₃²⁻',z:6,n:1,oxygen:3,charge:-2},{formula:'ClO₄⁻',z:17,n:1,oxygen:4,charge:-1}];
export const QUESTION_TYPES = [
  {id:'symbol',category:'identity',levels:[1,2],make:(r,l,pool)=>{const e=pool[Math.floor(r()*pool.length)];return {prompt:`${e.name}의 원소 기호는?`,correct:e.symbol,distractors:shuffle(ELEMENTS.filter(x=>x.z!==e.z),r).slice(0,3).map(x=>x.symbol),explanation:`${e.name}(${e.symbol})의 원자번호는 ${e.z}입니다. 원소 기호의 첫 글자는 대문자, 둘째 글자는 소문자입니다.`,elements:[e.z]};}},
  {id:'position',category:'identity',levels:[1,2,3],make:(r,l,pool)=>{const e=pool.filter(x=>x.group)[Math.floor(r()*pool.filter(x=>x.group).length)];const correct=`${e.period}주기 · ${e.group}족`;return {prompt:`${e.symbol}(${e.name})의 주기율표 위치는?`,correct,distractors:[`${e.period===7?6:e.period+1}주기 · ${e.group}족`,`${e.period}주기 · ${e.group===18?17:e.group+1}족`,`${e.period===1?2:e.period-1}주기 · ${e.group===1?2:e.group-1}족`],explanation:`${e.symbol}은 ${e.period}주기, ${e.group}족입니다. 족은 세로줄, 주기는 가로줄입니다.`,elements:[e.z]};}},
  {id:'configuration',category:'electrons',levels:[2,3,4],make:(r,l,pool)=>{const e=shuffle(pool.filter(x=>x.z>=3&&x.z<=86),r)[0];return {prompt:`중성 원자의 전자배치가 ${e.configuration}일 때, 이 원소는?`,correct:`${e.symbol} · ${e.name}`,distractors:shuffle(ELEMENTS.filter(x=>Math.abs(x.z-e.z)<=7&&x.z!==e.z),r).slice(0,3).map(x=>`${x.symbol} · ${x.name}`),explanation:`핵심 전자와 바깥 전자의 수를 합하면 ${electronCount(e.configuration)}개입니다. 중성 원자에서는 전자 수 = 양성자 수 = 원자번호이므로 ${e.symbol}입니다.`,elements:[e.z]};}},
  {id:'ion',category:'calculation',levels:[1,2,3,4],make:(r,l)=>{const x=ions[Math.floor(r()*ions.length)],e=find(x.z);const c=x.charge,correct=String(x.z-c);return {prompt:`${e.symbol} 이온의 전하가 ${c>0?'+':''}${c}일 때 전자는 몇 개인가요? (원자번호 ${x.z})`,correct,distractors:[x.z-c-1,x.z-c+1,x.z-c+2].map(String),explanation:`양전하 이온은 전자를 잃고 음전하 이온은 전자를 얻습니다. 전자 수 = 원자번호 − 전하 = ${x.z} − (${c}) = ${correct}개입니다.`,elements:[e.z]};}},
  {id:'property',category:'properties',levels:[1,2,3,4],make:(r,l)=>{const prop=shuffle(l<=2?['electronegativity','ionization']:['electronegativity','ionization','density','melting'],r)[0];const info={electronegativity:['전기음성도','Pauling 척도'],ionization:['제1 이온화 에너지','eV'],density:['자료에 기재된 밀도','g/cm³'],melting:['자료에 기재된 녹는점','K']}[prop];const xs=shuffle([...new Map(ELEMENTS.filter(x=>x[prop]!=null&&x.z<=83).map(x=>[x[prop],x])).values()],r).slice(0,4);xs.sort((a,b)=>b[prop]-a[prop]);const e=xs[0];return {prompt:`다음 중 ${info[0]}가 가장 큰 원소는?`,correct:e.symbol,distractors:xs.slice(1).map(x=>x.symbol),explanation:xs.map(x=>`${x.symbol}: ${x[prop]} ${info[1]}`).join(' / ')+'. PubChem 자료의 값으로 비교했습니다. 밀도·상전이 값은 측정 조건과 동소체에 의존합니다.',elements:xs.map(x=>x.z)};}},
  {id:'isotope',category:'calculation',levels:[2,3,4],make:(r,l)=>{const x=isotopes[Math.floor(r()*isotopes.length)],e=find(x.z);const percent=10+Math.floor(r()*17)*5;const mean=(x.a*percent+x.b*(100-percent))/100;const abundance=l===4;return {prompt:abundance?`${e.symbol}의 두 동위원소 질량을 ${x.a} u, ${x.b} u로 근사합니다. 평균이 ${mean.toFixed(2)} u라면 가벼운 동위원소의 비율은?`:`가상 ${e.symbol} 표본에 질량 ${x.a} u인 동위원소가 ${percent}%, ${x.b} u인 동위원소가 ${100-percent}% 있습니다. 평균 원자 질량은? (질량은 근삿값)`,correct:abundance?`${percent}%`:`${mean.toFixed(2)} u`,distractors:abundance?[percent+5,percent-5,percent+10].map(v=>`${v}%`):[mean+0.1,mean-0.1,(x.a+x.b)/2+0.13].map(v=>`${v.toFixed(2)} u`),explanation:`가중평균 = ${x.a} × ${percent/100} + ${x.b} × ${(100-percent)/100} = ${mean.toFixed(2)} u. 실제 자연 존재비나 표준 원자량을 제시하는 문제가 아니라 주어진 가상 표본의 계산입니다.`,elements:[e.z]};}},
  {id:'oxidation',category:'calculation',levels:[3,4],make:r=>{const x=oxidations[Math.floor(r()*oxidations.length)],e=find(x.z),n=(x.charge+x.oxygen*2)/x.n;return {prompt:`${x.formula}에서 ${e.symbol}의 산화수는? (O의 산화수는 −2)`,correct:`+${n}`,distractors:[n-1,n+1,n+2].map(v=>`${v>=0?'+':''}${v}`),explanation:`산화수의 합은 전체 전하와 같습니다. ${x.n}x + ${x.oxygen}×(−2) = ${x.charge}이므로 x = +${n}입니다. 산화수는 형식적인 전하 계산이며 실제 원자에 정수 전하가 있다는 뜻은 아닙니다.`,elements:[e.z,8]};}},
  {id:'isoelectronic',category:'electrons',levels:[3,4],make:r=>{const options=['O²⁻','F⁻','Na⁺','Mg²⁺','Al³⁺'];const largest=r()<.5;return {prompt:`O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺는 전자가 모두 10개입니다. 같은 배위 조건에서 이온 반지름이 가장 ${largest?'큰':'작은'} 것은?`,correct:largest?'O²⁻':'Al³⁺',distractors:shuffle(options.filter(x=>x!==(largest?'O²⁻':'Al³⁺')),r).slice(0,3),explanation:'등전자 이온에서는 전자 수가 같으므로 핵전하가 클수록 전자를 더 강하게 끌어당깁니다. 이 계열의 크기는 O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺입니다. 이온 반지름은 배위수에도 영향을 받습니다.',elements:[8,9,11,12,13]};}},
  {id:'nuclide',category:'calculation',levels:[2,3,4],make:(r,l)=>{const x=isotopes[Math.floor(r()*isotopes.length)],e=find(x.z),mass=r()<.5?x.a:x.b,charge=l>=3?(r()<.5?-1:2):0;return {prompt:`원자번호 ${x.z}, 질량수 ${mass}, 전하 ${charge>0?'+':''}${charge}인 ${e.symbol} 입자의 (양성자, 중성자, 전자) 수는?`,correct:`(${x.z}, ${mass-x.z}, ${x.z-charge})`,distractors:[`(${x.z}, ${mass}, ${x.z-charge})`,`(${x.z}, ${mass-x.z}, ${x.z-charge+1})`,`(${mass}, ${x.z}, ${x.z-charge})`],explanation:`양성자 = 원자번호 ${x.z}, 중성자 = 질량수 − 원자번호 = ${mass-x.z}, 전자 = 원자번호 − 전하 = ${x.z-charge}입니다. 질량수는 핵자의 개수이며 소수인 평균 원자량과 다릅니다.`,elements:[e.z]};}},
  {id:'transition-ion',category:'electrons',levels:[4],make:r=>{const cases=[{z:26,ion:'Fe²⁺',config:'[Ar] 3d6',wrong:['[Ar] 3d4 4s2','[Ar] 3d5 4s1','[Ar] 3d6 4s2']},{z:29,ion:'Cu²⁺',config:'[Ar] 3d9',wrong:['[Ar] 3d8 4s1','[Ar] 3d10 4s1','[Ar] 3d10']}];const x=cases[Math.floor(r()*cases.length)];return {prompt:`기체 상태의 ${x.ion} 바닥상태 전자배치는?`,correct:x.config,distractors:x.wrong,explanation:`전이 금속 양이온을 만들 때는 4s 전자가 3d 전자보다 먼저 빠집니다. ${find(x.z).symbol}의 중성 전자배치 ${find(x.z).configuration}에서 두 전자를 제거하면 ${x.config}입니다.`,elements:[x.z]};}},
];
export function generateQuiz({seed,level=2,category='all',count=12,review=[]}) {
  if(!Number.isInteger(level)||level<1||level>4||!Number.isInteger(count)||count<1||count>50||!Object.hasOwn(CATEGORIES,category))throw new RangeError('Invalid quiz configuration');
  const r=rng(seed),pool=review.length?ELEMENTS.filter(e=>review.includes(e.z)):ELEMENTS;
  const types=QUESTION_TYPES.filter(t=>(review.length||t.levels.includes(level))&&(review.length?(['symbol','position','configuration'].includes(t.id)&&(t.id!=='position'||pool.some(e=>e.group))&&(t.id!=='configuration'||pool.some(e=>e.z>=3&&e.z<=86))):(category==='all'||t.category===category)));
  if(!types.length)return [];
  const usable=pool.length?pool:ELEMENTS;
  return Array.from({length:count},(_,i)=>{
    const chosen=i<types.length?types[(i+(seed>>>0)%types.length)%types.length]:types[Math.floor(r()*types.length)];
    const q=chosen.make(r,level,usable),values=[...new Set([q.correct,...q.distractors])];
    if(values.length!==4)throw new Error(`Question options are ambiguous: ${chosen.id}`);
    const options=shuffle(values,r);return {id:`${seed>>>0}-${i}`,type:chosen.id,category:chosen.category,prompt:q.prompt,options,answer:options.indexOf(q.correct),explanation:q.explanation,elements:q.elements};
  });
}
