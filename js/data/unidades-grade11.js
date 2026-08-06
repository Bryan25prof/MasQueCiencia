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
    status: 'development',
    theory: null,
    simulators: null,
    game: null,
    exam: null,
    mqcExperience: null,
    pneBank: null
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
    status: 'development',
    /* El contenido posterior usará material propio aportado por el
       autor — no se inventa contenido académico en esta fase. */
    theory: null,
    simulators: null,
    game: null,
    exam: null,
    mqcExperience: null,
    pneBank: null
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
