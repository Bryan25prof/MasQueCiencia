# FIX10_U08_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U08: Trabajo Mecánico y Energía

**Fecha:** 2026-09-08
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad VIII (páginas 292-336) — construida directamente a partir del libro, sin prompt maestro previo (a pedido explícito).
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01 a U07 no se tocaron. **Esta es la ÚLTIMA unidad — el libro termina en la página 336, confirmado que NO existe Hidrostática ni ninguna Unidad IX.**

---

## 1. Contexto: por qué se construyó esta unidad

El docente preguntó si el libro incluía Hidrostática al final de décimo año. Se revisó el libro completo (336 páginas) antes de responder: **no hay Hidrostática** — en cambio, sí existe una Unidad VIII completa (Trabajo Mecánico y Energía, apartados 8.1 a 8.6) que nunca se había construido. Se confirmó esto con el docente antes de proceder, y se construyó sin prompt maestro previo, siguiendo el mismo patrón exacto de las 7 unidades anteriores.

## 2. Contenido curricular — 6 temas

1. El trabajo mecánico (W=F·cosθ·d, condiciones necesarias, casos especiales 0°/90°/180°)
2. Trabajo neto y análisis gráfico (suma escalar, área bajo F-d, conecta con U05)
3. Potencia mecánica (P=W/t, proporcionalidad inversa con el tiempo)
4. Energía cinética y potencial (Ec=mv²/2, Ep=mgh, Em=Ec+Ep, dependencia del punto de referencia)
5. Teorema del Trabajo y la Energía (W=ΔEc, W=−ΔEp)
6. Ley de Conservación de la Energía Mecánica (EM constante sin fricción — caída libre, péndulos, planos, resortes)

## 3. Simuladores (3)

1. **Energy Lab MQC** (el estrella) — replica el ejemplo EXACTO del libro: pelota de 1 kg cayendo desde 20 m (Em=196J constante). Modo Explora: slider de altura mostrando Ec/Ep/Em en vivo. Modo Desafío: 6 rondas con distintas masas y alturas.
2. **Work Lab MQC** — F, ángulo y d interactivos, mostrando trabajo positivo/negativo/nulo en vivo.
3. **Power Lab MQC** — comparación de motores, proporcionalidad inversa tiempo-potencia.

## 4. Verificación matemática — todos los ejemplos del libro usados como control

Verificados con Node.js antes de escribir contenido, y confirmados en Chromium real:

| Ejemplo del libro | Datos | Esperado | Confirmado |
|---|---|---|---|
| Pelota cayendo | m=1kg, h₀=20m | Em=196J constante | ✅ (Chromium: h=10m → Ep=98J, Ec=98J exacto) |
| Avión frenando | F=9000N, d=25m, θ=180° | W=-225.000J | ✅ (Chromium: Work Lab muestra "NEGATIVO") |
| Trabajo neto (3 fuerzas) | F₁,F₂,F₃ con distintos ángulos | W_neto=1644,42J | ✅ Node |
| Caja levantada | m=85kg, h=1,8m | W≈1499,4J | ✅ Node |

## 5. Juego — "Ingeniero de Energía" (7 niveles)

Trabajo con fuerza perpendicular (W=0), signo del trabajo, potencia comparada, Ec, energía en caída libre, conservación de energía en péndulo. Mismo patrón anti-farming.

## 6. Misión — "Auditoría Energética" (2 fases)

Fase 1: pelota de 2 kg cayendo desde 25 m (Em=490J, Ec a mitad de altura=245J). Fase 2: se duplica la altura inicial a 50 m (Em=980J, Ec_media=490J) — evaluando la relación directa entre h₀ y Em. **Confirmado en Chromium real: ambas fases completadas con los valores exactos.**

## 7. Examen — banco de 60 preguntas, 20 por intento

Distribución lograda: ~20% trabajo mecánico, ~15% trabajo neto/gráfico, ~10% potencia, ~25% energía cinética/potencial, ~15% teorema trabajo-energía, ~15% conservación de energía mecánica. Todas las preguntas de cálculo usan los ejemplos reales del libro (avión frenando, electricista en la torre, avión volando, pelota cayendo).

## 8. XP máximo legítimo obtenible en U08

Sistema actual reutilizado sin cambios de rangos: 6 temas × XP 'topic-read', 3 simuladores × XP 'simulator-done', 1 XP 'game-won' (juego de 7 niveles completo), 1 XP 'exam-done' (examen aprobado, una sola vez), 1 XP 'fisica10-mission-done' (misión de 2 fases).

## 9. Gamificación

Insignia nueva: **⚡ Maestro de la Energía** — descripción especial: "¡Física 10.° completa!", ya que esta es la última unidad. Mismo criterio anti-farming que las anteriores.

## 10. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Energy Lab: caso exacto del libro (h=10m → Ep=98J, Ec=98J) | ✅ |
| Work Lab: 180° produce trabajo negativo | ✅ |
| Power Lab: comparación de motores | ✅ |
| Juego: 7 niveles presentes | ✅ |
| Misión: 2 fases, Em=490J y Em=980J exactos | ✅ |
| Examen: 20 de 60, examen completo de principio a fin | ✅ |
| No regresión: FIX10-U01 a U07 siguen disponibles e intactas | ✅ |
| Candado de publicación: U08 sigue oculta para visitantes normales | ✅ |
| No regresión general: Química, PNE, navegación | ✅ Sin errores de consola, desktop/iPhone/Android |

## 11. Archivos creados/modificados

- `js/units/fisica10/fix10-u08.js` (nuevo)
- `js/data/banco-fix10-u08.js` (nuevo, 60 preguntas)
- `js/modules/fisica10.js` (metadata de U08 agregada)
- `js/core/gamification.js` (insignia ⚡ Maestro de la Energía)
- `index.html` (scripts de los 2 archivos nuevos)

## 12. 🎓 Física 10.° está completa

Con FIX10-U08, las 8 unidades reales del libro (confirmadas página por página, las 336 páginas completas) quedan construidas: U01 (contexto histórico), U02 (vectores), U03 (movimiento relativo), U04 (cinemática), U05 (gráficas), U06 (Newton), U07 (gravitación), U08 (trabajo y energía). Todas bajo el mismo candado de vista previa. Se detiene acá para revisión docente — queda pendiente el documento "Ruta de Cierre Maestra" que el docente compartió.
