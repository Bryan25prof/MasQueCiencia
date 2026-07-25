/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/preguntas-u03.js  |  Banco de Preguntas — UNIDAD III
   ================================================================
   Unidad III "Tabla Periódica". 30 preguntas (9 básicas · 14 inter ·
   7 avanzadas), mismo esquema que U1/U2. Algunos distractores se ligan
   a errores frecuentes (Insights) vía tags:['err:eN'].
================================================================ */

window.PREGUNTAS_U03 = [

  /* ───────────── BÁSICO (9) ───────────── */
  {
    id: 'q-03-001-b', unidad: 3, tema: 'Organización general', nivel: 'basico', tipo: 'su',
    pregunta: 'La tabla periódica moderna ordena los elementos según su:',
    opciones: ['Masa atómica', 'Número atómico (Z)', 'Tamaño', 'Color'],
    correcta: 1,
    explicacion_correcta: 'La tabla moderna ordena los elementos por número atómico (Z) creciente.',
    explicacion_incorrectas: ['Esa fue la idea de Mendeléiev; la moderna usa Z.', '', 'El tamaño no define el orden.', 'El color no tiene relación.'],
    imagen: null, formula: null, tags: ['orden', 'err:e2']
  },
  {
    id: 'q-03-002-b', unidad: 3, tema: 'Períodos', nivel: 'basico', tipo: 'su',
    pregunta: 'Las FILAS horizontales de la tabla periódica se llaman:',
    opciones: ['Grupos', 'Períodos', 'Familias', 'Bloques'],
    correcta: 1,
    explicacion_correcta: 'Las filas horizontales son los períodos (hay 7).',
    explicacion_incorrectas: ['Los grupos son las columnas.', '', 'Las familias son columnas (grupos).', 'Los bloques agrupan por subnivel.'],
    imagen: null, formula: null, tags: ['periodos', 'err:e3']
  },
  {
    id: 'q-03-003-b', unidad: 3, tema: 'Grupos o familias', nivel: 'basico', tipo: 'su',
    pregunta: 'Las COLUMNAS verticales de la tabla se llaman grupos o:',
    opciones: ['Períodos', 'Familias', 'Niveles', 'Bloques'],
    correcta: 1,
    explicacion_correcta: 'Las columnas son los grupos o familias (hay 18).',
    explicacion_incorrectas: ['Los períodos son las filas.', '', 'Los niveles son de energía.', 'Bloque es otra clasificación.'],
    imagen: null, formula: null, tags: ['grupos']
  },
  {
    id: 'q-03-004-b', unidad: 3, tema: 'Metales y no metales', nivel: 'basico', tipo: 'su',
    pregunta: 'La mayoría de los elementos de la tabla periódica son:',
    opciones: ['No metales', 'Metales', 'Gases nobles', 'Metaloides'],
    correcta: 1,
    explicacion_correcta: 'La mayoría son metales; ocupan la parte izquierda y central de la tabla.',
    explicacion_incorrectas: ['Los no metales son menos y están a la derecha.', '', 'Los gases nobles son solo una columna.', 'Los metaloides son muy pocos.'],
    imagen: null, formula: null, tags: ['metales', 'err:e4']
  },
  {
    id: 'q-03-005-b', unidad: 3, tema: 'Grupos o familias', nivel: 'basico', tipo: 'su',
    pregunta: 'El grupo 18 (última columna) corresponde a los:',
    opciones: ['Metales alcalinos', 'Halógenos', 'Gases nobles', 'Metaloides'],
    correcta: 2,
    explicacion_correcta: 'El grupo 18 son los gases nobles, muy estables (capa de valencia completa).',
    explicacion_incorrectas: ['Los alcalinos son el grupo 1.', 'Los halógenos son el grupo 17.', '', 'Los metaloides no forman un grupo único.'],
    imagen: null, formula: null, tags: ['gases-nobles', 'familias']
  },
  {
    id: 'q-03-006-b', unidad: 3, tema: 'Grupos o familias', nivel: 'basico', tipo: 'su',
    pregunta: 'El grupo 1 (sin contar el hidrógeno) corresponde a los:',
    opciones: ['Gases nobles', 'Metales alcalinos', 'Halógenos', 'Metaloides'],
    correcta: 1,
    explicacion_correcta: 'El grupo 1 son los metales alcalinos (Li, Na, K…), muy reactivos.',
    explicacion_incorrectas: ['Los gases nobles son el grupo 18.', '', 'Los halógenos son el grupo 17.', 'No son metaloides.'],
    imagen: null, formula: null, tags: ['alcalinos', 'familias']
  },
  {
    id: 'q-03-007-b', unidad: 3, tema: 'Períodos', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuántos períodos (filas) tiene la tabla periódica?',
    opciones: ['5', '7', '18', '10'],
    correcta: 1,
    explicacion_correcta: 'La tabla periódica tiene 7 períodos.',
    explicacion_incorrectas: ['Son 7, no 5.', '', '18 es el número de grupos.', 'No es 10.'],
    imagen: null, formula: null, tags: ['periodos']
  },
  {
    id: 'q-03-008-b', unidad: 3, tema: 'Subniveles (s,p,d,f)', nivel: 'basico', tipo: 'su',
    pregunta: '¿En cuántos bloques de subnivel se organiza la tabla?',
    opciones: ['2 (s, p)', '4 (s, p, d, f)', '3 (s, p, d)', '1'],
    correcta: 1,
    explicacion_correcta: 'Hay 4 bloques según el subnivel que se llena: s, p, d y f.',
    explicacion_incorrectas: ['Faltan d y f.', '', 'Falta el bloque f.', 'Hay más de uno.'],
    imagen: null, formula: null, tags: ['bloques', 'subniveles']
  },
  {
    id: 'q-03-009-b', unidad: 3, tema: 'Metaloides', nivel: 'basico', tipo: 'su',
    pregunta: 'Los elementos con propiedades intermedias entre metales y no metales son los:',
    opciones: ['Gases nobles', 'Metaloides', 'Halógenos', 'Lantánidos'],
    correcta: 1,
    explicacion_correcta: 'Los metaloides (como el silicio) tienen propiedades intermedias; son clave en semiconductores.',
    explicacion_incorrectas: ['Los gases nobles son no metales estables.', '', 'Los halógenos son no metales.', 'Los lantánidos son metales.'],
    imagen: null, formula: null, tags: ['metaloides']
  },

  /* ───────────── INTERMEDIO (14) ───────────── */
  {
    id: 'q-03-010-i', unidad: 3, tema: 'Configuración y posición', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El número de período de un elemento coincide con su:',
    opciones: ['Número de grupo', 'Último nivel de energía ocupado', 'Número de neutrones', 'Masa atómica'],
    correcta: 1,
    explicacion_correcta: 'El período indica el último nivel de energía (n) que tiene electrones.',
    explicacion_incorrectas: ['El grupo se relaciona con la valencia, no con el período.', '', 'Los neutrones no definen el período.', 'La masa no define el período.'],
    imagen: null, formula: null, tags: ['periodo-config']
  },
  {
    id: 'q-03-011-i', unidad: 3, tema: 'Configuración y posición', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Para los elementos representativos, el número de grupo se relaciona con:',
    opciones: ['Los neutrones', 'Los electrones de valencia', 'El número másico', 'El período'],
    correcta: 1,
    explicacion_correcta: 'En los elementos representativos, el grupo indica el número de electrones de valencia.',
    explicacion_incorrectas: ['Los neutrones no se relacionan.', '', 'El número másico no.', 'El período es la fila.'],
    imagen: null, formula: null, tags: ['grupo-valencia']
  },
  {
    id: 'q-03-012-i', unidad: 3, tema: 'Subniveles (s,p,d,f)', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Los metales de transición pertenecen al bloque:',
    opciones: ['s', 'p', 'd', 'f'],
    correcta: 2,
    explicacion_correcta: 'Los metales de transición están en el bloque d (se llena el subnivel d).',
    explicacion_incorrectas: ['El bloque s son grupos 1-2.', 'El bloque p son grupos 13-18.', '', 'El bloque f son lantánidos y actínidos.'],
    imagen: null, formula: null, tags: ['bloque-d', 'err:e5']
  },
  {
    id: 'q-03-013-i', unidad: 3, tema: 'Propiedades periódicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Al avanzar de izquierda a derecha en un período, el radio atómico generalmente:',
    opciones: ['Aumenta', 'Disminuye', 'No cambia', 'Se duplica'],
    correcta: 1,
    explicacion_correcta: 'Disminuye: aumenta la carga nuclear y atrae más a los electrones del mismo nivel.',
    explicacion_incorrectas: ['Es lo contrario de lo que muchos creen.', '', 'Sí cambia de forma marcada.', 'No se duplica.'],
    imagen: null, formula: null, tags: ['radio', 'err:e1']
  },
  {
    id: 'q-03-014-i', unidad: 3, tema: 'Propiedades periódicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Al bajar dentro de un grupo, el radio atómico generalmente:',
    opciones: ['Disminuye', 'Aumenta', 'No cambia', 'Desaparece'],
    correcta: 1,
    explicacion_correcta: 'Aumenta: cada período añade un nivel de energía, así que el átomo es más grande.',
    explicacion_incorrectas: ['Es lo contrario.', '', 'Sí cambia.', 'No desaparece.'],
    imagen: null, formula: null, tags: ['radio']
  },
  {
    id: 'q-03-015-i', unidad: 3, tema: 'Propiedades periódicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La electronegatividad MÁS alta de la tabla la tiene el:',
    opciones: ['Cesio (Cs)', 'Flúor (F)', 'Hierro (Fe)', 'Sodio (Na)'],
    correcta: 1,
    explicacion_correcta: 'El flúor es el elemento más electronegativo (EN = 3.98).',
    explicacion_incorrectas: ['El cesio es de los menos electronegativos.', '', 'El hierro tiene EN intermedia.', 'El sodio es poco electronegativo.'],
    imagen: null, formula: null, tags: ['electronegatividad', 'fluor']
  },
  {
    id: 'q-03-016-i', unidad: 3, tema: 'Propiedades periódicas', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La energía de ionización tiende a ___ de izquierda a derecha en un período.',
    opciones: ['Disminuir', 'Aumentar', 'Mantenerse', 'Anularse'],
    correcta: 1,
    explicacion_correcta: 'Aumenta: cuesta más quitar un electrón porque el núcleo lo atrae con más fuerza.',
    explicacion_incorrectas: ['Es lo contrario.', '', 'Sí varía.', 'No se anula.'],
    imagen: null, formula: null, tags: ['ionizacion']
  },
  {
    id: 'q-03-017-i', unidad: 3, tema: 'Configuración y posición', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un elemento termina su configuración en 3s² 3p⁵. ¿Dónde está ubicado?',
    opciones: ['Período 3, grupo 17', 'Período 5, grupo 3', 'Período 3, grupo 7', 'Período 2, grupo 17'],
    correcta: 0,
    explicacion_correcta: 'Nivel 3 → período 3; 7 electrones de valencia (3s²3p⁵) → grupo 17 (halógenos).',
    explicacion_incorrectas: ['', 'El nivel es 3, no 5.', 'El grupo es 17, no 7.', 'El período es 3, no 2.'],
    imagen: null, formula: null, tags: ['config-posicion']
  },
  {
    id: 'q-03-018-i', unidad: 3, tema: 'Historia', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Quién organizó la primera tabla periódica dejando espacios para elementos por descubrir?',
    opciones: ['Bohr', 'Mendeléiev', 'Dalton', 'Rutherford'],
    correcta: 1,
    explicacion_correcta: 'Mendeléiev ordenó los elementos y predijo otros aún no descubiertos.',
    explicacion_incorrectas: ['Bohr trabajó el modelo atómico.', '', 'Dalton fue anterior.', 'Rutherford estudió el núcleo.'],
    imagen: null, formula: null, tags: ['historia', 'mendeleiev']
  },
  {
    id: 'q-03-019-i', unidad: 3, tema: 'Metales y no metales', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál de estas es una propiedad típica de los METALES?',
    opciones: ['Malos conductores', 'Buenos conductores y maleables', 'Frágiles y opacos', 'Gaseosos siempre'],
    correcta: 1,
    explicacion_correcta: 'Los metales son buenos conductores del calor y la electricidad, maleables y dúctiles.',
    explicacion_incorrectas: ['Eso describe a no metales.', '', 'Eso describe a no metales.', 'La mayoría son sólidos.'],
    imagen: null, formula: null, tags: ['metales']
  },
  {
    id: 'q-03-020-i', unidad: 3, tema: 'Subniveles (s,p,d,f)', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El bloque s comprende los grupos:',
    opciones: ['1 y 2', '13 a 18', '3 a 12', 'lantánidos'],
    correcta: 0,
    explicacion_correcta: 'El bloque s son los grupos 1 y 2 (se llena el subnivel s).',
    explicacion_incorrectas: ['', 'Esos son del bloque p.', 'Esos son del bloque d.', 'Esos son del bloque f.'],
    imagen: null, formula: null, tags: ['bloque-s']
  },
  {
    id: 'q-03-021-i', unidad: 3, tema: 'Grupos o familias', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Los elementos de un mismo grupo tienen propiedades químicas parecidas porque comparten:',
    opciones: ['El mismo número de neutrones', 'El mismo número de electrones de valencia', 'La misma masa', 'El mismo período'],
    correcta: 1,
    explicacion_correcta: 'Comparten el número de electrones de valencia, que determina su comportamiento químico.',
    explicacion_incorrectas: ['Los neutrones varían.', '', 'La masa varía.', 'Están en distintos períodos.'],
    imagen: null, formula: null, tags: ['familias', 'valencia']
  },
  {
    id: 'q-03-022-i', unidad: 3, tema: 'Propiedades periódicas', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Qué elemento esperarías que sea MÁS reactivo entre los metales alcalinos?',
    opciones: ['Litio (arriba)', 'Cesio (abajo)', 'Todos igual', 'Ninguno reacciona'],
    correcta: 1,
    explicacion_correcta: 'Al bajar en el grupo 1, la reactividad aumenta: el cesio cede su electrón más fácilmente.',
    explicacion_incorrectas: ['El litio es el menos reactivo del grupo.', '', 'No reaccionan igual.', 'Los alcalinos son muy reactivos.'],
    imagen: null, formula: null, tags: ['reactividad', 'alcalinos']
  },
  {
    id: 'q-03-023-i', unidad: 3, tema: 'Aplicaciones', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Los semiconductores de la electrónica (chips) se fabrican principalmente con:',
    opciones: ['Sodio', 'Silicio (un metaloide)', 'Helio', 'Oro puro'],
    correcta: 1,
    explicacion_correcta: 'El silicio, un metaloide, es la base de los semiconductores y los microchips.',
    explicacion_incorrectas: ['El sodio es un metal muy reactivo.', '', 'El helio es un gas noble.', 'El oro se usa en contactos, no como semiconductor base.'],
    imagen: null, formula: null, tags: ['aplicaciones', 'silicio']
  },

  /* ───────────── AVANZADO (7) ───────────── */
  {
    id: 'q-03-024-a', unidad: 3, tema: 'Configuración y posición', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Un elemento del período 4 que termina en 3d⁵ 4s² (Z=25) pertenece al bloque:',
    opciones: ['s', 'p', 'd', 'f'],
    correcta: 2,
    explicacion_correcta: 'Se está llenando el subnivel 3d → bloque d (es un metal de transición, el manganeso).',
    explicacion_incorrectas: ['No termina en s.', 'No termina en p.', '', 'El bloque f son lantánidos/actínidos.'],
    imagen: null, formula: null, tags: ['bloque-d', 'config-posicion']
  },
  {
    id: 'q-03-025-a', unidad: 3, tema: 'Propiedades periódicas', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Ordena por radio atómico CRECIENTE: F, Cl, Br (mismo grupo 17).',
    opciones: ['Br < Cl < F', 'F < Cl < Br', 'Cl < F < Br', 'Todos iguales'],
    correcta: 1,
    explicacion_correcta: 'Al bajar en el grupo el radio aumenta: F (menor) < Cl < Br (mayor).',
    explicacion_incorrectas: ['Es justo al revés.', '', 'No corresponde.', 'No son iguales.'],
    imagen: null, formula: null, tags: ['radio', 'tendencia']
  },
  {
    id: 'q-03-026-a', unidad: 3, tema: 'Propiedades periódicas', nivel: 'avanzado', tipo: 'su',
    pregunta: '¿Por qué el flúor es más electronegativo que el yodo, estando en el mismo grupo?',
    opciones: [
      'Porque el flúor es más grande',
      'Porque el flúor es más pequeño y su núcleo atrae más a los electrones',
      'Porque el yodo no tiene electrones',
      'Porque el yodo es un metal'
    ],
    correcta: 1,
    explicacion_correcta: 'El flúor es más pequeño: sus electrones de valencia están más cerca del núcleo y son atraídos con más fuerza.',
    explicacion_incorrectas: ['El flúor es más pequeño, no más grande.', '', 'El yodo sí tiene electrones.', 'El yodo es un no metal.'],
    imagen: null, formula: null, tags: ['electronegatividad', 'tendencia']
  },
  {
    id: 'q-03-027-a', unidad: 3, tema: 'Configuración y posición', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Un átomo neutro tiene configuración [Ne] 3s² 3p³. ¿En qué grupo y período está?',
    opciones: ['Período 3, grupo 15', 'Período 3, grupo 5', 'Período 2, grupo 15', 'Período 5, grupo 3'],
    correcta: 0,
    explicacion_correcta: 'Nivel 3 → período 3; 5 electrones de valencia (3s²3p³) → grupo 15 (es el fósforo).',
    explicacion_incorrectas: ['', 'El grupo es 15, no 5.', 'El período es 3.', 'El período es 3.'],
    imagen: null, formula: null, tags: ['config-posicion']
  },
  {
    id: 'q-03-028-a', unidad: 3, tema: 'Ley periódica', nivel: 'avanzado', tipo: 'su',
    pregunta: '¿Qué significa que las propiedades de los elementos sean "periódicas"?',
    opciones: [
      'Que nunca cambian',
      'Que se repiten a intervalos regulares al aumentar Z',
      'Que cambian al azar',
      'Que solo dependen de la masa'
    ],
    correcta: 1,
    explicacion_correcta: 'Periódico significa que las propiedades se repiten en patrones regulares al ordenar por número atómico.',
    explicacion_incorrectas: ['Sí cambian.', '', 'No son al azar: siguen un patrón.', 'No dependen solo de la masa.'],
    imagen: null, formula: null, tags: ['ley-periodica', 'periodicidad']
  },
  {
    id: 'q-03-029-a', unidad: 3, tema: 'Configuración y posición', nivel: 'avanzado', tipo: 'su',
    pregunta: '¿Por qué el helio (2 electrones) se coloca en el grupo 18 y no en el 2?',
    opciones: [
      'Por error histórico',
      'Porque tiene su capa de valencia completa, como los gases nobles',
      'Porque es un metal',
      'Porque pesa poco'
    ],
    correcta: 1,
    explicacion_correcta: 'El helio tiene su primer nivel lleno (1s²): se comporta como gas noble, por eso va en el grupo 18.',
    explicacion_incorrectas: ['No es un error.', '', 'No es un metal.', 'El peso no decide su grupo.'],
    imagen: null, formula: null, tags: ['helio', 'gases-nobles']
  },
  {
    id: 'q-03-030-a', unidad: 3, tema: 'Aplicaciones', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Conocer la POSICIÓN de un elemento en la tabla permite, sin memorizar, predecir:',
    opciones: [
      'Su color favorito',
      'Su comportamiento químico y propiedades aproximadas',
      'Su precio exacto',
      'Nada útil'
    ],
    correcta: 1,
    explicacion_correcta: 'La posición revela valencia, tendencias y reactividad: la tabla es una herramienta de predicción.',
    explicacion_incorrectas: ['No tiene que ver con colores.', '', 'El precio no se deduce de la tabla.', 'Sí es muy útil.'],
    imagen: null, formula: null, tags: ['prediccion', 'aplicaciones']
  }

]; /* FIN PREGUNTAS_U03 — 30 (9 · 14 · 7) */

window.getBancoU03 = function () { return window.PREGUNTAS_U03.slice(); };
