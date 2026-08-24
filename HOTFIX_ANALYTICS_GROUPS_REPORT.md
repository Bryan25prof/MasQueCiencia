# HOTFIX_ANALYTICS_GROUPS_REPORT.md
## Catálogo completo de grupos/secciones 10.° y 11.°

**Fecha:** 2026-08-24
**Alcance:** sistema de perfiles (selector de Grupo/Sección) y panel MQC Analytics (filtros, orden, sección PNE 11.°). No se tocó XP, nivel, medallas, progreso, exámenes, PNE, unidades, Storage académico, IDs de perfiles, Supabase Auth, administrador, RLS, ni la cola de sincronización.

---

## 1. Causa

El selector de Grupo/Sección se había construido (hotfix anterior) con una lista de ejemplo de solo 6 secciones (`10-1, 10-2, 10-3, 11-1, 11-2, 11-3`) tomada literalmente de un ejemplo del ticket original, sin ampliarla al catálogo institucional completo de 10 secciones por grado.

## 2. Búsqueda de la fuente del catálogo (Sección 2 del ticket)

Se buscó en **todo el proyecto** (no solo el HTML visible) dónde estaba definida la lista de grupos:

| Lugar revisado | ¿Tenía el catálogo? |
|---|---|
| `js/shared/profiles-ui.js` | **Sí** — único lugar con la lista hardcodeada (`GRUPOS_DISPONIBLES`) |
| `js/shared/profiles.js` | No — solo guarda el valor de texto, no conoce la lista de opciones válidas |
| `analytics/analytics-admin.js` | No tenía una lista propia, pero **derivaba las opciones del filtro únicamente de los grupos que ya tenían datos** (`_gruposDisponibles()` leía `_datos.seguimiento`) — mismo problema de fondo: una sección sin estudiantes todavía no aparecía en el filtro |
| `SUPABASE_SCHEMA.sql` / RLS | No — la base de datos guarda `grupo` como `text` libre, sin restricción de catálogo (correcto, no había que tocarlo) |
| Sincronización con Supabase (`analytics-hooks.js`) | No — reenvía el valor de `MQCProfiles.activeMeta().group` tal cual, sin lista propia (correcto, no había que tocarlo) |

**Conclusión:** existían dos puntos con el problema (uno con lista fija muy corta, otro con lista "solo lo que ya tiene datos"), y ninguna fuente compartida entre ambos.

## 3. Solución: una única fuente compartida

Se creó **`js/shared/mqc-catalogo-grupos.js`** — el catálogo se genera programáticamente (`10-1`...`10-10`, `11-1`...`11-10`, 20 en total), no como lista escrita a mano, para eliminar la posibilidad de un error de tipeo. Incluye también:
- `esDeDecimo(grupo)` / `esDeUndecimo(grupo)` — para el filtro de la Sección 5 (nunca mezclar 10.° en PNE 11.°).
- `comparar(a, b)` — orden numérico correcto (Sección 9).

Este archivo se carga en **dos lugares**, con la misma ruta relativa:
- `index.html` (antes de `profiles-ui.js`)
- `analytics/index.html` (antes de `analytics-admin.js`, como `../js/shared/mqc-catalogo-grupos.js` — mismo patrón ya usado para `analytics-config.js`)

Ambos archivos ahora **leen** `window.MQC_CATALOGO_GRUPOS` en vez de tener su propia lista — si en el futuro cambia el número de secciones, este es el único archivo que hay que tocar.

## 4. Catálogo final

```
Sin asignar (Grupo pendiente)
10-1, 10-2, 10-3, 10-4, 10-5, 10-6, 10-7, 10-8, 10-9, 10-10
11-1, 11-2, 11-3, 11-4, 11-5, 11-6, 11-7, 11-8, 11-9, 11-10
```

## 5. Archivos creados

| Archivo | Contenido |
|---|---|
| `js/shared/mqc-catalogo-grupos.js` | Catálogo único: 20 grupos + funciones `esDeDecimo`/`esDeUndecimo`/`comparar` |

## 6. Archivos modificados

