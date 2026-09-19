# MQC — Lote previo de integridad (previo a la migración XP 2.0)

**Fecha:** 19 de setiembre de 2026
**Alcance:** las dos partes que autorizaste antes de tocar ningún perfil real:
- **Parte A** — corregir `integrador-estacion` (CÓDIGO REAL, implementado y probado).
- **Parte B** — completar `_xpJuegoVerificable()` (PROPUESTA TÉCNICA, no ejecutada sobre perfiles).

Ningún perfil real fue modificado durante este trabajo. No se tocó `gamification.js`,
`storage.js`, ni ningún perfil ni historial. El único archivo de código real modificado
es `js/modules/integrador.js` (Parte A), exactamente como autorizaste.

---

## PARTE A — Corrección de `integrador-estacion`

### A.1 El hallazgo (confirmado con prueba funcional real, no solo lectura de código)

El Proyecto Integrador Final ("Alerta en el Río Pacuare") tiene 9 pantallas: `e0`
(intro), 7 estaciones de contenido `e1`–`e7` (30 XP cada una vía `'integrador-estacion'`),
y `e8` (informe final, 300 XP vía `'integrador-completado'`, con guarda propia intacta y
no tocada).

El único camino de regreso de todo el flujo es el botón real **"← Revisar el caso"**,
en la pantalla del informe final, que lleva de nuevo a la estación 7. Antes de este fix,
el botón "Continuar" de cada estación otorgaba `awardXP('integrador-estacion')` sin
ninguna guarda persistida:

```js
{ awardXP('integrador-estacion'); next(); }   // ANTES — sin guarda
```

Se construyó un arnés de prueba mínimo (Storage + Gamification + Router + chem.js +
integrador.js reales, servidos localmente, manejados con Playwright) y se completó el
proyecto de punta a punta de forma legítima. Luego, desde la pantalla final, se hizo clic
en "Revisar el caso" → "Continuar" en la estación 7 dos veces consecutivas. Resultado
medido (antes del fix):

```
XP antes de repetir la estación 7 vía "Revisar el caso": 215
XP después de repetir:                                    245
Delta de la repetición:                                     30 XP   (repetible sin límite)
```

Es la misma familia de bug que los 2 hallazgos CRÍTICOS ya corregidos en el Lote 1
(`section-visited` en este mismo módulo, y `element-explored` en la tabla periódica):
un botón real de la interfaz, sin devtools ni trucos, otorgando XP de forma indefinida.

**Consecuencia directa para XP 2.0:** el conteo histórico de eventos
`'integrador-estacion'` en `data.xp.history` de cualquier perfil real **no es
confiable como evidencia** de cuánto XP de estaciones "debería" tener ese perfil —
puede estar inflado por este farmeo. La única evidencia confiable de que las 7
estaciones se completaron alguna vez es `integrador.completado === true` (no se puede
llegar a "completado" sin haber pasado por las 7 estaciones al menos una vez).

### A.2 La corrección implementada

Aditiva, sin tocar `_submitInformeOnce` (guarda de los 300 XP), sin tocar `respuestas`,
sin tocar el significado de `completado`, sin restar XP a nadie ni migrar ningún perfil
existente:

```js
function _estacionYaPremiada(id, st) {
  if (st.completado === true) return true; /* si el proyecto ya está entregado, las
    7 estaciones ya se premiaron en su momento (no hay forma de llegar a
    'completado' sin pasar por las 7) */
  return !!(st.estacionesPremiadas && st.estacionesPremiadas[id]);
}
function _awardEstacionOnce(id) {
  const st = loadState();
  if (_estacionYaPremiada(id, st)) return; /* "Revisar el caso → Continuar" (o
    cualquier reingreso futuro) ya no vuelve a otorgar XP */
  const premiadas = Object.assign({}, st.estacionesPremiadas || {}, { [id]: true });
  saveState(Object.assign({}, st, { estacionesPremiadas: premiadas }));
  awardXP('integrador-estacion');
}
```

