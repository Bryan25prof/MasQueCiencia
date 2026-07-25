/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/preguntas-u08.js  |  Banco de Preguntas — UNIDAD VIII
   ================================================================
   Unidad VIII "Ácidos y Bases". 30 preguntas (10 básicas · 12 inter ·
   8 avanzadas). Distractores ligados a errores frecuentes (Insights)
   vía tags:['err:eN']. Mismo esquema que U1-U4.
================================================================ */

window.PREGUNTAS_U08 = [

  /* ───────────── BÁSICO (10) ───────────── */
  {
    id: 'q-08-001-b', unidad: 8, tema: 'Teoría de Arrhenius', nivel: 'basico', tipo: 'su',
    pregunta: 'Según Arrhenius, un ácido en agua libera:',
    opciones: ['Iones OH⁻', 'Iones H⁺', 'Electrones libres', 'Neutrones'],
    correcta: 1,
    explicacion_correcta: 'Arrhenius define al ácido como la sustancia que libera H⁺ al disolverse en agua.',
    explicacion_incorrectas: ['El OH⁻ corresponde a las bases.', '', 'No se liberan electrones libres.', 'Los neutrones no participan.'],
    imagen: null, formula: null, tags: ['arrhenius']
  },
  {
    id: 'q-08-002-b', unidad: 8, tema: 'Teoría de Arrhenius', nivel: 'basico', tipo: 'su',
    pregunta: 'Según Arrhenius, una base en agua libera:',
    opciones: ['Iones H⁺', 'Iones OH⁻', 'Protones', 'Iones metálicos únicamente'],
    correcta: 1,
    explicacion_correcta: 'Arrhenius define a la base como la sustancia que libera OH⁻ al disolverse en agua.',
    explicacion_incorrectas: ['El H⁺ corresponde a los ácidos.', '', 'Los protones son H⁺, propios del ácido.', 'No es exclusivo de iones metálicos.'],
    imagen: null, formula: null, tags: ['arrhenius']
  },
  {
    id: 'q-08-003-b', unidad: 8, tema: 'Brønsted-Lowry', nivel: 'basico', tipo: 'su',
    pregunta: 'Según Brønsted-Lowry, un ácido es la sustancia que:',
    opciones: ['Acepta un protón', 'Dona un protón', 'Dona un par de electrones', 'Acepta un par de electrones'],
    correcta: 1,
    explicacion_correcta: 'Brønsted-Lowry: ácido = donador de protones (H⁺).',
    explicacion_incorrectas: ['Aceptar el protón es la base.', '', 'Esa es la definición de base de Lewis.', 'Esa es la definición de ácido de Lewis.'],
    imagen: null, formula: null, tags: ['bronsted']
  },
  {
    id: 'q-08-004-b', unidad: 8, tema: 'Brønsted-Lowry', nivel: 'basico', tipo: 'su',
    pregunta: 'Según Brønsted-Lowry, una base es la sustancia que:',
    opciones: ['Dona un protón', 'Acepta un protón', 'Dona electrones', 'Libera OH⁻ siempre'],
    correcta: 1,
    explicacion_correcta: 'Brønsted-Lowry: base = aceptora de protones (H⁺), incluso sin tener OH⁻ en su fórmula.',
    explicacion_incorrectas: ['Donar el protón es el ácido.', '', 'No dona electrones; acepta un protón.', 'No siempre libera OH⁻, como el NH₃.'],
    imagen: null, formula: null, tags: ['bronsted', 'err:e2']
  },
  {
    id: 'q-08-005-b', unidad: 8, tema: 'Teoría de Lewis', nivel: 'basico', tipo: 'su',
    pregunta: 'Según Lewis, un ácido es la sustancia que:',
    opciones: ['Acepta un par de electrones', 'Dona un par de electrones', 'Libera H⁺ en agua', 'Libera OH⁻ en agua'],
    correcta: 0,
    explicacion_correcta: 'Lewis: ácido = aceptor de un par de electrones; no requiere hidrógenos ácidos.',
    explicacion_incorrectas: ['', 'Donar el par de electrones es la base de Lewis.', 'Esa es la definición de Arrhenius.', 'Esa es la definición de base de Arrhenius.'],
    imagen: null, formula: null, tags: ['lewis']
  },
  {
    id: 'q-08-006-b', unidad: 8, tema: 'pH y pOH', nivel: 'basico', tipo: 'su',
    pregunta: 'La fórmula correcta del pH es:',
    opciones: ['pH = log[H⁺]', 'pH = −log[H⁺]', 'pH = [H⁺] × 14', 'pH = 14 − [H⁺]'],
    correcta: 1,
    explicacion_correcta: 'El pH se define como el logaritmo negativo de la concentración de iones H⁺.',
    explicacion_incorrectas: ['Falta el signo negativo.', '', 'No es una multiplicación directa.', 'No es una resta directa de la concentración.'],
    imagen: null, formula: 'pH = −log[H⁺]', tags: ['ph']
  },
  {
    id: 'q-08-007-b', unidad: 8, tema: 'pH y pOH', nivel: 'basico', tipo: 'su',
    pregunta: 'En la escala de pH, una solución neutra tiene un valor de:',
    opciones: ['0', '7', '14', '100'],
    correcta: 1,
    explicacion_correcta: 'pH = 7 corresponde a una solución neutra (como el agua pura a 25 °C).',
    explicacion_incorrectas: ['pH 0 es extremadamente ácido.', '', 'pH 14 es extremadamente básico.', 'La escala de pH no llega a 100.'],
    imagen: null, formula: null, tags: ['ph']
  },
  {
    id: 'q-08-008-b', unidad: 8, tema: 'Autoionización del agua', nivel: 'basico', tipo: 'su',
    pregunta: 'El valor de Kw (producto iónico del agua) a 25 °C es:',
    opciones: ['1×10⁻⁷', '1×10⁻¹⁴', '7', '14'],
    correcta: 1,
    explicacion_correcta: 'Kw = [H⁺][OH⁻] = 1×10⁻¹⁴ a 25 °C.',
    explicacion_incorrectas: ['Ese valor corresponde a [H⁺] en agua pura, no a Kw.', '', 'El 7 es el pH del agua, no Kw.', 'El 14 es la suma pH+pOH, no Kw.'],
    imagen: null, formula: 'Kw = [H⁺][OH⁻]', tags: ['kw']
  },
  {
    id: 'q-08-009-b', unidad: 8, tema: 'Indicadores', nivel: 'basico', tipo: 'su',
    pregunta: 'Un indicador ácido-base sirve principalmente para:',
    opciones: ['Cambiar el pH de la solución', 'Mostrar el pH mediante un cambio de color', 'Aumentar la concentración de H⁺', 'Neutralizar la solución'],
    correcta: 1,
    explicacion_correcta: 'Un indicador revela el pH cambiando de color, sin alterar significativamente la reacción principal.',
    explicacion_incorrectas: ['No participa activamente cambiando el pH.', '', 'No aumenta la concentración de H⁺.', 'No es un agente neutralizante.'],
    imagen: null, formula: null, tags: ['indicadores', 'err:e4']
  },
  {
    id: 'q-08-010-b', unidad: 8, tema: 'Neutralización', nivel: 'basico', tipo: 'su',
    pregunta: 'La reacción de neutralización entre un ácido y una base produce:',
    opciones: ['Sal y agua', 'Solo agua', 'Solo sal', 'Un nuevo ácido'],
    correcta: 0,
    explicacion_correcta: 'Ácido + base → sal + agua (ej. HCl + NaOH → NaCl + H₂O).',
    explicacion_incorrectas: ['', 'También se forma sal, no solo agua.', 'También se forma agua, no solo sal.', 'No se forma un nuevo ácido en una neutralización simple.'],
    imagen: null, formula: null, tags: ['neutralizacion']
  },

  /* ───────────── INTERMEDIO (12) ───────────── */
  {
    id: 'q-08-011-i', unidad: 8, tema: 'Brønsted-Lowry', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En la reacción NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, el agua actúa como:',
    opciones: ['Ácido, porque dona un protón', 'Base, porque acepta un protón', 'Ácido de Lewis', 'Ninguna de las dos'],
    correcta: 0,
    explicacion_correcta: 'El agua dona un H⁺ al NH₃, por lo que actúa como ácido de Brønsted-Lowry en esta reacción.',
    explicacion_incorrectas: ['', 'Aceptar el protón sería el rol del NH₃.', 'Aquí se evalúa Brønsted-Lowry, no Lewis.', 'Sí tiene un rol: dona el protón.'],
    imagen: null, formula: null, tags: ['bronsted']
  },
  {
    id: 'q-08-012-i', unidad: 8, tema: 'Ácidos y bases conjugados', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La base conjugada del ácido HCl es:',
    opciones: ['H⁺', 'Cl⁻', 'HCl₂', 'H₂Cl'],
    correcta: 1,
    explicacion_correcta: 'Al donar su H⁺, el HCl deja como base conjugada al ion Cl⁻.',
    explicacion_incorrectas: ['El H⁺ es el protón donado, no la base conjugada.', '', 'Esa especie no existe en este equilibrio.', 'Esa especie no existe en este equilibrio.'],
    imagen: null, formula: null, tags: ['conjugados']
  },
  {
    id: 'q-08-013-i', unidad: 8, tema: 'Ácidos y bases conjugados', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El ácido conjugado del agua (cuando actúa como base) es:',
    opciones: ['OH⁻', 'H₃O⁺', 'H₂', 'O²⁻'],
    correcta: 1,
    explicacion_correcta: 'Cuando el agua acepta un protón, se forma H₃O⁺ (ion hidronio), su ácido conjugado.',
    explicacion_incorrectas: ['El OH⁻ se forma cuando el agua dona un protón (actúa como ácido).', '', 'No corresponde a este equilibrio.', 'No corresponde a este equilibrio.'],
    imagen: null, formula: null, tags: ['conjugados']
  },
  {
    id: 'q-08-014-i', unidad: 8, tema: 'pH y pOH', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Si una solución tiene pH = 4, su pOH es:',
    opciones: ['4', '7', '10', '14'],
    correcta: 2,
    explicacion_correcta: 'Como pH + pOH = 14, entonces pOH = 14 − 4 = 10.',
    explicacion_incorrectas: ['Confunde pH con pOH.', 'No corresponde a la relación pH+pOH=14.', '', 'Ese sería el valor de pH+pOH, no el pOH solo.'],
    imagen: null, formula: 'pH + pOH = 14', tags: ['ph']
  },
  {
    id: 'q-08-015-i', unidad: 8, tema: 'pH y pOH', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Una solución con [H⁺] = 1×10⁻³ M tiene un pH de:',
    opciones: ['3', '−3', '11', '1×10⁻³'],
    correcta: 0,
    explicacion_correcta: 'pH = −log(1×10⁻³) = 3.',
    explicacion_incorrectas: ['', 'El pH no lleva signo negativo en este caso.', 'Ese sería el pOH, no el pH.', 'El pH es el logaritmo, no la concentración misma.'],
    imagen: null, formula: 'pH = −log[H⁺]', tags: ['ph', 'err:e1']
  },
  {
    id: 'q-08-016-i', unidad: 8, tema: 'Neutralización y titulación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En una titulación, el punto de equivalencia es cuando:',
    opciones: ['El indicador se agota', 'Ácido y base reaccionaron en proporción estequiométrica exacta', 'El pH siempre llega a 7', 'Se añade el doble de base que de ácido'],
    correcta: 1,
    explicacion_correcta: 'Es el punto donde las cantidades de ácido y base reaccionaron exactamente según la estequiometría.',
    explicacion_incorrectas: ['El indicador no se "agota"; cambia de color.', '', 'Solo es pH 7 si ambos son fuertes.', 'No implica necesariamente el doble.'],
    imagen: null, formula: null, tags: ['titulacion', 'err:e3']
  },
  {
    id: 'q-08-017-i', unidad: 8, tema: 'Neutralización y titulación', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Al titular un ácido fuerte con una base fuerte, el pH en el punto de equivalencia es aproximadamente:',
    opciones: ['3', '7', '10', '14'],
    correcta: 1,
    explicacion_correcta: 'Cuando ácido y base son ambos fuertes, la sal formada no altera el pH: el punto de equivalencia es 7.',
    explicacion_incorrectas: ['Ese pH sería demasiado ácido para este caso.', '', 'Ese valor sería demasiado básico para este caso.', 'Ese valor es demasiado extremo para este caso.'],
    imagen: null, formula: null, tags: ['titulacion']
  },
  {
    id: 'q-08-018-i', unidad: 8, tema: 'Hidrólisis de sales', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El bicarbonato de sodio (NaHCO₃) disuelto en agua da una solución:',
    opciones: ['Ácida', 'Neutra', 'Ligeramente básica', 'Extremadamente básica'],
    correcta: 2,
    explicacion_correcta: 'Es la sal de un ácido débil con una base fuerte: la hidrólisis genera una solución ligeramente básica (pH ≈ 8.4).',
    explicacion_incorrectas: ['No es ácida: viene de una base fuerte.', 'No es exactamente neutra por la hidrólisis.', '', 'No es extremadamente básica, solo ligeramente.'],
    imagen: null, formula: null, tags: ['hidrolisis']
  },
  {
    id: 'q-08-019-i', unidad: 8, tema: 'Hidrólisis de sales', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La sal formada por un ácido fuerte y una base débil (ej. NH₄Cl) da una solución:',
    opciones: ['Ácida', 'Básica', 'Siempre neutra', 'Solo depende del color del indicador'],
    correcta: 0,
    explicacion_correcta: 'El NH₄⁺ hidroliza liberando H⁺ extra: la solución resulta ácida.',
    explicacion_incorrectas: ['', 'No es básica en este caso.', 'No es neutra: la hidrólisis desplaza el pH.', 'El indicador solo revela el pH, no lo determina.'],
    imagen: null, formula: null, tags: ['hidrolisis']
  },
  {
    id: 'q-08-020-i', unidad: 8, tema: 'Teoría de Lewis', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El BF₃ puede actuar como ácido de Lewis aunque no tenga hidrógenos ácidos porque:',
    opciones: ['Libera H⁺ en agua', 'Acepta un par de electrones de otra molécula', 'Dona electrones', 'Es una base de Arrhenius'],
    correcta: 1,
    explicacion_correcta: 'Según Lewis, el ácido solo necesita aceptar un par de electrones; no requiere hidrógenos.',
    explicacion_incorrectas: ['No tiene H⁺ para liberar.', '', 'Donar electrones sería base de Lewis.', 'No corresponde a la definición de Arrhenius.'],
    imagen: null, formula: null, tags: ['lewis']
  },
  {
    id: 'q-08-021-i', unidad: 8, tema: 'Indicadores', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La fenolftaleína es incolora en medio ácido y toma color rosado en medio:',
    opciones: ['Ácido', 'Básico', 'Neutro solamente', 'Nunca cambia de color'],
    correcta: 1,
    explicacion_correcta: 'La fenolftaleína vira a rosado en presencia de una base (pH aproximadamente mayor a 8.2).',
    explicacion_incorrectas: ['En ácido permanece incolora.', '', 'El vire ocurre en medio básico, no exactamente en el neutro.', 'Sí cambia de color según el pH.'],
    imagen: null, formula: null, tags: ['indicadores']
  },
  {
    id: 'q-08-022-i', unidad: 8, tema: 'pH y pOH', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Si [OH⁻] = 1×10⁻² M, el pH de la solución es aproximadamente:',
    opciones: ['2', '12', '14', '−2'],
    correcta: 1,
    explicacion_correcta: 'pOH = −log(1×10⁻²) = 2, entonces pH = 14 − 2 = 12.',
    explicacion_incorrectas: ['Ese sería el pOH, no el pH.', '', 'No es el valor de Kw.', 'El pH no es negativo en este caso.'],
    imagen: null, formula: 'pH = 14 − pOH', tags: ['ph']
  },

  /* ───────────── AVANZADO (8) ───────────── */
  {
    id: 'q-08-023-a', unidad: 8, tema: 'Teoría de Lewis', nivel: 'avanzado', tipo: 'su',
    pregunta: 'De las tres teorías ácido-base estudiadas, la relación correcta entre su amplitud es:',
    opciones: ['Lewis ⊂ Brønsted-Lowry ⊂ Arrhenius', 'Arrhenius ⊂ Brønsted-Lowry ⊂ Lewis', 'Las tres son idénticas en alcance', 'Brønsted-Lowry ⊂ Arrhenius ⊂ Lewis'],
    correcta: 1,
    explicacion_correcta: 'Arrhenius es la más restringida (solo en agua); Brønsted-Lowry la amplía (protones); Lewis es la más general (pares de electrones).',
    explicacion_incorrectas: ['El orden está invertido.', '', 'No tienen el mismo alcance.', 'El orden no corresponde a la amplitud real.'],
    imagen: null, formula: null, tags: ['teorias']
  },
  {
    id: 'q-08-024-a', unidad: 8, tema: 'Ácidos y bases conjugados', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En el equilibrio CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺, el par conjugado ácido-base formado por el ácido acético es:',
    opciones: ['CH₃COOH / H₃O⁺', 'CH₃COOH / CH₃COO⁻', 'H₂O / OH⁻', 'CH₃COO⁻ / H₃O⁺'],
    correcta: 1,
    explicacion_correcta: 'El ácido CH₃COOH y su base conjugada CH₃COO⁻ forman un par conjugado.',
    explicacion_incorrectas: ['El H₃O⁺ es el ácido conjugado del agua, otro par.', '', 'Ese par corresponde al agua, no al ácido acético.', 'Esa combinación mezcla especies de pares distintos.'],
    imagen: null, formula: null, tags: ['conjugados']
  },
  {
    id: 'q-08-025-a', unidad: 8, tema: 'Autoionización del agua', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En agua pura a 25 °C, la concentración de [H⁺] es igual a:',
    opciones: ['1×10⁻¹⁴ M', '1×10⁻⁷ M', '7 M', '14 M'],
    correcta: 1,
    explicacion_correcta: 'Como Kw=[H⁺][OH⁻]=1×10⁻¹⁴ y en agua pura [H⁺]=[OH⁻], entonces [H⁺]=1×10⁻⁷ M.',
    explicacion_incorrectas: ['Ese es el valor de Kw, no de [H⁺] sola.', '', 'El pH del agua pura es 7, no la concentración en molar directamente.', 'No corresponde a ninguna magnitud de este sistema.'],
    imagen: null, formula: 'Kw = [H⁺][OH⁻]', tags: ['kw']
  },
  {
    id: 'q-08-026-a', unidad: 8, tema: 'Neutralización y titulación', nivel: 'avanzado', tipo: 'su',
    pregunta: '25 mL de HCl 0.1 M se titulan con NaOH 0.1 M. El volumen de NaOH necesario para el punto de equivalencia es:',
    opciones: ['12.5 mL', '25 mL', '50 mL', '100 mL'],
    correcta: 1,
    explicacion_correcta: 'Como las concentraciones son iguales (0.1 M), se necesita el mismo volumen: 25 mL, para que moles de ácido = moles de base.',
    explicacion_incorrectas: ['Sería la mitad, no coincide con la estequiometría 1:1 a igual concentración.', '', 'Sería el doble, no corresponde aquí.', 'Ese volumen es excesivo para este caso.'],
    imagen: null, formula: 'mol ácido = mol base', tags: ['titulacion']
  },
  {
    id: 'q-08-027-a', unidad: 8, tema: 'Hidrólisis de sales', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La sal formada por un ácido fuerte y una base fuerte (ej. NaCl) en agua da una solución:',
    opciones: ['Ácida', 'Básica', 'Neutra', 'Depende del indicador usado'],
    correcta: 2,
    explicacion_correcta: 'Ni el catión ni el anión hidrolizan de forma significativa: la solución permanece neutra (pH≈7).',
    explicacion_incorrectas: ['No hidroliza para dar acidez.', 'No hidroliza para dar basicidad.', '', 'El pH no depende del indicador, solo se revela con él.'],
    imagen: null, formula: null, tags: ['hidrolisis']
  },
  {
    id: 'q-08-028-a', unidad: 8, tema: 'Brønsted-Lowry', nivel: 'avanzado', tipo: 'su',
    pregunta: 'El ion HCO₃⁻ (bicarbonato) puede actuar como ácido o como base según la reacción. Esto se conoce como sustancia:',
    opciones: ['Anfótera', 'Inerte', 'Neutra siempre', 'No reactiva'],
    correcta: 0,
    explicacion_correcta: 'Una sustancia anfótera (o anfiprótica) puede donar o aceptar un protón según con qué reaccione, como el HCO₃⁻.',
    explicacion_incorrectas: ['', 'No es inerte: participa activamente en equilibrios ácido-base.', 'No es neutra siempre, depende de la reacción.', 'Sí es reactiva en equilibrios ácido-base.'],
    imagen: null, formula: null, tags: ['bronsted']
  },
  {
    id: 'q-08-029-a', unidad: 8, tema: 'pH y pOH', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Si el pH de una solución cambia de 3 a 5, la concentración de [H⁺]:',
    opciones: ['Aumenta 2 veces', 'Disminuye 100 veces', 'Aumenta 100 veces', 'No cambia'],
    correcta: 1,
    explicacion_correcta: 'Cada unidad de pH representa un factor de 10 en [H⁺]; subir 2 unidades de pH significa que [H⁺] disminuye 10²=100 veces.',
    explicacion_incorrectas: ['El cambio no es lineal, es logarítmico (factor de 10 por unidad).', '', 'La concentración disminuye, no aumenta, al subir el pH.', 'Sí cambia notablemente por ser una escala logarítmica.'],
    imagen: null, formula: null, tags: ['ph']
  },
  {
    id: 'q-08-030-a', unidad: 8, tema: 'Teorías ácido-base', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La reacción Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ se clasifica mejor como una reacción ácido-base de:',
    opciones: ['Arrhenius', 'Brønsted-Lowry', 'Lewis', 'Ninguna teoría la explica'],
    correcta: 2,
    explicacion_correcta: 'No hay transferencia de protones ni iones H⁺/OH⁻; el Ag⁺ acepta pares de electrones del NH₃: es una reacción ácido-base de Lewis.',
    explicacion_incorrectas: ['No hay H⁺ ni OH⁻ involucrados.', 'No hay transferencia de protones en esta reacción.', '', 'Sí la explica la teoría de Lewis.'],
    imagen: null, formula: null, tags: ['lewis']
  }

];
