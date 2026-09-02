# SUPABASE_SCHOOL_CATALOG_INSTRUCTIONS.md
## Catálogo de Colegios — paso a paso

### Paso 1 — Correr la migración SQL

1. SQL Editor → pestaña nueva y vacía.
2. Pegá todo el contenido de `SUPABASE_SCHOOL_CATALOG_UPDATE.sql`.
3. Run → debería decir "Success".

Es completamente seguro: no borra ni pisa ningún dato existente. Solo agrega columnas nuevas y una tabla nueva.

### Paso 2 — Confirmar

1. Table Editor → tabla `students` → confirmá que ahora tiene columnas `school_id` y `school_region`.
2. Confirmá que aparece la tabla nueva `school_alias_map`, con 7 filas ya cargadas (los alias conocidos de "Manuel Benavides").

### Paso 3 — Subir el código

| Archivo | Va en |
|---|---|
| `catalogo-colegios.js` | `js/data/` (archivo nuevo) |
| `profiles.js` | `js/shared/` (reemplaza) |
| `profiles-ui.js` | `js/shared/` (reemplaza) |
| `analytics-hooks.js` | `js/shared/` (reemplaza) |
| `analytics-admin.js` | `analytics/` (reemplaza) |
| `index.html` | raíz del repositorio (reemplaza) |
| `analytics/index.html` | `analytics/` (reemplaza — le agrega el script del catálogo) |

### Paso 4 — Probar en vivo

1. Creá un perfil nuevo. Deberías ver el selector de colegio con buscador — probá escribir "Benavides" y confirmá que aparece.
2. Elegí "OTRO CENTRO EDUCATIVO" y confirmá que pide el nombre antes de dejarte continuar.
3. Entrá al panel MQC Analytics → pestaña nueva "🗂️ Gestión de Colegios". Si tenés perfiles viejos con nombres como "manuel benavides" escritos a mano, deberían aparecer ahí con su conteo.
4. Elegí el colegio real en el desplegable ("Liceo Ingeniero Manuel Benavides Rodríguez") y apretá "Unificar".
5. Andá a "Panorama Global" y confirmá que esos perfiles ahora aparecen agrupados en **una sola tarjeta**, no varias sueltas.

### Sobre los perfiles que ya existen

No se pierde nada. Los perfiles con un colegio escrito a mano (sin `school_id`) van a ver, la próxima vez que entren, el modal "ACTUALIZA TU CENTRO EDUCATIVO" — seleccionan su colegio real del catálogo, y se actualiza sin tocar su XP, progreso, exámenes, PNE ni medallas. Mientras no lo actualicen, sus datos siguen intactos y visibles, solo que agrupados como "Sin colegio (legacy)" en Panorama Global (a menos que vos los unifiques a mano desde "Gestión de Colegios").

### Ampliar el catálogo más adelante

El catálogo vive en un solo archivo (`js/data/catalogo-colegios.js`). Para agregar un colegio nuevo (o una región nueva, como Alajuela o San José), se agrega una línea nueva al arreglo `CATALOGO_COLEGIOS` con su propio `school_id` — nunca reutilices un `school_id` ya existente ni cambies uno existente sin avisarme, porque eso sí podría fragmentar datos ya agrupados.
