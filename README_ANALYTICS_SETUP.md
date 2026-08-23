# README_ANALYTICS_SETUP.md
## Cómo activar MQC Analytics — guía paso a paso

Esta guía asume que **no sos programador** y te lleva de la mano por todo el proceso. Vas a tardar unos 20-30 minutos la primera vez. No hace falta instalar nada en tu computadora — todo se hace desde el navegador.

**Importante:** hasta que termines TODOS los pasos de esta guía, MásQueCiencia sigue funcionando exactamente igual que ahora — nada se rompe ni se activa a medias.

---

## Paso 1 — Crear tu cuenta de Supabase (gratis)

1. Andá a **[supabase.com](https://supabase.com)** y hacé clic en **"Start your project"**.
2. Registrate con tu correo o con tu cuenta de GitHub (la misma que usás para MásQueCiencia, si querés).
3. Una vez adentro, hacé clic en **"New project"**.
4. Completá:
   - **Name:** `masqueciencia-analytics` (o el nombre que prefieras).
   - **Database Password:** generá una contraseña fuerte y **guardala en un lugar seguro** (no es la que vas a usar para entrar al panel, es la de la base de datos — probablemente nunca la necesites de nuevo, pero por las dudas).
   - **Region:** elegí la más cercana a Costa Rica (por ejemplo, alguna de EE.UU. este).
5. Hacé clic en **"Create new project"** y esperá 1-2 minutos mientras Supabase lo prepara.

## Paso 2 — Ejecutar el esquema de la base de datos

1. En el menú izquierdo de tu proyecto de Supabase, hacé clic en **"SQL Editor"**.
2. Hacé clic en **"New query"**.
3. Abrí el archivo `SUPABASE_SCHEMA.sql` que te entregué, seleccioná **todo** el contenido (Ctrl+A) y copialo.
4. Pegalo en el editor de Supabase.
5. Hacé clic en el botón **"Run"** (o Ctrl+Enter).
6. Deberías ver un mensaje de éxito ("Success. No rows returned"). Si ves un error, mandame una captura de pantalla del error completo.

## Paso 3 — Crear tu usuario de docente

1. En el menú izquierdo, hacé clic en **"Authentication"** → pestaña **"Users"**.
2. Hacé clic en **"Add user"** → **"Create new user"**.
3. Completá con **tu propio correo real** y una **contraseña que vayas a recordar** (vas a usar esto para entrar al panel de Analytics — es distinta de la contraseña de la base de datos del Paso 1).
4. Marcá la casilla **"Auto Confirm User"** (para no tener que confirmar por correo).
5. Hacé clic en **"Create user"**.
6. Vas a ver tu usuario en la lista. Hacé clic sobre él y **copiá el valor de "UID"** (es un código largo tipo `a1b2c3d4-...`) — lo vas a necesitar en el siguiente paso.

## Paso 4 — Darte permisos de administrador

1. Volvé a **"SQL Editor"** → **"New query"**.
2. Pegá esta línea, **reemplazando** los dos valores marcados:

```sql
insert into admins (user_id, email) values
  ('PEGAR-AQUI-EL-UID-QUE-COPIASTE', 'tu-correo-real@ejemplo.com');
```

3. Hacé clic en **"Run"**.

Sin este paso, aunque inicies sesión correctamente, el panel te va a decir que no tenés permisos — es el comportamiento esperado y seguro (ver `MQC_ANALYTICS_SECURITY.md`).

## Paso 5 — Copiar tu URL y tu clave pública (anon key)

1. En el menú izquierdo, hacé clic en **"Project Settings"** (el ícono de engranaje, abajo del todo) → **"API"**.
2. Vas a ver dos valores que necesitás:
   - **Project URL** — algo como `https://abcdefghijk.supabase.co`
   - **anon / public** (dentro de "Project API keys") — un texto largo que empieza con `eyJ...`
3. **Copiá ambos valores** — los vas a pegar en el siguiente paso.

⚠️ Hay OTRA clave en esa misma pantalla llamada **"service_role"** — **NO la copies, no la uses en ningún lado de este proyecto.** Es secreta (ver `MQC_ANALYTICS_SECURITY.md`, sección 1).

## Paso 6 — Pegar esos valores en MásQueCiencia

1. En tu repositorio de GitHub, andá al archivo `js/shared/analytics-config.js`.
2. Hacé clic en el ícono de lápiz (editar) arriba a la derecha.
3. Reemplazá estas dos líneas:

```javascript
supabaseUrl: '',
supabaseAnonKey: '',
```

con tus valores reales, por ejemplo:

```javascript
supabaseUrl: 'https://abcdefghijk.supabase.co',
supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
```

4. **Todavía no cambies `enabled: false`** — dejalo así por ahora.
5. Guardá los cambios ("Commit changes").

## Paso 7 — Probar el panel ANTES de activarlo para los estudiantes

1. Andá a `tudominio.github.io/MasQueCiencia/analytics/` en tu navegador (nota la carpeta `analytics/` al final).
2. Deberías ver la pantalla **"ACCESO RESTRINGIDO"** con un formulario de correo y contraseña.
3. Ingresá el correo y contraseña que creaste en el Paso 3.
4. Si todo está bien configurado, deberías entrar al panel — probablemente vacío todavía (no hay estudiantes usando Analytics aún), pero sin errores.
5. Si ves un mensaje de "no tiene permisos de administrador", repasá el Paso 4.
6. Si ves un error de conexión, repasá el Paso 6 (revisá que copiaste bien la URL y la clave, sin espacios de más).

## Paso 8 — Activarlo para los estudiantes

Una vez que el Paso 7 funcionó correctamente:

1. Volvé a `js/shared/analytics-config.js` en GitHub.
2. Cambiá `enabled: false` por `enabled: true`.
3. Guardá los cambios.

A partir de ahora, cada vez que un estudiante cree su perfil, apruebe un examen, o complete un Simulacro PNE, esa información va a empezar a aparecer en tu panel (puede tardar unos segundos, o hasta que recuperen conexión a Internet si estaban sin ella).

## Paso 9 — Uso diario

- Accedé siempre por `tudominio.github.io/MasQueCiencia/analytics/` — **no aparece en ningún menú de la app de los estudiantes**, es intencional.
- Tu sesión se cierra automáticamente si cerrás el navegador (por seguridad) — vas a tener que iniciar sesión de nuevo cada vez.
- El panel es de **solo lectura** — no hay ningún botón para editar o borrar datos desde ahí.

## ¿Algo no funcionó?

Sacale una captura de pantalla al problema (incluyendo cualquier mensaje en rojo) y compartímela — la mayoría de los problemas en este tipo de configuración son un espacio de más al copiar la URL o la clave, o haberte saltado el Paso 4.
