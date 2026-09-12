/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u06.js
   FIX11-U06 — Teoría de la Relatividad
   ================================================================
   UNIDAD DELIBERADAMENTE REDUCIDA AL MÍNIMO, a pedido explícito de
   Bryan: casi no se evalúa en la PNE, así que se cubren solo los
   postulados y las 3 fórmulas básicas (dilatación del tiempo,
   contracción de la longitud, aumento de la masa) más E=mc², sin
   profundizar en relatividad general ni en deducciones matemáticas.
   Contenido derivado y parafraseado del libro fuente "Física 11° —
   Un enfoque Práctico" (Tema VI, apartados 6.1 a 6.6, páginas 163-181),
   incluyendo su banco de "Repaso de Conceptos" (páginas 179-180). Los
   6 temas de teoría siguen 1 a 1 la numeración del libro (6.1→t1,
   6.2+6.3→t2, dilatación→t3, contracción→t4, masa+masa-energía→t5,
   6.6→t6). Mismo patrón exacto que las demás unidades. NOTA: el
   Ejemplo 2 del libro (pág. 172, contracción de longitud) tiene un
   error de cálculo en su propia respuesta (dice 1,51 m); acá se usa
   el resultado correcto, verificado con Node.js (1,32 m).
   FIX10-U01 a U08, FIX11-U01 a U05 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u06';
  const C = 'var(--violet)';
  const CLUZ = 3e8; // c, m/s

  function _fmt2(x) { return x.toFixed(2).replace('.', ','); }

  function _svgRelojLuz(cfg) {
    // Reloj de luz: un destello rebota entre dos espejos. cfg.diagonal
    // dibuja la trayectoria vista "desde fuera" (nave en movimiento).
    const w = 260, h = 150;
    const diagonal = !!(cfg && cfg.diagonal);
    const path = diagonal
      ? 'M 40 125 L 130 20 L 220 125'
      : 'M 130 125 L 130 20';
    return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:280px;display:block;margin:.6rem auto">
      <line x1="30" y1="20" x2="230" y2="20" stroke="#8888B0" stroke-width="4"/>
      <line x1="30" y1="125" x2="230" y2="125" stroke="#8888B0" stroke-width="4"/>
      <path d="${path}" fill="none" stroke="#1FDBFF" stroke-width="2" stroke-dasharray="5,4"/>
      <circle cx="${diagonal ? 220 : 130}" cy="${diagonal ? 125 : 20}" r="5" fill="#F9FF4D"/>
      <text x="130" y="145" font-size="9" fill="#F9FF4D" text-anchor="middle">${diagonal ? 'Visto desde fuera: trayectoria diagonal, más larga' : 'Visto desde dentro: trayectoria vertical'}</text>
    </svg>`;
  }

  const TEMAS = [
    { id: 't1', icon: '🚗', titulo: 'Relatividad del movimiento',
      ideaClave: 'El movimiento no es absoluto: siempre se describe respecto a un observador (un marco de referencia).',
      explicacion: 'Según la Física clásica, dos marcos de referencia que se mueven con velocidad constante entre sí observan las mismas leyes físicas — no existe un "marco de reposo absoluto". Por eso, cuando dos objetos se mueven en la misma dirección, sus velocidades se restan; cuando se mueven en direcciones opuestas, se suman.',
      ejemplo: 'Un auto viaja a 20 km/h; alguien lanza desde él una pelota a 20 km/h, en la misma dirección. Para el lanzador, la pelota va a 20 km/h. Para una persona parada en la calle, la pelota va a 20+20=40 km/h.',
      aplicacion: 'Esta idea de "sumar o restar velocidades" funciona bien en la vida diaria, pero deja de ser exacta cuando las velocidades se acercan a la de la luz — ahí es donde entra la Teoría de la Relatividad de Einstein.',
      compruebra: 'Un autobús va a 40 km/h al este, y un atleta corre tras él a 18 km/h, también al este. ¿Cuál es la velocidad del atleta respecto al autobús?' },

    { id: 't2', icon: '💡', titulo: 'Postulados de la Relatividad Especial',
      ideaClave: 'Einstein (1905) partió de dos postulados —afirmaciones sin demostración previa— después confirmados con la experiencia.',
      explicacion: 'Michelson y Morley (1887) buscaron el "éter" que se creía necesario para que la luz viajara, y no encontraron ninguna evidencia de él: la velocidad de la luz en el vacío resultó ser siempre 3×10⁸ m/s. De ahí nacieron los dos postulados: <strong>I.</strong> Las leyes de la Física son las mismas en todos los sistemas de referencia que se mueven en línea recta y a rapidez constante. <strong>II.</strong> La velocidad de la luz en el vacío es igual para todos los observadores, sin importar el movimiento de la fuente ni del observador.',
      ejemplo: 'Un pasajero de un avión sirve café y camina con él exactamente igual que en el aeropuerto (I Postulado). Si una nave a 2×10⁸ m/s envía un destello de luz, este siempre se mide a 3×10⁸ m/s desde cualquier marco de referencia (II Postulado).',
      aplicacion: 'La Teoría se llama "especial" porque solo aplica a sistemas que se mueven en línea recta y a velocidad constante; la Teoría General (1915) extiende estas ideas a la gravedad y la aceleración.',
      compruebra: '¿Por qué el II Postulado obliga a aceptar que el tiempo y el espacio NO pueden ser absolutos?' },

    { id: 't3', icon: '⏱️', titulo: 'Dilatación del tiempo',
      ideaClave: 'Para un observador externo, un reloj que viaja a gran velocidad "atrasa": el tiempo transcurre más lento para él.',
      explicacion: 'Fórmula: <strong>t = t₀ / √(1 − v²/c²)</strong>, donde t₀ es el tiempo propio (medido por quien viaja con el reloj) y t es el tiempo medido por un observador externo (por ejemplo, desde la Tierra). Esto se demuestra con el "reloj de luz": un destello rebotando entre dos espejos, dentro de una nave.',
      ejemplo: 'Andrés viaja en una nave a 2,82×10⁸ m/s. Para Carlos, que se queda en la Tierra, pasan t=3 años. Para Andrés: t₀ = 3·√(1−(2,82/3)²) ≈ 1,02 años. Es la base de la "paradoja de los gemelos": el gemelo viajero envejece menos que el que se queda en la Tierra.',
      aplicacion: 'Los relojes de los satélites GPS se adelantan por este efecto, y deben corregirse constantemente para que el sistema funcione con precisión.',
      compruebra: 'Una nave viaja a 0,600c. Si dentro de ella un reloj marca 30,0 min, ¿cuánto tiempo transcurrió para un observador en la Tierra?' },

    { id: 't4', icon: '📏', titulo: 'Contracción de la longitud',
      ideaClave: 'Para un observador externo, un objeto en movimiento se ve más corto en la dirección de su movimiento (no en la perpendicular).',
      explicacion: 'Fórmula: <strong>L = L₀ · √(1 − v²/c²)</strong>, donde L₀ es la longitud propia (medida en reposo respecto al objeto) y L es la longitud medida por un observador que lo ve pasar. Para un observador que viaja junto al objeto, su longitud se ve exactamente igual — el efecto solo lo nota quien lo ve pasar desde afuera.',
      ejemplo: 'Una nave con longitud propia de 250 m pasa cerca de la Tierra a 0,7c. Para un observador en la Tierra: L=250·√(1−0,7²) ≈ 178,5 m.',
      aplicacion: 'Es el efecto "gemelo" de la dilatación del tiempo: ambos son consecuencia directa de que la velocidad de la luz sea siempre la misma para cualquier observador.',
      compruebra: 'Un robot mide 2,0 m de longitud propia y viaja en una nave a 0,75c. ¿Cuál es su longitud observada desde la Tierra?' },

    { id: 't5', icon: '⚛️', titulo: 'Aumento de la masa y equivalencia masa-energía',
      ideaClave: 'Ningún objeto con masa puede llegar a viajar a la velocidad de la luz: su masa (y la energía necesaria para acelerarlo) crecería sin límite.',
      explicacion: 'Fórmula del aumento de masa: <strong>m = m₀ / √(1 − v²/c²)</strong>, donde m₀ es la masa en reposo. Einstein dedujo además que la masa y la energía son equivalentes: <strong>E₀ = m·c²</strong>, la ecuación más famosa del siglo XX. La masa puede pensarse como "energía congelada".',
      ejemplo: 'Una nave de 24 000 kg (en reposo) viaja a 0,87c: su masa en movimiento es m=24 000/√(1−0,87²) ≈ 48 676,4 kg. Convertir apenas 100 gramos de masa completamente en energía libera E=0,1×(3×10⁸)²=9,00×10¹⁵ J.',
      aplicacion: 'En el Sol, cada segundo se convierten unos 4,5 millones de toneladas de masa en energía radiante, gracias a esta equivalencia.',
      compruebra: 'Si toda la masa de 10 gramos se convirtiera en energía, ¿cuántos joules se liberarían (E=mc²)?' },

    { id: 't6', icon: '🛰️', titulo: 'Aplicaciones y comprobaciones',
      ideaClave: 'La Teoría de la Relatividad no es solo teórica: hoy es indispensable para tecnología que usamos a diario.',
      explicacion: 'El <strong>GPS</strong> necesita corregir constantemente los relojes de sus satélites por dilatación del tiempo (sin corrección, el error de ubicación crecería unos 11,7 km por día). Los <strong>muones</strong> creados por rayos cósmicos en la atmósfera, gracias a la dilatación del tiempo, "viven" lo suficiente para llegar al suelo. En los <strong>aceleradores de partículas</strong> se confirma que, cerca de c, la masa-energía crece cada vez más (al 90% de c, se duplica). La <strong>Teoría General</strong> (1915) explica además que la gravedad es una curvatura del espacio-tiempo causada por la masa.',
      ejemplo: 'Sin las correcciones relativistas, el GPS acumularía un error de posición de unos 11,7 km al día — suficiente para hacerlo inútil.',
      aplicacion: 'Cerca de un campo gravitatorio muy intenso (como un agujero negro), un reloj marcharía todavía más lento, según la Teoría General de la Relatividad.',
      compruebra: '¿Por qué la mayoría de los muones creados en la atmósfera logran llegar al suelo, a pesar de su vida media tan corta?' }
  ];

  /* ── Helpers defensivos (mismo patrón que unidades anteriores) ─── */
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
    const relojDentro = _svgRelojLuz({ diagonal: false });
    const relojFuera = _svgRelojLuz({ diagonal: true });
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
            ${i === 2 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">🔎 EJEMPLO</p><p style="margin:0 0 .4rem">${t.ejemplo}</p><div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center">${relojDentro}${relojFuera}</div></div>` : _bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Calculadora Relativista" (estrella): un solo
     slider v/c, y en vivo se ven el factor de Lorentz (γ), la
     dilatación del tiempo, la contracción de la longitud y el
     aumento de la masa, todos calculados sobre los mismos valores
     de referencia (t₀=1 año, L₀=10 m, m₀=1000 kg).
     ================================================================ */
  let _crSubmodo = 'explora';
  const CR_T0 = 1, CR_L0 = 10, CR_M0 = 1000;
  let _crVfrac = 60; // v como % de c (slider entero 5-99)
  function _crCalcular(vfrac) {
    const v = vfrac / 100;
    const gamma = 1 / Math.sqrt(1 - v * v);
    return { v, gamma, t: CR_T0 * gamma, L: CR_L0 * Math.sqrt(1 - v * v), m: CR_M0 * gamma };
  }
  function renderSim1() {
    if (_crSubmodo === 'desafio') return _renderCrDesafio();
    const r = _crCalcular(_crVfrac);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">⚛️ Calculadora Relativista</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la velocidad (como % de c) y mirás en vivo cómo cambian el tiempo, la longitud y la masa de referencia.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad = <strong style="color:${C}">${_crVfrac}% de c</strong> (v=${_fmt2(r.v)}·c)</label>
        <input type="range" id="cr-slider-v" min="5" max="99" step="1" value="${_crVfrac}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.9">
          Factor de Lorentz γ = <strong style="color:${C}">${_fmt2(r.gamma)}</strong><br>
          Si t₀=1,00 año → t = <strong style="color:${C}">${_fmt2(r.t)} años</strong> (dilatación del tiempo)<br>
          Si L₀=10,0 m → L = <strong style="color:${C}">${_fmt2(r.L)} m</strong> (contracción de la longitud)<br>
          Si m₀=1000 kg → m = <strong style="color:${C}">${r.m.toFixed(1).replace('.', ',')} kg</strong> (aumento de la masa)
        </div>
        <button class="btn btn-primary btn-sm" id="cr-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const CR_RONDAS = [
    { vfrac: 60, pide: 't' },     // t=1,25 años
    { vfrac: 80, pide: 'L' },     // L=6,00 m
    { vfrac: 60, pide: 'm' },     // m=1250,0 kg
    { vfrac: 80, pide: 'gamma' }  // γ=1,67
  ];
  let _crDesafioIdx = 0;
  const CR_PIDE_TXT = { t: '¿Cuánto tiempo (t) transcurre para un observador externo, si t₀=1,00 año?', L: '¿Cuál es la longitud (L) observada, si L₀=10,0 m?', m: '¿Cuál es la masa (m) observada, si m₀=1000 kg?', gamma: '¿Cuál es el factor de Lorentz (γ)?' };
  const CR_PIDE_UNIDAD = { t: 'años', L: 'm', m: 'kg', gamma: '' };
  function _crEsperado(d) {
    const r = _crCalcular(d.vfrac);
    return r[d.pide];
  }
  function _renderCrDesafio() {
    if (_crDesafioIdx >= CR_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${CR_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const d = CR_RONDAS[_crDesafioIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="cr-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_crDesafioIdx + 1} de ${CR_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">Un objeto viaja a v=${d.vfrac}% de c.</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${CR_PIDE_TXT[d.pide]}</p>
        <input type="number" step="0.01" id="cr-respuesta" placeholder="${CR_PIDE_UNIDAD[d.pide] || 'número'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="cr-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="cr-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "E=mc²": slider de masa (en gramos), cálculo en
     vivo de la energía liberada al convertirla completamente.
     ================================================================ */
  let _emcSubmodo = 'explora';
  let _emcGramos = 100;
  function _emcCalcular(gramos) { return (gramos / 1000) * CLUZ * CLUZ; }
  function renderSim2() {
    if (_emcSubmodo === 'desafio') return _renderEmcDesafio();
    const E = _emcCalcular(_emcGramos);
    const exp = Math.floor(Math.log10(E));
    const mant = (E / Math.pow(10, exp)).toFixed(2).replace('.', ',');
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">⚡ E=mc²</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la cantidad de masa (en gramos) y mirás en vivo cuánta energía se liberaría si TODA esa masa se convirtiera en energía.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Masa = <strong style="color:${C}">${_emcGramos} g</strong></label>
        <input type="range" id="emc-slider" min="1" max="1000" step="1" value="${_emcGramos}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          E = m·c² = <strong style="color:${C}">${mant} × 10${_superindice(exp)} J</strong>
        </div>
        <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">💡 Por eso el libro dice que la masa es "energía congelada": una cantidad pequeñísima de masa equivale a una cantidad enorme de energía.</p>
        <button class="btn btn-primary btn-sm" id="emc-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  function _superindice(n) {
    const map = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(n).split('').map(c => map[c] || c).join('');
  }
  // Rondas: dos piden la energía (dando la masa; se responde solo la
  // mantisa, con el exponente indicado en el enunciado), y dos piden
  // la masa en gramos (dando la energía en notación científica).
  const EMC_RONDAS = [
    { pide: 'E', gramos: 10, exp: 14 },     // E=9,00×10^14 J
    { pide: 'E', gramos: 100, exp: 15 },    // E=9,00×10^15 J
    { pide: 'g', mantisa: 9.00, exp: 13 },  // m=1 g
    { pide: 'g', mantisa: 4.50, exp: 16 }   // m=500 g
  ];
  let _emcDesafioIdx = 0;
  function _emcEsperado(d) {
    if (d.pide === 'E') return _emcCalcular(d.gramos) / Math.pow(10, d.exp);
    return (d.mantisa * Math.pow(10, d.exp) / (CLUZ * CLUZ)) * 1000; // gramos
  }
  function _renderEmcDesafio() {
    if (_emcDesafioIdx >= EMC_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${EMC_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const d = EMC_RONDAS[_emcDesafioIdx];
    const enunciado = d.pide === 'E'
      ? `Se convierten completamente ${d.gramos} gramos de masa en energía.`
      : `Al convertir cierta masa en energía, se liberan ${_fmt2(d.mantisa)} × 10${_superindice(d.exp)} J.`;
    const pideTexto = d.pide === 'E'
      ? `¿A cuántos × 10${_superindice(d.exp)} J equivale esa energía? (Respondé solo el número, ej: 9,00)`
      : '¿Cuántos GRAMOS de masa se convirtieron? (E=mc²)';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="emc-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_emcDesafioIdx + 1} de ${EMC_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">${enunciado}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.01" id="emc-respuesta" placeholder="${d.pide === 'E' ? 'número (ej: 9.00)' : 'gramos'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="emc-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="emc-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Velocidades Relativas" (clásica, sin relatividad
     especial): dos objetos en línea recta, misma dirección u
     opuestas, cálculo en vivo de la velocidad relativa.
     ================================================================ */
  let _vrSubmodo = 'explora';
  let _vrA = 40, _vrB = 18, _vrMisma = true;
  function _vrCalcular() { return _vrMisma ? Math.abs(_vrA - _vrB) : (_vrA + _vrB); }
  function renderSim3() {
    if (_vrSubmodo === 'desafio') return _renderVrDesafio();
    const rel = _vrCalcular();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🚙 Velocidades Relativas</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Dos objetos viajan en línea recta. Elegí si van en la misma dirección o en direcciones opuestas, y mirá en vivo su velocidad relativa.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad de A = <strong style="color:${C}">${_vrA}</strong></label>
        <input type="range" id="vr-slider-a" min="0" max="100" step="1" value="${_vrA}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Velocidad de B = <strong style="color:${C}">${_vrB}</strong></label>
        <input type="range" id="vr-slider-b" min="0" max="100" step="1" value="${_vrB}" style="width:100%">
        <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn ${_vrMisma ? 'btn-primary' : 'btn-ghost'} btn-sm" data-vr-dir="misma">Misma dirección</button>
          <button class="btn ${!_vrMisma ? 'btn-primary' : 'btn-ghost'} btn-sm" data-vr-dir="opuesta">Direcciones opuestas</button>
        </div>
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          Velocidad relativa = <strong style="color:${C}">${_fmt2(rel)}</strong> ${_vrMisma ? '(se restan)' : '(se suman)'}
        </div>
        <button class="btn btn-primary btn-sm" id="vr-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const VR_RONDAS = [
    { a: 40, b: 18, misma: true, unidad: 'km/h' },   // 22
    { a: 5, b: 4, misma: false, unidad: 'm/s' },     // 9
    { a: 30, b: 25, misma: true, unidad: 'km/h' },   // 5
    { a: 7.5, b: 6, misma: true, unidad: 'm/s' }     // 1.5
  ];
  let _vrDesafioIdx = 0;
  function _vrEsperado(r) { return r.misma ? Math.abs(r.a - r.b) : (r.a + r.b); }
  function _renderVrDesafio() {
    if (_vrDesafioIdx >= VR_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${VR_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = VR_RONDAS[_vrDesafioIdx];
    const enunciado = r.misma
      ? `A viaja a ${r.a} ${r.unidad} y B viaja a ${r.b} ${r.unidad}, ambos en la MISMA dirección.`
      : `A viaja a ${r.a} ${r.unidad} y B viaja a ${r.b} ${r.unidad}, en direcciones OPUESTAS (se acercan o se alejan).`;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="vr-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_vrDesafioIdx + 1} de ${VR_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">${enunciado}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la velocidad relativa entre A y B (en ${r.unidad})?</p>
        <input type="number" step="0.01" id="vr-respuesta" placeholder="${r.unidad}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="vr-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="vr-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '⚛️ Calculadora Relativista', desc: 'El simulador estrella: movés v/c y mirás en vivo la dilatación del tiempo, la contracción de la longitud y el aumento de la masa.' },
      { id: 'sim2', titulo: '⚡ E=mc²', desc: 'Movés la masa y mirás en vivo cuánta energía se liberaría al convertirla por completo.' },
      { id: 'sim3', titulo: '🚙 Velocidades Relativas', desc: 'Practicá la suma y resta de velocidades, como en los ejemplos clásicos del libro.' }
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
        _crSubmodo = 'explora'; _crDesafioIdx = 0;
        _emcSubmodo = 'explora'; _emcDesafioIdx = 0;
        _vrSubmodo = 'explora'; _vrDesafioIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Calculadora Relativista */
    const s1v = document.getElementById('cr-slider-v');
    if (s1v) s1v.addEventListener('input', () => { _crVfrac = parseInt(s1v.value, 10); _rerenderSimTab(unit); });
    const irDesafioCr = document.getElementById('cr-ir-desafio');
    if (irDesafioCr) irDesafioCr.addEventListener('click', () => { _crSubmodo = 'desafio'; _crDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraCr = document.getElementById('cr-ir-explora');
    if (irExploraCr) irExploraCr.addEventListener('click', () => { _crSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarCr = document.getElementById('cr-comprobar');
    if (comprobarCr) comprobarCr.addEventListener('click', () => {
      const d = CR_RONDAS[_crDesafioIdx];
      const esperado = _crEsperado(d);
      const val = parseFloat(document.getElementById('cr-respuesta').value);
      const fb = document.getElementById('cr-feedback');
      const tol = d.pide === 'm' ? esperado * 0.02 : 0.05;
      const ok = !isNaN(val) && Math.abs(val - esperado) <= tol;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${d.pide === 'm' ? esperado.toFixed(1).replace('.', ',') : _fmt2(esperado)} ${CR_PIDE_UNIDAD[d.pide]}.`;
        if (ok) setTimeout(() => { _crDesafioIdx++; if (_crDesafioIdx >= CR_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — E=mc² */
    const s2 = document.getElementById('emc-slider');
    if (s2) s2.addEventListener('input', () => { _emcGramos = parseInt(s2.value, 10); _rerenderSimTab(unit); });
    const irDesafioEmc = document.getElementById('emc-ir-desafio');
    if (irDesafioEmc) irDesafioEmc.addEventListener('click', () => { _emcSubmodo = 'desafio'; _emcDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraEmc = document.getElementById('emc-ir-explora');
    if (irExploraEmc) irExploraEmc.addEventListener('click', () => { _emcSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarEmc = document.getElementById('emc-comprobar');
    if (comprobarEmc) comprobarEmc.addEventListener('click', () => {
      const d = EMC_RONDAS[_emcDesafioIdx];
      const esperado = _emcEsperado(d);
      const val = parseFloat(document.getElementById('emc-respuesta').value);
      const fb = document.getElementById('emc-feedback');
      const tol = d.pide === 'E' ? 0.05 : 1;
      const ok = !isNaN(val) && Math.abs(val - esperado) <= tol;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${d.pide === 'E' ? _fmt2(esperado) : esperado.toFixed(0)} ${d.pide === 'E' ? ('× 10' + _superindice(d.exp) + ' J') : 'g'}.`;
        if (ok) setTimeout(() => { _emcDesafioIdx++; if (_emcDesafioIdx >= EMC_RONDAS.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim3 — Velocidades Relativas */
    const s3a = document.getElementById('vr-slider-a');
    const s3b = document.getElementById('vr-slider-b');
    if (s3a) s3a.addEventListener('input', () => { _vrA = parseInt(s3a.value, 10); _rerenderSimTab(unit); });
    if (s3b) s3b.addEventListener('input', () => { _vrB = parseInt(s3b.value, 10); _rerenderSimTab(unit); });
    document.querySelectorAll('[data-vr-dir]').forEach(btn => {
      btn.addEventListener('click', () => { _vrMisma = btn.getAttribute('data-vr-dir') === 'misma'; _rerenderSimTab(unit); });
    });
    const irDesafioVr = document.getElementById('vr-ir-desafio');
    if (irDesafioVr) irDesafioVr.addEventListener('click', () => { _vrSubmodo = 'desafio'; _vrDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraVr = document.getElementById('vr-ir-explora');
    if (irExploraVr) irExploraVr.addEventListener('click', () => { _vrSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarVr = document.getElementById('vr-comprobar');
    if (comprobarVr) comprobarVr.addEventListener('click', () => {
      const r = VR_RONDAS[_vrDesafioIdx];
      const esperado = _vrEsperado(r);
      const val = parseFloat(document.getElementById('vr-respuesta').value);
      const fb = document.getElementById('vr-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.1;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${_fmt2(esperado)} ${r.unidad}.`;
        if (ok) setTimeout(() => { _vrDesafioIdx++; if (_vrDesafioIdx >= VR_RONDAS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1500);
      }
    });
  }

  /* ================================================================
     JUEGO — "Explorador de la Relatividad": 7 niveles. Sistema
     unificado desde el inicio (una pregunta a la vez).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un auto viaja a 20 km/h. Alguien lanza desde el auto una pelota a 20 km/h, en la misma dirección del movimiento.',
      pregunta: '¿A qué velocidad ve pasar la pelota una persona parada en la calle?', pista: 'Cuando se mueven en la misma dirección, las velocidades se suman para un observador externo.',
      correcta: '40 km/h', opciones: ['40 km/h', '20 km/h', '0 km/h', '10 km/h'] },
    { id: 'nivel2', escenario: 'Los pasajeros de un avión que viaja a velocidad constante sirven café y caminan con él, exactamente igual que en el aeropuerto.',
      pregunta: '¿Qué postulado de la Relatividad Especial ejemplifica esta situación?', pista: 'Tiene que ver con que las leyes de la Física no cambian dentro de un marco de referencia con velocidad constante.',
      correcta: 'El I Postulado', opciones: ['El I Postulado', 'El II Postulado', 'La ecuación E=mc²', 'La Teoría General de la Relatividad'] },
    { id: 'nivel3', escenario: 'Un astronauta viaja durante un tiempo a una velocidad cercana a la de la luz, y luego regresa a la Tierra.',
      pregunta: '¿Qué es correcto afirmar, según la dilatación del tiempo?', pista: 'Para el que viaja muy rápido, el tiempo transcurre más lento (visto desde fuera).',
      correcta: 'Para el astronauta ha pasado menos tiempo que para quienes se quedaron en la Tierra', opciones: ['Para el astronauta ha pasado menos tiempo que para quienes se quedaron en la Tierra', 'Para el astronauta ha pasado más tiempo que para quienes se quedaron en la Tierra', 'Ha pasado exactamente el mismo tiempo para ambos', 'El tiempo no se puede comparar entre los dos'] },
    { id: 'nivel4', escenario: 'Una nave con longitud propia de 250 m pasa cerca de la Tierra a una velocidad de 0,7c.',
      pregunta: '¿Cuál es, aproximadamente, la longitud de la nave medida por un observador en la Tierra (L=L₀·√(1-v²/c²))?', pista: 'Multiplicá 250 por √(1-0,7²).',
      correcta: '178,5 m', opciones: ['178,5 m', '250,0 m', '175,0 m', '325,0 m'] },
    { id: 'nivel5', escenario: 'Einstein dedujo que la masa y la energía son, en el fondo, la misma cosa.',
      pregunta: '¿Qué significa, en esencia, la ecuación E=mc²?', pista: 'Piensa en la masa como "energía congelada".',
      correcta: 'Que la masa y la energía son formas equivalentes; una se puede convertir en la otra', opciones: ['Que la masa y la energía son formas equivalentes; una se puede convertir en la otra', 'Que la masa siempre es mayor que la energía', 'Que la energía se mide en kilogramos', 'Que solo los objetos radiactivos tienen energía'] },
    { id: 'nivel6', escenario: 'Los relojes atómicos de los satélites GPS se adelantan constantemente respecto a los relojes en la Tierra, y deben corregirse.',
      pregunta: '¿Qué fenómeno relativista explica este adelanto?', pista: 'Tiene que ver con cómo transcurre el tiempo para un objeto en movimiento.',
      correcta: 'La dilatación del tiempo', opciones: ['La dilatación del tiempo', 'La contracción de la longitud', 'El aumento de la masa', 'La Teoría General de la Relatividad, únicamente'] },
    { id: 'nivel7', escenario: 'Los muones, creados por los rayos cósmicos en la atmósfera superior, tienen una vida media muy corta, pero la mayoría logra llegar hasta el suelo.',
      pregunta: '¿Por qué logran llegar, a pesar de su corta vida?', pista: 'A gran velocidad, su "reloj interno" transcurre más lento, visto desde la Tierra.',
      correcta: 'Por la dilatación del tiempo: a su gran velocidad, el tiempo pasa más lento para ellos', opciones: ['Por la dilatación del tiempo: a su gran velocidad, el tiempo pasa más lento para ellos', 'Porque en realidad los muones nunca se desintegran', 'Porque la atmósfera los protege por completo', 'Porque su masa se hace exactamente cero'] }
  ];
  let _juegoIdx = null;
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
        <h3 style="margin:0 0 .3rem">🧭 Explorador de la Relatividad</h3>
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
     EXAMEN — banco real (js/data/banco-fix11-u06.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U06 !== 'undefined') ? PREGUNTAS_FIX11_U06 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U06</h3>
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
     MISIÓN FINAL — "La Paradoja de los Gemelos" (2 fases, usando
     t=t₀/√(1-v²/c²) con t=3 años fijo, aumentando la velocidad entre
     fases para mostrar cuánto crece el efecto cerca de c)
     ================================================================ */
  const MISION_T = 3; // años, fijo en ambas fases (tiempo transcurrido en la Tierra)
  const MISION_FASE1 = { v: 2.82e8 };   // -> t₀≈1,02 años
  const MISION_FASE2 = { v: 2.985e8 };  // -> t₀≈0,30 años
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { t0: '', texto: '' };

  function _misionEsperado(datos) {
    return MISION_T * Math.sqrt(1 - (datos.v * datos.v) / (CLUZ * CLUZ));
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const val = parseFloat(_misionVals.t0);
    if (isNaN(val)) return false;
    if (Math.abs(val - esperado) > esperado * 0.1) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya resolviste "La Paradoja de los Gemelos".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const vFrac = (datos.v / CLUZ).toFixed(3).replace('.', ',');
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🧭 Misión: La Paradoja de los Gemelos ${_misionFase === 2 ? '— Fase 2 (velocidad aumentada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Uno de dos hermanos gemelos viaja en una nave a v=${vFrac}·c (v=${datos.v.toExponential(2).replace('e+', '×10')} m/s). Cuando regresa, para el gemelo que se quedó en la Tierra han pasado t=${MISION_T},00 años.</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Calculá cuánto tiempo (t₀) transcurrió para el gemelo viajero (t₀=t·√(1-v²/c²)), en años:
          <input type="number" step="0.01" id="mision-t0" value="${_misionVals.t0}" placeholder="años" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. ${_misionFase === 1 ? 'Explicá, en tus propias palabras, por qué al gemelo viajero le pasa MENOS tiempo que al que se queda en la Tierra:' : 'Ya calculaste t₀ para una velocidad aún más cercana a la de la luz. Explicá por qué la diferencia de edad entre los gemelos se hizo tan grande esta vez:'}
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { t0: 'mision-t0', texto: 'mision-texto' };
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
          _misionVals = { t0: '', texto: '' };
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
