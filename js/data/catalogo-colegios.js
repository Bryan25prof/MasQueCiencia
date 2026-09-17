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
   AUDITORÍA FASE 2 — "Catálogo de colegios mono-provincial", decisión
   explícita de Bryan (2026-09-17): NO se construye un catálogo
   detallado (colegio por colegio) para las 6 provincias restantes —
   Heredia sigue siendo la única con catálogo específico, sin tocar.
   En su lugar, cuando un estudiante de otra provincia elige "OTRO
   CENTRO EDUCATIVO", además de escribir el nombre de su colegio
   (texto libre, se sigue guardando igual que siempre en `colegio`,
   NUNCA se agrega a ningún catálogo) ahora también marca su
   PROVINCIA — y Analytics unifica/agrupa esos casos por provincia,
   en vez de dejarlos todos sueltos en un único bucket genérico
   "OTRO" como antes. Ejemplo del propio Bryan: un estudiante del
   "Liceo de Pavas" (San José, no catalogado) marca "San José" — su
   perfil individual sigue mostrando "Liceo de Pavas" como nombre en
   Seguimiento académico, pero en Panorama Global se agrupa junto con
   el resto de San José.

   Estos 7 `school_id` son ESTABLES y representan la provincia como
   bucket completo, no un colegio individual — por eso `school_name`
   es directamente el nombre de la provincia, nunca el texto libre
   que escriba cada estudiante (eso evita el mismo problema que
   motivó todo este catálogo: si el nombre mostrado dependiera del
   texto libre, cada variante de escritura volvería a fragmentar el
   conteo, esta vez a nivel de provincia). */
const PROVINCIAS_SIN_CATALOGO = [
  { school_id: 'OTHER_SANJOSE',    school_name: 'San José',   school_region: 'San José' },
  { school_id: 'OTHER_ALAJUELA',   school_name: 'Alajuela',   school_region: 'Alajuela' },
  { school_id: 'OTHER_CARTAGO',    school_name: 'Cartago',    school_region: 'Cartago' },
  { school_id: 'OTHER_HEREDIA',    school_name: 'Heredia',    school_region: 'Heredia' },
  { school_id: 'OTHER_GUANACASTE', school_name: 'Guanacaste', school_region: 'Guanacaste' },
  { school_id: 'OTHER_PUNTARENAS', school_name: 'Puntarenas', school_region: 'Puntarenas' },
  { school_id: 'OTHER_LIMON',      school_name: 'Limón',      school_region: 'Limón' }
];

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
/* Busca en el catálogo detallado de Heredia PRIMERO, y si no aparece
   ahí, en las 7 provincias-bucket — así todo el resto del código
   (selector de colegio, panel de Analytics) sigue usando un único
   punto de búsqueda sin necesidad de saber cuál de las dos listas
   corresponde. */
function buscarColegioPorId(schoolId) {
  return CATALOGO_COLEGIOS.find(c => c.school_id === schoolId) ||
         PROVINCIAS_SIN_CATALOGO.find(p => p.school_id === schoolId) || null;
}

/* ================================================================
   AUDITORÍA FASE 2 — "Bandeja de excepciones de colegios" (hallazgo
   de MQC_AUDITORIA_INTEGRAL_DIAGNOSTICO.md, sección 10: "todavía no
   es una bandeja de excepciones" — la pantalla de administración
   listaba CADA nombre legacy por igual, sin distinguir los casos ya
   resolubles automáticamente de los genuinamente ambiguos).

   Coincidencia EXACTA tras normalizar contra el nombre OFICIAL del
   catálogo — distinta de un alias ya confirmado a mano en
   ALIAS_COLEGIOS_CONOCIDOS: cubre el caso simple de un estudiante que
   escribió el nombre real del colegio pero con mayúsculas/espacios
   distintos (ej. "liceo de heredia" → "Liceo de Heredia", HER_LDH).
   Regla explícita de la Fase 2: NUNCA similitud difusa, solo
   coincidencia exacta tras normalizar — igual que ALIAS_COLEGIOS_CONOCIDOS. */
function buscarSchoolIdPorNombreExacto(textoLibre) {
  const norm = normalizarNombreColegio(textoLibre);
  if (!norm) return null;
  const match = CATALOGO_COLEGIOS.find(c => normalizarNombreColegio(c.school_name) === norm);
  return match ? match.school_id : null;
}

/* Punto único de pre-resolución automática (sin similitud difusa):
   primero un alias ya confirmado a mano, luego coincidencia exacta
   normalizada contra el catálogo oficial. Usado por la bandeja de
   excepciones de colegios para decidir qué nombres legacy puede
   resolver solo con un clic de confirmación, y cuáles requieren que
   el docente elija a mano por ser genuinamente ambiguos. */
function preResolverSchoolId(textoLibre) {
  return buscarSchoolIdPorAlias(textoLibre) || buscarSchoolIdPorNombreExacto(textoLibre);
}
