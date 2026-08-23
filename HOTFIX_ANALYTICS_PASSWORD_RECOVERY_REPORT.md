# HOTFIX_ANALYTICS_PASSWORD_RECOVERY_REPORT.md
## Recuperación segura de contraseña de administrador — MQC Analytics

**Fecha:** 2026-08-24
**Alcance:** exclusivamente `analytics/analytics-admin.js` y `analytics/analytics-admin.css` (el panel privado del docente). Ningún archivo de MásQueCiencia académico, el esquema de Supabase, RLS, o las tablas de Analytics fueron tocados.

---

## 1. Causa detectada

`analytics-admin.js` nunca revisaba el **fragmento de la URL** (la parte después del `#`) al arrancar. Cuando Supabase redirige un enlace de recuperación de contraseña, lo hace agregando los datos de la sesión de recuperación directamente ahí:

```
https://bryan25prof.github.io/MasQueCiencia/analytics/#access_token=...&refresh_token=...&type=recovery
```

La función `_init()` original solo hacía dos cosas: revisar si había una sesión guardada en `sessionStorage`, y si no, mostrar el login normal (`ACCESO RESTRINGIDO`). Nunca miraba `window.location.hash` — por eso, sin importar qué trajera el enlace del correo, el resultado siempre era la pantalla de login de siempre. No era un problema de configuración de Supabase (el correo llegaba bien, la redirección apuntaba al lugar correcto) — era, específicamente, que el frontend nunca leía lo que Supabase ya le estaba entregando correctamente en la URL.

## 2. Archivos modificados

| Archivo | Cambio |
|---|---|
| `analytics/analytics-admin.js` | Detección del fragmento de recuperación, 5 funciones nuevas de pantalla (olvidé mi contraseña / restablecer / éxito / enlace inválido), 3 llamadas nuevas a la API REST de Supabase (`recover`, `user` vía PUT), `_init()` reordenado para revisar el hash antes que la sesión guardada |
| `analytics/analytics-admin.css` | 2 líneas: estilo de los enlaces de texto (`¿Olvidaste tu contraseña?`, `← Volver a iniciar sesión`) |

Ningún otro archivo del proyecto (ni siquiera `analytics/index.html`) necesitó cambios.

## 3. Evento de Supabase utilizado — traducido a REST directo

Este panel **no usa el SDK de `supabase-js`** (decisión ya documentada desde la construcción original, para no agregar una dependencia externa) — habla directo con las APIs REST de Supabase vía `fetch`. Por eso, el flujo conceptual que describe la documentación de Supabase (`onAuthStateChange` + evento `PASSWORD_RECOVERY`, `updateUser({password})`) se tradujo así:

| Concepto (SDK) | Implementación real (REST directo) |
|---|---|
| Detectar `PASSWORD_RECOVERY` | Leer `window.location.hash` al arrancar con `_parseHashParams()`; si `type === 'recovery'` y hay `access_token`, es una recuperación válida |
| `resetPasswordForEmail(email, {redirectTo})` | `POST /auth/v1/recover?redirect_to=<url>` — el `redirect_to` se calcula dinámicamente a partir de la URL actual del panel (`origin + pathname`), nunca depende únicamente de la Site URL global de Supabase |
| `updateUser({password})` | `PUT /auth/v1/user` con `Authorization: Bearer <access_token del enlace>` (no el de una sesión de login normal) y `{password: nuevaPassword}` en el cuerpo |
| Enlace expirado/inválido | Supabase agrega `#error=...&error_code=...&error_description=...` en vez de `type=recovery` — se detecta igual, mostrando la pantalla de "enlace no válido" |

## 4. Flujo implementado

