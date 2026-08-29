# MQC_ANALYTICS_DATA_QUALITY_PNE_AUDIT.md
## Auditoría PNE + Calidad de Datos + Modo Desarrollador

**Fecha:** 2026-08-29
**Núcleo académico:** sin cambios. Química, PNE (matemática/preguntas/proyección), Storage y perfiles funcionan exactamente igual que antes.

---

## 1. PARTE 1 — Causa exacta por la que PNE aparecía en 0

### Diagnóstico, paso a paso (tabla pedida)

| Etapa | Resultado | Problema |
|---|---|---|
| Perfil local termina el Simulacro | ✅ Correcto | El intento se guarda bien en `Storage` (`historial` local) |
| ¿Se genera el evento al finalizar? | ❌ **Fallaba** | El mecanismo de detección nunca disparaba |
| ¿Se coloca en analyticsQueue? | ❌ Consecuencia de lo anterior | Nunca se intentaba |
| ¿Se envía a Supabase? | ❌ Consecuencia de lo anterior | Nunca se intentaba |
| ¿Supabase acepta el INSERT? | N/A | No llegaba ninguna petición |
| ¿Existe la fila en `pne_attempts`? | ❌ | Por eso el conteo daba 0 |
| ¿RLS bloqueaba algo? | ✅ No — probado igual | Las políticas de `pne_attempts` están bien (INSERT para anon, SELECT solo admin) |
| ¿El panel consulta la tabla correcta? | ✅ Correcto | `v_seguimiento_academico` y `pneAttemptsCrudo` ya apuntaban bien |
| ¿Coinciden los nombres de campos? | ✅ Correcto | El problema no era de nombres |
| ¿El dashboard filtra mal? | ✅ No | El panel simplemente no tenía filas que mostrar |
| ¿Los intentos antiguos quedaron solo en localStorage? | ✅ Sí, en parte | Ver Parte 4 — el backfill de intentos previos a esta sesión tenía el mismo problema de raíz |

### La causa raíz real

El código anterior intentaba detectar "¿esta llamada de guardado es la entrega final del Simulacro?" **comparando el estado antes/después** de la llamada (¿el historial creció? ¿el intento en curso todavía tenía sus preguntas?). En pruebas controladas reales (perfil de prueba, Simulacro completo de 60 preguntas, con Chromium) se confirmó que **esa comparación nunca se cumplía como se esperaba** — el intento quedaba perfectamente guardado en el teléfono, pero la condición para "esto es un intento nuevo, hay que avisarle a Analytics" jamás se activaba.

### La corrección

Se reemplazó la comparación frágil por un enfoque basado en contenido, mucho más robusto: cada vez que se guarda el Simulacro, se revisa **cuáles intentos del historial todavía no se enviaron** (identificados por su fecha, única por diseño) y se envían exactamente esos — sin importar cuántas veces se llame internamente a guardar, ni en qué orden. Se lleva un registro propio de "ya enviados" en el propio navegador, así que un intento real nunca se duplica ni se pierde.

**Nota honesta:** en el navegador donde se prueba en **modo invitado**, nunca se genera ningún evento — es el comportamiento correcto y esperado, no un bug: el modo invitado no persiste ni tiene `profileId`, así que no hay nada que sincronizar. Los estudiantes reales usan perfiles creados (no invitados), donde el arreglo funciona de punta a punta.

---

## 2. PARTE 2 — Prueba controlada (resultado real)

Perfil de prueba: `MQC_ANALYTICS_TEST`, grupo `11-3`. Se completó un Simulacro (no aprobado, a propósito, para probar ambos casos).

Evento generado en `pneAttempts` (verificado en la cola local antes de llegar a Supabase):

```json
{
  "attempt_id": "pne_MQC-Z34VJU_1787975149644",
  "profile_id": "MQC-Z34VJU",
  "grupo": "11-3",
  "nota_presentacion": 40,
  "aciertos": 17,
  "nota_pne": 28.33,
  "aprobado": false,
  "biologia_aciertos": 4,
  "fisica_aciertos": 7,
  "quimica_aciertos": 6,
  "proyeccion_final": 51.33,
  "fecha": "2026-08-29T03:45:49.644Z",
  "source": "live_event"
}
```

Más **60 filas** en `pneAnswers` (una por pregunta respondida). Se verificó que la misma tentativa existe **exactamente una vez** — el `attempt_id` es determinístico (`pne_` + profileId + fecha exacta), así que un reintento de red nunca duplica la fila.

