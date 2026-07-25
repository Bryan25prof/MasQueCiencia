/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/modules/periodic-table.js  |  Módulo: Tabla Periódica
   ================================================================
   Tabla periódica completa de 118 elementos con:
   - CSS Grid de 18 columnas × 10 filas (más f-block separado)
   - Colores por tipo de elemento
   - Búsqueda por nombre, símbolo o número atómico
   - Filtros por tipo de elemento
   - Modal de detalles al hacer clic
   - Compatible mobile (scroll horizontal)
   - Dar XP al explorar elementos

   Usa los datos de js/data/elementos.js (variable ELEMENTOS).
   Registra el módulo con nombre 'periodic-table'.
================================================================ */

Router.register('periodic-table', (() => {
  'use strict';

  /* ── Estado del módulo ──────────────────────────────────── */
  let _filter       = 'all';   // tipo activo en filtro
  let _search       = '';      // texto de búsqueda
  let _exploredEls  = new Set(); // elementos vistos esta sesión

  /* ── Mapas de tipos ─────────────────────────────────────── */
  const TYPE_CLASS = {
    'nonmetal':         'el-type-nonmetal',
    'alkali-metal':     'el-type-alkali-metal',
    'alkaline-earth':   'el-type-alkaline-earth',
    'transition-metal': 'el-type-transition-metal',
    'post-transition':  'el-type-post-transition',
    'metalloid':        'el-type-metalloid',
    'halogen':          'el-type-halogen',
    'noble-gas':        'el-type-noble-gas',
    'lanthanide':       'el-type-lanthanide',
    'actinide':         'el-type-actinide',
    'unknown':          'el-type-unknown'
  };

  const TYPE_COLOR = {
    'nonmetal':         'var(--el-nonmetal)',
    'alkali-metal':     'var(--el-alkali)',
    'alkaline-earth':   'var(--el-alkaline-earth)',
    'transition-metal': 'var(--el-transition)',
    'post-transition':  'var(--el-post-transition)',
    'metalloid':        'var(--el-metalloid)',
    'halogen':          'var(--el-halogen)',
    'noble-gas':        'var(--el-noble)',
    'lanthanide':       'var(--el-lanthanide)',
    'actinide':         'var(--el-actinide)',
    'unknown':          'var(--el-unknown)'
  };

  /* Filtros disponibles */
  const FILTER_BTNS = [
    { key: 'all',             label: 'Todos' },
    { key: 'alkali-metal',    label: 'M. Alcalinos' },
    { key: 'alkaline-earth',  label: 'M. Alcalinotérreos' },
    { key: 'transition-metal',label: 'M. Transición' },
    { key: 'post-transition', label: 'M. Post-Trans.' },
    { key: 'metalloid',       label: 'Metaloides' },
    { key: 'nonmetal',        label: 'No Metales' },
    { key: 'halogen',         label: 'Halógenos' },
    { key: 'noble-gas',       label: 'Gases Nobles' },
    { key: 'lanthanide',      label: 'Lantánidos' },
    { key: 'actinide',        label: 'Actínidos' },
    { key: 'unknown',         label: 'Desconocidos' }
  ];

  /* ── Cálculo de posición en la grilla ───────────────────── */

  /**
   * Devuelve { gridRow, gridCol } para cada elemento.
   * Lantánidos (Z 57-71) → fila 9, col 3-17
   * Actínidos  (Z 89-103) → fila 10, col 3-17
   * Resto: usa period y group directamente.
   */
  function _gridPos(el) {
    if (el.type === 'lanthanide') {
      return { gridRow: 9,  gridCol: el.z - 57 + 3 };
    }
    if (el.type === 'actinide') {
      return { gridRow: 10, gridCol: el.z - 89 + 3 };
    }
    return { gridRow: el.period, gridCol: el.group };
  }

  /* ── Renderizado de la tabla ────────────────────────────── */

  function _renderTable() {
    /* Determinar si un elemento pasa el filtro/búsqueda */
    const isActive = el => {
      const typeOk   = _filter === 'all' || el.type === _filter;
      const search   = _search.toLowerCase().trim();
      const searchOk = !search ||
        el.name.toLowerCase().includes(search)   ||
        el.symbol.toLowerCase().includes(search) ||
        String(el.z) === search;
      return typeOk && searchOk;
    };

    /* Mapa de celdas ocupadas por elemento (para evitar solapamientos) */
    const occupied = {};

    /* Celda de cada elemento */
    const cellsHTML = ELEMENTOS.map(el => {
      const { gridRow, gridCol } = _gridPos(el);
      if (!gridRow || !gridCol) return ''; // dato faltante

      const key     = `${gridRow}-${gridCol}`;
      occupied[key] = true;

      const active  = isActive(el);
      const cls     = `${TYPE_CLASS[el.type] || ''} ${active ? '' : 'dimmed'}`;
      const mass    = typeof el.mass === 'number' ? el.mass.toFixed(el.mass < 10 ? 3 : 3) : el.mass;

      return `
        <div class="element-cell ${cls}"
             style="grid-row:${gridRow};grid-column:${gridCol}"
             data-z="${el.z}"
             data-action="open-element"
             title="${el.name} (${el.symbol}), Z=${el.z}">
          <span class="el-z">${el.z}</span>
          <span class="el-symbol">${el.symbol}</span>
          <span class="el-mass">${mass}</span>
          <span class="el-name">${el.name}</span>
        </div>
      `;
    }).join('');

    /* Celdas vacías necesarias para la estructura de la grilla */
    const gapCells = _buildGapCells(occupied);

    return cellsHTML + gapCells;
  }

  /**
   * Genera las celdas "vacías" que mantienen la estructura de la tabla:
   * - Período 1: huecos 2-17
   * - Período 2-3: huecos 3-12
   * - Placeholder de lantánidos en fila 6, col 3
   * - Placeholder de actínidos en fila 7, col 3
   * - Separador entre bloque principal y f-block (fila 8)
   */
  function _buildGapCells(occupied) {
    let html = '';

    /* Hueco período 1: cols 2-17 */
    for (let c = 2; c <= 17; c++) {
      if (!occupied[`1-${c}`]) {
        html += `<div style="grid-row:1;grid-column:${c}"></div>`;
      }
    }

    /* Huecos períodos 2 y 3: cols 3-12 */
    for (let r = 2; r <= 3; r++) {
      for (let c = 3; c <= 12; c++) {
        if (!occupied[`${r}-${c}`]) {
          html += `<div style="grid-row:${r};grid-column:${c}"></div>`;
        }
      }
    }

    /* Placeholder lantánidos en fila 6, col 3 */
    html += `
      <div class="element-placeholder" style="grid-row:6;grid-column:3"
           title="Lantánidos (Z 57-71), ver fila inferior">
        <span style="font-size:.55rem;text-align:center;line-height:1.4">57-71<br>La→Lu</span>
      </div>
    `;

    /* Placeholder actínidos en fila 7, col 3 */
    html += `
      <div class="element-placeholder" style="grid-row:7;grid-column:3"
           title="Actínidos (Z 89-103), ver fila inferior">
        <span style="font-size:.55rem;text-align:center;line-height:1.4">89-103<br>Ac→Lr</span>
      </div>
    `;

    /* Separador entre bloque principal y f-block */
    html += `<div class="pt-row-separator" style="grid-row:8;grid-column:1/-1"></div>`;

    /* Etiquetas en el f-block (col 1 y 2 vacías) */
    html += `
      <div style="grid-row:9;grid-column:1;display:flex;align-items:center;justify-content:center">
        <span style="font-size:.55rem;color:var(--text-muted);writing-mode:vertical-rl;
                     transform:rotate(180deg);white-space:nowrap;letter-spacing:.05em">
          Lantánidos
        </span>
      </div>
      <div style="grid-row:10;grid-column:1;display:flex;align-items:center;justify-content:center">
        <span style="font-size:.55rem;color:var(--text-muted);writing-mode:vertical-rl;
                     transform:rotate(180deg);white-space:nowrap;letter-spacing:.05em">
          Actínidos
        </span>
      </div>
    `;

    /* Huecos en f-block (col 2) */
    html += `<div style="grid-row:9;grid-column:2"></div>`;
    html += `<div style="grid-row:10;grid-column:2"></div>`;

    return html;
  }

  /* ── HTML de la página completa ─────────────────────────── */

  function _buildPage() {
    /* Botones de filtro */
    const filterBtns = FILTER_BTNS.map(f => `
      <button class="pt-filter-btn ${_filter === f.key ? 'active' : ''}"
              data-filter="${f.key}">
        ${f.key !== 'all' ? `<span style="display:inline-block;width:8px;height:8px;
                border-radius:2px;background:${TYPE_COLOR[f.key] || 'gray'};
                margin-right:.3rem;vertical-align:middle"></span>` : ''}
        ${f.label}
      </button>
    `).join('');

    /* Leyenda */
    const legend = Object.entries(TYPE_NAMES).map(([key, label]) => `
      <div class="legend-item" data-legend="${key}">
        <div class="legend-dot" style="background:${TYPE_COLOR[key] || '#888'}"></div>
        <span>${label}</span>
      </div>
    `).join('');

    /* Estado: solo hay 118 elementos si ELEMENTOS está cargado */
    const totalCount = ELEMENTOS ? ELEMENTOS.length : 0;

    return `
      <div class="periodic-page" style="position:relative">
        <div class="mqc-living-bg"></div>
        <div style="position:relative;z-index:1">
        <!-- Encabezado -->
        <div class="section-header">
          <p class="section-title">Referencia — ${totalCount} elementos</p>
          <h2 class="section-heading">Tabla Periódica Interactiva</h2>
        </div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin-bottom:1rem;max-width:65ch">
          Haz clic en cualquier elemento para ver su ficha completa.
          Usa los filtros para resaltar grupos y la búsqueda para encontrar elementos.
        </p>

        <!-- Controles -->
        <div class="pt-controls" id="pt-controls">
          <input type="search"
                 class="pt-search"
                 id="pt-search"
                 placeholder="🔍 Nombre, símbolo o número..."
                 value="${_escapeHTML(_search)}">
          <div style="display:flex;flex-wrap:wrap;gap:.35rem;align-items:center">
            ${filterBtns}
          </div>
        </div>

        <!-- Leyenda de tipos -->
        <div class="pt-legend" id="pt-legend">${legend}</div>

        <!-- Tabla periódica (scroll horizontal en mobile) -->
        <div class="periodic-table-wrap">
          <div class="periodic-table" id="periodic-table">
            ${_renderTable()}
          </div>
        </div>

        <!-- Info de uso -->
        <p style="font-size:.72rem;color:var(--text-muted);margin-top:1rem;text-align:center">
          Tabla Periódica de los Elementos Químicos · IUPAC 2024 ·
          <strong>${_filter !== 'all' ? `Mostrando: ${TYPE_NAMES[_filter] || ''}` : 'Todos los elementos'}</strong>
          ${_search ? `· Búsqueda: "${_search}"` : ''}
        </p>
      </div>
      </div>
    `;
  }

  /* ── Modal de elemento ──────────────────────────────────── */

  function _openElementModal(z) {
    const el = getElementByZ(z);
    if (!el) return;

    /* Rastrear elemento explorado y dar XP (máx. 1 vez por elemento por sesión) */
    if (!_exploredEls.has(z)) {
      _exploredEls.add(z);
      Gamification.addXP('element-explored');
    }

    const typeColor = TYPE_COLOR[el.type] || 'var(--text-secondary)';
    const typeClass = TYPE_CLASS[el.type]  || '';
    const typeName  = TYPE_NAMES[el.type]  || el.type;
    const stateName = STATE_NAMES[el.state] || el.state;
    const blockName = BLOCK_NAMES[el.block] || el.block;

    /* Builds uses list */
    const usesHTML = el.uses && el.uses.length > 0
      ? `<div class="em-uses">
           <div class="em-section-label">Usos principales</div>
           <div class="em-uses-list">
             ${el.uses.map(u => `<div class="em-use-item">${u}</div>`).join('')}
           </div>
         </div>`
      : '';

    /* Fact */
    const factHTML = el.fact
      ? `<div class="em-curiosity">
           <div class="em-section-label">Dato curioso</div>
           <p class="em-curiosity-text">${el.fact}</p>
         </div>`
      : '';

    /* Electronegatividad */
    const enStr = el.en !== null && el.en !== undefined ? el.en.toFixed(2) : '—';

    /* Periodo / Grupo / Bloque */
    const groupStr = el.group !== null && el.group !== undefined ? el.group : 'f-block';

    const modalHTML = `
      <!-- Cabecera del modal -->
      <div class="modal-header">
        <div class="element-modal-header" style="flex:1">
          <div class="element-modal-symbol-box ${typeClass}">
            <span class="em-z">${el.z}</span>
            <span class="em-symbol">${el.symbol}</span>
            <span class="em-mass">${el.mass}</span>
          </div>
          <div class="em-info">
            <h2>${el.name}</h2>
            <div style="font-family:var(--font-code);font-size:.78rem;
                        color:var(--text-secondary)">${el.symbol} · Z = ${el.z} · A = ${el.mass}</div>
            <div class="em-chips">
              <span class="em-chip" style="color:${typeColor};border-color:${typeColor}33">
                ${typeName}
              </span>
              <span class="em-chip">${stateName}</span>
              <span class="em-chip">${blockName}</span>
              <span class="em-chip">Período ${el.period}</span>
              <span class="em-chip">Grupo ${groupStr}</span>
            </div>
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">✕</button>
      </div>

      <!-- Configuración electrónica -->
      <div class="em-config">
        <div class="em-config-label">Configuración electrónica</div>
        <div class="em-config-value">${el.config || '—'}</div>
      </div>

      <!-- Datos numéricos -->
      <div class="em-data-grid">
        <div class="em-data-item">
          <div class="em-data-label">Masa atómica (u)</div>
          <div class="em-data-value">${el.mass}</div>
        </div>
        <div class="em-data-item">
          <div class="em-data-label">Electronegatividad</div>
          <div class="em-data-value">${enStr} ${el.en ? '(Pauling)' : ''}</div>
        </div>
        <div class="em-data-item">
          <div class="em-data-label">Estado físico (25°C)</div>
          <div class="em-data-value">${stateName}</div>
        </div>
        <div class="em-data-item">
          <div class="em-data-label">Bloque</div>
          <div class="em-data-value">${blockName}</div>
        </div>
      </div>

      <!-- Usos y dato curioso -->
      ${usesHTML}
      ${factHTML}
    `;

    /* Mostrar el modal global */
    const overlay  = document.getElementById('global-modal');
    const content  = document.getElementById('global-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = modalHTML;
    overlay.classList.remove('hidden');

    /* Cerrar modal */
    document.getElementById('modal-close-btn').addEventListener('click', _closeModal);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) _closeModal();
    });

    /* Tecla ESC */
    document.addEventListener('keydown', _onKeyDown);
  }

  function _closeModal() {
    const overlay = document.getElementById('global-modal');
    if (overlay) overlay.classList.add('hidden');
    document.removeEventListener('keydown', _onKeyDown);
  }

  function _onKeyDown(e) {
    if (e.key === 'Escape') _closeModal();
  }

  /* ── Actualización de la tabla (sin re-renderizar la página) ── */

  function _refreshTable() {
    const table = document.getElementById('periodic-table');
    if (!table) return;
    table.innerHTML = _renderTable();
    _bindTableEvents();
  }

  /* ── Eventos ────────────────────────────────────────────── */

  function _bindEvents() {
    /* Búsqueda */
    const searchInput = document.getElementById('pt-search');
    if (searchInput) {
      let searchTimer;
      searchInput.addEventListener('input', e => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          _search = e.target.value;
          _refreshTable();
          _updateFilterUI();
        }, 200);
      });
    }

    /* Botones de filtro */
    document.querySelectorAll('.pt-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _filter = btn.dataset.filter;
        document.querySelectorAll('.pt-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        _refreshTable();
      });
    });

    /* Ítems de la leyenda (también filtran) */
    document.querySelectorAll('.legend-item').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.dataset.legend;
        _filter = (_filter === key) ? 'all' : key;
        document.querySelectorAll('.pt-filter-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === _filter);
        });
        _refreshTable();
      });
    });

    /* Celdas de la tabla */
    _bindTableEvents();
  }

  function _bindTableEvents() {
    document.querySelectorAll('[data-action="open-element"]').forEach(cell => {
      cell.addEventListener('click', () => {
        const z = parseInt(cell.dataset.z, 10);
        if (!isNaN(z)) _openElementModal(z);
      });
    });
  }

  function _updateFilterUI() {
    /* Actualiza los textos del pie de la tabla */
    const info = document.querySelector('.periodic-page > p:last-child');
    if (info) {
      info.innerHTML = `
        Tabla Periódica de los Elementos Químicos · IUPAC 2024 ·
        <strong>${_filter !== 'all' ? `Mostrando: ${TYPE_NAMES[_filter] || ''}` : 'Todos los elementos'}</strong>
        ${_search ? `· Búsqueda: "${_escapeHTML(_search)}"` : ''}
      `;
    }
  }

  /* Utilidad */
  function _escapeHTML(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Interfaz del módulo ────────────────────────────────── */

  function init() {
    const content = document.getElementById('content');
    if (!content) return;

    /* Verificar que los datos de elementos estén cargados */
    if (typeof ELEMENTOS === 'undefined' || !ELEMENTOS.length) {
      content.innerHTML = `
        <div class="placeholder-page">
          <span class="placeholder-icon">⚠️</span>
          <h2>Error: Datos no cargados</h2>
          <p class="placeholder-desc">No se pudieron cargar los datos de elementos (js/data/elementos.js).</p>
        </div>
      `;
      return;
    }

    content.innerHTML = _buildPage();
    _bindEvents();

    /* XP por primera vez que se visita la tabla periódica */
    const data = Storage.load();
    if (!data.settings._visitedPT) {
      Gamification.addXP('section-visited');
      Storage.set('settings', { ...data.settings, _visitedPT: true });
    }
  }

  function destroy() {
    /* Asegurar que el modal global esté cerrado */
    _closeModal();
    _exploredEls.clear();
  }

  return { init, destroy };

})());
