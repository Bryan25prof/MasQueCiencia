# MQC_ANALYTICS_SECURITY.md
## MQC Analytics v1.0 — Seguridad

**Fecha:** 2026-08-19

Este documento explica, sin tecnicismos innecesarios, **qué protege a los datos de tus estudiantes** y **qué cosas dependen de vos** para que esa protección siga siendo real.

---

## 1. Las dos claves de Supabase — cuál es pública y cuál nunca debe salir de tu computadora

Supabase te da dos claves distintas cuando creás un proyecto:

| Clave | ¿Dónde vive? | ¿Qué puede hacer? |
|---|---|---|
| **anon key** (pública) | `js/shared/analytics-config.js`, en GitHub Pages, visible para cualquiera | Solo lo que las políticas de RLS le permitan — en este proyecto: **insertar filas nuevas, nunca leer ni modificar nada** |
| **service_role key** (secreta) | **En ningún archivo de este proyecto.** No la copies nunca a ningún `.js` que subas a GitHub | Se salta TODA la seguridad (RLS incluida) — un superusuario total de tu base de datos |

**Regla de oro: la `service_role key` nunca debe pegarse en ningún archivo de este proyecto.** Ni en `analytics-config.js`, ni en `analytics-admin.js`, ni en ningún lugar. Este proyecto está diseñado para funcionar completamente sin ella — el panel de administración se autentica con tu usuario y contraseña reales (Supabase Auth), no con esa clave.

## 2. ¿Por qué es seguro que la anon key sea pública?

Porque su seguridad no depende de que esté escondida — depende de las reglas (**Row Level Security**) que vos definiste en la base de datos con `SUPABASE_SCHEMA.sql`. Es como la llave de un buzón de correos con ranura: cualquiera puede meter una carta (insertar), pero solo vos tenés la llave para abrirlo y leer lo que hay adentro (esa "llave para leer" es tu usuario y contraseña de docente, no la anon key).

## 3. ¿Qué puede hacer un estudiante, en el peor de los casos?

Supongamos que un estudiante muy curioso abre las herramientas de desarrollador de su navegador y mira el código. Esto es lo máximo que podría llegar a hacer, y por qué no alcanza para ser un problema real:

| Intento | ¿Es posible? | ¿Por qué? |
|---|---|---|
| Ver el progreso de otro estudiante | ❌ No | El rol usado por los estudiantes no tiene ningún permiso de lectura (`SELECT`) sobre ninguna tabla. |
| Modificar la nota de otro estudiante | ❌ No | Ninguna tabla tiene permiso de `UPDATE` para estudiantes — ni siquiera para modificar su propia fila. Toda "actualización" es en realidad una fila nueva. |
| Borrar el historial de alguien | ❌ No | Ningún permiso de `DELETE` existe para el rol de estudiantes. |
| Insertar una fila con datos falsos a su propio nombre | ⚠️ Técnicamente sí | Puede insertar cualquier valor con su propio `profile_id`. Igual que un estudiante podría, hoy, editar su propio `localStorage` para inflar su progreso local — este riesgo ya existe en MásQueCiencia desde su diseño original, y Analytics no lo aumenta. |
| Ver los datos de TODOS los estudiantes (vista de administrador) | ❌ No, sin tu contraseña | Requiere iniciar sesión con Supabase Auth Y que ese usuario esté en la tabla `admins`. Ambas cosas requieren acceso a tu cuenta real. |

## 4. ¿Qué pasa si alguien roba la anon key?

Nada distinto a lo de arriba — puede insertar filas (spam, en el peor caso), pero sigue sin poder leer ni modificar nada. Si en algún momento notás actividad sospechosa (muchísimos registros nuevos sin sentido), podés regenerar la anon key desde el Dashboard de Supabase (Project Settings → API → "Reset" ) y actualizar `analytics-config.js` — el sitio viejo con la clave anterior deja de poder escribir de inmediato.

## 5. ¿Qué pasa si alguien roba tu contraseña de docente?

Esto sí sería un problema real — con tu usuario y contraseña, alguien podría leer todos los datos (aunque, por diseño, **nunca podría modificarlos ni borrarlos** — el panel v1.0 es de solo lectura, sección 16 del ticket). Por eso:
- Usá una contraseña fuerte y única para tu cuenta de Supabase.
- No compartas tu contraseña de docente con nadie, ni siquiera con otro profesor — si necesitás dar acceso a alguien más, creá un usuario separado para esa persona y agregalo a la tabla `admins` (no compartas tu propia cuenta).
- Supabase permite activar autenticación de dos factores (2FA) en tu cuenta — se recomienda activarla.

## 6. ¿Qué pasa si Supabase está caído o no hay Internet?

Nada le pasa a MásQueCiencia — sigue funcionando exactamente igual (Sección 20 del ticket). Los eventos quedan guardados en la cola local del navegador del estudiante (`analytics-queue.js`) y se reintentan solos cuando vuelve la conexión. El estudiante nunca ve ningún mensaje de error por esto.

## 7. Checklist de seguridad antes de activar Analytics en producción

- [ ] Ejecutaste `SUPABASE_SCHEMA.sql` completo, sin errores, en tu proyecto de Supabase.
- [ ] Creaste tu propio usuario en Authentication → Users, con un email y contraseña reales.
- [ ] Agregaste tu `user_id` a la tabla `admins` (paso 9 de `SUPABASE_SCHEMA.sql`).
- [ ] Verificaste, iniciando sesión en `analytics/index.html`, que SÍ podés ver los datos.
- [ ] Verificaste, con una cuenta que NO agregaste a `admins`, que NO se puede ver ningún dato (mensaje "no tiene permisos de administrador").
- [ ] Copiaste la **anon key** (no la service_role key) a `js/shared/analytics-config.js`.
- [ ] Revisaste que `service_role` no aparece en ningún archivo del repositorio (buscar el texto "service_role" en todo el proyecto antes de subir).
- [ ] Activaste `enabled: true` en `analytics-config.js` **recién al final**, cuando todo lo anterior ya esté verificado.

## 8. Qué NO cubre esta versión (v1.0)

- No hay límite de velocidad (*rate limiting*) explícito sobre las inserciones — un estudiante no podría dañar los datos de otros, pero teóricamente podría enviar muchas filas seguidas. Supabase tiene límites propios en su plan gratuito que actúan como freno natural; si esto fuera un problema real en el futuro, se puede agregar una función de base de datos que valide límites razonables antes de insertar.
- El panel de administración no tiene registro de auditoría (*quién vio qué y cuándo*) — no es necesario para v1.0 dado que es de solo lectura y de un único rol (vos), pero podría agregarse más adelante si se suman más docentes.