```
Pantalla normal (ACCESO RESTRINGIDO)
  └─ "¿Olvidaste tu contraseña?" → pantalla "Recuperar acceso"
        └─ ingresa correo → POST /auth/v1/recover?redirect_to=...
              └─ siempre muestra el mismo mensaje neutro
                 ("si el correo corresponde a una cuenta válida...")
                 — nunca confirma si el correo existe o no

Se abre el enlace del correo (carga fresca de la página)
  └─ _init() detecta type=recovery + access_token en el hash
        └─ muestra RESTABLECER CONTRASEÑA (nunca el login normal)
              ├─ valida: ambos campos llenos, coinciden, mínimo 6 caracteres
              ├─ PUT /auth/v1/user con el access_token del enlace
              ├─ éxito → limpia el hash de la URL, muestra pantalla de éxito
              └─ error → mensaje claro, se queda en la misma pantalla

  └─ _init() detecta error/error_description en el hash (enlace vencido)
        └─ muestra "el enlace ya no es válido o ha expirado" +
           botón "SOLICITAR NUEVO ENLACE" (dispara el mismo flujo de recover)
```

## 5. Pruebas realizadas (los 10 casos del ticket)

Todas con Chromium real vía Playwright, simulando las respuestas de Supabase (no hay una base de datos real disponible en este entorno de desarrollo):

| Caso | Resultado |
|---|---|
| A — Login normal, contraseña correcta | ✅ Entra al panel |
| B — Login, contraseña incorrecta | ✅ Mensaje claro, sin acceso |
| C — "Olvidé mi contraseña" | ✅ Se llama a `recover` con el `redirect_to` correcto, mensaje neutro |
| D — Abrir enlace válido | ✅ Muestra `RESTABLECER CONTRASEÑA`, nunca el login normal |
| E — Contraseñas distintas | ✅ Bloqueado con mensaje claro, no avanza |
| F — Contraseña nueva válida | ✅ Se llama a `PUT /auth/v1/user`, el servidor (simulado) confirma la actualización, el hash se limpia de la URL |
| G — Entrar con la contraseña antigua | ✅ Rechazada |
| H — Entrar con la contraseña nueva | ✅ Acceso concedido |
| I — Enlace expirado/inválido | ✅ Mensaje + botón "Solicitar nuevo enlace", que sí dispara una nueva solicitud |
| J — Usuario sigue reconocido como ADMIN | ✅ Confirmado (el login posterior al cambio pasa `_verificarEsAdmin()` sin volver a tocar la tabla `admins`) |

**Adicional:** verificado sin overflow horizontal en viewport de 375px (pantalla de restablecer) — cumple la Sección 13 (responsive).

**No regresión:**
- Las 4 pestañas del panel (Resumen, Seguimiento, PNE, Ítems) y el logout se probaron de nuevo después del hotfix — funcionan exactamente igual que antes.
- Batería completa de no-regresión de MásQueCiencia académico (11 sistemas) — 0 errores, `data.pne` y `data.grade11Unlock` intactos.
- Confirmado por búsqueda en todo el proyecto: la cadena `"service_role"` solo aparece dentro de un comentario de advertencia en `analytics-config.js` ("no pegues la service_role acá") — nunca como clave real.

## 6. Resultado

Los 10 casos de prueba (A–J) pasaron. El flujo completo de recuperación de contraseña funciona de punta a punta usando exclusivamente la `anon key` pública y las APIs REST estándar de Supabase — sin SDK nuevo, sin `service_role`, sin tocar RLS ni el esquema.

## 7. Limitaciones pendientes

- **No se pudo probar contra un proyecto de Supabase real** (este entorno de desarrollo no tiene acceso a Internet) — todas las pruebas usan respuestas simuladas que imitan el comportamiento documentado de la API de Supabase (GoTrue). Se recomienda que, tras subir este hotfix, hagas una prueba real end-to-end (Caso C a H) con tu propia cuenta, y me avises si algún mensaje de error de Supabase no coincide con lo esperado — el manejo de errores está escrito para ser tolerante a variaciones menores en el formato de respuesta (`msg` o `error_description`, según el endpoint).
- El mínimo de contraseña se validó en 6 caracteres (el valor por defecto típico de Supabase) — si tu proyecto tiene configurado un mínimo distinto en Authentication → Settings, y alguien intenta una contraseña que pasa la validación del cliente pero Supabase igual rechaza, va a ver el mensaje de error que Supabase realmente devuelva (no un mensaje inventado), así que no debería quedar bloqueado sin explicación.

---

## Declaración

**HOTFIX MQC Analytics — recuperación de contraseña implementada y validada.**
