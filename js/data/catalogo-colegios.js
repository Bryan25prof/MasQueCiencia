/* ================================================================
   MÁSQUECIENCIA — js/data/catalogo-colegios.js
   ================================================================
   Catálogo canónico de centros educativos — Dirección Regional de
   Heredia (versión inicial). Cada colegio tiene un school_id
   ESTABLE (no cambia aunque se ajuste el nombre visible más
   adelante) — es lo que realmente identifica al centro educativo,
   nunca el texto libre que el estudiante escriba.

   Ampliable a otras regiones más adelante (Alajuela, San José,
   Cartago, etc.) — por ahora solo Heredia, tal como pide el sprint.
================================================================ */
const CATALOGO_COLEGIOS = [
  { school_id: 'HER_LDH',   school_name: 'Liceo de Heredia', school_region: 'Heredia' },
  { school_id: 'HER_LIMBR', school_name: 'Liceo Ingeniero Manuel Benavides Rodríguez', school_region: 'Heredia' },
  { school_id: 'HER_LISSF', school_name: 'Liceo Ing. Samuel Sáenz Flores', school_region: 'Heredia' },
  { school_id: 'HER_LLAG',  school_name: 'Liceo Los Lagos', school_region: 'Heredia' },
  { school_id: 'HER_LSD',   school_name: 'Liceo Santo Domingo', school_region: 'Heredia' },
  { school_id: 'HER_LNSD',  school_name: 'Liceo Nuevo de Santo Domingo de Heredia', school_region: 'Heredia' },
  { school_id: 'HER_LSB',   school_name: 'Liceo de Santa Bárbara', school_region: 'Heredia' },
  { school_id: 'HER_LSIH',  school_name: 'Liceo San Isidro de Heredia', school_region: 'Heredia' },
  { school_id: 'HER_LSJM',  school_name: 'Liceo San José de la Montaña', school_region: 'Heredia' },
  { school_id: 'HER_LMVS',  school_name: 'Liceo Mario Vindas Salazar', school_region: 'Heredia' },
  { school_id: 'HER_LRHV',  school_name: 'Liceo Rodrigo Hernández Vargas', school_region: 'Heredia' },
  { school_id: 'HER_LRF',   school_name: 'Liceo Regional de Flores', school_region: 'Heredia' },
  { school_id: 'HER_LICPZ', school_name: 'Liceo Ing. Carlos Pascua Zúñiga', school_region: 'Heredia' },
  { school_id: 'HER_LEBB',  school_name: 'Liceo Experimental Bilingüe de Belén', school_region: 'Heredia' },
  { school_id: 'HER_UPLR',  school_name: 'Unidad Pedagógica Liceo El Roble', school_region: 'Heredia' },
  { school_id: 'HER_CCAST', school_name: 'Conservatorio de Castella', school_region: 'Heredia' },
  { school_id: 'HER_CCLAR', school_name: 'Colegio Claretiano', school_region: 'Heredia' },
  { school_id: 'HER_CSMG',  school_name: 'Colegio Santa María de Guadalupe', school_region: 'Heredia' },
  { school_id: 'HER_CTPH',  school_name: 'CTP de Heredia', school_region: 'Heredia' },
  { school_id: 'HER_CTPE',  school_name: 'CTP del Este', school_region: 'Heredia' },
  { school_id: 'HER_CTPF',  school_name: 'CTP de Flores', school_region: 'Heredia' },
  { school_id: 'HER_CTPU',  school_name: 'CTP Ulloa', school_region: 'Heredia' },
  { school_id: 'HER_CTPSPB',school_name: 'CTP de San Pedro de Barva', school_region: 'Heredia' },
  { school_id: 'HER_CTPMN', school_name: 'CTP Mercedes Norte', school_region: 'Heredia' },
  { school_id: 'HER_CNCMC', school_name: 'Colegio Nocturno Carlos Meléndez Chaverri', school_region: 'Heredia' },
  { school_id: 'HER_CNHLH', school_name: 'Colegio Nocturno Hermán López Hernández', school_region: 'Heredia' },
  { school_id: 'HER_LNAGF', school_name: 'Liceo Nocturno Alfredo González Flores', school_region: 'Heredia' },
  { school_id: 'HER_IPECB', school_name: 'IPEC de Barva', school_region: 'Heredia' },
  { school_id: 'HER_IPECSD',school_name: 'IPEC Santo Domingo', school_region: 'Heredia' }
];

/* school_id reservado para "el centro educativo no está en la lista" —
   ver Parte 5 del sprint. Nunca se agrega texto libre al catálogo
   oficial automáticamente. */
const SCHOOL_ID_OTRO = 'OTHER';

/* ================================================================
   Parte 8 del sprint — alias legacy CONOCIDOS y confiables (revisados
   a mano). Regla explícita: NO matching agresivo por similitud, solo
   normalizar variantes ya confirmadas manualmente. La clave va en
   minúsculas y sin espacios extra (ver normalizarNombreColegio).
   Se usa para SUGERIR una unificación (nunca para reasignar solo)
   tanto en el modal de actualización del estudiante como en la
   herramienta "Gestión de Colegios" del panel docente.
================================================================ */
const ALIAS_COLEGIOS_CONOCIDOS = {
  'liceo ing. manuel benavides r.': 'HER_LIMBR',
  'liceo ing manuel benavides r':   'HER_LIMBR',
  'manuel benavides':               'HER_LIMBR',
  'liceo ing manuel benavidez':     'HER_LIMBR',
  'liceo ing. manuel benavidez':    'HER_LIMBR',
  'liceo manuel benavides':         'HER_LIMBR',
  'liceo. ing manuel benavides r':  'HER_LIMBR'
};

function normalizarNombreColegio(texto) {
  return (texto || '').toLowerCase().trim().replace(/\s+/g, ' ');
}
function buscarSchoolIdPorAlias(textoLibre) {
  return ALIAS_COLEGIOS_CONOCIDOS[normalizarNombreColegio(textoLibre)] || null;
}
function buscarColegioPorId(schoolId) {
  return CATALOGO_COLEGIOS.find(c => c.school_id === schoolId) || null;
}
