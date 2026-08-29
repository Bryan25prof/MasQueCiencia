/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/devtools.js  |  Panel oculto de desarrollador (QA local)
   ================================================================
   ⚠️ IMPORTANTE — LEE ESTO ANTES DE USARLO:
   MQC "SIN cuentas, SIN login, SIN servidores" (decisión de diseño
   explícita del proyecto) — por lo tanto esto NO es un login de
   administrador real ni una barrera de seguridad. Es un atajo de
   desarrollador que manipula el localStorage DE ESTE NAVEGADOR para
   simular progreso, igual que cualquiera podría hacer manualmente
   desde las herramientas de desarrollador del navegador. Sirve para
   que vos (el docente/desarrollador) puedas previsualizar en tu
   propio dispositivo secciones bloqueadas por avance (Química 11.º,
   Simulacro PNE 11.º) sin tener que completar manualmente 9+4
   exámenes o 60 preguntas cada vez. NO debe compartirse como método
   de "hacer trampa" a estudiantes reales — no otorga ninguna ventaja
   que no puedan lograr ellos mismos avanzando de verdad, y todo lo
   que hace es visible y reversible.

   Cómo abrirlo:
   - Tocar/clicar 5 veces seguidas, en menos de 3 segundos, el logo
     oficial de MásQueCiencia dentro de "Acerca de la Plataforma"
     (SPRINT ANALYTICS — PARTE 11: antes estaba en el pie del sidebar,
     se movió acá por pedido explícito — sin ninguna pista visual).
   - O visitar la URL con ?mqcadmin=1 (ej. .../?mqcadmin=1).

   100% ADITIVO: no toca Storage.js, router.js, ni simulacro-nacional.js
   — solo usa la API pública ya documentada de Storage (load/save/get/
   set/reset) y simula clics reales sobre el DOM que esos módulos ya
   generan (como lo haría un estudiante), nunca leyendo ni escribiendo
   sus variables internas.
