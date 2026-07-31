/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/launcher.js  |  FASE 1.5 — Accesos flotantes
   ================================================================
   Inyecta un grupo de botones flotantes (abajo a la izquierda) para
   abrir: Buscador global, Glosario y panel de Accesibilidad (PNE).
   Se auto-inyecta tras cargar el DOM; no modifica el HTML del core.
   ================================================================ */

(function () {
  'use strict';

  function buildPneOverlay() {
    if (typeof PNE === 'undefined') return;
    const old = document.getElementById('qi-pne-overlay');
    if (old) { old.remove(); return; }
    const ov = document.createElement('div');
    ov.className = 'qi-overlay';
    ov.id = 'qi-pne-overlay';
    /* HOTFIX-04: el interruptor de sonido vive en el mismo panel por
       conveniencia de interfaz (un solo lugar de preferencias para
       el estudiante) — pero photon-sound.js es completamente
       independiente de pne.js, no hay acoplamiento de código. */
    const soundRow = (typeof PhotonSound !== 'undefined') ? `
        <label class="qi-pne-row">
          <span>🔊 Sonidos de La Curiosidad</span>
          <input type="checkbox" class="qi-pne-toggle" id="qi-sound-toggle" ${PhotonSound.isEnabled() ? 'checked' : ''}>
        </label>` : '';
    ov.innerHTML = `<div class="qi-overlay-card">
        <div class="qi-overlay-head"><h3>♿ Accesibilidad</h3>
          <button class="btn btn-ghost btn-sm" id="qi-pne-x">✕</button></div>
        <div class="qi-overlay-body">${PNE.renderPanel()}${soundRow}</div>
      </div>`;
    document.body.appendChild(ov);
    PNE.bindPanel(ov);
    const soundToggle = document.getElementById('qi-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('change', () => {
        PhotonSound.setEnabled(soundToggle.checked);
        if (soundToggle.checked) PhotonSound.play('celebracion'); /* confirmación audible inmediata al activar */
      });
    }
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    document.getElementById('qi-pne-x').addEventListener('click', () => ov.remove());
  }

  function inject() {
    /* EOP-023: los accesos rápidos ya NO flotan sobre la interfaz.
       Viven de forma permanente en el sidebar (ver index.html,
       .mqc-quick-access). Este módulo solo ata los mismos listeners
       a esos botones fijos — misma funcionalidad, sin barra flotante. */
    const btnSearch = document.getElementById('qi-launch-search');
    const btnGloss  = document.getElementById('qi-launch-gloss');
    const btnPne    = document.getElementById('qi-launch-pne');
    if (!btnSearch && !btnGloss && !btnPne) return; /* sidebar aún no montado */

    if (btnSearch) btnSearch.addEventListener('click', () => {
      if (typeof GlobalSearch !== 'undefined') GlobalSearch.open();
    });
    if (btnGloss) btnGloss.addEventListener('click', () => {
      if (typeof Glossary !== 'undefined') Glossary.openOverlay();
    });
    if (btnPne) btnPne.addEventListener('click', buildPneOverlay);

    /* Atajo de teclado: Ctrl/Cmd + K abre el buscador */
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (typeof GlobalSearch !== 'undefined') GlobalSearch.open();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
