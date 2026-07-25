/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u04.js  |  Banco PNE — UNIDAD IV
   ================================================================
   Variantes ADAPTADAS (lenguaje simple, frases cortas) de las 30
   preguntas. Mismo id; "correcta" coherente. Cobertura 30/30.
================================================================ */

window.BANCO_PNE_U04 = {
  /* BÁSICO */
  'q-04-001-b': { pregunta: '¿Para qué se unen los átomos?',
    opciones: ['Para pesar más', 'Para ser más estables', 'Para cambiar de color', 'Para ser radiactivos'],
    correcta: 1, explicacion_correcta: 'Se unen para ser más estables (como un gas noble).',
    explicacion_incorrectas: ['No es por la masa.', '', 'No por color.', 'No los hace radiactivos.'] },

  'q-04-002-b': { pregunta: '¿Qué electrones forman los enlaces?',
    opciones: ['Los del núcleo', 'Los de la última capa (valencia)', 'Los protones', 'Los neutrones'],
    correcta: 1, explicacion_correcta: 'Los de valencia: los del último nivel.',
    explicacion_incorrectas: ['El núcleo no.', '', 'Los protones no.', 'Los neutrones no.'] },

  'q-04-003-b': { pregunta: 'La regla del octeto busca tener en la última capa…',
    opciones: ['2', '8', '18', '0'],
    correcta: 1, explicacion_correcta: 'Buscan 8 electrones (como los gases nobles).',
    explicacion_incorrectas: ['El 2 es para H y He.', '', '18 no.', '0 no.'] },

  'q-04-004-b': { pregunta: 'En el enlace iónico los electrones se…',
    opciones: ['Comparten', 'Pasan de un átomo a otro', 'Destruyen', 'Vuelven protones'],
    correcta: 1, explicacion_correcta: 'Se transfieren: uno cede y otro recibe.',
    explicacion_incorrectas: ['Compartir es covalente.', '', 'No se destruyen.', 'No.'] },

  'q-04-005-b': { pregunta: 'En el enlace covalente los electrones se…',
    opciones: ['Transfieren', 'Comparten', 'Pierden', 'Borran'],
    correcta: 1, explicacion_correcta: 'Se comparten entre los átomos.',
    explicacion_incorrectas: ['Transferir es iónico.', '', 'No se pierden.', 'No.'] },

  'q-04-006-b': { pregunta: 'Un átomo que PIERDE electrones queda como…',
    opciones: ['Anión (−)', 'Catión (+)', 'Neutrón', 'Isótopo'],
    correcta: 1, explicacion_correcta: 'Queda positivo: es un catión.',
    explicacion_incorrectas: ['El anión gana (−).', '', 'No.', 'No.'] },

  'q-04-007-b': { pregunta: 'En el enlace metálico hay un "mar de electrones" porque…',
    opciones: ['Los metales flotan', 'Los electrones se mueven libres entre los cationes', 'Tienen agua', 'No hay electrones'],
    correcta: 1, explicacion_correcta: 'Los electrones de valencia quedan libres y se mueven.',
    explicacion_incorrectas: ['No es flotar.', '', 'No hay agua.', 'Sí hay.'] },

  'q-04-008-b': { pregunta: '¿Qué elementos casi no se unen por ya ser estables?',
    opciones: ['Alcalinos', 'Gases nobles', 'Halógenos', 'Metaloides'],
    correcta: 1, explicacion_correcta: 'Los gases nobles ya tienen su capa llena.',
    explicacion_incorrectas: ['Los alcalinos reaccionan mucho.', '', 'Los halógenos también.', 'Los metaloides sí.'] },

  'q-04-009-b': { pregunta: 'Una estructura de Lewis dibuja con puntos los…',
    opciones: ['Protones', 'Neutrones', 'Electrones de valencia', 'Núcleos'],
    correcta: 2, explicacion_correcta: 'Dibuja los electrones de valencia.',
    explicacion_incorrectas: ['Protones no.', 'Neutrones no.', '', 'Núcleos no.'] },

  /* INTERMEDIO */
  'q-04-010-i': { pregunta: 'Un elemento del grupo 16 tiene ___ electrones de valencia.',
    opciones: ['2', '6', '16', '8'],
    correcta: 1, explicacion_correcta: 'Grupo 16 → 6 electrones de valencia.',
    explicacion_incorrectas: ['2 es grupo 2.', '', '16 es el grupo.', '8 es el octeto.'] },

  'q-04-011-i': { pregunta: 'Metal + no metal forman enlace…',
    opciones: ['Covalente', 'Iónico', 'Metálico', 'Ninguno'],
    correcta: 1, explicacion_correcta: 'Metal + no metal → iónico.',
    explicacion_incorrectas: ['Covalente es no metal + no metal.', '', 'Metálico es metal + metal.', 'Sí forman.'] },

  'q-04-012-i': { pregunta: 'No metal + no metal forman enlace…',
    opciones: ['Iónico', 'Covalente', 'Metálico', 'Nuclear'],
    correcta: 1, explicacion_correcta: 'Dos no metales → covalente (comparten).',
    explicacion_incorrectas: ['Iónico es metal + no metal.', '', 'Metálico es metal + metal.', 'No existe.'] },

  'q-04-013-i': { pregunta: 'Un enlace covalente DOBLE comparte…',
    opciones: ['1 par', '2 pares', '3 pares', 'Ninguno'],
    correcta: 1, explicacion_correcta: 'El doble comparte 2 pares.',
    explicacion_incorrectas: ['1 par es simple.', '', '3 es triple.', 'Sí comparte.'] },

  'q-04-014-i': { pregunta: 'Un enlace covalente es POLAR cuando los átomos…',
    opciones: ['Tienen igual electronegatividad', 'Tienen distinta electronegatividad', 'Son iguales', 'No comparten'],
    correcta: 1, explicacion_correcta: 'EN distinta → el par se acerca a uno → polar.',
    explicacion_incorrectas: ['Igual EN = no polar.', '', 'Iguales = no polar.', 'Sí comparten.'] },

  'q-04-015-i': { pregunta: '¿Por qué la sal conduce disuelta pero no sólida?',
    opciones: ['El agua le da electrones', 'Disuelta, los iones quedan libres para moverse', 'Cambia de elemento', 'El agua es metal'],
    correcta: 1, explicacion_correcta: 'Disuelta, los iones se mueven y llevan carga.',
    explicacion_incorrectas: ['El agua no.', '', 'No cambia.', 'No.'] },

  'q-04-016-i': { pregunta: 'La sal sólida (NaCl) es en realidad…',
    opciones: ['Una molécula sola', 'Una red de iones', 'Un gas', 'Un metal'],
    correcta: 1, explicacion_correcta: 'Es una red enorme de iones, no una molécula.',
    explicacion_incorrectas: ['No es una molécula sola.', '', 'No es gas.', 'No es metal.'] },

  'q-04-017-i': { pregunta: 'Los metales conducen electricidad por…',
    opciones: ['Sus neutrones', 'Sus electrones libres', 'Su color', 'Su masa'],
    correcta: 1, explicacion_correcta: 'Por el mar de electrones libres.',
    explicacion_incorrectas: ['Neutrones no.', '', 'Color no.', 'Masa no.'] },

  'q-04-018-i': { pregunta: 'El hidrógeno es estable con ___ electrones.',
    opciones: ['2', '4', '6', '10'],
    correcta: 0, explicacion_correcta: 'El H es estable con 2 (como el helio).',
    explicacion_incorrectas: ['', 'No.', 'No.', 'No.'] },

  'q-04-019-i': { pregunta: 'En el agua (H₂O), O e H comparten electrones. El enlace es…',
    opciones: ['Iónico', 'Covalente', 'Metálico', 'Ninguno'],
    correcta: 1, explicacion_correcta: 'Dos no metales que comparten → covalente.',
    explicacion_incorrectas: ['No se transfieren.', '', 'No hay metales.', 'Sí hay.'] },

  'q-04-020-i': { pregunta: 'El nitrógeno N₂ tiene un enlace…',
    opciones: ['Simple', 'Doble', 'Triple', 'Iónico'],
    correcta: 2, explicacion_correcta: 'Comparte 3 pares: enlace triple.',
    explicacion_incorrectas: ['No simple.', 'No doble.', '', 'No iónico.'] },

  'q-04-021-i': { pregunta: '¿Por qué el sodio cede su electrón fácilmente?',
    opciones: ['Para quedar estable como el neón', 'Porque le gusta el cloro', 'Para pesar más', 'Para ser gas'],
    correcta: 0, explicacion_correcta: 'Así queda con la capa llena (como el neón).',
    explicacion_incorrectas: ['', 'No por gusto.', 'No.', 'No.'] },

  'q-04-022-i': { pregunta: 'Un enlace entre dos átomos iguales (Cl₂) es covalente…',
    opciones: ['Polar', 'No polar', 'Iónico', 'Metálico'],
    correcta: 1, explicacion_correcta: 'Misma EN → comparten igual → no polar.',
    explicacion_incorrectas: ['Polar necesita EN distinta.', '', 'No iónico.', 'No metálico.'] },

  'q-04-023-i': { pregunta: '¿Por qué los metales se pueden moldear?',
    opciones: ['Sus enlaces son rígidos', 'Los cationes se deslizan en el mar de electrones', 'Son líquidos', 'No tienen enlaces'],
    correcta: 1, explicacion_correcta: 'El mar de electrones deja deslizar las capas.',
    explicacion_incorrectas: ['No son rígidos.', '', 'No son líquidos.', 'Sí tienen.'] },

  /* AVANZADO */
  'q-04-024-a': { pregunta: '¿Cómo predices el tipo de enlace sin memorizar?',
    opciones: ['Por el color', 'Por la posición en la tabla y la diferencia de electronegatividad', 'Por la masa', 'Al azar'],
    correcta: 1, explicacion_correcta: 'Metal/no metal + diferencia de electronegatividad.',
    explicacion_incorrectas: ['Color no.', '', 'Masa no.', 'No al azar.'] },

  'q-04-025-a': { pregunta: 'En MgCl₂, ¿por qué hay 2 cloros por 1 magnesio?',
    opciones: ['Por simetría', 'El Mg cede 2 electrones y cada Cl acepta 1', 'El cloro pesa más', 'Por casualidad'],
    correcta: 1, explicacion_correcta: 'Mg cede 2; cada Cl toma 1 → hacen falta 2 Cl.',
    explicacion_incorrectas: ['No.', '', 'No.', 'No.'] },

  'q-04-026-a': { pregunta: 'En H–F el par se acerca al flúor porque el F…',
    opciones: ['Es más grande', 'Es mucho más electronegativo', 'Tiene más neutrones', 'Es metal'],
    correcta: 1, explicacion_correcta: 'El F atrae más los electrones (muy electronegativo).',
    explicacion_incorrectas: ['Es pequeño.', '', 'Neutrones no.', 'Es no metal.'] },

  'q-04-027-a': { pregunta: 'El carbono forma 4 enlaces porque…',
    opciones: ['Tiene 4 de valencia y le faltan 4 para el octeto', 'Es metal', 'Tiene 4 protones', 'Pierde 4'],
    correcta: 0, explicacion_correcta: 'Con 4 de valencia comparte 4 pares (octeto).',
    explicacion_incorrectas: ['', 'No es metal.', 'No.', 'No los pierde.'] },

  'q-04-028-a': { pregunta: 'Diamante y grafito son carbono, pero distintos porque cambia…',
    opciones: ['El elemento', 'Cómo se enlazan los átomos', 'Los protones', 'La masa'],
    correcta: 1, explicacion_correcta: 'Mismo átomo, distinta forma de enlace.',
    explicacion_incorrectas: ['Mismo elemento.', '', 'Mismos protones.', 'Misma masa.'] },

  'q-04-029-a': { pregunta: '¿Qué par forma el enlace MENOS polar?',
    opciones: ['H y F', 'C e H (EN parecida)', 'Na y Cl', 'Li y F'],
    correcta: 1, explicacion_correcta: 'C e H tienen EN parecida → casi no polar.',
    explicacion_incorrectas: ['H–F muy polar.', '', 'Na–Cl iónico.', 'Li–F iónico.'] },

  'q-04-030-a': { pregunta: 'La idea central de toda la unidad es…',
    opciones: ['Los átomos se unen al azar', 'Se unen para ser estables, y su diferencia decide el tipo de enlace', 'Todos los enlaces son iguales', 'Depende del color'],
    correcta: 1, explicacion_correcta: 'Estabilidad: por qué se unen y qué enlace forman.',
    explicacion_incorrectas: ['No al azar.', '', 'No son iguales.', 'No por color.'] }
};
