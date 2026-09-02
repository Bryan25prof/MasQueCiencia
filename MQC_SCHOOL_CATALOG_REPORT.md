# MQC_SCHOOL_CATALOG_REPORT.md
## Hotfix — Catálogo Canónico de Colegios

**Fecha:** 2026-09-02
**Problema resuelto:** una misma institución aparecía fragmentada en Analytics por diferencias de escritura ("manuel benavides", "Liceo Ing. Manuel Benavides R.", etc.).

---

## 1. Catálogo implementado

28 centros educativos de la Dirección Regional de Heredia + "OTRO CENTRO EDUCATIVO", en `js/data/catalogo-colegios.js`. Cada uno con:
- `school_id` — identificador **estable** (ej. `HER_LIMBR`), nunca cambia aunque se ajuste el nombre visible.
- `school_name` — nombre oficial completo.
- `school_region` — por ahora siempre "Heredia" (arquitectura preparada para agregar otras regiones después, sin tocar lo ya construido).

## 2. Selector de colegio

Componente reutilizable (`_renderSelectorColegio` / `_bindSelectorColegio` en `profiles-ui.js`) con buscador en vivo — probado escribiendo "Benavides", encuentra correctamente el colegio. Se usa en los 4 lugares donde antes había un campo de texto libre: formulario de bienvenida, gestor de perfiles, editar perfil, y el modal de completar/actualizar perfil.

**"OTRO CENTRO EDUCATIVO":** al elegirlo, se guarda `school_id = 'OTHER'` y el nombre escrito queda en `colegio` — nunca se agrega automáticamente al catálogo oficial (queda a tu criterio incorporarlo después).

## 3. Perfiles nuevos

Ya no se puede continuar sin seleccionar un colegio (o "Otro" + nombre) — probado que el botón de crear rechaza si no hay selección.

## 4. Perfiles existentes — actualización progresiva

**No se tocó ningún dato automáticamente.** Se creó el modal **"ACTUALIZA TU CENTRO EDUCATIVO"**: aparece quando un perfil ya tiene un `colegio` (texto libre) pero no tiene `school_id` — pide seleccionar del catálogo, y al confirmar actualiza solo ese dato. **Probado con Chromium real:** un perfil simulado con `colegio: "manuel benavides"` sin `school_id` recibió el modal correcto, y tras seleccionar el colegio real, el XP y el grupo quedaron intactos.

## 5. Normalización legacy (alias)

Tabla `school_alias_map` en Supabase, con 7 alias iniciales ya cargados para el caso de ejemplo del sprint (todas las variantes de "Manuel Benavides" → `HER_LIMBR`). **No se hizo matching agresivo por similitud** — solo estos alias revisados a mano.

## 6. Administración — Gestión de Colegios

Nueva pestaña en el panel (`analytics-admin.js`): lista los nombres de colegio sin `school_id` con su conteo de perfiles, y un botón "Unificar con →" que escribe en `school_alias_map` (protegida — solo el admin autenticado puede escribir ahí, mismo patrón que `profile_admin_state`). No borra ningún dato académico.

## 7. Panorama Global — agrupación corregida

Las vistas (`v_students_latest`, `v_seguimiento_academico`, `v_panorama_colegios`) ahora calculan un "school_id efectivo" (el explícito, o el resuelto por `school_alias_map`, o ninguno) y **Panorama Global agrupa por ese `school_id`, no por el texto del colegio** — así una institución con variantes de escritura ya unificadas produce una sola tarjeta.

## 8. SQL — no destructivo

`SUPABASE_SCHOOL_CATALOG_UPDATE.sql`: agrega columnas (`school_id`, `school_region` en `students`) y la tabla `school_alias_map`. La columna `colegio` original **no se elimina**, se mantiene por compatibilidad. Instrucciones paso a paso en `SUPABASE_SCHOOL_CATALOG_INSTRUCTIONS.md`.

## 9. Seguridad

`school_alias_map` sigue exactamente el mismo patrón que `profile_admin_state`: RLS activo, **ninguna política para el rol `anon`** — solo el docente autenticado puede leer o escribir ahí. No se usa `service_role` en ningún archivo del frontend.

## 10. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Buscar "Benavides" en el selector encuentra el colegio correcto | ✅ |
| Perfil nuevo sin elegir colegio → rechazado | ✅ |
| "Otro" sin escribir nombre → rechazado | ✅ |
| "Otro" con nombre → se crea con `school_id = 'OTHER'` | ✅ |
| Perfil legacy con colegio de texto libre y sin `school_id` → recibe el modal de actualización | ✅ |
| Actualización de colegio no pierde XP ni grupo | ✅ |
| Persistencia: cerrar y reabrir mantiene el colegio elegido | ✅ |
| No regresión: Química, Física, PNE, Analytics, Apoyo, modo desarrollador | ✅ Sin errores de consola, desktop/iPhone/Android |

## 11. Casos pendientes / limitaciones conocidas

- El catálogo solo cubre Heredia por ahora (tal como pedía el sprint) — ampliar a otras regiones es una tarea aparte, agregando filas al mismo archivo.
- La herramienta "Gestión de Colegios" no pudo probarse contra Supabase real desde este entorno (requiere tu proyecto en vivo) — sí se verificó la sintaxis y la lógica del código.
- Los perfiles marcados "Otro" con nombres muy similares entre sí (ej. dos estudiantes que escriben variantes distintas de un mismo colegio no catalogado) seguirán apareciendo por separado hasta que decidas incorporar ese colegio al catálogo oficial o agregarlo como alias.

Al terminar, se detiene acá.
