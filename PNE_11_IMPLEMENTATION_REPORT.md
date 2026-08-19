# PNE_11_IMPLEMENTATION_REPORT.md
## Simulacro PNE · Ciencias (11.º) — MásQueCiencia

**Fecha:** 2026-08-17
**Alcance del ticket:** "MÁS QUE CIENCIA — PNE 11.° — FASE 1 — Construcción del Simulacro PNE de Ciencias" (34 secciones).

---

## 0. Resumen ejecutivo

Se construyó un módulo nuevo, independiente y aditivo que simula la Prueba Nacional Estandarizada (PNE) real del MEP: 60 preguntas (20 Biología + 20 Física + 20 Química), tomadas del banco histórico real 2023–2025 (156 ítems calificables tras el filtro de seguridad), con capa de adaptación A→D, selector estratificado, cálculo de nota/proyección académica, diagnóstico por ciencia y por tema, historial, y revisión posterior — todo sin usar XP, sin backend, y sin modificar ningún sistema del núcleo congelado (Router/Storage/Gamification/Perfiles).

Durante la construcción surgió un hallazgo crítico de arquitectura (colisión de nombres con un sistema "PNE" ya existente, no relacionado) que cambió las decisiones de nomenclatura — documentado en la sección 1. Dos aclaraciones del docente durante el desarrollo (naming de la tarjeta de 10.º y condición de desbloqueo) se incorporaron y están documentadas en las secciones 2 y 4.

---

## 1. Archivos creados (5)

| Archivo | Líneas | Función |
|---|---:|---|
| `js/data/banco-nacional-biologia.js` | ~2 300 | 66 ítems calificables de Biología, con `adaptacion2026.opcionD` |
| `js/data/banco-nacional-fisica.js` | ~1 470 | 42 ítems calificables de Física, ídem |
| `js/data/banco-nacional-quimica.js` | ~1 680 | 48 ítems calificables de Química, ídem |
| `js/shared/simulacro-nacional-adapter.js` | 330 | Lógica pura: selector estratificado, adaptación A→D, matemática de nota/proyección, diagnósticos, condición de desbloqueo |
| `js/modules/simulacro-nacional.js` | 520 | Módulo de interfaz: 8 pantallas (bloqueado, entrada, nota de presentación, examen, confirmación, resultados, revisión, historial) |

## 2. Archivos modificados (6) — y por qué cada uno

| Archivo | Cambio | Motivo |
|---|---|---|
| `index.html` | +8 líneas de `<script>` (3 bancos + adapter + módulo) y +4 líneas de `<li>` en el sidebar | Cargar y exponer el módulo nuevo |
| `js/modules/pne-final.js` | 4 strings de texto visible renombrados | Aclaración del docente: la tarjeta de 10.º se llamaba "PNE" por error de concepto original; el nombre visible se cambió a "Desafío Final · Química 10.º" |
| `js/modules/units.js` | 2 strings de texto visible renombrados | Ídem — tarjeta del grid de Unidades |
| `js/modules/grade11.js` | 1 string de texto visible renombrado | Ídem — mensaje de bloqueo que mencionaba el nombre viejo |
| `js/modules/grade-select.js` | 2 strings de texto visible renombrados | Ídem — etiquetas de la Ruta B en el selector de grado |
| `js/modules/progress.js` | 3 strings de texto visible renombrados | Ídem — etiquetas en Mi Progreso |

**En los 6 archivos modificados, el cambio fue exclusivamente de texto mostrado al estudiante.** Ningún nombre de ruta (`Router.register`), clave de `Storage`, fuente de XP, ni id de badge cambió — ver sección 1 de este informe (colisión de nombres) para el detalle de por qué eso era imprescindible.

## 3. Hallazgo crítico de arquitectura: colisión de nombres con "PNE"

Antes de escribir código se inspeccionó el ZIP real del proyecto (no se programó a ciegas, sección 33 del ticket). Se encontró que **"PNE" ya es un identificador usado, con un significado completamente distinto**, en varios lugares:

| Ya existía | Significado real |
|---|---|
| `window.PNE` (`js/shared/pne.js`) | Panel de **accesibilidad** (alto contraste, texto grande, lectura por voz, modo simplificado) |
| `window.PNEBank` (`js/shared/pne-bank.js`) | Selector de variantes de preguntas para modo simplificado |
| `data.pne` (en `Storage`) | El "Desafío Final" acumulativo de **Química 10.º** (9 unidades, 30 preguntas), que además **desbloquea Química 11.º** si `pne.bestScore >= 80` |
| `Router.register('pne-final', ...)` | Módulo de ese desafío |
| XP `'pne-first-pass'`, `'pne-improved'` | Ligadas a ese mismo desafío |
| `profiles.js` (Bitácora) | Categoriza automáticamente como "PNE" cualquier XP cuya fuente empiece con `'pne-'` |

