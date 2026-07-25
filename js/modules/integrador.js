/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/modules/integrador.js  |  PROYECTO INTEGRADOR FINAL MQC
   ================================================================
   NO es una Experience adicional: no usa UNIT_PLUGINS ni el patrón
   de 4 pestañas. Es una sección propia (Router.register), un caso
   único que el estudiante recorre linealmente, integrando MQCChem
   de las 9 unidades para tomar decisiones y justificarlas.

   Caso: "Alerta en el Río Pacuare" — un análisis de contaminación
   que requiere: clasificar materia y estructura atómica (U1-U2),
   ubicar el elemento y su enlace (U3-U4), nombrar el compuesto
   hallado (U5), calcular cantidad de sustancia (U6), medir y
   ajustar la concentración (U7), diagnosticar el pH (U8) y decidir
   si la remediación propuesta es una reacción redox viable (U9).

   Reutiliza: MQCChem (todas sus familias), MQC (experienceHeader-like
   framing manual), Mentor, Gamification.addXP, Storage.get/set
   (clave propia 'integrador', no toca 'units'), MQCProfiles.saveReflection
   (Bitácora Científica — misma mecánica de reflexiones por unidad,
   usando 'integrador' como id sintético).
   Sin sistemas nuevos. Arquitectura MQC v1.0 intacta.
