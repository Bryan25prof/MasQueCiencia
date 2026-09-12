# FIX11-U05 — Movimiento Ondulatorio (Física 11.º)

## Fuente

Leí las páginas 135-161 del libro real (*Física 11 — Didáctica Multimedia, Edición 2019*, Tema V: Movimiento Ondulatorio) antes de escribir cualquier contenido, fórmula o ejemplo, siguiendo la Regla de Oro del proyecto. Verifiqué con un script de Node.js todos los ejemplos numéricos y las respuestas de las preguntas de opción múltiple del propio libro (ej. MC1=0,40s, MC6="aumenta cuatro veces", MC7=0,50m, MC10≈7×10⁻²s, MC13=2T) antes de diseñar simuladores, juego o examen.

## Qué se agregó

**Archivos nuevos:**
- `js/data/banco-fix11-u05.js` — banco de 68 preguntas de examen (`PREGUNTAS_FIX11_U05`), distribuidas por tema (t1=8, t2=11, t3=15, t4=12, t5=12, t6=10). Mismo formato exacto que las unidades anteriores.
- `js/units/fisica11/fix11-u05.js` — el plugin completo de la unidad.

**Archivos modificados:**
- `js/modules/fisica11.js` — la entrada `fix11-u05` en `FISICA11_UNIDADES_DATA` pasó de `status:'development'` (placeholder) a `status:'active'`, con `topics`, `simulators`, `game` y `exam` reales.
- `index.html` — se agregaron los `<script>` de `banco-fix11-u05.js` y `fix11-u05.js` (después de los de U04).
- `js/core/gamification.js` — se agregó la insignia nueva `maestro-ondulatorio` (definición + lógica de otorgamiento anti-farming), siguiendo el mismo patrón exacto que `maestro-magnetismo` (U04): exige los 6 temas leídos, los 3 simuladores hechos, el juego jugado, el examen aprobado y la misión entregada.

## Contenido de la unidad

**Teoría (6 temas, consolidando las 8 subsecciones del libro):**
1. Las ondas (transportan energía, con o sin materia)
2. Clasificación de las ondas (longitudinal/transversal; mecánica/electromagnética)
3. Características de las ondas (amplitud, λ, T, f, v — con las fórmulas v=λ/T, v=λf, T=1/f y los dos ejemplos numéricos del libro)
4. El espectro electromagnético (orden completo, luz visible, ionizante/no ionizante)
5. Las ondas en la vida cotidiana (eco, ondas sísmicas P/S, aplicaciones tecnológicas)
6. Efecto invernadero, riesgos climáticos y manejo de desechos (combina las subsecciones 5.6+5.7+5.8 del libro: tabla de gases de efecto invernadero, -18°C sin atmósfera, manejo de desechos en Costa Rica)

**3 simuladores, todos con Modo Explora + Modo Desafío:**
- **Wave Lab MQC** (estrella): sliders de velocidad (10-1500 m/s) y frecuencia (10-500 Hz), cálculo en vivo de λ y T. Desafío: 4 rondas verificadas (λ=2,0m / λ=5,0m / T=0,25s / T=0,10s).
- **Espectro EM Explorer**: slider que recorre las 7 radiaciones del espectro (radio→gamma), muestra ejemplos de uso y si es ionizante. Desafío: 4 rondas donde hay que identificar cuál de dos radiaciones tiene más energía.
- **Eco Lab MQC**: sliders de distancia y velocidad del sonido, cálculo en vivo del tiempo de eco (t=2d/v). Desafío: 4 rondas verificadas (t=5,0s / t≈0,07s / d≈180,2m / d=340m).

**Juego "Explorador de Ondas"**: 7 niveles, uno a la vez (nunca lista de selección), cubriendo los 6 temas.

**Examen**: usa el banco de 68 preguntas, 20 al azar por intento, aprobación con 70%.

**Misión "Diseño de una Antena de Radio"**: 2 fases usando v=λ·f — Fase 1 a 100 MHz (λ=3,0m), Fase 2 a 200 MHz (λ=1,5m, frecuencia duplicada), cada fase exige respuesta numérica (±10%) y explicación de texto (25-220 caracteres).

## Verificado con Node.js

- `node --check` sin errores en los 5 archivos (nuevos y modificados).
- Validación estructural del banco de 68 preguntas: IDs únicos, 4 opciones por pregunta, índices `correcta` válidos, distribución por tema según lo diseñado.
- Verificación numérica previa (antes de escribir código) de todas las fórmulas y ejemplos contra el libro real.

## Verificado con Chromium real

- **Regresión completa del sitio** (desktop 1440×900, iPhone 414×896, Android 390×844): home, selección de grado, unidades, grade11, tabla periódica, progreso, atlas químico, acerca de — cero errores de consola en los 3 viewports. Candados de publicación (`FISICA10_PUBLICO=false`, `FISICA11_PUBLICO=false`) confirmados intactos.
- **Teoría**: los 6 temas se abren y se marcan como leídos correctamente.
- **Simulador 1 (Wave Lab)**: Modo Explora con sliders en vivo (V=340, f=170 → λ=2,0m) y las 4 rondas de Modo Desafío completadas con las respuestas exactas esperadas.
- **Simulador 2 (Espectro EM)**: Modo Explora y las 4 rondas de Modo Desafío completadas correctamente (identificando siempre la radiación de mayor energía).
- **Simulador 3 (Eco Lab)**: Modo Explora y las 4 rondas de Modo Desafío completadas con las respuestas exactas esperadas (5,00s / 0,07s / 180,20m / 340,00m).
- **Juego**: los 7 niveles completados en orden, con las respuestas correctas reales del diseño, otorgando XP de `game-played` y `game-won` y subiendo de nivel.
- **Examen**: intento completo de 20 preguntas respondiendo la opción correcta real (identificada contra el banco) para probar el camino de aprobación → resultado 100%, `examXpAwarded=true`.
- **Misión**: las 2 fases completadas con los valores numéricos y textos esperados → `missionDone=true`.
- **Insignia anti-farming `maestro-ondulatorio`**: se otorgó correctamente al completar los 5 criterios (temas + simuladores + juego + examen aprobado + misión), confirmando que la integración en `gamification.js` funciona de punta a punta.
- Cero errores de consola en cualquiera de las pruebas anteriores.

## Archivos entregados

`js/data/banco-fix11-u05.js` (nuevo), `js/units/fisica11/fix11-u05.js` (nuevo), `js/modules/fisica11.js` (modificado), `index.html` (modificado), `js/core/gamification.js` (modificado), y este reporte.
