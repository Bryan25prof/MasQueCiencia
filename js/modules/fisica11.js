/* ================================================================
   MÁSQUECIENCIA — js/modules/fisica11.js
   Vista "Física 11.º" — RUTA DE CIERRE, FASE 1
   ================================================================
   Mismo patrón EXACTO que js/modules/fisica10.js: mismas clases
   .units-grid/.unit-card, mismo sistema de pestañas (UNIT_PLUGINS),
   mismo candado de vista previa (independiente del de Física 10.º).
   Apunta a FISICA11_UNIDADES_DATA / data.fisica11 / las funciones
   paralelas de Storage (updateFisica11Unit, etc.) — nunca se mezcla
   con Física 10.º ni Química.
================================================================ */

/* Metadatos de las 6 unidades de Física 11.º (confirmadas contra el
   índice real del libro "Física 11° — Un enfoque Práctico"):
   FIX11-U01 Hidrostática, FIX11-U02 Electrostática, FIX11-U03
   Electricidad, FIX11-U04 Magnetismo y electromagnetismo, FIX11-U05
   Movimiento ondulatorio, FIX11-U06 Teoría de la Relatividad (la más
   corta, según el propio índice). Solo FIX11-U01 tiene contenido
   real por ahora. */
const FISICA11_UNIDADES_DATA = [
  { id: 'fix11-u01', num: 1, status: 'active',
    icon: '🌊', color: 'var(--violet)',
    title: 'Hidrostática',
    subtitle: null,
    description: 'Densidad, presión, presión atmosférica, Principio de Pascal, Principio de Arquímedes, y la Ley de Boyle.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 7 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'fix11-u02', num: 2, status: 'active',
    icon: '⚡', color: 'var(--violet)',
    title: 'Electrostática',
    subtitle: null,
    description: 'El modelo atómico y la carga eléctrica, clasificación de materiales según su conducción, Ley de Coulomb, campo eléctrico, y energía potencial eléctrica.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 7 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'fix11-u03', num: 3, status: 'active',
    icon: '🔌', color: 'var(--violet)',
    title: 'Electricidad',
    subtitle: null,
    description: 'El flujo de electrones, corriente continua y alterna, la Ley de Ohm, potencia eléctrica, y circuitos en serie, paralelo y mixtos.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 7 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'fix11-u04', num: 4, status: 'active',
    icon: '🧭', color: 'var(--violet)',
    title: 'Magnetismo y electromagnetismo',
    subtitle: null,
    description: 'Imanes y polos magnéticos, el experimento de Oersted, campo magnético en bobinas y solenoides, magnetismo terrestre, y el experimento de Faraday.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 7 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'fix11-u05', num: 5, status: 'development', icon: '🌐', color: 'var(--violet)', title: 'Movimiento ondulatorio', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] },
  { id: 'fix11-u06', num: 6, status: 'development', icon: '🌀', color: 'var(--violet)', title: 'Teoría de la Relatividad', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] }
];

/* ================================================================
   BANDERA DE PUBLICACIÓN — FIX11-U01 (independiente de Física 10.º)
   ================================================================
   Mismo mecanismo exacto que Física 10.º: mientras FISICA11_PUBLICO
   sea false, la unidad real queda oculta para cualquier visitante
   normal. Para vista previa: ?fisica11preview=1 (una vez, queda
   guardado en ese navegador). Para publicar a todos: cambiar esta
   línea a "true". */
const FISICA11_PUBLICO = false;
const FISICA11_PREVIEW_KEY = 'mqc_fisica11_preview';
try {
  const params = new URLSearchParams(window.location.search);
  if (params.get('fisica11preview') === '1') localStorage.setItem(FISICA11_PREVIEW_KEY, '1');
} catch (e) { /* URLSearchParams no disponible: se ignora, sigue oculto por defecto */ }
function _fisica11Habilitado() {
  if (FISICA11_PUBLICO) return true;
  try { return localStorage.getItem(FISICA11_PREVIEW_KEY) === '1'; } catch (e) { return false; }
}

