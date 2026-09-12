/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u05.js
   FIX11-U05 — Movimiento ondulatorio
   ================================================================
   RUTA DE CIERRE — FASE 1. Contenido derivado y parafraseado del
   libro fuente "Física 11° — Un enfoque Práctico" (Tema V, apartados
   5.1 a 5.8, páginas 135-161). Los 6 temas de teoría agrupan las 8
   subsecciones reales del libro (5.1 y 5.2 se separan en t1/t2; 5.6,
   5.7 y 5.8 se combinan en t6 por su continuidad temática — efecto
   invernadero, sus riesgos climáticos, y el manejo de desechos como
   parte de la respuesta humana al problema). Mismo patrón exacto que
   las demás unidades. Sistema de juego UNIFICADO desde el inicio.
   FIX10-U01 a U08, FIX11-U01 a U04 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u05';
  const C = 'var(--violet)';

  function _fmt2(x) { return x.toFixed(2).replace('.', ','); }
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

  function _svgOnda(cfg) {
    // cfg: { ciclos?: number, etiqueta?: string }
    const w = 300, h = 130;
    const ciclos = cfg.ciclos || 3;
    const amp = 35, cx0 = 20, cxN = w - 20;
    const paso = (cxN - cx0) / (ciclos * 2);
    let d = `M ${cx0} 65`;
    for (let i = 0; i < ciclos * 2; i++) {
      const x1 = cx0 + i * paso, x2 = cx0 + (i + 1) * paso;
      const yMid = 65 + (i % 2 === 0 ? -amp : amp);
      d += ` Q ${(x1 + x2) / 2} ${yMid} ${x2} 65`;
    }
    return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:320px;display:block;margin:.6rem auto">
      <line x1="${cx0}" y1="65" x2="${cxN}" y2="65" stroke="#8888B0" stroke-width="1" stroke-dasharray="3,3"/>
      <path d="${d}" fill="none" stroke="#1FDBFF" stroke-width="2.5"/>
      <line x1="${cx0 + paso}" y1="65" x2="${cx0 + paso}" y2="30" stroke="#F9FF4D" stroke-width="1.5"/>
      <text x="${cx0 + paso + 6}" y="45" font-size="9" fill="#F9FF4D">Amplitud</text>
      <line x1="${cx0}" y1="20" x2="${cx0 + paso * 2}" y2="20" stroke="#FF6B6B" stroke-width="1.5"/>
      <text x="${cx0}" y="14" font-size="9" fill="#FF6B6B">longitud de onda (λ)</text>
      <text x="${w / 2}" y="${h - 8}" font-size="9" fill="#F9FF4D" text-anchor="middle">${cfg.etiqueta || 'Cresta y valle se repiten cada λ'}</text>
    </svg>`;
  }

  const TEMAS = [
    { id: 't1', icon: '🌊', titulo: 'Las ondas',
      ideaClave: 'Una pelota pateada transporta energía porque ella misma viaja de un punto a otro. Una onda en una cuerda transporta la MISMA idea de energía, pero sin que ningún trozo de cuerda cambie de lugar.',
      explicacion: 'La energía se puede transferir de dos maneras: transportando materia junto con ella (como enviar un electrón o una pelota), o sin transportar materia (enviando una onda, mecánica o electromagnética). Una onda es una forma de transmisión de energía, desde una fuente (origen) hasta un receptor, con velocidad constante mientras se propague en el mismo medio.',
      ejemplo: 'Si hacés vibrar una cuerda sujeta entre dos postes, la energía viaja a través de ella de un extremo a otro, pero la cuerda en sí no se desplaza — cada punto solo sube y baja en su lugar. En cambio, si pateás una pelota, la energía viaja PORQUE la pelota misma (con su masa) se traslada por el aire.',
      aplicacion: 'Esta distinción explica por qué una ola de mar puede tumbar a un bañista sin que el agua "viaje" grandes distancias: la energía de la ola se transmite de molécula en molécula, pero cada partícula de agua básicamente sube y baja en su sitio.',
      compruebra: '¿Por qué se dice que una ola de mar transporta energía, pero NO transporta agua de un lugar a otro?' },

    { id: 't2', icon: '🔀', titulo: 'Clasificación de las ondas',
      ideaClave: 'Las ondas se clasifican bajo dos criterios totalmente distintos: CÓMO vibran respecto a su dirección de viaje, y SI necesitan o no un medio material para propagarse.',
      explicacion: 'Según cómo se propagan: las <strong>ondas longitudinales</strong> vibran paralelamente a su dirección de viaje (como el sonido); las <strong>ondas transversales</strong> vibran perpendicularmente (como la cuerda de una guitarra). Según si requieren medio: las <strong>ondas mecánicas</strong> necesitan un medio material (sólido, líquido o gaseoso) y pueden ser longitudinales o transversales; las <strong>ondas electromagnéticas</strong> NO requieren medio (viajan en el vacío), aunque también pueden propagarse a través de medios materiales, y son SIEMPRE transversales.',
      ejemplo: 'El sonido es una onda mecánica longitudinal (compresión y expansión del aire). La luz, las ondas de radio y las microondas son ondas electromagnéticas, formadas por un campo eléctrico y un campo magnético perpendiculares entre sí y respecto a la dirección de propagación.',
      aplicacion: 'Por eso las llamadas de un celular funcionan en el espacio exterior (donde no hay aire), pero un grito no se puede escuchar ahí — las ondas electromagnéticas no necesitan medio, el sonido sí.',
      compruebra: '¿Por qué el sonido no se puede propagar en el vacío del espacio, pero la luz de las estrellas sí llega hasta nosotros?' },

    { id: 't3', icon: '📏', titulo: 'Características de las ondas',
      ideaClave: 'La velocidad de una onda depende del medio en que viaja — pero la frecuencia y la longitud de onda cambian juntas, de forma inversa, para que esa velocidad se mantenga constante.',
      explicacion: 'Toda onda tiene: <strong>amplitud (A)</strong> — máximo desplazamiento desde la línea de equilibrio, en metros; <strong>longitud de onda (λ)</strong> — menor distancia donde el patrón se repite (ej. entre dos crestas), en metros; <strong>período (T)</strong> — tiempo de una oscilación completa, en segundos; <strong>frecuencia (f)</strong> — vibraciones completas por segundo, en hertz (Hz); y <strong>velocidad (v)</strong>, en m/s. Fórmulas: v=λ/T, v=λ·f, y T=1/f.',
      ejemplo: 'Ejemplo 1 del libro: una onda viaja a 3,0 m/s con frecuencia de 6,0 Hz → λ=v/f=3,0/6,0=0,5 m. Ejemplo 2: una señal de radio FM de 106,3 MHz que viaja a 3,0×10⁸ m/s → λ=v/f≈2,82 m, y T=1/f≈9,41×10⁻⁹ s.',
      aplicacion: 'Si aumentás la frecuencia de una onda sin cambiar el medio (por lo tanto sin cambiar v), su longitud de onda DISMINUYE proporcionalmente — es la relación inversa que se observa, por ejemplo, al comparar ondas de 110 Hz con ondas de 880 Hz en la misma cuerda.',
      compruebra: 'Si una onda viaja a 340 m/s y tiene una frecuencia de 170 Hz, ¿cuál es su longitud de onda (λ=v/f)?' },

    { id: 't4', icon: '🌈', titulo: 'El espectro electromagnético',
      ideaClave: 'Los rayos gamma y las ondas de radio son, en el fondo, el mismo tipo de fenómeno (ondas electromagnéticas) — lo único que cambia es su longitud de onda, y con ella, su frecuencia y su energía.',
      explicacion: 'El espectro electromagnético agrupa todas las radiaciones electromagnéticas, ordenadas en forma creciente según su longitud de onda, y decreciente según su frecuencia y energía. De menor a mayor longitud de onda: rayos gamma, rayos X, ultravioleta, luz visible, infrarrojo, microondas, y ondas de radio. La luz visible (aproximadamente 400 a 700 nm) es la única porción que el ojo humano puede percibir; los violetas/azules tienen la longitud de onda más corta del espectro visible, y los rojos la más larga.',
      ejemplo: 'Los conos del ojo humano (verde, azul y rojo) permiten percibir el color; su daño causa daltonismo. La mayoría de los mamíferos solo tiene dos tipos de conos, las abejas ven ultravioleta, y algunas mariposas tienen hasta cinco tipos de conos, viendo incluso más colores que el ser humano.',
      aplicacion: 'Rayos gamma, rayos X y parte del ultravioleta son radiación ionizante (más peligrosa); luz visible, infrarrojo, microondas y ondas de radio son radiación no ionizante — esta clasificación explica por qué se usa protección especial con rayos X, pero no con la luz de un bombillo.',
      compruebra: '¿Qué tienen en común los rayos X, la luz visible y las ondas de radio, aunque se vean y se usen tan diferente entre sí?' },

    { id: 't5', icon: '📡', titulo: 'Las ondas en la vida cotidiana',
      ideaClave: 'El eco solo ocurre si la superficie reflectante está lo bastante lejos de la fuente del sonido — muy cerca, el cerebro no logra distinguir el sonido original del reflejado.',
      explicacion: 'El <strong>eco</strong> es la reflexión de una onda sonora en una superficie (pared, montaña, cueva); requiere una separación mínima de 17 m para sonidos musicales, o 11,34 m para sonidos secos. Las <strong>ondas sísmicas</strong> se componen de ondas P (más rápidas, ~5 km/s en roca, atraviesan sólido/líquido/gas), ondas S (más lentas, NO existen en líquidos ni gases), y ondas superficiales (viajan solo por la superficie de la corteza). Muchas tecnologías cotidianas dependen de ondas: telegrafía, radio, TV, GPS, celulares, rayos X médicos, ultrasonido, y hornos de microondas.',
      ejemplo: 'Un alpinista grita hacia un acantilado y escucha el eco 5,0 s después; con el sonido viajando a 340 m/s, la distancia al acantilado es d=v·t/2=(340×5,0)/2=850 m — el sonido debe recorrer la distancia de ida Y de vuelta.',
      aplicacion: 'Los sismólogos aprovechan que las ondas P viajan más rápido que las S: midiendo cuánto tiempo pasa entre la llegada de cada una a una estación sismográfica, pueden estimar qué tan lejos ocurrió el sismo.',
      compruebra: '¿Por qué las ondas S no sirven para estudiar las partes líquidas del interior de la Tierra, pero las ondas P sí?' },

    { id: 't6', icon: '🌍', titulo: 'Efecto invernadero, riesgos climáticos y manejo de desechos',
      ideaClave: 'El efecto invernadero en sí mismo es un fenómeno NATURAL y necesario para la vida — sin él, la Tierra tendría unos -18°C en vez de los 15°C promedio actuales. El problema es que la actividad humana lo está intensificando.',
      explicacion: 'Ciertos gases atmosféricos retienen parte de la energía que el suelo terrestre emite tras calentarse con el Sol (efecto invernadero). El CO₂ es responsable del 76% de la contribución REAL al efecto invernadero, aunque su "acción relativa" por gramo es mucho menor que la de otros gases (CFCs: 5% de contribución real, pero 15.000 veces más acción relativa que el CO₂ por gramo — lo que pasa es que hay MUCHO más CO₂ en la atmósfera). El aumento de este efecto genera cambio climático: inundaciones, sequías, huracanes más intensos, olas de calor/frío, e incendios forestales. El manejo responsable de los desechos sólidos (separar orgánicos, plásticos y reciclables) es una de las acciones que reduce el impacto ambiental, evitando lixiviados contaminantes hacia los mantos acuíferos.',
      ejemplo: 'Gases de efecto invernadero y su contribución real, según la fuente: CO₂ 76%, CH₄ (metano) 13%, N₂O (óxido nitroso) 6%, y CFCs 5% — a pesar de que, gramo por gramo, el CFC es 15.000 veces más potente que el CO₂.',
      aplicacion: 'En Costa Rica, el Ministerio de Salud publicó en 2016 el Plan Nacional para la gestión integral de residuos (2016-2021), y algunas empresas ofrecen un pago simbólico por ciertos desechos reciclables, incentivando su separación en el hogar.',
      compruebra: 'Si el CFC tiene una acción relativa 15.000 veces mayor que el CO₂, ¿por qué el CO₂ es responsable del 76% del efecto invernadero real, y el CFC de solo el 5%?' }
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
    const ondaEjemplo = _svgOnda({ ciclos: 3 });
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
            ${i === 2 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">🔎 EJEMPLO</p><p style="margin:0 0 .4rem">${t.ejemplo}</p>${ondaEjemplo}</div>` : _bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Wave Lab MQC": el simulador estrella.
     Sliders de v y f, cálculo en vivo de λ=v/f y T=1/f. Modo Desafío
     con 4 rondas (pide λ o T dados v y f).
     ================================================================ */
  let _wlSubmodo = 'explora'; // 'explora' | 'desafio'
  let _wlV = 340, _wlF = 170;
  function _wlCalcular() {
    const lambda = _wlV / _wlF;
    const T = 1 / _wlF;
    return { lambda, T };
  }
  function renderSim1() {
    if (_wlSubmodo === 'desafio') return _renderWlDesafio();
    const r = _wlCalcular();
    const svg = _svgOnda({ ciclos: 3, etiqueta: `v=${_wlV} m/s, f=${_wlF} Hz` });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🌊 Wave Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la velocidad y la frecuencia de la onda, y mirás en vivo cómo cambian su longitud de onda (λ) y su período (T).</p>
        ${svg}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Velocidad (v) = <strong style="color:${C}">${_wlV} m/s</strong></label>
        <input type="range" id="wl-slider-v" min="10" max="1500" step="10" value="${_wlV}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Frecuencia (f) = <strong style="color:${C}">${_wlF} Hz</strong></label>
        <input type="range" id="wl-slider-f" min="10" max="500" step="10" value="${_wlF}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.8">
          λ = v/f = <strong style="color:${C}">${_fmt2(r.lambda)} m</strong><br>
          T = 1/f = <strong style="color:${C}">${_fmt2(r.T)} s</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="wl-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const WL_RONDAS = [
    { v: 340, f: 170, pide: 'lambda' }, // λ=2,0 m
    { v: 200, f: 40, pide: 'lambda' },  // λ=5,0 m
    { v: 20, f: 4, pide: 'T' },         // T=0,25 s
    { v: 60, f: 10, pide: 'T' }         // T=0,10 s
  ];
  let _wlDesafioIdx = 0;
  function _renderWlDesafio() {
    if (_wlDesafioIdx >= WL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${WL_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const d = WL_RONDAS[_wlDesafioIdx];
    const pideTexto = d.pide === 'lambda' ? '¿Cuál es su longitud de onda (λ=v/f)?' : '¿Cuál es su período (T=1/f)?';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="wl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_wlDesafioIdx + 1} de ${WL_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">Una onda viaja a v=${d.v} m/s con una frecuencia de f=${d.f} Hz.</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.01" id="wl-respuesta" placeholder="${d.pide === 'lambda' ? 'λ (m)' : 'T (s)'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="wl-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="wl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Espectro EM Explorer": selector de tipo de
     radiación, con sus características reales del libro. Modo
     Desafío: comparar energía entre dos radiaciones al azar.
     ================================================================ */
  const ESPECTRO_TIPOS = [
    { nombre: 'Ondas de radio', ejemplo: 'Radio AM/FM, comunicación satelital, GPS', ionizante: false },
    { nombre: 'Microondas', ejemplo: 'Hornos de microondas, radares, wifi', ionizante: false },
    { nombre: 'Infrarrojo', ejemplo: 'Controles remotos, cámaras térmicas, calor', ionizante: false },
    { nombre: 'Luz visible', ejemplo: 'Lo único que el ojo humano puede percibir directamente', ionizante: false },
    { nombre: 'Ultravioleta', ejemplo: 'Luz solar (causa quemaduras), lámparas germicidas', ionizante: true },
    { nombre: 'Rayos X', ejemplo: 'Radiografías médicas, escaneo de equipaje', ionizante: true },
    { nombre: 'Rayos gamma', ejemplo: 'Tratamiento contra el cáncer, centrales nucleares', ionizante: true }
  ];
  // índice 0 = mayor longitud de onda/menor energía (radio) ... 6 = menor longitud de onda/mayor energía (gamma)
  let _emIdx = 3;
  let _emSubmodo = 'explora';
  function renderSim2() {
    if (_emSubmodo === 'desafio') return _renderEmDesafio();
    const t = ESPECTRO_TIPOS[_emIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🌈 Espectro EM Explorer</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Recorré el espectro electromagnético completo, de las ondas de radio (menos energía) a los rayos gamma (más energía).</p>
        <input type="range" id="em-slider" min="0" max="${ESPECTRO_TIPOS.length - 1}" step="1" value="${_emIdx}" style="width:100%">
        <div style="display:flex;justify-content:space-between;font-size:.65rem;color:var(--text-muted);margin-top:.2rem">
          <span>← Menor energía</span><span>Mayor energía →</span>
        </div>
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1rem">
          <h4 style="margin:0 0 .4rem;color:${C}">${t.nombre}</h4>
          <p style="font-size:.85rem;color:var(--text-secondary);margin:0 0 .5rem">Ejemplos de uso: ${t.ejemplo}</p>
          <p style="font-size:.8rem;margin:0">
            <span style="padding:.2rem .5rem;border-radius:4px;background:${t.ionizante ? 'var(--red)' : 'var(--green)'}22;color:${t.ionizante ? 'var(--red)' : 'var(--green)'};font-weight:700">
              ${t.ionizante ? '⚠️ Radiación ionizante' : '✓ Radiación no ionizante'}
            </span>
          </p>
        </div>
        <button class="btn btn-primary btn-sm" id="em-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const EM_RONDAS = 4;
  let _emDesafioIdx = 0;
  let _emParActual = null;
  function _emNuevoPar() {
    let a = Math.floor(Math.random() * ESPECTRO_TIPOS.length);
    let b = Math.floor(Math.random() * ESPECTRO_TIPOS.length);
    while (b === a) b = Math.floor(Math.random() * ESPECTRO_TIPOS.length);
    _emParActual = { a, b };
  }
  function _renderEmDesafio() {
    if (_emDesafioIdx >= EM_RONDAS) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${EM_RONDAS} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    if (!_emParActual) _emNuevoPar();
    const ta = ESPECTRO_TIPOS[_emParActual.a], tb = ESPECTRO_TIPOS[_emParActual.b];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="em-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_emDesafioIdx + 1} de ${EM_RONDAS}</p>
        <p style="margin-bottom:.8rem">¿Cuál de estas dos radiaciones tiene MAYOR energía?</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-em-resp="${_emParActual.a}">${ta.nombre}</button>
          <button class="btn btn-ghost" data-em-resp="${_emParActual.b}">${tb.nombre}</button>
        </div>
        <p id="em-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Eco Lab MQC": eco/ondas sísmicas, t=2d/v
     ================================================================ */
  let _ecoSubmodo = 'explora';
  let _ecoD = 340, _ecoV = 340;
  function _ecoCalcularT() { return (2 * _ecoD) / _ecoV; }
  function renderSim3() {
    if (_ecoSubmodo === 'desafio') return _renderEcoDesafio();
    const t = _ecoCalcularT();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">📢 Eco Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Gritás hacia una pared o acantilado a cierta distancia (d). El sonido viaja de ida y de vuelta antes de que escuches el eco: t=2d/v.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Distancia (d) = <strong style="color:${C}">${_ecoD} m</strong></label>
        <input type="range" id="eco-slider-d" min="10" max="1000" step="10" value="${_ecoD}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Velocidad del sonido (v) = <strong style="color:${C}">${_ecoV} m/s</strong></label>
        <input type="range" id="eco-slider-v" min="300" max="360" step="5" value="${_ecoV}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          t = 2d/v = <strong style="color:${C}">${_fmt2(t)} s</strong>
        </div>
        <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">💡 Recordá: el sonido recorre la distancia de IDA y de VUELTA, por eso se multiplica d por 2.</p>
        <button class="btn btn-primary btn-sm" id="eco-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const ECO_RONDAS = [
    { d: 850, v: 340, pide: 't' },   // t=5,0 s (acantilado, ejemplo del libro)
    { d: 12, v: 340, pide: 't' },    // t≈0,07 s (cueva, ejemplo del libro)
    { t: 1.06, v: 340, pide: 'd' },  // d≈180,2 m (cueva, ejercicio del libro)
    { t: 2.0, v: 340, pide: 'd' }    // d=340 m
  ];
  let _ecoDesafioIdx = 0;
  function _ecoEsperado(r) {
    if (r.pide === 't') return (2 * r.d) / r.v;
    return (r.v * r.t) / 2;
  }
  function _renderEcoDesafio() {
    if (_ecoDesafioIdx >= ECO_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${ECO_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = ECO_RONDAS[_ecoDesafioIdx];
    const enunciado = r.pide === 't'
      ? `Una superficie reflectante está a d=${r.d} m, y el sonido viaja a v=${r.v} m/s.`
      : `Se escucha un eco t=${r.t} s después de gritar, con el sonido viajando a v=${r.v} m/s.`;
    const pideTexto = r.pide === 't' ? '¿En cuánto tiempo se escuchará el eco (t=2d/v)?' : '¿A qué distancia está la superficie reflectante (d=v·t/2)?';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="eco-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_ecoDesafioIdx + 1} de ${ECO_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">${enunciado}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.01" id="eco-respuesta" placeholder="${r.pide === 't' ? 't (s)' : 'd (m)'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="eco-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="eco-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '🌊 Wave Lab MQC', desc: 'El simulador estrella: ajustá v y f de una onda, mirá en vivo λ y T, y practicá ejercicios de Modo Desafío.' },
      { id: 'sim2', titulo: '🌈 Espectro EM Explorer', desc: 'Recorré el espectro electromagnético completo y comparé la energía de distintas radiaciones.' },
      { id: 'sim3', titulo: '📢 Eco Lab MQC', desc: 'Calculá el tiempo o la distancia de un eco, igual que los ejercicios del libro sobre cuevas y acantilados.' }
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
        _wlSubmodo = 'explora'; _wlDesafioIdx = 0;
        _emSubmodo = 'explora'; _emDesafioIdx = 0; _emParActual = null;
        _ecoSubmodo = 'explora'; _ecoDesafioIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Wave Lab */
    const s1v = document.getElementById('wl-slider-v');
    const s1f = document.getElementById('wl-slider-f');
    if (s1v) s1v.addEventListener('input', () => { _wlV = parseInt(s1v.value, 10); _rerenderSimTab(unit); });
    if (s1f) s1f.addEventListener('input', () => { _wlF = parseInt(s1f.value, 10); _rerenderSimTab(unit); });
    const irDesafioWl = document.getElementById('wl-ir-desafio');
    if (irDesafioWl) irDesafioWl.addEventListener('click', () => { _wlSubmodo = 'desafio'; _wlDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraWl = document.getElementById('wl-ir-explora');
    if (irExploraWl) irExploraWl.addEventListener('click', () => { _wlSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarWl = document.getElementById('wl-comprobar');
    if (comprobarWl) comprobarWl.addEventListener('click', () => {
      const d = WL_RONDAS[_wlDesafioIdx];
      const esperado = d.pide === 'lambda' ? d.v / d.f : 1 / d.f;
      const val = parseFloat(document.getElementById('wl-respuesta').value);
      const fb = document.getElementById('wl-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.05;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${_fmt2(esperado)} ${d.pide === 'lambda' ? 'm' : 's'}.`;
        if (ok) setTimeout(() => { _wlDesafioIdx++; if (_wlDesafioIdx >= WL_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — Espectro EM Explorer */
    const s2 = document.getElementById('em-slider');
    if (s2) s2.addEventListener('input', () => { _emIdx = parseInt(s2.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    const irDesafioEm = document.getElementById('em-ir-desafio');
    if (irDesafioEm) irDesafioEm.addEventListener('click', () => { _emSubmodo = 'desafio'; _emDesafioIdx = 0; _emParActual = null; _rerenderSimTab(unit); });
    const irExploraEm = document.getElementById('em-ir-explora');
    if (irExploraEm) irExploraEm.addEventListener('click', () => { _emSubmodo = 'explora'; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-em-resp]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = parseInt(btn.getAttribute('data-em-resp'), 10);
        const mayor = Math.max(_emParActual.a, _emParActual.b); // índice más alto = más energía
        const ok = elegido === mayor;
        const fb = document.getElementById('em-feedback');
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es esa. ${ESPECTRO_TIPOS[mayor].nombre} tiene mayor energía (menor longitud de onda).`;
        }
        setTimeout(() => { _emDesafioIdx++; _emParActual = null; if (_emDesafioIdx >= EM_RONDAS) markSimDone('sim2'); _rerenderSimTab(unit); }, 1600);
      });
    });

    /* Sim3 — Eco Lab */
    const s3d = document.getElementById('eco-slider-d');
    const s3v = document.getElementById('eco-slider-v');
    if (s3d) s3d.addEventListener('input', () => { _ecoD = parseInt(s3d.value, 10); _rerenderSimTab(unit); });
    if (s3v) s3v.addEventListener('input', () => { _ecoV = parseInt(s3v.value, 10); _rerenderSimTab(unit); });
    const irDesafioEco = document.getElementById('eco-ir-desafio');
    if (irDesafioEco) irDesafioEco.addEventListener('click', () => { _ecoSubmodo = 'desafio'; _ecoDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraEco = document.getElementById('eco-ir-explora');
    if (irExploraEco) irExploraEco.addEventListener('click', () => { _ecoSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarEco = document.getElementById('eco-comprobar');
    if (comprobarEco) comprobarEco.addEventListener('click', () => {
      const r = ECO_RONDAS[_ecoDesafioIdx];
      const esperado = _ecoEsperado(r);
      const val = parseFloat(document.getElementById('eco-respuesta').value);
      const fb = document.getElementById('eco-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= (r.pide === 't' ? 0.05 : 1);
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${_fmt2(esperado)} ${r.pide === 't' ? 's' : 'm'}.`;
        if (ok) setTimeout(() => { _ecoDesafioIdx++; if (_ecoDesafioIdx >= ECO_RONDAS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1500);
      }
    });
  }

  /* ================================================================
     JUEGO — "Explorador de Ondas": 7 niveles. Sistema unificado
     desde el inicio (una pregunta a la vez).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Una pelota es pateada y viaja por el aire; al mismo tiempo, una cuerda vibra transmitiendo una onda de un extremo a otro.',
      pregunta: '¿Cuál de las dos SÍ transporta materia junto con la energía?', pista: 'Pensá en qué se traslada físicamente de un punto a otro en cada caso.',
      correcta: 'La pelota pateada', opciones: ['La pelota pateada', 'La onda en la cuerda', 'Ninguna de las dos transporta energía', 'Ambas transportan materia por igual'] },
    { id: 'nivel2', escenario: 'En la cuerda de una guitarra al vibrar, cada punto se mueve perpendicularmente a la dirección en que viaja la onda.',
      pregunta: '¿Cómo se clasifica este tipo de onda, según su forma de propagación?', pista: 'Perpendicular a la dirección de viaje...',
      correcta: 'Transversal', opciones: ['Transversal', 'Longitudinal', 'Sísmica', 'Electromagnética'] },
    { id: 'nivel3', escenario: 'Una nave espacial envía señales de radio a través del vacío del espacio, donde no existe ningún tipo de aire o materia.',
      pregunta: '¿Qué tipo de onda es, ya que puede viajar sin necesitar ningún medio material?', pista: 'Es el único tipo de onda que no necesita medio.',
      correcta: 'Electromagnética', opciones: ['Electromagnética', 'Mecánica longitudinal', 'Mecánica transversal', 'Sísmica superficial'] },
    { id: 'nivel4', escenario: 'Una onda viaja a 340 m/s con una frecuencia de 170 Hz.',
      pregunta: '¿Cuál es su longitud de onda (λ=v/f)?', pista: 'Dividí la velocidad entre la frecuencia.',
      correcta: '2,0 m', opciones: ['2,0 m', '0,5 m', '170 m', '57.800 m'] },
    { id: 'nivel5', escenario: 'En el espectro electromagnético, las radiaciones se ordenan de forma creciente según su longitud de onda.',
      pregunta: '¿Qué pasa con la frecuencia y la energía conforme la longitud de onda aumenta?', pista: 'Es una relación inversa en ambos casos.',
      correcta: 'Ambas disminuyen', opciones: ['Ambas disminuyen', 'Ambas aumentan', 'La frecuencia aumenta pero la energía disminuye', 'Ninguna de las dos cambia'] },
    { id: 'nivel6', escenario: 'Durante un terremoto, una estación sismográfica registra primero un tipo de onda, y bastante después registra otro tipo, más lento.',
      pregunta: '¿Cuál de los dos tipos de ondas sísmicas (P o S) llega PRIMERO, por ser más rápida?', pista: 'Recordá cuál viaja a unos 5 km/s en la roca.',
      correcta: 'Las ondas P', opciones: ['Las ondas P', 'Las ondas S', 'Las ondas superficiales', 'Llegan siempre exactamente al mismo tiempo'] },
    { id: 'nivel7', escenario: 'Un gas de efecto invernadero tiene una acción relativa 15.000 veces mayor que el CO₂ por cada gramo emitido, pero su contribución real al efecto invernadero es de apenas un 5%.',
      pregunta: '¿Cuál es la explicación de esta aparente contradicción?', pista: 'La contribución real depende de la acción relativa Y de la cantidad presente en la atmósfera.',
      correcta: 'Hay mucha menos cantidad de ese gas en la atmósfera que de CO₂', opciones: ['Hay mucha menos cantidad de ese gas en la atmósfera que de CO₂', 'El dato del libro está equivocado', 'Ese gas en realidad no afecta el clima de ninguna forma', 'El CO₂ tiene mayor acción relativa individual que ese gas'] }
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
        <h3 style="margin:0 0 .3rem">🧭 Explorador de Ondas</h3>
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
     EXAMEN — banco real (js/data/banco-fix11-u05.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U05 !== 'undefined') ? PREGUNTAS_FIX11_U05 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U05</h3>
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
     MISIÓN FINAL — "Diseño de una Antena de Radio" (2 fases,
     usando v=λ·f — se duplica la frecuencia entre fases, para que
     el estudiante confirme la relación inversa con λ)
     ================================================================ */
  const MISION_V = 3.0e8; // velocidad de la luz (ondas electromagnéticas), m/s
  const MISION_FASE1 = { f: 100e6 };  // 100 MHz -> λ=3,0 m
  const MISION_FASE2 = { f: 200e6 };  // 200 MHz (el doble) -> λ=1,5 m
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { lambda: '', texto: '' };

  function _misionEsperado(datos) {
    return MISION_V / datos.f;
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const val = parseFloat(_misionVals.lambda);
    if (isNaN(val)) return false;
    if (Math.abs(val - esperado) > esperado * 0.1) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Diseño de una Antena de Radio".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const fMHz = datos.f / 1e6;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🧭 Misión: Diseño de una Antena de Radio ${_misionFase === 2 ? '— Fase 2 (frecuencia duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Una estación de radio emite a f=${fMHz} MHz, y las ondas de radio viajan a v=3,0×10⁸ m/s (la velocidad de la luz, por ser ondas electromagnéticas).</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Calculá la longitud de onda (λ=v/f), en metros:
          <input type="number" step="0.01" id="mision-lambda" value="${_misionVals.lambda}" placeholder="m" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. ${_misionFase === 1 ? 'Explicá qué le pasaría a la longitud de onda si la estación DUPLICA su frecuencia, manteniendo la misma velocidad:' : 'Ya calculaste λ para el doble de frecuencia. Explicá, en tus propias palabras, por qué λ cambió de esa forma exacta:'}
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { lambda: 'mision-lambda', texto: 'mision-texto' };
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
          _misionVals = { lambda: '', texto: '' };
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
