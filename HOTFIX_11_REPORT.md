# HOTFIX-11 — Informe de Implementación
## Intro cinematográfica de ingreso + ajustes de identidad de marca

---

## 1. Proceso seguido antes de tocar el proyecto real

Esta actualización no empezó en el proyecto principal. Se construyeron y probaron **4 prototipos aislados** (Variantes A, B, C, D), cada uno en un único archivo HTML autocontenido, sin ningún vínculo con MQC — siguiendo al pie de la letra la instrucción explícita del docente de "no integrar nada hasta recibir aprobación expresa". Solo después de comparar las 4 y recibir instrucciones concretas de mezcla y ajuste se construyó la Variante D final, y solo después de la aprobación de esa variante se integró al proyecto real. Este documento cubre exclusivamente esa integración final.

## 2. Alcance real de esta actualización

Verificado con `diff -rq` binario contra el ZIP inmediatamente anterior (post-HOTFIX-10): **solo 5 rutas cambiaron en todo el proyecto.**

| Archivo | Tipo de cambio |
|---|---|
| `css/intro.css` | Nuevo |
| `js/shared/intro.js` | Nuevo |
| `index.html` | Modificado (overlay de la intro + 2 rótulos de marca) |
| `css/main.css` | Modificado (glow del ícono de "Acerca de") |
| `js/core/router.js` | Modificado (rótulo de marca fijo + ícono/texto de "Acerca de") |

**No se tocó:** el componente oficial de Photon (`js/shared/photon.js`, `css/photon.css`), el sistema de perfiles, XP, medallas, el loading screen existente, ninguna unidad de Química 10.º ni 11.º, ni ningún otro archivo del proyecto.

## 3. Intro cinematográfica de ingreso

### 3.1 Secuencia
1. **Consola de arranque** — líneas de sistema apareciendo una por una, con checks OK (idéntica a la aprobada en el prototipo).
2. **Lluvia periódica** — símbolos químicos cayendo en columnas por toda la pantalla.
3. **Escáner** — una línea cruza de izquierda a derecha; cada columna que toca queda "leída y bloqueada" al instante (mientras las columnas a la derecha del escáner siguen cayendo con normalidad), terminando en una onda de choque + flash + "IDENTIDAD VERIFICADA".
4. **Laboratorio + Photon** — el fondo Cosmos MQC se revela (moléculas flotando, partículas), aparece Photon (representación provisional, ver §4), "Todo listo." → "Comencemos."
5. **Identidad de marca** — crédito "Lic. Bryan Chavarría C." + "MÁSQUECIENCIA" + "Química Interactiva · 10.º • 11.º" + "Tú defines tu éxito, comienza ahora." + botón "Entrar al laboratorio".

### 3.2 Comportamiento en producción
- Se muestra **una sola vez por navegador**, controlado por `localStorage.getItem('mqc_intro_seen_v1')`. El flag se guarda al presionar "Entrar al laboratorio" (saltar la animación con "Saltar intro" solo adelanta hasta ese botón — no marca la intro como vista por sí solo).
- Si `localStorage` no está disponible (modo privado estricto, políticas del navegador, etc.), la lectura/escritura falla dentro de un `try/catch` silencioso y la intro simplemente se muestra en cada visita — nunca bloquea el acceso a la plataforma.
- El overlay tiene `display:none` por defecto en el HTML — para un estudiante que ya la vio, no hay ningún parpadeo ni costo de renderizado.
- Controles reales de producción: sonido ON/OFF y "Saltar intro", siempre visibles. Se eliminó por completo el panel de pruebas del prototipo (repetir, velocidad, alternar A/B/C) — ninguno de esos controles forma parte de la experiencia final.
- Sonido sintetizado en el momento con Web Audio API (osciladores), sin archivos de audio externos que descargar.

### 3.3 Decisión de arquitectura: por qué Photon aparece en forma provisional
Se evaluó activamente usar el componente oficial `window.Photon` (que ya existe en el proyecto, con SVG vectorial, ojos, estados de ánimo, etc. — mucho más rico que un simple orbe). Al revisar `js/shared/photon.js` se confirmó que `Photon.mount()` es una **instancia única por diseño de arquitectura** (`if (inst) destroy();` al inicio de `mount()`).

