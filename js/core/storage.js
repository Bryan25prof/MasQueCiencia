/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/core/storage.js  |  Gestión de localStorage
   ================================================================
   Centraliza TODA la lectura/escritura de datos del estudiante.
   El resto del sistema solo interactúa con los datos via Storage.

   ESTRUCTURA DE DATOS (clave: 'quimica10_data'):
   {
     version: "1.0",          ← versión del esquema (para migraciones futuras)
     user: {
       name: string,          ← nombre del estudiante
       joined: timestamp,     ← fecha de primer acceso
       lastSeen: timestamp    ← última sesión
     },
     xp: {
       total: number,         ← XP total acumulado
       history: [             ← historial de ganancias de XP
         { amount, source, ts }
       ]
     },
     level: number,           ← nivel actual (1-10)
     badges: [string],        ← IDs de medallas obtenidas
     streak: {
       current: number,       ← racha de días consecutivos
       lastDate: "YYYY-MM-DD",
       best: number
     },
     units: {                 ← progreso por unidad (01-09)
       "unit-01": {
         started: boolean,
         completed: boolean,
         topicsRead: [ids],   ← temas leídos
         simsDone:  [ids],    ← simuladores completados
         gameScore: number,
         examBest:  number,   ← mejor puntuación de examen (0-100)
         examAttempts: number
       }
     },
     exam: {
       general: { attempts: number, best: number }
     },
     lab: {
       "lab-01": { done: boolean }
     },
     settings: {
       reducedMotion: boolean,
       fontSize: "normal" | "large"
     }
   }

   PARA AGREGAR DATOS: definir la clave en SCHEMA_DEFAULT y usar
   Storage.get() / Storage.set() en cualquier módulo.
================================================================ */

