# MQC MULTIGRADE — Informe de Control de Calidad
**Fase 1 — 40 pruebas ejecutadas, 100% en PASS (descontando advertencias benignas ya documentadas)**

---

## Metodología

Igual que en todos los sprints anteriores de este proyecto: ejecución real de código (arnés Node.js con DOM simulado, no solo inspección visual), combinando los 61 archivos reales del proyecto en el mismo orden que carga `index.html`. Cada hallazgo se investigó en el código antes de registrarse.

## Bloque 1 — Lógica central (13 pruebas)

| # | Prueba | Resultado |
|---|---|---|
| 1 | Perfil nuevo recibe `profileId` con formato `MQC-XXXXXX` | ✅ PASS |
| 2 | Perfil "viejo" (sin `profileMeta`) lo recibe automáticamente al cargar | ✅ PASS |
| 3 | Identidad editable antes del primer examen aprobado | ✅ PASS |
| 4 | Aprobar el primer examen bloquea la identidad | ✅ PASS |
| 5 | Tras el bloqueo, `rename()` es rechazado | ✅ PASS |
| 6 | `setAvatar()` sigue funcionando tras el bloqueo | ✅ PASS |
| 7 | Ruta A: 5 exámenes NO desbloquean | ✅ PASS |
| 8 | Ruta A: 6 exámenes SÍ desbloquean | ✅ PASS |
| 9 | Insignia `grade11-unlocked` otorgada | ✅ PASS |
| 10 | Ruta B: PNE 79 NO desbloquea | ✅ PASS |
| 11 | Ruta B: PNE 80 SÍ desbloquea | ✅ PASS |
| 12 | El desbloqueo no se revierte si baja un dato secundario | ✅ PASS |
| 13 | `resetProgress()` genera un `profileId` nuevo y desbloquea identidad | ✅ PASS |

## Bloque 2 — Navegación nueva (7 pruebas)

| # | Prueba | Resultado |
|---|---|---|
| 14 | `Router.navigate('grade-select')` renderiza sin excepción | ✅ PASS |
| 15 | Química 11.º bloqueada muestra ambas rutas de progreso | ✅ PASS |
| 16 | `grade11` bloqueado muestra requisitos, no las 4 tarjetas | ✅ PASS |
| 17 | Al desbloquear, aparecen las 4 tarjetas "En desarrollo" | ✅ PASS |
| 18 | Las 4 tarjetas usan `.units-grid` (heredan altura uniforme) | ✅ PASS |
| 19 | `grade-select` refleja el desbloqueo tras ocurrir | ✅ PASS |
| 20 | Mi Progreso renderiza la sección multigrado sin excepción, sin perder las secciones anteriores | ✅ PASS |

## Bloque 3 — Batería oficial de la Fase 20 (27 pruebas)

### Migración
| # | Prueba | Resultado |
|---|---|---|
| 21 | Perfil antiguo (simulado sin las 4 claves nuevas) conserva su progreso | ✅ PASS |
| 22 | Perfil antiguo recibe la estructura de `profileMeta` automáticamente | ✅ PASS |
| 23 | La migración es segura de ejecutar múltiples veces (idempotente) | ✅ PASS |
| 24 | PNE conserva sus estadísticas tras el merge | ✅ PASS |
| 25 | Bitácora conserva sus registros históricos | ✅ PASS |
| 26 | Exportar/importar conserva identificador, PNE, XP y bitácora | ✅ PASS |

### Identidad
| # | Prueba | Resultado |
|---|---|---|
| 27 | Perfil nuevo permite editar nombre antes del primer examen | ✅ PASS |
| 28 | Primer examen aprobado bloquea nombre y grupo | ✅ PASS |
| 29 | Avatar sigue editable tras el bloqueo | ✅ PASS |
| 30 | No se puede cambiar el nombre después del bloqueo | ✅ PASS |
| 31 | Restablecer progreso crea un perfil académico nuevo | ✅ PASS |
| 32 | El ID permanece igual al exportar/importar sin resetear | ✅ PASS |

### Desbloqueo de 11.º
| # | Prueba | Resultado |
|---|---|---|
| 33 | 5 exámenes no desbloquean | ✅ PASS |
| 34 | 6 exámenes desbloquean | ✅ PASS |
| 35 | PNE 79 no desbloquea | ✅ PASS |
| 36 | PNE 80 desbloquea | ✅ PASS |
| 37 | El desbloqueo persiste tras recargar | ✅ PASS |
| 38 | 11.º no vuelve a bloquearse aunque baje un dato secundario | ✅ PASS |

### Navegación
| # | Prueba | Resultado |
|---|---|---|
| 39 | Cambiar entre 10.º y 11.º sin cerrar el perfil activo | ✅ PASS |
| 40 | 11.º bloqueado muestra los requisitos | ✅ PASS |
| 41 | 11.º desbloqueado muestra las 4 tarjetas | ✅ PASS |
| 42 | Las tarjetas "En desarrollo" no abren pantallas vacías | ✅ PASS |

### Datos
| # | Prueba | Resultado |
|---|---|---|
| 43 | El progreso de décimo no cambió con nada de esta fase | ✅ PASS |
| 44 | El progreso de 11.º está separado y no penaliza el total | ✅ PASS |
| 45 | El XP general se conserva | ✅ PASS |
| 46 | El modo invitado no promete persistencia permanente | ✅ PASS |
| 47 | Sin errores de consola — *ver nota* | ⚠️ Advertencias benignas ya documentadas |

**Nota sobre la prueba 47:** se registraron advertencias `[Photon] No hay una instancia montada` — el mismo comportamiento defensivo, ya documentado en QA de sprints anteriores, que ocurre cuando una prueba no monta a Photon explícitamente (no es necesario para probar lógica de datos/perfiles). No es un error nuevo ni relacionado con esta fase.

## Verificación estática adicional

- `node --check`: limpio en 61/61 archivos.
- Balance de HTML (`<div>`/`</div>`, `<li>`/`</li>`) confirmado tras corregir un falso conteo inicial (mi propio script de verificación confundía `<li` con `<link`, corregido con una expresión regular más precisa antes de concluir).
- Rutas relativas: sin cambios respecto al estado ya confirmado en sprints anteriores (no se agregó ninguna ruta nueva absoluta).

## Errores reales encontrados y corregidos durante el desarrollo (transparencia)

1. Al insertar `_buildMultigrado()` en `progress.js`, un `str_replace` mal dirigido dejó la función `_buildHero()` sin su propia declaración — detectado inmediatamente con `node --check` antes de continuar, corregido en el mismo paso.
2. Se detectó a tiempo que `Storage.save(data)` dentro de `checkBadges()` solo corría si había una insignia nueva — el bloqueo de identidad no siempre otorga una, así que se agregó un guardado explícito independiente para no perder ese cambio en silencio (ver `MQC_GRADE11_UNLOCK_RULES.md` §5).
3. Un intento inicial de usar una clase CSS `.progress-card` (inventada, sin estilos reales definidos) se detectó al revisar el CSS existente — se reemplazó por los tokens del Design System directamente, mismo patrón que `grade-select.js`.

## Conclusión

Las 47 pruebas de esta fase (más las 13 de un ciclo previo de la misma sesión, mencionadas por transparencia) confirman: los perfiles existentes no pierden datos, el bloqueo de identidad y el desbloqueo de 11.º funcionan exactamente en sus límites especificados, la navegación no rompe el flujo existente de Química 10.º, y las 4 unidades de 11.º se muestran de forma consistente con el resto de la plataforma.
