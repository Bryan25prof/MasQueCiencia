# FIX10_U01_IMPLEMENTATION_REPORT.md
## Física 10.° — FIX10-U01: La Física en el contexto histórico y actual

**Fecha:** 2026-08-31
**Fuente académica:** Libro "Física 10° — Un enfoque práctico" (proporcionado por el docente), Unidad I / Tema 1, apartados 1.1 a 1.8 (páginas 25-67).
**Estado:** Primera unidad real de Física, funcional de punta a punta. Física 10.º pasa de "En desarrollo" a "Disponible" — FIX10-U02 a FIX10-U07 siguen "Próximamente" (no se construyeron, según regla explícita del sprint).

---

## 1. Archivos creados

| Archivo | Contenido |
|---|---|
| `js/modules/fisica10.js` | Router + grid de las 7 unidades de Física 10.º (mismo patrón que `grade11.js`) |
| `js/units/fisica10/fix10-u01.js` | Plugin de contenido: 6 temas, 3 simuladores, 1 juego (5 escenarios), examen, misión final |
| `js/data/banco-fix10-u01.js` | Banco de 50 preguntas reales, derivadas del libro fuente |
| `FIX10_U01_IMPLEMENTATION_REPORT.md` | Este informe |

## 2. Archivos modificados

| Archivo | Cambio | ¿Frozen? |
|---|---|---|
| `js/core/storage.js` | Carril paralelo `data.fisica10` + funciones `updateFisica10Unit`/`markFisica10TopicRead`/`getFisica10UnitProgress` (mismo patrón que Química 11.º) | Sí — pedido explícito y específico |
| `js/core/gamification.js` | XP `'fisica10-mission-done'` + insignia `🔭 Explorador de la Física` (mismo patrón anti-farming que "primera-gota") | Sí — pedido explícito y específico |
| `js/modules/grade-select.js` | Física ahora tiene su propia "Elegí tu año" (10.º real / 11.º en desarrollo), igual que Química | No |
| `index.html` | Sidebar: "Física 10.º" ya no dice "Pronto", entra directo a la unidad. Scripts de los 3 archivos nuevos agregados | No |

**Ningún archivo de Química ni Biología fue tocado.**

## 3. Contenido implementado (6 temas)

Derivado y **parafraseado** (nunca copiado textual) del libro fuente:

1. **¿Qué es la Física?** — objeto de estudio, modelos, especialidades (astrofísico, biofísico, etc.)
2. **Física teórica y experimental** — Michelson (experimental) vs. Einstein (teórico), Fermi (ambos)
3. **Del universo clásico a la relatividad** — postulados de Einstein, dilatación del tiempo, paradoja de los gemelos, relatividad general, conexión real con el GPS. Los agujeros de gusano se presentan explícitamente como modelo hipotético nunca observado, tal como pedía el sprint.
4. **Física moderna** — bosón de Higgs, LHC/CERN, teletransportación cuántica (con su límite real explicado), teoría de cuerdas, tabla de las 4 fuerzas fundamentales
5. **¿Dónde está la Física?** — astrofísica (Kepler, Maxwell, agujeros negros), mecánica e ingeniería
6. **Física, tecnología y sociedad** — superconductores, efecto Meissner, trenes maglev, Proyecto Mars One

## 4. Simuladores (3, interactivos de verdad)

1. **"Teoría o Experimento"** — 10 situaciones reales (Michelson, Einstein, CERN, Kepler, etc.) para clasificar como Teórica/Experimental/Ambas, con retroalimentación conceptual distinta en cada una.
2. **"¿Dónde está la Física?"** — 6 elementos (GPS, puente, láser, microscopio, tren maglev, satélite) que revelan su área de Física al tocarlos.
3. **"Cambia el observador"** — comparación real Tierra vs. vehículo, basada en el ejemplo del avión del propio libro.

## 5. Juego — "Detective de la Física"

5 escenarios reales (puente colgante, GPS, láser quirúrgico, tren maglev, CERN), cada uno con una pista que **orienta sin revelar la respuesta** (regla explícita del sprint — se verificó que ninguna pista menciona directamente el área correcta).

## 6. Misión final — "Tecnología bajo la lupa"

