/* ================================================================
   MÁSQUECIENCIA — js/shared/molecule-renderer.js
   HOTFIX-10 PREMIUM — Renderizador reutilizable de estructuras
   ================================================================
   Un único renderizador para mostrar una molécula (formato de
   "segmentos", ver moleculas-reales.js) de dos formas:
   - estática (solo lectura, para el examen/misión/comparaciones);
   - interactiva (clic sobre el segmento, para el Escáner Molecular).

   Construido para reutilizarse sin duplicar código en ningún otro
   simulador/examen de esta unidad — y, según el ticket, como base
   para el futuro Centro Nacional de Preparación PNE.
================================================================ */
window.MoleculeRenderer = (function () {
  'use strict';

  function _groupColor(tag) {
    /* Un color estable por grupo, no arbitrario en cada llamada —
       reutiliza el mismo cian del Design System para "neutro". */
    if (!tag) return 'var(--text-muted)';
    const palette = { alcano:'#8484D6', alqueno:'#8484D6', alquino:'#8484D6',
      alcohol:'#1FDBFF', aldehido:'#7B2FFF', cetona:'#7B2FFF',
      'acido-carboxilico':'#FF6B6B', ester:'#F9FF4D', eter:'#5CF2A8',
      amina:'#FFA94D', amida:'#FFA94D' };
    return palette[tag] || '#5CF2A8';
  }

  /* Vista estática — solo lectura, usada en examen/misión/comparaciones */
  function renderStatic(molecule, opts) {
    opts = opts || {};
    const chips = molecule.segments.map(seg => {
      const color = _groupColor(seg.tag);
      return `<span style="display:inline-block;padding:.3rem .6rem;margin:.15rem;border-radius:var(--radius-md);
                    font-family:var(--font-code);font-size:.82rem;
                    background:${seg.tag ? color + '22' : 'var(--bg-elevated)'};
                    border:1px solid ${seg.tag ? color : 'var(--border)'};
                    color:${seg.tag ? color : 'var(--text-secondary)'}">${seg.text}</span>`;
    }).join('');
    return `<div style="text-align:center;line-height:2.4">${chips}</div>`;
  }

  /* Vista interactiva — el estudiante toca directamente sobre el
     segmento que cree que es el grupo funcional. onGuess(tag, correcto)
     se llama con el resultado. Los segmentos "neutros" (sin grupo)
     también son tocables, para que equivocarse sea una opción real,
     no solo elegir entre las respuestas ya marcadas. */
  function renderInteractive(molecule, containerId, onGuess) {
    const chips = molecule.segments.map((seg, i) => {
      return `<button data-mol-seg="${i}" style="display:inline-block;padding:.4rem .7rem;margin:.15rem;border-radius:var(--radius-md);
                    font-family:var(--font-code);font-size:.85rem;cursor:pointer;
                    background:var(--bg-elevated);border:1px solid var(--border);
                    color:var(--text-secondary)">${seg.text}</button>`;
    }).join('');
    return `<div id="${containerId}" style="text-align:center;line-height:2.6">${chips}</div>`;
  }

  /* Pega los listeners de la vista interactiva — separado de
     renderInteractive() porque el HTML se inyecta antes de que el
     nodo exista en el DOM real (mismo patrón que el resto de MQC).
     SPRINT PRE-PNE — Parte V: cuando el acierto es correcto, el
     segmento tocado recibe un resalte propio (glow + borde más
     grueso) distinto del resto de grupos de la molécula, que solo
     reciben el color normal — así "resaltar exactamente el grupo
     encontrado" es literal, no solo textual. */
  function bindInteractive(molecule, containerId, onGuess) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('[data-mol-seg]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-mol-seg'), 10);
        const seg = molecule.segments[i];
        container.querySelectorAll('[data-mol-seg]').forEach(b => { b.disabled = true; });
        molecule.segments.forEach((s, j) => {
          if (s.tag) {
            const el = container.querySelector(`[data-mol-seg="${j}"]`);
            if (el) { el.style.borderColor = _groupColor(s.tag); el.style.color = _groupColor(s.tag); el.style.background = _groupColor(s.tag) + '22'; }
          }
        });
        if (!seg.tag) btn.style.borderColor = 'var(--red)';
        else {
          /* el hallazgo exacto: borde más grueso + glow, se distingue
             del resto de grupos "de fondo" de la misma molécula */
          const color = _groupColor(seg.tag);
          btn.style.borderWidth = '2.5px';
          btn.style.boxShadow = `0 0 14px 2px ${color}88`;
          btn.style.fontWeight = '700';
        }
        onGuess(seg.tag, !!seg.tag, i);
      });
    });
  }

  return { renderStatic, renderInteractive, bindInteractive, groupColor: _groupColor };
})();
