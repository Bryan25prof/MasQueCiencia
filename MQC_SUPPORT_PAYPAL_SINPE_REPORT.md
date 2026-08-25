# MQC_SUPPORT_PAYPAL_SINPE_REPORT.md
## Integración "Apoya MásQueCiencia" — PayPal + SINPE Móvil

**Fecha:** 2026-08-25
**Tipo de cambio:** Aditivo (nuevo módulo + 2 archivos existentes editados de forma mínima)
**Archivos del núcleo académico tocados:** NINGUNO

---

## 1. Objetivo

Agregar una sección de apoyo voluntario al proyecto (PayPal + SINPE Móvil), completamente independiente de calificaciones, XP, PNE, perfiles y Analytics. Discreta, elegante, coherente con la identidad visual de MQC.

---

## 2. Archivos creados

| Archivo | Contenido |
|---|---|
| `js/shared/support.js` | Módulo `window.MQCSupport`: modal de apoyo (PayPal + SINPE), tarjetas inline para "Acerca de" y resultado del Simulacro PNE 11.º, copiar SINPE al portapapeles, toast de confirmación. |
| `MQC_SUPPORT_PAYPAL_SINPE_REPORT.md` | Este informe. |

## 3. Archivos modificados (cambios mínimos)

| Archivo | Cambio exacto |
|---|---|
| `index.html` | (a) Agregado `<script src="js/shared/support.js">` tras `launcher.js`. (b) Agregado un botón discreto `<button id="sidebar-support-link">♡ Apoyar</button>` en el sidebar, **debajo** de toda la navegación académica y por encima del pie de página existente. |
| `css/main.css` | Agregada una sección nueva al final del archivo ("23. APOYA MÁSQUECIENCIA") con todos los estilos del enlace del sidebar, el modal y las tarjetas inline. **Ninguna regla existente fue modificada.** |

## 4. Archivos del núcleo — CERO modificaciones

Por la regla de arquitectura del proyecto (núcleo académico congelado), **no se tocó**:
- `js/core/router.js`
- `js/modules/simulacro-nacional.js`
- `js/shared/simulacro-nacional-adapter.js`
- `js/core/storage.js`, `js/core/gamification.js`
- Ningún archivo de `js/units/*`

**¿Cómo se inyectan entonces las tarjetas en "Acerca de" y en el resultado del Simulacro PNE 11.º, si esas pantallas las generan `router.js` y `simulacro-nacional.js`?**

`support.js` usa un `MutationObserver` sobre `#content` — observa desde **afuera** cuándo aparece la pantalla de "Acerca de" (busca el texto "Acerca de la Plataforma") o el resultado del Simulacro PNE 11.º (busca el botón `#sn-revisar`, que solo existe en la vista de resultados ya completa, nunca durante el examen ni en la pantalla de entrada). Cuando detecta cualquiera de las dos, inserta la tarjeta correspondiente en el DOM ya renderizado. Es el mismo espíritu que ya usa `analytics-hooks.js` para envolver `Storage`/`MQCProfiles` sin editarlos — aquí, en vez de envolver funciones, se observa el DOM.

Ventaja adicional: si en el futuro se reescribe `simulacro-nacional.js` o `router.js` sin cambiar esos dos selectores (`#sn-revisar` y el texto de "Acerca de"), la integración de apoyo sigue funcionando sin ningún ajuste.

## 5. Integración PayPal

- Se usa el **SDK oficial** de PayPal (`https://www.paypalobjects.com/donate/sdk/donate-sdk.js`), cargado dinámicamente solo cuando se abre el modal (no en cada carga de página).
- `hosted_button_id: 'FZEHA45PT5QHJ'` — **sin modificar**, exactamente como se entregó.
- No se maneja ningún pago directamente, no se almacena información financiera, no se usa ninguna clave secreta.
- Si el SDK no carga (sin conexión), se muestra un mensaje de error discreto en vez de romper el modal.

## 6. Integración SINPE Móvil

- Número visible: **8308-3905**.
- Botón "📋 Copiar número" copia **83083905** (sin guion) al portapapeles vía `navigator.clipboard.writeText`, con `fallback` a `execCommand('copy')` para navegadores/contextos sin esa API.
- Al copiar se muestra el toast **"✅ Número SINPE copiado"** reutilizando el sistema de toasts existente (`#toast-container`, mismas clases `.toast`/`.toast-success`).
- No se integra banca, no se solicita comprobante, no se recopila información bancaria.

## 7. Ubicaciones