================================================================ */
(function () {
  'use strict';
  const C = '#B983FF'; /* violeta — color propio de la culminación, no compite con ninguna unidad */
  const KEY = 'integrador';

  function CHEM(){ return (typeof MQCChem!=='undefined')?MQCChem:null; }
  function awardXP(s){ if(typeof Gamification!=='undefined'&&Gamification&&Gamification.addXP){try{Gamification.addXP(s);}catch(e){}} }
  function loadState(){ if(typeof Storage!=='undefined'&&Storage&&Storage.get){try{return Storage.get(KEY)||{};}catch(e){return {};}} return {}; }
  function saveState(v){ if(typeof Storage!=='undefined'&&Storage&&Storage.set){try{Storage.set(KEY,v);}catch(e){}} }
  function sub(f){ return String(f).replace(/(\d+)/g,'<sub>$1</sub>'); }

  function box(t,c,col){col=col||C;return `<div style="border-left:4px solid ${col};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.75rem 1rem;margin:.75rem 0"><strong style="color:${col};font-size:.85rem;display:block;margin-bottom:.25rem">${t}</strong><span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${c}</span></div>`;}

  /* ============================================================
     DATOS DEL CASO (fijos, deterministas — no aleatorios: es un
     caso único con narrativa, no un banco de preguntas)
  ============================================================ */
  const FE = { symbol:'Fe', z:26 }; /* referencia; MQCChem.elByZ/elBySym completan si ELEMENTOS está cargado */
  const MUESTRA = [
    { nombre:'Agua (H₂O) del río', tipo:'Sustancia pura (compuesto)' },
    { nombre:'Arena suspendida', tipo:'Mezcla heterogénea' },
    { nombre:'Sal disuelta (NaCl)', tipo:'Mezcla homogénea (disolución)' },
    { nombre:'Aire disuelto (O₂, N₂)', tipo:'Mezcla homogénea' }
  ];

  const ESTACIONES = [
    { id:'e0', titulo:'El reporte', icon:'📋', intro:true },
    { id:'e1', titulo:'Clasifica la muestra', icon:'🧪', unidades:'U1 · U2' },
    { id:'e2', titulo:'Ubica y enlaza', icon:'🔗', unidades:'U3 · U4' },
    { id:'e3', titulo:'Nombra el compuesto', icon:'🏷️', unidades:'U5' },
    { id:'e4', titulo:'Calcula la cantidad', icon:'🧮', unidades:'U6' },
    { id:'e5', titulo:'Mide y ajusta la concentración', icon:'🚰', unidades:'U7' },
    { id:'e6', titulo:'Diagnostica el pH', icon:'⚗️', unidades:'U8' },
    { id:'e7', titulo:'Evalúa la remediación', icon:'⚡', unidades:'U9' },
    { id:'e8', titulo:'Informe final', icon:'📝', final:true }
  ];

  let cursor = 0; /* índice de estación activa dentro de la sesión */
  let respuestas = {}; /* respuestas de esta sesión, para el informe final */

  /* ============================================================
     RENDER PRINCIPAL
  ============================================================ */
  function render(){
    const host = document.getElementById('content');
    if (!host) return;
    const st = loadState();
    host.innerHTML = `<div id="int-root" style="max-width:720px;margin:0 auto;padding:1.25rem 1rem 3rem;animation:pageIn .4s ease">
      ${headerHTML(st)}
      <div id="int-stage"></div>
    </div>`;
    drawEstacion();
  }

  function headerHTML(st){
    const done = st.completado;
    return `<div style="text-align:center;margin-bottom:1.25rem">
      <div style="font-size:2.6rem">🧩</div>
      <h2 style="margin:.3rem 0;color:${C}">Proyecto Integrador Final</h2>
      <p style="color:var(--text-secondary);font-size:.92rem;max-width:52ch;margin:0 auto">Caso: <strong>"Alerta en el Río Pacuare"</strong>. No es un examen más: es la culminación de las 9 unidades del curso, resuelta con razonamiento, no con memoria.</p>
      ${done?`<div style="margin-top:.8rem;display:inline-block;background:var(--bg-elevated);border:1px solid ${C};border-radius:var(--radius-md);padding:.5rem 1rem;color:${C};font-size:.85rem">🎓 Ya completaste este proyecto. Puedes repasarlo cuando quieras.</div>`:''}
    </div>
    <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill" style="width:${(cursor/(ESTACIONES.length-1))*100}%;background:${C}"></div></div>`;
  }

  function stage(){ return document.getElementById('int-stage'); }
  function goTo(i){ cursor=Math.max(0,Math.min(ESTACIONES.length-1,i)); render(); }
  function next(){ goTo(cursor+1); }

  function drawEstacion(){
    const e = ESTACIONES[cursor];
    if (e.intro) return drawIntro();
    if (e.final) return drawFinal();
    const fn = { e1:drawE1, e2:drawE2, e3:drawE3, e4:drawE4, e5:drawE5, e6:drawE6, e7:drawE7 }[e.id];
    if (fn) fn(e);
  }

  function stationChrome(e, bodyHTML){
    return `<div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid ${C};border-radius:var(--radius-lg);padding:1.25rem">
      <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.8rem">
        <span style="font-size:1.6rem">${e.icon}</span>
        <div><div style="font-weight:700;color:var(--text-primary)">${e.titulo}</div><div style="font-size:.72rem;color:${C};font-family:var(--font-code)">${e.unidades}</div></div>
      </div>
      ${bodyHTML}
    </div>`;
  }

  /* ── Estación 0 — El reporte (narrativa de apertura) ─────── */
  function drawIntro(){
    stage().innerHTML = stationChrome(ESTACIONES[0], `
      <p style="color:var(--text-secondary);line-height:1.7">Trabajas como <strong>analista científico junior</strong> para el laboratorio ambiental de tu región. Llega un reporte: se encontraron peces muertos cerca de una antigua mina de hierro, río abajo del Pacuare. Te entregan una muestra de agua y varios datos de campo. Tu tarea: <strong>analizarla paso a paso y decidir qué recomendar</strong>, usando todo lo que aprendiste en las 9 unidades del curso.</p>
      ${box('Cómo funciona este proyecto','No hay preguntas sueltas ni banco de examen: cada estación te da información real del caso, tomas una decisión, y al final escribes tu propio informe de conclusión (que queda guardado en tu Bitácora Científica).','var(--gold)')}
      <div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-start">Comenzar el análisis →</button></div>
    `);
    document.getElementById('int-start').addEventListener('click', next);
  }

  /* ── Estación 1 — Clasifica la muestra (U1 materia + U2 estructura atómica) ── */
  function drawE1(e){
    const chem = CHEM();
    const fe = chem ? (chem.elBySym('Fe')||{z:26,mass:55.8}) : {z:26,mass:55.8};
    let paso = respuestas.e1_paso || 1;
    let g1 = respuestas.e1_g1 || null;
    let g2 = respuestas.e1_g2 || null;
    function draw(){
      let body = `<p style="color:var(--text-secondary)">El laboratorio identificó estos componentes en la muestra:</p>
        <div style="margin:.7rem 0">${MUESTRA.map(m=>`<div style="padding:.5rem .7rem;background:var(--bg-elevated);border-radius:var(--radius-md);margin-bottom:.4rem;font-size:.88rem"><strong>${m.nombre}</strong></div>`).join('')}</div>`;
      if (paso===1) {
        body += `<p style="font-size:.9rem;color:var(--text-secondary)">De estos 4 componentes, ¿cuál es el <strong>único que es una mezcla heterogénea</strong> (no uniforme a simple vista)?</p>
          <div id="int-e1-ops" style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:.7rem 0">${MUESTRA.map(m=>`<button class="btn btn-ghost btn-sm" data-o="${m.nombre}">${m.nombre}</button>`).join('')}</div>`;
      } else if (paso===2) {
        const correctaAntes = 'Arena suspendida';
        body += box('Correcto en general', g1===correctaAntes?'Identificaste bien la arena suspendida: se puede distinguir a simple vista y no está distribuida uniformemente.':'La respuesta esperada era "Arena suspendida" (se ve a simple vista, no distribuida uniformemente); las otras 3 son sustancia pura o mezclas homogéneas.','var(--green)');
        body += `<p style="font-size:.9rem;color:var(--text-secondary);margin-top:.8rem">El reporte también detectó un <strong>ion Fe²⁺</strong> disuelto (hierro con carga +2). El hierro neutro tiene Z=${fe.z} (${fe.z} protones y ${fe.z} electrones). ¿Cuántos electrones tiene el ion <strong>Fe²⁺</strong>?</p>
          <div id="int-e1-ops2" style="display:flex;gap:.5rem;justify-content:center;margin:.7rem 0">${[fe.z,fe.z-2,fe.z+2,fe.z-1].map(v=>`<button class="btn btn-ghost btn-sm" data-o2="${v}">${v}</button>`).join('')}</div>`;
      } else {
        const correcta2 = fe.z-2;
        body += box('Análisis completo', g2==correcta2?`Correcto: un ion Fe²⁺ perdió 2 electrones respecto al hierro neutro: ${fe.z}−2=${correcta2} electrones, pero sigue teniendo ${fe.z} protones (por eso es +2).`:`La respuesta esperada era ${correcta2}: el Fe²⁺ perdió 2 electrones (${fe.z}−2), aunque conserva sus ${fe.z} protones.`,'var(--green)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e1-next">Continuar a Tabla Periódica y Enlace →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      const o1=stage().querySelector('#int-e1-ops'); if(o1) stage().querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>{g1=b.getAttribute('data-o');respuestas.e1_g1=g1;paso=2;respuestas.e1_paso=2;draw();}));
      stage().querySelectorAll('[data-o2]').forEach(b=>b.addEventListener('click',()=>{g2=+b.getAttribute('data-o2');respuestas.e1_g2=g2;paso=3;respuestas.e1_paso=3;draw();}));
      const nx=stage().querySelector('#int-e1-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 2 — Ubica y enlaza (U3 tabla periódica + U4 enlace) ── */
  function drawE2(e){
    const chem = CHEM();
    const fe = chem ? chem.elBySym('Fe') : null;
    const o  = chem ? chem.elBySym('O')  : null;
    let paso = respuestas.e2_paso || 1;
    let guess = respuestas.e2_guess || null;
    function draw(){
      let body = `<p style="color:var(--text-secondary)">Un análisis más fino reveló que el hierro está formando <strong>óxido de hierro(III)</strong> (Fe₂O₃, herrumbre) en el sedimento — señal de que hubo oxidación en la antigua mina.</p>`;
      if (paso===1) {
        body += `<p style="font-size:.9rem;color:var(--text-secondary)">${fe?`El hierro (Fe) está en el grupo ${fe.group||'de transición'}, periodo ${fe.period}.`:''} Entre el <strong>Fe (metal)</strong> y el <strong>O (no metal)</strong>, ¿qué tipo de enlace esperas que formen?</p>
          <div style="display:flex;gap:.5rem;justify-content:center;margin:.7rem 0">${['Iónico','Covalente','Metálico'].map(o2=>`<button class="btn btn-ghost btn-sm" data-o="${o2}">${o2}</button>`).join('')}</div>`;
      } else {
        const real = chem ? chem.predictBond(fe||{type:'transition-metal'}, o||{type:'nonmetal'}) : 'Iónico';
        const ok = guess===real;
        body += box('Verificación con MQCChem',`${ok?'✓ Correcto.':'La respuesta esperada era "'+real+'".'} Metal + no metal → enlace <strong>${real}</strong>: el metal cede electrones y el no metal los recibe, formando iones que se atraen.`,'var(--green)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e2-next">Continuar a Nomenclatura →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>{guess=b.getAttribute('data-o');respuestas.e2_guess=guess;paso=2;respuestas.e2_paso=2;draw();}));
      const nx=stage().querySelector('#int-e2-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 3 — Nombra el compuesto (U5 nomenclatura) ──── */
  function drawE3(e){
    const chem = CHEM();
    let answered = !!respuestas.e3_done;
    function draw(){
      const nombreReal = 'óxido de hierro(III)';
      let body = `<p style="color:var(--text-secondary)">El sedimento del río contiene <strong style="font-family:var(--font-code)">Fe₂O₃</strong>.</p>
        <p style="font-size:.9rem;color:var(--text-secondary)">¿Cómo se nombra este compuesto?</p>
        <div id="int-e3-ops" style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:.7rem 0">${['óxido de hierro(III)','óxido de hierro(II)','hierro oxigenado','trióxido de dihierro solamente'].map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}" ${answered?'disabled':''}>${o}</button>`).join('')}</div>`;
      if (answered) {
        body += box('Regla del cruce (MQCChem)','El Fe³⁺ (catión hierro(III)) y el O²⁻ (anión óxido) se combinan en proporción 2:3 para quedar neutros: Fe₂O₃. El nombre indica la carga del catión entre paréntesis porque el hierro puede tener más de un estado de oxidación común (+2 o +3).','var(--green)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e3-next">Continuar a Estequiometría →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>{respuestas.e3_guess=b.getAttribute('data-o');respuestas.e3_done=true;answered=true;draw();}));
      const nx=stage().querySelector('#int-e3-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 4 — Calcula la cantidad (U6 estequiometría) ── */
  function drawE4(e){
    const chem = CHEM();
    let masa = respuestas.e4_masa || 8; /* gramos de Fe2O3 hallados en la muestra de sedimento */
    let revealed = !!respuestas.e4_done;
    function draw(){
      const mm = chem ? chem.molarMass('Fe2O3') : 159.7;
      const mol = chem && mm ? chem.molesFromMass(masa, mm) : null;
      const particulas = chem && mol!=null ? chem.particlesFromMoles(mol) : null;
      let body = `<p style="color:var(--text-secondary)">Se filtraron <strong>${masa} g</strong> de Fe₂O₃ de un litro de sedimento del río.</p>
        <label style="font-size:.82rem;color:var(--text-muted)">Ajusta la masa encontrada: <strong style="color:var(--text-primary)">${masa} g</strong></label>
        <input id="int-e4-slider" type="range" min="2" max="20" step="1" value="${masa}" style="width:100%;accent-color:${C};margin:.3rem 0 .8rem">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem;text-align:center">
          <div style="font-size:.8rem;color:var(--text-secondary)">Masa molar de Fe₂O₃ (MQCChem): <strong>${mm} g/mol</strong></div>
          <div style="font-family:var(--font-code);color:${C};font-size:1.3rem;font-weight:700;margin:.3rem 0">${mol} mol</div>
          <div style="font-size:.74rem;color:var(--text-muted)">≈ ${particulas?particulas.toExponential(2):'—'} unidades fórmula (n × N_A)</div>
        </div>`;
      if (!revealed) {
        body += `<div style="text-align:center;margin-top:.9rem"><button class="btn btn-primary btn-sm" id="int-e4-ok">Registrar este cálculo en el informe</button></div>`;
      } else {
        body += box('Por qué importa','Saber cuántos moles de contaminante hay es el primer paso para decidir cuánta sustancia neutralizante se necesita — eso es justo lo que calculas en la siguiente estación.','var(--gold)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e4-next">Continuar a Disoluciones →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelector('#int-e4-slider').addEventListener('input',ev=>{masa=+ev.target.value;respuestas.e4_masa=masa;draw();});
      const ok=stage().querySelector('#int-e4-ok'); if(ok) ok.addEventListener('click',()=>{revealed=true;respuestas.e4_done=true;respuestas.e4_mol=mol;draw();});
      const nx=stage().querySelector('#int-e4-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 5 — Mide y ajusta la concentración (U7 disoluciones) ── */
  function drawE5(e){
    const chem = CHEM();
    let V1=respuestas.e5_v1||100, V2=respuestas.e5_v2||100;
    const C1=0.08; /* M encontrada (ficticia, fija) */
    const LIMITE=0.02; /* M máximo seguro (ficticio, fijo del caso) */
    let done=!!respuestas.e5_done;
    function draw(){
      const C2 = chem&&chem.dilutionV2 ? chem.dilutionV2(C1,V1,V2) : null;
      const segura = C2!=null && C2<=LIMITE;
      let body = `<p style="color:var(--text-secondary)">La concentración de hierro disuelto medida es <strong>${C1} M</strong> en ${V1} mL de muestra. El límite seguro para la vida acuática es <strong>${LIMITE} M</strong>.</p>
        <label style="font-size:.82rem;color:var(--text-muted)">Volumen final tras diluir con agua limpia: <strong style="color:var(--text-primary)">${V2} mL</strong></label>
        <input id="int-e5-slider" type="range" min="100" max="600" step="20" value="${V2}" style="width:100%;accent-color:${C};margin:.3rem 0 .8rem">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem;text-align:center">
          <div style="font-size:.8rem;color:var(--text-secondary)">Nueva concentración (C₁V₁=C₂V₂):</div>
          <div style="font-family:var(--font-code);font-size:1.3rem;font-weight:700;color:${segura?'var(--green)':'var(--red)'}">${C2} M</div>
          <div style="font-size:.76rem;margin-top:.3rem;color:${segura?'var(--green)':'var(--red)'}">${segura?'✓ Por debajo del límite seguro.':'✗ Todavía por encima del límite seguro.'}</div>
        </div>`;
      if (!segura) {
        body += `<p style="font-size:.85rem;color:var(--text-secondary);margin-top:.6rem">Ajusta el volumen hasta que la concentración quede en un nivel seguro.</p>`;
      } else if (!done) {
        body += `<div style="text-align:center;margin-top:.9rem"><button class="btn btn-primary btn-sm" id="int-e5-ok">Confirmar dilución segura</button></div>`;
      } else {
        body += box('Decisión registrada','Diluir no elimina el hierro contaminante: solo baja su concentración. Para una remediación real, además de diluir, hay que retirar o transformar el contaminante — lo que evaluamos en la última estación.','var(--gold)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e5-next">Continuar a Ácidos y Bases →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelector('#int-e5-slider').addEventListener('input',ev=>{V2=+ev.target.value;respuestas.e5_v2=V2;draw();});
      const ok=stage().querySelector('#int-e5-ok'); if(ok) ok.addEventListener('click',()=>{done=true;respuestas.e5_done=true;draw();});
      const nx=stage().querySelector('#int-e5-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 6 — Diagnostica el pH (U8 ácidos y bases) ──── */
  function drawE6(e){
    const chem = CHEM();
    const phMedido = 4.2; /* fijo del caso: agua de mina, ácida */
    let guess = respuestas.e6_guess || null;
    function draw(){
      const clase = chem&&chem.classifyPH ? chem.classifyPH(phMedido) : 'Ácido débil';
      let body = `<p style="color:var(--text-secondary)">El pH medido del agua cerca de la mina es <strong>${phMedido}</strong> (el agua limpia del río, río arriba, tiene pH 7).</p>`;
      if (!guess) {
        body += `<p style="font-size:.9rem;color:var(--text-secondary)">¿Cómo clasificarías esta muestra?</p>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:.7rem 0">${['Ácido fuerte','Ácido débil','Neutro','Básico'].map(o=>`<button class="btn btn-ghost btn-sm" data-o="${o}">${o}</button>`).join('')}</div>`;
      } else {
        const ok = guess===clase;
        body += box('Diagnóstico (MQCChem)',`${ok?'✓ Correcto.':'La clasificación real es "'+clase+'".'} Un pH de ${phMedido} es más ácido que el agua limpia (pH 7): es coherente con drenaje ácido de mina, un fenómeno real donde minerales de hierro expuestos al aire y al agua generan acidez.`,'var(--green)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e6-next">Continuar a la Remediación →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>{guess=b.getAttribute('data-o');respuestas.e6_guess=guess;draw();}));
      const nx=stage().querySelector('#int-e6-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación 7 — Evalúa la remediación (U9 redox) ───────── */
  function drawE7(e){
    const chem = CHEM();
    let paso = respuestas.e7_paso || 1;
    let g1 = respuestas.e7_g1 || null;
    function draw(){
      let body = `<p style="color:var(--text-secondary)">El equipo propone airear el agua para que el Fe²⁺ disuelto se oxide a Fe³⁺ y precipite como Fe₂O₃ (más fácil de filtrar): <strong style="font-family:var(--font-code)">4Fe²⁺ + O₂ + ... → Fe₂O₃ + ...</strong></p>`;
      if (paso===1) {
        body += `<p style="font-size:.9rem;color:var(--text-secondary)">¿Es esta una reacción de oxidación-reducción?</p>
          <div style="display:flex;gap:.5rem;justify-content:center;margin:.7rem 0">${['Sí, el Fe cambia su Nox','No, ningún átomo cambia de Nox'].map(o=>`<button class="btn btn-ghost btn-sm" data-o1="${o}">${o}</button>`).join('')}</div>`;
      } else if (paso===2) {
        body += box('Correcto','El Fe pasa de +2 a +3 (se oxida) y el O₂ pasa de 0 a −2 (se reduce): sí es una reacción redox.','var(--green)');
        body += `<p style="font-size:.9rem;color:var(--text-secondary);margin-top:.7rem">¿Cuál es el <strong>agente oxidante</strong> en esta reacción (el que SE reduce)?</p>
          <div style="display:flex;gap:.5rem;justify-content:center;margin:.7rem 0">${['Fe²⁺','O₂'].map(o=>`<button class="btn btn-ghost btn-sm" data-o2="${o}">${o}</button>`).join('')}</div>`;
      } else {
        const ok = g1==='O₂';
        body += box('Decisión final del caso',`${ok?'✓ Correcto: el O₂':'La respuesta esperada era el O₂:'} se reduce (gana electrones, pasa de 0 a −2) y por eso es el agente oxidante. El Fe²⁺ es el agente reductor (se oxida). La aireación es una estrategia de remediación <strong>viable</strong>: usa una reacción redox espontánea (el oxígeno del aire) para precipitar el hierro sin químicos adicionales.`,'var(--green)');
        body += `<div style="text-align:center;margin-top:1rem"><button class="btn btn-primary" id="int-e7-next">Ir al Informe Final →</button></div>`;
      }
      stage().innerHTML = stationChrome(e, body);
      stage().querySelectorAll('[data-o1]').forEach(b=>b.addEventListener('click',()=>{respuestas.e7_o1=b.getAttribute('data-o1');paso=2;respuestas.e7_paso=2;draw();}));
      stage().querySelectorAll('[data-o2]').forEach(b=>b.addEventListener('click',()=>{g1=b.getAttribute('data-o2');respuestas.e7_g1=g1;paso=3;respuestas.e7_paso=3;draw();}));
      const nx=stage().querySelector('#int-e7-next'); if(nx) nx.addEventListener('click',()=>{awardXP('integrador-estacion');next();});
    }
    draw();
  }

  /* ── Estación final — Informe (justificación libre → Bitácora) ── */
  function drawFinal(){
    const st = loadState();
    const yaEscrito = st.informe || '';
    stage().innerHTML = stationChrome(ESTACIONES[ESTACIONES.length-1], `
      <p style="color:var(--text-secondary)">Recorriste el caso completo: clasificaste la muestra, ubicaste y enlazaste el hierro, lo nombraste, calculaste su cantidad, ajustaste su concentración, diagnosticaste el pH y evaluaste la remediación redox.</p>
      ${box('Tu turno: el informe','Con tus propias palabras, escribe la conclusión de tu análisis: ¿qué le pasó al río, y recomendarías la aireación como solución? Justifica usando al menos dos ideas de lo que trabajaste en este caso.','var(--gold)')}
      <textarea id="int-informe" placeholder="Escribe aquí tu informe de conclusión..." style="width:100%;min-height:140px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text-primary);padding:.7rem;font-family:var(--font-body);font-size:.9rem;resize:vertical">${yaEscrito}</textarea>
      <div id="int-final-fb" style="margin-top:.8rem"></div>
      <div style="text-align:center;margin-top:1rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" id="int-back">← Revisar el caso</button>
        <button class="btn btn-primary" id="int-finish">🎓 Entregar informe y completar el proyecto</button>
      </div>
    `);
    document.getElementById('int-back').addEventListener('click',()=>goTo(ESTACIONES.length-2));
    document.getElementById('int-finish').addEventListener('click',()=>{
      const texto = document.getElementById('int-informe').value.trim();
      if (texto.length < 30) {
        document.getElementById('int-final-fb').innerHTML = `<p style="color:var(--gold);font-size:.85rem">Escribe un poco más (al menos unas líneas) para que tu informe quede completo en la Bitácora.</p>`;
        return;
      }
      const wasCompleted = st.completado;
      saveState(Object.assign({}, st, { informe:texto, completado:true, fecha:Date.now() }));
      if (typeof MQCProfiles!=='undefined' && MQCProfiles.activeId && MQCProfiles.saveReflection) {
        const id = MQCProfiles.activeId();
        if (id) MQCProfiles.saveReflection(id, 'integrador', texto);
      }
      if (!wasCompleted) awardXP('integrador-completado');
      document.getElementById('int-final-fb').innerHTML = `<div style="text-align:center;padding:1rem;background:var(--bg-elevated);border-radius:var(--radius-md);border:1px solid ${C}">
        <div style="font-size:2rem">🎉</div>
        <p style="color:${C};font-weight:700;margin:.4rem 0">¡Proyecto Integrador Final completado!</p>
        <p style="color:var(--text-secondary);font-size:.85rem">Tu informe quedó guardado en tu Bitácora Científica. ¡Completaste el recorrido completo de Química Interactiva 10°!</p>
      </div>`;
    });
  }

  /* ============================================================
     REGISTRO (Router — NO es UNIT_PLUGINS)
  ============================================================ */
  if (typeof Router !== 'undefined' && Router.register) {
    Router.register('integrador', {
      init: function () {
        cursor = 0; respuestas = {};
        const st = loadState();
        if (st.completado) cursor = ESTACIONES.length - 1; /* si ya lo completó, entra directo al informe */
        render();
        awardXP('section-visited');
      },
      destroy: function () {}
    });
  }
  console.log('[integrador] Proyecto Integrador Final registrado (Router, no UNIT_PLUGINS).');
})();
