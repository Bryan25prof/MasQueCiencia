# CHANGELOG — MásQueCiencia (MQC)

## 📦 Versión actual: Beta v1.0

| Campo | Valor |
|---|---|
| **Versión** | Beta v1.0 |
| **Estado** | Validada funcionalmente (EOP-034 a EOP-038), preparada para repositorio (EOP-039) |
| **Última corrección funcional** | EOP-038 (4 hallazgos reales de navegador, corregidos) |

Reconstruido a partir de la evidencia real encontrada en el código y los informes de auditoría entregados hasta EOP-011. Donde no se pudo confirmar una fecha u orden exacto, se indica como tal.

---

### EOP-004 — Fundación del Método MQC y biblioteca gráfica
- Se define oficialmente el **Método MQC**: detonante → **"Compromiso con una respuesta"** (§4.4 — nombre oficial, no "predicción") → exploración/explicación → conexión → confrontación de errores.
- Se crea `js/shared/viz.js` (§2.3) como **biblioteca gráfica OFICIAL** de primitivas SVG, explícitamente diseñada para ser reutilizada por todas las unidades futuras (átomos hoy, moléculas/iones/reacciones después), no solo por la Unidad II.

### FASE 1.5 — Núcleo de Estandarización (QI)
- Se decide centralizar el registro de cada unidad en un único punto: `QI.registerUnit(id, manifest)`, para que glosario, referencias cruzadas, imágenes, videos y buscador se repartan automáticamente sin que cada unidad tenga que tocar los subsistemas uno por uno.
- Se agregan en esta fase: `qi.js`, `glossary.js`, `xref.js`, `search.js`, `hints.js`, `assets.js`, `media.js`, `launcher.js`, y el andamiaje de `pne.js` (accesibilidad, sin módulo avanzado todavía).

### EOP-008 — Sistema de Perfiles Locales
- Decisión: **sin login, sin backend, sin base de datos**. Hasta 10 perfiles locales + modo invitado, persistidos en `localStorage`.
- Se agrega export/import de perfil en formato JSON.
- Informe de auditoría: `INFORME_PERFILES_LOCALES_MQC.md`.

### EOP-009 — Bitácora Científica
- Se extiende `profiles.js`/`profiles-ui.js` con **reflexiones voluntarias**, cronología de actividad, y `buildBitacora()`.
- Se agrega **exportación a PDF** de la Bitácora vía ventana imprimible + `window.print()` (no se usa librería externa como jsPDF, manteniendo el proyecto 100% offline y sin dependencias).
- Informe de auditoría: `INFORME_BITACORA_CIENTIFICA_MQC.md` (59/59 tests, verificación de no-regresión en Unidades II-VII mencionada en el informe).
- **Nota de reconciliación:** este informe referencia no-regresión en unidades II-VII, pero el código de esas unidades no ha sido recibido en los respaldos entregados hasta EOP-011. Ver `MQC_MASTER_PROJECT_v1.0.md` §21.

### Etapas III y IV (nombres de entrega: `FILES3_ETAPA_III`, `filesetpaaIV`)
- Se entrega `mqc.js` (Método MQC) como módulo compartido independiente de cualquier unidad.
- Se implementa **Unidad III — Los Elementos en la Vida Cotidiana** (`unit-03.js`) con 3 simuladores, banco de 30 preguntas.
- Se implementa **Unidad IV — Enlace Químico** ("El Pacto de los Átomos") (`unit-04.js`), estableciendo el patrón definitivo de unidad autocontenida (simuladores, juego y examen embebidos, sin depender de agregadores globales).
- Se define `unidades.js` con metadata completa de las **9 unidades**, incluyendo unidades VIII y IX aunque su código todavía no existiera — decisión que permitió construir la Unidad VIII directamente sobre metadata ya definida.

### EOP-010 (implícita) — Sesión de reconstrucción de contexto y Experience VIII
- Tras pérdida de continuidad entre sesiones de chat, se realiza un proceso de consolidación de todos los ZIPs y documentos de respaldo disponibles para reconstruir el estado real del proyecto (contrastando documentos de planificación contra código real).
- Se confirma que el patrón de unidad autocontenida (sin `simulator-base.js`/`game-base.js`/agregadores) es el real y funcional; se decide **no** introducir las clases `UnitBase`/`SimulatorBase`/`GameBase` del documento de planificación original, ya que el código real nunca las adoptó y funciona correctamente sin ellas.
- Se construye **Experience VIII — Ácidos y Bases** ("El Equilibrio Invisible"): `unit-08.js`, `preguntas-u08.js` (30 preguntas), `banco-pne-u08.js`, siguiendo fielmente el patrón de `unit-04.js`.

### EOP-011 — Consolidación oficial del proyecto (este documento)
- Se detiene el desarrollo de nuevas Experiences para producir documentación maestra reconstruible por cualquier IA sin depender del historial del chat.
- Se generan: `MQC_MASTER_PROJECT_v1.0.md`, `README.md`, `CHANGELOG.md`, `PROJECT_CONTEXT_MQC.md`.
- Se documenta explícitamente la brecha entre lo planeado (Documento Maestro original: `chem.js`, `mentor.js`, `insights.js`, `pne-bank.js`, agregadores `simulators.js`/`games.js`/`exam.js`, `lab.js`, `profe-bryan.js`, unidades II/V/VI/VII/IX) y lo que existe hoy como código verificado.

### EOP-012 — Reconciliación con el proyecto completo real
- Se reciben `Quimica_Interactiva_10_COMPLETO.zip` (67 archivos, proyecto completo) y `MQC_Informes_y_Mockups.zip` (informes de auditoría de todas las unidades + recomendaciones pre-Experience VIII).
- **Se corrige una sobre-estimación de brechas** documentada en EOP-011: las Unidades II, V, VI y VII **sí existen y están implementadas** (no eran solo planificación). Los sistemas `mentor.js`, `insights.js`, `chem.js` (MQCChem) y `pne-bank.js` **sí existen e implementan la API completa** que las unidades ya consumían de forma defensiva.
- **Se confirma como decisión de arquitectura, no como brecha:** `js/modules/simulators.js`, `games.js`, `exam.js` y `lab.js` son "slots reservados no-op" — el propio código lo documenta explícitamente. No forman parte del alcance pendiente.
- **Se corrige un error real en `unit-08.js`:** el color de acento usado (`#FF5722`) no correspondía al color oficial de la Unidad VIII en `unidades.js` (`#2BC4A0`). Corregido.
- **Se corrige una violación de convención en `unit-08.js`:** el cálculo de pH/pOH estaba reimplementado localmente en vez de vivir en `MQCChem`. Se amplía `chem.js` de forma aditiva (`pH`, `pOH`, `phFromPoh`, `pohFromPh`, `hFromPH`, `ohFromPOH`, `classifyPH`, `esAcido`, `esBase`, `Kw`, `INDICADORES`) y `unit-08.js` se refactoriza para consumir esas funciones, con fallback local solo por seguridad defensiva.
- Se actualiza `js/data/unidades.js`: la Unidad VIII pasa de `status:'soon'` a `status:'active'` en sus 3 simuladores y su juego, se agrega el bloque `experiencia` (nombre, detonante, misión, secuencia antes/después) siguiendo el patrón exacto de la Unidad VII.
- Se integran `unit-08.js`, `preguntas-u08.js` y `banco-pne-u08.js` al `index.html` real del proyecto completo (no a una copia parcial).
- Se identifica la existencia de un **arnés de pruebas formal** (`qa-harness.js`, `qa-scenarios-uN.js`) mencionado en `RECOMENDACIONES_EXPERIENCE_08.md`, pendiente de recibir para completar la reconstrucción de contexto.
- Se regenera `MQC_MASTER_PROJECT_v1.0.md` (documento v1.1) con el estado real corregido.

### EOP-013 — Experience IX (Redox) — Curso completo (9/9 unidades)
- Consolidación EOP-012 aprobada oficialmente; el Release v1.1 pasa a ser la única referencia (se descarta la necesidad de revisar informes históricos anteriores).
- Se construye **Experience IX — Oxidación y Reducción** ("La Danza de los Electrones"), la última unidad pendiente del curso: `unit-09.js`, `preguntas-u09.js` (30 preguntas), `banco-pne-u09.js`.
- Se amplía `MQCChem` de forma aditiva con las funciones de redox sugeridas en `RECOMENDACIONES_EXPERIENCE_08.md`: `oxidationState`, `POTENCIALES`, `galvanicCell`, `esOxidante`, `esReductor`. Verificado con casos reales (KMnO₄→Mn=+7, celda Zn/Cu→1.10 V).
- Se actualiza `unidades.js`: Unidad IX pasa a `status:'active'`, se agrega bloque `experiencia`, examen estandarizado a `{questions:30,perExam:20,time:30,pass:70}`.
- Se integra en `index.html` y se re-empaqueta como `Quimica_Interactiva_10_COMPLETO_v1.2.zip`.
- Auditoría: `node --check` limpio en 58 archivos `.js`; arnés de carga ad-hoc confirma 36/36 plugins registrados (9 unidades × 4 pestañas) sin error de registro.
- **Las 9 unidades del curso (I-IX) quedan completas por primera vez.** Se habilita el Proyecto Integrador Final.

### EOP-014 — Proyecto Integrador Final MQC
- Se construye el **Proyecto Integrador Final** — culminación del curso, explícitamente NO una Experience adicional: sin `UNIT_PLUGINS`, sin banco de preguntas, sin temporizador. Caso único y determinista ("Alerta en el Río Pacuare") registrado vía `Router.register('integrador', ...)`.
- Archivo creado: `js/modules/integrador.js` (9 estaciones que integran razonamiento de las 9 unidades usando `MQCChem`).
- `js/core/gamification.js` ampliado de forma aditiva: 2 fuentes de XP nuevas y 1 medalla nueva (`integrador-final`, "Científico Integral" 🧩).
- `index.html`: se activó (des-comentó) por primera vez un módulo nuevo fuera de los slots reservados originales, con su propio ítem de navegación real.
- El informe final del estudiante se guarda en la **Bitácora Científica** reutilizando `MQCProfiles.saveReflection`, sin tocar el sistema de perfiles.
- **Corrección de metodología de auditoría:** se detectó y corrigió que el arnés QA usado en EOP-013 contaba scripts dentro de comentarios HTML como si estuvieran activos. Se confirma que `simulators.js`, `lab.js`, `games.js`, `exam.js` existen como archivos pero **no están realmente cargados** en `index.html` (viven en un bloque de comentario a modo de plantilla) — consistente con su badge "Próx." en el menú.
- Auditoría: `node --check` limpio en 59 archivos; arnés corregido confirma 53/54 scripts reales cargando sin error (1 falla solo por límite del simulador Node, no del código); 36/36 plugins de unidad intactos.

