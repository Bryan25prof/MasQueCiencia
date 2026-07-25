/* ================================================================
   MÁSQUECIENCIA / Química Interactiva 10° — Lic. Bryan Chavarría C.
   js/shared/profiles-ui.js  |  UI de Perfiles Locales MQC (EOP-008)
   ================================================================
   Interfaz del sistema de Perfiles Locales:
   - Gate de arranque (crear/seleccionar perfil o entrar como invitado).
   - Chip flotante para cambiar/administrar perfiles.
   - Administrador (crear, editar, avatar, seleccionar, eliminar, reiniciar,
     exportar, importar).
   - Sección "Privacidad y almacenamiento".
   Solo se activa en un navegador real (no en el arnés de pruebas).
   Reutiliza el Design System v1.0 (tokens var(--…)). Depende de MQCProfiles.
================================================================ */
window.MQCProfilesUI = (function () {
  'use strict';

  const AVATARS = ['🧪','🔬','⚗️','🧬','⚛️','🌡️','💧','🔥','🧲','💡','🌱','⭐'];
  function P(){ return (typeof MQCProfiles !== 'undefined') ? MQCProfiles : null; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function fecha(ts){ try { return new Date(ts).toLocaleDateString('es-CR',{day:'2-digit',month:'short',year:'numeric'}); } catch(e){ return '—'; } }

  /* ── overlay base ── */
  function _overlay(id){
    let ov = document.getElementById(id);
    if (ov) ov.remove();
    ov = document.createElement('div');
    ov.id = id;
    ov.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(4,10,14,.82);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:pageIn .25s ease';
    document.body.appendChild(ov);
    return ov;
  }
  function _panel(html, maxw){
    return `<div style="background:var(--bg-card,#143843);border:1px solid var(--border,#1e1e4a);border-radius:var(--radius-lg,16px);max-width:${maxw||520}px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.5)">${html}</div>`;
  }
  function _accent(){ return 'var(--cyan,#1FDBFF)'; }

  /* ── Retícula molecular (nanotubo/fullereno) — EOP-023 ──────────
     Genera un SVG de nodos (átomos) conectados por enlaces, en
     disposición hexagonal real (no una cuadrícula ortogonal). Se usa
     únicamente como fondo decorativo del portal de entrada. */
  function _moleculeSVG(vb, cols, rows, color, nodeR){
    const hexR = vb/(cols*1.8), dx = hexR*1.5, dy = hexR*Math.sqrt(3);
    const nodes = {}; let lines='', circles='';
    for (let c=0;c<cols;c++){
      for (let r=0;r<rows;r++){
        const x = c*dx;
        let y = r*dy + (c%2===1 ? dy/2 : 0);
        nodes[c+'_'+r] = [x,y];
      }
    }
    Object.keys(nodes).forEach(k=>{
      const [c,r]=k.split('_').map(Number), [x,y]=nodes[k];
      circles += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${nodeR}" fill="${color}" opacity=".55"/>`;
      [[c+1,r],[c,r+1]].forEach(([nc,nr])=>{
        const nk = nc+'_'+nr;
        if (nodes[nk]){
          const [x2,y2]=nodes[nk];
          lines += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="1" opacity=".32"/>`;
        }
      });
    });
    return `<svg viewBox="0 0 ${vb} ${vb}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${lines}${circles}</svg>`;
  }

  /* ── descarga de archivo (export) ── */
  function _download(filename, text){
    try {
      const blob = new Blob([text], { type:'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 100);
    } catch(e){ alert('No se pudo generar el archivo de respaldo.'); }
  }

  /* ── GATE de arranque ── */
  function openGate(){
    const p = P(); if (!p) return;
    /* EOP-022: portal de entrada. La lógica de MQCProfiles no cambia en
       absoluto — solo el markup/CSS de presentación de openGate(). */
    let ov = document.getElementById('mqc-gate');
    if (ov) ov.remove();
    ov = document.createElement('div');
    ov.id = 'mqc-gate';
    ov.className = 'mqc-gate-atmosphere';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'mqc-gate-headline-id');

    const profs = p.list();
    const listHTML = profs.length ? profs.map(pr=>`
      <button data-select="${pr.id}" class="mqc-badge-profile">
        <span class="mqc-badge-icon">${esc(pr.avatar)}</span>
        <span style="flex:1"><span class="mqc-badge-name">${esc(pr.alias)}</span><span class="mqc-badge-meta">${pr.group?esc(pr.group)+' · ':''}${pr.xp} XP · Nivel ${pr.level} · ${pr.completed} ✓</span></span>
        <span style="color:${_accent()};font-size:.8rem">Entrar →</span>
      </button>`).join('') : `<p style="color:var(--text-muted);font-size:.88rem;text-align:center;padding:.5rem 0">Todavía no hay perfiles en este equipo. Crea el primero para empezar a explorar.</p>`;

    ov.innerHTML = `
      <div class="mqc-stars"></div>
      <div class="mqc-gate-molecule a">${_moleculeSVG(640,9,11,'#7B2FFF',3.2)}</div>
      <div class="mqc-gate-molecule b">${_moleculeSVG(520,8,10,'#1FDBFF',2.8)}</div>
      <div class="mqc-gate-photons">${[10,25,42,58,73,88].map((left,i)=>`<i style="left:${left}%;bottom:${5+((i*13)%40)}%;animation-duration:${20+i*4}s;animation-delay:-${i*5}s"></i>`).join('')}</div>
      <div class="mqc-gate-stage">
        <h1 class="mqc-gate-headline" id="mqc-gate-headline-id">La ciencia empieza con <em>una buena pregunta</em>.</h1>
        <p class="mqc-gate-subheadline">Aprender química no es memorizar: es descubrir cómo funciona el mundo. Entra a tu laboratorio digital para continuar tu exploración.</p>
        <div class="mqc-gate-card">
          <div class="mqc-gate-card-label"><span class="dot"></span> ${profs.length ? 'Selecciona tu perfil científico para comenzar tu experiencia.' : 'Crea tu primer perfil científico y comienza tu viaje por MásQueCiencia.'}</div>
          <div style="margin-bottom:.3rem" class="mqc-gate-content-fade">${listHTML}</div>
          <div id="mqc-gate-create"></div>
          <div class="mqc-gate-actions mqc-gate-action-fade">
            <button id="mqc-gate-new" class="btn btn-primary mqc-gate-primary-action">＋ Crear tu perfil científico</button>
            <div class="mqc-gate-secondary-actions">
              <button id="mqc-gate-import">⬆ Importar respaldo</button>
              <button id="mqc-gate-guest">👤 Entrar como invitado</button>
            </div>
          </div>
          <input type="file" id="mqc-gate-file" accept="application/json,.json" style="display:none">
          <p style="text-align:center;margin:1rem 0 0"><button id="mqc-gate-privacy" style="background:none;border:none;color:var(--text-muted);font-size:.76rem;text-decoration:underline;cursor:pointer">🔒 Privacidad y almacenamiento</button></p>
        </div>
      </div>`;
    document.body.appendChild(ov);

    ov.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>{ p.select(b.getAttribute('data-select')); location.reload(); }));
    ov.querySelector('#mqc-gate-new').addEventListener('click',()=>_gateCreateForm(ov));
    ov.querySelector('#mqc-gate-guest').addEventListener('click',()=>{ p.enterGuest(); location.reload(); });
    const file = ov.querySelector('#mqc-gate-file');
    ov.querySelector('#mqc-gate-import').addEventListener('click',()=>file.click());
    file.addEventListener('change',e=>_handleImportFile(e, ()=>location.reload()));
    ov.querySelector('#mqc-gate-privacy').addEventListener('click',openPrivacy);
  }

  function _gateCreateForm(ov){
    const host = ov.querySelector('#mqc-gate-create');
    host.innerHTML = `<div class="mqc-gate-create-panel" style="background:var(--bg-deep,#0d0d24);border-radius:var(--radius-md,12px);padding:1rem;margin:.3rem 0 .8rem;border:1px solid var(--border)">
      <input id="mqc-nf-alias" placeholder="Alias (ej. Bryan)" maxlength="24" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <input id="mqc-nf-group" placeholder="Grupo/sección (opcional)" maxlength="16" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <p style="font-size:.72rem;color:var(--text-muted);margin:0 0 .4rem">Elige tu insignia:</p>
      <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.6rem" id="mqc-nf-avatars">${AVATARS.map((a,i)=>`<button data-av="${a}" class="mqc-avatar-btn${i===0?' active':''}">${a}</button>`).join('')}</div>
      <button id="mqc-nf-go" class="btn btn-primary btn-sm" style="width:100%">Crear y entrar</button>
      <p id="mqc-nf-err" style="color:var(--red,#FF6B6B);font-size:.8rem;margin:.4rem 0 0;min-height:1em"></p>
    </div>`;
    let av = AVATARS[0];
    host.querySelectorAll('[data-av]').forEach(b=>b.addEventListener('click',()=>{ av=b.getAttribute('data-av'); host.querySelectorAll('[data-av]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); }));
    host.querySelector('#mqc-nf-go').addEventListener('click',()=>{
      const alias=host.querySelector('#mqc-nf-alias').value;
      const group=host.querySelector('#mqc-nf-group').value;
      const r=P().create(alias,group,av);
      if(!r.ok){ host.querySelector('#mqc-nf-err').textContent=r.message||'No se pudo crear.'; return; }
      location.reload();
    });
  }

  /* ── manejo de importación de archivo ── */
  function _handleImportFile(e, onOk){
    const f = e.target.files && e.target.files[0]; if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const r = P().importProfile(String(reader.result));
      if(r.ok){ alert('✓ '+ (r.message||'Perfil importado.')); onOk && onOk(); }
      else alert('⚠️ '+(r.message||'No se pudo importar el archivo.'));
    };
    reader.onerror = ()=>alert('⚠️ No se pudo leer el archivo.');
    reader.readAsText(f);
  }

  /* ── CHIP flotante ── */
  function mountChip(){
    const p = P(); if(!p) return;
    if (document.getElementById('mqc-chip')) return;
    const meta = p.isGuest() ? { alias:'Invitado', avatar:'👤' } : (p.activeMeta() || { alias:'Perfil', avatar:'🧪' });
    const chip = document.createElement('button');
    chip.id = 'mqc-chip';
    chip.title = 'Perfiles Locales MQC';
    chip.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:8500;display:flex;align-items:center;gap:.5rem;background:var(--bg-elevated,#1e1e4a);border:1px solid var(--border,#1e1e4a);border-radius:999px;padding:.4rem .8rem .4rem .5rem;color:var(--text-primary,#E8E8FF);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35);font-family:var(--font-body,sans-serif);font-size:.85rem';
    chip.innerHTML = `<span style="font-size:1.3rem">${esc(meta.avatar)}</span><span style="font-weight:700">${esc(meta.alias)}</span>`;
    chip.addEventListener('click',()=>{ (p.isGuest()) ? openManager() : openChipMenu(); });
    document.body.appendChild(chip);
  }

  /* menú rápido del chip: Mi Bitácora / Administrar perfiles */
  function openChipMenu(){
    const ov=_overlay('mqc-chipmenu');
    ov.style.alignItems='flex-end'; ov.style.justifyContent='flex-end'; ov.style.padding='0';
    ov.innerHTML=`<div style="margin:0 1rem 4.2rem 0;background:var(--bg-card,#143843);border:1px solid var(--border,#1e1e4a);border-radius:var(--radius-lg,16px);padding:.5rem;min-width:210px;box-shadow:0 12px 40px rgba(0,0,0,.5)">
      <button id="mqc-cm-bit" style="display:flex;align-items:center;gap:.6rem;width:100%;text-align:left;background:none;border:none;color:var(--text-primary,#E8E8FF);padding:.7rem .8rem;border-radius:var(--radius-md,12px);cursor:pointer;font-size:.9rem">📔 Mi Bitácora Científica</button>
      <button id="mqc-cm-mgr" style="display:flex;align-items:center;gap:.6rem;width:100%;text-align:left;background:none;border:none;color:var(--text-primary,#E8E8FF);padding:.7rem .8rem;border-radius:var(--radius-md,12px);cursor:pointer;font-size:.9rem">👥 Cambiar / administrar perfiles</button>
      <button id="mqc-cm-priv" style="display:flex;align-items:center;gap:.6rem;width:100%;text-align:left;background:none;border:none;color:var(--text-muted,#8484D6);padding:.7rem .8rem;border-radius:var(--radius-md,12px);cursor:pointer;font-size:.84rem">🔒 Privacidad</button>
    </div>`;
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
    ov.querySelector('#mqc-cm-bit').addEventListener('click',()=>{ ov.remove(); openBitacora(); });
    ov.querySelector('#mqc-cm-mgr').addEventListener('click',()=>{ ov.remove(); openManager(); });
    ov.querySelector('#mqc-cm-priv').addEventListener('click',()=>{ ov.remove(); openPrivacy(); });
  }

  /* ── ADMINISTRADOR ── */
  function openManager(){
    const p = P(); if(!p) return;
    const ov = _overlay('mqc-manager');
    const profs = p.list();
    const rows = profs.map(pr=>`
      <div style="background:var(--bg-elevated,#1e1e4a);border:1px solid var(--border,#1e1e4a);border-left:3px solid ${pr.active?_accent():'var(--border,#1e1e4a)'};border-radius:var(--radius-md,12px);padding:.7rem .85rem;margin-bottom:.55rem">
        <div style="display:flex;align-items:center;gap:.7rem">
          <span style="font-size:1.7rem">${esc(pr.avatar)}</span>
          <div style="flex:1"><div style="font-weight:700;color:var(--text-primary,#E8E8FF)">${esc(pr.alias)} ${pr.active?'<span style="font-size:.7rem;color:'+_accent()+'">● activo</span>':''}</div>
            <div style="font-size:.74rem;color:var(--text-muted,#8484D6)">${pr.group?esc(pr.group)+' · ':''}${pr.xp} XP · Nivel ${pr.level} · ${pr.completed} ✓ · últ. ${fecha(pr.lastAccess)}</div></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.55rem">
          ${pr.active?'':`<button data-act="select" data-id="${pr.id}" class="btn btn-primary btn-sm">Seleccionar</button>`}
          <button data-act="edit" data-id="${pr.id}" class="btn btn-ghost btn-sm">✏️ Editar</button>
          <button data-act="export" data-id="${pr.id}" class="btn btn-ghost btn-sm">⬇ Exportar</button>
          <button data-act="reset" data-id="${pr.id}" class="btn btn-ghost btn-sm">↻ Reiniciar</button>
          <button data-act="delete" data-id="${pr.id}" class="btn btn-ghost btn-sm" style="color:var(--red,#FF6B6B)">🗑 Eliminar</button>
        </div>
      </div>`).join('') || `<p style="color:var(--text-muted,#8484D6);text-align:center;font-size:.88rem">No hay perfiles.</p>`;

    ov.innerHTML = _panel(`
      <div style="padding:1.3rem 1.4rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem">
          <h2 style="margin:0;color:var(--text-primary,#E8E8FF);font-size:1.2rem">👥 Perfiles Locales</h2>
          <button id="mqc-mgr-close" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:1.4rem;cursor:pointer;line-height:1">×</button>
        </div>
        <p style="margin:0 0 .8rem;font-size:.8rem;color:var(--text-muted,#8484D6)">${p.count()}/${p.MAX_PROFILES} perfiles en este equipo${p.isGuest()?' · <strong style="color:'+_accent()+'">estás en modo invitado</strong>':''}</p>
        <div>${rows}</div>
        ${p.hasActive()?`<button id="mqc-mgr-bit" class="btn btn-ghost btn-sm" style="width:100%;margin:.2rem 0 .4rem">📔 Ver Mi Bitácora Científica</button>`:''}
        <div id="mqc-mgr-create"></div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.6rem">
          <button id="mqc-mgr-new" class="btn btn-primary btn-sm" style="flex:1" ${p.canCreate()?'':'disabled'}>＋ Nuevo perfil</button>
          <button id="mqc-mgr-import" class="btn btn-ghost btn-sm" style="flex:1">⬆ Importar</button>
        </div>
        <input type="file" id="mqc-mgr-file" accept="application/json,.json" style="display:none">
        <p style="text-align:center;margin:.9rem 0 0"><button id="mqc-mgr-privacy" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:.78rem;text-decoration:underline;cursor:pointer">🔒 Privacidad y almacenamiento</button></p>
      </div>`);

    ov.querySelector('#mqc-mgr-close').addEventListener('click',()=>ov.remove());
    const bitBtn = ov.querySelector('#mqc-mgr-bit');
    if (bitBtn) bitBtn.addEventListener('click',()=>{ ov.remove(); openBitacora(); });
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
    ov.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>_mgrAction(b.getAttribute('data-act'), b.getAttribute('data-id'))));
    ov.querySelector('#mqc-mgr-new').addEventListener('click',()=>_mgrCreateForm(ov));
    const file = ov.querySelector('#mqc-mgr-file');
    ov.querySelector('#mqc-mgr-import').addEventListener('click',()=>file.click());
    file.addEventListener('change',e=>_handleImportFile(e, ()=>location.reload()));
    ov.querySelector('#mqc-mgr-privacy').addEventListener('click',openPrivacy);
  }

  function _mgrAction(act, id){
    const p = P();
    if (act==='select'){ p.select(id); location.reload(); }
    else if (act==='export'){ const r=p.exportProfile(id); if(r.ok)_download(r.filename,r.json); }
    else if (act==='reset'){ if(confirm('¿Reiniciar TODO el progreso de este perfil? Esta acción no se puede deshacer.')){ p.resetProgress(id); location.reload(); } }
    else if (act==='delete'){ if(confirm('¿Eliminar este perfil y su progreso de este equipo? Esta acción no se puede deshacer.')){ p.remove(id); location.reload(); } }
    else if (act==='edit'){ _mgrEdit(id); }
  }

  function _mgrEdit(id){
    const p=P(); const meta=p.get(id); if(!meta)return;
    const ov=_overlay('mqc-edit');
    ov.innerHTML=_panel(`<div style="padding:1.3rem 1.4rem">
      <h3 style="margin:0 0 .8rem;color:var(--text-primary,#E8E8FF)">Editar perfil</h3>
      <input id="mqc-ed-alias" value="${esc(meta.alias)}" maxlength="24" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <input id="mqc-ed-group" value="${esc(meta.group||'')}" placeholder="Grupo (opcional)" maxlength="16" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.7rem">${AVATARS.map(a=>`<button data-av="${a}" style="font-size:1.3rem;background:${a===meta.avatar?_accent():'var(--bg-elevated,#1e1e4a)'};border:none;border-radius:8px;padding:.2rem .4rem;cursor:pointer">${a}</button>`).join('')}</div>
      <div style="display:flex;gap:.5rem"><button id="mqc-ed-save" class="btn btn-primary btn-sm" style="flex:1">Guardar</button><button id="mqc-ed-cancel" class="btn btn-ghost btn-sm" style="flex:1">Cancelar</button></div>
    </div>`,420);
    let av=meta.avatar;
    ov.querySelectorAll('[data-av]').forEach(b=>b.addEventListener('click',()=>{av=b.getAttribute('data-av');ov.querySelectorAll('[data-av]').forEach(x=>x.style.background='var(--bg-elevated,#1e1e4a)');b.style.background=_accent();}));
    ov.querySelector('#mqc-ed-cancel').addEventListener('click',()=>{ov.remove();openManager();});
    ov.querySelector('#mqc-ed-save').addEventListener('click',()=>{
      p.rename(id, ov.querySelector('#mqc-ed-alias').value);
      p.setGroup(id, ov.querySelector('#mqc-ed-group').value);
      p.setAvatar(id, av);
      ov.remove(); openManager();
    });
  }

  function _mgrCreateForm(ov){
    const host = ov.querySelector('#mqc-mgr-create');
    host.innerHTML = `<div style="background:var(--bg-deep,#0d0d24);border-radius:var(--radius-md,12px);padding:.9rem;margin:.5rem 0">
      <input id="mqc-cf-alias" placeholder="Alias" maxlength="24" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <input id="mqc-cf-group" placeholder="Grupo (opcional)" maxlength="16" class="qi-overlay-input" style="width:100%;margin:0 0 .5rem">
      <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.6rem">${AVATARS.map((a,i)=>`<button data-av="${a}" style="font-size:1.3rem;background:${i===0?_accent():'var(--bg-elevated,#1e1e4a)'};border:none;border-radius:8px;padding:.2rem .4rem;cursor:pointer">${a}</button>`).join('')}</div>
      <button id="mqc-cf-go" class="btn btn-primary btn-sm" style="width:100%">Crear</button>
      <p id="mqc-cf-err" style="color:var(--red,#FF6B6B);font-size:.8rem;margin:.4rem 0 0"></p></div>`;
    let av=AVATARS[0];
    host.querySelectorAll('[data-av]').forEach(b=>b.addEventListener('click',()=>{av=b.getAttribute('data-av');host.querySelectorAll('[data-av]').forEach(x=>x.style.background='var(--bg-elevated,#1e1e4a)');b.style.background=_accent();}));
    host.querySelector('#mqc-cf-go').addEventListener('click',()=>{
      const r=P().create(host.querySelector('#mqc-cf-alias').value,host.querySelector('#mqc-cf-group').value,av);
      if(!r.ok){host.querySelector('#mqc-cf-err').textContent=r.message||'No se pudo crear.';return;}
      location.reload();
    });
  }

  /* ── PRIVACIDAD Y ALMACENAMIENTO ── */
  function openPrivacy(){
    const ov=_overlay('mqc-privacy');
    ov.innerHTML=_panel(`<div style="padding:1.4rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem">
        <h2 style="margin:0;color:var(--text-primary,#E8E8FF);font-size:1.15rem">🔒 Privacidad y almacenamiento</h2>
        <button id="mqc-pv-close" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:1.4rem;cursor:pointer">×</button>
      </div>
      <div style="font-size:.9rem;color:var(--text-secondary,#9898CC);line-height:1.7">
        <p>✅ Toda tu información permanece <strong>únicamente en este navegador</strong>, en este equipo.</p>
        <p>🚫 MásQueCiencia <strong>no envía datos a Internet</strong>: no hay cuentas, correos ni contraseñas.</p>
        <p>🗄️ <strong>No existe almacenamiento en servidores</strong> ni en la nube.</p>
        <p>💾 Si vas a cambiar de computadora, <strong>exporta tu progreso</strong> (archivo JSON) y luego impórtalo en el otro equipo. Eres responsable de conservar ese archivo.</p>
        <p style="font-size:.82rem;color:var(--text-muted,#8484D6)">En equipos compartidos (laboratorios), cada estudiante puede tener su propio perfil local; el modo invitado no guarda nada.</p>
      </div>
      <button id="mqc-pv-ok" class="btn btn-primary btn-sm" style="width:100%;margin-top:1rem">Entendido</button>
    </div>`,460);
    ov.querySelector('#mqc-pv-close').addEventListener('click',()=>ov.remove());
    ov.querySelector('#mqc-pv-ok').addEventListener('click',()=>ov.remove());
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
  }

  /* ── MI BITÁCORA CIENTÍFICA MQC ── */
  function openBitacora(id){
    const p = P(); if(!p) return;
    id = id || p.activeId();
    if (!id){
      const ov0=_overlay('mqc-bitacora');
      ov0.innerHTML=_panel(`<div style="padding:1.5rem;text-align:center">
        <div style="font-size:2.2rem">📔</div><h2 style="color:var(--text-primary,#E8E8FF)">Mi Bitácora Científica</h2>
        <p style="color:var(--text-secondary,#9898CC);font-size:.9rem">El modo invitado no guarda progreso. Crea o selecciona un perfil para llevar tu bitácora.</p>
        <button id="mqc-bit-gate" class="btn btn-primary btn-sm" style="margin-top:.6rem">Elegir perfil</button></div>`,440);
      ov0.querySelector('#mqc-bit-gate').addEventListener('click',()=>{ ov0.remove(); openGate(); });
      ov0.addEventListener('click',e=>{ if(e.target===ov0) ov0.remove(); });
      return;
    }
    const b = p.buildBitacora(id); if(!b) return;
    const ov = _overlay('mqc-bitacora');
    const acc = _accent();
    const chip = (txt,col)=>`<span style="display:inline-block;background:var(--bg-deep,#0d0d24);border:1px solid var(--border,#1e1e4a);border-radius:999px;padding:.2rem .6rem;font-size:.74rem;margin:.15rem;color:${col||'var(--text-secondary,#9898CC)'}">${esc(txt)}</span>`;
    const fuertes = b.temasDominados.slice(0,8);
    const reforzar = b.temasPendientes.slice(0,8);

    ov.innerHTML = _panel(`
      <div style="padding:0">
        <div style="background:linear-gradient(135deg,${acc}22,transparent);border-radius:var(--radius-lg,16px) var(--radius-lg,16px) 0 0;padding:1.3rem 1.4rem;display:flex;align-items:center;gap:.9rem">
          <span style="font-size:2.6rem">${esc(b.avatar)}</span>
          <div style="flex:1">
            <h2 style="margin:0;color:var(--text-primary,#E8E8FF);font-size:1.25rem">📔 Mi Bitácora Científica</h2>
            <div style="font-size:.85rem;color:var(--text-secondary,#9898CC)">${esc(b.alias)}${b.grupo?' · '+esc(b.grupo):''} · Nivel ${b.nivel} · ${b.xp} XP · ⏱ ${esc(b.tiempoEstudio)}</div>
          </div>
          <button id="mqc-bit-close" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:1.5rem;cursor:pointer;align-self:flex-start">×</button>
        </div>
        <div style="padding:1.2rem 1.4rem">

          <div style="margin-bottom:1.1rem">
            <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-secondary,#9898CC);margin-bottom:.3rem"><span>Mi progreso general</span><strong style="color:${acc}">${b.progresoGeneral}%</strong></div>
            <div class="progress-bar" style="height:12px"><div class="progress-fill progress-fill-cyan" style="width:${b.progresoGeneral}%"></div></div>
            <div style="font-size:.74rem;color:var(--text-muted,#8484D6);margin-top:.3rem">${b.experiencesCompletadas.length} de ${b.totalExperiencesImplementadas} experiencias completadas · última: ${b.ultimaExperience?esc(b.ultimaExperience.nombre):'—'}</div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:.6rem;text-align:center">
            <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.6rem"><div style="font-family:var(--font-display,sans-serif);font-size:1.3rem;font-weight:900;color:var(--gold,#F9FF4D)">${b.xp}</div><div style="font-size:.68rem;color:var(--text-muted,#8484D6)">XP</div></div>
            <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.6rem"><div style="font-family:var(--font-display,sans-serif);font-size:1.3rem;font-weight:900;color:${acc}">${b.nivel}</div><div style="font-size:.68rem;color:var(--text-muted,#8484D6)">Nivel</div></div>
            <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.6rem"><div style="font-family:var(--font-display,sans-serif);font-size:1.3rem;font-weight:900;color:var(--green,#00FF88)">${b.insignias.length}</div><div style="font-size:.68rem;color:var(--text-muted,#8484D6)">Insignias</div></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:1rem;text-align:center">
            <div style="background:var(--bg-deep,#0d0d24);border-radius:var(--radius-md,12px);padding:.5rem"><div style="font-family:var(--font-code,monospace);font-size:1rem;color:var(--text-primary,#E8E8FF)">${b.simuladoresCompletados}</div><div style="font-size:.66rem;color:var(--text-muted,#8484D6)">simuladores</div></div>
            <div style="background:var(--bg-deep,#0d0d24);border-radius:var(--radius-md,12px);padding:.5rem"><div style="font-family:var(--font-code,monospace);font-size:1rem;color:var(--text-primary,#E8E8FF)">${b.juegosCompletados}</div><div style="font-size:.66rem;color:var(--text-muted,#8484D6)">juegos</div></div>
            <div style="background:var(--bg-deep,#0d0d24);border-radius:var(--radius-md,12px);padding:.5rem"><div style="font-family:var(--font-code,monospace);font-size:1rem;color:var(--text-primary,#E8E8FF)">${b.examenes.length}</div><div style="font-size:.66rem;color:var(--text-muted,#8484D6)">exámenes</div></div>
          </div>

          <h3 style="font-size:.9rem;color:var(--text-primary,#E8E8FF);margin:0 0 .4rem">🏆 Mis logros</h3>
          <div style="margin-bottom:.9rem">${b.insignias.length? b.insignias.map(i=>chip('🏅 '+i,'var(--gold,#F9FF4D)')).join('') : '<span style="font-size:.82rem;color:var(--text-muted,#8484D6)">Aún no tienes insignias. ¡Sigue explorando!</span>'}</div>

          <h3 style="font-size:.9rem;color:var(--text-primary,#E8E8FF);margin:0 0 .4rem">✅ Experiencias completadas</h3>
          <div style="margin-bottom:.5rem">${b.experiencesCompletadas.length? b.experiencesCompletadas.map(c=>chip('✓ '+c.nombre,'var(--green,#00FF88)')).join('') : '<span style="font-size:.82rem;color:var(--text-muted,#8484D6)">Todavía ninguna al 100 %. ¡Vas en camino!</span>'}</div>
          ${b.experiencesEnProgreso.length?`<h3 style="font-size:.9rem;color:var(--text-primary,#E8E8FF);margin:.6rem 0 .4rem">⏳ En progreso</h3><div style="margin-bottom:.9rem">${b.experiencesEnProgreso.map(e=>chip(e.nombre+' · '+e.progreso+'%','var(--cyan,#1FDBFF)')).join('')}</div>`:''}

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin:.6rem 0 1rem">
            <div><h3 style="font-size:.9rem;color:var(--text-primary,#E8E8FF);margin:0 0 .4rem">💪 Temas dominados</h3>${fuertes.length? fuertes.map(t=>chip(t.tema,'var(--green,#00FF88)')).join('') : '<span style="font-size:.8rem;color:var(--text-muted,#8484D6)">Aún ninguno.</span>'}</div>
            <div><h3 style="font-size:.9rem;color:var(--text-primary,#E8E8FF);margin:0 0 .4rem">📌 Sugeridos para reforzar</h3>${reforzar.length? reforzar.map(t=>chip(t.tema,'var(--orange,#FF6B00)')).join('') : '<span style="font-size:.8rem;color:var(--text-muted,#8484D6)">¡Todo cubierto!</span>'}</div>
          </div>

          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem">
            <button id="mqc-bit-timeline" class="btn btn-ghost btn-sm" style="flex:1">🕒 Vista cronológica</button>
            <button id="mqc-bit-reflex" class="btn btn-ghost btn-sm" style="flex:1">💭 Mis Reflexiones</button>
            <button id="mqc-bit-profile" class="btn btn-ghost btn-sm" style="flex:1">👤 Perfil</button>
          </div>

          <div style="border-top:1px solid var(--border,#1e1e4a);padding-top:.9rem">
            <div style="display:flex;gap:.6rem;flex-wrap:wrap">
              <button id="mqc-bit-json" class="btn btn-ghost btn-sm" style="flex:1">⬇ Respaldo (JSON)</button>
              <button id="mqc-bit-pdf" class="btn btn-primary btn-sm" style="flex:1">📄 Bitácora Científica (PDF)</button>
              <button id="mqc-bit-import" class="btn btn-ghost btn-sm" style="flex:1">⬆ Importar</button>
            </div>
            <input type="file" id="mqc-bit-file" accept="application/json,.json" style="display:none">
            <p style="text-align:center;margin:.7rem 0 0;font-size:.72rem;color:var(--text-muted,#8484D6)">El respaldo restaura tu perfil. El PDF es tu recuerdo del recorrido. Todo vive solo en este equipo.</p>
          </div>
        </div>
      </div>`);

    ov.querySelector('#mqc-bit-close').addEventListener('click',()=>ov.remove());
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
    ov.querySelector('#mqc-bit-json').addEventListener('click',()=>{ const r=p.exportProfile(id); if(r.ok)_download(r.filename,r.json); });
    ov.querySelector('#mqc-bit-pdf').addEventListener('click',()=>exportPDF(id));
    ov.querySelector('#mqc-bit-timeline').addEventListener('click',()=>openTimeline(id));
    ov.querySelector('#mqc-bit-reflex').addEventListener('click',()=>openReflexiones(id));
    ov.querySelector('#mqc-bit-profile').addEventListener('click',()=>openStudentProfile(id));
    const file = ov.querySelector('#mqc-bit-file');
    ov.querySelector('#mqc-bit-import').addEventListener('click',()=>file.click());
    file.addEventListener('change',e=>_handleImportFile(e, ()=>location.reload()));
  }

  /* ── Vista cronológica ── */
  function openTimeline(id){
    const p=P(); const b=p.buildBitacora(id); if(!b)return;
    const ov=_overlay('mqc-timeline');
    const items = b.cronologia.length ? b.cronologia.map(c=>`
      <div style="display:flex;gap:.7rem;padding:.5rem 0;border-bottom:1px solid var(--border,#1e1e4a)">
        <div style="width:8px;height:8px;border-radius:50%;background:var(--cyan,#1FDBFF);margin-top:.35rem;flex-shrink:0"></div>
        <div style="flex:1"><div style="font-size:.85rem;color:var(--text-primary,#E8E8FF)">${esc(c.texto)} ${c.amount?`<span style="color:var(--gold,#F9FF4D);font-size:.76rem">+${c.amount} XP</span>`:''}</div>
        <div style="font-size:.72rem;color:var(--text-muted,#8484D6)">${c.fecha?fecha(c.fecha):''}</div></div>
      </div>`).join('') : '<p style="color:var(--text-muted,#8484D6);text-align:center;font-size:.86rem">Aún no hay actividad registrada. ¡Empieza a explorar!</p>';
    ov.innerHTML=_panel(`<div style="padding:1.3rem 1.4rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem"><h2 style="margin:0;color:var(--text-primary,#E8E8FF);font-size:1.15rem">🕒 Vista cronológica</h2><button id="mqc-tl-close" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:1.4rem;cursor:pointer">×</button></div>
      <p style="font-size:.8rem;color:var(--text-muted,#8484D6);margin:0 0 .8rem">Tu historia de aprendizaje, del evento más reciente al más antiguo.</p>
      <div style="max-height:60vh;overflow-y:auto">${items}</div></div>`,480);
    ov.querySelector('#mqc-tl-close').addEventListener('click',()=>ov.remove());
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
  }

  /* ── Mis Reflexiones (voluntarias) ── */
  function openReflexiones(id){
    const p=P(); const b=p.buildBitacora(id); if(!b)return;
    const ov=_overlay('mqc-reflex');
    const cat = b.porExperiencia.filter(e=>e.started);
    const refMap = p.getReflections(id);
    const preg = p.REFLECTION_QUESTIONS;
    const mentorLine = (typeof Mentor!=='undefined') ? 'Tu Mentor MQC te acompaña: reflexionar te ayuda a aprender mejor.' : '';
    const rows = cat.length ? cat.map(e=>`
      <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.8rem;margin-bottom:.6rem">
        <div style="font-weight:700;font-size:.88rem;color:var(--text-primary,#E8E8FF);margin-bottom:.2rem">${esc(e.icon||'')} ${esc(e.experiencia)}</div>
        <div style="font-size:.76rem;color:var(--text-muted,#8484D6);margin-bottom:.4rem">${esc(preg[_num(e.id)%preg.length]||preg[0])}</div>
        <textarea data-ref="${e.id}" rows="2" placeholder="Escribe tu reflexión (opcional)…" style="width:100%;background:var(--bg-deep,#0d0d24);border:1px solid var(--border,#1e1e4a);border-radius:8px;color:var(--text-primary,#E8E8FF);padding:.5rem;font-family:inherit;font-size:.84rem;resize:vertical">${esc(refMap[e.id]||'')}</textarea>
      </div>`).join('') : '<p style="color:var(--text-muted,#8484D6);text-align:center;font-size:.86rem">Empieza una experiencia para poder reflexionar sobre ella.</p>';
    ov.innerHTML=_panel(`<div style="padding:1.3rem 1.4rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem"><h2 style="margin:0;color:var(--text-primary,#E8E8FF);font-size:1.15rem">💭 Mis Reflexiones</h2><button id="mqc-rf-close" style="background:none;border:none;color:var(--text-muted,#8484D6);font-size:1.4rem;cursor:pointer">×</button></div>
      <p style="font-size:.8rem;color:var(--text-secondary,#9898CC);margin:0 0 .9rem">Responder es voluntario y no afecta tu progreso. ${mentorLine}</p>
      <div style="max-height:55vh;overflow-y:auto">${rows}</div>
      <button id="mqc-rf-save" class="btn btn-primary btn-sm" style="width:100%;margin-top:.6rem">Guardar reflexiones</button>
    </div>`,520);
    ov.querySelector('#mqc-rf-close').addEventListener('click',()=>ov.remove());
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
    ov.querySelector('#mqc-rf-save').addEventListener('click',()=>{
      ov.querySelectorAll('[data-ref]').forEach(t=>p.saveReflection(id, t.getAttribute('data-ref'), t.value));
      const btn=ov.querySelector('#mqc-rf-save'); btn.textContent='✓ Guardado'; setTimeout(()=>ov.remove(),700);
    });
  }

  /* ── Perfil del estudiante ── */
  function openStudentProfile(id){
    const p=P(); const b=p.buildBitacora(id); if(!b)return;
    const ov=_overlay('mqc-profile');
    ov.innerHTML=_panel(`<div style="padding:0">
      <div style="background:linear-gradient(135deg,${_accent()}22,transparent);padding:1.5rem;text-align:center;border-radius:var(--radius-lg,16px) var(--radius-lg,16px) 0 0">
        <div style="font-size:3.2rem">${esc(b.avatar)}</div>
        <h2 style="margin:.3rem 0 0;color:var(--text-primary,#E8E8FF)">${esc(b.alias)}</h2>
        <div style="font-size:.85rem;color:var(--text-secondary,#9898CC)">${b.grupo?esc(b.grupo)+' · ':''}Nivel ${b.nivel} · Científico/a MQC</div>
      </div>
      <div style="padding:1.2rem 1.4rem">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;font-size:.84rem">
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">XP acumulado</div><div style="color:var(--gold,#F9FF4D);font-weight:700">${b.xp}</div></div>
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">Tiempo de estudio</div><div style="color:var(--text-primary,#E8E8FF);font-weight:700">${esc(b.tiempoEstudio)}</div></div>
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">Miembro desde</div><div style="color:var(--text-primary,#E8E8FF)">${fecha(b.perfilCreado)}</div></div>
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">Último acceso</div><div style="color:var(--text-primary,#E8E8FF)">${fecha(b.ultimaActividad)}</div></div>
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">Insignias</div><div style="color:var(--green,#00FF88);font-weight:700">${b.insignias.length}</div></div>
          <div style="background:var(--bg-elevated,#1e1e4a);border-radius:var(--radius-md,12px);padding:.7rem"><div style="color:var(--text-muted,#8484D6);font-size:.72rem">Experiencias completadas</div><div style="color:var(--text-primary,#E8E8FF);font-weight:700">${b.experiencesCompletadas.length}/${b.totalExperiencesImplementadas}</div></div>
        </div>
        <button id="mqc-pf-close" class="btn btn-primary btn-sm" style="width:100%;margin-top:1rem">Cerrar</button>
      </div></div>`,460);
    ov.querySelector('#mqc-pf-close').addEventListener('click',()=>ov.remove());
    ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
  }

  /* ── Exportación PDF (imprimible, 100% offline) ── */
  function exportPDF(id){
    const p=P(); const b=p.buildBitacora(id); if(!b)return;
    const acc='#1FDBFF', gold='#F9FF4D', ink='#0d0d24'; /* EOP-030.5: actualizado de la identidad v1.0 (#1FDBFF/#F9FF4D/#0d0d24) a la v2.0 vigente */
    const frase='Cuando comenzaste este viaje buscabas respuestas. Hoy sabes formular mejores preguntas.';
    const tl = b.cronologia.slice(0,10).map(c=>`<li><b>${c.fecha?fecha(c.fecha):''}</b> — ${esc(c.texto)}${c.amount?` (+${c.amount} XP)`:''}</li>`).join('');
    const refl = b.reflexiones.map(r=>`<div class="refl"><div class="q">${esc(r.unidad)}</div><div class="a">"${esc(r.texto)}"</div></div>`).join('');
    const comp = b.experiencesCompletadas.map(e=>`<span class="pill">✓ ${esc(e.nombre)}</span>`).join('') || '<span class="muted">Aún en camino</span>';
    const badges = b.insignias.map(i=>`<span class="pill gold">🏅 ${esc(i)}</span>`).join('') || '<span class="muted">Pronto llegarán</span>';
    const doc = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Bitácora Científica — ${esc(b.alias)}</title>
    <style>
      @page{ size:A4; margin:0; }
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'Nunito','Segoe UI',system-ui,sans-serif;color:${ink};background:#fff}
      .page{width:210mm;min-height:297mm;padding:0;page-break-after:always;position:relative}
      .cover{background:linear-gradient(160deg,#0d0d24,#111130);color:#E8E8FF;height:297mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2cm}
      .cover .logo{font-size:64px}
      .cover h1{font-size:34px;margin:.3cm 0;letter-spacing:.02em}
      .cover .sub{color:${acc};font-size:16px;letter-spacing:.25em;text-transform:uppercase}
      .cover .who{margin-top:1.4cm;font-size:20px}
      .cover .avatar{font-size:52px;margin-bottom:.2cm}
      .cover .meta{color:#9898CC;font-size:13px;margin-top:.3cm}
      .cover .foot{position:absolute;bottom:1.4cm;color:#8484D6;font-size:11px}
      .body{padding:1.6cm}
      h2{font-size:18px;color:#111130;border-bottom:2px solid ${acc};padding-bottom:.15cm;margin:0 0 .35cm}
      .section{margin-bottom:.7cm}
      .stats{display:flex;gap:.4cm;margin-bottom:.6cm}
      .stat{flex:1;background:#F1F7F7;border-radius:10px;padding:.35cm;text-align:center}
      .stat b{display:block;font-size:22px;color:#111130}
      .stat span{font-size:11px;color:#5F7A80}
      .pill{display:inline-block;background:#1a1a42;color:#0E6E6A;border-radius:999px;padding:2px 10px;font-size:12px;margin:2px}
      .pill.gold{background:#FFF3D6;color:#8a5a00}
      .muted{color:#9898CC;font-size:12px}
      ul{margin:.1cm 0 0 .5cm;font-size:12.5px;line-height:1.6;color:#2b3b40}
      .refl{background:#F7FbFb;border-left:3px solid ${acc};border-radius:0 8px 8px 0;padding:.3cm .4cm;margin-bottom:.25cm}
      .refl .q{font-size:12px;color:#0E6E6A;font-weight:700}
      .refl .a{font-size:12.5px;color:#333;font-style:italic}
      .frase{margin-top:1cm;padding:.6cm;background:linear-gradient(135deg,#1a1a42,#fff);border-radius:12px;text-align:center;font-size:15px;color:#111130;font-style:italic}
      .lema{margin-top:.5cm;text-align:center;color:#5F7A80;font-size:12px}
      @media print{ .noprint{display:none} }
    </style></head><body>
      <div class="page cover">
        <div class="logo">🧪</div>
        <div class="sub">MásQueCiencia</div>
        <h1>Mi Bitácora Científica</h1>
        <div class="who"><div class="avatar">${esc(b.avatar)}</div><strong>${esc(b.alias)}</strong></div>
        <div class="meta">${b.grupo?esc(b.grupo)+' · ':''}Nivel ${b.nivel} · ${b.xp} XP · ⏱ ${esc(b.tiempoEstudio)}</div>
        <div class="foot">Generado el ${fecha(b.exportedAt)} · MQC v${esc(b.mqcVersion)}</div>
      </div>
      <div class="page"><div class="body">
        <div class="section"><h2>Mi recorrido</h2>
          <div class="stats">
            <div class="stat"><b>${b.progresoGeneral}%</b><span>progreso</span></div>
            <div class="stat"><b>${b.xp}</b><span>XP</span></div>
            <div class="stat"><b>${b.nivel}</b><span>nivel</span></div>
            <div class="stat"><b>${b.insignias.length}</b><span>insignias</span></div>
          </div>
          <div class="stats">
            <div class="stat"><b>${b.simuladoresCompletados}</b><span>simuladores</span></div>
            <div class="stat"><b>${b.juegosCompletados}</b><span>juegos</span></div>
            <div class="stat"><b>${b.examenes.length}</b><span>exámenes</span></div>
            <div class="stat"><b>${b.experiencesCompletadas.length}</b><span>experiencias</span></div>
          </div>
        </div>
        <div class="section"><h2>Experiencias completadas</h2>${comp}</div>
        <div class="section"><h2>Logros e insignias</h2>${badges}</div>
        <div class="section"><h2>Línea de tiempo</h2><ul>${tl||'<li class="muted">Sin actividad aún.</li>'}</ul></div>
        ${refl?`<div class="section"><h2>Mis reflexiones</h2>${refl}</div>`:''}
        <div class="frase">"${frase}"</div>
        <div class="lema">Aprende ciencia. Piensa ciencia. Valora la ciencia.</div>
      </div></div>
      <script>window.onload=function(){setTimeout(function(){window.print();},300);}<\/script>
    </body></html>`;
    const w = window.open('', '_blank');
    if (!w){ alert('Permite las ventanas emergentes para generar el PDF, o usa el respaldo JSON.'); return; }
    w.document.open(); w.document.write(doc); w.document.close();
  }

  return { openGate, mountChip, openManager, openBitacora, openPrivacy, openTimeline, openReflexiones, openStudentProfile, exportPDF };
})();
