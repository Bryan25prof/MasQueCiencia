# MQC DESIGN SYSTEM — Documento Maestro de Identidad Visual
## MásQueCiencia · Versión 1.0 · EOP-029
**Única fuente de verdad visual de la plataforma.** Todo lo aquí documentado proviene directamente del código real del proyecto, aprobado y congelado a través de los sprints EOP-016 a EOP-030. Ningún valor de este documento fue inventado para su redacción — cada token, cada regla y cada componente citado existe hoy en `css/main.css`, `css/standards.css`, `css/photon.css` y los documentos de identidad de "La Curiosidad".

> **Regla de uso de este documento:** cualquier persona (o IA) que construya una pantalla nueva de MásQueCiencia debe poder hacerlo leyendo únicamente este documento, sin tomar ninguna decisión de diseño por su cuenta. Si una situación no está cubierta aquí, se consulta antes de improvisar — no se inventa una variante nueva.

---

## 1. Filosofía visual

MásQueCiencia no es un LMS (Learning Management System) ni pretende parecerlo. Es un **laboratorio científico moderno, elegante y tecnológicamente avanzado** — la identidad visual completa ("Cosmos de Laboratorio") existe para sostener esa sensación en cada pantalla, no como decoración sino como parte del argumento pedagógico: la ciencia se comprende mejor cuando el entorno mismo transmite curiosidad, precisión y calma.

Tres referentes explícitos guían el lenguaje visual: **visualización científica real** (NASA, observatorios, planetarios), **divulgación científica premium** (Kurzgesagt), y **plataformas de aprendizaje que ya lograron una identidad propia reconocible** (Duolingo, Brilliant) — nunca clones de Moodle, Classroom o cualquier LMS genérico.

## 2. Principios de diseño

1. **Contención sobre espectáculo.** El impacto viene de la moderación, no de la cantidad de efectos. Si algo se siente "llamativo", probablemente está mal calibrado.
2. **Profundidad sin ruido.** Glow, sombras y capas se usan para dar sensación de espacio real, nunca para decorar por decorar.
3. **Movimiento extremadamente lento por defecto.** Toda animación ambiental (fondos, halos, partículas) se mide en decenas de segundos, no en milisegundos — la excepción son las microinteracciones puntuales (hover, aparición de paneles).
4. **Un solo protagonista por pantalla.** El contenido y la idea son el protagonista; los elementos decorativos (fondo vivo, retículas moleculares, el Fotón) siempre acompañan, nunca compiten.
5. **Nada se reinterpreta sin un sprint explícito.** Colores, tipografía, y la identidad de "La Curiosidad" están congelados — un desarrollador no tiene autoridad para variarlos por iniciativa propia.

## 3. Personalidad de la plataforma

| Rasgo | Cómo se manifiesta visualmente |
|---|---|
| Serena | Fondos oscuros profundos, movimiento lentísimo, ausencia de parpadeos o alertas agresivas |
| Precisa | Tipografía monoespaciada para datos/fórmulas, geometría exacta en retículas y órbitas |
| Cálida sin ser infantil | Glow suave, paleta viva pero nunca saturada al extremo, ilustraciones nunca caricaturescas |
| Premium | Espaciado generoso, sombras profundas, nunca interfaces recargadas |
| Curiosa | El Fotón y los detonantes del Método MQC — la plataforma invita a preguntar antes de explicar |

## 4. Paleta oficial

### Fondos
| Token | Valor |
|---|---|
| `--void` | `#070714` |
| `--bg-deep` | `#0d0d24` |
| `--bg-main` | `#111130` |
| `--bg-card` | `#16163a` |
| `--bg-elevated` | `#1e1e4a` |
| `--bg-input` | `#1a1a42` |

### Bordes
| Token | Valor |
|---|---|
| `--border` | `rgba(130, 140, 220, 0.38)` |
| `--border-glow` | `rgba(0, 212, 255, 0.5)` |

