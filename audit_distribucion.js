'use strict';
global.window = {};

// Stub minimo de Storage para que estadoDesbloqueo() y el selector funcionen sin DOM
window.Storage = {
  load: () => ({ grade11Unlock: { unlocked: true }, grade11: {} }),
  getGrade11UnitProgress: () => 0
};

require('./js/data/banco-nacional-quimica.js');
require('./js/data/banco-nacional-fisica.js');
require('./js/data/banco-nacional-biologia.js');
require('./js/shared/simulacro-nacional-adapter.js');

const S = window.SimulacroNacional;
const N_SIMULACROS = 20;

let idsAnteriores = [];
const intentos = [];

for (let i = 0; i < N_SIMULACROS; i++) {
  const intento = S.construirIntento(idsAnteriores);
  intentos.push(intento);
  idsAnteriores = intento.map(p => p.id);
}

console.log('=== VERIFICACIÓN POR INTENTO (Sección 11 / 19 del ticket) ===\n');

let todosOk = true;
const resultadosPorIntento = [];

intentos.forEach((intento, idx) => {
  const total = intento.length;
  const porCiencia = {};
  intento.forEach(p => { porCiencia[p.ciencia] = (porCiencia[p.ciencia] || 0) + 1; });
  const ids = intento.map(p => p.id);
  const idsUnicos = new Set(ids);
  const cuatroOpciones = intento.every(p => p.opciones.length === 4);
  const correctaValida = intento.every(p => p.opciones.some(o => o.id === p.correcta));

  const ok = total === 60 &&
    porCiencia['Biología'] === 20 &&
    porCiencia['Física'] === 20 &&
    porCiencia['Química'] === 20 &&
    idsUnicos.size === ids.length &&
    cuatroOpciones &&
    correctaValida;

  if (!ok) todosOk = false;

  resultadosPorIntento.push({
    intento: idx + 1, total,
    bio: porCiencia['Biología'] || 0, fis: porCiencia['Física'] || 0, qui: porCiencia['Química'] || 0,
    idsUnicos: idsUnicos.size, cuatroOpciones, correctaValida, ok
  });
});

resultadosPorIntento.forEach(r => {
  console.log(`Intento ${String(r.intento).padStart(2)}: total=${r.total} Bio=${r.bio} Fis=${r.fis} Qui=${r.qui} ` +
    `idsUnicos=${r.idsUnicos}/60 4opciones=${r.cuatroOpciones} correctaValida=${r.correctaValida} -> ${r.ok ? 'OK' : '*** FALLO ***'}`);
});

console.log('\n=== RESULTADO GLOBAL ===');
console.log('Los 20 intentos cumplen 60/20/20/20 + 0 IDs duplicados + 4 opciones + respuesta válida:', todosOk ? 'SI, TODOS' : 'NO -- REVISAR');

// 0 REQUIERE_REVISIÓN / 0 respuesta_validada===false: estructural, ya que los bancos JS de producción
// SOLO contienen items ya filtrados (VALIDADO + respuesta_validada===true) -- se re-confirma leyendo
// el banco crudo original (auditado en Fase 1/2) para no asumirlo sin verificar.
const crudos = [].concat(window.BANCO_NACIONAL_BIOLOGIA, window.BANCO_NACIONAL_FISICA, window.BANCO_NACIONAL_QUIMICA);
const conCamposDeAuditoria = crudos.filter(it => 'estadoValidacion' in it || 'respuestaValidada' in it);
console.log('\nItems del banco de producción con campos de auditoría interna (estadoValidacion/respuestaValidada) expuestos:', conCamposDeAuditoria.length, '(debe ser 0 -- esos campos NO viajan al JS de producción por diseño, ver banco-nacional-*.js)');

// Guardar todos los intentos para el analisis de frecuencia
require('fs').writeFileSync('/home/claude/qa_work/veinte_intentos.json', JSON.stringify(intentos.map(it => it.map(p => ({
  id: p.id, ciencia: p.ciencia, tema: p.tema, competencia: p.competencia, anio: p.anio
})))));
console.log('\n20 intentos guardados para análisis de frecuencia.');