const Storage = (() => {
  'use strict';

  /* ── Constantes ─────────────────────────────────────────── */
  const STORAGE_KEY    = 'quimica10_data';   /* clave heredada / de respaldo */
  const SCHEMA_VERSION = '1.0';

  /* ── Perfiles Locales MQC (EOP-008) ─────────────────────────
     Storage puede apuntar a un perfil local distinto según el
     perfil activo. Mientras NO haya un resolver o perfil activo,
     usa la clave heredada 'quimica10_data' (comportamiento idéntico
     al histórico → sin regresión). El modo invitado usa un búfer en
     memoria: no persiste nada.                                    */
  let _keyResolver = null;   /* fn → string(clave) | null(invitado) | undefined(heredado) */
  let _guestBuffer = null;   /* estado en memoria para el modo invitado */

  function _activeKey() {
    if (typeof _keyResolver === 'function') {
      try {
        const k = _keyResolver();
        if (k === null) return null;          /* invitado → memoria */
        if (typeof k === 'string' && k) return k;
      } catch (e) { /* fallback abajo */ }
    }
    return STORAGE_KEY;                        /* heredado / respaldo */
  }

  /* Esquema por defecto — el estado inicial de un estudiante nuevo */
  const SCHEMA_DEFAULT = {
    version: SCHEMA_VERSION,
    user: {
      name: '',
      joined: null,
      lastSeen: null
    },
    xp: {
      total: 0,
      history: []
      /*
        ╔═══════════════════════════════════════════════════╗
        ║  AMPLIAR HISTORY CON FUENTE AL COMPLETAR MÓDULOS ║
        ║  { amount: 50, source: 'sim-01', ts: Date.now() }║
        ╚═══════════════════════════════════════════════════╝
      */
    },
    level: 1,
    badges: [],
    /*
      ╔═══════════════════════════════════════════════╗
      ║  AGREGAR IDs de badges en js/core/gamification║
      ╚═══════════════════════════════════════════════╝
    */
    streak: {
      current: 0,
      lastDate: null,
      best: 0
    },
    units: {
      'unit-01': _emptyUnit(),
      'unit-02': _emptyUnit(),
      'unit-03': _emptyUnit(),
      'unit-04': _emptyUnit(),
      'unit-05': _emptyUnit(),
      'unit-06': _emptyUnit(),
      'unit-07': _emptyUnit(),
      'unit-08': _emptyUnit(),
      'unit-09': _emptyUnit()
      /*
        ╔═══════════════════════════════════════════════════╗
        ║  SI SE AGREGA UNIDAD 10+ → agregar aquí          ║
        ║  'unit-10': _emptyUnit()                         ║
        ╚═══════════════════════════════════════════════════╝
      */
    },
    exam: {
      general: { attempts: 0, best: 0 }
    },
    /* Sonidos de La Curiosidad (HOTFIX-04) — preferencia general de
       la plataforma, independiente de las banderas de accesibilidad
       de PNE. Activado por defecto. */
    sound: {
      enabled: true
    },
    /* Desafío Final PNE (HOTFIX-02) — estadísticas propias, independientes
       de las 9 unidades. Aditivo, retrocompatible. */
    pne: {
      attempts: 0,
      firstAttemptTs: null,
      lastAttemptTs: null,
      lastScore: 0,
      bestScore: 0,
      passCount: 0,
      failCount: 0,
      scoreHistory: [],
      perUnit: {
        'unit-01': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-02': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-03': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-04': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-05': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-06': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-07': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-08': { best: 0, correctSum: 0, totalSum: 0, errors: 0 },
        'unit-09': { best: 0, correctSum: 0, totalSum: 0, errors: 0 }
      },
      recentMissedQuestionIds: [],
      lastAttemptQuestionIds: []
    },
    /* Bitácora Científica MQC (EOP-009) — aditivo, retrocompatible */
    reflexiones: {
      /* unitId: "texto de la reflexión del estudiante" */
    },
    study: {
      totalMs: 0    /* tiempo aproximado de estudio acumulado */
    },
    lab: {
      /*
        ╔═══════════════════════════════════════════════════╗
        ║  LABS: se agregan al crear el módulo de lab       ║
        ║  'lab-01': { done: false }                       ║
        ╚═══════════════════════════════════════════════════╝
      */
    },
    settings: {
      reducedMotion: false,
      fontSize:      'normal',
      _visitedPT:    false    // tabla periódica visitada (XP de primera visita)
      /*
        ╔═══════════════════════════════════════════════════════╗
        ║  AGREGAR FLAGS DE PRIMERA VISITA AQUÍ:                ║
        ║  _visitedSim: false, _visitedLab: false, etc.        ║
        ╚═══════════════════════════════════════════════════════╝
      */
    },
    /* ================================================================
       MULTIGRADO (Fase 1) — infraestructura para Química 11.º
       ================================================================
       Aditivo a propósito: NO se renombró data.units/data.xp/data.pne/
       etc. a "grade10" — esas claves YA representan implícitamente el
       progreso de décimo (es lo único que existió hasta ahora), y
       renombrarlas habría obligado a tocar los ~56 archivos que ya las
       leen, violando "mínima modificación". En vez de eso, MQC 10.º
       sigue funcionando exactamente igual, sin saber que existe un
       "grade10" — y toda la infraestructura nueva vive en estas 3
       claves nuevas. Storage.load() ya hace un merge profundo con
       SCHEMA_DEFAULT (ver _mergeDeep), así que un perfil creado antes
       de esta fase recibe estas claves automáticamente la próxima vez
       que se carga — sin necesitar una función de migración aparte. */
    profileMeta: {
      profileId: null,       /* formato MQC-XXXXXX, se genera una sola vez en create()/resetProgress()/importProfile() */
      createdAt: null,
      lastImportAt: null,
      importCount: 0,
      schemaVersion: 2       /* 1 = solo décimo (implícito, sin este campo); 2 = multigrado */
    },
    identityLock: {
      locked: false,
      lockedAt: null,
      reason: null           /* 'first-exam-passed' */
    },
    grade11Unlock: {
      unlocked: false,
      method: null,          /* 'six-exams' | 'pne-80' */
      unlockedAt: null,
      evidence: null         /* { examsPassed, pneBestScore } */
    },
    /* Progreso propio de 11.º — separado de data.units (10.º) a
       propósito, para no mezclar porcentajes entre niveles. Vacío
       mientras las 4 unidades sigan "En desarrollo". */
    grade11: {
      'g11-u01': _emptyUnit(),
      'g11-u02': _emptyUnit(),
      'g11-u03': _emptyUnit(),
      'g11-u04': _emptyUnit()
    }
  };

  /* Crea un objeto de unidad vacío */
  function _emptyUnit() {
    return {
      started:      false,
      completed:    false,
      topicsRead:   [],
      simsDone:     [],
      gameScore:    0,
      examBest:     0,
      examAttempts: 0
    };
  }

  /* ── Métodos privados ───────────────────────────────────── */

  /**
   * Fusión profunda de defaults + datos guardados.
   * Asegura que campos nuevos del schema se integren
   * aunque el localStorage tenga una versión anterior.
   */
  function _mergeDeep(defaults, saved) {
    const result = Object.assign({}, defaults);
    for (const key in saved) {
      if (
        saved[key] &&
        typeof saved[key] === 'object' &&
        !Array.isArray(saved[key]) &&
        defaults[key] &&
        typeof defaults[key] === 'object'
      ) {
        result[key] = _mergeDeep(defaults[key], saved[key]);
      } else {
        result[key] = saved[key];
      }
    }
    return result;
  }

  /* ── API Pública ────────────────────────────────────────── */

  /**
   * Carga los datos desde localStorage.
   * Si no existen, retorna el schema por defecto.
   * Si existen, fusiona con defaults (maneja versiones futuras).
   */
  function load() {
    try {
      const key = _activeKey();
      if (key === null) {                       /* modo invitado (en memoria) */
        return _guestBuffer
          ? _mergeDeep(JSON.parse(JSON.stringify(SCHEMA_DEFAULT)), _guestBuffer)
          : JSON.parse(JSON.stringify(SCHEMA_DEFAULT));
      }
      const raw = localStorage.getItem(key);
      if (!raw) return JSON.parse(JSON.stringify(SCHEMA_DEFAULT));
      const saved = JSON.parse(raw);
      return _mergeDeep(JSON.parse(JSON.stringify(SCHEMA_DEFAULT)), saved);
    } catch (err) {
      console.warn('[Storage] Error al cargar datos, usando defaults.', err);
      return JSON.parse(JSON.stringify(SCHEMA_DEFAULT));
    }
  }

  /**
   * Guarda el objeto de datos completo en localStorage.
   * @param {object} data — Objeto de datos del estudiante
   */
  function save(data) {
    try {
      const key = _activeKey();
      if (key === null) { _guestBuffer = data; return; }   /* invitado: no persiste */
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('[Storage] Error al guardar datos.', err);
    }
  }

  /**
   * Obtiene el valor de una clave de primer nivel.
   * @param {string} key — Clave principal (ej: 'user', 'xp', 'units')
   */
  function get(key) {
    const data = load();
    return data[key] !== undefined ? data[key] : null;
  }

  /**
   * Actualiza una clave de primer nivel y guarda.
   * @param {string} key   — Clave principal
   * @param {any}    value — Valor nuevo (si es object, hace merge)
   */
  function set(key, value) {
    const data = load();
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      data[key] &&
      typeof data[key] === 'object'
    ) {
      data[key] = Object.assign({}, data[key], value);
    } else {
      data[key] = value;
    }
    save(data);
  }

  /**
   * Registra el inicio de sesión del día:
   * actualiza lastSeen y calcula racha.
   */
  function registerSession() {
    const data   = load();
    const today  = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const last   = data.streak.lastDate;

    data.user.lastSeen = Date.now();

    if (last) {
      const diff = _daysBetween(last, today);
      if (diff === 1) {
        // Día consecutivo
        data.streak.current += 1;
      } else if (diff > 1) {
        // Racha rota
        data.streak.current = 1;
      }
      // diff === 0: misma sesión del mismo día, no cambiar
    } else {
      data.streak.current = 1;
    }

    if (data.streak.current > data.streak.best) {
      data.streak.best = data.streak.current;
    }

    data.streak.lastDate = today;
    save(data);
  }

  /** Diferencia en días entre dos strings 'YYYY-MM-DD' */
  function _daysBetween(dateA, dateB) {
    const a = new Date(dateA + 'T00:00:00');
    const b = new Date(dateB + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }

  /**
   * Actualiza el progreso de una unidad específica.
   * @param {string} unitId — 'unit-01', 'unit-02', etc.
   * @param {object} update — Campos a actualizar (merge)
   */
  function updateUnit(unitId, update) {
    const data = load();
    if (!data.units[unitId]) {
      data.units[unitId] = _emptyUnit();
    }
    data.units[unitId] = Object.assign({}, data.units[unitId], update);
    data.units[unitId].started = true;
    _refreshCompleted(data.units[unitId], unitId);
    save(data);
  }

  /**
   * Marca un tema como leído dentro de una unidad.
   * @param {string} unitId  — 'unit-01'
   * @param {string} topicId — ID del tema
   */
  function markTopicRead(unitId, topicId) {
    const data = load();
    if (!data.units[unitId]) data.units[unitId] = _emptyUnit();
    const unit = data.units[unitId];
    if (!unit.topicsRead.includes(topicId)) {
      unit.topicsRead.push(topicId);
    }
    unit.started = true;
    _refreshCompleted(unit, unitId);
    save(data);
  }

  /**
   * Obtiene el porcentaje de progreso de una unidad.
   * NOTA: En Fase 0 el progreso es 0 hasta que las unidades
   * estén implementadas. Este cálculo se refinará en Fase 1+.
   * @param {string} unitId
   * @returns {number} 0-100
   */
  function getUnitProgress(unitId) {
    const data = load();
    const unit = data.units[unitId];
    if (!unit || !unit.started) return 0;
    return _computePct(unit, unitId);
  }

  /*
    ╔════════════════════════════════════════════════════════╗
    ║  FÓRMULA OFICIAL (FASE 1.5) — heredada por TODAS las   ║
    ║  unidades. Cada categoría aporta 25 %:                 ║
    ║    25% teoría · 25% simuladores · 25% juego · 25% examen║
    ║  Los totales se leen de UNIDADES_DATA, por lo que cada ║
    ║  unidad nueva se calcula automáticamente.             ║
    ║  El progreso NO se "salta" a 100 por aprobar el examen:║
    ║  refleja siempre los cuatro pilares (filosofía MQC).  ║
    ╚════════════════════════════════════════════════════════╝
  */
  function _computePct(unit, unitId) {
    let meta = null;
    if (typeof UNIDADES_DATA !== 'undefined') {
      meta = UNIDADES_DATA.find(u => u.id === unitId);
    }
    const totalTopics = (meta && meta.topics) ? meta.topics.length : 0;
    const totalSims   = (meta && meta.simulators) ? meta.simulators.length : 0;
    const totalLevels = (meta && meta.game && meta.game.levels) ? meta.game.levels : 0;
    const pass        = (meta && meta.exam && meta.exam.pass) ? meta.exam.pass : 70;

    function ratio(done, total) { return total > 0 ? Math.min(1, done / total) : 0; }

    const rTeoria = ratio((unit.topicsRead || []).length, totalTopics);
    const rSims   = ratio((unit.simsDone || []).length, totalSims);
    const rJuego  = totalLevels > 0
      ? ratio((unit.gameLevels || []).length, totalLevels)
      : ((unit.gameScore || 0) > 0 ? 1 : 0);
    const rExamen = (unit.examBest || 0) > 0 ? Math.min(1, unit.examBest / pass) : 0;

    const pct = Math.round(25 * (rTeoria + rSims + rJuego + rExamen));
    return Math.max(0, Math.min(100, pct));
  }

  /* "completed" es DERIVADO: una unidad está completa solo cuando los
     cuatro pilares llegan al 100 %. Es "pegajoso" (una vez true, sigue
     true). Se recalcula en cada mutación de progreso. */
  function _refreshCompleted(unit, unitId) {
    if (!unit) return;
    unit.completed = unit.completed || _computePct(unit, unitId) === 100;
  }

  /**
   * Borra TODOS los datos del estudiante (reset total).
   * ⚠️ Irreversible. Mostrar confirmación antes de llamar.
   */
  function reset() {
    const key = _activeKey();
    if (key === null) { _guestBuffer = null; return; }
    localStorage.removeItem(key);
  }

  /* ── Enganche para Perfiles Locales MQC ─────────────────────
     MQCProfiles instala aquí su resolver de clave. Si nunca se
     instala, Storage sigue usando la clave heredada.            */
  function setKeyResolver(fn) { _keyResolver = (typeof fn === 'function') ? fn : null; }
  function getActiveKey()     { return _activeKey(); }
  function clearGuestBuffer() { _guestBuffer = null; }
  /* Lee/escribe datos crudos de una clave concreta (para perfiles) */
  function rawGet(key) {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch (e) { return null; }
  }
  function rawSet(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch (e) { return false; }
  }
  function rawRemove(key) { try { localStorage.removeItem(key); } catch (e) {} }
  function defaults() { return JSON.parse(JSON.stringify(SCHEMA_DEFAULT)); }

  /**
   * Verifica si el estudiante ya tiene nombre registrado.
   * @returns {boolean}
   */
  function hasUser() {
    const user = get('user');
    return user && typeof user.name === 'string' && user.name.trim().length > 0;
  }

  /* Exportar API pública */
  return {
    load,
    save,
    get,
    set,
    registerSession,
    updateUnit,
    markTopicRead,
    getUnitProgress,
    hasUser,
    reset,
    /* Perfiles Locales MQC (EOP-008) */
    setKeyResolver,
    getActiveKey,
    clearGuestBuffer,
    rawGet,
    rawSet,
    rawRemove,
    defaults,
    SCHEMA_VERSION
  };

})(); // Storage
