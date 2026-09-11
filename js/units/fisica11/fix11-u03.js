/* ================================================================
   MÁSQUECIENCIA — js/units/fisica11/fix11-u03.js
   FIX11-U03 — Electricidad
   ================================================================
   RUTA DE CIERRE — FASE 1. Contenido derivado y parafraseado del
   libro fuente "Física 11° — Un enfoque Práctico" (Tema III, apartados
   3.1 a 3.3, páginas 85-98). Mismo patrón de plugin exacto que las
   demás unidades. Sistema de juego UNIFICADO desde el inicio (una
   pregunta a la vez, como el examen — lección aprendida del hotfix
   anterior).
   FIX10-U01 a U08, FIX11-U01 y FIX11-U02 NO se tocaron.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'fix11-u03';
  const C = 'var(--violet)';

  function _fmt2(x) { return x.toFixed(2).replace('.', ','); }

  function _svgCircuito(cfg) {
    // cfg: { tipo: 'serie'|'paralelo', resistencias: [R1,R2,...], etiqueta?: string }
    const w = 280, h = 140;
    if (cfg.tipo === 'serie') {
      const n = cfg.resistencias.length;
      const espacio = (w - 60) / n;
      const resistores = cfg.resistencias.map((r, i) => {
        const x = 40 + i * espacio + espacio / 2;
        return `<rect x="${x - 18}" y="55" width="36" height="16" fill="none" stroke="#1FDBFF" stroke-width="2"/>
          <text x="${x}" y="48" font-size="9" fill="#1FDBFF" text-anchor="middle">${r}Ω</text>`;
      }).join('');
      return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:320px;display:block;margin:.6rem auto">
        <rect x="20" y="63" width="${w - 40}" height="1" fill="none" stroke="#8888B0" stroke-width="1.5"/>
        <line x1="20" y1="63" x2="${w - 20}" y2="63" stroke="#8888B0" stroke-width="2"/>
        <line x1="20" y1="63" x2="20" y2="100" stroke="#8888B0" stroke-width="2"/>
        <line x1="${w - 20}" y1="63" x2="${w - 20}" y2="100" stroke="#8888B0" stroke-width="2"/>
        <line x1="20" y1="100" x2="${w - 20}" y2="100" stroke="#8888B0" stroke-width="2"/>
        <text x="${w / 2}" y="118" font-size="9" fill="#F9FF4D" text-anchor="middle">${cfg.etiqueta || 'Circuito en serie — misma corriente en todos'}</text>
        ${resistores}
      </svg>`;
    } else {
      const n = cfg.resistencias.length;
      const alturaTotal = 90;
      const paso = alturaTotal / n;
      const ramas = cfg.resistencias.map((r, i) => {
        const y = 25 + i * paso + paso / 2;
        return `<line x1="60" y1="${y}" x2="${w - 60}" y2="${y}" stroke="#1FDBFF" stroke-width="2"/>
          <rect x="${w / 2 - 18}" y="${y - 8}" width="36" height="16" fill="#161a3d" stroke="#1FDBFF" stroke-width="2"/>
          <text x="${w / 2}" y="${y + 4}" font-size="9" fill="#1FDBFF" text-anchor="middle">${r}Ω</text>`;
      }).join('');
      return `<svg viewBox="0 0 ${w} ${h}" style="background:#161a3d;border-radius:8px;width:100%;max-width:320px;display:block;margin:.6rem auto">
        <line x1="60" y1="20" x2="60" y2="110" stroke="#8888B0" stroke-width="2"/>
        <line x1="${w - 60}" y1="20" x2="${w - 60}" y2="110" stroke="#8888B0" stroke-width="2"/>
        <text x="${w / 2}" y="128" font-size="9" fill="#F9FF4D" text-anchor="middle">Circuito en paralelo — mismo voltaje en todas las ramas</text>
        ${ramas}
      </svg>`;
    }
  }

  const TEMAS = [
    { id: 't1', icon: '💧', titulo: 'El concepto de electricidad',
      ideaClave: 'Los electrones en un conductor se mueven al azar en todas direcciones — solo hay flujo NETO de corriente cuando existe una diferencia de potencial.',
      explicacion: 'La electricidad es el flujo de electrones, impulsado por la diferencia de potencial entre dos puntos (como el agua que fluye por un río debido a la gravedad). Cuando un conductor se conecta a una diferencia de potencial (batería o tomacorriente), los electrones experimentan una fuerza que los impulsa, adquiriendo una velocidad llamada velocidad de deriva.',
      ejemplo: 'La velocidad de deriva de los electrones es sorprendentemente lenta (del orden de 10⁻⁴ cm/s). Sin embargo, al encender un interruptor, la luz se prende casi instantáneamente — porque el campo eléctrico se establece en todos los electrones del conductor casi a la velocidad de la luz, aunque cada electrón individual se mueva muy lento.',
      aplicacion: 'En conductores metálicos, la electricidad se transmite por electrones libres. En conductores líquidos no metálicos (como baterías químicas) y en gases, las cargas en movimiento son iones positivos y negativos, no solo electrones.',
      compruebra: '¿Por qué un conductor NO conectado a una diferencia de potencial no presenta flujo neto de electrones, aunque estos se estén moviendo constantemente?' },

    { id: 't2', icon: '⚡', titulo: 'Corriente eléctrica',
      ideaClave: 'La dirección "oficial" en la que se dibuja la corriente eléctrica (de + a −) es, en realidad, la dirección OPUESTA a como se mueven los electrones de verdad.',
      explicacion: 'La corriente eléctrica (I) se calcula como I = q/t (carga entre tiempo), y se mide en Amperes (A). Por convención histórica (Benjamin Franklin), la dirección convencional de la corriente va del polo positivo al negativo de la batería — aunque los electrones (carga real en movimiento) se mueven en sentido contrario, del polo negativo al positivo.',
      ejemplo: 'Si la corriente en un alambre es de 70 A durante 20 segundos: q = I·t = (70)(20) = 1.400 C de carga eléctrica pasaron por esa sección transversal.',
      aplicacion: 'Los físicos e ingenieros usan la dirección convencional (positivo a negativo) en todos los diseños de circuitos — no es un error, es simplemente la convención universalmente adoptada.',
      compruebra: 'Si por un conductor circulan 3 A, ¿cuántos Coulombs de carga pasan por una sección transversal en 1 segundo?' },

    { id: 't3', icon: '🔄', titulo: 'Corriente continua y alterna',
      ideaClave: 'La diferencia entre corriente continua y alterna es simplemente si los electrones viajan siempre en una dirección, o si van y vienen constantemente.',
      explicacion: 'La corriente continua (o directa) mantiene el movimiento de los electrones en una sola dirección todo el tiempo — como la de una batería o pila. La corriente alterna hace que los electrones se desplacen primero en una dirección, y luego en sentido opuesto, en un movimiento de vaivén repetido — como la de los tomacorrientes domésticos.',
      ejemplo: 'Una batería de linterna entrega corriente continua; el tomacorriente de tu casa entrega corriente alterna (que cambia de dirección muchas veces por segundo).',
      aplicacion: 'Esta distinción es clave para entender por qué algunos dispositivos electrónicos necesitan un "adaptador" o "cargador" — convierten la corriente alterna del tomacorriente en corriente continua, que es la que necesitan sus circuitos internos.',
      compruebra: '¿Qué tipo de corriente (continua o alterna) entrega una batería de auto?' },

    { id: 't4', icon: '🔧', titulo: 'Ley de Ohm',
      ideaClave: 'Al graficar voltaje contra corriente en un conductor, se obtiene una línea recta — y la pendiente de esa línea ES la resistencia.',
      explicacion: 'George S. Ohm descubrió que, para un conductor sólido, el voltaje (V) y la corriente (I) tienen una relación lineal, cuya pendiente corresponde a la resistencia (R). La fórmula es R = V/I, donde R se mide en ohmios (Ω). La resistencia surge de la oposición al paso de corriente que ofrecen los átomos del conductor, y esa oposición convierte energía eléctrica en calor.',
      ejemplo: 'Según la gráfica del libro: cuando V=10V, I=1A (R=10Ω); cuando V=20V, I=2A (R=10Ω); cuando V=30V, I=3A (R=10Ω) — la resistencia se mantiene constante, confirmando la relación lineal.',
      aplicacion: 'La resistencia tiene relación INVERSA con la corriente (a mayor R, menor I, si V no cambia) y relación DIRECTA con el voltaje. Todo equipo que use electricidad presenta algún tipo de resistencia, que lo hace calentarse — a veces esto es una pérdida de energía (como en una computadora), y a veces es precisamente lo que se busca (como en una secadora de cabello).',
      compruebra: 'Si un conductor tiene 20 V aplicados y circula 1 A por él, ¿cuál es su resistencia?' },

    { id: 't5', icon: '💡', titulo: 'Potencia eléctrica',
      ideaClave: 'La potencia eléctrica mide qué tan rápido un circuito realiza trabajo eléctrico — se puede calcular de tres formas distintas, según qué datos tengas.',
      explicacion: 'La potencia (P) se mide en Watts (W), y se relaciona con las demás variables mediante tres fórmulas equivalentes: P = I·V, P = I²·R, y P = V²/R. Podés elegir la fórmula según qué datos conozcas.',
      ejemplo: 'Una resistencia de 50 Ω puede disipar un máximo de 0,5 W. La corriente máxima permitida es I=√(P/R)=√(0,5/50)=0,10 A, y el voltaje máximo es V=√(P·R)=√(0,5×50)=5,0 V.',
      aplicacion: 'Estas tres fórmulas de potencia son intercambiables — si conocés I y R, usás P=I²R; si conocés V y R, usás P=V²/R; si conocés I y V, usás P=IV. Todas dan el mismo resultado si los datos son consistentes entre sí.',
      compruebra: 'Si conocés la corriente y el voltaje de un circuito, pero no su resistencia, ¿qué fórmula de potencia podés usar directamente?' },

    { id: 't6', icon: '🔗', titulo: 'Circuitos: serie, paralelo y mixtos',
      ideaClave: 'En un circuito en serie, si UNA resistencia falla, TODO el circuito deja de funcionar. En uno en paralelo, cada rama funciona de forma independiente.',
      explicacion: '<strong>Circuito en serie:</strong> los elementos se conectan uno tras otro, y la corriente (I) es la MISMA en todos ellos. La resistencia equivalente se calcula como Req = R₁+R₂+R₃+... (suma aritmética simple), y el voltaje se reparte de forma distinta en cada resistencia (V=I·R en cada una).<br><br>' +
        '<strong>Circuito en paralelo:</strong> cada elemento tiene su propia "línea" conectada a las mismas terminales, y el voltaje (V) es el MISMO en todas las ramas. La resistencia equivalente se calcula como 1/Req = 1/R₁+1/R₂+1/R₃+..., y la corriente se reparte de forma distinta en cada rama (I=V/R en cada una).<br><br>' +
        '<strong>Circuito mixto:</strong> combina ambas configuraciones — por ejemplo, dos resistencias en paralelo, y esa combinación conectada en serie con una tercera.',
      ejemplo: 'SERIE: R₁=3Ω, R₂=5Ω, R₃=7Ω, con V=30V. Req=3+5+7=15Ω. I=V/Req=30/15=2A (la misma en las 3). Caída de voltaje: V₁=2×3=6V, V₂=2×5=10V, V₃=2×7=14V (suman los 30V totales).<br><br>' +
        'PARALELO: mismas resistencias (3Ω,5Ω,7Ω), con V=30V. 1/Req=1/3+1/5+1/7 → Req≈1,49Ω. I_total=30/1,49≈20,1A. Corriente por rama: I₁=30/3=10A, I₂=30/5=6A, I₃=30/7≈4,3A (suman ≈20,1A totales).',
      aplicacion: 'MIXTO: dos resistencias de 2Ω y 6Ω en paralelo (Req_parcial=1,5Ω) conectadas en serie con una de 3Ω (Req_total=4,5Ω). Con 110V aplicados: I_total=110/4,5≈24,44A. Ese mismo I_total pasa por la resistencia de 3Ω (caída de voltaje V₃=24,44×3≈73,3V), y el voltaje restante (110−73,3≈36,7V) se reparte en las ramas paralelas: I₂Ω=36,7/2≈18,3A, I₆Ω=36,7/6≈6,1A.',
      compruebra: '¿Por qué en tu casa, si se funde un foco en una habitación, las luces de las demás habitaciones siguen funcionando?' }
  ];

  /* ── Helpers defensivos (mismo patrón que unidades anteriores) ─── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','fisica10-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().fisica11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateFisica11Unit === 'function') {
      try { Storage.updateFisica11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markFisica11TopicRead === 'function') {
      try { Storage.markFisica11TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }
  function markSimDone(simId) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP('simulator-done');
    }
  }
  function _mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function _bloqueTema(etiqueta, texto, color, esPregunta) {
    if (!texto) return '';
    return `
      <div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid ${color}">
        <p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:${color};margin:0 0 .25rem">${etiqueta}</p>
        <p style="margin:0;${esPregunta ? 'font-style:italic' : ''}">${texto}</p>
      </div>`;
  }

  /* ================================================================
     TEORÍA — 6 temas en acordeón
     ================================================================ */
  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;
    const circuitoEjemplo = _svgCircuito({ tipo: 'serie', resistencias: [3, 5, 7] });
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
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">${isRead ? '✓ leído' : ''}</span>
            <span class="fix10-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="fix10-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.6">
            ${_bloqueTema('💡 IDEA CLAVE', t.ideaClave, 'var(--xp-gold,#F9FF4D)')}
            ${_bloqueTema('📘 EXPLICACIÓN', t.explicacion, C)}
            ${i === 5 ? `<div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid var(--cyan)"><p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:var(--cyan);margin:0 0 .4rem">🔎 EJEMPLO</p><p style="margin:0 0 .4rem">${t.ejemplo}</p>${circuitoEjemplo}</div>` : _bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
            ${_bloqueTema('🌐 APLICACIÓN REAL', t.aplicacion, 'var(--green)')}
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
      <div class="fix10-teoria" style="animation:pageIn .4s ease">
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:1rem">Progreso: ${leidosCount}/${TEMAS.length} temas leídos</p>
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
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(temaId);
        markRead(temaId);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        const container = document.querySelector('.fix10-teoria').parentElement;
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const i = btn.closest('[data-acc]').getAttribute('data-acc');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const head = document.querySelector(`[data-acc-toggle="${i}"] .fix10-acc-caret`);
        if (body) { body.style.display = 'block'; if (head) head.style.transform = 'rotate(180deg)'; }
      });
    });
  }

  /* ================================================================
     SIMULADOR 1 — "Ohm Lab": el simulador estrella. V, I, R
     interactivos, mostrando la relación lineal en vivo.
     ================================================================ */
  let _ohmModo = 'explora';
  let _ohmV = 20, _ohmI = 2; // R se calcula
  function renderSim1() {
    if (_ohmModo === 'desafio') return _renderOhmDesafio();
    const R = _ohmV / _ohmI;
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔧 Ohm Lab MQC — Modo Explora</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés el voltaje y la corriente, y mirás cómo cambia la resistencia (R=V/I).</p>
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Voltaje V = <strong style="color:${C}">${_ohmV} V</strong></label>
        <input type="range" id="ohm-slider-v" min="1" max="100" step="1" value="${_ohmV}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">Corriente I = <strong style="color:${C}">${_ohmI} A</strong></label>
        <input type="range" id="ohm-slider-i" min="1" max="20" step="1" value="${_ohmI}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.9rem">
          R = V/I = <strong style="color:${C}">${_fmt2(R)} Ω</strong>
        </div>
        <button class="btn btn-primary btn-sm" id="ohm-ir-desafio" style="margin-top:1.2rem">Modo Desafío →</button>
      </div>`;
  }
  const OHM_RONDAS = [
    { R: 50, P: 0.5, pide: 'I' }, { R: 100, V: 20, pide: 'I' },
    { I: 2, V: 24, pide: 'R' }, { R: 10, I: 3, pide: 'V' }
  ];
  let _ohmDesafioIdx = 0;
  function _renderOhmDesafio() {
    if (_ohmDesafioIdx >= OHM_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${OHM_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const r = OHM_RONDAS[_ohmDesafioIdx];
    let enunciado = '', formula = '', placeholder = '';
    if (r.pide === 'I' && r.P !== undefined) { enunciado = `Una resistencia de R=${r.R} Ω puede disipar P=${r.P} W como máximo.`; formula = 'I = √(P/R)'; placeholder = 'I (A)'; }
    else if (r.pide === 'I') { enunciado = `Un circuito tiene R=${r.R} Ω y V=${r.V} V.`; formula = 'I = V/R'; placeholder = 'I (A)'; }
    else if (r.pide === 'R') { enunciado = `Un circuito tiene I=${r.I} A y V=${r.V} V.`; formula = 'R = V/I'; placeholder = 'R (Ω)'; }
    else if (r.pide === 'V') { enunciado = `Un circuito tiene R=${r.R} Ω e I=${r.I} A.`; formula = 'V = I·R'; placeholder = 'V (V)'; }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="ohm-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_ohmDesafioIdx + 1} de ${OHM_RONDAS.length}</p>
        <p style="margin-bottom:.6rem">${enunciado}</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">${formula}</div>
        <input type="number" step="0.01" id="ohm-respuesta" placeholder="${placeholder}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="ohm-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="ohm-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  function _ohmEsperado(r) {
    if (r.pide === 'I' && r.P !== undefined) return Math.sqrt(r.P / r.R);
    if (r.pide === 'I') return r.V / r.R;
    if (r.pide === 'R') return r.V / r.I;
    if (r.pide === 'V') return r.I * r.R;
  }

  /* ================================================================
     SIMULADOR 2 — "Circuit Builder MQC": simulador interactivo real.
     3 modos (Serie / Paralelo / Mixto), con V, R1, R2, R3 ajustables,
     mostrando en vivo Req, I (amperaje) y el reparto de voltaje o
     corriente en cada elemento. El modo Mixto además tiene un Modo
     Desafío con rondas verificables.
     ================================================================ */
  let _cbModo = 'serie'; // 'serie' | 'paralelo' | 'mixto'
  let _cbSubmodo = 'explora'; // 'explora' | 'desafio' (solo aplica a 'mixto')
  let _cbV = 30, _cbR1 = 3, _cbR2 = 5, _cbR3 = 7;

  function _cbCalcular() {
    if (_cbModo === 'serie') {
      const req = _cbR1 + _cbR2 + _cbR3;
      const i = _cbV / req;
      return { req, i, v1: i * _cbR1, v2: i * _cbR2, v3: i * _cbR3 };
    }
    if (_cbModo === 'paralelo') {
      const req = 1 / (1 / _cbR1 + 1 / _cbR2 + 1 / _cbR3);
      const i = _cbV / req;
      return { req, i, i1: _cbV / _cbR1, i2: _cbV / _cbR2, i3: _cbV / _cbR3 };
    }
    // mixto: R1 y R2 en paralelo, esa combinación en serie con R3
    const rp = 1 / (1 / _cbR1 + 1 / _cbR2);
    const req = rp + _cbR3;
    const i = _cbV / req;
    const v3 = i * _cbR3;
    const vp = _cbV - v3;
    return { req, i, rp, v3, vp, i1: vp / _cbR1, i2: vp / _cbR2 };
  }

  function renderSim2() {
    if (_cbSubmodo === 'desafio') return _renderCbDesafio();
    const svg = _svgCircuito({ tipo: _cbModo === 'paralelo' ? 'paralelo' : 'serie', resistencias: [_cbR1, _cbR2, _cbR3], etiqueta: _cbModo === 'mixto' ? 'Vista simplificada — R₁ y R₂ en paralelo, R₃ en serie (ver desglose abajo)' : undefined });
    const r = _cbCalcular();
    let desglose = '';
    if (_cbModo === 'serie') {
      desglose = `Req = R₁+R₂+R₃ = <strong style="color:${C}">${_fmt2(r.req)} Ω</strong><br>
        I (igual en las 3) = V/Req = <strong style="color:${C}">${_fmt2(r.i)} A</strong><br>
        Caída de voltaje: V₁=${_fmt2(r.v1)}V, V₂=${_fmt2(r.v2)}V, V₃=${_fmt2(r.v3)}V`;
    } else if (_cbModo === 'paralelo') {
      desglose = `1/Req = 1/R₁+1/R₂+1/R₃ → Req = <strong style="color:${C}">${_fmt2(r.req)} Ω</strong><br>
        I total = V/Req = <strong style="color:${C}">${_fmt2(r.i)} A</strong><br>
        Corriente por rama (mismo V en todas): I₁=${_fmt2(r.i1)}A, I₂=${_fmt2(r.i2)}A, I₃=${_fmt2(r.i3)}A`;
    } else {
      desglose = `R₁∥R₂ = <strong style="color:var(--cyan)">${_fmt2(r.rp)} Ω</strong> (en paralelo) + R₃ en serie<br>
        Req total = <strong style="color:${C}">${_fmt2(r.req)} Ω</strong><br>
        I total = V/Req = <strong style="color:${C}">${_fmt2(r.i)} A</strong><br>
        Caída en R₃ (serie): V₃=${_fmt2(r.v3)}V &nbsp;|&nbsp; Voltaje en la parte paralela: ${_fmt2(r.vp)}V<br>
        Corriente por rama paralela: I₁=${_fmt2(r.i1)}A, I₂=${_fmt2(r.i2)}A`;
    }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">🔗 Circuit Builder MQC</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.8rem">Movés la fuente y las 3 resistencias, y mirás en vivo la resistencia equivalente, el amperaje, y cómo se reparte el voltaje o la corriente. Cuando quieras, pasá a Modo Desafío para practicar ejercicios de este mismo tipo de circuito.</p>
        <div style="display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap">
          <button class="btn ${_cbModo === 'serie' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-cb-modo="serie">Serie</button>
          <button class="btn ${_cbModo === 'paralelo' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-cb-modo="paralelo">Paralelo</button>
          <button class="btn ${_cbModo === 'mixto' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-cb-modo="mixto">Mixto</button>
        </div>
        ${svg}
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin-bottom:.2rem">Fuente V = <strong style="color:${C}">${_cbV} V</strong></label>
        <input type="range" id="cb-slider-v" min="5" max="220" step="5" value="${_cbV}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">R₁ = <strong style="color:${C}">${_cbR1} Ω</strong></label>
        <input type="range" id="cb-slider-r1" min="1" max="20" step="1" value="${_cbR1}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">R₂ = <strong style="color:${C}">${_cbR2} Ω</strong></label>
        <input type="range" id="cb-slider-r2" min="1" max="20" step="1" value="${_cbR2}" style="width:100%">
        <label style="display:block;font-size:.8rem;color:var(--text-secondary);margin:.9rem 0 .2rem">R₃ = <strong style="color:${C}">${_cbR3} Ω</strong></label>
        <input type="range" id="cb-slider-r3" min="1" max="20" step="1" value="${_cbR3}" style="width:100%">
        <div style="margin-top:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.8rem;font-family:var(--font-code);font-size:.85rem;line-height:1.8">
          ${desglose}
        </div>
        <button class="btn btn-primary btn-sm" id="cb-ir-desafio" style="margin-top:1.2rem">Modo Desafío (${_cbModo === 'serie' ? 'serie' : _cbModo === 'paralelo' ? 'paralelo' : 'mixto'}) →</button>
      </div>`;
  }

  /* Modo Desafío disponible en LOS 3 modos (serie / paralelo / mixto).
     Cada modo tiene su propio banco de 4 rondas; _cbDesafioIdx es
     compartido porque siempre se reinicia a 0 al entrar a Desafío
     (ver bindSimuladores → irDesafioCb). */
  const CB_RONDAS_SERIE = [
    { v: 24, r1: 2, r2: 4, r3: 6, pide: 'req' },     // Req=12Ω
    { v: 45, r1: 5, r2: 6, r3: 4, pide: 'itotal' },  // I=3A
    { v: 100, r1: 10, r2: 15, r3: 25, pide: 'req' }, // Req=50Ω
    { v: 36, r1: 3, r2: 5, r3: 4, pide: 'itotal' }   // I=3A
  ];
  const CB_RONDAS_PARALELO = [
    { v: 12, r1: 6, r2: 6, r3: 6, pide: 'req' },     // Req=2Ω
    { v: 15, r1: 9, r2: 9, r3: 9, pide: 'itotal' },  // I=5A
    { v: 16, r1: 4, r2: 8, r3: 8, pide: 'req' },     // Req=2Ω
    { v: 16, r1: 4, r2: 4, r3: 8, pide: 'itotal' }   // I=10A
  ];
  const CB_RONDAS_MIXTO = [
    { v: 110, r1: 2, r2: 6, r3: 3, pide: 'req' },
    { v: 60, r1: 4, r2: 4, r3: 2, pide: 'itotal' },
    { v: 90, r1: 3, r2: 6, r3: 5, pide: 'req' },
    { v: 48, r1: 8, r2: 8, r3: 4, pide: 'itotal' }
  ];
  let _cbDesafioIdx = 0;
  function _cbRondasActuales() {
    if (_cbModo === 'serie') return CB_RONDAS_SERIE;
    if (_cbModo === 'paralelo') return CB_RONDAS_PARALELO;
    return CB_RONDAS_MIXTO;
  }
  function _cbCalcularMixto(d) {
    const rp = 1 / (1 / d.r1 + 1 / d.r2);
    const req = rp + d.r3;
    const itotal = d.v / req;
    return { req, itotal };
  }
  function _cbCalcularDesafio(d) {
    if (_cbModo === 'serie') {
      const req = d.r1 + d.r2 + d.r3;
      return { req, itotal: d.v / req };
    }
    if (_cbModo === 'paralelo') {
      const req = 1 / (1 / d.r1 + 1 / d.r2 + 1 / d.r3);
      return { req, itotal: d.v / req };
    }
    return _cbCalcularMixto(d);
  }
  function _cbEnunciadoDesafio(d) {
    if (_cbModo === 'serie') return `V=${d.v}V, con R₁=${d.r1}Ω, R₂=${d.r2}Ω y R₃=${d.r3}Ω conectadas en serie.`;
    if (_cbModo === 'paralelo') return `V=${d.v}V, con R₁=${d.r1}Ω, R₂=${d.r2}Ω y R₃=${d.r3}Ω conectadas en paralelo.`;
    return `V=${d.v}V, R₁=${d.r1}Ω y R₂=${d.r2}Ω en paralelo, en serie con R₃=${d.r3}Ω.`;
  }
  function _cbFormulaDesafio() {
    if (_cbModo === 'serie') return 'Req = R₁+R₂+R₃ → I = V/Req';
    if (_cbModo === 'paralelo') return '1/Req = 1/R₁+1/R₂+1/R₃ → I = V/Req';
    return 'R₁∥R₂ → Req = (R₁∥R₂)+R₃ → I = V/Req';
  }
  function _renderCbDesafio() {
    const rondas = _cbRondasActuales();
    const modoLabel = _cbModo === 'serie' ? 'serie' : _cbModo === 'paralelo' ? 'paralelo' : 'mixto';
    if (_cbDesafioIdx >= rondas.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${rondas.length} rondas de ${modoLabel}!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const d = rondas[_cbDesafioIdx];
    const pideTexto = d.pide === 'req' ? '¿Cuál es la resistencia equivalente total (Req)?' : '¿Cuál es la corriente total (I_total)?';
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <button class="btn btn-ghost btn-sm" id="cb-ir-explora" style="margin-bottom:.6rem;margin-left:.4rem">← Modo Explora</button>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_cbDesafioIdx + 1} de ${rondas.length} (circuito ${modoLabel})</p>
        <p style="margin-bottom:.6rem">${_cbEnunciadoDesafio(d)}</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">
          ${_cbFormulaDesafio()}
        </div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${pideTexto}</p>
        <input type="number" step="0.01" id="cb-respuesta" placeholder="${d.pide === 'req' ? 'Req (Ω)' : 'I (A)'}" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="cb-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="cb-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 3 — "Power Lab": P=IV, P=I²R, P=V²/R
     ================================================================ */
  const PW_RONDAS = [
    { I: 2, V: 12, pide: 'IV' }, { I: 3, R: 4, pide: 'I2R' },
    { V: 10, R: 5, pide: 'V2R' }, { I: 5, V: 20, pide: 'IV' }
  ];
  let _pwIdx = 0;
  function renderSim3() {
    if (_pwIdx >= PW_RONDAS.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${PW_RONDAS.length} rondas!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim3">← Volver a Simuladores</button></div>`;
    }
    const r = PW_RONDAS[_pwIdx];
    let enunciado = '', formula = '';
    if (r.pide === 'IV') { enunciado = `Un circuito tiene I=${r.I} A y V=${r.V} V.`; formula = 'P = I·V'; }
    else if (r.pide === 'I2R') { enunciado = `Un circuito tiene I=${r.I} A y R=${r.R} Ω.`; formula = 'P = I²·R'; }
    else if (r.pide === 'V2R') { enunciado = `Un circuito tiene V=${r.V} V y R=${r.R} Ω.`; formula = 'P = V²/R'; }
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.6rem">← Volver a Simuladores</button>
        <h3 style="margin:0 0 .3rem">💡 Power Lab MQC</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Ronda ${_pwIdx + 1} de ${PW_RONDAS.length}</p>
        <p style="margin:.6rem 0">${enunciado}</p>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:.7rem 1rem;font-family:var(--font-code);font-size:.85rem;margin-bottom:.8rem">${formula}</div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Cuál es la potencia (P)?</p>
        <input type="number" step="0.01" id="pw-respuesta" placeholder="P (W)" style="width:200px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem">
        <button class="btn btn-primary btn-sm" id="pw-comprobar" style="margin-top:1rem;display:block">Comprobar</button>
        <p id="pw-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  function _pwEsperado(r) {
    if (r.pide === 'IV') return r.I * r.V;
    if (r.pide === 'I2R') return r.I * r.I * r.R;
    if (r.pide === 'V2R') return (r.V * r.V) / r.R;
  }

  /* ================================================================
     Render/bind unificado de Simuladores
     ================================================================ */
  let _simActivo = null;
  function renderSimuladores(unit, uData) {
    if (_simActivo === 'sim1') return `<div class="sim-grid">${renderSim1()}</div>`;
    if (_simActivo === 'sim2') return `<div class="sim-grid">${renderSim2()}</div>`;
    if (_simActivo === 'sim3') return `<div class="sim-grid">${renderSim3()}</div>`;
    const hechos = uData.simsDone || [];
    const metas = [
      { id: 'sim1', titulo: '🔧 Ohm Lab MQC', desc: 'El simulador estrella: controlá V e I, y mirá cómo cambia la resistencia (R=V/I).' },
      { id: 'sim2', titulo: '🔗 Circuit Builder MQC', desc: 'Ajustá la fuente y las resistencias en serie, paralelo o mixto — mirá Req, amperaje y el reparto en vivo, y practicá ejercicios de Modo Desafío en cada tipo.' },
      { id: 'sim3', titulo: '💡 Power Lab MQC', desc: 'Practicá las 3 fórmulas de potencia eléctrica: P=IV, P=I²R, P=V²/R.' }
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
        _ohmModo = 'explora'; _ohmDesafioIdx = 0;
        _cbSubmodo = 'explora'; _cbDesafioIdx = 0;
        _pwIdx = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => { markSimDone(btn.getAttribute('data-sim-cerrar')); _simActivo = null; _rerenderSimTab(unit); });
    });

    /* Sim1 — Ohm Lab */
    const s1v = document.getElementById('ohm-slider-v');
    const s1i = document.getElementById('ohm-slider-i');
    if (s1v) s1v.addEventListener('input', () => { _ohmV = parseInt(s1v.value, 10); _rerenderSimTab(unit); });
    if (s1i) s1i.addEventListener('input', () => { _ohmI = parseInt(s1i.value, 10); _rerenderSimTab(unit); });
    const irDesafio1 = document.getElementById('ohm-ir-desafio');
    if (irDesafio1) irDesafio1.addEventListener('click', () => { _ohmModo = 'desafio'; _ohmDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExplora1 = document.getElementById('ohm-ir-explora');
    if (irExplora1) irExplora1.addEventListener('click', () => { _ohmModo = 'explora'; _rerenderSimTab(unit); });
    const comprobarOhm = document.getElementById('ohm-comprobar');
    if (comprobarOhm) comprobarOhm.addEventListener('click', () => {
      const r = OHM_RONDAS[_ohmDesafioIdx];
      const esperado = _ohmEsperado(r);
      const val = parseFloat(document.getElementById('ohm-respuesta').value);
      const fb = document.getElementById('ohm-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.1;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${_fmt2(esperado)}.`;
        if (ok) setTimeout(() => { _ohmDesafioIdx++; if (_ohmDesafioIdx >= OHM_RONDAS.length) markSimDone('sim1'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim2 — Circuit Builder MQC (rediseñado: interactivo real) */
    document.querySelectorAll('[data-cb-modo]').forEach(btn => {
      btn.addEventListener('click', () => { _cbModo = btn.getAttribute('data-cb-modo'); _cbSubmodo = 'explora'; _rerenderSimTab(unit); markSimDone('sim2'); });
    });
    const s2v = document.getElementById('cb-slider-v');
    const s2r1 = document.getElementById('cb-slider-r1');
    const s2r2 = document.getElementById('cb-slider-r2');
    const s2r3 = document.getElementById('cb-slider-r3');
    if (s2v) s2v.addEventListener('input', () => { _cbV = parseInt(s2v.value, 10); _rerenderSimTab(unit); });
    if (s2r1) s2r1.addEventListener('input', () => { _cbR1 = parseInt(s2r1.value, 10); _rerenderSimTab(unit); });
    if (s2r2) s2r2.addEventListener('input', () => { _cbR2 = parseInt(s2r2.value, 10); _rerenderSimTab(unit); });
    if (s2r3) s2r3.addEventListener('input', () => { _cbR3 = parseInt(s2r3.value, 10); _rerenderSimTab(unit); });
    const irDesafioCb = document.getElementById('cb-ir-desafio');
    if (irDesafioCb) irDesafioCb.addEventListener('click', () => { _cbSubmodo = 'desafio'; _cbDesafioIdx = 0; _rerenderSimTab(unit); });
    const irExploraCb = document.getElementById('cb-ir-explora');
    if (irExploraCb) irExploraCb.addEventListener('click', () => { _cbSubmodo = 'explora'; _rerenderSimTab(unit); });
    const comprobarCb = document.getElementById('cb-comprobar');
    if (comprobarCb) comprobarCb.addEventListener('click', () => {
      const rondas = _cbRondasActuales();
      const d = rondas[_cbDesafioIdx];
      const calc = _cbCalcularDesafio(d);
      const esperado = d.pide === 'req' ? calc.req : calc.itotal;
      const val = parseFloat(document.getElementById('cb-respuesta').value);
      const fb = document.getElementById('cb-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.2;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. Valor real: ${_fmt2(esperado)} ${d.pide === 'req' ? 'Ω' : 'A'}.`;
        if (ok) setTimeout(() => { _cbDesafioIdx++; if (_cbDesafioIdx >= rondas.length) markSimDone('sim2'); _rerenderSimTab(unit); }, 1500);
      }
    });

    /* Sim3 — Power Lab */
    const comprobarPw = document.getElementById('pw-comprobar');
    if (comprobarPw) comprobarPw.addEventListener('click', () => {
      const r = PW_RONDAS[_pwIdx];
      const esperado = _pwEsperado(r);
      const val = parseFloat(document.getElementById('pw-respuesta').value);
      const fb = document.getElementById('pw-feedback');
      const ok = !isNaN(val) && Math.abs(val - esperado) <= 0.1;
      if (fb) {
        fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
        fb.textContent = ok ? '✅ ¡Correcto!' : `💡 No coincide. P real: ${_fmt2(esperado)} W.`;
        if (ok) setTimeout(() => { _pwIdx++; if (_pwIdx >= PW_RONDAS.length) markSimDone('sim3'); _rerenderSimTab(unit); }, 1500);
      }
    });
  }

  /* ================================================================
     JUEGO — "Ingeniero Eléctrico de Circuitos": 7 niveles.
     Sistema unificado desde el inicio (una pregunta a la vez).
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un alambre conduce 70 A de corriente durante 20 segundos.',
      pregunta: '¿Cuánta carga eléctrica (q) pasó por su sección transversal?', pista: 'Usá I=q/t, despejando q.',
      correcta: '1.400 C', opciones: ['1.400 C', '70 C', '20 C', '3,5 C'] },
    { id: 'nivel2', escenario: 'Los electrones dentro de una batería se mueven del polo negativo al positivo (dirección real).',
      pregunta: '¿En qué dirección se dibuja la corriente CONVENCIONAL en los diagramas de circuitos?', pista: 'Recordá la convención histórica de Benjamin Franklin.',
      correcta: 'Del polo positivo al negativo', opciones: ['Del polo positivo al negativo', 'Del polo negativo al positivo', 'En ambas direcciones simultáneamente', 'No tiene una dirección definida'] },
    { id: 'nivel3', escenario: 'Un conductor tiene 20 V aplicados y circulan 4 A por él.',
      pregunta: '¿Cuál es su resistencia (R=V/I)?', pista: 'Dividí el voltaje entre la corriente.',
      correcta: '5 Ω', opciones: ['5 Ω', '80 Ω', '16 Ω', '24 Ω'] },
    { id: 'nivel4', escenario: 'Tres resistencias de 3Ω, 5Ω y 7Ω están conectadas en SERIE.',
      pregunta: '¿Cuál es la resistencia equivalente?', pista: 'En serie, las resistencias se suman aritméticamente.',
      correcta: '15 Ω', opciones: ['15 Ω', '1,49 Ω', '35 Ω', '5 Ω'] },
    { id: 'nivel5', escenario: 'Las mismas tres resistencias (3Ω, 5Ω, 7Ω) ahora están conectadas en PARALELO.',
      pregunta: '¿Cómo es la resistencia equivalente comparada con la conexión en serie?', pista: 'En paralelo, la resistencia equivalente siempre es MENOR que la resistencia más pequeña del grupo.',
      correcta: 'Mucho menor (aproximadamente 1,49 Ω)', opciones: ['Mucho menor (aproximadamente 1,49 Ω)', 'Igual (15 Ω)', 'Mucho mayor (35 Ω)', 'Exactamente el doble'] },
    { id: 'nivel6', escenario: 'Un circuito tiene I=2 A y V=12 V.',
      pregunta: '¿Cuál es la potencia eléctrica (P=I·V)?', pista: 'Multiplicá directamente corriente por voltaje.',
      correcta: '24 W', opciones: ['24 W', '6 W', '14 W', '10 W'] },
    { id: 'nivel7', escenario: 'En un circuito en serie con 3 focos, uno de los focos se funde.',
      pregunta: '¿Qué le pasa a los otros dos focos?', pista: 'En serie, la corriente no tiene otro "camino" que tomar.',
      correcta: 'También se apagan (el circuito se interrumpe por completo)', opciones: ['También se apagan (el circuito se interrumpe por completo)', 'Siguen funcionando normalmente', 'Brillan con más intensidad', 'Solo uno de los otros dos se apaga'] }
  ];
  let _juegoIdx = null; // null = aún no calculado el punto de partida
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
          <h3>✅ ¡Completaste los ${NIVELES_JUEGO.length} niveles!</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Ya resolviste todo el juego de esta unidad.</p>
        </div>`;
    }
    const n = NIVELES_JUEGO[_juegoIdx];
    if (!_juegoOpcionesMezcladas.length) _juegoOpcionesMezcladas = _mezclar(n.opciones);
    return `
      <div class="juego-panel">
        <h3 style="margin:0 0 .3rem">🔌 Ingeniero Eléctrico de Circuitos</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Nivel ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">${n.pregunta}</p>
        <div style="display:grid;gap:.5rem">
          ${_juegoOpcionesMezcladas.map(op => `<button class="btn btn-ghost" data-juego-opcion="${op}">${op}</button>`).join('')}
        </div>
        ${_juegoFeedback ? `<p style="margin-top:.9rem;font-size:.85rem;color:${_juegoFeedback.correcto ? 'var(--green)' : 'var(--gold)'}">${_juegoFeedback.texto}</p>` : ''}
      </div>`;
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
          _juegoFeedback = { texto: `✅ ¡Correcto! ${n.correcta}`, correcto: true };
          setTimeout(() => { _juegoIdx++; _juegoOpcionesMezcladas = []; _juegoFeedback = null; _rerenderJuego(unit); }, 1600);
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
     EXAMEN — banco real (js/data/banco-fix11-u03.js), 20 por intento
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_FIX11_U03 !== 'undefined') ? PREGUNTAS_FIX11_U03 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — FIX11-U03</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 20 al azar.</p>
        <button class="btn btn-primary" id="fix10-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div id="fix10-exam-opts" style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
        <div id="fix10-exam-fb" style="margin-top:1rem"></div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('fix10-iniciar-examen');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const banco = _bancoDisponible().slice();
        for (let i = banco.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [banco[i], banco[j]] = [banco[j], banco[i]]; }
        const seleccionadas = banco.slice(0, Math.min(20, banco.length));
        const preguntasMezcladas = seleccionadas.map(q => {
          const indices = q.opciones.map((_, idx) => idx);
          for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
          return { ...q, opciones: indices.map(idx => q.opciones[idx]), correcta: indices.indexOf(q.correcta) };
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

        const opts = document.getElementById('fix10-exam-opts');
        opts.querySelectorAll('[data-opcion]').forEach(b => {
          const k = parseInt(b.getAttribute('data-opcion'), 10);
          b.disabled = true;
          if (k === q.correcta) b.style.borderColor = 'var(--green)';
          if (k === idx && !ok) b.style.borderColor = 'var(--red)';
        });

        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react(ok ? 'topic-read' : 'answer-wrong'); } catch (e) {} }

        const esUltima = _examEnCurso.i >= _examEnCurso.preguntas.length - 1;
        document.getElementById('fix10-exam-fb').innerHTML = `
          <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                      border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
            <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
            <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion || ''}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="fix10-exam-next" style="margin-top:.8rem">
            ${esUltima ? 'Finalizar examen' : 'Siguiente pregunta →'}
          </button>`;
        document.getElementById('fix10-exam-next').addEventListener('click', () => {
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
    patchUnit({ examBest: Math.max(prevBest, score), examAttempts: (u.examAttempts || 0) + 1, examXpAwarded: u.examXpAwarded || passed });
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
     MISIÓN FINAL — "Diseño de un Circuito Doméstico" (2 fases:
     circuito mixto, replicando el ejemplo exacto del libro)
     ================================================================ */
  const MISION_FASE1 = { r1: 2, r2: 6, rSerie: 3, v: 110 };
  const MISION_FASE2 = { r1: 2, r2: 6, rSerie: 6, v: 110 }; // se duplica la resistencia en serie
  const MISION_D_MIN = 25, MISION_D_MAX = 220;
  let _misionFase = 1;
  let _misionVals = { req: '', itotal: '', texto: '' };

  function _misionEsperado(datos) {
    const rParalelo = 1 / (1 / datos.r1 + 1 / datos.r2);
    const req = rParalelo + datos.rSerie;
    const itotal = datos.v / req;
    return { req, itotal };
  }
  function _misionValida() {
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const esp = _misionEsperado(datos);
    const req = parseFloat(_misionVals.req);
    const itotal = parseFloat(_misionVals.itotal);
    if (isNaN(req) || isNaN(itotal)) return false;
    if (Math.abs(req - esp.req) > 0.2) return false;
    if (Math.abs(itotal - esp.itotal) > 0.5) return false;
    const len = _misionVals.texto.trim().length;
    return len >= MISION_D_MIN && len <= MISION_D_MAX;
  }
  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Diseño de un Circuito Doméstico".</p></div>`;
    }
    const datos = _misionFase === 1 ? MISION_FASE1 : MISION_FASE2;
    const textoLen = _misionVals.texto.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🔌 Misión: Diseño de un Circuito Doméstico ${_misionFase === 2 ? '— Fase 2 (resistencia en serie duplicada)' : ''}</h3>
        <p style="color:var(--text-secondary)">Un circuito mixto: dos resistencias (${datos.r1}Ω y ${datos.r2}Ω) en paralelo, conectadas en serie con una resistencia de ${datos.rSerie}Ω, alimentado con ${datos.v}V.</p>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin:.7rem 0">A. Resistencia equivalente total (Req):
          <input type="number" step="0.01" id="mision-req" value="${_misionVals.req}" placeholder="Ω" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">B. Corriente total del circuito (I=V/Req):
          <input type="number" step="0.01" id="mision-itotal" value="${_misionVals.itotal}" placeholder="A" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.2rem"></label>
        <label style="display:block;font-size:.82rem;color:var(--text-secondary);margin-bottom:.6rem">C. Explicá qué pasaría con la corriente si una de las resistencias en paralelo se desconectara:
          <textarea id="mision-texto" rows="3" maxlength="${MISION_D_MAX}" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:.5rem;margin-top:.25rem;font-family:inherit">${_misionVals.texto}</textarea>
          <span style="font-size:.72rem;color:${textoLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'}">${textoLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</span>
        </label>
        <button class="btn btn-primary" id="fix10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">${_misionFase === 1 ? 'Confirmar Fase 1 →' : 'Entregar misión'}</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }
  function bindMision(unit, uData) {
    const idMap = { req: 'mision-req', itotal: 'mision-itotal', texto: 'mision-texto' };
    Object.keys(idMap).forEach(key => {
      const el = document.getElementById(idMap[key]);
      if (el) el.addEventListener('input', () => {
        _misionVals[key] = el.value;
        const btn = document.getElementById('fix10-entregar-mision');
        if (btn) {
          const valido = _misionValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    });
    const btn = document.getElementById('fix10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte.';
          return;
        }
        if (_misionFase === 1) {
          _misionFase = 2;
          _misionVals = { req: '', itotal: '', texto: '' };
          const tc = document.getElementById('tab-content');
          if (tc) { tc.innerHTML = renderMision(unit, loadUnitData()); bindMision(unit, loadUnitData()); }
          return;
        }
        patchUnit({ missionDone: true });
        awardXP('fisica10-mission-done');
        const tc = document.getElementById('tab-content');
        if (tc) tc.innerHTML = renderMision(unit, loadUnitData());
      });
    }
  }

  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
