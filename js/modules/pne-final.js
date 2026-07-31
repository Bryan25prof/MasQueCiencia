/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/modules/pne-final.js  |  Módulo: Desafío Final PNE
   ================================================================
   HOTFIX-02 — Experiencia final desbloqueable y acumulativa.
   NO es una Unidad X curricular: no está en UNIDADES_DATA, no tiene
   teoría/simuladores/juego — es directamente una experiencia de
   examen que combina preguntas balanceadas de las 9 unidades.
   Registra el módulo con nombre 'pne-final'.
================================================================ */

Router.register('pne-final', (() => {
  'use strict';

  const UNIT_IDS = ['unit-01','unit-02','unit-03','unit-04','unit-05','unit-06','unit-07','unit-08','unit-09'];
  const UNIT_NAMES = {
    'unit-01':'Naturaleza de la Materia','unit-02':'Estructura Atómica','unit-03':'Tabla Periódica',
    'unit-04':'Enlace Químico','unit-05':'Nomenclatura Química','unit-06':'Estequiometría',
    'unit-07':'Soluciones','unit-08':'Ácidos y Bases','unit-09':'Oxidación y Reducción'
  };
  const TOTAL_QUESTIONS = 30;
  const MIN_PER_UNIT = 3;
  const TIME_MIN = 45;
  /* Cambio explícito a pedido del usuario: antes exigía 9/9, ahora un
     mínimo de 5 de las 9 unidades aprobadas. */
  const MIN_UNITS_REQUIRED = 5;
  const PASS_PCT = (typeof UNIDADES_DATA !== 'undefined' && UNIDADES_DATA[0] && UNIDADES_DATA[0].exam)
    ? UNIDADES_DATA[0].exam.pass : 70;

  let exam = null;
  let _startTs = null;

  function _shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _bankFor(unitId) {
    const n = unitId.split('-')[1];
    const varName = 'PREGUNTAS_U' + n;
    return (typeof window[varName] !== 'undefined') ? window[varName].slice() : [];
  }

  function _unlockStatus() {
    const data = Storage.load();
    let passed = 0;
    UNIT_IDS.forEach(id => {
      const uData = data.units[id] || {};
      const meta = (typeof UNIDADES_DATA !== 'undefined') ? UNIDADES_DATA.find(u => u.id === id) : null;
      const passMin = (meta && meta.exam && meta.exam.pass) || 70;
      if ((uData.examBest || 0) >= passMin) passed++;
    });
    return { passed, total: UNIT_IDS.length, unlocked: passed >= MIN_UNITS_REQUIRED };
  }

  function _buildAttempt() {
    const data = Storage.load();
    const lastIds = new Set((data.pne && data.pne.lastAttemptQuestionIds) || []);
    const banksByUnit = {};
    UNIT_IDS.forEach(id => { banksByUnit[id] = _bankFor(id); });

    let selected = [];
    UNIT_IDS.forEach(id => {
      const bank = banksByUnit[id];
      const fresh = bank.filter(q => !lastIds.has(q.id));
      const pool = fresh.length >= MIN_PER_UNIT ? fresh : bank;
      const picked = _shuffle(pool).slice(0, MIN_PER_UNIT);
      selected = selected.concat(picked);
    });

    const selectedIds = new Set(selected.map(q => q.id));
    let remaining = [];
    UNIT_IDS.forEach(id => {
      banksByUnit[id].forEach(q => { if (!selectedIds.has(q.id)) remaining.push(q); });
    });
    const remainingFresh = remaining.filter(q => !lastIds.has(q.id));
    const extraPool = remainingFresh.length >= (TOTAL_QUESTIONS - selected.length) ? remainingFresh : remaining;
    const extra = _shuffle(extraPool).slice(0, TOTAL_QUESTIONS - selected.length);
    selected = selected.concat(extra);
    selected = _shuffle(selected);

    selected = selected.map(q => {
      const unitId = 'unit-0' + q.unidad;
      const presented = (typeof PNEBank !== 'undefined') ? PNEBank.present(unitId, q) : q;
      const order = presented.opciones.map((_, i) => i);
      const shuffledOrder = _shuffle(order);
      const clone = Object.assign({}, presented);
      clone.opciones = shuffledOrder.map(i => presented.opciones[i]);
      clone.correcta = shuffledOrder.indexOf(presented.correcta);
      if (Array.isArray(presented.explicacion_incorrectas)) {
        clone.explicacion_incorrectas = shuffledOrder.map(i => presented.explicacion_incorrectas[i]);
      }
      clone._unitId = unitId;
      return clone;
    });

    return selected;
  }

  function _renderLocked(status) {
    return `
      <div class="section-header"><p class="section-title">Desafío Final</p><h2 class="section-heading">PNE — Prueba Nacional Estandarizada</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;text-align:center;max-width:520px;margin:0 auto">
        <div style="font-size:2.4rem">🔒</div>
        <h3 style="margin:.5rem 0">Todavía no está desbloqueado</h3>
        <p style="color:var(--text-secondary);font-size:.9rem">Aprueba los exámenes de al menos ${MIN_UNITS_REQUIRED} de las 9 unidades para desbloquear el Desafío PNE.</p>
        <div class="progress-bar" style="margin:1rem 0"><div class="progress-fill progress-fill-cyan" style="width:${Math.round((status.passed/status.total)*100)}%"></div></div>
        <p style="font-family:var(--font-code);color:var(--text-muted)">${status.passed}/${status.total} unidades aprobadas</p>
        <button class="btn btn-ghost" id="pne-back">← Volver a Unidades</button>
      </div>`;
  }

  function _renderInstructions() {
    const data = Storage.load();
    const pne = data.pne || {};
    const isGuest = (typeof MQCProfiles !== 'undefined' && MQCProfiles.isGuest && MQCProfiles.isGuest());
    return `
      <div class="section-header"><p class="section-title">Desafío Final</p><h2 class="section-heading">🏆 PNE — Prueba Nacional Estandarizada</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:600px;margin:0 auto;text-align:center">
        <p style="color:var(--text-secondary);font-size:.92rem;line-height:1.6">
          Este es el desafío final: <strong>${TOTAL_QUESTIONS} preguntas</strong> tomadas de las <strong>9 unidades</strong>
          (al menos ${MIN_PER_UNIT} de cada una), en <strong>${TIME_MIN} minutos</strong>, con aprobación del <strong>${PASS_PCT}%</strong>.
          Cada intento es una combinación distinta — no vas a ver siempre el mismo examen.
        </p>
        ${isGuest ? `<p style="color:var(--gold);font-size:.8rem;margin-top:.8rem">⚠️ Estás en modo invitado: tus estadísticas de este intento no se guardarán permanentemente si cerrás la sesión.</p>` : ''}
        ${pne.attempts > 0 ? `
          <div style="display:flex;gap:1rem;justify-content:center;margin:1.2rem 0;flex-wrap:wrap">
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1rem">
              <div style="font-size:.7rem;color:var(--text-muted)">Mejor puntuación</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--xp-gold, #F9FF4D)">${pne.bestScore}/100</div>
            </div>
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1rem">
              <div style="font-size:.7rem;color:var(--text-muted)">Intentos</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900">${pne.attempts}</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" id="pne-view-stats">📊 Ver estadísticas PNE</button><br><br>
        ` : ''}
        <button class="btn btn-primary" id="pne-start">▶ Comenzar desafío</button>
        <br><button class="btn btn-ghost btn-sm" id="pne-back" style="margin-top:.6rem">← Volver a Unidades</button>
      </div>`;
  }

  function _startAttempt() {
    if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react('loading'); } catch (e) {} }
    setTimeout(() => {
      const qs = _buildAttempt();
      exam = { qs, i: 0, answers: [], remaining: TIME_MIN * 60, timerId: null };
      _startTs = Date.now();
      if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react('challenge-start'); } catch (e) {} }
      exam.timerId = setInterval(_tick, 1000);
      _drawQuestion();
    }, 350);
    const root = document.getElementById('content');
    if (root) {
      root.innerHTML = `<div style="text-align:center;padding:3rem"><div style="font-size:2rem">🧪</div><p style="color:var(--text-secondary)">Preparando tu Desafío Final…</p></div>`;
    }
  }

  function _tick() {
    if (!exam) return;
    exam.remaining--;
    const el = document.getElementById('pne-exam-timer');
    if (el) {
      const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
      const s = String(exam.remaining % 60).padStart(2, '0');
      el.textContent = `⏱ ${m}:${s}`;
      if (exam.remaining <= 60) el.style.color = 'var(--red)';
    }
    if (exam.remaining <= 0) _finishAttempt();
  }

  function _stopSpeech() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  function _drawQuestion() {
    const root = document.getElementById('content');
    if (!root || !exam) return;
    const q = exam.qs[exam.i];
    const m = String(Math.floor(exam.remaining / 60)).padStart(2, '0');
    const s = String(exam.remaining % 60).padStart(2, '0');
    const voiceOn = (typeof PNE !== 'undefined' && PNE.isEnabled && PNE.isEnabled('lectura-voz'));

    root.innerHTML = `
      <div id="pne-exam-root" style="animation:pageIn .4s ease;max-width:640px;margin:0 auto">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
          <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">
            Pregunta ${exam.i + 1} / ${exam.qs.length} · ${UNIT_NAMES[q._unitId] || q._unitId}
          </span>
          <span id="pne-exam-timer" style="font-family:var(--font-code);font-size:.85rem;color:var(--xp-gold, #F9FF4D)">⏱ ${m}:${s}</span>
        </div>
        <div class="progress-bar" style="margin-bottom:1rem">
          <div class="progress-fill progress-fill-cyan" style="width:${(exam.i / exam.qs.length) * 100}%"></div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.6rem;margin-bottom:.8rem">
            <div style="font-size:1rem;font-weight:700;color:var(--text-primary);line-height:1.5">${q.pregunta}</div>
            ${voiceOn ? `<button class="btn btn-ghost btn-sm" id="pne-speak-btn" title="Leer en voz alta" style="flex-shrink:0">🔊</button>` : ''}
          </div>
          ${voiceOn ? `<button class="btn btn-ghost btn-sm" id="pne-stop-speak-btn" style="margin-bottom:.6rem">⏹ Detener lectura</button>` : ''}
          <div id="pne-exam-opts" style="display:flex;flex-direction:column;gap:.5rem">
            ${q.opciones.map((op, k) => `
              <button class="btn btn-ghost" data-opt="${k}"
                      style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
                <strong style="margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${op}
              </button>`).join('')}
          </div>
          <div id="pne-exam-fb" style="margin-top:1rem"></div>
        </div>
      </div>`;

    root.querySelectorAll('[data-opt]').forEach(b =>
      b.addEventListener('click', () => _answerQuestion(parseInt(b.getAttribute('data-opt'), 10))));

    const speakBtn = document.getElementById('pne-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        const optsText = q.opciones.map((op, k) => `Opción ${String.fromCharCode(65 + k)}: ${op}.`).join(' ');
        if (typeof PNE !== 'undefined' && PNE.speak) PNE.speak(q.pregunta + '. ' + optsText);
      });
    }
    const stopBtn = document.getElementById('pne-stop-speak-btn');
    if (stopBtn) stopBtn.addEventListener('click', _stopSpeech);
  }

  function _answerQuestion(choice) {
    const q = exam.qs[exam.i];
    const ok = choice === q.correcta;
    exam.answers.push({ id: q.id, unitId: q._unitId, choice, ok });
    _stopSpeech();

    const opts = document.getElementById('pne-exam-opts');
    opts.querySelectorAll('[data-opt]').forEach(b => {
      const k = parseInt(b.getAttribute('data-opt'), 10);
      b.disabled = true;
      if (k === q.correcta) b.style.borderColor = 'var(--green)';
      if (k === choice && !ok) b.style.borderColor = 'var(--red)';
    });

    const expWrong = (q.explicacion_incorrectas && q.explicacion_incorrectas[choice]) || '';
    document.getElementById('pne-exam-fb').innerHTML = `
      <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                  border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
        <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
        <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion_correcta || ''}</p>
        ${(!ok && expWrong) ? `<p style="margin:.35rem 0 0;color:var(--text-muted);font-size:.82rem">${expWrong}</p>` : ''}
      </div>
      <button class="btn btn-primary btn-sm" id="pne-exam-next" style="margin-top:.8rem">
        ${exam.i < exam.qs.length - 1 ? 'Siguiente pregunta →' : 'Finalizar Desafío'}
      </button>`;
    document.getElementById('pne-exam-next').addEventListener('click', () => {
      if (exam.i < exam.qs.length - 1) { exam.i++; _drawQuestion(); }
      else _finishAttempt();
    });
  }

  function _finishAttempt() {
    if (!exam) return;
    clearInterval(exam.timerId);
    _stopSpeech();
    const timeUsedSec = Math.round((Date.now() - _startTs) / 1000);

    const total = exam.qs.length;
    const correct = exam.answers.filter(a => a.ok).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= PASS_PCT;

    const perUnitStats = {};
    UNIT_IDS.forEach(id => { perUnitStats[id] = { correct: 0, total: 0 }; });
    const missedIds = [];
    exam.answers.forEach(a => {
      if (!perUnitStats[a.unitId]) perUnitStats[a.unitId] = { correct: 0, total: 0 };
      perUnitStats[a.unitId].total++;
      if (a.ok) perUnitStats[a.unitId].correct++;
      else missedIds.push(a.id);
    });

    const data = Storage.load();
    const pne = data.pne;
    const prevBest = pne.bestScore || 0;
    const wasFirstAttempt = pne.attempts === 0;
    const isFirstPass = passed && pne.passCount === 0;
    const improved = score > prevBest;

    pne.attempts += 1;
    pne.lastAttemptTs = Date.now();
    if (wasFirstAttempt) pne.firstAttemptTs = pne.lastAttemptTs;
    pne.lastScore = score;
    if (improved) pne.bestScore = score;
    if (passed) pne.passCount += 1; else pne.failCount += 1;
    pne.scoreHistory.push({ score, passed, ts: Date.now() });
    if (pne.scoreHistory.length > 20) pne.scoreHistory = pne.scoreHistory.slice(-20);

    Object.keys(perUnitStats).forEach(id => {
      const s = perUnitStats[id];
      const u = pne.perUnit[id] || { best: 0, correctSum: 0, totalSum: 0, errors: 0 };
      u.correctSum += s.correct;
      u.totalSum += s.total;
      u.errors += (s.total - s.correct);
      const pct = s.total ? Math.round((s.correct / s.total) * 100) : u.best;
      u.best = Math.max(u.best, pct);
      pne.perUnit[id] = u;
    });

    pne.lastAttemptQuestionIds = exam.qs.map(q => q.id);
    pne.recentMissedQuestionIds = (pne.recentMissedQuestionIds || []).concat(missedIds).slice(-15);

    Storage.set('pne', pne);

    if (typeof Gamification !== 'undefined' && Gamification.addXP) {
      if (isFirstPass) {
        Gamification.addXP('pne-first-pass');
      } else if (improved) {
        Gamification.addXP('pne-improved');
      }
      Gamification.checkBadges();
    }

    if (typeof Photon !== 'undefined') {
      try {
        if (score >= 90) Photon.setState('nivel');
        else if (passed) Photon.react('exam-passed');
        else Photon.react('exam-failed');
      } catch (e) {}
    }

    _renderResults(score, correct, total, passed, perUnitStats, timeUsedSec);
    exam = null;
  }

  function _renderResults(score, correct, total, passed, perUnitStats, timeUsedSec) {
    const root = document.getElementById('content');
    if (!root) return;

    const unitRows = UNIT_IDS.map(id => {
      const s = perUnitStats[id];
      const pct = s.total ? Math.round((s.correct / s.total) * 100) : null;
      return { id, name: UNIT_NAMES[id], pct, total: s.total };
    }).filter(r => r.total > 0);

    const sorted = unitRows.slice().sort((a, b) => b.pct - a.pct);
    const strengths = sorted.slice(0, 2);
    const weaknesses = sorted.slice(-2).reverse();

    const m = Math.floor(timeUsedSec / 60), s = timeUsedSec % 60;

    root.innerHTML = `
      <div style="max-width:640px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);
                  border-radius:var(--radius-lg);padding:1.75rem;text-align:center;animation:pageIn .4s ease">
        <div style="font-size:2.8rem">${passed ? '🎉' : '📚'}</div>
        <h3 style="margin:.4rem 0">${passed ? '¡Desafío Superado!' : 'Sigue practicando'}</h3>
        <div style="font-family:var(--font-display);font-size:2.4rem;font-weight:900;
                    color:${score >= 90 ? 'var(--xp-gold, #F9FF4D)' : score >= 70 ? 'var(--green)' : 'var(--red)'}">${score}/100</div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">
          ${correct} de ${total} correctas · aprobación ${PASS_PCT}% · tiempo: ${m}m ${s}s
        </p>
        <div style="text-align:left;background:var(--bg-deep);border-radius:var(--radius-md);padding:1rem;margin-bottom:1rem">
          <div style="font-weight:700;font-size:.85rem;margin-bottom:.5rem">Desempeño por unidad</div>
          ${unitRows.map(r => `
            <div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.25rem 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--text-secondary)">${r.name}</span>
              <span style="color:${r.pct>=70?'var(--green)':'var(--red)'}">${r.pct}%</span>
            </div>`).join('')}
        </div>
        ${strengths.length ? `<p style="font-size:.82rem;color:var(--green)">💪 Fortaleza: ${strengths.map(s=>s.name).join(', ')}</p>` : ''}
        ${weaknesses.length ? `<p style="font-size:.82rem;color:var(--gold)">📌 Áreas de refuerzo: ${weaknesses.map(s=>s.name).join(', ')}</p>` : ''}
        <button class="btn btn-primary btn-sm" id="pne-retry">↻ Intentar nuevamente</button>
        <button class="btn btn-ghost btn-sm" id="pne-stats-btn">📊 Estadísticas PNE</button>
        <button class="btn btn-ghost btn-sm" id="pne-back">← Volver a Unidades</button>
      </div>`;

    document.getElementById('pne-retry').addEventListener('click', _startAttempt);
    document.getElementById('pne-stats-btn').addEventListener('click', () => _showStats(weaknesses));
    document.getElementById('pne-back').addEventListener('click', () => Router.navigate('units'));
  }

  function _showStats(weakUnitsHint) {
    const root = document.getElementById('content');
    if (!root) return;
    const data = Storage.load();
    const pne = data.pne || {};

    const unitRows = UNIT_IDS.map(id => {
      const u = pne.perUnit[id] || { best: 0, correctSum: 0, totalSum: 0, errors: 0 };
      const avg = u.totalSum ? Math.round((u.correctSum / u.totalSum) * 100) : null;
      return { id, name: UNIT_NAMES[id], best: u.best, avg, errors: u.errors };
    });
    const withData = unitRows.filter(r => r.avg !== null);
    const weakest = withData.slice().sort((a, b) => a.avg - b.avg).slice(0, 3);

    const avgTotal = pne.scoreHistory && pne.scoreHistory.length
      ? Math.round(pne.scoreHistory.reduce((a, h) => a + h.score, 0) / pne.scoreHistory.length) : 0;

    root.innerHTML = `
      <div class="section-header"><p class="section-title">Desafío Final</p><h2 class="section-heading">📊 Estadísticas PNE</h2></div>
      <div style="max-width:640px;margin:0 auto">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:.7rem;margin-bottom:1.2rem">
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.8rem;text-align:center">
            <div style="font-size:.7rem;color:var(--text-muted)">Último resultado</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900">${pne.lastScore || 0}/100</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.8rem;text-align:center">
            <div style="font-size:.7rem;color:var(--text-muted)">Mejor resultado</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--xp-gold, #F9FF4D)">${pne.bestScore || 0}/100</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.8rem;text-align:center">
            <div style="font-size:.7rem;color:var(--text-muted)">Promedio</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900">${avgTotal}/100</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.8rem;text-align:center">
            <div style="font-size:.7rem;color:var(--text-muted)">Intentos</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900">${pne.attempts || 0}</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:.8rem;text-align:center">
            <div style="font-size:.7rem;color:var(--text-muted)">Aprobaciones</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--green)">${pne.passCount || 0}</div>
          </div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem;margin-bottom:1rem">
          <div style="font-weight:700;font-size:.88rem;margin-bottom:.6rem">Desempeño por unidad</div>
          ${withData.length === 0 ? `<p style="color:var(--text-muted);font-size:.82rem">Todavía no hay datos suficientes.</p>` : withData.map(r => `
            <div style="display:flex;justify-content:space-between;font-size:.82rem;padding:.3rem 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--text-secondary)">${r.name}</span>
              <span>mejor: ${r.best}% · promedio: ${r.avg}%</span>
            </div>`).join('')}
        </div>
        ${weakest.length ? `<p style="font-size:.85rem;color:var(--gold);margin-bottom:1rem">📌 Áreas de refuerzo: ${weakest.map(w=>w.name).join(', ')}</p>` : ''}
        <div style="text-align:center">
          <button class="btn btn-primary btn-sm" id="pne-retry-2">↻ Intentar nuevamente</button>
          <button class="btn btn-ghost btn-sm" id="pne-review-weak">📌 Revisar áreas de refuerzo</button>
          <button class="btn btn-ghost btn-sm" id="pne-back-2">← Volver a Unidades</button>
        </div>
      </div>`;

    document.getElementById('pne-retry-2').addEventListener('click', _startAttempt);
    document.getElementById('pne-back-2').addEventListener('click', () => Router.navigate('units'));
    document.getElementById('pne-review-weak').addEventListener('click', () => {
      const target = (weakest[0] && weakest[0].id) || (weakUnitsHint && weakUnitsHint[0] && weakUnitsHint[0].id);
      if (target) Router.navigate('units', { unitId: target });
      else Router.navigate('units');
    });
  }

  function init() {
    const content = document.getElementById('content');
    if (!content) return;
    const status = _unlockStatus();
    if (!status.unlocked) {
      content.innerHTML = _renderLocked(status);
    } else {
      content.innerHTML = _renderInstructions();
    }
    const back = document.getElementById('pne-back');
    if (back) back.addEventListener('click', () => Router.navigate('units'));
    const start = document.getElementById('pne-start');
    if (start) start.addEventListener('click', _startAttempt);
    const viewStats = document.getElementById('pne-view-stats');
    if (viewStats) viewStats.addEventListener('click', () => _showStats([]));
  }

  function destroy() {
    if (exam && exam.timerId) clearInterval(exam.timerId);
    _stopSpeech();
    exam = null;
  }

  return { init, destroy };
})());
