# LA CURIOSIDAD
## Character Design Document Oficial — MásQueCiencia
**Versión 1.0 · EOP-025 · Estado: ✅ APROBADO Y CONGELADO**

> Este documento define, para siempre, quién es "La Curiosidad". Una vez aprobado, se convierte en el estándar oficial contra el cual se mide cualquier ilustración, animación, sonido o implementación futura del personaje. Ninguna decisión posterior puede contradecirlo sin abrir explícitamente un nuevo sprint de identidad.

---

## 0. Resumen ejecutivo

"La Curiosidad" es el compañero oficial de MásQueCiencia: una pequeña entidad de energía que acompaña al estudiante en su recorrido científico. No es una mascota en el sentido tradicional — es la personificación mínima de un instinto humano: el impulso de preguntar. Su objetivo no es entretener. Es hacer que el estudiante **sienta** que la curiosidad, esa sensación previa a comprender algo, tiene una presencia real dentro de la plataforma.

Debe alcanzar el mismo nivel de reconocimiento que Duo (Duolingo), Octocat (GitHub), Clyde (Discord) o Bugdroid (Android) — pero con un lenguaje propio: elegante, científico, minimalista, nunca infantil.

---

## 1. Historia del personaje

### 1.1 Origen

La Curiosidad no fue creada. **Apareció** — de la misma manera en que aparece una idea. La leyenda interna de MQC (no necesariamente narrada al estudiante de forma literal, pero que orienta cada decisión de diseño) es la siguiente:

> Cada vez que alguien, en cualquier lugar del mundo, se hace una pregunta que realmente quiere responder, se libera una partícula diminuta de energía. La mayoría se disipan. Pero algunas, las que nacen de preguntas hechas con verdadera curiosidad, permanecen. Con el tiempo, una de esas partículas aprendió a reconocer cuándo alguien más estaba a punto de sentir lo mismo que le dio origen: ese instante justo antes de comprender algo nuevo. Desde entonces, viaja de estudiante en estudiante, apareciendo únicamente en esos instantes.

Esta historia no se le explica al estudiante como un cuento infantil ni se ilustra literalmente. Vive como **trasfondo de diseño**: cada regla de comportamiento de este documento existe porque protege esta idea de origen.

### 1.2 Por qué existe

La Curiosidad existe para resolver un problema específico: la mayoría de las plataformas educativas se sienten como sistemas — entregan contenido, miden progreso, pero nunca **acompañan**. La Curiosidad es la respuesta de MQC a eso. No enseña. No corrige. No evalúa. Simplemente **está presente** en los instantes donde un acompañamiento silencioso vale más que una explicación.

### 1.3 Lo que decididamente NO es

Este punto ya fue explorado y decidido en sprints anteriores, y se ratifica aquí como parte permanente de su identidad:

- No es un átomo.
- No es una molécula.
- No es una persona.
- No es un profesor.
- No es una inteligencia artificial conversacional.
- No es un robot.
- No tiene edad ni género.
- No tiene nombre propio distinto de "La Curiosidad" — nunca se le renombra, ni se le da un apodo cariñoso adicional.

---

## 2. Misión Oficial

> **La Curiosidad existe para acompañar al estudiante en el instante exacto en que el conocimiento comienza a construirse. No busca enseñar por sí misma; busca mantener vivo el deseo de descubrir. Cada una de sus apariciones debe acercar al estudiante un poco más a disfrutar aprender ciencia.**

Esta misión es la prueba de fuego para cualquier decisión futura sobre el personaje: si una implementación, animación, sonido o aparición no acerca al estudiante a disfrutar aprender ciencia, no pertenece a La Curiosidad, sin importar cuán vistosa o técnicamente interesante sea.

---

## 3. Filosofía

La Curiosidad representa **el instante**, no un personaje. Específicamente: el instante que ocurre entre no saber algo y empezar a intuirlo. Ese instante es breve, silencioso, y ligeramente eléctrico — así debe sentirse el personaje.

Tres principios filosóficos gobiernan cada decisión posterior de este documento:

1. **Aparece por significado, no por rutina.** Si su aparición se vuelve predecible o decorativa, deja de representar curiosidad y pasa a representar una notificación. Esto es una falla de identidad, no un detalle menor.
2. **Nunca explica — evoca.** La Curiosidad no tiene texto largo, no da instrucciones, no sustituye al Mentor MQC. Si un mensaje necesita más de una frase corta, ese mensaje no le pertenece a ella.
3. **Es memorable por contención, no por espectáculo.** Su impacto viene de su moderación. Un estudiante debe recordarla porque *aparece pocas veces y siempre importa*, no porque hace algo llamativo.

