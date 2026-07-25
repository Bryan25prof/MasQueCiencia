/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/hints.js  |  FASE 1.5 — Ayudas progresivas
   ================================================================
   Generaliza el sistema de "pistas" (creado en el juego de la Unidad I)
   en un widget reutilizable en cualquier parte: teoría, simuladores,
   exámenes, etc.
     · Hints.attach(container, hints[], opts)
         opts.label     — texto del botón (def. "💡 Necesito una ayuda")
         opts.penalty   — informativo, puntos por pista (opcional)
         opts.onReveal  — callback(indiceRevelado)
       Devuelve { used: () => nº pistas usadas }.
   Cada pista se revela de a una, de forma controlada.
   ================================================================ */

window.Hints = (function () {
  'use strict';

  let _seq = 0;

  function attach(container, hints, opts) {
    if (!container || !Array.isArray(hints) || !hints.length) return { used: () => 0 };
    opts = opts || {};
    const id = 'qi-hints-' + (++_seq);
    let revealed = 0;

    const wrap = document.createElement('div');
    wrap.className = 'qi-hints';
    wrap.id = id;
    container.appendChild(wrap);

    function render() {
      const shown = hints.slice(0, revealed).map((h, i) =>
        `<div class="qi-hint-item">💡 <span>${h}</span></div>`).join('');
      const queda = revealed < hints.length;
      wrap.innerHTML = `
        ${shown}
        ${queda ? `<button class="btn btn-secondary btn-sm qi-hint-btn">
            ${opts.label || '💡 Necesito una ayuda'}
            <span class="qi-hint-count">(${revealed}/${hints.length}${opts.penalty ? ' · −' + opts.penalty + ' pts' : ''})</span>
          </button>` : `<div class="qi-hint-done">No quedan más pistas.</div>`}`;
      const btn = wrap.querySelector('.qi-hint-btn');
      if (btn) btn.addEventListener('click', () => {
        if (revealed < hints.length) {
          revealed++;
          if (typeof opts.onReveal === 'function') opts.onReveal(revealed);
          render();
        }
      });
    }
    render();
    return { used: () => revealed };
  }

  return { attach };
})();
