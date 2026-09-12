# FIX11-U06 — Teoría de la Relatividad (Física 11.º)

## Alcance (a pedido explícito de Bryan)

Esta unidad se mantuvo deliberadamente **reducida al mínimo**: casi no se evalúa en la PNE, así que se cubren solo los postulados de la Relatividad Especial y las fórmulas básicas (dilatación del tiempo, contracción de la longitud, aumento de la masa, y E=mc²), sin profundizar en deducciones matemáticas ni en la Teoría General de la Relatividad (que se menciona solo de forma breve, como contexto).

## Fuente

Leí las páginas 163 a 181 del libro real (*Física 11 — Didáctica Multimedia, Edición 2019*, Tema VI: Teoría de la Relatividad — todo el capítulo, que es corto: de la portada del tema a la evaluación) antes de escribir cualquier contenido, siguiendo la Regla de Oro del proyecto. Verifiqué con Node.js todos los ejemplos numéricos del libro antes de diseñar simuladores, juego, examen y misión.

**Nota importante:** el Ejemplo 2 del libro (página 172, contracción de la longitud: L₀=2,0 m, v=0,75c) tiene un error de cálculo en su propia respuesta impresa (dice "1,51 m"). Verifiqué la fórmula con Node.js y el resultado correcto es **1,32 m** — es el valor usado en toda la unidad (teoría, banco de examen y simulador).

## Qué se agregó

**Archivos nuevos:**
- `js/data/banco-fix11-u06.js` — banco de 48 preguntas de examen (`PREGUNTAS_FIX11_U06`), deliberadamente más pequeño que en otras unidades (t1=6, t2=9, t3=9, t4=8, t5=9, t6=7), reflejando lo acotado del tema. Varias preguntas están adaptadas directamente del propio banco "Repaso de Conceptos" del libro (páginas 179-180).
- `js/units/fisica11/fix11-u06.js` — el plugin completo de la unidad.

**Archivos modificados:**
- `js/modules/fisica11.js` — la entrada `fix11-u06` en `FISICA11_UNIDADES_DATA` pasó de `status:'development'` (placeholder) a `status:'active'`.
- `index.html` — se agregaron los `<script>` de `banco-fix11-u06.js` y `fix11-u06.js` (después de los de U05).
- `js/core/gamification.js` — se agregó la insignia nueva `maestro-relatividad` (definición + lógica de otorgamiento anti-farming), siguiendo el mismo patrón que las unidades anteriores.

## Contenido de la unidad (6 temas, siguiendo 1 a 1 la numeración del libro)

1. **Relatividad del movimiento** (6.1) — marco de referencia, suma/resta de velocidades clásica.
2. **Postulados de la Relatividad Especial** (6.2+6.3) — aporte de Michelson-Morley, I y II Postulado.
3. **Dilatación del tiempo** — fórmula t=t₀/√(1-v²/c²), ejemplo del libro (Andrés/Carlos), paradoja de los gemelos.
4. **Contracción de la longitud** — fórmula L=L₀·√(1-v²/c²), ejemplo corregido (1,32 m) y ejemplo de la nave de 250 m (178,5 m).
5. **Aumento de la masa y equivalencia masa-energía** — fórmula m=m₀/√(1-v²/c²) y E₀=mc².
6. **Aplicaciones y comprobaciones** — GPS, muones/rayos cósmicos, aceleradores de partículas, mención breve de la Relatividad General.

**3 simuladores, todos con Modo Explora + Modo Desafío:**
- **Calculadora Relativista** (estrella): un solo slider de v (% de c) que muestra en vivo el factor de Lorentz, la dilatación del tiempo, la contracción de la longitud y el aumento de la masa, todos sobre los mismos valores de referencia — mostrando que las 3 fórmulas comparten la misma base. Desafío: 4 rondas verificadas (t=1,25 años / L=6,00 m / m=1250,0 kg / γ=1,67).
- **E=mc²**: slider de masa (en gramos) con cálculo en vivo de la energía liberada. Desafío: 4 rondas (calcular E dada la masa, o la masa dada E), verificadas (9,00×10¹⁴ J / 9,00×10¹⁵ J / 1 g / 500 g).
- **Velocidades Relativas**: dos sliders de velocidad + selector de dirección (misma/opuesta), replicando los ejemplos clásicos del libro. Desafío: 4 rondas verificadas contra el propio banco de "Repaso de Conceptos" del libro (22 km/h / 9 m/s / 5 km/h / 1,5 m/s).

**Juego "Explorador de la Relatividad"**: 7 niveles, uno a la vez, cubriendo los 6 temas.

**Examen**: banco de 48 preguntas, 20 al azar por intento, aprobación con 70%.

**Misión "La Paradoja de los Gemelos"**: 2 fases usando t=t₀/√(1-v²/c²) con t=3 años fijo — Fase 1 a v=0,940c (t₀≈1,02 años), Fase 2 a v=0,995c (t₀≈0,30 años), mostrando cuánto crece el efecto cerca de la velocidad de la luz.

## Verificado con Node.js

- `node --check` sin errores en los 5 archivos (nuevos y modificados), y en TODOS los `.js` del proyecto.
- Validación estructural del banco de 48 preguntas: IDs únicos, 4 opciones por pregunta, índices `correcta` válidos, distribución por tema según lo diseñado.
- Verificación numérica previa de todas las fórmulas y ejemplos, incluyendo la corrección del error del libro en el Ejemplo 2 de contracción de la longitud.

## Verificado con Chromium real

- **Regresión completa del sitio** (desktop 1440×900, iPhone 414×896, Android 390×844): cero errores de consola en los 3 viewports. Candados de publicación (`FISICA10_PUBLICO=false`, `FISICA11_PUBLICO=false`) confirmados intactos.
- **Teoría**: los 6 temas se abren y se marcan como leídos correctamente.
- **Simulador 1 (Calculadora Relativista)**: Modo Explora en vivo, y las 4 rondas de Modo Desafío completadas con las respuestas exactas esperadas (1,25 años / 6,00 m / 1250,0 kg / 1,67).
- **Simulador 2 (E=mc²)**: Modo Explora en vivo, y las 4 rondas de Modo Desafío completadas correctamente (9,00×10¹⁴ J / 9,00×10¹⁵ J / 1 g / 500 g).
- **Simulador 3 (Velocidades Relativas)**: Modo Explora en vivo, y las 4 rondas de Modo Desafío completadas con las respuestas exactas esperadas (22,00 / 9,00 / 5,00 / 1,50).
- **Juego**: los 7 niveles completados en orden con las respuestas correctas reales del diseño, otorgando XP y subiendo de nivel.
- **Examen**: intento completo de 20 preguntas respondiendo la opción correcta real (identificada contra el banco) → resultado 100%, `examXpAwarded=true`.
- **Misión**: las 2 fases completadas con los valores numéricos y textos esperados → `missionDone=true`.
- **Insignia anti-farming `maestro-relatividad`**: se otorgó correctamente al completar los 5 criterios (temas + simuladores + juego + examen aprobado + misión).
- Cero errores de consola en cualquiera de las pruebas anteriores.

## Archivos entregados

`js/data/banco-fix11-u06.js` (nuevo), `js/units/fisica11/fix11-u06.js` (nuevo), `js/modules/fisica11.js` (modificado), `index.html` (modificado), `js/core/gamification.js` (modificado), y este reporte.
