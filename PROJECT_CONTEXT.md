# PROJECT_CONTEXT_MQC.md
### Documento de arranque rápido — pegar este archivo (o subirlo) al iniciar un chat nuevo con cualquier IA
**Actualizado EOP-019 — CIERRE DEL NÚCLEO FUNCIONAL MQC v1.0.**

---

## 🔒 Estado del proyecto: MULTIGRADO FASE 1 — infraestructura 10.º→11.º integrada y migrada

**El núcleo de Química 10.º sigue congelado y sin regresiones.** A partir de esta fase, el proyecto es multigrado: existe infraestructura real (identidad, migración, desbloqueo, navegación, 4 unidades "en desarrollo") para Química 11.º, aunque su contenido académico todavía no se desarrolló — eso es la próxima fase real pendiente. Ver `docs/multigrado/MQC_MULTIGRADO_ARCHITECTURE.md` para el detalle completo.

## Qué es este proyecto

**MásQueCiencia (MQC) / "Química Interactiva 10°"** — plataforma web de química para Décimo Año, Costa Rica (programa oficial MEP). HTML5 + CSS3 + JavaScript puro. Sin backend, sin login, sin base de datos: todo el progreso vive en `localStorage`.

**Filosofía:** *"Porque cuando comprendes la ciencia, comienzas a pensar de una manera diferente."* Método MQC: detonante → compromiso con una respuesta → exploración → conexión → confrontación de errores frecuentes.

## Regla de oro para cualquier IA que retome este proyecto

1. **No asumas que falta algo sin verificarlo en el código real.** Este proyecto tuvo varias rondas de confusión por documentos que describían estados que no coincidían con el ZIP realmente subido. **Pedí siempre el ZIP completo más reciente antes de dar por hecho un estado.**
2. **El núcleo funcional está cerrado y congelado (EOP-019).** No agregues sistemas, no cambies Router/MQCChem/XP/Mentor/Bitácora/Perfiles, no reintroduzcas módulos "reservados" — fueron retirados deliberadamente (ver punto 4).
3. **Antes de escribir lógica científica nueva (pH, moles, balanceo, etc.), revisá si ya existe en `MQCChem` (`js/shared/chem.js`, 50 funciones).** Sistema aditivo. No dupliques dentro de una unidad.
4. **`js/modules/simulators.js`, `lab.js`, `games.js`, `exam.js` y `profe-bryan.js` YA NO EXISTEN.** Se eliminaron en el cierre del núcleo (EOP-019) por decisión explícita: nunca estuvieron activos y no forman parte de MQC v1.0. Los simuladores/juego/examen reales viven dentro de cada `unit-XX.js`. No los recrees.
5. **El color de cada unidad se toma de `js/data/unidades.js`, nunca se inventa.**
6. **Toda unidad nueva (si alguna vez se autoriza) se construye copiando el patrón de una unidad ya funcional** (`unit-08.js`/`unit-09.js` son las plantillas más recientes). Pero a la fecha de este documento, **las 9 unidades ya están completas** — no hay unidades nuevas que agregar.
7. **El componente Photon (`js/shared/photon.js`) es arquitectura aprobada y congelada.** Tiene un activo oficial parcial (`assets/photon/photon-oficial.png`, v0.1). Si llegan más archivos de arte (SVG, variantes, guías), integrarlos sin tocar la API del componente.
8. **Consultá `MQC_MASTER_PROJECT_v1.0.md`** para arquitectura, API completa de cada sistema, convenciones y checklist.

## Estado real verificado (EOP-019 — NÚCLEO CERRADO)

- **9/9 unidades completas**, con **Banco PNE 9/9** (cobertura total, cerrada en este sprint).
- Proyecto Integrador Final completo.
- **56 archivos `.js`, 100% activos** — cero código muerto, cero placeholders, cero archivos sin usar.
- Menú sin secciones "Próx.", "En construcción" ni botones deshabilitados.
- Accesibilidad: problemas importantes resueltos (contraste, navegación por teclado, roles ARIA en modales y navegación); limitaciones menores documentadas en `CHANGELOG.md`, no bloqueantes.
- `node --check` limpio en el 100% del proyecto.

