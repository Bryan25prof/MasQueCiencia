/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/core/router.js  |  Router SPA (sin hash, sin servidor)
   ================================================================
   Sistema de navegación de página única.
   Cada "sección" es un módulo que se registra con:
     Router.register('nombre', { init, destroy })

   El módulo debe exponer:
     init()    — renderiza el contenido en #content
     destroy() — limpia listeners, animaciones, canvas, etc.

   PARA AGREGAR UNA SECCIÓN NUEVA (Fase 1, 2, 3...):
     1. Crear el archivo js/modules/nueva-seccion.js
     2. Definir el módulo con init() y destroy()
     3. Agregar <script src="..."> en index.html
     4. El módulo se auto-registra con Router.register(...)
     5. Agregar <li> al sidebar en index.html con data-section="nombre"
     El router hace el resto automáticamente.
================================================================ */

const Router = (() => {
  'use strict';

  /* ── Estado interno ─────────────────────────────────────── */
  const _modules   = {};          // { nombre → { init, destroy } }
  let   _current   = null;        // nombre de la sección activa
  let   _prevSection = null;      // para botón "volver"

  /* ── Registro de módulos ─────────────────────────────────── */

  /**
   * Registra un módulo de sección.
   * @param {string} name   — Nombre de la sección (coincide con data-section)
   * @param {object} module — { init(), destroy() }
   */
  function register(name, module) {
    if (!module.init) {
      console.warn(`[Router] El módulo "${name}" no tiene init(). Se ignorará.`);
      return;
    }
    _modules[name] = module;
  }

  /* ── Navegación ─────────────────────────────────────────── */

  /**
   * Navega a una sección.
   * @param {string} section    — Nombre de la sección
   * @param {any}    [params]   — Datos opcionales para el módulo (ej: unitId)
   * @param {boolean} [noHistory] — No guardar en _prevSection
   */
  function navigate(section, params, noHistory) {
    /* Si no existe el módulo, mostrar placeholder */
    if (!_modules[section]) {
      _showPlaceholder(section);
      _setActive(section);
      _closeSidebarMobile();
      if (!noHistory) _prevSection = _current;
      _current = section;
      return;
    }

    /* Destruir módulo anterior */
    if (_current && _modules[_current] && _modules[_current].destroy) {
      try {
        _modules[_current].destroy();
      } catch (e) {
        console.warn(`[Router] Error en destroy() de "${_current}":`, e);
      }
    }

    if (!noHistory) _prevSection = _current;
    _current = section;

    /* Actualizar estado activo en sidebar */
    _setActive(section);

    /* Limpiar y renderizar contenido */
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = '';
      content.scrollTop = 0;
    }

    /* Inicializar nuevo módulo */
    try {
      _modules[section].init(params);
    } catch (e) {
      console.error(`[Router] Error en init() de "${section}":`, e);
      content.innerHTML = `
        <div class="placeholder-page">
          <span class="placeholder-icon">⚠️</span>
          <h2>Error al cargar la sección</h2>
          <p class="placeholder-desc">Ocurrió un error: ${e.message}</p>
          <button class="btn btn-primary" data-nav="home">Volver al Inicio</button>
        </div>
      `;
    }

    /* Cerrar sidebar en móvil */
    _closeSidebarMobile();
  }

  /**
   * Navega a la sección anterior.
   * Si no hay anterior, va a 'home'.
   */
  function back() {
    navigate(_prevSection || 'home', null, true);
  }

  /* ── Helpers internos ───────────────────────────────────── */

  /** Marca el ítem activo en el sidebar */
  function _setActive(section) {
    document.querySelectorAll('.nav-item').forEach(el => {
      const isActive = el.dataset.section === section;
      el.classList.toggle('active', isActive);
      /* EOP-014: aria-current comunica a lectores de pantalla cuál
         sección está activa, igual que la clase visual .active */
      if (isActive) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    _updateBrandRoute(section);
  }

  /* HOTFIX-11: por pedido explícito del docente, esta línea de marca
     deja de cambiar según el grado activo (antes: "QUÍMICA 10.º" en
     secciones de Décimo, "QUÍMICA 11.º" en 'grade11') y pasa a ser
     un rótulo fijo — la plataforma ya cubre ambos grados, así que la
     identidad de marca siempre lo refleja, sin importar en qué
     sección esté navegando el estudiante. Se conserva el mecanismo
     (se sigue actualizando desde el mismo punto donde se marca la
     navegación activa) por si en el futuro se decide revertir este
     comportamiento — solo cambiaría la línea de abajo. */
  const BRAND_ROUTE_LABEL = 'QUÍMICA INTERACTIVA 10.º Y 11.º';
  function _updateBrandRoute(section) {
    const label = BRAND_ROUTE_LABEL;
    const sidebarLabel = document.getElementById('sidebar-route-label');
    const topbarLabel = document.getElementById('topbar-route-label');
    if (sidebarLabel) sidebarLabel.textContent = label;
    if (topbarLabel) topbarLabel.textContent = label;
  }

  /** Muestra una página placeholder para secciones no implementadas aún */
  function _showPlaceholder(section) {
    const content = document.getElementById('content');
    if (!content) return;

    const meta = _placeholderMeta(section);
    const iconClass = 'placeholder-icon' + (meta.iconGlow ? ' placeholder-icon-glow' : '');

    content.innerHTML = `
      <div class="placeholder-page">
        <span class="${iconClass}">${meta.icon}</span>
        <h2 class="placeholder-title">${meta.title}</h2>
        <p class="placeholder-desc">${meta.desc}</p>
        <span class="placeholder-coming-soon">🚧 En Construcción — Próximas Fases</span>
        <br><br>
        <button class="btn btn-ghost" style="margin-top:1rem" data-nav="home">
          ← Volver al Inicio
        </button>
      </div>
    `;
  }

  /** Metadatos de las secciones placeholder (el mecanismo genérico de
      fallback se mantiene intacto para cualquier ruta no registrada) */
  function _placeholderMeta(section) {
    const map = {
      'about': {
        /* HOTFIX-11: el ícono ℹ️ genérico se reemplaza por un átomo,
           coherente con la identidad química de la marca (el propio
           logo de MQC ya es un átomo — ver #mqc-atom-logo), con un
           glow cian/violeta exclusivo de esta sección (iconGlow),
           que no afecta a ninguna otra página placeholder. */
        icon: '⚛️',
        iconGlow: true,
        title: 'Acerca de la Plataforma',
        desc: 'Química Interactiva 10.º y 11.º surge como un plan novedoso para incentivar la enseñanza de la Química y brindar más que una plataforma: una experiencia nueva para aprender ciencia, pensada para estudiantes de secundaria del sistema educativo de Costa Rica. Lic. Bryan Chavarría C.'
      }
    };
    return map[section] || {
      icon: '🔭',
      title: 'Sección en construcción',
      desc: 'Esta sección estará disponible en una próxima actualización de la plataforma.'
    };
  }

  /** Cierra el sidebar en dispositivos móviles */
  function _closeSidebarMobile() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  /* ── Inicialización ─────────────────────────────────────── */

  /**
   * Inicializa el router: adjunta eventos a los ítems del nav.
   * Llamar una sola vez desde App.init().
   */
  function init() {
    /* ── Delegación global para botones de navegación ───────
       BUG-03 CORREGIDO: Reemplaza todos los onclick inline.
       Cualquier elemento con data-nav="seccion" en el DOM
       (estático o generado dinámicamente) dispara navigate().
    ──────────────────────────────────────────────────────── */
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-nav]');
      if (btn) navigate(btn.dataset.nav);
    });

    /* Delegación de eventos en el sidebar nav (clic + teclado) */
    const nav = document.getElementById('sidebar-nav');
    if (nav) {
      nav.addEventListener('click', e => {
        const item = e.target.closest('.nav-item');
        if (item && item.dataset.section) {
          navigate(item.dataset.section);
        }
      });
      /* EOP-014: accesibilidad — los .nav-item son <li role="button">
         focoables (tabindex=0); Enter/Espacio deben activarlos igual
         que un clic, tal como espera cualquier usuario de teclado. */
      nav.addEventListener('keydown', e => {
        const item = e.target.closest('.nav-item');
        if (!item || !item.dataset.section) return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          navigate(item.dataset.section);
        }
      });
    }

    /* Hamburguesa móvil */
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar    = document.getElementById('sidebar');
    const overlay    = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
      menuToggle.addEventListener('click', () => {
        const willOpen = !sidebar.classList.contains('open');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        /* EOP-014: aria-expanded comunica el estado real del menú a
           lectores de pantalla (antes solo cambiaba visualmente) */
        menuToggle.setAttribute('aria-expanded', String(willOpen));
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /**
   * Retorna el nombre de la sección activa.
   * @returns {string|null}
   */
  function getCurrent() { return _current; }

  /**
   * Retorna los nombres de todos los módulos registrados.
   * @returns {string[]}
   */
  function getRegistered() { return Object.keys(_modules); }

  /* ── Exportar API pública ───────────────────────────────── */
  return {
    register,
    navigate,
    back,
    init,
    getCurrent,
    getRegistered
  };

})(); // Router
