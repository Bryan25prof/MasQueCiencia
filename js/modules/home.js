/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/modules/home.js  |  Módulo: Página de Inicio
   ================================================================
   CORRECCIONES FASE 0 APLICADAS:
   · BUG-02: Eliminado array UNITS duplicado → usa UNIDADES_DATA
   · WARN-01: Eliminada variable coursePercent (no utilizada)
   · BUG-03: Reemplazados onclick inline por data-nav (delegación global)

   Renderiza:
   1. Canvas de partículas moleculares (fondo animado)
   2. Hero con bienvenida personalizada y nivel actual
   3. Strip de estadísticas rápidas (XP, nivel, racha, progreso)
   4. Grid de las 9 tarjetas de unidades (datos desde UNIDADES_DATA)

   FUENTE DE DATOS: js/data/unidades.js → UNIDADES_DATA
================================================================ */

Router.register('home', (() => {
  'use strict';

  /*
    ╔══════════════════════════════════════════════════════════╗
    ║  DATOS DE UNIDADES                                       ║
    ║  BUG-02 CORREGIDO: ya no hay un array local.            ║
    ║  Los datos vienen de js/data/unidades.js (UNIDADES_DATA)║
    ║  unit.topics.length reemplaza el antiguo número topics  ║
    ╚══════════════════════════════════════════════════════════╝
  */

  /* ── Variables del canvas ───────────────────────────────── */
  let _canvas      = null;
  let _ctx         = null;
  let _particles   = [];
  let _animId      = null;
  let _resizeTimer = null;

  /* ── Canvas: Sistema de Partículas Moleculares ──────────── */

  class Particle {
    constructor(w, h) {
      this.reset(w, h);
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    }

    reset(w, h) {
      this.x     = Math.random() * w;
      this.y     = Math.random() * h;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = (Math.random() - 0.5) * 0.4;
      this.r     = Math.random() * 2.5 + 1;
      const cols = ['#1FDBFF', '#7B2FFF', '#00FF88', '#FFD700']; /* EOP-021: antes hex de la identidad v1.0 */
      this.color = cols[Math.floor(Math.random() * cols.length)];
    }

    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function _initCanvas() {
    _canvas = document.getElementById('particles-canvas');
    if (!_canvas) return;
    _ctx = _canvas.getContext('2d');
    _resizeCanvas();
    _createParticles();
    _animateCanvas();
  }

  function _resizeCanvas() {
    if (!_canvas) return;
    _canvas.width  = window.innerWidth;
    _canvas.height = window.innerHeight;
  }

  function _createParticles() {
    /* Reducir partículas en pantallas pequeñas (PERF-01 parcial) */
    const area  = window.innerWidth * window.innerHeight;
    const count = Math.min(window.innerWidth < 768 ? 30 : 60, Math.floor(area / 18000));
    _particles  = [];
    for (let i = 0; i < count; i++) {
      _particles.push(new Particle(_canvas.width, _canvas.height));
    }
  }

  function _animateCanvas() {
    if (!_canvas || !_ctx) return;
    const w = _canvas.width;
    const h = _canvas.height;

    _ctx.clearRect(0, 0, w, h);

    _particles.forEach(p => { p.update(w, h); p.draw(_ctx); });

    /* Conexiones entre partículas cercanas */
    const maxDist = 120;
    for (let i = 0; i < _particles.length; i++) {
      for (let j = i + 1; j < _particles.length; j++) {
        const dx   = _particles[i].x - _particles[j].x;
        const dy   = _particles[i].y - _particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          _ctx.beginPath();
          _ctx.moveTo(_particles[i].x, _particles[i].y);
          _ctx.lineTo(_particles[j].x, _particles[j].y);
          _ctx.strokeStyle = `rgba(31, 219, 255, ${alpha})`; /* EOP-021: cian actualizado */
          _ctx.lineWidth   = 0.8;
          _ctx.stroke();
        }
      }
    }

    _animId = requestAnimationFrame(_animateCanvas);
  }

  function _stopCanvas() {
    if (_animId) { cancelAnimationFrame(_animId); _animId = null; }
    if (_canvas) {
      const parent = _canvas.parentNode;
      if (parent) parent.removeChild(_canvas);
      _canvas = null;
      _ctx    = null;
    }
    _particles = [];
  }

  /* ── Renderizado del HTML ───────────────────────────────── */

  function _buildHTML() {
    const data      = Storage.load();
    const levelInfo = Gamification.getLevelInfo();
    const user      = data.user;
    const streak    = data.streak;

    /*
      WARN-01 CORREGIDO: eliminada variable coursePercent (no se usaba).
      startedUnits sí se usa en _buildTipsBanner().
    */
    const unitKeys       = Object.keys(data.units);
    const completedUnits = unitKeys.filter(k => data.units[k].completed).length;
    const startedUnits   = unitKeys.filter(k => data.units[k].started).length;

    /* Hero
       BUG-03 CORREGIDO: botones usan data-nav en lugar de onclick inline.
       El listener global en Router.init() los captura. */
    const heroHTML = `
      <section class="home-hero">
        <p class="hero-eyebrow">MEP Costa Rica · Química 10°</p>
        <h1 class="hero-title">
          La ciencia comienza cuando te haces una <span class="accent">buena pregunta.</span>
        </h1>
        <p class="hero-welcome">
          MásQueCiencia transforma cada unidad en una experiencia donde <strong>descubres, comprendes y aplicas</strong> la ciencia de una forma diferente.
        </p>
        <p class="hero-lema">Aprende ciencia. Piensa ciencia. Valora la ciencia.</p>
        <p class="hero-greeting">Hola de nuevo, <strong>${_escapeHTML(user.name)}</strong> 👋</p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-nav="units">
            📚 Ver Unidades
          </button>
          <button class="btn btn-ghost" data-nav="periodic-table">
            🔵 Tabla Periódica
          </button>
        </div>
      </section>
    `;

    /* Stats strip */
    const statsHTML = `
      <div class="stats-strip">
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <div>
            <div class="stat-label">XP Total</div>
            <div class="stat-value" style="color:var(--gold)">${levelInfo.xp.toLocaleString()}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${levelInfo.icon}</span>
          <div>
            <div class="stat-label">Nivel</div>
            <div class="stat-value">${levelInfo.level}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🔥</span>
          <div>
            <div class="stat-label">Racha</div>
            <div class="stat-value" style="color:var(--orange)">${streak.current} día${streak.current !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <div>
            <div class="stat-label">Progreso</div>
            <div class="stat-value" style="color:var(--green)">${completedUnits}/9</div>
          </div>
        </div>
      </div>
    `;

    /* Barra de nivel actual */
    const levelBarHTML = `
      <div class="card" style="margin-bottom:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
          <div>
            <div class="card-title">Nivel actual</div>
            <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--gold)">
              ${levelInfo.icon} ${levelInfo.name}
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-code);font-size:0.75rem;color:var(--text-muted)">
              Nv. ${levelInfo.level} ${levelInfo.maxed ? '(Máx.)' : `→ Nv. ${levelInfo.level + 1}`}
            </div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:.1rem">
              ${levelInfo.xp.toLocaleString()} ${levelInfo.maxed ? 'XP' : `/ ${levelInfo.xpNext.toLocaleString()} XP`}
            </div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill progress-fill-cyan" style="width:${levelInfo.percent}%"></div>
        </div>
      </div>
    `;

    /* Grid de unidades
       BUG-02 CORREGIDO: usa UNIDADES_DATA desde js/data/unidades.js
       unit.topics.length reemplaza el antiguo campo numérico */
    const unitsGridHTML = `
      <div class="section-header">
        <p class="section-title">Contenido del curso</p>
        <h2 class="section-heading">Unidades del Programa</h2>
      </div>
      <div class="units-grid">
        ${UNIDADES_DATA.map(unit => _buildUnitCard(unit, data)).join('')}
      </div>
    `;

    return `
      <div class="mqc-living-bg"></div>
      <canvas id="particles-canvas"></canvas>
      <div class="home-page">
        ${heroHTML}
        ${statsHTML}
        ${levelBarHTML}
        <div class="units-grid-home">
          ${unitsGridHTML}
        </div>
        ${_buildTipsBanner(completedUnits, startedUnits, levelInfo)}
        ${_buildApoyoDocenteBanner(completedUnits, startedUnits, streak)}
      </div>
    `;
  }

  /* Tarjeta de unidad (estilo elemento periódico)
     BUG-02: unit.topics.length (array) en lugar de unit.topics (número) */
  function _buildUnitCard(unit, data) {
    const pct      = Storage.getUnitProgress(unit.id);
    const unitData = data.units[unit.id] || {};
    const isNew    = !unitData.started;
    const isDone   = unitData.completed;

    return `
      <div class="unit-card"
           style="--unit-color:${unit.color}"
           data-unit="${unit.id}"
           title="${unit.name}">
        ${isDone ? '<div class="unit-badge" style="color:var(--green);border-color:rgba(0,255,136,.3)">✓ Completada</div>' : ''}
        ${isNew  ? '<div class="unit-badge">Nueva</div>' : ''}
        <div class="unit-number">U${unit.num}</div>
        <div class="unit-symbol">${unit.symbol}</div>
        <div class="unit-name">${unit.name}</div>
        <div class="unit-meta">
          <span class="unit-meta-item">${unit.icon} ${unit.topics.length} temas</span>
          <div class="unit-progress">
            <div class="unit-progress-bar">
              <div class="unit-progress-fill" style="width:${pct}%"></div>
            </div>
            <span>${pct}%</span>
          </div>
        </div>
      </div>
    `;
  }

  /* Banner de consejo contextual */
  function _buildTipsBanner(completed, started, levelInfo) {
    let tip;
    if (completed === 0 && started === 0) {
      tip = '💡 <strong>Consejo:</strong> Comienza por la Unidad 1 — Naturaleza de la Materia.';
    } else if (completed === 9) {
      tip = '🎓 <strong>¡Felicitaciones!</strong> Completaste todo el programa. Practica con el Examen General.';
    } else if (completed >= 1) {
      tip = `🚀 <strong>¡Vas excelente!</strong> Completaste ${completed} de 9 unidades. ¡Sigue así, ${levelInfo.name}!`;
    } else {
      tip = '📖 <strong>Sigue estudiando.</strong> Completa las unidades para ganar XP y desbloquear medallas.';
    }
    return `
      <div class="card" style="margin-top:2rem;border-color:rgba(0,212,255,.2)">
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0">${tip}</p>
      </div>
    `;
  }

  /* Escapa HTML para prevenir XSS */
  function _escapeHTML(str) {
    return (str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ================================================================
     Banner de apoyo/adopción docente (Auditoría Fase 2 — sección 13)
     ================================================================
     100% ADITIVO. Discreto, SOLO para perfiles con rol 'docente', y
     SOLO después de una señal de uso real de la plataforma (nunca en
     el primer ingreso):
       · al menos 1 unidad iniciada o completada, O
       · racha.best >= 2 (usó la app en al menos 2 días distintos —
         streak.best ya lo calcula Storage.registerSession() en cada
         carga, así que no hace falta tocar storage.js).

     Reutiliza MQCSupport.openModal() (js/shared/support.js) — el
     MISMO modal de PayPal/SINPE que ya usan las tarjetas de "Acerca
     de" y del resultado del Simulacro PNE 11.º — sin reimplementar
     ninguna lógica de pago aquí.

     Nunca se registra en Router ni se muestra fuera de home.js (no
     hay ninguna llamada a esto desde exámenes, simuladores ni
     misiones). Dismissible: "✕" oculta solo por esta sesión de
     navegador (sessionStorage); "No volver a mostrar" oculta para
     siempre en este dispositivo (localStorage). Ambas claves están
     namespaced por perfil (MQCProfiles.activeId()) para no mezclar
     preferencias entre perfiles distintos del mismo dispositivo.
  ================================================================ */
  const APOYO_DOCENTE_PREFIJO = 'mqc_apoyo_docente_';

  function _apoyoDocentePerfilId() {
    try {
      if (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId) {
        return MQCProfiles.activeId() || 'sinperfil';
      }
    } catch (e) { /* ignorar */ }
    return 'sinperfil';
  }

  function _apoyoDocenteOcultoSesion(pid) {
    try { return sessionStorage.getItem(APOYO_DOCENTE_PREFIJO + 'sesion_' + pid) === '1'; }
    catch (e) { return false; }
  }

  function _apoyoDocenteOcultoPermanente(pid) {
    try { return localStorage.getItem(APOYO_DOCENTE_PREFIJO + 'nomostrar_' + pid) === '1'; }
    catch (e) { return false; }
  }

  /* ¿El perfil activo es un docente con al menos una señal real de uso? */
  function _esDocenteConUsoReal(completed, started, streak) {
    try {
      if (typeof MQCProfiles === 'undefined') return false;
      if (!MQCProfiles.hasActive || !MQCProfiles.hasActive()) return false;
      if (MQCProfiles.isGuest && MQCProfiles.isGuest()) return false; /* invitado: nunca */
      const meta = MQCProfiles.activeMeta ? MQCProfiles.activeMeta() : null;
      if (!meta || meta.rol !== 'docente') return false;
    } catch (e) { return false; }

    const usoContenido  = (completed > 0 || started > 0);
    const usoVariosDias = !!(streak && streak.best >= 2);
    return usoContenido || usoVariosDias;
  }

  function _buildApoyoDocenteBanner(completed, started, streak) {
    if (!_esDocenteConUsoReal(completed, started, streak)) return '';
    if (typeof window.MQCSupport === 'undefined') return ''; /* sin soporte cargado, no hay a dónde abrir */

    const pid = _apoyoDocentePerfilId();
    if (_apoyoDocenteOcultoSesion(pid) || _apoyoDocenteOcultoPermanente(pid)) return '';

    return `
      <div class="card mqc-apoyo-docente" id="mqc-apoyo-docente-banner" style="margin-top:1.25rem;border-color:rgba(0,212,255,.18);position:relative">
        <button type="button" id="mqc-apoyo-docente-cerrar" title="Cerrar" aria-label="Cerrar"
                style="position:absolute;top:.5rem;right:.6rem;background:none;border:none;color:var(--text-muted);font-size:1rem;cursor:pointer;line-height:1;padding:.2rem">✕</button>
        <p style="color:var(--text-secondary);font-size:.9rem;margin:0 1.8rem 0 0">
          💙 <strong>¿Te está siendo útil MásQueCiencia con tu grupo?</strong> Si querés, podés apoyar el mantenimiento y crecimiento del proyecto — es completamente voluntario y no afecta tu acceso.
        </p>
        <div style="margin-top:.65rem;display:flex;align-items:center;gap:1.1rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" id="mqc-apoyo-docente-abrir">♡ Ver cómo apoyar</button>
          <button type="button" id="mqc-apoyo-docente-nomostrar"
                  style="background:none;border:none;color:var(--text-muted);font-size:.78rem;text-decoration:underline;cursor:pointer;padding:0">
            No volver a mostrar
          </button>
        </div>
      </div>
    `;
  }

  function _bindApoyoDocenteBanner() {
    const banner = document.getElementById('mqc-apoyo-docente-banner');
    if (!banner) return;
    const pid = _apoyoDocentePerfilId();

    const cerrarBtn    = document.getElementById('mqc-apoyo-docente-cerrar');
    const abrirBtn     = document.getElementById('mqc-apoyo-docente-abrir');
    const noMostrarBtn = document.getElementById('mqc-apoyo-docente-nomostrar');

    if (cerrarBtn) cerrarBtn.addEventListener('click', () => {
      try { sessionStorage.setItem(APOYO_DOCENTE_PREFIJO + 'sesion_' + pid, '1'); } catch (e) {}
      banner.remove();
    });
    if (abrirBtn) abrirBtn.addEventListener('click', () => {
      if (typeof MQCSupport !== 'undefined' && MQCSupport.openModal) MQCSupport.openModal();
    });
    if (noMostrarBtn) noMostrarBtn.addEventListener('click', () => {
      try { localStorage.setItem(APOYO_DOCENTE_PREFIJO + 'nomostrar_' + pid, '1'); } catch (e) {}
      banner.remove();
    });
  }

  /* ── Eventos ────────────────────────────────────────────── */

  function _bindEvents() {
    /* Clic en tarjeta de unidad → navegar al detalle */
    document.querySelectorAll('.unit-card[data-unit]').forEach(card => {
      card.addEventListener('click', () => {
        Router.navigate('units', { unitId: card.dataset.unit });
      });
    });

    /* Banner de apoyo/adopción docente (si se renderizó) */
    _bindApoyoDocenteBanner();

    /* Canvas responsive */
    window.addEventListener('resize', _onResize);
  }

  function _onResize() {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      if (_canvas) { _resizeCanvas(); _createParticles(); }
    }, 200);
  }

  /* ── Interfaz del módulo ────────────────────────────────── */

  function init() {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = _buildHTML();
    setTimeout(_initCanvas, 50);
    _bindEvents();

    /* XP de login diario (solo si no es la misma sesión del día) */
    const data  = Storage.load();
    const today = new Date().toISOString().split('T')[0];
    if (data.streak.lastDate !== today) {
      Gamification.addXP('daily-login');
    }
  }

  function destroy() {
    _stopCanvas();
    window.removeEventListener('resize', _onResize);
    clearTimeout(_resizeTimer);
  }

  return { init, destroy };

})());
