/* ================================================================
   MÁSQUECIENCIA — js/modules/fisica10.js
   Vista "Física 10.º" — FIX10-U01
   ================================================================
   Mismo patrón EXACTO que js/modules/grade11.js (Química 11.º):
   mismas clases .units-grid/.unit-card del Design System, mismo
   sistema de pestañas (UNIT_PLUGINS) para la unidad con
   status:'active', mismo comportamiento de tarjeta "en desarrollo"
   para las unidades que todavía no existen.

   Diferencia deliberada: Física 10.º NO tiene "candado" de
   desbloqueo (a diferencia de Química 11.º) — es una disciplina
   paralela de acceso directo, no un nivel que se desbloquea
   completando otro. Por eso _renderGrid() no revisa ningún
   "fisica10Unlock".

   Apunta a FISICA10_UNIDADES_DATA / data.fisica10 / las funciones
   paralelas de Storage (updateFisica10Unit, etc.) — nunca se mezcla
   con Química 10.º ni 11.º.
================================================================ */

/* Metadatos de las 7 unidades de Física 10.º. Solo FIX10-U01 tiene
   contenido real (status:'active'); FIX10-U02..U07 quedan como
   "PRÓXIMAMENTE" hasta que se construyan (regla explícita del sprint:
   NO construirlas todavía). Los temas/simuladores/examen de FIX10-U01
   ya están fijados por el propio sprint (arquitectura), independiente
   del contenido detallado de cada tema (que sí depende del libro
   fuente y se completa en js/units/fisica10/fix10-u01.js). */
const FISICA10_UNIDADES_DATA = [
  {
    id: 'fix10-u01', num: 1, status: 'active',
    icon: '🔭', color: 'var(--violet)',
    title: 'La Física en el contexto histórico y actual',
    subtitle: null,
    description: 'Qué estudia la Física, la diferencia entre Física teórica y experimental, y su relación con la tecnología y la sociedad.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 30, pass: 70 }
  },
  { id: 'fix10-u02', num: 2, status: 'active',
    icon: '📐', color: 'var(--violet)',
    title: 'Cantidades escalares y vectoriales',
    subtitle: null,
    description: 'Diferencia entre magnitudes escalares y vectoriales, distancia/desplazamiento, rapidez/velocidad, suma de vectores y su relación con el GPS.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 30, pass: 70 }
  },
  { id: 'fix10-u03', num: 3, status: 'active',
    icon: '🎯', color: 'var(--violet)',
    title: 'Movimiento Relativo',
    subtitle: null,
    description: 'El movimiento depende del observador: marco de referencia, velocidad relativa, y cómo calcularla con dirección y signos.',
    topics: ['t1', 't2', 't3', 't4'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 6 },
    exam: { perExam: 30, pass: 70 }
  },
  { id: 'fix10-u04', num: 4, status: 'development', icon: '⚡', color: 'var(--violet)', title: 'Próxima unidad de Física', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] },
  { id: 'fix10-u05', num: 5, status: 'development', icon: '🌊', color: 'var(--violet)', title: 'Próxima unidad de Física', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] },
  { id: 'fix10-u06', num: 6, status: 'development', icon: '🔥', color: 'var(--violet)', title: 'Próxima unidad de Física', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] },
  { id: 'fix10-u07', num: 7, status: 'development', icon: '🧲', color: 'var(--violet)', title: 'Próxima unidad de Física', description: 'En desarrollo — próxima actualización.', topics: [], simulators: [] }
];

/* ================================================================
   BANDERA DE PUBLICACIÓN — FIX10-U01
   ================================================================
   Mientras FISICA10_PUBLICO sea false, la unidad real queda oculta
   para cualquier visitante normal (ven "En desarrollo", igual que
   antes) — el código ya está subido y probado, pero nadie más que
   vos puede verlo hasta que decidas lanzarlo.

   Para revisarlo vos mismo en tu propio navegador, sin publicarlo
   todavía: entrá una sola vez a tu sitio con
     ?fisica10preview=1
   (ej. https://bryan25prof.github.io/MasQueCiencia/?fisica10preview=1)
   Eso activa la vista previa SOLO en ese navegador, para siempre
   (queda guardado localmente) — el resto de las visitas normales al
   sitio, desde cualquier otro dispositivo, lo siguen viendo como "En
   desarrollo".

   Cuando quieras publicarlo para todos los estudiantes, cambiá esta
   única línea a "true" y volvé a subir este archivo. Nada más. */
const FISICA10_PUBLICO = false;
const FISICA10_PREVIEW_KEY = 'mqc_fisica10_preview';
try {
  const params = new URLSearchParams(window.location.search);
  if (params.get('fisica10preview') === '1') localStorage.setItem(FISICA10_PREVIEW_KEY, '1');
} catch (e) { /* URLSearchParams no disponible: se ignora, sigue oculto por defecto */ }
function _fisica10Habilitado() {
  if (FISICA10_PUBLICO) return true;
  try { return localStorage.getItem(FISICA10_PREVIEW_KEY) === '1'; } catch (e) { return false; }
}

