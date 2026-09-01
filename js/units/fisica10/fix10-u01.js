/* ================================================================
   MÁSQUECIENCIA — js/units/fisica10/fix10-u01.js
   FIX10-U01 — La Física en el contexto histórico y actual
   ================================================================
   Contenido derivado y parafraseado del libro fuente "Física 10° —
   Un enfoque práctico" (Unidad I, Tema 1). Los 6 temas, el banco de
   50 preguntas y la misión final ya son contenido real. Las
   situaciones del juego "Detective de la Física" también son reales.

   Mismo patrón de plugin exacto que js/units/unit-01.js (Química) y
   js/units/grade11/g11-u01.js (con pestaña de Misión) — apunta a
   Storage.updateFisica10Unit / markFisica10TopicRead / data.fisica10,
   nunca a las funciones de Química. El estilo visual (acordeón de
   Teoría, tarjetas, botones) usa estilos en línea siguiendo el MISMO
   patrón exacto que unit-01.js — este proyecto no tiene clases CSS
   globales para estos componentes, así que hay que declarar el
   estilo directamente en cada plantilla, igual que ya hace Química.

   Incluye DESDE EL INICIO las protecciones anti-farming de XP que
   se corrigieron esta misma sesión en las 13 unidades de Química
   (tema releído, juego repetido, examen reaprobado — todas otorgan
   XP una sola vez, nunca en cada repetición).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix10-u01';
  const C = 'var(--violet)'; // color disciplinar de Física, mismo patrón que "C" en unit-01.js

  const TEMAS = [
    { id: 't1', icon: '🔭', titulo: '¿Qué es la Física?',
      texto: `La Física estudia las propiedades de la materia y la energía, sus transformaciones, y las fuerzas que actúan entre ellas. Es la ciencia que se ocupa de las leyes más básicas de la naturaleza: por qué cae un objeto, cómo se propaga la luz, qué hace que un imán atraiga a otro.<br><br>
      A diferencia de la Filosofía o la Religión, la Física exige que sus descubrimientos se sometan al método científico: se observa, se mide, se propone una explicación, y esa explicación se pone a prueba una y otra vez. Cuando una relación matemática logra predecir correctamente nuevas mediciones que todavía no se habían hecho, decimos que encontramos un <strong>modelo</strong> — y si ese modelo se confirma una y otra vez, puede llegar a llamarse una <strong>ley de la naturaleza</strong>.<br><br>
      Dentro de la Física hay físicos que se especializan en distintas áreas: quien estudia las partículas subatómicas es un <strong>físico nuclear</strong>; quien estudia la energía en las estrellas es un <strong>astrofísico</strong>; quien estudia las reacciones químicas desde su energía es un <strong>fisicoquímico</strong>. Todos comparten el mismo objetivo: entender las reglas por las que se rige el universo.` },

    { id: 't2', icon: '🔬', titulo: 'Física teórica y experimental',
      texto: `La Física se practica de dos maneras que se necesitan mutuamente. La <strong>física experimental</strong> mide con cuidado magnitudes reales — cuánto calor libera una reacción, cómo se desintegra una partícula — y confía en la observación directa. La <strong>física teórica</strong>, en cambio, busca relaciones matemáticas (modelos) que expliquen esas mediciones y permitan predecir otras nuevas.<br><br>
      Hay físicos brillantes en cada camino: <strong>Albert A. Michelson</strong> fue un físico experimental que inventó el interferómetro y midió la velocidad de la luz con una precisión extraordinaria para su época. <strong>Albert Einstein</strong>, en cambio, fue sobre todo un físico teórico: construyó la teoría de la relatividad casi enteramente con razonamiento matemático. Y hubo físicos como <strong>Enrico Fermi</strong> que dominaron ambos caminos a la vez, aportando tanto al desarrollo del primer reactor nuclear como a la teoría cuántica.<br><br>
      Ninguno de los dos caminos vale más que el otro: la ciencia avanza cuando una predicción teórica se contrasta con la observación o el experimento, y cuando una medición experimental encuentra un modelo que la explique.` },

    { id: 't3', icon: '⏱️', titulo: 'Del universo clásico a la relatividad',
      texto: `Durante siglos, el tiempo se consideró una magnitud absoluta: igual para todos, sin importar dónde estuvieran ni qué tan rápido se movieran. En 1905, Albert Einstein propuso la <strong>teoría especial de la relatividad</strong>, que cambió esa idea para siempre, a partir de dos postulados: (1) las leyes de la física son las mismas en cualquier sistema de referencia que se mueva a velocidad constante, y (2) la velocidad de la luz (c ≈ 3×10⁸ m/s) es siempre la misma para cualquier observador, sin importar qué tan rápido se mueva la fuente que la emite.<br><br>
      De ese segundo postulado se desprende algo muy extraño pero real: el <strong>tiempo pasa distinto</strong> según el movimiento del observador. A esto se le llama <strong>dilatación del tiempo</strong>. El ejemplo más conocido es la <strong>paradoja de los gemelos</strong>: si uno de dos hermanos gemelos viaja al espacio a una velocidad cercana a la de la luz y el otro se queda en la Tierra, al regresar el viajero habrá envejecido menos que su hermano.<br><br>
      Einstein no se detuvo ahí: en 1916 publicó la <strong>teoría general de la relatividad</strong>, donde explica la gravedad no como una fuerza, sino como la curvatura que la materia produce en el espacio-tiempo. La Tierra no gira alrededor del Sol "empujada" por una fuerza — simplemente sigue el camino más recto posible en un espacio-tiempo curvado por la masa del Sol.<br><br>
      Un ejemplo cotidiano y real de todo esto es el <strong>GPS</strong>: los satélites que orbitan la Tierra experimentan el tiempo de forma distinta que un receptor en la superficie (por su velocidad y por estar en un campo gravitatorio más débil). Si los ingenieros no corrigieran ese efecto usando la relatividad, el sistema GPS acumularía errores de varios kilómetros por día, y dejaría de ser útil casi de inmediato.<br><br>
      <em>Nota importante:</em> algunas ideas derivadas matemáticamente de la relatividad general, como los <strong>agujeros de gusano</strong> (túneles hipotéticos entre dos puntos del espacio-tiempo), son posibles según las ecuaciones pero <strong>nunca se han observado</strong> — son modelos teóricos, no hechos comprobados experimentalmente.` },

    { id: 't4', icon: '⚛️', titulo: 'Física moderna',
      texto: `A comienzos del siglo XX, los modelos de la física clásica (mecánica, electromagnetismo, termodinámica) dejaron de explicar ciertos fenómenos del mundo subatómico. De ahí nació la <strong>física moderna</strong>, que incluye la física cuántica, la física de partículas y la física relativista.<br><br>
      La <strong>física de partículas</strong> estudia los componentes más básicos del universo: 12 partículas elementales y 4 interacciones fundamentales (electromagnetismo, fuerza nuclear fuerte, fuerza nuclear débil y gravedad), cada una con su propia "partícula mediadora" (el fotón para el electromagnetismo, el glúon para la fuerza fuerte, etc.). Protones y neutrones, que alguna vez se creyeron elementales, en realidad están hechos de partículas más pequeñas llamadas <strong>quarks</strong>.<br><br>
      Una de las piezas más buscadas de este modelo fue el <strong>bosón de Higgs</strong>: la partícula asociada a un campo que llena todo el espacio y que es responsable de que otras partículas tengan masa. Se confirmó su existencia en 2012 gracias al <strong>LHC (Large Hadron Collider)</strong>, el acelerador de partículas más grande del mundo, ubicado en el <strong>CERN</strong> (frontera franco-suiza), donde se hacen chocar haces de protones a velocidades cercanas a la de la luz para recrear, por fracciones de segundo, condiciones similares a las del Big Bang.<br><br>
      La física cuántica también permite fenómenos sorprendentes, como la <strong>teletransportación cuántica</strong>: ya se ha logrado "teletransportar" el estado de partículas como fotones (nunca objetos complejos ni seres vivos) aprovechando una propiedad llamada entrelazamiento cuántico. Y en el terreno más especulativo, la <strong>teoría de cuerdas</strong> propone que las partículas elementales en realidad serían diminutos filamentos de energía en vibración — una idea matemáticamente atractiva, pero que todavía no se ha podido comprobar experimentalmente.` },

    { id: 't5', icon: '📍', titulo: '¿Dónde está la Física?',
      texto: `La Física no vive solo en un laboratorio — está detrás de casi cualquier fenómeno o tecnología que usamos a diario. Reconocer en qué área de la Física se ubica cada fenómeno ayuda a entender mejor cómo funciona el mundo.<br><br>
      La <strong>astrofísica</strong>, por ejemplo, aplica las leyes de la física al estudio de los astros: desde las leyes del movimiento planetario de Newton y Kepler, hasta la teoría del campo electromagnético de Maxwell, que permitió entender fenómenos como la luz de las estrellas o los agujeros negros (regiones donde ni siquiera la luz puede escapar, una vez que se cruza su "horizonte de sucesos").<br><br>
      La <strong>mecánica y la ingeniería</strong> aplican esas mismas leyes para diseñar soluciones tecnológicas reales: desde los acueductos de la antigua Roma hasta los rascacielos, puentes colgantes y satélites actuales. Un ingeniero necesita dominar la física, pero también la creatividad para resolver problemas con los recursos disponibles.<br><br>
      Fenómenos tan distintos como un GPS (relatividad + electromagnetismo), un puente colgante (mecánica), un láser en un consultorio médico (óptica y física cuántica) o un microscopio (óptica) tienen todos una explicación física detrás — solo hay que aprender a reconocer cuál.` },

    { id: 't6', icon: '🌐', titulo: 'Física, tecnología y sociedad',
      texto: `Comprender mejor las leyes de la naturaleza casi siempre termina transformando la vida cotidiana de la sociedad. Un buen ejemplo son los <strong>superconductores</strong>: materiales que, a temperaturas muy bajas, dejan pasar la corriente eléctrica sin ninguna resistencia y expulsan los campos magnéticos (efecto Meissner), lo que permite fenómenos como la levitación magnética. Esta propiedad ya se usa en generadores de energía más eficientes y en <strong>trenes maglev</strong>, que literalmente flotan sobre sus vías gracias a imanes superconductores.<br><br>
      La <strong>ingeniería</strong>, en todas sus ramas (civil, mecánica, eléctrica, biomédica), es la disciplina que convierte el conocimiento físico en soluciones reales para necesidades sociales, industriales o médicas — desde una prótesis hasta un puente.<br><br>
      Un ejemplo ambicioso de hacia dónde puede llevar la ingeniería y la física aplicadas es la <strong>exploración espacial</strong>: proyectos como "Mars One" plantearon el reto de enviar y sostener una colonia humana permanente en Marte, algo que exige resolver simultáneamente problemas de física, ingeniería, medicina y logística a una escala nunca antes intentada. Sea que estos proyectos concretos tengan éxito o no, muestran cómo la física impulsa a la sociedad a imaginar y perseguir metas cada vez más ambiciosas.<br><br>
      <strong>¿Cómo cambia la sociedad cuando comprendemos mejor las leyes de la naturaleza?</strong> Cada avance — del GPS a los superconductores — nació de entender un poco mejor cómo funciona realmente el universo.` }
  ];

  const SITUACIONES_SIM1 = [
    { texto: 'Un investigador mide con un termómetro de precisión cuánto calor libera una reacción química en el laboratorio.', correcta: 'experimental', explica: 'Es experimental: se basa en una medición directa y cuidadosa.' },
    { texto: 'Einstein dedujo, solo con razonamiento matemático y sin ningún experimento propio, que el tiempo se dilata a altas velocidades.', correcta: 'teorica', explica: 'Es teórica: la conclusión surgió de un modelo matemático, no de una medición directa.' },
    { texto: 'Michelson diseñó el interferómetro y lo usó para medir con altísima precisión la velocidad de la luz.', correcta: 'experimental', explica: 'Es experimental: consistió en construir un instrumento y tomar medidas reales.' },
    { texto: 'Un equipo del CERN hace chocar protones en el LHC y registra qué nuevas partículas aparecen tras la colisión.', correcta: 'ambas', explica: 'Es ambas: se diseña el experimento a partir de un modelo teórico (el Modelo Estándar) y luego se contrasta con datos reales.' },
    { texto: 'Un físico propone una fórmula matemática para predecir cómo se movería un planeta que todavía nadie ha observado.', correcta: 'teorica', explica: 'Es teórica: predice un resultado antes de cualquier observación.' },
    { texto: 'Un ingeniero mide cuántos microsegundos se atrasan los relojes de los satélites GPS respecto a un reloj en la Tierra.', correcta: 'experimental', explica: 'Es experimental: es una medición directa de un efecto real.' },
    { texto: 'Peter Higgs predijo en 1964, mediante ecuaciones, la existencia de una partícula que hoy conocemos como el bosón de Higgs.', correcta: 'teorica', explica: 'Es teórica: la predicción llegó casi 50 años antes de poder confirmarla experimentalmente.' },
    { texto: 'Un equipo de la Universidad Nacional Australiana logró teletransportar un rayo láser un metro de distancia y confirmó el resultado con instrumentos.', correcta: 'ambas', explica: 'Es ambas: la teletransportación cuántica se predijo teóricamente y luego se demostró con un experimento real.' },
    { texto: 'Kepler formuló las leyes del movimiento planetario basándose en años de observaciones astronómicas de Tycho Brahe.', correcta: 'ambas', explica: 'Es ambas: partió de datos observacionales reales para llegar a un modelo matemático general.' },
    { texto: 'Heike Kamerlingh Onnes observó que la resistencia eléctrica del mercurio desaparecía bruscamente al enfriarlo a 4 K.', correcta: 'experimental', explica: 'Es experimental: fue un hallazgo inesperado durante una medición real en el laboratorio.' }
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
          <button class="btn btn-ghost" data-sim1-opcion="teorica">Teórica</button>
          <button class="btn btn-ghost" data-sim1-opcion="experimental">Experimental</button>
          <button class="btn btn-ghost" data-sim1-opcion="ambas">Ambas</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "¿Dónde está la Física?" (rediseñado)
     ================================================================
     2 fases, tal como pide el sprint: (A) explorar libremente
     tocando cada tecnología para ver su área, y (B) MQC da el
     fenómeno y el estudiante elige el área — un quiz real, no solo
     un botón de revelar.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'gps', nombre: '📡 GPS', areas: 'Relatividad + Electromagnetismo' },
    { id: 'puente', nombre: '🌉 Puente colgante', areas: 'Mecánica' },
    { id: 'laser', nombre: '🔬 Láser quirúrgico', areas: 'Óptica + Física cuántica' },
    { id: 'microscopio', nombre: '🔍 Microscopio', areas: 'Óptica' },
    { id: 'tren', nombre: '🚄 Tren maglev', areas: 'Electromagnetismo (superconductores)' },
    { id: 'satelite', nombre: '🛰️ Satélite de comunicaciones', areas: 'Mecánica orbital + Electromagnetismo' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Un GPS calcula tu posición exacta comparando la hora de la señal de varios satélites, corrigiendo el retraso de sus relojes.', opciones: ['Relatividad + Electromagnetismo', 'Acústica', 'Termodinámica', 'Física de partículas'], correcta: 0 },
    { fenomeno: 'Un puente colgante distribuye el peso de los vehículos entre sus cables y torres, sin colapsar.', opciones: ['Mecánica', 'Óptica', 'Física cuántica', 'Astrofísica'], correcta: 0 },
    { fenomeno: 'Un tren se desliza sin tocar sus vías gracias a imanes que expulsan el campo magnético al enfriarse mucho.', opciones: ['Electromagnetismo (superconductores)', 'Acústica', 'Óptica', 'Mecánica exclusivamente'], correcta: 0 },
    { fenomeno: 'Un microscopio permite ver estructuras diminutas ampliando la trayectoria de la luz que las atraviesa.', opciones: ['Óptica', 'Relatividad', 'Termodinámica', 'Física de partículas'], correcta: 0 },
    { fenomeno: 'En el CERN, se hacen chocar protones a velocidades cercanas a la de la luz para estudiar partículas subatómicas.', opciones: ['Física de partículas', 'Acústica', 'Óptica geométrica', 'Mecánica clásica exclusivamente'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar'; // 'explorar' | 'quiz'
  let _sim2RondaIdx = 0;

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada tecnología para ver qué área(s) de la Física intervienen.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos la área →</button>
      </div>`;
  }
  function renderSim2Quiz() {
    if (_sim2RondaIdx >= RONDAS_SIM2.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste el simulador!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = RONDAS_SIM2[_sim2RondaIdx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Fase 2 — Ronda ${_sim2RondaIdx + 1} de ${RONDAS_SIM2.length}</p>
        <p style="margin-bottom:1rem">${r.fenomeno}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿Qué área de la Física interviene principalmente?</p>
        <div style="display:grid;gap:.5rem">
          ${r.opciones.map((op, i) => `<button class="btn btn-ghost" data-sim2q-opcion="${i}">${op}</button>`).join('')}
        </div>
        <p id="sim2q-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Cambia el observador" (rediseñado, guiado en 2
     pasos con un escenario concreto, en vez de un solo botón).
     ================================================================ */
  let _sim3Paso = 0; // 0 = intro, 1 = pregunta dentro del vehículo, 2 = pregunta desde la Tierra, 3 = cierre
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: dentro de un tren que viaja a velocidad constante, una persona lanza una pelota hacia arriba.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> para la persona que va DENTRO del tren, ¿cómo se ve el movimiento de la pelota?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="recta">Sube y baja en línea recta, como si el tren estuviera quieto</button>
            <button class="btn btn-ghost" data-sim3-opcion="curva">Sube y baja siguiendo una curva hacia atrás</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ahora, para alguien parado afuera, en el andén, viendo pasar el tren, ¿cómo se ve la misma pelota?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="recta">Sube y baja en línea recta, en el mismo punto</button>
            <button class="btn btn-ghost" data-sim3-opcion2="curva">Sube y baja, pero desplazándose hacia adelante junto con el tren</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:440px;margin:0 auto">Un mismo movimiento se describe distinto según el marco de referencia del observador — ninguna descripción es "más correcta" que la otra. Esta es la idea que Einstein usó como punto de partida para la relatividad especial.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que unit-01.js) ─────────── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().fisica10[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateFisica10Unit === 'function') {
      try { Storage.updateFisica10Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markFisica10TopicRead === 'function') {
      try { Storage.markFisica10TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }

  /* ================================================================
     TEORÍA — 6 temas en acordeón. FIX-XP-01 aplicado desde el inicio:
     XP solo la primera vez que se lee cada tema (topicsRead ya
     deduplica en Storage; acá solo se consulta antes de otorgar).
     ================================================================ */
  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const total = TEMAS.length;
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;

    const items = TEMAS.map((t, i) => {
      const isRead = leidos.includes(t.id);
      return `
        <div class="fix10-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="fix10-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">
              ${isRead ? '✓ leído' : ''}
            </span>
            <span class="fix10-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="fix10-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
            <p>${t.texto}</p>
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
      <div class="fix10-teoria" style="animation:pageIn .4s ease">
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
        const caret = btn.querySelector('.fix10-acc-caret');
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
        // FIX-XP-01 (aplicado desde el diseño): solo la primera vez.
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(temaId);
        markRead(temaId);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        const container = document.querySelector('.fix10-teoria').parentElement;
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        // Reabrir el mismo acordeón donde estaba el estudiante, para que
        // vea el cambio de estado sin perder su lugar.
        const i = btn.closest('[data-acc]').getAttribute('data-acc');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const head = document.querySelector(`[data-acc-toggle="${i}"] .fix10-acc-caret`);
        if (body) { body.style.display = 'block'; if (head) head.style.transform = 'rotate(180deg)'; }
      });
    });
  }

  /* ================================================================
     SIMULADORES — 3 experiencias STUB (markSimDone ya deduplica
     por diseño desde el patrón original de Química: solo la primera
     vez que se completa cada simulador otorga XP).
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
      { id: 'sim1', titulo: '🧪 Teoría o Experimento', desc: '10 situaciones reales para clasificar como Teórica, Experimental o Ambas.' },
      { id: 'sim2', titulo: '📡 ¿Dónde está la Física?', desc: 'Explorá 6 tecnologías y después probá identificando vos mismo el área correcta, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🚄 Cambia el observador', desc: 'Un escenario guiado paso a paso: la misma pelota, vista desde dentro y desde fuera de un tren.' }
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
        // Reiniciar el estado interno de cada simulador al entrar de nuevo.
        _sim1Idx = 0; _sim2Fase = 'explorar'; _sim2RondaIdx = 0; _sim3Paso = 0;
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

    /* Sim1 — Teoría o Experimento */
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

    /* Sim2 — Fase 1: explorar libremente */
    document.querySelectorAll('[data-sim2-el]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = ELEMENTOS_SIM2.find(x => x.id === btn.getAttribute('data-sim2-el'));
        const fb = document.getElementById('sim2-feedback');
        if (fb && el) fb.innerHTML = `<strong>${el.nombre}</strong> → ${el.areas}`;
      });
    });
    const irQuiz = document.getElementById('sim2-ir-quiz');
    if (irQuiz) irQuiz.addEventListener('click', () => { _sim2Fase = 'quiz'; _sim2RondaIdx = 0; _rerenderSimTab(unit); });

    /* Sim2 — Fase 2: quiz real (MQC da el fenómeno, el estudiante elige el área) */
    document.querySelectorAll('[data-sim2q-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-sim2q-opcion'), 10);
        const r = RONDAS_SIM2[_sim2RondaIdx];
        const fb = document.getElementById('sim2q-feedback');
        const ok = idx === r.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El área correcta era: ${r.opciones[r.correcta]}`;
        }
        setTimeout(() => {
          _sim2RondaIdx++;
          if (_sim2RondaIdx >= RONDAS_SIM2.length) markSimDone('sim2');
          _rerenderSimTab(unit);
        }, 1300);
      });
    });

    /* Sim3 — escenario guiado en 2 pasos */
    const sim3Sig = document.getElementById('sim3-siguiente');
    if (sim3Sig) sim3Sig.addEventListener('click', () => { _sim3Paso = 1; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-sim3-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback');
        const correcta = btn.getAttribute('data-sim3-opcion') === 'recta';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: para quien viaja DENTRO del tren, este está "quieto" — la pelota sube y baja igual que si el tren no se moviera.'
            : '💡 En realidad, para quien va DENTRO del tren, este se siente quieto — la pelota sube y baja en línea recta, sin curvarse.';
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
            ? '✅ Correcto: para quien la ve desde el andén, la pelota sube y baja MIENTRAS avanza junto con el tren — su trayectoria se ve curva, no recta.'
            : '💡 En realidad, desde afuera se ve que la pelota avanza junto con el tren mientras sube y baja — su trayectoria se ve curva, no recta.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de la Física": 5 escenarios reales, con pistas
     que orientan sin revelar la respuesta. Mismo patrón corregido que
     unit-01.js: SIN XP al solo iniciar un nivel, y game-won/game-played
     UNA sola vez por nivel (no por intento).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un puente colgante que soporta el paso de cientos de vehículos por día.', pista: 'Pensá en qué disciplina se encarga de diseñar estructuras que resistan fuerzas y peso.', area: 'Mecánica / Ingeniería' },
    { id: 'nivel2', escenario: 'Un teléfono que puede indicar tu ubicación exacta en cualquier parte del planeta.', pista: 'Pensá en cómo varios satélites, con relojes muy precisos, permiten calcular una posición.', area: 'Relatividad + Electromagnetismo' },
    { id: 'nivel3', escenario: 'Un láser capaz de realizar cirugías oculares con precisión milimétrica.', pista: 'Pensá en cómo se puede concentrar luz de una manera muy controlada.', area: 'Óptica + Física cuántica' },
    { id: 'nivel4', escenario: 'Un tren que se desliza sin tocar sus vías, casi sin fricción.', pista: 'Pensá en qué materiales especiales expulsan los campos magnéticos al enfriarse mucho.', area: 'Electromagnetismo (superconductores)' },
    { id: 'nivel5', escenario: 'Un experimento que hace chocar partículas a velocidades cercanas a la de la luz para recrear condiciones del universo temprano.', pista: 'Pensá en el laboratorio europeo donde se confirmó la existencia del bosón de Higgs.', area: 'Física de partículas' }
  ];
  function renderJuego(unit, uData) {
    const nivelesHechos = uData.gameLevels || [];
    return `
      <div class="juego-panel">
        <h3>🔎 Misión: Detective de la Física</h3>
        <p style="color:var(--text-secondary);font-size:.85rem">Leé cada escenario y descubrí qué área de la Física está detrás.</p>
        <div style="display:grid;gap:.8rem;margin-top:1rem">
          ${NIVELES_JUEGO.map((n, i) => `
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem">
              <p style="margin:0 0 .4rem"><strong>${n.escenario}</strong></p>
              <p style="color:var(--text-muted);font-size:.82rem">💡 ${n.pista}</p>
              ${nivelesHechos.includes(n.id) ? `<p style="color:var(--green);font-size:.85rem;margin-top:.4rem">✅ ${n.area}</p>` : `<button class="btn btn-primary btn-sm" data-nivel="${n.id}">Revelar área de la Física</button>`}
            </div>
          `).join('')}
        </div>
      </div>`;
  }
  function bindJuego(unit, uData) {
    document.querySelectorAll('[data-nivel]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nivelId = btn.getAttribute('data-nivel');
        const u = loadUnitData();
        const done = Array.isArray(u.gameLevels) ? u.gameLevels.slice() : [];
        const yaResuelto = done.includes(nivelId);
        if (!yaResuelto) done.push(nivelId);
        patchUnit({ gameLevels: done, gameScore: done.length });
        if (!yaResuelto) awardXP(done.length >= NIVELES_JUEGO.length ? 'game-won' : 'game-played');
        const fresh = loadUnitData();
        const container = document.querySelector('.juego-panel').parentElement;
        container.innerHTML = renderJuego(unit, fresh);
        bindJuego(unit, fresh);
      });
    });
  }

  /* ================================================================
     EXAMEN — banco provisional (js/data/banco-fix10-u01.js). FIX-XP-03
     aplicado desde el inicio: XP solo la primera vez que se aprueba.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX10_U01 !== 'undefined') ? PREGUNTAS_FIX10_U01 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX10-U01</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 30 al azar.</p>
        <button class="btn btn-primary" id="fix10-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('fix10-iniciar-examen');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const banco = _bancoDisponible().slice();
        for (let i = banco.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [banco[i], banco[j]] = [banco[j], banco[i]]; }
        const seleccionadas = banco.slice(0, Math.min(30, banco.length));
        // Mezclar las OPCIONES de cada pregunta (todas venían con la
        // correcta en la posición 0 en el banco fuente) — sin esto,
        // "elegí siempre la primera opción" sería una estrategia ganadora.
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
        if (idx === q.correcta) _examEnCurso.correctas++;
        _examEnCurso.i++;
        if (_examEnCurso.i >= _examEnCurso.preguntas.length) _finalizarExamen(unit);
        else _rerenderExamen(unit);
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
    // FIX-XP-03 (aplicado desde el diseño): XP solo la primera vez que se aprueba.
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
          <button class="btn btn-primary" id="fix10-volver-examen">Volver</button>
        </div>`;
      const b = document.getElementById('fix10-volver-examen');
      if (b) b.addEventListener('click', () => _rerenderExamen(unit));
    }
  }

  /* ================================================================
     MISIÓN FINAL — "Tecnología bajo la lupa" (mismo patrón g11-u01.js:
     awardXP('fisica10-mission-done') UNA sola vez, vía missionDone).
     ================================================================ */
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Tecnología bajo la lupa".</p></div>`;
    }
    return `
      <div style="max-width:560px">
        <h3>🔎 Misión: Tecnología bajo la lupa</h3>
        <p style="color:var(--text-secondary)">Tecnología a analizar: <strong>el GPS</strong>. Respondé, con tus propias palabras, apoyándote en lo que viste en esta unidad:</p>
        <ol style="color:var(--text-secondary);font-size:.9rem;line-height:1.8">
          <li>¿Qué área(s) de la Física intervienen en el funcionamiento del GPS?</li>
          <li>¿Qué fenómeno físico permite que un GPS calcule tu ubicación?</li>
          <li>¿Por qué fueron necesarias tanto la Física teórica (relatividad) como la experimental (mediciones satelitales) para desarrollarlo?</li>
          <li>¿Qué impacto tecnológico y social tiene el GPS hoy en día?</li>
        </ol>
        <button class="btn btn-primary" id="fix10-entregar-mision">Entregar misión</button>
      </div>`;
  }
  function bindMision(unit, uData) {
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        patchUnit({ missionDone: true });
        awardXP('fisica10-mission-done');
        const tc = document.getElementById('tab-content');
        if (tc) tc.innerHTML = renderMision(unit, loadUnitData());
      });
    }
  }

  /* ── Registro en el sistema de pestañas (mismo mecanismo que
     unit-01.js / g11-u01.js — ver grade11.js/fisica10.js) ────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
