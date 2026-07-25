# SAT PROTOCOL — MásQueCiencia Beta
## Student Acceptance Test · Protocolo Oficial de Validación
**Versión 1.0 · EOP-033**

> Este documento define el protocolo oficial para comprobar que un estudiante puede usar MásQueCiencia de forma intuitiva, motivadora y sin errores, antes de su liberación a usuarios reales (Beta). No modifica el producto — solo lo evalúa.

---

## 0. Cómo usar este protocolo

1. Reclutar 3 tipos de participantes (Fase 1).
2. Sentar a cada participante frente a MQC y guiarlo por los 20 escenarios (Fase 2), registrando en `SAT_CHECKLIST.docx` mientras ocurre la sesión.
3. Al finalizar los 20 escenarios, entregar `SAT_STUDENT_FORM.docx` (perfiles A/B) o `SAT_TEACHER_FORM.docx` (perfil C).
4. Volcar todos los datos numéricos en `SAT_RESULTS_TEMPLATE.xlsx`.
5. Comparar el resultado agregado contra los umbrales de la Fase 8.
6. Redactar `SAT_SUMMARY_REPORT.md` con la decisión final.

**Materiales necesarios por sesión:** un dispositivo con MQC cargado (offline, sin necesidad de conexión), cronómetro, este protocolo impreso o en pantalla del observador, `SAT_CHECKLIST.docx` impreso, el formulario final correspondiente al perfil, un espacio silencioso, 45-60 minutos por participante.

**Rol del observador:** solo observa y cronometra — nunca ayuda a menos que el participante lo pida explícitamente dos veces seguidas o lleve más de 90 segundos visiblemente perdido sin decir nada (ver Fase 3, "¿Necesitó ayuda?"). Cualquier ayuda dada se anota, nunca se oculta.

---

## 1. FASE 1 — Perfiles de los participantes

| Perfil | Descripción | Cuántos reclutar (mínimo) | Qué observar especialmente |
|---|---|---|---|
| **A — Estudiante nuevo** | Nunca ha usado MQC ni ha visto una demostración. Décimo año, cualquier nivel de habilidad con tecnología. | 4 | Primera impresión, curva de aprendizaje real, si el Portal de Entrada y el Fotón generan interés desde el primer segundo, si logra navegar sin instrucción verbal previa. |
| **B — Estudiante con uso parcial** | Ya usó MQC al menos una vez (ej. en una clase anterior), pero no ha explorado todas las secciones. | 3 | Si recuerda cómo volver a entrar, si la curva de aprendizaje mejora la segunda vez, si descubre funciones que no había visto (Bitácora, Glosario, Accesibilidad). |
| **C — Docente evaluador** | Un profesor de química (no necesariamente el autor del contenido) que evalúa la plataforma desde una mirada pedagógica, no solo de usabilidad. | 2 | Si el contenido es correcto y suficiente, si la gamificación motiva sin distraer del aprendizaje, si recomendaría la plataforma a otros colegas, calidad del Método MQC (detonante→compromiso→exploración). |

**Regla de reclutamiento:** los perfiles A y B deben cubrir un rango real de habilidad tecnológica (no reclutar solo a los estudiantes más hábiles con computadoras) — un protocolo que solo se prueba con usuarios expertos no mide nada útil.

---

## 2. FASE 2 — Escenarios de prueba (20)

Cada escenario indica: **Perfil(es)** que lo realiza, **instrucción exacta** que se le da al participante (siempre en lenguaje de tarea, nunca de ruta — ej. "encontrá dónde ver tu progreso", nunca "hacé clic en Mi Progreso"), y el **criterio de éxito**.

