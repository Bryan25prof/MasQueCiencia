# Examen de Suficiencia de Biología 10.º y 11.º (por simetría)

Cuatro archivos, un solo commit. Cada uno partió de una copia idéntica (SHA-256) a producción del 25-oct-2026.
- `js/shared/suficiencia-adapter.js` (15,807 B): cursos `bio10` y `bio11` con sus bancos (PREGUNTAS_BIO10_U01..U09 = 450 preguntas; PREGUNTAS_BIO11_U01..U05 = 250).
- `js/modules/suficiencia.js` (21,131 B): el motor único acepta los 2 cursos nuevos y "Volver" regresa a Biología.
- `js/modules/biologia10.js` (21,776 B) y `js/modules/biologia11.js` (20,002 B): tarjeta "Examen de Suficiencia" al final de la lista de unidades (igual que Física y Química) y el texto de introducción, que aún decía "Biología X.° está en desarrollo progresivo", ahora dice "Explorá las unidades, hacé sus exámenes y, si ya dominás el curso, acreditalo con el Examen de Suficiencia."

## Reglas (idénticas a Química y Física)
20 preguntas estratificadas por unidad, se aprueba con 14/20 (70 %), sin límite de intentos ni de tiempo, `acreditado` pegajoso. NO da XP, NO desbloquea nada, NO condiciona el Simulacro PNE (la Ruta rápida sigue pidiendo solo Química y Física). Un docente verificado puede presentarlo pero no se guarda nada.

## Qué NO incluye (decisión pendiente)
La credencial de Biología se guarda en el perfil del estudiante (data.suficiencia.bio10/bio11, sin tocar storage.js: el módulo ya crea la clave al guardar), pero **todavía no se sincroniza al panel docente**: `analytics-hooks.js` solo envía q10/q11/fix10/fix11 y la tabla `suficiencia_resultados` de Supabase tiene un CHECK que solo admite esos 4 cursos. Dejarlo así no produce errores (la lista fija ignora Biología). Para verla en Seguimiento académico haría falta una Etapa B: ampliar el CHECK y la vista en Supabase (SQL aditivo que ejecutas tú), la lista SUF_CURSOS en analytics-hooks.js y los badges en analytics-admin.js.

Commit sugerido: `Suficiencia: Biologia 10.o y 11.o (por simetria, sin XP ni condicionar el Simulacro)`
Pruebas locales 18/18. Tras subir: Ctrl+F5 (caché ~10 min). Verificar en producción que Química 10.º/11.º y Física 10.º/11.º siguen con su banco (mi copia local no trae sus bancos).