Los 7 manejadores de clic de "Continuar" pasaron de `awardXP('integrador-estacion');
next();` a `_awardEstacionOnce('eN'); next();` (N = 1..7). Verificado con `grep` que la
única llamada literal restante a `awardXP('integrador-estacion')` es la de dentro de este
nuevo helper. `node --check js/modules/integrador.js` → sintaxis correcta.

Nótese el diseño "puerta doble": para un perfil **nuevo**, la guarda vive en
`estacionesPremiadas` (una entrada por estación). Para un perfil **ya existente** que
completó el proyecto antes de este fix (y por lo tanto nunca tuvo `estacionesPremiadas`
en su Storage), la guarda se infiere de `completado === true` — sin necesitar escribir
nada nuevo en su perfil. Esto es lo que hace la corrección retroactivamente segura sin
ser una migración.

### A.3 Verificación funcional — 3 escenarios, 15 aserciones, todas correctas

**Escenario A — exactamente la secuencia que pediste (misma sesión, estación 7):**

| # | Verificación | Resultado |
|---|---|---|
| A1 | Primera finalización de la estación 7 | **+30 XP** |
| A2 | "Revisar el caso" → "Continuar" | **+0 XP** |
| A3 | Repetir de nuevo | **+0 XP** |
| A4 | Sin errores de consola | correcto |

**Escenario B — perfil nuevo, las 7 estaciones de punta a punta:**

| # | Verificación | Resultado |
|---|---|---|
| B0 | Perfil nuevo arranca en 0 XP | correcto |
| B1a | Estación 1 (primera vez) | **+35 XP** — 30 de la estación + 5 de `'section-visited'` (primera visita a la sección, guarda ya correcta desde el Lote 1; no es un bug, es un award distinto que cae en la misma ventana de medición) |
| B1b | Estaciones 2 a 7 (primera vez, cada una) | **+30 XP exactos**, cada una |
| B2 | Repetir la estación 7 en el perfil nuevo | **+0 XP** |
| B3 | Entregar el informe final | **+300 XP** (guarda original de `integrador-completado` intacta) |
| B4 | `integrador.completado` queda en `true` | correcto |
| B5 | El texto del informe se guarda sin alteraciones | correcto |

**Escenario C — perfil YA EXISTENTE antes del fix (compatibilidad retroactiva):**
se simuló un perfil con `completado: true` y **sin** la clave `estacionesPremiadas`
(exactamente como habría quedado cualquier perfil real completado antes de subir este
fix), y se repitió el flujo "Revisar el caso → Continuar" sobre la estación 7 después de
una recarga real de página (sesión nueva, no memoria compartida):

| # | Verificación | Resultado |
|---|---|---|
| C0 | El perfil simulado arranca tal cual estaba antes del fix | correcto |
| C1 | Repetir la estación 7 en el perfil pre-existente **no otorga XP** | **+0 XP** — inferido correctamente desde `completado:true`, sin ninguna migración escrita sobre el perfil |
| C2 | El informe del perfil viejo no se modificó ni se borró | correcto |
| C3 | `integrador.completado` del perfil viejo sigue en `true` | correcto |

**Las 15 verificaciones pasaron.** El fix es aditivo, no retroactivo, y compatible con
perfiles existentes, exactamente como pediste.

### A.4 Qué NO se tocó (confirmación explícita)

- `_submitInformeOnce` y los 300 XP de `integrador-completado`: intactos.
- `respuestas` (memoria del módulo): intacto.
- El array `ESTACIONES` y la lógica de cada una de las 7 estaciones: intacta.
- Ningún perfil real: no se ejecutó ninguna escritura sobre datos reales, solo sobre
  perfiles simulados dentro del arnés de prueba.
- `gamification.js`, `storage.js`, Analytics: no se tocaron.

---

## PARTE B — Completar `_xpJuegoVerificable()` (propuesta técnica, no ejecutada)

### B.1 Método

Se inspeccionó el código real de los 27 archivos de unidad (`js/units/unit-01..09.js`,
`js/units/grade11/g11-u01..04.js`, `js/units/fisica10/fix10-u01..08.js`,
`js/units/fisica11/fix11-u01..06.js`) para identificar, unidad por unidad, exactamente
qué evidencia queda persistida por cada mecánica de juego y qué monto de XP le
corresponde según `js/core/gamification.js`. **No se leyó ningún perfil real** — solo el
código de los módulos.

