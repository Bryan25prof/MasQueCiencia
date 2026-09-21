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
    /* Si no existe el módulo, mostrar placeholder (o, para "about",
       su página dedicada — ver PENDIENTE A) */
    if (!_modules[section]) {
      if (section === 'about') _showAbout();
      else _showPlaceholder(section);
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

  /* SPRINT MULTICIENCIA — FASE 1 (pedido explícito del docente): la marca
     general deja de leerse como "solo Química" — MQC ahora presenta tres
     disciplinas (Química/Física/Biología). Antes: HOTFIX-11 ya había fijado
     este rótulo para que no cambiara según el grado activo; se mantiene ese
     mismo mecanismo, solo cambia el texto fijo. */
  const BRAND_ROUTE_LABEL = 'CIENCIAS INTERACTIVAS 10.º Y 11.º';
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
    /* SPRINT MULTICIENCIA — FASE 1: campo opcional 'image' (no rompe nada
       de lo existente — si una sección no lo define, no se renderiza
       ninguna etiqueta <img>, exactamente el comportamiento de siempre).
       SPRINT ANALYTICS — PARTE 13: centrado real vía flex/justify-content
       en un contenedor propio (.placeholder-image-wrap, ver main.css),
       en vez de depender de que <img> herede text-align del padre — así
       queda centrado de forma robusta y responsive, sin márgenes fijos.
       PENDIENTE A: "about" ya no pasa por esta función genérica (tiene
       su propia página dedicada, ver _showAbout más abajo), así que el
       id="mqc-about-logo" para el disparador oculto de devtools.js ahora
       se agrega directamente ahí — este helper genérico ya no lo necesita. */
    const imageHTML = meta.image
      ? `<div class="placeholder-image-wrap"><img src="${meta.image}" alt="${meta.imageAlt || ''}" class="placeholder-image"></div>`
      : '';
    const accentStyle = meta.accent ? ` style="color:${meta.accent};text-shadow:0 0 16px ${meta.accent}55"` : '';

    content.innerHTML = `
      <div class="placeholder-page">
        ${imageHTML}
        <span class="${iconClass}"${meta.image ? '' : accentStyle}>${meta.image ? '' : meta.icon}</span>
        <h2 class="placeholder-title"${accentStyle}>${meta.title}</h2>
        <p class="placeholder-desc">${meta.desc}</p>
        <span class="placeholder-coming-soon">🚧 En Construcción — Próximas Fases</span>
        <br><br>
        <button class="btn btn-ghost" style="margin-top:1rem" data-nav="home">
          ← Volver al Inicio
        </button>
      </div>
    `;
  }

  /* ================================================================
     PENDIENTE A — "Acerca de la Plataforma" (página dedicada)
     ================================================================
     Antes usaba el mecanismo genérico _showPlaceholder (una descripción
     corta + insignia "En Construcción"). Se separa en una función propia
     porque el contenido real ya no es un placeholder — es contenido
     permanente y más extenso, organizado en bloques/cards cortos (nunca
     una pared de texto ni una pantalla de términos y condiciones).

     Compatibilidad deliberada con código externo que observa este DOM
     desde afuera ("archivo congelado", según sus propios comentarios):
       - conserva la clase .placeholder-page como contenedor raíz y el
         texto literal "Acerca de la Plataforma" en un <h2> — de eso
         depende js/shared/support.js (_watchContent/_injectAboutCard)
         para inyectar el botón "♡ Apoyar MQC" al final de esta página,
         sin que este archivo necesite saber que existe.
       - conserva id="mqc-about-logo" en la imagen del logo — de eso
         depende js/shared/devtools.js (disparador oculto del panel de
         desarrollador, 5 toques sobre el logo).
     ================================================================ */
  function _showAbout() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = _aboutPageHTML();
  }

  function _aboutPageHTML() {
    return `
      <div class="placeholder-page about-page">
        <div class="placeholder-image-wrap">
          <img id="mqc-about-logo" src="assets/branding/mqc-logo-ciencias.jpg" alt="MásQueCiencia — Ciencias Interactivas" class="placeholder-image">
        </div>
        <h2 class="placeholder-title">Acerca de la Plataforma</h2>

        <div class="about-card">
          <p>MásQueCiencia es una plataforma educativa interactiva orientada al aprendizaje de las ciencias para estudiantes de 10.º y 11.º año del sistema educativo costarricense. Actualmente, los módulos de Química y Física se encuentran habilitados, mientras que Biología constituye la próxima etapa de desarrollo del proyecto. MQC integra contenidos, actividades, simulaciones, juegos y experiencias de evaluación diseñadas para favorecer la comprensión, el razonamiento científico y la aplicación de los conocimientos.</p>
          <p class="about-card-credit">Un proyecto del Lic. Bryan Chavarría C., pensado para estudiantes de secundaria del sistema educativo de Costa Rica.</p>
        </div>

        <div class="about-card">
          <h3 class="about-card-title">🔬 Estado actual de las ciencias</h3>
          <div class="about-status-row">
            <span class="about-status-pill available">✅ Química — Disponible</span>
            <span class="about-status-pill available">✅ Física — Disponible</span>
            <span class="about-status-pill soon">🧬 Biología — Próxima etapa de desarrollo</span>
          </div>
        </div>

        <div class="about-card">
          <h3 class="about-card-title">🤖 Transparencia sobre inteligencia artificial</h3>
          <p>MQC es un proyecto de autoría y dirección docente, desarrollado con apoyo de herramientas de inteligencia artificial. En su desarrollo se utilizaron específicamente ChatGPT (OpenAI) y Claude (Anthropic) como herramientas de apoyo para programación, organización, análisis, generación de propuestas y desarrollo de experiencias interactivas.</p>
          <p>El contenido y las decisiones finales están sujetos a revisión y criterio profesional humano: la inteligencia artificial no sustituye la responsabilidad académica, pedagógica ni científica del autor. MQC no se presenta como un producto "creado por IA".</p>
        </div>

        <div class="about-card">
          <h3 class="about-card-title">📚 Fuentes y reconocimiento académico</h3>
          <p>MQC utiliza como referencia materiales educativos y académicos pertinentes, entre ellos:</p>
          <ul class="about-list">
            <li>materiales y evaluaciones oficiales del Ministerio de Educación Pública de Costa Rica (MEP), especialmente como orientación para prácticas y simulaciones tipo PNE;</li>
            <li>Didáctica Multimedia;</li>
            <li>Editorial Porras;</li>
            <li>bibliografía universitaria;</li>
            <li>otras fuentes académicas pertinentes.</li>
          </ul>
          <p class="about-card-note">MQC reconoce estas fuentes y respeta la propiedad intelectual correspondiente. Esta plataforma no afirma afiliación, patrocinio ni aval oficial de estas instituciones ni editoriales.</p>
        </div>

        <div class="about-card">
          <h3 class="about-card-title">🔓 Acceso gratuito</h3>
          <p>MásQueCiencia es una plataforma educativa de acceso gratuito: no requiere suscripción ni compra para acceder a los contenidos académicos.</p>
          <p>MQC puede ofrecer mecanismos de apoyo o donación voluntaria destinados al mantenimiento y desarrollo del proyecto, pero ese apoyo nunca condiciona el acceso a contenidos, evaluaciones, progreso ni funciones académicas.</p>
        </div>

        <div class="about-card">
          <h3 class="about-card-title">🗂️ Datos, perfiles y Analytics</h3>
          <p>Determinadas funciones y datos del perfil —como el progreso guardado— funcionan de manera local en el dispositivo. De forma separada, determinadas métricas autorizadas de seguimiento y análisis pueden apoyarse en infraestructura de Supabase.</p>
          <p>MQC utiliza infraestructura tecnológica de Supabase para apoyar determinadas funciones de seguimiento y análisis estadístico. La información recopilada mediante estos mecanismos está destinada al análisis del funcionamiento y rendimiento académico dentro de la plataforma, con el propósito de identificar tendencias, evaluar el desempeño general y orientar mejoras educativas y técnicas de MQC. Estos datos no tienen como finalidad su publicación como información individual de los estudiantes y su acceso se encuentra sujeto a los controles de seguridad y permisos configurados en la plataforma.</p>
        </div>

        <div class="about-card about-card-principles">
          <h3 class="about-card-title">🧭 Principios del proyecto</h3>
          <p>MQC busca un uso responsable, crítico y transparente de la tecnología, reconoce las fuentes y la propiedad intelectual involucradas, y mantiene el criterio profesional docente como elemento central de las decisiones educativas de la plataforma.</p>
        </div>

        <button class="btn btn-ghost" style="margin-top:0.5rem" data-nav="home">
          ← Volver al Inicio
        </button>
      </div>
    `;
  }

  /** Metadatos de las secciones placeholder (el mecanismo genérico de
      fallback se mantiene intacto para cualquier ruta no registrada).
      PENDIENTE A: 'about' ya no vive acá — tiene su propia página
      dedicada (_showAbout/_aboutPageHTML). 'fisica-proximamente' se
      retiró: confirmado por grep en todo el repo que no tenía ninguna
      referencia funcional (ningún data-section apunta a esa ruta desde
      que Física 10.º/11.º pasaron a ser rutas reales y públicas). */
  function _placeholderMeta(section) {
    const map = {
      'biologia-proximamente': {
        icon: '🧬',
        iconGlow: true,
        accent: 'var(--green)',
        title: 'Biología — En Desarrollo',
        desc: 'Biología 10.º y 11.º ya forman parte de la visión de MásQueCiencia. Próximamente nuevas experiencias de aprendizaje: unidades, simuladores y juegos interactivos, con la misma calidad que ya conocés en Química.'
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
