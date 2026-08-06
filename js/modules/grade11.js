/* ================================================================
   MÁSQUECIENCIA — js/modules/grade11.js
   Vista "Química 11.º" — Fase 1 Multigrado + IMP-11-U01
   ================================================================
   Reutiliza exactamente el Design System existente: mismas clases
   .units-grid/.unit-card que las 9 unidades de décimo (heredan el
   ajuste de altura uniforme de HOTFIX-05 sin código adicional), mismo
   lenguaje visual, mismo patrón de tarjeta bloqueada/en desarrollo
   que ya se usó para la tarjeta PNE.

   IMP-11-U01: agrega el camino real para unidades con status:'active'
   (hoy solo g11-u01) — mismo patrón exacto de pestañas que units.js
   usa para las 9 de décimo (UNIT_PLUGINS, tabs, _bindDetailEvents),
   pero apuntando a GRADE11_UNIDADES_DATA / data.grade11 / las
   funciones paralelas de Storage (updateGrade11Unit, etc.) en vez de
   las de décimo — nunca se mezclan. Las unidades g11-u02/03/04, al
   seguir con status:'development', conservan exactamente el mismo
   comportamiento de tarjeta "en desarrollo" ya construido en la
   Fase 1 — no se tocó esa rama en absoluto.
================================================================ */

