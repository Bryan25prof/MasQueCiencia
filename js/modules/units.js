/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/modules/units.js  |  Módulo: Vista de Unidades
   ================================================================
   CORRECCIONES FASE 0 APLICADAS:
   · BUG-02: Eliminado array UNITS_META duplicado → usa UNIDADES_DATA
   · BUG-03: Reemplazados onclick inline por data-nav

   Dos vistas:
   A) Lista de las 9 unidades (catálogo)
   B) Detalle de una unidad: tabs Teoría | Simuladores | Juego | Examen

   FUENTE DE DATOS: js/data/unidades.js → UNIDADES_DATA
   Para agregar contenido (Fase 1): editar unidades.js únicamente.
================================================================ */

/*
  ╔════════════════════════════════════════════════════════════════╗
  ║  SISTEMA DE PLUGINS DE CONTENIDO — Fase 1+                    ║
  ║  Cada módulo de unidad registra aquí sus renderizadores.      ║
  ║  Formato: window.UNIT_PLUGINS['unit-01:teoria'] = {           ║
  ║    render(unit, uData) { return '<html>'; },                  ║
  ║    bind(unit, uData)   { ...listeners... }                    ║
  ║  }                                                            ║
  ║  Los módulos de unidad se cargan DESPUÉS de units.js          ║
  ║  (ver index.html), por lo que este objeto ya existe.          ║
  ╚════════════════════════════════════════════════════════════════╝
*/
window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