---

## 4. Personalidad

| Rasgo | Cómo se manifiesta | Cómo NO se manifiesta |
|---|---|---|
| **Curiosidad** | Se inclina levemente hacia lo que el estudiante está mirando; su energía se reordena con interés | Nunca "husmea" ni invita a hacer clic en algo que no pidió el estudiante |
| **Inteligencia** | Reacciona con precisión al momento exacto (un logro, un error real, un cambio de nivel) | Nunca comenta sobre cosas triviales o irrelevantes |
| **Optimismo** | Su energía se mantiene estable incluso en el estado de apoyo/error — nunca se apaga del todo | Nunca transmite decepción, ni siquiera sutil |
| **Descubrimiento** | Su comportamiento default es de leve exploración (deriva, orbita) | Nunca se queda perfectamente estática por mucho tiempo |
| **Confianza** | Su presencia es serena, no ansiosa — no "pide atención" | Nunca parpadea con urgencia, nunca vibra para llamar la atención |
| **Acompañamiento** | Se posiciona cerca pero nunca encima del contenido | Nunca se coloca entre el estudiante y lo que está aprendiendo |

**Tono emocional general:** calma con un trasfondo de asombro. Si tuviera que describirse en una palabra: *serena* antes que *alegre*; *interesada* antes que *emocionada*.

**Analogía de referencia (no visual, de comportamiento):** cómo se movería una luciérnaga inteligente que entiende exactamente cuándo acercarse y cuándo alejarse — nunca un cachorro que reclama atención constante.

---

## 5. Lenguaje visual (principios — no la ilustración final)

Esto NO es una especificación de la ilustración definitiva (eso pertenece a un sprint posterior con el activo oficial). Son las reglas que cualquier ilustración futura, propia o de terceros, debe respetar para seguir siendo "La Curiosidad":

1. **Sin rostro figurativo tradicional.** Ya se decidió y se ratifica: nada de ojos-caricatura ni boca literal. La expresión vive en la luz, no en un rostro.
2. **Forma esférica de energía como núcleo no negociable.** El núcleo (un punto/esfera de luz) es su firma más importante — es lo primero que debe reconocerse en cualquier tamaño, incluso a 16px.
3. **Sin cuerpo, sin extremidades, sin ropa, sin accesorios.** Ningún elemento figurativo adicional, nunca.
4. **La identidad vive en el movimiento tanto como en la forma.** Una imagen estática de La Curiosidad es solo la mitad de su identidad — nunca se juzga su diseño solo por una captura fija.
5. **Paleta:** usa el lenguaje cromático ya establecido en la Identidad Visual v2.0 de MQC (cian, violeta, verde, oro/XP, rosa suave para apoyo) — nunca colores ajenos a esa paleta. El color comunica el estado; la forma nunca cambia entre estados.
6. **Nunca cartoon, nunca mascota escolar, nunca ícono de videojuego.** La referencia estética correcta es visualización científica real (tipo NASA/Kurzgesagt/planetario), no ilustración infantil.
7. **Escalable sin perder identidad:** debe funcionar igual de bien como ícono de 16px que como elemento protagonista de una celebración a pantalla parcial.

---

## 6. Lenguaje de movimiento

El movimiento es el 50% de su identidad. Seis primitivas de movimiento, válidas para cualquier implementación futura:

1. **Respiración** — un ciclo lentísimo de expansión/contracción del núcleo. Es su estado de "estar viva" cuando no pasa nada más. Nunca se detiene del todo, salvo en Despedida.
2. **Flotación** — una deriva vertical/lateral mínima, nunca mecánica, nunca en línea recta perfecta. Sugiere ingravidez, no un rebote de videojuego.
3. **Órbitas** — anillos de energía que la rodean, girando a distintas velocidades. La velocidad orbital es su forma de comunicar tensión/calma sin necesitar palabras.
4. **Glow (halo)** — la intensidad y el tamaño del halo comunican magnitud emocional. Un logro pequeño: glow leve. Un hito grande (fin de curso, insignia mayor): halo expandido, nunca antes visto en otro momento.
5. **Partículas** — se desprenden ocasionalmente, nunca en bucle obvio, nunca en patrón simétrico. Comunican que hay energía en constante intercambio, no un efecto decorativo fijo.
6. **Aproximación / alejamiento** — la única vez que cambia de tamaño/cercanía de forma intencional es para comunicar apoyo (se acerca, más grande, más cálida) o despedida (se aleja, se encoge, se atenúa).

