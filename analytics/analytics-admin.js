/* ================================================================
   MQC Analytics — analytics-admin.js
   ================================================================
   Panel de solo lectura para el docente autorizado. Se autentica con
   Supabase Auth (email + contraseña reales, creados por vos desde el
   Dashboard de Supabase — ver README_ANALYTICS_SETUP.md). El acceso
   real de datos lo decide Row Level Security en la base de datos
   (tabla `admins` + función is_admin(), ver SUPABASE_SCHEMA.sql) — 
   este archivo NO es la barrera de seguridad, es solo la interfaz;
   la barrera real vive en Postgres.

   No usa el SDK de supabase-js a propósito (menos dependencias): habla
   directo con las APIs REST de Supabase (PostgREST + GoTrue) vía fetch.
================================================================ */
(function () {
  'use strict';

  const SESSION_KEY = 'mqc_analytics_admin_session_v1'; // sessionStorage — se pierde al cerrar la pestaña/navegador

  let _session = null;   // { access_token, user } | null
  let _vista = 'resumen';
  let _datos = null;     // cache de las vistas ya cargadas
  let _filtros = { grado: 'todos', grupo: 'todos', estado: 'todos', busqueda: '', mostrarEliminados: false, actividad: 'no_archivados', rol: 'todos' };
  let _ordenSeguimiento = { campo: 'alias', asc: true };
  let _ordenSeccion = { campo: 'grupo', asc: true };
  let _ordenItems = { campo: 'pct_error', asc: false };

  const root = () => document.getElementById('mqc-an-root');

  function _cfg() {
    return (typeof window.MQC_ANALYTICS_CONFIG === 'object' && window.MQC_ANALYTICS_CONFIG) || {};
  }

  function _esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ================================================================
     SESIÓN
     ================================================================ */
  function _cargarSesion() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function _guardarSesion(s) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function _borrarSesion() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  /* ================================================================
     LLAMADAS A SUPABASE (REST directo, sin SDK)
     ================================================================ */
  async function _restGet(pathConQuery) {
    const cfg = _cfg();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/' + pathConQuery;
    const resp = await fetch(url, {
      headers: {
        'apikey': cfg.supabaseAnonKey,
        'Authorization': 'Bearer ' + (_session ? _session.access_token : cfg.supabaseAnonKey)
      }
    });
    if (!resp.ok) throw new Error('Error consultando ' + pathConQuery + ' (HTTP ' + resp.status + ')');
    return resp.json();
  }

  async function _login(email, password) {
    const cfg = _cfg();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/auth/v1/token?grant_type=password';
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': cfg.supabaseAnonKey },
      body: JSON.stringify({ email: email, password: password })
    });
    const body = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      throw new Error(body.error_description || body.msg || 'Credenciales inválidas.');
    }
    return { access_token: body.access_token, user: body.user };
  }

  async function _verificarEsAdmin() {
    // Gracias a la policy admins_select_self, esta consulta solo puede
    // devolver la propia fila del usuario autenticado (o ninguna).
    const filas = await _restGet('admins?select=email');
    return filas.length > 0;
  }

  /* ================================================================
     CARGA DE DATOS (vistas de solo lectura)
     ================================================================ */
  async function _cargarTodosLosDatos() {
    const [seguimiento, porSeccion, porCiencia, items, distribucion, pneAttemptsCrudo, panoramaColegios] = await Promise.all([
      _restGet('v_seguimiento_academico?select=*'),
      _restGet('v_resultados_por_seccion?select=*'),
      _restGet('v_rendimiento_por_ciencia?select=*'),
      _restGet('v_analisis_items?select=*'),
      _restGet('v_distribucion_opciones?select=*'),
      _restGet('pne_attempts?select=nota_pne,aprobado,grupo,fecha'),
      _restGet('v_panorama_colegios?select=*')
    ]);
    _datos = { seguimiento, porSeccion, porCiencia, items, distribucion, pneAttemptsCrudo, panoramaColegios };
  }

  /* HOTFIX CATÁLOGO DE COLEGIOS — Parte 9: perfiles legacy sin
     school_id, para la herramienta "Gestión de Colegios". Se carga
     aparte (no en el Promise.all principal) porque solo hace falta
     al abrir esa pestaña específica. */
  async function _cargarColegiosLegacy() {
    // CORRECCIÓN: antes consultaba la tabla `students` cruda (que
    // guarda una fila por cada evento, no una por perfil, y cuyo
    // school_id nunca se actualiza después de "Unificar" — por diseño,
    // esa tabla es de solo inserción). Eso hacía que un mismo perfil
    // apareciera contado varias veces, y que un colegio ya unificado
    // siguiera apareciendo en la lista para siempre. La vista
    // v_students_latest sí tiene una fila por perfil (la más
    // reciente) y sí refleja school_id_efectivo (colegio propio O
    // resuelto por school_alias_map) — por eso hay que consultar esa
    // vista, no la tabla cruda.
    return _restGet('v_students_latest?select=colegio&school_id_efectivo=is.null&colegio=not.is.null');
  }

  /* ================================================================
     RENDER — GATE (acceso restringido / login)
     ================================================================ */
  function _renderGate(mensajeError, notaExtra) {
    root().innerHTML = `
      <div class="an-gate">
        <div class="an-gate-card">
          <div class="an-lock">🔒</div>
          <h1>ACCESO RESTRINGIDO</h1>
          <p>MQC Analytics — panel privado del docente.</p>
          <input type="email" id="an-email" class="an-input" placeholder="Correo electrónico" autocomplete="username">
          <input type="password" id="an-pass" class="an-input" placeholder="Contraseña" autocomplete="current-password">
          <p class="an-error">${_esc(mensajeError || '')}</p>
          <button id="an-login-btn" class="an-btn an-btn-primary">Iniciar sesión</button>
          ${notaExtra ? `<p class="an-hint">${notaExtra}</p>` : ''}
        </div>
      </div>`;
    document.getElementById('an-login-btn').addEventListener('click', _intentarLogin);
    document.getElementById('an-pass').addEventListener('keydown', e => { if (e.key === 'Enter') _intentarLogin(); });
  }

  async function _intentarLogin() {
    const email = document.getElementById('an-email').value.trim();
    const pass = document.getElementById('an-pass').value;
    const btn = document.getElementById('an-login-btn');
    btn.textContent = 'Verificando…'; btn.disabled = true;
    try {
      const cfg = _cfg();
      if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) {
        _renderGate('MQC Analytics todavía no está configurado (falta supabaseUrl/anonKey). Ver README_ANALYTICS_SETUP.md.');
        return;
      }
      const sesion = await _login(email, pass);
      _session = sesion;
      const esAdmin = await _verificarEsAdmin();
      if (!esAdmin) {
        _session = null;
        _renderGate('Tu cuenta inició sesión correctamente, pero no tiene permisos de administrador en MQC Analytics.',
          'Pedile a quien administra la base de datos que agregue tu usuario a la tabla "admins" (ver SUPABASE_SCHEMA.sql, sección 9).');
        return;
      }
      _guardarSesion(_session);
      await _cargarTodosLosDatos();
      _vista = 'resumen';
      _renderPanel();
    } catch (e) {
      _renderGate(e.message || 'No se pudo iniciar sesión.');
    }
  }

  function _cerrarSesion() {
    _session = null; _datos = null; _borrarSesion();
    _renderGate();
  }

  /* ================================================================
     RENDER — SHELL DEL PANEL
     ================================================================ */
  function _renderPanel() {
    const email = (_session && _session.user && _session.user.email) || '';
    root().innerHTML = `
      <div class="an-shell">
        <div class="an-topbar">
          <div>
            <h1>📊 MQC Analytics</h1>
            <div class="an-sub">Sesión: ${_esc(email)}</div>
          </div>
          <button id="an-logout" class="an-btn an-btn-ghost an-btn-sm">Cerrar sesión</button>
        </div>
        <div class="an-tabs">
          <button class="an-tab" data-tab="resumen">Resumen</button>
          <button class="an-tab" data-tab="panorama">🏫 Panorama Global</button>
          <button class="an-tab" data-tab="colegios">🗂️ Gestión de Colegios</button>
          <button class="an-tab" data-tab="seguimiento">Seguimiento académico</button>
          <button class="an-tab" data-tab="pne">PNE 11.º — Analítica</button>
          <button class="an-tab" data-tab="items">Análisis de ítems</button>
        </div>
        <div id="an-contenido"></div>
      </div>`;
    document.getElementById('an-logout').addEventListener('click', _cerrarSesion);
    document.querySelectorAll('.an-tab').forEach(b => b.addEventListener('click', () => { _vista = b.getAttribute('data-tab'); _renderVista(); }));
    _renderVista();
  }

  function _renderVista() {
    document.querySelectorAll('.an-tab').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === _vista));
    const cont = document.getElementById('an-contenido');
    if (_vista === 'resumen') cont.innerHTML = _htmlResumen();
    else if (_vista === 'panorama') cont.innerHTML = _htmlPanorama();
    else if (_vista === 'colegios') {
      cont.innerHTML = _htmlColegios();
      if (_colegiosLegacy === null) {
        _cargarColegiosLegacy().then(r => { _colegiosLegacy = r; if (_vista === 'colegios') { cont.innerHTML = _htmlColegios(); _bindColegios(); } });
      } else {
        _bindColegios();
      }
    }
    else if (_vista === 'seguimiento') { cont.innerHTML = _htmlSeguimiento(); _bindSeguimiento(); }
    else if (_vista === 'pne') { cont.innerHTML = _htmlPNE(); _bindOrdenTabla('an-tabla-seccion', _ordenSeccion, _htmlFilasSeccion); }
    else if (_vista === 'items') { cont.innerHTML = _htmlItems(); _bindItems(); }
  }

  /* ================================================================
     SECCIÓN: GESTIÓN DE COLEGIOS (Parte 9 del hotfix de catálogo)
     ================================================================
     Lista los nombres de colegio LEGACY (sin school_id) con su
     conteo de perfiles, y permite "Unificar con →" un colegio real
     del catálogo — esto escribe en school_alias_map (protegida, solo
     admin), sin tocar ningún dato académico de los perfiles.
     ================================================================ */
  let _colegiosLegacy = null;

  function _htmlColegios() {
    if (_colegiosLegacy === null) {
      return `<div class="an-empty">Cargando nombres de colegio pendientes de unificar…</div>`;
    }
    if (!_colegiosLegacy.length) {
      return `<div class="an-empty">✅ No hay colegios legacy pendientes de unificar — todos los perfiles ya tienen un centro educativo del catálogo.</div>`;
    }
    // Agrupar client-side por texto de colegio (case/espacios ya
    // vienen tal cual del estudiante — la unificación real ocurre acá).
    const conteos = {};
    _colegiosLegacy.forEach(r => {
      const nombre = (r.colegio || '').trim();
      if (!nombre) return;
      conteos[nombre] = (conteos[nombre] || 0) + 1;
    });
    const filas = Object.keys(conteos).sort((a, b) => conteos[b] - conteos[a]);
    const catalogo = (typeof CATALOGO_COLEGIOS !== 'undefined' ? CATALOGO_COLEGIOS.slice() : [])
      .sort((a, b) => a.school_name.localeCompare(b.school_name, 'es'));
    return `
      <h2 class="an-section-title">🗂️ Gestión de Colegios</h2>
      <p class="an-note" style="margin-bottom:1rem">Nombres de colegio escritos antes de que existiera el catálogo. Unificalos con el centro educativo real para que dejen de aparecer separados en Panorama Global.</p>
      <div class="an-table-wrap"><table class="an-table">
        <thead><tr><th>Nombre legacy</th><th>Perfiles</th><th>Unificar con →</th></tr></thead>
        <tbody>${filas.map(nombre => `
          <tr>
            <td>${_esc(nombre)}</td>
            <td>${conteos[nombre]}</td>
            <td>
              <select data-unificar-select="${_esc(nombre)}" style="margin-right:.4rem">
                <option value="">— Elegir colegio —</option>
                ${catalogo.map(c => `<option value="${c.school_id}">${_esc(c.school_name)}</option>`).join('')}
              </select>
              <button class="btn btn-primary btn-sm" data-unificar-btn="${_esc(nombre)}">Unificar</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table></div>`;
  }

  async function _unificarColegio(nombreLegacy, schoolId) {
    const colegio = (typeof buscarColegioPorId === 'function') ? buscarColegioPorId(schoolId) : null;
    if (!colegio) return;
    const cfg = _cfg();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/school_alias_map';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.supabaseAnonKey,
        'Authorization': 'Bearer ' + (_session && _session.access_token || cfg.supabaseAnonKey),
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        alias_normalizado: nombreLegacy.toLowerCase().trim().replace(/\s+/g, ' '),
        school_id: colegio.school_id,
        school_name: colegio.school_name,
        school_region: colegio.school_region
      })
    });
    _colegiosLegacy = await _cargarColegiosLegacy();
    await _cargarTodosLosDatos(); // refresca Panorama Global con la nueva unificación
    document.getElementById('an-contenido').innerHTML = _htmlColegios();
    _bindColegios();
  }

  function _bindColegios() {
    document.querySelectorAll('[data-unificar-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nombre = btn.getAttribute('data-unificar-btn');
        const select = document.querySelector(`[data-unificar-select="${CSS.escape(nombre)}"]`);
        const schoolId = select ? select.value : '';
        if (!schoolId) { alert('Elegí primero el colegio real con el que querés unificar.'); return; }
        if (confirm(`¿Unificar "${nombre}" con el colegio elegido? Esto no borra ningún dato, solo corrige la agrupación en Panorama Global.`)) {
          _unificarColegio(nombre, schoolId);
        }
      });
    });
  }

  /* ================================================================
     SECCIÓN: PANORAMA GLOBAL (Colegio + Docente)
     ================================================================ */
  function _htmlPanorama() {
    const filas = (_datos.panoramaColegios || []).slice();
    if (!filas.length) return `<div class="an-empty">Todavía no hay datos de colegio registrados.</div>`;
    return `
      <h2 class="an-section-title">🏫 Panorama Global — por colegio</h2>
      <div class="an-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem">
        ${filas.map(f => `
          <div class="an-card" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:12px;padding:1.1rem">
            <h3 style="margin:0 0 .6rem;font-size:.95rem">${f.colegio === 'Sin colegio (legacy)' ? '❔' : '🏫'} ${_esc(f.colegio)}</h3>
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.4rem;color:var(--text-secondary)"><span>Estudiantes</span><strong style="color:var(--cyan)">${f.estudiantes}</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.4rem;color:var(--text-secondary)"><span>Docentes</span><strong style="color:var(--violet)">${f.docentes}</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.4rem;color:var(--text-secondary)"><span>PNE realizadas</span><strong>${f.pne_realizadas}</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-secondary)"><span>Tasa aprobación PNE</span><strong>${f.tasa_aprobacion_pne == null ? '—' : f.tasa_aprobacion_pne + '%'}</strong></div>
          </div>`).join('')}
      </div>
      <p class="an-note" style="margin-top:1rem">Los perfiles archivados y eliminados no se incluyen en estos números. "Sin colegio (legacy)" son perfiles creados antes de que este campo existiera.</p>`;
  }

  /* ================================================================
     SECCIÓN: RESUMEN (Sección 17)
     ================================================================ */
  function _htmlResumen() {
    // SPRINT ANALYTICS — PARTE 15: "perfiles registrados" = no eliminados,
    // no archivados, Y no docentes (los docentes se cuentan en Panorama
    // Global, no en las estadísticas académicas de estudiantes).
    const s = _datos.seguimiento.filter(x => !x.eliminado && !x.archived && x.rol !== 'docente');
    const docentesCount = _datos.seguimiento.filter(x => x.rol === 'docente' && !x.eliminado && !x.archived).length;
    const archivadosCount = _datos.seguimiento.filter(x => x.archived && !x.eliminado).length;
    const idsExcluidos = new Set(_datos.seguimiento.filter(x => x.eliminado || x.archived || x.rol === 'docente').map(x => x.profile_id));
    const ps = _datos.porSeccion;
    const pa = _datos.pneAttemptsCrudo.filter(x => !idsExcluidos.has(x.profile_id)); // Parte 15: PNE también excluye archivados/eliminados
    const perfiles = s.length;
    const conActividad = s.filter(x => x.examenes_10_aprobados > 0 || x.examenes_11_aprobados > 0 || x.pne_intentos > 0).length;
    const examenesAprobados = s.reduce((acc, x) => acc + (x.examenes_10_aprobados || 0) + (x.examenes_11_aprobados || 0), 0);
    const pneRealizadas = pa.length;
    const pneAprobadas = pa.filter(x => x.aprobado).length;
    const tasaPNE = pneRealizadas ? Math.round(100 * pneAprobadas / pneRealizadas) : null;
    const promedioPNE = pneRealizadas ? Math.round((pa.reduce((a, x) => a + Number(x.nota_pne), 0) / pneRealizadas) * 10) / 10 : null;
    const seccionesConDatos = ps.filter(x => x.promedio_pne !== null);
    const mejorGrupo = seccionesConDatos.slice().sort((a, b) => b.promedio_pne - a.promedio_pne)[0];
    const peorGrupo = seccionesConDatos.slice().sort((a, b) => a.promedio_pne - b.promedio_pne)[0];

    return `
      <h2 class="an-section-title">Centro de Inteligencia Académica MQC</h2>
      <div class="an-cards">
        ${_card('Perfiles registrados', perfiles)}
        ${_card('Usuarios con actividad', conActividad)}
        ${_card('Exámenes aprobados', examenesAprobados, '10.º + 11.º')}
        ${_card('PNE realizadas', pneRealizadas)}
        ${_card('Tasa PNE de aprobación', tasaPNE === null ? '—' : tasaPNE + '%')}
        ${_card('Promedio PNE', promedioPNE === null ? '—' : promedioPNE + '%')}
        ${_card('Grupo con mejor promedio', mejorGrupo ? mejorGrupo.grupo : '—', mejorGrupo ? mejorGrupo.promedio_pne + '% PNE' : '')}
        ${_card('Grupo que requiere refuerzo', peorGrupo ? peorGrupo.grupo : '—', peorGrupo ? peorGrupo.promedio_pne + '% PNE' : '')}
      </div>
      <p class="an-note">Los promedios de grupo solo consideran grupos con al menos un intento de PNE registrado.${archivadosCount ? ` · 📦 Archivados: ${archivadosCount} (no incluidos arriba)` : ''}${docentesCount ? ` · 👩‍🏫 Docentes: ${docentesCount} (ver Panorama Global)` : ''}</p>`;
  }

  function _card(label, value, sub) {
    return `<div class="an-card"><div class="an-card-label">${_esc(label)}</div><div class="an-card-value">${_esc(value)}</div>${sub ? `<div class="an-card-sub">${_esc(sub)}</div>` : ''}</div>`;
  }

  /* ================================================================
     SECCIÓN: SEGUIMIENTO ACADÉMICO (Secciones 5-6)
     ================================================================ */
  function _gruposDisponibles() {
    const set = new Set(_datos.seguimiento.map(x => x.grupo || 'Grupo pendiente'));
    return ['todos'].concat([...set].sort());
  }

  const DIAS_INACTIVO = 30; // Parte 8: umbral configurable de "sin actividad"

  function _estadoActividad(x) {
    if (x.archived) return 'archivado';
    if (!x.last_seen_at) return 'inactivo'; // nunca registró una sesión — se trata como inactivo, no se asume actividad
    const dias = (Date.now() - new Date(x.last_seen_at).getTime()) / 86400000;
    return dias > DIAS_INACTIVO ? 'inactivo' : 'activo';
  }

  function _filasSeguimientoFiltradas() {
    let filas = _datos.seguimiento.slice();
    const f = _filtros;
    if (!f.mostrarEliminados) filas = filas.filter(x => !x.eliminado);
    // Parte 15: "perfiles registrados" = no archivados, por defecto.
    if (f.actividad === 'todos') { /* no filtra por estado de actividad */ }
    else if (f.actividad === 'archivados') filas = filas.filter(x => _estadoActividad(x) === 'archivado');
    else if (f.actividad === 'activos') filas = filas.filter(x => _estadoActividad(x) === 'activo');
    else if (f.actividad === 'inactivos') filas = filas.filter(x => _estadoActividad(x) === 'inactivo');
    else filas = filas.filter(x => !x.archived); // default: 'no_archivados' — activos + inactivos
    // Tipo de perfil: por defecto se ven ambos (estudiantes + docentes).
    if (f.rol === 'estudiante') filas = filas.filter(x => (x.rol || 'estudiante') !== 'docente');
    if (f.rol === 'docente') filas = filas.filter(x => x.rol === 'docente');
    // "Grado" = en qué grupo está matriculado AHORA (10-X / 11-X), no qué
    // exámenes ya aprobó — eso es un concepto distinto, ya cubierto por el
    // filtro "10.º completo (9/9)" / "11.º completo (4/4)" en "Todos los estados".
    if (f.grado === '10') filas = filas.filter(x => (x.grupo || '').startsWith('10-'));
    if (f.grado === '11') filas = filas.filter(x => (x.grupo || '').startsWith('11-'));
    if (f.grupo !== 'todos') filas = filas.filter(x => (x.grupo || 'Grupo pendiente') === f.grupo);
    if (f.estado === 'pne_aprobada') filas = filas.filter(x => x.pne_aprobada);
    if (f.estado === 'pne_pendiente') filas = filas.filter(x => !x.pne_aprobada);
    if (f.estado === '10_completo') filas = filas.filter(x => x.examenes_10_aprobados >= 9);
    if (f.estado === '11_completo') filas = filas.filter(x => x.examenes_11_aprobados >= 4);
    if (f.busqueda) {
      const q = f.busqueda.toLowerCase();
      filas = filas.filter(x => (x.alias || '').toLowerCase().includes(q));
    }
    const campo = _ordenSeguimiento.campo, asc = _ordenSeguimiento.asc ? 1 : -1;
    filas.sort((a, b) => {
      const va = a[campo], vb = b[campo];
      if (va == null) return 1; if (vb == null) return -1;
      return va > vb ? asc : va < vb ? -asc : 0;
    });
    return filas;
  }

  function _htmlSeguimiento() {
    return `
      <h2 class="an-section-title">Seguimiento académico</h2>
      <div class="an-filters">
        <select id="an-f-grado"><option value="todos">Todos los grados</option><option value="10">10.º</option><option value="11">11.º</option></select>
        <select id="an-f-grupo">${_gruposDisponibles().map(g => `<option value="${_esc(g)}">${g === 'todos' ? 'Todos los grupos' : _esc(g)}</option>`).join('')}</select>
        <select id="an-f-estado">
          <option value="todos">Todos los estados</option>
          <option value="pne_aprobada">PNE aprobada</option>
          <option value="pne_pendiente">PNE pendiente</option>
          <option value="10_completo">10.º completo (9/9)</option>
          <option value="11_completo">11.º completo (4/4)</option>
        </select>
        <select id="an-f-actividad">
          <option value="no_archivados">Activos + Inactivos</option>
          <option value="activos">Solo activos</option>
          <option value="inactivos">Solo inactivos</option>
          <option value="archivados">Archivados</option>
          <option value="todos">Todos (incluye archivados)</option>
        </select>
        <select id="an-f-rol">
          <option value="todos">Estudiantes + Docentes</option>
          <option value="estudiante">Solo estudiantes</option>
          <option value="docente">Solo docentes</option>
        </select>
        <input type="text" id="an-f-busqueda" placeholder="Buscar por nombre…">
        <label class="an-checkbox-label" style="display:flex;align-items:center;gap:.35rem;font-size:.82rem;color:var(--text-muted)">
          <input type="checkbox" id="an-f-eliminados">
          🗑️ Mostrar eliminados
        </label>
      </div>
      <div id="an-tabla-seguimiento-wrap"></div>`;
  }

  function _pillEstadoActividad(estado) {
    if (estado === 'archivado') return '<span class="an-pill an-pill-muted">📦 Archivado</span>';
    if (estado === 'inactivo') return '<span class="an-pill an-pill-gold">💤 Inactivo</span>';
    return '<span class="an-pill an-pill-green">Activo</span>';
  }

  function _filasHtmlSeguimiento() {
    const filas = _filasSeguimientoFiltradas();
    if (!filas.length) return `<div class="an-empty">Ningún estudiante coincide con estos filtros.</div>`;
    const verEliminados = _filtros.mostrarEliminados;
    return `
      <div class="an-table-wrap"><table class="an-table">
        <thead><tr>
          <th data-sort="alias">Estudiante</th><th>Tipo</th><th data-sort="grupo">Grupo</th><th>Colegio</th>
          <th>Estado</th>
          <th data-sort="examenes_10_aprobados">Exámenes 10.º</th><th data-sort="examenes_11_aprobados">Exámenes 11.º</th>
          <th data-sort="pne_aprobada">PNE 11.º</th><th data-sort="pne_mejor_nota">Mejor PNE</th><th data-sort="pne_intentos">Intentos</th>
          <th>Acciones</th>
          ${verEliminados ? '<th>Eliminado</th><th>Profile ID</th>' : ''}
        </tr></thead>
        <tbody>${filas.map(x => {
          const estado = _estadoActividad(x);
          const esDocente = x.rol === 'docente';
          return `
          <tr${x.eliminado ? ' style="opacity:.55"' : ''}>
            <td>${_esc(x.alias)}</td>
            <td>${esDocente ? '<span class="an-pill" style="background:rgba(123,47,255,.18);color:#c9a8ff">👩‍🏫 Docente</span>' : '<span class="an-pill an-pill-muted">🎓 Estudiante</span>'}</td>
            <td>${x.grupo ? _esc(x.grupo) : (esDocente ? '—' : '<span class="an-pill an-pill-gold">Grupo pendiente</span>')}</td>
            <td>${x.colegio ? _esc(x.colegio) : '<span class="an-pill an-pill-muted">Sin colegio</span>'}</td>
            <td>${_pillEstadoActividad(estado)}${x.colaborador ? ' <span class="an-pill" style="background:rgba(249,255,77,.15);color:var(--xp-gold,#F9FF4D)">💙 Apoyando</span>' : ''}</td>
            <td>${esDocente ? '—' : `${x.examenes_10_aprobados} / 9`}</td>
            <td>${esDocente ? '—' : `${x.examenes_11_aprobados} / 4`}</td>
            <td>${esDocente ? '—' : (x.pne_intentos === 0 ? '<span class="an-pill an-pill-muted">No realizada</span>' : x.pne_aprobada ? '<span class="an-pill an-pill-green">Aprobada</span>' : '<span class="an-pill an-pill-red">No aprobada</span>')}</td>
            <td>${esDocente ? '—' : (x.pne_mejor_nota == null ? '—' : Number(x.pne_mejor_nota).toFixed(1) + '%')}</td>
            <td>${esDocente ? '—' : x.pne_intentos}</td>
            <td style="display:flex;gap:.35rem;flex-wrap:wrap">
              ${x.archived
                ? `<button class="btn btn-ghost btn-sm" data-restaurar="${_esc(x.profile_id)}">↺ Restaurar</button>`
                : `<button class="btn btn-ghost btn-sm" data-archivar="${_esc(x.profile_id)}">📦 Archivar</button>`}
              ${x.colaborador
                ? `<button class="btn btn-ghost btn-sm" data-quitar-colaborador="${_esc(x.profile_id)}" style="color:var(--xp-gold,#F9FF4D)">💙 Quitar apoyo</button>`
                : `<button class="btn btn-ghost btn-sm" data-colaborador="${_esc(x.profile_id)}">💙 Marcar como Apoyando</button>`}
            </td>
            ${verEliminados ? `<td>${x.eliminado ? '<span class="an-pill an-pill-red">🗑️ Sí</span>' : '—'}</td><td style="font-family:var(--font-code);font-size:.75rem">${_esc(x.profile_id)}</td>` : ''}
          </tr>`; }).join('')}
        </tbody>
      </table></div>
      ${verEliminados ? '<p style="font-size:.75rem;color:var(--text-muted);margin-top:.5rem">Los profile_id de los perfiles eliminados son los que podés limpiar de Supabase — ver SUPABASE_MIGRATION_profile_deletions.sql, Sección 4.</p>' : ''}`;
  }

  /* SPRINT ANALYTICS — PARTE 9, 10, 16: archivar/restaurar. Escribe
     directamente en profile_admin_state vía REST — esta tabla SOLO
     acepta escrituras de un admin autenticado (RLS, ver la migración),
     nunca de un estudiante (rol anon no tiene ninguna policy ahí). */
  async function _archivarPerfil(profileId, archivar) {
    const cfg = _cfg();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/profile_admin_state';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.supabaseAnonKey,
        'Authorization': 'Bearer ' + (_session && _session.access_token || cfg.supabaseAnonKey),
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        profile_id: profileId,
        archived: archivar,
        archived_at: archivar ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
    });
    await _cargarTodosLosDatos();
    document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
    _bindAccionesSeguimiento();
    _bindOrdenSeguimientoHeaders();
  }

  /* Apoya MQC: marcar/desmarcar colaborador (PayPal o SINPE, confirmado
     a mano por el docente). Mismo mecanismo de seguridad que archivar —
     solo el admin autenticado puede escribir en profile_admin_state. */
  async function _marcarColaborador(profileId, esColaborador) {
    const cfg = _cfg();
    const url = cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/profile_admin_state';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.supabaseAnonKey,
        'Authorization': 'Bearer ' + (_session && _session.access_token || cfg.supabaseAnonKey),
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        profile_id: profileId,
        colaborador: esColaborador,
        colaborador_desde: esColaborador ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
    });
    await _cargarTodosLosDatos();
    document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
    _bindAccionesSeguimiento();
    _bindOrdenSeguimientoHeaders();
  }

  function _bindAccionesSeguimiento() {
    document.querySelectorAll('[data-archivar]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('¿Archivar este perfil? No aparecerá en el seguimiento por defecto, pero conserva todos sus datos. Solo un admin puede restaurarlo.')) {
          _archivarPerfil(btn.getAttribute('data-archivar'), true);
        }
      });
    });
    document.querySelectorAll('[data-restaurar]').forEach(btn => {
      btn.addEventListener('click', () => _archivarPerfil(btn.getAttribute('data-restaurar'), false));
    });
    document.querySelectorAll('[data-colaborador]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('¿Marcar este perfil como "Apoyando MQC"? Confirmá esto solo después de verificar el pago (PayPal o SINPE) vos mismo.')) {
          _marcarColaborador(btn.getAttribute('data-colaborador'), true);
        }
      });
    });
    document.querySelectorAll('[data-quitar-colaborador]').forEach(btn => {
      btn.addEventListener('click', () => _marcarColaborador(btn.getAttribute('data-quitar-colaborador'), false));
    });
  }

  function _bindSeguimiento() {
    document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
    ['an-f-grado', 'an-f-grupo', 'an-f-estado', 'an-f-actividad', 'an-f-rol'].forEach(id => {
      document.getElementById(id).addEventListener('change', (e) => {
        const key = id === 'an-f-grado' ? 'grado' : id === 'an-f-grupo' ? 'grupo' : id === 'an-f-estado' ? 'estado' : id === 'an-f-actividad' ? 'actividad' : 'rol';
        _filtros[key] = e.target.value;
        document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
        _bindAccionesSeguimiento();
        _bindOrdenSeguimientoHeaders();
      });
    });
    document.getElementById('an-f-busqueda').addEventListener('input', (e) => {
      _filtros.busqueda = e.target.value;
      document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
      _bindAccionesSeguimiento();
      _bindOrdenSeguimientoHeaders();
    });
    document.getElementById('an-f-eliminados').addEventListener('change', (e) => {
      _filtros.mostrarEliminados = !!e.target.checked;
      document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
      _bindAccionesSeguimiento();
      _bindOrdenSeguimientoHeaders();
    });
    _bindAccionesSeguimiento();
    _bindOrdenSeguimientoHeaders();
  }

  function _bindOrdenSeguimientoHeaders() {
    document.querySelectorAll('#an-tabla-seguimiento-wrap th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const campo = th.getAttribute('data-sort');
        _ordenSeguimiento.asc = (_ordenSeguimiento.campo === campo) ? !_ordenSeguimiento.asc : true;
        _ordenSeguimiento.campo = campo;
        document.getElementById('an-tabla-seguimiento-wrap').innerHTML = _filasHtmlSeguimiento();
        _bindOrdenSeguimientoHeaders();
      });
    });
  }

  /* ================================================================
     SECCIÓN: PNE 11.º — ANALÍTICA (Secciones 7-9)
     ================================================================ */
  function _htmlPNE() {
    const pa = _datos.pneAttemptsCrudo;
    const total = pa.length;
    const aprobados = pa.filter(x => x.aprobado).length;
    const noAprobados = total - aprobados;
    const tasa = total ? Math.round(100 * aprobados / total) : null;
    const promedio = total ? (pa.reduce((a, x) => a + Number(x.nota_pne), 0) / total) : null;
    const mejor = total ? Math.max(...pa.map(x => Number(x.nota_pne))) : null;
    const estudiantesConPNE = new Set(_datos.seguimiento.filter(x => x.pne_intentos > 0).map(x => x.profile_id)).size;

    return `
      <h2 class="an-section-title">PNE 11.º — Analítica</h2>
      <div class="an-cards">
        ${_card('Estudiantes que realizaron PNE', estudiantesConPNE)}
        ${_card('Intentos totales', total)}
        ${_card('Intentos aprobados', aprobados)}
        ${_card('Intentos no aprobados', noAprobados)}
        ${_card('Tasa de aprobación', tasa === null ? '—' : tasa + '%')}
        ${_card('Promedio PNE', promedio === null ? '—' : promedio.toFixed(1) + '%')}
        ${_card('Mejor resultado', mejor === null ? '—' : mejor.toFixed(1) + '%')}
      </div>

      <h3 class="an-section-title">Rendimiento por ciencia</h3>
      ${_htmlBarrasCiencia()}

      <h3 class="an-section-title">Resultados por sección</h3>
      <div id="an-tabla-seccion-wrap"></div>`;
  }

  function _htmlBarrasCiencia() {
    const pc = _datos.porCiencia;
    if (!pc.length) return `<div class="an-empty">Todavía no hay intentos de PNE registrados.</div>`;
    const globalBio = _promedioCol(pc, 'biologia_pct'), globalFis = _promedioCol(pc, 'fisica_pct'), globalQui = _promedioCol(pc, 'quimica_pct');
    let html = `<div class="an-barchart">`;
    html += _filaBarra('Biología (global)', globalBio);
    html += _filaBarra('Física (global)', globalFis);
    html += _filaBarra('Química (global)', globalQui);
    html += `</div><p class="an-note">Por grupo:</p><div class="an-barchart">`;
    pc.forEach(g => {
      html += `<div style="margin-bottom:.4rem"><strong style="font-size:.82rem">${_esc(g.grupo)}</strong></div>`;
      html += _filaBarra('Biología', g.biologia_pct);
      html += _filaBarra('Física', g.fisica_pct);
      html += _filaBarra('Química', g.quimica_pct);
    });
    html += `</div>`;
    return html;
  }
  function _promedioCol(arr, col) {
    const vals = arr.map(x => Number(x[col])).filter(v => !isNaN(v));
    return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
  }
  function _filaBarra(etiqueta, pct) {
    return `<div class="an-bar-row"><span>${_esc(etiqueta)}</span><div class="an-bar-track"><div class="an-bar-fill" style="width:${Math.min(100, pct)}%"></div></div><span>${pct}%</span></div>`;
  }

  function _htmlFilasSeccion() {
    const filas = _datos.porSeccion.slice();
    const campo = _ordenSeccion.campo, asc = _ordenSeccion.asc ? 1 : -1;
    filas.sort((a, b) => { const va = a[campo], vb = b[campo]; if (va == null) return 1; if (vb == null) return -1; return va > vb ? asc : va < vb ? -asc : 0; });
    if (!filas.length) return `<div class="an-empty">Todavía no hay datos por sección.</div>`;
    return `
      <div class="an-table-wrap"><table class="an-table" id="an-tabla-seccion">
        <thead><tr>
          <th data-sort="grupo">Grupo</th><th data-sort="estudiantes">Estudiantes</th><th data-sort="intentos">Intentos</th>
          <th data-sort="aprobados">Aprobados</th><th data-sort="no_aprobados">No aprobados</th>
          <th data-sort="pct_aprobacion">% Aprobación</th><th data-sort="promedio_pne">Promedio</th>
        </tr></thead>
        <tbody>${filas.map(x => `
          <tr><td>${_esc(x.grupo)}</td><td>${x.estudiantes}</td><td>${x.intentos}</td><td>${x.aprobados}</td><td>${x.no_aprobados}</td>
          <td>${x.pct_aprobacion == null ? '—' : x.pct_aprobacion + '%'}</td><td>${x.promedio_pne == null ? '—' : Number(x.promedio_pne).toFixed(1) + '%'}</td></tr>`).join('')}
        </tbody>
      </table></div>`;
  }

  function _bindOrdenTabla(tablaId, estadoOrden, fnRenderFilas) {
    document.getElementById('an-tabla-seccion-wrap').innerHTML = fnRenderFilas();
    document.querySelectorAll(`#${tablaId} th[data-sort]`).forEach(th => {
      th.addEventListener('click', () => {
        const campo = th.getAttribute('data-sort');
        estadoOrden.asc = (estadoOrden.campo === campo) ? !estadoOrden.asc : true;
        estadoOrden.campo = campo;
        document.getElementById('an-tabla-seccion-wrap').innerHTML = fnRenderFilas();
        _bindOrdenTabla(tablaId, estadoOrden, fnRenderFilas);
      });
    });
  }

  /* ================================================================
     SECCIÓN: ANÁLISIS DE ÍTEMS (Secciones 10-11)
     ================================================================ */
  const MIN_INTENTOS_REPRESENTATIVO = 5;

  function _htmlItems() {
    return `
      <h2 class="an-section-title">Ítems con mayor dificultad</h2>
      <p class="an-note">Solo se muestran ítems con al menos ${MIN_INTENTOS_REPRESENTATIVO} respuestas registradas (para evitar conclusiones sobre muestras muy pequeñas). Hacé clic en un ítem para ver el detalle.</p>
      <div id="an-tabla-items-wrap"></div>
      <div id="an-modal-item"></div>`;
  }

  function _filasItems() {
    let filas = _datos.items.filter(x => x.intentos >= MIN_INTENTOS_REPRESENTATIVO);
    const campo = _ordenItems.campo, asc = _ordenItems.asc ? 1 : -1;
    filas = filas.slice().sort((a, b) => { const va = a[campo], vb = b[campo]; if (va == null) return 1; if (vb == null) return -1; return va > vb ? asc : va < vb ? -asc : 0; });
    if (!filas.length) return `<div class="an-empty">Todavía no hay suficientes respuestas registradas (mínimo ${MIN_INTENTOS_REPRESENTATIVO} por ítem).</div>`;
    return `
      <div class="an-table-wrap"><table class="an-table" id="an-tabla-items">
        <thead><tr>
          <th data-sort="item_id">Ítem</th><th data-sort="ciencia">Ciencia</th><th data-sort="tema">Tema</th>
          <th data-sort="intentos">Intentos</th><th data-sort="correctas">Correctas</th><th data-sort="incorrectas">Incorrectas</th><th data-sort="pct_error">% Error</th>
        </tr></thead>
        <tbody>${filas.map(x => `
          <tr data-item="${_esc(x.item_id)}">
            <td style="font-family:var(--font-code);font-size:.78rem">${_esc(x.item_id)}</td><td>${_esc(x.ciencia)}</td><td>${_esc(x.tema)}</td>
            <td>${x.intentos}</td><td>${x.correctas}</td><td>${x.incorrectas}</td>
            <td><span class="an-pill ${x.pct_error >= 50 ? 'an-pill-red' : x.pct_error >= 25 ? 'an-pill-gold' : 'an-pill-green'}">${x.pct_error}%</span></td>
          </tr>`).join('')}
        </tbody>
      </table></div>`;
  }

  function _bindItems() {
    document.getElementById('an-tabla-items-wrap').innerHTML = _filasItems();
    document.querySelectorAll('#an-tabla-items th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const campo = th.getAttribute('data-sort');
        _ordenItems.asc = (_ordenItems.campo === campo) ? !_ordenItems.asc : false;
        _ordenItems.campo = campo;
        document.getElementById('an-tabla-items-wrap').innerHTML = _filasItems();
        _bindItems();
      });
    });
    document.querySelectorAll('#an-tabla-items tbody tr').forEach(tr => {
      tr.addEventListener('click', () => _abrirDetalleItem(tr.getAttribute('data-item')));
    });
  }

  function _abrirDetalleItem(itemId) {
    const resumen = _datos.items.find(x => x.item_id === itemId);
    const dist = _datos.distribucion.filter(x => x.item_id === itemId);
    const dominante = dist.slice().sort((a, b) => b.veces_elegida - a.veces_elegida)[0];
    document.getElementById('an-modal-item').innerHTML = `
      <div class="an-modal-backdrop" id="an-modal-backdrop">
        <div class="an-modal">
          <h3 style="margin-bottom:.6rem">${_esc(itemId)}</h3>
          <p class="an-note">${_esc(resumen.ciencia)} · ${_esc(resumen.tema)}</p>
          <p style="font-size:.85rem;margin:.6rem 0">Total de respuestas: <strong>${resumen.intentos}</strong> · % correcto: <strong>${Math.round(100 - resumen.pct_error)}%</strong> · % incorrecto: <strong>${resumen.pct_error}%</strong></p>
          <div class="an-barchart">
            ${dist.map(d => _filaBarra(_traducirOpcion(d.opcion_elegida), d.pct)).join('')}
          </div>
          ${dominante ? `<p class="an-note">Distractor más elegido: <strong>${_traducirOpcion(dominante.opcion_elegida)}</strong> (${dominante.pct}%)</p>` : ''}
          <button class="an-btn an-btn-ghost an-btn-sm" id="an-modal-cerrar" style="margin-top:.8rem">Cerrar</button>
        </div>
      </div>`;
    document.getElementById('an-modal-cerrar').addEventListener('click', () => { document.getElementById('an-modal-item').innerHTML = ''; });
    document.getElementById('an-modal-backdrop').addEventListener('click', (e) => { if (e.target.id === 'an-modal-backdrop') document.getElementById('an-modal-item').innerHTML = ''; });
  }

  function _traducirOpcion(op) {
    if (op === 'originalA') return 'A';
    if (op === 'originalB') return 'B';
    if (op === 'originalC') return 'C';
    if (op === 'mqcD') return 'D';
    return op || '(sin responder)';
  }

  /* ================================================================
     ARRANQUE
     ================================================================ */
  async function _init() {
    const cfg = _cfg();
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      _renderGate('MQC Analytics todavía no está configurado en este sitio.', 'Ver README_ANALYTICS_SETUP.md para completar la configuración.');
      return;
    }
    const sesionGuardada = _cargarSesion();
    if (sesionGuardada && sesionGuardada.access_token) {
      _session = sesionGuardada;
      try {
        const esAdmin = await _verificarEsAdmin();
        if (esAdmin) {
          await _cargarTodosLosDatos();
          _renderPanel();
          return;
        }
      } catch (e) { /* sesión vencida u otro problema — se pide login de nuevo */ }
      _session = null; _borrarSesion();
    }
    _renderGate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _init);
  else _init();
})();
