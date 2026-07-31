/* ================================================================
   MÁSQUECIENCIA — js/shared/photon.js
   COMPONENTE TÉCNICO REUTILIZABLE — "La Curiosidad"
   ================================================================
   EOP-034 — CAMBIO DE ARQUITECTURA DEL ACTIVO OFICIAL (decisión
   explícita del propietario del proyecto):

   El activo oficial deja de ser un PNG estático
   (assets/photon/photon-oficial.png, EOP-027 — archivo eliminado en
   la limpieza de Beta v1.0, EOP-035) y pasa a ser el
   MODELO VECTORIAL CON OJOS ENERGÉTICOS (validado como prototipo
   experimental en EOP-028B, ahora promovido a oficial). Motivo
   explícito: el PNG tenía una resolución fuente fija y limitada
   (520×470px); al ser vectorial, este modelo escala sin pérdida a
   cualquier tamaño de pantalla.

   La API PÚBLICA no cambia — ningún archivo que ya llama a
   Photon.mount()/setState()/react()/etc. necesita modificarse:

     Photon.mount(containerEl, opts?)   → crea la instancia y la monta
     Photon.setState(nombre, opts?)     → aplica un estado oficial
     Photon.moveTo(x, y, opts?)         → desplazamiento suave
     Photon.orbit(targetEl, opts?)      → orbita alrededor de un elemento
     Photon.stopOrbit()                 → detiene la órbita
     Photon.float(bool)                 → flotado idle
     Photon.react(eventName)            → evento semántico → estado
     Photon.show() / Photon.hide()      → aparece/desaparece con fade
     Photon.destroy()                   → desmonta y limpia
     Photon.setAsset(url)               → OBSOLETO (ver nota abajo), se mantiene solo por compatibilidad

   Lo que SÍ cambió: ya no hay un archivo externo que cargar. El
   dibujo (núcleo, halo, 3 órbitas, silueta de corazón/interrogante
   para Motivación/Pensando, y los ojos energéticos) vive en este
   mismo archivo, como SVG construido en código — igual que el resto
   del Design System (íconos, fondos). setAsset() queda como no-op
   con aviso de consola, para no romper si algo lo llamaba.

   ESTADOS OFICIALES (10, sin cambios de nomenclatura respecto a
   EOP-026/032): reposo, bienvenida, motivacion, desafio, celebracion,
   nivel, ayuda, pensando, esperando, despedida. Motivación y Pensando
   son los únicos con permiso de variar silueta (corazón/interrogante,
   vocabulario cerrado — ver Adenda de Comportamiento EOP-029).
================================================================ */
(function () {
  'use strict';

  /* ── Parámetros oficiales por estado ──────────────────────────
     color: color base del estado (hue real, no un filtro aproximado)
     shape: 'atom' (10 de 10 por defecto) | 'heart' (Motivación) | 'question' (Pensando)
     orbitSpeedMul / breathe(s) / haloMul: comportamiento (Adenda EOP-029)
     eyes: {gazeX, gazeY, aperture, blink(s)} — expresión de mirada
     transient: efecto de entrada de una sola vez antes de asentarse
     burst / duration: igual semántica que en versiones anteriores */
  var STATE_PARAMS = {
    'reposo':      { color:'#4FD6E8', shape:'atom',     orbitSpeedMul:1,    breathe:4.5, haloMul:1,    burst:false, duration:null, pulsePeriod:7,
                     eyes:{gazeX:0,gazeY:0,aperture:1.0,blink:4} },
    'bienvenida':  { color:'#4FD6E8', shape:'atom',     orbitSpeedMul:1,    breathe:4.5, haloMul:1.08, burst:false, duration:3000, transient:'approach',
                     eyes:{gazeX:0,gazeY:-1.5,aperture:1.12,blink:3.2} },
    'motivacion':  { color:'#5CF2A8', shape:'heart',    orbitSpeedMul:1.1,  breathe:3.2, haloMul:1.05, burst:false, duration:3000, transient:'vibrate', yOffset:75,
                     eyes:{gazeX:0,gazeY:0,aperture:1.08,blink:2.6} },
    'desafio':     { color:'#FFA94D', shape:'atom',     orbitSpeedMul:1.9, breathe:3.4, haloMul:1.1,  burst:false, duration:null,
                     eyes:{gazeX:0,gazeY:0,aperture:0.82,blink:5.5} },
    'celebracion': { color:'#B98CF2', shape:'atom',     orbitSpeedMul:1.3,  breathe:3.6, haloMul:1.2,  burst:true,  duration:3000, transient:'expand',
                     eyes:{gazeX:0,gazeY:-0.5,aperture:1.18,blink:1.8} },
    'nivel':       { color:'#FFE066', shape:'atom',     orbitSpeedMul:1.6,  breathe:5,   haloMul:1.5,  burst:true,  duration:3000, transient:'centerStage',
                     eyes:{gazeX:0,gazeY:0,aperture:1.15,blink:4.2} },
    'ayuda':       { color:'#4DD9C0', shape:'atom',     orbitSpeedMul:0.5,  breathe:5.5, haloMul:0.8,  burst:false, duration:null,
                     eyes:{gazeX:0,gazeY:1,aperture:0.78,blink:4} },
    'pensando':    { color:'#8CA8F2', shape:'question', orbitSpeedMul:0.75, breathe:3.8, haloMul:0.9,  burst:false, duration:null, transient:'stutter',
                     eyes:{gazeX:2.2,gazeY:-0.8,aperture:0.95,blink:3.4} },
    'esperando':   { color:'#4FD6E8', shape:'atom',     orbitSpeedMul:0.6,  breathe:8,   haloMul:0.95, burst:false, duration:null,
                     eyes:{gazeX:0,gazeY:0.4,aperture:0.55,blink:7} },
    'despedida':   { color:'#B98CF2', shape:'atom',     orbitSpeedMul:0.4,  breathe:6,   haloMul:0.7,  burst:false, duration:3000, transient:'retreat',
                     eyes:{gazeX:0,gazeY:1.5,aperture:0.15,blink:99} }
  };
  var STATE_NAMES = Object.keys(STATE_PARAMS);

  /* EOP-038 — CORRECCIÓN DE BUG REAL (reportado en pruebas con
     navegador real): dos sistemas independientes podían llamar a
     Photon.setState()/react() para el mismo evento del estudiante
     (ej. Gamification.addXP dispara 'nivel' internamente, y la misma
     función awardXP() de la unidad dispara 'motivacion'/'celebracion'
     inmediatamente después, por su cuenta). Quien llamaba último
     ganaba siempre, sin importar cuál era más importante — dejando
     al Fotón con animaciones a medio terminar (ej. atascado en el
     centro de la pantalla tras la reacción de Nivel).

     Corrección: jerarquía de prioridad real, ya documentada en
     LA_CURIOSIDAD_Reglas_de_Interaccion.md §6
     (Despedida > Nivel > Celebración > Desafío > Ayuda > Bienvenida >
     Motivación > Pensando > Esperando > Reposo). Mientras un estado de
     mayor prioridad esté dentro de su propia duración, un estado de
     MENOR prioridad no puede interrumpirlo. Uno de igual o mayor
     prioridad sí puede (permite, por ejemplo, que dos subidas de
     nivel seguidas reinicien la animación correctamente). */
  var STATE_PRIORITY = {
    'despedida':11, 'nivel':10, 'celebracion':9, 'desafio':8, 'ayuda':7,
    'bienvenida':6, 'motivacion':5, 'pensando':4, 'esperando':3, 'reposo':1
  };

  /* ── Mapa de eventos semánticos del estudiante → estado ────────
     Sin cambios respecto a versiones anteriores — el resto de la
     plataforma sigue llamando Photon.react('nombre-evento'). */
  var EVENT_MAP = {
    'welcome':          'bienvenida',
    'topic-read':       'motivacion',
    'simulator-commit':'motivacion',
    'challenge-start':  'desafio',
    'exam-start':       'desafio',
    'exam-passed':      'celebracion',
    'game-won':         'celebracion',
    'badge-unlocked':   'celebracion',
    'exam-failed':      'ayuda',
    'answer-wrong':     'ayuda',
    'level-up':         'nivel',
    'course-complete':  'nivel',
    'loading':          'pensando',
    'idle':             'esperando',
    'session-end':      'despedida'
  };

  var HEART_PATH = 'M 0.0,-28.0 L 0.1,-29.3 L 0.4,-30.8 L 0.8,-32.9 L 1.6,-35.5 L 2.7,-38.4 L 4.2,-41.7 L 6.2,-45.1 L 8.6,-48.6 L 11.5,-52.1 L 14.8,-55.5 L 18.6,-58.5 L 22.8,-61.2 L 27.4,-63.5 L 32.3,-65.2 L 37.5,-66.3 L 42.8,-66.8 L 48.3,-66.6 L 53.7,-65.7 L 59.1,-64.1 L 64.3,-61.9 L 69.2,-59.0 L 73.7,-55.6 L 77.9,-51.7 L 81.5,-47.3 L 84.5,-42.5 L 86.8,-37.4 L 88.5,-32.1 L 89.4,-26.6 L 89.6,-21.0 L 89.0,-15.3 L 87.7,-9.7 L 85.7,-4.1 L 83.0,1.4 L 79.7,6.9 L 75.9,12.2 L 71.5,17.4 L 66.8,22.5 L 61.7,27.5 L 56.4,32.4 L 51.0,37.2 L 45.5,41.9 L 40.1,46.5 L 34.9,51.0 L 29.8,55.4 L 25.1,59.8 L 20.7,64.0 L 16.6,68.1 L 13.1,72.0 L 10.0,75.8 L 7.3,79.3 L 5.1,82.6 L 3.4,85.5 L 2.1,88.2 L 1.2,90.4 L 0.6,92.3 L 0.2,93.7 L 0.0,94.7 L -0.2,93.7 L -0.6,92.3 L -1.2,90.4 L -2.1,88.2 L -3.4,85.5 L -5.1,82.6 L -7.3,79.3 L -10.0,75.8 L -13.1,72.0 L -16.6,68.1 L -20.7,64.0 L -25.1,59.8 L -29.8,55.4 L -34.9,51.0 L -40.1,46.5 L -45.5,41.9 L -51.0,37.2 L -56.4,32.4 L -61.7,27.5 L -66.8,22.5 L -71.5,17.4 L -75.9,12.2 L -79.7,6.9 L -83.0,1.4 L -85.7,-4.1 L -87.7,-9.7 L -89.0,-15.3 L -89.6,-21.0 L -89.4,-26.6 L -88.5,-32.1 L -86.8,-37.4 L -84.5,-42.5 L -81.5,-47.3 L -77.9,-51.7 L -73.7,-55.6 L -69.2,-59.0 L -64.3,-61.9 L -59.1,-64.1 L -53.7,-65.7 L -48.3,-66.6 L -42.8,-66.8 L -37.5,-66.3 L -32.3,-65.2 L -27.4,-63.5 L -22.8,-61.2 L -18.6,-58.5 L -14.8,-55.5 L -11.5,-52.1 L -8.6,-48.6 L -6.2,-45.1 L -4.2,-41.7 L -2.7,-38.4 L -1.6,-35.5 L -0.8,-32.9 L -0.4,-30.8 L -0.1,-29.3 Z';

  var inst = null; /* instancia única — la plataforma tiene un solo Fotón activo a la vez */
  var uidCounter = 0;

  function nowSupported() { return typeof document !== 'undefined'; }
  function darkenColor(hex, pct) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    function f(v){ return Math.max(0, Math.round(v*(1-pct))); }
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }

  /* ---------------- Construcción del SVG (una sola vez, por instancia) ---------------- */
  function buildSVG(uid) {
    return '' +
    '<svg viewBox="0 0 220 220" width="100%" height="100%" style="overflow:visible">' +
      '<defs>' +
        '<radialGradient id="pcoreGrad' + uid + '" cx="38%" cy="32%" r="70%">' +
          '<stop offset="0%" stop-color="#ffffff"/><stop offset="16%" stop-color="#ffffff"/><stop offset="100%" stop-color="var(--pc)"/>' +
        '</radialGradient>' +
        '<filter id="pblurSoft' + uid + '" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>' +
        '<filter id="pblurWide' + uid + '" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="16"/></filter>' +
        '<filter id="pblurEye' + uid + '" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.4"/></filter>' +
        '<clipPath id="pcoreClip' + uid + '"><circle cx="110" cy="110" r="29"/></clipPath>' +
      '</defs>' +
      '<g class="p-haloWide"><circle cx="110" cy="110" r="70" fill="var(--pc)" opacity="0.16" filter="url(#pblurWide' + uid + ')"/></g>' +
      '<g class="p-haloSoft"><circle cx="110" cy="110" r="46" fill="var(--pc)" opacity="0.30" filter="url(#pblurSoft' + uid + ')"/></g>' +
      '<g class="p-shapeAtom p-shapeGroup">' +
        '<g class="p-ring0"><ellipse cx="110" cy="110" rx="88" ry="30" fill="none" stroke="var(--pc)" stroke-width="1.4" opacity="0.55" transform="rotate(-20 110 110)"/><circle cx="198" cy="110" r="4" fill="var(--pc)"/></g>' +
        '<g class="p-ring1"><ellipse cx="110" cy="110" rx="72" ry="26" fill="none" stroke="var(--pc)" stroke-width="1.2" opacity="0.5" transform="rotate(18 110 110)"/><circle cx="182" cy="110" r="3.4" fill="var(--pc)"/></g>' +
        '<g class="p-ring2"><ellipse cx="110" cy="110" rx="96" ry="34" fill="none" stroke="var(--pc)" stroke-width="1" opacity="0.4" transform="rotate(4 110 110)"/><circle cx="206" cy="110" r="3" fill="var(--pc)"/></g>' +
      '</g>' +
      '<g class="p-shapeHeart p-shapeGroup" opacity="0" transform="translate(110,102)">' +
        '<path class="p-heartPath" d="' + HEART_PATH + '" fill="none" stroke="var(--pc)" stroke-width="1.6" opacity="0.55" transform="scale(0.62)"/>' +
        '<ellipse cx="0" cy="0" rx="80" ry="24" fill="none" stroke="var(--pc)" stroke-width="0.7" opacity="0.15"/>' +
        '<circle cx="0" cy="58.7" r="3.6" fill="var(--pc)"/>' +
      '</g>' +
      '<g class="p-shapeQuestion p-shapeGroup" opacity="0">' +
        '<g class="p-qring0"><ellipse cx="110" cy="110" rx="88" ry="30" fill="none" stroke="var(--pc)" stroke-width="1" opacity="0.3" transform="rotate(-20 110 110)"/></g>' +
        '<g class="p-qring1"><ellipse cx="110" cy="110" rx="72" ry="26" fill="none" stroke="var(--pc)" stroke-width="0.9" opacity="0.28" transform="rotate(18 110 110)"/></g>' +
        '<g class="p-qring2"><ellipse cx="110" cy="110" rx="96" ry="34" fill="none" stroke="var(--pc)" stroke-width="0.8" opacity="0.22" transform="rotate(4 110 110)"/>' +
          '<text x="182" y="86" text-anchor="middle" font-size="15" font-weight="600" fill="var(--pc)" opacity="0.8" font-family="Space Grotesk, sans-serif">?</text>' +
        '</g>' +
      '</g>' +
      '<circle class="p-core" cx="110" cy="110" r="30" fill="url(#pcoreGrad' + uid + ')"/>' +
      '<ellipse cx="93" cy="93" rx="8" ry="5" fill="#ffffff" opacity="0.4" filter="url(#pblurSoft' + uid + ')"/>' +
      '<g class="p-eyesLayer" clip-path="url(#pcoreClip' + uid + ')">' +
        '<g class="p-eyeGaze">' +
          '<ellipse class="p-eyeL" cx="101" cy="114" rx="4.6" ry="7.6" fill="#ffffff" stroke="var(--pc)" stroke-width="1.5" opacity="0.95" filter="url(#pblurEye' + uid + ')"/>' +
          '<ellipse class="p-eyeR" cx="119" cy="114" rx="4.6" ry="7.6" fill="#ffffff" stroke="var(--pc)" stroke-width="1.5" opacity="0.95" filter="url(#pblurEye' + uid + ')"/>' +
        '</g>' +
      '</g>' +
    '</svg>';
  }

  /* ---------------- Construcción del contenedor ---------------- */
  function buildDom(opts) {
    var uid = 'p' + (++uidCounter);
    var root = document.createElement('div');
    root.className = 'mqc-photon';
    root.setAttribute('aria-hidden', 'true');
    root.style.setProperty('--photon-scale', '1');
    root.innerHTML = buildSVG(uid);
    return { root: root, uid: uid };
  }

  /* ---------------- Ciclo de parpadeo ---------------- */
  function scheduleBlink() {
    if (!inst) return;
    clearTimeout(inst.blinkTimer);
    var eyes = inst.currentEyes;
    if (!eyes || eyes.blink > 90) return; /* Despedida: no parpadea, se cierra en cambio */
    inst.blinkTimer = setTimeout(function () {
      if (!inst) return;
      var eyeL = inst.root.querySelector('.p-eyeL'), eyeR = inst.root.querySelector('.p-eyeR');
      eyeL.style.transition = 'ry .08s ease-in'; eyeR.style.transition = 'ry .08s ease-in';
      eyeL.setAttribute('ry', 0.4); eyeR.setAttribute('ry', 0.4);
      inst.miscTimers.push(setTimeout(function () {
        if (!inst) return;
        var l = inst.root.querySelector('.p-eyeL'), r = inst.root.querySelector('.p-eyeR');
        l.style.transition = 'ry .12s ease-out'; r.style.transition = 'ry .12s ease-out';
        l.setAttribute('ry', 7.6 * inst.currentEyes.aperture);
        r.setAttribute('ry', 7.6 * inst.currentEyes.aperture);
      }, 100));
      scheduleBlink();
    }, eyes.blink * 1000);
  }

  function applyEyes(eyes) {
    inst.currentEyes = eyes;
    var gazeG = inst.root.querySelector('.p-eyeGaze');
    gazeG.style.transition = 'transform .7s ease';
    gazeG.setAttribute('transform', 'translate(' + (eyes.gazeX + inst.mouseOffset.x) + ',' + (eyes.gazeY + inst.mouseOffset.y) + ')');
    var eyeL = inst.root.querySelector('.p-eyeL'), eyeR = inst.root.querySelector('.p-eyeR');
    eyeL.style.transition = 'ry .5s ease'; eyeR.style.transition = 'ry .5s ease';
    eyeL.setAttribute('ry', 7.6 * eyes.aperture);
    eyeR.setAttribute('ry', 7.6 * eyes.aperture);
    scheduleBlink();
  }

  function setOrbitSpeed(mult) {
    var root = inst.root;
    ['p-ring0','p-ring1','p-ring2'].forEach(function (cls, i) {
      var el = root.querySelector('.' + cls);
      el.style.animation = mult < 0.02 ? 'none' : ('mqcPSpin' + i + ' ' + ((9 + i * 4) / mult) + 's linear infinite');
    });
    ['p-qring0','p-qring1','p-qring2'].forEach(function (cls, i) {
      var el = root.querySelector('.' + cls);
      if (el) el.style.animation = mult < 0.02 ? 'none' : ('mqcPSpin' + i + ' ' + ((16 + i * 5) / mult) + 's linear infinite');
    });
    var heartGroup = root.querySelector('.p-shapeHeart');
    heartGroup.style.animation = 'mqcPSpin0 ' + (20 / Math.max(mult, 0.3)) + 's linear infinite';
  }

  function runTransient(type, params) {
    if (!type || !inst) return;
    var root = inst.root;
    if (type === 'centerStage') {
      /* EOP-036: exclusivo de Nivel. Se calcula cuánto hay que
         desplazarse desde el punto de anclaje real hasta el centro de
         la ventana, se viaja hasta ahí agrandado, se reacciona
         (expansión de halo), y se regresa antes de que termine la
         duración del estado (para no cortar en seco el regreso). */
      var rect = root.getBoundingClientRect();
      var curCx = rect.left + rect.width / 2;
      var curCy = rect.top + rect.height / 2;
      var targetCx = window.innerWidth / 2;
      var targetCy = window.innerHeight / 2;
      var dx = targetCx - curCx;
      var dy = targetCy - curCy;

      root.style.transition = 'transform .9s cubic-bezier(.2,.8,.2,1)';
      root.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.9)';

      var wWide = root.querySelector('.p-haloWide circle');
      inst.miscTimers.push(setTimeout(function () {
        wWide.style.transition = 'r 1.4s cubic-bezier(.22,.9,.3,1)';
        wWide.setAttribute('r', 70 * params.haloMul * 1.4);
      }, 500));

      /* Regresa a su lugar real antes de que setState('reposo') se
         dispare automáticamente (duration del estado, ver setState) */
      inst.miscTimers.push(setTimeout(function () {
        root.style.transition = 'transform .8s cubic-bezier(.4,0,.2,1)';
        root.style.transform = '';
        wWide.style.transition = 'r 1s ease';
        wWide.setAttribute('r', 70 * params.haloMul);
      }, 2150));
    }
    if (type === 'approach') {
      root.style.transition = 'transform 1.1s cubic-bezier(.16,.8,.3,1)';
      var prevTransform = root.style.transform || '';
      root.style.transform = prevTransform + ' scale(1.06)';
      inst.miscTimers.push(setTimeout(function () { root.style.transform = prevTransform; }, 1100));
      var r0 = root.querySelector('.p-ring0');
      r0.style.animation = 'mqcPSpin0 1.4s linear 2';
      inst.miscTimers.push(setTimeout(function () { setOrbitSpeed(params.orbitSpeedMul); }, 2800));
    }
    if (type === 'vibrate') {
      var hp = root.querySelector('.p-heartPath');
      hp.style.animation = 'mqcPVibrateHeart .18s ease-in-out 10';
      inst.miscTimers.push(setTimeout(function () { hp.style.animation = 'mqcPVibrateHeart 2.4s ease-in-out infinite'; }, 1900));
    }
    if (type === 'expand') {
      var w = root.querySelector('.p-haloWide circle');
      w.style.transition = 'r 1s cubic-bezier(.16,.8,.3,1), opacity 1s ease';
      var originalR = 70 * params.haloMul;
      w.setAttribute('r', originalR * 1.35); w.setAttribute('opacity', 0.22);
      inst.miscTimers.push(setTimeout(function () { w.setAttribute('r', originalR); w.setAttribute('opacity', 0.16 * params.haloMul); }, 1000));
    }
    if (type === 'expandSlow') {
      var w2 = root.querySelector('.p-haloWide circle');
      w2.style.transition = 'r 2.6s cubic-bezier(.22,.9,.3,1)';
      w2.setAttribute('r', 0);
      inst.miscTimers.push(setTimeout(function () { w2.setAttribute('r', 70 * params.haloMul); }, 60));
    }
    if (type === 'stutter') {
      var pauseOnce = function () {
        if (!inst) return;
        ['p-qring0','p-qring1','p-qring2'].forEach(function (cls) { var el = root.querySelector('.' + cls); if (el) el.style.animationPlayState = 'paused'; });
        inst.miscTimers.push(setTimeout(function () {
          if (!inst) return;
          ['p-qring0','p-qring1','p-qring2'].forEach(function (cls) { var el = root.querySelector('.' + cls); if (el) el.style.animationPlayState = 'running'; });
          inst.miscTimers.push(setTimeout(pauseOnce, 3400));
        }, 900));
      };
      inst.miscTimers.push(setTimeout(pauseOnce, 2200));
    }
    if (type === 'retreat') {
      ['p-ring0','p-ring1','p-ring2'].forEach(function (cls) {
        var g = root.querySelector('.' + cls);
        g.style.transition = 'transform 3s cubic-bezier(.3,.7,.4,1)';
        g.style.transform = 'scale(0.72)';
      });
      var wWide = root.querySelector('.p-haloWide circle');
      wWide.style.transition = 'r 3s ease';
      inst.miscTimers.push(setTimeout(function () { wWide.setAttribute('r', 70 * params.haloMul * 0.5); }, 50));
    }
  }

  function clearMiscTimers() {
    if (!inst) return;
    inst.miscTimers.forEach(function (t) { clearTimeout(t); });
    inst.miscTimers = [];
  }

  /* ---------------- API: mount ---------------- */
  function mount(containerEl, opts) {
    if (!nowSupported() || !containerEl) return null;
    opts = opts || {};
    if (inst) destroy(); /* una sola instancia activa a la vez, por diseño de arquitectura */

    var dom = buildDom(opts);
    containerEl.appendChild(dom.root);

    var mouseHandler = function (e) {
      if (!inst) return;
      var rect = dom.root.getBoundingClientRect();
      var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var clamp = Math.min(3.2, dist / 40);
      inst.mouseOffset.x = (dx / dist) * clamp;
      inst.mouseOffset.y = (dy / dist) * clamp;
      var gazeG = inst.root.querySelector('.p-eyeGaze');
      if (gazeG && inst.currentEyes) {
        gazeG.style.transition = 'transform .35s ease-out';
        gazeG.setAttribute('transform', 'translate(' + (inst.currentEyes.gazeX + inst.mouseOffset.x) + ',' + (inst.currentEyes.gazeY + inst.mouseOffset.y) + ')');
      }
    };
    document.addEventListener('mousemove', mouseHandler);

    inst = {
      container: containerEl,
      root: dom.root,
      state: 'reposo',
      stateStartTime: 0,
      stateTimer: null,
      blinkTimer: null,
      miscTimers: [],
      currentEyes: null,
      mouseOffset: { x: 0, y: 0 },
      floating: opts.float !== false,
      orbitRAF: null,
      orbitTarget: null,
      visible: true,
      mouseHandler: mouseHandler
    };

    dom.root.classList.add('mqc-photon--visible');
    if (inst.floating) dom.root.classList.add('mqc-photon--floating');
    return publicHandle();
  }

  function ensure() {
    if (!inst) console.warn('[Photon] No hay una instancia montada. Llamá Photon.mount(contenedor) primero.');
    return !!inst;
  }

  /* ---------------- API: setAsset — OBSOLETA desde EOP-034 ---------------- */
  function setAsset(url) {
    console.warn('[Photon] setAsset() ya no tiene efecto: desde EOP-034 el Fotón se dibuja como SVG en código, no carga un archivo externo. Se mantiene esta función solo para no romper llamadas existentes.');
  }

  /* ---------------- API: setState ---------------- */
  function setState(name, opts) {
    if (!ensure()) return;
    opts = opts || {};
    var params = STATE_PARAMS[name];
    if (!params) {
      console.warn('[Photon] Estado desconocido: "' + name + '". Estados válidos: ' + STATE_NAMES.join(', '));
      return;
    }

    /* EOP-038 — Guardián de prioridad (ver STATE_PRIORITY arriba).
       Si el estado ACTIVO tiene mayor prioridad que el ENTRANTE, y
       todavía está dentro de su propia duración protegida, el
       entrante se ignora — nunca interrumpe una animación de mayor
       jerarquía a medio terminar. Uno de igual o mayor prioridad sí
       puede reemplazarlo (permite reiniciar la misma reacción). */
    if (inst.state && inst.state !== name) {
      var activePriority = STATE_PRIORITY[inst.state] || 0;
      var incomingPriority = STATE_PRIORITY[name] || 0;
      var activeParams = STATE_PARAMS[inst.state];
      var protectionWindow = (activeParams && activeParams.duration) || 0;
      var elapsed = Date.now() - (inst.stateStartTime || 0);
      if (activePriority > incomingPriority && elapsed < protectionWindow) {
        console.log('[Photon] Reacción "' + name + '" ignorada — "' + inst.state + '" tiene mayor prioridad y sigue activa (' + (protectionWindow - elapsed) + 'ms restantes).');
        return;
      }
    }

    /* HOTFIX-04: sonido — solo se llama acá, después del guardián de
       prioridad, así que nunca suena para una reacción que en
       realidad fue ignorada. Independiente y opcional (silencioso
       si photon-sound.js no está cargado o el usuario lo desactivó). */
    if (typeof PhotonSound !== 'undefined' && PhotonSound.play) { try { PhotonSound.play(name); } catch (e) {} }
    inst.stateStartTime = Date.now();

    inst.state = name;
    clearTimeout(inst.stateTimer);
    clearMiscTimers();

    /* Desplazamiento vertical propio del estado (ej. Motivación: el
       corazón necesita más espacio hacia abajo del punto de anclaje
       para no esconderse contra el margen superior de la pantalla).
       Se aplica como transform inline; se limpia al salir del estado
       para que el resto de las transiciones (visibilidad, moveTo,
       orbit) vuelvan a controlar el transform normalmente. */
    if (params.yOffset) {
      inst.root.style.transition = 'transform .6s cubic-bezier(.34,1.2,.64,1)';
      inst.root.style.transform = 'translateY(' + params.yOffset + 'px)';
    } else if (inst.root.style.transform && inst.root.style.transform.indexOf('translateY') !== -1) {
      inst.root.style.transition = 'transform .6s ease';
      inst.root.style.transform = '';
    }

    var svgEl = inst.root.querySelector('svg');
    svgEl.style.setProperty('--pc', params.color);
    inst.root.setAttribute('data-photon-state', name);

    /* silueta (vocabulario cerrado: atom / heart / question) */
    inst.root.querySelectorAll('.p-shapeGroup').forEach(function (g) { g.style.opacity = 0; });
    var shapeCls = 'p-shape' + params.shape.charAt(0).toUpperCase() + params.shape.slice(1);
    var shapeEl = inst.root.querySelector('.' + shapeCls);
    shapeEl.style.transition = 'opacity .6s ease';
    requestAnimationFrame(function () { shapeEl.style.opacity = 1; });

    setOrbitSpeed(params.orbitSpeedMul);

    var core = inst.root.querySelector('.p-core');
    core.style.animation = 'mqcPBreathe ' + params.breathe + 's ease-in-out infinite';

    var haloSoft = inst.root.querySelector('.p-haloSoft circle');
    var haloWide = inst.root.querySelector('.p-haloWide circle');
    [[haloSoft, 46], [haloWide, 70]].forEach(function (pair) {
      var c = pair[0], base = pair[1];
      c.style.transition = 'r 1.2s ease, opacity 1.2s ease';
      c.setAttribute('r', base * params.haloMul);
    });

    if (params.pulsePeriod) {
      var pulse = function () {
        core.style.transition = 'filter .5s ease';
        core.style.filter = 'brightness(1.35)';
        var t1 = setTimeout(function () { core.style.filter = 'brightness(1)'; }, 550);
        var t2 = setTimeout(pulse, params.pulsePeriod * 1000);
        inst.miscTimers.push(t1, t2);
      };
      inst.miscTimers.push(setTimeout(pulse, params.pulsePeriod * 1000));
    } else {
      core.style.filter = 'brightness(1)';
    }

    var darkStroke = darkenColor(params.color, 0.55);
    inst.root.querySelector('.p-eyeL').setAttribute('stroke', darkStroke);
    inst.root.querySelector('.p-eyeR').setAttribute('stroke', darkStroke);
    applyEyes(params.eyes);

    if (params.burst) {
      inst.root.dispatchEvent(new CustomEvent('photon:burst', { detail: { state: name } }));
    }
    runTransient(params.transient, params);

    var dur = (opts.duration !== undefined) ? opts.duration : params.duration;
    if (dur) {
      inst.stateTimer = setTimeout(function () { setState('reposo'); }, dur);
    }
  }

  /* ---------------- API: react (puente semántico) ---------------- */
  function react(eventName) {
    var mapped = EVENT_MAP[eventName];
    if (!mapped) {
      console.warn('[Photon] Evento sin mapear: "' + eventName + '". Agregalo a EVENT_MAP en photon.js si es un evento nuevo.');
      return;
    }
    setState(mapped);
  }

  /* ---------------- API: movimiento ---------------- */
  function moveTo(x, y, opts) {
    if (!ensure()) return;
    opts = opts || {};
    var duration = opts.duration || 900;
    var easing = opts.easing || 'cubic-bezier(.4,0,.2,1)';
    inst.root.style.transition = 'transform ' + duration + 'ms ' + easing + ', opacity .4s ease';
    inst.root.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  }

  /* ---------------- API: órbita alrededor de un elemento de referencia ---------------- */
  function orbit(targetEl, opts) {
    if (!ensure() || !targetEl) return;
    opts = opts || {};
    var radius = opts.radius || 60;
    var baseSpeed = opts.speed || 0.0006;
    var clockwise = opts.clockwise !== false ? 1 : -1;
    stopOrbit();
    inst.orbitTarget = targetEl;
    var start = performance.now();

    function frame(t) {
      if (!inst || inst.orbitTarget !== targetEl) return;
      var speedMul = STATE_PARAMS[inst.state] ? STATE_PARAMS[inst.state].orbitSpeedMul : 1;
      var angle = (t - start) * baseSpeed * speedMul * clockwise;
      var rect = targetEl.getBoundingClientRect();
      var containerRect = inst.container.getBoundingClientRect();
      var cx = rect.left + rect.width / 2 - containerRect.left;
      var cy = rect.top + rect.height / 2 - containerRect.top;
      var x = cx + Math.cos(angle) * radius;
      var y = cy + Math.sin(angle) * radius * 0.55;
      inst.root.style.transition = 'none';
      inst.root.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      inst.orbitRAF = requestAnimationFrame(frame);
    }
    inst.orbitRAF = requestAnimationFrame(frame);
  }
  function stopOrbit() {
    if (!inst) return;
    if (inst.orbitRAF) cancelAnimationFrame(inst.orbitRAF);
    inst.orbitRAF = null;
    inst.orbitTarget = null;
  }

  /* ---------------- API: flotado idle ---------------- */
  function float(enabled) {
    if (!ensure()) return;
    inst.floating = !!enabled;
    inst.root.classList.toggle('mqc-photon--floating', inst.floating);
  }

  /* ---------------- API: visibilidad ---------------- */
  function show() { if (ensure()) { inst.visible = true; inst.root.classList.add('mqc-photon--visible'); } }
  function hide() { if (ensure()) { inst.visible = false; inst.root.classList.remove('mqc-photon--visible'); } }

  /* ---------------- API: destroy ---------------- */
  function destroy() {
    if (!inst) return;
    stopOrbit();
    clearTimeout(inst.stateTimer);
    clearTimeout(inst.blinkTimer);
    clearMiscTimers();
    document.removeEventListener('mousemove', inst.mouseHandler);
    if (inst.root && inst.root.parentNode) inst.root.parentNode.removeChild(inst.root);
    inst = null;
  }

  function publicHandle() {
    return {
      setAsset: setAsset,
      setState: setState,
      react: react,
      moveTo: moveTo,
      orbit: orbit,
      stopOrbit: stopOrbit,
      float: float,
      show: show,
      hide: hide,
      destroy: destroy,
      getState: function () { return inst ? inst.state : null; }
    };
  }

  window.Photon = {
    mount: mount,
    setAsset: setAsset,
    setState: setState,
    react: react,
    moveTo: moveTo,
    orbit: orbit,
    stopOrbit: stopOrbit,
    float: float,
    show: show,
    hide: hide,
    destroy: destroy,
    STATES: STATE_NAMES,
    EVENT_MAP: EVENT_MAP
  };
})();
