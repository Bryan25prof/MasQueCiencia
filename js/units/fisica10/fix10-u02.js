/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u02.js
   FIX10-U02 — Cantidades escalares y vectoriales
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad II, Tema 2, apartados 2.1 a 2.3).
   Mismo patrón de plugin exacto que fix10-u01.js — apunta a
   Storage.updateFisica10Unit / markFisica10TopicRead / data.fisica10.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u02';
  const C = 'var(--violet)';

  const TEMAS = [
    { id: 't1', icon: '🔢', titulo: 'Escalar o vectorial',
      ideaClave: 'El número y la unidad no siempre describen completamente una cantidad física — a veces también hace falta saber hacia dónde.',
      explicacion: 'Toda cantidad física medible tiene una <strong>magnitud</strong>: un número con su unidad. Las <strong>cantidades escalares</strong> quedan completamente definidas solo con su magnitud (masa, temperatura, tiempo, distancia, rapidez). Las <strong>cantidades vectoriales</strong>, además de magnitud, tienen <strong>dirección</strong> y <strong>sentido</strong> (fuerza, desplazamiento, velocidad, aceleración).',
      ejemplo: 'Compará: <strong>"50 km"</strong> (alcanza con el número, es escalar) vs. <strong>"50 km al norte"</strong> (necesita también la dirección, es vectorial).',
      aplicacion: 'Errores frecuentes a evitar: pensar que toda cantidad con número es escalar (la velocidad también es un número, pero con dirección), y pensar que "velocidad" y "rapidez" significan lo mismo (no es así — lo vas a ver en el Tema 4).',
      compruebra: '¿"5 kg" es escalar o vectorial? ¿Y "30 N hacia arriba"?' },

    { id: 't2', icon: '➡️', titulo: 'Anatomía de un vector',
      ideaClave: 'Un vector se representa con una flecha: su longitud, su ángulo y hacia dónde apunta la punta cuentan una historia completa.',
      explicacion: 'Un vector se denota con una letra y una flecha arriba (A⃗, d⃗). Al dibujarlo en un plano cartesiano: la <strong>longitud</strong> de la flecha representa la magnitud (según una escala), la <strong>punta</strong> indica el sentido, y el <strong>ángulo</strong> respecto al eje +x (o a los puntos cardinales) representa la dirección.',
      ejemplo: 'Por ejemplo: <strong>F = 50 N, 35° sobre el eje +x</strong>. La flecha mediría 50 unidades de largo (a escala) y estaría girada 35° desde el eje horizontal.',
      aplicacion: 'Cuando corresponde, un vector también tiene un <strong>punto de aplicación</strong> (dónde "empieza" a actuar) — por ejemplo, el punto exacto donde se aplica una fuerza sobre un objeto.',
      compruebra: 'Si dibujaras un vector de 80 N a 0° (apuntando directo al Este), ¿cómo se vería su flecha respecto al eje horizontal?' },

    { id: 't3', icon: '🔀', titulo: 'Tipos de vectores',
      ideaClave: 'La forma en que varios vectores se relacionan entre sí también importa: no es lo mismo consecutivos, concurrentes u opuestos.',
      explicacion: 'Los vectores <strong>consecutivos</strong> empiezan uno justo donde terminó el anterior (como una ruta de desplazamientos). Los <strong>concurrentes</strong> parten de, o llegan a, un mismo punto (como varias fuerzas actuando sobre el mismo objeto). Los <strong>opuestos</strong> tienen la misma magnitud pero dirección contraria.',
      ejemplo: 'Una ruta "3 km al norte, luego 4 km al este" son vectores consecutivos. Tres cables que sostienen la misma lámpara desde el mismo gancho son concurrentes. Dos personas empujando una puerta desde lados exactamente opuestos son vectores opuestos.',
      aplicacion: 'Pregunta central para cualquier situación nueva: <strong>¿qué relación geométrica existe entre estos vectores?</strong> — no basta con memorizar las 3 definiciones, hay que poder reconocerlas en un diagrama real.',
      compruebra: 'Un dron vuela 100 m al este y luego 50 m al norte. ¿Qué tipo de vectores son esos dos tramos entre sí?' },

    { id: 't4', icon: '🚶', titulo: 'Distancia, desplazamiento, rapidez y velocidad',
      ideaClave: 'Distancia y desplazamiento NO son lo mismo. Rapidez y velocidad tampoco.',
      explicacion: 'La <strong>distancia</strong> es la longitud total recorrida a lo largo de la trayectoria — es un escalar. El <strong>desplazamiento</strong> es el cambio neto de posición (la línea recta entre el punto inicial y el final) — es un vector. La <strong>rapidez</strong> es distancia/tiempo — escalar. La <strong>velocidad media</strong> es desplazamiento/tiempo — vector, con la misma dirección que el desplazamiento.',
      ejemplo: 'Un recorrido de 100 m al Este, 100 m al Norte y 100 m al Oeste suma 300 m de <strong>distancia</strong> — pero el <strong>desplazamiento</strong> final (línea recta desde el inicio) es mucho menor, porque parte del camino "se cancela" en dirección.',
      aplicacion: 'Errores frecuentes: creer que "distancia = desplazamiento" siempre (falso: si volvés al punto de partida, la distancia recorrida NO es cero, aunque el desplazamiento sí lo sea), y creer que "rapidez = velocidad" (falso: una es escalar, la otra vectorial).',
      compruebra: 'Si corrés una vuelta completa a una pista circular y volvés exactamente a donde empezaste, ¿tu distancia recorrida es cero? ¿Y tu desplazamiento?' },

    { id: 't5', icon: '🧮', titulo: 'Componentes y resultante',
      ideaClave: 'Todo vector se puede "descomponer" en una parte horizontal y una vertical — y esa es la base para sumar vectores con precisión.',
      explicacion: 'En un plano cartesiano, cada vector tiene una <strong>componente en x</strong> (Vx = V·cos θ) y una <strong>componente en y</strong> (Vy = V·sen θ). El signo de Vx y Vy depende del <strong>cuadrante</strong> donde apunte el vector — no siempre son positivos. Para sumar varios vectores, se suman todas las componentes en x (ΣX) y todas en y (ΣY) por separado.',
      ejemplo: 'Con esas sumas: la <strong>magnitud</strong> de la resultante es R = √(ΣX² + ΣY²) (teorema de Pitágoras), y la <strong>dirección</strong> es θ = tan⁻¹(ΣY/ΣX) — pero ese ángulo hay que interpretarlo según el cuadrante real, no tomarlo solo como un número de la calculadora.',
      aplicacion: 'Este método es el que realmente se usa en ingeniería y en sistemas como el GPS — no depende de dibujar con precisión en papel, es puramente numérico y mucho más preciso que el método gráfico.',
      compruebra: 'Si ΣX resultó negativo y ΣY resultó positivo, ¿en qué cuadrante apunta el vector resultante?' },

    { id: 't6', icon: '📡', titulo: 'Vectores y GPS',
      ideaClave: 'El GPS no "sabe" tu posición por arte de magia — la calcula combinando mediciones escalares y resultados vectoriales.',
      explicacion: 'El GPS mide la <strong>distancia</strong> a varios satélites (triangulación: se necesitan al menos 4), usando el tiempo que tarda la señal en llegar. Con esas distancias, calcula tu <strong>posición</strong>, y comparando posiciones en el tiempo, obtiene tu <strong>desplazamiento</strong> — un vector real, con magnitud y dirección.',
      ejemplo: 'Así como sumaste vectores por componentes en el Tema 5, el GPS hace ese mismo cálculo (a mucha mayor velocidad) para convertir varias distancias medidas en una posición y un desplazamiento exactos.',
      aplicacion: 'El GPS no "sabe" tu posición de forma directa — la deduce geométricamente combinando varias mediciones de distancia. Sin esa base vectorial, no podría calcular ni tu ubicación ni hacia dónde te estás moviendo.',
      compruebra: '¿Por qué creés que un GPS necesita al menos 4 satélites, y no le alcanza con uno solo?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "Escalar o Vectorial": 10 cantidades para clasificar
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Un corredor recorrió 8 km durante el entrenamiento.', correcta: 'escalar', explica: 'Es escalar: solo importa la magnitud (8 km), no hacia dónde corrió.' },
    { texto: 'Un avión vuela a 900 km/h con rumbo Norte-Este.', correcta: 'vectorial', explica: 'Es vectorial: tiene magnitud (900 km/h) Y dirección (Norte-Este).' },
    { texto: 'La temperatura de un salón de clases es de 24 °C.', correcta: 'escalar', explica: 'Es escalar: la temperatura no tiene ninguna dirección asociada.' },
    { texto: 'Una grúa ejerce una fuerza de 5000 N hacia arriba sobre una carga.', correcta: 'vectorial', explica: 'Es vectorial: la fuerza siempre tiene una dirección (hacia arriba).' },
    { texto: 'El volumen de agua en una piscina es de 50 m³.', correcta: 'escalar', explica: 'Es escalar: el volumen no requiere ninguna dirección.' },
    { texto: 'Un ciclista se desplaza 2 km hacia el norte desde su casa.', correcta: 'vectorial', explica: 'Es vectorial: es un desplazamiento, con magnitud y dirección definidas.' },
    { texto: 'Una carrera de 100 metros planos dura 11 segundos.', correcta: 'escalar', explica: 'Es escalar: el tiempo no tiene ninguna dirección.' },
    { texto: 'Un satélite GPS orbita la Tierra a 20 000 km de altura.', correcta: 'escalar', explica: 'Es escalar: la altura es una distancia, sin dirección asociada en este contexto.' },
    { texto: 'La velocidad media de un auto en su viaje fue de 80 km/h hacia el este.', correcta: 'vectorial', explica: 'Es vectorial: la velocidad siempre incluye una dirección.' },
    { texto: 'El área de un terreno rectangular es de 300 m².', correcta: 'escalar', explica: 'Es escalar: el área es solo un número con su unidad, sin dirección.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 10 cantidades!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Cantidad ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-sim1-opcion="escalar">Escalar</button>
          <button class="btn btn-ghost" data-sim1-opcion="vectorial">Vectorial</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Tipos de vectores": 8 situaciones (consecutivos,
     concurrentes, opuestos)
     ================================================================ */
  const SITUACIONES_SIM2 = [
    { texto: 'Un excursionista camina 2 km al norte, y desde ahí, 3 km al este.', correcta: 'consecutivos', explica: 'Son consecutivos: el segundo tramo empieza justo donde terminó el primero.' },
    { texto: 'Dos personas tiran de una cuerda en direcciones opuestas con la misma fuerza.', correcta: 'opuestos', explica: 'Son opuestos: misma magnitud, dirección contraria.' },
    { texto: 'Tres cables sostienen una lámpara, todos anclados al mismo punto del techo.', correcta: 'concurrentes', explica: 'Son concurrentes: todos parten de (o llegan a) un mismo punto.' },
    { texto: 'Un dron vuela 100 m al este y luego 50 m al norte, sin regresar al punto de partida.', correcta: 'consecutivos', explica: 'Son consecutivos: cada tramo continúa desde donde terminó el anterior.' },
    { texto: 'Un tren avanza hacia el este mientras otro, en la vía paralela, avanza con la misma velocidad hacia el oeste.', correcta: 'opuestos', explica: 'Son opuestos: misma magnitud (velocidad), sentido contrario.' },
    { texto: 'Cuatro poleas tiran de una misma caja, cada una desde una esquina distinta.', correcta: 'concurrentes', explica: 'Son concurrentes: todas las fuerzas actúan sobre el mismo punto (la caja).' },
    { texto: 'Un barco navega 5 km al sur y luego, desde ahí, 2 km al oeste.', correcta: 'consecutivos', explica: 'Son consecutivos: el recorrido continúa tramo tras tramo.' },
    { texto: 'Dos imanes se repelen con fuerzas iguales mirando en direcciones opuestas.', correcta: 'opuestos', explica: 'Son opuestos: misma magnitud, direcciones contrarias.' }
  ];
  function renderSim2(idx) {
    if (idx >= SITUACIONES_SIM2.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 8 situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM2[idx];
    // Opciones mezcladas (regla explícita del sprint) — se fija una
    // sola vez por situación para no reordenar en cada render.
    if (!_sim2Opciones.length) {
      const base = ['consecutivos', 'concurrentes', 'opuestos'];
      for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
      _sim2Opciones = base;
    }
    const ETIQUETAS = { consecutivos: 'Consecutivos', concurrentes: 'Concurrentes', opuestos: 'Opuestos' };
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM2.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          ${_sim2Opciones.map(op => `<button class="btn btn-ghost" data-sim2-opcion="${op}">${ETIQUETAS[op]}</button>`).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;

  }

  /* ================================================================
     SIMULADOR 3 — VECTORLAB MQC (reemplaza la calculadora simple)
     ================================================================
     Modo EXPLORA: el estudiante mueve V (10-100) y θ (0-360°) con
     sliders, y ve el vector, Vx, Vy y el cuadrante actualizarse en
     vivo sobre un plano cartesiano SVG real — sin resolver nada por
     él, solo para descubrir relaciones (regla explícita del sprint).

     Modo DESAFÍO: MQC genera un problema, el estudiante ESCRIBE sus
     propios valores de Vx/Vy (o Rx/Ry/R/θ según el nivel) y recién
     al tocar "Comprobar" se valida con tolerancia — nunca se resuelve
     solo con "ingresar → calcular → respuesta completa" (regla
     explícita: "no hacer una calculadora que resuelva todo").
     ================================================================ */
  function _vxvy(V, thetaDeg) {
    const rad = thetaDeg * Math.PI / 180;
    return { vx: V * Math.cos(rad), vy: V * Math.sin(rad) };
  }
  function _cuadrante(vx, vy) {
    if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) return 'origen';
    if (vx >= 0 && vy >= 0) return 'I';
    if (vx < 0 && vy >= 0) return 'II';
    if (vx < 0 && vy < 0) return 'III';
    return 'IV';
  }
  function _svgVector(V, thetaDeg, color) {
    // viewBox 240x240, origen en el centro (120,120). Escala 1:1 (V de 10 a 100).
    const { vx, vy } = _vxvy(V, thetaDeg);
    const cx = 120, cy = 120;
    const px = cx + vx, py = cy - vy; // se invierte Y porque SVG crece hacia abajo
    const angRad = Math.atan2(-(py - cy), px - cx);
    const puntaLen = 10;
    const ang1 = angRad + Math.PI * 0.82, ang2 = angRad - Math.PI * 0.82;
    const p1x = px + puntaLen * Math.cos(ang1), p1y = py - puntaLen * Math.sin(ang1);
    const p2x = px + puntaLen * Math.cos(ang2), p2y = py - puntaLen * Math.sin(ang2);
    return `
      <svg viewBox="0 0 240 240" style="width:100%;max-width:280px;display:block;margin:0 auto;background:var(--bg-elevated);border-radius:12px">
        <line x1="0" y1="120" x2="240" y2="120" stroke="var(--border)" stroke-width="1"/>
        <line x1="120" y1="0" x2="120" y2="240" stroke="var(--border)" stroke-width="1"/>
        <text x="228" y="116" font-size="9" fill="var(--text-muted)">+X</text>
        <text x="124" y="12" font-size="9" fill="var(--text-muted)">+Y</text>
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${color}" stroke-width="3"/>
        <polygon points="${px},${py} ${p1x},${p1y} ${p2x},${p2y}" fill="${color}"/>
        <circle cx="${cx}" cy="${cy}" r="3" fill="var(--text-muted)"/>
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${cy}" stroke="var(--cyan)" stroke-width="1.5" stroke-dasharray="3,2"/>
        <line x1="${px}" y1="${cy}" x2="${px}" y2="${py}" stroke="var(--gold,#F9FF4D)" stroke-width="1.5" stroke-dasharray="3,2"/>
        <text x="${(cx+px)/2 - 8}" y="${cy - 6}" font-size="9" fill="var(--cyan)" font-weight="bold">Vx</text>
        <text x="${px + 6}" y="${(cy+py)/2}" font-size="9" fill="var(--gold,#F9FF4D)" font-weight="bold">Vy</text>
      </svg>`;
  }

  let _vlModo = 'explora'; // 'explora' | 'desafio'
  let _vlV = 50, _vlTheta = 35;
  let _vlNivel = 1;
  let _vlProblema = null;
  let _vlPrediccion = false;

  function renderSim3() {
    if (_vlModo === 'desafio') return _renderVLDesafio();
    return _renderVLExplora();
  }
  function _renderVLExplora() {
    const { vx, vy } = _vxvy(_vlV, _vlTheta);
    const cuad = _cuadrante(vx, vy);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🧭 VectorLab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés V y θ, y descubrís cómo cambian las componentes. Nadie resuelve nada por vos acá.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;align-items:start">
          <div>
            ${_svgVector(_vlV, _vlTheta, C)}
          </div>
          <div>
            <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Magnitud V = <strong style="color:${C}">${_vlV}</strong></label>
            <input type="range" id="vl-slider-v" min="10" max="100" step="1" value="${_vlV}" style="width:100%">
            <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Ángulo θ = <strong style="color:${C}">${_vlTheta}°</strong></label>
            <input type="range" id="vl-slider-theta" min="0" max="360" step="1" value="${_vlTheta}" style="width:100%">
            <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.7">
              Vx = V·cos θ = <strong style="color:var(--cyan)">${vx.toFixed(1)}</strong><br>
              Vy = V·sen θ = <strong style="color:var(--gold,#F9FF4D)">${vy.toFixed(1)}</strong><br>
              Cuadrante: <strong>${cuad}</strong>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" id="vl-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }

  const VL_NIVELES = [
    { nivel: 1, gen: () => ({ V: [30,40,50,60,80][Math.floor(Math.random()*5)], theta: [20,35,50,65][Math.floor(Math.random()*4)] }), desc: 'Nivel 1 — Primer cuadrante' },
    { nivel: 2, gen: () => ({ V: [40,60,80,100][Math.floor(Math.random()*4)], theta: [110,140,160,200,230,250,290,320,340][Math.floor(Math.random()*9)] }), desc: 'Nivel 2 — Otros cuadrantes' },
    { nivel: 3, gen: () => ({ suma: true, vectores: [{V:[30,40,50][Math.floor(Math.random()*3)], theta:[0,30,60][Math.floor(Math.random()*3)]}, {V:[40,60,80][Math.floor(Math.random()*3)], theta:[90,120,150][Math.floor(Math.random()*3)]}] }), desc: 'Nivel 3 — Suma de 2 vectores' },
    { nivel: 4, gen: () => ({ suma: true, vectores: [{V:300,theta:0}, {V:400,theta:90}, {V:[50,100,150][Math.floor(Math.random()*3)], theta:[180,270][Math.floor(Math.random()*2)]}] }), desc: 'Nivel 4 — Resultante de varios vectores' }
  ];
  const VL_TOLERANCIA = 1.5;

  function _generarProblema(nivel) {
    const def = VL_NIVELES[nivel - 1];
    const datos = def.gen();
    if (!datos.suma) {
      const { vx, vy } = _vxvy(datos.V, datos.theta);
      return { nivel, V: datos.V, theta: datos.theta, vx, vy };
    }
    let sx = 0, sy = 0;
    datos.vectores.forEach(v => { const c = _vxvy(v.V, v.theta); sx += c.vx; sy += c.vy; });
    return { nivel, vectores: datos.vectores, vx: sx, vy: sy };
  }

  function _renderVLDesafio() {
    if (!_vlProblema) _vlProblema = _generarProblema(_vlNivel);
    const p = _vlProblema;
    const esSuma = !!p.vectores;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="vl-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <h3 style="margin:0 0 .3rem">🧭 VectorLab MQC — Modo Desafío</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.6rem">${VL_NIVELES[_vlNivel-1].desc} (${_vlNivel}/4)</p>
        ${esSuma
          ? `<p style="margin-bottom:.8rem">${p.vectores.map((v,i) => `Vector ${i+1}: V = ${v.V}, θ = ${v.theta}°`).join(' &nbsp;|&nbsp; ')}</p>
             <p style="color:var(--text-secondary);font-size:.85rem">Calculá las componentes de la <strong>resultante</strong> (ΣX, ΣY).</p>`
          : `<p style="margin-bottom:.8rem">V = ${p.V} &nbsp;|&nbsp; θ = ${p.theta}°</p>
             <p style="color:var(--text-secondary);font-size:.85rem">Calculá Vx y Vy.</p>`}

        ${!_vlPrediccion ? `
          <div style="margin-top:.8rem">
            <p style="font-size:.82rem;color:var(--text-muted)">Antes de calcular: ¿en qué cuadrante creés que va a apuntar el vector? (predicción)</p>
            <div style="display:flex;gap:.4rem;flex-wrap:wrap">
              ${['I','II','III','IV'].map(q => `<button class="btn btn-ghost btn-sm" data-vl-prediccion="${q}">Cuadrante ${q}</button>`).join('')}
            </div>
          </div>
        ` : `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;max-width:360px;margin-top:.8rem">
            <label style="font-size:.8rem;color:var(--text-secondary)">${esSuma ? 'ΣX' : 'Vx'} = <input type="number" id="vl-input-x" step="0.1" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.4rem"></label>
            <label style="font-size:.8rem;color:var(--text-secondary)">${esSuma ? 'ΣY' : 'Vy'} = <input type="number" id="vl-input-y" step="0.1" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.4rem"></label>
          </div>
          <button class="btn btn-primary btn-sm" id="vl-comprobar" style="margin-top:1rem">Comprobar</button>
        `}
        <p id="vl-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  function bindSim3(unit) {
    // Modo Explora
    const sV = document.getElementById('vl-slider-v');
    const sT = document.getElementById('vl-slider-theta');
    if (sV) sV.addEventListener('input', () => { _vlV = parseInt(sV.value, 10); _rerenderSimTab(unit); });
    if (sT) sT.addEventListener('input', () => { _vlTheta = parseInt(sT.value, 10); _rerenderSimTab(unit); });
    const irDesafio = document.getElementById('vl-ir-desafio');
    if (irDesafio) irDesafio.addEventListener('click', () => { _vlModo = 'desafio'; _vlNivel = 1; _vlProblema = null; _vlPrediccion = false; _rerenderSimTab(unit); });
    const irExplora = document.getElementById('vl-ir-explora');
    if (irExplora) irExplora.addEventListener('click', () => { _vlModo = 'explora'; _rerenderSimTab(unit); });

    // Modo Desafío — predicción de cuadrante (no se califica, solo invita a pensar antes de calcular)
    document.querySelectorAll('[data-vl-prediccion]').forEach(btn => {
      btn.addEventListener('click', () => { _vlPrediccion = true; _rerenderSimTab(unit); });
    });
    const comprobar = document.getElementById('vl-comprobar');
    if (comprobar) comprobar.addEventListener('click', () => {
      const x = parseFloat(document.getElementById('vl-input-x').value);
      const y = parseFloat(document.getElementById('vl-input-y').value);
      const fb = document.getElementById('vl-feedback');
      if (isNaN(x) || isNaN(y)) { if (fb) { fb.style.color = 'var(--gold)'; fb.textContent = 'Completá los dos valores antes de comprobar.'; } return; }
      const okX = Math.abs(x - _vlProblema.vx) <= VL_TOLERANCIA;
      const okY = Math.abs(y - _vlProblema.vy) <= VL_TOLERANCIA;
      if (fb) {
        if (okX && okY) {
          fb.style.color = 'var(--green)';
          fb.innerHTML = `✅ ¡Correcto! (valor real: ${_vlProblema.vx.toFixed(1)}, ${_vlProblema.vy.toFixed(1)})`;
          setTimeout(() => {
            _vlNivel++;
            _vlProblema = null; _vlPrediccion = false;
            if (_vlNivel > VL_NIVELES.length) { markSimDone('sim3'); _vlModo = 'explora'; _vlNivel = 1; }
            _rerenderSimTab(unit);
          }, 1800);
        } else {
          fb.style.color = 'var(--gold)';
          fb.textContent = '💡 Todavía no coincide. Revisá los signos según el cuadrante, y volvé a intentar.';
        }
      }
    });
  }

  /* ── Helpers defensivos (mismo patrón que fix10-u01.js) ───────── */
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

  /* ================================================================
     TEORÍA — 6 temas en acordeón (mismo estilo que fix10-u01.js)
     ================================================================ */
  /* Mismo patrón definitivo aprobado en fix10-u01.js — fragmentación
     visual en 5 bloques cortos, sin agregar contenido nuevo. */
  function _bloqueTema(etiqueta, texto, color, esPregunta) {
    if (!texto) return '';
    return `
      <div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid ${color}">
        <p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:${color};margin:0 0 .25rem">${etiqueta}</p>
        <p style="margin:0;${esPregunta ? 'font-style:italic' : ''}">${texto}</p>
      </div>`;
  }

  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const total = TEMAS.length;
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
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.85rem;margin:0">Progreso: ${leidosCount}/${total} temas leídos</p>
        </div>
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
     SIMULADORES — mismo mecanismo que fix10-u01.js: markSimDone
     dedupe por diseño.
     ================================================================ */
  function markSimDone(simId) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP('simulator-done');
    }
  }
  let _simActivo = null;
  let _sim1Idx = 0, _sim2Idx = 0;
  let _sim2Opciones = [];

  function renderSimuladores(unit, uData) {
    if (_simActivo === 'sim1') return `<div class="sim-grid">${renderSim1(_sim1Idx)}</div>`;
    if (_simActivo === 'sim2') return `<div class="sim-grid">${renderSim2(_sim2Idx)}</div>`;
    if (_simActivo === 'sim3') return `<div class="sim-grid">${renderSim3()}</div>`;

    const hechos = uData.simsDone || [];
    const metas = [
      { id: 'sim1', titulo: '🔢 Escalar o Vectorial', desc: '10 cantidades reales para clasificar como escalares o vectoriales.' },
      { id: 'sim2', titulo: '➡️ Tipos de vectores', desc: '8 situaciones para identificar vectores consecutivos, concurrentes u opuestos.' },
      { id: 'sim3', titulo: '🧭 VectorLab MQC', desc: 'El simulador estrella: plano cartesiano interactivo, Modo Explora y Modo Desafío (4 niveles).' }
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
        _sim1Idx = 0; _sim2Idx = 0; _sim2Opciones = [];
        _vlModo = 'explora'; _vlNivel = 1; _vlProblema = null; _vlPrediccion = false;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => {
        markSimDone(btn.getAttribute('data-sim-cerrar'));
        _simActivo = null;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim1-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-sim1-opcion');
        const s = SITUACIONES_SIM1[_sim1Idx];
        const fb = document.getElementById('sim1-feedback');
        if (fb) {
          const ok = elegido === s.correcta;
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = (ok ? '✅ ' : '💡 ') + s.explica;
        }
        setTimeout(() => { _sim1Idx++; if (_sim1Idx >= SITUACIONES_SIM1.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1400);
      });
    });
    document.querySelectorAll('[data-sim2-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-sim2-opcion');
        const s = SITUACIONES_SIM2[_sim2Idx];
        const fb = document.getElementById('sim2-feedback');
        if (fb) {
          const ok = elegido === s.correcta;
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = (ok ? '✅ ' : '💡 ') + s.explica;
        }
        setTimeout(() => { _sim2Idx++; _sim2Opciones = []; if (_sim2Idx >= SITUACIONES_SIM2.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1400);
      });
    });
    bindSim3(unit);
  }


  /* ================================================================
     JUEGO — "Navegante Vectorial": 5 niveles verificables, mismo
     patrón exacto que el juego ya corregido de fix10-u01.js — fallar
     NO completa el nivel ni otorga XP (puede reintentar); acertar sí.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un excursionista recorre 10 km en su caminata, pero termina a solo 6 km en línea recta de donde partió.',
      pregunta: '¿Cuál de las dos cantidades depende únicamente del camino total recorrido (sin importar hacia dónde terminó)?',
      pista: 'Revisá qué cantidad depende únicamente del recorrido total, sin importar la dirección final.',
      correcta: 'La distancia (10 km)', opciones: ['La distancia (10 km)', 'El desplazamiento (10 km)', 'La velocidad (6 km)', 'Ninguna depende del recorrido'] },
    { id: 'nivel2', escenario: 'Un dron parte de un punto, vuela 200 m al Este y luego 150 m al Norte.',
      pregunta: '¿Qué tipo de vector representa la línea recta entre el punto de partida y el punto final del dron?',
      pista: 'Pensá en el vector que va directo del inicio al final, sin importar el camino real que siguió.',
      correcta: 'El desplazamiento', opciones: ['El desplazamiento', 'La distancia', 'La rapidez', 'El tiempo'] },
    { id: 'nivel3', escenario: 'Un vector apunta con componentes Vx = -40 y Vy = 30.',
      pregunta: '¿En qué cuadrante del plano cartesiano apunta ese vector?',
      pista: 'Revisá el signo de cada componente por separado antes de decidir el cuadrante.',
      correcta: 'Cuadrante II', opciones: ['Cuadrante II', 'Cuadrante I', 'Cuadrante III', 'Cuadrante IV'] },
    { id: 'nivel4', escenario: 'Un vector tiene magnitud V = 100 y ángulo θ = 180° (apunta directo al Oeste).',
      pregunta: '¿Cuáles son, aproximadamente, sus componentes Vx y Vy?',
      pista: 'Pensá en qué le pasa al coseno y al seno quando el ángulo es exactamente 180°.',
      correcta: 'Vx = -100, Vy = 0', opciones: ['Vx = -100, Vy = 0', 'Vx = 100, Vy = 0', 'Vx = 0, Vy = -100', 'Vx = 0, Vy = 100'] },
    { id: 'nivel5', escenario: 'Un GPS combina dos desplazamientos: 300 m al Este y 400 m al Norte, para calcular la posición final.',
      pregunta: '¿Cuál es la magnitud del vector resultante de esos dos desplazamientos?',
      pista: 'Aplicá el teorema de Pitágoras con esas dos componentes perpendiculares entre sí.',
      correcta: '500 m', opciones: ['500 m', '700 m', '100 m', '600 m'] }
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
        <h3>🧭 Misión: Navegante Vectorial</h3>
        <p style="color:var(--text-secondary);font-size:.85rem">Un GPS debe guiar al usuario a distintos destinos. Resolvé cada nivel para avanzar.</p>
        <div style="display:grid;gap:.8rem;margin-top:1rem">
          ${NIVELES_JUEGO.map((n, i) => `
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem">
              <p style="margin:0 0 .4rem"><strong>Nivel ${i+1}:</strong> ${n.escenario}</p>
              ${nivelesHechos.includes(n.id) ? `<p style="color:var(--green);font-size:.85rem;margin-top:.4rem">✅ ${n.correcta}</p>` : `<button class="btn btn-primary btn-sm" data-nivel="${n.id}">Resolver</button>`}
            </div>
          `).join('')}
        </div>
      </div>`;
  }
  function _mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
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
     EXAMEN — banco real (js/data/banco-fix10-u02.js)
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U02 !== 'undefined') ? PREGUNTAS_FIX10_U02 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U02</h3>
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
     MISIÓN FINAL — "Ruta de Rescate": un equipo de rescate recorre
     300 m Este, 250 m Norte y 150 m Oeste. El estudiante calcula
     distancia total, componentes, magnitud y dirección del
     desplazamiento resultante, con validación numérica por
     tolerancia (±0.5 en distancias/magnitud, ±2° en dirección) —
     nunca coincidencia textual exacta. Botón deshabilitado hasta
     completar y acertar todo, mismo patrón exacto que fix10-u01.js.
     ================================================================ */
  const RESCATE_TRAMOS = [{ d: 300, ang: 0, texto: '300 m Este' }, { d: 250, ang: 90, texto: '250 m Norte' }, { d: 150, ang: 180, texto: '150 m Oeste' }];
  const RESCATE_DIST_TOTAL = RESCATE_TRAMOS.reduce((acc, t) => acc + t.d, 0); // 700 m
  const RESCATE_RESULTANTE = (() => {
    let sx = 0, sy = 0;
    RESCATE_TRAMOS.forEach(t => { const r = t.ang * Math.PI / 180; sx += t.d * Math.cos(r); sy += t.d * Math.sin(r); });
    return { sx, sy, mag: Math.sqrt(sx * sx + sy * sy), dir: Math.atan2(sy, sx) * 180 / Math.PI };
  })();
  const RESCATE_TOL_DIST = 0.5, RESCATE_TOL_ANG = 2;

  let _rescateVals = { distTotal: '', sx: '', sy: '', mag: '', dir: '' };

  function _rescateValida() {
    const d = parseFloat(_rescateVals.distTotal);
    const sx = parseFloat(_rescateVals.sx);
    const sy = parseFloat(_rescateVals.sy);
    const m = parseFloat(_rescateVals.mag);
    const dir = parseFloat(_rescateVals.dir);
    if ([d, sx, sy, m, dir].some(isNaN)) return false;
    return Math.abs(d - RESCATE_DIST_TOTAL) <= RESCATE_TOL_DIST
      && Math.abs(sx - RESCATE_RESULTANTE.sx) <= RESCATE_TOL_DIST
      && Math.abs(sy - RESCATE_RESULTANTE.sy) <= RESCATE_TOL_DIST
      && Math.abs(m - RESCATE_RESULTANTE.mag) <= RESCATE_TOL_DIST
      && Math.abs(dir - RESCATE_RESULTANTE.dir) <= RESCATE_TOL_ANG;
  }

  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Ruta de Rescate".</p></div>`;
    }
    const campo = (label, key, unidad) => `
      <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.8rem">
        ${label}
        <input type="number" step="0.1" id="rescate-${key}" value="${_rescateVals[key]}"
               style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem">
        <span style="color:var(--text-muted);font-size:.72rem">${unidad}</span>
      </label>`;
    return `
      <div style="max-width:520px">
        <h3>🧭 Misión: Ruta de Rescate</h3>
        <p style="color:var(--text-secondary)">Un equipo de rescate recorre, en este orden: <strong>${RESCATE_TRAMOS.map(t => t.texto).join(', ')}</strong>.</p>
        ${campo('A. Distancia total recorrida (suma de los 3 tramos)', 'distTotal', 'm')}
        ${campo('B1. Componente ΣX del desplazamiento resultante', 'sx', 'm')}
        ${campo('B2. Componente ΣY del desplazamiento resultante', 'sy', 'm')}
        ${campo('C. Magnitud del desplazamiento resultante', 'mag', 'm')}
        ${campo('D. Dirección del desplazamiento resultante (ángulo respecto al Este)', 'dir', '°')}
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_rescateValida() ? '' : 'disabled'} style="${_rescateValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    ['distTotal', 'sx', 'sy', 'mag', 'dir'].forEach(key => {
      const input = document.getElementById(`rescate-${key}`);
      if (input) input.addEventListener('input', () => {
        _rescateVals[key] = input.value;
        const btn = document.getElementById('fix10-entregar-mision');
        if (btn) {
          const valido = _rescateValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    });
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_rescateValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguno de los valores.';
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
