# PNE_11_FINAL_VALIDATION_REPORT.md
## Simulacro PNE · Ciencias (11.º) — Fase 2: Cierre visual y validación final

**Fecha:** 2026-08-18
**Alcance:** cierre del ticket "FASE 2 — CIERRE VISUAL Y VALIDACIÓN FINAL". El motor, la matemática, la selección 20/20/20 y los bancos históricos **no se tocaron** — solo se completaron los elementos provisionales (recursos visuales, QA de distractores, pruebas) tal como se pidió.

---

## 1. Los 28 recursos visuales pendientes — estado final

| Estado | Cantidad | Detalle |
|---|---:|---|
| ✅ Extraídos del PDF original, limpios, verificados | **21** | Ver sección 2 |
| ✅ Reemplazados por referencia a la Tabla Periódica de MQC (indicación del docente: las tablas periódicas completas de referencia al final de una prueba no son necesarias) | **2** | `PNE-2024-D01-Q-003`, `PNE-2024-T01-Q-027` |
| ⚠️ Siguen en `PNE_ASSET_PENDING` | **5** | Los 5 dependen de `Ciencias_Diagnostica_2025.pdf`, que **nunca se subió a este chat** (ver sección 13) |

**`PNE_ASSET_PENDING` actual: 5, no 0.** Por eso, y siguiendo la propia regla de la Sección 19 del ticket ("NO declarar lista la PNE mientras exista `PNE_ASSET_PENDING`"), **este informe no cierra con la declaración final** — ver sección 14.

## 2. Assets creados (21 imágenes reales)

Carpeta `assets/pne/{biologia,fisica,quimica}/`, nomenclatura `pne-{año}-{versión}-q{número}.png`:

| Ciencia | Cantidad | Archivos |
|---|---:|---|
| Biología | 7 | `pne-2023-d01-q022`, `pne-2023-d03-q029`, `pne-2023-d03-q030` (mismo recurso que q029, red trófica compartida entre 2 ítems), `pne-2024-d01-q024`, `pne-2024-t01-q013`, `pne-2024-t01-q019`, `pne-2024-t01-q021` |
| Física | 2 | `pne-2023-d01-q019`, `pne-2024-t01-q009` |
| Química | 12 | `pne-2023-d01-q001/002/003/004/005/008`, `pne-2024-d01-q004/005/007`, `pne-2024-t01-q029/033/034` |

Cada uno se extrajo del PDF fuente real, se recortó ajustado a la figura (sin texto de opciones ni marcas), y se verificó visualmente antes de guardarse — método documentado en el hilo de trabajo de esta fase.

## 3. Ítems con recursos recreados digitalmente (`RECREADO_FIELMENTE_DESDE_ORIGINAL`)

**0 ítems.** Se encontró **1 caso real de contaminación** (`PNE-2024-D01-Q-003`: marcas de escaneo tapando el símbolo y la masa atómica de Se y Br en una tabla periódica completa), pero como esa misma tabla quedó excluida por indicación del docente (sección 1), **no fue necesario reconstruirla** — se resolvió con la referencia a la Tabla Periódica de MQC en su lugar, que es además una solución más útil para el estudiante (interactiva, sin errores de transcripción posibles).

## 4. QA de las 156 opciones D

Ver `PNE_DISTRACTOR_D_QA.md` completo. Resumen:
- **0 duplicados textuales** D=A/B/C.
- **14 correcciones de estilo/redacción** aplicadas (cláusulas justificativas que rompían el estilo terso de A/B/C en ítems de una sola palabra).
- **1 corrección de fondo real**: una D que, tras el primer ajuste de estilo, quedó semánticamente casi-idéntica a otra opción incorrecta (`PNE-2024-T01-Q-008`) — detectada y corregida antes de quedar en el banco final.
- Revisión conceptual manual de las 156, una por una: 0 casos de absurdidad evidente, 0 de información externa al estímulo, 0 símbolos químicos incorrectos.
- Ninguna respuesta histórica (`respuesta_correcta`) fue modificada.

## 5. Distribución de 20 simulacros automáticos

Ver `PNE_SELECTOR_DISTRIBUTION_QA.md` completo. Resumen:
- 20/20 intentos con 60 preguntas, 20/20/20 por ciencia, 0 IDs duplicados.
- Racha máxima de mismo tema consecutivo: 2 (y solo en 2 de los 20 intentos) — nunca 3 o más.
- 0 repetición de ítems entre intentos consecutivos del mismo perfil (verificado también en una cadena adicional de 8 intentos consecutivos: 0 repetidos en los 8).
- 20/20 combinaciones de 60 preguntas son únicas entre sí.
- La frecuencia de selección por tema/competencia/año refleja fielmente la composición real del banco histórico — no hay sesgo introducido por el algoritmo (evidencia cuantitativa en el informe).

