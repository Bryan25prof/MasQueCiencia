/* ================================================================
   MÁSQUECIENCIA — js/modules/biologia10.js
   Vista "Biología 10.º" — BIO10-U01
   ================================================================
   Mismo patrón EXACTO que js/modules/fisica10.js: mismas clases
   .units-grid/.unit-card del Design System, mismo sistema de
   pestañas (UNIT_PLUGINS) para la unidad con status:'active', mismo
   comportamiento de tarjeta "en desarrollo" para las unidades que
   todavía no existen.

   Fuente académica de BIO10-U01: "Biología 10º: Un Enfoque
   Práctico", Licda. Kathia Eugenia Hernández Camacho, Editorial
   Didáctica Multimedia, 6.ª edición, 2018 (ISBN 978-9968-9553-5-5),
   Unidad I / Tema 1: "Las formas de vida y el entorno biofísico"
   (páginas 8-44). El contenido detallado de cada tema vive en
   js/units/biologia10/bio10-u01.js — este archivo solo define
   metadatos (BIOLOGIA10_UNIDADES_DATA) y el enrutamiento/render de
   la vista, igual que fisica10.js hace para FIX10-U01.

   Diferencia deliberada: Biología 10.º NO tiene "candado" de
   desbloqueo (a diferencia de Química 11.º) — es una disciplina
   paralela de acceso directo, no un nivel que se desbloquea
   completando otro. Por eso _renderGrid() no revisa ningún
   "biologia10Unlock".

   Apunta a BIOLOGIA10_UNIDADES_DATA / data.biologia10 / las
   funciones paralelas de Storage (updateBiologia10Unit, etc.) —
   nunca se mezcla con Química ni Física.
================================================================ */

/* Metadatos de las 9 unidades de Biología 10.º (tabla de contenidos
   real del libro fuente). BIO10-U01, BIO10-U02 y BIO10-U03 ya tienen
   contenido real (status:'active'); BIO10-U04..U09 quedan como
   "PRÓXIMAMENTE". El PDF del libro fuente presentó daño real y
   confirmado (con qpdf/pikepdf/pdftoppm) en puntos puntuales a partir
   de la Unidad III: una página en blanco, una página faltante por
   completo y un recuadro de indicadores vacío. Con autorización
   explícita de Bryan, esos puntos puntuales de BIO10-U03 se
   reconstruyeron a partir del Programa de Estudio oficial de
   Biología del MEP (ver cabecera de bio10-u03.js) — el resto de la
   unidad es contenido real del libro. BIO10-U04..U09 (poblaciones,
   variabilidad genética, herencia, fuerzas evolutivas, evidencias
   evolutivas, origen de la vida) siguen esperando que se pueda leer
   el resto del libro de forma confiable. Regla explícita del sprint:
   NO construirlas todavía ni inventar su contenido sin una fuente. */
const BIOLOGIA10_UNIDADES_DATA = [
  { id: 'bio10-u01', num: 1, status: 'active',
    icon: '🧬', color: 'var(--green)',
    title: 'Las formas de vida y el entorno biofísico',
    subtitle: null,
    description: 'Qué estudia la Biología, sus áreas de estudio, las adaptaciones biológicas y su relación con el medio ambiente — incluye las adaptaciones humanas.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u02', num: 2, status: 'active',
    icon: '🌿', color: 'var(--green)',
    title: 'La biodiversidad',
    subtitle: null,
    description: 'Especie, población y biodiversidad, cómo se mide, los ecosistemas, las amenazas que enfrenta y cómo se protege — con datos reales de Costa Rica.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u03', num: 3, status: 'active',
    icon: '🌎', color: 'var(--green)',
    title: 'Ecología',
    subtitle: null,
    description: 'Componentes del ecosistema, factores ambientales, la diferencia entre hábitat y nicho, la fragmentación del hábitat y por qué importa conservarlo — con casos reales de Costa Rica.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u04', num: 4, status: 'coming',
    icon: '👥', color: 'var(--green)',
    title: 'Las poblaciones biológicas',
    subtitle: null,
    description: 'Próximamente: dinámica y características de las poblaciones biológicas.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u05', num: 5, status: 'coming',
    icon: '🧪', color: 'var(--green)',
    title: 'Causas de la variabilidad genética',
    subtitle: null,
    description: 'Próximamente: mutaciones, recombinación y otras causas de la variabilidad genética.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u06', num: 6, status: 'coming',
    icon: '🧫', color: 'var(--green)',
    title: 'La herencia y su manipulación',
    subtitle: null,
    description: 'Próximamente: leyes de la herencia y biotecnología aplicada a la manipulación genética.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u07', num: 7, status: 'coming',
    icon: '🦎', color: 'var(--green)',
    title: 'Las fuerzas evolutivas',
    subtitle: null,
    description: 'Próximamente: selección natural, deriva genética y otros mecanismos de la evolución.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u08', num: 8, status: 'coming',
    icon: '🦴', color: 'var(--green)',
    title: 'Evidencias del proceso evolutivo',
    subtitle: null,
    description: 'Próximamente: registro fósil, anatomía comparada y otras evidencias de la evolución.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio10-u09', num: 9, status: 'coming',
    icon: '🌌', color: 'var(--green)',
    title: 'Teorías sobre el origen de la vida y las especies',
    subtitle: null,
    description: 'Próximamente: teorías sobre el origen de la vida y el origen de las especies.',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  }
];

