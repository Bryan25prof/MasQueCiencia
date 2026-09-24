/* ================================================================
   MÁSQUECIENCIA — js/modules/suficiencia.js
   Módulo: Examen de Suficiencia (Finales/Suficiencia — Fase 2)
   ================================================================
   Registra el módulo con nombre 'suficiencia', ÚNICO para los 4
   cursos (Química 10.º/11.º, Física 10.º/11.º) — se parametriza vía
   Router.navigate('suficiencia', { curso: 'q10'|'q11'|'fix10'|'fix11' }).
   Reutiliza el componente CSS .mqc-exam-nav (main.css) y el patrón de
   navegación libre de preguntas ya probado en simulacro-nacional.js.

   NO llama a Gamification.addXP en ningún punto — decisión explícita
   de Bryan (2026-09-15): aprobar solo otorga una credencial visible,
   nunca XP ni desbloqueos. Persistencia exclusiva en
   data.suficiencia.<curso> (ver storage.js) — nunca toca
   data.units/grade11/fisica10/fisica11/pne.
================================================================ */

Router.register('suficiencia', (() => {
  'use strict';

  const E = window.SuficienciaEngine;

  const RUTA_VOLVER = { q10: 'units', q11: 'grade11', fix10: 'fisica10', fix11: 'fisica11' };

  let _curso = 'q10';
  let _vista = 'entrada';   // 'entrada' | 'examen' | 'resultados'
  let _intento = null;      // { preguntas, respuestas: {id: idxElegido}, indice }
  let _ultimoResultado = null;

  /* ================================================================
     PERSISTENCIA — mismo patrón exacto que simulacroNacional
     (Storage.get/set), pero anidado un nivel más (por curso).
     ================================================================ */
  function _vacio() {
    return {
      acreditado: false, acreditadoAt: null, attempts: 0, passCount: 0,
      failCount: 0, bestScore: 0, lastScore: 0, lastAttemptQuestionIds: [], historial: []
    };
  }
  function _cargar() {
    const data = Storage.load();
    return (data.suficiencia && data.suficiencia[_curso]) || _vacio();
  }
  function _guardar(obj) {
    // PENDIENTE D — paso 2 (AccessControl, decisión 2 de Bryan: mismo
    // principio "DOCENTE EXPLORA; ESTUDIANTE PROGRESA" aplicado a
    // Suficiencia). Un docente verificado puede presentar el examen y
    // ver su resultado (_ultimoResultado en memoria, nunca releído de
    // Storage), pero acreditado/bestScore/historial nunca se persisten.
    if (typeof AccessControl !== 'undefined' && AccessControl.isTeacher && AccessControl.isTeacher()) return;
    const data = Storage.load();
    const suf = Object.assign({}, data.suficiencia, { [_curso]: obj });
    Storage.set('suficiencia', suf);
  }

  function _esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function _escAttr(s) { return _esc(s).replace(/"/g, '&quot;'); }

  /* ================================================================
     PANTALLA 0 — ENTRADA (sin candado: la Suficiencia está pensada
     para poder intentarse en cualquier momento, sin depender de
     completar el curso — es una vía alterna de demostrar dominio). */
  function _renderEntrada() {
    const info = E.cursoInfo(_curso);
    if (!info) return `<div class="placeholder-page"><span class="placeholder-icon">⚠️</span><h2>Curso no reconocido</h2></div>`;
    const chk = E.bancosDisponibles(_curso);
    const suf = _cargar();
    const isGuest = (typeof MQCProfiles !== 'undefined' && MQCProfiles.isGuest && MQCProfiles.isGuest());

    if (!chk.ok) {
      return `
        <div class="section-header"><p class="section-title">Suficiencia</p><h2 class="section-heading">🏅 Suficiencia · ${_esc(info.label)}</h2></div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;text-align:center;max-width:520px;margin:0 auto">
          <div style="font-size:2rem">⚠️</div>
          <h3 style="margin:.5rem 0">Banco incompleto</h3>
          <p style="color:var(--text-secondary);font-size:.9rem">Todavía no hay suficientes preguntas cargadas para armar este examen (${chk.total}/${chk.requerido}). Contactá al equipo de contenido.</p>
          <button class="btn btn-ghost" id="suf-back">← Volver</button>
        </div>`;
    }

    const pctAprob = Math.round((E.ACIERTOS_APROBACION / E.CANTIDAD_PREGUNTAS) * 100);

    return `
      <div class="section-header"><p class="section-title">Suficiencia</p><h2 class="section-heading">🏅 Suficiencia · ${_esc(info.label)}</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:600px;margin:0 auto;text-align:center">
        <p style="color:var(--text-secondary);font-size:.92rem;line-height:1.6">
          Examen de suficiencia de <strong>${_esc(info.label)}</strong>: <strong>${E.CANTIDAD_PREGUNTAS} preguntas</strong> tomadas de
          las <strong>${info.unidades.length} unidades</strong> del curso, sin límite de tiempo. Necesitás
          <strong>${E.ACIERTOS_APROBACION}/${E.CANTIDAD_PREGUNTAS}</strong> (${pctAprob}%) para acreditar.
        </p>
        <p style="color:var(--text-muted);font-size:.8rem;margin-top:.6rem">
          Aprobar aquí NO otorga XP ni desbloquea nada — es una vía alterna para demostrar dominio del curso.
          Podés intentarlo las veces que quieras; una vez acreditado, queda guardado para siempre.
        </p>
        ${isGuest ? `<p style="color:var(--gold);font-size:.8rem;margin-top:.8rem">⚠️ Estás en modo invitado: tu resultado no se guardará permanentemente si cerrás la sesión.</p>` : ''}
        ${suf.acreditado ? `
          <div style="margin:1.2rem 0;background:rgba(92,242,168,.12);border:1px solid var(--green);border-radius:var(--radius-md);padding:1rem">
            <div style="font-size:1.7rem">🏅</div>
            <strong style="color:var(--green)">DOMINIO ACREDITADO POR SUFICIENCIA</strong>
            <p style="font-size:.78rem;color:var(--text-muted);margin-top:.3rem">Acreditado el ${new Date(suf.acreditadoAt).toLocaleDateString('es-CR')}</p>
          </div>` : ''}
        ${suf.attempts > 0 ? `
          <div style="display:flex;gap:1rem;justify-content:center;margin:1.2rem 0;flex-wrap:wrap">
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1rem">
              <div style="font-size:.7rem;color:var(--text-muted)">Mejor puntuación</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--xp-gold, #F9FF4D)">${suf.bestScore}/100</div>
            </div>
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1rem">
              <div style="font-size:.7rem;color:var(--text-muted)">Intentos</div>
              <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900">${suf.attempts}</div>
            </div>
          </div>` : ''}
        <button class="btn btn-primary" id="suf-start">▶ ${suf.attempts > 0 ? 'Intentar de nuevo' : 'Comenzar examen de suficiencia'}</button>
        <br><button class="btn btn-ghost btn-sm" id="suf-back" style="margin-top:.6rem">← Volver</button>
      </div>`;
  }

  function _bindEntrada() {
    const start = document.getElementById('suf-start');
    if (start) start.addEventListener('click', _iniciarIntento);
    const back = document.getElementById('suf-back');
    if (back) back.addEventListener('click', () => Router.navigate(RUTA_VOLVER[_curso] || 'home'));
  }

  function _iniciarIntento() {
    const suf = _cargar();
    let preguntas;
    try {
      preguntas = E.construirIntento(_curso, suf.lastAttemptQuestionIds);
    } catch (e) {
      console.error('[Suficiencia]', e);
      return;
    }
    _intento = { preguntas, respuestas: {}, indice: 0 };
    _vista = 'examen';
    _rerender();
  }

  /* ================================================================
     PANTALLA 1 — EXAMEN (navegación libre, reutiliza .mqc-exam-nav)
     ================================================================ */
  function _renderExamen() {
    const total = _intento.preguntas.length;
    const q = _intento.preguntas[_intento.indice];
    const contestadas = Object.keys(_intento.respuestas).length;
    const esUltima = _intento.indice === total - 1;

    return `
      <div id="suf-examen-root" style="max-width:760px;margin:0 auto;animation:pageIn .3s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.4rem;margin-bottom:.5rem">
          <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">${_esc(q.unidadNombre)} · Pregunta ${_intento.indice + 1} de ${total}</span>
          <span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">Contestadas: ${contestadas} / ${total}</span>
        </div>
        <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill progress-fill-cyan" style="width:${(contestadas / total) * 100}%"></div></div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem">
          <div style="font-size:.7rem;color:var(--text-muted);font-family:var(--font-code);margin-bottom:.5rem">PREGUNTA ${q.numero} / ${total}</div>
          <div style="font-size:1rem;color:var(--text-primary);line-height:1.6;margin-bottom:1rem;white-space:pre-line">${_esc(q.pregunta)}</div>
          ${q.formula ? `<div style="font-family:var(--font-code);background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem .9rem;margin-bottom:.9rem;text-align:center">${_esc(q.formula)}</div>` : ''}
          ${q.imagen ? `<div style="text-align:center;margin-bottom:.9rem"><img src="${_escAttr(q.imagen)}" alt="" style="max-width:100%;max-height:260px;border-radius:var(--radius-md)"></div>` : ''}
          <div id="suf-opciones" style="display:flex;flex-direction:column;gap:.55rem">
            ${q.opciones.map((op, k) => `
              <button class="btn ${_intento.respuestas[q.id] === op.id ? 'btn-primary' : 'btn-ghost'}" data-opcion="${_escAttr(op.id)}"
                      style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
                <strong style="margin-right:.5rem">${String.fromCharCode(65 + k)}</strong> ${_esc(op.texto)}
              </button>`).join('')}
          </div>
        </div>

        <div class="mqc-exam-nav">
          <div class="mqc-exam-nav__group">
            <button class="btn btn-ghost btn-sm" id="suf-anterior" ${_intento.indice === 0 ? 'disabled' : ''}>← Anterior</button>
            <button class="btn btn-ghost btn-sm" id="suf-abrir-navegador">🔢 Ver todas las preguntas</button>
            ${esUltima
              ? `<button class="btn btn-primary btn-sm" id="suf-siguiente-o-entregar">Entregar examen ✓</button>`
              : `<button class="btn btn-ghost btn-sm" id="suf-siguiente-o-entregar">Siguiente →</button>`}
          </div>
          <div class="mqc-exam-nav__submit">
            <button class="btn btn-primary btn-sm" id="suf-entregar">Entregar examen</button>
          </div>
        </div>
        <div id="suf-navegador-overlay"></div>
      </div>`;
  }

  function _renderCelda(p, i) {
    const contestada = _intento.respuestas[p.id] !== undefined;
    const estado = contestada ? 'contestada' : (i === _intento.indice ? 'actual' : 'pendiente');
    const color = estado === 'contestada' ? 'var(--green)' : (estado === 'actual' ? 'var(--cyan, #1FDBFF)' : 'var(--border)');
    const bg = estado === 'actual' ? 'rgba(31,219,255,.12)' : 'transparent';
    return `<button class="sn-nav-celda" data-indice="${i}" title="${_escAttr(p.unidadNombre)} · Pregunta ${i + 1}"
              style="width:32px;height:32px;border-radius:6px;border:2px solid ${color};background:${bg};
                     color:var(--text-primary);font-family:var(--font-code);font-size:.72rem;cursor:pointer">
              ${i + 1}
            </button>`;
  }

  function _renderNavegador() {
    const info = E.cursoInfo(_curso);
    return `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;display:flex;align-items:center;justify-content:center;padding:1rem" id="suf-nav-backdrop">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;max-width:520px;width:100%;max-height:80vh;overflow-y:auto;-webkit-overflow-scrolling:touch">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem">
            <strong>Navegador de preguntas</strong>
            <button class="btn btn-ghost btn-sm" id="suf-cerrar-navegador">✕</button>
          </div>
          <div style="display:flex;gap:.8rem;font-size:.75rem;color:var(--text-secondary);margin-bottom:.8rem;flex-wrap:wrap">
            <span>🟩 Contestada</span><span>⬜ Pendiente</span><span>🔷 Actual</span>
          </div>
          ${info.unidades.map(u => {
            const preguntasUnidad = _intento.preguntas.map((p, i) => ({ p, i })).filter(x => x.p.unidadId === u.id);
            if (!preguntasUnidad.length) return '';
            return `
            <div style="margin-bottom:.6rem">
              <div style="font-size:.75rem;color:var(--text-secondary);font-weight:700;margin-bottom:.3rem">${_esc(u.nombre)}</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(32px,1fr));gap:.35rem">
                ${preguntasUnidad.map(x => _renderCelda(x.p, x.i)).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function _bindExamen() {
    document.querySelectorAll('#suf-opciones [data-opcion]').forEach(b => {
      b.addEventListener('click', () => {
        const q = _intento.preguntas[_intento.indice];
        _intento.respuestas[q.id] = b.getAttribute('data-opcion'); // id estable de la opción, no un índice (AUDITORÍA FASE 2 — Motor de examen unificado)
        _drawExamen();
      });
    });
    const ant = document.getElementById('suf-anterior');
    if (ant) ant.addEventListener('click', () => { if (_intento.indice > 0) { _intento.indice--; _drawExamen(); } });
    const sig = document.getElementById('suf-siguiente-o-entregar');
    if (sig) sig.addEventListener('click', () => {
      const esUltima = _intento.indice === _intento.preguntas.length - 1;
      if (esUltima) _finalizar();
      else { _intento.indice++; _drawExamen(); }
    });
    const abrirNav = document.getElementById('suf-abrir-navegador');
    if (abrirNav) abrirNav.addEventListener('click', _abrirNavegador);
    const entregar = document.getElementById('suf-entregar');
    if (entregar) entregar.addEventListener('click', _finalizar);
  }

  function _abrirNavegador() {
    const overlay = document.getElementById('suf-navegador-overlay');
    if (!overlay) return;
    overlay.innerHTML = _renderNavegador();
    overlay.querySelectorAll('[data-indice]').forEach(b => {
      b.addEventListener('click', () => {
        _intento.indice = parseInt(b.getAttribute('data-indice'), 10);
        overlay.innerHTML = '';
        _drawExamen();
      });
    });
    document.getElementById('suf-cerrar-navegador').addEventListener('click', () => { overlay.innerHTML = ''; });
    document.getElementById('suf-nav-backdrop').addEventListener('click', (e) => { if (e.target.id === 'suf-nav-backdrop') overlay.innerHTML = ''; });
  }

  function _drawExamen() {
    const root = document.getElementById('content');
    if (!root) return;
    root.innerHTML = _renderExamen();
    _bindExamen();
  }

  /* ================================================================
     FINALIZAR — califica, persiste (SOLO data.suficiencia.<curso>),
     NUNCA llama a Gamification.addXP.
     ================================================================ */
  function _finalizar() {
    if (!_intento) return;
    const resultado = E.calcularResultado(_intento.preguntas, _intento.respuestas);
    const suf = _cargar();
    const yaAcreditado = suf.acreditado;

    suf.attempts += 1;
    suf.lastScore = resultado.score;
    if (resultado.score > suf.bestScore) suf.bestScore = resultado.score;
    if (resultado.aprobado) suf.passCount += 1; else suf.failCount += 1;
    suf.lastAttemptQuestionIds = _intento.preguntas.map(p => p.id);

    const fecha = Date.now();
    suf.historial.push({ fecha, score: resultado.score, aciertos: resultado.aciertos, total: resultado.total, aprobado: resultado.aprobado });
    if (suf.historial.length > 30) suf.historial = suf.historial.slice(-30);

    const recienAcreditado = !yaAcreditado && resultado.aprobado;
    if (recienAcreditado) { suf.acreditado = true; suf.acreditadoAt = fecha; }

    _guardar(suf);

    _ultimoResultado = Object.assign({}, resultado, { recienAcreditado, yaAcreditado });
    _intento = null;
    _vista = 'resultados';
    _rerender();
  }

  /* ================================================================
     PANTALLA 2 — RESULTADOS
     ================================================================ */
  function _renderResultados() {
    const r = _ultimoResultado;
    const info = E.cursoInfo(_curso);
    const filas = info.unidades.map(u => {
      const d = r.porUnidad[u.id];
      if (!d || !d.total) return null;
      const pct = Math.round((d.correctas / d.total) * 100);
      return { nombre: u.nombre, pct };
    }).filter(Boolean);

    return `
      <div style="max-width:640px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);
                  border-radius:var(--radius-lg);padding:1.75rem;text-align:center;animation:pageIn .4s ease">
        <div style="font-size:2.8rem">${r.aprobado ? '🎉' : '📚'}</div>
        <h3 style="margin:.4rem 0">${r.aprobado ? '¡Suficiencia aprobada!' : 'Todavía no alcanza'}</h3>
        <div style="font-family:var(--font-display);font-size:2.4rem;font-weight:900;
                    color:${r.score >= 90 ? 'var(--xp-gold, #F9FF4D)' : r.score >= 70 ? 'var(--green)' : 'var(--red)'}">${r.score}/100</div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.3rem 0 1rem">
          ${r.aciertos} de ${r.total} correctas · se necesitan ${E.ACIERTOS_APROBACION}/${E.CANTIDAD_PREGUNTAS}
        </p>
        ${r.recienAcreditado ? `
          <div style="margin-bottom:1rem;background:rgba(92,242,168,.12);border:1px solid var(--green);border-radius:var(--radius-md);padding:1rem">
            <div style="font-size:1.7rem">🏅</div>
            <strong style="color:var(--green)">DOMINIO ACREDITADO POR SUFICIENCIA</strong>
            <p style="font-size:.8rem;color:var(--text-secondary);margin-top:.3rem">Ya quedó guardado en tu perfil.</p>
          </div>` : (r.yaAcreditado ? `<p style="font-size:.82rem;color:var(--text-muted);margin-bottom:1rem">🏅 Ya tenías esta suficiencia acreditada de un intento anterior.</p>` : '')}
        <div style="text-align:left;background:var(--bg-deep);border-radius:var(--radius-md);padding:1rem;margin-bottom:1rem">
          <div style="font-weight:700;font-size:.85rem;margin-bottom:.5rem">Desempeño por unidad</div>
          ${filas.map(f => `
            <div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.25rem 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--text-secondary)">${_esc(f.nombre)}</span>
              <span style="color:${f.pct >= 70 ? 'var(--green)' : 'var(--red)'}">${f.pct}%</span>
            </div>`).join('')}
        </div>
        <button class="btn btn-primary btn-sm" id="suf-retry">↻ Intentar nuevamente</button>
        <button class="btn btn-ghost btn-sm" id="suf-back-res">← Volver</button>
      </div>`;
  }

  function _bindResultados() {
    const retry = document.getElementById('suf-retry');
    if (retry) retry.addEventListener('click', () => { _vista = 'entrada'; _rerender(); });
    const back = document.getElementById('suf-back-res');
    if (back) back.addEventListener('click', () => Router.navigate(RUTA_VOLVER[_curso] || 'home'));
  }

  /* ================================================================
     DISPATCH
     ================================================================ */
  function _rerender() {
    const root = document.getElementById('content');
    if (!root) return;
    if (_vista === 'examen') { root.innerHTML = _renderExamen(); _bindExamen(); }
    else if (_vista === 'resultados') { root.innerHTML = _renderResultados(); _bindResultados(); }
    else { root.innerHTML = _renderEntrada(); _bindEntrada(); }
  }

  function init(params) {
    _curso = (params && params.curso && RUTA_VOLVER[params.curso]) ? params.curso : 'q10';
    _vista = 'entrada';
    _intento = null;
    _ultimoResultado = null;
    _rerender();
  }

  function destroy() { _intento = null; }

  return { init, destroy };
})());
