# MQC_ANALYTICS_V1_REPORT.md
## MQC Analytics v1.0 — Informe de entrega

**Fecha:** 2026-08-19
**Estado:** Primera entrega (versión de prueba) — **NO desplegada en producción**, siguiendo la Sección 23 del ticket. Requiere completar `README_ANALYTICS_SETUP.md` (crear tu proyecto de Supabase real) antes de activar `enabled: true`.

---

## 1. Tablas creadas

| Tabla | Tipo | Contenido |
|---|---|---|
| `admins` | Lista blanca | Qué usuarios de Supabase Auth tienen permisos de docente |
| `students` | Append-only | Cada creación/edición de perfil (alias, grupo, grado) |
| `unit_exam_results` | Append-only | Cada mejora de nota en un examen de unidad (10.º o 11.º) |
| `pne_attempts` | Append-only (nunca se sobrescribe) | Un intento completo del Simulacro PNE |
| `pne_answers` | Append-only | Una fila por cada pregunta respondida en un intento de PNE |

Más 7 vistas de solo lectura (`v_students_latest`, `v_unit_exam_best`, `v_seguimiento_academico`, `v_resultados_por_seccion`, `v_rendimiento_por_ciencia`, `v_analisis_items`, `v_distribucion_opciones`) que son lo único que el panel de administración consulta directamente.

## 2. Campos por tabla

Ver `SUPABASE_SCHEMA.sql` completo — cada tabla y vista tiene comentarios inline (`comment on table/view ...`) explicando el propósito de cada una.

## 3. Eventos recopilados

| Evento | Se dispara cuando | Envuelve (sin modificar) |
|---|---|---|
| `students` (insert) | Se crea un perfil, o se cambia alias/grupo; **o** es la primera vez que la app carga con Analytics activo para un perfil que ya existía antes (sincronización inicial, ver Sección 4.1) | `MQCProfiles.create`, `MQCProfiles.setGroup`, `MQCProfiles.rename` |
| `unitExamResults` (insert) | `examBest` de una unidad de 10.º o 11.º sube respecto al valor anterior; **o** ya tenía `examBest > 0` la primera vez que se sincroniza un perfil preexistente | `Storage.updateUnit`, `Storage.updateGrade11Unit` |
| `pneAttempts` (insert) | Se confirma la entrega final de un Simulacro PNE; **o** ya existía en el historial la primera vez que se sincroniza un perfil preexistente (backfill, sin `pneAnswers` — ver Sección 4.1) | `Storage.set('simulacroNacional', ...)` |
| `pneAnswers` (insert × 60) | Junto con un `pneAttempts` recién completado — una fila por cada una de las 60 preguntas del intento. **No** se generan para el backfill de intentos antiguos (esa información granular nunca se guardó de forma permanente) | Ídem |

## 4. Integración con MQC — qué se tocó y qué no

**Archivos del núcleo académico modificados: 0.** Ni `storage.js`, ni los 13 archivos de unidad (`unit-01.js`...`unit-09.js`, `g11-u01.js`...`g11-u04.js`), ni `simulacro-nacional.js`, ni `simulacro-nacional-adapter.js`, ni `gamification.js`, ni `router.js` fueron editados.

La técnica usada (`analytics-hooks.js`) es **envolver** (wrap) funciones ya existentes de `Storage` y `MQCProfiles` después de que se cargan: guardar la función original, reemplazarla por una versión que llama a la original primero (comportamiento 100% intacto) y, después, en un `try/catch` aislado, revisa si ocurrió algo digno de registrar. Si algo falla dentro de ese `try/catch`, Analytics simplemente no registra ese evento — nunca puede romper la experiencia académica real.

**El caso más delicado — capturar el detalle completo de un intento de PNE sin tocar el Simulacro PNE:** `simulacro-nacional.js` guarda el intento en curso (`enProgreso`, con las 60 preguntas y las respuestas completas) durante todo el examen, y recién al confirmar la entrega lo reemplaza por `null` en el mismo objeto que después guarda. El truco: como nuestro envoltorio de `Storage.set` lee el estado **anterior** (`Storage.get('simulacroNacional')`) **antes** de dejar pasar la llamada original, en el momento exacto de la entrega final ese estado anterior todavía tiene el `enProgreso` completo del intento que se está por confirmar. Verificado con una prueba real: los 17 aciertos que el propio Simulacro PNE calculó coinciden exactamente con la suma de respuestas marcadas correctas en los 60 eventos individuales capturados por Analytics (ver sección 9).

**Único archivo del sistema de perfiles modificado:** `profiles-ui.js` — el campo Grupo/Sección, que ya existía como texto libre (hallazgo durante el análisis), se convirtió en un `<select>` configurable (Sección 4 del ticket), y se agregó el texto "Grupo pendiente" donde corresponde. Ninguna lógica de XP, progreso o desbloqueo se tocó.

