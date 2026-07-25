/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u08.js  |  Banco PNE — UNIDAD VIII
   ================================================================
   Variantes ADAPTADAS (lenguaje simple, frases cortas) de las 30
   preguntas. Mismo id; "correcta" coherente. Cobertura 30/30.
================================================================ */

window.BANCO_PNE_U08 = {
  /* BÁSICO */
  'q-08-001-b': { pregunta: '¿Qué libera un ácido en agua, según Arrhenius?',
    opciones: ['Iones OH⁻', 'Iones H⁺', 'Electrones sueltos', 'Neutrones'],
    correcta: 1, explicacion_correcta: 'El ácido libera H⁺ en agua.',
    explicacion_incorrectas: ['Eso es de las bases.', '', 'No.', 'No.'] },

  'q-08-002-b': { pregunta: '¿Qué libera una base en agua, según Arrhenius?',
    opciones: ['Iones H⁺', 'Iones OH⁻', 'Protones', 'Solo metales'],
    correcta: 1, explicacion_correcta: 'La base libera OH⁻ en agua.',
    explicacion_incorrectas: ['Eso es de los ácidos.', '', 'Los protones son de ácidos.', 'No.'] },

  'q-08-003-b': { pregunta: 'Para Brønsted-Lowry, un ácido es quien…',
    opciones: ['Recibe un protón', 'Da un protón', 'Da electrones', 'Recibe electrones'],
    correcta: 1, explicacion_correcta: 'El ácido DA el protón (H⁺).',
    explicacion_incorrectas: ['Recibir es la base.', '', 'No es esto.', 'No es esto.'] },

  'q-08-004-b': { pregunta: 'Para Brønsted-Lowry, una base es quien…',
    opciones: ['Da un protón', 'Recibe un protón', 'Da electrones', 'Siempre tiene OH⁻'],
    correcta: 1, explicacion_correcta: 'La base RECIBE el protón (H⁺).',
    explicacion_incorrectas: ['Dar es el ácido.', '', 'No es esto.', 'No siempre tiene OH⁻.'] },

  'q-08-005-b': { pregunta: 'Para Lewis, un ácido es quien…',
    opciones: ['Recibe un par de electrones', 'Da un par de electrones', 'Libera H⁺', 'Libera OH⁻'],
    correcta: 0, explicacion_correcta: 'El ácido de Lewis RECIBE electrones.',
    explicacion_incorrectas: ['', 'Eso es base de Lewis.', 'Eso es Arrhenius.', 'Eso es Arrhenius (base).'] },

  'q-08-006-b': { pregunta: '¿Cuál es la fórmula del pH?',
    opciones: ['pH = log[H⁺]', 'pH = −log[H⁺]', 'pH = [H⁺] × 14', 'pH = 14 − [H⁺]'],
    correcta: 1, explicacion_correcta: 'pH = −log[H⁺] (con signo negativo).',
    explicacion_incorrectas: ['Falta el signo negativo.', '', 'No es multiplicar.', 'No es restar así.'] },

  'q-08-007-b': { pregunta: '¿Qué valor de pH es neutro?',
    opciones: ['0', '7', '14', '100'],
    correcta: 1, explicacion_correcta: 'pH = 7 es neutro.',
    explicacion_incorrectas: ['Eso es muy ácido.', '', 'Eso es muy básico.', 'La escala no llega ahí.'] },

  'q-08-008-b': { pregunta: '¿Cuánto vale Kw a 25 °C?',
    opciones: ['1×10⁻⁷', '1×10⁻¹⁴', '7', '14'],
    correcta: 1, explicacion_correcta: 'Kw = 1×10⁻¹⁴.',
    explicacion_incorrectas: ['Ese es [H⁺] del agua pura.', '', 'Ese es el pH del agua.', 'Esa es la suma pH+pOH.'] },

  'q-08-009-b': { pregunta: '¿Para qué sirve un indicador ácido-base?',
    opciones: ['Cambia el pH', 'Muestra el pH con un color', 'Sube el H⁺', 'Neutraliza todo'],
    correcta: 1, explicacion_correcta: 'Muestra el pH cambiando de color.',
    explicacion_incorrectas: ['No cambia el pH.', '', 'No sube el H⁺.', 'No neutraliza por sí solo.'] },

  'q-08-010-b': { pregunta: '¿Qué se forma al neutralizar un ácido con una base?',
    opciones: ['Sal y agua', 'Solo agua', 'Solo sal', 'Un ácido nuevo'],
    correcta: 0, explicacion_correcta: 'Se forma sal y agua.',
    explicacion_incorrectas: ['', 'También hay sal.', 'También hay agua.', 'No se forma otro ácido.'] },

  /* INTERMEDIO */
  'q-08-011-i': { pregunta: 'En NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, ¿qué hace el agua?',
    opciones: ['Da un protón (ácido)', 'Recibe un protón (base)', 'Es ácido de Lewis', 'No hace nada'],
    correcta: 0, explicacion_correcta: 'El agua DA el protón: actúa como ácido aquí.',
    explicacion_incorrectas: ['', 'Eso lo hace el NH₃.', 'Aquí es Brønsted-Lowry.', 'Sí participa.'] },

  'q-08-012-i': { pregunta: '¿Cuál es la base conjugada del HCl?',
    opciones: ['H⁺', 'Cl⁻', 'HCl₂', 'H₂Cl'],
    correcta: 1, explicacion_correcta: 'Al perder H⁺, queda Cl⁻.',
    explicacion_incorrectas: ['Ese es el protón donado.', '', 'No existe.', 'No existe.'] },

  'q-08-013-i': { pregunta: '¿Qué se forma cuando el agua RECIBE un protón?',
    opciones: ['OH⁻', 'H₃O⁺', 'H₂', 'O²⁻'],
    correcta: 1, explicacion_correcta: 'Se forma H₃O⁺ (ion hidronio).',
    explicacion_incorrectas: ['Eso pasa si el agua DA el protón.', '', 'No corresponde.', 'No corresponde.'] },

  'q-08-014-i': { pregunta: 'Si el pH es 4, ¿cuánto es el pOH?',
    opciones: ['4', '7', '10', '14'],
    correcta: 2, explicacion_correcta: '14 − 4 = 10.',
    explicacion_incorrectas: ['Confunde pH con pOH.', 'No es este cálculo.', '', 'Ese es pH+pOH, no el pOH solo.'] },

  'q-08-015-i': { pregunta: 'Si [H⁺] = 1×10⁻³ M, ¿cuál es el pH?',
    opciones: ['3', '−3', '11', '1×10⁻³'],
    correcta: 0, explicacion_correcta: 'pH = −log(1×10⁻³) = 3.',
    explicacion_incorrectas: ['', 'No lleva signo negativo así.', 'Eso sería el pOH.', 'Eso es la concentración, no el pH.'] },

  'q-08-016-i': { pregunta: '¿Qué es el punto de equivalencia en una titulación?',
    opciones: ['Cuando se acaba el indicador', 'Cuando ácido y base reaccionaron en cantidad exacta', 'Cuando el pH siempre es 7', 'Cuando se usa el doble de base'],
    correcta: 1, explicacion_correcta: 'Es cuando reaccionaron en la cantidad exacta.',
    explicacion_incorrectas: ['El indicador no se "acaba".', '', 'Solo es 7 si ambos son fuertes.', 'No siempre es el doble.'] },

  'q-08-017-i': { pregunta: 'Titulando ácido fuerte con base fuerte, el pH en la equivalencia es cerca de…',
    opciones: ['3', '7', '10', '14'],
    correcta: 1, explicacion_correcta: 'Con ambos fuertes, el punto de equivalencia es pH 7.',
    explicacion_incorrectas: ['Muy ácido para este caso.', '', 'Muy básico para este caso.', 'Muy extremo para este caso.'] },

  'q-08-018-i': { pregunta: 'El bicarbonato de sodio disuelto en agua da una solución…',
    opciones: ['Ácida', 'Neutra', 'Ligeramente básica', 'Muy básica'],
    correcta: 2, explicacion_correcta: 'Es ligeramente básica (viene de ácido débil + base fuerte).',
    explicacion_incorrectas: ['No es ácida.', 'No es exactamente neutra.', '', 'No es extremadamente básica.'] },

  'q-08-019-i': { pregunta: 'La sal NH₄Cl (ácido fuerte + base débil) en agua da una solución…',
    opciones: ['Ácida', 'Básica', 'Siempre neutra', 'Depende del color'],
    correcta: 0, explicacion_correcta: 'Da una solución ácida.',
    explicacion_incorrectas: ['', 'No es básica aquí.', 'No es neutra.', 'El color solo lo muestra, no lo decide.'] },

  'q-08-020-i': { pregunta: '¿Por qué el BF₃ puede ser ácido sin tener hidrógenos?',
    opciones: ['Libera H⁺', 'Recibe un par de electrones', 'Da electrones', 'Es base de Arrhenius'],
    correcta: 1, explicacion_correcta: 'Por Lewis, solo necesita recibir electrones.',
    explicacion_incorrectas: ['No tiene H⁺.', '', 'Dar electrones es base de Lewis.', 'No corresponde.'] },

  'q-08-021-i': { pregunta: 'La fenolftaleína es rosada en medio…',
    opciones: ['Ácido', 'Básico', 'Solo neutro', 'Nunca cambia'],
    correcta: 1, explicacion_correcta: 'Se pone rosada en medio básico.',
    explicacion_incorrectas: ['En ácido es incolora.', '', 'No es exactamente en el neutro.', 'Sí cambia.'] },

  'q-08-022-i': { pregunta: 'Si [OH⁻] = 1×10⁻² M, ¿cuál es el pH aproximado?',
    opciones: ['2', '12', '14', '−2'],
    correcta: 1, explicacion_correcta: 'pOH=2, entonces pH=14−2=12.',
    explicacion_incorrectas: ['Ese es el pOH.', '', 'No es Kw.', 'No es negativo.'] },

  /* AVANZADO */
  'q-08-023-a': { pregunta: '¿Cuál es la relación correcta entre las tres teorías?',
    opciones: ['Lewis dentro de Brønsted dentro de Arrhenius', 'Arrhenius dentro de Brønsted dentro de Lewis', 'Las tres son iguales', 'Brønsted dentro de Arrhenius dentro de Lewis'],
    correcta: 1, explicacion_correcta: 'Arrhenius es la más chica; Lewis, la más amplia.',
    explicacion_incorrectas: ['El orden está al revés.', '', 'No son iguales.', 'El orden no es correcto.'] },

  'q-08-024-a': { pregunta: 'En CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺, ¿cuál es el par conjugado del ácido acético?',
    opciones: ['CH₃COOH / H₃O⁺', 'CH₃COOH / CH₃COO⁻', 'H₂O / OH⁻', 'CH₃COO⁻ / H₃O⁺'],
    correcta: 1, explicacion_correcta: 'El ácido y su base conjugada forman el par.',
    explicacion_incorrectas: ['Ese es otro par (del agua).', '', 'Ese par es del agua.', 'Mezcla especies de pares distintos.'] },

  'q-08-025-a': { pregunta: 'En agua pura a 25 °C, ¿cuánto vale [H⁺]?',
    opciones: ['1×10⁻¹⁴ M', '1×10⁻⁷ M', '7 M', '14 M'],
    correcta: 1, explicacion_correcta: '[H⁺] = 1×10⁻⁷ M en agua pura.',
    explicacion_incorrectas: ['Ese es Kw.', '', 'Ese es el pH, no la concentración.', 'No corresponde.'] },

  'q-08-026-a': { pregunta: '25 mL de HCl 0.1 M se titulan con NaOH 0.1 M. ¿Cuántos mL de NaOH se necesitan?',
    opciones: ['12.5 mL', '25 mL', '50 mL', '100 mL'],
    correcta: 1, explicacion_correcta: 'Igual concentración → igual volumen: 25 mL.',
    explicacion_incorrectas: ['No coincide con 1:1.', '', 'No es el doble.', 'Demasiado.'] },

  'q-08-027-a': { pregunta: 'La sal NaCl (ácido fuerte + base fuerte) en agua da una solución…',
    opciones: ['Ácida', 'Básica', 'Neutra', 'Depende del indicador'],
    correcta: 2, explicacion_correcta: 'Es neutra: ninguno de los dos hidroliza.',
    explicacion_incorrectas: ['No es ácida.', 'No es básica.', '', 'El pH no depende del indicador.'] },

  'q-08-028-a': { pregunta: 'El HCO₃⁻ puede actuar como ácido o base según la reacción. ¿Cómo se llama esto?',
    opciones: ['Anfótera', 'Inerte', 'Siempre neutra', 'No reactiva'],
    correcta: 0, explicacion_correcta: 'Se llama sustancia anfótera (o anfiprótica).',
    explicacion_incorrectas: ['', 'Sí reacciona.', 'No siempre es neutra.', 'Sí es reactiva.'] },

  'q-08-029-a': { pregunta: 'Si el pH sube de 3 a 5, ¿qué le pasa a [H⁺]?',
    opciones: ['Sube 2 veces', 'Baja 100 veces', 'Sube 100 veces', 'No cambia'],
    correcta: 1, explicacion_correcta: 'Cada unidad de pH es factor 10: 2 unidades = 100 veces menos [H⁺].',
    explicacion_incorrectas: ['No es un cambio lineal.', '', 'Baja, no sube, al subir el pH.', 'Sí cambia mucho.'] },

  'q-08-030-a': { pregunta: 'Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺. ¿Qué teoría explica mejor esta reacción?',
    opciones: ['Arrhenius', 'Brønsted-Lowry', 'Lewis', 'Ninguna'],
    correcta: 2, explicacion_correcta: 'No hay H⁺ ni OH⁻; el Ag⁺ recibe electrones del NH₃: es Lewis.',
    explicacion_incorrectas: ['No hay H⁺ ni OH⁻ aquí.', 'No hay protón transferido.', '', 'Sí la explica Lewis.'] }
};
