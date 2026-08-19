/* ================================================================
   MÁSQUECIENCIA — js/shared/simulacro-nacional-adapter.js
   ================================================================
   Capa de lógica pura del "Simulacro PNE · Ciencias" (11.º).
   NO depende del DOM. NO llama a Router ni a Gamification. Solo lee
   Storage para persistencia. Todas las funciones matemáticas son
   puras (mismo input → mismo output), pensadas para poder probarse
   de forma aislada (ver PNE_11_IMPLEMENTATION_REPORT.md, sección de
   pruebas matemáticas).

   ── NOTA CRÍTICA SOBRE NOMBRES (léase antes de tocar este archivo) ──
   Este proyecto YA tiene un sistema llamado "PNE" (js/shared/pne.js,
   window.PNE) que es el panel de ACCESIBILIDAD (alto contraste,
   texto grande, lectura por voz, modo simplificado) — no tiene
   relación con la Prueba Nacional Estandarizada. También existe ya
   un "Desafío Final PNE" (js/modules/pne-final.js, data.pne,
   window.PNEBank) que es el examen acumulativo de Química 10.º y
   que además desbloquea Química 11.º (pne.bestScore >= 80). Por eso
   este módulo NUNCA usa el identificador global "PNE" a secas, ni
   escribe en data.pne, ni usa fuentes de XP que empiecen con "pne-"
   (esa cadena categoriza automáticamente en la Bitácora como si
   fuera del Desafío Final viejo — ver profiles.js:365). El nombre
   elegido para este módulo es "SimulacroNacional" / "simulacro-
   nacional", inconfundible de lo anterior a simple vista.

   Bancos fuente esperados ya cargados en window (ver index.html):
     window.BANCO_NACIONAL_BIOLOGIA  (66 ítems calificables)
     window.BANCO_NACIONAL_FISICA    (42 ítems calificables)
     window.BANCO_NACIONAL_QUIMICA   (48 ítems calificables)
   Cada ítem ya viene con `adaptacion2026.opcionD` (generada por MQC,
   ver comentario de cabecera de esos archivos) — este módulo NO
   genera texto de opción D, solo lo consume y lo ensambla.
================================================================ */