### Acentos
| Token | Valor | Uso |
|---|---|---|
| `--cyan` | `#1FDBFF` | Acento primario de toda la plataforma |
| `--cyan-dim` | `#00A8CC` | Variante oscura (degradados, hover) |
| `--violet` | `#7B2FFF` | Acento secundario (antes un teal duplicado — corregido en EOP-021 a un violeta real) |
| `--violet-dim` | `#6320CC` | — |
| `--green` | `#00FF88` | Éxito, confirmaciones |
| `--green-dim` | `#00CC6D` | — |
| `--orange` | `#FF6B00` | Alertas suaves |
| `--red` | `#FF2266` | Errores del sistema (nunca usado por "La Curiosidad", que tiene su propia paleta) |
| `--gold` | `#FFD700` | Énfasis de texto general (saludos, hero) — **no XP** |
| `--xp-gold` | `#F9FF4D` | Dedicado **exclusivamente** a XP, Nivel, Medallas y Logros (EOP-023) |

### Texto
| Token | Valor | Contraste verificado |
|---|---|---|
| `--text-primary` | `#E8E8FF` | 16.6:1 sobre `--void` |
| `--text-secondary` | `#9898CC` | 7.34:1 sobre `--void` |
| `--text-muted` | `#8484D6` | 5.96:1 sobre `--void` (corregido en EOP-014 desde `#5858AA`, que fallaba AA) |
| `--text-on-accent` | `#070714` | Para texto sobre fondos de acento sólido |

### Colores por unidad (9)
| Unidad | Color |
|---|---|
| I | `#00BCD4` |
| II | `#1A73E8` |
| III | `#00C853` |
| IV | `#9C27B0` |
| V | `#FF6F00` |
| VI | `#E91E63` |
| VII | `#607D8B` |
| VIII | `#FF5722` |
| IX | `#795548` |

### Colores de categoría (Tabla Periódica)
`--el-nonmetal:#6fcd8c` · `--el-alkali:#ff7070` · `--el-alkaline-earth:#ffaa57` · `--el-transition:#5bb8ff` · `--el-post-transition:#b5d44a` · `--el-metalloid:#4de8c2` · `--el-halogen:#c18fff` · `--el-noble:#82e8ff` · `--el-lanthanide:#ff95d0` · `--el-actinide:#ffd966` · `--el-unknown:#8899aa`

**Regla no negociable:** `--gold` y `--xp-gold` nunca se intercambian. Si un elemento no es XP/Nivel/Medalla/Logro, usa `--gold`; si lo es, usa `--xp-gold`. Confundirlos vuelve a la plataforma "amarilla" sin querer.

## 5. Tipografía

| Token | Familia | Uso |
|---|---|---|
| `--font-display` | Space Grotesk | Títulos, encabezados de sección, nombres de estado |
| `--font-body` | Inter | Todo el texto corrido, botones, descripciones |
| `--font-code` | JetBrains Mono | Datos, fórmulas químicas, XP, coordenadas, etiquetas técnicas |

No existen pesos ni familias adicionales aprobados. Nunca usar una cuarta tipografía "solo para un detalle".

## 6. Sistema de color (aplicación semántica)

- **Cian** = identidad/navegación por defecto (estado Reposo, foco, enlaces activos).
- **Violeta** = momentos de mayor significancia emocional (Celebración, Despedida, Proyecto Integrador).
- **Verde** = confirmación/progreso positivo.
- **Oro (`--gold`)** = énfasis de texto no relacionado con XP.
- **Oro fosforescente (`--xp-gold`)** = exclusivamente XP/Nivel/Medallas.
- **Rojo** = errores del sistema (formularios, validación) — nunca para "La Curiosidad".
- **Colores de unidad** = exclusivamente para identificar la unidad activa (tarjetas, acentos de unidad); nunca se usan como acento general de UI.

## 7. Espaciados

