/* ================================================================
   MÁSQUECIENCIA — js/units/biologia11/bio11-u05.js
   BIO11-U05 — Desarrollo sostenible y cambio climático
   ================================================================
   FUENTE (ver también banco-bio11-u05.js):

   A diferencia de Biología 10.º (que sí tiene un libro de texto
   privado), Biología 11.º NO tiene libro de texto propio: esta
   unidad, como toda Biología 11.º, usa como fuente primaria y única
   el Programa de Estudio oficial de Biología del Ministerio de
   Educación Pública de Costa Rica, "Educar para una nueva
   ciudadanía", sección "Undécimo año de Educación Académica;
   Duodécimo año de Educación Técnica", Eje temático III, sub-tema xii
   "¿Por qué cambiar para ser parte de la solución en el Sistema
   Tierra?" — páginas IMPRESAS 75 a 77 del documento (pdf.pages[77],
   [78] y [79] con pikepdf, offset índice = página impresa + 2,
   confirmado visualmente con pdftoppm: el pie de cada página muestra
   "75", "76" y "77" respectivamente, y la página siguiente,
   pdf.pages[80], ya muestra "REFERENCIAS" con el número "78" — es
   decir, el sub-tema xii es real y completo en esas 3 páginas, y no
   hay ningún punto dañado ni recuadro vacío en ellas).

   Contenido real usado, tal como aparece en el programa:
   - Criterios de evaluación del Eje temático III: analizar los
     procesos de transformación constructiva hacia el desarrollo
     sostenible; indagar soluciones, perspectivas, mitigación,
     compensación y reducción del cambio climático; argumentar la
     importancia de la participación en programas de transformación
     constructiva; contribuir en el rescate y conservación de los
     diversos hábitats y áreas protegidas locales.
   - Situación de aprendizaje sobre áreas protegidas (pág. 75): en
     plenaria se selecciona un área protegida de la localidad o
     cercana, se investiga y se planea cómo visitarla para colaborar
     en su mantenimiento; también se selecciona un espacio natural de
     fin recreativo y se participa en programas de rescate y
     conservación medioambiental de los diversos hábitats de la
     localidad. La gira educativa o visita de campo se planifica
     institucionalmente (extramuros), buscando toma de conciencia y
     el desarrollo de un proyecto plural, democrático y solidario,
     orientado en una perspectiva sostenible, que respete y potencie
     la diversidad biológica y cultural. Cada subgrupo prepara un
     informe y lo expone en plenaria y en el mural de la sección, con
     imágenes representativas y soluciones tecnológicas (presenta-
     ciones, videos, entre otros).
   - Los servicios que ofrece la biodiversidad (pág. 75), citados de
     forma explícita: recreación, investigación, turismo, energía,
     alimentos, madera, medicinas, control biológico, protección
     contra fenómenos naturales, fijación fotosintética, manteni-
     miento del ciclo del agua, regulación del clima, producción y
     protección del suelo, almacenamiento y circulación de
     nutrientes, absorción y desintegración de contaminantes, y
     valores científicos, educacionales, espirituales, estéticos,
     recreacionales, socioculturales e históricos — cerrando con la
     frase textual: "la pérdida de la biodiversidad es la pérdida de
     ecosistemas, especies y genes, es decir la vida sobre el
     planeta".
   - Sostenibilidad y desarrollo sostenible (pág. 76): el programa da
     ambas definiciones de forma explícita y textual — la
     sostenibilidad como formas de desarrollo económico que
     consideran, para su conservación y manejo, los recursos
     naturales existentes, con armonía, respeto y equilibrio entre
     desarrollo y naturaleza; y el desarrollo sostenible como un
     proceso de cambio progresivo en la calidad de vida de los seres
     humanos, posible solo con crecimiento económico con equidad
     social y una serie de cambios (explotación de recursos, patrones
     de consumo, métodos de producción, inversiones, desarrollo
     tecnológico e institucional) sustentados en la responsabilidad
     ecológica y el respeto a la diversidad étnica y cultural, sin
     comprometer la calidad de vida de las generaciones futuras.
   - La red de problemáticas ambientales locales y globales (pág. 76),
     enumerada de forma explícita: a) Cambio Climático, b) Pérdida de
     Biodiversidad, c) Alteración de los Ciclos de fósforo y
     nitrógeno, d) Pérdida del agua de consumo, e) Acidificación del
     océano, f) Contaminación del suelo, agua y aire (con ejemplos
     textuales: residuos tóxicos, metales, nitratos, plásticos), g)
     Desgaste de la capa de ozono, h) Pesca en exceso, i)
     Deforestación, j) Minería, k) Eutrofización, m) Biomagnificación.
     Cada subgrupo investiga la problemática en el nivel atmosférico,
     de agua, de área urbana y de vida silvestre, y participan en una
     plenaria, foro o debate de análisis de causas, consecuencias,
     posibles soluciones y perspectivas, hasta llegar a consenso y
     redactar compromisos/recomendaciones/solicitudes dirigidos al
     personal docente, la dirección, la Junta Administrativa,
     gobiernos locales, el poder legislativo y otras instituciones.
   - Proyectos de responsabilidad ambiental y el ciudadano crítico
     (pág. 76-77): idea textual de que "un ciudadano crítico no se
     limita a protestar, sino que también prevé, anticipa y abre
     rutas de solución"; el estudiantado propone opciones de
     mitigación, compensación y reducción del cambio climático para
     proyectar escenarios ambientales deseables e intervenir con
     éxito como vecinos, consumidores o usuarios; los proyectos de
     responsabilidad ambiental buscan "ser parte de la solución
     aplicando las buenas prácticas ambientales, desarrollo de la
     capacidad organizativa y del esfuerzo solidario"; pueden ser
     locales (el salón de clases, la casa o la localidad) pero deben
     abrir su perspectiva hasta su incidencia nacional o mundial, y es
     indispensable que posean una visión esperanzadora y sean
     factibles de realización, para evitar el desaliento y el
     pesimismo.

   Mismo patrón de plugin EXACTO que bio10-u01.js/u02.js/u03.js/u08.js
   — apunta a Storage.updateBiologia11Unit / markBiologia11TopicRead /
   data.biologia11, nunca a las funciones de Biología 10.º, Química ni
   de Física. Mismas protecciones anti-farming de XP y mismo
   mecanismo anti-trampa del examen (selección de preguntas Y orden de
   opciones aleatorios en cada intento). El contexto de XP usa
   {disciplina:'biologia', grado:11} en vez de grado:10.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio11-u05';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🏞️', titulo: 'Áreas protegidas y participación en su conservación',
      ideaClave: 'Cuidar un área protegida local exige participación activa y planificada: investigar antes de visitarla, planear la gira de campo, y colaborar directamente en programas de rescate y conservación de sus hábitats.',
      explicacion: 'Según el programa, en plenaria el grupo <strong>selecciona un área protegida</strong> de la localidad o cercana, la <strong>investiga y planea cómo visitarla</strong> para colaborar en su mantenimiento; además, selecciona un espacio natural de fin recreativo y participa en <strong>programas de rescate y conservación medioambiental</strong> de los diversos hábitats de la localidad. La gira educativa o visita de campo se planifica de forma institucional y extramuros, buscando que el estudiantado tome conciencia y desarrolle un <strong>proyecto plural, democrático y solidario</strong>, orientado en una perspectiva sostenible, que respete y potencie tanto la diversidad biológica como la cultural, y reconozca los servicios que ofrecen los ecosistemas.',
      ejemplo: 'Un subgrupo selecciona en plenaria un área protegida cercana a su comunidad, investiga previamente sus características y luego participa en un programa real de rescate y conservación de uno de sus hábitats, en lugar de simplemente visitarla como un paseo sin propósito.',
      aplicacion: 'Al volver de la visita de campo, cada subgrupo prepara un informe de lo aprendido y de los resultados obtenidos de acuerdo a lo planeado, y lo expone en plenaria y en el mural de la sección usando imágenes representativas y soluciones tecnológicas como presentaciones o videos — convirtiendo la experiencia individual en aprendizaje compartido por todo el grupo.',
      compruebra: '¿Por qué el programa insiste en que la visita a un área protegida debe tener una "planificación previa" y no ser solo un paseo espontáneo?' },

    { id: 't2', icon: '🌿', titulo: 'Los servicios que brinda la biodiversidad',
      ideaClave: 'La biodiversidad no es solo diversidad de especies: sostiene una enorme cantidad de servicios de los que depende directamente la vida humana, y perderla equivale a perder ecosistemas, especies y genes — la vida misma sobre el planeta.',
      explicacion: 'El programa enumera de forma explícita los servicios que suministra la biodiversidad: <strong>recreación, investigación, turismo, energía, alimentos, madera, medicinas, control biológico, protección contra fenómenos naturales, fijación fotosintética, mantenimiento del ciclo del agua, regulación del clima, producción y protección del suelo, almacenamiento y circulación de nutrientes, y absorción y desintegración de contaminantes</strong>. A esto se suman valores científicos, educacionales, espirituales, estéticos, recreacionales, socioculturales e históricos. El programa resume la gravedad de perderla con una frase textual: <em>"la pérdida de la biodiversidad es la pérdida de ecosistemas, especies y genes, es decir la vida sobre el planeta"</em>.',
      ejemplo: 'Un bosque cumple a la vez varios de estos servicios: fija carbono mediante la fotosíntesis, regula el clima local, protege el suelo de la erosión, mantiene el ciclo del agua y ofrece plantas usadas en medicina tradicional — todo al mismo tiempo, sin que esos servicios compitan entre sí.',
      aplicacion: 'Cuando se calcula el "valor" de conservar un ecosistema, hay que considerar no solo su valor económico directo (madera, turismo) sino también valores científicos, educacionales, espirituales, estéticos, socioculturales e históricos — dimensiones que rara vez tienen un precio de mercado pero que también se pierden si el ecosistema desaparece.',
      compruebra: 'Con tus propias palabras, explicá qué tres elementos dice el programa que se pierden a la vez cuando se pierde biodiversidad.' },

    { id: 't3', icon: '♻️', titulo: 'Sostenibilidad y desarrollo sostenible',
      ideaClave: 'La sostenibilidad es el equilibrio entre el desarrollo económico y la conservación de los recursos naturales; el desarrollo sostenible añade la dimensión social y temporal: mejorar la calidad de vida humana sin comprometer a las generaciones futuras.',
      explicacion: 'El programa define la <strong>sostenibilidad</strong> como "todas aquellas formas de desarrollo económico que se efectúan en un lugar determinado y que consideran para su conservación y manejo los recursos naturales existentes": hay armonía, respeto y equilibrio entre desarrollo y naturaleza, y hay conservación y mantenimiento (uso y manejo) de ecosistemas, vida silvestre y hábitats. Define el <strong>desarrollo sostenible</strong> como "un proceso de cambio progresivo en la calidad de vida de los seres humanos", posible solo si se da crecimiento económico con equidad social, junto con cambios en la explotación de los recursos, los patrones de consumo, los métodos de producción, la orientación de las inversiones y el desarrollo tecnológico e institucional — cambios que se sustentan en la responsabilidad ecológica, el respeto a la diversidad étnica y cultural, y la plena participación ciudadana, sin comprometer la calidad de vida de las generaciones futuras.',
      ejemplo: 'Un proyecto agrícola que solo busca la máxima ganancia sin cuidar el suelo ni el agua no es sostenible; uno que combina producción económica con conservación del recurso hídrico y del suelo sí lo es, aunque produzca menos en el corto plazo.',
      aplicacion: 'Antes de evaluar si una actividad económica de tu comunidad es sostenible, podés preguntarte: ¿considera el manejo de los recursos naturales existentes? ¿garantiza equidad social? ¿protege la calidad de vida de las próximas generaciones? Si la respuesta a alguna de esas preguntas es "no", probablemente no sea sostenible.',
      compruebra: 'Según las definiciones del programa, ¿en qué se diferencia la "sostenibilidad" del "desarrollo sostenible"?' },

    { id: 't4', icon: '🌐', titulo: 'La red de problemáticas ambientales locales y globales',
      ideaClave: 'Las problemáticas ambientales forman una red interconectada de fenómenos locales y globales — desde el cambio climático hasta la biomagnificación — que el estudiantado debe investigar, debatir y analizar en sus causas, consecuencias y posibles soluciones.',
      explicacion: 'El programa enumera de forma explícita una red de problemáticas ambientales locales y globales: <strong>a) cambio climático, b) pérdida de biodiversidad, c) alteración de los ciclos de fósforo y nitrógeno, d) pérdida del agua de consumo, e) acidificación del océano, f) contaminación del suelo, agua y aire</strong> (por ejemplo con residuos tóxicos, metales, nitratos y plásticos), <strong>g) desgaste de la capa de ozono, h) pesca en exceso, i) deforestación, j) minería, k) eutrofización</strong> y <strong>m) biomagnificación</strong>. Cada subgrupo investiga una de estas problemáticas en el nivel atmosférico, de agua, de área urbana y de vida silvestre, y la comparte en el aula.',
      ejemplo: 'La eutrofización ocurre cuando el exceso de nutrientes (como fertilizantes agrícolas) llega a un cuerpo de agua y provoca un crecimiento descontrolado de algas; al morir y descomponerse, esas algas consumen el oxígeno disponible y provocan la muerte de peces y otros organismos acuáticos.',
      aplicacion: 'Con base en la información recolectada sobre una problemática, el programa propone que el estudiantado participe en una plenaria, foro o debate de análisis de causas y consecuencias, posibles soluciones y perspectivas, hasta llegar a consenso y redactar compromisos, recomendaciones o solicitudes dirigidas al personal docente, la dirección, la Junta Administrativa, los gobiernos locales, el poder legislativo y otras instituciones de la comunidad y el país.',
      compruebra: 'Elegí dos problemáticas de la lista que te parezcan más urgentes en tu comunidad y explicá por qué.' },

    { id: 't5', icon: '🤲', titulo: 'Proyectos de responsabilidad ambiental y el ciudadano crítico',
      ideaClave: 'Un ciudadano crítico no se limita a protestar: prevé, anticipa y abre rutas de solución, participando en proyectos concretos de responsabilidad ambiental orientados a mitigar, compensar o reducir el cambio climático.',
      explicacion: 'El programa plantea que, luego de analizar las problemáticas ambientales, el estudiantado propone opciones para la <strong>mitigación, la compensación y la reducción del cambio climático</strong> que permitan proyectar escenarios ambientales deseables e intervenir con éxito en situaciones que viven como vecinos, consumidores o usuarios. Los educadores orientan al estudiantado en la elaboración de <strong>proyectos de responsabilidad ambiental</strong> y los llevan a la práctica, con el cometido de "ser parte de la solución aplicando las buenas prácticas ambientales, desarrollo de la capacidad organizativa y del esfuerzo solidario". Estos proyectos pueden ser locales (el salón de clases, la casa o la localidad), pero deben abrir su perspectiva hasta su incidencia nacional o incluso mundial, y es indispensable que posean una <strong>visión esperanzadora</strong> y sean <strong>factibles de realización</strong>, para evitar el desaliento y el pesimismo.',
      ejemplo: 'Un grupo de estudiantes organiza una campaña de recolección y compostaje de residuos orgánicos en su colegio, calculando cuánto material dejaría de llegar al relleno sanitario — un proyecto local, factible y con impacto medible, que además puede inspirar a otras secciones a replicarlo.',
      aplicacion: 'Frente a una problemática como el desgaste de la capa de ozono o la deforestación, un ciudadano crítico no se conforma con quejarse: busca información, propone una acción concreta (por pequeña que sea) y la lleva a la práctica junto con otras personas, con la capacidad organizativa y el esfuerzo solidario que pide el programa.',
      compruebra: '¿Por qué el programa considera "indispensable" que un proyecto de responsabilidad ambiental tenga una visión esperanzadora y sea factible de realizar?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Qué problemática ambiental es?": 10 situaciones
     reales (basadas en la red de problemáticas del programa) para
     clasificar de cuál de las 10 categorías se trata. Mismo patrón
     exacto que Sim1 de bio10-u08.js, con 10 categorías.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'El aumento de gases como el dióxido de carbono en la atmósfera atrapa más calor y eleva la temperatura promedio del planeta.', correcta: 'climatico', explica: 'Es cambio climático: se refiere al aumento de la temperatura global por gases de efecto invernadero.' },
    { texto: 'La desaparición de una especie de anfibio implica también la pérdida de los genes y del papel ecológico que cumplía en su ecosistema.', correcta: 'biodiversidad', explica: 'Es pérdida de biodiversidad: se pierde a la vez el ecosistema, la especie y sus genes.' },
    { texto: 'El uso excesivo de fertilizantes agrícolas altera las cantidades naturales de fósforo y nitrógeno que circulan entre el suelo, el agua y los seres vivos.', correcta: 'ciclosNP', explica: 'Es alteración de los ciclos de fósforo y nitrógeno: el exceso de fertilizantes desequilibra esos ciclos biogeoquímicos.' },
    { texto: 'La sobreexplotación de los mantos acuíferos reduce la cantidad de agua potable disponible para el consumo humano.', correcta: 'aguaConsumo', explica: 'Es pérdida del agua de consumo: se reduce el agua disponible para uso humano.' },
    { texto: 'El océano absorbe parte del exceso de dióxido de carbono de la atmósfera, lo que vuelve sus aguas más ácidas y afecta a organismos con conchas o esqueletos de carbonato de calcio.', correcta: 'acidificacion', explica: 'Es acidificación del océano: el exceso de CO2 disuelto reduce el pH del agua marina.' },
    { texto: 'Los residuos tóxicos, los metales pesados, los nitratos y los plásticos que llegan al suelo, al agua y al aire deterioran la calidad de esos ambientes.', correcta: 'contaminacion', explica: 'Es contaminación del suelo, agua y aire: el programa menciona exactamente esos ejemplos de contaminantes.' },
    { texto: 'Ciertos gases liberados por actividades humanas destruyen moléculas de ozono en la atmósfera superior, debilitando la capa que filtra la radiación ultravioleta.', correcta: 'ozono', explica: 'Es desgaste de la capa de ozono: se refiere directamente al deterioro de esa capa atmosférica.' },
    { texto: 'Algunas flotas pesqueras capturan peces a un ritmo mayor del que las poblaciones marinas logran reproducirse y reponerse.', correcta: 'pesca', explica: 'Es pesca en exceso: la extracción supera la capacidad de recuperación de las poblaciones marinas.' },
    { texto: 'La tala de grandes extensiones de bosque para ampliar la frontera agrícola elimina el hábitat de numerosas especies.', correcta: 'deforestacion', explica: 'Es deforestación: se refiere a la eliminación de la cobertura boscosa.' },
    { texto: 'La extracción de minerales mediante excavaciones remueve grandes volúmenes de suelo y roca, alterando el paisaje y los cuerpos de agua cercanos.', correcta: 'mineria', explica: 'Es minería: se refiere a la extracción de minerales y su impacto en el entorno.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 10 situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    const opciones = [
      { id: 'climatico', label: 'Cambio climático' },
      { id: 'biodiversidad', label: 'Pérdida de biodiversidad' },
      { id: 'ciclosNP', label: 'Alteración de ciclos de fósforo/nitrógeno' },
      { id: 'aguaConsumo', label: 'Pérdida del agua de consumo' },
      { id: 'acidificacion', label: 'Acidificación del océano' },
      { id: 'contaminacion', label: 'Contaminación del suelo, agua o aire' },
      { id: 'ozono', label: 'Desgaste de la capa de ozono' },
      { id: 'pesca', label: 'Pesca en exceso' },
      { id: 'deforestacion', label: 'Deforestación' },
      { id: 'mineria', label: 'Minería' }
    ];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:grid;gap:.5rem">
          ${opciones.map(o => `<button class="btn btn-ghost" data-sim1-opcion="${o.id}">${o.label}</button>`).join('')}
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de los servicios de la biodiversidad":
     2 fases, mismo patrón exacto que Sim2 de bio10-u08.js — (A)
     explorar libremente 6 categorías reales de servicios de la
     biodiversidad, y (B) un quiz de 2ª fase donde MQC da el caso y el
     estudiante elige el servicio.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'recreacionTurismo', nombre: '🏖️ Recreación y turismo', areas: 'Espacios naturales usados para el disfrute, el descanso y el turismo' },
    { id: 'investigacionMedicinas', nombre: '🔬 Investigación y medicinas', areas: 'Fuente de conocimiento científico y de sustancias usadas para elaborar medicinas' },
    { id: 'alimentosMadera', nombre: '🌾 Alimentos y madera', areas: 'Producción de alimentos y de madera para uso humano' },
    { id: 'energiaControl', nombre: '⚡ Energía y control biológico', areas: 'Fuente de energía y control natural de plagas por depredadores o parásitos naturales' },
    { id: 'climaAgua', nombre: '🌧️ Regulación del clima y del agua', areas: 'Fijación fotosintética, mantenimiento del ciclo del agua y regulación del clima' },
    { id: 'sueloContaminantes', nombre: '🌱 Protección del suelo y contaminantes', areas: 'Producción y protección del suelo, almacenamiento de nutrientes y absorción de contaminantes' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Una familia visita un parque nacional los fines de semana para descansar y disfrutar del paisaje, mientras la zona también recibe turistas durante todo el año.', opciones: ['Espacios naturales usados para el disfrute, el descanso y el turismo', 'Fuente de conocimiento científico y de sustancias usadas para elaborar medicinas', 'Producción de alimentos y de madera para uso humano', 'Fijación fotosintética, mantenimiento del ciclo del agua y regulación del clima'], correcta: 0 },
    { fenomeno: 'Un grupo de científicos estudia las plantas de un bosque tropical porque muchas de ellas se usan para elaborar medicamentos contra distintas enfermedades.', opciones: ['Fuente de conocimiento científico y de sustancias usadas para elaborar medicinas', 'Espacios naturales usados para el disfrute, el descanso y el turismo', 'Producción y protección del suelo, almacenamiento de nutrientes y absorción de contaminantes', 'Fuente de energía y control natural de plagas por depredadores o parásitos naturales'], correcta: 0 },
    { fenomeno: 'Una comunidad obtiene frutas, granos y madera para construir viviendas a partir de los bosques y cultivos de su región.', opciones: ['Producción de alimentos y de madera para uso humano', 'Fijación fotosintética, mantenimiento del ciclo del agua y regulación del clima', 'Fuente de conocimiento científico y de sustancias usadas para elaborar medicinas', 'Espacios naturales usados para el disfrute, el descanso y el turismo'], correcta: 0 },
    { fenomeno: 'En una plantación de café, avispas y aves depredadoras controlan de forma natural las plagas que atacan el cultivo, sin necesidad de aplicar tantos químicos.', opciones: ['Fuente de energía y control natural de plagas por depredadores o parásitos naturales', 'Producción de alimentos y de madera para uso humano', 'Producción y protección del suelo, almacenamiento de nutrientes y absorción de contaminantes', 'Espacios naturales usados para el disfrute, el descanso y el turismo'], correcta: 0 },
    { fenomeno: 'Un bosque fija grandes cantidades de carbono mediante la fotosíntesis, ayuda a mantener el ciclo del agua de la cuenca y modera la temperatura de la zona.', opciones: ['Fijación fotosintética, mantenimiento del ciclo del agua y regulación del clima', 'Fuente de conocimiento científico y de sustancias usadas para elaborar medicinas', 'Producción de alimentos y de madera para uso humano', 'Fuente de energía y control natural de plagas por depredadores o parásitos naturales'], correcta: 0 },
    { fenomeno: 'Las raíces de los árboles de una ladera evitan la erosión del suelo, mientras los microorganismos del suelo descomponen y neutralizan sustancias contaminantes.', opciones: ['Producción y protección del suelo, almacenamiento de nutrientes y absorción de contaminantes', 'Espacios naturales usados para el disfrute, el descanso y el turismo', 'Fijación fotosintética, mantenimiento del ciclo del agua y regulación del clima', 'Producción de alimentos y de madera para uso humano'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada categoría real de servicios de la biodiversidad para ver en qué consiste.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el servicio →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué servicio de la biodiversidad es este?</p>
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
     SIMULADOR 3 — "Planificar una visita a un área protegida":
     escenario guiado en 2 pasos, con el caso real de la situación de
     aprendizaje del programa. Mismo patrón exacto que Sim3 de
     bio10-u01.js/u02.js/u03.js/u08.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: tu clase debe elegir un <strong>área protegida de la localidad o cercana</strong> para colaborar en su mantenimiento, tal como lo plantea el programa oficial: seleccionarla en plenaria, investigarla y planear cómo visitarla.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> según el programa, ¿qué debe hacer el grupo antes de ir a visitar el área protegida elegida?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="planificar">Investigarla y planear la visita, con planificación previa</button>
            <button class="btn btn-ghost" data-sim3-opcion="improvisar">Ir directamente, sin ninguna investigación ni planificación</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> según el programa, ¿qué tipo de proyecto debe desarrollar el grupo durante esa visita de campo?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="plural">Un proyecto plural, democrático y solidario, orientado en una perspectiva sostenible</button>
            <button class="btn btn-ghost" data-sim3-opcion2="individual">Un proyecto individual, sin ninguna coordinación con el resto del grupo</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">El programa pide que la visita a un área protegida se planifique con anticipación, y que durante ella se desarrolle un proyecto plural, democrático y solidario, orientado en una perspectiva sostenible que respete y potencie la diversidad biológica y cultural — no una simple salida improvisada e individual.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/u02.js/u03.js/u08.js,
     apuntando a las funciones paralelas de Biología 11.º) ─────────── */
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
     bio10-u01.js/u02.js/u03.js/u08.js (se reutilizan literalmente las
     mismas clases "bio10-*" como simples ganchos internos de esta
     unidad, igual que hacen fix11-u01.js y demás unidades de
     Undécimo con sus equivalentes de Décimo — no hay CSS externo
     ligado a ese nombre, y nunca se mezclan datos entre unidades).
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
     bio10-u01.js/u02.js/u03.js/u08.js.
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
      { id: 'sim1', titulo: '🌐 ¿Qué problemática ambiental es?', desc: '10 situaciones reales (cambio climático, contaminación, pesca en exceso, minería y más) para identificar la problemática ambiental que representan.' },
      { id: 'sim2', titulo: '🌿 Explorador de los servicios de la biodiversidad', desc: 'Explorá 6 categorías reales de servicios que brinda la biodiversidad y después probá identificando vos mismo el servicio, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🏞️ Planificar una visita a un área protegida', desc: 'Un escenario guiado paso a paso con la situación de aprendizaje real del programa sobre áreas protegidas.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El servicio correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'planificar';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el programa pide investigar el área y planear la visita con anticipación.'
            : '💡 En realidad, el programa pide investigarla y planear la visita con planificación previa, no improvisar.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'plural';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el proyecto debe ser plural, democrático y solidario, con una perspectiva sostenible.'
            : '💡 En realidad debe ser un proyecto plural, democrático y solidario — no un esfuerzo individual sin coordinación.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Guardián del Planeta": 5 escenarios reales de la red de
     problemáticas ambientales del programa, con pistas que orientan
     sin revelar la respuesta. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js/u08.js: SIN XP al solo iniciar un
     nivel, y game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Los fertilizantes que llegan a un lago provocan un crecimiento excesivo de algas; al morir y descomponerse, esas algas consumen el oxígeno del agua y provocan la muerte de peces.',
      pista: 'Pensá en el exceso de nutrientes en el agua, no en la pesca ni en la minería.',
      correcta: 'Eutrofización', opciones: ['Eutrofización', 'Pesca en exceso', 'Minería', 'Desgaste de la capa de ozono'] },
    { id: 'nivel2', escenario: 'Un pesticida se acumula en concentraciones cada vez mayores a medida que sube de nivel en la cadena alimenticia, hasta alcanzar niveles peligrosos en los depredadores tope.',
      pista: 'Pensá en cómo una sustancia se va concentrando de un nivel trófico a otro, no en la contaminación directa del suelo.',
      correcta: 'Biomagnificación', opciones: ['Biomagnificación', 'Eutrofización', 'Acidificación del océano', 'Deforestación'] },
    { id: 'nivel3', escenario: 'Una flota pesquera captura atún a un ritmo tan alto que la población no logra reponerse entre una temporada y la siguiente.',
      pista: 'Pensá en la extracción de un recurso marino, no en la contaminación del agua.',
      correcta: 'Pesca en exceso', opciones: ['Pesca en exceso', 'Eutrofización', 'Biomagnificación', 'Minería'] },
    { id: 'nivel4', escenario: 'Una excavación a cielo abierto para extraer oro remueve grandes cantidades de suelo y contamina un río cercano con sedimentos y químicos.',
      pista: 'Pensá en la extracción de minerales del subsuelo, no en la tala de árboles.',
      correcta: 'Minería', opciones: ['Minería', 'Deforestación', 'Pesca en exceso', 'Acidificación del océano'] },
    { id: 'nivel5', escenario: 'Ciertos gases liberados por actividades humanas destruyen moléculas de ozono en la atmósfera superior, debilitando la capa que filtra la radiación ultravioleta.',
      pista: 'Pensá en un fenómeno de la atmósfera superior, no en el agua ni en el suelo.',
      correcta: 'Desgaste de la capa de ozono', opciones: ['Desgaste de la capa de ozono', 'Cambio climático', 'Acidificación del océano', 'Eutrofización'] }
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
        <h3 style="margin:0 0 .3rem">🌎 Guardián del Planeta</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál problemática ambiental es esta?</p>
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
     EXAMEN — banco real (js/data/banco-bio11-u05.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js/u08.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO11_U05 !== 'undefined') ? PREGUNTAS_BIO11_U05 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO11-U05</h3>
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
     MISIÓN FINAL — "Bajo la lupa: diseñar un proyecto real de
     responsabilidad ambiental ciudadana" (mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js/u08.js: awardXP('biologia11-mission-
     done') UNA sola vez, vía missionDone). Caso real citado en el
     programa, con la frase textual del "ciudadano crítico" y de la
     "visión esperanzadora".
     ================================================================ */
  const MISION_A_OPCIONES = [
    'Seleccionarla en plenaria, investigarla y planear cómo visitarla',
    'Participar en programas de rescate y conservación medioambiental de los hábitats de la localidad',
    'Ir sin ningún tipo de planificación previa, de forma espontánea',
    'Evitar cualquier contacto directo con el área protegida'
  ];
  const MISION_A_CORRECTAS = [
    'Seleccionarla en plenaria, investigarla y planear cómo visitarla',
    'Participar en programas de rescate y conservación medioambiental de los hábitats de la localidad'
  ];
  const MISION_B_OPCIONES = [
    'Poseer una visión esperanzadora y ser factibles de realización, para evitar el desaliento y el pesimismo',
    'Ser imposibles de realizar pero simbólicamente importantes',
    'Limitarse únicamente al ámbito mundial, nunca al local',
    'Evitar cualquier participación de instituciones o gobiernos locales'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'No se limita a protestar: también prevé, anticipa y abre rutas de solución',
    'Se limita exclusivamente a protestar públicamente',
    'Espera a que otras personas resuelvan el problema',
    'Ignora la problemática si no lo afecta directamente'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: diseñar un proyecto real de responsabilidad ambiental ciudadana".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🤲 Misión: Bajo la lupa — diseñar un proyecto real de responsabilidad ambiental ciudadana</h3>
        <p style="color:var(--text-secondary)">Texto base (Programa de Estudio del MEP): "En plenaria seleccionan un área protegida de la localidad o cercana, la investigan y planean como visitarla para colaborar en su mantenimiento. También seleccionan un espacio natural de fin recreativo y participan en los programas de rescate y conservación medioambiental, de los diversos hábitats de la localidad. [...] Luego de que el estudiantado propone opciones para la mitigación, la compensación y la reducción del cambio climático [...], los educadores orientan al estudiantado en la elaboración de proyectos de responsabilidad ambiental y los llevan a la práctica, en el cometido de 'ser parte de la solución aplicando las buenas prácticas ambientales, desarrollo de la capacidad organizativa y del esfuerzo solidario'. Las situaciones y contextos [...] pueden ser locales (el salón de clases, la casa o la localidad), pero abrir su perspectiva hasta su incidencia nacional o incluso mundial. Es indispensable que los proyectos posean una visión esperanzadora y sean factibles de realización, con el fin de evitar el desaliento y el pesimismo. Considerando la perspectiva de que un ciudadano crítico no se limita a protestar, sino que también prevé, anticipa y abre rutas de solución."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. Según el texto, ¿qué debe hacer el estudiantado antes de visitar un área protegida para colaborar en su mantenimiento? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, ¿qué característica es indispensable en los proyectos de responsabilidad ambiental ciudadana?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. Según el texto, ¿cómo debe actuar un ciudadano crítico frente a una problemática ambiental?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. Proponé, en tus propias palabras, un proyecto breve de responsabilidad ambiental ciudadana para tu localidad, orientado a la mitigación, la compensación o la reducción del cambio climático. Explicá en qué consistiría y por qué sería factible de realizar.</p>
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
     bio10-u01.js/u02.js/u03.js/u08.js — ver biologia11.js) ─────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
