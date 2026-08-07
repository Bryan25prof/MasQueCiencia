/* ================================================================
   MÁSQUECIENCIA — js/data/unidades-grade11.js
   Metadata de las 4 unidades de Química 11.º (Fase 1 — Multigrado)
   ================================================================
   TODAS en estado "development" — sin teoría, simuladores, juego ni
   examen todavía. Esta metadata existe para que la vista de Química
   11.º pueda renderizar tarjetas reales y para que, cuando cada
   unidad se desarrolle, tenga ya un lugar consistente donde encajar
   (mismo patrón que js/data/unidades.js usa para las 9 de décimo).

   Convención de IDs: 'g11-u01'..'g11-u04' — nunca 'unit-0X' (esas ya
   pertenecen a Química 10.º). Elegida por ser la más corta de las dos
   sugeridas y la más fácil de diferenciar a simple vista de 'unit-0X'
   en el código (evita cualquier confusión visual entre grados).
================================================================ */
window.GRADE11_UNIDADES_DATA = [
  {
    id: 'g11-u01',
    grade: 11,
    num: 1,
    title: 'El Agua',
    shortName: 'El Agua',
    description: 'Propiedades, comportamiento e importancia química del agua.',
    color: '#1FDBFF',
    icon: '💧',
    status: 'active',
    /* IMP-11-U01: estructura real, ya no placeholder.
       6 temas (indicadores de evaluación 1-4 del planeamiento oficial),
       3 simuladores, 1 juego de rondas (sin niveles discretos — el
       cálculo de progreso usa el respaldo "gameScore>0" ya existente
       en _computePct/_computePctG11, igual que otras unidades sin
       niveles), examen de banco 30/intento 20, aprobación 70% (mismo
       criterio central que toda la plataforma, sin regla paralela). */
    topics: [
      'El agua y la vida',
      'Así está construida H₂O',
      'Por qué el agua es polar',
      'Enlace químico vs. fuerza intermolecular',
      '¿Qué se disuelve en agua?',
      'Cuando el agua transporta contaminación'
    ],
    simulators: [
      { id: 'sim-g11u1-01', name: 'Arquitectura de H₂O', status: 'active' },
      { id: 'sim-g11u1-02', name: 'Dentro y entre moléculas', status: 'active' },
      { id: 'sim-g11u1-03', name: 'Laboratorio de solubilidad', status: 'active' }
    ],
    game: { name: 'Guardianes de la Cuenca', levels: 0 },
    exam: { id: 'exam-g11-u01', questions: 30, perExam: 20, time: 25, pass: 70 },
    mqcExperience: 'Informe de la primera muestra',
    pneBank: 'BANCO_PNE_G11_U01'
  },
  {
    id: 'g11-u02',
    grade: 11,
    num: 2,
    title: 'Cálculo de concentraciones',
    shortName: 'Concentraciones',
    description: 'Representación y cálculo cuantitativo de disoluciones.',
    color: '#7B2FFF',
    icon: '⚗️',
    status: 'active',
    /* IMP-11-U02: estructura real, ya no placeholder. 7 temas
       (indicadores 1-3 del planeamiento oficial), 3 simuladores
       (reutilizan MQCChem para todos los cálculos), 1 juego de
       rondas, examen de banco 40/intento 20, aprobación 70% (mismo
       criterio central de toda la plataforma). */
    topics: [
      '¿Qué significa concentración?',
      'Porcentaje masa/masa (% m/m)',
      'Porcentaje masa/volumen (% m/v)',
      'Porcentaje volumen/volumen (% v/v)',
      'Molaridad',
      'Partes por millón (ppm)',
      'Del resultado a la decisión'
    ],
    simulators: [
      { id: 'sim-g11u2-01', name: 'Constructor de Concentraciones', status: 'active' },
      { id: 'sim-g11u2-02', name: 'Laboratorio de Molaridad', status: 'active' },
      { id: 'sim-g11u2-03', name: 'Analista de Agua en ppm', status: 'active' }
    ],
    game: { name: 'Código de la Muestra', levels: 0 },
    exam: { id: 'exam-g11-u02', questions: 40, perExam: 20, time: 30, pass: 70 },
    mqcExperience: 'Informe cuantitativo de la muestra',
    pneBank: 'BANCO_PNE_G11_U02'
  },
  {
    id: 'g11-u03',
    grade: 11,
    num: 3,
    title: 'Química Orgánica I',
    shortName: 'Orgánica I',
    subtitle: 'Introducción, alcanos, alquenos y alquinos',
    description: 'Introducción a los compuestos orgánicos y nomenclatura básica de alcanos.',
    color: '#5CF2A8',
    icon: '⬡',
    status: 'active',
    /* IMP-11-U03: estructura real, ya no placeholder. 7 temas, 3
       simuladores (reutilizan MQCChem.alkaneFormula/alkeneFormula/
       alkyneFormula), examen de banco 40/intento 20, aprobación 70%. */
    topics: [
      '¿Por qué existe la Química Orgánica?',
      'El carbono',
      'Alcanos',
      'Alquenos',
      'Alquinos',
      'Cómo nombrar alcanos',
      'Identificando un contaminante'
    ],
    simulators: [
      { id: 'sim-g11u3-01', name: 'Constructor Molecular', status: 'active' },
      { id: 'sim-g11u3-02', name: 'Laboratorio de Enlaces', status: 'active' },
      { id: 'sim-g11u3-03', name: 'Detector Orgánico', status: 'active' }
    ],
    game: { name: 'Misión Carbono', levels: 0 },
    exam: { id: 'exam-g11-u03', questions: 40, perExam: 20, time: 30, pass: 70 },
    mqcExperience: 'Identificando el contaminante',
    pneBank: 'BANCO_PNE_G11_U03'
  },
  {
    id: 'g11-u04',
    grade: 11,
    num: 4,
    title: 'Grupos funcionales y biomoléculas',
    shortName: 'Biomoléculas',
    description: 'Reconocimiento de grupos funcionales y relación entre química orgánica y sistemas biológicos.',
    color: '#FFA94D',
    icon: '🧬',
    status: 'development',
    theory: null,
    simulators: null,
    game: null,
    exam: null,
    mqcExperience: null,
    pneBank: null
  }
];
