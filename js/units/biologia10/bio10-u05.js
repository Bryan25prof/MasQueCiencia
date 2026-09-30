/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u05.js
   BIO10-U05 — Causas de la variabilidad genética
   ================================================================
   FUENTES (ver también banco-bio10-u05.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad V / Tema 5 "Causas de la
       variabilidad genética". Se leyeron de forma íntegra y directa
       las páginas impresas 143 a 176, cubriendo los 9 subtemas reales
       del libro: 5.1 Desarrollo histórico de la Genética (pág. 143,
       cronología real: Mendel 1866, Nettie Stevens 1900, moscas del
       vinagre 1914-1916, Barbara McClintock 1948, Watson/Crick/
       Franklin 1953, Ángel Pellicer años 70, Mariano Barbacid y Manuel
       Perucho años 80, Proyecto Genoma Humano 1990, oveja Dolly 1996,
       genoma humano secuenciado 2003); 5.2 Los ácidos nucleicos (pág.
       144-148, nucleótidos, bases púricas/pirimidínicas, cuadro
       comparativo ADN-ARN); 5.3 Genes y 5.4 Cromosomas (pág. 149-151,
       partes del cromosoma, relación ADN-gen-cromosoma, cariotipo,
       cromosomas homólogos, locus y alelos); 5.5 Duplicación del ADN
       (pág. 151-154, ADN helicasa, ADN polimerasa, hebra conductora y
       retardada, fragmentos de Okazaki, ligasa); 5.6 Transcripción del
       ADN (pág. 154-157, ARN polimerasa, cadena patrón); 5.7 Síntesis
       de proteínas (pág. 157-163, tipos de ARN, código genético
       completo con sus 9 características, tabla de codones, etapas de
       la síntesis, tabla real de tipos de proteínas); 5.8 Mutaciones
       (pág. 163-172, mutaciones génicas —sustituciones, inserciones y
       deleciones—, el caso real del albinismo y de la anemia
       falciforme/drepanocitosis, mutaciones cromosómicas —deleción,
       duplicación, inversión, translocación, caso real del síndrome
       "Cri du chat"—, mutaciones genómicas —euploidías y aneuploidias,
       tablas reales de síndrome de Down/Edwards/Patau y de Klinefelter/
       Turner/doble Y/triple X—, agentes mutagénicos físicos y químicos,
       y las condiciones reales de fenilcetonuria, talasemia, hemofilia,
       cáncer de mama —genes BRCA1/BRCA2— y diabetes tipo 1/tipo 2); y
       5.9 Biotecnología (pág. 172-176, selección artificial,
       reproducción asistida —inseminación artificial y fertilización
       in vitro—, genoma humano con su tabla comparativa real de
       especies, y organismos transgénicos —caso real del maíz con el
       gen de Bacillus thuringiensis y su riesgo descrito para las
       larvas de la mariposa monarca, y el dato real de que Costa Rica
       figura en el puesto 26 de los países que más cultivan
       transgénicos—). También se leyeron, a modo de muestra
       representativa, la Actividad 1 "El ADN base de la genética"
       (pág. 178-179), la Actividad 3 "Mutaciones" (pág. 187-188), la
       Actividad 4 "Biotecnología" (pág. 192) y la Guía de repaso
       completa (pág. 194) y el inicio de la Evaluación del tema (pág.
       195), para confirmar la cobertura real de indicadores de cada
       subtema. El archivo del libro presentó un daño puntual menor en
       la página impresa 177 (columna derecha en blanco, tras la lista
       de "riesgos ambientales" de los transgénicos de la página 176) —
       ese punto puntual simplemente no se usó como fuente; todo el
       contenido de esta unidad proviene de texto que sí se pudo leer
       de forma íntegra, sin necesidad de recurrir al Programa de
       Estudio del MEP para reconstruir ninguna parte dañada.

   (b) Programa de Estudio de Biología del MEP ("Educar para una Nueva
       Ciudadanía", Educación Diversificada, Décimo año), Eje temático
       II ("Uso sostenible de la energía y los materiales..."), que
       coincide exactamente con el Tema 5 del libro (Criterios de
       evaluación: variabilidad genética expresada en el fenotipo,
       duplicación del ADN, mutaciones, síntesis de proteínas, código
       genético y contexto histórico; representaciones del ADN,
       almacenamiento, modificación de la expresión, universalidad de
       la información genética y cariotipos; el código genético como
       enlace común de todas las formas de vida; aplicaciones e
       implicaciones de la Biotecnología) — confirmado visualmente en
       la portada de la Unidad V del libro (pág. 143), que reproduce
       textualmente ese mismo Eje temático II y esos mismos 4 criterios
       de evaluación. No fue necesario usar el programa del MEP para
       reconstruir ningún hueco del libro, ya que todo el contenido
       real pudo leerse directamente.

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
  const UNIT_ID = 'bio10-u05';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🧬', titulo: 'Ácidos nucleicos y genes',
      ideaClave: 'El ADN y el ARN son ácidos nucleicos formados por nucleótidos; dentro del ADN, los genes son los fragmentos que contienen la información para fabricar las proteínas de cada ser vivo.',
      explicacion: 'Las moléculas de <strong>ADN</strong> y <strong>ARN</strong> se llaman ácidos nucleicos. Están formadas por unidades llamadas <strong>nucleótidos</strong>, cada uno compuesto por una base nitrogenada, una pentosa (azúcar) y un grupo fosfato. Las bases nitrogenadas pueden ser púricas (adenina y guanina) o pirimidínicas (citosina, timina en el ADN, uracilo en el ARN). El ADN tiene forma de doble hélice y su azúcar es la desoxirribosa; el ARN es, casi siempre, una sola hebra y su azúcar es la ribosa. Dentro del ADN, la información se organiza en <strong>genes</strong>: el fragmento más pequeño de una molécula de ADN, también llamado unidad de herencia, que codifica la secuencia de aminoácidos de una proteína determinada. Se estima que el ser humano tiene unos 20 000 genes.',
      ejemplo: 'La Genética, como ciencia, se desarrolló a lo largo del siglo XX: en 1866 el monje Gregor Mendel describió las leyes básicas de la herencia (aunque su obra no fue tomada en cuenta hasta inicios del siglo XX); en 1953 James Watson y Francis Crick descubrieron la estructura de doble hélice del ADN a partir de los estudios de rayos X de Rosalind Franklin; y en 2003 se completó la secuencia del genoma humano.',
      aplicacion: 'Comprender que el ADN se compone de nucleótidos con bases complementarias (adenina-timina, citosina-guanina) es la base para entender procesos posteriores como la duplicación del ADN y la síntesis de proteínas.',
      compruebra: '¿Cuáles son las tres partes que forman un nucleótido, y en qué se diferencian los nucleótidos del ADN de los del ARN?' },

    { id: 't2', icon: '🧫', titulo: 'Cromosomas',
      ideaClave: 'Los cromosomas son las estructuras que portan los genes; su número, forma y tamaño (el cariotipo) es característico de cada especie, y en el ser humano son 46, organizados en 23 pares.',
      explicacion: 'Los <strong>cromosomas</strong> son las estructuras físicas de la célula eucariota que portan los genes, visibles solo durante la división celular. En cada cromosoma se distinguen la <strong>cromátida</strong> (cada una de las dos hélices idénticas de ADN y proteína), el <strong>centrómero</strong> (punto de unión de las cromátidas hermanas) y los <strong>telómeros</strong> (regiones de los extremos que evitan la pérdida de información en cada duplicación). Un cromosoma se divide en genes: un gen es un fragmento del cromosoma, y la unión de muchos genes forma el cromosoma completo. Al número, forma y tamaño de los cromosomas de una especie se le llama <strong>cariotipo</strong>. Los <strong>cromosomas homólogos</strong> son un par de cromosomas, uno heredado de la madre y otro del padre, que se emparejan durante la meiosis; al lugar que un gen ocupa en el cromosoma se le llama <strong>locus</strong>, y a las formas alternativas de un gen en ese mismo locus se les llama <strong>alelos</strong>.',
      ejemplo: 'La cebolla tiene 16 cromosomas (8 pares), la mosca de la fruta Drosophila melanogaster tiene 8, y el ser humano tiene 46 (23 pares): 22 pares de autosomas y un par de cromosomas sexuales (XX en la mujer, XY en el hombre). Un cromosoma puede contener hasta 3000 genes diferentes; por ejemplo, el cromosoma X humano tiene 2062 genes y el Y tiene 330.',
      aplicacion: 'Los grupos sanguíneos humanos A, B y O son un ejemplo real de alelos: son formas diferentes de un mismo gen, ubicado en el mismo locus, que producen una característica distinta (el tipo de sangre) en cada persona.',
      compruebra: '¿Cuál es la diferencia entre un gen, un cromosoma y el cariotipo de una especie?' },

    { id: 't3', icon: '🔁', titulo: 'Duplicación del ADN',
      ideaClave: 'Antes de que una célula se divida, el ADN debe duplicarse con ayuda de varias enzimas, de modo que cada célula hija reciba una copia idéntica de la información genética.',
      explicacion: 'Cuando ocurre la mitosis, se sintetizan nuevas cadenas de ADN, logrando copias idénticas de la original: a este proceso se le llama <strong>duplicación o replicación del ADN</strong>. Primero, la enzima <strong>ADN helicasa</strong> separa las dos cadenas de la doble hélice, formando la <strong>horquilla de replicación</strong>. Luego, la enzima <strong>ADN polimerasa</strong> reconoce las bases expuestas en cada cadena original y les une nucleótidos con bases complementarias (timina con adenina, citosina con guanina), sintetizando las cadenas hijas: una llamada <strong>hebra conductora</strong> (se sintetiza de forma continua) y otra llamada <strong>hebra seguidora o retardada</strong> (se sintetiza en fragmentos llamados fragmentos de Okazaki, que luego una enzima llamada <strong>ligasa</strong> une entre sí).',
      ejemplo: 'La replicación ocurre con la unión de 50 a 500 nucleótidos por segundo. Aunque la mayoría de las veces es muy exacta, pueden ocurrir errores; sin embargo, existen enzimas que recorren las cadenas corrigiéndolos, por lo que las cadenas complementarias tienen, en promedio, solo un error por cada mil millones de pares de bases.',
      aplicacion: 'Gracias a la duplicación del ADN, cada vez que una célula se divide, las dos células resultantes reciben una copia completa y (casi siempre) idéntica de toda la información genética original.',
      compruebra: '¿Qué función cumple la enzima ADN helicasa, y qué función cumple la enzima ADN polimerasa, en la duplicación del ADN?' },

    { id: 't4', icon: '🔬', titulo: 'Transcripción y síntesis de proteínas',
      ideaClave: 'En la transcripción, el ADN sirve de molde para fabricar una molécula de ARN mensajero; en la síntesis de proteínas, el código genético traduce esa información en una secuencia de aminoácidos.',
      explicacion: 'La <strong>transcripción</strong> es el proceso mediante el cual se sintetiza una molécula de ARN a partir de una molécula patrón de ADN. La enzima <strong>ARN polimerasa</strong> localiza el inicio del gen y va agregando bases complementarias (frente a timina coloca adenina, frente a adenina coloca uracilo, frente a citosina coloca guanina y frente a guanina coloca citosina), hasta liberar la molécula de ARN. Existen tres tipos de ARN: el <strong>ARN mensajero (ARNm)</strong>, que copia el patrón de un gen; el <strong>ARN de transferencia (ARNt)</strong>, que decodifica al ARNm y transporta los aminoácidos hasta el ribosoma; y el <strong>ARN ribosomal (ARNr)</strong>, que reconoce al ARNm y cataliza las uniones entre aminoácidos. El <strong>código genético</strong> es el conjunto de codones (tripletes de tres bases) del ARNm que dirigen la incorporación de cada aminoácido: existen 64 codones posibles para 20 aminoácidos, por lo que el código está degenerado (varios codones para un mismo aminoácido); el codón AUG marca el inicio (metionina) y los codones UAA, UAG y UGA marcan el final. En la <strong>síntesis de proteínas</strong>, los ribosomas van uniendo, uno a uno, los aminoácidos que indica cada codón del ARNm, hasta formar la proteína completa.',
      ejemplo: 'Las células del folículo piloso transcriben el gen que codifica la proteína queratina, mientras que las células del páncreas transcriben el gen que codifica la insulina. Según la tabla del código genético, el triplete UUG corresponde al aminoácido leucina, y el triplete AAU corresponde al aminoácido asparagina.',
      aplicacion: 'Las proteínas cumplen funciones muy variadas: la hemoglobina transporta oxígeno, la insulina regula el metabolismo de la glucosa, el colágeno y la queratina forman tendones, cartílagos y pelo, y la miosina forma parte de las fibras musculares.',
      compruebra: '¿Por qué se dice que el código genético es "universal" y está "degenerado"? Explicá cada característica con tus palabras.' },

    { id: 't5', icon: '⚠️', titulo: 'Mutaciones',
      ideaClave: 'Una mutación es un cambio heredable en el material genético; puede ser génica, cromosómica o genómica, y es la fuente primaria de la variabilidad genética que hace posible la evolución.',
      explicacion: 'Una <strong>mutación</strong> es una alteración o cambio en la información genética de un ser vivo. Si ocurre en una célula somática, desaparece cuando muere el individuo; pero si ocurre en una célula sexual (óvulo o espermatozoide), puede transmitirse a la descendencia. Existen tres tipos: las <strong>mutaciones génicas</strong> (un cambio en la estructura del ADN, por sustitución de una base por otra, o por inserción o deleción de bases, lo que provoca un corrimiento en el orden de lectura); las <strong>mutaciones cromosómicas</strong> (cambios en la estructura interna de un cromosoma: deleción, duplicación, inversión o translocación de un segmento); y las <strong>mutaciones genómicas</strong> (cambios en el número de cromosomas: euploidías, si afectan a juegos completos de cromosomas, o aneuploidías, si el cigoto tiene cromosomas de más o de menos, como en el síndrome de Down). Existen agentes mutagénicos físicos (radiaciones como los rayos X y gamma) y químicos (como la cafeína, la nicotina o el ácido nitroso) capaces de aumentar la frecuencia de mutación.',
      ejemplo: 'La anemia falciforme (drepanocitosis) es una mutación génica por sustitución: el aminoácido ácido glutámico es reemplazado por valina en la cadena beta de la hemoglobina, lo que hace que los glóbulos rojos adopten forma de hoz. El síndrome de Down es una mutación genómica: una trisomía del par 21 (tres copias de ese cromosoma en lugar de dos). El síndrome "Cri du chat" es una mutación cromosómica: una deleción en el cromosoma 5.',
      aplicacion: 'Enfermedades como la fenilcetonuria, la talasemia, la hemofilia o ciertos tipos de cáncer de mama (relacionados con los genes BRCA1 y BRCA2) están asociadas a mutaciones; por eso existen pruebas de diagnóstico como el tamizaje neonatal ("prueba del talón") que permiten detectarlas a tiempo.',
      compruebra: '¿Por qué una mutación en una célula de la piel no se hereda a los hijos, pero una mutación en un óvulo o un espermatozoide sí podría heredarse?' },

    { id: 't6', icon: '🌽', titulo: 'Biotecnología',
      ideaClave: 'La biotecnología aplica organismos y procesos biológicos para obtener bienes y servicios; hoy incluye desde la selección artificial hasta los organismos transgénicos y el mapeo del genoma humano, con beneficios y riesgos que deben evaluarse.',
      explicacion: 'La <strong>biotecnología</strong>, en un sentido amplio, es la aplicación de organismos, componentes o sistemas biológicos para la obtención de bienes y servicios. La humanidad la practica desde hace miles de años, aunque de forma empírica (fabricación de vinos, cerveza, quesos y yogur). Entre sus campos de aplicación actuales están la <strong>selección artificial</strong> (el ser humano favorece ciertas variaciones genéticas en generaciones sucesivas), la <strong>reproducción asistida</strong> (inseminación artificial y fertilización in vitro), los <strong>organismos transgénicos</strong> (organismos que reciben, de forma artificial, un gen de otra especie completamente distinta, por eso también llamados Organismos Genéticamente Modificados u OGM) y el <strong>mapeo del genoma humano</strong> (la secuencia completa del ADN de un ser humano, compuesta por entre 25 000 y 30 000 genes).',
      ejemplo: 'Un ejemplo real de organismo transgénico es el maíz que porta un gen de la bacteria Bacillus thuringiensis, capaz de sintetizar una toxina que mata a los insectos dañinos, reduciendo así el uso de insecticidas. Sin embargo, se ha descrito que el polen de este maíz transgénico también es tóxico para las larvas de la mariposa monarca. Costa Rica ocupa el puesto 26 entre los países que más cultivan transgénicos en el mundo, principalmente algodón y soya.',
      aplicacion: 'Las razas modernas de perros, o vegetales como el brócoli, la coliflor y el repollo (todos descendientes de una misma especie original), son ejemplos de selección artificial: el ser humano ha ido favoreciendo, generación tras generación, las características que le resultan útiles o atractivas.',
      compruebra: '¿Qué beneficio y qué riesgo ambiental concreto se mencionan en el caso del maíz transgénico con el gen de Bacillus thuringiensis?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿ADN o ARN?": 10 afirmaciones reales del cuadro
     comparativo del libro (pág. 148) para clasificar si describen al
     ADN o al ARN. Mismo patrón exacto que Sim1 de bio10-u01/u02/u03.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Tiene forma de doble hélice.', correcta: 'adn', explica: 'Es ADN: su estructura es una doble hélice de nucleótidos.' },
    { texto: 'Casi siempre es una sola hebra (lineal).', correcta: 'arn', explica: 'Es ARN: a diferencia del ADN, el ARN es una sola hilera.' },
    { texto: 'Contiene la base nitrogenada timina.', correcta: 'adn', explica: 'Es ADN: sus bases son adenina, timina, guanina y citosina.' },
    { texto: 'Contiene la base nitrogenada uracilo en lugar de timina.', correcta: 'arn', explica: 'Es ARN: en lugar de timina, usa uracilo.' },
    { texto: 'Su azúcar (pentosa) es la desoxirribosa.', correcta: 'adn', explica: 'Es ADN: su pentosa es la desoxirribosa.' },
    { texto: 'Su azúcar (pentosa) es la ribosa.', correcta: 'arn', explica: 'Es ARN: su pentosa es la ribosa.' },
    { texto: 'Se localiza dentro del núcleo de la célula y también en las mitocondrias.', correcta: 'adn', explica: 'Es ADN: se ubica en el núcleo, así como en mitocondrias y cloroplastos.' },
    { texto: 'Se le encuentra en el núcleo, el citoplasma y dentro de los ribosomas.', correcta: 'arn', explica: 'Es ARN: por lo general se localiza en el núcleo, el citoplasma y los ribosomas.' },
    { texto: 'Es capaz de replicarse (copiarse) a sí mismo.', correcta: 'adn', explica: 'Es ADN: tiene la capacidad de replicarse por sí mismo.' },
    { texto: 'Es sintetizado por el ADN cuando la célula lo necesita.', correcta: 'arn', explica: 'Es ARN: es sintetizado por el ADN durante la transcripción, cuando es necesario.' }
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
          <button class="btn btn-ghost" data-sim1-opcion="adn">ADN</button>
          <button class="btn btn-ghost" data-sim1-opcion="arn">ARN</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de mutaciones": 2 fases, mismo patrón
     exacto que Sim2 de bio10-u02.js/u03.js — (A) explorar libremente 6
     casos reales de mutaciones/agentes mutagénicos, y (B) un quiz de
     2ª fase donde MQC da el caso y el estudiante elige el tipo.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'falciforme', nombre: '🩸 Anemia falciforme', areas: 'Mutación génica por sustitución (cambio de un aminoácido en la hemoglobina)' },
    { id: 'crichat', nombre: '😿 Síndrome "Cri du chat"', areas: 'Mutación cromosómica por deleción (pérdida de un segmento del cromosoma 5)' },
    { id: 'down', nombre: '🧑 Síndrome de Down', areas: 'Mutación genómica por aneuploidía (trisomía del par 21)' },
    { id: 'turner', nombre: '🧬 Síndrome de Turner', areas: 'Mutación genómica por aneuploidía (monosomía del cromosoma X)' },
    { id: 'rayosx', nombre: '☢️ Rayos X y rayos gamma', areas: 'Agente mutagénico físico (radiación electromagnética)' },
    { id: 'nicotina', nombre: '🚬 Nicotina y cafeína', areas: 'Agente mutagénico químico (alcaloides)' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'En la anemia falciforme, el aminoácido ácido glutámico es reemplazado por valina en la cadena beta de la hemoglobina.', opciones: ['Mutación génica por sustitución', 'Mutación cromosómica por deleción', 'Mutación genómica por aneuploidía', 'Agente mutagénico químico'], correcta: 0 },
    { fenomeno: 'El síndrome "Cri du chat" ocurre cuando se pierde un segmento del cromosoma 5.', opciones: ['Mutación cromosómica por deleción', 'Mutación génica por sustitución', 'Mutación genómica por aneuploidía', 'Agente mutagénico físico'], correcta: 0 },
    { fenomeno: 'El síndrome de Down ocurre cuando hay tres copias del cromosoma 21, en lugar de dos.', opciones: ['Mutación genómica por aneuploidía (trisomía)', 'Mutación cromosómica por deleción', 'Mutación génica por sustitución', 'Agente mutagénico químico'], correcta: 0 },
    { fenomeno: 'El síndrome de Turner ocurre cuando a una persona de sexo femenino le falta un cromosoma X, quedando con uno solo.', opciones: ['Mutación genómica por aneuploidía (monosomía)', 'Mutación génica por inserción', 'Mutación cromosómica por translocación', 'Agente mutagénico físico'], correcta: 0 },
    { fenomeno: 'Los rayos X y los rayos gamma son radiaciones electromagnéticas capaces de alterar el material genético de las células.', opciones: ['Agente mutagénico físico', 'Agente mutagénico químico', 'Mutación cromosómica por duplicación', 'Mutación genómica por euploidía'], correcta: 0 },
    { fenomeno: 'La nicotina y la cafeína son alcaloides capaces de actuar como agentes mutagénicos.', opciones: ['Agente mutagénico químico', 'Agente mutagénico físico', 'Mutación génica por deleción', 'Mutación cromosómica por inversión'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada caso real para ver qué tipo de mutación (o agente mutagénico) representa.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el tipo →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de mutación o agente es este?</p>
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
     SIMULADOR 3 — "El código genético en acción": escenario guiado en
     2 pasos, con el ejemplo real y textual del libro sobre el codón de
     inicio y el triplete UUG. Mismo patrón exacto que Sim3 de
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: en una célula del páncreas, la ARN polimerasa transcribe un gen para fabricar una proteína. Según el código genético del libro, cada triplete (codón) del ARNm corresponde a un aminoácido específico.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> ¿cuál es el codón de inicio en el ARNm, y qué aminoácido representa?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="aug">AUG — Metionina</button>
            <button class="btn btn-ghost" data-sim3-opcion="uaa">UAA — Alto (fin de la proteína)</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> según la tabla del código genético, ¿qué aminoácido corresponde al triplete UUG?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="leucina">Leucina</button>
            <button class="btn btn-ghost" data-sim3-opcion2="asparagina">Asparagina</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">El codón AUG marca el inicio de la proteína y codifica la metionina, y el triplete UUG corresponde a la leucina — exactamente como lo indica la tabla del código genético del libro. Así, codón por codón, el ARNm dirige la construcción completa de una proteína.</p>
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
      { id: 'sim1', titulo: '🧬 ¿ADN o ARN?', desc: '10 afirmaciones reales del cuadro comparativo del libro para distinguir el ADN del ARN.' },
      { id: 'sim2', titulo: '⚠️ Explorador de mutaciones', desc: 'Explorá 6 casos reales de mutaciones y agentes mutagénicos, y después probá identificando vos mismo el tipo, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🧪 El código genético en acción', desc: 'Un escenario guiado paso a paso con la tabla real del código genético: el codón de inicio y el triplete UUG.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El tipo correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'aug';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el triplete de iniciación suele ser AUG, que codifica para la metionina.'
            : '💡 En realidad es AUG: el triplete de iniciación suele ser AUG, que codifica para la metionina; UAA es uno de los codones de paro.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'leucina';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: según la tabla del código genético, el triplete UUG corresponde a la leucina.'
            : '💡 En realidad es leucina: según la tabla del código genético, el triplete UUG corresponde a la leucina, no a la asparagina (ese es el triplete AAU).';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective genético": 5 escenarios reales para identificar
     el tipo de mutación o el proceso biotecnológico correspondiente,
     con pistas que orientan sin revelar la respuesta. Mismo patrón
     exacto que bio10-u01.js/u02.js/u03.js: SIN XP al solo iniciar un
     nivel, y game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'En la anemia falciforme, el aminoácido ácido glutámico es reemplazado por valina en la cadena beta de la hemoglobina, y los glóbulos rojos adoptan forma de hoz.',
      pista: 'Pensá en un solo aminoácido que cambia dentro de una proteína, no en un cromosoma completo.',
      correcta: 'Mutación génica (sustitución)', opciones: ['Mutación génica (sustitución)', 'Mutación cromosómica (deleción)', 'Mutación genómica (aneuploidía)', 'Agente mutagénico físico'] },
    { id: 'nivel2', escenario: 'El síndrome de Down ocurre cuando una persona tiene tres copias del cromosoma 21, en lugar de las dos habituales.',
      pista: 'Pensá en un cromosoma completo de más, no en un solo aminoácido.',
      correcta: 'Mutación genómica (aneuploidía)', opciones: ['Mutación genómica (aneuploidía)', 'Mutación génica (sustitución)', 'Mutación cromosómica (deleción)', 'Agente mutagénico químico'] },
    { id: 'nivel3', escenario: 'El síndrome "Cri du chat" (grito de gato) se debe a que se pierde un segmento del cromosoma 5.',
      pista: 'Pensá en un pedazo de un cromosoma que desaparece, no en un cromosoma completo de más.',
      correcta: 'Mutación cromosómica (deleción)', opciones: ['Mutación cromosómica (deleción)', 'Mutación genómica (aneuploidía)', 'Mutación génica (sustitución)', 'Agente mutagénico físico'] },
    { id: 'nivel4', escenario: 'Las radiaciones electromagnéticas, como los rayos X y los rayos gamma, pueden alterar el material genético de las células.',
      pista: 'Pensá en un factor externo que puede causar una mutación, no en la mutación en sí misma.',
      correcta: 'Agente mutagénico físico', opciones: ['Agente mutagénico físico', 'Agente mutagénico químico', 'Mutación cromosómica (inversión)', 'Mutación genómica (euploidía)'] },
    { id: 'nivel5', escenario: 'El maíz transgénico porta un gen de la bacteria Bacillus thuringiensis, que le permite sintetizar una toxina que mata insectos dañinos y reducir así el uso de insecticidas.',
      pista: 'Pensá en un organismo que recibió, de forma artificial, un gen de otra especie.',
      correcta: 'Organismo transgénico (biotecnología)', opciones: ['Organismo transgénico (biotecnología)', 'Mutación génica (sustitución)', 'Mutación cromosómica (translocación)', 'Agente mutagénico químico'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective Genético</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de mutación o proceso es este?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u05.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U05 !== 'undefined') ? PREGUNTAS_BIO10_U05 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U05</h3>
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
     MISIÓN FINAL — "Bajo la lupa: el maíz transgénico y la mariposa
     monarca" (mismo patrón exacto que bio10-u01.js/u02.js/u03.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía missionDone).
     Caso real citado en el libro (pág. 175-176), con datos reales
     (gen de Bacillus thuringiensis, riesgo para la mariposa monarca,
     puesto 26 de Costa Rica en cultivo de transgénicos).
     ================================================================ */
  const MISION_A_OPCIONES = ['Porta un gen de la bacteria Bacillus thuringiensis', 'Sintetiza una toxina que mata insectos dañinos', 'Es una variedad silvestre originaria de Costa Rica', 'No tiene ningún efecto sobre otras especies'];
  const MISION_A_CORRECTAS = ['Porta un gen de la bacteria Bacillus thuringiensis', 'Sintetiza una toxina que mata insectos dañinos'];
  const MISION_B_OPCIONES = [
    'Disminuir el uso de insecticidas y mejorar el rendimiento de las cosechas',
    'Aumentar el tamaño de la mazorca de maíz',
    'Hacer que el maíz sea resistente a la sequía',
    'Producir maíz de un color distinto'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'El polen del maíz transgénico es tóxico para las larvas de la mariposa monarca',
    'El maíz transgénico deja de necesitar agua para poder crecer',
    'El maíz transgénico se vuelve inmune a cualquier plaga sin excepción',
    'El maíz transgénico no puede reproducirse nunca más'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el maíz transgénico y la mariposa monarca".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🌽 Misión: Bajo la lupa — el maíz transgénico y la mariposa monarca</h3>
        <p style="color:var(--text-secondary)">Texto base: "El maíz transgénico porta un gen de la bacteria <em>Bacillus thuringiensis</em>, que le permite sintetizar una toxina que causa la muerte de insectos dañinos. Con esta estrategia se pretende disminuir el uso de insecticidas y obtener mejores rendimientos en las cosechas. Sin embargo, se ha descrito que el polen de este maíz transgénico es tóxico para las larvas de la mariposa monarca. Costa Rica figura en el puesto 26 de los países que cultivan más transgénicos en el mundo, específicamente de algodón y soya."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué características tiene el maíz transgénico, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cuál es el propósito de introducir el gen de Bacillus thuringiensis en el maíz, según el texto?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Qué riesgo ambiental se ha descrito sobre este maíz transgénico, según el texto?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué el caso del maíz transgénico y la mariposa monarca muestra que la biotecnología puede tener, al mismo tiempo, beneficios y riesgos?</p>
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