## Estado real verificado — RC2 (EOP-034 Beta QA)

**MQC Release Candidate 2 aprobado para publicación Beta.** Ver `MQC_BETA_QA_REPORT_v1.0.md`, `BUG_LIST_v1.0.md`, `FIX_LOG_v1.0.md` para el detalle completo del sprint de validación.

- ✅ Núcleo funcional: 56/56 módulos, 36/36 combinaciones unidad:pestaña, recorrido completo de estudiante (crear perfil → ... → verificar persistencia) sin errores críticos ni altos.
- ✅ Identidad visual: Design System Maestro (`MQC_DESIGN_SYSTEM_MAESTRO.md`, EOP-029) + Brand Assets (`MQC_BRAND_ASSETS_v1.0.zip`, EOP-030) **ya integrados** al proyecto real (íconos en sidebar/accesos rápidos, fondos vivos en Mi Progreso/Tabla Periódica — EOP-030.5).
- ✅ **La Curiosidad — cambio de arquitectura importante (EOP-034 identidad):** el activo oficial ya NO es el PNG estático (`photon-oficial.png`, congelado en EOP-027) — pasó a ser un **modelo vectorial construido en código** (núcleo, halo, 3 órbitas, ojos energéticos con mirada/parpadeo/microseguimiento, siluetas de corazón/interrogante para Motivación/Pensando). Posición y tamaño definitivos: `top:64px; right:76px`, `139px` de diámetro. API pública sin cambios (`mount/setState/react/...`). El PNG anterior queda como archivo histórico sin uso.
- ✅ Bugs reales corregidos en EOP-037 (actualización de UI en tiempo real, prioridad Nivel>Insignia en Photon, videos placeholder retirados, error conceptual de contenido) — reconfirmados estables en el QA de Beta.
- ✅ Protocolo de aceptación de usuario (SAT) construido y listo para usar (`SAT_PROTOCOL_MQC_v1.0.md` + 5 documentos más, EOP-033) — separado del proyecto, para validación con estudiantes reales.

Pendiente real (documentado, no bloqueante para Beta):
- `PhotonSound` (sistema de sonido) **no existe en el proyecto** — estaba solo documentado en resúmenes de identidad antiguos, nunca se implementó en código. Prioridad BAJA.
- 25 de los 33 íconos de Brand Assets aún sin destino de integración (contenido pedagógico específico: medallas, mensajes).
- Experimento de "ojos energéticos" (EOP-028B) — ya **es** el activo oficial desde EOP-034 (ver arriba), este punto queda resuelto.
- `#B983FF` (Proyecto Integrador) pendiente de incorporar formalmente a la tabla de colores del Design System Maestro.

## Cómo pedir continuar el trabajo (ejemplo de mensaje a un chat nuevo)

> "Retomemos MásQueCiencia. El núcleo funcional está cerrado (EOP-019) — adjunto `PROJECT_CONTEXT_MQC.md`, `MQC_MASTER_PROJECT_v1.0.md` y el ZIP `MasQueCiencia_Alpha_v1.0.zip`. Quiero avanzar en [identidad visual / Fotón definitivo / iconografía], sin tocar el núcleo funcional ya congelado."

## Archivos que SIEMPRE conviene adjuntar al retomar el proyecto

1. `MQC_MASTER_PROJECT_v1.0.md`
2. `PROJECT_CONTEXT_MQC.md` (este archivo)
3. `MasQueCiencia_Alpha_v1.0.zip` completo y más reciente — no fragmentos.

---

*Ver `CHANGELOG.md` para el historial completo de decisiones y `README.md` para instrucciones de arranque técnico.*
