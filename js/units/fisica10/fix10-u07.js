/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u07.js
   FIX10-U07 — Gravitación Universal y Movimiento Satelital
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad VII, páginas 268-291). Última unidad
   de Física 10.° — NO se adelanta Física 11.°.

   Advertencia de la fuente: el libro repite por error de imprenta un
   título relacionado con "Dinámica y las Leyes de Newton" — el
   contenido REAL de esta unidad es Gravitación Universal, no U06.

   Mismo patrón de plugin exacto que fix10-u01 a u06.js.
   FIX10-U01 a U06 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u07';
  const C = 'var(--violet)';
  const G_CONST = 6.67e-11;

  function _notacionCientifica(x, decimales) {
    decimales = decimales === undefined ? 2 : decimales;
    if (x === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(x)));
    const mant = x / Math.pow(10, exp);
    return mant.toFixed(decimales).replace('.', ',') + ' × 10' + _superindice(exp);
  }
  function _superindice(n) {
    const map = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(n).split('').map(c => map[c] || c).join('');
  }

  /* ================================================================
     GENERADOR VISUAL — dos cuerpos separados por r, con flechas de
     atracción iguales y opuestas (conecta con III Ley de U06).
     ================================================================ */
  function _svgGravedad(cfg) {
    const w = 280, h = 130;
    const x1 = 60, x2 = 220, cy = 65;
    const r1 = Math.max(14, Math.min(28, 12 + cfg.m1Rel * 3));
    const r2 = Math.max(14, Math.min(28, 12 + cfg.m2Rel * 3));
    return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:320px;display:block;margin:.6rem auto">
      <circle cx="${x1}" cy="${cy}" r="${r1}" fill="#7B2FFF"/>
      <text x="${x1}" y="${cy - r1 - 8}" font-size="9" fill="#B8B8E0" text-anchor="middle">m₁</text>
      <circle cx="${x2}" cy="${cy}" r="${r2}" fill="#F9FF4D"/>
      <text x="${x2}" y="${cy - r2 - 8}" font-size="9" fill="#B8B8E0" text-anchor="middle">m₂</text>
      <line x1="${x1 + r1 + 6}" y1="${cy}" x2="${x2 - r2 - 14}" y2="${cy}" stroke="#00FF88" stroke-width="2.5"/>
      <polygon points="${x2 - r2 - 6},${cy} ${x2 - r2 - 16},${cy - 5} ${x2 - r2 - 16},${cy + 5}" fill="#00FF88"/>
      <line x1="${x2 - r2 - 6}" y1="${cy + 14}" x2="${x1 + r1 + 14}" y2="${cy + 14}" stroke="#1FDBFF" stroke-width="2.5"/>
      <polygon points="${x1 + r1 + 6},${cy + 14} ${x1 + r1 + 16},${cy + 9} ${x1 + r1 + 16},${cy + 19}" fill="#1FDBFF"/>
      <text x="${(x1 + x2) / 2}" y="${cy - 6}" font-size="9" fill="#00FF88" text-anchor="middle" font-weight="700">F</text>
      <text x="${(x1 + x2) / 2}" y="${cy + 28}" font-size="9" fill="#1FDBFF" text-anchor="middle" font-weight="700">F</text>
      <line x1="${x1}" y1="${cy + r1 + 4}" x2="${x2}" y2="${cy + r1 + 4}" stroke="#8888B0" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="${(x1 + x2) / 2}" y="${cy + r1 + 16}" font-size="8" fill="#8888B0" text-anchor="middle">r = ${cfg.rLabel}</text>
    </svg>`;
  }

  const TEMAS = [
    { id: 't1', icon: '🌍', titulo: 'Una fuerza que alcanza el universo',
      ideaClave: 'La misma fuerza que hace caer una manzana al suelo es, exactamente, la que mantiene a la Luna girando alrededor de la Tierra.',
      explicacion: 'La <strong>Ley de Gravitación Universal</strong> (a veces llamada "IV Ley de Newton" en algunos textos, aunque preferimos llamarla por su nombre propio para no confundirla con las tres leyes del movimiento) dice que dos masas se atraen con una fuerza F = G·m₁·m₂/r². Esta fuerza es directamente proporcional al producto de las masas, e inversamente proporcional al CUADRADO de la distancia entre sus centros.',
      ejemplo: `${_svgGravedad({ m1Rel: 3, m2Rel: 2, rLabel: 'distancia entre centros' })}G = 6,67 × 10⁻¹¹ N·m²/kg² (medida por Henry Cavendish, casi un siglo después de que Newton propusiera la ley, usando una balanza de torsión).`,
      aplicacion: 'La relación es cuadrática con la distancia: si r se duplica, la fuerza NO se reduce a la mitad — se reduce a la CUARTA parte (porque 2² = 4). Si r se triplica, la fuerza se reduce a 1/9.',
      compruebra: 'Si duplicás la masa m₁ y también duplicás la masa m₂ (manteniendo r constante), ¿en qué proporción cambia la fuerza gravitatoria?' },

    { id: 't2', icon: '🪐', titulo: 'Campo gravitacional',
      ideaClave: 'La "gravedad" que sentimos (g ≈ 9,8 m/s²) no es una constante universal — depende de la masa del planeta y de qué tan lejos estés de su centro.',
      explicacion: 'El campo gravitacional se calcula como g = G·M/r², donde M es la masa del cuerpo central (por ejemplo, la Tierra) y r es la distancia AL CENTRO de ese cuerpo. Ojo con la diferencia crítica: si te dan la <strong>altura h</strong> sobre la superficie, tenés que sumarle el <strong>radio R</strong> del planeta para obtener r: r = R + h. Nunca sustituyas h directamente donde va r.',
      ejemplo: 'Ejemplo real del libro: a una altura h = 500.000 m sobre la Tierra (R≈6,37×10⁶ m), la gravedad baja a g ≈ 8,45 m/s² (menor que los 9,8 m/s² de la superficie) — porque ahora r = R+h es mayor.',
      aplicacion: 'No confundir G (la constante universal, siempre igual: 6,67×10⁻¹¹ N·m²/kg²) con g (la intensidad del campo gravitacional en un punto específico, que sí cambia según el planeta y la distancia).',
      compruebra: 'En la fórmula g = G·M/r², si r se duplica, ¿en qué proporción cambia g?' },

    { id: 't3', icon: '🌀', titulo: 'Newton y Einstein: dos miradas',
      ideaClave: 'Newton describió CÓMO se atraen las masas; Einstein explicó POR QUÉ, proponiendo que la masa curva el espacio-tiempo mismo.',
      explicacion: 'Einstein determinó que la gravedad no es exactamente una "fuerza" en el sentido clásico, sino el efecto de que un cuerpo con masa deforma el espacio-tiempo a su alrededor — y esa deformación es lo que atrae a los demás cuerpos hacia él.',
      ejemplo: 'Imaginá una tela elástica estirada en un aro: una pelotita rueda en línea recta sobre la tela vacía. Pero si colocás una bola pesada en el centro, la tela se curva, y ahora la pelotita se desvía de su trayectoria recta al pasar cerca — así es como Einstein describió que la masa deforma el espacio.',
      aplicacion: '¿Einstein "demostró que Newton estaba equivocado"? No exactamente — la ley de Newton sigue siendo extremadamente precisa y útil para la enorme mayoría de los cálculos (incluidos los que hacemos en esta unidad). Einstein aportó una descripción más profunda, necesaria en condiciones extremas (masas enormes, velocidades cercanas a la luz), pero ambas visiones no son "idénticas" ni "contradictorias" — son dos niveles distintos de descripción.',
      compruebra: '¿Por qué la Tierra deforma menos el espacio-tiempo que el Sol, según la analogía de la tela elástica?' },

    { id: 't4', icon: '🛰️', titulo: 'Caer sin tocar el suelo',
      ideaClave: 'Un satélite en órbita no "flota" porque no haya gravedad — de hecho, está cayendo constantemente, solo que su velocidad tangencial hace que "le erre" a la Tierra una y otra vez.',
      explicacion: 'El movimiento satelital combina dos cosas: la <strong>inercia</strong> (que, sin nada más, haría que el satélite siguiera en línea recta, alejándose) y la <strong>atracción gravitatoria</strong> (que constantemente lo desvía hacia el planeta). El resultado es una trayectoria curva que nunca choca contra la superficie: una órbita.',
      ejemplo: 'Newton lo explicó con un experimento mental: imaginá un cañón disparando una bala cada vez más rápido desde una montaña muy alta. A baja velocidad, la bala cae al suelo. A cierta velocidad, la curvatura de su caída coincide exactamente con la curvatura de la Tierra — nunca toca el suelo. Eso es una órbita.',
      aplicacion: 'Error crítico a evitar: "en el espacio no hay gravedad" es FALSO. Los astronautas en la Estación Espacial Internacional sienten "ingravidez aparente" porque están en caída libre constante junto con la estación — no porque la gravedad haya desaparecido.',
      compruebra: '¿Por qué un satélite no necesita motores encendidos todo el tiempo para mantenerse en órbita?' },

    { id: 't5', icon: '🌙', titulo: 'Tierra y Luna: un sistema conectado',
      ideaClave: 'La Luna no es solo un objeto bonito en el cielo — su gravedad afecta directamente las mareas, la duración de nuestro día, y hasta la estabilidad del eje terrestre.',
      explicacion: 'La atracción gravitatoria de la Luna (y en menor medida del Sol) produce las <strong>mareas</strong> oceánicas. Cuando el Sol y la Luna se alinean, ocurre la "marea de primavera", un 140% más grande que una marea normal. La fricción de las mareas también hace que la rotación terrestre se vaya frenando muy lentamente con el paso del tiempo.',
      ejemplo: 'La Luna se aleja de la Tierra aproximadamente 3,78 cm por año. Si nunca hubiera existido la Luna, nuestros días serían mucho más cortos (entre 6 y 8 horas), y el eje terrestre no tendría la estabilidad que permite las estaciones del año tal como las conocemos.',
      aplicacion: 'La Luna también actúa como "escudo": por su tamaño y posición, absorbe muchos meteoritos que de otra forma podrían impactar la Tierra — por eso la superficie lunar está llena de cráteres.',
      compruebra: '¿Por qué es posible que ocurran eclipses, si el Sol es muchísimo más grande que la Luna?' },

    { id: 't6', icon: '⭐', titulo: 'Las estrellas también cambian',
      ideaClave: 'Una estrella no es algo estático — nace, "quema" combustible durante miles de millones de años, y termina su vida de una forma que depende directamente de su masa inicial.',
      explicacion: 'Una <strong>nube de gas</strong> suficientemente grande se contrae por gravedad hasta que la fusión nuclear puede comenzar (Hidrógeno → Helio) — así nace una <strong>estrella</strong> (el estado actual de nuestro Sol). Cuando se agota el hidrógeno, la estrella se contrae de nuevo y se convierte en una <strong>gigante roja</strong>, mucho más grande que antes.',
      ejemplo: 'Para una estrella como el Sol: gigante roja → nebulosa planetaria (desprende sus capas externas) → enana blanca (núcleo extremadamente denso, del tamaño de un planeta) → finalmente, enana negra (estrella "muerta").',
      aplicacion: 'Para estrellas mucho más masivas que el Sol (hasta 40 veces más), el final es distinto: una explosión de supernova, seguida de una estrella neutrónica extremadamente compacta. Las estrellas más de 40 veces más masivas que el Sol pueden colapsar hasta convertirse en un agujero negro.',
      compruebra: '¿Qué determina si una estrella termina como enana blanca, estrella neutrónica, o agujero negro?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01 a u06.js) ──── */
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
            ${_bloqueTema('🌌 OBSERVA EL SISTEMA', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Gravity Lab MQC": el simulador estrella.
     Escala: m1,m2 en unidades de ×10¹⁰ kg; r en unidades de ×10⁵ m.
     Verificado: con estos rangos, F queda en un valor legible (≈0,1
     a algunos N), y las proporcionalidades (2F, 4F, F/4, F/9) se
     cumplen exactamente.
     ================================================================ */
  let _glModo = 'explora';
  let _glM1 = 5, _glM2 = 5, _glR = 5; // en unidades de 10^10 kg / 10^5 m
  function _glCalcularF(m1u, m2u, ru) {
    const m1 = m1u * 1e10, m2 = m2u * 1e10, r = ru * 1e5;
    return G_CONST * m1 * m2 / (r * r);
  }
  function renderSim1() {
    if (_glModo === 'predice') return _renderGlPredice();
    const F = _glCalcularF(_glM1, _glM2, _glR);
    const svg = _svgGravedad({ m1Rel: _glM1, m2Rel: _glM2, rLabel: _notacionCientifica(_glR * 1e5, 1) + ' m' });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🌌 Gravity Lab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés m₁, m₂ y r, y mirás cómo cambia la fuerza gravitatoria entre ambos cuerpos.</p>
        ${svg}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">m₁ = <strong style="color:${C}">${_glM1} × 10¹⁰ kg</strong></label>
        <input type="range" id="gl-slider-m1" min="1" max="10" step="1" value="${_glM1}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">m₂ = <strong style="color:${C}">${_glM2} × 10¹⁰ kg</strong></label>
        <input type="range" id="gl-slider-m2" min="1" max="10" step="1" value="${_glM2}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">r = <strong style="color:${C}">${_glR} × 10⁵ m</strong></label>
        <input type="range" id="gl-slider-r" min="1" max="10" step="1" value="${_glR}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          F = G·m₁·m₂/r² = <strong style="color:${C}">${F.toFixed(4)} N</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="gl-ir-predice" style="margin-top:1.2rem">Modo Predice →</button>
      </div>`;
  }
  const GL_RONDAS = [
    { desc: 'Se duplica m₁ (manteniendo m₂ y r)', factor: 2 },
    { desc: 'Se duplican m₁ Y m₂ (manteniendo r)', factor: 4 },
    { desc: 'Se duplica r (manteniendo m₁ y m₂)', factor: 0.25 },
    { desc: 'Se triplica r (manteniendo m₁ y m₂)', factor: 1 / 9 }
  ];
  let _glRondaIdx = 0;
  function _renderGlPredice() {
    if (_glRondaIdx >= GL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${GL_RONDAS.length} predicciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = GL_RONDAS[_glRondaIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="gl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Predicción ${_glRondaIdx + 1} de ${GL_RONDAS.length}</p>
        <p style="margin-bottom:.8rem">Partiendo de una fuerza F inicial: ${r.desc}. ¿Qué le pasa a la fuerza gravitatoria?</p>
        <div style="display:grid;gap:.5rem">
          ${_mezclar(['Se duplica (2F)', 'Se cuadruplica (4F)', 'Se reduce a la mitad (F/2)', 'Se reduce a la cuarta parte (F/4)', 'Se reduce a un noveno (F/9)']).map(op => `<button class="btn btn-ghost" data-gl-opcion="${op}">${op}</button>`).join('')}
        </div>
        <p id="gl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  const GL_RESPUESTAS_CORRECTAS = { 2: 'Se duplica (2F)', 4: 'Se cuadruplica (4F)', 0.25: 'Se reduce a la cuarta parte (F/4)', 0.111: 'Se reduce a un noveno (F/9)' };

  /* ================================================================
     SIMULADOR 2 — "Campo G MQC": planeta central + altura, mostrando
     explícitamente r = R + h (nunca confundir h con r).
     ================================================================ */
  const PLANETAS = {
    tierra: { nombre: 'Tierra', M: 5.98e24, R: 6.37e6 },
    marte: { nombre: 'Marte', M: 6.4e23, R: 3.35e6 }
  };
  let _cgPlaneta = 'tierra', _cgH = 0;
  function renderSim2() {
    const p = PLANETAS[_cgPlaneta];
    const r = p.R + _cgH;
    const g = G_CONST * p.M / (r * r);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🪐 Campo G MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Elegí el planeta y la altura, y mirá cómo cambia la gravedad — siempre usando r = R + h.</p>
        <div style="display:flex;gap:.5rem;margin-bottom:1rem">
          <button class="btn ${_cgPlaneta === 'tierra' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-cg-planeta="tierra">🌍 Tierra</button>
          <button class="btn ${_cgPlaneta === 'marte' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-cg-planeta="marte">🔴 Marte</button>
        </div>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Altura h = <strong style="color:${C}">${(_cgH / 1000).toFixed(0)} km sobre la superficie</strong></label>
        <input type="range" id="cg-slider-h" min="0" max="1000000" step="50000" value="${_cgH}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.8">
          Planeta: ${p.nombre} — M = ${_notacionCientifica(p.M)} kg, R = ${_notacionCientifica(p.R)} m<br>
          r = R + h = ${_notacionCientifica(p.R)} + ${_notacionCientifica(_cgH)} = ${_notacionCientifica(r)} m<br>
          g = G·M/r² = <strong style="color:${C}">${g.toFixed(2)} m/s²</strong>
        </div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Orbit Lab MQC": inercia + gravedad → órbita
     (conceptual, sin mecánica orbital universitaria)
     ================================================================ */
  let _olVelocidad = 5; // escala arbitraria 1-10
  function renderSim3() {
    const resultado = _olVelocidad <= 3 ? 'cae' : (_olVelocidad <= 7 ? 'orbita' : 'escapa');
    const textos = {
      cae: '⬇️ Velocidad insuficiente: la gravedad domina y el objeto cae hacia el planeta.',
      orbita: '🛰️ ¡Órbita lograda! La velocidad tangencial y la gravedad se equilibran — el objeto "cae" continuamente, pero nunca choca contra la superficie.',
      escapa: '🚀 Velocidad de escape: la inercia domina y el objeto se aleja del planeta para siempre.'
    };
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🛰️ Orbit Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Ajustá la velocidad tangencial inicial de un objeto lanzado horizontalmente cerca de un planeta.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad tangencial = <strong style="color:${C}">${_olVelocidad}</strong> (escala relativa)</label>
        <input type="range" id="ol-slider-v" min="1" max="10" step="1" value="${_olVelocidad}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center;font-size:1.4rem">
          ${resultado === 'cae' ? '🌍⬇️🪨' : resultado === 'orbita' ? '🌍🛰️↻' : '🌍 🚀 →'}
        </div>
        <p style="margin-top:.8rem;font-size:.85rem;color:var(--text-secondary)">${textos[resultado]}</p>
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
      { id: 'sim1', titulo: '🌌 Gravity Lab MQC', desc: 'El simulador estrella: controlá m₁, m₂ y r, y predecí cómo cambia la fuerza gravitatoria.' },
      { id: 'sim2', titulo: '🪐 Campo G MQC', desc: 'Elegí Tierra o Marte y una altura, y mirá cómo cambia la gravedad usando r = R + h.' },
      { id: 'sim3', titulo: '🛰️ Orbit Lab MQC', desc: 'Ajustá la velocidad de un objeto y descubrí si cae, orbita, o escapa.' }
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
        _glModo = 'explora'; _glRondaIdx = 0;
        _cgPlaneta = 'tierra'; _cgH = 0;
        _olVelocidad = 5;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => {
        markSimDone(btn.getAttribute('data-sim-cerrar'));
        _simActivo = null; _rerenderSimTab(unit);
      });
    });

    /* Sim1 — Gravity Lab */
    const s1m1 = document.getElementById('gl-slider-m1');
    const s1m2 = document.getElementById('gl-slider-m2');
    const s1r = document.getElementById('gl-slider-r');
    if (s1m1) s1m1.addEventListener('input', () => { _glM1 = parseInt(s1m1.value, 10); _rerenderSimTab(unit); });
    if (s1m2) s1m2.addEventListener('input', () => { _glM2 = parseInt(s1m2.value, 10); _rerenderSimTab(unit); });
    if (s1r) s1r.addEventListener('input', () => { _glR = parseInt(s1r.value, 10); _rerenderSimTab(unit); });
    const irPredice1 = document.getElementById('gl-ir-predice');
    if (irPredice1) irPredice1.addEventListener('click', () => { _glModo = 'predice'; _glRondaIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('gl-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _glModo = 'explora'; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-gl-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-gl-opcion');
        const r = GL_RONDAS[_glRondaIdx];
        const correcta = Math.abs(r.factor - 0.111) < 0.01 ? GL_RESPUESTAS_CORRECTAS[0.111] : GL_RESPUESTAS_CORRECTAS[r.factor];
        const fb = document.getElementById('gl-feedback');
        const ok = elegido === correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es esa. La respuesta correcta: ${correcta}`;
        }
        setTimeout(() => { _glRondaIdx++; if (_glRondaIdx >= GL_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1600);
      });
    });

    /* Sim2 — Campo G */
    document.querySelectorAll('[data-cg-planeta]').forEach(btn => {
      btn.addEventListener('click', () => { _cgPlaneta = btn.getAttribute('data-cg-planeta'); _rerenderSimTab(unit); });
    });
    const s2h = document.getElementById('cg-slider-h');
    if (s2h) s2h.addEventListener('input', () => {
      _cgH = parseInt(s2h.value, 10);
      _rerenderSimTab(unit);
      markSimDone('sim2');
    });

    /* Sim3 — Orbit Lab */
    const s3v = document.getElementById('ol-slider-v');
    if (s3v) s3v.addEventListener('input', () => {
      _olVelocidad = parseInt(s3v.value, 10);
      _rerenderSimTab(unit);
      markSimDone('sim3');
    });
  }

  /* ================================================================
     JUEGO — "Arquitecto de Órbitas": 9 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'La fuerza gravitatoria depende de dos variables: las masas de los cuerpos y la distancia entre ellos.',
      pregunta: '¿Cuál es la relación entre la fuerza gravitatoria y la distancia (r)?', pista: 'Pensá si la relación es directa o inversa, y si es lineal o cuadrática.',
      correcta: 'Inversamente proporcional al cuadrado de la distancia', opciones: ['Inversamente proporcional al cuadrado de la distancia', 'Directamente proporcional a la distancia', 'No tiene ninguna relación con la distancia', 'Inversamente proporcional a la distancia (sin elevar al cuadrado)'] },
    { id: 'nivel2', escenario: 'Dos planetas, A y B, tienen las mismas masas que interactúan, pero A está el doble de lejos que B de un tercer cuerpo.',
      pregunta: '¿Cuál de los dos experimenta mayor fuerza gravitatoria con ese tercer cuerpo?', pista: 'Recordá la relación cuadrática inversa con la distancia.',
      correcta: 'B (más cerca, mayor fuerza)', opciones: ['B (más cerca, mayor fuerza)', 'A (más lejos, mayor fuerza)', 'Ambos sienten la misma fuerza', 'No se puede determinar sin más datos'] },
    { id: 'nivel3', escenario: 'Se triplica la masa de uno de los dos cuerpos que se atraen, manteniendo todo lo demás igual.',
      pregunta: '¿En qué proporción cambia la fuerza gravitatoria?', pista: 'La relación con cada masa es directamente proporcional (no cuadrática).',
      correcta: 'Se triplica también', opciones: ['Se triplica también', 'Se reduce a un tercio', 'Se mantiene igual', 'Se multiplica por 9'] },
    { id: 'nivel4', escenario: 'La distancia entre dos cuerpos se reduce a la mitad.',
      pregunta: '¿En qué proporción cambia la fuerza gravitatoria?', pista: 'La relación con r es al cuadrado — no olvides elevar el factor de cambio al cuadrado.',
      correcta: 'Se cuadruplica (4 veces mayor)', opciones: ['Se cuadruplica (4 veces mayor)', 'Se duplica', 'Se reduce a la mitad', 'Se mantiene igual'] },
    { id: 'nivel5', escenario: 'Un objeto de masa M genera un campo gravitacional que disminuye con la distancia.',
      pregunta: '¿Cuál es la fórmula del campo gravitacional (g)?', pista: 'Es muy parecida a la fórmula de la fuerza, pero usando una sola masa.',
      correcta: 'g = G·M/r²', opciones: ['g = G·M/r²', 'g = G·M·r²', 'g = M/G·r', 'g = G/M·r²'] },
    { id: 'nivel6', escenario: 'Un objeto está a una altura h = 1.000.000 m sobre la superficie de un planeta con radio R = 6.000.000 m.',
      pregunta: '¿Cuál es el valor correcto de "r" para calcular g en ese punto?', pista: 'r es la distancia AL CENTRO del planeta, no solo la altura sobre la superficie.',
      correcta: '7.000.000 m (R + h)', opciones: ['7.000.000 m (R + h)', '1.000.000 m (solo h)', '6.000.000 m (solo R)', '5.000.000 m (R − h)'] },
    { id: 'nivel7', escenario: 'Un satélite se mueve alrededor de la Tierra sin caer ni alejarse indefinidamente.',
      pregunta: '¿Qué dos "efectos" se equilibran para mantenerlo en órbita?', pista: 'Uno lo empuja hacia adelante en línea recta; el otro lo desvía constantemente hacia el planeta.',
      correcta: 'Su inercia (tendencia a seguir en línea recta) y la atracción gravitatoria de la Tierra', opciones: ['Su inercia (tendencia a seguir en línea recta) y la atracción gravitatoria de la Tierra', 'La ausencia total de gravedad y sus motores', 'Solo su inercia, sin ninguna fuerza gravitatoria', 'Solo la gravedad, sin ninguna inercia'] },
    { id: 'nivel8', escenario: 'Se sabe que la Luna se aleja de la Tierra unos 3,78 cm por año, y que sin ella los días serían mucho más cortos.',
      pregunta: '¿Qué relación tiene esto con la gravitación?', pista: 'Pensá en cómo la fricción de las mareas (producidas por la gravedad lunar) afecta la rotación terrestre.',
      correcta: 'La atracción gravitatoria de la Luna produce mareas cuya fricción frena gradualmente la rotación terrestre', opciones: ['La atracción gravitatoria de la Luna produce mareas cuya fricción frena gradualmente la rotación terrestre', 'La Luna no tiene ninguna relación con la duración del día', 'La Tierra frena a la Luna, pero no al revés', 'Las mareas no tienen relación con la gravedad'] },
    { id: 'nivel9', escenario: 'Un ingeniero debe explicar por qué la misma ley explica tanto la caída de una manzana como la órbita de un satélite.',
      pregunta: '¿Cuál es la explicación correcta?', pista: 'Pensá en qué tienen en común ambas situaciones: una fuerza de atracción entre masas.',
      correcta: 'Ambas son manifestaciones de la misma fuerza gravitatoria universal, solo que con distintas velocidades tangenciales', opciones: ['Ambas son manifestaciones de la misma fuerza gravitatoria universal, solo que con distintas velocidades tangenciales', 'Son dos fuerzas completamente distintas y sin relación', 'La manzana cae por gravedad, pero el satélite no tiene ninguna fuerza actuando', 'Solo los objetos pequeños como la manzana sienten gravedad'] }
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
        <h3>🛰️ Misión: Arquitecto de Órbitas</h3>
        <p style="color:var(--text-secondary);font-size:.85rem">MQC necesita diseñar sistemas orbitales — resolvé cada nivel para avanzar.</p>
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
          _juegoFeedback = { texto: `✅ ¡Correcto! ${n.correcta}`, correcto: true };
          setTimeout(() => { _juegoNivelActivo = null; _juegoFeedback = null; _rerenderJuego(unit); }, 1700);
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
     EXAMEN — banco real (js/data/banco-fix10-u07.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U07 !== 'undefined') ? PREGUNTAS_FIX10_U07 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U07</h3>
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
     MISIÓN FINAL — "Operación Órbita" (2 fases: sistema planeta-
     satélite, luego cambio de r para evaluar transferencia)
     ================================================================ */
  const MISION_FASE1 = { m1: 6, m2: 4, r: 4 }; // unidades ×10^10 kg / ×10^5 m
  const MISION_FASE2 = { m1: 6, m2: 4, r: 8 }; // se duplica r
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { fuerza: '', texto: '' };

  function _misionEsperado(datos) {
    return _glCalcularF(datos.m1, datos.m2, datos.r);
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const fuerza = parseFloat(_misionVals.fuerza);
    if (isNaN(fuerza)) return false;
    if (Math.abs(fuerza - esperado) > esperado * 0.15 + 0.001) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Operación Órbita".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🛰️ Misión: Operación Órbita ${_misionFase === 2 ? '— Fase 2 (r duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Un sistema planeta-satélite tiene m₁ = ${datos.m1} × 10¹⁰ kg, m₂ = ${datos.m2} × 10¹⁰ kg, separados por r = ${datos.r} × 10⁵ m.</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Calculá la fuerza gravitatoria (F = G·m₁·m₂/r²), en Newtons:
          <input type="number" step="0.0001" id="mision-fuerza" value="${_misionVals.fuerza}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Explicá qué relación existe entre esta fuerza y el movimiento orbital del satélite:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { fuerza: 'mision-fuerza', texto: 'mision-texto' };
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
          _misionVals = { fuerza: '', texto: '' };
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