Esto reemplaza la clasificación "Familia A/B/C/D" del diagnóstico original por una
basada en el mecanismo real verificado en el código actual (algunas unidades cambiaron
de comportamiento en los Lotes 1–2 sin que la clasificación original se actualizara).
Se confirmaron 4 mecanismos, no 4 grupos de unidades idénticos a los originales:
las antiguas "Familia A" (unidad 1) y "Familia B" (unidades 2–7) resultaron ser,
después de las correcciones ya aplicadas en Lotes previos, **el mismo mecanismo**
(la diferencia original era solo cosmética: cómo se calcula el puntaje por caso, no
cuánto XP se otorga).

### B.2 Los 4 mecanismos reales, con su riesgo de reconstrucción

| Mecanismo | Unidades (27 en total) | Evidencia persistida | Otorgamiento real | Riesgo para XP 2.0 |
|---|---|---|---|---|
| **Niveles con ratchet de récord** | Química 10.º, unit-01 a unit-07 (7 unidades) — 3 niveles fijos cada una | `gameLevels[]` (niveles APROBADOS), `gameLevelsPlayed[]` (niveles INTENTADOS), `gameScore` (mejor puntaje histórico, un solo número por unidad) | Por nivel: `game-won` (60) la 1.ª vez que se aprueba, o `game-played` (30) si se intentó sin aprobar — guardado, no se repite. **Además**, cada vez que el puntaje total de la unidad supera su propio récord anterior: `game-highscore` (100), **sin límite de repeticiones** más que la granularidad del puntaje (ej. unit-01 permite subir el récord en escalones de 25 pts hasta 500, es decir hasta ~20 disparos posibles) | **ALTO** — `game-highscore` no deja rastro de cuántas veces se disparó; el estado persistido (`gameScore` final) no permite saber si se disparó 1 vez o 15 |
| **Niveles mutuamente excluyentes** | Química 10.º, unit-08 y unit-09 (2 unidades) — 3 niveles fijos cada una | `gameLevels[]`, `gameLevelsPlayed[]` (mismos campos, sin `gameScore` ratchet global relevante para XP) | Por nivel, SOLO la 1.ª vez que se aprueba: `game-highscore` (100) si fue una corrida perfecta, o `game-won` (60) si no — nunca ambos, y nunca se repite una vez aprobado (aunque se rejuegue "perfecto" después) | **MEDIO** — el otorgamiento no se repite (a diferencia del anterior), pero el estado persistido no distingue si la aprobación fue perfecta (100) o no (60) |
| **Puntuación continua con ratchet** | Química 11.º, g11-u01 a g11-u04 (4 unidades) — un solo juego de rondas, sin niveles discretos | `gameXpAwarded` (booleano, otorgamiento único ya ocurrido o no), `gameScore` (mejor % histórico) | Solo la 1.ª ronda jugada jamás: `game-won` (60) si `% ≥ 60`, o `game-played` (30) si no — guardado por `gameXpAwarded`. Cada vez que el % supera el récord anterior: `game-highscore` (100), mismo ratchet sin límite que el primer mecanismo | **ALTO** — mismo problema de ratchet no reconstruible, más una ambigüedad adicional: el `gameScore` actual puede haber mejorado DESPUÉS del otorgamiento único, por lo que no indica con certeza si ese otorgamiento fue de 60 o 30 |
| **Escenarios discretos sin ratchet** | Física 10.º y 11.º, las 14 unidades (fix10-u01..08, fix11-u01..06) — de 5 a 9 escenarios según la unidad | `gameLevels[]` (escenarios resueltos, cada uno guardado individualmente y para siempre) | Por cada escenario resuelto por primera vez: `game-played` (30), salvo el ÚLTIMO escenario de la unidad (el que completa el 100%), que otorga `game-won` (60) en su lugar. Sin ratchet de puntaje de ningún tipo | **NINGUNO** — es el único mecanismo totalmente determinista: el estado persistido permite reconstruir el XP de juego con exactitud matemática, no una estimación |

