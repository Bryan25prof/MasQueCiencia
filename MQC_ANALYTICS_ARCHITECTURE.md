# MQC_ANALYTICS_ARCHITECTURE.md
## MQC Analytics v1.0 — Arquitectura

**Fecha:** 2026-08-19
**Estado:** Primera entrega — versión de prueba, NO desplegada en producción (Sección 23 del ticket).

---

## 1. Visión general

```
┌─────────────────────────────┐        ┌──────────────────────────────┐
│   MásQueCiencia (GitHub      │  INSERT  │   Supabase                    │
│   Pages) — frontend          │ ───────► │   PostgreSQL + Auth + RLS     │
│   estudiantil                │  (anon)  │                               │
│                               │          │   students                    │
│  Storage / MQCProfiles /     │          │   unit_exam_results           │
│  Router  ← NÚCLEO CONGELADO  │          │   pne_attempts                │
│  (sin tocar)                  │          │   pne_answers                 │
│                               │          │   admins                      │
│  ┌─────────────────────────┐ │          └──────────────┬────────────────┘
│  │ analytics-queue.js      │ │                          │ SELECT
│  │ analytics-hooks.js       │ │                          │ (authenticated,
│  │  (capa nueva, aditiva)   │ │                          │  is_admin()=true)
│  └─────────────────────────┘ │                          ▼
└─────────────────────────────┘               ┌──────────────────────────┐
                                                │  MQC Analytics (panel)    │
                                                │  página separada,         │
                                                │  NO enlazada al           │
                                                │  frontend estudiantil     │
                                                └──────────────────────────┘
```

Dos aplicaciones front-end completamente separadas comparten la misma base de datos:

1. **MásQueCiencia** (la plataforma existente, sin cambios en su lógica académica) — solo **inserta** eventos, nunca lee nada de Supabase.
2. **MQC Analytics** (panel nuevo, `analytics/index.html`) — solo **lee** (vía las vistas `v_*`), nunca escribe, y solo funciona si el docente inició sesión con una cuenta autorizada.

## 2. Por qué Supabase y por qué este patrón de "solo INSERT" para estudiantes

MásQueCiencia fue diseñado desde el inicio como **"sin cuentas, sin login, sin servidores"** para los estudiantes (ver el encabezado de `js/shared/profiles.js`). Eso es intencional y no se toca. Pero implica algo importante para la seguridad de Analytics:

> **No existe ninguna manera de que la base de datos verifique criptográficamente que una escritura viene realmente del perfil que dice ser.** Todos los estudiantes comparten el mismo rol técnico (`anon`) frente a Supabase.

Si a ese rol se le diera permiso de **UPDATE** o **DELETE** sobre filas existentes, cualquier persona con las herramientas de desarrollador de su navegador podría, en teoría, alterar o borrar el progreso guardado de **cualquier otro** estudiante — no por un error de programación, sino porque no hay forma de que Postgres distinga "soy yo actualizando mi propia fila" de "soy yo actualizando la fila de otra persona".

**La solución adoptada:** todas las tablas alimentadas por el frontend estudiantil son **append-only** — cada evento relevante (perfil creado/editado, examen de unidad mejorado, intento de PNE finalizado, cada respuesta de PNE) inserta una fila **nueva**, nunca modifica una existente. El rol `anon` tiene permiso de **INSERT únicamente** — ni UPDATE ni DELETE, en ninguna tabla. El panel del docente nunca lee las tablas crudas directamente: siempre consulta a través de **vistas** (`v_students_latest`, `v_unit_exam_best`, etc.) que ya calculan "la fila más reciente" o "la mejor nota" por perfil.

Esto cumple exactamente los dos requisitos de la Sección 19 del ticket:
- *"El frontend estudiantil solo debe poder INSERTAR/ACTUALIZAR los datos académicos autorizados correspondientes al perfil."* → Con este diseño, "actualizar" se logra insertando una fila nueva, así que la restricción se vuelve automática y estructural, no dependiente de que una política de RLS esté bien escrita.
- *"NO debe poder listar estudiantes; consultar estadísticas globales; acceder a otros perfiles."* → El rol `anon` no tiene ninguna policy de `SELECT` en ninguna tabla — no puede leer absolutamente nada, ni siquiera sus propios datos (el estudiante ya ve su propio progreso a través del `Storage` local existente, que es la fuente de verdad de la experiencia — Analytics es un espejo unidireccional hacia el docente, no una segunda fuente de verdad para el estudiante).

## 3. Los dos módulos nuevos del lado del estudiante