**Regla de oro del movimiento:** cualquier animación nueva debe poder explicarse combinando únicamente estas seis primitivas. Si una animación futura necesita inventar un séptimo tipo de movimiento, debe volver a este documento para revisión, no implementarse directamente.

---

## 7. Lenguaje sonoro

Su sonido es opcional (el estudiante puede desactivarlo) y nunca debe sentirse como un videojuego, una app infantil, ni una notificación de sistema operativo.

**Principios:**

1. **Naturaleza tímbrica:** cristal, energía, armónicos, sintetizadores suaves. Nunca percusión, nunca 8-bit, nunca voces ni efectos "cómicos".
2. **Duración:** siempre breve — entre 90 milisegundos y menos de un segundo. Un sonido de La Curiosidad nunca se sostiene ni se repite en bucle.
3. **Envolvente:** ataque suave, no un golpe seco. Debe sentirse como un destello sonoro, no como una alerta.
4. **Un sonido, una emoción.** Cada estado emocional relevante tiene, como máximo, una identidad sonora propia — nunca varios sonidos compitiendo por significar lo mismo.
5. **Jerarquía de intensidad:** los estados de mayor peso (Nivel, Celebración) pueden tener una textura sonora ligeramente más rica (más armónicos superpuestos); los estados menores (Motivación, Pensando) deben ser casi imperceptibles.
6. **El silencio también comunica.** En los estados Reposo, Pensando y Esperando, el silencio es la opción por defecto más honesta — el sonido se reserva para momentos que realmente lo ameritan.

*(Los efectos sonoros finales, frecuencias exactas y archivos de audio pertenecen a un sprint de implementación posterior. Este documento define únicamente el lenguaje.)*

---

## 8. Estados oficiales

Estos 10 estados son los únicos oficiales. Cualquier estado adicional requiere una revisión formal de este documento antes de crearse.

| # | Estado | Qué comunica | Cuándo aparece |
|---|---|---|---|
| 1 | **Reposo** | Su identidad base — presente pero no protagonista | Momentos sin evento relevante en curso |
| 2 | **Bienvenida** | "Qué bueno que volviste" | Al iniciar sesión |
| 3 | **Motivación** | Un pequeño empujón de ánimo | Progreso incremental genuino (ej. un logro menor) |
| 4 | **Celebración** | Alegría contenida por un logro real | Aprobar un examen, completar un reto |
| 5 | **Nivel** | El reconocimiento más alto disponible | Subida de nivel, hito mayor del curso |
| 6 | **Desafío** | Atención, algo interesante requiere esfuerzo | Inicio de un reto o evaluación exigente |
| 7 | **Ayuda** | Cercanía y calma, nunca lástima | Un error importante o un momento de frustración genuina |
| 8 | **Pensando** | Está procesando junto al estudiante, no reacciona todavía | Instantes de espera activa (ej. mientras se carga un resultado) |
| 9 | **Esperando** | Presencia paciente, sin exigir acción | El estudiante se detiene o se aleja del flujo principal |
| 10 | **Despedida** | Un cierre suave, nunca abrupto | Fin de sesión o cierre de una experiencia larga (ej. Proyecto Integrador) |

**Nota de reconciliación técnica:** el componente `Photon.js` construido en un sprint anterior ya implementa una versión preliminar de este sistema de estados, con nombres ligeramente distintos (`felicitacion`, `apoyo`). Cuando se retome el trabajo técnico, esos nombres deben alinearse a esta lista oficial (`felicitacion`→`celebracion`, `apoyo`→`ayuda`), y deben incorporarse los tres estados nuevos que antes no existían: `pensando`, `esperando`, `despedida`. Este documento tiene prioridad sobre la nomenclatura técnica previa.

No se diseñan aquí expresiones exageradas para ningún estado — cada uno se distingue por brillo, velocidad, proximidad y color, nunca por gestos dramáticos.

---

## 9. Reglas de uso