El proyecto no define una escala formal de tokens de espaciado (`--space-1`, `--space-2`, etc.) — el espaciado se expresa directamente en `rem` dentro de cada regla, siguiendo esta convención observada de forma consistente en el código real:

| Contexto | Valor típico |
|---|---|
| Padding interno de botones | `0.6rem 1.25rem` (base), `0.85rem 2rem` (lg), `0.35rem 0.85rem` (sm) |
| Padding interno de cards | `1.25rem` |
| Separación entre elementos de una lista/grid | `0.5rem`–`0.9rem` |
| Padding de contenedores de sección | `1.5rem`–`2rem` |

**Regla:** usar siempre `rem`, nunca `px`, para espaciado interno de componentes (excepto en elementos de posicionamiento fijo como `#photon-root`, que usa `px` porque ancla a un punto exacto de pantalla).

## 8. Grid y layout

- **Sidebar:** `--sidebar-width: 240px` en desktop, `260px` en el primer breakpoint móvil (`max-width:767px`).
- **Topbar (solo móvil):** `--topbar-height: 56px`.
- **Breakpoints reales confirmados:** `480px`, `640px` (`css/standards.css`) y `767px`, `768px`, `1024px`, `1400px` (`css/main.css`).
- El contenido principal (`#content`) es flexible (`flex:1`), nunca de ancho fijo, salvo estilos de página específicos (ej. `.progress-page{max-width:900px}`).

## 9. Bordes

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `8px` | Botones pequeños, chips |
| `--radius-md` | `14px` | Botones, inputs, badges de perfil |
| `--radius-lg` | `22px` | Cards, unit-cards |
| `--radius-xl` | `30px` | Paneles grandes (portal de entrada) |
| `--radius-full` | `9999px` | Barras de progreso, badges circulares, botones tipo píldora |

Todo borde de color usa `--border` (`rgba(130,140,220,.38)`) por defecto; `--border-glow` (`rgba(0,212,255,.5)`) se reserva para estados de foco/hover/énfasis.

## 10. Glow

El glow es parte de la identidad, no un efecto ocasional. Reglas:
- Todo glow se construye a partir de la variante `-glow` del color correspondiente (`--cyan-glow`, `--xp-gold-glow`), nunca de un color inventado.
- Los halos de "La Curiosidad" son siempre de **dos capas**: un halo primario (contenido, borde relativamente definido) y un halo secundario/bloom (difuso, baja opacidad) — nunca una sola capa.
- El glow comunica **magnitud**: mayor intensidad/tamaño = mayor logro (Nivel > Celebración > Motivación). Nunca usar el glow más intenso disponible para un evento menor.

## 11. Sombras

| Token | Valor |
|---|---|
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.5)` |
| `--shadow-glow` | `0 0 20px var(--cyan-glow)` |
| `--shadow-modal` | `0 8px 48px rgba(0,0,0,0.85)` |

Las sombras siempre profundizan hacia el negro puro (`rgba(0,0,0,X)`), nunca hacia un color — el color vive en el glow, no en la sombra de profundidad.

## 12. Botones

```css
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  font-family:var(--font-body); font-weight:700; border-radius:var(--radius-md);
  padding:.6rem 1.25rem; font-size:.9rem; border:1.5px solid transparent; letter-spacing:.02em; }
```
- `.btn-primary`: degradado `--cyan-dim → --cyan`, texto `--text-on-accent`, hover con elevación (`translateY(-2px)`) y glow `--cyan-glow`.
- `.btn-secondary`: fondo `--bg-elevated`, borde `--border`.
- `.btn-ghost`: transparente, hover a `--bg-elevated`.
- `.btn-danger` / `.btn-success`: variantes semánticas (error/confirmación).
- Modificadores de tamaño: `.btn-lg`, `.btn-sm`, y `.btn-block` (ancho completo).

**Regla:** la acción principal de cualquier pantalla es siempre `.btn-primary`, nunca más de una por vista; las acciones secundarias usan `.btn-ghost` o enlaces de texto simple (ver Portal de Entrada, EOP-022).

## 13. Cards

```css
.card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:1.25rem; transition:var(--transition-normal); }
```
Variante especializada `.unit-card` (mismo lenguaje, `min-height:180px`, `display:flex; flex-direction:column`), usada para las 9 unidades en Inicio y en el listado de Unidades. Las credenciales de perfil (`.mqc-badge-profile`, EOP-022/023) son una variante de card con borde izquierdo de acento — reservada exclusivamente al Portal de Entrada.

## 14. Inputs

```css
.welcome-input { background:var(--bg-input); border:1.5px solid var(--border); border-radius:var(--radius-md);
  padding:.85rem 1.25rem; color:var(--text-primary); font-size:1rem; text-align:center; }
