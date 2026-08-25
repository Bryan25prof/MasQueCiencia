/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/modules/progress.js  |  Módulo: Mi Progreso
   ================================================================
   Muestra:
   1. Hero con nivel, XP y barra de progreso
   2. Grid de medallas (desbloqueadas y bloqueadas)
   3. Progreso por unidad (barras)
   4. Racha de días y estadísticas generales
   5. Historial reciente de XP
   6. Botón de reset (con confirmación)

   Registra el módulo con nombre 'progress'.
================================================================ */

Router.register('progress', (() => {
  'use strict';

  /* ── Colores de unidades ────────────────────────────────── */
  const UNIT_COLORS = {
    'unit-01':'#00BCD4','unit-02':'#1A73E8','unit-03':'#00C853',
    'unit-04':'#9C27B0','unit-05':'#FF6F00','unit-06':'#E91E63',
    'unit-07':'#607D8B','unit-08':'#FF5722','unit-09':'#795548'
  };
  const UNIT_NAMES = {
    'unit-01':'Naturaleza de la Materia',
    'unit-02':'Estructura Atómica',
    'unit-03':'Tabla Periódica',
    'unit-04':'Enlace Químico',
    'unit-05':'Nomenclatura Química',
    'unit-06':'Estequiometría',
    'unit-07':'Soluciones',
    'unit-08':'Ácidos y Bases',
    'unit-09':'Oxidación y Reducción'
  };

  /* ── Renderizado ────────────────────────────────────────── */

  function _build() {
    const data      = Storage.load();
    const levelInfo = Gamification.getLevelInfo();
    const badges    = Gamification.getAllBadges();
    const levels    = Gamification.getAllLevels();
    const user      = data.user;
    const streak    = data.streak;

    /* Stats generales */
    const totalTopics   = Object.values(data.units)
                          .reduce((acc, u) => acc + (u.topicsRead ? u.topicsRead.length : 0), 0);
    const completedUnits = Object.values(data.units).filter(u => u.completed).length;
    const unlockedBadges = badges.filter(b => b.unlocked).length;
    const joinedDate     = user.joined ? new Date(user.joined).toLocaleDateString('es-CR', {
      day:'numeric', month:'long', year:'numeric'
    }) : '—';

    return `
      <div class="mqc-living-bg"></div>
      <div class="progress-page" style="position:relative;z-index:1">

        <!-- Encabezado -->
        <div class="section-header">
          <p class="section-title">Estadísticas de ${_escapeHTML(user.name)}</p>
          <h2 class="section-heading">Mi Progreso</h2>
        </div>

        ${_buildHero(levelInfo, data)}

        ${_buildMultigrado(data)}

        ${_buildStats(streak, totalTopics, completedUnits, unlockedBadges, badges.length, joinedDate)}

        ${_buildXpBar(levelInfo)}

        ${_buildBadges(badges)}

        ${_buildUnitsProgress(data)}

        ${_buildLevelsTable(levelInfo, levels)}

        ${_buildHistory(data)}

        ${_buildResetSection(user)}

      </div>
    `;
  }

  /* Multigrado (Fase 1): identidad académica + resumen 10º + acceso 11º.
     Sección aditiva — no toca ninguna de las secciones existentes.
     Usa los tokens del Design System directamente (mismo patrón que
     grade-select.js) en vez de inventar una clase CSS nueva. */
  function _buildMultigrado(data) {
    const cardStyle = 'background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem;margin-bottom:1rem';
    const meta = (typeof MQCProfiles !== 'undefined' && MQCProfiles.activeId) ? MQCProfiles.get(MQCProfiles.activeId()) : null;
    const lock = data.identityLock || {};
    const g11 = data.grade11Unlock || {};
    const pne = data.pne || {};

    const examsPassed = (typeof UNIDADES_DATA !== 'undefined') ? UNIDADES_DATA.filter(u => {
      const uData = data.units[u.id];
      const passMin = (u.exam && u.exam.pass) || 70;
      return uData && (uData.examBest || 0) >= passMin;
    }).length : 0;

    const identityBlock = `
      <div style="${cardStyle}">
        <h3 style="margin:0 0 .6rem;font-size:.95rem">🪪 Identidad académica</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.6rem;font-size:.85rem">
          <div><span style="color:var(--text-muted)">Nombre</span><br>${_escapeHTML(meta ? meta.alias : data.user.name)}</div>
          <div><span style="color:var(--text-muted)">Grupo</span><br>${_escapeHTML((meta && meta.group) || '—')}</div>
          <div><span style="color:var(--text-muted)">ID de perfil</span><br><span style="font-family:var(--font-code)">${(data.profileMeta && data.profileMeta.profileId) || '—'}</span></div>
          <div><span style="color:var(--text-muted)">Estado</span><br>${lock.locked ? '🔒 Protegida' : '🔓 Editable'}</div>
        </div>
        ${lock.locked ? `<p style="font-size:.78rem;color:var(--text-muted);margin-top:.6rem">Identidad académica protegida — este perfil ya contiene resultados evaluativos. El nombre y el grupo no pueden modificarse para preservar la integridad del progreso.</p>` : ''}
      </div>`;

    const g10Block = `
      <div style="${cardStyle}">
        <h3 style="margin:0 0 .6rem;font-size:.95rem">🧪 Química 10.º</h3>
        <div style="font-size:.85rem;color:var(--text-secondary)">${examsPassed}/9 exámenes aprobados · Mejor Examen Final 10.º: ${pne.bestScore || 0}/100</div>
      </div>`;

    const g11Block = `
      <div style="${cardStyle}">
        <h3 style="margin:0 0 .6rem;font-size:.95rem">🎓 Acceso a Química 11.º</h3>
        ${g11.unlocked
          ? `<div style="font-size:.85rem;color:var(--green)">🔓 Desbloqueada — ${g11.method === 'six-exams' ? 'vía 6 exámenes aprobados' : 'vía Examen Final 10.º ≥80'}, el ${new Date(g11.unlockedAt).toLocaleDateString('es-CR')}</div>`
          : `<div style="font-size:.85rem;color:var(--text-muted)">🔒 Bloqueada — ${examsPassed}/6 exámenes o Examen Final 10.º ${pne.bestScore || 0}/80</div>`}
      </div>`;

    return identityBlock + g10Block + g11Block;
  }

  /* Tarjeta hero con nivel actual */
  function _buildHero(levelInfo, data) {
    return `
      <div class="progress-hero">
        <div class="progress-level-badge">${levelInfo.icon}</div>
        <div class="progress-hero-info">
          <div class="progress-level-name">${levelInfo.name}</div>
          <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;
                      color:var(--text-primary);line-height:1;margin:.2rem 0">
            Nivel ${levelInfo.level}
          </div>
          <div class="progress-xp-text">
            ${levelInfo.maxed
              ? '🏆 Nivel máximo alcanzado — ¡Leyenda Química!'
              : `${levelInfo.xp.toLocaleString()} XP · Faltan ${(levelInfo.xpNext - levelInfo.xp).toLocaleString()} para Nivel ${levelInfo.level + 1}`
            }
          </div>
          <div class="progress-bar" style="margin-top:.6rem;max-width:320px">
            <div class="progress-fill progress-fill-gold" style="width:${levelInfo.percent}%"></div>
          </div>
        </div>
      </div>
    `;
  }

  /* Strip de estadísticas generales */
  function _buildStats(streak, totalTopics, completedUnits, unlockedBadges, totalBadges, joinedDate) {
    return `
      <div class="stats-strip" style="margin-bottom:2rem">
        <div class="stat-card">
          <span class="stat-icon">🔥</span>
          <div>
            <div class="stat-label">Racha actual</div>
            <div class="stat-value" style="color:var(--orange)">${streak.current} día${streak.current !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🏆</span>
          <div>
            <div class="stat-label">Mejor racha</div>
            <div class="stat-value" style="color:var(--gold)">${streak.best} días</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📖</span>
          <div>
            <div class="stat-label">Temas leídos</div>
            <div class="stat-value">${totalTopics}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <div>
            <div class="stat-label">Unidades</div>
            <div class="stat-value">${completedUnits}/9</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🎖️</span>
          <div>
            <div class="stat-label">Medallas</div>
            <div class="stat-value" style="color:var(--gold)">${unlockedBadges}/${totalBadges}</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📅</span>
          <div>
            <div class="stat-label">Desde</div>
            <div class="stat-value" style="font-size:1rem">${joinedDate}</div>
          </div>
        </div>
      </div>
    `;
  }

  /* Barra de XP detallada */
  function _buildXpBar(levelInfo) {
    return `
      <div class="card" style="margin-bottom:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;flex-wrap:wrap;gap:.5rem">
          <div>
            <div class="card-title">XP Total acumulado</div>
            <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:var(--gold)">
              ⚡ ${levelInfo.xp.toLocaleString()} XP
            </div>
          </div>
          ${!levelInfo.maxed ? `
            <div style="text-align:right">
              <div style="font-size:.7rem;color:var(--text-muted)">Próximo nivel</div>
              <div style="font-family:var(--font-code);font-size:.85rem;color:var(--text-secondary)">
                ${Gamification.getLevelObj(levelInfo.level + 1).icon}
                ${Gamification.getLevelObj(levelInfo.level + 1).name}
              </div>
              <div style="font-size:.72rem;color:var(--text-muted)">
                ${levelInfo.xpNext.toLocaleString()} XP necesarios
              </div>
            </div>
          ` : `
            <div style="color:var(--gold);font-weight:700;font-size:.9rem">👑 NIVEL MÁXIMO</div>
          `}
        </div>
        <div class="progress-bar" style="height:12px">
          <div class="progress-fill progress-fill-gold" style="width:${levelInfo.percent}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:.3rem">
          <span style="font-size:.7rem;color:var(--text-muted)">Nivel ${levelInfo.level} (${levelInfo.xpPrev.toLocaleString()} XP)</span>
          <span style="font-size:.7rem;color:var(--gold);font-weight:700">${levelInfo.percent}%</span>
          ${!levelInfo.maxed ? `<span style="font-size:.7rem;color:var(--text-muted)">Nivel ${levelInfo.level + 1} (${levelInfo.xpNext.toLocaleString()} XP)</span>` : ''}
        </div>
      </div>
    `;
  }

  /* Grid de medallas */
  function _buildBadges(badges) {
    const badgeItems = badges.map(b => `
      <div class="badge-item ${b.unlocked ? 'unlocked' : ''}"
           title="${b.desc}${!b.unlocked ? '\n(bloqueada)' : ''}">
        <span class="badge-icon">${b.unlocked ? b.icon : '🔒'}</span>
        <span class="badge-name">${b.name}</span>
      </div>
    `).join('');

    const unlocked = badges.filter(b => b.unlocked).length;

    return `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-title">Medallas desbloqueadas — ${unlocked}/${badges.length}</div>
        <div class="badges-grid">
          ${badgeItems}
        </div>
        <p style="font-size:.75rem;color:var(--text-muted);margin:.75rem 0 0">
          Las medallas bloqueadas muestran la condición de desbloqueo al pasar el cursor.
        </p>
      </div>
    `;
  }

  /* Progreso por unidad */
  function _buildUnitsProgress(data) {
    const rows = Object.keys(UNIT_NAMES).map(unitId => {
      const pct   = Storage.getUnitProgress(unitId);
      const color = UNIT_COLORS[unitId] || 'var(--cyan)';
      const uData = data.units[unitId] || {};
      const num   = unitId.replace('unit-', '');

      return `
        <div class="unit-progress-item">
          <div class="upi-number">U${num}</div>
          <div class="upi-color" style="background:${color}"></div>
          <div class="upi-name">${UNIT_NAMES[unitId]}</div>
          <div class="upi-bar-wrap">
            <div class="upi-pct">${pct}%</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
            </div>
          </div>
          ${uData.completed
            ? '<span style="font-size:.75rem;font-weight:700;color:var(--green);flex-shrink:0">✓ Lista</span>'
            : pct > 0
              ? '<span style="font-size:.72rem;color:var(--text-muted);flex-shrink:0">En progreso</span>'
              : '<span style="font-size:.72rem;color:var(--text-muted);flex-shrink:0">Sin iniciar</span>'
          }
        </div>
      `;
    }).join('');

    return `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-title" style="margin-bottom:1rem">Progreso por Unidad</div>
        <div class="units-progress-list">
          ${rows}
        </div>
      </div>
    `;
  }

  /* Tabla de niveles */
  function _buildLevelsTable(levelInfo, levels) {
    const rows = levels.map(lvl => {
      const isCurrent = lvl.level === levelInfo.level;
      const isReached = levelInfo.xp >= lvl.xp;
      return `
        <tr style="${isCurrent ? 'background:rgba(0,212,255,.06)' : ''}">
          <td style="padding:.5rem .75rem;font-family:var(--font-display);font-size:.8rem;
                     color:${isCurrent ? 'var(--cyan)' : isReached ? 'var(--gold)' : 'var(--text-muted)'}">
            ${lvl.icon} Nv.${lvl.level}
          </td>
          <td style="padding:.5rem .75rem;font-size:.85rem;
                     color:${isCurrent ? 'var(--text-primary)' : isReached ? 'var(--text-secondary)' : 'var(--text-muted)'}">
            ${lvl.name}
            ${isCurrent ? '<span style="font-size:.65rem;background:var(--cyan);color:var(--void);padding:.1rem .4rem;border-radius:4px;margin-left:.4rem;vertical-align:middle">ACTUAL</span>' : ''}
          </td>
          <td style="padding:.5rem .75rem;font-family:var(--font-code);font-size:.8rem;text-align:right;
                     color:${isReached ? 'var(--green)' : 'var(--text-muted)'}">
            ${lvl.xp.toLocaleString()} XP ${isReached ? '✓' : ''}
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-title" style="margin-bottom:.75rem">Tabla de Niveles</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:1px solid var(--border)">
                <th style="padding:.4rem .75rem;text-align:left;font-size:.7rem;
                           color:var(--text-muted);text-transform:uppercase">Nivel</th>
                <th style="padding:.4rem .75rem;text-align:left;font-size:.7rem;
                           color:var(--text-muted);text-transform:uppercase">Nombre</th>
                <th style="padding:.4rem .75rem;text-align:right;font-size:.7rem;
                           color:var(--text-muted);text-transform:uppercase">XP Requerido</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* Historial reciente de XP */
  function _buildHistory(data) {
    const history = [...(data.xp.history || [])].reverse().slice(0, 15);

    if (history.length === 0) {
      return `
        <div class="card" style="margin-bottom:1.5rem;text-align:center">
          <div class="card-title">Historial de XP</div>
          <p style="color:var(--text-muted);font-size:.88rem;padding:1rem 0">
            Aún no hay actividad registrada. ¡Empieza a estudiar para ganar XP!
          </p>
        </div>
      `;
    }

    const rows = history.map(h => {
      const ts   = new Date(h.ts).toLocaleString('es-CR', {
        day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'
      });
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;
                    padding:.5rem 0;border-bottom:1px solid var(--border)">
          <div>
            <div style="font-size:.85rem;color:var(--text-primary)">${_sourceLabel(h.source)}</div>
            <div style="font-size:.7rem;color:var(--text-muted)">${ts}</div>
          </div>
          <div style="font-family:var(--font-display);font-weight:700;
                      color:var(--gold);font-size:.9rem">+${h.amount} XP</div>
        </div>
      `;
    }).join('');

    return `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-title" style="margin-bottom:.75rem">
          Actividad reciente (últimas ${history.length} acciones)
        </div>
        ${rows}
      </div>
    `;
  }

  /* Convierte el ID de fuente a etiqueta legible */
  function _sourceLabel(source) {
    const labels = {
      'daily-login':      '🌅 Inicio de sesión diario',
      'topic-read':       '📖 Tema leído',
      'unit-started':     '🚀 Unidad iniciada',
      'unit-completed':   '✅ Unidad completada',
      'simulator-done':   '⚗️ Simulador completado',
      'game-won':         '🎮 Juego ganado',
      'lab-done':         '🔬 Práctica de laboratorio',
      'exam-done':        '📝 Examen completado',
      'exam-80':          '📝 Examen ≥80%',
      'exam-100':         '📝 Examen perfecto',
      'element-explored': '🔵 Elemento explorado',
      'section-visited':  '🗺️ Sección visitada',
      'streak-3':         '🔥 Racha de 3 días',
      'streak-7':         '🔥 Racha de 7 días'
    };
    return labels[source] || `⚡ ${source}`;
  }

  /* Sección de reset */
  function _buildResetSection(user) {
    return `
      <div class="card" style="margin-bottom:2rem;border-color:rgba(255,34,102,.2)">
        <div class="card-title" style="color:var(--red)">⚠️ Zona de Peligro</div>
        <p style="color:var(--text-secondary);font-size:.88rem;margin:.5rem 0 1rem">
          Borrar todos los datos eliminará tu progreso, XP, medallas y configuración.
          <strong style="color:var(--red)">Esta acción es irreversible.</strong>
        </p>
        <button class="btn btn-danger btn-sm" id="reset-data-btn">
          🗑️ Borrar todos mis datos
        </button>
      </div>
    `;
  }

  /* Escapa HTML */
  function _escapeHTML(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Eventos ────────────────────────────────────────────── */

  function _bindEvents() {
    /* Reset con confirmación */
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const confirmed = window.confirm(
          '⚠️ ¿Estás seguro de que quieres borrar TODO tu progreso?\n\n' +
          'Se eliminarán: XP, nivel, medallas, progreso por unidad y racha.\n' +
          'Esta acción NO se puede deshacer.'
        );
        if (confirmed) {
          Storage.reset();
          /* Recargar la app completa.
             EOP-037: antes comprobaba "window.App" (siempre undefined,
             mismo bug que en gamification.js) — la página nunca se
             recargaba tras confirmar el borrado. */
          location.reload();
        }
      });
    }
  }

  /* ── Interfaz del módulo ────────────────────────────────── */

  function init() {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = _build();
    _bindEvents();

    /* Verificar medallas al abrir la sección */
    Gamification.checkBadges();
  }

  function destroy() {
    /* Sin limpieza especial necesaria */
  }

  return { init, destroy };

})());