### `js/shared/analytics-queue.js`
La cola de sincronización offline (Sección 20-21). API pública:
- `AnalyticsQueue.push(tabla, payload)` — agrega un evento a la cola local (con `event_id` único) e intenta enviarlo de inmediato; si falla (sin conexión, Supabase no configurado, etc.), queda guardado para reintentar más tarde.
- `AnalyticsQueue.flush()` — reintenta todos los eventos pendientes. Se llama automáticamente al recuperar conexión (`window.addEventListener('online', ...)`) y al cargar la app.
- Almacenamiento de la cola: `localStorage`, clave `mqc_analytics_queue_v1` — **completamente independiente** de `Storage` (el núcleo académico), para que un error en Analytics nunca pueda corromper el progreso académico real.

### `js/shared/analytics-hooks.js`
El único archivo que "observa" al núcleo — y lo hace **sin modificarlo**, envolviendo (`wrap`) tres funciones ya existentes de `Storage` **después** de que `storage.js` las define, cuando la app arranca:

| Función envuelta | Qué dispara el evento |
|---|---|
| `Storage.updateUnit` (10.º) | Si `examBest` sube respecto al valor anterior → evento `unit_exam_results` |
| `Storage.updateGrade11Unit` (11.º) | Ídem, para las 4 unidades de 11.º |
| `Storage.set` | Si la clave es `'simulacroNacional'` y `historial.length` creció → evento `pne_attempts` + un evento `pne_answers` por cada pregunta del intento recién agregado |

El patrón exacto:
```javascript
const _originalUpdateUnit = Storage.updateUnit;
Storage.updateUnit = function (unitId, update) {
  const resultado = _originalUpdateUnit(unitId, update); // comportamiento original intacto
  try { _detectarYRegistrar(unitId, update); } catch (e) { /* Analytics nunca debe romper la app */ }
  return resultado;
};
```
Ningún archivo del núcleo (`storage.js`, ningún `unit-0X.js`, ningún `g11-u0X.js`, `simulacro-nacional.js`, `simulacro-nacional-adapter.js`) se edita. Esto respeta al pie de la letra la lista de "NO cambiar" del ticket, incluyendo el Simulacro PNE explícitamente.

## 4. Sincronización inicial de perfiles ya existentes (agregado 2026-08-22)

**Pregunta verificada con una prueba real:** ¿un perfil creado antes de que existiera (o se activara) Analytics se registra solo, con solo abrir la app? **No, no ocurría.** Se confirmó explícitamente: un perfil con un examen de unidad aprobado y un intento de PNE ya en su historial generaba **0 eventos** con solo abrir la app — los envoltorios de la sección anterior solo disparan ante una acción **nueva** (crear perfil, mejorar una nota, terminar un PNE). Si Analytics se activaba después de que ese perfil ya existía, su fila en `students` nunca se creaba, y su progreso ya hecho quedaba invisible para el panel hasta la próxima mejora — que podía no llegar nunca si el estudiante ya había completado todo.

**Solución implementada:** `_sincronizacionInicial()`, en `analytics-hooks.js`, se ejecuta una vez al cargar la app. Si hay un perfil activo real (no invitado) que este navegador todavía no sincronizó ni una vez (verificado contra un marcador local propio, `mqc_analytics_synced_profiles_v1` — completamente separado de `Storage`), envía automáticamente:
- su fila de `students` (alias, grupo);
- un evento de `unit_exam_results` por cada unidad de 10.º/11.º que ya tenga `examBest > 0`, con la nota actual;
- un evento de `pne_attempts` por cada intento ya presente en `data.simulacroNacional.historial` (datos agregados).

**Límite honesto y documentado:** no se generan eventos de `pne_answers` (detalle pregunta por pregunta) para intentos de PNE anteriores a esta función, porque esa información granular nunca se guardó de forma permanente — `enProgreso` se limpia al confirmar cada entrega, desde mucho antes de que existiera esta sincronización. El análisis de ítems del panel no va a tener el desglose de esos intentos antiguos, pero sí su resultado agregado (aciertos, nota, aprobado/no) correctamente.

**Garantía verificada con pruebas:** `_sincronizacionInicial()` solo llama a `Storage.load()` (lectura) y a `AnalyticsQueue.push()` — nunca a `Storage.set()` ni a ningún `Storage.update*()`. Se verificó con una comparación campo por campo de `Storage.load()` antes/después de que la sincronización corriera: los campos críticos (`units`, `grade11`, `simulacroNacional`, `profileMeta`, `xp`, `level`, `exam`, `atlasQuimico`, `grade11Unlock`) quedan **byte por byte idénticos**. Los únicos campos que cambian entre una carga y otra (`user.lastSeen`, `badges`, `streak`, `identityLock`) son actualizaciones propias del núcleo de sesión de MQC que ya ocurrían así desde antes de que existiera Analytics — no fueron causados por esta función.

