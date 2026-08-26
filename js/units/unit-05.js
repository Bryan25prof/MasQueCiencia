/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-05.js  |  UNIDAD V — "Nomenclatura Química"
   Experiencia: "El Idioma de los Compuestos"
   ================================================================
   MQC Experience 05. Arquitectura v1.0 + Design System v1.0 (coral).
   Reutiliza MQCChem (cargas, valencia, predicción, fórmulas, nombres),
   VIZ (ion/lewis) y toda la capa compartida. Sin sistemas nuevos.
   Tabs: unit-05:teoria · :simuladores · :juego · :examen
   ================================================================ */
(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'unit-05';
  const C = '#FF6F00';   /* naranja — color temático de la Unidad V (Identidad v2.0) */

  /* ── accesos defensivos ── */
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function CHEM(){ return (typeof MQCChem!=='undefined')?MQCChem:null; }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}
  function vbox(svg){ return `<div class="viz-box" style="text-align:center;margin:.6rem 0">${svg}</div>`; }
  function ionSVG(sym,charge){ if(typeof VIZ==='undefined')return sym+charge; return VIZ.svg(VIZ.ion({symbol:sym,charge:charge,cx:50,cy:50,r:26}),'0 0 100 100'); }

  /* ============================================================
     1) TEORÍA (8 temas) con ciclo MQC
  ============================================================ */
  const TEORIA = [
    { titulo:'¿Por qué existe la nomenclatura?', icon:'🗣️', html:`
      <p>Cada compuesto tiene un nombre que <strong>no es un capricho</strong>: es una fórmula disfrazada de palabra. La nomenclatura es el <strong>idioma universal</strong> de la química.</p>
      ${box('La idea de la unidad','Si entiendes la lógica, no necesitas memorizar cada nombre: puedes <strong>deducir</strong> el nombre desde la fórmula… o la fórmula desde el nombre.','var(--gold)')}` },
    { titulo:'Número de oxidación (valencia)', icon:'±', html:`
      <p>El <strong>número de oxidación</strong> indica cuántos electrones gana, pierde o comparte un átomo. En un compuesto neutro, todas las cargas <strong>suman cero</strong>.</p>
      ${box('Puente con la Unidad IV','Es la misma idea de las cargas iónicas que ya viste: el metal cede (positivo), el no metal toma (negativo).','var(--unit-04, #9C27B0)')}` },
    { titulo:'Iones: cationes y aniones', icon:'➕➖', html:`
      <p>El <strong>catión</strong> tiene carga positiva (perdió electrones); el <strong>anión</strong>, negativa (los ganó). Los aniones monoatómicos se nombran con la raíz + <strong>"uro"</strong> (cloruro, sulfuro), salvo el <strong>óxido</strong>.</p>` },
    { titulo:'La regla del cruce', icon:'✖️', html:`
      <p>Para escribir la fórmula, la <strong>carga de un ion se cruza</strong> como subíndice del otro (sin el signo) y luego se <strong>simplifica</strong> la proporción.</p>
      ${box('Ejemplo','Al³⁺ y O²⁻ → se cruzan → Al₂O₃. Ca²⁺ y O²⁻ → Ca₂O₂ → se simplifica → CaO.','var(--green)')}` },
    { titulo:'Compuestos binarios iónicos', icon:'🧂', html:`
      <p>Metal + no metal forman <strong>sales binarias</strong> y <strong>óxidos</strong>. El nombre va <strong>al revés</strong> de la fórmula: primero el anión, luego "de" y el catión.</p>
      ${box('Ojo con el orden','NaCl = cloruro de sodio (no "sodio de cloro"). El nombre invierte el orden de la fórmula.','var(--red)')}` },
    { titulo:'Nomenclatura de Stock (números romanos)', icon:'Ⅲ', html:`
      <p>Algunos metales tienen <strong>más de una valencia</strong> (hierro: Fe²⁺ y Fe³⁺). El número romano indica cuál se usa: <strong>óxido de hierro(III)</strong> = Fe₂O₃.</p>` },
    { titulo:'Prefijos en compuestos covalentes', icon:'②', html:`
      <p>Entre no metales se usan <strong>prefijos</strong> (mono, di, tri…) para contar los átomos: CO₂ = <strong>di</strong>óxido de carbono. En los iónicos <strong>no</strong> se usan: la carga fija la proporción.</p>` },
    { titulo:'Aplicaciones cotidianas', icon:'🌍', html:`
      <p>Muchos nombres cotidianos esconden una fórmula: la <strong>sal</strong> es cloruro de sodio (NaCl); el <strong>agua</strong>, óxido de dihidrógeno (H₂O); la <strong>herrumbre</strong>, óxido de hierro(III).</p>
      ${box('Comprender > memorizar','Al final, nombre y fórmula son dos caras de lo mismo: con la lógica traduces una en otra.','var(--green)')}` }
  ];

  const TOPIC_HINTS = {
    3:['Cruza las cargas como subíndices y quita el signo.','Si los subíndices se pueden simplificar, hazlo (Ca₂O₂ → CaO).'],
    4:['El nombre va al revés: primero el anión (termina en -uro/-óxido), luego "de" y el metal.']
  };

  function enrich(html,i){
    const tid='topic-'+i; let pre='';
    if(typeof MQC!=='undefined'){ pre+=MQC.detonante(UNIT_ID,tid); pre+=MQC.commit(UNIT_ID,tid); }
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
    if(typeof VIZ!=='undefined'){
      if(i===2){ body+=vbox(VIZ.svg(VIZ.ion({symbol:'Na',charge:'+',cx:40,cy:50,r:22})+VIZ.ion({symbol:'Cl',charge:'−',cx:110,cy:50,r:24}),'0 0 150 100')); }
      else if(i===3){ body+=vbox(VIZ.svg(VIZ.ion({symbol:'Al',charge:'3+',cx:40,cy:50,r:22})+VIZ.ion({symbol:'O',charge:'2−',cx:110,cy:50,r:24}),'0 0 150 100')+'<div style="font-family:var(--font-code);color:var(--green);font-size:.9rem">→ Al₂O₃</div>'); }
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
      return `<div class="u5-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u5-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u5-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u5-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${bridgeHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">La nomenclatura es un idioma con lógica. <strong>Comprométete</strong> antes de leer cada tema: verás que el nombre y la fórmula se traducen entre sí.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }
  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u5-caret');
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
      {id:'sim-05-01',icon:'🏗️',name:'Constructor de Fórmulas',desc:'Elige iones, cruza sus cargas y construye la fórmula y el nombre.'},
      {id:'sim-05-02',icon:'🔁',name:'Nombre ↔ Fórmula',desc:'Traduce en ambos sentidos, por niveles.'},
      {id:'sim-05-03',icon:'➕',name:'Camino del Ion',desc:'Decide la carga de un átomo y nombra su ion.'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u5-sims" style="animation:pageIn .4s ease">${mentorHTML}
      <p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Tres experiencias para <strong>traducir</strong> entre nombre y fórmula con la lógica de las cargas. ${(typeof CrossRef!=='undefined')?CrossRef.renderChips(UNIT_ID,'sim:nomenclatura'):''}</p>
      <div id="u5-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u5-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u5-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u5-stage"></div>`;
    document.getElementById('u5-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u5-stage');
    if(id==='sim-05-01')simConstructor(st);
    else if(id==='sim-05-02')simTraductor(st);
    else if(id==='sim-05-03')simIon(st);
  }

  /* SIM 1 — Constructor de Fórmulas (reutiliza MQCChem) */
  function simConstructor(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    let ci=2, ai=1, committed=false, guess=null; /* Na, Cl por defecto */
    function opt(list,sel,keyName){ return list.map((x,idx)=>`<option value="${idx}" ${idx===sel?'selected':''}>${(x.formula||x.sym)} ${x.charge>0?'+'+(x.charge===1?'':x.charge):'−'+(Math.abs(x.charge)===1?'':Math.abs(x.charge))} · ${x.name}</option>`).join(''); }
    function distractors(correct,cat,an){
      const set=new Set([correct]);
      const cand=[`${cat.sym}${an.formula||an.sym}`, `${cat.sym}<sub>2</sub>${an.formula||an.sym}`, `${cat.sym}${an.formula||an.sym}<sub>2</sub>`, `${cat.sym}<sub>3</sub>${an.formula||an.sym}<sub>2</sub>`];
      for(const c of cand){ if(set.size>=4)break; if(c!==correct)set.add(c); }
      return shuffle([...set]);
    }
    function reveal(cat,an,cross){
      const nm=chem.nameIonic(cat,an);
      const ok=guess===cross.formula;
      return `${vbox(VIZ.svg(VIZ.ion({symbol:cat.sym,charge:(cat.charge>0?'+'+(cat.charge===1?'':cat.charge):''),cx:40,cy:50,r:22})+VIZ.ion({symbol:(an.formula||an.sym),charge:('−'+(Math.abs(an.charge)===1?'':Math.abs(an.charge))),cx:118,cy:50,r:24}),'0 0 160 100'))}
        <div style="text-align:center"><div style="font-family:var(--font-code);font-size:1.5rem;color:${C};font-weight:700">${cross.formula}</div>
        <div style="font-size:.95rem;color:var(--text-primary);margin-top:.2rem">${nm}</div>
        <p style="font-size:.82rem;color:var(--text-secondary);margin-top:.4rem">${ok?'<span style="color:var(--green)">✓ ¡Bien cruzado!</span> ':''}Carga ${Math.abs(an.charge)} del anión → subíndice del catión, y viceversa; luego se simplifica.</p></div>`;
    }
    function draw(){
      const cat=chem.CATIONS[ci], an=chem.ANIONS[ai], cross=chem.crossFormula(cat,an);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-bottom:.4rem">
          <select id="u5c-cat" class="qi-overlay-input" style="margin:0">${opt(chem.CATIONS,ci)}</select>
          <select id="u5c-an" class="qi-overlay-input" style="margin:0">${opt(chem.ANIONS,ai)}</select></div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted)">Catión ${cat.charge>0?'+'+cat.charge:cat.charge} · Anión ${an.charge}</p>
        ${!committed?`<div class="mqc-commit" style="margin:.4rem 0"><span class="mqc-badge">✋ Comprométete</span><p>¿Cuál es la fórmula correcta?</p>
          <div class="mqc-commit-opts">${distractors(cross.formula,cat,an).map(f=>`<button class="btn btn-ghost btn-sm" data-guess="${f}">${f}</button>`).join('')}</div></div>`:reveal(cat,an,cross)}
      </div>`;
      st.querySelector('#u5c-cat').addEventListener('change',e=>{ci=+e.target.value;committed=false;guess=null;draw();});
      st.querySelector('#u5c-an').addEventListener('change',e=>{ai=+e.target.value;committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(b=>b.addEventListener('click',()=>{guess=b.getAttribute('data-guess');committed=true;const cr=chem.crossFormula(chem.CATIONS[ci],chem.ANIONS[ai]);draw();markSimDone('sim-05-01',guess===cr.formula?100:80);}));
    }
    draw();
  }

  /* SIM 2 — Nombre ↔ Fórmula (3 niveles) */
  function simTraductor(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    /* genera pares fórmula/nombre deterministas */
    const pairs=[];
    [['sodio','cloruro'],['calcio','óxido'],['aluminio','óxido'],['magnesio','sulfuro'],['sodio','óxido'],['potasio','fluoruro'],['calcio','cloruro'],['magnesio','hidróxido'],['hierro(III)','óxido'],['aluminio','sulfuro']].forEach(([cn,an])=>{
      const c=chem.CATIONS.find(x=>x.name===cn), a=chem.ANIONS.find(x=>x.name===an);
      if(c&&a){ const cr=chem.crossFormula(c,a); pairs.push({formula:cr.formula,name:chem.nameIonic(c,a)}); }
    });
    const LV=[
      {titulo:'Nivel 1 · De fórmula a nombre', ask:p=>`¿Cómo se llama <span style="font-family:var(--font-code);color:${C}">${p.formula}</span>?`, right:p=>p.name, pool:()=>pairs.map(x=>x.name)},
      {titulo:'Nivel 2 · De nombre a fórmula', ask:p=>`¿Cuál es la fórmula de <strong>${p.name}</strong>?`, right:p=>p.formula, pool:()=>pairs.map(x=>x.formula)},
      {titulo:'Nivel 3 · Mixto', ask:p=>Math.random()<.5?`¿Nombre de <span style="font-family:var(--font-code);color:${C}">${p.formula}</span>?`:`¿Fórmula de <strong>${p.name}</strong>?`, right:p=>p._mix==='name'?p.name:p.formula, pool:null}
    ];
    let lvIdx=0,state=null;
    function startLv(){ state={items:shuffle(pairs).slice(0,5),i:0,correct:0,answered:false}; draw(); }
    function draw(){
      const lv=LV[lvIdx], p=Object.assign({},state.items[state.i]);
      let ask,right,opts;
      if(lvIdx<2){ ask=lv.ask(p); right=lv.right(p); const pool=[...new Set(lv.pool())]; opts=shuffle([right,...shuffle(pool.filter(x=>x!==right)).slice(0,3)]); }
      else { const mode=Math.random()<.5?'name':'formula'; p._mix=mode; ask=mode==='name'?`¿Nombre de <span style="font-family:var(--font-code);color:${C}">${p.formula}</span>?`:`¿Fórmula de <strong>${p.name}</strong>?`; right=mode==='name'?p.name:p.formula; const pool=[...new Set(pairs.map(x=>mode==='name'?x.name:x.formula))]; opts=shuffle([right,...shuffle(pool.filter(x=>x!==right)).slice(0,3)]); }
      state._right=right;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="font-weight:700;color:${C};font-size:.9rem">${lv.titulo}</span><span style="font-family:var(--font-code);font-size:.76rem;color:var(--text-muted)">${state.i+1}/${state.items.length}</span></div>
        <p style="text-align:center;font-size:.98rem;margin:.4rem 0 .8rem">${ask}</p>
        <div id="u5t-ops" style="display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center">${opts.map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o}</button>`).join('')}</div>
        <div id="u5t-fb" style="text-align:center;margin-top:.8rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>answer(b.getAttribute('data-o'))));
    }
    function answer(val){
      if(state.answered)return;state.answered=true;const ok=val===state._right;
      if(ok)state.correct++;
      st.querySelectorAll('#u5t-ops [data-o]').forEach(b=>{b.disabled=true;if(b.getAttribute('data-o')===state._right)b.style.borderColor='var(--green)';if(b.getAttribute('data-o')===val&&!ok)b.style.borderColor='var(--red)';});
      st.querySelector('#u5t-fb').innerHTML=`<span style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ Correcto':'✗ Era: '+state._right}</span><br><button class="btn btn-primary btn-sm" id="u5t-next" style="margin-top:.5rem">${state.i<state.items.length-1?'Siguiente →':'Terminar nivel'}</button>`;
      st.querySelector('#u5t-next').addEventListener('click',()=>{if(state.i<state.items.length-1){state.i++;state.answered=false;draw();}else finishLv();});
    }
    function finishLv(){
      const passed=state.correct>=Math.ceil(state.items.length*0.6);
      if(passed)markSimDone('sim-05-02',state.correct===state.items.length?100:90);
      const hayMas=lvIdx<LV.length-1;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;text-align:center">
        <div style="font-size:2.4rem">${passed?'🎉':'🔁'}</div><h3 style="margin:.3rem 0">${LV[lvIdx].titulo}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">${state.correct}/${state.items.length} correctas</p>
        ${passed&&hayMas?`<button class="btn btn-primary btn-sm" id="u5t-nextlv" style="margin-top:.6rem">Siguiente nivel →</button> `:''}
        <button class="btn btn-ghost btn-sm" id="u5t-retry" style="margin-top:.6rem">↻ Repetir nivel</button></div>`;
      const nb=st.querySelector('#u5t-nextlv');if(nb)nb.addEventListener('click',()=>{lvIdx++;startLv();});
      st.querySelector('#u5t-retry').addEventListener('click',startLv);
    }
    startLv();
  }

  /* SIM 3 — Camino del Ion (reutiliza MQCChem.ionFromElement) */
  function simIon(st){
    const chem=CHEM(); if(!chem){ st.innerHTML='<p class="muted">MQCChem no disponible.</p>'; return; }
    const pool=chem.els().filter(e=>chem.MAIN.includes(e.group)&&e.period<=4&&e.type!=='noble-gas'&&chem.ionChargeOf(e)!==0&&chem.ionChargeOf(e)!=null);
    let e=chem.elBySym('Na')||pool[0], committed=false, guess=null;
    function opts(){ return pool.map(x=>`<option value="${x.z}" ${x.z===e.z?'selected':''}>${x.symbol} — ${x.name}</option>`).join(''); }
    function reveal(){
      const ion=chem.ionFromElement(e); const ok=guess===ion.kind;
      return `${vbox(ionSVG(e.symbol,ion.chargeStr))}<p style="text-align:center;font-size:.9rem;color:var(--text-secondary)">${ok?'<span style="color:var(--green)">✓ ¡Correcto!</span> ':''}${e.name} forma un <strong>${ion.kind}</strong> ${e.symbol}${ion.chargeStr} → se nombra <strong>${ion.name}</strong>.</p>`;
    }
    function draw(){
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.5rem"><select id="u5i-e" class="qi-overlay-input" style="margin:0">${opts()}</select></div>
        ${!committed?`<div class="mqc-commit" style="margin:.4rem 0"><span class="mqc-badge">✋ Comprométete</span><p>Al formar un ion, ${e.symbol} será…</p>
          <div class="mqc-commit-opts"><button class="btn btn-ghost btn-sm" data-guess="catión">Catión (+)</button><button class="btn btn-ghost btn-sm" data-guess="anión">Anión (−)</button></div></div>`:reveal()}
      </div>`;
      st.querySelector('#u5i-e').addEventListener('change',ev=>{e=chem.elByZ(+ev.target.value);committed=false;guess=null;draw();});
      st.querySelectorAll('[data-guess]').forEach(b=>b.addEventListener('click',()=>{guess=b.getAttribute('data-guess');committed=true;draw();markSimDone('sim-05-03',guess===chem.ionFromElement(e).kind?100:80);}));
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Traductor Universal" (razonar)
  ============================================================ */
  const GAME_LEVELS=[
    {id:'aprendiz',nombre:'Aprendiz',icon:'✖️',desc:'Cruza las cargas para construir la fórmula.'},
    {id:'traductor',nombre:'Traductor',icon:'🔁',desc:'De la fórmula al nombre correcto.'},
    {id:'maestro',nombre:'Maestro',icon:'🌍',desc:'De una descripción cotidiana a la fórmula.'}
  ];
  const GAME_ROUNDS=5,GAME_PASS=3;
  const REALWORLD=[
    {desc:'La sal de mesa.',cat:'sodio',an:'cloruro'},
    {desc:'La herrumbre (óxido rojizo del hierro).',cat:'hierro(III)',an:'óxido'},
    {desc:'La cal viva, un óxido de calcio.',cat:'calcio',an:'óxido'}
  ];
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  function pickPair(){const chem=CHEM();const c=chem.CATIONS[Math.floor(Math.random()*chem.CATIONS.length)];const a=chem.ANIONS[Math.floor(Math.random()*chem.ANIONS.length)];return {c,a};}
  function makeCase(idx){
    const chem=CHEM();
    if(idx===0){ const {c,a}=pickPair(); const cr=chem.crossFormula(c,a);
      const set=new Set([cr.formula]); const cand=[`${c.sym}${a.formula||a.sym}`,`${c.sym}<sub>2</sub>${a.formula||a.sym}`,`${c.sym}${a.formula||a.sym}<sub>2</sub>`,`${c.sym}<sub>3</sub>${a.formula||a.sym}<sub>2</sub>`];
      for(const x of cand){ if(set.size>=4)break; if(x!==cr.formula)set.add(x); }
      return {prompt:`Cruza las cargas: <strong>${c.name}</strong> (${c.charge>0?'+'+c.charge:c.charge}) + <strong>${a.name}</strong> (${a.charge}). ¿Fórmula?`,
        options:shuffle([...set]).map(f=>({label:f,ok:f===cr.formula})),explica:`Cruzando y simplificando: ${cr.formula}.`}; }
    if(idx===1){ const {c,a}=pickPair(); const cr=chem.crossFormula(c,a); const right=chem.nameIonic(c,a);
      const names=new Set([right]); while(names.size<4){ const {c:c2,a:a2}=pickPair(); names.add(chem.nameIonic(c2,a2)); }
      return {prompt:`¿Cómo se llama <span style="font-family:var(--font-code);color:${C}">${cr.formula}</span>?`,
        options:shuffle([...names]).map(n=>({label:n,ok:n===right})),explica:`El nombre invierte el orden: ${right}.`}; }
    /* idx 2 */
    const rw=REALWORLD[Math.floor(Math.random()*REALWORLD.length)];
    const c=chem.CATIONS.find(x=>x.name===rw.cat), a=chem.ANIONS.find(x=>x.name===rw.an); const cr=chem.crossFormula(c,a);
    const set=new Set([cr.formula]); while(set.size<4){ const {c:c2,a:a2}=pickPair(); set.add(chem.crossFormula(c2,a2).formula); }
    return {prompt:`${rw.desc}<br><span style="font-size:.82rem;color:var(--text-muted)">Elige su fórmula.</span>`,
      options:shuffle([...set]).map(f=>({label:f,ok:f===cr.formula})),explica:`Es ${chem.nameIonic(c,a)} → ${cr.formula}.`};
  }
  function renderJuego(unit,uData){
    const stt=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,stt.done),co=stt.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;}).join('');
    return `<div class="u5-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">🌍</span><div><h3 style="margin:0">Traductor Universal</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Traduce entre cargas, fórmulas, nombres y el mundo real. No memorizas: razonas.</p></div></div>
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
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u5g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.round+1}/${GAME_ROUNDS} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="text-align:center;font-size:1rem;font-weight:700;color:${C};margin-bottom:1rem">${caso.prompt}</p>
        <div id="u5g-opts" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem">${caso.options.map((o,k)=>`<button class="btn btn-ghost" data-k="${k}" style="height:auto;padding:.7rem;font-family:var(--font-code)">${o.label}</button>`).join('')}</div>
        <div id="u5g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u5g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>answerRound(+b.getAttribute('data-k'))));
  }
  function answerRound(k){
    if(!game||game.answered)return;game.answered=true;const caso=game.caso;const ok=!!caso.options[k].ok;
    if(ok){game.correct++;game.score+=100;}
    const opts=document.getElementById('u5g-opts');
    opts.querySelectorAll('[data-k]').forEach(b=>{const i=+b.getAttribute('data-k');b.disabled=true;if(caso.options[i].ok)b.style.borderColor='var(--green)';if(i===k&&!ok)b.style.borderColor='var(--red)';});
    document.getElementById('u5g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.86rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${caso.explica}</p></div>
      <button class="btn btn-primary btn-sm" id="u5g-next" style="margin-top:.8rem">${game.round<GAME_ROUNDS-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u5g-next').addEventListener('click',()=>{if(game.round<GAME_ROUNDS-1){game.round++;nextRound();}else finishLevel();});
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
      <button class="btn btn-primary btn-sm" id="u5g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u5g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u5g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u5g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — estándar v1.0 (20 de 30, 70%)
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U05)?window.PREGUNTAS_U05.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u05.js</code>.</p></div>`;
    return `<div id="u5-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Nomenclatura</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. En modo simplificado (♿) verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u5-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u5-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u5-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u5-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u5-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="u5-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u5-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u5-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u5-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u5-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u5-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();const yaOtorgadoAntes=!!u.examXpAwarded;patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1,examXpAwarded:u.examXpAwarded||passed});
    if(passed&&!yaOtorgadoAntes)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u5-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u5-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u5-exam-close">Cerrar</button></div>`;
    document.getElementById('u5-exam-retry').addEventListener('click',startExam);
    document.getElementById('u5-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO + MANIFEST
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-05] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'nomenclatura':'Conjunto de reglas para nombrar los compuestos químicos.',
        'ion':'Átomo o grupo con carga por ganar o perder electrones.',
        'catión':'Ion positivo (perdió electrones).',
        'anión':'Ion negativo (ganó electrones).',
        'número de oxidación':'Carga que se asigna a un átomo según los electrones que gana, pierde o comparte.',
        'valencia':'Capacidad de combinación de un átomo.',
        'regla del cruce':'Método para escribir la fórmula: la carga de un ion pasa como subíndice del otro.',
        'subíndice':'Número pequeño que indica cuántos átomos o grupos hay en la fórmula.',
        'compuesto binario':'Compuesto formado por dos elementos.',
        'óxido':'Compuesto de un elemento con oxígeno.',
        'sal binaria':'Compuesto iónico de un metal y un no metal (p. ej. NaCl).',
        'hidruro':'Compuesto de un elemento con hidrógeno.',
        'hidrácido':'Ácido sin oxígeno (p. ej. ácido clorhídrico, HCl en agua).',
        'nomenclatura de Stock':'Sistema que usa números romanos para indicar la valencia (hierro(III)).',
        'prefijo multiplicador':'Prefijo (mono, di, tri…) que cuenta átomos en compuestos covalentes.',
        'ion poliatómico':'Ion formado por varios átomos con carga (OH⁻, SO₄²⁻).',
        'fórmula':'Representación de un compuesto con símbolos y subíndices.'
      },
      mqc: {
        'topic-0':{ detonante:'La sal, el agua, la herrumbre… todos tienen un nombre químico. ¿De dónde salen esos nombres?', commit:{pregunta:'La nomenclatura es…',opciones:['Una lista para memorizar','Un idioma con reglas','Un tipo de enlace'],correcta:1,explica:'Es un idioma con lógica: se deduce, no se memoriza.'}, conexion:'Esta idea recorre toda la unidad: comprender > memorizar.' },
        'topic-1':{ detonante:'¿Qué número decide cuántos átomos de cada tipo lleva un compuesto?', commit:{pregunta:'En un compuesto neutro las cargas suman…',opciones:['positivo','cero','la masa'],correcta:1,explica:'Suman cero: se equilibran.'}, conexion:'Son las mismas cargas que viste en Enlace Químico.' },
        'topic-2':{ detonante:'¿Por qué el cloro pasa de "cloro" a "cloruro"?', commit:{pregunta:'Un anión monoatómico termina en…',opciones:['-oso','-uro','-ico'],correcta:1,explica:'Raíz + "uro" (cloruro, sulfuro), salvo óxido.'}, conexion:'El nombre del ion es la base del nombre del compuesto.' },
        'topic-3':{ detonante:'¿Cómo pasas de dos cargas a una fórmula?', commit:{pregunta:'En la regla del cruce, la carga se convierte en…',opciones:['el subíndice del otro ion','la suma','el color'],correcta:0,explica:'Se cruza como subíndice y se simplifica.'}, conexion:'Con esto ya puedes escribir cualquier fórmula iónica.' },
        'topic-4':{ detonante:'¿Por qué NaCl es "cloruro de sodio" y no "sodio de cloro"?', commit:{pregunta:'El nombre respecto a la fórmula va…',opciones:['igual','al revés (anión primero)','sin orden'],correcta:1,explica:'El nombre invierte el orden de la fórmula.'}, conexion:'El orden del nombre es una regla clave.' },
        'topic-5':{ detonante:'¿Cómo sabes si un hierro es 2+ o 3+ en un compuesto?', commit:{pregunta:'El número romano en "hierro(III)" indica…',opciones:['la masa','la valencia usada','el grupo'],correcta:1,explica:'Indica con qué valencia actúa el metal.'}, conexion:'Stock resuelve los metales de valencia variable.' },
        'topic-6':{ detonante:'¿Por qué CO₂ lleva "di" pero NaCl no lleva prefijos?', commit:{pregunta:'Los prefijos (di, tri) se usan en…',opciones:['iónicos','covalentes','todos'],correcta:1,explica:'En covalentes; en iónicos la carga fija la proporción.'}, conexion:'El tipo de enlace decide cómo se nombra.' },
        'topic-7':{ detonante:'¿Qué compuesto cotidiano se esconde tras "óxido de dihidrógeno"?', commit:{pregunta:'"Óxido de dihidrógeno" es…',opciones:['sal','agua','vinagre'],correcta:1,explica:'Es el agua (H₂O).'}, conexion:'Nombre y fórmula son dos caras de lo mismo.' }
      },
      mentor: {
        'tab:teoria':'La nomenclatura parece pura memoria, pero es lógica pura. Aprende a cruzar cargas y a invertir el orden del nombre, y podrás con casi cualquier compuesto.',
        'tab:simuladores':'Construye la fórmula con las cargas y compruébala. Luego tradúcela a su nombre.',
        'tab:juego':'Traduce en los dos sentidos: de cargas a fórmula, de fórmula a nombre y del mundo real a la química.',
        'tab:examen':'No memorices nombres sueltos: dedúcelos. Si fallas, te muestro el error frecuente.'
      },
      curiosidades: [
        {topic:'topic-4',texto:'El nombre invierte el orden de la fórmula: NaCl se dice "cloruro de sodio", empezando por el anión.'},
        {topic:'topic-7',texto:'El agua, en nombre sistemático, sería "óxido de dihidrógeno" (H₂O).'},
        {topic:'topic-7',texto:'La herrumbre de una reja vieja es, en realidad, óxido de hierro(III), Fe₂O₃.'},
        {topic:'topic-0',texto:'La sal de mesa (NaCl) y la soda cáustica (NaOH) comparten sodio pero son muy distintas: el nombre revela la diferencia.'}
      ],
      errores: [
        {id:'e1',topic:'topic-3',creencia:'Los subíndices se suman en vez de cruzarse.',porque:'Se confunde el método.',correccion:'La carga de un ion se CRUZA como subíndice del otro (sin signo), y luego se simplifica.'},
        {id:'e2',topic:'topic-4',creencia:'El nombre sigue el mismo orden que la fórmula.',porque:'Se lee la fórmula de izquierda a derecha.',correccion:'En español el nombre INVIERTE el orden: primero el anión, luego "de" y el catión (NaCl = cloruro de sodio).'},
        {id:'e3',topic:'topic-5',creencia:'Todos los metales tienen una sola valencia.',porque:'Se generaliza el caso simple.',correccion:'Muchos metales tienen valencia variable (Fe²⁺/Fe³⁺); por eso existe la nomenclatura de Stock con números romanos.'},
        {id:'e4',topic:'topic-6',creencia:'Los prefijos (di, tri) se usan en compuestos iónicos.',porque:'Se aplican por analogía.',correccion:'Los prefijos son para compuestos covalentes; en los iónicos la carga ya fija la proporción.'},
        {id:'e5',topic:'topic-0',creencia:'Hay que memorizar el nombre de cada compuesto.',porque:'Se enseña como lista.',correccion:'La nomenclatura es lógica: con cargas y la regla del cruce se deduce el nombre o la fórmula.'}
      ],
      xref: {
        'teoria:topic-1':[{type:'unit',unit:'unit-04',tab:'teoria',label:'Cargas iónicas (Unidad IV)'}],
        'teoria:topic-3':[{tab:'simuladores',label:'Constructor de Fórmulas'}],
        'teoria:topic-4':[{tab:'simuladores',label:'Nombre ↔ Fórmula'}],
        'teoria:topic-7':[{type:'unit',unit:'unit-06',tab:'teoria',label:'Te servirá en Estequiometría (Unidad VI)'},{type:'section',section:'periodic-table',label:'Abrir la Tabla interactiva'}],
        'sim:nomenclatura':[{type:'unit',unit:'unit-04',tab:'simuladores',label:'Predice el Enlace (Unidad IV)'},{type:'glossary',label:'Ver glosario'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U05)?window.BANCO_PNE_U05:null
    });
  }
})();
