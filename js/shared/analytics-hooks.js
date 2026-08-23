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
     _confirmarEntregaFinal() en simulacro-nacional.js (NO se toca ese
     archivo) hace, en este orden:
       1. sn = Storage.get('simulacroNacional')   ← estado ANTES de este guardado,
          todavía con el enProgreso completo (preguntas + respuestas)
          del intento recién terminado.
       2. sn.historial.push(registro)             ← agrega el resumen
       3. sn.enProgreso = null
       4. Storage.set('simulacroNacional', sn)    ← ESTE es el que envolvemos

     Por eso, dentro de nuestro envoltorio, leer Storage.get('simulacroNacional')
     ANTES de llamar al original nos da exactamente los datos completos
     del intento que se está por confirmar — sin tocar simulacro-nacional.js. */
  (function () {
    const originalSet = Storage.set;
    if (typeof originalSet !== 'function') return;

    Storage.set = function (key, value) {
      let capturaPendiente = null;

      if (key === 'simulacroNacional') {
        try {
          const antes = Storage.get('simulacroNacional');
          const historialAntes = (antes && Array.isArray(antes.historial)) ? antes.historial.length : 0;
          const historialDespues = (value && Array.isArray(value.historial)) ? value.historial.length : 0;
          const esEntregaFinal = historialDespues > historialAntes
                                && antes && antes.enProgreso
                                && Array.isArray(antes.enProgreso.preguntas)
                                && antes.enProgreso.respuestas;
          if (esEntregaFinal) {
            capturaPendiente = {
              registro: value.historial[value.historial.length - 1],
              preguntas: antes.enProgreso.preguntas,
              respuestas: antes.enProgreso.respuestas
            };
          }
        } catch (e) { /* si algo falla al inspeccionar, simplemente no se registra este intento */ }
      }

      const resultado = originalSet.call(Storage, key, value); // comportamiento original, sin cambios

      if (capturaPendiente) {
        try { _registrarIntentoPNE(capturaPendiente.registro, capturaPendiente.preguntas, capturaPendiente.respuestas); }
        catch (e) { /* Analytics nunca debe interrumpir el Simulacro PNE */ }
      }

      return resultado;
    };
  })();

  function _generarAttemptId(profileId) {
    return 'pne_' + profileId + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function _registrarIntentoPNE(registro, preguntas, respuestas) {
    const data = Storage.load();
    const profileId = data.profileMeta && data.profileMeta.profileId;
    if (!profileId) return; // sin profileId (no debería ocurrir con un perfil real) → no se registra

    const grupo = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeMeta && MQCProfiles.activeMeta())
      ? (MQCProfiles.activeMeta().group || null) : null;

    const attemptId = _generarAttemptId(profileId);

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
      fecha: new Date(registro.fecha).toISOString()
    });

    // Una fila por pregunta respondida (Sección 14) — alimenta el análisis de ítems.
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
        grado: null /* MQC es multigrado por perfil; el grado se infiere del lado del panel a partir de las unidades con progreso */
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
      const sn = data.simulacroNacional;
      if (sn && Array.isArray(sn.historial)) {
        const grupoActual = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeMeta && MQCProfiles.activeMeta())
          ? (MQCProfiles.activeMeta().group || null) : null;
        sn.historial.forEach(function (registro, indice) {
          // attempt_id determinístico: si por alguna razón esta función corriera dos veces
          // antes de que el marcador local se guarde, el servidor lo descarta por clave
          // primaria duplicada (mismo comportamiento que el resto de la cola, Sección 21).
          const attemptId = 'pne_backfill_' + profileId + '_' + indice + '_' + (registro.fecha || 0);
          window.AnalyticsQueue.push('pneAttempts', {
            attempt_id: attemptId,
            profile_id: profileId,
            grupo: grupoActual,
            nota_presentacion: registro.presentacion,
            aciertos: registro.aciertos,
            nota_pne: registro.notaPNE,
            aprobado: !!registro.favorable,
            biologia_aciertos: _buscarCiencia(registro.porCiencia, 'Biología'),
            fisica_aciertos: _buscarCiencia(registro.porCiencia, 'Física'),
            quimica_aciertos: _buscarCiencia(registro.porCiencia, 'Química'),
            proyeccion_final: registro.proyeccionFinal,
            fecha: new Date(registro.fecha || Date.now()).toISOString()
          });
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
      MQCProfiles.create = function (alias, group, avatar) {
        const r = _originalCreate.call(MQCProfiles, alias, group, avatar);
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
  }

  /* ================================================================
     5. EJECUTAR LA SINCRONIZACIÓN INICIAL — una vez por carga de página
     ================================================================
     Cubre tanto "un perfil ya existía y Analytics se activó después"
     como "el estudiante cambió a otro perfil ya existente" — el
     administrador de perfiles siempre hace location.reload() al
     seleccionar un perfil distinto (ver profiles-ui.js), así que este
     archivo vuelve a ejecutarse desde cero en ambos casos, sin
     necesitar envolver MQCProfiles.select() por separado. */
  try { _sincronizacionInicial(); } catch (e) { /* nunca debe interrumpir la carga de la app */ }

})();
