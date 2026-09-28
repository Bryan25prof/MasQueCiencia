/* ================================================================
   MÁSQUECIENCIA — js/data/banco-bio10-u02.js
   Banco de examen — BIO10-U02: La biodiversidad
   ================================================================
   50 preguntas reales, derivadas y parafraseadas del libro fuente
   "Biología 10º: Un Enfoque Práctico" (Licda. Kathia E. Hernández
   Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018), Unidad II / Tema 2
   "La biodiversidad" (páginas 46-61: apartados 2.1 Conceptos
   relacionados con la biodiversidad, 2.2 Medición de la biodiversidad,
   2.3 Ecosistemas, 2.4 Amenazas a la biodiversidad, 2.5 Acciones para
   la conservación de la biodiversidad). Nunca copiado textualmente,
   nunca inventado — mismo criterio exacto que banco-bio10-u01.js.

   Mismo formato exacto: {id, tema, pregunta, opciones:[4], correcta:0
   (siempre la primera al declarar — el motor de examen las reordena
   en cada intento), explicacion}.
================================================================ */
const PREGUNTAS_BIO10_U02 = [
  // t1 — Especie y población (8)
  { id: 'bio10u02-01', tema: 't1', pregunta: '¿Qué es una especie, desde el punto de vista biológico?', opciones: [
    'Un conjunto de individuos con interacciones genéticas, evolutivas y ecológicas, cuyos miembros pueden procrear entre sí y dar descendencia viable',
    'Cualquier grupo de animales que se parezcan físicamente entre sí',
    'Un grupo de organismos que viven en el mismo país o región',
    'Un conjunto de plantas y animales que comparten el mismo nombre común'
  ], correcta: 0, explicacion: 'Aunque la apariencia es útil para identificar especies, lo que las define biológicamente es la capacidad de reproducirse entre sí y dar lugar a descendencia viable.' },
  { id: 'bio10u02-02', tema: 't1', pregunta: 'Los turpiales gorjeadores (Sturnella neglecta) y los turpiales orientales (Sturnella magna) parecen casi idénticos, pero no se reproducen entre ellos. ¿Por qué se consideran especies independientes?', opciones: [
    'Porque sus cantos son diferentes y eso impide que se reproduzcan entre sí, aunque convivan en la misma área',
    'Porque viven en países distintos',
    'Porque tienen colores de plumaje distintos',
    'Porque uno es más grande que el otro'
  ], correcta: 0, explicacion: 'La apariencia casi idéntica no define la especie; lo que las separa es que sus cantos diferentes impiden la reproducción entre ellas.' },
  { id: 'bio10u02-03', tema: 't1', pregunta: '¿Qué es una población ecológica?', opciones: [
    'Un conjunto de individuos de una misma especie que coexisten en un mismo espacio y tiempo, con cohesión reproductiva y ecológica',
    'Cualquier grupo de seres vivos sin importar su especie',
    'El número total de especies que existen en el planeta',
    'Un grupo de individuos que solo comparten el mismo hábitat, sin ninguna otra relación'
  ], correcta: 0, explicacion: 'La población ecológica implica cohesión reproductiva (intercambio de material genético) y ecológica (requerimientos similares de supervivencia) entre sus miembros.' },
  { id: 'bio10u02-04', tema: 't1', pregunta: '¿Cuáles son ejemplos reales de población mencionados en el libro?', opciones: [
    'Una bandada de gaviotas, un rebaño de ovejas, un panal de abejas o una plantación de yuca',
    'Todos los animales de un zoológico, sin importar su especie',
    'Todas las especies que viven en un mismo país',
    'Un solo individuo observado en la naturaleza'
  ], correcta: 0, explicacion: 'Estos son ejemplos de poblaciones porque cada uno reúne individuos de la misma especie en un espacio y tiempo determinado.' },
  { id: 'bio10u02-05', tema: 't1', pregunta: '¿Cuáles son las principales causas por las que resultan delimitadas las poblaciones?', opciones: [
    'El aislamiento físico y las diferencias de comportamiento',
    'El color de la piel o el pelaje de los individuos',
    'La cantidad de alimento disponible únicamente',
    'La edad promedio de los individuos'
  ], correcta: 0, explicacion: 'El texto identifica el aislamiento físico y las diferencias de comportamiento como las principales causas que delimitan a las poblaciones.' },
  { id: 'bio10u02-06', tema: 't1', pregunta: 'En Biología, un sentido especial del término "población", usado en Genética y Evolución, se refiere a...', opciones: [
    'Un grupo reproductivo cuyos individuos se cruzan únicamente entre sí, aunque biológicamente pudieran reproducirse también con otros miembros de la especie',
    'Cualquier conjunto de organismos, sin importar su especie',
    'Solo a los seres humanos que viven en una misma ciudad',
    'El total de especies que hay en un ecosistema'
  ], correcta: 0, explicacion: 'Este sentido especial describe un grupo cuyos miembros se cruzan únicamente entre sí, delimitado por aislamiento físico o diferencias de comportamiento.' },
  { id: 'bio10u02-07', tema: 't1', pregunta: '¿Qué representa, en conjunto, un transecto lineal usado en el estudio de poblaciones?', opciones: [
    'Una técnica de observación y recolección de datos, delimitada con cuerdas, para registrar especies de flora y fauna a lo largo de una línea',
    'Un experimento de laboratorio con animales en cautiverio',
    'Un mapa satelital de todo el país',
    'Una encuesta a los habitantes de una comunidad'
  ], correcta: 0, explicacion: 'El transecto lineal es una técnica de campo: se delimita una línea con cuerdas y se registran las especies que la tocan o cubren.' },
  { id: 'bio10u02-08', tema: 't1', pregunta: 'Además del transecto lineal, ¿qué otro tipo de transecto se usa para contabilizar especies dentro de un área cuadrada?', opciones: [
    'El transecto de banda, con cuadrantes trazados con cuerdas o cintas plásticas',
    'El transecto aéreo, hecho con drones exclusivamente',
    'El transecto genético, hecho con muestras de ADN',
    'El transecto histórico, basado en registros antiguos'
  ], correcta: 0, explicacion: 'El transecto de banda usa cuadrantes delimitados con cuerdas o cintas para contabilizar las especies dentro de esa área.' },

  // t2 — Biodiversidad y Costa Rica (9)
  { id: 'bio10u02-09', tema: 't2', pregunta: '¿A qué corresponde el concepto de biodiversidad?', opciones: [
    'A toda la variedad de la vida: la diversidad de especies, de genes y de ecosistemas',
    'Únicamente a la cantidad de animales que hay en un zoológico',
    'Solamente a las plantas de una región',
    'Al número de países que existen en el mundo'
  ], correcta: 0, explicacion: 'La biodiversidad no se limita a especies: incluye también la diversidad genética y la diversidad de ecosistemas.' },
  { id: 'bio10u02-10', tema: 't2', pregunta: 'Aproximadamente, ¿cuántas especies se calcula que existen en el planeta según el libro?', opciones: [
    'Alrededor de 30 millones, aunque no se conocen todas',
    'Exactamente 1000, todas ya descritas',
    'Menos de 500 especies en total',
    'Solo las especies mencionadas en los libros escolares'
  ], correcta: 0, explicacion: 'El texto indica que se calculan alrededor de 30 millones de especies, cifra no exacta porque no se conocen todas las que existen.' },
  { id: 'bio10u02-11', tema: 't2', pregunta: '¿Por qué se considera a Costa Rica uno de los 20 países con mayor biodiversidad del mundo?', opciones: [
    'Porque con solo el 0,03% de la superficie terrestre mundial alberga cerca del 4% de las especies estimadas, gracias a su posición geográfica y variados microclimas',
    'Porque es el país más grande del mundo',
    'Porque tiene la mayor población humana del planeta',
    'Porque no tiene ningún tipo de amenaza ambiental'
  ], correcta: 0, explicacion: 'Su pequeño territorio (51 100 km² terrestres) alberga una proporción desproporcionadamente alta de la biodiversidad mundial, gracias a sus dos costas y su sistema montañoso.' },
  { id: 'bio10u02-12', tema: 't2', pregunta: 'De las más de 500 000 especies que se supone se encuentran en Costa Rica, ¿qué grupo representa la mayoría?', opciones: [
    'Los insectos, con poco más de 300 000 especies',
    'Los mamíferos',
    'Las aves',
    'Los anfibios'
  ], correcta: 0, explicacion: 'De las 500 000 especies estimadas en Costa Rica, poco más de 300 000 son insectos.' },
  { id: 'bio10u02-13', tema: 't2', pregunta: '¿Qué es un "punto caliente" (hotspot) de biodiversidad?', opciones: [
    'Una región de la Tierra con una gran cantidad de especies endémicas amenazadas en un grado elevado',
    'Un lugar con temperaturas extremadamente altas',
    'Una zona sin ningún tipo de vida silvestre',
    'Un área donde solo viven especies domésticas'
  ], correcta: 0, explicacion: 'El concepto fue desarrollado para enfocar los esfuerzos de conservación en regiones con gran cantidad de especies endémicas amenazadas.' },
  { id: 'bio10u02-14', tema: 't2', pregunta: '¿Qué significa que una especie sea "endémica"?', opciones: [
    'Que solo aparece en un área determinada de la Tierra, como un archipiélago o una cadena montañosa',
    'Que se encuentra distribuida en todos los continentes',
    'Que fue introducida por el ser humano en un ecosistema',
    'Que ya se extinguió por completo'
  ], correcta: 0, explicacion: 'El ejemplo del libro es el lémur ratón de Berthe, que solo vive en el bosque Kirindy, en la costa oeste de Madagascar.' },
  { id: 'bio10u02-15', tema: 't2', pregunta: 'Según el libro, ¿en qué zonas la biodiversidad tiende a ser más rica en el mundo?', opciones: [
    'En los bosques tropicales (en tierra) y en los arrecifes de coral (en el mar), y aumenta desde los polos hacia el Ecuador',
    'Únicamente en los desiertos',
    'Solo en zonas urbanas densamente pobladas',
    'De manera uniforme en todo el planeta, sin ninguna variación'
  ], correcta: 0, explicacion: 'La biodiversidad aumenta de los polos hacia el Ecuador (con excepción de los desiertos), siendo los bosques tropicales y los arrecifes de coral los ecosistemas más ricos.' },
  { id: 'bio10u02-16', tema: 't2', pregunta: '¿Qué aspectos debe considerar el concepto de diversidad biológica, además de la variedad de especies?', opciones: [
    'La diversidad genética (características genéticas de las especies) y la diversidad de ecosistemas',
    'Únicamente el tamaño corporal de los organismos',
    'Solo el color de las especies',
    'Solo la cantidad de agua disponible en la región'
  ], correcta: 0, explicacion: 'La biodiversidad no es solo el número de especies: también contempla la diversidad genética y la variación de hábitats/ecosistemas.' },
  { id: 'bio10u02-17', tema: 't2', pregunta: '¿En qué situación tiende a ser baja la diversidad de una comunidad, según el libro?', opciones: [
    'En comunidades transitorias, muy explotadas o bajo condiciones ambientales precarias y muy fluctuantes',
    'En comunidades que llevan mucho tiempo estables (en climax)',
    'En ecosistemas tropicales',
    'En arrecifes de coral bien conservados'
  ], correcta: 0, explicacion: 'La diversidad es baja en comunidades transitorias, explotadas o sometidas a condiciones precarias, y va aumentando hasta llegar al clímax (máxima estabilidad).' },

  // t3 — Medición de la biodiversidad (9)
  { id: 'bio10u02-18', tema: 't3', pregunta: '¿Por qué la biodiversidad no es un concepto fácilmente medible?', opciones: [
    'Porque se compone de dos elementos: la variación de especies y la abundancia relativa de estas',
    'Porque no existe ninguna forma de estudiarla',
    'Porque solo se puede medir en laboratorio',
    'Porque las especies no se pueden contar'
  ], correcta: 0, explicacion: 'Medir biodiversidad implica combinar cuántas especies distintas hay (riqueza) y cuántos individuos hay de cada una (abundancia).' },
  { id: 'bio10u02-19', tema: 't3', pregunta: '¿Cómo se llama el cálculo que combina la riqueza de especies con la equitabilidad en un solo valor numérico?', opciones: [
    'Índice de diversidad',
    'Índice de natalidad',
    'Índice de masa corporal',
    'Índice climático'
  ], correcta: 0, explicacion: 'El índice de diversidad relaciona el número de especies de una comunidad con valores de importancia como número, biomasa o productividad.' },
  { id: 'bio10u02-20', tema: 't3', pregunta: 'El índice de Shannon (1949) cuantifica la variedad de especies y su abundancia relativa. ¿Qué significa que su valor sea superior a 3?', opciones: [
    'Que existe una diversidad alta',
    'Que existe una diversidad extremadamente baja',
    'Que todas las especies son iguales entre sí',
    'Que no hay ningún individuo en el área estudiada'
  ], correcta: 0, explicacion: 'Según el libro, valores del índice de Shannon superiores a 3 indican diversidad alta; entre 2 y 3, las especies están en equilibrio; y por debajo de 2, la diversidad es poca.' },
  { id: 'bio10u02-21', tema: 't3', pregunta: 'El índice de Margalef (1958) corresponde a un indicador de...', opciones: [
    'La riqueza específica de un área, según la relación entre la distribución de los individuos y la cantidad total de la muestra',
    'La temperatura promedio de un ecosistema',
    'La cantidad de lluvia anual de una región',
    'El tamaño físico de los organismos de una comunidad'
  ], correcta: 0, explicacion: 'Valores inferiores a 2 se consideran zonas de baja biodiversidad, y valores superiores a 5 indican alta biodiversidad según este índice.' },
  { id: 'bio10u02-22', tema: 't3', pregunta: 'En el índice de Simpson, la dominancia (Σpi²) mide qué tanto...', opciones: [
    'Una o pocas especies predominan sobre las demás en una comunidad',
    'El área total del ecosistema estudiado',
    'La cantidad de lluvia que recibe la zona',
    'La distancia entre dos ecosistemas distintos'
  ], correcta: 0, explicacion: 'El índice de Simpson se calcula como S = 1 − Σpi²: mientras más cercano a 1, menor es la dominancia de una sola especie y mayor la biodiversidad.' },
  { id: 'bio10u02-23', tema: 't3', pregunta: 'En el ejemplo del libro (transecto escolar con 10 especies y 45 individuos), el índice de Simpson resultó en 0,8909. ¿Cómo se interpreta ese resultado?', opciones: [
    'Al estar cercano a 1, es indicativo de una alta biodiversidad en el transecto observado, sin que ninguna especie domine claramente',
    'Indica que todas las especies del transecto están extintas',
    'Indica que solo existe una especie en el área',
    'No se puede interpretar sin más información'
  ], correcta: 0, explicacion: 'Un valor de Simpson cercano a 1 indica dominancia baja: ninguna especie predomina fuertemente sobre las demás, lo que refleja alta biodiversidad.' },
  { id: 'bio10u02-24', tema: 't3', pregunta: '¿Qué variable representa la letra "N" en la fórmula del índice de Margalef?', opciones: [
    'El número total de individuos de la muestra',
    'El número de países estudiados',
    'La temperatura promedio del área',
    'La cantidad de años que ha existido el ecosistema'
  ], correcta: 0, explicacion: 'En la fórmula D = (S − 1) / ln N, la N representa el número total de individuos, y la S el número de especies diferentes.' },
  { id: 'bio10u02-25', tema: 't3', pregunta: '¿Para qué se utilizan las cuerdas al realizar un transecto de campo?', opciones: [
    'Para delimitar las áreas de trabajo en las que se registrarán las especies observadas',
    'Para atrapar a los animales que se quieran estudiar',
    'Para medir la temperatura del ambiente',
    'Para marcar el camino de regreso al centro educativo'
  ], correcta: 0, explicacion: 'Las cuerdas delimitan el área del transecto (lineal, de banda o de perfil) donde se registrarán las especies por fotografías, nombre común o científico.' },
  { id: 'bio10u02-26', tema: 't3', pregunta: '¿Qué variable representa la letra "S" en la fórmula del índice de Margalef?', opciones: [
    'El número de especies diferentes registradas en la muestra',
    'La superficie total del país',
    'El número de individuos de una sola especie',
    'La cantidad de transectos realizados'
  ], correcta: 0, explicacion: 'S representa el número de especies diferentes, mientras que N representa el número total de individuos de la muestra.' },

  // t4 — Ecosistemas (8)
  { id: 'bio10u02-27', tema: 't4', pregunta: '¿Qué es un ecosistema?', opciones: [
    'Un sistema complejo en el que interactúan los seres vivos entre sí (componentes bióticos) con el conjunto de factores no vivos del ambiente (componentes abióticos)',
    'Únicamente el conjunto de animales de una región',
    'Un edificio donde se estudian plantas y animales',
    'El clima de una zona, sin considerar a los seres vivos'
  ], correcta: 0, explicacion: 'El ecosistema combina los componentes bióticos (organismos) con los abióticos (temperatura, agua, suelo, etc.) en interacción constante.' },
  { id: 'bio10u02-28', tema: 't4', pregunta: '¿Cuáles son ejemplos de componentes abióticos de un ecosistema, según el esquema del libro?', opciones: [
    'Minerales del suelo, agua, aire, viento, luz y calor',
    'Hongos, bacterias y algas',
    'Plantas, animales y microorganismos',
    'Solamente las rocas del lugar'
  ], correcta: 0, explicacion: 'El esquema del libro agrupa como abióticos a minerales del suelo, agua, aire, viento, luz y calor, en contraste con los bióticos: plantas, animales, hongos, bacterias, algas y microorganismos.' },
  { id: 'bio10u02-29', tema: 't4', pregunta: 'Según su medio, ¿cómo se clasifica un ecosistema como un lago o un océano?', opciones: [
    'Ecosistema acuático',
    'Ecosistema terrestre',
    'Ecosistema aéreo',
    'Ecosistema artificial'
  ], correcta: 0, explicacion: 'Los ecosistemas acuáticos son los que se encuentran en ríos, lagos, lagunas y océanos, ya sea de agua dulce o salada.' },
  { id: 'bio10u02-30', tema: 't4', pregunta: '¿Por qué el ecosistema aéreo se considera "de transición" según el libro?', opciones: [
    'Porque ningún ser vivo lo habita permanentemente: deben descender a tierra para descansar, alimentarse o procrear',
    'Porque solo existe durante el día',
    'Porque cambia de lugar constantemente',
    'Porque solo lo habitan las aves migratorias'
  ], correcta: 0, explicacion: 'Ningún organismo vive permanentemente en el aire; siempre debe regresar a tierra para funciones vitales como el descanso o la alimentación.' },
  { id: 'bio10u02-31', tema: 't4', pregunta: '¿Cómo se llama a la zona de la Tierra donde hay vida, que agrupa a los ecosistemas acuático, terrestre y aéreo?', opciones: [
    'Biosfera',
    'Atmósfera',
    'Litosfera',
    'Estratosfera'
  ], correcta: 0, explicacion: 'Estos tres tipos de ecosistemas agrupan lo que se llama biosfera: la zona de la Tierra donde hay vida.' },
  { id: 'bio10u02-32', tema: 't4', pregunta: 'Según el grado de intervención humana, un bosque o un desierto se clasifican como ecosistemas...', opciones: [
    'Naturales, porque el ser humano no ha intervenido en su formación',
    'Artificiales, porque siempre hay presencia humana cerca',
    'Aéreos, por su ubicación geográfica',
    'Microsistemas, por su tamaño reducido'
  ], correcta: 0, explicacion: 'Los ecosistemas naturales son aquellos en los que el ser humano no ha intervenido en su formación, como bosques, lagos y desiertos.' },
  { id: 'bio10u02-33', tema: 't4', pregunta: 'Una presa, un parque o un jardín son ejemplos de ecosistemas...', opciones: [
    'Artificiales, porque el ser humano interviene activamente en su formación',
    'Naturales, sin ninguna intervención humana',
    'Acuáticos exclusivamente',
    'Aéreos exclusivamente'
  ], correcta: 0, explicacion: 'En los ecosistemas artificiales el ser humano interviene activamente en su formación, a diferencia de los naturales.' },
  { id: 'bio10u02-34', tema: 't4', pregunta: 'Según su tamaño, ¿cómo se clasificaría una gota de agua o una maceta con su propia comunidad de organismos?', opciones: [
    'Microsistema',
    'Macrosistema',
    'Ecosistema aéreo',
    'Ecosistema artificial exclusivamente'
  ], correcta: 0, explicacion: 'Los microsistemas son tan minúsculos como una gota de agua, un florero con agua o una maceta, mientras que los macrosistemas son tan grandes como un volcán o un mar.' },

  // t5 — Amenazas a la biodiversidad (8)
  { id: 'bio10u02-35', tema: 't5', pregunta: '¿Qué es la eutrofización, mencionada en el libro como un problema que suele pasar inadvertido?', opciones: [
    'Un problema relacionado con la contaminación de cuerpos de agua que afecta la biodiversidad',
    'Un tipo de adaptación morfológica de las plantas acuáticas',
    'Un método de conservación de especies en peligro',
    'Una técnica para medir la biodiversidad'
  ], correcta: 0, explicacion: 'El libro identifica la contaminación (incluida la eutrofización) como uno de los problemas particulares que suelen pasar inadvertidos y afectan la biodiversidad.' },
  { id: 'bio10u02-36', tema: 't5', pregunta: '¿Cómo puede el cambio climático afectar directamente a la biodiversidad, según el ejemplo del libro?', opciones: [
    'El derretimiento del hielo en los casquetes polares puede dejar sin hogar a especies como los osos polares o los pingüinos',
    'Únicamente afecta el precio de los alimentos',
    'No tiene ninguna relación con la pérdida de biodiversidad',
    'Solo afecta a las especies que viven en el desierto'
  ], correcta: 0, explicacion: 'El impacto del cambio climático en especies como los osos polares y los pingüinos es una prueba de que el calentamiento global ya afecta la pérdida de biodiversidad.' },
  { id: 'bio10u02-37', tema: 't5', pregunta: '¿Qué actividades humanas se mencionan como causantes de la sobreexplotación de especies?', opciones: [
    'La obtención de productos de carne, el coleccionismo o la sobrepesca',
    'Únicamente la agricultura orgánica',
    'La creación de áreas protegidas',
    'La instalación de parques eólicos'
  ], correcta: 0, explicacion: 'El libro señala que la sobreexplotación (por productos de carne, coleccionismo o sobrepesca) acelera el ritmo de extinción de especies.' },
  { id: 'bio10u02-38', tema: 't5', pregunta: 'La finca Crucitas, en San Carlos, es un ejemplo real citado en el libro de una zona rica en biodiversidad amenazada por...', opciones: [
    'La extracción ilegal de oro',
    'La construcción de un parque nacional',
    'Un programa de reforestación',
    'Una investigación científica autorizada'
  ], correcta: 0, explicacion: 'El libro menciona que la finca Crucitas es rica en biodiversidad, pero se ha estado destruyendo por personas que insisten en la extracción ilegal de oro.' },
  { id: 'bio10u02-39', tema: 't5', pregunta: 'Según la Unión Internacional para la Conservación de la Naturaleza (IUCN), ¿qué es la "Lista Roja"?', opciones: [
    'Un listado de especies de animales y plantas amenazadas de extinción',
    'Un listado de los países más biodiversos del mundo',
    'Un registro de especies ya extintas por completo',
    'Un catálogo de ecosistemas artificiales'
  ], correcta: 0, explicacion: 'La IUCN elaboró la Lista Roja con los muchos miles de especies de animales y plantas amenazadas de extinción, aunque esta solo abarca una parte del problema.' },
  { id: 'bio10u02-40', tema: 't5', pregunta: '¿Qué está prohibido hacer con ejemplares de animales silvestres o plantas, según las recomendaciones del libro?', opciones: [
    'Atraparlos o matarlos, o recolectar plantas y frutos sin el consentimiento expreso de las autoridades',
    'Fotografiarlos desde lejos sin tocarlos',
    'Observarlos durante una gira educativa autorizada',
    'Reportar su presencia a un guardaparques'
  ], correcta: 0, explicacion: 'El libro es explícito: nunca atrapar ni matar ejemplares silvestres, ni recolectar plantas o frutos sin autorización — son delitos que dañan la diversidad biológica.' },
  { id: 'bio10u02-41', tema: 't5', pregunta: '¿Qué caso real, citado en el libro, ilustra cómo la expansión de plantaciones destruye el hábitat de una especie?', opciones: [
    'Orangutanes en Indonesia expulsados de su hábitat por trabajadores de plantaciones',
    'Perezosos costarricenses trasladados a un zoológico',
    'Ranas venenosas reintroducidas en su hábitat natural',
    'Tortugas marinas protegidas en un parque nacional'
  ], correcta: 0, explicacion: 'El libro cita el caso de orangutanes en Indonesia, cuyo hábitat original es destruido y quienes son expulsados por trabajadores de las plantaciones.' },
  { id: 'bio10u02-42', tema: 't5', pregunta: 'Además de la caza y la sobrepesca, ¿qué otras actividades se mencionan como amenazas de los puntos calientes de biodiversidad?', opciones: [
    'La tala masiva, la quema, la expansión de plantaciones como la palma aceitera, la caña de azúcar y la soja, y la expansión de la minería',
    'La creación de parques nacionales',
    'La educación ambiental en las escuelas',
    'El turismo ecológico responsable'
  ], correcta: 0, explicacion: 'Estos puntos calientes están amenazados por la gran demanda de madera tropical, la expansión de la minería y de monocultivos como la palma aceitera, la caña de azúcar y la soja.' },

  // t6 — Conservación de la biodiversidad (8)
  { id: 'bio10u02-43', tema: 't6', pregunta: 'Según datos del Estado de la Nación citados en el libro, ¿qué extensión mantuvo en 2015 el sistema nacional de áreas silvestres protegidas de Costa Rica?', opciones: [
    'Cerca de 2 855 973 hectáreas',
    'Menos de 1000 hectáreas',
    'Toda la superficie del país sin excepción',
    'Únicamente zonas urbanas'
  ], correcta: 0, explicacion: 'De esas hectáreas, 1 354 488 corresponden a la protección de sistemas terrestres (26,55%) y 1 501 485 a hábitats costeros y marinos (52,6%).' },
  { id: 'bio10u02-44', tema: 't6', pregunta: '¿Por qué es importante proteger la biodiversidad, más allá de motivos estéticos?', opciones: [
    'Porque existe una interdependencia muy estrecha entre todos los seres vivos y su hábitat: alterar unos afecta también a los demás',
    'Porque no tiene ningún efecto sobre los seres humanos',
    'Únicamente por razones legales, sin relación biológica',
    'Porque solo afecta a especies que ya están extintas'
  ], correcta: 0, explicacion: 'La pérdida de biodiversidad puede acarrear, en caso extremo, nuestra propia desaparición como especie, dada esa interdependencia entre todos los seres vivos.' },
  { id: 'bio10u02-45', tema: 't6', pregunta: '¿Qué tipo de participación ciudadana sugiere el libro respecto a proyectos que puedan perjudicar el entorno?', opciones: [
    'Informarse de forma autónoma y dar la opinión propia sobre esos proyectos',
    'No involucrarse en ningún caso',
    'Esperar a que otro país tome la decisión',
    'Ignorar el tema por completo'
  ], correcta: 0, explicacion: 'El libro recomienda ser autónomo, informarse y dar la opinión sobre proyectos que puedan perjudicar el entorno.' },
  { id: 'bio10u02-46', tema: 't6', pregunta: '¿Cuál es un ejemplo de acción individual, mencionada en el libro, para el cuido de la biodiversidad?', opciones: [
    'No atrapar ni matar ejemplares silvestres, ni recolectar plantas o frutos sin autorización',
    'Comprar únicamente productos importados',
    'Visitar zoológicos con frecuencia',
    'Aumentar el uso de plaguicidas en los cultivos'
  ], correcta: 0, explicacion: 'Estas acciones evitan delitos tipificados en la ley que dañan directamente la diversidad biológica.' },
  { id: 'bio10u02-47', tema: 't6', pregunta: 'Para promover el cuido de la biodiversidad en el centro educativo, el libro sugiere elaborar acciones que incluyan...', opciones: [
    'Un orden de prioridad, definir cuáles se ponen en práctica y con cuáles se compromete cada persona',
    'Solamente una charla informativa sin seguimiento',
    'Delegar la responsabilidad únicamente al Ministerio de Ambiente',
    'Evitar cualquier tipo de participación estudiantil'
  ], correcta: 0, explicacion: 'La guía de trabajo del libro pide reflexionar sobre el orden de prioridad de las acciones, cuáles se ponen en práctica y el compromiso de cada estudiante.' },
  { id: 'bio10u02-48', tema: 't6', pregunta: '¿Qué relación existe entre la conservación de la biodiversidad y la sociedad sostenible, según el libro?', opciones: [
    'Cada persona debe participar en promover una sociedad capaz de satisfacer sus necesidades actuales sin comprometer los recursos de otras especies',
    'No existe ninguna relación entre ambos conceptos',
    'La sostenibilidad solo depende de los gobiernos, nunca de las personas',
    'La biodiversidad y la sostenibilidad son conceptos opuestos'
  ], correcta: 0, explicacion: 'El indicador del libro pide determinar la participación de cada uno en la promoción de una sociedad sostenible, que no comprometa los recursos de otras especies.' },
  { id: 'bio10u02-49', tema: 't6', pregunta: '¿Qué porcentaje del sistema de áreas protegidas de Costa Rica (según los datos de 2015 citados en el libro) corresponde a hábitats costeros y marinos?', opciones: [
    'Cerca del 52,6%',
    'Cerca del 0,03%',
    'El 100% del sistema',
    'Ninguna parte del sistema'
  ], correcta: 0, explicacion: '1 501 485 hectáreas, equivalentes al 52,6% del sistema, corresponden a la protección de hábitats costeros y marinos.' },
  { id: 'bio10u02-50', tema: 't6', pregunta: '¿Cuál de las siguientes es una acción que disminuye la amenaza a la biodiversidad, en línea con lo estudiado en la unidad?', opciones: [
    'Apoyar y respetar las áreas protegidas y evitar la extracción ilegal de recursos naturales',
    'Promover la expansión de la minería ilegal en zonas boscosas',
    'Fomentar el coleccionismo de especies silvestres',
    'Ignorar las leyes de protección ambiental'
  ], correcta: 0, explicacion: 'Respetar las áreas protegidas y evitar actividades ilegales como la extracción de oro en zonas como Crucitas ayuda directamente a disminuir la amenaza sobre la biodiversidad.' }
];
