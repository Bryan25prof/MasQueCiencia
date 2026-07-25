/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/unit-02.js  |  UNIDAD II — "Estructura Atómica"
   Experiencia: "Explorando el Átomo"
   ================================================================
   Segundo consumidor del sistema de plugins. Integra el Método MQC y
   los sistemas compartidos (mqc, mentor, insights, viz, pne-bank,
   glosario, xref, media, hints) SIN duplicar código.
   Tabs: unit-02:teoria · :simuladores · :juego · :examen
   ================================================================ */

(function () {
  'use strict';
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

  const UNIT_ID = 'unit-02';
  const C = '#1A73E8';   /* azul — color temático de la Unidad II (Identidad v2.0) */

  /* ── Accesos defensivos (globales "desnudos", typeof) ───────── */
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} if(typeof Photon!=='undefined'&&Photon.react){var _pmap={'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};if(_pmap[s]){try{Photon.react(_pmap[s]);}catch(e){}}} }
  function loadUnitData(){ if(typeof Storage!=='undefined'&&Storage&&Storage.load){try{return Storage.load().units[UNIT_ID]||{};}catch(e){return {};}} return {}; }
  function patchUnit(u){ if(typeof Storage!=='undefined'&&Storage&&Storage.updateUnit){try{Storage.updateUnit(UNIT_ID,u);}catch(e){}} }
  function markRead(t){ if(typeof Storage!=='undefined'&&Storage&&Storage.markTopicRead){try{Storage.markTopicRead(UNIT_ID,t);}catch(e){}} }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function unitMeta(){ if(typeof UNIDADES_DATA!=='undefined') return UNIDADES_DATA.find(u=>u.id===UNIT_ID); return null; }

  /* ── Tabla mínima de elementos (Z 1..20) — autónoma y fiable ── */
  const ELEM = {1:['H','Hidrógeno'],2:['He','Helio'],3:['Li','Litio'],4:['Be','Berilio'],5:['B','Boro'],
    6:['C','Carbono'],7:['N','Nitrógeno'],8:['O','Oxígeno'],9:['F','Flúor'],10:['Ne','Neón'],
    11:['Na','Sodio'],12:['Mg','Magnesio'],13:['Al','Aluminio'],14:['Si','Silicio'],15:['P','Fósforo'],
    16:['S','Azufre'],17:['Cl','Cloro'],18:['Ar','Argón'],19:['K','Potasio'],20:['Ca','Calcio']};

  /* Configuración electrónica para Z ≤ 20 (orden de energía simplificado) */
  function configFor(Z){
    const order=[['1s',2],['2s',2],['2p',6],['3s',2],['3p',6],['4s',2]];
    const out=[]; let rem=Z;
    for(const [label,cap] of order){ if(rem<=0)break; const e=Math.min(cap,rem); out.push({label,electrons:e}); rem-=e; }
    return out;
  }
  function configStr(Z){ return configFor(Z).map(o=>o.label+'<sup>'+o.electrons+'</sup>').join(' '); }

  /* ============================================================
     1) TEORÍA con ciclo MQC
  ============================================================ */
  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  const TEORIA = [
    { titulo:'Historia de los modelos atómicos', icon:'📜', html:`
      <p>La idea de "átomo" (lo indivisible) viene de la antigua Grecia, pero el modelo fue cambiando con la evidencia:</p>
      <ul style="margin:.5rem 0 .5rem 1.1rem;line-height:1.7;color:var(--text-secondary);font-size:.9rem">
        <li><strong>Dalton</strong>: esfera maciza e indivisible.</li>
        <li><strong>Thomson</strong>: "budín de pasas" (cargas + con e⁻ incrustados).</li>
        <li><strong>Rutherford</strong>: núcleo pequeño, denso y positivo; mucho espacio vacío.</li>
        <li><strong>Bohr</strong>: electrones en órbitas/niveles de energía.</li>
        <li><strong>Cuántico</strong>: orbitales (zonas de probabilidad).</li>
      </ul>
      ${box('La ciencia se corrige','Cada modelo no "borró" al anterior: lo mejoró con nueva evidencia. Así avanza la ciencia.','var(--green)')}` },
    { titulo:'Partículas subatómicas (p, n, e⁻)', icon:'⚛️', html:`
      <p>El átomo tiene tres partículas clave:</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:.6rem;margin:.6rem 0">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem"><strong style="color:var(--red)">Protón (+)</strong><p style="font-size:.8rem;color:var(--text-muted)">En el núcleo. Define el elemento.</p></div>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem"><strong style="color:var(--text-secondary)">Neutrón (0)</strong><p style="font-size:.8rem;color:var(--text-muted)">En el núcleo. Aporta masa.</p></div>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem"><strong style="color:${C}">Electrón (−)</strong><p style="font-size:.8rem;color:var(--text-muted)">Afuera, en niveles. Manda en la química.</p></div>
      </div>
      ${box('Casi todo es vacío','Si el átomo fuera un estadio, el núcleo sería una canica al centro. ¡Lo demás es espacio donde se mueven los electrones!','var(--gold)')}` },
    { titulo:'Número atómico, másico e isótopos', icon:'🔢', html:`
      <p>Dos números describen un átomo:</p>
      ${box('Número atómico (Z)','Cantidad de protones. Es la "cédula" del elemento: si cambia Z, cambia el elemento.')}
      ${box('Número másico (A)','Protones + neutrones (A = Z + N). Es casi toda la masa del átomo.','var(--violet)')}
      ${box('Isótopos','Mismo elemento (igual Z), distinto nº de neutrones. Ej.: Carbono-12 y Carbono-14.','var(--green)')}` },
    { titulo:'Modelo de Bohr y modelo cuántico', icon:'🌀', html:`
      <p><strong>Bohr</strong>: los electrones giran en niveles de energía definidos; al saltar de nivel, absorben o emiten energía.</p>
      <p><strong>Modelo cuántico</strong>: no podemos saber la trayectoria exacta del electrón, solo la <em>probabilidad</em> de encontrarlo. Esas zonas se llaman <strong>orbitales</strong>.</p>
      ${box('De órbita a orbital','Bohr dibuja caminos; el modelo cuántico dibuja "nubes" de probabilidad. Es más raro… pero más preciso.','var(--gold)')}` },
    { titulo:'Números cuánticos (n, l, mₗ, mₛ)', icon:'🎯', html:`
      <p>Cuatro números describen a cada electrón, como una "dirección":</p>
      <ul style="margin:.5rem 0 .5rem 1.1rem;line-height:1.7;color:var(--text-secondary);font-size:.9rem">
        <li><strong>n</strong> — nivel de energía y tamaño.</li>
        <li><strong>l</strong> — forma del orbital (s, p, d, f).</li>
        <li><strong>mₗ</strong> — orientación en el espacio.</li>
        <li><strong>mₛ</strong> — giro (spin): +½ o −½.</li>
      </ul>
      ${box('Como una dirección','n = ciudad, l = calle, mₗ = casa, mₛ = en qué silla se sienta. ¡Cada electrón es único!','var(--green)')}` },
    { titulo:'Principios de Aufbau, Hund y Pauli', icon:'📐', html:`
      <p>Tres reglas ordenan a los electrones:</p>
      ${box('Aufbau','Se llenan primero los subniveles de MENOR energía. Por eso el 4s se llena antes que el 3d.')}
      ${box('Hund','Dentro de un subnivel, primero entra un electrón en cada orbital (mismo giro); luego se aparean.','var(--violet)')}
      ${box('Pauli','En un mismo orbital caben máximo 2 electrones, con spines opuestos (↑↓).','var(--orange)')}` },
    { titulo:'Configuración electrónica', icon:'🧮', html:`
      <p>Es el "mapa" de cómo se distribuyen los electrones. Ejemplo, oxígeno (Z=8): <strong>1s² 2s² 2p⁴</strong>.</p>
      ${box('Electrones de valencia','Son los del último nivel. ¡Mandan en cómo el átomo se enlaza! Por eso predicen la química del elemento.','var(--gold)')}
      ${box('Regla 2n²','El máximo de electrones por nivel: nivel 1 → 2, nivel 2 → 8, nivel 3 → 18.','var(--green)')}` },
    { titulo:'Iones: cationes y aniones', icon:'⚡', html:`
      <p>Si un átomo gana o pierde electrones, deja de ser neutro y se vuelve un <strong>ion</strong>:</p>
      ${box('Catión (+)','PIERDE electrones → quedan más protones → carga positiva. Ej.: Na⁺.')}
      ${box('Anión (−)','GANA electrones → más cargas negativas → carga negativa. Ej.: Cl⁻.','var(--violet)')}
      ${box('Iso­electrónicos','Distintos iones/átomos con el MISMO número de electrones (ej.: O²⁻ y Ne). ¡Misma configuración!','var(--green)')}` }
  ];

  /* Enriquecimiento MQC + sistemas compartidos por tema */
  function enrich(html,i){
    const tid='topic-'+i;
    let pre='';
    if(typeof MQC!=='undefined'){ pre += MQC.detonante(UNIT_ID,tid); pre += MQC.commit(UNIT_ID,tid); }
    let post='';
    let body=(typeof Glossary!=='undefined')?Glossary.highlight(html):html;
    /* Ilustración VIZ en temas clave */
    if(typeof VIZ!=='undefined'){
      if(i===1) body = `<div class="viz-box">${VIZ.bohrAtom({protons:6,neutrons:6,electrons:6,size:240})}</div>` + body;
      if(i===6) body = body + `<div class="viz-box">${VIZ.energyDiagram(configFor(8))}<div class="viz-cap">Diagrama de energía del oxígeno (Z=8)</div></div>`;
    }
    if(typeof UnitMedia!=='undefined') post += UnitMedia.render(UNIT_ID,tid);
    if(typeof MQC!=='undefined') post += MQC.conexion(UNIT_ID,tid);
    if(typeof Insights!=='undefined'){ post += Insights.renderCuriosidad(UNIT_ID,tid); post += Insights.renderError(UNIT_ID,tid); }
    if(typeof CrossRef!=='undefined') post += CrossRef.renderChips(UNIT_ID,'teoria:'+tid);
    return pre + body + post;
  }

  function renderTeoria(unit,uData){
    const read=(uData&&uData.topicsRead)?uData.topicsRead:[];
    const leidos=TEORIA.filter((_,i)=>read.includes(`${UNIT_ID}-topic-${i}`)).length;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:teoria'):'';
    const expHTML=(typeof MQC!=='undefined')?MQC.experienceHeader(unit):'';
    const items=TEORIA.map((t,i)=>{
      const tid=`${UNIT_ID}-topic-${i}`, isRead=read.includes(tid);
      return `<div class="u2-accordion" style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${isRead?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
        <button data-acc-toggle="${i}" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
          <span style="font-size:1.2rem">${t.icon}</span><span style="flex:1">${i+1}. ${t.titulo}</span>
          <span style="font-size:.72rem;color:${isRead?'var(--green)':'var(--text-muted)'}">${isRead?'✓ leído':''}</span>
          <span class="u2-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
        </button>
        <div class="u2-body" data-acc-body="${i}" style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
          ${enrich(t.html,i)}
          <div class="qi-hints-host" data-topic="${i}"></div>
          <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead?'disabled':''}>${isRead?'✓ Tema leído':'📖 Marcar como leído (+15 XP)'}</button>
          </div>
        </div></div>`;
    }).join('');
    return `<div class="u2-teoria" style="animation:pageIn .4s ease">
      ${expHTML}${mentorHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:1rem 0">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Cada tema empieza con un reto: <strong>comprométete con una respuesta</strong> antes de leer. Así piensas, no solo memorizas.</p>
        <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${TEORIA.length} leídos</span>
      </div>${items}</div>`;
  }

  function bindTeoria(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-acc-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const i=btn.getAttribute('data-acc-toggle');
        const body=cont.querySelector(`[data-acc-body="${i}"]`), caret=btn.querySelector('.u2-caret');
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
  const TOPIC_HINTS={1:['El núcleo es diminuto; los electrones están lejos.','La masa vive en el núcleo: protón y neutrón pesan mucho más que el electrón.'],6:['Energía primero: el 4s entra antes que el 3d.','Hund: un electrón por orbital antes de aparear.']};

  /* ============================================================
     2) SIMULADORES (4) — usan la biblioteca VIZ
  ============================================================ */
  function markSimDone(id,score){
    const u=loadUnitData(); const done=Array.isArray(u.simsDone)?u.simsDone.slice():[];
    if(!done.includes(id)){ done.push(id); patchUnit({simsDone:done}); awardXP(score>=100?'simulator-perfect':'simulator-done'); }
  }
  function renderSimuladores(unit,uData){
    const done=(uData&&uData.simsDone)?uData.simsDone:[];
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:simuladores'):'';
    const S=[
      {id:'sim-02-01',icon:'⚛️',name:'Constructor de átomos',desc:'Agrega protones, neutrones y electrones y observa el átomo cobrar vida.'},
      {id:'sim-02-02',icon:'🎞️',name:'Modelos atómicos',desc:'Recorre la evolución del átomo, de Dalton al modelo cuántico.'},
      {id:'sim-02-03',icon:'🔢',name:'Configuración electrónica',desc:'Predice y comprueba cómo se ordenan los electrones por niveles.'},
      {id:'sim-02-04',icon:'⚡',name:'Niveles de energía',desc:'Reparte electrones en sus niveles con la regla 2n².'}
    ];
    const cards=S.map(s=>`<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${done.includes(s.id)?'var(--green)':C};border-radius:var(--radius-md);margin-bottom:.6rem">
      <span style="font-size:2rem">${s.icon}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div><div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>${done.includes(s.id)?'<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>':''}</div>
      <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button></div>`).join('');
    return `<div class="u2-sims" style="animation:pageIn .4s ease">${mentorHTML}<p style="color:var(--text-secondary);font-size:.9rem;margin:.6rem 0 1rem">Cuatro simuladores con la biblioteca gráfica de MásQueCiencia. Cada uno otorga XP.</p><div id="u2-sim-host">${cards}</div></div>`;
  }
  function bindSimuladores(unit,uData){
    const cont=document.getElementById('tab-content'); if(!cont)return;
    if(typeof Mentor!=='undefined') Mentor.bind(cont);
    cont.querySelectorAll('[data-open-sim]').forEach(b=>b.addEventListener('click',()=>openSim(b.getAttribute('data-open-sim'))));
  }
  function openSim(id){
    const host=document.getElementById('u2-sim-host'); if(!host)return;
    host.innerHTML=`<button class="btn btn-ghost btn-sm" id="u2-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button><div id="u2-stage"></div>`;
    document.getElementById('u2-sim-back').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');c.innerHTML=renderSimuladores(null,f);bindSimuladores(null,f);});
    const st=document.getElementById('u2-stage');
    if(id==='sim-02-01')simConstructor(st);
    else if(id==='sim-02-02')simModelos(st);
    else if(id==='sim-02-03')simConfig(st);
    else if(id==='sim-02-04')simNiveles(st);
  }

  /* SIM 1 — Constructor de átomos */
  function simConstructor(st){
    let p=1,n=0,e=1;
    function info(){
      const el=ELEM[p]; const carga=p-e;
      const cargaTxt=carga===0?'neutro':(carga>0?('catión +'+carga):('anión '+carga));
      return {nombre:el?el[1]+' ('+el[0]+')':'—',Z:p,A:p+n,carga:cargaTxt,ok:!!el};
    }
    function draw(){
      const I=info();
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div class="viz-box">${(typeof VIZ!=='undefined')?VIZ.bohrAtom({protons:p,neutrons:n,electrons:e,size:240}):''}</div>
        <div style="text-align:center;margin:.4rem 0 .8rem"><div style="font-size:1.3rem;font-weight:800;color:${C}">${I.nombre}</div>
          <div style="font-size:.82rem;color:var(--text-secondary)">Z=${I.Z} · A=${I.A} · ${I.carga}</div></div>
        ${ctrl('Protones',p,'p','var(--red)')}${ctrl('Neutrones',n,'n','var(--text-muted)')}${ctrl('Electrones',e,'e',C)}
        <div style="text-align:center;margin-top:.9rem"><button class="btn btn-primary btn-sm" id="u2c-check">Verificar átomo neutro</button></div>
        <div id="u2c-fb" style="text-align:center;margin-top:.6rem;font-size:.86rem"></div></div>`;
      st.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{
        const [k,d]=b.getAttribute('data-step').split(':');
        if(k==='p')p=Math.max(0,Math.min(20,p+ +d));
        if(k==='n')n=Math.max(0,Math.min(30,n+ +d));
        if(k==='e')e=Math.max(0,Math.min(20,e+ +d));
        draw();
      }));
      st.querySelector('#u2c-check').addEventListener('click',()=>{
        const fb=st.querySelector('#u2c-fb'); const I=info();
        if(I.ok&&p===e&&p>=1){ fb.innerHTML='<span style="color:var(--green)">✓ ¡Átomo neutro de '+I.nombre+'! Protones = electrones.</span>'; markSimDone('sim-02-01',100); }
        else if(!I.ok){ fb.innerHTML='<span style="color:var(--red)">Ese nº de protones no es un elemento (usa 1 a 20).</span>'; }
        else { fb.innerHTML='<span style="color:var(--gold)">Aún no es neutro: protones ('+p+') ≠ electrones ('+e+').</span>'; }
      });
    }
    function ctrl(label,val,k,col){return `<div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-elevated);border-radius:var(--radius-sm);padding:.4rem .7rem;margin-bottom:.4rem">
      <span style="font-size:.86rem;color:${col};font-weight:700">${label}</span>
      <span style="display:flex;align-items:center;gap:.5rem"><button class="btn btn-ghost btn-sm" data-step="${k}:-1">−</button><strong style="min-width:1.6rem;text-align:center">${val}</strong><button class="btn btn-ghost btn-sm" data-step="${k}:1">+</button></span></div>`;}
    draw();
  }

  /* SIM 2 — Modelos atómicos (línea de tiempo) */
  function simModelos(st){
    const M=[
      {n:'Dalton (1808)',d:'Esfera maciza e indivisible. El átomo como una bolita sólida.',v:()=>VIZ.svg('<circle cx="120" cy="120" r="60" fill="'+VIZ.COL.nucleus+'" opacity=".5"/>','0 0 240 240')},
      {n:'Thomson (1897)',d:'"Budín de pasas": una masa positiva con electrones incrustados.',v:()=>VIZ.svg('<circle cx="120" cy="120" r="70" fill="'+VIZ.COL.proton+'" opacity=".2"/>'+VIZ.particle('electron',95,100,8)+VIZ.particle('electron',150,130,8)+VIZ.particle('electron',120,150,8),'0 0 240 240')},
      {n:'Rutherford (1911)',d:'Núcleo pequeño, denso y positivo; el resto es espacio vacío.',v:()=>VIZ.svg(VIZ.nucleus(3,3,120,120,14)+VIZ.particle('electron',40,120,7)+VIZ.particle('electron',200,120,7),'0 0 240 240')},
      {n:'Bohr (1913)',d:'Electrones en órbitas/niveles de energía definidos.',v:()=>VIZ.bohrAtom({protons:3,neutrons:4,electrons:3,size:240,animate:false})},
      {n:'Cuántico (1926)',d:'Orbitales: zonas de probabilidad, no trayectorias exactas.',v:()=>VIZ.svg('<circle cx="120" cy="120" r="70" fill="'+VIZ.COL.electron+'" opacity=".10"/><circle cx="120" cy="120" r="45" fill="'+VIZ.COL.electron+'" opacity=".18"/><circle cx="120" cy="120" r="22" fill="'+VIZ.COL.electron+'" opacity=".30"/>'+VIZ.nucleus(3,4,120,120,12),'0 0 240 240')}
    ];
    let i=0, seen={};
    function draw(){
      seen[i]=true;
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div class="viz-box">${M[i].v()}</div>
        <div style="text-align:center"><div style="font-weight:800;color:${C};font-size:1.05rem">${M[i].n}</div>
        <p style="font-size:.86rem;color:var(--text-secondary);margin:.4rem 0 .8rem">${M[i].d}</p></div>
        <div style="display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap">${M.map((m,k)=>`<button class="btn ${k===i?'btn-primary':'btn-ghost'} btn-sm" data-m="${k}">${k+1}</button>`).join('')}</div>
        <div id="u2m-fb" style="text-align:center;margin-top:.6rem;font-size:.84rem;color:var(--green)"></div></div>`;
      st.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{i=+b.getAttribute('data-m');draw();}));
      if(Object.keys(seen).length===M.length){ markSimDone('sim-02-02',100); st.querySelector('#u2m-fb').textContent='✓ Recorriste toda la evolución del átomo.'; }
    }
    draw();
  }

  /* SIM 3 — Configuración electrónica (predecir y comprobar) */
  function simConfig(st){
    let Z=8, revealed=false;
    function draw(){
      const cfg=configFor(Z), last=cfg[cfg.length-1];
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div style="text-align:center;margin-bottom:.6rem"><span style="font-size:.8rem;color:var(--text-muted)">Elemento (Z=${Z}): </span><strong style="color:${C}">${ELEM[Z]?ELEM[Z][1]:'—'}</strong></div>
        <input type="range" min="1" max="20" value="${Z}" id="u2cf-z" style="width:100%;accent-color:${C}">
        <div style="text-align:center;margin:.5rem 0 .8rem;font-size:.82rem;color:var(--text-secondary)">Mueve para elegir el elemento (1–20)</div>
        ${!revealed?`<div style="text-align:center"><p style="font-size:.86rem;color:var(--text-primary);font-weight:700;margin-bottom:.5rem">¿En qué subnivel termina su configuración?</p>
          <button class="btn btn-primary btn-sm" id="u2cf-show">Comprobar configuración</button></div>`:
          `<div class="viz-box">${VIZ.energyDiagram(cfg)}</div>
           <div style="text-align:center;font-family:var(--font-code);font-size:.95rem;color:${C};margin-top:.4rem">${configStr(Z)}</div>
           <p style="text-align:center;font-size:.82rem;color:var(--text-secondary);margin-top:.3rem">Termina en <strong>${last.label}<sup>${last.electrons}</sup></strong>. Sus electrones de valencia están en el último nivel.</p>`}
        </div>`;
      st.querySelector('#u2cf-z').addEventListener('input',ev=>{Z=+ev.target.value;revealed=false;draw();});
      const show=st.querySelector('#u2cf-show');
      if(show)show.addEventListener('click',()=>{revealed=true;markSimDone('sim-02-03',100);draw();});
    }
    draw();
  }

  /* SIM 4 — Niveles de energía (regla 2n²) */
  function simNiveles(st){
    let e=10;
    function draw(){
      const shells=VIZ.shellsFor(e);
      st.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem">
        <div class="viz-box">${VIZ.bohrAtom({protons:e,neutrons:e,electrons:e,size:260})}</div>
        <input type="range" min="1" max="20" value="${e}" id="u2n-e" style="width:100%;accent-color:${C}">
        <div style="text-align:center;margin:.5rem 0;font-size:.86rem;color:var(--text-secondary)">${e} electrones · distribución: <strong style="color:${C}">${shells.join(' · ')}</strong></div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted)">Regla 2n²: nivel 1 → 2, nivel 2 → 8, nivel 3 → 18.</p></div>`;
      st.querySelector('#u2n-e').addEventListener('input',ev=>{e=+ev.target.value;draw();if(e>=18)markSimDone('sim-02-04',100);});
    }
    draw(); markSimDone('sim-02-04',80);
  }

  /* ============================================================
     3) JUEGO — "Construye el átomo"
  ============================================================ */
  const CAT_KEYS=['elemento']; /* (no usado: el juego es de construcción) */
  const GAME_LEVELS=[
    {id:'novato',nombre:'Novato',icon:'🔍',desc:'Identifica las partículas y los números.',
     casos:[
      {q:'Un átomo tiene 6 protones. ¿Qué elemento es?',op:['Carbono','Oxígeno','Helio','Litio'],ok:0,ex:'El nº de protones (Z) define el elemento: 6 = Carbono.'},
      {q:'¿Qué partícula define el número atómico Z?',op:['Neutrón','Protón','Electrón','Ninguna'],ok:1,ex:'Z = número de protones.'},
      {q:'En un átomo neutro de Z=3, ¿cuántos electrones hay?',op:['2','3','4','6'],ok:1,ex:'Neutro: electrones = protones = 3.'},
      {q:'¿Dónde está casi toda la masa?',op:['En los electrones','En el núcleo','En las órbitas','Fuera del átomo'],ok:1,ex:'En el núcleo (protones + neutrones).'},
      {q:'El número másico A de un átomo con 8 p y 8 n es:',op:['8','16','64','0'],ok:1,ex:'A = p + n = 8 + 8 = 16.'}
     ]},
    {id:'constructor',nombre:'Constructor',icon:'🧩',desc:'Arma átomos neutros completos.',
     casos:[
      {q:'Para un átomo neutro de Oxígeno (Z=8) necesitas:',op:['8 p, 8 e⁻','8 p, 6 e⁻','6 p, 8 e⁻','8 p, 0 e⁻'],ok:0,ex:'Neutro: 8 protones y 8 electrones.'},
      {q:'Configuración del Litio (Z=3):',op:['1s² 2s¹','1s³','2s³','1s² 2p¹'],ok:0,ex:'3 electrones: 1s² 2s¹.'},
      {q:'¿Cuántos electrones de valencia tiene el Flúor (1s² 2s² 2p⁵)?',op:['5','7','2','9'],ok:1,ex:'Último nivel: 2s² 2p⁵ = 7 de valencia.'},
      {q:'Máximo de electrones en el nivel 2:',op:['2','8','18','10'],ok:1,ex:'2n² = 2·4 = 8.'},
      {q:'¿Qué subnivel se llena primero?',op:['3d','4s','4p','3f'],ok:1,ex:'Aufbau: 4s antes que 3d.'}
     ]},
    {id:'experto',nombre:'Experto',icon:'🎓',desc:'Iones, isótopos y casos con trampa.',
     casos:[
      {q:'El ion Na⁺ (Z=11) tiene cuántos electrones?',op:['11','10','12','1'],ok:1,ex:'Perdió 1 electrón: 10.'},
      {q:'C-12 y C-14 se diferencian en:',op:['Protones','Neutrones','Electrones','Z'],ok:1,ex:'Cambian los neutrones (6 vs 8).'},
      {q:'El O²⁻ tiene la misma configuración que:',op:['Neón','Carbono','Sodio','Oxígeno neutro'],ok:0,ex:'8+2 = 10 electrones = neón (isoelectrónicos).'},
      {q:'Z=17, A=35. ¿Cuántos neutrones?',op:['17','35','18','52'],ok:2,ex:'N = A − Z = 35 − 17 = 18.'},
      {q:'Termina en 3p⁵ (7 de valencia). Es un:',op:['Gas noble','Halógeno','Alcalino','Metal'],ok:1,ex:'Le falta 1 para el octeto: halógeno.'}
     ]}
  ];
  const GAME_PASS=3;
  let game=null;
  function gameState(){const u=loadUnitData();return {best:u.gameScore||0,done:Array.isArray(u.gameLevels)?u.gameLevels.slice():[]};}
  function isUnlocked(idx,done){return idx===0||done.includes(GAME_LEVELS[idx-1].id);}
  function renderJuego(unit,uData){
    const st=gameState();
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:juego'):'';
    const cards=GAME_LEVELS.map((lv,i)=>{const un=isUnlocked(i,st.done),co=st.done.includes(lv.id);
      return `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${co?'var(--green)':un?C:'var(--border)'};border-radius:var(--radius-md);margin-bottom:.6rem;opacity:${un?'1':'.55'}">
        <span style="font-size:2rem">${un?lv.icon:'🔒'}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">Nivel ${i+1}: ${lv.nombre} ${co?'<span style="color:var(--green);font-size:.78rem">✓</span>':''}</div><div style="font-size:.8rem;color:var(--text-muted)">${un?lv.desc:'Supera el nivel anterior.'}</div></div>
        <button class="btn ${un?'btn-primary':'btn-ghost'} btn-sm" data-play="${i}" ${un?'':'disabled'}>${co?'↻':'▶'} ${un?'Jugar':'Bloqueado'}</button></div>`;
    }).join('');
    return `<div class="u2-juego" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:linear-gradient(135deg,${C}22,transparent);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin:.6rem 0 1rem">
        <div style="display:flex;align-items:center;gap:.7rem"><span style="font-size:2.2rem">🧩</span><div><h3 style="margin:0">Construye el átomo</h3><p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">Razona la estructura del átomo: partículas, configuración, iones e isótopos.</p></div></div>
        <div style="margin-top:.7rem;font-family:var(--font-code);font-size:.8rem;color:${C}">🏆 Mejor: ${st.best} / 500</div></div>
      ${cards}</div>`;
  }
  function bindJuego(unit,uData){const c=document.getElementById('tab-content');if(!c)return;if(typeof Mentor!=='undefined')Mentor.bind(c);c.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.getAttribute('data-play'))));}
  function backLevels(){const c=document.getElementById('tab-content');if(!c)return;const f=loadUnitData();c.innerHTML=renderJuego(null,f);bindJuego(null,f);}
  function startLevel(idx){const lv=GAME_LEVELS[idx];if(!lv)return;game={idx,lv,casos:shuffle(lv.casos),i:0,score:0,correct:0,answered:false};awardXP('game-played');drawCase();}
  function drawCase(){
    const c=document.getElementById('tab-content');if(!c||!game)return;const caso=game.casos[game.i];
    c.innerHTML=`<div style="animation:pageIn .35s ease">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><button class="btn btn-ghost btn-sm" id="u2g-back">← Niveles</button><span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">${game.lv.icon} ${game.lv.nombre} · ${game.i+1}/${game.casos.length} · ${game.score} pts</span></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <p style="font-size:1rem;font-weight:700;color:var(--text-primary);text-align:center;margin-bottom:1rem">${caso.q}</p>
        <div id="u2g-opts" style="display:grid;gap:.5rem">${caso.op.map((o,k)=>`<button class="btn btn-ghost" data-k="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem">${o}</button>`).join('')}</div>
        <div id="u2g-fb" style="margin-top:1rem"></div></div></div>`;
    c.querySelector('#u2g-back').addEventListener('click',()=>{game=null;backLevels();});
    c.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>answerCase(+b.getAttribute('data-k'))));
  }
  function answerCase(k){
    if(!game||game.answered)return;game.answered=true;const caso=game.casos[game.i];const ok=k===caso.ok;
    const pts=ok?100:0;if(ok){game.correct++;game.score+=pts;}
    const opts=document.getElementById('u2g-opts');
    opts.querySelectorAll('[data-k]').forEach(b=>{b.disabled=true;const kk=+b.getAttribute('data-k');if(kk===caso.ok)b.style.borderColor='var(--green)';if(kk===k&&!ok)b.style.borderColor='var(--red)';});
    document.getElementById('u2g-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto! +100':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${caso.ex}</p></div>
      <button class="btn btn-primary btn-sm" id="u2g-next" style="margin-top:.8rem">${game.i<game.casos.length-1?'Siguiente →':'Ver resultado'}</button>`;
    document.getElementById('u2g-next').addEventListener('click',()=>{if(game.i<game.casos.length-1){game.i++;game.answered=false;drawCase();}else finishLevel();});
  }
  function finishLevel(){
    if(!game)return;const passed=game.correct>=GAME_PASS,perfect=game.correct===game.casos.length,score=game.score;
    const st=gameState();const done=st.done.slice();if(passed&&!done.includes(game.lv.id))done.push(game.lv.id);
    patchUnit({gameScore:Math.max(st.best,score),gameLevels:done});
    if(passed)awardXP('game-won');if(score>st.best)awardXP('game-highscore');
    const c=document.getElementById('tab-content');const nx=game.idx+1,hay=nx<GAME_LEVELS.length,unlk=passed&&hay;
    c.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${perfect?'🏆':passed?'🎉':'🔍'}</div><h3 style="margin:.4rem 0">${perfect?'¡Nivel perfecto!':passed?'¡Nivel superado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${score} pts</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${game.correct}/${game.casos.length} correctas</p>
      ${unlk?`<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">🔓 ¡Desbloqueaste ${GAME_LEVELS[nx].nombre}!</p>`:''}
      ${score>st.best?`<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">🏆 ¡Nuevo récord!</p>`:''}
      <button class="btn btn-primary btn-sm" id="u2g-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u2g-levels">Niveles</button></div>`;
    const idx=game.idx;
    c.querySelector('#u2g-retry').addEventListener('click',()=>{game=null;startLevel(idx);});
    c.querySelector('#u2g-levels').addEventListener('click',()=>{game=null;backLevels();});
    game=null;
  }

  /* ============================================================
     4) EXAMEN — usa PNEBank (versión adaptada) + Insights
  ============================================================ */
  function getBank(){return Array.isArray(window.PREGUNTAS_U02)?window.PREGUNTAS_U02.slice():[];}
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}
  const EXAM_CFG={perExam:20,time:30,pass:70};
  let exam=null;
  function renderExamen(unit,uData){
    const bank=getBank();const best=(uData&&uData.examBest)||0;const att=(uData&&uData.examAttempts)||0;
    const mentorHTML=(typeof Mentor!=='undefined')?Mentor.render(UNIT_ID,'tab:examen'):'';
    if(!bank.length)return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Banco no disponible</h3><p style="color:var(--text-secondary)">Falta <code>preguntas-u02.js</code>.</p></div>`;
    return `<div id="u2-exam-root" style="animation:pageIn .4s ease">${mentorHTML}
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-top:.6rem">
        <div style="font-size:2.4rem">📝</div><h3 style="margin:.4rem 0">Examen — Estructura Atómica</h3>
        <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem"><strong>${EXAM_CFG.perExam}</strong> preguntas (de ${bank.length}) · <strong>${EXAM_CFG.time} min</strong> · aprueba con <strong>${EXAM_CFG.pass}%</strong>. Si activas el modo simplificado (♿), verás la versión adaptada.</p>
        ${best>0?`<div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem"><div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best>=80?'var(--green)':best>=70?'var(--gold)':'var(--red)'}">${best}/100</div><div style="font-size:.7rem;color:var(--text-muted)">${att} intento${att!==1?'s':''}</div></div><br>`:''}
        <button class="btn btn-primary" id="u2-exam-start">▶ Comenzar examen</button></div></div>`;
  }
  function bindExamen(unit,uData){const c=document.getElementById('tab-content');if(c&&typeof Mentor!=='undefined')Mentor.bind(c);const s=document.getElementById('u2-exam-start');if(s)s.addEventListener('click',startExam);}
  function startExam(){const bank=getBank();exam={qs:shuffle(bank).slice(0,Math.min(EXAM_CFG.perExam,bank.length)),i:0,answers:[],remaining:EXAM_CFG.time*60,timerId:null};exam.timerId=setInterval(tick,1000);drawQ();}
  function tick(){if(!exam)return;exam.remaining--;const el=document.getElementById('u2-exam-timer');if(el){const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');el.textContent='⏱ '+m+':'+s;if(exam.remaining<=30)el.style.color='var(--red)';}if(exam.remaining<=0)finishExam();}
  function drawQ(){
    const root=document.getElementById('u2-exam-root');if(!root||!exam)return;const q=present(exam.qs[exam.i]);
    const m=String(Math.floor(exam.remaining/60)).padStart(2,'0'),s=String(exam.remaining%60).padStart(2,'0');
    root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem"><span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i+1}/${exam.qs.length}${q._pne?' · ♿ adaptada':''}</span><span id="u2-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span></div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i/exam.qs.length)*100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema} · ${q.nivel}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        ${q.formula?`<div style="font-family:var(--font-code);background:var(--bg-deep);padding:.4rem .7rem;border-radius:var(--radius-sm);display:inline-block;margin-bottom:.8rem;color:var(--gold)">${q.formula}</div>`:''}
        <div id="u2-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">${q.opciones.map((op,k)=>`<button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem"><strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65+k)}</strong> ${op}</button>`).join('')}</div>
        <div id="u2-exam-fb" style="margin-top:1rem"></div></div>`;
    root.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>answerQ(+b.getAttribute('data-opt'))));
  }
  function answerQ(choice){
    const q=present(exam.qs[exam.i]);const ok=choice===q.correcta;exam.answers.push({id:q.id,choice,ok});
    const opts=document.getElementById('u2-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b=>{const k=+b.getAttribute('data-opt');b.disabled=true;if(k===q.correcta)b.style.borderColor='var(--green)';if(k===choice&&!ok)b.style.borderColor='var(--red)';});
    const expW=(q.explicacion_incorrectas&&q.explicacion_incorrectas[choice])||'';
    /* MQC: si el distractor está ligado a un error frecuente, lo mostramos */
    let errHTML='';const raw=exam.qs[exam.i];
    if(!ok&&typeof Insights!=='undefined'&&Array.isArray(raw.tags)){const et=raw.tags.find(t=>t.indexOf('err:')===0);if(et){const er=Insights.errorById(UNIT_ID,et.slice(4));if(er)errHTML=`<p style="margin:.35rem 0 0;color:var(--gold);font-size:.82rem">⚠️ Error frecuente: ${er.correccion}</p>`;}}
    document.getElementById('u2-exam-fb').innerHTML=`<div style="border-left:4px solid ${ok?'var(--green)':'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55"><strong style="color:${ok?'var(--green)':'var(--red)'}">${ok?'✓ ¡Correcto!':'✗ Incorrecto'}</strong><p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>${(!ok&&expW)?`<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expW}</p>`:''}${errHTML}</div>
      <button class="btn btn-primary btn-sm" id="u2-exam-next" style="margin-top:.8rem">${exam.i<exam.qs.length-1?'Siguiente →':'Finalizar'}</button>`;
    document.getElementById('u2-exam-next').addEventListener('click',()=>{if(exam.i<exam.qs.length-1){exam.i++;drawQ();}else finishExam();});
  }
  function finishExam(){
    if(!exam)return;clearInterval(exam.timerId);const correct=exam.answers.filter(a=>a.ok).length,total=exam.qs.length,score=Math.round((correct/total)*100),passed=score>=EXAM_CFG.pass;
    const u=loadUnitData();patchUnit({examBest:Math.max(u.examBest||0,score),examAttempts:(u.examAttempts||0)+1});
    if(passed)awardXP('exam-done');
    const review=exam.qs.map((q,i)=>{const a=exam.answers[i];return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem"><span>${a&&a.ok?'✅':'❌'}</span><span style="flex:1;color:var(--text-secondary)">${i+1}. ${present(q).pregunta}</span></div>`;}).join('');
    const root=document.getElementById('u2-exam-root');
    root.innerHTML=`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
      <div style="font-size:2.8rem">${passed?'🎉':'📚'}</div><h3 style="margin:.4rem 0">${passed?'¡Aprobado!':'Sigue practicando'}</h3>
      <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score>=80?'var(--green)':score>=70?'var(--gold)':'var(--red)'}">${score}/100</div>
      <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas</p>
      <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
      <button class="btn btn-primary btn-sm" id="u2-exam-retry">↻ Repetir</button> <button class="btn btn-ghost btn-sm" id="u2-exam-close">Cerrar</button></div>`;
    document.getElementById('u2-exam-retry').addEventListener('click',startExam);
    document.getElementById('u2-exam-close').addEventListener('click',()=>{const f=loadUnitData();const c=document.getElementById('tab-content');if(c){c.innerHTML=renderExamen(null,f);bindExamen(null,f);}});
    exam=null;
  }

  /* ============================================================
     REGISTRO DE PLUGINS + MANIFEST MQC
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  console.log('[unit-02] Plugins registrados: teoria, simuladores, juego, examen.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'protón':'Partícula del núcleo con carga positiva (+); su número define el elemento.',
        'neutrón':'Partícula del núcleo sin carga (0); aporta masa.',
        'electrón':'Partícula de carga negativa (−) que ocupa los niveles externos.',
        'número atómico':'Número de protones (Z); identifica al elemento.',
        'número másico':'Suma de protones y neutrones (A = Z + N).',
        'isótopo':'Átomos del mismo elemento con distinto número de neutrones.',
        'ion':'Átomo con carga por haber ganado o perdido electrones.',
        'catión':'Ion con carga positiva (perdió electrones).',
        'anión':'Ion con carga negativa (ganó electrones).',
        'orbital':'Zona de probabilidad donde es factible hallar un electrón.',
        'configuración electrónica':'Distribución de los electrones en niveles y subniveles.',
        'electrones de valencia':'Electrones del último nivel; determinan la química del elemento.',
        'principio de Aufbau':'Los subniveles se llenan de menor a mayor energía.',
        'principio de Hund':'Primero un electrón por orbital del subnivel, luego se aparean.',
        'principio de Pauli':'Un orbital admite máximo 2 electrones con spines opuestos.'
      },
      mqc: {
        'topic-0':{ detonante:'Si nadie ha "visto" un átomo a simple vista, ¿cómo sabemos cómo es por dentro?', commit:{pregunta:'¿Cuál crees que fue el PRIMER modelo del átomo?',opciones:['Una esfera maciza','Un sistema con núcleo','Una nube de probabilidad'],correcta:0,explica:'Dalton lo imaginó como una esfera maciza; la evidencia fue refinando el modelo.'}, conexion:'Los modelos atómicos muestran cómo la ciencia se corrige a sí misma con evidencia.' },
        'topic-1':{ detonante:'¿Por qué casi toda la masa de tu cuerpo está en un espacio increíblemente diminuto?', commit:{pregunta:'¿Qué partícula NO está en el núcleo?',opciones:['Protón','Neutrón','Electrón'],correcta:2,explica:'El electrón se mueve fuera del núcleo, en los niveles de energía.'}, conexion:'Que el átomo sea casi vacío explica por qué la materia, aunque sólida, está "hecha de espacio".' },
        'topic-2':{ detonante:'¿Dos átomos del mismo elemento pueden pesar distinto?', commit:{pregunta:'¿Qué cambia entre dos isótopos?',opciones:['Los protones','Los neutrones','Los electrones'],correcta:1,explica:'Los isótopos cambian los neutrones; los protones definen el elemento.'}, conexion:'El carbono-14 (un isótopo) permite datar fósiles y momias por su desintegración.' },
        'topic-3':{ detonante:'¿El electrón viaja por un "carril" fijo o aparece como por arte de magia?', commit:{pregunta:'En el modelo cuántico, el electrón…',opciones:['Sigue una órbita exacta','Está en una zona de probabilidad'],correcta:1,explica:'El modelo cuántico habla de orbitales: probabilidad, no trayectorias exactas.'}, conexion:'La mecánica cuántica hace funcionar los chips, los láseres y las resonancias médicas.' },
        'topic-5':{ detonante:'¿Por qué el electrón "salta" al nivel 4 antes de llenar el 3?', commit:{pregunta:'¿Qué subnivel se llena primero?',opciones:['3d','4s'],correcta:1,explica:'El 4s tiene menos energía que el 3d, por eso se llena antes (Aufbau).'}, conexion:'Este orden explica por qué los metales de transición existen y por qué la tabla tiene la forma que tiene.' },
        'topic-6':{ detonante:'¿Por qué el sodio explota con el agua y el neón no hace nada?', commit:{pregunta:'¿Qué decide cómo reacciona un elemento?',opciones:['Los neutrones','Los electrones de valencia','La masa'],correcta:1,explica:'Los electrones de valencia (del último nivel) controlan la química del elemento.'}, conexion:'La configuración electrónica explica colores, reactividad y hasta los fuegos artificiales.' },
        'topic-7':{ detonante:'¿Cómo hace la sal para mantener unidos sodio y cloro?', commit:{pregunta:'Si un átomo PIERDE un electrón, queda…',opciones:['Negativo','Positivo','Neutro'],correcta:1,explica:'Pierde carga negativa: queda positivo (catión).'}, conexion:'Los iones permiten que tus nervios manden señales y que las baterías funcionen.' }
      },
      mentor: {
        'tab:teoria':'Aquí no vas a memorizar el átomo: lo vas a comprender. En cada tema, primero comprométete con una respuesta; luego explora y lee. Equivocarse al inicio es parte de aprender.',
        'tab:simuladores':'Construye, mueve y observa. La biblioteca gráfica te deja "ver" lo invisible: predice qué pasará antes de mover cada control.',
        'tab:juego':'Construye el átomo razonando, no adivinando. Cada acierto refuerza una idea clave.',
        'tab:examen':'No es para juzgarte: es para descubrir qué ya comprendes. Si fallas, el examen te explica el error frecuente detrás.'
      },
      curiosidades: [
        {topic:'topic-1',texto:'Si quitáramos todo el espacio vacío de los átomos, la humanidad entera cabría en un terrón de azúcar.'},
        {topic:'topic-2',texto:'El carbono-14 se usa para datar restos de hasta ~50 000 años de antigüedad.'},
        {topic:'topic-6',texto:'El color de los fuegos artificiales depende de los electrones de valencia: el sodio da amarillo y el cobre, verde-azul.'}
      ],
      errores: [
        {id:'e1',topic:'topic-1',creencia:'El átomo es una bolita sólida y llena.',porque:'Lo dibujan como una esfera compacta.',correccion:'El átomo es casi todo espacio vacío; la masa está en un núcleo diminuto.'},
        {id:'e2',topic:'topic-7',creencia:'Si un átomo pierde electrones, se vuelve negativo.',porque:'Se confunde "perder" con "negativo".',correccion:'Perder electrones (−) deja más protones (+): el átomo queda POSITIVO (catión).'},
        {id:'e3',topic:'topic-3',creencia:'El electrón gira en un carril fijo como un planeta.',porque:'El modelo de Bohr lo dibuja así.',correccion:'En el modelo cuántico el electrón ocupa orbitales: zonas de probabilidad, no trayectorias exactas.'},
        {id:'e4',topic:'topic-2',creencia:'Dos isótopos son elementos distintos.',porque:'Tienen distinta masa.',correccion:'Son el MISMO elemento (igual Z); solo cambian los neutrones.'},
        {id:'e5',topic:'topic-5',creencia:'Los subniveles se llenan por orden de número (3 antes que 4).',porque:'Parece lógico seguir 1,2,3,4…',correccion:'Se llenan por ENERGÍA: el 4s entra antes que el 3d.'}
      ],
      xref: {
        'teoria:topic-1':[{tab:'simuladores',label:'Constructor de átomos'}],
        'teoria:topic-5':[{tab:'simuladores',label:'Configuración electrónica'},{tab:'juego',label:'Construye el átomo'}],
        'teoria:topic-6':[{tab:'simuladores',label:'Niveles de energía'},{tab:'examen',label:'Ponte a prueba'}],
        'teoria:topic-7':[{tab:'juego',label:'Practica iones'}]
      },
      images: {} /* EOP-038: se retiraron las imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U02)?window.BANCO_PNE_U02:null
    });
  }

})();
