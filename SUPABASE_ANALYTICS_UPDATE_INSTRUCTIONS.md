# SUPABASE_ANALYTICS_UPDATE_INSTRUCTIONS.md
## Cómo aplicar la actualización de esta vuelta — paso a paso

No hace falta saber SQL para seguir esto. Son los mismos pasos que ya hiciste otras veces.

---

### Paso 1 — Abrir el SQL Editor

1. Entrá al dashboard de tu proyecto en [supabase.com](https://supabase.com).
2. En el menú de la izquierda, hacé clic en **SQL Editor**.
3. Hacé clic en el botón **"+"** para abrir una pestaña nueva y vacía (no reutilices una pestaña con texto viejo).

### Paso 2 — Pegar y ejecutar la migración

1. Abrí el archivo `SUPABASE_MIGRATION_analytics_sprint.sql` (te lo entrego junto con este documento).
2. Copiá **todo** su contenido, de punta a punta.
3. Pegalo en la pestaña vacía del SQL Editor.
4. Hacé clic en **Run** (o Ctrl+Enter).
5. Debería decir **"Success"**. Es completamente seguro — no borra ni modifica ningún dato existente, solo agrega cosas nuevas.

### Paso 3 — Confirmar que se crearon las tablas nuevas

1. Andá a **Table Editor** (menú izquierdo).
2. Confirmá que ahora aparecen dos tablas nuevas: `profile_sessions` y `profile_admin_state`.
3. Abrí la tabla `pne_attempts` y confirmá que ahora tiene una columna nueva llamada `source`.

### Paso 4 — Actualizar tu `analytics-config.js` real

Igual que la vez pasada con `profileDeletions`, agregá esta línea dentro de `tablas` en tu archivo real de GitHub (el que tiene tu URL y tu clave):

```js
profileSessions: 'profile_sessions'
```

⚠️ **Ojo con la coma** (el mismo detalle de la vez pasada): la línea ANTERIOR a esta necesita terminar en coma, y esta nueva línea (al ser la última) **no** lleva coma al final. Quedaría así:

```js
tablas: {
  students: 'students',
  unitExamResults: 'unit_exam_results',
  pneAttempts: 'pne_attempts',
  pneAnswers: 'pne_answers',
  profileDeletions: 'profile_deletions',
  profileSessions: 'profile_sessions'
}
```

### Paso 5 — Subir los archivos de código a GitHub

Subí los archivos de esta entrega (ver la tabla de "Archivos modificados" en `MQC_ANALYTICS_DATA_QUALITY_PNE_AUDIT.md`) a sus carpetas correspondientes, como ya hiciste en entregas anteriores.

### Paso 6 — Probar que todo funciona en vivo

1. Esperá 1-2 minutos a que GitHub Pages publique.
2. Creá un perfil de prueba nuevo (con grupo, ya es obligatorio) y completá un Simulacro PNE.
3. En el SQL Editor, corré:
   ```sql
   select * from pne_attempts order by fecha desc limit 5;
   ```
   Deberías ver tu intento de prueba ahí, con `source = 'live_event'`.
4. Entrá al panel MQC Analytics → "Seguimiento académico" y confirmá que tu perfil de prueba ya aparece con el PNE registrado y una columna "Estado" mostrando "Activo".
5. Probá el botón "📦 Archivar" sobre ese perfil de prueba, confirmá que desaparece de la vista por defecto, y que "↺ Restaurar" lo devuelve.
6. Andá a "Acerca de la Plataforma" y tocá 5 veces rápido sobre el logo — debería abrirse el panel de desarrollador ahí (ya no en el pie del sidebar).

Si algo de esto no sale como se espera, mandame una captura del error o del resultado y seguimos revisando juntos, igual que las veces anteriores.

---

## Notas de seguridad (para tu tranquilidad)

- Todo lo que agrega esta migración usa `if not exists` / `or replace` — es imposible que borre algo que ya tenías.
- La tabla `profile_admin_state` (archivar/restaurar) está diseñada para que **ningún estudiante pueda tocarla nunca**, ni por accidente ni a propósito — solo vos, ya logueado como admin en el panel, podés archivar o restaurar un perfil.
- No se te pide en ningún momento pegar tu `service_role key` — seguimos usando únicamente la `anon key` pública, como en toda la plataforma.
