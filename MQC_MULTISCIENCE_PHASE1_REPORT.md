# MQC_MULTISCIENCE_PHASE1_REPORT.md
## Sprint MQC Multiciencia — Fase 1: Arquitectura + Interfaz General

**Fecha:** 2026-08-26
**Alcance:** Solo branding, navegación y estructura visual. **Cero contenido curricular nuevo** de Física/Biología (según regla 11 del sprint).
**Química:** funcional, sin regresiones — verificado con Chromium real.

---

## 1. Arquitectura encontrada (antes de tocar nada)

- La marca general vivía repetida en 3 lugares distintos: `index.html` (texto estático inicial), `js/core/router.js` (constante `BRAND_ROUTE_LABEL`, que sobrescribe dinámicamente el sidebar/topbar en cada navegación), y el modal de bienvenida legado (`#welcome-modal` en `index.html`, ya no es el flujo real de onboarding).
- El **verdadero** primer contacto del estudiante no es `#welcome-modal` sino `#mqc-gate` (generado por `js/shared/profiles-ui.js`) — ahí sí decía "química" explícitamente en el subtítulo.
- "Selecciona tu ruta científica" (`js/modules/grade-select.js`) ya tenía toda la lógica de desbloqueo de Química 11.º funcionando — se dejó intacta.
- El mecanismo de página "en construcción" (`_showPlaceholder`/`_placeholderMeta` en `router.js`) ya soportaba cualquier sección no registrada automáticamente — se aprovechó tal cual para Física/Biología, sin inventar un sistema nuevo.

## 2. Archivos modificados

| Archivo | Cambio |
|---|---|
| `index.html` | Metadata (title, description, OG, Twitter + `og:image` nuevo), texto de splash/loading, modal de bienvenida legado, reestructuración del sidebar (grupo "Química" + "Otras ciencias" con Física/Biología) |
| `css/main.css` | Estilos para el logo del modal de bienvenida y para los ítems de sidebar "en desarrollo" |
| `js/core/router.js` *(núcleo, tocado por pedido explícito y específico)* | `BRAND_ROUTE_LABEL` → "Ciencias Interactivas"; "Acerca de" actualizado con el logo nuevo y texto de 3 ciencias; 2 entradas nuevas de placeholder (Física/Biología) |
| `js/modules/grade-select.js` | Se agregaron las columnas de Física y Biología ("en desarrollo"). **La lógica y el HTML de Química quedaron carácter por carácter iguales** — solo se envolvieron en un contenedor de grupo |
| `js/shared/profiles-ui.js` | Una sola línea: el subtítulo de la pantalla de bienvenida real (`mqc-gate`) ya no dice "química", dice "ciencia" |

## 3. Nuevo logo

- Archivo fuente: `assets/branding/mqc-logo-ciencias.png` (1536×1024, calidad completa, por si se necesita en el futuro para impresión o alta resolución).
- Versión optimizada para web: `assets/branding/mqc-logo-ciencias.jpg` (136 KB — la fuente original pesaba 1.4 MB, muy pesado para cargar en el `<head>` o el modal de bienvenida).

**Dónde se usa:**
- ✅ Modal de bienvenida (legado, `#welcome-modal`)
- ✅ "Acerca de la Plataforma"
- ✅ Imagen social al compartir el enlace (`og:image`/`twitter:image`) — ahora sí se ve el logo completo en WhatsApp/Discord/etc., antes no había ninguna imagen configurada
- ⚪ **Sidebar (ícono pequeño ~30px), topbar y favicon:** se dejó el átomo SVG vectorial existente. El logo nuevo es un emblema circular con texto integrado — a 30px se vería ilegible. Si querés un ícono pequeño derivado de este logo (solo el símbolo, sin texto), lo puedo preparar aparte cuando quieras — no bloquea nada de este sprint.

## 4. "Selecciona tu ruta científica" — el resultado central del sprint

Ahora muestra las tres disciplinas, cada una con su propio color e ícono, exactamente como pedía la Sección 15:

- **🧪 Química** — cian, funcional, con toda su lógica de progreso/desbloqueo intacta.
- **⚛️ Física** — violeta, "En desarrollo", dos tarjetas (10.º/11.º) con botón que lleva a una página de "próximamente" — nunca abre contenido inexistente.
- **🧬 Biología** — verde, mismo tratamiento que Física.

## 5. Sidebar

