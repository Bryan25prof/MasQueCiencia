/* ================================================================
   MÁSQUECIENCIA — js/modules/atlas-quimico.js
   Vista "Atlas Químico MQC" — función oficial de la Unidad IV
   ================================================================
   Reutiliza exactamente el Design System existente (mismas tarjetas,
   colores, tipografía) — no se crea ninguna interfaz nueva. Muestra
   las 9 fichas de grupos funcionales y las 4 de biomoléculas, con su
   estado real (Descubierto / No descubierto) por perfil.
================================================================ */

Router.register('atlas-quimico', (() => {
  'use strict';

  function _card(item, kind) {
    const disc = (typeof AtlasQuimico !== 'undefined') ? AtlasQuimico.isDiscovered(item.id) : false;
    const rep = kind === 'grupo' ? item.representacion : item.funcion;
    const color = disc ? '#5CF2A8' : 'var(--text-muted)';
    return `
      <div class="unit-card ${disc ? '' : 'unit-card-locked'}" style="--unit-color:${color}">
        <div class="unit-badge" style="color:${disc ? '#5CF2A8' : 'var(--text-muted)'};border-color:${disc ? '#5CF2A855' : 'var(--border)'}">${disc ? '✓ Descubierto' : '🔒 No descubierto'}</div>
        <div class="unit-symbol">${disc ? '🧬' : '❔'}</div>
        <div class="unit-name">${disc ? item.nombre : '???'}</div>
        <div class="unit-meta">
          ${disc ? `
            <span class="unit-meta-item unit-meta-item-clamp"><strong>${kind === 'grupo' ? 'Representación' : 'Función'}:</strong> ${rep}</span>
            <span class="unit-meta-item unit-meta-item-clamp"><strong>Ejemplo:</strong> ${item.ejemplo}</span>
            <span class="unit-meta-item unit-meta-item-clamp">${kind === 'grupo' ? item.aplicacion : item.importancia}</span>
          ` : `<span class="unit-meta-item">Identificalo en la Unidad IV para desbloquear esta ficha.</span>`}
        </div>
      </div>`;
  }

  function _render() {
    if (typeof ATLAS_QUIMICO_DATA === 'undefined') {
      return `<div class="section-header"><h2 class="section-heading">Atlas Químico MQC</h2></div><p style="color:var(--text-muted)">El Atlas todavía no está disponible.</p>`;
    }
    const prog = AtlasQuimico.progress();
    const grupos = ATLAS_QUIMICO_DATA.gruposFuncionales.map(g => _card(g, 'grupo')).join('');
    const biomol = ATLAS_QUIMICO_DATA.biomoleculas.map(b => _card(b, 'biomolecula')).join('');
    return `
      <div class="section-header">
        <p class="section-title">Química 11.º</p>
        <h2 class="section-heading">🧬 Atlas Químico MQC</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:1rem;max-width:60ch">
        Una colección de los conceptos que vas descubriendo en Química 11.º. Cada ficha se desbloquea sola, la primera vez que identificás correctamente ese grupo funcional o esa biomolécula — no otorga XP, es tu evidencia de aprendizaje.
      </p>
      <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:1.5rem;max-width:400px">
        <div class="progress-bar" style="flex:1"><div class="progress-fill progress-fill-cyan" style="width:${prog.pct}%;background:#5CF2A8"></div></div>
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">${prog.discovered}/${prog.total}</span>
      </div>

      <h3 style="font-size:1rem;color:var(--text-primary);margin:0 0 .7rem">Grupos funcionales</h3>
      <div class="units-grid" style="margin-bottom:2rem">${grupos}</div>

      <h3 style="font-size:1rem;color:var(--text-primary);margin:0 0 .7rem">Biomoléculas</h3>
      <div class="units-grid">${biomol}</div>
    `;
  }

  function init() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = _render();
  }
  function destroy() {}

  return { init, destroy };
})());
