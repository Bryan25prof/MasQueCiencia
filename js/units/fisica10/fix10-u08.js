/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u08.js
   FIX10-U08 — Trabajo Mecánico y Energía
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad VIII, apartados 8.1-8.6, páginas
   292-336). Esta es la ÚLTIMA unidad de Física 10.° según el libro
   — no hay Hidrostática ni ninguna unidad IX (se verificó el libro
   completo, 336 páginas, antes de construir).

   Mismo patrón de plugin exacto que fix10-u01 a u07.js.
   FIX10-U01 a U07 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u08';
  const C = 'var(--violet)';
  const G = 9.8;

  const TEMAS = [
    { id: 't1', icon: '💪', titulo: 'El trabajo mecánico',
      ideaClave: 'Empujar una pared con todas tus fuerzas, sin que se mueva ni un milímetro, NO es trabajo mecánico — sin desplazamiento, no hay trabajo.',
      explicacion: 'Para que exista trabajo mecánico se necesitan DOS condiciones: que se aplique una fuerza sobre un objeto, Y que ese objeto se desplace. El trabajo es una cantidad escalar (ya la conocés de U02) que se calcula como W = F·(cos θ)·d, donde θ es el ángulo entre la fuerza y el desplazamiento.',
      ejemplo: 'Si el ángulo es 0° (fuerza y desplazamiento en la misma dirección), W = F·d (trabajo máximo positivo). Si el ángulo es 90° (fuerza perpendicular al desplazamiento), W = 0 (sin trabajo, aunque haya fuerza y movimiento). Si el ángulo es 180° (fuerza opuesta al desplazamiento, como un avión frenando), el trabajo es NEGATIVO.',
      aplicacion: 'Cuidado con el "trabajo mínimo para levantar algo": ahí la fuerza mínima necesaria es igual al peso del objeto, aplicada verticalmente hacia arriba (θ=0° respecto al desplazamiento vertical) — NO uses el ángulo de un plano inclinado como si fuera el ángulo entre fuerza y desplazamiento.',
      compruebra: 'Un obrero empuja una caja con una fuerza perpendicular a la dirección en la que se mueve la caja. ¿Cuánto trabajo mecánico realiza esa fuerza?' },

    { id: 't2', icon: '➕', titulo: 'Trabajo neto y análisis gráfico',
      ideaClave: 'Cuando varias fuerzas actúan sobre un mismo objeto, el trabajo neto es simplemente la suma escalar de cada trabajo individual.',
      explicacion: 'Si tres fuerzas distintas actúan sobre un mismo cuerpo que se desplaza cierta distancia, cada una realiza su propio trabajo (algunas positivo, otras cero, otras negativo, según su ángulo), y el trabajo neto (W_neto) es la suma de los tres.',
      ejemplo: 'Con F₁=40N (θ=0°), F₂=60N (θ=90°) y F₃=85N (θ=35°), y un desplazamiento de 15m: W₁=600J, W₂=0J (perpendicular), W₃≈1044,42J. El trabajo neto es W_neto = 600+0+1044,42 = 1644,42J.',
      aplicacion: 'También podés calcular el trabajo gráficamente: en una gráfica de Fuerza vs. Desplazamiento, el ÁREA bajo la curva representa el trabajo realizado — el mismo principio del área que ya usaste en U05, pero ahora con F en el eje vertical en vez de v.',
      compruebra: 'Si conocés la fuerza constante y el desplazamiento, y los graficás en un eje F-d, ¿qué representa geométricamente el área de ese rectángulo?' },

    { id: 't3', icon: '🔋', titulo: 'Potencia mecánica',
      ideaClave: 'Dos personas pueden realizar exactamente el mismo trabajo, pero si una lo hace más rápido, tiene mayor potencia.',
      explicacion: 'La potencia mide qué tan rápido se realiza un trabajo: P = W/t. La potencia varía en forma DIRECTA con el trabajo, e INVERSA con el tiempo.',
      ejemplo: 'Dos personas suben la misma caja de libros (mismo trabajo), pero una tarda 1,8 s y la otra 2,5 s. Como el tiempo y la potencia son inversamente proporcionales, quien tardó MENOS tiempo (1,8 s) desarrolló MAYOR potencia, aunque el trabajo realizado haya sido idéntico.',
      aplicacion: 'La potencia se mide en Watts (W = J/s) en el Sistema Internacional. Es la magnitud que usamos cotidianamente para comparar motores, electrodomésticos, o el rendimiento físico de una persona.',
      compruebra: 'Si dos motores realizan el mismo trabajo, pero uno lo hace en la mitad de tiempo que el otro, ¿cuál tiene mayor potencia, y en qué proporción?' },

    { id: 't4', icon: '🎯', titulo: 'Energía cinética y potencial',
      ideaClave: 'Toda la energía mecánica de un objeto se puede dividir en dos tipos: la del movimiento (cinética) y la almacenada (potencial).',
      explicacion: 'La <strong>energía cinética</strong> (Ec = m·v²/2) es la energía asociada al movimiento. La <strong>energía potencial gravitatoria</strong> (Ep = m·g·h) es la energía almacenada por la posición de un objeto respecto a un punto de referencia. La <strong>energía mecánica</strong> total es Em = Ec + Ep.',
      ejemplo: 'Un electricista de 70 kg está a 30 m de altura respecto al suelo, y a 10 m de altura respecto a su compañero (que está más abajo en la misma torre). Su energía potencial respecto al suelo es Ep=(70)(9,8)(30)=20.580J, pero respecto a su compañero es solo Ep=(70)(9,8)(10)=6.860J.',
      aplicacion: 'Punto crítico: la energía potencial SIEMPRE depende del punto de referencia elegido — no existe un único valor "correcto" de Ep sin especificar respecto a qué se mide la altura.',
      compruebra: 'Un avión de 6.200 kg vuela a 2.000 m de altura, a 620 m/s constantes. ¿Qué necesitás calcular para obtener su energía mecánica total?' },

    { id: 't5', icon: '🔄', titulo: 'Teorema del Trabajo y la Energía',
      ideaClave: 'El trabajo neto realizado sobre un objeto es exactamente igual al cambio en su energía.',
      explicacion: 'Este teorema conecta todo lo anterior: W = ΔEc (si conocés datos de velocidad) o W = −ΔEp (si conocés datos de altura). El cambio de energía siempre se calcula como estado final menos estado inicial: ΔE = E_final − E_inicial.',
      ejemplo: 'Si el movimiento es horizontal, usás W = ΔEc. Si el movimiento es vertical, podés usar W = ΔEc (si tenés velocidades) o W = −ΔEp (si tenés alturas) — ambos caminos deberían darte una respuesta consistente.',
      aplicacion: 'Este teorema tiene enormes implicaciones tecnológicas: nos dice que, disponiendo de energía y de un mecanismo apropiado, siempre podemos obtener un trabajo útil a partir de ella — es la base de toda la ingeniería energética.',
      compruebra: 'Si el trabajo neto sobre un objeto es negativo, ¿qué le está pasando a su energía cinética: aumenta o disminuye?' },

    { id: 't6', icon: '🔁', titulo: 'Fuerzas conservativas y no conservativas',
      ideaClave: 'Una fuerza es "conservativa" si no le importa qué camino tomaste — solo le importa dónde empezaste y dónde terminaste.',
      explicacion: 'Una fuerza es <strong>conservativa</strong> si el trabajo que realiza depende ÚNICAMENTE de las posiciones inicial y final, sin importar la trayectoria seguida (W₁=W₂=W₃ para cualquier camino de A a B) — y su trabajo en un recorrido de ida y vuelta al mismo punto es siempre cero. Ejemplos: fuerza gravitatoria, fuerza elástica, fuerza eléctrica. Una fuerza es <strong>no conservativa (o disipativa)</strong> si su trabajo SÍ depende del camino recorrido — la fricción es el ejemplo central.',
      ejemplo: 'Subir una lata de pintura al techo de una casa: amarrada a una cuerda, por una escalera, o lanzándola — en los tres casos el trabajo de la gravedad es el mismo, porque solo depende de la altura final (W=-ΔEp). En cambio, mover un armario por distintos caminos dentro de un cuarto SÍ cambia el trabajo de la fricción según la distancia real recorrida en cada camino.',
      aplicacion: 'Esta es la razón exacta por la que la Ley de Conservación de la Energía Mecánica "falla" cuando hay fricción: la fricción es no conservativa, así que "roba" energía mecánica del sistema (la convierte en calor), y EM_A ya no es igual a EM_B.',
      compruebra: '¿Por qué la fuerza de fricción se llama también "fuerza disipativa"?' },

    { id: 't7', icon: '♻️', titulo: 'Ley de Conservación de la Energía Mecánica',
      ideaClave: 'Cuando no hay fricción, la energía mecánica total de un sistema NUNCA cambia — solo se transforma entre cinética y potencial.',
      explicacion: 'En movimientos de caída libre, péndulos, planos inclinados, rampas, o sistemas con resortes (despreciando la fricción), la energía mecánica se conserva: EM_A = EM_B = EM_C en cualquier punto del recorrido.',
      ejemplo: 'Una pelota de 1 kg se deja caer desde 20 m de altura (EM = mgh = 196 J). A mitad de camino (10 m), Ec=98J y Ep=98J (suman 196J). Justo antes de tocar el suelo, Ec=196J y Ep=0J — la energía total SIEMPRE es 196 J, solo cambia la "forma" en que se reparte entre cinética y potencial.',
      aplicacion: 'Esta ley también aplica a sistemas elásticos (resortes comprimidos o estirados): en cualquier punto del recorrido de un objeto conectado a un resorte, la energía mecánica total del sistema permanece constante.',
      compruebra: 'Una pelota cae desde cierta altura. Justo cuando sale de la mano (Ec=0, toda la energía es potencial) hasta justo antes de tocar el suelo (Ep=0, toda la energía es cinética), ¿qué le pasa a la energía mecánica total?' },

    { id: 't8', icon: '🌍', titulo: 'Aplicaciones del cálculo de la energía',
      ideaClave: 'Desde un temblor hasta el viento de un huracán, todos esos fenómenos se pueden describir en términos de energía transformada.',
      explicacion: 'La ciencia mide la energía liberada o transformada en distintos fenómenos naturales. La <strong>energía sísmica</strong> de un temblor se mide con la escala de Richter (una escala logarítmica). La <strong>energía mareomotriz</strong> aprovecha el movimiento ascendente y descendente del mar para generar electricidad mediante turbinas. La <strong>energía eólica</strong> aprovecha la intensidad (velocidad) y dirección del viento.',
      ejemplo: 'Para igualar la energía de la bomba nuclear de Hiroshima (≈13 kilotones) harían falta 13.000 toneladas de TNT. La detonación de 1.000 kg de TNT libera 4.000 veces más energía que la necesaria para alzar un auto de 1.000 kg hasta 100 m de altura — una comparación real que ayuda a dimensionar esas cantidades de energía.',
      aplicacion: 'La energía mareomotriz funciona como un "molino de agua" submarino: grandes turbinas bajo el mar giran por la fuerza de las mareas, y esa rotación se convierte en electricidad mediante alternadores. La energía eólica se mide con la escala de Beaufort (de 0, calma absoluta, a 12, huracán).',
      compruebra: '¿Por qué creés que se usa una escala logarítmica (como la de Richter) para medir la energía sísmica, en vez de una escala lineal común?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01 a u07.js) ──── */
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
     SIMULADOR 1 — "Energy Lab MQC": el simulador estrella.
     Caso exacto del libro: pelota de 1kg cae desde 20m (EM=196J).
     Modo Explora: slider de altura actual, mostrando Ec/Ep/Em en vivo.
     ================================================================ */
  let _elModo = 'explora';
  let _elM = 1, _elH0 = 20, _elHActual = 20;
  function _elCalcular(m, h0, hActual) {
    const Em = m * G * h0;
    const Ep = m * G * hActual;
    const Ec = Em - Ep;
    const v = Math.sqrt(Math.max(0, 2 * Ec / m));
    return { Em, Ep, Ec, v };
  }
  function renderSim1() {
    if (_elModo === 'desafio') return _renderElDesafio();
    const r = _elCalcular(_elM, _elH0, _elHActual);
    const alturaPct = (_elHActual / _elH0) * 100;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">⚡ Energy Lab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Una pelota de ${_elM} kg cae desde ${_elH0} m. Movés su altura actual y mirás cómo se reparte la energía.</p>
        <div style="background:var(--bg-elevated);border-radius:10px;padding:1rem;position:relative;height:180px;margin-bottom:1rem;display:flex;justify-content:center">
          <div style="width:4px;background:var(--border);height:100%;position:relative">
            <div style="position:absolute;bottom:0;left:-8px;font-size:1.6rem;transition:bottom .2s;bottom:${alturaPct}%">⚽</div>
          </div>
        </div>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Altura actual = <strong style="color:${C}">${_elHActual} m</strong> (de ${_elH0} m iniciales)</label>
        <input type="range" id="el-slider-h" min="0" max="${_elH0}" step="1" value="${_elHActual}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.8">
          Ep = m·g·h = <strong style="color:var(--gold,#F9FF4D)">${r.Ep.toFixed(1)} J</strong><br>
          Ec = Em − Ep = <strong style="color:var(--cyan)">${r.Ec.toFixed(1)} J</strong><br>
          Em = Ec + Ep = <strong style="color:${C}">${r.Em.toFixed(1)} J</strong> (siempre constante)
        </div>
        <button class="btn btn-primary btn-sm" id="el-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const EL_RONDAS = [
    { m: 2, h0: 10, hActual: 5, pide: 'Ec' }, { m: 1, h0: 30, hActual: 30, pide: 'Ec' },
    { m: 3, h0: 15, hActual: 0, pide: 'Ec' }, { m: 2, h0: 20, hActual: 10, pide: 'Ep' },
    { m: 5, h0: 8, hActual: 4, pide: 'Em' }, { m: 1, h0: 40, hActual: 20, pide: 'Ec' }
  ];
  let _elDesafioIdx = 0;
  function _renderElDesafio() {
    if (_elDesafioIdx >= EL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${EL_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = EL_RONDAS[_elDesafioIdx];
    const pideTexto = { Ec: '¿Cuál es la energía cinética (Ec) en ese punto?', Ep: '¿Cuál es la energía potencial (Ep) en ese punto?', Em: '¿Cuál es la energía mecánica total (Em)?' }[r.pide];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="el-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_elDesafioIdx + 1} de ${EL_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">Una pelota de m = ${r.m} kg cae desde h₀ = ${r.h0} m. En este instante está a ${r.hActual} m de altura.</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
          Em = m·g·h₀ &nbsp;|&nbsp; Ep = m·g·h &nbsp;|&nbsp; Ec = Em − Ep
        </div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.1" id="el-respuesta" placeholder="Energía (J)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="el-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="el-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Work Lab MQC": W=F·cosθ·d, ángulo interactivo
     ================================================================ */
  let _wlF = 50, _wlAngulo = 0, _wlD = 10;
  function renderSim2() {
    const rad = _wlAngulo * Math.PI / 180;
    const W = _wlF * Math.cos(rad) * _wlD;
    const tipo = W > 0.5 ? 'Trabajo POSITIVO (la fuerza favorece el movimiento)' : (W < -0.5 ? 'Trabajo NEGATIVO (la fuerza se opone al movimiento)' : 'Trabajo NULO (fuerza perpendicular al desplazamiento)');
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">💪 Work Lab MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés el ángulo entre la fuerza y el desplazamiento, y mirás cómo cambia el trabajo.</p>
        <div style="background:var(--bg-elevated);border-radius:10px;padding:1.2rem;text-align:center;margin-bottom:1rem">
          <div style="font-size:2rem;transform:rotate(-${_wlAngulo}deg);display:inline-block;transition:transform .2s">➡️</div>
          <p style="font-size:.72rem;color:var(--text-muted);margin:.3rem 0 0">Desplazamiento: → (fijo) — Fuerza a ${_wlAngulo}°</p>
        </div>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Fuerza F = <strong style="color:${C}">${_wlF} N</strong></label>
        <input type="range" id="wl-slider-f" min="0" max="100" step="5" value="${_wlF}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Ángulo θ = <strong style="color:${C}">${_wlAngulo}°</strong></label>
        <input type="range" id="wl-slider-angulo" min="0" max="180" step="10" value="${_wlAngulo}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Desplazamiento d = <strong style="color:${C}">${_wlD} m</strong></label>
        <input type="range" id="wl-slider-d" min="0" max="20" step="1" value="${_wlD}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem">
          W = F·cos θ·d = <strong style="color:${C}">${W.toFixed(1)} J</strong><br>
          <span style="font-size:.78rem;color:var(--text-muted)">${tipo}</span>
        </div>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Power Lab MQC": P=W/t, proporcionalidad
     ================================================================ */
  const PL_RONDAS = [
    { wA: 1000, tA: 2, wB: 1000, tB: 4 }, { wA: 500, tA: 5, wB: 1500, tB: 5 },
    { wA: 2000, tA: 8, wB: 2000, tB: 4 }, { wA: 800, tA: 2, wB: 800, tB: 1 }
  ];
  let _plIdx = 0;
  function renderSim3() {
    if (_plIdx >= PL_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${PL_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = PL_RONDAS[_plIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔋 Power Lab MQC</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_plIdx + 1} de ${PL_RONDAS.length}</p>
        <p style="margin:.6rem 0">Motor A: W = ${r.wA} J en t = ${r.tA} s &nbsp;|&nbsp; Motor B: W = ${r.wB} J en t = ${r.tB} s.</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">P = W/t</div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál motor tiene mayor potencia?</p>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost" data-pl-opcion="A">Motor A</button>
          <button class="btn btn-ghost" data-pl-opcion="B">Motor B</button>
          <button class="btn btn-ghost" data-pl-opcion="igual">Igual potencia</button>
        </div>
        <p id="pl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '⚡ Energy Lab MQC', desc: 'El simulador estrella: una pelota cae, y ves cómo la energía se reparte entre cinética y potencial, siempre constante.' },
      { id: 'sim2', titulo: '💪 Work Lab MQC', desc: 'Controlá F, el ángulo y d, y mirá cómo el trabajo puede ser positivo, negativo, o nulo.' },
      { id: 'sim3', titulo: '🔋 Power Lab MQC', desc: 'Compará motores y descubrí cuál tiene mayor potencia.' }
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
        _elModo = 'explora'; _elHActual = _elH0; _elDesafioIdx = 0;
        _wlF = 50; _wlAngulo = 0; _wlD = 10;
        _plIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Energy Lab */
    const s1h = document.getElementById('el-slider-h');
    if (s1h) s1h.addEventListener('input', () => { _elHActual = parseInt(s1h.value, 10); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('el-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _elModo = 'desafio'; _elDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('el-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _elModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarEl = document.getElementById('el-comprobar');
    if (comprobarEl) comprobarEl.addEventListener('click', () => {
      const r = EL_RONDAS[_elDesafioIdx];
      const calc = _elCalcular(r.m, r.h0, r.hActual);
      const esperado = calc[r.pide];
      const val = parseFloat(document.getElementById('el-respuesta').value);
      const fb = document.getElementById('el-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.5;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${esperado.toFixed(1)} J.`;
        if (ok) setTimeout(() => { _elDesafioIdx++; if (_elDesafioIdx >= EL_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — Work Lab */
    const s2f = document.getElementById('wl-slider-f');
    const s2a = document.getElementById('wl-slider-angulo');
    const s2d = document.getElementById('wl-slider-d');
    if (s2f) s2f.addEventListener('input', () => { _wlF = parseInt(s2f.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    if (s2a) s2a.addEventListener('input', () => { _wlAngulo = parseInt(s2a.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });
    if (s2d) s2d.addEventListener('input', () => { _wlD = parseInt(s2d.value, 10); _rerenderSimTab(unit); markSimDone('sim2'); });

    /* Sim3 — Power Lab */
    document.querySelectorAll('[data-pl-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-pl-opcion');
        const r = PL_RONDAS[_plIdx];
        const pA = r.wA / r.tA, pB = r.wB / r.tB;
        const correcta = Math.abs(pA - pB) < 0.01 ? 'igual' : (pA > pB ? 'A' : 'B');
        const fb = document.getElementById('pl-feedback');
        const ok = elegido === correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? `✅ ¡Correcto! P_A=${pA.toFixed(0)}W, P_B=${pB.toFixed(0)}W.` : `💡 No es correcto. P_A=${pA.toFixed(0)}W, P_B=${pB.toFixed(0)}W.`;
        }
        setTimeout(() => { _plIdx++; if (_plIdx >= PL_RONDAS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1700);
      });
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero de Energía": 7 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un obrero empuja fuertemente una pared, pero esta no se mueve ni un milímetro.',
      pregunta: '¿Cuánto trabajo mecánico realizó, según la física?', pista: 'Recordá las dos condiciones necesarias para que exista trabajo mecánico.',
      correcta: '0 J (no hubo desplazamiento)', opciones: ['0 J (no hubo desplazamiento)', 'Un trabajo muy grande, por el esfuerzo realizado', 'Depende de cuánto tiempo empujó', 'No se puede determinar sin la fuerza exacta'] },
    { id: 'nivel2', escenario: 'Una fuerza de 40 N actúa perpendicularmente a la dirección en la que se desplaza un objeto 10 m.',
      pregunta: '¿Cuánto trabajo realiza esa fuerza?', pista: 'Pensá en el valor del coseno cuando el ángulo es de 90°.',
      correcta: '0 J', opciones: ['0 J', '400 J', '40 J', '10 J'] },
    { id: 'nivel3', escenario: 'Un avión frena ejerciendo una fuerza de 9.000 N en dirección opuesta a su desplazamiento de 25 m.',
      pregunta: '¿Cuál es el signo del trabajo realizado por esa fuerza de frenado?', pista: 'Pensá en el coseno de 180°.',
      correcta: 'Negativo', opciones: ['Negativo', 'Positivo', 'Cero', 'No tiene signo definido'] },
    { id: 'nivel4', escenario: 'Dos personas realizan exactamente el mismo trabajo, pero una lo hace en 2 s y la otra en 5 s.',
      pregunta: '¿Cuál de las dos desarrolló mayor potencia?', pista: 'Recordá que la potencia es inversamente proporcional al tiempo, a igual trabajo.',
      correcta: 'La que tardó 2 s', opciones: ['La que tardó 2 s', 'La que tardó 5 s', 'Ambas desarrollaron la misma potencia', 'No se puede determinar sin más datos'] },
    { id: 'nivel5', escenario: 'Un objeto de 4 kg se mueve a 6 m/s.',
      pregunta: '¿Cuál es su energía cinética (Ec = m·v²/2)?', pista: 'No olvides elevar la velocidad al cuadrado antes de multiplicar.',
      correcta: '72 J', opciones: ['72 J', '24 J', '12 J', '144 J'] },
    { id: 'nivel6', escenario: 'Una pelota de 2 kg se deja caer desde 15 m de altura (Em = m·g·h = 294 J). A los 5 m de altura restantes...',
      pregunta: '¿Cuál es su energía cinética en ese punto (Ec = Em − Ep)?', pista: 'Primero calculá Ep a esa altura, y luego restala de la energía mecánica total.',
      correcta: '196 J', opciones: ['196 J', '294 J', '98 J', '0 J'] },
    { id: 'nivel7', escenario: 'Un péndulo oscila de un lado a otro, sin fricción con el aire.',
      pregunta: '¿Qué le pasa a su energía mecánica total durante todo el recorrido?', pista: 'Pensá en la Ley de Conservación de la Energía Mecánica.',
      correcta: 'Permanece constante en todo momento', opciones: ['Permanece constante en todo momento', 'Aumenta constantemente', 'Disminuye constantemente', 'Es cero en todo el recorrido'] }
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
        <h3>⚡ Misión: Ingeniero de Energía</h3>
        <p style="color:var(--text-secondary);font-size:.85rem">MQC necesita auditar sistemas de trabajo y energía — resolvé cada nivel.</p>
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
          setTimeout(() => { _juegoNivelActivo = null; _juegoFeedback = null; _rerenderJuego(unit); }, 1600);
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
     EXAMEN — banco real (js/data/banco-fix10-u08.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U08 !== 'undefined') ? PREGUNTAS_FIX10_U08 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U08</h3>
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
     MISIÓN FINAL — "Auditoría Energética" (2 fases: caída libre,
     luego cambio de altura inicial para evaluar proporcionalidad)
     ================================================================ */
  const MISION_FASE1 = { m: 2, h0: 25 };
  const MISION_FASE2 = { m: 2, h0: 50 }; // se duplica h0
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { em: '', ecMedia: '', texto: '' };

  function _misionEsperado(datos) {
    const Em = datos.m * G * datos.h0;
    const EcMedia = Em - datos.m * G * (datos.h0 / 2); // Ec a mitad de altura
    return { Em, EcMedia };
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esp = _misionEsperado(datos);
    const em = parseFloat(_misionVals.em);
    const ecMedia = parseFloat(_misionVals.ecMedia);
    if (isNaN(em) || isNaN(ecMedia)) return false;
    if (Math.abs(em - esp.Em) > 2) return false;
    if (Math.abs(ecMedia - esp.EcMedia) > 2) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Auditoría Energética".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>⚡ Misión: Auditoría Energética ${_misionFase === 2 ? '— Fase 2 (h₀ duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Una pelota de m = ${datos.m} kg se deja caer desde h₀ = ${datos.h0} m (sin fricción).</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Energía mecánica total (Em = m·g·h₀):
          <input type="number" step="0.1" id="mision-em" value="${_misionVals.em}" placeholder="J" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Energía cinética a la mitad de la altura (h₀/2):
          <input type="number" step="0.1" id="mision-ecmedia" value="${_misionVals.ecMedia}" placeholder="J" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">C. Explicá qué le pasa a la energía mecánica total durante toda la caída:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { em: 'mision-em', ecMedia: 'mision-ecmedia', texto: 'mision-texto' };
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
          _misionVals = { em: '', ecMedia: '', texto: '' };
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