Crear un módulo nuevo llamado literalmente `PNE`, o que escribiera en `data.pne`, o que usara fuentes de XP `'pne-...'`, habría **roto en silencio** el sistema de accesibilidad real y/o corrompido las estadísticas y el desbloqueo de Química 11.º de estudiantes reales — exactamente el tipo de regresión que la sección 28 del ticket prohíbe.

**Decisión aplicada:** el módulo nuevo usa el nombre `SimulacroNacional` / `'simulacro-nacional'` en todo el código — inconfundible del sistema viejo a simple vista. La UI puede (y debe) seguir diciendo "PNE" en el texto visible al estudiante ("Simulacro PNE · Ciencias", sección 7 del ticket), porque ese es un requisito de branding, no de identificador de código; la colisión solo era un riesgo a nivel de nombres internos.

**Aclaración del docente durante el desarrollo:** confirmó que la tarjeta de 10.º nunca debió llamarse "PNE" — la idea original era "prueba de 10.º final", y la verdadera PNE (Prueba Nacional Estandarizada del MEP) es la de 11.º que se construyó en este ticket. Por eso se aplicó el renombrado de texto visible descrito en la sección 2 de este informe: ahora solo el simulacro nuevo se presenta como "PNE" ante el estudiante.

## 4. Funcionamiento del selector 20/20/20

`SimulacroNacional.construirIntento(idsEvitar)`:

1. Para cada ciencia, agrupa los ítems calificables por `tema`.
2. Baraja el orden de los grupos de tema y el contenido de cada grupo (Fisher–Yates).
3. Recorre los grupos en **round-robin** (uno de cada tema por vuelta) hasta juntar 20 — esto reparte por tema automáticamente y evita rachas del mismo tema sin necesitar una regla aparte.
4. Si se pasa `idsEvitar` (los IDs del intento anterior del mismo perfil), se excluyen primero; si el banco no alcanza sin ellos, se completa con el banco completo.
5. El resultado final se reordena por bloque (Biología → Física → Química, sección 4 del ticket), con el orden interno de cada bloque también barajado.

**Verificado en pruebas reales (Chromium, no solo unitarias):** racha máxima de preguntas consecutivas del mismo tema = 1 (mejor que el mínimo pedido); en el intento de prueba, Química mostró 20 temas distintos en sus 20 preguntas (cobertura transversal total, sección 6 del ticket); 0 preguntas repetidas entre dos intentos consecutivos del mismo perfil.

## 5. Filtro de `VALIDADO` (sección 3 del ticket)

El filtro real (`estado_validacion==="VALIDADO"` **y** `respuesta_validada===true`) se aplicó **al generar** los 3 archivos de banco — no en runtime, porque esos campos internos de auditoría (`estado_validacion`, `archivo_fuente`, `pagina_fuente`, `observaciones`) **no viajan al JS de producción en absoluto** (ver sección 9 de este informe: nunca deben llegar al estudiante). Los bancos calificables tienen 66/42/48 ítems — muy por encima del mínimo de 20 por ciencia.

Como refuerzo (para el día que alguien regenere estos archivos sin filtrar), `_soloCalificables()` en el adapter vuelve a exigir en runtime que cada ítem tenga estructura completa (`opciones.A/B/C`, `correcta`, `adaptacion2026.opcionD`) antes de poder entrar al selector — un ítem mal formado se excluye en vez de romper el examen.

## 6. Adaptación A–D (sección 7 del ticket)

Se generaron **156 opciones D** (una por cada ítem calificable), cada una con razonamiento propio del mismo dominio conceptual del ítem histórico — no una fórmula genérica ni "ninguna de las anteriores" salvo en los pocos casos donde el ítem original ya pedía identificar un número de opción (ahí "Ninguna de las tres, porque…" es la única forma honesta de dar una 4.ª alternativa sin inventar un elemento nuevo en el enunciado). Ejemplos reales:

- Química (`PNE-2023-D01-Q-002`, tabla periódica): D = "3 metaloides, 1 metal y 2 no metales." (mismo estilo de conteo que A/B/C).
- Física (`PNE-2024-T01-Q-006`, gravitación universal): D invierte la relación matemática correcta, mismo estilo verboso que las otras 3.
- Biología (`PNE-2023-D01-Q-028`, comensalismo): D = "parasitismo, pues las epífitas se alimentan directamente de la savia del árbol." — mismo dominio (relaciones ecológicas), error conceptual real y común (confundir epífitas con parásitas).

Cada ítem guarda `adaptacion2026: { opcionD, opcionDGenerada: true, origen: 'MQC' }` exactamente como pedía el ticket. La respuesta correcta histórica nunca cambia.

