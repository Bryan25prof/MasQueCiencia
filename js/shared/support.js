/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/support.js  |  "Apoya MásQueCiencia" — apoyo voluntario
   ================================================================
   Sección discreta de apoyo voluntario al proyecto vía PayPal
   (botón oficial hosted_button_id) y SINPE Móvil (número público,
   copiar al portapapeles). Módulo 100% ADITIVO:

   - NO registra ruta en Router, NO es una sección del sidebar-nav.
   - NO toca Storage, Gamification, perfiles, PNE ni Analytics.
   - NO modifica router.js ni simulacro-nacional.js (archivos
     congelados del núcleo): la tarjeta de "about" y la de resultados
     del Simulacro PNE 11.º se inyectan desde AFUERA observando
     cambios en #content (MutationObserver), el mismo espíritu que
     analytics-hooks.js usa para envolver funciones sin editarlas.
   - Nunca condiciona el acceso académico, XP, calificaciones ni
     desbloqueos: es puramente informativo/voluntario.

   API pública: window.MQCSupport = { openModal, init }
================================================================ */

window.MQCSupport = (function () {
  'use strict';

  /* ── Datos públicos (no son secretos: SDK oficial + número público) ── */
  const PAYPAL_SDK_URL     = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
  const PAYPAL_BUTTON_ID   = 'FZEHA45PT5QHJ';
  const PAYPAL_BUTTON_IMG  = 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif';
  const SINPE_DISPLAY      = '8308-3905';
  const SINPE_COPY         = '83083905';

  let _sdkLoading = false;
  let _keydownBound = false;

  /* ── Mensajes (textos exactos pedidos) ─────────────────────────── */
  const MSG_PRINCIPAL = 'Cada aporte nos ayuda a seguir creando, mejorando y ampliando recursos educativos interactivos para nuestros estudiantes.<br><br>Tu apoyo impulsa nuevas ideas, simuladores y experiencias de aprendizaje.<br><br>¡Gracias por ser parte de MásQueCiencia!';
  const MSG_VOLUNTARIO = 'El apoyo es completamente voluntario y no condiciona el acceso, las calificaciones ni el rendimiento académico.';
  const MSG_CONFIANZA  = 'MásQueCiencia es un proyecto educativo independiente en constante desarrollo. Los aportes voluntarios se destinan al mantenimiento, mejora y expansión de la plataforma.';
  const MSG_PNE_CIERRE = '¿MásQueCiencia te ayudó a prepararte?<br>Tu aporte voluntario ayuda a mantener y ampliar este proyecto educativo.';

  /* ================================================================
     TOAST — mismo patrón visual que toast-container / gamification.js
     (implementación propia y local: no se expone _toast desde el
     núcleo, así que no hay función existente para reutilizar aquí).
     ================================================================ */
  function _toast(icon, title, msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
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
    }, 3500);
  }

  /* ================================================================
     COPIAR NÚMERO SINPE
     ================================================================ */
  function _fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); cb(true); }
    catch (e) { cb(false); }
    document.body.removeChild(ta);
  }

  function _copySinpe() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SINPE_COPY)
        .then(() => _toast('✅', 'Número SINPE copiado'))
        .catch(() => _fallbackCopy(SINPE_COPY, ok => { if (ok) _toast('✅', 'Número SINPE copiado'); }));
    } else {
      _fallbackCopy(SINPE_COPY, ok => { if (ok) _toast('✅', 'Número SINPE copiado'); });
    }
  }

  /* ================================================================
     BOTÓN OFICIAL DE PAYPAL (SDK oficial, sin manejo propio de pagos)
     ================================================================ */
  function _renderPayPalButton() {
    const target = document.getElementById('mqc-donate-button');
    if (!target) return;

    function _mount() {
      if (!window.PayPal || !window.PayPal.Donation) return;
      target.innerHTML = '';
      window.PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: PAYPAL_BUTTON_ID,
        image: {
          src: PAYPAL_BUTTON_IMG,
          alt: 'Donate with PayPal button',
          title: 'PayPal - The safer, easier way to pay online!'
        }
      }).render('#mqc-donate-button');
    }

    if (window.PayPal && window.PayPal.Donation) { _mount(); return; }
    if (_sdkLoading) return; /* ya en curso, se montará al cargar */

    _sdkLoading = true;
    const script = document.createElement('script');
    script.src = PAYPAL_SDK_URL;
    script.charset = 'UTF-8';
    script.onload = () => { _sdkLoading = false; _mount(); };
    script.onerror = () => {
      _sdkLoading = false;
      target.innerHTML = '<p class="mqc-support-error">No se pudo cargar el botón de PayPal. Verifica tu conexión.</p>';
    };
    document.body.appendChild(script);
  }

  /* ================================================================
     TARJETA COMPLETA (dentro del modal global)
     ================================================================ */
  function _cardBodyHTML() {
    return `
      <div class="mqc-support-body">
        <div class="mqc-support-heading">💙 APOYA MÁSQUECIENCIA</div>
        <p class="mqc-support-msg">${MSG_PRINCIPAL}</p>
        <p class="mqc-support-voluntary">${MSG_VOLUNTARIO}</p>

        <div class="mqc-support-options">
          <div class="mqc-support-option">
            <div class="mqc-support-option-label">Donar con PayPal</div>
            <div id="mqc-donate-button" class="mqc-donate-slot">
              <span class="mqc-support-loading">Cargando botón de PayPal…</span>
            </div>
          </div>

          <div class="mqc-support-option">
            <div class="mqc-support-option-label">SINPE Móvil</div>
            <div class="mqc-sinpe-box">
              <span class="mqc-sinpe-number">${SINPE_DISPLAY}</span>
              <button class="btn btn-ghost btn-sm mqc-sinpe-copy" id="mqc-sinpe-copy-btn">📋 Copiar número</button>
            </div>
          </div>
        </div>

        <p class="mqc-support-trust">${MSG_CONFIANZA}</p>
      </div>`;
  }

  /* ================================================================
     MODAL — reutiliza #global-modal / #global-modal-content, el
     mismo mecanismo que ya usa periodic-table.js (sin duplicar CSS
     ni lógica de overlay: solo el contenido interno cambia).
     ================================================================ */
  function _onKeyDown(e) { if (e.key === 'Escape') closeModal(); }

  function openModal() {
    const overlay = document.getElementById('global-modal');
    const content = document.getElementById('global-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <div class="modal-header">
        <div style="flex:1">
          <h2 style="font-family:var(--font-display);font-size:1.3rem;margin:0">💙 Apoya MásQueCiencia</h2>
        </div>
        <button class="modal-close" id="mqc-support-close-btn">✕</button>
      </div>
      ${_cardBodyHTML()}
    `;
    overlay.classList.remove('hidden');

    document.getElementById('mqc-support-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', _overlayClick);
    if (!_keydownBound) { document.addEventListener('keydown', _onKeyDown); _keydownBound = true; }

    const copyBtn = document.getElementById('mqc-sinpe-copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', _copySinpe);

    _renderPayPalButton();
  }

  function _overlayClick(e) {
    const overlay = document.getElementById('global-modal');
    if (e.target === overlay) closeModal();
  }

  function closeModal() {
    const overlay = document.getElementById('global-modal');
    if (overlay) overlay.classList.add('hidden');
    if (overlay) overlay.removeEventListener('click', _overlayClick);
    if (_keydownBound) { document.removeEventListener('keydown', _onKeyDown); _keydownBound = false; }
  }

  /* ================================================================
     TARJETAS INLINE — "Acerca de" y resultado del Simulacro PNE 11.º
     Ambas solo muestran un mensaje + botón que abre el mismo modal
     (una sola fuente de verdad para PayPal/SINPE).
     ================================================================ */
  function _aboutCardHTML() {
    return `
      <div class="mqc-support-inline mqc-support-inline-about">
        <button class="btn btn-ghost btn-sm mqc-support-open-btn" id="mqc-support-open-about">
          ♡ Apoyar MQC
        </button>
      </div>`;
  }

  function _pneCardHTML() {
    return `
      <div class="mqc-support-inline mqc-support-inline-pne">
        <p class="mqc-support-inline-msg">${MSG_PNE_CIERRE}</p>
        <button class="btn btn-primary btn-sm mqc-support-open-btn" id="mqc-support-open-pne">
          💙 APOYAR MÁSQUECIENCIA
        </button>
      </div>`;
  }

  /* ── Inyección en "Acerca de" (placeholder generado por router.js,
       archivo congelado — no se edita; se observa el DOM desde afuera) */
  function _injectAboutCard(content) {
    if (content.querySelector('#mqc-support-open-about')) return; /* ya inyectada */
    const page = content.querySelector('.placeholder-page');
    if (!page) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = _aboutCardHTML();
    page.appendChild(wrap.firstElementChild);
    const btn = document.getElementById('mqc-support-open-about');
    if (btn) btn.addEventListener('click', openModal);
  }

  /* ── Inyección en el resultado del Simulacro PNE 11.º
       (simulacro-nacional.js es archivo congelado — no se edita).
       Se agrega SOLO cuando la vista de resultados ya está completa
       (nota, proyección, análisis, resultados por ciencia), nunca
       durante el examen ni antes de iniciar. */
  function _injectPneResultCard(content) {
    if (content.querySelector('#mqc-support-open-pne')) return; /* ya inyectada */
    const acciones = content.querySelector('#sn-revisar');
    if (!acciones) return; /* solo existe en la vista de resultados ya renderizada */
    const actionsRow = acciones.closest('div');
    if (!actionsRow) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = _pneCardHTML();
    /* "al final": después de la nota, proyección, análisis y de los
       propios botones de acción (Revisar/Nuevo intento/Historial). */
    actionsRow.parentNode.insertBefore(wrap.firstElementChild, actionsRow.nextSibling);
    const btn = document.getElementById('mqc-support-open-pne');
    if (btn) btn.addEventListener('click', openModal);
  }

  /* ── Observador único de #content: detecta ambas pantallas sin
       tocar router.js ni simulacro-nacional.js. Ligero: solo compara
       un par de selectores tras cada cambio de contenido. ── */
  function _watchContent() {
    const content = document.getElementById('content');
    if (!content) return;
    const observer = new MutationObserver(() => {
      if (content.querySelector('.placeholder-page') && content.textContent.includes('Acerca de la Plataforma')) {
        _injectAboutCard(content);
      }
      if (content.querySelector('#sn-revisar')) {
        _injectPneResultCard(content);
      }
    });
    observer.observe(content, { childList: true });
  }

  /* ================================================================
     INIT — enlaza el acceso discreto del sidebar (definido en
     index.html, ver <button id="sidebar-support-link">) y arranca
     el observador de #content.
     ================================================================ */
  function init() {
    const sidebarLink = document.getElementById('sidebar-support-link');
    if (sidebarLink) sidebarLink.addEventListener('click', openModal);
    _watchContent();
  }

  /* Auto-init: este script se carga al final del <body>, después de
     que el DOM estático (sidebar, #content) ya existe. */
  init();

  return { openModal, closeModal, init };
})();
