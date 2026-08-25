# HOTFIX_RENAME_PNE10_FINAL_EXAM_REPORT.md
## PNE 10.° → Examen Final 10.°

**Fecha:** 2026-08-24
**Alcance:** exclusivamente texto visible (etiquetas, títulos, botones). Cero cambios de lógica, IDs internos, claves de `Storage`, identificadores de examen, Analytics o RLS.

---

## 1. Causa

Se hizo una búsqueda exhaustiva en **todo el proyecto** (no solo el HTML visible) de cualquier aparición de "PNE 10", "PNE de 10", etc. La búsqueda literal de esas cadenas exactas no encontró nada — un hotfix anterior ya había renombrado la mayoría de las etiquetas a "Desafío Final" en vez de "PNE". Pero se encontraron **dos problemas reales**, ambos genuinos aunque distintos al síntoma literal descrito:

1. **`js/shared/profiles-ui.js`** — el filtro de la Bitácora / Vista cronológica mostraba las opciones `Todo | Química 10.º | PNE | Química 11.º`. La etiqueta **"PNE"**, sentada sola justo entre "Química 10.º" y "Química 11.º", correspondía exclusivamente a los eventos del Desafío Final de décimo (`source.indexOf('pne-')===0` en `profiles.js:365`, que solo categoriza ahí las fuentes de XP `'pne-first-pass'`/`'pne-improved'` del examen de décimo — el Simulacro PNE 11.º nunca otorga XP, así que jamás podría aparecer bajo este filtro). Esta es la ambigüedad real que el ticket buscaba corregir.

2. **Inconsistencia de nomenclatura entre fases** — un hotfix anterior había renombrado "PNE — Prueba Nacional Estandarizada" (10.º) a **"Desafío Final"**, no a "Examen Final". Como este ticket establece explícitamente "Examen Final 10.°" como el término final deseado, se alineó toda la redacción visible para usar ese término exacto, evitando dejar dos nombres distintos ("Desafío Final" en algunos lugares, y el filtro "PNE" recién corregido) refiriéndose al mismo examen.

## 2. Revisión global realizada

Búsqueda en **todo** el proyecto (`js/`, `index.html`, `analytics/`), no solo los archivos ya conocidos de fases anteriores. Se clasificó cada aparición de "PNE" encontrada:

| Aparición | ¿Es sobre el examen de 10.°? | Acción |
|---|---|---|
| Filtro "PNE" en la Bitácora (`profiles-ui.js`) | **Sí** | Renombrado a "Examen Final 10.º" |
| "Desafío Final" en 5 archivos de fase anterior | Sí (era el nombre correcto de "PNE 10.°", solo con otra palabra) | Renombrado a "Examen Final" |
| "Desafío Final de 10.º" en la pantalla de desbloqueo del Simulacro PNE 11.º (`simulacro-nacional.js`) | Sí — describe la Ruta 1 de desbloqueo, que sí depende del examen de 10.º | Renombrado a "Examen Final de 10.º" |
| `window.PNE`, `window.PNEBank`, `BANCO_PNE_U0X`, ids `"PNE-2023-D01-Q-001"`, etc. | No — son identificadores técnicos (accesibilidad, bancos de preguntas, ids del banco histórico de la Prueba Nacional real) | **No tocados** |
| "PNE 11.º", "Simulacro PNE", "Nota PNE", tarjetas y pestañas dentro del propio Simulacro PNE 11.º | No — es exactamente la evaluación de 11.º, que debe conservar el nombre | **No tocados** |
| "PNE" dentro de comentarios de código (`js/units/*.js`, `js/data/grade11/*.js`) | No — no es texto visible al usuario | **No tocados** |

## 3. Archivos modificados

| Archivo | Cambio |
|---|---|
| `js/shared/profiles-ui.js` | Filtro de la Bitácora: `'PNE'` → `'Examen Final 10.º'` (el valor interno del filtro, `'pne'`, no cambió) |
| `js/modules/pne-final.js` | 5 apariciones de "Desafío Final" → "Examen Final" (títulos, mensaje de desbloqueo, pantalla de carga, estadísticas) |
| `js/modules/units.js` | Nombre de la tarjeta: "Desafío Final" → "Examen Final" |
| `js/modules/grade11.js` | Mensaje de desbloqueo de 11.º: "Desafío Final de Química 10.º" → "Examen Final de Química 10.º" |
| `js/modules/grade-select.js` | 2 etiquetas ("Mejor Desafío Final 10.º", "Ruta B") → "Examen Final" |
| `js/modules/progress.js` | 3 etiquetas (resumen de progreso, estado de desbloqueo de 11.º) → "Examen Final" |
| `js/modules/simulacro-nacional.js` | 1 mención dentro de la pantalla de desbloqueo (Ruta 1) → "Examen Final de 10.º" |

