# RESUMEN — Hotfix consolidado Física 10.° (U01, U02, U03)

Todos los puntos señalados en esta ronda, agrupados en una sola entrega.

## 1. VectorLab (U03) — bug del "cero sin dirección"
En la Ronda 3 del Laboratorio de Referencia (Auto A = Auto B = 100 km/h Este), la velocidad relativa correcta es 0 km/h, pero el desplegable de dirección no ofrecía ninguna opción para eso — la ronda era imposible de responder bien. Se agregó la opción "Sin dirección (velocidad cero)".

## 2. Preguntas sin contexto (banco U03)
4 preguntas referenciaban "el caso anterior" o "esa persona" sin repetir los datos — como el examen mezcla preguntas al azar, esa referencia no tenía sentido para el estudiante. Las 4 se reescribieron para incluir los datos completos en el propio enunciado.

## 3. Exámenes reducidos de 30 a 20 preguntas
Aplicado en las 3 unidades de Física (metadata, motor de selección, y textos visibles).

## 4. Retroalimentación por pregunta (correcto/incorrecto + explicación)
Las 3 unidades de Física ahora funcionan igual que Química: al responder, se colorea la opción correcta en verde y la elegida (si falló) en rojo, se muestra una explicación breve, y hay que tocar "Siguiente pregunta" para continuar — ya no se avanza solo con un clic sin mostrar nada. Se agregó una "explicacion" a cada una de las 150 preguntas (50 por unidad).

**Nota de transparencia:** al reescribir los bancos para agregar las explicaciones, en un primer intento se perdieron accidentalmente algunas preguntas con diagrama visual. Se detectó con una verificación automática antes de entregar, y se repuso contenido equivalente (con diagrama SVG) para no perder esa categoría de preguntas. Los 3 bancos quedaron confirmados en 50 preguntas únicas cada uno.

## 5. Sonido de "La Curiosidad"
Las 3 unidades de Física nunca llamaban a `Photon.react(...)`, por eso nunca sonaba nada (a diferencia de las 9 unidades de Química, que sí lo hacen). Se agregó el mismo puente exacto en las 3 unidades, incluyendo también el sonido de "incorrecto" al fallar una pregunta del examen (antes solo existía el de "correcto").

## Pruebas realizadas (Chromium real)
- Las 3 unidades: examen completo de 20 preguntas, con retroalimentación en cada una, botón "Siguiente pregunta" funcionando, y examen final llegando a buen término.
- Confirmado que `Photon.react` se dispara correctamente al leer un tema (sonido de "La Curiosidad").
- Re-confirmado que el bug del cero en VectorLab sigue corregido.
- Regresión completa: Química, PNE, Analytics, Apoyo, sin errores de consola en desktop/iPhone/Android.

## Archivos en este ZIP
- `js/modules/fisica10.js` (20 preguntas por examen)
- `js/units/fisica10/fix10-u01.js` (sonido + retroalimentación)
- `js/units/fisica10/fix10-u02.js` (sonido + retroalimentación)
- `js/units/fisica10/fix10-u03.js` (sonido + retroalimentación + bug del cero)
- `js/data/banco-fix10-u01.js` (50 preguntas con explicación)
- `js/data/banco-fix10-u02.js` (50 preguntas con explicación)
- `js/data/banco-fix10-u03.js` (50 preguntas con explicación, 4 reescritas sin contexto faltante)