### EOP-016 — Sprint de Dirección de Arte: Identidad Visual v2.0 "Cosmos de Laboratorio"
- Se recibe `PROPUESTA_VISUAL_MasQueCiencia_1.html`, un documento de propuesta visual con paleta, tipografía y logo nuevos. Se analiza, se detecta que no coincide con la Identidad v1.0 congelada, y se decide **adoptarla como base de la nueva identidad definitiva**.
- Migración aplicada **solo a valores de tokens** (`:root` en `css/main.css`), preservando todos los nombres de variable — cero cambios de arquitectura, componentes o lógica.
- Nueva paleta: fondo índigo profundo (`#070714`), acento cian `#00D4FF` + violeta real `#7B2FFF` (corrige un violeta v1.0 que en realidad era un teal duplicado), verde `#00FF88`, oro `#FFD700`.
- Nueva tipografía: Space Grotesk (display), Inter (cuerpo), JetBrains Mono (código/datos) — reemplazan Orbitron/Nunito/Source Code Pro.
- Nuevos colores por unidad (9), actualizados en `unidades.js` **y** en el `const C` interno de cada `unit-0X.js`, con verificación 1:1.
- Nuevo logotipo: SVG propio (núcleo + 3 órbitas + 2 electrones) reemplaza el emoji ⚛️ en favicon, gate de bienvenida y marca del sidebar.
- Se corrige un color hardcodeado (`.orbit` en `main.css`) que no usaba variable — ahora usa `var(--border-glow)`.
- Se regeneran `MQC_Demo_Navegable_Alpha_v1.0.html` y `MQC_Previsualizacion_Completa_Alpha_v1.0.html` con la misma paleta y tipografía, para que ningún artefacto de recorrido quede visualmente desincronizado del proyecto real (causa original de la confusión que motivó esta migración).
- Documentado formalmente en `MQC_DESIGN_SYSTEM_v2.0.md`, que reemplaza la sección 3 de `MQC_MASTER_PROJECT_v1.0.md` como referencia visual vigente.
- Auditoría: `node --check` limpio en 59 archivos tras la migración.

### EOP-017 — Integración técnica del componente Photon en el proyecto real
- Aprobada la arquitectura técnica del Fotón (EOP-anterior). Se integra `js/shared/photon.js` y `css/photon.css` al proyecto real (`MasQueCiencia_Alpha_v1.0`), enlazados en `index.html` junto a los demás sistemas compartidos.
- Se agrega `assets/photon/` con `photon-placeholder.svg` (temporal) y `LEEME.txt` con instrucciones exactas para la entrega del activo oficial.
- El componente **ya apunta por defecto** a `assets/photon/photon-oficial.svg`; mientras ese archivo no exista, cae automáticamente al placeholder con un aviso único en consola — sin romper nada y sin requerir cambios de código cuando el archivo oficial se entregue.
- **Deliberadamente no incluido en esta entrega:** ninguna llamada a `Photon.mount()`/`Photon.react()` insertada en `unit-0X.js`, `gamification.js` ni `profiles-ui.js`; ningún contenedor `#photon-root` en `index.html`. El componente está disponible globalmente (`window.Photon`) pero no aparece todavía en ninguna pantalla real — se activará cuando se decida el layout y se autorice explícitamente.
- Auditoría: `node --check` limpio en 60 archivos `.js` del proyecto tras la integración.

---

*Próxima entrada esperada: decisión de layout/contenedor del Fotón en la SPA, activación de los puntos de integración (`Photon.react(...)`), y la entrega del activo visual oficial.*

### EOP-018 — Activo oficial del Fotón recibido (v0.1, entrega parcial)
- Se recibe `MQC_Photon_Official_v0_1.zip`. **Discrepancia detectada y documentada:** el paquete descrito por el usuario (carpeta `MQC_BrandAssets_v1/` con 8 archivos + 3 guías PDF + `Claude_Integration.md`) no coincide con el contenido real del ZIP, que solo trae 3 archivos: `Photon_Official_v0_1.png` (1024×1024), `Photon_Guide.md` (3 líneas) y `README.txt`.
- Se integra lo real: `photon-oficial.png` copiado a `assets/photon/`. Se actualiza `OFFICIAL_ASSET` en `photon.js` de `.svg` a `.png` (el componente ya soportaba ambos formatos). Se extiende el *fallback* automático al placeholder (antes solo cubría SVG) también para activos raster. Se agrega `object-fit:contain` en `photon.css`.
- Verificado con `MQC_Verificacion_PhotonOficial.html`: el PNG real monta y anima correctamente (brillo/escala/halo) a través de los 6 estados, sin modificar el archivo — tal como indica `Photon_Guide.md` ("No rediseñar. Animar únicamente halo, brillo, partículas, órbitas y flotación").
- Pendiente: variantes SVG/Idle/Front/Glow, guías completas (`BrandGuide`, `AnimationGuide`, `SoundGuide`, `Claude_Integration.md`) — documentado en `assets/photon/LEEME.txt` como entrega parcial.

### EOP-019 — CIERRE DEL NÚCLEO FUNCIONAL MQC v1.0 (numerado "EOP-014" por el usuario)
**Declaración oficial: el desarrollo funcional de MásQueCiencia ha concluido. A partir de este punto, cualquier cambio corresponde exclusivamente a identidad visual, experiencia de usuario, branding o mejoras cosméticas (Sprint de Dirección de Arte).**

- **Pendiente 1 — Banco PNE:** se completó `banco-pne-u01.js` (30/30 variantes, cobertura 1:1 verificada contra `preguntas-u01.js`). **Cobertura final: 9/9 unidades con Banco PNE completo.**
- **Pendiente 2 — Accesibilidad:** corregido un problema real de contraste (`--text-muted` pasó de 3.23:1 a 5.96:1, cumple WCAG AA; mismo tono, solo más claro). Los `.nav-item` del sidebar —antes solo clicables con mouse— ahora son navegables por teclado (`role="button"`, `tabindex="0"`, manejador de `Enter`/`Espacio` en `router.js`). Se agregó `role="dialog"`/`aria-modal`/`aria-labelledby` a los 2 modales, `<label>` accesible al input de nombre, `aria-current` dinámico en la navegación, `aria-expanded` sincronizado en el menú hamburguesa, y una regla global `:focus-visible`. Limitaciones menores documentadas abajo.
- **Pendiente 3 — Módulos reservados:** eliminados del menú y del proyecto: `Simuladores`, `Laboratorio`, `Juegos`, `Examen General`, `Profe Bryan IA` (los 5 ítems "Próx."). Se borraron sus 5 archivos placeholder (nunca estuvieron realmente activos), el FAB muerto asociado, y las referencias/metadata en `router.js` y `app.js`. El mecanismo genérico de fallback de `Router` (`_showPlaceholder`) se mantuvo intacto.
- **Pendiente 4 — Auditoría final:** `node --check` limpio en 56 archivos `.js` (100% del proyecto). Arnés de carga: 55/56 sin error (el único es la limitación de Node ya documentada, no un defecto real). 36/36 `UNIT_PLUGINS`, 50 funciones de `MQCChem`, API completa de `Photon`, `MQCProfiles` y `Mentor` confirmados.
- **Pendiente 5 — Limpieza:** 5 placeholders eliminados; comentarios muertos/desactualizados corregidos en `app.js` (roadmap de fases obsoleto → nota que remite a la documentación real), `router.js` y `photon.js` (typo y ruta desactualizada). Cero duplicados o archivos de sistema.
- **Resultado:** 56 archivos `.js`, 100% activos, 9/9 unidades con Banco PNE, menú 100% funcional sin placeholders.

**Limitaciones menores que permanecen (documentadas, no bloqueantes):** cobertura ARIA no exhaustiva en botones generados dinámicamente dentro de cada unidad; sin región `aria-live` para anunciar cambios de sección; Photon con activo oficial parcial (v0.1, PNG sin variantes ni guías completas — pertenece al Sprint de Dirección de Arte).

---

## 🔒 MQC CORE v1.0 — FUNCIONALMENTE CONGELADO

*Toda futura entrada de este CHANGELOG corresponderá a identidad visual, branding, experiencia de usuario o mejoras cosméticas — no a nuevas funcionalidades del núcleo.*

### EOP-020 — Sprint de Dirección de Arte: activación real de "La Curiosidad"
- Se decide el layout pendiente (documentado como abierto en `PHOTON_COMPONENT_SPEC.md` §7): `#photon-root` fijo en la esquina inferior derecha de `index.html`, `pointer-events:none`, nunca bloquea contenido.
- Se activan 8 puntos de integración semántica que estaban documentados pero no conectados:
  - **Las 9 unidades** (`unit-01.js` a `unit-09.js`): el `awardXP()` local de cada unidad ahora traduce `'topic-read'`→motivación, `'exam-done'`→felicitación, `'game-won'`/`'game-highscore'`→felicitación, vía `Photon.react(...)`. Cambio idéntico y mínimo en las 9 (una función, no llamadas dispersas).
  - **`gamification.js`:** `addXP()` dispara `Photon.react('level-up')` en cada subida de nivel; `checkBadges()` dispara `Photon.react('badge-unlocked')` por cada medalla nueva, y específicamente `'course-complete'` para la medalla de 9/9 unidades.
  - **`app.js`:** `_showApp()` monta a Photon (`Photon.mount`) y reacciona `'welcome'` al entrar a la plataforma.
- **La API de `photon.js` no se tocó** — se usó exactamente tal como está documentada y congelada (`Photon.react(...)`), consistente con "no rediseñar, no reinterpretar".
- Sigue usando el activo oficial parcial (`photon-oficial.png` v0.1) integrado en EOP-018; en cuanto lleguen las variantes/guías completas, esta activación no requiere cambios.
- Auditoría: `node --check` limpio en 56/56 archivos tras la activación; arnés de carga sin errores nuevos (55/56, misma limitación de Node ya documentada).

### EOP-021 — First Impression Sprint
Solo experiencia visual — cero cambios de arquitectura, Router, MQCChem, Photon, XP, Mentor, Bitácora, Perfiles o Storage.

- **Descubrimiento clave:** la pantalla que el estudiante ve realmente al entrar es `MQCProfilesUI.openGate()` (generada dinámicamente en `profiles-ui.js`), no el `#welcome-modal` estático de `index.html` (ese es un *fallback* casi nunca alcanzado). Todo el trabajo de este sprint se aplicó al lugar correcto.
- **Puerta de entrada rediseñada:** `openGate()` ahora usa un contenedor propio (`.mqc-gate-atmosphere`/`.mqc-gate-card`), con fondo atmosférico (glow radial + campo de estrellas + `.mqc-living-bg` con deriva lenta), logo SVG con halo, y jerarquía tipográfica más marcada. El resto de los diálogos (administrador, bitácora, privacidad) **no se tocó** — siguen usando `_overlay()`/`_panel()` sin cambios.
- **Colores:** `--cyan` `#00D4FF→#1FDBFF`, `--cyan-glow` `.15→.24`, `--border` `.28→.38`, `--border-glow` `.4→.5` — mismos tonos, mayor intensidad y visibilidad, sin cambiar la identidad v2.0.
- **Iconografía de perfiles:** nueva clase `.mqc-badge-profile` (glow al hover, elevación, ícono circular con halo) y `.mqc-avatar-btn` (selector de avatar con relieve y estado activo) — reemplazan los botones planos anteriores, solo en la puerta de entrada.
- **Página principal:** se agregó una capa `.mqc-living-bg` (glow ambiental de deriva lenta) detrás del sistema de partículas ya existente — la estructura de `home.js` no cambió. De paso, se corrigieron los colores del canvas de partículas, que seguían con hex de la identidad v1.0 sin migrar.
- **Accesibilidad:** verificado que con los ajustes de color de este sprint, todos los pares texto/fondo relevantes siguen ≥4.5:1 (AA). No se fusionó el modo "Alto contraste" con el normal (se mantiene como toggle independiente y más extremo), pero el normal ya adopta un nivel de contraste sustancialmente más alto que antes.
- **Funciones experimentales:** "Lectura por voz" y "Modo simplificado" ahora se etiquetan explícitamente `(Experimental)` en el panel de accesibilidad — ambas funcionan (uso básico de `speechSynthesis` / ocultar animaciones), pero el propio `pne.js` se documenta a sí mismo como andamiaje parcial, no un módulo completo.
- Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-022 — Portal de Entrada
Rediseño profundo de `openGate()` tras retroalimentación de que la entrada "se sentía como un formulario de login". Solo visual — Router, Storage, Perfiles, Photon y toda la lógica de `MQCProfiles` permanecen exactamente iguales.