```
Foco: cambia el borde a `--cyan` (mismo lenguaje que `:focus-visible` global, ver Accesibilidad §25). Existe una variante `.qi-overlay-input` para inputs dentro de overlays/paneles flotantes, mismo lenguaje visual.

## 15. Badges

- `.nav-badge` — etiqueta pequeña, mayúsculas, `--radius-full`. Variante `.nav-badge.soon` (violeta) — **ya no debe usarse** para secciones nuevas: el cierre del núcleo (EOP-014/019) eliminó todas las secciones "Próx." existentes; no reintroducir este patrón salvo autorización explícita.
- `.badge-item` — insignias del Sistema XP. Bloqueada: `filter:grayscale(1); opacity:.3`. Desbloqueada (`.unlocked`): borde y glow en `--xp-gold`, nunca `--gold`.

## 16. Progress Bars

```css
.progress-bar { height:8px; background:var(--bg-elevated); border-radius:var(--radius-full); overflow:hidden; }
.progress-fill { height:100%; border-radius:var(--radius-full); transition:width .8s cubic-bezier(.4,0,.2,1); }
```
Incluye un shimmer sutil (`.progress-fill::after`, blur + animación de 2s) en el extremo de la barra. Variantes de color: `.progress-fill-cyan/-violet/-green/-gold` (esta última ya usa `--xp-gold`, no `--gold`). También existe una variante circular (`.progress-circle`) para el Sistema XP en Mi Progreso.

## 17. Sistema de iconografía

**Estado real, sin idealizar:** la plataforma usa emoji nativos del sistema operativo como iconografía funcional en el 100% de los casos actuales (navegación, badges, botones de unidad). **No existe todavía un sistema de iconos SVG propio.** Esto es una limitación documentada, no una decisión de diseño definitiva — cualquier futuro sistema de iconos propio requiere su propio sprint de identidad antes de reemplazar los emoji existentes.

## 18. Sistema de ilustraciones

Dos familias de ilustración aprobadas, ambas construidas en SVG/CSS puro (nunca imágenes rasterizadas para elementos ambientales):

1. **Retícula molecular** (nanotubo/fullereno) — nodos y enlaces generados proceduralmente, nunca un grid ortogonal. Usada como fondo del Portal de Entrada (EOP-023).
2. **Fondo vivo ambiental** (`.mqc-living-bg`, `.mqc-stars`) — gradientes radiales de deriva lentísima + campo de estrellas estático. Usado en Home y como base reutilizable en otras superficies.

La única ilustración de personaje aprobada es **"La Curiosidad"** (§21). No existen otras ilustraciones de personaje ni mascotas adicionales.

## 19. Sistema de animaciones

Todas las animaciones ambientales del proyecto están construidas con keyframes CSS nativos (nunca JS de terceros ni librerías de animación). Principios:
- **Ambiental (fondo, decorativo):** duraciones de 20 a 165 segundos (ej. `mqcNebulaDrift`, `mqcMoleculeSpin`).
- **De estado/feedback (botones, tarjetas, foco):** 150–800ms, siempre con `cubic-bezier` o `ease`, nunca `linear` salvo rotaciones continuas.
- **De aparición de paneles:** secuencia de varias fases (~700–900ms totales), nunca un fundido instantáneo — ver `mqcConsoleShell`/`mqcLineDraw`/`mqcContentRise`/`mqcActionWake` del Portal de Entrada.
- **Siempre respetar `prefers-reduced-motion: reduce`** — cada bloque de animación ambiental tiene su contraparte que la desactiva.

## 20. Estados oficiales (La Curiosidad)

Los 10 estados oficiales — Reposo, Bienvenida, Motivación, Desafío, Celebración, Nivel, Ayuda, Pensando, Esperando, Despedida — están definidos y congelados en `LA_CURIOSIDAD_Character_Design_Document.md` y refinados en `LA_CURIOSIDAD_Adenda_Comportamiento.md`. Jerarquía de transformación:

| Nivel | Qué puede variar | Estados |
|---|---|---|
| A (80%) | Intensidad, velocidad orbital, respiración, brillo, color | Reposo, Bienvenida, Desafío, Celebración, Nivel, Ayuda, Esperando, Despedida |
| B (15%) | Todo lo anterior + geometría mínima cerrada (corazón, interrogante) | Motivación, Pensando |
| C (5%, reservado) | Sin definir — no implementado | Ninguno todavía |

## 21. La Curiosidad como entidad oficial

Pequeña entidad de energía, sin edad ni género, que representa la curiosidad científica — no un átomo, no una molécula, no una persona, no un profesor, no una IA, no un robot. Activo visual oficial: `assets/photon/photon-oficial.png` (aprobado y congelado, EOP-027). Posición y tamaño definitivos en la plataforma real: `top:96px; right:73px`, `124px` de diámetro (EOP-030). Componente técnico: `js/shared/photon.js` (API: `mount, setState, react, moveTo, orbit, show, hide, destroy` — congelada, no se modifica sin autorización).

**Experimento no integrado:** una capa opcional de "ojos energéticos" (EOP-028B) fue prototipada y validada visualmente, pero **no forma parte del activo oficial ni de la API congelada todavía** — vive únicamente en prototipos HTML de validación, pendiente de una decisión formal de integración.

## 22. Casos donde NO debe aparecer La Curiosidad

- Navegación simple entre secciones sin ningún progreso real de por medio.
- Abrir/cerrar Configuración, Accesibilidad o la Bitácora sin que eso represente un logro en sí mismo.
- Más de una vez dentro del cooldown ya activo de su propio estado (ver `LA_CURIOSIDAD_Reglas_de_Interaccion.md` §2).
- Superpuesta a botones, texto o contenido activo — su contenedor (`#photon-root`) siempre usa `pointer-events:none` en el ancla y nunca bloquea interacción.
- El Portal de Entrada (`openGate()`) — por decisión explícita, no tiene protagonismo ahí (EOP-022).

