# FIX10_U02_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U02: Cantidades escalares y vectoriales (reconstrucción sobre el patrón U01)

**Fecha:** 2026-09-02
**Estado:** Reconstruida sobre el estándar pedagógico definitivo de FIX10-U01. **FIX10-U01 no se modificó** (queda congelada).

---

## 1. Qué se reutilizó del intento previo

- **Simulador 1** ("Escalar o Vectorial", 10 situaciones) — ya cumplía el estándar, se conservó tal cual.
- **Simulador 2** ("Tipos de vectores", 8 situaciones) — se conservó el contenido, se agregó **mezcla de opciones** (no la tenía).
- **Motor del examen** (banco → selecciona 30 → mezcla preguntas y opciones → aprobación ≥70 → anti-farming) — se conservó sin cambios; solo se reescribió el **contenido** del banco.
- **Helpers y patrón de plugin** (awardXP, loadUnitData, patchUnit, markRead) — mismo patrón exacto que fix10-u01.js.

## 2. Qué se descartó y reconstruyó

- **Teoría:** tenía un solo párrafo largo por tema → se fragmentó en los 5 bloques del patrón definitivo (💡 IDEA CLAVE / 📘 EXPLICACIÓN / 🔎 EJEMPLO / 🌐 APLICACIÓN REAL / ❓ COMPRUEBA), sin agregar contenido nuevo.
- **Simulador 3:** era una calculadora simple ("tocá para calcular") → se reemplazó por completo con **VectorLab MQC** (ver sección 3).
- **Juego:** era "Navegante GPS" con botón "Revelar concepto" (sin exigir respuesta) → se reconstruyó como **"Navegante Vectorial"**, con el mismo patrón verificable que ya tiene FIX10-U01 (falla no completa ni da XP, acierto sí).
- **Misión:** era "Mi propio GPS casero" (reflexión de texto libre sin validación) → se reconstruyó como **"Ruta de Rescate"**, con 5 campos numéricos validados por tolerancia.
- **Banco de examen:** se reescribió completo con la distribución pedida (25% conceptual / 25% interpretación visual con diagramas SVG / 35% cálculo con variedad de ángulos / 15% aplicación).

## 3. VectorLab MQC — el simulador estrella

**Modo Explora:** plano cartesiano SVG real (no decorativo). Dos sliders (V: 10-100, θ: 0-360°) actualizan en vivo el vector dibujado, sus componentes Vx/Vy, y el cuadrante — sin resolver nada por el estudiante, solo para descubrir relaciones (regla explícita del sprint).

**Modo Desafío:** 4 niveles progresivos (1er cuadrante → otros cuadrantes → suma de 2 vectores → resultante de varios vectores). En cada problema, el estudiante primero **predice** el cuadrante, luego **escribe** sus propios valores de componentes, y recién al tocar "Comprobar" se valida con tolerancia (±1.5). Nunca es "ingresar → calcular → respuesta completa" — la calculadora no resuelve nada automáticamente.

**Probado con Chromium real, en los 8 ángulos exactos que pedía el sprint (0°, 30°, 90°, 120°, 180°, 225°, 270°, 315°):** los signos de Vx/Vy coinciden en los 8 casos con lo esperado matemáticamente.

## 4. Juego — "Navegante Vectorial"

5 niveles reales (distancia vs. desplazamiento, elegir el vector correcto, interpretar cuadrante, calcular componentes a 180°, y la suma clásica 300 m Este + 400 m Norte). Mismo patrón anti-farming que FIX10-U01: fallar no completa el nivel ni otorga XP, acertar sí, y no se puede repetir un nivel ya resuelto para duplicar XP.

**Probado:** el nivel 5 (300 E + 400 N) da correctamente 500 m entre las opciones mezcladas.

## 5. Misión — "Ruta de Rescate"

Recorrido: 300 m Este, 250 m Norte, 150 m Oeste. El estudiante calcula e ingresa: distancia total (700 m), ΣX (150 m), ΣY (250 m), magnitud resultante (≈291.5 m) y dirección (≈59°) — todo validado con tolerancia numérica (±0.5 m / ±2°), nunca coincidencia textual exacta. El botón "Entregar misión" permanece deshabilitado hasta que los 5 valores sean correctos.

**Probado:** confirmado que el botón sigue deshabilitado con valores incorrectos, y se habilita y entrega correctamente con los valores esperados (dentro de tolerancia).

## 6. Examen — banco reconstruido (50 preguntas)

Distribución real lograda: ~13 conceptuales, ~13 de interpretación gráfica (6 de ellas con diagrama SVG embebido, generado en código — nunca imágenes externas), ~17 de cálculo (con variedad de ángulos: 0°, 30°, 90°, 120°, 180°, 270°, y sumas con componentes 6-8-10, 9-12-15, 300-400-500, entre otras — no solo el clásico 3-4-5), y ~7 de aplicación/contexto (GPS, ingeniería).

**Probado:** durante un examen completo de 30 preguntas, aparecieron 4 preguntas con diagrama SVG, confirmando que se incluyen realmente en la selección aleatoria.

## 7. Gamificación

Insignia nueva: **🧭 Dominio Vectorial**, con el mismo criterio anti-farming exacto que "Explorador de la Física" — exige completar de verdad las 5 partes (temas, simuladores, juego, examen aprobado, misión), nunca por solo abrir componentes.

## 8. Tarjeta y navegación

Física 10.º ahora muestra FIX10-U01 y FIX10-U02 como "Disponible", con FIX10-U03 a U07 "Próximamente". Se actualizó únicamente la metadata de la tarjeta (`js/modules/fisica10.js`) — no se tocó la navegación general ni el Router.

## 9. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| VectorLab: signos de Vx/Vy en los 8 ángulos pedidos (0°,30°,90°,120°,180°,225°,270°,315°) | ✅ Todos correctos |
| VectorLab Modo Desafío: predicción → entrada → comprobar → feedback | ✅ |
| Suma 300 E + 400 N = 500 (juego, nivel 5) | ✅ |
| Juego: fallo no completa nivel | ✅ |
| Misión: no se puede entregar sin completar los 5 campos correctamente | ✅ |
| Simulador 2: opciones mezcladas | ✅ |
| Examen: 30 de 50, con preguntas con diagrama SVG incluidas | ✅ |
| No regresión: FIX10-U01 sigue disponible e intacta | ✅ |
| No regresión general: Química, PNE, Analytics, Apoyo | ✅ Sin errores de consola |
| Responsive: probado en desktop; sliders de VectorLab usan `<input type="range">` nativo, funcional en touch | ✅ |

## 10. Analytics

Se usa el mismo mecanismo de Física 10.º ya creado (`data.fisica10`), sin ninguna modificación a Supabase ni SQL nuevo. **Limitación documentada** (ya señalada en el informe de U01): el panel docente todavía no distingue resultados por disciplina/unidad específica de Física — seguiría necesitando una columna `disciplina` en Supabase si se quiere ese detalle a futuro.

## 11. NO se inició FIX10-U03

Tal como pedía el sprint, FIX10-U02 queda disponible para revisión docente. Se detiene acá.
