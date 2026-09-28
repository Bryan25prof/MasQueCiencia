# FASE 2 — Paso 4: Biología — BIO10-U01, primera unidad real

## Resultado: se construyó y probó la primera unidad real de Biología 10.º. Sigue oculta detrás de una bandera de publicación hasta tu revisión y autorización explícita.

**Contexto:** con tu confirmación "ya inclui esta actualización pasamos al paso 4", el Pendiente D quedó cerrado en su totalidad (activación docente + AccessControl + auditoría de cierre) y arrancó el paso 4 de la secuencia acordada: Biología. Elegiste pasar el libro fuente y empezar con el de décimo año. Este trabajo se hizo exclusivamente a partir de ese libro — nunca se inventó ni se copió contenido textual.

---

## 1. Fuente académica

**"Biología 10º: Un Enfoque Práctico"** — Licda. Kathia Eugenia Hernández Camacho, Editorial Didáctica Multimedia, 6.ª edición, 2018 (ISBN 978-9968-9553-5-5).

BIO10-U01 corresponde a la **Unidad I / Tema 1: "Las formas de vida y el entorno biofísico"** (páginas 8-44 del libro), que incluye 6 subtemas (1.1 a 1.6), 4 actividades, una guía de repaso de 27 preguntas y la evaluación del tema (con ejemplos reales costarricenses). Todo el contenido de la unidad —teoría, banco de examen, escenarios del juego y misión final— se derivó y parafraseó de ese material, nunca copiado ni inventado.

El resto del libro (Unidades II a IX: biodiversidad, ecología, poblaciones, variabilidad genética, herencia, fuerzas evolutivas, evidencias evolutivas, y origen de la vida y las especies) **no se tocó** — quedan como "Próximamente", a construirse unidad por unidad más adelante, como se hizo con Física.

---

## 2. Qué se construyó

Mismo patrón EXACTO ya probado y aprobado con FIX10-U01 (Física 10.º) — la misma arquitectura, las mismas protecciones anti-farming de XP, el mismo mecanismo anti-trampa del examen, mirado archivo por archivo antes de escribir una sola línea nueva.

### 2.1 Teoría — 6 temas
Cada tema sigue el mismo formato fragmentado ya usado en Física (Idea clave / Explicación / Ejemplo / Aplicación real / Comprueba), en acordeón, con XP otorgado una sola vez por tema:

1. Campo de estudio de la Biología
2. Áreas de estudio de la Biología
3. Adaptaciones biológicas
4. Tipos de adaptaciones (morfológicas, fisiológicas, de comportamiento)
5. El medio ambiente y su relación con los seres vivos
6. Adaptaciones humanas

### 2.2 Simuladores — 3 experiencias
- **Clasificador de adaptaciones**: 10 situaciones reales para clasificar como Morfológica, Fisiológica o De comportamiento.
- **Camuflaje o Mimetismo**: 2 fases (explorar 6 especies reales — jaguar, falsa coralillo, rana "blue jean", palomilla pavo real, ave picozapato, zorrillo — y luego un quiz de 6 rondas con opciones mezcladas).
- **Un mismo organismo, distintos factores**: escenario guiado en 2 pasos (una tortuga marina afectada por un factor climático y un factor de sustrato a la vez).

### 2.3 Juego — "Detective de las Adaptaciones"
5 escenarios reales (oso polar, ardilla migrando, camaleón, serpiente venenosa, enredaderas) con pistas que orientan sin revelar la respuesta. XP y avance SOLO al acertar; una respuesta incorrecta permite reintentar sin penalización ni otorgar XP.

### 2.4 Examen — banco de 50 preguntas reales
`js/data/banco-bio10-u01.js`, agrupadas por los 6 temas, derivadas de la Guía de Repaso y la Evaluación del tema reales del libro. Cada intento toma 20 preguntas al azar, y **el orden de las opciones de cada pregunta también se mezcla independientemente en cada intento** — el mismo mecanismo anti-trampa de Física, construido desde el día uno (nunca la respuesta correcta queda fija en la misma posición).

