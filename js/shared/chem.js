/* ================================================================
   MÁSQUECIENCIA — Lic. Bryan Chavarría C.
   js/shared/chem.js  |  MQCChem — Lógica química reutilizable
   ================================================================
   Sistema compartido ADITIVO (Design System v1.0 / Arquitectura v1.0).
   Centraliza la lógica química que hasta ahora vivía dentro de las
   unidades (valencia, cargas iónicas, predicción de enlace) y añade
   la construcción y el nombrado de fórmulas (regla del cruce).
   Reutilizable por Nomenclatura (U5), Estequiometría (U6), Redox (U9)
   y futuras experiencias. Depende solo de ELEMENTOS (capa de datos).
   const desnudo + typeof, file:// puro, sin dependencias de otros
   sistemas compartidos.
================================================================ */
window.MQCChem = (function () {
  'use strict';

  const MAIN = [1, 2, 13, 14, 15, 16, 17, 18];

  function els()      { return (typeof ELEMENTOS !== 'undefined') ? ELEMENTOS : []; }
  function elBySym(s) { return els().find(e => e.symbol === s) || null; }
  function elByZ(z)   { if (typeof getElementByZ !== 'undefined') return getElementByZ(z); return els().find(e => e.z === z) || null; }

  const TYPE_CAT = {
    'nonmetal':'No metal','noble-gas':'No metal','halogen':'No metal',
    'alkali-metal':'Metal','alkaline-earth':'Metal','transition-metal':'Metal',
    'post-transition':'Metal','lanthanide':'Metal','actinide':'Metal',
    'metalloid':'Metaloide','unknown':'Metal'
  };
  function categoryOf(e) { return e ? (TYPE_CAT[e.type] || 'Metal') : null; }

  /* electrones de valencia (representativos). He = 2. */
  function valence(e) {
    if (!e) return null;
    if (e.z === 2) return 2;
    const g = e.group; if (g == null) return null;
    if (g <= 2) return g; if (g >= 13) return g - 10; return null;
  }
  function octetTarget(e) { return (e && e.period === 1) ? 2 : 8; }

  /* carga iónica monoatómica probable de un representativo:
     metal pierde v (+v) · no metal gana 8-v (-(8-v)) · noble 0 · grupo 14 → 0/comparte */
  function ionChargeOf(e) {
    const v = valence(e); if (v == null) return null;
    if (e.type === 'noble-gas') return 0;
    if (v <= 3) return v;
    if (v >= 5) return -(8 - v);
    return 0;
  }

  function predictBond(a, b) {
    const ca = categoryOf(a), cb = categoryOf(b);
    if (ca === 'Metal' && cb === 'Metal') return 'Metálico';
    if ((ca === 'Metal') !== (cb === 'Metal')) return 'Iónico';
    return 'Covalente';
  }
  function polarity(a, b) {
    if (!a || !b || a.en == null || b.en == null) return '';
    return Math.abs(a.en - b.en) >= 0.5 ? 'polar' : 'no polar';
  }

  /* ── Iones comunes (curados) con su nombre para nomenclatura ── */
  const CATIONS = [
    { sym:'H',  charge:1, name:'hidrógeno' }, { sym:'Li', charge:1, name:'litio' },
    { sym:'Na', charge:1, name:'sodio' },     { sym:'K',  charge:1, name:'potasio' },
    { sym:'Ag', charge:1, name:'plata' },
    { sym:'Mg', charge:2, name:'magnesio' },  { sym:'Ca', charge:2, name:'calcio' },
    { sym:'Ba', charge:2, name:'bario' },     { sym:'Zn', charge:2, name:'cinc' },
    { sym:'Cu', charge:1, name:'cobre(I)' },  { sym:'Cu', charge:2, name:'cobre(II)' },
    { sym:'Fe', charge:2, name:'hierro(II)' },{ sym:'Fe', charge:3, name:'hierro(III)' },
    { sym:'Al', charge:3, name:'aluminio' }
  ];
  const ANIONS = [
    { sym:'F',  charge:-1, name:'fluoruro' }, { sym:'Cl', charge:-1, name:'cloruro' },
    { sym:'Br', charge:-1, name:'bromuro' },  { sym:'I',  charge:-1, name:'yoduro' },
    { sym:'O',  charge:-2, name:'óxido' },    { sym:'S',  charge:-2, name:'sulfuro' },
    { sym:'N',  charge:-3, name:'nitruro' },
    { formula:'OH',  charge:-1, name:'hidróxido', poly:true },
    { formula:'NO3', charge:-1, name:'nitrato',   poly:true },
    { formula:'CO3', charge:-2, name:'carbonato', poly:true },
    { formula:'SO4', charge:-2, name:'sulfato',   poly:true }
  ];

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function _sub(sym, n, poly) {
    if (n <= 1) return sym;
    return poly ? `(${sym})<sub>${n}</sub>` : `${sym}<sub>${n}</sub>`;
  }
  /* también en texto plano (para exámenes/preguntas sin HTML) */
  function _subText(sym, n, poly) {
    if (n <= 1) return sym;
    return poly ? `(${sym})${n}` : `${sym}${n}`;
  }

  /* Regla del cruce: catión {sym,charge} + anión {sym|formula,charge(-)} → fórmula y proporción */
  function crossFormula(cat, an) {
    const cC = Math.abs(cat.charge), cA = Math.abs(an.charge);
    const g = gcd(cC, cA);
    const nCat = cA / g, nAn = cC / g;
    const symCat = cat.sym, symAn = an.formula || an.sym;
    const html = _sub(symCat, nCat, false) + _sub(symAn, nAn, !!an.poly);
    const text = _subText(symCat, nCat, false) + _subText(symAn, nAn, !!an.poly);
    return { formula: html, formulaText: text, nCat, nAn };
  }

  /* Nombre en español: anión + " de " + catión → "cloruro de sodio" */
  function nameIonic(cat, an) { return `${an.name} de ${cat.name}`; }

  /* Ion monoatómico a partir de un elemento (para "Camino del Ion") */
  function ionFromElement(e) {
    const q = ionChargeOf(e); if (q == null) return null;
    const kind = q > 0 ? 'catión' : q < 0 ? 'anión' : 'ninguno';
    let name;
    if (q > 0) name = 'ion ' + (e.name ? e.name.toLowerCase() : e.symbol);
    else if (q < 0) {
      const raiz = { O:'óxido', S:'sulfuro', N:'nitruro', F:'fluoruro', Cl:'cloruro', Br:'bromuro', I:'yoduro', H:'hidruro' };
      name = raiz[e.symbol] || (e.symbol + 'uro');
    } else name = e.name;
    const chargeStr = q === 0 ? '0' : (q > 0 ? '+' + (q === 1 ? '' : q) : '−' + (Math.abs(q) === 1 ? '' : Math.abs(q)));
    return { charge: q, kind, name, chargeStr };
  }

  /* ================================================================
     ESTEQUIOMETRÍA (ampliación aditiva — MQC Experience 06)
     Mol, masa molar, conversiones y ecuaciones. Depende de ELEMENTOS.
     No altera nada de lo anterior: solo añade funciones y datos.
  ================================================================ */
  const AVOGADRO = 6.022e23;

  /* Parsea una fórmula (texto plano, subíndices <sub>, unicode o dígitos,
     con paréntesis) → mapa { símbolo: cantidad } */
  function parseFormula(str) {
    let s = String(str)
      .replace(/<sub>(\d+)<\/sub>/g, '$1')
      .replace(/[₀-₉]/g, d => '₀₁₂₃₄₅₆₇₈₉'.indexOf(d));
    const stack = [{}];
    const add = (m, sym, n) => { m[sym] = (m[sym] || 0) + n; };
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (ch === '(' || ch === '[') { stack.push({}); i++; }
      else if (ch === ')' || ch === ']') {
        i++; let num = '';
        while (i < s.length && /\d/.test(s[i])) num += s[i++];
        const mult = num ? +num : 1;
        const top = stack.pop(), below = stack[stack.length - 1];
        for (const k in top) add(below, k, top[k] * mult);
      } else if (/[A-Z]/.test(ch)) {
        let sym = ch; i++;
        while (i < s.length && /[a-z]/.test(s[i])) sym += s[i++];
        let num = '';
        while (i < s.length && /\d/.test(s[i])) num += s[i++];
        add(stack[stack.length - 1], sym, num ? +num : 1);
      } else i++;
    }
    return stack[0];
  }

  /* Masa molar (g/mol) de una fórmula (texto) o de un mapa de cantidades */
  function molarMass(input) {
    const counts = (typeof input === 'string') ? parseFormula(input) : input;
    let m = 0;
    for (const sym in counts) {
      const e = elBySym(sym);
      if (!e || e.mass == null) return null;
      m += e.mass * counts[sym];
    }
    return Math.round(m * 1000) / 1000;
  }

  /* Desglose de la masa molar por elemento (para mostrar el cálculo) */
  function molarMassBreakdown(formula) {
    const counts = parseFormula(formula);
    const parts = [];
    for (const sym in counts) {
      const e = elBySym(sym);
      if (!e || e.mass == null) return null;
      parts.push({ sym, count: counts[sym], mass: e.mass, subtotal: Math.round(e.mass * counts[sym] * 1000) / 1000 });
    }
    return { parts, total: molarMass(counts) };
  }

  /* Conversiones fundamentales */
  function massFromMoles(mol, mm) { return Math.round(mol * mm * 1000) / 1000; }
  function molesFromMass(g, mm) { return Math.round((g / mm) * 1000) / 1000; }
  function particlesFromMoles(mol) { return mol * AVOGADRO; }
  function molesFromParticles(p) { return p / AVOGADRO; }

  /* Compuestos comunes (curados) para ejercicios de masa molar */
  const COMPOUNDS = [
    { f:'H2O',      name:'agua' },
    { f:'CO2',      name:'dióxido de carbono' },
    { f:'NaCl',     name:'cloruro de sodio' },
    { f:'CaCO3',    name:'carbonato de calcio' },
    { f:'NaOH',     name:'hidróxido de sodio' },
    { f:'O2',       name:'oxígeno' },
    { f:'N2',       name:'nitrógeno' },
    { f:'CH4',      name:'metano' },
    { f:'NH3',      name:'amoníaco' },
    { f:'C6H12O6',  name:'glucosa' },
    { f:'CaO',      name:'óxido de calcio' },
    { f:'MgO',      name:'óxido de magnesio' }
  ];

  /* Ecuaciones para balanceo (primeros r términos = reactivos) */
  const EQUATIONS = [
    { name:'Formación de agua',        terms:['H2','O2','H2O'],        r:2, coeffs:[2,1,2] },
    { name:'Síntesis de amoníaco',     terms:['N2','H2','NH3'],        r:2, coeffs:[1,3,2] },
    { name:'Combustión del carbono',   terms:['C','O2','CO2'],         r:2, coeffs:[1,1,1] },
    { name:'Combustión del metano',    terms:['CH4','O2','CO2','H2O'], r:2, coeffs:[1,2,1,2] },
    { name:'Formación de sal',         terms:['Na','Cl2','NaCl'],      r:2, coeffs:[2,1,2] }
  ];

  /* ================================================================
     DISOLUCIONES (ampliación aditiva — MQC Experience 07)
     Molaridad, concentración porcentual y dilución. Reutiliza molarMass.
  ================================================================ */
  function _round(x) { return Math.round(x * 1000) / 1000; }
  /* Molaridad = moles de soluto / litros de disolución */
  function molarity(mol, liters) { return liters ? _round(mol / liters) : null; }
  /* Moles de soluto a partir de molaridad y volumen (L) */
  function molesFromMolarity(M, liters) { return _round(M * liters); }
  /* Gramos de soluto para preparar V litros de disolución M molar */
  function massForSolution(M, volumeL, mm) { return _round(M * volumeL * mm); }
  /* % masa/masa y % masa/volumen */
  function percentMassMass(gSolute, gSolution) { return gSolution ? _round(gSolute / gSolution * 100) : null; }
  function percentMassVolume(gSolute, mLSolution) { return mLSolution ? _round(gSolute / mLSolution * 100) : null; }
  /* Dilución: C1·V1 = C2·V2 → volumen final V2 */
  function dilutionV2(C1, V1, C2) { return C2 ? _round(C1 * V1 / C2) : null; }
  /* Solutos comunes para ejercicios (reutiliza COMPOUNDS por su fórmula/nombre) */
  const SOLUTES = COMPOUNDS.filter(c => ['NaCl','NaOH','CaCO3','C6H12O6','CaO','MgO'].indexOf(c.f) !== -1);

  /* ================================================================
     ÁCIDOS Y BASES (ampliación aditiva — MQC Experience 08)
     pH, pOH, Kw y clasificación. Reutiliza _round; coherente con la
     familia de disoluciones (ambas parten de una concentración molar).
  ================================================================ */
  const KW = 1e-14; /* producto iónico del agua a 25 °C */
  function pH(concH) { return (concH > 0) ? _round(-Math.log10(concH)) : null; }
  function pOH(concOH) { return (concOH > 0) ? _round(-Math.log10(concOH)) : null; }
  function phFromPoh(poh) { return _round(14 - poh); }
  function pohFromPh(ph) { return _round(14 - ph); }
  function hFromPH(ph) { return Math.pow(10, -ph); }
  function ohFromPOH(poh) { return Math.pow(10, -poh); }
  function classifyPH(ph) {
    if (ph < 3) return 'Ácido fuerte';
    if (ph < 6.5) return 'Ácido débil';
    if (ph <= 7.5) return 'Neutro';
    if (ph <= 11) return 'Básico débil';
    return 'Básico fuerte';
  }
  function esAcido(ph) { return ph < 7; }
  function esBase(ph) { return ph > 7; }
  const INDICADORES = [
    { nombre:'Fenolftaleína', rango:[8.2, 10.0], colorAcido:'incoloro', colorBase:'rosado' },
    { nombre:'Tornasol',      rango:[4.5, 8.3],  colorAcido:'rojo',     colorBase:'azul' },
    { nombre:'Anaranjado de metilo', rango:[3.1, 4.4], colorAcido:'rojo', colorBase:'anaranjado/amarillo' },
    { nombre:'Azul de bromotimol',   rango:[6.0, 7.6], colorAcido:'amarillo', colorBase:'azul' }
  ];

  /* ================================================================
     OXIDACIÓN Y REDUCCIÓN (ampliación aditiva — MQC Experience 09)
     Reutiliza parseFormula, valence e ionChargeOf. No duplica nada.
  ================================================================ */
  /* Reglas fijas de número de oxidación para elementos representativos */
  const NOX_FIJO = {
    F: -1, H: 1, O: -2,
    Li:1, Na:1, K:1, Rb:1, Cs:1,
    Be:2, Mg:2, Ca:2, Sr:2, Ba:2
  };
  /* Asigna el número de oxidación de cada elemento de una fórmula neutra
     (o de un ion, si se pasa 'charge'). Resuelve el único elemento
     "desconocido" restante por balance de carga; si quedan 2+ desconocidos
     sin poder resolver, retorna null en ese símbolo (caso fuera de alcance 10°). */
  function oxidationState(formula, charge) {
    charge = charge || 0;
    const counts = parseFormula(formula);
    const syms = Object.keys(counts);
    const known = {}, unknown = [];
    syms.forEach(s => {
      if (NOX_FIJO[s] != null) known[s] = NOX_FIJO[s];
      else unknown.push(s);
    });
    if (unknown.length === 1) {
      let sum = 0;
      syms.forEach(s => { if (known[s] != null) sum += known[s] * counts[s]; });
      const u = unknown[0];
      known[u] = _round((charge - sum) / counts[u]);
    } else if (unknown.length > 1) {
      unknown.forEach(u => known[u] = null); /* no resoluble con reglas simples */
    }
    return known; /* { símbolo: número de oxidación | null } */
  }

  /* Serie de actividad / potenciales estándar de reducción (curados, 25°C, V) */
  const POTENCIALES = [
    { par:'Li⁺/Li',  sym:'Li', E:-3.04 },
    { par:'Mg²⁺/Mg', sym:'Mg', E:-2.37 },
    { par:'Al³⁺/Al', sym:'Al', E:-1.66 },
    { par:'Zn²⁺/Zn', sym:'Zn', E:-0.76 },
    { par:'Fe²⁺/Fe', sym:'Fe', E:-0.44 },
    { par:'Pb²⁺/Pb', sym:'Pb', E:-0.13 },
    { par:'H⁺/H₂',   sym:'H',  E: 0.00 },
    { par:'Cu²⁺/Cu', sym:'Cu', E: 0.34 },
    { par:'Ag⁺/Ag',  sym:'Ag', E: 0.80 }
  ];
  /* Dado dos símbolos de metal, determina cátodo (mayor E°, se reduce),
     ánodo (menor E°, se oxida) y el voltaje de la celda (E°cátodo − E°ánodo) */
  function galvanicCell(symA, symB) {
    const a = POTENCIALES.find(p => p.sym === symA), b = POTENCIALES.find(p => p.sym === symB);
    if (!a || !b) return null;
    const catodo = a.E >= b.E ? a : b, anodo = a.E >= b.E ? b : a;
    return { catodo, anodo, voltaje: _round(catodo.E - anodo.E) };
  }
  /* Identifica agente oxidante/reductor a partir del cambio de Nox de dos especies */
  function esOxidante(noxAntes, noxDespues) { return noxDespues < noxAntes; } /* se reduce → es el oxidante */
  function esReductor(noxAntes, noxDespues) { return noxDespues > noxAntes; } /* se oxida → es el reductor */

  return {
    MAIN, els, elBySym, elByZ, categoryOf, valence, octetTarget,
    ionChargeOf, predictBond, polarity,
    CATIONS, ANIONS, gcd, crossFormula, nameIonic, ionFromElement,
    /* estequiometría (aditivo) */
    AVOGADRO, parseFormula, molarMass, molarMassBreakdown,
    massFromMoles, molesFromMass, particlesFromMoles, molesFromParticles,
    COMPOUNDS, EQUATIONS,
    /* disoluciones (aditivo — MQC Experience 07) */
    molarity, molesFromMolarity, massForSolution,
    percentMassMass, percentMassVolume, dilutionV2, SOLUTES,
    /* ácidos y bases (aditivo — MQC Experience 08) */
    KW, pH, pOH, phFromPoh, pohFromPh, hFromPH, ohFromPOH,
    classifyPH, esAcido, esBase, INDICADORES,
    /* oxidación-reducción (aditivo — MQC Experience 09) */
    NOX_FIJO, oxidationState, POTENCIALES, galvanicCell, esOxidante, esReductor
  };
})();
