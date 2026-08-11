/* ================================================================
   MÁSQUECIENCIA — js/shared/intro.js
   INTRO CINEMATOGRÁFICA DE INGRESO (HOTFIX-11)
   ================================================================
   Integra la "Variante D" (consola de arranque → lluvia de elementos
   periódicos → escáner que congela a su paso → laboratorio + Photon
   provisional → identidad de marca) del prototipo aislado evaluado
   por el docente. Vive por completo en este archivo + css/intro.css:
   no toca el Router, el sistema de perfiles, el loading screen
   existente, ni el componente oficial de Photon.

   Nota de arquitectura importante: la aparición de "Photon" en esta
   intro usa una representación PROVISIONAL (núcleo + 3 órbitas),
   igual que en el prototipo aislado — nunca el componente oficial
   real (js/shared/photon.js). Se evaluó usar el componente real, pero
   Photon.mount() es una instancia única por diseño: si un estudiante
   con perfil ya activo ve esta intro, js/app.js puede montar el
   Photon real del sidebar en paralelo mientras la intro aún está en
   pantalla, y ambos montajes competirían por la misma instancia. La
   representación provisional no depende de esa instancia y por lo
   tanto no puede chocar con nada.

   Se muestra UNA SOLA VEZ por navegador (localStorage). Si el
   estudiante ya la vio, este script no hace nada: el overlay
   permanece oculto (display:none) y no se ejecuta ninguna animación
   ni se reserva ningún recurso.

   Si localStorage no está disponible (modo privado estricto, etc.)
   el intento de lectura/escritura falla en silencio y la intro
   simplemente se muestra cada vez — nunca bloquea el acceso a la
   plataforma real.
================================================================ */
(function () {
  'use strict';

  const SEEN_KEY = 'mqc_intro_seen_v1';
  const root = document.getElementById('mqc-intro');
  if (!root) return; /* si el overlay no está en el HTML, no hacemos nada */

  function hasSeenIntro() {
    try { return localStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
  }
  function markIntroSeen() {
    try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* silencioso */ }
  }
  /* HOTFIX-13 — reportado por el docente: si un estudiante ve la
     intro, llega al botón "Entrar al laboratorio" (que ya marcaba
     'visto'), pero NUNCA termina de crear su perfil (cierra la
     pestaña, recarga antes de terminar, etc.), antes volvía a caer
     directo en la pantalla de perfiles SIN la intro — porque el
     flag ya estaba puesto por el simple clic del botón. Ahora la
     intro se repite mientras el estudiante no tenga ningún perfil
     real creado en este navegador, sin importar si ya vio la intro
     antes — y deja de aparecer para siempre en el instante en que
     complete su primer perfil de verdad. */
  function hasRealProfile() {
    if (typeof MQCProfiles === 'undefined' || !MQCProfiles.count) return true; /* si el módulo no cargó, no forzar repetición */
    try { return MQCProfiles.count() > 0; } catch (e) { return true; }
  }

  if (hasSeenIntro() && hasRealProfile()) return; /* nada que hacer: overlay ya está oculto vía display:none en el HTML */

  root.style.display = ''; /* revela el overlay (estaba display:none en el HTML) */

  const $ = sel => root.querySelector(sel);
  const state = { sound: true, skip: false };

  /* ---------------- audio (sintetizado, sin archivos externos) ---------------- */
  let actx = null;
  function ensureAudio() {
    if (!state.sound) return null;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume().catch(() => {});
      return actx;
    } catch (e) { return null; }
  }
  function tone(freq, dur, opts) {
    opts = opts || {};
    const ctx = ensureAudio();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = opts.type || 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (opts.sweepTo) osc.frequency.linearRampToValueAtTime(opts.sweepTo, ctx.currentTime + dur);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(opts.vol || 0.06, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.05);
    } catch (e) { /* si el navegador bloquea audio, seguimos sin sonido */ }
  }
  function sfxBoot() { tone(880, .05, { type: 'square', vol: .04 }); }
  function sfxScan() { tone(220, .9, { type: 'sawtooth', sweepTo: 640, vol: .03 }); }
  function sfxFreeze() { tone(70, .28, { type: 'square', vol: .055 }); setTimeout(() => tone(1800, .12, { type: 'triangle', vol: .03 }), 20); }
  function sfxUnlock() { tone(392, .18, { type: 'triangle', vol: .06 }); setTimeout(() => tone(587, .28, { type: 'triangle', vol: .06 }), 90); }
  /* arpegio suave de 3 campanas — reemplaza el sweep agudo que no
     convenció en la primera prueba de la Variante A */
  function sfxPhotonSoft() {
    tone(523.25, .42, { type: 'sine', vol: .04 });
    setTimeout(() => tone(659.25, .42, { type: 'sine', vol: .035 }), 110);
    setTimeout(() => tone(783.99, .55, { type: 'sine', vol: .035 }), 230);
  }

  /* ---------------- utilidades ---------------- */
  function sleep(ms) {
    return new Promise(resolve => {
      const start = performance.now();
      (function tick() {
        if (state.skip) return resolve();
        if (performance.now() - start >= ms) return resolve();
        requestAnimationFrame(tick);
      })();
    });
  }
  function show(el) { el.classList.add('show'); }
  function hideAllLayers() { root.querySelectorAll('.mqc-intro-layer').forEach(l => l.classList.remove('show')); }

  /* ---------------- partículas ambientales del fondo cósmico ---------------- */
  function buildParticles() {
    const host = $('#mqc-intro-particles');
    host.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'mqc-intro-particle';
      p.style.left = (Math.random() * 100) + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (10 + Math.random() * 14) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      host.appendChild(p);
    }
  }

  /* ---------------- fase 1: consola de arranque ---------------- */
  async function phaseConsole() {
    hideAllLayers();
    const lines = [
      'INICIANDO SISTEMA MQC...',
      'CARGANDO ENTORNO CIENTÍFICO...',
      'SINCRONIZANDO LABORATORIO...',
      'VERIFICANDO MÓDULOS...',
      ['QUÍMICA 10.º', 'OK'],
      ['QUÍMICA 11.º', 'OK'],
      ['SIMULADORES', 'OK'],
      ['BANCO DE DATOS', 'OK'],
      ['PHOTON', 'ONLINE']
    ];
    const host = $('#mqc-intro-console-lines');
    host.innerHTML = '';
    show($('#mqc-intro-console'));
    for (let i = 0; i < lines.length; i++) {
      if (state.skip) break;
      const div = document.createElement('div');
      if (Array.isArray(lines[i])) {
        const dots = '.'.repeat(Math.max(3, 24 - lines[i][0].length));
        div.innerHTML = lines[i][0] + ' ' + dots + ' <span class="mqc-intro-ok">' + lines[i][1] + '</span>';
      } else {
        div.textContent = lines[i];
      }
      host.appendChild(div);
      sfxBoot();
      await sleep(220);
    }
    await sleep(350);
  }

  /* ---------------- fase 2: lluvia periódica + escáner que congela a su paso ---------------- */
  const MX_SYMBOLS = ['H','He','Li','C','N','O','F','Na','Mg','Al','Si','P','S','Cl','K','Ca','Fe','Cu','Zn','Ag','Sn','I','Au','Pb','U','Ne','Ar','Br'];
  const UNLOCK_PHRASE = 'CARGANDO EXPERIENCIA';
  /* No es azar: 3 columnas de la lluvia están "sembradas" con las
     letras M · Q · C. Mientras caen se ven como cualquier otro
     elemento químico — la palabra solo se revela letra por letra, en
     orden, exactamente cuando el escáner (que se mueve de izquierda
     a derecha) las congela a su paso. */
  const MSG_LETTERS = ['M', 'Q', 'C'];
  let mxTiles = [];
  let mxRunning = false, mxLastT = 0;
  let mxScanning = false, mxScanStart = 0, mxScanDur = 900, mxScanW = 0;

  function buildMatrixRain() {
    const host = $('#mqc-intro-rain');
    host.style.opacity = 1;
    host.innerHTML = '';
    mxTiles = [];
    const W = host.clientWidth || window.innerWidth;
    const H = host.clientHeight || window.innerHeight;
    const colW = 46;
    const cols = Math.max(6, Math.ceil(W / colW));
    /* columnas destino de cada letra, repartidas proporcionalmente
       (20% / 50% / 80% del ancho) para que se lean en orden sin
       importar cuántas columnas entren en la pantalla */
    const msgCols = MSG_LETTERS.map((_, i) => Math.round(cols * (0.2 + i * 0.3)));
    for (let c = 0; c < cols; c++) {
      const x = c * colW + (colW - 34) / 2 + (Math.random() * 6 - 3);
      const perCol = 1 + (Math.random() < 0.55 ? 1 : 0);
      const msgIdx = msgCols.indexOf(c);
      for (let k = 0; k < perCol; k++) {
        const el = document.createElement('div');
        el.className = 'mqc-intro-tile' + (Math.random() < 0.18 ? ' v' : '') + (Math.random() < 0.3 ? ' dim' : '');
        el.textContent = MX_SYMBOLS[Math.floor(Math.random() * MX_SYMBOLS.length)];
        el.style.left = x.toFixed(1) + 'px';
        host.appendChild(el);
        const y = (Math.random() * 1.5 - 0.4) * H;
        const tile = { el: el, x: x, y: y, speed: 300 + Math.random() * 260, H: H, frozen: false,
          msgLetter: (msgIdx !== -1 && k === 0) ? MSG_LETTERS[msgIdx] : null };
        el.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
        mxTiles.push(tile);
      }
    }
  }
  /* el escáner "lee y bloquea" cada columna a su paso, de izquierda a
     derecha — mientras no llega, esa columna sigue cayendo con normalidad */
  function mxLoop(t) {
    if (!mxRunning) return;
    if (!mxLastT) mxLastT = t;
    const dt = Math.min(0.05, (t - mxLastT) / 1000);
    mxLastT = t;
    let scanX = -999;
    if (mxScanning) scanX = Math.min(1, (t - mxScanStart) / mxScanDur) * mxScanW;
    for (let i = 0; i < mxTiles.length; i++) {
      const tile = mxTiles[i];
      if (tile.frozen) continue;
      if (mxScanning && tile.x <= scanX) {
        tile.frozen = true;
        if (tile.msgLetter) { tile.el.textContent = tile.msgLetter; tile.el.classList.add('msg'); }
        tile.el.classList.add('frozen');
        continue;
      }
      tile.y += tile.speed * dt;
      if (tile.y > tile.H + 40) {
        tile.y = -40 - Math.random() * 120;
        tile.el.textContent = MX_SYMBOLS[Math.floor(Math.random() * MX_SYMBOLS.length)];
      }
      tile.el.style.transform = 'translateY(' + tile.y.toFixed(1) + 'px)';
    }
    requestAnimationFrame(mxLoop);
  }
  function stopMatrixLoop() { mxRunning = false; mxLastT = 0; mxScanning = false; }

  async function phaseMatrixScan() {
    hideAllLayers();
    const layer = $('#mqc-intro-matrix');
    show(layer);
    $('#mqc-intro-matrix-label').classList.remove('show');
    $('#mqc-intro-freeze-flash').classList.remove('go');
    $('#mqc-intro-shock').classList.remove('go');
    $('#mqc-intro-rain').style.transition = '';
    $('#mqc-intro-rain').style.opacity = 1;
    const line = $('#mqc-intro-scanline');
    line.classList.remove('show');
    line.style.transition = 'none';
    line.style.left = '-8px';
    void line.offsetWidth;
    line.style.transition = '';
    buildMatrixRain();
    mxRunning = true; mxLastT = 0; mxScanning = false;
    requestAnimationFrame(mxLoop);

    await sleep(750);
    if (state.skip) { stopMatrixLoop(); return; }

    mxScanW = $('#mqc-intro-rain').clientWidth || window.innerWidth;
    mxScanDur = 900;
    mxScanStart = performance.now();
    mxScanning = true;
    line.style.setProperty('--mqc-scandur', mxScanDur.toFixed(0) + 'ms');
    line.classList.add('show');
    requestAnimationFrame(() => { line.style.left = '100%'; });
    sfxScan();
    await sleep(900);
    if (state.skip) { stopMatrixLoop(); return; }

    mxTiles.forEach(tl => { if (!tl.frozen) { tl.frozen = true; if (tl.msgLetter) { tl.el.textContent = tl.msgLetter; tl.el.classList.add('msg'); } tl.el.classList.add('frozen'); } });
    stopMatrixLoop();
    line.classList.remove('show');

    await sleep(160);
    $('#mqc-intro-freeze-flash').classList.add('go');
    $('#mqc-intro-shock').classList.add('go');
    sfxFreeze();
    await sleep(220);
    $('#mqc-intro-matrix-label').textContent = UNLOCK_PHRASE;
    $('#mqc-intro-matrix-label').classList.add('show');
    sfxUnlock();
    await sleep(900);
    $('#mqc-intro-rain').style.transition = 'opacity .5s ease';
    $('#mqc-intro-rain').style.opacity = 0;
    await sleep(400);
  }

  /* ---------------- fase 3: laboratorio + Photon (representación provisional) ---------------- */
  async function phaseLabAndPhoton() {
    hideAllLayers();
    $('#mqc-intro-cosmos').classList.add('on');
    show($('#mqc-intro-photon'));
    $('#mqc-intro-photon-wrap').classList.remove('in');
    $('#mqc-intro-msg').textContent = '';

    await sleep(150);
    $('#mqc-intro-photon-wrap').classList.add('in');
    sfxPhotonSoft();
    await sleep(500);
    $('#mqc-intro-msg').textContent = 'Todo listo.';
    await sleep(750);
    $('#mqc-intro-msg').textContent = 'Comencemos.';
    await sleep(700);
  }

  /* ---------------- fase 4: identidad de marca ---------------- */
  async function phaseIdentity() {
    hideAllLayers();
    show($('#mqc-intro-identity'));
  }

  /* ---------------- secuencia completa ---------------- */
  async function runIntro() {
    hideAllLayers();
    buildParticles();
    await sleep(150);
    await phaseConsole();
    if (!state.skip) await phaseMatrixScan();
    stopMatrixLoop();
    await phaseLabAndPhoton();
    await phaseIdentity();
  }

  /* ---------------- controles ---------------- */
  const soundBtn = $('#mqc-intro-sound');
  function updateSoundLabel() {
    soundBtn.textContent = state.sound ? '🔊 SONIDO' : '🔇 SONIDO';
    soundBtn.classList.toggle('active', state.sound);
  }
  soundBtn.addEventListener('click', () => {
    state.sound = !state.sound;
    if (state.sound) ensureAudio();
    updateSoundLabel();
  });

  $('#mqc-intro-skip').addEventListener('click', () => {
    state.skip = true;
    stopMatrixLoop();
    $('#mqc-intro-cosmos').classList.add('on');
    phaseIdentity();
  });

  $('#mqc-intro-enter').addEventListener('click', () => {
    markIntroSeen();
    root.classList.add('mqc-intro-hidden');
    setTimeout(() => { root.style.display = 'none'; }, 650);
  });

  /* HOTFIX-13: la secuencia completa (incluido su primer sonido) solo
     arranca DESPUÉS de este toque — es el gesto real que los
     navegadores exigen para permitir audio, así que en vez de pelear
     contra esa política, la usamos a favor: el mismo toque que cierra
     esta compuerta breve desbloquea el audio para toda la intro. */
  const startGate = $('#mqc-intro-startgate');
  function startWithSound() {
    ensureAudio();
    startGate.classList.add('hide');
    setTimeout(() => { startGate.style.display = 'none'; }, 400);
    runIntro();
  }
  startGate.addEventListener('click', startWithSound, { once: true });
})();
