/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/mentor.js  |  Mentor MQC — acompañante pedagógico
   ================================================================
   La voz del Método MQC. Da orientación breve en cada pestaña/tema
   ("¿qué vas a comprender aquí y por qué importa?"), integra las
   ayudas progresivas (Hints) y la lectura por voz (PNE.speak).
   No reimplementa nada: reutiliza Hints y PNE.

   API:
     Mentor.register(unitId, map)  map: { 'tab:teoria':'…', 'topic-0':'…' }
     Mentor.message(unitId, key)   → texto (o null)
     Mentor.render(unitId, key)    → HTML de la tarjeta del mentor
     Mentor.bind(root)             → activa el botón de lectura por voz
================================================================ */

window.Mentor = (function () {
  'use strict';

  const _byUnit = {};   /* unitId → { key → mensaje } */

  function register(unitId, map) {
    if (!map) return;
    _byUnit[unitId] = Object.assign(_byUnit[unitId] || {}, map);
  }
  function message(unitId, key) { return (_byUnit[unitId] && _byUnit[unitId][key]) || null; }

  function render(unitId, key) {
    const msg = message(unitId, key);
    if (!msg) return '';
    const canSpeak = (typeof PNE !== 'undefined' && PNE.isEnabled && PNE.isEnabled('lectura-voz'));
    return `<div class="mqc-mentor" data-mentor-text="${String(msg).replace(/"/g, '&quot;')}">
      <span class="mqc-mentor-avatar">🧭</span>
      <div class="mqc-mentor-body">
        <strong class="mqc-mentor-name">Mentor MQC</strong>
        <p>${msg}</p>
      </div>
      ${canSpeak ? `<button class="btn btn-ghost btn-sm mqc-mentor-speak" title="Leer en voz alta">🔊</button>` : ''}
    </div>`;
  }

  function bind(root) {
    (root || document).querySelectorAll('.mqc-mentor-speak').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.mqc-mentor');
        const txt = card && card.getAttribute('data-mentor-text');
        if (txt && typeof PNE !== 'undefined' && PNE.speak) PNE.speak(txt);
      });
    });
  }

  return { register, message, render, bind };
})();
