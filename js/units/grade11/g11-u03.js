/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/grade11/g11-u03.js  |  UNIDAD III — Química Orgánica I
   ================================================================
   IMP-11-U03: tercera unidad real de Química 11°, sobre el mismo
   patrón oficial de g11-u01.js/g11-u02.js. Namespace paralelo de
   11.º (data.grade11, GRADE11_UNIDADES_DATA, Storage.*Grade11*) —
   nunca toca data.units ni las unidades de décimo.

   Reutiliza MQCChem.alkaneFormula/alkeneFormula/alkyneFormula
   (agregadas en este mismo sprint, ampliación aditiva) para TODOS
   los cálculos de fórmula molecular — ninguna fórmula se calculó a
   mano dentro de esta unidad.

   Continuidad narrativa: retoma los datos cuantitativos de la
   Unidad II (¿qué sustancia produjo el derrame?) sin repetir su
   contenido, y cierra con una pregunta puente hacia la Unidad IV
   (Grupos Funcionales y Biomoléculas).

   HOTFIX-08/IMP-11-U02 incorporado desde el inicio: el examen mezcla
   el orden de las opciones una única vez al construir el intento.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'g11-u03';
  const C = '#5CF2A8'; /* verde esmeralda, ya asignado en unidades-grade11.js */

  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = { 'topic-read': 'topic-read', 'exam-done': 'exam-passed', 'game-played': 'game-won', 'game-won': 'game-won', 'grade11-mission-done': 'course-complete' };
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.load === 'function') {
      try { return Storage.load().grade11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateGrade11Unit === 'function') {
      try { Storage.updateGrade11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markGrade11TopicRead === 'function') {
      try { Storage.markGrade11TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }
  /* SPRINT DE AFINAMIENTO PRE-PNE — Parte I: bug real confirmado por
     auditoría. 'alcano', 'alqueno' y 'alquino' se enseñan a fondo en
     esta unidad (teoría, 3 simuladores, examen) pero ANTES de este
     fix nunca llamaban al motor del Atlas Químico (AtlasQuimico.js)
     — esas 3 fichas quedaban bloqueadas de forma permanente, sin
     ningún camino posible para desbloquearlas, sin importar cuánto
     avanzara el estudiante. No otorga XP (mismo comportamiento que
     el resto del Atlas — es evidencia de aprendizaje, no un sistema
     de recompensa paralelo) y no modifica ningún texto ni contenido
     de la unidad, solo conecta interacciones ya existentes. */
  function discoverAtlas(atlasId) {
    if (typeof AtlasQuimico === 'undefined' || !AtlasQuimico.markDiscovered) return;
    try { AtlasQuimico.markDiscovered(atlasId); } catch (e) {}
  }
  function markSimDone(simId, score) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP(score >= 100 ? 'simulator-perfect' : 'simulator-done');
    }
  }
  function box(titulo, cuerpo, color) {
    return `<div style="background:var(--bg-elevated);border-left:3px solid ${color || C};border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem .9rem;margin:.7rem 0">
      <strong style="color:${color || C};font-size:.82rem">${titulo}</strong>
      <p style="margin:.3rem 0 0;font-size:.87rem;color:var(--text-secondary);line-height:1.6">${cuerpo}</p>
    </div>`;
  }
  function chem() { return (typeof MQCChem !== 'undefined') ? MQCChem : null; }

  /* ============================================================
     1) TEORÍA — 7 temas
  ============================================================ */
  const TEORIA = [
    { icon: '🌱', titulo: '¿Por qué existe la Química Orgánica?', html: `
      <p>Hasta ahora estudiaste sustancias como el agua o las sales — compuestos generalmente simples. Pero la mayoría de las moléculas que forman los seres vivos, los combustibles y los plásticos están construidas alrededor de un único elemento con una capacidad única: el <strong>carbono</strong>.</p>
      ${box('¿Qué hace especial al carbono?', 'El carbono puede formar hasta 4 enlaces a la vez, y puede encadenarse consigo mismo casi sin límite — por eso existen millones de compuestos orgánicos distintos, mucho más que de cualquier otro elemento.', C)}
      <p>La Química Orgánica es, literalmente, el estudio de todo lo que se puede construir con esa capacidad del carbono — desde el gas que usás para cocinar hasta el ADN.</p>` },

    { icon: '⚛️', titulo: 'El carbono', html: `
      <p>El carbono tiene 4 electrones de valencia — por eso siempre forma exactamente <strong>4 enlaces</strong> (para completar su octeto), ya sean simples, dobles o triples.</p>
      ${box('Regla clave', 'Un enlace simple "cuesta" 1 conexión. Un enlace doble "cuesta" 2. Un enlace triple "cuesta" 3. El carbono siempre reparte sus 4 conexiones totales entre sus enlaces vecinos — nunca más, nunca menos.', C)}
      ${box('Ejemplo', 'En el metano (CH4), el único carbono forma 4 enlaces simples, uno con cada hidrógeno — sus 4 conexiones completas.', C)}` },

    { icon: '⛓️', titulo: 'Alcanos', html: `
      <p>Los <strong>alcanos</strong> son hidrocarburos que solo tienen <strong>enlaces simples</strong> entre sus carbonos — son la familia "más completa" de hidrógenos posible.</p>
      ${box('Fórmula general', 'Un alcano de "n" carbonos siempre cumple: <strong>CnH(2n+2)</strong>. Ejemplo con 3 carbonos: C3H(2×3+2) = C3H8 (propano).', C)}
      ${box('Ejemplo resuelto', 'Metano (1C) = CH4. Etano (2C) = C2H6. Butano (4C) = C4H10 — el gas que se usa en algunos encendedores.', C)}` },

    { icon: '🔗', titulo: 'Alquenos', html: `
      <p>Los <strong>alquenos</strong> tienen exactamente <strong>un enlace doble</strong> entre dos de sus carbonos — por eso tienen 2 hidrógenos menos que el alcano equivalente.</p>
      ${box('Fórmula general', 'Un alqueno de "n" carbonos cumple: <strong>CnH(2n)</strong>. Necesita al menos 2 carbonos (un enlace doble no puede existir con un solo carbono). Ejemplo con 3 carbonos: C3H6 (propeno).', C)}
      ${box('Aplicación real', 'El eteno (C2H4) es una de las moléculas más producidas del mundo — se usa para fabricar plástico.', C)}` },

    { icon: '🧨', titulo: 'Alquinos', html: `
      <p>Los <strong>alquinos</strong> tienen exactamente <strong>un enlace triple</strong> — la conexión más "apretada" posible entre dos carbonos, y por eso la familia con menos hidrógenos.</p>
      ${box('Fórmula general', 'Un alquino de "n" carbonos cumple: <strong>CnH(2n−2)</strong>. También necesita al menos 2 carbonos. Ejemplo con 2 carbonos: C2H2 (etino, también llamado acetileno).', C)}
      ${box('Comparación directa', 'Con 4 carbonos: butano C4H10 (alcano) → buteno C4H8 (alqueno) → butino C4H6 (alquino). Cada enlace múltiple adicional resta 2 hidrógenos.', C)}` },

    { icon: '🏷️', titulo: 'Cómo nombrar alcanos', html: `
      <p>El nombre de un hidrocarburo tiene 2 partes: un <strong>prefijo</strong> (cuántos carbonos) y una <strong>terminación</strong> (qué tipo de enlace).</p>
      ${box('Los 10 prefijos oficiales', 'met-(1) · et-(2) · prop-(3) · but-(4) · pent-(5) · hex-(6) · hept-(7) · oct-(8) · non-(9) · dec-(10).', C)}
      ${box('Las 3 terminaciones', '-ano = alcano (enlaces simples). -eno = alqueno (un doble). -ino = alquino (un triple). Ejemplo: "pent-" + "-ano" = pentano (5 carbonos, alcano).', C)}` },

    { icon: '🔍', titulo: 'Identificando un contaminante', html: `
      <p>El laboratorio recibió varias fórmulas moleculares de la muestra del derrame. Para identificar cada una, hay 2 pasos: <strong>contar los carbonos</strong> (te da el prefijo) y <strong>comparar los hidrógenos</strong> con lo que esperarías de un alcano (te dice si hay algún enlace múltiple).</p>
      ${box('Método paso a paso', '1) Contá los carbonos (subíndice de la C). 2) Calculá cuántos hidrógenos tendría el ALCANO de ese mismo número de carbonos (2n+2). 3) Compará: si coincide, es alcano; si tiene 2 menos, es alqueno; si tiene 4 menos, es alquino.', C)}
      ${box('Por qué importa para el caso', 'Los enlaces múltiples suelen hacer que una sustancia sea más reactiva — identificar la familia correcta ayuda a predecir cómo se comporta el contaminante en el ambiente.', C)}` }
  ];

  const TOPIC_HINTS = {
    0: ['El carbono puede encadenarse consigo mismo casi sin límite — por eso hay tantos compuestos orgánicos.'],
    1: ['El carbono SIEMPRE forma 4 enlaces en total, sin importar si son simples, dobles o triples.'],
    2: ['Alcano = CnH(2n+2). Solo enlaces simples.'],
    3: ['Alqueno = CnH(2n). Un enlace doble. Necesita mínimo 2 carbonos.'],
    4: ['Alquino = CnH(2n-2). Un enlace triple. Necesita mínimo 2 carbonos.'],
    5: ['El prefijo dice cuántos carbonos; la terminación dice qué tipo de enlace.'],
    6: ['Comparar los hidrógenos reales contra los del alcano equivalente te dice la familia.']
  };

  function enrichTeoria(html, i) {
    let out = (typeof Glossary !== 'undefined') ? Glossary.highlight(html) : html;
    if (typeof UnitAssets !== 'undefined' && UnitAssets.get(UNIT_ID, 'topic-' + i)) {
      out = UnitAssets.img(UNIT_ID, 'topic-' + i, { caption: UnitAssets.get(UNIT_ID, 'topic-' + i).alt }) + out;
    }
    if (typeof UnitMedia !== 'undefined') {
      const v = UnitMedia.render(UNIT_ID, 'topic-' + i);
      if (v) out += v;
    }
    if (typeof CrossRef !== 'undefined') out += CrossRef.renderChips(UNIT_ID, 'teoria:topic-' + i);
    return out;
  }

  function renderTeoria(unit, uData) {
    const read = (uData && uData.topicsRead) ? uData.topicsRead : [];
    const total = TEORIA.length;
    const leidos = TEORIA.filter((_, i) => read.includes(`${UNIT_ID}-topic-${i}`)).length;
    const items = TEORIA.map((t, i) => {
      const tid = `${UNIT_ID}-topic-${i}`;
      const isRead = read.includes(tid);
      return `
        <div class="u1-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="u1-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">${isRead ? '✓ leído' : ''}</span>
            <span class="u1-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="u1-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
            ${enrichTeoria(t.html, i)}
            <div class="qi-hints-host" data-topic="${i}"></div>
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead ? 'disabled' : ''}>
                ${isRead ? '✓ Tema leído' : '📖 Marcar como leído (+15 XP)'}
              </button>
              ${isRead ? '<span style="font-size:.78rem;color:var(--green)">¡Bien! XP otorgado.</span>' : ''}
            </div>
          </div>
        </div>`;
    }).join('');
    return `
      <div class="u1-teoria" style="animation:pageIn .4s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Lee cada tema y márcalo como leído para ganar XP y avanzar tu progreso de la unidad.</p>
          <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${total} leídos</span>
        </div>
        ${items}
      </div>`;
  }
  function bindTeoria(unit, uData) {
    const container = document.getElementById('tab-content');
    if (!container) return;
    container.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-acc-toggle');
        const body = container.querySelector(`[data-acc-body="${i}"]`);
        const caret = btn.querySelector('.u1-acc-caret');
        const open = body.style.display === 'block';
        body.style.display = open ? 'none' : 'block';
        if (caret) caret.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
    container.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-read');
        const tid = `${UNIT_ID}-topic-${i}`;
        // FIX-XP-01: awardXP('topic-read') se disparaba en CADA clic,
        // incluso releyendo un tema ya marcado. Storage.markGrade11TopicRead
        // ya deduplica en su propio array topicsRead; acá solo hace falta
        // consultarlo ANTES de marcar, para saber si es la primera vez.
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(tid);
        markRead(tid);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const reopened = container.querySelector(`[data-acc-body="${i}"]`);
        if (reopened) reopened.style.display = 'block';
      });
    });
    if (typeof Hints !== 'undefined') {
      container.querySelectorAll('.qi-hints-host').forEach(host => {
        const ti = host.getAttribute('data-topic');
        const hs = TOPIC_HINTS[ti];
        if (hs && hs.length) Hints.attach(host, hs, { label: '💡 Pista para entender este tema' });
      });
    }
  }

  /* ============================================================
     2) SIMULADORES — reutilizan MQCChem.alkaneFormula/alkeneFormula/
     alkyneFormula para TODOS los cálculos de fórmula.
  ============================================================ */
  function renderSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];
    const SIMS = [
      { id: 'sim-g11u3-01', icon: '🧱', name: 'Constructor Molecular', desc: 'Elegí cuántos carbonos y qué tipo de enlace — mirá cómo cambia la fórmula y la familia en vivo.' },
      { id: 'sim-g11u3-02', icon: '🔗', name: 'Laboratorio de Enlaces', desc: 'Cambiá el tipo de enlace de una misma cadena y mirá cómo cambian el nombre y la fórmula.' },
      { id: 'sim-g11u3-03', icon: '🔍', name: 'Detector Orgánico', desc: 'Te dan una fórmula — identificá la familia, el nombre y el número de carbonos.' }
    ];
    const cards = SIMS.map(s => `
      <div class="unit-card" style="--unit-color:${C};cursor:pointer" data-open-sim="${s.id}">
        <div class="unit-badge" style="color:${done.includes(s.id) ? 'var(--green)' : 'var(--text-muted)'};border-color:${done.includes(s.id) ? 'rgba(0,255,136,.3)' : 'var(--border)'}">${done.includes(s.id) ? '✓ Completado' : 'Pendiente'}</div>
        <div class="unit-symbol">${s.icon}</div>
        <div class="unit-name">${s.name}</div>
        <div class="unit-meta"><span class="unit-meta-item unit-meta-item-clamp">${s.desc}</span></div>
      </div>`).join('');
    return `<div class="units-grid" style="margin-top:.5rem">${cards}</div>`;
  }
  function bindSimuladores(unit, uData) {
    document.querySelectorAll('[data-open-sim]').forEach(el => {
      el.addEventListener('click', () => openSimulator(el.getAttribute('data-open-sim')));
    });
  }
  function openSimulator(simId) {
    const host = document.getElementById('tab-content');
    if (!host) return;
    if (simId === 'sim-g11u3-01') simConstructor(host);
    else if (simId === 'sim-g11u3-02') simEnlaces(host);
    else if (simId === 'sim-g11u3-03') simDetector(host);
  }
  function _simHeader(title) {
    return `<button class="btn btn-ghost btn-sm" data-back-sim style="margin-bottom:.8rem">← Simuladores</button>
      <h3 style="color:${C};margin:0 0 .8rem">${title}</h3>`;
  }
  function _bindBackSim() {
    const back = document.querySelector('[data-back-sim]');
    if (back) back.addEventListener('click', () => {
      const host = document.getElementById('tab-content');
      const unit = GRADE11_UNIDADES_DATA.find(u => u.id === UNIT_ID);
      const fresh = loadUnitData();
      host.innerHTML = renderSimuladores(unit, fresh);
      bindSimuladores(unit, fresh);
    });
  }
  function _familyLabel(f) { return f === 'alcano' ? 'Alcano (enlaces simples)' : f === 'alqueno' ? 'Alqueno (1 enlace doble)' : 'Alquino (1 enlace triple)'; }

  /* Simulador 1 — Constructor Molecular */
  function simConstructor(host) {
    let n = 3, family = 'alcano';
    function draw() {
      const M = chem();
      const data = M ? M.organicFormula(n, family) : null;
      host.innerHTML = `${_simHeader('Constructor Molecular')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <label style="font-size:.82rem;color:var(--text-muted)">Cantidad de carbonos: <strong id="cm-n-val">${n}</strong></label>
          <input type="range" id="cm-n" min="1" max="10" value="${n}" style="width:100%;accent-color:${C}">
          <label style="font-size:.82rem;color:var(--text-muted);margin-top:.7rem;display:block">Tipo de enlace entre carbonos</label>
          <div style="display:flex;gap:.4rem;margin-top:.3rem;flex-wrap:wrap">
            <button class="btn btn-sm ${family === 'alcano' ? 'btn-primary' : 'btn-ghost'}" data-fam="alcano" ${n < 1 ? 'disabled' : ''}>Simple (alcano)</button>
            <button class="btn btn-sm ${family === 'alqueno' ? 'btn-primary' : 'btn-ghost'}" data-fam="alqueno" ${n < 2 ? 'disabled' : ''}>Doble (alqueno)</button>
            <button class="btn btn-sm ${family === 'alquino' ? 'btn-primary' : 'btn-ghost'}" data-fam="alquino" ${n < 2 ? 'disabled' : ''}>Triple (alquino)</button>
          </div>
          <div style="text-align:center;margin-top:1.2rem;padding:1rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
            ${data ? `
              <div style="font-family:var(--font-code);font-size:1.6rem;font-weight:900;color:${C}">${data.formula}</div>
              <div style="font-size:.9rem;color:var(--text-primary);margin-top:.3rem;text-transform:capitalize">${data.name}</div>
              <div style="font-size:.75rem;color:var(--text-muted);margin-top:.2rem">${_familyLabel(data.family)}</div>
            ` : `<div style="color:var(--red);font-size:.85rem">Esta combinación no es posible: un enlace doble o triple necesita al menos 2 carbonos.</div>`}
          </div>
          <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">Los hidrógenos se agregan automáticamente según la fórmula real — nunca se calculan a mano.</p>
        </div>`;
      document.getElementById('cm-n').addEventListener('input', e => { n = parseInt(e.target.value, 10); if (n < 2 && family !== 'alcano') family = 'alcano'; draw(); markSimDone('sim-g11u3-01', 100); });
      host.querySelectorAll('[data-fam]').forEach(b => b.addEventListener('click', () => { if (!b.disabled) { family = b.getAttribute('data-fam'); draw(); markSimDone('sim-g11u3-01', 100); } }));
      discoverAtlas(family);
      _bindBackSim();
    }
    draw();
  }

  /* Simulador 2 — Laboratorio de Enlaces (misma cadena, cambia el enlace) */
  function simEnlaces(host) {
    let n = 4, family = 'alcano';
    function draw() {
      const M = chem();
      const before = M ? M.organicFormula(n, 'alcano') : null;
      const current = M ? M.organicFormula(n, family) : null;
      host.innerHTML = `${_simHeader('Laboratorio de Enlaces')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <p style="font-size:.85rem;color:var(--text-secondary)">Cadena fija de <strong>${n} carbonos</strong>. Cambiá el tipo de enlace y mirá qué pasa con el nombre y la fórmula.</p>
          <div style="display:flex;gap:.4rem;margin-top:.6rem;flex-wrap:wrap">
            <button class="btn btn-sm ${family === 'alcano' ? 'btn-primary' : 'btn-ghost'}" data-fam="alcano">— Simple</button>
            <button class="btn btn-sm ${family === 'alqueno' ? 'btn-primary' : 'btn-ghost'}" data-fam="alqueno">= Doble</button>
            <button class="btn btn-sm ${family === 'alquino' ? 'btn-primary' : 'btn-ghost'}" data-fam="alquino">≡ Triple</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:1.2rem">
            <div style="text-align:center;padding:.8rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
              <div style="font-size:.68rem;color:var(--text-muted)">Fórmula</div>
              <div style="font-family:var(--font-code);font-size:1.2rem;font-weight:900;color:${C}">${current ? current.formula : '—'}</div>
            </div>
            <div style="text-align:center;padding:.8rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
              <div style="font-size:.68rem;color:var(--text-muted)">Nombre</div>
              <div style="font-size:1rem;font-weight:700;color:var(--text-primary);text-transform:capitalize">${current ? current.name : '—'}</div>
            </div>
          </div>
          <p style="font-size:.78rem;color:var(--text-muted);margin-top:.7rem">Comparado con el alcano de ${n} carbonos (${before ? before.formula : '—'}), este compuesto tiene ${before && current ? (before.h - current.h) : 0} hidrógenos menos.</p>
        </div>`;
      host.querySelectorAll('[data-fam]').forEach(b => b.addEventListener('click', () => { family = b.getAttribute('data-fam'); draw(); markSimDone('sim-g11u3-02', 100); }));
      markSimDone('sim-g11u3-02', 100);
      discoverAtlas(family);
      _bindBackSim();
    }
    draw();
  }

  /* Simulador 3 — Detector Orgánico (dado una fórmula, identificar) */
  const DETECTOR_CASOS = [
    { c: 5, family: 'alcano' }, { c: 4, family: 'alqueno' }, { c: 6, family: 'alquino' },
    { c: 7, family: 'alcano' }, { c: 3, family: 'alqueno' }, { c: 5, family: 'alquino' }
  ];
  function simDetector(host) {
    let idx = 0;
    function draw() {
      const M = chem();
      const caso = DETECTOR_CASOS[idx];
      const data = M.organicFormula(caso.c, caso.family);
      host.innerHTML = `${_simHeader('Detector Orgánico')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
          <p style="font-size:.8rem;color:var(--text-muted)">Muestra ${idx + 1} de ${DETECTOR_CASOS.length}</p>
          <div style="font-family:var(--font-code);font-size:1.8rem;font-weight:900;color:${C};margin:.5rem 0">${data.formula}</div>
          <p style="font-size:.85rem;color:var(--text-secondary)">Identificá: familia, nombre y número de carbonos.</p>
          <div id="det-answer" style="margin-top:1rem"></div>
          <button class="btn btn-primary btn-sm" id="det-reveal">Revelar identificación</button>
          <button class="btn btn-ghost btn-sm" id="det-next" style="margin-top:.5rem;display:none">Siguiente muestra →</button>
        </div>`;
      document.getElementById('det-reveal').addEventListener('click', () => {
        document.getElementById('det-answer').innerHTML = `
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.8rem;text-align:left;font-size:.85rem;color:var(--text-secondary)">
            <strong style="color:${C};text-transform:capitalize">${data.name}</strong> — ${_familyLabel(data.family)} — ${data.c} carbonos.
          </div>`;
        document.getElementById('det-reveal').style.display = 'none';
        document.getElementById('det-next').style.display = 'inline-block';
        markSimDone('sim-g11u3-03', 100);
        discoverAtlas(data.family);
      });
      document.getElementById('det-next').addEventListener('click', () => { idx = (idx + 1) % DETECTOR_CASOS.length; draw(); });
      _bindBackSim();
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Misión Carbono"
  ============================================================ */
  const CASOS_JUEGO = [
    { c: 3, family: 'alcano' }, { c: 4, family: 'alqueno' }, { c: 5, family: 'alquino' },
    { c: 6, family: 'alcano' }, { c: 2, family: 'alqueno' }, { c: 7, family: 'alcano' },
    { c: 4, family: 'alquino' }, { c: 8, family: 'alcano' }, { c: 5, family: 'alqueno' },
    { c: 3, family: 'alquino' }
  ];
  function renderJuego(unit, uData) {
    const score = (uData && uData.gameScore) || 0;
    return `
      <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
        <div style="font-size:2.4rem">🧬</div>
        <h3 style="margin:.3rem 0;color:${C}">Misión Carbono</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Te llega una fórmula. Identificá la familia correcta antes de que expire el tiempo.</p>
        ${score > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor puntuación: ${score}%</p>` : ''}
        <button class="btn btn-primary" id="g11-game-start">▶ Comenzar ronda</button>
      </div>`;
  }
  function bindJuego(unit, uData) {
    const btn = document.getElementById('g11-game-start');
    if (btn) btn.addEventListener('click', () => playRonda());
  }
  function playRonda() {
    const host = document.getElementById('tab-content');
    if (!host) return;
    const orden = CASOS_JUEGO.slice().sort(() => Math.random() - 0.5);
    let i = 0, correctas = 0;
    function draw() {
      if (i >= orden.length) {
        const pct = Math.round((correctas / orden.length) * 100);
        const uData = loadUnitData();
        const prevBest = uData.gameScore || 0;
        const best = Math.max(prevBest, pct);
        // FIX-XP-02: awardXP('game-won'/'game-played') se otorgaba en CADA
        // ronda terminada, sin límite. Ahora ese XP de participación se
        // otorga UNA sola vez por unidad (la primera ronda jugada); la
        // mejora de puntaje sigue premiándose al superar la marca anterior.
        const esPrimeraRonda = !uData.gameXpAwarded;
        patchUnit({ gameScore: best, gameXpAwarded: true });
        if (esPrimeraRonda) awardXP(pct >= 60 ? 'game-won' : 'game-played');
        if (pct > prevBest) awardXP('game-highscore');
        host.innerHTML = `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
            <div style="font-size:2.4rem">${pct >= 70 ? '🏆' : '🧬'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${orden.length} correctas (${pct}%)</p>
            <button class="btn btn-primary btn-sm" id="g11-game-again">↻ Otra ronda</button>
          </div>`;
        document.getElementById('g11-game-again').addEventListener('click', () => playRonda());
        return;
      }
      const M = chem();
      const caso = orden[i];
      const data = M.organicFormula(caso.c, caso.family);
      const opciones = ['alcano', 'alqueno', 'alquino'].sort(() => Math.random() - 0.5);
      let tiempo = 12;
      host.innerHTML = `
        <div style="max-width:520px;margin:0 auto">
          <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem">
            <span>Caso ${i + 1} de ${orden.length}</span><span id="g11-game-timer">⏱ ${tiempo}s</span>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
            <div style="font-family:var(--font-code);font-size:1.8rem;font-weight:900;color:${C}">${data.formula}</div>
            <p style="font-size:.8rem;color:var(--text-muted)">¿A qué familia pertenece?</p>
            <div style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:.6rem">
              ${opciones.map(f => `<button class="btn btn-ghost btn-sm" data-f="${f}" style="text-transform:capitalize">${f}</button>`).join('')}
            </div>
            <div id="game-fb" style="margin-top:.8rem"></div>
          </div>
        </div>`;
      let answered = false;
      const timerId = setInterval(() => {
        tiempo--;
        const el = document.getElementById('g11-game-timer');
        if (el) el.textContent = `⏱ ${tiempo}s`;
        if (tiempo <= 0 && !answered) { answered = true; clearInterval(timerId); responder(null); }
      }, 1000);
      function responder(said) {
        clearInterval(timerId);
        const ok = said === data.family;
        if (ok) correctas++;
        const fb = document.getElementById('game-fb');
        if (fb) fb.innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.84rem">${ok ? '✓ ¡Correcto!' : '✗ '}Era ${_familyLabel(data.family).toLowerCase()}: <strong style="text-transform:capitalize">${data.name}</strong>.</p>`;
        setTimeout(() => { i++; draw(); }, 1300);
      }
      host.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { if (!answered) { answered = true; responder(b.getAttribute('data-f')); } }));
    }
    draw();
  }

  /* ============================================================
     4) EXAMEN — 40 preguntas, 20 por intento, balanceado.
     Mezcla de opciones incorporada desde el diseño inicial.
  ============================================================ */
  function getBank() {
    if (Array.isArray(window.PREGUNTAS_G11_U03)) return window.PREGUNTAS_G11_U03.slice();
    return [];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const MIN_POR_CATEGORIA = { 'estructura-formula': 4, 'nombre': 4, 'clasificacion': 3, 'conteo-carbonos': 3, 'errores-frecuentes': 3 };
  const EXAM_CFG = { perExam: 20, time: 30, pass: 70 };
  function buildBalancedExam() {
    const bank = getBank();
    const byCat = {};
    bank.forEach(q => { (byCat[q.categoria] = byCat[q.categoria] || []).push(q); });
    let selected = [];
    Object.keys(MIN_POR_CATEGORIA).forEach(cat => {
      const pool = byCat[cat] || [];
      selected = selected.concat(shuffle(pool).slice(0, MIN_POR_CATEGORIA[cat]));
    });
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = bank.filter(q => !selectedIds.has(q.id));
    const extra = shuffle(remaining).slice(0, Math.max(0, EXAM_CFG.perExam - selected.length));
    return shuffle(selected.concat(extra));
  }
  function present(q) { return (typeof PNEBank !== 'undefined') ? PNEBank.present(UNIT_ID, q) : q; }
  function _shuffleOptions(q) {
    const order = q.opciones.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const clone = Object.assign({}, q);
    clone.opciones = order.map(i => q.opciones[i]);
    clone.correcta = order.indexOf(q.correcta);
    if (Array.isArray(q.explicacion_incorrectas)) clone.explicacion_incorrectas = order.map(i => q.explicacion_incorrectas[i]);
    return clone;
  }
  let exam = null;
  function renderExamen(unit, uData) {
    const best = (uData && uData.examBest) || 0;
    return `
      <div id="g11u3-exam-root" style="max-width:600px;margin:0 auto">
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.2rem">📝</div>
          <h3 style="margin:.3rem 0;color:${C}">Examen — Química Orgánica I</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">${EXAM_CFG.perExam} preguntas de un banco de 40 · ${EXAM_CFG.time} minutos · aprobación ${EXAM_CFG.pass}%</p>
          ${best > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor resultado: ${best}%</p>` : ''}
          <button class="btn btn-primary" id="g11u3-exam-start">▶ Comenzar examen</button>
        </div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const btn = document.getElementById('g11u3-exam-start');
    if (btn) btn.addEventListener('click', () => startExam());
  }
  function startExam() {
    const qs = buildBalancedExam().map(q => _shuffleOptions(present(q)));
    exam = { qs, i: 0, answers: [], remaining: EXAM_CFG.time * 60, timerId: null };
    exam.timerId = setInterval(tick, 1000);
    drawQuestion();
  }
  function tick() {
    if (!exam) return;
    exam.remaining--;
    const el = document.getElementById('g11u3-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 60) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) finishExam();
  }
  function drawQuestion() {
    const root = document.getElementById('g11u3-exam-root');
    if (!root || !exam) return;
    const q = exam.qs[exam.i];
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');
    root.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i + 1} / ${exam.qs.length}</span>
        <span id="g11u3-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="g11u3-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
          ${q.opciones.map((op, k) => `
            <button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
              <strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
            </button>`).join('')}
        </div>
        <div id="g11u3-exam-fb" style="margin-top:1rem"></div>
      </div>`;
    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));
  }
  function answerQuestion(choice) {
    const q = exam.qs[exam.i];
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, choice, ok });
    const opts = document.getElementById('g11u3-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });
    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('g11u3-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="g11u3-exam-next" style="margin-top:.8rem">${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar examen'}</button>`;
    document.getElementById('g11u3-exam-next').addEventListener('click', () => {
      if (exam.i < exam.qs.length - 1) { exam.i++; drawQuestion(); }
      else finishExam();
    });
  }
  function finishExam() {
    if (!exam) return;
    clearInterval(exam.timerId);
    const correct = exam.answers.filter(a => a.ok).length;
    const total = exam.qs.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= EXAM_CFG.pass;
    const uData = loadUnitData();
    const prevBest = uData.examBest || 0;
    const attempts = (uData.examAttempts || 0) + 1;
    // FIX-XP-03: awardXP('exam-done') se otorgaba en CADA intento aprobado.
    const yaOtorgadoAntes = !!uData.examXpAwarded;
    patchUnit({
      examBest: Math.max(prevBest, score),
      examAttempts: attempts,
      examXpAwarded: uData.examXpAwarded || passed
    });
    if (passed && !yaOtorgadoAntes) awardXP('exam-done');
    const review = exam.qs.map((q, i) => {
      const a = exam.answers[i];
      const got = a ? a.ok : false;
      return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem">
        <span>${got ? '✅' : '❌'}</span><span style="flex:1;color:var(--text-secondary)">${i + 1}. ${q.pregunta}</span></div>`;
    }).join('');
    const root = document.getElementById('g11u3-exam-root');
    if (root) {
      root.innerHTML = `
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.4rem">${passed ? '🎉' : '📚'}</div>
          <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${passed ? 'var(--green)' : 'var(--red)'}">${score}%</div>
          <p style="color:var(--text-secondary);font-size:.86rem">${correct} de ${total} correctas · aprobación ${EXAM_CFG.pass}%</p>
          <div style="text-align:left;max-height:280px;overflow-y:auto;margin:1rem 0;background:var(--bg-deep);border-radius:var(--radius-md)">${review}</div>
          <button class="btn btn-primary btn-sm" id="g11u3-exam-retry">↻ Intentar de nuevo</button>
        </div>`;
      document.getElementById('g11u3-exam-retry').addEventListener('click', () => startExam());
    }
    exam = null;
    if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
  }

  /* ============================================================
     5) MISIÓN DE CIERRE — retoma la Unidad II, conecta hacia la IV
  ============================================================ */
  function renderMision(unit, uData) {
    const done = !!(uData && uData.missionDone);
    const M = chem();
    const candidatos = [
      { formula: M.organicFormula(3, 'alquino').formula, real: M.organicFormula(3, 'alquino') },
      { formula: M.organicFormula(6, 'alcano').formula, real: M.organicFormula(6, 'alcano') },
      { formula: M.organicFormula(4, 'alqueno').formula, real: M.organicFormula(4, 'alqueno') }
    ];
    const recordatorio = `
      <details style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:1.1rem">
        <summary style="cursor:pointer;font-size:.85rem;font-weight:700;color:${C}">📋 Recordatorio rápido — antes de escribir</summary>
        <ul style="margin:.6rem 0 0 1.1rem;padding:0;font-size:.82rem;color:var(--text-secondary);line-height:1.7">
          <li><strong>Alcano</strong> = CnH(2n+2), solo enlaces simples.</li>
          <li><strong>Alqueno</strong> = CnH(2n), un enlace doble.</li>
          <li><strong>Alquino</strong> = CnH(2n-2), un enlace triple.</li>
          <li>El prefijo (met-/et-/prop-/but-/pent-/hex-...) dice los carbonos; la terminación (-ano/-eno/-ino) dice el enlace.</li>
        </ul>
      </details>`;
    return `
      <div style="max-width:560px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
        <div style="text-align:center;margin-bottom:1rem">
          <div style="font-size:2.2rem">🧾</div>
          <h3 style="margin:.3rem 0;color:${C}">Identificando el contaminante</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">El laboratorio aisló 3 moléculas candidatas de la muestra del derrame investigado en las unidades anteriores: <strong>${candidatos[0].formula}</strong>, <strong>${candidatos[1].formula}</strong> y <strong>${candidatos[2].formula}</strong>.</p>
        </div>
        ${done ? `<p style="text-align:center;color:var(--green);font-size:.85rem;margin-bottom:1rem">✓ Ya entregaste este informe. Podés actualizarlo cuando quieras.</p>` : ''}
        ${recordatorio}
        <label style="font-size:.8rem;color:var(--text-muted)">Clasificá e identificá el nombre de cada una de las 3 moléculas.</label>
        <textarea id="g11u3-mision-1" rows="3" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">¿Cuál de las 3 elegís como la más probable causante del derrame, y por qué (pensá en reactividad)?</label>
        <textarea id="g11u3-mision-2" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">Ya identificaste QUÉ tipo de hidrocarburo es. Pero en el agua real también hay compuestos con oxígeno, como alcoholes o ácidos. ¿Qué necesitarías aprender para reconocer esos grupos también?</label>
        <textarea id="g11u3-mision-3" rows="2" style="width:100%;margin:.3rem 0 1rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <button class="btn btn-primary" id="g11u3-mision-send" style="width:100%">${done ? 'Actualizar informe' : 'Entregar informe'}</button>
        <div id="g11u3-mision-fb" style="margin-top:.8rem"></div>
      </div>`;
  }
  function bindMision(unit, uData) {
    const btn = document.getElementById('g11u3-mision-send');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const t1 = document.getElementById('g11u3-mision-1').value.trim();
      const t2 = document.getElementById('g11u3-mision-2').value.trim();
      const t3 = document.getElementById('g11u3-mision-3').value.trim();
      if ((t1 + t2 + t3).length < 20) {
        document.getElementById('g11u3-mision-fb').innerHTML = `<p style="color:var(--gold);font-size:.84rem">Escribí un poco más en tus respuestas antes de entregar.</p>`;
        btn.disabled = false;
        return;
      }
      const fresh = loadUnitData();
      const alreadyAwarded = !!fresh.missionDone;
      const texto = `1) ${t1}\n2) ${t2}\n3) ${t3}`;
      patchUnit({ missionDone: true, missionText: texto });
      if (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId && MQCProfiles.saveReflection) {
        const id = MQCProfiles.activeId();
        if (id) MQCProfiles.saveReflection(id, 'g11-u03-mision', texto);
      }
      if (!alreadyAwarded) {
        awardXP('grade11-mission-done');
        if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
        document.getElementById('g11u3-mision-fb').innerHTML = `<p style="color:var(--green);font-size:.85rem">🎉 ¡Informe entregado! XP otorgado.</p>`;
      } else {
        document.getElementById('g11u3-mision-fb').innerHTML = `<p style="color:var(--text-secondary);font-size:.85rem">Informe actualizado. Ya habías entregado esta misión antes, así que no se otorga XP adicional.</p>`;
      }
      btn.textContent = 'Actualizar informe';
      btn.disabled = false;
    });
  }

  /* ============================================================
     REGISTRO DE PLUGINS
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
  console.log('[g11-u03] Plugins de la Unidad III (Química 11°) registrados: teoria, simuladores, juego, examen, mision.');

  if (typeof QI !== 'undefined' && QI.registerUnit) {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'hidrocarburo': 'Compuesto orgánico formado únicamente por carbono e hidrógeno.',
        'alcano': 'Hidrocarburo con únicamente enlaces simples entre sus carbonos (CnH2n+2).',
        'alqueno': 'Hidrocarburo con un enlace doble entre dos de sus carbonos (CnH2n).',
        'alquino': 'Hidrocarburo con un enlace triple entre dos de sus carbonos (CnH2n-2).',
        'valencia del carbono': 'El carbono siempre forma 4 enlaces en total, repartidos entre simples, dobles o triples.'
      },
      xref: {
        'teoria:topic-2': [{ tab: 'simuladores', label: 'Simulador: Constructor Molecular' }],
        'teoria:topic-3': [{ tab: 'simuladores', label: 'Simulador: Laboratorio de Enlaces' }],
        'teoria:topic-6': [{ tab: 'simuladores', label: 'Simulador: Detector Orgánico' },
                           { tab: 'juego', label: 'Juega: Misión Carbono' },
                           { tab: 'mision', label: 'Identificando el contaminante' }]
      },
      images: {},
      videos: [],
      pne: (typeof window !== 'undefined' && window.BANCO_PNE_G11_U03) ? window.BANCO_PNE_G11_U03 : null
    });
  }

})();
