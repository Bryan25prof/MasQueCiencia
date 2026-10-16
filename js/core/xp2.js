/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/core/xp2.js  |  XP 2.0 — Progresión disciplinar
   ================================================================
   AUDITORÍA FASE 2 — Lote XP 2.0 (set-2026). Arquitectura aprobada
   por Bryan Chavarría: XP separado por disciplina (Química, Física,
   futura Biología), cada una con su propia progresión de rangos.
   XP_GLOBAL es un valor DERIVADO (nunca almacenado) de los XP
   disciplinares — sin niveles ni títulos propios.

   Este archivo es 100% ADITIVO y NO reemplaza nada de gamification.js
   ni storage.js:
   - El sistema histórico de 12 niveles y `data.xp.total` sigue
     funcionando EXACTAMENTE igual que antes (ver nota en
     gamification.js sobre por qué no se congela `data.xp.total`).
   - `data.xpQuimica` / `data.xpFisica` / `data.xpBiologia` /
     `data.xpTransversal` son acumuladores NUEVOS, en paralelo.
   - La reconstrucción histórica (XP2.ensureMigrated) corre UNA SOLA
     VEZ por perfil (perfiles nuevos incluidos — para un perfil nuevo,
     simplemente reconstruye 0, que es el resultado correcto), nunca
     se vuelve a ejecutar, y NUNCA modifica `data.xp` ni ningún otro
     campo histórico.

   PRINCIPIO DE DISEÑO (aprobado explícitamente por Bryan):
   "Subestimar es seguro (nunca le atribuye a un estudiante XP que no
   demostró tener); sobreestimar no lo es." Toda ambigüedad en la
   reconstrucción se resuelve hacia el monto MÁS BAJO posible.
================================================================ */

