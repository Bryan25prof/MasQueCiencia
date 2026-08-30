# SUPABASE_COLABORADOR_INSTRUCTIONS.md
## Activar "Apoyando MQC" — paso a paso

### Paso 1 — Correr la migración SQL

1. SQL Editor → pestaña nueva y vacía.
2. Pegá todo `SUPABASE_MIGRATION_colaborador_apoyo.sql`.
3. Run → "Success".

### Paso 2 — Confirmar

Table Editor → tabla `profile_admin_state` → confirmá que ahora tiene columnas `colaborador` y `colaborador_desde`.

### Paso 3 — Subir el código

| Archivo | Va en |
|---|---|
| `analytics-hooks.js` | `js/shared/` |
| `analytics-admin.js` | `analytics/` |

### Paso 4 — Cómo lo usás vos, día a día

1. Alguien te paga (PayPal o SINPE) y vos confirmás el pago con tus propios medios (recibo de PayPal, captura de SINPE, etc. — esto lo seguís haciendo vos, fuera de MQC).
2. Entrás al panel → "Seguimiento académico" → buscás el nombre del estudiante.
3. Apretás "💙 Marcar como Apoyando" → confirmás.
4. Listo — la próxima vez que ese estudiante entre a MQC, va a ver su nombre en dorado con la etiqueta "💙 Apoyando MQC".

Para revertir: mismo botón, ahora dice "💙 Quitar apoyo".

### Importante — qué NO hace esto

- No verifica el pago por vos — la confirmación es 100% manual, a tu criterio.
- No le da ninguna ventaja académica al estudiante (sin XP extra, sin desbloqueos, sin contenido exclusivo) — solo un reconocimiento visual en su propio perfil.
- No es instantáneo en tiempo real — se actualiza la próxima vez que ese estudiante abra la app, no mientras la tiene abierta en ese momento.
