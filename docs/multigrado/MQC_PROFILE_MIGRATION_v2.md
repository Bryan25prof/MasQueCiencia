# MQC — Migración de Perfiles v2 (Multigrado)
**Fase 1 — Esquema anterior vs. nuevo, mecanismo real de migración**

---

## 1. Por qué "v2" no es una reescritura del esquema

La convención `schemaVersion: 2` (dentro de `data.profileMeta`) marca la incorporación de la infraestructura multigrado — **no** una restructuración de los datos existentes. `schemaVersion: 1` (implícito — los perfiles de antes de esta fase no tienen el campo, y se interpretan como versión 1) y `schemaVersion: 2` comparten exactamente la misma forma para todo lo que ya existía.

## 2. Esquema anterior (implícito, "v1")

```js
{
  version, user, xp, level, badges, streak, units, exam, sound,
  pne, reflexiones, study, lab, settings
}
```

## 3. Esquema nuevo ("v2") — solo 4 claves agregadas

```js
{
  // ...exactamente todo lo de v1, sin cambios...
  profileMeta:   { profileId, createdAt, lastImportAt, importCount, schemaVersion },
  identityLock:  { locked, lockedAt, reason },
  grade11Unlock: { unlocked, method, unlockedAt, evidence },
  grade11:       { 'g11-u01': {...}, 'g11-u02': {...}, 'g11-u03': {...}, 'g11-u04': {...} }
}
```

## 4. El mecanismo real: `_mergeDeep`, ya existente

`js/core/storage.js` → `Storage.load()` ya ejecutaba, desde mucho antes de esta fase:

```js
function _mergeDeep(defaults, saved) {
  const result = Object.assign({}, defaults);
  for (const key in saved) {
    // si ambos son objetos (no arreglos), fusiona recursivamente;
    // si no, usa el valor guardado tal cual
  }
  return result;
}
```

Esto significa: **cualquier clave presente en `SCHEMA_DEFAULT` pero ausente en los datos guardados de un perfil recibe automáticamente su valor por defecto**, la primera vez que ese perfil se carga después de agregar la clave. No hace falta ninguna función `migrate()` aparte — agregar las 4 claves nuevas a `SCHEMA_DEFAULT` **es** la migración completa.

**Verificado explícitamente** (ver `MQC_MULTIGRADE_QA_REPORT.md`): se simuló un perfil "antiguo" borrando manualmente `profileMeta`/`identityLock`/`grade11Unlock`/`grade11` de sus datos guardados, y se confirmó que:
- Su progreso de unidades, XP y PNE permanecieron intactos.
- Las 4 claves nuevas reaparecieron automáticamente con sus valores por defecto en la siguiente carga.
- Cargar el mismo perfil múltiples veces seguidas no duplica ni corrompe nada (la operación es idempotente).

## 5. Lo único que SÍ requiere una acción explícita: el profileId

El merge automático rellena la **estructura** (`profileMeta: {profileId: null, ...}`), pero no puede inventar un identificador único por sí solo (sería el mismo valor `null` para todos los perfiles antiguos si dependiera solo del merge). Por eso, un perfil creado antes de esta fase recibe su `profileId` real la **próxima vez que se ejecute una de estas 3 funciones**:

- `create()` — no aplica a perfiles ya existentes, solo a nuevos.
- `resetProgress(id)` — si el estudiante restablece su progreso.
- `importProfile(json)` — si el perfil se exporta (desde una versión anterior, sin `profileId`) y se vuelve a importar; en ese momento, `importProfile()` detecta que falta y genera uno.

**Nota real para producción:** un perfil que YA existe en el navegador de un estudiante (creado antes de esta fase) y que **nunca se exporta ni se reinicia** seguirá funcionando perfectamente (todo su progreso intacto), pero su `profileId` permanecerá en `null` hasta que ocurra uno de esos 3 eventos. Esto no afecta ninguna funcionalidad — el `profileId` es informativo/de trazabilidad, no una llave de la que dependa el resto del sistema.

## 6. Qué se conserva explícitamente (verificado con pruebas)

- Progreso de las 9 unidades (`data.units`) — sin cambios.
- Estadísticas PNE (`data.pne`) — sin cambios.
- XP, nivel, insignias, racha — sin cambios.
- Bitácora / historial de XP (`data.xp.history`) — sin cambios en el texto guardado; la clasificación por grado (10/PNE/11) se calcula **al mostrar**, nunca se escribe sobre el historial real.
- Preferencias (sonido, accesibilidad) — sin cambios.

## 7. La migración se ejecuta "una sola vez" — en qué sentido

El *merge* en sí es seguro de ejecutar en cada carga (es idempotente, no es destructivo). Lo que ocurre "una sola vez" es la **asignación real del `profileId`** — una vez asignado, ninguna de las 3 funciones que podrían generarlo (`create`/`resetProgress`/`importProfile`) lo vuelve a sobreescribir mientras ya exista uno (excepto `resetProgress`, que lo reemplaza intencionalmente por uno nuevo, ya que trata el perfil como académicamente nuevo — ver `MQC_PROFILE_IDENTITY_SECURITY.md` §4).
