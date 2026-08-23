/* ================================================================
   MÁSQUECIENCIA — js/shared/analytics-queue.js
   ================================================================
   Cola de sincronización offline de MQC Analytics v1.0 (Secciones
   20-21 del ticket). Módulo 100% independiente de Storage (núcleo
   académico) — usa su propia clave de localStorage, así que un fallo
   aquí NUNCA puede afectar el progreso académico real del estudiante.

   Si MQC_ANALYTICS_CONFIG.enabled !== true, este módulo no hace nada:
   push() guarda localmente pero nunca intenta enviar nada a ningún
   servidor. Así, mientras no se configure Supabase (ver
   README_ANALYTICS_SETUP.md), MásQueCiencia sigue funcionando
   exactamente igual que antes de esta fase.

   API pública:
     AnalyticsQueue.push(tabla, payload)  → encola (y trata de enviar) un evento
     AnalyticsQueue.flush()               → reintenta todos los eventos pendientes
     AnalyticsQueue.pendingCount()        → cuántos eventos siguen sin confirmar
================================================================ */
window.AnalyticsQueue = (function () {
  'use strict';

  const QUEUE_KEY = 'mqc_analytics_queue_v1';
  const MAX_INTENTOS_POR_CICLO = 1; // no reintentar agresivamente; se reintenta en cada flush() posterior
  let _flushing = false;

  /* ── localStorage crudo, aislado de Storage (núcleo) ── */
  function _lsGet() {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function _lsSet(arr) {
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(arr)); } catch (e) { /* silencioso a propósito */ }
  }

  function _config() {
    return (typeof window.MQC_ANALYTICS_CONFIG === 'object' && window.MQC_ANALYTICS_CONFIG) || { enabled: false };
  }

  function _genEventId() {
    return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
  }

  /**
   * Encola un evento para una tabla remota. `payload` debe incluir ya
   * todos los campos de esa tabla (profile_id, etc.) EXCEPTO event_id,
   * que este módulo genera y agrega automáticamente si falta.
   * Intenta enviarlo de inmediato; si falla, queda en la cola local
   * para el próximo flush() (automático al recuperar conexión, o al
   * cargar la app).
   */
  function push(tabla, payload) {
    if (!tabla || typeof payload !== 'object' || payload === null) return;
    const evento = {
      tabla: tabla,
      payload: Object.assign({}, payload, { event_id: payload.event_id || _genEventId() }),
      creadoEn: Date.now(),
      intentos: 0
    };
    const cola = _lsGet();
    cola.push(evento);
    _lsSet(cola);
    // Intento inmediato, sin bloquear al llamador (fire-and-forget).
    flush();
  }

  function pendingCount() {
    return _lsGet().length;
  }

  async function _enviarUno(evento) {
    const cfg = _config();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/' + tablaRemota(evento.tabla);
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.supabaseAnonKey,
        'Authorization': 'Bearer ' + cfg.supabaseAnonKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(evento.payload)
    });
    // 201 = insertado. 409 = ya existía ese event_id (dedup, Sección 21) →
    // se trata como éxito, porque significa que un envío anterior sí llegó.
    if (resp.status === 201 || resp.status === 409) return true;
    return false;
  }

  function tablaRemota(nombreLogico) {
    const cfg = _config();
    return (cfg.tablas && cfg.tablas[nombreLogico]) || nombreLogico;
  }

  /**
   * Reintenta enviar todos los eventos pendientes. Seguro de llamar
   * muchas veces seguidas (usa un candado simple _flushing).
   */
  async function flush() {
    const cfg = _config();
    if (!cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return; // Analytics no configurado — no-op
    if (_flushing) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return; // sin conexión, ni lo intentes
    _flushing = true;
    try {
      let cola = _lsGet();
      if (cola.length === 0) return;
      const restantes = [];
      for (const evento of cola) {
        let ok = false;
        try { ok = await _enviarUno(evento); } catch (e) { ok = false; }
        if (!ok) {
          evento.intentos = (evento.intentos || 0) + 1;
          restantes.push(evento);
        }
      }
      _lsSet(restantes);
    } finally {
      _flushing = false;
    }
  }

  /* Reintentar automáticamente al recuperar conexión y al cargar la app. */
  if (typeof window !== 'undefined') {
    window.addEventListener('online', flush);
    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(flush, 1500);
      } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(flush, 1500));
      }
    }
  }

  return { push, flush, pendingCount };
})();
