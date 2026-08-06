/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/grade11/g11-u01.js  |  UNIDAD I — El Agua (Química 11°)
   ================================================================
   IMP-11-U01: primera unidad real de Química 11°, construida sobre la
   Arquitectura Pedagógica Oficial ya aprobada. Sigue el mismo patrón
   arquitectónico de las 9 unidades de décimo (auditado en unit-01.js
   antes de escribir este archivo) pero usando el namespace paralelo
   de 11.º (data.grade11, GRADE11_UNIDADES_DATA, Storage.*Grade11*) —
   nunca toca data.units ni ninguna unidad de décimo.

   Continuidad narrativa (APO §0): retoma directamente el caso
   "Alerta en el Río Pacuare" del Proyecto Integrador de décimo.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'g11-u01';
  const C = '#1FDBFF'; /* mismo color ya asignado en unidades-grade11.js */

  /* ── Accesos defensivos (mismo patrón que unit-01.js) ─────────── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = { 'topic-read': 'topic-read', 'exam-done': 'exam-passed', 'game-played': 'game-won', 'game-won': 'game-won', 'grade11-mission-done': 'course-complete' };
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  /* IMP-11-U01: usa las funciones paralelas de Storage (Grade11), no
     las de décimo — este es el ÚNICO namespace que esta unidad toca. */
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.load === 'function') {
      try { return Storage.load().grade11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateGrade11Unit === 'function') {
      try { Storage.updateGrade11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markGrade11TopicRead === 'function') {
      try { Storage.markGrade11TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }
  function toast(msg) {
    const c = document.getElementById('toast-container');
    if (c) {
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = msg;
      c.appendChild(t);
      setTimeout(() => t.remove(), 3200);
    }
  }
  function markSimDone(simId, score) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP(score >= 100 ? 'simulator-perfect' : 'simulator-done');
    }
  }

  function box(titulo, cuerpo, color) {
    return `<div style="background:var(--bg-elevated);border-left:3px solid ${color || C};border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem .9rem;margin:.7rem 0">
      <strong style="color:${color || C};font-size:.82rem">${titulo}</strong>
      <p style="margin:.3rem 0 0;font-size:.87rem;color:var(--text-secondary);line-height:1.6">${cuerpo}</p>
    </div>`;
  }

  /* ============================================================
     1) TEORÍA — 6 temas (APO §3, Unidad I)
  ============================================================ */
  const TEORIA = [
    { icon: '💧', titulo: 'El agua y la vida', html: `
      <p>El agua es el medio donde ocurren la mayoría de las reacciones químicas de los seres vivos. No es solo "algo que bebemos" — es el escenario donde la vida misma sucede a nivel molecular.</p>
      ${box('Retomando el Río Pacuare', 'En décimo investigaste una amenaza a ese ecosistema. Ahora vas a entender, molécula por molécula, por qué el agua de ese río es capaz de sostener vida — y por qué alterarla tiene consecuencias tan profundas.', C)}
      <p>Cada célula de cada organismo vivo depende del agua como disolvente, como medio de transporte, y como regulador de temperatura. Sin entender su estructura química, es imposible entender por qué es tan especial.</p>` },

    { icon: '⚛️', titulo: 'Así está construida H₂O', html: `
      <p>La molécula de agua tiene un átomo de oxígeno unido a dos átomos de hidrógeno. El oxígeno tiene 6 electrones de valencia: 2 se comparten con cada hidrógeno (formando 2 enlaces), y los 4 restantes quedan como 2 pares de electrones libres (no enlazantes).</p>
      ${box('Dato clave', 'Esos 2 pares libres no son decorativos — son los responsables de que la molécula tenga una forma doblada, no una línea recta. Eso lo vas a ver en el siguiente tema.', C)}
      <p>Esta distribución (2 enlaces + 2 pares libres alrededor del oxígeno) es la base de la geometría molecular angular del agua.</p>` },

    { icon: '📐', titulo: 'Por qué el agua es polar', html: `
      <p>El oxígeno es más electronegativo que el hidrógeno — atrae con más fuerza los electrones compartidos en cada enlace O–H. Eso genera una carga parcial negativa (δ⁻) sobre el oxígeno y una carga parcial positiva (δ⁺) sobre cada hidrógeno.</p>
      <p>Pero eso por sí solo no bastaría: si la molécula fuera <em>lineal</em> (H–O–H en 180°), los dos dipolos de enlace se cancelarían exactamente, y la molécula sería no polar en conjunto — a pesar de tener enlaces polares.</p>
      ${box('La clave real', 'Como el agua es ANGULAR (por los pares libres del tema anterior), los dos dipolos NO se cancelan — se suman en un dipolo neto hacia el oxígeno. Por eso el agua es una molécula polar.', C)}` },

    { icon: '🔗', titulo: 'Enlace químico vs. fuerza intermolecular', html: `
      <p>Esta es la distinción más importante de toda la unidad: un <strong>enlace químico</strong> (como el covalente O–H) une átomos DENTRO de una misma molécula. Una <strong>fuerza intermolecular</strong> (como el puente de hidrógeno) actúa ENTRE moléculas distintas.</p>
      <p>El puente de hidrógeno del agua ocurre cuando el hidrógeno (δ⁺) de una molécula es atraído por el oxígeno (δ⁻) de otra molécula vecina.</p>
      ${box('Por qué importa la diferencia', 'Evaporar agua solo rompe puentes de hidrógeno (fuerzas débiles) — las moléculas siguen siendo H₂O. Descomponer el agua en hidrógeno y oxígeno (electrólisis) rompe los enlaces covalentes internos — mucho más fuertes. Por eso hervir agua es fácil, pero descomponerla no.', C)}` },

    { icon: '🧫', titulo: '¿Qué se disuelve en agua?', html: `
      <p>El principio central de la solubilidad: <strong>"lo semejante disuelve a lo semejante"</strong>. Las sustancias polares (o iónicas, como la sal) se disuelven bien en agua, porque sus cargas interactúan con las cargas parciales del agua.</p>
      <p>Las sustancias no polares (como el aceite) no logran esa interacción — por eso quedan separadas, sin importar cuánto se agiten.</p>
      ${box('Ejemplo real', 'El azúcar no es iónico, pero sus grupos -OH sí son polares y forman puentes de hidrógeno con el agua — por eso se disuelve, aunque no sea sal.', C)}` },

    { icon: '🏞️', titulo: 'Cuando el agua transporta contaminación', html: `
      <p>Este principio de polaridad no es solo teoría — es la herramienta real para predecir qué pasa cuando un contaminante llega a una fuente de agua.</p>
      <p>Un contaminante <strong>polar</strong> (o iónico) tenderá a disolverse y dispersarse ampliamente en el agua. Un contaminante <strong>no polar</strong> (como el petróleo) tenderá a quedar separado, concentrado en un punto — flotando o hundido, según su densidad.</p>
      ${box('Tu misión al cerrar esta unidad', 'Vas a analizar una muestra real de agua del caso que empezaste en décimo, y vas a tener que decidir, con lo que aprendiste acá, qué tipo de comportamiento químico esperar de lo que se encontró en ella.', C)}` }
  ];

  const TOPIC_HINTS = {
    0: ['El agua no es solo H2O flotando — es el escenario donde ocurren las reacciones de la vida.'],
    1: ['Cuenta: 6 electrones de valencia del oxígeno, 2 van a cada enlace (4 en total), quedan 2 libres.'],
    2: ['Pregúntate: ¿los 2 dipolos apuntan en direcciones que se cancelan, o se suman?'],
    3: ['Truco para recordar: "intra" = dentro de una palabra, "inter" = entre dos cosas distintas.'],
    4: ['Si dos sustancias son "parecidas" en polaridad, se llevan bien (se disuelven).'],
    5: ['Todo lo que aprendiste en los 5 temas anteriores se junta acá para predecir el comportamiento real.']
  };

  function enrichTeoria(html, i) {
    let out = (typeof Glossary !== 'undefined') ? Glossary.highlight(html) : html;
    if (typeof UnitAssets !== 'undefined' && UnitAssets.get(UNIT_ID, 'topic-' + i)) {
      out = UnitAssets.img(UNIT_ID, 'topic-' + i, { caption: UnitAssets.get(UNIT_ID, 'topic-' + i).alt }) + out;
    }
    if (typeof UnitMedia !== 'undefined') {
      const v = UnitMedia.render(UNIT_ID, 'topic-' + i);
      if (v) out += v;
    }
    if (typeof CrossRef !== 'undefined') out += CrossRef.renderChips(UNIT_ID, 'teoria:topic-' + i);
    return out;
  }

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
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">${isRead ? '✓ leído' : ''}</span>
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
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.9rem;margin:0;max-width:55ch">Lee cada tema y márcalo como leído para ganar XP y avanzar tu progreso de la unidad.</p>
          <span style="font-family:var(--font-code);font-size:.8rem;color:${C};background:var(--bg-elevated);padding:.3rem .7rem;border-radius:var(--radius-full)">${leidos}/${total} leídos</span>
        </div>
        ${items}
      </div>`;
  }

  function bindTeoria(unit, uData) {
    const container = document.getElementById('tab-content');
    if (!container) return;
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
    container.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-read');
        const tid = `${UNIT_ID}-topic-${i}`;
        markRead(tid);
        awardXP('topic-read');
        const fresh = loadUnitData();
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const reopened = container.querySelector(`[data-acc-body="${i}"]`);
        if (reopened) reopened.style.display = 'block';
      });
    });
    if (typeof Hints !== 'undefined') {
      container.querySelectorAll('.qi-hints-host').forEach(host => {
        const ti = host.getAttribute('data-topic');
        const hs = TOPIC_HINTS[ti];
        if (hs && hs.length) Hints.attach(host, hs, { label: '💡 Pista para entender este tema' });
      });
    }
  }

  /* ============================================================
     2) SIMULADORES — 3 simuladores interactivos
  ============================================================ */
  function renderSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];
    const SIMS = [
      { id: 'sim-g11u1-01', icon: '⚛️', name: 'Arquitectura de H₂O', desc: 'Construye paso a paso la estructura de Lewis del agua y descubre su geometría real.' },
      { id: 'sim-g11u1-02', icon: '🔗', name: 'Dentro y entre moléculas', desc: 'Clasifica situaciones reales como enlace químico o fuerza intermolecular.' },
      { id: 'sim-g11u1-03', icon: '🧫', name: 'Laboratorio de solubilidad', desc: 'Predice si cada sustancia se disolverá en agua, según su polaridad.' }
    ];
    const cards = SIMS.map(s => `
      <div class="unit-card" style="--unit-color:${C};cursor:pointer" data-open-sim="${s.id}">
        <div class="unit-badge" style="color:${done.includes(s.id) ? 'var(--green)' : 'var(--text-muted)'};border-color:${done.includes(s.id) ? 'rgba(0,255,136,.3)' : 'var(--border)'}">${done.includes(s.id) ? '✓ Completado' : 'Pendiente'}</div>
        <div class="unit-symbol">${s.icon}</div>
        <div class="unit-name">${s.name}</div>
        <div class="unit-meta"><span class="unit-meta-item unit-meta-item-clamp">${s.desc}</span></div>
      </div>`).join('');
    return `<div class="units-grid" style="margin-top:.5rem">${cards}</div>`;
  }
  function bindSimuladores(unit, uData) {
    document.querySelectorAll('[data-open-sim]').forEach(el => {
      el.addEventListener('click', () => openSimulator(el.getAttribute('data-open-sim')));
    });
  }
  function openSimulator(simId) {
    const host = document.getElementById('tab-content');
    if (!host) return;
    if (simId === 'sim-g11u1-01') simArquitectura(host);
    else if (simId === 'sim-g11u1-02') simEnlaceFuerza(host);
    else if (simId === 'sim-g11u1-03') simSolubilidad(host);
  }
  function _simHeader(title) {
    return `<button class="btn btn-ghost btn-sm" data-back-sim style="margin-bottom:.8rem">← Simuladores</button>
      <h3 style="color:${C};margin:0 0 .8rem">${title}</h3>`;
  }
  function _bindBackSim(unit, uData) {
    const back = document.querySelector('[data-back-sim]');
    if (back) back.addEventListener('click', () => {
      const host = document.getElementById('tab-content');
      const fresh = loadUnitData();
      host.innerHTML = renderSimuladores(unit, fresh);
      bindSimuladores(unit, fresh);
    });
  }

  /* Simulador 1: Arquitectura de H2O — pasos guiados */
  function simArquitectura(host) {
    let step = 0;
    const STEPS = [
      { q: '¿Cuántos electrones de valencia tiene el oxígeno?', opts: ['6', '4', '2'], correcta: 0 },
      { q: '¿Cuántos enlaces O–H forma el oxígeno con los 2 hidrógenos?', opts: ['2', '1', '4'], correcta: 0 },
      { q: 'De los 6 electrones de valencia, 4 forman 2 enlaces (2 c/u). ¿Cuántos quedan libres?', opts: ['2', '0', '4'], correcta: 0 },
      { q: 'Esos 2 pares libres repelen a los enlaces. ¿Qué geometría resulta?', opts: ['Angular (doblada)', 'Lineal', 'Trigonal plana'], correcta: 0 }
    ];
    function draw() {
      if (step >= STEPS.length) {
        host.innerHTML = _simHeader('⚛️ Arquitectura de H₂O') + `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg)">
            <div style="font-size:2.4rem">💧</div>
            <p style="color:var(--green);font-weight:700">¡Reconstruiste la molécula de agua completa!</p>
            <p style="color:var(--text-secondary);font-size:.88rem">Oxígeno con 2 enlaces O–H y 2 pares libres → geometría angular → molécula polar.</p>
          </div>`;
        _bindBackSim(null, null);
        markSimDone('sim-g11u1-01', 100);
        return;
      }
      const s = STEPS[step];
      host.innerHTML = _simHeader('⚛️ Arquitectura de H₂O') + `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;max-width:520px">
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem">Paso ${step + 1} de ${STEPS.length}</div>
          <p style="font-weight:700;margin-bottom:.8rem">${s.q}</p>
          <div style="display:flex;flex-direction:column;gap:.5rem">
            ${s.opts.map((o, i) => `<button class="btn btn-ghost" data-opt="${i}">${o}</button>`).join('')}
          </div>
          <div id="sim1-fb" style="margin-top:.8rem"></div>
        </div>`;
      _bindBackSim(null, null);
      host.querySelectorAll('[data-opt]').forEach(b => b.addEventListener('click', () => {
        const i = parseInt(b.getAttribute('data-opt'), 10);
        if (i === s.correcta) {
          document.getElementById('sim1-fb').innerHTML = `<p style="color:var(--green);font-size:.85rem">✓ Correcto — siguiente paso.</p>`;
          setTimeout(() => { step++; draw(); }, 700);
        } else {
          document.getElementById('sim1-fb').innerHTML = `<p style="color:var(--gold);font-size:.85rem">No es esa — pensá de nuevo en lo que viste en la teoría.</p>`;
        }
      }));
    }
    draw();
  }

  /* Simulador 2: Dentro y entre moléculas — clasificación */
  function simEnlaceFuerza(host) {
    const CASOS = [
      { txt: 'La unión entre el O y un H dentro de UNA sola molécula de agua', tipo: 'enlace' },
      { txt: 'La atracción entre el H de una molécula de agua y el O de OTRA molécula vecina', tipo: 'fuerza' },
      { txt: 'Lo que hay que romper para separar 2 moléculas de agua al evaporarse', tipo: 'fuerza' },
      { txt: 'Lo que hay que romper para descomponer el agua en H₂ y O₂ (electrólisis)', tipo: 'enlace' },
      { txt: 'La razón por la que el agua hierve a una temperatura relativamente alta', tipo: 'fuerza' },
      { txt: 'Lo que mantiene juntos los 2 átomos de hidrógeno con el oxígeno en cada molécula', tipo: 'enlace' }
    ];
    let i = 0, correctas = 0;
    function draw() {
      if (i >= CASOS.length) {
        const pct = Math.round((correctas / CASOS.length) * 100);
        host.innerHTML = _simHeader('🔗 Dentro y entre moléculas') + `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg)">
            <div style="font-size:2.2rem">${pct >= 70 ? '✅' : '📘'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${CASOS.length} correctas (${pct}%)</p>
            <p style="color:var(--text-secondary);font-size:.85rem">${pct >= 70 ? '¡Distinguís bien enlace de fuerza intermolecular!' : 'Repasá la diferencia: enlace = dentro de una molécula; fuerza = entre moléculas.'}</p>
          </div>`;
        _bindBackSim(null, null);
        markSimDone('sim-g11u1-02', pct);
        return;
      }
      const c = CASOS[i];
      host.innerHTML = _simHeader('🔗 Dentro y entre moléculas') + `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;max-width:560px">
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem">Caso ${i + 1} de ${CASOS.length}</div>
          <p style="margin-bottom:1rem">${c.txt}</p>
          <div style="display:flex;gap:.6rem">
            <button class="btn btn-ghost" data-tipo="enlace" style="flex:1">Enlace químico</button>
            <button class="btn btn-ghost" data-tipo="fuerza" style="flex:1">Fuerza intermolecular</button>
          </div>
          <div id="sim2-fb" style="margin-top:.8rem"></div>
        </div>`;
      _bindBackSim(null, null);
      host.querySelectorAll('[data-tipo]').forEach(b => b.addEventListener('click', () => {
        const ok = b.getAttribute('data-tipo') === c.tipo;
        if (ok) correctas++;
        document.getElementById('sim2-fb').innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.85rem">${ok ? '✓ Correcto' : '✗ Era ' + (c.tipo === 'enlace' ? 'enlace químico' : 'fuerza intermolecular')}</p>`;
        setTimeout(() => { i++; draw(); }, 900);
      }));
    }
    draw();
  }

  /* Simulador 3: Laboratorio de solubilidad — predicción */
  function simSolubilidad(host) {
    const SUST = [
      { name: 'Sal de mesa (NaCl)', polar: true },
      { name: 'Aceite vegetal', polar: false },
      { name: 'Azúcar de mesa', polar: true },
      { name: 'Petróleo crudo', polar: false },
      { name: 'Alcohol etílico', polar: true },
      { name: 'Cera de parafina', polar: false }
    ];
    let i = 0, correctas = 0;
    function draw() {
      if (i >= SUST.length) {
        const pct = Math.round((correctas / SUST.length) * 100);
        host.innerHTML = _simHeader('🧫 Laboratorio de solubilidad') + `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg)">
            <div style="font-size:2.2rem">${pct >= 70 ? '✅' : '📘'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${SUST.length} correctas (${pct}%)</p>
            <p style="color:var(--text-secondary);font-size:.85rem">${pct >= 70 ? '¡Aplicás bien "lo semejante disuelve a lo semejante"!' : 'Repasá: polar se disuelve en agua (polar); no polar, no.'}</p>
          </div>`;
        _bindBackSim(null, null);
        markSimDone('sim-g11u1-03', pct);
        return;
      }
      const s = SUST[i];
      host.innerHTML = _simHeader('🧫 Laboratorio de solubilidad') + `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;max-width:520px">
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem">Muestra ${i + 1} de ${SUST.length}</div>
          <p style="margin-bottom:1rem">¿Se disolverá <strong>${s.name}</strong> en agua?</p>
          <div style="display:flex;gap:.6rem">
            <button class="btn btn-ghost" data-sol="si" style="flex:1">Sí, se disuelve</button>
            <button class="btn btn-ghost" data-sol="no" style="flex:1">No se disuelve</button>
          </div>
          <div id="sim3-fb" style="margin-top:.8rem"></div>
        </div>`;
      _bindBackSim(null, null);
      host.querySelectorAll('[data-sol]').forEach(b => b.addEventListener('click', () => {
        const said = b.getAttribute('data-sol') === 'si';
        const ok = said === s.polar;
        if (ok) correctas++;
        document.getElementById('sim3-fb').innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.85rem">${ok ? '✓ Correcto' : (s.polar ? '✗ Sí se disuelve — es polar' : '✗ No se disuelve — es no polar')}</p>`;
        setTimeout(() => { i++; draw(); }, 900);
      }));
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Guardianes de la Cuenca"
     Rondas aleatorias: clasificar si un contaminante se dispersará
     (polar) o quedará concentrado (no polar) en el agua del río.
  ============================================================ */
  const MUESTRAS_JUEGO = [
    { name: 'Fertilizante agrícola disuelto', polar: true, tip: 'Los fertilizantes suelen ser sales solubles — se dispersan por toda la cuenca.' },
    { name: 'Derrame de diésel', polar: false, tip: 'El diésel es un hidrocarburo no polar — queda como capa separada.' },
    { name: 'Detergente doméstico', polar: true, tip: 'Los detergentes tienen partes polares que interactúan bien con el agua.' },
    { name: 'Aceite de motor usado', polar: false, tip: 'No polar — se concentra en un punto, no se dispersa.' },
    { name: 'Sales minerales de una mina cercana', polar: true, tip: 'Las sales iónicas se disuelven y viajan con la corriente.' },
    { name: 'Residuo de pintura a base de aceite', polar: false, tip: 'Base aceitosa: no polar, queda separado del agua.' },
    { name: 'Alcohol de un vertido industrial', polar: true, tip: 'El alcohol tiene grupos -OH polares — se mezcla con el agua.' },
    { name: 'Cera derretida de una fábrica', polar: false, tip: 'No polar — no se disuelve, flota o se hunde según su densidad.' }
  ];
  function renderJuego(unit, uData) {
    const score = (uData && uData.gameScore) || 0;
    return `
      <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
        <div style="font-size:2.4rem">🏞️</div>
        <h3 style="margin:.3rem 0;color:${C}">Guardianes de la Cuenca</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Llegan reportes de posibles contaminantes en el río. Decidí rápido: ¿se van a dispersar por toda la cuenca, o van a quedar concentrados en un punto?</p>
        ${score > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor puntuación: ${score}%</p>` : ''}
        <button class="btn btn-primary" id="g11-game-start">▶ Comenzar ronda</button>
      </div>`;
  }
  function bindJuego(unit, uData) {
    const btn = document.getElementById('g11-game-start');
    if (btn) btn.addEventListener('click', () => playRonda());
  }
  function playRonda() {
    const host = document.getElementById('tab-content');
    if (!host) return;
    const orden = MUESTRAS_JUEGO.slice().sort(() => Math.random() - 0.5);
    let i = 0, correctas = 0;
    function draw() {
      if (i >= orden.length) {
        const pct = Math.round((correctas / orden.length) * 100);
        const uData = loadUnitData();
        const prevBest = uData.gameScore || 0;
        const best = Math.max(prevBest, pct);
        patchUnit({ gameScore: best });
        awardXP(pct >= 60 ? 'game-won' : 'game-played');
        if (pct > prevBest) awardXP('game-highscore');
        host.innerHTML = `
          <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
            <div style="font-size:2.4rem">${pct >= 70 ? '🏆' : '🏞️'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${orden.length} rondas correctas (${pct}%)</p>
            <button class="btn btn-primary btn-sm" id="g11-game-again">↻ Otra ronda</button>
          </div>`;
        document.getElementById('g11-game-again').addEventListener('click', () => playRonda());
        return;
      }
      const m = orden[i];
      host.innerHTML = `
        <div style="max-width:520px;margin:0 auto">
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.4rem;text-align:center">Reporte ${i + 1} de ${orden.length}</div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
            <div style="font-size:1.8rem">🧪</div>
            <p style="font-weight:700;margin:.5rem 0">${m.name}</p>
            <div style="display:flex;gap:.6rem;margin-top:.8rem">
              <button class="btn btn-ghost" data-r="dispersa" style="flex:1">Se dispersa (polar)</button>
              <button class="btn btn-ghost" data-r="concentra" style="flex:1">Queda concentrado (no polar)</button>
            </div>
            <div id="game-fb" style="margin-top:.8rem"></div>
          </div>
        </div>`;
      host.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => {
        const said = b.getAttribute('data-r') === 'dispersa';
        const ok = said === m.polar;
        if (ok) correctas++;
        document.getElementById('game-fb').innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.84rem">${ok ? '✓ ' : '✗ '}${m.tip}</p>`;
        setTimeout(() => { i++; draw(); }, 1100);
      }));
    }
    draw();
  }

  /* ============================================================
     4) EXAMEN — selección balanceada por categoría (mínimos
     garantizados: 4/6/5/5 de 30 preguntas, 20 por intento)
  ============================================================ */
  function getBank() {
    if (Array.isArray(window.PREGUNTAS_G11_U01)) return window.PREGUNTAS_G11_U01.slice();
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
  const EXAM_CFG = { perExam: 20, time: 25, pass: 70 };
  const MIN_POR_CATEGORIA = {
    'importancia-composicion': 4,
    'estructura-geometria-polaridad': 6,
    'enlace-vs-fuerza': 5,
    'polaridad-solubilidad': 5
  };
  /* Selección balanceada: garantiza el mínimo de cada categoría y
     completa el resto al azar entre todas — mismo espíritu que la
     selección del Desafío Final PNE, aplicado a una sola unidad. */
  function buildBalancedExam() {
    const bank = getBank();
    let selected = [];
    Object.keys(MIN_POR_CATEGORIA).forEach(cat => {
      const pool = bank.filter(q => q.categoria === cat);
      selected = selected.concat(shuffle(pool).slice(0, MIN_POR_CATEGORIA[cat]));
    });
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = bank.filter(q => !selectedIds.has(q.id));
    const extra = shuffle(remaining).slice(0, Math.max(0, EXAM_CFG.perExam - selected.length));
    selected = selected.concat(extra);
    return shuffle(selected);
  }

  let exam = null;

  function renderExamen(unit, uData) {
    const bank = getBank();
    const best = (uData && uData.examBest) ? uData.examBest : 0;
    const attempts = (uData && uData.examAttempts) ? uData.examAttempts : 0;
    if (bank.length === 0) {
      return `<div class="coming-soon-panel"><span class="coming-soon-icon">⚠️</span>
        <h3>Banco no disponible</h3>
        <p style="color:var(--text-secondary)">No se cargó <code>preguntas-g11-u01.js</code>. Verifica el &lt;script&gt; en index.html.</p></div>`;
    }
    return `
      <div id="g11u1-exam-root" style="animation:pageIn .4s ease">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
          <div style="font-size:2.4rem">📝</div>
          <h3 style="margin:.4rem 0">Examen — El Agua</h3>
          <p style="color:var(--text-secondary);font-size:.88rem;max-width:46ch;margin:.4rem auto 1rem">
            <strong>${EXAM_CFG.perExam}</strong> preguntas balanceadas (de ${bank.length}) ·
            <strong>${EXAM_CFG.time} min</strong> · aprobación <strong>${EXAM_CFG.pass}%</strong>.
          </p>
          ${best > 0 ? `
            <div style="display:inline-block;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1.1rem;margin-bottom:1rem">
              <div style="font-size:.72rem;color:var(--text-muted)">Mejor nota</div>
              <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:${best >= 80 ? 'var(--green)' : best >= 70 ? 'var(--gold)' : 'var(--red)'}">${best}/100</div>
              <div style="font-size:.7rem;color:var(--text-muted)">${attempts} intento${attempts !== 1 ? 's' : ''}</div>
            </div><br>` : ''}
          <button class="btn btn-primary" id="g11u1-exam-start">▶ Comenzar examen</button>
        </div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const start = document.getElementById('g11u1-exam-start');
    if (start) start.addEventListener('click', startExam);
  }
  function present(q) { return (typeof PNEBank !== 'undefined') ? PNEBank.present(UNIT_ID, q) : q; }

  /* HOTFIX-08: se detectó que 29 de las 30 preguntas del banco tienen
     su respuesta correcta almacenada en la posición A (índice 0) —
     un sesgo real en los datos, no en la interfaz. La corrección de
     raíz vive acá: cada pregunta seleccionada para el examen mezcla
     el ORDEN de sus opciones una única vez, al construir el intento
     (no en cada render — así la opción que el estudiante ya marcó
     sigue siendo la misma opción si vuelve a verse la pregunta).
     Se aplica DESPUÉS de present(), para que tanto la variante
     estándar como la adaptada (modo simplificado) queden protegidas
     por igual. Mismo patrón ya usado en pne-final.js. */
  function _shuffleOptions(q) {
    const order = q.opciones.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const clone = Object.assign({}, q);
    clone.opciones = order.map(i => q.opciones[i]);
    clone.correcta = order.indexOf(q.correcta);
    if (Array.isArray(q.explicacion_incorrectas)) {
      clone.explicacion_incorrectas = order.map(i => q.explicacion_incorrectas[i]);
    }
    return clone;
  }
  function startExam() {
    const qs = buildBalancedExam().map(q => _shuffleOptions(present(q)));
    exam = { qs, i: 0, answers: [], remaining: EXAM_CFG.time * 60, timerId: null };
    exam.timerId = setInterval(tick, 1000);
    drawQuestion();
  }
  function tick() {
    if (!exam) return;
    exam.remaining--;
    const el = document.getElementById('g11u1-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 30) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) finishExam();
  }
  function drawQuestion() {
    const root = document.getElementById('g11u1-exam-root');
    if (!root || !exam) return;
    const q = exam.qs[exam.i];
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');
    root.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i + 1} / ${exam.qs.length}</span>
        <span id="g11u1-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="g11u1-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
          ${q.opciones.map((op, k) => `
            <button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
              <strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
            </button>`).join('')}
        </div>
        <div id="g11u1-exam-fb" style="margin-top:1rem"></div>
      </div>`;
    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));
  }
  function answerQuestion(choice) {
    const q = exam.qs[exam.i];
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, choice, ok });
    const opts = document.getElementById('g11u1-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });
    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('g11u1-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="g11u1-exam-next" style="margin-top:.8rem">${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar examen'}</button>`;
    document.getElementById('g11u1-exam-next').addEventListener('click', () => {
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
    const uData = loadUnitData();
    const prevBest = uData.examBest || 0;
    const attempts = (uData.examAttempts || 0) + 1;
    patchUnit({ examBest: Math.max(prevBest, score), examAttempts: attempts });
    if (passed) awardXP('exam-done');

    const review = exam.qs.map((q, i) => {
      const a = exam.answers[i];
      const got = a ? a.ok : false;
      return `<div style="display:flex;gap:.5rem;padding:.5rem .6rem;border-bottom:1px solid var(--border);font-size:.82rem">
        <span>${got ? '✅' : '❌'}</span><span style="flex:1;color:var(--text-secondary)">${i + 1}. ${q.pregunta}</span></div>`;
    }).join('');

    const root = document.getElementById('g11u1-exam-root');
    root.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;animation:pageIn .4s ease">
        <div style="font-size:2.8rem">${passed ? '🎉' : '📚'}</div>
        <h3 style="margin:.4rem 0">${passed ? '¡Aprobado!' : 'Sigue practicando'}</h3>
        <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${score >= 80 ? 'var(--green)' : score >= 70 ? 'var(--gold)' : 'var(--red)'}">${score}/100</div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">${correct} de ${total} correctas · aprobación ${EXAM_CFG.pass}%</p>
        <div style="text-align:left;max-height:230px;overflow-y:auto;background:var(--bg-deep);border-radius:var(--radius-md);margin-bottom:1rem">${review}</div>
        <button class="btn btn-primary btn-sm" id="g11u1-exam-retry">↻ Repetir examen</button>
        <button class="btn btn-ghost btn-sm" id="g11u1-exam-close">Cerrar</button>
      </div>`;
    document.getElementById('g11u1-exam-retry').addEventListener('click', startExam);
    document.getElementById('g11u1-exam-close').addEventListener('click', () => {
      const fresh = loadUnitData();
      const container = document.getElementById('tab-content');
      if (container) { container.innerHTML = renderExamen(null, fresh); bindExamen(null, fresh); }
    });
    exam = null;
  }

  /* ============================================================
     5) MISIÓN DE CIERRE — "Informe de la primera muestra"
     Reflexión única (no multi-estación como el Integrador Final),
     con la MISMA protección anti-duplicación de HOTFIX-06: siempre
     relee el estado fresco antes de decidir si paga XP.
  ============================================================ */
  function renderMision(unit, uData) {
    const done = !!(uData && uData.missionDone);
    /* Pedido del docente: recordar la composición/conceptos clave acá
       mismo, para que el estudiante no tenga que salir de la unidad
       (o peor, volver a un tema de Química 10.º) mientras escribe su
       informe. Colapsado por defecto — es un repaso rápido, no una
       clase nueva; no debe distraer ni alargar la pantalla. */
    const recordatorio = `
      <details style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:1.1rem">
        <summary style="cursor:pointer;font-size:.85rem;font-weight:700;color:${C}">📋 Recordatorio rápido — antes de escribir</summary>
        <ul style="margin:.6rem 0 0 1.1rem;padding:0;font-size:.82rem;color:var(--text-secondary);line-height:1.7">
          <li><strong>H₂O</strong>: 2 átomos de hidrógeno + 1 de oxígeno, geometría <strong>angular</strong> (no lineal).</li>
          <li>Esa forma angular hace que el agua sea <strong>polar</strong> (los dipolos no se cancelan).</li>
          <li>Enlace <strong>O–H</strong> = covalente polar (dentro de la molécula) ≠ <strong>puente de hidrógeno</strong> (fuerza entre moléculas distintas).</li>
          <li>Regla clave: <strong>"lo semejante disuelve a lo semejante"</strong> — polar se disuelve en polar, no polar en no polar.</li>
        </ul>
      </details>`;
    return `
      <div style="max-width:560px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
        <div style="text-align:center;margin-bottom:1rem">
          <div style="font-size:2.2rem">🧾</div>
          <h3 style="margin:.3rem 0;color:${C}">Informe de la primera muestra</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Le tomaste una muestra de agua al Río Pacuare. Con lo que aprendiste en esta unidad, escribí tu primer informe de análisis.</p>
        </div>
        ${done ? `<p style="text-align:center;color:var(--green);font-size:.85rem;margin-bottom:1rem">✓ Ya entregaste este informe. Podés actualizarlo cuando quieras.</p>` : ''}
        ${recordatorio}
        <label style="font-size:.8rem;color:var(--text-muted)">¿La muestra parece contener algo polar o no polar? ¿Cómo lo notaste?</label>
        <textarea id="g11u1-mision-1" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">Si tuvieras que predecir si se dispersará por toda la cuenca o quedará en un punto, ¿qué dirías?</label>
        <textarea id="g11u1-mision-2" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">¿Qué le dirías a la comunidad cercana al río sobre este hallazgo?</label>
        <textarea id="g11u1-mision-3" rows="2" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">¿Qué información faltaría para determinar la concentración de la sustancia?</label>
        <textarea id="g11u1-mision-4" rows="2" style="width:100%;margin:.3rem 0 1rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <button class="btn btn-primary" id="g11u1-mision-send" style="width:100%">${done ? 'Actualizar informe' : 'Entregar informe'}</button>
        <div id="g11u1-mision-fb" style="margin-top:.8rem"></div>
      </div>`;
  }
  function bindMision(unit, uData) {
    const btn = document.getElementById('g11u1-mision-send');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const t1 = document.getElementById('g11u1-mision-1').value.trim();
      const t2 = document.getElementById('g11u1-mision-2').value.trim();
      const t3 = document.getElementById('g11u1-mision-3').value.trim();
      const t4El = document.getElementById('g11u1-mision-4');
      const t4 = t4El ? t4El.value.trim() : '';
      if ((t1 + t2 + t3).length < 20) {
        document.getElementById('g11u1-mision-fb').innerHTML = `<p style="color:var(--gold);font-size:.84rem">Escribí un poco más en tus respuestas antes de entregar.</p>`;
        btn.disabled = false;
        return;
      }
      /* Misma protección que _submitInformeOnce (HOTFIX-06): releer
         el estado fresco, nunca confiar en una variable capturada al
         dibujar la pantalla. */
      const fresh = loadUnitData();
      const alreadyAwarded = !!fresh.missionDone;
      const texto = `1) ${t1}\n2) ${t2}\n3) ${t3}${t4 ? `\n4) ${t4}` : ''}`;
      patchUnit({ missionDone: true, missionText: texto });
      if (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId && MQCProfiles.saveReflection) {
        const id = MQCProfiles.activeId();
        if (id) MQCProfiles.saveReflection(id, 'g11-u01-mision', texto);
      }
      if (!alreadyAwarded) {
        awardXP('grade11-mission-done');
        if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
        document.getElementById('g11u1-mision-fb').innerHTML = `<p style="color:var(--green);font-size:.85rem">🎉 ¡Informe entregado! XP otorgado.</p>`;
      } else {
        document.getElementById('g11u1-mision-fb').innerHTML = `<p style="color:var(--text-secondary);font-size:.85rem">Informe actualizado. Ya habías entregado esta misión antes, así que no se otorga XP adicional.</p>`;
      }
      btn.textContent = 'Actualizar informe';
      btn.disabled = false;
    });
  }

  /* ============================================================
     REGISTRO DE PLUGINS — mismo patrón que unit-01.js, más un 5º
     tab "mision" (propio de Química 11.º, no existe en décimo).
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };

  console.log('[g11-u01] Plugins de la Unidad I (Química 11°) registrados: teoria, simuladores, juego, examen, mision.');

  if (typeof QI !== 'undefined') {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'polaridad': 'Propiedad de una molécula de tener una distribución desigual de carga eléctrica, con un extremo parcialmente negativo y otro parcialmente positivo.',
        'electronegatividad': 'Capacidad de un átomo de atraer hacia sí los electrones compartidos en un enlace.',
        'enlace covalente polar': 'Enlace en el que los electrones se comparten de forma desigual entre dos átomos con distinta electronegatividad.',
        'puente de hidrógeno': 'Fuerza intermolecular fuerte entre un átomo de hidrógeno unido a O, N o F, y un átomo electronegativo de una molécula vecina.',
        'fuerza intermolecular': 'Interacción que actúa ENTRE moléculas distintas, más débil que un enlace químico.',
        'geometría molecular angular': 'Forma doblada de una molécula, causada por la repulsión de pares de electrones libres.',
        'solubilidad': 'Capacidad de una sustancia de disolverse en otra, determinada en gran parte por la compatibilidad de polaridad.',
        'sustancia no polar': 'Sustancia sin una distribución significativa de carga eléctrica en su molécula.'
      },
      xref: {
        'teoria:topic-1': [{ tab: 'simuladores', label: 'Simulador: Arquitectura de H₂O' }],
        'teoria:topic-3': [{ tab: 'simuladores', label: 'Simulador: Dentro y entre moléculas' }],
        'teoria:topic-4': [{ tab: 'simuladores', label: 'Simulador: Laboratorio de solubilidad' }],
        'teoria:topic-5': [{ tab: 'juego', label: 'Juega: Guardianes de la Cuenca' },
                           { tab: 'mision', label: 'Informe de la primera muestra' }]
      },
      images: {},
      videos: [],
      pne: (typeof window !== 'undefined' && window.BANCO_PNE_G11_U01) ? window.BANCO_PNE_G11_U01 : null
    });
  }

})();