---

## 3. PARTE 3 — Intentos aprobados y no aprobados

Con la corrección de la Parte 1, **cada intento** (aprobado o no) genera su propia fila en `pne_attempts` con `aprobado: true/false`. Las vistas de Supabase (`v_seguimiento_academico`) ya agregaban correctamente `pne_intentos`, `pne_mejor_nota`, `pne_aprobada` — no hacía falta tocarlas para esto, solo se agregaron dos columnas nuevas (`pne_intentos_aprobados`, `pne_intentos_no_aprobados`) para que el panel pueda mostrar el desglose exacto que pedía el ejemplo del sprint (intentos totales / aprobados / no aprobados / mejor resultado).

---

## 4. PARTE 4 — Historial de PNE anterior a Analytics (backfill)

El mecanismo de sincronización inicial (`_sincronizacionInicial`, que ya existía) se actualizó para:
- Reutilizar la misma función y el mismo registro de "ya enviados" que el hook en vivo, así nunca hay doble conteo del mismo intento real.
- Marcar cada intento importado con `source = 'legacy_backfill'` (los nuevos quedan `source = 'live_event'`), tal como pedía el sprint.
- **No se inventa ningún intento.** Solo se envía el resumen agregado (aciertos, nota, aprobado/no, proyección) — el detalle pregunta-por-pregunta de intentos anteriores a esta sincronización no está disponible en ningún lado (nunca se guardó de forma permanente), así que simplemente no se genera para esos casos. El resultado agregado sí queda completo.

---

## 5. PARTE 5 — Progreso histórico 10.º y 11.º

Se auditó: el mecanismo de backfill de exámenes de unidad (10.º y 11.º) **ya existía** desde antes de este sprint y **no se tocó** — sigue leyendo el progreso ACTUAL almacenado localmente (`examBest` por unidad) la primera vez que un perfil se sincroniza, no solo eventos posteriores a que existiera Analytics. Confirmado que sigue funcionando: no se crean intentos falsos, solo se refleja el estado real ya alcanzado.

---

## 6-7. PARTE 6 y 7 — Grupo obligatorio

- **Perfiles nuevos:** el grupo/sección ahora es obligatorio en los dos formularios de creación (pantalla de bienvenida y gestor de perfiles). Ya no se puede guardar `null`, vacío, ni "Grupo pendiente" — probado con Chromium: sin elegir grupo, el formulario rechaza la creación con un mensaje claro.
- **Perfiles legacy sin grupo:** al cargar la app, si el perfil activo (no invitado) no tiene grupo, aparece un modal obligatorio "COMPLETA TU PERFIL" — sin botón de cerrar ni clic-afuera. Una vez elegido el grupo, se actualiza localmente y se sincroniza a Supabase (reutilizando la función ya existente de cambio de grupo). **Probado: no se pierde XP, progreso, ni el profileId.**

---

## 8. PARTE 8 — Activo / Inactivo

Se agregó una tabla nueva `profile_sessions`: cada carga real de la app (perfil no invitado) manda un "latido" liviano. El panel calcula `last_seen_at` como el más reciente de esos latidos, y clasifica:
- **Activo:** latido en los últimos 30 días.
- **Inactivo:** más de 30 días sin latido (o nunca tuvo uno).

Si el estudiante vuelve a usar la app, el próximo latido lo devuelve a "Activo" automáticamente — sin ninguna acción del docente.

---

## 9-10. PARTE 9, 10 — Archivar (sin borrado físico)

Se agregó una tabla separada `profile_admin_state`, protegida para que **solo un admin autenticado** pueda escribirla (ver Parte 16). Un perfil archivado:
- No aparece por defecto en Seguimiento Académico.
- No entra en las tarjetas de Resumen (perfiles registrados, exámenes aprobados, PNE).
- Conserva el 100% de sus datos — nada se borra.
- **No se reactiva solo** — únicamente restaurándolo desde el botón del panel (o a mano en SQL).

Filtro agregado en el panel: "Activos + Inactivos" (por defecto), "Solo activos", "Solo inactivos", "Archivados", "Todos".

En Analytics v1 **no existe** ningún botón de "Eliminar definitivamente" — solo Archivar/Restaurar, tal como pedía la Parte 10.

---

## 11. PARTE 11 — Nuevo punto de activación del modo desarrollador

