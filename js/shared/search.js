/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/search.js  |  FASE 1.5 — Buscador global de contenidos
   ================================================================
   Busca en TODO lo registrado vía QI (temas, simuladores, juegos,
   exámenes y glosario de cualquier unidad).
     · GlobalSearch.query(str) — resultados ordenados por relevancia.
     · GlobalSearch.open() — overlay con campo de búsqueda en vivo;
       al elegir un resultado, navega a la unidad y pestaña correctas.
   No requiere índice propio: usa QI.getIndex(), así que cualquier
   unidad nueva queda incluida automáticamente al registrarse.
   ================================================================ */

window.GlobalSearch = (function () {
  'use strict';

  function _norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

  function query(str) {
    const q = _norm(str).trim();
    if (!q || typeof QI === 'undefined') return [];
    const terms = q.split(/\s+/);
    const idx = QI.getIndex();
    const scored = [];
    idx.forEach(item => {
      const hay = _norm((item.title || '') + ' ' + (item.text || ''));
      let score = 0;
      terms.forEach(t => {
        if (hay.includes(t)) score += 2;
        if (_norm(item.title).startsWith(t)) score += 3;
      });
      if (score > 0) scored.push({ item, score });
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 30).map(s => s.item);
  }

  const TYPE_ICON = { tema: '📖', simulador: '⚗️', juego: '🎮', examen: '📝', glosario: '📘' };
  const UNIT_LABEL = id => {
    if (typeof UNIDADES_DATA === 'undefined') return id;
    const u = UNIDADES_DATA.find(x => x.id === id);
    return u ? u.name : id;
  };

  function _resultRow(it) {
    return `<button class="qi-search-result" data-unit="${it.unitId || ''}" data-tab="${it.tab || ''}" data-type="${it.type}" data-term="${it.target || ''}">
      <span class="qi-search-ico">${TYPE_ICON[it.type] || '🔎'}</span>
      <span class="qi-search-main">
        <span class="qi-search-title">${it.title}</span>
        <span class="qi-search-sub">${it.type} · ${UNIT_LABEL(it.unitId)}</span>
      </span>
    </button>`;
  }

  function open() {
    close();
    const ov = document.createElement('div');
    ov.className = 'qi-overlay';
    ov.id = 'qi-search-overlay';
    ov.innerHTML = `
      <div class="qi-overlay-card">
        <div class="qi-overlay-head">
          <h3>🔎 Buscar en la plataforma</h3>
          <button class="btn btn-ghost btn-sm" id="qi-search-close">✕</button>
        </div>
        <input class="qi-overlay-input" id="qi-search-input" placeholder="Escribe un tema, simulador, término…">
        <div class="qi-overlay-body" id="qi-search-body">
          <p style="color:var(--text-muted)">Empieza a escribir para ver resultados.</p>
        </div>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    document.getElementById('qi-search-close').addEventListener('click', close);

    const input = document.getElementById('qi-search-input');
    const body = document.getElementById('qi-search-body');
    input.addEventListener('input', () => {
      const res = query(input.value);
      if (!input.value.trim()) { body.innerHTML = '<p style="color:var(--text-muted)">Empieza a escribir para ver resultados.</p>'; return; }
      body.innerHTML = res.length
        ? res.map(_resultRow).join('')
        : '<p style="color:var(--text-muted)">Sin resultados.</p>';
      body.querySelectorAll('.qi-search-result').forEach(btn => {
        btn.addEventListener('click', () => _go(btn.dataset));
      });
    });
    input.focus();
  }

  function _go(d) {
    close();
    if (d.type === 'glosario') {
      if (typeof Glossary !== 'undefined') Glossary.openOverlay();
      return;
    }
    if (d.unit && d.tab && typeof QI !== 'undefined') QI.openUnitTab(d.unit, d.tab);
  }

  function close() {
    const o = document.getElementById('qi-search-overlay');
    if (o) o.remove();
  }

  return { query, open, close };
})();
