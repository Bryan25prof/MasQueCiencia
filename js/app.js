/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/app.js  |  Inicializador Principal de la Aplicación
   ================================================================
   FASE 0 — Archivo ejecutado ÚLTIMO (tras cargar todos los módulos).

   Flujo de inicio:
   1. Ocultar loading screen
   2. Verificar si el estudiante ya tiene nombre registrado
     a. Si NO → mostrar modal de bienvenida
     b. Si SÍ → cargar layout principal y navegar a 'home'
   3. Registrar sesión del día (racha + última visita)
   4. Actualizar UI del sidebar (nombre, XP, nivel)
   5. El Router maneja toda la navegación posterior

   PARA AGREGAR NUEVAS SECCIONES (Fase 1+):
   - Solo necesitas crear el módulo en js/modules/ y agregarlo
     en index.html. El Router y App.updateUserUI funcionan
     automáticamente sin modificar este archivo.

   PARA MODIFICAR EL COMPORTAMIENTO DE INICIO:
   - Edita la función App.init() abajo.
================================================================ */

const App = (() => {
  'use strict';

  /* ── Tiempo mínimo de la pantalla de carga (ms) ─────────── */
  const LOADING_MIN_MS = 1800;

  /* ── Inicialización ─────────────────────────────────────── */

  /**
   * Punto de entrada principal.
   * Llamado automáticamente cuando el DOM está listo.
   */
  async function init() {
    const startTime = Date.now();

    /* 1. Esperar a que el DOM esté completamente cargado */
    await _domReady();

    /* 2. Inicializar el router */
    Router.init();

    /* 2.5 Perfiles Locales MQC (EOP-008): si no hay perfil activo ni modo
       invitado, mostrar el gate de selección/creación de perfil. */
    if (typeof MQCProfiles !== 'undefined') {
      MQCProfiles.init();
      if (!MQCProfiles.hasActive() && !MQCProfiles.isGuest()) {
        _hideLoading();
        if (typeof MQCProfilesUI !== 'undefined' && MQCProfilesUI.openGate) {
          MQCProfilesUI.openGate();
          return;
        }
      }
      /* El invitado no tiene nombre: sembrar "Invitado" para saltar el modal. */
      if (MQCProfiles.isGuest() && !Storage.hasUser()) {
        Storage.set('user', { name: 'Invitado', joined: Date.now(), lastSeen: Date.now() });
      }
    }

    /* 3. Verificar si hay usuario registrado */
    const hasUser = Storage.hasUser();
    const _guest  = (typeof MQCProfiles !== 'undefined' && MQCProfiles.isGuest());

    /* 4. Esperar el tiempo mínimo de carga para que la animación se vea */
    const elapsed = Date.now() - startTime;
    if (elapsed < LOADING_MIN_MS) {
      await _wait(LOADING_MIN_MS - elapsed);
    }

    /* 5. Ocultar la pantalla de carga */
    _hideLoading();

    if (!hasUser && !_guest) {
      /* 6a. Mostrar modal de primer acceso */
      _showWelcomeModal();
    } else {
      /* 6b. Registrar sesión y mostrar la app */
      Storage.registerSession();
      _showApp();
    }

    /* Chip flotante de perfil (cambiar/administrar perfiles). */
    if (typeof MQCProfilesUI !== 'undefined' && MQCProfilesUI.mountChip) {
      try { MQCProfilesUI.mountChip(); } catch (e) {}
    }
    /* Bitácora Científica: rastrear tiempo aproximado de estudio (solo perfil activo). */
    if (typeof MQCProfiles !== 'undefined' && MQCProfiles.startStudyTracking && MQCProfiles.hasActive && MQCProfiles.hasActive()) {
      try { MQCProfiles.startStudyTracking(); } catch (e) {}
    }
  }

  /* ── Pantalla de carga ──────────────────────────────────── */

  function _hideLoading() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    screen.classList.add('fade-out');
    /* Remover del DOM tras la animación */
    setTimeout(() => {
      if (screen.parentNode) screen.parentNode.removeChild(screen);
    }, 600);
  }

  /* ── Modal de bienvenida (primer acceso) ────────────────── */

  function _showWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) modal.classList.remove('hidden');

    const input   = document.getElementById('student-name-input');
    const startBtn = document.getElementById('start-btn');

    if (!input || !startBtn) return;

    /* Focus en el input */
    setTimeout(() => input.focus(), 100);

    /* Activar botón con Enter */
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') _registerStudent(input.value);
    });

    /* Botón de inicio */
    startBtn.addEventListener('click', () => _registerStudent(input.value));
  }

  function _registerStudent(rawName) {
    const name = (rawName || '').trim();

    if (name.length < 2) {
      /* Shake de error en el input */
      const input = document.getElementById('student-name-input');
      if (input) {
        input.style.borderColor = 'var(--red)';
        input.style.animation = 'none';
        input.placeholder = 'Escribe al menos 2 caracteres';
        setTimeout(() => {
          input.style.borderColor = '';
          input.placeholder = 'Escribe tu nombre aquí';
        }, 2000);
      }
      return;
    }

    /* Guardar datos del usuario */
    const data = Storage.load();
    data.user.name    = name;
    data.user.joined  = Date.now();
    data.user.lastSeen = Date.now();
    data.streak.current  = 1;
    data.streak.lastDate = new Date().toISOString().split('T')[0];
    data.streak.best     = 1;
    Storage.save(data);

    /* Cerrar modal y mostrar app */
    const modal = document.getElementById('welcome-modal');
    if (modal) modal.classList.add('hidden');

    /* Otorgar medalla de primer acceso */
    Gamification.checkBadges(data);

    /* Mostrar la app y dar XP de bienvenida */
    _showApp();
    Gamification.addXP('daily-login');
  }

  /* ── Mostrar el layout principal ────────────────────────── */

  function _showApp() {
    const layout = document.getElementById('main-layout');

    if (layout) {
      layout.classList.remove('hidden');
      /* Animación de entrada del sidebar */
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        /* En desktop el sidebar es fijo y visible; en móvil cerrado */
        // La gestión la hace CSS + el router
      }
    }

    /* Actualizar UI del sidebar */
    updateUserUI();

    /* EOP-020: montar "La Curiosidad" (Photon) — arquitectura y activo
       oficial v0.1 ya integrados. Se monta una sola vez por sesión;
       si el contenedor no existe o Photon no cargó, no rompe nada. */
    if (typeof Photon !== 'undefined' && Photon.mount) {
      const photonRoot = document.getElementById('photon-root');
      if (photonRoot) {
        try {
          Photon.mount(photonRoot, { float: true });
          setTimeout(() => { try { Photon.react('welcome'); } catch (e) {} }, 600);
        } catch (e) { /* silencioso: el Fotón es de apoyo, nunca bloqueante */ }
      }
    }

    /* Navegar a la sección inicial */
    Router.navigate('home');
  }

  /* ── Actualización de la UI del sidebar ─────────────────── */

  /**
   * Actualiza el sidebar con los datos actuales del usuario.
   * Llamar tras cualquier cambio de XP o nivel.
   */
  function updateUserUI() {
    const data      = Storage.load();
    const levelInfo = Gamification.getLevelInfo();
    const user      = data.user;

    /* Nombre */
    const nameEl = document.getElementById('sidebar-user-name');
    if (nameEl) nameEl.textContent = user.name || 'Estudiante';

    /* Nivel */
    const levelEl = document.getElementById('sidebar-user-level');
    if (levelEl) levelEl.textContent = `${levelInfo.icon} ${levelInfo.name}`;

    /* Barra de XP */
    const xpFill = document.getElementById('sidebar-xp-fill');
    if (xpFill) xpFill.style.width = `${levelInfo.percent}%`;

    /* Texto de XP */
    const xpText = document.getElementById('sidebar-xp-text');
    if (xpText) {
      xpText.textContent = levelInfo.maxed
        ? `${levelInfo.xp.toLocaleString()} XP (Máx.)`
        : `${levelInfo.xp.toLocaleString()} / ${levelInfo.xpNext.toLocaleString()} XP`;
    }

    /* Topbar móvil */
    const topbarLevel = document.getElementById('topbar-level-badge');
    if (topbarLevel) topbarLevel.textContent = `${levelInfo.icon} Nv.${levelInfo.level}`;

    const topbarXP = document.getElementById('topbar-xp');
    if (topbarXP) topbarXP.textContent = `${levelInfo.xp.toLocaleString()} XP`;
  }

  /* ── Helpers ────────────────────────────────────────────── */

  /** Espera a que el DOM esté listo */
  function _domReady() {
    return new Promise(resolve => {
      if (document.readyState !== 'loading') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      }
    });
  }

  /** Espera un tiempo determinado (ms) */
  function _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ── Exportar API pública ───────────────────────────────── */
  return {
    init,
    updateUserUI
  };

})(); // App