### B.3 Corrección a la fórmula propuesta en la V2 del plan de migración

Al inspeccionar el código real del examen (`finishExam()` en las 27 unidades), se
confirmó que la guarda de `exam-done` (40 XP) es un campo booleano explícito,
`examXpAwarded`, que **solo se vuelve verdadero si el examen se aprobó** — no basta con
haberlo intentado. La pseudocódigo de la V2 (`if (u.examAttempts > 0) total += 40;`)
sobreestimaría a cualquier estudiante que intentó el examen pero nunca lo aprobó. Se
corrige a:

```js
if (u.examXpAwarded === true) total += 40;   // CORREGIDO — antes decía examAttempts>0
```

Esta es exactamente la clase de error que el principio "subestimar es seguro; sobreestimar
no lo es" está diseñado para atrapar antes de tocar un perfil real.

También se confirmó que `(u.simsDone || []).length * 50` (ya presente en la V2) es
correcto y deliberadamente conservador: el código real otorga 50 XP (`simulator-done`) o
80 XP (`simulator-perfect`) según el puntaje, pero `simsDone` solo guarda **qué**
simuladores se completaron, no si fueron perfectos — así que asumir 50 por simulador
subestima en vez de sobreestimar, correctamente.

### B.4 `_xpJuegoVerificable()` completo (conceptual — no implementado en código real)

```js
/* Mapa de mecánica de juego por unidad, construido a partir de la inspección real
   de los 27 archivos js/units/** — no de la agrupación original del diagnóstico. */
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
  'fix11-u05':'ESCENARIOS_SIN_RATCHET', 'fix11-u06':'ESCENARIOS_SIN_RATCHET'
};

/* Total de escenarios de juego por unidad de Física (varía por unidad;
   Química 10.º y Química 11.º siempre usan 3 niveles fijos, no varían). */
const _TOTAL_ESCENARIOS_FISICA = {
  'fix10-u01':5, 'fix10-u02':5, 'fix10-u03':6, 'fix10-u04':6, 'fix10-u05':6,
  'fix10-u06':8, 'fix10-u07':9, 'fix10-u08':7,
  'fix11-u01':7, 'fix11-u02':7, 'fix11-u03':7, 'fix11-u04':7, 'fix11-u05':7, 'fix11-u06':7
};

function _xpJuegoVerificable(unitId, u) {
  const familia  = _FAMILIA_JUEGO[unitId];
  const jugados  = Array.isArray(u.gameLevels)      ? u.gameLevels      : [];
  const intentos = Array.isArray(u.gameLevelsPlayed) ? u.gameLevelsPlayed : [];

  switch (familia) {
    case 'RATCHET_NIVELES':
    case 'NIVELES_EXCLUSIVOS': {
      /* gameLevels = niveles APROBADOS (60 c/u, nunca 100: el estado
         persistido no distingue si la aprobación fue perfecta).
         gameLevelsPlayed − gameLevels = niveles intentados sin aprobar
         (30 c/u). El ratchet de game-highscore (RATCHET_NIVELES) NUNCA
         se cuenta aquí: no es reconstruible desde el estado persistido,
         y permanece únicamente en XP_HISTORICO_REGISTRADO. */
      const noAprobados = intentos.filter(id => !jugados.includes(id));
      return jugados.length * 60 + noAprobados.length * 30;
    }
    case 'RATCHET_CONTINUO': {
      /* Un único otorgamiento histórico posible. Se asume el monto
         garantizado más bajo (30) porque gameScore puede haber
         mejorado DESPUÉS de ese otorgamiento único, y no hay evidencia
         persistida de qué porcentaje tenía la primera ronda jugada.
         El ratchet de game-highscore, igual que arriba, queda fuera. */
      return u.gameXpAwarded === true ? 30 : 0;
    }
    case 'ESCENARIOS_SIN_RATCHET': {
      /* Única familia sin ambigüedad: cada escenario se otorga una
         sola vez, guardado individualmente, sin ratchet. El resultado
         es EXACTO, no una subestimación. */
      const total = _TOTAL_ESCENARIOS_FISICA[unitId] || 0;
      if (jugados.length === 0) return 0;
      if (jugados.length >= total) return 30 * (total - 1) + 60;
      return 30 * jugados.length;
    }
    default:
      return 0; /* unidad no reconocida: no se le atribuye XP de juego */
  }
}
```