| Ubicación | Implementación |
|---|---|
| **A. Acerca de la Plataforma** | Botón `♡ Apoyar MQC` insertado al final de la tarjeta placeholder, debajo de "Volver al Inicio". |
| **B. Sidebar** | Botón discreto `♡ Apoyar` debajo de toda la navegación académica, con estilo sutil (no compite visualmente con las secciones de estudio). |
| **C. Resultado del Simulacro PNE 11.º** | Tarjeta con mensaje ("¿MásQueCiencia te ayudó a prepararte?...") y botón `💙 APOYAR MÁSQUECIENCIA`, insertada **después** de nota, proyección, análisis por ciencia y de los propios botones de acción (Revisar/Nuevo intento/Historial). Se confirmó mediante prueba automatizada que **nunca aparece** en la pantalla de entrada ni durante el examen — solo existe cuando ya está presente `#sn-revisar` (exclusivo de la vista de resultados). |

Los tres puntos abren el **mismo modal** (`MQCSupport.openModal()`), una sola fuente de verdad para PayPal + SINPE.

## 8. NO Paywall (verificado)

- No se agregó ningún bloqueo de intentos, condición de acceso, XP por donar, medallas por donar, ni desbloqueos.
- El límite de intentos del Simulacro PNE 11.º, la nota, la proyección, el historial, el selector y las preguntas **no fueron tocados**.
- La tarjeta de apoyo es puramente informativa/voluntaria.

## 9. Analytics

- **No se registró ningún evento** (ni `support_button_opened` ni ningún otro). El proyecto no tiene todavía una tabla/infraestructura genérica de eventos anónimos en Supabase (`analytics-queue.js` solo empuja a tablas específicas ya definidas: `unitExamResults`, `pneAttempts`, `pneAnswers`, `students`) — agregar una nueva tabla implicaría tocar `SUPABASE_SCHEMA.sql` y las políticas RLS, algo que el propio pedido marca como no obligatorio. Se deja fuera por ahora.
- No se registra cuánto donó nadie, quién donó, ni información de PayPal/SINPE — el módulo no tiene ninguna llamada de red propia salvo el SDK oficial de PayPal.

## 10. Seguridad

- Cero credenciales, cero `service_role`, cero secretos financieros en el código.
- Solo se usa: el SDK público oficial de PayPal + el `hosted_button_id` público + el número de SINPE público.

## 11. Pruebas realizadas (Chromium real vía Playwright)

Siguiendo la regla del proyecto ("todo cambio se prueba con Chromium real vía Playwright, no alcanza con `node --check`"):

| # | Prueba | Resultado |
|---|---|---|
| 1 | `node --check js/shared/support.js` | ✅ Sin errores de sintaxis |
| 2 | Modal se abre desde el enlace del sidebar | ✅ |
| 3 | Botón de PayPal presente en el modal (`#mqc-donate-button`) | ✅ (SDK no cargó por falta de red en el entorno de prueba — comportamiento esperado y manejado con gracia; en producción con internet real carga el botón oficial) |
| 4 | Número SINPE visible: `8308-3905` | ✅ |
| 5 | Botón "Copiar número" dispara toast "✅ Número SINPE copiado" | ✅ |
| 6 | Modal cierra correctamente (botón ✕, overlay, tecla Esc) | ✅ |
| 7 | Tarjeta "♡ Apoyar MQC" aparece en "Acerca de la Plataforma" | ✅ (confirmado con captura de pantalla) |
| 8 | Tarjeta de apoyo aparece en el resultado del Simulacro PNE 11.º, después de nota/proyección/análisis/botones | ✅ (simulado con la firma DOM real de `simulacro-nacional.js`, sin editar ese archivo) |
| 9 | Tarjeta de apoyo NO aparece en pantalla de entrada del Simulacro PNE 11.º | ✅ |
| 10 | Protección contra inyección duplicada al re-renderizar la misma pantalla | ✅ |
| 11 | Navegación no se rompe: Inicio, Unidades, Química 11.º, Tabla Periódica, Mi Progreso, Atlas Químico, Acerca de | ✅ (sin errores de consola en ningún caso) |
| 12 | Botones originales del Simulacro PNE 11.º (`#sn-revisar`, `#sn-nuevo-intento`, etc.) siguen intactos tras la inyección | ✅ |

## 12. Responsive — verificado

| Dispositivo | Viewport probado | Resultado |
|---|---|---|
| PC / Desktop | 1440×900 | ✅ Sin errores, navegación completa funcional |
| iPhone | 414×896 | ✅ Sin errores, navegación completa funcional |
| Android | 390×844 | ✅ Sin errores, navegación completa funcional, modal y SINPE legibles y usables desde celular |

No se detectó scroll horizontal ni desbordamiento en ningún tamaño probado.

## 13. No regresión — verificado

Se confirmó, en los tres tamaños de pantalla, que las siguientes secciones siguen renderizando contenido normalmente tras la integración: **Inicio, Unidades 10.º, Química 11.º, Tabla Periódica, Mi Progreso, Atlas Químico, Acerca de**. No se modificó `Storage`, `Gamification`, el sistema de perfiles, ni `Analytics`.

---

## DECLARACIÓN FINAL

**"Apoya MásQueCiencia — PayPal + SINPE Móvil integrado de forma voluntaria, segura y sin afectar el núcleo académico."**