const XP2 = (() => {
  'use strict';

  /* ================================================================
     RANGOS POR DISCIPLINA (aprobados por Bryan, ~6 rangos c/u)
     ================================================================
     Química: Leyenda Química se conserva como rango máximo histórico,
     umbral aprobado en 8.500 XP. Física: nombres provisionales (curva
     equivalente). Biología: sin rangos todavía — no hay contenido real
     ni XP legítimo que calibrar (se diseñan cuando exista).
  ================================================================ */
  const RANGOS_QUIMICA = [
    { rango: 1, nombre: 'Átomo Novato',       icon: '⚛️', xp: 0    },
    { rango: 2, nombre: 'Molécula Curiosa',    icon: '🔵', xp: 500  },
    { rango: 3, nombre: 'Científico Junior',   icon: '🔬', xp: 1500 },
    { rango: 4, nombre: 'Químico Avanzado',    icon: '🌟', xp: 3200 },
    { rango: 5, nombre: 'Maestro Cuántico',    icon: '💎', xp: 5800 },
    { rango: 6, nombre: 'Leyenda Química',     icon: '👑', xp: 8500 }
  ];
  const RANGOS_FISICA = [
    { rango: 1, nombre: 'Partícula en Reposo',        icon: '⚛️', xp: 0    },
    { rango: 2, nombre: 'Fuerza en Movimiento',       icon: '🌀', xp: 500  },
    { rango: 3, nombre: 'Onda en Expansión',          icon: '🌊', xp: 1500 },
    { rango: 4, nombre: 'Físico de Campo',            icon: '🧭', xp: 3200 },
    { rango: 5, nombre: 'Maestro del Espacio-Tiempo', icon: '🌌', xp: 5800 },
    { rango: 6, nombre: 'Leyenda de la Física',       icon: '👑', xp: 8500 }
  ];
  /* Biología — rangos aprobados por Bryan (oct-2026). Calibrados sobre el
     máximo legítimo REAL de Biología: 8 145 XP (10.º: 5 295 en 9
     unidades; 11.º: 2 850 en 5 unidades), calculado con la misma fórmula
     que reproduce exactamente el 8 880 de Física. El umbral final (7 700)
     queda en el 94,5 % del máximo, paralelo al 95,7 % de Física.
     Los dos grados alimentan la MISMA ciencia: no hay rangos por grado.
     Con solo 10.º completo (5 295 XP) el estudiante queda en el rango 4,
     a 105 XP del 5: para subir hay que abrir 11.º. */
  const RANGOS_BIOLOGIA = [
    { rango: 1, nombre: 'Semilla Curiosa',           icon: '🌱', xp: 0    },
    { rango: 2, nombre: 'Observador de la Vida',     icon: '🍃', xp: 450  },
    { rango: 3, nombre: 'Explorador de Ecosistemas', icon: '🦋', xp: 1400 },
    { rango: 4, nombre: 'Biólogo en Formación',      icon: '🧬', xp: 3000 },
    { rango: 5, nombre: 'Guardián de la Biodiversidad', icon: '🌎', xp: 5400 },
    { rango: 6, nombre: 'Leyenda de la Biología',    icon: '🌳', xp: 7700 }
  ];

  function getRango(disciplina, xpTotal) {
    const tabla = disciplina === 'quimica' ? RANGOS_QUIMICA
                : disciplina === 'fisica'  ? RANGOS_FISICA
                : disciplina === 'biologia' ? RANGOS_BIOLOGIA
                : null;
    if (!tabla) return null;
    const xp = Math.max(0, xpTotal || 0);
    let actual = tabla[0];
    for (let i = 0; i < tabla.length; i++) {
      if (xp >= tabla[i].xp) actual = tabla[i]; else break;
    }
    const idx = tabla.indexOf(actual);
    const next = tabla[idx + 1] || null;
    return {
      rango: actual.rango, nombre: actual.nombre, icon: actual.icon,
      xp: xp, xpActual: actual.xp, xpSiguiente: next ? next.xp : null,
      maxed: !next
    };
  }

  /* XP_GLOBAL — SIEMPRE derivado, nunca un contador propio (evita
     desincronización). Por decisión explícita de Bryan, NO incluye
     xpTransversal (PNE, login diario, rachas, etc.) salvo que se
     autorice lo contrario más adelante. */
  function getGlobal(data) {
    const q = (data.xpQuimica  && data.xpQuimica.total)  || 0;
    const f = (data.xpFisica   && data.xpFisica.total)   || 0;
    const b = (data.xpBiologia && data.xpBiologia.total) || 0;
    return q + f + b;
  }

  /* ================================================================
     _xpJuegoVerificable() — Parte B del lote de preintegridad,
     trasladada aquí como código real. Ver
     MQC_LOTE_PREINTEGRIDAD_XP2_REPORTE.md sección B para la
     justificación completa de cada mecanismo, verificada contra el
     código real de los 27 archivos js/units/**.
     ================================================================ */
  const _FAMILIA_JUEGO = {
    'unit-01':'RATCHET_NIVELES', 'unit-02':'RATCHET_NIVELES', 'unit-03':'RATCHET_NIVELES',
    'unit-04':'RATCHET_NIVELES', 'unit-05':'RATCHET_NIVELES', 'unit-06':'RATCHET_NIVELES',
    'unit-07':'RATCHET_NIVELES',
    'unit-08':'NIVELES_EXCLUSIVOS', 'unit-09':'NIVELES_EXCLUSIVOS',
    'g11-u01':'RATCHET_CONTINUO', 'g11-u02':'RATCHET_CONTINUO',
    'g11-u03':'RATCHET_CONTINUO', 'g11-u04':'RATCHET_CONTINUO',
    'fix10-u01':'ESCENARIOS_SIN_RATCHET', 'fix10-u02':'ESCENARIOS_SIN_RATCHET',
    'fix10-u03':'ESCENARIOS_SIN_RATCHET', 'fix10-u04':'ESCENARIOS_SIN_RATCHET',
    'fix10-u05':'ESCENARIOS_SIN_RATCHET', 'fix10-u06':'ESCENARIOS_SIN_RATCHET',
    'fix10-u07':'ESCENARIOS_SIN_RATCHET', 'fix10-u08':'ESCENARIOS_SIN_RATCHET',
    'fix11-u01':'ESCENARIOS_SIN_RATCHET', 'fix11-u02':'ESCENARIOS_SIN_RATCHET',
    'fix11-u03':'ESCENARIOS_SIN_RATCHET', 'fix11-u04':'ESCENARIOS_SIN_RATCHET',
    'fix11-u05':'ESCENARIOS_SIN_RATCHET', 'fix11-u06':'ESCENARIOS_SIN_RATCHET',
    /* Biología 10.º/11.º: mismo mecanismo que Física (cada nivel se
       otorga una sola vez, guardado en gameLevels; el nivel que completa
       el juego paga 60 y los demás 30) — resultado EXACTO. */
    'bio10-u01':'ESCENARIOS_SIN_RATCHET', 'bio10-u02':'ESCENARIOS_SIN_RATCHET',
    'bio10-u03':'ESCENARIOS_SIN_RATCHET', 'bio10-u04':'ESCENARIOS_SIN_RATCHET',
    'bio10-u05':'ESCENARIOS_SIN_RATCHET', 'bio10-u06':'ESCENARIOS_SIN_RATCHET',
    'bio10-u07':'ESCENARIOS_SIN_RATCHET', 'bio10-u08':'ESCENARIOS_SIN_RATCHET',
    'bio10-u09':'ESCENARIOS_SIN_RATCHET',
    'bio11-u01':'ESCENARIOS_SIN_RATCHET', 'bio11-u02':'ESCENARIOS_SIN_RATCHET',
    'bio11-u03':'ESCENARIOS_SIN_RATCHET', 'bio11-u04':'ESCENARIOS_SIN_RATCHET',
    'bio11-u05':'ESCENARIOS_SIN_RATCHET'
  };
  const _TOTAL_ESCENARIOS_FISICA = {
    'fix10-u01':5, 'fix10-u02':5, 'fix10-u03':6, 'fix10-u04':6, 'fix10-u05':6,
    'fix10-u06':8, 'fix10-u07':9, 'fix10-u08':7,
    'fix11-u01':7, 'fix11-u02':7, 'fix11-u03':7, 'fix11-u04':7, 'fix11-u05':7, 'fix11-u06':7,
    /* Biología: 5 niveles de juego en las 14 unidades (verificado en cada
       NIVELES_JUEGO de js/units/biologia10 y biologia11). */
    'bio10-u01':5, 'bio10-u02':5, 'bio10-u03':5, 'bio10-u04':5, 'bio10-u05':5,
    'bio10-u06':5, 'bio10-u07':5, 'bio10-u08':5, 'bio10-u09':5,
    'bio11-u01':5, 'bio11-u02':5, 'bio11-u03':5, 'bio11-u04':5, 'bio11-u05':5
  };

  function _xpJuegoVerificable(unitId, u) {
    const familia  = _FAMILIA_JUEGO[unitId];
    const jugados  = Array.isArray(u.gameLevels)       ? u.gameLevels       : [];
    const intentos = Array.isArray(u.gameLevelsPlayed) ? u.gameLevelsPlayed : [];

    switch (familia) {
      case 'RATCHET_NIVELES':
      case 'NIVELES_EXCLUSIVOS': {
        /* gameLevels = niveles APROBADOS (60 c/u, nunca 100: el estado
           persistido no distingue si la aprobación fue perfecta).
           gameLevelsPlayed − gameLevels = intentados sin aprobar
           (30 c/u). El ratchet de game-highscore NUNCA se cuenta
           aquí — no es reconstruible, permanece solo en
           XP_HISTORICO_REGISTRADO (data.xp.total/history). */
        const noAprobados = intentos.filter(id => !jugados.includes(id));
        return jugados.length * 60 + noAprobados.length * 30;
      }
      case 'RATCHET_CONTINUO': {
        /* Un único otorgamiento histórico posible. Se asume el monto
           garantizado más bajo (30): gameScore puede haber mejorado
           DESPUÉS de ese otorgamiento único, sin evidencia persistida
           de qué % tenía la primera ronda jugada. */
        return u.gameXpAwarded === true ? 30 : 0;
      }
      case 'ESCENARIOS_SIN_RATCHET': {
        /* Única familia sin ambigüedad: cada escenario se otorga una
           sola vez, guardado individualmente, sin ratchet. Resultado
           EXACTO, no una subestimación. */
        const total = _TOTAL_ESCENARIOS_FISICA[unitId] || 0;
        if (jugados.length === 0) return 0;
        if (jugados.length >= total) return 30 * (total - 1) + 60;
        return 30 * jugados.length;
      }
      default:
        return 0; /* unidad no reconocida: no se le atribuye XP de juego */
    }
  }

  /* ================================================================
     Reconstrucción de XP_VERIFICABLE por disciplina. Solo lee datos
     ya persistidos — nunca escribe, nunca adivina. CORRECCIÓN vs. la
     V2 del plan de migración: el examen se verifica con
     `examXpAwarded === true` (campo real confirmado en los 27
     archivos de unidad), no con `examAttempts > 0` (que sobreestimaría
     a quien intentó el examen sin aprobarlo).
     ================================================================ */
  const _UNITS_QUIMICA10 = ['unit-01','unit-02','unit-03','unit-04','unit-05','unit-06','unit-07','unit-08','unit-09'];
  const _UNITS_QUIMICA11 = ['g11-u01','g11-u02','g11-u03','g11-u04'];
  const _UNITS_FISICA10  = ['fix10-u01','fix10-u02','fix10-u03','fix10-u04','fix10-u05','fix10-u06','fix10-u07','fix10-u08'];
  const _UNITS_FISICA11  = ['fix11-u01','fix11-u02','fix11-u03','fix11-u04','fix11-u05','fix11-u06'];
  const _UNITS_BIOLOGIA10 = ['bio10-u01','bio10-u02','bio10-u03','bio10-u04','bio10-u05','bio10-u06','bio10-u07','bio10-u08','bio10-u09'];
  const _UNITS_BIOLOGIA11 = ['bio11-u01','bio11-u02','bio11-u03','bio11-u04','bio11-u05'];

  /* Química 10.º (unit-01..09): sin campo `missionDone` (no existía
     esa mecánica cuando se construyeron). */
  function _xpUnidadBase(unitId, u, conMision) {
    if (!u) return 0;
    let total = 0;
    if (u.started) total += 25;
    total += (u.topicsRead || []).length * 15;
    total += (u.simsDone   || []).length * 50;
    total += _xpJuegoVerificable(unitId, u);
    if (u.examXpAwarded === true) total += 40;
    if (conMision && u.missionDone) total += 100;
    return total;
  }

  function calcularXPVerificableQuimica(data) {
    let total = 0;
    const unitsQ10 = data.units   || {};
    const unitsQ11 = data.grade11 || {};
    _UNITS_QUIMICA10.forEach(id => { total += _xpUnidadBase(id, unitsQ10[id], false); });
    _UNITS_QUIMICA11.forEach(id => { total += _xpUnidadBase(id, unitsQ11[id], true);  });

    /* Proyecto Integrador Final — 510 XP verificables SOLO por
       `completado === true` (única fuente de verdad confiable; el
       conteo de eventos 'integrador-estacion' en el historial NO es
       confiable como evidencia — ver hallazgo del lote de
       preintegridad: era repetible antes del fix). Se cuenta bajo
       Química por convención (ver reporte de implementación). */
    const integ = data.integrador || {};
    if (integ.completado === true) total += 510;

    /* Tabla Periódica — 5 XP por elemento explorado, guarda sólida
       (una sola vez por elemento, para siempre). */
    const explorados = (data.settings && data.settings._exploredElements) || [];
    total += explorados.length * 5;

    return total;
  }

  function calcularXPVerificableFisica(data) {
    let total = 0;
    const unitsF10 = data.fisica10 || {};
    const unitsF11 = data.fisica11 || {};
    _UNITS_FISICA10.forEach(id => { total += _xpUnidadBase(id, unitsF10[id], true); });
    _UNITS_FISICA11.forEach(id => { total += _xpUnidadBase(id, unitsF11[id], true); });
    return total;
  }

  /* Biología — reconstrucción verificable desde lo ya persistido en
     data.biologia10 / data.biologia11 (started, topicsRead, simsDone,
     gameLevels, examXpAwarded, missionDone). Misma fórmula que Física:
     máximo 8 145 XP (10.º 5 295 + 11.º 2 850). Solo lee, nunca escribe.
     Antes de oct-2026 devolvía 0 porque no existía contenido real; con 14
     unidades publicadas, devolver 0 habría borrado el XP de Biología de
     todos los perfiles al migrar (ensureMigrated asigna). */
  function calcularXPVerificableBiologia(data) {
    let total = 0;
    const unitsB10 = (data && data.biologia10) || {};
    const unitsB11 = (data && data.biologia11) || {};
    _UNITS_BIOLOGIA10.forEach(id => { total += _xpUnidadBase(id, unitsB10[id], true); });
    _UNITS_BIOLOGIA11.forEach(id => { total += _xpUnidadBase(id, unitsB11[id], true); });
    return total;
  }

  /* ================================================================
     Migración única — se ejecuta la primera vez que se carga CADA
     perfil (nuevos y existentes por igual: un perfil nuevo reconstruye
     0, que es el resultado correcto). Guardado por `data.xp2.migradoAt`
     — nunca se vuelve a correr para ese perfil. NO toca `data.xp` ni
     ningún otro campo histórico.
     ================================================================ */
  function ensureMigrated(data) {
    if (!data || !data.xp2) return data;
    if (data.xp2.migradoAt) return data; /* ya migrado — no volver a calcular NUNCA */

    /* Se conserva el MAYOR entre el acumulador actual y la reconstrucción
       (oct-2026). Un perfil ya acumula XP por disciplina con el código en
       producción antes de que esta migración corra; asignar la
       reconstrucción a secas podía BAJARLO (en Biología, a 0). Ambos
       valores cuentan los mismos eventos, así que el máximo nunca suma
       dos veces. Subestimar sigue siendo seguro; borrar XP ganado no. */
    const _mayor = (actual, rec) => Math.max(Number.isFinite(actual) ? actual : 0, rec);
    data.xpQuimica.total  = _mayor(data.xpQuimica.total,  calcularXPVerificableQuimica(data));
    data.xpFisica.total   = _mayor(data.xpFisica.total,   calcularXPVerificableFisica(data));
    data.xpBiologia.total = _mayor(data.xpBiologia.total, calcularXPVerificableBiologia(data));
    /* xpTransversal.total queda en 0: no hay evidencia retroactiva
       fiable de cuántos eventos transversales (PNE, login diario,
       rachas) fueron realmente transversales puros en el historial
       viejo sin mezcla — arranca en 0 y crece solo con eventos NUEVOS
       ya correctamente etiquetados. */
    data.xp2.migradoAt = Date.now();
    data.xp2.migradoVersion = 1;
    return data;
  }

  return {
    RANGOS_QUIMICA,
    RANGOS_FISICA,
    RANGOS_BIOLOGIA,
    getRango,
    getGlobal,
    ensureMigrated,
    calcularXPVerificableQuimica,
    calcularXPVerificableFisica,
    calcularXPVerificableBiologia,
    _xpJuegoVerificable /* expuesto solo para pruebas */
  };

})(); // XP2
