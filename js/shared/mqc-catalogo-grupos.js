/* ================================================================
   MÁSQUECIENCIA — js/shared/mqc-catalogo-grupos.js
   ================================================================
   Fuente ÚNICA del catálogo de Grupo/Sección (HOTFIX — Sección 2 del
   ticket: "Debe existir UNA fuente coherente de grupos... Evitar
   mantener listas diferentes que puedan volver a quedar
   desincronizadas").

   Se carga en DOS lugares distintos, con la MISMA ruta relativa a
   este archivo:
     - index.html                → <script src="js/shared/mqc-catalogo-grupos.js">
     - analytics/index.html       → <script src="../js/shared/mqc-catalogo-grupos.js">
   Ambos leen exactamente el mismo array — si en el futuro cambia el
   número de secciones por grado, este es el ÚNICO archivo a tocar.

   Este archivo NO decide nada por sí mismo sobre perfiles existentes
   ni sobre Analytics — es solo el catálogo + una función de orden
   numérico. Quien lo use decide qué hacer con él.
================================================================ */
window.MQC_CATALOGO_GRUPOS = (function () {
  'use strict';

  const GRADOS = ['10', '11'];
  const SECCIONES_POR_GRADO = 10; // Sección 1 del ticket: 10-1..10-10 y 11-1..11-10

  const TODOS = [];
  GRADOS.forEach(function (grado) {
    for (let s = 1; s <= SECCIONES_POR_GRADO; s++) TODOS.push(grado + '-' + s);
  });

  const DE_10 = TODOS.filter(function (g) { return g.indexOf('10-') === 0; });
  const DE_11 = TODOS.filter(function (g) { return g.indexOf('11-') === 0; });

  /** ¿Es un grupo de 11.°? Útil para NUNCA mezclar 10.° en análisis de PNE 11.º
   *  (Sección 5 del ticket). 'Grupo pendiente'/null/undefined → false. */
  function esDeUndecimo(grupo) {
    return typeof grupo === 'string' && grupo.indexOf('11-') === 0;
  }
  function esDeDecimo(grupo) {
    return typeof grupo === 'string' && grupo.indexOf('10-') === 0;
  }

  /** Comparador de orden NUMÉRICO: 10-1, 10-2, ..., 10-9, 10-10, 11-1, ...
   *  (nunca alfabético — Sección 9 del ticket: "10-1, 10-10, 10-2..." es
   *  el orden INCORRECTO que hay que evitar). Grupos que no calzan con
   *  el patrón "NN-N" (como null, '', 'Grupo pendiente') se ordenan al
   *  final, en el orden en que ya estaban. */
  function comparar(a, b) {
    const pa = _partes(a), pb = _partes(b);
    if (!pa && !pb) return 0;
    if (!pa) return 1;
    if (!pb) return -1;
    if (pa.grado !== pb.grado) return pa.grado - pb.grado;
    return pa.seccion - pb.seccion;
  }

  function _partes(g) {
    if (typeof g !== 'string') return null;
    const m = g.match(/^(\d+)-(\d+)$/);
    if (!m) return null;
    return { grado: parseInt(m[1], 10), seccion: parseInt(m[2], 10) };
  }

  return { TODOS: TODOS, DE_10: DE_10, DE_11: DE_11, esDeUndecimo: esDeUndecimo, esDeDecimo: esDeDecimo, comparar: comparar };
})();
