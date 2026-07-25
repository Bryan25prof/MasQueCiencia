/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/data/preguntas-u01.js  |  Banco de Preguntas — UNIDAD I
   ================================================================
   SECCIÓN: Banco de preguntas — Unidad I "La Materia y su Clasificación"
   DESCRIPCIÓN: 30 preguntas siguiendo el esquema de la Sección 12 del
                Documento Maestro. Se entrega como archivo .js (variable
                global) en lugar de .json para mantener compatibilidad
                100% offline con protocolo file:// (sin fetch), igual que
                elementos.js y unidades.js.
   PARA AGREGAR: copiar un objeto del array y respetar el esquema.
                 El motor de examen toma 20 al azar de estas 30.
   ÚLTIMA MODIFICACIÓN: FASE 1A
   AUTOR: Lic. Bryan Chavarría C.
   ----------------------------------------------------------------
   ESQUEMA POR PREGUNTA (Sección 12 del Documento Maestro):
   {
     id, unidad, tema, nivel, tipo, pregunta, opciones,
     correcta (índice 0-based), explicacion_correcta,
     explicacion_incorrectas[], imagen, formula, tags[]
   }
   Convención de id:  q-01-<n>-<nivel>   (b=básico i=intermedio a=avanzado)
   Distribución:      básico 30% · intermedio 45% · avanzado 25%
================================================================ */