================================================================ */
window.MQCDevTools = (function () {
  'use strict';

  /* SPRINT ANALYTICS — PARTE 11: el logo de "Acerca de" se re-renderiza
     cada vez que se navega a esa sección (router.js, _showPlaceholder),
     así que el trigger usa delegación de eventos sobre document — no
     necesita volver a engancharse cada vez que el logo aparece/desaparece
     del DOM. router.js le agrega el id="mqc-about-logo" solo a esa imagen
     (ver _placeholderMeta 'about'), ninguna otra imagen del sitio lo tiene. */
  const LOGO_SELECTOR = '#mqc-about-logo';
  const TAPS_REQUIRED = 5;
  const TAP_WINDOW_MS = 2500;

  let _tapCount = 0;
  let _tapTimer = null;
  let _autoRunTimer = null;

  /* ── Toast local (mismo patrón visual que el resto de MQC) ──── */
  function _toast(icon, title, msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-info';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${msg ? `<p class="toast-msg">${msg}</p>` : ''}
      </div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ================================================================
     ACCIONES — todas usan SOLO la API pública documentada de Storage
     (load/save), nunca sus variables internas.
     ================================================================ */
  const UNIDADES_10 = ['unit-01','unit-02','unit-03','unit-04','unit-05','unit-06','unit-07','unit-08','unit-09'];
  const UNIDADES_11 = ['g11-u01','g11-u02','g11-u03','g11-u04'];

  function simularDecimoCompleto() {
    if (typeof Storage === 'undefined') return;
    const data = Storage.load();
    UNIDADES_10.forEach(id => {
      if (!data.units[id]) return;
      data.units[id].started = true;
      data.units[id].completed = true;
      data.units[id].examBest = 100;
      data.units[id].examAttempts = Math.max(data.units[id].examAttempts || 0, 1);
    });
    Storage.save(data);
    _toast('🧪', 'Simulado: 9/9 exámenes de 10.º al 100%');
  }

  function simularOnceCompleto() {
    if (typeof Storage === 'undefined') return;
    const data = Storage.load();
    UNIDADES_11.forEach(id => {
      if (!data.grade11[id]) return;
      data.grade11[id].started = true;
      data.grade11[id].completed = true;
      data.grade11[id].examBest = 100;
      data.grade11[id].examAttempts = Math.max(data.grade11[id].examAttempts || 0, 1);
    });
    Storage.save(data);
    _toast('🎓', 'Simulado: 4/4 unidades de 11.º al 100%');
  }

  /* Desbloquea Química 11.º + Simulacro PNE 11.º escribiendo
     exactamente el mismo campo que ya documenta
     docs/multigrado/MQC_GRADE11_UNLOCK_RULES.md §3 (grade11Unlock) —
     no se inventa ningún campo nuevo. */
  function forzarDesbloqueoOnce() {
    if (typeof Storage === 'undefined') return;
    const data = Storage.load();
    data.grade11Unlock = {
      unlocked: true,
      method: 'six-exams',
      unlockedAt: Date.now(),
      evidence: { examsPassed: 9, pneBestScore: (data.pne && data.pne.bestScore) || 0 }
    };
    Storage.save(data);
    _toast('🔓', 'Química 11.º y Simulacro PNE 11.º desbloqueados');
  }

  function simularTodo() {
    simularDecimoCompleto();
    simularOnceCompleto();
    forzarDesbloqueoOnce();
  }

  function restaurarProgresoReal() {
    if (!window.confirm('¿Restaurar el progreso real y borrar toda la simulación de este perfil? Esta acción no se puede deshacer.')) return;
    if (typeof Storage === 'undefined' || !Storage.reset) return;
    Storage.reset();
    _toast('↺', 'Progreso restaurado', 'Recargando…');
    setTimeout(() => location.reload(), 700);
  }

  /* ================================================================
     AUTO-EJECUCIÓN DEL SIMULACRO PNE 11.º
     ================================================================
     Simula, con clics reales sobre el DOM (como haría un estudiante),
     el recorrido completo: iniciar → nota de presentación → 60
     respuestas cualesquiera → entregar. NO lee ni escribe ninguna
     variable interna de simulacro-nacional.js — solo interactúa con
     los mismos botones/inputs que ya usa cualquier estudiante, así
     que sigue funcionando aunque ese archivo cambie en el futuro,
     mientras conserve los mismos IDs (sn-iniciar, sn-input-
     presentacion, sn-confirmar-presentacion, [data-opcion],
     sn-siguiente-o-entregar, sn-entregar-final/sn-entregar-igual,
     sn-nuevo). Se detiene sola al llegar a la pantalla de resultados
     (aparece #sn-revisar).
     ================================================================ */
  function autoCompletarSimulacroPNE() {
    if (typeof Router === 'undefined') { _toast('⚠️', 'Router no disponible todavía'); return; }
    Router.navigate('simulacro-nacional');
    clearTimeout(_autoRunTimer);
    _autoRunTimer = setTimeout(_pasoAutoRun, 500);
    _toast('🎯', 'Auto-completando el Simulacro PNE 11.º…', 'Esto toma unos segundos.');
  }

  function _pasoAutoRun() {
    // Ya llegamos a resultados: detener.
    if (document.getElementById('sn-revisar')) {
      _toast('✅', 'Simulacro completado', 'Ya podés ver el resultado y la tarjeta de apoyo.');
      return;
    }

    // Pantalla de entrada: si hay un intento en curso, descartarlo para
    // garantizar una corrida limpia; si no, iniciar uno nuevo.
    const nuevo = document.getElementById('sn-nuevo');
    const reanudar = document.getElementById('sn-reanudar');
    if (reanudar && nuevo) { nuevo.click(); _autoRunTimer = setTimeout(_pasoAutoRun, 400); return; }

    const iniciar = document.getElementById('sn-iniciar');
    if (iniciar) { iniciar.click(); _autoRunTimer = setTimeout(_pasoAutoRun, 400); return; }

    // Nota de presentación
    const presInput = document.getElementById('sn-input-presentacion');
    const confirmar = document.getElementById('sn-confirmar-presentacion');
    if (presInput && confirmar) {
      presInput.value = '40';
      presInput.dispatchEvent(new Event('input', { bubbles: true }));
      confirmar.click();
      _autoRunTimer = setTimeout(_pasoAutoRun, 400);
      return;
    }

    // Pantalla de examen: elegir la primera opción disponible y avanzar
    // (o entregar, en la última pregunta — mismo botón, mismo id).
    const opciones = document.querySelectorAll('#sn-opciones [data-opcion]');
    const siguiente = document.getElementById('sn-siguiente-o-entregar');
    if (opciones.length && siguiente) {
      opciones[0].click();
      _autoRunTimer = setTimeout(() => {
        siguiente.click();
        _autoRunTimer = setTimeout(_pasoAutoRun, 40);
      }, 20);
      return;
    }

    // Pantalla intermedia de confirmación de entrega (última pregunta) —
    // "Todas las preguntas están contestadas" → ENTREGAR SIMULACRO,
    // o "Tienes N pendientes" → ENTREGAR DE TODAS FORMAS (no debería
    // ocurrir, ya que el bot responde las 60, pero se cubre igual).
    const entregarFinal = document.getElementById('sn-entregar-final');
    if (entregarFinal) { entregarFinal.click(); _autoRunTimer = setTimeout(_pasoAutoRun, 200); return; }
    const entregarIgual = document.getElementById('sn-entregar-igual');
    if (entregarIgual) { entregarIgual.click(); _autoRunTimer = setTimeout(_pasoAutoRun, 200); return; }

    // Pantalla todavía renderizando — reintentar en breve.
    _autoRunTimer = setTimeout(_pasoAutoRun, 150);
  }

  /* ================================================================
     PANEL FLOTANTE
     ================================================================ */
  function _panelHTML() {
    return `
      <div id="mqc-dev-panel" style="position:fixed;z-index:9999;bottom:1rem;right:1rem;max-width:300px;
                  background:var(--bg-card,#16163a);border:1px solid var(--violet,#7B2FFF);
                  border-radius:var(--radius-lg,16px);padding:1rem;box-shadow:0 8px 40px rgba(0,0,0,.6);
                  font-family:var(--font-body,sans-serif)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
          <strong style="color:var(--violet,#7B2FFF);font-size:.85rem">🛠️ Panel de desarrollador (local)</strong>
          <button id="mqc-dev-close" style="background:none;border:none;color:var(--text-muted,#9898CC);font-size:1rem;cursor:pointer">✕</button>
        </div>
        <p style="font-size:.72rem;color:var(--text-muted,#9898CC);line-height:1.4;margin:0 0 .7rem">
          Solo afecta este navegador/perfil. No es un login real — no hay cuentas en MQC.
        </p>
        <div style="display:flex;flex-direction:column;gap:.4rem">
          <button class="btn btn-ghost btn-sm" id="mqc-dev-10">🧪 Simular 9/9 exámenes 10.º</button>
          <button class="btn btn-ghost btn-sm" id="mqc-dev-11">🎓 Simular 4/4 unidades 11.º</button>
          <button class="btn btn-ghost btn-sm" id="mqc-dev-unlock">🔓 Desbloquear 11.º + PNE 11.º</button>
          <button class="btn btn-primary btn-sm" id="mqc-dev-all">⚡ Simular todo (100%)</button>
          <button class="btn btn-ghost btn-sm" id="mqc-dev-pne">🎯 Auto-completar Simulacro PNE 11.º</button>
          <button class="btn btn-ghost btn-sm" id="mqc-dev-reset" style="color:var(--red,#FF2266)">↺ Restaurar progreso real</button>
        </div>
      </div>`;
  }

  function _abrirPanel() {
    if (document.getElementById('mqc-dev-panel')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = _panelHTML();
    document.body.appendChild(wrap.firstElementChild);

    document.getElementById('mqc-dev-close').addEventListener('click', _cerrarPanel);
    document.getElementById('mqc-dev-10').addEventListener('click', simularDecimoCompleto);
    document.getElementById('mqc-dev-11').addEventListener('click', simularOnceCompleto);
    document.getElementById('mqc-dev-unlock').addEventListener('click', forzarDesbloqueoOnce);
    document.getElementById('mqc-dev-all').addEventListener('click', simularTodo);
    document.getElementById('mqc-dev-pne').addEventListener('click', autoCompletarSimulacroPNE);
    document.getElementById('mqc-dev-reset').addEventListener('click', restaurarProgresoReal);
  }

  function _cerrarPanel() {
    const panel = document.getElementById('mqc-dev-panel');
    if (panel) panel.remove();
    clearTimeout(_autoRunTimer);
  }

  function _togglePanel() {
    if (document.getElementById('mqc-dev-panel')) _cerrarPanel();
    else _abrirPanel();
  }

  /* ── Disparador: 5 toques seguidos sobre el logo de "Acerca de" ── */
  function _resetToques() { _tapCount = 0; }
  function _onLogoTap() {
    _tapCount++;
    clearTimeout(_tapTimer);
    _tapTimer = setTimeout(_resetToques, TAP_WINDOW_MS);
    if (_tapCount >= TAPS_REQUIRED) { _resetToques(); _togglePanel(); }
  }

  function init() {
    // Delegación sobre document: el logo se crea/destruye dinámicamente
    // cada vez que se navega a "Acerca de" (ver router.js) — así no hace
    // falta re-enganchar el listener en cada render.
    document.addEventListener('click', (e) => {
      const logo = e.target.closest ? e.target.closest(LOGO_SELECTOR) : null;
      if (logo) _onLogoTap();
    });

    // Atajo directo por URL: .../?mqcadmin=1
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mqcadmin') === '1') _abrirPanel();
    } catch (e) { /* URLSearchParams no disponible en navegadores muy antiguos — se ignora */ }
  }

  init();

  return {
    simularDecimoCompleto, simularOnceCompleto, forzarDesbloqueoOnce,
    simularTodo, restaurarProgresoReal, autoCompletarSimulacroPNE,
    abrirPanel: _abrirPanel, cerrarPanel: _cerrarPanel
  };
})();
