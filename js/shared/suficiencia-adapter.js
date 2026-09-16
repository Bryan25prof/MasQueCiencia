/* ================================================================
   MÁSQUECIENCIA — js/shared/suficiencia-adapter.js
   ================================================================
   Capa de lógica pura del "Examen de Suficiencia" — Fase 2 (Finales/
   Suficiencia, priorizado por Bryan después del Lote 3 de fragmentación).
   NO depende del DOM. NO llama a Router ni a Gamification. Solo lee
   los bancos de preguntas ya cargados en window/global. Motor ÚNICO
   y genérico reutilizado por los 4 cursos (Química 10.º, Química
   11.º, Física 10.º, Física 11.º) — se parametriza por `curso`, no se
   duplica 4 veces.

   ── DECISIONES DE PRODUCTO CONFIRMADAS POR BRYAN (2026-09-15) ──
   1. Se construye para los 4 cursos a la vez, no un piloto.
   2. Aprobar NO otorga XP, NO desbloquea nada, NO marca ninguna
      unidad como completada — el único efecto es una credencial
      visible: "DOMINIO ACREDITADO POR SUFICIENCIA", guardada en
      data.suficiencia.<curso> (clave aislada, ver storage.js).
      Este archivo es de SOLO LECTURA sobre los bancos de preguntas:
      nunca escribe en Storage (eso lo hace js/modules/suficiencia.js).
   3. El estado de acreditación se sincroniza a Supabase para
      aparecer en "Seguimiento académico" del panel docente (ver
      SUPABASE_MIGRATION_suficiencia.sql y analytics-hooks.js).

   ── NOTA CRÍTICA SOBRE LOS BANCOS DE PREGUNTAS (léase antes de
      tocar este archivo) ──
   Los 4 cursos NO comparten ni una convención de nombres de variable
   global, ni una forma de "unidad" dentro de cada ítem:
     - Química 10.º:  window.PREGUNTAS_U01..U09   — item.unidad = 1..9 (número)
     - Química 11.º:  window.PREGUNTAS_G11_U01..U04 — item.unidad = 'g11-u01'..'g11-u04' (string)
     - Física 10.º:   PREGUNTAS_FIX10_U01..U08    — SIN campo item.unidad (cada
                       archivo YA es una sola unidad); son `const` de nivel de
                       script, NO `window.X` (una `const` de nivel superior en
                       un <script> no-módulo NO se cuelga de `window` — verificado
                       con Playwright real durante la Fase 2 de esta auditoría).
                       Por eso aquí se referencian como identificador suelto
                       (mismo scope global de script), nunca como window[...].
     - Física 11.º:   PREGUNTAS_FIX11_U01..U06    — igual que Física 10.º.
   Todos los 4 cursos SÍ comparten la misma convención de `correcta`
   (índice 0-based dentro de `opciones`) — no hace falta ninguna
   adaptación de letras A/B/C/D como en el Simulacro PNE nacional.
   La explicación sí difiere: Química 10.º/11.º traen
   `explicacion_correcta` + `explicacion_incorrectas[]` (una por cada
   opción, en el orden original); Física 10.º/11.º traen una única
   `explicacion` (se muestra siempre, sin importar si acertó o no).
   Este archivo normaliza ambos esquemas a la salida de _adaptarItem().
================================================================ */

