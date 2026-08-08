# HOTFIX-10 PREMIUM — Informe de Implementación
## Química 11.º — Unidad IV: transformación hacia la interpretación molecular

---

## 1. Estado real encontrado al iniciar (transparencia)

Antes de escribir código se auditó el ZIP real subido, no un resumen de lo que "debería" existir (regla de oro #1 de `PROJECT_CONTEXT.md`). Se encontró que una sesión anterior ya había preparado 3 archivos con el encabezado "HOTFIX-10 PREMIUM" — `js/data/grade11/atlas-quimico.js` (ampliado de 9 a 11 grupos), `js/data/grade11/moleculas-reales.js` (9 moléculas nuevas) y `js/shared/molecule-renderer.js` (renderizador reutilizable) — correctamente registrados en `index.html`, pero **nunca conectados** al archivo real de la unidad: `js/units/grade11/g11-u04.js` seguía siendo exactamente la versión de IMP-11-U04 (3 simuladores, sin Escáner Molecular, juego con pistas de texto únicamente, examen de 40 preguntas sin categoría de interpretación, misión anterior sobre el Río Pacuare sin estructuras). Este sprint completa esa conexión y agrega lo que faltaba, sin descartar ni duplicar el trabajo ya hecho.

## 2. Alcance respetado

**No se modificó:** Arquitectura MQC, Photon, sistema de perfiles, XP, medallas, diseño general, responsive, PNE del resto de unidades, ni ninguna unidad distinta a `g11-u04`. Verificado con una comparación binaria (`diff -rq`) contra el ZIP original: **solo 3 archivos cambiaron en todo el proyecto.**

## 3. Cambios implementados

### 3.1 Nuevo enfoque pedagógico
Los 2 temas de teoría nuevos y las comparaciones estructurales reorientan la unidad hacia "¿qué información puedo obtener observando una molécula?", en vez de definiciones aisladas.

### 3.2 Grupos funcionales completos (11)
Ya estaban en el Atlas desde la sesión anterior (9 originales + Éter y Amida). Se amplió también el Constructor de Grupos Funcionales (`GRUPOS_SIM`) para cubrir los 11, no solo 6.

### 3.3 Metodología visual — estructuras completas, no grupos sueltos
El Escáner Molecular, las comparaciones de teoría, el juego y la misión muestran siempre el grupo funcional dentro de una molécula completa (`MoleculeRenderer.renderStatic`/`renderInteractive`), nunca aislado.

### 3.4 Escáner Molecular (simulador nuevo)
- Muestra las 9 moléculas reales, segmento por segmento, con `MoleculeRenderer.renderInteractive`.
- El estudiante toca un segmento → acierto (verde + explicación) o error (se resalta el correcto + explicación).
- También funciona como el "Nivel 2: Reconocimiento" pedido para el Constructor — un botón dentro del Constructor lo abre directamente, sin duplicar el renderizador ni la data.
- `markSimDone` sigue siendo idempotente: no hay XP infinito por repetir moléculas.

### 3.5 Banco de moléculas reales (9)
Ya existía de la sesión anterior — verificado contra el Atlas (0 referencias de grupo inválidas) y ahora sí usado por el Escáner Molecular, el juego, el examen y la misión.

### 3.6 Biomoléculas visuales
Nuevo tema de teoría con 4 diagramas de flujo (carbohidrato→muchos –OH→afinidad con agua, etc.), reemplazando texto largo por una secuencia corta de 3 pasos.

### 3.7 Comparaciones directas
Nuevo tema de teoría con 5 pares comparados: alcohol vs. ácido carboxílico, éter vs. éster, amina vs. amida (estos 3 con dibujo de estructura real lado a lado) + carbohidrato vs. lípido y proteína vs. carbohidrato (composición/función).

### 3.8 Simuladores — 2 niveles
Nivel 1 (Constructor, sin cambios de fondo) + Nivel 2 (Reconocimiento, el Escáner Molecular) accesible desde el mismo Constructor.

### 3.9 Juego evolucionado
"Detective Molecular" mezcla ahora las pistas de texto originales con casos de estructura completa (molécula real renderizada + pregunta "¿cuál grupo SÍ está presente?"), más semejante a una PNE.

### 3.10 Examen Premium
Categoría nueva `interpretacion-molecular` (8 preguntas, mínimo real de 4 por intento — banco total 40→48), con identificación de grupos en moléculas reales, moléculas multi-grupo (aspirina, acetaminofén, alanina) y comparación estructural directa.

### 3.11 Misión final — "Laboratorio de Análisis Molecular"
Reemplaza la misión anterior. 3 muestras reales de dominios distintos (ácido acético, glucosa, ibuprofeno), el estudiante identifica grupos con justificación, relaciona estructura-función, y propone aplicación/impacto ambiental. Misma protección anti-farming que la misión anterior.

### 3.12 Reutilización, sin duplicar (preparación para el Centro PNE)
Un único trío de datos (`MOLECULAS_REALES` + `ATLAS_QUIMICO_DATA` + `MoleculeRenderer`) alimenta el Escáner, las comparaciones de teoría, el juego y la misión — ningún componente reimplementa su propio renderizador.

## 4. Pruebas ejecutadas

| # | Prueba | Método | Resultado |
|---|---|---|---|
| 1 | Sintaxis de todo el proyecto | `node --check` en el 100% de los `.js` | ✅ |
| 2 | Atlas Químico: 11 grupos + 4 biomoléculas | Carga real con Node | ✅ |
| 3 | Moléculas reales: 9, sin referencias de grupo inválidas | Carga real con Node, cruce contra Atlas | ✅ |
| 4 | Banco de examen: 48 preguntas, IDs únicos | Carga real con Node | ✅ |
| 5 | Cobertura PNE 48/48 (sin preguntas huérfanas) | Cruce de IDs entre banco y banco PNE | ✅ |
| 6 | Examen balanceado: siempre 20 preguntas, siempre ≥4 de interpretación molecular | Simulación real de 500 exámenes generados con la función `buildBalancedExam()` real | ✅ (0 fallos) |
| 7 | `MoleculeRenderer.renderStatic`/`renderInteractive` generan HTML válido con datos reales | Ejecución real de las funciones con Node | ✅ |
| 8 | Alcance: solo 3 archivos cambiaron en todo el proyecto | `diff -rq` binario contra el ZIP original | ✅ |
| 9 | Química 10.º, Unidades I-III de 11.º y núcleo intactos | Confirmado por la prueba 8 (0 diferencias fuera de los 3 archivos) | ✅ |

**Limitación honesta:** este entorno no tiene navegador real ni DOM — las pruebas de `bindInteractive` (clics reales sobre el Escáner Molecular) se verificaron leyendo el código fuente y ejecutando la lógica pura (generación de HTML, selección de datos) con Node, mismo patrón de limitación ya documentado en `IMP_11_U04_REPORT.md` para esta unidad. Se recomienda una verificación visual rápida en el navegador antes de publicar.

## 5. Declaración final

**"HOTFIX-10 PREMIUM completado. La Unidad IV fue transformada en un módulo de interpretación molecular alineado con la metodología del MEP y preparada como base oficial para el futuro Centro Nacional de Preparación PNE de MásQueCiencia."**
