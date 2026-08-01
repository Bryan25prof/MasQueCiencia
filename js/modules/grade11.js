/* ================================================================
   MÁSQUECIENCIA — js/modules/grade11.js
   Vista "Química 11.º" — Fase 1 Multigrado
   ================================================================
   Reutiliza exactamente el Design System existente: mismas clases
   .units-grid/.unit-card que las 9 unidades de décimo (heredan el
   ajuste de altura uniforme de HOTFIX-05 sin código adicional), mismo
   lenguaje visual, mismo patrón de tarjeta bloqueada/en desarrollo
   que ya se usó para la tarjeta PNE.
================================================================ */

Router.register('grade11', (() => {
  'use strict';

  let _infoUnitId = null; /* si no es null, se muestra la vista informativa de esa unidad */

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

    const cards = GRADE11_UNIDADES_DATA.map(u => `
      <div class="unit-card unit-card-locked" style="--unit-color:${u.color}" data-action="open-g11-info" data-unit="${u.id}">
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🚧 En desarrollo</div>
        <div class="unit-number">G11-U0${u.num}</div>
        <div class="unit-symbol">${u.icon}</div>
        <div class="unit-name">${u.title}${u.subtitle ? `<br><span style="font-weight:400;color:var(--text-muted);font-size:.85em">${u.subtitle}</span>` : ''}</div>
        <div class="unit-meta">
          <span class="unit-meta-item unit-meta-item-clamp">${u.description}</span>
        </div>
      </div>`).join('');

    return `
      <div class="section-header"><p class="section-title">Undécimo Año</p><h2 class="section-heading">🎓 Química 11.º</h2></div>
      <p style="color:var(--text-secondary);margin-bottom:1.5rem;max-width:60ch">
        Tu acceso ya está preparado. Las 4 experiencias de este nivel se incorporarán en próximas actualizaciones.
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

  function _bind() {
    const back1 = document.querySelector('[data-action="back-select"]');
    if (back1) back1.addEventListener('click', () => Router.navigate('grade-select'));
    const back2 = document.querySelector('[data-action="back-grid"]');
    if (back2) back2.addEventListener('click', () => { _infoUnitId = null; _rerender(); });
    document.querySelectorAll('[data-action="open-g11-info"]').forEach(el => {
      el.addEventListener('click', () => { _infoUnitId = el.getAttribute('data-unit'); _rerender(); });
    });
  }

  function _rerender() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = _infoUnitId ? _renderInfo(_infoUnitId) : _renderGrid();
    _bind();
  }

  function init() {
    _infoUnitId = null;
    _rerender();
  }

  function destroy() { _infoUnitId = null; }

  return { init, destroy };
})());