**Verificación de calidad ejecutada:** las 156 opciones D se compararon (sensible a mayúsculas — importante para notación genética tipo `Bb`/`BB`) contra las 3 opciones históricas de cada ítem: **0 colisiones textuales**.

## 7. Mecanismo de aleatorización (sección 8 del ticket)

Cada ítem se adapta a `{ opciones: [{id:'originalA',texto},{id:'originalB',texto},{id:'originalC',texto},{id:'mqcD',texto}], correcta: 'originalX' }`. El array de `opciones` se baraja (Fisher–Yates) para la presentación visual; `correcta` sigue apuntando al mismo `id` sin importar la posición. Se verificó en runtime que, tras barajar, `correcta` siempre apunta a una opción presente en el array.

## 8. Imágenes/tablas/gráficas pendientes (sección 9 del ticket)

28 de los 156 ítems calificables requieren un recurso visual que todavía no existe como archivo físico en `/assets/`. El motor los detecta (`usaImagen`/`usaTabla`/`usaGrafico`) y muestra el placeholder técnico exacto pedido:

```
🖼️ PNE_ASSET_PENDING — falta insertar {tipo}: {detalle de figuraAsociada.tipo}
```

Listado completo (id, archivo fuente, página, tipo de figura) — para cuando se preparen los recursos reales:

| Ciencia | Cantidad | 
|---|---:|
| Química | 19 |
| Biología | 7 |
| Física | 2 |

Detalle ítem por ítem disponible en el propio banco (`figuraAsociada.tipo` + `archivoFuente` + `paginaFuente` de cada ítem con `usaImagen/usaTabla/usaGrafico === true`) — no se duplicó aquí para no desincronizar dos fuentes de verdad.

## 9. Cálculo de nota (sección 15) y proyección (secciones 16-18)

Todas las funciones son puras (`js/shared/simulacro-nacional-adapter.js`, sección 5 del archivo):

- `calcularNotaPNE(aciertos, total)` → `(aciertos/total)×100`, redondeada a 2 decimales.
- `calcularProyeccion(P, E)` → `{ aportePNE: E×0.40, proyeccionFinal: P + aportePNE }`.
- `calcularNotaMinimaRequerida(P)` → `(70-P)/0.40`, con los 2 casos especiales de la sección 18: si da negativo, `{valor:0, caso:'ya-asegurado'}`; si da más de 100, `{caso:'imposible', mensaje:'Con la nota de presentación registrada, alcanzar 70 requeriría una calificación superior al 100 % en la PNE.'}` (nunca se muestra un número como "125 %" como si fuera alcanzable).

**Los 5 casos de prueba de la sección 32 se verificaron y pasan exactamente**, reconfirmado en esta sesión sobre el código ya integrado en el proyecto real (no solo en el entorno de construcción aislado):

| Caso | Entrada | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| A | P=48, E=80 | aporte=32, final=80, mínimo=55% | ✅ exacto |
| B | P=48, E=50 | aporte=20, final=68 (no alcanza 70) | ✅ exacto |
| C | P=42 | mínimo=70% | ✅ exacto |
| D | P=30 | mínimo=100% | ✅ exacto |
| E | P=20 | caso "imposible", mensaje especial | ✅ exacto |

## 10. Historial (sección 25)

`data.simulacroNacional.historial[]` — array con fecha, nota de presentación usada, aciertos, nota PNE, resultado por ciencia, proyección final, mínimo requerido, favorable/no favorable, e IDs de preguntas utilizadas (para la lógica anti-repetición del próximo intento). Límite razonable de 30 registros conservados. **Ninguna llamada a `Gamification.addXP()` en todo el módulo** — verificado con un stub que lanza excepción si se invoca; el test completo de un intento de 60 preguntas terminó sin que se disparara.

## 11. Responsive (sección 27)

El módulo reutiliza al 100% el sistema de diseño ya responsive de MQC (mismas variables CSS, mismas clases `.btn`/`.progress-bar`/`.section-header`) — **cero CSS nuevo fue necesario** (se verificó que las 12 variables/clases usadas ya existían en `css/main.css` antes de escribir una sola línea). El navegador de preguntas (modal 1–60) usa `overflow-y:auto` y `-webkit-overflow-scrolling:touch` explícitamente para no repetir el problema histórico de menús cortados en iPhone (HOTFIX-13).

## 12. Pruebas realizadas

Dado que este entorno no tiene acceso a red (no se pudo instalar `jsdom` vía npm), las pruebas de interfaz se hicieron con **Chromium real vía Playwright** (ya presente en el sistema), no simulación de DOM:

1. **`node --check` en los 85 archivos `.js` del proyecto** (80 preexistentes/modificados + 5 nuevos): 0 errores.
2. **Prueba matemática pura** (Node, sin navegador): selector (60/20/20/20, 0 IDs duplicados, 0 repetición entre intentos, racha máxima de tema = 1) + los 5 casos de la sección 32 + validación de rango de presentación (0/60 válidos, 61/-1/80 inválidos).
3. **Prueba end-to-end de interfaz** (Chromium, arnés aislado con stubs de Storage/Router/Profiles): flujo completo — entrada → nota de presentación → 60 preguntas respondidas → entrega → resultados → revisión posterior → historial. Verificó explícitamente que la revisión posterior **no** expone `archivoFuente`, `paginaFuente`, `REQUIERE_REVISIÓN` ni `observaciones` en el HTML.
4. **Prueba de las 4 combinaciones de desbloqueo** (Chromium): ninguna ruta / solo Ruta 1 / solo Ruta 2 vía 3 de 4 exámenes / ninguna ruta por quedarse corta — las 4 exactas.
5. **Prueba de integración real** (Chromium contra el `index.html` real del proyecto, con el portal de perfiles y la intro cinematográfica reales): arranque completo, navegación por las 9 secciones (8 preexistentes + la nueva) sin errores, texto renombrado confirmado en vivo. Los únicos 2 "errores" de red detectados son Google Fonts fallando por falta de conectividad en este entorno — comportamiento documentado como esperado en el propio `README.md` del proyecto, no una regresión introducida aquí.

## 13. Comprobación de no-regresión (sección 28)

| Sistema protegido | Verificación |
|---|---|
| Router | Sin cambios de código; solo se agregó un `Router.register()` nuevo (mismo patrón que todos los módulos existentes) |
| Storage | Sin cambios de código; solo se usa `Storage.get/set/load` ya existentes, con una clave nueva (`simulacroNacional`) que nunca colisiona con ninguna clave existente |
| Gamification | Sin cambios de código; 0 llamadas a `addXP()` desde el módulo nuevo |
| Perfiles | Sin cambios de código; solo se lee `MQCProfiles.isGuest()` |
| `data.grade11Unlock` | Solo lectura — confirmado en la prueba de integración que el objeto permanece exactamente igual tras usar el simulacro |
| `data.pne` (Desafío Final 10.º) | Nunca se escribió ni se leyó desde el módulo nuevo — confirmado explícitamente en la prueba (`data.pne === undefined` tras un intento completo) |
| Las 8 secciones existentes (home, units, grade11, atlas-quimico, integrador, periodic-table, progress, pne-final) | Las 9 (8 + la nueva) navegadas y renderizadas sin error en la misma sesión de prueba de integración |

## 14. Problemas pendientes / decisiones que requieren confirmación

1. **28 recursos visuales pendientes** (sección 8 de este informe) — el simulacro funciona sin ellos (placeholder técnico visible), pero la experiencia mejora mucho una vez insertados los archivos reales en `/assets/`.
2. **`MQC_MASTER_PROJECT_v1.0.md`**, el archivo que `PROJECT_CONTEXT.md` marca como lectura obligatoria antes de tocar el proyecto, **no vino en el ZIP subido**. Se trabajó leyendo el código real directamente como sustituto; si ese archivo existe en otro lado, conviene cotejarlo contra las decisiones de este informe.
3. **Colores de bloque en el examen** (`--green`/violeta/cian usados como acento por ciencia) se eligieron por disponibilidad y contraste, no están tomados de ningún archivo de paleta oficial por-ciencia — si existe una paleta específica para Biología/Física/Química en el Design System, avisar para ajustarlo (cambio de una sola línea por color, sin tocar lógica).
4. La condición de desbloqueo (sección 4 de este informe) quedó implementada exactamente como la describió el docente el 2026-08-17; dado que la Ruta 2 matemáticamente está contenida dentro de la Ruta 1 en la práctica actual (no se puede tener progreso real en Química 11.º sin ya haberla desbloqueado), el efecto práctico hoy es idéntico a "desbloqueda cuando se desbloquea Química 11.º" — se implementaron ambas rutas explícitamente de todas formas, tal como se pidió, y quedan listas por si en el futuro cambia el criterio de la Ruta 1.

---

## Declaración final

Todas las comprobaciones de las secciones 31 y 32 del ticket se ejecutaron sobre el código ya integrado en el proyecto real y pasaron exactamente:

- ✅ 60 preguntas, 20 Biología, 20 Física, 20 Química
- ✅ 0 preguntas `REQUIERE_REVISIÓN`, 0 con `respuesta_validada === false`
- ✅ 4 opciones visuales por pregunta, una única respuesta correcta cada una
- ✅ 0 IDs duplicados dentro de un mismo intento
- ✅ Los 5 casos matemáticos de la sección 32, exactos
- ✅ 0 llamadas a `Gamification.addXP()`
- ✅ `node --check` limpio en 85/85 archivos
- ✅ No-regresión confirmada en las 8 secciones preexistentes

**PNE 11.° — Simulador de Ciencias MQC implementado y auditado.**
