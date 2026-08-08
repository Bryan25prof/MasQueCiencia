/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/units/grade11/g11-u04.js  |  UNIDAD IV — Química de la Vida
   ================================================================
   IMP-11-U04: cuarta y última unidad de contenido de Química 11°.
   Mismo patrón oficial de g11-u01/02/03.js. No modifica ninguna
   unidad anterior — el Atlas Químico dispara sus descubrimientos
   únicamente desde el contenido propio de esta unidad (simuladores
   y juego), nunca desde g11-u03.js.

   Nota de diseño (transparencia): el ticket pedía color "verde
   esmeralda" para esta unidad — idéntico, palabra por palabra, al ya
   pedido para la Unidad III. Se mantiene el color YA asignado a esta
   unidad desde la Fase 1 Multigrado (#FFA94D, naranja), consistente
   con el Design System real (4 colores distintos, uno por unidad) y
   documentado en el informe de este sprint.

   HOTFIX-10 PREMIUM: transformación pedagógica de esta unidad hacia
   la interpretación de estructuras completas (eje: "¿qué información
   puedo obtener observando una molécula?"). Se agregan sobre la base
   ya existente (Atlas ampliado a 11 grupos, MOLECULAS_REALES,
   MoleculeRenderer — ver esos archivos): el simulador Escáner
   Molecular (también sirve como "Nivel 2: Reconocimiento" del
   Constructor), 2 temas de teoría nuevos (biomoléculas visuales +
   comparaciones directas), rondas del juego basadas en moléculas
   completas, una categoría nueva del examen ("interpretación
   molecular") y la misión "Laboratorio de Análisis Molecular". Nada
   de esto modifica Química 10°, ni las Unidades I-III de Química 11°.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'g11-u04';
  const C = '#FFA94D';

  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = { 'topic-read': 'topic-read', 'exam-done': 'exam-passed', 'game-played': 'game-won', 'game-won': 'game-won', 'grade11-mission-done': 'course-complete' };
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
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
  /* HOTFIX-10: diagrama visual de flujo (estructura → propiedad),
     reutilizable — reemplaza párrafos largos por una secuencia corta
     de 3 pasos con flechas, tal como pide el ticket §6. */
  function _flowDiagram(pasos, color) {
    const items = pasos.map((p, i) => `
      <span style="font-weight:${i === 0 ? '900' : '600'};color:${i === 0 ? (color || C) : 'var(--text-secondary)'};font-size:${i === 0 ? '.92rem' : '.85rem'}">${p}</span>
      ${i < pasos.length - 1 ? `<span style="color:var(--text-muted);margin:0 .4rem">↓</span>` : ''}`).join('');
    return `<div style="text-align:center;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem .5rem;margin:.6rem 0;line-height:2.1">${items}</div>`;
  }
  /* HOTFIX-10: compara 2 estructuras químicas lado a lado con
     MoleculeRenderer (renderStatic) + una sola frase de diferencia —
     "no desarrollar teoría extensa, solo destacar la diferencia
     estructural relevante" (ticket §7). */
  function _comparePair(nombreA, molA, nombreB, molB, diferencia) {
    const renderA = (typeof MoleculeRenderer !== 'undefined') ? MoleculeRenderer.renderStatic(molA) : '';
    const renderB = (typeof MoleculeRenderer !== 'undefined') ? MoleculeRenderer.renderStatic(molB) : '';
    return `<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin:.7rem 0">
        <div style="flex:1;min-width:220px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem;text-align:center">
          <div style="font-size:.78rem;font-weight:700;color:${C};margin-bottom:.3rem">${nombreA}</div>${renderA}
        </div>
        <div style="flex:1;min-width:220px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem;text-align:center">
          <div style="font-size:.78rem;font-weight:700;color:${C};margin-bottom:.3rem">${nombreB}</div>${renderB}
        </div>
      </div>
      <p style="font-size:.82rem;color:var(--text-muted);margin:.2rem 0 .8rem"><strong style="color:var(--text-secondary)">Diferencia clave → </strong>${diferencia}</p>`;
  }
  /* HOTFIX-10: mismo patrón de comparación, versión biomoléculas
     (sin segmentos moleculares, solo composición/función). */
  function _comparePairBio(nombreA, dataA, nombreB, dataB) {
    return `<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin:.7rem 0 1rem">
        <div style="flex:1;min-width:220px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .8rem">
          <div style="font-size:.82rem;font-weight:700;color:${C}">${nombreA}</div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-top:.2rem">${dataA}</div>
        </div>
        <div style="flex:1;min-width:220px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .8rem">
          <div style="font-size:.82rem;font-weight:700;color:${C}">${nombreB}</div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-top:.2rem">${dataB}</div>
        </div>
      </div>`;
  }
  /* Puente hacia el Atlas Químico — nunca otorga XP por sí solo,
     solo registra evidencia de identificación real (ver ticket §
     "Nueva función oficial"). */
  function discover(atlasId, label) {
    if (typeof AtlasQuimico === 'undefined') return;
    const r = AtlasQuimico.markDiscovered(atlasId);
    if (r && r.isNew) {
      const el = document.getElementById('atlas-discover-toast');
      if (el) {
        el.textContent = `🧬 ¡Nuevo conocimiento registrado en el Atlas Químico MQC! (${label})`;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 3200);
      }
    }
  }

  /* ============================================================
     1) TEORÍA — 7 temas
  ============================================================ */
  const TEORIA = [
    { icon: '🔬', titulo: '¿Por qué pequeños cambios producen grandes diferencias?', html: `
      <p>El etanol (alcohol de bebidas) y el ácido acético (vinagre) tienen casi el mismo esqueleto de carbono — pero uno de sus grupos cambia por completo cómo se comporta la molécula.</p>
      ${box('La idea central de esta unidad', 'No hace falta cambiar toda la molécula para obtener una sustancia distinta — a veces basta con cambiar UN grupo de átomos, llamado grupo funcional, para que cambien el olor, la reactividad, y hasta si es tóxica o inofensiva.', C)}
      <p>Esta unidad conecta directamente con lo que investigaste en la Unidad III: ya identificaste QUÉ tipo de hidrocarburo produjo el derrame — ahora vas a entender qué grupo adicional podría estar presente, y qué significa eso para el ecosistema.</p>` },

    { icon: '🏷️', titulo: 'Reconociendo grupos funcionales', html: `
      <p>Un <strong>grupo funcional</strong> es un conjunto específico de átomos dentro de una molécula que determina cómo se comporta esa parte de la molécula — sin importar qué tan larga sea el resto de la cadena de carbono.</p>
      ${box('Por qué importa reconocerlos', 'Dos moléculas pueden tener cadenas de carbono muy distintas, pero si comparten el mismo grupo funcional, van a compartir un comportamiento químico parecido.', C)}
      <p>En esta unidad vas a aprender a reconocer 6 grupos funcionales, además de repasar los 3 ya vistos en la Unidad III (alcanos, alquenos, alquinos).</p>` },

    { icon: '🧪', titulo: 'Alcoholes, aldehídos y cetonas', html: `
      ${box('Alcohol — grupo –OH', 'Ejemplo: etanol (bebidas alcohólicas, desinfectantes). Se reconoce por el grupo hidroxilo unido a la cadena de carbono.', C)}
      ${box('Aldehído — grupo –CHO', 'El carbonilo (C=O) está EN EL EXTREMO de la cadena. Ejemplo: formaldehído.', C)}
      ${box('Cetona — carbonilo interno', 'El carbonilo (C=O) está EN MEDIO de la cadena, entre dos carbonos. Ejemplo: acetona (quitaesmalte).', C)}
      <p>Los 3 comparten una lógica: alcohol tiene oxígeno con hidrógeno (–OH); aldehído y cetona tienen oxígeno con doble enlace (C=O), pero en posiciones distintas.</p>` },

    { icon: '⚗️', titulo: 'Ácidos carboxílicos, ésteres y aminas', html: `
      ${box('Ácido carboxílico — grupo –COOH', 'Ejemplo: ácido acético (vinagre). Es el grupo que le da carácter ácido a una molécula orgánica.', C)}
      ${box('Éster — grupo –COO– entre dos cadenas', 'Se puede pensar como un ácido carboxílico donde el hidrógeno del –OH se reemplazó por otra cadena. Ejemplo: acetato de etilo (aromas frutales).', C)}
      ${box('Amina — grupo –NH2', 'El único de los 6 grupos que contiene nitrógeno. Es, además, parte estructural de los aminoácidos que forman las proteínas — el puente directo hacia el próximo tema.', C)}` },

    { icon: '🧬', titulo: 'Biomoléculas', html: `
      <p>Las <strong>biomoléculas</strong> son las moléculas que hacen posible la vida — construidas, en gran parte, a partir de los grupos funcionales que ya conocés.</p>
      ${box('Las 4 familias', '<strong>Carbohidratos</strong> (C,H,O — energía rápida). <strong>Lípidos</strong> (C,H,O con menos oxígeno — reserva de energía y membranas). <strong>Proteínas</strong> (C,H,O,N — estructura y enzimas). <strong>Ácidos nucleicos</strong> (C,H,O,N,P — información genética).', C)}
      <p>Cada una tiene un rol distinto, y todas trabajan juntas dentro de cualquier ser vivo.</p>` },

    { icon: '🔗', titulo: 'Relación entre estructura y función', html: `
      <p>La estructura de una biomolécula no es arbitraria — está directamente relacionada con lo que hace.</p>
      ${box('Ejemplo real', 'Los lípidos tienen menos oxígeno que los carbohidratos — por eso pueden almacenar más energía por gramo, y por eso el cuerpo los usa como reserva a largo plazo, no como energía inmediata.', C)}
      ${box('Otro ejemplo', 'Las proteínas contienen nitrógeno porque sus unidades básicas (los aminoácidos) tienen el grupo amino (–NH2) — sin nitrógeno, no existirían las proteínas tal como las conocemos.', C)}` },

    { icon: '🌍', titulo: 'Aplicaciones ambientales y biológicas', html: `
      <p>Todo lo aprendido en esta unidad sirve para cerrar la investigación completa del caso del derrame.</p>
      ${box('Del laboratorio al ecosistema', 'Identificar el grupo funcional de un contaminante ayuda a predecir su reactividad, su solubilidad en agua, y su posible impacto en los organismos vivos del río — cerrando el círculo que empezó con la primera muestra de agua en la Unidad I.', C)}
      ${box('Conciencia ambiental con evidencia', 'No se trata de decir "esto es malo" sin fundamento — se trata de usar la estructura química real de una sustancia para sustentar una conclusión ambiental responsable.', C)}` },

    { icon: '👁️', titulo: 'Biomoléculas — lo que revela su estructura', html: `
      <p>En vez de memorizar una lista, mirá lo que la propia estructura de cada biomolécula "dice" sobre su función.</p>
      ${_flowDiagram(['Carbohidrato', 'Muchos grupos –OH', 'Mayor afinidad con el agua'], C)}
      ${_flowDiagram(['Lípido', 'Menor cantidad de oxígeno', 'Mayor reserva energética'], C)}
      ${_flowDiagram(['Proteína', 'Presencia de nitrógeno', 'Aminoácidos'], C)}
      ${_flowDiagram(['Ácido nucleico', 'Presencia de fósforo', 'Información genética'], C)}
      ${box('La idea clave', 'No hace falta memorizar "para qué sirve cada una" como un dato aislado — el propio elemento que aparece en su estructura (muchos –OH, poco oxígeno, nitrógeno, fósforo) ya te está diciendo qué función cumple.', C)}` },

    { icon: '⚖️', titulo: 'Comparaciones estructurales directas', html: `
      <p>Poner dos estructuras una junto a la otra, sin teoría extra, para que la diferencia real salte a la vista.</p>
      ${_comparePair('Alcohol', { segments: [{ text:'CH3–CH2–', tag:null }, { text:'–OH', tag:'alcohol' }] },
                      'Ácido carboxílico', { segments: [{ text:'CH3–', tag:null }, { text:'–COOH', tag:'acido-carboxilico' }] },
                      'El alcohol tiene solo hidroxilo (–OH); el ácido tiene el carboxilo completo (–COOH) — un grupo más complejo, con carácter ácido real.')}
      ${_comparePair('Éter', { segments: [{ text:'CH3–CH2–', tag:null }, { text:'–O–', tag:'eter' }, { text:'–CH2–CH3', tag:null }] },
                      'Éster', { segments: [{ text:'CH3–', tag:null }, { text:'–COO–', tag:'ester' }, { text:'–CH2–CH3', tag:null }] },
                      'El éter conecta 2 cadenas SOLO con un oxígeno puente; el éster conecta 2 cadenas con un carbonilo Y un oxígeno (–COO–) — un grupo distinto, no una variación del mismo.')}
      ${_comparePair('Amina', { segments: [{ text:'CH3–CH2–', tag:null }, { text:'–NH2', tag:'amina' }] },
                      'Amida', { segments: [{ text:'CH3–', tag:null }, { text:'–CO–NH2', tag:'amida' }] },
                      'La amina tiene nitrógeno solo; la amida tiene ese mismo nitrógeno pegado a un carbonilo — la diferencia exacta que distingue, por ejemplo, un aminoácido libre de un enlace peptídico.')}
      ${_comparePairBio('Carbohidrato', 'C, H, O · muchos –OH · afinidad con el agua', 'Lípido', 'C, H, O (poco O) · reserva de energía')}
      ${_comparePairBio('Proteína', 'C, H, O, N · estructura y enzimas', 'Carbohidrato', 'C, H, O · energía inmediata')}
      ${box('Para qué sirve comparar así', 'En la PNE nunca preguntan "¿qué es un alcohol?" de forma aislada — presentan una estructura y esperan que reconozcás, por comparación, cuál grupo es cuál. Practicar así es exactamente ese tipo de razonamiento.', C)}` }
  ];

  const TOPIC_HINTS = {
    0: ['Un pequeño cambio en el grupo funcional puede cambiar por completo el comportamiento de una molécula.'],
    1: ['El grupo funcional es lo que define el comportamiento, sin importar el largo de la cadena.'],
    2: ['Alcohol=–OH. Aldehído=carbonilo al extremo. Cetona=carbonilo en medio.'],
    3: ['Ácido carboxílico=–COOH. Éster=–COO– entre 2 cadenas. Amina=–NH2 (el único con nitrógeno).'],
    4: ['Carbohidratos=energía rápida. Lípidos=reserva+membranas. Proteínas=estructura+enzimas. Ácidos nucleicos=información genética.'],
    5: ['Menos oxígeno en los lípidos = más energía almacenada por gramo.'],
    6: ['El grupo funcional de un contaminante ayuda a predecir su comportamiento ambiental real.'],
    7: ['Cada elemento extra en la estructura (más –OH, menos O, N, P) es una pista directa de la función de la biomolécula.'],
    8: ['Mirá los 2 dibujos y buscá QUÉ átomo o enlace tiene uno y el otro no — esa es siempre la diferencia clave.']
  };

  function enrichTeoria(html, i) {
    let out = (typeof Glossary !== 'undefined') ? Glossary.highlight(html) : html;
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
        <div id="atlas-discover-toast" style="display:none;background:var(--bg-elevated);border:1px solid #5CF2A8;border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:.8rem;font-size:.82rem;color:#5CF2A8"></div>
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
     2) SIMULADORES — cada identificación correcta dispara el Atlas
  ============================================================ */
  function renderSimuladores(unit, uData) {
    const done = (uData && uData.simsDone) ? uData.simsDone : [];
    const SIMS = [
      { id: 'sim-g11u4-01', icon: '🧩', name: 'Constructor de Grupos Funcionales', desc: 'Elegí un grupo (–OH, –COOH, –NH2, –CHO, C=O, –O–, –CONH2) y mirá qué familia se forma. Incluye Nivel 2.' },
      { id: 'sim-g11u4-02', icon: '🧬', name: 'Clasificador de Biomoléculas', desc: 'Relacioná estructura → tipo → función → ejemplo cotidiano.' },
      { id: 'sim-g11u4-03', icon: '🌍', name: 'Impacto Biológico', desc: 'Recibí una sustancia y analizá su grupo, biomolécula relacionada y posible impacto.' },
      { id: 'sim-g11u4-04', icon: '🔬', name: 'Escáner Molecular', desc: 'Tocá el grupo funcional directamente sobre 9 moléculas reales (aspirina, cafeína, glucosa y más).' }
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
    if (simId === 'sim-g11u4-01') simConstructorGrupos(host);
    else if (simId === 'sim-g11u4-02') simClasificadorBiomol(host);
    else if (simId === 'sim-g11u4-03') simImpacto(host);
    else if (simId === 'sim-g11u4-04') simEscanerMolecular(host);
  }
  function _simHeader(title) {
    return `<button class="btn btn-ghost btn-sm" data-back-sim style="margin-bottom:.8rem">← Simuladores</button>
      <h3 style="color:${C};margin:0 0 .8rem">${title}</h3>
      <div id="atlas-discover-toast" style="display:none;background:var(--bg-elevated);border:1px solid #5CF2A8;border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:.8rem;font-size:.82rem;color:#5CF2A8"></div>`;
  }
  function _bindBackSim() {
    const back = document.querySelector('[data-back-sim]');
    if (back) back.addEventListener('click', () => {
      const host = document.getElementById('tab-content');
      const unit = GRADE11_UNIDADES_DATA.find(u => u.id === UNIT_ID);
      const fresh = loadUnitData();
      host.innerHTML = renderSimuladores(unit, fresh);
      bindSimuladores(unit, fresh);
    });
  }

  const GRUPOS_SIM = [
    { grupo: '–OH', id: 'alcohol', nombre: 'Alcohol' },
    { grupo: '–CHO', id: 'aldehido', nombre: 'Aldehído' },
    { grupo: 'C=O (interno)', id: 'cetona', nombre: 'Cetona' },
    { grupo: '–COOH', id: 'acido-carboxilico', nombre: 'Ácido carboxílico' },
    { grupo: '–COO–', id: 'ester', nombre: 'Éster' },
    { grupo: '–NH2', id: 'amina', nombre: 'Amina' },
    /* HOTFIX-10: los 2 grupos que completan el mínimo de 11 del
       Atlas, agregados también aquí para que el Nivel 1 del
       Constructor cubra el set completo. */
    { grupo: '–O–', id: 'eter', nombre: 'Éter' },
    { grupo: '–CO–NH2', id: 'amida', nombre: 'Amida' }
  ];
  function simConstructorGrupos(host) {
    let idx = 0;
    function draw() {
      const g = GRUPOS_SIM[idx];
      const ficha = (typeof ATLAS_QUIMICO_DATA !== 'undefined') ? ATLAS_QUIMICO_DATA.gruposFuncionales.find(x => x.id === g.id) : null;
      host.innerHTML = `${_simHeader('Constructor de Grupos Funcionales')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <label style="font-size:.82rem;color:var(--text-muted)">Elegí un grupo para agregar a la cadena</label>
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin:.5rem 0 1rem">
            ${GRUPOS_SIM.map((x, i) => `<button class="btn btn-sm ${i === idx ? 'btn-primary' : 'btn-ghost'}" data-g="${i}">${x.grupo}</button>`).join('')}
          </div>
          <div style="text-align:center;padding:1rem;background:var(--bg-elevated);border-radius:var(--radius-md)">
            <div style="font-family:var(--font-code);font-size:1.5rem;color:${C}">${g.grupo}</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-top:.3rem">${g.nombre}</div>
            ${ficha ? `<p style="font-size:.8rem;color:var(--text-muted);margin-top:.4rem">Ejemplo: ${ficha.ejemplo}</p>` : ''}
          </div>
          <div style="text-align:center;margin-top:1rem;padding-top:.9rem;border-top:1px dashed var(--border)">
            <p style="font-size:.78rem;color:var(--text-muted);margin:0 0 .5rem">Nivel 1 completado — ¿listo para reconocerlo dentro de una molécula real?</p>
            <button class="btn btn-ghost btn-sm" id="g11u4-nivel2">🔬 Nivel 2 — Reconocimiento en estructuras completas →</button>
          </div>
        </div>`;
      host.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => {
        idx = parseInt(b.getAttribute('data-g'), 10);
        draw();
        discover(GRUPOS_SIM[idx].id, GRUPOS_SIM[idx].nombre);
        markSimDone('sim-g11u4-01', 100);
      }));
      const n2 = document.getElementById('g11u4-nivel2');
      if (n2) n2.addEventListener('click', () => simEscanerMolecular(host));
      discover(g.id, g.nombre);
      markSimDone('sim-g11u4-01', 100);
      _bindBackSim();
    }
    draw();
  }

  /* ============================================================
     ESCÁNER MOLECULAR (HOTFIX-10) — también es el "Nivel 2:
     Reconocimiento" del Constructor. Muestra una molécula real
     completa (MOLECULAS_REALES) y el estudiante toca directamente
     sobre el segmento que cree que es un grupo funcional, usando el
     renderizador interactivo compartido (MoleculeRenderer). Acierto
     → resalta en verde y explica por qué. Error → resalta el
     correcto y explica el error. markSimDone es idempotente, así
     que no se otorga XP infinito por repetir moléculas.
  ============================================================ */
  function simEscanerMolecular(host) {
    if (typeof MOLECULAS_REALES === 'undefined' || !MOLECULAS_REALES.length) return;
    let idx = 0;
    function draw() {
      const mol = MOLECULAS_REALES[idx];
      const containerId = 'g11u4-escaner-mol';
      host.innerHTML = `${_simHeader('🔬 Escáner Molecular')}
        <div style="max-width:520px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <p style="font-size:.78rem;color:var(--text-muted);text-align:center">Molécula ${idx + 1} de ${MOLECULAS_REALES.length}</p>
          <div style="text-align:center;margin-bottom:.3rem">
            <span style="font-weight:900;font-size:1.05rem;color:${C}">${mol.nombre}</span>
            <span style="display:block;font-size:.76rem;color:var(--text-muted)">${mol.nombreCompleto}</span>
          </div>
          <p style="text-align:center;font-size:.82rem;color:var(--text-secondary);margin:.6rem 0">Tocá el segmento que creas que es un grupo funcional.</p>
          ${MoleculeRenderer.renderInteractive(mol, containerId, null)}
          <div id="escaner-fb" style="margin-top:1rem;min-height:1.5rem"></div>
          <div id="escaner-nav" style="display:none;text-align:center;margin-top:.8rem">
            <button class="btn btn-primary btn-sm" id="escaner-next">${idx < MOLECULAS_REALES.length - 1 ? 'Siguiente molécula →' : '↻ Reiniciar'}</button>
          </div>
        </div>`;
      MoleculeRenderer.bindInteractive(mol, containerId, (tag, correcto) => {
        const fb = document.getElementById('escaner-fb');
        if (correcto) {
          const ficha = (typeof ATLAS_QUIMICO_DATA !== 'undefined') ? ATLAS_QUIMICO_DATA.gruposFuncionales.find(x => x.id === tag) : null;
          fb.innerHTML = `<p style="color:var(--green);font-size:.85rem">✓ ¡Correcto! Es <strong>${ficha ? ficha.nombre : tag}</strong> — ${ficha ? ficha.grupo : ''}.</p>`;
        } else {
          fb.innerHTML = `<p style="color:var(--red);font-size:.85rem">✗ Ese segmento no es un grupo funcional. Se resaltaron en color los que sí lo son — fijate cuál era.</p>`;
        }
        (mol.grupos || []).forEach(g => discover(g, _nombreAtlas(g)));
        markSimDone('sim-g11u4-04', 100);
        document.getElementById('escaner-nav').style.display = 'block';
      });
      const next = document.getElementById('escaner-next');
      if (next) next.addEventListener('click', () => { idx = (idx + 1) % MOLECULAS_REALES.length; draw(); });
      _bindBackSim();
    }
    draw();
  }

  function simClasificadorBiomol(host) {
    let idx = 0;
    function draw() {
      const b = (typeof ATLAS_QUIMICO_DATA !== 'undefined') ? ATLAS_QUIMICO_DATA.biomoleculas[idx] : null;
      if (!b) return;
      host.innerHTML = `${_simHeader('Clasificador de Biomoléculas')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
          <p style="font-size:.8rem;color:var(--text-muted)">Biomolécula ${idx + 1} de ${ATLAS_QUIMICO_DATA.biomoleculas.length}</p>
          <div style="font-size:1.3rem;font-weight:900;color:${C};margin:.4rem 0">${b.nombre}</div>
          <div style="text-align:left;background:var(--bg-elevated);border-radius:var(--radius-md);padding:.8rem;font-size:.85rem;color:var(--text-secondary);line-height:1.7">
            <p><strong>Tipo → </strong>${b.elementos}</p>
            <p><strong>Función → </strong>${b.funcion}</p>
            <p><strong>Ejemplo cotidiano → </strong>${b.ejemplo}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="biomol-next" style="margin-top:1rem">${idx < ATLAS_QUIMICO_DATA.biomoleculas.length - 1 ? 'Siguiente →' : '↻ Reiniciar'}</button>
        </div>`;
      discover(b.id, b.nombre);
      markSimDone('sim-g11u4-02', 100);
      document.getElementById('biomol-next').addEventListener('click', () => {
        idx = (idx + 1) % ATLAS_QUIMICO_DATA.biomoleculas.length;
        draw();
      });
      _bindBackSim();
    }
    draw();
  }

  const IMPACTO_CASOS = [
    { grupoId: 'acido-carboxilico', bioId: null, comportamiento: 'Puede alterar el pH del agua al disolverse.', aplicacion: 'Conservación de alimentos.', ambiental: 'En exceso, puede acidificar cuerpos de agua pequeños.' },
    { grupoId: 'ester', bioId: 'lipidos', comportamiento: 'Puede formar parte de aceites y grasas naturales.', aplicacion: 'Aromas y saborizantes.', ambiental: 'Generalmente biodegradable en concentraciones bajas.' },
    { grupoId: 'amina', bioId: 'proteinas', comportamiento: 'Puede indicar presencia de compuestos relacionados con proteínas.', aplicacion: 'Relevante en procesos biológicos.', ambiental: 'Su acumulación puede afectar el equilibrio de nutrientes del agua.' }
  ];
  function simImpacto(host) {
    let idx = 0;
    function draw() {
      const M = IMPACTO_CASOS[idx];
      const gFicha = ATLAS_QUIMICO_DATA.gruposFuncionales.find(x => x.id === M.grupoId);
      const bFicha = M.bioId ? ATLAS_QUIMICO_DATA.biomoleculas.find(x => x.id === M.bioId) : null;
      host.innerHTML = `${_simHeader('Impacto Biológico')}
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <p style="font-size:.8rem;color:var(--text-muted)">Sustancia ${idx + 1} de ${IMPACTO_CASOS.length} — grupo funcional: <strong style="color:${C}">${gFicha.nombre}</strong></p>
          <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.8rem;font-size:.85rem;color:var(--text-secondary);line-height:1.7;margin-top:.5rem">
            <p><strong>Comportamiento → </strong>${M.comportamiento}</p>
            ${bFicha ? `<p><strong>Biomolécula relacionada → </strong>${bFicha.nombre}</p>` : ''}
            <p><strong>Aplicación cotidiana → </strong>${M.aplicacion}</p>
            <p><strong>Posible impacto ambiental → </strong>${M.ambiental}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="impacto-next" style="margin-top:1rem">${idx < IMPACTO_CASOS.length - 1 ? 'Siguiente sustancia →' : '↻ Reiniciar'}</button>
        </div>`;
      discover(M.grupoId, gFicha.nombre);
      if (M.bioId) discover(M.bioId, bFicha.nombre);
      markSimDone('sim-g11u4-03', 100);
      document.getElementById('impacto-next').addEventListener('click', () => { idx = (idx + 1) % IMPACTO_CASOS.length; draw(); });
      _bindBackSim();
    }
    draw();
  }

  /* ============================================================
     3) JUEGO — "Detective Molecular"
  ============================================================ */
  const CASOS_DETECTIVE = [
    { pista: 'Tiene el grupo –OH', respuesta: 'alcohol', atlasId: 'alcohol' },
    { pista: 'Tiene el grupo –COOH', respuesta: 'acido-carboxilico', atlasId: 'acido-carboxilico' },
    { pista: 'Tiene el grupo –NH2', respuesta: 'amina', atlasId: 'amina' },
    { pista: 'Carbonilo al extremo de la cadena', respuesta: 'aldehido', atlasId: 'aldehido' },
    { pista: 'Carbonilo en medio de la cadena', respuesta: 'cetona', atlasId: 'cetona' },
    { pista: 'Grupo –COO– entre dos cadenas', respuesta: 'ester', atlasId: 'ester' },
    { pista: 'Fuente de energía rápida, C-H-O', respuesta: 'carbohidratos', atlasId: 'carbohidratos', bio: true },
    { pista: 'Reserva de energía, forma membranas', respuesta: 'lipidos', atlasId: 'lipidos', bio: true },
    { pista: 'Contiene nitrógeno, forma enzimas', respuesta: 'proteinas', atlasId: 'proteinas', bio: true },
    { pista: 'Contiene fósforo, guarda información genética', respuesta: 'acidos-nucleicos', atlasId: 'acidos-nucleicos', bio: true }
  ];
  function _nombreAtlas(id) {
    if (!ATLAS_QUIMICO_DATA) return id;
    const g = ATLAS_QUIMICO_DATA.gruposFuncionales.find(x => x.id === id);
    if (g) return g.nombre;
    const b = ATLAS_QUIMICO_DATA.biomoleculas.find(x => x.id === id);
    return b ? b.nombre : id;
  }
  /* HOTFIX-10: casos con estructura completa — en vez de una pista de
     texto, se muestra la molécula real (MoleculeRenderer.renderStatic)
     y se pregunta por UNO de sus grupos presentes. Se generan a
     partir de MOLECULAS_REALES, mismo motor de datos que el Escáner
     Molecular y el examen — sin duplicar contenido. */
  function _casosEstructuraCompleta() {
    if (typeof MOLECULAS_REALES === 'undefined') return [];
    return MOLECULAS_REALES.map(m => ({
      estructura: m, pista: null,
      respuesta: m.grupos[0],
      atlasId: m.grupos[0],
      esEstructura: true
    }));
  }
  function renderJuego(unit, uData) {
    const score = (uData && uData.gameScore) || 0;
    return `
      <div style="text-align:center;padding:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:520px;margin:0 auto">
        <div style="font-size:2.4rem">🕵️</div>
        <h3 style="margin:.3rem 0;color:${C}">Detective Molecular</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Ya no solo pistas de texto: ahora también te llegan estructuras químicas completas, casos reales tipo PNE. Identificá el grupo funcional o la biomolécula correcta.</p>
        ${score > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor puntuación: ${score}%</p>` : ''}
        <button class="btn btn-primary" id="g11-game-start">▶ Comenzar caso</button>
      </div>`;
  }
  function bindJuego(unit, uData) {
    const btn = document.getElementById('g11-game-start');
    if (btn) btn.addEventListener('click', () => playRonda());
  }
  function playRonda() {
    const host = document.getElementById('tab-content');
    if (!host) return;
    /* HOTFIX-10: la ronda mezcla las pistas de texto originales con
       casos de estructura completa — mayor semejanza con una PNE
       real, sin quitar los casos que ya funcionaban. */
    const todos = CASOS_DETECTIVE.concat(_casosEstructuraCompleta());
    const orden = todos.slice().sort(() => Math.random() - 0.5);
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
            <div style="font-size:2.4rem">${pct >= 70 ? '🏆' : '🕵️'}</div>
            <p style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${correctas}/${orden.length} casos resueltos (${pct}%)</p>
            <button class="btn btn-primary btn-sm" id="g11-game-again">↻ Otra ronda</button>
          </div>`;
        document.getElementById('g11-game-again').addEventListener('click', () => playRonda());
        return;
      }
      const caso = orden[i];
      const tagsUnicos = Array.from(new Set(todos.map(c => c.respuesta).filter(r => r !== caso.respuesta)));
      const otrasOpciones = tagsUnicos.sort(() => Math.random() - 0.5).slice(0, 3);
      const opciones = [caso.respuesta, ...otrasOpciones].sort(() => Math.random() - 0.5);
      const cuerpoCaso = caso.esEstructura
        ? `<p style="font-size:.78rem;color:var(--text-muted);margin:.2rem 0">Estructura de: <strong style="color:${C}">${caso.estructura.nombre}</strong></p>
           ${(typeof MoleculeRenderer !== 'undefined') ? MoleculeRenderer.renderStatic(caso.estructura) : ''}
           <p style="font-size:.82rem;color:var(--text-secondary);margin-top:.5rem">¿Cuál de estos grupos funcionales SÍ está presente en esta molécula?</p>`
        : `<div style="font-size:1.6rem">🔍</div><p style="font-weight:700;margin:.5rem 0">"${caso.pista}"</p>`;
      host.innerHTML = `
        <div style="max-width:520px;margin:0 auto">
          <div id="atlas-discover-toast" style="display:none;background:var(--bg-elevated);border:1px solid #5CF2A8;border-radius:var(--radius-md);padding:.5rem .8rem;margin-bottom:.6rem;font-size:.78rem;color:#5CF2A8"></div>
          <p style="font-size:.78rem;color:var(--text-muted);text-align:center;margin-bottom:.4rem">Caso ${i + 1} de ${orden.length}</p>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem;text-align:center">
            ${cuerpoCaso}
            <div style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:.6rem">
              ${opciones.map(o => `<button class="btn btn-ghost btn-sm" data-r="${o}">${_nombreAtlas(o)}</button>`).join('')}
            </div>
            <div id="game-fb" style="margin-top:.8rem"></div>
          </div>
        </div>`;
      host.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => {
        const said = b.getAttribute('data-r');
        const ok = said === caso.respuesta;
        if (ok) { correctas++; discover(caso.atlasId, _nombreAtlas(caso.atlasId)); }
        document.getElementById('game-fb').innerHTML = `<p style="color:${ok ? 'var(--green)' : 'var(--red)'};font-size:.84rem">${ok ? '✓ ¡Correcto!' : '✗ Era: ' + _nombreAtlas(caso.respuesta)}</p>`;
        setTimeout(() => { i++; draw(); }, 1300);
      }));
    }
    draw();
  }

  /* ============================================================
     4) EXAMEN — 40 preguntas, 20 por intento
  ============================================================ */
  function getBank() { return Array.isArray(window.PREGUNTAS_G11_U04) ? window.PREGUNTAS_G11_U04.slice() : []; }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  /* HOTFIX-10: 'interpretacion-molecular' es la categoría nueva —
     preguntas sobre moléculas reales completas (multi-grupo,
     comparación estructural), no definiciones aisladas. Se exige un
     mínimo real (no solo agregada al banco) para que cada intento
     del examen incluya interpretación, tal como pide el ticket §10. */
  const MIN_POR_CATEGORIA = { 'identificacion-grupo': 4, 'clasificacion': 3, 'biomoleculas': 3, 'ejemplos-cotidianos': 3, 'aplicaciones': 3, 'interpretacion-molecular': 4 };
  const EXAM_CFG = { perExam: 20, time: 30, pass: 70 };
  function buildBalancedExam() {
    const bank = getBank();
    const byCat = {};
    bank.forEach(q => { (byCat[q.categoria] = byCat[q.categoria] || []).push(q); });
    let selected = [];
    Object.keys(MIN_POR_CATEGORIA).forEach(cat => {
      const pool = byCat[cat] || [];
      selected = selected.concat(shuffle(pool).slice(0, MIN_POR_CATEGORIA[cat]));
    });
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = bank.filter(q => !selectedIds.has(q.id));
    const extra = shuffle(remaining).slice(0, Math.max(0, EXAM_CFG.perExam - selected.length));
    return shuffle(selected.concat(extra));
  }
  function present(q) { return (typeof PNEBank !== 'undefined') ? PNEBank.present(UNIT_ID, q) : q; }
  function _shuffleOptions(q) {
    const order = q.opciones.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const clone = Object.assign({}, q);
    clone.opciones = order.map(i => q.opciones[i]);
    clone.correcta = order.indexOf(q.correcta);
    if (Array.isArray(q.explicacion_incorrectas)) clone.explicacion_incorrectas = order.map(i => q.explicacion_incorrectas[i]);
    return clone;
  }
  let exam = null;
  function renderExamen(unit, uData) {
    const best = (uData && uData.examBest) || 0;
    return `
      <div id="g11u4-exam-root" style="max-width:600px;margin:0 auto">
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.2rem">📝</div>
          <h3 style="margin:.3rem 0;color:${C}">Examen — Química de la Vida</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">${EXAM_CFG.perExam} preguntas de un banco de 40 · ${EXAM_CFG.time} minutos · aprobación ${EXAM_CFG.pass}%</p>
          ${best > 0 ? `<p style="font-size:.8rem;color:var(--gold)">Tu mejor resultado: ${best}%</p>` : ''}
          <button class="btn btn-primary" id="g11u4-exam-start">▶ Comenzar examen</button>
        </div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const btn = document.getElementById('g11u4-exam-start');
    if (btn) btn.addEventListener('click', () => startExam());
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
    const el = document.getElementById('g11u4-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 60) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) finishExam();
  }
  function drawQuestion() {
    const root = document.getElementById('g11u4-exam-root');
    if (!root || !exam) return;
    const q = exam.qs[exam.i];
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');
    root.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
        <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">Pregunta ${exam.i + 1} / ${exam.qs.length}</span>
        <span id="g11u4-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:${C}">⏱ ${m}:${s}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
        <div style="font-size:.72rem;color:${C};font-family:var(--font-code);margin-bottom:.4rem">${q.tema}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:1rem;line-height:1.5">${q.pregunta}</div>
        <div id="g11u4-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
          ${q.opciones.map((op, k) => `
            <button class="btn btn-ghost" data-opt="${k}" style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
              <strong style="color:${C};margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
            </button>`).join('')}
        </div>
        <div id="g11u4-exam-fb" style="margin-top:1rem"></div>
      </div>`;
    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));
  }
  function answerQuestion(choice) {
    const q = exam.qs[exam.i];
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, choice, ok });
    const opts = document.getElementById('g11u4-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });
    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('g11u4-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="g11u4-exam-next" style="margin-top:.8rem">${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar examen'}</button>`;
    document.getElementById('g11u4-exam-next').addEventListener('click', () => {
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
    const root = document.getElementById('g11u4-exam-root');
    if (root) {
      root.innerHTML = `
        <div style="text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
          <div style="font-size:2.4rem">${passed ? '🎉' : '📚'}</div>
          <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:900;color:${passed ? 'var(--green)' : 'var(--red)'}">${score}%</div>
          <p style="color:var(--text-secondary);font-size:.86rem">${correct} de ${total} correctas · aprobación ${EXAM_CFG.pass}%</p>
          <div style="text-align:left;max-height:280px;overflow-y:auto;margin:1rem 0;background:var(--bg-deep);border-radius:var(--radius-md)">${review}</div>
          <button class="btn btn-primary btn-sm" id="g11u4-exam-retry">↻ Intentar de nuevo</button>
        </div>`;
      document.getElementById('g11u4-exam-retry').addEventListener('click', () => startExam());
    }
    exam = null;
    if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
  }

  /* ============================================================
     5) MISIÓN DE CIERRE (HOTFIX-10) — "Laboratorio de Análisis
     Molecular". Reemplaza la misión anterior. El estudiante recibe
     3 estructuras químicas reales de dominios distintos (muestra
     ambiental/alimenticia, alimento con biomolécula, producto
     cotidiano) — tomadas directamente de MOLECULAS_REALES, mismo
     dato que usan el Escáner Molecular y el examen, para que nunca
     se contradigan. Se mantiene exactamente la misma protección
     anti-farming (idempotente, mínimo de texto, XP una sola vez) —
     es una investigación, no un examen (ticket §11).
  ============================================================ */
  const MISION_MUESTRAS = ['acido-acetico', 'glucosa', 'ibuprofeno'];
  function _muestraMision(id) {
    if (typeof MOLECULAS_REALES === 'undefined') return null;
    return MOLECULAS_REALES.find(m => m.id === id);
  }
  function renderMision(unit, uData) {
    const done = !!(uData && uData.missionDone);
    const muestras = MISION_MUESTRAS.map(_muestraMision).filter(Boolean);
    const recordatorio = `
      <details style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:1.1rem">
        <summary style="cursor:pointer;font-size:.85rem;font-weight:700;color:${C}">📋 Recordatorio rápido — antes de escribir</summary>
        <ul style="margin:.6rem 0 0 1.1rem;padding:0;font-size:.82rem;color:var(--text-secondary);line-height:1.7">
          <li><strong>Alcohol</strong>=–OH · <strong>Aldehído</strong>=–CHO (extremo) · <strong>Cetona</strong>=C=O (interno)</li>
          <li><strong>Ácido carboxílico</strong>=–COOH · <strong>Éster</strong>=–COO– · <strong>Éter</strong>=–O–</li>
          <li><strong>Amina</strong>=–NH2 · <strong>Amida</strong>=–CONH2</li>
          <li><strong>Carbohidratos</strong>=energía rápida (muchos –OH) · <strong>Lípidos</strong>=reserva+membranas (poco O)</li>
          <li><strong>Proteínas</strong>=estructura+enzimas (N) · <strong>Ácidos nucleicos</strong>=información genética (P)</li>
        </ul>
      </details>`;
    const fichas = muestras.map((m, i) => `
      <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.8rem;margin-bottom:.7rem">
        <p style="font-size:.78rem;color:var(--text-muted);margin:0 0 .3rem">Muestra ${i + 1} — ${m.uso}</p>
        <p style="font-weight:700;color:${C};margin:0 0 .4rem">${m.nombre}</p>
        ${(typeof MoleculeRenderer !== 'undefined') ? MoleculeRenderer.renderStatic(m) : ''}
      </div>`).join('');
    return `
      <div style="max-width:600px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem">
        <div style="text-align:center;margin-bottom:1rem">
          <div style="font-size:2.2rem">🧫</div>
          <h3 style="margin:.3rem 0;color:${C}">Laboratorio de Análisis Molecular</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Te llegaron 3 estructuras químicas reales de fuentes distintas: una muestra relacionada con el ecosistema, un alimento y un producto cotidiano. Tu tarea es analizarlas como lo haría un laboratorio real — no memorizando, sino observando cada estructura.</p>
        </div>
        ${done ? `<p style="text-align:center;color:var(--green);font-size:.85rem;margin-bottom:1rem">✓ Ya entregaste este informe. Podés actualizarlo cuando quieras.</p>` : ''}
        ${recordatorio}
        ${fichas}
        <label style="font-size:.8rem;color:var(--text-muted)">1) Identificá el o los grupos funcionales presentes en cada una de las 3 muestras, y justificá tu respuesta (qué viste en la estructura que te lo indica).</label>
        <textarea id="g11u4-mision-1" rows="3" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">2) Elegí una de las 3 muestras y relacioná su estructura con su función: ¿por qué esa estructura específica hace que la sustancia se comporte como se comporta (uso cotidiano o rol biológico)?</label>
        <textarea id="g11u4-mision-2" rows="3" style="width:100%;margin:.3rem 0 .8rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <label style="font-size:.8rem;color:var(--text-muted)">3) Proponé una posible aplicación o un impacto ambiental relacionado con al menos una de las 3 muestras, sustentado en su grupo funcional (no en una opinión sin evidencia).</label>
        <textarea id="g11u4-mision-3" rows="3" style="width:100%;margin:.3rem 0 1rem;background:var(--bg-deep);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.5rem;font-family:inherit"></textarea>
        <button class="btn btn-primary" id="g11u4-mision-send" style="width:100%">${done ? 'Actualizar informe' : 'Entregar informe'}</button>
        <div id="g11u4-mision-fb" style="margin-top:.8rem"></div>
      </div>`;
  }
  function bindMision(unit, uData) {
    const btn = document.getElementById('g11u4-mision-send');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const t1 = document.getElementById('g11u4-mision-1').value.trim();
      const t2 = document.getElementById('g11u4-mision-2').value.trim();
      const t3 = document.getElementById('g11u4-mision-3').value.trim();
      if ((t1 + t2 + t3).length < 30) {
        document.getElementById('g11u4-mision-fb').innerHTML = `<p style="color:var(--gold);font-size:.84rem">Escribí un poco más en tus respuestas antes de entregar — recordá justificar, no solo nombrar el grupo.</p>`;
        btn.disabled = false;
        return;
      }
      const fresh = loadUnitData();
      const alreadyAwarded = !!fresh.missionDone;
      const texto = `1) ${t1}\n2) ${t2}\n3) ${t3}`;
      patchUnit({ missionDone: true, missionText: texto });
      MISION_MUESTRAS.forEach(id => { const m = _muestraMision(id); if (m) (m.grupos || []).forEach(g => discover(g, _nombreAtlas(g))); });
      if (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId && MQCProfiles.saveReflection) {
        const id = MQCProfiles.activeId();
        if (id) MQCProfiles.saveReflection(id, 'g11-u04-mision', texto);
      }
      if (!alreadyAwarded) {
        awardXP('grade11-mission-done');
        if (typeof Gamification !== 'undefined' && Gamification.checkBadges) Gamification.checkBadges();
        document.getElementById('g11u4-mision-fb').innerHTML = `<p style="color:var(--green);font-size:.85rem">🎉 ¡Informe entregado! XP otorgado.</p>`;
      } else {
        document.getElementById('g11u4-mision-fb').innerHTML = `<p style="color:var(--text-secondary);font-size:.85rem">Informe actualizado. Ya habías entregado esta misión antes, así que no se otorga XP adicional.</p>`;
      }
      btn.textContent = 'Actualizar informe';
      btn.disabled = false;
    });
  }

  /* ============================================================
     REGISTRO DE PLUGINS
  ============================================================ */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
  console.log('[g11-u04] Plugins de la Unidad IV (Química 11°) registrados: teoria, simuladores, juego, examen, mision.');

  if (typeof QI !== 'undefined' && QI.registerUnit) {
    QI.registerUnit(UNIT_ID, {
      glossary: {
        'grupo funcional': 'Conjunto específico de átomos dentro de una molécula que determina su comportamiento químico.',
        'biomolécula': 'Molécula orgánica que hace posible la estructura y el funcionamiento de los seres vivos.',
        'aminoácido': 'Unidad básica que forma las proteínas; contiene un grupo amino (–NH2).',
        'éter': 'Grupo funcional con un oxígeno como puente entre dos cadenas de carbono (R–O–R\').',
        'amida': 'Grupo funcional con un carbonilo unido a un nitrógeno (–CO–NH2); es el enlace que une los aminoácidos en una proteína.'
      },
      xref: {
        'teoria:topic-2': [{ tab: 'simuladores', label: 'Simulador: Constructor de Grupos Funcionales' }],
        'teoria:topic-4': [{ tab: 'simuladores', label: 'Simulador: Clasificador de Biomoléculas' }],
        'teoria:topic-6': [{ tab: 'simuladores', label: 'Simulador: Impacto Biológico' },
                           { tab: 'juego', label: 'Juega: Detective Molecular' }],
        'teoria:topic-7': [{ tab: 'simuladores', label: 'Simulador: Clasificador de Biomoléculas' }],
        'teoria:topic-8': [{ tab: 'simuladores', label: 'Simulador: Escáner Molecular' },
                           { tab: 'mision', label: 'Laboratorio de Análisis Molecular' }]
      },
      images: {},
      videos: [],
      pne: (typeof window !== 'undefined' && window.BANCO_PNE_G11_U04) ? window.BANCO_PNE_G11_U04 : null
    });
  }

})();
