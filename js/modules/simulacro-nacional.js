/* ================================================================
   MÁSQUECIENCIA — js/modules/simulacro-nacional.js
   Módulo: Simulacro PNE · Ciencias (11.º)
   ================================================================
   Registra el módulo con nombre 'simulacro-nacional' (NO 'pne-final',
   NO 'pne' — ver nota de nombres en js/shared/simulacro-nacional-
   adapter.js). Usa exclusivamente Storage/Router/MQCProfiles ya
   existentes. NO llama a Gamification.addXP en ningún punto (Sección
   26 del ticket: "NO XP POR INTENTO").

   Persistencia: data.simulacroNacional (clave NUEVA, nunca data.pne).
   ================================================================ */

Router.register('simulacro-nacional', (() => {
  'use strict';

  const S = window.SimulacroNacional; // capa de lógica pura (adapter)
  const COLORES_CIENCIA = { 'Biología': '#5CF2A8', 'Física': '#1FDBFF', 'Química': '#B983FF' };
  const ICONO_CIENCIA = { 'Biología': '🧬', 'Física': '⚛', 'Química': '🧪' };

  /* ── Estado en memoria de la vista actual ─────────────────── */
  let _vista = 'entrada';      // 'entrada' | 'form-presentacion' | 'examen' | 'confirmar' | 'resultados' | 'revision' | 'historial'
  let _intento = null;         // { preguntas:[...60], respuestas:{}, indiceActual, presentacion, inicioTs }
  let _ultimoResultado = null; // snapshot para la vista de resultados/revisión tras entregar

  /* ================================================================
     PERSISTENCIA (Storage.get/set — mismo patrón que el resto de MQC)
     ================================================================
     data.simulacroNacional = {
       enProgreso: { preguntas, respuestas, indiceActual, presentacion, inicioTs } | null,
       historial: [ { fecha, presentacion, aciertos, notaPNE, porCiencia,
                      aportePNE, proyeccionFinal, notaMinima, favorable,
                      idsUtilizados } , ... ],
       attempts: number
     }
  ================================================================ */
  function _cargar() {
    const data = Storage.load();
    return data.simulacroNacional || { enProgreso: null, historial: [], attempts: 0 };
  }
  function _guardar(sn) { Storage.set('simulacroNacional', sn); }

  function _guardarProgreso() {
    if (!_intento) return;
    const sn = _cargar();
    sn.enProgreso = {
      preguntas: _intento.preguntas,
      respuestas: _intento.respuestas,
      indiceActual: _intento.indiceActual,
      presentacion: _intento.presentacion,
      inicioTs: _intento.inicioTs
    };
    _guardar(sn);
  }

  function _limpiarProgreso() {
    const sn = _cargar();
    sn.enProgreso = null;
    _guardar(sn);
  }

  /* ================================================================
     PANTALLA 0 — BLOQUEADO (condición de desbloqueo aclarada por el
     docente el 2026-08-17: Ruta 1 = Química 11.º desbloqueada, Ruta
     2 = progreso real dentro de 11.º). Ver estadoDesbloqueo() en el
     adapter — este módulo solo LEE el resultado, nunca escribe en
     grade11Unlock ni en ningún dato del núcleo.
     ================================================================ */
  function _renderBloqueado(estado) {
    const pctProgreso = Math.min(100, Math.round((estado.progresoPromedio / estado.progresoRequerido) * 100));
    const pctExamenes = Math.min(100, Math.round((estado.examenesAprobados / estado.examenesRequeridos) * 100));
    return `
      <div class="section-header"><p class="section-title">Undécimo Año</p><h2 class="section-heading">🎯 Simulacro PNE · Ciencias</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;text-align:center;max-width:560px;margin:0 auto">
        <div style="font-size:2.4rem">🔒</div>
        <h3 style="margin:.5rem 0">Todavía no está desbloqueado</h3>
        <p style="color:var(--text-secondary);font-size:.9rem;margin-bottom:1.2rem">Se desbloquea con cualquiera de estas dos rutas:</p>

        <div style="text-align:left;margin-bottom:1rem">
          <div style="font-size:.82rem;color:var(--text-secondary);margin-bottom:.3rem">Ruta 1 — Química 11.º ya desbloqueada</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${estado.rutaGrade11Unlocked ? 100 : 0}%;background:var(--green)"></div></div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:.2rem">${estado.rutaGrade11Unlocked ? '✓ Cumplida' : 'Aprobá 6 de 9 exámenes de Química 10.º, o alcanzá 80+ en el Desafío Final de 10.º'}</div>
        </div>

        <div style="text-align:left;margin-bottom:1.2rem">
          <div style="font-size:.82rem;color:var(--text-secondary);margin-bottom:.3rem">Ruta 2 — Progreso real en Química 11.º</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.max(pctProgreso, pctExamenes)}%;background:var(--gold)"></div></div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:.2rem">
            ${estado.progresoPromedio}% de progreso promedio (necesitás ${estado.progresoRequerido}%) · ${estado.examenesAprobados}/4 exámenes de unidad aprobados (necesitás ${estado.examenesRequeridos})
          </div>
        </div>

        <button class="btn btn-ghost" data-action="sn-volver-g11">← Volver a Química 11.º</button>
      </div>`;
  }

  /* ================================================================
     PANTALLA 1 — ENTRADA (Sección 10)
     ================================================================ */
  function _renderEntrada() {
    const sn = _cargar();
    const hayProgreso = !!sn.enProgreso;
    const isGuest = (typeof MQCProfiles !== 'undefined' && MQCProfiles.isGuest && MQCProfiles.isGuest());

    return `
      <div class="section-header"><p class="section-title">Undécimo Año</p><h2 class="section-heading">🎯 Simulacro PNE · Ciencias</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:640px;margin:0 auto;text-align:center">
        <p style="color:var(--text-secondary);font-size:.95rem;line-height:1.7">
          <strong>Biología · Física · Química</strong><br>
          60 preguntas. Tres ciencias. Una simulación diseñada para medir tu preparación antes de enfrentar la prueba real.
        </p>
        <div style="display:flex;gap:.8rem;justify-content:center;margin:1.4rem 0;flex-wrap:wrap">
          ${S.CIENCIAS.map(c => `
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.7rem 1.1rem;border-top:3px solid ${COLORES_CIENCIA[c]}">
              <div style="font-size:1.3rem">${ICONO_CIENCIA[c]}</div>
              <div style="font-size:.8rem;color:var(--text-secondary);margin-top:.2rem">${c}</div>
              <div style="font-family:var(--font-display);font-weight:900">${S.PREGUNTAS_POR_CIENCIA}</div>
            </div>`).join('')}
        </div>
        ${isGuest ? `<p style="color:var(--gold);font-size:.8rem;margin-bottom:1rem">⚠️ Estás en modo invitado: tu historial de este intento no se guardará permanentemente si cerrás la sesión.</p>` : ''}
        ${sn.attempts > 0 ? `
          <div style="display:flex;gap:1rem;justify-content:center;margin-bottom:1.2rem;flex-wrap:wrap">
            <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:.6rem 1rem">
              <div style="font-size:.7rem;color:var(--text-muted)">Intentos realizados</div>
              <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:900">${sn.attempts}</div>
            </div>
            <button class="btn btn-ghost btn-sm" id="sn-ver-historial" style="align-self:center">📜 Ver historial</button>
          </div>
        ` : ''}
        ${hayProgreso
          ? `<button class="btn btn-primary" id="sn-reanudar">▶ Reanudar simulacro en curso</button>
             <br><button class="btn btn-ghost btn-sm" id="sn-nuevo" style="margin-top:.6rem">Descartar y empezar uno nuevo</button>`
          : `<button class="btn btn-primary" id="sn-iniciar">INICIAR SIMULACRO</button>`}
      </div>`;
  }

  function _bindEntrada() {
    const iniciar = document.getElementById('sn-iniciar');
    if (iniciar) iniciar.addEventListener('click', () => { _vista = 'form-presentacion'; _rerender(); });
    const reanudar = document.getElementById('sn-reanudar');
    if (reanudar) reanudar.addEventListener('click', _reanudarIntento);
    const nuevo = document.getElementById('sn-nuevo');
    if (nuevo) nuevo.addEventListener('click', () => { _limpiarProgreso(); _vista = 'form-presentacion'; _rerender(); });
    const historial = document.getElementById('sn-ver-historial');
    if (historial) historial.addEventListener('click', () => { _vista = 'historial'; _rerender(); });
  }

  function _reanudarIntento() {
    const sn = _cargar();
    if (!sn.enProgreso) { _vista = 'form-presentacion'; _rerender(); return; }
    _intento = {
      preguntas: sn.enProgreso.preguntas,
      respuestas: sn.enProgreso.respuestas || {},
      indiceActual: sn.enProgreso.indiceActual || 0,
      presentacion: sn.enProgreso.presentacion,
      inicioTs: sn.enProgreso.inicioTs
    };
    _vista = 'examen';
    _rerender();
  }

  /* ================================================================
     PANTALLA 2 — NOTA DE PRESENTACIÓN (Sección 11)
     ================================================================ */
  function _renderFormPresentacion() {
    return `
      <div class="section-header"><p class="section-title">Antes de empezar</p><h2 class="section-heading">Nota de presentación</h2></div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.75rem;max-width:480px;margin:0 auto;text-align:center">
        <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.6;margin-bottom:1rem">
          Ingresa los puntos porcentuales que actualmente posees de los 60&nbsp;% correspondientes a tu nota de presentación.
        </p>
        <input type="number" id="sn-input-presentacion" min="0" max="60" step="0.1" placeholder="Ej. 48"
               style="width:120px;font-size:1.4rem;text-align:center;font-family:var(--font-display);font-weight:900;
                      background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);
                      padding:.5rem;color:var(--text-primary)">
        <span style="font-size:1.1rem;color:var(--text-muted);margin-left:.4rem">/ 60</span>
        <p id="sn-presentacion-error" style="color:var(--red);font-size:.82rem;min-height:1.2em;margin-top:.6rem"></p>
        <button class="btn btn-primary" id="sn-confirmar-presentacion" style="margin-top:.6rem">Comenzar Simulacro</button>
        <br><button class="btn btn-ghost btn-sm" id="sn-volver-entrada" style="margin-top:.6rem">← Volver</button>
      </div>`;
  }

  function _bindFormPresentacion() {
    const volver = document.getElementById('sn-volver-entrada');
    if (volver) volver.addEventListener('click', () => { _vista = 'entrada'; _rerender(); });
    const confirmar = document.getElementById('sn-confirmar-presentacion');
    if (confirmar) confirmar.addEventListener('click', () => {
      const input = document.getElementById('sn-input-presentacion');
      const val = input.value;
      const check = S.validarPresentacion(val);
      const err = document.getElementById('sn-presentacion-error');
      if (!check.valido) {
        err.textContent = check.motivo === 'no-numerico'
          ? 'Ingresa un número válido.'
          : `El valor debe estar entre ${S.PRESENTACION_MIN} y ${S.PRESENTACION_MAX}.`;
        return;
      }
      _iniciarNuevoIntento(Number(val));
    });
  }

  function _iniciarNuevoIntento(presentacion) {
    const chk = S.bancosDisponibles();
    if (!chk.ok) {
      const root = document.getElementById('content');
      if (root) root.innerHTML = `<div class="placeholder-page"><span class="placeholder-icon">⚠️</span>
        <h2>Banco incompleto</h2><p class="placeholder-desc">Todavía no hay suficientes preguntas calificables cargadas para armar el simulacro. Contactá al equipo de contenido.</p>
        <button class="btn btn-ghost" data-nav="grade11">← Volver</button></div>`;
      return;
    }
    const sn = _cargar();
    const idsUltimoIntento = (sn.historial.length ? sn.historial[sn.historial.length - 1].idsUtilizados : []) || [];
    const preguntas = S.construirIntento(idsUltimoIntento);
    _intento = { preguntas, respuestas: {}, indiceActual: 0, presentacion, inicioTs: Date.now() };
    _guardarProgreso();
    _vista = 'examen';
    _rerender();
  }

  /* ================================================================
     PANTALLA 3 — EXAMEN (Sección 12)
     ================================================================ */
  function _renderExamen() {
    const q = _intento.preguntas[_intento.indiceActual];
    const contestadas = Object.keys(_intento.respuestas).length;
    const colorCiencia = COLORES_CIENCIA[q.ciencia];
    const esUltimaPregunta = _intento.indiceActual === _intento.preguntas.length - 1;

    return `
      <div id="sn-examen-root" style="max-width:760px;margin:0 auto;animation:pageIn .3s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.4rem;margin-bottom:.5rem">
          <span style="font-family:var(--font-code);font-size:.82rem;color:${colorCiencia};font-weight:700">
            ${ICONO_CIENCIA[q.ciencia]} ${q.ciencia.toUpperCase()} · Pregunta ${q.numeroEnBloque} de ${S.PREGUNTAS_POR_CIENCIA}
          </span>
          <span style="font-family:var(--font-code);font-size:.78rem;color:var(--text-muted)">Progreso general: ${contestadas} / ${S.TOTAL_PREGUNTAS}</span>
        </div>
        <div class="progress-bar" style="margin-bottom:1rem">
          <div class="progress-fill" style="width:${(contestadas / S.TOTAL_PREGUNTAS) * 100}%;background:${colorCiencia}"></div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem">
          <div style="font-size:.7rem;color:var(--text-muted);font-family:var(--font-code);margin-bottom:.5rem">PREGUNTA ${q.numeroGlobal} / ${S.TOTAL_PREGUNTAS}</div>
          <div style="font-size:1rem;color:var(--text-primary);line-height:1.6;margin-bottom:1rem;white-space:pre-line">${_enunciadoConFigura(q)}</div>
          <div id="sn-opciones" style="display:flex;flex-direction:column;gap:.55rem">
            ${q.opciones.map(op => `
              <button class="btn ${_intento.respuestas[q.id] === op.id ? 'btn-primary' : 'btn-ghost'}" data-opcion="${op.id}"
                      style="text-align:left;justify-content:flex-start;white-space:normal;height:auto;padding:.7rem .9rem;font-size:.9rem">
                ${op.texto}
              </button>`).join('')}
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:1rem;gap:.6rem">
          <button class="btn btn-ghost btn-sm" id="sn-anterior" ${_intento.indiceActual === 0 ? 'disabled' : ''}>← Anterior</button>
          <button class="btn btn-ghost btn-sm" id="sn-abrir-navegador">🔢 Ver todas las preguntas</button>
          ${esUltimaPregunta
            ? `<button class="btn btn-primary btn-sm" id="sn-siguiente-o-entregar">Entregar simulacro ✓</button>`
            : `<button class="btn btn-ghost btn-sm" id="sn-siguiente-o-entregar">Siguiente →</button>`}
        </div>

        <div style="text-align:center;margin-top:1rem">
          <button class="btn btn-primary btn-sm" id="sn-entregar">Entregar simulacro</button>
        </div>

        <div id="sn-navegador-overlay"></div>
      </div>`;
  }

  /* ================================================================
     RECURSO VISUAL (Fase 2 — Cierre visual, Secciones 6-9 del ticket)
     ================================================================
     Tres estados posibles según q.recursoVisual.tipo:
       'imagen'             → asset real extraído del PDF fuente, con
                               lightbox "Tocar para ampliar" (Sección 8).
       'referencia_externa' → el ítem usa la Tabla Periódica completa
                               solo como herramienta de consulta general
                               (no es una figura propia del ítem); en vez
                               de reconstruir una tabla periódica entera
                               se reutiliza el módulo Tabla Periódica ya
                               existente en MQC (más útil e interactivo
                               que una imagen estática — indicación del
                               docente, 2026-08-17).
       'pendiente'          → todavía no hay asset (bloqueado por falta
                               del PDF fuente 2025-D01) — placeholder
                               técnico PNE_ASSET_PENDING, nunca se
                               inventa ni deforma el recurso.
     Si el ítem no tiene recursoVisual (no requiere figura), no se
     agrega nada. */
  function _enunciadoConFigura(q) {
    let extra = '';
    const rv = q.recursoVisual;
    if (rv && rv.tipo === 'imagen') {
      extra = `<figure style="margin:.9rem 0 0;padding:0">
                 <div class="sn-img-wrap" data-src="${_escAttr(rv.src)}" data-alt="${_escAttr(rv.alt)}"
                      style="position:relative;cursor:zoom-in;background:var(--bg-elevated);border:1px solid var(--border);
                             border-radius:var(--radius-md);padding:.6rem;text-align:center;overflow:hidden">
                   <img src="${_escAttr(rv.src)}" alt="${_escAttr(rv.alt)}"
                        style="max-width:100%;max-height:340px;width:auto;height:auto;display:inline-block;object-fit:contain">
                   <div style="position:absolute;bottom:6px;right:8px;background:rgba(0,0,0,.55);color:#fff;
                               font-size:.68rem;padding:.15rem .5rem;border-radius:999px;font-family:var(--font-code)">🔍 Tocar para ampliar</div>
                 </div>
               </figure>`;
    } else if (rv && rv.tipo === 'referencia_externa') {
      extra = `<div style="margin-top:.9rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);
                    padding:.8rem;text-align:center">
                 <p style="font-size:.8rem;color:var(--text-secondary);margin-bottom:.5rem">${_escHtml(rv.alt)}</p>
                 <button class="btn btn-ghost btn-sm sn-abrir-tabla-periodica" type="button">${_escHtml(rv.textoBoton || 'Abrir Tabla Periódica')}</button>
               </div>`;
    } else if (rv && rv.tipo === 'pendiente') {
      const tipo = q.usaGrafico ? 'una gráfica' : (q.usaTabla ? 'una tabla de datos' : 'una imagen');
      extra = `<div style="margin-top:.8rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);
                    padding:.8rem;text-align:center">
                 <p style="font-size:.8rem;color:var(--text-secondary)">⚠️ Este ítem hace referencia a ${tipo} que todavía no está disponible aquí. Respondé con la información del enunciado.</p>
               </div>`;
    }
    return q.enunciado + extra;
  }

  function _escHtml(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function _escAttr(s) { return _escHtml(s).replace(/"/g,'&quot;'); }

  /* Lightbox de ampliación (Sección 8: "Tocar para ampliar") */
  function _abrirLightbox(src, alt) {
    const overlay = document.getElementById('sn-lightbox-overlay') || document.getElementById('sn-navegador-overlay');
    if (!overlay) return;
    overlay.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:300;display:flex;align-items:center;
                  justify-content:center;padding:1rem" id="sn-lightbox-backdrop">
        <div style="max-width:95vw;max-height:90vh;text-align:center">
          <img src="${_escAttr(src)}" alt="${_escAttr(alt)}" style="max-width:95vw;max-height:80vh;object-fit:contain;border-radius:8px;background:#fff">
          <p style="color:#fff;font-size:.8rem;margin-top:.6rem">${_escHtml(alt)}</p>
          <button class="btn btn-ghost btn-sm" id="sn-lightbox-cerrar" style="margin-top:.4rem">✕ Cerrar</button>
        </div>
      </div>`;
    document.getElementById('sn-lightbox-cerrar').addEventListener('click', () => { overlay.innerHTML = ''; });
    document.getElementById('sn-lightbox-backdrop').addEventListener('click', (e) => { if (e.target.id === 'sn-lightbox-backdrop') overlay.innerHTML = ''; });
  }

  function _bindRecursoVisual(root) {
    root.querySelectorAll('.sn-img-wrap').forEach(el => {
      el.addEventListener('click', () => _abrirLightbox(el.getAttribute('data-src'), el.getAttribute('data-alt')));
    });
    root.querySelectorAll('.sn-abrir-tabla-periodica').forEach(el => {
      el.addEventListener('click', () => { if (typeof Router !== 'undefined') Router.navigate('periodic-table'); });
    });
  }

  function _renderCelda(p, i) {
    const estado = _intento.respuestas[p.id] ? 'contestada' : (i === _intento.indiceActual ? 'actual' : 'pendiente');
    const color = estado === 'contestada' ? 'var(--green)' : (estado === 'actual' ? COLORES_CIENCIA[p.ciencia] : 'var(--border)');
    const bg = estado === 'actual' ? COLORES_CIENCIA[p.ciencia] + '22' : 'transparent';
    return `<button class="sn-nav-celda" data-indice="${i}" title="${p.ciencia} · Pregunta ${p.numeroEnBloque}"
              style="width:32px;height:32px;border-radius:6px;border:2px solid ${color};background:${bg};
                     color:var(--text-primary);font-family:var(--font-code);font-size:.72rem;cursor:pointer">
              ${i + 1}
            </button>`;
  }

  function _renderNavegador() {
    return `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;display:flex;align-items:center;justify-content:center;padding:1rem" id="sn-nav-backdrop">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;max-width:520px;width:100%;max-height:80vh;overflow-y:auto;-webkit-overflow-scrolling:touch">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem">
            <strong>Navegador de preguntas</strong>
            <button class="btn btn-ghost btn-sm" id="sn-cerrar-navegador">✕</button>
          </div>
          <div style="display:flex;gap:.8rem;font-size:.75rem;color:var(--text-secondary);margin-bottom:.8rem;flex-wrap:wrap">
            <span>🟩 Contestada</span><span>⬜ Pendiente</span><span>🔷 Actual</span>
          </div>
          ${S.CIENCIAS.map(c => `
            <div style="margin-bottom:.6rem">
              <div style="font-size:.75rem;color:${COLORES_CIENCIA[c]};font-weight:700;margin-bottom:.3rem">${ICONO_CIENCIA[c]} ${c}</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(32px,1fr));gap:.35rem">
                ${_intento.preguntas.map((p, i) => p.ciencia === c ? _renderCelda(p, i) : '').join('')}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function _bindExamen() {
    document.querySelectorAll('#sn-opciones [data-opcion]').forEach(b => {
      b.addEventListener('click', () => {
        const q = _intento.preguntas[_intento.indiceActual];
        _intento.respuestas[q.id] = b.getAttribute('data-opcion');
        _guardarProgreso();
        _drawExamen();
      });
    });
    const ant = document.getElementById('sn-anterior');
    if (ant) ant.addEventListener('click', () => { if (_intento.indiceActual > 0) { _intento.indiceActual--; _guardarProgreso(); _drawExamen(); } });
    const sig = document.getElementById('sn-siguiente-o-entregar');
    if (sig) sig.addEventListener('click', () => {
      const esUltima = _intento.indiceActual === _intento.preguntas.length - 1;
      if (esUltima) { _intentarEntregar(); }
      else { _intento.indiceActual++; _guardarProgreso(); _drawExamen(); }
    });
    const abrirNav = document.getElementById('sn-abrir-navegador');
    if (abrirNav) abrirNav.addEventListener('click', _abrirNavegador);
    const entregar = document.getElementById('sn-entregar');
    if (entregar) entregar.addEventListener('click', _intentarEntregar);
    _bindRecursoVisual(document);
  }

  function _abrirNavegador() {
    const overlay = document.getElementById('sn-navegador-overlay');
    if (!overlay) return;
    overlay.innerHTML = _renderNavegador();
    overlay.querySelectorAll('[data-indice]').forEach(b => {
      b.addEventListener('click', () => {
        _intento.indiceActual = parseInt(b.getAttribute('data-indice'), 10);
        _guardarProgreso();
        overlay.innerHTML = '';
        _drawExamen();
      });
    });
    document.getElementById('sn-cerrar-navegador').addEventListener('click', () => { overlay.innerHTML = ''; });
    document.getElementById('sn-nav-backdrop').addEventListener('click', (e) => { if (e.target.id === 'sn-nav-backdrop') overlay.innerHTML = ''; });
  }

  function _drawExamen() {
    const root = document.getElementById('content');
    if (!root) return;
    root.innerHTML = _renderExamen();
    _bindExamen();
  }

  /* ================================================================
     PANTALLA 4 — CONFIRMAR ENTREGA (Sección 14)
     ================================================================ */
  function _intentarEntregar() {
    const pendientes = _intento.preguntas.length - Object.keys(_intento.respuestas).length;
    const root = document.getElementById('content');
    if (!root) return;

    if (pendientes > 0) {
      root.innerHTML = `
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.75rem;text-align:center">
          <div style="font-size:2rem">⚠️</div>
          <h3 style="margin:.5rem 0">Tienes ${pendientes} pregunta${pendientes !== 1 ? 's' : ''} pendiente${pendientes !== 1 ? 's' : ''}.</h3>
          <button class="btn btn-primary" id="sn-volver-examen" style="margin-top:.8rem">VOLVER AL EXAMEN</button>
          <br><button class="btn btn-ghost btn-sm" id="sn-entregar-igual" style="margin-top:.6rem">ENTREGAR DE TODAS FORMAS</button>
        </div>`;
      document.getElementById('sn-volver-examen').addEventListener('click', _drawExamen);
      document.getElementById('sn-entregar-igual').addEventListener('click', _confirmarEntregaFinal);
    } else {
      root.innerHTML = `
        <div style="max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);
                    border-radius:var(--radius-lg);padding:1.75rem;text-align:center">
          <div style="font-size:2rem">✅</div>
          <h3 style="margin:.5rem 0">Todas las preguntas están contestadas.</h3>
          <button class="btn btn-primary" id="sn-entregar-final">ENTREGAR SIMULACRO</button>
          <br><button class="btn btn-ghost btn-sm" id="sn-volver-examen2" style="margin-top:.6rem">Volver a revisar</button>
        </div>`;
      document.getElementById('sn-entregar-final').addEventListener('click', _confirmarEntregaFinal);
      document.getElementById('sn-volver-examen2').addEventListener('click', _drawExamen);
    }
  }

  function _confirmarEntregaFinal() {
    const preguntas = _intento.preguntas;
    const respuestas = _intento.respuestas;
    const aciertos = preguntas.reduce((acc, p) => acc + (respuestas[p.id] === p.correcta ? 1 : 0), 0);
    const notaPNE = S.calcularNotaPNE(aciertos, preguntas.length);
    const { aportePNE, proyeccionFinal } = S.calcularProyeccion(_intento.presentacion, notaPNE);
    const notaMinima = S.calcularNotaMinimaRequerida(_intento.presentacion);
    const diagPrincipal = S.diagnosticoPrincipal(proyeccionFinal);
    const diagCiencia = S.diagnosticoPorCiencia(preguntas, respuestas);
    const diagTema = S.diagnosticoTematico(preguntas, respuestas);

    const registro = {
      fecha: Date.now(),
      presentacion: _intento.presentacion,
      aciertos, total: preguntas.length,
      notaPNE, aportePNE, proyeccionFinal,
      notaMinima: notaMinima.valor, notaMinimaCaso: notaMinima.caso,
      favorable: diagPrincipal.nivel === 'favorable',
      porCiencia: diagCiencia.porCiencia,
      idsUtilizados: preguntas.map(p => p.id)
    };

    const sn = _cargar();
    sn.historial.push(registro);
    if (sn.historial.length > 30) sn.historial = sn.historial.slice(-30); // límite razonable
    sn.attempts = (sn.attempts || 0) + 1;
    sn.enProgreso = null; // NO otorga XP — Sección 26. Solo se limpia el progreso y se guarda el historial.
    _guardar(sn);

    _ultimoResultado = { preguntas, respuestas, aciertos, notaPNE, aportePNE, proyeccionFinal, notaMinima, diagPrincipal, diagCiencia, diagTema, presentacion: _intento.presentacion };
    _intento = null;
    _vista = 'resultados';
    _rerender();
  }

  /* ================================================================
     PANTALLA 5 — RESULTADOS (Secciones 19-23)
     ================================================================ */
  function _renderResultados() {
    const r = _ultimoResultado;
    const nm = r.notaMinima;
    let mensajeMin;
    if (nm.caso === 'ya-asegurado') mensajeMin = 'Ya tenías asegurada la aprobación con tu nota de presentación, sin importar el resultado de la PNE.';
    else if (nm.caso === 'imposible') mensajeMin = nm.mensaje;
    else mensajeMin = `Necesitabas al menos <strong>${nm.valor}%</strong> en la PNE.`;

    return `
      <div style="max-width:680px;margin:0 auto;animation:pageIn .4s ease">
        <div class="section-header"><p class="section-title">Resultado</p><h2 class="section-heading">${r.diagPrincipal.nivel === 'favorable' ? '🎉' : '📚'} RESULTADO DEL SIMULACRO</h2></div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;margin-bottom:1rem">
          <div style="font-size:.75rem;color:var(--text-muted);font-family:var(--font-code)">PNE</div>
          <div style="font-family:var(--font-display);font-size:2.4rem;font-weight:900">${r.aciertos} / ${S.TOTAL_PREGUNTAS}</div>
          <div style="font-size:1.3rem;color:${r.notaPNE >= 70 ? 'var(--green)' : 'var(--red)'};font-weight:700">${r.notaPNE}%</div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem;margin-bottom:1rem">
          <div style="font-weight:700;font-size:.9rem;margin-bottom:.7rem">Rendimiento por ciencia</div>
          ${r.diagCiencia.porCiencia.map(c => `
            <div style="margin-bottom:.6rem">
              <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:.25rem">
                <span>${ICONO_CIENCIA[c.ciencia]} ${c.ciencia}</span>
                <span style="color:${c.porcentaje >= 70 ? 'var(--green)' : 'var(--red)'}">${c.correctas} / ${c.total} · ${c.porcentaje}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${c.porcentaje}%;background:${COLORES_CIENCIA[c.ciencia]}"></div></div>
            </div>`).join('')}
          <p style="font-size:.82rem;color:var(--green);margin-top:.6rem">💪 Mayor dominio: ${r.diagCiencia.mayorDominio.ciencia} (${r.diagCiencia.mayorDominio.porcentaje}%)</p>
          <p style="font-size:.82rem;color:var(--gold)">📌 Mayor refuerzo: ${r.diagCiencia.mayorRefuerzo.ciencia} (${r.diagCiencia.mayorRefuerzo.porcentaje}%)</p>
        </div>

        ${_renderDiagnosticoTematico(r.diagTema)}

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem;margin-bottom:1rem">
          <div style="font-weight:700;font-size:.9rem;margin-bottom:.7rem">Proyección académica</div>
          <div style="font-size:.85rem;line-height:2;color:var(--text-secondary)">
            <div style="display:flex;justify-content:space-between"><span>Presentación</span><strong style="color:var(--text-primary)">${r.presentacion} / 60</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Nota PNE</span><strong style="color:var(--text-primary)">${r.notaPNE}%</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Aporte PNE (40%)</span><strong style="color:var(--text-primary)">${r.aportePNE} / 40</strong></div>
            <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:.3rem;margin-top:.3rem">
              <span>Proyección final</span><strong style="color:${r.proyeccionFinal >= 70 ? 'var(--green)' : 'var(--red)'};font-size:1.1rem">${r.proyeccionFinal} / 100</strong>
            </div>
          </div>
        </div>

        <div style="background:${r.diagPrincipal.nivel === 'favorable' ? 'rgba(92,242,168,.1)' : 'rgba(255,169,77,.1)'};
                    border:1px solid ${r.diagPrincipal.nivel === 'favorable' ? 'var(--green)' : 'var(--gold)'};
                    border-radius:var(--radius-lg);padding:1.2rem;text-align:center;margin-bottom:1.2rem">
          <div style="font-weight:900;font-size:1.05rem;color:${r.diagPrincipal.nivel === 'favorable' ? 'var(--green)' : 'var(--gold)'}">${r.diagPrincipal.titulo}</div>
          <p style="font-size:.85rem;color:var(--text-secondary);margin:.4rem 0">${r.diagPrincipal.texto}</p>
          <p style="font-size:.85rem;color:var(--text-secondary)">${mensajeMin}</p>
        </div>

        <div style="text-align:center;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" id="sn-revisar">📖 Revisar respuestas</button>
          <button class="btn btn-ghost btn-sm" id="sn-nuevo-intento">↻ Realizar nuevo simulacro</button>
          <button class="btn btn-ghost btn-sm" id="sn-ver-historial-2">📜 Historial</button>
          <button class="btn btn-ghost btn-sm" id="sn-volver-g11">← Volver</button>
        </div>
      </div>`;
  }

  function _renderDiagnosticoTematico(diagTema) {
    const conDatos = S.CIENCIAS.filter(c => diagTema[c] && diagTema[c].length > 0);
    if (conDatos.length === 0) return '';
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem;margin-bottom:1rem">
        <div style="font-weight:700;font-size:.9rem;margin-bottom:.7rem">Diagnóstico temático</div>
        ${conDatos.map(c => `
          <div style="margin-bottom:.6rem">
            <div style="font-size:.82rem;color:${COLORES_CIENCIA[c]};font-weight:700;margin-bottom:.3rem">${c}</div>
            ${diagTema[c].map(t => `
              <div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.2rem 0;color:var(--text-secondary)">
                <span>${t.tema}</span><span>${t.errores} error${t.errores !== 1 ? 'es' : ''}</span>
              </div>`).join('')}
          </div>`).join('')}
      </div>`;
  }

  function _bindResultados() {
    const revisar = document.getElementById('sn-revisar');
    if (revisar) revisar.addEventListener('click', () => { _vista = 'revision'; _rerender(); });
    const nuevo = document.getElementById('sn-nuevo-intento');
    if (nuevo) nuevo.addEventListener('click', () => { _vista = 'form-presentacion'; _rerender(); });
    const hist = document.getElementById('sn-ver-historial-2');
    if (hist) hist.addEventListener('click', () => { _vista = 'historial'; _rerender(); });
    const volver = document.getElementById('sn-volver-g11');
    if (volver) volver.addEventListener('click', () => Router.navigate('grade11'));
  }

  /* ================================================================
     PANTALLA 6 — REVISIÓN POSTERIOR (Sección 24)
     ================================================================
     Solo campos públicos: respuesta seleccionada, respuesta correcta,
     tema, ciencia. NUNCA archivo_fuente/pagina_fuente/estado_validacion/
     observaciones/marcas manuscritas (esos campos ni siquiera viajan
     a los bancos JS de producción — ver banco-nacional-*.js). */
  let _revisionIndice = 0;
  function _renderRevision() {
    const r = _ultimoResultado;
    const q = r.preguntas[_revisionIndice];
    const elegida = r.respuestas[q.id];
    const fueCorrecta = elegida === q.correcta;

    return `
      <div style="max-width:680px;margin:0 auto">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
          <button class="btn btn-ghost btn-sm" id="sn-rev-volver">← Volver a resultados</button>
          <span style="font-family:var(--font-code);font-size:.8rem;color:var(--text-muted)">${_revisionIndice + 1} / ${r.preguntas.length}</span>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem">
          <div style="font-size:.75rem;color:${COLORES_CIENCIA[q.ciencia]};font-weight:700;margin-bottom:.3rem">${ICONO_CIENCIA[q.ciencia]} ${q.ciencia} · ${q.tema}</div>
          <div style="font-size:.98rem;margin-bottom:1rem;line-height:1.6;white-space:pre-line">${_enunciadoConFigura(q)}</div>
          <div style="display:flex;flex-direction:column;gap:.5rem">
            ${q.opciones.map(op => {
              let estilo = 'border-color:var(--border)';
              let marca = '';
              if (op.id === q.correcta) { estilo = 'border-color:var(--green);background:rgba(92,242,168,.08)'; marca = ' ✓'; }
              if (op.id === elegida && !fueCorrecta) { estilo = 'border-color:var(--red);background:rgba(255,90,90,.08)'; marca = ' ✗ (tu respuesta)'; }
              if (op.id === elegida && fueCorrecta) marca = ' ✓ (tu respuesta)';
              return `<div style="padding:.7rem .9rem;border:1px solid var(--border);border-radius:var(--radius-md);font-size:.88rem;${estilo}">${op.texto}<strong>${marca}</strong></div>`;
            }).join('')}
          </div>
          ${!elegida ? `<p style="color:var(--text-muted);font-size:.82rem;margin-top:.7rem">No respondiste esta pregunta.</p>` : ''}
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:1rem">
          <button class="btn btn-ghost btn-sm" id="sn-rev-ant" ${_revisionIndice === 0 ? 'disabled' : ''}>← Anterior</button>
          <button class="btn btn-ghost btn-sm" id="sn-rev-sig" ${_revisionIndice === r.preguntas.length - 1 ? 'disabled' : ''}>Siguiente →</button>
        </div>
        <div id="sn-navegador-overlay"></div>
      </div>`;
  }

  function _bindRevision() {
    document.getElementById('sn-rev-volver').addEventListener('click', () => { _vista = 'resultados'; _rerender(); });
    const ant = document.getElementById('sn-rev-ant');
    if (ant) ant.addEventListener('click', () => { if (_revisionIndice > 0) { _revisionIndice--; _drawRevision(); } });
    const sig = document.getElementById('sn-rev-sig');
    if (sig) sig.addEventListener('click', () => { if (_revisionIndice < _ultimoResultado.preguntas.length - 1) { _revisionIndice++; _drawRevision(); } });
    _bindRecursoVisual(document);
  }
  function _drawRevision() {
    const root = document.getElementById('content');
    if (!root) return;
    root.innerHTML = _renderRevision();
    _bindRevision();
  }

  /* ================================================================
     PANTALLA 7 — HISTORIAL (Sección 25)
     ================================================================ */
  function _renderHistorial() {
    const sn = _cargar();
    const hist = (sn.historial || []).slice().reverse();
    return `
      <div style="max-width:680px;margin:0 auto">
        <div class="section-header"><p class="section-title">Simulacro PNE</p><h2 class="section-heading">📜 Historial de intentos</h2></div>
        ${hist.length === 0 ? `<p style="color:var(--text-muted);text-align:center">Todavía no hay intentos registrados.</p>` : hist.map(h => `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.7rem">
            <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--text-muted);font-family:var(--font-code)">
              <span>${new Date(h.fecha).toLocaleDateString('es-CR', { day:'2-digit', month:'short', year:'numeric' })}</span>
              <span style="color:${h.favorable ? 'var(--green)' : 'var(--gold)'}">${h.favorable ? 'Favorable' : 'Requiere refuerzo'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.4rem">
              <span style="font-size:.85rem;color:var(--text-secondary)">PNE: ${h.aciertos}/${h.total} (${h.notaPNE}%) · Presentación: ${h.presentacion}/60</span>
              <strong style="font-family:var(--font-display)">${h.proyeccionFinal}/100</strong>
            </div>
          </div>`).join('')}
        <div style="text-align:center;margin-top:1rem">
          <button class="btn btn-ghost btn-sm" id="sn-hist-volver">← Volver</button>
        </div>
      </div>`;
  }

  function _bindHistorial() {
    document.getElementById('sn-hist-volver').addEventListener('click', () => { _vista = _ultimoResultado ? 'resultados' : 'entrada'; _rerender(); });
  }

  /* ================================================================
     ORQUESTACIÓN
     ================================================================ */
  function _rerender() {
    const root = document.getElementById('content');
    if (!root) return;
    if (_vista === 'entrada')             { root.innerHTML = _renderEntrada(); _bindEntrada(); }
    else if (_vista === 'form-presentacion') { root.innerHTML = _renderFormPresentacion(); _bindFormPresentacion(); }
    else if (_vista === 'examen')         { root.innerHTML = _renderExamen(); _bindExamen(); }
    else if (_vista === 'resultados')     { root.innerHTML = _renderResultados(); _bindResultados(); }
    else if (_vista === 'revision')       { _revisionIndice = 0; root.innerHTML = _renderRevision(); _bindRevision(); }
    else if (_vista === 'historial')      { root.innerHTML = _renderHistorial(); _bindHistorial(); }
  }

  function init() {
    _vista = 'entrada';
    _intento = null;
    _ultimoResultado = null;

    const estado = S.estadoDesbloqueo();
    if (!estado.desbloqueado) {
      const root = document.getElementById('content');
      if (root) {
        root.innerHTML = _renderBloqueado(estado);
        const back = root.querySelector('[data-action="sn-volver-g11"]');
        if (back) back.addEventListener('click', () => Router.navigate('grade11'));
      }
      return;
    }
    _rerender();
  }

  function destroy() {
    _vista = 'entrada';
    _intento = null;
  }

  return { init, destroy };
})());
