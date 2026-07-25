/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/preguntas-u09.js  |  Banco de Preguntas — UNIDAD IX
   ================================================================
   Unidad IX "Oxidación y Reducción". 30 preguntas (10 básicas · 12
   intermedias · 8 avanzadas). Mismo esquema que U3/U4/U7/U8.
================================================================ */

window.PREGUNTAS_U09 = [

  /* ───────────── BÁSICO (10) ───────────── */
  {
    id: 'q-09-001-b', unidad: 9, tema: 'Número de oxidación', nivel: 'basico', tipo: 'su',
    pregunta: 'El número de oxidación del oxígeno en la mayoría de los compuestos es:',
    opciones: ['+1', '−2', '+2', '0'],
    correcta: 1,
    explicacion_correcta: 'El oxígeno tiene Nox −2 en la gran mayoría de los compuestos.',
    explicacion_incorrectas: ['Ese valor corresponde casi siempre al hidrógeno.', '', 'No es el valor típico del oxígeno.', 'Solo es 0 en el elemento libre (O₂), no en compuestos.'],
    imagen: null, formula: null, tags: ['nox']
  },
  {
    id: 'q-09-002-b', unidad: 9, tema: 'Número de oxidación', nivel: 'basico', tipo: 'su',
    pregunta: 'El número de oxidación del hidrógeno en la mayoría de los compuestos es:',
    opciones: ['−1', '+1', '+2', '0'],
    correcta: 1,
    explicacion_correcta: 'El hidrógeno tiene Nox +1 en la mayoría de los compuestos.',
    explicacion_incorrectas: ['Ese valor es una excepción (hidruros metálicos), no la regla general.', '', 'No corresponde al hidrógeno.', 'Solo es 0 en el elemento libre (H₂).'],
    imagen: null, formula: null, tags: ['nox']
  },
  {
    id: 'q-09-003-b', unidad: 9, tema: 'Número de oxidación', nivel: 'basico', tipo: 'su',
    pregunta: 'La suma de los números de oxidación en un compuesto neutro debe dar:',
    opciones: ['0', '+1', '14', 'Depende del compuesto'],
    correcta: 0,
    explicacion_correcta: 'En un compuesto neutro, la suma de todos los Nox es 0.',
    explicacion_incorrectas: ['', 'No es un valor fijo distinto de cero.', 'Ese valor no aplica aquí.', 'Es siempre 0 para compuestos neutros, sin excepción.'],
    imagen: null, formula: null, tags: ['nox']
  },
  {
    id: 'q-09-004-b', unidad: 9, tema: 'Oxidación', nivel: 'basico', tipo: 'su',
    pregunta: 'La oxidación es un proceso en el que un átomo:',
    opciones: ['Gana electrones', 'Pierde electrones', 'Gana protones', 'No cambia'],
    correcta: 1,
    explicacion_correcta: 'Oxidación = pérdida de electrones (el Nox sube).',
    explicacion_incorrectas: ['Ganar electrones es reducción.', '', 'No involucra protones.', 'Sí cambia: su Nox sube.'],
    imagen: null, formula: null, tags: ['oxidacion']
  },
  {
    id: 'q-09-005-b', unidad: 9, tema: 'Reducción', nivel: 'basico', tipo: 'su',
    pregunta: 'La reducción es un proceso en el que un átomo:',
    opciones: ['Pierde electrones', 'Gana electrones', 'Pierde protones', 'No cambia'],
    correcta: 1,
    explicacion_correcta: 'Reducción = ganancia de electrones (el Nox baja).',
    explicacion_incorrectas: ['Perder electrones es oxidación.', '', 'No involucra protones.', 'Sí cambia: su Nox baja.'],
    imagen: null, formula: null, tags: ['reduccion']
  },
  {
    id: 'q-09-006-b', unidad: 9, tema: 'Agentes oxidantes y reductores', nivel: 'basico', tipo: 'su',
    pregunta: 'El agente reductor es la especie que:',
    opciones: ['Se reduce', 'Se oxida', 'No reacciona', 'Siempre es un metal noble'],
    correcta: 1,
    explicacion_correcta: 'El agente reductor es el que SE OXIDA (dona electrones al otro).',
    explicacion_incorrectas: ['Reducirse es el rol del agente oxidante.', '', 'Sí participa activamente en la reacción.', 'No es exclusivo de metales nobles.'],
    imagen: null, formula: null, tags: ['agentes']
  },
  {
    id: 'q-09-007-b', unidad: 9, tema: 'Agentes oxidantes y reductores', nivel: 'basico', tipo: 'su',
    pregunta: 'El agente oxidante es la especie que:',
    opciones: ['Se oxida', 'Se reduce', 'No reacciona', 'Siempre pierde electrones'],
    correcta: 1,
    explicacion_correcta: 'El agente oxidante es el que SE REDUCE (acepta electrones del otro).',
    explicacion_incorrectas: ['Oxidarse es el rol del agente reductor.', '', 'Sí participa activamente.', 'Gana electrones, no los pierde.'],
    imagen: null, formula: null, tags: ['agentes', 'err:e1']
  },
  {
    id: 'q-09-008-b', unidad: 9, tema: 'Semirreacciones', nivel: 'basico', tipo: 'su',
    pregunta: 'Una semirreacción de oxidación se caracteriza porque:',
    opciones: ['Libera electrones', 'Consume electrones', 'No involucra electrones', 'Solo ocurre en gases'],
    correcta: 0,
    explicacion_correcta: 'La semirreacción de oxidación libera electrones.',
    explicacion_incorrectas: ['', 'Consumir electrones es la semirreacción de reducción.', 'Sí involucra electrones, es su característica central.', 'Puede ocurrir en cualquier estado de la materia.'],
    imagen: null, formula: null, tags: ['semirreaccion']
  },
  {
    id: 'q-09-009-b', unidad: 9, tema: 'Celdas electroquímicas', nivel: 'basico', tipo: 'su',
    pregunta: 'En una celda galvánica, el ánodo es el electrodo donde ocurre:',
    opciones: ['La reducción', 'La oxidación', 'Ninguna reacción', 'La electrólisis'],
    correcta: 1,
    explicacion_correcta: 'El ánodo es donde ocurre la oxidación (se liberan electrones).',
    explicacion_incorrectas: ['La reducción ocurre en el cátodo.', '', 'Sí ocurre una reacción: la oxidación.', 'La electrólisis es un proceso distinto (no espontáneo).'],
    imagen: null, formula: null, tags: ['celdas']
  },
  {
    id: 'q-09-010-b', unidad: 9, tema: 'Electrólisis', nivel: 'basico', tipo: 'su',
    pregunta: 'La electrólisis utiliza:',
    opciones: ['Energía química para producir electricidad', 'Energía eléctrica externa para forzar una reacción', 'Solo calor', 'Ninguna forma de energía'],
    correcta: 1,
    explicacion_correcta: 'La electrólisis usa electricidad externa para forzar una reacción no espontánea.',
    explicacion_incorrectas: ['Eso describe a la celda galvánica, el proceso inverso.', '', 'No se basa solo en calor.', 'Sí requiere energía eléctrica.'],
    imagen: null, formula: null, tags: ['electrolisis']
  },

  /* ───────────── INTERMEDIO (12) ───────────── */
  {
    id: 'q-09-011-i', unidad: 9, tema: 'Número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En el KMnO₄, el número de oxidación del Mn es:',
    opciones: ['+2', '+4', '+7', '−1'],
    correcta: 2,
    explicacion_correcta: 'K=+1, O=−2×4=−8; para sumar 0, Mn debe ser +7.',
    explicacion_incorrectas: ['No cuadra con la suma total.', 'No cuadra con la suma total.', '', 'No corresponde a este cálculo.'],
    imagen: null, formula: 'KMnO₄', tags: ['nox']
  },
  {
    id: 'q-09-012-i', unidad: 9, tema: 'Número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En el H₂SO₄, el número de oxidación del azufre (S) es:',
    opciones: ['+4', '+6', '−2', '+2'],
    correcta: 1,
    explicacion_correcta: 'H=+1×2=+2, O=−2×4=−8; para sumar 0, S debe ser +6.',
    explicacion_incorrectas: ['No corresponde a este cálculo.', '', 'No corresponde a este cálculo.', 'No corresponde a este cálculo.'],
    imagen: null, formula: 'H₂SO₄', tags: ['nox']
  },
  {
    id: 'q-09-013-i', unidad: 9, tema: 'Número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En el Fe₂O₃, el número de oxidación del hierro (Fe) es:',
    opciones: ['+2', '+3', '+1', '−3'],
    correcta: 1,
    explicacion_correcta: 'O=−2×3=−6; para que 2 átomos de Fe compensen, cada uno debe ser +3.',
    explicacion_incorrectas: ['No compensa la carga total.', '', 'No compensa la carga total.', 'No corresponde a este óxido.'],
    imagen: null, formula: 'Fe₂O₃', tags: ['nox']
  },
  {
    id: 'q-09-014-i', unidad: 9, tema: 'Cambios de número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En la reacción Zn + Cu²⁺ → Zn²⁺ + Cu, el zinc:',
    opciones: ['Se reduce (Nox baja)', 'Se oxida (Nox sube)', 'No cambia su Nox', 'Se convierte en un no metal'],
    correcta: 1,
    explicacion_correcta: 'El Zn pasa de 0 a +2: su Nox sube, se oxida.',
    explicacion_incorrectas: ['Su Nox sube, no baja.', '', 'Sí cambia: de 0 a +2.', 'Sigue siendo un metal.'],
    imagen: null, formula: null, tags: ['cambio-nox']
  },
  {
    id: 'q-09-015-i', unidad: 9, tema: 'Cambios de número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En la misma reacción Zn + Cu²⁺ → Zn²⁺ + Cu, el cobre (Cu²⁺):',
    opciones: ['Se oxida', 'Se reduce', 'No cambia', 'Actúa como agente reductor'],
    correcta: 1,
    explicacion_correcta: 'El Cu pasa de +2 a 0: su Nox baja, se reduce.',
    explicacion_incorrectas: ['Su Nox baja, no sube.', '', 'Sí cambia: de +2 a 0.', 'Al reducirse, es el agente oxidante, no el reductor.'],
    imagen: null, formula: null, tags: ['cambio-nox']
  },
  {
    id: 'q-09-016-i', unidad: 9, tema: 'Agentes oxidantes y reductores', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En Fe + 2H⁺ → Fe²⁺ + H₂, el agente oxidante es:',
    opciones: ['Fe', 'H⁺', 'Fe²⁺', 'H₂'],
    correcta: 1,
    explicacion_correcta: 'El H⁺ se reduce a H₂ (gana electrones): es el agente oxidante.',
    explicacion_incorrectas: ['El Fe se oxida: es el agente reductor.', '', 'Es el producto de la oxidación del Fe.', 'Es el producto de la reducción del H⁺.'],
    imagen: null, formula: null, tags: ['agentes']
  },
  {
    id: 'q-09-017-i', unidad: 9, tema: 'Celdas electroquímicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En una celda galvánica, los electrones fluyen por el circuito externo desde:',
    opciones: ['El cátodo hacia el ánodo', 'El ánodo hacia el cátodo', 'No fluyen electrones', 'Ambos electrodos hacia la disolución'],
    correcta: 1,
    explicacion_correcta: 'Los electrones salen del ánodo (oxidación) y llegan al cátodo (reducción).',
    explicacion_incorrectas: ['Es la dirección invertida.', '', 'Sí fluyen: esa es la corriente eléctrica generada.', 'Fluyen por el circuito externo, no hacia la disolución.'],
    imagen: null, formula: null, tags: ['celdas', 'err:e3']
  },
  {
    id: 'q-09-018-i', unidad: 9, tema: 'Celdas electroquímicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En una celda Zn/Cu (E°Zn=−0.76 V, E°Cu=+0.34 V), el voltaje de la celda es aproximadamente:',
    opciones: ['0.42 V', '1.10 V', '−1.10 V', '0 V'],
    correcta: 1,
    explicacion_correcta: 'Voltaje = E°cátodo − E°ánodo = 0.34 − (−0.76) = 1.10 V.',
    explicacion_incorrectas: ['No corresponde a la resta correcta.', '', 'El voltaje de la celda es positivo en una reacción espontánea.', 'La celda sí genera un voltaje considerable.'],
    imagen: null, formula: 'V = E°cátodo − E°ánodo', tags: ['celdas']
  },
  {
    id: 'q-09-019-i', unidad: 9, tema: 'Celdas electroquímicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En la celda Zn/Cu, el metal que actúa como ánodo es:',
    opciones: ['El cobre (mayor E°)', 'El zinc (menor E°)', 'Ambos por igual', 'Ninguno, no hay ánodo'],
    correcta: 1,
    explicacion_correcta: 'El zinc, con menor E° (−0.76 V), se oxida y actúa como ánodo.',
    explicacion_incorrectas: ['El cobre, con mayor E°, actúa como cátodo.', '', 'Cada uno cumple un rol distinto.', 'Toda celda galvánica tiene un ánodo y un cátodo.'],
    imagen: null, formula: null, tags: ['celdas']
  },
  {
    id: 'q-09-020-i', unidad: 9, tema: 'Balanceo por cambio de número de oxidación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El método de balanceo por cambio de número de oxidación iguala:',
    opciones: ['Los subíndices originales de la fórmula', 'Cuánto sube el Nox de uno con cuánto baja el del otro', 'El número de átomos de oxígeno solamente', 'El volumen de los reactivos'],
    correcta: 1,
    explicacion_correcta: 'Se igualan los electrones perdidos y ganados usando el cambio de Nox como base.',
    explicacion_incorrectas: ['Los subíndices no se usan como base del método.', '', 'No se limita al oxígeno.', 'No se trabaja con volumen en este método.'],
    imagen: null, formula: null, tags: ['balanceo']
  },
  {
    id: 'q-09-021-i', unidad: 9, tema: 'Balanceo por ion-electrón', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En el balanceo por ion-electrón en medio ácido, además de balancear átomos se agrega para balancear cargas y oxígenos/hidrógenos:',
    opciones: ['H₂O y H⁺', 'Solo O₂ gaseoso', 'Solo electrones sin control', 'Cloro adicional'],
    correcta: 0,
    explicacion_correcta: 'En medio ácido se agregan moléculas de agua e iones H⁺ según se necesite.',
    explicacion_incorrectas: ['', 'No se usa O₂ gaseoso para este balanceo.', 'Los electrones se igualan de forma controlada, no al azar.', 'No es parte del método general.'],
    imagen: null, formula: null, tags: ['balanceo']
  },
  {
    id: 'q-09-022-i', unidad: 9, tema: 'Semirreacciones', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En Mg + Cl₂ → MgCl₂, la semirreacción de reducción corresponde a:',
    opciones: ['Mg → Mg²⁺ + 2e⁻', 'Cl₂ + 2e⁻ → 2Cl⁻', 'MgCl₂ → Mg + Cl₂', 'Ninguna, no hay semirreacciones aquí'],
    correcta: 1,
    explicacion_correcta: 'El Cl₂ gana electrones (se reduce) formando 2Cl⁻.',
    explicacion_incorrectas: ['Esa es la semirreacción de oxidación del Mg.', '', 'Esa no es una semirreacción, es la reacción inversa completa.', 'Sí las hay: esta es una reacción redox.'],
    imagen: null, formula: null, tags: ['semirreaccion']
  },

  /* ───────────── AVANZADO (8) ───────────── */
  {
    id: 'q-09-023-a', unidad: 9, tema: 'Número de oxidación', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En el ion sulfato (SO₄²⁻), el número de oxidación del azufre es:',
    opciones: ['+4', '+6', '+2', '−2'],
    correcta: 1,
    explicacion_correcta: 'O=−2×4=−8; para que la suma dé −2 (carga del ion), S debe ser +6 (−8+6=−2).',
    explicacion_incorrectas: ['No cuadra con la carga del ion.', '', 'No cuadra con la carga del ion.', 'No cuadra con la carga del ion.'],
    imagen: null, formula: 'SO₄²⁻', tags: ['nox']
  },
  {
    id: 'q-09-024-a', unidad: 9, tema: 'Agentes oxidantes y reductores', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En Cu + 2Ag⁺ → Cu²⁺ + 2Ag, el agente reductor es:',
    opciones: ['Ag⁺', 'Cu', 'Ag', 'Cu²⁺'],
    correcta: 1,
    explicacion_correcta: 'El Cu se oxida (0 → +2): es el agente reductor.',
    explicacion_incorrectas: ['El Ag⁺ se reduce: es el agente oxidante.', '', 'Es el producto de la reducción, no el agente reductor.', 'Es el producto de la oxidación del Cu.'],
    imagen: null, formula: null, tags: ['agentes']
  },
  {
    id: 'q-09-025-a', unidad: 9, tema: 'Celdas electroquímicas', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Entre Mg (E°=−2.37 V) y Ag (E°=+0.80 V), el voltaje de la celda formada es:',
    opciones: ['1.57 V', '3.17 V', '−1.57 V', '0.80 V'],
    correcta: 1,
    explicacion_correcta: 'Voltaje = E°cátodo − E°ánodo = 0.80 − (−2.37) = 3.17 V.',
    explicacion_incorrectas: ['No corresponde a la resta correcta.', '', 'El voltaje de una celda espontánea es positivo.', 'Ese es solo el E° de la plata, no el voltaje total.'],
    imagen: null, formula: 'V = E°cátodo − E°ánodo', tags: ['celdas']
  },
  {
    id: 'q-09-026-a', unidad: 9, tema: 'Cambios de número de oxidación', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En 2Na + Cl₂ → 2NaCl, el número de oxidación del cloro cambia de:',
    opciones: ['0 a −1', '−1 a 0', '+1 a −1', '0 a +1'],
    correcta: 0,
    explicacion_correcta: 'El Cl₂ (Nox=0) se reduce a Cl⁻ (Nox=−1) dentro del NaCl.',
    explicacion_incorrectas: ['', 'El cambio real es al revés de esta opción.', 'No corresponde a este caso.', 'El cloro gana un electrón, no lo pierde.'],
    imagen: null, formula: null, tags: ['cambio-nox']
  },
  {
    id: 'q-09-027-a', unidad: 9, tema: 'Electrólisis', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La obtención industrial de aluminio a partir de su mineral requiere:',
    opciones: ['Una celda galvánica espontánea', 'Electrólisis, por ser una reacción no espontánea', 'Solo calentamiento simple', 'Ninguna reacción redox'],
    correcta: 1,
    explicacion_correcta: 'Separar el aluminio de su mineral no es espontáneo: requiere electrólisis con gran cantidad de energía eléctrica.',
    explicacion_incorrectas: ['No es un proceso espontáneo que produzca electricidad.', '', 'El calor solo no basta para esta separación.', 'Sí es una reacción redox forzada.'],
    imagen: null, formula: null, tags: ['electrolisis']
  },
  {
    id: 'q-09-028-a', unidad: 9, tema: 'Balanceo por ion-electrón', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Antes de sumar dos semirreacciones balanceadas, es indispensable que:',
    opciones: ['Tengan el mismo número de átomos de oxígeno solamente', 'El número de electrones perdidos y ganados sea igual', 'Ambas ocurran en el mismo electrodo', 'Se ignoren las cargas'],
    correcta: 1,
    explicacion_correcta: 'Los electrones liberados en la oxidación deben igualar a los consumidos en la reducción antes de sumar.',
    explicacion_incorrectas: ['No basta con igualar solo oxígenos.', '', 'Ocurren en electrodos distintos (ánodo y cátodo).', 'Las cargas deben quedar balanceadas, no ignoradas.'],
    imagen: null, formula: null, tags: ['balanceo']
  },
  {
    id: 'q-09-029-a', unidad: 9, tema: 'Semirreacciones', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En Fe + 2H⁺ → Fe²⁺ + H₂, la semirreacción de oxidación es:',
    opciones: ['Fe → Fe²⁺ + 2e⁻', '2H⁺ + 2e⁻ → H₂', 'Fe²⁺ + 2e⁻ → Fe', 'H₂ → 2H⁺ + 2e⁻'],
    correcta: 0,
    explicacion_correcta: 'El Fe pierde 2 electrones (0 → +2): es la semirreacción de oxidación.',
    explicacion_incorrectas: ['', 'Esa es la semirreacción de reducción del H⁺.', 'Esa sería una reducción, en sentido inverso.', 'Esa describe una oxidación del H₂, que no ocurre en esta reacción.'],
    imagen: null, formula: null, tags: ['semirreaccion']
  },
  {
    id: 'q-09-030-a', unidad: 9, tema: 'Cambios de número de oxidación', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Si en una reacción ningún átomo cambia su número de oxidación, se puede concluir que:',
    opciones: ['Es una reacción redox fuerte', 'No es una reacción redox', 'Es una celda galvánica', 'Libera muchos electrones'],
    correcta: 1,
    explicacion_correcta: 'Sin cambio de Nox en ningún átomo, no hay oxidación-reducción.',
    explicacion_incorrectas: ['Sin cambio de Nox no puede ser redox, mucho menos "fuerte".', '', 'Las celdas galvánicas se basan en reacciones redox.', 'Sin cambio de Nox no hay transferencia de electrones.'],
    imagen: null, formula: null, tags: ['cambio-nox', 'err:e4']
  }

];
