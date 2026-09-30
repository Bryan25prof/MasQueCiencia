/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u06.js
   BIO10-U06 — La herencia y su manipulación
   ================================================================
   FUENTES (ver también banco-bio10-u06.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad VI / Tema 6 "La herencia y su
       manipulación", páginas impresas 209 a 245. A diferencia de
       BIO10-U03, el archivo del libro se pudo leer de forma completa
       en este rango (página por página, con pikepdf + pdftoppm,
       confirmando visualmente el número de página impreso en cada
       una) — sin páginas en blanco, saltos de numeración ni
       recuadros dañados que afectaran contenido central. Solo dos
       recuadros de respuesta de actividad (espacios en blanco para
       que el estudiante escriba, en las páginas 228 y 236) aparecen
       vacíos por diseño, no por daño: son espacios de trabajo del
       cuaderno del estudiante, no contenido de texto perdido.
       Contenido real usado: 6.1 Mendel y su aporte (pág. 209),
       6.2 conceptos básicos de genética —carácter, gen, meiosis,
       cromosomas homólogos, locus, alelo, fenotipo, genotipo,
       herencia dominante/recesiva, homocigoto/heterocigoto— (pág.
       210-212), 6.3 experimentos de Mendel con Pisum sativum y el
       cruce de flor púrpura x blanca, además de las tres leyes de
       Mendel (pág. 212-217), 6.4 cuadros de Punnett con sus reglas y
       los 6 ejemplos reales de cruces monohíbridos con conejos,
       semillas, vainas, moscas y arvejas enanas (pág. 217-219),
       6.5 herencia de los genes del mismo cromosoma y el cruce
       dihíbrido de semilla lisa/amarilla con proporción 9:3:3:1
       (pág. 220-221), 6.6 excepciones a la III Ley de Mendel —
       quiasmas, recombinación genética y sexual— (pág. 221),
       6.7 herencia ligada al sexo con el árbol genealógico real de
       la Reina Victoria de Inglaterra y la hemofilia, el caso real
       del monocromatismo de conos azules (MCA) con su árbol
       genealógico, y dominancia incompleta (dondiego de noche),
       codominancia (toros) y alelos múltiples (grupos sanguíneos ABO
       y factor Rh) (pág. 222-228), 6.8 científicos que aportaron a
       la genética —Sutton, Bateson, Morgan, McClintock, Sanger,
       Venter, Doudna/CRISPR-Cas9— y centros de investigación reales
       de Costa Rica (CIBCM, CIMAR-UCR) (pág. 229-230), 6.9
       enfermedades poco frecuentes en Costa Rica —más de 20 000
       personas afectadas, 80% de origen genético según el médico
       Manuel Saborío del Hospital de Niños— (pág. 231), y 6.10
       bancos genéticos —de datos forenses, de esperma/óvulos/
       embriones y de semillas (Svalbard Global Seed Vault,
       Millennium Seed Bank)— (pág. 231). Los ejercicios reales de
       "Actividad 2: Cruces monohíbridos" (frijoles rojos/negros,
       vaina verde/amarilla, guisantes flor violeta/blanca, gallinas
       negro/blanco, pág. 237-240) y "Actividad 3: Cruces dihíbridos
       y herencia no mendeliana" (tomate rojo/amarillo y normal/enano,
       daltonismo, factor Rh, pág. 241-243) también se usaron como
       base real de ejemplos y del juego.

   (b) Programa de Estudio de Biología del MEP ("Educar para una
       Nueva Ciudadanía", Educación Diversificada, Décimo año), Eje
       temático II, Criterios de Evaluación y Situaciones de
       Aprendizaje sobre los descubrimientos de Mendel, Nettie
       Stevens, Thomas H. Morgan y Reginald Punnett (página 48 del
       programa oficial) — consultado únicamente para confirmar que
       el recorte de contenido del libro coincide con lo exigido por
       el programa oficial. NO fue necesario usarlo para reconstruir
       ninguna parte dañada del libro, porque esta unidad no presentó
       daño real de contenido en su rango de páginas.

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
  const UNIT_ID = 'bio10-u06';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🌱', titulo: 'Gregorio Mendel y sus experimentos',
      ideaClave: 'Mendel, mediante cruces controlados con arvejas (Pisum sativum) de raza pura, descubrió las tres leyes que explican cómo se transmiten las características hereditarias.',
      explicacion: 'Johann Gregorio Mendel fue un biólogo austriaco que ingresó al monasterio Agustino de Königskloster, cerca de Brünn. A partir de 1856 realizó experimentos de cruzamientos con guisantes en el jardín del monasterio. Eligió esta especie porque se autofertiliza, tiene características fácilmente observables (con solo dos o tres fenotipos por carácter) y produce descendencia fértil. Trabajó obteniendo primero <strong>líneas puras</strong> mediante cultivos convencionales, y luego cruzó variedades distintas mediante polinización artificial. Al cruzar una arveja de flor blanca con otra de flor púrpura (generación P), obtuvo semillas que, al plantarlas, dieron la primera generación filial o <strong>F1</strong>: el 100% de las plantas tuvo flores púrpura. Al dejar que la F1 se autopolinizara, la <strong>F2</strong> resultó en 3/4 partes de flores púrpura y 1/4 parte de flores blancas — el carácter blanco, que parecía haber desaparecido, reapareció. De estos resultados, Mendel formuló sus tres leyes: la <strong>I Ley (uniformidad de los híbridos de la F1)</strong> indica que al cruzar dos variedades de raza pura para un carácter, todos los híbridos de la F1 son iguales; la <strong>II Ley (Segregación)</strong> indica que los factores hereditarios se encuentran en pares y se segregan (separan) al formarse los gametos; y la <strong>III Ley (segregación independiente de los caracteres)</strong> indica que, al formarse los gametos, los dos alelos de un gen se separan independientemente de los alelos de otro gen.',
      ejemplo: 'En el cruce de flores de arveja, Mendel demostró que el color púrpura es dominante sobre el blanco, que es recesivo. Sus trabajos con guisantes no fueron reconocidos en su época pese a haberlos remitido a la máxima autoridad de biología de entonces, W. von Nägeli; solo hasta que H. de Vries, C. E. Correns y E. Tschernack von Seysenegg redescubrieron sus leyes, más de treinta años después, se le atribuyó a Mendel la prioridad del descubrimiento.',
      aplicacion: 'Las leyes de Mendel siguen siendo la base para predecir los resultados de cualquier cruce genético, desde el color de las semillas hasta enfermedades hereditarias humanas. Fueron explicadas con mayor detalle, después, por el biólogo estadounidense Thomas Hunt Morgan (1866-1945), reconocido como el padre de la genética experimental moderna.',
      compruebra: '¿Por qué crees que fue tan importante para Mendel trabajar primero con líneas puras, antes de realizar sus cruces?' },

    { id: 't2', icon: '🧬', titulo: 'Conceptos básicos de la genética',
      ideaClave: 'Para comprender los mecanismos de la herencia es necesario dominar términos precisos: carácter, gen, alelo, locus, fenotipo, genotipo, homocigoto y heterocigoto, entre otros.',
      explicacion: 'Un <strong>carácter</strong> es una característica observable y transmitida por los genes, como el color de las flores, la forma de una semilla o rasgos del comportamiento. Un <strong>gen</strong> es un segmento específico de ADN, responsable de un carácter determinado, y constituye la unidad funcional de la herencia; se le llama <strong>carácter específico</strong> al que distingue una especie de otra, y <strong>carácter individual</strong> al que distingue a los individuos de una misma especie. La <strong>meiosis</strong> es la división celular que origina cuatro células con la mitad de la dotación cromosómica de la célula original (haploides). Los <strong>cromosomas homólogos</strong> son un par de cromosomas, uno de la madre y uno del padre, que comparten la misma estructura y los mismos loci (aunque no necesariamente los mismos alelos). El <strong>locus</strong> (plural loci) es el lugar físico que un gen ocupa en un cromosoma. Un <strong>alelo</strong> es una de las formas alternativas que puede tener un gen en un mismo locus. El <strong>fenotipo</strong> son las características físicas observables de un organismo, mientras que el <strong>genotipo</strong> es su composición genética completa —el conjunto de alelos que posee—, que es más amplio que el fenotipo porque no todos los alelos se manifiestan. Entre dos alelos, el que tiene más fuerza para manifestarse se llama <strong>alelo dominante</strong>, y el más débil, <strong>alelo recesivo</strong>: cuando están juntos, el dominante se manifiesta y el recesivo queda oculto. Un organismo <strong>homocigoto</strong> tiene dos alelos iguales para un gen; uno <strong>heterocigoto</strong> tiene dos alelos diferentes, y en ese caso se expresa el alelo dominante.',
      ejemplo: 'Los grupos sanguíneos humanos A, B y O son producidos por distintos alelos del mismo gen. El color de cabello claro u oscuro también son alelos de un mismo gen. Si un individuo tiene cabello oscuro y es homocigoto, ambos alelos de sus cromosomas homólogos codifican el color oscuro; si fuera heterocigoto, uno de los alelos sería oscuro (dominante) y el otro claro (recesivo), y en su fenotipo se mostraría el color dominante.',
      aplicacion: 'Estos mismos términos se usan para describir cualquier cruce genético real, como el de los conejos de pelaje negro (N, dominante) y blanco (n, recesivo) que se estudian en los cuadros de Punnett de esta unidad.',
      compruebra: '¿Cuál es la diferencia central entre fenotipo y genotipo? Explicá con un ejemplo propio.' },

    { id: 't3', icon: '📊', titulo: 'Cuadros de Punnett y cruces monohíbridos',
      ideaClave: 'El cuadro de Punnett es una representación ordenada que permite determinar los fenotipos y genotipos probables de los descendientes de un cruce genético.',
      explicacion: 'El cuadro de Punnett se construye siguiendo reglas precisas: primero se asignan letras a los alelos (mayúscula para el dominante, minúscula para el recesivo, usando la misma letra); luego, conociendo el genotipo de los padres, se determinan los tipos de gametos que pueden producir; y finalmente se dibuja el cuadro, de forma que el número de filas corresponda a los gametos masculinos y el número de columnas a los óvulos. Los resultados no implican que cada apareamiento produzca exactamente esa cantidad de descendientes, sino que permiten calcular la <strong>fracción o porcentaje</strong> esperado. En un cruce monohíbrido (una sola característica), existen 4 combinaciones posibles de gametos.',
      ejemplo: 'El libro presenta seis ejemplos reales de cruces monohíbridos: (a) dos conejos homocigotos de ojos negros (NN x NN) dan 100% homocigotos dominantes de ojos negros; (b) un conejo negro homocigoto (NN) con uno blanco homocigoto (nn) da 100% heterocigotos de pelaje negro; (c) una planta de semilla lisa homocigota (LL) con una heterocigota (Ll) da 50% homocigotos y 50% heterocigotos, pero 100% semilla lisa; (d) dos plantas heterocigotas de vaina verde (Vv x Vv) dan 3/4 vaina verde y 1/4 vaina amarilla; (e) una mosca heterocigota de ojos rojos (Rr) con una de ojos blancos (rr) da 50% ojos rojos y 50% ojos blancos; y (f) dos arvejas enanas homocigotas recesivas (gg x gg) dan 100% plantas enanas.',
      aplicacion: 'Estos mismos pasos se usan para resolver cualquier problema real de herencia, como calcular la probabilidad de que un hijo humano herede un grupo sanguíneo o un rasgo físico determinado, a partir del genotipo conocido de sus padres.',
      compruebra: 'Si se cruzan dos plantas heterocigotas para la forma de la semilla (Ll x Ll), sabiendo que lisa es dominante, ¿qué proporción de fenotipos esperarías en la descendencia?' },

    { id: 't4', icon: '🔗', titulo: 'Herencia ligada al mismo cromosoma y cruces dihíbridos',
      ideaClave: 'Los genes del mismo cromosoma tienden a heredarse juntos (ligados); un cruce dihíbrido analiza dos caracteres a la vez y solo se separan por completo si ocurre recombinación genética durante la meiosis.',
      explicacion: 'Los genes son parte de los cromosomas, y cada cromosoma contiene muchos genes. Los genes del mismo cromosoma tienden a heredarse juntos, ya que se encuentran <strong>ligados</strong>. Solo los genes localizados en cromosomas diferentes se distribuyen de forma realmente independiente, como lo señala la III Ley de Mendel. Un <strong>cruzamiento dihíbrido</strong> analiza dos características a la vez (por oposición al monohíbrido, que analiza solo una); tiene 16 posibles genotipos en el cuadro de Punnett, y la F2 resultante de cruzar dos dobles heterocigotos muestra la proporción fenotípica clásica <strong>9:3:3:1</strong>. Sin embargo, algunas veces los genes del mismo cromosoma no permanecen juntos: durante la profase I de la meiosis, las cromátidas de los cromosomas homólogos se entrelazan, produciendo puntos llamados <strong>quiasmas</strong>. Este intercambio de segmentos de ADN forma nuevas combinaciones genéticas y se llama <strong>recombinación genética</strong>; además, como los hijos reciben un cromosoma homólogo de cada progenitor (genéticamente distintos entre sí), ocurre también <strong>recombinación sexual</strong>. Ambos procesos generan una gran variabilidad genética, importante para el mantenimiento de la especie.',
      ejemplo: 'Al cruzar una semilla lisa y amarilla (LLAA) con una rugosa y verde (llaa), toda la F1 resulta lisa y amarilla, heterocigota para ambos caracteres (LlAa). Al autofecundar la F1, la F2 muestra la proporción 9 lisas y amarillas : 3 lisas y verdes : 3 rugosas y amarillas : 1 rugosa y verde — es decir, 9:3:3:1.',
      aplicacion: 'En un problema real del libro, se cruzó una planta de tomate de pulpa roja y tamaño normal con otra de pulpa amarilla y normal, obteniendo 30 rojas normales, 30 amarillas normales, 10 rojas enanas y 10 amarillas enanas — un resultado que se analiza identificando primero si el cruce es monohíbrido o dihíbrido, y luego los genotipos de cada progenitor.',
      compruebra: '¿Por qué los genes ligados en el mismo cromosoma son una excepción a la III Ley de Mendel, y qué proceso puede hacer que, aun así, se separen?' },

    { id: 't5', icon: '⚧️', titulo: 'Herencia ligada al sexo y herencia no mendeliana',
      ideaClave: 'Los genes ligados al cromosoma X explican por qué enfermedades como la hemofilia o el MCA afectan casi siempre a los varones; además, existen patrones de herencia distintos al dominante-recesivo simple: la herencia intermedia, la codominancia y los alelos múltiples.',
      explicacion: 'Los genes que se encuentran en un cromosoma sexual (X o Y), pero no en los demás cromosomas, se llaman <strong>genes ligados al sexo</strong>. Como las mujeres tienen dos cromosomas X y los varones solo uno (además de un Y), un varón expresa cualquier alelo recesivo ligado al X que herede, mientras que una mujer heterocigota puede ser <strong>portadora sana</strong>. El árbol genealógico real de la Reina Victoria de Inglaterra muestra que la <strong>hemofilia</strong> afectó a varios de sus descendientes varones, aunque ella misma no la padecía: era heterocigota (portadora), y probablemente un cambio (mutación) ocurrió en uno de los gametos que la originaron. El mismo patrón se observa en el <strong>monocromatismo de conos azules (MCA)</strong>, una enfermedad recesiva ligada al cromosoma X que causa incapacidad grave para discriminar colores, baja agudeza visual, nistagmo y fotofobia: en su árbol genealógico, los varones enfermos siempre están relacionados entre sí a través de mujeres portadoras, y nunca hay transmisión de hombre a hombre. Además de la herencia dominante-recesiva simple, existen otros patrones: en la <strong>herencia intermedia (dominancia incompleta)</strong>, el heterocigoto muestra una condición intermedia entre los dos fenotipos parentales —como el dondiego de noche, donde flores rojas (RR) x blancas (rr) producen F1 100% rosada (Rr)—; en la <strong>codominancia</strong>, ambos alelos se expresan a la vez sin mezclarse, como en el cruce de toros de pelaje café rojizo con blanco, que produce descendencia con pelaje manchado; y en los <strong>alelos múltiples</strong>, un gen tiene más de dos variantes posibles, como en el sistema de grupos sanguíneos ABO (alelos IA, IB e i, donde IA e IB son codominantes entre sí y ambos dominan sobre i) y en el factor Rh.',
      ejemplo: 'En un problema real del libro, Juan tiene factor Rh+ heterocigoto y se casa con Marta, de factor Rh- Rh-; el cuadro de Punnett muestra que sus hijos tendrán 50% Rh+ heterocigoto y 50% Rh- homocigoto.',
      aplicacion: 'Comprender la herencia ligada al sexo permite entender por qué el daltonismo y la hemofilia son mucho más frecuentes en hombres que en mujeres, y por qué los bancos de sangre deben respetar la compatibilidad entre los tipos A, B, AB y O al hacer transfusiones.',
      compruebra: 'Según el árbol genealógico de la Reina Victoria, ¿por qué nunca se observa transmisión de la hemofilia de padre a hijo varón?' },

    { id: 't6', icon: '🔬', titulo: 'Científicos, enfermedades y bancos genéticos',
      ideaClave: 'El trabajo de Mendel fue retomado y ampliado por científicos posteriores; hoy Costa Rica cuenta con centros de investigación genética propios, enfrenta enfermedades poco frecuentes de origen genético, y existen bancos genéticos con distintos propósitos.',
      explicacion: 'La importancia del trabajo de Mendel no se comprendió sino hasta principios del siglo XX. Entre los aportes históricos destacan: <strong>Walter Sutton</strong> (1903), quien estableció la hipótesis de que los cromosomas, segregados de modo mendeliano, son las unidades hereditarias; <strong>William Bateson</strong> (1904-1906), quien acuñó el término "genética"; <strong>Thomas Hunt Morgan</strong> (1910), quien demostró que los genes residen en los cromosomas; <strong>Bárbara McClintock</strong> (1948), quien describió los elementos transponibles ("genes saltarines") en el genoma del maíz; <strong>Frederick Sanger</strong>, quien obtuvo dos Premios Nobel por secuenciar la insulina (1958) y por sus técnicas de secuenciación del ADN (1980); <strong>John Craig Venter</strong>, pionero en secuenciar el genoma humano y crear la primera célula con genoma sintético (2010); y más recientemente la bioquímica <strong>Jennifer Doudna</strong>, cocreadora de la tecnología <strong>CRISPR-Cas9</strong> para "editar" el ADN. En Costa Rica, el Centro de Investigación en Biología Celular y Molecular (CIBCM) de la UCR investiga genética humana y de plantas, y el Laboratorio de Genética y Biología Molecular de Organismos Acuáticos (Cimar-UCR) trabaja con el ADN de especies acuáticas. Más de <strong>20 000 personas</strong> en Costa Rica padecen enfermedades poco frecuentes (como hipotiroidismo congénito, fenilcetonuria o galactosemia); según el médico <strong>Manuel Saborío</strong>, coordinador de Medicina Genética del Hospital de Niños, el <strong>80%</strong> de esas enfermedades son de origen genético. Por último, existen distintos tipos de <strong>bancos genéticos</strong>: los bancos de datos genéticos forenses, que cotejan muestras de un delito con el perfil de sospechosos; los bancos de esperma, óvulos y embriones, usados en reproducción asistida; y los bancos de semillas, como el Svalbard Global Seed Vault (Noruega) y el Millennium Seed Bank (Inglaterra), que conservan la diversidad vegetal del planeta.',
      ejemplo: 'En Costa Rica, las genetistas Anya Lobo Prada y Alejandro Leal hallaron una nueva mutación ligada a la discapacidad intelectual, mientras que Sandra Silva y Gina Murillo publicaron el hallazgo de una mutación que daña el esmalte dental, en la revista Human Molecular Genetics.',
      aplicacion: 'Los bancos de semillas como el Svalbard Global Seed Vault, ubicado en una isla del norte de Noruega, conservan hoy más de mil millones de semillas en condiciones de humedad y temperatura estables (cerca de -20°C), como reserva ante la pérdida de biodiversidad vegetal.',
      compruebra: '¿Por qué creés que los bancos de esperma, óvulos y embriones generan controversias éticas, a diferencia de los bancos de semillas?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Dominante o recesivo?": 10 situaciones reales
     (arvejas de Mendel, conejos, moscas) para clasificar si un rasgo
     descrito es DOMINANTE o RECESIVO. Mismo patrón exacto que Sim1
     de bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'En las arvejas de Mendel, la semilla de forma lisa, frente a la arrugada.', correcta: 'dominante', explica: 'Es dominante: según la Figura #1 del libro, la forma lisa domina sobre la arrugada.' },
    { texto: 'En las arvejas de Mendel, la semilla de forma arrugada, frente a la lisa.', correcta: 'recesivo', explica: 'Es recesivo: la forma arrugada solo se manifiesta si no hay un alelo liso presente.' },
    { texto: 'En las arvejas de Mendel, el color amarillo de la semilla, frente al verde.', correcta: 'dominante', explica: 'Es dominante: el color amarillo de la semilla domina sobre el verde.' },
    { texto: 'En las arvejas de Mendel, el color verde de la semilla, frente al amarillo.', correcta: 'recesivo', explica: 'Es recesivo: el color verde solo se expresa en homocigotos recesivos.' },
    { texto: 'En las arvejas de Mendel, la vaina de forma inflada, frente a la contraída.', correcta: 'dominante', explica: 'Es dominante: la forma inflada de la vaina domina sobre la contraída.' },
    { texto: 'En las arvejas de Mendel, la vaina de color amarillo, frente a la verde.', correcta: 'recesivo', explica: 'Es recesivo: el color verde de la vaina domina sobre el amarillo.' },
    { texto: 'En las arvejas de Mendel, la flor de color púrpura, frente a la blanca.', correcta: 'dominante', explica: 'Es dominante: en el cruce clásico de Mendel, el color púrpura ocultó al blanco en la F1.' },
    { texto: 'En las arvejas de Mendel, la planta de tamaño enano, frente a la alta.', correcta: 'recesivo', explica: 'Es recesivo: el tamaño alto domina sobre el enano.' },
    { texto: 'En los conejos del ejemplo del libro, el pelaje de color negro (N), frente al blanco (n).', correcta: 'dominante', explica: 'Es dominante: el cruce NN x nn produjo 100% de descendientes heterocigotos con pelaje negro.' },
    { texto: 'En las moscas del ejemplo del libro, los ojos de color blanco (r), frente a los rojos (R).', correcta: 'recesivo', explica: 'Es recesivo: el color rojo de ojos (R) domina sobre el blanco (r).' }
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
          <button class="btn btn-ghost" data-sim1-opcion="dominante">Dominante</button>
          <button class="btn btn-ghost" data-sim1-opcion="recesivo">Recesivo</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Resolvé el cuadro de Punnett": 2 fases, mismo
     patrón exacto que Sim2 de bio10-u03.js — (A) explorar libremente
     los 6 cruces monohíbridos reales del libro (conejos, semillas,
     vaina, mosca, arveja enana), y (B) un quiz de 2ª fase donde MQC
     da el cruce y el estudiante elige el resultado correcto.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'conejosNN', nombre: '🐇 Conejos NN x NN', areas: 'Genotipo: 100% homocigotos dominantes · Fenotipo: 100% ojos negros' },
    { id: 'conejoNn', nombre: '🐇 Conejo negro NN x conejo blanco nn', areas: 'Genotipo: 100% heterocigotos · Fenotipo: 100% pelaje negro' },
    { id: 'semillaLisa', nombre: '🌱 Semilla lisa LL x semilla Ll', areas: 'Genotipo: 50% homocigotos, 50% heterocigotos · Fenotipo: 100% semilla lisa' },
    { id: 'vainaVv', nombre: '🌿 Vaina verde Vv x Vv', areas: 'Genotipo: 25% VV, 50% Vv, 25% vv · Fenotipo: 75% vaina verde, 25% amarilla' },
    { id: 'moscaRr', nombre: '🪰 Mosca ojos rojos Rr x ojos blancos rr', areas: 'Genotipo: 50% heterocigotos, 50% homocigotos recesivos · Fenotipo: 50% ojos rojos, 50% ojos blancos' },
    { id: 'arvejaGg', nombre: '🌾 Arvejas enanas gg x gg', areas: 'Genotipo: 100% homocigotos recesivos · Fenotipo: 100% plantas enanas' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Se cruzan dos conejos homocigotos de ojos negros, genotipo NN.', opciones: ['100% de los descendientes homocigotos dominantes con ojos negros', '75% ojos negros y 25% ojos blancos', '50% heterocigotos y 50% homocigotos recesivos', '100% de los descendientes con ojos blancos'], correcta: 0 },
    { fenomeno: 'Se cruza un conejo macho de pelaje negro homocigota (NN) con una hembra de pelaje blanco también homocigota (nn).', opciones: ['100% de los descendientes heterocigotos con pelaje negro', '100% de los descendientes con pelaje blanco', '50% heterocigotos y 50% homocigotos recesivos', '75% pelaje negro y 25% pelaje blanco'], correcta: 0 },
    { fenomeno: 'Se cruza una planta homocigota de semilla lisa (LL) con otra heterocigota (Ll).', opciones: ['50% homocigotos dominantes y 50% heterocigotos, pero 100% semilla lisa', '25% semilla lisa y 75% semilla arrugada', '100% semilla arrugada', '50% semilla lisa y 50% semilla arrugada'], correcta: 0 },
    { fenomeno: 'Se cruzan dos plantas de vaina verde heterocigotas (Vv), sabiendo que el verde es dominante.', opciones: ['75% vaina verde y 25% vaina amarilla', '100% vaina verde', '25% vaina verde y 75% vaina amarilla', '50% vaina verde y 50% vaina amarilla'], correcta: 0 },
    { fenomeno: 'Se cruza una mosca de ojos rojos heterocigota (Rr) con otra de ojos blancos (rr).', opciones: ['50% moscas con ojos rojos y 50% con ojos blancos', '100% moscas con ojos rojos', '75% ojos rojos y 25% ojos blancos', '100% moscas con ojos blancos'], correcta: 0 },
    { fenomeno: 'Se cruzan dos plantas de arvejas enanas homocigotas recesivas (gg).', opciones: ['100% de los descendientes serán plantas enanas homocigotas recesivas', '100% de los descendientes serán plantas altas', '50% altas y 50% enanas', '75% altas y 25% enanas'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada cruce real del libro para ver su genotipo y fenotipo esperados.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el resultado →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es el resultado esperado en la descendencia?</p>
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
     SIMULADOR 3 — "Hemofilia en la familia de la Reina Victoria":
     escenario guiado en 2 pasos, con el caso real del árbol
     genealógico de la Reina Victoria de Inglaterra. Mismo patrón
     exacto que Sim3 de bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: el árbol genealógico real de la <strong>Reina Victoria de Inglaterra</strong> muestra que la <strong>hemofilia</strong> (un trastorno que reduce la capacidad de coagulación de la sangre) afectó a varios de sus descendientes. Todos los individuos afectados en el árbol son varones.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> ¿por qué la hemofilia, al ser un gen ligado al cromosoma X, afecta casi exclusivamente a los varones?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="unsolox">Porque los varones tienen un solo cromosoma X, y un único alelo recesivo basta para expresar la enfermedad</button>
            <button class="btn btn-ghost" data-sim3-opcion="inmunes">Porque las mujeres son inmunes a todas las enfermedades genéticas</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> la Reina Victoria nunca padeció hemofilia, pero varios de sus hijos y nietos sí. ¿Cómo se explica esto?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="portadora">Porque ella era heterocigota (portadora): tenía un alelo normal y uno con la mutación de hemofilia</button>
            <button class="btn btn-ghost" data-sim3-opcion2="soloY">Porque la hemofilia solo se transmite por el cromosoma Y</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Al tener un solo cromosoma X, los varones expresan cualquier alelo recesivo que porten en él. Una mujer heterocigota, en cambio, puede ser portadora sana gracias al alelo normal de su segundo cromosoma X — así es como la Reina Victoria transmitió la hemofilia sin padecerla ella misma.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/u02.js/u03.js) ── */
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
     TEORÍA — 6 temas en acordeón. Mismo patrón exacto que
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
      { id: 'sim1', titulo: '🌱 ¿Dominante o recesivo?', desc: '10 situaciones reales de las arvejas de Mendel, conejos y moscas para clasificar rasgos dominantes y recesivos.' },
      { id: 'sim2', titulo: '📊 Resolvé el cuadro de Punnett', desc: 'Explorá los 6 cruces monohíbridos reales del libro (conejos, semillas, vaina, mosca, arveja enana) y después probá prediciendo vos mismo el resultado.' },
      { id: 'sim3', titulo: '👑 Hemofilia en la Reina Victoria', desc: 'Un escenario guiado paso a paso con el caso real de la herencia ligada al sexo en el árbol genealógico de la Reina Victoria de Inglaterra.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El resultado correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'unsolox';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: al tener un solo cromosoma X, basta un alelo recesivo para que el varón manifieste la enfermedad.'
            : '💡 En realidad es porque los varones tienen un solo cromosoma X: un único alelo recesivo basta para que se manifieste la enfermedad, sin un segundo alelo que lo enmascare.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'portadora';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: al ser heterocigota (portadora), la Reina Victoria tenía un alelo normal que la protegía, pero pudo transmitir el alelo con la mutación a su descendencia.'
            : '💡 En realidad es porque ella era heterocigota (portadora): tenía un alelo normal y uno con la mutación de hemofilia, y el gen no se transmite por el cromosoma Y.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de la herencia": 5 escenarios reales para
     identificar el tipo de herencia o cruce genético involucrado, con
     pistas que orientan sin revelar la respuesta. Mismo patrón exacto
     que bio10-u01.js/u02.js/u03.js: SIN XP al solo iniciar un nivel, y
     game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Se cruza una planta de tomate de pulpa roja y tamaño normal con otra de pulpa amarilla y normal, y se obtienen: 30 rojas normales, 30 amarillas normales, 10 rojas enanas y 10 amarillas enanas.',
      pista: 'Contá cuántas características diferentes se están analizando a la vez: el color de la pulpa Y el tamaño de la planta.',
      correcta: 'Cruce dihíbrido (dos características a la vez)', opciones: ['Cruce dihíbrido (dos características a la vez)', 'Cruce monohíbrido (una sola característica)', 'Herencia ligada al sexo', 'Codominancia'] },
    { id: 'nivel2', escenario: 'Al cruzar una planta de dondiego de noche de flores rojas (RR) con otra de flores blancas (rr), la F1 no resulta ni roja ni blanca, sino 100% rosada (Rr).',
      pista: 'Pensá en un color que queda "a medio camino" entre los dos progenitores, sin que ninguno domine del todo.',
      correcta: 'Herencia intermedia (dominancia incompleta)', opciones: ['Herencia intermedia (dominancia incompleta)', 'Codominancia', 'Herencia ligada al sexo', 'Alelos múltiples'] },
    { id: 'nivel3', escenario: 'Se cruzan dos toros de líneas puras, uno de pelaje café rojizo y otro blanco. La F1 resulta 100% heterocigota y 100% con pelaje manchado, mostrando ambos colores a la vez.',
      pista: 'Pensá en un caso donde NINGÚN color domina sobre el otro: ambos se expresan al mismo tiempo, sin mezclarse.',
      correcta: 'Codominancia', opciones: ['Codominancia', 'Herencia intermedia (dominancia incompleta)', 'Herencia ligada al sexo', 'Herencia dominante-recesiva simple'] },
    { id: 'nivel4', escenario: 'El sistema de grupos sanguíneos ABO está codificado por tres alelos posibles: IA, IB e i. Los alelos IA e IB son codominantes entre sí, y ambos dominan sobre i, dando cuatro tipos de sangre posibles: A, B, AB y O.',
      pista: 'Pensá en un gen que tiene más de dos versiones posibles, no solo dos alelos.',
      correcta: 'Alelos múltiples', opciones: ['Alelos múltiples', 'Herencia ligada al sexo', 'Herencia intermedia', 'Cruce dihíbrido'] },
    { id: 'nivel5', escenario: 'En el árbol genealógico de la Reina Victoria de Inglaterra, todos los varones afectados por hemofilia están relacionados entre sí a través de mujeres, y nunca hay transmisión de hombre a hombre.',
      pista: 'Pensá en el cromosoma que un varón nunca recibe de su padre.',
      correcta: 'Herencia ligada al sexo', opciones: ['Herencia ligada al sexo', 'Codominancia', 'Alelos múltiples', 'Cruce dihíbrido'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective de la Herencia</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de herencia o cruce es este?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u06.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U06 !== 'undefined') ? PREGUNTAS_BIO10_U06 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U06</h3>
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
     MISIÓN FINAL — "Bajo la lupa: el monocromatismo de conos azules
     (MCA)" (mismo patrón exacto que bio10-u01.js/u02.js/u03.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía
     missionDone). Caso real citado en el libro, con datos reales
     (enfermedad recesiva ligada al cromosoma X, árbol genealógico
     real con la nota "no es posible la transmisión de hombre a
     hombre").
     ================================================================ */
  const MISION_A_OPCIONES = ['Incapacidad grave para discriminar los colores', 'Baja agudeza visual, nistagmo y fotofobia', 'Es una enfermedad dominante ligada al cromosoma Y', 'Afecta por igual a hombres y mujeres'];
  const MISION_A_CORRECTAS = ['Incapacidad grave para discriminar los colores', 'Baja agudeza visual, nistagmo y fotofobia'];
  const MISION_B_OPCIONES = [
    'Porque cuenta con el gen intacto de su otro cromosoma X',
    'Porque las mujeres no tienen cromosoma X',
    'Porque el MCA solo puede heredarse por vía materna',
    'Porque las mujeres tienen el doble de conos fotorreceptores que los hombres'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Los varones enfermos siempre están relacionados entre sí a través de las mujeres, y nunca hay transmisión de hombre a hombre',
    'Todos los enfermos del árbol genealógico son mujeres',
    'Se transmite igual sin importar el sexo de los padres',
    'Solo se hereda si ambos padres son portadores'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el monocromatismo de conos azules (MCA)".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>👁️ Misión: Bajo la lupa — el monocromatismo de conos azules (MCA)</h3>
        <p style="color:var(--text-secondary)">Texto base: "El monocromatismo de conos azules (MCA) es una enfermedad recesiva ligada al cromosoma X que se caracteriza por una incapacidad grave para discriminar los colores, baja agudeza visual, nistagmo y fotofobia a causa de la disfunción de los conos fotorreceptores del rojo (L) y el verde (M). El MCA es una forma incompleta de acromatopsia. Una mujer con una mutación en uno de sus dos cromosomas X no se ve afectada por el trastorno, porque cuenta también con el gen intacto del otro cromosoma X. Un varón que tenga un problema en un gen del cromosoma X sí padecerá la enfermedad, ya que cuenta solo con el cromosoma X con la copia del gen con la mutación. En el árbol genealógico de una familia con MCA, los varones enfermos siempre están relacionados entre sí a través de las mujeres; no es posible la transmisión de hombre a hombre."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué características tiene el MCA, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, ¿por qué una mujer con la mutación en uno de sus cromosomas X generalmente NO desarrolla el MCA?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. Según el árbol genealógico del texto, ¿qué patrón confirma que el MCA es una herencia ligada al cromosoma X?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué un varón que hereda el alelo del MCA en su único cromosoma X SIEMPRE manifestará la enfermedad, mientras que una mujer heterocigota no la manifiesta?</p>
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
     bio10-u01.js/u02.js/u03.js — ver biologia10.js) ────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
