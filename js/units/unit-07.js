/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-07.js  |  UNIDAD VII — "Disoluciones"
   Experiencia: "La Química del Agua"
   ================================================================
   MQC Experience 07. Arquitectura v1.0 + Design System v1.0 (azul agua).
   Reutiliza MQCChem (masa molar, molaridad, preparación, dilución, %)
   y toda la capa compartida. Sin sistemas nuevos.
   Tabs: unit-07:teoria · :simuladores · :juego · :examen
   ================================================================ */
(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'unit-07';
  const C = '#607D8B';   /* gris azulado — color temático de la Unidad VII (Identidad v2.0) */

  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function CHEM(){ return (typeof MQCChem!=='undefined')?MQCChem:null; }
  function sub(f){ return String(f).replace(/(\d+)/g,'<sub>$1</sub>'); }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  /* ============================================================
     1) TEORÍA (8 temas)
  ============================================================ */
  const TEORIA = [
    { titulo:'¿Qué es una disolución?', icon:'💧', html:`
      <p>Una <strong>disolución</strong> es una mezcla <strong>homogénea</strong>: un <strong>soluto</strong> (lo que se disuelve, en menor cantidad) repartido de forma uniforme en un <strong>disolvente</strong> (el medio, en mayor cantidad).</p>
      ${box('Ejemplo cotidiano','Café con azúcar: el azúcar es el soluto y el café (agua) el disolvente.','var(--gold)')}` },
    { titulo:'El agua, el disolvente universal', icon:'🌊', html:`
      <p>El <strong>agua</strong> disuelve una enorme variedad de sustancias por ser <strong>polar</strong>. Por eso se le llama "disolvente universal", aunque no disuelve absolutamente todo (el aceite, no).</p>
      ${box('Lo semejante disuelve a lo semejante','Las sustancias polares se disuelven en agua; las no polares (aceite), no.','var(--green)')}` },
    { titulo:'Solubilidad y saturación', icon:'🧂', html:`
      <p>La <strong>solubilidad</strong> es la cantidad máxima de soluto que se disuelve. Según cuánto lleve, la disolución es <strong>insaturada</strong> (admite más), <strong>saturada</strong> (al máximo) o <strong>sobresaturada</strong> (de más, inestable).</p>
      ${box('Factores','Calentar y agitar suelen disolver más rápido los sólidos; en cambio, los gases se disuelven MENOS al calentar.','var(--red)')}` },
    { titulo:'Concentración: diluida y concentrada', icon:'⚖️', html:`
      <p>La <strong>concentración</strong> dice cuánto soluto hay respecto a la disolución. <strong>Diluida</strong> = poco soluto; <strong>concentrada</strong> = mucho soluto.</p>
      ${box('Intensiva','La concentración no depende de cuánta disolución tomes: una gota y un litro de la misma disolución tienen igual concentración.','var(--gold)')}` },
    { titulo:'Concentración porcentual', icon:'📊', html:`
      <p>Una forma sencilla de medirla: <strong>% masa/volumen</strong> = gramos de soluto por cada 100 mL de disolución.</p>
      ${box('Ejemplo real','El suero fisiológico es NaCl al 0.9 % m/v: 0.9 g de sal por cada 100 mL.','var(--green)')}` },
    { titulo:'Molaridad', icon:'🧮', html:`
      <p>La <strong>molaridad (M)</strong> es la forma más usada en química: <strong>moles de soluto ÷ litros de disolución</strong> (mol/L).</p>
      ${box('Ojo con las unidades','El volumen va en LITROS. Si tienes mililitros, conviértelos primero (÷ 1000).','var(--red)')}` },
    { titulo:'Dilución', icon:'🚰', html:`
      <p>Diluir es <strong>agregar disolvente</strong>: la concentración baja, pero la <strong>cantidad de soluto se conserva</strong>. Por eso: <strong>C₁V₁ = C₂V₂</strong>.</p>
      ${box('La clave','Al diluir no quitas soluto: solo lo repartes en más volumen. Por eso baja la concentración.','var(--green)')}` },
    { titulo:'Aplicaciones', icon:'🌍', html:`
      <p>Las disoluciones están en todas partes: el suero de un hospital, las bebidas, los medicamentos, el agua potable y hasta la sangre. Controlar la concentración es cuestión de salud y de seguridad.</p>
      ${box('Comprender > memorizar','No memorices fórmulas sueltas: entiende que la concentración mide cuánto soluto hay por cantidad de disolución.','var(--green)')}` }
  ];

  const TOPIC_HINTS = {
    5:['Molaridad = moles ÷ litros. Convierte mL a L primero.','Si tienes gramos, pásalos a moles con la masa molar.'],
    6:['Al diluir, el soluto no cambia: usa C₁V₁ = C₂V₂.','Despeja lo que te piden (por ejemplo V₂ = C₁V₁ ÷ C₂).']
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
      return `<div class="u7-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u7-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u7-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u7-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Casi todo lo que bebes es una disolución. Aquí aprendes a <strong>medir</strong> qué tan concentrada está. Comprométete antes de leer.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u7-caret');
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
      {id:'sim-07-01',icon:'🧪',name:'Preparador de Disoluciones',desc:'Elige soluto, molaridad y volumen: calcula cuántos gramos pesar.'},
      {id:'sim-07-02',icon:'📊',name:'Calculadora de Concentración',desc:'Molaridad y % masa/volumen por niveles.'},
      {id:'sim-07-03',icon:'🚰',name:'Dilución C₁V₁=C₂V₂',desc:'Diluye una disolución y descubre su nueva concentración.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u7-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres herramientas para <strong>preparar y medir</strong> disoluciones. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:disoluciones'):''}</p>
      <div id="u7-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u7-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u7-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u7-stage"></div>`;
    document.getElementById('u7-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u7-stage');
    if(id==='sim-07-01')simPreparador(st);
    else if(id==='sim-07-02')simConcentracion(st);
    else if(id==='sim-07-03')simDilucion(st);
  }

  /* SIM 1 — Preparador de Disoluciones (reutiliza MQCChem.massForSolution) */
  function simPreparador(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    let si=0, M=1, V=1;
    function draw(){
      const sol=chem.SOLUTES[si]; const mm=chem.molarMass(sol.f);
      const mol=chem.molesFromMolarity(M,V); const g=chem.massForSolution(M,V,mm);
      /* nivel de "llenado" visual del vaso según V (0.25–2 L) */
      const fill=Math.min(100,Math.round((V/2)*100));
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.5rem"><select id="u7p-s" class="qi-overlay-input" style="margin:0">${chem.SOLUTES.map((x,k)=>`<option value="${k}" ${k===si?'selected':''}>${x.f} — ${x.name}</option>`).join('')}</select></div>
        <div style="display:flex;gap:1rem;align-items:center;justify-content:center;margin:.6rem 0">
          <div style="width:70px;height:90px;border:2px solid ${C};border-top:none;border-radius:0 0 12px 12px;position:relative;background:var(--bg-deep);overflow:hidden">
            <div style="position:absolute;bottom:0;left:0;right:0;height:${fill}%;background:${C};opacity:.4;transition:height .2s"></div></div>
          <div style="font-family:var(--font-code);color:${C};font-size:1.05rem">${sub(sol.f)}<br><span style="font-size:.78rem;color:var(--text-muted)">${mm} g/mol</span></div>
        </div>
        <label style="font-size:.82rem;color:var(--text-muted)">Molaridad deseada: <strong style="color:var(--text-primary)">${M} M</strong></label>
        <input id="u7p-m" type="range" min="0.25" max="3" step="0.25" value="${M}" style="width:100%;accent-color:${C};margin:.2rem 0 .6rem">
        <label style="font-size:.82rem;color:var(--text-muted)">Volumen: <strong style="color:var(--text-primary)">${V} L</strong></label>
        <input id="u7p-v" type="range" min="0.25" max="2" step="0.25" value="${V}" style="width:100%;accent-color:${C};margin:.2rem 0 .8rem">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem;text-align:center">
          <div style="font-size:.8rem;color:var(--text-secondary)">Necesitas ${mol} mol de soluto →</div>
          <div style="font-family:var(--font-code);color:var(--gold);font-size:1.3rem;font-weight:700">${g} g</div>
          <div style="font-size:.74rem;color:var(--text-muted)">masa = M × V × masa molar = ${M} × ${V} × ${mm}</div>
        </div></div>`;
      st.querySelector('#u7p-s').addEventListener('change',e=>{si=+e.target.value;draw();});
      st.querySelector('#u7p-m').addEventListener('input',e=>{M=parseFloat(e.target.value);draw();markSimDone('sim-07-01',100);});
      st.querySelector('#u7p-v').addEventListener('input',e=>{V=parseFloat(e.target.value);draw();markSimDone('sim-07-01',100);});
    }
    draw(); markSimDone('sim-07-01',100);
  }

  /* SIM 2 — Calculadora de Concentración (niveles) */
  function simConcentracion(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    const LV=['Nivel 1 · molaridad (mol y L)','Nivel 2 · % masa/volumen','Nivel 3 · mL → L y molaridad'];
    let lvIdx=0,state=null;
    function makeItem(){
      if(lvIdx===0){ const mol=[1,2,3,4][Math.floor(Math.random()*4)]; const L=[1,2,4][Math.floor(Math.random()*3)]; const right=chem.molarity(mol,L);
        return {ask:`¿Molaridad de <strong>${mol} mol</strong> en <strong>${L} L</strong>?`,right,unit:'M',opts:shuffle([right,mol,L,chem.molarity(L,mol)]).slice(0,4),explica:`${mol} ÷ ${L} = ${right} M`}; }
      if(lvIdx===1){ const g=[5,10,20][Math.floor(Math.random()*3)]; const mL=[100,200,250][Math.floor(Math.random()*3)]; const right=chem.percentMassVolume(g,mL);
        return {ask:`¿% masa/volumen de <strong>${g} g</strong> en <strong>${mL} mL</strong>?`,right,unit:'%',opts:shuffle([right,g,mL/10,right*2]).slice(0,4),explica:`${g} ÷ ${mL} × 100 = ${right} %`}; }
      const mol=[0.5,1,2][Math.floor(Math.random()*3)]; const mL=[250,500,200][Math.floor(Math.random()*3)]; const L=mL/1000; const right=chem.molarity(mol,L);
      return {ask:`¿Molaridad de <strong>${mol} mol</strong> en <strong>${mL} mL</strong>? (¡convierte a litros!)`,right,unit:'M',opts:shuffle([right,chem.molarity(mol,mL),mol,right/2]).slice(0,4),explica:`${mL} mL = ${L} L; ${mol} ÷ ${L} = ${right} M`};
    }
    function startLv(){ state={n:0,correct:0,items:Array.from({length:5},makeItem),answered:false}; draw(); }
    function draw(){
      const it=state.items[state.n]; state._it=it;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">${LV[lvIdx]}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.n+1}/5</span></div>
        <p style="font-size:.95rem;margin:.4rem 0 .8rem;text-align:center">${it.ask}</p>
        <div id="u7c-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${[...new Set(it.opts)].map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o} ${it.unit}</button>`).join('')}</div>
        <div id="u7c-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>ans(b.getAttribute('data-o'))));
    }
    function ans(val){
      if(state.answered)return;state.answered=true;const it=state._it;const ok=val===(''+it.right);
      if(ok)state.correct++;
      st.querySelectorAll('#u7c-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===(''+it.right))b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u7c-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ '+it.explica}</span><br><button class="btn btn-primary btn-sm" id="u7c-next" style="margin-top:.5rem">${state.n<4?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u7c-next').addEventListener('click',()=>{if(state.n<4){state.n++;state.answered=false;draw();}else finish();});
    }
    function finish(){
      const passed=state.correct>=3; if(passed)markSimDone('sim-07-02',state.correct===5?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${LV[lvIdx]}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/5 correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u7c-nl" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u7c-rt" style="margin-top:.6rem">↻ Repetir</button></div>`;
      const nl=st.querySelector('#u7c-nl');if(nl)nl.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u7c-rt').addEventListener('click',startLv);
    }
    startLv();
  }

  /* SIM 3 — Dilución (reutiliza MQCChem.dilutionV2) */
  function simDilucion(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    let C1=2, V1=50, V2=200;
    function draw(){
      const C2=chem.dilutionV2? Math.round((C1*V1/V2)*1000)/1000 : 0;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <p style="text-align:center;font-family:var(--font-code);color:${C};font-weight:700;margin-bottom:.6rem">C₁ · V₁ = C₂ · V₂</p>
        <label style="font-size:.82rem;color:var(--text-muted)">Concentración inicial C₁: <strong style="color:var(--text-primary)">${C1} M</strong></label>
        <input id="u7d-c1" type="range" min="0.5" max="4" step="0.5" value="${C1}" style="width:100%;accent-color:${C};margin:.2rem 0 .5rem">
        <label style="font-size:.82rem;color:var(--text-muted)">Volumen inicial V₁: <strong style="color:var(--text-primary)">${V1} mL</strong></label>
        <input id="u7d-v1" type="range" min="25" max="200" step="25" value="${V1}" style="width:100%;accent-color:${C};margin:.2rem 0 .5rem">
        <label style="font-size:.82rem;color:var(--text-muted)">Volumen final V₂ (le agregas agua): <strong style="color:var(--text-primary)">${V2} mL</strong></label>
        <input id="u7d-v2" type="range" min="${V1}" max="500" step="25" value="${Math.max(V2,V1)}" style="width:100%;accent-color:${C};margin:.2rem 0 .8rem">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem;text-align:center">
          <div style="font-size:.8rem;color:var(--text-secondary)">Nueva concentración C₂:</div>
          <div style="font-family:var(--font-code);color:var(--gold);font-size:1.4rem;font-weight:700">${C2} M</div>
          <div style="font-size:.74rem;color:var(--text-muted)">C₂ = (${C1} × ${V1}) ÷ ${V2}</div>
          <div style="font-size:.76rem;color:${C};margin-top:.3rem">${V2>V1?'⬇ Diluiste: la concentración bajó (el soluto se conserva).':'La concentración se mantiene: no agregaste agua.'}</div>
        </div></div>`;
      st.querySelector('#u7d-c1').addEventListener('input',e=>{C1=parseFloat(e.target.value);draw();markSimDone('sim-07-03',100);});
      st.querySelector('#u7d-v1').addEventListener('input',e=>{V1=parseFloat(e.target.value);if(V2<V1)V2=V1;draw();markSimDone('sim-07-03',100);});
      st.querySelector('#u7d-v2').addEventListener('input',e=>{V2=parseFloat(e.target.value);draw();markSimDone('sim-07-03',100);});
    }
    draw(); markSimDone('sim-07-03',100);
  }

  /* ============================================================
     3) JUEGO — "Maestro de las Disoluciones"
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'💧',desc:'Identifica soluto, disolvente y saturación.'},
    {id:'medidor',nombre:'Medidor',icon:'📊',desc:'Calcula molaridad y porcentajes.'},
    {id:'maestro',nombre:'Maestro',icon:'🚰',desc:'Resuelve diluciones.'}
  ];
  const GAME_ROUNDS=5,GAME_PASS=3;
  const ID_CASES=[
    {desc:'Agua con azúcar. ¿Cuál es el soluto?',opts:['El azúcar','El agua','El vaso'],ok:0,exp:'El soluto es el azúcar; el agua es el disolvente.'},
    {desc:'Una disolución que ya no admite más soluto está…',opts:['Insaturada','Saturada','Vacía'],ok:1,exp:'Saturada = al máximo de soluto.'},
    {desc:'En el aire, el componente mayoritario (disolvente) es…',opts:['Oxígeno','Nitrógeno','CO₂'],ok:1,exp:'El nitrógeno es el mayoritario.'},
    {desc:'Una disolución con MUCHO soluto es…',opts:['Diluida','Concentrada','Insaturada'],ok:1,exp:'Mucho soluto = concentrada.'}
  ];
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  function makeCase(idx){
    const chem=CHEM();
    if(idx===0){ const c=ID_CASES[Math.floor(Math.random()*ID_CASES.length)];
      return {prompt:c.desc,options:c.opts.map((o,k)=>({label:o,ok:k===c.ok})),explica:c.exp}; }
    if(idx===1){ if(Math.random()<.5){ const mol=[1,2,3][Math.floor(Math.random()*3)],L=[1,2][Math.floor(Math.random()*2)];const right=chem.molarity(mol,L);
        return {prompt:`¿Molaridad de <strong>${mol} mol</strong> en <strong>${L} L</strong>?`,options:[...new Set([right,mol,L,mol*L])].map(o=>({label:o+' M',ok:o===right})),explica:`${mol} ÷ ${L} = ${right} M.`}; }
      const g=[5,10,20][Math.floor(Math.random()*3)],mL=[100,200][Math.floor(Math.random()*2)];const right=chem.percentMassVolume(g,mL);
      return {prompt:`¿% m/v de <strong>${g} g</strong> en <strong>${mL} mL</strong>?`,options:[...new Set([right,g,mL/10,right*2])].map(o=>({label:o+' %',ok:o===right})),explica:`${g} ÷ ${mL} × 100 = ${right} %.`}; }
    /* idx 2: dilución */
    const C1=[2,3,4][Math.floor(Math.random()*3)],V1=[50,100][Math.floor(Math.random()*2)],V2=[200,300,400][Math.floor(Math.random()*3)];
    const right=Math.round((C1*V1/V2)*1000)/1000;
    return {prompt:`Diluyes <strong>${V1} mL</strong> de <strong>${C1} M</strong> hasta <strong>${V2} mL</strong>. ¿Nueva concentración?`,
      options:[...new Set([right,C1,right*2,Math.round(C1*V2/V1*100)/100])].map(o=>({label:o+' M',ok:o===right})),explica:`C₂ = (${C1}×${V1}) ÷ ${V2} = ${right} M.`};
  }
  function renderJuego(unit,uData){
    const stt=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,stt.done),co=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;}).join('');
    return `<div class="u7-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">🚰</span><div><h3 style="margin:0">Maestro de las Disoluciones</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Identifica, mide y diluye. Razona la concentración, no la memorices.</p></div></div>
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
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u7g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.round+1}/${GAME_ROUNDS} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="text-align:center;font-size:1rem;font-weight:700;color:${C};margin-bottom:1rem">${caso.prompt}</p>
        <div id="u7g-opts" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem">${caso.options.map((o,k)=>`<button class="btn btn-ghost" data-k="${k}" style="height:auto;padding:.7rem">${o.label}</button>`).join('')}</div>
        <div id="u7g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u7g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>answerRound(+b.getAttribute('data-k'))));
  }
  function answerRound(k){
    if(!game||game.answered)return;game.answered=true;const caso=game.caso;const ok=!!caso.options[k].ok;
    if(ok){game.correct++;game.score+=100;}
    const opts=document.getElementById('u7g-opts');
    opts.querySelectorAll('[data-k]').forEach(b=>{const i=+b.getAttribute('data-k');b.disabled=true;if(caso.options[i].ok)b.style.borderColor='var(--green)';if(i===k&&!ok)b.style.borderColor='var(--red)';});
    document.getElementById('u7g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.86rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${caso.explica}</p></div>
      <button class="btn btn-primary btn-sm" id="u7g-next" style="margin-top:.8rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u7g-next').addEventListener('click',()=>{if(game.round<GAME_ROUNDS-1){game.round++;nextRound();}else finishLevel();});
  }
  function finishLevel(){
    if(!game)return;const passed=game.correct>=GAME_PASS,perfect=game.correct===GAME_ROUNDS,score=game.score;
    const stt=gameState();const done=stt.done.slice();if(passed&&!done.includes(game.lv.id))done.push(game.lv.id);
    patchUnit({gameScore:Math.max(stt.best,score),gameLevels:done});
    if(passed)awardXP('game-won');if(score>stt.best)awardXP('game-highscore');
    const c=document.getElementById('tab-content');const nx=game.idx+1,hay=nx<GAME_LEVELS.length,unlk=passed&&hay;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔁'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u7g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u7g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u7g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u7g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 de 30, 70%)
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U07)?window.PREGUNTAS_U07.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u07.js</code>.</p></div>`;
    return `<div id="u7-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Disoluciones</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u7-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u7-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u7-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u7-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u7-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u7-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u7-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u7-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u7-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u7-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u7-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1});
    if(passed)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u7-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u7-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u7-exam-close">Cerrar</button></div>`;
    document.getElementById('u7-exam-retry').addEventListener('click',startExam);
    document.getElementById('u7-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO + MANIFEST
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-07] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'disolución':'Mezcla homogénea de un soluto disuelto en un disolvente.',
        'soluto':'Sustancia que se disuelve (suele estar en menor cantidad).',
        'disolvente':'Medio en el que se disuelve el soluto (suele estar en mayor cantidad).',
        'solubilidad':'Cantidad máxima de soluto que se puede disolver en cierto disolvente.',
        'disolución saturada':'La que contiene el máximo de soluto disuelto a esa temperatura.',
        'disolución insaturada':'La que aún puede disolver más soluto.',
        'disolución sobresaturada':'La que contiene más soluto del normal, en estado inestable.',
        'concentración':'Cantidad de soluto respecto a la disolución; propiedad intensiva.',
        'diluida':'Disolución con poco soluto.',
        'concentrada':'Disolución con mucho soluto.',
        'molaridad':'Concentración en moles de soluto por litro de disolución (mol/L).',
        'porcentaje masa-volumen':'Gramos de soluto por cada 100 mL de disolución (% m/v).',
        'dilución':'Agregar disolvente para bajar la concentración (C₁V₁ = C₂V₂).',
        'aforar':'Completar con disolvente hasta la marca de volumen para fijar la concentración.',
        'polaridad':'Propiedad que hace que "lo semejante disuelva a lo semejante".',
        'propiedad intensiva':'La que no depende de la cantidad de materia (como la concentración).'
      },
      mqc: {
        'topic-0':{ detonante:'El café, el suero, el agua de mar… ¿qué tienen en común y qué los diferencia?', commit:{pregunta:'Una disolución es una mezcla…',opciones:['heterogénea','homogénea','imposible'],correcta:1,explica:'Homogénea: soluto disuelto en disolvente.'}, conexion:'Casi todo lo que bebes es una disolución.' },
        'topic-1':{ detonante:'¿Por qué el azúcar se disuelve en agua y el aceite no?', commit:{pregunta:'El agua disuelve bien lo…',opciones:['polar','no polar','metálico'],correcta:0,explica:'Lo semejante disuelve a lo semejante; el agua es polar.'}, conexion:'Por eso el aceite y el agua no se mezclan.' },
        'topic-2':{ detonante:'¿Se puede disolver azúcar sin límite en un vaso de agua?', commit:{pregunta:'Cuando ya no se disuelve más, está…',opciones:['insaturada','saturada','vacía'],correcta:1,explica:'Saturada: al máximo de soluto.'}, conexion:'Hay un límite: la solubilidad.' },
        'topic-3':{ detonante:'¿Qué significa que un jugo esté "muy cargado"?', commit:{pregunta:'Mucho soluto = disolución…',opciones:['diluida','concentrada','saturada'],correcta:1,explica:'Concentrada = mucho soluto.'}, conexion:'Diluida o concentrada según cuánto soluto.' },
        'topic-4':{ detonante:'El suero dice "0.9 %". ¿0.9 % de qué?', commit:{pregunta:'% m/v significa…',opciones:['g por 100 mL','mol por litro','litros de sal'],correcta:0,explica:'Gramos de soluto por 100 mL.'}, conexion:'Una forma sencilla de medir concentración.' },
        'topic-5':{ detonante:'¿Cómo mide la concentración un químico con precisión?', commit:{pregunta:'La molaridad usa el volumen en…',opciones:['mL','litros','gramos'],correcta:1,explica:'mol/L: el volumen va en litros.'}, conexion:'La molaridad conecta con el mol de la Unidad VI.' },
        'topic-6':{ detonante:'Si agregas agua a un jugo, ¿le quitas azúcar?', commit:{pregunta:'Al diluir, el soluto…',opciones:['se pierde','se conserva','aumenta'],correcta:1,explica:'Se conserva; solo baja la concentración.'}, conexion:'Por eso C₁V₁ = C₂V₂.' },
        'topic-7':{ detonante:'¿Por qué importa la concentración exacta en un medicamento?', commit:{pregunta:'Controlar la concentración es cuestión de…',opciones:['estética','salud y seguridad','suerte'],correcta:1,explica:'Una dosis mal concentrada puede ser peligrosa.'}, conexion:'De la medicina al agua potable.' }
      },
      mentor: {
        'tab:teoria':'Las disoluciones son pura vida cotidiana. La clave es una idea: la concentración mide cuánto soluto hay por cantidad de disolución. Domínala y todo encaja.',
        'tab:simuladores':'Prepara disoluciones calculando cuánto pesar, mide su concentración y practica la dilución. El mol vuelve a ser tu aliado.',
        'tab:juego':'Identifica, mide y diluye: si entiendes la concentración, ganas.',
        'tab:examen':'Recuerda pasar los mL a litros y que al diluir el soluto se conserva. Si fallas, te muestro el error frecuente.'
      },
      curiosidades: [
        {topic:'topic-4',texto:'El suero fisiológico es NaCl al 0.9 % m/v porque esa concentración iguala la de la sangre.'},
        {topic:'topic-1',texto:'El agua disuelve tantas cosas por ser polar: sus moléculas "rodean" a los iones y los separan.'},
        {topic:'topic-2',texto:'Los refrescos pierden gas al calentarse porque los gases se disuelven MENOS en agua caliente.'},
        {topic:'topic-6',texto:'Diluir no elimina soluto: por eso una gota de tinta muy diluida sigue teniendo la misma tinta, solo repartida.'}
      ],
      errores: [
        {id:'e1',topic:'topic-0',creencia:'Soluto y disolvente son lo mismo o da igual cuál es cuál.',porque:'Se confunden los papeles.',correccion:'El SOLUTO se disuelve (menor cantidad) y el DISOLVENTE es el medio (mayor cantidad): en agua con azúcar, el azúcar es soluto y el agua disolvente.'},
        {id:'e2',topic:'topic-2',creencia:'Se puede disolver soluto sin ningún límite.',porque:'Se ignora la saturación.',correccion:'Hay un máximo (solubilidad): al llegar a él la disolución está saturada y el soluto extra ya no se disuelve.'},
        {id:'e3',topic:'topic-5',creencia:'La molaridad se calcula con el volumen en mililitros.',porque:'Se usa el dato tal cual.',correccion:'La molaridad usa LITROS: si tienes mililitros, divídelos entre 1000 antes de calcular.'},
        {id:'e4',topic:'topic-6',creencia:'Al diluir se pierde o cambia la cantidad de soluto.',porque:'Se confunde concentración con cantidad.',correccion:'Al diluir el soluto SE CONSERVA (los moles no cambian); lo que baja es la concentración, porque hay más disolvente.'},
        {id:'e5',topic:'topic-3',creencia:'La concentración depende de cuánta disolución tengas.',porque:'Se mezcla intensiva con extensiva.',correccion:'La concentración es INTENSIVA: una gota y un litro de la misma disolución tienen la misma concentración.'}
      ],
      xref: {
        'teoria:topic-5':[{type:'unit',unit:'unit-06',tab:'teoria',label:'El mol y la masa molar (Unidad VI)'},{tab:'simuladores',label:'Preparador de Disoluciones'}],
        'teoria:topic-4':[{tab:'simuladores',label:'Calculadora de Concentración'}],
        'teoria:topic-6':[{tab:'simuladores',label:'Dilución C₁V₁=C₂V₂'}],
        'teoria:topic-7':[{type:'unit',unit:'unit-08',tab:'teoria',label:'Te servirá en la Unidad VIII'}],
        'sim:disoluciones':[{type:'unit',unit:'unit-06',tab:'simuladores',label:'La Balanza Molar (Unidad VI)'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U07)?window.BANCO_PNE_U07:null
    });
  }
})();
