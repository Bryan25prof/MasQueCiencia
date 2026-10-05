/* ================================================================
   MÁSQUECIENCIA — js/units/biologia11/bio11-u04.js
   BIO11-U04 — Sucesión y restauración de ecosistemas
   ================================================================
   FUENTE (ver también banco-bio11-u04.js):

   A diferencia de Biología 10.º, Biología 11.º NO tiene un libro de
   texto privado propio. Por esa razón, toda unidad de Biología 11.º
   —incluida esta— usa como fuente académica primaria el Programa de
   Estudio oficial de Biología del Ministerio de Educación Pública de
   Costa Rica ("Educar para una Nueva Ciudadanía", Educación
   Diversificada, Undécimo año).

   El sub-tema de esta unidad es "xi ¿Por qué cambian las comunidades
   en busca del equilibrio inestable?", ubicado en el Eje temático III
   del programa, páginas impresas 73 y 74 (índices 75 y 76 del PDF
   fuente). Se verificó de forma visual, leyendo el pie de cada
   página, que el contenido corresponde efectivamente a las páginas
   impresas 73 y 74 del programa oficial.

   Esta unidad es, de las 5 unidades de Biología 11.º, la que cubre el
   sub-tema oficial MÁS CORTO en extensión (solo 2 páginas impresas) y
   con menos lecciones asignadas en la planificación anual del MEP.
   Por eso mismo, esta unidad tiene menos temas de teoría que otras
   unidades de Biología —4 en vez de 6—: no porque falte contenido por
   leer o porque se haya omitido algo del programa, sino porque el
   contenido real de esas 2 páginas, ya leídas de forma íntegra y
   completa, sostiene con calidad 4 temas y no más. Ningún hecho ni
   ejemplo de este archivo fue inventado: todos los conceptos y casos
   citados (sucesión primaria/secundaria, sucesión terrestre/
   limnológica, sucesión en terrenos agrícolas/ganaderos, terremoto y
   tsunami afectando comunidades costeras, la laguna de una represa,
   resiliencia natural, especies introducidas como plagas, derrames de
   petróleo, emisiones de gases tóxicos, uso de plaguicidas y
   fertilizantes, e iniciativas de conservación ambiental ligadas al
   desarrollo sostenible) provienen directamente de esas 2 páginas del
   programa oficial del MEP. Las explicaciones pedagógicas que rodean
   esos conceptos y ejemplos fueron redactadas para este proyecto,
   siguiendo el mismo criterio ya usado en bio10-u03.js al reconstruir
   contenido a partir del programa del MEP.

   Mismo patrón de plugin EXACTO que bio10-u01.js..u09.js — pero
   apuntando a Storage.updateBiologia11Unit / markBiologia11TopicRead /
   data.biologia11, nunca a las funciones de Biología 10.º, Química ni
   de Física. Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento). El contexto de XP usa {disciplina:
   'biologia', grado: 11} en vez de grado: 10.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio11-u04';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🌳', titulo: 'Sucesión ecológica: primaria, secundaria, terrestre y limnológica',
      ideaClave: 'La sucesión ecológica es el cambio secuencial que experimenta una comunidad a través del tiempo, y puede clasificarse en primaria o secundaria, y en terrestre o limnológica (acuática), según su punto de partida y el ambiente donde ocurre.',
      explicacion: 'Las comunidades biológicas no son estáticas: tienen características propias —su estructura, su diversidad, las relaciones entre las especies que la forman— que emergen de la interacción de las poblaciones que las constituyen entre sí y con su ambiente. Cuando esas comunidades cambian de forma secuencial y ordenada con el paso del tiempo, se dice que atraviesan una <strong>sucesión ecológica</strong>. El programa de estudio distingue dos grandes ejes para clasificarla: por un lado, <strong>sucesión primaria y sucesión secundaria</strong>; por otro, <strong>sucesión terrestre y sucesión limnológica (o acuática)</strong>, según ocurra en tierra o en un cuerpo de agua.',
      ejemplo: 'Un caso real y explícito que menciona el programa es el de los <strong>terrenos que estuvieron dedicados a la agricultura o a la ganadería</strong>: cuando ese uso cesa y el terreno se abandona, comienza a recuperarse siguiendo un proceso de sucesión terrestre —parte de un suelo que ya tenía vida previa, por eso se trata de una sucesión secundaria—. En cada estadio de una sucesión existe además una <strong>especie o especies clave</strong>: aquellas que dominan o condicionan las circunstancias que permiten que la siguiente etapa pueda establecerse.',
      aplicacion: 'El programa también invita a comparar cómo varía la <strong>diversidad de especies en un bosque primario y en uno secundario</strong>: al tener menos tiempo de desarrollo, un bosque secundario suele mostrar menor diversidad que uno primario maduro, que acumuló diversidad biológica durante mucho más tiempo. Comparar esa diversidad es, precisamente, uno de los datos que la investigación científica recolecta para interpretar y explicar el avance de una sucesión —aunque el programa también reconoce que existen limitaciones reales al intentar fijar con precisión un "equilibrio ecológico" en un proceso que, por definición, está en cambio constante.',
      compruebra: 'Con tus palabras, ¿por qué un potrero ganadero abandonado es un ejemplo de sucesión secundaria y terrestre, y no de sucesión primaria ni limnológica?' },

    { id: 't2', icon: '🌊', titulo: 'Perturbaciones naturales que alteran la estructura de las comunidades',
      ideaClave: 'El terremoto y el tsunami son dos ejemplos explícitos de catástrofes naturales capaces de modificar profundamente la estructura de las comunidades biológicas de una zona, especialmente en zonas costeras; la laguna que se forma al construir una represa es otro caso de perturbación que da inicio a una sucesión.',
      explicacion: 'Además del abandono de terrenos agrícolas o ganaderos, existen <strong>catástrofes de origen natural</strong> capaces de modificar de golpe la estructura de una comunidad. El programa pregunta explícitamente "¿de qué forma el terremoto y el tsunami pueden afectar la estructura de las comunidades biológicas de las zonas afectadas?". Un <strong>terremoto</strong> puede modificar de forma súbita el terreno y los hábitats de una zona; un <strong>tsunami</strong>, por su parte, inunda con agua salada las zonas costeras, alterando de manera abrupta tanto el sustrato como las poblaciones que allí vivían.',
      ejemplo: 'El programa plantea también un caso distinto de perturbación: "¿cómo explicar la sucesión en la laguna de una represa?". Cuando se construye una <strong>represa</strong> sobre un río, se forma una nueva laguna donde antes no existía ningún cuerpo de agua; a partir de ese momento, comienza ahí un proceso de <strong>sucesión limnológica</strong>, en el que distintos organismos acuáticos colonizan progresivamente ese nuevo ambiente.',
      aplicacion: 'Aunque el terremoto, el tsunami y la laguna de una represa son perturbaciones muy distintas entre sí —las dos primeras son catástrofes naturales y súbitas; la tercera surge de una obra de infraestructura humana—, las tres comparten algo en común: todas alteran de forma real la dinámica secuencial de una comunidad y dan pie a un nuevo proceso de sucesión ecológica, ya sea terrestre o limnológica.',
      compruebra: '¿Qué tienen en común el terremoto, el tsunami y la laguna de una represa como perturbaciones, y en qué se diferencian entre sí?' },

    { id: 't3', icon: '♻️', titulo: 'Recuperación, restauración y resiliencia natural de los ecosistemas',
      ideaClave: 'Tras una perturbación, un ecosistema puede recuperarse mediante procesos naturales —su resiliencia natural— aunque también existen estrategias locales de recuperación y restauración que las personas pueden impulsar de forma activa.',
      explicacion: 'El programa habla explícitamente de la "recuperación y restauración de los ecosistemas en procesos naturales (<strong>resiliencia natural</strong>)": la capacidad que tiene un ecosistema de recomponerse por sí mismo con el paso del tiempo, mediante un proceso de sucesión ecológica, sin que sea necesaria una intervención humana directa. Esa recuperación puede darse en áreas disturbadas tanto por una perturbación natural como por una perturbación antropogénica (provocada por el ser humano) —el programa menciona explícitamente áreas <strong>deforestadas, cultivadas, urbanizadas e inundadas</strong> como ejemplos de áreas que pueden atravesar ese proceso—.',
      ejemplo: 'Un potrero ganadero que se abandona y con el tiempo recupera parte de su cobertura vegetal original, sin que nadie intervenga directamente, es un ejemplo de resiliencia natural en acción, a través de una sucesión secundaria. El programa distingue esa recuperación espontánea de las <strong>"estrategias locales de recuperación y restauración natural de los ecosistemas"</strong>: acciones que las personas pueden impulsar de forma activa para ayudar —o incluso acelerar— ese proceso de recuperación.',
      aplicacion: 'Precisamente por esto, dos de los tres criterios de evaluación oficiales de esta unidad son "explorar las estrategias locales de recuperación y restauración natural de los ecosistemas" y "justificar acciones humanas que inciden en la permanencia y rehabilitación de los ecosistemas". El programa también pide identificar la <strong>importancia de la recuperación y rehabilitación de sistemas naturales alterados</strong>, y las principales medidas de protección de los ecosistemas en distintos contextos, tanto individuales como sociales.',
      compruebra: '¿Qué diferencia hay entre que un ecosistema se recupere por resiliencia natural y que se recupere gracias a una estrategia activa de restauración impulsada por las personas?' },

    { id: 't4', icon: '⚠️', titulo: 'Especies que se convierten en plagas, acciones humanas de riesgo y conservación',
      ideaClave: 'La introducción de especies que se establecen como plagas y ciertas acciones humanas —derrames de petróleo, emisiones de gases tóxicos, uso de plaguicidas y fertilizantes— alteran la dinámica de los ecosistemas; frente a esos riesgos, las iniciativas de conservación ambiental inciden en la permanencia de los ecosistemas y en el desarrollo sostenible.',
      explicacion: 'Un ecosistema también puede verse alterado por la <strong>introducción de especies</strong> que, al no encontrar en su nuevo territorio los controles naturales de su lugar de origen (depredadores, competidores), logran establecerse con fuerza y terminan convirtiéndose en una <strong>plaga</strong> para las especies nativas. El programa pide además analizar las "causas, interrelaciones y riesgos de algunas actuaciones humanas sobre diferentes ecosistemas", y menciona explícitamente tres ejemplos: los <strong>derrames de petróleo</strong>, las <strong>emisiones de gases tóxicos</strong> y el <strong>uso de plaguicidas y fertilizantes</strong>.',
      ejemplo: 'A diferencia de una perturbación puramente natural como un terremoto, una perturbación de origen humano —como un derrame de petróleo que sigue contaminando un ecosistema costero de forma continua— puede ser mucho más difícil de revertir solo con la resiliencia natural del ecosistema, y suele requerir estrategias activas de restauración.',
      aplicacion: 'Frente a estos riesgos, el programa pregunta explícitamente "¿cómo las iniciativas de <strong>conservación ambiental</strong> incluyen e inciden en la permanencia y rehabilitación de los ecosistemas y del desarrollo sostenible?". Esto conecta directamente el cuidado de los ecosistemas con el concepto de <strong>desarrollo sostenible</strong>: la posibilidad de que las actividades humanas continúen en el tiempo sin comprometer la capacidad de los ecosistemas de mantenerse y de recuperarse.',
      compruebra: '¿Por qué una especie introducida que se convierte en plaga, o una acción humana como un derrame de petróleo, puede ser más difícil de revertir que una perturbación natural como un terremoto?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Qué tipo de cambio o perturbación es?": 10
     situaciones reales del programa del MEP para clasificar entre 4
     categorías (sucesión terrestre, sucesión limnológica, perturbación
     natural, acción humana). Mismo patrón exacto de Sim1 de
     bio10-u01.js..u07.js, con 4 categorías en vez de 2 o 5.
     ================================================================ */
  const CATEGORIAS_SIM1 = [
    { id: 'terrestre', label: 'Sucesión terrestre' },
    { id: 'limnologica', label: 'Sucesión limnológica' },
    { id: 'natural', label: 'Perturbación natural' },
    { id: 'humana', label: 'Acción humana' }
  ];
  const SITUACIONES_SIM1 = [
    { texto: 'Un terreno que durante años estuvo dedicado a la ganadería es abandonado y, con el tiempo, comienzan a aparecer pastos, arbustos y luego especies leñosas.', correcta: 'terrestre', explica: 'Es sucesión terrestre: el proceso ocurre en tierra, sobre un suelo que ya tenía vida previa (sucesión secundaria).' },
    { texto: 'Al construirse una represa sobre un río, se forma una nueva laguna donde antes no existía ningún cuerpo de agua, y comienzan a colonizarla distintos organismos acuáticos.', correcta: 'limnologica', explica: 'Es sucesión limnológica: el proceso ocurre en un cuerpo de agua recién formado.' },
    { texto: 'Un fuerte terremoto sacude una zona costera y modifica de golpe el terreno y los hábitats del lugar.', correcta: 'natural', explica: 'Es una perturbación natural: una catástrofe de origen físico, no provocada por el ser humano.' },
    { texto: 'Un tsunami inunda con agua salada las playas y los manglares cercanos, alterando de forma abrupta la estructura de sus comunidades.', correcta: 'natural', explica: 'Es una perturbación natural: al igual que el terremoto, es una catástrofe de origen físico.' },
    { texto: 'Un derrame de petróleo contamina las aguas y las costas de un ecosistema marino.', correcta: 'humana', explica: 'Es una acción humana: el derrame de petróleo es un riesgo provocado por actividades humanas.' },
    { texto: 'El uso de plaguicidas y fertilizantes en un cultivo altera la dinámica de las poblaciones de ese ecosistema.', correcta: 'humana', explica: 'Es una acción humana: el uso de plaguicidas y fertilizantes es una de las acciones de riesgo mencionadas por el programa.' },
    { texto: 'Las emisiones de gases tóxicos de una fábrica afectan la calidad del aire y las comunidades biológicas cercanas.', correcta: 'humana', explica: 'Es una acción humana: las emisiones de gases tóxicos son otra de las acciones de riesgo mencionadas por el programa.' },
    { texto: 'Un terreno que antes se usaba para la agricultura queda en desuso y, poco a poco, vuelve a cubrirse de vegetación hasta acercarse de nuevo a un bosque.', correcta: 'terrestre', explica: 'Es sucesión terrestre: es el mismo tipo de caso citado por el programa sobre terrenos agrícolas o ganaderos abandonados.' },
    { texto: 'Una especie introducida en un nuevo territorio, sin los controles naturales de su lugar de origen, se establece con fuerza y se convierte en una plaga para las especies nativas.', correcta: 'humana', explica: 'Es una acción humana: la introducción de especies que se convierten en plagas está asociada a la actividad humana (comercio, transporte, acuicultura, entre otros).' },
    { texto: 'En la laguna formada tras represar un río, año tras año van apareciendo nuevas especies acuáticas que antes no estaban presentes.', correcta: 'limnologica', explica: 'Es sucesión limnológica: describe el avance del proceso de sucesión en el nuevo cuerpo de agua de la represa.' }
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
     SIMULADOR 2 — "Explorador de perturbaciones y sus casos reales":
     2 fases, mismo patrón exacto que Sim2 de bio10-u03.js/u07.js — (A)
     explorar libremente 4 casos reales, y (B) un quiz de 2ª fase donde
     MQC da el caso y el estudiante elige a qué perturbación pertenece.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'terremoto', nombre: '🌎 Terremoto', areas: 'Perturbación natural que modifica de forma súbita el terreno y los hábitats de una zona' },
    { id: 'tsunami', nombre: '🌊 Tsunami', areas: 'Perturbación natural que inunda con agua salada zonas costeras, alterando de forma abrupta su estructura' },
    { id: 'represa', nombre: '🚧 Laguna de una represa', areas: 'Obra humana que crea un nuevo cuerpo de agua donde comienza una sucesión limnológica' },
    { id: 'plaga', nombre: '🐛 Especie introducida como plaga', areas: 'Organismo que se establece en un territorio nuevo sin sus controles naturales de origen y altera la comunidad' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Un fuerte sismo sacude una zona costera, modificando de golpe el terreno y los hábitats del lugar.', opciones: ['Terremoto', 'Tsunami', 'Laguna de una represa', 'Especie introducida como plaga'], correcta: 0 },
    { fenomeno: 'Una ola gigante inunda con agua salada las playas y manglares de una zona costera, alterando su estructura de forma abrupta.', opciones: ['Tsunami', 'Terremoto', 'Especie introducida como plaga', 'Laguna de una represa'], correcta: 0 },
    { fenomeno: 'Al construirse una obra hidroeléctrica sobre un río, se forma un nuevo cuerpo de agua donde antes no existía ninguno.', opciones: ['Laguna de una represa', 'Tsunami', 'Terremoto', 'Especie introducida como plaga'], correcta: 0 },
    { fenomeno: 'Un organismo llegado de otra región, al no tener depredadores ni competidores naturales en su nuevo hábitat, se multiplica y compite con las especies nativas.', opciones: ['Especie introducida como plaga', 'Laguna de una represa', 'Tsunami', 'Terremoto'], correcta: 0 },
    { fenomeno: 'La sacudida del suelo durante un sismo puede destruir de forma inmediata refugios, madrigueras y zonas de anidación de varias especies.', opciones: ['Terremoto', 'Especie introducida como plaga', 'Laguna de una represa', 'Tsunami'], correcta: 0 },
    { fenomeno: 'En un nuevo embalse artificial, distintas especies acuáticas van colonizando progresivamente el agua recién represada.', opciones: ['Laguna de una represa', 'Terremoto', 'Especie introducida como plaga', 'Tsunami'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada caso real para ver qué tipo de perturbación representa.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos la perturbación →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿De qué perturbación se trata?</p>
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
     SIMULADOR 3 — "Recuperación de comunidades costeras tras un
     terremoto y un tsunami": escenario guiado en 2 pasos, con el caso
     de perturbación natural citado explícitamente en el programa.
     Mismo patrón exacto que Sim3 de bio10-u01.js..u07.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: un <strong>terremoto</strong> y el <strong>tsunami</strong> que le sigue afectan gravemente la estructura de las comunidades biológicas de una zona costera. Con el paso del tiempo, sin que nadie intervenga de forma directa, el ecosistema comienza a recuperar parte de su estructura original.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> esa recuperación espontánea, sin intervención humana directa, ¿a qué proceso corresponde?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="resiliencia">Resiliencia natural del ecosistema</button>
            <button class="btn btn-ghost" data-sim3-opcion="restauracion">Una estrategia de restauración impulsada por las personas</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ¿por qué ocurre esta recuperación sin intervención humana directa?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="sucesion">Porque el ecosistema tiene la capacidad de recomponerse por sí mismo con el tiempo, mediante un proceso de sucesión ecológica</button>
            <button class="btn btn-ghost" data-sim3-opcion2="siempre">Porque toda perturbación natural se revierte siempre en cuestión de horas</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Cuando un ecosistema se recompone por sí mismo tras una perturbación —como un terremoto y un tsunami—, sin que sea necesaria una intervención humana directa, se habla de resiliencia natural, y esa recuperación ocurre a través de un proceso de sucesión ecológica. Cuando esa capacidad no basta, entran en juego las estrategias locales de recuperación y restauración impulsadas activamente por las personas.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js..u09.js, pero
     apuntando a Biología 11.º y grado: 11) ────────────────────────── */
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
     TEORÍA — 4 temas en acordeón (menos que los 6 habituales, porque
     el sub-tema oficial de esta unidad es el más corto de las 5 de
     Biología 11.º — ver cabecera). Mismo patrón exacto que
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
      { id: 'sim1', titulo: '🌱 ¿Qué tipo de cambio o perturbación es?', desc: '10 situaciones reales (terremoto, tsunami, represa, especie plaga, sucesión en terrenos agrícolas) para clasificar el tipo de proceso.' },
      { id: 'sim2', titulo: '🌊 Explorador de perturbaciones y sus casos reales', desc: 'Explorá 4 perturbaciones reales y después probá identificando vos mismo de cuál se trata, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '♻️ Recuperación tras un terremoto y un tsunami', desc: 'Un escenario guiado paso a paso sobre la resiliencia natural de una comunidad costera tras una perturbación real.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 La perturbación correcta era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'resiliencia';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: cuando un ecosistema se recompone por sí mismo, sin intervención humana directa, se trata de resiliencia natural.'
            : '💡 En realidad es resiliencia natural: en este escenario nadie interviene directamente, es el ecosistema el que se recompone por sí mismo.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'sucesion';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: la resiliencia natural se manifiesta a través de un proceso de sucesión ecológica.'
            : '💡 En realidad es porque el ecosistema tiene capacidad de recomponerse mediante sucesión ecológica — no todas las perturbaciones naturales se revierten en horas.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Guardián de la sucesión": 5 escenarios reales (terremoto/
     tsunami, laguna de represa, especie invasora como plaga, derrame
     de petróleo, sucesión secundaria en terreno agrícola/ganadero
     abandonado), con pistas que orientan sin revelar la respuesta.
     Mismo patrón exacto que bio10-u01.js..u09.js: SIN XP al solo
     iniciar un nivel, y game-won/game-played UNA sola vez por nivel.
     SIEMPRE 5 niveles, aunque la unidad tenga solo 4 temas de teoría.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un fuerte terremoto sacude una zona costera y, minutos después, un tsunami inunda con agua salada las playas y los manglares cercanos, alterando de golpe la estructura de las comunidades biológicas del lugar.',
      pista: 'Pensá en una catástrofe de origen natural, no en algo provocado directamente por el ser humano.',
      correcta: 'Perturbación natural (terremoto y tsunami)', opciones: ['Perturbación natural (terremoto y tsunami)', 'Sucesión limnológica en la laguna de una represa', 'Especie introducida como plaga', 'Derrame de petróleo'] },
    { id: 'nivel2', escenario: 'Al construirse una represa sobre un río, se forma una nueva laguna donde antes no existía ningún cuerpo de agua; con el paso del tiempo, distintos organismos acuáticos comienzan a colonizar progresivamente ese nuevo ambiente.',
      pista: 'Pensá en un proceso de sucesión que ocurre en el agua, no en la tierra.',
      correcta: 'Sucesión limnológica en la laguna de una represa', opciones: ['Sucesión limnológica en la laguna de una represa', 'Perturbación natural (terremoto y tsunami)', 'Sucesión secundaria en terreno agrícola/ganadero abandonado', 'Especie introducida como plaga'] },
    { id: 'nivel3', escenario: 'Una especie introducida en un nuevo territorio no encuentra ahí los depredadores ni los competidores naturales que la controlaban en su lugar de origen, por lo que se establece con fuerza y se convierte en una plaga para las especies nativas.',
      pista: 'Pensá en un organismo que llega de otro lugar, no en un fenómeno del clima o del terreno.',
      correcta: 'Especie introducida como plaga', opciones: ['Especie introducida como plaga', 'Perturbación natural (terremoto y tsunami)', 'Derrame de petróleo', 'Sucesión secundaria en terreno agrícola/ganadero abandonado'] },
    { id: 'nivel4', escenario: 'Un derrame de petróleo contamina las aguas y las costas de un ecosistema marino, afectando directamente a las poblaciones que dependen de ese ambiente y dificultando su recuperación natural.',
      pista: 'Pensá en una acción humana relacionada con un combustible fósil, no en un fenómeno natural.',
      correcta: 'Derrame de petróleo', opciones: ['Derrame de petróleo', 'Sucesión limnológica en la laguna de una represa', 'Perturbación natural (terremoto y tsunami)', 'Especie introducida como plaga'] },
    { id: 'nivel5', escenario: 'Un terreno que durante años estuvo dedicado a la agricultura o la ganadería es finalmente abandonado; con el paso del tiempo, aparecen primero pastos y arbustos pioneros y, más adelante, especies leñosas que lo acercan de nuevo a un bosque.',
      pista: 'Pensá en un terreno que ya tenía suelo y vida previa, no en un ambiente acuático nuevo.',
      correcta: 'Sucesión secundaria en terreno agrícola/ganadero abandonado', opciones: ['Sucesión secundaria en terreno agrícola/ganadero abandonado', 'Especie introducida como plaga', 'Derrame de petróleo', 'Perturbación natural (terremoto y tsunami)'] }
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
        <h3 style="margin:0 0 .3rem">🌱 Guardián de la Sucesión</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué proceso o perturbación describe este escenario?</p>
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
     EXAMEN — banco real (js/data/banco-bio11-u04.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js..u09.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO11_U04 !== 'undefined') ? PREGUNTAS_BIO11_U04 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO11-U04</h3>
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
     MISIÓN FINAL — "Bajo la lupa: la recuperación de comunidades
     costeras tras un terremoto y un tsunami" (mismo patrón exacto que
     bio10-u01.js..u09.js: awardXP('biologia11-mission-done') UNA sola
     vez, vía missionDone). Caso real de perturbación natural citado
     explícitamente por el programa del MEP.
     ================================================================ */
  const MISION_A_OPCIONES = ['Su estructura se ve modificada por una perturbación de origen natural', 'Pueden recuperar parte de su estructura original con el paso del tiempo, gracias a la resiliencia natural', 'Dejan de pertenecer a cualquier ecosistema para siempre', 'Solo pueden recuperarse si el ser humano interviene directamente'];
  const MISION_A_CORRECTAS = ['Su estructura se ve modificada por una perturbación de origen natural', 'Pueden recuperar parte de su estructura original con el paso del tiempo, gracias a la resiliencia natural'];
  const MISION_B_OPCIONES = [
    'Resiliencia natural',
    'Restauración activa impulsada por las personas',
    'Sucesión limnológica',
    'Efecto fundador'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Impulsar una estrategia local de recuperación y restauración de forma activa',
    'Esperar sin hacer nada a que la sucesión ecológica actúe por sí sola',
    'Introducir una nueva especie que se convierta en plaga',
    'Aumentar las emisiones de gases tóxicos en la zona afectada'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: la recuperación de comunidades costeras tras un terremoto y un tsunami".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🌊 Misión: Bajo la lupa — la recuperación de comunidades costeras tras un terremoto y un tsunami</h3>
        <p style="color:var(--text-secondary)">Texto base: "El terremoto y el tsunami pueden afectar la estructura de las comunidades biológicas de las zonas costeras afectadas. Sin embargo, algunos ecosistemas logran recuperar parte de su estructura original con el paso del tiempo, gracias a su resiliencia natural: su capacidad de recomponerse por sí mismos mediante un proceso de sucesión ecológica, sin que sea necesaria la intervención directa del ser humano. Además, existen estrategias locales de recuperación y restauración que las personas pueden impulsar activamente para apoyar ese proceso, especialmente cuando el daño es muy severo o cuando la perturbación es de origen humano."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué le puede ocurrir a las comunidades biológicas costeras tras un terremoto y un tsunami, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cómo se llama la capacidad de un ecosistema de recomponerse por sí mismo con el tiempo, sin intervención humana directa, según el texto?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. Según el texto, ¿qué pueden hacer las personas cuando la sola resiliencia natural no basta para recuperar un ecosistema?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué una perturbación de origen humano, como un derrame de petróleo, puede ser más difícil de revertir mediante la sola resiliencia natural que una perturbación como un terremoto?</p>
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