### 2.5 Misión final — "Bajo la lupa: la rana venenosa"
Caso real: la rana "blue jean" (*Oophaga pumilio*), presente en La Selva y Tortuguero, Costa Rica — mencionada en el propio Tema 3 del libro. 4 componentes verificables (selección múltiple, 2 preguntas de opción única, y una respuesta corta de 30 a 250 caracteres); el botón de entrega permanece deshabilitado hasta que los 4 componentes son correctos.

---

## 3. Arquitectura — mismo carril paralelo, nunca mezclado

Se siguió al pie de la letra el principio ya establecido en el proyecto: cada disciplina/grado tiene su propio namespace de datos, sin generalizar ni reutilizar funciones entre disciplinas, para no arriesgar el comportamiento ya probado de Química ni de Física.

| Elemento | Biología 10.º |
|---|---|
| Namespace de datos | `data.biologia10` (ya estaba reservado en el esquema, sin contenido real hasta ahora) |
| Funciones de Storage | `updateBiologia10Unit`, `markBiologia10TopicRead`, `getBiologia10UnitProgress` (mismo patrón exacto que las de Física, con la misma guarda docente) |
| XP disciplinario | `data.xpBiologia.total` (ya existía, preparado desde el Lote XP2.0; ahora recibe XP real por primera vez) |
| Insignia | `explorador-biologia` (mismo criterio anti-farming que las demás: los 6 temas + los 3 simuladores + el juego jugado + el examen aprobado + la misión entregada) |
| Bandera de publicación | `window.MQC_BIOLOGIA_FLAGS.biologia10Publico` (nace en `false`, mismo mecanismo que ya corrigió el bug histórico de Física — ver `js/shared/mqc-biologia-flags.js`) |

**Decisión explícita respetada:** no se diseñó ninguna tabla de "rangos" de XP para Biología (`XP2.getRango('biologia', xp)` sigue devolviendo `null` a propósito) — ya habías decidido que eso se calibra cuando exista contenido real y XP legítimo con el que medir, y hoy por primera vez existe XP real de Biología, pero calibrar esos rangos queda para una decisión aparte, no para esta entrega.

---

## 4. Por qué Biología sigue oculta

Se construyó desde el día uno el mismo mecanismo que corrigió el bug real que tuvo Física (documentado en `js/shared/mqc-fisica-flags.js`): antes de esa corrección, Física ya estaba pública "por dentro" pero las pantallas de descubrimiento (sidebar, "Selecciona tu ruta científica") seguían mostrando "En desarrollo" con una bandera distinta y desincronizada, dejando a los estudiantes en un callejón sin salida.

Para Biología, se evitó ese error desde el inicio: se creó `js/shared/mqc-biologia-flags.js` como fuente única, consultada de forma idéntica por `biologia10.js`, `grade-select.js` y `sidebar-nav.js`. Hoy esa bandera está en `false` a propósito — BIO10-U01 ya está construida y probada, pero **ningún estudiante real la va a ver** hasta que la revisés y confirmés que la publique, exactamente como se hizo con Física antes de su lanzamiento.

Mientras tanto podés revisarla vos mismo, sin publicarla, entrando una vez a tu sitio con `?biologia10preview=1` (queda guardado solo en tu navegador).

---

## 5. Pruebas realizadas

**Nueva suite end-to-end de esta entrega — 30/30 exitosas** (`e2e-biologia10.js`), en 5 bloques, contra la app real (nunca contra una copia simulada):