## 23. Casos donde SÍ debe aparecer

Ver tabla completa de disparo por estado en `LA_CURIOSIDAD_Reglas_de_Interaccion.md` §2. Resumen: inicio de sesión (Bienvenida), leer un tema o comprometerse en un simulador (Motivación, con cooldown de 90s), iniciar examen o unidad nueva (Desafío), aprobar examen o ganar el juego (Celebración), subir de nivel o completar el curso (Nivel), reprobar examen o fallar el mismo concepto repetidamente (Ayuda), espera de cálculo real (Pensando), inactividad prolongada en pantalla activa (Esperando), cierre de sesión o de una experiencia larga (Despedida).

## 24. Sistema de mensajes

- **Toasts** (`#toast-container`, esquina inferior derecha, `bottom:24px;right:24px`, `z-index:9990`): confirman XP ganada, subida de nivel, medallas — mensajes breves, siempre con ícono + título + descripción corta.
- **Mentor MQC**: mensajes contextuales por pestaña/tema, un mensaje a la vez, nunca texto largo.
- **Mensajes de bienvenida:** deben hablarle directamente al estudiante, nunca describir el estado del sistema ("Iniciando...", "Cargando..." están prohibidos desde EOP-024). Ejemplo aprobado: *"Tu laboratorio te espera."*
- **Mensaje inspirador del Portal de Entrada** (fijo, no varía): *"La ciencia empieza con una buena pregunta."*

