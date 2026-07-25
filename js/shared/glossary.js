/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/glossary.js  |  FASE 1.5 — Glosario global
   ================================================================
   Glosario reutilizable por toda la plataforma.
     · Glossary.register(terms, unitId) — añade términos.
     · Glossary.highlight(html) — resalta términos conocidos dentro
       del TEXTO de un HTML (no toca etiquetas ni atributos), envolviendo
       la primera aparición de cada término en <span class="qi-term">.
     · Glossary.renderView() — vista/listado completo del glosario.
   Un único listener delegado muestra el popover con la definición.
   ================================================================ */

window.Glossary = (function () {
  'use strict';

  const _terms = {};   /* clave en minúsculas → { term, def, unit } */
  let _popoverBound = false;

  function register(termsObj, unitId) {
    if (!termsObj) return;
    Object.keys(termsObj).forEach(t => {
      _terms[t.toLowerCase()] = { term: t, def: termsObj[t], unit: unitId || null };
    });
  }
  function get(term) { return _terms[(term || '').toLowerCase()] || null; }
  function has(term) { return !!get(term); }
  function all() { return Object.keys(_terms).sort().map(k => _terms[k]); }

  /* Escapa para uso en RegExp */
  function _esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* Resalta SOLO el texto entre etiquetas (patrón >texto<), nunca dentro
     de < ... >, para no romper el HTML. Cada término se enlaza una vez. */
  function highlight(html) {
    if (!html || !Object.keys(_terms).length) return html;
    const usados = {};
    return html.replace(/>([^<]+)</g, function (m, texto) {
      let out = texto;
      Object.keys(_terms).forEach(key => {
        if (usados[key]) return;
        const re = new RegExp('\\b(' + _esc(_terms[key].term) + ')\\b', 'i');
        if (re.test(out)) {
          out = out.replace(re, '<span class="qi-term" data-term="' + key + '">$1</span>');
          usados[key] = true;
        }
      });
      return '>' + out + '<';
    });
  }

  /* Popover de definición (listener único y delegado) */
  function _bindPopover() {
    if (_popoverBound) return;
    _popoverBound = true;
    document.addEventListener('click', function (e) {
      const el = e.target.closest && e.target.closest('.qi-term');
      _closePopover();
      if (!el) return;
      const entry = get(el.dataset.term);
      if (!entry) return;
      const pop = document.createElement('div');
      pop.className = 'qi-term-popover';
      pop.innerHTML = '<strong>' + entry.term + '</strong><span>' + entry.def + '</span>';
      document.body.appendChild(pop);
      const r = el.getBoundingClientRect();
      pop.style.top = (window.scrollY + r.bottom + 6) + 'px';
      pop.style.left = (window.scrollX + r.left) + 'px';
    });
  }
  function _closePopover() {
    const old = document.querySelector('.qi-term-popover');
    if (old) old.remove();
  }

  /* Vista completa del glosario (para overlay o sección) */
  function renderView() {
    const items = all();
    if (!items.length) return '<p style="color:var(--text-muted)">El glosario aún no tiene términos.</p>';
    return '<div class="qi-glossary-list">' + items.map(e =>
      `<div class="qi-glossary-item">
         <div class="qi-glossary-term">${e.term}</div>
         <div class="qi-glossary-def">${e.def}</div>
       </div>`).join('') + '</div>';
  }

  /* Overlay flotante con el glosario completo + buscador interno */
  function openOverlay() {
    _closeOverlay();
    const ov = document.createElement('div');
    ov.className = 'qi-overlay';
    ov.id = 'qi-glossary-overlay';
    ov.innerHTML = `
      <div class="qi-overlay-card">
        <div class="qi-overlay-head">
          <h3>📘 Glosario</h3>
          <button class="btn btn-ghost btn-sm" id="qi-gloss-close">✕</button>
        </div>
        <input class="qi-overlay-input" id="qi-gloss-filter" placeholder="Filtrar términos…">
        <div class="qi-overlay-body" id="qi-gloss-body">${renderView()}</div>
      </div>`;
    document.body.appendChild(ov);
    document.getElementById('qi-gloss-close').addEventListener('click', _closeOverlay);
    ov.addEventListener('click', e => { if (e.target === ov) _closeOverlay(); });
    const filter = document.getElementById('qi-gloss-filter');
    filter.addEventListener('input', () => {
      const q = filter.value.toLowerCase();
      const list = all().filter(e => e.term.toLowerCase().includes(q) || e.def.toLowerCase().includes(q));
      document.getElementById('qi-gloss-body').innerHTML = list.length
        ? '<div class="qi-glossary-list">' + list.map(e =>
            `<div class="qi-glossary-item"><div class="qi-glossary-term">${e.term}</div><div class="qi-glossary-def">${e.def}</div></div>`).join('') + '</div>'
        : '<p style="color:var(--text-muted)">Sin coincidencias.</p>';
    });
    filter.focus();
  }
  function _closeOverlay() {
    const o = document.getElementById('qi-glossary-overlay');
    if (o) o.remove();
  }

  /* Auto-inicialización del popover cuando el DOM esté listo */
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _bindPopover);
    else _bindPopover();
  }

  return { register, get, has, all, highlight, renderView, openOverlay };
})();
