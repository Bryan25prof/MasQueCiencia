/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/grade11/g11-u02.js  |  UNIDAD II — Cálculo de Concentraciones
   ================================================================
   IMP-11-U02: segunda unidad real de Química 11°, construida sobre el
   mismo patrón oficial ya validado en g11-u01.js (auditado antes de
   escribir este archivo, tal como exige el ticket). Namespace paralelo
   de 11.º (data.grade11, GRADE11_UNIDADES_DATA, Storage.*Grade11*) —
   nunca toca data.units ni la Unidad VII de décimo (Soluciones).

   Reutiliza MQCChem (js/shared/chem.js) para TODOS los cálculos de
   concentración — molarity, percentMassMass, percentMassVolume,
   percentVolumeVolume, ppm, molarMass — ninguna fórmula se duplicó
   dentro de esta unidad. percentVolumeVolume y ppm no existían en
   MQCChem antes de este sprint; se agregaron ahí mismo (ampliación
   aditiva), no acá.

   Continuidad narrativa (APO + IMP-11-U01 §11): retoma la 5ª pregunta
   de la misión de la Unidad I ("¿qué información faltaría para
   determinar la concentración?") y la responde con datos cuantitativos
   reales de la misma investigación del Río Pacuare.

   HOTFIX-08 incorporado desde el inicio (no como parche posterior):
   el examen mezcla el orden de las opciones de cada pregunta una
   única vez al construir el intento — ver _shuffleOptions().
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'g11-u02';
  const C = '#7B2FFF'; /* mismo color ya asignado en unidades-grade11.js */

  /* ── Accesos defensivos (mismo patrón que g11-u01.js) ─────────── */
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
  /* Acceso defensivo a MQCChem — nunca duplicar sus fórmulas acá */
  function chem() { return (typeof MQCChem !== 'undefined') ? MQCChem : null; }

  /* ============================================================
     1) TEORÍA — 7 temas
  ============================================================ */
  const TEORIA = [
    { icon: '🧪', titulo: '¿Qué significa concentración?', html: `
      <p>Saber que "hay sal disuelta en agua" es un dato <strong>cualitativo</strong> — describe una cualidad, no una cantidad. Saber que "hay 6 gramos de sal por cada 100 gramos de disolución" es un dato <strong>cuantitativo</strong>: eso es una concentración.</p>
      ${box('Tres palabras clave', '<strong>Soluto</strong>: lo que se disuelve (normalmente en menor cantidad). <strong>Disolvente</strong>: lo que disuelve (normalmente en mayor cantidad). <strong>Disolución</strong>: la mezcla completa de ambos — soluto + disolvente juntos.', C)}
      <p>Toda fórmula de concentración que vas a ver en esta unidad es, en el fondo, una sola idea: <em>cuánto soluto hay, comparado con cuánto hay en total</em>.</p>` },

    { icon: '⚖️', titulo: 'Porcentaje masa/masa (% m/m)', html: `
      <p>Se usa cuando el soluto y la disolución se miden ambos en masa (gramos). Fórmula: <strong>% m/m = (masa soluto ÷ masa disolución) × 100</strong>.</p>
      ${box('Ejemplo resuelto', 'Una barra de chocolate de 100 g tiene 15 g de azúcar. % m/m = (15 ÷ 100) × 100 = 15%. Interpretación: 15 de cada 100 gramos del chocolate son azúcar.', C)}
      ${box('Error frecuente', 'Olvidar multiplicar por 100 al final — eso da un número correcto pero en la escala equivocada (una fracción, no un porcentaje).', 'var(--gold)')}` },

    { icon: '💉', titulo: 'Porcentaje masa/volumen (% m/v)', html: `
      <p>Se usa cuando el soluto se mide en masa (gramos) pero la disolución se mide en volumen (mL). Fórmula: <strong>% m/v = (masa soluto en g ÷ volumen disolución en mL) × 100</strong>.</p>
      ${box('Ejemplo resuelto', 'El suero fisiológico real tiene 9 g de sal por cada 300 mL. % m/v = (9 ÷ 300) × 100 = 3%. Así se etiquetan la mayoría de medicamentos líquidos y sueros.', C)}
      ${box('Error frecuente', 'Confundir masa de disolución (g) con volumen de disolución (mL) — son magnitudes distintas, no se pueden intercambiar sin conocer la densidad.', 'var(--gold)')}` },

    { icon: '🧴', titulo: 'Porcentaje volumen/volumen (% v/v)', html: `
      <p>Se usa cuando tanto el soluto como la disolución se miden en volumen (mL) — típico de mezclas de líquidos. Fórmula: <strong>% v/v = (volumen soluto ÷ volumen disolución) × 100</strong>.</p>
      ${box('Ejemplo resuelto', 'Un desinfectante casero con 40 mL de alcohol en 200 mL de producto: % v/v = (40 ÷ 200) × 100 = 20%. (Los desinfectantes reales suelen llevar 60-70% v/v — este es un valor simplificado con fines de práctica.)', C)}
      ${box('Aplicación cotidiana', 'Las etiquetas de bebidas con alcohol usan % v/v — por eso una cerveza dice "4.5%" y no otra unidad.', C)}` },

    { icon: '🔬', titulo: 'Molaridad', html: `
      <p>La molaridad relaciona la CANTIDAD de sustancia (en moles) con el VOLUMEN de la disolución (en litros). Fórmula: <strong>M = mol soluto ÷ L disolución</strong>.</p>
      ${box('Por qué se usa en química', 'A diferencia de los porcentajes (que comparan masas o volúmenes), la molaridad cuenta PARTÍCULAS reales de sustancia — es la unidad que realmente le importa a una reacción química, porque las reacciones ocurren entre moléculas, no entre gramos.', C)}
      ${box('Ejemplo resuelto', 'Si disolvés 2 mol de NaOH hasta completar 4 L de disolución: M = 2 ÷ 4 = 0.5 mol/L. Si primero tenés gramos, primero hay que convertirlos a moles usando la masa molar (gramos ÷ masa molar = moles).', C)}` },

    { icon: '🩸', titulo: 'Partes por millón (ppm)', html: `
      <p>Para concentraciones muy pequeñas (contaminantes, trazas de metales), usar porcentaje daría números diminutos y poco prácticos (0.0003%). Por eso se usa <strong>ppm</strong>: partes por millón.</p>
      ${box('Fórmula (agua, aproximación estándar)', 'Para disoluciones acuosas diluidas, 1 litro de agua pesa aproximadamente 1 kg — por eso: <strong>ppm ≈ mg de soluto ÷ L de disolución</strong>.', C)}
      ${box('Ejemplo resuelto', 'Una muestra de río con 5 mg de un contaminante en 2 L de agua: ppm = 5 ÷ 2 = 2.5 ppm. Esta es exactamente la unidad que usan los laboratorios reales para reportar calidad del agua.', C)}
      ${box('Límites de esta aproximación', 'Esta fórmula simplificada es válida para disoluciones acuosas MUY diluidas. No es válida, sin ajustes, para líquidos de densidad muy distinta al agua.', 'var(--gold)')}` },

    { icon: '📊', titulo: 'Del resultado a la decisión', html: `
      <p>Calcular un número no es el final — es el principio. Un buen análisis químico interpreta el resultado: ¿es alto o bajo? ¿Comparado con qué? ¿Qué decisión sugiere?</p>
      ${box('Cómo comparar', 'Nunca compares dos concentraciones en unidades distintas directamente (ej. un % m/v contra un valor en mol/L) — primero convertí ambas a la misma unidad.', C)}
      ${box('Conciencia ambiental con datos, no con opiniones', 'Decir "esta agua parece contaminada" es una opinión. Decir "esta muestra tiene 7.5 ppm, y el límite de referencia es 5 ppm" es una conclusión sustentada en datos — eso es lo que vas a practicar en tu misión de cierre.', C)}` }
  ];

  const TOPIC_HINTS = {
    0: ['Soluto = lo que se disuelve. Disolvente = lo que disuelve. Disolución = los dos juntos.'],
    1: ['% m/m: los dos datos están en la MISMA unidad (gramos arriba y abajo).'],
    2: ['% m/v: arriba van gramos, abajo van mililitros — no se mezclan las unidades sin fórmula.'],
    3: ['% v/v: los dos datos están en mililitros, igual que % m/m usa gramos arriba y abajo.'],
    4: ['Molaridad SIEMPRE necesita moles y litros — si tenés gramos, primero convertí a moles.'],
    5: ['ppm es como % pero mucho más chico — para cuando el porcentaje daría un número casi cero.'],
    6: ['Antes de comparar dos números, asegurate de que estén en la MISMA unidad de concentración.']
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
        markRead(tid);
        awardXP('topic-read');
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
     2) SIMULADORES — reutilizan MQCChem, nunca recalculan a mano
  ============================================================ */
  function renderSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];
    const SIMS = [
      { id: 'sim-g11u2-01', icon: '⚖️', name: 'Constructor de Concentraciones', desc: 'Ajustá soluto y disolución y mirá en vivo cómo cambian % m/m, % m/v y % v/v.' },
      { id: 'sim-g11u2-02', icon: '🔬', name: 'Laboratorio de Molaridad', desc: 'Elegí una sustancia, calculá sus moles y ajustá el volumen para obtener la molaridad.' },
      { id: 'sim-g11u2-03', icon: '🩸', name: 'Analista de Agua en ppm', desc: 'Analizá una muestra ficticia de agua y decidí si su concentración es motivo de atención.' }
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
    if (simId === 'sim-g11u2-01') simConstructor(host);
    else if (simId === 'sim-g11u2-02') simMolaridad(host);
    else if (simId === 'sim-g11u2-03') simPPM(host);
  }
  function _simHeader(title) {
    return `<button class="btn btn-ghost btn-sm" data-back-sim style="margin-bottom:.8rem">← Simuladores</button>
      <h3 style="color:${C};margin:0 0 .8rem">${title}</h3>`;
  }
  function _bindBackSim(unit, uData) {
    const back = document.querySelector('[data-back-sim]');
    if (back) back.addEventListener('click', () => {
      const host = document.getElementById('tab-content');
      const fresh = loadUnitData();
      host.innerHTML = renderSimuladores(unit, fresh);
      bindSimuladores(unit, fresh);
    });
  }

  /* Simulador 1 — Constructor de Concentraciones (% m/m, % m/v, % v/v en vivo) */
  function simConstructor(host) {
    let soluto = 20, disolucion = 200, modo = 'mv';
    function calc() {
      const M = chem();
      if (!M) return null;
      if (modo === 'mm') return M.percentMassMass(soluto, disolucion);
      if (modo === 'mv') return M.percentMassVolume(soluto, disolucion);
      return M.percentVolumeVolume(soluto, disolucion);
    }
    function draw() {
      const pct = calc();
      const unidadTxt = modo === 'mm' ? 'g soluto / g disolución' : modo === 'mv' ? 'g soluto / mL disolución' : 'mL soluto / mL disolución';
      host.innerHTML = `${_simHeader('Constructor de Concentraciones')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <div style="display:flex;gap:.4rem;margin-bottom:1rem;flex-wrap:wrap">
            <button class="btn btn-sm ${modo === 'mm' ? 'btn-primary' : 'btn-ghost'}" data-modo="mm">% m/m</button>
            <button class="btn btn-sm ${modo === 'mv' ? 'btn-primary' : 'btn-ghost'}" data-modo="mv">% m/v</button>
            <button class="btn btn-sm ${modo === 'vv' ? 'btn-primary' : 'btn-ghost'}" data-modo="vv">% v/v</button>
          </div>
          <label style="font-size:.82rem;color:var(--text-muted)">Cantidad de soluto (${modo === 'vv' ? 'mL' : 'g'}): <strong id="c-soluto-val">${soluto}</strong></label>
          <input type="range" id="c-soluto" min="1" max="100" value="${soluto}" style="width:100%;accent-color:${C}">
          <label style="font-size:.82rem;color:var(--text-muted);margin-top:.6rem;display:block">Cantidad total de disolución (${modo === 'mm' ? 'g' : 'mL'}): <strong id="c-disolucion-val">${disolucion}</strong></label>
          <input type="range" id="c-disolucion" min="50" max="1000" step="10" value="${disolucion}" style="width:100%;accent-color:${C}">
          <div style="text-align:center;margin-top:1.2rem;padding:1rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
            <div style="font-size:.72rem;color:var(--text-muted)">${unidadTxt}</div>
            <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">${pct == null ? '—' : pct + '%'}</div>
          </div>
          <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">Subí el soluto: la concentración sube. Subí el total de disolución: la concentración baja (con el soluto fijo).</p>
        </div>`;
      document.getElementById('c-soluto').addEventListener('input', e => { soluto = parseFloat(e.target.value); draw(); markSimDone('sim-g11u2-01', 100); });
      document.getElementById('c-disolucion').addEventListener('input', e => { disolucion = parseFloat(e.target.value); draw(); markSimDone('sim-g11u2-01', 100); });
      host.querySelectorAll('[data-modo]').forEach(b => b.addEventListener('click', () => { modo = b.getAttribute('data-modo'); draw(); }));
      _bindBackSim();
    }
    draw();
  }

  /* Simulador 2 — Laboratorio de Molaridad (usa MQCChem.molarMass + molarity) */
  function simMolaridad(host) {
    const M = chem();
    const solutos = (M && M.SOLUTES && M.SOLUTES.length) ? M.SOLUTES : [{ f: 'NaCl', name: 'cloruro de sodio' }];
    let selIdx = 0, gramos = 30, volumenL = 1;
    function draw() {
      const sol = solutos[selIdx];
      const mm = M ? M.molarMass(sol.f) : null;
      const moles = (M && mm) ? M.molesFromMass ? M.molesFromMass(gramos, mm) : Math.round((gramos / mm) * 1000) / 1000 : null;
      const molaridad = (M && moles != null) ? M.molarity(moles, volumenL) : null;
      host.innerHTML = `${_simHeader('Laboratorio de Molaridad')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <label style="font-size:.82rem;color:var(--text-muted)">Sustancia</label>
          <select id="m-sol" style="width:100%;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;margin:.3rem 0 .8rem">
            ${solutos.map((s, i) => `<option value="${i}" ${i === selIdx ? 'selected' : ''}>${s.name} (${s.f})</option>`).join('')}
          </select>
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.6rem">Masa molar de ${sol.f}: <strong style="color:${C}">${mm != null ? mm + ' g/mol' : '—'}</strong></div>
          <label style="font-size:.82rem;color:var(--text-muted)">Masa de soluto (g): <strong id="m-g-val">${gramos}</strong></label>
          <input type="range" id="m-g" min="1" max="200" value="${gramos}" style="width:100%;accent-color:${C}">
          <label style="font-size:.82rem;color:var(--text-muted);margin-top:.6rem;display:block">Volumen final de la disolución (L): <strong id="m-v-val">${volumenL}</strong></label>
          <input type="range" id="m-v" min="0.1" max="5" step="0.1" value="${volumenL}" style="width:100%;accent-color:${C}">
          <div style="display:flex;gap:.6rem;margin-top:1.2rem">
            <div style="flex:1;text-align:center;padding:.8rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
              <div style="font-size:.68rem;color:var(--text-muted)">Moles calculados</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--text-primary)">${moles != null ? moles : '—'}</div>
            </div>
            <div style="flex:1;text-align:center;padding:.8rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
              <div style="font-size:.68rem;color:var(--text-muted)">Molaridad</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:${C}">${molaridad != null ? molaridad + ' mol/L' : '—'}</div>
            </div>
          </div>
          <p style="font-size:.75rem;color:var(--text-muted);margin-top:.7rem">Nota: la representación de partículas es didáctica — no implica que toda sustancia tenga color real en disolución.</p>
        </div>`;
      document.getElementById('m-sol').addEventListener('change', e => { selIdx = parseInt(e.target.value, 10); draw(); markSimDone('sim-g11u2-02', 100); });
      document.getElementById('m-g').addEventListener('input', e => { gramos = parseFloat(e.target.value); draw(); markSimDone('sim-g11u2-02', 100); });
      document.getElementById('m-v').addEventListener('input', e => { volumenL = parseFloat(e.target.value); draw(); markSimDone('sim-g11u2-02', 100); });
      _bindBackSim();
    }
    draw();
  }

  /* Simulador 3 — Analista de Agua en ppm (usa MQCChem.ppm) */
  const MUESTRAS_PPM = [
    { nombre: 'Muestra — punto de descarga industrial', mg: 12, L: 2, limite: 5 },
    { nombre: 'Muestra — afluente del Pacuare, zona alta', mg: 1, L: 2, limite: 5 },
    { nombre: 'Muestra — pozo comunitario', mg: 4, L: 2, limite: 5 }
  ];
  function simPPM(host) {
    let idx = 0;
    function draw() {
      const M = chem();
      const m = MUESTRAS_PPM[idx];
      const valor = M ? M.ppm(m.mg, m.L) : null;
      const riesgo = valor != null && valor > m.limite;
      host.innerHTML = `${_simHeader('Analista de Agua en ppm')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <label style="font-size:.82rem;color:var(--text-muted)">Elegí una muestra</label>
          <select id="p-sample" style="width:100%;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;margin:.3rem 0 1rem">
            ${MUESTRAS_PPM.map((s, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${s.nombre}</option>`).join('')}
          </select>
          <div style="font-size:.85rem;color:var(--text-secondary);margin-bottom:.8rem">Datos: <strong>${m.mg} mg</strong> de contaminante en <strong>${m.L} L</strong> de muestra. Límite de referencia de este caso: <strong>${m.limite} ppm</strong>.</div>
          <div style="text-align:center;padding:1rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
            <div style="font-size:.72rem;color:var(--text-muted)">Concentración calculada</div>
            <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${riesgo ? 'var(--red)' : 'var(--green)'}">${valor} ppm</div>
            <div style="font-size:.8rem;color:${riesgo ? 'var(--red)' : 'var(--green)'};margin-top:.3rem">${riesgo ? '⚠️ Por encima del límite de referencia de este caso' : '✓ Por debajo del límite de referencia de este caso'}</div>
          </div>
          <p style="font-size:.75rem;color:var(--text-muted);margin-top:.7rem">Este límite (${m.limite} ppm) es ficticio, propio de este caso pedagógico — no representa un estándar legal oficial.</p>
        </div>`;
      document.getElementById('p-sample').addEventListener('change', e => { idx = parseInt(e.target.value, 10); draw(); markSimDone('sim-g11u2-03', 100); });
      markSimDone('sim-g11u2-03', 100);
      _bindBackSim();
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Código de la Muestra"
  ============================================================ */
  const CASOS_JUEGO = [
    { situacion: 'Etiqueta de suero: 9 g de sal en 300 mL', unidad: 'mv', datos: { a: 9, b: 300 }, tip: 'Masa en g y volumen en mL → % m/v.' },
    { situacion: 'Análisis de agua de pozo: 8 mg de contaminante en 4 L', unidad: 'ppm', datos: { a: 8, b: 4 }, tip: 'Cantidades pequeñas en agua → ppm.' },
    { situacion: 'Preparación de laboratorio: 2 mol de reactivo en 4 L', unidad: 'molar', datos: { a: 2, b: 4 }, tip: 'Moles y litros → molaridad.' },
    { situacion: 'Mezcla de limpieza: 15 mL de vinagre en 300 mL', unidad: 'vv', datos: { a: 15, b: 300 }, tip: 'Los dos datos en volumen → % v/v.' },
    { situacion: 'Producto comercial: 40 g de soluto en 200 g de disolución', unidad: 'mm', datos: { a: 40, b: 200 }, tip: 'Los dos datos en masa → % m/m.' },
    { situacion: 'Muestra industrial: 50 mg de metal en 10 L', unidad: 'ppm', datos: { a: 50, b: 10 }, tip: 'Cantidades pequeñas en agua → ppm.' },
    { situacion: 'Disolución de laboratorio: 1 mol en 2 L', unidad: 'molar', datos: { a: 1, b: 2 }, tip: 'Moles y litros → molaridad.' },
    { situacion: 'Bebida comercial: 80 mL de alcohol en 400 mL', unidad: 'vv', datos: { a: 80, b: 400 }, tip: 'Los dos datos en volumen → % v/v.' }
  ];
  const UNIDAD_LABEL = { mm: '% m/m', mv: '% m/v', vv: '% v/v', molar: 'Molaridad (mol/L)', ppm: 'ppm' };
  function calcularCaso(c) {
    const M = chem(); if (!M) return null;
    if (c.unidad === 'mm') return M.percentMassMass(c.datos.a, c.datos.b);
    if (c.unidad === 'mv') return M.percentMassVolume(c.datos.a, c.datos.b);
    if (c.unidad === 'vv') return M.percentVolumeVolume(c.datos.a, c.datos.b);
    if (c.unidad === 'molar') return M.molarity(c.datos.a, c.datos.b);
    if (c.unidad === 'ppm') return M.ppm(c.datos.a, c.datos.b);
    return null;
  }
  function renderJuego(unit, uData) {
    const score = (uData && uData.gameScore) || 0;
    return `
      <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
        <div style="font-size:2.4rem">🔍</div>
        <h3 style="margin:.3rem 0;color:${C}">Código de la Muestra</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Llegan situaciones reales. Identificá primero QUÉ unidad de concentración corresponde — luego calculá.</p>
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
        patchUnit({ gameScore: best });
        awardXP(pct >= 60 ? 'game-won' : 'game-played');
        if (pct > prevBest) awardXP('game-highscore');
        host.innerHTML = `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
            <div style="font-size:2.4rem">${pct >= 70 ? '🏆' : '🔍'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${orden.length} correctas (${pct}%)</p>
            <button class="btn btn-primary btn-sm" id="g11-game-again">↻ Otra ronda</button>
          </div>`;
        document.getElementById('g11-game-again').addEventListener('click', () => playRonda());
        return;
      }
      const c = orden[i];
      const opciones = Object.keys(UNIDAD_LABEL).sort(() => Math.random() - 0.5);
      host.innerHTML = `
        <div style="max-width:520px;margin:0 auto">
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem;text-align:center">Caso ${i + 1} de ${orden.length}</div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
            <div style="font-size:1.6rem">🧾</div>
            <p style="font-weight:700;margin:.5rem 0">${c.situacion}</p>
            <p style="font-size:.8rem;color:var(--text-muted)">¿Qué unidad de concentración corresponde?</p>
            <div style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:.6rem">
              ${opciones.map(u => `<button class="btn btn-ghost btn-sm" data-u="${u}">${UNIDAD_LABEL[u]}</button>`).join('')}
            </div>
            <div id="game-fb" style="margin-top:.8rem"></div>
          </div>
        </div>`;
      host.querySelectorAll('[data-u]').forEach(b => b.addEventListener('click', () => {
        const said = b.getAttribute('data-u');
        const ok = said === c.unidad;
        if (ok) correctas++;
        const resultado = calcularCaso(c);
        document.getElementById('game-fb').innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.84rem">${ok ? '✓ ' : '✗ '}${c.tip} ${ok ? `El resultado es ${resultado}${c.unidad === 'molar' ? ' mol/L' : c.unidad === 'ppm' ? ' ppm' : '%'}.` : ''}</p>`;
        setTimeout(() => { i++; draw(); }, 1400);
      }));
    }
    draw();
  }

  /* ============================================================
     4) EXAMEN — 40 preguntas, 20 por intento, balanceado.
     HOTFIX-08 incorporado desde el inicio: las opciones se mezclan
     una única vez por pregunta, al construir el intento — nunca en
     cada render — así la selección del estudiante sigue
     correspondiendo a la misma opción.
  ============================================================ */
  function getBank() {
    if (Array.isArray(window.PREGUNTAS_G11_U02)) return window.PREGUNTAS_G11_U02.slice();
    return [];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const MIN_POR_CATEGORIA = { 'conceptos': 4, 'porcentaje-mm': 3, 'porcentaje-mv': 3, 'porcentaje-vv': 3, 'molaridad': 3, 'ppm': 3 };
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
      <div id="g11u2-exam-root" style="max-width:600px;margin:0 auto">
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.2rem">📝</div>
          <h3 style="margin:.3rem 0;color:${C}">Examen — Cálculo de Concentraciones</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">${EXAM_CFG.perExam} preguntas de un banco de 40 · ${EXAM_CFG.time} minutos · aprobación ${EXAM_CFG.pass}%</p>
          ${best > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor resultado: ${best}%</p>` : ''}
          <button class="btn btn-primary" id="g11u2-exam-start">▶ Comenzar examen</button>
        </div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const btn = document.getElementById('g11u2-exam-start');
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
    const el = document.getElementById('g11u2-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 60) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) finishExam();
  }
  function drawQuestion() {
    const root = document.getElementById('g11u2-exam-root');
    if (!root || !exam) return;
    const q = exam.qs[exam.i];
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');
    root.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i + 1} / ${exam.qs.length}</span>
        <span id="g11u2-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="g11u2-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
          ${q.opciones.map((op, k) => `
            <button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
              <strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
            </button>`).join('')}
        </div>
        <div id="g11u2-exam-fb" style="margin-top:1rem"></div>
      </div>`;
    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));
  }
  function answerQuestion(choice) {
    const q = exam.qs[exam.i];
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, choice, ok });
    const opts = document.getElementById('g11u2-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });
    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('g11u2-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="g11u2-exam-next" style="margin-top:.8rem">${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar examen'}</button>`;
    document.getElementById('g11u2-exam-next').addEventListener('click', () => {
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
    patchUnit({ examBest: Math.max(prevBest, score), examAttempts: attempts });
    if (passed) awardXP('exam-done');
    const review = exam.qs.map((q, i) => {
      const a = exam.answers[i];
      const got = a ? a.ok : false;
      return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem">
        <span>${got ? '✅' : '❌'}</span><span style="flex:1;color:var(--text-secondary)">${i + 1}. ${q.pregunta}</span></div>`;
    }).join('');
    const root = document.getElementById('g11u2-exam-root');
    if (root) {
      root.innerHTML = `
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.4rem">${passed ? '🎉' : '📚'}</div>
          <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${passed ? 'var(--green)' : 'var(--red)'}">${score}%</div>
          <p style="color:var(--text-secondary);font-size:.86rem">${correct} de ${total} correctas · aprobación ${EXAM_CFG.pass}%</p>
          <div style="text-align:left;max-height:280px;overflow-y:auto;margin:1rem 0;background:var(--bg-deep);border-radius:var(--radius-md)">${review}</div>
          <button class="btn btn-primary btn-sm" id="g11u2-exam-retry">↻ Intentar de nuevo</button>
        </div>`;
      document.getElementById('g11u2-exam-retry').addEventListener('click', () => startExam());
    }
    exam = null;
    if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
  }

  /* ============================================================
     5) MISIÓN DE CIERRE — "Informe cuantitativo de la muestra"
     Retoma la 5ª pregunta de la misión de la Unidad I y conecta
     hacia la Unidad III (última pregunta de esta misión).
  ============================================================ */
  function renderMision(unit, uData) {
    const done = !!(uData && uData.missionDone);
    const recordatorio = `
      <details style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:1.1rem">
        <summary style="cursor:pointer;font-size:.85rem;font-weight:700;color:${C}">📋 Recordatorio rápido — antes de escribir</summary>
        <ul style="margin:.6rem 0 0 1.1rem;padding:0;font-size:.82rem;color:var(--text-secondary);line-height:1.7">
          <li><strong>% m/m</strong> y <strong>% m/v</strong>: gramos de soluto ÷ (gramos o mL de disolución) × 100.</li>
          <li><strong>% v/v</strong>: mL de soluto ÷ mL de disolución × 100.</li>
          <li><strong>Molaridad</strong>: mol de soluto ÷ litros de disolución.</li>
          <li><strong>ppm</strong> ≈ mg de soluto ÷ L de disolución (agua diluida).</li>
        </ul>
      </details>`;
    return `
      <div style="max-width:560px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
        <div style="text-align:center;margin-bottom:1rem">
          <div style="font-size:2.2rem">🧾</div>
          <h3 style="margin:.3rem 0;color:${C}">Informe cuantitativo de la muestra</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">El laboratorio recibió los datos cuantitativos de la muestra del Río Pacuare: <strong>6 mg</strong> de un contaminante en <strong>2 L</strong> de agua (Muestra 1), y una segunda muestra de un afluente cercano con <strong>15 mg</strong> en <strong>2 L</strong> (Muestra 2). El límite de referencia de este caso es <strong>5 ppm</strong>.</p>
        </div>
        ${done ? `<p style="text-align:center;color:var(--green);font-size:.85rem;margin-bottom:1rem">✓ Ya entregaste este informe. Podés actualizarlo cuando quieras.</p>` : ''}
        ${recordatorio}
        <label style="font-size:.8rem;color:var(--text-muted)">Calculá la concentración en ppm de la Muestra 1 y de la Muestra 2. Mostrá tu procedimiento.</label>
        <textarea id="g11u2-mision-1" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">¿Cuál de las dos muestras requiere mayor atención, y por qué (usá los números)?</label>
        <textarea id="g11u2-mision-2" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">Ya sabemos cuánto contaminante hay. ¿Qué información química adicional necesitarías para identificar QUÉ sustancia es exactamente?</label>
        <textarea id="g11u2-mision-3" rows="2" style="width:100%;margin:.3rem 0 1rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <button class="btn btn-primary" id="g11u2-mision-send" style="width:100%">${done ? 'Actualizar informe' : 'Entregar informe'}</button>
        <div id="g11u2-mision-fb" style="margin-top:.8rem"></div>
      </div>`;
  }
  function bindMision(unit, uData) {
    const btn = document.getElementById('g11u2-mision-send');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const t1 = document.getElementById('g11u2-mision-1').value.trim();
      const t2 = document.getElementById('g11u2-mision-2').value.trim();
      const t3 = document.getElementById('g11u2-mision-3').value.trim();
      if ((t1 + t2 + t3).length < 20) {
        document.getElementById('g11u2-mision-fb').innerHTML = `<p style="color:var(--gold);font-size:.84rem">Escribí un poco más en tus respuestas antes de entregar.</p>`;
        btn.disabled = false;
        return;
      }
      const fresh = loadUnitData();
      const alreadyAwarded = !!fresh.missionDone;
      const texto = `1) ${t1}\n2) ${t2}\n3) ${t3}`;
      patchUnit({ missionDone: true, missionText: texto });
      if (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId && MQCProfiles.saveReflection) {
        const id = MQCProfiles.activeId();
        if (id) MQCProfiles.saveReflection(id, 'g11-u02-mision', texto);
      }
      if (!alreadyAwarded) {
        awardXP('grade11-mission-done');
        if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
        document.getElementById('g11u2-mision-fb').innerHTML = `<p style="color:var(--green);font-size:.85rem">🎉 ¡Informe entregado! XP otorgado.</p>`;
      } else {
        document.getElementById('g11u2-mision-fb').innerHTML = `<p style="color:var(--text-secondary);font-size:.85rem">Informe actualizado. Ya habías entregado esta misión antes, así que no se otorga XP adicional.</p>`;
      }
      btn.textContent = 'Actualizar informe';
      btn.disabled = false;
    });
  }

  /* ============================================================
     REGISTRO DE PLUGINS — mismo patrón que g11-u01.js
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
  console.log('[g11-u02] Plugins de la Unidad II (Química 11°) registrados: teoria, simuladores, juego, examen, mision.');

  if (typeof QI !== 'undefined' && QI.registerUnit) {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'concentración': 'Cantidad de soluto presente en una cantidad determinada de disolución.',
        'soluto': 'Sustancia que se disuelve dentro de una disolución.',
        'disolvente': 'Sustancia que disuelve al soluto, formando la disolución.',
        'molaridad': 'Concentración expresada como moles de soluto por litro de disolución (mol/L).',
        'ppm': 'Partes por millón — unidad para concentraciones muy pequeñas, aproximadamente mg de soluto por litro de disolución acuosa diluida.',
        'porcentaje masa/volumen': 'Concentración expresada como gramos de soluto por cada 100 mL de disolución.'
      },
      xref: {
        'teoria:topic-1': [{ tab: 'simuladores', label: 'Simulador: Constructor de Concentraciones' }],
        'teoria:topic-4': [{ tab: 'simuladores', label: 'Simulador: Laboratorio de Molaridad' }],
        'teoria:topic-5': [{ tab: 'simuladores', label: 'Simulador: Analista de Agua en ppm' },
                           { tab: 'juego', label: 'Juega: Código de la Muestra' }],
        'teoria:topic-6': [{ tab: 'mision', label: 'Informe cuantitativo de la muestra' }]
      },
      images: {},
      videos: [],
      pne: (typeof window !== 'undefined' && window.BANCO_PNE_G11_U02) ? window.BANCO_PNE_G11_U02 : null
    });
  }

})();
