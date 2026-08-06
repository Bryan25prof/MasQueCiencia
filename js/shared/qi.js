/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/qi.js  |  FASE 1.5 — Núcleo de Estandarización (QI)
   ================================================================
   Namespace global compartido por TODAS las unidades. Centraliza:
     · QI.registerUnit(id, manifest) → registro unificado que reparte
       glosario, referencias cruzadas, imágenes, videos y búsqueda a
       cada subsistema. Es el ÚNICO punto que una unidad nueva llama.
     · QI.openTab / QI.openUnitTab → navegación entre pestañas sin
       tocar el core (simula el click en la pestaña de units.js).
     · Índice global de contenidos (lo consume el buscador).

   PATRÓN OFICIAL para una unidad nueva (unit-NN.js), al final del archivo:
     QI.registerUnit('unit-02', {
       glossary: { 'término': 'definición', ... },
       xref:     { 'teoria:topic-0': [ {tab:'simuladores', label:'…'} ] },
       images:   { 'diagrama': { src:'assets/unidades/unit-02/diagrama.png', alt:'…' } },
       videos:   [ { id:'v1', title:'…', topic:'topic-0', src:null } ],
       search:   [ { type:'tema', title:'…', tab:'teoria' } ]   // opcional
     });
   Todos los subsistemas son globales → la unidad nueva los hereda sin
   modificar la estructura principal.
   ================================================================ */

window.QI = (function () {
  'use strict';

  const VERSION = '1.5.0';
  const _contentIndex = [];   /* [{unitId,type,title,text,tab,target}] */

  /* ── Navegación entre pestañas de una unidad ────────────────── */
  /* Simula el click en la pestaña: units.js ya re-renderiza y hace
     bind del plugin, así que no se toca el core. */
  function openTab(tab) {
    const btn = document.querySelector(`#unit-tabs .tab-btn[data-tab="${tab}"]`);
    if (btn) { btn.click(); return true; }
    return false;
  }

  /* Navega a otra unidad y abre una pestaña concreta */
  function openUnitTab(unitId, tab) {
    const tryTab = () => { if (!openTab(tab)) setTimeout(tryTab, 80); };
    if (typeof Router !== 'undefined' && Router && typeof Router.navigate === 'function') {
      Router.navigate('units', { unitId });
      setTimeout(tryTab, 120);
    } else {
      openTab(tab);
    }
  }

  /* ── Índice global de contenidos (para el buscador) ─────────── */
  function indexContent(items) {
    if (Array.isArray(items)) items.forEach(it => _contentIndex.push(it));
  }
  function getIndex() { return _contentIndex.slice(); }

  /* ── Registro unificado de una unidad ───────────────────────── */
  function registerUnit(unitId, manifest) {
    manifest = manifest || {};

    /* Glosario */
    if (manifest.glossary && typeof Glossary !== 'undefined') {
      Glossary.register(manifest.glossary, unitId);
    }
    /* Referencias cruzadas */
    if (manifest.xref && typeof CrossRef !== 'undefined') {
      CrossRef.register(unitId, manifest.xref);
    }
    /* Imágenes */
    if (manifest.images && typeof UnitAssets !== 'undefined') {
      UnitAssets.register(unitId, manifest.images);
    }
    /* Videos */
    if (manifest.videos && typeof UnitMedia !== 'undefined') {
      UnitMedia.register(unitId, manifest.videos);
    }
    /* MQC: ciclo de aprendizaje (detonante / compromiso / conexión) */
    if (manifest.mqc && typeof MQC !== 'undefined') {
      MQC.register(unitId, manifest.mqc);
    }
    /* Mentor MQC: mensajes contextuales */
    if (manifest.mentor && typeof Mentor !== 'undefined') {
      Mentor.register(unitId, manifest.mentor);
    }
    /* Insights: curiosidades + errores frecuentes */
    if ((manifest.curiosidades || manifest.errores) && typeof Insights !== 'undefined') {
      Insights.register(unitId, { curiosidades: manifest.curiosidades, errores: manifest.errores });
    }
    /* Banco PNE: variantes adaptadas de preguntas */
    if (manifest.pne && typeof PNEBank !== 'undefined') {
      PNEBank.register(unitId, manifest.pne);
    }
    /* Búsqueda: índice explícito + derivado de los temas de UNIDADES_DATA
       (o GRADE11_UNIDADES_DATA como respaldo — IMP-11-U01, aditivo,
       nunca reemplaza la búsqueda de unidades de décimo). */
    const items = [];
    let meta = null;
    if (typeof UNIDADES_DATA !== 'undefined') meta = UNIDADES_DATA.find(u => u.id === unitId);
    if (!meta && typeof GRADE11_UNIDADES_DATA !== 'undefined') meta = GRADE11_UNIDADES_DATA.find(u => u.id === unitId);
    if (meta && Array.isArray(meta.topics)) {
      meta.topics.forEach((t, i) => {
        const title = (typeof t === 'string') ? t : (t.titulo || ('Tema ' + (i + 1)));
        items.push({ unitId, type: 'tema', title, text: title, tab: 'teoria', target: `${unitId}-topic-${i}` });
      });
    }
    if (meta && Array.isArray(meta.simulators)) {
      meta.simulators.forEach(s => items.push({ unitId, type: 'simulador', title: s.name, text: s.name, tab: 'simuladores', target: s.id }));
    }
    if (meta && meta.game) items.push({ unitId, type: 'juego', title: meta.game.name, text: meta.game.name, tab: 'juego', target: meta.game.id });
    if (meta) items.push({ unitId, type: 'examen', title: 'Examen — ' + meta.name, text: 'examen evaluación ' + meta.name, tab: 'examen', target: 'exam-' + unitId });
    if (Array.isArray(manifest.search)) manifest.search.forEach(s => items.push(Object.assign({ unitId }, s)));
    indexContent(items);

    /* Glosario también es buscable */
    if (manifest.glossary) {
      Object.keys(manifest.glossary).forEach(term =>
        indexContent([{ unitId, type: 'glosario', title: term, text: term + ' ' + manifest.glossary[term], tab: null, target: term }]));
    }

    console.log(`[QI] Unidad "${unitId}" registrada en los sistemas compartidos.`);
  }

  return { VERSION, openTab, openUnitTab, indexContent, getIndex, registerUnit };
})();
