/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u09.js  |  Banco PNE — UNIDAD IX
   ================================================================
   Variantes ADAPTADAS (lenguaje simple, frases cortas) de las 30
   preguntas. Mismo id; "correcta" coherente. Cobertura 30/30.
================================================================ */

window.BANCO_PNE_U09 = {
  /* BÁSICO */
  'q-09-001-b': { pregunta: '¿Cuál es el Nox del oxígeno en casi todos los compuestos?',
    opciones: ['+1', '−2', '+2', '0'], correcta: 1,
    explicacion_correcta: 'Casi siempre es −2.',
    explicacion_incorrectas: ['Ese es del hidrógeno.', '', 'No es este valor.', 'Solo es 0 si está solo (O₂).'] },

  'q-09-002-b': { pregunta: '¿Cuál es el Nox del hidrógeno en casi todos los compuestos?',
    opciones: ['−1', '+1', '+2', '0'], correcta: 1,
    explicacion_correcta: 'Casi siempre es +1.',
    explicacion_incorrectas: ['Es una excepción rara.', '', 'No es este valor.', 'Solo es 0 si está solo (H₂).'] },

  'q-09-003-b': { pregunta: '¿Cuánto debe sumar el Nox total en un compuesto neutro?',
    opciones: ['0', '+1', '14', 'Cambia siempre'], correcta: 0,
    explicacion_correcta: 'Siempre debe sumar 0.',
    explicacion_incorrectas: ['', 'No es este valor.', 'No aplica.', 'No, siempre es 0.'] },

  'q-09-004-b': { pregunta: '¿Qué pasa en una oxidación?',
    opciones: ['Se ganan electrones', 'Se pierden electrones', 'Se ganan protones', 'No cambia nada'], correcta: 1,
    explicacion_correcta: 'Se pierden electrones.',
    explicacion_incorrectas: ['Eso es reducción.', '', 'No involucra protones.', 'Sí cambia: sube el Nox.'] },

  'q-09-005-b': { pregunta: '¿Qué pasa en una reducción?',
    opciones: ['Se pierden electrones', 'Se ganan electrones', 'Se pierden protones', 'No cambia nada'], correcta: 1,
    explicacion_correcta: 'Se ganan electrones.',
    explicacion_incorrectas: ['Eso es oxidación.', '', 'No involucra protones.', 'Sí cambia: baja el Nox.'] },

  'q-09-006-b': { pregunta: '¿Qué le pasa al agente reductor?',
    opciones: ['Se reduce', 'Se oxida', 'No hace nada', 'Siempre es un gas noble'], correcta: 1,
    explicacion_correcta: 'El agente reductor SE OXIDA.',
    explicacion_incorrectas: ['Eso es el oxidante.', '', 'Sí participa.', 'No tiene que ver con gases nobles.'] },

  'q-09-007-b': { pregunta: '¿Qué le pasa al agente oxidante?',
    opciones: ['Se oxida', 'Se reduce', 'No hace nada', 'Siempre pierde electrones'], correcta: 1,
    explicacion_correcta: 'El agente oxidante SE REDUCE.',
    explicacion_incorrectas: ['Eso es el reductor.', '', 'Sí participa.', 'Gana electrones, no los pierde.'] },

  'q-09-008-b': { pregunta: '¿Qué hace una semirreacción de oxidación?',
    opciones: ['Libera electrones', 'Consume electrones', 'No usa electrones', 'Solo pasa en gases'], correcta: 0,
    explicacion_correcta: 'Libera electrones.',
    explicacion_incorrectas: ['', 'Eso hace la de reducción.', 'Sí usa electrones.', 'Puede pasar en cualquier estado.'] },

  'q-09-009-b': { pregunta: 'En una celda galvánica, ¿qué pasa en el ánodo?',
    opciones: ['Reducción', 'Oxidación', 'Nada', 'Electrólisis'], correcta: 1,
    explicacion_correcta: 'En el ánodo ocurre la oxidación.',
    explicacion_incorrectas: ['Eso es en el cátodo.', '', 'Sí ocurre algo.', 'Es un proceso distinto.'] },

  'q-09-010-b': { pregunta: '¿Para qué sirve la electricidad en la electrólisis?',
    opciones: ['Para producir energía química', 'Para forzar una reacción', 'Solo para dar calor', 'No se usa electricidad'], correcta: 1,
    explicacion_correcta: 'Se usa para forzar una reacción que no ocurriría sola.',
    explicacion_incorrectas: ['Es al revés: eso hace la celda galvánica.', '', 'No es solo calor.', 'Sí se necesita electricidad.'] },

  /* INTERMEDIO */
  'q-09-011-i': { pregunta: 'En KMnO₄, ¿cuál es el Nox del Mn?',
    opciones: ['+2', '+4', '+7', '−1'], correcta: 2,
    explicacion_correcta: 'Debe ser +7 para que todo sume 0.',
    explicacion_incorrectas: ['No cuadra.', 'No cuadra.', '', 'No corresponde.'] },

  'q-09-012-i': { pregunta: 'En H₂SO₄, ¿cuál es el Nox del azufre?',
    opciones: ['+4', '+6', '−2', '+2'], correcta: 1,
    explicacion_correcta: 'Debe ser +6 para que todo sume 0.',
    explicacion_incorrectas: ['No cuadra.', '', 'No cuadra.', 'No cuadra.'] },

  'q-09-013-i': { pregunta: 'En Fe₂O₃, ¿cuál es el Nox del hierro?',
    opciones: ['+2', '+3', '+1', '−3'], correcta: 1,
    explicacion_correcta: 'Debe ser +3 para compensar la carga.',
    explicacion_incorrectas: ['No cuadra.', '', 'No cuadra.', 'No corresponde.'] },

  'q-09-014-i': { pregunta: 'En Zn + Cu²⁺ → Zn²⁺ + Cu, ¿qué le pasa al zinc?',
    opciones: ['Se reduce', 'Se oxida', 'No cambia', 'Se vuelve no metal'], correcta: 1,
    explicacion_correcta: 'Pasa de 0 a +2: se oxida.',
    explicacion_incorrectas: ['Sube su Nox, no baja.', '', 'Sí cambia.', 'Sigue siendo metal.'] },

  'q-09-015-i': { pregunta: 'En la misma reacción, ¿qué le pasa al Cu²⁺?',
    opciones: ['Se oxida', 'Se reduce', 'No cambia', 'Es agente reductor'], correcta: 1,
    explicacion_correcta: 'Pasa de +2 a 0: se reduce.',
    explicacion_incorrectas: ['Baja su Nox, no sube.', '', 'Sí cambia.', 'Es agente oxidante, no reductor.'] },

  'q-09-016-i': { pregunta: 'En Fe + 2H⁺ → Fe²⁺ + H₂, ¿cuál es el agente oxidante?',
    opciones: ['Fe', 'H⁺', 'Fe²⁺', 'H₂'], correcta: 1,
    explicacion_correcta: 'El H⁺ se reduce: es el oxidante.',
    explicacion_incorrectas: ['El Fe es el reductor.', '', 'Es un producto.', 'Es un producto.'] },

  'q-09-017-i': { pregunta: 'En una celda, ¿hacia dónde van los electrones por el cable?',
    opciones: ['Del cátodo al ánodo', 'Del ánodo al cátodo', 'No se mueven', 'Hacia la disolución'], correcta: 1,
    explicacion_correcta: 'Van del ánodo al cátodo.',
    explicacion_incorrectas: ['Es al revés.', '', 'Sí se mueven.', 'Van por el cable, no por la disolución.'] },

  'q-09-018-i': { pregunta: 'Celda Zn/Cu (E°Zn=−0.76, E°Cu=+0.34). ¿Cuál es el voltaje?',
    opciones: ['0.42 V', '1.10 V', '−1.10 V', '0 V'], correcta: 1,
    explicacion_correcta: '0.34 − (−0.76) = 1.10 V.',
    explicacion_incorrectas: ['No es esta resta.', '', 'Debe ser positivo.', 'Sí genera voltaje.'] },

  'q-09-019-i': { pregunta: 'En la celda Zn/Cu, ¿cuál metal es el ánodo?',
    opciones: ['El cobre', 'El zinc', 'Ambos', 'Ninguno'], correcta: 1,
    explicacion_correcta: 'El zinc, con menor E°, es el ánodo.',
    explicacion_incorrectas: ['El cobre es el cátodo.', '', 'Cada uno tiene un rol distinto.', 'Sí hay un ánodo.'] },

  'q-09-020-i': { pregunta: '¿Qué iguala el método de balanceo por cambio de Nox?',
    opciones: ['Los subíndices originales', 'Cuánto sube y baja el Nox', 'Solo los oxígenos', 'El volumen'], correcta: 1,
    explicacion_correcta: 'Iguala electrones perdidos y ganados usando el cambio de Nox.',
    explicacion_incorrectas: ['No se basa en subíndices.', '', 'No es solo oxígeno.', 'No se usa el volumen.'] },

  'q-09-021-i': { pregunta: 'En medio ácido, ¿qué se agrega para balancear una semirreacción?',
    opciones: ['H₂O y H⁺', 'Solo O₂', 'Electrones al azar', 'Cloro extra'], correcta: 0,
    explicacion_correcta: 'Se agrega H₂O y H⁺ según se necesite.',
    explicacion_incorrectas: ['', 'No se usa O₂ gaseoso.', 'Se igualan con control, no al azar.', 'No es parte del método.'] },

  'q-09-022-i': { pregunta: 'En Mg + Cl₂ → MgCl₂, ¿cuál es la semirreacción de reducción?',
    opciones: ['Mg → Mg²⁺ + 2e⁻', 'Cl₂ + 2e⁻ → 2Cl⁻', 'MgCl₂ → Mg + Cl₂', 'No hay semirreacciones'], correcta: 1,
    explicacion_correcta: 'El Cl₂ gana electrones: es la reducción.',
    explicacion_incorrectas: ['Esa es la oxidación del Mg.', '', 'No es una semirreacción.', 'Sí las hay.'] },

  /* AVANZADO */
  'q-09-023-a': { pregunta: 'En el ion SO₄²⁻, ¿cuál es el Nox del azufre?',
    opciones: ['+4', '+6', '+2', '−2'], correcta: 1,
    explicacion_correcta: 'Debe ser +6 para que sume −2 (carga del ion).',
    explicacion_incorrectas: ['No cuadra.', '', 'No cuadra.', 'No cuadra.'] },

  'q-09-024-a': { pregunta: 'En Cu + 2Ag⁺ → Cu²⁺ + 2Ag, ¿cuál es el agente reductor?',
    opciones: ['Ag⁺', 'Cu', 'Ag', 'Cu²⁺'], correcta: 1,
    explicacion_correcta: 'El Cu se oxida: es el reductor.',
    explicacion_incorrectas: ['El Ag⁺ es el oxidante.', '', 'Es un producto.', 'Es un producto.'] },

  'q-09-025-a': { pregunta: 'Celda Mg (E°=−2.37) y Ag (E°=+0.80). ¿Voltaje de la celda?',
    opciones: ['1.57 V', '3.17 V', '−1.57 V', '0.80 V'], correcta: 1,
    explicacion_correcta: '0.80 − (−2.37) = 3.17 V.',
    explicacion_incorrectas: ['No es esta resta.', '', 'Debe ser positivo.', 'Ese es solo el E° de la plata.'] },

  'q-09-026-a': { pregunta: 'En 2Na + Cl₂ → 2NaCl, ¿cómo cambia el Nox del cloro?',
    opciones: ['De 0 a −1', 'De −1 a 0', 'De +1 a −1', 'De 0 a +1'], correcta: 0,
    explicacion_correcta: 'El Cl₂ (0) se reduce a Cl⁻ (−1).',
    explicacion_incorrectas: ['', 'Es al revés.', 'No corresponde.', 'Gana electrón, no lo pierde.'] },

  'q-09-027-a': { pregunta: '¿Cómo se obtiene el aluminio de su mineral?',
    opciones: ['Con una celda galvánica', 'Con electrólisis', 'Solo con calor', 'Sin ninguna reacción redox'], correcta: 1,
    explicacion_correcta: 'Se necesita electrólisis, porque no es espontáneo.',
    explicacion_incorrectas: ['No es espontáneo.', '', 'El calor solo no basta.', 'Sí es una reacción redox forzada.'] },

  'q-09-028-a': { pregunta: 'Antes de sumar dos semirreacciones, ¿qué debe igualarse?',
    opciones: ['Solo los oxígenos', 'Los electrones perdidos y ganados', 'El electrodo donde ocurren', 'Nada, se suman directo'], correcta: 1,
    explicacion_correcta: 'Los electrones deben quedar igualados antes de sumar.',
    explicacion_incorrectas: ['No basta con esto.', '', 'Ocurren en electrodos distintos.', 'Sí hay que ajustar antes.'] },

  'q-09-029-a': { pregunta: 'En Fe + 2H⁺ → Fe²⁺ + H₂, ¿cuál es la semirreacción de oxidación?',
    opciones: ['Fe → Fe²⁺ + 2e⁻', '2H⁺ + 2e⁻ → H₂', 'Fe²⁺ + 2e⁻ → Fe', 'H₂ → 2H⁺ + 2e⁻'], correcta: 0,
    explicacion_correcta: 'El Fe pierde electrones: es la oxidación.',
    explicacion_incorrectas: ['', 'Esa es la reducción del H⁺.', 'Sería una reducción inversa.', 'No ocurre en esta reacción.'] },

  'q-09-030-a': { pregunta: 'Si ningún átomo cambia su Nox, ¿qué se concluye?',
    opciones: ['Es redox fuerte', 'No es una reacción redox', 'Es una celda galvánica', 'Libera muchos electrones'], correcta: 1,
    explicacion_correcta: 'Sin cambio de Nox, no hay redox.',
    explicacion_incorrectas: ['No puede ser redox sin cambio de Nox.', '', 'Las celdas se basan en redox.', 'No hay transferencia de electrones.'] }
};
