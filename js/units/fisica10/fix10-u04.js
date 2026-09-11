/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u04.js
   FIX10-U04 — Cinemática: describiendo el movimiento
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad IV, apartados 4.1 a 4.4 y 4.7). Nota
   del propio libro, respetada aquí: en estos movimientos rectilíneos
   se usan velocidad/rapidez y desplazamiento/distancia de forma
   indistinta, sin el carácter vectorial estricto de U02/U03 — es
   una simplificación explícita de la fuente, no un error.

   Unidad V del libro (Análisis gráfico de movimientos) NO se incluyó
   acá — no forma parte de la Unidad IV, queda para una futura unidad
   (regla explícita del sprint: no inventar contenido fuera de la
   fuente ni adelantar temas de otras unidades).

   Mismo patrón de plugin exacto que fix10-u01/02/03.js.
   FIX10-U01, U02 y U03 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u04';
  const C = 'var(--violet)';

  const TEMAS = [
    { id: 't1', icon: '📍', titulo: 'Variables del movimiento',
      ideaClave: 'Ya conocés distancia, desplazamiento, rapidez y velocidad (U02) y marco de referencia (U03) — acá los usamos para describir matemáticamente un movimiento real.',
      explicacion: 'La Cinemática estudia el movimiento sin importar qué lo causa — solo le interesan espacio, tiempo y móvil. Para describir un movimiento en línea recta usamos la posición inicial (x₀), la posición final (x) y el cambio de posición entre ambas (Δx = x − x₀).',
      ejemplo: 'Si un móvil parte de x₀ = 20 m y llega a x = 80 m, su cambio de posición es Δx = 80 − 20 = 60 m.',
      aplicacion: 'Como estos movimientos son en línea recta, el libro simplifica algo importante: usa "rapidez" y "velocidad" (y "distancia" y "desplazamiento") de forma indistinta — a diferencia de U02/U03, donde la diferencia entre escalar y vector era central.',
      compruebra: 'Un móvil parte de x₀ = 10 m y termina en x = 45 m. ¿Cuál es su Δx?' },

    { id: 't2', icon: '➡️', titulo: 'Movimiento Rectilíneo Uniforme (MRU)',
      ideaClave: 'En el MRU, un móvil recorre distancias iguales en tiempos iguales — su velocidad no cambia.',
      explicacion: 'El MRU es un movimiento en línea recta con velocidad constante: ni su magnitud ni su dirección cambian. La fórmula que relaciona velocidad, distancia y tiempo es v = d/t.',
      ejemplo: 'Un auto recorre 780 m hacia el Este. Tanto la distancia como el desplazamiento son 780 m — la diferencia es que el desplazamiento además indica la dirección: 780 m al Este.',
      aplicacion: 'De v = d/t se pueden despejar las otras dos variables: t = d/v (si se conoce la distancia y la velocidad) y d = v·t (si se conoce el tiempo y la velocidad). Ejemplo real del libro: un auto viaja 2 horas a 55 km/h → d = (55 km/h)(2h) = 110 km.',
      compruebra: 'Un auto recorre 50 km al Este a 60 km/h. ¿Cuánto tiempo tardó?' },

    { id: 't3', icon: '📈', titulo: 'Aceleración y MRUA',
      ideaClave: 'Aceleración NO significa "ir rápido" — significa que la velocidad está cambiando, ya sea aumentando o disminuyendo.',
      explicacion: 'La aceleración es el cambio de velocidad respecto al tiempo: a = (vf − vi) / t. En el MRUA (Movimiento Rectilíneo Uniformemente Acelerado), lo que permanece constante es la aceleración — no la velocidad, que va cambiando de forma uniforme.',
      ejemplo: 'Un vehículo que viaja rápido pero SIN cambiar su velocidad tiene aceleración cero. Un vehículo lento que va aumentando su velocidad SÍ está acelerando, aunque siga siendo más lento que el primero.',
      aplicacion: 'Del despeje de a = (vf−vi)/t surgen las demás ecuaciones del MRUA: d = vi·t + at²/2, d = (vf²−vi²)/2a, y d = ((vi+vf)/2)·t. Si el móvil "parte del reposo", vi = 0. Si "frena y se detiene", vf = 0. Ejemplo real: un motociclista a 30 m/s frena con a = −6 m/s² hasta detenerse → tarda t = (0−30)/(−6) = 5 s, y recorre d = (30)(5) + (−6)(5²)/2 = 75 m.',
      compruebra: 'Si a es negativa, ¿la velocidad del móvil aumenta o disminuye?' },

    { id: 't4', icon: '🪂', titulo: 'Movimiento vertical',
      ideaClave: 'En el punto más alto de un lanzamiento vertical, la velocidad es momentáneamente cero — pero la aceleración de la gravedad NUNCA deja de actuar.',
      explicacion: 'El movimiento vertical (caída libre, lanzamiento hacia arriba o hacia abajo) usa las mismas ecuaciones del MRUA, cambiando "d" por "h" (altura) y "a" por "g" (gravedad ≈ 9,8 m/s²). En caída libre o lanzamiento hacia abajo, g = 9,8 m/s² (la velocidad aumenta). En un tiro vertical hacia arriba, g = −9,8 m/s² (la velocidad disminuye).',
      ejemplo: 'En un tiro vertical hacia arriba, a t=0 la velocidad es 39,2 m/s; un segundo después ya es 29,4 m/s (bajó 9,8 m/s); en el punto más alto (t=4s) la velocidad es exactamente 0.',
      aplicacion: 'Error común a evitar: en el punto más alto v = 0 momentáneamente, pero la aceleración sigue siendo g — nunca es cero, porque la gravedad no deja de actuar. Otras claves: cuando se dice "se deja caer", vi = 0; el tiempo total de vuelo es el doble del tiempo en llegar a la altura máxima; y la velocidad de lanzamiento tiene la misma magnitud que la velocidad de regreso al punto de partida.',
      compruebra: '¿Por qué en el punto más alto de un lanzamiento vertical la aceleración NO es cero, aunque la velocidad sí lo sea?' },

    { id: 't5', icon: '🎯', titulo: 'Movimiento parabólico',
      ideaClave: 'Un proyectil en el aire tiene dos movimientos independientes al mismo tiempo: uno horizontal (MRU) y uno vertical (afectado por la gravedad).',
      explicacion: 'En el movimiento parabólico, la única fuerza que actúa sobre el proyectil es la gravedad. La velocidad inicial se descompone en una componente horizontal (Vx) y una vertical (Vy) — el mismo método de componentes que ya viste en U02.',
      ejemplo: 'La componente Vx se mantiene constante durante todo el vuelo (el movimiento horizontal es un MRU, con aceleración horizontal igual a cero). La componente Vy, en cambio, cambia uniformemente por efecto de la gravedad (−9,8 m/s² cada segundo), igual que en el movimiento vertical.',
      aplicacion: 'Por eso el proyectil sube, alcanza una altura máxima a la mitad de su trayectoria, y luego desciende — todo mientras avanza horizontalmente a velocidad constante. Los dos movimientos (horizontal y vertical) ocurren a la vez, pero se calculan por separado.',
      compruebra: '¿Por qué la componente horizontal de la velocidad de un proyectil no cambia durante el vuelo, si la vertical sí?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01/02/03.js) ──── */
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
     TEORÍA — 5 temas en acordeón (mismo patrón que U01/U02/U03)
     ================================================================ */
  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;
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
            ${_bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
            ${_bloqueTema('🌐 APLICACIÓN', t.aplicacion, 'var(--green)')}
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
     SIMULADOR 1 — "Pista MRU": Modo Explora + Modo Desafío
     ================================================================
     HOTFIX PEDAGÓGICO: se usa la fórmula estándar de colegio v = d/t
     (y sus despejes d = v·t, t = d/v), tal como aparece en el libro
     fuente — se retiró la notación x₀ (posición inicial/final) del
     CÁLCULO en sí, porque introducía una versión más "universitaria"
     de la fórmula que puede confundir a un estudiante de décimo año.
     x₀/Δx siguen enseñándose en el Tema 1 como concepto (ya viene de
     U02/U03), pero la fórmula operativa de MRU es simplemente d=v·t.
     ================================================================ */
  let _mruModo = 'explora';
  let _mruV = 10, _mruT = 5;
  function renderSim1() {
    if (_mruModo === 'desafio') return _renderMruDesafio();
    const d = _mruV * _mruT;
    const anchoPista = 600;
    const escalaMax = 300;
    const posPx = Math.min(anchoPista, Math.max(0, (d / escalaMax) * anchoPista));
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🏁 Pista MRU — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés v y t, y ves qué distancia recorre el móvil.</p>
        <div style="background:var(--bg-elevated);border-radius:10px;padding:1rem;position:relative;height:50px;margin-bottom:1rem;overflow:hidden">
          <div style="position:absolute;left:0;right:0;top:24px;height:2px;background:var(--border)"></div>
          <div style="position:absolute;left:${posPx}px;top:10px;font-size:1.6rem;transition:left .3s">🚗</div>
        </div>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad v = <strong style="color:${C}">${_mruV} m/s</strong></label>
        <input type="range" id="mru-slider-v" min="0" max="20" step="1" value="${_mruV}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Tiempo t = <strong style="color:${C}">${_mruT} s</strong></label>
        <input type="range" id="mru-slider-t" min="0" max="15" step="1" value="${_mruT}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.9rem">
          d = v·t = (${_mruV})(${_mruT}) = <strong style="color:${C}">${d} m</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="mru-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const MRU_RONDAS = [
    { v: 5, t: 8 }, { v: 12, t: 6 }, { v: 8, t: 10 },
    { v: 20, t: 3 }, { v: 6, t: 15 }, { v: 15, t: 4 }
  ];
  let _mruDesafioIdx = 0;
  function _renderMruDesafio() {
    if (_mruDesafioIdx >= MRU_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${MRU_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = MRU_RONDAS[_mruDesafioIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="mru-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_mruDesafioIdx + 1} de ${MRU_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">Un móvil viaja a v = ${r.v} m/s, durante t = ${r.t} s.</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
          d = v · t
        </div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué distancia recorrerá?</p>
        <input type="number" id="mru-respuesta" placeholder="Distancia (m)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="mru-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="mru-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "AceleraLab": Modo Explora + Modo Desafío
     ================================================================ */
  let _acModo = 'explora';
  let _acV0 = 4, _acA = 2, _acT = 3;
  function renderSim2() {
    if (_acModo === 'desafio') return _renderAcDesafio();
    const vf = _acV0 + _acA * _acT;
    const d = _acV0 * _acT + (_acA * _acT * _acT) / 2;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🚀 AceleraLab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés v₀, a y t, y ves cómo cambian la velocidad final y la distancia.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad inicial v₀ = <strong style="color:${C}">${_acV0} m/s</strong></label>
        <input type="range" id="ac-slider-v0" min="0" max="20" step="1" value="${_acV0}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Aceleración a = <strong style="color:${C}">${_acA} m/s²</strong> ${_acA > 0 ? '(acelerando)' : _acA < 0 ? '(frenando)' : '(sin cambio — MRU)'}</label>
        <input type="range" id="ac-slider-a" min="-5" max="5" step="1" value="${_acA}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Tiempo t = <strong style="color:${C}">${_acT} s</strong></label>
        <input type="range" id="ac-slider-t" min="0" max="10" step="1" value="${_acT}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.88rem;line-height:1.7">
          vf = v₀ + a·t = ${_acV0} + (${_acA})(${_acT}) = <strong style="color:${C}">${vf} m/s</strong><br>
          d = v₀·t + at²/2 = <strong style="color:var(--cyan)">${d.toFixed(1)} m</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="ac-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const AC_RONDAS = [
    { v0: 0, a: 2, t: 5, pide: 'vf' }, { v0: 4, a: 2, t: 5, pide: 'vf' },
    { v0: 10, a: -2, t: 4, pide: 'vf' }, { v0: 0, a: 3, t: 6, pide: 'd' },
    { v0: 5, a: 1, t: 4, pide: 'd' }, { v0: 20, a: -4, t: 5, pide: 'vf' }
  ];
  let _acDesafioIdx = 0;
  function _renderAcDesafio() {
    if (_acDesafioIdx >= AC_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${AC_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = AC_RONDAS[_acDesafioIdx];
    const pideTexto = r.pide === 'vf' ? '¿Cuál será la velocidad final (vf)?' : '¿Qué distancia recorrerá (d)?';
    const formulaTexto = r.pide === 'vf' ? 'vf = v₀ + a · t' : 'd = v₀·t + (a·t²)/2';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="ac-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_acDesafioIdx + 1} de ${AC_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">v₀ = ${r.v0} m/s, a = ${r.a} m/s², t = ${r.t} s.</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
          ${formulaTexto}
        </div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" id="ac-respuesta" placeholder="${r.pide === 'vf' ? 'vf (m/s)' : 'd (m)'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="ac-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="ac-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Torre de Galileo": predice antes de soltar
     ================================================================ */
  const G = 9.8;
  const TORRE_RONDAS = [
    { altura: 44.1, tipo: 'caida' }, { altura: 78.4, tipo: 'caida' },
    { v0: 19.6, tipo: 'tiro' }, { v0: 29.4, tipo: 'tiro' }
  ];
  let _torreIdx = 0, _torreFase = 'prediccion';
  function renderSim3() {
    if (_torreIdx >= TORRE_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${TORRE_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = TORRE_RONDAS[_torreIdx];
    if (r.tipo === 'caida') {
      const tCaida = Math.sqrt((2 * r.altura) / G);
      if (_torreFase === 'prediccion') {
        return `
          <div>
            <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
            <h3 style="margin:0 0 .3rem">🗼 Torre de Galileo</h3>
            <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_torreIdx + 1} de ${TORRE_RONDAS.length} — Caída libre</p>
            <p style="margin-bottom:.8rem">Se suelta un objeto desde ${r.altura} m de altura (vi = 0, g = 9,8 m/s²).</p>
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
              h = vi·t + (g·t²)/2
            </div>
            <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">Antes de soltarlo: ¿cuánto tiempo tardará en llegar al suelo?</p>
            <input type="number" id="torre-respuesta" step="0.1" placeholder="Tiempo (s)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
            <button class="btn btn-primary btn-sm" id="torre-soltar" style="margin-top:1rem;display:block">Soltar y comprobar</button>
            <p id="torre-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
          </div>`;
      }
      return `
        <div style="text-align:center">
          <p style="font-size:2rem">🪨⬇️</p>
          <p>Tiempo real de caída: <strong style="color:${C}">${tCaida.toFixed(2)} s</strong></p>
          <button class="btn btn-primary btn-sm" id="torre-siguiente" style="margin-top:1rem">Siguiente ronda →</button>
        </div>`;
    } else {
      const tSubida = r.v0 / G;
      const hMax = (r.v0 * r.v0) / (2 * G);
      if (_torreFase === 'prediccion') {
        return `
          <div>
            <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
            <h3 style="margin:0 0 .3rem">🗼 Torre de Galileo</h3>
            <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_torreIdx + 1} de ${TORRE_RONDAS.length} — Tiro vertical</p>
            <p style="margin-bottom:.8rem">Se lanza un objeto hacia arriba con vi = ${r.v0} m/s (g = −9,8 m/s²).</p>
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
              t = (vf − vi) / g
            </div>
            <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">Antes de lanzarlo: ¿cuánto tiempo tardará en llegar a su altura máxima (donde vf = 0)?</p>
            <input type="number" id="torre-respuesta" step="0.1" placeholder="Tiempo (s)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
            <button class="btn btn-primary btn-sm" id="torre-soltar" style="margin-top:1rem;display:block">Lanzar y comprobar</button>
            <p id="torre-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
          </div>`;
      }
      return `
        <div style="text-align:center">
          <p style="font-size:2rem">🪨⬆️</p>
          <p>Tiempo real a la altura máxima: <strong style="color:${C}">${tSubida.toFixed(2)} s</strong> (h_max = ${hMax.toFixed(1)} m)</p>
          <button class="btn btn-primary btn-sm" id="torre-siguiente" style="margin-top:1rem">Siguiente ronda →</button>
        </div>`;
    }
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
      { id: 'sim1', titulo: '🏁 Pista MRU', desc: 'Modo Explora (x₀, v, t) y Modo Desafío: predecí dónde estará el móvil.' },
      { id: 'sim2', titulo: '🚀 AceleraLab MQC', desc: 'Controlá v₀, a y t, y observá cómo cambian velocidad final y distancia.' },
      { id: 'sim3', titulo: '🗼 Torre de Galileo', desc: 'Predecí antes de soltar: caída libre y tiro vertical.' }
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
        _mruModo = 'explora'; _mruDesafioIdx = 0;
        _acModo = 'explora'; _acDesafioIdx = 0;
        _torreIdx = 0; _torreFase = 'prediccion';
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Pista MRU */
    const s1v = document.getElementById('mru-slider-v');
    const s1t = document.getElementById('mru-slider-t');
    if (s1v) s1v.addEventListener('input', () => { _mruV = parseInt(s1v.value, 10); _rerenderSimTab(unit); });
    if (s1t) s1t.addEventListener('input', () => { _mruT = parseInt(s1t.value, 10); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('mru-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _mruModo = 'desafio'; _mruDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('mru-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _mruModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarMru = document.getElementById('mru-comprobar');
    if (comprobarMru) comprobarMru.addEventListener('click', () => {
      const r = MRU_RONDAS[_mruDesafioIdx];
      const esperado = r.v * r.t;
      const val = parseFloat(document.getElementById('mru-respuesta').value);
      const fb = document.getElementById('mru-feedback');
      const ok = Math.abs(val - esperado) <= 0.5;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. d = v · t = (${r.v})(${r.t}) = ${esperado} m.`;
        if (ok) setTimeout(() => { _mruDesafioIdx++; _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — AceleraLab */
    const s2v0 = document.getElementById('ac-slider-v0');
    const s2a = document.getElementById('ac-slider-a');
    const s2t = document.getElementById('ac-slider-t');
    if (s2v0) s2v0.addEventListener('input', () => { _acV0 = parseInt(s2v0.value, 10); _rerenderSimTab(unit); });
    if (s2a) s2a.addEventListener('input', () => { _acA = parseInt(s2a.value, 10); _rerenderSimTab(unit); });
    if (s2t) s2t.addEventListener('input', () => { _acT = parseInt(s2t.value, 10); _rerenderSimTab(unit); });
    const irDesafio2 = document.getElementById('ac-ir-desafio');
    if (irDesafio2) irDesafio2.addEventListener('click', () => { _acModo = 'desafio'; _acDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora2 = document.getElementById('ac-ir-explora');
    if (irExplora2) irExplora2.addEventListener('click', () => { _acModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarAc = document.getElementById('ac-comprobar');
    if (comprobarAc) comprobarAc.addEventListener('click', () => {
      const r = AC_RONDAS[_acDesafioIdx];
      const esperado = r.pide === 'vf' ? (r.v0 + r.a * r.t) : (r.v0 * r.t + (r.a * r.t * r.t) / 2);
      const val = parseFloat(document.getElementById('ac-respuesta').value);
      const fb = document.getElementById('ac-feedback');
      const ok = Math.abs(val - esperado) <= 0.5;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${esperado.toFixed(1)} ${r.pide === 'vf' ? 'm/s' : 'm'}.`;
        if (ok) setTimeout(() => { _acDesafioIdx++; _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim3 — Torre de Galileo */
    const torreSoltar = document.getElementById('torre-soltar');
    if (torreSoltar) torreSoltar.addEventListener('click', () => {
      const r = TORRE_RONDAS[_torreIdx];
      const esperado = r.tipo === 'caida' ? Math.sqrt((2 * r.altura) / G) : (r.v0 / G);
      const val = parseFloat(document.getElementById('torre-respuesta').value);
      const fb = document.getElementById('torre-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.3;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Buena predicción!' : `💡 Veamos qué pasó en realidad...`;
      }
      _torreFase = 'resultado';
      setTimeout(() => _rerenderSimTab(unit), 900);
    });
    const torreSiguiente = document.getElementById('torre-siguiente');
    if (torreSiguiente) torreSiguiente.addEventListener('click', () => {
      _torreIdx++; _torreFase = 'prediccion';
      if (_torreIdx >= TORRE_RONDAS.length) markSimDone('sim3');
      _rerenderSimTab(unit);
    });
  }

  /* ================================================================
     JUEGO — "Control de Movimiento": 6 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un móvil parte de x₀ = 15 m y llega a x = 55 m.',
      pregunta: '¿Cuál es su cambio de posición (Δx)?',
      pista: 'Restá la posición final menos la posición inicial.',
      correcta: '40 m', opciones: ['40 m', '55 m', '15 m', '70 m'] },
    { id: 'nivel2', escenario: 'Un tren recorre 300 m en 20 s, manteniendo su velocidad constante todo el tiempo.',
      pregunta: '¿A qué velocidad viaja el tren?',
      pista: 'Aplicá v = d/t con los datos dados.',
      correcta: '15 m/s', opciones: ['15 m/s', '20 m/s', '300 m/s', '6.000 m/s'] },
    { id: 'nivel3', escenario: 'Un ciclista mantiene exactamente la misma velocidad durante todo su recorrido.',
      pregunta: '¿Cuál es su aceleración?',
      pista: 'Pensá en qué significa que la velocidad no cambie con el tiempo.',
      correcta: '0 m/s²', opciones: ['0 m/s²', 'Igual a su velocidad', 'Siempre negativa', 'No se puede determinar'] },
    { id: 'nivel4', escenario: 'Un auto parte del reposo (vi = 0) y acelera a 3 m/s² durante 4 segundos.',
      pregunta: '¿Cuál es su velocidad final?',
      pista: 'Recordá que "parte del reposo" significa vi = 0, y aplicá vf = vi + a·t.',
      correcta: '12 m/s', opciones: ['12 m/s', '3 m/s', '4 m/s', '7 m/s'] },
    { id: 'nivel5', escenario: 'Se lanza una pelota hacia arriba. En el punto más alto de su trayectoria, la velocidad es momentáneamente cero.',
      pregunta: '¿Qué ocurre con la aceleración en ese instante?',
      pista: 'Pensá en si la gravedad deja de actuar solo porque la velocidad sea cero.',
      correcta: 'Sigue siendo g (9,8 m/s²) hacia abajo', opciones: ['Sigue siendo g (9,8 m/s²) hacia abajo', 'Es cero, igual que la velocidad', 'Cambia de dirección hacia arriba', 'Deja de existir en ese instante'] },
    { id: 'nivel6', escenario: 'Un proyectil es lanzado con cierto ángulo, y su velocidad horizontal (Vx) se mantiene en 20 m/s durante todo el vuelo.',
      pregunta: '¿Por qué Vx no cambia, aunque Vy sí lo hace?',
      pista: 'Pensá en qué fuerza actúa sobre el proyectil, y en qué dirección actúa esa fuerza.',
      correcta: 'Porque la gravedad actúa verticalmente, no afecta el movimiento horizontal', opciones: ['Porque la gravedad actúa verticalmente, no afecta el movimiento horizontal', 'Porque Vx siempre es mayor que Vy', 'Porque el aire empuja el proyectil hacia adelante', 'Porque Vx y Vy siempre son iguales'] }
  ];
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
        <h3 style="margin:0 0 .3rem">🎮 Control de Movimiento</h3>
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
     EXAMEN — banco real (js/data/banco-fix10-u04.js), 30 por intento
     (esta unidad, más extensa, usa 30 en vez de 20 — indicado
     explícitamente en el sprint de U04).
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U04 !== 'undefined') ? PREGUNTAS_FIX10_U04 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U04</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 30 al azar.</p>
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
        const seleccionadas = banco.slice(0, Math.min(30, banco.length));
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
     MISIÓN FINAL — "Reconstruir el Movimiento" (investigador con
     datos incompletos, validación numérica con tolerancia)
     ================================================================ */
  const MISION_DATOS = { vi: 8, a: 3, t: 6 };
  const MISION_VF_ESPERADA = MISION_DATOS.vi + MISION_DATOS.a * MISION_DATOS.t;
  const MISION_D_ESPERADA = MISION_DATOS.vi * MISION_DATOS.t + (MISION_DATOS.a * MISION_DATOS.t * MISION_DATOS.t) / 2;
  const MISION_TEXTO_MIN = 25, MISION_TEXTO_MAX = 220;
  let _misionVals = { tipo: '', vf: '', d: '', texto: '' };

  function _misionValida() {
    const vf = parseFloat(_misionVals.vf);
    const d = parseFloat(_misionVals.d);
    if (_misionVals.tipo !== 'MRUA') return false;
    if (isNaN(vf) || Math.abs(vf - MISION_VF_ESPERADA) > 1) return false;
    if (isNaN(d) || Math.abs(d - MISION_D_ESPERADA) > 2) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_TEXTO_MIN && len <= MISION_TEXTO_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Reconstruir el Movimiento".</p></div>`;
    }
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:580px">
        <h3>🔬 Misión: Reconstruir el Movimiento</h3>
        <p style="color:var(--text-secondary)">Un registro dañado del laboratorio MQC dice: "el móvil partió con v₀ = ${MISION_DATOS.vi} m/s, aceleró a razón de ${MISION_DATOS.a} m/s², durante ${MISION_DATOS.t} segundos".</p>

        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.8rem 0">
          A. ¿Qué tipo de movimiento es?
          <select id="mision-tipo" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
            <option value="">— Elegir —</option>
            <option value="MRU" ${_misionVals.tipo === 'MRU' ? 'selected' : ''}>MRU</option>
            <option value="MRUA" ${_misionVals.tipo === 'MRUA' ? 'selected' : ''}>MRUA</option>
          </select>
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          B. Velocidad final (vf):
          <input type="number" id="mision-vf" value="${_misionVals.vf}" placeholder="m/s" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          C. Distancia recorrida (d):
          <input type="number" id="mision-d" value="${_misionVals.d}" placeholder="m" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          D. ¿Qué significa físicamente este resultado?
          <textarea id="mision-texto" rows="3" maxlength="${MISION_TEXTO_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_TEXTO_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_TEXTO_MAX} caracteres (mínimo ${MISION_TEXTO_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    ['tipo', 'vf', 'd', 'texto'].forEach(key => {
      const idMap = { tipo: 'mision-tipo', vf: 'mision-vf', d: 'mision-d', texto: 'mision-texto' };
      const el = document.getElementById(idMap[key]);
      if (el) {
        el.addEventListener('input', () => {
          _misionVals[key] = el.value;
          const btn = document.getElementById('fix10-entregar-mision');
          if (btn) {
            const valido = _misionValida();
            btn.disabled = !valido;
            btn.style.opacity = valido ? '' : '.5';
            btn.style.cursor = valido ? '' : 'not-allowed';
          }
        });
        if (el.tagName === 'SELECT') el.addEventListener('change', () => el.dispatchEvent(new Event('input')));
      }
    });
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte.';
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
