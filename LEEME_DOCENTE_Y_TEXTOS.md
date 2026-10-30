# Química 11.º para docentes verificados + textos viejos

Cuatro archivos, un solo commit. Los cuatro partieron de copias idénticas (SHA-256) a producción del 27-oct-2026.

## 1. La tarjeta "Química 11.º" de "Elegí tu año" ahora respeta al docente verificado
`js/modules/grade-select.js` (26,803 B). Era la única entrada que no consultaba `AccessControl.canExplore`: aunque el menú lateral, el Simulacro, el Desafío Final y el módulo grade11 ya dejaban pasar al docente verificado, esa tarjeta seguía en "🔒 Bloqueada" con el botón deshabilitado. Ahora un docente verificado la ve "🔓 Disponible" con el botón "Explorar Química 11.º". Estudiantes y docentes sin verificar siguen viendo exactamente lo de siempre.
Además: "4 experiencias en desarrollo — el contenido se irá incorporando…" → "4 unidades disponibles — empezá por la primera y avanzá a tu ritmo." (las 4 unidades están publicadas).

## 2. Textos que seguían diciendo "en desarrollo" (todas las unidades ya están activas)
- `js/modules/fisica10.js` (20,865 B) y `js/modules/fisica11.js` (18,036 B): "Física X.° está en desarrollo progresivo…" → "Explorá las unidades, hacé sus exámenes y, si ya dominás el curso, acreditalo con el Examen de Suficiencia."
- `js/modules/grade11.js` (15,859 B): "Tu acceso ya está preparado. Las experiencias de este nivel se irán incorporando gradualmente." → el mismo texto nuevo.

## Importante: docente sin verificar
No cambia. Un perfil que elige el rol "docente" pero no pasó la Activación Docente (código) NO recibe acceso total: ve los mismos candados que un estudiante. Es la regla de producto de AccessControl ("sin excepciones") para que nadie se autoproclame docente. Para liberar todo hay que activar el perfil con el código docente.

Commit sugerido: `Quimica 11 visible para docente verificado en Elegi tu anio y textos de unidades al dia`
Pruebas locales: docente sin verificar bloqueado; docente verificado ve la tarjeta disponible; estudiante sin cambios (bloqueado con sus dos rutas / disponible si ya la desbloqueó); sin texto viejo en Física. Tras subir: Ctrl+F5 (caché ~10 min).
