/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/shared/media.js  |  FASE 1.5 — Sistema de videos educativos
   ================================================================
   Arquitectura LISTA para videos (aún sin contenido de otras unidades).
     · UnitMedia.register(unitId, [ {id,title,topic,src,poster} ]).
     · UnitMedia.forUnit(unitId) / forTopic(unitId, topicId).
     · UnitMedia.embed(video) — <video> local si hay src; si no, una
       tarjeta "Video próximamente" (no rompe nada offline).
   Pensado para archivos locales (file://) o rutas relativas; no asume
   YouTube ni conexión. Cada unidad registra sus videos en su manifest.
   ================================================================ */

window.UnitMedia = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → [video, ...] */

  function register(unitId, videos) {
    if (!Array.isArray(videos)) return;
    _byUnit[unitId] = (_byUnit[unitId] || []).concat(videos);
  }
  function forUnit(unitId) { return (_byUnit[unitId] || []).slice(); }
  function forTopic(unitId, topicId) {
    return forUnit(unitId).filter(v => v.topic === topicId);
  }

  /* Embebe un video; degrada a placeholder si no hay archivo */
  function embed(video) {
    if (!video) return '';
    if (video.src) {
      return `<div class="qi-video">
        <video controls preload="none" ${video.poster ? `poster="${video.poster}"` : ''}>
          <source src="${video.src}">
          Tu navegador no puede reproducir este video.
        </video>
        ${video.title ? `<div class="qi-video-title">🎬 ${video.title}</div>` : ''}
      </div>`;
    }
    /* Placeholder: el sistema está listo, el video se añadirá luego */
    return `<div class="qi-video qi-video-soon">
      <div class="qi-video-soon-icon">📹</div>
      <div class="qi-video-soon-text">
        <strong>${video.title || 'Video educativo'}</strong>
        <span>Disponible próximamente</span>
      </div>
    </div>`;
  }

  /* Render de todos los videos de una unidad (o de un tema) */
  function render(unitId, topicId) {
    const list = topicId ? forTopic(unitId, topicId) : forUnit(unitId);
    if (!list.length) return '';
    return '<div class="qi-video-grid">' + list.map(embed).join('') + '</div>';
  }

  return { register, forUnit, forTopic, embed, render };
})();
