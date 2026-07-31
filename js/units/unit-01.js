/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/units/unit-01.js  |  UNIDAD I — La Materia y su Clasificación
   ================================================================
   SECCIÓN: Plugin de contenido de la Unidad I
   DESCRIPCIÓN: Primer "consumidor" del sistema de plugins definido en
                js/modules/units.js. Registra renderizadores para los
                tabs de la Unidad I:
                  · unit-01:teoria       → teoría completa (8 temas)
                  · unit-01:simuladores  → 3 simuladores interactivos
                  · unit-01:examen       → motor de examen con feedback
   PARA AGREGAR: clonar este archivo como unit-02.js, cambiar el id de
                 unidad y registrar nuevos plugins. No se toca el core.
   DEPENDE DE (todas con acceso defensivo, no rompe si faltan):
                 window.UNIT_PLUGINS  (creado por units.js)
                 Storage, Gamification, Router, PREGUNTAS_U01
   ÚLTIMA MODIFICACIÓN: FASE 1A
   AUTOR: Lic. Bryan Chavarría C.
   ----------------------------------------------------------------
   ORDEN DE CARGA (index.html): este archivo va DESPUÉS de units.js
   y DESPUÉS de preguntas-u01.js.
================================================================ */

(function () {
  'use strict';

  /* El host (units.js) ya creó este objeto; lo aseguramos por si acaso. */
  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};

  const UNIT_ID = 'unit-01';

  /* ── Accesos defensivos a las APIs del core ─────────────────── */
  /* NOTA: Storage, Gamification y Router son const globales "desnudos"
     (no window.X). Se comprueban con typeof para no lanzar ReferenceError
     si algún archivo aún no cargó. */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) { /* silencioso */ }
    }
    /* EOP-020: puente hacia La Curiosidad — traduce fuentes de XP que
       ya existen a un estado del Fotón, sin tocar photon.js (API
       congelada) ni la lógica de XP. Nunca bloquea si Photon no está
       cargado. */
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-highscore':'game-won'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.load === 'function') {
      try { return Storage.load().units[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateUnit === 'function') {
      try { Storage.updateUnit(UNIT_ID, update); } catch (e) { /* silencioso */ }
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markTopicRead === 'function') {
      try { Storage.markTopicRead(UNIT_ID, topicId); } catch (e) { /* silencioso */ }
    }
  }
  function toast(msg) {
    /* Toast manual de respaldo (gamification ya muestra el suyo para XP). */
    const c = document.getElementById('toast-container');
    if (c) {
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = msg;
      c.appendChild(t);
      setTimeout(() => t.remove(), 3200);
    }
  }

  /* Registra un simulador como completado sin pisar el array existente. */
  function markSimDone(simId, score) {
    const uData = loadUnitData();
    const done  = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      /* Claves reales de gamification.js: 'simulator-done' (50) / 'simulator-perfect' (80) */
      awardXP(score >= 100 ? 'simulator-perfect' : 'simulator-done');
    }
  }

  /* ============================================================
     1) TEORÍA — 8 temas con contenido completo (MEP 10°)
     Cada tema usa id "unit-01-topic-<i>" para mantener la
     compatibilidad con Storage.markTopicRead y getUnitProgress.
  ============================================================ */

  const C = '#00BCD4'; /* cian — color temático de la Unidad I (Identidad v2.0) */

  /* Caja de ayuda visual reutilizable dentro de la teoría */
  function box(titulo, cuerpo, color) {
    color = color || C;
    return `
      <div style="border-left:4px solid ${color};background:var(--bg-elevated);
                  border-radius:0 var(--radius-md) var(--radius-md) 0;
                  padding:.75rem 1rem;margin:.75rem 0">
        <strong style="color:${color};font-size:.85rem;display:block;margin-bottom:.25rem">${titulo}</strong>
        <span style="font-size:.9rem;color:var(--text-secondary);line-height:1.6">${cuerpo}</span>
      </div>`;
  }

  const TEORIA = [
    {
      titulo: 'La materia y sus propiedades',
      icon: '🧱',
      html: `
        <p>La <strong>materia</strong> es todo aquello que tiene <strong>masa</strong> y ocupa un
        <strong>volumen</strong> en el espacio. Desde una estrella hasta el aire que respiras: todo es materia.</p>
        ${box('Masa vs. volumen',
          'La <em>masa</em> mide la cantidad de materia (kg, g). El <em>volumen</em> mide el espacio que ocupa (m³, L, cm³).')}
        <p>Las propiedades de la materia se clasifican en:</p>
        <ul style="margin:.5rem 0 .5rem 1.1rem;line-height:1.7;color:var(--text-secondary);font-size:.9rem">
          <li><strong>Generales</strong> (comunes a toda la materia): masa, volumen, peso, inercia.</li>
          <li><strong>Específicas</strong> (identifican a una sustancia): densidad, punto de fusión, punto de ebullición, color, dureza.</li>
        </ul>
        ${box('Extensivas e intensivas',
          'Las <em>extensivas</em> dependen de la cantidad (masa, volumen). Las <em>intensivas</em> no (densidad, temperatura de ebullición): por eso sirven para identificar sustancias.')}
        ${box('Fórmula clave — Densidad', 'd = m / V &nbsp; (g/cm³). Ej.: 60 g en 20 cm³ → d = 3 g/cm³.', 'var(--gold)')}`
    },
    {
      titulo: 'Estados de la materia y cambios de estado',
      icon: '🌡️',
      html: `
        <p>La materia se presenta principalmente en tres estados, según cómo estén unidas sus partículas:</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.6rem;margin:.75rem 0">
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem">
            <strong style="color:${C}">🧊 Sólido</strong>
            <p style="font-size:.82rem;color:var(--text-muted);margin-top:.25rem">Partículas juntas y ordenadas. Forma y volumen fijos.</p>
          </div>
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem">
            <strong style="color:${C}">💧 Líquido</strong>
            <p style="font-size:.82rem;color:var(--text-muted);margin-top:.25rem">Partículas unidas pero móviles. Volumen fijo, forma del recipiente.</p>
          </div>
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem">
            <strong style="color:${C}">💨 Gaseoso</strong>
            <p style="font-size:.82rem;color:var(--text-muted);margin-top:.25rem">Partículas separadas y rápidas. Sin forma ni volumen fijos; se comprime.</p>
          </div>
        </div>
        <p><strong>Cambios de estado</strong> (al ganar o ceder calor):</p>
        <ul style="margin:.5rem 0 .5rem 1.1rem;line-height:1.7;color:var(--text-secondary);font-size:.9rem">
          <li><strong>Fusión</strong>: sólido → líquido &nbsp;•&nbsp; <strong>Solidificación</strong>: líquido → sólido</li>
          <li><strong>Vaporización</strong>: líquido → gas &nbsp;•&nbsp; <strong>Condensación</strong>: gas → líquido</li>
          <li><strong>Sublimación</strong>: sólido → gas &nbsp;•&nbsp; <strong>Deposición</strong>: gas → sólido</li>
        </ul>
        ${box('Dato clave',
          'Mientras una sustancia pura cambia de estado, su <strong>temperatura permanece constante</strong>: el calor se usa para separar partículas, no para calentar.')}`
    },
    {
      titulo: 'Propiedades físicas y químicas',
      icon: '🔎',
      html: `
        <p>Las propiedades de la materia se observan o miden de dos maneras distintas:</p>
        ${box('Propiedades físicas',
          'Se observan o miden <strong>sin cambiar la composición</strong> de la sustancia: color, olor, densidad, dureza, punto de fusión, conductividad, solubilidad.')}
        ${box('Propiedades químicas',
          'Describen cómo una sustancia <strong>se transforma en otra</strong>: inflamabilidad, capacidad de oxidarse, reactividad con ácidos, poder de combustión.', 'var(--orange)')}
        <p style="font-size:.9rem;color:var(--text-secondary)">Regla práctica: si para observar la propiedad debes <em>destruir o transformar</em> la sustancia, es <strong>química</strong>; si no, es <strong>física</strong>.</p>`
    },
    {
      titulo: 'Cambios físicos y cambios químicos',
      icon: '⚗️',
      html: `
        <p>Un <strong>cambio físico</strong> altera la apariencia o el estado, pero la sustancia <strong>sigue siendo la misma</strong> (suele ser reversible).</p>
        ${box('Ejemplos de cambio físico', 'Derretir hielo, cortar papel, disolver azúcar, doblar un alambre, evaporar agua.')}
        <p>Un <strong>cambio químico</strong> forma <strong>sustancias nuevas</strong> con propiedades distintas (suele ser irreversible).</p>
        ${box('Señales de cambio químico',
          'Cambio de color permanente, formación de gas (burbujeo), aparición de un sólido (precipitado), liberación de luz o calor, olor nuevo.', 'var(--orange)')}
        ${box('Ejemplos de cambio químico',
          'Quemar madera, oxidar el hierro (herrumbre), digerir alimentos, fermentar, cocinar un huevo.', 'var(--orange)')}`
    },
    {
      titulo: 'Clasificación de la materia: sustancias puras',
      icon: '💎',
      html: `
        <p>La materia se clasifica primero en <strong>sustancias puras</strong> y <strong>mezclas</strong>.
        Una <strong>sustancia pura</strong> tiene composición y propiedades constantes. Se divide en:</p>
        ${box('Elementos',
          'Formados por un <strong>solo tipo de átomo</strong>. No se descomponen por métodos químicos. Ej.: oro (Au), oxígeno (O₂), hierro (Fe).')}
        ${box('Compuestos',
          'Dos o más elementos <strong>combinados químicamente</strong> en proporción fija. Sí se descomponen en sus elementos. Ej.: agua (H₂O), sal (NaCl), CO₂.', 'var(--violet)')}
        ${box('Diferencia esencial',
          'Un compuesto es una sustancia pura (combinación química, proporción fija). Una mezcla es una unión <strong>física</strong>, en cualquier proporción, separable por métodos físicos.', 'var(--gold)')}`
    },
    {
      titulo: 'Mezclas: homogéneas, heterogéneas y coloides',
      icon: '🥤',
      html: `
        <p>Una <strong>mezcla</strong> combina dos o más sustancias sin reacción química. Se clasifican por su aspecto:</p>
        ${box('Mezclas homogéneas (soluciones)',
          'Una sola fase uniforme; los componentes <strong>no se distinguen</strong> a simple vista. Ej.: agua con sal, aire, bronce, acero.')}
        ${box('Mezclas heterogéneas',
          'Se distinguen dos o más fases o componentes. Ej.: agua con aceite, ensalada, granito, agua con arena.', 'var(--orange)')}
        ${box('Coloides — un caso intermedio',
          'Partículas de tamaño intermedio quedan dispersas (no disueltas). Presentan el <strong>efecto Tyndall</strong>: dispersan un haz de luz que los atraviesa. Ej.: leche, gelatina, niebla, mayonesa, humo.', 'var(--green)')}`
    },
    {
      titulo: 'Métodos de separación de mezclas',
      icon: '🧲',
      html: `
        <p>Como en una mezcla las sustancias conservan sus propiedades, podemos separarlas por
        <strong>métodos físicos</strong>, eligiendo según esa propiedad que las diferencia:</p>
        <div style="overflow-x:auto;margin:.5rem 0">
        <table style="width:100%;border-collapse:collapse;font-size:.84rem;min-width:420px">
          <thead><tr style="text-align:left;color:${C}">
            <th style="padding:.4rem .5rem;border-bottom:1px solid var(--border)">Método</th>
            <th style="padding:.4rem .5rem;border-bottom:1px solid var(--border)">Separa…</th>
          </tr></thead>
          <tbody style="color:var(--text-secondary)">
            <tr><td style="padding:.4rem .5rem"><strong>Filtración</strong></td><td style="padding:.4rem .5rem">Sólido insoluble de un líquido (arena/agua)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Decantación</strong></td><td style="padding:.4rem .5rem">Líquidos inmiscibles o sólido sedimentado (agua/aceite)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Evaporación / Cristalización</strong></td><td style="padding:.4rem .5rem">Soluto disuelto de su disolvente (sal del agua)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Destilación</strong></td><td style="padding:.4rem .5rem">Líquidos miscibles por punto de ebullición (agua/alcohol)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Cromatografía</strong></td><td style="padding:.4rem .5rem">Componentes de una mezcla por velocidad de avance (tintas)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Imantación</strong></td><td style="padding:.4rem .5rem">Material magnético del resto (hierro/arena)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Tamizado</strong></td><td style="padding:.4rem .5rem">Sólidos de distinto tamaño (arena/grava)</td></tr>
            <tr><td style="padding:.4rem .5rem"><strong>Centrifugación</strong></td><td style="padding:.4rem .5rem">Fases por densidad usando giro rápido (sangre)</td></tr>
          </tbody>
        </table></div>
        ${box('Estrategia',
          'En mezclas complejas se aplican varios métodos en orden. Ej. hierro + arena + sal en agua: imantación → filtración → evaporación.', 'var(--gold)')}`
    },
    {
      titulo: 'Sustancias naturales y sintéticas',
      icon: '🌿',
      html: `
        <p>Según su origen, las sustancias pueden ser:</p>
        ${box('Naturales', 'Se encuentran en la naturaleza sin intervención humana: agua, oxígeno, oro, celulosa, minerales.')}
        ${box('Sintéticas', 'Se fabrican artificialmente en la industria: plásticos, nylon, fármacos, fertilizantes, muchos colorantes.', 'var(--violet)')}
        ${box('Mirada ambiental',
          'Muchas sustancias sintéticas (plásticos, agroquímicos) tardan en degradarse y generan contaminación. La química busca alternativas más sostenibles (química verde).', 'var(--green)')}`
    }
  ];

  /* ============================================================
     FASE 1.5 — Enriquecimiento de la teoría con sistemas compartidos
     (glosario, imágenes, videos, referencias cruzadas y ayudas).
     Es el patrón que heredarán todas las unidades.
  ============================================================ */

  /* Pistas de estudio por tema (ayudas progresivas reutilizables) */
  const TOPIC_HINTS = {
    1: ['Piensa en qué tan juntas están las partículas en cada estado.',
        'A 0 °C ocurre la fusión; a 100 °C, la ebullición del agua.'],
    5: ['¿Se distinguen los componentes a simple vista? Entonces es heterogénea.',
        'Si dispersa la luz (efecto Tyndall) pero parece uniforme, es un coloide.'],
    6: ['Identifica primero qué propiedad diferencia a los componentes.',
        'Esa propiedad (tamaño, densidad, magnetismo, punto de ebullición) decide el método.']
  };

  /* Enriquece el HTML de un tema: glosario + imagen + video + referencias */
  function enrichTeoria(html, i) {
    let out = (typeof Glossary !== 'undefined') ? Glossary.highlight(html) : html;
    /* Imagen del tema (si está declarada; si no existe el archivo → placeholder) */
    if (typeof UnitAssets !== 'undefined' && UnitAssets.get(UNIT_ID, 'topic-' + i)) {
      out = UnitAssets.img(UNIT_ID, 'topic-' + i, { caption: UnitAssets.get(UNIT_ID, 'topic-' + i).alt }) + out;
    }
    /* Videos del tema (preparado; muestra "próximamente" si aún no hay) */
    if (typeof UnitMedia !== 'undefined') {
      const v = UnitMedia.render(UNIT_ID, 'topic-' + i);
      if (v) out += v;
    }
    /* Referencias cruzadas del tema */
    if (typeof CrossRef !== 'undefined') {
      out += CrossRef.renderChips(UNIT_ID, 'teoria:topic-' + i);
    }
    return out;
  }

  /* ── Render del tab TEORÍA ──────────────────────────────────── */
  function renderTeoria(unit, uData) {
    const read = (uData && uData.topicsRead) ? uData.topicsRead : [];
    const total = TEORIA.length;
    const leidos = TEORIA.filter((_, i) => read.includes(`${UNIT_ID}-topic-${i}`)).length;

    const items = TEORIA.map((t, i) => {
      const tid = `${UNIT_ID}-topic-${i}`;
      const isRead = read.includes(tid);
      return `
        <div class="u1-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="u1-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">
              ${isRead ? '✓ leído' : ''}
            </span>
            <span class="u1-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="u1-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.65">
            ${enrichTeoria(t.html, i)}
            <div class="qi-hints-host" data-topic="${i}"></div>
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" data-read="${i}" ${isRead ? 'disabled' : ''}>
                ${isRead ? '✓ Tema leído' : '📖 Marcar como leído (+15 XP)'}
              </button>
              ${isRead ? '<span style="font-size:.78rem;color:var(--green)">¡Bien! XP otorgado.</span>' : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="u1-teoria" style="animation:pageIn .4s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;
                    flex-wrap:wrap;gap:.5rem;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">
            Lee cada tema y márcalo como leído para ganar XP y avanzar tu progreso de la unidad.
          </p>
          <span style="font-family:var(--font-code);font-size:.8rem;color:${C};
                       background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">
            ${leidos}/${total} leídos
          </span>
        </div>
        ${items}
      </div>`;
  }

  function bindTeoria(unit, uData) {
    const container = document.getElementById('tab-content');
    if (!container) return;

    /* Abrir / cerrar acordeones */
    container.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-acc-toggle');
        const body = container.querySelector(`[data-acc-body="${i}"]`);
        const caret = btn.querySelector('.u1-acc-caret');
        const open = body.style.display === 'block';
        body.style.display = open ? 'none' : 'block';
        if (caret) caret.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });

    /* Marcar tema como leído */
    container.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-read');
        const tid = `${UNIT_ID}-topic-${i}`;
        markRead(tid);
        awardXP('topic-read');   /* gamification.js ya muestra el toast "+15 XP" */
        /* Re-render del tab manteniendo el acordeón abierto */
        const fresh = loadUnitData();
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const reopened = container.querySelector(`[data-acc-body="${i}"]`);
        if (reopened) reopened.style.display = 'block';
      });
    });
    /* FASE 1.5 — Ayudas progresivas en los temas que las tengan */
    if (typeof Hints !== 'undefined') {
      container.querySelectorAll('.qi-hints-host').forEach(host => {
        const ti = host.getAttribute('data-topic');
        const hs = TOPIC_HINTS[ti];
        if (hs && hs.length) Hints.attach(host, hs, { label: '💡 Pista para entender este tema' });
      });
    }
  }

  /* ============================================================
     2) SIMULADORES — 3 simuladores interactivos autónomos
  ============================================================ */

  /* Marco común: muestra la lista de simuladores como tarjetas */
  function renderSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];
    const SIMS = [
      { id: 'sim-01-01', icon: '🧪', name: 'Clasificador de la Materia', desc: 'Decide si cada muestra es elemento, compuesto o mezcla.' },
      { id: 'sim-01-02', icon: '🌡️', name: 'Estados de la Materia',     desc: 'Mueve la temperatura y observa a las partículas cambiar de estado.' },
      { id: 'sim-01-03', icon: '🧲', name: 'Métodos de Separación',      desc: 'Elige el método correcto para separar cada mezcla.' }
    ];
    const cards = SIMS.map(s => `
      <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;
                  background:var(--bg-card);border:1px solid var(--border);
                  border-left:3px solid ${done.includes(s.id) ? 'var(--green)' : C};
                  border-radius:var(--radius-md);margin-bottom:.6rem">
        <span style="font-size:2rem;flex-shrink:0">${s.icon}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:.95rem;color:var(--text-primary)">${s.name}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">${s.desc}</div>
          ${done.includes(s.id) ? '<div style="font-size:.74rem;color:var(--green);margin-top:.2rem">✓ Completado</div>' : ''}
        </div>
        <button class="btn btn-primary btn-sm" data-open-sim="${s.id}">▶ Abrir</button>
      </div>`).join('');

    return `
      <div class="u1-sims" style="animation:pageIn .4s ease">
        <p style="color:var(--text-secondary);font-size:.9rem;margin-bottom:1rem">
          Tres simuladores interactivos para practicar la clasificación de la materia. Cada uno otorga XP al completarse.
        </p>
        <div id="u1-sim-host">${cards}</div>
      </div>`;
  }

  function bindSimuladores(unit, uData) {
    const container = document.getElementById('tab-content');
    if (!container) return;
    container.querySelectorAll('[data-open-sim]').forEach(btn => {
      btn.addEventListener('click', () => openSimulator(btn.getAttribute('data-open-sim')));
    });
  }

  /* Abre un simulador dentro del host, con botón de regreso */
  function openSimulator(simId) {
    const host = document.getElementById('u1-sim-host');
    if (!host) return;
    host.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="u1-sim-back" style="margin-bottom:.75rem">← Volver a simuladores</button>
      <div id="u1-sim-stage"></div>`;
    document.getElementById('u1-sim-back').addEventListener('click', () => {
      const fresh = loadUnitData();
      const container = document.getElementById('tab-content');
      container.innerHTML = renderSimuladores(null, fresh);
      bindSimuladores(null, fresh);
    });
    const stage = document.getElementById('u1-sim-stage');
    if (simId === 'sim-01-01') simClasificador(stage);
    else if (simId === 'sim-01-02') simEstados(stage);
    else if (simId === 'sim-01-03') simSeparacion(stage);
  }

  /* ── SIM 01-01: Clasificador de la Materia ──────────────────── */
  function simClasificador(stage) {
    const SAMPLES = [
      { n: 'Oxígeno (O₂)',        ans: 'elemento'  },
      { n: 'Agua pura (H₂O)',     ans: 'compuesto' },
      { n: 'Agua con sal',        ans: 'homogenea' },
      { n: 'Agua con aceite',     ans: 'heterogenea' },
      { n: 'Oro (Au)',            ans: 'elemento'  },
      { n: 'Dióxido de carbono',  ans: 'compuesto' },
      { n: 'Aire limpio',         ans: 'homogenea' },
      { n: 'Ensalada de frutas',  ans: 'heterogenea' }
    ];
    let idx = 0, score = 0, answered = false;
    const LABELS = {
      elemento: 'Elemento', compuesto: 'Compuesto',
      homogenea: 'Mezcla homogénea', heterogenea: 'Mezcla heterogénea'
    };

    function draw() {
      const s = SAMPLES[idx];
      stage.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
          <div style="font-size:.78rem;color:var(--text-muted);font-family:var(--font-code)">
            Muestra ${idx + 1} de ${SAMPLES.length} · Aciertos: ${score}
          </div>
          <div style="font-size:1.6rem;font-weight:800;color:${C};margin:.8rem 0 1rem">${s.n}</div>
          <p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:1rem">¿Cómo se clasifica esta muestra?</p>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;max-width:420px;margin:0 auto">
            ${['elemento', 'compuesto', 'homogenea', 'heterogenea'].map(k =>
              `<button class="btn btn-ghost" data-ans="${k}" style="font-size:.85rem">${LABELS[k]}</button>`).join('')}
          </div>
          <div id="u1c-fb" style="min-height:2.4rem;margin-top:1rem;font-size:.88rem"></div>
          <div id="u1c-next"></div>
        </div>`;
      stage.querySelectorAll('[data-ans]').forEach(b => {
        b.addEventListener('click', () => choose(b.getAttribute('data-ans')));
      });
    }
    function choose(k) {
      if (answered) return;
      answered = true;
      const s = SAMPLES[idx];
      const ok = k === s.ans;
      if (ok) score++;
      stage.querySelectorAll('[data-ans]').forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-ans') === s.ans) b.style.borderColor = 'var(--green)';
        if (b.getAttribute('data-ans') === k && !ok) b.style.borderColor = 'var(--red)';
      });
      stage.querySelector('#u1c-fb').innerHTML = ok
        ? `<span style="color:var(--green)">✓ ¡Correcto!</span>`
        : `<span style="color:var(--red)">✗ Era: <strong>${LABELS[s.ans]}</strong></span>`;
      const next = stage.querySelector('#u1c-next');
      next.innerHTML = idx < SAMPLES.length - 1
        ? `<button class="btn btn-primary btn-sm" id="u1c-go" style="margin-top:.75rem">Siguiente →</button>`
        : `<button class="btn btn-secondary btn-sm" id="u1c-go" style="margin-top:.75rem">Ver resultado</button>`;
      stage.querySelector('#u1c-go').addEventListener('click', () => {
        answered = false;
        if (idx < SAMPLES.length - 1) { idx++; draw(); }
        else finish();
      });
    }
    function finish() {
      const pct = Math.round((score / SAMPLES.length) * 100);
      markSimDone('sim-01-01', pct);
      stage.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
          <div style="font-size:2.5rem">${pct >= 70 ? '🎉' : '📘'}</div>
          <h3 style="margin:.5rem 0">${score}/${SAMPLES.length} correctas (${pct}%)</h3>
          <p style="color:var(--text-secondary);font-size:.88rem">
            ${pct >= 70 ? '¡Dominas la clasificación de la materia!' : 'Repasa la teoría y vuelve a intentarlo.'}
          </p>
          <button class="btn btn-primary btn-sm" id="u1c-retry" style="margin-top:.75rem">↻ Reintentar</button>
        </div>`;
      stage.querySelector('#u1c-retry').addEventListener('click', () => {
        idx = 0; score = 0; answered = false; draw();
      });
    }
    draw();
  }

  /* ── SIM 01-02: Estados de la Materia (canvas + slider) ─────── */
  function simEstados(stage) {
    stage.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border);
                  border-radius:var(--radius-lg);padding:1.1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem">
          <strong id="u1e-state" style="color:${C};font-size:1.05rem">—</strong>
          <span id="u1e-temp" style="font-family:var(--font-code);font-size:.85rem;color:var(--text-secondary)">25 °C</span>
        </div>
        <canvas id="u1e-canvas" width="520" height="240"
                style="width:100%;background:var(--bg-deep);border-radius:var(--radius-md);display:block"></canvas>
        <input id="u1e-range" type="range" min="-20" max="150" value="25"
               style="width:100%;margin:.9rem 0 .4rem;accent-color:${C}">
        <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted)">
          <span>❄️ -20°C</span><span>0°C fusión</span><span>100°C ebullición</span><span>150°C 🔥</span>
        </div>
        <p id="u1e-note" style="font-size:.82rem;color:var(--text-secondary);margin-top:.6rem;min-height:2.2rem"></p>
      </div>`;

    const canvas = stage.querySelector('#u1e-canvas');
    const ctx = canvas.getContext('2d');
    const range = stage.querySelector('#u1e-range');
    const W = canvas.width, H = canvas.height, N = 64;
    let temp = 25, t = 0, visited = { solido: false, liquido: false, gas: false };

    /* partículas */
    const parts = [];
    for (let i = 0; i < N; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 });

    function stateOf(T) { return T < 0 ? 'solido' : (T < 100 ? 'liquido' : 'gas'); }

    function update() {
      const st = stateOf(temp);
      stage.querySelector('#u1e-state').textContent =
        st === 'solido' ? '🧊 Sólido' : st === 'liquido' ? '💧 Líquido' : '💨 Gaseoso';
      stage.querySelector('#u1e-temp').textContent = temp + ' °C';

      const note = stage.querySelector('#u1e-note');
      if (temp === 0) note.innerHTML = '<strong style="color:' + C + '">Punto de fusión:</strong> el sólido se vuelve líquido.';
      else if (temp === 100) note.innerHTML = '<strong style="color:' + C + '">Punto de ebullición:</strong> el líquido se vuelve gas.';
      else note.textContent = st === 'solido'
        ? 'Partículas muy juntas, ordenadas y vibrando en su lugar.'
        : st === 'liquido'
          ? 'Partículas unidas pero que se deslizan: el líquido fluye.'
          : 'Partículas separadas y veloces: el gas ocupa todo el espacio.';

      visited[st] = true;
      if (visited.solido && visited.liquido && visited.gas) {
        markSimDone('sim-01-02', 100);
        visited = { solido: true, liquido: true, gas: true, _done: true };
      }
    }

    function loop() {
      /* Auto-detención si el canvas ya no está en pantalla (evita fugas) */
      if (!document.body.contains(canvas)) return;
      t += 0.05;
      const st = stateOf(temp);
      ctx.clearRect(0, 0, W, H);
      const speed = st === 'solido' ? 0.4 : st === 'liquido' ? 1.4 : 3.2;
      const cols = 8, rows = 8, gx = W / (cols + 1), gy = H / (rows + 1);

      parts.forEach((p, i) => {
        if (st === 'solido') {
          const hx = (i % cols + 1) * gx, hy = ((i / cols | 0) + 1) * gy;
          p.x += (hx - p.x) * 0.1 + Math.sin(t + i) * speed;
          p.y += (hy - p.y) * 0.1 + Math.cos(t + i) * speed;
        } else {
          p.x += (Math.sin(t * 1.3 + i) ) * speed;
          p.y += (Math.cos(t * 1.1 + i * 1.7)) * speed;
          const margin = st === 'liquido' ? H * 0.35 : 0;
          if (p.x < 6) p.x = 6; if (p.x > W - 6) p.x = W - 6;
          if (p.y < 6 + margin) p.y = 6 + margin; if (p.y > H - 6) p.y = H - 6;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = C;
        ctx.globalAlpha = 0.85;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }

    range.addEventListener('input', () => { temp = parseInt(range.value, 10); update(); });
    update();
    loop();
  }

  /* ── SIM 01-03: Métodos de Separación ───────────────────────── */
  function simSeparacion(stage) {
    const ITEMS = [
      { mez: 'Arena + agua',            ok: 'Filtración' },
      { mez: 'Agua + aceite',           ok: 'Decantación' },
      { mez: 'Sal disuelta en agua',    ok: 'Evaporación' },
      { mez: 'Agua + alcohol',          ok: 'Destilación' },
      { mez: 'Limaduras de hierro + arena', ok: 'Imantación' },
      { mez: 'Tintas de un marcador',   ok: 'Cromatografía' }
    ];
    const METODOS = ['Filtración', 'Decantación', 'Evaporación', 'Destilación', 'Imantación', 'Cromatografía'];
    let idx = 0, score = 0, answered = false;

    function draw() {
      const it = ITEMS[idx];
      stage.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.25rem">
          <div style="font-size:.78rem;color:var(--text-muted);font-family:var(--font-code);text-align:center">
            Mezcla ${idx + 1} de ${ITEMS.length} · Aciertos: ${score}
          </div>
          <div style="text-align:center;font-size:1.3rem;font-weight:800;color:${C};margin:.7rem 0 1rem">${it.mez}</div>
          <p style="font-size:.85rem;color:var(--text-secondary);text-align:center;margin-bottom:.8rem">
            ¿Qué método la separa mejor?
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.5rem">
            ${METODOS.map(m => `<button class="btn btn-ghost btn-sm" data-m="${m}">${m}</button>`).join('')}
          </div>
          <div id="u1s-fb" style="min-height:2.2rem;margin-top:1rem;text-align:center;font-size:.88rem"></div>
          <div id="u1s-next" style="text-align:center"></div>
        </div>`;
      stage.querySelectorAll('[data-m]').forEach(b =>
        b.addEventListener('click', () => choose(b.getAttribute('data-m'))));
    }
    function choose(m) {
      if (answered) return;
      answered = true;
      const it = ITEMS[idx];
      const ok = m === it.ok;
      if (ok) score++;
      stage.querySelectorAll('[data-m]').forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-m') === it.ok) b.style.borderColor = 'var(--green)';
        if (b.getAttribute('data-m') === m && !ok) b.style.borderColor = 'var(--red)';
      });
      stage.querySelector('#u1s-fb').innerHTML = ok
        ? '<span style="color:var(--green)">✓ ¡Correcto!</span>'
        : `<span style="color:var(--red)">✗ Era: <strong>${it.ok}</strong></span>`;
      stage.querySelector('#u1s-next').innerHTML =
        `<button class="btn btn-primary btn-sm" id="u1s-go" style="margin-top:.75rem">
           ${idx < ITEMS.length - 1 ? 'Siguiente →' : 'Ver resultado'}</button>`;
      stage.querySelector('#u1s-go').addEventListener('click', () => {
        answered = false;
        if (idx < ITEMS.length - 1) { idx++; draw(); } else finish();
      });
    }
    function finish() {
      const pct = Math.round((score / ITEMS.length) * 100);
      markSimDone('sim-01-03', pct);
      stage.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
          <div style="font-size:2.5rem">${pct >= 70 ? '🎉' : '📘'}</div>
          <h3 style="margin:.5rem 0">${score}/${ITEMS.length} correctas (${pct}%)</h3>
          <button class="btn btn-primary btn-sm" id="u1s-retry" style="margin-top:.5rem">↻ Reintentar</button>
        </div>`;
      stage.querySelector('#u1s-retry').addEventListener('click', () => {
        idx = 0; score = 0; answered = false; draw();
      });
    }
    draw();
  }

  /* ============================================================
     3) EXAMEN — motor con 20 preguntas (de 30), timer y feedback
  ============================================================ */

  function getBank() {
    if (Array.isArray(window.PREGUNTAS_U01)) return window.PREGUNTAS_U01.slice();
    return [];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const EXAM_CFG = { perExam: 20, time: 30, pass: 70 }; /* minutos / % aprobación */

  /* Estado del examen en curso */
  let exam = null; /* { qs, i, answers[], startTs, timerId, remaining } */

  function renderExamen(unit, uData) {
    const bank = getBank();
    const best = (uData && uData.examBest) ? uData.examBest : 0;
    const attempts = (uData && uData.examAttempts) ? uData.examAttempts : 0;

    if (bank.length === 0) {
      return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span>
        <h3>Banco no disponible</h3>
        <p style="color:var(--text-secondary)">No se cargó <code>preguntas-u01.js</code>. Verifica el &lt;script&gt; en index.html.</p></div>`;
    }
    return `
      <div id="u1-exam-root" style="animation:pageIn .4s ease">
        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
          <div style="font-size:2.4rem">📝</div>
          <h3 style="margin:.4rem 0">Examen — La Materia y su Clasificación</h3>
          <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem">
            <strong>${EXAM_CFG.perExam}</strong> preguntas al azar (de ${bank.length}) ·
            <strong>${EXAM_CFG.time} min</strong> · aprobación <strong>${EXAM_CFG.pass}%</strong> ·
            retroalimentación inmediata por pregunta.
          </p>
          ${best > 0 ? `
            <div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);
                        padding:.6rem 1.1rem;margin-bottom:1rem">
              <div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div>
              <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;
                          color:${best >= 80 ? 'var(--green)' : best >= 70 ? 'var(--gold)' : 'var(--red)'}">${best}/100</div>
              <div style="font-size:.7rem;color:var(--text-muted)">${attempts} intento${attempts !== 1 ? 's' : ''}</div>
            </div><br>` : ''}
          <button class="btn btn-primary" id="u1-exam-start">▶ Comenzar examen</button>
        </div>
      </div>`;
  }

  function bindExamen(unit, uData) {
    const start = document.getElementById('u1-exam-start');
    if (start) start.addEventListener('click', startExam);
  }

  /* HOTFIX-02: present() — mismo patrón que las Unidades II-IX */
  function present(q){return (typeof PNEBank!=='undefined')?PNEBank.present(UNIT_ID,q):q;}

  function startExam() {
    const bank = getBank();
    exam = {
      qs: shuffle(bank).slice(0, Math.min(EXAM_CFG.perExam, bank.length)),
      i: 0, answers: [], remaining: EXAM_CFG.time * 60, timerId: null
    };
    exam.timerId = setInterval(tick, 1000);
    drawQuestion();
  }

  function tick() {
    if (!exam) return;
    exam.remaining--;
    const el = document.getElementById('u1-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 30) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) finishExam();
  }

  function drawQuestion() {
    const root = document.getElementById('u1-exam-root');
    if (!root || !exam) return;
    const q = present(exam.qs[exam.i]);
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');

    root.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">
          Pregunta ${exam.i + 1} / ${exam.qs.length}
        </span>
        <span id="u1-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1rem">
        <div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">
          ${q.tema} · ${q.nivel}
        </div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">
          ${q.pregunta}
        </div>
        ${q.formula ? `<div style="font-family:var(--font-code);background:var(--bg-deep);padding:.4rem .7rem;
                       border-radius:var(--radius-sm);display:inline-block;margin-bottom:.8rem;color:var(--gold)">${q.formula}</div>` : ''}
        <div id="u1-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
          ${q.opciones.map((op, k) => `
            <button class="btn btn-ghost" data-opt="${k}"
                    style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
              <strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
            </button>`).join('')}
        </div>
        <div id="u1-exam-fb" style="margin-top:1rem"></div>
      </div>`;

    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));
  }

  function answerQuestion(choice) {
    const q = present(exam.qs[exam.i]);
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, choice, ok });

    const opts = document.getElementById('u1-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });

    /* Retroalimentación inmediata por pregunta */
    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('u1-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};
                  background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;
                  padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="u1-exam-next" style="margin-top:.8rem">
        ${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar examen'}
      </button>`;
    document.getElementById('u1-exam-next').addEventListener('click', () => {
      if (exam.i < exam.qs.length - 1) { exam.i++; drawQuestion(); }
      else finishExam();
    });
  }

  function finishExam() {
    if (!exam) return;
    clearInterval(exam.timerId);
    const correct = exam.answers.filter(a => a.ok).length;
    const total = exam.qs.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= EXAM_CFG.pass;

    /* Persistencia: mejor nota e intentos (merge seguro) */
    const uData = loadUnitData();
    const prevBest = uData.examBest || 0;
    const attempts = (uData.examAttempts || 0) + 1;
    patchUnit({
      examBest: Math.max(prevBest, score),
      examAttempts: attempts
    });
    if (passed) {
      awardXP('exam-done');   /* clave real de gamification.js (40 XP) */
    }

    const review = exam.qs.map((q, i) => {
      const a = exam.answers[i];
      const got = a ? a.ok : false;
      return `
        <div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem">
          <span>${got ? '✅' : '❌'}</span>
          <span style="flex:1;color:var(--text-secondary)">${i + 1}. ${q.pregunta}</span>
        </div>`;
    }).join('');

    const root = document.getElementById('u1-exam-root');
    root.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);
                  padding:1.5rem;text-align:center;animation:pageIn .4s ease">
        <div style="font-size:2.8rem">${passed ? '🎉' : '📚'}</div>
        <h3 style="margin:.4rem 0">${passed ? '¡Aprobado!' : 'Sigue practicando'}</h3>
        <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;
                    color:${score >= 80 ? 'var(--green)' : score >= 70 ? 'var(--gold)' : 'var(--red)'}">${score}/100</div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">
          ${correct} de ${total} correctas · aprobación ${EXAM_CFG.pass}%
        </p>
        <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);
                    border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
        <button class="btn btn-primary btn-sm" id="u1-exam-retry">↻ Repetir examen</button>
        <button class="btn btn-ghost btn-sm" id="u1-exam-close">Cerrar</button>
      </div>`;
    document.getElementById('u1-exam-retry').addEventListener('click', startExam);
    document.getElementById('u1-exam-close').addEventListener('click', () => {
      const fresh = loadUnitData();
      const container = document.getElementById('tab-content');
      if (container) { container.innerHTML = renderExamen(null, fresh); bindExamen(null, fresh); }
    });
    exam = null;
  }

  /* ============================================================
     4) JUEGO — "Detective Químico"
     El estudiante recibe muestras misteriosas y debe clasificarlas.
     Puede pedir hasta 3 pistas por caso (cada pista resta puntos).
     3 niveles progresivos (Novato → Investigador → Experto),
     5 casos por nivel. Puntaje, XP, retroalimentación y guardado
     en localStorage. Se integra como plugin del tab unit-01:juego.
  ============================================================ */

  /* Etiquetas legibles de cada categoría de clasificación */
  const CAT_LABEL = {
    elemento:    'Elemento',
    compuesto:   'Compuesto',
    homogenea:   'Mezcla homogénea',
    heterogenea: 'Mezcla heterogénea',
    coloide:     'Coloide'
  };
  const CAT_KEYS = ['elemento', 'compuesto', 'homogenea', 'heterogenea', 'coloide'];

  /* Definición de niveles y casos (5 por nivel) */
  const GAME_LEVELS = [
    {
      id: 'novato', nombre: 'Novato', icon: '🔍',
      desc: 'Casos claros para empezar a investigar.',
      casos: [
        { real: 'Lingote de oro puro', cat: 'elemento',
          pistas: ['Está formado por un solo tipo de átomo.', 'No puede descomponerse por métodos químicos.', 'Su símbolo químico es Au.'],
          explica: 'El oro es un elemento: un solo tipo de átomo que no se descompone químicamente.' },
        { real: 'Agua destilada', cat: 'compuesto',
          pistas: ['Está formada por dos elementos combinados.', 'Siempre en proporción 2 de hidrógeno por 1 de oxígeno.', 'Su fórmula es H₂O.'],
          explica: 'El agua es un compuesto: hidrógeno y oxígeno combinados químicamente en proporción fija.' },
        { real: 'Agua con sal disuelta', cat: 'homogenea',
          pistas: ['Tiene una sola fase uniforme.', 'No se distinguen los componentes a simple vista.', 'Es una solución.'],
          explica: 'Es una mezcla homogénea (solución): una sola fase y componentes indistinguibles a simple vista.' },
        { real: 'Agua con arena', cat: 'heterogenea',
          pistas: ['Se distinguen dos componentes.', 'La arena se deposita en el fondo.', 'Se separa por filtración.'],
          explica: 'Es una mezcla heterogénea: se distinguen dos fases y se separa por métodos físicos.' },
        { real: 'Gas oxígeno (O₂)', cat: 'elemento',
          pistas: ['Un solo tipo de átomo.', 'Lo respiramos para vivir.', 'Su símbolo es O.'],
          explica: 'El oxígeno es un elemento: formado por un único tipo de átomo.' }
      ]
    },
    {
      id: 'investigador', nombre: 'Investigador', icon: '🕵️',
      desc: 'Casos con trampa: mira más allá de lo evidente.',
      casos: [
        { real: 'Leche', cat: 'coloide',
          pistas: ['Parece uniforme, pero dispersa la luz.', 'Presenta el efecto Tyndall.', 'Sus partículas son intermedias: ni disueltas ni separadas.'],
          explica: 'La leche es un coloide: sus partículas dispersan la luz (efecto Tyndall).' },
        { real: 'Bronce', cat: 'homogenea',
          pistas: ['Es una mezcla de dos metales.', 'Su aspecto es totalmente uniforme.', 'Es una aleación de cobre y estaño.'],
          explica: 'El bronce es una aleación: una mezcla homogénea de metales, no un compuesto.' },
        { real: 'Sal de mesa (NaCl)', cat: 'compuesto',
          pistas: ['Dos elementos combinados químicamente.', 'Proporción fija 1 a 1.', 'Sodio + Cloro.'],
          explica: 'La sal es un compuesto: sodio y cloro unidos químicamente en proporción fija.' },
        { real: 'Ensalada de frutas', cat: 'heterogenea',
          pistas: ['Se distinguen varios componentes.', 'Puedes separar cada fruta.', 'Tiene varias fases visibles.'],
          explica: 'Es una mezcla heterogénea: sus componentes se distinguen y se pueden separar a mano.' },
        { real: 'Aire limpio', cat: 'homogenea',
          pistas: ['Es una mezcla de varios gases.', 'No se distinguen sus componentes.', 'Forma una sola fase gaseosa uniforme.'],
          explica: 'El aire es una mezcla homogénea de gases (N₂, O₂, etc.) en una sola fase.' }
      ]
    },
    {
      id: 'experto', nombre: 'Experto', icon: '🎓',
      desc: 'Solo para detectives químicos avanzados.',
      casos: [
        { real: 'Niebla', cat: 'coloide',
          pistas: ['Son gotas de agua dispersas en el aire.', 'Dispersa la luz de los faros (Tyndall).', 'No es una solución ni una mezcla heterogénea común.'],
          explica: 'La niebla es un coloide: gotas líquidas dispersas en un gas, con efecto Tyndall.' },
        { real: 'Acero inoxidable', cat: 'homogenea',
          pistas: ['Es una aleación de hierro con otros elementos.', 'Tiene aspecto uniforme y brillante.', 'Es una mezcla sólida homogénea.'],
          explica: 'El acero inoxidable es una aleación: mezcla homogénea sólida de hierro con cromo y níquel.' },
        { real: 'Granito', cat: 'heterogenea',
          pistas: ['Se ven cristales de distintos colores.', 'Contiene cuarzo, feldespato y mica.', 'Presenta varias fases sólidas visibles.'],
          explica: 'El granito es una mezcla heterogénea: se distinguen sus minerales a simple vista.' },
        { real: 'Dióxido de carbono (CO₂)', cat: 'compuesto',
          pistas: ['Formado por dos elementos.', 'Carbono y oxígeno en proporción fija.', 'Puede descomponerse en sus elementos.'],
          explica: 'El CO₂ es un compuesto: carbono y oxígeno combinados químicamente en proporción fija.' },
        { real: 'Hierro (Fe)', cat: 'elemento',
          pistas: ['Un solo tipo de átomo.', 'Es magnético.', 'Símbolo Fe; no se descompone químicamente.'],
          explica: 'El hierro es un elemento: un único tipo de átomo que no se descompone por química.' }
      ]
    }
  ];

  const GAME_PASS = 3;            /* aciertos mínimos para superar un nivel (de 5) */
  const PISTA_PENALTY = 25;      /* puntos restados por cada pista usada */
  const CASE_BASE = 100;         /* puntos base por caso resuelto */

  /* Estado de la partida en curso */
  let game = null; /* { levelIdx, lv, casos, i, score, correct, pistas, answered } */

  /* Lee del localStorage el mejor puntaje y los niveles completados */
  function gameState() {
    const u = loadUnitData();
    return {
      best: u.gameScore || 0,
      done: Array.isArray(u.gameLevels) ? u.gameLevels.slice() : []
    };
  }

  /* Un nivel está desbloqueado si es el primero o si el anterior fue superado */
  function isUnlocked(levelIdx, done) {
    if (levelIdx === 0) return true;
    return done.includes(GAME_LEVELS[levelIdx - 1].id);
  }

  /* ── Render del tab JUEGO: pantalla de selección de nivel ────── */
  function renderJuego(unit, uData) {
    const st = gameState();
    const cards = GAME_LEVELS.map((lv, i) => {
      const unlocked = isUnlocked(i, st.done);
      const completed = st.done.includes(lv.id);
      return `
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.15rem;
                    background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${completed ? 'var(--green)' : unlocked ? C : 'var(--border)'};
                    border-radius:var(--radius-md);margin-bottom:.6rem;
                    opacity:${unlocked ? '1' : '.55'}">
          <span style="font-size:2rem;flex-shrink:0">${unlocked ? lv.icon : '🔒'}</span>
          <div style="flex:1">
            <div style="font-weight:700;font-size:.98rem;color:var(--text-primary)">
              Nivel ${i + 1}: ${lv.nombre} ${completed ? '<span style="color:var(--green);font-size:.78rem">✓ superado</span>' : ''}
            </div>
            <div style="font-size:.8rem;color:var(--text-muted);margin-top:.15rem">
              ${unlocked ? lv.desc : 'Supera el nivel anterior para desbloquearlo.'}
            </div>
          </div>
          <button class="btn ${unlocked ? 'btn-primary' : 'btn-ghost'} btn-sm"
                  data-play-level="${i}" ${unlocked ? '' : 'disabled'}>
            ${completed ? '↻ Rejugar' : unlocked ? '▶ Jugar' : 'Bloqueado'}
          </button>
        </div>`;
    }).join('');

    return `
      <div class="u1-juego" style="animation:pageIn .4s ease">
        <div style="background:linear-gradient(135deg, ${C}22, transparent);
                    border:1px solid var(--border);border-radius:var(--radius-lg);
                    padding:1.1rem 1.25rem;margin-bottom:1rem">
          <div style="display:flex;align-items:center;gap:.7rem">
            <span style="font-size:2.2rem">🕵️</span>
            <div>
              <h3 style="margin:0;font-size:1.15rem">Detective Químico</h3>
              <p style="margin:.15rem 0 0;font-size:.85rem;color:var(--text-secondary)">
                Identifica cada muestra misteriosa clasificándola. Usa pistas si las necesitas:
                <strong>cuantas menos pistas, más puntos</strong>.
              </p>
            </div>
          </div>
          <div style="margin-top:.7rem;font-family:var(--font-code);font-size:.8rem;color:${C}">
            🏆 Mejor puntaje: ${st.best} / 500
          </div>
        </div>
        ${cards}
        <p style="font-size:.78rem;color:var(--text-muted);margin-top:.5rem">
          Puntaje por caso: ${CASE_BASE} pts − ${PISTA_PENALTY} por pista usada (mínimo 25 si aciertas).
          Necesitas ${GAME_PASS}/5 aciertos para superar un nivel.
        </p>
      </div>`;
  }

  function bindJuego(unit, uData) {
    const container = document.getElementById('tab-content');
    if (!container) return;
    container.querySelectorAll('[data-play-level]').forEach(btn => {
      btn.addEventListener('click', () => startLevel(parseInt(btn.getAttribute('data-play-level'), 10)));
    });
  }

  /* Vuelve a la pantalla de selección de nivel */
  function backToLevels() {
    const container = document.getElementById('tab-content');
    if (!container) return;
    const fresh = loadUnitData();
    container.innerHTML = renderJuego(null, fresh);
    bindJuego(null, fresh);
  }

  /* ── Inicia un nivel ─────────────────────────────────────────── */
  function startLevel(levelIdx) {
    const lv = GAME_LEVELS[levelIdx];
    if (!lv) return;
    /* Barajamos el orden de los casos para que cada partida sea distinta */
    const casos = shuffle(lv.casos);
    game = { levelIdx, lv, casos, i: 0, score: 0, correct: 0, pistas: 0, answered: false };
    awardXP('game-played'); /* clave real de gamification.js (30 XP) */
    drawCase();
  }

  /* ── Dibuja el caso actual ───────────────────────────────────── */
  function drawCase() {
    const container = document.getElementById('tab-content');
    if (!container || !game) return;
    const caso = game.casos[game.i];

    const pistasHTML = caso.pistas.map((p, k) => {
      const shown = k < game.pistas;
      return `
        <div style="display:flex;align-items:center;gap:.5rem;padding:.45rem .7rem;margin-bottom:.35rem;
                    background:var(--bg-elevated);border-radius:var(--radius-sm);
                    font-size:.84rem;color:${shown ? 'var(--text-secondary)' : 'var(--text-muted)'}">
          <span>${shown ? '💡' : '🔒'}</span>
          <span>${shown ? p : 'Pista ' + (k + 1) + ' (−' + PISTA_PENALTY + ' pts)'}</span>
        </div>`;
    }).join('');

    const puntosCaso = Math.max(25, CASE_BASE - PISTA_PENALTY * game.pistas);

    container.innerHTML = `
      <div class="u1-juego-play" style="animation:pageIn .35s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
          <button class="btn btn-ghost btn-sm" id="u1g-back">← Niveles</button>
          <span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">
            ${game.lv.icon} ${game.lv.nombre} · Caso ${game.i + 1}/${game.casos.length} · ${game.score} pts
          </span>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.25rem">
          <div style="text-align:center;margin-bottom:1rem">
            <div style="font-size:2.4rem">🧪</div>
            <div style="font-size:.78rem;color:var(--text-muted);font-family:var(--font-code)">MUESTRA MISTERIOSA</div>
            <div style="font-size:1.05rem;color:var(--text-primary);font-weight:700;margin-top:.2rem">${caso.real}</div>
            <div style="font-size:.72rem;color:var(--text-muted);margin-top:.1rem">(el nombre es gratis — clasificarla es el reto real)</div>
            <div style="font-size:.85rem;color:var(--text-secondary);margin-top:.3rem">
              Vale <strong style="color:${C}">${puntosCaso} pts</strong> si la clasificas ahora.
            </div>
          </div>

          <div style="margin-bottom:.8rem">${pistasHTML}</div>

          <div style="text-align:center;margin-bottom:1rem">
            <button class="btn btn-secondary btn-sm" id="u1g-pista"
                    ${game.pistas >= caso.pistas.length ? 'disabled' : ''}>
              💡 Pedir pista (${game.pistas}/${caso.pistas.length})
            </button>
          </div>

          <p style="font-size:.88rem;color:var(--text-primary);text-align:center;font-weight:700;margin-bottom:.7rem">
            ¿Cómo clasificas esta muestra?
          </p>
          <div id="u1g-opts" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.5rem">
            ${CAT_KEYS.map(k => `<button class="btn btn-ghost btn-sm" data-cat="${k}">${CAT_LABEL[k]}</button>`).join('')}
          </div>

          <div id="u1g-fb" style="margin-top:1rem"></div>
        </div>
      </div>`;

    container.querySelector('#u1g-back').addEventListener('click', () => { game = null; backToLevels(); });
    const pistaBtn = container.querySelector('#u1g-pista');
    if (pistaBtn) pistaBtn.addEventListener('click', revealPista);
    container.querySelectorAll('[data-cat]').forEach(b =>
      b.addEventListener('click', () => answerCase(b.getAttribute('data-cat'))));
  }

  function revealPista() {
    if (!game || game.answered) return;
    const caso = game.casos[game.i];
    if (game.pistas < caso.pistas.length) {
      game.pistas++;
      drawCase();
    }
  }

  function answerCase(cat) {
    if (!game || game.answered) return;
    game.answered = true;
    const caso = game.casos[game.i];
    const ok = cat === caso.cat;
    const puntos = ok ? Math.max(25, CASE_BASE - PISTA_PENALTY * game.pistas) : 0;
    if (ok) { game.correct++; game.score += puntos; }

    const opts = document.getElementById('u1g-opts');
    opts.querySelectorAll('[data-cat]').forEach(b => {
      b.disabled = true;
      if (b.getAttribute('data-cat') === caso.cat) b.style.borderColor = 'var(--green)';
      if (b.getAttribute('data-cat') === cat && !ok) b.style.borderColor = 'var(--red)';
    });

    /* Retroalimentación: revela la sustancia real + explicación */
    document.getElementById('u1g-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};
                  background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;
                  padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">
          ${ok ? '✓ ¡Caso resuelto! +' + puntos + ' pts' : '✗ Incorrecto (0 pts)'}
        </strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">
          La muestra era: <strong>${caso.real}</strong> → ${CAT_LABEL[caso.cat]}.
        </p>
        <p style="margin:.3rem 0 0;color:var(--text-muted);font-size:.83rem">${caso.explica}</p>
      </div>
      <button class="btn btn-primary btn-sm" id="u1g-next" style="margin-top:.8rem">
        ${game.i < game.casos.length - 1 ? 'Siguiente caso →' : 'Ver resultado del nivel'}
      </button>`;
    document.getElementById('u1g-next').addEventListener('click', () => {
      if (game.i < game.casos.length - 1) {
        game.i++; game.pistas = 0; game.answered = false; drawCase();
      } else {
        finishLevel();
      }
    });
  }

  /* ── Fin de nivel: puntaje, XP, guardado y retroalimentación ──── */
  function finishLevel() {
    if (!game) return;
    const passed  = game.correct >= GAME_PASS;
    const perfect = game.correct === game.casos.length;
    const levelScore = game.score; /* sobre 500 */

    /* Persistencia en localStorage (merge seguro vía updateUnit) */
    const st = gameState();
    const newBest = Math.max(st.best, levelScore);
    const done = st.done.slice();
    if (passed && !done.includes(game.lv.id)) done.push(game.lv.id);
    patchUnit({ gameScore: newBest, gameLevels: done });

    /* XP con las claves reales de gamification.js */
    if (passed) awardXP('game-won');                     /* 60 XP */
    if (levelScore > st.best) awardXP('game-highscore'); /* 100 XP al superar tu récord */

    const container = document.getElementById('tab-content');
    const nextIdx = game.levelIdx + 1;
    const haySiguiente = nextIdx < GAME_LEVELS.length;
    const desbloqueado = passed && haySiguiente;

    container.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);
                  padding:1.5rem;text-align:center;animation:pageIn .4s ease">
        <div style="font-size:2.8rem">${perfect ? '🏆' : passed ? '🎉' : '🔍'}</div>
        <h3 style="margin:.4rem 0">
          ${perfect ? '¡Nivel perfecto!' : passed ? '¡Nivel superado!' : 'Caso sin cerrar'}
        </h3>
        <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:${C}">
          ${levelScore} pts
        </div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">
          ${game.correct} de ${game.casos.length} casos resueltos
          ${passed ? '· necesitabas ' + GAME_PASS : '· necesitas ' + GAME_PASS + ' para superar el nivel'}
        </p>
        ${desbloqueado ? `<p style="color:var(--green);font-size:.85rem;margin-bottom:.8rem">
          🔓 ¡Desbloqueaste el nivel ${GAME_LEVELS[nextIdx].nombre}!</p>` : ''}
        ${(levelScore > st.best) ? `<p style="color:var(--gold);font-size:.85rem;margin-bottom:.8rem">
          🏆 ¡Nuevo récord personal!</p>` : ''}
        <div>
          <button class="btn btn-primary btn-sm" id="u1g-retry">↻ Repetir nivel</button>
          <button class="btn btn-ghost btn-sm" id="u1g-levels">Elegir nivel</button>
        </div>
      </div>`;
    const idx = game.levelIdx;
    container.querySelector('#u1g-retry').addEventListener('click', () => { game = null; startLevel(idx); });
    container.querySelector('#u1g-levels').addEventListener('click', () => { game = null; backToLevels(); });
    game = null;
  }

  /* ============================================================
     REGISTRO DE PLUGINS  (la magia: el host ya sabe usarlos)
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };

  console.log('[unit-01] Plugins de la Unidad I registrados: teoria, simuladores, juego, examen.');

  /* ============================================================
     FASE 1.5 — REGISTRO EN LOS SISTEMAS COMPARTIDOS
     Patrón oficial que toda unidad nueva replicará. Un solo punto:
     QI.registerUnit reparte a glosario, referencias, imágenes,
     videos y buscador. Si QI no está cargado, se omite sin romper.
  ============================================================ */
  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      /* Glosario (términos clave de la Unidad I, reutilizables en toda la app) */
      glossary: {
        'materia': 'Todo lo que tiene masa y ocupa un volumen en el espacio.',
        'masa': 'Cantidad de materia de un cuerpo; se mide en kg o g.',
        'densidad': 'Relación entre la masa y el volumen de una sustancia (d = m/V).',
        'sustancia pura': 'Materia de composición y propiedades constantes (elemento o compuesto).',
        'elemento': 'Sustancia pura formada por un solo tipo de átomo.',
        'compuesto': 'Sustancia pura formada por dos o más elementos combinados químicamente en proporción fija.',
        'mezcla': 'Unión física de dos o más sustancias que conservan sus propiedades.',
        'mezcla homogénea': 'Mezcla de una sola fase uniforme; sus componentes no se distinguen a simple vista.',
        'mezcla heterogénea': 'Mezcla en la que se distinguen dos o más fases o componentes.',
        'coloide': 'Mezcla con partículas intermedias dispersas que presentan el efecto Tyndall.',
        'efecto Tyndall': 'Dispersión de la luz por las partículas de un coloide, que hace visible el haz.',
        'solución': 'Otra forma de llamar a una mezcla homogénea.',
        'aleación': 'Mezcla homogénea de metales (por ejemplo, el bronce o el acero).',
        'filtración': 'Método que separa un sólido insoluble de un líquido mediante un filtro.',
        'destilación': 'Método que separa líquidos miscibles por su distinto punto de ebullición.'
      },
      /* Referencias cruzadas teoría ↔ simuladores ↔ juego ↔ examen */
      xref: {
        'teoria:topic-1': [{ tab: 'simuladores', label: 'Simulador: Estados de la Materia' }],
        'teoria:topic-5': [{ tab: 'juego', label: 'Juega: Detective Químico' },
                           { tab: 'simuladores', label: 'Simulador: Clasificador' }],
        'teoria:topic-6': [{ tab: 'simuladores', label: 'Simulador: Métodos de Separación' },
                           { tab: 'examen', label: 'Pon a prueba lo aprendido' }]
      },
      /* Imágenes (sistema listo; sin archivo aún → placeholder automático) */
      images: {} /* EOP-038: se retiraron las 2 imágenes sin archivo real (mostraban un recuadro de placeholder visible — mismo criterio que los videos retirados en EOP-037). Reactivar cuando existan archivos reales. */,
      /* Videos (preparado; muestran "próximamente" hasta cargar el archivo) */
      videos: [] /* EOP-037: se retiraron los videos sin archivo real (mostraban "Disponible próximamente" — contradice el cierre del núcleo, EOP-014/019). Reactivar cuando existan archivos reales. */,
      /* HOTFIX-02: causa raíz real de la desconexión de Unidad I — esta
         clave faltaba por completo. qi.js lee manifest.pne y llama
         PNEBank.register(unitId, manifest.pne) automáticamente; sin
         esta clave, agregar present() en el examen no alcanzaba, porque
         PNEBank nunca tenía nada registrado para 'unit-01'. */
      pne: (typeof window!=='undefined'&&window.BANCO_PNE_U01)?window.BANCO_PNE_U01:null
    });
  }

})();
