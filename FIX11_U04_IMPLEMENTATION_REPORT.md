# FIX11_U04_IMPLEMENTATION_REPORT.md
## Física 11.° — FIX11-U04: Magnetismo y electromagnetismo (RUTA DE CIERRE, FASE 1)

**Fecha:** 2026-09-10
**Fuente:** Libro "Física 11° — Un enfoque Práctico", Tema IV (páginas 117-126).
**Estado:** Funcional de punta a punta, probada con Chromium real. Construida con el sistema de juego unificado desde el inicio.

---

## 1. Contenido curricular — 6 temas (apartados 4.1 a 4.6 del libro)

1. El magnetismo (imanes, hierro/níquel/cobalto, imanes naturales/artificiales)
2. Experimento de Oersted (electromagnetismo, regla de la mano derecha, conexión relativista de Einstein)
3. Características de los imanes (polos, brújulas, magnetización inducida, dipolos al cortar)
4. Campo magnético: bobina y solenoide (B=μ₀NI/2r, B=μ₀NI/L)
5. Campo magnético en conductor recto (B=μ₀I/2πr) y magnetismo terrestre
6. Experimento de Faraday (inducción electromagnética, cámara de Kirlian)

## 2. Simuladores (3)

1. **Magnetic Field Lab MQC** (el estrella) — selector bobina/solenoide/conductor recto, con N/I/r/L interactivos, mostrando B en notación científica.
2. **Polos Lab MQC** — 4 rondas prediciendo atracción/repulsión según los polos enfrentados.
3. **Faraday Lab MQC** — mover un imán (slider) cerca de una espira, viendo cuándo se induce corriente (solo en movimiento, nunca en reposo).

## 3. Verificación matemática — 2 casos de control reales del libro

Verificados con Node.js y confirmados en Chromium real:

| Caso | Datos del libro | Esperado | Confirmado |
|---|---|---|---|
| Solenoide | N=2.000, L=0,60m, I=5,0A | B≈2,09×10⁻²T | ✅ Node + Chromium (exacto) |
| Bobina (inverso) | N=80, B=5,8×10⁻⁴T, r=0,30m | I≈3,46A | ✅ Node |
| Proporcionalidad (misión) | Fase2: N duplicado | B duplicado | ✅ Node (2,09e-2 → 4,19e-2) |

## 4. Juego — "Ingeniero Electromagnético" (7 niveles)

Construido directamente con el patrón unificado (una pregunta a la vez, empezando en Nivel 1).

## 5. Misión — "Diseño de un Electroimán" (2 fases)

Replica el ejemplo exacto del solenoide del libro (N=2.000, L=0,60m, I=5,0A → B≈2,09×10⁻²T). Fase 2: se duplica N → B se duplica exactamente (confirmado).

## 6. Examen — banco de 68 preguntas, 20 por intento

Distribución lograda: ~15% magnetismo/imanes, ~15% Oersted/electromagnetismo, ~15% características de imanes, ~25% campo magnético (bobina/solenoide/conductor), ~10% magnetismo terrestre, ~20% Faraday. (68 preguntas, por encima del mínimo de 60 pedido.)

## 7. Gamificación

Insignia nueva: **🧭 Maestro del Magnetismo**, mismo criterio anti-farming que las anteriores.

## 8. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Magnetic Field Lab: caso exacto del libro (solenoide) | ✅ |
| Polos Lab: predicción de atracción, avanza a ronda 2 | ✅ |
| Faraday Lab: sin corriente en reposo, con corriente en movimiento | ✅ |
| Juego: empieza directo en Nivel 1 de 7 | ✅ |
| Misión: Fase 1→2 con datos exactos del libro | ✅ |
| Examen: 20 de 68, examen completo de principio a fin | ✅ |
| No regresión: FIX11-U01 a U03, Física 10.° completa, Química, PNE | ✅ Sin errores de consola, desktop/iPhone/Android |
| Candado de publicación: confirmado oculto para visitantes normales | ✅ |

## 9. Archivos creados/modificados

- `js/units/fisica11/fix11-u04.js` (nuevo)
- `js/data/banco-fix11-u04.js` (nuevo, 68 preguntas)
- `js/modules/fisica11.js` (metadata de U04 agregada)
- `js/core/gamification.js` (insignia 🧭 Maestro del Magnetismo)
- `index.html` (scripts de los 2 archivos nuevos)

## 10. Pendiente — FASE 1 continúa

FIX11-U05 (Movimiento ondulatorio) y FIX11-U06 (Relatividad) siguen sin construir. Se detiene acá para revisión docente.