## 6. Prueba de persistencia (Sección 14)

Ejecutada dos veces (arnés aislado y contra el `index.html` real con un perfil real creado). Resultado:
- Iniciar examen → responder preguntas → navegar → **recargar la página** → volver al simulacro: las respuestas dadas, el índice de la pregunta actual y la nota de presentación **sobreviven exactamente igual**.
- La pantalla de entrada ofrece "▶ Reanudar simulacro en curso" cuando detecta un intento sin terminar.
- Mecanismo: `Storage.set('simulacroNacional', {...})` en cada respuesta y en cada navegación — el mismo sistema de persistencia que ya usa el resto de MQC, sin código nuevo de bajo nivel.

## 7. Comportamiento en modo Invitado (Sección 15)

Verificado contra el `index.html` real:
- El invitado **puede iniciar y completar el simulacro con total normalidad**.
- Si recarga la página a mitad de un intento, el progreso **se pierde** — porque el modo Invitado de MQC ya usa un búfer en memoria (`Storage.js`) para todo, no algo específico de este módulo. `MQCProfiles.isGuest()` sigue en `true` tras recargar, pero `Storage.get('simulacroNacional').enProgreso` vuelve a `null`.
- **Decisión tomada** (siguiendo la primera opción de la Sección 15, la que se obtiene automáticamente sin escribir código especial): *"el invitado puede realizar el simulacro sin historial persistente"*. No se creó ningún comportamiento nuevo — se heredó el que ya existe en toda la plataforma.
- La pantalla de entrada avisa explícitamente al invitado antes de empezar.

## 8. Prueba responsive (Sección 9 y 27)

Viewport 375×667 (iPhone SE / mini) y 667×375 (landscape):
- Pantalla de entrada y examen: sin overflow horizontal.
- Las 4 opciones caben dentro del ancho de pantalla.
- Navegador de preguntas (modal 1–60): las 60 celdas se renderizan, el contenedor tiene scroll vertical funcional.
- Lightbox de imagen: la imagen ampliada cabe dentro del viewport (356 px de 375 px disponibles).
- 0 errores de página durante toda la prueba móvil.

## 9. Pruebas matemáticas

Los 5 casos de la Sección 32 del ticket original de Fase 1 se reconfirmaron sobre el código ya integrado (no solo en aislamiento):

| Caso | Resultado |
|---|---|
| A) P=48, E=80 → aporte=32, final=80, mínimo=55 % | ✅ exacto |
| B) P=48, E=50 → aporte=20, final=68 (no alcanza 70) | ✅ exacto |
| C) P=42 → mínimo=70 % | ✅ exacto |
| D) P=30 → mínimo=100 % | ✅ exacto |
| E) P=20 → caso "imposible", mensaje especial | ✅ exacto |

Además, en esta fase se verificó de punta a punta contra la interfaz real: un intento completo con P=48 respondido al azar llega a la pantalla de resultados con el panel de proyección académica mostrando los 6 valores requeridos (aciertos/60, % PNE, presentación/60, aporte/40, proyección/100, mínimo necesario) sin error.

## 10. No-regresión (Sección 17) — los 11 sistemas

| Sistema | Resultado |
|---|---|
| Inicio | ✅ renderiza sin error |
| Unidades 10.º | ✅ renderiza sin error |
| Química 11.º | ✅ renderiza sin error |
| Atlas Químico | ✅ renderiza sin error |
| Tabla Periódica | ✅ renderiza sin error (además, ahora también se usa como destino de navegación desde el simulacro) |
| Integrador | ✅ renderiza sin error |
| Progreso | ✅ renderiza sin error |
| Desafío Final 10.º (`pne-final`) | ✅ renderiza sin error, con el texto renombrado de la Fase 1 intacto |
| Perfiles | ✅ nombre del perfil visible correctamente en toda la app |
| Accesibilidad (`window.PNE`) | ✅ **sigue existiendo intacto**, confirmado como objeto distinto de `window.SimulacroNacional` — sin colisión |
| Photon | ✅ presente |

**Prueba más importante de esta sección:** se capturó `Storage.get('pne')` (el Desafío Final de Química 10.º) **antes y después** de abrir el simulacro nuevo — el objeto queda **byte por byte idéntico**. Confirma de forma directa que el módulo nuevo nunca escribe en `data.pne`, tal como se diseñó desde la Fase 1.