window.SuficienciaEngine = (function () {
  'use strict';

  const CANTIDAD_PREGUNTAS   = 20;
  const ACIERTOS_APROBACION  = 14; // 14/20 = 70%

  /* ================================================================
     1. UTILIDADES GENÉRICAS
     ================================================================
     AUDITORÍA FASE 2 — "Motor de examen unificado": el barajado
     Fisher–Yates y la selección round-robin estratificada (agrupar
     por unidad, evitar repetir el intento anterior) ya no se duplican
     acá — viven una sola vez en js/shared/exam-engine.js, compartidos
     con el Simulacro Nacional. El barajado de OPCIONES además pasó a
     usar el patrón de ID ESTABLE por opción (el mismo que ya usaba el
     Simulacro PNE): cada opción se etiqueta con un id fijo ANTES de
     barajar, así que `correcta` nunca necesita "recalcularse" después
     — apunta siempre al mismo id, sin importar el orden visual. */
  function _seleccionarEstratificado(pool, cantidad, idsEvitar) {
    return ExamEngine.seleccionarEstratificado(pool, cantidad, idsEvitar, it => it._unidadId);
  }

  /** Adapta un ítem crudo (cualquiera de los 4 formatos) a la forma
   *  única que consume la UI: opciones con ID estable, `correcta`
   *  como ese id (nunca un índice posicional), explicación normalizada. */
  function _adaptarItem(raw) {
    const { opciones, correcta } = ExamEngine.adaptarOpcionesEstables(raw.opciones, raw.correcta);
    return {
      id: raw.id,
      unidadId: raw._unidadId,
      unidadNombre: raw._unidadNombre,
      tema: raw.tema || null,
      pregunta: raw.pregunta,
      imagen: raw.imagen || null,
      formula: raw.formula || null,
      opciones,
      correcta,
      explicacionCorrecta: raw.explicacion_correcta || raw.explicacion || '',
      /* Alineada al orden ORIGINAL (índice i ↔ id 'optI'), no al orden
         barajado — hoy la UI de Suficiencia no muestra retroalimentación
         por opción incorrecta (solo al final, agregada por unidad), así
         que este campo queda como metadata disponible a futuro. */
      explicacionesIncorrectas: Array.isArray(raw.explicacion_incorrectas) ? raw.explicacion_incorrectas : null
    };
  }

  /* ================================================================
     2. BANCOS POR CURSO
     ================================================================ */
  function _bancoQ10(n) {
    const v = window['PREGUNTAS_U0' + n];
    return Array.isArray(v) ? v : [];
  }
  function _bancoG11(n) {
    const v = window['PREGUNTAS_G11_U0' + n];
    return Array.isArray(v) ? v : [];
  }
  /* FIX10/FIX11: identificadores sueltos (const de script, NO window.X
     — ver nota de cabecera). Se referencian uno por uno a propósito. */
  function _bancoFix10(n) {
    switch (n) {
      case 1: return (typeof PREGUNTAS_FIX10_U01 !== 'undefined') ? PREGUNTAS_FIX10_U01 : [];
      case 2: return (typeof PREGUNTAS_FIX10_U02 !== 'undefined') ? PREGUNTAS_FIX10_U02 : [];
      case 3: return (typeof PREGUNTAS_FIX10_U03 !== 'undefined') ? PREGUNTAS_FIX10_U03 : [];
      case 4: return (typeof PREGUNTAS_FIX10_U04 !== 'undefined') ? PREGUNTAS_FIX10_U04 : [];
      case 5: return (typeof PREGUNTAS_FIX10_U05 !== 'undefined') ? PREGUNTAS_FIX10_U05 : [];
      case 6: return (typeof PREGUNTAS_FIX10_U06 !== 'undefined') ? PREGUNTAS_FIX10_U06 : [];
      case 7: return (typeof PREGUNTAS_FIX10_U07 !== 'undefined') ? PREGUNTAS_FIX10_U07 : [];
      case 8: return (typeof PREGUNTAS_FIX10_U08 !== 'undefined') ? PREGUNTAS_FIX10_U08 : [];
      default: return [];
    }
  }
  function _bancoFix11(n) {
    switch (n) {
      case 1: return (typeof PREGUNTAS_FIX11_U01 !== 'undefined') ? PREGUNTAS_FIX11_U01 : [];
      case 2: return (typeof PREGUNTAS_FIX11_U02 !== 'undefined') ? PREGUNTAS_FIX11_U02 : [];
      case 3: return (typeof PREGUNTAS_FIX11_U03 !== 'undefined') ? PREGUNTAS_FIX11_U03 : [];
      case 4: return (typeof PREGUNTAS_FIX11_U04 !== 'undefined') ? PREGUNTAS_FIX11_U04 : [];
      case 5: return (typeof PREGUNTAS_FIX11_U05 !== 'undefined') ? PREGUNTAS_FIX11_U05 : [];
      case 6: return (typeof PREGUNTAS_FIX11_U06 !== 'undefined') ? PREGUNTAS_FIX11_U06 : [];
      default: return [];
    }
  }

  const CURSOS = {
    q10: {
      label: 'Química 10.º',
      banco: _bancoQ10,
      unidades: [
        { n: 1, id: 'unit-01', nombre: 'Naturaleza de la Materia' },
        { n: 2, id: 'unit-02', nombre: 'Estructura Atómica' },
        { n: 3, id: 'unit-03', nombre: 'Tabla Periódica' },
        { n: 4, id: 'unit-04', nombre: 'Enlace Químico' },
        { n: 5, id: 'unit-05', nombre: 'Nomenclatura Química' },
        { n: 6, id: 'unit-06', nombre: 'Estequiometría' },
        { n: 7, id: 'unit-07', nombre: 'Soluciones' },
        { n: 8, id: 'unit-08', nombre: 'Ácidos y Bases' },
        { n: 9, id: 'unit-09', nombre: 'Oxidación y Reducción' }
      ]
    },
    q11: {
      label: 'Química 11.º',
      banco: _bancoG11,
      unidades: [
        { n: 1, id: 'g11-u01', nombre: 'El Agua' },
        { n: 2, id: 'g11-u02', nombre: 'Cálculo de concentraciones' },
        { n: 3, id: 'g11-u03', nombre: 'Química Orgánica I' },
        { n: 4, id: 'g11-u04', nombre: 'Grupos funcionales y biomoléculas' }
      ]
    },
    fix10: {
      label: 'Física 10.º',
      banco: _bancoFix10,
      unidades: [
        { n: 1, id: 'fix10-u01', nombre: 'La Física en el contexto histórico y actual' },
        { n: 2, id: 'fix10-u02', nombre: 'Cantidades escalares y vectoriales' },
        { n: 3, id: 'fix10-u03', nombre: 'Movimiento Relativo' },
        { n: 4, id: 'fix10-u04', nombre: 'Cinemática' },
        { n: 5, id: 'fix10-u05', nombre: 'Análisis Gráfico de Movimientos' },
        { n: 6, id: 'fix10-u06', nombre: 'Dinámica y las Leyes de Newton' },
        { n: 7, id: 'fix10-u07', nombre: 'Gravitación Universal y Movimiento Satelital' },
        { n: 8, id: 'fix10-u08', nombre: 'Trabajo Mecánico y Energía' }
      ]
    },
    fix11: {
      label: 'Física 11.º',
      banco: _bancoFix11,
      unidades: [
        { n: 1, id: 'fix11-u01', nombre: 'Hidrostática' },
        { n: 2, id: 'fix11-u02', nombre: 'Electrostática' },
        { n: 3, id: 'fix11-u03', nombre: 'Electricidad' },
        { n: 4, id: 'fix11-u04', nombre: 'Magnetismo y electromagnetismo' },
        { n: 5, id: 'fix11-u05', nombre: 'Movimiento ondulatorio' },
        { n: 6, id: 'fix11-u06', nombre: 'Teoría de la Relatividad' }
      ]
    }
  };

  function cursoInfo(curso) {
    const cfg = CURSOS[curso];
    if (!cfg) return null;
    return { label: cfg.label, unidades: cfg.unidades.map(u => ({ id: u.id, nombre: u.nombre })) };
  }

  /* Filtro de seguridad estructural (mismo espíritu que
     _soloCalificables del Simulacro PNE nacional): un ítem mal
     formado se descarta en vez de arriesgar un examen roto. */
  function _valido(raw) {
    return !!(raw && raw.id && raw.pregunta && Array.isArray(raw.opciones) &&
      raw.opciones.length >= 2 && typeof raw.correcta === 'number' &&
      raw.correcta >= 0 && raw.correcta < raw.opciones.length);
  }

  function _poolCompleto(curso) {
    const cfg = CURSOS[curso];
    if (!cfg) return [];
    let items = [];
    cfg.unidades.forEach(u => {
      const banco = cfg.banco(u.n) || [];
      banco.forEach(raw => {
        if (_valido(raw)) items.push(Object.assign({}, raw, { _unidadId: u.id, _unidadNombre: u.nombre }));
      });
    });
    return items;
  }

  /** Verifica que el curso tenga banco suficiente. Úsalo antes de
   *  ofrecer el examen en la UI. */
  function bancosDisponibles(curso) {
    const pool = _poolCompleto(curso);
    return { ok: pool.length >= CANTIDAD_PREGUNTAS, total: pool.length, requerido: CANTIDAD_PREGUNTAS };
  }

  /** Construye un intento de CANTIDAD_PREGUNTAS (20), estratificado
   *  por unidad curricular del curso, evitando repetir el intento
   *  anterior cuando el banco alcanza. */
  function construirIntento(curso, idsEvitar) {
    const pool = _poolCompleto(curso);
    if (pool.length < CANTIDAD_PREGUNTAS) {
      throw new Error('SuficienciaEngine: banco insuficiente para "' + curso + '" (' + pool.length + '/' + CANTIDAD_PREGUNTAS + ')');
    }
    const seleccion = ExamEngine.shuffle(_seleccionarEstratificado(pool, CANTIDAD_PREGUNTAS, idsEvitar));
    return seleccion.map((raw, i) => Object.assign(_adaptarItem(raw), { numero: i + 1 }));
  }

  /* ================================================================
     3. CALIFICACIÓN — función pura (mismo input, mismo output)
     ================================================================ */
  function calcularResultado(preguntas, respuestas) {
    let aciertos = 0;
    const porUnidad = {};
    preguntas.forEach(p => {
      if (!porUnidad[p.unidadId]) porUnidad[p.unidadId] = { nombre: p.unidadNombre, correctas: 0, total: 0 };
      porUnidad[p.unidadId].total++;
      if (respuestas[p.id] === p.correcta) { aciertos++; porUnidad[p.unidadId].correctas++; }
    });
    const total = preguntas.length;
    const score = total ? Math.round((aciertos / total) * 100) : 0;
    return { aciertos, total, score, aprobado: aciertos >= ACIERTOS_APROBACION, porUnidad };
  }

  /* ================================================================
     4. API PÚBLICA
     ================================================================ */
  return {
    CANTIDAD_PREGUNTAS,
    ACIERTOS_APROBACION,
    cursoInfo,
    bancosDisponibles,
    construirIntento,
    calcularResultado
  };
})();
