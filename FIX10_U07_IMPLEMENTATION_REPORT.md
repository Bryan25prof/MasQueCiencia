# FIX10_U07_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U07: Gravitación Universal y Movimiento Satelital

**Fecha:** 2026-09-08
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad VII (páginas 268-291).
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01 a U06 no se tocaron. Esta es la ÚLTIMA unidad de Física 10.° — NO se inició Física 11.°.

---

## ⚠️ Nota importante sobre un incidente durante esta sesión

A mitad del desarrollo de esta unidad, el sistema de archivos se reinició y **se perdió todo el proyecto local**. Se reconstruyó exitosamente extrayendo la base original (agosto 22) y aplicando, en orden cronológico exacto, las 28 entregas ya realizadas anteriormente (todas seguían disponibles como archivos ya compartidos). Se verificó con Chromium real que la reconstrucción quedó idéntica al estado esperado (las 6 unidades de Física U01-U06 funcionando correctamente) antes de continuar con U07.

## 1. Advertencia de la fuente respetada

El libro repite por error de imprenta un título relacionado con "Dinámica y las Leyes de Newton" en la Unidad VII — el contenido real es Gravitación Universal, completamente distinto de U06. Se confirmó esto revisando las páginas reales antes de construir cualquier contenido.

## 2. Contenido curricular — 6 temas

1. Una fuerza que alcanza el universo (F = G·m₁·m₂/r²)
2. Campo gravitacional (g = G·M/r², diferencia crítica r = R + h)
3. Newton y Einstein: dos miradas (conceptual, analogía de la tela elástica)
4. Caer sin tocar el suelo (movimiento satelital, inercia + gravedad → órbita)
5. Tierra y Luna: un sistema conectado (mareas, día, eclipses, escudo lunar)
6. Las estrellas también cambian (ciclo estelar — **verificado en la fuente antes de construir**, ver sección siguiente)

## 3. Verificación de 7.7 (Ciclo de vida de las estrellas)

Tal como exigía el sprint, se revisó la página 279 del libro ANTES de construir el Tema 6. Contenido real encontrado: nube de gas → estrella (fusión H→He) → gigante roja → nebulosa planetaria → enana blanca → enana negra (para estrellas tipo Sol); supernova → estrella neutrónica (masas hasta 40 veces el Sol); agujero negro (masas mayores a 40 veces el Sol). Todo el contenido de Tema 6 y las 7 preguntas del banco sobre ciclo estelar están respaldadas por este texto real — no se inventó ningún dato astronómico.

## 4. Simuladores (3)

1. **Gravity Lab MQC** (el estrella) — dos cuerpos separados por r, con flechas de atracción iguales y opuestas (conectando con la Tercera Ley de U06). Modo Explora: sliders de m₁, m₂, r. Modo Predice: 4 escenarios de proporcionalidad.
2. **Campo G MQC** — selector Tierra/Marte (ambos con datos reales del libro) + altura, mostrando explícitamente r = R + h.
3. **Orbit Lab MQC** — conceptual: velocidad tangencial determina si el objeto cae, orbita, o escapa.

## 5. Verificación matemática — los 7 casos de control del sprint

Verificados con Node.js antes de escribir contenido:

| Caso | Datos | Esperado | Confirmado |
|---|---|---|---|
| 1 | m₁×2 | F×2 | ✅ |
| 2 | m₁×2 y m₂×2 | F×4 | ✅ |
| 3 | r×2 | F/4 | ✅ (además confirmado en Chromium real: ratio=0,250) |
| 4 | r×3 | F/9 | ✅ |
| 5 | g=GM/r², r×2 | g/4 | ✅ |
| 6 | r=R+h | — | ✅ (Campo G Lab lo muestra explícitamente) |
| 7 | Tierra-satélite | fuerzas iguales/opuestas, aceleraciones distintas | ✅ (banco fix10u07-11/12) |

También se verificó g en la superficie terrestre (≈9,83 m/s²) y en Marte con los datos reales del libro (M=6,4×10²³ kg, R=3,35×10⁶ m → g≈3,80 m/s²) — confirmado en Chromium real.

## 6. Juego — "Arquitecto de Órbitas" (9 niveles)

Variables gravitatorias, comparar fuerzas, efecto de masas, efecto de r², campo gravitacional, gravedad con altura, movimiento satelital, Tierra-Luna, e integración final. Mismo patrón anti-farming.

## 7. Misión — "Operación Órbita" (2 fases)

Fase 1: sistema planeta-satélite (m₁=6×10¹⁰kg, m₂=4×10¹⁰kg, r=4×10⁵m → F≈1,00N). Fase 2: se duplica r → F≈0,25N (exactamente F/4, confirmado). Validación numérica con tolerancia y respuesta de texto (25-220 caracteres).

## 8. Examen — banco de 70 preguntas, 20 por intento

Distribución lograda: ~25% gravitación/proporcionalidad, ~20% campo/g/altura-distancia, ~10% Newton-Einstein, ~20% movimiento satelital/satélites, ~15% Tierra-Luna, ~10% ciclo estelar (solo contenido verificado en 7.7).

## 9. XP máximo legítimo obtenible en U07 (para MQC XP 2.0)

Sistema actual reutilizado sin cambios de rangos: 6 temas × XP 'topic-read', 3 simuladores × XP 'simulator-done', 1 XP 'game-won' (juego de 9 niveles completo), 1 XP 'exam-done' (examen aprobado, una sola vez), 1 XP 'fisica10-mission-done' (misión de 2 fases).

## 10. Gamificación

Insignia nueva: **🌌 Dominio Gravitacional**, mismo criterio anti-farming que las anteriores.

## 11. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Reconstrucción del proyecto tras la pérdida del filesystem | ✅ Verificada antes de continuar |
| Los 7 casos de control matemáticos | ✅ |
| Gravity Lab: ratio F(r×2)/F = 0,250 exacto | ✅ |
| Campo G: datos reales de Marte del libro (g≈3,80 m/s²) | ✅ |
| Orbit Lab: carga correctamente | ✅ |
| Juego: 9 niveles presentes | ✅ |
| Misión: 2 fases, F≈1,00N y F≈0,25N (exactamente F/4) | ✅ |
| Examen: 20 de 70, examen completo de principio a fin | ✅ |
| No regresión: FIX10-U01 a U06 siguen disponibles e intactas | ✅ |
| Candado de publicación: U07 sigue oculta para visitantes normales | ✅ |
| No regresión general: Química, PNE, navegación | ✅ Sin errores de consola, desktop/iPhone/Android |

## 12. Archivos creados/modificados

- `js/units/fisica10/fix10-u07.js` (nuevo)
- `js/data/banco-fix10-u07.js` (nuevo, 70 preguntas)
- `js/modules/fisica10.js` (metadata de U07 agregada)
- `js/core/gamification.js` (insignia 🌌 Dominio Gravitacional)
- `index.html` (scripts de los 2 archivos nuevos)

## 13. Física 10.° completa

Con FIX10-U07, las 7 unidades de Física 10.° quedan disponibles (bajo el candado de vista previa). **NO se inició Física 11.°**, tal como exigía el sprint. Se detiene acá para revisión docente.