Ningún archivo del núcleo (`storage.js`, `gamification.js`, `router.js`), ningún archivo de `js/units/*.js` o `js/data/*.js`, ni `SUPABASE_SCHEMA.sql`/RLS/`analytics-hooks.js`/`analytics-queue.js` fueron tocados.

## 4. Identificadores internos conservados sin cambios

Tal como exige la Sección "MUY IMPORTANTE — NO MODIFICAR LÓGICA" del ticket, se conservaron exactamente iguales:
- La clave de Storage `data.pne` (estadísticas del examen de 10.º).
- La ruta del router `Router.register('pne-final', ...)`.
- Las fuentes de XP `'pne-first-pass'`, `'pne-improved'`.
- Los nombres de badges `'pne-desbloqueado'`, `'pne-aprobado'`, `'pne-dominio'` (visibles solo como `id`, no como texto — sus *etiquetas* visibles ya decían "Desafío Final"/ahora "Examen Final" desde antes).
- El valor interno del filtro de Bitácora, `'pne'`.
- Todos los identificadores de ítems del banco histórico (`"PNE-2023-D01-Q-001"`, etc.) — esos SÍ son literalmente la Prueba Nacional Estandarizada real, no deben tocarse nunca.

## 5. Analytics

No se modificó ninguna tabla, vista, RLS, ni la cola de sincronización. Se revisó específicamente si algún **texto visible** dentro de `analytics/analytics-admin.js` correspondía al examen de 10.º con el nombre "PNE" — no se encontró ninguno: todas las apariciones de "PNE" en el panel (`PNE 11.º — Analítica`, `PNE aprobada`, `Mejor PNE`, etc.) provienen exclusivamente de la tabla `pne_attempts`, que **solo** se alimenta del Simulacro PNE 11.º (`analytics-hooks.js` nunca lee ni escribe `data.pne`, el examen de 10.º). No había ningún registro histórico de Analytics referido al examen de 10.º que renombrar.

## 6. Pruebas realizadas (las 9 del ticket)

Todas con Chromium real vía Playwright, sobre un perfil con progreso previo real (6 unidades aprobadas + 2 intentos históricos del examen de 10.º, `bestScore=82`):

| # | Prueba | Resultado |
|---|---|---|
| 1 | Examen Final 10.º abre correctamente | ✅ título "Examen Final · Química 10.º" |
| 2 | Conserva preguntas y funcionamiento | ✅ |
| 3 | Conserva resultados | ✅ `bestScore=82`, `attempts=2`, `scoreHistory=[65,82]` idénticos |
| 4 | Conserva aprobación ≥70 | ✅ `bestScore=82≥70` |
| 5 | Conserva progreso existente | ✅ las 6 unidades con `examBest=75` intactas |
| 6 | Analytics continúa registrando correctamente | ✅ nuevo examen de unidad capturado con la nota exacta |
| 7 | PNE 11.º permanece intacta | ✅ pantalla de entrada y texto "PNE" sin cambios |
| 8 | Perfiles antiguos mantienen su progreso | ✅ comparación completa de `xp/level/badges/pne/units` idéntica (salvo el cambio intencional de la prueba 6) |
| 9 | No aparecen referencias visibles incorrectas a "PNE 10.º" | ✅ verificado en Inicio, Unidades, Química 11.º, Examen Final, Progreso, Simulacro PNE, y la Bitácora (que ahora muestra "Examen Final 10.º" en su filtro) |

**No regresión:** batería completa de MQC académico (11 sistemas) — 0 errores, `data.pne` y `data.grade11Unlock` intactos byte por byte.

**Sintaxis:** `node --check` limpio en los 6 archivos modificados.

## 7. Resultado conceptual final (confirmado)

```
10.º  → Examen Final 10.º
11.º  → PNE 11.º
```

No se presentan al usuario como dos PNE diferentes — el término "PNE" queda reservado exclusivamente a la evaluación de 11.º en toda la interfaz visible.

---

## Declaración

**HOTFIX — PNE 10.° renombrada visualmente como Examen Final 10.° sin modificación de lógica ni datos históricos.**
