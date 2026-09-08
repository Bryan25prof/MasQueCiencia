# FIX10_U06_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U06: Dinámica y las Leyes de Newton

**Fecha:** 2026-09-07
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad VI.
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01 a U05 no se tocaron. No se adelanta U07.

---

## 1. Contenido curricular — 6 temas

1. Fuerza, masa e inercia (error a combatir: "si se mueve, algo lo empuja continuamente")
2. Fuerza neta y equilibrio (ΣF, fuerzas presentes vs. fuerza neta)
3. Tipos de fuerza (contacto vs. acción a distancia)
4. Las tres Leyes de Newton (I: inercia, II: ΣF=m·a, III: acción-reacción)
5. Fricción, normal y peso (P=mg, N, f=μN, masa≠peso)
6. Fuerza elástica y Ley de Hooke (F=−k·x)

## 2. Diagramas de Cuerpo Libre (DCL) — SVG propio

Se construyó un generador de DCL en SVG (`_svgDCL`) que dibuja un bloque central con flechas de fuerza etiquetadas (N, P, F, f, Fe) con su magnitud en Newtons — nunca depende solo del color (regla de accesibilidad explícita del sprint). Usado en teoría, Force Lab, y 4 preguntas del examen.

## 3. Simuladores (3)

1. **Force Lab MQC** (el estrella) — Modo Explora: sliders de masa, fuerza aplicada y fricción, con el DCL completo y los cálculos (P, N, f, ΣF, a) en vivo. Modo Desafío: 10 escenarios, mostrando la fórmula antes de responder.
2. **Laboratorio de Inercia** — 4 escenarios reales (autobús, patinador, objeto en reposo, cinturón de seguridad).
3. **Pares de Fuerzas** — 6 escenarios de acción-reacción (pared, nadador, cohete, rifle, barco, caminar), combatiendo explícitamente el error "acción y reacción se cancelan".

## 4. Verificación matemática — los 7 casos de control del sprint

| Caso | Datos | Esperado | Verificado |
|---|---|---|---|
| 1 | F1=25N der, F2=10N izq | ΣF=15N der | ✅ (Node + banco fix10u06-26) |
| 2 | m=5kg, ΣF=20N | a=4 m/s² | ✅ (Node + banco fix10u06-27) |
| 3 | m=10kg, g=9,8 | P=98N | ✅ (Node + banco fix10u06-47) |
| 4 | superficie horizontal simple | N=98N | ✅ (Node + banco fix10u06-51) |
| 5 | μ=0,20, N=100N | f=20N | ✅ (Node + banco fix10u06-54) |
| 6 | k=200N/m, x=0,10m | F=20N | ✅ (Node + banco fix10u06-58) |
| 7 | F=60N der, f=20N izq, m=10kg | ΣF=40N, a=4m/s² der | ✅ (Node + banco fix10u06-30/31 con DCL) |

Los 7 casos se verificaron numéricamente con Node.js antes de escribir el contenido, y quedaron incorporados como preguntas reales del banco.

## 5. Juego — "Ingeniero de Fuerzas" (8 niveles)

Identificar fuerzas, equilibrio, Primera Ley, Segunda Ley, Tercera Ley, fricción, Hooke, y un desafío final combinado. Mismo patrón anti-farming (fallar no completa ni da XP).

## 6. Misión — "Investigar el Sistema" (2 fases)

Fase 1: caja de 10 kg, F=60N, μ=0,2 → calcular P, N, f, ΣF y a. Fase 2: se duplica la masa (20 kg, mismas F y μ) → mismo cálculo, evaluando la relación inversa entre masa y aceleración. **Probado:** ambas fases se completan con tolerancia numérica y validación de texto (25-220 caracteres).

## 7. Examen — banco de 70 preguntas, 20 por intento

Distribución lograda: ~20% conceptos/fuerzas, ~15% I y III Ley, ~30% II Ley/fuerza neta, ~15% peso-normal-fricción, ~10% Hooke, ~10% diagramas y aplicaciones. **4 preguntas con Diagrama de Cuerpo Libre real** — regla explícita de no crear un banco puramente textual.

**Confirmado en el examen:** 14/20 = 70% aprueba; 13/20 no. Examen completo probado de principio a fin con retroalimentación por pregunta, igual que las demás unidades.

## 8. XP máximo legítimo obtenible en U06 (para MQC XP 2.0)

Sistema actual reutilizado sin cambios de rangos: 6 temas × XP 'topic-read', 3 simuladores × XP 'simulator-done', 1 XP 'game-won' (juego de 8 niveles completo), 1 XP 'exam-done' (examen aprobado, una sola vez), 1 XP 'fisica10-mission-done' (misión de 2 fases).

## 9. Gamificación

Insignia nueva: **⚖️ Dominio de las Fuerzas**, mismo criterio anti-farming que las anteriores.

## 10. Regla global de 20 preguntas — cumplida desde el diseño

U06 se construyó directamente con 20 preguntas por intento y banco de 70 (nunca tuvo la versión de 30), cumpliendo la regla global ya vigente desde el hotfix de U05.

## 11. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Los 7 casos de control matemáticos (verificados con Node antes de escribir contenido) | ✅ |
| Force Lab: DCL completo con 4 fuerzas etiquetadas y magnitudes | ✅ |
| Laboratorio de Inercia: 4 escenarios | ✅ |
| Pares de Fuerzas: 6 escenarios | ✅ |
| Juego: 8 niveles presentes | ✅ |
| Misión: 2 fases completas, validación numérica y de texto | ✅ |
| Examen: 20 de 70, con preguntas de DCL incluidas, examen completo de principio a fin | ✅ |
| Tarjeta dice "Examen 20 preguntas" desde el inicio | ✅ |
| No regresión: FIX10-U01 a U05 siguen disponibles e intactas | ✅ |
| Candado de publicación: U06 sigue oculta para visitantes normales | ✅ |
| No regresión general: Química, PNE, Analytics, Apoyo, selector de colegio | ✅ Sin errores de consola, desktop/iPhone/Android |

## 12. Archivos creados/modificados

- `js/units/fisica10/fix10-u06.js` (nuevo)
- `js/data/banco-fix10-u06.js` (nuevo, 70 preguntas)
- `js/modules/fisica10.js` (metadata de U06 agregada)
- `js/core/gamification.js` (insignia ⚖️ Dominio de las Fuerzas)
- `index.html` (scripts de los 2 archivos nuevos)

## 13. NO se inició FIX10-U07

Se detiene acá para revisión docente, tal como pedía el sprint.
