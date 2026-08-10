/* ================================================================
   MÁSQUECIENCIA — js/data/grade11/moleculas-reales.js
   HOTFIX-10 PREMIUM — Banco de moléculas reales
   ================================================================
   9 moléculas reales, usadas ÚNICAMENTE para reconocer estructura
   química — no se estudia farmacología ni dosis, tal como exige el
   ticket. Cada grupo funcional presente fue verificado contra la
   estructura química real conocida de cada sustancia.

   Estructura por SEGMENTOS (reutilizable): cada molécula se
   representa como una secuencia de segmentos, algunos "neutros"
   (parte de la cadena, sin grupo funcional) y otros etiquetados con
   el id de un grupo del Atlas Químico (window.ATLAS_QUIMICO_DATA).
   Este mismo formato lo consume tanto el Escáner Molecular como el
   examen de esta unidad — pensado explícitamente para reutilizarse
   en el futuro Centro Nacional de Preparación PNE (§12 del ticket),
   sin duplicar ningún renderizador.
================================================================ */
window.MOLECULAS_REALES = [
  {
    id: 'aspirina', nombre: 'Aspirina', nombreCompleto: 'Ácido acetilsalicílico',
    segments: [
      { text: 'Anillo aromático', tag: null },
      { text: '–COOH', tag: 'acido-carboxilico' },
      { text: '–O–CO–CH3', tag: 'ester' }
    ],
    grupos: ['acido-carboxilico', 'ester'],
    uso: 'Analgésico y antiinflamatorio de uso común.',
    relacion: 'Un solo grupo éster diferencia la aspirina del ácido salicílico original — un ejemplo directo de cómo un cambio pequeño en la estructura cambia la sustancia por completo.'
  },
  {
    id: 'acetaminofen', nombre: 'Acetaminofén', nombreCompleto: 'Paracetamol',
    segments: [
      { text: 'Anillo aromático', tag: null },
      { text: '–OH', tag: 'alcohol' },
      { text: '–NH–CO–CH3', tag: 'amida' }
    ],
    grupos: ['alcohol', 'amida'],
    uso: 'Analgésico y antifebril de uso común.',
    relacion: 'Combina un grupo alcohol (fenólico) y un grupo amida en la misma molécula — un buen ejemplo de que una sustancia real casi nunca tiene un solo grupo funcional.'
  },
  {
    id: 'ibuprofeno', nombre: 'Ibuprofeno', nombreCompleto: 'Ácido 2-(4-isobutilfenil)propanoico',
    segments: [
      { text: 'Anillo aromático', tag: null },
      { text: 'Cadena ramificada (alcano)', tag: 'alcano' },
      { text: '–COOH', tag: 'acido-carboxilico' }
    ],
    grupos: ['acido-carboxilico', 'alcano'],
    uso: 'Antiinflamatorio de uso común.',
    relacion: 'El grupo –COOH es el que le da su carácter ácido — la misma lógica que el vinagre, aunque el resto de la molécula sea mucho más grande.'
  },
  {
    id: 'cafeina', nombre: 'Cafeína', nombreCompleto: 'Cafeína (metilxantina)',
    segments: [
      { text: 'Estructura de anillos fusionados', tag: null },
      { text: 'Varios –CO–N–', tag: 'amida' },
      { text: 'Nitrógenos del anillo', tag: 'amina' }
    ],
    grupos: ['amida', 'amina'],
    uso: 'Estimulante presente en café, té y algunas bebidas.',
    relacion: 'Una estructura de anillos con varios grupos amida y aminas — un ejemplo de molécula más compleja, útil para practicar identificar grupos aunque la molécula completa se vea complicada.'
  },
  {
    id: 'acido-acetico', nombre: 'Ácido acético', nombreCompleto: 'Ácido acético (vinagre)',
    segments: [
      { text: 'CH3–', tag: null },
      { text: '–COOH', tag: 'acido-carboxilico' }
    ],
    grupos: ['acido-carboxilico'],
    uso: 'Componente principal del vinagre.',
    relacion: 'El grupo –COOH es el mismo que aparece en la aspirina y el ibuprofeno — el mismo grupo funcional, en una molécula mucho más simple.'
  },
  {
    id: 'etanol', nombre: 'Etanol', nombreCompleto: 'Etanol (alcohol etílico)',
    segments: [
      { text: 'CH3–CH2–', tag: null },
      { text: '–OH', tag: 'alcohol' }
    ],
    grupos: ['alcohol'],
    uso: 'Presente en bebidas alcohólicas y desinfectantes.',
    relacion: 'La molécula más simple para reconocer el grupo –OH en contexto — la base para comparar con el fenol del acetaminofén.'
  },
  {
    id: 'acetona', nombre: 'Acetona', nombreCompleto: 'Propanona',
    segments: [
      { text: 'CH3–', tag: null },
      { text: 'C=O', tag: 'cetona' },
      { text: '–CH3', tag: null }
    ],
    grupos: ['cetona'],
    uso: 'Disolvente doméstico e industrial (quitaesmalte).',
    relacion: 'El carbonilo está EN MEDIO de la cadena (entre dos grupos CH3) — la posición exacta que distingue una cetona de un aldehído.'
  },
  {
    id: 'glucosa', nombre: 'Glucosa', nombreCompleto: 'Glucosa (forma de cadena abierta)',
    segments: [
      { text: '–CHO', tag: 'aldehido' },
      { text: 'Varios –CH(OH)–', tag: 'alcohol' },
      { text: '–CH2OH', tag: 'alcohol' }
    ],
    grupos: ['aldehido', 'alcohol'],
    uso: 'Principal fuente de energía rápida del cuerpo.',
    relacion: 'Combina un grupo aldehído con VARIOS grupos alcohol en la misma cadena — por eso la glucosa es tan afín al agua (cada –OH puede formar puentes de hidrógeno).'
  },
  {
    id: 'alanina', nombre: 'Alanina', nombreCompleto: 'Alanina (aminoácido)',
    segments: [
      { text: 'H2N–', tag: 'amina' },
      { text: 'CH(CH3)–', tag: null },
      { text: '–COOH', tag: 'acido-carboxilico' }
    ],
    grupos: ['amina', 'acido-carboxilico'],
    uso: 'Uno de los aminoácidos que forman las proteínas del cuerpo.',
    relacion: 'Tiene amina Y ácido carboxílico en la misma molécula — exactamente la combinación que define a todos los aminoácidos, la base de las proteínas.'
  }
];
