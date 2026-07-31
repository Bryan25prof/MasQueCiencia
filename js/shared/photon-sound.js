/* ================================================================
   MÁSQUECIENCIA — js/shared/photon-sound.js
   Sonidos cortos de "La Curiosidad" por estado (HOTFIX-04)
   ================================================================
   Generados en código con la Web Audio API — sin archivos de audio
   externos, 0 peso agregado, 100% offline. Los mismos tonos ya
   validados y aprobados en el laboratorio de sonido de prueba.

   Independiente de pne.js a propósito (el sonido no es una bandera
   de accesibilidad, es una preferencia general de la plataforma) —
   se integra en el mismo panel de accesibilidad solo por conveniencia
   de interfaz, no por acoplamiento de código.

   Integración: un único punto de enganche real, dentro de
   Photon.setState() (ver photon.js) — no requiere tocar ninguna de
   las 9 unidades ni gamification.js.
================================================================ */
(function () {
  'use strict';

  let ctx = null;
  function _getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }

  /* ── Persistencia (independiente de PNE.FLAGS a propósito) ───── */
  function _settings() {
    if (typeof Storage === 'undefined' || !Storage.get) return { enabled: true };
    return Storage.get('sound') || { enabled: true };
  }
  function isEnabled() {
    const s = _settings();
    return s.enabled !== false; /* por defecto activado */
  }
  function setEnabled(bool) {
    if (typeof Storage !== 'undefined' && Storage.set) Storage.set('sound', { enabled: !!bool });
  }

  /* ── Generación de un tono individual (envolvente suave, sin clics) ── */
  function _tone(ac, master, freq, start, dur, type, gainMul, glideTo) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, ac.currentTime + start);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, ac.currentTime + start + dur);
    const peak = (gainMul !== undefined ? gainMul : 1) * 0.5; /* volumen base moderado, no configurable por ahora */
    gain.gain.setValueAtTime(0, ac.currentTime + start);
    gain.gain.linearRampToValueAtTime(peak, ac.currentTime + start + Math.min(0.02, dur * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(ac.currentTime + start);
    osc.stop(ac.currentTime + start + dur + 0.05);
  }

  /* ── Los 5 tonos validados en el laboratorio, mapeados a estados
     REALES de Photon (mismo vocabulario cerrado, ninguno inventado).
     Nota: el sonido de "insignia desbloqueada" del laboratorio de
     prueba no se incluye como entrada separada — cuando se
     desbloquea una insignia, el propio EVENT_MAP de photon.js ya lo
     traduce a 'celebracion' (el mismo estado que "examen aprobado"),
     así que comparte naturalmente ese mismo tono sin necesitar un
     gancho aparte. */
  const SOUNDS = {
    'motivacion': (ac, m) => { _tone(ac, m, 587, 0, 0.09, 'sine', 0.5); _tone(ac, m, 880, 0.07, 0.14, 'sine', 0.55); },      /* correcto */
    'ayuda':      (ac, m) => { _tone(ac, m, 311, 0, 0.16, 'sine', 0.4, 260); },                                              /* incorrecto, suave */
    'celebracion':(ac, m) => { _tone(ac, m, 659, 0, 0.22, 'triangle', 0.45); _tone(ac, m, 987, 0.05, 0.28, 'sine', 0.4); _tone(ac, m, 1318, 0.11, 0.3, 'sine', 0.28); }, /* también suena para insignia desbloqueada */
    'nivel':      (ac, m) => { [523, 659, 784, 1046].forEach((f, i) => _tone(ac, m, f, i * 0.075, 0.2, 'triangle', 0.42)); _tone(ac, m, 1568, 0.32, 0.35, 'sine', 0.3); },
    'desafio':    (ac, m) => { _tone(ac, m, 392, 0, 0.1, 'sawtooth', 0.18); _tone(ac, m, 392, 0.12, 0.16, 'sawtooth', 0.22); }
  };

  /* ── API pública ───────────────────────────────────────────────
     play(stateName) — llamar con el nombre de estado de Photon.
     Silencioso si: el sonido está desactivado; el estado no tiene
     tono asignado (reposo, pensando, esperando, bienvenida,
     despedida — deliberadamente sin sonido, para no saturar cada
     transición menor); el navegador no soporta Web Audio; o no hubo
     todavía ninguna interacción del usuario con la página (política
     de autoplay del navegador — se silencia el error, nunca ensucia
     la consola). */
  function play(name) {
    if (!isEnabled()) return;
    const fn = SOUNDS[name];
    if (!fn) return;
    const ac = _getCtx();
    if (!ac) return;
    try {
      const master = ac.createGain();
      master.gain.value = 1;
      master.connect(ac.destination);
      fn(ac, master);
    } catch (e) { /* silencioso: el sonido nunca debe bloquear ni ensuciar la consola */ }
  }

  window.PhotonSound = { play, isEnabled, setEnabled };
})();
