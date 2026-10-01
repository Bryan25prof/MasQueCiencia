/* ================================================================
   MÁSQUECIENCIA — js/modules/biologia11.js
   Vista "Biología 11.º" — arranque de las 5 unidades del programa
   oficial del MEP
   ================================================================
   Mismo patrón EXACTO que js/modules/biologia10.js (que a su vez
   sigue el mismo patrón que fisica10.js/fisica11.js): mismas clases
   .units-grid/.unit-card del Design System, mismo sistema de
   pestañas (UNIT_PLUGINS) para las unidades con status:'active',
   mismo comportamiento de tarjeta "en desarrollo" para las que
   todavía no existen.

   FUENTE ACADÉMICA — a diferencia de Biología 10.º (que tiene un
   libro de texto privado), Biología 11.º NO tiene libro de texto
   propio: su fuente primaria y transparente es el Programa de
   Estudio oficial de Biología del MEP, "Educar para una nueva
   ciudadanía" (Ministerio de Educación Pública de Costa Rica),
   sección "Undécimo año de Educación Académica; Duodécimo año de
   Educación Técnica", páginas 61-77 (Ejes temáticos I, II y III,
   sub-temas viii a xii del Anexo 1, página 82-84). Cada una de las 5
   unidades corresponde exactamente a uno de esos 5 sub-temas
   oficiales — ver la cabecera de cada js/units/biologia11/bio11-u0X.js
   para el detalle de qué páginas exactas sustentan cada tema.

   Metadatos base (BIOLOGIA11_UNIDADES_DATA) originalmente
   "congelados" en js/data/plan-biologia11.js — ese archivo queda
   ahora ABSORBIDO por este módulo (no se carga por separado en
   index.html).

   Diferencia deliberada: igual que Biología 10.º, Biología 11.º NO
   tiene "candado" de desbloqueo — es una disciplina paralela de
   acceso directo dentro del nivel Undécimo.

   Apunta a BIOLOGIA11_UNIDADES_DATA / data.biologia11 / las
   funciones paralelas de Storage (updateBiologia11Unit, etc.) —
   nunca se mezcla con Química, Física ni Biología 10.º.
================================================================ */

/* Metadatos de las 5 unidades de Biología 11.º (tabla de contenidos
   real del programa oficial del MEP — Anexo 1, sub-temas viii a xii).
   Las 5 unidades ya tienen contenido real (status:'active'),
   construido íntegramente a partir del Programa de Estudio oficial
   de Biología del MEP (páginas 61-77) — Biología 11.º no tiene libro
   de texto propio como Décimo, así que el programa oficial es la
   única fuente, transparentemente documentada en la cabecera de cada
   bio11-u0X.js. El número de temas de cada unidad varía (4 a 6) según
   lo que su sub-tema oficial realmente sostiene con calidad — nunca
   se forzó a 6 por consistencia superficial (ver BIO11-U04, la
   unidad más breve del programa, con 4 temas). */