Router.register('fisica10', (() => {
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
    const cards = FISICA10_UNIDADES_DATA.map(u => {
      if (u.status === 'active') {
        const pct = Storage.getFisica10UnitProgress(u.id);
        return `
          <div class="unit-card" style="--unit-color:${u.color}" data-action="open-fisica10-unit" data-unit="${u.id}">
            <div class="unit-badge" style="color:${u.color};border-color:${u.color}55">✓ Disponible</div>
            <div class="unit-number">FIX10-U0${u.num}</div>
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
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-fisica10-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">FIX10-U0${u.num}</div>
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
        <p class="section-title">Décimo Año</p><h2 class="section-heading">⚛️ Física 10.º</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:1.5rem;max-width:60ch">
        La primera unidad ya está disponible. Las siguientes se irán incorporando gradualmente.
      </p>
      <div class="units-grid">${cards}</div>
    `;
  }

  function _renderInfo(unitId) {
    const u = FISICA10_UNIDADES_DATA.find(x => x.id === unitId);
    if (!u) return _renderGrid();
    return `
      <button class="btn btn-ghost btn-sm" data-action="back-grid" style="margin-bottom:.8rem">← Física 10.º</button>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:560px">
        <div class="unit-badge" style="position:static;display:inline-block;color:var(--text-muted);border-color:var(--border);margin-bottom:.8rem">🚧 En desarrollo</div>
        <div style="font-size:2rem;color:${u.color};text-shadow:0 0 20px ${u.color}">${u.icon}</div>
        <h3 style="margin:.4rem 0 .1rem">${u.title}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6">${u.description}</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.9rem 1rem;margin-top:1rem;font-size:.85rem;color:var(--text-secondary);line-height:1.6">
          Esta experiencia se encuentra en desarrollo.<br><br>
          Tu acceso a Física 10.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización.
        </div>
        <button class="btn btn-primary btn-sm" data-action="back-grid" style="margin-top:1.2rem">Volver a Física 10.º</button>
      </div>
    `;
  }

  function _renderUnitDetail(unitId) {
    const unit = FISICA10_UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) return _renderGrid();
    const uData = Storage.load().fisica10[unitId] || {};
    const pct = Storage.getFisica10UnitProgress(unitId);
    return `
      <div id="fisica10-unit-root">
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.icon}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">UNIDAD ${unit.num} · FÍSICA 10.º</p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.title}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas · ${unit.simulators.length} simuladores · 1 juego · Examen ${unit.exam.perExam} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%;background:${unit.color}"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="back-grid">← Física 10.º</button>
        </div>

        <div class="unit-detail-tabs" id="fisica10-unit-tabs">
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
      try { plugin.bind(unit, uData); } catch (e) { console.warn('[fisica10 plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  function _bindUnitDetailEvents() {
    document.querySelectorAll('#fisica10-unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _currentTab = btn.dataset.tab;
        const unit = FISICA10_UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().fisica10[_currentUnitId] || {};
        document.querySelectorAll('#fisica10-unit-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = document.getElementById('tab-content');
        if (tc) {
          tc.innerHTML = _renderTab(unit, _currentTab, uData);
          _callPluginBind(unit, _currentTab, uData);
        }
      });
    });
    const back = document.querySelector('#fisica10-unit-root [data-action="back-grid"]');
    if (back) back.addEventListener('click', () => { _currentUnitId = null; _currentTab = 'teoria'; _rerender(); });

    const unit0 = FISICA10_UNIDADES_DATA.find(u => u.id === _currentUnitId);
    const uData0 = Storage.load().fisica10[_currentUnitId] || {};
    if (unit0) _callPluginBind(unit0, _currentTab, uData0);
  }

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _currentUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-fisica10-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
    document.querySelectorAll('[data-action="open-fisica10-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentUnitId = el.getAttribute('data-unit');
        _currentTab = 'teoria';
        _rerender();
        const data = Storage.load();
        const uData = data.fisica10[_currentUnitId] || {};
        if (!uData.started) {
          Gamification.addXP('unit-started');
          Storage.updateFisica10Unit(_currentUnitId, { started: true });
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
        <p class="section-title">Décimo Año</p><h2 class="section-heading">⚛️ Física 10.º</h2>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:520px;text-align:center">
        <div style="font-size:2rem">⚛️</div>
        <h3 style="margin:.4rem 0">En desarrollo</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">Próximamente nuevas experiencias de aprendizaje.</p>
      </div>`;
  }

  function init() {
    if (!_fisica10Habilitado()) {
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
