/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u09.js
   BIO10-U09 — Teorías sobre el origen de la vida y las especies
   ================================================================
   FUENTES (combinadas, ver también banco-bio10-u09.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad IX / Tema 9 "Teorías sobre el
       origen de la vida y las especies" — última unidad del libro,
       páginas impresas 333 a 347. Se pudo leer de forma íntegra y
       fluida casi la totalidad de esta unidad:
         · 9.1 Teorías del origen de las especies (pág. 333-338):
           Creacionismo y fijismo (Platón, Aristóteles, el catastrofismo
           de G. Cuvier, la nomenclatura binomial de Linneo), Lamarckismo
           o "uso y desuso de las partes" (con el ejemplo del cuello de
           la jirafa), Darwinismo o selección natural (Darwin y Wallace,
           el viaje del Beagle, "El Origen de las Especies" de 1859),
           Mutacionismo (Hugo de Vries, William Bateson, Thomas Hunt
           Morgan y sus experimentos con Drosophila) y Teoría sintética
           o neodarwinismo (T. Dobzhansky, con los modelos de gradualismo
           y equilibrio puntuado de S. J. Gould).
         · 9.2 Teorías del origen de la vida (pág. 339-341): Generación
           espontánea (Aristóteles, Van Helmont, el experimento de los
           frascos de Francesco Redi, el microscopio de Van Leeuwenhoek
           y el frasco de cuello curvado de Louis Pasteur) y Origen
           quimiosintético (la protoatmósfera primitiva, las cuatro
           fases propuestas por Oparín, y el experimento de Miller y
           Urey de 1953). La Teoría Cosmozoica o Panspermia solo recibe,
           en el propio libro, una mención breve dentro de la
           introducción de 9.2 (un posible origen extraplanetario de la
           vida, dentro de los últimos 13 700 millones de años de
           evolución del Universo tras el Big Bang) — el libro no le
           dedica un desarrollo propio más extenso, así que el tema 8
           de esta unidad refleja honestamente esa cobertura breve, sin
           inventar detalles adicionales.
         · Actividad 1 (pág. 342-344): incluye el ejercicio real sobre
           "las jirafas tienen el cuello y las patas muy largas" y cómo
           lo interpretarían Platón, Linneo, Lamarck y Darwin — base
           real de la Misión final de esta unidad.
         · Guía de repaso (pág. 345-346): confirma los nombres exactos
           de las teorías trabajadas por el libro (incluido el cuadro
           "Generación espontánea / Origen quimiosintético / Teoría
           Cosmozoica o Panspermia").
       El PDF del libro presentó daño real y confirmado en un punto
       puntual de esta unidad: en la página 341, la parte superior
       aparece en blanco (con un rótulo residual y fuera de lugar,
       "BIODIVERSIDAD.", que no corresponde a este tema) justo donde
       debía ir la conexión narrativa entre la formación de los mares
       primitivos y la propuesta de las cuatro fases de Oparín; además,
       la oración sobre el experimento de Miller y Urey se corta a la
       mitad ("...En el experimento se recreo"). La página 347
       ("Evaluación del tema", la última del libro) aparece
       prácticamente en blanco, salvo el encabezado decorativo — no se
       usó como fuente porque no contenía preguntas legibles.

   (b) Programa de Estudio de Biología del MEP ("Educar para una Nueva
       Ciudadanía", Educación Diversificada), Décimo año, Eje temático
       III (página 59 del programa oficial) — se usó ÚNICAMENTE para:
       (1) confirmar los nombres oficiales con los que el currículo
       nacional agrupa estas teorías ("Teorías del origen de la vida:
       Cosmozoica o Panspermia; generación espontánea y origen
       quimiosintético" / "Teorías sobre el origen de las especies: Uso
       y desuso de los órganos (Lamarck), Selección Natural (Darwin y
       Wallace) y Mutacionismo (H. de Vries, Bateson y Morgan)"), y (2)
       reconstruir la conexión puntual dañada de la página 341 del
       libro (el tema 7 de esta unidad, "Origen quimiosintético"),
       completando la explicación del experimento de Miller y Urey con
       el hecho científico ampliamente documentado y consistente con
       lo que el propio fragmento del libro ya afirmaba (que recrearon
       la atmósfera primitiva sometida a descargas eléctricas y
       obtuvieron moléculas orgánicas simples como aminoácidos) — no se
       inventaron cifras, citas ni datos adicionales más allá de
       completar esa conexión narrativa puntual.

   NOTA SOBRE LA CANTIDAD DE TEMAS: a diferencia de bio10-u01/u02/u03
   (6 temas cada una), esta unidad tiene 8 TEMAS reales, porque el
   libro desarrolla con encabezado propio 5 teorías distintas del
   origen de las especies (Creacionismo/fijismo, Lamarckismo,
   Darwinismo, Mutacionismo, Teoría sintética) y 3 teorías distintas
   del origen de la vida (Generación espontánea, Origen quimiosintético,
   Panspermia) — no se combinaron ni se inventaron temas de relleno
   para llegar a 6; se respetó exactamente lo que el libro cubre.

   Mismo patrón de plugin EXACTO que bio10-u01.js/u02.js/u03.js —
   apunta a Storage.updateBiologia10Unit / markBiologia10TopicRead /
   data.biologia10, nunca a las funciones de Química ni de Física.
   Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio10-u09';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🏛️', titulo: 'Creacionismo y fijismo: las especies inmutables',
      ideaClave: 'Antes de Darwin, se pensaba que las especies eran fijas e inmutables, creadas tal como existen y sin capacidad de cambiar con el tiempo.',
      explicacion: 'En la Antigua Grecia, <strong>Platón</strong> concebía dos mundos: uno ideal y eterno donde existían las formas perfectas de los seres vivos, y otro mundo "ilusorio" donde existían sus formas imperfectas. <strong>Aristóteles</strong>, por su parte, consideraba que había diferencia de complejidad entre los seres vivos, organizados en una escala natural desde lo más simple hasta lo más complejo. Tanto Platón como Aristóteles coincidían en que las especies eran producto de un creador, por lo que eran <strong>fijas</strong>, es decir, inmutables: no evolucionaban. El concepto de <strong>creacionismo</strong> revivió durante la Edad Media, defendiendo que todas las formas de vida son un acto creativo de Dios que nacieron durante el Génesis, a partir de una interpretación literal de la Biblia; hoy esta interpretación religiosa no puede probarse científicamente. <strong>Georges Cuvier</strong> (1769-1832), estudiando una gran cantidad de fósiles, dedujo que existían especies que habían desaparecido (se extinguían), lo cual contradecía al fijismo puro. Como era fijista, Cuvier pensó que las especies se mantenían sin cambios hasta que una gran catástrofe las hacía desaparecer, tras lo cual surgían nuevas especies que también volvían a desaparecer en otra catástrofe — una idea conocida como <strong>catastrofismo</strong>.',
      ejemplo: 'Bajo estas ideas "preevolucionistas", hasta el siglo XIX se pensó que los seres vivos eran inmutables y que habían existido siempre de la misma manera, sin sufrir cambios, fijos — de ahí el nombre de fijismo.',
      aplicacion: 'Reconocer el fijismo y el creacionismo como el punto de partida histórico ayuda a entender por qué las teorías evolucionistas posteriores (Lamarck, Darwin) representaron una ruptura tan grande con la forma en que la humanidad entendía el origen de las especies.',
      compruebra: 'Según Cuvier, ¿qué evidencia (encontrada en los fósiles) contradecía la idea de que las especies eran completamente fijas?' },

    { id: 't2', icon: '🦒', titulo: 'Lamarckismo: el uso y desuso de los órganos',
      ideaClave: 'Lamarck propuso que los órganos que un organismo usa se desarrollan más, y que esos cambios adquiridos durante su vida se heredan a la descendencia.',
      explicacion: '<strong>Juan Bautista Lamarck</strong>, zoólogo francés, publicó en 1809 su <em>Filosofía Zoológica</em>, donde sugirió que los eventos en la vida de un organismo pueden producir cambios en ese organismo; los órganos que se usan se desarrollarían más que los que no se usan — la <strong>Hipótesis o Teoría del Uso y Desuso de las Partes</strong>. Lamarck suponía que los seres vivos están animados por una fuerza innata con la cual luchan frente al antagonismo del ambiente, y aceptaba que las adaptaciones a ese ambiente, una vez fijadas, se propagaban a las generaciones sucesivas: los caracteres adquiridos se heredan. Al desarrollar esta idea, dedujo que el tamaño e importancia de un órgano se relacionaba con la ley del "uso y la falta de uso", lo cual también se hereda en el curso de las generaciones.',
      ejemplo: 'Lamarck explicaba que el cuello de las jirafas es tan largo porque las jirafas evolucionaron de animales con cuellos cortos; a medida que esos animales ancestrales estiraban el cuello para alcanzar las hojas de las ramas más altas, sus cuellos se alargaban, y Lamarck creía que ese cambio se heredaba a la progenie.',
      aplicacion: 'Hoy se sabe que, para que las características adquiridas se heredaran, tendría que existir algún mecanismo que cambiara la información genética en las células sexuales — y no hay evidencia de tal mecanismo. Por esa razón, la teoría de Lamarck se rechaza en la actualidad, aunque su idea de que el ambiente influye en los organismos abrió camino a las teorías evolucionistas posteriores.',
      compruebra: '¿Por qué se rechaza hoy la explicación de Lamarck sobre el cuello largo de las jirafas, a pesar de que en su época pareció razonable?' },

    { id: 't3', icon: '🐦', titulo: 'Darwinismo: la selección natural de Darwin y Wallace',
      ideaClave: 'Darwin y Wallace propusieron que la variación entre individuos, junto con una lucha por la existencia, hace que sobrevivan y se reproduzcan más los organismos mejor adaptados: la selección natural.',
      explicacion: '<strong>Charles Darwin</strong> embarcó como naturalista en el <em>Beagle</em>, un barco pequeño que dio la vuelta al mundo; en el viaje reunió observaciones sobre la adaptación de los seres vivos, la diversidad de las especies y sus relaciones mutuas. En 1859 publicó <em>El Origen de las Especies</em>. En 1858, Darwin recibió un manuscrito de <strong>Alfred R. Wallace</strong>, quien había llegado a la idea de la selección natural de forma independiente, inspirado igual que Darwin por el tratado de Malthus sobre el crecimiento de la población. Ambos presentaron en conjunto un informe a la Sociedad Linneo de Londres ese mismo año. La explicación de Darwin y Wallace puede resumirse así: la variación es una propiedad innata de todas las especies; de cualquier especie nacen más individuos de los que pueden obtener alimento y sobrevivir, por lo que se da una lucha por la existencia; las variaciones que capacitan mejor a un organismo para sobrevivir favorecen a sus poseedores sobre otros individuos menos adaptados ("supervivencia del más apto"); y los individuos sobrevivientes transmiten esas variaciones ventajosas a la siguiente generación.',
      ejemplo: 'Darwin refutó la creencia de que el ser humano tenía un origen divino y demostró que los seres humanos eran el resultado de un proceso de desarrollo biológico — una idea que provocó una enorme controversia y encendidos debates en su época.',
      aplicacion: 'La teoría de la selección natural de Darwin y Wallace sigue siendo, hoy en día, la explicación científica central sobre cómo ocurre la evolución de las especies, y sirvió de base para todas las teorías evolucionistas posteriores, incluida la teoría sintética.',
      compruebra: 'Según la selección natural, ¿por qué no todos los individuos de una especie logran sobrevivir y reproducirse?' },

    { id: 't4', icon: '🧫', titulo: 'Mutacionismo: las mutaciones de De Vries, Bateson y Morgan',
      ideaClave: 'El mutacionismo sostuvo que las nuevas especies se originan de golpe, por mutaciones súbitas en los genes, y no de forma gradual por selección natural.',
      explicacion: 'El botánico <strong>Hugo de Vries</strong>, estudiando la herencia mendeliana en la planta de arvejas, observó que cada tanto aparecía alguna variante que no estaba presente ni en los progenitores ni en ningún antecesor de esas plantas. De Vries denominó <strong>mutaciones</strong> a estos cambios hereditarios repentinos, y mutantes a los organismos que los exhibían; propuso una nueva teoría, el <strong>mutacionismo</strong> (o mendelismo), que eliminaba a la selección natural como fuente de evolución: "Una nueva especie se origina de repente, es producida a partir de una especie preexistente sin ninguna preparación visible y sin transición". Esta teoría fue apoyada por <strong>Thomas Hunt Morgan</strong>, quien trabajando con la mosca de la fruta (<em>Drosophila</em>) encontró que un gen preciso, ubicado en un cromosoma determinado, era responsable del color de los ojos de esos insectos — la primera vez que se hizo tal asociación entre un gen y un rasgo físico. El mutacionismo fue rebatido por los llamados <strong>biómetras</strong>, encabezados por el matemático William Bateson y el matemático Karl Pearson, según quienes la selección natural es la principal causa de la evolución, a través de los efectos acumulativos de variaciones pequeñas y continuas (variaciones métricas o cuantitativas).',
      ejemplo: 'Morgan descubrió una mosca de la fruta mutante con ojos blancos (lo normal era ojos rojos); al cruzarla con moscas normales y analizar varias generaciones, concluyó que el gen responsable del color de ojos estaba ubicado en el cromosoma X.',
      aplicacion: 'Hoy se sabe que las mutaciones son cambios abruptos en el material genético que producen variabilidad en las poblaciones naturales; aunque no determinan la dirección del cambio evolutivo, sí constituyen la fuente primaria y constante de las variaciones hereditarias que hacen posible la evolución.',
      compruebra: '¿En qué se diferencia la explicación del mutacionismo sobre el origen de una nueva especie, de la explicación de la selección natural de Darwin y Wallace?' },

    { id: 't5', icon: '🌳', titulo: 'Teoría sintética (neodarwinismo): gradualismo y equilibrio puntuado',
      ideaClave: 'La teoría sintética fusionó el darwinismo clásico con la genética moderna de Mendel: la mutación genera la variabilidad y la selección natural actúa sobre ella.',
      explicacion: 'En las décadas de 1930 y 1940 apareció la <strong>teoría sintética o neodarwinista</strong>, con el intento de fusionar el darwinismo clásico con la genética mendeliana. En ella, la mutación tiene el papel de generar diversidad genética, y sobre esa diversidad actúa la selección natural, pudiendo las mutaciones ser beneficiosas o negativas según la eficacia biológica de quien las porta; las macromutaciones no suelen ser beneficiosas, lo que imposibilita un ritmo de evolución muy rápido por esa vía. Dentro de esta teoría, los biólogos discreparon sobre la velocidad de los cambios evolutivos, dando lugar a dos modelos: el <strong>modelo del gradualismo</strong>, según el cual la especiación ocurre por la acumulación de pequeñas diferencias genéticas entre dos poblaciones que, poco a poco, divergen hasta convertirse en especies distintas (un proceso que puede tomar miles o millones de años); y el <strong>modelo del equilibrio puntuado</strong> (defendido, entre otros, por el paleontólogo Stephen Jay Gould), según el cual la especiación es un fenómeno rápido en términos geológicos, impulsado por un número relativamente pequeño de cambios genéticos, mientras que las especies permanecen estables durante prolongados periodos de tiempo entre un proceso de especiación y el siguiente.',
      ejemplo: 'Al estudiar el registro fósil, algunos paleontólogos observaron que los cambios entre especies parecían producirse mucho más rápido de lo que indicaría el gradualismo neodarwinista: cambios en pocas generaciones, en vez de a lo largo de muchísimas — la base del modelo del equilibrio puntuado.',
      aplicacion: 'Distinguir entre gradualismo y equilibrio puntuado ayuda a interpretar el registro fósil de una especie: si aparecen cambios morfológicos lentos y constantes, o si por el contrario hay largos periodos sin cambio seguidos de una especiación rápida.',
      compruebra: 'Según el modelo del equilibrio puntuado, ¿qué relación existe entre la especiación y el cambio morfológico de una especie?' },

    { id: 't6', icon: '🧪', titulo: 'La generación espontánea y su refutación',
      ideaClave: 'Durante siglos se creyó que los seres vivos podían surgir directamente de materia inerte (barro, carne en descomposición); los experimentos de Redi y Pasteur demostraron que esto es falso.',
      explicacion: 'Los pensadores de la Antigua Grecia, entre ellos Aristóteles, sostenían la idea de la <strong>generación espontánea</strong>, según la cual los seres vivos provenían directamente del barro, del estiércol y de otras materias inertes sin sufrir ningún tipo de proceso previo, simplemente aparecían. Esta idea se mantuvo durante muchos siglos, hasta el final de la Edad Media, alternándose con la creencia en el origen divino de la vida — llegándose incluso a tachar de herejes a quienes intentaban estudiar la cuestión. Entre los pensadores que apoyaban la generación espontánea destaca <strong>Van Helmont</strong> (1577-1644), que realizó experimentos sobre el origen de los seres vivos y la alimentación de las plantas, entre otros. A finales del siglo XVII comenzó a cuestionarse esta idea, sobre todo a partir de los trabajos de <strong>Francesco Redi</strong> (1626-1698), quien ideó un experimento sencillo y concluyente: metió trozos de carne en frascos cerrados y otros en frascos abiertos, y observó que la carne de los frascos cerrados no desarrollaba gusanos. Con este experimento, Redi demostró que los gusanos no aparecían por generación espontánea, sino que su presencia estaba relacionada con la posibilidad que tenían las moscas de llegar a la carne y poner sus huevos allí. La fabricación del primer microscopio por <strong>Anton van Leeuwenhoek</strong> (1632-1723) permitió descubrir los "animáculos" o seres microscópicos, que ayudaron finalmente a rechazar la idea de la generación espontánea gracias a los experimentos de <strong>Louis Pasteur</strong> (1822-1895), quien demostró, por un lado, que los microorganismos se encontraban por todas partes y provocaban la descomposición de los alimentos y muchas enfermedades humanas, y por otro, que la generación espontánea no existía.',
      ejemplo: 'Pasteur hirvió un caldo dentro de un frasco de cuello curvado (en forma de "cuello de cisne"), de manera que el aire podía entrar pero el polvo y los microbios quedaban retenidos en la curva; el caldo permaneció sin microorganismos mientras el frasco se mantuvo en posición vertical, pero se contaminó apenas se inclinaba y el líquido tocaba la zona donde se habían acumulado el polvo y los microbios.',
      aplicacion: 'En su propio experimento con líquidos alterables (agua de levadura de cerveza, orina, jugo de remolacha, agua de pimiento) hervidos en un frasco de cuello curvado, Pasteur concluyó: "…he de señalar que aun a pesar de sorprender a todos los que se ocupan de los delicados experimentos relacionados con la llamada generación espontánea, el líquido del frasco permanece inalterado definitivamente…"',
      compruebra: '¿Por qué el experimento del frasco de cuello curvado de Pasteur permitía que entrara aire, pero igual demostraba que la generación espontánea no existía?' },

    { id: 't7', icon: '🌋', titulo: 'Origen quimiosintético: de la materia inerte a las primeras células',
      ideaClave: 'La teoría del origen quimiosintético (propuesta por Oparín) explica que la vida se originó a partir de materia inerte, mediante una serie de reacciones químicas que fueron formando moléculas cada vez más complejas.',
      explicacion: 'La opinión más extendida en el ámbito científico es que la vida evolucionó de la materia inerte en algún momento entre hace 4400 millones de años, cuando se dieron las condiciones para que el vapor de agua pudiera condensarse por primera vez, y 2700 millones de años, cuando la proporción entre isótopos estables de carbono, hierro y azufre, además de biomarcadores moleculares, indican que ya existía la fotosíntesis. Hace 4500 millones de años, la Tierra era una inmensa bola incandescente en la que los distintos elementos se colocaron según su densidad: los más densos formaron el núcleo, y los más ligeros salieron hacia el exterior formando la <strong>protoatmósfera</strong>, con gases como el metano, el amoníaco y el vapor de agua. Esos gases estaban sometidos a intensas radiaciones ultravioletas del Sol y a fuertes descargas eléctricas (como relámpagos), por lo que reaccionaron entre sí dando lugar a moléculas cada vez más complejas; al enfriarse la Tierra, comenzó a llover de forma torrencial, y esas lluvias arrastraron las moléculas de la atmósfera hacia los mares primitivos que se iban formando. Básicamente, <strong>Oparín</strong> propuso cuatro fases para la formación de la vida a partir de materia inorgánica: 1) se formaron moléculas orgánicas simples; 2) se dio la polimerización de dichas moléculas; 3) ocurrió una organización de moléculas complejas; y 4) se dio la formación de células primitivas.',
      ejemplo: 'El experimento que demostró la validez de esta teoría fue el realizado en 1953 por los bioquímicos estadounidenses <strong>Stanley L. Miller</strong> y <strong>Harold C. Urey</strong>, quienes recrearon en el laboratorio las condiciones que se cree existían en la atmósfera primitiva (una mezcla de gases como metano, amoníaco, hidrógeno y vapor de agua, sometida a descargas eléctricas) y obtuvieron moléculas orgánicas simples, entre ellas aminoácidos.',
      aplicacion: 'Hace 3900 millones de años el planeta ya tenía agua — se han encontrado piedrillas pulidas por el agua y rocas, de 3500 millones de años, llenas de bacterias —, lo que es consistente con que la vida haya aparecido en la Tierra hace entre 3800 y 3600 millones de años, a partir de reacciones químicas como las que propone esta teoría.',
      compruebra: 'Según las cuatro fases que propuso Oparín, ¿qué tendría que ocurrir primero para que, finalmente, se formaran células primitivas?' },

    { id: 't8', icon: '☄️', titulo: 'Teoría Cosmozoica o Panspermia',
      ideaClave: 'La panspermia (o teoría cosmozoica) plantea la posibilidad de que la vida, o los compuestos que la originaron, tengan un origen extraplanetario o extraterrestre.',
      explicacion: 'Entre las ideas e hipótesis sobre el origen de la vida se encuentra la de un posible origen extraplanetario o extraterrestre de la vida, conocida como <strong>panspermia</strong> (o <strong>teoría cosmozoica</strong>), que habría podido darse en algún momento durante los últimos 13 700 millones de años de evolución del Universo conocido, tras el Big Bang. A diferencia de la generación espontánea y del origen quimiosintético — que explican la aparición de la vida a partir de materia inerte presente en la propia Tierra —, la panspermia plantea que la vida (o sus componentes básicos) pudo haberse originado fuera del planeta y haber llegado hasta la Tierra.',
      ejemplo: 'Al plantear el origen de la vida en la Tierra, el libro de texto menciona esta hipótesis junto a las demás teorías del origen de la vida, como una de las explicaciones que la comunidad científica ha considerado a lo largo del tiempo, junto con la generación espontánea y el origen quimiosintético.',
      aplicacion: 'Comparar la panspermia con la generación espontánea y el origen quimiosintético ayuda a distinguir entre teorías que explican la vida como resultado de procesos que ocurrieron en la propia Tierra, y una teoría que traslada la pregunta del origen de la vida a un escenario extraterrestre.',
      compruebra: '¿En qué se diferencia la teoría de la panspermia de las teorías de la generación espontánea y del origen quimiosintético en cuanto al lugar donde se habría originado la vida?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Origen de las especies o de la vida?": 10
     afirmaciones reales de la unidad para clasificar si pertenecen a
     una teoría del origen de las ESPECIES o del origen de la VIDA.
     Mismo patrón exacto que Sim1 de bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'El cuello largo de la jirafa se explica porque sus antepasados de cuello corto lo estiraban para alcanzar las hojas más altas.', correcta: 'especies', explica: 'Es una teoría del origen de las especies: es el ejemplo clásico de Lamarck y su teoría del uso y desuso.' },
    { texto: 'La vida evolucionó de la materia inerte en algún momento entre hace 4400 y 2700 millones de años.', correcta: 'vida', explica: 'Es una teoría del origen de la vida: corresponde al origen quimiosintético.' },
    { texto: 'Las especies son fijas e inmutables, creadas tal como existen por un creador.', correcta: 'especies', explica: 'Es una teoría del origen de las especies: corresponde al creacionismo y al fijismo.' },
    { texto: 'Francesco Redi demostró, con carne en frascos abiertos y cerrados, que los gusanos no surgían de la carne por sí solos.', correcta: 'vida', explica: 'Es una teoría del origen de la vida: es la refutación de la generación espontánea.' },
    { texto: 'Darwin y Wallace explicaron que sobreviven y se reproducen más los individuos mejor adaptados.', correcta: 'especies', explica: 'Es una teoría del origen de las especies: es la selección natural del darwinismo.' },
    { texto: 'Miller y Urey recrearon la atmósfera primitiva en el laboratorio y obtuvieron aminoácidos.', correcta: 'vida', explica: 'Es una teoría del origen de la vida: es el experimento que apoyó el origen quimiosintético.' },
    { texto: 'De Vries propuso que las nuevas especies aparecen de golpe por mutaciones súbitas.', correcta: 'especies', explica: 'Es una teoría del origen de las especies: es el mutacionismo.' },
    { texto: 'La panspermia plantea que la vida pudo tener un origen extraterrestre.', correcta: 'vida', explica: 'Es una teoría del origen de la vida: es la teoría cosmozoica o panspermia.' },
    { texto: 'La teoría sintética combina la selección natural de Darwin con la genética de Mendel.', correcta: 'especies', explica: 'Es una teoría del origen de las especies: es la teoría sintética o neodarwinismo.' },
    { texto: 'Oparín propuso cuatro fases para explicar cómo, a partir de materia inorgánica, se formaron las primeras células.', correcta: 'vida', explica: 'Es una teoría del origen de la vida: es el origen quimiosintético.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 10 situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-sim1-opcion="especies">Origen de las especies</button>
          <button class="btn btn-ghost" data-sim1-opcion="vida">Origen de la vida</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de teorías": 2 fases, mismo patrón
     exacto que Sim2 de bio10-u01.js/u02.js/u03.js — (A) explorar
     libremente las 8 teorías reales de la unidad, y (B) un quiz de 2ª
     fase donde MQC da una afirmación real y el estudiante elige a qué
     teoría corresponde.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'creacionismo', nombre: '🏛️ Creacionismo y fijismo', areas: 'Las especies fueron creadas tal como existen y no cambian.' },
    { id: 'lamarckismo', nombre: '🦒 Lamarckismo', areas: 'Los órganos que se usan se desarrollan más, y esos cambios se heredan (uso y desuso).' },
    { id: 'darwinismo', nombre: '🐦 Darwinismo', areas: 'Sobreviven y se reproducen más los individuos mejor adaptados (selección natural).' },
    { id: 'mutacionismo', nombre: '🧫 Mutacionismo', areas: 'Las nuevas especies surgen de golpe por mutaciones súbitas en los genes.' },
    { id: 'sintetica', nombre: '🌳 Teoría sintética', areas: 'La mutación genera variabilidad y la selección natural actúa sobre ella.' },
    { id: 'generacionEspontanea', nombre: '🧪 Generación espontánea', areas: 'Los seres vivos surgirían directamente de materia inerte, sin ningún proceso previo.' },
    { id: 'quimiosintetico', nombre: '🌋 Origen quimiosintético', areas: 'La vida se originó por reacciones químicas que formaron moléculas cada vez más complejas.' },
    { id: 'panspermia', nombre: '☄️ Panspermia', areas: 'La vida (o sus componentes) pudo tener un origen extraterrestre.' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Cuvier estudió fósiles y concluyó que había especies que se habían extinguido, lo que dio origen al catastrofismo.', opciones: ['Creacionismo y fijismo', 'Darwinismo', 'Mutacionismo', 'Panspermia'], correcta: 0 },
    { fenomeno: 'El cuello de las jirafas se alargó porque los antepasados lo estiraban para alcanzar las hojas más altas, y ese cambio se heredó.', opciones: ['Lamarckismo', 'Darwinismo', 'Generación espontánea', 'Teoría sintética'], correcta: 0 },
    { fenomeno: 'Darwin y Wallace explicaron la evolución mediante la variación, la lucha por la existencia y la supervivencia del más apto.', opciones: ['Darwinismo', 'Lamarckismo', 'Mutacionismo', 'Origen quimiosintético'], correcta: 0 },
    { fenomeno: 'De Vries observó variantes súbitas en las plantas de arvejas que no estaban en ningún antecesor, y las llamó mutaciones.', opciones: ['Mutacionismo', 'Darwinismo', 'Creacionismo y fijismo', 'Panspermia'], correcta: 0 },
    { fenomeno: 'Esta teoría fusiona el darwinismo con la genética mendeliana, e incluye los modelos de gradualismo y equilibrio puntuado.', opciones: ['Teoría sintética', 'Mutacionismo', 'Lamarckismo', 'Generación espontánea'], correcta: 0 },
    { fenomeno: 'Redi demostró con frascos abiertos y cerrados que los gusanos no surgían solos de la carne en descomposición.', opciones: ['Generación espontánea', 'Origen quimiosintético', 'Panspermia', 'Darwinismo'], correcta: 0 },
    { fenomeno: 'Oparín propuso cuatro fases para explicar cómo la materia inorgánica pudo formar las primeras células.', opciones: ['Origen quimiosintético', 'Generación espontánea', 'Panspermia', 'Mutacionismo'], correcta: 0 },
    { fenomeno: 'Esta teoría plantea que la vida pudo tener un origen extraplanetario o extraterrestre.', opciones: ['Panspermia', 'Origen quimiosintético', 'Creacionismo y fijismo', 'Teoría sintética'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada teoría para ver qué establece.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos la teoría →</button>
      </div>`;
  }
  function renderSim2Quiz() {
    if (_sim2RondaIdx >= RONDAS_SIM2.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste el simulador!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = RONDAS_SIM2[_sim2RondaIdx];
    if (!_sim2OpcionesMezcladas.length) _sim2OpcionesMezcladas = _mezclarConCorrecta(r.opciones, r.correcta);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Fase 2 — Ronda ${_sim2RondaIdx + 1} de ${RONDAS_SIM2.length}</p>
        <p style="margin-bottom:1rem">${r.fenomeno}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿A qué teoría corresponde?</p>
        <div style="display:grid;gap:.5rem">
          ${_sim2OpcionesMezcladas.opciones.map((op, i) => `<button class="btn btn-ghost" data-sim2q-opcion="${i}">${op}</button>`).join('')}
        </div>
        <p id="sim2q-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  function _mezclarConCorrecta(opciones, correctaIdx) {
    const indices = opciones.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
    return { opciones: indices.map(i => opciones[i]), correcta: indices.indexOf(correctaIdx) };
  }

  /* ================================================================
     SIMULADOR 3 — "El frasco de cuello curvado de Pasteur": escenario
     guiado en 2 pasos, con el experimento real que refutó la
     generación espontánea. Mismo patrón exacto que Sim3 de
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: <strong>Louis Pasteur</strong> diseñó un frasco de vidrio con el cuello largo y curvado, como el cuello de un cisne. Vertió un caldo en el frasco, lo hirvió, y lo dejó enfriar sin sellar la abertura: el aire podía entrar y salir libremente, pero el cuello curvado retenía el polvo y los microbios.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> si el frasco se deja en posición vertical, sin inclinarlo, ¿qué pasará con el caldo?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="sinmicrobios">Permanecerá sin microorganismos</button>
            <button class="btn btn-ghost" data-sim3-opcion="conmicrobios">Se llenará de microorganismos igual</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ¿por qué ocurre esto, si el aire puede entrar libremente al frasco?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="curva">Porque el polvo y los microbios quedan atrapados en la curva del cuello, sin poder llegar al caldo</button>
            <button class="btn btn-ghost" data-sim3-opcion2="airesolo">Porque el aire por sí solo no puede provocar ninguna reacción química</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">El experimento de Pasteur demostró que la generación espontánea no existe: el caldo permanece sin microorganismos mientras el polvo y los microbios queden retenidos en la curva del cuello, y solo se contamina cuando, al inclinar el frasco, entran en contacto con el caldo — es decir, los microorganismos provienen de otros microorganismos o del ambiente, no aparecen por sí solos.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/u02.js/u03.js) */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source, { disciplina: 'biologia', grado: 10 }); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','biologia10-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().biologia10[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateBiologia10Unit === 'function') {
      try { Storage.updateBiologia10Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markBiologia10TopicRead === 'function') {
      try { Storage.markBiologia10TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }

  /* ================================================================
     TEORÍA — 8 temas en acordeón. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  function _bloqueTema(etiqueta, texto, color, esPregunta) {
    if (!texto) return '';
    return `
      <div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid ${color}">
        <p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:${color};margin:0 0 .25rem">${etiqueta}</p>
        <p style="margin:0;${esPregunta ? 'font-style:italic' : ''}">${texto}</p>
      </div>`;
  }

  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const total = TEMAS.length;
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;

    const items = TEMAS.map((t, i) => {
      const isRead = leidos.includes(t.id);
      return `
        <div class="bio10-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="bio10-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">
              ${isRead ? '✓ leído' : ''}
            </span>
            <span class="bio10-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="bio10-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.6">
            ${_bloqueTema('💡 IDEA CLAVE', t.ideaClave, 'var(--xp-gold,#F9FF4D)')}
            ${_bloqueTema('📘 EXPLICACIÓN', t.explicacion, C)}
            ${_bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
            ${_bloqueTema('🌐 APLICACIÓN REAL', t.aplicacion, 'var(--violet)')}
            ${_bloqueTema('❓ COMPRUEBA', t.compruebra, 'var(--text-muted)', true)}
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" data-read="${i}" data-tema="${t.id}" ${isRead ? 'disabled' : ''}>
                ${isRead ? '✓ Tema leído' : '📖 Marcar como leído (+15 XP)'}
              </button>
              ${isRead ? '<span style="font-size:.78rem;color:var(--green)">¡Bien! XP otorgado.</span>' : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="bio10-teoria" style="animation:pageIn .4s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.85rem;margin:0">Progreso: ${leidosCount}/${total} temas leídos</p>
        </div>
        ${items}
      </div>`;
  }
  function bindTeoria(unit, uData) {
    document.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-acc-toggle');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const caret = btn.querySelector('.bio10-acc-caret');
        if (body) {
          const abierto = body.style.display !== 'none';
          body.style.display = abierto ? 'none' : 'block';
          if (caret) caret.style.transform = abierto ? '' : 'rotate(180deg)';
        }
      });
    });
    document.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const temaId = btn.getAttribute('data-tema');
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(temaId);
        markRead(temaId);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        const container = document.querySelector('.bio10-teoria').parentElement;
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const i = btn.closest('[data-acc]').getAttribute('data-acc');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const head = document.querySelector(`[data-acc-toggle="${i}"] .bio10-acc-caret`);
        if (body) { body.style.display = 'block'; if (head) head.style.transform = 'rotate(180deg)'; }
      });
    });
  }

  /* ================================================================
     SIMULADORES — 3 experiencias. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  function markSimDone(simId) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP('simulator-done');
    }
  }
  let _simActivo = null;
  let _sim1Idx = 0;

  function renderSimuladores(unit, uData) {
    if (_simActivo === 'sim1') return `<div class="sim-grid">${renderSim1(_sim1Idx)}</div>`;
    if (_simActivo === 'sim2') return `<div class="sim-grid">${renderSim2()}</div>`;
    if (_simActivo === 'sim3') return `<div class="sim-grid">${renderSim3()}</div>`;

    const hechos = uData.simsDone || [];
    const metas = [
      { id: 'sim1', titulo: '🧬 ¿Origen de las especies o de la vida?', desc: '10 afirmaciones reales de la unidad para distinguir si pertenecen a una teoría del origen de las especies o del origen de la vida.' },
      { id: 'sim2', titulo: '🔭 Explorador de teorías', desc: 'Explorá las 8 teorías reales de la unidad y después probá identificando vos mismo a cuál corresponde cada afirmación, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🧪 El frasco de cuello curvado de Pasteur', desc: 'Un escenario guiado paso a paso con el experimento real que refutó la generación espontánea.' }
    ];
    return `
      <div class="sim-grid" style="display:grid;gap:1rem">
        ${metas.map(s => `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem">
            <h3 style="margin:0 0 .4rem">${hechos.includes(s.id) ? '✅' : ''} ${s.titulo}</h3>
            <p style="color:var(--text-secondary);font-size:.88rem">${s.desc}</p>
            <button class="btn btn-primary btn-sm" data-sim-abrir="${s.id}">${hechos.includes(s.id) ? 'Repasar' : 'Comenzar'}</button>
          </div>
        `).join('')}
      </div>`;
  }

  function _rerenderSimTab(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderSimuladores(unit, loadUnitData()); bindSimuladores(unit, loadUnitData()); }
  }

  function bindSimuladores(unit, uData) {
    document.querySelectorAll('[data-sim-abrir]').forEach(btn => {
      btn.addEventListener('click', () => {
        _simActivo = btn.getAttribute('data-sim-abrir');
        _sim1Idx = 0; _sim2Fase = 'explorar'; _sim2RondaIdx = 0; _sim2OpcionesMezcladas = []; _sim3Paso = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => {
        markSimDone(btn.getAttribute('data-sim-cerrar'));
        _simActivo = null;
        _rerenderSimTab(unit);
      });
    });

    document.querySelectorAll('[data-sim1-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-sim1-opcion');
        const s = SITUACIONES_SIM1[_sim1Idx];
        const fb = document.getElementById('sim1-feedback');
        if (fb) {
          const ok = elegido === s.correcta;
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = (ok ? '✅ ' : '💡 ') + s.explica;
        }
        setTimeout(() => {
          _sim1Idx++;
          if (_sim1Idx >= SITUACIONES_SIM1.length) markSimDone('sim1');
          _rerenderSimTab(unit);
        }, 1400);
      });
    });

    document.querySelectorAll('[data-sim2-el]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = ELEMENTOS_SIM2.find(x => x.id === btn.getAttribute('data-sim2-el'));
        const fb = document.getElementById('sim2-feedback');
        if (fb && el) fb.innerHTML = `<strong>${el.nombre}</strong> → ${el.areas}`;
      });
    });
    const irQuiz = document.getElementById('sim2-ir-quiz');
    if (irQuiz) irQuiz.addEventListener('click', () => { _sim2Fase = 'quiz'; _sim2RondaIdx = 0; _sim2OpcionesMezcladas = []; _rerenderSimTab(unit); });

    document.querySelectorAll('[data-sim2q-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-sim2q-opcion'), 10);
        const fb = document.getElementById('sim2q-feedback');
        const ok = idx === _sim2OpcionesMezcladas.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 La teoría correcta era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
        }
        setTimeout(() => {
          _sim2RondaIdx++;
          _sim2OpcionesMezcladas = [];
          if (_sim2RondaIdx >= RONDAS_SIM2.length) markSimDone('sim2');
          _rerenderSimTab(unit);
        }, 1300);
      });
    });

    const sim3Sig = document.getElementById('sim3-siguiente');
    if (sim3Sig) sim3Sig.addEventListener('click', () => { _sim3Paso = 1; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-sim3-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback');
        const correcta = btn.getAttribute('data-sim3-opcion') === 'sinmicrobios';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: mientras el frasco permanezca en posición vertical, el caldo permanece sin microorganismos.'
            : '💡 En realidad permanece sin microorganismos: el polvo y los microbios quedan retenidos en la curva del cuello mientras el frasco no se incline.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'curva';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el polvo y los microbios quedan atrapados en la curva del cuello, así que nunca llegan a tocar el caldo.'
            : '💡 En realidad es porque el polvo y los microbios quedan atrapados en la curva del cuello del frasco — no llegan a tocar el caldo mientras el frasco no se incline.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de teorías": 5 escenarios reales, con pistas
     que orientan sin revelar la respuesta. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js: SIN XP al solo iniciar un nivel, y
     game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Cuvier, tras estudiar una gran cantidad de fósiles, dedujo que había especies que se extinguían, dando origen a la corriente conocida como catastrofismo.',
      pista: 'Pensá en la idea de que las especies eran fijas, pero podían desaparecer en grandes catástrofes.',
      correcta: 'Creacionismo y fijismo', opciones: ['Creacionismo y fijismo', 'Mutacionismo', 'Panspermia', 'Teoría sintética'] },
    { id: 'nivel2', escenario: 'Un experimento demostró que los gusanos no aparecían por sí solos en la carne, sino que dependían de que las moscas pudieran poner sus huevos en ella.',
      pista: 'Pensá en el experimento de los frascos abiertos y cerrados de Redi.',
      correcta: 'Generación espontánea', opciones: ['Generación espontánea', 'Origen quimiosintético', 'Panspermia', 'Darwinismo'] },
    { id: 'nivel3', escenario: 'Miller y Urey recrearon en el laboratorio la atmósfera primitiva, sometida a descargas eléctricas, y obtuvieron aminoácidos.',
      pista: 'Pensá en la teoría que explica el origen de la vida a partir de materia inorgánica mediante reacciones químicas.',
      correcta: 'Origen quimiosintético', opciones: ['Origen quimiosintético', 'Generación espontánea', 'Panspermia', 'Mutacionismo'] },
    { id: 'nivel4', escenario: 'De Vries observó, en plantas de arvejas, variantes súbitas que no estaban presentes en ningún antecesor, y las llamó mutaciones.',
      pista: 'Pensá en la teoría que elimina a la selección natural como fuente de evolución.',
      correcta: 'Mutacionismo', opciones: ['Mutacionismo', 'Darwinismo', 'Lamarckismo', 'Teoría sintética'] },
    { id: 'nivel5', escenario: 'Esta teoría fusiona el darwinismo clásico con la genética mendeliana, e incluye los modelos de gradualismo y equilibrio puntuado.',
      pista: 'Pensá en la teoría que surgió en las décadas de 1930 y 1940.',
      correcta: 'Teoría sintética', opciones: ['Teoría sintética', 'Mutacionismo', 'Lamarckismo', 'Panspermia'] }
  ];
  let _juegoIdx = null;
  let _juegoOpcionesMezcladas = [];
  let _juegoFeedback = null;

  function renderJuego(unit, uData) {
    const nivelesHechos = uData.gameLevels || [];
    if (_juegoIdx === null) {
      const primerPendiente = NIVELES_JUEGO.findIndex(n => !nivelesHechos.includes(n.id));
      _juegoIdx = primerPendiente === -1 ? NIVELES_JUEGO.length : primerPendiente;
    }
    if (_juegoIdx >= NIVELES_JUEGO.length) {
      return `
        <div class="juego-panel" style="text-align:center">
          <h3>✅ ¡Completaste los ${NIVELES_JUEGO.length} escenarios!</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Ya resolviste todo el juego de esta unidad.</p>
        </div>`;
    }
    const n = NIVELES_JUEGO[_juegoIdx];
    if (!_juegoOpcionesMezcladas.length) _juegoOpcionesMezcladas = _mezclar(n.opciones);
    return `
      <div class="juego-panel">
        <h3 style="margin:0 0 .3rem">🕵️ Detective de Teorías</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿A qué teoría corresponde este escenario?</p>
        <div style="display:grid;gap:.5rem">
          ${_juegoOpcionesMezcladas.map(op => `<button class="btn btn-ghost" data-juego-opcion="${op}">${op}</button>`).join('')}
        </div>
        ${_juegoFeedback ? `<p style="margin-top:.9rem;font-size:.85rem;color:${_juegoFeedback.correcto ? 'var(--green)' : 'var(--gold)'}">${_juegoFeedback.texto}</p>` : ''}
      </div>`;
  }
  function _mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function bindJuego(unit, uData) {
    document.querySelectorAll('[data-juego-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegida = btn.getAttribute('data-juego-opcion');
        const n = NIVELES_JUEGO[_juegoIdx];
        const acierto = elegida === n.correcta;
        if (acierto) {
          const u = loadUnitData();
          const done = Array.isArray(u.gameLevels) ? u.gameLevels.slice() : [];
          const yaResuelto = done.includes(n.id);
          if (!yaResuelto) done.push(n.id);
          patchUnit({ gameLevels: done, gameScore: done.length });
          if (!yaResuelto) awardXP(done.length >= NIVELES_JUEGO.length ? 'game-won' : 'game-played');
          _juegoFeedback = { texto: `✅ ¡Correcto! Es ${n.correcta}.`, correcto: true };
          setTimeout(() => { _juegoIdx++; _juegoOpcionesMezcladas = []; _juegoFeedback = null; _rerenderJuego(unit); }, 1500);
        } else {
          _juegoFeedback = { texto: '💡 No es esa. Volvé a leer la pista y probá otra opción.', correcto: false };
        }
        _rerenderJuego(unit);
      });
    });
  }
  function _rerenderJuego(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderJuego(unit, loadUnitData()); bindJuego(unit, loadUnitData()); }
  }

  /* ================================================================
     EXAMEN — banco real (js/data/banco-bio10-u09.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U09 !== 'undefined') ? PREGUNTAS_BIO10_U09 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U09</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 20 al azar.</p>
        <button class="btn btn-primary" id="bio10-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div id="bio10-exam-opts" style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
        <div id="bio10-exam-fb" style="margin-top:1rem"></div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('bio10-iniciar-examen');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const banco = _bancoDisponible().slice();
        for (let i = banco.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [banco[i], banco[j]] = [banco[j], banco[i]]; }
        const seleccionadas = banco.slice(0, Math.min(20, banco.length));
        const preguntasMezcladas = seleccionadas.map(q => {
          const indices = q.opciones.map((_, idx) => idx);
          for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
          return {
            ...q,
            opciones: indices.map(idx => q.opciones[idx]),
            correcta: indices.indexOf(q.correcta)
          };
        });
        _examEnCurso = { preguntas: preguntasMezcladas, i: 0, correctas: 0 };
        _rerenderExamen(unit);
      });
    }
    document.querySelectorAll('[data-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-opcion'), 10);
        const q = _examEnCurso.preguntas[_examEnCurso.i];
        const ok = idx === q.correcta;
        if (ok) _examEnCurso.correctas++;

        const opts = document.getElementById('bio10-exam-opts');
        opts.querySelectorAll('[data-opcion]').forEach(b => {
          const k = parseInt(b.getAttribute('data-opcion'), 10);
          b.disabled = true;
          if (k === q.correcta) b.style.borderColor = 'var(--green)';
          if (k === idx && !ok) b.style.borderColor = 'var(--red)';
        });

        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react(ok ? 'topic-read' : 'answer-wrong'); } catch (e) {} }

        const esUltima = _examEnCurso.i >= _examEnCurso.preguntas.length - 1;
        document.getElementById('bio10-exam-fb').innerHTML = `
          <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                      border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
            <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
            <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion || ''}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="bio10-exam-next" style="margin-top:.8rem">
            ${esUltima ? 'Finalizar examen' : 'Siguiente pregunta →'}
          </button>`;
        document.getElementById('bio10-exam-next').addEventListener('click', () => {
          _examEnCurso.i++;
          if (_examEnCurso.i >= _examEnCurso.preguntas.length) _finalizarExamen(unit);
          else _rerenderExamen(unit);
        });
      });
    });
  }
  function _rerenderExamen(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderExamen(unit, loadUnitData()); bindExamen(unit, loadUnitData()); }
  }
  function _finalizarExamen(unit) {
    const score = Math.round((_examEnCurso.correctas / _examEnCurso.preguntas.length) * 100);
    const passed = score >= (unit.exam && unit.exam.pass || 70);
    const u = loadUnitData();
    const prevBest = u.examBest || 0;
    const yaOtorgadoAntes = !!u.examXpAwarded;
    patchUnit({
      examBest: Math.max(prevBest, score),
      examAttempts: (u.examAttempts || 0) + 1,
      examXpAwarded: u.examXpAwarded || passed
    });
    if (passed && !yaOtorgadoAntes) awardXP('exam-done');
    _examEnCurso = null;
    const tc = document.getElementById('tab-content');
    if (tc) {
      tc.innerHTML = `
        <div style="max-width:520px;text-align:center">
          <h3>${passed ? '🎉 ¡Aprobado!' : '📚 Seguí practicando'}</h3>
          <p style="font-size:1.6rem;font-weight:700">${score}%</p>
          <button class="btn btn-primary" id="bio10-volver-examen">Volver</button>
        </div>`;
      const b = document.getElementById('bio10-volver-examen');
      if (b) b.addEventListener('click', () => _rerenderExamen(unit));
    }
  }

  /* ================================================================
     MISIÓN FINAL — "Bajo la lupa: el cuello largo de la jirafa"
     (mismo patrón exacto que bio10-u01.js/u02.js/u03.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía
     missionDone). Caso real de la Actividad 1 del libro (pág. 342-344:
     "las jirafas tienen el cuello y las patas muy largas", y cómo lo
     interpretarían Platón, Linneo, Lamarck y Darwin), combinado con la
     explicación textual de Lamarck sobre el cuello de las jirafas
     (pág. 334) y su rechazo actual (pág. 335).
     ================================================================ */
  const MISION_A_OPCIONES = [
    'Los antepasados de cuello corto lo estiraban para alcanzar las hojas más altas',
    'Los cambios adquiridos durante la vida del animal se heredaban a la descendencia',
    'Las jirafas siempre tuvieron el cuello largo, desde su creación',
    'El cuello largo apareció de golpe por una mutación súbita'
  ];
  const MISION_A_CORRECTAS = ['Los antepasados de cuello corto lo estiraban para alcanzar las hojas más altas', 'Los cambios adquiridos durante la vida del animal se heredaban a la descendencia'];
  const MISION_B_OPCIONES = [
    'Porque no hay evidencia de que las características adquiridas durante la vida de un organismo se hereden',
    'Porque las jirafas ya no existen en la actualidad',
    'Porque Lamarck nunca estudió a las jirafas',
    'Porque las jirafas no tienen realmente el cuello largo'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Habría variación en el largo del cuello entre los individuos, y los de cuello más largo tendrían ventaja para alimentarse y sobrevivir, transmitiendo esa característica',
    'Los individuos estirarían el cuello a propósito y ese esfuerzo se heredaría directamente',
    'Todas las jirafas nacerían con el cuello exactamente igual de largo, sin ninguna variación',
    'El cuello largo aparecería únicamente después de una catástrofe global'
  ];
  const MISION_C_CORRECTA = 0;
  const MISION_D_MIN = 30, MISION_D_MAX = 250;

  let _misionA = [];
  let _misionB = null;
  let _misionC = null;
  let _misionD = '';

  function _misionValida() {
    const aOk = _misionA.length === MISION_A_CORRECTAS.length && MISION_A_CORRECTAS.every(x => _misionA.includes(x));
    const bOk = _misionB === MISION_B_CORRECTA;
    const cOk = _misionC === MISION_C_CORRECTA;
    const dOk = _misionD.trim().length >= MISION_D_MIN && _misionD.trim().length <= MISION_D_MAX;
    return aOk && bOk && cOk && dOk;
  }

  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el cuello largo de la jirafa".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🦒 Misión: Bajo la lupa — el cuello largo de la jirafa</h3>
        <p style="color:var(--text-secondary)">Texto base (Actividad 1 del libro): "Las jirafas tienen el cuello y las patas muy largas". Lamarck explicaba que el cuello de las jirafas es tan largo porque las jirafas evolucionaron de animales con cuellos cortos; a medida que estos animales ancestrales estiraban el cuello para alcanzar las hojas en las ramas más altas de los árboles, sus cuellos se alargaban. Lamarck creía que estos cambios se pasaban a la progenie y llamó a esto la herencia de características adquiridas. Sin embargo, un gran número de científicos han hecho experimentos para probar la teoría de Lamarck, y no hay evidencia que apoye la idea de la herencia de características adquiridas. Por eso, se rechaza la idea en la actualidad.</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. Según el texto, ¿qué plantea la explicación de Lamarck sobre el cuello de las jirafas? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Por qué se rechaza hoy en día la explicación de Lamarck sobre el cuello de las jirafas?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. Según Darwin y Wallace, ¿cómo se explicaría el cuello largo de las jirafas mediante la selección natural, a diferencia de Lamarck?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. En tus propias palabras, ¿cuál es la diferencia clave entre la explicación de Lamarck (uso y desuso) y la de Darwin y Wallace (selección natural) para el cuello largo de las jirafas?</p>
          <textarea id="mision-d" rows="3" maxlength="${MISION_D_MAX}" placeholder="Escribí tu respuesta (mínimo ${MISION_D_MIN} caracteres)..." style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.6rem;font-family:inherit;font-size:.88rem">${_misionD}</textarea>
          <p style="font-size:.72rem;color:${dLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'};margin:.3rem 0 0">${dLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</p>
        </div>

        <button class="btn btn-primary" id="bio10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }

  function bindMision(unit, uData) {
    document.querySelectorAll('[data-mision-a]').forEach(chk => {
      chk.addEventListener('change', () => {
        const val = chk.getAttribute('data-mision-a');
        if (chk.checked) { if (!_misionA.includes(val)) _misionA.push(val); }
        else { _misionA = _misionA.filter(x => x !== val); }
        _rerenderMision(unit);
      });
    });
    document.querySelectorAll('[data-mision-b]').forEach(rad => {
      rad.addEventListener('change', () => { _misionB = parseInt(rad.getAttribute('data-mision-b'), 10); _rerenderMision(unit); });
    });
    document.querySelectorAll('[data-mision-c]').forEach(rad => {
      rad.addEventListener('change', () => { _misionC = parseInt(rad.getAttribute('data-mision-c'), 10); _rerenderMision(unit); });
    });
    const dArea = document.getElementById('mision-d');
    if (dArea) {
      dArea.addEventListener('input', () => {
        _misionD = dArea.value;
        const contador = dArea.parentElement.querySelector('p');
        const len = _misionD.trim().length;
        if (contador) {
          contador.textContent = `${len}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})`;
          contador.style.color = len >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)';
        }
        const btn = document.getElementById('bio10-entregar-mision');
        if (btn) {
          const valido = _misionValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    }
    const btn = document.getElementById('bio10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte de la misión.';
          return;
        }
        const _misionYaOtorgada = !!loadUnitData().missionDone;
        patchUnit({ missionDone: true });
        if (!_misionYaOtorgada) awardXP('biologia10-mission-done');
        const tc = document.getElementById('tab-content');
        if (tc) tc.innerHTML = renderMision(unit, loadUnitData());
      });
    }
  }
  function _rerenderMision(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderMision(unit, loadUnitData()); bindMision(unit, loadUnitData()); }
  }

  /* ── Registro en el sistema de pestañas (mismo mecanismo exacto que
     bio10-u01.js/u02.js/u03.js — ver biologia10.js) ──────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
