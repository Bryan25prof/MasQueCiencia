# FIX10_U03_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U03: Movimiento Relativo

**Fecha:** 2026-09-03
**Fuente:** Libro "Física 10° — Un enfoque práctico", Unidad III / Tema 3 (páginas 115-118).
**Estado:** Funcional de punta a punta, probada con Chromium real. FIX10-U01 y FIX10-U02 no se tocaron.

---

## 1. Contenido — 4 temas

Derivados y parafraseados de los apartados 3.1-3.2 y los 5 casos del libro:
1. **¿Quién se está moviendo?** — movimiento relativo, marco de referencia.
2. **Velocidad relativa** — notación V(AB), caso "un móvil respecto de sí mismo = 0".
3. **Móviles en la misma y en distinta dirección** — mismo sentido (resta) / sentido contrario (suma), explicado con signos, no como regla memorística.
4. **Movimiento relativo en situaciones reales** — móvil observado desde tierra, y el caso completo del barco/persona.

## 2. Verificación matemática contra el libro

Los 3 casos de control del sprint se probaron numéricamente y coinciden exactamente con los ejemplos reales del libro:

| Caso | Datos | Resultado esperado | Resultado del motor |
|---|---|---|---|
| Mismo sentido | A=80 km/h Este, B=50 km/h Este | V(AB) = 30 km/h Este | ✅ 30 km/h Este |
| Sentido contrario (acercándose) | A=75 km/h Este, B=45 km/h Oeste | V(AB) = 120 km/h Este | ✅ 120 km/h Este |
| Barco + persona | Barco 40 km/h Sur, persona 2 km/h Norte (rel. barco) | Persona/tierra = 38 km/h Sur | ✅ 38 km/h Sur |

## 3. Simuladores

1. **Laboratorio de Referencia** (el simulador estrella) — Modo Explora: elegís el observador (Tierra/Auto A/Auto B) y ves cómo cambia la velocidad medida en vivo. Modo Desafío: 8 rondas, ingresás magnitud + dirección, con tolerancia (±1 km/h).
2. **Encuentro en la Carretera** — predicción (menor/igual/mayor) antes de calcular, 5 rondas con mismo sentido y sentido contrario.
3. **Sobre la Cubierta** — el caso barco/persona en 4 variantes, con las dos preguntas del libro (respecto del barco / respecto de tierra).

## 4. Juego — "¿Desde dónde lo ves?"

6 niveles reales, incluyendo el caso exacto del barco (38 km/h Sur) como una de las opciones a distinguir de distractores creíbles (42, 38 Norte, 2 Sur). Mismo patrón anti-farming que U01/U02.

## 5. Misión — "Operación Persecución" (2 fases)

Fase 1: A=90 Este, B=60 Este (mismo sentido) → V(AB)=30 Este. Fase 2: mismo A, pero B cambia a 60 Oeste (sentido contrario) → V(AB)=150 Este. El estudiante elige el marco de referencia, calcula magnitud + dirección (con tolerancia ±2), y escribe una explicación validada por longitud (20-220 caracteres). **Probado:** ambas fases se completan y comparan correctamente una situación de mismo sentido contra una de sentido contrario, tal como pedía el sprint.

## 6. Examen — 50 preguntas

Distribución lograda: conceptual, interpretación visual (con mini-diagramas generados en código, sin imágenes externas — confirmado que aparecen 6 en un examen real de 30), cálculo con variedad de valores, y aplicación/contexto.

## 7. Gamificación

Insignia nueva: **👁️ Dominio Relativo**, mismo criterio anti-farming exacto que las anteriores.

## 8. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Los 3 casos de control matemáticos coinciden con el libro | ✅ |
| Laboratorio de Referencia: cambiar de observador actualiza correctamente (B en reposo, A a 30 km/h) | ✅ |
| Modo Desafío: tolerancia funciona | ✅ |
| Juego: nivel del barco (38 km/h Sur) con distractores creíbles | ✅ |
| Misión: 2 fases, comparación mismo sentido vs. sentido contrario | ✅ |
| Examen: 30 de 50, con diagramas incluidos | ✅ |
| No regresión: FIX10-U01 y FIX10-U02 siguen disponibles e intactas | ✅ |
| Candado de publicación: U03 sigue oculta para visitantes normales, visible solo con `?fisica10preview=1` | ✅ |
| No regresión general: Química, PNE, Analytics | ✅ Sin errores de consola |

## 9. NO se inició FIX10-U04

Se detiene acá para revisión docente, tal como pedía el sprint.
