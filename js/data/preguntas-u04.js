/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/preguntas-u04.js  |  Banco de Preguntas — UNIDAD IV
   ================================================================
   Unidad IV "Enlace Químico". 30 preguntas (9 básicas · 14 inter ·
   7 avanzadas). Distractores ligados a errores frecuentes (Insights)
   vía tags:['err:eN']. Mismo esquema que U1/U2/U3.
================================================================ */

window.PREGUNTAS_U04 = [

  /* ───────────── BÁSICO (9) ───────────── */
  {
    id: 'q-04-001-b', unidad: 4, tema: '¿Por qué se unen?', nivel: 'basico', tipo: 'su',
    pregunta: 'Los átomos forman enlaces químicos principalmente para:',
    opciones: ['Aumentar su masa', 'Alcanzar una configuración más estable', 'Cambiar de color', 'Volverse radiactivos'],
    correcta: 1,
    explicacion_correcta: 'Se unen para alcanzar una configuración más estable (la del gas noble más cercano), de menor energía.',
    explicacion_incorrectas: ['La masa no es la razón.', '', 'El color no interviene.', 'El enlace no causa radiactividad.'],
    imagen: null, formula: null, tags: ['estabilidad', 'err:e5']
  },
  {
    id: 'q-04-002-b', unidad: 4, tema: 'Electrones de valencia', nivel: 'basico', tipo: 'su',
    pregunta: 'Los electrones que participan en los enlaces son los de:',
    opciones: ['El núcleo', 'La capa de valencia (última)', 'Los protones', 'Los neutrones'],
    correcta: 1,
    explicacion_correcta: 'Los electrones de valencia (los del último nivel) son los que forman los enlaces.',
    explicacion_incorrectas: ['El núcleo no participa en el enlace.', '', 'Los protones no se enlazan.', 'Los neutrones no intervienen.'],
    imagen: null, formula: null, tags: ['valencia']
  },
  {
    id: 'q-04-003-b', unidad: 4, tema: 'Regla del octeto', nivel: 'basico', tipo: 'su',
    pregunta: 'La regla del octeto dice que muchos átomos tienden a tener en su última capa:',
    opciones: ['2 electrones', '8 electrones', '18 electrones', '0 electrones'],
    correcta: 1,
    explicacion_correcta: 'El octeto: tienden a completar 8 electrones de valencia, como los gases nobles.',
    explicacion_incorrectas: ['El 2 aplica a H y He, no es la regla general.', '', '18 no es el octeto.', 'No buscan quedarse sin electrones.'],
    imagen: null, formula: null, tags: ['octeto', 'err:e2']
  },
  {
    id: 'q-04-004-b', unidad: 4, tema: 'Enlace iónico', nivel: 'basico', tipo: 'su',
    pregunta: 'En el enlace iónico, los electrones se:',
    opciones: ['Comparten', 'Transfieren de un átomo a otro', 'Destruyen', 'Convierten en protones'],
    correcta: 1,
    explicacion_correcta: 'En el iónico hay transferencia: un átomo cede electrones y otro los recibe, formando iones.',
    explicacion_incorrectas: ['Compartir es el covalente.', '', 'Los electrones no se destruyen.', 'No se vuelven protones.'],
    imagen: null, formula: null, tags: ['ionico']
  },
  {
    id: 'q-04-005-b', unidad: 4, tema: 'Enlace covalente', nivel: 'basico', tipo: 'su',
    pregunta: 'En el enlace covalente, los electrones se:',
    opciones: ['Transfieren', 'Comparten entre los átomos', 'Pierden', 'Eliminan'],
    correcta: 1,
    explicacion_correcta: 'En el covalente los átomos comparten uno o más pares de electrones.',
    explicacion_incorrectas: ['Transferir es el iónico.', '', 'No se pierden.', 'No se eliminan.'],
    imagen: null, formula: null, tags: ['covalente', 'err:e1']
  },
  {
    id: 'q-04-006-b', unidad: 4, tema: 'Enlace iónico', nivel: 'basico', tipo: 'su',
    pregunta: 'Un átomo que PIERDE electrones se convierte en un:',
    opciones: ['Anión (carga negativa)', 'Catión (carga positiva)', 'Neutrón', 'Isótopo'],
    correcta: 1,
    explicacion_correcta: 'Al perder electrones queda con carga positiva: es un catión.',
    explicacion_incorrectas: ['El anión gana electrones (negativo).', '', 'No se vuelve neutrón.', 'Eso es otra cosa.'],
    imagen: null, formula: null, tags: ['cation', 'iones']
  },
  {
    id: 'q-04-007-b', unidad: 4, tema: 'Enlace metálico', nivel: 'basico', tipo: 'su',
    pregunta: 'El enlace metálico se describe como un "mar de electrones" porque:',
    opciones: ['Los metales flotan', 'Los electrones de valencia se mueven libremente entre los cationes', 'Tienen agua dentro', 'No tienen electrones'],
    correcta: 1,
    explicacion_correcta: 'En los metales los electrones de valencia quedan libres y se mueven entre los cationes: ese "mar" explica sus propiedades.',
    explicacion_incorrectas: ['No tiene que ver con flotar.', '', 'No contienen agua.', 'Sí tienen electrones.'],
    imagen: null, formula: null, tags: ['metalico']
  },
  {
    id: 'q-04-008-b', unidad: 4, tema: '¿Por qué se unen?', nivel: 'basico', tipo: 'su',
    pregunta: '¿Qué elementos casi NO forman enlaces por ser ya estables?',
    opciones: ['Los metales alcalinos', 'Los gases nobles', 'Los halógenos', 'Los metaloides'],
    correcta: 1,
    explicacion_correcta: 'Los gases nobles ya tienen su capa de valencia completa: por eso casi no forman enlaces.',
    explicacion_incorrectas: ['Los alcalinos son muy reactivos.', '', 'Los halógenos son muy reactivos.', 'Los metaloides sí se enlazan.'],
    imagen: null, formula: null, tags: ['gases-nobles', 'estabilidad']
  },
  {
    id: 'q-04-009-b', unidad: 4, tema: 'Estructuras de Lewis', nivel: 'basico', tipo: 'su',
    pregunta: 'Una estructura de Lewis representa, mediante puntos, los:',
    opciones: ['Protones', 'Neutrones', 'Electrones de valencia', 'Núcleos'],
    correcta: 2,
    explicacion_correcta: 'Las estructuras de Lewis dibujan los electrones de valencia alrededor del símbolo del elemento.',
    explicacion_incorrectas: ['Los protones no se dibujan así.', 'Los neutrones tampoco.', '', 'No representa núcleos.'],
    imagen: null, formula: null, tags: ['lewis']
  },

  /* ───────────── INTERMEDIO (14) ───────────── */
  {
    id: 'q-04-010-i', unidad: 4, tema: 'Electrones de valencia', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Cuántos electrones de valencia tiene un elemento del grupo 16 (representativo)?',
    opciones: ['2', '6', '16', '8'],
    correcta: 1,
    explicacion_correcta: 'En los representativos, el número de valencia coincide con la unidad del grupo: grupo 16 → 6 electrones de valencia.',
    explicacion_incorrectas: ['2 sería el grupo 2.', '', '16 es el número de grupo, no de valencia.', '8 es el octeto completo.'],
    imagen: null, formula: null, tags: ['valencia', 'grupo']
  },
  {
    id: 'q-04-011-i', unidad: 4, tema: 'Tipos de enlace', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un enlace entre un METAL y un NO METAL suele ser:',
    opciones: ['Covalente', 'Iónico', 'Metálico', 'No forma enlace'],
    correcta: 1,
    explicacion_correcta: 'Metal + no metal → enlace iónico (el metal cede electrones y el no metal los toma).',
    explicacion_incorrectas: ['Covalente es entre no metales.', '', 'Metálico es entre metales.', 'Sí forman enlace.'],
    imagen: null, formula: null, tags: ['ionico', 'tipos']
  },
  {
    id: 'q-04-012-i', unidad: 4, tema: 'Tipos de enlace', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un enlace entre dos NO METALES suele ser:',
    opciones: ['Iónico', 'Covalente', 'Metálico', 'Nuclear'],
    correcta: 1,
    explicacion_correcta: 'No metal + no metal → enlace covalente (comparten electrones).',
    explicacion_incorrectas: ['Iónico es metal + no metal.', '', 'Metálico es entre metales.', 'No existe "enlace nuclear" químico.'],
    imagen: null, formula: null, tags: ['covalente', 'tipos']
  },
  {
    id: 'q-04-013-i', unidad: 4, tema: 'Enlace covalente', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un enlace covalente DOBLE comparte:',
    opciones: ['1 par de electrones', '2 pares de electrones', '3 pares de electrones', 'Ningún par'],
    correcta: 1,
    explicacion_correcta: 'Un enlace doble comparte 2 pares (4 electrones) entre los átomos.',
    explicacion_incorrectas: ['Ese es el enlace simple.', '', 'Ese es el triple.', 'Sí comparte pares.'],
    imagen: null, formula: null, tags: ['covalente', 'doble']
  },
  {
    id: 'q-04-014-i', unidad: 4, tema: 'Enlace covalente polar', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un enlace covalente es POLAR cuando los átomos:',
    opciones: ['Tienen igual electronegatividad', 'Tienen distinta electronegatividad', 'Son el mismo elemento', 'No comparten nada'],
    correcta: 1,
    explicacion_correcta: 'Si la electronegatividad difiere, el par compartido se acerca más a un átomo: el enlace es polar.',
    explicacion_incorrectas: ['Igual EN da enlace no polar.', '', 'El mismo elemento da no polar.', 'Sí comparten.'],
    imagen: null, formula: null, tags: ['polar', 'electronegatividad']
  },
  {
    id: 'q-04-015-i', unidad: 4, tema: 'Propiedades', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Por qué la sal (NaCl) NO conduce electricidad en estado sólido pero SÍ disuelta en agua?',
    opciones: [
      'Porque el agua le da electrones',
      'Porque al disolverse los iones quedan libres para moverse',
      'Porque cambia de elemento',
      'Porque el agua es metálica'
    ],
    correcta: 1,
    explicacion_correcta: 'En sólido los iones están fijos; al disolverse quedan libres y pueden transportar carga.',
    explicacion_incorrectas: ['El agua no le aporta electrones.', '', 'No cambia de elemento.', 'El agua no es metálica.'],
    imagen: null, formula: null, tags: ['ionico', 'conductividad', 'err:e3']
  },
  {
    id: 'q-04-016-i', unidad: 4, tema: 'Enlace iónico', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El cloruro de sodio (NaCl) en estado sólido es, en realidad:',
    opciones: ['Una molécula aislada', 'Una red cristalina de iones', 'Un gas', 'Un metal puro'],
    correcta: 1,
    explicacion_correcta: 'NaCl forma una red cristalina enorme de iones Na⁺ y Cl⁻; no son moléculas sueltas.',
    explicacion_incorrectas: ['No es una molécula aislada.', '', 'No es un gas.', 'No es un metal.'],
    imagen: null, formula: null, tags: ['red', 'err:e4']
  },
  {
    id: 'q-04-017-i', unidad: 4, tema: 'Propiedades', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Los metales son buenos conductores eléctricos gracias a:',
    opciones: ['Sus neutrones', 'Sus electrones libres (mar de electrones)', 'Su color', 'Su masa'],
    correcta: 1,
    explicacion_correcta: 'El "mar" de electrones libres del enlace metálico permite que la carga se mueva con facilidad.',
    explicacion_incorrectas: ['Los neutrones no conducen.', '', 'El color no influye.', 'La masa no es la causa.'],
    imagen: null, formula: null, tags: ['metalico', 'conductividad']
  },
  {
    id: 'q-04-018-i', unidad: 4, tema: 'Regla del octeto', nivel: 'intermedio', tipo: 'su',
    pregunta: 'El hidrógeno es estable con ___ electrones, no con 8.',
    opciones: ['2', '4', '6', '10'],
    correcta: 0,
    explicacion_correcta: 'El H (y el He) alcanzan estabilidad con 2 electrones (la del helio): es la excepción al octeto.',
    explicacion_incorrectas: ['', 'No son 4.', 'No son 6.', 'No son 10.'],
    imagen: null, formula: null, tags: ['octeto', 'hidrogeno', 'err:e2']
  },
  {
    id: 'q-04-019-i', unidad: 4, tema: 'Estructuras de Lewis', nivel: 'intermedio', tipo: 'su',
    pregunta: 'En la molécula de agua (H₂O), el oxígeno comparte un par con cada hidrógeno. ¿Qué tipo de enlace es?',
    opciones: ['Iónico', 'Covalente', 'Metálico', 'Ninguno'],
    correcta: 1,
    explicacion_correcta: 'O y H son no metales: comparten electrones → enlace covalente.',
    explicacion_incorrectas: ['No hay transferencia total.', '', 'No hay metales.', 'Sí hay enlace.'],
    imagen: null, formula: null, tags: ['lewis', 'covalente', 'agua']
  },
  {
    id: 'q-04-020-i', unidad: 4, tema: 'Enlace covalente', nivel: 'intermedio', tipo: 'su',
    pregunta: 'La molécula de nitrógeno (N₂) tiene un enlace:',
    opciones: ['Simple', 'Doble', 'Triple', 'Iónico'],
    correcta: 2,
    explicacion_correcta: 'El N tiene 5 electrones de valencia; cada uno necesita 3 más → comparten 3 pares: enlace triple.',
    explicacion_incorrectas: ['No es simple.', 'No es doble.', '', 'No es iónico (dos no metales).'],
    imagen: null, formula: null, tags: ['triple', 'covalente']
  },
  {
    id: 'q-04-021-i', unidad: 4, tema: '¿Por qué se unen?', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Por qué el sodio cede fácilmente su único electrón de valencia?',
    opciones: [
      'Porque así queda con la configuración estable del neón',
      'Porque le gusta el cloro',
      'Porque gana masa',
      'Porque se vuelve gas'
    ],
    correcta: 0,
    explicacion_correcta: 'Al ceder ese electrón, el Na queda con 8 en su nueva última capa (config. del neón): más estable.',
    explicacion_incorrectas: ['', 'No es por "gusto".', 'No gana masa.', 'No se vuelve gas.'],
    imagen: null, formula: null, tags: ['estabilidad', 'err:e5']
  },
  {
    id: 'q-04-022-i', unidad: 4, tema: 'Tipos de enlace', nivel: 'intermedio', tipo: 'su',
    pregunta: 'Un enlace entre dos átomos IGUALES (p. ej. Cl₂) es covalente:',
    opciones: ['Polar', 'No polar', 'Iónico', 'Metálico'],
    correcta: 1,
    explicacion_correcta: 'Misma electronegatividad → comparten por igual → covalente no polar.',
    explicacion_incorrectas: ['Polar requiere EN distinta.', '', 'No es iónico.', 'No es metálico.'],
    imagen: null, formula: null, tags: ['no-polar']
  },
  {
    id: 'q-04-023-i', unidad: 4, tema: 'Aplicaciones', nivel: 'intermedio', tipo: 'su',
    pregunta: '¿Por qué los metales se pueden moldear y estirar (maleables y dúctiles)?',
    opciones: [
      'Porque sus enlaces son rígidos',
      'Porque los cationes pueden deslizarse dentro del mar de electrones',
      'Porque son líquidos',
      'Porque no tienen enlaces'
    ],
    correcta: 1,
    explicacion_correcta: 'El mar de electrones permite que las capas de cationes se deslicen sin romper el enlace.',
    explicacion_incorrectas: ['No son rígidos en ese sentido.', '', 'No son líquidos.', 'Sí tienen enlaces.'],
    imagen: null, formula: null, tags: ['metalico', 'propiedades']
  },

  /* ───────────── AVANZADO (7) ───────────── */
  {
    id: 'q-04-024-a', unidad: 4, tema: 'Predicción de enlace', nivel: 'avanzado', tipo: 'su',
    pregunta: 'Sin memorizar, ¿cómo predeces el tipo de enlace entre dos elementos?',
    opciones: [
      'Por su color',
      'Por su posición en la tabla (metal/no metal) y su diferencia de electronegatividad',
      'Por su masa',
      'Al azar'
    ],
    correcta: 1,
    explicacion_correcta: 'La posición (metal/no metal) y la diferencia de electronegatividad permiten predecir iónico, covalente o metálico.',
    explicacion_incorrectas: ['El color no sirve.', '', 'La masa no decide el enlace.', 'No es al azar.'],
    imagen: null, formula: null, tags: ['prediccion', 'electronegatividad']
  },
  {
    id: 'q-04-025-a', unidad: 4, tema: 'Enlace iónico', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En el MgCl₂, ¿por qué hay DOS cloros por cada magnesio?',
    opciones: [
      'Por simetría',
      'Porque el Mg cede 2 electrones y cada Cl solo acepta 1',
      'Porque el cloro es más pesado',
      'Por casualidad'
    ],
    correcta: 1,
    explicacion_correcta: 'El Mg (grupo 2) cede 2 electrones; cada Cl (grupo 17) acepta 1 → se necesitan 2 cloros.',
    explicacion_incorrectas: ['No es por simetría.', '', 'El peso no decide la fórmula.', 'No es casualidad.'],
    imagen: null, formula: null, tags: ['ionico', 'cargas']
  },
  {
    id: 'q-04-026-a', unidad: 4, tema: 'Enlace covalente polar', nivel: 'avanzado', tipo: 'su',
    pregunta: 'En el enlace H–F, el par compartido se acerca más al flúor porque el F:',
    opciones: ['Es más grande', 'Es mucho más electronegativo', 'Tiene más neutrones', 'Es un metal'],
    correcta: 1,
    explicacion_correcta: 'El F es el más electronegativo: atrae con más fuerza el par compartido → enlace covalente polar.',
    explicacion_incorrectas: ['El F es pequeño.', '', 'Los neutrones no influyen.', 'El F es no metal.'],
    imagen: null, formula: null, tags: ['polar', 'fluor']
  },
  {
    id: 'q-04-027-a', unidad: 4, tema: 'Estructuras de Lewis', nivel: 'avanzado', tipo: 'su',
    pregunta: 'El carbono (grupo 14) forma típicamente 4 enlaces covalentes porque:',
    opciones: [
      'Tiene 4 electrones de valencia y necesita 4 más para el octeto',
      'Es un metal',
      'Tiene 4 protones',
      'Pierde 4 electrones'
    ],
    correcta: 0,
    explicacion_correcta: 'Con 4 electrones de valencia, el C comparte 4 pares para completar el octeto: por eso forma 4 enlaces.',
    explicacion_incorrectas: ['', 'El C es no metal.', 'No se refiere a protones.', 'No los pierde: los comparte.'],
    imagen: null, formula: null, tags: ['lewis', 'carbono']
  },
  {
    id: 'q-04-028-a', unidad: 4, tema: 'Propiedades', nivel: 'avanzado', tipo: 'su',
    pregunta: 'El diamante y el grafito son ambos carbono puro, pero tienen propiedades muy distintas porque cambia:',
    opciones: ['El elemento', 'La forma en que se enlazan los átomos', 'El número de protones', 'La masa atómica'],
    correcta: 1,
    explicacion_correcta: 'Mismo átomo, distinta estructura de enlaces: el enlace y su disposición definen las propiedades.',
    explicacion_incorrectas: ['Es el mismo elemento.', '', 'Mismo número de protones.', 'Misma masa atómica.'],
    imagen: null, formula: null, tags: ['aplicaciones', 'carbono']
  },
  {
    id: 'q-04-029-a', unidad: 4, tema: 'Predicción de enlace', nivel: 'avanzado', tipo: 'su',
    pregunta: '¿Qué par de elementos formaría un enlace MENOS polar?',
    opciones: ['H y F', 'C e H (electronegatividades parecidas)', 'Na y Cl', 'Li y F'],
    correcta: 1,
    explicacion_correcta: 'C e H tienen electronegatividades parecidas → el enlace es casi no polar.',
    explicacion_incorrectas: ['H–F es muy polar.', '', 'Na–Cl es iónico.', 'Li–F es muy iónico.'],
    imagen: null, formula: null, tags: ['polar', 'prediccion']
  },
  {
    id: 'q-04-030-a', unidad: 4, tema: 'Síntesis', nivel: 'avanzado', tipo: 'su',
    pregunta: 'La idea central que conecta TODA la unidad de enlace químico es:',
    opciones: [
      'Los átomos se unen por azar',
      'Los átomos se unen para alcanzar estabilidad, y la diferencia entre ellos decide el tipo de enlace',
      'Todos los enlaces son iguales',
      'El enlace depende del color del átomo'
    ],
    correcta: 1,
    explicacion_correcta: 'Toda la unidad gira en torno a la estabilidad: por qué se unen, y cómo la diferencia entre átomos define iónico/covalente/metálico.',
    explicacion_incorrectas: ['No es azar.', '', 'No son iguales.', 'El color no interviene.'],
    imagen: null, formula: null, tags: ['sintesis', 'estabilidad']
  }

]; /* FIN PREGUNTAS_U04 — 30 (9 · 14 · 7) */

window.getBancoU04 = function () { return window.PREGUNTAS_U04.slice(); };
