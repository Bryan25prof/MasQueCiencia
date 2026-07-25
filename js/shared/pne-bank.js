/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/pne-bank.js  |  Banco PNE — selector de contenido adaptado
   ================================================================
   Permite que examen y juego pidan "la versión presentable" de una
   pregunta. Si el estudiante activó el modo simplificado (pne.js),
   se devuelve la variante adaptada del banco PNE; si no, la estándar.
   No duplica el motor de examen: este solo decide QUÉ versión mostrar.

   API:
     PNEBank.register(unitId, variantes)
        variantes: { 'q-02-001-b': {pregunta, opciones, correcta,
                       explicacion_correcta, explicacion_incorrectas} , ... }
     PNEBank.present(unitId, pregunta) → la pregunta estándar o su
        variante PNE (misma forma), según PNE.isEnabled('simplificado').
     PNEBank.hasVariant(unitId, id)
================================================================ */

window.PNEBank = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → { questionId → variantePNE } */

  function register(unitId, variantes) {
    if (!variantes) return;
    _byUnit[unitId] = Object.assign(_byUnit[unitId] || {}, variantes);
  }
  function hasVariant(unitId, id) { return !!(_byUnit[unitId] && _byUnit[unitId][id]); }

  function _pneOn() {
    return (typeof PNE !== 'undefined' && PNE.isEnabled && PNE.isEnabled('simplificado'));
  }

  /* Devuelve la pregunta a presentar (estándar o adaptada) */
  function present(unitId, pregunta) {
    if (!pregunta) return pregunta;
    if (!_pneOn()) return pregunta;
    const v = _byUnit[unitId] && _byUnit[unitId][pregunta.id];
    if (!v) return pregunta;
    /* Mezcla: conserva metadatos de la original y sobreescribe lo adaptado */
    return Object.assign({}, pregunta, v, { _pne: true });
  }

  return { register, hasVariant, present };
})();
