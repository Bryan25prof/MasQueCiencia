/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u05.js
   FIX10-U05 — Análisis Gráfico de Movimientos
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad V). Gráficas generadas internamente
   en SVG (nunca imágenes externas), con escalas matemáticamente
   coherentes con los valores mostrados.

   Mismo patrón de plugin exacto que fix10-u01/02/03/04.js.
   FIX10-U01 a U04 NO se tocaron. NO se adelanta contenido de U06
   (Dinámica / Leyes de Newton).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u05';
  const C = 'var(--violet)';

  /* ================================================================
     GENERADOR DE GRÁFICAS SVG — reutilizado en teoría, simuladores,
     juego y examen. Recibe una lista de puntos {t,y} conectados en
     orden, y dibuja ejes + línea con escalas fieles a los valores.
     ================================================================ */
  /* ================================================================
     GENERADOR DE GRÁFICAS SVG — HOTFIX DE AUTOSUFICIENCIA (ver
     PROMPT MAESTRO UNIFICADO, Parte B): antes, los ticks de los ejes
     eran opcionales (cfg.marcasT) y casi ninguna llamada los pasaba
     — el estudiante nunca veía los valores numéricos reales en la
     gráfica y tenía que "confiar" en el texto de las opciones. Ahora
     el generador DERIVA AUTOMÁTICAMENTE los ticks de tiempo y de
     valor Y a partir de los propios puntos de la gráfica (que ya son,
     por definición, los tiempos y valores críticos) — así ninguna
     gráfica puede quedar sin sus datos visibles, sin tener que tocar
     cada una de las ~100 llamadas existentes una por una.
     ================================================================ */
  function _svgGrafica(puntos, cfg) {
    cfg = cfg || {};
    const w = cfg.w || 280, h = cfg.h || 190;
    const padL = 40, padB = 26, padT = 14, padR = 14;
    const tMax = cfg.tMax !== undefined ? cfg.tMax : Math.max.apply(null, puntos.map(function (p) { return p.t; }));
    const ys = puntos.map(function (p) { return p.y; });
    const yMinData = Math.min.apply(null, ys);
    const yMaxData = Math.max.apply(null, ys);
    // Regla 9/10: si hay valores negativos, reservar espacio VISIBLE
    // debajo de cero (nunca dejar v=0 pegado al borde inferior).
    const margen = Math.max(1, (yMaxData - Math.min(0, yMinData)) * 0.18);
    const yMin = cfg.yMin !== undefined ? cfg.yMin : (yMinData < 0 ? yMinData - margen : Math.min(0, yMinData));
    const yMax = cfg.yMax !== undefined ? cfg.yMax : Math.max(yMaxData + margen, yMinData < 0 ? margen : 0.001);
    function xScale(t) { return padL + (t / (tMax || 1)) * (w - padL - padR); }
    function yScale(y) { return (h - padB) - ((y - yMin) / (yMax - yMin || 1)) * (h - padB - padT); }
    const y0 = yScale(0);
    const pathD = puntos.map(function (p, i) { return (i === 0 ? 'M' : 'L') + ' ' + xScale(p.t).toFixed(1) + ' ' + yScale(p.y).toFixed(1); }).join(' ');
    // Regla 3/6: ticks derivados AUTOMÁTICAMENTE de los puntos reales
    // de la gráfica (tiempos y valores Y), a menos que se pase un
    // override explícito — así ningún tiempo ni valor crítico queda
    // "solo en el código".
    function _unicosOrdenados(arr) {
      return arr.filter(function (v, i) { return arr.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    }
    const xTicks = cfg.xTicks || cfg.marcasT || _unicosOrdenados(puntos.map(function (p) { return p.t; }));
    const yTicksBase = puntos.map(function (p) { return p.y; }).concat([0]);
    const yTicks = cfg.yTicks || _unicosOrdenados(yTicksBase);
    const etiquetas = (cfg.etiquetas || []).map(function (e) {
      return '<text x="' + xScale(e.t).toFixed(1) + '" y="' + (yScale(e.y) - 8).toFixed(1) + '" font-size="8" fill="' + (e.color || '#F9FF4D') + '" text-anchor="middle" font-weight="700">' + e.texto + '</text>';
    }).join('');
    // Intervalos etiquetados (Regla 4) — franjas verticales con su
    // nombre, cuando cfg.intervalos viene definido: [{t0,t1,nombre}]
    const intervalos = (cfg.intervalos || []).map(function (iv, idx) {
      const xm = (xScale(iv.t0) + xScale(iv.t1)) / 2;
      return '<text x="' + xm.toFixed(1) + '" y="' + (padT + 8) + '" font-size="7" fill="#8888B0" text-anchor="middle">' + iv.nombre + '</text>' +
        (idx > 0 ? '<line x1="' + xScale(iv.t0).toFixed(1) + '" y1="' + padT + '" x2="' + xScale(iv.t0).toFixed(1) + '" y2="' + (h - padB) + '" stroke="#2a2f5c" stroke-width="1" stroke-dasharray="2,2"/>' : '');
    }).join('');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="background:#161a3d;border-radius:8px;width:100%;max-width:320px;display:block;margin:.6rem auto">' +
      '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="#2a2f5c" stroke-width="1"/>' +
      '<line x1="' + padL + '" y1="' + y0.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y0.toFixed(1) + '" stroke="#2a2f5c" stroke-width="1"/>' +
      '<path d="' + pathD + '" fill="none" stroke="' + (cfg.color || '#7B2FFF') + '" stroke-width="2.5"/>' +
      '<text x="' + (w - padR - 12) + '" y="' + (h - padB - 4) + '" font-size="8" fill="#8888B0">t (s)</text>' +
      '<text x="4" y="' + (padT + 8) + '" font-size="8" fill="#8888B0">' + (cfg.yLabel || 'y') + '</text>' +
      // Ticks de tiempo (eje X) — CADA tiempo crítico, siempre visible.
      xTicks.map(function (mt) { return '<line x1="' + xScale(mt).toFixed(1) + '" y1="' + (h - padB) + '" x2="' + xScale(mt).toFixed(1) + '" y2="' + (h - padB + 3) + '" stroke="#8888B0" stroke-width="1"/><text x="' + xScale(mt).toFixed(1) + '" y="' + (h - padB + 13) + '" font-size="7.5" fill="#B8B8E0" text-anchor="middle">' + mt + '</text>'; }).join('') +
      // Ticks de valor (eje Y) — CADA valor crítico, incluyendo el cero.
      yTicks.map(function (my) { return '<line x1="' + (padL - 3) + '" y1="' + yScale(my).toFixed(1) + '" x2="' + padL + '" y2="' + yScale(my).toFixed(1) + '" stroke="#8888B0" stroke-width="1"/><text x="' + (padL - 5) + '" y="' + (yScale(my) + 2.5).toFixed(1) + '" font-size="7" fill="#B8B8E0" text-anchor="end">' + my + '</text>'; }).join('') +
      intervalos +
      etiquetas +
      '</svg>';
  }
  /* Área sombreada bajo una recta v-t entre t0 y t1 (para el
     Laboratorio de Áreas y las preguntas de examen sobre área). */
  function _svgAreaVT(puntos, region, cfg) {
    cfg = cfg || {};
    const base = _svgGrafica(puntos, cfg);
    // Insertar el polígono de la región justo antes de </svg>, reutilizando la misma escala.
    // HOTFIX: mismos márgenes que _svgGrafica (padL/padB/padT/padR),
    // para que el área sombreada quede alineada con los ejes reales.
    const w = cfg.w || 280, h = cfg.h || 190;
    const padL = 40, padB = 26, padT = 14, padR = 14;
    const tMax = cfg.tMax !== undefined ? cfg.tMax : Math.max.apply(null, puntos.map(function (p) { return p.t; }));
    const ys = puntos.map(function (p) { return p.y; });
    const yMinData = Math.min.apply(null, ys);
    const yMaxData = Math.max.apply(null, ys);
    const margen = Math.max(1, (yMaxData - Math.min(0, yMinData)) * 0.18);
    const yMin = cfg.yMin !== undefined ? cfg.yMin : (yMinData < 0 ? yMinData - margen : Math.min(0, yMinData));
    const yMax = cfg.yMax !== undefined ? cfg.yMax : Math.max(yMaxData + margen, yMinData < 0 ? margen : 0.001);
    function xScale(t) { return padL + (t / (tMax || 1)) * (w - padL - padR); }
    function yScale(y) { return (h - padB) - ((y - yMin) / (yMax - yMin || 1)) * (h - padB - padT); }
    const y0 = yScale(0);
    const pts = region.map(function (p) { return xScale(p.t).toFixed(1) + ',' + yScale(p.y).toFixed(1); });
    const poligono = '<polygon points="' + xScale(region[0].t).toFixed(1) + ',' + y0.toFixed(1) + ' ' + pts.join(' ') + ' ' + xScale(region[region.length - 1].t).toFixed(1) + ',' + y0.toFixed(1) + '" fill="' + (cfg.areaColor || 'rgba(249,255,77,.35)') + '" stroke="none"/>';
    return base.replace('</svg>', poligono + '</svg>');
  }

  const TEMAS = [
    { id: 't1', icon: '📊', titulo: 'El movimiento habla en gráficas',
      ideaClave: 'Una gráfica condensa toda la historia de un movimiento — dónde estuvo, cuándo, y qué tan rápido, sin necesidad de una tabla enorme de números.',
      explicacion: 'Toda gráfica de movimiento tiene un eje horizontal (siempre el tiempo) y un eje vertical (posición, distancia, o velocidad, según el tipo de gráfica). Antes de calcular nada, hay que leerla: ¿qué variable representa cada eje? ¿en qué unidades? ¿la línea sube, baja, o se mantiene igual en cada intervalo?',
      ejemplo: `${_svgGrafica([{t:0,y:0},{t:5,y:25}], {tMax:5, yLabel:'x (m)', marcasT:[0,5]})}Esta gráfica dice: en 5 segundos, la posición pasó de 0 a 25 metros — sin necesidad de ver el movimiento real.`,
      aplicacion: 'Leer correctamente una gráfica es el primer paso — recién después se calcula. Una gráfica mal leída lleva a una respuesta numéricamente correcta pero físicamente sin sentido.',
      compruebra: 'Si una gráfica tiene el eje vertical en "velocidad (m/s)" y el horizontal en "tiempo (s)", ¿qué tipo de gráfica es?' },

    { id: 't2', icon: '📈', titulo: 'Gráficas posición/distancia vs. tiempo',
      ideaClave: 'ERROR A EVITAR: una gráfica x-t NO es un dibujo de la trayectoria del objeto — es solo la relación entre su posición y el tiempo.',
      explicacion: 'En una gráfica x-t o d-t: una línea horizontal significa que la posición NO cambia — el objeto está en reposo. Una línea inclinada hacia arriba significa que la posición aumenta con el tiempo (se aleja en dirección positiva). Una línea inclinada hacia abajo significa que la posición disminuye (se acerca, o retrocede).',
      ejemplo: `${_svgGrafica([{t:0,y:30},{t:5,y:30},{t:10,y:30}], {tMax:10, yMax:40, yLabel:'x (m)', marcasT:[0,5,10]})}Entre t=5s y t=10s, la posición se mantiene en 30 m — el objeto está detenido en ese intervalo (aunque la línea sea horizontal EN ALTURA 30, no en el eje cero).`,
      aplicacion: 'La pendiente de una gráfica x-t (Δx/Δt) es la velocidad. Mientras mayor sea el valor absoluto de la pendiente, mayor es la magnitud de la velocidad — sin importar si la línea sube o baja.',
      compruebra: 'Una línea inclinada hacia arriba en una gráfica x-t, ¿significa que el objeto está subiendo una cuesta físicamente?' },

    { id: 't3', icon: '📉', titulo: 'Velocidad vs. tiempo',
      ideaClave: 'En una gráfica v-t, una línea HORIZONTAL significa velocidad CONSTANTE (no reposo, salvo que esa línea esté exactamente sobre el cero).',
      explicacion: 'Una línea horizontal sobre el cero significa velocidad positiva constante (MRU). Una línea horizontal exactamente EN el cero significa reposo. Una línea horizontal debajo del cero significa velocidad negativa constante (se mueve en la dirección contraria, a rapidez constante). Una línea inclinada significa que la velocidad está cambiando — hay aceleración.',
      ejemplo: `${_svgGrafica([{t:0,y:0},{t:5,y:20}], {tMax:5, yLabel:'v (m/s)', marcasT:[0,5], color:'#1FDBFF'})}Esta línea inclinada muestra que la velocidad pasó de 0 a 20 m/s en 5 segundos — el objeto está acelerando.`,
      aplicacion: 'La pendiente de una gráfica v-t (Δv/Δt) es la aceleración. Importante: una aceleración negativa NO siempre significa "frenar" — depende del signo que ya tenga la velocidad en ese momento.',
      compruebra: 'Una línea horizontal en una gráfica v-t, ¿significa siempre que el objeto está en reposo?' },

    { id: 't4', icon: '🟨', titulo: 'Área bajo la curva',
      ideaClave: 'En una gráfica v-t, el ÁREA bajo la línea representa el DESPLAZAMIENTO — no la velocidad ni la distancia directamente.',
      explicacion: 'Si v=10 m/s se mantiene constante durante 5 s, el área bajo esa línea (un rectángulo: base × altura) es 10×5=50 — el desplazamiento es 50 m. Cuando la gráfica es un triángulo (velocidad que empieza en cero y aumenta uniformemente), el área se calcula como (base × altura)/2.',
      ejemplo: `${_svgAreaVT([{t:0,y:10},{t:5,y:10}], [{t:0,y:10},{t:5,y:10}], {tMax:5, yMax:15, yLabel:'v (m/s)', marcasT:[0,5], color:'#1FDBFF'})}El área sombreada (rectángulo) = 10 m/s × 5 s = 50 m de desplazamiento.`,
      aplicacion: 'Diferencia CRÍTICA: si el área está por ENCIMA del eje del tiempo, es un desplazamiento positivo; si está por DEBAJO, es negativo. El DESPLAZAMIENTO NETO es la suma de las áreas con su signo (positivas menos negativas); la DISTANCIA TOTAL es la suma de las magnitudes de cada área, sin importar el signo. Ejemplo: +80 m de área y −30 m de área dan un desplazamiento neto de 50 m, pero una distancia total de 110 m.',
      compruebra: 'Un objeto avanza +50 m y luego retrocede −50 m. ¿Cuál es su desplazamiento neto? ¿Y su distancia total?' },

    { id: 't5', icon: '🔎', titulo: 'Reconstruir historias de movimiento',
      ideaClave: 'Con todo lo anterior, ya podés "leer" una gráfica completa como si fuera una historia contada en varios capítulos (intervalos).',
      explicacion: 'Una gráfica segmentada en intervalos (I, II, III...) cuenta una historia distinta en cada tramo: en uno el objeto se aleja, en otro permanece detenido, en otro regresa, en otro cambia de velocidad. La tarea del investigador es describir, intervalo por intervalo, qué está pasando físicamente.',
      ejemplo: `${_svgGrafica([{t:0,y:0},{t:5,y:20},{t:8,y:20},{t:12,y:0}], {tMax:12, yLabel:'x (m)', marcasT:[0,5,8,12]})}Intervalo I (0-5s): se aleja. Intervalo II (5-8s): permanece detenido a 20 m. Intervalo III (8-12s): regresa hasta la posición 0.`,
      aplicacion: 'Ya conocés MRU y MRUA desde U04 — acá aprendés a reconocerlos dentro de una gráfica, sin que nadie te diga de antemano qué tipo de movimiento es.',
      compruebra: 'En el ejemplo de arriba, ¿en qué intervalo la velocidad fue mayor: el I o el III?' }
  ];

  /* ── Helpers defensivos (mismo patrón que fix10-u01/02/03/04.js) ── */
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
     TEORÍA — 5 temas en acordeón, con gráficas SVG reales embebidas
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
            ${_bloqueTema('📈 LEE LA GRÁFICA', t.ejemplo, 'var(--cyan)')}
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
     SIMULADOR 1 — "Motion Graph Lab MQC": el simulador estrella.
     Modo Explora (elegir v: positiva/cero/negativa/cambiante, ver la
     gráfica construirse) + Modo Predice (elegir la gráfica correcta
     antes de ejecutar el movimiento).
     ================================================================ */
  let _mglModo = 'explora';
  let _mglTipoV = 'positiva'; // 'positiva' | 'cero' | 'negativa' | 'cambiante'
  const MGL_V_OPCIONES = {
    positiva: { v: 8, label: 'Velocidad positiva constante' },
    cero: { v: 0, label: 'En reposo (v = 0)' },
    negativa: { v: -8, label: 'Velocidad negativa constante' },
    cambiante: { v: 'cambiante', label: 'Velocidad que cambia (acelerando)' }
  };
  function _puntosMGL(tipoV, modo) {
    const T = 6;
    if (tipoV === 'cambiante') {
      if (modo === 'xt') return [{ t: 0, y: 0 }, { t: 3, y: 9 }, { t: 6, y: 36 }]; // aprox curvo, se aproxima con 2 tramos
      return [{ t: 0, y: 0 }, { t: 6, y: 12 }]; // v-t: sube linealmente
    }
    const v = MGL_V_OPCIONES[tipoV].v;
    if (modo === 'xt') return [{ t: 0, y: 0 }, { t: T, y: v * T }];
    return [{ t: 0, y: v }, { t: T, y: v }];
  }
  function renderSim1() {
    if (_mglModo === 'predice') return _renderMglPredice();
    const puntosXT = _puntosMGL(_mglTipoV, 'xt');
    const puntosVT = _puntosMGL(_mglTipoV, 'vt');
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">📊 Motion Graph Lab — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Elegí el tipo de movimiento y mirá cómo se ven SUS DOS gráficas (x-t y v-t) al mismo tiempo.</p>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">
          ${Object.keys(MGL_V_OPCIONES).map(k => `<button class="btn ${_mglTipoV === k ? 'btn-primary' : 'btn-ghost'} btn-sm" data-mgl-tipo="${k}">${MGL_V_OPCIONES[k].label}</button>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem">
          <div><p style="font-size:.72rem;color:var(--text-muted);text-align:center;margin:0 0 .2rem">Gráfica x-t</p>${_svgGrafica(puntosXT, { tMax: 6, yLabel: 'x (m)', marcasT: [0, 6], w: 260, h: 150 })}</div>
          <div><p style="font-size:.72rem;color:var(--text-muted);text-align:center;margin:0 0 .2rem">Gráfica v-t</p>${_svgGrafica(puntosVT, { tMax: 6, yMin: -10, yMax: 15, yLabel: 'v (m/s)', marcasT: [0, 6], color: '#1FDBFF', w: 260, h: 150 })}</div>
        </div>
        <button class="btn btn-primary btn-sm" id="mgl-ir-predice" style="margin-top:1.2rem">Modo Predice →</button>
      </div>`;
  }

  const MGL_ESCENARIOS = [
    { texto: 'El móvil avanza durante 5 s a velocidad constante, y luego permanece detenido 3 s.',
      correcta: [{ t: 0, y: 0 }, { t: 5, y: 25 }, { t: 8, y: 25 }],
      distractor1: [{ t: 0, y: 0 }, { t: 5, y: 25 }, { t: 8, y: 40 }],
      distractor2: [{ t: 0, y: 25 }, { t: 5, y: 0 }, { t: 8, y: 0 }] },
    { texto: 'El móvil permanece detenido 3 s y luego retrocede a velocidad constante hasta el origen.',
      correcta: [{ t: 0, y: 20 }, { t: 3, y: 20 }, { t: 8, y: 0 }],
      distractor1: [{ t: 0, y: 20 }, { t: 3, y: 20 }, { t: 8, y: 35 }],
      distractor2: [{ t: 0, y: 0 }, { t: 3, y: 20 }, { t: 8, y: 20 }] },
    { texto: 'El móvil parte del reposo y acelera uniformemente durante todo el recorrido (velocidad-tiempo).',
      correcta: [{ t: 0, y: 0 }, { t: 6, y: 18 }],
      distractor1: [{ t: 0, y: 18 }, { t: 6, y: 18 }],
      distractor2: [{ t: 0, y: 18 }, { t: 6, y: 0 }] }
  ];
  let _mglEscenarioIdx = 0;
  let _mglPosCorrecta = null; // 'A' | 'B' | 'C' — cuál posición tiene la gráfica correcta EN ESTE render
  function _renderMglPredice() {
    if (_mglEscenarioIdx >= MGL_ESCENARIOS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${MGL_ESCENARIOS.length} predicciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const e = MGL_ESCENARIOS[_mglEscenarioIdx];
    // HOTFIX: se mezcla realmente CUÁL gráfica (correcta/distractor1/
    // distractor2) queda en cada posición A/B/C — antes solo se
    // mezclaba el orden de las ETIQUETAS, y la gráfica correcta
    // quedaba siempre fija en la posición "A".
    const graficasOrdenadas = _mezclar([
      { esCorrecta: true, puntos: e.correcta },
      { esCorrecta: false, puntos: e.distractor1 },
      { esCorrecta: false, puntos: e.distractor2 }
    ]);
    const letras = ['A', 'B', 'C'];
    graficasOrdenadas.forEach((g, i) => { g.letra = letras[i]; if (g.esCorrecta) _mglPosCorrecta = letras[i]; });
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="mgl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Escenario ${_mglEscenarioIdx + 1} de ${MGL_ESCENARIOS.length}</p>
        <p style="margin-bottom:.8rem">${e.texto}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.4rem">¿Cuál gráfica x-t predecís?</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.5rem">
          ${graficasOrdenadas.map(g => `
            <div style="text-align:center">
              <p style="font-size:.72rem;color:var(--text-muted);margin:0">${g.letra}</p>
              ${_svgGrafica(g.puntos, { tMax: 8, yLabel: 'x (m)', marcasT: [0, 8], w: 150, h: 110 })}
              <button class="btn btn-ghost btn-sm" data-mgl-pred="${g.letra}" style="width:100%;margin-top:.3rem">Elegir ${g.letra}</button>
            </div>`).join('')}
        </div>
        <p id="mgl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Detective de Pendientes": 10 escenarios reales
     ================================================================ */
  const PENDIENTES_ESCENARIOS = [
    { puntos: [{ t: 0, y: 0 }, { t: 4, y: 40 }, { t: 8, y: 40 }], yLabel: 'x (m)', pregunta: '¿En qué intervalo la velocidad fue mayor?', correcta: '0-4s', opciones: ['0-4s', '4-8s', 'Ninguno, siempre igual', 'No se puede saber'] },
    { puntos: [{ t: 0, y: 20 }, { t: 5, y: 20 }, { t: 10, y: 0 }], yLabel: 'x (m)', pregunta: '¿En qué intervalo el móvil estuvo detenido?', correcta: '0-5s', opciones: ['0-5s', '5-10s', 'Todo el tiempo', 'Nunca estuvo detenido'] },
    { puntos: [{ t: 0, y: 0 }, { t: 6, y: -30 }], yLabel: 'x (m)', pregunta: '¿La velocidad de este móvil es positiva o negativa?', correcta: 'Negativa', opciones: ['Negativa', 'Positiva', 'Cero', 'No tiene velocidad definida'] },
    { puntos: [{ t: 0, y: 0 }, { t: 3, y: 6 }, { t: 6, y: 24 }], yLabel: 'v (m/s)', color: '#1FDBFF', pregunta: '¿En qué intervalo la aceleración fue mayor?', correcta: '3-6s', opciones: ['3-6s', '0-3s', 'Es igual en ambos', 'No se puede determinar'] },
    { puntos: [{ t: 0, y: 15 }, { t: 6, y: 15 }], yLabel: 'v (m/s)', color: '#1FDBFF', pregunta: '¿Cuál es la aceleración de este móvil?', correcta: '0 m/s²', opciones: ['0 m/s²', '15 m/s²', '6 m/s²', 'No se puede saber sin más datos'] },
    { puntos: [{ t: 0, y: 0 }, { t: 4, y: 0 }, { t: 8, y: 20 }], yLabel: 'x (m)', pregunta: '¿En qué intervalo el móvil comenzó a moverse?', correcta: '4-8s', opciones: ['4-8s', '0-4s', 'Desde el inicio', 'Nunca se movió'] },
    { puntos: [{ t: 0, y: 10 }, { t: 5, y: 0 }], yLabel: 'v (m/s)', color: '#1FDBFF', pregunta: '¿Qué representa esta línea inclinada en v-t?', correcta: 'Que la velocidad está disminuyendo (desacelerando)', opciones: ['Que la velocidad está disminuyendo (desacelerando)', 'Que el móvil está en reposo', 'Que la posición está disminuyendo', 'Que el móvil retrocede en el espacio'] },
    { puntos: [{ t: 0, y: 0 }, { t: 3, y: 30 }, { t: 6, y: 15 }], yLabel: 'x (m)', pregunta: '¿En qué intervalo el móvil cambió de dirección?', correcta: '3-6s', opciones: ['3-6s', '0-3s', 'No cambió de dirección', 'En todo el recorrido'] },
    { puntos: [{ t: 0, y: -10 }, { t: 5, y: -10 }], yLabel: 'v (m/s)', color: '#1FDBFF', pregunta: '¿Qué tipo de movimiento representa esta línea horizontal debajo del cero?', correcta: 'Velocidad negativa constante (no reposo)', opciones: ['Velocidad negativa constante (no reposo)', 'Reposo total', 'Aceleración negativa', 'Velocidad positiva'] },
    { puntos: [{ t: 0, y: 0 }, { t: 2, y: 20 }, { t: 6, y: 30 }], yLabel: 'x (m)', pregunta: '¿En qué intervalo la rapidez fue mayor?', correcta: '0-2s', opciones: ['0-2s', '2-6s', 'Es igual en ambos', 'No se puede determinar'] }
  ];
  let _pendIdx = 0;
  function renderSim2() {
    if (_pendIdx >= PENDIENTES_ESCENARIOS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste los ${PENDIENTES_ESCENARIOS.length} escenarios!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const e = PENDIENTES_ESCENARIOS[_pendIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔍 Detective de Pendientes</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Escenario ${_pendIdx + 1} de ${PENDIENTES_ESCENARIOS.length}</p>
        ${_svgGrafica(e.puntos, { tMax: Math.max.apply(null, e.puntos.map(p => p.t)), yLabel: e.yLabel, color: e.color || '#7B2FFF', marcasT: e.puntos.map(p => p.t) })}
        <p style="color:var(--text-secondary);font-size:.85rem;margin:.6rem 0">${e.pregunta}</p>
        <div style="display:grid;gap:.5rem">
          ${_mezclar(e.opciones).map(op => `<button class="btn btn-ghost" data-pend-opcion="${op}">${op}</button>`).join('')}
        </div>
        <p id="pend-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Laboratorio de Áreas": rectángulos y triángulos
     ================================================================ */
  const AREA_RONDAS = [
    { tipo: 'rectangulo', puntos: [{ t: 0, y: 10 }, { t: 5, y: 10 }], base: 5, altura: 10, area: 50 },
    { tipo: 'triangulo', puntos: [{ t: 0, y: 0 }, { t: 10, y: 20 }], base: 10, altura: 20, area: 100 },
    { tipo: 'rectangulo', puntos: [{ t: 0, y: 15 }, { t: 4, y: 15 }], base: 4, altura: 15, area: 60 }
  ];
  let _areaIdx = 0, _areaFase = 'identificar';
  function renderSim3() {
    if (_areaIdx >= AREA_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${AREA_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = AREA_RONDAS[_areaIdx];
    const grafica = _svgAreaVT(r.puntos, r.puntos, { tMax: r.base, yMax: r.altura + 5, yLabel: 'v (m/s)', color: '#1FDBFF', marcasT: [0, r.base] });
    if (_areaFase === 'identificar') {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
          <h3 style="margin:0 0 .3rem">🟨 Laboratorio de Áreas</h3>
          <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_areaIdx + 1} de ${AREA_RONDAS.length}</p>
          ${grafica}
          <p style="color:var(--text-secondary);font-size:.85rem;margin:.6rem 0">¿Qué figura geométrica forma esta región sombreada?</p>
          <div style="display:flex;gap:.5rem">
            <button class="btn btn-ghost" data-area-figura="rectangulo">Rectángulo</button>
            <button class="btn btn-ghost" data-area-figura="triangulo">Triángulo</button>
          </div>
          <p id="area-feedback1" style="margin-top:.8rem;font-size:.85rem"></p>
        </div>`;
    }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🟨 Laboratorio de Áreas</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_areaIdx + 1} de ${AREA_RONDAS.length}</p>
        ${grafica}
        <p style="color:var(--text-secondary);font-size:.85rem;margin:.6rem 0">Base = ${r.base} s, Altura = ${r.altura} m/s. ¿Cuál es el desplazamiento (área)?</p>
        <input type="number" id="area-respuesta" placeholder="Desplazamiento (m)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="area-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="area-feedback2" style="margin-top:.8rem;font-size:.85rem"></p>
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
      { id: 'sim1', titulo: '📊 Motion Graph Lab', desc: 'El simulador estrella: mirá la gráfica x-t y v-t a la vez, y predecí antes de ejecutar.' },
      { id: 'sim2', titulo: '🔍 Detective de Pendientes', desc: '10 escenarios: leé gráficas reales para identificar velocidad, reposo y aceleración.' },
      { id: 'sim3', titulo: '🟨 Laboratorio de Áreas', desc: 'Identificá la figura geométrica bajo una gráfica v-t y calculá el desplazamiento.' }
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
        _mglModo = 'explora'; _mglTipoV = 'positiva'; _mglEscenarioIdx = 0;
        _pendIdx = 0;
        _areaIdx = 0; _areaFase = 'identificar';
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Motion Graph Lab */
    document.querySelectorAll('[data-mgl-tipo]').forEach(btn => {
      btn.addEventListener('click', () => { _mglTipoV = btn.getAttribute('data-mgl-tipo'); _rerenderSimTab(unit); });
    });
    const irPredice = document.getElementById('mgl-ir-predice');
    if (irPredice) irPredice.addEventListener('click', () => { _mglModo = 'predice'; _mglEscenarioIdx = 0; _rerenderSimTab(unit); });
    const irExplora = document.getElementById('mgl-ir-explora');
    if (irExplora) irExplora.addEventListener('click', () => { _mglModo = 'explora'; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-mgl-pred]').forEach(btn => {
      btn.addEventListener('click', () => {
        const letra = btn.getAttribute('data-mgl-pred');
        const fb = document.getElementById('mgl-feedback');
        const ok = letra === _mglPosCorrecta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto! Esa gráfica representa bien la situación.' : '💡 No es esa. Fijate en qué momento el móvil se mueve y en qué momento no.';
          if (ok) setTimeout(() => { _mglEscenarioIdx++; _rerenderSimTab(unit); }, 1600);
        }
      });
    });

    /* Sim2 — Detective de Pendientes */
    document.querySelectorAll('[data-pend-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-pend-opcion');
        const e = PENDIENTES_ESCENARIOS[_pendIdx];
        const fb = document.getElementById('pend-feedback');
        const ok = elegido === e.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No es esa. La respuesta correcta era: ${e.correcta}.`;
        }
        setTimeout(() => { _pendIdx++; if (_pendIdx >= PENDIENTES_ESCENARIOS.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1500);
      });
    });

    /* Sim3 — Laboratorio de Áreas */
    document.querySelectorAll('[data-area-figura]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-area-figura');
        const r = AREA_RONDAS[_areaIdx];
        const fb = document.getElementById('area-feedback1');
        const ok = elegido === r.tipo;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 Es un ${r.tipo}.`;
        }
        setTimeout(() => { _areaFase = 'calcular'; _rerenderSimTab(unit); }, 1200);
      });
    });
    const comprobarArea = document.getElementById('area-comprobar');
    if (comprobarArea) comprobarArea.addEventListener('click', () => {
      const r = AREA_RONDAS[_areaIdx];
      const val = parseFloat(document.getElementById('area-respuesta').value);
      const fb = document.getElementById('area-feedback2');
      const ok = Math.abs(val - r.area) <= 1;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Área = ${r.area} m.`;
        if (ok) setTimeout(() => {
          _areaIdx++; _areaFase = 'identificar';
          if (_areaIdx >= AREA_RONDAS.length) markSimDone('sim3');
          _rerenderSimTab(unit);
        }, 1500);
      }
    });
  }

  /* ================================================================
     JUEGO — "Reconstruye el Viaje": 6 niveles verificables
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', puntos: [{ t: 0, y: 15 }, { t: 5, y: 15 }], yLabel: 'x (m)',
      pregunta: '¿Este móvil está en reposo o en movimiento?',
      pista: 'Fijate si la posición cambia mientras el tiempo avanza.',
      correcta: 'En reposo', opciones: ['En reposo', 'En movimiento constante', 'Acelerando', 'No se puede saber'] },
    { id: 'nivel2', puntos: [{ t: 0, y: 0 }, { t: 5, y: -25 }], yLabel: 'x (m)',
      pregunta: '¿En qué dirección se mueve este objeto (positiva o negativa)?',
      pista: 'Fijate si la posición aumenta o disminuye con el tiempo.',
      correcta: 'Dirección negativa', opciones: ['Dirección negativa', 'Dirección positiva', 'No se mueve', 'Cambia de dirección constantemente'] },
    { id: 'nivel3', puntos: [{ t: 0, y: 5 }, { t: 4, y: 5 }], yLabel: 'v (m/s)', color: '#1FDBFF',
      pregunta: 'Comparado con otro móvil que va a 15 m/s constante, ¿cuál es más rápido?',
      pista: 'Compará directamente los valores de velocidad de cada uno.',
      correcta: 'El de 15 m/s', opciones: ['El de 15 m/s', 'El de esta gráfica (5 m/s)', 'Van a la misma velocidad', 'No se puede comparar'] },
    { id: 'nivel4', puntos: [{ t: 0, y: 20 }, { t: 5, y: 0 }], yLabel: 'v (m/s)', color: '#1FDBFF',
      pregunta: '¿Qué está pasando con la velocidad de este móvil?',
      pista: 'Fijate si la línea sube o baja en la gráfica v-t.',
      correcta: 'Está disminuyendo uniformemente', opciones: ['Está disminuyendo uniformemente', 'Está aumentando uniformemente', 'Se mantiene constante', 'Es siempre cero'] },
    { id: 'nivel5', puntos: [{ t: 0, y: 12 }, { t: 5, y: 12 }], yLabel: 'v (m/s)', color: '#1FDBFF',
      pregunta: 'Con v=12 m/s constante durante 5 s, ¿cuál es el desplazamiento (área bajo la curva)?',
      pista: 'Multiplicá la base (tiempo) por la altura (velocidad) de ese rectángulo.',
      correcta: '60 m', opciones: ['60 m', '12 m', '5 m', '17 m'] },
    { id: 'nivel6', puntos: [{ t: 0, y: 0 }, { t: 5, y: 30 }, { t: 8, y: 30 }, { t: 12, y: 0 }], yLabel: 'x (m)',
      pregunta: 'Considerando todo el recorrido (0 a 12s), ¿cuál es el desplazamiento neto final?',
      pista: 'Compará la posición inicial con la posición al final de todo el recorrido.',
      correcta: '0 m', opciones: ['0 m', '30 m', '60 m', '90 m'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Reconstruye el Viaje</h3>
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
     EXAMEN — banco real (js/data/banco-fix10-u05.js), 30 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U05 !== 'undefined') ? PREGUNTAS_FIX10_U05 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U05</h3>
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
     MISIÓN FINAL — "Caja Negra del Movimiento" (gráfica segmentada,
     3 intervalos, validación numérica + selección + texto)
     ================================================================ */
  const CAJA_PUNTOS = [{ t: 0, y: 0 }, { t: 4, y: 40 }, { t: 7, y: 40 }, { t: 11, y: 10 }];
  // I(0-4): +40m en 4s -> v=10 ; II(4-7): reposo ; III(7-11): -30m en 4s -> v=-7.5
  const CAJA_DIST_TOTAL = 40 + 0 + 30; // 70
  const CAJA_DESPL_NETO = 10 - 0; // posición final(10) - inicial(0) = 10
  const MISION_TEXTO_MIN = 25, MISION_TEXTO_MAX = 220;
  let _misionVals = { intervaloDetenido: '', distancia: '', desplazamiento: '', texto: '' };

  function _misionValida() {
    const dist = parseFloat(_misionVals.distancia);
    const despl = parseFloat(_misionVals.desplazamiento);
    if (_misionVals.intervaloDetenido !== 'II') return false;
    if (isNaN(dist) || Math.abs(dist - CAJA_DIST_TOTAL) > 2) return false;
    if (isNaN(despl) || Math.abs(despl - CAJA_DESPL_NETO) > 2) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_TEXTO_MIN && len <= MISION_TEXTO_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Caja Negra del Movimiento".</p></div>`;
    }
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>📼 Misión: Caja Negra del Movimiento</h3>
        <p style="color:var(--text-secondary)">Se recuperó este registro gráfico de un robot experimental de MQC:</p>
        ${_svgGrafica(CAJA_PUNTOS, { tMax: 11, yLabel: 'x (m)', marcasT: [0, 4, 7, 11] })}
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.8rem 0">
          A. ¿En qué intervalo el robot estuvo detenido?
          <select id="mision-intervalo" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
            <option value="">— Elegir —</option>
            <option value="I" ${_misionVals.intervaloDetenido === 'I' ? 'selected' : ''}>Intervalo I (0-4s)</option>
            <option value="II" ${_misionVals.intervaloDetenido === 'II' ? 'selected' : ''}>Intervalo II (4-7s)</option>
            <option value="III" ${_misionVals.intervaloDetenido === 'III' ? 'selected' : ''}>Intervalo III (7-11s)</option>
          </select>
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          B. Distancia TOTAL recorrida en todo el trayecto:
          <input type="number" id="mision-distancia" value="${_misionVals.distancia}" placeholder="m" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          C. Desplazamiento NETO (posición final − posición inicial):
          <input type="number" id="mision-desplazamiento" value="${_misionVals.desplazamiento}" placeholder="m" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
        </label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">
          D. Explicá brevemente qué le pasó al robot en los 3 intervalos:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_TEXTO_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_TEXTO_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_TEXTO_MAX} caracteres (mínimo ${MISION_TEXTO_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { intervaloDetenido: 'mision-intervalo', distancia: 'mision-distancia', desplazamiento: 'mision-desplazamiento', texto: 'mision-texto' };
    Object.keys(idMap).forEach(key => {
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
