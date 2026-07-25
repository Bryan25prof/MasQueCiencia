/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-04.js  |  UNIDAD IV — "Enlace Químico"
   Experiencia: "El Pacto de los Átomos"
   ================================================================
   Cuarto consumidor del sistema de plugins. Arquitectura MQC v1.0.
   Reutiliza toda la capa compartida + datos reales (ELEMENTOS) +
   primitivas de Lewis/enlace de viz.js. Sin sistemas nuevos.
   Tabs: unit-04:teoria · :simuladores · :juego · :examen
   ================================================================ */

(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

  const UNIT_ID = 'unit-04';
  const C = '#9C27B0';   /* violeta — color temático de la Unidad IV (Identidad v2.0) */

  /* ── Accesos defensivos ─────────────────────────────────────── */
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

  /* ── Datos reales + lógica de enlace ────────────────────────── */
  function els(){ return (typeof ELEMENTOS!=='undefined')?ELEMENTOS:[]; }
  function elByZ(z){ if(typeof getElementByZ!=='undefined') return getElementByZ(z); return els().find(e=>e.z===z)||null; }
  const TYPE_CAT = { 'nonmetal':'No metal','noble-gas':'No metal','halogen':'No metal',
    'alkali-metal':'Metal','alkaline-earth':'Metal','transition-metal':'Metal','post-transition':'Metal','lanthanide':'Metal','actinide':'Metal',
    'metalloid':'Metaloide','unknown':'Metal' };
  function categoryOf(e){ return TYPE_CAT[e.type]||'Metal'; }
  const MAIN=[1,2,13,14,15,16,17,18];
  function valence(e){ if(e.z===2)return 2; const g=e.group; if(g==null)return null; if(g<=2)return g; if(g>=13)return g-10; return null; }
  function octetTarget(e){ return e.period===1?2:8; }
  /* decisión de estabilidad: gana / pierde / comparte */
  function octetMove(e){ const v=valence(e); if(v==null)return null;
    if(e.type==='noble-gas')return {accion:'Ninguno',n:0,carga:'0'};
    if(v<=3)return {accion:'Pierde',n:v,carga:'+'+(v===1?'':v)};
    if(v>=5){const g=8-v;return {accion:'Gana',n:g,carga:'−'+(g===1?'':g)};}
    return {accion:'Comparte',n:4,carga:'0'}; }
  /* predicción del tipo de enlace entre dos elementos */
  function predictBond(a,b){ const ca=categoryOf(a),cb=categoryOf(b);
    if(ca==='Metal'&&cb==='Metal')return 'Metálico';
    if((ca==='Metal')!==(cb==='Metal'))return 'Iónico';
    return 'Covalente'; }
  function polarity(a,b){ if(a.en==null||b.en==null)return ''; return Math.abs(a.en-b.en)>=0.5?'polar':'no polar'; }
  function repMetals(){ return els().filter(e=>categoryOf(e)==='Metal'&&MAIN.includes(e.group)&&e.period<=4); }
  function repNonmetals(){ return els().filter(e=>categoryOf(e)==='No metal'&&e.type!=='noble-gas'&&MAIN.includes(e.group)&&e.period<=4); }
  function repSet(pmax){ return els().filter(e=>MAIN.includes(e.group)&&e.period<=(pmax||4)); }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}
  function vbox(svg){ return `<div class="viz-box" style="text-align:center;margin:.6rem 0">${svg}</div>`; }

  /* ============================================================
     1) TEORÍA con ciclo MQC (8 temas oficiales)
  ============================================================ */
  const TEORIA = [
    { titulo:'¿Por qué se unen los átomos?', icon:'🔗', html:`
      <p>Casi nada existe como átomos sueltos. Los átomos se unen porque al hacerlo alcanzan una <strong>configuración más estable</strong> (la del gas noble más cercano), que tiene <strong>menos energía</strong>.</p>
      ${box('La idea de toda la unidad','No se unen "porque quieren" ni por magnetismo: se unen porque así están más estables. Esa búsqueda de estabilidad explica TODO el enlace.','var(--gold)')}` },
    { titulo:'Electrones de valencia', icon:'✦', html:`
      <p>Los <strong>electrones de valencia</strong> (los del último nivel) son los protagonistas del enlace. En los elementos representativos, su número se lee del grupo.</p>
      ${box('Puente con la Unidad III','Grupo 1 → 1 electrón de valencia; grupo 16 → 6; grupo 17 → 7. Lo aprendiste ubicando elementos en la tabla.','var(--green)')}` },
    { titulo:'La regla del octeto', icon:'8️⃣', html:`
      <p>Muchos átomos tienden a quedar con <strong>8 electrones</strong> en su última capa, como los gases nobles. Es la <strong>regla del octeto</strong>.</p>
      ${box('Sé honesto con la regla','El hidrógeno y el helio buscan <strong>2</strong> (no 8). Y existen excepciones legítimas. El octeto es una guía muy útil, no una ley absoluta.','var(--orange)')}` },
    { titulo:'Estructuras de Lewis', icon:'⋮', html:`
      <p>Las <strong>estructuras de Lewis</strong> son el "idioma" del enlace: dibujan los electrones de valencia como puntos alrededor del símbolo, y los enlaces como pares compartidos.</p>
      ${box('Una herramienta para todo','Con Lewis podrás representar enlaces iónicos, covalentes y metálicos. La usaremos en los temas siguientes.','var(--violet)')}` },
    { titulo:'Enlace iónico', icon:'➕➖', html:`
      <p>Cuando se unen un <strong>metal</strong> y un <strong>no metal</strong>, el metal <strong>cede</strong> electrones y el no metal los <strong>toma</strong>: se forman iones (catión + y anión −) que se atraen.</p>
      ${box('Ojo: no son moléculas','El resultado (p. ej. la sal NaCl) es una <strong>red cristalina</strong> enorme de iones, no moléculas sueltas. Conduce electricidad solo disuelta o fundida.','var(--red)')}` },
    { titulo:'Enlace covalente', icon:'🤝', html:`
      <p>Entre <strong>no metales</strong>, los átomos <strong>comparten</strong> pares de electrones. Pueden compartir 1, 2 o 3 pares (enlace simple, doble o triple).</p>
      ${box('Polar y no polar','Si los átomos tienen distinta electronegatividad, el par se acerca a uno: enlace <strong>polar</strong> (como en el agua). Si son iguales, <strong>no polar</strong>. Puente con la Unidad III.','var(--blue, #00A8CC)')}` },
    { titulo:'Enlace metálico', icon:'🪙', html:`
      <p>Entre <strong>metales</strong>, los electrones de valencia quedan <strong>libres</strong> formando un "mar de electrones" que rodea a los cationes.</p>
      ${box('Explica sus propiedades','Ese mar explica por qué los metales conducen electricidad y calor, brillan y se pueden moldear (maleables y dúctiles).','var(--gold)')}` },
    { titulo:'Aplicaciones y propiedades', icon:'🌍', html:`
      <p>El tipo de enlace <strong>define las propiedades</strong> de los materiales:</p>
      ${box('Ejemplos cotidianos','La sal es frágil pero conduce disuelta (iónico); el agua disuelve y "moja" (covalente polar); los metales conducen y se moldean (metálico). El diamante y el grafito son el mismo carbono… con enlaces distintos.','var(--green)')}` }
  ];

  const TOPIC_HINTS = {
    4:['Metal + no metal → iónico (uno cede, otro toma).','Pregúntate quién es metal: el metal siempre cede.'],
    5:['No metal + no metal → covalente (comparten).','Si los dos átomos son iguales, el enlace es no polar.']
  };

  function enrich(html,i){
    const tid='topic-'+i;
    let pre='';
    if(typeof MQC!=='undefined'){ pre+=MQC.detonante(UNIT_ID,tid); pre+=MQC.commit(UNIT_ID,tid); }
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
    /* Ilustraciones con las primitivas de Lewis/enlace */
    if(typeof VIZ!=='undefined'){
      if(i===3){ body+=vbox(VIZ.svg(VIZ.lewisAtom({symbol:'O',valence:6,cx:50,cy:50}),'0 0 100 100')); }
      else if(i===4){ body+=vbox(VIZ.svg(VIZ.ion({symbol:'Na',charge:'+',cx:45,cy:50,r:24})+VIZ.arrow(78,50,108,50,VIZ.COL.electron)+VIZ.ion({symbol:'Cl',charge:'−',cx:140,cy:50,r:26}),'0 0 185 100')); }
      else if(i===5){ body+=vbox(VIZ.svg(VIZ.lewisAtom({symbol:'H',valence:1,cx:30,cy:50,fontSize:18})+VIZ.bond(48,50,92,50,1)+VIZ.lewisAtom({symbol:'H',valence:1,cx:110,cy:50,fontSize:18}),'0 0 140 100')); }
      else if(i===6){ body+=vbox(VIZ.svg(VIZ.electronSea({cols:4,rows:2,symbol:'Cu',x:30,y:30,gap:40}),'0 0 220 110')); }
    }
    let post='';
    if(typeof UnitMedia!=='undefined') post+=UnitMedia.render(UNIT_ID,tid);
    if(typeof MQC!=='undefined') post+=MQC.conexion(UNIT_ID,tid);
    if(typeof Insights!=='undefined'){ post+=Insights.renderCuriosidad(UNIT_ID,tid); post+=Insights.renderError(UNIT_ID,tid); }
    if(typeof CrossRef!=='undefined') post+=CrossRef.renderChips(UNIT_ID,'teoria:'+tid);
    return pre+body+post;
  }

  function renderTeoria(unit,uData){
    const read=(uData&&uData.topicsRead)?uData.topicsRead:[];
    const leidos=TEORIA.filter((_,i)=>read.includes(`${UNIT_ID}-topic-${i}`)).length;
    const expHTML=(typeof MQC!=='undefined')?MQC.experienceHeader(unit):'';
    const bridgeHTML=(typeof MQC!=='undefined'&&MQC.bridge)?MQC.bridge(unit):'';
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:teoria'):'';
    const items=TEORIA.map((t,i)=>{
      const tid=`${UNIT_ID}-topic-${i}`, isRead=read.includes(tid);
      return `<div class="u4-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u4-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u4-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u4-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Una sola idea recorre toda la unidad: los átomos se unen para ganar estabilidad. <strong>Comprométete con una respuesta</strong> antes de leer cada tema.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u4-caret');
        const open=body.style.display==='block';
        body.style.display=open?'none':'block';
        if(caret)caret.style.transform=open?'rotate(0deg)':'rotate(180deg)';
        if(!open&&typeof MQC!=='undefined') MQC.bindCommit(body,UNIT_ID,'topic-'+i);
      });
    });
    cont.querySelectorAll('[data-read]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-read');
        markRead(`${UNIT_ID}-topic-${i}`); awardXP('topic-read');
        const fresh=loadUnitData();
        cont.innerHTML=renderTeoria(unit,fresh); bindTeoria(unit,fresh);
        const b=cont.querySelector(`[data-acc-body="${i}"]`); if(b)b.style.display='block';
        if(typeof MQC!=='undefined') MQC.bindCommit(b,UNIT_ID,'topic-'+i);
      });
    });
    if(typeof Hints!=='undefined'){
      cont.querySelectorAll('.qi-hints-host').forEach(h=>{
        const ti=h.getAttribute('data-topic'), hs=TOPIC_HINTS[ti];
        if(hs&&hs.length) Hints.attach(h,hs,{label:'💡 Pista para entender este tema'});
      });
    }
  }

  /* ============================================================
     2) SIMULADORES (3)
  ============================================================ */
  function markSimDone(id,score){
    const u=loadUnitData(); const done=Array.isArray(u.simsDone)?u.simsDone.slice():[];
    if(!done.includes(id)){ done.push(id); patchUnit({simsDone:done}); awardXP(score>=100?'simulator-perfect':'simulator-done'); }
  }
  function renderSimuladores(unit,uData){
    const done=(uData&&uData.simsDone)?uData.simsDone:[];
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:simuladores'):'';
    const S=[
      {id:'sim-04-01',icon:'🔮',name:'Predice el Enlace',desc:'Elige dos elementos, predice el tipo de enlace y míralo ocurrir.'},
      {id:'sim-04-02',icon:'⋮',name:'Laboratorio de Lewis',desc:'Construye y reconoce estructuras de Lewis por niveles.'},
      {id:'sim-04-03',icon:'8️⃣',name:'Camino al Octeto',desc:'Decide si un átomo gana, pierde o comparte para ser estable.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u4-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres experiencias para comprender el enlace con datos reales. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:enlace'):''}</p>
      <div id="u4-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u4-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u4-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u4-stage"></div>`;
    document.getElementById('u4-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u4-stage');
    if(id==='sim-04-01')simPredice(st);
    else if(id==='sim-04-02')simLewis(st);
    else if(id==='sim-04-03')simOcteto(st);
  }

  /* SIM 1 — Predice el Enlace */
  function simPredice(st){
    const pool=repSet(4);
    let a=elByZ(11)||pool[0], b=elByZ(17)||pool[1], committed=false, guess=null;
    function opts(sel){ return pool.map(e=>`<option value="${e.z}" ${e.z===sel.z?'selected':''}>${e.symbol} — ${e.name}</option>`).join(''); }
    function reveal(){
      const tipo=predictBond(a,b), pol=(tipo==='Covalente')?polarity(a,b):'';
      let viz='';
      if(tipo==='Iónico'){ const ma=octetMove(a),mb=octetMove(b);
        viz=VIZ.svg(VIZ.ion({symbol:a.symbol,charge:(ma&&ma.carga)||'+',cx:45,cy:50,r:24})+VIZ.arrow(76,50,110,50,VIZ.COL.electron)+VIZ.ion({symbol:b.symbol,charge:(mb&&mb.carga)||'−',cx:145,cy:50,r:26}),'0 0 190 100'); }
      else if(tipo==='Covalente'){ viz=VIZ.svg(VIZ.lewisAtom({symbol:a.symbol,valence:valence(a)||0,cx:34,cy:50,fontSize:18})+VIZ.bond(54,50,98,50,1)+VIZ.lewisAtom({symbol:b.symbol,valence:valence(b)||0,cx:118,cy:50,fontSize:18}),'0 0 150 100'); }
      else { viz=VIZ.svg(VIZ.electronSea({cols:3,rows:2,symbol:a.symbol,x:30,y:30,gap:40}),'0 0 170 110'); }
      const okTxt=guess===tipo?'<span style="color:var(--green)">✓ ¡Acertaste!</span>':`<span style="color:var(--gold)">Era <strong>${tipo}</strong>.</span>`;
      return `${vbox(viz)}<p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">${okTxt} Enlace <strong>${tipo}</strong>${pol?(' '+pol):''}. ${a.symbol} (${categoryOf(a)}) + ${b.symbol} (${categoryOf(b)}).</p>`;
    }
    function draw(){
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-bottom:.6rem">
          <select id="u4p-a" class="qi-overlay-input" style="margin:0">${opts(a)}</select>
          <select id="u4p-b" class="qi-overlay-input" style="margin:0">${opts(b)}</select></div>
        <div style="display:flex;gap:1.2rem;justify-content:center;margin:.4rem 0">
          ${VIZ.svg(VIZ.lewisAtom({symbol:a.symbol,valence:valence(a)||0,cx:50,cy:50}),'0 0 100 100')}
          ${VIZ.svg(VIZ.lewisAtom({symbol:b.symbol,valence:valence(b)||0,cx:50,cy:50}),'0 0 100 100')}</div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted)">EN: ${a.symbol} ${a.en!=null?a.en:'—'} · ${b.symbol} ${b.en!=null?b.en:'—'}</p>
        ${!committed?`<div class="mqc-commit" style="margin:.6rem 0"><span class="mqc-badge">✋ Comprométete</span><p>¿Qué tipo de enlace formarán?</p>
          <div class="mqc-commit-opts">${['Iónico','Covalente','Metálico'].map(t=>`<button class="btn btn-ghost btn-sm" data-guess="${t}">${t}</button>`).join('')}</div></div>`:reveal()}
      </div>`;
      st.querySelector('#u4p-a').addEventListener('change',ev=>{a=elByZ(+ev.target.value);committed=false;guess=null;draw();});
      st.querySelector('#u4p-b').addEventListener('change',ev=>{b=elByZ(+ev.target.value);committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(btn=>btn.addEventListener('click',()=>{guess=btn.getAttribute('data-guess');committed=true;draw();markSimDone('sim-04-01',guess===predictBond(a,b)?100:80);}));
    }
    draw();
  }

  /* SIM 2 — Laboratorio de Lewis (3 niveles) */
  function simLewis(st){
    const LV=[
      {titulo:'Nivel 1 · Electrones de valencia',items:shuffle(repSet(3)).slice(0,5),
       pregunta:e=>`¿Cuántos electrones de valencia (puntos) tiene ${e.name} (${e.symbol})?`,
       viz:e=>VIZ.svg(VIZ.lewisAtom({symbol:e.symbol,valence:valence(e)||0,cx:50,cy:50}),'0 0 100 100'),
       ops:e=>shuffle([valence(e),(valence(e)+1)%8+1,(valence(e)+2)%8+1,(valence(e)+4)%8+1].filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,4)),
       ok:e=>valence(e),fmt:v=>v},
      {titulo:'Nivel 2 · Orden de enlace',items:[{m:'H₂',o:1},{m:'O₂',o:2},{m:'N₂',o:3},{m:'Cl₂',o:1},{m:'CO₂ (C=O)',o:2}],
       pregunta:it=>`¿Qué orden de enlace tiene ${it.m}?`,
       viz:it=>VIZ.svg(VIZ.bond(20,40,80,40,it.o,C),'0 0 100 80'),
       ops:()=>['simple','doble','triple'],ok:it=>({1:'simple',2:'doble',3:'triple'})[it.o],fmt:v=>v,raw:true},
      {titulo:'Nivel 3 · Pares compartidos',items:[{m:'H₂O',n:2},{m:'NH₃',n:3},{m:'CH₄',n:4},{m:'HCl',n:1}],
       pregunta:it=>`¿Cuántos pares de electrones comparte el átomo central en ${it.m}?`,
       viz:()=>'',ops:()=>[1,2,3,4],ok:it=>it.n,fmt:v=>v+' par'+(v>1?'es':''),raw:true}
    ];
    let lvIdx=0,state=null;
    function startLv(){state={lv:LV[lvIdx],i:0,correct:0,answered:false};drawItem();}
    function drawItem(){
      const lv=state.lv,it=lv.items[state.i];const ops=lv.ops(it);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">${lv.titulo}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.i+1}/${lv.items.length}</span></div>
        ${lv.viz(it)?vbox(lv.viz(it)):''}
        <p style="text-align:center;font-size:.95rem;font-weight:700;color:var(--text-primary);margin:.4rem 0 .8rem">${lv.pregunta(it)}</p>
        <div id="u4l-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${ops.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${lv.fmt(o)}</button>`).join('')}</div>
        <div id="u4l-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>answer(b.getAttribute('data-o'))));
    }
    function answer(val){
      if(state.answered)return;state.answered=true;
      const lv=state.lv,it=lv.items[state.i],correctVal=String(lv.ok(it));const ok=String(val)===correctVal;
      if(ok)state.correct++;
      st.querySelectorAll('#u4l-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===correctVal)b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u4l-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Correcto: '+lv.fmt(lv.ok(it))}</span><br><button class="btn btn-primary btn-sm" id="u4l-next" style="margin-top:.5rem">${state.i<lv.items.length-1?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u4l-next').addEventListener('click',()=>{if(state.i<lv.items.length-1){state.i++;state.answered=false;drawItem();}else finishLv();});
    }
    function finishLv(){
      const lv=state.lv,passed=state.correct>=Math.ceil(lv.items.length*0.6);
      if(passed)markSimDone('sim-04-02',state.correct===lv.items.length?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${lv.titulo}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/${lv.items.length} correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u4l-nextlv" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u4l-retry" style="margin-top:.6rem">↻ Repetir nivel</button></div>`;
      const nb=st.querySelector('#u4l-nextlv');if(nb)nb.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u4l-retry').addEventListener('click',startLv);
    }
    startLv();
  }

  /* SIM 3 — Camino al Octeto */
  function simOcteto(st){
    const pool=repSet(4).filter(e=>e.type!=='noble-gas'&&valence(e)!=null);
    let e=elByZ(11)||pool[0],committed=false,guess=null;
    function opts(){ return pool.map(x=>`<option value="${x.z}" ${x.z===e.z?'selected':''}>${x.symbol} — ${x.name}</option>`).join(''); }
    function reveal(){
      const mv=octetMove(e);const ok=guess===mv.accion;
      let res='';
      if(mv.accion==='Pierde'||mv.accion==='Gana'){ res=`${vbox(VIZ.svg(VIZ.ion({symbol:e.symbol,charge:mv.carga,cx:50,cy:50,r:28}),'0 0 100 100'))}<p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">${e.name} <strong>${mv.accion.toLowerCase()}</strong> ${mv.n} electrón(es) → ion <strong>${e.symbol}${mv.carga}</strong>.</p>`; }
      else { res=`${vbox(VIZ.svg(VIZ.lewisAtom({symbol:e.symbol,valence:valence(e),cx:50,cy:50}),'0 0 100 100'))}<p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">${e.name} <strong>comparte</strong> electrones para completar el octeto.</p>`; }
      return `<p style="text-align:center;margin:.4rem 0">${ok?'<span style="color:var(--green)">✓ ¡Bien razonado!</span>':`<span style="color:var(--gold)">La opción estable es <strong>${mv.accion}</strong>.</span>`}</p>${res}`;
    }
    function draw(){
      const v=valence(e),falta=octetTarget(e)-v;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.5rem"><select id="u4o-e" class="qi-overlay-input" style="margin:0">${opts()}</select></div>
        ${vbox(VIZ.svg(VIZ.lewisAtom({symbol:e.symbol,valence:v,cx:50,cy:50}),'0 0 100 100'))}
        <p style="text-align:center;font-size:.84rem;color:var(--text-muted)">Tiene ${v} de valencia · objetivo ${octetTarget(e)} · le faltan ${falta} para el octeto.</p>
        ${!committed?`<div class="mqc-commit" style="margin:.6rem 0"><span class="mqc-badge">✋ Comprométete</span><p>Para ser estable, ${e.symbol} tenderá a…</p>
          <div class="mqc-commit-opts">${['Pierde','Gana','Comparte'].map(t=>`<button class="btn btn-ghost btn-sm" data-guess="${t}">${t==='Pierde'?'Perder':t==='Gana'?'Ganar':'Compartir'}</button>`).join('')}</div></div>`:reveal()}
      </div>`;
      st.querySelector('#u4o-e').addEventListener('change',ev=>{e=elByZ(+ev.target.value);committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(b=>b.addEventListener('click',()=>{guess=b.getAttribute('data-guess');committed=true;draw();markSimDone('sim-04-03',guess===octetMove(e).accion?100:80);}));
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Arquitecto de la Materia" (razonar)
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'🔍',desc:'Dada una pareja, deduce el tipo de enlace.'},
    {id:'constructor',nombre:'Constructor',icon:'🧱',desc:'Dado un tipo de enlace, elige una pareja válida.'},
    {id:'arquitecto',nombre:'Arquitecto',icon:'🏛️',desc:'Dada una necesidad, elige la pareja y el enlace correctos.'}
  ];
  const GAME_ROUNDS=5,GAME_PASS=3;
  const NEEDS=[
    {texto:'Un material que conduzca electricidad y se pueda moldear.',bond:'Metálico'},
    {texto:'Un sólido que se disuelva en agua y conduzca disuelto.',bond:'Iónico'},
    {texto:'Un gas formado por dos no metales que comparten electrones.',bond:'Covalente'}
  ];
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  function pickPair(){const all=repSet(4);return [all[Math.floor(Math.random()*all.length)],all[Math.floor(Math.random()*all.length)]];}
  function pairForBond(type){
    let a,b,tries=0;
    do{ if(type==='Metálico'){a=repMetals()[0+Math.floor(Math.random()*repMetals().length)];b=repMetals()[Math.floor(Math.random()*repMetals().length)];}
        else if(type==='Iónico'){a=repMetals()[Math.floor(Math.random()*repMetals().length)];b=repNonmetals()[Math.floor(Math.random()*repNonmetals().length)];}
        else {a=repNonmetals()[Math.floor(Math.random()*repNonmetals().length)];b=repNonmetals()[Math.floor(Math.random()*repNonmetals().length)];}
        tries++; }while((!a||!b||predictBond(a,b)!==type)&&tries<40);
    return [a,b];
  }
  function makeCase(idx){
    if(idx===0){ const [a,b]=pickPair(); const bond=predictBond(a,b);
      return {prompt:`¿Qué tipo de enlace forman <strong>${a.symbol}</strong> (${categoryOf(a)}) y <strong>${b.symbol}</strong> (${categoryOf(b)})?`,
        options:['Iónico','Covalente','Metálico'].map(t=>({label:t,ok:t===bond})),explica:`${a.symbol}+${b.symbol} → ${bond}.`}; }
    if(idx===1){ const target=['Iónico','Covalente','Metálico'][Math.floor(Math.random()*3)];
      const good=pairForBond(target);
      const wrongs=[];const others=['Iónico','Covalente','Metálico'].filter(t=>t!==target);
      while(wrongs.length<3){const t=others[wrongs.length%others.length];const p=pairForBond(t);if(p[0]&&p[1])wrongs.push(p);}
      const opts=shuffle([{pair:good,ok:true},...wrongs.map(p=>({pair:p,ok:false}))]);
      return {prompt:`Elige una pareja de elementos que forme un enlace <strong>${target}</strong>.`,
        options:opts.map(o=>({label:`${o.pair[0].symbol} + ${o.pair[1].symbol}`,ok:o.ok})),explica:`Un enlace ${target} se forma con esa combinación de metales/no metales.`}; }
    /* idx===2 */
    const need=NEEDS[Math.floor(Math.random()*NEEDS.length)];
    const good=pairForBond(need.bond);
    const wrongs=[];const others=['Iónico','Covalente','Metálico'].filter(t=>t!==need.bond);
    while(wrongs.length<3){const t=others[wrongs.length%others.length];const p=pairForBond(t);if(p[0]&&p[1])wrongs.push(p);}
    const opts=shuffle([{pair:good,ok:true},...wrongs.map(p=>({pair:p,ok:false}))]);
    return {prompt:`${need.texto}<br><span style="font-size:.82rem;color:var(--text-muted)">Elige la pareja cuyo enlace cumple la necesidad.</span>`,
      options:opts.map(o=>({label:`${o.pair[0].symbol} + ${o.pair[1].symbol}`,ok:o.ok})),explica:`La necesidad pide un enlace ${need.bond}.`};
  }
  function renderJuego(unit,uData){
    const stt=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,stt.done),co=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;}).join('');
    return `<div class="u4-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">🏛️</span><div><h3 style="margin:0">Arquitecto de la Materia</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Razona de la necesidad al enlace y a los átomos. No es responder: es diseñar.</p></div></div>
        <div style="margin-top:.7rem;font-family:var(--font-code);font-size:.8rem;color:${C}">🏆 Mejor: ${stt.best} / 500</div></div>
      ${cards}</div>`;
  }
  function bindJuego(unit,uData){const c=document.getElementById('tab-content');if(!c)return;if(typeof Mentor!=='undefined')Mentor.bind(c);c.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));}
  function backLevels(){const c=document.getElementById('tab-content');if(!c)return;const f=loadUnitData();c.innerHTML=renderJuego(null,f);bindJuego(null,f);}
  function startLevel(idx){const lv=GAME_LEVELS[idx];if(!lv)return;game={idx,lv,round:0,score:0,correct:0,answered:false,caso:null};awardXP('game-played');nextRound();}
  function nextRound(){game.caso=makeCase(game.idx);game.answered=false;drawRound();}
  function drawRound(){
    const c=document.getElementById('tab-content');if(!c||!game)return;const caso=game.caso;
    c.innerHTML=`<div style="animation:pageIn .35s ease">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u4g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.round+1}/${GAME_ROUNDS} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="text-align:center;font-size:1rem;font-weight:700;color:${C};margin-bottom:1rem">${caso.prompt}</p>
        <div id="u4g-opts" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem">${caso.options.map((o,k)=>`<button class="btn btn-ghost" data-k="${k}" style="height:auto;padding:.7rem">${o.label}</button>`).join('')}</div>
        <div id="u4g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u4g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>answerRound(+b.getAttribute('data-k'))));
  }
  function answerRound(k){
    if(!game||game.answered)return;game.answered=true;const caso=game.caso;const ok=!!caso.options[k].ok;
    if(ok){game.correct++;game.score+=100;}
    const opts=document.getElementById('u4g-opts');
    opts.querySelectorAll('[data-k]').forEach(b=>{const i=+b.getAttribute('data-k');b.disabled=true;if(caso.options[i].ok)b.style.borderColor='var(--green)';if(i===k&&!ok)b.style.borderColor='var(--red)';});
    document.getElementById('u4g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.86rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${caso.explica}</p></div>
      <button class="btn btn-primary btn-sm" id="u4g-next" style="margin-top:.8rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u4g-next').addEventListener('click',()=>{if(game.round<GAME_ROUNDS-1){game.round++;nextRound();}else finishLevel();});
  }
  function finishLevel(){
    if(!game)return;const passed=game.correct>=GAME_PASS,perfect=game.correct===GAME_ROUNDS,score=game.score;
    const stt=gameState();const done=stt.done.slice();if(passed&&!done.includes(game.lv.id))done.push(game.lv.id);
    patchUnit({gameScore:Math.max(stt.best,score),gameLevels:done});
    if(passed)awardXP('game-won');if(score>stt.best)awardXP('game-highscore');
    const c=document.getElementById('tab-content');const nx=game.idx+1,hay=nx<GAME_LEVELS.length,unlk=passed&&hay;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔍'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u4g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u4g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u4g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u4g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 de 30, 70%) con PNE + Insights
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U04)?window.PREGUNTAS_U04.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u04.js</code>.</p></div>`;
    return `<div id="u4-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Enlace Químico</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u4-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u4-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u4-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u4-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u4-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u4-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u4-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u4-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u4-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u4-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u4-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1});
    if(passed)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u4-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u4-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u4-exam-close">Cerrar</button></div>`;
    document.getElementById('u4-exam-retry').addEventListener('click',startExam);
    document.getElementById('u4-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO DE PLUGINS + MANIFEST MQC
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-04] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'enlace químico':'Unión entre átomos que los mantiene juntos para ganar estabilidad.',
        'electrón de valencia':'Electrón del último nivel; es el que participa en los enlaces.',
        'regla del octeto':'Tendencia de los átomos a quedar con 8 electrones de valencia (2 para H y He).',
        'estabilidad':'Estado de menor energía que los átomos buscan al enlazarse.',
        'estructura de Lewis':'Representación de los electrones de valencia con puntos alrededor del símbolo.',
        'par compartido':'Par de electrones que dos átomos comparten en un enlace covalente.',
        'ion':'Átomo con carga por haber ganado o perdido electrones.',
        'catión':'Ion con carga positiva (perdió electrones).',
        'anión':'Ion con carga negativa (ganó electrones).',
        'enlace iónico':'Enlace por transferencia de electrones entre un metal y un no metal.',
        'red cristalina':'Ordenamiento gigante y repetido de iones en un sólido iónico.',
        'enlace covalente':'Enlace en el que dos no metales comparten pares de electrones.',
        'enlace covalente polar':'Covalente entre átomos de distinta electronegatividad; el par se acerca a uno.',
        'enlace covalente no polar':'Covalente entre átomos iguales o de igual electronegatividad.',
        'enlace metálico':'Enlace entre metales con electrones libres formando un "mar".',
        'mar de electrones':'Electrones de valencia libres que rodean a los cationes en un metal.',
        'molécula':'Grupo de átomos unidos por enlaces covalentes.'
      },
      mqc: {
        'topic-0':{ detonante:'El agua, la sal, tu cuerpo… casi todo son átomos UNIDOS. ¿Qué los obliga a unirse?', commit:{pregunta:'Los átomos se unen para…',opciones:['Pesar más','Ser más estables','Cambiar de color'],correcta:1,explica:'Se unen para alcanzar una configuración más estable y de menor energía.'}, conexion:'Esta es la idea que recorre TODA la unidad: estabilidad.' },
        'topic-1':{ detonante:'¿Qué parte del átomo decide cómo se une a otros?', commit:{pregunta:'Los enlaces los forman…',opciones:['Los neutrones','Los electrones de valencia','Los protones'],correcta:1,explica:'Los electrones de valencia (del último nivel) forman los enlaces.'}, conexion:'En la Unidad III viste cómo leer la valencia desde el grupo.' },
        'topic-2':{ detonante:'¿Por qué muchos átomos "quieren" llegar a 8 electrones?', commit:{pregunta:'La regla del octeto busca…',opciones:['8 electrones de valencia','perder el núcleo','más neutrones'],correcta:0,explica:'Buscan 8 (como los gases nobles); H y He buscan 2.'}, conexion:'El octeto es una guía poderosa, con excepciones honestas.' },
        'topic-3':{ detonante:'¿Cómo "dibujamos" los electrones que se enlazan?', commit:{pregunta:'Lewis representa…',opciones:['Protones','Electrones de valencia','Neutrones'],correcta:1,explica:'Lewis dibuja los electrones de valencia como puntos.'}, conexion:'Es el idioma que usaremos para todos los enlaces.' },
        'topic-4':{ detonante:'¿Qué pasa cuando un metal muy "generoso" se topa con un no metal "ávido"?', commit:{pregunta:'En el enlace iónico los electrones se…',opciones:['Comparten','Transfieren','Destruyen'],correcta:1,explica:'Se transfieren: el metal cede y el no metal recibe.'}, conexion:'Así nace la sal: una red de iones, no moléculas.' },
        'topic-5':{ detonante:'¿Y si ninguno de los dos quiere ceder sus electrones?', commit:{pregunta:'En el enlace covalente los electrones se…',opciones:['Transfieren','Comparten','Pierden'],correcta:1,explica:'Se comparten en pares entre no metales.'}, conexion:'Si los átomos son distintos, el enlace es polar (como el agua).' },
        'topic-6':{ detonante:'¿Por qué los metales conducen y se pueden moldear?', commit:{pregunta:'En el enlace metálico los electrones…',opciones:['Están fijos','Forman un "mar" libre','No existen'],correcta:1,explica:'Quedan libres en un "mar" que rodea a los cationes.'}, conexion:'Ese mar explica conducción, brillo y maleabilidad.' },
        'topic-7':{ detonante:'¿Por qué el diamante y la mina del lápiz son tan distintos si ambos son carbono?', commit:{pregunta:'Las propiedades de un material dependen sobre todo de…',opciones:['Su color','El tipo de enlace y su disposición','Su precio'],correcta:1,explica:'El enlace, no solo el átomo, define las propiedades.'}, conexion:'El enlace conecta la química con todo lo que tocas.' }
      },
      mentor: {
        'tab:teoria':'El enlace asusta porque parece lleno de reglas. En realidad es una sola idea: los átomos se unen para estar más estables. Si dominas los electrones de valencia, lo demás se predice.',
        'tab:simuladores':'Antes de cada unión, predice: ¿quién cede, quién comparte? Luego míralo ocurrir.',
        'tab:juego':'Piensa como diseñador de materiales: primero la propiedad que necesitas, luego el enlace, después los átomos.',
        'tab:examen':'No memorices tipos: dedúcelos desde la tabla. Si fallas, te muestro el error frecuente detrás.'
      },
      curiosidades: [
        {topic:'topic-4',texto:'La sal de mesa no tiene "moléculas de NaCl": es una red gigantesca de millones de iones ordenados.'},
        {topic:'topic-5',texto:'El agua es covalente polar: por eso "moja", disuelve tantas cosas y forma gotas.'},
        {topic:'topic-6',texto:'Los metales conducen y se moldean gracias a su "mar" de electrones libres.'},
        {topic:'topic-7',texto:'El diamante y el grafito son el MISMO átomo (carbono): cambia cómo se enlazan, y con ello todo.'}
      ],
      errores: [
        {id:'e1',topic:'topic-5',creencia:'En el enlace covalente los electrones se transfieren.',porque:'Se confunde con el iónico.',correccion:'En el covalente los electrones se COMPARTEN; la transferencia es del iónico.'},
        {id:'e2',topic:'topic-2',creencia:'El octeto siempre son 8 electrones.',porque:'Se memoriza la regla sin sus límites.',correccion:'El hidrógeno y el helio buscan 2, no 8; además hay excepciones legítimas al octeto.'},
        {id:'e3',topic:'topic-4',creencia:'Los compuestos iónicos conducen electricidad en estado sólido.',porque:'Se asume que "tienen iones, luego conducen".',correccion:'Solo conducen disueltos en agua o fundidos, cuando los iones quedan libres.'},
        {id:'e4',topic:'topic-4',creencia:'El NaCl es una molécula.',porque:'Se trata todo compuesto como molécula.',correccion:'El NaCl es una RED iónica; "molécula" se reserva para los enlaces covalentes.'},
        {id:'e5',topic:'topic-0',creencia:'Los átomos se unen porque "quieren" o por magnetismo.',porque:'Se humaniza el fenómeno.',correccion:'Se unen porque así alcanzan una configuración más estable y de menor energía.'}
      ],
      xref: {
        'teoria:topic-1':[{type:'unit',unit:'unit-03',tab:'teoria',label:'Valencia desde el grupo (Unidad III)'},{type:'unit',unit:'unit-02',tab:'teoria',label:'Configuración electrónica (Unidad II)'}],
        'teoria:topic-3':[{tab:'simuladores',label:'Laboratorio de Lewis'}],
        'teoria:topic-4':[{tab:'simuladores',label:'Predice el Enlace'},{type:'unit',unit:'unit-05',tab:'teoria',label:'Te servirá en Nomenclatura (Unidad V)'}],
        'teoria:topic-5':[{type:'unit',unit:'unit-03',tab:'teoria',label:'Electronegatividad (Unidad III)'},{tab:'simuladores',label:'Predice el Enlace'}],
        'sim:enlace':[{type:'section',section:'periodic-table',label:'Abrir la Tabla interactiva'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U04)?window.BANCO_PNE_U04:null
    });
  }

})();
