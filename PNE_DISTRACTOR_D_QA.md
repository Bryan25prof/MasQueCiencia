# PNE_DISTRACTOR_D_QA.md
## Auditoría final de las 156 opciones D (capa de adaptación 2026)

**Fecha:** 2026-08-18
**Alcance:** control automático + revisión conceptual manual de las 156 opciones D generadas por MQC (48 Química + 42 Física + 66 Biología). Ninguna opción histórica A/B/C ni ninguna `respuesta_correcta` se modificó en este proceso — solo se ajustaron 14 textos de la opción D (adición propia de MQC, no del banco histórico).

---

## 1. Metodología

1. **Control automático** (`qa_distractor_d.py`) sobre las 156 opciones D, contra sus propias A/B/C:
   - Duplicado textual exacto (sensible a mayúsculas).
   - Longitud atípica (D más de 2,2× más larga o menos de 0,45× la longitud promedio de A/B/C).
   - Colisión de notación genética sensible a mayúsculas (para no confundir `Bb`/`BB`/`bb`).
   - Puntuación final inconsistente (punto final presente/ausente de forma distinta a A/B/C).
2. **Revisión conceptual manual** de las 156 opciones D, una por una, en su banco real ya integrado (no en un borrador aparte), buscando específicamente:
   - D idéntica o prácticamente equivalente a la respuesta correcta.
   - D casi-equivalente semánticamente a **otra** opción incorrecta (crea ambigüedad).
   - D científicamente imposible de forma demasiado evidente (rompe la regla "no puede ser absurda").
   - D que introduce información externa no presente en el estímulo del ítem.
   - Diferencias de unidades que trivialicen la elección sin intención pedagógica.

---

## 2. Resultado del control automático

| Verificación | Resultado |
|---|---:|
| Duplicado textual exacto D=A/B/C | **0 / 156** |
| Colisión real de notación genética | **0 / 156** (ver nota) |
| Longitud atípica | 23 → **14 residuales** (ver sección 4, patrón esperado) |
| Puntuación inconsistente | 8 → **0 residuales** (los 8 se corrigieron) |

**Nota sobre notación genética:** el detector marcó inicialmente `PNE-2025-D01-Q-036` (A: "Bb y bb", B: "Bb y Bb", C: "BB y bb", D: "BB y Bb") por comparación insensible a mayúsculas. Se verificó manualmente carácter por carácter: las 4 combinaciones son **textualmente distintas** de forma sensible a mayúsculas (que es como se compara en el examen real) — `Bb`, `BB` y `bb` son genotipos genéticamente diferentes y así se presentan sin ambigüedad. Falso positivo confirmado, sin acción necesaria.

---

## 3. Correcciones aplicadas (14 en total)

Se encontró un patrón real y sistemático: en ítems donde A/B/C son términos sueltos de una sola palabra o frase muy corta (p. ej. `neutro.` / `catión.` / `anión.`), la opción D generada originalmente incluía una cláusula justificativa (`"..., ya que..."`) que no calzaba con el estilo terso de las otras 3 — exactamente la **"pista de redacción"** que pide detectar la sección 10. Se recortó la cláusula justificativa en 9 casos, se ajustó puntuación/mayúscula inicial en 3 casos más, y se corrigieron 2 casos adicionales de fondo (ver 3.2 y 3.3).

### 3.1 — Recorte de estilo (D pasa a ser un término corto, igual que A/B/C)

| ID | D original | D corregida |
|---|---|---|
| `PNE-2023-D03-Q-003` | "isótopo, ya que tiene diferente número de neutrones." | "isótopo." |
| `PNE-2024-T01-Q-001` | "Derivada, ya que se obtiene a partir de otras magnitudes." | "Derivada" |
| `PNE-2023-D03-Q-026` | "tasa de natalidad, ya que corresponde exclusivamente al número de nacimientos en un periodo." | "tasa de natalidad." |
| `PNE-2024-D01-Q-028` | "proporción de sexos, ya que describe la relación entre machos y hembras en la población." | "proporción de sexos." |
| `PNE-2024-T01-Q-015` | "biotopo, ya que corresponde al espacio físico ocupado por la especie." | "biotopo." |
| `PNE-2024-T01-Q-022` | "codominante, ya que ambos alelos se expresan simultáneamente en el fenotipo." | "codominante." |
| `PNE-2025-D01-Q-026` | "bioquímica, ya que involucra reacciones metabólicas específicas para regular una función interna." | "bioquímica." |
| `PNE-2025-D01-Q-035` | "locus, ya que corresponde a la posición específica de un gen en el cromosoma." | "el locus del gen." |
| `PNE-2023-D03-Q-035` | "Mutacionismo, teoría que atribuye la evolución exclusivamente a mutaciones genéticas aleatorias y súbitas." | "Mutacionismo, de las mutaciones aleatorias." |

### 3.2 — Puntuación / capitalización (para que D no destaque por formato)

