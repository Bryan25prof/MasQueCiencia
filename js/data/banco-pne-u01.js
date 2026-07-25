/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u01.js  |  Banco PNE — UNIDAD I
   ================================================================
   Variantes ADAPTADAS (lenguaje simple, frases cortas) de las 30
   preguntas. Mismo id; "correcta" coherente. Cobertura 30/30.
   Cierra la cobertura del Banco PNE a 9/9 unidades (EOP-014).
================================================================ */

window.BANCO_PNE_U01 = {
  /* BÁSICO */
  'q-01-001-b': { pregunta: '¿Qué es la materia?',
    opciones: ['Todo lo que tiene masa y ocupa espacio', 'Solo lo que se puede ver', 'La energía de los cuerpos', 'Solo los sólidos'],
    correcta: 0, explicacion_correcta: 'Materia es todo lo que tiene masa y ocupa espacio.',
    explicacion_incorrectas: ['', 'El aire no se ve y sí es materia.', 'La energía no es materia.', 'Los líquidos y gases también son materia.'] },

  'q-01-002-b': { pregunta: '¿En qué estado las partículas están muy juntas, con forma y volumen fijos?',
    opciones: ['Gaseoso', 'Líquido', 'Sólido', 'Plasma'],
    correcta: 2, explicacion_correcta: 'En el sólido las partículas están juntas y ordenadas.',
    explicacion_incorrectas: ['En el gas están muy separadas.', 'El líquido no tiene forma fija.', '', 'El plasma es un gas con carga.'] },

  'q-01-003-b': { pregunta: '¿Cómo se llama pasar de líquido a gas?',
    opciones: ['Fusión', 'Vaporización', 'Solidificación', 'Condensación'],
    correcta: 1, explicacion_correcta: 'Vaporización es pasar de líquido a gas.',
    explicacion_incorrectas: ['Fusión es sólido a líquido.', '', 'Solidificación es líquido a sólido.', 'Condensación es gas a líquido.'] },

  'q-01-004-b': { pregunta: '¿Cuál de estas es un elemento (sustancia pura simple)?',
    opciones: ['Agua (H₂O)', 'Oxígeno (O₂)', 'Sal de mesa (NaCl)', 'Dióxido de carbono (CO₂)'],
    correcta: 1, explicacion_correcta: 'El oxígeno tiene un solo tipo de átomo: es un elemento.',
    explicacion_incorrectas: ['El agua es un compuesto.', '', 'La sal es un compuesto.', 'El CO₂ es un compuesto.'] },

  'q-01-005-b': { pregunta: 'Una mezcla uniforme, donde no se ven sus partes, se llama:',
    opciones: ['Mezcla heterogénea', 'Mezcla homogénea', 'Compuesto', 'Elemento'],
    correcta: 1, explicacion_correcta: 'La mezcla homogénea es uniforme, una sola fase.',
    explicacion_incorrectas: ['En la heterogénea sí se ven las partes.', '', 'Un compuesto no es una mezcla.', 'Un elemento no es una mezcla.'] },

  'q-01-006-b': { pregunta: '¿Cuál es una mezcla heterogénea?',
    opciones: ['Agua con sal disuelta', 'Aire limpio', 'Agua con aceite', 'Acero inoxidable'],
    correcta: 2, explicacion_correcta: 'Agua con aceite forma dos fases visibles.',
    explicacion_incorrectas: ['Esa es homogénea.', 'Esa es homogénea.', '', 'Esa es homogénea.'] },

  'q-01-007-b': { pregunta: '¿Cómo separas arena del agua?',
    opciones: ['Destilación', 'Filtración', 'Cromatografía', 'Imantación'],
    correcta: 1, explicacion_correcta: 'La filtración separa un sólido del agua con un filtro.',
    explicacion_incorrectas: ['Esa separa líquidos.', '', 'Esa separa tintes.', 'La arena no es magnética.'] },

  'q-01-008-b': { pregunta: 'El color, el olor y el punto de fusión son propiedades FÍSICAS. ¿Verdadero o falso?',
    opciones: ['Verdadero', 'Falso'],
    correcta: 0, explicacion_correcta: 'Verdadero: se observan sin cambiar la sustancia.',
    explicacion_incorrectas: ['', 'Sí son físicas.'] },

  'q-01-009-b': { pregunta: '¿Cuál es un cambio QUÍMICO?',
    opciones: ['Derretir hielo', 'Quemar un papel', 'Cortar una hoja', 'Disolver azúcar'],
    correcta: 1, explicacion_correcta: 'Quemar papel forma sustancias nuevas: es cambio químico.',
    explicacion_incorrectas: ['Eso es físico.', '', 'Eso es físico.', 'Eso es físico.'] },

  /* INTERMEDIO */
  'q-01-010-i': { pregunta: 'Un gas se diferencia de un líquido porque el gas…',
    opciones: ['Tiene volumen fijo', 'Se comprime y llena todo el recipiente', 'Tiene forma propia', 'No se mueve'],
    correcta: 1, explicacion_correcta: 'El gas se comprime y llena todo el espacio disponible.',
    explicacion_incorrectas: ['Eso es el líquido.', '', 'Ningún fluido tiene forma propia.', 'Sí se mueve, y rápido.'] },

  'q-01-011-i': { pregunta: 'Pasar de sólido a gas directamente se llama:',
    opciones: ['Sublimación', 'Fusión', 'Deposición', 'Condensación'],
    correcta: 0, explicacion_correcta: 'Sublimación: sólido a gas directo.',
    explicacion_incorrectas: ['', 'Fusión es sólido a líquido.', 'Deposición es gas a sólido.', 'Condensación es gas a líquido.'] },

  'q-01-012-i': { pregunta: '¿Cuál es la diferencia entre compuesto y mezcla?',
    opciones: ['El compuesto siempre es líquido', 'En el compuesto los elementos están unidos químicamente', 'La mezcla nunca se separa', 'No hay diferencia'],
    correcta: 1, explicacion_correcta: 'En el compuesto, los elementos se unen en proporción fija.',
    explicacion_incorrectas: ['Puede ser sólido, líquido o gas.', '', 'Sí se separa por métodos físicos.', 'Sí hay diferencia.'] },

  'q-01-013-i': { pregunta: 'La gelatina, la mayonesa y la niebla son ejemplos de:',
    opciones: ['Soluciones verdaderas', 'Coloides', 'Sustancias puras', 'Elementos'],
    correcta: 1, explicacion_correcta: 'Son coloides: partículas dispersas de tamaño intermedio.',
    explicacion_incorrectas: ['En la solución las partículas son más pequeñas.', '', 'No son sustancias puras.', 'No son elementos.'] },

  'q-01-014-i': { pregunta: 'El efecto Tyndall es cuando un coloide…',
    opciones: ['Cambia de color con calor', 'Dispersa la luz y la hace visible', 'Se separa solo', 'Conduce electricidad'],
    correcta: 1, explicacion_correcta: 'Dispersa la luz, haciendo visible el rayo.',
    explicacion_incorrectas: ['No tiene que ver con calor.', '', 'No define el efecto Tyndall.', 'No es sobre electricidad.'] },

  'q-01-015-i': { pregunta: 'Para separar agua y alcohol mezclados, usás:',
    opciones: ['Filtración', 'Decantación', 'Destilación', 'Tamizado'],
    correcta: 2, explicacion_correcta: 'La destilación usa el distinto punto de ebullición.',
    explicacion_incorrectas: ['No separa líquidos mezclados.', 'Es para líquidos que no se mezclan.', '', 'Es para sólidos.'] },

  'q-01-016-i': { pregunta: 'La decantación separa mejor:',
    opciones: ['Sal disuelta en agua', 'Agua y aceite', 'Hierro y arena', 'Tintas de un marcador'],
    correcta: 1, explicacion_correcta: 'Decantación separa líquidos que no se mezclan.',
    explicacion_incorrectas: ['Necesita evaporación.', '', 'Se usa un imán.', 'Se usa cromatografía.'] },

  'q-01-017-i': { pregunta: 'Para recuperar sal disuelta en agua de mar usás:',
    opciones: ['Evaporación', 'Filtración', 'Imantación', 'Centrifugación'],
    correcta: 0, explicacion_correcta: 'Al evaporar el agua, la sal queda como cristales.',
    explicacion_incorrectas: ['', 'No retiene lo disuelto.', 'La sal no es magnética.', 'No recupera lo disuelto.'] },

  'q-01-018-i': { pregunta: 'La densidad y el punto de ebullición son propiedades…',
    opciones: ['Generales', 'Específicas (identifican la sustancia)', 'Químicas', 'Imposibles de medir'],
    correcta: 1, explicacion_correcta: 'Son específicas: ayudan a identificar la sustancia.',
    explicacion_incorrectas: ['Las generales no distinguen sustancias.', '', 'Son físicas.', 'Sí se miden.'] },

  'q-01-019-i': { pregunta: '¿Cuál propiedad NO depende de la cantidad de materia?',
    opciones: ['Masa', 'Volumen', 'Densidad', 'Peso'],
    correcta: 2, explicacion_correcta: 'La densidad es igual sin importar la cantidad.',
    explicacion_incorrectas: ['Aumenta con la cantidad.', 'Aumenta con la cantidad.', '', 'Depende de la masa.'] },

  'q-01-020-i': { pregunta: '¿Qué indica que hubo un cambio QUÍMICO?',
    opciones: ['Cambió de forma', 'Se formó gas y cambió de color para siempre', 'Cambió de estado', 'Se disolvió y volvió a ser igual'],
    correcta: 1, explicacion_correcta: 'Gas, color permanente o calor indican sustancia nueva.',
    explicacion_incorrectas: ['Eso es físico.', '', 'Eso es físico.', 'Eso es físico.'] },

  'q-01-021-i': { pregunta: '¿Cuál sustancia es SINTÉTICA (fabricada)?',
    opciones: ['Agua de manantial', 'Oxígeno del aire', 'Plástico', 'Diamante natural'],
    correcta: 2, explicacion_correcta: 'El plástico se fabrica en la industria.',
    explicacion_incorrectas: ['Es natural.', 'Es natural.', '', 'Es natural.'] },

  'q-01-022-i': { pregunta: 'El bronce (cobre + estaño) es:',
    opciones: ['Un compuesto químico', 'Una aleación (mezcla homogénea de metales)', 'Una mezcla heterogénea', 'Un elemento'],
    correcta: 1, explicacion_correcta: 'Es una aleación: mezcla homogénea de metales.',
    explicacion_incorrectas: ['No es compuesto.', '', 'Es homogénea, se ve uniforme.', 'Tiene dos metales, no es un elemento.'] },

  'q-01-023-i': { pregunta: 'La cantidad de materia de un cuerpo se mide con su:',
    opciones: ['Peso', 'Volumen', 'Masa', 'Densidad'],
    correcta: 2, explicacion_correcta: 'La masa mide la cantidad de materia.',
    explicacion_incorrectas: ['Depende de la gravedad.', 'Mide el espacio, no la materia.', '', 'Relaciona masa y volumen.'] },

  /* AVANZADO */
  'q-01-024-a': { pregunta: 'Una muestra tiene hierro, sal disuelta y arena en agua. ¿Qué orden de métodos la separa?',
    opciones: ['Imán → filtro → evaporación', 'Evaporación → imán → filtro', 'Filtro → imán → destilación', 'Cromatografía → decantación → fusión'],
    correcta: 0, explicacion_correcta: 'Primero el imán, luego filtrar, luego evaporar.',
    explicacion_incorrectas: ['Evaporar primero mezclaría todo.', 'Filtrar primero arrastra el hierro.', 'No aplican a esta mezcla.'] },

  'q-01-025-a': { pregunta: 'Una muestra tiene propiedades constantes y NO se descompone químicamente. Es:',
    opciones: ['Una mezcla homogénea', 'Un compuesto', 'Un elemento', 'Un coloide'],
    correcta: 2, explicacion_correcta: 'No descomponerse químicamente indica que es un elemento.',
    explicacion_incorrectas: ['No tendría propiedades tan constantes.', 'Un compuesto sí se descompone.', '', 'Un coloide es una mezcla.'] },

  'q-01-026-a': { pregunta: 'Un objeto tiene 60 g y 20 cm³. ¿Cuál es su densidad?',
    opciones: ['1.5 g/cm³', '3 g/cm³', '0.33 g/cm³', '1200 g/cm³'],
    correcta: 1, explicacion_correcta: 'Densidad = masa ÷ volumen = 60 ÷ 20 = 3 g/cm³.',
    explicacion_incorrectas: ['No es esta división.', '', 'Es la operación invertida.', 'No es una multiplicación.'] },

  'q-01-027-a': { pregunta: 'Mientras el agua hierve, su temperatura…',
    opciones: ['Sigue subiendo', 'Se mantiene constante', 'Baja rápido', 'Sube y luego baja'],
    correcta: 1, explicacion_correcta: 'En un cambio de estado la temperatura no sube: se mantiene.',
    explicacion_incorrectas: ['No sube durante el cambio de estado.', '', 'No baja: se le sigue dando calor.', 'Se mantiene en una meseta.'] },

  'q-01-028-a': { pregunta: 'El aire es una mezcla de gases. ¿Cómo se separan sus componentes?',
    opciones: ['Filtración simple', 'Destilación fraccionada del aire licuado', 'Imantación', 'No se puede separar'],
    correcta: 1, explicacion_correcta: 'Se licua el aire y se destila por partes.',
    explicacion_incorrectas: ['No separa gases mezclados.', '', 'Los gases no son magnéticos.', 'Sí se puede separar.'] },

  'q-01-029-a': { pregunta: 'La herrumbre del hierro es un cambio químico porque…',
    opciones: ['Solo cambia de forma', 'Se combina con oxígeno y forma algo nuevo', 'Es reversible al instante', 'No interviene otra sustancia'],
    correcta: 1, explicacion_correcta: 'Se forma una sustancia nueva: óxido de hierro.',
    explicacion_incorrectas: ['Cambia su composición, no solo la forma.', '', 'No es reversible al instante.', 'Sí interviene el oxígeno.'] },

  'q-01-030-a': { pregunta: 'Comparando una solución de azúcar con leche (coloide):',
    opciones: ['Ambas dispersan la luz igual', 'Solo el coloide dispersa la luz', 'La solución tiene partículas más grandes', 'El coloide es sustancia pura'],
    correcta: 1, explicacion_correcta: 'Solo el coloide presenta efecto Tyndall.',
    explicacion_incorrectas: ['La solución no dispersa la luz.', '', 'Es al revés.', 'El coloide es una mezcla.'] }
};
