/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/insights.js  |  Curiosidades + Errores frecuentes
   ================================================================
   Sistema único de "insights" pedagógicos, de dos tipos:
     · CURIOSIDAD       → conecta el contenido con la vida real.
     · ERROR FRECUENTE  → idea previa equivocada + por qué se cae + corrección.
   Es la base de la "confrontación de ideas" del Método MQC y evita
   duplicar listas: teoría, examen y juego LEEN de aquí por unitId/topic.

   API:
     Insights.register(unitId, { curiosidades:[...], errores:[...] })
        curiosidad: { topic, texto, fuente? }
        error:      { id?, topic, creencia, porque, correccion }
     Insights.curiosidades(unitId, topic) / errores(unitId, topic)
     Insights.renderCuriosidad(unitId, topic)   → HTML callout
     Insights.renderError(unitId, topic)        → HTML callout
     Insights.errorById(unitId, id)             → un error (para distractores de examen)
   Los textos se indexan en el buscador global (vía QI) al registrarse.
================================================================ */

window.Insights = (function () {
  'use strict';

  const _cur = {};   /* unitId → [curiosidad] */
  const _err = {};   /* unitId → [error] */

  function register(unitId, data) {
    data = data || {};
    if (Array.isArray(data.curiosidades)) _cur[unitId] = (_cur[unitId] || []).concat(data.curiosidades);
    if (Array.isArray(data.errores)) _err[unitId] = (_err[unitId] || []).concat(data.errores);

    /* Indexar en el buscador global, si está disponible */
    if (typeof QI !== 'undefined' && QI.indexContent) {
      const items = [];
      (data.curiosidades || []).forEach(c => items.push({ unitId, type: 'curiosidad', title: '¿Sabías que…?', text: c.texto, tab: 'teoria', target: c.topic }));
      (data.errores || []).forEach(e => items.push({ unitId, type: 'error', title: 'Error frecuente: ' + e.creencia, text: e.creencia + ' ' + e.correccion, tab: 'teoria', target: e.topic }));
      QI.indexContent(items);
    }
  }

  function curiosidades(unitId, topic) {
    return (_cur[unitId] || []).filter(c => !topic || c.topic === topic);
  }
  function errores(unitId, topic) {
    return (_err[unitId] || []).filter(e => !topic || e.topic === topic);
  }
  function errorById(unitId, id) {
    return (_err[unitId] || []).find(e => e.id === id) || null;
  }

  function renderCuriosidad(unitId, topic) {
    const list = curiosidades(unitId, topic);
    if (!list.length) return '';
    return list.map(c => `<div class="qi-insight qi-curiosidad">
        <span class="qi-insight-badge">💡 ¿Sabías que…?</span>
        <p>${c.texto}</p>
        ${c.fuente ? `<span class="qi-insight-src">${c.fuente}</span>` : ''}
      </div>`).join('');
  }

  function renderError(unitId, topic) {
    const list = errores(unitId, topic);
    if (!list.length) return '';
    return list.map(e => `<div class="qi-insight qi-error">
        <span class="qi-insight-badge">⚠️ Error frecuente</span>
        <p class="qi-error-creencia">“${e.creencia}”</p>
        <p class="qi-error-porque"><strong>Por qué se cae:</strong> ${e.porque}</p>
        <p class="qi-error-correc"><strong>La verdad (MQC):</strong> ${e.correccion}</p>
      </div>`).join('');
  }

  return { register, curiosidades, errores, errorById, renderCuriosidad, renderError };
})();
