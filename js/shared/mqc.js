/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/mqc.js  |  Método MQC — ciclo de aprendizaje
   ================================================================
   Materializa el Método MQC (comprensión antes que memorización).
   Cada tema recorre: DETONANTE → COMPROMISO CON UNA RESPUESTA →
   (exploración/explicación) → CONEXIÓN → CONFRONTACIÓN DE ERRORES.

   EOP-004 §4.4: "Predicción" se llama oficialmente
   "COMPROMISO CON UNA RESPUESTA": el estudiante se compromete con una
   respuesta ANTES de explorar el simulador o ver la explicación.

   API:
     MQC.register(unitId, map)   map: { 'topic-i': {detonante, commit, conexion} }
     MQC.detonante(unitId, tid)  → HTML de la pregunta detonante
     MQC.commit(unitId, tid)     → HTML del widget de compromiso (interactivo)
     MQC.bindCommit(root, unitId, tid) → activa el widget tras render
     MQC.conexion(unitId, tid)   → HTML de la conexión con la vida real
     MQC.experienceHeader(unit)  → cabecera de experiencia (nombre + misión + detonante de unidad)
   El compromiso se guarda en localStorage (sin tocar el esquema del core).
================================================================ */

window.MQC = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → { tid → {detonante, commit, conexion} } */

  function register(unitId, map) {
    if (!map) return;
    _byUnit[unitId] = Object.assign(_byUnit[unitId] || {}, map);
  }
  function _get(unitId, tid) { return (_byUnit[unitId] && _byUnit[unitId][tid]) || null; }

  /* Persistencia ligera de compromisos (clave propia, no toca el esquema) */
  function _commitsKey(unitId) { return 'mqc_commit_' + unitId; }
  function _loadCommits(unitId) {
    if (typeof Storage === 'undefined' || !Storage.get) return {};
    return Storage.get(_commitsKey(unitId)) || {};
  }
  function _saveCommit(unitId, tid, choice, correcto) {
    if (typeof Storage === 'undefined' || !Storage.set) return;
    const all = _loadCommits(unitId);
    all[tid] = { choice, correcto, ts: Date.now() };
    Storage.set(_commitsKey(unitId), all);
  }
  function committed(unitId, tid) { return _loadCommits(unitId)[tid] || null; }

  /* ── Pregunta detonante de un tema ──────────────────────────── */
  function detonante(unitId, tid) {
    const d = _get(unitId, tid);
    if (!d || !d.detonante) return '';
    return `<div class="mqc-detonante">
      <span class="mqc-badge">🤔 Detonante</span>
      <p>${d.detonante}</p>
    </div>`;
  }

  /* ── Widget "Compromiso con una respuesta" ──────────────────── */
  function commit(unitId, tid) {
    const d = _get(unitId, tid);
    if (!d || !d.commit) return '';
    const prev = committed(unitId, tid);
    const c = d.commit;
    if (prev) {
      /* Ya se comprometió: mostramos su elección y la valoración */
      return `<div class="mqc-commit mqc-commit-done" data-mqc-tid="${tid}">
        <span class="mqc-badge">✅ Tu compromiso</span>
        <p>${c.pregunta}</p>
        <div class="mqc-commit-result ${prev.correcto ? 'ok' : 'no'}">
          Elegiste: <strong>${c.opciones[prev.choice]}</strong>
          ${prev.correcto ? ' · ¡buen razonamiento!' : ' · revísalo al explorar y leer.'}
        </div>
        ${c.explica ? `<p class="mqc-commit-explica">${c.explica}</p>` : ''}
      </div>`;
    }
    return `<div class="mqc-commit" data-mqc-tid="${tid}">
      <span class="mqc-badge">✋ Comprométete con una respuesta</span>
      <p>${c.pregunta}</p>
      <p class="mqc-commit-hint">Antes de leer o explorar, elige lo que tú crees. No hay castigo por equivocarse: sirve para pensar.</p>
      <div class="mqc-commit-opts">
        ${c.opciones.map((o, k) => `<button class="btn btn-ghost btn-sm mqc-commit-opt" data-k="${k}">${o}</button>`).join('')}
      </div>
    </div>`;
  }

  /* Activa los botones de compromiso (llamar tras render) */
  function bindCommit(root, unitId, tid) {
    const box = (root || document).querySelector(`.mqc-commit[data-mqc-tid="${tid}"]`);
    if (!box || box.classList.contains('mqc-commit-done')) return;
    const d = _get(unitId, tid);
    if (!d || !d.commit) return;
    const c = d.commit;
    box.querySelectorAll('.mqc-commit-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = parseInt(btn.getAttribute('data-k'), 10);
        const correcto = (k === c.correcta);
        _saveCommit(unitId, tid, k, correcto);
        box.querySelectorAll('.mqc-commit-opt').forEach(b => {
          b.disabled = true;
          if (parseInt(b.getAttribute('data-k'), 10) === c.correcta) b.style.borderColor = 'var(--green)';
          if (b === btn && !correcto) b.style.borderColor = 'var(--red)';
        });
        const fb = document.createElement('div');
        fb.className = 'mqc-commit-result ' + (correcto ? 'ok' : 'no');
        fb.innerHTML = correcto
          ? '✓ Te comprometiste y acertaste. Ahora confírmalo explorando.'
          : '↪ Te comprometiste. Mira si tu idea cambia al explorar y leer.';
        box.appendChild(fb);
        if (c.explica) {
          const ex = document.createElement('p');
          ex.className = 'mqc-commit-explica';
          ex.innerHTML = c.explica;
          box.appendChild(ex);
        }
      });
    });
  }

  /* ── Conexión con la vida real ──────────────────────────────── */
  function conexion(unitId, tid) {
    const d = _get(unitId, tid);
    if (!d || !d.conexion) return '';
    return `<div class="mqc-conexion">
      <span class="mqc-badge">🌍 Conexión</span>
      <p>${d.conexion}</p>
    </div>`;
  }

  /* ── Cabecera de experiencia de la unidad ───────────────────── */
  /* Usa unit.experiencia = {nombre, detonante, mision} si existe */
  function experienceHeader(unit) {
    const ex = (unit && unit.experiencia) || null;
    if (!ex) return '';
    const color = (unit && unit.color) || 'var(--cyan)';
    return `<div class="mqc-experience" style="--mqc-accent:${color}">
      <div class="mqc-exp-tag">Experiencia</div>
      <h2 class="mqc-exp-name">${ex.nombre || unit.name}</h2>
      ${ex.detonante ? `<div class="mqc-exp-detonante">🤔 ${ex.detonante}</div>` : ''}
      ${ex.mision ? `<div class="mqc-exp-mision"><strong>🎯 Tu misión:</strong> ${ex.mision}</div>` : ''}
    </div>`;
  }

  /* ── Puente entre unidades (secuencia lógica de las ciencias) ──
     EOP Unidad III §4: cada experiencia muestra lo que el estudiante
     YA aprendió, lo que aprenderá AHORA y lo que USARÁ DESPUÉS.
     Lee unit.experiencia.secuencia = { antes, ahora, despues }.
     Cada entrada puede ser texto, o {texto, unit, tab} para enlazar. */
  function bridge(unit) {
    const seq = (unit && unit.experiencia && unit.experiencia.secuencia) || null;
    if (!seq) return '';
    function cell(kind, icon, titulo, val) {
      if (!val) return '';
      const texto = (typeof val === 'string') ? val : val.texto;
      const link = (val && val.unit) ? `<button class="qi-xref mqc-bridge-link" data-qi-type="unit" data-qi-unit="${val.unit}" data-qi-tab="${val.tab || 'teoria'}">Ir →</button>` : '';
      return `<div class="mqc-bridge-cell mqc-bridge-${kind}">
        <div class="mqc-bridge-head">${icon} ${titulo}</div>
        <p>${texto}</p>${link}
      </div>`;
    }
    return `<div class="mqc-bridge">
      ${cell('antes', '⏪', 'Ya aprendiste', seq.antes)}
      ${cell('ahora', '🎯', 'Aprenderás ahora', seq.ahora)}
      ${cell('despues', '⏩', 'Lo usarás después', seq.despues)}
    </div>`;
  }

  return { register, detonante, commit, bindCommit, conexion, committed, experienceHeader, bridge };
})();
