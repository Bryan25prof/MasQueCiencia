/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u03.js
   BIO10-U03 — Ecología
   ================================================================
   FUENTES (combinadas, ver también banco-bio10-u03.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad III / Tema 3 "Ecología"
       (páginas 78-107). El archivo del libro presentó daño real y
       confirmado en varios puntos puntuales de esta unidad: una
       página completamente en blanco, una página faltante por
       completo (salto de numeración 81→83) y el recuadro de
       "Indicadores" del inicio del tema vacío. El resto de la unidad
       SÍ se pudo leer de forma íntegra y es la base real de esta
       entrega: el encabezado del Tema 3, el ejemplo de especies que
       reparten recursos en un archipiélago sin interferir entre sí
       (pág. 81), "Actividad 1: Relaciones entre organismos con su
       entorno" (manglar, ballena jorobada, tortuga carey,
       polinización — pág. 88-91), "Actividad 2: Hábitat y nicho"
       (manglar, mariposa monarca — pág. 92-95), "Actividad 3: Tipos
       de nicho y fragmentación del hábitat" (mariposa morpho didius,
       ballena jorobada, camarón tigre asiático en Barra del Colorado,
       incendios forestales de 2016 según el Sinac — pág. 96-107).

   (b) Programa de Estudio de Biología del MEP ("Educar para una Nueva
       Ciudadanía", Educación Diversificada, Décimo año), Eje temático
       I, criterios de evaluación y situaciones de aprendizaje sobre
       nicho ecológico, hábitat y factores ambientales (páginas 36-38
       del programa oficial) — usado, con autorización explícita de
       Bryan, para reconstruir las partes puntuales del libro que
       resultaron dañadas/ilegibles: los componentes del ecosistema,
       los factores ambientales que describen un hábitat, y el
       concepto de nicho fundamental/efectivo. Estas partes están
       redactadas a partir del programa oficial del MEP, no son una
       transcripción del libro dañado.

   Mismo patrón de plugin EXACTO que bio10-u01.js/bio10-u02.js —
   apunta a Storage.updateBiologia10Unit / markBiologia10TopicRead /
   data.biologia10, nunca a las funciones de Química ni de Física.
   Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio10-u03';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🌎', titulo: 'Componentes de los ecosistemas',
      ideaClave: 'Un ecosistema combina los componentes bióticos (los seres vivos) con los componentes abióticos (los factores físico-químicos sin vida) que interactúan en un espacio determinado.',
      explicacion: 'Todo ecosistema tiene <strong>componentes bióticos</strong>: plantas, animales, hongos, bacterias y demás seres vivos que lo habitan. Junto a ellos existen <strong>componentes abióticos</strong>: la luz, el agua, la temperatura, el aire y el suelo, entre otros factores físico-químicos sin vida. Ambos tipos de componentes interactúan constantemente, y esa interacción es la que define cómo cada especie logra sobrevivir, alimentarse y reproducirse en ese espacio.',
      ejemplo: 'El manglar es un ecosistema formado principalmente por árboles tolerantes a las sales, ubicado en la zona intermareal cercana a la desembocadura de ríos. Tiene una alta diversidad biológica y productividad: encuentra refugio y alimento en él una gran variedad de aves, peces, crustáceos y moluscos.',
      aplicacion: 'Comprender que un ecosistema como el manglar depende tanto de sus componentes bióticos (las especies que lo habitan) como de los abióticos (la salinidad, la marea, el tipo de suelo) ayuda a entender por qué alterar uno de esos factores puede afectar a todo el sistema.',
      compruebra: 'En el ejemplo del manglar, ¿cuáles elementos mencionados son componentes bióticos y cuáles son abióticos?' },

    { id: 't2', icon: '🌡️', titulo: 'Factores ambientales del hábitat',
      ideaClave: 'Los factores energéticos, climáticos y de sustrato son los que, en conjunto, determinan el hábitat de una población y su capacidad de sobrevivir en el tiempo.',
      explicacion: 'Los <strong>factores energéticos</strong> se relacionan principalmente con la disponibilidad de alimento. Los <strong>factores climáticos</strong> incluyen la luz solar, la temperatura, el viento y la lluvia, entre otros aspectos físico-químicos. Los <strong>factores de sustrato</strong> tienen que ver con la composición y estructura del medio: el aire, el suelo y el agua. Juntos, estos factores determinan la distribución de las poblaciones y su supervivencia en el tiempo, además de definir el hábitat de esa población.',
      ejemplo: 'En el manglar, un factor físico-químico determinante es la salinidad del agua: solo las especies adaptadas a tolerarla pueden establecerse ahí. Otros factores, como el tipo de suelo y el nivel de la marea, también condicionan qué organismos pueden sobrevivir en esa zona.',
      aplicacion: 'Antes de estudiar una población en el campo, identificar sus factores ambientales (¿qué alimento necesita? ¿qué temperatura tolera? ¿qué tipo de suelo o agua requiere?) permite entender por qué esa especie vive justamente ahí y no en otro lugar.',
      compruebra: '¿Qué factores ambientales (energéticos, climáticos o de sustrato) crees que más limitan la distribución de una especie que conozcas?' },

    { id: 't3', icon: '🏠', titulo: 'Diferencias entre hábitat y nicho',
      ideaClave: 'El hábitat es el lugar físico donde vive un organismo; el nicho ecológico es el papel o función que cumple en ese lugar.',
      explicacion: 'Es común confundir estos dos conceptos, pero son distintos: el <strong>hábitat</strong> responde a la pregunta "¿dónde vive?", mientras que el <strong>nicho ecológico</strong> responde a "¿qué hace ahí?" — de qué se alimenta, cómo obtiene sus recursos y cómo se relaciona con otras especies. Una misma especie puede mantener el mismo hábitat y, sin embargo, cambiar de nicho en distintas etapas de su vida.',
      ejemplo: 'La oruga de la mariposa monarca se alimenta exclusivamente de la planta <em>Asclepias curassavica</em> (herbívora); al completar la metamorfosis, la mariposa adulta se vuelve nectarívora. Cambia su nicho, aunque siga usando espacios similares. De forma parecida, la ballena jorobada tiene como hábitat las aguas polares y tropicales por las que migra, mientras que su nicho es el de un filtrador que obtiene alimento con las barbas de su garganta.',
      aplicacion: 'El camarón tigre asiático, introducido en los esteros y canales de Barra del Colorado, tiene ahí su hábitat; su nicho es el de un consumidor de larvas de peces y de otros camarones, lo que lo pone en competencia directa con las especies nativas de la zona.',
      compruebra: 'Si una mariposa cambia de estado (de oruga a adulta) y empieza a alimentarse de algo distinto sin cambiar de lugar, ¿cambió su hábitat o su nicho? Explicá.' },

    { id: 't4', icon: '🦋', titulo: 'Tipos de nicho: fundamental y efectivo',
      ideaClave: 'El nicho fundamental es todo lo que una especie podría llegar a usar; el nicho efectivo (o realizado) es la parte de ese nicho que realmente usa, limitada por la competencia u otros factores.',
      explicacion: 'Ninguna especie suele ocupar todo su nicho fundamental: la competencia con otras especies, la presencia de depredadores u otros factores limitan lo que realmente aprovecha, es decir, su <strong>nicho efectivo</strong>. Cuando una especie se introduce en un territorio nuevo sin sus controles naturales de origen (depredadores, competidores), puede terminar ocupando un nicho efectivo mucho más amplio del que tenía originalmente.',
      ejemplo: 'El pez león, invasor en el mar Caribe, no tiene ahí depredadores ni competidores naturales que lo limiten como en su zona de origen (el Indo-Pacífico) — por eso su nicho efectivo en el Caribe es mucho más amplio. Algo similar ocurre con especies introducidas como ciertos geckos, o con el mosquito <em>Aedes aegypti</em>, que ha ampliado su distribución en años recientes.',
      aplicacion: 'El camarón tigre asiático en Barra del Colorado ilustra el mismo fenómeno: al no tener los controles naturales de su zona de origen, puede expandir su nicho efectivo y competir con las especies nativas por el alimento disponible, afectando incluso a las pesquerías locales.',
      compruebra: '¿Por qué una especie invasora suele tener, en su nuevo territorio, un nicho efectivo más amplio que en su zona de origen?' },

    { id: 't5', icon: '🪓', titulo: 'Fragmentación del hábitat',
      ideaClave: 'La fragmentación divide un hábitat continuo en fragmentos aislados, con consecuencias graves para las especies que dependían de esa continuidad.',
      explicacion: 'Entre las consecuencias de la fragmentación del hábitat están: la disminución o pérdida de recursos disponibles para las especies, cambios en los factores ambientales y físico-químicos de los distintos nichos, la disminución de las poblaciones, la pérdida de especies por el aislamiento entre fragmentos, y la pérdida o disminución de nichos por el aumento de la competencia por los recursos. Puede originarse por deforestación, por la construcción de un embalse hidroeléctrico que represa un río, por el corte de lagunas o riveras al construir un terraplén, o por incendios forestales — además, el cambio climático también modifica y fragmenta los hábitats existentes.',
      ejemplo: 'Entre enero y abril de 2016, los incendios forestales afectaron 2787 hectáreas dentro de parques nacionales y refugios en Costa Rica. Según el Sistema Nacional de Áreas de Conservación (Sinac), el 100% de esos incidentes fueron provocados por el ser humano, ya fuera por quemas agrícolas fuera de control o por vandalismo. Los animales se vieron afectados por quemaduras, por asfixia debido al humo, y algunos murieron atropellados al intentar cruzar carreteras huyendo del fuego.',
      aplicacion: 'La construcción de un embalse hidroeléctrico puede fragmentar el hábitat de una población al represar un río, aislando a las especies que dependían de su curso natural — un ejemplo de cómo una obra de infraestructura, sin intención directa, también puede fragmentar hábitats.',
      compruebra: 'A partir del ejemplo de los incendios forestales de 2016, ¿cómo ejemplificarías con tus propias palabras el concepto de fragmentación del hábitat?' },

    { id: 't6', icon: '🛡️', titulo: 'Importancia de la conservación del hábitat',
      ideaClave: 'Conservar los hábitats tiene razones tanto científicas (entender la evolución, obtener productos curativos) como ecológicas (producción de oxígeno, regulación del clima, protección del agua).',
      explicacion: 'Existen razones de carácter científico para conservar los hábitats, que van desde la importancia de entender la evolución de los seres vivos hasta la obtención de productos curativos como antibióticos y antifúngicos, pasando por la investigación animal y la comprensión de la ecología. Entre las razones ecológicas están la producción de oxígeno por parte de las plantas, su papel en ciclos biogeoquímicos como el del azufre y el carbono, la fijación de energía solar formando biomasa aprovechable, la depuración de las aguas y el aire, y el papel de los hábitats conservados como moderadores del clima y fuente de recursos — incluida la protección de las nacientes de agua.',
      ejemplo: 'Las áreas silvestres protegidas cumplen un papel clave en la conservación: ayudan a mitigar la fragmentación del hábitat y a proteger la biodiversidad de una región, además de servir de referencia para programas de conservación de especies concretas.',
      aplicacion: 'A nivel individual, cada persona puede informarse de forma autónoma sobre proyectos que puedan perjudicar el entorno y dar su opinión fundamentada al respecto — una forma concreta de participación ciudadana en la conservación del hábitat.',
      compruebra: '¿Qué acción concreta podrías proponer para conservar o restaurar un espacio de tu localidad que esté siendo alterado?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Hábitat o nicho?": 10 situaciones reales (manglar,
     ballena jorobada, camarón tigre, mariposa monarca, jaguar) para
     clasificar si describen el HÁBITAT (lugar) o el NICHO (función).
     Mismo patrón exacto que Sim1 de bio10-u01.js/u02.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'La ballena jorobada migra entre aguas polares frías y aguas tropicales cálidas cerca de Costa Rica.', correcta: 'habitat', explica: 'Es hábitat: describe los lugares físicos donde vive y se desplaza la ballena.' },
    { texto: 'La ballena jorobada filtra grandes cantidades de agua con las barbas de su garganta para atrapar alimento.', correcta: 'nicho', explica: 'Es nicho: describe la función que cumple para alimentarse.' },
    { texto: 'El camarón tigre asiático vive en los esteros y canales de Barra del Colorado.', correcta: 'habitat', explica: 'Es hábitat: describe el lugar físico donde vive esta especie introducida.' },
    { texto: 'El camarón tigre asiático se alimenta de larvas de peces y de otros camarones nativos.', correcta: 'nicho', explica: 'Es nicho: describe su función alimentaria y su relación con otras especies.' },
    { texto: 'La oruga de la mariposa monarca se alimenta únicamente de la planta Asclepias curassavica.', correcta: 'nicho', explica: 'Es nicho: describe qué come, es decir, su función en ese momento de su vida.' },
    { texto: 'La mariposa monarca adulta se encuentra en jardines y zonas con flores silvestres.', correcta: 'habitat', explica: 'Es hábitat: describe el lugar físico donde se encuentra la mariposa adulta.' },
    { texto: 'El manglar es un ecosistema formado por árboles tolerantes a la sal, ubicado en zonas intermareales.', correcta: 'habitat', explica: 'Es hábitat: describe el lugar físico donde viven muchas especies asociadas al manglar.' },
    { texto: 'Dentro del manglar, los cangrejos cumplen la función de descomponer materia orgánica.', correcta: 'nicho', explica: 'Es nicho: describe el papel ecológico que cumplen los cangrejos en ese ecosistema.' },
    { texto: 'El jaguar necesita grandes extensiones de bosque continuo para desplazarse y cazar.', correcta: 'habitat', explica: 'Es hábitat: describe el espacio físico que necesita el jaguar.' },
    { texto: 'El jaguar es un depredador tope que regula las poblaciones de otras especies del bosque.', correcta: 'nicho', explica: 'Es nicho: describe la función ecológica del jaguar dentro de su hábitat.' }
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
          <button class="btn btn-ghost" data-sim1-opcion="habitat">Hábitat</button>
          <button class="btn btn-ghost" data-sim1-opcion="nicho">Nicho</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de fragmentación del hábitat": 2 fases,
     mismo patrón exacto que Sim2 de bio10-u02.js — (A) explorar
     libremente 6 causas reales de fragmentación, y (B) un quiz de 2ª
     fase donde MQC da el caso y el estudiante elige la causa.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'incendios2016', nombre: '🔥 Incendios forestales 2016', areas: 'Incendios provocados (quemas agrícolas o vandalismo)' },
    { id: 'embalse', nombre: '🌊 Embalse hidroeléctrico', areas: 'Represamiento de un río' },
    { id: 'terraplen', nombre: '🛣️ Terraplén sobre lagunas/riveras', areas: 'Corte y aislamiento de cuerpos de agua' },
    { id: 'deforestacion', nombre: '🪓 Deforestación', areas: 'Tala de bosque' },
    { id: 'camaronTigre', nombre: '🦐 Camarón tigre en Barra del Colorado', areas: 'Especie exótica invasora' },
    { id: 'climatico', nombre: '🌡️ Cambio climático', areas: 'Alteración de las condiciones climáticas del hábitat' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Entre enero y abril de 2016, los incendios forestales afectaron 2787 hectáreas dentro de parques nacionales y refugios; según el Sinac, el 100% fueron provocados por el ser humano.', opciones: ['Incendios provocados (quemas agrícolas o vandalismo)', 'Represamiento de un río', 'Especie exótica invasora', 'Corte y aislamiento de cuerpos de agua'], correcta: 0 },
    { fenomeno: 'La construcción de una represa fragmenta el hábitat de una población al aislar a las especies que dependían del curso natural del río.', opciones: ['Represamiento de un río', 'Incendios provocados (quemas agrícolas o vandalismo)', 'Especie exótica invasora', 'Tala de bosque'], correcta: 0 },
    { fenomeno: 'El corte de una laguna o rivera por la construcción de un terraplén puede aislar poblaciones que antes estaban conectadas por ese cuerpo de agua.', opciones: ['Corte y aislamiento de cuerpos de agua', 'Represamiento de un río', 'Cambio climático', 'Especie exótica invasora'], correcta: 0 },
    { fenomeno: 'La tala de árboles reduce y fragmenta el bosque continuo, dejando solo parches aislados de vegetación.', opciones: ['Tala de bosque', 'Corte y aislamiento de cuerpos de agua', 'Represamiento de un río', 'Incendios provocados (quemas agrícolas o vandalismo)'], correcta: 0 },
    { fenomeno: 'El camarón tigre asiático, introducido en los esteros de Barra del Colorado, compite con las especies nativas por el alimento y podría afectar a las pesquerías locales.', opciones: ['Especie exótica invasora', 'Cambio climático', 'Tala de bosque', 'Represamiento de un río'], correcta: 0 },
    { fenomeno: 'La alteración de las condiciones climáticas modifica los hábitats de los que dependen las poblaciones actuales.', opciones: ['Cambio climático', 'Especie exótica invasora', 'Corte y aislamiento de cuerpos de agua', 'Tala de bosque'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada caso real para ver qué tipo de causa de fragmentación representa.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos la causa →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿Qué causa de fragmentación es esta?</p>
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
     SIMULADOR 3 — "Nicho fundamental vs. nicho efectivo": escenario
     guiado en 2 pasos, con el caso real del pez león invasor en el
     Caribe. Mismo patrón exacto que Sim3 de bio10-u01.js/u02.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: el <strong>pez león</strong> es originario del océano Índico y el Pacífico occidental. Hace unos años fue introducido en el mar Caribe, donde no existen depredadores ni competidores naturales que lo controlen como en su zona de origen.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> en el mar Caribe, ¿el nicho efectivo del pez león es más amplio o más reducido que en su zona de origen?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="amplio">Más amplio</button>
            <button class="btn btn-ghost" data-sim3-opcion="reducido">Más reducido</button>
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
            <button class="btn btn-ghost" data-sim3-opcion2="sincontrol">Porque no tiene depredadores ni competidores naturales que lo limiten</button>
            <button class="btn btn-ghost" data-sim3-opcion2="mascomida">Porque en el Caribe hay más alimento que en cualquier otro mar del mundo</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Cuando una especie invasora no tiene los controles naturales de su zona de origen (depredadores, competidores), puede ocupar un nicho efectivo mucho más amplio que el que tenía originalmente — sin que eso signifique que su nicho fundamental haya cambiado.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/u02.js) ──── */
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
     bio10-u01.js/u02.js.
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
     bio10-u01.js/u02.js.
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
      { id: 'sim1', titulo: '🏠 ¿Hábitat o nicho?', desc: '10 situaciones reales (manglar, ballena jorobada, camarón tigre, mariposa monarca) para distinguir hábitat de nicho.' },
      { id: 'sim2', titulo: '🪓 Explorador de fragmentación del hábitat', desc: 'Explorá 6 causas reales de fragmentación del hábitat y después probá identificando vos mismo la causa, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🐟 Nicho fundamental vs. nicho efectivo', desc: 'Un escenario guiado paso a paso con el caso real del pez león invasor en el mar Caribe.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 La causa correcta era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'amplio';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: sin depredadores ni competidores naturales, el pez león ocupa un nicho efectivo más amplio en el Caribe.'
            : '💡 En realidad es más amplio: al no tener depredadores ni competidores naturales en el Caribe, el pez león puede ocupar un nicho efectivo mayor que en su zona de origen.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'sincontrol';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: la ausencia de depredadores y competidores naturales es lo que permite que su nicho efectivo se amplíe.'
            : '💡 En realidad es porque no tiene depredadores ni competidores naturales que lo limiten — no se trata simplemente de que haya más alimento disponible.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Guardián del hábitat": 5 escenarios reales de
     fragmentación, con pistas que orientan sin revelar la respuesta.
     Mismo patrón exacto que bio10-u01.js/u02.js: SIN XP al solo
     iniciar un nivel, y game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Entre enero y abril de 2016, los incendios forestales afectaron 2787 hectáreas dentro de parques nacionales y refugios; el Sinac confirmó que el 100% fueron provocados por el ser humano.',
      pista: 'Pensá en el fuego, no en el agua ni en una especie introducida.',
      correcta: 'Incendios provocados', opciones: ['Incendios provocados', 'Represamiento de un río', 'Especie exótica invasora', 'Corte de una laguna'] },
    { id: 'nivel2', escenario: 'La construcción de una represa fragmenta el hábitat de una población al aislar a las especies que dependían del curso natural del río.',
      pista: 'Pensá en una obra de infraestructura relacionada con generar electricidad a partir del agua.',
      correcta: 'Represamiento de un río', opciones: ['Represamiento de un río', 'Incendios provocados', 'Tala de bosque', 'Cambio climático'] },
    { id: 'nivel3', escenario: 'El camarón tigre asiático, introducido en los esteros de Barra del Colorado, compite con las especies nativas por el alimento.',
      pista: 'Pensá en una especie que no es originaria de ese lugar.',
      correcta: 'Especie exótica invasora', opciones: ['Especie exótica invasora', 'Cambio climático', 'Represamiento de un río', 'Incendios provocados'] },
    { id: 'nivel4', escenario: 'La tala de árboles reduce y fragmenta el bosque continuo, dejando solo parches aislados de vegetación.',
      pista: 'Pensá en cortar árboles, no en el agua ni en el fuego.',
      correcta: 'Tala de bosque', opciones: ['Tala de bosque', 'Represamiento de un río', 'Especie exótica invasora', 'Corte de una laguna'] },
    { id: 'nivel5', escenario: 'La alteración de las condiciones climáticas modifica los hábitats de los que dependen las poblaciones actuales.',
      pista: 'Pensá en un fenómeno global, no en una obra puntual de infraestructura.',
      correcta: 'Cambio climático', opciones: ['Cambio climático', 'Tala de bosque', 'Especie exótica invasora', 'Incendios provocados'] }
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
        <h3 style="margin:0 0 .3rem">🛡️ Guardián del Hábitat</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la causa de fragmentación del hábitat?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u03.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U03 !== 'undefined') ? PREGUNTAS_BIO10_U03 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U03</h3>
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
     MISIÓN FINAL — "Bajo la lupa: el camarón tigre asiático en Barra
     del Colorado" (mismo patrón exacto que bio10-u01.js/u02.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía
     missionDone). Caso real citado en el libro, con datos reales
     (Penaeus monodon, hasta 33 cm, cita textual de un especialista).
     ================================================================ */
  const MISION_A_OPCIONES = ['Es una especie asiática introducida por acuicultura', 'Puede llegar a medir hasta 33 cm', 'Es originaria de Costa Rica', 'Se alimenta exclusivamente de plantas acuáticas'];
  const MISION_A_CORRECTAS = ['Es una especie asiática introducida por acuicultura', 'Puede llegar a medir hasta 33 cm'];
  const MISION_B_OPCIONES = [
    'Los esteros y canales de Barra del Colorado',
    'Los arrecifes de coral del Caribe',
    'Las montañas de Talamanca',
    'Los ríos de alta montaña de Guanacaste'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Consumidor de larvas de peces y de otros camarones, compitiendo con las especies nativas',
    'Depredador tope sin ningún competidor natural',
    'Descomponedor de materia orgánica en el fondo marino',
    'Polinizador de plantas acuáticas'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el camarón tigre asiático en Barra del Colorado".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🦐 Misión: Bajo la lupa — el camarón tigre asiático en Barra del Colorado</h3>
        <p style="color:var(--text-secondary)">Texto base: "El camarón tigre (<em>Penaeus monodon</em>) es una especie asiática utilizada en acuicultura, que puede llegar a medir 33 centímetros. Si llegan a alcanzar ese tamaño, es porque consumen mucha energía proveniente del alimento, por lo que el impacto en el ecosistema puede ser significativo. En Barra del Colorado, el camarón tigre podría estar alimentándose de larvas de peces y otros camarones, impidiendo que estas se desarrollen y, con ello, se afectaría a las pesquerías."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué características tiene el camarón tigre, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cuál es el hábitat del camarón tigre en Barra del Colorado, según el texto?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Cuál es su nicho ecológico, según el texto?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué el camarón tigre representa una amenaza para las pesquerías locales de Barra del Colorado?</p>
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
     bio10-u01.js/u02.js — ver biologia10.js) ──────────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