/* ================================================================
   BANDERA DE PUBLICACIÓN — BIO10-U01
   ================================================================
   Mismo mecanismo EXACTO que Física (ver js/shared/mqc-biologia-flags.js
   y su explicación del bug histórico de Física que este patrón evita
   desde el día uno). Mientras BIOLOGIA10_PUBLICO sea false, la unidad
   real queda oculta para cualquier visitante normal (ven "En
   desarrollo") — el código ya está construido y probado, pero nadie
   más que Bryan puede verlo hasta que decida lanzarlo.

   Para revisarlo en un navegador propio, sin publicarlo todavía:
     ?biologia10preview=1
   Igual que el mecanismo ya usado para Física — queda guardado
   localmente en ese navegador únicamente. */
const BIOLOGIA10_PUBLICO = false; /* EN REVISIÓN — BIO10-U01 recién construida, 25 de setiembre de 2026 */
const BIOLOGIA10_PREVIEW_KEY = 'mqc_biologia10_preview';
try {
  const params = new URLSearchParams(window.location.search);
  if (params.get('biologia10preview') === '1') localStorage.setItem(BIOLOGIA10_PREVIEW_KEY, '1');
} catch (e) { /* URLSearchParams no disponible: se ignora, sigue oculto por defecto */ }
function _biologia10Habilitado() {
  const habilitadoReal = BIOLOGIA10_PUBLICO || (function () {
    try { return localStorage.getItem(BIOLOGIA10_PREVIEW_KEY) === '1'; } catch (e) { return false; }
  })();
  return (typeof AccessControl !== 'undefined' && AccessControl.canExplore) ? AccessControl.canExplore(habilitadoReal) : habilitadoReal;
}

