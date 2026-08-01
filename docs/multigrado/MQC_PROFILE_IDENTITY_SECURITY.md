# MQC — Identidad de Perfil y Bloqueo Progresivo
**Fase 1 Multigrado**

---

## 1. El identificador único (profileId)

- Formato: `MQC-XXXXXX` (6 caracteres, alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` — sin `0/O/1/I` para evitar confusión visual al leerlo o transcribirlo).
- **Distinto de la clave interna de almacenamiento** (`_uid()`, formato `p<timestamp><random>`, nunca visible al estudiante). El `profileId` es el único identificador que se muestra en pantalla, informes y respaldos.
- Vive en `data.profileMeta.profileId` (dentro del blob de Storage del perfil, no en el registro liviano de `profiles.js`) — por eso viaja automáticamente con `exportProfile()`/`importProfile()`, sin necesitar código adicional en esas funciones más allá de generarlo cuando falta.
- Se genera en exactamente 3 momentos: `create()` (perfil nuevo), `resetProgress()` (nuevo perfil académico, ver §4), `importProfile()` (solo si el archivo importado no trae uno — perfiles exportados antes de esta fase).
- **No depende del nombre.** Cambiar el alias (antes del bloqueo) no genera un ID nuevo.

## 2. Qué se puede editar y cuándo

| Campo | Antes del primer examen aprobado | Después |
|---|---|---|
| Nombre (alias) | ✅ Editable | ❌ Bloqueado |
| Grupo | ✅ Editable | ❌ Bloqueado |
| Avatar | ✅ Editable | ✅ Sigue editable — **nunca se bloquea** |
| Preferencias (accesibilidad, sonido) | ✅ Editable | ✅ Sigue editable |

## 3. La regla oficial de bloqueo

> "Al aprobar el primer examen, la identidad académica queda bloqueada."

**Detección:** no se modificó ninguna de las 9 unidades para disparar esto. `Gamification.checkBadges()` — que ya se llama ampliamente en todo el proyecto (tras cada `addXP`, al abrir Mi Progreso, etc.) — revisa en cada llamada si `identityLock.locked` es `false` y si **alguna** de las 9 unidades tiene `examBest` por encima de su umbral de aprobación (70, igual que todos los exámenes). Si es así, bloquea inmediatamente y registra:

```js
identityLock: {
  locked: true,
  lockedAt: <timestamp>,
  reason: 'first-exam-passed'
}
```

**Dónde se hace cumplir:** dentro de `MQCProfiles.rename(id, alias)` y `MQCProfiles.setGroup(id, group)` — ambas funciones revisan `identityLock.locked` antes de aplicar cualquier cambio, y devuelven `{ ok:false, reason:'identity-locked', message:'...' }` si está bloqueado. Esto significa que el bloqueo se hace cumplir **en el mismo punto de entrada que cualquier código use para cambiar el nombre**, sin importar desde qué pantalla se llame.

**Mensaje mostrado:**
> "Identidad académica protegida. Este perfil ya contiene resultados evaluativos. El nombre y el grupo no pueden modificarse para preservar la integridad del progreso."

## 4. Cambio excepcional de identidad

No existe ningún PIN docente ni mecanismo que finja ser una seguridad real — sería falso en una aplicación 100% local (ver limitaciones en `MQC_MULTIGRADO_ARCHITECTURE.md` §6). Las únicas 2 opciones reales tras el bloqueo:

1. **Mantener la identidad bloqueada** (comportamiento por defecto, no requiere acción).
2. **Restablecer completamente el progreso** (`MQCProfiles.resetProgress(id)`, ya existía en el proyecto desde antes de esta fase — se extendió):
   - Borra todo el progreso académico y estadísticas del perfil (misma función que ya usaba el botón "Reiniciar" del gestor de perfiles).
   - **Genera un `profileId` completamente nuevo** — el anterior queda "gastado" porque tuvo resultados asociados; no se reutiliza.
   - Desbloquea `identityLock` automáticamente (vuelve a sus valores por defecto).
   - Se trata, a todo efecto práctico, como un perfil académico nuevo — incluyendo la posibilidad de volver a editar nombre y grupo libremente hasta el próximo examen aprobado.
3. **Crear un perfil nuevo** (`MQCProfiles.create(...)`) — la alternativa obvia si se prefiere no perder el historial del perfil bloqueado.

**No se permite** conservar los resultados evaluativos cambiando solamente el nombre — esa combinación no existe en ningún punto del código.

## 5. Confirmación antes del bloqueo

Antes de aprobar el primer examen, el nombre y el grupo siguen editables sin restricción — pero el texto sugerido para advertir al estudiante (a incorporar en la pantalla de edición de perfil, ver Roadmap):

> "Verificá que el nombre y el grupo sean correctos. Al aprobar tu primer examen, estos datos quedarán protegidos."

## 6. Registro y trazabilidad

Cada perfil guarda, dentro de `data.profileMeta`:

- `profileId` — identificador inmutable
- `createdAt` — fecha de creación (o de la última vez que se "recreó" vía reset)
- `lastImportAt` — fecha de la última importación (null si nunca se importó)
- `importCount` — cuántas veces se importó este mismo perfil
- `schemaVersion` — 2 desde esta fase

No se guarda ningún dato personal sensible más allá del nombre y grupo que el propio estudiante ingresa voluntariamente.
