# IMP-11-U01 — Informe de Implementación
## Química 11.º — Unidad I: El Agua
**Primera unidad real de Química 11.º, patrón oficial para las 3 restantes**

---

## 1. Estado al iniciar este sprint (hallazgo de auditoría)

Al retomar este ticket se encontró que **gran parte del contenido ya existía** en el proyecto (banco de 30 preguntas, banco PNE adaptado, el archivo completo de la unidad con 6 temas/3 simuladores/juego/examen/misión, las funciones paralelas de Storage, y la insignia "Primera Gota" con su condición de finalización real) — pero **faltaba la pieza que conecta todo con la interfaz real**: `js/modules/grade11.js` seguía siendo la versión de la Fase 1 Multigrado, que trataba a **todas** las unidades de 11.º como "En desarrollo", sin ninguna rama para mostrar una unidad activa con pestañas. Tampoco estaban registrados los 3 scripts nuevos en `index.html`. Es decir: el contenido existía, pero **era inalcanzable** para un estudiante real — exactamente el tipo de brecha que el punto 15 del ticket ("Auditar antes de programar") pedía prevenir.

Este informe documenta el trabajo de **este sprint**, que consistió en: auditar una unidad real de décimo (`unit-02.js`) para extraer el patrón verdadero, reconstruir `grade11.js` con soporte real de pestañas para unidades activas, registrar los scripts faltantes, y validar exhaustivamente todo el conjunto con pruebas reales de código.

## 2. Arquitectura técnica (auditada contra `unit-02.js` real, según pedía el punto 15)

| Patrón de décimo (auditado) | Equivalente real en Unidad I de 11.º |
|---|---|
| `window.UNIT_PLUGINS['unit-0X:tab']` | `window.UNIT_PLUGINS['g11-u01:tab']` — mismo mecanismo, mismo namespace de objeto |
| `data.units[unitId]` / `Storage.updateUnit()` | `data.grade11[unitId]` / `Storage.updateGrade11Unit()` — **funciones paralelas nuevas**, nunca se generalizaron las de décimo (regla explícita: "no reorganices Química 10.º") |
| `UNIDADES_DATA` | `GRADE11_UNIDADES_DATA` |
| `PNEBank.present(unitId, q)` + `pne:` en `QI.registerUnit()` | Idéntico mecanismo — se verificó explícitamente que la clave `pne:` esté presente (un bug real de este tipo ya había ocurrido antes en la Unidad I de décimo) |
| 4 pestañas (teoría/simuladores/juego/examen) | **5 pestañas** — se agregó "misión" (🔎), ya que 11.º cierra cada unidad con una misión corta en vez de un módulo de Proyecto Integrador aparte (ver APO §7) |

**Ninguna clase base nueva fue inventada.** Se reutilizó exactamente el mismo mecanismo de registro de plugins, con un namespace de datos paralelo para no arriesgar nada de Química 10.º.

## 3. Cobertura pedagógica (Indicadores oficiales del planeamiento)

| Indicador oficial | Dónde se cubre |
|---|---|
| 1. Importancia del agua y de qué está conformada | Tema 1 (El agua y la vida) + Tema 2 (Así está construida H₂O) |
| 2. Concepto de polaridad mediante solubilidad | Tema 3 (Por qué el agua es polar) + Tema 5 (¿Qué se disuelve en agua?) + Simulador 3 |
| 3. Diferencia enlace químico vs. fuerza intermolecular | Tema 4 + Simulador 2 (el simulador principal, según pedía el ticket) |
| 4. Reconoce sustancias polares y no polares | Simulador 3 + Juego "Guardianes de la Cuenca" + Examen |

Los contenidos complementarios (cohesión, adhesión, tensión superficial, capilaridad, calor específico) aparecen únicamente como contexto dentro de los temas centrales, nunca como objetivos evaluativos aparte — no se generó ninguna pregunta de examen sobre ellos de forma aislada.

## 4. Contenido construido

- **6 temas de teoría**, cada uno con explicación, ejemplo cotidiano, conexión con el caso del Río Pacuare, y reacción de Photon.
- **3 simuladores reales** (interactivos, con decisión del estudiante — ninguno es una animación automática): Arquitectura de H₂O, Dentro y entre moléculas (el principal), Laboratorio de solubilidad.
- **1 juego** ("Guardianes de la Cuenca") con 8 muestras que se mezclan aleatoriamente en cada ronda (sin repetición de orden inmediata).
- **Banco de 30 preguntas** (`js/data/grade11/preguntas-g11-u01.js`), distribuidas en 4 categorías, todas superando el mínimo exigido por el ticket (6/9/8/7 reales vs. 4/6/5/5 mínimos). Cada intento selecciona 20, balanceadas por categoría.
- **Banco PNE adaptado** (`js/data/grade11/banco-pne-g11-u01.js`) con cobertura 30/30 — verificado explícitamente, no solo asumido.
- **Misión de cierre** ("Informe de la primera muestra"), con protección anti-farming idéntica a la del Proyecto Integrador (HOTFIX-06): lectura fresca de Storage en cada envío, XP una sola vez, ediciones posteriores permitidas sin recompensa adicional.
- **Insignia "Primera Gota"**, con condición de finalización real (los 6 temas + los 3 simuladores + el juego jugado + examen aprobado + misión entregada) — verificado explícitamente que NO se otorga con solo una parte completa.

