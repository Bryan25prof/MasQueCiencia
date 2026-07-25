/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u03.js  |  Banco PNE — UNIDAD III
   ================================================================
   Variantes ADAPTADAS de las 30 preguntas (lenguaje simple, frases
   cortas). Mismo id; índice "correcta" coherente. PNEBank.present()
   las sirve en modo simplificado (♿). Cobertura 30/30.
================================================================ */

window.BANCO_PNE_U03 = {
  /* BÁSICO */
  'q-03-001-b': { pregunta: 'La tabla moderna ordena los elementos por…',
    opciones: ['Su masa', 'Su número atómico (Z)', 'Su tamaño', 'Su color'],
    correcta: 1, explicacion_correcta: 'Se ordenan por número atómico (Z), de menor a mayor.',
    explicacion_incorrectas: ['Esa era la idea vieja.', '', 'El tamaño no.', 'El color no.'] },

  'q-03-002-b': { pregunta: 'Las FILAS (horizontales) se llaman…',
    opciones: ['Grupos', 'Períodos', 'Familias', 'Bloques'],
    correcta: 1, explicacion_correcta: 'Las filas son los períodos. Hay 7.',
    explicacion_incorrectas: ['Los grupos son columnas.', '', 'Las familias son columnas.', 'Bloque es otra cosa.'] },

  'q-03-003-b': { pregunta: 'Las COLUMNAS (verticales) se llaman grupos o…',
    opciones: ['Períodos', 'Familias', 'Niveles', 'Bloques'],
    correcta: 1, explicacion_correcta: 'Las columnas son los grupos o familias. Hay 18.',
    explicacion_incorrectas: ['Los períodos son filas.', '', 'No son niveles.', 'No son bloques.'] },

  'q-03-004-b': { pregunta: 'La mayoría de los elementos son…',
    opciones: ['No metales', 'Metales', 'Gases nobles', 'Metaloides'],
    correcta: 1, explicacion_correcta: 'La mayoría son metales (izquierda y centro).',
    explicacion_incorrectas: ['Los no metales son menos.', '', 'Los gases nobles son una columna.', 'Los metaloides son pocos.'] },

  'q-03-005-b': { pregunta: 'La última columna (grupo 18) son los…',
    opciones: ['Alcalinos', 'Halógenos', 'Gases nobles', 'Metaloides'],
    correcta: 2, explicacion_correcta: 'El grupo 18 son los gases nobles (muy estables).',
    explicacion_incorrectas: ['Los alcalinos son el grupo 1.', 'Los halógenos el 17.', '', 'No son metaloides.'] },

  'q-03-006-b': { pregunta: 'El grupo 1 (sin el hidrógeno) son los…',
    opciones: ['Gases nobles', 'Metales alcalinos', 'Halógenos', 'Metaloides'],
    correcta: 1, explicacion_correcta: 'El grupo 1 son los metales alcalinos (Li, Na, K).',
    explicacion_incorrectas: ['Los gases nobles son el 18.', '', 'Los halógenos el 17.', 'No son metaloides.'] },

  'q-03-007-b': { pregunta: '¿Cuántas filas (períodos) hay?',
    opciones: ['5', '7', '18', '10'],
    correcta: 1, explicacion_correcta: 'Hay 7 períodos.',
    explicacion_incorrectas: ['Son 7.', '', '18 son los grupos.', 'No es 10.'] },

  'q-03-008-b': { pregunta: '¿Cuántos bloques de subnivel hay?',
    opciones: ['2 (s, p)', '4 (s, p, d, f)', '3 (s, p, d)', '1'],
    correcta: 1, explicacion_correcta: 'Hay 4 bloques: s, p, d y f.',
    explicacion_incorrectas: ['Faltan d y f.', '', 'Falta f.', 'Hay más de uno.'] },

  'q-03-009-b': { pregunta: 'Los que están "entre" metales y no metales son los…',
    opciones: ['Gases nobles', 'Metaloides', 'Halógenos', 'Lantánidos'],
    correcta: 1, explicacion_correcta: 'Los metaloides (como el silicio) están en medio.',
    explicacion_incorrectas: ['Los gases nobles son no metales.', '', 'Los halógenos son no metales.', 'Los lantánidos son metales.'] },

  /* INTERMEDIO */
  'q-03-010-i': { pregunta: 'El número de período me dice…',
    opciones: ['El grupo', 'El último nivel de energía', 'Los neutrones', 'La masa'],
    correcta: 1, explicacion_correcta: 'El período = último nivel de energía con electrones.',
    explicacion_incorrectas: ['El grupo es otra cosa.', '', 'No son los neutrones.', 'No es la masa.'] },

  'q-03-011-i': { pregunta: 'En los elementos comunes, el número de grupo me dice…',
    opciones: ['Los neutrones', 'Los electrones de valencia', 'La masa', 'El período'],
    correcta: 1, explicacion_correcta: 'El grupo = electrones de valencia (los del último nivel).',
    explicacion_incorrectas: ['No los neutrones.', '', 'No la masa.', 'El período es la fila.'] },

  'q-03-012-i': { pregunta: 'Los metales de transición están en el bloque…',
    opciones: ['s', 'p', 'd', 'f'],
    correcta: 2, explicacion_correcta: 'Están en el bloque d.',
    explicacion_incorrectas: ['s es grupos 1-2.', 'p es grupos 13-18.', '', 'f son lantánidos/actínidos.'] },

  'q-03-013-i': { pregunta: 'De izquierda a derecha en una fila, el tamaño del átomo…',
    opciones: ['Aumenta', 'Disminuye', 'Igual', 'Se duplica'],
    correcta: 1, explicacion_correcta: 'Disminuye: el núcleo atrae más a los electrones.',
    explicacion_incorrectas: ['Es al revés.', '', 'Sí cambia.', 'No se duplica.'] },

  'q-03-014-i': { pregunta: 'Al bajar por una columna, el tamaño del átomo…',
    opciones: ['Disminuye', 'Aumenta', 'Igual', 'Desaparece'],
    correcta: 1, explicacion_correcta: 'Aumenta: se añade un nivel de energía más.',
    explicacion_incorrectas: ['Es al revés.', '', 'Sí cambia.', 'No desaparece.'] },

  'q-03-015-i': { pregunta: 'El elemento que más atrae electrones (más electronegativo) es…',
    opciones: ['Cesio', 'Flúor', 'Hierro', 'Sodio'],
    correcta: 1, explicacion_correcta: 'El flúor es el más electronegativo.',
    explicacion_incorrectas: ['El cesio es de los que menos.', '', 'El hierro está en medio.', 'El sodio atrae poco.'] },

  'q-03-016-i': { pregunta: 'De izquierda a derecha, quitar un electrón (energía de ionización)…',
    opciones: ['Cuesta menos', 'Cuesta más', 'Igual', 'Es imposible'],
    correcta: 1, explicacion_correcta: 'Cuesta más: el núcleo sujeta más fuerte a los electrones.',
    explicacion_incorrectas: ['Es al revés.', '', 'Sí cambia.', 'No es imposible.'] },

  'q-03-017-i': { pregunta: 'Termina en 3s² 3p⁵. ¿Dónde está?',
    opciones: ['Período 3, grupo 17', 'Período 5, grupo 3', 'Período 3, grupo 7', 'Período 2, grupo 17'],
    correcta: 0, explicacion_correcta: 'Nivel 3 = período 3; 7 de valencia = grupo 17.',
    explicacion_incorrectas: ['', 'El nivel es 3.', 'El grupo es 17.', 'El período es 3.'] },

  'q-03-018-i': { pregunta: '¿Quién hizo la primera tabla y dejó huecos para elementos futuros?',
    opciones: ['Bohr', 'Mendeléiev', 'Dalton', 'Rutherford'],
    correcta: 1, explicacion_correcta: 'Mendeléiev ordenó y predijo elementos nuevos.',
    explicacion_incorrectas: ['Bohr: el átomo.', '', 'Dalton fue antes.', 'Rutherford: el núcleo.'] },

  'q-03-019-i': { pregunta: 'Una propiedad típica de los METALES es…',
    opciones: ['Malos conductores', 'Conducen y son maleables', 'Frágiles', 'Siempre gases'],
    correcta: 1, explicacion_correcta: 'Los metales conducen y se pueden moldear.',
    explicacion_incorrectas: ['Eso son no metales.', '', 'Eso son no metales.', 'Casi todos son sólidos.'] },

  'q-03-020-i': { pregunta: 'El bloque s son los grupos…',
    opciones: ['1 y 2', '13 a 18', '3 a 12', 'lantánidos'],
    correcta: 0, explicacion_correcta: 'El bloque s son los grupos 1 y 2.',
    explicacion_incorrectas: ['', 'Esos son bloque p.', 'Esos son bloque d.', 'Esos son bloque f.'] },

  'q-03-021-i': { pregunta: 'Los de un mismo grupo se parecen porque tienen iguales…',
    opciones: ['Neutrones', 'Electrones de valencia', 'Masa', 'Período'],
    correcta: 1, explicacion_correcta: 'Comparten los electrones de valencia.',
    explicacion_incorrectas: ['Los neutrones cambian.', '', 'La masa cambia.', 'Están en filas distintas.'] },

  'q-03-022-i': { pregunta: 'Entre los alcalinos, ¿cuál es más reactivo?',
    opciones: ['Litio (arriba)', 'Cesio (abajo)', 'Iguales', 'Ninguno'],
    correcta: 1, explicacion_correcta: 'Al bajar, más reactivo: el cesio.',
    explicacion_incorrectas: ['El litio es el menos.', '', 'No son iguales.', 'Sí reaccionan.'] },

  'q-03-023-i': { pregunta: 'Los chips de electrónica se hacen sobre todo de…',
    opciones: ['Sodio', 'Silicio (metaloide)', 'Helio', 'Oro puro'],
    correcta: 1, explicacion_correcta: 'El silicio es la base de los chips.',
    explicacion_incorrectas: ['El sodio es muy reactivo.', '', 'El helio es gas noble.', 'El oro va en contactos.'] },

  /* AVANZADO */
  'q-03-024-a': { pregunta: 'Termina en 3d⁵ 4s² (se llena 3d). Bloque…',
    opciones: ['s', 'p', 'd', 'f'],
    correcta: 2, explicacion_correcta: 'Se llena 3d → bloque d.',
    explicacion_incorrectas: ['No es s.', 'No es p.', '', 'f son lantánidos.'] },

  'q-03-025-a': { pregunta: 'Ordena de menor a mayor radio: F, Cl, Br (grupo 17).',
    opciones: ['Br < Cl < F', 'F < Cl < Br', 'Cl < F < Br', 'Iguales'],
    correcta: 1, explicacion_correcta: 'Al bajar, más grande: F < Cl < Br.',
    explicacion_incorrectas: ['Es al revés.', '', 'No.', 'No son iguales.'] },

  'q-03-026-a': { pregunta: '¿Por qué el flúor atrae más electrones que el yodo?',
    opciones: ['Es más grande', 'Es más pequeño y su núcleo atrae más', 'El yodo no tiene electrones', 'El yodo es metal'],
    correcta: 1, explicacion_correcta: 'El flúor es pequeño: el núcleo atrae más.',
    explicacion_incorrectas: ['Es más pequeño.', '', 'Sí tiene.', 'Es no metal.'] },

  'q-03-027-a': { pregunta: '[Ne] 3s² 3p³. ¿Período y grupo?',
    opciones: ['Período 3, grupo 15', 'Período 3, grupo 5', 'Período 2, grupo 15', 'Período 5, grupo 3'],
    correcta: 0, explicacion_correcta: 'Nivel 3 = período 3; 5 de valencia = grupo 15.',
    explicacion_incorrectas: ['', 'Grupo 15.', 'Período 3.', 'Período 3.'] },

  'q-03-028-a': { pregunta: '"Periódico" significa que las propiedades…',
    opciones: ['Nunca cambian', 'Se repiten cada cierto tramo', 'Cambian al azar', 'Solo dependen de la masa'],
    correcta: 1, explicacion_correcta: 'Se repiten en patrones al subir el número atómico.',
    explicacion_incorrectas: ['Sí cambian.', '', 'No es azar.', 'No solo la masa.'] },

  'q-03-029-a': { pregunta: '¿Por qué el helio va en el grupo 18 y no en el 2?',
    opciones: ['Por error', 'Porque tiene su capa llena, como un gas noble', 'Es un metal', 'Pesa poco'],
    correcta: 1, explicacion_correcta: 'Tiene 1s² lleno: se comporta como gas noble.',
    explicacion_incorrectas: ['No es error.', '', 'No es metal.', 'El peso no decide.'] },

  'q-03-030-a': { pregunta: 'Saber dónde está un elemento te permite predecir…',
    opciones: ['Su color favorito', 'Cómo se comporta (química y propiedades)', 'Su precio', 'Nada'],
    correcta: 1, explicacion_correcta: 'La posición predice su comportamiento y tendencias.',
    explicacion_incorrectas: ['No el color.', '', 'No el precio.', 'Sí sirve.'] }
};
