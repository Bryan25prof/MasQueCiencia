/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-03.js  |  UNIDAD III — "Tabla Periódica"
   Experiencia: "El Mapa de los Elementos"
   ================================================================
   Tercer consumidor del sistema de plugins. Reutiliza TODA la capa
   compartida y, por primera vez, los DATOS reales (ELEMENTOS, 118) y
   la sección interactiva periodic-table. Sin sistemas nuevos.
   Tabs: unit-03:teoria · :simuladores · :juego · :examen
   ================================================================ */

(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

  const UNIT_ID = 'unit-03';
  const C = '#00C853';   /* verde — color temático de la Unidad III (Identidad v2.0) */

  /* ── Accesos defensivos ─────────────────────────────────────── */
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

  /* ── Datos reales de los 118 elementos ──────────────────────── */
  function els(){ return (typeof ELEMENTOS!=='undefined')?ELEMENTOS:[]; }
  function elByZ(z){ if(typeof getElementByZ!=='undefined') return getElementByZ(z); return els().find(e=>e.z===z)||null; }
  const MAIN=[1,2,13,14,15,16,17,18];
  function acrossIndex(g){ return g==null?0:(g<=2?g:g-10); }     /* 1,2,13..18 → 1,2,3..8 */
  function radiusScore(e){ return e.period*2 - acrossIndex(e.group)*0.55; }  /* ↑ abajo-izquierda */
  function ionScore(e){ return acrossIndex(e.group)*1.0 + (7-e.period)*0.6; }/* ↑ arriba-derecha */
  function repSet(pmax){ return els().filter(e=>MAIN.includes(e.group)&&e.period<=(pmax||6)); }
  const TYPE_CAT = { 'nonmetal':'No metal','noble-gas':'No metal','halogen':'No metal',
    'alkali-metal':'Metal','alkaline-earth':'Metal','transition-metal':'Metal','post-transition':'Metal','lanthanide':'Metal','actinide':'Metal',
    'metalloid':'Metaloide','unknown':'Metal' };
  function categoryOf(e){ return TYPE_CAT[e.type]||'Metal'; }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  /* ============================================================
     1) TEORÍA con ciclo MQC (8 temas oficiales)
  ============================================================ */
  const TEORIA = [
    { titulo:'Organización general de la Tabla Periódica', icon:'🗺️', html:`
      <p>La tabla periódica ordena los <strong>118 elementos</strong> conocidos según su <strong>número atómico</strong> (Z) creciente. No es una lista al azar: su forma esconde un patrón.</p>
      ${box('La idea clave','Elementos con propiedades parecidas quedan en la misma columna. La tabla es un mapa que permite PREDECIR, no solo consultar.','var(--gold)')}` },
    { titulo:'Períodos', icon:'➡️', html:`
      <p>Los <strong>períodos</strong> son las <strong>filas horizontales</strong> (hay 7). El número de período indica el <strong>último nivel de energía</strong> que tiene electrones.</p>
      ${box('Período = nivel','Un elemento del período 3 tiene electrones hasta el nivel 3. Así de directo.')}` },
    { titulo:'Grupos o familias', icon:'⬇️', html:`
      <p>Los <strong>grupos</strong> (o familias) son las <strong>columnas verticales</strong> (hay 18). Los elementos de un mismo grupo se parecen porque comparten el número de <strong>electrones de valencia</strong>.</p>
      ${box('Familias famosas','Grupo 1: metales alcalinos · Grupo 2: alcalinotérreos · Grupo 17: halógenos · Grupo 18: gases nobles.','var(--violet)')}` },
    { titulo:'Subniveles s, p, d, f y la forma de la tabla', icon:'🧩', html:`
      <p>Los elementos se organizan en la tabla según el <strong>subnivel de energía</strong> que están llenando: <strong>s</strong>, <strong>p</strong>, <strong>d</strong> o <strong>f</strong>. Esa organización crea cuatro regiones que se llaman <strong>bloques</strong> — pero ojo: el <em>bloque</em> es la región de la tabla; el <em>subnivel</em> es el concepto de energía que explica por qué esa región existe. No son la misma cosa: <strong>los elementos de un mismo bloque comparten el mismo tipo de subnivel que se está llenando</strong>.</p>
      <p>La forma de la tabla <em>no</em> es una regla arbitraria: <strong>es la consecuencia natural de cómo se llenan los subniveles</strong> (lo que viste en la Unidad II). Cada región (bloque) existe porque agrupa a los elementos que, en ese momento de su configuración electrónica, están llenando el mismo subnivel.</p>
      ${box('De dónde sale la forma','El bloque s ocupa los grupos 1-2 (subnivel s llenándose), el bloque p los grupos 13-18 (subnivel p), el bloque d los metales de transición (subnivel d), y el bloque f los lantánidos y actínidos (subnivel f). La "forma rara" de la tabla es, literalmente, el mapa de los subniveles — el bloque es solo el nombre de cada región de ese mapa.','var(--gold)')}` },
    { titulo:'Metales, no metales y metaloides', icon:'🪙', html:`
      <p>Los elementos se clasifican en tres grandes grupos por sus propiedades:</p>
      ${box('Metales','Mayoría de la tabla (izquierda y centro). Brillantes, buenos conductores, maleables y dúctiles.')}
      ${box('No metales','Arriba a la derecha. Malos conductores; muchos son gases. Incluyen los gases nobles.','var(--violet)')}
      ${box('Metaloides','La "escalera" entre ambos (B, Si, Ge, As…). Propiedades intermedias; clave en semiconductores.','var(--orange)')}` },
    { titulo:'Propiedades periódicas fundamentales', icon:'📈', html:`
      <p>Algunas propiedades cambian de forma <strong>predecible</strong> según la posición:</p>
      ${box('Radio atómico','Crece hacia ABAJO (más niveles) y hacia la IZQUIERDA. Ojo: NO crece hacia la derecha.','var(--red)')}
      ${box('Energía de ionización','Energía para quitar un electrón. Crece hacia ARRIBA y a la DERECHA.')}
      ${box('Electronegatividad','Fuerza con que atrae electrones. Crece hacia ARRIBA y a la DERECHA. El flúor es el máximo.','var(--gold)')}` },
    { titulo:'Configuración electrónica y posición', icon:'🧭', html:`
      <p>Aquí está el <strong>puente con la Unidad II</strong>: la configuración electrónica te da la posición exacta, sin memorizar.</p>
      ${box('Las dos reglas de oro','El <strong>último nivel</strong> = el período. Los <strong>electrones de valencia</strong> = el grupo (en elementos representativos).','var(--violet)')}
      ${box('Ejemplo','Termina en 3s² 3p⁵ → nivel 3 (período 3) y 7 de valencia (grupo 17): es un halógeno. ¡Lo dedujiste, no lo memorizaste!','var(--green)')}` },
    { titulo:'Aplicaciones, curiosidades e importancia', icon:'🌍', html:`
      <p>La tabla no es un adorno de aula: es una <strong>herramienta de predicción</strong> que usan químicos, ingenieros y médicos.</p>
      ${box('¿Para qué sirve?','Saber dónde está un elemento permite anticipar cómo reacciona, qué enlaces forma y para qué se usa.','var(--gold)')}` }
  ];

  const TOPIC_HINTS = {
    5:['¿Hacia dónde hay más niveles de energía? Ahí el átomo es más grande.','Electronegatividad y radio van "al revés": donde uno sube, el otro baja.'],
    6:['Período = último nivel. Grupo = electrones de valencia.','Cuenta los electrones del último nivel: ese número es el grupo (en representativos).']
  };

  function enrich(html,i){
    const tid='topic-'+i;
    let pre='';
    if(typeof MQC!=='undefined'){ pre+=MQC.detonante(UNIT_ID,tid); pre+=MQC.commit(UNIT_ID,tid); }
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
    /* Ilustración con viz: tendencias en el tema de propiedades */
    if(typeof VIZ!=='undefined' && i===5){
      body += `<div class="viz-box" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        ${VIZ.trendArrow('right','EN, ionización ↑',VIZ.COL.proton)}
        ${VIZ.trendArrow('down','Radio atómico ↑',C)}
      </div>`;
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
      return `<div class="u3-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u3-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u3-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u3-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">La tabla no se memoriza: se aprende a leer. En cada tema, <strong>comprométete con una respuesta</strong> antes de explorar.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u3-caret');
        const open=body.style.display==='block';
        body.style.display=open?'none':'block';
        if(caret)caret.style.transform=open?'rotate(0deg)':'rotate(180deg)';
        if(!open&&typeof MQC!=='undefined') MQC.bindCommit(body,UNIT_ID,'topic-'+i);
      });
    });
    cont.querySelectorAll('[data-read]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-read');
        const tid=`${UNIT_ID}-topic-${i}`;
        const yaLeidoAntes=(loadUnitData().topicsRead||[]).includes(tid); // FIX-XP-01
        markRead(tid); if(!yaLeidoAntes) awardXP('topic-read');
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
     2) SIMULADORES (3) — data-driven con viz.js + ELEMENTOS
  ============================================================ */
  function markSimDone(id,score){
    const u=loadUnitData(); const done=Array.isArray(u.simsDone)?u.simsDone.slice():[];
    if(!done.includes(id)){ done.push(id); patchUnit({simsDone:done}); awardXP(score>=100?'simulator-perfect':'simulator-done'); }
  }
  function renderSimuladores(unit,uData){
    const done=(uData&&uData.simsDone)?uData.simsDone:[];
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:simuladores'):'';
    const S=[
      {id:'sim-03-01',icon:'📈',name:'Tendencias periódicas',desc:'Pinta la tabla como mapa de calor y descubre cómo cambian las propiedades.'},
      {id:'sim-03-02',icon:'🔵',name:'Comparador de radio atómico',desc:'Predice y compara el tamaño de dos elementos.'},
      {id:'sim-03-03',icon:'🧩',name:'Constructor de la Tabla Periódica',desc:'Construye la tabla por niveles: ubica, identifica el bloque y clasifica.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u3-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres simuladores que leen los datos reales de los 118 elementos. ¿Quieres explorar libremente? ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:tabla'):''}</p>
      <div id="u3-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u3-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u3-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u3-stage"></div>`;
    document.getElementById('u3-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u3-stage');
    if(id==='sim-03-01')simTendencias(st);
    else if(id==='sim-03-02')simRadio(st);
    else if(id==='sim-03-03')simConstructor(st);
  }

  /* SIM 1 — Tendencias periódicas (heatmap) */
  function simTendencias(st){
    const PROPS={
      en:{label:'Electronegatividad',val:e=>e.en,reto:{q:'¿Quién tiene mayor electronegatividad?',a:'Flúor (F)',b:'Cesio (Cs)',ok:0}},
      radio:{label:'Radio atómico',val:radiusScore,reto:{q:'¿Quién tiene mayor radio atómico?',a:'Flúor (F)',b:'Cesio (Cs)',ok:1}},
      ion:{label:'Energía de ionización',val:ionScore,reto:{q:'¿A quién cuesta más quitarle un electrón?',a:'Flúor (F)',b:'Cesio (Cs)',ok:0}}
    };
    let prop='en', committed=false;
    function draw(){
      const set=repSet(6).filter(e=>PROPS[prop].val(e)!=null);
      const vals=set.map(e=>PROPS[prop].val(e));
      const min=Math.min(...vals), max=Math.max(...vals);
      const cells=set.map(e=>{ const t=(max>min)?(PROPS[prop].val(e)-min)/(max-min):.5;
        return {z:e.z,symbol:e.symbol,name:e.name+' · '+PROPS[prop].label,group:e.group,period:e.period,bg:VIZ.heatColor(t),sub:(prop==='en'&&e.en!=null)?e.en:''}; });
      const reto=PROPS[prop].reto;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;gap:.4rem;justify-content:center;flex-wrap:wrap;margin-bottom:.8rem">
          ${Object.keys(PROPS).map(k=>`<button class="btn ${k===prop?'btn-primary':'btn-ghost'} btn-sm" data-prop="${k}">${PROPS[k].label}</button>`).join('')}</div>
        ${!committed?`<div class="mqc-commit" style="margin-bottom:.8rem"><span class="mqc-badge">✋ Comprométete</span><p>${reto.q}</p>
          <div class="mqc-commit-opts"><button class="btn btn-ghost btn-sm" data-reto="0">${reto.a}</button><button class="btn btn-ghost btn-sm" data-reto="1">${reto.b}</button></div></div>`:''}
        <div style="overflow-x:auto">${VIZ.periodicGrid(cells)}</div>
        <div style="display:flex;gap:1.2rem;justify-content:center;margin-top:.8rem;flex-wrap:wrap">
          ${VIZ.trendArrow('right','↑ a la derecha',VIZ.COL.proton)} ${VIZ.trendArrow('down','↑ hacia abajo',C)}</div>
        <p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:.5rem">Mapa de calor de la propiedad (azul = bajo, rojo = alto). Solo elementos representativos.</p>
        <div id="u3t-fb" style="text-align:center;font-size:.85rem;margin-top:.4rem"></div></div>`;
      st.querySelectorAll('[data-prop]').forEach(b=>b.addEventListener('click',()=>{prop=b.getAttribute('data-prop');committed=false;draw();}));
      st.querySelectorAll('[data-reto]').forEach(b=>b.addEventListener('click',()=>{
        const ok=(+b.getAttribute('data-reto'))===reto.ok; committed=true; draw();
        const fb=st.querySelector('#u3t-fb'); fb.innerHTML=ok?'<span style="color:var(--green)">✓ ¡Bien! Mira el mapa y confírmalo.</span>':'<span style="color:var(--gold)">↪ Observa el mapa: la respuesta está en los colores.</span>';
        markSimDone('sim-03-01',ok?100:80);
      }));
    }
    draw();
  }

  /* SIM 2 — Comparador de radio atómico */
  function simRadio(st){
    const pool=repSet(6);
    let a=elByZ(9)||pool[0], b=elByZ(55)||pool[1], revealed=false, guess=null;
    function circle(e,r,col){ return VIZ.svg(`<circle cx="80" cy="80" r="${r}" fill="${col}" opacity=".25" stroke="${col}"/><text x="80" y="86" text-anchor="middle" font-size="22" fill="${col}" font-family="sans-serif">${e.symbol}</text>`,'0 0 160 160'); }
    function opts(sel){ return pool.map(e=>`<option value="${e.z}" ${e.z===sel.z?'selected':''}>${e.symbol} — ${e.name}</option>`).join(''); }
    function draw(){
      const ra=radiusScore(a), rb=radiusScore(b); const maxr=Math.max(ra,rb);
      const sa=20+40*(ra/maxr), sb=20+40*(rb/maxr);
      const bigger=ra>rb?a:b;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-bottom:.6rem">
          <select id="u3r-a" class="qi-overlay-input" style="margin:0">${opts(a)}</select>
          <select id="u3r-b" class="qi-overlay-input" style="margin:0">${opts(b)}</select></div>
        ${!revealed?`<div class="mqc-commit" style="margin-bottom:.6rem"><span class="mqc-badge">✋ Comprométete</span><p>¿Cuál tiene MAYOR radio atómico?</p>
          <div class="mqc-commit-opts"><button class="btn btn-ghost btn-sm" data-g="${a.z}">${a.symbol}</button><button class="btn btn-ghost btn-sm" data-g="${b.z}">${b.symbol}</button></div></div>`:
          `<div style="display:flex;align-items:flex-end;justify-content:center;gap:2rem">
            <div style="text-align:center">${circle(a,sa,C)}<div style="font-size:.8rem;color:var(--text-secondary)">${a.name}</div></div>
            <div style="text-align:center">${circle(b,sb,'var(--violet)')}<div style="font-size:.8rem;color:var(--text-secondary)">${b.name}</div></div></div>
          <p style="text-align:center;margin-top:.6rem;font-size:.88rem;color:var(--green)">Mayor radio: <strong>${bigger.name}</strong>. ${guess===bigger.z?'¡Acertaste!':'Revisa: ¿estaba más abajo o más a la izquierda?'}</p>
          <p style="text-align:center;font-size:.78rem;color:var(--text-muted)">El radio crece hacia abajo (más niveles) y hacia la izquierda.</p>`}
        </div>`;
      st.querySelector('#u3r-a').addEventListener('change',ev=>{a=elByZ(+ev.target.value);revealed=false;guess=null;draw();});
      st.querySelector('#u3r-b').addEventListener('change',ev=>{b=elByZ(+ev.target.value);revealed=false;guess=null;draw();});
      st.querySelectorAll('[data-g]').forEach(btn=>btn.addEventListener('click',()=>{guess=+btn.getAttribute('data-g');revealed=true;draw();markSimDone('sim-03-02',100);}));
    }
    draw();
  }

  /* SIM 3 — Constructor de la Tabla Periódica (3 niveles) */
  function simConstructor(st){
    const LV=[
      {id:'ubica',titulo:'Nivel 1 · Ubica en su grupo',tipo:'grupo',
       items:shuffle(repSet(3)).slice(0,6),pregunta:e=>`¿En qué GRUPO va ${e.name} (${e.symbol})? Pista: configuración ${e.config}`,
       ops:[1,2,13,14,15,16,17,18],ok:e=>e.group,fmt:g=>'Grupo '+g},
      {id:'bloque',titulo:'Nivel 2 · Identifica el bloque',tipo:'bloque',
       items:shuffle([elByZ(3),elByZ(9),elByZ(26),elByZ(20),elByZ(15),elByZ(30)].filter(Boolean)),pregunta:e=>`¿A qué BLOQUE pertenece ${e.name} (${e.symbol})? Config: ${e.config}`,
       ops:['s','p','d','f'],ok:e=>e.block,fmt:b=>'Bloque '+b},
      {id:'clasifica',titulo:'Nivel 3 · Clasifica',tipo:'cat',
       items:shuffle([elByZ(11),elByZ(17),elByZ(14),elByZ(26),elByZ(8),elByZ(5)].filter(Boolean)),pregunta:e=>`¿Cómo se clasifica ${e.name} (${e.symbol})?`,
       ops:['Metal','No metal','Metaloide'],ok:e=>categoryOf(e),fmt:c=>c}
    ];
    let lvIdx=0, state=null;
    function startLv(){ const lv=LV[lvIdx]; state={lv,i:0,correct:0,answered:false}; drawItem(); }
    function drawItem(){
      const lv=state.lv, e=lv.items[state.i];
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-weight:700;color:${C};font-size:.9rem">${lv.titulo}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.i+1}/${lv.items.length}</span></div>
        <div class="viz-box">${VIZ.svg(VIZ.nucleus(e.z>10?10:e.z,e.z,80,80,22),'0 0 160 160')}</div>
        <p style="text-align:center;font-size:.95rem;font-weight:700;color:var(--text-primary);margin-bottom:.8rem">${lv.pregunta(e)}</p>
        <div id="u3c-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${lv.ops.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${lv.fmt(o)}</button>`).join('')}</div>
        <div id="u3c-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>answer(b.getAttribute('data-o'))));
    }
    function answer(val){
      if(state.answered)return; state.answered=true;
      const lv=state.lv, e=lv.items[state.i], correctVal=String(lv.ok(e)); const ok=String(val)===correctVal;
      if(ok)state.correct++;
      st.querySelectorAll('#u3c-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===correctVal)b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u3c-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Correcto: '+lv.fmt(lv.ok(e))}</span>
        <br><button class="btn btn-primary btn-sm" id="u3c-next" style="margin-top:.5rem">${state.i<lv.items.length-1?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u3c-next').addEventListener('click',()=>{ if(state.i<lv.items.length-1){state.i++;state.answered=false;drawItem();} else finishLv(); });
    }
    function finishLv(){
      const lv=state.lv, passed=state.correct>=Math.ceil(lv.items.length*0.6);
      if(passed) markSimDone('sim-03-03', state.correct===lv.items.length?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${lv.titulo}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/${lv.items.length} correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u3c-nextlv" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u3c-retry" style="margin-top:.6rem">↻ Repetir nivel</button></div>`;
      const nb=st.querySelector('#u3c-nextlv'); if(nb)nb.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u3c-retry').addEventListener('click',startLv);
    }
    startLv();
  }

  /* ============================================================
     3) JUEGO — "¿Qué elemento soy?" (deductivo, datos reales)
  ============================================================ */
  function catName(e){ return categoryOf(e); }
  function famName(e){
    const T={'alkali-metal':'metal alcalino','alkaline-earth':'metal alcalinotérreo','halogen':'halógeno','noble-gas':'gas noble','transition-metal':'metal de transición','metalloid':'metaloide','nonmetal':'no metal','post-transition':'metal','lanthanide':'lantánido','actinide':'actínido'};
    return T[e.type]||'elemento';
  }
  function makeCase(level){
    const pool=(level===0)?els().filter(e=>e.z<=20&&MAIN.includes(e.group))
             :(level===1)?els().filter(e=>e.z<=36)
             :els().filter(e=>e.z<=54&&e.en!=null);
    const target=pool[Math.floor(Math.random()*pool.length)];
    /* pistas según nivel */
    let pistas=[];
    if(level===0){ pistas=[`Estoy en el grupo ${target.group} y el período ${target.period}.`,`Soy un ${famName(target)}.`]; }
    else if(level===1){ pistas=[`Pertenezco al bloque ${target.block} y al período ${target.period}.`,`Soy un ${famName(target)} con ${target.group?('grupo '+target.group):'posición especial'}.`]; }
    else { pistas=[`Mi electronegatividad ronda ${target.en}.`,`Soy un ${famName(target)}; un dato: ${target.fact||target.uses[0]}`]; }
    /* opciones: target + 3 distractores cercanos */
    const others=shuffle(pool.filter(e=>e.z!==target.z)).slice(0,3);
    const opciones=shuffle([target,...others]);
    return { pistas, opciones, okZ:target.z, target };
  }
  const GAME_LEVELS=[
    {id:'novato',nombre:'Novato',icon:'🔍',desc:'Adivina por grupo, período y familia.'},
    {id:'investigador',nombre:'Investigador',icon:'🧪',desc:'Adivina por bloque y familia.'},
    {id:'experto',nombre:'Experto',icon:'🎓',desc:'Adivina por propiedades y datos reales.'}
  ];
  const GAME_ROUNDS=5, GAME_PASS=3;
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  function renderJuego(unit,uData){
    const stt=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,stt.done),co=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;}).join('');
    return `<div class="u3-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">❓</span><div><h3 style="margin:0">¿Qué elemento soy?</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Deduce el elemento a partir de pistas sobre su posición y propiedades reales.</p></div></div>
        <div style="margin-top:.7rem;font-family:var(--font-code);font-size:.8rem;color:${C}">🏆 Mejor: ${stt.best} / 500</div></div>
      ${cards}</div>`;
  }
  function bindJuego(unit,uData){const c=document.getElementById('tab-content');if(!c)return;if(typeof Mentor!=='undefined')Mentor.bind(c);c.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));}
  function backLevels(){const c=document.getElementById('tab-content');if(!c)return;const f=loadUnitData();c.innerHTML=renderJuego(null,f);bindJuego(null,f);}
  function startLevel(idx){const lv=GAME_LEVELS[idx];if(!lv)return;game={idx,lv,round:0,score:0,correct:0,answered:false,caso:null};/*FIX-XP-02: sin XP por solo iniciar*/nextRound();}
  function nextRound(){ game.caso=makeCase(game.idx); game.answered=false; drawRound(); }
  function drawRound(){
    const c=document.getElementById('tab-content');if(!c||!game)return;const caso=game.caso;
    c.innerHTML=`<div style="animation:pageIn .35s ease">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u3g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.round+1}/${GAME_ROUNDS} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="text-align:center;font-size:1.05rem;font-weight:700;color:${C};margin-bottom:.8rem">¿Qué elemento soy?</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem 1rem;margin-bottom:1rem">${caso.pistas.map(p=>`<p style="margin:.25rem 0;font-size:.88rem;color:var(--text-secondary)">🔎 ${p}</p>`).join('')}</div>
        <div id="u3g-opts" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem">${caso.opciones.map(e=>`<button class="btn btn-ghost" data-z="${e.z}" style="height:auto;padding:.7rem">${e.symbol} — ${e.name}</button>`).join('')}</div>
        <div id="u3g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u3g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-z]').forEach(b=>b.addEventListener('click',()=>answerRound(+b.getAttribute('data-z'))));
  }
  function answerRound(z){
    if(!game||game.answered)return;game.answered=true;const caso=game.caso;const ok=z===caso.okZ;
    if(ok){game.correct++;game.score+=100;}
    const opts=document.getElementById('u3g-opts');
    opts.querySelectorAll('[data-z]').forEach(b=>{b.disabled=true;const bz=+b.getAttribute('data-z');if(bz===caso.okZ)b.style.borderColor='var(--green)';if(bz===z&&!ok)b.style.borderColor='var(--red)';});
    const t=caso.target;
    document.getElementById('u3g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.86rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Era '+t.symbol+' ('+t.name+')'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${t.name}: grupo ${t.group||'—'}, período ${t.period}, bloque ${t.block}. ${t.fact||''}</p></div>
      <button class="btn btn-primary btn-sm" id="u3g-next" style="margin-top:.8rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u3g-next').addEventListener('click',()=>{if(game.round<GAME_ROUNDS-1){game.round++;nextRound();}else finishLevel();});
  }
  function finishLevel(){
    if(!game)return;const passed=game.correct>=GAME_PASS,perfect=game.correct===GAME_ROUNDS,score=game.score;
    const stt=gameState();const done=stt.done.slice();const yaAprobadoAntes=done.includes(game.lv.id);if(passed&&!yaAprobadoAntes)done.push(game.lv.id);
    const jugadosAntes=Array.isArray(loadUnitData().gameLevelsPlayed)?loadUnitData().gameLevelsPlayed.slice():[];const yaJugadoAntes=jugadosAntes.includes(game.lv.id);const jugados=jugadosAntes.slice();if(!yaJugadoAntes)jugados.push(game.lv.id);
    patchUnit({gameScore:Math.max(stt.best,score),gameLevels:done,gameLevelsPlayed:jugados});
    // FIX-XP-02b: game-won/game-played UNA sola vez por nivel, no por intento
    if(passed&&!yaAprobadoAntes)awardXP('game-won');else if(!passed&&!yaJugadoAntes)awardXP('game-played');
    if(score>stt.best)awardXP('game-highscore');
    const c=document.getElementById('tab-content');const nx=game.idx+1,hay=nx<GAME_LEVELS.length,unlk=passed&&hay;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔍'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u3g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u3g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u3g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u3g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — PNEBank + distractores ligados a Insights
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U03)?window.PREGUNTAS_U03.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u03.js</code>.</p></div>`;
    return `<div id="u3-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Tabla Periódica</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u3-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u3-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u3-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u3-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u3-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u3-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u3-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u3-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u3-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u3-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u3-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();const yaOtorgadoAntes=!!u.examXpAwarded;patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1,examXpAwarded:u.examXpAwarded||passed});
    if(passed&&!yaOtorgadoAntes)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u3-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u3-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u3-exam-close">Cerrar</button></div>`;
    document.getElementById('u3-exam-retry').addEventListener('click',startExam);
    document.getElementById('u3-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO DE PLUGINS + MANIFEST MQC
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-03] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'período':'Fila horizontal de la tabla; indica el último nivel de energía (hay 7).',
        'grupo':'Columna vertical de la tabla; comparten electrones de valencia (hay 18).',
        'familia':'Otro nombre para un grupo de la tabla periódica.',
        'bloque':'Región de la tabla según el subnivel que se llena: s, p, d o f.',
        'metal':'Elemento brillante, buen conductor, maleable y dúctil; la mayoría de la tabla.',
        'no metal':'Elemento mal conductor; muchos son gases; a la derecha de la tabla.',
        'metaloide':'Elemento con propiedades intermedias entre metal y no metal (ej. silicio).',
        'metal alcalino':'Elementos del grupo 1 (excepto H); muy reactivos.',
        'halógeno':'Elementos del grupo 17; muy reactivos, forman sales.',
        'gas noble':'Elementos del grupo 18; muy estables (capa de valencia completa).',
        'radio atómico':'Tamaño del átomo; crece hacia abajo y hacia la izquierda.',
        'energía de ionización':'Energía para quitar un electrón; crece hacia arriba y a la derecha.',
        'electronegatividad':'Fuerza con que un átomo atrae electrones; máxima en el flúor.',
        'ley periódica':'Las propiedades se repiten de forma regular al ordenar por número atómico.',
        'número atómico':'Número de protones (Z); ordena la tabla periódica.'
      },
      mqc: {
        'topic-0':{ detonante:'Existen 118 elementos. ¿Por qué caben ordenados en una sola tabla y no en una lista enorme?', commit:{pregunta:'¿Según qué se ordenan los elementos en la tabla moderna?',opciones:['Su masa','Su número atómico','Su color'],correcta:1,explica:'Se ordenan por número atómico (Z) creciente.'}, conexion:'La tabla es uno de los mayores logros de organización de la ciencia.' },
        'topic-1':{ detonante:'¿Qué tienen en común todos los elementos de una misma fila?', commit:{pregunta:'El número de período indica…',opciones:['El número de protones','El último nivel de energía','La masa'],correcta:1,explica:'El período = último nivel de energía con electrones.'}, conexion:'Por eso el período 1 solo tiene 2 elementos: en el nivel 1 caben 2 electrones.' },
        'topic-2':{ detonante:'¿Por qué el sodio y el potasio reaccionan tan parecido?', commit:{pregunta:'Los elementos de un mismo grupo comparten…',opciones:['Los neutrones','Los electrones de valencia','La masa'],correcta:1,explica:'Comparten electrones de valencia, que mandan en la química.'}, conexion:'Las familias explican por qué ciertos elementos "se comportan en equipo".' },
        'topic-3':{ detonante:'¿Por qué la tabla tiene esa forma tan rara, con un bloque separado abajo?', commit:{pregunta:'Los bloques (s,p,d,f) salen de…',opciones:['El color','El subnivel que se llena','El peso'],correcta:1,explica:'Cada bloque corresponde al subnivel de energía que se está llenando.'}, conexion:'La forma de la tabla es, literalmente, el mapa de los subniveles de la Unidad II.' },
        'topic-4':{ detonante:'¿El oro y el azufre son la misma "clase" de elemento?', commit:{pregunta:'La mayoría de los elementos son…',opciones:['No metales','Metales','Metaloides'],correcta:1,explica:'La mayoría son metales (izquierda y centro de la tabla).'}, conexion:'Metales, no metales y metaloides explican desde los cables hasta los chips.' },
        'topic-5':{ detonante:'¿Quién es más grande, un átomo de litio o uno de flúor?', commit:{pregunta:'De izquierda a derecha en un período, el radio atómico…',opciones:['Aumenta','Disminuye'],correcta:1,explica:'Disminuye: el núcleo atrae con más fuerza a los electrones del mismo nivel.'}, conexion:'Las tendencias permiten predecir reactividad sin medir nada.' },
        'topic-6':{ detonante:'¿Puedes ubicar un elemento en la tabla solo con su configuración electrónica?', commit:{pregunta:'El grupo (en representativos) lo dan…',opciones:['Los neutrones','Los electrones de valencia','La masa'],correcta:1,explica:'Los electrones de valencia indican el grupo; el último nivel, el período.'}, conexion:'Aquí se unen la Unidad II y la III: configuración ↔ posición.' },
        'topic-7':{ detonante:'¿Por qué la tabla periódica sigue siendo útil 150 años después?', commit:{pregunta:'La tabla sirve sobre todo para…',opciones:['Decorar','Predecir comportamiento','Memorizar nombres'],correcta:1,explica:'Es una herramienta de predicción del comportamiento de los elementos.'}, conexion:'Desde la medicina hasta la tecnología, la tabla guía a la ciencia aplicada.' }
      },
      mentor: {
        'tab:teoria':'La tabla periódica asusta porque parece de memorizar. No lo es: es un mapa con reglas. Si entiendes períodos, grupos y subniveles, puedes leerla y predecir. Comprométete con cada respuesta antes de leer.',
        'tab:simuladores':'Pinta la tabla, compara tamaños y constrúyela tú. Antes de cada acción, predice: ¿qué esperas ver?',
        'tab:juego':'Deduce el elemento como un detective: usa la posición y las propiedades, no la memoria.',
        'tab:examen':'No busca que memorices la tabla, sino que sepas leerla. Si fallas, te muestro el error frecuente detrás.'
      },
      curiosidades: [
        {topic:'topic-0',texto:'El hidrógeno es el elemento más abundante del universo (~75% de la materia visible).'},
        {topic:'topic-4',texto:'El silicio (un metaloide) es la base de todos los microchips: sin él no habría computadoras.'},
        {topic:'topic-5',texto:'El flúor es el elemento más electronegativo de toda la tabla: "roba" electrones a casi todos.'},
        {topic:'topic-7',texto:'La tabla de Mendeléiev predijo elementos que aún no se habían descubierto… y acertó.'}
      ],
      errores: [
        {id:'e1',topic:'topic-5',creencia:'El tamaño del átomo crece hacia la derecha del período.',porque:'Se asume que "más protones = más grande".',correccion:'Es al revés: hacia la derecha el radio DISMINUYE, porque el núcleo atrae más a los electrones del mismo nivel.'},
        {id:'e2',topic:'topic-0',creencia:'La tabla se ordena por masa atómica.',porque:'Mendeléiev usó la masa y suele enseñarse así.',correccion:'La tabla moderna se ordena por número atómico (Z), no por masa.'},
        {id:'e3',topic:'topic-1',creencia:'Los grupos son las filas y los períodos las columnas.',porque:'Se confunden filas y columnas.',correccion:'Los períodos son las FILAS (horizontales); los grupos, las COLUMNAS (verticales).'},
        {id:'e4',topic:'topic-4',creencia:'Casi todos los elementos son no metales.',porque:'Los no metales son los más "famosos" (O, C, N).',correccion:'La mayoría de los elementos son METALES; los no metales son una minoría a la derecha.'},
        {id:'e5',topic:'topic-3',creencia:'El bloque d son no metales.',porque:'Se asocia "d" con algo distinto a los metales comunes.',correccion:'El bloque d son los metales de transición: hierro, cobre, oro… todos metales.'}
      ],
      xref: {
        'teoria:topic-3':[{type:'unit',unit:'unit-02',tab:'teoria',label:'Repasa configuración (Unidad II)'},{type:'section',section:'periodic-table',label:'Explora la tabla interactiva'}],
        'teoria:topic-5':[{tab:'simuladores',label:'Simulador: Tendencias periódicas'}],
        'teoria:topic-6':[{type:'unit',unit:'unit-02',tab:'teoria',label:'Configuración electrónica (Unidad II)'},{tab:'examen',label:'Ponte a prueba'}],
        'teoria:topic-4':[{tab:'simuladores',label:'Constructor: clasifica elementos'}],
        'sim:tabla':[{type:'section',section:'periodic-table',label:'Abrir Tabla Periódica interactiva'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U03)?window.BANCO_PNE_U03:null
    });
  }

})();
