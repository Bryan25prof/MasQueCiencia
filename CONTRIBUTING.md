# Contribuir a MásQueCiencia

Gracias por tu interés en mejorar MásQueCiencia. Esta guía explica cómo hacerlo de forma ordenada.

## Antes de empezar

- Este proyecto no usa ningún framework, build ni gestor de paquetes — es HTML, CSS y JavaScript puro, deliberadamente. Cualquier contribución debe respetar esa filosofía (ver `docs/identidad/MQC_DESIGN_SYSTEM_MAESTRO.md`).
- El contenido académico (preguntas, teoría, estructura curricular) pertenece a su autor — ver `LICENSE` antes de proponer cambios al contenido.
- Revisá `PROJECT_CONTEXT.md` y `CHANGELOG.md` para entender el estado real del proyecto y qué ya se intentó o decidió antes de proponer algo similar.

## Cómo reportar un error

1. Verificá que el error sea reproducible (pasos claros, resultado esperado vs. resultado real).
2. Abrí un Issue describiendo:
   - Navegador y versión.
   - Pasos exactos para reproducirlo.
   - Qué esperabas que pasara.
   - Qué pasó en realidad (capturas de pantalla ayudan mucho).
3. Si el error es de contenido académico (una pregunta mal planteada, un dato incorrecto), indicá la unidad y el tema exacto.

## Cómo proponer un cambio

- **Corrección de errores**: siempre bienvenida, abrí un Pull Request directamente si ya tenés la solución, o un Issue si solo identificaste el problema.
- **Nueva funcionalidad, rediseño, o cambio de identidad visual**: abrí un Issue de discusión primero — este proyecto tiene una identidad visual y una arquitectura deliberadamente congeladas (ver `docs/identidad/`), y cualquier cambio de ese tipo necesita conversarse antes de escribir código.
- **Contenido académico nuevo**: coordinar directamente con el autor del contenido (ver créditos en `README.md`).

## Estilo de código

- JavaScript sin frameworks, sin transpilación — debe funcionar directamente en el navegador vía `<script>` clásico.
- Cada unidad (`js/units/unit-0X.js`) sigue el mismo patrón interno — revisá una unidad existente antes de crear contenido nuevo, para mantener consistencia.
- Comentarios en español, consistente con el resto del proyecto.
- Antes de proponer un Pull Request, correr `node --check` sobre cualquier archivo `.js` modificado, para asegurar que no haya errores de sintaxis.

## Pull Requests

1. Hacé un fork del repositorio.
2. Creá una rama descriptiva (`fix/nombre-del-error`, `docs/lo-que-actualizaste`).
3. Un Pull Request = un cambio enfocado. Evitá mezclar una corrección de bug con un cambio de contenido no relacionado.
4. Describí qué cambiaste y por qué — si corregís un bug, indicá cómo lo reprodujiste y cómo verificaste que la corrección funciona.

## Código de conducta

Toda contribución debe respetar `CODE_OF_CONDUCT.md`.
