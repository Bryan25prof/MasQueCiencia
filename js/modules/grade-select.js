/* ================================================================
   MÁSQUECIENCIA — js/modules/grade-select.js
   "Selecciona tu ruta científica" — Fase 1 Multigrado
   ================================================================
   Pantalla que se muestra tras seleccionar/crear un perfil, antes de
   entrar a Química 10.º o 11.º. Capa superior de navegación — NO
   reemplaza el acceso directo existente a décimo (Unidades, Inicio
   siguen intactos), solo agrega una vista intermedia.
================================================================ */

Router.register('grade-select', (() => {
  'use strict';

  function _unlockStatus(data) {
    const examsPassed = (typeof UNIDADES_DATA !== 'undefined') ? UNIDADES_DATA.filter(u => {
      const uData = data.units[u.id];
      const passMin = (u.exam && u.exam.pass) || 70;
      return uData && (uData.examBest || 0) >= passMin;
    }).length : 0;
    return { examsPassed, totalExams: (typeof UNIDADES_DATA !== 'undefined') ? UNIDADES_DATA.length : 9 };
  }

  function _render() {
    const data = Storage.load();
    const g11 = data.grade11Unlock || { unlocked: false };
    const pne = data.pne || { bestScore: 0 };
    const { examsPassed } = _unlockStatus(data);
    const levelInfo = (typeof Gamification !== 'undefined') ? Gamification.getLevelInfo() : { percent: 0 };

    const g10ExamsLabel = `${examsPassed}/9 exámenes aprobados`;
    const g10PneLabel = pne.bestScore > 0 ? `Mejor Examen Final 10.º: ${pne.bestScore}/100` : 'Aún sin intentos del Examen Final';

    let g11Body;
    if (g11.unlocked) {
      g11Body = `
        <div class="unit-badge" style="color:var(--xp-gold, #F9FF4D);border-color:rgba(249,255,77,.3)">🔓 Disponible</div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin:.6rem 0">4 experiencias en desarrollo — el contenido se irá incorporando en próximas actualizaciones.</p>
        <button class="btn btn-primary" data-action="go-grade11">Explorar Química 11.º</button>`;
    } else {
      const routeAPct = Math.min(100, Math.round((examsPassed / 6) * 100));
      const routeBPct = Math.min(100, Math.round((pne.bestScore / 80) * 100));
      g11Body = `
        <div class="unit-badge" style="color:var(--text-muted);border-color:var(--border)">🔒 Bloqueada</div>
        <p style="color:var(--text-secondary);font-size:.82rem;margin:.6rem 0 .4rem">Se desbloquea cumpliendo <strong>cualquiera</strong> de estas dos rutas:</p>
        <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.3rem">Ruta A — ${examsPassed} de 6 exámenes requeridos</div>
        <div class="progress-bar" style="margin-bottom:.6rem"><div class="progress-fill progress-fill-cyan" style="width:${routeAPct}%"></div></div>
        <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.3rem">Ruta B — Mejor resultado del Examen Final 10.º: ${pne.bestScore}/100 (necesitás 80)</div>
        <div class="progress-bar" style="margin-bottom:.6rem"><div class="progress-fill progress-fill-cyan" style="width:${routeBPct}%"></div></div>
        <button class="btn btn-ghost" disabled style="opacity:.5;cursor:not-allowed">Química 11.º bloqueada</button>`;
    }

    return `
      <div class="section-header">
        <p class="section-title">MásQueCiencia</p>
        <h2 class="section-heading">Selecciona tu ruta científica</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.2rem;max-width:900px;margin-top:1.5rem">

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div class="unit-number">DÉCIMO AÑO</div>
          <div class="unit-symbol" style="color:var(--cyan);text-shadow:0 0 20px var(--cyan)">🧪</div>
          <h3 style="margin:.3rem 0">Química 10.º</h3>
          <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Disponible — continuá exactamente donde quedaste.</p>
          <div style="font-size:.8rem;color:var(--text-muted);margin-bottom:.2rem">${g10ExamsLabel}</div>
          <div class="progress-bar" style="margin-bottom:.4rem"><div class="progress-fill progress-fill-cyan" style="width:${levelInfo.percent||0}%"></div></div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:1rem">${g10PneLabel}</div>
          <button class="btn btn-primary" data-action="go-grade10">Continuar en Química 10.º</button>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div class="unit-number">UNDÉCIMO AÑO</div>
          <div class="unit-symbol" style="color:${g11.unlocked?'var(--xp-gold, #F9FF4D)':'var(--text-muted)'}">${g11.unlocked?'🎓':'🔒'}</div>
          <h3 style="margin:.3rem 0">Química 11.º</h3>
          ${g11Body}
        </div>

      </div>
    `;
  }

  function _bind() {
    const goG10 = document.querySelector('[data-action="go-grade10"]');
    if (goG10) goG10.addEventListener('click', () => Router.navigate('home'));
    const goG11 = document.querySelector('[data-action="go-grade11"]');
    if (goG11) goG11.addEventListener('click', () => Router.navigate('grade11'));
  }

  function init() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = _render();
    _bind();
    if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
  }

  function destroy() {}

  return { init, destroy };
})());
