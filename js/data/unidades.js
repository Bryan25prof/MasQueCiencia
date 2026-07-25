/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/data/unidades.js  |  Fuente Única de Datos de Unidades
   ================================================================
   BUG-02 CORREGIDO: Este archivo reemplaza las definiciones
   duplicadas que existían en home.js (UNITS) y units.js (UNITS_META).

   CONSUMIDORES:
     · js/modules/home.js   → tarjetas del inicio
     · js/modules/units.js  → lista y detalle de unidades

   PARA AGREGAR CONTENIDO EN FASE 1:
     · Ampliar topics[] con objetos { id, titulo, contenido, imagen }
     · Cambiar simulator.status de 'soon' a 'active' al implementarlo
     · El campo exam.questions debe reflejar el banco real al crearlo

   REGLA: Solo se edita este archivo para cambiar datos de unidades.
   Nunca duplicar esta información en otro módulo.
================================================================ */

const UNIDADES_DATA = [

  /* ── UNIDAD 1 ─────────────────────────────────────────── */
  {
    id:      'unit-01',
    num:     '01',
    symbol:  'Mat',
    name:    'Naturaleza de la Materia',
    color:   '#00BCD4',
    icon:    '⚛️',
    desc:    'Clasificación de la materia, mezclas, sustancias puras y propiedades físicas y químicas.',
    /*
      ╔══════════════════════════════════════════════════════════╗
      ║  FASE 1: Convertir cada string a { id, titulo, html }   ║
      ║  para renderizar el contenido teórico completo.         ║
      ╚══════════════════════════════════════════════════════════╝
    */
    /* FASE 1A: temas alineados con el contenido teórico real de js/units/unit-01.js
       (8 temas → ids unit-01-topic-0 … unit-01-topic-7). */
    topics: [
      'La materia y sus propiedades',
      'Estados de la materia y cambios de estado',
      'Propiedades físicas y químicas',
      'Cambios físicos y cambios químicos',
      'Clasificación de la materia: sustancias puras',
      'Mezclas: homogéneas, heterogéneas y coloides',
      'Métodos de separación de mezclas',
      'Sustancias naturales y sintéticas'
    ],
    /* FASE 1A: simuladores implementados (status 'active'); el plugin
       unit-01.js es quien los renderiza realmente en el tab Simuladores. */
    simulators: [
      { id: 'sim-01-01', name: 'Clasificador de la Materia', icon: '🧪', status: 'active' },
      { id: 'sim-01-02', name: 'Estados de la Materia',      icon: '🌡️', status: 'active' },
      { id: 'sim-01-03', name: 'Métodos de Separación',       icon: '🧲', status: 'active' }
    ],
    game: { id: 'game-01', name: 'Detective Químico', icon: '🕵️', status: 'active', levels: 3 },
    /* exam.questions = tamaño del banco; perExam = preguntas por intento; pass = % aprobación */
    exam: { id: 'exam-01', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 2 ─────────────────────────────────────────── */
  {
    id:      'unit-02',
    num:     '02',
    symbol:  'Áto',
    name:    'Estructura Atómica',
    color:   '#1A73E8',
    icon:    '🔬',
    desc:    'Modelos atómicos, partículas subatómicas, números cuánticos y configuración electrónica.',
    experiencia: {
      nombre:    'Explorando el Átomo',
      detonante: 'Si pudieras encoger hasta entrar en un átomo, ¿qué encontrarías… y por qué casi todo sería espacio vacío?',
      mision:    'Conviértete en arquitecto de átomos: descubre de qué están hechos, por qué los electrones se ordenan como lo hacen y cómo eso explica de qué está hecho TODO a tu alrededor.'
    },
    topics: [
      'Historia de los modelos atómicos',
      'Modelo de Bohr y modelo cuántico',
      'Partículas subatómicas (p, n, e⁻)',
      'Números cuánticos (n, l, mₗ, mₛ)',
      'Principio de Aufbau, Hund y Pauli',
      'Configuración electrónica',
      'Iones y su formación',
      'Isótopos y masa atómica relativa'
    ],
    simulators: [
      { id: 'sim-02-01', name: 'Constructor de átomos',     icon: '⚛️', status: 'active' },
      { id: 'sim-02-02', name: 'Modelos atómicos',           icon: '🎞️', status: 'active' },
      { id: 'sim-02-03', name: 'Configuración electrónica',  icon: '🔢', status: 'active' },
      { id: 'sim-02-04', name: 'Niveles de energía',         icon: '⚡', status: 'active' }
    ],
    game: { id: 'game-02', name: 'Construye el átomo', icon: '🧩', status: 'active', levels: 3 },
    exam: { id: 'exam-02', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 3 ─────────────────────────────────────────── */
  {
    id:      'unit-03',
    num:     '03',
    symbol:  'TPe',
    name:    'Tabla Periódica',
    color:   '#00C853',
    icon:    '📊',
    desc:    'Organización, grupos, períodos, subniveles, clasificación y propiedades periódicas.',
    experiencia: {
      nombre:    'El Mapa de los Elementos',
      detonante: 'Más de 100 elementos forman TODO el universo. ¿Por qué caben ordenados en una sola tabla… y qué esconde su forma?',
      mision:    'Conviértete en cartógrafo de la materia: descubre el patrón oculto que ordena los elementos y aprende a predecir cómo se comporta uno con solo mirar dónde está.',
      secuencia: {
        antes:   { texto: 'En la Unidad II aprendiste la configuración electrónica y los electrones de valencia.', unit: 'unit-02', tab: 'teoria' },
        ahora:   'Ahora descubrirás que la FORMA de la tabla nace de esa configuración: períodos, grupos, bloques y tendencias.',
        despues: 'Lo usarás en la Unidad IV para entender por qué los átomos se enlazan y forman compuestos.'
      }
    },
    topics: [
      'Organización general de la Tabla Periódica',
      'Períodos',
      'Grupos o familias',
      'Subniveles de energía (s, p, d, f) y la organización de la tabla',
      'Metales, no metales y metaloides',
      'Propiedades periódicas fundamentales',
      'Relación entre configuración electrónica y posición',
      'Aplicaciones, curiosidades e importancia de la Tabla Periódica'
    ],
    simulators: [
      { id: 'sim-03-01', name: 'Tendencias periódicas',              icon: '📈', status: 'active' },
      { id: 'sim-03-02', name: 'Comparador de radio atómico',        icon: '🔵', status: 'active' },
      { id: 'sim-03-03', name: 'Constructor de la Tabla Periódica',  icon: '🧩', status: 'active' }
    ],
    game: { id: 'game-03', name: '¿Qué elemento soy?', icon: '❓', status: 'active', levels: 3 },
    exam: { id: 'exam-03', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 4 ─────────────────────────────────────────── */
  {
    id:      'unit-04',
    num:     '04',
    symbol:  'Enl',
    name:    'Enlace Químico',
    color:   '#9C27B0',
    icon:    '🔗',
    desc:    'Por qué y cómo se unen los átomos: octeto, Lewis y enlaces iónico, covalente y metálico.',
    experiencia: {
      nombre:    'El Pacto de los Átomos',
      detonante: 'El agua, la sal, tu cuerpo, el metal de tu celular… casi nada existe como átomos sueltos. ¿Qué obliga a los átomos a unirse, y por qué unos lo hacen de una forma y otros de otra?',
      mision:    'Descubre el "pacto" que hace que los átomos se unan para ganar estabilidad, y aprende a predecir —solo con su lugar en la tabla— qué tipo de enlace formarán y qué material resultará.',
      secuencia: {
        antes:   { texto: 'En las Unidades II y III aprendiste los electrones de valencia y la electronegatividad.', unit: 'unit-03', tab: 'teoria' },
        ahora:   'Ahora descubrirás POR QUÉ y CÓMO se unen los átomos, y a predecir si el enlace será iónico, covalente o metálico.',
        despues: { texto: 'Lo usarás en la Unidad V para nombrar los compuestos que estos enlaces forman.', unit: 'unit-05', tab: 'teoria' }
      }
    },
    topics: [
      '¿Por qué se unen los átomos?',
      'Electrones de valencia',
      'La regla del octeto',
      'Estructuras de Lewis',
      'Enlace iónico',
      'Enlace covalente (polar y no polar)',
      'Enlace metálico',
      'Aplicaciones y propiedades'
    ],
    simulators: [
      { id: 'sim-04-01', name: 'Predice el Enlace',     icon: '🔮', status: 'active' },
      { id: 'sim-04-02', name: 'Laboratorio de Lewis',  icon: '⋮',  status: 'active' },
      { id: 'sim-04-03', name: 'Camino al Octeto',      icon: '8️⃣', status: 'active' }
    ],
    game: { id: 'game-04', name: 'Arquitecto de la Materia', icon: '🏛️', status: 'active', levels: 3 },
    exam: { id: 'exam-04', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 5 ─────────────────────────────────────────── */
  {
    id:      'unit-05',
    num:     '05',
    symbol:  'Nom',
    name:    'Nomenclatura Química',
    color:   '#FF6F00',
    icon:    '📝',
    desc:    'El idioma de los compuestos: de las cargas a la fórmula y de la fórmula al nombre.',
    experiencia: {
      nombre:    'El Idioma de los Compuestos',
      detonante: 'La sal, el agua, la herrumbre… cada compuesto tiene un nombre que no es un capricho: es una fórmula disfrazada de palabra. ¿De dónde salen esos nombres, y por qué?',
      mision:    'Aprende a traducir entre nombre y fórmula usando la lógica de las cargas y la regla del cruce, sin memorizar listas.',
      secuencia: {
        antes:   { texto: 'En la Unidad IV aprendiste las cargas iónicas y cómo se unen los átomos.', unit: 'unit-04', tab: 'teoria' },
        ahora:   'Ahora usarás esas cargas para construir fórmulas y nombrarlas correctamente.',
        despues: { texto: 'Con las fórmulas dominadas, en la Unidad VI harás cálculos (estequiometría).', unit: 'unit-06', tab: 'teoria' }
      }
    },
    topics: [
      '¿Por qué existe la nomenclatura?',
      'Número de oxidación (valencia)',
      'Iones: cationes y aniones',
      'La regla del cruce',
      'Compuestos binarios iónicos',
      'Nomenclatura de Stock (números romanos)',
      'Prefijos en compuestos covalentes',
      'Aplicaciones cotidianas'
    ],
    simulators: [
      { id: 'sim-05-01', name: 'Constructor de Fórmulas', icon: '🏗️', status: 'active' },
      { id: 'sim-05-02', name: 'Nombre ↔ Fórmula',        icon: '🔁', status: 'active' },
      { id: 'sim-05-03', name: 'Camino del Ion',           icon: '➕', status: 'active' }
    ],
    game: { id: 'game-05', name: 'Traductor Universal', icon: '🌍', status: 'active', levels: 3 },
    exam: { id: 'exam-05', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 6 ─────────────────────────────────────────── */
  {
    id:      'unit-06',
    num:     '06',
    symbol:  'Est',
    name:    'Estequiometría',
    color:   '#E91E63',
    icon:    '⚖️',
    desc:    'El arte de contar átomos: mol, masa molar, conversiones y proporciones de reacción.',
    experiencia: {
      nombre:    'El Arte de Contar Átomos',
      detonante: 'Un químico necesita una cantidad exacta de una sustancia, pero no puede ver ni contar los átomos uno a uno. ¿Cómo cuenta lo invisible?',
      mision:    'Aprende a contar y pesar la materia con el mol: masa molar, conversiones y proporciones, para predecir cuánto se necesita y cuánto se obtiene.',
      secuencia: {
        antes:   { texto: 'En la Unidad V aprendiste a construir y nombrar fórmulas químicas.', unit: 'unit-05', tab: 'teoria' },
        ahora:   'Ahora usarás esas fórmulas para calcular masas, moles y cantidades en las reacciones.',
        despues: { texto: 'Con el cálculo dominado, en la Unidad VII trabajarás disoluciones y concentraciones.', unit: 'unit-07', tab: 'teoria' }
      }
    },
    topics: [
      '¿Por qué contar átomos?',
      'El mol y el número de Avogadro',
      'Masa molar',
      'Conversión: masa ⇄ mol ⇄ partículas',
      'Composición porcentual',
      'Ecuaciones químicas y balanceo',
      'Relaciones estequiométricas',
      'Aplicaciones'
    ],
    simulators: [
      { id: 'sim-06-01', name: 'La Balanza Molar',       icon: '⚖️', status: 'active' },
      { id: 'sim-06-02', name: 'Conversor mol ⇄ masa',   icon: '🔁', status: 'active' },
      { id: 'sim-06-03', name: 'Balanceador',            icon: '⚗️', status: 'active' }
    ],
    game: { id: 'game-06', name: 'Maestro del Mol', icon: '🧮', status: 'active', levels: 3 },
    exam: { id: 'exam-06', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 7 ─────────────────────────────────────────── */
  {
    id:      'unit-07',
    num:     '07',
    symbol:  'Dis',
    name:    'Disoluciones',
    color:   '#607D8B',
    icon:    '💧',
    desc:    'La química del agua: soluto y disolvente, solubilidad, concentración, molaridad y dilución.',
    experiencia: {
      nombre:    'La Química del Agua',
      detonante: 'El café, el suero, el agua de mar, las bebidas… casi todo lo que tomamos es una disolución. ¿Qué determina cuán fuerte o diluida está?',
      mision:    'Comprende qué es una disolución y aprende a medir su concentración (molaridad y %), prepararla y diluirla.',
      secuencia: {
        antes:   { texto: 'En la Unidad VI aprendiste el mol y la masa molar.', unit: 'unit-06', tab: 'teoria' },
        ahora:   'Ahora usarás el mol para medir concentraciones y preparar disoluciones exactas.',
        despues: { texto: 'Con las disoluciones dominadas, avanzarás a los temas de la Unidad VIII.', unit: 'unit-08', tab: 'teoria' }
      }
    },
    topics: [
      '¿Qué es una disolución?',
      'El agua, el disolvente universal',
      'Solubilidad y saturación',
      'Concentración: diluida y concentrada',
      'Concentración porcentual',
      'Molaridad',
      'Dilución',
      'Aplicaciones'
    ],
    simulators: [
      { id: 'sim-07-01', name: 'Preparador de Disoluciones',    icon: '🧪', status: 'active' },
      { id: 'sim-07-02', name: 'Calculadora de Concentración',  icon: '📊', status: 'active' },
      { id: 'sim-07-03', name: 'Dilución C₁V₁=C₂V₂',            icon: '🚰', status: 'active' }
    ],
    game: { id: 'game-07', name: 'Maestro de las Disoluciones', icon: '🚰', status: 'active', levels: 3 },
    exam: { id: 'exam-07', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 8 ─────────────────────────────────────────── */
  {
    id:      'unit-08',
    num:     '08',
    symbol:  'ÁcB',
    name:    'Ácidos y Bases',
    color:   '#FF5722',
    icon:    '🧪',
    desc:    'Teorías de Arrhenius, Brønsted-Lowry y Lewis. pH, pOH, neutralización e indicadores.',
    experiencia: {
      nombre:    'El Equilibrio Invisible',
      detonante: 'Todo lo que tocas, comes o limpias tiene un equilibrio ácido-base detrás. ¿Puedes verlo?',
      mision:    'Comprender por qué algo es ácido o básico —y cuánto— en vez de solo memorizarlo.',
      secuencia: {
        antes:   { texto: 'En la Unidad VII aprendiste a medir concentraciones (molaridad y dilución).', unit: 'unit-07', tab: 'teoria' },
        ahora:   'Ahora usarás esa misma concentración para calcular pH y entender el equilibrio ácido-base.',
        despues: { texto: 'Lo usarás también en Oxidación-Reducción (Unidad IX).', unit: 'unit-09', tab: 'teoria' }
      }
    },
    topics: [
      'Teoría de Arrhenius',
      'Teoría de Brønsted-Lowry',
      'Teoría de Lewis',
      'Ácidos y bases conjugados',
      'Autoionización del agua (Kw)',
      'pH y pOH',
      'Indicadores ácido-base',
      'Neutralización y titulación',
      'Hidrólisis de sales'
    ],
    simulators: [
      { id: 'sim-08-01', name: 'pH-metro virtual',       icon: '💊', status: 'active' },
      { id: 'sim-08-02', name: 'Titulación ácido-base',  icon: '🧪', status: 'active' },
      { id: 'sim-08-03', name: 'Teorías ácido-base',     icon: '📖', status: 'active' }
    ],
    game: { id: 'game-08', name: '¿Ácido o Base?', icon: '🎲', status: 'active', levels: 3 },
    exam: { id: 'exam-08', questions: 30, perExam: 20, time: 30, pass: 70 }
  },

  /* ── UNIDAD 9 ─────────────────────────────────────────── */
  {
    id:      'unit-09',
    num:     '09',
    symbol:  'OxR',
    name:    'Oxidación y Reducción',
    color:   '#795548',
    icon:    '⚡',
    desc:    'Estados de oxidación, semirreacciones, celdas electroquímicas y electrólisis.',
    experiencia: {
      nombre:    'La Danza de los Electrones',
      detonante: 'El hierro se oxida, una pila enciende una linterna, el aluminio se produce en una planta industrial. ¿Qué tienen en común? Electrones que se mueven de un átomo a otro.',
      mision:    'Comprender quién dona y quién recibe electrones en una reacción, y cómo eso genera electricidad.',
      secuencia: {
        antes:   { texto: 'En la Unidad VIII trabajaste el equilibrio ácido-base y el balance de cargas.', unit: 'unit-08', tab: 'teoria' },
        ahora:   'Ahora seguirás el mismo tipo de balance, pero siguiendo el rastro de los electrones.',
        despues: { texto: 'Con esto completas las 9 unidades del curso.', unit: null, tab: null }
      }
    },
    topics: [
      'Número de oxidación: reglas',
      'Cambios de número de oxidación',
      'Agentes oxidantes y reductores',
      'Semirreacciones de oxidación y reducción',
      'Balanceo por ion-electrón',
      'Balanceo por cambio de oxidación',
      'Celdas electroquímicas (galvánicas)',
      'Electrólisis'
    ],
    simulators: [
      { id: 'sim-09-01', name: 'Calculador Nox',           icon: '🔢', status: 'active' },
      { id: 'sim-09-02', name: 'Celda galvánica virtual',  icon: '⚡', status: 'active' },
      { id: 'sim-09-03', name: 'Balanceo redox',           icon: '⚖️', status: 'active' }
    ],
    game: { id: 'game-09', name: 'Oxidante vs Reductor', icon: '⚡', status: 'active', levels: 3 },
    exam: { id: 'exam-09', questions: 30, perExam: 20, time: 30, pass: 70 }
  }

]; /* FIN DE UNIDADES_DATA */

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  HELPERS DE ACCESO RÁPIDO                                    ║
  ╠══════════════════════════════════════════════════════════════╣
  ║  getUnidadById('unit-01')  → objeto de la unidad            ║
  ║  getUnidades()             → copia del array completo        ║
  ╚══════════════════════════════════════════════════════════════╝
*/

function getUnidadById(id) {
  return UNIDADES_DATA.find(u => u.id === id) || null;
}

function getUnidades() {
  return [...UNIDADES_DATA];
}