- **Jerarquía invertida:** el protagonista ya no es el panel — es el mensaje. Nuevo orden: titular inspirador (*"La ciencia empieza con una buena pregunta"*) → subtítulo → panel de selección → acciones. El panel pasó de "el destino" a "un paso dentro de la idea".
- **Atmósfera enriquecida:** nebulosa azul muy tenue con deriva de 48s, 2 hexágonos enormes desenfocados (40-55s), líneas científicas finísimas en diagonal (60s) — todo movimiento lentísimo y de amplitud mínima, nada de "lluvia de partículas" ni efectos llamativos.
- **Emergencia del panel:** nueva animación `mqcConsoleEmerge` (opacidad + desplazamiento + desenfoque + glow, 0.85s) — reemplaza el `slideUp` con rebote que se sentía más "modal de app" que "consola científica". El formulario de crear perfil hereda la misma animación al aparecer.
- **Perfiles como credenciales:** más espaciado, borde izquierdo con acento, tipografía monoespaciada para las métricas (XP/nivel) — se leen como una credencial, no como un ítem de lista.
- **Jerarquía de botones:** "Crear tu perfil científico" es ahora la acción primaria (ancho completo, con glow); "Importar respaldo" e "Invitado" bajaron a enlaces secundarios de texto, sin competir visualmente.
- **Iconos de avatar:** confirmado que ya solo aparecían al presionar "Crear perfil" (comportamiento correcto preexistente) — se les agregó la animación de aparición y una etiqueta ("Elige tu insignia") para mayor claridad.
- **Fotón:** sin protagonismo todavía, tal como se indicó — el escenario (jerarquía, espacio, atmósfera) queda preparado para incorporarlo en un sprint posterior.
- Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-023 — Mejoras Visuales y UX Premium
Referencia visual recibida como imagen (no copiada literalmente, usada solo como guía de composición y atmósfera). Solo visual — Router, Storage, Photon, XP, MQCChem, Mentor, Bitácora, Perfiles y arquitectura sin cambios.

- **Amarillo fosforescente dedicado:** nuevo token `--xp-gold` (`#F9FF4D`) aplicado ÚNICAMENTE a indicadores de XP/Nivel/Medallas (`.topbar-badge`, `.user-level`, `.progress-level-name`, `.badge-item.unlocked`, `.progress-fill-gold`, `.toast-xp`) — con un leve glow a juego. El `--gold` original se conserva sin cambios para énfasis de texto general (saludos del hero), evitando "convertir el sitio en amarillo".
- **Fondo del portal — de grid rígido a estructura molecular real:** se retiraron los hexágonos sólidos y el patrón de líneas tipo grid del sprint anterior (EOP-022), reemplazados por una retícula hexagonal genuina (nodos + enlaces, estilo grafeno/nanotubo) generada proceduralmente en JS — nunca un grid ortogonal. Rotación de 90-120s, más partículas diminutas tipo fotón con deriva vertical lentísima.
- **Accesos rápidos reubicados:** "Buscar", "Glosario" y "Accesibilidad" dejaron de flotar sobre la interfaz (`#qi-launcher`, eliminado) y ahora viven de forma permanente dentro del sidebar, como bloque `.mqc-quick-access`. `launcher.js` ata los mismos listeners (`GlobalSearch.open()`, `Glossary.openOverlay()`, panel PNE) a los nuevos botones fijos — funcionalidad idéntica, atajo Ctrl/Cmd+K intacto.
- **Consistencia:** tipografía, degradados de texto, estructura de tarjetas, botones y jerarquía visual sin cambios, tal como se pidió explícitamente.
- Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-024 — Sprint de Microperfeccionamiento → 🔒 PORTAL DE ENTRADA MQC v1.0 APROBADO Y CONGELADO
Microajustes finales sobre la composición ya aprobada en EOP-022/023. Sin cambios de estructura, paneles ni jerarquía.

- **Mensaje de bienvenida:** se eliminó "Iniciando laboratorio digital…" (la plataforma hablaba de sí misma) de la pantalla de carga inicial, reemplazado por "Tu laboratorio te espera." La etiqueta del panel del portal ahora es dinámica y le habla directamente al estudiante: *"Selecciona tu perfil científico para comenzar tu experiencia"* (con perfiles existentes) o *"Crea tu primer perfil científico y comienza tu viaje por MásQueCiencia"* (sin perfiles) — reemplaza la etiqueta genérica "Selección de perfil · MásQueCiencia".
- **Aparición secuencial del panel** ("despertar de consola científica"): indicador verde (0-190ms) → línea superior dibujándose de izquierda a derecha (220-450ms) → contenido/lista de perfiles (420-650ms) → acción principal (620-850ms). ~830ms totales, dentro del rango pedido.
- **Microanimaciones:** hover de credenciales más suave (`cubic-bezier` en vez de `transition-fast` genérico), glow ligeramente dinámico y pulsante en el botón principal (ciclo de 5s, muy sutil), respiración lentísima del panel completo (ciclo de 9s). De paso se corrigió `.btn-primary:hover`, que todavía usaba un color hex de la identidad v1.0 sin migrar (`rgba(23,200,196,...)` → `var(--cyan-glow)`).
- **Fondo:** mismo lenguaje visual, sin elementos nuevos — solo se ralentizó el movimiento (nebulosa 48s→62s, retículas moleculares 90/120s→130/165s, partículas fotón ~14-30s→20-40s) para transmitir más calma.
- Auditoría: `node --check` limpio en 56/56 archivos.

---

## 🔒 PORTAL DE ENTRADA MQC v1.0 — APROBADO Y CONGELADO

**A partir de este punto, la pantalla de entrada (`openGate()` en `profiles-ui.js` + su CSS asociado) no vuelve a modificarse salvo corrección de errores.** Cualquier cambio futuro de identidad visual se aplica a otras superficies de la plataforma (página principal, unidades, Fotón, iconografía), no a este componente ya aprobado.

### EOP-025 — LA CURIOSIDAD: Character Design Document → 🔒 APROBADO Y CONGELADO
Sprint de identidad puro — sin código, sin implementación. Se entrega `LA_CURIOSIDAD_Character_Design_Document.md`, el estándar oficial permanente del personaje.

- Cubre: historia de origen, misión oficial, filosofía (3 principios), personalidad (tabla de 6 rasgos con manifestaciones correctas/incorrectas), lenguaje visual/de movimiento/sonoro (como principios, no como especificación de ilustración), 10 estados oficiales (Reposo, Bienvenida, Motivación, Celebración, Nivel, Desafío, Ayuda, Pensando, Esperando, Despedida — 3 nuevos frente a la implementación técnica previa), reglas de uso y de NO uso, e integración conceptual con XP/Mentor/Bitácora/Proyecto Integrador/Perfiles/Portal de Entrada.
- **Misión Oficial agregada tras revisión:** *"La Curiosidad existe para acompañar al estudiante en el instante exacto en que el conocimiento comienza a construirse..."* — funciona como criterio de validación para cualquier decisión futura sobre el personaje.
- **Nota de reconciliación técnica dejada explícita:** el componente `photon.js` (implementado en sprints anteriores) usa nomenclatura distinta (`felicitacion`, `apoyo`) y carece de 3 estados nuevos (`pensando`, `esperando`, `despedida`). Este documento tiene prioridad — la reconciliación técnica queda pendiente para un sprint de implementación posterior, fuera del alcance de este sprint de identidad.
- **Aprobado y congelado.** Cualquier cambio futuro a historia, misión, filosofía, personalidad, estados oficiales o reglas de uso/no uso requiere un nuevo sprint de identidad explícito.

### EOP-026 — Reconciliación técnica de Photon con el Character Design Document
Cambio contenido a un solo archivo (`js/shared/photon.js`) — ningún otro archivo necesitó modificarse, porque el resto de la plataforma llama a `Photon.react('nombre-de-evento')` (ej. `'exam-passed'`, `'level-up'`), nunca a los nombres de estado directamente.

- `STATE_PARAMS`: `felicitacion`→`celebracion`, `apoyo`→`ayuda` — mismos parámetros de comportamiento, solo nombres alineados a `LA_CURIOSIDAD_Character_Design_Document.md` (EOP-025).
- Se agregan los 3 estados oficiales que faltaban: `pensando`, `esperando`, `despedida` (parámetros de brillo/escala/velocidad orbital definidos, sin puntos de integración activados todavía).
- `EVENT_MAP` actualizado en consecuencia; se agregan 3 mapeos nuevos disponibles para uso futuro (`loading→pensando`, `idle→esperando`, `session-end→despedida`), sin ningún call-site real todavía.
- `PHOTON_COMPONENT_SPEC.md` actualizado con la tabla de los 10 estados oficiales.
- Auditoría: `node --check` limpio en 56/56 archivos; confirmado por búsqueda exhaustiva que ningún otro archivo del proyecto dependía de los nombres antiguos.

### EOP-027 — Activo Maestro Oficial de La Curiosidad → integrado y congelado
Se recibe la ilustración oficial aprobada del personaje (infografía de referencia). Se declara activo maestro definitivo — prohibida cualquier reinterpretación futura.