## 25. Accesibilidad

- Contraste mínimo AA verificado en todos los tokens de texto sobre `--void`/`--bg-card` (ver tabla en §4).
- Navegación por teclado completa en el sidebar (`role="button"`, `tabindex="0"`, manejo de `Enter`/`Espacio`), modales con `role="dialog"`/`aria-modal`, `aria-current` dinámico en navegación activa, `aria-expanded` en el menú móvil.
- Sistema `PNE` (`js/shared/pne.js`): alto contraste, texto grande, lectura por voz (experimental) y modo simplificado (experimental) — estas dos últimas etiquetadas explícitamente como "(Experimental)" en la UI.
- Todo movimiento ambiental respeta `prefers-reduced-motion: reduce`.
- **Pendiente conocido, no bloqueante:** cobertura ARIA no exhaustiva en botones generados dinámicamente dentro de cada unidad; sin región `aria-live` para anunciar cambios de sección.

## 26. Responsive

Mobile-first en los componentes de navegación (sidebar colapsable con overlay, topbar visible solo bajo `767px`), fluid en el resto (`flex:1`, `grid-template-columns:repeat(auto-fit,...)` en grids de tarjetas). Ver breakpoints exactos en §8.

## 27. Tokens CSS (referencia completa)

Ver §4, §5, §9, §11 para el listado completo de valores. No existen tokens adicionales fuera de los ya documentados en este archivo — cualquier valor "suelto" encontrado en el código que no aparezca aquí debe considerarse una inconsistencia a corregir, no un token válido nuevo.

## 28. Componentes reutilizables

`.btn` (+ variantes), `.card`, `.unit-card`, `.welcome-input`/`.qi-overlay-input`, `.nav-badge`, `.badge-item`, `.progress-bar`/`.progress-fill` (+ variantes), `.mqc-badge-profile`, `.mqc-avatar-btn`, `.mqc-quick-access-item`, `.mqc-gate-*` (familia completa del Portal de Entrada, congelada), `.mqc-photon`/`.mqc-photon-asset` (contenedor técnico de La Curiosidad).

## 29. Ejemplos correctos

- Usar `--xp-gold` para el texto de nivel en el sidebar (`.user-level`) — es XP real.
- Construir una unidad nueva copiando el patrón de `unit-08.js`/`unit-09.js`, reutilizando `VIZ`/`MQCChem`, nunca redibujando desde cero.
- Agregar un botón secundario nuevo como `.btn-ghost`, nunca como un `.btn-primary` adicional en la misma vista.
- Disparar `Photon.react('exam-passed')` desde el motor de examen ya existente, nunca invocar `Photon.setState()` directo con un estado inventado.

## 30. Ejemplos incorrectos

- Usar `--gold` en un elemento de XP/Nivel/Medalla (confunde el sistema de acento dedicado).
- Agregar una cuarta tipografía "solo para este título".
- Crear una nueva silueta para "La Curiosidad" (ej. una estrella, un diamante) sin pasar por un sprint de identidad — el vocabulario de silueta está cerrado (átomo/corazón/interrogante, nada más).
- Integrar la capa experimental de "ojos energéticos" directamente en producción sin una aprobación formal separada de este documento.
- Reintroducir un badge `.nav-badge.soon` para una sección "próximamente" — esa categoría de UI fue eliminada deliberadamente en el cierre del núcleo (EOP-014/019).
- Sacar al Fotón de su posición/tamaño definitivos (`top:96px;right:73px`, `124px`) sin pasar por una validación explícita como la de EOP-030.

---

*Este documento reemplaza cualquier decisión de diseño ad-hoc. Ante una duda de implementación no cubierta aquí: consultar antes de inventar.*
