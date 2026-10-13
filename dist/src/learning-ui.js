import {LESSONS,APPLICATIONS,ION_OPTIONS,orbitalState,hydrogenProbability} from './learning.js';
import {ELEMENTS} from './elements.js';
const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const button=(text,action,cls)=>{const b=node('button',cls,text);b.type='button';b.addEventListener('click',action);return b;};
export function mountLearning(root,{onElement,onPractice}){
  let current=0;const completed=new Set(),applications=new Map();
  const intro=node('div','learn-intro');intro.append(node('p','eyebrow','CHEMISTRY · FROM RULES TO MATTER'),node('h1',null,'원소를 외우기 전에, 규칙부터'),node('p','lead','전자들이 놓일 수 있는 상태가 결합을 만들고, 결합과 구조가 물질의 성질로 이어집니다. 처음이라면 1번부터 읽고, 짧은 질문으로 확인하세요.'));
  const chain=node('ol','reason-chain');for(const text of ['입자 수','전자 상태','전자배치','결합','구조·물성'])chain.append(node('li',null,text));intro.append(chain);
  const layout=node('div','learn-layout'),nav=node('nav','lesson-nav'),article=node('article','lesson-article');nav.setAttribute('aria-label','화학 학습 순서');article.setAttribute('aria-live','polite');
  const progress=node('p','small');nav.append(node('h2',null,'10개의 기본 규칙'),progress);
  const lessonButtons=LESSONS.map((lesson,i)=>{const b=button(`${String(i+1).padStart(2,'0')}  ${lesson.title}`,()=>show(i));b.dataset.lesson=lesson.id;nav.append(b);return b;});
  layout.append(nav,article);root.replaceChildren(intro,layout);
  function show(i){
    current=i;const l=LESSONS[i];for(const [j,b] of lessonButtons.entries())b.setAttribute('aria-current',j===i?'step':'false');progress.textContent=`이 화면에서 확인한 개념 ${completed.size} / ${LESSONS.length}`;
    article.replaceChildren(node('p','eyebrow',`RULE ${i+1} / ${LESSONS.length}`),node('h2','lesson-title',l.title),node('p','lesson-question',l.question));
    const rule=node('div','core-rule');rule.append(node('strong',null,'기억할 규칙'),node('p',null,l.rule));article.append(rule);
    for(const [title,text] of [['왜 그런가요?',l.why],['사례로 연결',l.example],['어디까지 적용할까요?',l.limit]]){const section=node('section','lesson-block');section.append(node('h3',null,title),node('p',null,text));article.append(section);}
    if(['quantum','filling','periodic','ions'].includes(l.id))article.append(atomWorkbench(l.id==='ions'?26:l.id==='filling'?8:6));
    if(l.id==='quantum')article.append(probabilityWorkbench());
    const links=node('div','lesson-element-links');for(const z of l.elements){const e=ELEMENTS[z-1];links.append(button(`${e.symbol} · ${e.name}`,()=>onElement(z)));}article.append(links);
    const check=node('section','lesson-check');check.append(node('p','eyebrow','CHECK YOUR REASONING'),node('h3',null,l.check.prompt));
    const feedback=node('p','check-feedback'),choices=node('div','learn-choices');feedback.setAttribute('role','status');
    l.check.options.forEach((text,k)=>choices.append(button(text,()=>{if(k===l.check.answer){completed.add(l.id);progress.textContent=`이 화면에서 확인한 개념 ${completed.size} / ${LESSONS.length}`;feedback.className='check-feedback correct';feedback.textContent='맞습니다. '+l.check.reason;}else{feedback.className='check-feedback';feedback.textContent='다시 생각해보세요. '+l.check.reason;}},'learn-choice')));check.append(choices,feedback);article.append(check);
    const task=APPLICATIONS[l.id],application=node('section','lesson-check application-check'),options=node('div','learn-choices'),response=node('p','check-feedback');response.setAttribute('role','status');application.append(node('p','eyebrow','조건을 연결해 추론하기'),node('h3',null,task.prompt));
    function taskFeedback(){const choice=applications.get(l.id);if(choice===undefined)return;for(const [k,b]of [...options.children].entries()){b.disabled=true;b.setAttribute('aria-pressed',String(k===choice));}response.className='check-feedback'+(choice===task.answer?' correct':'');response.textContent=`${choice===task.answer?'맞습니다.':'풀이를 비교해보세요.'} 내 선택: ${task.options[choice]} · 기준: ${task.options[task.answer]}. ${task.reason}`;}
    task.options.forEach((text,k)=>options.append(button(text,()=>{if(applications.has(l.id))return;applications.set(l.id,k);taskFeedback();},'learn-choice')));application.append(options,response,node('p','small','첫 선택 뒤 풀이를 비교합니다. 이 도전은 현재 화면에만 남습니다.'));taskFeedback();article.append(application);
    article.append(node('p','lesson-next',l.next));
    const actions=node('div','lesson-actions');if(i>0)actions.append(button('← 이전 개념',()=>show(i-1)));actions.append(button('관련 문제 풀기',()=>onPractice(l.category), 'primary'));if(i+1<LESSONS.length)actions.append(button('다음 개념 →',()=>show(i+1)));article.append(actions);
    const sources=node('details','lesson-sources');sources.append(node('summary',null,'원문과 더 읽기'));for(const [j,url] of l.sources.entries()){const a=node('a',null,`OpenStax Chemistry 2e · 관련 단원 ${j+1} ↗`);a.href=url;a.target='_blank';a.rel='noopener noreferrer';sources.append(a);}article.append(sources);
  }
  show(0);return {open(id){const index=LESSONS.findIndex(l=>l.id===id);if(index>=0)show(index);},current:()=>LESSONS[current].id};
}
function atomWorkbench(initial){
  const section=node('section','atom-workbench');section.append(node('h3',null,'전자배치 작업대'),node('p','small','화살표는 오비탈의 점유와 스핀을 나타냅니다. 전자의 이동 경로가 아닙니다.'));
  const controls=node('div','learn-controls'),label=node('label',null,'원소'),select=node('select');select.setAttribute('aria-label','전자배치 원소');for(const e of ELEMENTS.slice(0,30)){const o=node('option',null,`${e.z} · ${e.symbol} ${e.name}`);o.value=e.z;select.append(o);}select.value=initial;label.append(select);
  const ionLabel=node('label',null,'중성 / 이온'),charge=node('select');charge.setAttribute('aria-label','전자배치 전하');ionLabel.append(charge);controls.append(label,ionLabel);section.append(controls);
  const output=node('div','atom-output');section.append(output);
  function ionOptions(){charge.replaceChildren();const e=ELEMENTS[Number(select.value)-1];for(const q of [0,...(ION_OPTIONS[e.z]??[])]){const o=node('option',null,q===0?'중성':`${q>0?'+':''}${q} 이온`);o.value=q;charge.append(o);}render();}
  function render(){const e=ELEMENTS[Number(select.value)-1],state=orbitalState(e,Number(charge.value));output.replaceChildren(node('p','electron-config',state.configuration));
    const summary=node('p','atom-summary',`전자 ${state.electrons}개 · 최외각(n=${state.shells.length}) ${state.outer}개 · 짝 없는 전자 ${state.unpaired}개`);output.append(summary);
    for(const o of state.boxes){const row=node('div','orbital-row');row.append(node('strong',null,`${o.n}${o.type}`));for(const [i,text] of o.cells.entries()){const box=node('span','orbital-box',text||'·');box.setAttribute('aria-label',`${o.n}${o.type} 오비탈 ${i+1}: ${text==='↑↓'?'전자 2개':text?'전자 1개':'비어 있음'}`);row.append(box);}output.append(row);}
    output.append(node('p','small',e.z>=21?'전이 금속에서는 d 전자도 결합에 참여합니다. 최외각 전자 수와 원자가 전자 수는 항상 같지 않습니다.':'가장 큰 n에 들어 있는 전자를 최외각 전자로 셌습니다. 이온 배치는 고립된 바닥상태의 학습 모형입니다.'));}
  select.addEventListener('change',ionOptions);charge.addEventListener('change',render);ionOptions();return section;
}
function probabilityWorkbench(){
  const section=node('section','probability-workbench');section.append(node('h3',null,'수소 1s: 확률 밀도와 거리'),node('p','small','수소의 비상대론적 1s 모형입니다. a₀는 보어 반지름이며, 여기서는 거리의 단위로만 사용합니다.'));
  const label=node('label',null,'구 안을 살펴볼 반지름'),slider=node('input');slider.type='range';slider.min='.1';slider.max='6';slider.step='.1';slider.value='1';slider.setAttribute('aria-label','수소 관측 반지름');label.append(slider);section.append(label);
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 420 180');svg.setAttribute('role','img');svg.setAttribute('aria-label','수소 1s의 거리별 확률 밀도와 구껍질 확률 분포');svg.classList.add('probability-chart');
  for(const [kind,color,scale] of [['density','#b56e38',1],['radial','#176654',.6]]){const path=document.createElementNS(ns,'path');path.setAttribute('d',Array.from({length:121},(_,i)=>{const r=i/20,v=hydrogenProbability(r)[kind];return `${i?'L':'M'}${30+r*60} ${150-v/scale*110}`;}).join(' '));path.setAttribute('fill','none');path.setAttribute('stroke',color);path.setAttribute('stroke-width','3');svg.append(path);}
  const marker=document.createElementNS(ns,'line');marker.setAttribute('y1','20');marker.setAttribute('y2','150');marker.setAttribute('stroke','#183a37');marker.setAttribute('stroke-dasharray','4 4');svg.append(marker);
  for(const [x,y,text] of [[30,170,'0'],[89,170,'1a₀'],[375,170,'6a₀']]){const t=document.createElementNS(ns,'text');t.setAttribute('x',x);t.setAttribute('y',y);t.textContent=text;svg.append(t);}section.append(svg,node('p','small','갈색: |ψ|²에 비례하는 밀도 · 초록: 같은 두께의 구껍질에서 발견할 확률. 두 곡선은 서로 다른 세로 척도로 표시합니다.'));
  const result=node('p','radial-result');result.setAttribute('role','status');section.append(result);
  function render(){const r=Number(slider.value),p=hydrogenProbability(r);marker.setAttribute('x1',30+r*60);marker.setAttribute('x2',30+r*60);result.textContent=`반지름 ${r.toFixed(1)}a₀인 구 안에서 발견할 확률 ${(p.inside*100).toFixed(1)}%. 밀도는 중심에서 크지만, 같은 두께 구껍질의 확률은 r=a₀에서 가장 큽니다.`;}slider.addEventListener('input',render);render();return section;
}
