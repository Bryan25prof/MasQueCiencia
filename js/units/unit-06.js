/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-06.js  |  UNIDAD VI — "Estequiometría"
   Experiencia: "El Arte de Contar Átomos"
   ================================================================
   MQC Experience 06. Arquitectura v1.0 + Design System v1.0 (amarillo).
   Reutiliza MQCChem (masa molar, mol, Avogadro, conversiones, ecuaciones)
   y toda la capa compartida. Sin sistemas nuevos.
   Tabs: unit-06:teoria · :simuladores · :juego · :examen
   ================================================================ */
(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'unit-06';
  const C = '#E91E63';   /* rosa/magenta — color temático de la Unidad VI (Identidad v2.0) */

  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function CHEM(){ return (typeof MQCChem!=='undefined')?MQCChem:null; }
  function sub(f){ return String(f).replace(/(\d+)/g,'<sub>$1</sub>'); }  /* H2O → H<sub>2</sub>O */

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  /* ============================================================
     1) TEORÍA (8 temas) con ciclo MQC
  ============================================================ */
  const TEORIA = [
    { titulo:'¿Por qué contar átomos?', icon:'🔬', html:`
      <p>Los átomos son tan pequeños que <strong>no podemos verlos ni contarlos uno a uno</strong>. Pero la química necesita saber <em>cuánto</em> reacciona y <em>cuánto</em> se produce.</p>
      ${box('La idea de la unidad','El químico no cuenta: <strong>pesa</strong>. Con una unidad genial (el mol) y la masa, cuenta lo invisible.','var(--gold)')}` },
    { titulo:'El mol y el número de Avogadro', icon:'🔢', html:`
      <p>El <strong>mol</strong> es como una "docena gigante": es una <strong>cantidad</strong> fija de partículas. Un mol contiene <strong>6.022 × 10²³</strong> partículas (número de Avogadro).</p>
      ${box('Ojo','El mol mide cantidad, no masa. 1 mol de hierro y 1 mol de agua tienen el mismo nº de partículas, pero pesan distinto.','var(--red)')}` },
    { titulo:'Masa molar', icon:'⚖️', html:`
      <p>La <strong>masa molar</strong> son los gramos que pesa 1 mol de una sustancia (g/mol). Se obtiene <strong>sumando las masas atómicas</strong> de todos los átomos de la fórmula.</p>
      ${box('Ejemplo','Agua H₂O: 2(1) + 16 = 18 g/mol. ¡La tabla periódica te da cada masa atómica!','var(--green)')}` },
    { titulo:'Conversión: masa ⇄ mol ⇄ partículas', icon:'🔁', html:`
      <p>El <strong>mol es el puente</strong> entre lo que pesas y lo que cuentas:</p>
      <ul style="margin:.5rem 0 .5rem 1.1rem;line-height:1.7;color:var(--text-secondary);font-size:.9rem">
        <li>gramos → moles: <strong>divides</strong> entre la masa molar.</li>
        <li>moles → gramos: <strong>multiplicas</strong> por la masa molar.</li>
        <li>moles → partículas: <strong>multiplicas</strong> por 6.022 × 10²³.</li>
      </ul>` },
    { titulo:'Composición porcentual', icon:'📊', html:`
      <p>La <strong>composición porcentual</strong> dice qué parte de la masa aporta cada elemento: (masa del elemento ÷ masa molar) × 100.</p>
      ${box('Ejemplo','En el agua (18 g/mol), el oxígeno (16) es ≈ 89 % de la masa.','var(--green)')}` },
    { titulo:'Ecuaciones químicas y balanceo', icon:'⚗️', html:`
      <p>Una <strong>ecuación química</strong> describe una reacción. La <strong>ley de conservación de la masa</strong> exige que haya los mismos átomos a ambos lados.</p>
      ${box('Balancear','Se ajustan los <strong>coeficientes</strong> (los números grandes delante), <strong>nunca los subíndices</strong> (eso cambiaría la sustancia).','var(--red)')}` },
    { titulo:'Relaciones estequiométricas', icon:'🧮', html:`
      <p>Los <strong>coeficientes</strong> de una ecuación balanceada dan la <strong>proporción</strong> en que reaccionan las sustancias (proporción mol a mol).</p>
      ${box('Ejemplo','En 2 H₂ + O₂ → 2 H₂O, por cada 2 mol de H₂ se forman 2 mol de agua (proporción 1:1).','var(--green)')}` },
    { titulo:'Aplicaciones', icon:'🌍', html:`
      <p>La estequiometría permite <strong>predecir</strong> cuánto reactivo se necesita y cuánto producto se obtiene: desde cocinar hasta fabricar medicinas o combustibles.</p>
      ${box('Comprender > memorizar','No memorices resultados: entiende que las reacciones ocurren en proporciones fijas, y calcula con el mol y la masa molar.','var(--green)')}` }
  ];

  const TOPIC_HINTS = {
    3:['El mol es el puente: primero pasa a moles, luego a lo que quieras.','gramos→mol se divide; mol→gramos se multiplica.'],
    5:['Cuenta los átomos de cada elemento a cada lado.','Cambia los coeficientes, no los subíndices.']
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
      return `<div class="u6-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u6-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u6-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u6-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Aquí aprendes a <strong>contar lo invisible</strong>. Comprométete antes de leer: verás que todo gira en torno al mol.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u6-caret');
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
      {id:'sim-06-01',icon:'⚖️',name:'La Balanza Molar',desc:'Calcula la masa molar y convierte entre gramos, moles y partículas.'},
      {id:'sim-06-02',icon:'🔁',name:'Conversor mol ⇄ masa',desc:'Practica las conversiones por niveles.'},
      {id:'sim-06-03',icon:'⚗️',name:'Balanceador',desc:'Ajusta los coeficientes hasta equilibrar la ecuación.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u6-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres herramientas para <strong>calcular</strong> con el mol. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:estequiometria'):''}</p>
      <div id="u6-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u6-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u6-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u6-stage"></div>`;
    document.getElementById('u6-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u6-stage');
    if(id==='sim-06-01')simBalanza(st);
    else if(id==='sim-06-02')simConversor(st);
    else if(id==='sim-06-03')simBalanceador(st);
  }

  /* SIM 1 — La Balanza Molar (reutiliza MQCChem.molarMass + conversiones) */
  function simBalanza(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    let ci=0, moles=1;
    function draw(){
      const comp=chem.COMPOUNDS[ci];
      const bd=chem.molarMassBreakdown(comp.f);
      const mm=bd.total;
      const gramos=chem.massFromMoles(moles,mm);
      const part=chem.particlesFromMoles(moles);
      const desglose=bd.parts.map(p=>`${p.count>1?p.count+'×':''}${p.sym} (${p.mass}) = ${p.subtotal}`).join('  +  ');
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.5rem"><select id="u6b-c" class="qi-overlay-input" style="margin:0">${chem.COMPOUNDS.map((x,k)=>`<option value="${k}" ${k===ci?'selected':''}>${x.f} — ${x.name}</option>`).join('')}</select></div>
        <div style="text-align:center;font-family:var(--font-code);font-size:1.3rem;color:${C};font-weight:700">${sub(comp.f)}</div>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem .8rem;margin:.6rem 0;font-size:.82rem;color:var(--text-secondary);text-align:center">${desglose}<br><strong style="color:${C}">Masa molar = ${mm} g/mol</strong></div>
        <label style="font-size:.82rem;color:var(--text-muted)">Cantidad (mol): <strong style="color:var(--text-primary)">${moles}</strong></label>
        <input id="u6b-mol" type="range" min="0.5" max="5" step="0.5" value="${moles}" style="width:100%;accent-color:${C};margin:.3rem 0 .8rem">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
          <div style="background:var(--bg-deep);border-radius:var(--radius-md);padding:.7rem;text-align:center"><div style="font-size:.72rem;color:var(--text-muted)">Masa</div><div style="font-family:var(--font-code);color:var(--gold);font-size:1.05rem">${gramos} g</div></div>
          <div style="background:var(--bg-deep);border-radius:var(--radius-md);padding:.7rem;text-align:center"><div style="font-size:.72rem;color:var(--text-muted)">Partículas</div><div style="font-family:var(--font-code);color:${C};font-size:1.05rem">${part.toExponential(3)}</div></div>
        </div>
        <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem;text-align:center">masa = mol × masa molar · partículas = mol × 6.022×10²³</p>
      </div>`;
      st.querySelector('#u6b-c').addEventListener('change',e=>{ci=+e.target.value;draw();});
      st.querySelector('#u6b-mol').addEventListener('input',e=>{moles=parseFloat(e.target.value);draw();markSimDone('sim-06-01',100);});
    }
    draw(); markSimDone('sim-06-01',100);
  }

  /* SIM 2 — Conversor por niveles (determinista) */
  function simConversor(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    const LV=['Nivel 1 · masa → mol','Nivel 2 · mol → masa','Nivel 3 · mol → partículas'];
    let lvIdx=0,state=null;
    function makeItem(){
      const comp=chem.COMPOUNDS[Math.floor(Math.random()*chem.COMPOUNDS.length)];
      const mm=chem.molarMass(comp.f);
      if(lvIdx===0){ const mol=pickMolValue(); const g=chem.massFromMoles(mol,mm);
        const right=mol; const opts=qtyDistractors(right).map(String);
        return {ask:`Tienes <strong>${g} g</strong> de ${comp.name} (${sub(comp.f)}, ${mm} g/mol). ¿Cuántos <strong>moles</strong> son?`,right,opts,unit:'mol',explica:`mol = ${g} ÷ ${mm} = ${right}`}; }
      if(lvIdx===1){ const mol=pickMolValue(); const g=chem.massFromMoles(mol,mm);
        const right=g; const opts=qtyDistractors(right).map(String);
        return {ask:`Tienes <strong>${mol} mol</strong> de ${comp.name} (${mm} g/mol). ¿Cuántos <strong>gramos</strong> son?`,right,opts,unit:'g',explica:`masa = ${mol} × ${mm} = ${right}`}; }
      const mol=pickMolValue();
      const right=fmtParticles(mol); const opts=shuffle(particleDistractors(mol,right));
      return {ask:`¿Cuántas partículas hay en <strong>${mol} mol</strong>?`,right,opts,unit:'',explica:`${mol} × 6.022×10²³ = ${right}`};
    }
    function startLv(){ state={n:0,correct:0,items:Array.from({length:5},makeItem),answered:false}; draw(); }
    function draw(){
      const it=state.items[state.n]; state._it=it;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">${LV[lvIdx]}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.n+1}/5</span></div>
        <p style="font-size:.95rem;margin:.4rem 0 .8rem;text-align:center">${it.ask}</p>
        <div id="u6cv-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${it.opts.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o} ${it.unit}</button>`).join('')}</div>
        <div id="u6cv-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>ans(b.getAttribute('data-o'))));
    }
    function ans(val){
      if(state.answered)return;state.answered=true;const it=state._it;const ok=val===(''+it.right);
      if(ok)state.correct++;
      st.querySelectorAll('#u6cv-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===(''+it.right))b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u6cv-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ '+it.explica}</span><br><button class="btn btn-primary btn-sm" id="u6cv-next" style="margin-top:.5rem">${state.n<4?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u6cv-next').addEventListener('click',()=>{if(state.n<4){state.n++;state.answered=false;draw();}else finish();});
    }
    function finish(){
      const passed=state.correct>=3; if(passed)markSimDone('sim-06-02',state.correct===5?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${LV[lvIdx]}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/5 correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u6cv-nl" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u6cv-rt" style="margin-top:.6rem">↻ Repetir</button></div>`;
      const nl=st.querySelector('#u6cv-nl');if(nl)nl.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u6cv-rt').addEventListener('click',startLv);
    }
    startLv();
  }

  /* SIM 3 — Balanceador (reutiliza MQCChem.EQUATIONS + parseFormula) */
  function simBalanceador(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    let eqIdx=0, coeffs=null;
    function counts(side){ /* átomos por lado con los coeficientes actuales */
      const eq=chem.EQUATIONS[eqIdx]; const acc={};
      eq.terms.forEach((t,i)=>{ const isR=i<eq.r; if((side==='r')!==isR)return; const c=coeffs[i]; const m=chem.parseFormula(t); for(const k in m) acc[k]=(acc[k]||0)+m[k]*c; });
      return acc;
    }
    function balanced(){ const r=counts('r'),p=counts('p'); const keys=new Set([...Object.keys(r),...Object.keys(p)]); for(const k of keys){ if((r[k]||0)!==(p[k]||0))return false; } return true; }
    function draw(){
      const eq=chem.EQUATIONS[eqIdx]; if(!coeffs)coeffs=eq.terms.map(()=>1);
      /* SPRINT PRE-PNE — Parte IV: solo presentación (flecha más
         grande, coeficientes destacados, más separación visual entre
         términos) — la lógica de balanceo (counts/balanced) no se
         tocó ni una línea. */
      const termHTML=eq.terms.map((t,i)=>`<span style="display:inline-flex;align-items:center;gap:.35rem">
        <select data-ci="${i}" class="qi-overlay-input" style="margin:0;padding:.25rem .4rem;width:3.4rem;font-family:var(--font-code);font-weight:800;font-size:1.05rem;color:${C};border-color:${C}55">${[1,2,3,4].map(n=>`<option value="${n}" ${n===coeffs[i]?'selected':''}>${n}</option>`).join('')}</select>
        <span style="font-family:var(--font-code);font-size:1.35rem;font-weight:600;color:var(--text-primary);letter-spacing:.02em">${sub(t)}</span></span>`);
      const plus='<span style="color:var(--text-muted);font-weight:400;margin:0 .3rem;font-size:1.1rem">+</span>';
      const left=termHTML.slice(0,eq.r).join(plus);
      const right=termHTML.slice(eq.r).join(plus);
      const ok=balanced();
      const r=counts('r'),p=counts('p'); const keys=[...new Set([...Object.keys(r),...Object.keys(p)])];
      const tabla=keys.map(k=>`<span style="font-size:.76rem;color:${(r[k]||0)===(p[k]||0)?'var(--green)':'var(--red)'}">${k}: ${r[k]||0} vs ${p[k]||0}</span>`).join('  ·  ');
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.4rem"><select id="u6bal-eq" class="qi-overlay-input" style="margin:0">${chem.EQUATIONS.map((e,k)=>`<option value="${k}" ${k===eqIdx?'selected':''}>${e.name}</option>`).join('')}</select></div>
        <div style="text-align:center;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.1rem .8rem;margin:.8rem 0;line-height:2.6;overflow-x:auto;white-space:nowrap">${left} <span style="color:${C};font-weight:900;font-size:1.6rem;margin:0 .55rem;vertical-align:-.08em">⟶</span> ${right}</div>
        <div style="text-align:center;margin:.4rem 0">${tabla}</div>
        <div style="text-align:center;margin-top:.6rem">${ok?'<span style="color:var(--green);font-weight:700">✓ ¡Ecuación balanceada!</span>':'<span style="color:var(--text-muted);font-size:.84rem">Ajusta los coeficientes hasta igualar cada elemento.</span>'}</div>
      </div>`;
      st.querySelector('#u6bal-eq').addEventListener('change',e=>{eqIdx=+e.target.value;coeffs=null;draw();});
      st.querySelectorAll('[data-ci]').forEach(sel=>sel.addEventListener('change',e=>{coeffs[+e.target.getAttribute('data-ci')]=+e.target.value;draw();if(balanced())markSimDone('sim-06-03',100);}));
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Maestro del Mol"
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'⚖️',desc:'Calcula masas molares.'},
    {id:'calculista',nombre:'Calculista',icon:'🔁',desc:'Convierte entre masa, mol y partículas.'},
    {id:'maestro',nombre:'Maestro',icon:'🧮',desc:'Resuelve proporciones de reacción.'}
  ];
  const GAME_ROUNDS=5,GAME_PASS=3;
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  /* ============================================================
     SPRINT DE AFINAMIENTO PRE-PNE — Parte II y III
     Generador de ejercicios de conversión ampliado para "Maestro del
     Mol". Antes: predominaba masa→mol y mol→masa con un pool de solo
     3-4 valores enteros (1,2,3), lo que permitía que 2 o 3 rondas
     seguidas mostraran exactamente la misma cantidad. Ahora: pool de
     11 valores variados (incluye decimales realistas), con una
     "memoria" de la última cantidad usada para garantizar que nunca
     se repita en la ronda inmediatamente siguiente; 8 tipos de
     conversión distintos (antes 2); y distractores conceptuales
     reales (error de exponente, de unidad, de magnitud) en vez de
     solo números cercanos al azar. No cambia MQCChem ni la lógica
     matemática — solo compone las funciones ya existentes
     (massFromMoles, molesFromMass, particlesFromMoles,
     molesFromParticles) de formas nuevas.
  ============================================================ */
  const MOL_VALUES = [0.25, 0.5, 1, 1.2, 2, 2.8, 3, 5, 7, 10, 12];
  let _lastMolValue = null;
  function pickMolValue() {
    let v;
    do { v = MOL_VALUES[Math.floor(Math.random() * MOL_VALUES.length)]; } while (v === _lastMolValue);
    _lastMolValue = v;
    return v;
  }
  function fmtParticles(mol) { return (Math.round(mol * 6.022 * 1000) / 1000) + ' × 10²³'; }
  /* distractores conceptuales para partículas: exponente equivocado
     (×10²²/×10²⁴, el error más común al escribir notación científica)
     y coeficiente redondeado distinto (6.02 en vez de 6.022) — obliga
     a leer el exponente Y el coeficiente, no solo reconocer la forma. */
  function particleDistractors(mol, rightText) {
    const coef = Math.round(mol * 6.022 * 1000) / 1000;
    const coef2 = Math.round(mol * 6.02 * 1000) / 1000;
    const pool = [rightText, coef + ' × 10²²', coef + ' × 10²⁴', coef2 + ' × 10²³'];
    const uniq = [...new Set(pool)];
    /* HOTFIX: faltaba mezclar el orden — sin esto la respuesta
       correcta (rightText) quedaba SIEMPRE en la primera posición,
       porque venía primera en `pool` y Set conserva el orden de
       inserción. Se detectó auditando el propio código, no en un
       reporte externo. */
    return shuffle(uniq.length >= 4 ? uniq : [...uniq, coef + ' × 10²³ (aprox.)']);
  }
  /* distractores conceptuales para masa/mol: error de magnitud (×10,
     ÷10 — como confundir g con kg o mover mal el punto decimal) y de
     "mitad/doble" (típico error de copiar mal un coeficiente). */
  function qtyDistractors(right) {
    const pool = new Set([
      right,
      Math.round(right * 10 * 1000) / 1000,
      Math.round(right / 10 * 1000) / 1000,
      Math.round(right * 2 * 1000) / 1000
    ]);
    pool.delete(right);
    const extra = [...pool].filter(v => v !== right);
    return shuffle([right, ...shuffle(extra).slice(0, 3)]);
  }
  const CONV_TYPES = ['masa-mol', 'mol-masa', 'mol-part', 'part-mol', 'masa-part', 'part-masa', 'cadena-mp', 'cadena-pm'];
  function makeConversion(chem, forcedType) {
    const comp = chem.COMPOUNDS[Math.floor(Math.random() * chem.COMPOUNDS.length)];
    const mm = chem.molarMass(comp.f);
    const mol = pickMolValue();
    const g = chem.massFromMoles(mol, mm);
    const partText = fmtParticles(mol);
    const type = forcedType || CONV_TYPES[Math.floor(Math.random() * CONV_TYPES.length)];
    const nombre = comp.name, formula = sub(comp.f);
    switch (type) {
      case 'masa-mol':
        return { prompt:`Tenés <strong>${g} g</strong> de ${nombre} (${formula}, ${mm} g/mol). ¿Cuántos <strong>mol</strong> son?`,
          options: qtyDistractors(mol).map(o => ({ label:o+' mol', ok:o===mol })), explica:`mol = ${g} ÷ ${mm} = ${mol}` };
      case 'mol-masa':
        return { prompt:`Tenés <strong>${mol} mol</strong> de ${nombre} (${mm} g/mol). ¿Cuántos <strong>gramos</strong> son?`,
          options: qtyDistractors(g).map(o => ({ label:o+' g', ok:o===g })), explica:`masa = ${mol} × ${mm} = ${g}` };
      case 'mol-part':
        return { prompt:`¿Cuántas <strong>partículas</strong> hay en <strong>${mol} mol</strong> de ${nombre}?`,
          options: shuffle(particleDistractors(mol, partText)).map(o => ({ label:o, ok:o===partText })), explica:`${mol} × 6.022×10²³ = ${partText}` };
      case 'part-mol':
        return { prompt:`Tenés <strong>${partText}</strong> partículas de ${nombre}. ¿Cuántos <strong>mol</strong> son?`,
          options: qtyDistractors(mol).map(o => ({ label:o+' mol', ok:o===mol })), explica:`mol = partículas ÷ 6.022×10²³ = ${mol}` };
      case 'masa-part':
        return { prompt:`Tenés <strong>${g} g</strong> de ${nombre} (${mm} g/mol). ¿Cuántas <strong>partículas</strong> son?`,
          options: shuffle(particleDistractors(mol, partText)).map(o => ({ label:o, ok:o===partText })), explica:`primero mol = ${g}÷${mm} = ${mol}, luego partículas = ${mol}×6.022×10²³ = ${partText}` };
      case 'part-masa':
        return { prompt:`Tenés <strong>${partText}</strong> partículas de ${nombre} (${mm} g/mol). ¿Cuántos <strong>gramos</strong> son?`,
          options: qtyDistractors(g).map(o => ({ label:o+' g', ok:o===g })), explica:`primero mol = ${partText}÷6.022×10²³ = ${mol}, luego masa = ${mol}×${mm} = ${g}` };
      case 'cadena-mp': {
        /* dos conversiones consecutivas: masa → mol → partículas.
           El distractor MÁS importante acá es el propio valor de mol
           (el error real más común: quedarse a mitad de camino y
           entregar el mol como si fuera la respuesta final). */
        const pd = particleDistractors(mol, partText).filter(v => v !== partText); /* 3 distractores, ya únicos y distintos de partText */
        const opts = [partText, mol+' mol (te quedaste en el paso intermedio)', pd[0], pd[1]];
        return { prompt:`Tenés <strong>${g} g</strong> de ${nombre} (${mm} g/mol). Convertí primero a mol y luego a <strong>partículas</strong>. ¿Cuál es el resultado final?`,
          options: shuffle(opts).map(o => ({ label:o, ok:o===partText })), explica:`mol = ${g}÷${mm} = ${mol} → partículas = ${mol}×6.022×10²³ = ${partText}` };
      }
      case 'cadena-pm': {
        const qd = qtyDistractors(g).filter(v => v !== g); /* 3 distractores, ya únicos y distintos de g */
        const opts = [g, mol+' mol (te quedaste en el paso intermedio)', qd[0], qd[1]];
        return { prompt:`Tenés <strong>${partText}</strong> partículas de ${nombre} (${mm} g/mol). Convertí primero a mol y luego a <strong>gramos</strong>. ¿Cuál es el resultado final?`,
          options: shuffle(opts).map(o => ({ label:o+(String(o).includes('paso')?'':' g'), ok:o===g })), explica:`mol = ${partText}÷6.022×10²³ = ${mol} → masa = ${mol}×${mm} = ${g} g` };
      }
    }
  }

  function makeCase(idx){
    const chem=CHEM();
    if(idx===0){ const comp=chem.COMPOUNDS[Math.floor(Math.random()*chem.COMPOUNDS.length)]; const mm=chem.molarMass(comp.f);
      const opts=shuffle([mm,mm+2,Math.round(mm/2),mm+16]).slice(0,4);
      return {prompt:`¿Masa molar de <span style="font-family:var(--font-code);color:${C}">${sub(comp.f)}</span> (${comp.name})?`,
        options:opts.map(o=>({label:o+' g/mol',ok:o===mm})),explica:`Sumando las masas atómicas: ${mm} g/mol.`}; }
    if(idx===1){ return makeConversion(chem); }
    /* idx 2: proporción de reacción — Parte II: pool de valores ampliado (antes solo [2,4,6]) */
    const eq=chem.EQUATIONS[Math.floor(Math.random()*chem.EQUATIONS.length)];
    const i1=0, i2=eq.terms.length-1; const c1=eq.coeffs[i1], c2=eq.coeffs[i2];
    const dado=pickMolValue(); const resp=Math.round(dado*c2/c1*100)/100;
    const opts=shuffle([resp,dado,Math.round(dado*c1/c2*100)/100,resp+2]).slice(0,4);
    return {prompt:`En <span style="font-family:var(--font-code);font-size:1.05rem"><strong style="color:${C}">${eq.coeffs[i1]}</strong> ${sub(eq.terms[i1])} <span style="color:var(--text-muted)">…</span> <span style="color:${C};font-weight:900;margin:0 .25rem">⟶</span> <strong style="color:${C}">${eq.coeffs[i2]}</strong> ${sub(eq.terms[i2])}</span>, si reaccionan <strong>${dado} mol</strong> de ${sub(eq.terms[i1])}, ¿cuántos mol de ${sub(eq.terms[i2])} se forman?`,
      options:[...new Set(opts)].map(o=>({label:o+' mol',ok:o===resp})),explica:`Proporción ${c1}:${c2} → ${dado} × ${c2}/${c1} = ${resp} mol.`};
  }
  function renderJuego(unit,uData){
    const stt=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,stt.done),co=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;}).join('');
    return `<div class="u6-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">🧮</span><div><h3 style="margin:0">Maestro del Mol</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Domina la masa molar, las conversiones y las proporciones. Calcula, no memorices.</p></div></div>
        <div style="margin-top:.7rem;font-family:var(--font-code);font-size:.8rem;color:${C}">🏆 Mejor: ${stt.best} / 500</div></div>
      ${cards}</div>`;
  }
  function bindJuego(unit,uData){const c=document.getElementById('tab-content');if(!c)return;if(typeof Mentor!=='undefined')Mentor.bind(c);c.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));}
  function backLevels(){const c=document.getElementById('tab-content');if(!c)return;const f=loadUnitData();c.innerHTML=renderJuego(null,f);bindJuego(null,f);}
  function startLevel(idx){const lv=GAME_LEVELS[idx];if(!lv)return;game={idx,lv,round:0,score:0,correct:0,answered:false,caso:null};/*FIX-XP-02: sin XP por solo iniciar*/nextRound();}
  function nextRound(){game.caso=makeCase(game.idx);game.answered=false;drawRound();}
  function drawRound(){
    const c=document.getElementById('tab-content');if(!c||!game)return;const caso=game.caso;
    c.innerHTML=`<div style="animation:pageIn .35s ease">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u6g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.round+1}/${GAME_ROUNDS} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="text-align:center;font-size:1rem;font-weight:700;color:${C};margin-bottom:1rem">${caso.prompt}</p>
        <div id="u6g-opts" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem">${caso.options.map((o,k)=>`<button class="btn btn-ghost" data-k="${k}" style="height:auto;padding:.7rem;font-family:var(--font-code)">${o.label}</button>`).join('')}</div>
        <div id="u6g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u6g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>answerRound(+b.getAttribute('data-k'))));
  }
  function answerRound(k){
    if(!game||game.answered)return;game.answered=true;const caso=game.caso;const ok=!!caso.options[k].ok;
    if(ok){game.correct++;game.score+=100;}
    const opts=document.getElementById('u6g-opts');
    opts.querySelectorAll('[data-k]').forEach(b=>{const i=+b.getAttribute('data-k');b.disabled=true;if(caso.options[i].ok)b.style.borderColor='var(--green)';if(i===k&&!ok)b.style.borderColor='var(--red)';});
    document.getElementById('u6g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.86rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${caso.explica}</p></div>
      <button class="btn btn-primary btn-sm" id="u6g-next" style="margin-top:.8rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u6g-next').addEventListener('click',()=>{if(game.round<GAME_ROUNDS-1){game.round++;nextRound();}else finishLevel();});
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
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔁'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${GAME_ROUNDS} correctas</p>
      ${unlk?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${score>stt.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u6g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u6g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u6g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u6g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 de 30, 70%)
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U06)?window.PREGUNTAS_U06.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u06.js</code>.</p></div>`;
    return `<div id="u6-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Estequiometría</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u6-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u6-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u6-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u6-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u6-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u6-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u6-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u6-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u6-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u6-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u6-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();const yaOtorgadoAntes=!!u.examXpAwarded;patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1,examXpAwarded:u.examXpAwarded||passed});
    if(passed&&!yaOtorgadoAntes)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u6-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u6-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u6-exam-close">Cerrar</button></div>`;
    document.getElementById('u6-exam-retry').addEventListener('click',startExam);
    document.getElementById('u6-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO + MANIFEST
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-06] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'estequiometría':'Parte de la química que calcula las cantidades que intervienen en las reacciones.',
        'mol':'Unidad de cantidad de sustancia: 6.022 × 10²³ partículas.',
        'número de Avogadro':'La cantidad de partículas en un mol: 6.022 × 10²³.',
        'masa molar':'Masa de un mol de sustancia, en g/mol; es la suma de las masas atómicas de su fórmula.',
        'masa atómica':'Masa de un átomo de un elemento (en la tabla periódica).',
        'unidad de masa atómica':'Unidad muy pequeña para medir la masa de átomos y moléculas.',
        'ecuación química':'Representación de una reacción con reactivos y productos.',
        'coeficiente':'Número grande delante de una fórmula que indica cuántas unidades participan.',
        'subíndice':'Número pequeño dentro de una fórmula que indica cuántos átomos hay.',
        'balanceo':'Ajustar los coeficientes para que haya los mismos átomos a ambos lados.',
        'ley de conservación de la masa':'La masa total no cambia en una reacción química.',
        'composición porcentual':'Porcentaje de la masa que aporta cada elemento en un compuesto.',
        'reactivo':'Sustancia que entra en una reacción.',
        'producto':'Sustancia que se forma en una reacción.',
        'proporción estequiométrica':'Relación fija (según los coeficientes) en que reaccionan las sustancias.',
        'partícula':'Átomo, molécula o ion; lo que se cuenta con el mol.'
      },
      mqc: {
        'topic-0':{ detonante:'Un químico necesita exactamente cierta cantidad de una sustancia… pero no puede contar átomos uno a uno. ¿Cómo lo resuelve?', commit:{pregunta:'Para "contar" átomos, el químico usa…',opciones:['una lupa','el mol y la masa','el color'],correcta:1,explica:'Cuenta pesando: el mol conecta masa y cantidad.'}, conexion:'Toda la unidad gira en torno a esta idea.' },
        'topic-1':{ detonante:'¿Qué tienen en común una "docena" y un "mol"?', commit:{pregunta:'El mol mide…',opciones:['masa','cantidad de partículas','volumen'],correcta:1,explica:'Es una cantidad fija de partículas: 6.022 × 10²³.'}, conexion:'Como una docena son 12, un mol son 6.022 × 10²³.' },
        'topic-2':{ detonante:'¿De dónde salen los "gramos por mol"?', commit:{pregunta:'La masa molar se obtiene…',opciones:['sumando masas atómicas','contando enlaces','midiendo el color'],correcta:0,explica:'Sumas las masas atómicas de la fórmula.'}, conexion:'La tabla periódica te da cada masa atómica.' },
        'topic-3':{ detonante:'¿Cómo pasas de gramos a número de átomos?', commit:{pregunta:'El puente entre masa y cantidad es…',opciones:['la temperatura','el mol','el color'],correcta:1,explica:'Primero a moles con la masa molar; luego a partículas con Avogadro.'}, conexion:'El mol siempre es el paso intermedio.' },
        'topic-4':{ detonante:'¿Qué parte del agua es oxígeno, en masa?', commit:{pregunta:'La composición porcentual se calcula…',opciones:['masa del elemento ÷ masa molar × 100','al azar','por el color'],correcta:0,explica:'Es la fracción de masa que aporta cada elemento.'}, conexion:'Útil para saber pureza y contenido.' },
        'topic-5':{ detonante:'Si nada se pierde, ¿por qué a veces "faltan" átomos en una ecuación?', commit:{pregunta:'Al balancear se cambian los…',opciones:['subíndices','coeficientes','símbolos'],correcta:1,explica:'Solo los coeficientes; los subíndices definen la sustancia.'}, conexion:'La masa se conserva: mismos átomos a ambos lados.' },
        'topic-6':{ detonante:'¿Los coeficientes solo sirven para balancear?', commit:{pregunta:'Los coeficientes también dan…',opciones:['la proporción de la reacción','el color','la temperatura'],correcta:0,explica:'Indican en qué proporción (mol a mol) reaccionan.'}, conexion:'Con ellos predices cuánto se forma.' },
        'topic-7':{ detonante:'¿Para qué sirve todo esto en la vida real?', commit:{pregunta:'La estequiometría permite…',opciones:['predecir cantidades','adivinar','nada'],correcta:0,explica:'Predecir cuánto se necesita y cuánto se obtiene.'}, conexion:'De la cocina a la industria.' }
      },
      mentor: {
        'tab:teoria':'La estequiometría asusta, pero es pura lógica: el mol conecta lo que pesas con lo que cuentas. Domina ese puente y lo demás sale solo.',
        'tab:simuladores':'Calcula la masa molar sumando, y usa el mol como puente para convertir. Practica hasta que te salga natural.',
        'tab:juego':'Masa molar, conversiones y proporciones: si entiendes el mol, ganas.',
        'tab:examen':'No memorices números: entiende el procedimiento. Si fallas, te muestro el error frecuente.'
      },
      curiosidades: [
        {topic:'topic-1',texto:'El número de Avogadro es tan grande que un mol de granos de arroz cubriría toda la Tierra con una capa de kilómetros.'},
        {topic:'topic-2',texto:'Un mol de agua (18 g) cabe en poco más de una cucharada… ¡y tiene 6.022 × 10²³ moléculas!'},
        {topic:'topic-5',texto:'La ley de conservación de la masa la formuló Lavoisier: "nada se crea, nada se destruye, todo se transforma".'},
        {topic:'topic-0',texto:'Los químicos "cuentan pesando": es imposible contar átomos, pero muy fácil pesarlos.'}
      ],
      errores: [
        {id:'e1',topic:'topic-2',creencia:'La masa molar es lo mismo que la masa de un átomo.',porque:'Se confunden los conceptos.',correccion:'La masa molar es la masa de un MOL entero (6.022 × 10²³ partículas), en g/mol, no la de un solo átomo.'},
        {id:'e2',topic:'topic-1',creencia:'Un mol siempre pesa lo mismo.',porque:'Se cree que el mol es una masa.',correccion:'El mol es una cantidad fija de partículas; su masa depende de la sustancia (1 mol de agua ≠ 1 mol de hierro en gramos).'},
        {id:'e3',topic:'topic-5',creencia:'Para balancear se cambian los subíndices.',porque:'Se busca igualar átomos por el camino equivocado.',correccion:'Se cambian los COEFICIENTES, nunca los subíndices: cambiar un subíndice convierte la sustancia en otra distinta.'},
        {id:'e4',topic:'topic-3',creencia:'Los gramos y las partículas son lo mismo.',porque:'Se mezclan masa y cantidad.',correccion:'Son cosas distintas: se pasa de una a otra usando el mol (masa molar y número de Avogadro).'},
        {id:'e5',topic:'topic-3',creencia:'Se puede convertir masa a mol sin la masa molar.',porque:'Se aplica una regla de tres sin el dato clave.',correccion:'La masa molar es imprescindible: es el puente entre gramos y moles.'}
      ],
      xref: {
        'teoria:topic-2':[{type:'unit',unit:'unit-05',tab:'teoria',label:'Fórmulas (Unidad V)'},{type:'section',section:'periodic-table',label:'Masas atómicas en la Tabla'}],
        'teoria:topic-3':[{tab:'simuladores',label:'La Balanza Molar'}],
        'teoria:topic-5':[{tab:'simuladores',label:'Balanceador'}],
        'teoria:topic-7':[{type:'unit',unit:'unit-07',tab:'teoria',label:'Te servirá en Disoluciones (Unidad VII)'}],
        'sim:estequiometria':[{type:'unit',unit:'unit-05',tab:'simuladores',label:'Constructor de Fórmulas (Unidad V)'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U06)?window.BANCO_PNE_U06:null
    });
  }
})();
