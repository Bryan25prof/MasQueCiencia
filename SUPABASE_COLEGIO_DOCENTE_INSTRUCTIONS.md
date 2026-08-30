# SUPABASE_COLEGIO_DOCENTE_INSTRUCTIONS.md
## Cómo activar "Colegio" + "Docente" + "Panorama Global" — paso a paso

---

### Paso 1 — Correr la migración SQL

1. SQL Editor → pestaña nueva y vacía.
2. Pegá **todo** el contenido de `SUPABASE_MIGRATION_colegio_docente.sql`.
3. Run. Debería decir "Success".

### Paso 2 — Confirmar

1. Table Editor → tabla `students` → confirmá que ahora tiene columnas `colegio` y `rol`.
2. Table Editor → confirmá que aparece la vista `v_panorama_colegios`.

### Paso 3 — Subir el código

Subí estos 5 archivos, reemplazando los que ya tenés:

| Archivo | Va en |
|---|---|
| `profiles.js` | `js/shared/` |
| `profiles-ui.js` | `js/shared/` |
| `analytics-hooks.js` | `js/shared/` |
| `analytics-admin.js` | `analytics/` |

*(`analytics-config.js` no cambió esta vez — no hace falta tocar tu config real.)*

### Paso 4 — Probar en vivo

1. Creá un perfil nuevo — ahora vas a ver el botón "🎓 Estudiante / 👩‍🏫 Docente" y el campo "Colegio/Institución", ambos antes de poder crear.
2. Probá crear un perfil de tipo Docente — confirmá que el campo de grupo desaparece (no aplica).
3. Entrá al panel MQC Analytics → pestaña nueva "🏫 Panorama Global" → deberías ver una tarjeta por cada colegio que ya tengas cargado, y una tarjeta "❔ Sin colegio (legacy)" agrupando todo lo anterior a este cambio.
4. En "Seguimiento académico" fijate la columna nueva "Tipo" (Estudiante/Docente) y el filtro nuevo al lado del de Actividad.

### Sobre los perfiles que ya existían (tu pregunta de si "podemos perder información")

**No se pierde nada.** Los perfiles viejos, sin colegio, van a mostrar un modal obligatorio "Completa tu perfil" la próxima vez que ese estudiante entre — pidiéndole el colegio (y el grupo también, si le faltaba). Se guarda con la misma función seguridad ya probada antes (solo agrega el dato que falta, nunca toca XP, progreso, notas, medallas ni el profileId). Mientras tanto, en el panel, esos perfiles simplemente aparecen agrupados como "Sin colegio (legacy)" — nada se rompe ni desaparece.
