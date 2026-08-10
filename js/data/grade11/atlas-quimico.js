/* ================================================================
   MÁSQUECIENCIA — js/data/grade11/atlas-quimico.js
   ATLAS QUÍMICO MQC — función oficial de la Unidad IV (IMP-11-U04)
   ================================================================
   Colección sencilla de conceptos (no una biblioteca de decenas de
   moléculas, tal como pide el ticket) — 9 grupos funcionales + 4
   biomoléculas. Contenido verificado contra el programa oficial del
   MEP para Química de Undécimo Año, sin mecanismos de reacción ni
   síntesis orgánica (fuera de alcance explícito).

   Los 3 grupos "alcano/alqueno/alquino" ya se enseñaron en la
   Unidad III — el Atlas los incluye como referencia (así queda
   completo con los 9 grupos que el ticket pide), pero su
   "descubrimiento" se dispara únicamente desde el contenido de la
   propia Unidad IV (repaso breve en el Tema 1), nunca modificando
   g11-u03.js — ver g11-u04.js para el mecanismo real.
================================================================ */
window.ATLAS_QUIMICO_DATA = {
  gruposFuncionales: [
    { id: 'alcano', nombre: 'Alcano', representacion: 'C–C (enlace simple)', grupo: 'Ninguno — hidrocarburo saturado',
      ejemplo: 'Propano (gas para cocinar)', aplicacion: 'Combustibles domésticos e industriales.' },
    { id: 'alqueno', nombre: 'Alqueno', representacion: 'C=C (enlace doble)', grupo: 'Enlace doble carbono-carbono',
      ejemplo: 'Eteno (madurador natural de frutas)', aplicacion: 'Materia prima para fabricar plásticos.' },
    { id: 'alquino', nombre: 'Alquino', representacion: 'C≡C (enlace triple)', grupo: 'Enlace triple carbono-carbono',
      ejemplo: 'Etino / acetileno', aplicacion: 'Soldadura industrial (soplete oxiacetilénico).' },
    { id: 'alcohol', nombre: 'Alcohol', representacion: 'R–OH', grupo: 'Hidroxilo (–OH)',
      ejemplo: 'Etanol (bebidas alcohólicas, desinfectantes)', aplicacion: 'Desinfección, combustible renovable (bioetanol).' },
    { id: 'aldehido', nombre: 'Aldehído', representacion: 'R–CHO', grupo: 'Carbonilo terminal (–CHO)',
      ejemplo: 'Formaldehído', aplicacion: 'Conservante en laboratorios (uso profesional controlado).' },
    { id: 'cetona', nombre: 'Cetona', representacion: 'R–CO–R\'', grupo: 'Carbonilo interno (C=O entre carbonos)',
      ejemplo: 'Acetona (quitaesmalte)', aplicacion: 'Disolvente industrial y doméstico.' },
    { id: 'acido-carboxilico', nombre: 'Ácido carboxílico', representacion: 'R–COOH', grupo: 'Carboxilo (–COOH)',
      ejemplo: 'Ácido acético (vinagre)', aplicacion: 'Conservación de alimentos, saborizante.' },
    { id: 'ester', nombre: 'Éster', representacion: 'R–COO–R\'', grupo: 'Enlace éster (–COO–)',
      ejemplo: 'Acetato de etilo', aplicacion: 'Aromas frutales artificiales, esmalte de uñas.' },
    { id: 'amina', nombre: 'Amina', representacion: 'R–NH2', grupo: 'Amino (–NH2)',
      ejemplo: 'Metilamina', aplicacion: 'Parte estructural de los aminoácidos (base de las proteínas).' },
    /* HOTFIX-10 PREMIUM: los 2 grupos que faltaban para llegar al
       mínimo de 11 pedido por el ticket — misma estructura de ficha
       que los 9 ya existentes, ampliación aditiva de datos, sin
       tocar el motor ni la vista del Atlas. */
    { id: 'eter', nombre: 'Éter', representacion: 'R–O–R\'', grupo: 'Oxígeno puente entre dos cadenas (–O–)',
      ejemplo: 'Éter dietílico (anestésico histórico)', aplicacion: 'Disolvente en laboratorio; uso histórico como anestésico.' },
    { id: 'amida', nombre: 'Amida', representacion: 'R–CO–NH2', grupo: 'Carbonilo unido a nitrógeno (–CONH–)',
      ejemplo: 'Acetamida (presente en el acetaminofén)', aplicacion: 'Parte estructural de analgésicos comunes y de las proteínas (enlace peptídico).' }
  ],
  biomoleculas: [
    { id: 'carbohidratos', nombre: 'Carbohidratos', funcion: 'Fuente principal de energía rápida; también dan estructura (ej. en plantas)',
      elementos: 'C, H, O', ejemplo: 'Glucosa, almidón, celulosa', importancia: 'Es la energía inmediata que usa el cuerpo para funcionar.' },
    { id: 'lipidos', nombre: 'Lípidos', funcion: 'Reserva de energía a largo plazo y estructura de las membranas celulares',
      elementos: 'C, H, O (proporción de oxígeno mucho menor que en los carbohidratos)', ejemplo: 'Aceites, grasas, colesterol', importancia: 'Aíslan, protegen órganos y forman la membrana de cada célula.' },
    { id: 'proteinas', nombre: 'Proteínas', funcion: 'Estructura de tejidos y funcionamiento como enzimas (aceleran reacciones del cuerpo)',
      elementos: 'C, H, O, N (a veces S)', ejemplo: 'Queratina (pelo, uñas), enzimas digestivas', importancia: 'Construyen y reparan tejidos, y hacen posibles las reacciones químicas del cuerpo.' },
    { id: 'acidos-nucleicos', nombre: 'Ácidos nucleicos', funcion: 'Almacenar y transmitir la información genética',
      elementos: 'C, H, O, N, P', ejemplo: 'ADN, ARN', importancia: 'Contienen las instrucciones hereditarias de todo ser vivo.' }
  ]
};
