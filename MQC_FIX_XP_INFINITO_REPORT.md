# MQC_FIX_XP_INFINITO_REPORT.md
## Auditoría y corrección del bug de XP infinito — las 13 unidades

**Fecha:** 2026-08-25
**Archivos del núcleo tocados:** `gamification.js` (tope de XP) — justificado por pedido explícito y específico.
**Archivos de unidades tocados:** las 13 (`unit-01`..`unit-09`, `g11-u01`..`g11-u04`) — mismo caso, pedido explícito y específico, dado que el bug ya estaba confirmado y afectaba a perfiles reales.

---

## 1. Resumen del problema

Se confirmaron **3 puntos de exploit** repetidos en las 13 unidades, más un tope de seguridad agregado a nivel global:

| # | Bug | Dónde | Cómo se explotaba |
|---|---|---|---|
| 1 | **Tema releído** | Las 13 unidades | Abrir/cerrar y volver a marcar el mismo tema como "leído" repetía el XP cada clic |
| 2 | **Juego repetido** | Las 13 unidades | Terminar la misma ronda/nivel una y otra vez repetía el XP completo, sin límite |
| 2b | **XP al solo iniciar** (variante más grave) | Solo `unit-01.js` | Bastaba tocar "Jugar" y salir — ni siquiera hacía falta responder una pregunta — para ganar XP, indefinidamente |
| 3 | **Examen reaprobado** | Las 13 unidades | Volver a aprobar un examen ya aprobado antes repetía el XP completo |

## 2. Tope de seguridad global (gamification.js)

Se agregó un límite duro: el XP total de un perfil **nunca puede superar 15,000** (el mismo número del nivel máximo, "Leyenda Química" — tomado del propio arreglo de niveles, no un número suelto, así que si algún día agregás un nivel 11 el tope se ajusta solo).

- **Protege contra cualquier bug de XP, presente o futuro**, en cualquier unidad, sin necesidad de auditar cada punto de otorgamiento uno por uno.
- **Los perfiles que ya tienen 40,000 XP no se tocaron ahora** — como pediste, quedan así. El tope se les aplica automáticamente la próxima vez que ganen XP de cualquier fuente (se ajustan solos a 15,000 en ese momento).
- Probado: sumar 100,000 XP de una sola vez ahora resulta en exactamente 15,000, nivel 10.

## 3. Corrección por archivo

Todas las correcciones siguen el mismo principio: **otorgar el XP la primera vez que se logra algo, nunca en repeticiones**, reutilizando siempre que existía un array/bandera ya persistido por el propio Storage (`topicsRead`, `gameLevels`) para no inventar estructuras nuevas innecesarias, y agregando solo los dos campos mínimos que hacían falta (`gameLevelsPlayed` para "intentaste pero no aprobaste", `examXpAwarded` y `gameXpAwarded` para el resto).

| Archivo | Bug 1 (tema) | Bug 2 (juego) | Bug 2b (inicio) | Bug 3 (examen) |
|---|---|---|---|---|
| `unit-01.js` | ✅ Corregido | ✅ Corregido (XP por nivel individual, no por intento) | ✅ **Eliminado por completo** | ✅ Corregido |
| `unit-02.js` a `unit-07.js` (6 archivos) | ✅ Corregido | ✅ Corregido | ✅ Eliminado | ✅ Corregido |
| `unit-08.js`, `unit-09.js` | ✅ Corregido | ✅ Corregido | *(no aplicaba — estas 2 no tenían el bug de inicio)* | ✅ Corregido |
| `g11-u01.js`, `g11-u03.js`, `g11-u04.js` | ✅ Corregido | ✅ Corregido | *(no aplicaba)* | ✅ Corregido |
| `g11-u02.js` (Concentraciones) | ✅ Ya corregido en la entrega anterior | ✅ Ya corregido | *(no aplicaba)* | ✅ Ya corregido |

**Nota sobre `unit-01.js`:** a diferencia del resto (que tienen una sola ronda de juego por unidad), esta unidad tiene **varios niveles distintos** dentro del mismo juego. El arreglo respeta eso: podés seguir ganando XP una vez por CADA nivel distinto que completes, solo que ya no podés repetir el mismo nivel para ganar XP infinito.

**Lo que NO se tocó (ya estaba bien):** `markSimDone()` (simuladores) y `grade11-mission-done` (misión final de 11.º) ya tenían su propio control correcto desde antes en las 13 unidades — se dejaron exactamente igual.

## 4. Pruebas realizadas (Chromium real)

| # | Prueba | Resultado |
|---|---|---|
| 1 | `node --check` en los 13 archivos de unidades + `gamification.js` | ✅ Sin errores |
| 2 | Tope de 15,000 XP tras sumar 100,000 | ✅ Queda exactamente en 15,000 |
| 3 | Repetir "ganar" el mismo nivel 3 veces seguidas (patrón `unit-03`, representativo de 7 archivos) | ✅ Solo se otorgan los 60 XP una vez |
| 4 | Aprobar el mismo examen 3 veces seguidas (patrón `unit-08`) | ✅ Solo se otorgan los 40 XP una vez |
| 5 | Releer el mismo tema 3 veces seguidas (patrón `g11-u01`, representativo de 3 archivos) | ✅ Ganancia de XP: cero |
| 6 | **Prueba con clics reales** (no simulados) en `unit-01`: entrar y salir del juego 3 veces sin jugar ninguna pregunta | ✅ El XP se mantuvo exactamente igual las 3 veces — el bug más grave (XP con solo tocar "Jugar") quedó cerrado |
| 7 | No regresión: navegación completa (Inicio, Unidades, 11.º, Tabla Periódica, Progreso, Atlas, Acerca de) en desktop/iPhone/Android | ✅ Sin errores de consola en ningún caso |

## 5. Archivos a subir

Los 12 archivos de esta entrega (el 13.º, `g11-u02.js`, ya se subió en la entrega anterior):

| Archivo | Va en |
|---|---|
| `unit-01.js` … `unit-09.js` | `js/units/` |
| `g11-u01.js`, `g11-u03.js`, `g11-u04.js` | `js/units/grade11/` |

(`gamification.js`, con el tope de 15,000, ya se subió en la entrega anterior junto con `g11-u02.js`.)

## 6. Qué NO cambia para los estudiantes

- El XP ya ganado hasta ahora **no se resta ni se recalcula** — nadie pierde nada de lo que ya tiene (salvo el tope de 15,000, que solo aplica hacia adelante y solo a quien ya lo supere).
- El resto de la experiencia (contenido, exámenes, juegos, simuladores, progreso, insignias) sigue funcionando exactamente igual — estos cambios son puramente sobre CUÁNDO se otorga el XP, nunca sobre el contenido académico en sí.
