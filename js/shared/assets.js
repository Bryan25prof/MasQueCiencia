/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/assets.js  |  FASE 1.5 — Sistema universal de imágenes
   ================================================================
   Manejo estandarizado de imágenes por unidad, compatible con file://
     · UnitAssets.register(unitId, map) — map: nombre → {src, alt}.
     · UnitAssets.img(unitId, name, opts) — devuelve <img> con
       degradación elegante: si la imagen no existe, muestra un
       placeholder SVG generado en el momento (nunca rompe el diseño).
   CONVENCIÓN DE RUTAS: assets/unidades/<unitId>/<archivo>
   ================================================================ */

window.UnitAssets = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → { name → {src, alt} } */

  function register(unitId, map) {
    if (!map) return;
    _byUnit[unitId] = Object.assign(_byUnit[unitId] || {}, map);
  }

  function get(unitId, name) {
    return (_byUnit[unitId] && _byUnit[unitId][name]) || null;
  }

  /* Placeholder SVG (data-URI) — funciona sin archivos ni red */
  function placeholder(label, color) {
    color = color || '#00BCD4';
    /* EOP-038 — CORRECCIÓN: antes se cortaba con .slice(0,40) sin
       importar si caía a mitad de una palabra (ej. "cambios de
       estado" quedaba "cambios de estad"). Ahora corta en el último
       espacio antes del límite y agrega "…" solo si de verdad hubo
       que acortar. */
    const raw = label || 'Imagen';
    const LIMIT = 42;
    let txt = raw;
    if (raw.length > LIMIT) {
      const cut = raw.slice(0, LIMIT);
      const lastSpace = cut.lastIndexOf(' ');
      txt = (lastSpace > 10 ? cut.slice(0, lastSpace) : cut) + '…';
    }
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='220'>
        <rect width='100%' height='100%' fill='#10161d'/>
        <rect x='8' y='8' width='384' height='204' rx='12' fill='none' stroke='${color}' stroke-dasharray='6 6' opacity='.6'/>
        <text x='50%' y='46%' fill='${color}' font-family='sans-serif' font-size='34' text-anchor='middle'>🖼️</text>
        <text x='50%' y='66%' fill='#8aa' font-family='sans-serif' font-size='15' text-anchor='middle'>${txt}</text>
      </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  /* Devuelve el HTML de una imagen con fallback automático a placeholder */
  function img(unitId, name, opts) {
    opts = opts || {};
    const entry = get(unitId, name);
    const alt = (entry && entry.alt) || opts.alt || name;
    const ph = placeholder(alt, opts.color);
    const src = (entry && entry.src) ? entry.src : ph;
    const cls = 'qi-img' + (opts.className ? ' ' + opts.className : '');
    /* onerror → si el archivo no se encuentra (offline), usa el placeholder */
    return `<figure class="qi-figure">
      <img class="${cls}" src="${src}" alt="${alt}"
           loading="lazy" onerror="this.onerror=null;this.src='${ph}';">
      ${opts.caption ? `<figcaption class="qi-figcaption">${opts.caption}</figcaption>` : ''}
    </figure>`;
  }

  return { register, get, img, placeholder };
})();
