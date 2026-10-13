// Authored learning sequence. Scientific facts are separate from the numeric snapshot.
const chapter = (id, title, question, rule, why, example, limit, next, elements, category, sources, check) => ({id,title,question,rule,why,example,limit,next,elements,category,sources,check});
const quantum = 'https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory';
const filling = 'https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations';
const trends = 'https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties';
const bonds = 'https://openstax.org/books/chemistry-2e/pages/7-2-covalent-bonding';
const solids = 'https://openstax.org/books/chemistry-2e/pages/10-5-the-solid-state-of-matter';
export const LESSONS = [
  chapter('charge','원자를 구별하는 기준','원소와 이온은 무엇이 다른가요?',
    '양성자 수 Z가 원소를 정합니다. 전자 수를 바꾸면 이온, 중성자 수를 바꾸면 동위원소가 됩니다.',
    '핵은 양전하, 전자는 음전하를 가집니다. 전하를 기본 전하 단위로 쓰면 q = Z − 전자 수입니다. 중성에서는 두 수가 같습니다.',
    'Na와 Na⁺는 모두 양성자 11개인 나트륨입니다. Na⁺는 전자가 10개입니다. 탄소-12와 탄소-13은 중성자 수만 다른 탄소입니다.',
    '질량수는 양성자+중성자라는 정수입니다. 주기율표의 평균 원자량과 같지 않습니다. 이온이 되어도 원소의 이름은 바뀌지 않습니다.',
    '원자번호 → 전자 수 → 전자배치 순서로 확인하세요.',[6,11],'calculation',[
      'https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism'],
    {prompt:'양성자 12개, 전자 10개인 입자를 어떻게 표시할까요?',options:['Mg²⁺','Ne','Mg²⁻','Na⁺'],answer:0,reason:'원자번호 12는 Mg입니다. 전하 = 12 − 10 = +2이므로 Mg²⁺입니다.'}),
  chapter('quantum','전자껍질과 오비탈','전자는 핵 주위를 정해진 원으로 도나요?',
    '전자껍질은 상태를 분류하는 이름이고, 오비탈은 전자를 발견할 확률 분포를 나타내는 파동함수입니다.',
    '결합된 전자는 허용된 에너지 상태를 가집니다. 주양자수 n, 각운동량 양자수 l, 방향을 구별하는 mₗ, 스핀 mₛ로 상태를 구별합니다. 위치와 운동량을 동시에 정확히 정할 수는 없습니다.',
    'n=2에는 2s 오비탈 1개와 2p 오비탈 3개가 있습니다. 하나의 오비탈에는 서로 반대 스핀인 전자 두 개까지 들어갑니다.',
    '껍질 그림은 분류 도식이지 전자의 비행 경로가 아닙니다. s·p 그림도 원자의 단단한 표면이나 전자 공의 모양을 뜻하지 않습니다.',
    '전자 상태 → 허용 오비탈 수 → 넣을 수 있는 전자 수를 연결하세요.',[1,2,6],'electrons',[quantum],
    {prompt:'n=3 껍질에 허용되는 오비탈 수와 최대 전자 수는?',options:['9개 · 18개','3개 · 6개','8개 · 16개','18개 · 36개'],answer:0,reason:'l=0,1,2에 s 1개+p 3개+d 5개=9개 오비탈이 있습니다. 각각 두 전자를 담아 최대 18개입니다.'}),
  chapter('filling','전자가 들어가는 규칙','빈자리가 많은데 왜 특정 배치를 택할까요?',
    '파울리 원리: 오비탈당 최대 두 전자. 훈트 규칙: 같은 에너지의 오비탈은 먼저 하나씩 같은 방향 스핀으로 채웁니다.',
    '바닥상태는 전체 에너지가 낮은 배치입니다. 다전자 원자에서는 전자 사이의 반발과 차폐 때문에 같은 n 안에서도 에너지가 달라집니다.',
    '질소의 2p³은 [↑][↑][↑], 산소의 2p⁴는 [↑↓][↑][↑]입니다. 산소에는 짝 없는 전자가 두 개 남습니다.',
    '1s→2s→2p→3s→3p→4s→3d…는 유용한 채움 순서이지만 절대적인 법칙은 아닙니다. Cr은 [Ar]3d⁵4s¹, Cu는 [Ar]3d¹⁰4s¹입니다. 이온에서는 에너지 순서도 바뀝니다.',
    '아래 전자배치 작업대에서 N, O, Cr, Cu를 비교하세요.',[7,8,24,29],'electrons',[filling],
    {prompt:'산소의 2p⁴를 훈트 규칙에 맞게 채우면 짝 없는 전자는?',options:['2개','0개','1개','4개'],answer:0,reason:'먼저 세 칸에 하나씩 넣고 네 번째가 한 칸에서 짝을 만듭니다. 두 칸에는 하나씩 남습니다.'}),
  chapter('periodic','주기율표가 반복되는 이유','같은 족은 왜 닮았을까요?',
    '주족 원소에서는 가장 바깥쪽 s·p 전자배치가 반복됩니다. 이 바깥 전자가 결합에 참여하므로 같은 족의 화학적 성질이 닮습니다.',
    '새 전자껍질이 시작되면 큰 틀의 전자배치가 다시 반복됩니다. 주기는 가로줄, 족은 세로줄이며, 주족의 바깥 전자 수를 읽는 단서입니다.',
    'Li: 2s¹, Na: 3s¹, K: 4s¹. 모두 바깥 s 전자가 하나여서 +1 이온을 만들기 쉽습니다. Ne: 2s²2p⁶은 바깥 s·p가 찬 경우입니다.',
    '같은 족이라고 크기·반응 속도가 같지는 않습니다. He는 1s²로 채워집니다. 전이 금속에서는 d 전자도 결합에 참여하므로 최외각 전자 수만으로 설명하면 부족합니다.',
    '같은 족에서 n이 바뀌는 점과 유지되는 바깥 배치를 따로 보세요.',[3,11,19,10],'identity',[filling],
    {prompt:'Na와 K가 비슷한 화학적 성질을 보이는 핵심 근거는?',options:['바깥 ns 전자가 각각 하나','원자 크기가 동일','전자 수가 동일','중성자 수가 동일'],answer:0,reason:'껍질과 전체 전자 수는 다르지만, 주족의 바깥 전자배치 ns¹이라는 패턴이 같습니다.'}),
  chapter('attraction','핵의 끌어당김과 차폐','양성자가 많으면 원자는 항상 커질까요?',
    '핵의 인력은 전자를 잡아당기고, 안쪽 전자는 바깥 전자가 느끼는 인력을 일부 가립니다. 이를 차폐와 유효 핵전하로 생각할 수 있습니다.',
    '같은 주기에서는 바깥 전자의 껍질이 비슷한 채로 핵전하가 증가하여 반지름이 대체로 작아집니다. 아래 주기로 가면 새 껍질과 차폐가 생겨 대체로 커집니다.',
    'Na→Cl에서 원자 크기는 대체로 감소하고 전자를 떼는 데 필요한 에너지는 대체로 증가합니다. 등전자 O²⁻, F⁻, Na⁺, Mg²⁺는 핵전하가 큰 쪽이 더 작습니다.',
    'Z−안쪽 전자 수는 정성적인 생각 도구이지 정확한 유효 핵전하 계산식이 아닙니다. 반지름의 정의·배위수와 전자쌍 반발 때문에 단순 순서에 예외가 있습니다.',
    '전자 수가 같은지 먼저 확인한 뒤 핵전하를 비교하세요.',[8,9,11,12,17],'properties',[trends],
    {prompt:'전자 10개인 F⁻, Na⁺, Mg²⁺를 같은 배위 조건에서 비교하면 가장 작은 것은?',options:['Mg²⁺','F⁻','Na⁺','세 입자가 동일'],answer:0,reason:'전자 수는 같고 핵전하는 9, 11, 12입니다. Mg²⁺의 핵이 가장 강하게 끌어당깁니다.'}),
  chapter('ions','전자 하나를 떼어 보면','이온화 에너지의 큰 도약은 무엇을 알려줄까요?',
    '기체 원자에서 전자를 떼려면 에너지가 필요합니다. 바깥 전자를 제거한 뒤 안쪽 닫힌 껍질을 건드리면 필요한 에너지가 크게 뛰기도 합니다.',
    '양이온은 같은 핵에 남은 전자가 더 강하게 묶입니다. 전이 금속 양이온에서는 대체로 큰 n의 ns 전자를 (n−1)d보다 먼저 제거합니다.',
    'Na의 첫 전자는 3s에서 빠지고, 다음에는 닫힌 [Ne] 핵심 배치를 건드립니다. Fe: [Ar]3d⁶4s² → Fe²⁺: [Ar]3d⁶ → Fe³⁺: [Ar]3d⁵.',
    '떼는 순서는 중성 원자를 채울 때의 순서를 단순히 뒤집은 것이 아닙니다. Be/B와 N/O의 첫 이온화 에너지 예외에는 부껍질 에너지·짝지음이 관여합니다.',
    '이온 전하를 전자 개수로 바꾸고, 어느 부껍질에서 빠졌는지 확인하세요.',[11,26,4,5,7,8],'electrons',[trends,filling],
    {prompt:'Fe²⁺가 되어 4s 전자 두 개를 잃으면 남는 배치는?',options:['[Ar]3d⁶','[Ar]3d⁴4s²','[Ar]3d⁵4s¹','[Ar]3d⁸'],answer:0,reason:'전이 금속 양이온을 만들 때 4s 전자를 먼저 제거합니다. 바닥상태 Fe²⁺의 배치는 [Ar]3d⁶입니다.'}),
  chapter('bonding','전자배치에서 결합으로','원자는 왜 함께 있는 편이 안정할까요?',
    '결합은 원자들이 함께 있을 때 전체 에너지가 더 낮아지는 상황입니다. 끌어당김뿐 아니라 핵·전자 사이의 반발도 함께 고려합니다.',
    '전자가 한 원자에만 속한다고 보기 어려워지면 공유 결합, 반대 전하의 이온이 모이면 이온 결합, 고체 전체로 전자가 퍼져 움직이면 금속 결합으로 설명합니다.',
    'NaCl 고체는 이온들이 반복 배열한 결정입니다. H₂는 전자를 공유하는 분자입니다. 결합을 끊을 때는 에너지가 들고, 같은 결합을 만들 때는 에너지를 내놓습니다.',
    '옥텟은 주족의 많은 결합을 설명하는 근사 규칙입니다. 전기음성도 차이에 고정 경계값을 두어 모든 결합을 분류할 수는 없습니다. 전자쌍·결합 에너지·구조를 함께 봅니다.',
    '전자 수 → 전자 분포 → 에너지 변화 → 구조 순서로 추론하세요.',[1,11,17,29],'properties',[bonds],
    {prompt:'수소 분자의 H–H 결합을 끊어 멀리 분리할 때 필요한 것은?',options:['에너지 공급','같은 양의 에너지 방출','전자 두 개의 소멸','양성자 수 변화'],answer:0,reason:'안정한 결합 상태에서 분리된 원자로 가려면 에너지를 공급해야 합니다. 결합 형성과 결합 절단의 에너지 방향은 반대입니다.'}),
  chapter('structure','같은 원소, 다른 물성','탄소인데 왜 흑연과 다이아몬드는 다를까요?',
    '물성은 원소 이름뿐 아니라 결합의 연결 방식, 전자의 이동 가능성, 결정 구조와 상태에 달려 있습니다.',
    '같은 전자 수를 가져도 원자들이 다른 방향·차원으로 연결되면 전자의 분포와 고체 전체의 에너지 상태가 달라집니다.',
    '다이아몬드는 탄소가 입체적인 공유 결합망을 이룹니다. 흑연은 층 구조와 층 안의 퍼진 전자로 설명합니다. 그래서 단단함과 전기 전도 특성이 다릅니다.',
    '분자성 물질의 분자 안 결합과 분자 사이 힘을 구별하세요. 분자 안 결합이 강하다고 녹는점이 반드시 높지는 않습니다. 금속의 전도도도 자유 전자 수 하나로 모두 결정되지 않습니다.',
    '원소 → 결합 → 배열 → 전자의 움직임 → 물성으로 확장하세요.',[6,29],'properties',[solids],
    {prompt:'흑연과 다이아몬드의 성질 차이를 설명할 때 가장 먼저 확인할 것은?',options:['결합과 원자 배열','탄소의 양성자 수 차이','원소 기호 차이','항상 다른 질량수'],answer:0,reason:'둘 다 탄소지만 결합망과 전자 분포가 다릅니다. 이처럼 같은 원소의 다른 구조를 동소체라고 합니다.'}),
  chapter('conditions','상태와 사진을 해석하기','사진 한 장으로 원소의 성질을 정할 수 있을까요?',
    '온도와 압력은 어떤 상이 안정한지를 바꿉니다. 색은 빛과 전자의 상호작용뿐 아니라 표면·결함·산화층의 영향도 받습니다.',
    '기체를 액체로 만들면 분자 사이 거리가 좁아지지만 그 원소가 바뀌는 것은 아닙니다. 방전관의 빛은 들뜬 상태에서 낮은 에너지 상태로 이동하며 방출한 빛입니다.',
    '액체 산소는 실제 액체 표본입니다. 네온 방전관의 밝은 빛은 평범한 기체의 표면색이 아닙니다. 표본 사진·발광·피복을 나누어 관찰해야 합니다.',
    '녹는점·밀도와 결정 데이터는 상태·조건·동소체가 다르면 달라집니다. 사진과 CPK 표시색, 계산된 오비탈 그림을 같은 종류의 정보로 취급하지 마세요.',
    '무엇을 촬영했는지 → 조건 → 관측 값 → 해석의 범위를 확인하세요.',[2,8,10,17,54],'properties',[
      'https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams',
      'https://openstax.org/books/chemistry-2e/pages/6-2-the-bohr-model'],
    {prompt:'네온 방전관의 빛을 보고 바로 결론 내릴 수 없는 것은?',options:['액체 네온의 표면색','방전 중 빛이 방출됨','빛을 내는 상태라는 점','기체 표본이 관 안에 있음'],answer:0,reason:'방전으로 들뜬 원자에서 나온 빛과 액체의 평상시 외관은 다른 관측입니다.'}),
  chapter('inference','처음 보는 물질을 추론하기','암기하지 않은 물질도 설명할 수 있을까요?',
    '확실한 정보부터 시작해 한 단계씩 연결하고, 경향과 측정 사실을 나누면 지식을 새로운 물질로 확장할 수 있습니다.',
    '전자배치로 반응의 단서를 얻고, 결합·구조로 물성의 단서를 얻습니다. 각 단계에 필요한 가정이 있으므로 마지막에는 실제 조건과 자료로 확인합니다.',
    '새로운 1족 원소를 보면 바깥 ns¹에서 +1 이온의 경향을 예상할 수 있습니다. 하지만 그 고체의 정확한 녹는점과 반응 속도까지 전자배치만으로 계산할 수는 없습니다.',
    '단순 규칙은 출발점입니다. 전이 금속, 큰 원자에서의 상대론적 효과, 결정의 결함·구조와 환경은 추가 설명을 요구합니다. 자료 없음과 값 0은 다릅니다.',
    '1. 입자 수  2. 허용 상태  3. 전자배치  4. 결합  5. 구조와 조건  6. 자료로 확인.',[3,11,19,29],'properties',[trends,solids],
    {prompt:'[Ne]3s¹ 전자배치만으로 가장 타당하게 예상할 수 있는 것은?',options:['바깥 전자 한 개와 +1 이온 경향','정확한 녹는점','모든 반응의 실제 속도','모든 결정의 구조'],answer:0,reason:'바깥 전자배치는 주족 이온 경향의 단서입니다. 나머지는 구조·조건·실제 측정 등의 추가 정보가 필요합니다.'})
];

