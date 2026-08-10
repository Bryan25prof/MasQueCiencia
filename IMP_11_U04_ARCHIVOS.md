# IMP-11-U04 — Lista exacta de archivos

## Archivos creados (6)

| Archivo | Contenido |
|---|---|
| `js/units/grade11/g11-u04.js` | La unidad completa: 7 temas, 3 simuladores conectados al Atlas, juego "Detective Molecular", examen, misión de cierre final |
| `js/data/grade11/preguntas-g11-u04.js` | Banco de 40 preguntas, 6 categorías |
| `js/data/grade11/banco-pne-g11-u04.js` | Banco PNE adaptado — cobertura 40/40 |
| `js/data/grade11/atlas-quimico.js` | Data de las 13 fichas del Atlas Químico MQC (9 grupos funcionales + 4 biomoléculas) |
| `js/shared/atlas-quimico.js` | Motor del Atlas: `markDiscovered()`, `isDiscovered()`, `progress()` |
| `js/modules/atlas-quimico.js` | Vista del Atlas Químico (nueva ruta `atlas-quimico`) |

## Archivos modificados (4)

| Archivo | Cambio |
|---|---|
| `js/core/storage.js` | Esquema `data.atlasQuimico` agregado (aditivo) |
| `js/data/unidades-grade11.js` | Metadata de `g11-u04` de placeholder a estructura real (`status:'active'`) — color mantenido en naranja `#FFA94D`, ya asignado desde antes (ver informe, §1) |
| `js/core/gamification.js` | Insignia final "Arquitecto de la Vida" + condición de finalización real |
| `index.html` | Registrados los 6 scripts nuevos + ítem de sidebar "Atlas Químico" |

## No se modificó ningún archivo de las Unidades I, II o III, ni de Química 10.º.
