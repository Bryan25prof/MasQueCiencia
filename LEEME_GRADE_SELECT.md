# grade-select.js — "Elegí tu año" al día + tarjeta "Primeros pasos"

Un solo archivo, un solo commit: `js/modules/grade-select.js` (26,248 B). Parte de una copia idéntica (SHA-256 0c79af4050f3) a producción del 20-oct-2026.
Reemplaza al zip MQC_ELEGI_TU_ANIO.zip (incluye todo lo de ese, más la tarjeta).

## 1. "Elegí tu año" de Física y Biología
Ya no dicen "solo la unidad 1 disponible". Ahora: "8 / 6 / 9 / 5 unidades disponibles — empezá por la primera y avanzá a tu ritmo." y "Progreso del curso: N %" = promedio de TODAS las unidades del curso. Química sin cambios.

## 2. Tarjeta "Primeros pasos" (hub de ciencias)
Guía de 3 pasos para el estudiante nuevo: elegir ciencia y año; estudiar una unidad y hacer su examen (70 % aprueba y da XP); desbloquear el Simulacro PNE (Suficiencias de Química y Física, o 2 exámenes de unidad por ciencia). Muestra el avance real "Química x/2 · Física y/2 · Biología z/2" y un botón directo a la pantalla de dos caminos.
- Aparece solo mientras el Simulacro PNE esté bloqueado; desaparece sola al desbloquearse.
- "Entendido" la oculta; se recuerda por perfil en ese navegador.
- No la ven los docentes verificados.
- Solo LEE (estado del Simulacro y Storage); no escribe progreso ni XP. Requiere el simulacro-nacional-adapter.js nuevo, que ya está en producción.

Commit sugerido: `Hub de ciencias: tarjeta Primeros pasos y Elegi tu anio con todas las unidades`
Pruebas locales: 5/5 (año) + 11/11 (tarjeta, incluido móvil 375 px sin scroll horizontal). Tras subir: Ctrl+F5 (caché ~10 min).