const BIOLOGIA11_UNIDADES_DATA = [
  { id: 'bio11-u01', num: 1, status: 'active',
    icon: '🤝', color: 'var(--green)',
    title: 'Interacciones entre poblaciones',
    subtitle: null,
    description: 'Relaciones intraespecíficas e interespecíficas (depredación, parasitismo, competencia, simbiosis), coevolución y endosimbiosis, y enfermedades transmitidas por vectores — con casos reales de Costa Rica.',
    topics: ['t1', 't2', 't3', 't4', 't5'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u02', num: 2, status: 'active',
    icon: '🍃', color: 'var(--green)',
    title: 'Relaciones tróficas y flujo de energía',
    subtitle: null,
    description: 'Niveles tróficos, cadenas y redes alimenticias, pirámides de energía y las leyes físicas que las rigen, productividad primaria, y bioacumulación/biomagnificación.',
    topics: ['t1', 't2', 't3', 't4', 't5'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u03', num: 3, status: 'active',
    icon: '♻️', color: 'var(--green)',
    title: 'Ciclos biogeoquímicos y sostenibilidad',
    subtitle: null,
    description: 'Reciclaje de nutrientes, fotosíntesis y respiración celular, los ciclos del carbono, nitrógeno, azufre, fósforo y agua, y la gestión sostenible del recurso hídrico.',
    topics: ['t1', 't2', 't3', 't4', 't5', 't6'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u04', num: 4, status: 'active',
    icon: '🌱', color: 'var(--green)',
    title: 'Sucesión y restauración de ecosistemas',
    subtitle: null,
    description: 'Sucesión ecológica primaria y secundaria, perturbaciones naturales, recuperación y resiliencia de ecosistemas, y el impacto de las acciones humanas.',
    topics: ['t1', 't2', 't3', 't4'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u05', num: 5, status: 'active',
    icon: '🌍', color: 'var(--green)',
    title: 'Desarrollo sostenible y cambio climático',
    subtitle: null,
    description: 'Áreas protegidas, los servicios que brinda la biodiversidad, sostenibilidad y desarrollo sostenible, problemáticas ambientales globales, y proyectos de responsabilidad ambiental ciudadana.',
    topics: ['t1', 't2', 't3', 't4', 't5'],
    simulators: ['sim1', 'sim2', 'sim3'],
    game: { levels: 5 },
    exam: { perExam: 20, pass: 70 }
  }
];

/* ================================================================
   BANDERA DE PUBLICACIÓN — BIOLOGÍA 11.º
   ================================================================
   Mismo mecanismo EXACTO que Biología 10.º/Física (ver
   js/shared/mqc-biologia-flags.js). Mientras BIOLOGIA11_PUBLICO sea
   false, la unidad real queda oculta para cualquier visitante normal
   (ven "En desarrollo") — el código puede ya estar construido y
   probado, pero nadie más que Bryan puede verlo hasta que decida
   lanzarlo.

   Para revisarlo en un navegador propio, sin publicarlo todavía:
     ?biologia11preview=1
   Igual que el mecanismo ya usado para Biología 10.º — queda
   guardado localmente en ese navegador únicamente. */
const BIOLOGIA11_PUBLICO = true; /* PUBLICADA — autorización explícita de Bryan, 30 de setiembre de 2026. Las 5 unidades (BIO11-U01 a U05) ya están construidas, probadas y revisadas. */
const BIOLOGIA11_PREVIEW_KEY = 'mqc_biologia11_preview';
try {
  const params = new URLSearchParams(window.location.search);
  if (params.get('biologia11preview') === '1') localStorage.setItem(BIOLOGIA11_PREVIEW_KEY, '1');
} catch (e) { /* URLSearchParams no disponible: se ignora, sigue oculto por defecto */ }
function _biologia11Habilitado() {
  const habilitadoReal = BIOLOGIA11_PUBLICO || (function () {
    try { return localStorage.getItem(BIOLOGIA11_PREVIEW_KEY) === '1'; } catch (e) { return false; }
  })();
  return (typeof AccessControl !== 'undefined' && AccessControl.canExplore) ? AccessControl.canExplore(habilitadoReal) : habilitadoReal;
}

Router.register('biologia11', (() => {
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
    const cards = BIOLOGIA11_UNIDADES_DATA.map(u => {
      if (u.status === 'active') {
        const pct = Storage.getBiologia11UnitProgress(u.id);
        return `
          <div class="unit-card" style="--unit-color:${u.color}" data-action="open-biologia11-unit" data-unit="${u.id}">
            <div class="unit-badge" style="color:${u.color};border-color:${u.color}55">✓ Disponible</div>
            <div class="unit-number">BIO11-U0${u.num}</div>
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
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-biologia11-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">BIO11-U0${u.num}</div>
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
        <p class="section-title">Undécimo Año</p><h2 class="section-heading">🧬 Biología 11.º</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:.6rem;max-width:60ch">
        Biología 11.° está en desarrollo progresivo. Explorá las unidades disponibles y continuá construyendo tu dominio de la Biología.
      </p>
      <div class="units-grid">${cards}</div>
    `;
  }

  function _renderInfo(unitId) {
    const u = BIOLOGIA11_UNIDADES_DATA.find(x => x.id === unitId);
    if (!u) return _renderGrid();
    return `
      <button class="btn btn-ghost btn-sm" data-action="back-grid" style="margin-bottom:.8rem">← Biología 11.º</button>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:560px">
        <div class="unit-badge" style="position:static;display:inline-block;color:var(--text-muted);border-color:var(--border);margin-bottom:.8rem">🚧 En desarrollo</div>
        <div style="font-size:2rem;color:${u.color};text-shadow:0 0 20px ${u.color}">${u.icon}</div>
        <h3 style="margin:.4rem 0 .1rem">${u.title}</h3>
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6">${u.description}</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.9rem 1rem;margin-top:1rem;font-size:.85rem;color:var(--text-secondary);line-height:1.6">
          Esta experiencia se encuentra en desarrollo.<br><br>
          Tu acceso a Biología 11.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización.
        </div>
        <button class="btn btn-primary btn-sm" data-action="back-grid" style="margin-top:1.2rem">Volver a Biología 11.º</button>
      </div>
    `;
  }

  function _renderUnitDetail(unitId) {
    const unit = BIOLOGIA11_UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) return _renderGrid();
    const uData = Storage.load().biologia11[unitId] || {};
    const pct = Storage.getBiologia11UnitProgress(unitId);
    return `
      <div id="biologia11-unit-root">
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.icon}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">UNIDAD ${unit.num} · BIOLOGÍA 11.º</p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.title}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas · ${unit.simulators.length} simuladores · 1 juego · Examen ${unit.exam.perExam} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%;background:${unit.color}"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="back-grid">← Biología 11.º</button>
        </div>

        <div class="unit-detail-tabs" id="biologia11-unit-tabs">
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
      try { plugin.bind(unit, uData); } catch (e) { console.warn('[biologia11 plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  function _bindUnitDetailEvents() {
    document.querySelectorAll('#biologia11-unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        /* Mismo hotfix que biologia10.js/fisica10.js: reclicks sobre
           la misma pestaña no vuelven a renderizar/re-vincular nada. */
        if (_currentTab === btn.dataset.tab) return;
        _currentTab = btn.dataset.tab;
        const unit = BIOLOGIA11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().biologia11[_currentUnitId] || {};
        document.querySelectorAll('#biologia11-unit-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = document.getElementById('tab-content');
        if (tc) {
          tc.innerHTML = _renderTab(unit, _currentTab, uData);
          _callPluginBind(unit, _currentTab, uData);
        }
      });
    });
    const back = document.querySelector('#biologia11-unit-root [data-action="back-grid"]');
    if (back) back.addEventListener('click', () => { _currentUnitId = null; _currentTab = 'teoria'; _rerender(); });

    const unit0 = BIOLOGIA11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
    const uData0 = Storage.load().biologia11[_currentUnitId] || {};
    if (unit0) _callPluginBind(unit0, _currentTab, uData0);
  }

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _currentUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-biologia11-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
    document.querySelectorAll('[data-action="open-biologia11-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentUnitId = el.getAttribute('data-unit');
        _currentTab = 'teoria';
        _rerender();
        const data = Storage.load();
        const uData = data.biologia11[_currentUnitId] || {};
        if (!uData.started) {
          Gamification.addXP('unit-started', { disciplina: 'biologia', grado: 11 });
          Storage.updateBiologia11Unit(_currentUnitId, { started: true });
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
        <p class="section-title">Undécimo Año</p><h2 class="section-heading">🧬 Biología 11.º</h2>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:520px;text-align:center">
        <div style="font-size:2rem">🧬</div>
        <h3 style="margin:.4rem 0">En desarrollo</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">Próximamente nuevas experiencias de aprendizaje.</p>
      </div>`;
  }

  /* Mismo soporte aditivo de unitId que biologia10.js/fisica10.js,
     para que el panel contextual del sidebar abra una unidad de
     Biología 11.º directamente. Si la bandera de publicación todavía
     no está activa, el unitId se ignora y se muestra la misma
     pantalla "En desarrollo" de siempre — nunca se salta esa
     bandera. */
  function init(params) {
    if (!_biologia11Habilitado()) {
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
      const u = BIOLOGIA11_UNIDADES_DATA.find(x => x.id === unitId);
      if (u && u.status === 'active') { _infoUnitId = null; _currentUnitId = unitId; }
      else { _infoUnitId = unitId; _currentUnitId = null; }
    } else {
      _infoUnitId = null;
      _currentUnitId = null;
    }
    _rerender();

    if (_currentUnitId) {
      const data = Storage.load();
      const uData = data.biologia11[_currentUnitId] || {};
      if (!uData.started) {
        Gamification.addXP('unit-started', { disciplina: 'biologia', grado: 11 });
        Storage.updateBiologia11Unit(_currentUnitId, { started: true });
      }
    }
  }

  function destroy() { _infoUnitId = null; _currentUnitId = null; }

  return { init, destroy };
})());
