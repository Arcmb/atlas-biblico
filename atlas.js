'use strict';
/* Atlas Histórico Bíblico • JavaScript sem dependências e sem chamadas externas.
   Os pontos seguem coordenadas editoriais e nunca são prova de uma rota exata. */
(() => {
  const source=window.ATLAS_HISTORICO;
  const coast=window.ATLAS_COAST;
  if(!source||!Array.isArray(coast)){
    document.body.textContent='Não foi possível carregar o banco local de geografia. Verifique a pasta dados/.';
    return;
  }
  const NS='http://www.w3.org/2000/svg';
  const $=id=>document.getElementById(id);
  const byId=new Map(source.places.map(p=>[p.id,p]));
  const routes=source.journeys;
  const encyclopedia=window.ATLAS_OFFLINE_ENTITIES?.data||{people:[],places:[],events:[]};
  const names='Gênesis|Êxodo|Levítico|Números|Deuteronômio|Josué|Juízes|Rute|1 Samuel|2 Samuel|1 Reis|2 Reis|1 Crônicas|2 Crônicas|Esdras|Neemias|Ester|Jó|Salmos|Provérbios|Eclesiastes|Cânticos|Isaías|Jeremias|Lamentações|Ezequiel|Daniel|Oseias|Joel|Amós|Obadias|Jonas|Miqueias|Naum|Habacuque|Sofonias|Ageu|Zacarias|Malaquias|Mateus|Marcos|Lucas|João|Atos|Romanos|1 Coríntios|2 Coríntios|Gálatas|Efésios|Filipenses|Colossenses|1 Tessalonicenses|2 Tessalonicenses|1 Timóteo|2 Timóteo|Tito|Filemom|Hebreus|Tiago|1 Pedro|2 Pedro|1 João|2 João|3 João|Judas|Apocalipse'.split('|');
  const codes='Gen Exod Lev Num Deut Josh Judg Ruth 1Sam 2Sam 1Kgs 2Kgs 1Chr 2Chr Ezra Neh Esth Job Ps Prov Eccl Song Isa Jer Lam Ezek Dan Hos Joel Amos Obad Jonah Mic Nah Hab Zeph Hag Zech Mal Matt Mark Luke John Acts Rom 1Cor 2Cor Gal Eph Phil Col 1Thess 2Thess 1Tim 2Tim Titus Phlm Heb Jas 1Pet 2Pet 1John 2John 3John Jude Rev'.split(' ');
  const bookMap=new Map(codes.map((code,index)=>[code,names[index]]));
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const refText=(ref)=>{const match=String(ref).match(/^([1-3]?[A-Za-z]+)\.(\d+)\.(\d+)(.*)$/);if(!match)return ref;const suffix=match[4]&&match[4].startsWith('-')?match[4]:'';return `${bookMap.get(match[1])||match[1]} ${match[2]}:${match[3]}${suffix}`;};
  const refKey=ref=>String(ref||'').match(/^([1-3]?[A-Za-z]+\.\d+\.\d+)/)?.[1]||'John.3.16';
  const xmlTag=(tag,attributes={},parent)=>{const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attributes))e.setAttribute(k,String(v));if(parent)parent.appendChild(e);return e;};
  const textNode=(parent,x,y,value,cssClass,attrs={})=>{const t=xmlTag('text',{x,y,class:cssClass,...attrs},parent);t.textContent=value;return t;};
  const totalStops=routes.reduce((n,r)=>n+r.steps.length,0);
  $('totalPlaces').textContent=source.places.length;
  $('totalRoutes').textContent=routes.length;
  $('totalStops').textContent=totalStops;
  const state={route:null,category:'personagens',value:0,paused:true,frame:null,lastFrame:0,zoom:1,view:{lon:35,lat:34,lonSpan:19,latSpan:10.4},lastStepIndex:-1,customBio:null,manualPoints:null,isDragging:false,suppressClick:false};
  const W=1280,H=700,R=W/H;
  const routeSteps=()=>state.route?.steps||[];
  const locs=()=>routeSteps().map(s=>byId.get(s.place)).filter(Boolean);
  function viewFit(places){
    if(!places.length){state.view={lon:35,lat:34,lonSpan:48,latSpan:48/R};return;}
    const xs=places.map(p=>p.lon),ys=places.map(p=>p.lat);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    let lonSpan=Math.max(8.4,(maxX-minX)*1.30+3.2),latSpan=Math.max(4.7,(maxY-minY)*1.35+2.1);
    if(lonSpan/latSpan<R)lonSpan=latSpan*R;else latSpan=lonSpan/R;
    state.view={lon:(minX+maxX)/2,lat:(minY+maxY)/2,lonSpan:Math.min(60,lonSpan),latSpan:Math.min(34,latSpan)};
  }
  function xy(lat,lon){const v=state.view;return {x:W/2+(lon-v.lon)/v.lonSpan*W,y:H/2-(lat-v.lat)/v.latSpan*H};}
  function coords(p){return xy(p.lat,p.lon);}
  function pAt(index){const step=routeSteps()[Math.max(0,Math.min(index,routeSteps().length-1))];return step&&byId.get(step.place);}
  function viewBounds(){const v=state.view;return [v.lon-v.lonSpan*.5,v.lat-v.latSpan*.5,v.lon+v.lonSpan*.5,v.lat+v.latSpan*.5];}
  function drawBackground(){
    const parent=$('mapGraphics');parent.replaceChildren();
    const [minX,minY,maxX,maxY]=viewBounds();
    const lonStep=state.view.lonSpan>23?10:state.view.lonSpan>10?5:2;
    const latStep=state.view.latSpan>15?5:state.view.latSpan>7?2:1;
    for(let lon=Math.floor(minX/lonStep)*lonStep;lon<=maxX;lon+=lonStep){const pt=xy(0,lon);xmlTag('path',{d:`M ${pt.x.toFixed(1)} 0 L ${pt.x.toFixed(1)} 700`,class:'geo-grid'},parent);}
    for(let lat=Math.floor(minY/latStep)*latStep;lat<=maxY;lat+=latStep){const pt=xy(lat,0);xmlTag('path',{d:`M 0 ${pt.y.toFixed(1)} L 1280 ${pt.y.toFixed(1)}`,class:'geo-grid'},parent);}
    for(const polygon of coast){const d=polygon.map(([lon,lat],i)=>{const p=xy(lat,lon);return `${i?'L':'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;}).join(' ')+' Z';xmlTag('path',{d,class:'land'},parent);}
    const labels=[
      ['MAR MEDITERRÂNEO',34.2,24.6,'sea-label'],['MAR NEGRO',43,35,'sea-label'],['MAR VERMELHO',24.85,36.1,'sea-label'],
      ['ÁFRICA',26,25,'region-label'],['ANATÓLIA',39.0,34.2,'region-label'],['MESOPOTÂMIA',33.8,44,'region-label'],
      ['CHIPRE',35.45,33.2,'region-label'],['GALILEIA',32.93,35.62,'region-label'],['EGITO',29.8,30.2,'region-label']
    ];
    labels.forEach(([label,lat,lon,css])=>{const p=xy(lat,lon);if(p.x>-220&&p.x<1500&&p.y>-80&&p.y<740)textNode(parent,p.x,p.y,label,css);});
  }
  function nodeFigure(kind,x,y,parent,scale=1){
    const g=xmlTag('g',{transform:`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${scale})`,class:'map-traveler'},parent);
    xmlTag('circle',{r:26,class:'traveler-ring'},g);
    xmlTag('circle',{r:22,fill:'#203c5f','fill-opacity':.86},g);
    const sym=kind==='female'?'#personFemale':kind==='group'?'#peopleGroup':'#personMale';
    const dimensions=kind==='group'?[-20,-15,40,36]:[-12,-16,24,38];
    xmlTag('use',{href:sym,x:dimensions[0],y:dimensions[1],width:dimensions[2],height:dimensions[3],class:'traveler-figure'},g);
    return g;
  }
  function drawRoutes(){
    const a=$('mapSymbols');a.replaceChildren();
    const steps=routeSteps();
    if(!steps.length)return;
    if(state.route?.kind!=='event'){
      for(let i=1;i<steps.length;i++){
        const from=pAt(i-1),to=pAt(i);if(!from||!to)continue;
        const f=coords(from),t=coords(to);
        xmlTag('path',{d:`M ${f.x.toFixed(1)} ${f.y.toFixed(1)} L ${t.x.toFixed(1)} ${t.y.toFixed(1)}`,class:'map-edge'},a);
      }
    }
    const unique=new Map();steps.forEach((step,index)=>{if(!unique.has(step.place))unique.set(step.place,[]);unique.get(step.place).push(index);});
    const usedBoxes=[];
    for(const [placeId,indices] of unique){
      const place=byId.get(placeId);if(!place)continue;
      const p=coords(place),active=indices.includes(Math.floor(state.value));
      if(p.x<-40||p.x>1320||p.y<-40||p.y>740)continue;
      const g=xmlTag('g',{class:'map-geo-dot','data-place':placeId,role:'button',tabindex:'0','aria-label':`Abrir local: ${place.name}`},a);
      const center=xmlTag('circle',{cx:p.x,cy:p.y,r:active?9:7,fill:active?'#ffd985':'#5bdbdb',stroke:active?'#ffffff':'#b7e9ee','stroke-width':1.6},g);
      center.setAttribute('filter',active?'url(#halo)':'');
      if(indices.length>1)xmlTag('circle',{cx:p.x+9,cy:p.y-7,r:3.5,fill:'#ffd985',stroke:'#0d2439','stroke-width':1.2},g);
      xmlTag('circle',{cx:p.x,cy:p.y,r:19,fill:'transparent',stroke:'none'},g);
      xmlTag('title',{},g).textContent=place.name+' — clique para consultar';
      g.addEventListener('click',e=>{if(state.suppressClick)return;e.stopPropagation();const preferred=indices.find(i=>i>Math.floor(state.value))??indices[0];setStep(preferred);openPlace(placeId);});
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setStep(indices[0]);openPlace(placeId);}});
      if(active||usedBoxes.length<13){
        let lx=p.x+11,ly=p.y-13;
        if(lx>1130)lx=p.x-11;
        const width=Math.min(180,place.name.length*7.2);
        for(let i=0;i<7;i++){
          const hit=usedBoxes.some(b=>!(lx+width<b[0]||lx>b[2]||ly+8<b[1]||ly-12>b[3]));
          if(!hit)break;ly+=17;
        }
        if(!usedBoxes.some(b=>!(lx+width<b[0]||lx>b[2]||ly+8<b[1]||ly-12>b[3])) || active){
          usedBoxes.push([lx,ly-12,lx+width,ly+8]);
          textNode(a,lx,ly,place.name.replace(' (marcador regional)','').replace(' (localização discutida)',''), 'city-label',lx<p.x?{'text-anchor':'end'}:{});
        }
      }
    }
  }
  function drawMap(){drawBackground();drawRoutes();updateTraveler();}
  function pointOnLeg(value){
    const steps=routeSteps();if(!steps.length)return null;
    const a=Math.max(0,Math.min(steps.length-1,value)),i=Math.floor(a),frac=a-i;
    const p=pAt(i),q=pAt(Math.min(i+1,steps.length-1));if(!p||!q)return null;
    if(state.route?.kind==='event')return coords(p);
    const s=coords(p),e=coords(q);
    return {x:s.x+(e.x-s.x)*frac,y:s.y+(e.y-s.y)*frac};
  }
  function updateTraveler(){
    const container=$('mapActive');container.replaceChildren();
    const value=state.value;
    const pt=pointOnLeg(value);if(!pt)return;
    const step=routeSteps()[Math.floor(value)];
    const kind=step?.icon||state.route.kind;
    const last=pAt(Math.floor(value)),next=pAt(Math.ceil(value));
    if(state.route.kind!=='event'&&last&&next&&Math.floor(value)!==Math.ceil(value)){
      const s=coords(last);xmlTag('path',{d:`M ${s.x.toFixed(1)} ${s.y.toFixed(1)} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`,class:'map-active-edge'},container);
    }
    nodeFigure(kind,pt.x,pt.y,container,1.07);
  }
  function updateControls(){
    const steps=routeSteps();const n=steps.length;
    const floor=Math.floor(state.value);
    $('storySlider').max=Math.max(1,(n-1)*100);
    $('storySlider').value=Math.round(state.value*100);
    $('playStatus').textContent=`Etapa ${floor+1} de ${n}`;
    $('playPosition').textContent=`${String(floor+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;
    $('playGlyph').textContent=state.paused?'▶':'Ⅱ';
    $('playBtn').setAttribute('aria-label',state.paused?'Iniciar animação':'Pausar animação');
    $('prevBtn').disabled=floor===0;
    $('nextBtn').disabled=floor>=n-1;
  }
  function bindRefs(parent,refs){parent.replaceChildren();for(const ref of [...new Set(refs||[])]){
    const a=document.createElement('a');a.href='./index.html#'+encodeURIComponent(refKey(ref));a.title='Abrir referência no atlas de conexões';a.textContent=refText(ref)+' ↗';parent.appendChild(a);
  }}
  function renderStage(){
    const steps=routeSteps();if(!steps.length)return;
    const i=Math.floor(state.value),step=steps[i],p=byId.get(step.place);
    if(state.lastStepIndex===i){updateControls();return;}
    state.lastStepIndex=i;
    $('stepBadge').textContent=String(i+1).padStart(2,'0');
    $('stepPeriod').textContent=step.period||'Período não estabelecido';
    $('stepTitle').textContent=step.title;
    $('stepPlace').textContent=p?.name||'Local não determinado';
    $('stepSummary').textContent=step.summary;
    $('placeSummary').textContent=p?.summary||'Sem ficha geográfica específica para esta etapa.';
    $('placeCertainty').textContent=p?.certainty||'Sem dados de localização';
    $('journeyCaution').textContent=state.route.qualification||'Rota ilustrativa: não representa caminhos ou estradas geograficamente comprovados.';
    bindRefs($('stepRefs'),[step.ref]);
    $('readStep').onclick=()=>{location.href='./index.html#'+encodeURIComponent(refKey(step.ref));};
    document.querySelectorAll('.timeline-step').forEach((node,j)=>{
      node.classList.toggle('current',j===i);
      node.setAttribute('aria-current',j===i?'step':'false');
    });
    updateControls();
  }
  function renderTimeline(){
    const root=$('timelineTrack');root.replaceChildren();
    const steps=routeSteps();$('timelineCount').textContent=`${steps.length} ETAPAS`;
    steps.forEach((step,i)=>{
      const place=byId.get(step.place);
      const b=document.createElement('button');b.type='button';b.className='timeline-step';b.dataset.step=i;
      const no=document.createElement('span');no.className='timeline-no';no.textContent=`ETAPA ${String(i+1).padStart(2,'0')}`;
      const title=document.createElement('b');title.textContent=step.title;
      const sub=document.createElement('small');sub.textContent=(place?.name||'Local não identificado')+' · '+(step.period||'data incerta');
      b.append(no,title,sub);b.addEventListener('click',()=>{setStep(i);b.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});});root.appendChild(b);
    });
  }
  function fillRouteSelect(){
    const options=routes.filter(r=>r.category===state.category);const select=$('journeySelect');select.replaceChildren();
    options.forEach(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=r.name;select.appendChild(o);});
    select.value=options[0]?.id||'';
  }
  function paintCategory(){document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b.dataset.category===state.category));}
  function setRoute(id){
    const route=routes.find(r=>r.id===id);if(!route)return;
    state.route=route;state.customBio=null;state.value=0;state.lastStepIndex=-1;
    stopAnimation();
    state.category=route.category;
    paintCategory();fillRouteSelect();$('journeySelect').value=id;
    $('journeyTitle').textContent=route.name;
    $('journeySubtitle').textContent=route.subtitle;
    $('journeyIntro').textContent=route.description;
    $('mapHeader').textContent=route.category==='historia'?'Marcos no mundo bíblico':'Roteiro: '+route.name;
    const person=encyclopedia.people.find(p=>normalize(p.name)===normalize(route.person||''));
    if(person)showBio(person.name,person.summary,person.refs,false);
    else showBio(route.name,route.description,[],false);
    viewFit(locs());renderTimeline();drawMap();renderStage();
  }
  function stopAnimation(){state.paused=true;state.lastFrame=0;if(state.frame){cancelAnimationFrame(state.frame);state.frame=null;}updateControls();}
  function startAnimation(){
    if(!state.route||routeSteps().length<2)return;
    if(state.value>=routeSteps().length-1)state.value=0;
    state.paused=false;state.lastFrame=0;updateControls();
    const loop=timestamp=>{
      if(state.paused)return;
      if(state.lastFrame){const delta=Math.min(80,timestamp-state.lastFrame);const speed=Number($('speedSelect').value)||1;
        state.value=Math.min(routeSteps().length-1,state.value+delta/1450*speed);
        if(Math.floor(state.value)!==state.lastStepIndex){renderStage();drawRoutes();}
        updateTraveler();updateControls();
        if(state.value>=routeSteps().length-1){stopAnimation();return;}
      }
      state.lastFrame=timestamp;state.frame=requestAnimationFrame(loop);
    };
    state.frame=requestAnimationFrame(loop);
  }
  function setStep(index){
    stopAnimation();state.value=Math.max(0,Math.min(routeSteps().length-1,Number(index)||0));
    state.lastStepIndex=-1;drawRoutes();updateTraveler();renderStage();
  }
  function applyZoom(factor){
    state.view.lonSpan=Math.max(3.4,Math.min(66,state.view.lonSpan*factor));
    state.view.latSpan=state.view.lonSpan/R;
    drawMap();
  }
  function openPlace(id){
    const place=byId.get(id);if(!place)return;
    $('modalTitle').textContent=place.name;
    $('modalDesc').textContent=place.summary;
    $('modalExtra').textContent='Referência geográfica: '+place.certainty+(place.modern?' · Local atual: '+place.modern:'');
    bindRefs($('modalRefs'),place.refs);
    $('placeModal').classList.add('open');$('placeModal').setAttribute('aria-hidden','false');$('closeModal').focus();
  }
  function closePlace(){ $('placeModal').classList.remove('open');$('placeModal').setAttribute('aria-hidden','true'); }
  function showBio(name,summary,refs,scroll){
    $('bioTitle').textContent=name;
    $('bioSummary').textContent=summary;
    bindRefs($('bioRefs'),refs);
    if(scroll)$('biosPanel').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function selectPerson(person){
    const key=Object.keys(source.personPlaces).find(n=>normalize(n)===normalize(person.name))||null;
    const route=routes.find(r=>r.person&&normalize(r.person)===normalize(person.name));
    if(route){setRoute(route.id);showBio(person.name,person.summary,person.refs,true);return;}
    const mapped=(source.personPlaces[key]||[]).map(p=>byId.get(p)).filter(Boolean);
    showBio(person.name,person.summary,person.refs,true);
    if(!mapped.length){alert('Ficha aberta. Ainda não há locais georreferenciados para este personagem. Não serão inventadas posições no mapa.');return;}
    const fake={id:'bio-'+person.name,name:person.name,category:'personagens',kind:'event',description:'Lugares associados ao personagem. A ordem dos pontos não constitui um itinerário.',subtitle:'Localidades relacionadas na seleção editorial',person:person.name,qualification:'Estes são pontos associados ao personagem, não uma viagem cronológica reconstruída.',steps:mapped.map(p=>({place:p.id,title:p.name,period:'Associação geográfica',ref:p.refs[0],summary:p.summary,icon:'male'}))};
    state.route=fake;state.value=0;state.lastStepIndex=-1;stopAnimation();
    $('journeyTitle').textContent='Lugares de '+person.name;
    $('journeySubtitle').textContent='Associações geográficas documentadas';
    $('journeyIntro').textContent=fake.description;viewFit(mapped);renderTimeline();drawMap();renderStage();
  }
  function selectGeoPlace(place){
    const fake={id:'place-'+place.id,name:place.name,category:'localidades',kind:'event',description:place.summary,subtitle:'Geografia e referências bíblicas',qualification:place.certainty,steps:[{place:place.id,title:place.name,summary:place.summary,ref:place.refs[0],period:place.modern||'Local histórico',icon:'group'}]};
    state.route=fake;state.value=0;state.lastStepIndex=-1;stopAnimation();
    $('journeyTitle').textContent=place.name;
    $('journeySubtitle').textContent='Mapa geográfico da localidade';
    $('journeyIntro').textContent=place.summary;
    viewFit([place]);renderTimeline();drawMap();renderStage();openPlace(place.id);showBio(place.name,place.summary,place.refs,false);
  }
  function lookupEntity(query){
    const norm=normalize(query);if(!norm)return [];
    const map=[];
    for(const p of source.places){if(normalize(p.name+' '+p.summary+' '+p.modern).includes(norm))map.push({name:p.name,type:'Local',priority:normalize(p.name)===norm?-30:normalize(p.name).startsWith(norm)?-20:normalize(p.name).includes(norm)?-10:10,run:()=>selectGeoPlace(p)});}
    for(const entity of encyclopedia.people){if(normalize(entity.name+' '+(entity.aliases||[]).join(' ')).includes(norm))map.push({name:entity.name,type:'Personagem',priority:normalize(entity.name)===norm?-30:normalize(entity.name).startsWith(norm)?-20:normalize(entity.name).includes(norm)?-10:-5,run:()=>selectPerson(entity)});}
    for(const entity of encyclopedia.events){if(normalize(entity.name+' '+(entity.aliases||[]).join(' ')).includes(norm))map.push({name:entity.name,type:'Acontecimento',priority:normalize(entity.name)===norm?-30:normalize(entity.name).startsWith(norm)?-20:0,run:()=>showBio(entity.name,entity.summary,entity.refs,true)});}
    for(const entity of encyclopedia.places){if(!source.places.some(p=>normalize(p.name)===normalize(entity.name))&&normalize(entity.name+' '+(entity.aliases||[]).join(' ')).includes(norm))map.push({name:entity.name,type:'Local sem coordenadas',priority:normalize(entity.name)===norm?-30:normalize(entity.name).startsWith(norm)?-20:1,run:()=>showBio(entity.name,entity.summary,entity.refs,true)});}
    return map.sort((a,b)=>a.priority-b.priority||a.name.localeCompare(b.name,'pt-BR')).slice(0,28);
  }
  function searchEntities(){
    const root=$('searchResults');root.replaceChildren();const query=$('entitySearch').value.trim();if(!query)return;
    const items=lookupEntity(query);
    if(!items.length){const p=document.createElement('div');p.className='search-none';p.textContent='Nenhum item do acervo inicial corresponde a essa busca.';root.appendChild(p);return;}
    for(const item of items){const b=document.createElement('button');const title=document.createElement('span');title.textContent=item.name;
      const category=document.createElement('small');category.textContent=item.type;b.append(title,category);
      b.addEventListener('click',()=>{item.run();root.replaceChildren();$('entitySearch').value=item.name;$('sidebar').classList.remove('open');});root.appendChild(b);
    }
  }
  function exportMap(){
    const svg=$('mapSvg').cloneNode(true);svg.setAttribute('xmlns',NS);svg.setAttribute('width','1280');svg.setAttribute('height','700');
    const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='atlas_biblico_'+(state.route.id||'mapa')+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  function navigation(){
    $('journeySelect').addEventListener('change',e=>setRoute(e.target.value));
    document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{state.category=btn.dataset.category;paintCategory();const r=routes.find(x=>x.category===state.category);if(r)setRoute(r.id);}));
    $('playBtn').addEventListener('click',()=>state.paused?startAnimation():stopAnimation());
    $('prevBtn').addEventListener('click',()=>setStep(Math.floor(state.value)-1));
    $('nextBtn').addEventListener('click',()=>setStep(Math.floor(state.value)+1));
    $('storySlider').addEventListener('input',e=>{
      stopAnimation();state.value=Math.min(routeSteps().length-1,Math.max(0,Number(e.target.value)/100));
      drawRoutes();updateTraveler();renderStage();
    });
    $('zoomIn').addEventListener('click',()=>applyZoom(.75));$('zoomOut').addEventListener('click',()=>applyZoom(1.35));
    $('zoomFit').addEventListener('click',()=>{viewFit(locs());drawMap();});
    $('exportMap').addEventListener('click',exportMap);
    $('entitySearch').addEventListener('input',searchEntities);
    $('entitySearch').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('searchResults').querySelector('button')?.click();}});
    $('navTimeline').addEventListener('click',()=>{$('timelinePanel').scrollIntoView({behavior:'smooth'});$('sidebar').classList.remove('open');});
    $('navCharacters').addEventListener('click',()=>{$('entitySearch').focus();$('sidebar').classList.add('open');});
    $('menuBtn').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
    $('closeModal').addEventListener('click',closePlace);$('modalCloseBottom').addEventListener('click',closePlace);
    $('placeModal').addEventListener('click',e=>{if(e.target.dataset.close)closePlace();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePlace();$('sidebar').classList.remove('open');}
      if(e.target.matches('input,select,textarea'))return;
      if(e.key==='ArrowRight')setStep(Math.floor(state.value)+1);if(e.key==='ArrowLeft')setStep(Math.floor(state.value)-1);
      if(e.key===' '){e.preventDefault();state.paused?startAnimation():stopAnimation();}
    });
    const svg=$('mapSvg');let drag=null;
    svg.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('.map-geo-dot'))return;drag={x:e.clientX,y:e.clientY,lon:state.view.lon,lat:state.view.lat,moved:false};svg.setPointerCapture(e.pointerId);});
    svg.addEventListener('pointermove',e=>{if(!drag)return;const rect=svg.getBoundingClientRect();const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
      if(Math.abs(dx)+Math.abs(dy)>5)drag.moved=true;
      state.view.lon=drag.lon-dx/rect.width*state.view.lonSpan;
      state.view.lat=drag.lat+dy/rect.height*state.view.latSpan;
      drawMap();
    });
    const end=()=>{if(drag?.moved){state.suppressClick=true;setTimeout(()=>state.suppressClick=false,120);}drag=null;};
    svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
    svg.addEventListener('wheel',e=>{e.preventDefault();applyZoom(e.deltaY<0?.9:1.1);},{passive:false});
  }
  navigation();
  const routeParam=new URLSearchParams(location.search).get('roteiro')||'jesus';
  setRoute(routes.some(r=>r.id===routeParam)?routeParam:'jesus');
})();
