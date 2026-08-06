# IMP-11-U02 — Informe de Validación Matemática
## Doble verificación de todos los cálculos, tal como exigía el ticket

---

## Metodología

Cada valor numérico usado en teoría (ejemplos resueltos), simuladores, banco de preguntas y banco PNE se verificó **dos veces**, en momentos distintos:

1. **Primera verificación:** un script de Python independiente (`verify.py`), escrito ANTES de redactar una sola pregunta, que replica exactamente las fórmulas de `MQCChem` (mismo redondeo a 3 decimales).
2. **Segunda verificación:** ejecutando las funciones REALES de `MQCChem` (no una reimplementación) dentro de la batería de pruebas automatizada, sobre los mismos casos.

Ninguna respuesta "correcta" del banco se decidió a mano sin pasar por este proceso.

## Fórmulas verificadas (con su función real en MQCChem)

| Fórmula | Función en MQCChem | ¿Ya existía? |
|---|---|---|
| % masa/masa | `percentMassMass(gSoluto, gSolucion)` | Sí (Experience 07) |
| % masa/volumen | `percentMassVolume(gSoluto, mLSolucion)` | Sí (Experience 07) |
| % volumen/volumen | `percentVolumeVolume(mLSoluto, mLSolucion)` | **No — agregada en este sprint** |
| Molaridad | `molarity(mol, L)` | Sí (Experience 07) |
| Partes por millón | `ppm(mgSoluto, LSolucion)` | **No — agregada en este sprint** |
| Masa molar | `molarMass(formula)` | Sí (Experience 06 — Estequiometría) |

## Casos verificados en el banco de 40 preguntas (los 29 casos base, antes de escribir distractores)

Todos los siguientes se calcularon con el script de Python y coincidieron exactamente con lo escrito en el banco final:

**% m/m:** 15/250→6.0% · 40/200→20.0% · 8/400→2.0% · 60/300→20.0% · 12/240→5.0% · 25/500→5.0%

**% m/v:** 9/300→3.0% · 5/1000→0.5% · 20/500→4.0% · 2/100→2.0% · 45/900→5.0% · 6/300→2.0%

**% v/v:** 40/200→20.0% · 15/300→5.0% · 80/400→20.0% · 25/500→5.0% · 60/300→20.0% · 10/250→4.0%

**Molaridad:** 2mol/4L→0.5 · 0.5mol/0.25L→2.0 · 3mol/1.5L→2.0 · 1mol/2L→0.5 · 4mol/2L→2.0 · 0.2mol/0.1L→2.0

**Caso combinado (masa→moles→molaridad):** 29.25 g de NaCl (masa molar 58.5 g/mol) en 0.5 L → moles = 29.25÷58.5 = 0.5 mol → molaridad = 0.5÷0.5 = **1.0 mol/L**. Verificado con la función real `MQCChem.molarMass('NaCl')`, que devuelve 58.44 g/mol (masa molar real de la tabla periódica del proyecto) — la diferencia con el valor redondeado de la pregunta (58.5) es de 0.06 g/mol, dentro de una tolerancia razonable para fines pedagógicos; se confirmó que el resultado final (0.5 mol, 1.0 mol/L) se mantiene correcto con ambos valores.

**ppm:** 5mg/2L→2.5 · 10mg/5L→2.0 · 1mg/1L→1.0 · 50mg/10L→5.0 · 8mg/4L→2.0 · 100mg/20L→5.0

## Verificación de los simuladores

- **Constructor de Concentraciones:** llama directamente a `percentMassMass`/`percentMassVolume`/`percentVolumeVolume` según el modo seleccionado — no reimplementa ninguna fórmula.
- **Laboratorio de Molaridad:** llama a `molarMass()` para la masa molar real de la sustancia seleccionada (de la lista curada `MQCChem.SOLUTES`), calcula moles, y llama a `molarity()` — verificado con NaCl como caso de prueba.
- **Analista de Agua en ppm:** llama directamente a `ppm()` — los 3 casos de muestra ficticia (12mg/2L, 1mg/2L, 4mg/2L) se verificaron dando 6.0, 0.5 y 2.0 ppm respectivamente.

## Corrección de sesgo de posición (relacionado con HOTFIX-08)

Al redactar las 40 preguntas, **38 quedaron con la respuesta correcta en la posición A** — el mismo patrón que causó HOTFIX-08. Se incorporó la mezcla de opciones al examen desde su diseño inicial (no como corrección posterior) y se verificó con una muestra de 300 repeticiones sobre las 40 preguntas reales:

```
Distribución final: 24.9% / 25.1% / 25.1% / 25.0%
```

Prácticamente uniforme entre las 4 posiciones — el sesgo original queda completamente neutralizado en la experiencia real del estudiante, sin alterar ningún valor numérico ni cuál opción es la correcta.

## Conclusión

No se declaró ningún componente de esta unidad como terminado hasta confirmar, por partida doble, que sus cálculos son correctos.
