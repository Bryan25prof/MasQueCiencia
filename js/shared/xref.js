/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/xref.js  |  Referencias cruzadas — NAVEGACIÓN OFICIAL
   ================================================================
   Sistema oficial de navegación inteligente entre:
     teoría · simuladores · juego · examen · glosario · videos ·
     curiosidades · errores frecuentes · UNIDADES relacionadas.
   (Aprobado como estándar a partir de la Unidad III. Evitar botones
   específicos cuando una referencia pueda resolverse con xref.)

   Cada enlace es un descriptor:
     { tab:'simuladores', label }                       → pestaña de ESTA unidad
     { type:'unit',  unit:'unit-02', tab:'teoria', label}→ otra UNIDAD
     { type:'section', section:'periodic-table', label } → SECCIÓN del Router
     { type:'glossary', term?, label }                  → abre el glosario
     { type:'video'|'curiosidad'|'error', topic?, label}→ teoría (donde viven)
   (El formato antiguo { tab, label } sigue siendo válido.)

   API:
     CrossRef.register(unitId, mapping)   mapping: { 'teoria:topic-3':[ … ] }
     CrossRef.renderChips(unitId, key)
================================================================ */

window.CrossRef = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → { key → [descriptor] } */
  let _bound = false;

  function register(unitId, mapping) {
    if (!mapping) return;
    _byUnit[unitId] = Object.assign(_byUnit[unitId] || {}, mapping);
  }
  function forKey(unitId, key) { return (_byUnit[unitId] && _byUnit[unitId][key]) || []; }

  const ICON = {
    teoria: '📖', simuladores: '⚗️', juego: '🎮', examen: '📝',
    glossary: '📘', section: '🗺️', unit: '🔗', video: '🎬',
    curiosidad: '💡', error: '⚠️'
  };

  function _iconFor(l) {
    const t = l.type || 'tab';
    if (t === 'tab') return ICON[l.tab] || '➡️';
    return ICON[t] || '➡️';
  }

  function renderChips(unitId, key) {
    const links = forKey(unitId, key);
    if (!links.length) return '';
    _bind();
    const chips = links.map(l => {
      const type = l.type || 'tab';
      const d = [
        `data-qi-type="${type}"`,
        l.tab ? `data-qi-tab="${l.tab}"` : '',
        l.unit ? `data-qi-unit="${l.unit}"` : '',
        l.section ? `data-qi-section="${l.section}"` : '',
        l.term ? `data-qi-term="${l.term}"` : '',
        l.topic != null ? `data-qi-topic="${l.topic}"` : ''
      ].filter(Boolean).join(' ');
      return `<button class="qi-xref" ${d}>${_iconFor(l)} ${l.label}</button>`;
    }).join('');
    return `<div class="qi-xref-row"><span class="qi-xref-label">🔗 Relacionado:</span>${chips}</div>`;
  }

  /* Router de navegación: resuelve el descriptor del chip */
  function _go(d) {
    const type = d.qiType || 'tab';
    if (type === 'glossary') {
      if (typeof Glossary !== 'undefined' && Glossary.openOverlay) Glossary.openOverlay();
      return;
    }
    if (type === 'section') {
      if (typeof Router !== 'undefined' && Router.navigate && d.qiSection) Router.navigate(d.qiSection);
      return;
    }
    if (type === 'unit') {
      if (typeof QI !== 'undefined' && d.qiUnit) QI.openUnitTab(d.qiUnit, d.qiTab || 'teoria');
      return;
    }
    /* video / curiosidad / error viven en la teoría → abrir esa pestaña */
    if (type === 'video' || type === 'curiosidad' || type === 'error') {
      if (typeof QI !== 'undefined') QI.openTab('teoria');
      return;
    }
    /* tab (por defecto) */
    if (typeof QI !== 'undefined') {
      if (d.qiUnit) QI.openUnitTab(d.qiUnit, d.qiTab);
      else QI.openTab(d.qiTab);
    }
  }

  function _bind() {
    if (_bound || typeof document === 'undefined') return;
    _bound = true;
    document.addEventListener('click', function (e) {
      const chip = e.target.closest && e.target.closest('.qi-xref');
      if (!chip) return;
      _go(chip.dataset);
    });
  }

  return { register, forKey, renderChips };
})();
