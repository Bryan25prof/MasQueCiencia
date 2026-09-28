/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u02.js
   BIO10-U02 — La biodiversidad
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Biología 10º:
   Un Enfoque Práctico" (Licda. Kathia E. Hernández Camacho, Ed.
   Didáctica Multimedia, 6.ª ed. 2018, ISBN 978-9968-9553-5-5),
   Unidad II / Tema 2 (páginas 46-61). Los 6 temas, el banco de 50
   preguntas (js/data/banco-bio10-u02.js) y la misión final son
   contenido real, no inventado. Los escenarios del juego "Guardián
   de la Biodiversidad" también están basados en casos reales citados
   en el libro (finca Crucitas, orangutanes de Indonesia, casquetes
   polares, sobrepesca, eutrofización).

   NOTA TÉCNICA: el archivo original del libro subido para construir
   las unidades III a IX (Ecología, poblaciones, genética, evolución)
   resultó tener daño real en el PDF a partir de la página ~76
   (confirmado con pdftoppm/qpdf/pikepdf: errores masivos de sintaxis
   y contenido de páginas cruzado entre secciones). Por eso esta
   entrega avanza solo con BIO10-U02, que sí se pudo leer de forma
   íntegra y confiable (páginas 46-61) — se le pidió a Bryan que
   vuelva a subir el archivo para continuar con las unidades restantes.

   Mismo patrón de plugin EXACTO que bio10-u01.js — apunta a
   Storage.updateBiologia10Unit / markBiologia10TopicRead /
   data.biologia10, nunca a las funciones de Química ni de Física.
   Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio10-u02';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🐦', titulo: 'Especie y población',
      ideaClave: 'Una especie reúne individuos capaces de reproducirse entre sí y dar descendencia viable; una población reúne individuos de una misma especie que conviven en un mismo espacio y tiempo.',
      explicacion: 'Desde el punto de vista biológico, una <strong>especie</strong> es un conjunto de individuos con interacciones genéticas, evolutivas y ecológicas, cuyos miembros pueden reproducirse entre sí. La apariencia física ayuda a identificarlas, pero no las define: lo que realmente las distingue es la capacidad de dar descendencia viable. Una <strong>población ecológica</strong>, en cambio, es un conjunto de individuos de una misma especie que coexisten en un espacio y tiempo determinados, compartiendo cohesión reproductiva (intercambian material genético) y cohesión ecológica (requerimientos similares para sobrevivir y reproducirse).',
      ejemplo: 'Los turpiales gorjeadores (<em>Sturnella neglecta</em>) y los turpiales orientales (<em>Sturnella magna</em>) son casi idénticos en apariencia, pero sus cantos diferentes impiden que se reproduzcan entre sí — por eso son especies distintas, aunque convivan en la misma área.',
      aplicacion: 'Ejemplos reales de población son una bandada de gaviotas, un rebaño de ovejas, un panal de abejas o una plantación de yuca. Para estudiarlas en el campo se usan <strong>transectos</strong> (lineales, de banda o de perfil), delimitados con cuerdas, que permiten registrar qué especies aparecen en un área y cuántos individuos hay de cada una.',
      compruebra: '¿Por qué dos animales que se ven casi idénticos pueden, aun así, pertenecer a especies distintas?' },

    { id: 't2', icon: '🌎', titulo: 'La biodiversidad y Costa Rica',
      ideaClave: 'La biodiversidad es toda la variedad de la vida — de especies, de genes y de ecosistemas — y Costa Rica concentra una porción extraordinaria de ella pese a su pequeño tamaño.',
      explicacion: 'La biodiversidad no se limita a contar especies: incluye también la <strong>diversidad genética</strong> (variación dentro de cada especie) y la <strong>diversidad de ecosistemas</strong>. Se calcula que existen cerca de 30 millones de especies en el planeta, aunque no todas han sido descritas: cada año se descubren entre 12 000 y 25 000 especies nuevas, la mayoría insectos. Una especie es <strong>endémica</strong> cuando solo aparece en un área determinada de la Tierra, como una isla o una cadena montañosa.',
      ejemplo: 'Con solo 51 100 km² de superficie terrestre (apenas el 0,03% de la superficie mundial) y 589 000 km² de mar territorial, Costa Rica es uno de los 20 países con mayor biodiversidad del mundo: alberga cerca del 4% de las especies estimadas a nivel mundial, más de 500 000 especies, de las cuales poco más de 300 000 son insectos.',
      aplicacion: 'Los científicos identifican "puntos calientes" (hotspots) de biodiversidad: regiones con gran cantidad de especies endémicas amenazadas, que cubren apenas el 1,4% de la superficie terrestre pero concentran casi la mitad de las especies de plantas conocidas — y están gravemente amenazados por la tala, la minería y la expansión de monocultivos.',
      compruebra: '¿Por qué un territorio tan pequeño como Costa Rica puede tener una biodiversidad tan alta?' },

    { id: 't3', icon: '📊', titulo: 'Medición de la biodiversidad',
      ideaClave: 'La biodiversidad se mide combinando la riqueza de especies (cuántas hay) con su abundancia relativa (cuántos individuos hay de cada una), usando índices de diversidad.',
      explicacion: 'Para estudiar la biodiversidad de un área se recolectan datos con <strong>transectos</strong> (lineal, de banda o de perfil), delimitados con cuerdas. Con esos datos se calculan índices como el de <strong>Shannon</strong> (H\', valores superiores a 3 indican diversidad alta, entre 2 y 3 equilibrio, menos de 2 diversidad poca), el de <strong>Margalef</strong> (D, relaciona el número de especies S con el número total de individuos N: bajo 2 indica baja biodiversidad, sobre 5 indica alta) y el de <strong>Simpson</strong> (S = 1 − Σpi², donde entre más cercano a 1, menor la dominancia de una sola especie).',
      ejemplo: 'En un transecto escolar con 10 especies y 45 individuos, se calculó un índice de Simpson de 0,8909 (alta biodiversidad, sin especie dominante) y un índice de Shannon de 3,23 (especies en equilibrio).',
      aplicacion: 'Estos índices permiten comparar objetivamente la biodiversidad de distintas zonas — por ejemplo, para decidir cuáles áreas necesitan protección prioritaria — en lugar de basarse solo en una impresión visual del lugar.',
      compruebra: 'Si un transecto arroja un índice de Simpson de 0,95 y otro de 0,40, ¿cuál de los dos tiene mayor biodiversidad?' },

    { id: 't4', icon: '🌳', titulo: 'Ecosistemas',
      ideaClave: 'Un ecosistema combina los componentes bióticos (seres vivos) con los abióticos (factores no vivos) de un lugar, y puede clasificarse según su medio, su origen y su tamaño.',
      explicacion: 'En un ecosistema interactúan los <strong>componentes bióticos</strong> (plantas, animales, hongos, bacterias, algas, microorganismos) con los <strong>componentes abióticos</strong> (minerales del suelo, agua, aire, viento, luz, calor). Según su medio, un ecosistema puede ser <strong>acuático</strong> (ríos, lagos, océanos), <strong>terrestre</strong> (fuera del agua) o <strong>aéreo</strong> (de transición: ningún organismo vive ahí permanentemente). Estos tres tipos agrupan lo que se llama <strong>biosfera</strong>: la zona de la Tierra donde hay vida.',
      ejemplo: 'Según el grado de intervención humana, un bosque o un desierto son ecosistemas <strong>naturales</strong>; una presa, un parque o un jardín son <strong>artificiales</strong>. Según su tamaño, una gota de agua o una maceta son <strong>microsistemas</strong>, mientras que el volcán Poás o el mar Caribe son <strong>macrosistemas</strong>.',
      aplicacion: 'Comprender estas clasificaciones ayuda a analizar, por ejemplo, por qué la protección de un ecosistema natural (como un manglar) tiene un valor distinto al de uno artificial (como un jardín), aunque ambos tengan seres vivos.',
      compruebra: '¿En qué categoría (medio, intervención humana, tamaño) clasificarías un arrecife de coral del Caribe costarricense?' },

    { id: 't5', icon: '⚠️', titulo: 'Amenazas a la biodiversidad',
      ideaClave: 'La biodiversidad enfrenta amenazas concretas: la contaminación, el cambio climático, la sobreexplotación y la destrucción del hábitat, muchas provocadas por actividades humanas.',
      explicacion: 'Entre las principales amenazas están la <strong>contaminación</strong> (incluida la eutrofización de cuerpos de agua, un problema que suele pasar inadvertido), el <strong>cambio climático</strong> (que puede destruir hábitats completos) y la <strong>sobreexplotación</strong> (caza, coleccionismo o sobrepesca). La Unión Internacional para la Conservación de la Naturaleza (IUCN) mantiene una "Lista Roja" con miles de especies amenazadas, aunque esta solo cubre una parte del problema real.',
      ejemplo: 'El derretimiento del hielo en los casquetes polares, causado por el calentamiento global, puede dejar sin hogar a especies como los osos polares o los pingüinos. En Indonesia, orangutanes son expulsados de su hábitat original por trabajadores de plantaciones. En Costa Rica, la finca Crucitas (San Carlos), rica en biodiversidad, se ha visto destruida por la extracción ilegal de oro.',
      aplicacion: 'Los "puntos calientes" de biodiversidad están especialmente amenazados por la gran demanda de madera tropical, la expansión de la minería y de monocultivos como la palma aceitera, la caña de azúcar y la soja.',
      compruebra: '¿Qué tienen en común la extracción ilegal de oro en Crucitas y la expansión de plantaciones en Indonesia, en cuanto a su efecto sobre la biodiversidad?' },

    { id: 't6', icon: '🛡️', titulo: 'Conservación de la biodiversidad',
      ideaClave: 'Proteger la biodiversidad requiere tanto políticas de conservación (como las áreas protegidas) como acciones responsables de cada persona.',
      explicacion: 'Costa Rica mantiene un sistema nacional de áreas silvestres protegidas que en 2015 cubría cerca de 2 855 973 hectáreas: 1 354 488 de sistemas terrestres (26,55%) y 1 501 485 de hábitats costeros y marinos (52,6%). A nivel individual, la ley tipifica como delito atrapar o matar ejemplares silvestres, o recolectar plantas y frutos sin autorización de las autoridades, precisamente porque esas acciones dañan la diversidad biológica.',
      ejemplo: 'Cada persona puede informarse de forma autónoma sobre proyectos que puedan perjudicar el entorno, y dar su opinión al respecto — una forma concreta de participación ciudadana en la conservación.',
      aplicacion: 'La conservación de la biodiversidad está directamente ligada a la idea de una sociedad sostenible: una que satisface sus necesidades actuales sin comprometer los recursos de otras especies ni de las generaciones futuras.',
      compruebra: '¿Qué acción concreta podrías proponer en tu centro educativo para contribuir al cuido de la biodiversidad?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "Clasificador de ecosistemas": 10 situaciones reales
     para clasificar por medio (Acuático / Terrestre / Aéreo). Mismo
     patrón exacto que Sim1 de bio10-u01.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Un arrecife de coral en el mar Caribe costarricense.', correcta: 'acuatico', explica: 'Es acuático: se encuentra en el mar, uno de los medios propios de este tipo de ecosistema.' },
    { texto: 'El cráter del volcán Poás, fuera del agua.', correcta: 'terrestre', explica: 'Es terrestre: se encuentra en la superficie continental, fuera del agua.' },
    { texto: 'Una parvada de aves que solo se posan en el aire para desplazarse, pero deben bajar a tierra para descansar y alimentarse.', correcta: 'aereo', explica: 'Es aéreo: es un ecosistema de transición — ningún organismo lo habita permanentemente.' },
    { texto: 'Un río de aguas cristalinas en Sarapiquí.', correcta: 'acuatico', explica: 'Es acuático: los ríos son uno de los ejemplos de este tipo de ecosistema.' },
    { texto: 'Un bosque nuboso en Monteverde.', correcta: 'terrestre', explica: 'Es terrestre: se encuentra en la superficie de los continentes, fuera del agua.' },
    { texto: 'Una laguna de agua dulce en el Refugio Caño Negro.', correcta: 'acuatico', explica: 'Es acuático: las lagunas son uno de los ejemplos citados de este tipo de ecosistema.' },
    { texto: 'Una zona rocosa de alta montaña, fuera del agua.', correcta: 'terrestre', explica: 'Es terrestre: se encuentra en la superficie continental.' },
    { texto: 'Un manglar en la costa del Pacífico.', correcta: 'acuatico', explica: 'Es acuático: los manglares están asociados a cuerpos de agua salada.' },
    { texto: 'Insectos voladores que deben descender a tierra para reproducirse, ya que el ecosistema aéreo no les resulta autosuficiente.', correcta: 'aereo', explica: 'Es aéreo: aunque vuelan, dependen de la tierra para funciones vitales — no lo habitan de forma permanente.' },
    { texto: 'El jardín de un centro educativo, fuera del agua.', correcta: 'terrestre', explica: 'Es terrestre: se encuentra en la superficie, fuera del agua (aunque, según el grado de intervención humana, también sería un ecosistema artificial).' }
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
          <button class="btn btn-ghost" data-sim1-opcion="acuatico">Acuático</button>
          <button class="btn btn-ghost" data-sim1-opcion="terrestre">Terrestre</button>
          <button class="btn btn-ghost" data-sim1-opcion="aereo">Aéreo</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de amenazas": 2 fases, mismo patrón
     exacto que Sim2 de bio10-u01.js — (A) explorar libremente 6 casos
     reales de amenaza citados en el libro, y (B) un quiz de 2ª fase
     donde MQC da el caso y el estudiante elige el tipo de amenaza.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'crucitas', nombre: '⛏️ Finca Crucitas', areas: 'Minería ilegal' },
    { id: 'orangutan', nombre: '🦧 Orangutanes de Indonesia', areas: 'Pérdida de hábitat por monocultivos' },
    { id: 'polar', nombre: '🐧 Casquetes polares', areas: 'Cambio climático' },
    { id: 'sobrepesca', nombre: '🐟 Sobrepesca oceánica', areas: 'Sobreexplotación' },
    { id: 'eutrofizacion', nombre: '💧 Eutrofización', areas: 'Contaminación' },
    { id: 'talamasiva', nombre: '🪓 Tala y quema masiva', areas: 'Deforestación' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'En la finca Crucitas, en San Carlos, personas extraen oro de forma ilegal, destruyendo un área rica en biodiversidad.', opciones: ['Minería ilegal', 'Sobrepesca', 'Cambio climático', 'Eutrofización'], correcta: 0 },
    { fenomeno: 'El derretimiento del hielo en los casquetes polares está dejando sin hogar a los osos polares y a los pingüinos.', opciones: ['Cambio climático', 'Minería ilegal', 'Sobreexplotación', 'Deforestación'], correcta: 0 },
    { fenomeno: 'Trabajadores de plantaciones en Indonesia expulsan a los orangutanes de lo que solía ser su hábitat natural.', opciones: ['Pérdida de hábitat por monocultivos', 'Sobrepesca', 'Cambio climático', 'Minería ilegal'], correcta: 0 },
    { fenomeno: 'Algunos expertos afirman que, en los próximos años, los océanos se pueden quedar sin recursos debido a la obtención de carne, el coleccionismo y la sobrepesca.', opciones: ['Sobreexplotación', 'Cambio climático', 'Minería ilegal', 'Deforestación'], correcta: 0 },
    { fenomeno: 'Un problema de contaminación en cuerpos de agua, que suele pasar inadvertido, favorece el crecimiento descontrolado de algas y reduce el oxígeno disponible.', opciones: ['Eutrofización', 'Sobrepesca', 'Minería ilegal', 'Cambio climático'], correcta: 0 },
    { fenomeno: 'La gran demanda de madera tropical impulsa la tala masiva de bosques en varios puntos calientes de biodiversidad.', opciones: ['Deforestación', 'Cambio climático', 'Eutrofización', 'Sobrepesca'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada caso real para ver qué tipo de amenaza representa.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el tipo de amenaza →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿Qué tipo de amenaza es esta?</p>
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
     SIMULADOR 3 — "Interpretando un índice de biodiversidad": escenario
     guiado en 2 pasos, mismo patrón exacto que Sim3 de bio10-u01.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: un grupo de estudiantes trazó dos transectos con 40 individuos cada uno. En un <strong>potrero ganadero</strong> encontraron solo 3 especies, dominadas casi por completo por una sola especie de pasto. En un <strong>bosque secundario</strong> cercano encontraron 12 especies, con los individuos bastante repartidos entre ellas.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> ¿en cuál de los dos sitios esperarías un índice de Simpson más cercano a 1 (mayor biodiversidad)?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="bosque">El bosque secundario</button>
            <button class="btn btn-ghost" data-sim3-opcion="potrero">El potrero ganadero</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ¿por qué el potrero tendría una dominancia (Σpi²) más alta que el bosque secundario?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="pocas">Porque pocas especies concentran la mayoría de los individuos</button>
            <button class="btn btn-ghost" data-sim3-opcion2="mas">Porque tiene más especies que el bosque secundario</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Un ecosistema dominado por pocas especies (como un potrero de pasto) tiene mayor dominancia y menor biodiversidad que uno con muchas especies bien repartidas (como un bosque secundario) — aunque ambos tengan el mismo número total de individuos.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js) ───────── */
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
     TEORÍA — 6 temas en acordeón. Mismo patrón exacto que bio10-u01.js.
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
     SIMULADORES — 3 experiencias. Mismo patrón exacto que bio10-u01.js.
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
      { id: 'sim1', titulo: '🌳 Clasificador de ecosistemas', desc: '10 situaciones reales para clasificar por su medio: Acuático, Terrestre o Aéreo.' },
      { id: 'sim2', titulo: '⚠️ Explorador de amenazas', desc: 'Explorá 6 casos reales de amenaza a la biodiversidad y después probá identificando vos mismo el tipo, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '📊 Interpretando un índice de biodiversidad', desc: 'Un escenario guiado paso a paso: comparar la biodiversidad de un potrero ganadero y un bosque secundario.' }
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'bosque';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el bosque secundario, con 12 especies repartidas, tendría un índice de Simpson más cercano a 1.'
            : '💡 En realidad es el bosque secundario: con 12 especies bien repartidas, su índice de Simpson estaría más cerca de 1 que el del potrero, dominado por una sola especie.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'pocas';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: cuando pocas especies concentran la mayoría de los individuos, el valor de Σpi² (dominancia) sube.'
            : '💡 En realidad es porque pocas especies concentran la mayoría de los individuos — eso es lo que eleva la dominancia (Σpi²), no el número de especies.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Guardián de la Biodiversidad": 5 escenarios reales, con
     pistas que orientan sin revelar la respuesta. Mismo patrón exacto
     que bio10-u01.js: SIN XP al solo iniciar un nivel, y game-won/
     game-played UNA sola vez por nivel (no por intento).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'En la finca Crucitas, en San Carlos, personas extraen oro de forma ilegal, destruyendo un área rica en biodiversidad.',
      pista: 'Pensá en la actividad extractiva, no agrícola, que se menciona.',
      correcta: 'Minería ilegal', opciones: ['Minería ilegal', 'Sobrepesca', 'Cambio climático', 'Eutrofización'] },
    { id: 'nivel2', escenario: 'El derretimiento del hielo en los casquetes polares está dejando sin hogar a los osos polares y a los pingüinos.',
      pista: 'Pensá en el fenómeno climático global, no en una actividad extractiva puntual.',
      correcta: 'Cambio climático', opciones: ['Cambio climático', 'Minería ilegal', 'Sobreexplotación', 'Deforestación'] },
    { id: 'nivel3', escenario: 'Trabajadores de plantaciones en Indonesia expulsan a los orangutanes de lo que solía ser su hábitat natural.',
      pista: 'Pensá en lo que ocurre cuando se talan bosques para sembrar un solo cultivo a gran escala.',
      correcta: 'Pérdida de hábitat por monocultivos', opciones: ['Pérdida de hábitat por monocultivos', 'Sobrepesca', 'Cambio climático', 'Minería ilegal'] },
    { id: 'nivel4', escenario: 'Algunos expertos afirman que, en los próximos años, los océanos se pueden quedar sin recursos debido a la obtención de carne, el coleccionismo y la sobrepesca.',
      pista: 'Pensá en extraer más recursos de los que un ecosistema puede reponer.',
      correcta: 'Sobreexplotación', opciones: ['Sobreexplotación', 'Cambio climático', 'Minería ilegal', 'Deforestación'] },
    { id: 'nivel5', escenario: 'Un problema de contaminación en cuerpos de agua, que suele pasar inadvertido, favorece el crecimiento descontrolado de algas y reduce el oxígeno disponible.',
      pista: 'Pensá en un tipo de contaminación del agua, no del aire.',
      correcta: 'Eutrofización', opciones: ['Eutrofización', 'Sobrepesca', 'Minería ilegal', 'Cambio climático'] }
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
        <h3 style="margin:0 0 .3rem">🛡️ Guardián de la Biodiversidad</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de amenaza es esta?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u02.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U02 !== 'undefined') ? PREGUNTAS_BIO10_U02 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U02</h3>
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
     MISIÓN FINAL — "Bajo la lupa: los perezosos de Costa Rica" (mismo
     patrón exacto que bio10-u01.js: awardXP('biologia10-mission-done')
     UNA sola vez, vía missionDone). Caso real: los perezosos de dos y
     tres dedos, con sus especies y datos reales tomados del libro.
     ================================================================ */
  const MISION_A_OPCIONES = ['Superorden Xenarthra', 'Orden Primates (como los monos)', 'Orden Carnívora (como los osos)', 'Parientes de los armadillos y los hormigueros'];
  const MISION_A_CORRECTAS = ['Superorden Xenarthra', 'Parientes de los armadillos y los hormigueros'];
  const MISION_B_OPCIONES = [
    'Choloepus hoffmanni (dos dedos) y Bradypus variegatus (tres dedos)',
    'Bradypus pygmaeus, exclusivo de Panamá',
    'Choloepus didactylus únicamente',
    'Ninguna especie de perezoso habita en Costa Rica'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Porque, aunque se parezcan entre sí, cada especie tiene diferencias (como el número de dedos o su distribución geográfica) que las distinguen como grupos reproductivos separados',
    'Porque todos los perezosos son genéticamente idénticos entre sí',
    'Porque la apariencia física es lo único que define una especie',
    'Porque en realidad todos pertenecen a la misma especie, solo con nombres distintos'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: los perezosos de Costa Rica".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🦥 Misión: Bajo la lupa — los perezosos de Costa Rica</h3>
        <p style="color:var(--text-secondary)">Especies a analizar: los perezosos de dos dedos (familia <em>Megalonychidae</em>) y de tres dedos (familia <em>Bradypodidae</em>), presentes en Costa Rica.</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿A qué grupo taxonómico pertenecen los perezosos? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cuáles especies de perezosos habitan en Costa Rica, según el libro?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Por qué la clasificación de los perezosos es un buen ejemplo del concepto de "especie"?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué la pérdida de hábitat (deforestación) representa una amenaza especialmente grave para los perezosos?</p>
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
     bio10-u01.js — ver biologia10.js) ─────────────────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