**0 errores de página o consola** en todo el recorrido (descontando las fallas de red a Google Fonts, ya documentadas como comportamiento esperado sin conexión en el propio `README.md` del proyecto).

## 11. Archivos creados en esta Fase 2

| Archivo | Contenido |
|---|---|
| `assets/pne/biologia/*.png` (7) | Recursos visuales reales |
| `assets/pne/fisica/*.png` (2) | Recursos visuales reales |
| `assets/pne/quimica/*.png` (12) | Recursos visuales reales |
| `PNE_DISTRACTOR_D_QA.md` | Auditoría de las 156 opciones D |
| `PNE_SELECTOR_DISTRIBUTION_QA.md` | Auditoría de distribución (20 simulacros) |
| `PNE_11_FINAL_VALIDATION_REPORT.md` | Este documento |

*(Los archivos `test_*.js` usados para las pruebas de esta fase son herramientas de desarrollo, no forman parte del producto — no se copian a producción.)*

## 12. Archivos modificados en esta Fase 2

| Archivo | Cambio |
|---|---|
| `js/data/banco-nacional-quimica.js` | +19 campos `recursoVisual`, 5 opciones D corregidas por QA |
| `js/data/banco-nacional-fisica.js` | +2 campos `recursoVisual`, 3 opciones D corregidas por QA (incluida la corrección de fondo de `Q-008`) |
| `js/data/banco-nacional-biologia.js` | +7 campos `recursoVisual`, 6 opciones D corregidas por QA |
| `js/shared/simulacro-nacional-adapter.js` | **Corrección de un bug real de Fase 1**: `_adaptarItem()` no copiaba el campo `recursoVisual` a las preguntas del examen — encontrado y corregido en esta fase (ver sección 13) |
| `js/modules/simulacro-nacional.js` | Reemplazo del placeholder de texto `PNE_ASSET_PENDING` por render real de imagen con lightbox, botón de referencia a Tabla Periódica, y placeholder genuino solo para los 5 ítems bloqueados |

Ningún ítem histórico (`enunciado`, `opciones.A/B/C`, `correcta`), ningún archivo del núcleo (`Router`, `Storage`, `Gamification`, `Perfiles`), y ninguna matemática de calificación/proyección se modificó en esta fase.

## 13. Problemas todavía pendientes

1. **`Ciencias_Diagnostica_2025.pdf` sigue sin subirse a este chat.** Bloquea 5 ítems de Química (`PNE-2025-D01-Q-001/003/004/006/007`), que permanecen en `PNE_ASSET_PENDING`. Es lo único que impide declarar la Fase 2 completamente cerrada según el criterio explícito de la Sección 19.
2. **Bug real encontrado y corregido en esta misma fase** (no queda pendiente, se documenta por transparencia): el adaptador de Fase 1 no copiaba `recursoVisual` a las preguntas — ninguna imagen se mostraba en el examen hasta que se corrigió aquí. Confirma el valor de las pruebas de extremo a extremo con navegador real en vez de solo pruebas unitarias.
3. **`MQC_MASTER_PROJECT_v1.0.md`** (el archivo que `PROJECT_CONTEXT.md` marca como lectura obligatoria) sigue sin haberse subido a ningún chat de esta serie — se ha trabajado leyendo el código real en su lugar, sin incidentes hasta ahora.

---

## 14. Declaración

Siguiendo la Sección 19 del ticket ("NO declarar lista la PNE mientras exista `PNE_ASSET_PENDING`"), y dado que **`PNE_ASSET_PENDING` = 5, no 0**, esta fase **no cierra con la declaración final del ticket**.

Todo lo demás pasa limpio:

```text
60 preguntas por intento         ✅
20 Biología / 20 Física / 20 Química ✅
0 ítems no validados             ✅
4 opciones por pregunta          ✅
1 respuesta correcta             ✅
0 IDs duplicados                 ✅
0 XP por PNE                     ✅
PNE_ASSET_PENDING === 0          ❌ (5 restantes — bloqueados por Ciencias_Diagnostica_2025.pdf)
```

**Para cerrar por completo:** subir `Ciencias_Diagnostica_2025.pdf`, extraer los 5 recursos restantes con el mismo método que los otros 21, y entonces sí corresponde declarar:

> "PNE 11.° — Simulacro Nacional de Ciencias MQC listo para validación docente y publicación."

Si preferís declararlo listo igual, asumiendo esos 5 ítems como una excepción documentada y aceptada (siguen siendo preguntas 100 % calificables y correctas — solo les falta la imagen, muestran el aviso técnico en su lugar), decímelo explícitamente y lo dejo asentado como decisión tuya, no mía.
