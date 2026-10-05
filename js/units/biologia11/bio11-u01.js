/* ================================================================
   MÁSQUECIENCIA — js/units/biologia11/bio11-u01.js
   BIO11-U01 — Interacciones entre poblaciones
   ================================================================
   FUENTE — esta unidad, como toda Biología 11.º, usa el Programa de
   Estudio oficial de Biología del MEP ("Educar para una nueva
   ciudadanía", Ministerio de Educación Pública de Costa Rica) como
   fuente primaria, porque Biología 11.º no tiene libro de texto
   propio (a diferencia de Biología 10.º).

   Sub-tema exacto: "viii ¿Por qué los seres vivos interactuamos con
   otros seres vivos?", Undécimo año de Educación Académica, Eje
   temático I ("Los seres vivos en entornos saludables, como resultado
   de la interacción de aspectos biológicos, socioculturales y
   ambientales"), páginas IMPRESAS 61 a 64 del documento oficial.

   Esas 4 páginas se extrajeron con pikepdf (índices 63-66, offset
   índice = página_impresa + 2 para este tramo del documento) y se
   verificaron VISUALMENTE una por una con pdftoppm antes de redactar
   cualquier contenido: el pie de cada imagen renderizada muestra,
   en efecto, "61", "62", "63" y "64".

   Contenido real de esas 4 páginas, usado tal cual en esta unidad
   (criterios de evaluación y situaciones de aprendizaje del
   programa, no un libro de texto con capítulos):
     - Página 61: los tres criterios de evaluación del sub-tema
       (conexiones entre individuos de la misma población y de
       especie diferente; comparación de relaciones intra e
       interespecíficas; manejo y preservación medioambiental de
       enfermedades relacionadas con el ciclo de vida de parásitos,
       vectores, anfitrión y hábitat) y el inicio de la situación de
       aprendizaje del video foro.
     - Página 62: la clasificación real que pide el programa —
       intraespecífica o interespecífica, antagónica o simbiótica —
       con sus categorías textuales: intraespecíficas (competencia,
       reproducción, organización social); interespecíficas
       antagónicas (parasitismo, amensalismo, depredación,
       explotación); simbióticas (neutralismo, comensalismo,
       mutualismo); y la lista real de ejemplos a ampliar
       (depredador-presa, herbivoría, defensa de las plantas,
       competencia inter e intraespecífica, parasitismo, mutualismo
       obligatorio, endosimbiosis, coevolución, comensalismo,
       explotación).
     - Página 63: las preguntas guía reales con sus ejemplos
       concretos — colibríes de la misma especie y sus territorios;
       el coyote (Canis latrans) controlando poblaciones de conejos,
       ardillas y ratones; el ajuste del pico y la lengua del colibrí
       polinizador al tubo profundo de las flores de heliconia
       (coevolución); los parásitos especializados en una única
       especie de hospedador y el ejemplo de las orugas como
       hospederas de endoparásitos; la competencia intra e
       interespecífica; los pizotes o coatí (Nasua narica) formando
       grupos; y las preguntas sobre coevolución (herbívoros con
       adaptaciones digestivas, plantas con defensas químicas o
       físicas, presas con estrategias de defensa).
     - Página 64: la sección completa sobre enfermedades transmitidas
       por vectores — dengue, zika, chikungunya y malaria; el tipo de
       criaderos que prefieren los mosquitos transmisores; el ciclo
       de vida y hábitat de esos vectores; el papel del cambio
       climático en la extensión de su hábitat; las entrevistas a la
       comunidad sobre acciones para evitar criaderos; y la propuesta
       real de construcción de espacios seguros en el centro
       educativo, la comunidad y/o el país mediante acciones de
       prevención, mitigación y rehabilitación del ambiente.

   Ningún dato, especie ni ejemplo de esta unidad fue inventado: todos
   provienen literalmente de esas 4 páginas. Las explicaciones
   pedagógicas que rodean esos ejemplos (definiciones más extendidas,
   redacción de las ideas clave, aplicaciones) sí fueron redactadas
   por esta sesión para dar contexto didáctico, exactamente como ya
   se hizo en bio10-u03.js con hábitat/nicho a partir del mismo tipo
   de fuente (el programa oficial del MEP).

   Mismo patrón de plugin EXACTO que bio10-u01/02/03/04.js, pero
   apuntando a Storage.updateBiologia11Unit / markBiologia11TopicRead
   / data.biologia11 (nunca a las funciones de Biología 10.º, Química
   ni Física), y usando el contexto de XP {disciplina:'biologia',
   grado:11}. La misión final usa awardXP('biologia11-mission-done')
   (100 XP), la misma clave específica de Biología 11.º que usan las
   demás unidades (bio11-u02.js..u05.js) — clave registrada en
   gamification.js junto a 'biologia10-mission-done'.

   Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento) — ver también banco-bio11-u01.js.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio11-u01';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🐦', titulo: 'Relaciones intraespecíficas',
      ideaClave: 'Una relación intraespecífica ocurre entre individuos de la misma especie: incluye la competencia, la reproducción y la organización social.',
      explicacion: 'Cuando dos o más individuos de la <strong>misma población</strong> se relacionan entre sí, se habla de una <strong>relación intraespecífica</strong>. El programa oficial agrupa tres grandes tipos: la <strong>competencia</strong> (por recursos limitados como el espacio, el alimento o la luz), la <strong>reproducción</strong> y la <strong>organización social</strong> (cuando los individuos de una especie forman grupos con roles y beneficios compartidos). Estas relaciones pueden ayudar a regular el propio tamaño de la población, mucho antes de que entre en juego cualquier otra especie.',
      ejemplo: 'El programa plantea preguntas guía muy concretas sobre colibríes de la misma especie: ¿cuáles son las formas de relación entre ellos?, ¿cómo se distribuyen los territorios?, ¿por qué son diferentes los machos de las hembras? También pregunta por qué se forman grupos de individuos de la población de pizotes o coatí (<em>Nasua narica</em>), un ejemplo real de organización social intraespecífica.',
      aplicacion: 'El programa también pregunta si la competencia intraespecífica ayuda a controlar la población de una planta en particular, usando como ejemplo las heliconias: plantas de la misma especie que compiten entre sí por luz, agua o espacio pueden terminar regulando el tamaño de su propia población, sin que intervenga ninguna otra especie.',
      compruebra: 'Si dos machos de la misma especie de colibrí compiten por defender el mismo territorio, ¿por qué esa relación se clasifica como intraespecífica y no interespecífica?' },

    { id: 't2', icon: '🐺', titulo: 'Relaciones interespecíficas antagónicas',
      ideaClave: 'Cuando especies diferentes se relacionan y al menos una resulta perjudicada, se habla de una relación interespecífica antagónica: parasitismo, amensalismo, depredación y explotación.',
      explicacion: 'Una <strong>relación interespecífica</strong> ocurre entre individuos de <strong>especies distintas</strong>. Es <strong>antagónica</strong> cuando esa relación perjudica a al menos una de las especies involucradas. El programa agrupa aquí cuatro tipos: el <strong>parasitismo</strong> (una especie vive a costa de otra, a la que suele dañar), el <strong>amensalismo</strong> (una especie resulta perjudicada mientras la otra no se ve afectada de forma relevante), la <strong>depredación</strong> (un depredador caza y se alimenta de una presa) y la <strong>explotación</strong>. El programa también agrupa aquí la <strong>competencia interespecífica</strong>, cuando dos especies distintas compiten por los mismos recursos limitados.',
      ejemplo: 'El ejemplo real más citado en el programa es el del <strong>coyote (<em>Canis latrans</em>)</strong>, un cánido silvestre que ayuda a controlar las poblaciones de mamíferos pequeños como conejos, ardillas y ratones, en un ciclo recíproco de depredadores y presas. El programa señala que, para estudiar ese control recíproco, es importante conocer datos de gestación y natalidad de ambas poblaciones.',
      aplicacion: 'El programa también describe a los <strong>parásitos</strong> como organismos muy especializados que, en muchos casos, dependen de una única especie de hospedador, y pregunta cómo una especie de endoparásito interno puede reducir la población de sus hospederos, usando el ejemplo real de las <strong>orugas</strong>. Sobre la competencia interespecífica, pregunta directamente cómo las poblaciones pueden competir con otras por sus recursos limitados.',
      compruebra: 'Si un parásito depende de una única especie de hospedador y esa especie de hospedador desaparece, ¿qué le podría pasar a la población del parásito? Explicá usando la idea de especialización.' },

    { id: 't3', icon: '🌺', titulo: 'Relaciones interespecíficas simbióticas',
      ideaClave: 'Cuando especies diferentes se relacionan sin que ninguna resulte necesariamente perjudicada, se habla de una relación interespecífica simbiótica: neutralismo, comensalismo y mutualismo.',
      explicacion: 'Dentro de las relaciones interespecíficas, el programa distingue también las <strong>simbióticas</strong>: el <strong>neutralismo</strong> (ninguna de las dos especies afecta significativamente a la otra), el <strong>comensalismo</strong> (una especie se beneficia y la otra no resulta ni beneficiada ni perjudicada) y el <strong>mutualismo</strong> (ambas especies obtienen un beneficio). Para sintetizar estas relaciones, el programa propone usar una simbología de <strong>+, - y 0</strong> según el efecto sea favorable, desfavorable o indiferente para cada especie.',
      ejemplo: 'El ejemplo real central del programa es la <strong>polinización de las heliconias por los colibríes</strong>: el programa pregunta por qué normalmente el tamaño del pico del colibrí polinizador encaja perfectamente en el tubo de las flores de las heliconias, y explica que muchas heliconias del trópico cuentan exclusivamente con colibríes como polinizadores. Es un mutualismo (+/+): la heliconia es polinizada y el colibrí obtiene alimento.',
      aplicacion: 'Reconocer si una relación es simbiótica y de qué tipo exacto (neutralismo, comensalismo o mutualismo) es la base que pide el programa para el diario reflexivo: un cuadro comparativo que sintetice, con la simbología +/-/0, cómo resulta cada relación para cada una de las especies involucradas.',
      compruebra: 'Usando la simbología +, - y 0 que propone el programa, ¿cómo representarías el mutualismo entre el colibrí y la heliconia para cada una de las dos especies?' },

    { id: 't4', icon: '🧬', titulo: 'Coevolución y endosimbiosis',
      ideaClave: 'La coevolución es el proceso por el cual dos especies estrechamente relacionadas desarrollan adaptaciones mutuas a lo largo del tiempo; la endosimbiosis es una forma de simbiosis en la que un organismo vive dentro de otro.',
      explicacion: 'Cuando dos especies mantienen una relación tan cercana y prolongada que cada una termina desarrollando adaptaciones específicas a la otra, se habla de <strong>coevolución</strong>. El programa pide ampliar el cuadro comparativo de relaciones con al menos un ejemplo de depredador-presa, herbivoría, defensa de las plantas, competencia inter e intraespecífica, parasitismo, <strong>mutualismo obligatorio</strong>, <strong>endosimbiosis</strong> y coevolución. La endosimbiosis es un caso particular de simbiosis en el que un organismo vive dentro de las células o el cuerpo de otro, generalmente en beneficio de ambos; el mutualismo obligatorio, por su parte, describe una dependencia tan estrecha que al menos una de las especies no podría sobrevivir sin la otra.',
      ejemplo: 'El propio ejemplo del colibrí y la heliconia es también un caso de coevolución: el programa detalla que muchas heliconias con flores de tubos muy profundos dependen de especies específicas de colibríes que tienen un pico extra largo para poder polinizarlas, y que además la lengua del colibrí tiene el doble de largo que su pico, comparado el pico del ave con el tubo de la flor.',
      aplicacion: 'El programa plantea otras preguntas de coevolución con ejemplos locales por completar: ¿cuál población de herbívoros tiene complejas adaptaciones digestivas que le permite digerir plantas locales?, ¿cuáles poblaciones de plantas se defienden con medios químicos o físicos de los depredadores?, ¿cuáles poblaciones de presas presentan estrategias para ocultarse o defenderse de sus depredadores? En todos los casos, se trata de especies que fueron moldeando sus características a lo largo del tiempo por su relación mutua.',
      compruebra: '¿Por qué el ajuste entre el largo del pico y la lengua del colibrí y la profundidad del tubo de la heliconia es un ejemplo de coevolución y no solo de una coincidencia entre dos especies que no se afectan?' },

    { id: 't5', icon: '🦟', titulo: 'Enfermedades transmitidas por vectores y gestión del riesgo',
      ideaClave: 'El dengue, el zika, el chikungunya y la malaria son enfermedades transmitidas por mosquitos vectores cuyo ciclo de vida depende de criaderos de agua estancada; conocer ese ciclo permite gestionar el riesgo con acciones concretas de prevención, mitigación y rehabilitación.',
      explicacion: 'El programa dedica una sección completa a las enfermedades transmitidas por vectores: el <strong>dengue</strong>, el <strong>zika</strong>, el <strong>chikungunya</strong> y la <strong>malaria</strong>. Propone indagar qué tipos de criaderos prefieren los mosquitos transmisores, cuál es el ciclo de vida y el hábitat de esos insectos vectores, y cómo ser parte de la <strong>gestión del riesgo</strong>: el conjunto de acciones de prevención, mitigación y rehabilitación del ambiente para reducir el riesgo de estas enfermedades en la comunidad. La relación entre el mosquito vector y una persona a la que transmite el patógeno es, en el fondo, una relación interespecífica antagónica cercana al parasitismo: el ser humano resulta perjudicado.',
      ejemplo: 'El programa propone entrevistar a personas que laboran en promoción de la salud, a vecinos y a familias sobre cuáles son las acciones más comunes que se realizan en la comunidad (urbanización, barrio, edificio) para evitar los criaderos de insectos patógenos, cuáles son los factores determinantes para el aumento de plagas y enfermedades relacionados con aspectos ambientales y de hábitat del mosquito, y cuál puede ser el papel del <strong>cambio climático</strong> en la extensión del hábitat del mosquito transmisor.',
      aplicacion: 'Como cierre de la gestión del riesgo, el programa pide elaborar un listado de acciones que promuevan la prevención, la mitigación y la rehabilitación del ambiente a escala local, reflexionando sobre el orden de prioridad de esas acciones y el compromiso de cada quien para ponerlas en práctica — y finalmente, elaborar una propuesta real para la construcción de <strong>espacios seguros</strong> en el centro educativo, la comunidad y/o el país.',
      compruebra: 'Si el mosquito transmisor del dengue necesita agua estancada para completar su ciclo de vida, ¿qué acción concreta de tu centro educativo o tu casa atacaría directamente ese ciclo?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Intraespecífica o interespecífica?": 10
     situaciones reales (colibríes, coyote, pizotes, heliconias,
     parásitos, dengue) para clasificar entre las dos categorías.
     Mismo patrón exacto que Sim1 de bio10-u03.js (2 opciones).
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Dos machos de la misma especie de colibrí compiten por defender el mismo territorio.', correcta: 'intra', explica: 'Es intraespecífica: ambos colibríes son individuos de la misma especie.' },
    { texto: 'El coyote (Canis latrans) caza conejos, ardillas y ratones para alimentarse.', correcta: 'inter', explica: 'Es interespecífica (depredación): el coyote y sus presas son especies distintas.' },
    { texto: 'Los pizotes o coatí (Nasua narica) forman grupos para desplazarse y buscar alimento.', correcta: 'intra', explica: 'Es intraespecífica (organización social): los pizotes que forman el grupo son de la misma especie.' },
    { texto: 'Un colibrí de pico largo poliniza una flor de heliconia de tubo profundo mientras se alimenta de su néctar.', correcta: 'inter', explica: 'Es interespecífica (mutualismo): el colibrí y la heliconia son especies distintas que se benefician mutuamente.' },
    { texto: 'Un parásito muy especializado depende de una única especie de hospedador para sobrevivir.', correcta: 'inter', explica: 'Es interespecífica (parasitismo): el parásito y su hospedador son especies distintas.' },
    { texto: 'Varias plantas de heliconia de la misma especie compiten entre sí por la luz solar disponible.', correcta: 'intra', explica: 'Es intraespecífica: todas las heliconias que compiten son de la misma especie.' },
    { texto: 'Dos especies distintas de plantas compiten por el mismo recurso limitado de agua en el suelo.', correcta: 'inter', explica: 'Es interespecífica (competencia interespecífica): se trata de dos especies distintas.' },
    { texto: 'Dentro de un mismo grupo de pizotes, los adultos protegen a las crías de la manada.', correcta: 'intra', explica: 'Es intraespecífica (organización social): la protección ocurre entre individuos de la misma especie.' },
    { texto: 'Un mosquito Aedes aegypti transmite el virus del dengue a una persona.', correcta: 'inter', explica: 'Es interespecífica (antagónica, cercana al parasitismo): el mosquito y la persona son especies distintas.' },
    { texto: 'Machos y hembras de la misma especie de colibrí se distribuyen los territorios de forma diferente.', correcta: 'intra', explica: 'Es intraespecífica: describe una relación entre individuos de una misma especie de colibrí.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${SITUACIONES_SIM1.length} situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-sim1-opcion="intra">Intraespecífica</button>
          <button class="btn btn-ghost" data-sim1-opcion="inter">Interespecífica</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de tipos de relaciones
     interespecíficas": 2 fases, mismo patrón exacto que Sim2 de
     bio10-u03/u04.js — (A) explorar libremente los 6 tipos reales
     (3 antagónicas + 3 simbióticas), y (B) un quiz de 2ª fase donde
     MQC da el caso real y el estudiante elige el tipo.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'depredacion', nombre: '🐺 Depredación', areas: 'Interespecífica antagónica: un depredador caza y se alimenta de una presa (ej.: el coyote y sus presas).' },
    { id: 'parasitismo', nombre: '🪱 Parasitismo', areas: 'Interespecífica antagónica: un parásito, muy especializado, depende de una única especie de hospedador (ej.: endoparásitos de orugas).' },
    { id: 'competenciaInter', nombre: '🌿 Competencia interespecífica', areas: 'Interespecífica antagónica: especies distintas compiten por los mismos recursos limitados.' },
    { id: 'mutualismo', nombre: '🐦 Mutualismo', areas: 'Interespecífica simbiótica: ambas especies se benefician (ej.: el colibrí y la heliconia).' },
    { id: 'comensalismo', nombre: '🕊️ Comensalismo', areas: 'Interespecífica simbiótica: una especie se beneficia y la otra no resulta ni beneficiada ni perjudicada.' },
    { id: 'amensalismo', nombre: '🍂 Amensalismo', areas: 'Interespecífica antagónica: una especie resulta perjudicada, mientras la otra no se ve afectada de forma relevante.' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'El coyote (Canis latrans) ayuda a controlar las poblaciones de conejos, ardillas y ratones, cazándolos para alimentarse.', opciones: ['Depredación', 'Mutualismo', 'Comensalismo', 'Competencia interespecífica'], correcta: 0 },
    { fenomeno: 'Un parásito muy especializado depende de una única especie de hospedador; un endoparásito interno puede reducir la población de sus hospederos, por ejemplo, de orugas.', opciones: ['Parasitismo', 'Mutualismo', 'Amensalismo', 'Depredación'], correcta: 0 },
    { fenomeno: 'Dos poblaciones de especies distintas compiten por los mismos recursos limitados de su hábitat.', opciones: ['Competencia interespecífica', 'Comensalismo', 'Parasitismo', 'Mutualismo'], correcta: 0 },
    { fenomeno: 'El colibrí poliniza la flor de heliconia mientras se alimenta de su néctar: ambas especies obtienen un beneficio.', opciones: ['Mutualismo', 'Depredación', 'Amensalismo', 'Parasitismo'], correcta: 0 },
    { fenomeno: 'Un ave construye su nido sobre las ramas de un árbol grande, sin afectarlo de forma relevante.', opciones: ['Comensalismo', 'Mutualismo', 'Depredación', 'Competencia interespecífica'], correcta: 0 },
    { fenomeno: 'Una especie resulta perjudicada por la presencia de otra, mientras que esta segunda especie no obtiene ningún beneficio ni perjuicio relevante.', opciones: ['Amensalismo', 'Mutualismo', 'Parasitismo', 'Comensalismo'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada tipo de relación para ver un ejemplo real.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el tipo de relación →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿Qué tipo de relación es esta?</p>
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
     SIMULADOR 3 — "Analizador de riesgo: el mosquito y el dengue":
     escenario guiado en 2 pasos con el caso real de la sección de
     enfermedades transmitidas por vectores. Mismo patrón exacto que
     Sim3 de bio10-u03.js (2 pasos conceptuales, sin cálculo).
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario real (programa del MEP): el mosquito <strong>Aedes aegypti</strong> es el vector transmisor del <strong>dengue</strong>, el <strong>zika</strong> y el <strong>chikungunya</strong>. Su ciclo de vida depende de criaderos con agua estancada, y el programa señala que el cambio climático puede extender su hábitat.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> cuando el mosquito transmite el virus del dengue a una persona y esta resulta perjudicada, ¿qué tipo de relación describe mejor esa interacción?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="antagonica">Interespecífica antagónica (cercana al parasitismo)</button>
            <button class="btn btn-ghost" data-sim3-opcion="mutualismo">Mutualismo (ambas especies se benefician)</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> según el programa, ¿cuál acción de la comunidad ataca más directamente el ciclo de vida del mosquito transmisor?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="criaderos">Eliminar o tapar los recipientes con agua estancada</button>
            <button class="btn btn-ghost" data-sim3-opcion2="perfume">Usar más perfume en la piel todos los días</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">La relación entre el mosquito y la persona es interespecífica antagónica, y la acción más eficaz de gestión del riesgo es eliminar los criaderos de agua estancada, porque ataca directamente el ciclo de vida del vector, tal como lo propone el programa del MEP para construir espacios más seguros en el centro educativo y la comunidad.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01/02/03/04.js,
     apuntando a las funciones paralelas de Biología 11.º) ────────── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source, { disciplina: 'biologia', grado: 11 }); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','biologia11-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().biologia11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateBiologia11Unit === 'function') {
      try { Storage.updateBiologia11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markBiologia11TopicRead === 'function') {
      try { Storage.markBiologia11TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }

  /* ================================================================
     TEORÍA — 5 temas en acordeón. Mismo patrón exacto que
     bio10-u01/02/03/04.js.
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
     bio10-u01/02/03/04.js.
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
      { id: 'sim1', titulo: '🐦 ¿Intraespecífica o interespecífica?', desc: `${SITUACIONES_SIM1.length} situaciones reales (colibríes, coyote, pizotes, heliconias, dengue) para distinguir relaciones intraespecíficas de interespecíficas.` },
      { id: 'sim2', titulo: '🌺 Explorador de tipos de relaciones interespecíficas', desc: 'Explorá los 6 tipos reales (depredación, parasitismo, competencia, mutualismo, comensalismo, amensalismo) y después probá identificando vos mismo el tipo, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🦟 Analizador de riesgo: el mosquito y el dengue', desc: 'Un escenario guiado paso a paso con el caso real de la gestión del riesgo frente al dengue, el zika y el chikungunya (programa del MEP).' }
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'antagonica';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: es una relación interespecífica antagónica, cercana al parasitismo, porque la persona resulta perjudicada.'
            : '💡 En realidad es una relación interespecífica antagónica: la persona resulta perjudicada, así que no puede ser mutualismo.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'criaderos';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: eliminar los criaderos de agua estancada ataca directamente el ciclo de vida del mosquito.'
            : '💡 En realidad es eliminar o tapar los criaderos de agua estancada — el perfume no interrumpe el ciclo de vida del mosquito.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de interacciones": 5 escenarios reales para
     identificar el concepto correcto, con pistas que orientan sin
     revelar la respuesta. Mismo patrón exacto que bio10-u01/02/03/
     04.js: SIN XP al solo iniciar un nivel, y game-won/game-played
     UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Los pizotes o coatí (Nasua narica) forman grupos para desplazarse, buscar alimento y proteger a las crías.',
      pista: 'Pensá en individuos de la misma especie organizándose entre sí, no en dos especies distintas.',
      correcta: 'Relación intraespecífica', opciones: ['Relación intraespecífica', 'Depredación', 'Mutualismo', 'Parasitismo'] },
    { id: 'nivel2', escenario: 'El coyote (Canis latrans) ayuda a controlar las poblaciones de conejos, ardillas y ratones, cazándolos para alimentarse.',
      pista: 'Pensá en un depredador que caza a sus presas, no en una relación de beneficio mutuo.',
      correcta: 'Depredación', opciones: ['Depredación', 'Relación intraespecífica', 'Mutualismo', 'Comensalismo'] },
    { id: 'nivel3', escenario: 'El colibrí, con un pico y una lengua extra largos, poliniza exclusivamente las flores de heliconia de tubo profundo, y ambas especies obtienen un beneficio.',
      pista: 'Pensá en una relación donde ninguna de las dos especies resulta perjudicada, sino todo lo contrario.',
      correcta: 'Mutualismo', opciones: ['Mutualismo', 'Depredación', 'Parasitismo', 'Amensalismo'] },
    { id: 'nivel4', escenario: 'Un parásito muy especializado depende de una única especie de hospedador, al que puede llegar a dañar; el programa usa como ejemplo el caso de las orugas.',
      pista: 'Pensá en una especie que vive a costa de otra, perjudicándola, no en un beneficio compartido.',
      correcta: 'Parasitismo', opciones: ['Parasitismo', 'Mutualismo', 'Relación intraespecífica', 'Competencia interespecífica'] },
    { id: 'nivel5', escenario: 'El mosquito Aedes aegypti transmite el dengue, el zika y el chikungunya; eliminar los criaderos de agua estancada en la casa y el centro educativo es una acción clave para reducir el riesgo de contagio.',
      pista: 'Pensá en el conjunto de acciones de prevención, mitigación y rehabilitación frente a enfermedades transmitidas por vectores, no en un solo tipo de relación biológica.',
      correcta: 'Gestión del riesgo de enfermedades transmitidas por vectores', opciones: ['Gestión del riesgo de enfermedades transmitidas por vectores', 'Depredación', 'Mutualismo', 'Competencia interespecífica'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective de Interacciones</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué concepto describe este escenario?</p>
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
     EXAMEN — banco real (js/data/banco-bio11-u01.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01/02/03/04.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO11_U01 !== 'undefined') ? PREGUNTAS_BIO11_U01 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO11-U01</h3>
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
     MISIÓN FINAL — "Bajo la lupa: la gestión del riesgo frente al
     dengue, el zika y el chikungunya en la comunidad escolar" (mismo
     patrón exacto que bio10-u01/02/03/04.js: awardXP('grade11-
     mission-done') UNA sola vez, vía missionDone). Caso real
     sintetizado a partir de la sección de enfermedades transmitidas
     por vectores del programa oficial (página 64).
     ================================================================ */
  const MISION_A_OPCIONES = ['Dengue', 'Zika', 'Chikungunya', 'Malaria', 'Resfriado común', 'Tuberculosis'];
  const MISION_A_CORRECTAS = ['Dengue', 'Zika', 'Chikungunya', 'Malaria'];
  const MISION_B_OPCIONES = [
    'De la disponibilidad de criaderos con agua estancada',
    'De la presencia de flores con néctar cerca de las casas',
    'De la existencia de mamíferos grandes en la zona',
    'Únicamente de la altitud sobre el nivel del mar'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Eliminar o tapar los recipientes con agua estancada en la casa y el centro educativo',
    'Fumigar una sola vez al año, sin ningún seguimiento posterior',
    'Usar ropa de colores oscuros todos los días',
    'Aumentar el uso de aire acondicionado en las aulas'
  ];
  const MISION_C_CORRECTA = 0;
  const MISION_D_MIN = 40, MISION_D_MAX = 250;

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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: la gestión del riesgo frente al dengue, el zika y el chikungunya en la comunidad escolar".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🦟 Misión: Bajo la lupa — la gestión del riesgo frente al dengue, el zika y el chikungunya</h3>
        <p style="color:var(--text-secondary)">Texto base (programa oficial de Biología del MEP): "Los mosquitos vectores transmisores del dengue, el zika, el chikungunya y la malaria dependen de criaderos con agua estancada para completar su ciclo de vida, y el cambio climático puede extender el hábitat de estos mosquitos. Por ello, el programa propone investigar con la comunidad —vecinos, personal de salud, familias— cuáles son las acciones más comunes que se realizan en el barrio o el centro educativo para evitar esos criaderos, identificar los factores ambientales que favorecen el aumento de estas enfermedades, y elaborar una propuesta concreta de prevención, mitigación y rehabilitación del ambiente para construir espacios más seguros en la escuela y la comunidad."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Cuáles de las siguientes son enfermedades transmitidas por mosquitos vectores, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, ¿de qué depende principalmente que el mosquito vector complete su ciclo de vida?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Cuál acción ataca directamente el ciclo de vida del mosquito, eliminando el lugar donde deposita sus huevos?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. Proponé al menos dos acciones concretas de prevención o mitigación que tu centro educativo podría aplicar para reducir los criaderos de mosquitos transmisores de dengue, zika y chikungunya.</p>
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
        if (!_misionYaOtorgada) awardXP('biologia11-mission-done');
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
     bio10-u01/02/03/04.js — ver biologia11.js) ────────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