| # | Escenario | Perfil | Instrucción al participante | Criterio de éxito |
|---|---|---|---|---|
| 1 | Primer ingreso | A | "Abrí la plataforma y contame qué es lo primero que ves." | Describe correctamente de qué trata MQC en sus propias palabras, sin ayuda |
| 2 | Crear perfil | A | "Creá tu propio perfil para empezar a usar la plataforma." | Completa el perfil (alias, avatar) sin preguntar qué significa cada campo |
| 3 | Entrar como invitado | B | "Entrá a la plataforma sin crear un perfil todavía." | Encuentra la opción de invitado en menos de 20 segundos |
| 4 | Importar un perfil | B | Se le entrega un archivo de perfil exportado previamente: "Recuperá este perfil en la plataforma." | Completa la importación sin ayuda y confirma que reconoce los datos como suyos |
| 5 | Explorar la pantalla principal | A | "Contame qué podés hacer desde esta pantalla." | Identifica al menos 3 secciones/acciones distintas sin hacer clic todavía |
| 6 | Localizar una unidad | A, B | "Buscá la unidad sobre [tema asignado]." | Llega a la unidad correcta en menos de 30 segundos |
| 7 | Leer un tema | A, B | "Elegí un tema de teoría y leelo." | Interactúa con el detonante/compromiso del Método MQC (no solo se salta al texto) |
| 8 | Utilizar un simulador | A, B | "Probá el simulador de esta unidad." | Completa al menos una interacción del simulador sin quedar bloqueado |
| 9 | Resolver un juego | A, B | "Jugá el juego de esta unidad." | Entiende el objetivo del juego sin que se le explique |
| 10 | Presentar un examen | A, B | "Hacé el examen de esta unidad." | Completa el examen y ve su resultado |
| 11 | Obtener XP | A, B | (Observación pasiva durante 7-10) | Nota conscientemente que ganó XP (lo menciona o reacciona) |
| 12 | Subir de nivel | B | Se le asigna un perfil cercano a subir de nivel: "Segui hasta que pase algo especial." | Nota la subida de nivel y la reacción de La Curiosidad sin que se le señale |
| 13 | Obtener una insignia | B | (Observación pasiva, perfil preparado cerca de desbloquear una medalla) | Encuentra dónde ver la insignia obtenida sin ayuda |
| 14 | Revisar Mi Progreso | A, B, C | "Buscá cuánto has avanzado en total." | Llega a Mi Progreso en menos de 20 segundos |
| 15 | Consultar la Bitácora | B, C | "Buscá un resumen o historial de lo que llevás hecho." | Encuentra la Bitácora sin confundirla con Mi Progreso |
| 16 | Buscar un concepto | A, B | "Buscá información sobre [concepto asignado] sin ir a la unidad directamente." | Usa el buscador global y encuentra el resultado correcto |
| 17 | Utilizar el Glosario | A, B | "Buscá el significado de [término asignado]." | Encuentra el glosario y localiza el término en menos de 30 segundos |
| 18 | Activar Accesibilidad | C | "Activá alguna opción que ayude a alguien con dificultad visual." | Encuentra el panel de accesibilidad y activa al menos una opción |
| 19 | Exportar el progreso | B, C | "Guardá una copia de tu progreso." | Completa la exportación y entiende para qué serviría ese archivo |
| 20 | Cerrar sesión | A, B | "Terminá tu sesión de estudio por hoy." | Encuentra cómo cerrar sesión y ve la despedida de La Curiosidad |

---

## 3. FASE 3 — Criterios de evaluación por escenario

Para **cada uno** de los 20 escenarios, el observador registra (en `SAT_CHECKLIST.docx`):

1. ¿Comprendió qué debía hacer? (Sí / Con dudas / No)
2. ¿Necesitó ayuda? (No / 1 vez / 2+ veces)
3. ¿Se sintió motivado? (observar lenguaje corporal, comentarios espontáneos)
4. ¿Encontró fácilmente la función? (Sí / Tardó / No la encontró)
5. ¿La interfaz fue clara? (Sí / Parcial / No)
6. ¿Hubo confusión? (describir brevemente si la hubo)
7. ¿Hubo errores? (de la plataforma, no del usuario — anotar cualquier comportamiento inesperado)
8. ¿La Curiosidad aportó valor en este momento? (Sí / Neutro / No / No apareció)
9. ¿Los sonidos fueron adecuados? (Sí / Molestos / No los notó)
10. ¿El tiempo de respuesta fue correcto? (Sí / Lento / Con traba)

---

## 4. FASE 4 — Métricas objetivas

