/* ================================================================
   MÁSQUECIENCIA — js/shared/atlas-quimico.js
   Motor del Atlas Químico MQC (IMP-11-U04)
   ================================================================
   Registro persistente y sencillo: qué grupos funcionales y
   biomoléculas ya identificó el estudiante. No otorga XP, no altera
   el equilibrio de la gamificación — sirve únicamente como evidencia
   de aprendizaje, tal como exige el ticket.
================================================================ */
window.AtlasQuimico = (function () {
  'use strict';

  function _data() {
    if (typeof Storage === 'undefined' || !Storage.load) return { discovered: [] };
    const d = Storage.load();
    return d.atlasQuimico || { discovered: [] };
  }

  function isDiscovered(id) {
    return _data().discovered.includes(id);
  }

  /* Marca un ítem como descubierto la primera vez — idempotente
     (llamarlo de nuevo sobre algo ya descubierto no hace nada, no
     dispara el mensaje de Photon de nuevo). Nunca otorga XP. */
  function markDiscovered(id) {
    if (typeof Storage === 'undefined' || !Storage.load || !Storage.set) return { ok: false, isNew: false };
    const data = Storage.load();
    if (!data.atlasQuimico) data.atlasQuimico = { discovered: [] };
    if (data.atlasQuimico.discovered.includes(id)) return { ok: true, isNew: false };
    data.atlasQuimico.discovered.push(id);
    Storage.set('atlasQuimico', data.atlasQuimico);
    /* Reutiliza únicamente estados existentes de Photon — sin
       animaciones nuevas, tal como exige el ticket. */
    if (typeof Photon !== 'undefined' && Photon.react) {
      try { Photon.react('topic-read'); } catch (e) {}
    }
    return { ok: true, isNew: true };
  }

  function progress() {
    const disc = _data().discovered;
    const total = (typeof ATLAS_QUIMICO_DATA !== 'undefined')
      ? ATLAS_QUIMICO_DATA.gruposFuncionales.length + ATLAS_QUIMICO_DATA.biomoleculas.length
      : 0;
    return { discovered: disc.length, total, pct: total ? Math.round((disc.length / total) * 100) : 0 };
  }

  return { isDiscovered, markDiscovered, progress };
})();
