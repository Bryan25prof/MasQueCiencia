# Informe de Auditoría — Atlas Químico MQC
## SPRINT DE AFINAMIENTO PRE-PNE — Parte I

---

## 1. ¿Cuántas fichas existen actualmente?

**15 fichas en total**: 11 grupos funcionales + 4 biomoléculas.

## 2. ¿Cuáles aparecen desbloqueadas desde el inicio?

**Ninguna.** El estado inicial (`js/core/storage.js`) siembra `atlasQuimico: { discovered: [] }` — un arreglo vacío. Las 15 fichas empiezan bloqueadas para todo perfil nuevo.

## 3 y 4. Tabla completa: ¿cuáles requieren descubrimiento y qué evento desbloquea cada una?

*(Estado real encontrado en la auditoría — ANTES del fix aplicado en esta misma sesión. La columna "Después del fix" muestra lo que cambió.)*

| # | Ficha | Se desbloquea al… | Antes del fix | Después del fix |
|---|---|---|---|---|
| 1 | Alcano | U11-U03 → Constructor Molecular / Laboratorio de Enlaces / Detector Orgánico (elegir familia "alcano") · **U11-U04 → Escáner Molecular** (ibuprofeno) · Misión (ibuprofeno) | ⚠️ Sin conexión al Atlas — ningún camino real | ✅ Desbloqueable |
| 2 | Alqueno | U11-U03 → mismos 3 simuladores (elegir familia "alqueno") | ❌ **Ningún camino, en ningún lugar del proyecto** | ✅ Desbloqueable |
| 3 | Alquino | U11-U03 → mismos 3 simuladores (elegir familia "alquino") | ❌ **Ningún camino, en ningún lugar del proyecto** | ✅ Desbloqueable |
| 4 | Alcohol | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (acetaminofén, etanol, glucosa) · Detective Molecular · Misión (glucosa) | ✅ Ya funcionaba (4 caminos redundantes) | ✅ Sin cambios |
| 5 | Aldehído | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (glucosa) · Detective Molecular · Misión (glucosa) | ✅ Ya funcionaba | ✅ Sin cambios |
| 6 | Cetona | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (acetona) · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 7 | Ácido carboxílico | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (aspirina, ibuprofeno, ácido acético, alanina) · Impacto Biológico · Detective Molecular · Misión (ácido acético, ibuprofeno) | ✅ Ya funcionaba (muy redundante) | ✅ Sin cambios |
| 8 | Éster | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (aspirina) · Impacto Biológico · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 9 | Amina | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (cafeína, alanina) · Impacto Biológico · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 10 | Éter | U11-U04 → **únicamente** Constructor de Grupos (botón específico) | ⚠️ Un solo camino, frágil — ninguna de las 9 moléculas del Escáner lo contiene | ⚠️ Sigue siendo 1 solo camino (ver §6) |
| 11 | Amida | U11-U04 → Constructor de Grupos (botón) · Escáner Molecular (acetaminofén, cafeína) · Detective Molecular (caso estructural) | ✅ Ya funcionaba | ✅ Sin cambios |
| 12 | Carbohidratos | U11-U04 → Clasificador de Biomoléculas (recorrer las 4 tarjetas) · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 13 | Lípidos | U11-U04 → Clasificador de Biomoléculas · Impacto Biológico · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 14 | Proteínas | U11-U04 → Clasificador de Biomoléculas · Impacto Biológico · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |
| 15 | Ácidos nucleicos | U11-U04 → Clasificador de Biomoléculas · Detective Molecular | ✅ Ya funcionaba | ✅ Sin cambios |

## 5. ¿Cuántas fichas debería tener el Atlas? ¿Cuántas tiene realmente?

Debería tener 15 (11+4) — y **tiene 15**. No hay discrepancia en el conteo de datos; el problema nunca fue cuántas fichas *existen*, sino cuántas son *alcanzables*.

## 6. ¿Cuáles nunca pueden desbloquearse? ¿Cuáles tienen condiciones repetidas? ¿Inexistentes? ¿Eventos que nunca se ejecutan?