Caso GPS, con las 4 preguntas guiadas que pedía el sprint (áreas involucradas, fenómeno, por qué se necesitó teoría y experimentación, impacto social).

## 7. Examen — 30 de 50 preguntas, con anti-trampa verificado

- 50 preguntas reales, todas derivadas del libro, repartidas en los 6 temas.
- Cada intento selecciona 30 al azar.
- **Bug encontrado y corregido durante la prueba:** las 50 preguntas venían con la respuesta correcta siempre en la primera posición — un estudiante podría haber aprobado solo tocando siempre la primera opción. Se agregó una mezcla de las opciones en cada intento. **Verificado con Chromium real:** tocando siempre la primera opción en las 30 preguntas, el resultado fue 23% — confirma que la mezcla funciona.

## 8. XP y gamificación

Reutiliza el 100% de la infraestructura ya existente (Storage, Gamification, Photon) — no se creó ningún sistema paralelo. Se aplicaron **desde el diseño** las mismas protecciones anti-farming que se corrigieron esta sesión en las 13 unidades de Química:
- Releer un tema no repite XP.
- Completar el mismo simulador de nuevo no repite XP.
- Aprobar el examen de nuevo no repite XP.
- Insignia nueva: 🔭 Explorador de la Física (requiere completar las 5 partes de verdad, mismo criterio anti-farming que "primera-gota" de Química 11.º).

## 9. Pruebas realizadas (Chromium real)

| # | Prueba | Resultado |
|---|---|---|
| 1 | `node --check` en los 3 archivos nuevos + 4 modificados | ✅ |
| 2 | Navegación completa: Inicio académico → Física → Física 10.º → FIX10-U01 | ✅ |
| 3 | Las 5 pestañas (Teoría/Simuladores/Juego/Examen/Misión) cargan sin error | ✅ |
| 4 | XP correcto en las 5 partes, sin farming (releer tema, repetir simulador) | ✅ |
| 5 | Examen completo (30 preguntas) de principio a fin | ✅ |
| 6 | Mezcla de opciones del examen verificada (23% eligiendo siempre la primera opción) | ✅ |
| 7 | Misión final se entrega y marca correctamente | ✅ |
| 8 | No regresión: Química 10.º/11.º, Tabla Periódica, Progreso, Atlas, Acerca de | ✅ Sin errores de consola en desktop/iPhone/Android |

## 10. Responsive y accesibilidad

Probado en desktop, iPhone y Android sin errores. Ningún simulador depende de hover — todos usan clics/touch directos. Sin imágenes con alt que revelen respuestas (los simuladores usan texto directamente, no imágenes con alt descriptivo todavía).

## 11. Analytics

No se modificó la arquitectura de Analytics. El progreso de Física 10.º vive en `data.fisica10`, separado de Química — si en el futuro se quiere distinguir por disciplina en el panel docente, haría falta una columna `disciplina` en Supabase (documentado como necesidad futura, no ejecutado).

## 12. Pendientes / limitaciones conocidas

- Las imágenes reales del libro (fotos de Einstein, del LHC, del agujero de gusano, etc.) no se incorporaron todavía como assets — el contenido es 100% texto por ahora.
- El simulador 2 podría ampliarse con una representación visual (mapa/escena) en vez de solo botones, si se quiere más adelante.
- FIX10-U02 a FIX10-U07 quedan sin construir, tal como pedía el sprint.

## 14. NO se inició FIX10-U02 antes de esta validación

Tal como pedía el sprint, se detuvo acá para revisión docente antes de continuar con la siguiente unidad.

---

## HOTFIX PEDAGÓGICO FINAL (aplicado después de la primera entrega)

**Regla de esta vuelta:** no se tocó navegación, Storage, XP, Supabase, Analytics, Química, Biología, PNE, ni **FIX10-U02** (que ya se había construido antes de recibir este hotfix, y quedó exactamente igual).

### 1-2. Juego "Detective de la Física" — corregido

**Antes:** cada escenario tenía un botón "Revelar área de la Física" que, con un solo clic, revelaba la respuesta, marcaba el nivel completado y otorgaba XP — sin exigir ninguna respuesta real.

