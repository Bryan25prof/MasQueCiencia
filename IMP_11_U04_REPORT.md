# IMP-11-U04 — Informe de Implementación
## Química 11.º — Unidad IV: Química de la Vida (Grupos Funcionales y Biomoléculas)
**Última unidad de contenido de Química 11.º — ahora solo queda desarrollar el PNE de 11.º**

---

## 1. Discrepancia real encontrada y resuelta con transparencia

El ticket pedía "Color oficial: Verde esmeralda. Ícono: 🧬" para esta unidad — **exactamente la misma frase, palabra por palabra**, que el ticket de la Unidad III (IMP-11-U03) ya había pedido. Antes de aplicar el cambio, se revisó la metadata real y se confirmó que `g11-u04` ya tenía asignado **naranja (`#FFA94D`)** desde la Fase 1 Multigrado — consistente con el diseño original de 4 colores distintos, uno por unidad (cian, violeta, verde, naranja). Se mantuvo el color ya establecido para no crear dos unidades visualmente idénticas, lo cual habría contradicho el propio Design System que el ticket pide mantener. El ícono 🧬 sí coincidía en ambos casos y no generó conflicto.

## 2. Auditoría previa

Se estudió `g11-u03.js` (patrón ya validado 3 veces) y se confirmó que ningún archivo de las Unidades I-III necesitaba modificarse — el Atlas Químico se diseñó para dispararse únicamente desde el contenido propio de la Unidad IV.

## 3. Atlas Químico MQC — la función nueva de este sprint

Implementado exactamente como pedía el ticket: una colección sencilla (9 grupos funcionales + 4 biomoléculas = 13 fichas), no una biblioteca extensa.

- **`js/data/grade11/atlas-quimico.js`** — la data de las 13 fichas, cada una con nombre/representación/grupo característico/ejemplo/aplicación (grupos) o función/elementos/ejemplo/importancia (biomoléculas).
- **`js/shared/atlas-quimico.js`** — motor de registro: `markDiscovered(id)` (idempotente, nunca otorga XP, reacciona con un estado ya existente de Photon), `isDiscovered(id)`, `progress()`.
- **`js/modules/atlas-quimico.js`** — vista nueva (ruta `atlas-quimico`, con su propio ítem en el sidebar), reutilizando exactamente `.units-grid`/`.unit-card` — cero CSS nuevo.
- **Verificado explícitamente:** el Atlas no otorga XP al descubrir (probado comparando el XP total antes/después), y `markDiscovered()` es idempotente (llamarlo dos veces sobre el mismo ítem no lo marca como "nuevo" la segunda vez).

## 4. Contenido construido

- **7 temas de teoría**, con ejemplos reales verificados (etanol, ácido acético, acetona, acetato de etilo, etc. — cada uno coincide exactamente con la data del Atlas, para que nunca se contradigan entre sí).
- **3 simuladores**, todos conectados al Atlas Químico:
  - Constructor de Grupos Funcionales (6 grupos: –OH, –CHO, C=O interno, –COOH, –COO–, –NH2).
  - Clasificador de Biomoléculas (las 4, con tipo/función/ejemplo).
  - Impacto Biológico (3 casos integrados, conectando grupo funcional → biomolécula relacionada → aplicación → impacto ambiental).
- **1 juego** ("Detective Molecular") con 10 pistas posibles (6 grupos + 4 biomoléculas), cada acierto dispara el Atlas.
- **Banco de 40 preguntas**, 20 por intento, 5 categorías todas superando el mínimo (7/6/7/6/6/8 reales vs. 4/3/3/3/3 mínimos + análisis de casos con 8), cubriendo identificación de grupos, clasificación, biomoléculas, ejemplos cotidianos, aplicaciones y análisis de casos.
- **Banco PNE adaptado**, cobertura 40/40.
- **Misión de cierre**, que cierra la investigación completa de las 4 unidades (no solo esta), con la misma protección anti-farming.
- **Insignia final "Arquitecto de la Vida"** — mismo patrón exacto de finalización real que las 3 unidades anteriores.

## 5. Alcance respetado

Se usó únicamente lo permitido: 6 grupos funcionales (alcoholes, aldehídos, cetonas, ácidos carboxílicos, ésteres, aminas) + 4 biomoléculas. **No se desarrolló** ningún mecanismo de reacción, síntesis orgánica, ni contenido de nivel universitario — confirmado por revisión del banco de preguntas.

## 6. Corrección del sesgo de posición desde el diseño

Mismo patrón que las Unidades II y III: las 40 preguntas se escribieron con la correcta en A, el examen mezcla las opciones desde su diseño inicial. Verificado con 300 repeticiones: distribución final 25.7%/25.1%/24.6%/24.6%.

## 7. Pruebas ejecutadas — 22/22 en PASS (más la verificación estadística del examen)

| # | Prueba | Resultado |
|---|---|---|
| A1-A5 | Atlas Químico: 13 fichas, nada descubierto al inicio, idempotencia, sin XP, vista renderiza correctamente | ✅ |
| 1-2 | Química 10.º y Unidades I-III no cambiaron; la Unidad IV queda disponible (0 en desarrollo) | ✅ |
| 3-8 | 7 temas, 3 simuladores, juego, examen y misión funcionan correctamente | ✅ |
| 9-10 | Protección anti-farming de la misión | ✅ |
| 11-13 | La insignia final exige finalización real; las 4 insignias de unidad están en el catálogo | ✅ |
| 14-15 | Banco de 40, sin duplicados, cobertura PNE 40/40, modo simplificado | ✅ |
| 16 | Exportar/importar conserva progreso, insignia y Atlas | ✅ |
| 17 | Sin errores de consola reales | ✅ |

**Nota de transparencia:** la prueba 5 (simulador → Atlas) se verificó combinando lectura directa del código fuente (confirmando que `simConstructorGrupos()` llama a `discover()` sin excepción en cada render) con una prueba funcional del mecanismo subyacente — la misma limitación de simulación de DOM ya documentada en sprints anteriores (elementos generados solo como texto HTML, sin `id`, no se instancian como objetos reales en el arnés de prueba).

## 8. Declaración final

**"Unidad IV integrada, Atlas Químico MQC implementado y Química 11.º lista para iniciar el desarrollo del PNE."**
