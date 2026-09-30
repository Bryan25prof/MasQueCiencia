/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u07.js
   BIO10-U07 — Las fuerzas evolutivas
   ================================================================
   FUENTES (combinadas, ver también banco-bio10-u07.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad VII / Tema 7 "Las fuerzas
       evolutivas" (páginas impresas 255 a 275). Se pudo leer de forma
       íntegra y confiable casi la totalidad del rango: la
       introducción del tema y "7.1 Historia de la evolución" (Darwin,
       Wallace, las cinco premisas de la selección natural, la síntesis
       neodarwiniana — pág. 255-256), "7.2 Conceptos relacionados con
       evolución" (evolución biológica, frecuencias alélicas, perfil
       genético, microevolución, especiación, población, poza genética,
       variaciones heredables — pág. 256-258), "7.3 Fuerzas evolutivas":
       mutaciones (tipos de mutación, tasa de mutación en humanos —
       pág. 258-259), reproducción sexual y apareamiento (recombinación,
       apareamiento aleatorio/no aleatorio, endogamia — pág. 259-260),
       selección natural (gusano de la mosca de la manzana, VIH,
       polilla Biston betularia, agentes: competencia entre leones,
       depredación guepardo-gacela con coevolución, selección sexual
       del pavo real y dimorfismo sexual del mandril — pág. 260-263),
       migración genética (flujo de genes entre manadas de leones,
       polen y semillas transportados por el viento — pág. 265-266),
       "Actividad 1: Conceptos básicos de evolución" (árbol evolutivo
       del perro desde Cynodictis hasta Canis familiaris, resistencia
       bacteriana a antibióticos — pág. 267-269), "Actividad 2: Fuerzas
       evolutivas" (perros "pura sangre" y depresión endogámica, la
       selección natural en el salmón Oncorhynchus kisutch, el pavo
       real y la selección sexual — pág. 270-272), "Guía de repaso"
       (pág. 273-274) y "Evaluación del tema" (pág. 275).

       El archivo del libro presentó UN solo punto de daño real y
       confirmado dentro de este rango: falta por completo la página
       impresa 263 (salto de numeración 262→264 en el PDF). Esa página
       contenía el inicio de la sección de deriva genética: la
       definición de "deriva genética" (o "desplazamiento genético al
       azar") y la frase introductoria del ejemplo de Zarcero, Costa
       Rica (el resto del ejemplo de Zarcero, el caso de la comunidad
       menonita de Lancaster con el síndrome de Ellis-van Creveld y la
       definición completa de "cuello de botella" SÍ se pudieron leer
       íntegros en la página 264, que continúa el mismo párrafo). Con
       autorización explícita de Bryan, esa frase introductoria puntual
       se reconstruyó usando el Programa de Estudio oficial de Biología
       del MEP ("Educar para una Nueva Ciudadanía", Educación
       Diversificada, Décimo año, Eje temático III, página 55 del
       programa), que confirma "deriva genética" y "migración genética
       o flujo génico" como parte de las fuerzas evolutivas que debe
       reconocer el estudiantado — no es una transcripción del libro
       dañado, sino una redacción general de la definición a partir del
       programa oficial. Además, en la página 269 el recuadro amarillo
       sobre resistencia bacteriana a antibióticos aparece parcialmente
       cortado (solo se pudo leer su párrafo final) — se usó únicamente
       la parte legible, sin inventar el resto.

   (b) Programa de Estudio de Biología del MEP (ver arriba) — usado
       exclusivamente para la reconstrucción puntual descrita arriba.

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
  const UNIT_ID = 'bio10-u07';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🕰️', titulo: 'Historia de la evolución',
      ideaClave: 'Las ideas evolucionistas se consolidaron gracias a los trabajos independientes de Darwin y Wallace, y su combinación con la genética mendeliana dio origen a la síntesis neodarwiniana.',
      explicacion: 'Desde tiempos remotos, la explicación más común del origen de las especies fue la <strong>creación divina</strong> de cada especie en su forma actual. Sin embargo, los fósiles y las exploraciones biológicas y geológicas pusieron en duda esa idea. Desde mediados del siglo XIX, los científicos concluyeron que las especies se originaron y evolucionaron por <strong>procesos naturales</strong>. Las ideas evolucionistas fueron ampliamente aceptadas solo después de la publicación de "El origen de las especies" de <strong>Charles Darwin</strong>, aunque las ideas en que se basa su trabajo se fueron desarrollando gradualmente desde siglos anteriores. <strong>Alfred Russel Wallace</strong>, geógrafo, botánico y naturalista inglés, alcanzó el concepto de selección natural de forma independiente a Darwin. El concepto de ambos se funda en cinco premisas: (1) los organismos engendran organismos similares; (2) sobreviven y se reproducen pocos individuos en comparación con el total producido; (3) ocurren variaciones aleatorias hereditarias; (4) el ambiente determina cuáles variaciones son "favorables"; y (5) con tiempo suficiente, la selección natural acumula cambios que provocan diferencias entre grupos de organismos.',
      ejemplo: 'El desarrollo posterior de la genética permitió responder tres cuestiones que Darwin nunca pudo resolver: de qué manera se transmiten las características heredadas, por qué no se "mezclan" sino que pueden reaparecer en generaciones posteriores, y de qué manera se originan las variaciones sobre las que actúa la selección natural.',
      aplicacion: 'La combinación de la teoría de la evolución de Darwin con los principios de la genética mendeliana se conoce como <strong>síntesis neodarwiniana</strong> o Teoría Sintética de la evolución, y sigue siendo el marco básico para comprender el proceso evolutivo en la actualidad.',
      compruebra: '¿Por qué la genética fue necesaria para completar las ideas originales de Darwin y Wallace sobre la evolución?' },

    { id: 't2', icon: '🧬', titulo: 'Conceptos relacionados con evolución',
      ideaClave: 'La evolución biológica es el cambio en las frecuencias alélicas de una población a través de generaciones, y varios conceptos —perfil genético, población, poza genética, microevolución, especiación— ayudan a describirla con precisión.',
      explicacion: 'La <strong>evolución biológica</strong> es el proceso continuo de transformación de las especies a través de cambios producidos en sucesivas generaciones, que se reflejan en el cambio de las <strong>frecuencias alélicas</strong> de una población (qué tan común es un alelo, contando cuántas veces aparece entre el total de copias del gen). El <strong>perfil genético</strong> o huella genética es la información en las secuencias de ADN de cada individuo, diferente para cada uno excepto en gemelos monocigóticos. La <strong>microevolución</strong> son cambios en el fondo genético de una población que resultan en transformaciones de sus variedades (por ejemplo, cepas bacterianas resistentes a antibióticos). La <strong>especiación</strong> es el proceso de formación de especies, en el que una sola especie se divide en dos o más cuando la población ya no está disponible para mezclarse con otras.',
      ejemplo: 'Una <strong>población</strong> es un grupo de individuos de la misma especie que viven en la misma área geográfica y comparten un mismo conjunto de genes. Ese fondo común de genes se llama <strong>reserva genética, acervo genético o poza genética</strong>.',
      aplicacion: 'Las <strong>variaciones heredables</strong> son cambios que ha experimentado genéticamente una especie y que pueden transmitirse a su descendencia — son el fundamento de la evolución y la fuente genética de la diversidad biológica. Cuanto mayor sea esa variabilidad, mayores serán las probabilidades de adaptarse y sobrevivir a las diversas influencias ambientales.',
      compruebra: 'Con tus palabras, ¿cuál es la diferencia entre "población" y "poza genética"?' },

    { id: 't3', icon: '🔬', titulo: 'Mutación y reproducción sexual',
      ideaClave: 'La mutación y la reproducción sexual son las dos fuerzas evolutivas que generan variabilidad genética nueva en una población.',
      explicacion: 'Una <strong>mutación</strong> es una alteración o modificación en la información genética (genotipo) de un ser vivo, de carácter aleatorio, que ocurre en la secuencia de bases del ADN durante la división celular. La unidad genética capaz de mutar es el <strong>gen</strong>. En los organismos multicelulares, las mutaciones solo se heredan cuando afectan a las células reproductivas. Existen varios tipos de mutaciones, como las de <strong>supresión, duplicación e inversión</strong>. Según el texto, un gen humano mutado aparecerá en uno de cada 100 000 gametos producidos, o uno de cada 50 000 recién nacidos; aunque las mutaciones causan cambios leves en la frecuencia de cualquier alelo, lo esencial para la evolución es el efecto acumulativo de dichas mutaciones. La mayoría de las mutaciones con efecto fenotípico son perjudiciales; solo una pequeña proporción es benéfica.',
      ejemplo: 'Toda la reproducción sexual crea nuevas combinaciones de alelos mediante la <strong>recombinación</strong>, que puede verse como la acción de "barajar" los genes de los progenitores. El <strong>apareamiento aleatorio (al azar)</strong> ocurre cuando los individuos escogen a sus compañeros sin preferencia; el <strong>apareamiento no aleatorio o selectivo</strong> se da entre individuos con una relación más cercana o mayor similitud genética.',
      aplicacion: 'Cuando el apareamiento de individuos similares y cercanos se repite en la población completa se llama <strong>endogamia</strong>. La endogamia puede ocasionar depresión endogámica, en la cual los individuos endogámicos tienen menor aptitud que los no endogámicos — como ocurre en razas de perros "pura sangre", donde una reserva genética muy pequeña puede conducir a la transmisión de características indeseables.',
      compruebra: '¿Por qué una mutación, aunque sea rara, puede tener un efecto acumulativo importante para la evolución de una especie?' },

    { id: 't4', icon: '🦁', titulo: 'Selección natural y sus agentes',
      ideaClave: 'La selección natural es el proceso por el cual los individuos con características heredables ventajosas tienen mayor éxito reproductivo, y actúa mediante agentes como la competencia, la relación depredador-presa y la selección sexual.',
      explicacion: 'La <strong>selección natural</strong> es el proceso por el cual una especie se adapta a su medio ambiente: individuos con ciertas características poseen una tasa de supervivencia o reproducción más alta que el resto y pasan esas características heredables a su progenie. La acción más común de la selección natural es <strong>remover las variantes ineptas</strong> producidas por mutación. Un ejemplo real es el gusano de la mosca de la manzana, que se convirtió en plaga hace unos 100 años en el noreste de Estados Unidos al adaptarse a un nuevo hospedero y desarrollar resistencia a insecticidas; algo similar ocurre con el virus VIH, capaz de evolucionar rápidamente y presentar resistencia a drogas que antes eran efectivas en su contra. Otro caso citado es el de la mariposa <em>Biston betularia</em>: antes de la revolución industrial presentaba coloración clara, pero actualmente, en algunas áreas, el 90% de esas mariposas presenta coloración oscura.',
      ejemplo: 'Entre los agentes que favorecen la selección natural están: la <strong>competencia</strong> (por ejemplo, cuando otro león disputa y gana una manada, logrando reproducirse); la relación <strong>depredador-presa</strong> (como el guepardo y la gacela), que puede generar <strong>coevolución</strong> —una retroalimentación entre dos especies, como en el caso de las flores y sus polinizadores—; y la <strong>selección sexual</strong>, que favorece características muy llamativas para atraer parejas, como las plumas del pavo real.',
      aplicacion: 'A las diferencias fenotípicas muy marcadas entre machos y hembras de una especie, como ocurre en el mandril, se le llama <strong>dimorfismo sexual</strong>. En el salmón (<em>Oncorhynchus kisutch</em>), los machos compiten ferozmente por fecundar los huevos: unos ganan por ser más grandes, otros por ocultarse entre las rocas y evitar ser vistos — dos formas distintas de éxito reproductivo dentro de la misma especie.',
      compruebra: '¿Qué diferencia hay entre la competencia y la relación depredador-presa como agentes de la selección natural?' },

    { id: 't5', icon: '🎲', titulo: 'Deriva genética: efecto fundador y cuello de botella',
      ideaClave: 'La deriva genética es un cambio aleatorio en las frecuencias alélicas de una población pequeña, que puede darse por efecto fundador o por un cuello de botella poblacional.',
      explicacion: 'La <strong>deriva genética</strong> (o desplazamiento genético al azar) es uno de los mecanismos adicionales de la evolución: produce cambios aleatorios en las frecuencias alélicas de una población, cambios que no están dirigidos por ninguna presión selectiva y que son más notorios en poblaciones pequeñas. Una de sus formas es el <strong>efecto fundador</strong>, que ocurre cuando una nueva población se origina a partir de un número reducido de individuos, lo que puede aumentar la frecuencia de ciertos alelos poco comunes. En Costa Rica, la mayor parte de los habitantes de <strong>Zarcero</strong> descienden de solo ocho familias fundadoras que llegaron alrededor de 1854, lo cual potenció la aparición de una enfermedad genética poco común en la zona.',
      ejemplo: 'En el condado de Lancaster, Pensilvania, vive una comunidad menonita; debido al efecto fundador, algunos de sus miembros padecen el <strong>síndrome de Ellis-van Creveld</strong>, cuyos síntomas incluyen brazos y piernas cortos y dedos adicionales.',
      aplicacion: 'El <strong>cuello de botella</strong> es otra forma de deriva genética: consiste en que una población sufre una reducción drástica en su tamaño, lo que aumenta la probabilidad de sufrir deriva genética, ya que cualquier mutación en un individuo se amplificará cuando la población vuelva a crecer. El elefante marino del norte y el chita (guepardo) pasaron, en un pasado reciente, por un cuello de botella poblacional. La deriva genética reduce la variación genética dentro de una población, y un alelo puede llegar a fijarse (frecuencia 1) o a desaparecer por completo (frecuencia 0).',
      compruebra: '¿En qué se parecen y en qué se diferencian el efecto fundador y el cuello de botella poblacional?' },

    { id: 't6', icon: '🦅', titulo: 'Migración genética (flujo génico)',
      ideaClave: 'La migración genética o flujo de genes es el movimiento de alelos entre poblaciones cuando los individuos (o sus gametos) se trasladan de una población a otra.',
      explicacion: 'La <strong>migración genética</strong> (o flujo génico) es el movimiento de alelos entre poblaciones. Los alelos se transfieren de un acervo genético a otro porque los individuos se mueven de una población a otra y se cruzan con individuos de las nuevas poblaciones: por ejemplo, cuando un león joven deja su manada, vence al león dominante de otra manada y se aparea con sus hembras, sus descendientes portarán alelos de la poza genética de la manada original. Los alelos también pueden moverse sin que los individuos lo hagan directamente, como ocurre con las semillas y el polen de algunas plantas, transportados por el viento u otros agentes.',
      ejemplo: 'El principal efecto evolutivo del flujo de genes es el incremento de la <strong>similitud genética</strong> entre poblaciones diferentes de una especie, por el movimiento de alelos de un lado a otro. La <strong>inmigración</strong> puede introducir nuevo material genético en una población; la <strong>emigración</strong>, en cambio, provoca una pérdida de material genético en la población de origen.',
      aplicacion: 'Las migraciones humanas durante la expansión neolítica determinaron de forma significativa el tipo y la cantidad de variación genética de nuestra especie. Por otra parte, si el flujo de genes se bloquea entre las poblaciones de una especie, podría darse un aumento en la diferencia genética tan grande que una de las poblaciones llegara a constituir una nueva especie.',
      compruebra: '¿Por qué el flujo génico entre dos poblaciones tiende a hacerlas más parecidas genéticamente entre sí?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Cuál fuerza evolutiva es?": 10 situaciones reales
     del libro (mosca de la manzana, VIH, Zarcero, leones, elefante
     marino, polen) para clasificar entre las 5 fuerzas evolutivas.
     Mismo patrón exacto de Sim1 de bio10-u01.js/u02.js/u03.js, pero
     con 5 categorías en vez de 2.
     ================================================================ */
  const CATEGORIAS_SIM1 = [
    { id: 'mutacion', label: 'Mutación' },
    { id: 'reproduccion', label: 'Reproducción sexual' },
    { id: 'seleccion', label: 'Selección natural' },
    { id: 'deriva', label: 'Deriva genética' },
    { id: 'migracion', label: 'Migración genética' }
  ];
  const SITUACIONES_SIM1 = [
    { texto: 'Un error en la replicación del ADN escapa a los sistemas de reparación celular y da origen a un nuevo alelo.', correcta: 'mutacion', explica: 'Es mutación: un cambio directo en la secuencia del ADN que origina un nuevo alelo.' },
    { texto: 'Durante la meiosis, los cromosomas homólogos se entrecruzan e intercambian fragmentos de ADN, mezclando los alelos del padre y de la madre.', correcta: 'reproduccion', explica: 'Es reproducción sexual: la recombinación mezcla los alelos heredados de ambos progenitores.' },
    { texto: 'El gusano de la mosca de la manzana se volvió resistente a los insecticidas usados en su contra, convirtiéndose en una plaga difícil de controlar.', correcta: 'seleccion', explica: 'Es selección natural: los individuos resistentes sobrevivieron y se reprodujeron con más éxito.' },
    { texto: 'En Zarcero, Costa Rica, la mayoría de los habitantes descienden de solo ocho familias fundadoras que llegaron alrededor de 1854.', correcta: 'deriva', explica: 'Es deriva genética (efecto fundador): la población se originó de un número muy reducido de fundadores.' },
    { texto: 'Un león joven abandona su manada, vence al león dominante de otra manada y se aparea con sus hembras, llevando sus alelos a esa nueva población.', correcta: 'migracion', explica: 'Es migración genética: los alelos se trasladan de una población a otra por el movimiento de un individuo.' },
    { texto: 'El elefante marino del norte y el chita (guepardo) pasaron, en un pasado reciente, por una reducción drástica en el tamaño de su población.', correcta: 'deriva', explica: 'Es deriva genética (cuello de botella): una reducción drástica del tamaño poblacional.' },
    { texto: 'Las semillas y el polen de ciertas plantas viajan largas distancias transportados por el viento, trasladando alelos hacia otras poblaciones.', correcta: 'migracion', explica: 'Es migración genética: los alelos se mueven entre poblaciones sin que los individuos se trasladen directamente.' },
    { texto: 'El virus VIH desarrolla resistencia a los medicamentos que antes eran efectivos en su contra.', correcta: 'seleccion', explica: 'Es selección natural: los virus resistentes sobreviven al tratamiento y se reproducen.' },
    { texto: 'Una mutación por duplicación o por inversión altera la secuencia de nucleótidos de un cromosoma.', correcta: 'mutacion', explica: 'Es mutación: la duplicación y la inversión son tipos de mutación mencionados en el texto.' },
    { texto: 'El apareamiento no aleatorio entre individuos genéticamente similares (endogamia) se combina con la recombinación de sus genes durante la reproducción.', correcta: 'reproduccion', explica: 'Es reproducción sexual: el apareamiento y la recombinación son parte de este mecanismo evolutivo.' }
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
          ${CATEGORIAS_SIM1.map(c => `<button class="btn btn-ghost" data-sim1-opcion="${c.id}">${c.label}</button>`).join('')}
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de los agentes de la selección natural":
     2 fases, mismo patrón exacto que Sim2 de bio10-u03.js — (A)
     explorar libremente 3 agentes reales, y (B) un quiz de 2ª fase
     donde MQC da el caso y el estudiante elige el agente.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'competencia', nombre: '⚔️ Competencia', areas: 'Individuos que compiten por alimento, agua, territorio o parejas (ejemplo: disputa entre leones por una manada)' },
    { id: 'depredador', nombre: '🐆 Depredador y presa', areas: 'Presión selectiva mutua entre depredador y presa, que puede generar coevolución (ejemplo: guepardo y gacela)' },
    { id: 'sexual', nombre: '🦚 Selección sexual', areas: 'Características llamativas que ayudan a atraer parejas (ejemplo: plumaje del pavo real, dimorfismo sexual del mandril)' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'En una manada de leones, si otro león llega a disputar el territorio y gana la lucha, se queda con la manada y logra reproducirse.', opciones: ['Competencia', 'Depredador y presa', 'Selección sexual', 'Deriva genética'], correcta: 0 },
    { fenomeno: 'Un guepardo persigue a una gacela; con el tiempo, las gacelas más veloces sobreviven más, y los guepardos más veloces cazan con más éxito.', opciones: ['Depredador y presa', 'Competencia', 'Selección sexual', 'Migración genética'], correcta: 0 },
    { fenomeno: 'Los machos del pavo real tienen plumas de colores llamativos que ayudan a atraer a las hembras durante el apareamiento.', opciones: ['Selección sexual', 'Competencia', 'Depredador y presa', 'Mutación'], correcta: 0 },
    { fenomeno: 'Los pastos de las praderas se vuelven cada vez más duros debido al sílice, posiblemente como respuesta al pastoreo excesivo — un ejemplo de coevolución.', opciones: ['Depredador y presa', 'Selección sexual', 'Competencia', 'Deriva genética'], correcta: 0 },
    { fenomeno: 'El mandril presenta diferencias fenotípicas muy marcadas entre el macho y la hembra (dimorfismo sexual).', opciones: ['Selección sexual', 'Depredador y presa', 'Competencia', 'Migración genética'], correcta: 0 },
    { fenomeno: 'Ciertos recursos, como el alimento o el territorio, se ven disminuidos para unos individuos por la presencia de otros de la misma especie.', opciones: ['Competencia', 'Selección sexual', 'Depredador y presa', 'Mutación'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada agente para ver un ejemplo real de cómo actúa en la selección natural.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el agente →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué agente de la selección natural es este?</p>
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
     SIMULADOR 3 — "Efecto fundador en Zarcero": escenario guiado en 2
     pasos, con el caso real de Costa Rica citado en el libro. Mismo
     patrón exacto que Sim3 de bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: en <strong>Zarcero, Costa Rica</strong>, la mayor parte de los habitantes descienden de solo <strong>ocho familias fundadoras</strong> que llegaron alrededor de 1854, lo cual potenció la aparición de una enfermedad genética poco común en la zona.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> comparada con la de una población grande y diversa, ¿la variabilidad genética de una población que desciende de solo ocho fundadores es más amplia o más reducida?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="reducida">Más reducida</button>
            <button class="btn btn-ghost" data-sim3-opcion="amplia">Más amplia</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ¿por qué ocurre esto?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="pocosfundadores">Porque la nueva población parte de muy pocos individuos, que no representan toda la variabilidad genética original</button>
            <button class="btn btn-ghost" data-sim3-opcion2="climafrio">Porque el clima frío de la zona elimina la mayoría de los alelos poco comunes</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Cuando una población se origina a partir de muy pocos individuos fundadores, su variabilidad genética es más reducida que la de la población original — y por azar, alelos poco comunes entre esos fundadores pueden volverse mucho más frecuentes, como ocurrió en Zarcero y en la comunidad menonita de Lancaster (síndrome de Ellis-van Creveld).</p>
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
      { id: 'sim1', titulo: '🎯 ¿Cuál fuerza evolutiva es?', desc: '10 situaciones reales (mosca de la manzana, VIH, Zarcero, leones, elefante marino) para identificar la fuerza evolutiva en juego.' },
      { id: 'sim2', titulo: '🦚 Explorador de los agentes de la selección natural', desc: 'Explorá los 3 agentes de la selección natural y después probá identificando vos mismo el agente, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🎲 Efecto fundador en Zarcero', desc: 'Un escenario guiado paso a paso con el caso real de Zarcero, Costa Rica, y la comunidad menonita de Lancaster.' }
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
        }, 1600);
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El agente correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'reducida';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: al originarse de muy pocos fundadores, la nueva población tiene una variabilidad genética más reducida.'
            : '💡 En realidad es más reducida: al originarse de muy pocos fundadores, la nueva población no representa toda la variabilidad genética original.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'pocosfundadores';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: partir de pocos individuos hace que la nueva población no represente toda la variabilidad genética original.'
            : '💡 En realidad es porque la población parte de muy pocos individuos fundadores — no se trata de un efecto del clima.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de las fuerzas evolutivas": 5 escenarios reales,
     uno por cada fuerza evolutiva, con pistas que orientan sin revelar
     la respuesta. Mismo patrón exacto que bio10-u01.js/u02.js/u03.js:
     SIN XP al solo iniciar un nivel, y game-won/game-played UNA sola
     vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'El gusano de la mosca de la manzana se convirtió en una plaga hace unos 100 años y se volvió resistente a varios insecticidas químicos.',
      pista: 'Pensá en un proceso que favorece a los individuos con mejor éxito reproductivo frente a una presión del ambiente.',
      correcta: 'Selección natural', opciones: ['Selección natural', 'Deriva genética', 'Migración genética', 'Mutación'] },
    { id: 'nivel2', escenario: 'En Zarcero, Costa Rica, la mayoría de los habitantes descienden de solo ocho familias fundadoras que llegaron alrededor de 1854, lo que potenció la aparición de una enfermedad genética poco común.',
      pista: 'Pensá en una población que se originó a partir de muy pocos individuos fundadores.',
      correcta: 'Deriva genética (efecto fundador)', opciones: ['Deriva genética (efecto fundador)', 'Selección natural', 'Reproducción sexual', 'Migración genética'] },
    { id: 'nivel3', escenario: 'Un león joven abandona su manada, vence al león dominante de otra manada distinta y se aparea con sus hembras, llevando alelos de su manada original a la nueva población.',
      pista: 'Pensá en el movimiento de un individuo (y sus alelos) entre dos poblaciones distintas.',
      correcta: 'Migración genética', opciones: ['Migración genética', 'Mutación', 'Deriva genética', 'Selección natural'] },
    { id: 'nivel4', escenario: 'Un error en la replicación del ADN escapa a los sistemas de reparación celular, generando un nuevo alelo que antes no existía en la población.',
      pista: 'Pensá en un cambio que ocurre directamente en la secuencia del ADN.',
      correcta: 'Mutación', opciones: ['Mutación', 'Reproducción sexual', 'Migración genética', 'Selección natural'] },
    { id: 'nivel5', escenario: 'Durante la meiosis, los cromosomas homólogos se entrecruzan e intercambian fragmentos de ADN, combinando los alelos heredados del padre y de la madre.',
      pista: 'Pensá en el proceso que combina los genes de dos progenitores para formar la descendencia.',
      correcta: 'Reproducción sexual', opciones: ['Reproducción sexual', 'Mutación', 'Deriva genética', 'Migración genética'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective de las Fuerzas Evolutivas</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la fuerza evolutiva en juego?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u07.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U07 !== 'undefined') ? PREGUNTAS_BIO10_U07 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U07</h3>
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
     MISIÓN FINAL — "Bajo la lupa: el efecto fundador en Zarcero"
     (mismo patrón exacto que bio10-u01.js/u02.js/u03.js: awardXP
     ('biologia10-mission-done') UNA sola vez, vía missionDone). Caso
     real citado en el libro, con datos reales (ocho familias
     fundadoras de 1854, síndrome de Ellis-van Creveld en la comunidad
     menonita de Lancaster).
     ================================================================ */
  const MISION_A_OPCIONES = ['Es un ejemplo real de efecto fundador documentado en el libro de texto', 'Está relacionado con una población que desciende de un número reducido de fundadores', 'Ocurre porque la población tiene una variabilidad genética extremadamente alta', 'No tiene ninguna relación con las fuerzas evolutivas'];
  const MISION_A_CORRECTAS = ['Es un ejemplo real de efecto fundador documentado en el libro de texto', 'Está relacionado con una población que desciende de un número reducido de fundadores'];
  const MISION_B_OPCIONES = [
    'Zarcero, un pueblo cuyos habitantes descienden mayoritariamente de ocho familias fundadoras llegadas alrededor de 1854',
    'Barra del Colorado, por la introducción del camarón tigre asiático',
    'El mar Caribe, por la introducción del pez león',
    'Talamanca, por la fragmentación del hábitat del jaguar'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Algunos de sus miembros padecen el síndrome de Ellis-van Creveld, con brazos y piernas cortos y dedos adicionales',
    'Todos sus miembros desarrollan una resistencia genética total a cualquier enfermedad',
    'La comunidad completa dejó de poder reproducirse',
    'Se convirtieron en una especie completamente distinta a la humana'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el efecto fundador en Zarcero".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🎲 Misión: Bajo la lupa — el efecto fundador en Zarcero</h3>
        <p style="color:var(--text-secondary)">Texto base: "La mayor parte de los habitantes de Zarcero descienden de ocho familias fundadoras, que llegaron alrededor de 1854, lo cual potenció la aparición de la enfermedad. En el condado de Lancaster en Pensilvania, vive una comunidad menonita. Debido al efecto fundador, algunos de sus miembros padecen el síndrome de Ellis-van Creveld, en donde los síntomas son brazos y piernas cortos y dedos adicionales, según se muestra en la radiografía."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué características tiene el efecto fundador, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cuál es el ejemplo real de efecto fundador en Costa Rica, según el texto?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Qué consecuencia genética tiene el efecto fundador en la comunidad menonita de Lancaster, según el texto?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué el efecto fundador puede aumentar la probabilidad de que aparezcan enfermedades genéticas poco comunes en una población pequeña, como ocurrió en Zarcero y en la comunidad menonita de Lancaster?</p>
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
