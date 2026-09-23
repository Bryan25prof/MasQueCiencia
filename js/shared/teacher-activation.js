/* ================================================================
   MÁSQUECIENCIA — js/shared/teacher-activation.js
   ================================================================
   PENDIENTE D — paso previo: Activación Docente.
   Único punto del cliente que habla con la función RPC de Supabase
   `validar_codigo_docente` (ver SUPABASE_MIGRATION_activacion_
   docente.sql). Reutiliza exactamente el mismo patrón de conexión que
   ya usa js/shared/analytics-queue.js (fetch directo a la API REST de
   Supabase con la "anon key", sin ninguna librería adicional) — no se
   introduce ningún cliente ni dependencia nueva.

   Este archivo NUNCA contiene el código de activación real ni ningún
   secreto: solo envía lo que la persona escribió y recibe `true`/
   `false` desde el servidor. El código en sí vive únicamente, como
   hash, dentro de la base de datos de Supabase.

   API pública:
     MQCTeacherActivation.activar(codigo) → Promise<{ok, reason}>
       ok=true                 → código válido, ya se puede marcar el
                                  perfil como docente verificado.
       ok=false, reason=
         'invalido'             → el código no coincide con ninguno
                                  activo (o la IP está temporalmente
                                  limitada por intentos repetidos — el
                                  servidor no distingue ambos casos a
                                  propósito, para no filtrar
                                  información).
         'sin-conexion'         → no hay red, o la petición falló.
         'no-configurado'       → esta instalación de MQC no tiene
                                  Supabase/Analytics configurado
                                  (MQC_ANALYTICS_CONFIG.enabled !== true
                                  o faltan supabaseUrl/supabaseAnonKey).
                                  No existe ningún mecanismo alterno de
                                  respaldo en el frontend — por diseño.

   Este módulo NO decide nada por sí mismo sobre el perfil local (no
   toca MQCProfiles ni Storage) — solo responde la pregunta "¿es
   válido este código?". Quien lo llama (js/shared/profiles-ui.js) es
   quien decide qué hacer con la respuesta.
================================================================ */
window.MQCTeacherActivation = (function () {
  'use strict';

  function _config() {
    return (typeof window.MQC_ANALYTICS_CONFIG === 'object' && window.MQC_ANALYTICS_CONFIG) || { enabled: false };
  }

  async function activar(codigo) {
    const cfg = _config();
    if (!cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      return { ok: false, reason: 'no-configurado' };
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return { ok: false, reason: 'sin-conexion' };
    }

    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/rpc/validar_codigo_docente';
    let resp;
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.supabaseAnonKey,
          'Authorization': 'Bearer ' + cfg.supabaseAnonKey
        },
        body: JSON.stringify({ p_codigo: String(codigo == null ? '' : codigo) })
      });
    } catch (e) {
      return { ok: false, reason: 'sin-conexion' };
    }

    if (!resp || !resp.ok) return { ok: false, reason: 'sin-conexion' };

    let body;
    try { body = await resp.json(); } catch (e) { return { ok: false, reason: 'sin-conexion' }; }

    return body === true ? { ok: true, reason: null } : { ok: false, reason: 'invalido' };
  }

  return { activar };
})();