window.PREGUNTAS_U01 = [

  /* ───────────── NIVEL BÁSICO (9) ───────────── */
  {
    id: 'q-01-001-b', unidad: 1, tema: 'La materia', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuál es la definición correcta de materia?',
    opciones: [
      'Todo lo que ocupa un lugar en el espacio y tiene masa',
      'Únicamente las sustancias que podemos ver',
      'La energía que poseen los cuerpos',
      'Solo los objetos sólidos'
    ],
    correcta: 0,
    explicacion_correcta: 'Materia es todo aquello que tiene masa y ocupa un volumen en el espacio, sin importar su estado o si es visible.',
    explicacion_incorrectas: [
      '',
      'El aire no se ve y sí es materia, porque tiene masa y ocupa espacio.',
      'La energía no tiene masa propia; no es materia, aunque se relacione con ella.',
      'Los líquidos y gases también son materia, no solo los sólidos.'
    ],
    imagen: null, formula: null, tags: ['materia', 'definicion']
  },
  {
    id: 'q-01-002-b', unidad: 1, tema: 'Estados de la materia', nivel: 'basico', tipo: 'su',
    pregunta: '¿En qué estado de la materia las partículas están muy juntas y ordenadas, con forma y volumen definidos?',
    opciones: ['Gaseoso', 'Líquido', 'Sólido', 'Plasma'],
    correcta: 2,
    explicacion_correcta: 'En el estado sólido las partículas están fuertemente unidas y ordenadas, por eso el sólido tiene forma y volumen propios.',
    explicacion_incorrectas: [
      'En el gas las partículas están muy separadas; no tiene forma ni volumen fijos.',
      'El líquido tiene volumen definido pero adopta la forma del recipiente.',
      '',
      'El plasma es un gas ionizado; sus partículas están separadas y con carga.'
    ],
    imagen: null, formula: null, tags: ['estados', 'solido']
  },
  {
    id: 'q-01-003-b', unidad: 1, tema: 'Cambios de estado', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cómo se llama el cambio de estado de líquido a gas?',
    opciones: ['Fusión', 'Vaporización', 'Solidificación', 'Condensación'],
    correcta: 1,
    explicacion_correcta: 'La vaporización es el paso de líquido a gas (incluye la evaporación y la ebullición).',
    explicacion_incorrectas: [
      'La fusión es el paso de sólido a líquido.',
      '',
      'La solidificación es el paso de líquido a sólido.',
      'La condensación es el paso de gas a líquido (lo contrario).'
    ],
    imagen: null, formula: null, tags: ['cambios-estado', 'vaporizacion']
  },
  {
    id: 'q-01-004-b', unidad: 1, tema: 'Sustancias puras', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuál de las siguientes es una sustancia pura simple (elemento)?',
    opciones: ['Agua (H₂O)', 'Oxígeno (O₂)', 'Sal de mesa (NaCl)', 'Dióxido de carbono (CO₂)'],
    correcta: 1,
    explicacion_correcta: 'El oxígeno (O₂) está formado por un solo tipo de átomo, por lo que es un elemento (sustancia pura simple).',
    explicacion_incorrectas: [
      'El agua es un compuesto: tiene hidrógeno y oxígeno combinados.',
      '',
      'La sal de mesa es un compuesto de sodio y cloro.',
      'El CO₂ es un compuesto de carbono y oxígeno.'
    ],
    imagen: null, formula: null, tags: ['elemento', 'sustancia-pura']
  },
  {
    id: 'q-01-005-b', unidad: 1, tema: 'Mezclas', nivel: 'basico', tipo: 'su',
    pregunta: 'Una mezcla en la que NO se distinguen sus componentes a simple vista y tiene aspecto uniforme se llama:',
    opciones: ['Mezcla heterogénea', 'Mezcla homogénea', 'Compuesto', 'Elemento'],
    correcta: 1,
    explicacion_correcta: 'Una mezcla homogénea (o solución) presenta una sola fase uniforme; sus componentes no se distinguen a simple vista.',
    explicacion_incorrectas: [
      'En la heterogénea sí se distinguen los componentes o fases.',
      '',
      'Un compuesto no es una mezcla: sus elementos están combinados químicamente.',
      'Un elemento es una sustancia pura, no una mezcla.'
    ],
    imagen: null, formula: null, tags: ['mezcla-homogenea', 'solucion']
  },
  {
    id: 'q-01-006-b', unidad: 1, tema: 'Mezclas heterogéneas', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuál de los siguientes es un ejemplo de mezcla heterogénea?',
    opciones: ['Agua con sal disuelta', 'Aire limpio', 'Agua con aceite', 'Acero inoxidable'],
    correcta: 2,
    explicacion_correcta: 'El agua con aceite forma dos fases visibles que no se mezclan, por eso es heterogénea.',
    explicacion_incorrectas: [
      'El agua con sal disuelta es homogénea: una sola fase.',
      'El aire limpio es una mezcla homogénea de gases.',
      '',
      'El acero inoxidable es una aleación homogénea (mezcla sólida uniforme).'
    ],
    imagen: null, formula: null, tags: ['mezcla-heterogenea', 'ejemplos']
  },
  {
    id: 'q-01-007-b', unidad: 1, tema: 'Métodos de separación', nivel: 'basico', tipo: 'su',
    pregunta: '¿Qué método usarías para separar arena del agua?',
    opciones: ['Destilación', 'Filtración', 'Cromatografía', 'Imantación'],
    correcta: 1,
    explicacion_correcta: 'La filtración separa un sólido insoluble (arena) de un líquido (agua) haciéndolo pasar por un filtro.',
    explicacion_incorrectas: [
      'La destilación separa líquidos por diferencia de punto de ebullición.',
      '',
      'La cromatografía separa sustancias por su distinta velocidad de avance en un medio.',
      'La imantación separa materiales magnéticos, y la arena no lo es.'
    ],
    imagen: null, formula: null, tags: ['filtracion', 'separacion']
  },
  {
    id: 'q-01-008-b', unidad: 1, tema: 'Propiedades de la materia', nivel: 'basico', tipo: 'vf',
    pregunta: 'El color, el olor y el punto de fusión son ejemplos de propiedades FÍSICAS de la materia. ¿Verdadero o falso?',
    opciones: ['Verdadero', 'Falso'],
    correcta: 0,
    explicacion_correcta: 'Verdadero. Las propiedades físicas se observan o miden sin cambiar la composición de la sustancia: color, olor, densidad, punto de fusión, etc.',
    explicacion_incorrectas: [
      '',
      'Son físicas porque pueden observarse sin transformar la sustancia en otra distinta.'
    ],
    imagen: null, formula: null, tags: ['propiedades-fisicas']
  },
  {
    id: 'q-01-009-b', unidad: 1, tema: 'Cambios físicos y químicos', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuál de los siguientes es un CAMBIO QUÍMICO?',
    opciones: ['Derretir un cubo de hielo', 'Quemar un papel', 'Cortar una hoja', 'Disolver azúcar en agua'],
    correcta: 1,
    explicacion_correcta: 'Quemar papel es un cambio químico: se forman sustancias nuevas (ceniza, gases) y es irreversible.',
    explicacion_incorrectas: [
      'Derretir hielo es un cambio físico (solo cambia de estado).',
      '',
      'Cortar una hoja cambia la forma, pero no la sustancia: es físico.',
      'Disolver azúcar es un cambio físico; el azúcar sigue siendo azúcar.'
    ],
    imagen: null, formula: null, tags: ['cambio-quimico']
  },

  /* ───────────── NIVEL INTERMEDIO (14) ───────────── */
  {
    id: 'q-01-010-i', unidad: 1, tema: 'Estados de la materia', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un gas se diferencia de un líquido principalmente en que el gas:',
    opciones: [
      'Tiene volumen definido pero no forma',
      'Es compresible y ocupa todo el recipiente',
      'Tiene forma propia',
      'Sus partículas no se mueven'
    ],
    correcta: 1,
    explicacion_correcta: 'En un gas las partículas están muy separadas y en movimiento rápido; por eso es compresible y llena todo el recipiente.',
    explicacion_incorrectas: [
      'Eso describe al líquido, no al gas.',
      '',
      'Ningún fluido (líquido ni gas) tiene forma propia.',
      'En todos los estados las partículas se mueven; en el gas más rápido aún.'
    ],
    imagen: null, formula: null, tags: ['gas', 'estados']
  },
  {
    id: 'q-01-011-i', unidad: 1, tema: 'Cambios de estado', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El paso directo de sólido a gas, sin pasar por líquido, se denomina:',
    opciones: ['Sublimación', 'Fusión', 'Deposición', 'Condensación'],
    correcta: 0,
    explicacion_correcta: 'La sublimación es el paso directo de sólido a gas (ejemplo: el hielo seco o la naftalina).',
    explicacion_incorrectas: [
      '',
      'La fusión es sólido → líquido.',
      'La deposición (o sublimación inversa) es gas → sólido, el proceso contrario.',
      'La condensación es gas → líquido.'
    ],
    imagen: null, formula: null, tags: ['sublimacion', 'cambios-estado']
  },
  {
    id: 'q-01-012-i', unidad: 1, tema: 'Sustancias puras', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál es la diferencia clave entre un compuesto y una mezcla?',
    opciones: [
      'El compuesto siempre es líquido',
      'En el compuesto los elementos están unidos químicamente en proporción fija',
      'La mezcla no se puede separar nunca',
      'No existe diferencia real'
    ],
    correcta: 1,
    explicacion_correcta: 'En un compuesto los elementos se combinan químicamente en una proporción fija (ej. H₂O siempre 2:1); en una mezcla solo se juntan físicamente y en cualquier proporción.',
    explicacion_incorrectas: [
      'Los compuestos pueden ser sólidos, líquidos o gaseosos.',
      '',
      'Las mezclas sí se separan por métodos físicos.',
      'Sí existe una diferencia fundamental: química vs. física.'
    ],
    imagen: null, formula: null, tags: ['compuesto', 'mezcla', 'diferencia']
  },
  {
    id: 'q-01-013-i', unidad: 1, tema: 'Coloides', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La gelatina, la mayonesa y la niebla son ejemplos de:',
    opciones: ['Soluciones verdaderas', 'Coloides', 'Sustancias puras', 'Elementos'],
    correcta: 1,
    explicacion_correcta: 'Son coloides: mezclas en las que partículas de tamaño intermedio quedan dispersas pero no disueltas; presentan el efecto Tyndall.',
    explicacion_incorrectas: [
      'En una solución verdadera las partículas son mucho más pequeñas y no dispersan la luz.',
      '',
      'No son sustancias puras: son mezclas.',
      'No son elementos.'
    ],
    imagen: null, formula: null, tags: ['coloide', 'tyndall']
  },
  {
    id: 'q-01-014-i', unidad: 1, tema: 'Coloides', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El efecto Tyndall consiste en que un coloide:',
    opciones: [
      'Cambia de color con el calor',
      'Dispersa un haz de luz que lo atraviesa, haciéndolo visible',
      'Se separa solo con el tiempo',
      'Conduce la electricidad'
    ],
    correcta: 1,
    explicacion_correcta: 'El efecto Tyndall es la dispersión de la luz por las partículas coloidales, que hace visible el rayo (como los faros en la niebla).',
    explicacion_incorrectas: [
      'No tiene que ver con cambios de color por calor.',
      '',
      'La separación espontánea es propia de algunas mezclas heterogéneas, no define el efecto Tyndall.',
      'No describe conductividad eléctrica.'
    ],
    imagen: null, formula: null, tags: ['tyndall', 'coloide']
  },
  {
    id: 'q-01-015-i', unidad: 1, tema: 'Métodos de separación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Para separar agua y alcohol, que se mezclan completamente, el método adecuado es la:',
    opciones: ['Filtración', 'Decantación', 'Destilación', 'Tamizado'],
    correcta: 2,
    explicacion_correcta: 'La destilación separa líquidos miscibles aprovechando su distinto punto de ebullición (el alcohol hierve antes que el agua).',
    explicacion_incorrectas: [
      'La filtración no separa dos líquidos mezclados entre sí.',
      'La decantación sirve para líquidos que NO se mezclan (inmiscibles).',
      '',
      'El tamizado separa sólidos de distinto tamaño.'
    ],
    imagen: null, formula: null, tags: ['destilacion', 'separacion']
  },
  {
    id: 'q-01-016-i', unidad: 1, tema: 'Métodos de separación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La decantación es el método ideal para separar:',
    opciones: [
      'Sal disuelta en agua',
      'Agua y aceite (líquidos inmiscibles)',
      'Limaduras de hierro y arena',
      'Tintas de un marcador'
    ],
    correcta: 1,
    explicacion_correcta: 'La decantación separa líquidos inmiscibles de distinta densidad (agua y aceite) o un sólido sedimentado de un líquido.',
    explicacion_incorrectas: [
      'La sal disuelta requiere evaporación o cristalización, no decantación.',
      '',
      'El hierro se separa de la arena con un imán (imantación).',
      'Las tintas se separan por cromatografía.'
    ],
    imagen: null, formula: null, tags: ['decantacion', 'separacion']
  },
  {
    id: 'q-01-017-i', unidad: 1, tema: 'Métodos de separación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Para recuperar la sal disuelta en agua de mar conviene usar:',
    opciones: ['Evaporación / cristalización', 'Filtración', 'Imantación', 'Centrifugación'],
    correcta: 0,
    explicacion_correcta: 'Al evaporar el agua, la sal queda como cristales sólidos (cristalización). Es el principio de las salinas.',
    explicacion_incorrectas: [
      '',
      'La filtración no retiene una sustancia disuelta.',
      'La sal no es magnética.',
      'La centrifugación separa fases por densidad, no recupera un soluto disuelto.'
    ],
    imagen: null, formula: null, tags: ['cristalizacion', 'evaporacion']
  },
  {
    id: 'q-01-018-i', unidad: 1, tema: 'Propiedades de la materia', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La densidad y la temperatura de ebullición son propiedades:',
    opciones: [
      'Generales (comunes a toda la materia)',
      'Específicas (sirven para identificar una sustancia)',
      'Químicas',
      'Imposibles de medir'
    ],
    correcta: 1,
    explicacion_correcta: 'Son propiedades físicas específicas: tienen un valor característico para cada sustancia, por lo que ayudan a identificarla.',
    explicacion_incorrectas: [
      'Las generales (masa, volumen) no distinguen una sustancia de otra.',
      '',
      'Son físicas, no químicas: se miden sin transformar la sustancia.',
      'Sí se pueden medir con instrumentos.'
    ],
    imagen: null, formula: null, tags: ['propiedades-especificas', 'densidad']
  },
  {
    id: 'q-01-019-i', unidad: 1, tema: 'Propiedades de la materia', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál de estas es una propiedad INTENSIVA (no depende de la cantidad de materia)?',
    opciones: ['Masa', 'Volumen', 'Densidad', 'Peso'],
    correcta: 2,
    explicacion_correcta: 'La densidad es intensiva: tiene el mismo valor sin importar si hay mucha o poca cantidad de la sustancia.',
    explicacion_incorrectas: [
      'La masa es extensiva: aumenta con la cantidad.',
      'El volumen es extensivo.',
      '',
      'El peso es extensivo (depende de la masa).'
    ],
    imagen: null, formula: null, tags: ['propiedad-intensiva', 'densidad']
  },
  {
    id: 'q-01-020-i', unidad: 1, tema: 'Cambios físicos y químicos', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál de los siguientes indicios sugiere que ocurrió un cambio QUÍMICO?',
    opciones: [
      'El material cambió de forma',
      'Se formó un gas con burbujeo y cambió el color de forma permanente',
      'El material cambió de estado',
      'El material se disolvió y luego se recuperó igual'
    ],
    correcta: 1,
    explicacion_correcta: 'La formación de gas, un cambio de color permanente, calor/luz o un precipitado son señales de que se formaron sustancias nuevas (cambio químico).',
    explicacion_incorrectas: [
      'Un cambio de forma es físico.',
      '',
      'Un cambio de estado es físico y reversible.',
      'Disolver y recuperar igual la sustancia es un cambio físico.'
    ],
    imagen: null, formula: null, tags: ['cambio-quimico', 'indicios']
  },
  {
    id: 'q-01-021-i', unidad: 1, tema: 'Sustancias naturales y sintéticas', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál de las siguientes es una sustancia SINTÉTICA?',
    opciones: ['Agua de manantial', 'Oxígeno del aire', 'Plástico (polietileno)', 'Diamante natural'],
    correcta: 2,
    explicacion_correcta: 'El plástico se fabrica artificialmente en la industria a partir de derivados del petróleo: es una sustancia sintética.',
    explicacion_incorrectas: [
      'El agua de manantial es natural.',
      'El oxígeno del aire es natural.',
      '',
      'El diamante natural se forma en la naturaleza.'
    ],
    imagen: null, formula: null, tags: ['sintetica', 'natural']
  },
  {
    id: 'q-01-022-i', unidad: 1, tema: 'Mezclas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El bronce (cobre + estaño) es un ejemplo de:',
    opciones: [
      'Compuesto químico',
      'Aleación: mezcla homogénea de metales',
      'Mezcla heterogénea',
      'Elemento'
    ],
    correcta: 1,
    explicacion_correcta: 'El bronce es una aleación: una mezcla homogénea de metales, donde los componentes no están combinados químicamente.',
    explicacion_incorrectas: [
      'No es compuesto: los metales no se combinan en proporción química fija.',
      '',
      'Es homogénea, no heterogénea: su aspecto es uniforme.',
      'No es un elemento; está formado por dos metales.'
    ],
    imagen: null, formula: null, tags: ['aleacion', 'mezcla-homogenea']
  },
  {
    id: 'q-01-023-i', unidad: 1, tema: 'La materia', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La cantidad de materia que posee un cuerpo se mide mediante su:',
    opciones: ['Peso', 'Volumen', 'Masa', 'Densidad'],
    correcta: 2,
    explicacion_correcta: 'La masa mide la cantidad de materia de un cuerpo y se expresa en kilogramos o gramos.',
    explicacion_incorrectas: [
      'El peso depende de la gravedad, no mide directamente la cantidad de materia.',
      'El volumen mide el espacio ocupado, no la cantidad de materia.',
      '',
      'La densidad relaciona masa y volumen, pero no es la cantidad de materia.'
    ],
    imagen: null, formula: null, tags: ['masa', 'materia']
  },

  /* ───────────── NIVEL AVANZADO (7) ───────────── */
  {
    id: 'q-01-024-a', unidad: 1, tema: 'Métodos de separación', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Una muestra contiene limaduras de hierro, sal disuelta y arena, todo en agua. ¿Qué secuencia de métodos las separa correctamente?',
    opciones: [
      'Imantación → filtración → evaporación',
      'Evaporación → imantación → filtración',
      'Filtración → imantación → destilación',
      'Cromatografía → decantación → fusión'
    ],
    correcta: 0,
    explicacion_correcta: 'Primero el imán retira el hierro (imantación); luego la filtración retira la arena insoluble; finalmente la evaporación recupera la sal disuelta.',
    explicacion_incorrectas: [
      'Evaporar primero dejaría la sal mezclada con hierro y arena, complicando todo.',
      'Filtrar primero arrastraría el hierro junto con la arena.',
      'La cromatografía y la fusión no aplican a esta mezcla.'
    ],
    imagen: null, formula: null, tags: ['separacion', 'secuencia', 'razonamiento']
  },
  {
    id: 'q-01-025-a', unidad: 1, tema: 'Sustancias puras', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Una muestra mantiene punto de fusión y densidad constantes en toda su extensión y NO puede descomponerse por métodos químicos. Se trata de:',
    opciones: ['Una mezcla homogénea', 'Un compuesto', 'Un elemento', 'Un coloide'],
    correcta: 2,
    explicacion_correcta: 'Propiedades constantes indican sustancia pura; que NO se descomponga químicamente indica que es un elemento (un compuesto sí se descompone en sus elementos).',
    explicacion_incorrectas: [
      'Una mezcla no tendría propiedades tan constantes y se separaría por métodos físicos.',
      'Un compuesto SÍ puede descomponerse químicamente en elementos.',
      '',
      'Un coloide es una mezcla, no una sustancia pura.'
    ],
    imagen: null, formula: null, tags: ['elemento', 'clasificacion', 'razonamiento']
  },
  {
    id: 'q-01-026-a', unidad: 1, tema: 'Propiedades de la materia', nivel: 'avanzado', tipo: 'nu',
    pregunta: 'Un objeto tiene una masa de 60 g y un volumen de 20 cm³. ¿Cuál es su densidad en g/cm³?',
    opciones: ['1.5 g/cm³', '3 g/cm³', '0.33 g/cm³', '1200 g/cm³'],
    correcta: 1,
    explicacion_correcta: 'Densidad = masa ÷ volumen = 60 g ÷ 20 cm³ = 3 g/cm³.',
    explicacion_incorrectas: [
      'Eso resultaría de dividir 30÷20; revisa los datos.',
      '',
      'Eso es volumen ÷ masa (la operación invertida).',
      'Eso es masa × volumen; la densidad es una división.'
    ],
    imagen: null, formula: 'd = m / V', tags: ['densidad', 'calculo']
  },
  {
    id: 'q-01-027-a', unidad: 1, tema: 'Cambios de estado', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Durante la ebullición de agua pura, mientras hierve, la temperatura del líquido:',
    opciones: [
      'Sigue subiendo sin parar',
      'Permanece constante hasta que todo el líquido se evapora',
      'Baja rápidamente',
      'Sube y luego baja'
    ],
    correcta: 1,
    explicacion_correcta: 'En un cambio de estado de una sustancia pura la temperatura se mantiene constante: el calor recibido se usa para separar las partículas, no para subir la temperatura.',
    explicacion_incorrectas: [
      'No sube: toda la energía se invierte en el cambio de estado.',
      '',
      'No baja: se le sigue aportando calor.',
      'Se mantiene en una meseta, no sube y baja.'
    ],
    imagen: null, formula: null, tags: ['ebullicion', 'temperatura', 'razonamiento']
  },
  {
    id: 'q-01-028-a', unidad: 1, tema: 'Clasificación de la materia', nivel: 'avanzado', tipo: 'su',
    pregunta: 'El aire es una mezcla homogénea de gases (N₂, O₂, etc.). ¿Qué método físico permite separar sus componentes?',
    opciones: [
      'Filtración simple',
      'Destilación fraccionada del aire licuado',
      'Imantación',
      'No se puede separar de ningún modo'
    ],
    correcta: 1,
    explicacion_correcta: 'Licuando el aire a muy baja temperatura y luego destilándolo fraccionadamente se separan los gases por su distinto punto de ebullición.',
    explicacion_incorrectas: [
      'La filtración no separa gases mezclados entre sí.',
      '',
      'Los gases del aire no son magnéticos.',
      'Sí se puede separar; es un proceso industrial real.'
    ],
    imagen: null, formula: null, tags: ['aire', 'destilacion-fraccionada', 'razonamiento']
  },
  {
    id: 'q-01-029-a', unidad: 1, tema: 'Cambios físicos y químicos', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La oxidación del hierro (formación de herrumbre) se clasifica como cambio químico porque:',
    opciones: [
      'El hierro solo cambia de forma',
      'Se combina con el oxígeno y forma una sustancia nueva con propiedades distintas',
      'Es un proceso reversible al instante',
      'No interviene ninguna otra sustancia'
    ],
    correcta: 1,
    explicacion_correcta: 'El hierro reacciona con el oxígeno (y humedad) y se forma óxido de hierro, una sustancia nueva con color y propiedades diferentes: es un cambio químico.',
    explicacion_incorrectas: [
      'No es un simple cambio de forma; cambia la composición.',
      '',
      'No es reversible al instante; es una reacción química.',
      'Sí interviene otra sustancia: el oxígeno.'
    ],
    imagen: null, formula: null, tags: ['oxidacion', 'cambio-quimico', 'razonamiento']
  },
  {
    id: 'q-01-030-a', unidad: 1, tema: 'Coloides', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Se compara una solución de azúcar con un coloide (leche). ¿Cuál afirmación es CORRECTA?',
    opciones: [
      'Ambas presentan efecto Tyndall por igual',
      'Solo el coloide dispersa la luz (efecto Tyndall); la solución no',
      'La solución tiene partículas más grandes que el coloide',
      'El coloide es una sustancia pura'
    ],
    correcta: 1,
    explicacion_correcta: 'Las partículas del coloide son lo bastante grandes para dispersar la luz (Tyndall); en una solución verdadera son tan pequeñas que la luz pasa sin dispersarse.',
    explicacion_incorrectas: [
      'La solución verdadera no presenta efecto Tyndall apreciable.',
      '',
      'Es al revés: el coloide tiene partículas mayores que la solución.',
      'El coloide es una mezcla, no una sustancia pura.'
    ],
    imagen: null, formula: null, tags: ['coloide', 'solucion', 'tyndall', 'comparacion']
  }

]; /* FIN PREGUNTAS_U01 — 30 preguntas (9 básicas · 14 intermedias · 7 avanzadas) */

/* Helper de acceso (opcional, usado por el motor de examen) */
window.getBancoU01 = function () { return window.PREGUNTAS_U01.slice(); };