### 4.1 — Sincronización inicial de perfiles ya existentes (agregado 2026-08-22)

**Verificado con una prueba real que el problema existía:** un perfil creado y con progreso real ANTES de activar Analytics generaba **0 eventos** con solo abrir la app — su fila en `students` nunca se creaba, y quedaba invisible en el panel hasta la próxima mejora (que podía no llegar nunca).

**Solución:** `_sincronizacionInicial()`, ejecutada una vez al cargar la app. Si el perfil activo todavía no fue sincronizado desde este navegador (verificado contra un marcador local propio, `mqc_analytics_synced_profiles_v1`, aislado de `Storage`), envía automáticamente su fila de `students`, un `unitExamResults` por cada unidad con `examBest > 0`, y un `pneAttempts` por cada intento ya presente en su historial — **sin** `pneAnswers` para esos intentos antiguos (esa granularidad nunca se guardó de forma permanente en ningún lado, ver comentario en el propio código).

**Garantía de no-modificación, verificada con pruebas:** esta función solo llama a `Storage.load()` (lectura). Se comparó `Storage.load()` completo antes y después de que corriera: los campos críticos (`units`, `grade11`, `simulacroNacional`, `profileMeta`, `xp`, `level`, `exam`, `atlasQuimico`, `grade11Unlock`) quedan **byte por byte idénticos**. Los únicos campos que cambian entre cargas (`user.lastSeen`, `badges`, `streak`, `identityLock`) son actualizaciones del propio núcleo de sesión de MQC, que ya ocurrían así desde antes de que existiera Analytics.

**Idempotencia verificada:** una segunda carga con el mismo perfil genera 0 eventos nuevos. Un perfil recién creado se marca como sincronizado en el mismo `create()`, para no disparar un backfill vacío innecesario.

## 5. Cola offline (`analytics-queue.js`)

- Almacenamiento propio en `localStorage` (`mqc_analytics_queue_v1`), completamente aislado de `Storage` — un fallo en Analytics no puede corromper el progreso académico.
- `push()` intenta enviar de inmediato; si falla, el evento queda en la cola.
- Reintenta automáticamente al recuperar conexión (`window.addEventListener('online', ...)`) y al cargar la app.
- Deduplicación: cada evento lleva un `event_id` único; las tablas remotas tienen ese campo como `unique` (o, en el caso de `pne_attempts`, el propio `attempt_id` es la clave primaria), así que un reintento de un evento que sí llegó antes se descarta silenciosamente en la base de datos (HTTP 409, tratado como éxito por el cliente).
- Con `MQC_ANALYTICS_CONFIG.enabled !== true` (valor de entrega), no se intenta ninguna conexión — MásQueCiencia funciona exactamente igual que antes de esta fase.

## 6. Autenticación

Supabase Auth (email + contraseña), vía llamadas REST directas (`/auth/v1/token?grant_type=password`) — sin el SDK de `supabase-js`, para no agregar una dependencia externa nueva. La sesión se guarda en `sessionStorage` (se pierde al cerrar el navegador, por seguridad) del panel — completamente separado de cualquier dato de MásQueCiencia.

## 7. Row Level Security

Ver `MQC_ANALYTICS_SECURITY.md` completo. Resumen: el rol usado por los estudiantes (`anon`) solo tiene permiso de `INSERT` — cero permisos de `SELECT`, `UPDATE` o `DELETE` en ninguna tabla. El panel de administración solo puede leer (`SELECT`) a través de una función `is_admin()` que verifica la tabla `admins`; no existe ninguna policy de escritura para el rol autenticado tampoco (panel de solo lectura, Sección 16 del ticket).

## 8. Panel de administración

`analytics/index.html` + `analytics-admin.js` + `analytics-admin.css` — página independiente, sin registrar en `Router`, sin ningún enlace desde el frontend estudiantil. Incluye las 4 secciones pedidas:
- **Resumen** (Sección 17): 8 tarjetas del Centro de Inteligencia Académica.
- **Seguimiento académico** (Secciones 5-6): tabla ordenable + filtros (grado, grupo, estado) + búsqueda por nombre.
- **PNE 11.º — Analítica** (Secciones 7-9): 7 tarjetas, gráfica de barras de rendimiento por ciencia (global y por grupo), tabla de resultados por sección ordenable.
- **Análisis de ítems** (Secciones 10-11): tabla ordenable filtrada a ítems con 5+ respuestas registradas, con modal de detalle por ítem mostrando la distribución A/B/C/D y el distractor dominante.

## 9. Pruebas realizadas

Todas con Chromium real vía Playwright, no simulación de DOM:

