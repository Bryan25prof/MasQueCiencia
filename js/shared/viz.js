/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/viz.js  |  EOP-004 §2.3 — Biblioteca gráfica OFICIAL
   ================================================================
   Primitivas gráficas SVG reutilizables por TODAS las unidades.
   No está diseñada solo para la Unidad II: es la biblioteca base
   de MásQueCiencia (átomos hoy, moléculas/iones/reacciones mañana).

   Primitivas:
     VIZ.svg(inner, viewBox)         · envoltura <svg>
     VIZ.particle(tipo, x, y, r)     · protón / neutrón / electrón
     VIZ.nucleus(p, n, cx, cy, r)    · núcleo con nucleones
     VIZ.orbit(cx, cy, r)            · órbita (anillo)
     VIZ.shell(cx, cy, r, e, anim)   · órbita + electrones distribuidos
     VIZ.bohrAtom({...})             · átomo de Bohr completo (animable)
     VIZ.energyDiagram(config)       · diagrama de niveles con flechas (spin)
     VIZ.arrow(x1,y1,x2,y2, color)   · flecha
   Colores (con fallback): protón rojo (+), neutrón gris (0), electrón azul (−).
   Las animaciones usan clases CSS definidas en standards.css (sin JS de loop).
================================================================ */

window.VIZ = (function () {
  'use strict';

  const COL = {
    proton:  'var(--red, #FF2266)',
    neutron: 'var(--text-muted, #8484D6)',
    electron:'var(--cyan, #1FDBFF)', /* EOP-030.5: antes var(--blue,...) — --blue nunca existió como token; el fallback #2D9CDB (viejo) se usaba SIEMPRE */
    orbit:   'var(--border, #2a3340)',
    nucleus: 'var(--gold, #FFD700)'
  };
  const LABEL = { proton: '+', neutron: '0', electron: '−' };

  function svg(inner, viewBox) {
    return `<svg class="viz-svg" viewBox="${viewBox || '0 0 300 300'}" xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
  }

  /* Partícula básica con etiqueta de carga */
  function particle(tipo, x, y, r) {
    r = r || 9;
    const c = COL[tipo] || COL.electron;
    return `<g class="viz-particle viz-${tipo}">
      <circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>
      <text x="${x}" y="${y + r * 0.35}" text-anchor="middle"
            font-size="${r * 1.1}" fill="#fff" font-family="sans-serif">${LABEL[tipo] || ''}</text>
    </g>`;
  }

  /* Núcleo: cúmulo de protones y neutrones */
  function nucleus(p, n, cx, cy, r) {
    cx = cx || 150; cy = cy || 150; r = r || 26;
    const total = Math.max(1, p + n);
    let out = `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="${COL.nucleus}" opacity=".12"/>`;
    /* Distribuye nucleones en espiral simple dentro del núcleo */
    const seq = [];
    for (let i = 0; i < p; i++) seq.push('proton');
    for (let i = 0; i < n; i++) seq.push('neutron');
    seq.forEach((t, i) => {
      const ang = i * 2.399963; /* ángulo áureo */
      const rad = (r * 0.72) * Math.sqrt(i / total);
      const x = cx + rad * Math.cos(ang);
      const y = cy + rad * Math.sin(ang);
      out += particle(t, x, y, 7);
    });
    return out;
  }

  /* Órbita (anillo) */
  function orbit(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
                    stroke="${COL.orbit}" stroke-width="1.2" opacity=".8"/>`;
  }

  /* Capa: órbita + e⁻ distribuidos uniformemente; anim = rota la capa */
  function shell(cx, cy, r, e, anim, idx) {
    let out = orbit(cx, cy, r);
    if (e <= 0) return out;
    let pts = '';
    for (let i = 0; i < e; i++) {
      const ang = (2 * Math.PI * i) / e - Math.PI / 2;
      pts += particle('electron', cx + r * Math.cos(ang), cy + r * Math.sin(ang), 7);
    }
    const cls = anim ? `viz-rotate viz-rotate-${(idx % 3) + 1}` : '';
    /* transform-origin en el centro para rotar la capa completa */
    out += `<g class="${cls}" style="transform-origin:${cx}px ${cy}px">${pts}</g>`;
    return out;
  }

  /* Distribuye un nº de electrones en capas 2,8,18,32 (Bohr simplificado) */
  function shellsFor(electrons) {
    const cap = [2, 8, 18, 32];
    const shells = [];
    let rem = electrons;
    for (let i = 0; i < cap.length && rem > 0; i++) {
      const e = Math.min(cap[i], rem);
      shells.push(e); rem -= e;
    }
    return shells;
  }

  /* Átomo de Bohr completo */
  function bohrAtom(opts) {
    opts = opts || {};
    const p = opts.protons || 0, n = opts.neutrons || 0;
    const e = (typeof opts.electrons === 'number') ? opts.electrons : p;
    const animate = opts.animate !== false;
    const size = opts.size || 300, c = size / 2;
    const shells = opts.shells || shellsFor(e);
    let inner = '';
    shells.forEach((eCount, i) => {
      const r = 44 + i * 26;
      inner += shell(c, c, r, eCount, animate, i);
    });
    inner += nucleus(p, n, c, c, 24);
    return svg(inner, `0 0 ${size} ${size}`);
  }

  /* Flecha (para diagramas y spin) */
  function arrow(x1, y1, x2, y2, color) {
    color = color || COL.electron;
    const id = 'ah' + Math.random().toString(36).slice(2, 7);
    return `<defs><marker id="${id}" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="${color}"/></marker></defs>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" marker-end="url(#${id})"/>`;
  }

  /* Diagrama de niveles de energía con cajas de orbitales y flechas de spin.
     config: [ { label:'1s', electrons:2 }, { label:'2s', electrons:2 }, ... ] */
  function energyDiagram(config) {
    const rowH = 34, boxW = 22, pad = 50;
    const h = pad + config.length * rowH + 20;
    let inner = '';
    config.forEach((orb, i) => {
      const y = h - 30 - i * rowH;
      /* nº de cajas según subnivel: s=1, p=3, d=5, f=7 */
      const letter = orb.label.replace(/[0-9]/g, '').toLowerCase();
      const boxes = { s: 1, p: 3, d: 5, f: 7 }[letter] || 1;
      inner += `<text x="20" y="${y + 14}" font-size="13" fill="var(--text-secondary,#b8c2cc)" font-family="monospace">${orb.label}</text>`;
      let placed = 0;
      for (let b = 0; b < boxes; b++) {
        const x = pad + b * (boxW + 6);
        inner += `<rect x="${x}" y="${y}" width="${boxW}" height="${rowH - 12}" rx="2"
                        fill="none" stroke="var(--border,#2a3340)"/>`;
      }
      /* Reparte electrones (regla de Hund: primero uno por caja) */
      let e = orb.electrons || 0;
      const arrowsUp = [], arrowsDn = [];
      for (let b = 0; b < boxes && e > 0; b++) { arrowsUp.push(b); e--; }
      for (let b = 0; b < boxes && e > 0; b++) { arrowsDn.push(b); e--; }
      arrowsUp.forEach(b => {
        const x = pad + b * (boxW + 6) + boxW / 2;
        inner += arrow(x - 4, y + rowH - 14, x - 4, y + 2, COL.electron);
      });
      arrowsDn.forEach(b => {
        const x = pad + b * (boxW + 6) + boxW / 2;
        inner += arrow(x + 4, y + 2, x + 4, y + rowH - 14, COL.proton);
      });
    });
    inner = `<text x="20" y="22" font-size="13" fill="var(--text-muted,#8484D6)">Energía ↑</text>` + inner;
    const w = pad + 7 * (boxW + 6) + 10;
    return svg(inner, `0 0 ${w} ${h}`);
  }

  /* ════════════════════════════════════════════════════════════
     PRIMITIVAS DE TABLA PERIÓDICA (HTML) — Unidad III en adelante.
     Devuelven HTML (cuadrícula CSS) por ser interactivas y de grilla.
     Reutilizables por cualquier unidad que trabaje con elementos.
     ════════════════════════════════════════════════════════════ */

  /* Color en escala de calor (frío→caliente) según valor normalizado 0..1 */
  function heatColor(t) {
    if (t == null || isNaN(t)) return 'var(--bg-elevated, #1a2230)';
    t = Math.max(0, Math.min(1, t));
    const stops = [[26,115,232], [255,179,0], [229,57,53]]; /* azul → ámbar → rojo */
    const seg = t < 0.5 ? 0 : 1, lt = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
    const a = stops[seg], b = stops[seg + 1];
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * lt));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  /* Celda de un elemento (HTML). opts: {z,symbol,name,sub,bg,active,dim,title,data} */
  function elementCell(opts) {
    opts = opts || {};
    const bg = opts.bg || 'var(--bg-card, #141b24)';
    const cls = 'viz-el-cell' + (opts.active ? ' viz-el-active' : '') + (opts.dim ? ' viz-el-dim' : '');
    const attr = opts.data ? Object.entries(opts.data).map(([k, v]) => `data-${k}="${v}"`).join(' ') : '';
    return `<div class="${cls}" style="background:${bg}" title="${opts.title || opts.name || ''}" ${attr}>
        ${opts.z != null ? `<span class="viz-el-z">${opts.z}</span>` : ''}
        <span class="viz-el-sym">${opts.symbol || ''}</span>
        ${opts.sub != null ? `<span class="viz-el-sub">${opts.sub}</span>` : ''}
      </div>`;
  }

  /* Mini-tabla periódica (cuadrícula 18 columnas). cells colocadas por group/period.
     Lantánidos/actínidos (group null) se ubican en filas 8-9. */
  function periodicGrid(cells, opts) {
    opts = opts || {};
    const main = []; const fblock = [];
    (cells || []).forEach(c => { if (c.group == null) fblock.push(c); else main.push(c); });
    let html = '<div class="viz-ptable">';
    main.forEach(c => {
      html += `<div class="viz-ptable-cell" style="grid-column:${c.group};grid-row:${c.period}">${elementCell(c)}</div>`;
    });
    if (fblock.length && opts.fblock !== false) {
      const lan = fblock.filter(c => c.period === 6).sort((a, b) => a.z - b.z);
      const act = fblock.filter(c => c.period === 7).sort((a, b) => a.z - b.z);
      lan.forEach((c, i) => { html += `<div class="viz-ptable-cell" style="grid-column:${3 + i};grid-row:8">${elementCell(c)}</div>`; });
      act.forEach((c, i) => { html += `<div class="viz-ptable-cell" style="grid-column:${3 + i};grid-row:9">${elementCell(c)}</div>`; });
    }
    html += '</div>';
    return html;
  }

  /* Flecha de tendencia con etiqueta (SVG) */
  function trendArrow(direction, label, color) {
    color = color || COL.electron;
    const horiz = direction === 'right' || direction === 'left';
    const w = horiz ? 160 : 60, h = horiz ? 50 : 160;
    let x1, y1, x2, y2;
    if (direction === 'right') { x1 = 8; y1 = 25; x2 = 150; y2 = 25; }
    else if (direction === 'left') { x1 = 152; y1 = 25; x2 = 10; y2 = 25; }
    else if (direction === 'down') { x1 = 30; y1 = 8; x2 = 30; y2 = 150; }
    else { x1 = 30; y1 = 152; x2 = 30; y2 = 10; }
    return svg(arrow(x1, y1, x2, y2, color) +
      `<text x="${horiz ? w / 2 : 44}" y="${horiz ? 44 : h / 2}" font-size="12" fill="${color}" font-family="sans-serif" text-anchor="${horiz ? 'middle' : 'start'}">${label || ''}</text>`,
      `0 0 ${w} ${h}`);
  }

  /* ════════════════════════════════════════════════════════════
     PRIMITIVAS DE LEWIS Y ENLACE (SVG componibles) — Unidad IV en
     adelante. Reutilizables por Enlace, Arquitectura Molecular,
     Polaridad, Nomenclatura y Química Orgánica.
     Devuelven FRAGMENTOS SVG; envolver con VIZ.svg(...).
     ════════════════════════════════════════════════════════════ */

  /* Puntos de valencia alrededor de un centro (regla de Lewis:
     uno por lado hasta 4, luego se emparejan). count 0..8. */
  function lewisDots(cx, cy, count, opts) {
    opts = opts || {};
    const R = opts.r || 26;          /* distancia del símbolo al lado */
    const dr = opts.dot || 3;        /* radio del punto */
    const sep = opts.sep || 6;       /* separación del par */
    const color = opts.color || COL.electron;
    count = Math.max(0, Math.min(count || 0, 8));
    const sides = [
      { x: 0, y: -R, sx: 1, sy: 0 },  /* top */
      { x: R, y: 0, sx: 0, sy: 1 },   /* right */
      { x: 0, y: R, sx: 1, sy: 0 },   /* bottom */
      { x: -R, y: 0, sx: 0, sy: 1 }   /* left */
    ];
    /* electrones por lado: reparto uno a uno (1ª vuelta), luego el 2º (par) */
    const per = [0, 0, 0, 0];
    for (let i = 0; i < count; i++) per[i % 4]++;
    let out = '';
    for (let s = 0; s < 4; s++) {
      if (per[s] === 0) continue;
      const side = sides[s], base = { x: cx + side.x, y: cy + side.y };
      if (per[s] === 1) {
        out += `<circle cx="${base.x}" cy="${base.y}" r="${dr}" fill="${color}"/>`;
      } else {
        out += `<circle cx="${base.x - side.sx * sep / 2}" cy="${base.y - side.sy * sep / 2}" r="${dr}" fill="${color}"/>`;
        out += `<circle cx="${base.x + side.sx * sep / 2}" cy="${base.y + side.sy * sep / 2}" r="${dr}" fill="${color}"/>`;
      }
    }
    return out;
  }

  /* Átomo de Lewis: símbolo + puntos de valencia. Fragmento. */
  function lewisAtom(opts) {
    opts = opts || {};
    const cx = opts.cx != null ? opts.cx : 50, cy = opts.cy != null ? opts.cy : 50;
    const color = opts.color || 'var(--text-primary, #e8eef4)';
    const sym = opts.symbol || '';
    const fs = opts.fontSize || 20;
    return `<g class="viz-lewis-atom">
      <text x="${cx}" y="${cy + fs * 0.34}" text-anchor="middle" font-size="${fs}" font-weight="700"
            fill="${color}" font-family="var(--font-display, sans-serif)">${sym}</text>
      ${lewisDots(cx, cy, opts.valence || 0, { r: opts.r, color: opts.dotColor || COL.electron })}
    </g>`;
  }

  /* Enlace covalente: order 1/2/3 (simple/doble/triple). Fragmento. */
  function bond(x1, y1, x2, y2, order, color) {
    order = order || 1; color = color || 'var(--text-secondary, #aab4c0)';
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const gap = 4, offs = order === 1 ? [0] : order === 2 ? [-gap, gap] : [-gap, 0, gap];
    return offs.map(o =>
      `<line x1="${x1 + nx * o}" y1="${y1 + ny * o}" x2="${x2 + nx * o}" y2="${y2 + ny * o}"
             stroke="${color}" stroke-width="3" stroke-linecap="round"/>`).join('');
  }

  /* Par de electrones compartido (dos puntos). Fragmento. */
  function sharedPair(x, y, color) {
    color = color || COL.electron;
    return `<circle cx="${x - 4}" cy="${y}" r="3" fill="${color}"/><circle cx="${x + 4}" cy="${y}" r="3" fill="${color}"/>`;
  }

  /* Ion con carga: círculo + símbolo + carga (Na⁺, Cl⁻). Fragmento. */
  function ion(opts) {
    opts = opts || {};
    const cx = opts.cx != null ? opts.cx : 50, cy = opts.cy != null ? opts.cy : 50;
    const r = opts.r || 28;
    const charge = opts.charge || '';
    const positive = ('' + charge).indexOf('−') === -1 && ('' + charge).indexOf('-') === -1;
    const fill = opts.fill || (positive ? 'var(--red, #FF2266)' : 'var(--cyan, #1FDBFF)');
    return `<g class="viz-ion">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".22" stroke="${fill}" stroke-width="2"/>
      <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="${r * 0.8}" font-weight="700"
            fill="${fill}" font-family="var(--font-display, sans-serif)">${opts.symbol || ''}</text>
      <text x="${cx + r * 0.7}" y="${cy - r * 0.45}" text-anchor="middle" font-size="${r * 0.55}"
            fill="${fill}" font-family="sans-serif">${charge}</text>
    </g>`;
  }

  /* "Mar de electrones" del enlace metálico. Fragmento. */
  function electronSea(opts) {
    opts = opts || {};
    const cols = opts.cols || 4, rows = opts.rows || 3;
    const gap = opts.gap || 46, ox = opts.x || 36, oy = opts.y || 36;
    const sym = opts.symbol || 'M';
    let out = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = ox + c * gap, y = oy + r * gap;
      out += `<circle cx="${x}" cy="${y}" r="14" fill="var(--gold, #FFD700)" opacity=".25" stroke="var(--gold, #FFD700)"/>
              <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" fill="var(--gold,#FFD700)" font-family="sans-serif">${sym}⁺</text>`;
    }
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = ox + c * gap + gap / 2, y = oy + r * gap + gap / 2;
      out += `<circle cx="${x}" cy="${y}" r="3.5" fill="${COL.electron}"/>`;
    }
    return out;
  }

  return { svg, particle, nucleus, orbit, shell, shellsFor, bohrAtom, arrow, energyDiagram, COL,
           heatColor, elementCell, periodicGrid, trendArrow,
           lewisDots, lewisAtom, bond, sharedPair, ion, electronSea };
})();
