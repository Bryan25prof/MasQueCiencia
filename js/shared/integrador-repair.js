/* ================================================================
   MÁSQUECIENCIA — js/shared/integrador-repair.js
   HOTFIX-06 — Herramienta de reparación para perfiles YA afectados
   por la duplicación de XP del Proyecto Integrador
   ================================================================
   NO es parte del flujo normal del estudiante — es una herramienta
   de mantenimiento, pensada para usarse desde la consola del
   navegador sobre un perfil específico, cuando se sabe o sospecha
   que sufrió el bug de HOTFIX-06 antes de corregirse.

   Uso:
     IntegradorRepair.diagnose(profileId)   // solo diagnostica, no cambia nada
     IntegradorRepair.repair(profileId, true)  // aplica la reparación (el 'true' es la confirmación explícita)

   Deliberadamente NO se ejecuta automáticamente para ningún perfil.
   Deliberadamente NO intenta revocar insignias — el sistema de
   insignias actual (gamification.js) no tiene mecanismo de revocado
   (checkBadges() solo agrega, nunca quita), y construir uno sería
   modificar un sistema no relacionado con este hotfix. Se documenta
   esta limitación explícitamente en vez de simular una solución
   incompleta.
================================================================ */
(function () {
  'use strict';

  function _loadRawFor(profileId) {
    /* Lee directamente el blob de datos del perfil indicado, sin
       depender de que sea el perfil ACTIVO — para poder diagnosticar
       perfiles distintos al que está en uso en este momento.
       Formato real confirmado en profiles.js: DATA_PREFIX = 'mqc_profile_' */
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem('mqc_profile_' + profileId);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }
  function _saveRawFor(profileId, data) {
    window.localStorage.setItem('mqc_profile_' + profileId, JSON.stringify(data));
  }

  function diagnose(profileId) {
    const data = _loadRawFor(profileId);
    if (!data) return { ok: false, message: 'No se encontró el perfil ' + profileId + ' en localStorage.' };

    const history = (data.xp && data.xp.history) || [];
    const events = history.filter(h => h.source === 'integrador-completado');
    const duplicates = Math.max(0, events.length - 1);
    const duplicateXP = duplicates * 300;

    return {
      ok: true,
      profileId,
      totalEvents: events.length,
      duplicates,
      duplicateXP,
      currentXPTotal: (data.xp && data.xp.total) || 0,
      xpAfterRepair: ((data.xp && data.xp.total) || 0) - duplicateXP,
      currentLevel: data.level || 1,
      needsRepair: duplicates > 0,
      summary: duplicates > 0
        ? `Se encontraron ${events.length} eventos "integrador-completado" (debería haber como máximo 1). ${duplicates} son duplicados, equivalentes a ${duplicateXP} XP de más. Nivel actual: ${data.level||1}.`
        : 'No se encontraron duplicados — este perfil no necesita reparación.'
    };
  }

  function repair(profileId, confirmed) {
    if (confirmed !== true) {
      return { ok: false, message: 'Reparación no aplicada: se requiere pasar confirmed=true explícitamente. Llamá primero a IntegradorRepair.diagnose(profileId) para ver el resumen antes de confirmar.' };
    }
    const diag = diagnose(profileId);
    if (!diag.ok) return diag;
    if (!diag.needsRepair) return { ok: true, applied: false, message: 'Nada que reparar — 0 duplicados.' };

    const data = _loadRawFor(profileId);
    const history = data.xp.history || [];

    /* Conservar el PRIMER evento 'integrador-completado', eliminar
       todos los posteriores — nunca al revés (el primero es el
       legítimo, cronológicamente). */
    let kept = false;
    const newHistory = history.filter(h => {
      if (h.source !== 'integrador-completado') return true;
      if (!kept) { kept = true; return true; }
      return false; // duplicado, se elimina
    });

    const removedCount = history.length - newHistory.length;
    const xpToSubtract = removedCount * 300;

    data.xp.history = newHistory;
    data.xp.total = Math.max(0, (data.xp.total || 0) - xpToSubtract);

    /* Recalcular nivel con la misma tabla que usa Gamification
       (LEVELS está expuesta públicamente) — sin necesitar tocar
       gamification.js para esta reparación. */
    if (typeof Gamification !== 'undefined' && Gamification.LEVELS) {
      const LEVELS = Gamification.LEVELS;
      let newLevel = 1;
      for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (data.xp.total >= LEVELS[i].xp) { newLevel = LEVELS[i].level; break; }
      }
      data.level = newLevel;
    }

    /* Normalizar el estado del integrador: queda completado, con
       submissionCount reflejando que hubo entregas de más, pero
       xpAwarded true (ya se resolvió el pago correcto). */
    if (data.integrador) {
      data.integrador.xpAwarded = true;
    }

    _saveRawFor(profileId, data);

    return {
      ok: true,
      applied: true,
      removedDuplicates: removedCount,
      xpSubtracted: xpToSubtract,
      newXPTotal: data.xp.total,
      newLevel: data.level,
      warning: 'NO se revocó ninguna insignia — el sistema actual de insignias no tiene mecanismo de revocado. Si este perfil desbloqueó alguna insignia por XP (ej. "xp-1000") gracias al XP duplicado ahora corregido, esa insignia permanece otorgada. Ver HOTFIX_06_INTEGRADOR_ANTI_FARMING_REPORT.md para más detalle.'
    };
  }

  window.IntegradorRepair = { diagnose, repair };
})();
