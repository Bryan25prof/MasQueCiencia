/* ================================================================
   QUÍMICA INTERACTIVA 10° — Lic. Bryan Chavarría C.
   js/data/elementos.js  |  Datos de los 118 elementos
   ================================================================
   ⚠️  IMPORTANTE: Los datos son variables JS (no fetch/JSON)
       para compatibilidad con protocolo file:// sin servidor.

   CAMPOS POR ELEMENTO:
     z       — Número atómico
     symbol  — Símbolo químico
     name    — Nombre en español
     mass    — Masa atómica (u)
     group   — Grupo (1-18) | null para lantánidos/actínidos
     period  — Período (1-7)
     block   — Bloque (s, p, d, f)
     type    — Tipo (ver TYPE_NAMES abajo)
     state   — Estado a 25°C: 'solid' | 'liquid' | 'gas' | 'unknown'
     en      — Electronegatividad Pauling | null
     config  — Configuración electrónica (notación NLX)
     uses    — Usos principales (array de strings)
     fact    — Dato curioso

   PARA AGREGAR ELEMENTOS O DATOS: editar este archivo directamente.
================================================================ */

/* Nombres de tipos para mostrar en UI */
const TYPE_NAMES = {
  'nonmetal':         'No Metal',
  'alkali-metal':     'Metal Alcalino',
  'alkaline-earth':   'Metal Alcalinotérreo',
  'transition-metal': 'Metal de Transición',
  'post-transition':  'Metal Post-Transición',
  'metalloid':        'Metaloide',
  'halogen':          'Halógeno',
  'noble-gas':        'Gas Noble',
  'lanthanide':       'Lantánido',
  'actinide':         'Actínido',
  'unknown':          'Propiedades Desconocidas'
};

/* Nombres de estados */
const STATE_NAMES = {
  'solid':   'Sólido',
  'liquid':  'Líquido',
  'gas':     'Gas',
  'unknown': 'Desconocido'
};

/* Nombres de bloques */
const BLOCK_NAMES = {
  's': 'Bloque s',
  'p': 'Bloque p',
  'd': 'Bloque d',
  'f': 'Bloque f'
};