Router.register('biologia10', (() => {
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
    const cards = BIOLOGIA10_UNIDADES_DATA.map(u => {
      if (u.status === 'active') {
        const pct = Storage.getBiologia10UnitProgress(u.id);
        return `
          <div class="unit-card" style="--unit-color:${u.color}" data-action="open-biologia10-unit" data-unit="${u.id}">
            <div class="unit-badge" style="color:${u.color};border-color:${u.color}55">✓ Disponible</div>
            <div class="unit-number">BIO10-U0${u.num}</div>
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
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-biologia10-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">BIO10-U0${u.num}</div>
        <div class="unit-symbol">${u.icon}</div>
        <div class="unit-name">${u.title}</div>
        <div class="unit-meta">
          <span class="unit-meta-item unit-meta-item-clamp">${u.description}</span>
        </div>
      </div>`;
    }).join('');

    return `
      <div class="section-header">
        <button class="btn btn-ghost btn-sm" data-action="back-select" style="margin-bottom:.8rem">← Biología</button>
        <p class="section-title">Décimo Año</p><h2 class="section-heading">🧬 Biología 10.º</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:.6rem;max-width:60ch">
        Biología 10.° está en desarrollo progresivo. Explorá las unidades disponibles y continuá construyendo tu dominio de la Biología.
      </p>
      <div class="units-grid">${cards}</div>
    `;
  }

  function _renderInfo(unitId) {
    const u = BIOLOGIA10_UNIDADES_DATA.find(x => x.id === unitId);
    if (!u) return _renderGrid();
    return `
      <button class="btn btn-ghost btn-sm" data-action="back-grid" style="margin-bottom:.8rem">← Biología 10.º</button>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:560px">
        <div class="unit-badge" style="position:static;display:inline-block;color:var(--text-muted);border-color:var(--border);margin-bottom:.8rem">🚧 En desarrollo</div>
        <div style="font-size:2rem;color:${u.color};text-shadow:0 0 20px ${u.color}">${u.icon}</div>
        <h3 style="margin:.4rem 0 .1rem">${u.title}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6">${u.description}</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.9rem 1rem;margin-top:1rem;font-size:.85rem;color:var(--text-secondary);line-height:1.6">
          Esta experiencia se encuentra en desarrollo.<br><br>
          Tu acceso a Biología 10.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización.
        </div>
        <button class="btn btn-primary btn-sm" data-action="back-grid" style="margin-top:1.2rem">Volver a Biología 10.º</button>
      </div>
    `;
  }

  function _renderUnitDetail(unitId) {
    const unit = BIOLOGIA10_UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) return _renderGrid();
    const uData = Storage.load().biologia10[unitId] || {};
    const pct = Storage.getBiologia10UnitProgress(unitId);
    return `
      <div id="biologia10-unit-root">
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.icon}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">UNIDAD ${unit.num} · BIOLOGÍA 10.º</p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.title}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas · ${unit.simulators.length} simuladores · 1 juego · Examen ${unit.exam.perExam} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%;background:${unit.color}"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="back-grid">← Biología 10.º</button>
        </div>

        <div class="unit-detail-tabs" id="biologia10-unit-tabs">
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
      try { plugin.bind(unit, uData); } catch (e) { console.warn('[biologia10 plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  function _bindUnitDetailEvents() {
    document.querySelectorAll('#biologia10-unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        /* Mismo hotfix que fisica10.js: reclicks sobre la misma
           pestaña no vuelven a renderizar/re-vincular nada. */
        if (_currentTab === btn.dataset.tab) return;
        _currentTab = btn.dataset.tab;
        const unit = BIOLOGIA10_UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().biologia10[_currentUnitId] || {};
        document.querySelectorAll('#biologia10-unit-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = document.getElementById('tab-content');
        if (tc) {
          tc.innerHTML = _renderTab(unit, _currentTab, uData);
          _callPluginBind(unit, _currentTab, uData);
        }
      });
    });
    const back = document.querySelector('#biologia10-unit-root [data-action="back-grid"]');
    if (back) back.addEventListener('click', () => { _currentUnitId = null; _currentTab = 'teoria'; _rerender(); });

    const unit0 = BIOLOGIA10_UNIDADES_DATA.find(u => u.id === _currentUnitId);
    const uData0 = Storage.load().biologia10[_currentUnitId] || {};
    if (unit0) _callPluginBind(unit0, _currentTab, uData0);
  }

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _currentUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-biologia10-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
    document.querySelectorAll('[data-action="open-biologia10-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentUnitId = el.getAttribute('data-unit');
        _currentTab = 'teoria';
        _rerender();
        const data = Storage.load();
        const uData = data.biologia10[_currentUnitId] || {};
        if (!uData.started) {
          Gamification.addXP('unit-started', { disciplina: 'biologia', grado: 10 });
          Storage.updateBiologia10Unit(_currentUnitId, { started: true });
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
        <button class="btn btn-ghost btn-sm" data-action="back-select" style="margin-bottom:.8rem">← Biología</button>
        <p class="section-title">Décimo Año</p><h2 class="section-heading">🧬 Biología 10.º</h2>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:520px;text-align:center">
        <div style="font-size:2rem">🧬</div>
        <h3 style="margin:.4rem 0">En desarrollo</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">Próximamente nuevas experiencias de aprendizaje.</p>
      </div>`;
  }

  /* Mismo soporte aditivo de unitId que fisica10.js, para que el
     panel contextual del sidebar abra una unidad de Biología 10.º
     directamente. Si la bandera de publicación todavía no está
     activa, el unitId se ignora y se muestra la misma pantalla "En
     desarrollo" de siempre — nunca se salta esa bandera. */
  function init(params) {
    if (!_biologia10Habilitado()) {
      const content = document.getElementById('content');
      if (content) {
        content.innerHTML = _renderNoPublicoTodavia();
        const back = content.querySelector('[data-action="back-select"]');
        if (back) back.addEventListener('click', () => Router.navigate('grade-select'));
      }
      return;
    }
    _currentTab = 'teoria';
    const unitId = params && params.unitId;
    if (unitId) {
      const u = BIOLOGIA10_UNIDADES_DATA.find(x => x.id === unitId);
      if (u && u.status === 'active') { _infoUnitId = null; _currentUnitId = unitId; }
      else { _infoUnitId = unitId; _currentUnitId = null; }
    } else {
      _infoUnitId = null;
      _currentUnitId = null;
    }
    _rerender();

    if (_currentUnitId) {
      const data = Storage.load();
      const uData = data.biologia10[_currentUnitId] || {};
      if (!uData.started) {
        Gamification.addXP('unit-started', { disciplina: 'biologia', grado: 10 });
        Storage.updateBiologia10Unit(_currentUnitId, { started: true });
      }
    }
  }

  function destroy() { _infoUnitId = null; _currentUnitId = null; }

  return { init, destroy };
})());
