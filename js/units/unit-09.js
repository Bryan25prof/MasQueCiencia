/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-09.js  |  UNIDAD IX — "Oxidación y Reducción"
   Experiencia: "La Danza de los Electrones"
   ================================================================
   MQC Experience 09 — última unidad del curso. Arquitectura v1.0 +
   Design System v2.0 (café, #795548). Reutiliza MQCChem
   (oxidationState, galvanicCell, esOxidante/esReductor) agregado en
   esta misma sesión de forma aditiva, y toda la capa compartida.
   Sin sistemas nuevos.
   Tabs: unit-09:teoria · :simuladores · :juego · :examen
   ================================================================ */
(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'unit-09';
  const C = '#795548';   /* café — color temático de la Unidad IX, Oxidación y Reducción (Identidad v2.0) */

  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function CHEM(){ return (typeof MQCChem!=='undefined')?MQCChem:null; }
  function sub(f){ return String(f).replace(/(\d+)/g,'<sub>$1</sub>'); }
  function fmtNox(n){ return n==null?'?':(n>0?'+'+n:(''+n)); }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  /* ============================================================
     1) TEORÍA (8 temas, según unidades.js)
  ============================================================ */
  const TEORIA = [
    { titulo:'Número de oxidación: reglas', icon:'🔢', html:`
      <p>El <strong>número de oxidación (Nox)</strong> es la carga que tendría un átomo si todos sus enlaces fueran 100% iónicos. Reglas básicas: elemento libre = 0; ion monoatómico = su carga; <strong>O = −2</strong> (casi siempre); <strong>H = +1</strong> (casi siempre); metales del grupo 1 = +1, grupo 2 = +2; <strong>F = −1</strong> siempre. La suma de los Nox en un compuesto neutro = 0 (o = la carga, si es un ion).</p>
      ${box('Truco para el "elemento raro"','En KMnO₄: K=+1, O=−2×4=−8. Para que sume 0, Mn debe ser +7. Siempre puedes despejar el elemento que no conoces si ya sabes los demás.','var(--gold)')}` },
    { titulo:'Cambios de número de oxidación', icon:'📈', html:`
      <p>En una reacción redox, algunos átomos <strong>cambian</strong> su Nox: uno sube (se oxida) y otro baja (se reduce). Si ningún átomo cambia de Nox, la reacción <strong>no es</strong> redox (por ejemplo, una simple neutralización ácido-base no lo es).</p>
      ${box('Cómo detectarlo','Calcula el Nox de cada elemento antes y después. Si alguno cambió, hay oxidación-reducción.','var(--green)')}` },
    { titulo:'Agentes oxidantes y reductores', icon:'🔄', html:`
      <p><strong>Oxidación</strong> = pérdida de electrones (el Nox sube). <strong>Reducción</strong> = ganancia de electrones (el Nox baja). El <strong>agente reductor</strong> es quien SE oxida (dona electrones, causa que otro se reduzca); el <strong>agente oxidante</strong> es quien SE reduce (acepta electrones, causa que otro se oxide).</p>
      ${box('Nemotecnia clásica','"OIL RIG": Oxidation Is Loss (de electrones), Reduction Is Gain (de electrones). El que pierde electrones se oxida; el que gana, se reduce.','var(--violet)')}` },
    { titulo:'Semirreacciones de oxidación y reducción', icon:'✂️', html:`
      <p>Toda reacción redox se puede separar en dos <strong>semirreacciones</strong>: una de oxidación (pierde e⁻) y una de reducción (gana e⁻). Ejemplo: Zn → Zn²⁺ + 2e⁻ (oxidación) y Cu²⁺ + 2e⁻ → Cu (reducción).</p>
      ${box('Los electrones no se pierden en el aire','Los electrones que libera la oxidación son EXACTAMENTE los que consume la reducción: por eso deben balancearse en número.','var(--blue, #00A8CC)')}` },
    { titulo:'Balanceo por ion-electrón', icon:'🧮', html:`
      <p>Método para balancear ecuaciones redox: se separan las semirreacciones, se balancean átomos y cargas por separado (agregando H₂O, H⁺ u OH⁻ según el medio), y luego se igualan los electrones perdidos y ganados antes de sumar ambas semirreacciones.</p>
      ${box('Nivel introductorio','En 10° normalmente se trabaja con casos sencillos en medio ácido; el objetivo es entender la lógica del método, no dominar casos complejos.','var(--gold)')}` },
    { titulo:'Balanceo por cambio de número de oxidación', icon:'⚖️', html:`
      <p>Método alternativo: se identifica cuánto sube y cuánto baja el Nox de los átomos que cambian, y se usan esos números como coeficientes para igualar electrones perdidos y ganados, ajustando el resto de la ecuación por tanteo.</p>
      ${box('Cuándo usar cuál','El método de Nox suele ser más rápido para ecuaciones moleculares sencillas; ion-electrón es mejor cuando hay iones en disolución.','var(--green)')}` },
    { titulo:'Celdas electroquímicas (galvánicas)', icon:'🔋', html:`
      <p>Una <strong>celda galvánica</strong> (o voltaica) convierte energía química en energía eléctrica usando una reacción redox espontánea. Tiene un <strong>ánodo</strong> (donde ocurre la oxidación, pierde electrones) y un <strong>cátodo</strong> (donde ocurre la reducción, gana electrones). Los electrones fluyen del ánodo al cátodo por un cable externo.</p>
      ${box('Así funciona una pila','Una pila común es justamente esto: dos electrodos distintos generan una diferencia de potencial (voltaje) que impulsa una corriente eléctrica.','var(--gold)')}` },
    { titulo:'Electrólisis', icon:'⚡', html:`
      <p>La <strong>electrólisis</strong> es lo opuesto a la celda galvánica: se usa <strong>energía eléctrica externa</strong> para forzar una reacción redox que NO ocurriría espontáneamente (por ejemplo, separar agua en H₂ y O₂).</p>
      ${box('Espontánea vs forzada','Celda galvánica: la reacción química espontánea PRODUCE electricidad. Electrólisis: la electricidad FUERZA una reacción no espontánea. Son procesos inversos.','var(--red)')}` }
  ];

  const TOPIC_HINTS = {
    0:['O casi siempre es −2; H casi siempre es +1. Despeja el elemento que falta para que la suma dé 0.','En un ion, la suma de los Nox debe dar la carga del ion, no 0.'],
    2:['El que SE reduce es el agente OXIDANTE (le quita electrones al otro).','El que SE oxida es el agente REDUCTOR (le da electrones al otro).']
  };

  function enrich(html,i){
    const tid='topic-'+i; let pre='';
    if(typeof MQC!=='undefined'){ pre+=MQC.detonante(UNIT_ID,tid); pre+=MQC.commit(UNIT_ID,tid); }
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
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
      return `<div class="u9-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u9-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u9-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u9-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Toda esta unidad es una sola idea: los electrones se mueven de un átomo a otro. <strong>Comprométete con una respuesta</strong> antes de leer cada tema.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u9-caret');
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
     2) SIMULADORES (3) — reutilizan MQCChem
  ============================================================ */
  function markSimDone(id,score){
    const u=loadUnitData(); const done=Array.isArray(u.simsDone)?u.simsDone.slice():[];
    if(!done.includes(id)){ done.push(id); patchUnit({simsDone:done}); awardXP(score>=100?'simulator-perfect':'simulator-done'); }
  }
  function renderSimuladores(unit,uData){
    const done=(uData&&uData.simsDone)?uData.simsDone:[];
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:simuladores'):'';
    const S=[
      {id:'sim-09-01',icon:'🔢',name:'Calculador Nox',desc:'Calcula el número de oxidación del elemento clave en compuestos reales.'},
      {id:'sim-09-02',icon:'⚡',name:'Celda galvánica virtual',desc:'Arma una pila con dos metales y predice ánodo, cátodo y voltaje.'},
      {id:'sim-09-03',icon:'⚖️',name:'Balanceo redox',desc:'Identifica qué se oxida y qué se reduce en reacciones reales.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u9-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres experiencias para ver el movimiento de electrones en acción. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:redox'):''}</p>
      <div id="u9-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u9-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u9-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u9-stage"></div>`;
    document.getElementById('u9-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u9-stage');
    if(id==='sim-09-01')simNox(st);
    else if(id==='sim-09-02')simCelda(st);
    else if(id==='sim-09-03')simBalanceo(st);
  }

  /* Compuestos curados para el Calculador Nox: {formula, foco (símbolo a adivinar), nombre} */
  const COMPUESTOS_NOX = [
    { f:'KMnO4',  foco:'Mn', nombre:'permanganato de potasio' },
    { f:'H2SO4',  foco:'S',  nombre:'ácido sulfúrico' },
    { f:'Fe2O3',  foco:'Fe', nombre:'óxido de hierro(III)' },
    { f:'CO2',    foco:'C',  nombre:'dióxido de carbono' },
    { f:'HNO3',   foco:'N',  nombre:'ácido nítrico' },
    { f:'MnO2',   foco:'Mn', nombre:'dióxido de manganeso' },
    { f:'SO2',    foco:'S',  nombre:'dióxido de azufre' },
    { f:'Na2SO4', foco:'S',  nombre:'sulfato de sodio' },
    { f:'CO',     foco:'C',  nombre:'monóxido de carbono' },
    { f:'CaCO3',  foco:'C',  nombre:'carbonato de calcio' }
  ];

  /* SIM 1 — Calculador Nox (reutiliza MQCChem.oxidationState) */
  function simNox(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    const pool=shuffle(COMPUESTOS_NOX.slice());
    let idx=0,committed=false,guess=null;
    function cur(){return pool[idx];}
    function opts(){return pool.map((x,i)=>`<option value="${i}" ${i===idx?'selected':''}>${sub(x.f)} — ${x.nombre}</option>`).join('');}
    function reveal(){
      const it=cur(); const nox=chem.oxidationState(it.f); const real=nox[it.foco];
      const ok = guess === real;
      return `<div style="text-align:center;margin:.6rem 0">
        ${Object.keys(nox).map(s=>`<span style="display:inline-block;margin:.2rem;padding:.3rem .6rem;border-radius:var(--radius-md);background:${s===it.foco?'var(--bg-elevated)':'transparent'};border:1px solid ${s===it.foco?C:'var(--border)'};font-family:var(--font-code)">${s}: <strong style="color:${s===it.foco?C:'var(--text-secondary)'}">${fmtNox(nox[s])}</strong></span>`).join('')}
      </div>
      <p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">
        ${ok?'<span style="color:var(--green)">✓ ¡Acertaste!</span>':`<span style="color:var(--gold)">El Nox real de ${it.foco} es <strong>${fmtNox(real)}</strong>.</span>`}</p>`;
    }
    function draw(){
      const it=cur();
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.6rem"><select id="u9n-c" class="qi-overlay-input" style="margin:0">${opts()}</select></div>
        <p style="text-align:center;font-family:var(--font-code);font-size:1.3rem;color:${C};margin:.3rem 0 .8rem">${sub(it.f)}</p>
        ${!committed?`<div class="mqc-commit" style="margin:.6rem 0"><span class="mqc-badge">✋ Comprométete</span><p>¿Cuál es el número de oxidación de <strong>${it.foco}</strong> en este compuesto?</p>
          <div class="mqc-commit-opts">${['0','+1','+2','+3','+4','+5','+6','+7','-1','-2'].map(o=>`<button class="btn btn-ghost btn-sm" data-guess="${o}">${o.replace('-','−')}</button>`).join('')}</div></div>`:reveal()}
      </div>`;
      st.querySelector('#u9n-c').addEventListener('change',ev=>{idx=+ev.target.value;committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(btn=>btn.addEventListener('click',()=>{
        guess=parseInt(btn.getAttribute('data-guess'),10);committed=true;draw();
        const nox=chem.oxidationState(cur().f);
        markSimDone('sim-09-01',guess===nox[cur().foco]?100:80);
      }));
    }
    draw();
  }

  /* SIM 2 — Celda galvánica virtual (reutiliza MQCChem.galvanicCell) */
  function simCelda(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    const metales=chem.POTENCIALES;
    let iA=3,iB=7,committed=false,guess=null; /* Zn vs Cu por defecto */
    function draw(){
      const a=metales[iA],b=metales[iB];
      const cell=chem.galvanicCell(a.sym,b.sym);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;gap:.6rem;justify-content:center;margin-bottom:.6rem;flex-wrap:wrap">
          <select id="u9c-a" class="qi-overlay-input" style="margin:0">${metales.map((m,i)=>`<option value="${i}" ${i===iA?'selected':''}>${m.par}</option>`).join('')}</select>
          <select id="u9c-b" class="qi-overlay-input" style="margin:0">${metales.map((m,i)=>`<option value="${i}" ${i===iB?'selected':''}>${m.par}</option>`).join('')}</select>
        </div>
        ${!committed?`<div class="mqc-commit"><span class="mqc-badge">✋ Comprométete</span><p>Entre <strong>${a.sym}</strong> y <strong>${b.sym}</strong>, ¿cuál será el ánodo (el que SE OXIDA)?</p>
          <div class="mqc-commit-opts"><button class="btn btn-ghost btn-sm" data-g="${a.sym}">${a.sym}</button><button class="btn btn-ghost btn-sm" data-g="${b.sym}">${b.sym}</button></div></div>`
          :`<div style="text-align:center">
            <p style="font-size:.9rem;color:var(--text-secondary)">${ok(cell)?'<span style="color:var(--green)">✓ ¡Correcto!</span>':'<span style="color:var(--gold)">No exactamente.</span>'}</p>
            <div style="display:flex;justify-content:center;gap:2rem;margin:.8rem 0">
              <div><div style="font-size:.75rem;color:var(--text-muted)">ÁNODO (se oxida)</div><div style="font-family:var(--font-code);font-size:1.2rem;color:var(--red)">${cell.anodo.sym}</div><div style="font-size:.7rem;color:var(--text-muted)">E° = ${cell.anodo.E} V</div></div>
              <div style="font-size:1.5rem;color:${C}">→ e⁻ →</div>
              <div><div style="font-size:.75rem;color:var(--text-muted)">CÁTODO (se reduce)</div><div style="font-family:var(--font-code);font-size:1.2rem;color:var(--green)">${cell.catodo.sym}</div><div style="font-size:.7rem;color:var(--text-muted)">E° = ${cell.catodo.E} V</div></div>
            </div>
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem;display:inline-block">
              <div style="font-size:.75rem;color:var(--text-muted)">Voltaje de la celda</div>
              <div style="font-family:var(--font-code);font-size:1.5rem;font-weight:700;color:${C}">${cell.voltaje} V</div>
            </div></div>`}
      </div>`;
      st.querySelector('#u9c-a').addEventListener('change',e=>{iA=+e.target.value;committed=false;guess=null;draw();});
      st.querySelector('#u9c-b').addEventListener('change',e=>{iB=+e.target.value;committed=false;guess=null;draw();});
      st.querySelectorAll('[data-g]').forEach(btn=>btn.addEventListener('click',()=>{
        guess=btn.getAttribute('data-g');committed=true;draw();
        markSimDone('sim-09-02',ok(chem.galvanicCell(a.sym,b.sym))?100:80);
      }));
    }
    function ok(cell){ return guess===cell.anodo.sym; }
    draw();
  }

  /* SIM 3 — Balanceo redox: identificar qué se oxida y qué se reduce (3 niveles) */
  const REACCIONES_REDOX = [
    { ec:'Zn + Cu²⁺ → Zn²⁺ + Cu', oxida:'Zn', reduce:'Cu²⁺' },
    { ec:'Fe + 2H⁺ → Fe²⁺ + H₂',  oxida:'Fe', reduce:'H⁺' },
    { ec:'Mg + Cl₂ → MgCl₂',       oxida:'Mg', reduce:'Cl₂' },
    { ec:'2Na + Cl₂ → 2NaCl',      oxida:'Na', reduce:'Cl₂' },
    { ec:'Cu + 2Ag⁺ → Cu²⁺ + 2Ag', oxida:'Cu', reduce:'Ag⁺' }
  ];
  function simBalanceo(st){
    let idx=0,answered=false,correct=0;
    function it(){return REACCIONES_REDOX[idx];}
    function draw(){
      const r=it();
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">Reacción ${idx+1}/${REACCIONES_REDOX.length}</span></div>
        <p style="text-align:center;font-family:var(--font-code);font-size:1.1rem;color:var(--text-primary);margin:.6rem 0 1rem">${sub(r.ec)}</p>
        <p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">¿Qué especie <strong>SE OXIDA</strong> (agente reductor)?</p>
        <div id="u9b-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center;margin-bottom:.8rem">${shuffle([r.oxida,r.reduce]).map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${sub(o)}</button>`).join('')}</div>
        <div id="u9b-fb" style="text-align:center;font-size:.86rem"></div></div>`;
      st.querySelectorAll('#u9b-ops [data-o]').forEach(b=>b.addEventListener('click',()=>answer(b.getAttribute('data-o'))));
    }
    function answer(val){
      if(answered)return;answered=true;const r=it();const ok=val===r.oxida;if(ok)correct++;
      st.querySelectorAll('#u9b-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===r.oxida)b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u9b-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ '+sub(r.oxida)+' se oxida (pierde electrones); '+sub(r.reduce)+' se reduce.'}</span><br><button class="btn btn-primary btn-sm" id="u9b-next" style="margin-top:.5rem">${idx<REACCIONES_REDOX.length-1?'Siguiente →':'Terminar'}</button>`;
      st.querySelector('#u9b-next').addEventListener('click',()=>{if(idx<REACCIONES_REDOX.length-1){idx++;answered=false;draw();}else finish();});
    }
    function finish(){
      const passed=correct>=Math.ceil(REACCIONES_REDOX.length*0.6);
      if(passed)markSimDone('sim-09-03',correct===REACCIONES_REDOX.length?100:90);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">Balanceo redox</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${correct}/${REACCIONES_REDOX.length} correctas</p>
        <button class="btn btn-ghost btn-sm" id="u9b-retry" style="margin-top:.6rem">↻ Repetir</button></div>`;
      st.querySelector('#u9b-retry').addEventListener('click',()=>{idx=0;answered=false;correct=0;draw();});
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Oxidante vs Reductor"
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'🔍',desc:'Identifica quién se oxida y quién se reduce.'},
    {id:'conocedor',nombre:'Conocedor',icon:'🧭',desc:'Identifica el agente oxidante y el agente reductor.'},
    {id:'experto',nombre:'Experto',icon:'🏆',desc:'Predice ánodo, cátodo y voltaje de una celda.'}
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
    return `<div class="u9-game" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;margin:.6rem 0 1rem"><p style="color:var(--text-secondary);font-size:.9rem;margin:0">Reconoce el movimiento de electrones en reacciones reales. Cada nivel sube la dificultad.</p>
      <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">🏆 ${stt.best} pts</span></div>
      <div id="u9-game-host">${cards}</div></div>`;
  }
  function bindJuego(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));
  }
  function backLevels(){ const f=loadUnitData(); const c=document.getElementById('tab-content'); if(c){c.innerHTML=renderJuego(null,f);bindJuego(null,f);} }
  function startLevel(idx){
    const host=document.getElementById('u9-game-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u9g-back" style="margin-bottom:.75rem">← Volver a niveles</button><div id="u9g-stage"></div>`;
    document.getElementById('u9g-back').addEventListener('click',backLevels);
    game={idx,round:0,correct:0,score:0};
    nextRound();
  }
  function nextRound(){
    const c=document.getElementById('u9g-stage'); if(!c||!game)return;
    if(game.round>=GAME_ROUNDS){ finishLevel(); return; }
    const lv=GAME_LEVELS[game.idx]; const chem=CHEM();
    if(lv.id==='experto' && chem){
      const metales=chem.POTENCIALES; const iA=Math.floor(Math.random()*metales.length); let iB=Math.floor(Math.random()*metales.length); while(iB===iA)iB=Math.floor(Math.random()*metales.length);
      const a=metales[iA],b=metales[iB]; const cell=chem.galvanicCell(a.sym,b.sym);
      c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">Ronda ${game.round+1}/${GAME_ROUNDS}</span></div>
        <p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">Celda con <strong>${a.sym}</strong> (E°=${a.E} V) y <strong>${b.sym}</strong> (E°=${b.E} V). ¿Cuál es el <strong>CÁTODO</strong>?</p>
        <div id="u9g-ops" style="display:flex;gap:.5rem;justify-content:center;margin:.8rem 0">${shuffle([a.sym,b.sym]).map(s=>`<button class="btn btn-ghost btn-sm" data-o="${s}">${s}</button>`).join('')}</div>
        <div id="u9g-fb" style="text-align:center;font-size:.86rem"></div></div>`;
      c.querySelectorAll('#u9g-ops [data-o]').forEach(b=>b.addEventListener('click',()=>{
        const val=b.getAttribute('data-o'); const ok=val===cell.catodo.sym; if(ok){game.correct++;game.score+=20;}
        c.querySelectorAll('#u9g-ops [data-o]').forEach(x=>{x.disabled=true;if(x.getAttribute('data-o')===cell.catodo.sym)x.style.borderColor='var(--green)';if(x===b&&!ok)x.style.borderColor='var(--red)';});
        c.querySelector('#u9g-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Era '+cell.catodo.sym}</span> <span style="color:var(--text-muted)">(voltaje: ${cell.voltaje} V)</span><br><button class="btn btn-primary btn-sm" id="u9g-next" style="margin-top:.5rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Terminar'}</button>`;
        c.querySelector('#u9g-next').addEventListener('click',()=>{game.round++;nextRound();});
      }));
      return;
    }
    const r=REACCIONES_REDOX[Math.floor(Math.random()*REACCIONES_REDOX.length)];
    const askOxidante = lv.id==='conocedor';
    const correcto = askOxidante ? r.reduce : r.oxida; /* el que SE reduce ES el oxidante */
    const pregunta = askOxidante ? '¿Cuál es el <strong>agente oxidante</strong> (el que SE REDUCE)?' : '¿Qué especie <strong>SE OXIDA</strong>?';
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">Ronda ${game.round+1}/${GAME_ROUNDS}</span></div>
      <p style="text-align:center;font-family:var(--font-code);font-size:1.05rem;color:var(--text-primary);margin:.5rem 0">${sub(r.ec)}</p>
      <p style="text-align:center;font-size:.88rem;color:var(--text-secondary)">${pregunta}</p>
      <div id="u9g-ops" style="display:flex;gap:.5rem;justify-content:center;margin:.7rem 0">${shuffle([r.oxida,r.reduce]).map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${sub(o)}</button>`).join('')}</div>
      <div id="u9g-fb" style="text-align:center;font-size:.86rem"></div></div>`;
    c.querySelectorAll('#u9g-ops [data-o]').forEach(b=>b.addEventListener('click',()=>{
      const val=b.getAttribute('data-o'); const ok=val===correcto; if(ok){game.correct++;game.score+=15;}
      c.querySelectorAll('#u9g-ops [data-o]').forEach(x=>{x.disabled=true;if(x.getAttribute('data-o')===correcto)x.style.borderColor='var(--green)';if(x===b&&!ok)x.style.borderColor='var(--red)';});
      c.querySelector('#u9g-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Era '+sub(correcto)}</span><br><button class="btn btn-primary btn-sm" id="u9g-next" style="margin-top:.5rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Terminar'}</button>`;
      c.querySelector('#u9g-next').addEventListener('click',()=>{game.round++;nextRound();});
    }));
  }
  function finishLevel(){
    const c=document.getElementById('u9g-stage'); if(!c||!game)return;
    const lv=GAME_LEVELS[game.idx]; const passed=game.correct>=GAME_PASS; const perfect=game.correct===GAME_ROUNDS;
    const stt=levelState(); let done=stt.done.slice(); if(passed&&!done.includes(lv.id))done.push(lv.id);
    const best=Math.max(stt.best,game.score);
    patchUnit({gameScore:best,gameLevels:done});
    if(passed)awardXP(perfect?'game-highscore':'game-won'); else awardXP('game-played');
    const nx=game.idx+1; const unlk=passed && game.idx<GAME_LEVELS.length-1;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔍'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${game.score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk&&GAME_LEVELS[nx]?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${game.score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u9g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u9g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u9g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u9g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 de 30, 30 min, 70%) + PNE
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U09)?window.PREGUNTAS_U09.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u09.js</code>.</p></div>`;
    return `<div id="u9-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Oxidación y Reducción</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u9-exam-start">▶ Comenzar examen</button>
        <p style="font-size:.78rem;color:var(--gold);margin-top:1rem">🎓 ¡Esta es la última Experience del curso! Al aprobarla, completas las 9 unidades.</p></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u9-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u9-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u9-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u9-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u9-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u9-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u9-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u9-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u9-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u9-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1});
    if(passed)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u9-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎓':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Curso completado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      ${passed?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:1rem">🎉 ¡Completaste las 9 unidades de Química Interactiva 10°!</p>`:''}
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u9-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u9-exam-close">Cerrar</button></div>`;
    document.getElementById('u9-exam-retry').addEventListener('click',startExam);
    document.getElementById('u9-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO + MANIFEST
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-09] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'número de oxidación (Nox)':'Carga que tendría un átomo si todos sus enlaces fueran iónicos.',
        'oxidación':'Pérdida de electrones; el Nox de un átomo sube.',
        'reducción':'Ganancia de electrones; el Nox de un átomo baja.',
        'agente oxidante':'Sustancia que SE reduce y provoca la oxidación de otra.',
        'agente reductor':'Sustancia que SE oxida y provoca la reducción de otra.',
        'semirreacción':'Cada una de las dos mitades (oxidación y reducción) de una reacción redox.',
        'balanceo ion-electrón':'Método de balanceo redox que separa semirreacciones y balancea átomos y cargas.',
        'celda galvánica':'Dispositivo que convierte una reacción redox espontánea en electricidad.',
        'ánodo':'Electrodo donde ocurre la oxidación (pierde electrones).',
        'cátodo':'Electrodo donde ocurre la reducción (gana electrones).',
        'electrólisis':'Uso de electricidad externa para forzar una reacción redox no espontánea.',
        'potencial estándar de reducción (E°)':'Medida de la tendencia de una especie a reducirse (ganar electrones).'
      },
      mqc: {
        'topic-0':{ detonante:'En KMnO₄, K es +1 y cada O es −2. ¿Qué le toca al Mn para que todo sume 0?', commit:{pregunta:'La suma de los Nox en un compuesto neutro debe dar…',opciones:['0','La carga del catión','Siempre 8'],correcta:0,explica:'En un compuesto neutro, la suma de los Nox es 0.'}, conexion:'Así puedes calcular el Nox de cualquier elemento "raro" si ya sabes los demás.' },
        'topic-1':{ detonante:'¿Toda reacción química es una reacción redox?', commit:{pregunta:'Si ningún átomo cambia su Nox, la reacción…',opciones:['Es redox','No es redox','Es siempre espontánea'],correcta:1,explica:'Sin cambio de Nox, no hay oxidación-reducción.'}, conexion:'Por eso una neutralización ácido-base simple no es redox.' },
        'topic-2':{ detonante:'¿Por qué el que "gana" electrones se llama agente OXIDANTE y no "reductor"?', commit:{pregunta:'El agente oxidante es la especie que…',opciones:['Se oxida','Se reduce','No cambia'],correcta:1,explica:'El oxidante SE reduce (gana e⁻) y así "oxida" a la otra especie.'}, conexion:'Nombra el efecto que causa en el otro, no lo que le pasa a sí mismo... ¡es contraintuitivo pero clave!' },
        'topic-3':{ detonante:'¿Se pueden separar las dos mitades de una reacción redox?', commit:{pregunta:'Una semirreacción de oxidación…',opciones:['Gana electrones','Pierde electrones','No involucra electrones'],correcta:1,explica:'La semirreacción de oxidación libera electrones (los mismos que consume la de reducción).'}, conexion:'Esta separación es la base de toda celda galvánica.' },
        'topic-4':{ detonante:'¿Cómo se balancea una ecuación redox en disolución acuosa?', commit:{pregunta:'El balanceo ion-electrón agrega, según el medio…',opciones:['H₂O, H⁺ u OH⁻','Solo oxígeno','Solo electrones libres sin control'],correcta:0,explica:'Se agregan H₂O, H⁺ (medio ácido) u OH⁻ (medio básico) para balancear átomos y cargas.'}, conexion:'Es más preciso que el método de Nox para iones en disolución.' },
        'topic-5':{ detonante:'¿Hay una forma más rápida de balancear una ecuación redox sencilla?', commit:{pregunta:'El método de cambio de Nox usa como coeficientes…',opciones:['Cuánto sube y baja el Nox','Los subíndices originales','Un número aleatorio'],correcta:0,explica:'Se iguala cuánto sube el Nox de uno con cuánto baja el del otro.'}, conexion:'Útil para ecuaciones moleculares sencillas, sin iones en disolución.' },
        'topic-6':{ detonante:'¿Cómo genera electricidad una pila común?', commit:{pregunta:'En una celda galvánica, los electrones fluyen del…',opciones:['Cátodo al ánodo','Ánodo al cátodo','No fluyen, solo hay calor'],correcta:1,explica:'Los electrones salen del ánodo (oxidación) y llegan al cátodo (reducción) por el circuito externo.'}, conexion:'Esa corriente de electrones es la electricidad que usa el dispositivo.' },
        'topic-7':{ detonante:'¿Se puede forzar una reacción que normalmente no ocurriría sola?', commit:{pregunta:'La electrólisis usa electricidad para…',opciones:['Forzar una reacción no espontánea','Medir el pH','Enfriar una disolución'],correcta:0,explica:'La electrólisis fuerza, con electricidad externa, una reacción redox que no sería espontánea.'}, conexion:'Es el proceso inverso de la celda galvánica.' }
      },
      mentor: {
        'tab:teoria':'Redox suena complicado, pero es una sola idea: los electrones viajan de un átomo a otro. Si sigues ese viaje, entiendes todo lo demás.',
        'tab:simuladores':'Antes de ver el resultado, comprométete con tu predicción del número de oxidación o del ánodo/cátodo. Equivocarte aquí es parte de aprender a "ver" el flujo de electrones.',
        'tab:juego':'Recuerda: el que SE reduce es el agente OXIDANTE (le quita electrones al otro). Es contraintuitivo, ¡practícalo aquí!',
        'tab:examen':'Esta es la última evaluación del curso. Repasa la regla del Nox y quién dona/acepta electrones antes de empezar.'
      },
      curiosidades: [
        {topic:'topic-6',texto:'Las baterías de tu celular son celdas galvánicas: usan una reacción redox espontánea para darte electricidad.'},
        {topic:'topic-7',texto:'El aluminio se obtiene industrialmente por electrólisis: sin electricidad, seria carísimo separarlo de su mineral.'},
        {topic:'topic-2',texto:'El oxígeno del aire es un fuerte agente oxidante: por eso el hierro se oxida (forma herrumbre) al exponerse a él.'}
      ],
      errores: [
        {id:'e1',topic:'topic-2',creencia:'El agente oxidante es el que se oxida.',porque:'Se confunde el nombre con lo que le pasa a la propia sustancia.',correccion:'El agente OXIDANTE es el que SE REDUCE (gana electrones) y así oxida al otro. El nombre describe el efecto que causa, no lo que le pasa a sí mismo.'},
        {id:'e2',topic:'topic-0',creencia:'El oxígeno siempre tiene Nox −2 sin excepción.',porque:'Se generaliza la regla más común.',correccion:'Casi siempre es −2, pero hay excepciones (como en peróxidos, donde es −1) — en 10° se trabaja con el caso general.'},
        {id:'e3',topic:'topic-6',creencia:'Los electrones fluyen del cátodo al ánodo.',porque:'Se invierte la dirección real del flujo.',correccion:'Los electrones fluyen del ÁNODO (donde se oxidan, se liberan) al CÁTODO (donde se reducen, se consumen).'},
        {id:'e4',topic:'topic-1',creencia:'Toda reacción química es una reacción redox.',porque:'Se generaliza sin verificar el cambio de Nox.',correccion:'Solo es redox si al menos un átomo cambia su número de oxidación. Si ninguno cambia (como en una neutralización simple), no es redox.'}
      ],
      xref: {
        'teoria:topic-0':[{tab:'simuladores',label:'Calculador Nox'}],
        'teoria:topic-6':[{tab:'simuladores',label:'Celda galvánica virtual'}],
        'teoria:topic-2':[{tab:'simuladores',label:'Balanceo redox'}],
        'teoria:topic-4':[{type:'unit',unit:'unit-08',tab:'teoria',label:'Recuerda el balance de cargas de Ácidos y Bases (Unidad VIII)'}],
        'sim:redox':[{type:'section',section:'periodic-table',label:'Abrir la Tabla interactiva'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U09)?window.BANCO_PNE_U09:null
    });
  }
})();
