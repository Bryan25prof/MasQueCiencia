/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u02.js
   FIX11-U02 — Electrostática
   ================================================================
   RUTA DE CIERRE — FASE 1. Contenido derivado y parafraseado del
   libro fuente "Física 11° — Un enfoque Práctico" (Tema II, apartados
   2.1 a 2.6, páginas 51-67). Mismo patrón de plugin exacto que las
   demás unidades de Física 10.º y FIX11-U01.
   FIX10-U01 a U08 y FIX11-U01 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u02';
  const C = 'var(--violet)';
  const K_COULOMB = 9e9;
  const E_CARGA = 1.6e-19;

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
  function _svgCargas(cfg) {
    const w = 260, h = 110;
    const x1 = 60, x2 = 200, cy = 55;
    const color1 = cfg.q1 >= 0 ? '#FF6B6B' : '#1FDBFF';
    const color2 = cfg.q2 >= 0 ? '#FF6B6B' : '#1FDBFF';
    const seAtraen = (cfg.q1 >= 0) !== (cfg.q2 >= 0);
    const flechaDir = seAtraen ? 1 : -1; // atraen: flechas apuntan una a la otra; repelen: se alejan
    return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:300px;display:block;margin:.6rem auto">
      <circle cx="${x1}" cy="${cy}" r="20" fill="${color1}"/>
      <text x="${x1}" y="${cy+5}" font-size="12" fill="#161a3d" text-anchor="middle" font-weight="800">${cfg.q1 >= 0 ? '+' : '−'}</text>
      <circle cx="${x2}" cy="${cy}" r="20" fill="${color2}"/>
      <text x="${x2}" y="${cy+5}" font-size="12" fill="#161a3d" text-anchor="middle" font-weight="800">${cfg.q2 >= 0 ? '+' : '−'}</text>
      <line x1="${x1+25}" y1="${cy}" x2="${x2-25}" y2="${cy}" stroke="#8888B0" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="${(x1+x2)/2}" y="${cy-28}" font-size="9" fill="#8888B0" text-anchor="middle">${seAtraen ? 'Se atraen' : 'Se repelen'}</text>
      <text x="${(x1+x2)/2}" y="${cy+35}" font-size="8" fill="#8888B0" text-anchor="middle">r = ${cfg.rLabel}</text>
    </svg>`;
  }

  const TEMAS = [
    { id: 't1', icon: '⚛️', titulo: 'El modelo atómico y la carga eléctrica',
      ideaClave: 'La carga eléctrica se transfiere SIEMPRE por electrones — nunca por protones, que están fuertemente unidos dentro del núcleo.',
      explicacion: 'El átomo está formado por protones (carga positiva) y neutrones (sin carga) en el núcleo, con electrones (carga negativa) girando alrededor. Un átomo es eléctricamente neutro cuando tiene igual cantidad de protones y electrones. Si pierde electrones, queda con carga positiva (ion positivo); si gana electrones, queda con carga negativa (ion negativo).',
      ejemplo: 'Los electrones periféricos o de valencia (los más alejados del núcleo) tienen un enlace más débil, y en algunos materiales se transfieren con relativa facilidad de un cuerpo a otro — por frotamiento (contacto) o por inducción (sin contacto directo).',
      aplicacion: 'Por eso al frotar un globo con una tela, el globo puede atraer papelitos: se transfirieron electrones de la tela al globo (o viceversa), generando un desbalance de carga.',
      compruebra: 'Si un átomo neutro PIERDE dos electrones, ¿queda con carga positiva o negativa?' },

    { id: 't2', icon: '🔢', titulo: 'Características de la carga eléctrica',
      ideaClave: 'La carga eléctrica no es "continua" — viene en paquetes discretos, del tamaño exacto de la carga de un electrón.',
      explicacion: 'Las cargas eléctricas ni se crean ni se destruyen (se conservan). La carga eléctrica está cuantizada: cualquier cuerpo cargado tendrá un número ENTERO de electrones de más o de menos — nunca una cantidad fraccionaria. La carga se mide en Coulombs (C): 1 C = 6,25×10¹⁸ electrones, y la carga de un electrón es 1,6×10⁻¹⁹ C.',
      ejemplo: 'Para convertir 7,24×10¹⁸ electrones a Coulombs: (7,24×10¹⁸)(1,6×10⁻¹⁹ C) = 1,16 C.',
      aplicacion: 'Cargas del mismo signo (dos positivas, o dos negativas) se repelen; cargas de signo contrario (una positiva y una negativa) se atraen. "Positivo" y "negativo" son solo convenciones para diferenciar los dos tipos de carga que existen.',
      compruebra: '¿Puede un objeto tener una carga de exactamente 1,5 electrones? ¿Por qué?' },

    { id: 't3', icon: '🔌', titulo: 'Clasificación de los materiales según su conducción',
      ideaClave: 'Ningún material conduce o aísla "perfectamente" — siempre hay un grado, mayor o menor, de conducción.',
      explicacion: 'Los materiales se clasifican en 4 tipos según su capacidad de conducir carga eléctrica: <strong>conductores</strong> (como los metales: cobre, hierro — tienen electrones libres), <strong>aislantes</strong> o dieléctricos (como la porcelana, el hule, el plástico — sus electrones están firmemente unidos, enlace covalente), <strong>semiconductores</strong> (como el silicio y el germanio — se comportan como conductores o aislantes según la temperatura u otros factores), y <strong>superconductores</strong> (conducen sin resistencia una vez establecida la corriente).',
      ejemplo: 'El silicio puro a temperatura ambiente tiene 10¹¹ electrones libres por cm³, pero si la temperatura sube a 700°C, aumenta a 10¹⁸ electrones por cm³ — por eso los semiconductores son tan sensibles a la temperatura, y tan útiles en chips de computadora.',
      aplicacion: 'El cobre es uno de los conductores más usados en aplicaciones industriales y residenciales, por su buen balance entre conductividad y precio. Los superconductores se usan en trenes de levitación magnética y en máquinas de resonancia magnética.',
      compruebra: '¿Por qué un cable eléctrico se calienta mientras más tiempo se usa?' },

    { id: 't4', icon: '⚡', titulo: 'Ley de Coulomb',
      ideaClave: 'La fuerza eléctrica es una de las fuerzas más intensas de la naturaleza — mucho más fuerte que la gravitatoria, a escalas comparables.',
      explicacion: 'Charles Coulomb (1785) confirmó experimentalmente que la fuerza eléctrica entre dos cargas puntuales es directamente proporcional al producto de las cargas, e inversamente proporcional al cuadrado de la distancia que las separa: F = k·q₁·q₂/r², donde k=9×10⁹ N·m²/C².',
      ejemplo: 'Dos electrones separados 1,0 mm se repelen con una fuerza F = (9×10⁹)(1,6×10⁻¹⁹)²/(1×10⁻³)² = 2,30×10⁻²² N — una fuerza extremadamente pequeña, pero calculable con la misma fórmula que usarías para cargas mucho mayores.',
      aplicacion: 'Cuando hay más de dos cargas, hay que sumar VECTORIALMENTE la fuerza que cada una ejerce sobre la carga de interés — igual que sumabas fuerzas y vectores en Física 10.°.',
      compruebra: 'Si se duplica la distancia entre dos cargas (manteniendo las cargas iguales), ¿en qué proporción cambia la fuerza eléctrica?' },

    { id: 't5', icon: '🌐', titulo: 'Campo eléctrico',
      ideaClave: 'Una carga no necesita "tocar" a otra para ejercerle una fuerza — genera un campo eléctrico a su alrededor, que es el que empuja o atrae a cualquier otra carga que entre en él.',
      explicacion: 'El campo eléctrico (E) es el espacio físico que rodea a una carga, donde se hace sentir la fuerza eléctrica. Se calcula como E = F/q (fuerza sobre una carga de prueba), o directamente como E = k·q/r² (a partir de la carga que genera el campo).',
      ejemplo: 'Una carga puntual q=5 nC genera, a una distancia r=2,0 m, un campo eléctrico E = (9×10⁹)(5×10⁻⁹)/(2,0)² = 11,25 N/C.',
      aplicacion: 'El campo eléctrico es una magnitud vectorial — cuando varias cargas generan campos en un mismo punto, hay que sumarlos vectorialmente, igual que con las fuerzas.',
      compruebra: 'Si te alejás de una carga eléctrica (aumentando r), ¿el campo eléctrico que sentís aumenta o disminuye?' },

    { id: 't6', icon: '🔋', titulo: 'Energía potencial eléctrica y voltaje',
      ideaClave: 'Así como una naranja en un árbol tiene energía potencial gravitatoria, una carga eléctrica dentro de un campo tiene energía potencial eléctrica.',
      explicacion: 'La energía potencial eléctrica es la energía que posee una carga, producto de su posición respecto a otras cargas dentro de un campo eléctrico (se mide en Joules). El potencial eléctrico es esa energía potencial dividida entre la carga (se mide en Voltios). La diferencia de potencial entre dos puntos (también llamada voltaje o tensión) es el trabajo necesario para mover una carga de un punto a otro, por unidad de carga.',
      ejemplo: 'Si soltás una carga positiva cerca de una barra cargada negativamente, la carga se mueve hacia la barra por sí sola (atracción) — perdiendo energía potencial eléctrica, que se convierte en energía cinética, igual que la naranja que cae del árbol.',
      aplicacion: 'Para separar una carga positiva de una barra negativa (alejarla, en vez de dejarla caer hacia ella), hay que darle energía adicional en forma de trabajo eléctrico — el mismo concepto que subir la naranja de vuelta al árbol.',
      compruebra: '¿Por qué se necesita hacer trabajo para alejar una carga positiva de una carga negativa, en vez de simplemente soltarla?' }
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
    const cargasEjemplo = _svgCargas({ q1: 1, q2: -1, rLabel: 'distancia' });
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
            ${i === 3 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">🔎 EJEMPLO</p><p style="margin:0 0 .4rem">${t.ejemplo}</p>${cargasEjemplo}</div>` : _bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Coulomb Lab": el simulador estrella.
     Escala: q1,q2 en nC; r en cm. Verificado: con estos rangos, F
     queda en un valor legible, y las proporcionalidades se cumplen.
     ================================================================ */
  let _clModo = 'explora';
  let _clQ1 = 5, _clQ2 = -5, _clR = 10; // nC, nC, cm
  function _clCalcularF(q1nC, q2nC, rCm) {
    const q1 = q1nC * 1e-9, q2 = q2nC * 1e-9, r = rCm / 100;
    return K_COULOMB * Math.abs(q1) * Math.abs(q2) / (r * r);
  }
  function renderSim1() {
    if (_clModo === 'desafio') return _renderClDesafio();
    const F = _clCalcularF(_clQ1, _clQ2, _clR);
    const svg = _svgCargas({ q1: _clQ1, q2: _clQ2, rLabel: _clR + ' cm' });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">⚡ Coulomb Lab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés q₁, q₂ y r, y mirás cómo cambia la fuerza eléctrica entre ambas cargas.</p>
        ${svg}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">q₁ = <strong style="color:${C}">${_clQ1 >= 0 ? '+' : ''}${_clQ1} nC</strong></label>
        <input type="range" id="cl-slider-q1" min="-10" max="10" step="1" value="${_clQ1}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">q₂ = <strong style="color:${C}">${_clQ2 >= 0 ? '+' : ''}${_clQ2} nC</strong></label>
        <input type="range" id="cl-slider-q2" min="-10" max="10" step="1" value="${_clQ2}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">r = <strong style="color:${C}">${_clR} cm</strong></label>
        <input type="range" id="cl-slider-r" min="2" max="30" step="1" value="${_clR}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          F = k·|q₁·q₂|/r² = <strong style="color:${C}">${_notacionCientifica(F, 3)} N</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="cl-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const CL_RONDAS = [
    { desc: 'Se duplica q₁ (manteniendo q₂ y r)', factor: 2 },
    { desc: 'Se duplican q₁ Y q₂ (manteniendo r)', factor: 4 },
    { desc: 'Se duplica r (manteniendo q₁ y q₂)', factor: 0.25 },
    { desc: 'Se triplica r (manteniendo q₁ y q₂)', factor: 1 / 9 }
  ];
  let _clRondaIdx = 0;
  function _renderClDesafio() {
    if (_clRondaIdx >= CL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${CL_RONDAS.length} predicciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = CL_RONDAS[_clRondaIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="cl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Predicción ${_clRondaIdx + 1} de ${CL_RONDAS.length}</p>
        <p style="margin-bottom:.8rem">Partiendo de una fuerza F inicial: ${r.desc}. ¿Qué le pasa a la fuerza eléctrica?</p>
        <div style="display:grid;gap:.5rem">
          ${_mezclar(['Se duplica (2F)', 'Se cuadruplica (4F)', 'Se reduce a la mitad (F/2)', 'Se reduce a la cuarta parte (F/4)', 'Se reduce a un noveno (F/9)']).map(op => `<button class="btn btn-ghost" data-cl-opcion="${op}">${op}</button>`).join('')}
        </div>
        <p id="cl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  const CL_RESPUESTAS = { 2: 'Se duplica (2F)', 4: 'Se cuadruplica (4F)', 0.25: 'Se reduce a la cuarta parte (F/4)', 0.111: 'Se reduce a un noveno (F/9)' };

  /* ================================================================
     SIMULADOR 2 — "Campo Eléctrico Lab": E=kq/r²
     ================================================================ */
  let _ceQ = 5, _ceR = 2; // nC, m
  function renderSim2() {
    const E = K_COULOMB * (_ceQ * 1e-9) / (_ceR * _ceR);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🌐 Campo Eléctrico Lab</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la carga generadora y la distancia, y mirás el campo eléctrico resultante.</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Carga q = <strong style="color:${C}">${_ceQ} nC</strong></label>
        <input type="range" id="ce-slider-q" min="1" max="20" step="1" value="${_ceQ}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Distancia r = <strong style="color:${C}">${_ceR} m</strong></label>
        <input type="range" id="ce-slider-r" min="1" max="10" step="0.5" value="${_ceR}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          E = k·q/r² = <strong style="color:${C}">${E.toFixed(2)} N/C</strong>
        </div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Clasificador de Materiales": conductor/aislante/
     semiconductor/superconductor
     ================================================================ */
  const MATERIALES = [
    { nombre: 'Cobre', tipo: 'conductor', pista: 'Es un metal, usado ampliamente en cables eléctricos.' },
    { nombre: 'Hule', tipo: 'aislante', pista: 'Se usa para recubrir cables — no tiene electrones libres.' },
    { nombre: 'Silicio', tipo: 'semiconductor', pista: 'Su conductividad depende fuertemente de la temperatura — se usa en chips.' },
    { nombre: 'Hierro', tipo: 'conductor', pista: 'Es un metal con electrones libres.' },
    { nombre: 'Porcelana', tipo: 'aislante', pista: 'Tiene enlaces covalentes, sin electrones libres.' },
    { nombre: 'Germanio', tipo: 'semiconductor', pista: 'Junto al silicio, es de los semiconductores más usados en electrónica.' },
    { nombre: 'Plástico', tipo: 'aislante', pista: 'Se usa como recubrimiento protector de cables.' }
  ];
  let _cmIdx = 0;
  function renderSim3() {
    if (_cmIdx >= MATERIALES.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste los ${MATERIALES.length} materiales!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const m = MATERIALES[_cmIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔌 Clasificador de Materiales</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Material ${_cmIdx + 1} de ${MATERIALES.length}</p>
        <p style="margin:.6rem 0;font-size:1.1rem"><strong>${m.nombre}</strong></p>
        <p style="color:var(--text-muted);font-size:.8rem;margin-bottom:.8rem">💡 ${m.pista}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
          <button class="btn btn-ghost" data-cm-tipo="conductor">Conductor</button>
          <button class="btn btn-ghost" data-cm-tipo="aislante">Aislante</button>
          <button class="btn btn-ghost" data-cm-tipo="semiconductor">Semiconductor</button>
          <button class="btn btn-ghost" data-cm-tipo="superconductor">Superconductor</button>
        </div>
        <p id="cm-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '⚡ Coulomb Lab MQC', desc: 'El simulador estrella: controlá q₁, q₂ y r, y predecí cómo cambia la fuerza eléctrica.' },
      { id: 'sim2', titulo: '🌐 Campo Eléctrico Lab', desc: 'Explorá cómo cambia el campo eléctrico según la carga y la distancia.' },
      { id: 'sim3', titulo: '🔌 Clasificador de Materiales', desc: 'Clasificá 7 materiales reales en conductor, aislante, semiconductor, o superconductor.' }
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
        _clModo = 'explora'; _clRondaIdx = 0;
        _cmIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Coulomb Lab */
    const s1q1 = document.getElementById('cl-slider-q1');
    const s1q2 = document.getElementById('cl-slider-q2');
    const s1r = document.getElementById('cl-slider-r');
    if (s1q1) s1q1.addEventListener('input', () => { _clQ1 = parseInt(s1q1.value, 10); _rerenderSimTab(unit); });
    if (s1q2) s1q2.addEventListener('input', () => { _clQ2 = parseInt(s1q2.value, 10); _rerenderSimTab(unit); });
    if (s1r) s1r.addEventListener('input', () => { _clR = parseInt(s1r.value, 10); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('cl-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _clModo = 'desafio'; _clRondaIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('cl-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _clModo = 'explora'; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-cl-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-cl-opcion');
        const r = CL_RONDAS[_clRondaIdx];
        const correcta = Math.abs(r.factor - 0.111) < 0.01 ? CL_RESPUESTAS[0.111] : CL_RESPUESTAS[r.factor];
        const fb = document.getElementById('cl-feedback');
        const ok = elegido === correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es esa. La respuesta correcta: ${correcta}`;
        }
        setTimeout(() => { _clRondaIdx++; if (_clRondaIdx >= CL_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1600);
      });
    });

    /* Sim2 — Campo Eléctrico */
    const s2q = document.getElementById('ce-slider-q');
    const s2r = document.getElementById('ce-slider-r');
    if (s2q) s2q.addEventListener('input', () => { _ceQ = parseInt(s2q.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    if (s2r) s2r.addEventListener('input', () => { _ceR = parseFloat(s2r.value); _rerenderSimTab(unit); markSimDone('sim2'); });

    /* Sim3 — Clasificador de Materiales */
    document.querySelectorAll('[data-cm-tipo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-cm-tipo');
        const m = MATERIALES[_cmIdx];
        const fb = document.getElementById('cm-feedback');
        const ok = elegido === m.tipo;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es correcto. ${m.nombre} es un ${m.tipo}.`;
        }
        setTimeout(() => { _cmIdx++; if (_cmIdx >= MATERIALES.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1600);
      });
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero Eléctrico": 7 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un átomo neutro pierde 2 electrones.',
      pregunta: '¿Con qué tipo de carga queda?', pista: 'Perder electrones (carga negativa) deja un exceso de carga positiva.',
      correcta: 'Positiva (ion positivo)', opciones: ['Positiva (ion positivo)', 'Negativa (ion negativo)', 'Sigue neutro', 'No se puede determinar'] },
    { id: 'nivel2', escenario: 'Dos cargas del mismo signo (ambas positivas) se acercan.',
      pregunta: '¿Qué fuerza experimentan entre sí?', pista: 'Recordá la regla básica de atracción y repulsión.',
      correcta: 'De repulsión (se alejan)', opciones: ['De repulsión (se alejan)', 'De atracción (se acercan)', 'Ninguna fuerza', 'Depende de la temperatura'] },
    { id: 'nivel3', escenario: 'Se duplica la distancia entre dos cargas eléctricas, manteniendo las cargas iguales.',
      pregunta: '¿Qué le pasa a la fuerza eléctrica entre ellas?', pista: 'La relación con r es al cuadrado, igual que en gravitación.',
      correcta: 'Se reduce a la cuarta parte', opciones: ['Se reduce a la cuarta parte', 'Se reduce a la mitad', 'Se mantiene igual', 'Se duplica'] },
    { id: 'nivel4', escenario: 'Dos cargas de 4×10⁻⁹ C cada una están separadas 3×10⁻²m.',
      pregunta: '¿Cuál es la fuerza eléctrica entre ellas (F=kq₁q₂/r²)?', pista: 'Sustituí directamente en la fórmula con k=9×10⁹.',
      correcta: '0,16 N', opciones: ['0,16 N', '1,6 N', '16 N', '0,016 N'] },
    { id: 'nivel5', escenario: 'Un material tiene electrones libres que le permiten conducir electricidad fácilmente, como el cobre.',
      pregunta: '¿Cómo se clasifica ese material?', pista: 'Pensá en los 4 tipos de materiales según su conducción.',
      correcta: 'Conductor', opciones: ['Conductor', 'Aislante', 'Semiconductor', 'Ninguno de los anteriores'] },
    { id: 'nivel6', escenario: 'Un material como el silicio cambia su comportamiento conductor según la temperatura.',
      pregunta: '¿Cómo se clasifica ese material?', pista: 'Este tipo de material es la base de los chips de computadora.',
      correcta: 'Semiconductor', opciones: ['Semiconductor', 'Conductor', 'Aislante', 'Superconductor'] },
    { id: 'nivel7', escenario: 'Una carga puntual de 8 nC genera un campo eléctrico a 2 m de distancia.',
      pregunta: '¿Cuál es la magnitud de ese campo (E=kq/r²)?', pista: 'Sustituí con k=9×10⁹, q=8×10⁻⁹C, r=2m.',
      correcta: '18 N/C', opciones: ['18 N/C', '36 N/C', '9 N/C', '4 N/C'] }
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
        <h3 style="margin:0 0 .3rem">⚡ Ingeniero Eléctrico</h3>
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
     EXAMEN — banco real (js/data/banco-fix11-u02.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U02 !== 'undefined') ? PREGUNTAS_FIX11_U02 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U02</h3>
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
     MISIÓN FINAL — "Diseño de un Generador Electrostático" (2 fases:
     fuerza entre esferas cargadas, luego cambio de distancia)
     ================================================================ */
  const MISION_FASE1 = { q1: 8, q2: 6, r: 15 }; // nC, nC, cm
  const MISION_FASE2 = { q1: 8, q2: 6, r: 30 }; // se duplica r
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { fuerza: '', texto: '' };

  function _misionEsperado(datos) {
    return _clCalcularF(datos.q1, datos.q2, datos.r);
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esperado = _misionEsperado(datos);
    const val = parseFloat(_misionVals.fuerza);
    if (isNaN(val)) return false;
    if (Math.abs(val - esperado) > esperado * 0.1 + 0.0001) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Diseño de un Generador Electrostático".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>⚡ Misión: Diseño de un Generador Electrostático ${_misionFase === 2 ? '— Fase 2 (r duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Dos esferas cargadas con q₁=${datos.q1} nC y q₂=${datos.q2} nC están separadas r=${datos.r} cm.</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Calculá la fuerza eléctrica (F=k·q₁·q₂/r²), en Newtons:
          <input type="number" step="0.00001" id="mision-fuerza" value="${_misionVals.fuerza}" placeholder="N" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Explicá qué le pasaría a esta fuerza si una de las esferas cambiara de signo:
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