1. **Ganchos de exámenes de unidad**: verificado que `Storage.updateUnit`/`updateGrade11Unit` disparan el evento correcto solo cuando `examBest` mejora genuinamente, y que el comportamiento original (guardar en `data.units`/`data.grade11`) permanece exactamente igual.
2. **Captura de intento de PNE completo**: un intento real de 60 preguntas → 1 evento `pneAttempts` + 60 eventos `pneAnswers`, con coincidencia exacta entre los aciertos reportados y los calculados a partir de las respuestas individuales; `historial`/`enProgreso` del Simulacro PNE real quedan intactos.
3. **Selector de Grupo/Sección**: creación y edición de perfil con el nuevo `<select>`, confirmando las 6 opciones + "Sin asignar", y que "Grupo pendiente" aparece donde corresponde.
4. **Panel de administración completo**: login con credenciales incorrectas (rechazado), login correcto (acceso concedido), las 4 pestañas con datos simulados de Supabase (vía interceptación de red en la prueba), filtros y ordenamiento de tablas, modal de detalle de ítem, cierre de sesión.
5. **No regresión**: los 11 sistemas de la batería estándar (Inicio, Unidades 10.º, Química 11.º, Atlas, Tabla Periódica, Integrador, Progreso, Desafío Final 10.º, Perfiles, Accesibilidad, Photon) siguen funcionando sin error tras integrar Analytics — incluida la verificación específica de que `data.pne` (Desafío Final 10.º) permanece byte-por-byte idéntico antes y después de usar el Simulacro PNE.
6. **Sintaxis**: `node --check` limpio en los 88 archivos `.js` de `js/` más `analytics-admin.js`.
7. **Sincronización inicial (perfil preexistente)**: confirmado primero el problema (perfil con progreso real generaba 0 eventos al abrir la app), luego la corrección — 1 evento `students` + 1 `unitExamResults` por cada unidad con nota, + 1 `pneAttempts` por cada intento del historial, generados automáticamente en la primera carga tras activar Analytics. Verificada la idempotencia (segunda carga: 0 eventos nuevos) y, campo por campo, que `Storage.load()` queda exactamente igual antes y después (las únicas diferencias detectadas — `user.lastSeen`, `badges`, `streak`, `identityLock` — se confirmaron como comportamiento propio y preexistente del núcleo de sesión de MQC, no causado por esta función).

## 10. Archivos creados

```
SUPABASE_SCHEMA.sql
MQC_ANALYTICS_ARCHITECTURE.md
MQC_ANALYTICS_SECURITY.md
README_ANALYTICS_SETUP.md
MQC_ANALYTICS_V1_REPORT.md   (este documento)
js/shared/analytics-config.js
js/shared/analytics-queue.js
js/shared/analytics-hooks.js
analytics/index.html
analytics/analytics-admin.js
analytics/analytics-admin.css
```

## 11. Archivos modificados

```
index.html               → 3 <script> nuevos (analytics-config/queue/hooks), cargados al final
js/shared/profiles-ui.js  → selector de Grupo/Sección (antes texto libre) + "Grupo pendiente"
```

## 12. Riesgos conocidos

1. **Un estudiante podría insertar filas falsas a su propio nombre** (por ejemplo, simulando un examen aprobado que no rindió). Esto es técnicamente posible porque el rol `anon` no tiene forma de verificar identidad real — pero es el mismo riesgo que ya existe hoy editando `localStorage` directamente, Analytics no lo empeora ni lo mejora. No es una vulnerabilidad nueva introducida por este sistema.
2. **No hay límite de velocidad (rate limiting) propio** sobre inserciones — mitigado en la práctica por los límites del plan gratuito de Supabase; ver `MQC_ANALYTICS_SECURITY.md` sección 8.
3. ~~Los perfiles creados antes de esta versión no van a tener eventos históricos en Analytics~~ — **resuelto** (ver Sección 4.1: sincronización inicial). Único límite restante: los intentos de PNE anteriores a esta versión se respaldan con su resultado agregado, pero sin el detalle pregunta-por-pregunta (`pneAnswers`), porque esa granularidad nunca se guardó de forma permanente en ningún lado.

## 13. Pendientes

- **Configurar un proyecto real de Supabase** siguiendo `README_ANALYTICS_SETUP.md` — nada de esto funciona todavía porque `analytics-config.js` tiene `enabled: false` y campos vacíos, tal como se entrega.
- **Revisar la lista de grupos disponibles** (`GRUPOS_DISPONIBLES` en `profiles-ui.js`) contra los nombres reales de tus secciones — se entregó con `10-1, 10-2, 10-3, 11-1, 11-2, 11-3` como ejemplo directo del ticket.

---

## Declaración

**MQC Analytics v1.0 construido como capa independiente de seguimiento académico y análisis PNE.**