- **Bloque A** — flujo real de UI completo: los 6 temas leídos (con XP correcto: `unit-started` + 6×15), los 3 simuladores completados, los 5 niveles del juego resueltos (verificando que la respuesta correcta real está entre las opciones mostradas en cada nivel), y un examen completo de 20 preguntas contestado de punta a punta.
- **Bloque B** — anti-farming del examen: se fuerza el escenario de "ya aprobado antes" y se confirma que un segundo intento (aprobado o no) **no** otorga XP de nuevo.
- **Bloque C** — misión final: el botón de entrega empieza deshabilitado, se habilita solo con los 4 componentes correctos, otorga XP una sola vez, y reentrar a la pestaña ya completada no otorga XP de nuevo.
- **Bloque D** — guarda de escritura docente (Pendiente D): un docente verificado puede explorar BIO10-U01 libremente (candado abierto), pero ninguna de sus acciones —ni siquiera una llamada directa a `Storage.updateBiologia10Unit`— persiste como progreso académico ni otorga XP.
- **Bloque E** — consistencia de descubrimiento: con la bandera en `false` (estado real de producción hoy), tanto el hub "Selecciona tu ruta científica" como la navegación directa a la ruta siguen mostrando "En desarrollo", sin ningún callejón sin salida.

**Segunda suite — 6/6 exitosas** (`e2e-biologia10-sidebar.js`), enfocada en el sidebar académico: sin publicar, tocar "Biología" sigue yendo al placeholder de siempre; con la vista previa activa, el panel de grados muestra "Biología 10.º" navegable y "Biología 11.º" correctamente marcada como "en desarrollo" (sin inventar ninguna estructura), y la fila real de BIO10-U01 navega correctamente a la unidad.

**Regresión completa contra las suites ya existentes, re-ejecutadas después de todos los cambios:**
- `AccessControl` (Pendiente D, paso 2): **60/60**, sin cambios de resultado.
- `Activación Docente` (Pendiente D, paso 1): **20/20**, sin cambios de resultado.
- `Auditoría de cierre` (Pendiente D, paso 3): **10/10**, sin cambios de resultado.
- Verificación directa y manual del flujo real de descubrimiento de Física (hub → "elegí tu año" → grid de unidades) contra `index.html` real: sigue funcionando exactamente igual que antes.

No se tocó ningún comportamiento de Química ni de Física — todo lo entregado en los pasos anteriores queda intacto.

---

## 6. Archivos

**NUEVOS:**
- `js/shared/mqc-biologia-flags.js`
- `js/modules/biologia10.js`
- `js/data/banco-bio10-u01.js`
- `js/units/biologia10/bio10-u01.js`

**MODIFICADOS (aditivos — nunca se tocó lógica de Química ni de Física):**
- `js/core/storage.js` — agrega `data.biologia10` y sus 3 funciones paralelas.
- `js/core/gamification.js` — agrega la recompensa de XP de la misión, la insignia `explorador-biologia` y su condición en `checkBadges()`.
- `js/modules/grade-select.js` — Biología ya tiene su propia pantalla "elegí tu año" (10.º real, 11.º como "próxima etapa").
- `js/shared/sidebar-nav.js` — el sidebar ya reconoce Biología 10.º cuando la bandera esté en `true`.
- `index.html` — agrega los `<script>` nuevos, en el mismo bloque donde ya cargan los de Física.

---

## 7. Confirmaciones explícitas

- No se tocó ningún archivo de Química ni de Física.
- No se tocó ningún archivo SQL ni nada de Supabase.
- No se tocó Pendiente A ni Pendiente B.
- Biología 11.º sigue sin iniciarse — a la espera del libro que vas a conseguir.
- Biología 10.º Unidades 2 a 9 siguen como "Próximamente" — no se inventó ningún contenido de esas unidades.
- Todo el contenido académico de BIO10-U01 se derivó y parafraseó del libro fuente real que subiste — nunca copiado textualmente, nunca inventado.
- Biología sigue **oculta** para cualquier estudiante real hasta tu revisión y autorización explícita de publicarla (`?biologia10preview=1` para revisarla vos mismo).
- No se le dio ningún acceso ni bypass nuevo a nadie — la guarda de escritura docente de Pendiente D se extendió a Biología desde el primer archivo escrito, no como un parche posterior.
