'use strict';
/* Atlas Bíblico 2.0 · camadas de pesquisa e expansão progressiva.
  OpenBible.info: CC BY 4.0; Theographic: CC BY-SA 4.0; Almeida 1819: domínio público.
  Nota de integridade: dados externos e ocorrências dependem dos arquivos realmente carregados. */
(() => {
const API='https://bible.helloao.org';
const URL_COMPLETE_BIBLE='https://raw.githubusercontent.com/midvash/bible-data/main/versions/pt/almeida-livre/almeida-livre.json';
const types={people:'Personagem',places:'Cidade ou local',events:'Acontecimento'};
const curatedFallback={
 people:[
  {name:'Jesus',en:'Jesus',aliases:['Jesus Cristo','Cristo'],summary:'Figura central do Novo Testamento. Os Evangelhos narram seu ministério, ensinos, morte e ressurreição; os escritos apostólicos apresentam sua identidade e significado para a fé cristã.',refs:['Matt.1.21','Luke.2.7','Mark.1.11','John.3.16','John.19.30','Luke.24.6']},
  {name:'Paulo',en:'Paul',aliases:['Saulo','Apóstolo Paulo'],summary:'Apóstolo que, após a experiência narrada em Atos 9, passou a anunciar Jesus Cristo em diversas cidades do Mediterrâneo. É uma das principais figuras da expansão da igreja primitiva.',refs:['Acts.9.3','Acts.9.15','Acts.13.9','Rom.1.1','2Tim.4.7'],apiLink:'/api/d/theographic/people/paul_2479.json'},
  {name:'Moisés',en:'Moses',summary:'Líder israelita associado à libertação do povo do Egito, à aliança no Sinai e à condução de Israel pelo deserto, conforme o Pentateuco.',refs:['Exod.3.10','Exod.14.21','Exod.20.1','Deut.34.5','Heb.11.24']},
  {name:'Daniel',en:'Daniel',summary:'Jovem judeu levado ao exílio na Babilônia. O livro que leva seu nome descreve sua fidelidade, suas experiências na corte e suas visões proféticas.',refs:['Dan.1.6','Dan.2.19','Dan.6.10','Dan.6.22','Dan.9.2']},
  {name:'Pedro',en:'Simon Peter',aliases:['Simão Pedro','Cefas'],summary:'Discípulo de Jesus e um dos apóstolos mais presentes nos Evangelhos e em Atos. Aparece entre os primeiros chamados por Jesus e como pregador no início da igreja.',refs:['Matt.4.18','Matt.16.16','Luke.22.61','Acts.2.14','Acts.3.6'],apiLink:'/api/d/theographic/people/peter_2745.json'},
  {name:'Abraão',en:'Abraham',aliases:['Abrão'],summary:'Patriarca chamado por Deus a deixar sua terra. As promessas sobre descendência e bênção às nações constituem um eixo importante de Gênesis e são retomadas no Novo Testamento.',refs:['Gen.12.1','Gen.15.6','Gen.17.5','Gen.22.2','Rom.4.3']},
  {name:'Davi',en:'David',summary:'Pastor que se tornou rei de Israel. Sua trajetória envolve a unção por Samuel, o enfrentamento de Golias, o governo do reino e a promessa de uma dinastia.',refs:['1Sam.16.13','1Sam.17.49','2Sam.5.4','2Sam.7.16']},
  {name:'Maria, mãe de Jesus',en:'Mary (mother of Jesus)',aliases:['Maria mãe de Jesus','Virgem Maria'],summary:'Mulher de Nazaré que, segundo os Evangelhos, recebeu o anúncio do nascimento de Jesus e acompanhou momentos importantes de sua vida.',refs:['Luke.1.26','Luke.1.38','Luke.2.7','John.19.25']},
  {name:'Elias',en:'Elijah',summary:'Profeta de Israel associado ao confronto contra a idolatria, ao episódio no monte Carmelo e à narrativa de sua partida em 2 Reis.',refs:['1Kgs.17.1','1Kgs.18.36','2Kgs.2.11','Jas.5.17']},
  {name:'Josué',en:'Joshua',summary:'Sucessor de Moisés na liderança de Israel. O livro de Josué narra a travessia do Jordão, a ocupação de Canaã e a renovação do compromisso com o Senhor.',refs:['Josh.1.1','Josh.3.14','Josh.6.20','Josh.24.15']},
  {name:'Noé',en:'Noah',summary:'Personagem de Gênesis ligado à construção da arca, ao dilúvio e à aliança anunciada após o recuo das águas.',refs:['Gen.6.9','Gen.6.14','Gen.7.1','Gen.9.11']},
  {name:'José do Egito',en:'Joseph (son of Jacob)',aliases:['José filho de Jacó'],summary:'Filho de Jacó vendido pelos irmãos e levado ao Egito. Sua história em Gênesis culmina na reconciliação familiar e na sobrevivência da família durante a fome.',refs:['Gen.37.3','Gen.39.2','Gen.41.41','Gen.50.20']},
  {name:'Samuel',en:'Samuel',summary:'Profeta e juiz em Israel, associado à transição para a monarquia e à unção de Saul e Davi.',refs:['1Sam.3.10','1Sam.8.6','1Sam.10.1','1Sam.16.13']},
  {name:'Rute',en:'Ruth',summary:'Moabita que permaneceu com Noemi e integrou a linhagem de Davi, conforme a narrativa do livro de Rute.',refs:['Ruth.1.16','Ruth.2.2','Ruth.4.13','Ruth.4.17']},
  {name:'Ester',en:'Esther',summary:'Rainha judia da Pérsia que intercedeu por seu povo diante de uma ameaça de extermínio, conforme o livro de Ester.',refs:['Esth.2.17','Esth.4.14','Esth.7.3']},
  {name:'João Batista',en:'John the Baptist',summary:'Pregador que anunciou a necessidade de arrependimento e batizou Jesus no Jordão, conforme os Evangelhos.',refs:['Matt.3.1','Matt.3.13','John.1.29']}
 ],
 places:[
  {name:'Jerusalém',en:'Jerusalem',summary:'Cidade central na história de Israel e no desenvolvimento das narrativas bíblicas. Aparece no contexto da monarquia, do templo e dos acontecimentos finais do ministério de Jesus.',refs:['2Sam.5.6','1Kgs.8.1','Matt.21.10','Luke.24.47','Acts.2.5'],apiLink:'/api/d/theographic/places/jerusalem_636.json'},
  {name:'Belém',en:'Bethlehem',summary:'Cidade de Judá associada à família de Davi e, nos Evangelhos, ao nascimento de Jesus. Não deve ser confundida com Belém da Galileia.',refs:['Ruth.1.1','1Sam.16.4','Mic.5.2','Matt.2.1','Luke.2.4']},
  {name:'Nazaré',en:'Nazareth',summary:'Localidade da Galileia relacionada à vida de Maria, José e Jesus. Os Evangelhos descrevem Jesus como alguém criado em Nazaré.',refs:['Luke.1.26','Matt.2.23','Luke.4.16','John.1.46']},
  {name:'Egito',en:'Egypt',summary:'Região e reino associados à permanência de José, à escravidão dos israelitas, ao Êxodo e ao refúgio da família de Jesus.',refs:['Gen.41.41','Exod.1.11','Exod.12.31','Matt.2.13']},
  {name:'Babilônia',en:'Babylon',summary:'Cidade e centro imperial ligados ao exílio de Judá e às narrativas de Daniel. O nome também aparece com valor simbólico no Apocalipse, não necessariamente como referência geográfica ao mesmo local.',refs:['2Kgs.24.10','Dan.1.1','Ps.137.1','Rev.17.5']},
  {name:'Jericó',en:'Jericho',summary:'Cidade próxima ao vale do Jordão, conhecida pela narrativa da conquista sob Josué e por passagens dos Evangelhos.',refs:['Josh.6.1','Josh.6.20','Luke.19.1']},
  {name:'Galileia',en:'Galilee',summary:'Região do norte da terra de Israel onde os Evangelhos situam boa parte do ministério público de Jesus.',refs:['Matt.4.12','Matt.4.23','Mark.1.9','Luke.4.14']},
  {name:'Jordão',en:'Jordan River',aliases:['Rio Jordão'],summary:'Rio de importância geográfica e religiosa nas Escrituras, associado à entrada de Israel na terra prometida e ao batismo de Jesus.',refs:['Josh.3.15','2Kgs.2.8','Matt.3.13','Mark.1.9']},
  {name:'Monte Sinai',en:'Mount Sinai',aliases:['Sinai','Horebe'],summary:'Montanha associada aos acontecimentos do Êxodo, especialmente à manifestação divina e à entrega da Lei a Israel.',refs:['Exod.19.11','Exod.20.1','Exod.34.2']},
  {name:'Éfeso',en:'Ephesus',summary:'Cidade da Ásia Menor mencionada no ministério de Paulo, na igreja da região e na mensagem de Apocalipse 2.',refs:['Acts.19.1','Acts.19.10','Eph.1.1','Rev.2.1']},
  {name:'Samaria',en:'Samaria',summary:'Nome usado para uma cidade e também para uma região. No Novo Testamento, aparece na narrativa do encontro de Jesus com uma samaritana e na expansão da igreja.',refs:['1Kgs.16.24','John.4.4','John.4.7','Acts.8.5']},
  {name:'Jardim do Éden',en:'Garden of Eden',aliases:['Éden'],summary:'Jardim apresentado em Gênesis 2–3 como o cenário da criação da humanidade e da narrativa da desobediência de Adão e Eva.',refs:['Gen.2.8','Gen.2.15','Gen.3.23']},
  {name:'Damasco',en:'Damascus',summary:'Cidade síria citada em Gênesis, nos profetas e em Atos. É especialmente conhecida, no Novo Testamento, pela experiência de Saulo na estrada para Damasco.',refs:['Gen.14.15','Isa.17.1','Acts.9.3','Acts.9.10']}
 ],
 events:[
  {name:'Criação',en:'Creation of all things',summary:'Conjunto de narrativas e afirmações bíblicas relativas à origem dos céus, da terra e da vida. Gênesis 1–2 concentra a descrição inicial.',refs:['Gen.1.1','Gen.1.3','Gen.2.1','John.1.3','Col.1.16']},
  {name:'Êxodo',en:'Exodus',aliases:['Saída do Egito'],summary:'Libertação dos israelitas da escravidão no Egito, incluindo as pragas, a Páscoa, a saída e a travessia do mar.',refs:['Exod.12.31','Exod.12.41','Exod.14.21','Deut.5.6']},
  {name:'Dilúvio',en:'Great flood',summary:'Narrativa de Gênesis 6–9 na qual Noé constrói uma arca e é preservado com sua família e representantes dos animais.',refs:['Gen.6.17','Gen.7.11','Gen.8.1','Gen.9.11']},
  {name:'Nascimento de Jesus',en:'Birth of Jesus',aliases:['Natividade'],summary:'Relatos do nascimento de Jesus e de suas circunstâncias, apresentados sobretudo nos Evangelhos de Mateus e Lucas.',refs:['Matt.1.18','Matt.1.21','Matt.2.1','Luke.2.7']},
  {name:'Crucificação de Jesus',en:'Crucifixion of Jesus',aliases:['Crucificação','Morte de Jesus'],summary:'Acontecimentos da execução de Jesus na cruz, descritos nos quatro Evangelhos e retomados em interpretações apostólicas.',refs:['Matt.27.35','Mark.15.24','Luke.23.33','John.19.18','Rom.5.8']},
  {name:'Ressurreição de Jesus',en:'Resurrection of Jesus',aliases:['Ressurreição'],summary:'Relatos evangélicos sobre o túmulo vazio e o anúncio de que Jesus ressuscitou. O tema é central na pregação apostólica.',refs:['Matt.28.6','Mark.16.6','Luke.24.6','John.20.1','Acts.2.24']},
  {name:'Pentecostes',en:'Pentecost',summary:'Em Atos 2, reunião dos discípulos em Jerusalém marcada pela manifestação do Espírito Santo e pela pregação pública de Pedro.',refs:['Acts.2.1','Acts.2.4','Acts.2.14','Acts.2.41']},
  {name:'Conversão de Paulo',en:'Saul is converted',aliases:['Conversão de Saulo'],summary:'Relato de Atos 9 em que Saulo, a caminho de Damasco, encontra Jesus e passa por uma transformação de sua trajetória.',refs:['Acts.9.3','Acts.9.6','Acts.9.17','Acts.22.6']}
 ]
};
let curated=window.ATLAS_OFFLINE_ENTITIES?.data||curatedFallback;
const extension={wordAll:null,wordFound:[],wordShow:60,wordBusy:false,wordQuery:'',catalog:{people:null,places:null,events:null},entityMode:'people',entityItems:[],entityActive:null,chain:null};
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const escHTML=s=>esc(s);
const API_BOOK_IDS='GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV'.split(' ');
const API_BOOK_MAP=new Map(API_BOOK_IDS.map((id,i)=>[id,BOOKS[i][0]]));
function countConnections(ref){return (state.byVerse.get(parseRef(ref)?.key)||[]).length;}
function reveal(ref,where='geral'){
 setSelected(ref);state.focusArcs=true;$('btnFocusArcs').setAttribute('aria-pressed','true');$('btnFocusArcs').textContent='↶ Mostrar todos os arcos';drawAtlas();
 $(where)?.scrollIntoView({behavior:'smooth',block:'start'});
}
function handleWordSearch(){
 const q=$('wordSearchInput').value.trim();extension.wordQuery=q;
 if(!q){$('wordSearchCounter').textContent='Digite uma palavra ou expressão.';return;}
 const lookup=' '+norm(q)+' ';let all=[];
 if(extension.wordAll){for(const book of extension.wordAll.books||[]){if(!Array.isArray(book.chapters))continue;const code=book.book||book.code;for(const c of book.chapters)for(const v of c.verses||[]){const text=String(v.text||'');if((' '+norm(text)+' ').includes(lookup)){const parsed=parseRef(`${code}.${c.chapter}.${v.number}`);if(parsed)all.push({ref:parsed.key,text,count:countConnections(parsed.key)});}}}}
 else for(const [ref,text] of Object.entries(FALLBACK_TEXT)){if((' '+norm(text)+' ').includes(lookup))all.push({ref,text,count:countConnections(ref)});}
 const totalAll=all.length;
 if($('wordOnlyConnected').checked)all=all.filter(x=>x.count>0);
 extension.wordFound=all;extension.wordShow=60;
 $('wordSearchCounter').textContent=`${fmt(all.length)} resultados${$('wordOnlyConnected').checked?` com conexões (${fmt(totalAll)} correspondências totais)`:''} ${extension.wordAll?'· 66 livros pesquisados':'· somente prévia disponível'}`;
 renderWordResults();$('btnSearchArcs').hidden=all.length<2;
}
function showSearchArcs(){
 const keys=new Set(extension.wordFound.map(x=>x.ref));
 const visible=[];
 for(const e of state.edges){
  const from=expandRange(e.from),to=expandRange(e.to);
  if(from.some(k=>keys.has(k))&&to.some(k=>keys.has(k)))visible.push(e);
 }
 if(!visible.length){toast('Não existem referências cruzadas diretas ENTRE esses resultados na base carregada.');return;}
 state.searchArcEdges=visible;
 state.focusArcs=false;
 $('btnFocusArcs').setAttribute('aria-pressed','false');$('btnFocusArcs').textContent='◎ Somente conexões selecionadas';
 drawAtlas();$('geral').scrollIntoView({behavior:'smooth',block:'start'});
 toast(`${fmt(visible.length)} ligações diretas entre os versículos encontrados.`);
}
function markText(text,query){const q=norm(query);if(!q)return escHTML(text);const escaped=escHTML(text);const tokens=q.split(/\s+/);if(tokens.length!==1)return escaped; // manter integridade do HTML em busca com frase
 const regexp=new RegExp(`(^|[^\\p{L}])(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})(?=$|[^\\p{L}])`,'giu');
 return escaped.replace(regexp,(_,pre,hit)=>pre+'<mark>'+hit+'</mark>');
}
function renderWordResults(){
 const target=$('wordResults'),data=extension.wordFound;
 if(!data.length){target.innerHTML=`<div class="research-empty">Nenhuma ocorrência na ${extension.wordAll?'Bíblia carregada':'prévia local'}. ${extension.wordAll?'Tente outra palavra.':'Clique em “Carregar Bíblia completa” para pesquisar os demais versículos.'}</div>`;$('wordMore').hidden=true;return;}
 target.innerHTML=data.slice(0,extension.wordShow).map(x=>`<div class="word-card"><div><div class="word-ref">${escHTML(refText(x.ref))}</div><p>${markText(x.text,extension.wordQuery)}</p><div class="word-meta">${fmt(x.count)} referências cruzadas na base ativa${!state.isFull?' (prévia parcial)':''}</div></div><div class="word-actions"><button data-word-map="${escHTML(x.ref)}">Ver arcos</button><button data-word-chain="${escHTML(x.ref)}">Cadeia</button><button data-word-read="${escHTML(x.ref)}">Ler</button></div></div>`).join('');
 $('wordMore').hidden=data.length<=extension.wordShow;$('wordMore').textContent=`Mostrar mais ${Math.min(60,data.length-extension.wordShow)} resultados`;
}
async function loadBibleForSearch(){
 if(extension.wordBusy)return;
 if(extension.wordAll){toast('Bíblia completa já carregada para a pesquisa.');return;}
 extension.wordBusy=true;$('btnLoadBible').disabled=true;$('btnLoadBible').textContent='Baixando os 66 livros...';$('bibleSearchStatus').textContent='Carregando Bíblia...';
 const options=[];
 if(window.ATLAS_OFFLINE_BIBLE)options.push(window.ATLAS_OFFLINE_BIBLE);
 else{
  for(const url of (window.ATLAS_SITE_DATA_ONLY?['./dados/biblia_completa.json']:['./dados/biblia_completa.json',URL_COMPLETE_BIBLE])){
   const ac=new AbortController();const t=setTimeout(()=>ac.abort(),29000);
   try{const r=await fetch(url,{signal:ac.signal});if(!r.ok)continue;const data=await r.json();if((data.books||[]).length===66){options.push(data);break;}}catch(_e){}finally{clearTimeout(t);}
  }
 }
 const bible=options.find(v=>(v?.books||[]).length===66);
 if(bible){extension.wordAll=bible;for(const b of bible.books){const code=b.book||b.code;if(BOOK_BY_CODE.has(code))state.bookCache.set(code,b);} $('bibleSearchStatus').textContent='Busca integral · 66 livros';$('btnLoadBible').textContent='✓ Bíblia carregada';$('btnLoadBible').disabled=false;toast('Pesquisa integral pronta: texto dos 66 livros disponível.');if(extension.wordQuery)handleWordSearch();}
 else{$('bibleSearchStatus').textContent='Prévia de 6 versículos';$('btnLoadBible').textContent='Tentar carregar a Bíblia';$('btnLoadBible').disabled=false;toast('A Bíblia completa não foi obtida. Use a versão offline integral ou verifique a conexão.');}
 extension.wordBusy=false;
}
function refFromApi(a){if(!a||typeof a!=='object')return null;const code=API_BOOK_MAP.get(String(a.book||'').toUpperCase())||BOOK_BY_CODE.get(a.book)?.code;const p=parseRef(`${code}.${a.chapter}.${a.verse}`);if(!p)return null;const end=Number(a.endVerse);return end>p.verse&&end-p.verse<100?p.key+'-'+end:p.key;}
function localItem(entity,type){return {...entity,type,local:true,key:`local:${type}:${curated[type].indexOf(entity)}`};}
function externalItem(entity,type){return {...entity,type,local:false,key:`ext:${type}:${entity.id}`,en:entity.name,refs:[],summary:'',apiLink:entity.thisPersonApiLink||entity.thisPlaceApiLink||entity.thisEventApiLink||null};}
function entityMatches(item,q){const aliases=[item.name,item.en,...(item.aliases||[])].map(norm);return !q||aliases.some(v=>v.includes(q)||(q.includes(v)&&v.length>=4))||(q.length>=5&&norm(item.summary).includes(q));}
function currentEntities(){return curated[extension.entityMode].map(e=>localItem(e,extension.entityMode));}
function setEntityMode(type){if(!types[type])return;extension.entityMode=type;document.querySelectorAll('[data-entity-mode]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.entityMode===type));const prompts={people:'Ex.: Paulo, Moisés, Maria, Daniel',places:'Ex.: Jerusalém, Belém, Galileia',events:'Ex.: Êxodo, ressurreição, Pentecostes'};const examples={people:['Jesus','Paulo','Daniel','Pedro'],places:['Jerusalém','Belém','Nazaré','Babilônia'],events:['Criação','Êxodo','Ressurreição de Jesus','Pentecostes']};$('entityQuery').placeholder=prompts[type];$('entityExamples').innerHTML=examples[type].map(n=>`<button data-entity-example="${escHTML(n)}">${escHTML(n)}</button>`).join('');$('entityQuery').value='';renderEntityMatches('');}
function renderEntityMatches(query){const type=extension.entityMode,q=norm(query);
 const local=currentEntities().filter(e=>entityMatches(e,q));const others=extension.catalog[type]||[];const remote=others.filter(e=>entityMatches(e,q)&&!local.some(l=>norm(l.en)===norm(e.name))).slice(0,130);
 const entries=[...local,...remote];extension.entityItems=entries;
 if(!entries.length){$('entityResults').innerHTML='<div class="research-empty">Nenhum registro corresponde à pesquisa. Experimente outro nome ou carregue o catálogo de entidades.</div>';$('entityProfile').innerHTML='<div class="research-empty">Nenhuma ficha selecionada.</div>';return;}
 $('entityResults').innerHTML=entries.slice(0,160).map((e,i)=>`<button class="entity-result" data-entity-index="${i}"><span class="entity-dot" style="background:${e.local?'#65ccbd':'#8d91ff'}"></span><span><b>${escHTML(e.name)}</b><small>${e.local?'Resumo em português': 'Catálogo aberto · nome original'}${e.numberOfReferences?` · ${fmt(e.numberOfReferences)} referências`:''}</small></span></button>`).join('');
 showEntity(entries[0],0);
}
async function showEntity(item,index,maxRefs=100){extension.entityActive=item;document.querySelectorAll('.entity-result').forEach((e,i)=>e.classList.toggle('active',i===index));
 const profile=$('entityProfile');profile.innerHTML=`<div class="entity-type">${escHTML(types[item.type])} · ${item.local?'FICHA EM PORTUGUÊS':'CATÁLOGO ABERTO'}</div><h3>${escHTML(item.name)}</h3><p class="entity-summary">${escHTML(item.summary||'Consultando dados bibliográficos e referências desta entidade...')}</p>${item.refs?.length?`<div class="profile-label">PASSAGENS INICIAIS</div><div class="entity-verses">${item.refs.map(r=>`<button data-entity-verse="${escHTML(r)}">${escHTML(refText(r))}</button>`).join('')}</div>`:''}<div class="source-note">${item.apiLink?'Consultando referências adicionais na base aberta...':'Ficha local com referências selecionadas.'}</div>`;
 const id=extension.entityActive.key;
 let detail=null;
 if(!item.local&&item.apiLink&&/^\/api\/d\/theographic\/(people|places|events)\/[A-Za-z0-9_-]+\.json$/.test(item.apiLink)){
  try{const ac=new AbortController();const tm=setTimeout(()=>ac.abort(),9500);const r=await fetch(API+item.apiLink,{signal:ac.signal});clearTimeout(tm);if(r.ok){const payload=await r.json();detail=payload.person||payload.place||payload.event||null;}}catch(_e){}
 }
 if(id!==extension.entityActive?.key)return;
 const apiRefs=Array.isArray(detail?.references)?detail.references.map(refFromApi).filter(Boolean):[];
 const localRefs=item.refs||[];
 const refs=[...new Set([...apiRefs,...localRefs])];
 const summary=item.summary?item.summary:(detail?`${item.name} é uma entidade registrada no catálogo bíblico Theographic. A ficha apresenta ${fmt(apiRefs.length)} passagens vinculadas e relacionamentos catalogados. A descrição original do projeto está disponível abaixo, quando fornecida.`:`Registro “${item.name}” do catálogo bíblico. A lista completa de versículos não foi obtida nesta sessão.`);
 const metadata=Array.isArray(item.metadata)?item.metadata.slice(0,10):[];if(item.featureType)metadata.push(`Tipo de local: ${item.featureType}`);if(Number.isFinite(Number(item.latitude))&&Number.isFinite(Number(item.longitude))&&item.latitude!==null&&item.longitude!==null)metadata.push(`Coordenadas: ${Number(item.latitude).toFixed(3)}, ${Number(item.longitude).toFixed(3)}`);if(detail?.featureType)metadata.push(`Categoria: ${detail.featureType}`);if(detail?.alsoCalled?.length)metadata.push(`Outros nomes: ${detail.alsoCalled.slice(0,3).join(', ')}`);if(Number.isFinite(detail?.latitude)&&Number.isFinite(detail?.longitude))metadata.push(`Coordenadas: ${Number(detail.latitude).toFixed(3)}, ${Number(detail.longitude).toFixed(3)}`);if(detail?.birthPlace?.name)metadata.push(`Nascimento: ${detail.birthPlace.name}`);if(item.numberOfReferences)metadata.push(`${fmt(item.numberOfReferences)} referências no catálogo`);
 const english=item.englishDescription||item.description|| (Array.isArray(detail?.description)?detail.description.filter(Boolean).slice(0,2).join(' ').slice(0,1200):'');
 const entities=[...(item.relatedEntities||[]).slice(0,8),...(detail?.events||[]).slice(0,5),...(detail?.people||[]).slice(0,5),...(detail?.participants||[]).slice(0,5),...(detail?.locations||[]).slice(0,5)];
 profile.innerHTML=`<div class="entity-type">${escHTML(types[item.type])} · ${item.local?'RESUMO EM PORTUGUÊS':'REGISTRO DA FONTE ABERTA'}</div><h3>${escHTML(item.name)}</h3><p class="entity-summary">${escHTML(summary)}</p>${metadata.length?`<div class="entity-props">${metadata.map(x=>`<span>${escHTML(x)}</span>`).join('')}</div>`:''}${english?`<div class="profile-label">DESCRIÇÃO DA FONTE · INGLÊS</div><p class="entity-summary">${escHTML(english)}</p>`:''}${entities.length?`<div class="profile-label">PESSOAS, LOCAIS OU EVENTOS RELACIONADOS</div><div class="entity-props">${entities.map(x=>`<span>${escHTML(x.name||'Registro associado')}</span>`).join('')}</div>`:''}<div class="profile-label">PASSAGENS RELACIONADAS · ${fmt(refs.length)}${!detail?' (SELEÇÃO INICIAL)':''}</div>${refs.length?`<div class="entity-verses">${refs.slice(0,maxRefs).map(r=>`<button data-entity-verse="${escHTML(r)}" title="Ler ${escHTML(refText(r))}">${escHTML(refText(r))}</button>`).join('')}</div>`:'<p class="entity-summary">Nenhuma referência disponível nesta sessão. Tente carregar o catálogo completo.</p>'}${refs.length>maxRefs?`<button class="entity-more" data-entity-more="${maxRefs+100}">Mostrar mais 100 de ${fmt(refs.length)} referências</button>`:''}<div class="entity-action-row">${refs.length?`<button data-entity-show-map="${escHTML(refs[0])}">◎ Ver primeira referência no mapa</button><button data-entity-open-chain="${escHTML(refs[0])}">⌘ Explorar em cadeia</button>`:''}</div><div class="source-note">${escHTML(item.refScope|| (item.local?'Passagens selecionadas, sem pretensão de exaustividade.':'Referências da fonte original.'))} · ${item.local?'Ficha salva no programa.':'Registro Theographic com dados de origem em inglês.'} Relações e menções não constituem uma classificação teológica automática.</div>${item.local?'<button class="entity-edit-link" data-entity-edit="1">✎ Editar esta ficha</button>':''}`;
}
async function loadCatalog(){if(window.ATLAS_SITE_DATA_ONLY){toast('O catálogo completo já está hospedado neste Atlas.');return;}const type=extension.entityMode;if(extension.catalog[type]){toast('O catálogo desta categoria já está carregado.');return;}const label=$('btnLoadEntities');label.disabled=true;label.textContent='Consultando registros...';$('entityDataStatus').textContent='Carregando catálogo...';try{
 const ac=new AbortController();const t=setTimeout(()=>ac.abort(),25000);let resp;try{resp=await fetch(`${API}/api/d/theographic/${type}.json`,{signal:ac.signal});}finally{clearTimeout(t);}if(!resp.ok)throw Error(`HTTP ${resp.status}`);const data=await resp.json();const raw=Array.isArray(data[type])?data[type]:[];if(!raw.length)throw Error('Catálogo vazio.');extension.catalog[type]=raw.map(e=>externalItem(e,type));$('entityDataStatus').textContent=`${fmt(raw.length)} registros · ${types[type]}`;toast(`${fmt(raw.length)} registros de ${types[type].toLowerCase()}s carregados.`);renderEntityMatches($('entityQuery').value);
 }catch(_e){updateLocalCounts();toast('O catálogo externo não respondeu. As fichas locais continuam disponíveis.');}finally{label.disabled=false;label.textContent='Consultar catálogo on-line';}}


// Banco offline: registro editorial incorporado ao HTML/JS; mudanças manuais permanecem no navegador
// e podem ser exportadas como arquivo JSON. Nunca é necessário consultar API para as fichas embutidas.
const LOCAL_EDITS_KEY='atlasBiblico.v3.fichasEditadas';
let entityEditOriginal=null;
function entityTotals(){return Object.fromEntries(Object.keys(types).map(t=>[t,(curated[t]||[]).length]));}
function updateLocalCounts(){const c=entityTotals();$('entityDataStatus').textContent=`BANCO INTERNO · ${fmt(c.people+c.places+c.events)} FICHAS`;
 const info=$('localDbCounts');if(info)info.textContent=`${fmt(c.people)} personagens · ${fmt(c.places)} lugares · ${fmt(c.events)} acontecimentos`;}
function normalizeRecord(row,type){
 if(!row||typeof row!=='object'||typeof row.name!=='string'||!row.name.trim())return null;
 const refs=Array.isArray(row.refs)?row.refs.filter(v=>typeof v==='string'&&parseRef(v)).map(v=>v.trim()).slice(0,3000):[];
 return {name:row.name.trim().slice(0,180),en:String(row.en||row.name).slice(0,180),aliases:Array.isArray(row.aliases)?row.aliases.filter(v=>typeof v==='string').slice(0,20):[],summary:String(row.summary||'Não há resumo descritivo disponível nesta ficha.').slice(0,5000),refs:[...new Set(refs)],source:String(row.source||'acervo local').slice(0,120),refScope:String(row.refScope||'Passagens catalogadas na base local').slice(0,200),featureType:String(row.featureType||'').slice(0,90),latitude:row.latitude??null,longitude:row.longitude??null,englishDescription:String(row.englishDescription||'').slice(0,2000),metadata:Array.isArray(row.metadata)?row.metadata.filter(v=>typeof v==='string').slice(0,15):[],relatedEntities:Array.isArray(row.relatedEntities)?row.relatedEntities.filter(v=>v&&typeof v.name==='string').slice(0,15):[]};
}
function mergeLocalRecords(payload){let total=0;
 for(const type of Object.keys(types)){
  const list=payload?.[type];if(!Array.isArray(list))continue;
  for(const raw of list.slice(0,10000)){
   const row=normalizeRecord(raw,type);if(!row)continue;
   const key=norm(raw.originalName||row.name);const old=curated[type].findIndex(v=>norm(v.name)===key||norm(v.name)===norm(row.name));
   if(old<0)curated[type].push(row);else curated[type][old]={...curated[type][old],...row};
   total++;
  }
 }
 return total;
}
function applySavedRecords(){try{const saved=JSON.parse(localStorage.getItem(LOCAL_EDITS_KEY)||'null');if(saved&&typeof saved==='object')mergeLocalRecords(saved);}catch(_e){/* navegador sem armazenamento persistente */}}
function persistSavedRecords(){
 // O banco principal continua gravado no próprio arquivo; mudanças manuais também podem ser exportadas.
 try{localStorage.setItem(LOCAL_EDITS_KEY,JSON.stringify({people:curated.people,places:curated.places,events:curated.events}));return true;}
 catch(_e){toast('Seu navegador não permitiu salvar todos os registros. Use “Exportar JSON” para manter uma cópia.');return false;}
}
function exportLocalDatabase(){const data={schema:'atlas-entities-v1',exportedAt:new Date().toISOString(),data:curated,meta:{source:'Atlas Bíblia, seleção editorial e alterações do usuário',counts:entityTotals()}};
 const file=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download='atlas_biblico_enciclopedia_local.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Arquivo JSON preparado com todas as fichas locais.');}
async function importLocalDatabase(file){if(!file)return;try{if(file.size>40*1024*1024)throw Error('O JSON excede 40 MB.');const json=JSON.parse(await file.text());if(json.schema&&json.schema!=='atlas-entities-v1')throw Error('Formato do banco não reconhecido.');const data=json.data||json;const count=mergeLocalRecords(data);if(!count)throw Error('Nenhum registro válido encontrado.');const saved=persistSavedRecords();updateLocalCounts();renderEntityMatches($('entityQuery').value);toast(`${fmt(count)} fichas importadas. ${saved?'Salvas no navegador.':'Exporte a base para preservar o arquivo.'}`);}catch(e){toast(`Falha na importação: ${e.message||'JSON inválido'}`);}}
function openEntityEditor(item=null){const type=item?.type||extension.entityMode;entityEditOriginal=item?.name||null;$('entityEditorTitle').textContent=item?'Editar ficha bíblica':'Nova ficha bíblica';$('entityEditType').value=type;$('entityEditType').disabled=!!item;$('entityEditName').value=item?.name||'';$('entityEditSummary').value=item?.summary||'';$('entityEditAliases').value=(item?.aliases||[]).join(', ');$('entityEditRefs').value=(item?.refs||[]).join('\n');$('entityEditorLayer').classList.add('open');$('entityEditorLayer').setAttribute('aria-hidden','false');$('entityEditName').focus();}
function closeEntityEditor(){$('entityEditorLayer').classList.remove('open');$('entityEditorLayer').setAttribute('aria-hidden','true');}
function saveEntityEditor(e){e.preventDefault();const type=$('entityEditType').value,name=$('entityEditName').value.trim(),summary=$('entityEditSummary').value.trim();if(!types[type]||!name||!summary){toast('Informe um nome e um resumo.');return;}
 const raw=$('entityEditRefs').value.split(/[,;\n]+/).map(s=>s.trim()).filter(Boolean),parsed=[];for(const ref of raw){const osis=parseRef(ref)||parseUserSearch(ref);if(osis)parsed.push(typeof osis==='string'?osis:osis.key);}
 if(raw.length&&!parsed.length){toast('Confira as referências. Ex.: João 3:16 (uma por linha).');return;}
 const entry={name,summary,aliases:$('entityEditAliases').value.split(',').map(s=>s.trim()).filter(Boolean),refs:[...new Set(parsed)],source:'acervo pessoal',refScope:'Referências informadas pelo usuário'};
 const arr=curated[type];let idx=entityEditOriginal?arr.findIndex(v=>norm(v.name)===norm(entityEditOriginal)):-1;
 if(idx<0)idx=arr.findIndex(v=>norm(v.name)===norm(name));if(idx>=0)arr[idx]={...arr[idx],...entry};else arr.push(entry);
 const persistent=persistSavedRecords();closeEntityEditor();updateLocalCounts();if(extension.entityMode!==type)setEntityMode(type);$('entityQuery').value=name;renderEntityMatches(name);toast(persistent?'Ficha registrada no banco local do navegador.':'Ficha na sessão; exporte para preservá-la.');
}

// Grafo de propagação: somente arestas explícitas, sem inventar ligações por palavras.
const CHAIN_BATCH=9,CHAIN_MAX_NODES=110,CHAIN_MAX_LEVEL=6;
function chainCreate(root){const key=parseRef(root)?.key;if(!key)return;return {root:key,nodes:new Map([[key,{ref:key,depth:0,parent:null,expanded:0}]]),links:new Map(),selected:key,zoom:1,tx:45,ty:0,positions:new Map()};}
function relatedRefs(ref){
 const arr=getRelated(ref).map(x=>({ref:x.key,full:x.full,votes:x.votes}));
 // A prévia destaca um caminho verificável (João 3:16 → 1 João 4:19 → Romanos 8:28).
 // As relações são provenientes das amostras já registradas, nunca criadas aqui.
 if(!state.isFull&&ref==='John.3.16'){
  const preferred=['1John.4.19','Rom.5.8','1John.4.9','John.1.14'];
  arr.sort((a,b)=>{const x=preferred.indexOf(a.ref),y=preferred.indexOf(b.ref);return (x<0?100:x)-(y<0?100:y);});
 }
 return arr;
}
function chainAdd(nodeRef){const ch=extension.chain;if(!ch)return;const p=ch.nodes.get(nodeRef);if(!p)return;ch.selected=nodeRef;
 const all=relatedRefs(nodeRef);const before=p.expanded;
 let included=0;for(let i=before;i<all.length&&included<CHAIN_BATCH;i++){
  const other=all[i].ref;if(other===nodeRef)continue;
  if(!ch.nodes.has(other)){
   if(ch.nodes.size>=CHAIN_MAX_NODES||p.depth>=CHAIN_MAX_LEVEL)break;
   ch.nodes.set(other,{ref:other,depth:p.depth+1,parent:nodeRef,expanded:0});
  }
  const linkKey=[nodeRef,other].sort().join('|');if(!ch.links.has(linkKey))ch.links.set(linkKey,{from:nodeRef,to:other});included++;
 }
 p.expanded=Math.min(all.length,before+included);
 if(all.length&&!included&&p.expanded<all.length){toast('Limite de pontos ou níveis alcançado para manter a visualização legível.');}
 if(!all.length)toast('Não foram encontradas conexões desse versículo na base ativa.');
 drawChain();
}
function chainPathOf(ref){const chain=extension.chain;if(!chain)return [];let node=chain.nodes.get(ref);const trace=[];let steps=0;while(node&&steps++<20){trace.push(node.ref);node=chain.nodes.get(node.parent);}return trace.reverse();}
function drawChain(){const ch=extension.chain;if(!ch)return;const groups=new Map(),nodes=[...ch.nodes.values()];nodes.forEach(n=>{if(!groups.has(n.depth))groups.set(n.depth,[]);groups.get(n.depth).push(n);});const maxDepth=Math.max(0,...groups.keys());const maxRows=Math.max(1,...[...groups.values()].map(x=>x.length));const h=Math.max(590,maxRows*59+105);ch.positions=new Map();
 for(const [depth,arr] of groups){for(let i=0;i<arr.length;i++){
  const y=h/2+(i-(arr.length-1)/2)*59;ch.positions.set(arr[i].ref,{x:depth*270+105,y});
 }}
 let edgesHTML='';for(const e of ch.links.values()){const a=ch.positions.get(e.from),b=ch.positions.get(e.to);if(!a||!b)continue;const color=bookColor(parseRef(e.to).code);const dx=b.x-a.x;const d=dx>=50?`M ${a.x} ${a.y} C ${a.x+Math.max(60,dx*.47)} ${a.y},${b.x-Math.max(60,dx*.47)} ${b.y},${b.x} ${b.y}`:`M ${a.x} ${a.y} C ${a.x+80} ${a.y-55},${b.x-80} ${b.y+55},${b.x} ${b.y}`;
  edgesHTML+=`<path class="chain-link" d="${d}" stroke="${color}"/><path class="chain-hit" d="${d}" data-chain-edge-a="${escHTML(e.from)}" data-chain-edge-b="${escHTML(e.to)}"/>`;
 }
 let nodesHTML='';for(const n of nodes){const p=ch.positions.get(n.ref),col=n.depth===0?'#ffc86b':bookColor(parseRef(n.ref).code),active=n.ref===ch.selected;
  const remaining=Math.max(0,relatedRefs(n.ref).length-n.expanded);
  nodesHTML+=`<g class="chain-dot ${active?'selected':''}" data-chain-node="${escHTML(n.ref)}"><circle cx="${p.x}" cy="${p.y}" r="${n.depth===0?15:10}" fill="${active?'#203d58':'#0d263b'}" stroke="${col}"/><circle cx="${p.x}" cy="${p.y}" r="${n.depth===0?5:3}" fill="${col}"/><text x="${n.depth===0?p.x-15:p.x+23}" y="${n.depth===0?p.y-24:p.y+4}">${escHTML(refText(n.ref))}</text>${remaining?`<text class="chain-mini" x="${n.depth===0?p.x-15:p.x+23}" y="${n.depth===0?p.y-9:p.y+17}">${fmt(remaining)} vínculos a revelar</text>`:''}</g>`;
 }
 $('chainScene').innerHTML=`<g transform="translate(${ch.tx},${ch.ty}) scale(${ch.zoom})">${edgesHTML}${nodesHTML}</g>`;
 $('chainRootRef').textContent=refText(ch.root);$('chainNodeCount').textContent=fmt(ch.nodes.size);$('chainEdgeCount').textContent=fmt(ch.links.size);$('chainDepth').textContent=String(maxDepth);
 $('chainInfo').textContent=`${fmt(ch.nodes.size)} pontos · ${fmt(ch.links.size)} ligações · clique nos pontos para avançar`;
 $('chainPath').innerHTML=chainPathOf(ch.selected).map((r,i)=>`<button data-chain-path="${escHTML(r)}">${i?'↳ ':''}${escHTML(refText(r))}</button>`).join('');
 const selected=ch.nodes.get(ch.selected);const total=relatedRefs(ch.selected).length;
 $('chainInspector').innerHTML=`<strong>${escHTML(refText(ch.selected))}</strong><p>${fmt(total)} ligações nesta base · ${fmt(selected.expanded)} vínculos revelados. ${total>selected.expanded?'Clique no ponto ou no botão para exibir o próximo grupo.':'Todas as conexões deste ponto já foram consideradas.'}</p><div class="chain-actions"><button data-chain-expand="${escHTML(ch.selected)}" ${selected.expanded>=total||ch.nodes.size>=CHAIN_MAX_NODES?'disabled':''}>⊕ Mostrar até ${CHAIN_BATCH} conexões</button><button data-chain-read="${escHTML(ch.selected)}">Ler</button><button data-chain-map="${escHTML(ch.selected)}">Ver no mapa</button></div>`;
}
function openChain(root=state.ref){const key=parseRef(root)?.key;if(!key)return;extension.chain=chainCreate(key);$('chainLayer').classList.add('open');$('chainLayer').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';chainAdd(key);}
function closeChain(){$('chainLayer').classList.remove('open');$('chainLayer').setAttribute('aria-hidden','true');document.body.style.overflow='';}
function selectChainPoint(ref){const ch=extension.chain;if(!ch||!ch.nodes.has(ref))return;ch.selected=ref;const node=ch.nodes.get(ref);if(node.depth>=2){ch.tx=Math.min(ch.tx,460-node.depth*270*ch.zoom);}chainAdd(ref);}
function chainZoom(factor,ox=600,oy=320){const ch=extension.chain;if(!ch)return;const old=ch.zoom,now=Math.max(.24,Math.min(2.7,old*factor));ch.tx=ox-(ox-ch.tx)*now/old;ch.ty=oy-(oy-ch.ty)*now/old;ch.zoom=now;drawChain();}
function chainFit(){const ch=extension.chain;if(!ch)return;const depths=Math.max(0,...[...ch.nodes.values()].map(x=>x.depth));const cols=new Map();for(const n of ch.nodes.values())cols.set(n.depth,(cols.get(n.depth)||0)+1);const rows=Math.max(1,...cols.values());const w=Math.max(700,depths*270+350),h=Math.max(590,rows*59+105);ch.zoom=Math.max(.24,Math.min(1.18,Math.min(1140/w,610/h)));ch.tx=45;ch.ty=(670-h*ch.zoom)/2;drawChain();}
function attachChainPan(){let drag=null;const area=$('chainViewport'),canvas=$('chainSvg');
 canvas.addEventListener('wheel',e=>{if(!$('chainLayer').classList.contains('open'))return;e.preventDefault();const box=canvas.getBoundingClientRect();const x=(e.clientX-box.left)/box.width*1200,y=(e.clientY-box.top)/box.height*670;chainZoom(e.deltaY<0?1.12:1/1.12,x,y);},{passive:false});
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('[data-chain-node],[data-chain-edge-a]'))return;drag={x:e.clientX,y:e.clientY};area.classList.add('dragging');canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drag||!extension.chain)return;const box=canvas.getBoundingClientRect();extension.chain.tx+=(e.clientX-drag.x)/box.width*1200;extension.chain.ty+=(e.clientY-drag.y)/box.height*670;drag={x:e.clientX,y:e.clientY};drawChain();});
 function done(){drag=null;area.classList.remove('dragging');}canvas.addEventListener('pointerup',done);canvas.addEventListener('pointercancel',done);
}
function wireExtensions(){
 const atlasBtn=$('btnFocusArcs');atlasBtn.title='Alterna entre todas as linhas da Bíblia e somente as linhas do versículo em foco.';
 $('btnExploreChain').addEventListener('click',()=>openChain(state.ref));$('btnChainFromNetwork').addEventListener('click',()=>openChain(state.ref));$('navChain').addEventListener('click',()=>{openChain(state.ref);$('sidebar').classList.remove('open');});
 $('btnWordSearch').addEventListener('click',handleWordSearch);$('btnSearchArcs').addEventListener('click',showSearchArcs);$('wordSearchInput').addEventListener('keydown',e=>{if(e.key==='Enter')handleWordSearch();});$('wordOnlyConnected').addEventListener('change',handleWordSearch);$('btnLoadBible').addEventListener('click',loadBibleForSearch);$('wordMore').addEventListener('click',()=>{extension.wordShow+=60;renderWordResults();});
 $('wordResults').addEventListener('click',e=>{const w=e.target.closest('[data-word-example]');if(w){$('wordSearchInput').value=w.dataset.wordExample;handleWordSearch();return;}const b=e.target.closest('[data-word-map],[data-word-chain],[data-word-read]');if(!b)return;const ref=b.dataset.wordMap||b.dataset.wordChain||b.dataset.wordRead;if(b.dataset.wordMap)reveal(ref);else if(b.dataset.wordChain)openChain(ref);else openPassages([ref]);});
 document.querySelectorAll('[data-entity-mode]').forEach(btn=>btn.addEventListener('click',()=>setEntityMode(btn.dataset.entityMode)));
 $('entityNew').addEventListener('click',()=>openEntityEditor());$('entityExport').addEventListener('click',exportLocalDatabase);$('entityImport').addEventListener('change',async e=>{await importLocalDatabase(e.target.files?.[0]);e.target.value='';});$('entityEditorForm').addEventListener('submit',saveEntityEditor);$('entityEditorClose').addEventListener('click',closeEntityEditor);$('entityEditorCancel').addEventListener('click',closeEntityEditor);$('entityEditorLayer').addEventListener('click',e=>{if(e.target===$('entityEditorLayer'))closeEntityEditor();});
 $('btnEntitySearch').addEventListener('click',()=>renderEntityMatches($('entityQuery').value));$('entityQuery').addEventListener('keydown',e=>{if(e.key==='Enter')renderEntityMatches(e.target.value);});$('btnLoadEntities').addEventListener('click',loadCatalog);
 $('entityExamples').addEventListener('click',e=>{const b=e.target.closest('[data-entity-example]');if(b){$('entityQuery').value=b.dataset.entityExample;renderEntityMatches(b.dataset.entityExample);}});
 $('entityResults').addEventListener('click',e=>{const b=e.target.closest('[data-entity-index]');if(b)showEntity(extension.entityItems[Number(b.dataset.entityIndex)],Number(b.dataset.entityIndex));});
 $('entityProfile').addEventListener('click',e=>{const more=e.target.closest('[data-entity-more]');if(more){showEntity(extension.entityActive,extension.entityItems.indexOf(extension.entityActive),Number(more.dataset.entityMore));return;}const edit=e.target.closest('[data-entity-edit]');if(edit){openEntityEditor(extension.entityActive);return;}const b=e.target.closest('[data-entity-verse],[data-entity-show-map],[data-entity-open-chain]');if(!b)return;const ref=b.dataset.entityVerse||b.dataset.entityShowMap||b.dataset.entityOpenChain;if(b.dataset.entityVerse)openPassages([ref]);else if(b.dataset.entityShowMap)reveal(ref);else openChain(ref);});
 $('chainClose').addEventListener('click',closeChain);$('chainReset').addEventListener('click',()=>openChain(extension.chain?.root||state.ref));$('chainZoomOut').addEventListener('click',()=>chainZoom(.8));$('chainZoomIn').addEventListener('click',()=>chainZoom(1.25));$('chainZoomReset').addEventListener('click',chainFit);
 $('chainSvg').addEventListener('click',e=>{const edge=e.target.closest('[data-chain-edge-a]');if(edge){openPassages([edge.dataset.chainEdgeA,edge.dataset.chainEdgeB]);return;}const b=e.target.closest('[data-chain-node]');if(b)selectChainPoint(b.dataset.chainNode);});
 $('chainInspector').addEventListener('click',e=>{const b=e.target.closest('[data-chain-expand],[data-chain-read],[data-chain-map]');if(!b)return;const ref=b.dataset.chainExpand||b.dataset.chainRead||b.dataset.chainMap;if(b.dataset.chainExpand)selectChainPoint(ref);else if(b.dataset.chainRead)openPassages([ref]);else{closeChain();reveal(ref);}});
 $('chainPath').addEventListener('click',e=>{const b=e.target.closest('[data-chain-path]');if(b){extension.chain.selected=b.dataset.chainPath;drawChain();}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('chainLayer').classList.contains('open')&&!$('modalLayer').classList.contains('open'))closeChain();});
 attachChainPan();
}
function init(){applySavedRecords();wireExtensions();updateLocalCounts();setEntityMode('people');if(window.ATLAS_OFFLINE_BIBLE||window.ATLAS_AUTO_LOAD_BIBLE){loadBibleForSearch();} }
document.addEventListener('DOMContentLoaded',init);
})();