- **Nunca pueden desbloquearse (antes del fix):** Alqueno, Alquino. Causa raíz: `AtlasQuimico.markDiscovered()` solo se llamaba desde `g11-u04.js` — la Unidad III (`g11-u03.js`), que enseña estos 2 grupos a fondo (teoría, 3 simuladores, examen), nunca estaba conectada al motor del Atlas. El propio texto de la Unidad IV le dice al estudiante *"además de repasar los 3 ya vistos en la Unidad III"* — dando por hecho una conexión que nunca se programó.
- **Condiciones repetidas (redundancia, es algo bueno):** Alcohol, Ácido carboxílico, Amina y las 4 biomoléculas tienen entre 3 y 5 caminos de desbloqueo distintos — si el estudiante usa cualquier simulador, examen o el juego con normalidad, estas fichas se desbloquean solas.
- **Condiciones inexistentes:** ninguna ficha referencia un ID que no exista en `ATLAS_QUIMICO_DATA` (se verificó cruzando cada `discover()`/`markDiscovered()` del proyecto contra los 15 IDs reales — 0 referencias inválidas).
- **Eventos que nunca se ejecutan:** el caso de Alqueno/Alquino ya cubierto arriba. Además, un hallazgo secundario: `markSimDone()` en el Constructor de Grupos Funcionales (U11-U04) se dispara **en el primer render**, antes de que el estudiante haga clic en nada — así que la barra de progreso del simulador puede llegar a "100%" habiendo descubierto solo 1 de los 8 grupos (el que se muestra por defecto). Esto no bloquea ninguna ficha de forma permanente (Éter sigue siendo alcanzable si el estudiante hace clic en su botón), pero explica por qué un estudiante casual puede ver "100% simuladores" con fichas todavía bloqueadas — el 100% del simulador y el 100% del Atlas son sistemas independientes por diseño, no la misma métrica.

## 7. Simulación: estudiante que completa el 100% de todo

Se simuló un estudiante que interactúa exhaustivamente con: los 3 simuladores de la Unidad III (probando las 3 familias en cada uno), los 4 simuladores de la Unidad IV (Constructor completo, Escáner con las 9 moléculas, Clasificador con las 4 biomoléculas, Impacto con los 3 casos), el juego Detective Molecular completo, y la Misión.

**Resultado ANTES del fix:** 2 de 15 fichas permanecían bloqueadas de forma permanente — Alqueno y Alquino — sin importar cuánto avanzara el estudiante, porque no existía ningún evento en todo el código que las desbloqueara.

**Resultado DESPUÉS del fix:** **0 de 15 fichas bloqueadas.** Verificado ejecutando la simulación real con Node contra los datos reales del proyecto (no una estimación).

## 8. Corrección aplicada

Por instrucción explícita del ticket ("Solamente si existe un error real, corregirlo"), se aplicó **un único cambio real**: se agregó un helper `discoverAtlas(atlasId)` en `js/units/grade11/g11-u03.js` y se conectó en los 3 puntos de interacción donde el estudiante ya elige una familia (alcano/alqueno/alquino) — Constructor Molecular, Laboratorio de Enlaces, y Detector Orgánico (al revelar la identificación). No se tocó ningún texto, teoría, examen ni diseño de la Unidad III — únicamente se cableó una interacción ya existente al motor del Atlas, exactamente el mismo patrón que ya usa la Unidad IV.

**Nota de alcance:** el ticket dice "NO modificar... Química 10°" y "Contenido de las unidades" como líneas generales de protección, pero la Unidad III de **Química 11.º** (`g11-u03.js`) es exactamente el módulo donde el propio ticket (Parte I) pidió investigar y — de encontrarse un error real — corregirlo. Se interpretó "no modificar contenido" como no tocar texto pedagógico/teoría (y así se hizo: 0 líneas de teoría cambiaron), reservando el permiso de corrección explícito de la Parte I para el cableado técnico del Atlas.

## 9. Éter — pendiente de decisión (no corregido automáticamente)

Éter sigue teniendo un único camino de desbloqueo (el botón específico del Constructor de Grupos). A diferencia de Alqueno/Alquino, esto **no es un error real** — es técnicamente alcanzable — así que no se corrigió sin consultar, tal como pide el ticket. Si se desea blindarlo con un segundo camino (por ejemplo, agregando una molécula con éter al banco del Escáner Molecular, o una pregunta de examen que lo dispare), es un cambio menor y acotado que se puede hacer en un siguiente paso.
