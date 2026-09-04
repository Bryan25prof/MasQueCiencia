/* ================================================================
   MÁSQUECIENCIA — js/shared/analytics-hooks.js
   ================================================================
   Puente entre el núcleo académico (Storage / MQCProfiles) y
   AnalyticsQueue — SIN modificar ningún archivo del núcleo. La
   técnica: guardar la referencia a la función original y reemplazarla
   por una versión que llama a la original primero (comportamiento
   intacto, valor de retorno intacto) y, después, de forma aislada en
   un try/catch, revisa si ocurrió algo digno de registrar.

   Se carga DESPUÉS de storage.js, profiles.js y simulacro-nacional.js
   en index.html — necesita que esas funciones ya existan para poder
   envolverlas.

   Si Analytics no está habilitado (MQC_ANALYTICS_CONFIG.enabled !==
   true), este archivo igual se ejecuta (es barato) pero
   AnalyticsQueue.push() internamente no hace nada con la red — ver
   analytics-queue.js.
================================================================ */
(function () {
  'use strict';

  function _configLista() {
    return typeof window.AnalyticsQueue !== 'undefined'
        && typeof window.Storage !== 'undefined';
  }

  if (!_configLista()) return; // Analytics no puede engancharse sin sus dependencias — no-op seguro

  /* ================================================================
     1. EXÁMENES DE UNIDAD — Química 10.º y 11.º
     ================================================================ */

  function _envolverExamenes(metodo, grado, claveDatos) {
    const original = Storage[metodo];
    if (typeof original !== 'function') return; // API distinta a la esperada — no romper nada
    Storage[metodo] = function (unitId, update) {
      let bestAntes = 0;
      try {
        const dataAntes = Storage.load();
        bestAntes = (dataAntes[claveDatos] && dataAntes[claveDatos][unitId] && dataAntes[claveDatos][unitId].examBest) || 0;
      } catch (e) { /* ignorar, se sigue con bestAntes=0 */ }

      const resultado = original.call(Storage, unitId, update); // comportamiento original, sin cambios

      try {
        const dataDespues = Storage.load();
        const unidad = dataDespues[claveDatos] && dataDespues[claveDatos][unitId];
        if (unidad && (unidad.examBest || 0) > bestAntes) {
          const meta = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeMeta) ? MQCProfiles.activeMeta() : null;
          const profileId = dataDespues.profileMeta && dataDespues.profileMeta.profileId;
          if (profileId) {
            window.AnalyticsQueue.push('unitExamResults', {
              profile_id: profileId,
              grado: grado,
              unidad: unitId,
              nota: unidad.examBest,
              intentos: unidad.examAttempts || 0
            });
          }
        }
      } catch (e) { /* Analytics nunca debe interrumpir la experiencia académica */ }

      return resultado;
    };
  }

  _envolverExamenes('updateUnit', '10', 'units');
  _envolverExamenes('updateGrade11Unit', '11', 'grade11');

  /* ================================================================
     2. SIMULACRO PNE — un intento finalizado + sus respuestas
     ================================================================
     SPRINT ANALYTICS — PARTE 1 (rediseño, reemplaza el mecanismo
     anterior): el diseño original intentaba detectar "¿esta llamada a
     Storage.set es la entrega final?" comparando un Storage.get()
     ANTES contra el `value` que se está por guardar. En pruebas reales
     controladas (perfil de prueba, Simulacro completo con Chromium)
     se confirmó que esa comparación es frágil — el intento SÍ queda
     guardado correctamente en el historial local, pero el evento de
     Analytics no se generaba nunca (0 eventos en la cola).

     Nuevo enfoque, robusto por diseño: en vez de inferir una
     "transición", simplemente se revisa el CONTENIDO de value.historial
     cada vez que se guarda 'simulacroNacional', y se envía a Analytics
     cualquier intento (identificado por su `fecha`, único por diseño)
     que todavía no se haya enviado antes — sin importar cuántas veces
     se llame a Storage.set ni en qué orden. Se lleva un registro local
     propio y aislado de "fechas ya enviadas" (mismo espíritu que
     SYNCED_KEY más abajo), así que reintentar nunca duplica: si ya se
     envió, se ignora; si no, se envía y se marca. */
  const PNE_ENVIADOS_KEY = 'mqc_analytics_pne_enviados_v1'; // aislado de Storage y de la cola

  function _intentosPNEYaEnviados() {
    try { return JSON.parse(localStorage.getItem(PNE_ENVIADOS_KEY) || '[]'); } catch (e) { return []; }
  }
  function _marcarIntentoPNEEnviado(fecha) {
    try {
      const lista = _intentosPNEYaEnviados();
      const clave = String(fecha);
      if (lista.indexOf(clave) === -1) {
        lista.push(clave);
        localStorage.setItem(PNE_ENVIADOS_KEY, JSON.stringify(lista));
      }
    } catch (e) { /* si falla, en el peor caso se reintenta la próxima vez — el servidor
                     descarta duplicados por attempt_id, sin efectos secundarios */ }
  }

  (function () {
    const originalSet = Storage.set;
    if (typeof originalSet !== 'function') return;

    Storage.set = function (key, value) {
      let entradasNuevas = [];
      let detalleIntentoActual = null; // { preguntas, respuestas } del intento que se está cerrando ahora mismo, si está disponible

      if (key === 'simulacroNacional' && value && Array.isArray(value.historial)) {
        try {
          const yaEnviados = _intentosPNEYaEnviados();
          entradasNuevas = value.historial.filter(function (registro) {
            return registro && registro.fecha != null && yaEnviados.indexOf(String(registro.fecha)) === -1;
          });
          if (entradasNuevas.length) {
            // Mejor esfuerzo: capturar preguntas/respuestas del intento recién
            // cerrado (para pneAnswers) leyendo el estado ANTES de este guardado.
            // Si no están disponibles (ej. viene de un backfill), se envía igual
            // el resumen agregado — solo se pierde el detalle por pregunta.
            const antes = Storage.get('simulacroNacional');
            if (antes && antes.enProgreso && Array.isArray(antes.enProgreso.preguntas) && antes.enProgreso.respuestas) {
              detalleIntentoActual = { preguntas: antes.enProgreso.preguntas, respuestas: antes.enProgreso.respuestas };
            }
          }
        } catch (e) { /* si algo falla al inspeccionar, simplemente no se registra este guardado */ }
      }

      const resultado = originalSet.call(Storage, key, value); // comportamiento original, sin cambios

      if (entradasNuevas.length) {
        entradasNuevas.forEach(function (registro) {
          try {
            _marcarIntentoPNEEnviado(registro.fecha); // marcar ANTES de enviar: nunca se duplica, aunque falle el envío
            const preguntas = (detalleIntentoActual && registro === value.historial[value.historial.length - 1]) ? detalleIntentoActual.preguntas : [];
            const respuestas = (detalleIntentoActual && registro === value.historial[value.historial.length - 1]) ? detalleIntentoActual.respuestas : {};
            _registrarIntentoPNE(registro, preguntas, respuestas, 'live_event');
          } catch (e) { /* Analytics nunca debe interrumpir el Simulacro PNE */ }
        });
      }

      return resultado;
    };
  })();

  function _generarAttemptId(profileId, fecha) {
    // Determinístico por perfil+fecha: si por cualquier motivo este mismo
    // intento se procesa más de una vez (reintento de red, doble carga),
    // el servidor lo descarta por clave primaria duplicada — nunca se
    // duplica un intento real en Supabase.
    return 'pne_' + profileId + '_' + fecha;
  }

  function _registrarIntentoPNE(registro, preguntas, respuestas, source) {
    const data = Storage.load();
    const profileId = data.profileMeta && data.profileMeta.profileId;
    if (!profileId) return; // sin profileId (no debería ocurrir con un perfil real) → no se registra

    const grupo = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeMeta && MQCProfiles.activeMeta())
      ? (MQCProfiles.activeMeta().group || null) : null;

    const attemptId = _generarAttemptId(profileId, registro.fecha);

    window.AnalyticsQueue.push('pneAttempts', {
      attempt_id: attemptId,
      profile_id: profileId,
      grupo: grupo,
      nota_presentacion: registro.presentacion,
      aciertos: registro.aciertos,
      nota_pne: registro.notaPNE,
      aprobado: !!registro.favorable,
      biologia_aciertos: _buscarCiencia(registro.porCiencia, 'Biología'),
      fisica_aciertos: _buscarCiencia(registro.porCiencia, 'Física'),
      quimica_aciertos: _buscarCiencia(registro.porCiencia, 'Química'),
      proyeccion_final: registro.proyeccionFinal,
      fecha: new Date(registro.fecha).toISOString(),
      source: source || 'live_event' /* SPRINT ANALYTICS — PARTE 4: 'live_event' | 'legacy_backfill' */
    });

    // Una fila por pregunta respondida (Sección 14) — alimenta el análisis de ítems.
    // Si no hay detalle disponible (ej. backfill de un intento antiguo), preguntas
    // viene vacío y simplemente no se genera ninguna fila de pneAnswers para ese
    // intento — el resumen agregado en pneAttempts sí queda completo igual.
    preguntas.forEach(function (p) {
      window.AnalyticsQueue.push('pneAnswers', {
        attempt_id: attemptId,
        profile_id: profileId,
        item_id: p.id,
        ciencia: p.ciencia,
        tema: p.tema,
        opcion_elegida: respuestas[p.id] || null,
        opcion_correcta: p.correcta,
        es_correcta: respuestas[p.id] === p.correcta
      });
    });
  }

  function _buscarCiencia(porCiencia, nombre) {
    if (!Array.isArray(porCiencia)) return 0;
    const c = porCiencia.find(function (x) { return x.ciencia === nombre; });
    return c ? c.correctas : 0;
  }

  /* ================================================================
     3. SINCRONIZACIÓN INICIAL — perfiles creados ANTES de que existiera
        Analytics (o antes de que se activara)
     ================================================================
     Hallazgo verificado con prueba real: un perfil con progreso ya
     existente (exámenes aprobados, PNE ya realizada) NO genera ningún
     evento con solo abrir la app — los envoltorios de arriba solo
     disparan ante una acción NUEVA (crear perfil, mejorar una nota,
     terminar un PNE). Si Analytics se activa después de que ese
     perfil ya existía, su fila en "students" nunca se crea y su
     progreso ya hecho queda invisible para el panel del docente hasta
     la próxima vez que mejore algo — que puede no llegar nunca si el
     estudiante ya completó todo.

     Solución: al cargar la app, si hay un perfil activo real (no
     invitado) que esta MISMA computadora/navegador todavía no
     sincronizó ni una vez, se envían automáticamente:
       - su fila de "students" (alias, grupo);
       - un evento de unit_exam_results por cada unidad (10.º y 11.º)
         que YA tenga examBest > 0, con la nota actual;
       - un evento de pne_attempts por cada intento YA presente en su
         historial (datos agregados: aciertos, nota, proyección, etc.)

     LÍMITE HONESTO Y DOCUMENTADO: NO se generan eventos de pne_answers
     (detalle pregunta por pregunta) para intentos de PNE anteriores a
     esta versión, porque esa información granular (qué opción exacta
     eligió en cada pregunta) nunca se guardó de forma permanente en
     ningún lado — `enProgreso` se limpia al confirmar la entrega desde
     mucho antes de que existiera esta sincronización, y el historial
     agregado (`data.simulacroNacional.historial`) nunca tuvo ese
     detalle. El análisis de ítems del panel simplemente no va a tener
     datos de esos intentos antiguos — sí va a tener el resultado
     agregado (aciertos, nota, aprobado/no) correctamente.

     GARANTÍA: esta función es de SOLO LECTURA sobre Storage — llama
     ÚNICAMENTE a Storage.load()/Storage.get() (nunca a .set() o
     .update*()), así que es estructuralmente imposible que modifique
     XP, progreso, notas, desbloqueos o historial. El único localStorage
     que escribe es su propio marcador, completamente aislado.
     ================================================================ */
  const SYNCED_KEY = 'mqc_analytics_synced_profiles_v1'; // aislado de Storage y de analytics-queue

  function _perfilesYaSincronizados() {
    try { return JSON.parse(localStorage.getItem(SYNCED_KEY) || '[]'); } catch (e) { return []; }
  }
  function _marcarComoSincronizado(profileId) {
    try {
      const lista = _perfilesYaSincronizados();
      if (lista.indexOf(profileId) === -1) {
        lista.push(profileId);
        localStorage.setItem(SYNCED_KEY, JSON.stringify(lista));
      }
    } catch (e) { /* si falla el marcador, en el peor caso se reintenta la proxima carga — el
                     servidor descarta los duplicados por event_id/attempt_id, sin efectos secundarios */ }
  }

  /* Nota de alcance (modo estricto): esta función se define aquí, FUERA de
     cualquier bloque if, precisamente para que tanto _sincronizacionInicial()
     como el envoltorio de MQCProfiles.create/setGroup/rename (más abajo)
     puedan llamarla — en 'use strict' una function declaration dentro de un
     bloque if queda con alcance solo a ese bloque. Ya trae sus propias
     comprobaciones defensivas de que MQCProfiles exista. */
  function _registrarPerfilActivo() {
    try {
      const data = Storage.load();
      const profileId = data.profileMeta && data.profileMeta.profileId;
      if (!profileId) return;
      const meta = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeMeta) ? MQCProfiles.activeMeta() : null;
      window.AnalyticsQueue.push('students', {
        profile_id: profileId,
        alias: (meta && meta.alias) || (data.user && data.user.name) || 'Estudiante',
        grupo: (meta && meta.group) || null,
        grado: null, /* MQC es multigrado por perfil; el grado se infiere del lado del panel a partir de las unidades con progreso */
        colegio: (meta && meta.colegio) || null, /* Colegio/Institución + Docente (nuevo) */
        rol: (meta && meta.rol) || 'estudiante'
      });
    } catch (e) { /* no interrumpir la gestión de perfiles */ }
  }

  function _sincronizacionInicial() {
    const data = Storage.load(); // SOLO LECTURA
    const profileId = data.profileMeta && data.profileMeta.profileId;
    if (!profileId) return; // invitado, o perfil sin profileId (no debería ocurrir en un perfil real)
    if (_perfilesYaSincronizados().indexOf(profileId) !== -1) return; // ya se sincronizó una vez desde este navegador

    try {
      // 1. Fila de "students" (reutiliza exactamente la misma lógica que create/setGroup/rename)
      _registrarPerfilActivo();

      // 2. Exámenes de unidad ya aprobados/intentados, 10.º y 11.º
      const UNIDADES_10 = ['unit-01','unit-02','unit-03','unit-04','unit-05','unit-06','unit-07','unit-08','unit-09'];
      const UNIDADES_11 = ['g11-u01','g11-u02','g11-u03','g11-u04'];
      UNIDADES_10.forEach(function (unitId) {
        const u = data.units && data.units[unitId];
        if (u && (u.examBest || 0) > 0) {
          window.AnalyticsQueue.push('unitExamResults', {
            profile_id: profileId, grado: '10', unidad: unitId, nota: u.examBest, intentos: u.examAttempts || 0
          });
        }
      });
      UNIDADES_11.forEach(function (unitId) {
        const u = data.grade11 && data.grade11[unitId];
        if (u && (u.examBest || 0) > 0) {
          window.AnalyticsQueue.push('unitExamResults', {
            profile_id: profileId, grado: '11', unidad: unitId, nota: u.examBest, intentos: u.examAttempts || 0
          });
        }
      });

      // 3. Intentos de PNE ya presentes en el historial (solo el resumen agregado —
      //    ver límite documentado arriba: no hay detalle pregunta por pregunta disponible).
      //    Reutiliza _registrarIntentoPNE (misma función que usa el hook en vivo) y el
      //    mismo registro de "ya enviados", así que si el hook en vivo procesa este
      //    mismo intento en algún momento (no debería, pero por las dudas), no se duplica.
      const sn = data.simulacroNacional;
      if (sn && Array.isArray(sn.historial)) {
        sn.historial.forEach(function (registro) {
          if (!registro || registro.fecha == null) return;
          if (_intentosPNEYaEnviados().indexOf(String(registro.fecha)) !== -1) return; // ya enviado
          _marcarIntentoPNEEnviado(registro.fecha);
          _registrarIntentoPNE(registro, [], {}, 'legacy_backfill');
        });
      }

      _marcarComoSincronizado(profileId);
    } catch (e) { /* la sincronización inicial nunca debe interrumpir la carga de la app */ }
  }

  /* ================================================================
     4. PERFILES — creación y cambios de alias/grupo
     ================================================================ */
  if (typeof window.MQCProfiles !== 'undefined') {
    const _originalCreate = MQCProfiles.create;
    if (typeof _originalCreate === 'function') {
      MQCProfiles.create = function (alias, group, avatar, colegio, rol) {
        const r = _originalCreate.call(MQCProfiles, alias, group, avatar, colegio, rol);
        if (r && r.ok) {
          try {
            _registrarPerfilActivo();
            // Un perfil recién creado no tiene nada que respaldar (examBest=0 en
            // todas las unidades, historial de PNE vacío) — se marca como ya
            // sincronizado de una vez, para que _sincronizacionInicial() no
            // vuelva a intentarlo innecesariamente en la próxima carga.
            const pid = Storage.load().profileMeta && Storage.load().profileMeta.profileId;
            if (pid) _marcarComoSincronizado(pid);
          } catch (e) {}
        }
        return r;
      };
    }

    const _originalSetGroup = MQCProfiles.setGroup;
    if (typeof _originalSetGroup === 'function') {
      MQCProfiles.setGroup = function (id, group) {
        const r = _originalSetGroup.call(MQCProfiles, id, group);
        if (r && r.ok && MQCProfiles.activeId && MQCProfiles.activeId() === id) {
          try { _registrarPerfilActivo(); } catch (e) {}
        }
        return r;
      };
    }

    const _originalSetColegio = MQCProfiles.setColegio;
    if (typeof _originalSetColegio === 'function') {
      MQCProfiles.setColegio = function (id, colegio) {
        const r = _originalSetColegio.call(MQCProfiles, id, colegio);
        if (r && r.ok && MQCProfiles.activeId && MQCProfiles.activeId() === id) {
          try { _registrarPerfilActivo(); } catch (e) {}
        }
        return r;
      };
    }

    const _originalSetRol = MQCProfiles.setRol;
    if (typeof _originalSetRol === 'function') {
      MQCProfiles.setRol = function (id, rol) {
        const r = _originalSetRol.call(MQCProfiles, id, rol);
        if (r && r.ok && MQCProfiles.activeId && MQCProfiles.activeId() === id) {
          try { _registrarPerfilActivo(); } catch (e) {}
        }
        return r;
      };
    }

    const _originalRename = MQCProfiles.rename;
    if (typeof _originalRename === 'function') {
      MQCProfiles.rename = function (id, alias) {
        const r = _originalRename.call(MQCProfiles, id, alias);
        if (r && r.ok && MQCProfiles.activeId && MQCProfiles.activeId() === id) {
          try { _registrarPerfilActivo(); } catch (e) {}
        }
        return r;
      };
    }

    /* ── Eliminación de perfil — deja un rastro append-only ──
       (ver SUPABASE_MIGRATION_profile_deletions.sql). Se lee el
       profile_id/alias/grupo ANTES de llamar al remove() original
       (después ya no existen — remove() borra esa clave de
       localStorage), usando el mismo esquema de claves que ya
       documenta la cabecera de profiles.js ('mqc_profile_' + id).
       Nunca interrumpe la eliminación real si algo de esto falla. */
    const _originalRemove = MQCProfiles.remove;
    if (typeof _originalRemove === 'function') {
      MQCProfiles.remove = function (id) {
        let profileId = null, alias = null, grupo = null;
        try {
          const meta = MQCProfiles.get ? MQCProfiles.get(id) : null;
          alias = (meta && meta.alias) || null;
          grupo = (meta && meta.group) || null;
          const raw = localStorage.getItem('mqc_profile_' + id);
          const d = raw ? JSON.parse(raw) : null;
          profileId = d && d.profileMeta && d.profileMeta.profileId;
        } catch (e) { /* si no se puede leer, simplemente no se registra este borrado */ }

        const resultado = _originalRemove.call(MQCProfiles, id); // comportamiento original, sin cambios

        if (resultado && resultado.ok && profileId) {
          try {
            window.AnalyticsQueue.push('profileDeletions', {
              profile_id: profileId,
              alias: alias,
              grupo: grupo,
              deleted_at: new Date().toISOString()
            });
          } catch (e) { /* Analytics nunca debe interrumpir la gestión de perfiles */ }
        }

        return resultado;
      };
    }
  }

  /* ================================================================
     5. LATIDO DE SESIÓN — SPRINT ANALYTICS, PARTE 8 (Activo/Inactivo)
     ================================================================
     Una fila liviana en profile_sessions por cada carga real de la
     app con un perfil no invitado. El panel calcula last_seen_at como
     el MAX(seen_at) de estas filas — así "Activo" vs "Inactivo" (30
     días sin uso) refleja actividad real, no solo la fecha de
     creación del perfil. No se manda nada para perfiles invitados
     (no persisten, no tiene sentido rastrear su actividad). */
  function _registrarLatidoSesion() {
    const data = Storage.load();
    const profileId = data.profileMeta && data.profileMeta.profileId;
    if (!profileId) return;
    window.AnalyticsQueue.push('profileSessions', { profile_id: profileId });
  }

  /* ================================================================
     6. INSIGNIA "APOYANDO MQC" — lectura desde Supabase
     ================================================================
     Consulta de solo lectura contra profile_admin_state (ver
     SUPABASE_MIGRATION_colaborador_apoyo.sql — RLS ahí permite SELECT
     público, nunca escritura, al rol anon). No es en tiempo real: se
     revisa una vez por carga de página, igual que el resto de la
     sincronización — si un docente marca a alguien como colaborador,
     ese estudiante lo va a ver reflejado en su PRÓXIMA visita, no
     mientras tiene la pestaña abierta en ese momento. */
  async function _verificarColaborador() {
    try {
      const data = Storage.load();
      const profileId = data.profileMeta && data.profileMeta.profileId;
      if (!profileId) return;
      const cfg = window.MQC_ANALYTICS_CONFIG;
      if (!cfg || !cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return;
      const url = cfg.supabaseUrl.replace(/\/+$/, '') +
        '/rest/v1/profile_admin_state?profile_id=eq.' + encodeURIComponent(profileId) + '&select=colaborador';
      const resp = await fetch(url, { headers: { apikey: cfg.supabaseAnonKey } });
      if (!resp.ok) return;
      const filas = await resp.json();
      const esColaborador = !!(filas && filas[0] && filas[0].colaborador === true);
      if (esColaborador) _mostrarInsigniaColaborador();
    } catch (e) { /* sin conexión, o Analytics deshabilitado: simplemente no se muestra esta vez */ }
  }

  function _mostrarInsigniaColaborador() {
    // Tema ambiental de bordes en TODA la página (misma técnica que el
    // modo de alto contraste — variables de color a nivel de <body>).
    document.body.classList.add('mqc-apoyo-tema');

    // Nombre en el sidebar: efecto holográfico (Holo 2, ya aprobado).
    // La clase CSS sobrevive a que app.js le cambie el textContent
    // después, así que no hace falta reaplicarla.
    const nameEl = document.getElementById('sidebar-user-name');
    if (nameEl) nameEl.classList.add('mqc-colaborador-holo');

    // Tarjeta completa del sidebar (Opción 3, elegida): fondo/borde
    // dorado suave + cinta "APOYA" en la esquina — reemplaza a la
    // etiqueta de texto suelta de la versión anterior.
    const card = document.querySelector('.sidebar-user-card');
    if (card) {
      card.classList.add('mqc-apoyo-tarjeta');
      if (!card.querySelector('.mqc-apoyo-ribbon')) {
        const ribbon = document.createElement('div');
        ribbon.className = 'mqc-apoyo-ribbon';
        ribbon.textContent = 'APOYA';
        card.appendChild(ribbon);
      }
    }

    // Chip flotante — es donde se toca el nombre para cambiar de perfil
    // (ver profiles-ui.js: mountChip()/openChipMenu()). No hay garantía
    // de que ya exista en el DOM en este momento (mountChip() puede
    // correr antes o después que esta verificación, según la latencia
    // real de red) — por eso se usa un observador en vez de asumir
    // orden de carga: si el chip ya existe, se aplica al toque; si no,
    // se aplica apenas aparezca, una sola vez.
    function _aplicarAlChip(chip) {
      chip.style.borderColor = '#F9FF4D';
      const spans = chip.querySelectorAll('span');
      if (spans[1]) spans[1].classList.add('mqc-colaborador-holo');
    }
    const chipYaPresente = document.getElementById('mqc-chip');
    if (chipYaPresente) {
      _aplicarAlChip(chipYaPresente);
    } else {
      const obs = new MutationObserver(() => {
        const chip = document.getElementById('mqc-chip');
        if (chip) { _aplicarAlChip(chip); obs.disconnect(); }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ================================================================
     7. EJECUTAR LA SINCRONIZACIÓN INICIAL — una vez por carga de página
     ================================================================
     Cubre tanto "un perfil ya existía y Analytics se activó después"
     como "el estudiante cambió a otro perfil ya existente" — el
     administrador de perfiles siempre hace location.reload() al
     seleccionar un perfil distinto (ver profiles-ui.js), así que este
     archivo vuelve a ejecutarse desde cero en ambos casos, sin
     necesitar envolver MQCProfiles.select() por separado. */
  try { _sincronizacionInicial(); } catch (e) { /* nunca debe interrumpir la carga de la app */ }
  try { _registrarLatidoSesion(); } catch (e) { /* nunca debe interrumpir la carga de la app */ }
  _verificarColaborador(); /* async, con su propio try/catch interno */

})();