export const APPLICATIONS={
  charge:{prompt:'²⁴Mg²⁺와 ²⁵Mg²⁺는 전자 수가 같지만 질량수가 다릅니다. 두 입자의 (양성자, 중성자, 전자) 수는?',options:['(12,12,12) / (12,13,12)','(12,12,10) / (12,13,10)','(12,24,10) / (12,25,10)','(10,14,12) / (10,15,12)'],answer:1,reason:'Z=12, 전자는 12−2=10개입니다. 중성자는 A−Z이므로 12개와 13개입니다. 동위원소와 이온 전하를 각각 계산해야 합니다.'},
  quantum:{prompt:'수소 1s의 밀도는 중심에서 최대인데 같은 두께 구껍질의 확률은 r=a₀에서 최대입니다. 가장 적절한 설명은?',options:['전자가 반지름 a₀의 원을 돈다','중심에서 파동함수가 반드시 0이다','밀도와 구껍질 확률은 같은 양이다','구껍질 부피의 r² 인자가 밀도에 곱해진다'],answer:3,reason:'거리별 분포는 4πr²|ψ|²입니다. 중심은 밀도가 높아도 구껍질 부피가 0으로 줄어듭니다. a₀는 가장 확률이 큰 거리이며 고정된 궤도 반지름이 아닙니다.'},
  filling:{prompt:'전자배치 모형에서 산소 원자 O와 산화물 이온 O²⁻를 비교합니다. 전자를 두 개 얻으면 2p의 점유와 짝 없는 전자 수가 어떻게 달라질까요?',options:['2p⁴·2개 → 2p⁶·0개','2p⁴·4개 → 2p⁶·2개','2p⁴·2개 → 3s²·2개','2p⁴·0개 → 2p⁶·0개'],answer:0,reason:'O의 2p⁴는 세 오비탈 중 두 칸에 홀전자가 남습니다. 두 전자를 더 넣으면 2p⁶이 되어 모두 짝지어집니다. 여기서는 산화물 속 이온을 설명하는 전자배치 모형을 비교하며, O²⁻가 단독 기체로 안정하다는 뜻은 아닙니다. 물질 전체의 자성도 이 점유만으로 모두 판단할 수는 없습니다.'},
  periodic:{prompt:'Na⁺와 Ne가 둘 다 1s²2s²2p⁶입니다. 같은 입자라고 할 수 없는 핵심 이유는?',options:['최외각 전자 수가 다르다','전자 수가 다르다','핵의 양성자 수가 11개와 10개다','주양자수 n이 항상 다르다'],answer:2,reason:'둘은 등전자 입자지만 Na⁺의 핵전하는 +11, Ne의 핵전하는 +10입니다. 전자배치가 같다고 원소의 정체성이나 크기가 같아지지는 않습니다.'},
  attraction:{prompt:'N보다 오른쪽에 있는 O의 첫 이온화 에너지가 더 작습니다. 단순한 “오른쪽으로 갈수록 증가” 경향을 보완하는 설명은?',options:['O의 핵전하가 N보다 작다','O의 2p에서 짝지은 전자의 반발이 제거를 쉽게 한다','O의 전자가 전부 3s에 있다','같은 주기에서는 차폐가 완전히 0이다'],answer:1,reason:'N은 2p³로 각각 홀로 점유하고, O의 2p⁴에는 한 쌍이 생깁니다. 전자쌍 반발을 함께 고려하면 O에서 첫 전자를 떼는 예외를 설명할 수 있습니다. 단일 경향만으로 모든 이웃 값을 예측할 수 없습니다.'},
  ions:{prompt:'Fe³⁺의 [Ar]3d⁵를 보고 한 학습자가 “처음 채운 4s를 마지막에 제거해야 한다”고 말합니다. 올바른 설명은?',options:['Fe³⁺는 [Ar]3d³4s²다','3d 전자를 모두 뺀 뒤 4s를 뺀다','4s와 3d 중 무작위로 세 개를 뺀다','중성 Fe의 4s²를 먼저 빼고 3d에서 하나 더 뺀다'],answer:3,reason:'Fe의 중성 배치 [Ar]3d⁶4s²에서 양이온화할 때 4s를 먼저 제거합니다. Fe²⁺는 3d⁶, Fe³⁺는 3d⁵이고 후자는 고립된 이온 모형에서 홀전자 5개입니다.'},
  bonding:{prompt:'H₂ 두 분자를 원자로 나누려면 같은 H–H 결합 두 개를 끊어야 합니다. 한 결합을 끊는 에너지가 D>0이면, 원자가 재결합해 두 분자가 되는 과정의 에너지 변화는?',options:['+2D','0','−2D','−D'],answer:2,reason:'같은 시작·끝 상태를 뒤집은 과정은 에너지 변화의 부호도 뒤집힙니다. 두 결합을 끊을 때 +2D, 같은 두 결합을 형성할 때 −2D입니다. 반응 전체에서는 끊는 결합과 만드는 결합을 모두 셉니다.'},
  structure:{prompt:'다이아몬드와 흑연 표본의 원소 분석이 모두 탄소라고 나왔습니다. 전기 전도와 경도가 다른 이유를 조사하려면 다음으로 무엇을 확인해야 할까요?',options:['원자 배열과 결합망, 전자의 이동 가능성','원자번호가 사실 서로 다른지','표본마다 원소 기호가 달라지는지','평균 원자량만으로 물성을 결정'],answer:0,reason:'동소체의 물성 비교에는 구조와 결합이 필요합니다. 흑연은 층 안의 퍼진 전자와 층 사이 결합, 다이아몬드는 입체적 결합망을 구별합니다. 동위원소 조성 하나만으로 이 구조 차이를 설명하지 않습니다.'},
  conditions:{prompt:'표본 A는 네온 방전관, B는 액체 산소 사진입니다. 두 사진의 색을 같은 종류의 물성 값으로 비교하기 어려운 이유는?',options:['사진이면 모두 가상 자료이기 때문','네온은 원소가 아니기 때문','방출광과 액체 표본의 외관은 관측 방식과 상태가 다르기 때문','산소가 액체가 되면 원자번호가 바뀌기 때문'],answer:2,reason:'방전의 들뜬 원자가 방출하는 빛과 액체 표본을 비추어 관찰한 외관을 구분해야 합니다. 원본 설명, 상태와 조명을 확인한 뒤 무엇을 비교하는지 정합니다. 사진은 원래 출처와 관측 유형을 유지합니다.'},
  inference:{prompt:'가상 주족 원자의 바깥 배치가 ns²np⁵입니다. 추가 측정 없이 가장 타당한 추론과 아직 정할 수 없는 정보를 함께 고른 것은?',options:['반드시 +7 이온 / 원자번호','전자 한 개를 얻는 경향 / 정확한 녹는점','항상 금속 전도 / 주기','모든 결합이 이온 결합 / 핵전하'],answer:1,reason:'닫힌 ns²np⁶ 배치에 한 전자가 부족하므로 많은 할로젠에서 −1 이온 경향을 생각할 수 있습니다. 정확한 녹는점은 결합·구조·상과 측정 조건의 정보가 필요합니다. 경향을 모든 반응의 법칙으로 바꾸지 않습니다.'}
};

