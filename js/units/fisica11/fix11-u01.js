/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u01.js
   FIX11-U01 — Hidrostática
   ================================================================
   RUTA DE CIERRE — FASE 1. Contenido derivado y parafraseado del
   libro fuente "Física 11° — Un enfoque Práctico" (Tema I, apartados
   1.1 a 1.7, páginas 9-27). Mismo patrón de plugin exacto que las 8
   unidades de Física 10.º (fix10-u01 a u08.js).
   FIX10-U01 a U08 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u01';
  const C = 'var(--violet)';
  const G = 9.8;

  const TEMAS = [
    { id: 't1', icon: '🧱', titulo: 'Densidad',
      ideaClave: 'Dos objetos del mismo tamaño pueden tener masas MUY distintas — eso es la densidad: cuán "apretada" está la materia dentro de un volumen.',
      explicacion: 'La densidad (ρ) es el cociente entre la masa de un cuerpo y el volumen que ocupa: ρ = m/V. Varía DIRECTAMENTE con la masa, e INVERSAMENTE con el volumen. La unidad en el S.I. es kg/m³, aunque también se usa mucho g/cm³.',
      ejemplo: 'Tres cubos de 1 cm³ cada uno, pero de distinto material: corcho (0,24 g), agua (1 g), plomo (11,4 g). El mismo volumen, masas completamente distintas — eso es la densidad en acción.',
      aplicacion: 'La densidad de un cuerpo puede variar si cambia su masa, su volumen, o su temperatura (al calentarse, la mayoría de los materiales se dilatan, aumentando su volumen y por tanto disminuyendo su densidad).',
      compruebra: 'Un bloque de hierro tiene V=0,25 m³ y ρ=7.784 kg/m³. ¿Cuál es su masa?' },

    { id: 't2', icon: '👇', titulo: 'Presión',
      ideaClave: 'Peso y presión NO son lo mismo — la misma persona puede hundirse en la nieve con tacones, y no hundirse con esquís, sin cambiar su peso ni un gramo.',
      explicacion: 'La presión (P) es el cociente entre la fuerza que cae perpendicular a una superficie, y el área sobre la que actúa: P = F/A. Es DIRECTAMENTE proporcional a la fuerza, e INVERSAMENTE proporcional al área. Se mide en Pascales (Pa = N/m²).',
      ejemplo: 'Una mujer de 65 kg con zapatos de 0,030 m² de área cada uno: P = F/A = (65×9,8)/(2×0,030) = 1,06×10⁴ Pa. Si usara esquís (área mucho mayor), la presión sobre la nieve sería mucho menor, aunque su peso sea idéntico.',
      aplicacion: 'Por eso un clavo tiene punta pequeña (mucha presión con poca fuerza), y los cimientos de una casa son anchos (poca presión, para no hundirse). Si la fuerza cae inclinada, primero hay que calcular su componente perpendicular a la superficie (F·cos θ).',
      compruebra: 'Si mantenés la misma fuerza pero reducís el área a la mitad, ¿qué le pasa a la presión?' },

    { id: 't3', icon: '🌍', titulo: 'Presión atmosférica e hidrostática',
      ideaClave: 'El aire pesa, y por eso ejerce presión sobre todo lo que toca — incluso sobre vos, aunque no lo sientas.',
      explicacion: 'La presión atmosférica es la presión que ejerce el peso del aire sobre la superficie terrestre (demostrada por Torricelli en 1643, con un experimento de mercurio: 76 cm). En un líquido, la presión total a cierta profundidad es P = P₀ + ρ·g·h, donde P₀ es la presión atmosférica en la superficie.',
      ejemplo: 'Una piedra en el fondo de un lago, a 8 m de profundidad: P = 1,01×10⁵ Pa + (1000)(9,8)(8) = 1,79×10⁵ Pa. Cuanto más profundo, mayor la presión — por eso los buzos sienten más presión mientras más se sumergen.',
      aplicacion: 'Esta fórmula también se puede usar al revés: si conocés la presión total, podés despejar la profundidad h. Un delfín que experimenta P=2,22×10⁵ Pa en agua de mar (ρ=1030 kg/m³) está nadando a h=12 m de profundidad.',
      compruebra: '¿Por qué la presión aumenta con la profundidad, en vez de mantenerse constante?' },

    { id: 't4', icon: '🚗', titulo: 'Principio de Pascal',
      ideaClave: 'Empujar un líquido encerrado en un punto pequeño puede levantar un auto entero en otro punto — sin ningún truco, solo física.',
      explicacion: 'El Principio de Pascal dice que la presión ejercida sobre un líquido encerrado y en reposo se transmite ÍNTEGRAMENTE a todas las partes del fluido y a las paredes del recipiente. En una prensa hidráulica, esto significa que F₁/A₁ = F₂/A₂.',
      ejemplo: 'Un elevador de autos: aire comprimido empuja un émbolo de 5 cm de radio, transmitiendo la presión a otro émbolo de 50 cm de radio que levanta un auto de 1,35×10⁴ N. La fuerza necesaria en el émbolo pequeño es solo F₁=1,35×10²N — ¡100 veces menos!',
      aplicacion: 'Este principio es la base de elevadores de autos, frenos hidráulicos, gatas hidráulicas, sillas de odontólogos, y retroexcavadoras — cualquier sistema donde una fuerza pequeña, en un área pequeña, se convierte en una fuerza mucho mayor en un área mayor.',
      compruebra: '¿Por qué el émbolo grande de una prensa hidráulica levanta más peso, si la presión es la misma en ambos lados?' },

    { id: 't5', icon: '🛟', titulo: 'Principio de Arquímedes',
      ideaClave: 'Todo objeto sumergido en un líquido "pesa menos" — esa sensación es real, y se llama empuje.',
      explicacion: 'Todo cuerpo sumergido en un líquido recibe un empuje vertical hacia arriba, igual al peso del líquido que desplaza: Fe = ρ·g·V (donde V es el volumen de líquido desplazado). Un objeto flota cuando el empuje logra igualar exactamente su peso.',
      ejemplo: 'Un objeto pesa 7 N en el aire, pero al sumergirlo en agua, la balanza marca solo 4 N. El empuje que recibió es Fe = 7−4 = 3 N — exactamente igual al peso del agua que desplazó.',
      aplicacion: 'Cuando un cuerpo flota, su peso aparente es CERO (por eso los astronautas practican en piscinas: sienten una ingravidez similar a la del espacio). Un cubo de madera (menos denso que el agua) flota porque el empuje del volumen sumergido iguala su peso total, sin necesitar sumergirse por completo.',
      compruebra: 'Si un objeto flota parcialmente sumergido en agua, ¿cuál es su peso aparente en ese momento?' },

    { id: 't6', icon: '💨', titulo: 'Ley de Boyle',
      ideaClave: 'Comprimí una jeringa tapada y vas a sentir resistencia — eso es la Ley de Boyle en tus propias manos.',
      explicacion: 'Cuando un gas cambia de presión y volumen en forma isotérmica (a temperatura constante), el producto de su presión por su volumen inicial es igual al producto de su presión por su volumen final: P₁·V₁ = P₂·V₂. La presión y el volumen de un gas son inversamente proporcionales.',
      ejemplo: 'Un recipiente con oxígeno a 2 atm ocupa 20 litros. Si se comprime hasta 10 atm (sin cambiar temperatura ni masa), el nuevo volumen es V₂=(2×20)/10=4 litros.',
      aplicacion: 'Esta ley explica por qué la llanta de un auto pierde presión cuando el aire se escapa por un agujero: al disminuir la cantidad de aire (y por tanto su "volumen efectivo" dentro del espacio fijo de la llanta), la presión también disminuye.',
      compruebra: 'Si el volumen de un gas se reduce a un tercio de su valor original (misma temperatura), ¿en qué proporción cambia su presión?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01 a u08.js) ──── */
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
      try { return Storage.load().fisica11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateFisica11Unit === 'function') {
      try { Storage.updateFisica11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markFisica11TopicRead === 'function') {
      try { Storage.markFisica11TopicRead(UNIT_ID, topicId); } catch (e) {}
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
     TEORÍA — 6 temas en acordeón
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
     SIMULADOR 1 — "Densidad y Flotación Lab": el simulador estrella.
     Masa/volumen → ρ, comparado con densidad del líquido, predice
     flota/hunde, calcula empuje.
     ================================================================ */
  let _dfModo = 'explora';
  let _dfMasa = 500, _dfVolumen = 500; // g, cm³ → ρ en g/cm³
  const LIQUIDO_DENSIDAD = 1.0; // agua, g/cm³
  function renderSim1() {
    if (_dfModo === 'desafio') return _renderDfDesafio();
    const rho = _dfMasa / _dfVolumen;
    const flota = rho < LIQUIDO_DENSIDAD;
    const pesoN = (_dfMasa / 1000) * G;
    const empujeMax = LIQUIDO_DENSIDAD * 1000 * G * (_dfVolumen / 1e6); // Fe si se sumerge completo
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🛟 Densidad y Flotación Lab — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés masa y volumen de un objeto, y ves si flota o se hunde en agua (ρ=1,0 g/cm³).</p>
        <div style="background:var(--bg-elevated);border-radius:10px;padding:1.2rem;text-align:center;margin-bottom:1rem">
          <p style="font-size:2.2rem;margin:0">${flota ? '🧊⬆️' : '🪨⬇️'}</p>
          <p style="font-size:.82rem;color:${flota ? 'var(--cyan)' : 'var(--gold,#F9FF4D)'};margin:.3rem 0 0">${flota ? 'FLOTA (menos denso que el agua)' : 'SE HUNDE (más denso que el agua)'}</p>
        </div>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Masa = <strong style="color:${C}">${_dfMasa} g</strong></label>
        <input type="range" id="df-slider-masa" min="50" max="2000" step="50" value="${_dfMasa}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Volumen = <strong style="color:${C}">${_dfVolumen} cm³</strong></label>
        <input type="range" id="df-slider-volumen" min="50" max="2000" step="50" value="${_dfVolumen}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.7">
          ρ = m/V = <strong style="color:${C}">${rho.toFixed(2)} g/cm³</strong><br>
          Peso = <strong style="color:var(--cyan)">${pesoN.toFixed(2)} N</strong><br>
          Empuje si se sumerge del todo = <strong style="color:var(--gold,#F9FF4D)">${empujeMax.toFixed(2)} N</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="df-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const DF_RONDAS = [
    { peso: 7, pesoSumergido: 4, pide: 'empuje' }, { peso: 12, pesoSumergido: 9, pide: 'empuje' },
    { peso: 20, pesoSumergido: 15, pide: 'empuje' }, { masa: 2000, rhoObj: 0.6, pide: 'flota' },
    { masa: 2000, rhoObj: 2.5, pide: 'flota' }, { masa: 1000, rhoObj: 1.0, pide: 'flota' },
    { peso: 15, pesoSumergido: 15, pide: 'empuje' }
  ];
  let _dfDesafioIdx = 0;
  function _renderDfDesafio() {
    if (_dfDesafioIdx >= DF_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${DF_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = DF_RONDAS[_dfDesafioIdx];
    if (r.pide === 'empuje') {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
          <button class="btn btn-ghost btn-sm" id="df-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
          <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_dfDesafioIdx + 1} de ${DF_RONDAS.length}</p>
          <p style="margin-bottom:.6rem">Un objeto pesa ${r.peso} N en el aire. Sumergido en agua, la balanza marca ${r.pesoSumergido} N.</p>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">Fe = Peso_aire − Peso_sumergido</div>
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es el empuje (Fe)?</p>
          <input type="number" step="0.1" id="df-respuesta" placeholder="Fe (N)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
          <button class="btn btn-primary btn-sm" id="df-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
          <p id="df-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
        </div>`;
    }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="df-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_dfDesafioIdx + 1} de ${DF_RONDAS.length}</p>
        <p style="margin-bottom:.8rem">Un objeto tiene densidad ρ = ${r.rhoObj} g/cm³.</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Flotará o se hundirá en agua (ρ=1,0 g/cm³)?</p>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost" data-df-flota="si">Flota</button>
          <button class="btn btn-ghost" data-df-flota="no">Se hunde</button>
        </div>
        <p id="df-feedback2" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Prensa Hidráulica Lab": F1/A1=F2/A2
     ================================================================ */
  let _phF1 = 50, _phA1 = 10, _phA2 = 100;
  function renderSim2() {
    const P = _phF1 / _phA1;
    const F2 = P * _phA2;
    const ventaja = _phA2 / _phA1;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🚗 Prensa Hidráulica Lab</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la fuerza y las áreas de los dos émbolos, y mirás cuánta fuerza se obtiene del otro lado.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Fuerza aplicada F₁ = <strong style="color:${C}">${_phF1} N</strong></label>
        <input type="range" id="ph-slider-f1" min="10" max="200" step="10" value="${_phF1}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Área émbolo pequeño A₁ = <strong style="color:${C}">${_phA1} cm²</strong></label>
        <input type="range" id="ph-slider-a1" min="5" max="50" step="5" value="${_phA1}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Área émbolo grande A₂ = <strong style="color:${C}">${_phA2} cm²</strong></label>
        <input type="range" id="ph-slider-a2" min="50" max="500" step="10" value="${_phA2}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.7">
          P = F₁/A₁ = ${P.toFixed(2)} N/cm²<br>
          F₂ = P × A₂ = <strong style="color:${C}">${F2.toFixed(1)} N</strong><br>
          Ventaja mecánica = A₂/A₁ = <strong style="color:var(--cyan)">×${ventaja.toFixed(1)}</strong>
        </div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Boyle's Law Lab": P1V1=P2V2
     ================================================================ */
  const BL_RONDAS = [
    { p1: 2, v1: 20, p2: 10 }, { p1: 1, v1: 30, p2: 3 },
    { p1: 4, v1: 15, p2: 2 }, { p1: 5, v1: 8, p2: 20 }
  ];
  let _blIdx = 0;
  function renderSim3() {
    if (_blIdx >= BL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${BL_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = BL_RONDAS[_blIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">💉 Boyle's Law Lab</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_blIdx + 1} de ${BL_RONDAS.length}</p>
        <p style="margin:.6rem 0">Un gas está a P₁=${r.p1} atm, V₁=${r.v1} L. Se comprime (misma temperatura) hasta P₂=${r.p2} atm.</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">P₁·V₁ = P₂·V₂</div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es el nuevo volumen V₂?</p>
        <input type="number" step="0.1" id="bl-respuesta" placeholder="V₂ (L)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="bl-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="bl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '🛟 Densidad y Flotación Lab', desc: 'El simulador estrella: controlá masa y volumen, y descubrí si un objeto flota o se hunde.' },
      { id: 'sim2', titulo: '🚗 Prensa Hidráulica Lab', desc: 'Controlá fuerza y áreas de los émbolos, y mirá la ventaja mecánica de un sistema hidráulico.' },
      { id: 'sim3', titulo: '💉 Ley de Boyle Lab', desc: 'Resolvé 4 rondas aplicando P₁V₁=P₂V₂.' }
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
        _dfModo = 'explora'; _dfDesafioIdx = 0;
        _blIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Densidad y Flotación */
    const s1m = document.getElementById('df-slider-masa');
    const s1v = document.getElementById('df-slider-volumen');
    if (s1m) s1m.addEventListener('input', () => { _dfMasa = parseInt(s1m.value, 10); _rerenderSimTab(unit); });
    if (s1v) s1v.addEventListener('input', () => { _dfVolumen = parseInt(s1v.value, 10); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('df-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _dfModo = 'desafio'; _dfDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('df-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _dfModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarDf = document.getElementById('df-comprobar');
    if (comprobarDf) comprobarDf.addEventListener('click', () => {
      const r = DF_RONDAS[_dfDesafioIdx];
      const esperado = r.peso - r.pesoSumergido;
      const val = parseFloat(document.getElementById('df-respuesta').value);
      const fb = document.getElementById('df-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.3;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Fe = ${r.peso} − ${r.pesoSumergido} = ${esperado} N.`;
        if (ok) setTimeout(() => { _dfDesafioIdx++; if (_dfDesafioIdx >= DF_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1500);
      }
    });
    document.querySelectorAll('[data-df-flota]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-df-flota');
        const r = DF_RONDAS[_dfDesafioIdx];
        const correcta = r.rhoObj < 1.0 ? 'si' : 'no';
        const fb = document.getElementById('df-feedback2');
        const ok = elegido === correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es correcto. ρ=${r.rhoObj} g/cm³ ${r.rhoObj < 1 ? 'es menor' : 'es mayor'} que la del agua (1,0), así que ${correcta === 'si' ? 'flota' : 'se hunde'}.`;
        }
        setTimeout(() => { _dfDesafioIdx++; if (_dfDesafioIdx >= DF_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1700);
      });
    });

    /* Sim2 — Prensa Hidráulica */
    const s2f1 = document.getElementById('ph-slider-f1');
    const s2a1 = document.getElementById('ph-slider-a1');
    const s2a2 = document.getElementById('ph-slider-a2');
    if (s2f1) s2f1.addEventListener('input', () => { _phF1 = parseInt(s2f1.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    if (s2a1) s2a1.addEventListener('input', () => { _phA1 = parseInt(s2a1.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    if (s2a2) s2a2.addEventListener('input', () => { _phA2 = parseInt(s2a2.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });

    /* Sim3 — Boyle's Law */
    const comprobarBl = document.getElementById('bl-comprobar');
    if (comprobarBl) comprobarBl.addEventListener('click', () => {
      const r = BL_RONDAS[_blIdx];
      const esperado = (r.p1 * r.v1) / r.p2;
      const val = parseFloat(document.getElementById('bl-respuesta').value);
      const fb = document.getElementById('bl-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.3;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. V₂ = (${r.p1}×${r.v1})/${r.p2} = ${esperado.toFixed(1)} L.`;
        if (ok) setTimeout(() => { _blIdx++; if (_blIdx >= BL_RONDAS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1500);
      }
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero de Fluidos": 7 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Dos cubos del mismo volumen (1 cm³): uno de corcho (0,24 g) y otro de plomo (11,4 g).',
      pregunta: '¿Cuál de los dos tiene mayor densidad?', pista: 'Recordá que a igual volumen, mayor masa significa mayor densidad.',
      correcta: 'El de plomo', opciones: ['El de plomo', 'El de corcho', 'Ambos tienen la misma densidad', 'No se puede determinar'] },
    { id: 'nivel2', escenario: 'Una persona usa zapatos de tacón puntiagudo en vez de zapatos de base ancha, con el mismo peso corporal.',
      pregunta: '¿Qué le pasa a la presión que ejerce sobre el suelo?', pista: 'Recordá que la presión es inversamente proporcional al área.',
      correcta: 'Aumenta (menor área, mayor presión)', opciones: ['Aumenta (menor área, mayor presión)', 'Disminuye', 'Se mantiene exactamente igual', 'Depende únicamente de la temperatura'] },
    { id: 'nivel3', escenario: 'Un buzo desciende de 5 m a 15 m de profundidad en el mar.',
      pregunta: '¿Qué le pasa a la presión total que experimenta?', pista: 'Recordá la fórmula P=P₀+ρgh — a mayor profundidad h, mayor presión.',
      correcta: 'Aumenta', opciones: ['Aumenta', 'Disminuye', 'Se mantiene constante', 'Depende del color del agua'] },
    { id: 'nivel4', escenario: 'Una prensa hidráulica tiene un émbolo pequeño de 10 cm² y uno grande de 200 cm².',
      pregunta: '¿Cuál es la ventaja mecánica de este sistema (A₂/A₁)?', pista: 'Dividí el área grande entre el área pequeña.',
      correcta: '×20', opciones: ['×20', '×10', '×200', '×2'] },
    { id: 'nivel5', escenario: 'Un objeto pesa 12 N en el aire, y 9 N sumergido en agua.',
      pregunta: '¿Cuál es el empuje que recibió?', pista: 'Fe = peso en aire − peso sumergido.',
      correcta: '3 N', opciones: ['3 N', '12 N', '9 N', '21 N'] },
    { id: 'nivel6', escenario: 'Un objeto tiene una densidad de 0,8 g/cm³.',
      pregunta: '¿Flotará o se hundirá en agua (ρ=1,0 g/cm³)?', pista: 'Comparalo directamente con la densidad del agua.',
      correcta: 'Flotará (es menos denso que el agua)', opciones: ['Flotará (es menos denso que el agua)', 'Se hundirá', 'Quedará suspendido exactamente a la mitad', 'No se puede determinar sin la masa'] },
    { id: 'nivel7', escenario: 'Un gas a 3 atm ocupa 12 L. Se expande (misma temperatura) hasta 4 atm... espera, se comprime hasta 6 atm.',
      pregunta: '¿Cuál es el nuevo volumen (P₁V₁=P₂V₂)?', pista: 'Aplicá directamente la Ley de Boyle: V₂=(P₁V₁)/P₂.',
      correcta: '6 L', opciones: ['6 L', '12 L', '18 L', '2 L'] }
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
        <h3 style="margin:0 0 .3rem">🌊 Ingeniero de Fluidos</h3>
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
     EXAMEN — banco real (js/data/banco-fix11-u01.js), 20 por intento
     (regla global de la Ruta de Cierre — no negociable)
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U01 !== 'undefined') ? PREGUNTAS_FIX11_U01 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U01</h3>
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
     MISIÓN FINAL — "Diseño de un Submarino" (2 fases: flotación
     neutra, luego cambio de profundidad para evaluar presión)
     ================================================================ */
  const MISION_FASE1 = { profundidad: 20 }; // m
  const MISION_FASE2 = { profundidad: 40 }; // m
  const P0 = 1.01e5, RHO_MAR = 1030;
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { presionTotal: '', texto: '' };

  function _misionEsperado(datos) {
    return P0 + RHO_MAR * G * datos.profundidad;
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const val = parseFloat(_misionVals.presionTotal);
    if (isNaN(val)) return false;
    if (Math.abs(val - esperado) > esperado * 0.03) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Diseño de un Submarino".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🌊 Misión: Diseño de un Submarino ${_misionFase === 2 ? '— Fase 2 (mayor profundidad)' : ''}</h3>
        <p style="color:var(--text-secondary)">Un submarino desciende a ${datos.profundidad} m de profundidad en el mar (ρ=1030 kg/m³, P₀=1,01×10⁵ Pa).</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Presión total que soporta el casco (P=P₀+ρgh), en Pa:
          <input type="number" step="1" id="mision-presion" value="${_misionVals.presionTotal}" placeholder="Pa" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Explicá por qué el diseño del casco debe ser más resistente a mayor profundidad:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { presionTotal: 'mision-presion', texto: 'mision-texto' };
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
          _misionVals = { presionTotal: '', texto: '' };
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
