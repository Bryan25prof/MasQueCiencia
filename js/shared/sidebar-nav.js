/* ================================================================
   MÁSQUECIENCIA — js/shared/sidebar-nav.js
   PENDIENTE B — Reestructuración del sidebar académico
   ================================================================
   Arquitectura: MENÚ PRINCIPAL → CIENCIA → PANEL CONTEXTUAL → GRADO
   → CONTENIDOS.

   100% ADITIVO Y DE SOLO PRESENTACIÓN:
   - No crea, borra ni recalcula ningún dato. Lee los catálogos reales
     ya existentes (UNIDADES_DATA, GRADE11_UNIDADES_DATA,
     FISICA10_UNIDADES_DATA, FISICA11_UNIDADES_DATA) y el estado real
     de Storage (desbloqueo de Química 11.º, banderas de Física,
     progreso por unidad) exactamente como ya lo hacía grade-select.js
     — nunca se duplica esa información a mano.
   - Nunca llama a Router.navigate() con una ruta o parámetro distinto
     de los que el propio código ya usa hoy (mismos data-section,
     mismo {unitId} que ya soporta units.js y que ahora también
     soportan grade11.js/fisica10.js/fisica11.js).
   - router.js NO SE MODIFICA. Su delegación de clics sobre
     `#sidebar-nav` solo actúa sobre elementos con `data-section` (ver
     router.js líneas ~322-342); las filas "⚗️ Química ›"/"🧲 Física ›"/
     "🧬 Biología ›" llevan `data-toggle-science` en su lugar, así que
     el Router simplemente las ignora. Este archivo es el único que
     escucha esos clics.

   Responsive (Decisión 1 — Opción A, aprobada):
   - <1024px: navegación progresiva DENTRO del propio sidebar — el
     panel contextual reemplaza la lista `<ul id="sidebar-nav">`
     (nunca se muestran ambos a la vez, nunca hay overlays apilados;
     el sidebar en sí sigue siendo el único overlay que ya existía).
   - ≥1024px: el panel contextual aparece como una segunda columna fija
     a la derecha del sidebar compacto, sin ocultar el menú principal.

   Rol docente (Decisión 2): este archivo NO agrega ni modifica ningún
   candado. Refleja exactamente el estado de acceso que ya entrega
   cada módulo (data.grade11Unlock, banderas de Física) — un docente
   ve hoy exactamente lo mismo que vería un estudiante en su lugar.
   El acceso total por rol queda registrado aparte como PENDIENTE D.
================================================================ */