1. Aparece únicamente en los 10 estados oficiales, nunca en un estado inventado sobre la marcha.
2. Aparece únicamente cuando el evento que la origina es real y significativo para el estudiante (no por temporizador, no "para que no se sienta sola la pantalla").
3. Se posiciona siempre en un espacio propio, nunca superpuesta a texto, botones o contenido activo.
4. Su duración en pantalla es breve por defecto; vuelve a Reposo o desaparece salvo que el contexto pida lo contrario (ej. Ayuda puede sostenerse mientras dura la dificultad).
5. Un solo estado a la vez. Nunca se superponen dos estados ni se interrumpe una animación de estado a mitad de camino por otra de menor jerarquía.
6. Su sonido, si está activado, respeta siempre el modo de sonido elegido por el estudiante (silencio/suave/inmersivo).
7. Es coherente en todas las superficies de la plataforma — la misma entidad en el portal de entrada, en una unidad, en el Proyecto Integrador o en la Bitácora.

## 10. Reglas de NO uso

1. Nunca se usa como elemento decorativo permanente (no vive "flotando siempre" en una esquina sin propósito).
2. Nunca bloquea, cubre ni compite visualmente con un botón, un campo de texto o una pregunta de examen.
3. Nunca interrumpe una acción en curso del estudiante (no aparece a mitad de que el estudiante esté escribiendo o resolviendo algo).
4. Nunca se usa con fines publicitarios, promocionales o de urgencia artificial ("¡No te lo pierdas!").
5. Nunca adopta un rostro, un cuerpo, ropa o accesorios en ninguna implementación, por más que una campaña o temporada especial lo sugiera.
6. Nunca habla en primera persona con texto largo — no sustituye al Mentor MQC ni a ningún sistema de explicación.
7. Nunca se anima de forma brusca, rápida o "graciosa" — ninguna implementación puede introducir squash-and-stretch cartoonesco, rebotes exagerados ni efectos tipo videojuego.
8. Nunca se le da un nombre alternativo, apodo o personalidad regional/local distinta a la definida aquí.

## 11. Integración dentro de MQC

La Curiosidad no es un sistema aislado — su razón de ser depende de los sistemas que ya existen en MQC:

- **Sistema XP / Gamification:** le da sus motivos más frecuentes de aparición (Motivación, Celebración, Nivel).
- **Mentor MQC:** es un sistema distinto y complementario. El Mentor explica; La Curiosidad acompaña. Nunca deben fusionarse en una sola entidad.
- **Bitácora Científica:** puede aparecer en Despedida al cerrar una sesión larga, reforzando que lo recorrido quedó guardado.
- **Proyecto Integrador Final:** es el lugar donde más justificado está su estado de Nivel/Celebración al final, dado que representa el cierre del recorrido completo del curso.
- **Perfiles Locales:** aparece en Bienvenida al reconocer a un estudiante que regresa — nunca en la lógica de creación/administración de perfiles en sí (eso pertenece al Portal de Entrada, ya congelado).
- **Portal de Entrada (ya congelado, EOP-024):** por decisión explícita de sprints anteriores, todavía no tiene protagonismo ahí. Ese impacto queda reservado para cuando se implemente técnicamente este documento.

---

## 12. Próximos pasos (fuera de alcance de este documento)

Este documento es exclusivamente de identidad. Los siguientes pasos, cuando se autoricen, son sprints separados:

1. Ilustración/activo visual definitivo (ya iniciado parcialmente con `photon-oficial.png` v0.1 — deberá revalidarse contra este documento).
2. Reconciliación de nomenclatura técnica en `photon.js` (`felicitacion→celebracion`, `apoyo→ayuda`, incorporar `pensando`/`esperando`/`despedida`).
3. Diseño sonoro final (archivos/síntesis reales por estado).
4. Activación de su protagonismo en el Portal de Entrada, si se decide en el futuro.
5. Guía de animación técnica (curvas de easing, duraciones exactas en ms) derivada de este lenguaje de movimiento.

---

## 13. Cierre

**"La Curiosidad" no es un ícono. Es la forma en que MásQueCiencia recuerda, en cada pantalla, que aprender ciencia empieza con una pregunta — no con una respuesta.**

*Una vez aprobado este documento, queda congelado como estándar de identidad oficial. Cualquier cambio posterior a la historia, filosofía, personalidad, estados oficiales o reglas de uso/no uso requiere un nuevo sprint de identidad explícito — no un ajuste técnico incidental.*
