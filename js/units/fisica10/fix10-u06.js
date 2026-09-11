/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u06.js
   FIX10-U06 — Dinámica y las Leyes de Newton
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad VI). Diagramas de cuerpo libre (DCL)
   generados en SVG (nunca imágenes externas), con las mismas
   lecciones aprendidas del hotfix de U05: todo valor necesario para
   resolver debe verse en el propio diagrama, nunca solo en código.

   Mismo patrón de plugin exacto que fix10-u01 a u05.js.
   FIX10-U01 a U05 NO se tocaron. NO se adelanta U07.
   Examen: 20 preguntas por intento (regla global vigente).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u06';
  const C = 'var(--violet)';

  /* ================================================================
     GENERADOR DE DIAGRAMAS DE CUERPO LIBRE (DCL) — SVG
     ================================================================
     Bloque central + flechas etiquetadas (N, P, F, f, Fe) en las 4
     direcciones. Nunca depende solo del color (Regla de
     accesibilidad): cada flecha lleva su letra y, cuando corresponde,
     su magnitud en Newtons — todo visible, nada oculto en el código.
     ================================================================ */
  function _svgDCL(fuerzas, cfg) {
    cfg = cfg || {};
    const w = 220, h = 220, cx = 110, cy = 110, mitad = 22;
    const largo = 55;
    const dirVec = { arriba: [0, -1], abajo: [0, 1], derecha: [1, 0], izquierda: [-1, 0] };
    const colorPorNombre = { N: '#1FDBFF', P: '#F9FF4D', F: '#00FF88', f: '#FF6B6B', Fe: '#7B2FFF' };
    const flechas = fuerzas.map(function (fz) {
      const v = dirVec[fz.dir];
      const x1 = cx + v[0] * mitad, y1 = cy + v[1] * mitad;
      const x2 = cx + v[0] * (mitad + largo), y2 = cy + v[1] * (mitad + largo);
      const color = colorPorNombre[fz.nombre] || '#B8B8E0';
      const angulo = Math.atan2(y2 - y1, x2 - x1);
      const p1x = x2 - 8 * Math.cos(angulo - 0.4), p1y = y2 - 8 * Math.sin(angulo - 0.4);
      const p2x = x2 - 8 * Math.cos(angulo + 0.4), p2y = y2 - 8 * Math.sin(angulo + 0.4);
      const labelX = x2 + v[0] * 14, labelY = y2 + v[1] * 14 + (v[1] === 0 ? 3 : 0);
      const etiqueta = fz.nombre + (fz.mag !== undefined ? ' = ' + fz.mag + ' N' : '');
      return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="3"/>' +
        '<polygon points="' + x2 + ',' + y2 + ' ' + p1x.toFixed(1) + ',' + p1y.toFixed(1) + ' ' + p2x.toFixed(1) + ',' + p2y.toFixed(1) + '" fill="' + color + '"/>' +
        '<text x="' + labelX + '" y="' + labelY + '" font-size="10" fill="' + color + '" font-weight="800" text-anchor="middle">' + etiqueta + '</text>';
    }).join('');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="background:#161a3d;border-radius:8px;width:100%;max-width:260px;display:block;margin:.6rem auto">' +
      '<rect x="' + (cx - mitad) + '" y="' + (cy - mitad) + '" width="' + (mitad * 2) + '" height="' + (mitad * 2) + '" fill="#2a2f5c" stroke="#8888B0" stroke-width="1.5" rx="4"/>' +
      '<text x="' + cx + '" y="' + (cy + 4) + '" font-size="9" fill="#E8E8FF" text-anchor="middle">' + (cfg.objeto || 'objeto') + '</text>' +
      flechas +
      '</svg>';
  }

  const TEMAS = [
    { id: 't1', icon: '🎯', titulo: 'Fuerza, masa e inercia',
      ideaClave: 'La fuerza NO mantiene el movimiento — es la fuerza NETA la que cambia el estado de movimiento de un objeto.',
      explicacion: 'La Dinámica estudia las causas del movimiento: las fuerzas. La <strong>inercia</strong> es la tendencia de un objeto a mantener su estado (de reposo o de movimiento) mientras no actúe sobre él una fuerza neta distinta de cero. La <strong>masa</strong> es la medida de esa inercia — a mayor masa, más cuesta cambiar el estado de movimiento de un objeto.',
      ejemplo: 'Un autobús que frena bruscamente: los pasajeros siguen moviéndose hacia adelante por inercia (su cuerpo "quiere" seguir en el estado de movimiento anterior) — por eso existe el cinturón de seguridad, para aplicar la fuerza que detiene al pasajero junto con el vehículo.',
      aplicacion: 'Error muy común a evitar: pensar que "si un objeto se mueve, debe existir una fuerza empujándolo continuamente". Un objeto con velocidad constante en línea recta tiene fuerza neta igual a cero — no necesita ninguna fuerza continua para seguir moviéndose.',
      compruebra: 'Una pelota rueda por una superficie sin fricción a velocidad constante. ¿Existe alguna fuerza neta actuando sobre ella?' },

    { id: 't2', icon: '⚖️', titulo: 'Fuerza neta y equilibrio',
      ideaClave: 'Tener varias fuerzas actuando sobre un objeto NO significa automáticamente que ese objeto vaya a acelerar.',
      explicacion: 'Las fuerzas son vectores. La <strong>fuerza neta</strong> (ΣF) es la suma vectorial de todas las fuerzas que actúan sobre un objeto. Cuando ΣF = 0, el objeto está en <strong>equilibrio</strong> (puede estar en reposo, o moviéndose a velocidad constante). Cuando ΣF ≠ 0, el objeto acelera en la dirección de esa fuerza neta.',
      ejemplo: 'Dos personas empujan una caja: una con 25 N hacia la derecha, otra con 10 N hacia la izquierda. La fuerza neta es ΣF = 25 − 10 = 15 N hacia la derecha — la caja acelerará hacia la derecha, aunque haya dos fuerzas actuando.',
      aplicacion: 'Distinguí siempre "fuerzas presentes" (todas las que actúan) de "fuerza neta" (la resultante de sumarlas). Un objeto puede tener 4 fuerzas actuando y seguir en perfecto equilibrio, si se cancelan entre sí.',
      compruebra: 'Si un objeto tiene 3 fuerzas actuando sobre él y está en reposo, ¿qué podés afirmar sobre la suma de esas 3 fuerzas?' },

    { id: 't3', icon: '🧲', titulo: 'Tipos de fuerza',
      ideaClave: 'Las fuerzas se clasifican en dos grandes grupos: de contacto (necesitan tocar el objeto) y de acción a distancia (no necesitan contacto).',
      explicacion: 'Fuerzas de <strong>contacto</strong>: normal, fricción, fuerza aplicada, fuerza elástica — requieren que dos superficies se toquen. Fuerzas de <strong>acción a distancia</strong>: el peso (gravedad) es el ejemplo central en esta unidad — actúa sin necesidad de contacto físico.',
      ejemplo: 'Cuando empujás un libro sobre una mesa, ejercés una fuerza de contacto. La Tierra atrae ese mismo libro hacia abajo (su peso) sin tocarlo directamente — es una fuerza de acción a distancia.',
      aplicacion: 'No memorices esta clasificación como una lista aislada — la clave es poder identificar, frente a una situación real, cuáles fuerzas de contacto y cuáles de acción a distancia están actuando sobre un objeto específico.',
      compruebra: 'Un imán atrae un clavo de metal sin tocarlo. ¿Esa es una fuerza de contacto o de acción a distancia?' },

    { id: 't4', icon: '📐', titulo: 'Las tres Leyes de Newton',
      ideaClave: 'La Primera Ley explica la inercia; la Segunda relaciona fuerza, masa y aceleración; la Tercera explica que toda fuerza tiene su par.',
      explicacion: '<strong>Primera Ley (Inercia):</strong> un objeto permanece en reposo o en movimiento rectilíneo uniforme a menos que una fuerza neta actúe sobre él. <strong>Segunda Ley:</strong> ΣF = m·a — la aceleración de un objeto es proporcional a la fuerza neta aplicada, e inversamente proporcional a su masa. <strong>Tercera Ley (Acción-Reacción):</strong> toda fuerza de un cuerpo A sobre un cuerpo B genera una fuerza igual y opuesta de B sobre A.',
      ejemplo: 'Un cohete expulsa gases hacia abajo (acción) y los gases empujan al cohete hacia arriba (reacción) — ambas fuerzas son iguales en magnitud, opuestas en dirección, pero actúan sobre CUERPOS DISTINTOS (los gases y el cohete), por eso no se cancelan entre sí.',
      aplicacion: 'Error crítico a evitar: pensar que "acción y reacción se cancelan porque son iguales y opuestas". Son iguales y opuestas, sí, pero actúan sobre cuerpos DIFERENTES — nunca aparecen juntas en el mismo diagrama de cuerpo libre de un solo objeto.',
      compruebra: 'Cuando caminás, tu pie empuja el piso hacia atrás. Según la Tercera Ley, ¿qué fuerza actúa sobre vos como reacción?' },

    { id: 't5', icon: '🧱', titulo: 'Fricción, normal y peso',
      ideaClave: 'Masa y peso NO son lo mismo: la masa se mide en kg y no cambia; el peso se mide en Newtons y depende de la gravedad del lugar.',
      explicacion: '<strong>Peso</strong>: P = m·g (la fuerza con la que la gravedad atrae a un objeto). <strong>Normal (N)</strong>: fuerza de contacto que ejerce una superficie, perpendicular a ella — en una superficie horizontal simple, sin otras fuerzas verticales, N = P, pero esto NO es una regla universal. <strong>Fricción (f)</strong>: f = μ·N (μ es el coeficiente de fricción) — se opone al movimiento relativo o a la tendencia a deslizar.',
      ejemplo: 'Una caja de 10 kg sobre una mesa horizontal (g=9,8 m/s²) tiene un peso P = (10)(9,8) = 98 N. Si no hay otras fuerzas verticales, la normal también es N = 98 N — pero si alguien empuja la caja hacia abajo con una fuerza adicional, la normal aumentaría por encima del peso.',
      aplicacion: 'La dirección de la fricción NO es siempre "hacia la izquierda" — depende de hacia dónde tiende a deslizar el objeto: la fricción siempre se opone a esa tendencia, en cualquier dirección.',
      compruebra: '¿Por qué la masa de un astronauta no cambia en la Luna, pero su peso sí?' },

    { id: 't6', icon: '🌀', titulo: 'Fuerza elástica y Ley de Hooke',
      ideaClave: 'Un resorte "recuerda" su forma original: mientras más lo deformás, con más fuerza intenta volver a su posición.',
      explicacion: 'La <strong>Ley de Hooke</strong> describe la fuerza elástica de un resorte: F = −k·x, donde k es la constante elástica del resorte (N/m) y x es la deformación (m). El signo negativo indica que la fuerza restauradora se opone a la deformación — siempre "empuja de vuelta" hacia la posición de equilibrio.',
      ejemplo: 'Un resorte con k = 200 N/m se estira x = 0,10 m. La magnitud de la fuerza elástica es |F| = k·x = (200)(0,10) = 20 N, dirigida hacia la posición de equilibrio del resorte.',
      aplicacion: 'La Ley de Hooke se usa en dinamómetros (para medir fuerzas), en suspensiones de vehículos, y en cualquier sistema que necesite "absorber" y devolver energía mediante deformación elástica.',
      compruebra: 'Si duplicás la deformación x de un resorte (manteniendo la misma k), ¿qué le pasa a la magnitud de la fuerza elástica?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01 a u05.js) ──── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','fisica10-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().fisica10[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateFisica10Unit === 'function') {
      try { Storage.updateFisica10Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markFisica10TopicRead === 'function') {
      try { Storage.markFisica10TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }
  function markSimDone(simId) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP('simulator-done');
    }
  }
  function _mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function _bloqueTema(etiqueta, texto, color, esPregunta) {
    if (!texto) return '';
    return `
      <div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid ${color}">
        <p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:${color};margin:0 0 .25rem">${etiqueta}</p>
        <p style="margin:0;${esPregunta ? 'font-style:italic' : ''}">${texto}</p>
      </div>`;
  }

  /* ================================================================
     TEORÍA — 6 temas en acordeón, con DCL reales embebidos
     ================================================================ */
  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;
    const dclEjemplo = _svgDCL([
      { dir: 'arriba', nombre: 'N', mag: 98 },
      { dir: 'abajo', nombre: 'P', mag: 98 },
      { dir: 'derecha', nombre: 'F', mag: 60 },
      { dir: 'izquierda', nombre: 'f', mag: 20 }
    ], { objeto: 'caja' });
    const items = TEMAS.map((t, i) => {
      const isRead = leidos.includes(t.id);
      return `
        <div class="fix10-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="fix10-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">${isRead ? '✓ leído' : ''}</span>
            <span class="fix10-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="fix10-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.6">
            ${_bloqueTema('💡 IDEA CLAVE', t.ideaClave, 'var(--xp-gold,#F9FF4D)')}
            ${_bloqueTema('📘 EXPLICACIÓN', t.explicacion, C)}
            ${i === 3 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">➡️ DIAGRAMA DE FUERZAS (ejemplo)</p>${dclEjemplo}</div>` : ''}
            ${_bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
            ${_bloqueTema('🌐 APLICACIÓN REAL', t.aplicacion, 'var(--green)')}
            ${_bloqueTema('❓ COMPRUEBA', t.compruebra, 'var(--text-muted)', true)}
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" data-read="${i}" data-tema="${t.id}" ${isRead ? 'disabled' : ''}>
                ${isRead ? '✓ Tema leído' : '📖 Marcar como leído (+15 XP)'}
              </button>
              ${isRead ? '<span style="font-size:.78rem;color:var(--green)">¡Bien! XP otorgado.</span>' : ''}
            </div>
          </div>
        </div>`;
    }).join('');
    return `
      <div class="fix10-teoria" style="animation:pageIn .4s ease">
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:1rem">Progreso: ${leidosCount}/${TEMAS.length} temas leídos</p>
        ${items}
      </div>`;
  }
  function bindTeoria(unit, uData) {
    document.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-acc-toggle');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const caret = btn.querySelector('.fix10-acc-caret');
        if (body) {
          const abierto = body.style.display !== 'none';
          body.style.display = abierto ? 'none' : 'block';
          if (caret) caret.style.transform = abierto ? '' : 'rotate(180deg)';
        }
      });
    });
    document.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const temaId = btn.getAttribute('data-tema');
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(temaId);
        markRead(temaId);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        const container = document.querySelector('.fix10-teoria').parentElement;
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const i = btn.closest('[data-acc]').getAttribute('data-acc');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const head = document.querySelector(`[data-acc-toggle="${i}"] .fix10-acc-caret`);
        if (body) { body.style.display = 'block'; if (head) head.style.transform = 'rotate(180deg)'; }
      });
    });
  }

  /* ================================================================
     SIMULADOR 1 — "Force Lab MQC": el simulador estrella.
     Modo Explora (m, F, μ → DCL + ΣF + a) + Modo Desafío (predicción
     antes de comprobar, mínimo 10 escenarios).
     ================================================================ */
  let _flModo = 'explora';
  let _flM = 10, _flF = 50, _flMu = 0.2;
  const G = 9.8;
  function _flCalcular(m, F, mu) {
    const P = m * G;
    const N = P; // superficie horizontal simple, sin otras fuerzas verticales
    const fFriccion = mu * N;
    const neta = F - fFriccion;
    const a = neta / m;
    return { P, N, fFriccion, neta, a };
  }
  function renderSim1() {
    if (_flModo === 'desafio') return _renderFlDesafio();
    const r = _flCalcular(_flM, _flF, _flMu);
    const dcl = _svgDCL([
      { dir: 'arriba', nombre: 'N', mag: Math.round(r.N) },
      { dir: 'abajo', nombre: 'P', mag: Math.round(r.P) },
      { dir: 'derecha', nombre: 'F', mag: _flF },
      { dir: 'izquierda', nombre: 'f', mag: Math.round(r.fFriccion) }
    ], { objeto: 'bloque' });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🧪 Force Lab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés masa, fuerza aplicada y fricción, y mirás el diagrama de cuerpo libre completo.</p>
        ${dcl}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Masa m = <strong style="color:${C}">${_flM} kg</strong></label>
        <input type="range" id="fl-slider-m" min="1" max="30" step="1" value="${_flM}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Fuerza aplicada Fx = <strong style="color:${C}">${_flF} N</strong></label>
        <p style="font-size:.72rem;color:var(--text-muted);margin:-.3rem 0 .3rem">Fx: la fuerza aplicada sobre el eje horizontal (X), a favor del movimiento.</p>
        <input type="range" id="fl-slider-f" min="0" max="150" step="5" value="${_flF}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Coeficiente de fricción μ = <strong style="color:${C}">${_fmtMu(_flMu)}</strong></label>
        <input type="range" id="fl-slider-mu" min="0" max="0.6" step="0.05" value="${_flMu}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.7">
          P = m·g = ${r.P.toFixed(1)} N &nbsp;|&nbsp; N = ${r.N.toFixed(1)} N<br>
          f = μ·N = ${r.fFriccion.toFixed(1)} N<br>
          ΣF = F − f = ${r.neta.toFixed(1)} N &nbsp;|&nbsp; a = ΣF/m = <strong style="color:${C}">${r.a.toFixed(2)} m/s²</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="fl-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  /* HOTFIX: se formatea μ siempre con 2 decimales y coma (convención
     en español), para que μ=0 se vea "0,00" en vez de solo "0" —
     antes era inconsistente con μ=0,20 que sí mostraba decimales. */
  function _fmtMu(mu) { return mu.toFixed(2).replace('.', ','); }
  /* HOTFIX: se redujo de 10 a 5 rondas (3 de fuerza neta, 2 de
     aceleración), a pedido docente. */
  const FL_RONDAS = [
    { m: 8, F: 40, mu: 0.25, pide: 'neta' },
    { m: 4, F: 30, mu: 0.15, pide: 'neta' },
    { m: 6, F: 45, mu: 0.3, pide: 'neta' },
    { m: 10, F: 50, mu: 0.2, pide: 'a' },
    { m: 5, F: 20, mu: 0, pide: 'a' }
  ];
  let _flDesafioIdx = 0;
  function _renderFlDesafio() {
    if (_flDesafioIdx >= FL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${FL_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = FL_RONDAS[_flDesafioIdx];
    const pideTexto = r.pide === 'a' ? '¿Cuál será la aceleración (a)?' : '¿Cuál es la fuerza neta (ΣF)?';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="fl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_flDesafioIdx + 1} de ${FL_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">m = ${r.m} kg, Fx aplicada = ${r.F} N (sobre el eje horizontal), μ = ${_fmtMu(r.mu)}, g = 9,8 m/s².</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
          N = m·g &nbsp;|&nbsp; f = μ·N &nbsp;|&nbsp; ΣF = F − f &nbsp;|&nbsp; a = ΣF/m
        </div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.1" id="fl-respuesta" placeholder="${r.pide === 'a' ? 'a (m/s²)' : 'ΣF (N)'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="fl-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="fl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Laboratorio de Inercia": predicción antes de ver
     ================================================================ */
  const INERCIA_ESCENARIOS = [
    { texto: 'Un autobús viaja a velocidad constante y frena bruscamente. Los pasajeros de pie...', pregunta: '¿Qué le ocurre al cuerpo de los pasajeros por inercia?', correcta: 'Tienden a seguir moviéndose hacia adelante', opciones: ['Tienden a seguir moviéndose hacia adelante', 'Se detienen exactamente igual que el autobús', 'Salen despedidos hacia atrás', 'No sienten ningún efecto'] },
    { texto: 'Un patinador sobre hielo (fricción casi nula) es empujado una sola vez y luego nadie lo toca.', pregunta: '¿Qué le pasará a su velocidad, según la Primera Ley?', correcta: 'Se mantendrá prácticamente constante (fuerza neta ≈ 0)', opciones: ['Se mantendrá prácticamente constante (fuerza neta ≈ 0)', 'Aumentará continuamente sin ningún límite', 'Se detendrá de inmediato al soltarlo', 'Cambiará de dirección espontáneamente'] },
    { texto: 'Un objeto está en reposo sobre una mesa horizontal, sin que nada más lo toque.', pregunta: '¿Qué fuerza neta actúa sobre él?', correcta: 'Cero (está en equilibrio: peso y normal se cancelan)', opciones: ['Cero (está en equilibrio: peso y normal se cancelan)', 'Su propio peso, sin ninguna otra fuerza', 'Una fuerza hacia arriba mayor que su peso', 'No se puede determinar sin más datos'] },
    { texto: 'Un vehículo que viaja rápido en línea recta frena de golpe.', pregunta: '¿Por qué es importante el cinturón de seguridad en ese momento?', correcta: 'Porque aplica la fuerza necesaria para detener al pasajero junto con el vehículo, venciendo su inercia', opciones: ['Porque aplica la fuerza necesaria para detener al pasajero junto con el vehículo, venciendo su inercia', 'Porque elimina por completo la inercia del pasajero', 'Porque acelera al pasajero en la misma dirección del vehículo', 'Porque no tiene ninguna relación con la inercia'] }
  ];
  let _inerciaIdx = 0;
  function renderSim2() {
    if (_inerciaIdx >= INERCIA_ESCENARIOS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste los ${INERCIA_ESCENARIOS.length} escenarios!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const e = INERCIA_ESCENARIOS[_inerciaIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🚌 Laboratorio de Inercia</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Escenario ${_inerciaIdx + 1} de ${INERCIA_ESCENARIOS.length}</p>
        <p style="margin:.6rem 0">${e.texto}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${e.pregunta}</p>
        <div style="display:grid;gap:.5rem">
          ${_mezclar(e.opciones).map(op => `<button class="btn btn-ghost" data-inercia-opcion="${op}">${op}</button>`).join('')}
        </div>
        <p id="inercia-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Pares de Fuerzas": acción-reacción, 6 escenarios
     ================================================================ */
  const PARES_ESCENARIOS = [
    { texto: 'Una persona empuja una pared con las manos.', correcta: 'La pared empuja a la persona con la misma fuerza, en sentido contrario', opciones: ['La pared empuja a la persona con la misma fuerza, en sentido contrario', 'La pared no ejerce ninguna fuerza porque está fija', 'La persona ejerce el doble de fuerza que la pared', 'Solo existe la fuerza de la persona hacia la pared'] },
    { texto: 'Un nadador empuja el agua hacia atrás con sus brazos.', correcta: 'El agua empuja al nadador hacia adelante', opciones: ['El agua empuja al nadador hacia adelante', 'El agua no ejerce ninguna fuerza sobre el nadador', 'El nadador se mueve por su propia fuerza, sin ninguna reacción', 'El agua empuja al nadador hacia abajo'] },
    { texto: 'Un cohete expulsa gases a gran velocidad hacia abajo.', correcta: 'Los gases empujan al cohete hacia arriba', opciones: ['Los gases empujan al cohete hacia arriba', 'El cohete sube sin que exista ninguna fuerza de reacción', 'Los gases empujan al cohete hacia abajo también', 'La reacción actúa sobre los mismos gases, no sobre el cohete'] },
    { texto: 'Al disparar un rifle, la bala sale disparada hacia adelante.', correcta: 'El rifle retrocede (retroceso) empujado por la reacción de la bala', opciones: ['El rifle retrocede (retroceso) empujado por la reacción de la bala', 'El rifle no experimenta ninguna fuerza', 'La reacción actúa sobre la misma bala', 'Solo existe la fuerza sobre la bala, sin par de reacción'] },
    { texto: 'Un barco usa su hélice para empujar agua hacia atrás.', correcta: 'El agua empuja al barco hacia adelante', opciones: ['El agua empuja al barco hacia adelante', 'El barco avanza sin ninguna fuerza de reacción del agua', 'El agua frena al barco', 'La reacción ocurre sobre la propia hélice únicamente'] },
    { texto: 'Al caminar, tu pie empuja el piso hacia atrás.', correcta: 'El piso empuja tu pie hacia adelante, permitiéndote avanzar', opciones: ['El piso empuja tu pie hacia adelante, permitiéndote avanzar', 'El piso no ejerce ninguna fuerza sobre tu pie', 'Avanzás sin que exista ninguna fuerza de reacción', 'La reacción actúa sobre tu propio pie, no sobre el piso'] }
  ];
  let _paresIdx = 0;
  function renderSim3() {
    if (_paresIdx >= PARES_ESCENARIOS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste los ${PARES_ESCENARIOS.length} escenarios!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const e = PARES_ESCENARIOS[_paresIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🚀 Pares de Fuerzas</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Escenario ${_paresIdx + 1} de ${PARES_ESCENARIOS.length}</p>
        <p style="margin:.6rem 0">${e.texto}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la fuerza de reacción (Tercera Ley)?</p>
        <div style="display:grid;gap:.5rem">
          ${_mezclar(e.opciones).map(op => `<button class="btn btn-ghost" data-pares-opcion="${op}">${op}</button>`).join('')}
        </div>
        <p id="pares-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     Render/bind unificado de Simuladores
     ================================================================ */
  let _simActivo = null;
  function renderSimuladores(unit, uData) {
    if (_simActivo === 'sim1') return `<div class="sim-grid">${renderSim1()}</div>`;
    if (_simActivo === 'sim2') return `<div class="sim-grid">${renderSim2()}</div>`;
    if (_simActivo === 'sim3') return `<div class="sim-grid">${renderSim3()}</div>`;
    const hechos = uData.simsDone || [];
    const metas = [
      { id: 'sim1', titulo: '🧪 Force Lab MQC', desc: 'El simulador estrella: controlá masa, fuerza y fricción, y mirá el diagrama de cuerpo libre completo.' },
      { id: 'sim2', titulo: '🚌 Laboratorio de Inercia', desc: 'Predecí qué pasa por inercia en 4 situaciones reales.' },
      { id: 'sim3', titulo: '🚀 Pares de Fuerzas', desc: '6 escenarios de acción-reacción: identificá la fuerza de reacción correcta.' }
    ];
    return `
      <div class="sim-grid" style="display:grid;gap:1rem">
        ${metas.map(s => `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem">
            <h3 style="margin:0 0 .4rem">${hechos.includes(s.id) ? '✅' : ''} ${s.titulo}</h3>
            <p style="color:var(--text-secondary);font-size:.88rem">${s.desc}</p>
            <button class="btn btn-primary btn-sm" data-sim-abrir="${s.id}">${hechos.includes(s.id) ? 'Repasar' : 'Comenzar'}</button>
          </div>
        `).join('')}
      </div>`;
  }
  function _rerenderSimTab(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderSimuladores(unit, loadUnitData()); bindSimuladores(unit, loadUnitData()); }
  }
  function bindSimuladores(unit, uData) {
    document.querySelectorAll('[data-sim-abrir]').forEach(btn => {
      btn.addEventListener('click', () => {
        _simActivo = btn.getAttribute('data-sim-abrir');
        _flModo = 'explora'; _flDesafioIdx = 0;
        _inerciaIdx = 0; _paresIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Force Lab */
    const s1m = document.getElementById('fl-slider-m');
    const s1f = document.getElementById('fl-slider-f');
    const s1mu = document.getElementById('fl-slider-mu');
    if (s1m) s1m.addEventListener('input', () => { _flM = parseInt(s1m.value, 10); _rerenderSimTab(unit); });
    if (s1f) s1f.addEventListener('input', () => { _flF = parseInt(s1f.value, 10); _rerenderSimTab(unit); });
    if (s1mu) s1mu.addEventListener('input', () => { _flMu = parseFloat(s1mu.value); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('fl-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _flModo = 'desafio'; _flDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('fl-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _flModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarFl = document.getElementById('fl-comprobar');
    if (comprobarFl) comprobarFl.addEventListener('click', () => {
      const r = FL_RONDAS[_flDesafioIdx];
      const calc = _flCalcular(r.m, r.F, r.mu);
      const esperado = r.pide === 'a' ? calc.a : calc.neta;
      const val = parseFloat(document.getElementById('fl-respuesta').value);
      const fb = document.getElementById('fl-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.5;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${esperado.toFixed(2)} ${r.pide === 'a' ? 'm/s²' : 'N'}.`;
        if (ok) setTimeout(() => { _flDesafioIdx++; _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — Laboratorio de Inercia */
    document.querySelectorAll('[data-inercia-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-inercia-opcion');
        const e = INERCIA_ESCENARIOS[_inerciaIdx];
        const fb = document.getElementById('inercia-feedback');
        const ok = elegido === e.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es esa. La respuesta correcta: ${e.correcta}`;
        }
        setTimeout(() => { _inerciaIdx++; if (_inerciaIdx >= INERCIA_ESCENARIOS.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1600);
      });
    });

    /* Sim3 — Pares de Fuerzas */
    document.querySelectorAll('[data-pares-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-pares-opcion');
        const e = PARES_ESCENARIOS[_paresIdx];
        const fb = document.getElementById('pares-feedback');
        const ok = elegido === e.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto! Recordá: actúan sobre cuerpos DISTINTOS, por eso no se cancelan.' : `💡 No es esa. La respuesta correcta: ${e.correcta}`;
        }
        setTimeout(() => { _paresIdx++; if (_paresIdx >= PARES_ESCENARIOS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1700);
      });
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero de Fuerzas": 8 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Una caja tiene 3 fuerzas actuando sobre ella: peso, normal, y una fuerza aplicada hacia la derecha.',
      pregunta: '¿Cuántas fuerzas están actuando sobre la caja (sin importar si se cancelan o no)?',
      pista: 'Contá cada fuerza mencionada en el enunciado, una por una.',
      correcta: '3', opciones: ['3', '1', '2', '0'] },
    { id: 'nivel2', escenario: 'Un objeto tiene una fuerza de 30 N hacia la derecha y otra de 30 N hacia la izquierda actuando sobre él.',
      pregunta: '¿Está el objeto en equilibrio?',
      pista: 'Sumá las fuerzas considerando su dirección (signos opuestos).',
      correcta: 'Sí, la fuerza neta es cero', opciones: ['Sí, la fuerza neta es cero', 'No, la fuerza neta es 60 N', 'No se puede determinar', 'Sí, pero solo si el objeto está en movimiento'] },
    { id: 'nivel3', escenario: 'Un objeto se mueve en línea recta a velocidad constante de 20 m/s.',
      pregunta: 'Según la Primera Ley, ¿cuál es la fuerza neta sobre ese objeto?',
      pista: 'Recordá que velocidad constante significa que el estado de movimiento no cambia.',
      correcta: 'Cero', opciones: ['Cero', 'Igual a su masa', 'Igual a 20 N', 'No se puede determinar sin más datos'] },
    { id: 'nivel4', escenario: 'Un objeto de 4 kg tiene una fuerza neta de 12 N actuando sobre él.',
      pregunta: 'Según la Segunda Ley (ΣF = m·a), ¿cuál es su aceleración?',
      pista: 'Despejá "a" de la fórmula ΣF = m·a.',
      correcta: '3 m/s²', opciones: ['3 m/s²', '12 m/s²', '4 m/s²', '48 m/s²'] },
    { id: 'nivel5', escenario: 'Un cohete expulsa gases hacia abajo para despegar.',
      pregunta: 'Según la Tercera Ley, ¿la fuerza de reacción actúa sobre los gases o sobre el cohete?',
      pista: 'Recordá que acción y reacción actúan siempre sobre cuerpos distintos.',
      correcta: 'Sobre el cohete', opciones: ['Sobre el cohete', 'Sobre los mismos gases', 'Sobre ambos por igual', 'No existe ninguna fuerza de reacción'] },
    { id: 'nivel6', escenario: 'Una caja de 20 kg está sobre una superficie horizontal con μ = 0,3.',
      pregunta: '¿Cuál es la fuerza de fricción máxima (f = μ·N, con N = P = m·g)?',
      pista: 'Primero calculá el peso (P = m·g), luego aplicá f = μ·N.',
      correcta: '58,8 N', opciones: ['58,8 N', '20 N', '196 N', '6 N'] },
    { id: 'nivel7', escenario: 'Un resorte con k = 150 N/m se comprime x = 0,20 m.',
      pregunta: '¿Cuál es la magnitud de la fuerza elástica (F = k·x)?',
      pista: 'Multiplicá directamente la constante elástica por la deformación.',
      correcta: '30 N', opciones: ['30 N', '150 N', '0,2 N', '750 N'] },
    { id: 'nivel8', escenario: 'Un bloque de 5 kg recibe una fuerza aplicada de 40 N hacia la derecha, con una fricción de 10 N hacia la izquierda.',
      pregunta: '¿Cuál es la aceleración final del bloque?',
      pista: 'Primero calculá la fuerza neta (F aplicada − fricción), y después dividí entre la masa.',
      correcta: '6 m/s²', opciones: ['6 m/s²', '8 m/s²', '30 m/s²', '10 m/s²'] }
  ];
  /* ================================================================
     HOTFIX — sistema de juego unificado: antes se mostraba la lista
     completa de niveles de una sola vez (visualmente abrumador). Ahora
     funciona como el examen: una pregunta a la vez, empezando en el
     primer nivel pendiente, avanzando automáticamente al acertar.
     ================================================================ */
  let _juegoIdx = null; // null = aún no calculado el punto de partida
  let _juegoOpcionesMezcladas = [];
  let _juegoFeedback = null;
  function renderJuego(unit, uData) {
    const nivelesHechos = uData.gameLevels || [];
    if (_juegoIdx === null) {
      const primerPendiente = NIVELES_JUEGO.findIndex(n => !nivelesHechos.includes(n.id));
      _juegoIdx = primerPendiente === -1 ? NIVELES_JUEGO.length : primerPendiente;
    }
    if (_juegoIdx >= NIVELES_JUEGO.length) {
      return `
        <div class="juego-panel" style="text-align:center">
          <h3>✅ ¡Completaste los ${NIVELES_JUEGO.length} niveles!</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Ya resolviste todo el juego de esta unidad.</p>
        </div>`;
    }
    const n = NIVELES_JUEGO[_juegoIdx];
    if (!_juegoOpcionesMezcladas.length) _juegoOpcionesMezcladas = _mezclar(n.opciones);
    return `
      <div class="juego-panel">
        <h3 style="margin:0 0 .3rem">⚙️ Ingeniero de Fuerzas</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Nivel ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${n.pregunta}</p>
        <div style="display:grid;gap:.5rem">
          ${_juegoOpcionesMezcladas.map(op => `<button class="btn btn-ghost" data-juego-opcion="${op}">${op}</button>`).join('')}
        </div>
        ${_juegoFeedback ? `<p style="margin-top:.9rem;font-size:.85rem;color:${_juegoFeedback.correcto ? 'var(--green)' : 'var(--gold)'}">${_juegoFeedback.texto}</p>` : ''}
      </div>`;
  }
  function bindJuego(unit, uData) {
    document.querySelectorAll('[data-juego-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegida = btn.getAttribute('data-juego-opcion');
        const n = NIVELES_JUEGO[_juegoIdx];
        const acierto = elegida === n.correcta;
        if (acierto) {
          const u = loadUnitData();
          const done = Array.isArray(u.gameLevels) ? u.gameLevels.slice() : [];
          const yaResuelto = done.includes(n.id);
          if (!yaResuelto) done.push(n.id);
          patchUnit({ gameLevels: done, gameScore: done.length });
          if (!yaResuelto) awardXP(done.length >= NIVELES_JUEGO.length ? 'game-won' : 'game-played');
          _juegoFeedback = { texto: `✅ ¡Correcto! ${n.correcta}`, correcto: true };
          setTimeout(() => { _juegoIdx++; _juegoOpcionesMezcladas = []; _juegoFeedback = null; _rerenderJuego(unit); }, 1600);
        } else {
          _juegoFeedback = { texto: '💡 No es esa. Volvé a leer la pista y probá otra opción.', correcto: false };
        }
        _rerenderJuego(unit);
      });
    });
  }
  function _rerenderJuego(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderJuego(unit, loadUnitData()); bindJuego(unit, loadUnitData()); }
  }

  /* ================================================================
     EXAMEN — banco real (js/data/banco-fix10-u06.js), 20 por intento
     (regla global vigente — banco maestro con 70+ preguntas)
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U06 !== 'undefined') ? PREGUNTAS_FIX10_U06 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U06</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 20 al azar.</p>
        <button class="btn btn-primary" id="fix10-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div id="fix10-exam-opts" style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
        <div id="fix10-exam-fb" style="margin-top:1rem"></div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('fix10-iniciar-examen');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const banco = _bancoDisponible().slice();
        for (let i = banco.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [banco[i], banco[j]] = [banco[j], banco[i]]; }
        const seleccionadas = banco.slice(0, Math.min(20, banco.length));
        const preguntasMezcladas = seleccionadas.map(q => {
          const indices = q.opciones.map((_, idx) => idx);
          for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
          return { ...q, opciones: indices.map(idx => q.opciones[idx]), correcta: indices.indexOf(q.correcta) };
        });
        _examEnCurso = { preguntas: preguntasMezcladas, i: 0, correctas: 0 };
        _rerenderExamen(unit);
      });
    }
    document.querySelectorAll('[data-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-opcion'), 10);
        const q = _examEnCurso.preguntas[_examEnCurso.i];
        const ok = idx === q.correcta;
        if (ok) _examEnCurso.correctas++;

        const opts = document.getElementById('fix10-exam-opts');
        opts.querySelectorAll('[data-opcion]').forEach(b => {
          const k = parseInt(b.getAttribute('data-opcion'), 10);
          b.disabled = true;
          if (k === q.correcta) b.style.borderColor = 'var(--green)';
          if (k === idx && !ok) b.style.borderColor = 'var(--red)';
        });

        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react(ok ? 'topic-read' : 'answer-wrong'); } catch (e) {} }

        const esUltima = _examEnCurso.i >= _examEnCurso.preguntas.length - 1;
        document.getElementById('fix10-exam-fb').innerHTML = `
          <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                      border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
            <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
            <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion || ''}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="fix10-exam-next" style="margin-top:.8rem">
            ${esUltima ? 'Finalizar examen' : 'Siguiente pregunta →'}
          </button>`;
        document.getElementById('fix10-exam-next').addEventListener('click', () => {
          _examEnCurso.i++;
          if (_examEnCurso.i >= _examEnCurso.preguntas.length) _finalizarExamen(unit);
          else _rerenderExamen(unit);
        });
      });
    });
  }
  function _rerenderExamen(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderExamen(unit, loadUnitData()); bindExamen(unit, loadUnitData()); }
  }
  function _finalizarExamen(unit) {
    const score = Math.round((_examEnCurso.correctas / _examEnCurso.preguntas.length) * 100);
    const passed = score >= (unit.exam && unit.exam.pass || 70);
    const u = loadUnitData();
    const prevBest = u.examBest || 0;
    const yaOtorgadoAntes = !!u.examXpAwarded;
    patchUnit({ examBest: Math.max(prevBest, score), examAttempts: (u.examAttempts || 0) + 1, examXpAwarded: u.examXpAwarded || passed });
    if (passed && !yaOtorgadoAntes) awardXP('exam-done');
    _examEnCurso = null;
    const tc = document.getElementById('tab-content');
    if (tc) {
      tc.innerHTML = `
        <div style="max-width:520px;text-align:center">
          <h3>${passed ? '🎉 ¡Aprobado!' : '📚 Seguí practicando'}</h3>
          <p style="font-size:1.6rem;font-weight:700">${score}%</p>
          <button class="btn btn-primary" id="fix10-volver-examen">Volver</button>
        </div>`;
      const b = document.getElementById('fix10-volver-examen');
      if (b) b.addEventListener('click', () => _rerenderExamen(unit));
    }
  }

  /* ================================================================
     MISIÓN FINAL — "Investigar el Sistema" (2 fases: caja empujada
     con fricción, luego cambio de condiciones para evaluar
     proporcionalidad)
     ================================================================ */
  const MISION_FASE1 = { m: 10, F: 60, mu: 0.2 };
  const MISION_FASE2 = { m: 20, F: 60, mu: 0.2 }; // se duplica la masa
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { peso: '', normal: '', friccion: '', neta: '', aceleracion: '', texto: '' };

  function _misionEsperado(datos) {
    const P = datos.m * G, N = P, f = datos.mu * N, neta = datos.F - f, a = neta / datos.m;
    return { P, N, f, neta, a };
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esp = _misionEsperado(datos);
    const peso = parseFloat(_misionVals.peso), normal = parseFloat(_misionVals.normal);
    const friccion = parseFloat(_misionVals.friccion), neta = parseFloat(_misionVals.neta);
    const acel = parseFloat(_misionVals.aceleracion);
    if ([peso, normal, friccion, neta, acel].some(isNaN)) return false;
    if (Math.abs(peso - esp.P) > 2) return false;
    if (Math.abs(normal - esp.N) > 2) return false;
    if (Math.abs(friccion - esp.f) > 2) return false;
    if (Math.abs(neta - esp.neta) > 2) return false;
    if (Math.abs(acel - esp.a) > 0.5) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Investigar el Sistema".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🔧 Misión: Investigar el Sistema ${_misionFase === 2 ? '— Fase 2 (masa duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Una caja de m = ${datos.m} kg es empujada con Fx = ${datos.F} N sobre una superficie horizontal con μ = ${_fmtMu(datos.mu)} (g = 9,8 m/s²).</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Peso (P):
          <input type="number" id="mision-peso" value="${_misionVals.peso}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Normal (N):
          <input type="number" id="mision-normal" value="${_misionVals.normal}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">C. Fricción (f):
          <input type="number" id="mision-friccion" value="${_misionVals.friccion}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">D. Fuerza neta (ΣF):
          <input type="number" id="mision-neta" value="${_misionVals.neta}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">E. Aceleración (a):
          <input type="number" step="0.1" id="mision-aceleracion" value="${_misionVals.aceleracion}" placeholder="m/s²" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">F. ¿Qué le ocurrirá físicamente a la caja?
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { peso: 'mision-peso', normal: 'mision-normal', friccion: 'mision-friccion', neta: 'mision-neta', aceleracion: 'mision-aceleracion', texto: 'mision-texto' };
    Object.keys(idMap).forEach(key => {
      const el = document.getElementById(idMap[key]);
      if (el) el.addEventListener('input', () => {
        _misionVals[key] = el.value;
        const btn = document.getElementById('fix10-entregar-mision');
        if (btn) {
          const valido = _misionValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    });
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte.';
          return;
        }
        if (_misionFase === 1) {
          _misionFase = 2;
          _misionVals = { peso: '', normal: '', friccion: '', neta: '', aceleracion: '', texto: '' };
          const tc = document.getElementById('tab-content');
          if (tc) { tc.innerHTML = renderMision(unit, loadUnitData()); bindMision(unit, loadUnitData()); }
          return;
        }
        patchUnit({ missionDone: true });
        awardXP('fisica10-mission-done');
        const tc = document.getElementById('tab-content');
        if (tc) tc.innerHTML = renderMision(unit, loadUnitData());
      });
    }
  }

  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
