# BUG LIST v1.0 — MásQueCiencia Beta QA
**EOP-034 · Fase 3 — Registro de hallazgos**

> Metodología: arnés de ejecución real (56 archivos combinados, DOM simulado con `localStorage` funcional) + análisis estático (`node --check`, búsqueda de rutas rotas, duplicados). Cada hallazgo se investigó en el código real antes de clasificarse — ninguno se registra por sospecha sin confirmar.

---

## Hallazgo #1

- **Descripción:** El sistema de sonido de "La Curiosidad" (`PhotonSound`) no existe en el proyecto real. No hay ningún archivo `photon-sound.js`, ninguna referencia a `PhotonSound` en ningún módulo, y ningún control de sonido conectado a la interfaz.
- **Causa probable:** El sistema fue documentado/planificado en una sesión de identidad anterior (mencionado en resúmenes de contexto previos como "EOP-021"), pero nunca llegó a implementarse en código — quedó como una decisión de diseño sin construir.
- **Módulo afectado:** Ninguno existente — es una ausencia, no un archivo roto.
- **Impacto:** El estudiante nunca escucha ningún sonido asociado a los estados de La Curiosidad ni a eventos de XP/nivel/insignia. No genera errores de consola ni bloquea ningún flujo — la plataforma funciona con normalidad, simplemente en silencio.
- **Clasificación:** **BAJA**
- **Prioridad:** No bloqueante para Beta. Queda documentado para una futura versión — construirlo ahora violaría la regla explícita de este sprint ("no agregar componentes", "no agregar nuevas funcionalidades").

---

## Hallazgos descartados tras investigación (falsos positivos, documentados por transparencia)

| # | Sospecha inicial | Resultado de la investigación |
|---|---|---|
| D1 | `assets/unidades/unit-02/diagrama.png` parecía una ruta rota (aparece en `qi.js`) | Es texto dentro de un comentario de documentación que muestra el patrón de ejemplo para registrar una unidad nueva — nunca se carga en tiempo real. No es un bug. |
| D2 | `GlobalSearch.search()` no existía | El método real se llama `GlobalSearch.query()` — error de la prueba, no del proyecto. Confirmado funcional con el nombre correcto. |
| D3 | `PNE.toggleHighContrast()`/`toggleLargeText()` no existían | La API real es `PNE.set(flag, bool)` con flags `'contraste'`/`'texto-grande'` — error de la prueba, no del proyecto. Confirmado funcional con la API correcta. |

---

## Resumen

| Severidad | Cantidad |
|---|---|
| CRÍTICO | 0 |
| ALTO | 0 |
| MEDIO | 0 |
| BAJO | 1 (PhotonSound ausente) |

**0 errores críticos o altos — el criterio de aprobación de la Fase 8 se cumple.**