| Métrica | Cómo medirla | Unidad |
|---|---|---|
| Tiempo para crear perfil | Cronómetro desde "creá tu perfil" hasta perfil confirmado | segundos |
| Tiempo para encontrar una unidad | Cronómetro desde la instrucción hasta el clic correcto | segundos |
| Tiempo para iniciar un simulador | Cronómetro desde entrar a la unidad hasta la primera interacción del simulador | segundos |
| Tiempo para terminar un examen | Cronómetro desde iniciar el examen hasta ver el resultado | segundos |
| Número de errores cometidos | Conteo manual del observador durante los 20 escenarios | conteo |
| Número de veces que pidió ayuda | Conteo manual del observador durante los 20 escenarios | conteo |
| Nivel de satisfacción | Autorreporte del participante al final (formulario) | escala 1-5 |
| Nivel de motivación | Autorreporte del participante al final (formulario) | escala 1-5 |
| Facilidad de uso | Autorreporte del participante al final (formulario) | escala 1-5 |
| Comprensión de la navegación | Autorreporte del participante al final (formulario) | escala 1-5 |

Todas las métricas se registran por participante en `SAT_RESULTS_TEMPLATE.xlsx`.

---

## 5. FASE 5 — Checklist del observador

Ver `SAT_CHECKLIST.docx` — una hoja por participante, con los 20 escenarios en filas y las siguientes columnas de marca rápida:

✔ Completó la tarea · ✔ Necesitó ayuda · ✔ Se perdió · ✔ No entendió · ✔ Mostró interés · ✔ Sonrió o comentó positivamente · ✔ Se frustró · ✔ Abandonó la tarea

---

## 6. FASE 6 — Cuestionario final

Ver `SAT_STUDENT_FORM.docx` (perfiles A y B) y `SAT_TEACHER_FORM.docx` (perfil C). El cuestionario del estudiante incluye, como mínimo:

- ¿Qué fue lo que más te gustó?
- ¿Qué fue lo más difícil?
- ¿Te gustaría volver a utilizar MQC?
- ¿Qué mejorarías?
- ¿Qué parte recordás más?
- ¿Cómo describirías MQC en una frase?

---

## 7. FASE 7 — Matriz de resultados

Ver `SAT_RESULTS_TEMPLATE.xlsx`. Columnas: Participante, Perfil (A/B/C), Edad, Nivel alcanzado en MQC, Tiempos (4 columnas), Errores, Ayuda solicitada, las 4 escalas de autorreporte, Comentarios, Observaciones del evaluador, Recomendaciones.

---

## 8. FASE 8 — Criterios de aprobación para Beta

MásQueCiencia se considera **listo para Beta** cuando el promedio agregado de todos los participantes cumple:

| Criterio | Umbral |
|---|---|
| Tareas completadas sin ayuda | ≥ 90% |
| Errores críticos de la plataforma (no del usuario) | 0 |
| Motivación promedio | ≥ 4/5 |
| Comprensión de la navegación promedio | ≥ 4/5 |
| Satisfacción general promedio | ≥ 4/5 |
| Facilidad de uso promedio | ≥ 4/5 |

**Definición de "error crítico"**: cualquier comportamiento de la plataforma que impida completar un escenario (no un error de comprensión del usuario). Un error crítico detectado durante el SAT bloquea la aprobación de Beta hasta corregirse, sin importar qué tan bien salgan las demás métricas.

Si el umbral no se cumple, `SAT_SUMMARY_REPORT.md` debe indicar exactamente qué escenario(s) y qué perfil(es) fallaron, para dirigir la corrección — el SAT no vuelve a ejecutarse completo, solo se repiten los escenarios afectados tras la corrección.

---

## 9. Anexo — Logística de sesión

- Duración estimada por participante: 45-60 minutos (20 escenarios + formulario final).
- El observador nunca debe estar frente a la pantalla del participante de forma que lo intimide — sentarse ligeramente al costado, nunca detrás mirando por encima del hombro de forma evidente.
- Grabar la sesión (audio/pantalla) solo con consentimiento explícito, y nunca como sustituto de la observación en vivo.
- Ningún participante debe repetirse en el mismo día en más de una sesión completa (fatiga sesga los resultados).
