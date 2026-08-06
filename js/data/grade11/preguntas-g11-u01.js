/* ================================================================
   QUÍMICA INTERACTIVA 11° — Lic. Bryan Chavarría C.
   js/data/grade11/preguntas-g11-u01.js  |  Banco — UNIDAD I: El Agua
   ================================================================
   IMP-11-U01. 30 preguntas, distribuidas en 4 categorías para que
   cada intento de examen (20 preguntas) pueda garantizar el mínimo
   exigido por indicador de evaluación:

     categoria                          | en el banco | mínimo/intento
     -----------------------------------|-------------|---------------
     importancia-composicion            |      6      |       4
     estructura-geometria-polaridad     |      9      |       6
     enlace-vs-fuerza                   |      8      |       5
     polaridad-solubilidad              |      7      |       5
     TOTAL                              |     30      |      20

   La aplicación ambiental está integrada de forma transversal dentro
   de varias preguntas de las 4 categorías (no es una categoría aparte).
   Mismo esquema de pregunta que preguntas-u01.js (10°) — id con
   prefijo g11 para no colisionar nunca con IDs de décimo.
================================================================ */
window.PREGUNTAS_G11_U01 = [

  /* ───────────── CATEGORÍA A: importancia-composicion (6) ───────────── */
  {
    id: 'q-g11u1-001', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'basico',
    pregunta: '¿Por qué se dice que el agua es indispensable para la vida tal como la conocemos?',
    opciones: [
      'Porque actúa como medio en el que ocurren las reacciones químicas de los seres vivos',
      'Porque no reacciona con ninguna otra sustancia',
      'Porque es el único líquido que existe en la naturaleza',
      'Porque siempre está en estado sólido a temperatura ambiente'
    ],
    correcta: 0,
    explicacion_correcta: 'El agua es el medio donde ocurren la mayoría de reacciones bioquímicas, y forma parte estructural de las células.',
    explicacion_incorrectas: ['El agua sí reacciona con muchas sustancias (por eso disuelve tantas cosas).', 'Existen muchos otros líquidos (aceite, alcohol, mercurio, etc.).', 'A temperatura ambiente el agua es líquida, no sólida.']
  },
  {
    id: 'q-g11u1-002', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'basico',
    pregunta: 'La fórmula química del agua, H₂O, indica que cada molécula está formada por:',
    opciones: ['2 átomos de hidrógeno y 1 átomo de oxígeno', '1 átomo de hidrógeno y 2 de oxígeno', '2 átomos de hidrógeno y 2 de oxígeno', '1 átomo de cada elemento'],
    correcta: 0,
    explicacion_correcta: 'El subíndice 2 en H₂O indica dos átomos de hidrógeno unidos a un solo átomo de oxígeno.',
    explicacion_incorrectas: ['El subíndice 2 está en el hidrógeno, no en el oxígeno.', 'Serían 4 átomos totales, no lo que indica la fórmula.', 'La fórmula tiene 3 átomos en total, no 2.']
  },
  {
    id: 'q-g11u1-003', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'intermedio',
    pregunta: 'En una cuenca hidrográfica como el Río Pacuare, ¿por qué la disponibilidad de agua limpia afecta directamente a los organismos que ahí viven?',
    opciones: [
      'Porque el agua es el medio donde ocurren sus procesos químicos vitales, y su alteración afecta esos procesos',
      'Porque los peces solo necesitan agua para flotar',
      'Porque el agua limpia no tiene ningún efecto biológico real',
      'Porque todos los organismos acuáticos pueden vivir igual en cualquier tipo de agua'
    ],
    correcta: 0,
    explicacion_correcta: 'Si el medio químico (el agua) cambia su composición, los procesos vitales que dependen de él también se alteran.',
    explicacion_incorrectas: ['Flotar no es la función biológica del agua para estos organismos.', 'El agua sí tiene efectos biológicos reales y medibles.', 'La composición del agua afecta directamente qué organismos pueden sobrevivir en ella.']
  },
  {
    id: 'q-g11u1-004', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'basico',
    pregunta: '¿Cuál de las siguientes NO es una función general del agua en los seres vivos?',
    opciones: ['Servir como medio de transporte de sustancias', 'Participar en reacciones químicas', 'Regular la temperatura corporal', 'Producir energía por sí misma sin ninguna otra sustancia'],
    correcta: 3,
    explicacion_correcta: 'El agua no produce energía por sí sola — participa en procesos que sí la generan, pero no es una fuente energética en sí misma.',
    explicacion_incorrectas: ['Sí es un medio real de transporte (sangre, savia, etc.).', 'Sí participa activamente en muchas reacciones químicas.', 'Sí regula la temperatura por su alto calor específico.']
  },
  {
    id: 'q-g11u1-005', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'intermedio',
    pregunta: 'Si un río pierde parte de su caudal de agua dulce disponible, ¿qué consecuencia química directa podría esperarse primero?',
    opciones: [
      'Que las sustancias disueltas queden más concentradas en el agua restante',
      'Que el agua deje de ser H₂O',
      'Que el oxígeno del agua desaparezca por completo de inmediato',
      'Ninguna, el caudal no afecta la composición del agua'
    ],
    correcta: 0,
    explicacion_correcta: 'Con menos volumen de agua disolviendo la misma cantidad de sustancias, la concentración de esas sustancias sube.',
    explicacion_incorrectas: ['La fórmula química del agua no cambia por el caudal.', 'El oxígeno disuelto disminuye gradualmente, no desaparece de inmediato.', 'El volumen disponible sí afecta la concentración de lo disuelto — es la base de la Unidad II.']
  },
  {
    id: 'q-g11u1-006', unidad: 'g11-u01', categoria: 'importancia-composicion', tema: 'El agua y la vida', nivel: 'avanzado',
    pregunta: 'Un equipo científico investiga una cuenca y solo mide "cuánta agua hay". ¿Por qué esa medición sola no basta para evaluar la salud del ecosistema?',
    opciones: [
      'Porque la cantidad de agua no dice nada sobre qué está disuelto o suspendido en ella',
      'Porque el volumen de agua siempre determina por completo su calidad',
      'Porque la cantidad de agua es la única variable química relevante',
      'Porque los ecosistemas no dependen de la composición del agua'
    ],
    correcta: 0,
    explicacion_correcta: 'La cantidad (volumen) y la composición (qué hay disuelto) son variables distintas — un río "lleno" puede estar contaminado igual.',
    explicacion_incorrectas: ['El volumen no determina automáticamente la calidad química.', 'La composición (lo disuelto) es igual o más relevante que la cantidad.', 'Los ecosistemas dependen fuertemente de qué contiene el agua, no solo de cuánta hay.']
  },

  /* ───────────── CATEGORÍA B: estructura-geometria-polaridad (9) ───────────── */
  {
    id: 'q-g11u1-007', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Así está construida H₂O', nivel: 'basico',
    pregunta: '¿Cuántos electrones de valencia tiene el átomo de oxígeno en la molécula de agua?',
    opciones: ['6', '2', '4', '8'],
    correcta: 0,
    explicacion_correcta: 'El oxígeno pertenece al grupo 16 (VIA) de la tabla periódica, con 6 electrones de valencia.',
    explicacion_incorrectas: ['2 corresponde al hidrógeno, no al oxígeno.', '4 no corresponde a ningún elemento del agua en este contexto.', '8 sería un octeto completo, no el número de electrones de valencia que aporta.']
  },
  {
    id: 'q-g11u1-008', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Así está construida H₂O', nivel: 'basico',
    pregunta: 'En la estructura de Lewis del agua, ¿cuántos pares de electrones libres (no enlazantes) tiene el átomo de oxígeno?',
    opciones: ['2', '0', '1', '4'],
    correcta: 0,
    explicacion_correcta: 'De los 6 electrones de valencia del oxígeno, 2 forman enlaces con cada hidrógeno, y los 4 restantes forman 2 pares libres.',
    explicacion_incorrectas: ['0 pares libres dejaría al oxígeno sin completar su octeto.', '1 par libre no sería suficiente para completar el octeto del oxígeno.', '4 pares libres serían 8 electrones adicionales, más de los que el oxígeno tiene disponibles.']
  },
  {
    id: 'q-g11u1-009', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Así está construida H₂O', nivel: 'intermedio',
    pregunta: '¿Qué geometría molecular describe correctamente a la molécula de agua?',
    opciones: ['Angular (doblada)', 'Lineal', 'Trigonal plana', 'Tetraédrica perfecta'],
    correcta: 0,
    explicacion_correcta: 'Los 2 pares libres del oxígeno repelen a los enlaces O–H, doblando la geometría a un ángulo de aproximadamente 104.5°.',
    explicacion_incorrectas: ['Lineal implicaría 180°, sin considerar la repulsión de los pares libres.', 'Trigonal plana no aplica a una molécula con solo 2 átomos enlazados al centro.', 'Tetraédrica describe la distribución de los 4 pares de electrones, pero la FORMA de la molécula (solo átomos) es angular.']
  },
  {
    id: 'q-g11u1-010', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Por qué el agua es polar', nivel: 'basico',
    pregunta: '¿Qué elemento tiene mayor electronegatividad dentro de la molécula de agua?',
    opciones: ['El oxígeno', 'El hidrógeno', 'Ambos tienen exactamente la misma', 'Ninguno tiene electronegatividad'],
    correcta: 0,
    explicacion_correcta: 'El oxígeno es más electronegativo que el hidrógeno, por lo que atrae con más fuerza los electrones compartidos.',
    explicacion_incorrectas: ['El hidrógeno tiene menor electronegatividad que el oxígeno.', 'Si tuvieran la misma electronegatividad, el enlace sería no polar.', 'Todos los átomos tienen electronegatividad, es una propiedad periódica real.']
  },
  {
    id: 'q-g11u1-011', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Por qué el agua es polar', nivel: 'intermedio',
    pregunta: 'La diferencia de electronegatividad entre O y H hace que cada enlace O–H tenga:',
    opciones: ['Una carga parcial negativa sobre el oxígeno y parcial positiva sobre el hidrógeno', 'Cargas completas (+1 y -1) como en un enlace iónico', 'Carga nula en ambos átomos', 'Carga parcial positiva sobre el oxígeno'],
    correcta: 0,
    explicacion_correcta: 'El oxígeno atrae más los electrones compartidos, generando una carga parcial (δ⁻) sobre él y (δ⁺) sobre el hidrógeno.',
    explicacion_incorrectas: ['Las cargas completas son típicas de enlaces iónicos, no de este enlace covalente polar.', 'Si la carga fuera nula, el enlace sería completamente no polar.', 'El oxígeno, al ser más electronegativo, concentra la carga parcial negativa, no la positiva.']
  },
  {
    id: 'q-g11u1-012', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Por qué el agua es polar', nivel: 'avanzado',
    pregunta: '¿Por qué la molécula de agua es polar en su conjunto, y no solo "tiene enlaces polares"?',
    opciones: [
      'Porque su geometría angular hace que los dos dipolos de enlace NO se cancelen entre sí',
      'Porque el hidrógeno es más electronegativo que el oxígeno',
      'Porque tiene una geometría lineal donde los dipolos se anulan',
      'Porque no existen dipolos de enlace dentro de la molécula'
    ],
    correcta: 0,
    explicacion_correcta: 'Si la molécula fuera lineal, los dos dipolos O–H se cancelarían; al ser angular, se suman en un dipolo neto hacia el oxígeno.',
    explicacion_incorrectas: ['El oxígeno es el más electronegativo, no el hidrógeno.', 'Una geometría lineal SÍ cancelaría los dipolos — pero el agua no es lineal.', 'Sí existen dipolos de enlace: cada enlace O–H es polar.']
  },
  {
    id: 'q-g11u1-013', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Por qué el agua es polar', nivel: 'intermedio',
    pregunta: 'Si el agua fuera hipotéticamente una molécula lineal (H–O–H en 180°), ¿qué pasaría con su polaridad neta?',
    opciones: ['Sería una molécula no polar, a pesar de tener enlaces polares', 'Sería aún más polar que la real', 'No cambiaría nada respecto a la molécula real', 'Dejaría de tener enlaces covalentes'],
    correcta: 0,
    explicacion_correcta: 'En una geometría lineal hipotética, los dos vectores de dipolo se cancelarían exactamente, dando una molécula no polar en conjunto.',
    explicacion_incorrectas: ['Sería MENOS polar (nula), no más.', 'Sí cambiaría — es exactamente la diferencia entre molécula polar y no polar.', 'Los enlaces covalentes O–H seguirían existiendo, solo cambiaría su disposición geométrica.']
  },
  {
    id: 'q-g11u1-014', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Así está construida H₂O', nivel: 'basico',
    pregunta: 'El tipo de enlace que mantiene unidos los átomos DENTRO de una sola molécula de agua es:',
    opciones: ['Covalente polar', 'Iónico', 'Puente de hidrógeno', 'Metálico'],
    correcta: 0,
    explicacion_correcta: 'Los átomos de O y H comparten electrones de forma desigual — eso es, por definición, un enlace covalente polar.',
    explicacion_incorrectas: ['Un enlace iónico implicaría transferencia completa de electrones, no compartición.', 'El puente de hidrógeno ocurre ENTRE moléculas distintas, no dentro de una sola.', 'El enlace metálico es propio de metales, no de esta molécula.']
  },
  {
    id: 'q-g11u1-015', unidad: 'g11-u01', categoria: 'estructura-geometria-polaridad', tema: 'Cuando el agua transporta contaminación', nivel: 'avanzado',
    pregunta: 'Un contaminante tiene una geometría molecular simétrica que cancela sus dipolos internos, a pesar de tener enlaces polares. ¿Qué se puede predecir de su comportamiento en agua?',
    opciones: [
      'Se comportará como una sustancia no polar, con poca afinidad por el agua',
      'Se disolverá perfectamente en agua por tener enlaces polares',
      'Formará puentes de hidrógeno fuertes con el agua',
      'Reaccionará químicamente de inmediato con el agua'
    ],
    correcta: 0,
    explicacion_correcta: 'Igual que en el caso hipotético del agua lineal, una geometría simétrica puede cancelar dipolos y volver la molécula globalmente no polar.',
    explicacion_incorrectas: ['Tener enlaces polares no garantiza que la MOLÉCULA completa sea polar.', 'Sin polaridad neta, no puede formar puentes de hidrógeno reales con el agua.', 'La polaridad no implica reactividad química automática.']
  },

  /* ───────────── CATEGORÍA C: enlace-vs-fuerza (8) ───────────── */
  {
    id: 'q-g11u1-016', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'basico',
    pregunta: '¿Cuál es la diferencia fundamental entre un enlace químico y una fuerza intermolecular?',
    opciones: [
      'El enlace químico une átomos DENTRO de una molécula; la fuerza intermolecular actúa ENTRE moléculas distintas',
      'Son exactamente el mismo fenómeno con dos nombres distintos',
      'La fuerza intermolecular es siempre más fuerte que el enlace químico',
      'El enlace químico solo existe en los metales'
    ],
    correcta: 0,
    explicacion_correcta: 'Esta es la distinción conceptual central de la unidad: intra (dentro) vs. inter (entre) moléculas.',
    explicacion_incorrectas: ['Son fenómenos distintos, con energías y efectos muy diferentes.', 'Los enlaces químicos son generalmente mucho más fuertes que las fuerzas intermoleculares.', 'Los enlaces químicos existen en todo tipo de compuestos, no solo metales.']
  },
  {
    id: 'q-g11u1-017', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'basico',
    pregunta: 'El puente de hidrógeno que se forma entre dos moléculas de agua es un ejemplo de:',
    opciones: ['Fuerza intermolecular', 'Enlace covalente', 'Enlace iónico', 'Enlace metálico'],
    correcta: 0,
    explicacion_correcta: 'El puente de hidrógeno ocurre ENTRE moléculas de agua distintas — por definición, es una fuerza intermolecular.',
    explicacion_incorrectas: ['El enlace covalente es el que existe DENTRO de cada molécula (O–H).', 'No hay transferencia de electrones entre moléculas de agua completas.', 'No hay estructura metálica involucrada en el agua.']
  },
  {
    id: 'q-g11u1-018', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'intermedio',
    pregunta: 'Si se separan dos moléculas de agua que estaban unidas por un puente de hidrógeno, ¿qué le sucede a cada molécula de H₂O individualmente?',
    opciones: ['Permanece intacta — el puente de hidrógeno no rompe los enlaces O–H internos', 'Se rompe en átomos de H y O sueltos', 'Deja de ser H₂O', 'Se convierte en otra sustancia distinta'],
    correcta: 0,
    explicacion_correcta: 'Romper una fuerza intermolecular (el puente de hidrógeno) no afecta los enlaces covalentes internos de cada molécula.',
    explicacion_incorrectas: ['Los enlaces O–H internos son mucho más fuertes y no se rompen por esto.', 'La molécula sigue siendo H₂O — su identidad química no cambia.', 'No hay ninguna reacción química involucrada, solo separación física.']
  },
  {
    id: 'q-g11u1-019', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'intermedio',
    pregunta: '¿Por qué se necesita mucha más energía para romper todos los enlaces O–H del agua (descomponerla) que para evaporarla?',
    opciones: [
      'Porque evaporar solo rompe fuerzas intermoleculares (más débiles); descomponerla rompe enlaces covalentes (más fuertes)',
      'Porque evaporar y descomponer requieren exactamente la misma energía',
      'Porque los enlaces covalentes son más débiles que las fuerzas intermoleculares',
      'Porque el agua no puede descomponerse bajo ninguna circunstancia'
    ],
    correcta: 0,
    explicacion_correcta: 'La evaporación solo separa moléculas completas (rompe puentes de hidrógeno); descomponer el agua requeriría romper los enlaces O–H internos, mucho más fuertes.',
    explicacion_incorrectas: ['La energía necesaria es muy distinta — por eso el agua hierve fácilmente pero no se descompone con solo calor moderado.', 'Los enlaces covalentes son considerablemente más fuertes que las fuerzas intermoleculares.', 'El agua sí puede descomponerse (por ejemplo, por electrólisis), solo que requiere mucha más energía.']
  },
  {
    id: 'q-g11u1-020', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'basico',
    pregunta: '¿Cuál de estos fenómenos involucra romper un enlace covalente, y no solo una fuerza intermolecular?',
    opciones: ['La electrólisis del agua en hidrógeno y oxígeno gaseosos', 'La evaporación del agua de un charco', 'La condensación de vapor de agua', 'El congelamiento del agua'],
    correcta: 0,
    explicacion_correcta: 'La electrólisis descompone la molécula de agua en sus elementos — eso exige romper los enlaces covalentes O–H internos.',
    explicacion_incorrectas: ['La evaporación solo separa moléculas completas de H₂O — sin romper enlaces internos.', 'La condensación también es un cambio físico entre moléculas completas.', 'El congelamiento organiza las moléculas de H₂O, sin romper ningún enlace interno.']
  },
  {
    id: 'q-g11u1-021', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Cuando el agua transporta contaminación', nivel: 'avanzado',
    pregunta: 'Un contaminante orgánico se mezcla con agua sin reaccionar químicamente con ella, solo queda disperso. ¿Qué tipo de interacción explica mejor esto?',
    opciones: [
      'Fuerzas intermoleculares entre el contaminante y las moléculas de agua, sin romper ningún enlace covalente',
      'Un nuevo enlace covalente entre el contaminante y el agua',
      'La formación de un compuesto iónico nuevo',
      'Ninguna interacción, el contaminante simplemente desaparece'
    ],
    correcta: 0,
    explicacion_correcta: 'Cuando dos sustancias se mezclan sin reaccionar químicamente, la interacción que las mantiene juntas (o separadas) es de tipo intermolecular.',
    explicacion_incorrectas: ['Si no hay reacción química, no se forma un enlace covalente nuevo.', 'No hay evidencia de que se forme un compuesto iónico en una simple mezcla física.', 'El contaminante sigue presente — no desaparece, solo se dispersa o no se disuelve.']
  },
  {
    id: 'q-g11u1-022', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'intermedio',
    pregunta: '¿Cuál de las siguientes energías es, en general, la de MENOR magnitud?',
    opciones: ['La de una fuerza intermolecular (ej. puente de hidrógeno)', 'La de un enlace covalente', 'La de un enlace iónico', 'La de un enlace metálico'],
    correcta: 0,
    explicacion_correcta: 'Las fuerzas intermoleculares son considerablemente más débiles que cualquier tipo de enlace químico verdadero.',
    explicacion_incorrectas: ['Los enlaces covalentes requieren considerablemente más energía para romperse que las fuerzas intermoleculares.', 'Los enlaces iónicos también son más fuertes que las fuerzas intermoleculares.', 'Los enlaces metálicos igualmente superan en fuerza a las interacciones intermoleculares.']
  },
  {
    id: 'q-g11u1-023', unidad: 'g11-u01', categoria: 'enlace-vs-fuerza', tema: 'Enlace químico vs. fuerza intermolecular', nivel: 'basico',
    pregunta: 'El agua hierve a una temperatura relativamente alta (100°C al nivel del mar) para ser una molécula tan pequeña. Esto se explica principalmente por:',
    opciones: ['Los puentes de hidrógeno entre sus moléculas, que hay que superar para separarlas', 'La fuerza de sus enlaces covalentes O–H', 'Que el agua tiene enlaces iónicos', 'Que el agua no tiene ninguna fuerza intermolecular'],
    correcta: 0,
    explicacion_correcta: 'Los puentes de hidrógeno mantienen las moléculas de agua fuertemente unidas entre sí, exigiendo más energía (temperatura) para separarlas al hervir.',
    explicacion_incorrectas: ['Hervir no rompe los enlaces covalentes internos, solo separa moléculas completas.', 'El agua no tiene enlaces iónicos en su estructura.', 'El agua sí tiene fuerzas intermoleculares fuertes — de hecho, es la razón de este comportamiento.']
  },

  /* ───────────── CATEGORÍA D: polaridad-solubilidad (7) ───────────── */
  {
    id: 'q-g11u1-024', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: '¿Qué se disuelve en agua?', nivel: 'basico',
    pregunta: 'El principio "lo semejante disuelve a lo semejante" indica que, en general:',
    opciones: ['Las sustancias polares se disuelven bien en disolventes polares, y las no polares en disolventes no polares', 'Todas las sustancias se disuelven igual en cualquier líquido', 'Solo las sustancias iónicas se disuelven en cualquier líquido', 'La polaridad no influye en la solubilidad'],
    correcta: 0,
    explicacion_correcta: 'Este es el principio cualitativo central: la afinidad de solubilidad depende de que las polaridades sean compatibles.',
    explicacion_incorrectas: ['La solubilidad varía mucho según la compatibilidad de polaridades — no es universal.', 'Muchas sustancias no iónicas (polares o no polares) también se disuelven según su afinidad.', 'La polaridad es precisamente la variable central que determina la solubilidad.']
  },
  {
    id: 'q-g11u1-025', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: '¿Qué se disuelve en agua?', nivel: 'basico',
    pregunta: '¿Por qué la sal de mesa (NaCl) se disuelve fácilmente en agua?',
    opciones: [
      'Porque el agua, al ser polar, puede rodear y separar los iones Na⁺ y Cl⁻',
      'Porque la sal y el agua no tienen ninguna interacción',
      'Porque el agua es no polar, igual que la sal',
      'Porque la sal se evapora al contacto con el agua'
    ],
    correcta: 0,
    explicacion_correcta: 'Las cargas parciales del agua interactúan con los iones cargados de la sal, rodeándolos y separándolos (disolviéndolos).',
    explicacion_incorrectas: ['Sí hay una interacción real — es justamente lo que produce la disolución.', 'El agua es polar, no no polar; esa polaridad es la que permite disolver la sal.', 'La sal se disuelve, no se evapora, al contacto con el agua.']
  },
  {
    id: 'q-g11u1-026', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: '¿Qué se disuelve en agua?', nivel: 'intermedio',
    pregunta: '¿Por qué el aceite NO se mezcla con el agua, quedando siempre en una capa separada?',
    opciones: [
      'Porque el aceite es una sustancia no polar y el agua es polar — sus polaridades son incompatibles',
      'Porque el aceite es más pesado y por eso no se mezcla',
      'Porque el agua rechaza químicamente al aceite mediante una reacción',
      'Porque el aceite es un sólido a temperatura ambiente'
    ],
    correcta: 0,
    explicacion_correcta: 'La incompatibilidad de polaridades (no polar vs. polar) es la razón química real de que no se mezclen, más allá de la densidad.',
    explicacion_incorrectas: ['La densidad explica por qué el aceite queda arriba, pero no por qué no se MEZCLAN.', 'No hay una reacción química — es una simple falta de afinidad física.', 'El aceite es líquido a temperatura ambiente, no sólido.']
  },
  {
    id: 'q-g11u1-027', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: '¿Qué se disuelve en agua?', nivel: 'basico',
    pregunta: 'El azúcar de mesa (una molécula orgánica con muchos grupos -OH) se disuelve bien en agua porque:',
    opciones: ['Sus grupos -OH pueden formar puentes de hidrógeno con las moléculas de agua', 'Es una sustancia iónica como la sal', 'No tiene ninguna polaridad', 'Es exactamente igual químicamente al agua'],
    correcta: 0,
    explicacion_correcta: 'Aunque el azúcar es una molécula orgánica (no iónica), sus grupos -OH le dan suficiente polaridad para interactuar con el agua vía puentes de hidrógeno.',
    explicacion_incorrectas: ['El azúcar es una molécula covalente, no iónica.', 'El azúcar sí tiene polaridad, por eso se disuelve bien.', 'Son sustancias químicamente distintas, aunque compatibles en polaridad.']
  },
  {
    id: 'q-g11u1-028', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: 'Cuando el agua transporta contaminación', nivel: 'intermedio',
    pregunta: 'Un derrame de petróleo (sustancia no polar) llega a un río. ¿Qué comportamiento químico es esperable?',
    opciones: [
      'El petróleo NO se disolverá en el agua y tenderá a permanecer como una capa separada',
      'El petróleo se disolverá completamente, como lo hace la sal',
      'El agua y el petróleo formarán un nuevo compuesto químico estable',
      'El petróleo se volverá polar al contacto con el agua'
    ],
    correcta: 0,
    explicacion_correcta: 'Por ser no polar, el petróleo es incompatible con la polaridad del agua — exactamente el mismo principio que explica por qué el aceite no se mezcla.',
    explicacion_incorrectas: ['A diferencia de la sal (iónica, compatible con la polaridad del agua), el petróleo no polar no se disuelve así.', 'No hay una reacción química que forme un nuevo compuesto en un derrame típico.', 'El contacto físico con el agua no cambia la estructura molecular ni la polaridad del petróleo.']
  },
  {
    id: 'q-g11u1-029', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: '¿Qué se disuelve en agua?', nivel: 'avanzado',
    pregunta: 'Se tienen 2 sustancias desconocidas, A y B. A se disuelve bien en agua; B no. Basándose únicamente en polaridad, ¿qué se puede predecir con más confianza?',
    opciones: [
      'A es probablemente polar (o iónica) y B es probablemente no polar',
      'A y B tienen exactamente la misma polaridad',
      'B es más pesada que A, por eso no se disuelve',
      'No se puede predecir nada sobre la polaridad de A ni B'
    ],
    correcta: 0,
    explicacion_correcta: 'El comportamiento de solubilidad en agua es precisamente la evidencia experimental que permite inferir la polaridad relativa de una sustancia desconocida.',
    explicacion_incorrectas: ['Si tuvieran la misma polaridad, ambas se comportarían igual frente al agua.', 'La densidad no es la variable que determina si algo se disuelve o no.', 'El comportamiento observado (solubilidad) sí permite una predicción razonable sobre polaridad.']
  },
  {
    id: 'q-g11u1-030', unidad: 'g11-u01', categoria: 'polaridad-solubilidad', tema: 'Cuando el agua transporta contaminación', nivel: 'avanzado',
    pregunta: 'Un investigador debe decidir si un contaminante en un río se dispersará ampliamente en el agua o quedará concentrado en un solo punto. ¿Qué dato químico es el más útil para esa predicción?',
    opciones: [
      'Si el contaminante es polar o no polar (su compatibilidad de solubilidad con el agua)',
      'El color del contaminante',
      'La hora del día en que ocurrió el derrame',
      'El nombre comercial del producto derramado'
    ],
    correcta: 0,
    explicacion_correcta: 'La polaridad determina si el contaminante se disolverá y dispersará en el agua, o permanecerá separado/concentrado — el dato químico central de esta unidad.',
    explicacion_incorrectas: ['El color no determina el comportamiento químico de solubilidad.', 'La hora del derrame no es un dato químico sobre la sustancia misma.', 'El nombre comercial no aporta información química directa sin conocer su composición.']
  }
];