Router.register('units', (() => {
  'use strict';

  /*
    BUG-02 CORREGIDO: ya no existe UNITS_META local.
    Todos los datos vienen de UNIDADES_DATA (js/data/unidades.js).
    Referencias actualizadas de UNITS_META → UNIDADES_DATA.
  */

  /* ── Estado del módulo ──────────────────────────────────── */
  let _currentUnitId = null;
  let _currentTab    = 'teoria';

  /* ── Vista A: Lista de unidades ─────────────────────────── */

  function _renderList() {
    const data = Storage.load();

    const cards = UNIDADES_DATA.map(unit => {
      const pct   = Storage.getUnitProgress(unit.id);
      const uData = data.units[unit.id] || {};
      const isDone = uData.completed;

      return `
        <div class="unit-card"
             style="--unit-color:${unit.color}"
             data-action="open-unit"
             data-unit="${unit.id}">
          ${isDone ? '<div class="unit-badge" style="color:var(--green);border-color:rgba(0,255,136,.3)">✓ Lista</div>' : ''}
          <div class="unit-number">U${unit.num}</div>
          <div class="unit-symbol">${unit.symbol}</div>
          <div class="unit-name">${unit.name}</div>
          <div class="unit-meta">
            <span class="unit-meta-item">${unit.icon} ${unit.topics.length} temas</span>
            <div class="unit-progress">
              <div class="unit-progress-bar">
                <div class="unit-progress-fill" style="width:${pct}%"></div>
              </div>
              <span>${pct}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    /* HOTFIX-02 (actualizado a pedido del usuario): tarjeta del
       Desafío Final PNE — no es una Unidad X curricular (no está en
       UNIDADES_DATA), es una tarjeta adicional. Se desbloquea con un
       mínimo de PNE_MIN_UNITS exámenes aprobados, no los 9 completos. */
    const PNE_MIN_UNITS = 5;
    const passCounts = UNIDADES_DATA.map(u => {
      const uData = data.units[u.id] || {};
      const passMin = (u.exam && u.exam.pass) || 70;
      return (uData.examBest || 0) >= passMin ? 1 : 0;
    });
    const passedCount = passCounts.reduce((a, b) => a + b, 0);
    const totalUnits = UNIDADES_DATA.length;
    const pneUnlocked = passedCount >= PNE_MIN_UNITS;
    const pneData = data.pne || {};

    const pneCard = `
      <div class="unit-card ${pneUnlocked ? '' : 'unit-card-locked'}"
           style="--unit-color:#F9FF4D"
           data-action="${pneUnlocked ? 'open-pne' : 'locked-pne'}">
        <div class="unit-badge" style="color:${pneUnlocked ? 'var(--xp-gold, #F9FF4D)' : 'var(--text-muted)'};border-color:${pneUnlocked ? 'rgba(249,255,77,.3)' : 'var(--border)'}">
          ${pneUnlocked ? '🔓 Desbloqueado' : '🔒 Bloqueado'}
        </div>
        <div class="unit-number">PNE</div>
        <div class="unit-symbol">${pneUnlocked ? '🏆' : '🔒'}</div>
        <div class="unit-name">Desafío Final PNE</div>
        <div style="font-size:.72rem;color:var(--text-muted);margin:.2rem 0 .5rem">Prueba Nacional Estandarizada</div>
        <div class="unit-meta">
          ${pneUnlocked
            ? `<span class="unit-meta-item">🎯 ${pneData.attempts || 0} intento${(pneData.attempts||0)!==1?'s':''} · mejor: ${pneData.bestScore || 0}/100</span>`
            : `<span class="unit-meta-item">Aprueba los exámenes de al menos ${PNE_MIN_UNITS} de las 9 unidades para desbloquear el Desafío PNE.</span>`}
          <div class="unit-progress">
            <div class="unit-progress-bar">
              <div class="unit-progress-fill" style="width:${Math.round((passedCount/totalUnits)*100)}%;background:${pneUnlocked?'var(--xp-gold, #F9FF4D)':''}"></div>
            </div>
            <span>${passedCount}/${totalUnits}</span>
          </div>
        </div>
      </div>
    `;

    return `
      <div class="units-page">
        <div class="section-header">
          <p class="section-title">Programa MEP — Química 10°</p>
          <h2 class="section-heading">Todas las Unidades</h2>
        </div>
        <p style="color:var(--text-secondary);margin-bottom:1.5rem;max-width:60ch">
          El programa de Química Décimo Año consta de <strong>9 unidades</strong>
          con teoría, simuladores, juegos y exámenes. Selecciona una unidad para comenzar.
        </p>
        <div class="units-grid">${cards}${pneCard}</div>
      </div>
    `;
  }

  /* ── Vista B: Detalle de una Unidad ─────────────────────── */

  function _renderDetail(unitId) {
    /* BUG-02: usa UNIDADES_DATA en lugar de UNITS_META */
    const unit = UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) {
      return `
        <div class="placeholder-page">
          <span class="placeholder-icon">❌</span>
          <h2>Unidad no encontrada</h2>
          <button class="btn btn-primary" data-nav="units">← Volver</button>
        </div>`;
    }

    const data  = Storage.load();
    const uData = data.units[unitId] || {};
    const pct   = Storage.getUnitProgress(unitId);

    return `
      <div class="unit-detail-page">

        <!-- Encabezado -->
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.symbol}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">
              UNIDAD ${unit.num}
            </p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.name}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas
              · ${unit.simulators.length} simuladores
              · 1 juego
              · Examen ${unit.exam.questions} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%"></div>
            </div>
          </div>
          <!-- BUG-03: data-nav en lugar de onclick -->
          <button class="btn btn-ghost btn-sm" data-nav="units">← Unidades</button>
        </div>

        <!-- Tabs de navegación -->
        <div class="unit-detail-tabs" id="unit-tabs">
          <button class="tab-btn ${_currentTab === 'teoria'      ? 'active' : ''}" data-tab="teoria">📖 Teoría</button>
          <button class="tab-btn ${_currentTab === 'simuladores' ? 'active' : ''}" data-tab="simuladores">⚗️ Simuladores</button>
          <button class="tab-btn ${_currentTab === 'juego'       ? 'active' : ''}" data-tab="juego">🎮 Juego</button>
          <button class="tab-btn ${_currentTab === 'examen'      ? 'active' : ''}" data-tab="examen">📝 Examen</button>
        </div>

        <!-- Contenido del tab activo -->
        <div id="tab-content">
          ${_renderTab(unit, _currentTab, uData)}
        </div>

      </div>
    `;
  }

  /* Renderiza el tab activo — Fase 1+: delega a plugins si existen */
  function _renderTab(unit, tab, uData) {
    const key    = `${unit.id}:${tab}`;
    const plugin = window.UNIT_PLUGINS && window.UNIT_PLUGINS[key];
    if (plugin) {
      return typeof plugin === 'function'
        ? plugin(unit, uData)
        : (plugin.render ? plugin.render(unit, uData) : '');
    }
    /* Sin plugin → placeholder genérico de Fase 0 */
    switch (tab) {
      case 'teoria':      return _renderTabTeoria(unit, uData);
      case 'simuladores': return _renderTabSimuladores(unit, uData);
      case 'juego':       return _renderTabJuego(unit);
      case 'examen':      return _renderTabExamen(unit, uData);
      default:            return '';
    }
  }

  /* Llama al bind del plugin activo (si existe) */
  function _callPluginBind(unit, tab, uData) {
    const key    = `${unit.id}:${tab}`;
    const plugin = window.UNIT_PLUGINS && window.UNIT_PLUGINS[key];
    if (plugin && typeof plugin === 'object' && typeof plugin.bind === 'function') {
      try { plugin.bind(unit, uData); } catch(e) { console.warn('[Plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  /* ── Contenido de cada tab ──────────────────────────────── */

  function _renderTabTeoria(unit, uData) {
    const read = (uData && uData.topicsRead) ? uData.topicsRead : [];

    const items = unit.topics.map((topic, i) => {
      const topicId = `${unit.id}-topic-${i}`;
      const isRead  = read.includes(topicId);
      return `
        <div class="unit-topic-item ${isRead ? 'read' : ''}"
             data-topic-id="${topicId}"
             data-action="read-topic"
             style="display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;
                    background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-md);margin-bottom:.5rem;cursor:pointer;
                    transition:var(--transition-fast)">
          <span style="font-size:1.2rem">${isRead ? '✅' : '📄'}</span>
          <span style="flex:1;font-size:.9rem;color:${isRead ? 'var(--text-muted)' : 'var(--text-primary)'}">
            ${topic}
          </span>
          ${isRead
            ? '<span style="font-size:.7rem;color:var(--green);font-weight:700">Leído +15XP</span>'
            : '<span style="font-size:.7rem;color:var(--text-muted)">Clic para marcar</span>'}
        </div>
      `;
    }).join('');

    return `
      <div style="animation:pageIn .4s ease">
        <p style="color:var(--text-secondary);font-size:.9rem;margin-bottom:1.25rem">
          ${unit.icon} <strong>${unit.name}</strong> —
          Selecciona un tema para marcarlo como leído y ganar XP.
          El contenido detallado se agregará en la Fase 1.
        </p>
        ${items}
        <!--
          ╔════════════════════════════════════════════════════════╗
          ║  FASE 1: Reemplazar cada item con:                     ║
          ║  · Texto explicativo HTML del tema                     ║
          ║  · Imágenes y diagramas                                ║
          ║  · Preguntas de comprensión (PNE)                      ║
          ║  · Video embed o animación CSS                         ║
          ╚════════════════════════════════════════════════════════╝
        -->
      </div>
    `;
  }

  function _renderTabSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];

    const simCards = unit.simulators.map(sim => `
      <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;
                  background:var(--bg-card);border:1px dashed var(--border);
                  border-radius:var(--radius-md);margin-bottom:.5rem">
        <span style="font-size:2rem;flex-shrink:0">${sim.icon}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${sim.name}</div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-top:.15rem">
            ${done.includes(sim.id) ? '✅ Completado' : 'Disponible en Fase 2'}
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" disabled>🚧 Próx.</button>
      </div>
    `).join('');

    return `
      <div style="animation:pageIn .4s ease">
        <p style="color:var(--text-secondary);font-size:.88rem;margin-bottom:1rem">
          Los simuladores de esta unidad estarán disponibles en la <strong>Fase 2</strong>.
        </p>
        ${simCards}
      </div>
    `;
  }

  function _renderTabJuego(unit) {
    return `
      <div class="coming-soon-panel" style="animation:pageIn .4s ease">
        <span class="coming-soon-icon">${unit.game.icon}</span>
        <h3>${unit.game.name}</h3>
        <p style="color:var(--text-secondary);max-width:40ch;margin:.75rem auto">
          No se pudo cargar el contenido de esta pestaña. Recargá la página o volvé a Inicio.
        </p>
        <span class="placeholder-coming-soon">⚠️ Error de carga</span>
      </div>
    `;
  }

  function _renderTabExamen(unit, uData) {
    const best     = (uData && uData.examBest)     ? uData.examBest     : 0;
    const attempts = (uData && uData.examAttempts) ? uData.examAttempts : 0;

    return `
      <div class="coming-soon-panel" style="animation:pageIn .4s ease">
        <span class="coming-soon-icon">📝</span>
        <h3>Examen de ${unit.name}</h3>
        <p style="color:var(--text-secondary);max-width:45ch;margin:.75rem auto 1rem">
          ${unit.exam.questions} preguntas · ${unit.exam.time} minutos · retroalimentación inmediata.
          Disponible en la <strong>Fase 4</strong>.
        </p>
        ${best > 0 ? `
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);
                      padding:.75rem 1.25rem;display:inline-block;margin-bottom:1rem">
            <div style="font-size:.75rem;color:var(--text-muted)">Mejor nota</div>
            <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:900;
                        color:${best >= 80 ? 'var(--green)' : best >= 60 ? 'var(--gold)' : 'var(--red)'}">
              ${best}/100
            </div>
            <div style="font-size:.7rem;color:var(--text-muted)">${attempts} intento${attempts !== 1 ? 's' : ''}</div>
          </div>
        ` : ''}
        <br>
        <span class="placeholder-coming-soon">📝 En construcción — Fase 4</span>
      </div>
    `;
  }

  /* ── Eventos ────────────────────────────────────────────── */

  function _localToast(icon, title, msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-info';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><div class="toast-body"><div class="toast-title">${title}</div>${msg ? `<p class="toast-msg">${msg}</p>` : ''}</div>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 400); }, 3500);
  }

  function _bindListEvents() {
    document.querySelectorAll('[data-action="open-pne"]').forEach(el => {
      el.addEventListener('click', () => {
        if (typeof Router !== 'undefined' && Router.navigate) Router.navigate('pne-final');
      });
    });
    document.querySelectorAll('[data-action="locked-pne"]').forEach(el => {
      el.addEventListener('click', () => {
        _localToast('🔒', 'Desafío bloqueado', 'Aprueba los exámenes de al menos 5 de las 9 unidades para desbloquearlo.');
      });
    });
    document.querySelectorAll('[data-action="open-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentTab    = 'teoria';
        _currentUnitId = el.dataset.unit;
        const content  = document.getElementById('content');
        if (content) {
          content.innerHTML = _renderDetail(_currentUnitId);
          _bindDetailEvents();
        }
        /* XP por primera visita a la unidad */
        const data  = Storage.load();
        const uData = data.units[_currentUnitId];
        if (!uData.started) {
          Gamification.addXP('unit-started');
          Storage.updateUnit(_currentUnitId, { started: true });
        }
      });
    });
  }

  function _bindDetailEvents() {
    /* Cambio de tabs */
    document.querySelectorAll('#unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _currentTab = btn.dataset.tab;
        /* BUG-02: usa UNIDADES_DATA */
        const unit  = UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().units[_currentUnitId];

        document.querySelectorAll('#unit-tabs .tab-btn')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabContent = document.getElementById('tab-content');
        if (tabContent) {
          tabContent.innerHTML = _renderTab(unit, _currentTab, uData);
          /* Plugin bind → fallback al sistema genérico de topics */
          if (!_callPluginBind(unit, _currentTab, uData)) {
            if (_currentTab === 'teoria') _bindTopicEvents();
          }
        }
      });
    });

    /* Bind del tab inicial (plugin o genérico) */
    const unit0 = UNIDADES_DATA.find(u => u.id === _currentUnitId);
    if (unit0 && !_callPluginBind(unit0, _currentTab, Storage.load().units[_currentUnitId])) {
      if (_currentTab === 'teoria') _bindTopicEvents();
    }
  }

  function _bindTopicEvents() {
    document.querySelectorAll('[data-action="read-topic"]').forEach(el => {
      el.addEventListener('click', () => {
        const topicId = el.dataset.topicId;
        const data    = Storage.load();
        const uData   = data.units[_currentUnitId];
        if (uData && uData.topicsRead.includes(topicId)) return; // ya leído

        Storage.markTopicRead(_currentUnitId, topicId);
        Gamification.addXP('topic-read');

        /* Re-renderizar tab de teoría */
        /* BUG-02: usa UNIDADES_DATA */
        const unit       = UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const newData    = Storage.load();
        const tabContent = document.getElementById('tab-content');
        if (tabContent) {
          tabContent.innerHTML = _renderTab(unit, 'teoria', newData.units[_currentUnitId]);
          _bindTopicEvents();
        }
      });
    });
  }

  /* ── Interfaz del módulo ────────────────────────────────── */

  function init(params) {
    const content = document.getElementById('content');
    if (!content) return;

    if (params && params.unitId) {
      /* Abrir directamente el detalle de una unidad */
      _currentUnitId = params.unitId;
      _currentTab    = 'teoria';
      content.innerHTML = _renderDetail(_currentUnitId);
      _bindDetailEvents();

      const data  = Storage.load();
      const uData = data.units[_currentUnitId];
      if (!uData.started) {
        Gamification.addXP('unit-started');
        Storage.updateUnit(_currentUnitId, { started: true });
      }
    } else {
      /* Vista de catálogo */
      _currentUnitId = null;
      content.innerHTML = _renderList();
      _bindListEvents();
    }
  }

  function destroy() {
    _currentUnitId = null;
    /* Los event listeners se limpian automáticamente al reemplazar innerHTML */
  }

  return { init, destroy };

})());