### B.5 Demostración con 5 perfiles ficticios (ningún dato real)

| Perfil ficticio | Unidad | Evidencia persistida (simulada) | `_xpJuegoVerificable` | Nota |
|---|---|---|---|---|
| 1 — histórico con ratchet | unit-02 | `gameLevels:['novato','constructor']`, `gameLevelsPlayed:['novato','constructor','experto']` | 2×60 + 1×30 = **150 XP** | Si el historial real registrara, por ejemplo, 3 disparos de `game-highscore` (300 XP adicionales), esos 300 XP **no se reconstruyen** — quedan solo en `XP_HISTORICO_REGISTRADO`. Así se cumple "subestimar es seguro". |
| 2 — niveles exclusivos, los 3 aprobados | unit-08 | `gameLevels:['aprendiz','conocedor','experto']`, mismos en `gameLevelsPlayed` | 3×60 = **180 XP** | Aunque el historial real pudiera reflejar hasta 300 XP si las 3 aprobaciones fueron perfectas, la reconstrucción asume el mínimo garantizado (60/nivel). |
| 3 — Química 11.º, otorgamiento único | g11-u02 | `gameXpAwarded:true`, `gameScore:85` | **30 XP** | El 85% actual sugiere que probablemente ganó los 60 en su momento, pero no hay certeza — se subestima a 30. |
| 4 — Física, unidad completa | fix10-u01 (5 escenarios) | `gameLevels:['nivel1','nivel2','nivel3','nivel4','nivel5']` | 30×4 + 60 = **180 XP** | Exacto, no una estimación — este mecanismo no tiene ambigüedad. |
| 5 — Física, unidad parcial | fix11-u03 (7 escenarios) | `gameLevels:['nivel1','nivel2','nivel3']` | 30×3 = **90 XP** | Exacto: como no completó los 7, ninguno de los 3 resueltos puede ser "el último" (bonus de 60), así que los 3 valen 30 cada uno con certeza. |

En los 5 casos, el monto reconstruido es **igual o menor** al monto que el historial
real podría reflejar — nunca mayor. Ningún perfil ficticio recibe más XP de juego del
que su estado persistido puede justificar con certeza, tal como pediste.

### B.6 Hallazgo nuevo que esto expone (para tu conocimiento, no se corrige aquí)

La mecánica de ratchet (`game-highscore`, disparado cada vez que se supera el propio
récord) existe en 11 de las 27 unidades (las 7 de "Niveles con ratchet" + las 4 de
Química 11.º) y no tiene guarda de repetición — a diferencia de `game-won`/`game-played`,
que sí se corrigieron en Lotes anteriores (comentarios `FIX-XP-02`/`FIX-XP-02b` en el
código). No es una guarda rota como la de `integrador-estacion` (no es tan fácil de
explotar desde la interfaz normal — requiere mejorar el propio puntaje repetidamente en
pasos pequeños), pero es la misma familia de riesgo. **No se toca en este lote** —
Bryan no pidió corregirla, y correrla sin autorización violaría "no modificar
`gamification.js`". Se deja documentada para una decisión futura, separada de la
migración XP 2.0 (que ya la trata correctamente al excluirla de la reconstrucción
verificable).

---

## Resumen y qué sigue

| Parte | Estado |
|---|---|
| A — guarda de `integrador-estacion` | **Implementada y verificada** (15/15 pruebas), lista para subir a GitHub |
| B — tabla y fórmula de `_xpJuegoVerificable()` | **Propuesta técnica completa**, no ejecutada sobre ningún perfil |
| Migración XP 2.0 (perfiles reales) | **No iniciada** — a la espera de tu aprobación explícita |

Pendientes que siguen en espera, sin cambios en este lote: PENDIENTE A (Acerca de la
Plataforma), PENDIENTE B (sidebar académico), PENDIENTE C (contexto `{disciplina,grado}`
de la Bitácora, a integrarse junto con la migración XP 2.0), y Biología.
