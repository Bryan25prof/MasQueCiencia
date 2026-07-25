/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/data/banco-pne-u02.js  |  Banco PNE — UNIDAD II
   ================================================================
   Variantes ADAPTADAS de las 30 preguntas (lenguaje simple, frases
   cortas, opciones claras, explicación de una línea). Mismo id que el
   banco estándar; mismo nº de opciones e índice "correcta" coherente.
   PNEBank.present() sirve estas versiones cuando el estudiante activa
   el "modo simplificado" (♿). Si una pregunta no tuviera variante, se
   usa la estándar automáticamente.
================================================================ */

window.BANCO_PNE_U02 = {
  /* BÁSICO */
  'q-02-001-b': { pregunta: '¿Qué partícula tiene carga negativa (−)?',
    opciones: ['Protón (+)', 'Neutrón (0)', 'Electrón (−)', 'Núcleo'],
    correcta: 2, explicacion_correcta: 'El electrón es la partícula con carga negativa.',
    explicacion_incorrectas: ['El protón es positivo.', 'El neutrón no tiene carga.', '', 'El núcleo no es una partícula.'] },

  'q-02-002-b': { pregunta: '¿Dónde están los protones y los neutrones?',
    opciones: ['En las órbitas', 'En el núcleo (centro)', 'Afuera del átomo', 'En los electrones'],
    correcta: 1, explicacion_correcta: 'Están juntos en el núcleo, en el centro del átomo.',
    explicacion_incorrectas: ['En las órbitas están los electrones.', '', 'Están dentro, no afuera.', 'No están en los electrones.'] },

  'q-02-003-b': { pregunta: 'El número atómico (Z) cuenta los…',
    opciones: ['Neutrones', 'Protones', 'Electrones de afuera', 'Niveles'],
    correcta: 1, explicacion_correcta: 'Z = número de protones. Identifica al elemento.',
    explicacion_incorrectas: ['Los neutrones se cuentan aparte.', '', 'No cuenta la valencia.', 'No cuenta los niveles.'] },

  'q-02-004-b': { pregunta: '¿Quién dijo que los electrones giran en órbitas (niveles)?',
    opciones: ['Dalton', 'Thomson', 'Bohr', 'Demócrito'],
    correcta: 2, explicacion_correcta: 'Bohr propuso las órbitas o niveles de energía.',
    explicacion_incorrectas: ['Dalton: esfera maciza.', 'Thomson: budín de pasas.', '', 'Demócrito: solo la idea.'] },

  'q-02-005-b': { pregunta: 'En un átomo neutro: ¿protones = electrones?',
    opciones: ['Sí, son iguales', 'No, son distintos'],
    correcta: 0, explicacion_correcta: 'Sí. Las cargas + y − se igualan, por eso es neutro.',
    explicacion_incorrectas: ['', 'Son iguales en un átomo neutro.'] },

  'q-02-006-b': { pregunta: 'Si un átomo PIERDE electrones, queda con carga…',
    opciones: ['Negativa (anión)', 'Positiva (catión)', 'Sin carga', 'Es un neutrón'],
    correcta: 1, explicacion_correcta: 'Pierde cargas (−), quedan más (+): catión positivo.',
    explicacion_incorrectas: ['El anión GANA electrones.', '', 'Sí cambia la carga.', 'No es un neutrón.'] },

  'q-02-007-b': { pregunta: 'El número másico (A) es la suma de…',
    opciones: ['Protones + electrones', 'Protones + neutrones', 'Neutrones + electrones', 'Solo protones'],
    correcta: 1, explicacion_correcta: 'A = protones + neutrones.',
    explicacion_incorrectas: ['Los electrones casi no pesan.', '', 'No se cuentan electrones.', 'Faltan neutrones.'] },

  'q-02-008-b': { pregunta: '¿Cuántos electrones caben en el primer nivel (n=1)?',
    opciones: ['2', '8', '18', '32'],
    correcta: 0, explicacion_correcta: 'En el primer nivel caben 2 electrones.',
    explicacion_incorrectas: ['', '8 es el segundo nivel.', '18 es el tercero.', '32 es el cuarto.'] },

  'q-02-009-b': { pregunta: 'Dos isótopos cambian en su número de…',
    opciones: ['Protones', 'Electrones', 'Neutrones', 'Niveles'],
    correcta: 2, explicacion_correcta: 'Los isótopos cambian solo el número de neutrones.',
    explicacion_incorrectas: ['Cambiar protones = otro elemento.', 'Cambiar electrones = ion.', '', 'No cambian niveles.'] },

  /* INTERMEDIO */
  'q-02-010-i': { pregunta: 'El oxígeno tiene 8 electrones. ¿Cuál configuración suma 8?',
    opciones: ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s⁴ 2p²', '1s² 2p⁶'],
    correcta: 0, explicacion_correcta: '2 + 2 + 4 = 8 electrones.',
    explicacion_incorrectas: ['', 'Suma 10.', '2s solo lleva 2.', 'Falta 2s.'] },

  'q-02-011-i': { pregunta: '¿Qué se llena primero?',
    opciones: ['3d', '4s', 'Da igual', '4p'],
    correcta: 1, explicacion_correcta: 'El 4s se llena antes que el 3d (tiene menos energía).',
    explicacion_incorrectas: ['El 3d va después.', '', 'El orden sí importa.', 'El 4p va después.'] },

  'q-02-012-i': { pregunta: 'El número n indica el…',
    opciones: ['Forma del orbital', 'Nivel de energía y tamaño', 'Giro del electrón', 'Orientación'],
    correcta: 1, explicacion_correcta: 'n = nivel de energía y tamaño.',
    explicacion_incorrectas: ['La forma la da l.', '', 'El giro lo da el spin.', 'La orientación la da mₗ.'] },

  'q-02-013-i': { pregunta: 'El experimento de Rutherford mostró que el átomo tiene…',
    opciones: ['Es macizo', 'Un núcleo pequeño y mucho vacío', 'No tiene núcleo', 'Electrones por igual'],
    correcta: 1, explicacion_correcta: 'Hay un núcleo pequeño y positivo, y mucho espacio vacío.',
    explicacion_incorrectas: ['No es macizo.', '', 'Sí tiene núcleo.', 'No es uniforme.'] },

  'q-02-014-i': { pregunta: 'Regla de Hund: los electrones primero…',
    opciones: ['Se juntan de a dos', 'Ocupan orbitales separados', 'Van todos a uno', 'Sin orden'],
    correcta: 1, explicacion_correcta: 'Primero uno por orbital; luego se aparean.',
    explicacion_incorrectas: ['Se juntan al final.', '', 'No caben todos en uno.', 'Sí hay orden.'] },

  'q-02-015-i': { pregunta: 'El Na⁺ (sodio, 11 protones) tiene cuántos electrones?',
    opciones: ['11', '10', '12', 'Igual nº que protones'],
    correcta: 1, explicacion_correcta: 'Perdió 1 electrón: queda con 10.',
    explicacion_incorrectas: ['11 sería neutro.', '', 'No ganó electrones.', 'Si fueran iguales sería neutro.'] },

  'q-02-016-i': { pregunta: 'C-12 y C-14 se diferencian en…',
    opciones: ['Protones', 'Neutrones (6 y 8)', 'Electrones', 'Número atómico'],
    correcta: 1, explicacion_correcta: 'Mismo nº de protones; cambian los neutrones.',
    explicacion_incorrectas: ['Los protones son iguales.', '', 'Los electrones son iguales.', 'El Z es 6 en ambos.'] },

  'q-02-017-i': { pregunta: 'Los electrones de valencia están en el…',
    opciones: ['Núcleo', 'Último nivel', 'Primer nivel', 'Neutrón'],
    correcta: 1, explicacion_correcta: 'Están en el último nivel; mandan en la química.',
    explicacion_incorrectas: ['En el núcleo no hay electrones.', '', 'No es el primero.', 'El neutrón no tiene.'] },

  'q-02-018-i': { pregunta: 'Ordena del más viejo al más nuevo:',
    opciones: ['Dalton → Thomson → Bohr → Cuántico', 'Bohr → Dalton → Cuántico → Thomson', 'Thomson → Dalton → Bohr → Cuántico', 'Cuántico → Bohr → Thomson → Dalton'],
    correcta: 0, explicacion_correcta: 'Ese es el orden histórico correcto.',
    explicacion_incorrectas: ['', 'Dalton fue primero.', 'Dalton va antes que Thomson.', 'El cuántico es el último.'] },

  'q-02-019-i': { pregunta: '¿Cuántos electrones caben en el segundo nivel (n=2)?',
    opciones: ['2', '8', '18', '10'],
    correcta: 1, explicacion_correcta: 'En el segundo nivel caben 8.',
    explicacion_incorrectas: ['2 es el primero.', '', '18 es el tercero.', 'No es 10.'] },

  'q-02-020-i': { pregunta: '¿Por qué la masa está en el núcleo?',
    opciones: ['El núcleo es grande', 'Protones y neutrones pesan mucho más que el electrón', 'Hay más electrones', 'Los electrones pesan mucho'],
    correcta: 1, explicacion_correcta: 'Protón y neutrón pesan ~1836 veces más que el electrón.',
    explicacion_incorrectas: ['El núcleo es chiquito.', '', 'Hay igual cantidad.', 'El electrón pesa poco.'] },

  'q-02-021-i': { pregunta: 'El spin (mₛ) describe…',
    opciones: ['El tamaño', 'El giro del electrón', 'La forma', 'El nivel'],
    correcta: 1, explicacion_correcta: 'El spin es el giro del electrón (+½ o −½).',
    explicacion_incorrectas: ['El tamaño lo da n.', '', 'La forma la da l.', 'El nivel lo da n.'] },

  'q-02-022-i': { pregunta: 'En un orbital caben como máximo…',
    opciones: ['Infinitos', '2 con giros opuestos', '1 solo', '2 con el mismo giro'],
    correcta: 1, explicacion_correcta: 'Máximo 2 electrones, con giros opuestos (↑↓).',
    explicacion_incorrectas: ['No infinitos.', '', 'Caben 2, no 1.', 'Deben ser opuestos.'] },

  'q-02-023-i': { pregunta: 'La masa atómica de la tabla es…',
    opciones: ['De un isótopo', 'El promedio de sus isótopos', 'El nº de protones', 'La masa del electrón'],
    correcta: 1, explicacion_correcta: 'Es el promedio de las masas de sus isótopos.',
    explicacion_incorrectas: ['No es de uno solo.', '', 'Eso es Z.', 'El electrón pesa casi nada.'] },

  /* AVANZADO */
  'q-02-024-a': { pregunta: 'El hierro termina en 4s². ¿Cuántos electrones de valencia (nivel 4) tiene?',
    opciones: ['6', '2', '8', '4'],
    correcta: 1, explicacion_correcta: 'En el último nivel (4s²) hay 2 electrones.',
    explicacion_incorrectas: ['Los 3d están en el nivel 3.', '', 'No son 8.', 'No son 4.'] },

  'q-02-025-a': { pregunta: 'El O²⁻ ganó 2 electrones (8+2=10). Queda igual que…',
    opciones: ['Oxígeno neutro', 'Neón (10)', 'Carbono (6)', 'Sodio (11)'],
    correcta: 1, explicacion_correcta: 'Con 10 electrones, igual que el neón.',
    explicacion_incorrectas: ['El oxígeno neutro tiene 8.', '', 'El carbono tiene 6.', 'El sodio tiene 11.'] },

  'q-02-026-a': { pregunta: 'Z = 17 y A = 35. ¿Cuántos neutrones? (N = A − Z)',
    opciones: ['17', '35', '18', '52'],
    correcta: 2, explicacion_correcta: '35 − 17 = 18 neutrones.',
    explicacion_incorrectas: ['17 son los protones.', '35 es A.', '', '52 es la suma.'] },

  'q-02-027-a': { pregunta: 'El modelo cuántico dice que el electrón…',
    opciones: ['Va en órbitas fijas', 'Está en orbitales (zonas probables)', 'No existe', 'Es igual a Bohr'],
    correcta: 1, explicacion_correcta: 'Los orbitales son zonas donde es probable hallar al electrón.',
    explicacion_incorrectas: ['Las órbitas fijas son de Bohr.', '', 'Sí existe.', 'Sí hay diferencia.'] },

  'q-02-028-a': { pregunta: 'Isótopos: 75% de masa 35 y 25% de masa 37. Masa promedio ≈',
    opciones: ['36.0', '35.5', '37.0', '35.0'],
    correcta: 1, explicacion_correcta: '(35×0.75)+(37×0.25) = 35.5.',
    explicacion_incorrectas: ['No es promedio simple.', '', 'Sería 37 si todo fuera pesado.', 'Sería 35 si todo fuera ligero.'] },

  'q-02-029-a': { pregunta: 'Termina en 3s² 3p⁵ (7 de valencia). Le falta 1 para el octeto. Es un…',
    opciones: ['Gas noble', 'Halógeno (muy reactivo)', 'Metal alcalino', 'No se sabe'],
    correcta: 1, explicacion_correcta: 'Le falta 1 electrón: es un halógeno.',
    explicacion_incorrectas: ['El gas noble ya está completo.', '', 'El alcalino tiene 1 de valencia.', 'Sí se puede saber.'] },

  'q-02-030-a': { pregunta: 'Átomo = estadio, núcleo = canica. ¿Qué muestra esto?',
    opciones: ['El átomo es casi todo vacío', 'El núcleo es enorme', 'Los electrones llenan todo', 'El átomo es macizo'],
    correcta: 0, explicacion_correcta: 'El átomo es casi todo espacio vacío.',
    explicacion_incorrectas: ['', 'El núcleo es diminuto.', 'Los electrones no lo llenan.', 'No es macizo.'] }
};
