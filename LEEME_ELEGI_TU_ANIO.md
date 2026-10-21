# "Elegí tu año" de Física y Biología — texto y progreso al día

**Problema:** las tarjetas decían "FIX10-U01 / BIO10-U01 disponible — las siguientes unidades se irán incorporando" y el progreso medía solo la unidad 1, aunque Física y Biología ya tienen todas sus unidades publicadas. Un estudiante nuevo concluía que solo existía una unidad.

**Cambio (solo js/modules/grade-select.js, 22,476 B):**
- Texto: "8 / 6 / 9 / 5 unidades disponibles — empezá por la primera y avanzá a tu ritmo." (Física 10.º / Física 11.º / Biología 10.º / Biología 11.º)
- "Progreso del curso: N %" = promedio del progreso de TODAS las unidades del curso (usa las mismas funciones de Storage que ya existían; solo lee).
- Química, botones, banderas de publicación y todo lo demás: sin cambios.

Partió de una copia idéntica (SHA-256 0c79af4050f3) a producción del 20-oct-2026.

Commit sugerido: `Elegi tu anio: Fisica y Biologia muestran todas sus unidades y el progreso del curso`
Pruebas locales 5/5. Tras subir: Ctrl+F5 (caché ~10 min).