Router.register('fisica11', (() => {
  'use strict';

  let _infoUnitId = null;
  let _currentUnitId = null;
  let _currentTab = 'teoria';

  const TABS = [
    { id: 'teoria',      label: '📖 Teoría' },
    { id: 'simuladores', label: '🔬 Simuladores' },
    { id: 'juego',       label: '🎮 Juego' },
    { id: 'examen',      label: '📝 Examen' },
    { id: 'mision',      label: '🔎 Misión' }
  ];

  function _renderGrid() {
    const cards = FISICA11_UNIDADES_DATA.map(u => {
      if (u.status === 'active') {
        const pct = Storage.getFisica11UnitProgress(u.id);
        return `
          <div class="unit-card" style="--unit-color:${u.color}" data-action="open-fisica11-unit" data-unit="${u.id}">
            <div class="unit-badge" style="color:${u.color};border-color:${u.color}55">✓ Disponible</div>
            <div class="unit-number">FIX11-U0${u.num}</div>
            <div class="unit-symbol">${u.icon}</div>
            <div class="unit-name">${u.title}</div>
            <div class="unit-meta">
              <span class="unit-meta-item">${u.topics.length} temas · ${u.simulators.length} simuladores</span>
              <div class="unit-progress">
                <div class="unit-progress-bar"><div class="unit-progress-fill" style="width:${pct}%;background:${u.color}"></div></div>
                <span>${pct}%</span>
              </div>
            </div>
          </div>`;
      }
      return `
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-fisica11-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">FIX11-U0${u.num}</div>
        <div class="unit-symbol">${u.icon}</div>
        <div class="unit-name">${u.title}</div>
        <div class="unit-meta">
          <span class="unit-meta-item unit-meta-item-clamp">${u.description}</span>
        </div>
      </div>`;
    }).join('');

    return `
      <div class="section-header">
        <button class="btn btn-ghost btn-sm" data-action="back-select" style="margin-bottom:.8rem">← Física</button>
        <p class="section-title">Undécimo Año</p><h2 class="section-heading">⚛️ Física 11.º</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:1.5rem;max-width:60ch">
        Física 11.° está en desarrollo progresivo. Explorá las unidades disponibles y continuá construyendo tu dominio de la Física.
      </p>
      <div class="units-grid">${cards}</div>
    `;
  }

  function _renderInfo(unitId) {
    const u = FISICA11_UNIDADES_DATA.find(x => x.id === unitId);
    if (!u) return _renderGrid();
    return `
      <button class="btn btn-ghost btn-sm" data-action="back-grid" style="margin-bottom:.8rem">← Física 11.º</button>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:560px">
        <div class="unit-badge" style="position:static;display:inline-block;color:var(--text-muted);border-color:var(--border);margin-bottom:.8rem">🚧 En desarrollo</div>
        <div style="font-size:2rem;color:${u.color};text-shadow:0 0 20px ${u.color}">${u.icon}</div>
        <h3 style="margin:.4rem 0 .1rem">${u.title}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6">${u.description}</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.9rem 1rem;margin-top:1rem;font-size:.85rem;color:var(--text-secondary);line-height:1.6">
          Esta experiencia se encuentra en desarrollo.<br><br>
          Tu acceso a Física 11.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización.
        </div>
        <button class="btn btn-primary btn-sm" data-action="back-grid" style="margin-top:1.2rem">Volver a Física 11.º</button>
      </div>
    `;
  }

  function _renderUnitDetail(unitId) {
    const unit = FISICA11_UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) return _renderGrid();
    const uData = Storage.load().fisica11[unitId] || {};
    const pct = Storage.getFisica11UnitProgress(unitId);
    return `
      <div id="fisica11-unit-root">
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.icon}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">UNIDAD ${unit.num} · FÍSICA 11.º</p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.title}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas · ${unit.simulators.length} simuladores · 1 juego · Examen ${unit.exam.perExam} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%;background:${unit.color}"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="back-grid">← Física 11.º</button>
        </div>

        <div class="unit-detail-tabs" id="fisica11-unit-tabs">
          ${TABS.map(t => `<button class="tab-btn ${_currentTab === t.id ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
        </div>

        <div id="tab-content">${_renderTab(unit, _currentTab, uData)}</div>
      </div>
    `;
  }

  function _renderTab(unit, tab, uData) {
    const key = `${unit.id}:${tab}`;
    const plugin = window.UNIT_PLUGINS && window.UNIT_PLUGINS[key];
    if (plugin && plugin.render) return plugin.render(unit, uData);
    return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span><h3>Contenido no disponible</h3><p style="color:var(--text-secondary)">Falta el módulo de "${tab}" para ${unit.id}.</p></div>`;
  }

  function _callPluginBind(unit, tab, uData) {
    const key = `${unit.id}:${tab}`;
    const plugin = window.UNIT_PLUGINS && window.UNIT_PLUGINS[key];
    if (plugin && typeof plugin.bind === 'function') {
      try { plugin.bind(unit, uData); } catch (e) { console.warn('[fisica11 plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  function _bindUnitDetailEvents() {
    document.querySelectorAll('#fisica11-unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        /* HOTFIX: mismo fix que fisica10.js — ver comentario ahí. */
        if (_currentTab === btn.dataset.tab) return;
        _currentTab = btn.dataset.tab;
        const unit = FISICA11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().fisica11[_currentUnitId] || {};
        document.querySelectorAll('#fisica11-unit-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = document.getElementById('tab-content');
        if (tc) {
          tc.innerHTML = _renderTab(unit, _currentTab, uData);
          _callPluginBind(unit, _currentTab, uData);
        }
      });
    });
    const back = document.querySelector('#fisica11-unit-root [data-action="back-grid"]');
    if (back) back.addEventListener('click', () => { _currentUnitId = null; _currentTab = 'teoria'; _rerender(); });

    const unit0 = FISICA11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
    const uData0 = Storage.load().fisica11[_currentUnitId] || {};
    if (unit0) _callPluginBind(unit0, _currentTab, uData0);
  }

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _currentUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-fisica11-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
    document.querySelectorAll('[data-action="open-fisica11-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentUnitId = el.getAttribute('data-unit');
        _currentTab = 'teoria';
        _rerender();
        const data = Storage.load();
        const uData = data.fisica11[_currentUnitId] || {};
        if (!uData.started) {
          Gamification.addXP('unit-started');
          Storage.updateFisica11Unit(_currentUnitId, { started: true });
        }
      });
    });
  }

  function _rerender() {
    const content = document.getElementById('content');
    if (!content) return;
    if (_currentUnitId) {
      content.innerHTML = _renderUnitDetail(_currentUnitId);
      _bindUnitDetailEvents();
    } else {
      content.innerHTML = _infoUnitId ? _renderInfo(_infoUnitId) : _renderGrid();
      _bind();
    }
  }

  function _renderNoPublicoTodavia() {
    return `
      <div class="section-header">
        <button class="btn btn-ghost btn-sm" data-action="back-select" style="margin-bottom:.8rem">← Física</button>
        <p class="section-title">Undécimo Año</p><h2 class="section-heading">⚛️ Física 11.º</h2>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:520px;text-align:center">
        <div style="font-size:2rem">⚛️</div>
        <h3 style="margin:.4rem 0">En desarrollo</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">Próximamente nuevas experiencias de aprendizaje.</p>
      </div>`;
  }

  function init() {
    if (!_fisica11Habilitado()) {
      const content = document.getElementById('content');
      if (content) {
        content.innerHTML = _renderNoPublicoTodavia();
        const back = content.querySelector('[data-action="back-select"]');
        if (back) back.addEventListener('click', () => Router.navigate('grade-select'));
      }
      return;
    }
    _infoUnitId = null;
    _currentUnitId = null;
    _currentTab = 'teoria';
    _rerender();
  }

  function destroy() { _infoUnitId = null; _currentUnitId = null; }

  return { init, destroy };
})());