## 5. Lo que se construyó/completó en este sprint específicamente

1. **`js/modules/grade11.js` — reescrito por completo.** La versión anterior no distinguía entre unidades activas y en desarrollo. La nueva versión agrega el camino de pestañas reales para `status:'active'` (hoy solo `g11-u01`), preservando exactamente el comportamiento de tarjeta "en desarrollo" para `g11-u02/03/04`.
2. **`index.html`** — se registraron los 3 scripts que existían en el proyecto pero nunca se habían conectado (`preguntas-g11-u01.js`, `banco-pne-g11-u01.js`, `js/units/grade11/g11-u01.js`).

## 6. Photon y sonido

Se verificó por código que únicamente se usan estados ya existentes: `bienvenida`, `motivación` (vía `topic-read`), `desafío` (implícito al iniciar simuladores/examen, mismo patrón que décimo), `ayuda`, `celebración` (`exam-passed`), y `course-complete` (reutilizado, no un estado nuevo, para la finalización de la misión). No se creó ningún sonido nuevo — se reutiliza `PhotonSound` a través del mismo `Photon.react()` ya integrado desde HOTFIX-04.

## 7. Migración y compatibilidad — verificado explícitamente

Se simuló un perfil "antiguo" (creado antes de esta fase, sin `data.grade11` en absoluto) y se confirmó que:
- Todo su progreso de Química 10.º permaneció intacto.
- `data.grade11` se rellenó automáticamente vía el mismo mecanismo de *merge* profundo de `Storage.load()` ya usado en toda la Fase Multigrado — no se necesitó ninguna función de migración nueva.

## 8. Pruebas ejecutadas — 18/18 en PASS

| # | Prueba | Resultado |
|---|---|---|
| 1 | Perfil antiguo (sin `data.grade11`) conserva todos sus datos tras el merge | ✅ |
| 2 | La Unidad I aparece solo dentro de Química 11.º (bloqueada sin desbloqueo) | ✅ |
| 3 | La tarjeta deja de mostrar "En desarrollo" solo para la Unidad I (las otras 3 siguen igual) | ✅ |
| 4 | Los 6 temas de teoría renderizan sin excepción | ✅ |
| 5 | Los 3 simuladores están listados | ✅ |
| 6 | El juego genera rondas y tiene botón de inicio | ✅ |
| 7 | El examen selecciona 20/30, balanceado (mínimos reales superados) | ✅ |
| 8 | No hay preguntas duplicadas en el banco | ✅ |
| 9 | El modo simplificado usa el banco adaptado (cobertura 30/30 confirmada) | ✅ |
| 10 | La lectura por voz no lanza excepción | ✅ |
| 11-12 | La misión otorga recompensa una sola vez (protección anti-farming verificada con 2 entregas seguidas) | ✅ |
| 13 | La insignia NO se otorga con la misión sola | ✅ |
| 13b | La insignia SÍ se otorga al completar realmente todo | ✅ |
| 14 | El progreso de décimo no cambió | ✅ |
| 15 | El progreso de 11.º se calcula por separado | ✅ |
| 16 | Exportar/importar conserva la Unidad I (misión + insignia) | ✅ |
| 17 | No hay preguntas de cálculo de concentración (fuera de alcance de esta unidad) | ✅ |
| 18 | Sin errores de consola reales | ✅ |

**Nota de proceso, por transparencia:** el primer intento de esta batería falló casi por completo — no por el código real, sino porque mi arnés de prueba simulaba clics a través de la grilla de tarjetas, y mi simulador de DOM no soporta selectores de atributo (`[data-action="..."]`) sobre elementos sin `id`, una limitación de la simulación, no del producto. Se corrigió probando directamente las funciones ya registradas en `UNIT_PLUGINS` (el mismo patrón, ya probado en producción real para las 9 unidades de décimo desde hace muchos sprints) antes de confiar en los resultados.

Verificación estática adicional: `node --check` limpio en 65/65 archivos; balance de HTML confirmado; verificación visual de la tarjeta con `wkhtmltoimage` confirmando altura uniforme junto a las tarjetas "en desarrollo".

## 9. Escritorio, Android, iPhone/Safari

No fue posible probar en un dispositivo Safari/iPhone real desde este entorno (mismo límite ya documentado en hotfixes anteriores de este proyecto). Lo que sí se verificó por código: la Unidad I reutiliza exactamente las mismas clases (`.unit-card`, `.unit-detail-tabs`, `.tab-btn`, `.coming-soon-panel`) ya usadas por las 9 unidades de décimo, que **ya fueron confirmadas funcionando** en los 3 entornos en sprints anteriores — no se introdujo ningún patrón de CSS/layout nuevo que pudiera comportarse distinto en Safari.

## 10. Declaración final

**"Unidad I — El Agua integrada, validada y lista para publicación gradual en MásQueCiencia."**
