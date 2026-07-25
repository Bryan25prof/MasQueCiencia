/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-08.js  |  UNIDAD VIII — "Ácidos y Bases"
   Experiencia: "El Equilibrio Invisible"
   ================================================================
   Octavo consumidor del sistema de plugins. Arquitectura MQC v1.0.
   Reutiliza toda la capa compartida (Storage, Gamification, Router,
   MQC, Glossary, CrossRef, Hints, Mentor*, Insights*, UnitMedia*,
   PNEBank*) — los marcados con * son opcionales y se degradan con
   guardas typeof, igual que unit-04.js. Sin sistemas nuevos.
   Tabs: unit-08:teoria · :simuladores · :juego · :examen
   ================================================================ */

(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

  const UNIT_ID = 'unit-08';
  const C = '#FF5722';   /* naranja/rojo — color temático oficial de la Unidad VIII (Identidad v2.0, unidades.js) */

  /* ── Accesos defensivos (idénticos al patrón oficial) ───────── */
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function round2(n){ return Math.round(n*100)/100; }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}
  function vbox(html){ return `<div class="viz-box" style="text-align:center;margin:.6rem 0">${html}</div>`; }

  /* ── Escala de pH reutilizable (sin depender de VIZ) ─────────── */
  /* Gradiente ácido→neutro→básico y una marca en el valor dado. */
  function phScale(ph, label){
    const pct = Math.max(0, Math.min(100, (ph/14)*100));
    return `<div style="max-width:340px;margin:0 auto">
      <div style="position:relative;height:22px;border-radius:var(--radius-full);
        background:linear-gradient(90deg,#e53935 0%,#fb8c00 20%,#fdd835 40%,#7cb342 50%,#26a69a 60%,#1e88e5 80%,#5e35b1 100%);">
        <div style="position:absolute;left:${pct}%;top:-6px;transform:translateX(-50%);width:2px;height:34px;background:var(--text-primary)"></div>
        <div style="position:absolute;left:${pct}%;top:-28px;transform:translateX(-50%);font-family:var(--font-code);font-size:.78rem;font-weight:700;color:${C};white-space:nowrap">${label!=null?label:ph}</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.68rem;color:var(--text-muted);margin-top:.3rem"><span>0 ácido</span><span>7 neutro</span><span>14 básico</span></div>
    </div>`;
  }
  function classifyPH(ph){
    if (typeof MQCChem!=='undefined' && MQCChem.classifyPH) return MQCChem.classifyPH(ph);
    if (ph < 3) return 'Ácido fuerte';
    if (ph < 6.5) return 'Ácido débil';
    if (ph <= 7.5) return 'Neutro';
    if (ph <= 11) return 'Básico débil';
    return 'Básico fuerte';
  }

  /* ── Sustancias reales para los simuladores/juego (pH aproximado) ── */
  const SUSTANCIAS = [
    {n:'Jugo gástrico', ph:1.5, icon:'🧫'},
    {n:'Jugo de limón', ph:2.2, icon:'🍋'},
    {n:'Vinagre', ph:2.9, icon:'🍶'},
    {n:'Refresco de cola', ph:3.2, icon:'🥤'},
    {n:'Café negro', ph:5.0, icon:'☕'},
    {n:'Leche', ph:6.6, icon:'🥛'},
    {n:'Agua pura', ph:7.0, icon:'💧'},
    {n:'Sangre humana', ph:7.4, icon:'🩸'},
    {n:'Agua de mar', ph:8.1, icon:'🌊'},
    {n:'Bicarbonato de sodio (disuelto)', ph:8.4, icon:'🥄'},
    {n:'Leche de magnesia', ph:10.5, icon:'💊'},
    {n:'Amoníaco doméstico', ph:11.5, icon:'🧴'},
    {n:'Jabón de manos', ph:9.5, icon:'🧼'},
    {n:'Destapador de cañería', ph:13.5, icon:'🚿'}
  ];

  /* ============================================================
     1) TEORÍA con ciclo MQC (9 temas oficiales, UNIDADES_DATA)
  ============================================================ */
  const TEORIA = [
    { titulo:'Teoría de Arrhenius', icon:'⚗️', html:`
      <p>Svante Arrhenius (1884) propuso la primera definición moderna: un <strong>ácido</strong> es una sustancia que en agua libera <strong>iones H⁺</strong>; una <strong>base</strong> libera <strong>iones OH⁻</strong>.</p>
      <p>Ejemplo: HCl → H⁺ + Cl⁻ (ácido). NaOH → Na⁺ + OH⁻ (base).</p>
      ${box('El límite de Arrhenius','Solo funciona en agua y solo explica bases que ya traen el grupo OH⁻ en su fórmula. ¿Qué pasa con el amoníaco (NH₃), que es base pero no tiene OH⁻? Esa pregunta abre la puerta a la siguiente teoría.','var(--gold)')}` },
    { titulo:'Teoría de Brønsted-Lowry', icon:'🔄', html:`
      <p>En 1923, Brønsted y Lowry ampliaron la idea: un <strong>ácido</strong> es quien <strong>dona un protón (H⁺)</strong>; una <strong>base</strong> es quien <strong>acepta un protón</strong>. Ya no depende del agua ni del OH⁻.</p>
      <p>Ejemplo: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Aquí el agua dona un H⁺ (actúa como ácido) y el amoníaco lo acepta (actúa como base).</p>
      ${box('Por qué importa','Esta definición explica el NH₃ como base sin necesidad de que tenga OH⁻ en su fórmula: lo que importa es el protón que se transfiere.','var(--green)')}` },
    { titulo:'Teoría de Lewis', icon:'🧠', html:`
      <p>Gilbert Lewis propuso la definición más amplia: un <strong>ácido</strong> es quien <strong>acepta un par de electrones</strong>; una <strong>base</strong> es quien <strong>dona un par de electrones</strong>. No necesita ni H⁺ ni agua.</p>
      <p>Ejemplo: BF₃ (sin hidrógenos ácidos) acepta un par de electrones de NH₃: por Lewis, BF₃ es ácido.</p>
      ${box('Las tres teorías conviven','No se "reemplazan": cada una es más amplia que la anterior. Arrhenius ⊂ Brønsted-Lowry ⊂ Lewis. Para la mayoría de reacciones en agua, con Brønsted-Lowry basta.','var(--violet)')}` },
    { titulo:'Ácidos y bases conjugados', icon:'👯', html:`
      <p>Cuando un ácido dona su protón, lo que queda es su <strong>base conjugada</strong>. Cuando una base acepta un protón, lo que se forma es su <strong>ácido conjugado</strong>.</p>
      <p>Ejemplo: HCl (ácido) → Cl⁻ (su base conjugada). H₂O (base) → H₃O⁺ (su ácido conjugado).</p>
      ${box('Pares, no sustancias sueltas','Todo equilibrio ácido-base tiene DOS pares conjugados enfrentados. Identificarlos es la habilidad clave de Brønsted-Lowry.','var(--blue, #00A8CC)')}` },
    { titulo:'Autoionización del agua (Kw)', icon:'💧', html:`
      <p>Incluso el agua pura reacciona consigo misma: H₂O + H₂O ⇌ H₃O⁺ + OH⁻. A 25 °C, el producto de sus concentraciones es constante: <strong>Kw = [H⁺][OH⁻] = 1×10⁻¹⁴</strong>.</p>
      ${box('La base matemática del pH','Como Kw es constante, si sube [H⁺] baja [OH⁻] y viceversa: siempre se compensan. Esta relación es la que hace posible calcular el pH.','var(--gold)')}` },
    { titulo:'pH y pOH', icon:'📏', html:`
      <p>El <strong>pH</strong> mide qué tan ácida o básica es una solución: <strong>pH = −log[H⁺]</strong>. El <strong>pOH = −log[OH⁻]</strong>. Por la autoionización del agua: <strong>pH + pOH = 14</strong>.</p>
      <p>Escala de 0 a 14: menor a 7 es ácido, igual a 7 es neutro, mayor a 7 es básico.</p>
      ${box('Ojo con el signo menos','Como es un logaritmo NEGATIVO, a MÁS [H⁺] corresponde MENOR pH. Un ácido fuerte tiene mucho H⁺ y pH bajo, no alto.','var(--red)')}` },
    { titulo:'Indicadores ácido-base', icon:'🎨', html:`
      <p>Un <strong>indicador</strong> es una sustancia que cambia de color según el pH del medio. La fenolftaleína es incolora en ácido y rosada en básico; el papel tornasol vira de azul a rojo en ácido.</p>
      ${box('Para qué sirven','Permiten "ver" el pH sin instrumentos: son clave en la titulación, para detectar el punto en que el ácido y la base se han neutralizado exactamente.','var(--green)')}` },
    { titulo:'Neutralización y titulación', icon:'⚖️', html:`
      <p>En una <strong>neutralización</strong>, un ácido y una base reaccionan formando sal y agua: HCl + NaOH → NaCl + H₂O. La <strong>titulación</strong> es la técnica para medir exactamente cuánta base neutraliza a un ácido (o viceversa), agregando volumen controlado hasta el <strong>punto de equivalencia</strong>.</p>
      ${box('Punto de equivalencia ≠ pH 7 siempre','Si el ácido y la base son ambos fuertes, el punto de equivalencia es pH 7. Pero si uno es débil, el punto de equivalencia puede quedar por encima o por debajo de 7 (lo verás con la hidrólisis de sales).','var(--orange)')}` },
    { titulo:'Hidrólisis de sales', icon:'🧂', html:`
      <p>Algunas sales, al disolverse en agua, hacen que la solución no quede neutra. La sal de un ácido fuerte con una base débil da una solución <strong>ácida</strong> (ej. NH₄Cl); la sal de una base fuerte con un ácido débil da una solución <strong>básica</strong> (ej. NaHCO₃, bicarbonato).</p>
      ${box('Conexión con la vida cotidiana','Por eso el bicarbonato de sodio disuelto en agua da un pH ligeramente básico (~8.4): es la sal de un ácido débil (carbónico) con una base fuerte (NaOH).','var(--gold)')}` }
  ];

  const TOPIC_HINTS = {
    1:['Brønsted-Lowry: piensa en quién ENTREGA el protón (ácido) y quién lo RECIBE (base).','No necesitas que haya OH⁻ para tener una base.'],
    5:['El signo menos del logaritmo invierte el orden: más H⁺ = menor pH.','Recuerda: pH + pOH = 14 siempre (a 25 °C).']
  };

  function enrich(html,i){
    const tid='topic-'+i;
    let pre='';
    if(typeof MQC!=='undefined'){ pre+=MQC.detonante(UNIT_ID,tid); pre+=MQC.commit(UNIT_ID,tid); }
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
    if(i===5){ body+=vbox(phScale(7,'pH')); }
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
      return `<div class="u8-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u8-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u8-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u8-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Una idea recorre toda la unidad: ácido y base son dos caras de un mismo equilibrio que se transfiere. <strong>Comprométete con una respuesta</strong> antes de leer cada tema.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u8-caret');
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
      {id:'sim-08-01',icon:'💊',name:'pH-metro virtual',desc:'Predice el pH de sustancias reales y compruébalo en la escala.'},
      {id:'sim-08-02',icon:'🧪',name:'Titulación ácido-base',desc:'Agrega base gota a gota y encuentra el punto de equivalencia.'},
      {id:'sim-08-03',icon:'📖',name:'Teorías ácido-base',desc:'Clasifica reacciones según Arrhenius, Brønsted-Lowry o Lewis.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u8-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres experiencias para comprender el equilibrio ácido-base con sustancias reales. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:acido-base'):''}</p>
      <div id="u8-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u8-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u8-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u8-stage"></div>`;
    document.getElementById('u8-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u8-stage');
    if(id==='sim-08-01')simPHMetro(st);
    else if(id==='sim-08-02')simTitulacion(st);
    else if(id==='sim-08-03')simTeorias(st);
  }

  /* SIM 1 — pH-metro virtual */
  function simPHMetro(st){
    const pool=shuffle(SUSTANCIAS.slice());
    let idx=0,committed=false,guess=null;
    function s(){return pool[idx];}
    function opts(){return pool.map((x,i)=>`<option value="${i}" ${i===idx?'selected':''}>${x.icon} ${x.n}</option>`).join('');}
    function reveal(){
      const sub=s(); const real=classifyPH(sub.ph); const ok=guess===real;
      const poh=(typeof MQCChem!=='undefined'&&MQCChem.pohFromPh)?MQCChem.pohFromPh(sub.ph):round2(14-sub.ph);
      return `${vbox(phScale(sub.ph))}<p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">
        ${ok?'<span style="color:var(--green)">✓ ¡Acertaste!</span>':`<span style="color:var(--gold)">Era <strong>${real}</strong>.</span>`}
        pH real: <strong>${sub.ph}</strong> · pOH ≈ <strong>${poh}</strong>.</p>`;
    }
    function draw(){
      const sub=s();
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.6rem"><select id="u8p-sub" class="qi-overlay-input" style="margin:0">${opts()}</select></div>
        <div style="text-align:center;font-size:2.4rem">${sub.icon}</div>
        <p style="text-align:center;font-weight:700;color:var(--text-primary);margin:.3rem 0 .8rem">${sub.n}</p>
        ${!committed?`<div class="mqc-commit" style="margin:.6rem 0"><span class="mqc-badge">✋ Comprométete</span><p>¿Cómo clasificarías su pH?</p>
          <div class="mqc-commit-opts">${['Ácido fuerte','Ácido débil','Neutro','Básico débil','Básico fuerte'].map(t=>`<button class="btn btn-ghost btn-sm" data-guess="${t}">${t}</button>`).join('')}</div></div>`:reveal()}
      </div>`;
      st.querySelector('#u8p-sub').addEventListener('change',ev=>{idx=+ev.target.value;committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(btn=>btn.addEventListener('click',()=>{guess=btn.getAttribute('data-guess');committed=true;draw();markSimDone('sim-08-01',guess===classifyPH(s().ph)?100:80);}));
    }
    draw();
  }

  /* SIM 2 — Titulación ácido-base (curva simplificada, apta para 10°) */
  function simTitulacion(st){
    /* Ácido fuerte 25 mL x 0.1 M titulado con base fuerte 0.1 M.
       Modelo simplificado: cerca de la equivalencia el pH sube abruptamente. */
    const V0=25, C0=0.1, CB=0.1;
    const EQ=V0*C0/CB; /* mL de base para el punto de equivalencia */
    let added=0, revealedEq=false, guessEq=null;
    function phAt(vb){
      const chemOK = typeof MQCChem!=='undefined' && MQCChem.pH && MQCChem.phFromPoh;
      if (vb<=0) return chemOK?MQCChem.pH(C0):round2(-Math.log10(C0));
      const molesH=V0*C0/1000, molesOH=vb*CB/1000;
      const totalV=(V0+vb)/1000;
      const excess=molesH-molesOH;
      if (Math.abs(excess) < 1e-9) return 7;
      if (excess>0){ const cH=excess/totalV; return chemOK?MQCChem.pH(cH):round2(-Math.log10(cH)); }
      const cOH=(-excess)/totalV;
      if (chemOK){ return MQCChem.phFromPoh(-Math.log10(cOH)); }
      const pOHv=-Math.log10(cOH); return round2(14-pOHv);
    }
    function draw(){
      const ph=phAt(added);
      const cerca=Math.abs(added-EQ)<0.6;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <p style="text-align:center;font-size:.85rem;color:var(--text-muted);margin-bottom:.4rem">25 mL de HCl 0.1 M + NaOH 0.1 M gota a gota</p>
        ${vbox(phScale(ph))}
        <p style="text-align:center;font-family:var(--font-code);font-size:.85rem;color:var(--text-secondary);margin:.5rem 0">Agregado: <strong>${round2(added)} mL</strong> de NaOH · pH ≈ <strong>${ph}</strong> ${cerca?'<span style="color:var(--gold)">· ¡cerca del vire!</span>':''}</p>
        <div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:.8rem">
          <button class="btn btn-ghost btn-sm" data-add="1">+1 mL</button>
          <button class="btn btn-ghost btn-sm" data-add="5">+5 mL</button>
          <button class="btn btn-ghost btn-sm" data-add="0.2">+0.2 mL</button>
          <button class="btn btn-ghost btn-sm" data-reset="1">↻ Reiniciar</button>
        </div>
        ${!revealedEq?`<div class="mqc-commit"><span class="mqc-badge">✋ Comprométete</span><p>¿Cuántos mL de NaOH necesitarás para neutralizar exactamente el ácido?</p>
          <div class="mqc-commit-opts">${[Math.round(EQ*0.5),Math.round(EQ),Math.round(EQ*1.5),Math.round(EQ*2)].map(v=>`<button class="btn btn-ghost btn-sm" data-eq="${v}">${v} mL</button>`).join('')}</div></div>`
          :`<p style="text-align:center;font-size:.88rem;color:${guessEq===Math.round(EQ)?'var(--green)':'var(--gold)'}">El punto de equivalencia real es <strong>${round2(EQ)} mL</strong> (pH 7, ácido y base fuertes en igual concentración).</p>`}
      </div>`;
      st.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{added=Math.min(added+parseFloat(b.getAttribute('data-add')),60);draw();
        if(Math.abs(added-EQ)<0.3 && !revealedEq){ markSimDone('sim-08-02',95); }}));
      const rb=st.querySelector('[data-reset]'); if(rb)rb.addEventListener('click',()=>{added=0;draw();});
      st.querySelectorAll('[data-eq]').forEach(b=>b.addEventListener('click',()=>{guessEq=+b.getAttribute('data-eq');revealedEq=true;draw();markSimDone('sim-08-02',guessEq===Math.round(EQ)?100:85);}));
    }
    draw();
  }

  /* SIM 3 — Teorías ácido-base (3 niveles, como el Laboratorio de Lewis en U4) */
  function simTeorias(st){
    const LV=[
      {titulo:'Nivel 1 · Arrhenius',
       items:[
         {texto:'HCl → H⁺ + Cl⁻',resp:'Ácido'},
         {texto:'NaOH → Na⁺ + OH⁻',resp:'Base'},
         {texto:'HNO₃ → H⁺ + NO₃⁻',resp:'Ácido'},
         {texto:'KOH → K⁺ + OH⁻',resp:'Base'}],
       pregunta:it=>`Según Arrhenius, ${it.texto} es un(a):`,
       ops:()=>['Ácido','Base'],ok:it=>it.resp},
      {titulo:'Nivel 2 · Brønsted-Lowry (¿quién dona el protón?)',
       items:[
         {texto:'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻',resp:'El agua'},
         {texto:'HCl + H₂O ⇌ H₃O⁺ + Cl⁻',resp:'El HCl'},
         {texto:'HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻',resp:'El agua'},
         {texto:'CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺',resp:'El CH₃COOH'}],
       pregunta:it=>`En ${it.texto}, ¿quién dona el protón (actúa como ácido)?`,
       ops:()=>['El agua','El HCl','El CH₃COOH','La HCO₃⁻'].filter((v,i,a)=>a.indexOf(v)===i),
       ok:it=>it.resp,raw:true},
      {titulo:'Nivel 3 · Lewis (¿acepta o dona el par de electrones?)',
       items:[
         {texto:'BF₃ acepta un par de e⁻ de NH₃',resp:'Ácido de Lewis'},
         {texto:'NH₃ dona un par de e⁻ a BF₃',resp:'Base de Lewis'},
         {texto:'Ag⁺ acepta pares de e⁻ de NH₃',resp:'Ácido de Lewis'},
         {texto:'H₂O dona un par de e⁻ a H⁺',resp:'Base de Lewis'}],
       pregunta:it=>`${it.texto}. Esta sustancia actúa como:`,
       ops:()=>['Ácido de Lewis','Base de Lewis'],ok:it=>it.resp}
    ];
    let lvIdx=0,state=null;
    function startLv(){state={lv:LV[lvIdx],i:0,correct:0,answered:false};drawItem();}
    function drawItem(){
      const lv=state.lv,it=lv.items[state.i];const ops=lv.ops(it);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">${lv.titulo}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.i+1}/${lv.items.length}</span></div>
        <p style="text-align:center;font-size:.95rem;font-weight:700;color:var(--text-primary);margin:.4rem 0 .8rem">${lv.pregunta(it)}</p>
        <div id="u8t-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${ops.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o}</button>`).join('')}</div>
        <div id="u8t-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>answer(b.getAttribute('data-o'))));
    }
    function answer(val){
      if(state.answered)return;state.answered=true;
      const lv=state.lv,it=lv.items[state.i],correctVal=String(lv.ok(it));const ok=String(val)===correctVal;
      if(ok)state.correct++;
      st.querySelectorAll('#u8t-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===correctVal)b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u8t-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Correcto: '+correctVal}</span><br><button class="btn btn-primary btn-sm" id="u8t-next" style="margin-top:.5rem">${state.i<lv.items.length-1?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u8t-next').addEventListener('click',()=>{if(state.i<lv.items.length-1){state.i++;state.answered=false;drawItem();}else finishLv();});
    }
    function finishLv(){
      const lv=state.lv,passed=state.correct>=Math.ceil(lv.items.length*0.6);
      if(passed)markSimDone('sim-08-03',state.correct===lv.items.length?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${lv.titulo}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/${lv.items.length} correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u8t-nextlv" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u8t-retry" style="margin-top:.6rem">↻ Repetir nivel</button></div>`;
      const nb=st.querySelector('#u8t-nextlv');if(nb)nb.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u8t-retry').addEventListener('click',startLv);
    }
    startLv();
  }

  /* ============================================================
     3) JUEGO — "¿Ácido o Base?" (clasificar sustancias reales)
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'🔍',desc:'Clasifica la sustancia como ácido, neutro o básico.'},
    {id:'conocedor',nombre:'Conocedor',icon:'📏',desc:'Clasifica también por fuerza (fuerte/débil).'},
    {id:'experto',nombre:'Experto',icon:'🏆',desc:'Ordena varias sustancias de menor a mayor pH.'}
  ];
  const GAME_ROUNDS=6,GAME_PASS=4;
  let game=null;

  function levelState(){ const u=loadUnitData(); return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]}; }
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}

  function renderJuego(unit,uData){
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const stt=levelState();
    const cards=GAME_LEVELS.map((lv,i)=>{
      const unlocked=isUnlocked(i,stt.done), done=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done?'var(--green)':(unlocked?C:'var(--border)')};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${unlocked?1:.55}">
        <span style="font-size:2rem">${unlocked?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${lv.nombre}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${lv.desc}</div>${done?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Superado</div>':''}</div>
        <button class="btn btn-primary btn-sm" data-play="${i}" ${unlocked?'':'disabled'}>${unlocked?'▶ Jugar':'🔒'}</button></div>`;
    }).join('');
    return `<div class="u8-game" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;margin:.6rem 0 1rem"><p style="color:var(--text-secondary);font-size:.9rem;margin:0">Clasifica sustancias reales por su pH. Cada nivel sube la dificultad.</p>
      <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">🏆 ${stt.best} pts</span></div>
      <div id="u8-game-host">${cards}</div></div>`;
  }
  function bindJuego(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));
  }
  function backLevels(){ const f=loadUnitData(); const c=document.getElementById('tab-content'); if(c){c.innerHTML=renderJuego(null,f);bindJuego(null,f);} }

  function startLevel(idx){
    const host=document.getElementById('u8-game-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u8g-back" style="margin-bottom:.75rem">← Volver a niveles</button><div id="u8g-stage"></div>`;
    document.getElementById('u8g-back').addEventListener('click',backLevels);
    game={idx,round:0,correct:0,score:0};
    nextRound();
  }
  function nextRound(){
    const c=document.getElementById('u8g-stage'); if(!c||!game)return;
    if(game.round>=GAME_ROUNDS){ finishLevel(); return; }
    const lv=GAME_LEVELS[game.idx];
    if(lv.id==='experto'){
      const trio=shuffle(SUSTANCIAS.slice()).slice(0,3);
      const order=[...trio].sort((a,b)=>a.ph-b.ph);
      let picks=[];
      c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">Ronda ${game.round+1}/${GAME_ROUNDS}</span></div>
        <p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">Toca las sustancias en orden de <strong>menor a mayor pH</strong>:</p>
        <div id="u8g-trio" style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin:.8rem 0">${trio.map((s,i)=>`<button class="btn btn-ghost" data-i="${i}" style="flex-direction:column;height:auto;padding:.8rem">
          <span style="font-size:1.8rem">${s.icon}</span><span style="font-size:.75rem;display:block">${s.n}</span></button>`).join('')}</div>
        <div id="u8g-picked" style="text-align:center;font-family:var(--font-code);font-size:.85rem;color:var(--text-muted)"></div>
        <div id="u8g-fb" style="text-align:center;margin-top:.6rem"></div></div>`;
      const btns=c.querySelectorAll('#u8g-trio [data-i]');
      btns.forEach(b=>b.addEventListener('click',()=>{
        const i=+b.getAttribute('data-i'); if(picks.includes(i))return;
        picks.push(i); b.disabled=true; b.style.borderColor='var(--gold)';
        c.querySelector('#u8g-picked').textContent=picks.map(p=>trio[p].n).join(' → ');
        if(picks.length===3){
          const chosen=picks.map(p=>trio[p]); const ok=JSON.stringify(chosen.map(x=>x.n))===JSON.stringify(order.map(x=>x.n));
          if(ok){game.correct++;game.score+=20;}
          c.querySelector('#u8g-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Orden correcto!':'✗ El orden correcto era: '+order.map(x=>x.n).join(' → ')}</span><br><button class="btn btn-primary btn-sm" id="u8g-next" style="margin-top:.5rem">Siguiente →</button>`;
          c.querySelector('#u8g-next').addEventListener('click',()=>{game.round++;nextRound();});
        }
      }));
      return;
    }
    const sub=shuffle(SUSTANCIAS.slice())[0];
    const strong=lv.id==='conocedor';
    const answerCorrect=strong?classifyPH(sub.ph):(sub.ph<6.5?'Ácido':sub.ph>7.5?'Básico':'Neutro');
    const opciones=strong?['Ácido fuerte','Ácido débil','Neutro','Básico débil','Básico fuerte']:['Ácido','Neutro','Básico'];
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">Ronda ${game.round+1}/${GAME_ROUNDS}</span></div>
      <div style="text-align:center;font-size:2.6rem">${sub.icon}</div>
      <p style="text-align:center;font-weight:700;color:var(--text-primary);margin:.3rem 0 .8rem">${sub.n}</p>
      <div id="u8g-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${opciones.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o}</button>`).join('')}</div>
      <div id="u8g-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
    c.querySelectorAll('#u8g-ops [data-o]').forEach(b=>b.addEventListener('click',()=>{
      const val=b.getAttribute('data-o'); const ok=val===answerCorrect;
      if(ok){game.correct++;game.score+=15;}
      c.querySelectorAll('#u8g-ops [data-o]').forEach(x=>{x.disabled=true;if(x.getAttribute('data-o')===answerCorrect)x.style.borderColor='var(--green)';if(x===b&&!ok)x.style.borderColor='var(--red)';});
      c.querySelector('#u8g-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Era: '+answerCorrect}</span> <span style="color:var(--text-muted)">(pH real ${sub.ph})</span><br><button class="btn btn-primary btn-sm" id="u8g-next" style="margin-top:.5rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Terminar'}</button>`;
      c.querySelector('#u8g-next').addEventListener('click',()=>{game.round++;nextRound();});
    }));
  }
  function finishLevel(){
    const c=document.getElementById('u8g-stage'); if(!c||!game)return;
    const lv=GAME_LEVELS[game.idx]; const passed=game.correct>=GAME_PASS; const perfect=game.correct===GAME_ROUNDS;
    const stt=levelState();
    let done=stt.done.slice(); if(passed&&!done.includes(lv.id))done.push(lv.id);
    const best=Math.max(stt.best,game.score);
    patchUnit({gameScore:best,gameLevels:done});
    if(passed)awardXP(perfect?'game-highscore':'game-won'); else awardXP('game-played');
    const unlk=passed && game.idx<GAME_LEVELS.length-1 && !stt.done.includes(GAME_LEVELS[game.idx+1] ? GAME_LEVELS[game.idx+1].id : '');
    const nx=game.idx+1;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔍'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${game.score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk&&GAME_LEVELS[nx]?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${game.score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u8g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u8g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u8g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u8g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 preguntas, 35 min, 70%) + PNE
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U08)?window.PREGUNTAS_U08.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u08.js</code>.</p></div>`;
    return `<div id="u8-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Ácidos y Bases</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u8-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u8-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u8-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u8-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u8-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u8-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u8-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u8-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u8-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u8-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u8-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1});
    if(passed)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u8-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u8-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u8-exam-close">Cerrar</button></div>`;
    document.getElementById('u8-exam-retry').addEventListener('click',startExam);
    document.getElementById('u8-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO DE PLUGINS + MANIFEST MQC
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-08] Plugins registrados: teoria, simuladores, juego, examen.');

  const MQC_MAP = {
    'topic-0':{ detonante:'¿Qué tienen en común el jugo de limón y el vinagre?', commit:{pregunta:'Según Arrhenius, un ácido en agua libera…',opciones:['Iones OH⁻','Iones H⁺','Electrones libres'],correcta:1,explica:'Arrhenius: ácido = libera H⁺ en agua; base = libera OH⁻.'}, conexion:'El limón sabe agrio porque libera H⁺ en tu saliva: eso es un ácido de Arrhenius.' },
    'topic-1':{ detonante:'El amoníaco (NH₃) es base, pero no tiene OH⁻ en su fórmula. ¿Cómo se explica?', commit:{pregunta:'Según Brønsted-Lowry, una base es quien…',opciones:['Dona un protón','Acepta un protón','Dona electrones'],correcta:1,explica:'Brønsted-Lowry: base = acepta H⁺, sin importar si tiene OH⁻.'}, conexion:'Por eso el amoníaco de limpieza puede ser base sin tener OH⁻ en su fórmula.' },
    'topic-2':{ detonante:'¿Puede haber un ácido que no tenga ni un solo hidrógeno?', commit:{pregunta:'Según Lewis, un ácido es quien…',opciones:['Acepta un par de electrones','Dona un par de electrones','Libera H⁺'],correcta:0,explica:'Lewis: ácido = acepta un par de electrones (no necesita H).'}, conexion:'Esto explica compuestos como el BF₃, que actúan como ácidos sin tener hidrógenos ácidos.' },
    'topic-3':{ detonante:'Cuando el HCl dona su protón, ¿qué queda?', commit:{pregunta:'La base conjugada del HCl es…',opciones:['H⁺','Cl⁻','HCl₂'],correcta:1,explica:'Al donar su H⁺, el HCl deja Cl⁻: su base conjugada.'}, conexion:'Identificar pares conjugados es clave para leer cualquier equilibrio ácido-base.' },
    'topic-4':{ detonante:'¿Puede el agua pura reaccionar consigo misma?', commit:{pregunta:'El valor de Kw a 25 °C es…',opciones:['1×10⁻⁷','1×10⁻¹⁴','14'],correcta:1,explica:'Kw = [H⁺][OH⁻] = 1×10⁻¹⁴ a 25 °C.'}, conexion:'Esta constante es la base matemática de toda la escala de pH.' },
    'topic-5':{ detonante:'¿Por qué un ácido fuerte tiene pH BAJO y no alto?', commit:{pregunta:'A MAYOR concentración de H⁺, el pH es…',opciones:['Mayor','Menor','Igual'],correcta:1,explica:'pH=−log[H⁺]: por el signo negativo, más H⁺ da menor pH.'}, conexion:'Por eso el jugo gástrico (mucho H⁺) tiene pH cercano a 1-2, no a 14.' },
    'topic-6':{ detonante:'¿Cómo sabes exactamente cuándo un ácido quedó neutralizado, sin medidor de pH?', commit:{pregunta:'Un indicador ácido-base sirve para…',opciones:['Cambiar el pH','Mostrar el pH con un cambio de color','Aumentar la concentración'],correcta:1,explica:'Los indicadores cambian de color según el pH; no alteran la reacción principal.'}, conexion:'La fenolftaleína es la que usarás para detectar el punto de equivalencia en la titulación.' },
    'topic-7':{ detonante:'¿Cómo mides EXACTAMENTE cuánta base neutraliza a un ácido?', commit:{pregunta:'El punto de equivalencia es cuando…',opciones:['Se acaba el indicador','Ácido y base reaccionaron en proporción exacta','El pH siempre es 7'],correcta:1,explica:'Es el punto donde reaccionaron en proporción estequiométrica exacta; el pH exacto depende de la fuerza del ácido/base.'}, conexion:'Con ácido y base fuertes, ese punto cae justo en pH 7.' },
    'topic-8':{ detonante:'¿Por qué el bicarbonato de sodio disuelto en agua da un pH básico si no tiene OH⁻?', commit:{pregunta:'La sal de un ácido débil con una base fuerte da una solución…',opciones:['Ácida','Básica','Siempre neutra'],correcta:1,explica:'La hidrólisis de esa sal genera OH⁻ extra: da una solución básica (ej. bicarbonato, pH≈8.4).'}, conexion:'Por eso el bicarbonato se usa para "cortar" acidez estomacal: es una base suave por hidrólisis.' }
  };
  if(typeof MQC!=='undefined') MQC.register(UNIT_ID, MQC_MAP);

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'ácido (Arrhenius)':'Sustancia que en agua libera iones H⁺.',
        'base (Arrhenius)':'Sustancia que en agua libera iones OH⁻.',
        'ácido (Brønsted-Lowry)':'Sustancia que dona un protón (H⁺).',
        'base (Brønsted-Lowry)':'Sustancia que acepta un protón (H⁺).',
        'ácido (Lewis)':'Sustancia que acepta un par de electrones.',
        'base (Lewis)':'Sustancia que dona un par de electrones.',
        'base conjugada':'Lo que queda de un ácido después de donar su protón.',
        'ácido conjugado':'Lo que se forma cuando una base acepta un protón.',
        'Kw':'Producto iónico del agua: [H⁺][OH⁻] = 1×10⁻¹⁴ a 25 °C.',
        'pH':'Medida de acidez: pH = −log[H⁺].',
        'pOH':'Medida de basicidad: pOH = −log[OH⁻]. pH + pOH = 14.',
        'indicador':'Sustancia que cambia de color según el pH del medio.',
        'neutralización':'Reacción entre un ácido y una base que forma sal y agua.',
        'titulación':'Técnica para medir el volumen exacto de una solución que neutraliza a otra.',
        'punto de equivalencia':'Momento de una titulación donde ácido y base reaccionaron en proporción exacta.',
        'hidrólisis de sales':'Reacción de una sal con el agua que puede volver la solución ácida o básica.'
      },
      mqc: MQC_MAP,
      mentor: {
        'tab:teoria':'Ácidos y bases suenan a memorizar fórmulas, pero es una sola idea: quién da y quién recibe (un protón o un par de electrones). Si entiendes eso, las tres teorías son la misma historia contada con más detalle.',
        'tab:simuladores':'Antes de ver el pH real, comprométete con tu predicción. Equivocarte aquí es parte de aprender a "sentir" la escala.',
        'tab:juego':'Piensa en sustancias que conoces: limón, jabón, bicarbonato. Tu experiencia cotidiana ya sabe más química de la que crees.',
        'tab:examen':'No memorices "ácido = pH bajo": razona desde [H⁺] y el logaritmo. Si fallas, te muestro el error frecuente detrás.'
      },
      curiosidades: [
        {topic:'topic-4',texto:'Incluso el agua más pura del mundo tiene una pequeñísima cantidad de H⁺ y OH⁻: reacciona consigo misma.'},
        {topic:'topic-5',texto:'El café tiene pH cercano a 5, más ácido que la leche (pH ≈ 6.6), aunque ambos son bebidas cotidianas.'},
        {topic:'topic-8',texto:'El bicarbonato de sodio es básico en agua aunque no tenga OH⁻ en su fórmula: es un efecto de hidrólisis.'}
      ],
      errores: [
        {id:'e1',topic:'topic-5',creencia:'Un ácido fuerte tiene pH alto.',porque:'Se olvida el signo negativo del logaritmo.',correccion:'A mayor [H⁺], MENOR es el pH. Los ácidos fuertes tienen pH bajo (cercano a 0-2).'},
        {id:'e2',topic:'topic-0',creencia:'Todas las bases tienen OH⁻ en su fórmula.',porque:'Se generaliza la definición de Arrhenius a todos los casos.',correccion:'Brønsted-Lowry y Lewis explican bases (como el NH₃) que son básicas sin tener OH⁻ en su fórmula.'},
        {id:'e3',topic:'topic-7',creencia:'El punto de equivalencia siempre es pH 7.',porque:'Se generaliza el caso ácido fuerte + base fuerte.',correccion:'Solo es pH 7 cuando ambos son fuertes. Si uno es débil, el punto de equivalencia puede ser distinto de 7 (ver hidrólisis de sales).'},
        {id:'e4',topic:'topic-6',creencia:'Un indicador cambia el pH de la solución.',porque:'Se confunde "mostrar" con "modificar".',correccion:'El indicador solo revela el pH cambiando de color; no participa en la reacción principal.'}
      ],
      xref: {
        'teoria:topic-1':[{type:'unit',unit:'unit-04',tab:'teoria',label:'Enlace y transferencia de electrones (Unidad IV)'}],
        'teoria:topic-5':[{tab:'simuladores',label:'pH-metro virtual'}],
        'teoria:topic-7':[{tab:'simuladores',label:'Titulación ácido-base'}],
        'teoria:topic-8':[{type:'unit',unit:'unit-09',tab:'teoria',label:'Lo verás también en Oxidación-Reducción (Unidad IX)'}],
        'sim:acido-base':[{type:'section',section:'periodic-table',label:'Abrir la Tabla interactiva'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U08)?window.BANCO_PNE_U08:null
    });
  }

})();