**Ahora:** cada uno de los 5 escenarios (puente, GPS, láser, maglev, CERN) presenta una pregunta con 4 opciones mezcladas. Si el estudiante falla, ve una retroalimentación ("Volvé a leer la pista y probá otra opción") y el nivel **no** se marca completado ni otorga XP — puede reintentar. Solo si acierta, se marca `gameLevels.push(...)` y se otorga XP.

Las 5 pistas se reescribieron para **orientar sin nombrar la respuesta** (ejemplo: la pista del puente pasó de "pensá en qué disciplina diseña estructuras" a "pensá en fuerzas, equilibrio, peso y resistencia").

**Probado con Chromium real:** se verificó que fallar deliberadamente no completa el nivel ni suma XP, y que acertar sí lo hace.

### 3. Misión final "Tecnología bajo la lupa" — corregida

**Antes:** mostraba 4 preguntas de reflexión sin ningún campo de respuesta — el botón "Entregar misión" daba XP con solo pulsarlo.

**Ahora:** la misión tiene 4 componentes verificables:
- **A.** Área(s) física(s) — casillas de selección múltiple (correcto: Relatividad + Electromagnetismo, ninguna otra marcada).
- **B.** Fenómeno principal — selección única entre 4 opciones.
- **C.** Relación teoría-experimento — selección única entre 4 opciones.
- **D.** Impacto social — respuesta corta, validada entre 30 y 250 caracteres.

El botón "Entregar misión" permanece deshabilitado hasta que los 3 componentes objetivos sean correctos y la respuesta corta tenga la longitud válida. Solo entonces se marca `missionDone = true` y se otorga XP.

**Probado con Chromium real:** confirmado que el botón sigue deshabilitado con la misión vacía, con A parcialmente marcada, con B/C sin elegir, y con D demasiado corta — y que se habilita solo cuando los 4 componentes están completos y correctos.

### 4. Simulador 2 — mejorado

Se agregó una 6.ª ronda a la Fase 2 ("Demuestra") — ahora son GPS, puente, tren maglev, microscopio, CERN y satélite de comunicaciones. Se corrigió además un bug real: las opciones de cada ronda **no se mezclaban** (la respuesta correcta quedaba siempre en la misma posición) — ya se mezclan en cada ronda.

**Probado con Chromium real:** las 2 fases funcionan, y el simulador se marca completado solo al terminar las 6 rondas de la fase evaluativa.

### 5. Teoría — fragmentación visual

Los 6 temas se reorganizaron en 5 bloques cortos y con color propio: 💡 IDEA CLAVE, 📘 EXPLICACIÓN, 🔎 EJEMPLO, 🌐 APLICACIÓN REAL, y ❓ COMPRUEBA (una pregunta de reflexión). **No se agregó contenido nuevo** — es el mismo texto de antes, reorganizado para que se lea más fácil, especialmente en Relatividad y Física moderna (los temas más densos).

### 6. Examen — auditoría de contenido

Se revisaron las 50 preguntas. Los temas más delicados (agujeros de gusano, gravitón, teletransportación cuántica, teoría de cuerdas) ya estaban correctamente calificados como "hipótesis sin comprobación experimental" desde el diseño original — no fue necesario corregir ninguna. El motor del examen (banco de 50, selecciona 30, mezcla preguntas y opciones, aprobación ≥70, anti-farming) **no se tocó**.

### 7. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Juego: responder incorrecto no completa el nivel ni da XP | ✅ |
| Juego: responder correcto sí completa y da XP | ✅ |
| Misión: no se puede entregar vacía | ✅ |
| Misión: no se puede entregar con A parcial (1 de 2 correctas) | ✅ |
| Misión: no se puede entregar sin B, C, o con D muy corta | ✅ |
| Misión: se habilita y entrega solo con los 4 componentes completos y correctos | ✅ |
| Simulador 2: fase Explorar + fase Demuestra (6 rondas) + opciones mezcladas | ✅ |
| Teoría: los 5 bloques se ven correctamente fragmentados | ✅ |
| Responsive: Android e iPhone sin errores | ✅ |
| No regresión: FIX10-U02 sigue disponible e intacto | ✅ |
| No regresión general: Química, PNE, Analytics, Apoyo, modo desarrollador | ✅ Sin errores de consola |

Al terminar, se detiene acá — FIX10-U01 queda lista para congelación.