Router.register('grade11', (() => {
  'use strict';

  let _infoUnitId = null;    /* vista informativa de una unidad "en desarrollo" */
  let _currentUnitId = null; /* unidad ACTIVA abierta actualmente (con pestañas) */
  let _currentTab = 'teoria';

  /* Las 5 pestañas de una unidad activa de 11.º — teoría/simuladores/
     juego/examen (mismas 4 que décimo) + misión (la de cierre corta,
     ver §11 del ticket — no existe en décimo, que usa un módulo
     aparte, "Proyecto Integrador", para su cierre). */
  const TABS = [
    { id: 'teoria',      label: '📖 Teoría' },
    { id: 'simuladores', label: '⚗️ Simuladores' },
    { id: 'juego',       label: '🎮 Juego' },
    { id: 'examen',      label: '📝 Examen' },
    { id: 'mision',      label: '🔎 Misión' }
  ];

  function _renderGrid() {
    const data = Storage.load();
    const g11 = data.grade11Unlock || { unlocked: false };

    if (!g11.unlocked) {
      return `
        <div class="section-header"><p class="section-title">Undécimo Año</p><h2 class="section-heading">Química 11.º</h2></div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;text-align:center;max-width:520px;margin:0 auto">
          <div style="font-size:2.4rem">🔒</div>
          <h3 style="margin:.5rem 0">Todavía no está desbloqueada</h3>
          <p style="color:var(--text-secondary);font-size:.9rem">Aprobá 6 de los 9 exámenes de Química 10.º, o alcanzá 80 o más en el Desafío Final PNE.</p>
          <button class="btn btn-ghost" data-action="back-select">← Volver a la selección de ruta</button>
        </div>`;
    }

    const cards = GRADE11_UNIDADES_DATA.map(u => {
      if (u.status === 'active') {
        const pct = Storage.getGrade11UnitProgress(u.id);
        return `
          <div class="unit-card" style="--unit-color:${u.color}" data-action="open-g11-unit" data-unit="${u.id}">
            <div class="unit-badge" style="color:${u.color};border-color:${u.color}55">✓ Disponible</div>
            <div class="unit-number">G11-U0${u.num}</div>
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
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-g11-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">G11-U0${u.num}</div>
        <div class="unit-symbol">${u.icon}</div>
        <div class="unit-name">${u.title}${u.subtitle ? `<br><span style="font-weight:400;color:var(--text-muted);font-size:.85em">${u.subtitle}</span>` : ''}</div>
        <div class="unit-meta">
          <span class="unit-meta-item unit-meta-item-clamp">${u.description}</span>
        </div>
      </div>`;
    }).join('');

    return `
      <div class="section-header"><p class="section-title">Undécimo Año</p><h2 class="section-heading">🎓 Química 11.º</h2></div>
      <p style="color:var(--text-secondary);margin-bottom:1.5rem;max-width:60ch">
        Tu acceso ya está preparado. Las experiencias de este nivel se irán incorporando gradualmente.
      </p>
      <div class="units-grid">${cards}</div>
    `;
  }

  function _renderInfo(unitId) {
    const u = GRADE11_UNIDADES_DATA.find(x => x.id === unitId);
    if (!u) return _renderGrid();
    return `
      <button class="btn btn-ghost btn-sm" data-action="back-grid" style="margin-bottom:.8rem">← Química 11.º</button>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:560px">
        <div class="unit-badge" style="position:static;display:inline-block;color:var(--text-muted);border-color:var(--border);margin-bottom:.8rem">🚧 En desarrollo</div>
        <div style="font-size:2rem;color:${u.color};text-shadow:0 0 20px ${u.color}">${u.icon}</div>
        <h3 style="margin:.4rem 0 .1rem">${u.title}</h3>
        ${u.subtitle ? `<p style="color:var(--text-muted);font-size:.85rem;margin:0 0 .8rem">${u.subtitle}</p>` : ''}
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6">${u.description}</p>
        <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.9rem 1rem;margin-top:1rem;font-size:.85rem;color:var(--text-secondary);line-height:1.6">
          Esta experiencia se encuentra en desarrollo.<br><br>
          Tu acceso a Química 11.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización.
        </div>
        <button class="btn btn-primary btn-sm" data-action="back-grid" style="margin-top:1.2rem">Volver a Química 11.º</button>
      </div>
    `;
  }

  /* ── Detalle de unidad ACTIVA (mismo patrón que units.js:_renderDetail) ── */
  function _renderUnitDetail(unitId) {
    const unit = GRADE11_UNIDADES_DATA.find(u => u.id === unitId);
    if (!unit) return _renderGrid();
    const uData = Storage.load().grade11[unitId] || {};
    const pct = Storage.getGrade11UnitProgress(unitId);
    return `
      <div id="g11-unit-root">
        <div class="unit-detail-header" style="border-top:4px solid ${unit.color}">
          <div class="unit-detail-symbol" style="color:${unit.color}">${unit.icon}</div>
          <div style="flex:1">
            <p style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">UNIDAD ${unit.num} · QUÍMICA 11.º</p>
            <h2 style="font-size:1.4rem;margin:.1rem 0">${unit.title}</h2>
            <p style="color:var(--text-secondary);font-size:.88rem;margin:.25rem 0 .5rem">
              ${unit.icon} ${unit.topics.length} temas · ${unit.simulators.length} simuladores · 1 juego · Examen ${unit.exam.perExam} preguntas
            </p>
            <div class="progress-bar" style="width:200px;max-width:100%">
              <div class="progress-fill progress-fill-cyan" style="width:${pct}%;background:${unit.color}"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="back-grid">← Química 11.º</button>
        </div>

        <div class="unit-detail-tabs" id="g11-unit-tabs">
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
      try { plugin.bind(unit, uData); } catch (e) { console.warn('[grade11 plugin bind]', key, e); }
      return true;
    }
    return false;
  }

  function _bindUnitDetailEvents() {
    document.querySelectorAll('#g11-unit-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _currentTab = btn.dataset.tab;
        const unit = GRADE11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
        const uData = Storage.load().grade11[_currentUnitId] || {};
        document.querySelectorAll('#g11-unit-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = document.getElementById('tab-content');
        if (tc) {
          tc.innerHTML = _renderTab(unit, _currentTab, uData);
          _callPluginBind(unit, _currentTab, uData);
        }
      });
    });
    const back = document.querySelector('#g11-unit-root [data-action="back-grid"]');
    if (back) back.addEventListener('click', () => { _currentUnitId = null; _currentTab = 'teoria'; _rerender(); });

    const unit0 = GRADE11_UNIDADES_DATA.find(u => u.id === _currentUnitId);
    const uData0 = Storage.load().grade11[_currentUnitId] || {};
    if (unit0) _callPluginBind(unit0, _currentTab, uData0);
  }

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _currentUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-g11-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
    document.querySelectorAll('[data-action="open-g11-unit"]').forEach(el => {
      el.addEventListener('click', () => {
        _currentUnitId = el.getAttribute('data-unit');
        _currentTab = 'teoria';
        _rerender();
        /* XP por primera visita, mismo patrón que units.js con data.units */
        const data = Storage.load();
        const uData = data.grade11[_currentUnitId] || {};
        if (!uData.started) {
          Gamification.addXP('unit-started');
          Storage.updateGrade11Unit(_currentUnitId, { started: true });
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

  function init() {
    _infoUnitId = null;
    _currentUnitId = null;
    _currentTab = 'teoria';
    _rerender();
  }

  function destroy() { _infoUnitId = null; _currentUnitId = null; }

  return { init, destroy };
})());
