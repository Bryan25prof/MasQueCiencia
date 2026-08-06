# IMP-11-U02 — Informe de Implementación
## Química 11.º — Unidad II: Cálculo de Concentraciones

---

## 1. Auditoría previa (punto 16 del ticket)

Antes de escribir código se auditó:
- **`js/units/grade11/g11-u01.js`** — patrón oficial ya validado (IMP-11-U01), reutilizado punto por punto para esta unidad.
- **`js/shared/chem.js` (MQCChem)** — se encontró que ya existían `molarity`, `percentMassMass`, `percentMassVolume`, `dilutionV2`, `molarMass`/`molarMassBreakdown` — reutilizados directamente, sin duplicar. **Faltaban** `percentVolumeVolume` (% v/v) y `ppm` — se agregaron ahí mismo, como ampliación aditiva de la misma familia de funciones de disoluciones, no dentro de la unidad.
- **`js/units/unit-07.js`** (Soluciones, Química 10.º) — confirmado que su progreso y sus datos nunca se tocan; la Unidad II de 11.º vive enteramente en `data.grade11['g11-u02']`.

## 2. Hallazgo real durante el desarrollo (transparencia obligatoria)

Al escribir las primeras 40 preguntas del banco y revisarlas, se encontró que **38 de 40 tenían la respuesta correcta en la posición A** — el mismo patrón exacto que causó HOTFIX-08 en la Unidad I. En vez de corregirlo reescribiendo el banco (lo que no garantiza nada a futuro), se incorporó la mezcla de opciones **desde el diseño inicial** del examen de esta unidad — nunca como parche posterior. Se verificó con una muestra de 300 repeticiones sobre las 40 preguntas reales: distribución final 24.9% / 25.1% / 25.1% / 25.0% entre las 4 posiciones.

## 3. Validación matemática (punto obligatorio del ticket)

Cada fórmula usada en el banco de preguntas, los simuladores y los ejemplos de teoría fue verificada dos veces: una con un script de Python independiente antes de escribir las preguntas, y una segunda vez ejecutando las funciones reales de `MQCChem` dentro de la batería de pruebas.

| Fórmula | Caso verificado | Resultado |
|---|---|---|
| % m/m | 15 g en 250 g | 6.0% ✅ |
| % m/v | 9 g en 300 mL | 3.0% ✅ |
| % v/v (nueva) | 40 mL en 200 mL | 20.0% ✅ |
| ppm (nueva) | 5 mg en 2 L | 2.5 ppm ✅ |
| Molaridad | 2 mol en 4 L | 0.5 mol/L ✅ |
| Moles desde masa | 29.25 g NaCl (MM 58.5) | 0.5 mol ✅ |
| Masa molar NaCl | vía `MQCChem.molarMass('NaCl')` | 58.44 g/mol (dentro de tolerancia) ✅ |

Las 40 preguntas del banco estándar y sus 40 variantes PNE comparten los mismos valores numéricos y la misma respuesta correcta — verificado por comparación directa de IDs y de índices `correcta`.

## 4. Continuidad narrativa (punto 3 del ticket)

Se encontró que la misión de cierre real de la Unidad I (`g11-u01.js`) solo tenía 3 preguntas, no las 5 que el ticket original de IMP-11-U01 preveía — faltaba exactamente la pregunta puente que este sprint necesitaba ("¿Qué información faltaría para determinar la concentración de la sustancia?"). El ticket de este sprint autoriza explícitamente "una conexión narrativa mínima y necesaria" — se agregó esa única pregunta faltante como una 4ª pregunta de la misión de la Unidad I (mínimo cambio posible, sin tocar nada más de esa unidad), y se confirmó que la misión de la Unidad II retoma esos mismos datos cuantitativos y termina con una pregunta puente hacia la Unidad III ("¿qué información adicional necesitarías para identificar la sustancia?").

## 5. Contenido construido

- **7 temas de teoría**, cada uno con fórmula, ejemplo resuelto con números reales, error frecuente, y conexión ambiental/cotidiana.
- **3 simuladores**, todos interactivos (con decisión/ajuste real del estudiante) y todos usando `MQCChem` directamente, sin recalcular nada por su cuenta:
  - Constructor de Concentraciones (% m/m, % m/v, % v/v en vivo).
  - Laboratorio de Molaridad (usa `molarMass` + `molarity`; incluye la nota pedida por el ticket de que la representación de partículas es didáctica, no una propiedad real universal).
  - Analista de Agua en ppm (usa `ppm`; límites explícitamente marcados como ficticios del caso, nunca presentados como estándar legal real).
- **1 juego** ("Código de la Muestra") que exige identificar primero la unidad correcta antes de calcular — mide razonamiento, no solo velocidad.
- **Banco de 40 preguntas**, 20 por intento, 6 categorías todas superando el mínimo exigido (5/6/6/6/7/6/4 reales vs. 4/3/3/3/3/3 mínimos).
- **Banco PNE adaptado**, cobertura 40/40 confirmada.
- **Misión de cierre** ("Informe cuantitativo de la muestra") con la misma protección anti-farming de HOTFIX-06/IMP-11-U01.
- **Insignia "Precisión Química"**, con condición de finalización real idéntica en estructura a "Primera Gota" — verificado explícitamente que no se otorga con la misión sola.

## 6. Pruebas ejecutadas — 24/24 en PASS (más la verificación estadística del examen)

| # | Prueba | Resultado |
|---|---|---|
| M1-M6 | Las 6 fórmulas de MQCChem (incluidas las 2 nuevas) dan el resultado matemático correcto | ✅ |
| B1-B4 | Banco de 40 preguntas: cantidad, sin duplicados, distribución por categoría, cobertura PNE 40/40 | ✅ |
| 1 | La Unidad I sigue funcionando con la conexión narrativa agregada | ✅ |
| 2 | Química 10.º no cambió | ✅ |
| 3 | La Unidad II aparece solo en Química 11.º, con estado Disponible (las otras 2 siguen en desarrollo) | ✅ |
| 4 | Los 7 temas cargan | ✅ |
| 5 | Las fórmulas se muestran con sus unidades correctas | ✅ |
| 6 | Los 3 simuladores están listados | ✅ |
| 7 | El juego renderiza con botón de inicio | ✅ |
| 8 | El examen indica 40/20 correctamente | ✅ |
| 9 | La misión conecta hacia la Unidad III | ✅ |
| 10-11 | Protección anti-farming de la misión (XP una sola vez) | ✅ |
| 12-13 | La insignia exige finalización real | ✅ |
| 14 | Modo simplificado con banco adaptado | ✅ |
| 15 | Lectura por voz sin excepción | ✅ |
| 16 | Exportar/importar conserva el progreso | ✅ |
| 17 | Cálculo real de moles y molaridad verificado con NaCl | ✅ |
| 18 | Sin errores de consola reales | ✅ |
| — | Distribución de opciones del examen tras mezclar (300 repeticiones) | 24.9%/25.1%/25.1%/25.0% ✅ |

## 7. Responsive

Verificado con `wkhtmltoimage` que la tarjeta de la Unidad II hereda exactamente el mismo sistema de altura uniforme ya confirmado en HOTFIX-05 (misma clase `.unit-card`, sin CSS nuevo agregado). No se introdujo ningún layout o componente visual distinto al ya aprobado.

## 8. Declaración final

**"Unidad II — Cálculo de concentraciones integrada, verificada y lista para publicación gradual en MásQueCiencia."**