/* ================================================================
   TODOS LOS 118 ELEMENTOS
================================================================ */
const ELEMENTOS = [

  /* ── PERÍODO 1 ── */
  {
    z:1,  symbol:"H",  name:"Hidrógeno",    mass:1.008,
    group:1,  period:1, block:"s", type:"nonmetal",
    state:"gas",   en:2.20,
    config:"1s¹",
    uses:["Combustible de cohetes","Síntesis de amoníaco","Celdas de combustible","Refinación de petróleo"],
    fact:"Es el elemento más abundante del universo (≈75% de la materia visible)."
  },
  {
    z:2,  symbol:"He", name:"Helio",         mass:4.003,
    group:18, period:1, block:"s", type:"noble-gas",
    state:"gas",   en:null,
    config:"1s²",
    uses:["Globos y dirigibles","Enfriamiento de imanes de MRI","Mezclas para buceo"],
    fact:"El segundo elemento más abundante del universo y el primero en ser descubierto en el Sol antes que en la Tierra."
  },

  /* ── PERÍODO 2 ── */
  {
    z:3,  symbol:"Li", name:"Litio",         mass:6.941,
    group:1,  period:2, block:"s", type:"alkali-metal",
    state:"solid", en:0.98,
    config:"1s² 2s¹",
    uses:["Baterías de ión litio","Medicamentos (trastorno bipolar)","Aleaciones ligeras","Lubricantes"],
    fact:"Es el metal sólido más ligero que existe."
  },
  {
    z:4,  symbol:"Be", name:"Berilio",        mass:9.012,
    group:2,  period:2, block:"s", type:"alkaline-earth",
    state:"solid", en:1.57,
    config:"1s² 2s²",
    uses:["Ventanas de rayos X","Aleaciones Cu-Be","Reactores nucleares"],
    fact:"Sus sales son dulces al gusto pero altamente tóxicas."
  },
  {
    z:5,  symbol:"B",  name:"Boro",           mass:10.811,
    group:13, period:2, block:"p", type:"metalloid",
    state:"solid", en:2.04,
    config:"1s² 2s² 2p¹",
    uses:["Fibra de vidrio","Borosilicato (Pyrex)","Semiconductores","Detergentes"],
    fact:"El boro no se encuentra puro en la naturaleza; siempre aparece en compuestos como el bórax."
  },
  {
    z:6,  symbol:"C",  name:"Carbono",        mass:12.011,
    group:14, period:2, block:"p", type:"nonmetal",
    state:"solid", en:2.55,
    config:"1s² 2s² 2p²",
    uses:["Grafito (lápices)","Diamante (joyería y abrasivos)","Fibra de carbono","Combustibles fósiles"],
    fact:"El carbono-14 se usa en arqueología para datar objetos de hasta 50,000 años de antigüedad."
  },
  {
    z:7,  symbol:"N",  name:"Nitrógeno",      mass:14.007,
    group:15, period:2, block:"p", type:"nonmetal",
    state:"gas",   en:3.04,
    config:"1s² 2s² 2p³",
    uses:["Fertilizantes (amoníaco)","Atmósfera inerte industrial","Nitrógeno líquido (criogenia)","Explosivos"],
    fact:"Constituye el 78% de la atmósfera terrestre."
  },
  {
    z:8,  symbol:"O",  name:"Oxígeno",        mass:15.999,
    group:16, period:2, block:"p", type:"nonmetal",
    state:"gas",   en:3.44,
    config:"1s² 2s² 2p⁴",
    uses:["Respiración","Soldadura oxiacetilénica","Hospitales (medicina)","Tratamiento de agua"],
    fact:"Es el elemento más abundante en la corteza terrestre y el tercero más abundante del universo."
  },
  {
    z:9,  symbol:"F",  name:"Flúor",          mass:18.998,
    group:17, period:2, block:"p", type:"halogen",
    state:"gas",   en:3.98,
    config:"1s² 2s² 2p⁵",
    uses:["Pasta dental (flúor)","Teflón (PTFE)","Freones (refrigerantes)","Tratamiento del agua"],
    fact:"Es el elemento más electronegativo de toda la tabla periódica."
  },
  {
    z:10, symbol:"Ne", name:"Neón",           mass:20.180,
    group:18, period:2, block:"p", type:"noble-gas",
    state:"gas",   en:null,
    config:"1s² 2s² 2p⁶",
    uses:["Letreros luminosos","Láseres de neón","Criogenia","Detectores de partículas"],
    fact:"El gas que da el característico color rojo-naranja a los llamados 'letreros de neón'."
  },

  /* ── PERÍODO 3 ── */
  {
    z:11, symbol:"Na", name:"Sodio",          mass:22.990,
    group:1,  period:3, block:"s", type:"alkali-metal",
    state:"solid", en:0.93,
    config:"[Ne] 3s¹",
    uses:["Sal de mesa (NaCl)","Lámparas de vapor de sodio","Jabones","Papel"],
    fact:"El sodio reacciona violentamente con el agua y se puede cortar con un cuchillo por su blandura."
  },
  {
    z:12, symbol:"Mg", name:"Magnesio",       mass:24.305,
    group:2,  period:3, block:"s", type:"alkaline-earth",
    state:"solid", en:1.31,
    config:"[Ne] 3s²",
    uses:["Aleaciones ligeras (aviones)","Suplementos nutricionales","Pirotecnia","Antácidos"],
    fact:"El magnesio arde con una llama blanca tan brillante que fue usado en los primeros flashes fotográficos."
  },
  {
    z:13, symbol:"Al", name:"Aluminio",       mass:26.982,
    group:13, period:3, block:"p", type:"post-transition",
    state:"solid", en:1.61,
    config:"[Ne] 3s² 3p¹",
    uses:["Envases (latas)","Aviones y automóviles","Construcción","Papel de aluminio"],
    fact:"Es el metal más abundante en la corteza terrestre (≈8%) y el tercer elemento más común."
  },
  {
    z:14, symbol:"Si", name:"Silicio",        mass:28.086,
    group:14, period:3, block:"p", type:"metalloid",
    state:"solid", en:1.90,
    config:"[Ne] 3s² 3p²",
    uses:["Microchips y procesadores","Paneles solares","Vidrio y cerámica","Silicona"],
    fact:"El silicio es la base de la electrónica moderna: cada smartphone contiene miles de millones de transistores de Si."
  },
  {
    z:15, symbol:"P",  name:"Fósforo",        mass:30.974,
    group:15, period:3, block:"p", type:"nonmetal",
    state:"solid", en:2.19,
    config:"[Ne] 3s² 3p³",
    uses:["Fertilizantes (fosfatos)","Cerillas (fósforos)","Detergentes","ADN y ATP"],
    fact:"Existe en el nombre de los 'fósforos' (cerillas), aunque hoy se usan compuestos de fósforo rojo, no blanco."
  },
  {
    z:16, symbol:"S",  name:"Azufre",         mass:32.06,
    group:16, period:3, block:"p", type:"nonmetal",
    state:"solid", en:2.58,
    config:"[Ne] 3s² 3p⁴",
    uses:["Ácido sulfúrico (industria)","Fungicidas","Vulcanización del caucho","Pólvora"],
    fact:"El característico olor a 'huevo podrido' es del H₂S, pero el azufre puro en realidad casi no huele."
  },
  {
    z:17, symbol:"Cl", name:"Cloro",          mass:35.45,
    group:17, period:3, block:"p", type:"halogen",
    state:"gas",   en:3.16,
    config:"[Ne] 3s² 3p⁵",
    uses:["Potabilización del agua","Blanqueador (hipoclorito)","PVC","Medicamentos"],
    fact:"El cloro fue usado como arma química en la Primera Guerra Mundial, siendo uno de los primeros gases de guerra."
  },
  {
    z:18, symbol:"Ar", name:"Argón",          mass:39.948,
    group:18, period:3, block:"p", type:"noble-gas",
    state:"gas",   en:null,
    config:"[Ne] 3s² 3p⁶",
    uses:["Atmósfera inerte en soldadura","Lámparas incandescentes","Ventanas dobles","Láseres"],
    fact:"Es el gas noble más abundante en la atmósfera terrestre (0.93%)."
  },

  /* ── PERÍODO 4 ── */
  {
    z:19, symbol:"K",  name:"Potasio",        mass:39.098,
    group:1,  period:4, block:"s", type:"alkali-metal",
    state:"solid", en:0.82,
    config:"[Ar] 4s¹",
    uses:["Fertilizantes","Electrolitos del cuerpo","Explosivos","Detergentes"],
    fact:"Su símbolo K viene del latín 'Kalium'. Es esencial para el funcionamiento del corazón humano."
  },
  {
    z:20, symbol:"Ca", name:"Calcio",         mass:40.078,
    group:2,  period:4, block:"s", type:"alkaline-earth",
    state:"solid", en:1.00,
    config:"[Ar] 4s²",
    uses:["Huesos y dientes","Cal y cemento","Suplementos cálcicos","Aleaciones metálicas"],
    fact:"El calcio es el mineral más abundante en el cuerpo humano: un adulto tiene aproximadamente 1 kg de Ca."
  },
  {
    z:21, symbol:"Sc", name:"Escandio",       mass:44.956,
    group:3,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.36,
    config:"[Ar] 3d¹ 4s²",
    uses:["Aleaciones de aluminio-escandio","Lámparas de mercurio","Radiotrazadores"],
    fact:"Fue predicho por Mendeléev antes de ser descubierto, corroborando la ley periódica."
  },
  {
    z:22, symbol:"Ti", name:"Titanio",        mass:47.867,
    group:4,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.54,
    config:"[Ar] 3d² 4s²",
    uses:["Implantes médicos","Aeronáutica","Armaduras","Pintura blanca (TiO₂)"],
    fact:"Es tan fuerte como el acero pero 45% más ligero, y completamente biocompatible con el cuerpo humano."
  },
  {
    z:23, symbol:"V",  name:"Vanadio",        mass:50.942,
    group:5,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.63,
    config:"[Ar] 3d³ 4s²",
    uses:["Aceros de alta resistencia","Catalizadores","Baterías de flujo","Pigmentos amarillos"],
    fact:"Recibió su nombre de Vanadis, diosa nórdica de la belleza, por sus compuestos de muchos colores."
  },
  {
    z:24, symbol:"Cr", name:"Cromo",          mass:51.996,
    group:6,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.66,
    config:"[Ar] 3d⁵ 4s¹",
    uses:["Acero inoxidable","Cromado decorativo","Pinturas","Curtiembre del cuero"],
    fact:"⚠️ ANOMALÍA ELECTRÓNICA: Su configuración es 3d⁵ 4s¹ en lugar de 3d⁴ 4s², pues el subnivel d semilleno es más estable."
  },
  {
    z:25, symbol:"Mn", name:"Manganeso",      mass:54.938,
    group:7,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.55,
    config:"[Ar] 3d⁵ 4s²",
    uses:["Acero (dureza)","Baterías alcalinas","Pigmentos","Fertilizantes"],
    fact:"Es el 12.° elemento más abundante en la corteza terrestre y esencial para las plantas."
  },
  {
    z:26, symbol:"Fe", name:"Hierro",         mass:55.845,
    group:8,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.83,
    config:"[Ar] 3d⁶ 4s²",
    uses:["Acero y construcción","Hemoglobina (transporte de O₂)","Imanes","Maquinaria"],
    fact:"El núcleo de la Tierra está compuesto principalmente de hierro y níquel fundidos."
  },
  {
    z:27, symbol:"Co", name:"Cobalto",        mass:58.933,
    group:9,  period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.88,
    config:"[Ar] 3d⁷ 4s²",
    uses:["Baterías (Li-ion)","Pigmento azul cobalto","Aleaciones magnéticas","Vitamina B12"],
    fact:"La Vitamina B12 es el único compuesto biológico que contiene cobalto como elemento central."
  },
  {
    z:28, symbol:"Ni", name:"Níquel",         mass:58.693,
    group:10, period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.91,
    config:"[Ar] 3d⁸ 4s²",
    uses:["Acero inoxidable","Monedas","Pilas recargables Ni-MH","Catalizadores"],
    fact:"El níquel en monedas de los EE.UU. es en realidad 75% cobre; solo el 25% es níquel."
  },
  {
    z:29, symbol:"Cu", name:"Cobre",          mass:63.546,
    group:11, period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.90,
    config:"[Ar] 3d¹⁰ 4s¹",
    uses:["Cables eléctricos","Tuberías","Monedas","Bronce y latón"],
    fact:"⚠️ ANOMALÍA: Su config. real es 3d¹⁰ 4s¹ (no 3d⁹ 4s²) porque d completo = mayor estabilidad."
  },
  {
    z:30, symbol:"Zn", name:"Zinc",           mass:65.38,
    group:12, period:4, block:"d", type:"transition-metal",
    state:"solid", en:1.65,
    config:"[Ar] 3d¹⁰ 4s²",
    uses:["Galvanización del acero","Pilas","Pinturas anticorrosión","Suplemento nutricional"],
    fact:"El zinc es esencial para más de 300 enzimas del cuerpo humano y es el cuarto metal más usado industrialmente."
  },
  {
    z:31, symbol:"Ga", name:"Galio",          mass:69.723,
    group:13, period:4, block:"p", type:"post-transition",
    state:"solid", en:1.81,
    config:"[Ar] 3d¹⁰ 4s² 4p¹",
    uses:["Semiconductores GaN (LEDs)","Células solares","Medicina nuclear","Termómetros"],
    fact:"El galio se derrite en la mano: su punto de fusión es solo 29.76°C (menor que la temperatura corporal)."
  },
  {
    z:32, symbol:"Ge", name:"Germanio",       mass:72.630,
    group:14, period:4, block:"p", type:"metalloid",
    state:"solid", en:2.01,
    config:"[Ar] 3d¹⁰ 4s² 4p²",
    uses:["Transistores (histórico)","Fibra óptica","Semiconductores","Cámaras infrarrojas"],
    fact:"Fue predicho por Mendeléev como 'eka-silicio' y su descubrimiento en 1886 validó la tabla periódica."
  },
  {
    z:33, symbol:"As", name:"Arsénico",       mass:74.922,
    group:15, period:4, block:"p", type:"metalloid",
    state:"solid", en:2.18,
    config:"[Ar] 3d¹⁰ 4s² 4p³",
    uses:["Semiconductores GaAs","Pesticidas (histórico)","Madera tratada","Vidrios especiales"],
    fact:"El arsénico fue el veneno favorito de los envenenadores de la historia por ser inodoro, insípido y difícil de detectar."
  },
  {
    z:34, symbol:"Se", name:"Selenio",        mass:78.971,
    group:16, period:4, block:"p", type:"nonmetal",
    state:"solid", en:2.55,
    config:"[Ar] 3d¹⁰ 4s² 4p⁴",
    uses:["Fotoconductores (fotocopiadoras)","Paneles solares","Vidrio (decoloración)","Suplemento antioxidante"],
    fact:"El selenio es semiconductor cuando está iluminado y casi no conduce en la oscuridad, base de la fotocopia."
  },
  {
    z:35, symbol:"Br", name:"Bromo",          mass:79.904,
    group:17, period:4, block:"p", type:"halogen",
    state:"liquid", en:2.96,
    config:"[Ar] 3d¹⁰ 4s² 4p⁵",
    uses:["Retardadores de llama","Fotografía analógica","Desinfectantes","Pesticidas"],
    fact:"El bromo es uno de solo dos elementos que son líquidos a temperatura ambiente (el otro es el mercurio)."
  },
  {
    z:36, symbol:"Kr", name:"Kriptón",        mass:83.798,
    group:18, period:4, block:"p", type:"noble-gas",
    state:"gas",   en:3.00,
    config:"[Ar] 3d¹⁰ 4s² 4p⁶",
    uses:["Lámparas de destellos","Láseres de excímero","Iluminación aeronáutica","Fotografía de alta velocidad"],
    fact:"En 1960, el metro se definió oficialmente usando la longitud de onda de la luz naranja-roja del criptón-86."
  },

  /* ── PERÍODO 5 ── */
  {
    z:37, symbol:"Rb", name:"Rubidio",        mass:85.468,
    group:1,  period:5, block:"s", type:"alkali-metal",
    state:"solid", en:0.82,
    config:"[Kr] 5s¹",
    uses:["Relojes atómicos","Fotoceldas","Investigación en física cuántica"],
    fact:"Los relojes de rubidio son el tipo más usado de relojes atómicos en el mundo."
  },
  {
    z:38, symbol:"Sr", name:"Estroncio",      mass:87.62,
    group:2,  period:5, block:"s", type:"alkaline-earth",
    state:"solid", en:0.95,
    config:"[Kr] 5s²",
    uses:["Fuegos artificiales (rojo brillante)","Imanes de ferrita","Tratamiento de osteoporosis"],
    fact:"El Sr-90, producto de explosiones nucleares, es peligroso porque el cuerpo lo confunde con el calcio."
  },
  {
    z:39, symbol:"Y",  name:"Itrio",          mass:88.906,
    group:3,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.22,
    config:"[Kr] 4d¹ 5s²",
    uses:["Superconductores","LEDs blancos","Aleaciones de aluminio","Láseres YAG"],
    fact:"Los LEDs blancos actuales usan fósforos de itrio que convierten la luz azul en espectro blanco."
  },
  {
    z:40, symbol:"Zr", name:"Zirconio",       mass:91.224,
    group:4,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.33,
    config:"[Kr] 4d² 5s²",
    uses:["Reactores nucleares","Prótesis cerámicas","Diamante sintético (circón)","Catalizadores"],
    fact:"La cúbica de circonio (zirconia) es la imitación del diamante más usada en joyería."
  },
  {
    z:41, symbol:"Nb", name:"Niobio",         mass:92.906,
    group:5,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.60,
    config:"[Kr] 4d⁴ 5s¹",
    uses:["Aceros de alta resistencia","Superconductores (MRI)","Reactores nucleares"],
    fact:"Niobio presenta anomalía electrónica: tiene 4d⁴ 5s¹ en lugar de 4d³ 5s²."
  },
  {
    z:42, symbol:"Mo", name:"Molibdeno",      mass:95.96,
    group:6,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:2.16,
    config:"[Kr] 4d⁵ 5s¹",
    uses:["Aceros para herramientas","Lubricantes sólidos (MoS₂)","Catalizadores en refinería","Electrónica"],
    fact:"⚠️ ANOMALÍA: Config. 4d⁵ 5s¹ (no 4d⁴ 5s²), análoga al Cr, por estabilidad del d semilleno."
  },
  {
    z:43, symbol:"Tc", name:"Tecnecio",       mass:97,
    group:7,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.90,
    config:"[Kr] 4d⁵ 5s²",
    uses:["Medicina nuclear (Tc-99m)","Anticorrosivos (investigación)"],
    fact:"Es el elemento más ligero que no tiene isótopos estables: todo el Tc de la Tierra es artificial."
  },
  {
    z:44, symbol:"Ru", name:"Rutenio",        mass:101.07,
    group:8,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:2.20,
    config:"[Kr] 4d⁷ 5s¹",
    uses:["Catalizadores","Electrónica (contactos eléctricos)","Tintes solares (celdas de Grätzel)"],
    fact:"El rutenio es uno de los platinoides más raros en la Tierra y también fue predicho por Mendeléev."
  },
  {
    z:45, symbol:"Rh", name:"Rodio",          mass:102.906,
    group:9,  period:5, block:"d", type:"transition-metal",
    state:"solid", en:2.28,
    config:"[Kr] 4d⁸ 5s¹",
    uses:["Catalizadores de automóviles","Joyería (baño de rodio)","Electrodos","Termopares"],
    fact:"El rodio es el metal más caro del mundo y es el que convierte los gases contaminantes del escape en CO₂ y N₂."
  },
  {
    z:46, symbol:"Pd", name:"Paladio",        mass:106.42,
    group:10, period:5, block:"d", type:"transition-metal",
    state:"solid", en:2.20,
    config:"[Kr] 4d¹⁰",
    uses:["Catalizadores de automóviles","Dentistería","Electrónica","Joyería de 'oro blanco'"],
    fact:"⚠️ ANOMALÍA EXTREMA: El Pd tiene config. 4d¹⁰ 5s⁰ — sin electrones en 5s, único en su tipo."
  },
  {
    z:47, symbol:"Ag", name:"Plata",          mass:107.868,
    group:11, period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.93,
    config:"[Kr] 4d¹⁰ 5s¹",
    uses:["Joyería","Fotografía analógica","Electrónica","Antibacterianos"],
    fact:"⚠️ ANOMALÍA: Config. 4d¹⁰ 5s¹ (no 4d⁹ 5s²), análoga al Cu, por estabilidad del d completo."
  },
  {
    z:48, symbol:"Cd", name:"Cadmio",         mass:112.411,
    group:12, period:5, block:"d", type:"transition-metal",
    state:"solid", en:1.69,
    config:"[Kr] 4d¹⁰ 5s²",
    uses:["Baterías Ni-Cd","Pigmentos amarillos","Estabilizadores de PVC","Recubrimientos"],
    fact:"El cadmio es altamente tóxico y bioacumulable; la 'enfermedad Itai-Itai' en Japón fue causada por contaminación con Cd."
  },
  {
    z:49, symbol:"In", name:"Indio",          mass:114.818,
    group:13, period:5, block:"p", type:"post-transition",
    state:"solid", en:1.78,
    config:"[Kr] 4d¹⁰ 5s² 5p¹",
    uses:["Pantallas táctiles (ITO)","Semiconductores","Soldaduras de bajo punto de fusión"],
    fact:"El ITO (óxido de indio-estaño) es el material transparente conductor de casi todas las pantallas táctiles."
  },
  {
    z:50, symbol:"Sn", name:"Estaño",         mass:118.710,
    group:14, period:5, block:"p", type:"post-transition",
    state:"solid", en:1.96,
    config:"[Kr] 4d¹⁰ 5s² 5p²",
    uses:["Soldadura electrónica","Hojalata (conservas)","Bronce y pewter","Vidrio de estaño"],
    fact:"A temperaturas muy bajas, el estaño se convierte en polvo gris ('plaga del estaño'). Afectó las campañas de Napoleón en Rusia."
  },
  {
    z:51, symbol:"Sb", name:"Antimonio",      mass:121.760,
    group:15, period:5, block:"p", type:"metalloid",
    state:"solid", en:2.05,
    config:"[Kr] 4d¹⁰ 5s² 5p³",
    uses:["Retardadores de llama","Semiconductores","Baterías de plomo-ácido","Pinturas"],
    fact:"En el antiguo Egipto, el antimonio (sulfuro de antimonio, negro) se usaba como delineador de ojos (kohl)."
  },
  {
    z:52, symbol:"Te", name:"Teluro",         mass:127.60,
    group:16, period:5, block:"p", type:"metalloid",
    state:"solid", en:2.10,
    config:"[Kr] 4d¹⁰ 5s² 5p⁴",
    uses:["Semiconductores","Células solares de CdTe","Discos Blu-ray","Aleaciones especiales"],
    fact:"El teluro es uno de los elementos más escasos en la corteza terrestre, más raro que el platino."
  },
  {
    z:53, symbol:"I",  name:"Yodo",           mass:126.904,
    group:17, period:5, block:"p", type:"halogen",
    state:"solid", en:2.66,
    config:"[Kr] 4d¹⁰ 5s² 5p⁵",
    uses:["Antiséptico (tintura de yodo)","Sal yodada (prevención del bocio)","Contraste radiológico","Medicina nuclear"],
    fact:"El I-131 se usa para tratar el cáncer de tiroides porque esta glándula absorbe selectivamente el yodo."
  },
  {
    z:54, symbol:"Xe", name:"Xenón",          mass:131.293,
    group:18, period:5, block:"p", type:"noble-gas",
    state:"gas",   en:2.60,
    config:"[Kr] 4d¹⁰ 5s² 5p⁶",
    uses:["Lámparas de flash","Motores iónicos de naves espaciales","Anestesia","Láseres de excímero"],
    fact:"Los motores iónicos de las sondas espaciales usan xenón ionizado como propulsor, expulsándolo a gran velocidad."
  },

  /* ── PERÍODO 6 ── */
  {
    z:55, symbol:"Cs", name:"Cesio",          mass:132.905,
    group:1,  period:6, block:"s", type:"alkali-metal",
    state:"solid", en:0.79,
    config:"[Xe] 6s¹",
    uses:["Relojes atómicos (estándar de tiempo)","Fotocélulas","Catalizadores"],
    fact:"El cesio-133 define el segundo: 9,192,631,770 oscilaciones de su radiación hiperfina."
  },
  {
    z:56, symbol:"Ba", name:"Bario",          mass:137.327,
    group:2,  period:6, block:"s", type:"alkaline-earth",
    state:"solid", en:0.89,
    config:"[Xe] 6s²",
    uses:["Papilla de bario (contraste digestivo)","Fuegos artificiales (verde)","Vidrios ópticos","Lubricantes"],
    fact:"La 'papilla de bario' (BaSO₄) es insoluble y no tóxica; se usa en rayos X del tracto digestivo."
  },

  /* ── LANTÁNIDOS (Período 6, Bloque f) ── */
  {
    z:57,  symbol:"La", name:"Lantano",       mass:138.905,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.10,
    config:"[Xe] 5d¹ 6s²",
    uses:["Baterías Ni-MH","Óptica (vidrios de lantano)","Catalizadores","Pantallas de TV"],
    fact:"El lantano da nombre a toda la serie de los lantánidos (elementos 57-71)."
  },
  {
    z:58,  symbol:"Ce", name:"Cerio",         mass:140.116,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.12,
    config:"[Xe] 4f¹ 5d¹ 6s²",
    uses:["Encendedores (mecha de cerio)","Catalizadores automotrices","Pulido de vidrios","LEDs"],
    fact:"El cerio es el lantánido más abundante en la corteza terrestre y más común que el cobre."
  },
  {
    z:59,  symbol:"Pr", name:"Praseodimio",   mass:140.908,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.13,
    config:"[Xe] 4f³ 6s²",
    uses:["Imanes permanentes","Vidrios tintados (gafas de soldador)","Catalizadores","Pigmentos amarillos"],
    fact:"Su nombre significa 'gemelo verde' en griego, por su llama verde característica."
  },
  {
    z:60,  symbol:"Nd", name:"Neodimio",      mass:144.242,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.14,
    config:"[Xe] 4f⁴ 6s²",
    uses:["Imanes Nd-Fe-B (los más potentes)","Láseres de Nd:YAG","Auriculares","Motores eléctricos"],
    fact:"Los imanes de neodimio son los imanes permanentes más fuertes conocidos: pueden levantar miles de veces su propio peso."
  },
  {
    z:61,  symbol:"Pm", name:"Prometio",      mass:145,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.13,
    config:"[Xe] 4f⁵ 6s²",
    uses:["Marcapasos (baterías nucleares antiguas)","Medidores de espesor (beta)"],
    fact:"Es el único lantánido sin isótopos estables. Todo el prometio terrestre es producido artificialmente."
  },
  {
    z:62,  symbol:"Sm", name:"Samario",       mass:150.36,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.17,
    config:"[Xe] 4f⁶ 6s²",
    uses:["Imanes Sm-Co (para altas temperaturas)","Tratamiento de cáncer de hueso","Láseres","Reactores nucleares"],
    fact:"Los imanes de samario-cobalto se usan donde los de neodimio fallarían por el calor (hasta 800°C)."
  },
  {
    z:63,  symbol:"Eu", name:"Europio",       mass:151.964,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.20,
    config:"[Xe] 4f⁷ 6s²",
    uses:["Fósforos rojos en pantallas de TV","Billetes de euro (tinta fluorescente)","LEDs blancos","Reactores nucleares"],
    fact:"El europeo da el color rojo a las pantallas CRT. Los billetes de euro fluorescen bajo luz UV gracias al europio."
  },
  {
    z:64,  symbol:"Gd", name:"Gadolinio",     mass:157.25,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.20,
    config:"[Xe] 4f⁷ 5d¹ 6s²",
    uses:["Contraste en MRI","Neutrones absorbentes (reactores)","Imanes a bajas temperaturas","Sensores"],
    fact:"El gadolinio es el mejor absorbente natural de neutrones y es imprescindible como contraste en resonancias magnéticas."
  },
  {
    z:65,  symbol:"Tb", name:"Terbio",        mass:158.925,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.20,
    config:"[Xe] 4f⁹ 6s²",
    uses:["Pantallas de alta definición","Láseres verdes","Magnetostrictivos","LEDs"],
    fact:"El terbio puede cambiar de forma con un campo magnético (magnetostricción), útil en actuadores precisos."
  },
  {
    z:66,  symbol:"Dy", name:"Disprosio",     mass:162.500,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.22,
    config:"[Xe] 4f¹⁰ 6s²",
    uses:["Mejora imanes de Nd (motores de VE)","Láseres","Dosímetros de radiación"],
    fact:"El disprosio es esencial en los motores de autos eléctricos para que los imanes de Nd no pierdan fuerza con el calor."
  },
  {
    z:67,  symbol:"Ho", name:"Holmio",        mass:164.930,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.23,
    config:"[Xe] 4f¹¹ 6s²",
    uses:["Láseres Ho:YAG (cirugía)","Reguladores de campo magnético","Investigación"],
    fact:"El Ho:YAG es el láser más usado en cirugía renal (litotripsia láser) por su alta absorción en agua."
  },
  {
    z:68,  symbol:"Er", name:"Erbio",         mass:167.259,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.24,
    config:"[Xe] 4f¹² 6s²",
    uses:["Amplificadores de fibra óptica (EDFA)","Láseres Er:YAG (dermatología)","Gafas de protección","Vidrios rosas"],
    fact:"Los amplificadores EDFA (dopados con erbio) son la razón por la que Internet de fibra óptica funciona a larga distancia."
  },
  {
    z:69,  symbol:"Tm", name:"Tulio",         mass:168.934,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.25,
    config:"[Xe] 4f¹³ 6s²",
    uses:["Láseres de 2 µm","Fuente portátil de rayos X","Superconductores","Investigación"],
    fact:"Es el lantánido más escaso de todos los lantánidos estables en la corteza terrestre."
  },
  {
    z:70,  symbol:"Yb", name:"Iterbio",       mass:173.045,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.10,
    config:"[Xe] 4f¹⁴ 6s²",
    uses:["Relojes atómicos ópticos","Láseres de fibra Yb","Aceros especiales","Investigación cuántica"],
    fact:"Los relojes de iterbio son los más precisos del mundo, con error de 1 segundo cada 10 mil millones de años."
  },
  {
    z:71,  symbol:"Lu", name:"Lutecio",       mass:174.967,
    group:null, period:6, block:"f", type:"lanthanide",
    state:"solid", en:1.27,
    config:"[Xe] 4f¹⁴ 5d¹ 6s²",
    uses:["Catalizadores de refinería","Lu-177 (terapia oncológica)","LEDs","Detectores de PET"],
    fact:"Es el lantánido más denso y duro, y el último de la serie. Fue uno de los últimos elementos 'raros' en ser aislado."
  },

  /* ── PERÍODO 6, BLOQUE d ── */
  {
    z:72, symbol:"Hf", name:"Hafnio",         mass:178.49,
    group:4,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:1.30,
    config:"[Xe] 4f¹⁴ 5d² 6s²",
    uses:["Control de reactores nucleares (barras de control)","Aleaciones para motores de reacción","Semiconductores (alta-k)"],
    fact:"El hafnio es tan parecido al zirconio que tardan décadas en separarse industrialmente."
  },
  {
    z:73, symbol:"Ta", name:"Tantalio",       mass:180.948,
    group:5,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:1.50,
    config:"[Xe] 4f¹⁴ 5d³ 6s²",
    uses:["Condensadores electrolíticos (smartphones)","Implantes quirúrgicos","Armas","Herramientas de corte"],
    fact:"El conflicto por el 'coltán' (columbita-tantalita) en África financia guerras debido a la demanda de teléfonos inteligentes."
  },
  {
    z:74, symbol:"W",  name:"Wolframio",      mass:183.84,
    group:6,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:2.36,
    config:"[Xe] 4f¹⁴ 5d⁴ 6s²",
    uses:["Filamentos de focos incandescentes","Herramientas de carburo de wolframio","Electrodos de soldadura","Munición perforante"],
    fact:"El W tiene el punto de fusión más alto de todos los metales (3422°C) y la menor presión de vapor a altas T."
  },
  {
    z:75, symbol:"Re", name:"Renio",          mass:186.207,
    group:7,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:1.90,
    config:"[Xe] 4f¹⁴ 5d⁵ 6s²",
    uses:["Álabes de turbinas de avión (superaleaciones Ni-Re)","Catalizadores de reformado","Filamentos de instrumentos"],
    fact:"Es uno de los elementos más escasos y el último elemento estable en ser descubierto (1925)."
  },
  {
    z:76, symbol:"Os", name:"Osmio",          mass:190.23,
    group:8,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:2.20,
    config:"[Xe] 4f¹⁴ 5d⁶ 6s²",
    uses:["Plumas estilográficas (punta)","Contactos eléctricos","Catalizadores","Medicina (histórico)"],
    fact:"El osmio es el elemento más denso que existe (22.59 g/cm³), más denso que el oro o el plomo."
  },
  {
    z:77, symbol:"Ir", name:"Iridio",         mass:192.217,
    group:9,  period:6, block:"d", type:"transition-metal",
    state:"solid", en:2.20,
    config:"[Xe] 4f¹⁴ 5d⁷ 6s²",
    uses:["Prototipo del kilogramo (histórico)","Bujías de automóvil","Equipos de navegación","Medicina"],
    fact:"La alta concentración de iridio en la capa K-Pg llevó a Álvarez a proponer la teoría del impacto de asteroide que extinguió a los dinosaurios."
  },
  {
    z:78, symbol:"Pt", name:"Platino",        mass:195.084,
    group:10, period:6, block:"d", type:"transition-metal",
    state:"solid", en:2.28,
    config:"[Xe] 4f¹⁴ 5d⁹ 6s¹",
    uses:["Joyería","Catalizadores automotrices","Medicamentos anticancerígenos (cisplatino)","Electrodos"],
    fact:"⚠️ El platino presenta anomalía: 5d⁹ 6s¹ (no 5d⁸ 6s²) por estabilidad energética."
  },
  {
    z:79, symbol:"Au", name:"Oro",            mass:196.967,
    group:11, period:6, block:"d", type:"transition-metal",
    state:"solid", en:2.54,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    uses:["Joyería y monedas","Electrónica (contactos dorados)","Medicina (nanopartículas)","Estándar monetario"],
    fact:"⚠️ ANOMALÍA: 5d¹⁰ 6s¹ (no 5d⁹ 6s²). El oro es tan inerte que se ha encontrado en perfecto estado en tumbas de 3000 años."
  },
  {
    z:80, symbol:"Hg", name:"Mercurio",       mass:200.592,
    group:12, period:6, block:"d", type:"transition-metal",
    state:"liquid", en:2.00,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    uses:["Termómetros (histórico)","Lámparas fluorescentes","Minería de oro (amalgama)","Baterías de botón"],
    fact:"El mercurio y el bromo son los únicos elementos que son líquidos a temperatura ambiente."
  },
  {
    z:81, symbol:"Tl", name:"Talio",          mass:204.38,
    group:13, period:6, block:"p", type:"post-transition",
    state:"solid", en:1.62,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    uses:["Detectores de infrarrojos","Vidrios ópticos","Medicina nuclear","Semiconductores"],
    fact:"El talio fue usado como veneno en varios crímenes históricos por ser insípido, inodoro e inicialmente difícil de detectar."
  },
  {
    z:82, symbol:"Pb", name:"Plomo",          mass:207.2,
    group:14, period:6, block:"p", type:"post-transition",
    state:"solid", en:2.33,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    uses:["Baterías de ácido-plomo","Blindaje contra radiación","Munición","Soldadura (histórico)"],
    fact:"Los romanos usaban tuberías y vasijas de plomo (plumbum), lo que puede haber contribuido a la caída del Imperio."
  },
  {
    z:83, symbol:"Bi", name:"Bismuto",        mass:208.980,
    group:15, period:6, block:"p", type:"post-transition",
    state:"solid", en:2.02,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    uses:["Pepto-Bismol (antiácido)","Aleaciones de bajo punto de fusión","Pigmentos","Cosmética"],
    fact:"El bismuto es el elemento con el mayor número atómico que tiene isótopos 'cuasi-estables' (Bi-209 decae en 20 cuatrillones de años)."
  },
  {
    z:84, symbol:"Po", name:"Polonio",        mass:209,
    group:16, period:6, block:"p", type:"metalloid",
    state:"solid", en:2.00,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    uses:["Eliminadores de electricidad estática (Po-210)","Investigación nuclear"],
    fact:"Marie Curie nombró el polonio en honor a su país natal, Polonia. Fue usada en el asesinato de Alexander Litvinenko en 2006."
  },
  {
    z:85, symbol:"At", name:"Ástato",         mass:210,
    group:17, period:6, block:"p", type:"halogen",
    state:"solid", en:2.20,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    uses:["Terapia de radiación (At-211)","Investigación"],
    fact:"Es el elemento natural no radiactivo más escaso en la corteza terrestre: se estima que hay solo 28 gramos en toda la Tierra en un momento dado."
  },
  {
    z:86, symbol:"Rn", name:"Radón",          mass:222,
    group:18, period:6, block:"p", type:"noble-gas",
    state:"gas",   en:null,
    config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    uses:["Investigación geológica (trazador)","Antiguos tratamientos de cáncer"],
    fact:"El radón es la segunda causa de cáncer de pulmón en muchos países, ya que se acumula en sótanos al emanar del suelo."
  },

  /* ── PERÍODO 7, s-BLOQUE ── */
  {
    z:87, symbol:"Fr", name:"Francio",        mass:223,
    group:1,  period:7, block:"s", type:"alkali-metal",
    state:"solid", en:0.70,
    config:"[Rn] 7s¹",
    uses:["Investigación científica únicamente"],
    fact:"Es el elemento natural más inestable y raro; en cualquier momento hay menos de 30 gramos de francio en toda la corteza terrestre."
  },
  {
    z:88, symbol:"Ra", name:"Radio",          mass:226,
    group:2,  period:7, block:"s", type:"alkaline-earth",
    state:"solid", en:0.90,
    config:"[Rn] 7s²",
    uses:["Tratamientos de cáncer (Ra-223)","Pintura luminiscente (histórico)","Investigación"],
    fact:"Marie Curie descubrió el radio en 1898. Sus cuadernos de laboratorio son aún tan radiactivos que se guardan en cajas de plomo."
  },

  /* ── ACTÍNIDOS (Período 7, Bloque f) ── */
  {
    z:89,  symbol:"Ac", name:"Actinio",       mass:227,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.10,
    config:"[Rn] 6d¹ 7s²",
    uses:["Medicina nuclear (Ac-225)","Fuentes neutrónicas","Investigación"],
    fact:"Es 150 veces más radiactivo que el radio y brilla en la oscuridad con luz azul-blanca por ionización del aire."
  },
  {
    z:90,  symbol:"Th", name:"Torio",         mass:232.038,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 6d² 7s²",
    uses:["Combustible nuclear (Th-232)","Manto de lámparas Coleman","Electrodos de soldadura TIG","Vidrios ópticos especiales"],
    fact:"El torio es 3 veces más abundante que el uranio y podría ser el combustible nuclear del siglo XXI."
  },
  {
    z:91,  symbol:"Pa", name:"Protactinio",   mass:231.036,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.50,
    config:"[Rn] 5f² 6d¹ 7s²",
    uses:["Investigación nuclear","Datación geológica (Pa-231)"],
    fact:"Su nombre significa 'padre del actinio' porque decae en actinio."
  },
  {
    z:92,  symbol:"U",  name:"Uranio",        mass:238.029,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.38,
    config:"[Rn] 5f³ 6d¹ 7s²",
    uses:["Combustible nuclear (U-235)","Bomba atómica (U-235)","Munición perforante empobrecida","Vidrios uranium"],
    fact:"El U-235 es fisible: un kilogramo puede liberar tanta energía como 1,500 toneladas de carbón si se usa en un reactor."
  },
  {
    z:93,  symbol:"Np", name:"Neptunio",      mass:237,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.36,
    config:"[Rn] 5f⁴ 6d¹ 7s²",
    uses:["Detectores de neutrones","Producción de Pu-238 (para sondas espaciales)"],
    fact:"Es el primer elemento transuránico; fue llamado así porque Neptuno es el planeta que sigue a Urano."
  },
  {
    z:94,  symbol:"Pu", name:"Plutonio",      mass:244,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.28,
    config:"[Rn] 5f⁶ 7s²",
    uses:["Armas nucleares","RTG (fuente de calor en sondas Voyager, Curiosity)","Combustible MOX"],
    fact:"El Pu-238 alimenta las sondas Voyager: una pequeña píldora de plutonio ha generado electricidad durante más de 45 años en el espacio."
  },
  {
    z:95,  symbol:"Am", name:"Americio",      mass:243,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f⁷ 7s²",
    uses:["Detectores de humo (Am-241)","Fuentes gamma portátiles","Investigación"],
    fact:"El Am-241 es el componente activo de la mayoría de detectores de humo del hogar que ionizan el aire."
  },
  {
    z:96,  symbol:"Cm", name:"Curio",         mass:247,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f⁷ 6d¹ 7s²",
    uses:["Generadores termoelécctricos de RTG","Fuente de alfa para APXS","Investigación"],
    fact:"Lleva el nombre de Marie y Pierre Curie. Se usa en el espectrómetro APXS de los rovers de Marte."
  },
  {
    z:97,  symbol:"Bk", name:"Berkelio",      mass:247,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f⁹ 7s²",
    uses:["Investigación nuclear","Producción de elementos más pesados (Cf, Es...)"],
    fact:"Fue sintetizado en Berkeley, California, en 1949; se producen apenas miligramos al año en el mundo."
  },
  {
    z:98,  symbol:"Cf", name:"Californio",    mass:251,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f¹⁰ 7s²",
    uses:["Inicio de reactores nucleares","Tratamiento de tumores","Detectores de metales/minas"],
    fact:"Es uno de los elementos con aplicaciones prácticas más valiosos entre los actínidos sintéticos."
  },
  {
    z:99,  symbol:"Es", name:"Einstenio",     mass:252,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f¹¹ 7s²",
    uses:["Investigación nuclear únicamente"],
    fact:"Se descubrió en los residuos de la primera explosión termonuclear (Ivy Mike, 1952)."
  },
  {
    z:100, symbol:"Fm", name:"Fermio",        mass:257,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f¹² 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Fue nombrado en honor a Enrico Fermi, padre de la primera reacción nuclear artificial."
  },
  {
    z:101, symbol:"Md", name:"Mendelevio",    mass:258,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f¹³ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Fue el primer elemento creado de uno en uno y recibió el nombre de Dmitri Mendeléev."
  },
  {
    z:102, symbol:"No", name:"Nobelio",       mass:259,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:1.30,
    config:"[Rn] 5f¹⁴ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre de Alfred Nobel, inventor de la dinamita y fundador de los premios Nobel."
  },
  {
    z:103, symbol:"Lr", name:"Lawrencio",     mass:266,
    group:null, period:7, block:"f", type:"actinide",
    state:"solid", en:null,
    config:"[Rn] 5f¹⁴ 7s² 7p¹",
    uses:["Investigación científica únicamente"],
    fact:"Fue el último actínido en sintetizarse y lleva el nombre de Ernest O. Lawrence, inventor del ciclotrón."
  },

  /* ── PERÍODO 7, BLOQUE d — ELEMENTOS SUPERPESADOS ── */
  {
    z:104, symbol:"Rf", name:"Rutherfordio",  mass:267,
    group:4,  period:7, block:"d", type:"transition-metal",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d² 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre de Ernest Rutherford, padre del modelo nuclear del átomo."
  },
  {
    z:105, symbol:"Db", name:"Dubnio",        mass:268,
    group:5,  period:7, block:"d", type:"transition-metal",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d³ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"El nombre honra a Dubna, ciudad rusa sede del JINR, uno de los laboratorios que lo sintetizó."
  },
  {
    z:106, symbol:"Sg", name:"Seaborgio",     mass:269,
    group:6,  period:7, block:"d", type:"transition-metal",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d⁴ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Glenn Seaborg es el único científico en cuyo honor se nombró un elemento mientras aún vivía."
  },
  {
    z:107, symbol:"Bh", name:"Bohrio",        mass:270,
    group:7,  period:7, block:"d", type:"transition-metal",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d⁵ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre de Niels Bohr, creador del modelo atómico con órbitas cuantizadas."
  },
  {
    z:108, symbol:"Hs", name:"Hasio",         mass:269,
    group:8,  period:7, block:"d", type:"transition-metal",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d⁶ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Su nombre viene de Hesse (Hassia en latín), el estado alemán donde se encuentra el GSI Helmholtz Centre."
  },
  {
    z:109, symbol:"Mt", name:"Meitnerio",     mass:278,
    group:9,  period:7, block:"d", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d⁷ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Honra a Lise Meitner, física que co-descubrió la fisión nuclear pero fue excluida del Premio Nobel."
  },
  {
    z:110, symbol:"Ds", name:"Darmstadtio",   mass:281,
    group:10, period:7, block:"d", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d⁸ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Fue sintetizado en Darmstadt, Alemania, en el GSI, el mismo lugar donde se descubrieron varios elementos pesados."
  },
  {
    z:111, symbol:"Rg", name:"Roentgenio",    mass:282,
    group:11, period:7, block:"d", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s¹",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre de Wilhelm Röntgen, descubridor de los rayos X en 1895 y primer Nobel de Física."
  },
  {
    z:112, symbol:"Cn", name:"Copernicio",    mass:285,
    group:12, period:7, block:"d", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    uses:["Investigación científica únicamente"],
    fact:"Honra a Nicolás Copérnico, astrónomo que propuso el modelo heliocéntrico del sistema solar."
  },
  {
    z:113, symbol:"Nh", name:"Nihonio",       mass:286,
    group:13, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    uses:["Investigación científica únicamente"],
    fact:"Es el primer elemento en ser descubierto por científicos de Asia (Japón, RIKEN), su nombre viene de 'Nihon' (Japón)."
  },
  {
    z:114, symbol:"Fl", name:"Flerovio",      mass:289,
    group:14, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre del Laboratorio Flerov de Reacciones Nucleares en Dubna, Rusia."
  },
  {
    z:115, symbol:"Mc", name:"Moscovio",      mass:290,
    group:15, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    uses:["Investigación científica únicamente"],
    fact:"Su nombre honra a la región de Moscú, donde se encuentra el Instituto JINR que colaboró en su síntesis."
  },
  {
    z:116, symbol:"Lv", name:"Livermorio",    mass:293,
    group:16, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    uses:["Investigación científica únicamente"],
    fact:"Lleva el nombre de Livermore, California (LLNL), el laboratorio estadounidense que colaboró en su descubrimiento."
  },
  {
    z:117, symbol:"Ts", name:"Teneso",        mass:294,
    group:17, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    uses:["Investigación científica únicamente"],
    fact:"Honra al estado de Tennessee (EE.UU.), hogar de los laboratorios ORNL y Vanderbilt que participaron en su síntesis."
  },
  {
    z:118, symbol:"Og", name:"Oganesón",      mass:294,
    group:18, period:7, block:"p", type:"unknown",
    state:"unknown", en:null,
    config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    uses:["Investigación científica únicamente"],
    fact:"Es el elemento más pesado conocido (Z=118). Lleva el nombre de Yuri Oganessian, pionero de los elementos superheavy."
  }

]; // FIN DEL ARRAY ELEMENTOS

/*
  ╔══════════════════════════════════════════════════════════╗
  ║  PARA AGREGAR UN NUEVO ELEMENTO:                        ║
  ║  1. Agregar un objeto al final del array ELEMENTOS       ║
  ║  2. Seguir exactamente el mismo esquema de campos        ║
  ║  3. Si es lantánido/actínido: group: null                ║
  ║  4. No modificar ningún otro archivo JS                  ║
  ╚══════════════════════════════════════════════════════════╝
*/

/* Función helper: obtener elemento por número atómico */
function getElementByZ(z) {
  return ELEMENTOS.find(e => e.z === z) || null;
}

/* Función helper: obtener elemento por símbolo */
function getElementBySymbol(sym) {
  return ELEMENTOS.find(e => e.symbol === sym) || null;
}

/* Función helper: filtrar por tipo */
function getElementsByType(type) {
  return ELEMENTOS.filter(e => e.type === type);
}