| ID | Cambio |
|---|---|
| `PNE-2023-D01-Q-025` | Se quitó el punto final sobrante (A/B/C no llevan punto). |
| `PNE-2023-D01-Q-027` | Se capitalizó la primera letra ("la"→"La") y se quitó el punto final sobrante. |
| `PNE-2023-D03-Q-028` | Se agregó el punto final que faltaba (A/B/C sí lo llevan). |

### 3.3 — Corrección de fondo: D casi-equivalente a otra opción (el hallazgo más importante de esta auditoría)

**`PNE-2024-T01-Q-008`** (Conservación de la energía mecánica — limón cae sin fricción): las opciones son A) "aumenta." B) "disminuye." C) "se conserva." (correcta). La D generada originalmente en Fase 2 decía **"se transforma completamente en energía calórica antes de llegar al suelo."** — al acortarla por estilo a algo como "se pierde." se volvía **semánticamente redundante con B ("disminuye")**, lo cual habría creado dos opciones que dicen esencialmente lo mismo. Se corrigió a **"se duplica."** — una afirmación físicamente incorrecta, del mismo dominio (magnitud de la energía mecánica), pero **inequívocamente distinta** de las otras 3, sin la ambigüedad de solaparse con "disminuye". Este es exactamente el tipo de problema que la sección 10 pedía cazar ("D prácticamente equivalente a la correcta" — en este caso, a **otra opción**, un riesgo igual de real).

---

## 4. Longitud atípica residual (14 casos) — patrón de diseño esperado, no un defecto

Los 14 casos que persisten tras las correcciones son de dos tipos, ambos **inevitables dado el formato histórico del ítem**, no fallas de calidad:

**a) Ítems que piden identificar una combinación de afirmaciones numeradas (I/II/III)** — 6 casos: `PNE-2023-D03-Q-014`, `Q-017`, `PNE-2024-D01-Q-018`, `PNE-2025-D01-Q-016`, `Q-023`, y el propio patrón "I ley y II ley" de `PNE-2023-D03-Q-015`. Cuando A/B/C son `I` / `II` / `III` (un solo numeral romano), la D más natural y menos "absurda" es una **combinación de dos numerales** (`I y II`, `II y III`) — inevitablemente 2-3 veces más larga que un numeral suelto, pero es la forma más honesta de dar una 4.ª alternativa plausible sin inventar un numeral IV que no existe en el enunciado original.

**b) Ítems que piden identificar cuál de 3 elementos numerados (1/2/3) es la respuesta** — 4 casos: `PNE-2024-D01-Q-001`, `PNE-2024-D01-Q-024`, `PNE-2025-D01-Q-027`, `PNE-2025-D01-Q-038`. No existe un "elemento 4" en el enunciado histórico (serían inventar contenido que no estaba en el ítem original, prohibido por la sección 2). La única forma honesta de dar una 4.ª opción es un enunciado metacognitivo tipo `"Ninguna de las tres, porque..."` — necesariamente más largo que un solo dígito, pero es la opción más honesta dado el formato.

Los 4 casos restantes (`PNE-2023-D01-Q-001`, `Q-020`, `PNE-2024-D01-Q-014`, `PNE-2025-D01-Q-021`) se revisaron individualmente: la diferencia de longitud es moderada (ratio 2,25–2,38) y el estilo/estructura de D sigue coincidiendo con A/B/C (misma construcción gramatical, mismo nivel de detalle). No se considera necesario un ajuste adicional.

---

## 5. Revisión conceptual manual — resultado

Se leyeron las 156 opciones D, una por una, junto a sus A/B/C y su `tema`, ordenadas por ciencia (documento de trabajo interno de 1093 líneas). Hallazgos:

- **D idéntica o equivalente a la respuesta correcta:** 0 casos.
- **D casi-equivalente a otra opción incorrecta:** 1 caso encontrado y corregido (`PNE-2024-T01-Q-008`, sección 3.3).
- **D científicamente absurda de forma evidente:** 0 casos. Todas las D usan terminología real del dominio (nombres de leyes, teorías, tipos de enlace, procesos biológicos reales) aunque incorrectos para el ítem específico.
- **D con información externa al estímulo:** 0 casos. Todas las D permanecen dentro del marco conceptual planteado por el enunciado (misma ciencia, mismo eje temático).
- **Símbolos químicos incorrectos:** 0 casos — se verificaron especialmente las D con fórmulas (`NaCl2O`, `K(NO3)2`, `K2(OH)2`) y son variaciones sintácticamente válidas pero químicamente incorrectas de la fórmula real, tal como se buscaba.

---

## 6. Declaración final

Tras el control automático, las 14 correcciones de estilo/formato, y la revisión conceptual completa de las 156 opciones D:

**No quedan casos dudosos sin resolver.** Las 156 opciones D cumplen los criterios de la sección 7 del ticket original (mismo dominio conceptual, no revela la respuesta, longitud/estilo semejante salvo las excepciones documentadas y justificadas en la sección 4, funciona como distractor real). Ninguna respuesta histórica (`respuesta_correcta` de A/B/C) fue tocada en este proceso.