const cores={He:'1s2',Ne:'1s2 2s2 2p6',Ar:'1s2 2s2 2p6 3s2 3p6',Kr:'1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6'};
const order=['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p'];
const capacities={s:2,p:6,d:10,f:14};
export const ION_OPTIONS={3:[1],4:[2],7:[-3],8:[-2],9:[-1],11:[1],12:[2],13:[3],16:[-2],17:[-1],19:[1],20:[2],24:[2,3],25:[2],26:[2,3],27:[2],28:[2],29:[1,2],30:[2]};
export function orbitalState(element,charge=0){
  if(!element||!Number.isInteger(element.z)||element.z<1||element.z>30||!Number.isInteger(charge)||charge!==0&&!ION_OPTIONS[element.z]?.includes(charge))throw new RangeError('Unsupported electronic state');
  const expanded=element.configuration.replace(/\[([A-Z][a-z]?)\]/g,(_,name)=>` ${cores[name]??''} `);
  const orbitals=[...expanded.matchAll(/(\d)([spdf])(\d+)/g)].map(m=>({n:Number(m[1]),type:m[2],count:Number(m[3])}));
  if(orbitals.reduce((s,o)=>s+o.count,0)!==element.z)throw new Error('Invalid configuration');
  if(charge>0){let left=charge;for(const o of [...orbitals].sort((a,b)=>b.n-a.n||'spdf'.indexOf(b.type)-'spdf'.indexOf(a.type))){const remove=Math.min(left,o.count);o.count-=remove;left-=remove;}}
  if(charge<0){let left=-charge;for(const key of order){let o=orbitals.find(x=>`${x.n}${x.type}`===key);if(!o){o={n:Number(key[0]),type:key[1],count:0};orbitals.push(o);}const add=Math.min(left,capacities[o.type]-o.count);o.count+=add;left-=add;if(!left)break;}}
  const occupied=orbitals.filter(o=>o.count).sort((a,b)=>order.indexOf(`${a.n}${a.type}`)-order.indexOf(`${b.n}${b.type}`));
  const shells=Array.from({length:Math.max(...occupied.map(o=>o.n))},(_,i)=>({n:i+1,count:occupied.filter(o=>o.n===i+1).reduce((s,o)=>s+o.count,0)}));
  const boxes=occupied.map(o=>{const count=capacities[o.type]/2;return {...o,cells:Array.from({length:count},(_,i)=>i<o.count-count?'↑↓':i<o.count?'↑':'')};});
  const electrons=occupied.reduce((s,o)=>s+o.count,0);
  return {electrons,charge,shells,boxes,outer:shells.at(-1).count,unpaired:boxes.reduce((s,o)=>s+o.cells.filter(c=>c==='↑').length,0),configuration:occupied.map(o=>`${o.n}${o.type}${o.count}`).join(' ')};
}
export function hydrogenProbability(radius){
  if(!Number.isFinite(radius)||radius<0||radius>10)throw new RangeError('Radius must be within 0..10 a0');
  return {density:Math.exp(-2*radius),radial:4*radius*radius*Math.exp(-2*radius),inside:1-Math.exp(-2*radius)*(1+2*radius+2*radius*radius)};
}
