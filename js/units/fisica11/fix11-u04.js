/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u04.js
   FIX11-U04 — Magnetismo y electromagnetismo
   ================================================================
   RUTA DE CIERRE — FASE 1. Contenido derivado y parafraseado del
   libro fuente "Física 11° — Un enfoque Práctico" (Tema IV, apartados
   4.1 a 4.6, páginas 117-126). Sistema de juego UNIFICADO desde el
   inicio (una pregunta a la vez, como el examen).
   FIX10-U01 a U08, FIX11-U01 a U03 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u04';
  const C = 'var(--violet)';
  const MU0 = 4 * Math.PI * 1e-7;

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

  function _svgImanes(cfg) {
    // cfg: { modo: 'atraen'|'repelen' }
    const w = 260, h = 100;
    const desplazamiento = cfg.modo === 'atraen' ? 20 : 0;
    const x1 = cfg.modo === 'atraen' ? 60 : 40, x2 = cfg.modo === 'atraen' ? 140 : 160;
    return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:300px;display:block;margin:.6rem auto">
      <rect x="${x1}" y="35" width="30" height="30" fill="#FF6B6B"/>
      <text x="${x1+15}" y="55" font-size="14" fill="#161a3d" text-anchor="middle" font-weight="800">N</text>
      <rect x="${x1+30}" y="35" width="30" height="30" fill="#1FDBFF"/>
      <text x="${x1+45}" y="55" font-size="14" fill="#161a3d" text-anchor="middle" font-weight="800">S</text>
      <rect x="${x2}" y="35" width="30" height="30" fill="${cfg.modo === 'atraen' ? '#1FDBFF' : '#FF6B6B'}"/>
      <text x="${x2+15}" y="55" font-size="14" fill="#161a3d" text-anchor="middle" font-weight="800">${cfg.modo === 'atraen' ? 'S' : 'N'}</text>
      <rect x="${x2+30}" y="35" width="30" height="30" fill="${cfg.modo === 'atraen' ? '#FF6B6B' : '#1FDBFF'}"/>
      <text x="${x2+45}" y="55" font-size="14" fill="#161a3d" text-anchor="middle" font-weight="800">${cfg.modo === 'atraen' ? 'N' : 'S'}</text>
      <text x="${w/2}" y="85" font-size="9" fill="#F9FF4D" text-anchor="middle">${cfg.modo === 'atraen' ? 'Polos opuestos: SE ATRAEN' : 'Polos iguales: SE REPELEN'}</text>
    </svg>`;
  }

  const TEMAS = [
    { id: 't1', icon: '🧲', titulo: 'El magnetismo',
      ideaClave: 'Un imán es simplemente una pieza de metal (o aleación) que ejerce una fuerza a distancia sobre objetos de hierro, níquel o cobalto — sin necesidad de tocarlos.',
      explicacion: 'El magnetismo es una de las fuerzas fundamentales de la naturaleza, igual que la gravedad. Es un fenómeno físico por el que un objeto genera repulsión o ejerce atracción sobre otros materiales — propiedad fácilmente detectable en el hierro, el níquel, el cobalto y sus aleaciones.',
      ejemplo: 'Los imanes naturales (conocidos desde hace miles de años, descubiertos en Magnesia, Grecia) son pedazos de óxido de hierro llamados magnetita, de color negruzco. Los imanes artificiales se fabrican intencionalmente para aplicaciones específicas.',
      aplicacion: 'Los imanes se usan en motores, medidores, radios, televisores, altavoces, aros para auriculares, brújulas, cierres para heladeras, bandas magnéticas de tarjetas, grúas magnéticas, generadores, y detectores de metales, entre muchas otras aplicaciones cotidianas.',
      compruebra: '¿Qué tres metales son atraídos característicamente por un imán?' },

    { id: 't2', icon: '⚡', titulo: 'Experimento de Oersted',
      ideaClave: 'Una corriente eléctrica genera, a su alrededor, un campo magnético — este descubrimiento conectó dos fenómenos que antes se consideraban completamente separados.',
      explicacion: 'Al cerrar un circuito con una aguja de brújula cerca, Oersted observó que la aguja se deflectaba 90° — descubriendo así el electromagnetismo. El campo magnético generado por una corriente es un vector, y su dirección se obtiene con la regla de la mano derecha: el pulgar apunta en la dirección de la corriente, y los demás dedos indican la dirección del campo magnético (que gira alrededor del conductor).',
      ejemplo: 'Por convención, si el campo magnético "entra" al plano del dibujo, se representa con equis (×); si "sale" del plano, se representa con puntos (•).',
      aplicacion: 'Einstein señaló en 1905 que el campo magnético es, en realidad, una consecuencia relativista del campo eléctrico — existe una relación muy estrecha entre electricidad y magnetismo, debido a las "deformaciones" que experimenta el campo eléctrico por el movimiento de la carga.',
      compruebra: 'Según la regla de la mano derecha, si el pulgar apunta en la dirección de la corriente, ¿qué indican los demás dedos?' },

    { id: 't3', icon: '🔵', titulo: 'Características de los imanes',
      ideaClave: 'No importa cuántas veces cortes un imán en pedazos más pequeños — SIEMPRE vas a obtener nuevos imanes con sus dos polos (Norte y Sur), nunca un polo aislado.',
      explicacion: 'Los polos de un imán son los extremos donde la fuerza magnética se concentra con mayor intensidad. Polos del mismo nombre se repelen; polos de nombre contrario se atraen. Una brújula aprovecha la propiedad de los imanes de orientarse — su aguja imantada señala aproximadamente el norte geográfico.',
      ejemplo: 'La magnetización inducida temporal ocurre, por ejemplo, cuando unos clips se imantan temporalmente al acercarlos a un imán — sus electrones internos, que normalmente giran al azar, se reordenan en un mismo sentido. Al alejarlos del imán, esa capacidad magnética se va perdiendo con el tiempo.',
      aplicacion: 'Si cortás un imán en dos partes, obtenés DOS imanes, cada uno con sus propios polos Norte y Sur — los polos magnéticos no pueden existir de forma aislada, solo como dipolos.',
      compruebra: 'Si cortás un imán con polos N-S en 4 pedazos, ¿cuántos polos Norte y cuántos polos Sur vas a tener en total?' },

    { id: 't4', icon: '🌀', titulo: 'Campo magnético: bobina y solenoide',
      ideaClave: 'Enrollar un cable en espiras concentra el efecto magnético — más vueltas, o más corriente, significa un campo magnético más intenso.',
      explicacion: 'Una bobina es un conductor arrollado alrededor de un tubo, con cada vuelta a la par de la otra: B = μ₀·N·I/(2r), donde μ₀=4π×10⁻⁷ T·m/A es la constante de permeabilidad magnética, N es el número de vueltas, I es la corriente, y r es el radio interno. Un solenoide es similar, pero con las vueltas separadas a lo largo de una longitud L: B = μ₀·N·I/L.',
      ejemplo: 'Un solenoide con N=2.000 espiras, L=0,60 m, I=5,0 A: B = (4π×10⁻⁷)(2000)(5,0)/0,60 ≈ 2,09×10⁻² T.',
      aplicacion: 'Estas fórmulas también se pueden despejar al revés: si conocés B, N y r, podés calcular la corriente I necesaria. Por ejemplo, una bobina con N=80 espiras, B=5,8×10⁻⁴ T, r=0,30 m, requiere I≈3,46 A.',
      compruebra: 'Si duplicás el número de vueltas (N) de una bobina, manteniendo todo lo demás igual, ¿qué le pasa al campo magnético (B)?' },

    { id: 't5', icon: '📏', titulo: 'Campo magnético en un conductor recto y magnetismo terrestre',
      ideaClave: 'La Tierra entera se comporta como un gigantesco imán — pero sus polos magnéticos NO coinciden exactamente con sus polos geográficos.',
      explicacion: 'El campo magnético de un conductor largo y recto forma círculos concéntricos perpendiculares a la corriente: B = μ₀·I/(2πr). Por su parte, el magnetismo terrestre ocurre porque la Tierra tiene grandes depósitos de hierro en su interior, que junto con el movimiento rotacional, actúan en conjunto como un gran imán (descubierto por William Gilbert).',
      ejemplo: 'El Polo Sur Magnético se localiza aproximadamente a 1.600 km del Polo Norte Geográfico (al norte de Canadá), y el Polo Norte Magnético se localiza aproximadamente a 2.500 km del Polo Sur Geográfico (cerca de América del Sur, región Antártida) — los polos magnéticos están efectivamente invertidos respecto a los polos geográficos.',
      aplicacion: 'Esta es la razón por la que una brújula (que señala el polo Sur magnético de la Tierra) apunta aproximadamente, pero no exactamente, hacia el norte geográfico verdadero.',
      compruebra: '¿Los polos magnéticos de la Tierra coinciden exactamente con sus polos geográficos?' },

    { id: 't6', icon: '🔄', titulo: 'Experimento de Faraday',
      ideaClave: 'Faraday demostró lo contrario de Oersted: así como una corriente genera un campo magnético, un campo magnético EN MOVIMIENTO puede generar una corriente eléctrica.',
      explicacion: 'Michael Faraday descubrió la inducción electromagnética: al acercar o alejar un imán de una espira conductora (sin ninguna fuente de alimentación eléctrica), un galvanómetro detecta el paso de corriente MIENTRAS el imán está en movimiento. La Ley de Faraday establece que se genera corriente si hay movimiento relativo entre el conductor y el campo magnético.',
      ejemplo: 'El sentido de la corriente al ACERCAR el imán es opuesto al sentido cuando se ALEJA. Si el imán se mantiene fijo y es la espira la que se mueve, el resultado es el mismo — lo que importa es el movimiento RELATIVO entre ambos.',
      aplicacion: 'La cámara de Kirlian (inventada en 1939) usa una "bobina de Tesla" con campos electromagnéticos de alto voltaje para fotografiar descargas eléctricas — pero solo indica variaciones de presión, humedad, contacto a tierra y conductividad, no "auras" místicas como a veces se cree popularmente.',
      compruebra: 'Si acercás un imán a una espira y luego lo alejás, ¿la corriente inducida tiene el mismo sentido en ambos casos, o sentidos opuestos?' }
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
    const imanEjemplo = _svgImanes({ modo: 'atraen' });
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
            ${i === 2 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">🔎 EJEMPLO</p><p style="margin:0 0 .4rem">${t.ejemplo}</p>${imanEjemplo}</div>` : _bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Magnetic Field Lab": el simulador estrella.
     Selector bobina/solenoide/conductor, N/I/r/L interactivos.
     ================================================================ */
  let _mfTipo = 'bobina';
  let _mfN = 500, _mfI = 5, _mfR = 0.1, _mfL = 0.5;
  function _mfCalcularB() {
    if (_mfTipo === 'bobina') return MU0 * _mfN * _mfI / (2 * _mfR);
    if (_mfTipo === 'solenoide') return MU0 * _mfN * _mfI / _mfL;
    return MU0 * _mfI / (2 * Math.PI * _mfR); // conductor recto
  }
  function renderSim1() {
    const B = _mfCalcularB();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🌀 Magnetic Field Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Elegí el tipo de fuente y movés sus variables, para ver el campo magnético (B) resultante.</p>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">
          <button class="btn ${_mfTipo === 'bobina' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-mf-tipo="bobina">Bobina</button>
          <button class="btn ${_mfTipo === 'solenoide' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-mf-tipo="solenoide">Solenoide</button>
          <button class="btn ${_mfTipo === 'conductor' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-mf-tipo="conductor">Conductor recto</button>
        </div>
        ${_mfTipo !== 'conductor' ? `
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">N (vueltas) = <strong style="color:${C}">${_mfN}</strong></label>
        <input type="range" id="mf-slider-n" min="10" max="2000" step="10" value="${_mfN}" style="width:100%">` : ''}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">I (corriente) = <strong style="color:${C}">${_mfI} A</strong></label>
        <input type="range" id="mf-slider-i" min="1" max="20" step="1" value="${_mfI}" style="width:100%">
        ${_mfTipo === 'solenoide' ? `
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">L (largo) = <strong style="color:${C}">${_mfL} m</strong></label>
        <input type="range" id="mf-slider-l" min="0.1" max="2" step="0.1" value="${_mfL}" style="width:100%">` : `
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">r (radio/distancia) = <strong style="color:${C}">${_mfR} m</strong></label>
        <input type="range" id="mf-slider-r" min="0.05" max="1" step="0.05" value="${_mfR}" style="width:100%">`}
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          B = <strong style="color:${C}">${_notacionCientifica(B, 2)} T</strong>
        </div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Polos Lab": atracción/repulsión visual
     ================================================================ */
  const POLOS_RONDAS = [
    { p1: 'N', p2: 'S', pregunta: '¿Qué le pasará a estos dos imanes si se acercan?' },
    { p1: 'N', p2: 'N', pregunta: '¿Qué le pasará a estos dos imanes si se acercan?' },
    { p1: 'S', p2: 'S', pregunta: '¿Qué le pasará a estos dos imanes si se acercan?' },
    { p1: 'S', p2: 'N', pregunta: '¿Qué le pasará a estos dos imanes si se acercan?' }
  ];
  let _polosIdx = 0;
  function renderSim2() {
    if (_polosIdx >= POLOS_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${POLOS_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = POLOS_RONDAS[_polosIdx];
    const svg = _svgImanes({ modo: r.p1 !== r.p2 ? 'atraen' : 'repelen' });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔵 Polos Lab MQC</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_polosIdx + 1} de ${POLOS_RONDAS.length}</p>
        <p style="margin:.6rem 0">Imán 1 con polo ${r.p1} enfrentado al polo ${r.p2} del imán 2.</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${r.pregunta}</p>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost" data-polos-resp="atraen">Se atraen</button>
          <button class="btn btn-ghost" data-polos-resp="repelen">Se repelen</button>
        </div>
        <p id="polos-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
        <div id="polos-svg-resultado"></div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Faraday Lab": mover imán, ver corriente inducida
     ================================================================ */
  let _fdPosicion = 0; // -5 a 5, 0 = en el centro de la espira
  function renderSim3() {
    const enMovimiento = Math.abs(_fdPosicion) > 0 && Math.abs(_fdPosicion) < 5;
    const acercando = _fdPosicion < 0;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔄 Faraday Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés un imán hacia (o desde) una espira conductora, y mirás si se induce corriente.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Posición del imán = <strong style="color:${C}">${_fdPosicion}</strong> (negativo=acercando, positivo=alejando, 0=en el centro)</label>
        <input type="range" id="fd-slider-pos" min="-5" max="5" step="1" value="${_fdPosicion}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;text-align:center">
          ${_fdPosicion === 0 ? '🧲 ⭕ — Galvanómetro: 0,00 (imán en reposo, SIN corriente inducida)' :
            enMovimiento ? `🧲${acercando ? '→' : '←'} ⭕ — Galvanómetro detecta corriente (imán en movimiento, sentido ${acercando ? 'acercando' : 'alejando'})` :
            '🧲 ⭕ — Galvanómetro: 0,00 (imán detenido en el extremo, SIN corriente inducida)'}
        </div>
        <p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">💡 Recordá: solo se induce corriente mientras el imán está EN MOVIMIENTO relativo a la espira.</p>
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
      { id: 'sim1', titulo: '🌀 Magnetic Field Lab MQC', desc: 'El simulador estrella: calculá el campo magnético de bobinas, solenoides y conductores rectos.' },
      { id: 'sim2', titulo: '🔵 Polos Lab MQC', desc: 'Predecí si dos imanes se atraen o se repelen, según sus polos.' },
      { id: 'sim3', titulo: '🔄 Faraday Lab MQC', desc: 'Descubrí cuándo se induce corriente eléctrica al mover un imán cerca de una espira.' }
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
        _polosIdx = 0; _fdPosicion = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Magnetic Field Lab */
    document.querySelectorAll('[data-mf-tipo]').forEach(btn => {
      btn.addEventListener('click', () => { _mfTipo = btn.getAttribute('data-mf-tipo'); _rerenderSimTab(unit); markSimDone('sim1'); });
    });
    const s1n = document.getElementById('mf-slider-n');
    const s1i = document.getElementById('mf-slider-i');
    const s1r = document.getElementById('mf-slider-r');
    const s1l = document.getElementById('mf-slider-l');
    if (s1n) s1n.addEventListener('input', () => { _mfN = parseInt(s1n.value, 10); _rerenderSimTab(unit); });
    if (s1i) s1i.addEventListener('input', () => { _mfI = parseInt(s1i.value, 10); _rerenderSimTab(unit); });
    if (s1r) s1r.addEventListener('input', () => { _mfR = parseFloat(s1r.value); _rerenderSimTab(unit); });
    if (s1l) s1l.addEventListener('input', () => { _mfL = parseFloat(s1l.value); _rerenderSimTab(unit); });

    /* Sim2 — Polos Lab */
    document.querySelectorAll('[data-polos-resp]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-polos-resp');
        const r = POLOS_RONDAS[_polosIdx];
        const correcta = r.p1 !== r.p2 ? 'atraen' : 'repelen';
        const fb = document.getElementById('polos-feedback');
        const ok = elegido === correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es correcto. Polos ${r.p1 !== r.p2 ? 'opuestos se atraen' : 'iguales se repelen'}.`;
        }
        setTimeout(() => { _polosIdx++; if (_polosIdx >= POLOS_RONDAS.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1600);
      });
    });

    /* Sim3 — Faraday Lab */
    const s3pos = document.getElementById('fd-slider-pos');
    if (s3pos) s3pos.addEventListener('change', () => {
      _fdPosicion = parseInt(s3pos.value, 10);
      _rerenderSimTab(unit);
      markSimDone('sim3');
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero Electromagnético": 7 niveles, sistema
     unificado (una pregunta a la vez).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un imán se acerca a limaduras de hierro.',
      pregunta: '¿En qué zona del imán se concentrarán con mayor intensidad las limaduras?', pista: 'Recordá dónde se concentra la fuerza magnética de un imán.',
      correcta: 'En los polos (extremos) del imán', opciones: ['En los polos (extremos) del imán', 'En el centro exacto del imán', 'En cualquier punto por igual', 'No se concentran en ningún lugar en particular'] },
    { id: 'nivel2', escenario: 'Dos imanes se acercan: el polo Norte de uno frente al polo Sur del otro.',
      pregunta: '¿Qué sucederá entre ellos?', pista: 'Polos de nombre contrario...',
      correcta: 'Se atraerán', opciones: ['Se atraerán', 'Se repelerán', 'No sentirán ninguna fuerza', 'Depende de la temperatura ambiente'] },
    { id: 'nivel3', escenario: 'Cerca de una brújula, se cierra un circuito eléctrico con corriente.',
      pregunta: '¿Qué le pasará a la aguja de la brújula (según el experimento de Oersted)?', pista: 'Este fue precisamente el descubrimiento de Oersted.',
      correcta: 'Se deflectará, indicando la presencia de un campo magnético', opciones: ['Se deflectará, indicando la presencia de un campo magnético', 'No le pasará absolutamente nada', 'Se destruirá inmediatamente', 'Empezará a girar sin parar para siempre'] },
    { id: 'nivel4', escenario: 'Un solenoide tiene N=1.000 espiras, L=0,5 m, I=4 A.',
      pregunta: '¿Cuál es el campo magnético (B=μ₀NI/L, con μ₀=4π×10⁻⁷)?', pista: 'Sustituí directamente en la fórmula del solenoide.',
      correcta: '≈1,01×10⁻² T', opciones: ['≈1,01×10⁻² T', '≈4×10⁻⁷ T', '≈1.000 T', '≈0,5 T'] },
    { id: 'nivel5', escenario: 'Un imán se corta exactamente por la mitad.',
      pregunta: '¿Qué se obtiene?', pista: 'Los polos magnéticos no pueden existir de forma aislada.',
      correcta: 'Dos imanes nuevos, cada uno con su propio polo Norte y Sur', opciones: ['Dos imanes nuevos, cada uno con su propio polo Norte y Sur', 'Un polo Norte aislado y un polo Sur aislado, por separado', 'El imán deja de tener cualquier propiedad magnética', 'Solo se obtiene un polo Norte, sin ningún Sur'] },
    { id: 'nivel6', escenario: 'Un imán se acerca a una espira conductora sin ninguna fuente de alimentación eléctrica.',
      pregunta: '¿Qué detecta un galvanómetro conectado a la espira, según el experimento de Faraday?', pista: 'Faraday descubrió la inducción electromagnética.',
      correcta: 'El paso de corriente, mientras el imán esté en movimiento', opciones: ['El paso de corriente, mientras el imán esté en movimiento', 'Ninguna corriente, nunca', 'Corriente constante, sin importar si el imán se mueve o no', 'Solo detecta corriente si el imán está muy caliente'] },
    { id: 'nivel7', escenario: 'Los polos magnéticos de la Tierra y sus polos geográficos.',
      pregunta: '¿Coinciden exactamente, o están desplazados entre sí?', pista: 'Recordá las distancias mencionadas: 1.600 km y 2.500 km.',
      correcta: 'Están desplazados — no coinciden exactamente', opciones: ['Están desplazados — no coinciden exactamente', 'Coinciden exactamente en el mismo punto', 'Solo el polo Norte coincide, el Sur no', 'La Tierra no tiene polos magnéticos'] }
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
        <h3 style="margin:0 0 .3rem">🧭 Ingeniero Electromagnético</h3>
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
     EXAMEN — banco real (js/data/banco-fix11-u04.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U04 !== 'undefined') ? PREGUNTAS_FIX11_U04 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U04</h3>
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
     MISIÓN FINAL — "Diseño de un Electroimán" (2 fases: replicando
     el ejemplo exacto del solenoide del libro)
     ================================================================ */
  const MISION_FASE1 = { n: 2000, l: 0.60, i: 5.0 };
  const MISION_FASE2 = { n: 4000, l: 0.60, i: 5.0 }; // se duplica N
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { b: '', texto: '' };

  function _misionEsperado(datos) {
    return MU0 * datos.n * datos.i / datos.l;
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const val = parseFloat(_misionVals.b);
    if (isNaN(val)) return false;
    if (Math.abs(val - esperado) > esperado * 0.1) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Diseño de un Electroimán".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🧭 Misión: Diseño de un Electroimán ${_misionFase === 2 ? '— Fase 2 (N duplicado)' : ''}</h3>
        <p style="color:var(--text-secondary)">Un solenoide tiene N=${datos.n} espiras, L=${datos.l} m, I=${datos.i} A (μ₀=4π×10⁻⁷ T·m/A).</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Calculá el campo magnético (B=μ₀NI/L), en Teslas:
          <input type="number" step="0.0001" id="mision-b" value="${_misionVals.b}" placeholder="T" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Explicá qué le pasaría al campo magnético si se AUMENTA la longitud (L) del solenoide, sin cambiar N ni I:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { b: 'mision-b', texto: 'mision-texto' };
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
          _misionVals = { b: '', texto: '' };
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
