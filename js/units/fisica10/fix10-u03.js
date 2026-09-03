/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u03.js
   FIX10-U03 — Movimiento Relativo
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad III, Tema 3, apartados 3.1-3.2, Casos
   1 a 5). Mismo patrón de plugin exacto que fix10-u01.js/fix10-u02.js
   — apunta a Storage.updateFisica10Unit / markFisica10TopicRead /
   data.fisica10. FIX10-U01 y FIX10-U02 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u03';
  const C = 'var(--violet)';

  const TEMAS = [
    { id: 't1', icon: '👁️', titulo: '¿Quién se está moviendo?',
      ideaClave: 'Movimiento y reposo no pueden describirse correctamente sin indicar "respecto de qué".',
      explicacion: 'Un movimiento es <strong>relativo</strong>, porque depende del observador que lo evalúe. El <strong>marco de referencia</strong> es el punto de observación desde el cual se evalúa un movimiento — se representa gráficamente por el punto (0,0) de un plano cartesiano. Para la mayoría de las observaciones cotidianas, el marco de referencia es la propia Tierra, por eso casi nunca lo mencionamos explícitamente.',
      ejemplo: 'Una persona sentada dentro de un autobús: respecto del asiento, está en reposo. Respecto de la carretera (o de alguien parado en la vereda), está en movimiento. Ninguna de las dos afirmaciones es "más correcta" — ambas son válidas, cada una respecto de su propio marco de referencia.',
      aplicacion: 'Incluso algo que parece obviamente "en reposo" (como una persona descansando en su sillón) en realidad se mueve a gran velocidad si el marco de referencia es el espacio exterior, ya que la Tierra tiene movimientos de rotación y traslación.',
      compruebra: 'Un florero sobre una mesa, ¿está en movimiento o en reposo? ¿Tu respuesta cambia si el marco de referencia es la mesa, o si es el Sol?' },

    { id: 't2', icon: '🔢', titulo: 'Velocidad relativa',
      ideaClave: 'La notación V(AB) significa "velocidad de A respecto de B" — con qué velocidad el observador B ve moverse a A.',
      explicacion: 'Estos casos se aplican a móviles que viajan a <strong>velocidad constante</strong>. El primer caso especial e importante: la velocidad de un móvil respecto de sí mismo siempre es <strong>cero</strong>. Un móvil, respecto a un observador dentro de él, no percibe ningún cambio de posición en relación con el tiempo — por lo tanto no percibe movimiento.',
      ejemplo: 'Un auto A viaja a 20 km/h. La velocidad de A respecto de un observador DENTRO de A (V(AA)) es 0 — el conductor no percibe que se mueve respecto de su propio asiento, aunque respecto de la carretera sí se esté moviendo a 20 km/h.',
      aplicacion: 'Este caso es la base para entender todos los demás: cualquier cálculo de velocidad relativa depende de QUIÉN es el observador (el marco de referencia), no solo de las velocidades involucradas.',
      compruebra: 'Si vas sentado en un tren que viaja a 90 km/h, ¿cuál es tu velocidad respecto del propio tren?' },

    { id: 't3', icon: '🔀', titulo: 'Móviles en la misma y en distinta dirección',
      ideaClave: 'Cuando dos móviles van en el MISMO sentido, sus velocidades se restan. Cuando van en sentidos CONTRARIOS, se suman — pero esto no es una regla mágica: sale de usar signos según la dirección.',
      explicacion: 'Si dos móviles A y B viajan hacia la <strong>misma dirección</strong>, la velocidad relativa equivale a la resta de las velocidades marcadas por sus velocímetros, para un observador en uno de los móviles. Si viajan en <strong>direcciones contrarias</strong> (acercándose o alejándose), la velocidad relativa equivale a la suma de esas velocidades. Si varios móviles viajan exactamente a la misma velocidad y dirección, su velocidad relativa entre ellos es cero.',
      ejemplo: 'Mismo sentido: A = 80 km/h Este, B = 50 km/h Este → V(AB) = 30 km/h Este, V(BA) = 30 km/h Oeste. Direcciones contrarias (acercándose): A = 75 km/h Este, B = 45 km/h Oeste → V(AB) = 120 km/h Este.',
      aplicacion: 'La forma correcta de pensarlo NO es memorizar "mismo sentido resta, contrario suma" — es asignar un signo a cada dirección (por ejemplo, Este positivo, Oeste negativo) y calcular V(AB) = V(A) − V(B) usando esos signos. La resta o la suma "aparente" es solo el resultado de esa convención.',
      compruebra: 'Si A = 55 km/h Oeste y B = 85 km/h Este (alejándose uno del otro), ¿la velocidad relativa entre ellos se parece más a una suma o a una resta de las magnitudes?' },

    { id: 't4', icon: '⛵', titulo: 'Movimiento relativo en situaciones reales',
      ideaClave: 'Un móvil dentro de otro móvil (como una persona caminando sobre un barco) tiene una velocidad relativa distinta según quién observe.',
      explicacion: 'Cuando un móvil (por ejemplo, una persona) se mueve dentro de otro móvil (un barco) que también está en movimiento, un observador en <strong>tierra</strong> debe considerar AMBAS velocidades combinadas, mientras que un observador que está <strong>dentro del mismo móvil</strong> (por ejemplo, otra persona parada en el barco) solo percibe la velocidad de la persona que camina, no la del barco.',
      ejemplo: 'Una persona A camina a 2 km/h al Norte, sobre la cubierta de un barco B que viaja a 40 km/h al Sur. Un observador D en la playa ve a A moverse a 40 − 2 = 38 km/h Sur (las direcciones son opuestas, por eso se restan). Un observador C parado en el mismo barco ve a A moverse solo a 2 km/h Norte — no percibe el movimiento del barco, porque él también viaja con el barco.',
      aplicacion: 'El mismo razonamiento aplica a un pasajero caminando dentro de un tren o un avión: la velocidad que percibe alguien en tierra combina la velocidad del vehículo con la de la persona; la velocidad que percibe alguien más dentro del mismo vehículo solo refleja el movimiento relativo entre ambos pasajeros.',
      compruebra: 'Si la persona del ejemplo caminara hacia el Sur (mismo sentido que el barco) en vez de hacia el Norte, ¿su velocidad respecto a tierra sería mayor o menor que 38 km/h?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01.js/u02.js) ──── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
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
     TEORÍA — 4 temas en acordeón (mismo patrón que U01/U02)
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
     SIMULADOR 1 — "Laboratorio de Referencia": Modo Explora (elegir
     observador: Tierra/Auto A/Auto B) + Modo Desafío (8 rondas).
     ================================================================ */
  const LAB_ESCENARIO = { va: 80, dirA: 'Este', vb: 50, dirB: 'Este' };
  function _opuesta(dir) { return dir === 'Este' ? 'Oeste' : dir === 'Oeste' ? 'Este' : dir === 'Norte' ? 'Sur' : 'Norte'; }
  function _signoDir(dir) { return (dir === 'Este' || dir === 'Norte') ? 1 : -1; }
  function _calcularRelativa(va, dirA, vb, dirB) {
    const signoA = _signoDir(dirA) * va;
    const signoB = _signoDir(dirB) * vb;
    const rel = signoA - signoB; // V(AB) = V(A) - V(B), con signos
    const ejeA = (dirA === 'Este' || dirA === 'Oeste') ? 'EO' : 'NS';
    const dirPositiva = ejeA === 'EO' ? 'Este' : 'Norte';
    const dirNegativa = ejeA === 'EO' ? 'Oeste' : 'Sur';
    return { magnitud: Math.abs(rel), direccion: rel === 0 ? '—' : (rel > 0 ? dirPositiva : dirNegativa) };
  }

  let _labModo = 'explora'; // 'explora' | 'desafio'
  let _labObservador = 'tierra';
  function renderSim1() {
    if (_labModo === 'desafio') return _renderLabDesafio();
    const { va, dirA, vb, dirB } = LAB_ESCENARIO;
    let mostrarA, mostrarB;
    if (_labObservador === 'tierra') { mostrarA = `${va} km/h ${dirA}`; mostrarB = `${vb} km/h ${dirB}`; }
    else if (_labObservador === 'autoA') {
      const rAB = _calcularRelativa(vb, dirB, va, dirA); // B respecto de A
      mostrarA = '0 km/h (en reposo respecto de sí mismo)';
      mostrarB = `${rAB.magnitud} km/h ${rAB.direccion}`;
    } else {
      const rBA = _calcularRelativa(va, dirA, vb, dirB); // A respecto de B
      mostrarB = '0 km/h (en reposo respecto de sí mismo)';
      mostrarA = `${rBA.magnitud} km/h ${rBA.direccion}`;
    }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🎯 Laboratorio de Referencia — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Auto A = ${va} km/h ${dirA} · Auto B = ${vb} km/h ${dirB} (medidos desde Tierra). Elegí el observador:</p>
        <div style="display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap">
          <button class="btn ${_labObservador === 'tierra' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-lab-obs="tierra">🌍 Tierra</button>
          <button class="btn ${_labObservador === 'autoA' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-lab-obs="autoA">🚗 Auto A</button>
          <button class="btn ${_labObservador === 'autoB' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-lab-obs="autoB">🚙 Auto B</button>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;font-family:var(--font-code);font-size:.9rem;line-height:1.8">
          Velocidad de A: <strong style="color:${C}">${mostrarA}</strong><br>
          Velocidad de B: <strong style="color:var(--cyan)">${mostrarB}</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="lab-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }

  const LAB_RONDAS = [
    { va: 90, dirA: 'Este', vb: 60, dirB: 'Este', pregunta: '¿Qué velocidad observa el conductor de B para A?', desdeB: true },
    { va: 70, dirA: 'Norte', vb: 40, dirB: 'Sur', pregunta: '¿Qué velocidad observa el conductor de A para B?', desdeB: false },
    { va: 100, dirA: 'Este', vb: 100, dirB: 'Este', pregunta: '¿Qué velocidad observa el conductor de A para B?', desdeB: false },
    { va: 35, dirA: 'Oeste', vb: 85, dirB: 'Este', pregunta: '¿Qué velocidad observa el conductor de B para A?', desdeB: true },
    { va: 60, dirA: 'Norte', vb: 20, dirB: 'Norte', pregunta: '¿Qué velocidad observa el conductor de A para B?', desdeB: false },
    { va: 45, dirA: 'Sur', vb: 45, dirB: 'Norte', pregunta: '¿Qué velocidad observa el conductor de B para A?', desdeB: true },
    { va: 20, dirA: 'Este', vb: 85, dirB: 'Este', pregunta: '¿Qué velocidad observa el conductor de A para B?', desdeB: false },
    { va: 90, dirA: 'Sur', vb: 35, dirB: 'Norte', pregunta: '¿Qué velocidad observa el conductor de B para A?', desdeB: true }
  ];
  let _labRondaIdx = 0;
  function _renderLabDesafio() {
    if (_labRondaIdx >= LAB_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 8 rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = LAB_RONDAS[_labRondaIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="lab-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_labRondaIdx + 1} de ${LAB_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">Auto A = ${r.va} km/h ${r.dirA} &nbsp;|&nbsp; Auto B = ${r.vb} km/h ${r.dirB}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${r.pregunta}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;max-width:360px">
          <input type="number" id="lab-mag" placeholder="Magnitud (km/h)" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
          <select id="lab-dir" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
            <option value="Este">Este</option><option value="Oeste">Oeste</option><option value="Norte">Norte</option><option value="Sur">Sur</option>
          </select>
        </div>
        <button class="btn btn-primary btn-sm" id="lab-comprobar" style="margin-top:1rem">Comprobar</button>
        <p id="lab-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Encuentro en la Carretera": predicción antes de
     calcular, mismo sentido / sentido opuesto, valores ajustables.
     ================================================================ */
  const ENCUENTRO_RONDAS = [
    { va: 80, dirA: 'Este', vb: 50, dirB: 'Este' },
    { va: 75, dirA: 'Este', vb: 45, dirB: 'Oeste' },
    { va: 40, dirA: 'Este', vb: 40, dirB: 'Este' },
    { va: 55, dirA: 'Oeste', vb: 85, dirB: 'Este' },
    { va: 90, dirA: 'Norte', vb: 30, dirB: 'Norte' }
  ];
  let _encIdx = 0, _encFase = 'prediccion'; // 'prediccion' | 'ejecutar' | 'resultado'
  function renderSim2() {
    if (_encIdx >= ENCUENTRO_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 5 rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = ENCUENTRO_RONDAS[_encIdx];
    const rel = _calcularRelativa(r.va, r.dirA, r.vb, r.dirB);
    const mismoSentido = r.dirA === r.dirB;
    if (_encFase === 'prediccion') {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
          <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_encIdx + 1} de ${ENCUENTRO_RONDAS.length}</p>
          <p style="margin-bottom:.8rem">Auto A = ${r.va} km/h ${r.dirA} &nbsp;|&nbsp; Auto B = ${r.vb} km/h ${r.dirB}</p>
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">Antes de calcular: la velocidad relativa entre A y B, ¿te parece que va a ser MENOR, IGUAL, o MAYOR que la mayor de las dos velocidades (${Math.max(r.va, r.vb)} km/h)?</p>
          <div style="display:flex;gap:.5rem">
            <button class="btn btn-ghost" data-enc-prediccion="menor">Menor</button>
            <button class="btn btn-ghost" data-enc-prediccion="igual">Igual</button>
            <button class="btn btn-ghost" data-enc-prediccion="mayor">Mayor</button>
          </div>
        </div>`;
    }
    if (_encFase === 'ejecutar') {
      return `
        <div>
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Los autos avanzan según sus velocidades y direcciones reales...</p>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;text-align:center">
            ${mismoSentido ? '🚗 → &nbsp;&nbsp;&nbsp; 🚙 →' : (r.dirA === 'Oeste' ? '← 🚗 &nbsp;&nbsp;&nbsp; 🚙 →' : '🚗 → &nbsp;&nbsp;&nbsp; ← 🚙')}
          </div>
          <button class="btn btn-primary btn-sm" id="enc-calcular" style="margin-top:1rem">Calcular velocidad relativa</button>
        </div>`;
    }
    return `
      <div>
        <p style="margin-bottom:.6rem">Auto A = ${r.va} km/h ${r.dirA} &nbsp;|&nbsp; Auto B = ${r.vb} km/h ${r.dirB}</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;font-family:var(--font-code);font-size:.9rem">
          V(AB) = ${rel.magnitud} km/h ${rel.direccion}
        </div>
        <p style="color:var(--text-muted);font-size:.78rem;margin-top:.6rem">${mismoSentido ? 'Mismo sentido: los signos hicieron que se restaran.' : 'Sentidos contrarios: los signos hicieron que se sumaran.'}</p>
        <button class="btn btn-primary btn-sm" id="enc-siguiente" style="margin-top:1rem">Siguiente ronda →</button>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Sobre la Cubierta": barco + persona, con variantes
     ================================================================ */
  const CUBIERTA_RONDAS = [
    { vBarco: 40, dirBarco: 'Sur', vPersona: 2, dirPersona: 'Norte' },
    { vBarco: 40, dirBarco: 'Sur', vPersona: 2, dirPersona: 'Sur' },
    { vBarco: 30, dirBarco: 'Este', vPersona: 5, dirPersona: 'Oeste' },
    { vBarco: 25, dirBarco: 'Norte', vPersona: 3, dirPersona: 'Norte' }
  ];
  let _cubIdx = 0;
  function renderSim3() {
    if (_cubIdx >= CUBIERTA_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 4 rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = CUBIERTA_RONDAS[_cubIdx];
    const relTierra = _calcularRelativa(r.vBarco, r.dirBarco, 0, r.dirBarco); // placeholder, se recalcula abajo
    // Persona respecto a tierra: se suman/restan según dirección relativa al barco
    const signoBarco = _signoDir(r.dirBarco) * r.vBarco;
    const signoPersona = _signoDir(r.dirPersona) * r.vPersona;
    const combinada = signoBarco + signoPersona;
    const ejeBarco = (r.dirBarco === 'Este' || r.dirBarco === 'Oeste') ? ['Este', 'Oeste'] : ['Norte', 'Sur'];
    const dirResultado = combinada === 0 ? '—' : (combinada > 0 ? ejeBarco[0] : ejeBarco[1]);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">⛵ Sobre la Cubierta</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_cubIdx + 1} de ${CUBIERTA_RONDAS.length}</p>
        <p style="margin-bottom:.8rem">Barco: ${r.vBarco} km/h ${r.dirBarco} &nbsp;|&nbsp; Persona (respecto del barco): ${r.vPersona} km/h ${r.dirPersona}</p>
        <div id="cub-pregunta">
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">A. ¿Cuál es la velocidad de la persona respecto del <strong>barco</strong> (un observador parado en la cubierta)?</p>
          <button class="btn btn-ghost btn-sm" data-cub-respuesta-a>${r.vPersona} km/h ${r.dirPersona}</button>
          <button class="btn btn-ghost btn-sm" data-cub-respuesta-a>0 km/h</button>
          <button class="btn btn-ghost btn-sm" data-cub-respuesta-a>${r.vBarco} km/h ${r.dirBarco}</button>
        </div>
        <p id="cub-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
        <div id="cub-parte-b" style="display:none;margin-top:1rem">
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">B. ¿Cuál es la velocidad de la persona respecto de <strong>tierra</strong>?</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;max-width:340px">
            <input type="number" id="cub-mag" placeholder="Magnitud (km/h)" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
            <select id="cub-dir" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
              <option value="Norte">Norte</option><option value="Sur">Sur</option><option value="Este">Este</option><option value="Oeste">Oeste</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" id="cub-comprobar-b" style="margin-top:.8rem">Comprobar</button>
          <p id="cub-feedback-b" style="margin-top:.6rem;font-size:.85rem"></p>
        </div>
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
      { id: 'sim1', titulo: '🎯 Laboratorio de Referencia', desc: 'Elegí el observador (Tierra, Auto A o Auto B) y descubrí cómo cambia la velocidad medida. El simulador estrella de esta unidad.' },
      { id: 'sim2', titulo: '🛣️ Encuentro en la Carretera', desc: 'Predecí, ejecutá, y calculá la velocidad relativa entre dos autos.' },
      { id: 'sim3', titulo: '⛵ Sobre la Cubierta', desc: 'Una persona camina sobre un barco en movimiento — ¿qué ve alguien en tierra? ¿Y alguien en el barco?' }
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
        _labModo = 'explora'; _labObservador = 'tierra'; _labRondaIdx = 0;
        _encIdx = 0; _encFase = 'prediccion';
        _cubIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Laboratorio de Referencia */
    document.querySelectorAll('[data-lab-obs]').forEach(btn => {
      btn.addEventListener('click', () => { _labObservador = btn.getAttribute('data-lab-obs'); _rerenderSimTab(unit); });
    });
    const irDesafio1 = document.getElementById('lab-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _labModo = 'desafio'; _labRondaIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('lab-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _labModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarLab = document.getElementById('lab-comprobar');
    if (comprobarLab) comprobarLab.addEventListener('click', () => {
      const r = LAB_RONDAS[_labRondaIdx];
      const esperado = r.desdeB ? _calcularRelativa(r.va, r.dirA, r.vb, r.dirB) : _calcularRelativa(r.vb, r.dirB, r.va, r.dirA);
      const mag = parseFloat(document.getElementById('lab-mag').value);
      const dir = document.getElementById('lab-dir').value;
      const fb = document.getElementById('lab-feedback');
      const ok = Math.abs(mag - esperado.magnitud) <= 1 && dir === esperado.direccion;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${esperado.magnitud} km/h ${esperado.direccion}. Revisá los signos y volvé a intentar.`;
        if (ok) setTimeout(() => { _labRondaIdx++; _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — Encuentro en la Carretera */
    document.querySelectorAll('[data-enc-prediccion]').forEach(btn => {
      btn.addEventListener('click', () => { _encFase = 'ejecutar'; _rerenderSimTab(unit); });
    });
    const encCalcular = document.getElementById('enc-calcular');
    if (encCalcular) encCalcular.addEventListener('click', () => { _encFase = 'resultado'; _rerenderSimTab(unit); });
    const encSiguiente = document.getElementById('enc-siguiente');
    if (encSiguiente) encSiguiente.addEventListener('click', () => {
      _encIdx++; _encFase = 'prediccion';
      if (_encIdx >= ENCUENTRO_RONDAS.length) markSimDone('sim2');
      _rerenderSimTab(unit);
    });

    /* Sim3 — Sobre la Cubierta */
    document.querySelectorAll('[data-cub-respuesta-a]').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = CUBIERTA_RONDAS[_cubIdx];
        const esperado = `${r.vPersona} km/h ${r.dirPersona}`;
        const fb = document.getElementById('cub-feedback');
        const ok = btn.textContent.trim() === esperado;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ Correcto — respecto del barco, solo se percibe el movimiento de la persona.' : `💡 No es esa. Respecto del barco, la persona se mueve a ${esperado} (el barco no se percibe a sí mismo).`;
        }
        document.getElementById('cub-parte-b').style.display = 'block';
      });
    });
    const cubComprobarB = document.getElementById('cub-comprobar-b');
    if (cubComprobarB) cubComprobarB.addEventListener('click', () => {
      const r = CUBIERTA_RONDAS[_cubIdx];
      const signoBarco = _signoDir(r.dirBarco) * r.vBarco;
      const signoPersona = _signoDir(r.dirPersona) * r.vPersona;
      const combinada = signoBarco + signoPersona;
      const ejeBarco = (r.dirBarco === 'Este' || r.dirBarco === 'Oeste') ? ['Este', 'Oeste'] : ['Norte', 'Sur'];
      const magEsperada = Math.abs(combinada);
      const dirEsperada = combinada === 0 ? null : (combinada > 0 ? ejeBarco[0] : ejeBarco[1]);
      const mag = parseFloat(document.getElementById('cub-mag').value);
      const dir = document.getElementById('cub-dir').value;
      const fb = document.getElementById('cub-feedback-b');
      const ok = Math.abs(mag - magEsperada) <= 1 && dir === dirEsperada;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${magEsperada} km/h ${dirEsperada}.`;
        if (ok) setTimeout(() => {
          _cubIdx++;
          if (_cubIdx >= CUBIERTA_RONDAS.length) markSimDone('sim3');
          _rerenderSimTab(unit);
        }, 1600);
      }
    });
  }

  /* ================================================================
     JUEGO — "¿Desde dónde lo ves?": 6 niveles verificables.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Viajás dentro de un tren a 70 km/h y la persona sentada a tu lado permanece en su asiento.',
      pregunta: 'Respecto de vos, ¿cuál es la velocidad de esa persona?',
      pista: 'Pensá en si esa persona cambia de posición respecto de vos con el paso del tiempo.',
      correcta: '0 km/h', opciones: ['0 km/h', '70 km/h', '140 km/h', 'Depende del tiempo'] },
    { id: 'nivel2', escenario: 'Un auto viaja a 60 km/h Este. Un poste de luz está fijo junto a la carretera.',
      pregunta: '¿Cuál es la velocidad del auto respecto del poste (observador fijo)?',
      pista: 'Pensá en si el poste se mueve o no.',
      correcta: '60 km/h Este', opciones: ['60 km/h Este', '0 km/h', '120 km/h Este', '60 km/h Oeste'] },
    { id: 'nivel3', escenario: 'Auto A = 90 km/h Este. Auto B = 60 km/h Este (mismo sentido que A).',
      pregunta: '¿Qué velocidad observa el conductor de B para A?',
      pista: 'Primero elegí cuál auto será tu marco de referencia, y representá el Este con un signo.',
      correcta: '30 km/h Este', opciones: ['30 km/h Este', '150 km/h Este', '30 km/h Oeste', '90 km/h Este'] },
    { id: 'nivel4', escenario: 'Auto A = 70 km/h Norte. Auto B = 50 km/h Sur (sentidos opuestos, acercándose).',
      pregunta: '¿Qué velocidad observa el conductor de A para B?',
      pista: 'Representá Norte y Sur con signos distintos antes de operar.',
      correcta: '120 km/h Sur', opciones: ['120 km/h Sur', '20 km/h Sur', '120 km/h Norte', '20 km/h Norte'] },
    { id: 'nivel5', escenario: 'Un barco viaja a 40 km/h Sur. Una persona camina sobre la cubierta a 2 km/h Norte (respecto del barco).',
      pregunta: '¿Cuál es la velocidad de la persona respecto de un observador en TIERRA?',
      pista: 'Como van en sentidos opuestos, pensá si las magnitudes se suman o se restan.',
      correcta: '38 km/h Sur', opciones: ['38 km/h Sur', '42 km/h Sur', '38 km/h Norte', '2 km/h Sur'] },
    { id: 'nivel6', escenario: 'Auto A = 85 km/h Este. Auto B = 35 km/h Este. Después, B cambia de dirección y pasa a moverse 35 km/h Oeste.',
      pregunta: '¿La velocidad relativa entre A y B fue mayor ANTES o DESPUÉS de que B cambiara de dirección?',
      pista: 'Compará una situación de mismo sentido contra una de sentidos opuestos, con las mismas magnitudes.',
      correcta: 'Después (sentidos opuestos)', opciones: ['Después (sentidos opuestos)', 'Antes (mismo sentido)', 'Es igual en ambos casos', 'No se puede determinar'] }
  ];
  let _juegoNivelActivo = null;
  let _juegoOpcionesMezcladas = [];
  let _juegoFeedback = null;
  function renderJuego(unit, uData) {
    const nivelesHechos = uData.gameLevels || [];
    if (_juegoNivelActivo) {
      const n = NIVELES_JUEGO.find(x => x.id === _juegoNivelActivo);
      return `
        <div class="juego-panel">
          <button class="btn btn-ghost btn-sm" data-juego-volver style="margin-bottom:.8rem">← Volver a los niveles</button>
          <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
          <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${n.pregunta}</p>
          <div style="display:grid;gap:.5rem">
            ${_juegoOpcionesMezcladas.map(op => `<button class="btn btn-ghost" data-juego-opcion="${op}">${op}</button>`).join('')}
          </div>
          ${_juegoFeedback ? `<p style="margin-top:.9rem;font-size:.85rem;color:${_juegoFeedback.correcto ? 'var(--green)' : 'var(--gold)'}">${_juegoFeedback.texto}</p>` : ''}
        </div>`;
    }
    return `
      <div class="juego-panel">
        <h3>👁️ Misión: ¿Desde dónde lo ves?</h3>
        <p style="color:var(--text-secondary);font-size:.85rem">6 niveles — resolvé cada uno respondiendo, no solo mirando.</p>
        <div style="display:grid;gap:.8rem;margin-top:1rem">
          ${NIVELES_JUEGO.map((n, i) => `
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem">
              <p style="margin:0 0 .4rem"><strong>Nivel ${i + 1}:</strong> ${n.escenario}</p>
              ${nivelesHechos.includes(n.id) ? `<p style="color:var(--green);font-size:.85rem;margin-top:.4rem">✅ ${n.correcta}</p>` : `<button class="btn btn-primary btn-sm" data-nivel="${n.id}">Resolver</button>`}
            </div>
          `).join('')}
        </div>
      </div>`;
  }
  function bindJuego(unit, uData) {
    document.querySelectorAll('[data-nivel]').forEach(btn => {
      btn.addEventListener('click', () => {
        _juegoNivelActivo = btn.getAttribute('data-nivel');
        const n = NIVELES_JUEGO.find(x => x.id === _juegoNivelActivo);
        _juegoOpcionesMezcladas = _mezclar(n.opciones);
        _juegoFeedback = null;
        _rerenderJuego(unit);
      });
    });
    const volver = document.querySelector('[data-juego-volver]');
    if (volver) volver.addEventListener('click', () => { _juegoNivelActivo = null; _juegoFeedback = null; _rerenderJuego(unit); });
    document.querySelectorAll('[data-juego-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegida = btn.getAttribute('data-juego-opcion');
        const n = NIVELES_JUEGO.find(x => x.id === _juegoNivelActivo);
        const acierto = elegida === n.correcta;
        if (acierto) {
          const u = loadUnitData();
          const done = Array.isArray(u.gameLevels) ? u.gameLevels.slice() : [];
          const yaResuelto = done.includes(n.id);
          if (!yaResuelto) done.push(n.id);
          patchUnit({ gameLevels: done, gameScore: done.length });
          if (!yaResuelto) awardXP(done.length >= NIVELES_JUEGO.length ? 'game-won' : 'game-played');
          _juegoFeedback = { texto: `✅ ¡Correcto! Es ${n.correcta}.`, correcto: true };
          setTimeout(() => { _juegoNivelActivo = null; _juegoFeedback = null; _rerenderJuego(unit); }, 1500);
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
     EXAMEN — banco real (js/data/banco-fix10-u03.js)
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U03 !== 'undefined') ? PREGUNTAS_FIX10_U03 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U03</h3>
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
        <div style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
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
        if (idx === q.correcta) _examEnCurso.correctas++;
        _examEnCurso.i++;
        if (_examEnCurso.i >= _examEnCurso.preguntas.length) _finalizarExamen(unit);
        else _rerenderExamen(unit);
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
     MISIÓN FINAL — "Operación Persecución" (2 fases, con tolerancia)
     ================================================================ */
  const PERS_FASE1 = { va: 90, dirA: 'Este', vb: 60, dirB: 'Este' };
  const PERS_FASE2 = { va: 90, dirA: 'Este', vb: 60, dirB: 'Oeste' };
  const PERS_D_MIN = 20, PERS_D_MAX = 220;
  let _persFase = 1;
  let _persVals = { marco: '', mag: '', dir: '', explicacion: '' };

  function _persEsperado(fase) {
    const d = fase === 1 ? PERS_FASE1 : PERS_FASE2;
    return _calcularRelativa(d.va, d.dirA, d.vb, d.dirB);
  }
  function _persValida() {
    const esperado = _persEsperado(_persFase);
    const mag = parseFloat(_persVals.mag);
    if (!_persVals.marco || isNaN(mag) || !_persVals.dir) return false;
    if (Math.abs(mag - esperado.magnitud) > 2) return false;
    if (_persVals.dir !== esperado.direccion) return false;
    const len = _persVals.explicacion.trim().length;
    return len >= PERS_D_MIN && len <= PERS_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Operación Persecución".</p></div>`;
    }
    const d = _persFase === 1 ? PERS_FASE1 : PERS_FASE2;
    const dLen = _persVals.explicacion.trim().length;
    return `
      <div style="max-width:560px">
        <h3>🚔 Misión: Operación Persecución ${_persFase === 2 ? '— Fase 2' : ''}</h3>
        <p style="color:var(--text-secondary)">Vehículo A = ${d.va} km/h ${d.dirA} &nbsp;|&nbsp; Vehículo B = ${d.vb} km/h ${d.dirB}</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.6rem 0">
          1. Marco de referencia elegido:
          <select id="pers-marco" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
            <option value="">— Elegir —</option>
            <option value="A" ${_persVals.marco === 'A' ? 'selected' : ''}>Vehículo A</option>
            <option value="B" ${_persVals.marco === 'B' ? 'selected' : ''}>Vehículo B</option>
          </select>
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          2-3. Velocidad relativa (magnitud y dirección):
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.25rem">
            <input type="number" id="pers-mag" value="${_persVals.mag}" placeholder="km/h" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
            <select id="pers-dir" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
              <option value="">— Dirección —</option>
              <option value="Este" ${_persVals.dir === 'Este' ? 'selected' : ''}>Este</option>
              <option value="Oeste" ${_persVals.dir === 'Oeste' ? 'selected' : ''}>Oeste</option>
              <option value="Norte" ${_persVals.dir === 'Norte' ? 'selected' : ''}>Norte</option>
              <option value="Sur" ${_persVals.dir === 'Sur' ? 'selected' : ''}>Sur</option>
            </select>
          </div>
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          4. ¿Qué significa físicamente este resultado?
          <textarea id="pers-explicacion" rows="3" maxlength="${PERS_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_persVals.explicacion}</textarea>
          <span style="font-size:.72rem;color:${dLen >= PERS_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${dLen}/${PERS_D_MAX} caracteres (mínimo ${PERS_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_persValida() ? '' : 'disabled'} style="${_persValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_persFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    ['marco', 'mag', 'dir', 'explicacion'].forEach(key => {
      const el = document.getElementById(`pers-${key}`);
      if (el) el.addEventListener('input', () => {
        _persVals[key] = el.value;
        const btn = document.getElementById('fix10-entregar-mision');
        if (btn) {
          const valido = _persValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    });
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_persValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte.';
          return;
        }
        if (_persFase === 1) {
          _persFase = 2;
          _persVals = { marco: '', mag: '', dir: '', explicacion: '' };
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
