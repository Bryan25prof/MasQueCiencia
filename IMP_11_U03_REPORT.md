# IMP-11-U03 — Informe de Implementación
## Química 11.º — Unidad III: Química Orgánica I (Hidrocarburos y Nomenclatura)

---

## 1. Auditoría previa

Se estudió `g11-u02.js` (patrón oficial ya validado en dos unidades) y se confirmó que no existía ningún motor de nomenclatura orgánica en `MQCChem` — se construyó desde cero, siguiendo la misma convención aditiva ya usada para las funciones de disoluciones (Unidad II).

## 2. Validación exhaustiva de nomenclatura (punto explícitamente obligatorio del ticket)

Se verificaron dos veces **las 28 combinaciones** posibles de carbono/familia dentro del alcance de esta unidad (10 alcanos + 9 alquenos + 9 alquinos — los alquenos/alquinos no existen con 1 carbono):

1. **Primera verificación:** script de Python independiente, antes de escribir el motor real.
2. **Segunda verificación:** ejecutando `MQCChem.alkaneFormula()`/`alkeneFormula()`/`alkyneFormula()` (las funciones reales) dentro de la batería de pruebas automatizada, comparando cada resultado contra la tabla de referencia conocida.

| Familia | Fórmula general | Casos verificados | Resultado |
|---|---|---|---|
| Alcano | CnH(2n+2) | 1 a 10 carbonos (metano...decano) | ✅ Los 10 coinciden exactamente |
| Alqueno | CnH(2n) | 2 a 10 carbonos (eteno...deceno) | ✅ Los 9 coinciden exactamente |
| Alquino | CnH(2n−2) | 2 a 10 carbonos (etino...decino) | ✅ Los 9 coinciden exactamente |

**Los 10 prefijos oficiales** (met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-) se verificaron en orden exacto contra la lista pedida por el ticket.

**Verificación cruzada adicional** (no pedida explícitamente, pero agregada por rigor): para cada número de carbonos de 2 a 10, se confirmó que alcano > alqueno > alquino en cantidad de hidrógenos, con una diferencia constante de exactamente 2 hidrógenos entre cada familia consecutiva — una propiedad estructural real de los hidrocarburos que sirve como verificación matemática cruzada de que el motor está bien construido, no solo memorizando valores sueltos.

**Caso límite verificado explícitamente:** un alqueno o alquino de 1 carbono no puede existir (un enlace doble o triple necesita 2 carbonos) — se confirmó que `alkeneFormula(1)` y `alkyneFormula(1)` devuelven `null`, y el Constructor Molecular deshabilita esas opciones cuando solo hay 1 carbono seleccionado.

## 3. Alcance respetado (punto explícito del ticket)

Se usó únicamente: carbono, hidrógeno, enlaces simples/dobles/triples, alcanos, alquenos, alquinos, y nomenclatura de alcanos. **No se desarrolló** ningún contenido de alcoholes, ácidos, éteres, aldehídos, cetonas, aminas, grupos funcionales ni biomoléculas — confirmado por revisión del banco de 40 preguntas, que no contiene ninguna de esas palabras.

## 4. Continuidad narrativa

La misión de cierre retoma explícitamente las 3 fórmulas candidatas del derrame (una de cada familia) sin repetir el contenido de las unidades anteriores, y su tercera pregunta conecta directamente hacia la Unidad IV (Grupos Funcionales y Biomoléculas), preguntando qué haría falta aprender para reconocer compuestos con oxígeno — el tema central de esa próxima unidad.

**No se modificó ningún archivo de las Unidades I o II** — se verificó explícitamente en la batería de pruebas que ambas siguen renderizando correctamente tras agregar la Unidad III.

## 5. Contenido construido

- **7 temas de teoría**, cada uno con explicación, ejemplo resuelto, y conexión con el caso del derrame.
- **3 simuladores**, todos usando `MQCChem.organicFormula()` directamente (ningún cálculo hecho a mano):
  - Constructor Molecular (elegir carbonos + tipo de enlace, ver fórmula y nombre en vivo; deshabilita combinaciones imposibles).
  - Laboratorio de Enlaces (cadena fija, cambiar el enlace, comparar contra el alcano equivalente).
  - Detector Orgánico (dada una fórmula real, identificar familia/nombre/carbonos).
- **1 juego** ("Misión Carbono") con casos aleatorios, contra reloj, sin repetición inmediata dentro de una ronda.
- **Banco de 40 preguntas**, 20 por intento, 5 categorías todas superando el mínimo (8/8/7/6/6 reales vs. 4/4/3/3/3 mínimos), cubriendo estructuras, nombres, clasificación, conteo de carbonos y errores frecuentes explícitamente pedidos por el ticket.
- **Banco PNE adaptado**, cobertura 40/40.
- **Misión de cierre** con la misma protección anti-farming ya establecida.
- **Insignia "Cadena de Carbono"** (⬡), mismo patrón exacto de finalización real que las 2 unidades anteriores.

## 6. Corrección del sesgo de posición desde el diseño

Al igual que en la Unidad II, las 40 preguntas se escribieron con la respuesta correcta consistentemente en la posición A (para facilitar la redacción) — el examen mezcla las opciones una única vez al construir cada intento, desde su diseño inicial. Verificado con 300 repeticiones sobre las 40 preguntas reales: distribución final 25.6%/25.4%/24.3%/24.7%.

## 7. Pruebas ejecutadas — 27/27 en PASS (más la verificación estadística del examen)

| # | Prueba | Resultado |
|---|---|---|
| N1-N6 | Nomenclatura exhaustiva: prefijos, 10 alcanos, 9 alquenos, 9 alquinos, casos límite de 1 carbono, verificación cruzada de las 3 familias | ✅ |
| B1-B4 | Banco: 40 preguntas, sin duplicados, distribución por categoría, cobertura PNE 40/40 | ✅ |
| 1-2 | Química 10.º y las Unidades I-II no se rompieron | ✅ |
| 3 | La Unidad III aparece disponible; solo queda 1 en desarrollo | ✅ |
| 4-8 | Los 7 temas, 3 simuladores, juego, examen y misión renderizan correctamente | ✅ |
| 9-10 | Protección anti-farming de la misión | ✅ |
| 11-12 | La insignia exige finalización real | ✅ |
| 13-14 | Modo simplificado y lectura por voz | ✅ |
| 15 | Exportar/importar conserva el progreso | ✅ |
| 16 | El Constructor Molecular usa el motor real correctamente | ✅ |
| 17 | Sin errores de consola reales | ✅ |

## 8. Declaración final

**"Unidad III integrada, validada y lista para pruebas."**
