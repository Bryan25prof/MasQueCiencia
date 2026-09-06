# FIX10_U04_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U04: Cinemática

**Fecha:** 2026-09-05
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad IV (páginas 129-141).
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01, U02 y U03 no se tocaron.

---

## 1. Estructura curricular encontrada en la fuente

La Unidad IV del libro cubre: 4.1 MRU, 4.2 MRUA, 4.3 Movimiento Vertical, 4.4 Comparación (formulario), 4.5 Estrategias de resolución, 4.6 Aplicaciones, 4.7 Movimiento Parabólico. **No incluye gráficas del movimiento** (eso es la Unidad V del libro — "Análisis gráfico de movimientos" — que queda para una unidad futura, tal como pide el sprint: no inventar contenido fuera de la fuente ni adelantar otras unidades).

## 2. Temas implementados (5)

1. Variables del movimiento (conecta con U02/U03; nota importante: el libro simplifica y usa velocidad/rapidez y desplazamiento/distancia indistintamente en estos movimientos rectilíneos)
2. MRU (4.1)
3. Aceleración y MRUA (4.2 + 4.4)
4. Movimiento vertical (4.3)
5. Movimiento parabólico (4.7, introductorio)

## 3. Ecuaciones utilizadas (del formulario real del libro, 4.4)

- MRU: v = d/t
- MRUA: a = (vf−vi)/t · d = vi·t + at²/2 · d = (vf²−vi²)/2a · d = ((vi+vf)/2)·t
- Vertical: mismas fórmulas con h y g en vez de d y a

## 4. Simuladores (3)

1. **Pista MRU** — Modo Explora (x₀, v, t) + Modo Desafío (6 rondas, predicción antes de calcular).
2. **AceleraLab MQC** — Modo Explora (v₀, a, t, mostrando vf y d en vivo) + Modo Desafío (6 rondas).
3. **Torre de Galileo** — caída libre y tiro vertical, predicción antes de soltar/lanzar (4 rondas).

## 5. Casos matemáticos verificados (Chromium real)

| Caso | Datos | Esperado | Confirmado |
|---|---|---|---|
| MRU | x₀=0, v=5 m/s, t=10s | x=50 m | ✅ |
| MRUA | v₀=0, a=2 m/s², t=5s | vf=10 m/s | ✅ |
| MRUA (libro) | vi=30, a=−6, hasta vf=0 | t=5s, d=75m | ✅ (usado en banco y teoría) |

## 6. Juego — "Control de Movimiento" (6 niveles)

Posición/Δx, MRU, aceleración conceptual, MRUA, movimiento vertical (error del punto más alto), y movimiento parabólico. Mismo patrón anti-farming (fallar no completa ni da XP).

## 7. Misión — "Reconstruir el Movimiento"

Escenario de investigador con datos de un MRUA (v₀=8, a=3, t=6 → vf=26, d=102). Combina selección (tipo de movimiento), dos campos numéricos con tolerancia, y una respuesta corta validada por longitud (25-220 caracteres). Botón deshabilitado hasta completar todo correctamente.

## 8. Examen — banco de 60 preguntas, 30 por intento

Tal como pide el sprint para esta unidad (más extensa que U01-U03, que usan 20). Distribución: ~20% conceptual, ~25% interpretación visual (con diagramas en código, sin imágenes externas — confirmado 8 preguntas con diagrama en un examen real), ~35% cálculo (variedad de valores, no solo los mismos números), ~20% aplicación/razonamiento. Retroalimentación correcto/incorrecto + explicación en cada pregunta, igual que las demás unidades de Física.

## 9. XP máximo legítimo obtenible en U04 (para MQC XP 2.0)

Usando el sistema XP actual (sin cambios de rangos):
- 5 temas leídos: 5 × XP de 'topic-read'
- 3 simuladores completados: 3 × XP de 'simulator-done'
- Juego completado (6 niveles, XP en el último): 1 × XP de 'game-won'
- Examen aprobado (una sola vez): 1 × XP de 'exam-done'
- Misión entregada: 1 × XP de 'fisica10-mission-done'

No se implementó XP 2.0 (instrucción explícita del sprint) — se reutilizó el sistema actual sin tocar rangos globales.

## 10. Gamificación

Insignia nueva: **🏎️ Maestro del Movimiento**, mismo criterio anti-farming que las anteriores (exige completar de verdad las 5 partes).

## 11. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Los 2 casos de control matemático (MRU y MRUA) | ✅ |
| Pista MRU: Modo Explora y Modo Desafío | ✅ |
| AceleraLab: control de aceleración correcto | ✅ |
| Torre de Galileo: predicción antes de soltar/lanzar | ✅ |
| Juego: 6 niveles, nivel 4 (MRUA) resuelto correctamente | ✅ |
| Misión: validación numérica con tolerancia, texto validado por longitud | ✅ |
| Examen: 30 de 60, con 8 preguntas con diagrama, examen completo | ✅ |
| No regresión: FIX10-U01, U02, U03 siguen disponibles e intactas | ✅ |
| Candado de publicación: U04 sigue oculta para visitantes normales | ✅ |
| No regresión general: Química, PNE, Analytics, Apoyo, selector de colegio | ✅ Sin errores de consola, desktop/iPhone/Android |

## 12. Archivos creados/modificados

- `js/units/fisica10/fix10-u04.js` (nuevo)
- `js/data/banco-fix10-u04.js` (nuevo, 60 preguntas)
- `js/modules/fisica10.js` (metadata de U04 agregada)
- `js/core/gamification.js` (insignia 🏎️ Maestro del Movimiento)
- `index.html` (scripts de los 2 archivos nuevos)

## 13. NO se inició FIX10-U05

Se detiene acá para revisión docente, tal como pedía el sprint.
