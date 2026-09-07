# FIX10_U05_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U05: Análisis Gráfico de Movimientos

**Fecha:** 2026-09-06
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad V.
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01 a U04 no se tocaron. No se adelantó contenido de U06 (Dinámica/Leyes de Newton).

---

## 1. Contenido curricular — 5 temas

1. El movimiento habla en gráficas (lectura antes de cálculo)
2. Gráficas posición/distancia vs. tiempo (pendiente = velocidad; error crítico: la gráfica NO es la trayectoria física)
3. Velocidad vs. tiempo (pendiente = aceleración; línea horizontal ≠ reposo, a diferencia de x-t)
4. Área bajo la curva (área en v-t = desplazamiento; desplazamiento neto vs. distancia total)
5. Reconstruir historias de movimiento (gráficas segmentadas, integración con MRU/MRUA de U04)

## 2. Generador de gráficas SVG propio

Se construyó un generador reutilizable (`_svgGrafica` / `_svgAreaVT`) que dibuja líneas y áreas con escalas matemáticamente coherentes a los valores mostrados — nunca imágenes externas ni dibujos meramente ilustrativos. Se usó en teoría, los 3 simuladores, el juego, la misión, y 32 de las 60 preguntas del examen.

## 3. Bug real encontrado y corregido durante la prueba

En el Modo Predice del Motion Graph Lab, la gráfica correcta quedaba **siempre en la posición "A"** — solo se mezclaba el orden de las etiquetas, no la asignación real de cuál gráfica (correcta/distractor) ocupaba cada posición. Se corrigió mezclando el conjunto completo antes de asignar letras. **Verificado matemáticamente** con 1000 simulaciones: la posición correcta se distribuye de forma pareja entre A/B/C (303/369/328).

## 4. Simuladores (3)

1. **Motion Graph Lab MQC** (el estrella) — Modo Explora: 4 tipos de velocidad (positiva/cero/negativa/cambiante), mostrando SUS DOS gráficas (x-t y v-t) simultáneamente. Modo Predice: 3 escenarios, elegir la gráfica correcta antes de confirmar.
2. **Detective de Pendientes** — 10 escenarios reales con gráficas, identificando velocidad máxima, reposo, velocidad negativa, aceleración.
3. **Laboratorio de Áreas** — identificar la figura (rectángulo/triángulo) bajo una gráfica v-t y calcular el área/desplazamiento.

## 5. Juego — "Reconstruye el Viaje" (6 niveles)

Reposo/movimiento, dirección, comparar velocidades, interpretar aceleración, área/desplazamiento, e historia completa (desplazamiento neto = 0 pese a haber recorrido distancia). Mismo patrón anti-farming.

## 6. Misión — "Caja Negra del Movimiento"

Gráfica segmentada en 3 intervalos (0-4s: +40m, 4-7s: reposo, 7-11s: -30m). El estudiante identifica el intervalo de reposo, calcula distancia total (70m) y desplazamiento neto (10m) con tolerancia, y escribe una explicación validada por longitud.

## 7. Examen — banco de 60 preguntas, 30 por intento

Distribución lograda: ~10% conceptos generales, ~35% interpretación x-t/d-t, ~30% interpretación v-t, ~15% pendiente/cálculo, ~10% área/distancia/desplazamiento. **32 de las 60 preguntas (53%) usan gráficas SVG reales** — se evitó explícitamente un banco puramente textual, tal como exigía el sprint.

## 8. Pruebas matemáticas verificadas (de los 7 casos de control del sprint)

| Caso | Datos | Esperado | Estado |
|---|---|---|---|
| 1 — x-t | (0,0) a (5,25) | v=5 m/s | ✅ Usado en banco (fix10u05-12) |
| 3 — regreso | 0→+50→0 | Despl=0, Dist=100 | ✅ Usado en banco (fix10u05-26/27) y Motion Graph Lab |
| 4 — v-t rectángulo | v=10, t=5 | Área=50m | ✅ Verificado en Laboratorio de Áreas |
| 6 — área triangular | base=10, altura=20 | Despl=100m | ✅ Verificado (fórmula base×altura/2) |
| 7 — áreas mixtas | +80 y -30 | Despl neto=50, Dist=110 | ✅ Usado en banco (fix10u05-59/60) y teoría |

## 9. XP máximo legítimo obtenible en U05 (para MQC XP 2.0)

Sistema actual reutilizado sin cambios de rangos: 5 temas × XP 'topic-read', 3 simuladores × XP 'simulator-done', 1 XP 'game-won' (juego completo), 1 XP 'exam-done' (examen aprobado, una sola vez), 1 XP 'fisica10-mission-done' (misión).

## 10. Gamificación

Insignia nueva: **📈 Intérprete del Movimiento**, mismo criterio anti-farming que las anteriores.

## 11. Tarjeta y texto del hub

Actualizado el texto superior de "La primera unidad ya está disponible..." (obsoleto) a un texto atemporal: "Física 10.° está en desarrollo progresivo. Explorá las unidades disponibles y continuá construyendo tu dominio de la Física." — confirmado en pantalla.

## 12. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Motion Graph Lab: 2 gráficas simultáneas, 4 tipos de velocidad | ✅ |
| Bug de mezcla del Modo Predice: encontrado y corregido, verificado con 1000 simulaciones | ✅ |
| Detective de Pendientes: gráficas reales, 4 opciones | ✅ |
| Laboratorio de Áreas: identificar figura + calcular área (50m confirmado) | ✅ |
| Juego: 6 niveles con gráficas, nivel de área resuelto correctamente | ✅ |
| Misión: gráfica segmentada, validación numérica y de texto | ✅ |
| Examen: 30 de 60, con 16 preguntas con gráfica en un examen real | ✅ |
| No regresión: FIX10-U01 a U04 siguen disponibles e intactas | ✅ |
| Candado de publicación: U05 sigue oculta para visitantes normales | ✅ |
| No regresión general: Química, PNE, Analytics, Apoyo, selector de colegio | ✅ Sin errores de consola, desktop/iPhone/Android |

## 13. Archivos creados/modificados

- `js/units/fisica10/fix10-u05.js` (nuevo)
- `js/data/banco-fix10-u05.js` (nuevo, 60 preguntas)
- `js/modules/fisica10.js` (metadata U05 + texto atemporal del hub actualizado)
- `js/core/gamification.js` (insignia 📈 Intérprete del Movimiento)
- `index.html` (scripts de los 2 archivos nuevos)

## 14. NO se inició FIX10-U06

Se detiene acá para revisión docente, tal como pedía el sprint.