window.MQCSidebarNav = (function () {
  'use strict';

  let _panel = null;
  let _sidebar = null;
  let _nav = null;
  let _content = null;

  let _science = null;  // 'quimica' | 'fisica' | 'biologia' | null
  let _level = 0;        // 0 = cerrado, 2 = grados, 3 = contenidos
  let _grado = null;     // 'quimica10' | 'quimica11' | 'fisica10' | 'fisica11'

  /* Qué ruta(s) del Router pertenecen a cada ciencia — solo para
     resaltar visualmente cuál ciencia está activa (§ "el estudiante
     siempre debe saber dónde está"). No participa de ninguna decisión
     de acceso ni de navegación real. */
  const RUTA_A_CIENCIA = {
    home: 'quimica', units: 'quimica', grade11: 'quimica',
    'atlas-quimico': 'quimica', integrador: 'quimica',
    fisica10: 'fisica', fisica11: 'fisica',
    'biologia-proximamente': 'biologia'
  };

  function _isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  /* ── Fuentes de datos reales (nunca se duplican a mano) ─────── */

  function _dataQuimica10() {
    if (typeof UNIDADES_DATA === 'undefined') return [];
    const data = Storage.load();
    return UNIDADES_DATA.map(u => ({
      section: 'units', unitId: u.id,
      label: `U${String(u.num).padStart(2, '0')} · ${u.name}`,
      done: !!(data.units[u.id] && data.units[u.id].completed)
    }));
  }

  function _dataQuimica11() {
    if (typeof GRADE11_UNIDADES_DATA === 'undefined') return [];
    const data = Storage.load();
    return GRADE11_UNIDADES_DATA.map(u => ({
      section: 'grade11', unitId: u.id,
      label: `U${String(u.num).padStart(2, '0')} · ${u.title}`,
      done: !!(data.grade11[u.id] && data.grade11[u.id].completed),
      enDesarrollo: u.status !== 'active'
    }));
  }

  function _dataFisica10() {
    if (typeof FISICA10_UNIDADES_DATA === 'undefined') return [];
    const data = Storage.load();
    return FISICA10_UNIDADES_DATA.map(u => ({
      section: 'fisica10', unitId: u.id,
      label: `U${String(u.num).padStart(2, '0')} · ${u.title}`,
      done: !!(data.fisica10[u.id] && data.fisica10[u.id].completed),
      enDesarrollo: u.status !== 'active'
    }));
  }

  function _dataFisica11() {
    if (typeof FISICA11_UNIDADES_DATA === 'undefined') return [];
    const data = Storage.load();
    return FISICA11_UNIDADES_DATA.map(u => ({
      section: 'fisica11', unitId: u.id,
      label: `U${String(u.num).padStart(2, '0')} · ${u.title}`,
      done: !!(data.fisica11[u.id] && data.fisica11[u.id].completed),
      enDesarrollo: u.status !== 'active'
    }));
  }

  function _quimica11Unlocked() {
    try { return !!(Storage.load().grade11Unlock || {}).unlocked; } catch (e) { return false; }
  }

  function _fisicaHabilitada(clave) {
    /* Misma fuente única que ya usan grade-select.js/fisica10.js/
       fisica11.js — nunca se reimplementa el criterio a mano. */
    try {
      if (window.MQC_FISICA_FLAGS && window.MQC_FISICA_FLAGS[clave]) return true;
      const key = clave === 'fisica10Publico' ? 'mqc_fisica10_preview' : 'mqc_fisica11_preview';
      return localStorage.getItem(key) === '1';
    } catch (e) { return false; }
  }

  /* ── Render: nivel 2 (GRADO) ─────────────────────────────────── */

  function _renderNivelGrados(science) {
    const titulos = { quimica: 'QUÍMICA', fisica: 'FÍSICA', biologia: 'BIOLOGÍA' };
    let filas = '';

    if (science === 'quimica') {
      filas += `<li class="ctx-item" data-ctx-grado="quimica10">Química 10.º <span class="ctx-chevron">›</span></li>`;
      const unlocked = _quimica11Unlocked();
      filas += unlocked
        ? `<li class="ctx-item" data-ctx-grado="quimica11">Química 11.º <span class="ctx-chevron">›</span></li>`
        : `<li class="ctx-item ctx-item-locked" data-ctx-leaf data-section="grade11">Química 11.º <span class="ctx-lock" aria-hidden="true">🔒</span></li>`;
    } else if (science === 'fisica') {
      filas += `<li class="ctx-item" data-ctx-grado="fisica10">Física 10.º <span class="ctx-chevron">›</span></li>`;
      filas += `<li class="ctx-item" data-ctx-grado="fisica11">Física 11.º <span class="ctx-chevron">›</span></li>`;
    }

    return `
      <div class="ctx-panel-header">
        <button type="button" class="ctx-back" data-ctx-back="ciencias">← Ciencias</button>
        <h3 class="ctx-panel-title">${titulos[science] || ''}</h3>
      </div>
      <ul class="ctx-panel-list">${filas}</ul>
    `;
  }

  /* ── Render: nivel 3 (CONTENIDOS) ────────────────────────────── */

  function _renderNivelContenidos(science, grado) {
    const meta = {
      quimica10: { titulo: 'QUÍMICA 10.º', back: 'Química', items: _dataQuimica10(), extra: [
        { section: 'atlas-quimico', label: 'Atlas Químico' },
        { section: 'integrador', label: 'Proyecto Integrador' }
      ] },
      quimica11: { titulo: 'QUÍMICA 11.º', back: 'Química', items: _dataQuimica11(), extra: [] },
      fisica10:  { titulo: 'FÍSICA 10.º',  back: 'Física',  items: _dataFisica10(),  extra: [] },
      fisica11:  { titulo: 'FÍSICA 11.º',  back: 'Física',  items: _dataFisica11(),  extra: [] }
    }[grado];
    if (!meta) return '';

    const filasUnidades = meta.items.map(it => `
      <li class="ctx-item ${it.enDesarrollo ? 'ctx-item-soon' : ''}" data-ctx-leaf data-section="${it.section}" data-unit="${it.unitId}">
        ${it.done ? '✓ ' : ''}${it.label}${it.enDesarrollo ? ' <span class="ctx-soon-tag">🚧</span>' : ''}
      </li>`).join('');

    const filasExtra = meta.extra.map(ex => `
      <li class="ctx-item" data-ctx-leaf data-section="${ex.section}">${ex.label}</li>`).join('');

    return `
      <div class="ctx-panel-header">
        <button type="button" class="ctx-back" data-ctx-back="grados">← ${meta.back}</button>
        <h3 class="ctx-panel-title">${meta.titulo}</h3>
      </div>
      <ul class="ctx-panel-list">${filasUnidades}${filasExtra}</ul>
    `;
  }

  /* ── Transiciones de estado ──────────────────────────────────── */

  function _openScience(science) {
    _science = science;
    _grado = null;
    _level = 2;

    if (science === 'biologia') {
      /* Biología no tiene grados ni contenidos todavía — mismo
         comportamiento de siempre (placeholder "Próxima etapa"), sin
         inventar ninguna estructura ficticia. */
      _close();
      Router.navigate('biologia-proximamente');
      return;
    }

    _panel.innerHTML = _renderNivelGrados(science);
    _show();
    _bindPanelEvents();
  }

  function _openGrado(grado) {
    _grado = grado;
    _level = 3;
    _panel.innerHTML = _renderNivelContenidos(_science, grado);
    _bindPanelEvents();
  }

  function _leafNavigate(section, unitId) {
    _close();
    Router.navigate(section, unitId ? { unitId } : undefined);
  }

  function _close() {
    _science = null;
    _grado = null;
    _level = 0;
    if (_panel) { _panel.classList.remove('open'); _panel.innerHTML = ''; }
    if (_sidebar) _sidebar.classList.remove('sidebar-drill-active');
    if (_content) _content.classList.remove('sidebar-panel-open');
  }

  function _show() {
    _panel.classList.add('open');
    if (!_isDesktop()) _sidebar.classList.add('sidebar-drill-active');
    else _sidebar.classList.remove('sidebar-drill-active');
    if (_content) _content.classList.toggle('sidebar-panel-open', _isDesktop());
  }

  function _bindPanelEvents() {
    _panel.querySelectorAll('[data-ctx-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.getAttribute('data-ctx-back') === 'ciencias') _close();
        else _renderNivelGradosOtraVez();
      });
    });
    _panel.querySelectorAll('[data-ctx-grado]').forEach(el => {
      el.addEventListener('click', () => _openGrado(el.getAttribute('data-ctx-grado')));
    });
    _panel.querySelectorAll('[data-ctx-leaf]').forEach(el => {
      el.addEventListener('click', () => _leafNavigate(el.getAttribute('data-section'), el.getAttribute('data-unit')));
    });
  }

  function _renderNivelGradosOtraVez() {
    _grado = null;
    _level = 2;
    _panel.innerHTML = _renderNivelGrados(_science);
    _bindPanelEvents();
  }

  /* ── Resalte de "dónde estoy" (cosmético, no participa de ningún
       candado ni decisión de acceso) ───────────────────────────── */
  function _syncActiveScience() {
    if (typeof Router === 'undefined' || !Router.getCurrent) return;
    const current = Router.getCurrent();
    const science = RUTA_A_CIENCIA[current];
    document.querySelectorAll('.nav-science-toggle').forEach(el => {
      el.classList.toggle('active', !!science && el.getAttribute('data-toggle-science') === science);
    });
  }

  /* ── Inicialización ──────────────────────────────────────────── */

  function init() {
    _sidebar = document.getElementById('sidebar');
    _nav = document.getElementById('sidebar-nav');
    _panel = document.getElementById('sidebar-context-panel');
    _content = document.getElementById('content');
    if (!_sidebar || !_nav || !_panel) return;

    _nav.addEventListener('click', e => {
      const toggle = e.target.closest('[data-toggle-science]');
      if (toggle) {
        const sci = toggle.getAttribute('data-toggle-science');
        if (_science === sci && _level > 0) _close();
        else _openScience(sci);
        return;
      }
      /* Cualquier fila real (con data-section) cierra el panel — el
         Router navega por su cuenta, esto solo resetea el estado
         visual del panel para la próxima vez que se abra. */
      const real = e.target.closest('.nav-item[data-section]');
      if (real) _close();
    });

    _nav.addEventListener('keydown', e => {
      const toggle = e.target.closest('[data-toggle-science]');
      if (!toggle) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const sci = toggle.getAttribute('data-toggle-science');
        if (_science === sci && _level > 0) _close();
        else _openScience(sci);
      }
    });

    /* Si el propio sidebar se cierra en móvil (hamburguesa, overlay,
       o cualquier navegación real — todas pasan por
       router.js:_closeSidebarMobile), el panel se resetea con él.
       En escritorio el sidebar nunca lleva la clase 'open' (siempre
       está visible por CSS), así que ahí este observer no hace nada. */
    new MutationObserver(() => {
      if (_isDesktop()) return;
      if (!_sidebar.classList.contains('open') && _level > 0) _close();
    }).observe(_sidebar, { attributes: true, attributeFilter: ['class'] });

    /* Reacomodar el panel (o su ausencia) si el usuario rota el
       dispositivo o cambia el tamaño de la ventana mientras está
       abierto — sin esto, cruzar el umbral de 1024px con el panel
       abierto podría dejarlo en el modo visual equivocado. */
    window.addEventListener('resize', () => { if (_level > 0) _show(); });

    /* Resalte inicial + en cada cambio real de contenido (mismo
       patrón de MutationObserver que ya usa js/shared/support.js
       sobre #content, para no depender de tocar router.js). */
    _syncActiveScience();
    if (_content) new MutationObserver(_syncActiveScience).observe(_content, { childList: true });
  }

  init();

  return { close: _close };
})();
