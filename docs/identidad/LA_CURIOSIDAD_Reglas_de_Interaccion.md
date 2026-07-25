# LA CURIOSIDAD — Reglas de Interacción con el Progreso del Estudiante
## Especificación oficial de disparo de estados
**Versión 1.0 · EOP-028 · Complementa a `LA_CURIOSIDAD_Character_Design_Document.md`**

> Este documento responde una pregunta específica: **¿bajo qué condición exacta se dispara cada uno de los 10 estados oficiales?** No redefine identidad ni comportamiento visual — solo formaliza el "cuándo" en términos de progreso real del estudiante (XP, nivel, unidades, exámenes).

---

## 1. Principio general (ya establecido, se ratifica aquí)

Un estado solo se dispara si existe una condición de progreso real y verificable. Nunca por temporizador, nunca por inactividad simple, nunca "porque sí". Cada fila de la tabla siguiente es una **condición necesaria y suficiente** — si no se cumple exactamente, el estado correspondiente no se dispara.

## 2. Tabla de disparo por estado

| Estado | Condición exacta de disparo | Cooldown / frecuencia máxima |
|---|---|---|
| **Reposo** | Estado por defecto — se activa automáticamente cuando ningún otro estado está vigente | No aplica (es la ausencia de evento) |
| **Bienvenida** | Al completarse el inicio de sesión (perfil seleccionado o invitado confirmado) | Una vez por sesión, nunca más de una vez cada 30 minutos si hay múltiples reingresos |
| **Motivación** | Un estudiante marca un tema de teoría como leído, **o** confirma una predicción en un simulador (`topic-read`, `simulator-commit`) | Máximo 1 vez cada 90 segundos — si el estudiante lee varios temas seguidos rápido, no se dispara en cada uno, solo en el primero de esa ráfaga |
| **Desafío** | Al iniciar un examen de unidad, **o** al abrir la primera estación de una nueva unidad no visitada antes | Una vez por intento de examen; una vez por unidad nueva (no se repite si el estudiante ya visitó esa unidad) |
| **Celebración** | Examen aprobado (nota ≥ 70%), **o** juego de unidad superado (`game-won`) | Una vez por resultado — no se repite si el estudiante repite el mismo examen/juego y vuelve a aprobar, salvo que haya pasado al menos 1 día |
| **Nivel** | Subida de nivel real en el Sistema XP (`leveledUp === true`), **o** desbloqueo de la medalla `course-complete` (9/9 unidades) | Exactamente una vez por subida de nivel — nunca se dispara por XP acumulado sin cruce de umbral de nivel |
| **Ayuda** | Examen reprobado (nota < 70%), **o** una respuesta incorrecta marcada como "error importante" (no cualquier error — ver §4) | Máximo 1 vez por intento fallido; nunca más de 1 vez cada 3 minutos, para no sentirse como una alarma repetitiva |
| **Pensando** | Un cálculo o carga interna toma más de ~600ms en resolverse (ej. render pesado de un simulador) | Solo mientras dura la espera real — desaparece apenas el contenido está listo |
| **Esperando** | El estudiante permanece más de un umbral de tiempo prolongado sin interactuar dentro de una pantalla activa (ej. examen abierto, estación del Integrador abierta) | Se activa una sola vez por período de inactividad; se cancela apenas el estudiante vuelve a interactuar |
| **Despedida** | Cierre explícito de sesión, **o** cierre de una experiencia larga completa (ej. último tema de la última unidad, o última estación del Proyecto Integrador) | Una vez por cierre — nunca se dispara "a mitad" de una experiencia |

## 3. Relación específica con el Sistema XP y Niveles

- **Ganar XP por sí solo NO dispara nada especial.** Solo el evento que originó esa XP importa (leer un tema → Motivación; aprobar examen → Celebración). La Curiosidad nunca reacciona al número de XP en sí, sino al logro que lo generó.
- **Cruzar un umbral de nivel es la única condición que dispara Nivel.** Si un estudiante gana suficiente XP para subir 2 niveles de una sola vez (caso raro, ej. un examen perfecto), el estado Nivel se dispara **una sola vez**, no dos — la Curiosidad reconoce el resultado final, no cada paso intermedio.
- **Las medallas/insignias siguen la misma lógica que Celebración**, excepto la medalla de cierre de curso completo (`course-complete`), que usa el estado Nivel por ser el mayor reconocimiento posible en la plataforma.

## 4. Relación específica con la interacción de Unidades

- **Teoría:** cada tema marcado como leído es un candidato a Motivación, sujeto al cooldown de 90 segundos (§2) — para que leer 5 temas seguidos no dispare 5 apariciones consecutivas.
- **Simuladores:** el compromiso con una predicción (antes de ver el resultado real) dispara Motivación — el resultado del simulador en sí (acertar o no) **no dispara nada**, porque no es un logro evaluativo, es parte del método de aprendizaje.
- **Juego:** superar un nivel del juego de la unidad dispara Celebración; no superarlo no dispara Ayuda (perder en el juego es parte normal de jugar, no un "error importante" — ver distinción en §5).
- **Examen:** es el único punto de interacción que puede disparar tanto Celebración como Ayuda, según el resultado — nunca ambos en el mismo intento.
- **Proyecto Integrador:** cada estación completada sigue la lógica de Motivación; la finalización completa del proyecto dispara Nivel (no Celebración), por ser el cierre de la culminación del curso.

## 5. Qué distingue un "error importante" de un error normal (relevante para Ayuda)

No todo error dispara Ayuda — sería contrario a "nunca invade, nunca interrumpe". Se considera error importante únicamente:
- Reprobar un examen completo (no fallar una sola pregunta dentro de él).
- Fallar la misma pregunta o el mismo concepto **más de una vez consecutiva** dentro del mismo intento.

Fallar una pregunta suelta dentro de un examen que en general va bien **no** dispara Ayuda — el examen ya da su propia retroalimentación inmediata por pregunta (sistema `Insights`/errores frecuentes, ya existente). La Curiosidad se reserva para el patrón, no para el evento aislado.

## 6. Reglas de prioridad cuando compiten varios eventos

1. **Un solo estado a la vez** (ya establecido en las reglas de uso generales). Si dos condiciones se cumplen en el mismo instante, se resuelve por esta jerarquía, de mayor a menor precedencia: `Nivel > Celebración > Desafío > Ayuda > Bienvenida > Motivación > Pensando > Esperando > Despedida > Reposo`.
2. Un estado de mayor jerarquía en curso **nunca se interrumpe** por uno de menor jerarquía que ocurra mientras tanto — el nuevo evento se descarta silenciosamente (no se encola, no se muestra después).
3. `Despedida` es la única excepción a la jerarquía: si el estudiante cierra sesión mientras cualquier otro estado está en curso, `Despedida` siempre lo reemplaza de inmediato.

## 7. Qué NO dispara ningún estado (casos límite explícitos)

- Navegar entre secciones del menú (Inicio, Tabla Periódica, Mi Progreso) sin ninguna acción de progreso real.
- Abrir y cerrar el panel de Configuración/Accesibilidad.
- Cambiar de perfil o consultar la Bitácora sin que eso represente, en sí mismo, un logro.
- Cualquier interacción repetida dentro del mismo cooldown ya activo de su estado correspondiente (§2).

---

*Este documento se puede ampliar con nuevas condiciones de disparo únicamente si se agregan a esta tabla de forma explícita — no debe inferirse ni improvisarse una condición nueva durante la implementación técnica.*