**Idempotencia:** se verificó que una segunda carga de la misma app, con el mismo perfil, genera **0 eventos nuevos** — el marcador local evita reintentar innecesariamente. Un perfil recién creado (sin progreso previo) se marca como sincronizado en el mismo momento de `create()`, así que nunca dispara un backfill vacío.

## 5. El campo Grupo/Sección (Sección 4)

**Hallazgo durante el análisis:** el campo ya existía parcialmente — `profiles.js` y `profiles-ui.js` ya tenían un campo `group` (texto libre, opcional, máx. 16 caracteres) usado internamente para mostrar "grupo · XP · nivel" en varios lugares de la interfaz. Lo único que faltaba, exactamente como pide la Sección 4, era convertirlo de texto libre a un **selector configurable**.

Cambio aplicado (único archivo tocado del lado de perfiles): en `profiles-ui.js`, el `<input type="text">` del campo grupo se reemplazó por un `<select>` con las opciones `10-1`, `10-2`, `10-3`, `11-1`, `11-2`, `11-3` más una opción vacía ("Sin asignar todavía"). La lista de opciones vive en una constante al inicio del archivo (`GRUPOS_DISPONIBLES`), fácil de ajustar si el docente maneja otros nombres de sección. Los perfiles que ya tenían un grupo de texto libre previo conservan su valor tal cual (no se pierde nada), y los que no tienen grupo asignado muestran **"Grupo pendiente"** donde antes no mostraban nada, tal como pide la Sección 4.

## 6. El panel de administración (`analytics/`)

Carpeta nueva, **fuera de la estructura de rutas de MásQueCiencia** — no hay ningún `Router.register()` para esto, y no aparece ningún ítem en el sidebar estudiantil. Se accede directamente por URL (`tudominio.github.io/MasQueCiencia/analytics/`), y lo primero que muestra a cualquiera que no haya iniciado sesión es una pantalla de **"ACCESO RESTRINGIDO"** con un formulario de login (Supabase Auth, email + contraseña) — nunca los datos.

Estructura:
```
analytics/
  index.html          ← login + shell del panel (una sola página)
  analytics-admin.js   ← toda la lógica: login, consultas, render de tablas/gráficas
  analytics-admin.css  ← estilos propios, inspirados en GitHub Insights
```

## 7. Config de Supabase — dónde vive la URL y la clave pública

En `js/shared/analytics-config.js` (nuevo, muy corto):
```javascript
window.MQC_ANALYTICS_CONFIG = {
  supabaseUrl: 'PEGAR_TU_URL_AQUI',
  supabaseAnonKey: 'PEGAR_TU_ANON_KEY_AQUI',
  enabled: false // true una vez configurado — ver README_ANALYTICS_SETUP.md
};
```
La `anon key` de Supabase **está diseñada para ser pública** (es la misma filosofía que la API key de Google Maps del lado del cliente) — su seguridad depende enteramente de RLS, no de mantenerla en secreto. Por eso es seguro que viva en un archivo `.js` público en GitHub Pages. Lo que **nunca** debe aparecer ahí es la `service_role key` (esa sí es un superusuario que se salta RLS por completo) — este proyecto no la usa en ningún lado del lado del cliente; el panel de administración se autentica con Supabase Auth (usuario + contraseña reales), no con esa clave.

Con `enabled: false` (el valor con el que se entrega esta primera versión), `analytics-queue.js` detecta que no hay configuración real y simplemente no intenta conectarse — la plataforma sigue funcionando exactamente igual que antes, sin ningún error visible para el estudiante (Sección 20).

## 8. Resumen de archivos

| Archivo | Tipo | Rol |
|---|---|---|
| `SUPABASE_SCHEMA.sql` | Nuevo | Esquema completo + RLS, para pegar en Supabase |
| `js/shared/analytics-config.js` | Nuevo | URL + anon key (deshabilitado por defecto) |
| `js/shared/analytics-queue.js` | Nuevo | Cola offline + sincronización |
| `js/shared/analytics-hooks.js` | Nuevo | Observador de `Storage`, sin tocar el núcleo |
| `js/shared/profiles-ui.js` | Modificado | Selector de Grupo/Sección (antes texto libre) |
| `index.html` | Modificado | 3 `<script>` nuevos, cargados al final |
| `analytics/index.html` | Nuevo | Panel de administración (standalone) |
| `analytics/analytics-admin.js` | Nuevo | Lógica del panel |
| `analytics/analytics-admin.css` | Nuevo | Estilos del panel |

Ningún archivo del núcleo académico (`storage.js`, `gamification.js`, `router.js`, los 13 archivos de unidad, `simulacro-nacional.js`, `simulacro-nacional-adapter.js`) fue modificado.
