# MQC MULTIGRADO — Arquitectura de Continuidad Académica
## Química 10.º → Química 11.º
**Fase 1 — Infraestructura, sin desarrollar el contenido de 11.º todavía**

---

## 1. Decisión arquitectónica central: no renombrar, solo agregar

El propio EOP proponía una estructura conceptual anidada (`profile.data.academic.grade10 / grade11`). **Se investigó el esquema real primero** (`js/core/storage.js`, `SCHEMA_DEFAULT`) y se decidió **no forzarla**, por una razón concreta: las claves `data.units`, `data.xp`, `data.pne`, `data.badges`, `data.streak`, etc. ya son de nivel superior (planas, no anidadas) y las leen directamente **56 archivos distintos** de las 9 unidades y todos los módulos compartidos. Re-anidarlas bajo `data.academic.grade10.*` habría exigido tocar prácticamente todo el proyecto — justo lo que el sprint prohibía ("no reconstruir los módulos existentes", "mínima modificación").

**Decisión real:** `data.units`, `data.xp`, `data.pne`, etc. siguen significando exactamente lo mismo que siempre significaron — el progreso de Química 10.º, implícitamente (es lo único que existió hasta ahora). Toda la infraestructura nueva vive en **4 claves nuevas, aditivas, en el mismo nivel superior**:

```js
data.profileMeta    = { profileId, createdAt, lastImportAt, importCount, schemaVersion }
data.identityLock   = { locked, lockedAt, reason }
data.grade11Unlock  = { unlocked, method, unlockedAt, evidence }
data.grade11        = { 'g11-u01': {...}, 'g11-u02': {...}, 'g11-u03': {...}, 'g11-u04': {...} }
```

## 2. Hallazgo clave que simplificó todo: la migración ya era automática

Antes de escribir ninguna función de migración, se inspeccionó `Storage.load()` y se encontró que **ya hace un merge profundo** (`_mergeDeep(SCHEMA_DEFAULT, saved)`) entre el esquema por defecto y los datos guardados. Esto significa: agregar una clave nueva a `SCHEMA_DEFAULT` es **toda la migración que hace falta** — cualquier perfil creado antes de esta fase la recibe automáticamente, con su valor por defecto, la próxima vez que se carga. No se escribió ninguna función `migrate()` separada porque ya existía el mecanismo correcto; ver `MQC_PROFILE_MIGRATION_v2.md` para el detalle completo.

## 3. Archivos creados

| Archivo | Propósito |
|---|---|
| `js/data/unidades-grade11.js` | Metadata de las 4 unidades de 11.º (`GRADE11_UNIDADES_DATA`), todas `status:'development'` |
| `js/modules/grade-select.js` | Pantalla "Selecciona tu ruta científica" — capa superior de navegación, registrada como ruta `grade-select` |
| `js/modules/grade11.js` | Vista "Química 11.º" — grilla de 4 tarjetas + vista informativa al hacer clic, registrada como ruta `grade11` |

## 4. Archivos modificados (aditivamente)

| Archivo | Cambio |
|---|---|
| `js/core/storage.js` | Agregadas las 4 claves nuevas al `SCHEMA_DEFAULT` |
| `js/shared/profiles.js` | `_genProfileId()` nuevo; `create()`/`resetProgress()`/`importProfile()` asignan `profileId`; `rename()`/`setGroup()` respetan `identityLock`; `buildBitacora()` clasifica cada entrada del historial por grado |
| `js/core/gamification.js` | 1 insignia nueva (`grade11-unlocked`); `checkBadges()` extendido para detectar bloqueo de identidad y desbloqueo de 11.º (punto único, sin tocar las 9 unidades) |
| `js/shared/profiles-ui.js` | La vista cronológica de la Bitácora ahora tiene filtros por grado (Todo/10.º/PNE/11.º) |
| `js/modules/progress.js` | Nueva sección "Identidad académica + resumen 10.º + acceso 11.º", aditiva, antes de las secciones existentes |
| `js/app.js` | Un solo cambio de una línea: la pantalla de aterrizaje tras iniciar sesión pasa a ser `grade-select` en vez de `home` directamente |
| `index.html` | 3 scripts nuevos registrados; 2 ítems de sidebar nuevos ("Inicio académico", "Química 11.º") |
| `css/main.css` | Sin cambios en esta fase — la vista de Química 11.º reutiliza exactamente `.units-grid`/`.unit-card`, heredando la corrección de altura uniforme de HOTFIX-05 sin código adicional |

**No se modificó ningún archivo de las 9 unidades (`js/units/unit-0X.js`).**

## 5. Por qué el Router no necesitó cambios propios

El Router ya delega los clics de `.nav-item[data-section="..."]` de forma genérica (event delegation sobre `#sidebar-nav`). Agregar `<li data-section="grade-select">` y `<li data-section="grade11">` al HTML, junto con `Router.register('grade-select', {...})` / `Router.register('grade11', {...})` en los módulos nuevos, fue suficiente — cero líneas nuevas en `router.js`.

## 6. Limitaciones de seguridad local (transparencia obligatoria)

Todo lo construido en esta fase vive en `localStorage` del navegador. No hay servidor, no hay autenticación real, no hay forma de impedir que alguien con acceso a las herramientas de desarrollador del navegador edite manualmente cualquier valor (incluyendo `identityLock.locked` o `profileMeta.profileId`). Esto es consistente con `SECURITY.md` (ya existente en el proyecto) y con la instrucción explícita de esta fase de **no simular una seguridad que no es real** ("no implementar un PIN docente falso"). El bloqueo de identidad y el desbloqueo de 11.º son controles de **integridad del flujo normal de uso**, no medidas de seguridad criptográfica.

## 7. Documentos relacionados

- `MQC_PROFILE_IDENTITY_SECURITY.md` — reglas de bloqueo de identidad en detalle
- `MQC_PROFILE_MIGRATION_v2.md` — esquema anterior vs. nuevo, mecanismo de migración
- `MQC_GRADE11_STRUCTURE.md` — metadata y convención de IDs de las 4 unidades
- `MQC_GRADE11_UNLOCK_RULES.md` — las 2 rutas de desbloqueo en detalle
- `MQC_MULTIGRADE_QA_REPORT.md` — las 27 pruebas ejecutadas y sus resultados
