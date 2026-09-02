/* ================================================================
   MÁSQUECIENCIA / Química Interactiva 10° — Lic. Bryan Chavarría C.
   js/shared/profiles.js  |  Perfiles Locales MQC v1.0  (EOP-008)
   ================================================================
   Sistema oficial de gestión de usuarios de MásQueCiencia v1.0.
   SIN cuentas, SIN login, SIN servidores: todo vive en este navegador.
   - Hasta 10 perfiles locales por equipo/navegador.
   - Modo invitado (no persiste).
   - Exportar/importar progreso en JSON (con validación).
   - Administración local completa.
   Se integra con Storage v1.0 vía un "resolver de clave": cada perfil
   guarda su progreso bajo su propia clave; el modo invitado usa memoria.
   Depende solo de Storage (capa núcleo). const desnudo + typeof.
================================================================ */
window.MQCProfiles = (function () {
  'use strict';

  const REG_KEY     = 'mqc_profiles_v1';          /* registro de perfiles */
  const DATA_PREFIX = 'mqc_profile_';             /* datos por perfil: mqc_profile_<id> */
  const LEGACY_KEY  = 'quimica10_data';           /* datos previos a EOP-008 */
  const MAX_PROFILES = 10;
  const MQC_VERSION  = (typeof Storage !== 'undefined' && Storage.SCHEMA_VERSION) ? Storage.SCHEMA_VERSION : '1.0';
  const EXPORT_KIND  = 'MasQueCiencia/PerfilLocal';

  let _reg = null;    /* { version, activeId, guest, order:[ids], profiles:{ id:meta } } */

  /* ── utilidades de bajo nivel (localStorage seguro) ── */
  function _lsGet(k){ try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch(e){ return null; } }
  function _lsSet(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ return false; } }
  function _lsDel(k){ try { localStorage.removeItem(k); } catch(e){} }
  function _uid(){ return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

  /* Multigrado (Fase 1): identificador visible, permanente e inmutable
     por perfil — MQC-XXXXXX. Distinto de _uid() (la clave interna de
     almacenamiento, que nunca se muestra al estudiante); este sí
     aparece en informes/respaldos. Se genera una sola vez, en
     create()/resetProgress()/importProfile() (solo si falta). */
  function _genProfileId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return 'MQC-' + s;
  }
  function _today(){ return new Date().toISOString().split('T')[0]; }
  function _dataKey(id){ return DATA_PREFIX + id; }

  function _blankReg(){ return { version: MQC_VERSION, activeId: null, guest: false, order: [], profiles: {} }; }
  function _saveReg(){ _lsSet(REG_KEY, _reg); }

  /* ── resolver de clave para Storage ──
     null → invitado (memoria) · string → perfil activo · undefined → heredado */
  function _storageKey() {
    if (!_reg) return undefined;
    if (_reg.guest) return null;
    if (_reg.activeId) return _dataKey(_reg.activeId);
    return undefined;
  }

  /* ── init: carga el registro, migra datos heredados, instala el resolver ── */
  function init() {
    _reg = _lsGet(REG_KEY) || _blankReg();
    if (!_reg.profiles) _reg = _blankReg();

    /* Migración única: si hay progreso previo (quimica10_data) y aún no hay
       perfiles, se crea un perfil "Estudiante" con ese progreso. No se borra
       la clave heredada (respaldo). */
    if (_reg.order.length === 0) {
      const legacy = _lsGet(LEGACY_KEY);
      if (legacy && legacy.units) {
        const id = _uid();
        const alias = (legacy.user && legacy.user.name && legacy.user.name.trim()) ? legacy.user.name.trim() : 'Estudiante';
        _reg.profiles[id] = _meta(id, alias, '', '🧪');
        _reg.order.push(id);
        _reg.activeId = id;
        _lsSet(_dataKey(id), legacy);
        _saveReg();
      }
    }

    if (typeof Storage !== 'undefined' && Storage.setKeyResolver) {
      Storage.setKeyResolver(_storageKey);
    }
    return _reg;
  }

  function _meta(id, alias, group, avatar, colegio, rol, schoolId, schoolRegion){
    return { id, alias: alias||'Estudiante', group: group||'', avatar: avatar||'🧪',
             colegio: (colegio||'').trim(), rol: rol === 'docente' ? 'docente' : 'estudiante',
             schoolId: schoolId || '', schoolRegion: schoolRegion || '',
             created: Date.now(), lastAccess: Date.now() };
  }

  /* ── consultas ── */
  function ready(){ if(!_reg) init(); return _reg; }
  function count(){ ready(); return _reg.order.length; }
  function canCreate(){ return count() < MAX_PROFILES; }
  function isGuest(){ ready(); return !!_reg.guest; }
  function activeId(){ ready(); return _reg.guest ? null : _reg.activeId; }
  function hasActive(){ ready(); return !!_reg.activeId && !_reg.guest; }

  /* estadísticas rápidas leídas del progreso del perfil */
  function _stats(id){
    const d = _lsGet(_dataKey(id));
    if (!d) return { xp:0, level:1, badges:0, completed:0 };
    let completed = 0;
    if (d.units) for (const k in d.units) if (d.units[k] && d.units[k].completed) completed++;
    return {
      xp: (d.xp && d.xp.total) || 0,
      level: d.level || 1,
      badges: Array.isArray(d.badges) ? d.badges.length : 0,
      completed
    };
  }

  function list(){
    ready();
    return _reg.order.map(id => Object.assign({}, _reg.profiles[id], _stats(id),
      { active: id === _reg.activeId && !_reg.guest }));
  }
  function get(id){ ready(); return _reg.profiles[id] ? Object.assign({}, _reg.profiles[id], _stats(id)) : null; }
  function activeMeta(){ const id = activeId(); return id ? get(id) : null; }

  /* ── administración ── */
  function create(alias, group, avatar, colegio, rol, schoolId, schoolRegion){
    ready();
    if (!canCreate()) return { ok:false, reason:'max', message:`Ya existen ${MAX_PROFILES} perfiles. Elimina uno para crear otro.` };
    const a = (alias||'').trim();
    if (!a) return { ok:false, reason:'alias', message:'El alias no puede estar vacío.' };
    const id = _uid();
    _reg.profiles[id] = _meta(id, a, group, avatar, colegio, rol, schoolId, schoolRegion);
    _reg.order.push(id);
    /* progreso inicial con el alias como nombre (para el saludo del hero) */
    const fresh = (typeof Storage !== 'undefined' && Storage.defaults) ? Storage.defaults() : { units:{} };
    if (fresh.user) { fresh.user.name = a; fresh.user.joined = Date.now(); fresh.user.lastSeen = Date.now(); }
    if (fresh.profileMeta) {
      fresh.profileMeta.profileId = _genProfileId();
      fresh.profileMeta.createdAt = Date.now();
    }
    _lsSet(_dataKey(id), fresh);
    _reg.guest = false; _reg.activeId = id;
    _saveReg();
    return { ok:true, id };
  }

  function select(id){
    ready();
    if (!_reg.profiles[id]) return { ok:false, message:'Perfil no encontrado.' };
    _reg.guest = false; _reg.activeId = id;
    _reg.profiles[id].lastAccess = Date.now();
    if (typeof Storage !== 'undefined' && Storage.clearGuestBuffer) Storage.clearGuestBuffer();
    _saveReg();
    return { ok:true, id };
  }

  function rename(id, alias){
    ready(); const a=(alias||'').trim();
    if (!_reg.profiles[id]) return { ok:false, message:'Perfil no encontrado.' };
    if (!a) return { ok:false, message:'El alias no puede estar vacío.' };
    const d0 = _lsGet(_dataKey(id));
    if (d0 && d0.identityLock && d0.identityLock.locked) {
      return { ok:false, reason:'identity-locked', message:'Identidad académica protegida: este perfil ya contiene resultados evaluativos. El nombre y el grupo no pueden modificarse para preservar la integridad del progreso.' };
    }
    _reg.profiles[id].alias = a; _saveReg();
    const d = _lsGet(_dataKey(id)); if (d && d.user){ d.user.name = a; _lsSet(_dataKey(id), d); }
    return { ok:true };
  }
  function setAvatar(id, avatar){ ready(); if(!_reg.profiles[id]) return {ok:false}; _reg.profiles[id].avatar=avatar||'🧪'; _saveReg(); return {ok:true}; }
  function setGroup(id, group){
    ready(); if(!_reg.profiles[id]) return {ok:false};
    const d0 = _lsGet(_dataKey(id));
    if (d0 && d0.identityLock && d0.identityLock.locked) {
      return { ok:false, reason:'identity-locked', message:'Identidad académica protegida: este perfil ya contiene resultados evaluativos. El nombre y el grupo no pueden modificarse para preservar la integridad del progreso.' };
    }
    _reg.profiles[id].group=(group||'').trim(); _saveReg(); return {ok:true};
  }
  function setColegio(id, colegio){
    ready(); if(!_reg.profiles[id]) return {ok:false};
    _reg.profiles[id].colegio=(colegio||'').trim(); _saveReg(); return {ok:true};
  }
  /* HOTFIX CATÁLOGO DE COLEGIOS: reemplaza el ingreso libre por el
     selector con catálogo oficial (school_id estable). colegio sigue
     siendo el texto visible (para compatibilidad con todo lo que ya
     lee meta.colegio); schoolId/schoolRegion son el identificador
     real, usado por Analytics para agrupar sin fragmentarse por
     diferencias de escritura (ver Parte 2 y 10 del sprint). */
  function setEscuela(id, schoolId, schoolName, schoolRegion){
    ready(); if(!_reg.profiles[id]) return {ok:false};
    _reg.profiles[id].colegio = (schoolName||'').trim();
    _reg.profiles[id].schoolId = schoolId || '';
    _reg.profiles[id].schoolRegion = schoolRegion || '';
    _saveReg(); return {ok:true};
  }
  function setRol(id, rol){
    ready(); if(!_reg.profiles[id]) return {ok:false};
    _reg.profiles[id].rol = rol === 'docente' ? 'docente' : 'estudiante'; _saveReg(); return {ok:true};
  }

  function remove(id){
    ready();
    if (!_reg.profiles[id]) return { ok:false, message:'Perfil no encontrado.' };
    delete _reg.profiles[id];
    _reg.order = _reg.order.filter(x => x !== id);
    _lsDel(_dataKey(id));
    if (_reg.activeId === id) _reg.activeId = _reg.order.length ? _reg.order[0] : null;
    _saveReg();
    return { ok:true, activeId: _reg.activeId };
  }

  function resetProgress(id){
    ready();
    if (!_reg.profiles[id]) return { ok:false, message:'Perfil no encontrado.' };
    const fresh = (typeof Storage !== 'undefined' && Storage.defaults) ? Storage.defaults() : { units:{} };
    if (fresh.user){ fresh.user.name = _reg.profiles[id].alias; fresh.user.joined = Date.now(); fresh.user.lastSeen = Date.now(); }
    if (fresh.profileMeta) {
      fresh.profileMeta.profileId = _genProfileId();
      fresh.profileMeta.createdAt = Date.now();
    }
    _lsSet(_dataKey(id), fresh);
    return { ok:true };
  }

  /* ── modo invitado ── */
  function enterGuest(){
    ready(); _reg.guest = true;
    if (typeof Storage !== 'undefined' && Storage.clearGuestBuffer) Storage.clearGuestBuffer();
    _saveReg();
    return { ok:true };
  }
  function exitGuest(){ ready(); _reg.guest = false; _saveReg(); return { ok:true }; }

  /* ── exportar / importar ── */
  function _exportFilename(alias){
    const safe = (alias||'perfil').replace(/[^a-zA-Z0-9_-]+/g,'_');
    return `Bitacora_MQC_${safe}_${_today()}.json`;
  }
  function exportProfile(id){
    ready();
    const meta = _reg.profiles[id]; if (!meta) return { ok:false, message:'Perfil no encontrado.' };
    const data = _lsGet(_dataKey(id)) || (typeof Storage!=='undefined'&&Storage.defaults?Storage.defaults():{});
    const payload = {
      kind: EXPORT_KIND,
      formato: 'Bitácora MQC',
      mqcVersion: MQC_VERSION,
      exportedAt: new Date().toISOString(),
      alias: meta.alias, group: meta.group, avatar: meta.avatar,
      created: meta.created,
      bitacora: buildBitacora(id),   /* resumen legible del recorrido */
      data: data                     /* progreso completo (para restaurar) */
    };
    return { ok:true, filename:_exportFilename(meta.alias), json: JSON.stringify(payload, null, 2) };
  }

  /* Valida integridad, versión y estructura de un JSON de importación */
  function validateImport(obj){
    if (!obj || typeof obj !== 'object') return { ok:false, message:'El archivo no es un JSON válido.' };
    if (obj.kind !== EXPORT_KIND)        return { ok:false, message:'Este archivo no es un perfil de MásQueCiencia.' };
    if (!obj.mqcVersion)                 return { ok:false, message:'Falta la versión de MQC en el archivo.' };
    const major = String(obj.mqcVersion).split('.')[0];
    if (major !== String(MQC_VERSION).split('.')[0])
      return { ok:false, message:`Versión incompatible (archivo ${obj.mqcVersion}, actual ${MQC_VERSION}).` };
    if (!obj.data || typeof obj.data !== 'object' || !obj.data.units)
      return { ok:false, message:'La estructura del progreso no es correcta.' };
    if (typeof obj.alias !== 'string' || !obj.alias.trim())
      return { ok:false, message:'El perfil no tiene un alias válido.' };
    return { ok:true };
  }

  /* Importa un perfil desde texto JSON. Crea un perfil nuevo (no pisa otros). */
  function importProfile(jsonText){
    ready();
    let obj;
    try { obj = JSON.parse(jsonText); }
    catch(e){ return { ok:false, message:'El archivo está dañado o no es un JSON válido.' }; }
    const v = validateImport(obj);
    if (!v.ok) return v;
    if (!canCreate()) return { ok:false, message:`Ya existen ${MAX_PROFILES} perfiles. Elimina uno antes de importar.` };
    const id = _uid();
    /* merge con defaults para tolerar esquemas parciales */
    let data = obj.data;
    if (typeof Storage !== 'undefined' && Storage.defaults) {
      const base = Storage.defaults();
      data = Object.assign(base, obj.data);
      if (!data.units) data.units = base.units;
    }
    if (data.user) data.user.name = obj.alias.trim();
    if (!data.profileMeta) data.profileMeta = Storage.defaults ? Storage.defaults().profileMeta : {};
    if (!data.profileMeta.profileId) {
      data.profileMeta.profileId = _genProfileId();
      data.profileMeta.createdAt = data.profileMeta.createdAt || obj.created || Date.now();
    }
    data.profileMeta.lastImportAt = Date.now();
    data.profileMeta.importCount = (data.profileMeta.importCount || 0) + 1;
    _reg.profiles[id] = _meta(id, obj.alias.trim(), obj.group||'', obj.avatar||'🧪');
    if (obj.created) _reg.profiles[id].created = obj.created;
    _reg.order.push(id);
    _lsSet(_dataKey(id), data);
    _reg.guest = false; _reg.activeId = id;
    _saveReg();
    return { ok:true, id, message:`Perfil "${obj.alias.trim()}" importado correctamente.` };
  }

  /* ================================================================
     BITÁCORA MQC (EOP-008.1)
     La exportación no es solo un respaldo técnico: es la bitácora del
     estudiante. Se calcula un resumen legible a partir del progreso.
  ================================================================ */
  function _num(id){ const m = String(id).match(/(\d+)$/); return m ? +m[1] : -1; }

  function _computePct(unit, meta){
    if (!unit || !meta) return 0;
    const totalTopics = (meta.topics||[]).length;
    const totalSims   = (meta.simulators||[]).length;
    const totalLevels = (meta.game && meta.game.levels) ? meta.game.levels : 0;
    const pass        = (meta.exam && meta.exam.pass) ? meta.exam.pass : 70;
    const ratio = (d,t)=> t>0 ? Math.min(1,d/t) : 0;
    const rT = ratio((unit.topicsRead||[]).length, totalTopics);
    const rS = ratio((unit.simsDone||[]).length, totalSims);
    const rJ = totalLevels>0 ? ratio((unit.gameLevels||[]).length, totalLevels) : ((unit.gameScore||0)>0?1:0);
    const rE = (unit.examBest||0)>0 ? Math.min(1, unit.examBest/pass) : 0;
    return Math.max(0, Math.min(100, Math.round(25*(rT+rS+rJ+rE))));
  }

  /* Preguntas de reflexión (voluntarias, no afectan el progreso) */
  const REFLECTION_QUESTIONS = [
    '¿Qué fue lo más interesante que aprendiste?',
    '¿Qué concepto comprendiste mejor?',
    '¿Qué tema te gustaría seguir explorando?'
  ];

  /* Etiquetas legibles para el historial cronológico (fuentes de XP) */
  const HIST_LABEL = {
    'topic-read':'Leíste un tema', 'unit-started':'Iniciaste una experiencia',
    'unit-completed':'Completaste una experiencia', 'simulator-done':'Completaste un simulador',
    'simulator-perfect':'Simulador perfecto', 'game-played':'Jugaste', 'game-won':'Superaste un nivel',
    'game-highscore':'Nuevo récord', 'lab-done':'Completaste un laboratorio',
    'exam-done':'Aprobaste un examen', 'general-exam-done':'Examen general',
    'element-explored':'Exploraste un elemento', 'daily-login':'Entraste a MQC',
    'section-visited':'Visitaste una sección'
  };
  function _histText(src){ return HIST_LABEL[src] || 'Actividad'; }
  function _fmtStudy(ms){
    const min = Math.round((ms||0)/60000);
    if (min < 60) return min + ' min';
    const h = Math.floor(min/60), m = min%60;
    return h + ' h' + (m ? ' ' + m + ' min' : '');
  }

  function buildBitacora(id){
    ready();
    const meta = _reg.profiles[id]; if (!meta) return null;
    const d = _lsGet(_dataKey(id)) || (typeof Storage!=='undefined'&&Storage.defaults?Storage.defaults():{units:{}});
    const cat = (typeof UNIDADES_DATA !== 'undefined') ? UNIDADES_DATA : [];
    const porExperiencia = [];
    let sumPct = 0, nImpl = 0, completados = 0, sims = 0, juegos = 0, juegosTot = 0;

    cat.forEach(m => {
      const u = d.units && d.units[m.id]; if (!u) return;
      const implementada = !!(m.experiencia || (m.simulators && m.simulators.some(s=>s.status==='active')));
      const pct = _computePct(u, m);
      const readIdx = (u.topicsRead||[]).map(_num).filter(n=>n>=0);
      const dominados  = (m.topics||[]).filter((_,i)=>readIdx.includes(i));
      const pendientes = (m.topics||[]).filter((_,i)=>!readIdx.includes(i));
      const nLevels = (m.game && m.game.levels) ? m.game.levels : 0;
      const gameDone = nLevels>0 ? ((u.gameLevels||[]).length >= nLevels) : ((u.gameScore||0)>0);
      if (implementada){ nImpl++; sumPct += pct; if (nLevels>0) juegosTot++; if (gameDone) juegos++; }
      sims += (u.simsDone||[]).length;
      if (u.completed) completados++;
      porExperiencia.push({
        id:m.id, name:m.name, icon:m.icon, color:m.color,
        experiencia:(m.experiencia && m.experiencia.nombre) || m.name,
        progreso:pct, started:!!u.started, completed:!!u.completed,
        examBest:u.examBest||0, examAttempts:u.examAttempts||0,
        simsDone:(u.simsDone||[]).length, simsTotal:(m.simulators||[]).length,
        gameDone, dominados, pendientes, topicsTotal:(m.topics||[]).length
      });
    });

    const iniciadas = porExperiencia.filter(e=>e.started).sort((a,b)=>_num(b.id)-_num(a.id));
    const ultima = iniciadas.length ? iniciadas[0] : null;
    const rawHist = ((d.xp && d.xp.history) || []).slice();
    /* Multigrado (Fase 1): clasificar cada entrada por grado sin
       modificar el texto histórico guardado — solo se calcula al
       construir la Bitácora. Los registros que empiezan con 'pne-'
       son del Desafío Final PNE; el resto, al no existir todavía XP
       de Química 11.º, se interpretan como Química 10.º (regla
       explícita para registros sin campo grade). */
    const _gradeOf = (source) => {
      if (source && source.indexOf('pne-') === 0) return 'pne';
      if (source && source.indexOf('g11-') === 0) return 11;
      return 10;
    };
    const cronologia = rawHist.slice(-30).reverse().map(h=>({
      fecha: h.ts || null, amount: h.amount || 0, source: h.source || '', texto: _histText(h.source),
      grade: _gradeOf(h.source)
    }));
    const reflex = d.reflexiones || {};
    const reflexiones = Object.keys(reflex).map(uid=>{
      const m = cat.find(x=>x.id===uid);
      return { id:uid, unidad: m ? ((m.experiencia&&m.experiencia.nombre)||m.name) : uid, texto: reflex[uid] };
    });

    return {
      alias: meta.alias, grupo: meta.group, avatar: meta.avatar,
      perfilCreado: meta.created,
      ultimaActividad: (d.user && d.user.lastSeen) || meta.lastAccess,
      tiempoEstudioMs: (d.study && d.study.totalMs) || 0,
      tiempoEstudio: _fmtStudy((d.study && d.study.totalMs) || 0),
      mqcVersion: MQC_VERSION,
      xp: (d.xp && d.xp.total) || 0,
      nivel: d.level || 1,
      insignias: Array.isArray(d.badges) ? d.badges.slice() : [],
      progresoGeneral: nImpl ? Math.round(sumPct / nImpl) : 0,
      experiencesCompletadas: porExperiencia.filter(e=>e.completed).map(e=>({id:e.id, nombre:e.experiencia})),
      experiencesEnProgreso: porExperiencia.filter(e=>e.started && !e.completed).map(e=>({id:e.id, nombre:e.experiencia, progreso:e.progreso})),
      totalExperiencesImplementadas: nImpl,
      simuladoresCompletados: sims,
      juegosCompletados: juegos, juegosTotal: juegosTot,
      porExperiencia,
      examenes: porExperiencia.filter(e=>e.examAttempts>0 || e.examBest>0).map(e=>({id:e.id, nombre:e.experiencia, intentos:e.examAttempts, mejor:e.examBest})),
      temasDominados: porExperiencia.reduce((a,e)=>a.concat(e.dominados.map(t=>({unidad:e.name, tema:t}))),[]),
      temasPendientes: porExperiencia.reduce((a,e)=>a.concat(e.pendientes.map(t=>({unidad:e.name, tema:t}))),[]),
      ultimaExperience: ultima ? {id:ultima.id, nombre:ultima.experiencia} : null,
      cronologia,
      reflexiones,
      historial: cronologia.slice(0,12),
      exportedAt: new Date().toISOString()
    };
  }

  /* ── Reflexiones (voluntarias) ── */
  function getReflections(id){ const d=_lsGet(_dataKey(id)); return (d && d.reflexiones) || {}; }
  function saveReflection(id, unitId, texto){
    const key=_dataKey(id);
    const d=_lsGet(key) || (typeof Storage!=='undefined'&&Storage.defaults?Storage.defaults():{});
    d.reflexiones = d.reflexiones || {};
    if (texto && texto.trim()) d.reflexiones[unitId] = texto.trim();
    else delete d.reflexiones[unitId];
    _lsSet(key, d);
    return { ok:true };
  }

  /* ── Tiempo aproximado de estudio ── */
  let _studyTimer = null;
  function addStudyTime(ms){
    if (!hasActive()) return;
    const key=_dataKey(_reg.activeId);
    const d=_lsGet(key) || (typeof Storage!=='undefined'&&Storage.defaults?Storage.defaults():{});
    d.study = d.study || { totalMs:0 };
    d.study.totalMs = (d.study.totalMs||0) + ms;
    _lsSet(key, d);
  }
  function startStudyTracking(){
    if (_studyTimer || typeof setInterval==='undefined' || !hasActive()) return;
    _studyTimer = setInterval(()=>{ try { if (hasActive()) addStudyTime(60000); } catch(e){} }, 60000);
  }
  function stopStudyTracking(){ if(_studyTimer){ clearInterval(_studyTimer); _studyTimer=null; } }

  return {
    MAX_PROFILES, MQC_VERSION,
    init, ready, count, canCreate, isGuest, activeId, hasActive,
    list, get, activeMeta,
    create, select, rename, setAvatar, setGroup, setColegio, setEscuela, setRol, remove, resetProgress,
    enterGuest, exitGuest,
    exportProfile, validateImport, importProfile, buildBitacora,
    getReflections, saveReflection, REFLECTION_QUESTIONS,
    startStudyTracking, stopStudyTracking, addStudyTime,
    _storageKey   /* expuesto para pruebas */
  };
})();

/* Inicialización temprana: instala el resolver de clave en Storage y ejecuta
   la migración del progreso heredado ANTES de que app.js lea los datos.
   Si no hay perfil activo, Storage usa la clave heredada (sin regresión). */
try { if (typeof MQCProfiles !== 'undefined') MQCProfiles.init(); } catch (e) {}