El problema real: `js/app.js` monta el Photon oficial en el sidebar (`#photon-root`) tan pronto como hay un perfil activo — lo cual, para cualquier estudiante que **ya tenga un perfil creado antes de este HOTFIX**, puede ocurrir en los primeros milisegundos de carga, en paralelo mientras la intro (que se muestra la primera vez que carga esta actualización, incluso para usuarios con perfil ya activo) todavía está en pantalla. Si la intro también hubiera llamado a `Photon.mount()`, ambos montajes competirían por la misma instancia — y dependiendo del orden de ejecución, el Photon del sidebar podía terminar sin aparecer para el resto de la sesión.

Se optó por la representación **provisional** (núcleo con gradiente + 3 órbitas, mismos colores de marca), exactamente como pedía el brief original de la demo aislada ("usar una representación provisional coherente con el Photon actual. NO rediseñar el personaje oficial."). Esta decisión se mantuvo también en la integración real precisamente porque evita cualquier posibilidad de conflicto con la instancia única del componente oficial.

## 4. Identidad de marca — rótulo fijo

Antes de este HOTFIX, la línea de ruta académica del sidebar/topbar (`#sidebar-route-label`, `#topbar-route-label`) cambiaba dinámicamente según la sección activa: "QUÍMICA 10.º" en secciones de Décimo, "QUÍMICA 11.º" en la sección de Once, "Química Interactiva 10.º y 11.º" solo en el selector de grado. Por pedido explícito del docente, ahora es un **rótulo fijo**: "QUÍMICA INTERACTIVA 10.º Y 11.º", sin importar qué sección esté viendo el estudiante. El mecanismo de actualización (`_updateBrandRoute()` en `js/core/router.js`) se conserva estructuralmente por si se decide revertir este comportamiento en el futuro — revertirlo sería cambiar solo esa función, sin tocar nada más.

## 5. "Acerca de la Plataforma"

- **Ícono**: ℹ️ (genérico) → ⚛️ (átomo), coherente con el propio logo vectorial de MQC (`#mqc-atom-logo`), con un glow cian/violeta pulsante exclusivo de esta sección. El mecanismo de páginas placeholder es compartido por varias secciones de la plataforma (simuladores, laboratorio, juegos, examen, etc.) — se agregó un flag opcional (`iconGlow`) que activa el glow solo cuando la metadata de la sección lo pide, así que ninguna otra página placeholder cambia visualmente.
- **Texto**: reemplazado por el nuevo copy del docente, con ajustes ortográficos mínimos (acento en "más", puntuación) para mantener consistencia con el resto del proyecto.

## 6. Pruebas ejecutadas

| # | Prueba | Método | Resultado |
|---|---|---|---|
| 1 | Sintaxis de todo el proyecto | `node --check` en el 100% de los `.js` | ✅ |
| 2 | Sin IDs duplicados ni `<div>` desbalanceados en `index.html` | Verificación real con Python/regex | ✅ |
| 3 | Las 17 referencias de elementos usadas por `intro.js` existen en el HTML | Cruce automático de IDs | ✅ |
| 4 | Alcance: solo 5 rutas cambiaron en todo el proyecto | `diff -rq` binario contra el ZIP post-HOTFIX-10 | ✅ |
| 5 | Photon oficial, perfiles, XP, medallas y unidades intactos | Confirmado por la prueba 4 (0 diferencias fuera de esas 5 rutas) | ✅ |

**Limitación honesta:** este entorno no tiene navegador real. La secuencia de animación (timings, transición entre fases, sonido) se diseñó y ajustó primero en 4 prototipos aislados que sí se revisaron visualmente fuera de este entorno; la integración al proyecto real se verificó a nivel de sintaxis, referencias e impacto de archivos, no con una ejecución visual en navegador desde acá. Se recomienda una verificación visual rápida antes de publicar, prestando especial atención a: (a) que la intro se vea completa la primera vez, (b) que no vuelva a aparecer al recargar, y (c) que el Photon real del sidebar aparezca con normalidad después de cerrar la intro.