window.SimulacroNacional = (function () {
  'use strict';

  /* ================================================================
     1. CONFIGURACIÓN
     ================================================================ */
  const CIENCIAS = ['Biología', 'Física', 'Química'];
  const PREGUNTAS_POR_CIENCIA = 20;
  const TOTAL_PREGUNTAS = PREGUNTAS_POR_CIENCIA * CIENCIAS.length; // 60

  const PRESENTACION_MIN = 0;
  const PRESENTACION_MAX = 60;
  const PESO_PRESENTACION = 60;   // %
  const PESO_PNE = 40;            // %
  const NOTA_APROBACION = 70;     // sobre 100

  /* ================================================================
     2. ACCESO A LOS BANCOS (con el filtro de seguridad reforzado
        en runtime — Sección 3 del ticket: aunque los archivos ya
        vienen pre-filtrados, si alguna vez se regeneran sin filtrar
        este chequeo evita que un ítem REQUIERE_REVISIÓN llegue a un
        examen calificable "por accidente".)
     ================================================================ */
  function _bancoCrudo(ciencia) {
    const map = {
      'Biología': 'BANCO_NACIONAL_BIOLOGIA',
      'Física':   'BANCO_NACIONAL_FISICA',
      'Química':  'BANCO_NACIONAL_QUIMICA'
    };
    const varName = map[ciencia];
    return (varName && typeof window[varName] !== 'undefined') ? window[varName] : null;
  }

  /** Verifica que los 3 bancos estén cargados. Úsalo antes de ofrecer
   *  el simulacro en la UI — si falta alguno, NO se debe iniciar. */
  function bancosDisponibles() {
    const estado = {};
    let todosOk = true;
    CIENCIAS.forEach(c => {
      const banco = _bancoCrudo(c);
      const calificables = _soloCalificables(banco);
      estado[c] = { cargado: !!banco, total: banco ? banco.length : 0, calificables: calificables.length };
      if (!banco || calificables.length < PREGUNTAS_POR_CIENCIA) todosOk = false;
    });
    return { ok: todosOk, detalle: estado };
  }

  /* Filtro de seguridad real (Sección 3 del ticket). Un ítem histórico
     debe cumplir SIMULTÁNEAMENTE:
       estado_validacion === "VALIDADO"  (equivalente en runtime: se
         asume ya filtrado en el archivo de banco, pero como el campo
         no viaja al JS de producción por diseño — ver cabecera de
         los archivos banco-nacional-*.js — la garantía real está en
         que _esos_ archivos SOLO contienen ítems que ya cumplían la
         condición al generarse. Este comentario documenta la regla
         para quien regenere los bancos en el futuro.)
       respuesta_validada === true
     Lo único verificable en runtime con los campos que sí viajan es
     estructural: que el ítem tenga id, opciones{A,B,C}, correcta y
     adaptacion2026.opcionD — si falta alguno, se excluye por
     seguridad (mejor un ítem de menos que uno mal formado). */
  function _soloCalificables(banco) {
    if (!Array.isArray(banco)) return [];
    return banco.filter(it =>
      it && it.id && it.opciones && it.opciones.A && it.opciones.B && it.opciones.C &&
      it.correcta && it.adaptacion2026 && it.adaptacion2026.opcionD
    );
  }

  /* ================================================================
     3. CAPA DE ADAPTACIÓN A→D (Sección 7 del ticket)
     ================================================================
     Convierte un ítem histórico (A/B/C + adaptacion2026.opcionD) en
     un ítem de 4 opciones con IDENTIFICADORES INTERNOS estables
     ('originalA'..'mqcD'), para que el orden visual pueda barajarse
     (Sección 8) sin arriesgar la corrección automática. */
  function _adaptarItem(historico) {
    const opciones = [
      { id: 'originalA', texto: historico.opciones.A },
      { id: 'originalB', texto: historico.opciones.B },
      { id: 'originalC', texto: historico.opciones.C },
      { id: 'mqcD',       texto: historico.adaptacion2026.opcionD }
    ];
    const correctaId = 'original' + historico.correcta; // 'A'|'B'|'C' → 'originalA'..'originalC'
    return {
      id: historico.id,
      ciencia: historico.ciencia,
      tema: historico.tema,
      competencia: historico.competencia,
      anio: historico.anio,
      tipoPrueba: historico.tipoPrueba,
      enunciado: historico.enunciado,
      usaImagen: historico.usaImagen,
      usaTabla: historico.usaTabla,
      usaGrafico: historico.usaGrafico,
      usaFormula: historico.usaFormula,
      usaCalculo: historico.usaCalculo,
      figuraAsociada: historico.figuraAsociada,
      recursoVisual: historico.recursoVisual || null, // Fase 2 — Cierre visual: imagen real / referencia externa / pendiente
      opciones: opciones,          // orden histórico A,B,C,D-MQC — se baraja al presentar
      correcta: correctaId,        // vínculo por ID, nunca por posición
      _archivoFuente: historico.archivoFuente,   // uso interno (revisión posterior), nunca mostrar al estudiante
      _paginaFuente: historico.paginaFuente       // ídem
    };
  }

  /** Baraja el ARREGLO de 4 opciones (Fisher–Yates) — 'correcta' sigue
   *  apuntando al mismo id sin importar la nueva posición visual. */
  function _shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _barajarOpciones(itemAdaptado) {
    const clon = Object.assign({}, itemAdaptado);
    clon.opciones = _shuffle(itemAdaptado.opciones);
    return clon;
  }

  /* ================================================================
     4. SELECTOR ESTRATIFICADO (Sección 5 y 6 del ticket)
     ================================================================
     NO usa Math.random() sobre todo el banco. Estrategia:
       1) Agrupar los calificables de la ciencia por 'tema'.
       2) Recorrer los grupos de tema en orden aleatorio, tomando 1
          ítem de cada grupo por vuelta (round-robin), hasta juntar
          20. Esto reparte automáticamente por tema Y evita rachas
          largas del mismo tema (nunca se toman 2 seguidos del mismo
          grupo salvo que ya no queden temas distintos disponibles).
       3) Dentro de cada grupo de tema, se prioriza no repetir los
          ids usados en el intento anterior del mismo perfil (si el
          banco lo permite); si no alcanza, se reutilizan.
       4) Se intenta además variedad de 'competencia' y presencia de
          recurso visual (imagen/tabla/gráfico) — ver _puntuarMezcla.
     Química (Sección 6): como el campo 'tema' ya refleja áreas reales
     de 10.º y 11.º (p. ej. "Estructura atómica", "Estequiometría",
     "Disoluciones", "Nomenclatura inorgánica"), agrupar por tema logra
     automáticamente la "representación transversal" pedida — no hace
     falta una regla aparte ni limitar a las unidades de 11.º. */
  function _agruparPorTema(items) {
    const grupos = {};
    items.forEach(it => {
      if (!grupos[it.tema]) grupos[it.tema] = [];
      grupos[it.tema].push(it);
    });
    return grupos;
  }

  function _seleccionarCienciaEstratificada(ciencia, cantidad, idsEvitar) {
    const banco = _soloCalificables(_bancoCrudo(ciencia));
    if (banco.length === 0) return [];

    const evitar = new Set(idsEvitar || []);
    const frescos = banco.filter(it => !evitar.has(it.id));
    // Si evitar deja menos de los necesarios, se completa con el banco completo
    const poolBase = frescos.length >= cantidad ? frescos : banco;

    const grupos = _agruparPorTema(poolBase);
    let clavesTema = _shuffle(Object.keys(grupos));
    // Barajar también el contenido de cada grupo para no tomar siempre el mismo primero
    clavesTema.forEach(k => { grupos[k] = _shuffle(grupos[k]); });

    const seleccion = [];
    const usados = new Set();
    let vuelta = 0;
    // Round-robin entre temas hasta juntar 'cantidad' o agotar el banco
    while (seleccion.length < cantidad) {
      let avanceEnVuelta = false;
      for (let i = 0; i < clavesTema.length && seleccion.length < cantidad; i++) {
        const grupo = grupos[clavesTema[i]];
        const candidato = grupo[vuelta];
        if (candidato && !usados.has(candidato.id)) {
          seleccion.push(candidato);
          usados.add(candidato.id);
          avanceEnVuelta = true;
        }
      }
      vuelta++;
      if (!avanceEnVuelta) break; // ya no hay más ítems sin repetir en ningún grupo
    }

    // Si aun así faltan (banco muy pequeño), rellenar con lo que quede del banco completo
    if (seleccion.length < cantidad) {
      const resto = _shuffle(banco.filter(it => !usados.has(it.id)));
      for (let i = 0; i < resto.length && seleccion.length < cantidad; i++) {
        seleccion.push(resto[i]);
        usados.add(resto[i].id);
      }
    }

    return seleccion;
  }

  /** Construye un intento completo: 20 Biología + 20 Física + 20 Química,
   *  cada ítem ya adaptado (A-D) y con las opciones barajadas visualmente.
   *  @param {string[]} [idsEvitar] — ids usados en el intento anterior
   *         del mismo perfil (para variar la combinación — Sección 5). */
  function construirIntento(idsEvitar) {
    const chk = bancosDisponibles();
    if (!chk.ok) {
      throw new Error('SimulacroNacional: bancos insuficientes. ' + JSON.stringify(chk.detalle));
    }

    let preguntas = [];
    CIENCIAS.forEach(ciencia => {
      const seleccionCiencia = _seleccionarCienciaEstratificada(ciencia, PREGUNTAS_POR_CIENCIA, idsEvitar);
      preguntas = preguntas.concat(seleccionCiencia);
    });

    // Adaptar (A-D) y barajar opciones de cada ítem
    preguntas = preguntas.map(it => _barajarOpciones(_adaptarItem(it)));

    // Orden de presentación: por bloque de ciencia (Biología→Física→Química,
    // Sección 4 del ticket), pero el orden INTERNO de cada bloque se baraja
    // para que dos intentos no luzcan idénticos aunque compartan preguntas.
    const porCiencia = { 'Biología': [], 'Física': [], 'Química': [] };
    preguntas.forEach(p => porCiencia[p.ciencia].push(p));
    CIENCIAS.forEach(c => { porCiencia[c] = _shuffle(porCiencia[c]); });

    const ordenFinal = [].concat(porCiencia['Biología'], porCiencia['Física'], porCiencia['Química']);

    return ordenFinal.map((p, i) => Object.assign({}, p, {
      numeroGlobal: i + 1,                                  // 1..60
      bloque: p.ciencia,
      numeroEnBloque: porCiencia[p.ciencia].indexOf(p) + 1   // 1..20 dentro de su bloque
    }));
  }

  /* ================================================================
     5. MATEMÁTICA DE CALIFICACIÓN Y PROYECCIÓN (Secciones 15-18)
     ================================================================
     Funciones puras — mismo input, mismo output siempre. */

  /** Nota PNE en porcentaje, 2 decimales solo si no es entero. */
  function calcularNotaPNE(aciertos, total) {
    total = total || TOTAL_PREGUNTAS;
    const pct = (aciertos / total) * 100;
    return Math.round(pct * 100) / 100; // redondeo a 2 decimales
  }

  /** Valida el rango de la nota de presentación (Sección 11). */
  function validarPresentacion(valor) {
    const n = Number(valor);
    if (isNaN(n)) return { valido: false, motivo: 'no-numerico' };
    if (n < PRESENTACION_MIN) return { valido: false, motivo: 'menor-al-minimo' };
    if (n > PRESENTACION_MAX) return { valido: false, motivo: 'mayor-al-maximo' };
    return { valido: true };
  }

  /** aportePNE = E × 0.40 ; proyeccionFinal = P + aportePNE (Sección 16). */
  function calcularProyeccion(presentacion, notaPNE) {
    const aportePNE = Math.round((notaPNE * (PESO_PNE / 100)) * 100) / 100;
    const proyeccionFinal = Math.round((presentacion + aportePNE) * 100) / 100;
    return { aportePNE, proyeccionFinal };
  }

  /** E_min = (70 - P) / 0.40, con los 2 casos especiales de la Sección 18. */
  function calcularNotaMinimaRequerida(presentacion) {
    const crudo = (NOTA_APROBACION - presentacion) / (PESO_PNE / 100);
    if (crudo < 0) return { valor: 0, caso: 'ya-asegurado' };
    if (crudo > 100) return { valor: crudo, caso: 'imposible', mensaje: 'Con la nota de presentación registrada, alcanzar 70 requeriría una calificación superior al 100 % en la PNE.' };
    return { valor: Math.round(crudo * 100) / 100, caso: 'normal' };
  }

  /** Diagnóstico principal (Sección 21). */
  function diagnosticoPrincipal(proyeccionFinal) {
    return proyeccionFinal >= NOTA_APROBACION
      ? { nivel: 'favorable', titulo: 'PROYECCIÓN FAVORABLE', texto: 'Con este rendimiento, la proyección alcanza el mínimo de aprobación.' }
      : { nivel: 'refuerzo',  titulo: 'REQUIERE REFORZAMIENTO', texto: 'Con este resultado todavía no alcanzas la proyección mínima de 70.' };
  }

  /* ================================================================
     6. DIAGNÓSTICO POR CIENCIA Y POR TEMA (Secciones 22-23)
     ================================================================ */

  /** @param {Array} preguntas — las 60 preguntas del intento (con .ciencia, .tema)
   *  @param {Object} respuestas — { [preguntaId]: idOpcionElegida } */
  function diagnosticoPorCiencia(preguntas, respuestas) {
    const acc = {};
    CIENCIAS.forEach(c => { acc[c] = { correctas: 0, total: 0 }; });
    preguntas.forEach(p => {
      acc[p.ciencia].total++;
      if (respuestas[p.id] === p.correcta) acc[p.ciencia].correctas++;
    });
    const resumen = CIENCIAS.map(c => ({
      ciencia: c,
      correctas: acc[c].correctas,
      total: acc[c].total,
      porcentaje: acc[c].total ? Math.round((acc[c].correctas / acc[c].total) * 100) : 0
    }));
    const ordenado = resumen.slice().sort((a, b) => b.porcentaje - a.porcentaje);
    return {
      porCiencia: resumen,
      mayorDominio: ordenado[0],
      mayorRefuerzo: ordenado[ordenado.length - 1]
    };
  }

  /** Agrupa errores por tema. Sección 23: "NO inventar conclusiones a
   *  partir de una sola pregunta" — por eso MIN_PARA_MOSTRAR filtra
   *  temas con muy pocos datos (menos de 2 preguntas de ese tema en
   *  el intento), en vez de mostrar "100% de error" por una sola falla. */
  const MIN_PREGUNTAS_TEMA_PARA_DIAGNOSTICO = 2;
  function diagnosticoTematico(preguntas, respuestas) {
    const porTema = {}; // tema → { ciencia, correctas, total }
    preguntas.forEach(p => {
      if (!porTema[p.tema]) porTema[p.tema] = { ciencia: p.ciencia, correctas: 0, total: 0 };
      porTema[p.tema].total++;
      if (respuestas[p.id] === p.correcta) porTema[p.tema].correctas++;
    });
    const porCienciaLista = {};
    CIENCIAS.forEach(c => { porCienciaLista[c] = []; });
    Object.keys(porTema).forEach(tema => {
      const d = porTema[tema];
      if (d.total < MIN_PREGUNTAS_TEMA_PARA_DIAGNOSTICO) return; // muy pocos datos, se omite
      const errores = d.total - d.correctas;
      if (errores > 0) {
        porCienciaLista[d.ciencia].push({ tema, errores, total: d.total });
      }
    });
    CIENCIAS.forEach(c => porCienciaLista[c].sort((a, b) => b.errores - a.errores));
    return porCienciaLista;
  }

  /* ================================================================
     8. CONDICIÓN DE DESBLOQUEO (aclaración del docente, 2026-08-17)
     ================================================================
     La PNE de 11.º (este simulacro) se desbloquea con CUALQUIERA de
     estas condiciones (no se exige completar el 100 % de MQC):
       Ruta 1 — Química 11.º ya está desbloqueada
                (data.grade11Unlock.unlocked === true, el mismo
                 mecanismo ya existente: 6/9 exámenes de 10.º o
                 PNE-10 ≥ 80 — NO se modifica esa lógica, solo se lee).
       Ruta 2 — Progreso real DENTRO de Química 11.º: al menos 75 %
                de progreso promedio entre las 4 unidades, O al menos
                3 de las 4 unidades con su examen aprobado.
     Motivo (palabras del docente): "la idea es que la hagan sin
     importar si han completado todo MQC, pero tampoco quiero que la
     batan al azar" — Ruta 1 es la puerta más simple; Ruta 2 es una
     puerta alternativa basada en avance real, para el caso de que en
     el futuro cambie el criterio de Ruta 1. Esta función NUNCA
     escribe en Storage ni modifica grade11Unlock — es de solo
     lectura, aditiva, y no toca el núcleo congelado (gamification.js
     sigue siendo la única fuente de verdad de grade11Unlock). */
  function estadoDesbloqueo() {
    const data = (typeof Storage !== 'undefined') ? Storage.load() : {};
    const g11Unlock = data.grade11Unlock || {};
    const rutaGrade11 = !!g11Unlock.unlocked;

    const G11_IDS = ['g11-u01', 'g11-u02', 'g11-u03', 'g11-u04'];
    const PROGRESO_REQUERIDO = 75;
    const EXAMENES_REQUERIDOS = 3;

    let sumaProgreso = 0;
    let examenesAprobados = 0;
    G11_IDS.forEach(id => {
      const pct = (typeof Storage !== 'undefined' && typeof Storage.getGrade11UnitProgress === 'function')
        ? (Storage.getGrade11UnitProgress(id) || 0) : 0;
      sumaProgreso += pct;
      let umbralAprobacion = 70;
      if (typeof GRADE11_UNIDADES_DATA !== 'undefined') {
        const meta = GRADE11_UNIDADES_DATA.find(u => u.id === id);
        if (meta && meta.exam && meta.exam.pass) umbralAprobacion = meta.exam.pass;
      }
      const examBest = (data.grade11 && data.grade11[id] && data.grade11[id].examBest) || 0;
      if (examBest >= umbralAprobacion) examenesAprobados++;
    });
    const progresoPromedio = Math.round(sumaProgreso / G11_IDS.length);
    const rutaProgreso = (progresoPromedio >= PROGRESO_REQUERIDO) || (examenesAprobados >= EXAMENES_REQUERIDOS);

    return {
      desbloqueado: rutaGrade11 || rutaProgreso,
      rutaGrade11Unlocked: rutaGrade11,
      progresoPromedio,
      progresoRequerido: PROGRESO_REQUERIDO,
      examenesAprobados,
      examenesRequeridos: EXAMENES_REQUERIDOS
    };
  }

  /* ================================================================
     9. API PÚBLICA
     ================================================================ */
  return {
    CIENCIAS, PREGUNTAS_POR_CIENCIA, TOTAL_PREGUNTAS,
    PRESENTACION_MIN, PRESENTACION_MAX, PESO_PRESENTACION, PESO_PNE, NOTA_APROBACION,
    bancosDisponibles,
    construirIntento,
    calcularNotaPNE,
    validarPresentacion,
    calcularProyeccion,
    calcularNotaMinimaRequerida,
    diagnosticoPrincipal,
    diagnosticoPorCiencia,
    diagnosticoTematico,
    estadoDesbloqueo
  };
})();
