# PNE_SELECTOR_DISTRIBUTION_QA.md
## Auditoría de distribución — 20 simulacros automáticos

**Fecha:** 2026-08-18
**Método:** se generaron 20 intentos reales llamando directamente a `SimulacroNacional.construirIntento()` (el mismo código que usa la interfaz), encadenando cada intento con los IDs del anterior para activar la lógica anti-repetición tal como ocurriría con un estudiante real repitiendo el simulacro.

---

## 1. Verificación estructural (obligatoria, Sección 11)

Sobre los 20 intentos, verificado programáticamente:

| Verificación | Resultado |
|---|---|
| 60 preguntas por intento | ✅ 20 / 20 |
| 20 Biología por intento | ✅ 20 / 20 |
| 20 Física por intento | ✅ 20 / 20 |
| 20 Química por intento | ✅ 20 / 20 |
| 0 IDs duplicados dentro del mismo intento | ✅ 20 / 20 (60 IDs únicos cada vez) |
| 0 ítems `REQUIERE_REVISIÓN` o `respuesta_validada=false` | ✅ 20 / 20 (estructuralmente imposible: esos campos no viajan a los bancos de producción — ver `PNE_11_IMPLEMENTATION_REPORT.md`, sección 5) |

**Ningún intento falló ninguna verificación estructural.**

## 2. Racha de temas consecutivos (evitar concentración, Sección 5)

Se midió la racha máxima de preguntas consecutivas del **mismo tema dentro del mismo bloque de ciencia** (el orden real de presentación al estudiante), en cada uno de los 20 intentos:

| Racha máxima | Cantidad de intentos |
|---:|---:|
| 1 (nunca se repite el tema consecutivo) | 18 / 20 |
| 2 (el tema se repite una sola vez seguido) | 2 / 20 |
| 3 o más | 0 / 20 |

**Nunca hubo 3 o más preguntas consecutivas del mismo tema**, y en el 90 % de los intentos ni siquiera hubo 2 seguidas. Esto es consecuencia directa del algoritmo round-robin por tema del selector (ver `simulacro-nacional-adapter.js`, `_seleccionarCienciaEstratificada`).

## 3. Anti-repetición entre intentos consecutivos (Sección 5)

| Métrica | Resultado |
|---|---|
| Ítems en común entre el intento N y el intento N+1 | **0 en los 19 pares consecutivos verificados** |
| Combinaciones de 60 IDs idénticas entre cualquier par de los 20 intentos | **0 — las 20 combinaciones son únicas** |

El mecanismo `idsEvitar` (los IDs del intento anterior se excluyen del siguiente antes de barajar) funciona exactamente como se diseñó: en este banco (66 Biología / 42 Física / 48 Química calificables, siempre se piden 20 de cada), nunca faltó margen para evitar por completo la repetición inmediata.

## 4. Frecuencia por ítem individual

A través de los 20 intentos (1200 preguntas mostradas en total, de 156 ítems calificables posibles):

| Métrica | Valor |
|---|---:|
| Ítems distintos que aparecieron al menos una vez | **156 / 156** (el banco completo circula, ninguno queda structurally excluido) |
| Frecuencia mínima de un ítem | 2 de 20 intentos |
| Frecuencia máxima de un ítem | 10 de 20 intentos |
| Frecuencia promedio | 7,69 de 20 |

Ningún ítem calificable quedó "atrapado" sin posibilidad de aparecer, y ningún ítem dominó de forma desproporcionada (el máximo, 10/20, sigue siendo el 50 % de los intentos — no el 100 %).

## 5. Frecuencia por tema — ¿el selector favorece algún tema? (pregunta central de la Sección 11)

**Respuesta corta: no el selector — la variación observada viene del banco histórico, no de un sesgo del algoritmo.**

Se comparó la frecuencia de selección de cada tema (a través de los 20 intentos) contra cuántos ítems de ese tema existen realmente en el banco calificable. Ejemplo con Física (30 temas distintos, 42 ítems calificables):

| Tema | Ítems disponibles en el banco | Veces seleccionado (de 1200) |
|---|---:|---:|
| Fuerzas conservativas | 3 | 28 (7,0 %) |
| Caída libre / MRUA | 3 | 27 (6,8 %) |
| Magnitudes escalares y vectoriales | 3 | 22 (5,5 %) |
| *(21 temas con solo 1 ítem disponible)* | 1 | 10 cada uno (2,5 %) |

Los 3 temas con mayor frecuencia de selección son, exactamente, los 3 únicos temas de Física que tienen **3 ítems históricos disponibles** en vez de 1 — porque esos ejes temáticos se repitieron más veces a través de las 5 pruebas reales del MEP entre 2023 y 2025. El patrón se repite en Química y Biología. Esto **no es un sesgo introducido por el selector**: es un reflejo fiel de qué temas evaluó más veces la propia Prueba Nacional Estandarizada real — exactamente lo que un simulacro fiel debería mostrar.

**Verificación de competencia (mismo control, otra variable):**

| Competencia | % en el banco completo (156) | % en las 1200 selecciones |
|---|---:|---:|
| Interpretación | 34,0 % | 33,5 % |
| Comprensión | 14,1 % | 11,9 % |
| Cálculo | 12,8 % | 14,6 % |
| Análisis | 10,9 % | 11,5 % |
| Aplicación | 7,1 % | 7,4 % |

Las proporciones de selección calzan con la composición real del banco (diferencias de 0,5–2,2 puntos porcentuales, explicables por el tamaño finito de la muestra) — el selector **no** distorsiona la proporción real de tipos de competencia del banco histórico.

## 6. Química: representación transversal (Sección 6 del ticket original)

En los 20 intentos, Química mostró entre 15 y 20 temas distintos por intento (de 38 temas posibles en el banco calificable de Química), confirmando que agrupar por `tema` logra automáticamente la "representación transversal de 10.º y 11.º" pedida — no fue necesaria ninguna regla aparte para Química, tal como se documentó en la Fase 1.

## 7. Frecuencia por año de origen y tipo de prueba

| Año | % de las 1200 selecciones |
|---|---:|
| 2023 | 34,1 % |
| 2024 | 40,1 % |
| 2025 | 25,8 % |

| Tipo de prueba | % de las 1200 selecciones |
|---|---:|
| Sumativa | 57,8 % |
| Diagnóstica | 42,2 % |

Ambas distribuciones son razonables y no muestran ningún año o tipo de prueba completamente ausente o dominante — de nuevo, la variación sigue de cerca el tamaño real de cada sub-banco (2025 aporta menos ítems calificables porque 5 de sus ítems de Química siguen bloqueados en `PNE_ASSET_PENDING` por falta del PDF fuente, ver `PNE_11_IMPLEMENTATION_REPORT.md`).

## 8. Conclusión

Las 6 verificaciones estructurales obligatorias pasan en los 20/20 intentos. El análisis de frecuencia confirma que el selector estratificado:
- nunca genera rachas largas del mismo tema (máximo 2 consecutivas, y solo en el 10 % de los casos),
- nunca repite un ítem entre intentos consecutivos de un mismo perfil,
- nunca repite la combinación completa de 60 preguntas entre ningún par de los 20 intentos,
- y reparte la selección **proporcionalmente a la composición real del banco histórico**, sin introducir un sesgo propio hacia ningún tema, competencia, año o tipo de prueba.

**No se detectó ningún problema de distribución.**