| Archivo | Cambio |
|---|---|
| `index.html` | +1 `<script>` (catálogo), cargado antes de `profiles-ui.js` |
| `analytics/index.html` | +1 `<script>` (catálogo), cargado antes de `analytics-admin.js` |
| `js/shared/profiles-ui.js` | `GRUPOS_DISPONIBLES` ahora lee `window.MQC_CATALOGO_GRUPOS.TODOS` (con fallback defensivo de 20 valores por si el script compartido no cargara) |
| `analytics/analytics-admin.js` | (a) el filtro de grupo ahora muestra el catálogo completo, no solo lo que ya tiene datos; (b) nuevo comparador `_compararFilas()` que ordena por número real cuando la columna es "grupo"; (c) la tabla y la gráfica de la pestaña "PNE 11.º — Analítica" excluyen explícitamente cualquier grupo de 10.º |

## 7. Compatibilidad con perfiles existentes (Sección 6 del ticket)

**Verificado explícitamente, sin excepción:** se crearon perfiles con cada uno de los 6 valores del catálogo anterior (`10-1, 10-2, 10-3, 11-1, 11-2, 11-3`) — los 6 se aceptan sin cambios, tal cual estaban. Ningún perfil se reinicia ni se modifica: el cambio es puramente ampliar las opciones **disponibles para elegir**, nunca tocar lo que ya está guardado. Un perfil con `Grupo pendiente` (grupo vacío) también se probó y se conserva igual.

## 8. Pruebas realizadas

Todas con Chromium real vía Playwright:

| Prueba | Resultado |
|---|---|
| Catálogo cargado con las 20 secciones (`10-10`, `11-10` incluidos) | ✅ |
| Crear perfil con `10-1`, `10-5`, `10-10`, `11-1`, `11-7`, `11-10` — los 6 casos que pide la Sección 8 del ticket | ✅ los 6 |
| Crear perfil con `Sin asignar (Grupo pendiente)` | ✅ |
| Cerrar MQC (recargar la página) y confirmar que la sección elegida sigue asociada al perfil — para cada uno de los 6+1 casos anteriores | ✅ los 7 |
| Compatibilidad: los 6 valores del catálogo viejo (`10-1`...`11-3`) se siguen aceptando y conservando tal cual | ✅ |
| El `<select>` de edición muestra las 21 opciones (`Sin asignar` + 20 secciones) | ✅ |
| Analytics recibe el valor **exacto**: perfil con grupo `11-7` → evento `students` capturado con `grupo: "11-7"` | ✅ coincide exactamente |
| Filtro de "Seguimiento académico" en el panel muestra las 20 secciones **aunque no tengan datos todavía** (ej. `10-7` sin ningún estudiante) | ✅ |
| Pestaña "PNE 11.º — Analítica": con datos de prueba que deliberadamente mezclaban un grupo `10-2`, ese grupo **nunca** aparece ni en la tabla ni en la gráfica de esa pestaña | ✅ |
| Orden numérico correcto en la tabla "por sección" (`11-2` antes que `11-9` antes que `11-10`, nunca alfabético) | ✅ |
| No regresión: batería completa de MQC académico (11 sistemas) | ✅ 0 errores, `data.pne` y `grade11Unlock` intactos |
| Sintaxis (`node --check`) en los 3 archivos tocados/creados | ✅ limpia |

## 9. Verificación Analytics (ejemplo pedido en la Sección 8)

```
Perfil:         11-7
localStorage:   11-7   (Storage.load().profileMeta → MQCProfiles.activeMeta().group)
Cola Analytics: 11-7   (evento "students", campo grupo, capturado antes de enviarse)
```

Los tres coinciden exactamente — no hay transformación, recorte, ni normalización del valor en ningún punto del camino.

## 10. Limitación no relacionada con este hotfix (encontrada durante las pruebas)

Al construir la prueba de compatibilidad se confirmó que MQC tiene un límite preexistente de **10 perfiles por navegador** (`MAX_PROFILES` en `profiles.js`, sin relación con este catálogo). No es un defecto de este hotfix — se documenta acá porque casi produjo un falso resultado en la primera versión de la prueba (al intentar crear más de 10 perfiles seguidos sin limpiar entre pasos). No se tocó ni se recomienda tocar ese límite como parte de este hotfix.

---

## Declaración

**HOTFIX — catálogo completo de grupos 10.° y 11.° implementado sin regresiones.**
