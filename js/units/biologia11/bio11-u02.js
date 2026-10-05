/* ================================================================
   MÁSQUECIENCIA — js/units/biologia11/bio11-u02.js
   BIO11-U02 — Relaciones tróficas y flujo de energía
   ================================================================
   FUENTE (ver también banco-bio11-u02.js):

   Esta unidad, como toda Biología 11.º, usa el Programa de Estudio
   oficial de Biología del Ministerio de Educación Pública de Costa
   Rica ("Educar para una Nueva Ciudadanía") como fuente primaria,
   porque Biología 11.º no tiene libro de texto propio (a diferencia
   de Biología 10.º, que sí cuenta con un libro de texto privado).

   Se leyó de forma íntegra y directa el sub-tema ix "¿Por qué los
   seres vivos son parte de la trama de la vida?", correspondiente al
   Eje temático I ("Los seres vivos en entornos saludables, como
   resultado de la interacción de aspectos biológicos, socioculturales
   y ambientales"), sección "Undécimo año de Educación Académica;
   Duodécimo año de Educación Técnica" — páginas IMPRESAS 65 a 67 del
   documento oficial del MEP. El pie de página de cada una de esas 3
   páginas fue verificado visualmente antes de redactar esta unidad
   (dice, en efecto, "65", "66" y "67").

   Contenido real de esas 3 páginas usado como base de los 5 temas de
   esta unidad: los criterios de evaluación oficiales (transferencia
   de materia y energía en las relaciones tróficas, vínculos
   estructurales y funcionales de esas relaciones, implicaciones de
   las acciones humanas en su estabilidad); niveles tróficos
   (productor, consumidor primario/secundario/terciario/cuaternario,
   insectívoro); desintegradores/descomponedores/detritívoros;
   comunidad biológica; cadenas y tramas o redes alimenticias;
   ejemplos reales y explícitos de casos "retadores" de clasificar
   mencionados en el propio programa — muérdago, la planta
   atrapamoscas y el matapalo (citados ahí como parásitas) y las
   orquídeas y bromelias (citadas ahí como epífitas); pirámides de
   energía, densidad y biomasa; ley de Lavoisier, leyes de la
   termodinámica y ley del diezmo ecológico; el flujo unidireccional
   continuo de la energía frente al ciclo circular y constante de los
   nutrientes; productividad primaria y los factores que la afectan
   (nutrientes, agua, luz, temperatura); niveles de contaminación,
   paso de tóxicos, amplificación biológica o biomagnificación; y la
   sugerencia real del programa de observar ecosistemas terrestres o
   acuáticos del entorno inmediato (pecera, lago, río, arrecife,
   manglar u otro humedal).

   Nota pedagógica sobre el caso de la planta atrapamoscas: el
   programa la agrupa junto al muérdago y al matapalo bajo la etiqueta
   "parásitas" como conjunto de casos retadores para que el
   estudiantado clasifique niveles tróficos. Esta unidad conserva esa
   agrupación como ejemplo textual del programa, pero además explica
   con precisión biológica que la planta atrapamoscas es, en realidad,
   productora (fotosintetiza) y a la vez consumidora (atrapa y digiere
   insectos) — no una parásita de otra planta como sí lo son el
   muérdago y el matapalo — exactamente el mismo tipo de aclaración
   pedagógica ya usado en bio10-u03.js al redactar alrededor de
   ejemplos reales y concretos del programa o del libro fuente.

   Mismo patrón de plugin EXACTO que bio10-u01.js..u09.js — pero
   apuntando a Storage.updateBiologia11Unit / markBiologia11TopicRead /
   data.biologia11 (nunca a las funciones de Biología 10.º, Química ni
   Física). Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento). Eventos de XP con contexto
   {disciplina:'biologia', grado:11}.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio11-u02';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🔗', titulo: 'Niveles tróficos y la comunidad biológica',
      ideaClave: 'En una comunidad biológica, cada organismo ocupa un nivel trófico según cómo obtiene su energía: productores, consumidores (primarios, secundarios, terciarios y hasta cuaternarios) y desintegradores/descomponedores/detritívoros que reciclan la materia.',
      explicacion: 'Una <strong>comunidad biológica</strong> es el conjunto de poblaciones de distintas especies que interactúan en un mismo espacio y tiempo. Dentro de ella, cada organismo ocupa un <strong>nivel trófico</strong> (o nivel de alimentación) según la manera en que obtiene su energía. Los <strong>productores</strong> son organismos autótrofos (como las plantas) que captan la energía directamente del sol y la transforman en materia orgánica mediante la fotosíntesis. Los <strong>consumidores</strong> son organismos heterótrofos que obtienen su energía alimentándose de otros seres vivos: los <strong>consumidores primarios</strong> se alimentan directamente de los productores (son herbívoros), los <strong>consumidores secundarios</strong> se alimentan de los consumidores primarios, los <strong>consumidores terciarios</strong> se alimentan de los consumidores secundarios, y puede llegar a haber <strong>consumidores cuaternarios</strong> cuando existe un nivel más. Un <strong>insectívoro</strong> es un tipo particular de consumidor que se alimenta de insectos. Los <strong>desintegradores, descomponedores o detritívoros</strong> (como muchos hongos y bacterias) se alimentan de la materia orgánica muerta o de los restos y desechos de otros organismos, cumpliendo el papel clave de reciclar esa materia y devolverla al ecosistema.',
      ejemplo: 'El programa de estudio propone que, en subgrupos, el estudiantado aporte y analice diversas representaciones gráficas y textuales de las relaciones tróficas establecidas entre las poblaciones de una comunidad biológica, y que clasifique cada organismo de acuerdo con su nivel trófico, explorando preguntas como: ¿qué es un productor?, ¿qué es un desintegrador, descomponedor o detritívoro?, ¿qué es un consumidor primario, secundario, terciario o cuaternario?, ¿qué es un insectívoro?, ¿qué es la comunidad biológica?',
      aplicacion: 'El programa sugiere observar el entorno inmediato (terrestre o acuático) alrededor del centro educativo —por ejemplo, una pecera, un lago, un río, un arrecife, un manglar u otro humedal— para identificar ahí los distintos niveles de organización ecológica y su relación entre sí y con el medio, recopilando evidencia fotográfica de lo observado y compartiéndola con el resto del grupo.',
      compruebra: 'En un ecosistema que conozcas (real o de una pecera), identificá un ejemplo de productor, un consumidor primario y un desintegrador. ¿Cómo obtiene cada uno su energía?' },

    { id: 't2', icon: '🕸️', titulo: 'Cadenas y tramas alimenticias',
      ideaClave: 'Una cadena alimenticia es una secuencia de organismos donde cada uno se alimenta del anterior; en la naturaleza real esas cadenas se entrecruzan formando tramas o redes alimenticias, y existen organismos con relaciones tróficas especiales y retadoras de clasificar, como los parásitos y los epífitos.',
      explicacion: 'En una comunidad biológica real, las relaciones de alimentación casi nunca son una simple cadena lineal: un mismo depredador puede ser, a la vez, presa de otro depredador distinto, y una misma presa puede ser consumida por varios depredadores — así se forma una <strong>trama o red alimenticia</strong>, mucho más representativa de lo que ocurre en la naturaleza que una cadena aislada. El programa de estudio plantea justamente este reto: ¿qué representan las presas para el depredador?, ¿por qué el número de presas y de depredadores son interdependientes?, ¿cómo se representa que un depredador es, a la vez, presa de otras especies, mientras que su propia presa es depredadora de otras especies distintas? Dentro de esa trama existen, además, casos especiales que representan un reto real para clasificar el nivel trófico de un organismo, y que el programa recomienda incorporar explícitamente: el <strong>muérdago</strong> y el <strong>matapalo</strong> son plantas <em>parásitas</em> que, aunque tienen hojas verdes, obtienen agua y nutrientes de otra planta a la que parasitan, debilitándola; la <strong>planta atrapamoscas</strong>, mencionada junto a ellas, es en realidad productora (realiza fotosíntesis) y, al mismo tiempo, consumidora, pues complementa su nutrición atrapando y digiriendo insectos; y las <strong>orquídeas</strong> y las <strong>bromelias</strong> son <em>epífitas</em>: usan a otras plantas únicamente como soporte físico para crecer más cerca de la luz, sin quitarles nutrientes como sí lo hace una planta parásita.',
      ejemplo: 'El programa de estudio menciona textualmente: "Es importante que el profesorado incorpore retos como muérdago, la planta atrapamoscas y la matapalo (parásitas); orquídeas y bromelias (epífita)" — como ejemplos reales para que el estudiantado clasifique cada organismo según su nivel trófico dentro de una trama alimenticia.',
      aplicacion: 'Clasificar estos casos ayuda a entender que no todos los organismos con hojas verdes son "solo productores" en un sentido simple, y que reconocer relaciones especiales como el parasitismo o el epifitismo es clave para representar correctamente una trama alimenticia real, en vez de una cadena demasiado simplificada.',
      compruebra: '¿Por qué el matapalo y el muérdago no deberían clasificarse simplemente como "productores", a pesar de tener hojas verdes? ¿Y por qué una orquídea que crece sobre un árbol no es, por eso, una parásita de ese árbol?' },

    { id: 't3', icon: '📊', titulo: 'Pirámides ecológicas y las leyes que rigen la energía y la materia',
      ideaClave: 'Las pirámides ecológicas (de energía, densidad y biomasa) representan gráficamente los niveles tróficos de una comunidad; la energía fluye de forma unidireccional (no se crea ni se destruye, solo se transforma) mientras que la materia se recicla en un ciclo circular constante.',
      explicacion: 'Existen distintas formas de representar los niveles tróficos, las cadenas, redes o tramas alimenticias de una comunidad biológica: entre ellas, las <strong>pirámides de energía</strong>, de <strong>densidad</strong> (número de organismos) y de <strong>biomasa</strong>. Al investigar estas representaciones, se comprueba que la <strong>materia se conserva</strong> al fluir por las pirámides —la <strong>ley de Lavoisier</strong>: la materia no se crea ni se destruye, solo se transforma— y que la <strong>energía</strong> que fluye por ellas tampoco se crea ni se destruye, solo se transforma —las <strong>leyes de la termodinámica</strong>—. Además, en cada paso de un nivel trófico al siguiente se pierde gran parte de la energía disponible, lo que se conoce como la <strong>ley del diezmo ecológico</strong>, y explica por qué las pirámides se van angostando hacia los niveles tróficos superiores. Una diferencia clave es que la <strong>energía se mueve a lo largo de los ecosistemas en un flujo unidireccional continuo</strong> (no regresa), mientras que los <strong>nutrientes (la materia) pasan por ciclos constantes y se reciclan en un flujo circular</strong> entre los distintos niveles de organización ecológica y el medio.',
      ejemplo: 'El programa de estudio plantea que el estudiantado identifique, utilizando representaciones gráficas, "cómo la energía se mueve a lo largo de los ecosistemas en un flujo unidireccional continuo y los nutrimentos pasan por ciclos constantes y se reciclan en un flujo circular en los diferentes niveles de organización ecológica y con el medio", e investigue y argumente "que la materia se conserva al fluir en las pirámides y que la energía que fluye por las pirámides no se crea ni se destruye, solo se transforma (ley de Lavoisier, leyes de la termodinámica, ley del diezmo ecológico)".',
      aplicacion: 'Por eso, mientras el carbono o el nitrógeno de un ecosistema pueden reciclarse una y otra vez entre productores, consumidores y desintegradores, la energía que entró al sistema como luz solar debe reponerse constantemente: un ecosistema nunca podría sostenerse solo con la energía que ya circuló una vez por él.',
      compruebra: '¿Por qué se dice que el flujo de energía es "unidireccional" mientras que el flujo de la materia (los nutrientes) es "circular"? Dá un ejemplo de cada uno.' },

    { id: 't4', icon: '☀️', titulo: 'Productividad primaria',
      ideaClave: 'La productividad primaria es la energía que los productores logran captar y fijar en una comunidad biológica; depende de factores como la cantidad de nutrientes disponibles y de variables abióticas como el agua, la luz y la temperatura.',
      explicacion: 'La vida que sostiene un ecosistema depende, en primer lugar, de la energía captada por los productores: a esto se le llama <strong>productividad primaria</strong>. Distintos factores influyen en cuánta energía logran fijar los productores de una comunidad: la <strong>cantidad de nutrientes</strong> disponibles en el ambiente influye directamente en la productividad primaria, y variables abióticas como la <strong>disponibilidad de agua</strong>, la <strong>cantidad de luz</strong> y la <strong>temperatura</strong> también determinan qué tanta energía pueden captar los productores. Cuando alguno de estos factores escasea (por ejemplo, poca luz, agua insuficiente o temperaturas extremas), la productividad primaria de ese ecosistema disminuye, y con ella, la cantidad de energía disponible para todos los niveles tróficos que dependen de los productores.',
      ejemplo: 'El programa de estudio plantea preguntas como: "¿Cómo la vida qué mantiene un ecosistema está establecida por la energía captada por los productores (productividad primaria)? ¿Cómo la cantidad de nutrientes influye en la productividad primaria? ¿Cómo la disponibilidad de agua, luz y la temperatura (variables abióticas) influye en la productividad?"',
      aplicacion: 'Comparar, por ejemplo, la productividad primaria de un manglar rico en nutrientes y con abundante luz y agua, frente a la de un ecosistema con muy poca agua disponible, ayuda a entender por qué unos ecosistemas pueden sostener comunidades biológicas mucho más grandes y diversas que otros.',
      compruebra: 'Si dos ecosistemas reciben la misma cantidad de luz solar, pero uno tiene mucho menos agua disponible que el otro, ¿cuál esperarías que tenga mayor productividad primaria? Explicá por qué.' },

    { id: 't5', icon: '☠️', titulo: 'Bioacumulación, biomagnificación e impacto humano',
      ideaClave: 'Los niveles de contaminación afectan las cadenas alimenticias mediante la bioacumulación y la biomagnificación (o amplificación biológica) de sustancias tóxicas, y las acciones humanas sobre el aprovechamiento de los recursos alimentarios pueden alterar la estabilidad de las relaciones tróficas.',
      explicacion: 'Cuando sustancias tóxicas o nocivas entran a un ecosistema (por ejemplo, por contaminación), pueden acumularse en los tejidos de los organismos de los primeros niveles tróficos: a este fenómeno se le llama <strong>bioacumulación</strong>. A medida que esos organismos son consumidos por otros en niveles tróficos superiores, la concentración de la sustancia tóxica no disminuye, sino que se va concentrando cada vez más en cada paso de la cadena alimenticia: este aumento progresivo de la concentración de un tóxico conforme sube de nivel trófico se llama <strong>biomagnificación</strong> o <strong>amplificación biológica</strong>. Por eso, los depredadores que ocupan los niveles tróficos más altos de una cadena suelen acumular las concentraciones más peligrosas de esas sustancias, aunque nunca hayan estado en contacto directo con la fuente original de contaminación. Además de la contaminación, otras acciones humanas relacionadas con el aprovechamiento de los recursos alimentarios del planeta pueden afectar la estabilidad de las relaciones tróficas de un ecosistema; por eso es importante interpretar y clasificar esas acciones humanas según su orden de impacto ecológico, e identificar formas de prevenir sus consecuencias negativas sobre el ambiente, la salud humana y los ecosistemas en general.',
      ejemplo: 'El programa de estudio plantea explícitamente: "¿Cómo los niveles de contaminación afectan las cadenas alimenticias (por ejemplo, el paso de tóxicos, amplificación biológica o biomagnificación)?" y propone que el estudiantado recopile noticias, imágenes, esquemas y datos reales sobre el aprovechamiento de los recursos alimentarios del planeta y otras acciones humanas que afectan la estabilidad de las relaciones tróficas, clasificándolas según su orden de impacto ecológico.',
      aplicacion: 'Proponer acciones concretas para mitigar y rehabilitar el entorno inmediato frente a estas alteraciones —tal como plantea el programa, argumentando con información real sobre las alteraciones energéticas que amenazan la vida y la estabilidad de la biosfera— es una forma de asumir una postura crítica y responsable frente al impacto humano en las relaciones tróficas.',
      compruebra: '¿Por qué los depredadores del nivel trófico más alto de una cadena alimenticia suelen tener las concentraciones más altas de una sustancia tóxica, aunque nunca hayan tenido contacto directo con la fuente de esa contaminación?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Energía o materia?": 10 afirmaciones reales sobre
     el flujo de energía y el ciclo de la materia en las pirámides
     ecológicas, para clasificar cuál de los dos describe cada una.
     Mismo patrón exacto que Sim1 de bio10-u01.js..u09.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Se mueve a lo largo de los ecosistemas en un flujo unidireccional continuo, sin regresar.', correcta: 'energia', explica: 'Es energía: fluye en un solo sentido a lo largo de los ecosistemas.' },
    { texto: 'Pasa por ciclos constantes y se recicla entre los distintos niveles de organización ecológica y el medio.', correcta: 'materia', explica: 'Es materia (nutrientes): se recicla en un flujo circular, a diferencia de la energía.' },
    { texto: 'Según las leyes de la termodinámica, no se crea ni se destruye, solo se transforma.', correcta: 'energia', explica: 'Es energía: las leyes de la termodinámica indican que no se crea ni se destruye, solo se transforma.' },
    { texto: 'Según la ley de Lavoisier, se conserva al fluir por las pirámides ecológicas.', correcta: 'materia', explica: 'Es materia: la ley de Lavoisier establece que se conserva, no se crea ni se destruye.' },
    { texto: 'En cada nivel trófico se pierde gran parte de esta cantidad, según la ley del diezmo ecológico.', correcta: 'energia', explica: 'Es energía: la ley del diezmo ecológico explica por qué se pierde gran parte de ella en cada nivel trófico.' },
    { texto: 'El carbono y el nitrógeno son ejemplos reales de esto, que circula entre productores, consumidores y desintegradores.', correcta: 'materia', explica: 'Es materia: el carbono y el nitrógeno son nutrientes que se reciclan entre los distintos niveles tróficos.' },
    { texto: 'Debe reponerse constantemente a partir del sol, porque un ecosistema no puede reutilizar la que ya pasó por él.', correcta: 'energia', explica: 'Es energía: como fluye en un solo sentido, debe reponerse constantemente desde el sol.' },
    { texto: 'Los desintegradores cumplen un papel clave al devolverla al ecosistema tras descomponer la materia orgánica muerta.', correcta: 'materia', explica: 'Es materia: los desintegradores reciclan los nutrientes de la materia orgánica muerta, devolviéndolos al ecosistema.' },
    { texto: 'Es la razón por la que las pirámides ecológicas se angostan hacia los niveles tróficos superiores.', correcta: 'energia', explica: 'Es energía: al perderse gran parte de ella en cada nivel trófico, las pirámides se angostan hacia arriba.' },
    { texto: 'Un mismo átomo puede pasar, con el tiempo, por un productor, un consumidor y un desintegrador, y volver a estar disponible en el ambiente.', correcta: 'materia', explica: 'Es materia: los átomos que la componen se reciclan una y otra vez entre los organismos y el medio.' }
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
          <button class="btn btn-ghost" data-sim1-opcion="energia">Energía</button>
          <button class="btn btn-ghost" data-sim1-opcion="materia">Materia</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de casos retadores": 2 fases, mismo
     patrón exacto que Sim2 de bio10-u01.js..u09.js — (A) explorar
     libremente 6 casos reales del programa (muérdago, matapalo,
     atrapamoscas, orquídeas, bromelias, desintegradores), y (B) un
     quiz de 2ª fase donde MQC da el caso y el estudiante elige el tipo.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'muerdago', nombre: '🌿 Muérdago', areas: 'Planta parásita: parece productora (tiene hojas verdes), pero obtiene agua y nutrientes de otra planta a la que parasita' },
    { id: 'matapalo', nombre: '🌳 Matapalo', areas: 'Planta parásita: crece sobre otro árbol y le quita luz, agua y nutrientes hasta debilitarlo' },
    { id: 'atrapamoscas', nombre: '🪰 Planta atrapamoscas', areas: 'Productora y consumidora a la vez: fotosintetiza, pero también atrapa y digiere insectos' },
    { id: 'orquidea', nombre: '🌸 Orquídea', areas: 'Epífita: usa otra planta solo como soporte físico para crecer más cerca de la luz, sin quitarle nutrientes' },
    { id: 'bromelia', nombre: '🍃 Bromelia', areas: 'Epífita: al igual que la orquídea, crece sobre otra planta sin parasitarla, obteniendo agua y nutrientes del aire y la lluvia' },
    { id: 'desintegrador', nombre: '🍄 Desintegradores (hongos y bacterias)', areas: 'Se alimentan de materia orgánica muerta y reciclan sus nutrientes al ecosistema' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'El muérdago tiene hojas verdes, pero en realidad obtiene agua y nutrientes de la planta a la que parasita.', opciones: ['Planta parásita', 'Planta epífita', 'Consumidor primario', 'Desintegrador'], correcta: 0 },
    { fenomeno: 'El matapalo crece sobre otro árbol y le quita luz, agua y nutrientes hasta debilitarlo gravemente.', opciones: ['Planta parásita', 'Planta epífita', 'Consumidor secundario', 'Productor típico'], correcta: 0 },
    { fenomeno: 'La planta atrapamoscas fotosintetiza como cualquier productor, pero además atrapa y digiere insectos.', opciones: ['Productora y consumidora a la vez', 'Únicamente una planta parásita', 'Únicamente un desintegrador', 'Consumidor terciario'], correcta: 0 },
    { fenomeno: 'La orquídea crece sobre el tronco de un árbol, usándolo solo como soporte para alcanzar más luz, sin quitarle nutrientes.', opciones: ['Planta epífita', 'Planta parásita', 'Consumidor primario', 'Desintegrador'], correcta: 0 },
    { fenomeno: 'La bromelia crece sobre las ramas de otra planta, obteniendo agua y nutrientes del aire y la lluvia, sin dañar a la planta que la sostiene.', opciones: ['Planta epífita', 'Planta parásita', 'Consumidor secundario', 'Insectívoro'], correcta: 0 },
    { fenomeno: 'Los hongos y las bacterias se alimentan de materia orgánica muerta y devuelven sus nutrientes al ecosistema.', opciones: ['Desintegradores (descomponedores o detritívoros)', 'Consumidores primarios', 'Plantas epífitas', 'Plantas parásitas'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada caso real para ver qué tipo de relación trófica representa.</p>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de relación trófica es esta?</p>
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
     SIMULADOR 3 — "Bioacumulación y biomagnificación en una cadena
     real": escenario guiado en 2 pasos, con un caso realista de
     contaminación por un tóxico ascendiendo por una cadena
     alimenticia. Mismo patrón exacto que Sim3 de bio10-u01.js..u09.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: en un río cercano a una zona agrícola, un plaguicida llega al agua. Las algas absorben pequeñas cantidades de ese tóxico; los peces pequeños se alimentan de muchas algas; los peces grandes se alimentan de muchos peces pequeños; y un ave pescadora se alimenta de varios peces grandes.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> ¿en qué nivel trófico de esta cadena empieza a acumularse el tóxico por primera vez?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="algas">En las algas (los productores)</button>
            <button class="btn btn-ghost" data-sim3-opcion="ave">Directamente en el ave pescadora</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> conforme el tóxico pasa de las algas a los peces pequeños, a los peces grandes y finalmente al ave, ¿qué ocurre con su concentración?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="aumenta">Aumenta cada vez más (biomagnificación)</button>
            <button class="btn btn-ghost" data-sim3-opcion2="disminuye">Disminuye cada vez más hasta desaparecer</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">El tóxico comienza a acumularse desde el primer nivel trófico (bioacumulación), y su concentración va aumentando en cada paso de la cadena alimenticia (biomagnificación o amplificación biológica) — por eso el ave pescadora, en la cima de esta cadena, termina con la concentración más alta, aunque nunca tuvo contacto directo con el plaguicida original.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js..u09.js, pero
     apuntando a Biología 11.º) ────────────────────────────────────── */
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
     bio10-u01.js..u09.js.
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
     bio10-u01.js..u09.js.
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
      { id: 'sim1', titulo: '📊 ¿Energía o materia?', desc: '10 afirmaciones reales sobre el flujo de la energía y el ciclo de la materia en las pirámides ecológicas.' },
      { id: 'sim2', titulo: '🕸️ Explorador de casos retadores', desc: 'Explorá 6 casos reales del programa (muérdago, matapalo, atrapamoscas, orquídeas, bromelias, desintegradores) y después probá identificando vos mismo el tipo, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '☠️ Bioacumulación y biomagnificación', desc: 'Un escenario guiado paso a paso: un tóxico que sube por una cadena alimenticia real, desde las algas hasta un ave pescadora.' }
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'algas';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el tóxico empieza a acumularse desde el primer nivel trófico (las algas), un fenómeno llamado bioacumulación.'
            : '💡 En realidad empieza en las algas: el tóxico se acumula desde el primer nivel trófico (bioacumulación), no directamente en el ave.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'aumenta';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: la concentración del tóxico aumenta en cada paso de la cadena — esto se llama biomagnificación o amplificación biológica.'
            : '💡 En realidad aumenta: conforme el tóxico sube de nivel trófico, su concentración se va acumulando cada vez más (biomagnificación), no al revés.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Guardián de la trama de la vida": 5 escenarios reales
     para identificar el nivel trófico, el tipo de relación especial, o
     calcular el flujo de energía en una pirámide, con pistas que
     orientan sin revelar la respuesta. Mismo patrón exacto que
     bio10-u01.js..u09.js: SIN XP al solo iniciar un nivel, y
     game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'En un manglar, un cangrejo se alimenta de restos de hojas y materia orgánica muerta que cae al fondo.',
      pista: 'Pensá en qué se alimenta ese organismo: ¿de algo vivo, o de restos ya muertos?',
      correcta: 'Detritívoro (se alimenta de materia orgánica muerta)', opciones: ['Detritívoro (se alimenta de materia orgánica muerta)', 'Productor', 'Consumidor primario (herbívoro)', 'Consumidor secundario'] },
    { id: 'nivel2', escenario: 'El muérdago crece sobre las ramas de un árbol, del cual obtiene agua y nutrientes, aunque tiene hojas verdes.',
      pista: 'Pensá en quién obtiene los nutrientes de quién, no solo en el color de las hojas.',
      correcta: 'Planta parásita', opciones: ['Planta parásita', 'Planta epífita', 'Productor típico, sin ninguna relación especial', 'Desintegrador'] },
    { id: 'nivel3', escenario: 'Una orquídea crece sobre el tronco de un árbol, usándolo solo como soporte para alcanzar más luz, sin quitarle nutrientes.',
      pista: 'Pensá en si esta planta perjudica o no al árbol que la sostiene.',
      correcta: 'Planta epífita', opciones: ['Planta epífita', 'Planta parásita', 'Consumidor primario', 'Desintegrador'] },
    { id: 'nivel4', escenario: 'Los productores de un ecosistema captan 10 000 unidades de energía. Según la ley del diezmo ecológico, en cada nivel trófico se pierde aproximadamente el 90% de la energía disponible.',
      pista: 'Si se pierde el 90%, ¿qué porcentaje de esa energía SÍ llega al siguiente nivel trófico?',
      correcta: '1000 unidades (el 10% de 10 000)', opciones: ['1000 unidades (el 10% de 10 000)', '9000 unidades', '10 000 unidades (toda la energía)', '100 unidades'] },
    { id: 'nivel5', escenario: 'Siguiendo la misma ley del diezmo ecológico, los consumidores primarios de ese ecosistema reciben 1000 unidades de energía.',
      pista: 'Aplicá otra vez la misma regla: solo pasa al siguiente nivel el 10% de la energía disponible.',
      correcta: '100 unidades (el 10% de 1000)', opciones: ['100 unidades (el 10% de 1000)', '900 unidades', '1000 unidades (toda la energía)', '10 unidades'] }
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
        <h3 style="margin:0 0 .3rem">🕸️ Guardián de la Trama de la Vida</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la respuesta correcta?</p>
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
     EXAMEN — banco real (js/data/banco-bio11-u02.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js..u09.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO11_U02 !== 'undefined') ? PREGUNTAS_BIO11_U02 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO11-U02</h3>
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
     MISIÓN FINAL — "Bajo la lupa: bioacumulación y biomagnificación en
     una cadena alimenticia real" (mismo patrón exacto que
     bio10-u01.js..u09.js: awardXP('biologia11-mission-done') UNA sola
     vez, vía missionDone). Caso realista construido directamente sobre
     el fenómeno de bioacumulación/biomagnificación descrito en el
     programa oficial del MEP.
     ================================================================ */
  const MISION_A_OPCIONES = ['El plaguicida llega al agua desde una zona agrícola cercana', 'Las algas absorben pequeñas cantidades del tóxico', 'El ave pescadora es la que introduce el tóxico al ecosistema', 'La concentración del tóxico disminuye en cada paso de la cadena'];
  const MISION_A_CORRECTAS = ['El plaguicida llega al agua desde una zona agrícola cercana', 'Las algas absorben pequeñas cantidades del tóxico'];
  const MISION_B_OPCIONES = [
    'El ave pescadora, en la cima de la cadena alimenticia',
    'Las algas, en la base de la cadena alimenticia',
    'Los peces pequeños',
    'Ninguno: todos tendrían exactamente la misma concentración'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Biomagnificación (o amplificación biológica)',
    'Fotosíntesis',
    'Productividad primaria',
    'Ley del diezmo ecológico'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: bioacumulación y biomagnificación en una cadena alimenticia real".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>☠️ Misión: Bajo la lupa — bioacumulación y biomagnificación en una cadena alimenticia real</h3>
        <p style="color:var(--text-secondary)">Texto base: "En un río cercano a una zona agrícola, un plaguicida utilizado en los cultivos llega al agua. Las algas absorben pequeñas cantidades de esa sustancia tóxica. Muchos peces pequeños se alimentan de esas algas, acumulando el tóxico en sus tejidos. Un pez grande se alimenta de numerosos peces pequeños a lo largo de su vida, y un ave pescadora, en la cima de esta cadena alimenticia, se alimenta de varios peces grandes. Con cada paso de la cadena, la concentración del tóxico en los tejidos de los organismos aumenta, en vez de disminuir — un ejemplo real del fenómeno que el programa de Biología describe como bioacumulación y biomagnificación (o amplificación biológica) de sustancias nocivas en las relaciones tróficas de un ecosistema."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué ocurre al inicio de esta cadena alimenticia, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, ¿cuál organismo de esta cadena alimenticia tendría la MAYOR concentración del tóxico en su cuerpo?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Cómo se llama el fenómeno por el cual la concentración del tóxico aumenta en cada paso de la cadena, según el texto?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué el ave pescadora, que nunca estuvo en contacto directo con el plaguicida original, termina siendo el organismo más afectado por la contaminación?</p>
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
     bio10-u01.js..u09.js — ver biologia11.js) ─────────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
