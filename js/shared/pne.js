/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/pne.js  |  FASE 1.5 — Andamiaje para módulo PNE
   ================================================================
   PNE = apoyo a estudiantes con Necesidades Educativas / accesibilidad.
   Este archivo NO implementa el módulo completo: prepara el PUNTO DE
   EXTENSIÓN para que un módulo PNE futuro se integre SIN modificar la
   estructura principal.
     · PNE.set(flag, bool) / PNE.isEnabled(flag) — banderas persistidas
       en Storage.settings (contraste, texto grande, lectura por voz,
       modo simplificado).
     · PNE.apply() — aplica clases al <body> (pne-*) que el CSS estiliza.
     · PNE.speak(text) — lectura por voz si el navegador la soporta.
     · PNE.registerModule(impl) — gancho: un módulo PNE futuro registra
       aquí su lógica avanzada; el core la invoca sin conocer detalles.
     · PNE.renderPanel() — panel de accesibilidad embebible en cualquier lado.
   ================================================================ */

window.PNE = (function () {
  'use strict';

  const FLAGS = ['contraste', 'texto-grande', 'lectura-voz', 'simplificado'];
  const LABELS = {
    'contraste': '🌗 Alto contraste',
    'texto-grande': '🔠 Texto grande',
    'lectura-voz': '🔊 Lectura por voz (Experimental)',
    'simplificado': '🧩 Modo simplificado (Experimental)'
  };
  let _module = null;   /* módulo PNE futuro (extensión) */

  /* ── Persistencia en Storage.settings.pne ───────────────────── */
  function _settings() {
    if (typeof Storage === 'undefined' || !Storage.get) return {};
    const s = Storage.get('settings') || {};
    return s.pne || {};
  }
  function isEnabled(flag) { return !!_settings()[flag]; }

  function set(flag, bool) {
    if (FLAGS.indexOf(flag) === -1) return;
    if (typeof Storage !== 'undefined' && Storage.set) {
      const s = Storage.get('settings') || {};
      s.pne = Object.assign({}, s.pne, { [flag]: !!bool });
      Storage.set('settings', s);
    }
    apply();
    if (_module && typeof _module.onChange === 'function') {
      try { _module.onChange(flag, !!bool); } catch (e) {}
    }
  }

  /* ── Aplica las preferencias al documento ───────────────────── */
  function apply() {
    if (typeof document === 'undefined' || !document.body) return;
    const s = _settings();
    FLAGS.forEach(f => document.body.classList.toggle('pne-' + f, !!s[f]));
    if (_module && typeof _module.onApply === 'function') {
      try { _module.onApply(s); } catch (e) {}
    }
  }

  /* ── Lectura por voz (si el navegador la soporta) ───────────── */
  function speak(text) {
    if (!isEnabled('lectura-voz')) return;
    if (_module && typeof _module.speak === 'function') { _module.speak(text); return; }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
  }

  /* ── Gancho de extensión para el módulo PNE futuro ──────────── */
  function registerModule(impl) {
    _module = impl || null;
    if (_module && typeof _module.init === 'function') {
      try { _module.init({ FLAGS, isEnabled, set, apply, speak }); } catch (e) {}
    }
    apply();
  }

  /* ── Panel de accesibilidad (embebible) ─────────────────────── */
  function renderPanel() {
    const s = _settings();
    return `<div class="qi-pne-panel">
      <div class="qi-pne-title">♿ Accesibilidad</div>
      ${FLAGS.map(f => `
        <label class="qi-pne-row">
          <span>${LABELS[f]}</span>
          <input type="checkbox" class="qi-pne-toggle" data-flag="${f}" ${s[f] ? 'checked' : ''}>
        </label>`).join('')}
      <p class="qi-pne-note">Las preferencias se guardan y se aplican a toda la plataforma. Las marcadas "Experimental" funcionan de forma básica y seguirán mejorando.</p>
    </div>`;
  }

  function bindPanel(root) {
    (root || document).querySelectorAll('.qi-pne-toggle').forEach(t => {
      t.addEventListener('change', () => set(t.dataset.flag, t.checked));
    });
  }

  /* Aplica preferencias guardadas al cargar */
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
    else apply();
  }

  return { FLAGS, LABELS, isEnabled, set, apply, speak, registerModule, renderPanel, bindPanel };
})();