- **Hallazgo honesto documentado:** el archivo entregado es una infografía compuesta de 1254×1254px (múltiples renders pequeños + texto + paneles en una sola imagen plana), no un activo de producción aislado en alta resolución. Se documenta explícitamente en `assets/photon/LEEME.txt` para no generar expectativas de calidad "póster" que el archivo de origen no puede sostener.
- Se recortó el render principal (~520×470px) y se le aplicó transparencia por umbral de luminancia (no reinterpretación): el fondo original (~RGB 0-4,0-5,11-17) es casi idéntico a `--void` (#070714) de la app real, por lo que el recorte se integra sin bordes visibles — verificado por composición directa contra el fondo real antes de integrar.
- El personaje en sí (núcleo, halos, 3 órbitas, partículas) no fue tocado, redibujado, simplificado ni alterado — solo se aisló del resto de la infografía.
- **Integración:** el archivo reemplaza `assets/photon/photon-oficial.png` (mismo nombre, misma ruta). **`photon.js` no se modificó en absoluto en su lógica** — solo se actualizaron 2 comentarios internos para reflejar que ya no es la v0.1 parcial sino el activo definitivo. La API pública queda exactamente igual.
- **Se recomienda explícitamente NO extraer los 10 íconos de estado individuales** de la misma infografía como activos separados: a esa resolución de origen (~145×140px cada uno), amplificarlos introduce pérdida de nitidez visible. En cambio, se reafirma que la arquitectura ya construida (un solo activo + `Photon.setState()` aplicando brillo/escala/halo por CSS) es la implementación correcta de la regla "mismo núcleo, mismo glow, solo varía intensidad/color/halo" — no requiere ni debe requerir 10 archivos de imagen separados.
- Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-030 — Posición y tamaño definitivos del Fotón (validado con configurador interactivo)
Tras iterar la posición (EOP-028: reubicado por colisión con toasts) y validar visualmente tamaño/ubicación con un configurador interactivo (sliders + arrastre libre), se fijan los valores definitivos:

- `#photon-root` (`index.html`): `top:96px; right:73px` (antes `top:76px; right:28px`).
- `.mqc-photon` (`css/photon.css`): `width/height:124px` con `margin:-62px 0 0 -62px` (antes 64px / -32px) — el Fotón casi duplica su tamaño en pantalla.
- Ambos comentarios internos actualizados para reflejar que esta es la posición/tamaño **validados y definitivos**, no un valor de paso.
- Auditoría: `node --check` limpio en 56/56 archivos.

**Nota:** este ajuste se hizo únicamente sobre el layout (posición/tamaño del contenedor). El activo visual (`photon-oficial.png`, EOP-027) y la API de `photon.js` no se tocaron.

### EOP-030 (Brand Assets) — MQC Brand Assets v1.0: pipeline completo de activos oficiales
Sprint de 9 fases ejecutado de principio a fin sin pausas, tal como se instruyó. Entregable: `MQC_BRAND_ASSETS_v1.0.zip`, 87 archivos + 5 documentos nuevos.

- **Logo (Fase 1):** sistema único formalizado a partir del isotipo ya existente en `index.html` (`#mqc-atom-logo`) — no rediseñado. 6 archivos: isotipo, monocromático, fondo claro, horizontal, vertical, App Icon.
- **Iconografía (Fase 2):** 33 íconos SVG (24 funcionales + 9 de unidad), familia consistente (grid 24×24, stroke 1.75px, `currentColor`). Reemplaza progresivamente los emoji — no se tocó ningún componente de producción todavía, solo se entrega la librería.
- **Fondos (Fase 3):** 10 variantes de retícula molecular procedural (mismo generador del Portal de Entrada, EOP-023), una por contexto (Portal/Inicio/Unidad/Simulador/Juego/Examen/Integrador/Bitácora/Progreso/Tabla Periódica), con densidad calibrada a la necesidad de concentración de cada pantalla.
- **Ilustraciones (Fase 4):** 5 piezas priorizadas (Laboratorio, Hero Principal, Ciencia, Descubrimiento, Conocimiento), abstractas y coherentes con el lenguaje ya aprobado — nunca figurativas.
- **La Curiosidad — solo derivados (Fase 5):** ningún redibujado. Derivados legítimos del `photon-oficial.png` real (520×470px): 5 reducciones de escala, WebP, y un sprite de referencia de tamaños. Documentado explícitamente que no existe (ni debe existir) un sprite de 10 estados, porque la arquitectura ya aprobada usa un único activo + filtros CSS.
- **UI Assets (Fase 6):** filtros de glow reutilizables, divisor, patrón de estrellas, patrón de retícula en mosaico, forma base de badge, ribbon, y CSS de glass/overlay.
- **Exportación (Fase 7):** estructura de carpetas exacta solicitada. Auditoría encontró y corrigió 3 archivos duplicados reales (copias en `brand/` que ya existían en sus carpetas propias) — `brand/` pasó a ser un manifiesto de referencia, no una copia.
- **Documentación (Fase 8):** `MQC_BRAND_ASSETS.md`, `MQC_ICON_LIBRARY.md`, `MQC_BACKGROUND_LIBRARY.md`, `MQC_LOGO_GUIDE.md`, `MQC_EXPORT_GUIDE.md` — 5 documentos nuevos.
- **Auditoría (Fase 9):** 0 duplicados tras corrección; se detectó y corrigió **1 color fuera del Design System** (`#FFA94D` en el fondo de examen, no era un token real — reemplazado por `--orange` oficial `#FF6B00`); se confirmó que `#B983FF` (Proyecto Integrador) sí es un color real preexistente en `integrador.js`, simplemente no estaba listado en el Design System Maestro — queda señalado como pendiente de incorporar formalmente.
- **Limitación técnica documentada honestamente:** sin acceso a internet ni herramientas de ilustración vectorial profesional en este entorno, todos los activos se generan por código (Matplotlib/SVG programático) — funcionalmente completos y consistentes, pero no son ilustración manual de diseñador. Documentado en `MQC_BRAND_ASSETS.md` §Limitaciones.

### EOP-030.5 — Integración Total del Design System
Auditoría exhaustiva pantalla por pantalla + corrección automática, sin crear ningún recurso nuevo. Ver `INFORME_INTEGRACION_EOP-030.5.md` para el detalle completo.

- **Hallazgo mayor:** `js/shared/profiles-ui.js` tenía **126 valores de color** de la identidad v1.0 (fallbacks `var(--token, #hexViejo)`) — corregidos sistemáticamente, incluida la Bitácora Científica exportada a PDF, que usaba la paleta y tipografía anteriores completas sin haber migrado nunca.
- **Bug real encontrado:** `--blue` se usaba en ~15 lugares (incluidos los componentes centrales del Método MQC — detonante/commit/mentor, presentes en las 9 unidades) pero **nunca fue definida como token** — el fallback viejo se usaba siempre, sin excepción. Corregido definiendo `--blue: var(--cyan-dim)` como alias real en `:root` (causa raíz, no parche por archivo).
- Corregidos también: favicon/logo con cian viejo, `.nav-item.active` con RGB v1.0, patrón SVG de fondo con hex incrustado viejo, `--glow-turq`/`--glow-gold`, gradiente de `body`, una variable inexistente (`--u4` en vez de `--unit-04`) con color viejo en `unit-05.js`.
- **Iconografía integrada:** 8 íconos SVG de la librería aprobada (Brand Assets v1.0) reemplazan los emoji estructurales del sidebar y accesos rápidos — inline, heredando color vía `currentColor`.
- **Fondos integrados:** `.mqc-living-bg` (ya existente, usado antes solo en Home/Portal) ahora también en Mi Progreso y Tabla Periódica.
- **Alcance honesto declarado:** de los 1,210 emoji en 55 archivos, solo una fracción tiene equivalente en la librería de 33 íconos aprobados — el resto es contenido pedagógico específico (medallas, mensajes, temas) fuera de alcance de este sprint por prohibición explícita de crear íconos nuevos. Documentado como pendiente futuro, no como omisión.
- Auditoría final: 0 residuos de identidad v1.0 en todo el proyecto (segunda verificación exhaustiva), `node --check` limpio en 56/56 archivos.

### EOP-031 — 🔒 RELEASE CANDIDATE RC1
Cierre oficial de la etapa de desarrollo. Se construyó un arnés de ejecución real (no solo sintaxis): 56 archivos cargados en orden real, DOM simulado con localStorage funcional, recorrido completo de 18 acciones reales de estudiante (crear/exportar/importar perfil, leer teoría, resolver simuladores/juego/examen de las 9 unidades, subir XP y nivel, obtener insignias, consultar Bitácora, cerrar/reabrir sesión, navegar, Photon, MQCChem).

- **Resultado: 18/18 pasos exitosos, sin errores reales de ejecución en el código del proyecto.**
- 3 fallas iniciales resultaron ser limitaciones del arnés de prueba (funciones del navegador no simuladas: `removeEventListener`, `dispatchEvent`) y un malentendido de API en la prueba misma (`validateImport` espera el objeto ya parseado, no el wrapper de `exportProfile`) — corregidas en el arnés, confirmando que el proyecto real no tiene el defecto.
- Ver `RELEASE_RC1_REPORT.md` para el detalle completo, lista de pendientes no bloqueantes, y la declaración formal de cierre de la etapa de desarrollo.
- Entregable: `MasQueCiencia_RC1.zip`.

### EOP-032 — Corrección: el sistema de color por estado nunca estuvo implementado
Reportado por el usuario tras ver el Fotón en la app real sin reacciones visibles de color. Investigación confirmó: `STATE_PARAMS` (`photon.js`) solo definía `brightness/scale/orbitSpeedMul/haloMul` — **nunca existió un campo de color/tono**, pese a que el Visual Concept Document y la Adenda de Comportamiento (EOP-025/029) documentaban una tabla de colores oficial por estado. `filter: brightness()` (único filtro CSS aplicado) solo puede aclarar/oscurecer una imagen de color fijo — nunca cambiar su tono.

- Se agregaron los campos `hue` (grados) y `saturate` (multiplicador) a los 10 estados de `STATE_PARAMS`, calculados a partir de los tonos reales medidos en `photon-oficial.png` (núcleo dorado ~19°, anillos azules ~250°).
- `photon.css`: el filtro de `.mqc-photon-asset` pasó de `brightness()` únicamente a `brightness() saturate() hue-rotate()` — el mismo PNG congelado (EOP-027), sin ningún activo nuevo ni rediseño.
- **Aclaración sobre los "ojos"**: nunca formaron parte de producción. Siguen siendo exclusivamente el prototipo experimental EOP-028B, tal como se acordó explícitamente en ese sprint — esto no cambió.
- Auditoría: `node --check` limpio en 56/56 archivos. Verificación visual generada (`MQC_Verificacion_ColorPorEstado.html`) mostrando los 10 estados con su color real aplicado sobre el activo oficial.

### EOP-034 — Cambio de arquitectura del activo oficial: el modelo con ojos pasa a ser oficial
Decisión explícita del propietario del proyecto, motivada por una limitación real detectada: el PNG oficial anterior (`photon-oficial.png`, EOP-027) tenía resolución fuente fija de 520×470px (recorte de una infografía de referencia) y se veía con baja nitidez. El modelo vectorial validado como prototipo experimental en EOP-028B se promueve a **activo oficial definitivo**, resolviendo la limitación de resolución de raíz (un SVG no tiene límite de nitidez).

- **`js/shared/photon.js` reescrito por completo**: el Fotón ya no carga un archivo externo — se construye como SVG en código (núcleo, halo de 2 capas, 3 órbitas, siluetas de corazón/interrogante para Motivación/Pensando, y los ojos energéticos con mirada, parpadeo y microseguimiento del cursor). **La API pública no cambió ni un carácter** — `mount/setState/react/moveTo/orbit/stopOrbit/float/show/hide/destroy` funcionan exactamente igual para el resto del proyecto. `setAsset()` queda obsoleta (no-op con aviso) por compatibilidad.
- **Colores por estado reales** (no filtros aproximados): cada uno de los 10 estados define su propio color base directamente, más sus parámetros de comportamiento ya establecidos (velocidad orbital, respiración, halo) y su expresión de mirada (dirección, apertura, ritmo de parpadeo).
- **Posición y tamaño oficiales actualizados**: `top:64px; right:76px`, `139px` de diámetro — validados con el configurador interactivo de coordenadas.
- **Bug real encontrado y corregido durante la verificación**: el código usaba `elemento.className.indexOf(...)` sobre un `<g>` SVG — en SVG, `className` es un `SVGAnimatedString`, no un string plano, y ese patrón habría fallado en un navegador real. Corregido usando selectores directos en vez de inspeccionar la clase del padre.
- `assets/photon/photon-oficial.png` y `photon-placeholder.svg` quedan como archivos históricos, sin uso — documentado en `assets/photon/LEEME.txt`, no eliminados por respeto al historial del proceso de diseño.
- Auditoría: `node --check` limpio en 56/56 archivos; arnés funcional (10 pruebas: montaje, los 10 estados, eventos reales, movimiento/órbita, mostrar/ocultar, destrucción, remontaje, las 36 unidades, integración con Gamification) — **10/10 exitoso**.

### EOP-035 — Ajuste de duración: más tiempo para disfrutar el logro
Los 5 estados con temporizador fijo (Bienvenida, Motivación, Celebración, Nivel, Despedida) pasaron de 1.8-2.6s a **3 segundos parejos** — a pedido explícito, para que el estudiante tenga más tiempo de percibir el reconocimiento antes de que el Fotón vuelva a Reposo. Los 4 estados que intencionalmente no tienen temporizador (Desafío, Ayuda, Pensando, Esperando — persisten según la situación real, no un cronómetro) quedaron sin tocar, tal como corresponde a su diseño. `node --check` limpio en 56/56 archivos.

### EOP-036 — Motivación reposicionada + Nivel avanza al centro
Dos ajustes de comportamiento específicos por estado, a pedido explícito:

- **Motivación**: se detectó que la silueta de corazón (el único estado con geometría distinta) se escondía contra el margen superior real de la pantalla (`top:64px`). Se agregó `yOffset:75` — el Fotón se desplaza 75px hacia abajo de su punto de anclaje solo durante este estado, y vuelve a su posición normal al salir de él.
- **Nivel**: nuevo transient `centerStage`, exclusivo de este estado. Al subir de nivel, el Fotón calcula la distancia real entre su punto de anclaje y el centro de la ventana, viaja hasta ahí agrandado (escala 1.9×), expande su halo un 40% adicional, y regresa a su posición real antes de que se cumpla la duración del estado (3s) — nunca corta el regreso en seco.
- Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-037 — 4 bugs reales reportados por uso real, encontrados y corregidos con pruebas
Reportado tras una sesión real de prueba del proyecto. Los 4 hallazgos se investigaron con código real antes de tocar nada — ninguno se corrigió por suposición.

1. **La barra de XP del sidebar no se actualizaba en tiempo real (bug real, confirmado).** Causa: `gamification.js` comprobaba `window.App` antes de refrescar la UI, pero una `const App` de nivel superior en `app.js` **nunca se adjunta como propiedad de `window`** — esto es comportamiento estándar de JavaScript, no un defecto de un entorno de prueba. Confirmado de forma aislada (`bare App` = objeto válido, `window.App` = `undefined`) antes de corregir. El dato SÍ quedaba bien guardado en `Storage` (por eso "Mi Progreso" mostraba el valor correcto) — solo el refresco automático del sidebar fallaba silenciosamente. Corregido: ahora usa la variable `App` directamente.
2. **El mismo bug bloqueaba la recarga de página tras "Borrar mi progreso"** en `progress.js` — misma causa, mismo tipo de corrección.
3. **Error conceptual en la Unidad III** ("Subniveles s, p, d, f y la forma de la tabla"): el texto usaba "bloque" y "subnivel" como si fueran sinónimos. Reescrito para distinguir explícitamente: el bloque es la región de la tabla; el subnivel es el concepto de energía; los elementos de un bloque comparten el mismo subnivel.
4. **"Disponible próximamente" en videos — sistémico, no aislado.** Las 9 unidades tenían ~26 registros de video sin archivo real (`src:null`), cada uno mostrando ese cartel — contradice el cierre del núcleo (EOP-014/019: "la plataforma debe sentirse terminada"). Se vaciaron los 26 registros en las 9 unidades.
5. **El Fotón no reaccionaba a la subida de nivel cuando coincidía con una insignia nueva (bug real de jerarquía).** `checkBadges()` se ejecuta después de la reacción `'nivel'` dentro de `addXP()`, y si esa misma ganancia de XP desbloqueaba una medalla común, `checkBadges()` sobrescribía en silencio el estado con `'badge-unlocked'` — la Curiosidad reaccionaba a la insignia, nunca al nivel, sin ningún error visible. Corregido con una jerarquía explícita: `checkBadges()` ahora recibe si ya hubo una reacción de Nivel en este mismo evento y, de ser así, no la sobrescribe (excepto `course-complete`, que es en sí mismo un hito de la misma jerarquía).
6. **Incidental:** se corrigió un texto obsoleto ("Fase 3") en un respaldo defensivo de `units.js` que nunca se activa en producción (mientras existan los 36 plugins reales, que siempre existen) — reenfocado como mensaje de error genérico en vez de referencia a una fase de roadmap ya superada.

**Nota de proceso:** estas correcciones se perdieron una vez por un reinicio del entorno de trabajo antes de empaquetar — se rehicieron íntegramente y se verificaron con una prueba funcional real (4/4 casos, incluyendo el caso exacto reportado por el usuario: nivel + insignia simultáneos) antes de declarar el sprint cerrado.

Auditoría: `node --check` limpio en 56/56 archivos.

### EOP-034 (Beta QA) — 🔒 MQC Release Candidate 2 aprobado para publicación Beta
Sprint formal de validación de calidad (Quality Gate de 56 módulos + recorrido funcional completo de 19 pasos + verificación de compatibilidad + análisis de recursos), ejecutado con el mismo arnés de ejecución real usado en sprints anteriores.

- **Resultado: 55/56 módulos PASS.** El único módulo sin PASS es `photon-sound.js`, que **no existe en el proyecto real** — hallazgo documentado en `BUG_LIST_v1.0.md`, severidad BAJA, no bloqueante (corregirlo violaría la prohibición de este sprint de agregar componentes nuevos).
- **0 errores críticos, 0 errores altos.** Recorrido completo de estudiante (crear perfil → ... → verificar persistencia tras reingreso) ejecutado end-to-end sin ninguna excepción.
- Se investigaron y descartaron 3 falsos positivos antes de registrarlos como bugs (una referencia dentro de un comentario de documentación, y dos métodos de API con nombre real distinto al usado en la prueba inicial — `GlobalSearch.query()` y `PNE.set()`).
- **Sin cambios de código en este sprint** — ver `FIX_LOG_v1.0.md`: no se encontró ningún error que este sprint autorizara corregir.
- Entregables: `MQC_BETA_QA_REPORT_v1.0.md`, `BUG_LIST_v1.0.md`, `FIX_LOG_v1.0.md`, `MasQueCiencia_RC2.zip`.
- **"MQC Release Candidate 2 aprobado para publicación Beta."**

### EOP-035 — 🔒 MasQueCiencia Beta v1.0 — Release Package preparado
Sprint de ingeniería de publicación (limpieza, organización, documentación, empaquetado) — sin ningún cambio funcional, de identidad ni de experiencia de usuario.

- **Limpieza (Fase 1):** se eliminaron los 2 archivos históricos sin uso (`photon-oficial.png`, `photon-placeholder.svg`, ya reemplazados desde EOP-034) — confirmado por segunda vez que ninguna referencia activa dependía de ellos antes de borrarlos. 0 TODOs/FIXMEs reales encontrados (solo coincidencias de la palabra "todo" en español). 0 archivos temporales o de respaldo. Tamaño total: 1.5MB.
- **Organización (Fase 2):** se creó `docs/` con subcarpetas `identidad/`, `qa/` y `validacion/` para la documentación de respaldo — la estructura de la aplicación (`css/`, `js/`, `assets/`) se mantuvo intacta por ser ya la correcta para un sitio estático (no se fuerza una plantilla genérica que no aplica a una SPA sin backend).
- **Documentación (Fase 3):** `README.md` reescrito por completo (el anterior referenciaba EOP-019 y documentos ya superados); `ROADMAP.md` nuevo; `CHANGELOG.md`/`PROJECT_CONTEXT.md` movidos a la raíz del paquete.
- **Versionado (Fase 4):** asignado oficialmente **MasQueCiencia Beta v1.0** — ver `RELEASE_REPORT.md` para número de build, notas de versión y pendientes conocidos.
- **Validación de distribución (Fase 5):** confirmado que todas las rutas del proyecto son relativas (0 rutas absolutas de sistema de archivos). **Hallazgo real documentado:** la tipografía (Space Grotesk/Inter/JetBrains Mono) depende de Google Fonts vía internet — si no hay conexión, el navegador usa una fuente de reemplazo automáticamente (no rompe la plataforma, pero contradice el principio de "100% offline" que el propio código documenta). No se corrigió en este sprint por no tener acceso a red para empaquetar las fuentes localmente sin exceder el alcance de "solo empaquetado" — queda en `ROADMAP.md`.
- **GitHub Ready (Fase 6):** `.gitignore` creado, `LICENSE` creado (con nota explícita de que es un valor por defecto conservador — "todos los derechos reservados" — pendiente de que el autor confirme o elija otra licencia).
- **Paquete final (Fase 7):** `MasQueCiencia_Beta_v1.0.zip`.
- **Informe final (Fase 8):** `RELEASE_REPORT.md`.
- **"MasQueCiencia Beta v1.0 Release Package preparado y listo para publicación."**

### EOP-038 — 4 hallazgos reales de la primera prueba en navegador real, corregidos
Primera vez que se prueba MásQueCiencia en un navegador real (no simulación de código) — encontró errores que ningún arnés de Node.js pudo haber detectado antes.

1. **Bug arquitectónico real: el Fotón quedaba atascado en el centro de la pantalla.** Causa raíz: cada unidad tiene su propia función `awardXP()` que, además de llamar a `Gamification.addXP()`, disparaba **su propia** reacción de Photon por separado para el mismo evento (ej. examen aprobado). Si `Gamification.addXP()` internamente disparaba "Nivel" (subida de nivel real) y la unidad disparaba "Examen aprobado" casi al instante después, la segunda reacción cancelaba la animación de regreso de la primera, dejando al Fotón agrandado y fuera de su posición para siempre. **Corrección de raíz, un solo archivo:** se agregó una jerarquía de prioridad real dentro de `photon.js` (`STATE_PRIORITY`, según `LA_CURIOSIDAD_Reglas_de_Interaccion.md` §6) — mientras un estado de mayor prioridad esté dentro de su propia duración, ningún estado de menor prioridad puede interrumpirlo; Despedida sigue siendo la única excepción que siempre interrumpe. Verificado con los 2 escenarios reales reportados (examen+nivel, juego+récord+nivel) más el caso de Despedida — los 3 se comportan correctamente.
2. **10 imágenes sin archivo real (`src:null`) en las 9 unidades** mostraban un recuadro de placeholder visible (mismo criterio que los videos ya retirados en EOP-037, nunca se revisó ese sistema hermano en su momento). Se vaciaron los 10 registros — confirmado que el sistema (`enrichTeoria()`) ya estaba preparado para omitir el recuadro por completo cuando no hay registro, sin necesitar ningún cambio adicional.
3. **Texto del placeholder se cortaba a mitad de palabra** (`.slice(0,40)` sin mirar espacios). Corregido: ahora corta en el último espacio antes del límite y agrega "…" solo si de verdad hubo que acortar.
4. **Juego "Detective Químico" (Unidad I) no daba ningún dato inicial** — solo "MUESTRA MISTERIOSA" sin nombre, obligando a adivinar a ciegas o pagar por una pista en el primer intento con cualquier muestra desconocida. Se agregó el nombre real de la muestra como dato gratuito visible desde el inicio (ej. "Agua destilada") — la clasificación (elemento/compuesto/mezcla/coloide) sigue exigiendo razonamiento químico real, las 3 pistas pagas se mantienen intactas para quien no reconozca la sustancia.

Auditoría: `node --check` limpio en 56/56 archivos tras las 4 correcciones; recorrido funcional completo (18/18 pasos) sin regresiones.

### EOP-039 — Preparación del repositorio para GitHub
Sprint de organización, sin ningún cambio funcional ni de identidad visual.

- **Limpieza (Fase 1):** revisión completa — 0 archivos temporales, backups, duplicados o experimentales encontrados (ya venían limpios desde EOP-035).
- **Estructura (Fase 2):** confirmada — con una aclaración honesta: no se forzaron carpetas `games/`, `simulators/` ni `audio/` de una plantilla genérica, porque no reflejan la arquitectura real (juegos/simuladores viven como funciones dentro de cada `unit-0X.js`; no existe sistema de audio implementado). Ver nota de transparencia en `README.md`.
- **README (Fase 3):** agregadas las secciones Capturas de pantalla (marcada honestamente como pendiente — sin navegador real disponible en este entorno para generarlas), Tecnologías, Autor (separado de Créditos), y Versión.
- **`CONTRIBUTING.md`** (Fase 4), **`CODE_OF_CONDUCT.md`** (Fase 5, Contributor Covenant 2.1), **`SECURITY.md`** (Fase 6) — creados por primera vez.
- **CHANGELOG (Fase 7):** se agregó un bloque de registro oficial de versión en el encabezado (Beta v1.0, estado, última corrección funcional).
- **GitHub Release (Fase 8):** preparado `GITHUB_RELEASE_DRAFT.md` — listo para copiar y pegar al crear el Release real en GitHub, combinando notas de versión, known issues y roadmap futuro.
- **Sin `git init`, sin publicar** — tal como se indicó explícitamente. El repositorio queda organizado y documentado, el paso de inicializar Git y subirlo queda pendiente para cuando se autorice.

### FINAL HOTFIX-02 — Desafío Final PNE integrado
Se incorporó "PNE — Prueba Nacional Estandarizada" como experiencia final desbloqueable y acumulativa, reutilizando exclusivamente arquitectura y bancos ya existentes.

- **Nuevo módulo:** `js/modules/pne-final.js` — desbloqueo automático al aprobar los exámenes de las 9 unidades, generación balanceada de 30 preguntas (mínimo 3 por unidad + 3 aleatorias, sin duplicados, distinta combinación cada intento), resultados con desempeño por unidad, estadísticas propias persistentes, lectura por voz bajo demanda (nunca automática), y reacciones de Photon usando exclusivamente estados ya existentes.
- **Persistencia:** `data.pne` agregado a `storage.js` (aditivo).
- **Gamificación:** 3 insignias nuevas + 2 entradas de XP con reglas anti-farming (XP completo solo en la primera aprobación; bonificación solo al mejorar el mejor resultado propio).
- **Tarjeta en "Todas las Unidades":** bloqueada/desbloqueada con contador X/9, reutilizando el mismo lenguaje visual ya usado para insignias bloqueadas.
- **Hallazgo real durante el desarrollo:** la integración pendiente de la Unidad I (documentada en el diagnóstico HOTFIX-01) resultó tener una causa más profunda de lo que parecía — a `unit-01.js` le faltaba por completo la clave `pne:` en su `QI.registerUnit()` (el punto real donde `qi.js` registra el banco adaptado en `PNEBank`). Agregar solo `present()` no alcanzaba. Ya corregido y verificado.
- Auditoría: `node --check` limpio en 57/57 archivos; 22/22 pruebas de la lista de verificación obligatoria en PASS, más una prueba adicional end-to-end con el DOM real.
- **"Desafío Final PNE integrado, validado y listo para actualización de MásQueCiencia Beta."**

### HOTFIX-03 — Umbral de desbloqueo de PNE: de 9/9 a mínimo 5/9
Cambio explícito solicitado por el usuario tras probar la plataforma.

- Actualizado en las 3 ubicaciones donde la condición vivía de forma independiente (podían haber quedado inconsistentes entre sí si se cambiaba solo una): `js/modules/pne-final.js` (guardia real de acceso al módulo), `js/modules/units.js` (estado visual de la tarjeta), `js/core/gamification.js` (condición de la insignia "Desafío Desbloqueado").
- Mensajes de texto actualizados en los 3 lugares donde mencionaban "las 9 unidades" para reflejar el nuevo mínimo de 5.
- Verificado con prueba de caso límite exacto: 4/9 aprobadas sigue bloqueado, 5/9 desbloquea correctamente — en el módulo, en la tarjeta, y en la insignia, los 3 de forma consistente.
- `node --check` limpio en 57/57 archivos.

### HOTFIX-04 — PhotonSound: sonidos por estado, primera implementación real
Resuelve un hallazgo documentado desde el QA de Beta (EOP-034): "los sonidos funcionan" siempre había marcado como no aplicable porque el sistema nunca existió. Ahora sí.

- **Nuevo módulo:** `js/shared/photon-sound.js` — 5 tonos generados en código con Web Audio API (sin archivos de audio, 0 peso agregado, 100% offline), validados primero en un laboratorio de prueba interactivo antes de integrarse. Mapeados a los estados reales de Photon: Motivación (correcto), Ayuda (incorrecto, suave), Celebración (examen aprobado / insignia desbloqueada — comparten el mismo tono porque ya comparten el mismo estado), Nivel (subida de nivel), Desafío (inicio de examen).
- **Integración de un solo punto:** el sonido se engancha dentro de `photon.js` → `setState()`, justo después del guardián de prioridad (EOP-038) — no se tocó ninguna de las 9 unidades ni gamification.js. Una reacción que el guardián de prioridad ignora (por ejemplo, "motivación" intentando interrumpir "nivel") tampoco suena — verificado explícitamente con prueba.
- **Preferencia persistente**, activada por defecto, con su propio interruptor en el panel de Accesibilidad (mismo lugar de interfaz que las banderas de PNE, pero código completamente independiente — el sonido no es una bandera de accesibilidad).
- Auditoría: `node --check` limpio en 58/58 archivos; 6/6 pruebas del sistema de sonido (activado por defecto, tono real al reaccionar, silencio en estados sin tono asignado, silencio en reacciones bloqueadas por prioridad, silencio total al desactivar, persistencia en Storage); recorrido de regresión completo sin fallos.

### HOTFIX-05 — Uniformidad visual de tarjetas en "Todas las Unidades"
Corrección puramente visual, confirmada en navegador real por el usuario: la fila con la tarjeta PNE se veía más alta que las demás.

- **Causa raíz real:** la tarjeta PNE tenía una línea de subtítulo extra que ninguna otra tarjeta tiene, y su mensaje de "bloqueado" era una oración larga que se envolvía a 2-3 líneas dentro de una fila que en el resto de las tarjetas siempre es de una sola línea — `.unit-card` usaba `min-height` (no una altura fija), así que el grid completo se estiraba para acomodar ese contenido más alto.
- **Archivos modificados (2):** `css/main.css` (altura fija de 192px + recorte de texto a 2 líneas, con `overflow` como respaldo — escrito con el selector `.units-grid .unit-card` para no afectar las tarjetas de Inicio, que ya se veían bien y no se tocaron) y `js/modules/units.js` (se fusionó el subtítulo dentro de la misma zona flexible que usan las demás tarjetas, y se acortó el texto de bloqueo, referenciando la constante real `PNE_MIN_UNITS` en vez de un número suelto).
- **Verificación real, no solo teórica:** se renderizó el CSS real con `wkhtmltoimage` (motor WebKit) en 3 anchos (1200px, 768px, 375px) y se inspeccionaron las imágenes resultantes — confirmado que las 10 tarjetas quedan con la misma altura en los 3 casos, incluso forzando nombres de unidad deliberadamente largos como prueba de estrés.
- **Confirmado: sin cambios funcionales.** La lógica de desbloqueo, PNE, unidades, progreso, gamificación, Photon, sonidos y navegación quedaron exactamente iguales — verificado con una prueba de regresión de 6 casos (incluyendo que el desbloqueo con 5/9 sigue funcionando idéntico y las 36 combinaciones unidad:pestaña siguen intactas).
- `node --check` limpio en 58/58 archivos.

### MULTIGRADO Fase 1 — Arquitectura de continuidad Química 10.º → 11.º
Infraestructura completa para convertir MQC en un sistema multigrado — sin desarrollar todavía el contenido de Química 11.º. Ver `docs/multigrado/` para la documentación completa (5 documentos + informe de QA).

- **Decisión de arquitectura central:** no se re-anidó el esquema existente bajo una estructura "grade10/grade11" — se investigó primero y se confirmó que `Storage.load()` ya hacía un *merge* profundo automático con el esquema por defecto, así que agregar 4 claves nuevas (`profileMeta`, `identityLock`, `grade11Unlock`, `grade11`) fue toda la "migración" necesaria — los perfiles existentes las reciben solas.
- **Identificador único e inmutable** por perfil (`MQC-XXXXXX`), generado en creación/reset/importación.
- **Bloqueo progresivo de identidad**: nombre y grupo se bloquean automáticamente al aprobar el primer examen de cualquier unidad — detectado en un único punto (`Gamification.checkBadges()`), sin tocar ninguna de las 9 unidades. Avatar y preferencias nunca se bloquean.
- **Química 11.º desbloqueable** con 2 rutas independientes (6/9 exámenes de décimo, o PNE ≥80) — verificado en el límite exacto (5 no alcanza, 6 sí; 79 no alcanza, 80 sí).
- **3 archivos nuevos:** metadata de las 4 unidades de 11.º (todas "En desarrollo"), el selector de ruta académica ("Selecciona tu ruta científica"), y la vista de Química 11.º — reutilizando el 100% del Design System existente (0 líneas de CSS nuevas, hereda directamente el arreglo de uniformidad de tarjetas de HOTFIX-05).
- **Mi Progreso y Bitácora actualizados** de forma aditiva: nueva sección de identidad académica + resumen por nivel; filtro de la Bitácora por grado (Todo/10.º/PNE/11.º), clasificando el historial existente sin modificar su texto guardado.
- Auditoría: `node --check` limpio en 61/61 archivos; 47 pruebas ejecutadas (migración, identidad, desbloqueo, navegación, datos) — 100% en PASS.
- **"Arquitectura multigrado 10.º → 11.º integrada, migrada y lista para incorporar las cuatro experiencias de Química 11.º."**

### HOTFIX-06 — Bloqueo de recompensas repetidas del Proyecto Integrador (bug crítico)
Corregido un bug crítico de gamificación confirmado en navegador real: el botón "Entregar informe y completar el proyecto" podía presionarse repetidamente, otorgando +300 XP cada vez.

- **Causa raíz real:** la variable que decidía si ya se había premiado se leía **una sola vez al dibujar la pantalla**, no en cada clic — un segundo clic sin recargar la pantalla nunca veía que el primero ya había completado el proyecto.
- **Corrección en dos capas:** el botón se deshabilita mientras procesa (interfaz), y la función real que otorga XP siempre relee el estado fresco desde Storage antes de decidir (idempotente por diseño, no solo por la interfaz).
- **Protección retroactiva:** perfiles que ya tenían `completado:true` de antes de este hotfix dejan de recibir XP adicional desde el primer clic posterior, sin esperar una reparación manual.
- **Esquema formalizado:** `data.integrador` (antes implícito) ahora incluye `xpAwarded`, `xpAwardedAt`, `submissionCount`, `completedAt`, `lastUpdatedAt` — sin renombrar los campos históricos (`informe`, `completado`, `fecha`).
- **Nueva herramienta de reparación** (`js/shared/integrador-repair.js`) para perfiles ya afectados por el bug — diagnostica duplicados, calcula el XP a corregir, y solo aplica con confirmación explícita (nunca automática). Limitación documentada honestamente: no revoca insignias, ya que el sistema actual no tiene mecanismo de revocado.
- **Hallazgo adicional documentado, fuera de alcance:** `section-visited` (5 XP) se otorga sin protección en cada visita a la sección — mecanismo genérico preexistente, no el bug reportado, no se modificó.
- Auditoría: `node --check` limpio en 63/63 archivos; 17/18 pruebas en PASS (la única salvedad es la misma advertencia benigna de Photon ya documentada en sprints anteriores). El primer intento de estas pruebas falló por una limitación real del arnés de prueba (no del código real) — corregida antes de confiar en los resultados.
- **"Recompensa del Proyecto Integrador protegida contra duplicación y entregas posteriores habilitadas sin XP adicional."**

### HOTFIX-07 — Portal de Entrada inaccesible en móvil real (sin scroll)
Bug reportado por el usuario con capturas reales de un teléfono: en móvil real, el formulario del Portal se cortaba después de nombre/grupo/insignia — no aparecía el botón para continuar, y no había forma de desplazarse para verlo. En "modo escritorio" del navegador sí funcionaba.

- **Causa real:** `.mqc-gate-stage` usaba `max-height: 94vh` — pero `vh` en navegadores móviles reales se calcula contra el viewport SIN la barra de direcciones (más alto de lo visible en realidad), así que el límite calculado podía exceder el espacio verdaderamente disponible en pantalla. Es un problema documentado y conocido de los navegadores móviles, no exclusivo de este proyecto.
- **Corrección (solo CSS, aditiva):** se agregó `max-height: 94dvh` (dynamic viewport height, se ajusta a la barra de direcciones real) como mejora progresiva — declarada después de la regla `vh` existente a propósito, así que los navegadores que no soportan `dvh` simplemente la ignoran y siguen usando `vh` sin romperse.
- **Respaldo adicional:** se agregó `overflow-y:auto` al overlay compartido (`_overlay()` en `profiles-ui.js`, usado por el Portal y otros paneles como la vista cronológica) — si en algún dispositivo el contenido interno sigue siendo más alto que el espacio real disponible, el propio contenedor externo también puede desplazarse, para que el usuario nunca quede sin forma de ver el resto del formulario.
- Se revisó `.mqc-gate-card` (`overflow:hidden`) como sospechoso alternativo — se confirmó que es solo para recortar la animación decorativa de la línea superior, no limita altura; no se tocó.
- **Limitación honesta:** este entorno no tiene un navegador móvil real disponible para confirmar visualmente la corrección exactamente como se ve en las capturas del usuario — el arreglo se basa en la causa documentada y ampliamente conocida de este comportamiento, y es puramente aditivo (no puede empeorar nada en navegadores que ya funcionaban bien).
- Archivos modificados: `css/main.css`, `js/shared/profiles-ui.js`. `node --check` limpio en 63/63 archivos.

### MEJORA — Identidad Multigrado del sidebar
La cabecera del sidebar mostraba "QUÍMICA 10°" como si fuera la marca principal, incluso estando en Química 11.º o en la pantalla de selección de ruta.

- **Nueva jerarquía visual (4 líneas):** MÁSQUECIENCIA (marca permanente) → "Explora · Comprende · Aplica" (lema, siempre igual) → ruta académica dinámica (cambia según el grado activo) → Lic. Bryan Chavarría C. (autor, sin cambios).
- **Actualización automática, no manual:** la ruta dinámica se engancha en `_setActive()` de `router.js` — el mismo punto que YA se ejecuta en cada `Router.navigate()` — así que nunca puede desincronizarse de la sección real que el estudiante está viendo, sin necesitar tocar ningún módulo individual.
- **3 estados de la ruta:** "QUÍMICA 10.º" (cualquier sección de décimo), "QUÍMICA 11.º" (sección `grade11`), "Química Interactiva 10.º y 11.º" (pantalla de selección de ruta, sin grado activo todavía).
- La topbar móvil se actualiza en sincronía exacta con el sidebar (mismo mecanismo, un id adicional).
- No se modificó el logotipo, colores, tipografía base ni la estructura general del sidebar — solo se reutilizaron los tokens y la jerarquía tipográfica ya existentes.
- Archivos modificados: `index.html`, `css/main.css`, `js/core/router.js`. Verificado con 6/6 pruebas (incluyendo que volver de 11.º a 10.º restaura el texto correcto). `node --check` limpio en 63/63 archivos.

### IMP-11-U01 — Química 11.º, Unidad I: El Agua (primera unidad real de 11.º)
Primera unidad completamente funcional de Química 11.º, construida sobre la Arquitectura Pedagógica Oficial ya aprobada — patrón oficial para las 3 unidades restantes.

- **Auditoría previa real:** se estudió `unit-02.js` (Química 10.º) antes de escribir código, replicando su patrón exacto (`UNIT_PLUGINS`, registro de plugins, ciclo MQC) con un namespace paralelo (`data.grade11`, `GRADE11_UNIDADES_DATA`, `Storage.updateGrade11Unit()`) — nunca se tocó ni se reorganizó nada de Química 10.º.
- **Hallazgo real al retomar el sprint:** gran parte del contenido (el archivo completo de la unidad, los 2 bancos de preguntas, las funciones paralelas de Storage, la insignia) ya existía, pero `js/modules/grade11.js` seguía sin poder mostrar ninguna unidad activa — el contenido existía pero era inalcanzable. Se reescribió ese módulo para soportar el camino real de pestañas, y se registraron los 3 scripts que faltaban en `index.html`.
- **Contenido:** 6 temas de teoría, 3 simuladores interactivos reales (ninguno automático), 1 juego con rondas aleatorias, examen de 30 preguntas (20 por intento, balanceado por categoría, todas superando el mínimo exigido), banco PNE adaptado con cobertura 30/30, y una misión de cierre corta con la misma protección anti-farming de HOTFIX-06.
- **Insignia "Primera Gota"**, con condición de finalización real (verificado explícitamente que no se otorga con una sola parte completa).
- Progreso de Química 11.º separado de Química 10.º; perfiles antiguos (sin `data.grade11`) reciben la estructura automáticamente vía el mismo mecanismo de *merge* ya usado en toda la Fase Multigrado.
- Auditoría: `node --check` limpio en 65/65 archivos; 18/18 pruebas en PASS. El primer intento de la batería de pruebas falló por una limitación real del arnés de prueba (no del producto) — corregida antes de confiar en los resultados, documentada con transparencia en `IMP_11_U01_REPORT.md`.
- **"Unidad I — El Agua integrada, validada y lista para publicación gradual en MásQueCiencia."**

### HOTFIX-08 — Sesgo predecible en el examen de Química 11.º Unidad I + recordatorio en la misión
Reportado por el usuario tras probar la unidad real: la mayoría de las respuestas del examen caían en la opción A.

- **Causa confirmada con datos:** 29 de las 30 preguntas del banco (`preguntas-g11-u01.js`, y su espejo adaptado `banco-pne-g11-u01.js`) tienen la respuesta correcta almacenada en el índice 0 — un sesgo real en los datos. El examen nunca mezclaba el ORDEN de las opciones (solo mezclaba qué preguntas se seleccionaban), así que ese sesgo llegaba intacto a la pantalla.
- **Corrección de raíz:** cada pregunta seleccionada para un intento ahora mezcla el orden de sus opciones una única vez, al construir el examen (`startExam()`) — no en cada render, para que la opción que el estudiante ya marcó siga correspondiendo a la misma opción. Se remapea `correcta` y `explicacion_incorrectas` al nuevo orden, mismo patrón ya probado en el Desafío Final PNE de décimo.
- **Verificado con una muestra estadística real:** se mezclaron las 30 preguntas 200 veces y se confirmó una distribución casi perfectamente uniforme entre las 4 posiciones (24.7% / 24.6% / 25.0% / 25.7%) — el sesgo original desaparece por completo sin alterar cuál respuesta es la correcta.
- **Mejora adicional solicitada:** la misión "Informe de la primera muestra" ahora incluye un recordatorio rápido y colapsable (composición de H₂O, polaridad, enlace vs. fuerza intermolecular, regla de solubilidad) para que el estudiante no tenga que salir de la unidad ni volver a un tema de Química 10.º mientras escribe su informe — colapsado por defecto, para no distraer ni alargar la pantalla.
- Archivo modificado: `js/units/grade11/g11-u01.js` únicamente. `node --check` limpio en 65/65 archivos.

### UI-REFINEMENT — Pantalla de carga con identidad multigrado oficial
La pantalla de carga inicial todavía mostraba "QUÍMICA INTERACTIVA 10°" y "Tu laboratorio te espera" — textos exclusivos de décimo, ya no representativos de la plataforma multigrado.

- **Nueva jerarquía:** MÁSQUECIENCIA (marca principal) → Química Interactiva (descriptor) → 10.º • 11.º (alcance multigrado) → "Construyendo tu espacio de aprendizaje..." (mensaje dinámico, frase oficial exacta, sin variantes).
- Cambio puramente visual/textual — cero cambios de lógica: se verificó que ninguna función JS dependiera del texto o las clases anteriores antes de tocar nada.
- Se agrupó la jerarquía de marca en un bloque compacto propio, para no alterar el espaciado general ya aprobado de la pantalla (`#loading-screen` sigue teniendo exactamente 3 "huecos" de espaciado: átomo → bloque de marca → mensaje, igual que antes con átomo → marca → subtítulo).
- **Agregado (pedido explícito del ticket, antes ausente):** respaldo real de `env(safe-area-inset-*)` en los 4 lados de la pantalla de carga, para respetar el notch y el indicador de inicio de iPhone.
- `prefers-reduced-motion` ya estaba cubierto por una regla global (`*, *::before, *::after`) que aplica automáticamente a cualquier texto nuevo — no se necesitó ninguna regla adicional.
- Verificado visualmente con `wkhtmltoimage` en 3 anchos (1200px, 768px, 340px — este último más angosto que la mayoría de teléfonos reales): el mensaje de carga se envuelve a 2 líneas de forma natural en anchos extremos, sin desbordamiento horizontal ni texto cortado.
- Archivos modificados: `index.html`, `css/main.css`. `node --check` limpio en 65/65 archivos.

### IMP-11-U02 — Química 11.º, Unidad II: Cálculo de Concentraciones
Segunda unidad real de Química 11.º, construida sobre el patrón oficial ya validado en la Unidad I (IMP-11-U01).

- **Auditoría previa real:** se revisó `MQCChem` (motor de cálculo compartido) y `unit-07.js` (Soluciones, décimo) antes de escribir código. `MQCChem` ya tenía `molarity`, `percentMassMass`, `percentMassVolume`, `molarMass` — reutilizados directamente. Le faltaban `percentVolumeVolume` (% v/v) y `ppm`, agregadas ahí mismo como ampliación aditiva, no dentro de la unidad.
- **Hallazgo real repetido y corregido a tiempo:** al escribir las 40 preguntas del banco, 38 quedaron con la respuesta correcta en la posición A — el mismo sesgo exacto de HOTFIX-08. Se incorporó la mezcla de opciones al examen **desde su diseño inicial**, no como parche posterior — verificado con 300 repeticiones dando una distribución casi perfecta (24.9/25.1/25.1/25.0%).
- **Continuidad narrativa real:** se encontró que la misión de cierre de la Unidad I solo tenía 3 preguntas (no las 5 previstas originalmente) — faltaba exactamente la pregunta puente que este sprint necesitaba. Se agregó esa única pregunta faltante a la Unidad I, tal como el ticket autorizaba explícitamente ("conexión narrativa mínima y necesaria").
- **Contenido:** 7 temas de teoría, 3 simuladores (Constructor de Concentraciones, Laboratorio de Molaridad, Analista de Agua en ppm — los 3 usan MQCChem directamente, ninguno recalcula por su cuenta), juego "Código de la Muestra" (exige identificar la unidad correcta antes de calcular), examen de 40 preguntas (20 por intento, 6 categorías todas superando el mínimo), banco PNE con cobertura 40/40, misión de cierre con la misma protección anti-farming ya establecida.
- **Insignia "Precisión Química"**, mismo patrón exacto de finalización real que "Primera Gota".
- **Validación matemática doble:** cada fórmula se verificó con un script de Python independiente antes de escribir las preguntas, y de nuevo ejecutando las funciones reales de MQCChem en la batería de pruebas — incluyendo un caso combinado real (29.25 g de NaCl → 0.5 mol → 1.0 mol/L).
- Auditoría: `node --check` limpio en todos los archivos; 24/24 pruebas funcionales en PASS más la verificación estadística del examen.
- **"Unidad II — Cálculo de concentraciones integrada, verificada y lista para publicación gradual en MásQueCiencia."**

### HOTFIX-09 — Scroll táctil real en iOS (el Portal seguía sin desplazarse en iPhone)
El usuario reportó, con capturas de un iPhone real, que el Portal seguía sin poder desplazarse hacia abajo para llegar al botón "Crear" — a pesar de HOTFIX-07. En Android, el modo "escritorio" lo ocultaba (por tener más alto disponible, no porque el scroll funcionara).

- **Causa real encontrada:** faltaba `-webkit-overflow-scrolling: touch` — la propiedad específica de iOS Safari necesaria para que el gesto de deslizar el dedo funcione dentro de un contenedor con `overflow-y:auto` anidado dentro de un elemento `position:fixed` (como el overlay de pantalla completa del Portal). Sin ella, muchas versiones de iOS permiten el scroll con mouse/trackpad pero no responden en absoluto al gesto táctil — exactamente la diferencia observada entre "modo escritorio" y uso real.
- Se agregó esta propiedad (+ `overscroll-behavior:contain`, para evitar que el scroll se "escape" hacia el fondo de la página) al Portal y a los 4 contenedores con scroll interno del overlay compartido (Administrador de Perfiles, Bitácora, vista cronológica, Mis Reflexiones).
- **Segunda capa de seguridad agregada:** en pantallas de poca altura real (`max-height:700px` / `580px`), se reduce el espacio decorativo del titular y subtítulo, para que en la mayoría de los celulares el formulario quepa sin necesitar desplazarse en absoluto. Se verificó explícitamente que esta reducción por sí sola NO alcanza — confirma que el arreglo del scroll táctil es la pieza realmente necesaria, no un extra cosmético.
- **Limitación honesta:** este entorno no tiene un iPhone real para confirmar que el gesto de deslizar ya funciona — la corrección se basa en la causa documentada y estándar de este comportamiento en iOS Safari. Se pide confirmación del usuario en su dispositivo real antes de dar esto por cerrado.
- Archivos modificados: `css/main.css`, `js/shared/profiles-ui.js`. `node --check` limpio.

### IMP-11-U03 — Química 11.º, Unidad III: Química Orgánica I (Hidrocarburos y Nomenclatura)
Tercera unidad real de Química 11.º, sobre el mismo patrón oficial de las 2 anteriores.

- **Motor de nomenclatura orgánica nuevo en MQCChem:** `alkaneFormula()`, `alkeneFormula()`, `alkyneFormula()` — no existía antes de este sprint, agregado como ampliación aditiva (mismo patrón que % v/v y ppm en la Unidad II).
- **Validación exhaustiva de nomenclatura**, tal como exigía explícitamente el ticket: las 28 combinaciones posibles dentro del alcance (10 alcanos, 9 alquenos, 9 alquinos — no existen alqueno/alquino de 1 carbono) se verificaron dos veces, contra la tabla de referencia conocida, más una verificación cruzada adicional (cada familia tiene exactamente 2 hidrógenos menos que la anterior, para el mismo número de carbonos).
- **Contenido:** 7 temas, 3 simuladores (Constructor Molecular, Laboratorio de Enlaces, Detector Orgánico — los 3 usan el motor real, ninguno calcula a mano), juego "Misión Carbono" contra reloj, examen de 40 preguntas (mezcla de opciones incorporada desde el diseño, verificada con 300 repeticiones dando distribución pareja), banco PNE con cobertura 40/40, misión de cierre que conecta con la Unidad IV.
- **Insignia "Cadena de Carbono"**, mismo patrón de finalización real que las 2 unidades anteriores.
- Se confirmó explícitamente que las Unidades I y II siguen funcionando sin cambios tras agregar esta unidad.
- Auditoría: `node --check` limpio; 27/27 pruebas funcionales en PASS.
- **"Unidad III integrada, validada y lista para pruebas."**

### IMP-11-U04 — Química 11.º, Unidad IV: Química de la Vida (Grupos Funcionales y Biomoléculas)
**Última unidad de contenido de Química 11.º.** Con este sprint, las 4 unidades quedan completas — solo falta el PNE de 11.º.

- **Discrepancia real encontrada y resuelta con transparencia:** el ticket pedía "verde esmeralda 🧬" para esta unidad — idéntico, palabra por palabra, al ya pedido para la Unidad III. Se confirmó que `g11-u04` ya tenía naranja (`#FFA94D`) asignado desde la Fase 1 Multigrado, consistente con el diseño de 4 colores distintos — se mantuvo ese color en vez de crear dos unidades visualmente idénticas.
- **Nueva función oficial: Atlas Químico MQC** — colección de 13 fichas (9 grupos funcionales + 4 biomoléculas), con registro persistente de descubrimiento por perfil. Verificado explícitamente que no otorga XP y que es idempotente (no se puede "redescubrir" lo mismo dos veces). Nueva vista con su propio ítem de sidebar, reutilizando el 100% del Design System existente.
- **Contenido:** 7 temas, 3 simuladores (todos conectados al Atlas: Constructor de Grupos Funcionales, Clasificador de Biomoléculas, Impacto Biológico), juego "Detective Molecular", examen de 40 preguntas (mezcla de opciones incorporada desde el diseño, distribución verificada con 300 repeticiones), banco PNE con cobertura 40/40, misión de cierre que resume la investigación completa de las 4 unidades.
- **Insignia final "Arquitecto de la Vida"**, cerrando el mismo patrón de finalización real de las 3 unidades anteriores — las 4 insignias de unidad de Química 11.º quedan completas.
- Se confirmó explícitamente que Química 10.º y las Unidades I-III no cambiaron.
- Auditoría: `node --check` limpio; 22/22 pruebas funcionales en PASS.
- **"Unidad IV integrada, Atlas Químico MQC implementado y Química 11.º lista para iniciar el desarrollo del PNE."**

### HOTFIX-10 PREMIUM — Transformación pedagógica de la Unidad IV: de definiciones aisladas a interpretación molecular
El ticket pedía un cambio de enfoque real, no un ajuste cosmético: la PNE nunca pregunta "¿qué es un alcohol?" aislado — presenta una estructura completa y exige interpretarla. Toda la Unidad IV se reorienta hacia esa habilidad, sin tocar ninguna otra unidad ni el núcleo (Router/MQCChem/XP/Mentor/Perfiles/Photon).

- **Hallazgo real al retomar el sprint:** una sesión anterior ya había preparado la "materia prima" de este hotfix (Atlas ampliado a 11 grupos con Éter y Amida, banco de 9 moléculas reales, renderizador de estructuras `MoleculeRenderer`, los 3 registrados en `index.html`) pero nunca la había conectado al contenido real que ve el estudiante — `g11-u04.js` seguía siendo la versión anterior a IMP-11-U04, sin Escáner Molecular, sin usar ninguno de esos archivos. Este sprint completa la conexión, verificada archivo por archivo antes de escribir código nuevo (regla de oro §1 de `PROJECT_CONTEXT.md`).
- **Escáner Molecular (simulador nuevo, también es el "Nivel 2: Reconocimiento" del Constructor):** el estudiante toca directamente sobre el segmento de una molécula real (9 disponibles: aspirina, acetaminofén, ibuprofeno, cafeína, ácido acético, etanol, acetona, glucosa, alanina) usando el renderizador interactivo ya preparado. Acierto → resalta en verde y explica el grupo; error → resalta el correcto y explica por qué. `markSimDone` sigue siendo idempotente — no se otorga XP infinito por repetir moléculas, tal como exige el ticket §4.
- **2 temas de teoría nuevos:** "Biomoléculas — lo que revela su estructura" (diagramas de flujo visuales: carbohidrato→muchos –OH→afinidad con agua, lípido→menos oxígeno→reserva energética, proteína→nitrógeno→aminoácidos, ácido nucleico→fósforo→información genética) y "Comparaciones estructurales directas" (alcohol vs. ácido carboxílico, éter vs. éster, amina vs. amida — usando `MoleculeRenderer` para dibujar ambas estructuras lado a lado — más 2 comparaciones de biomoléculas). Ningún párrafo largo nuevo: solo diagramas y una frase de diferencia clave por par, tal como pedía el ticket §§6-7.
- **Juego "Detective Molecular" evolucionado:** las rondas ahora mezclan las pistas de texto originales con casos de estructura completa (una de las 9 moléculas reales, renderizada, preguntando qué grupo SÍ está presente) — mayor semejanza con una PNE real, sin quitar los casos que ya funcionaban.
- **Examen — nueva categoría "interpretación molecular" (8 preguntas nuevas, mínimo real de 4 por intento):** identificación de grupos en moléculas reales completas, moléculas con más de un grupo funcional (aspirina, acetaminofén, alanina), y comparación estructural directa (etanol vs. ácido acético, éter vs. éster) — banco total 40→48 preguntas, con su banco PNE espejo también actualizado (cobertura verificada 48/48, sin preguntas huérfanas).
- **Nueva misión "Laboratorio de Análisis Molecular"**, que reemplaza la misión anterior: el estudiante recibe 3 estructuras químicas reales de dominios distintos (ácido acético — muestra ambiental/alimenticia, glucosa — alimento con biomolécula, ibuprofeno — producto cotidiano), debe identificar sus grupos funcionales con justificación, relacionar estructura con función, y proponer una aplicación o impacto ambiental sustentado en la estructura — no en opinión. Mantiene exactamente la misma protección anti-farming (idempotente, XP una sola vez, mínimo de texto para entregar).
- **Sin duplicación de código, pensado para el futuro Centro Nacional de Preparación PNE (ticket §12):** el Escáner Molecular, las comparaciones de teoría, el juego y la misión reutilizan el mismo trío de datos (`MOLECULAS_REALES` + `ATLAS_QUIMICO_DATA` + `MoleculeRenderer`) sin que ninguno reimplemente su propio renderizador o su propia data.
- **Verificación real ejecutada (no solo lectura de código):** `node --check` limpio en el 100% de los `.js` del proyecto; carga real de los 4 archivos de datos con Node confirmando 11/11 grupos, 4/4 biomoléculas, 9/9 moléculas reales, 0 referencias de grupo inválidas, 48 preguntas con IDs únicos y cobertura PNE 48/48; simulación de 500 exámenes balanceados generados confirmando siempre 20 preguntas por intento y siempre ≥4 de "interpretación molecular"; comparación binaria contra el ZIP original confirmando que **solo 3 archivos cambiaron en todo el proyecto** (`g11-u04.js`, `preguntas-g11-u04.js`, `banco-pne-g11-u04.js`) — Química 10.º, las Unidades I-III de Química 11.º, el núcleo, y el resto del Atlas/renderizador/moléculas (ya preparados en la sesión anterior) quedan exactamente igual.
- Archivos modificados: `js/units/grade11/g11-u04.js`, `js/data/grade11/preguntas-g11-u04.js`, `js/data/grade11/banco-pne-g11-u04.js`. Archivos reutilizados sin cambios: `js/data/grade11/atlas-quimico.js`, `js/data/grade11/moleculas-reales.js`, `js/shared/molecule-renderer.js`.
- **"HOTFIX-10 PREMIUM completado. La Unidad IV fue transformada en un módulo de interpretación molecular alineado con la metodología del MEP y preparada como base oficial para el futuro Centro Nacional de Preparación PNE de MásQueCiencia."**