- Química ahora vive bajo su propio encabezado de grupo (los `data-section` internos **no cambiaron** — cero riesgo de romper el router o el progreso).
- Nueva sección "Otras ciencias" con Física y Biología, cada una con una etiqueta "Pronto" (reutilizando `.nav-badge.soon`, que ya existía en el sistema de diseño).
- Al hacer clic, ambas caen en el mecanismo genérico de placeholder del Router — no se registró ningún módulo nuevo ni se generó contenido.

## 6. Nomenclatura de arquitectura (Q10/F10/B10...)

Documentado aquí para cuando llegue la Fase 2, **sin renombrar nada existente**:

- Los IDs históricos de Química (`unit-01`...`unit-09`, `g11-u01`...`g11-u04`) **no se tocaron** y no deben tocarse — todo el motor académico, Storage y Analytics dependen de esos nombres exactos.
- Para contenido nuevo de Física/Biología (Fase 2+), se recomienda adoptar recién ahí el estándar `F10-U01`, `F11-U01`, `B10-U01`, `B11-U01` como IDs de unidad, en carpetas `js/units/fisica/` y `js/units/biologia/` — completamente separadas de las carpetas de Química, para no arriesgar ninguna colisión.

## 7. Analytics/Supabase

**No se tocó nada** de Supabase, `analytics-*.js`, ni `SUPABASE_SCHEMA.sql`, tal como pedía la regla 12.

Nota para cuando llegue el momento de distinguir Q/F/B en Analytics (no ejecutar todavía): la tabla `students` y las vistas ya usan `grado` como columna — probablemente haga falta agregar una columna `disciplina` (`'quimica'|'fisica'|'biologia'`) el día que exista contenido real de Física/Biología, para que el panel docente pueda filtrar por disciplina además de por grado. Es un cambio aditivo (nueva columna con default), no requiere tocar las tablas existentes.

## 8. Pruebas realizadas (Chromium real)

| # | Prueba | Resultado |
|---|---|---|
| 1 | `node --check` en los 4 archivos JS modificados | ✅ |
| 2 | Marca del sidebar/topbar dice "CIENCIAS INTERACTIVAS 10.º Y 11.º" | ✅ |
| 3 | "Selecciona tu ruta científica" muestra las 3 disciplinas | ✅ |
| 4 | Química 10.º sigue con su botón y progreso reales intactos | ✅ |
| 5 | Química 11.º sigue desbloqueándose correctamente (probado simulando 100% de avance) | ✅ |
| 6 | Clic en "Física — En desarrollo" (desde la tarjeta Y desde el sidebar) abre el placeholder correcto, con color violeta | ✅ |
| 7 | Clic en "Biología — En desarrollo" (desde ambos lugares) abre el placeholder correcto, con color verde | ✅ |
| 8 | "Acerca de" muestra el logo nuevo y el texto ya no dice "exclusivamente Química" | ✅ |
| 9 | Imagen del logo carga correctamente desde `assets/branding/` | ✅ |
| 10 | No regresión: navegación completa (Inicio, Unidades, 11.º, Tabla Periódica, Progreso, Atlas, Acerca de) en desktop/iPhone/Android | ✅ Sin errores de consola |
| 11 | Responsive: 3 columnas en desktop, apilado vertical sin overflow horizontal en celular | ✅ (ver capturas) |

## 9. Deliberadamente NO desarrollado (por regla del sprint)

- Ningún tema, unidad, simulador, juego, examen, misión ni banco de preguntas de Física o Biología.
- Ninguna migración de base de datos.
- Ninguna reescritura de "Acerca de" más allá del párrafo mínimo pedido.

## 10. Recomendaciones para Fase 2

1. Definir si Física/Biología usarán el mismo motor de unidades (`QI.registerUnit`) o uno propio — probablemente lo primero, reutilizando toda la infraestructura de Storage/Gamification ya construida.
2. Preparar `js/units/fisica/` y `js/units/biologia/` como carpetas espejo de `js/units/grade11/`.
3. Cuando exista contenido real, agregar `disciplina` a Storage (`data.units[id].disciplina`) y a Supabase, para que Analytics pueda filtrar por ciencia.
4. Si se quiere un ícono pequeño (sidebar/favicon) derivado del logo nuevo, pedirlo como una pieza aparte, ya que el logo actual es un emblema circular con texto, no pensado para tamaños de 30px.

---

**Fin de la Fase 1. No se inicia la Fase 2 — quedo a la espera de tu revisión.**