/* ============================================================
   ARRANQUE AUTOMÁTICO
   Se ejecuta tan pronto como el script se carga.
   Como es el último script en index.html, todos los módulos
   ya están definidos en este punto.
============================================================ */
App.init().catch(err => {
  console.error('[App] Error fatal de inicialización:', err);
  /* Fallback: mostrar error al usuario */
  document.body.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                min-height:100vh;background:#070714;color:#e8e8ff;font-family:sans-serif;
                text-align:center;padding:2rem;gap:1rem">
      <span style="font-size:3rem">⚠️</span>
      <h2 style="color:#00d4ff;font-size:1.3rem">Error al iniciar Química Interactiva 10°</h2>
      <p style="color:#9898cc;max-width:40ch;line-height:1.7">${err.message}</p>
      <button onclick="location.reload()"
              style="background:#00d4ff;color:#070714;border:none;padding:.75rem 1.5rem;
                     border-radius:8px;font-weight:700;font-size:.95rem;cursor:pointer;
                     margin-top:.5rem">
        🔄 Recargar
      </button>
      <p style="color:#5858aa;font-size:.78rem;margin-top:1rem">
        Asegúrate de que todos los archivos JS estén en sus carpetas correctas.
      </p>
    </div>
  `;
});

/*
  ╔════════════════════════════════════════════════════════════════╗
  ║  NÚCLEO FUNCIONAL MQC v1.0 — CERRADO Y CONGELADO (EOP-014)      ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  La guía de fases que existía aquí (simuladores/laboratorio/    ║
  ║  juegos/examen como módulos globales separados) quedó           ║
  ║  reemplazada por la arquitectura real implementada: cada unidad ║
  ║  (js/units/unit-0X.js) es autocontenida — sus propios           ║
  ║  simuladores, juego y examen viven dentro de sus 4 pestañas,    ║
  ║  sin agregadores globales. Ver MQC_MASTER_PROJECT_v1.0.md       ║
  ║  §11-13 para el detalle completo de esta decisión.              ║
  ║  Cualquier desarrollo futuro pertenece a la etapa de Dirección  ║
  ║  de Arte (identidad visual, branding, experiencia), no a nuevas ║
  ║  funcionalidades del núcleo.                                    ║
  ╚════════════════════════════════════════════════════════════════╝
*/
