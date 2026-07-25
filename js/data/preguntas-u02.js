/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/preguntas-u02.js  |  Banco de Preguntas — UNIDAD II
   ================================================================
   Unidad II "Estructura Atómica". 30 preguntas, mismo esquema que U1
   (Sección 12 del Documento Maestro). Archivo .js (global) para
   compatibilidad offline file://.
   Distribución: 9 básicas · 14 intermedias · 7 avanzadas.
   Varios distractores se vinculan a "errores frecuentes" (Insights)
   mediante el campo opcional tags:['err:<id>'].
================================================================ */

window.PREGUNTAS_U02 = [

  /* ───────────── BÁSICO (9) ───────────── */
  {
    id: 'q-02-001-b', unidad: 2, tema: 'Partículas subatómicas', nivel: 'basico', tipo: 'su',
    pregunta: '¿Qué partícula subatómica tiene carga negativa?',
    opciones: ['Protón', 'Neutrón', 'Electrón', 'Núcleo'],
    correcta: 2,
    explicacion_correcta: 'El electrón tiene carga negativa (−1) y se ubica en la zona externa del átomo.',
    explicacion_incorrectas: ['El protón tiene carga positiva (+1).', 'El neutrón no tiene carga (0).', '', 'El núcleo es una región, no una partícula.'],
    imagen: null, formula: null, tags: ['electron']
  },
  {
    id: 'q-02-002-b', unidad: 2, tema: 'Partículas subatómicas', nivel: 'basico', tipo: 'su',
    pregunta: '¿Dónde se encuentran los protones y neutrones?',
    opciones: ['En las órbitas externas', 'En el núcleo del átomo', 'Fuera del átomo', 'En los electrones'],
    correcta: 1,
    explicacion_correcta: 'Protones y neutrones forman el núcleo, en el centro del átomo, donde se concentra casi toda la masa.',
    explicacion_incorrectas: ['En las órbitas están los electrones, no los protones.', '', 'Están dentro del átomo, no fuera.', 'Los electrones son otras partículas.'],
    imagen: null, formula: null, tags: ['nucleo']
  },
  {
    id: 'q-02-003-b', unidad: 2, tema: 'Número atómico', nivel: 'basico', tipo: 'su',
    pregunta: 'El número atómico (Z) de un elemento indica su número de:',
    opciones: ['Neutrones', 'Protones', 'Electrones de valencia', 'Niveles de energía'],
    correcta: 1,
    explicacion_correcta: 'El número atómico Z es el número de protones del núcleo; es lo que identifica al elemento.',
    explicacion_incorrectas: ['Los neutrones se cuentan aparte (en el número másico).', '', 'La valencia no define Z.', 'Los niveles dependen de los electrones.'],
    imagen: null, formula: 'Z = nº de protones', tags: ['numero-atomico']
  },
  {
    id: 'q-02-004-b', unidad: 2, tema: 'Modelos atómicos', nivel: 'basico', tipo: 'su',
    pregunta: '¿Quién propuso que los electrones giran en órbitas o niveles de energía definidos?',
    opciones: ['Dalton', 'Thomson', 'Bohr', 'Demócrito'],
    correcta: 2,
    explicacion_correcta: 'Niels Bohr propuso órbitas o niveles de energía definidos para los electrones.',
    explicacion_incorrectas: ['Dalton imaginó el átomo como esfera maciza e indivisible.', 'Thomson propuso el modelo del "budín de pasas".', '', 'Demócrito solo planteó la idea filosófica del átomo.'],
    imagen: null, formula: null, tags: ['bohr', 'modelos']
  },
  {
    id: 'q-02-005-b', unidad: 2, tema: 'Carga del átomo', nivel: 'basico', tipo: 'vf',
    pregunta: 'En un átomo neutro, el número de protones es igual al número de electrones. ¿Verdadero o falso?',
    opciones: ['Verdadero', 'Falso'],
    correcta: 0,
    explicacion_correcta: 'Verdadero. Si las cargas + y − se igualan, el átomo es neutro.',
    explicacion_incorrectas: ['', 'Es verdadero: protones (+) y electrones (−) se compensan en un átomo neutro.'],
    imagen: null, formula: null, tags: ['neutro']
  },
  {
    id: 'q-02-006-b', unidad: 2, tema: 'Iones', nivel: 'basico', tipo: 'su',
    pregunta: 'Cuando un átomo PIERDE electrones, se convierte en:',
    opciones: ['Un anión (carga negativa)', 'Un catión (carga positiva)', 'Un isótopo', 'Un neutrón'],
    correcta: 1,
    explicacion_correcta: 'Al perder electrones (−), quedan más protones (+): se forma un catión, con carga positiva.',
    explicacion_incorrectas: ['El anión se forma al GANAR electrones.', '', 'Un isótopo cambia neutrones, no carga.', 'El neutrón es una partícula, no un ion.'],
    imagen: null, formula: null, tags: ['cation', 'iones', 'err:e2']
  },
  {
    id: 'q-02-007-b', unidad: 2, tema: 'Número másico', nivel: 'basico', tipo: 'su',
    pregunta: 'El número másico (A) de un átomo es la suma de:',
    opciones: ['Protones + electrones', 'Protones + neutrones', 'Neutrones + electrones', 'Solo protones'],
    correcta: 1,
    explicacion_correcta: 'El número másico A = protones + neutrones (los nucleones).',
    explicacion_incorrectas: ['Los electrones casi no aportan masa.', '', 'Los electrones no se cuentan en A.', 'Faltan los neutrones.'],
    imagen: null, formula: 'A = Z + N', tags: ['numero-masico']
  },
  {
    id: 'q-02-008-b', unidad: 2, tema: 'Configuración electrónica', nivel: 'basico', tipo: 'su',
    pregunta: '¿Cuántos electrones caben como máximo en el primer nivel de energía (n=1)?',
    opciones: ['2', '8', '18', '32'],
    correcta: 0,
    explicacion_correcta: 'El primer nivel (n=1) admite como máximo 2 electrones.',
    explicacion_incorrectas: ['', '8 es el máximo del segundo nivel.', '18 corresponde al tercero.', '32 al cuarto.'],
    imagen: null, formula: '2n²', tags: ['niveles']
  },
  {
    id: 'q-02-009-b', unidad: 2, tema: 'Isótopos', nivel: 'basico', tipo: 'su',
    pregunta: 'Dos isótopos del mismo elemento se diferencian en su número de:',
    opciones: ['Protones', 'Electrones', 'Neutrones', 'Niveles'],
    correcta: 2,
    explicacion_correcta: 'Los isótopos tienen igual número de protones (mismo elemento) pero distinto número de neutrones.',
    explicacion_incorrectas: ['Si cambiaran los protones, sería otro elemento.', 'Cambiar electrones forma iones, no isótopos.', '', 'Los niveles dependen de los electrones.'],
    imagen: null, formula: null, tags: ['isotopos', 'err:e4']
  },

  /* ───────────── INTERMEDIO (14) ───────────── */
  {
    id: 'q-02-010-i', unidad: 2, tema: 'Configuración electrónica', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuál es la configuración electrónica del oxígeno (Z=8)?',
    opciones: ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s⁴ 2p²', '1s² 2p⁶'],
    correcta: 0,
    explicacion_correcta: 'Con 8 electrones: 1s² (2) + 2s² (2) + 2p⁴ (4) = 8.',
    explicacion_incorrectas: ['', 'Eso suma 10 electrones (neón), no 8.', '2s solo admite 2 electrones, no 4.', 'Falta el subnivel 2s.'],
    imagen: null, formula: null, tags: ['config', 'oxigeno']
  },
  {
    id: 'q-02-011-i', unidad: 2, tema: 'Principio de Aufbau', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Según el principio de Aufbau, ¿qué subnivel se llena ANTES?',
    opciones: ['3d antes que 4s', '4s antes que 3d', 'Da igual el orden', '4p antes que 4s'],
    correcta: 1,
    explicacion_correcta: 'El 4s tiene menor energía que el 3d, por eso se llena antes (aunque "n" sea mayor).',
    explicacion_incorrectas: ['Es al revés: 4s se llena antes que 3d.', '', 'El orden sí importa: lo marca la energía.', 'El 4s se llena antes que el 4p.'],
    imagen: null, formula: null, tags: ['aufbau', 'err:e5']
  },
  {
    id: 'q-02-012-i', unidad: 2, tema: 'Números cuánticos', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El número cuántico principal (n) indica principalmente:',
    opciones: ['La forma del orbital', 'El nivel de energía y tamaño', 'El giro del electrón', 'La orientación del orbital'],
    correcta: 1,
    explicacion_correcta: 'n indica el nivel de energía y el tamaño del orbital; a mayor n, más lejos y más energía.',
    explicacion_incorrectas: ['La forma la da el número l.', '', 'El giro lo da el número de spin (mₛ).', 'La orientación la da mₗ.'],
    imagen: null, formula: null, tags: ['cuanticos']
  },
  {
    id: 'q-02-013-i', unidad: 2, tema: 'Modelos atómicos', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El experimento de la lámina de oro de Rutherford demostró que el átomo:',
    opciones: [
      'Es una esfera maciza',
      'Tiene un núcleo pequeño, denso y positivo, y mucho espacio vacío',
      'No tiene núcleo',
      'Está lleno de electrones por igual'
    ],
    correcta: 1,
    explicacion_correcta: 'La mayoría de partículas pasaban de largo (espacio vacío) y pocas rebotaban: existe un núcleo pequeño, denso y positivo.',
    explicacion_incorrectas: ['Si fuera maciza, casi todas rebotarían.', '', 'Sí tiene núcleo: fue su gran descubrimiento.', 'Los electrones están en la zona externa, no uniformes.'],
    imagen: null, formula: null, tags: ['rutherford', 'err:e1']
  },
  {
    id: 'q-02-014-i', unidad: 2, tema: 'Principio de Hund', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El principio de Hund indica que, dentro de un subnivel, los electrones:',
    opciones: [
      'Se aparean lo antes posible',
      'Ocupan primero orbitales separados con el mismo giro',
      'Se ubican todos en un solo orbital',
      'No siguen ningún orden'
    ],
    correcta: 1,
    explicacion_correcta: 'Primero entra un electrón en cada orbital del subnivel (mismo spin) y solo después se aparean.',
    explicacion_incorrectas: ['Se aparean lo más tarde posible, no antes.', '', 'No caben todos en un solo orbital.', 'Sí siguen un orden (Hund).'],
    imagen: null, formula: null, tags: ['hund']
  },
  {
    id: 'q-02-015-i', unidad: 2, tema: 'Iones', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El ion Na⁺ (sodio, Z=11) tiene:',
    opciones: ['11 electrones', '10 electrones', '12 electrones', '11 protones y 11 electrones'],
    correcta: 1,
    explicacion_correcta: 'El Na⁺ perdió 1 electrón: conserva 11 protones pero tiene 10 electrones.',
    explicacion_incorrectas: ['Tendría 11 si fuera neutro.', '', 'Ganaría electrones para tener 12, pero es un catión.', 'Si fueran iguales, sería neutro, no Na⁺.'],
    imagen: null, formula: null, tags: ['iones', 'sodio']
  },
  {
    id: 'q-02-016-i', unidad: 2, tema: 'Isótopos', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El carbono-12 y el carbono-14 son isótopos. ¿En qué se diferencian?',
    opciones: [
      'En el número de protones',
      'En el número de neutrones (6 vs 8)',
      'En el número de electrones',
      'En su número atómico'
    ],
    correcta: 1,
    explicacion_correcta: 'Ambos tienen 6 protones (carbono), pero el C-12 tiene 6 neutrones y el C-14 tiene 8.',
    explicacion_incorrectas: ['Si cambiaran los protones, no sería carbono.', '', 'Como átomos neutros, ambos tienen 6 electrones.', 'El número atómico es 6 en los dos.'],
    imagen: null, formula: 'A = Z + N', tags: ['isotopos', 'carbono']
  },
  {
    id: 'q-02-017-i', unidad: 2, tema: 'Configuración electrónica', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Los electrones de valencia son los que se encuentran en:',
    opciones: ['El núcleo', 'El último nivel de energía', 'El primer nivel', 'Los neutrones'],
    correcta: 1,
    explicacion_correcta: 'Los electrones de valencia están en el último nivel ocupado y determinan el comportamiento químico.',
    explicacion_incorrectas: ['En el núcleo no hay electrones.', '', 'No son los del primer nivel, sino los del último.', 'Los neutrones no tienen electrones.'],
    imagen: null, formula: null, tags: ['valencia']
  },
  {
    id: 'q-02-018-i', unidad: 2, tema: 'Modelos atómicos', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Ordena del más antiguo al más moderno: I. Bohr · II. Dalton · III. Modelo cuántico · IV. Thomson',
    opciones: ['II → IV → I → III', 'I → II → III → IV', 'IV → II → I → III', 'III → I → IV → II'],
    correcta: 0,
    explicacion_correcta: 'Dalton (esfera) → Thomson (budín) → Bohr (órbitas) → modelo cuántico (orbitales).',
    explicacion_incorrectas: ['', 'Dalton fue primero, no Bohr.', 'Thomson va después de Dalton.', 'El cuántico es el más reciente, no el primero.'],
    imagen: null, formula: null, tags: ['modelos', 'historia']
  },
  {
    id: 'q-02-019-i', unidad: 2, tema: 'Niveles de energía', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuántos electrones caben como máximo en el segundo nivel (n=2)?',
    opciones: ['2', '8', '18', '10'],
    correcta: 1,
    explicacion_correcta: 'Con la regla 2n²: 2·(2²) = 8 electrones en el segundo nivel.',
    explicacion_incorrectas: ['2 es el máximo del primer nivel.', '', '18 es el del tercer nivel.', 'No corresponde a 2n².'],
    imagen: null, formula: '2n²', tags: ['niveles']
  },
  {
    id: 'q-02-020-i', unidad: 2, tema: 'Partículas subatómicas', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Por qué casi toda la masa del átomo está en el núcleo?',
    opciones: [
      'Porque el núcleo es muy grande',
      'Porque protones y neutrones tienen mucha más masa que los electrones',
      'Porque hay más electrones que protones',
      'Porque los electrones son muy pesados'
    ],
    correcta: 1,
    explicacion_correcta: 'Un protón o neutrón pesa unas 1836 veces más que un electrón; por eso la masa se concentra en el núcleo.',
    explicacion_incorrectas: ['El núcleo es diminuto comparado con el átomo.', '', 'En un átomo neutro hay igual nº de ambos.', 'Los electrones son muy livianos, no pesados.'],
    imagen: null, formula: null, tags: ['masa', 'nucleo']
  },
  {
    id: 'q-02-021-i', unidad: 2, tema: 'Números cuánticos', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El número cuántico de spin (mₛ) describe:',
    opciones: ['El tamaño del orbital', 'El sentido de giro del electrón', 'La forma del orbital', 'El nivel de energía'],
    correcta: 1,
    explicacion_correcta: 'mₛ describe el giro (spin) del electrón, con dos valores posibles: +½ y −½.',
    explicacion_incorrectas: ['El tamaño lo da n.', '', 'La forma la da l.', 'El nivel lo da n.'],
    imagen: null, formula: 'mₛ = ±½', tags: ['spin', 'cuanticos']
  },
  {
    id: 'q-02-022-i', unidad: 2, tema: 'Principio de Pauli', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El principio de exclusión de Pauli establece que en un mismo orbital:',
    opciones: [
      'Caben infinitos electrones',
      'Caben máximo 2 electrones, con spines opuestos',
      'Solo cabe 1 electrón',
      'Los electrones tienen el mismo spin'
    ],
    correcta: 1,
    explicacion_correcta: 'Un orbital admite como máximo 2 electrones y deben tener spines opuestos (↑↓).',
    explicacion_incorrectas: ['No caben infinitos.', '', 'Caben hasta 2, no solo 1.', 'Deben tener spines opuestos, no iguales.'],
    imagen: null, formula: null, tags: ['pauli']
  },
  {
    id: 'q-02-023-i', unidad: 2, tema: 'Masa atómica', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La masa atómica relativa que aparece en la tabla periódica es:',
    opciones: [
      'La masa de un solo isótopo',
      'El promedio ponderado de las masas de sus isótopos',
      'El número de protones',
      'La masa del electrón'
    ],
    correcta: 1,
    explicacion_correcta: 'Es el promedio ponderado de las masas de los isótopos según su abundancia en la naturaleza.',
    explicacion_incorrectas: ['No es la de un solo isótopo.', '', 'Eso es el número atómico.', 'El electrón aporta masa despreciable.'],
    imagen: null, formula: null, tags: ['masa-atomica', 'isotopos']
  },

  /* ───────────── AVANZADO (7) ───────────── */
  {
    id: 'q-02-024-a', unidad: 2, tema: 'Configuración electrónica', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La configuración del hierro (Z=26) es 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. ¿Cuántos electrones de valencia (nivel n=4) tiene?',
    opciones: ['6', '2', '8', '4'],
    correcta: 1,
    explicacion_correcta: 'En el nivel más externo (n=4) está 4s², es decir 2 electrones de valencia.',
    explicacion_incorrectas: ['Los 6 del 3d están en el nivel 3, no en el 4.', '', 'No suma 8 en el último nivel.', 'No corresponde.'],
    imagen: null, formula: null, tags: ['config', 'valencia', 'err:e5']
  },
  {
    id: 'q-02-025-a', unidad: 2, tema: 'Iones', nivel: 'avanzado', tipo: 'su',
    pregunta: 'El ion O²⁻ (oxígeno, Z=8) tiene la misma configuración que:',
    opciones: ['El oxígeno neutro', 'El neón (Z=10)', 'El carbono (Z=6)', 'El sodio (Z=11)'],
    correcta: 1,
    explicacion_correcta: 'El O²⁻ ganó 2 electrones: 8+2 = 10, igual que el neón (1s² 2s² 2p⁶). Son isoelectrónicos.',
    explicacion_incorrectas: ['El oxígeno neutro tiene 8 electrones, no 10.', '', 'El carbono tiene 6 electrones.', 'El sodio neutro tiene 11.'],
    imagen: null, formula: null, tags: ['iones', 'isoelectronico']
  },
  {
    id: 'q-02-026-a', unidad: 2, tema: 'Número másico', nivel: 'avanzado', tipo: 'nu',
    pregunta: 'Un átomo tiene número atómico 17 y número másico 35. ¿Cuántos neutrones tiene?',
    opciones: ['17', '35', '18', '52'],
    correcta: 2,
    explicacion_correcta: 'N = A − Z = 35 − 17 = 18 neutrones.',
    explicacion_incorrectas: ['17 es el número de protones (Z).', '35 es el número másico (A).', '', '52 es A + Z, no la resta.'],
    imagen: null, formula: 'N = A − Z', tags: ['calculo', 'neutrones']
  },
  {
    id: 'q-02-027-a', unidad: 2, tema: 'Modelo cuántico', nivel: 'avanzado', tipo: 'su',
    pregunta: '¿En qué se diferencia el modelo cuántico del modelo de Bohr?',
    opciones: [
      'En el cuántico el electrón sigue órbitas circulares fijas',
      'En el cuántico hablamos de orbitales: zonas de probabilidad, no trayectorias exactas',
      'El cuántico elimina a los electrones',
      'No hay ninguna diferencia'
    ],
    correcta: 1,
    explicacion_correcta: 'El modelo cuántico sustituye las órbitas fijas por orbitales: regiones donde es probable encontrar al electrón.',
    explicacion_incorrectas: ['Las órbitas fijas son de Bohr, no del cuántico.', '', 'El cuántico no elimina electrones.', 'Sí hay diferencia fundamental.'],
    imagen: null, formula: null, tags: ['cuantico', 'orbital', 'err:e3']
  },
  {
    id: 'q-02-028-a', unidad: 2, tema: 'Masa atómica', nivel: 'avanzado', tipo: 'nu',
    pregunta: 'Un elemento tiene dos isótopos: 75% de masa 35 y 25% de masa 37. ¿Cuál es su masa atómica relativa aproximada?',
    opciones: ['36.0', '35.5', '37.0', '35.0'],
    correcta: 1,
    explicacion_correcta: '(35 × 0.75) + (37 × 0.25) = 26.25 + 9.25 = 35.5.',
    explicacion_incorrectas: ['No es el promedio simple (36).', '', 'Sería 37 solo si todo fuera el isótopo pesado.', 'Sería 35 solo si todo fuera el ligero.'],
    imagen: null, formula: 'Σ(masa × abundancia)', tags: ['calculo', 'masa-atomica']
  },
  {
    id: 'q-02-029-a', unidad: 2, tema: 'Configuración electrónica', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Un átomo neutro termina su configuración en 3s² 3p⁵. ¿A qué grupo de comportamiento pertenece?',
    opciones: [
      'Gases nobles (capa llena)',
      'Halógenos: le falta 1 electrón para completar el nivel',
      'Metales alcalinos',
      'No se puede saber'
    ],
    correcta: 1,
    explicacion_correcta: 'Con 7 electrones de valencia (3s² 3p⁵), le falta solo 1 para el octeto: es un halógeno, muy reactivo.',
    explicacion_incorrectas: ['Un gas noble tendría 3s² 3p⁶ (octeto completo).', '', 'Un alcalino tendría 1 electrón de valencia.', 'Sí se puede deducir por la valencia.'],
    imagen: null, formula: null, tags: ['valencia', 'octeto']
  },
  {
    id: 'q-02-030-a', unidad: 2, tema: 'Partículas subatómicas', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Si el átomo fuera del tamaño de un estadio, el núcleo sería como una canica al centro. ¿Qué idea ilustra esto?',
    opciones: [
      'El átomo es casi todo espacio vacío',
      'El núcleo es enorme',
      'Los electrones llenan todo el átomo',
      'El átomo es macizo'
    ],
    correcta: 0,
    explicacion_correcta: 'El núcleo es minúsculo frente al átomo: la mayor parte es espacio vacío donde se mueven los electrones.',
    explicacion_incorrectas: ['', 'Es justo lo contrario: el núcleo es diminuto.', 'Los electrones no llenan el espacio; lo recorren.', 'No es macizo: está casi vacío.'],
    imagen: null, formula: null, tags: ['espacio-vacio', 'err:e1']
  }

]; /* FIN PREGUNTAS_U02 — 30 (9 básicas · 14 intermedias · 7 avanzadas) */

window.getBancoU02 = function () { return window.PREGUNTAS_U02.slice(); };
