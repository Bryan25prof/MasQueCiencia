/* ================================================================
   MÁSQUECIENCIA — js/shared/access-control.js
   ================================================================
   PENDIENTE D — Paso 2: AccessControl + bloqueo de escrituras
   académicas docentes.

   Único punto de lectura del rol docente PARA FINES DE ACCESO en
   todo el proyecto (ver MQC_PENDIENTE_D_DIAGNOSTICO.md, sección 1 y
   5). No inventa una fuente de verdad nueva: lee exactamente
   MQCProfiles.activeMeta().rol y .rolVerificadoEn, los mismos campos
   ya implementados en Activación Docente (Pendiente D, paso 1).

   REGLA DE PRODUCTO (Bryan, decisión del diagnóstico — sin
   excepciones): "DOCENTE EXPLORA; ESTUDIANTE PROGRESA."
   - Un docente verificado (rol='docente' Y rolVerificadoEn con
     timestamp real) puede ACCEDER a cualquier contenido, sin
     importar el progreso real que tenga.
   - Un docente NO verificado (rol='docente' pero rolVerificadoEn
     vacío — autodeclarado, nunca pasó por el código real de
     Supabase) NO recibe ningún bypass: ve exactamente los mismos
     candados que un estudiante. Esto es intencional — mitiga el
     riesgo #1 del diagnóstico (rol autodeclarado sin verificación).
   - Acceso NUNCA implica progreso: ver js/core/gamification.js
     (addXP/checkBadges) y js/core/storage.js (las 8 funciones de
     escritura de unidad) para la Capa 2 (bloqueo de escritura), que
     es la que de verdad protege XP/examBest/badges/acreditaciones.

   AccessControl.isTeacher() y AccessControl.canExplore(condicion)
   son las DOS únicas funciones que este archivo expone. No
   reimplementan ninguna lógica de desbloqueo existente — cada punto
   de guarda real (Química 11.º, Física 10.º/11.º, Desafío Final
   PNE, Simulacro Nacional) sigue calculando su propia condición
   exactamente igual que siempre, y solo le agrega `|| isTeacher()`
   pasándola por canExplore().
================================================================ */
window.AccessControl = (function () {
  'use strict';

  /**
   * true solo si el perfil activo es rol='docente' Y pasó la
   * verificación real de Activación Docente (rolVerificadoEn con
   * timestamp). Un docente autodeclarado sin verificar devuelve
   * false — nunca recibe acceso total.
   * Defensivo: si MQCProfiles no está cargado, o no hay perfil
   * activo (invitado, o ningún perfil creado todavía), devuelve
   * false sin lanzar error.
   */
  function isTeacher() {
    if (typeof MQCProfiles === 'undefined' || !MQCProfiles || typeof MQCProfiles.activeMeta !== 'function') {
      return false;
    }
    let meta;
    try { meta = MQCProfiles.activeMeta(); } catch (e) { return false; }
    return !!(meta && meta.rol === 'docente' && meta.rolVerificadoEn);
  }

  /**
   * Envuelve una condición de desbloqueo REAL ya calculada por el
   * módulo que la usa (nunca la reemplaza ni la reimplementa).
   * @param {boolean} condicionReal — el resultado de la lógica de
   *        desbloqueo existente (ej. g11.unlocked, estado.desbloqueado)
   * @returns {boolean} condicionReal || isTeacher()
   */
  function canExplore(condicionReal) {
    return !!condicionReal || isTeacher();
  }

  return { isTeacher, canExplore };
})();
