/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/core/gamification.js  |  Sistema de XP, Niveles y Medallas
   ================================================================
   Maneja toda la lógica de gamificación:
   - 10 niveles de progresión
   - Ganancias de XP por actividad
   - 12 medallas (badges)
   - Notificaciones de subida de nivel
   - Racha de días

   PARA AGREGAR NUEVAS FUENTES DE XP:
     1. Definir la recompensa en XP_REWARDS
     2. Llamar Gamification.addXP('fuente', cantidad) desde el módulo
   PARA AGREGAR MEDALLAS:
     1. Definir en BADGES
     2. Agregar lógica de desbloqueo en checkBadges()
================================================================ */

const Gamification = (() => {
  'use strict';

  /* ── Definición de niveles ──────────────────────────────── */
  /*
    Cada nivel tiene:
    - level: número de nivel
    - name:  nombre del nivel
    - icon:  emoji representativo
    - xp:    XP mínimo para alcanzar este nivel
  */
  const LEVELS = [
    { level: 1,  name: 'Átomo Novato',         icon: '⚛️',  xp: 0     },
    { level: 2,  name: 'Molécula Curiosa',      icon: '🔵',  xp: 200   },
    { level: 3,  name: 'Compuesto Emergente',   icon: '🟢',  xp: 500   },
    { level: 4,  name: 'Reacción Activa',       icon: '⚡',  xp: 1000  },
    { level: 5,  name: 'Elemento Brillante',    icon: '✨',  xp: 2000  },
    { level: 6,  name: 'Científico Junior',     icon: '🔬',  xp: 3500  },
    { level: 7,  name: 'Químico Avanzado',      icon: '🌟',  xp: 5500  },
    { level: 8,  name: 'Maestro Cuántico',      icon: '💎',  xp: 8000  },
    { level: 9,  name: 'Profesor Honorario',    icon: '🏆',  xp: 11000 },
    { level: 10, name: 'Leyenda Química',       icon: '👑',  xp: 15000 }
  ];

  /* ── Recompensas de XP por tipo de actividad ────────────── */
  /*
    ╔═══════════════════════════════════════════════════════════╗
    ║  PARA AGREGAR FUENTES DE XP:                             ║
    ║  Agrega una clave aquí y úsala en Gamification.addXP()  ║
    ╚═══════════════════════════════════════════════════════════╝
  */
  const XP_REWARDS = {
    /* Teoría */
    'topic-read':          15,   // leer un tema
    'unit-started':        25,   // iniciar una unidad
    'unit-completed':     150,   // completar una unidad al 100%

    /* Simuladores */
    'simulator-done':      50,   // completar un simulador
    'simulator-perfect':   80,   // completar sin errores

    /* Juegos */
    'game-played':         30,   // jugar cualquier juego
    'game-won':            60,   // ganar un juego
    'game-highscore':     100,   // superar tu propio récord

    /* Laboratorio */
    'lab-done':            75,   // completar una práctica

    /* Exámenes */
    'exam-done':           40,   // hacer un examen
    'exam-60':             60,   // obtener ≥60 en examen
    'exam-80':            100,   // obtener ≥80
    'exam-100':           200,   // obtener nota perfecta
    'general-exam-done':  100,   // examen general completado

    /* Desafío Final PNE (HOTFIX-02) — reglas anti-farming se aplican
       en pne-final.js antes de llamar a addXP(), no acá: XP completo
       solo la primera aprobación; bonificación solo al mejorar el
       mejor resultado propio; nunca por repetir un intento igual o
       inferior. */
    'pne-first-pass':     150,   // primera vez que aprueba el Desafío Final PNE
    'pne-improved':        50,   // mejora su mejor resultado histórico en PNE

    /* Periódica */
    'element-explored':     5,   // abrir ficha de un elemento

    /* Racha */
    'streak-3':            50,   // 3 días seguidos
    'streak-7':           150,   // 7 días seguidos
    'streak-30':          500,   // 30 días seguidos

    /* Login */
    'daily-login':         10,   // iniciar sesión (por día)

    /* Exploración */
    'section-visited':      5,   // visitar una sección nueva

    /* Proyecto Integrador Final (aditivo, MQC v1.0) */
    'integrador-estacion':    30,   // completar una estación del caso integrador
    'integrador-completado': 300    // completar el Proyecto Integrador Final completo
  };

  /* ── Medallas (Badges) ──────────────────────────────────── */
  /*
    ╔══════════════════════════════════════════════════════════╗
    ║  PARA AGREGAR MEDALLAS:                                  ║
    ║  1. Agrega el objeto aquí                                ║
    ║  2. Agrega condición de desbloqueo en checkBadges()      ║
    ╚══════════════════════════════════════════════════════════╝
  */
  const BADGES = [
    {
      id:   'first-login',
      name: 'Primer Día',
      icon: '🎉',
      desc: 'Iniciaste tu aventura en Química Interactiva'
    },
    {
      id:   'element-explorer',
      name: 'Explorador',
      icon: '🔍',
      desc: 'Consultaste la ficha de 10 elementos distintos'
    },
    {
      id:   'unit-starter',
      name: 'En Marcha',
      icon: '🚀',
      desc: 'Completaste tu primera unidad'
    },
    {
      id:   'half-course',
      name: 'Mitad del Camino',
      icon: '🌓',
      desc: 'Completaste 5 de las 9 unidades'
    },
    {
      id:   'course-complete',
      name: 'Curso Completo',
      icon: '🎓',
      desc: 'Completaste las 9 unidades del curso'
    },
    {
      id:   'streak-3',
      name: 'Consistente',
      icon: '🔥',
      desc: 'Estudiaste 3 días consecutivos'
    },
    {
      id:   'streak-7',
      name: 'Semana de Fuego',
      icon: '🌋',
      desc: 'Estudiaste 7 días consecutivos'
    },
    {
      id:   'perfect-exam',
      name: 'Perfecto',
      icon: '💯',
      desc: 'Obtuviste 100 en un examen de unidad'
    },
    {
      id:   'lab-master',
      name: 'Laboratorista',
      icon: '⚗️',
      desc: 'Completaste todas las prácticas de laboratorio'
    },
    {
      id:   'game-champion',
      name: 'Campeón',
      icon: '🎮',
      desc: 'Ganaste todos los minijuegos de una unidad'
    },
    {
      id:   'xp-1000',
      name: '¡1000 XP!',
      icon: '⭐',
      desc: 'Acumulaste 1000 puntos de experiencia'
    },
    {
      id:   'legend',
      name: 'Leyenda',
      icon: '👑',
      desc: 'Alcanzaste el nivel máximo: Leyenda Química'
    },
    {
      id:   'integrador-final',
      name: 'Científico Integral',
      icon: '🧩',
      desc: 'Completaste el Proyecto Integrador Final MQC'
    },
    {
      id:   'pne-desbloqueado',
      name: 'Desafío Desbloqueado',
      icon: '🔓',
      desc: 'Aprobaste al menos 5 de las 9 unidades y desbloqueaste el Desafío Final PNE'
    },
    {
      id:   'pne-aprobado',
      name: 'Desafío Superado',
      icon: '🏅',
      desc: 'Aprobaste el Desafío Final PNE por primera vez'
    },
    {
      id:   'pne-dominio',
      name: 'Dominio PNE',
      icon: '👑',
      desc: 'Obtuviste una puntuación sobresaliente (90 o más) en el Desafío Final PNE'
    },
    {
      id:   'grade11-unlocked',
      name: 'Ruta de Undécimo Desbloqueada',
      icon: '🎓',
      desc: 'Desbloqueaste el acceso a Química 11.º'
    }
  ];

  /* ── Métodos privados ───────────────────────────────────── */

  /** Calcula el nivel correspondiente a un total de XP */
  function _calcLevel(totalXP) {
    let level = 1;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVELS[i].xp) {
        level = LEVELS[i].level;
        break;
      }
    }
    return level;
  }

  /** Obtiene el objeto de nivel por número */
  function _getLevelObj(lvl) {
    return LEVELS.find(l => l.level === lvl) || LEVELS[0];
  }

  /** Muestra un toast de notificación */
  function _toast(icon, title, msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${msg ? `<p class="toast-msg">${msg}</p>` : ''}
      </div>
    `;
    container.appendChild(toast);

    // Auto-eliminar
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /** Lanza la animación de subida de nivel */
  function _animateLevelUp(levelObj) {
    _toast(levelObj.icon, `¡Subiste a Nivel ${levelObj.level}!`, levelObj.name, 'xp');

    // Flash en el sidebar
    const userCard = document.querySelector('.sidebar-user-card');
    if (userCard) {
      userCard.style.animation = 'levelUp 0.6s ease 3';
      setTimeout(() => { userCard.style.animation = ''; }, 1800);
    }
  }

  /* ── API Pública ────────────────────────────────────────── */

  /**
   * Añade XP al estudiante y verifica subida de nivel.
   * @param {string} source  — Clave de XP_REWARDS o string descriptivo
   * @param {number} [amount]— Si se omite, usa el valor de XP_REWARDS[source]
   * @returns {object} { newXP, newLevel, leveledUp }
   */
  function addXP(source, amount) {
    const xpGain = amount !== undefined ? amount : (XP_REWARDS[source] || 0);
    if (xpGain <= 0) return { newXP: 0, newLevel: 1, leveledUp: false };

    const data    = Storage.load();
    const prevLvl = data.level;

    data.xp.total += xpGain;
    data.xp.history.push({ amount: xpGain, source, ts: Date.now() });

    // Limitar historial a 100 entradas
    if (data.xp.history.length > 100) {
      data.xp.history = data.xp.history.slice(-100);
    }

    const newLvl  = _calcLevel(data.xp.total);
    data.level    = newLvl;

    Storage.save(data);

    const leveledUp = newLvl > prevLvl;
    if (leveledUp) {
      _animateLevelUp(_getLevelObj(newLvl));
      /* EOP-020: puente hacia La Curiosidad — API congelada, solo se
         invoca el estado ya documentado en PHOTON_COMPONENT_SPEC.md */
      if (typeof Photon !== 'undefined' && Photon.react) {
        try { Photon.react('level-up'); } catch (e) {}
      }
    }

    // Toast de XP
    _toast('⚡', `+${xpGain} XP`, source ? `[${source}]` : '', 'xp');

    // Animación flotante de XP en pantalla
    _floatXP(xpGain);

    // Verificar medallas
    // EOP-037: si esta misma ganancia de XP desbloqueó una medalla A LA
    // VEZ que subía de nivel, se le indica a checkBadges() para que no
    // sobrescriba la reacción 'nivel' con 'badge-unlocked' (jerarquía:
    // Nivel > Celebración, ver Reglas de Interacción §6).
    checkBadges(data, leveledUp);

    // Actualizar UI del sidebar
    // EOP-037: CORRECCIÓN DE BUG REAL — antes comprobaba "window.App",
    // que nunca existe (una "const App" de nivel superior en app.js
    // nunca se adjunta como propiedad de window, ni en Node ni en un
    // navegador real). Por eso el sidebar nunca se actualizaba solo
    // tras ganar XP — aunque el dato SÍ quedaba bien guardado en
    // Storage (por eso "Mi Progreso" sí mostraba el valor correcto).
    if (typeof App !== 'undefined' && App && App.updateUserUI) {
      try { App.updateUserUI(); } catch (e) { /* silencioso: no bloquear el flujo de XP por un fallo de UI */ }
    }

    return { newXP: data.xp.total, newLevel: newLvl, leveledUp };
  }

  /** Crea y anima un número de XP flotante en pantalla */
  function _floatXP(amount) {
    const el = document.createElement('div');
    el.textContent = `+${amount} XP`;
    el.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 100px;
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--gold);
      text-shadow: 0 0 10px var(--gold);
      pointer-events: none;
      z-index: 9999;
      animation: xpGain 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  /**
   * Verifica si se han desbloqueado medallas nuevas.
   * Llama a esta función después de cualquier cambio de estado.
   * @param {object} [data] — Datos del estudiante (opcional, carga si no se da)
   */
  function checkBadges(data, skipPhotonReaction) {
    data = data || Storage.load();
    const newBadges = [];

    /* ── Condiciones de desbloqueo ─────────────────────────
       Agrega más condiciones aquí al implementar módulos
    ─────────────────────────────────────────────────────── */

    // 'first-login' — siempre se da en el primer registro
    if (!data.badges.includes('first-login')) {
      newBadges.push('first-login');
    }

    // 'xp-1000'
    if (data.xp.total >= 1000 && !data.badges.includes('xp-1000')) {
      newBadges.push('xp-1000');
    }

    // 'streak-3'
    if (data.streak.current >= 3 && !data.badges.includes('streak-3')) {
      newBadges.push('streak-3');
    }

    // 'streak-7'
    if (data.streak.current >= 7 && !data.badges.includes('streak-7')) {
      newBadges.push('streak-7');
    }

    // 'unit-starter' — al menos 1 unidad completada
    const completedUnits = Object.values(data.units).filter(u => u.completed).length;
    if (completedUnits >= 1 && !data.badges.includes('unit-starter')) {
      newBadges.push('unit-starter');
    }

    // 'half-course' — 5 unidades completadas
    if (completedUnits >= 5 && !data.badges.includes('half-course')) {
      newBadges.push('half-course');
    }

    // 'course-complete' — 9 unidades completadas
    if (completedUnits >= 9 && !data.badges.includes('course-complete')) {
      newBadges.push('course-complete');
    }

    // 'legend' — nivel 10
    if (data.level >= 10 && !data.badges.includes('legend')) {
      newBadges.push('legend');
    }

    // 'integrador-final' — completó el Proyecto Integrador Final (aditivo, MQC v1.0)
    if (data.integrador && data.integrador.completado && !data.badges.includes('integrador-final')) {
      newBadges.push('integrador-final');
    }

    // 'pne-desbloqueado' — aprobó un mínimo de 5 de las 9 unidades (actualizado a pedido del usuario, antes exigía 9/9)
    if (typeof UNIDADES_DATA !== 'undefined') {
      const PNE_MIN_UNITS = 5;
      const passedCount = UNIDADES_DATA.filter(u => {
        const uData = data.units[u.id];
        const passMin = (u.exam && u.exam.pass) || 70;
        return uData && (uData.examBest || 0) >= passMin;
      }).length;
      if (passedCount >= PNE_MIN_UNITS && !data.badges.includes('pne-desbloqueado')) {
        newBadges.push('pne-desbloqueado');
      }
    }

    // 'pne-aprobado' — primera aprobación del Desafío Final PNE
    if (data.pne && data.pne.passCount >= 1 && !data.badges.includes('pne-aprobado')) {
      newBadges.push('pne-aprobado');
    }

    // 'pne-dominio' — puntuación sobresaliente (90+) en el Desafío Final PNE
    if (data.pne && data.pne.bestScore >= 90 && !data.badges.includes('pne-dominio')) {
      newBadges.push('pne-dominio');
    }

    /* ================================================================
       MULTIGRADO (Fase 1) — bloqueo de identidad + desbloqueo de 11.º
       ================================================================
       Punto único de detección: checkBadges() ya se llama de forma
       amplia (tras cada addXP, al abrir Mi Progreso/Bitácora, etc.),
       así que es el lugar correcto para revisar estas dos condiciones
       sin tocar ninguna de las 9 unidades. IMPORTANTE: Storage.save()
       más abajo en esta función SOLO corre si hay una insignia nueva
       — el bloqueo de identidad no siempre otorga una, así que se
       guarda explícito acá mismo para no perder el cambio en silencio. */
    let _multigradoChanged = false;

    if (typeof UNIDADES_DATA !== 'undefined' && data.identityLock && !data.identityLock.locked) {
      const anyExamPassed = UNIDADES_DATA.some(u => {
        const uData = data.units[u.id];
        const passMin = (u.exam && u.exam.pass) || 70;
        return uData && (uData.examBest || 0) >= passMin;
      });
      if (anyExamPassed) {
        data.identityLock.locked = true;
        data.identityLock.lockedAt = Date.now();
        data.identityLock.reason = 'first-exam-passed';
        _multigradoChanged = true;
      }
    }

    if (typeof UNIDADES_DATA !== 'undefined' && data.grade11Unlock && !data.grade11Unlock.unlocked) {
      const examsPassed = UNIDADES_DATA.filter(u => {
        const uData = data.units[u.id];
        const passMin = (u.exam && u.exam.pass) || 70;
        return uData && (uData.examBest || 0) >= passMin;
      }).length;
      const pneBest = (data.pne && data.pne.bestScore) || 0;
      const routeA = examsPassed >= 6;
      const routeB = pneBest >= 80;
      if (routeA || routeB) {
        data.grade11Unlock.unlocked = true;
        data.grade11Unlock.method = routeA ? 'six-exams' : 'pne-80';
        data.grade11Unlock.unlockedAt = Date.now();
        data.grade11Unlock.evidence = { examsPassed, pneBestScore: pneBest };
        _multigradoChanged = true;
        if (!data.badges.includes('grade11-unlocked')) newBadges.push('grade11-unlocked');
        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react('level-up'); } catch (e) {} }
        setTimeout(() => {
          _toast('🔓', '¡Química 11.º desbloqueada!', routeA ? 'Aprobaste 6 de 9 exámenes de décimo.' : 'Obtuviste 80+ en el Desafío Final PNE.', 'info');
        }, 400);
      }
    }

    if (_multigradoChanged) Storage.save(data);

    /*
      ╔══════════════════════════════════════════════════════╗
      ║  FASE 1+: AGREGAR CONDICIONES PARA:                  ║
      ║  'element-explorer' → cuando se vean 10 elementos   ║
      ║  'perfect-exam'     → cuando exam.best === 100      ║
      ║  'lab-master'       → cuando lab completo            ║
      ║  'game-champion'    → cuando juegos completados      ║
      ╚══════════════════════════════════════════════════════╝
    */

    // Otorgar medallas nuevas
    if (newBadges.length > 0) {
      newBadges.forEach(id => {
        data.badges.push(id);
        const badge = BADGES.find(b => b.id === id);
        if (badge) {
          /* EOP-020: puente hacia La Curiosidad. course-complete usa el
             estado 'nivel' (el reconocimiento más alto disponible, ya
             definido en STATE_PARAMS); el resto de medallas usa
             'badge-unlocked'. API de Photon congelada, sin cambios.
             EOP-037: si esta misma ganancia de XP ya disparó 'nivel'
             (skipPhotonReaction=true), una medalla común NO puede
             sobrescribirlo — Nivel tiene mayor jerarquía que Insignia
             (Reglas de Interacción §6). course-complete es la única
             excepción: es en sí mismo un evento de jerarquía "nivel",
             así que siempre se respeta. */
          const isCourseComplete = id === 'course-complete';
          if (typeof Photon !== 'undefined' && Photon.react && (!skipPhotonReaction || isCourseComplete)) {
            try { Photon.react(isCourseComplete ? 'course-complete' : 'badge-unlocked'); } catch (e) {}
          }
          setTimeout(() => {
            _toast(badge.icon, `¡Medalla: ${badge.name}!`, badge.desc, 'info');
          }, 500);
        }
      });
      Storage.save(data);
    }
  }

  /**
   * Devuelve la información de nivel actual del estudiante.
   * @returns {object} { level, name, icon, xp, xpNext, xpPrev, percent }
   */
  function getLevelInfo() {
    const data    = Storage.load();
    const lvl     = data.level;
    const current = _getLevelObj(lvl);
    const next    = _getLevelObj(Math.min(lvl + 1, 10));
    const xpNow   = data.xp.total;
    const xpPrev  = current.xp;
    const xpNext  = next.xp;
    const range   = Math.max(1, xpNext - xpPrev);
    const percent = lvl >= 10 ? 100 : Math.min(100, Math.round(((xpNow - xpPrev) / range) * 100));

    return {
      level:   current.level,
      name:    current.name,
      icon:    current.icon,
      xp:      xpNow,
      xpNext:  xpNext,
      xpPrev:  xpPrev,
      percent: percent,
      maxed:   lvl >= 10
    };
  }

  /**
   * Devuelve todas las medallas con estado desbloqueado/bloqueado.
   * @returns {Array} Lista de badges con campo `unlocked`
   */
  function getAllBadges() {
    const data = Storage.load();
    return BADGES.map(b => ({ ...b, unlocked: data.badges.includes(b.id) }));
  }

  /** Devuelve la definición de todos los niveles */
  function getAllLevels() { return [...LEVELS]; }

  /** Devuelve el objeto de nivel para un número dado */
  function getLevelObj(lvl) { return _getLevelObj(lvl); }

  /* Exportar API pública */
  return {
    LEVELS,
    BADGES,
    XP_REWARDS,
    addXP,
    checkBadges,
    getLevelInfo,
    getAllBadges,
    getAllLevels,
    getLevelObj
  };

})(); // Gamification