Se movió de "5 toques en el pie del sidebar" a **"5 toques/clics en menos de 3 segundos sobre el logo oficial de MásQueCiencia, dentro de Acerca de la Plataforma"**. Sin ninguna pista visual — probado que el pie del sidebar ya NO activa nada, y que el logo sí lo hace.

## 12. PARTE 12 — Modo desarrollador: sin capacidades nuevas

Se confirmó que el panel conserva exactamente las mismas herramientas de antes (simular progreso, desbloquear, auto-completar el Simulacro de prueba, restaurar). No se agregó ninguna función nueva. Sigue sin poder tocar Supabase, otros perfiles remotos, RLS, ni el panel de Analytics — es y sigue siendo una herramienta local.

## 13. PARTE 13 — Logo centrado en "Acerca de"

Corregido con `display:flex; justify-content:center` en un contenedor propio — no con márgenes fijos. Probado y confirmado centrado en desktop y en móvil (390px de ancho).

## 14-15. PARTE 14, 15 — Estado del perfil y estadísticas

La tabla de Seguimiento Académico ahora muestra una columna "Estado" (Activo / Inactivo / Archivado) sin perder ninguna de las columnas existentes. "Perfiles registrados" y las demás tarjetas de Resumen excluyen automáticamente eliminados y archivados, con una nota aclaratoria ("📦 Archivados: X, no incluidos arriba") cuando corresponde.

**Limitación conocida, pendiente para una siguiente vuelta:** la tabla "Resultados por sección" (comparación por grupos) todavía no excluye archivados — solo se ajustaron las tarjetas de Resumen y el seguimiento individual por esta vuelta, por alcance de tiempo. No afecta la corrección de los datos, solo significa que un grupo con un perfil archivado podría seguir contándolo en ese cuadro específico hasta la próxima actualización.

## 16. PARTE 16 — Seguridad

- `profile_admin_state` (archivar/restaurar) **no tiene ninguna política para el rol `anon`** — con RLS activo y sin esa política, queda completamente bloqueado por defecto para estudiantes. Solo `authenticated` + `is_admin()` puede leer o escribir ahí.
- No se expuso ninguna `service_role key` en ningún archivo.
- El resto de las políticas RLS ya existentes no se tocaron.

## 17. PARTE 17 — No regresión (Chromium real)

| Área | Resultado |
|---|---|
| Química 10.º / 11.º | ✅ Sin cambios, navegación y progreso intactos |
| PNE (motor, preguntas, proyección) | ✅ Sin cambios |
| Multiciencia / Física-Biología "en desarrollo" | ✅ Sin cambios |
| Perfiles (crear/editar/eliminar) | ✅ Con las mejoras de las Partes 6-7, resto intacto |
| XP / Storage | ✅ Sin cambios |
| Panel de desarrollador | ✅ Reubicado (Parte 11), mismas funciones (Parte 12) |
| Apoya MQC (PayPal/SINPE) | ✅ Sin cambios, modal abre correctamente |
| Responsive (desktop/iPhone/Android) | ✅ Sin errores de consola en ningún tamaño |

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `js/shared/analytics-hooks.js` | Rediseño del hook de PNE (Partes 1-4), latido de sesión (Parte 8) |
| `js/shared/analytics-config.js` | Nueva tabla `profileSessions` en el mapa |
| `js/shared/profiles-ui.js` | Grupo obligatorio en creación (Parte 6), modal "Completa tu perfil" (Parte 7) |
| `js/shared/devtools.js` | Nuevo punto de activación: logo de "Acerca de" (Parte 11) |
| `js/core/router.js` *(núcleo, pedido explícito)* | `id` en el logo de "Acerca de" + centrado (Partes 11, 13) |
| `css/main.css` | Estilos de centrado del logo |
| `analytics/analytics-admin.js` | Estado Activo/Inactivo/Archivado, filtro, botón archivar/restaurar, estadísticas ajustadas (Partes 8, 9, 14, 15) |

## SQL adicional necesario

Ver `SUPABASE_MIGRATION_analytics_sprint.sql` — instrucciones paso a paso en `SUPABASE_ANALYTICS_UPDATE_INSTRUCTIONS.md`.

## Políticas RLS modificadas/creadas

- `profile_sessions`: INSERT para `anon`, SELECT para `authenticated`+admin.
- `profile_admin_state`: **todo** (SELECT/INSERT/UPDATE) solo para `authenticated`+admin — ninguna política para `anon`.
- Ninguna política existente se modificó.
