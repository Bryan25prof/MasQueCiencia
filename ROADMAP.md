# ROADMAP — MásQueCiencia

## Estado actual: Beta v1.0

El núcleo funcional, la identidad visual y el control de calidad están completos y aprobados. Este documento lista lo que queda pendiente **para versiones futuras** — nada de esto bloquea la Beta actual.

## Pendientes conocidos (documentados, no bloqueantes)

| Pendiente | Descripción | Prioridad sugerida |
|---|---|---|
| Sistema de sonido (`PhotonSound`) | Nunca se implementó en código — quedó solo documentado en sprints de identidad anteriores. | Media |
| Tipografía dependiente de internet | Las fuentes (Space Grotesk, Inter, JetBrains Mono) se cargan desde Google Fonts — si no hay conexión, el navegador usa una fuente de sistema de reemplazo automáticamente (la plataforma sigue funcionando, solo cambia la tipografía). Empaquetar las fuentes localmente resolvería esto para un uso 100% sin conexión. | Media |
| Cobertura de íconos SVG | 8 de los 33 íconos de la librería de marca están integrados (navegación y accesos rápidos). Los 25 restantes son para contenido específico (medallas individuales, mensajes) y no tienen destino de integración todavía. | Baja |
| Cobertura ARIA | No es exhaustiva en botones generados dinámicamente dentro de cada unidad; falta una región `aria-live` para anunciar cambios de sección al navegar. | Media |
| Color del Proyecto Integrador | `#B983FF` es real y está en uso, pero no está incorporado formalmente a la tabla de colores del Design System Maestro. | Baja |
| Experiencias/unidades nuevas | El programa cubre las 9 unidades oficiales del MEP. Agregar una unidad 10 o contenido adicional requeriría una decisión y un sprint dedicados — no es el estado por defecto de este proyecto. | — |

## Ideas para futuras versiones (sin comprometer una fecha)

- Modo multi-dispositivo / sincronización de progreso (actualmente cada perfil vive solo en el navegador donde se creó).
- Panel de docente para ver el progreso agregado de un grupo completo (hoy cada estudiante solo ve su propio progreso).
- Ampliar el banco de preguntas PNE por unidad.
- Explorar si vale la pena una versión empaquetada como aplicación de escritorio/móvil (hoy es exclusivamente una página web).

## Cómo proponer un cambio

Cualquier cambio a este roadmap — agregar una función, rediseñar algo, cambiar identidad visual — requiere abrir explícitamente un nuevo sprint de desarrollo. Este documento no autoriza trabajo por sí solo.
