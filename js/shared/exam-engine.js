/* ================================================================
   MÁSQUECIENCIA — js/shared/exam-engine.js
   ================================================================
   AUDITORÍA FASE 2 — "Motor de examen unificado" (hallazgo de
   MQC_AUDITORIA_INTEGRAL_DIAGNOSTICO.md, sección 12 y advertencia #8:
   "Tres implementaciones independientes del motor de examen [...] con
   mecanismos de rotación de respuesta distintos entre sí").

   ── ALCANCE CONFIRMADO POR BRYAN (2026-09-15) ──
   Se unifican ÚNICAMENTE los 3 "exámenes finales" que ya comparten el
   mismo concepto de fondo (banco grande → selección estratificada →
   examen de opción múltiple → calificación): Desafío Final PNE
   (`pne-final.js`), Simulacro Nacional (`simulacro-nacional.js` /
   `-adapter.js`) y Suficiencia (`suficiencia.js` / `-adapter.js`).
   Los 27 exámenes de unidad (Química/Física 10.º/11.º) NO se tocan —
   quedan exactamente como están, en producción, sin ningún cambio.

   QUÉ RESUELVE:
   Las 3 implementaciones tenían la MISMA lógica de barajado
   (Fisher–Yates) y de selección estratificada (agrupar por clave,
   round-robin evitando repetir el intento anterior) copiada 3 veces
   de forma casi idéntica — cada vez que se agregaba un examen nuevo
   (como Suficiencia, Lote 4) se volvía a copiar. Ahora vive en un
   solo lugar.

   También estandariza el mecanismo de rotación de respuesta: el
   Simulacro PNE ya usaba IDs estables por opción (`_barajarOpciones`
   en simulacro-nacional-adapter.js baraja OBJETOS ya etiquetados con
   un id fijo — el id viaja con el objeto, así que el barajado nunca
   necesita "recalcular" cuál es la correcta). PNE Final y Suficiencia
   en cambio barajaban ÍNDICES numéricos y recalculaban
   `correcta = orden.indexOf(correctaOriginal)` después — funcionalmente
   equivalente, pero un mecanismo distinto y más fácil de romper por
   error (si alguien olvida remapear el índice, la corrección queda
   mal). Los 3 ahora usan el mismo patrón de ID estable.

   ESTE ARCHIVO ES 100% LÓGICA PURA: no toca el DOM, no llama a
   Router/Storage/Gamification. Cada adaptador (`simulacro-nacional-
   adapter.js`, `suficiencia-adapter.js`, `pne-final.js`) sigue siendo
   dueño de SU banco de preguntas, SU forma de calificar y SU
   condición de desbloqueo — este motor solo centraliza las 2 piezas
   matemáticas que antes se copiaban 3 veces.
================================================================ */

window.ExamEngine = (function () {
  'use strict';

  /** Fisher–Yates. No muta el arreglo recibido. */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _agruparPorClave(items, keyFn) {
    const grupos = {};
    items.forEach(it => {
      const k = keyFn(it);
      if (!grupos[k]) grupos[k] = [];
      grupos[k].push(it);
    });
    return grupos;
  }

  /** Selección estratificada por round-robin entre grupos (definidos
   *  por `keyFn`), evitando repetir `idsEvitar` (típicamente los ids
   *  del intento anterior del mismo perfil) cuando el banco alcanza.
   *  Mismo algoritmo, ahora en un solo lugar, que ya usaban por
   *  separado el Simulacro Nacional (agrupando por tema) y Suficiencia
   *  (agrupando por unidad).
   *  @param {Array}    pool       — ítems candidatos (ya filtrados/válidos)
   *  @param {number}   cantidad   — cuántos ítems se necesitan
   *  @param {string[]} idsEvitar  — ids a evitar si el banco alcanza
   *  @param {function} keyFn      — item → clave de agrupación (string)
   *  @param {function} [idFn]     — item → id único (default: it => it.id)
   */
  function seleccionarEstratificado(pool, cantidad, idsEvitar, keyFn, idFn) {
    idFn = idFn || (it => it.id);
    if (!pool || pool.length === 0) return [];

    const evitar = new Set(idsEvitar || []);
    const frescos = pool.filter(it => !evitar.has(idFn(it)));
    const poolBase = frescos.length >= cantidad ? frescos : pool;

    const grupos = _agruparPorClave(poolBase, keyFn);
    const claves = shuffle(Object.keys(grupos));
    claves.forEach(k => { grupos[k] = shuffle(grupos[k]); });

    const seleccion = [];
    const usados = new Set();
    let vuelta = 0;
    while (seleccion.length < cantidad) {
      let avance = false;
      for (let i = 0; i < claves.length && seleccion.length < cantidad; i++) {
        const grupo = grupos[claves[i]];
        const candidato = grupo[vuelta];
        if (candidato && !usados.has(idFn(candidato))) {
          seleccion.push(candidato);
          usados.add(idFn(candidato));
          avance = true;
        }
      }
      vuelta++;
      if (!avance) break; // ya no hay más ítems sin repetir en ningún grupo
    }
    if (seleccion.length < cantidad) {
      const resto = shuffle(pool.filter(it => !usados.has(idFn(it))));
      for (let i = 0; i < resto.length && seleccion.length < cantidad; i++) {
        seleccion.push(resto[i]);
        usados.add(idFn(resto[i]));
      }
    }
    return seleccion;
  }

  /** Adapta un arreglo de opciones (texto plano) a la forma con ID
   *  ESTABLE por opción — el patrón que ya usaba el Simulacro PNE
   *  (`originalA`/`originalB`/`originalC`/`mqcD`) y que ahora se
   *  generaliza: cada opción se etiqueta con un id fijo ANTES de
   *  barajar, así que barajar el arreglo nunca requiere "recalcular"
   *  cuál es la correcta — el id viaja pegado al objeto.
   *  @param {string[]} textos          — opciones en su orden original
   *  @param {number}   indiceCorrecta  — índice (0-based) de la correcta en `textos`
   *  @param {string[]} [ids]           — ids estables a usar (default: 'opt0','opt1',...)
   *  @returns {{opciones: {id:string, texto:string}[], correcta: string}}
   */
  function adaptarOpcionesEstables(textos, indiceCorrecta, ids) {
    const idsFinales = ids || textos.map((_, i) => 'opt' + i);
    const etiquetadas = textos.map((texto, i) => ({ id: idsFinales[i], texto }));
    return {
      opciones: shuffle(etiquetadas),
      correcta: idsFinales[indiceCorrecta]
    };
  }

  return {
    shuffle,
    seleccionarEstratificado,
    adaptarOpcionesEstables
  };
})();
