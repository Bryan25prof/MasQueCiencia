# HOTFIX-13 — Informe de Implementación
## 3 problemas reales reportados en iPhone físico

---

## 1. Alcance

Verificado con `diff -rq` binario: **5 archivos cambiaron**, ninguno nuevo.

| Archivo | Problema que corrige |
|---|---|
| `js/shared/intro.js` | La intro se marcaba "vista" antes de tiempo + compuerta de sonido |
| `index.html` | Markup de la compuerta "Toca para comenzar" |
| `css/intro.css` | Estilos de la compuerta + limpieza de una regla perdida |
| `css/main.css` | Scroll anidado en la pantalla de crear perfil (bug de iPhone) |
| `js/shared/profiles-ui.js` | Mismo bug de scroll anidado en otros paneles del perfil |

## 2. Problema 1 — La intro se repetía menos de lo esperado

**Reportado:** al recargar la página sin haber terminado de crear un perfil, la intro no volvía a aparecer.

**Causa raíz:** la marca de "intro ya vista" (`localStorage`) se guardaba apenas el estudiante hacía clic en "Entrar al laboratorio" — un clic que ocurre ANTES de crear el perfil, no después. Si cerraba la pestaña o recargaba en el medio, la próxima carga encontraba la marca puesta y saltaba directo a la pantalla de perfiles sin intro.

**Corrección:** la condición para saltar la intro ahora es doble — `localStorage` marcado en '1' **Y** al menos un perfil real ya creado (`MQCProfiles.count() > 0`). Mientras cualquiera de las 2 condiciones falle, la intro se repite. Una vez que el estudiante completa su primer perfil real, ambas condiciones se cumplen para siempre y la intro no vuelve a aparecer.

## 3. Problema 2 — Formulario de crear perfil cortado en iPhone

**Reportado:** en iPhone (Safari), el grid de insignias y el botón "Crear tu perfil científico" quedaban fuera de la pantalla, sin ninguna forma de desplazarse para verlos. En Android, la misma pantalla se veía perfecta.

**Causa raíz confirmada leyendo el código** (no supuesta): `.mqc-gate-atmosphere` (contenedor de toda la pantalla, `position:fixed`) tenía `overflow:hidden`, mientras que `.mqc-gate-stage` (el contenido real, anidado adentro) tenía su propio `max-height` + `overflow-y:auto`. Dos contenedores con scroll anidados, uno dentro de otro `position:fixed` — es un patrón con un bug documentado y conocido de iOS Safari: el scroll del contenedor interno deja de responder al gesto de deslizar el dedo, aunque funcione perfecto con mouse/trackpad (que es exactamente por qué se veía bien en escritorio y en Android, pero no en iPhone).

Ya se habían intentado 2 correcciones anteriores sobre este mismo síntoma (HOTFIX-07 con `dvh`, HOTFIX-09 con `-webkit-overflow-scrolling:touch`) — ambas ajustaban propiedades del contenedor interno sin atacar la causa real: la anidación en sí.

**Corrección:** se eliminó el scroll del contenedor interno (`.mqc-gate-stage` ahora crece a su altura natural, sin límite propio) y el contenedor exterior (`.mqc-gate-atmosphere`) pasó a ser el único que se desplaza (`overflow-y:auto`, manteniendo `overflow-x:hidden` para que la sangría decorativa de las moléculas de fondo no genere una barra de scroll horizontal). Se aplicó el mismo diagnóstico y corrección a `js/shared/profiles-ui.js` (función `_panel()`, compartida por otros paneles del perfil: línea de tiempo, reflexiones), que tenía exactamente el mismo patrón de doble scroll.

## 4. Problema 3 — El audio no sonaba al inicio

**No era un bug de código.** Es una política de seguridad que aplican **todos** los navegadores modernos (Chrome, Safari, Firefox, Edge) por igual: ningún sitio puede reproducir sonido sin que el usuario haya realizado antes un gesto real y directo (un toque o clic genuino) en la página. No existe ninguna forma de saltarse esto desde el código — es una restricción del navegador, no del sitio.

**Solución real implementada (no un intento de evadir la política, sino trabajar con ella):** se agregó una compuerta breve al inicio de la intro — "Toca para comenzar, con sonido activado" — antes de que arranque cualquier otra animación. El mismo toque que cierra esa compuerta **es** el gesto real que los navegadores exigen, así que desbloquea el audio en ese instante. Recién después de ese toque arranca la secuencia completa (consola, lluvia de elementos, escáner, Photon, identidad) — así que, desde la perspectiva del estudiante, el sonido está activo desde el primer frame real de la experiencia.

## 5. Verificación

| # | Prueba | Método | Resultado |
|---|---|---|---|
| 1 | Sintaxis de todo el proyecto | `node --check` en el 100% de los `.js` | ✅ |
| 2 | CSS balanceado | Conteo de llaves en los 4 archivos CSS | ✅ (95/95, 477/477, 31/31, 131/131) |
| 3 | `index.html` íntegro | Sin IDs duplicados, `<div>` balanceados | ✅ |
| 4 | Alcance total | `diff -rq` contra el ZIP anterior | ✅ Solo 5 archivos cambiaron |
| 5 | `MQCProfiles.count()` existe y está expuesto | Verificado leyendo la API pública real del módulo | ✅ |
| 6 | Orden de carga de scripts | `profiles.js` carga antes que `intro.js` en `index.html` | ✅ (línea 432 vs. 516) |

**Limitación honesta:** este entorno no tiene un iPhone físico ni navegador real — el diagnóstico del bug de scroll se hizo leyendo el código y identificando el patrón exacto documentado como problemático en iOS Safari, no reproduciéndolo visualmente desde acá. Se recomienda que el docente confirme en su iPhone real que el formulario completo (incluido el botón "Crear y entrar") ya es alcanzable con scroll normal.
