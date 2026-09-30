/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u08.js
   BIO10-U08 — Evidencias del proceso evolutivo
   ================================================================
   FUENTE (ver también banco-bio10-u08.js):

   Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia E.
   Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018, ISBN
   978-9968-9553-5-5), Unidad VIII / Tema 8 "Evidencias del proceso
   evolutivo" (páginas impresas 285 a 317). Todo el rango se leyó de
   forma completa y directa del PDF del libro, página por página con
   pikepdf + pdftoppm, confirmando visualmente el número de página
   impresa en cada una — no se encontró en esta unidad ningún punto
   dañado (página en blanco, salto de numeración o recuadro vacío),
   así que NO fue necesario recurrir al Programa de Estudio del MEP.

   Contenido real usado, por subtema del libro:
   8.1 Evidencias paleontológicas (pág. 285-287): definición de fósil,
       las 5 formas de fosilización (petrificación, gelificación,
       compresión, inclusión, impresión), datación relativa y
       radiométrica (Carbono-14 hasta 60 000 años, Potasio-Argón usado
       para datar las huellas de Laetoli de Australopithecus
       afarensis, Uranio-Torio, Calcio-41), series progresivas de
       fósiles (el caballo).
   8.2 Cronología de los tres dominios (pág. 288-289): los 2/3/4/5
       reinos históricos (Aristóteles, Haeckel, Whittaker 1969/1978),
       los 3 dominios de Carl Woese (1977): Archaea, Bacteria, Eucarya;
       el árbol de la vida basado en ARNr, LUCA (hipertermófilo,
       ~115°C), primeras células hace 3500 millones de años.
   8.3 Evidencias biogeográficas (pág. 289-291): Darwin y los ñandúes
       de Sudamérica frente a avestruces africanos y emúes australianos;
       los gliptodontes fósiles y los armadillos vivos de Sudamérica
       ("este lazo, según mi teoría, es simplemente la herencia").
   8.4 La sistemática y la filogenia (pág. 291): sistemática,
       taxonomía y filogenia; grupos monofiléticos/polifiléticos.
   8.5 Evidencias anatómicas (pág. 292-293): órganos homólogos (alas de
       pájaro/brazos de hombre) vs. análogos (alas de mosca/paloma,
       evolución convergente); estructuras vestigiales (apéndice,
       muelas del juicio, cóccix, tubérculo de Darwin, huesos pélvicos
       de ballenas y serpientes, "carne de gallina").
   8.6 Evidencias embriológicas (pág. 293-294): Karl von Baer; cola y
       hendiduras branquiales en embriones de peces/ratones/pollos/
       tortugas/humanos; corazón embrionario de 2 a 4 cámaras;
       notocordio reemplazada por columna vertebral.
   8.7 Evidencias bioquímicas y genéticas (pág. 294-295): ATP, creatín
       fosfato (presente también en hemicordados y equinodermos),
       secuenciación de ADN, el chimpancé como pariente más cercano
       (2,5% de diferencia genética).
   8.8 Extinciones (pág. 295-296): competencia y destrucción del
       hábitat como las 2 causas principales; el sapo dorado de
       Monteverde (Tim Flannery, último avistamiento 1989), el milano
       de los pantanos de Florida (dependiente de un caracol), el
       tigre de Tasmania/Thylacine (murió en 1936 en el zoológico de
       Hobart tras una campaña de caza de 1888-1909).
   8.9 La importancia del viaje del Beagle (pág. 297-298): zarpe el 27
       de diciembre de 1831, viaje de 5 años; Darwin en Galápagos del
       17 de setiembre al 15 de octubre de 1835; los pinzones de
       Darwin adaptados a distintos tipos de alimento pero con un
       ancestro común.
   8.10-8.11 Especiación y sus procesos (pág. 298-305): definición de
       especie y especiación; especiación alopátrica (aislamiento
       geográfico, ejemplo de dos poblaciones de caballos separadas
       por un río) y simpátrica (mosca Rhagoletis pomonella y la
       manzana); mecanismos de aislamiento antes del apareamiento
       (geográfico, ecológico —mosquito Anopheles—, de temporada) y
       después del apareamiento (incompatibilidad gamética, falta de
       viabilidad híbrida —borrego/vaca—, infertilidad híbrida
       —caballo/burro—); competencia y radiación adaptativa (pinzones
       de Darwin, caballo/cebra/burro); convergencia evolutiva (vuelo
       en murciélagos/aves/insectos, forma hidrodinámica de
       delfines/tiburones, hormigueros de distintos continentes).

   Mismo patrón de plugin EXACTO que bio10-u01.js/u02.js/u03.js —
   apunta a Storage.updateBiologia10Unit / markBiologia10TopicRead /
   data.biologia10, nunca a las funciones de Química ni de Física.
   Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento).
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio10-u08';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🦴', titulo: 'Evidencias paleontológicas y los tres dominios',
      ideaClave: 'El registro fósil muestra series progresivas de organismos que cambian con el tiempo, y los estudios moleculares agrupan hoy a todos los seres vivos en tres dominios que comparten un antepasado común.',
      explicacion: 'Un <strong>fósil</strong> es cualquier resto o molde de seres vivos de tiempos geológicos pasados (huellas, excrementos, pólenes), generalmente con más de 10 000 años de antigüedad. Existen 5 formas de fosilización: <strong>petrificación</strong> (la materia orgánica se sustituye por minerales), <strong>gelificación</strong> (el organismo queda en hielo), <strong>compresión</strong> (queda cubierto por sedimentos), <strong>inclusión</strong> (atrapado en ámbar o petróleo) e <strong>impresión</strong> (deja su marca en el barro). Para datar un fósil existen métodos de <strong>datación relativa</strong> (según el estrato o los fósiles guía) y de <strong>datación radiométrica</strong>, que se basa en la velocidad de desintegración de isótopos radioactivos: el Carbono-14 sirve hasta 60 000 años, mientras que el Potasio-Argón permite datar rocas volcánicas de más de 10 000 años. Por otra parte, en 1977 Carl Woese propuso la categoría de <strong>Dominio</strong>, agrupando la vida en tres linajes: Archaea, Bacteria y Eucarya, todos descendientes de un antepasado común hipertermófilo llamado <strong>LUCA</strong>.',
      ejemplo: 'Las series progresivas de fósiles del caballo muestran cómo sus estructuras corporales fueron cambiando a lo largo de millones de años, evidenciando que las especies modernas evolucionaron a partir de especies preexistentes.',
      aplicacion: 'El método de Potasio-Argón se usó para datar las huellas de Laetoli, el primer rastro de bipedismo de nuestro linaje, dejado por Australopithecus afarensis hace millones de años — mucho más antiguo de lo que el Carbono-14 (límite de 60 000 años) podría datar.',
      compruebra: '¿Por qué el Carbono-14 solo puede usarse para datar fósiles relativamente recientes (hasta 60 000 años) y no fósiles de millones de años, como las huellas de Laetoli?' },

    { id: 't2', icon: '🌎', titulo: 'Evidencias biogeográficas de la evolución',
      ideaClave: 'Las especies parecidas tienden a vivir en regiones cercanas porque descienden de un antepasado común, no porque el clima o el hábitat las haga parecerse al azar.',
      explicacion: 'La <strong>biogeografía</strong> estudia la distribución de los seres vivos sobre la Tierra y los procesos que la originan y modifican. Darwin observó que zonas adyacentes de Sudamérica están ocupadas por dos especies parecidas de grandes aves no voladoras (los ñandúes grande y chico), y no por avestruces (como en África) o emúes (como en Australia). Se preguntó: ¿por qué especies "íntimamente afines" viven en hábitats vecinos? ¿Y por qué hábitats parecidos, pero en continentes diferentes, están ocupados por especies que no son tan íntimamente afines? Su respuesta fue que existe "un profundo lazo a través del tiempo y el espacio": <strong>las especies parecidas se desarrollan en lugares cercanos porque descienden de ancestros comunes</strong>.',
      ejemplo: 'El enorme parecido entre los gliptodontes fósiles y los armadillos vivos de Sudamérica llevó a Darwin a pensar en una modificación gradual de las especies. Los gliptodontes no dieron origen directamente a los armadillos (no hay una secuencia evolutiva lineal), pero ambos comparten un ancestro común: "este lazo, según mi teoría, es simplemente la herencia", escribió Darwin.',
      aplicacion: 'Cuando un biólogo encuentra en dos continentes distintos especies muy parecidas entre sí que no están emparentadas de cerca, la evidencia biogeográfica lo lleva a sospechar que esas especies evolucionaron de forma independiente a partir de sus propios ancestros locales, y no de un antepasado compartido reciente.',
      compruebra: 'A partir del ejemplo de los gliptodontes y los armadillos, ¿cómo explicarías con tus propias palabras por qué Darwin habló de "herencia" y no de una relación directa entre ambos?' },

    { id: 't3', icon: '🦴', titulo: 'Sistemática, filogenia y evidencias anatómicas',
      ideaClave: 'La sistemática clasifica la diversidad biológica según su historia evolutiva, y las estructuras homólogas y vestigiales del cuerpo son una de las evidencias más visibles de que existe un antepasado común.',
      explicacion: 'La <strong>sistemática</strong> es la ciencia que estudia la diversidad como consecuencia de la historia evolutiva. Dentro de ella, la <strong>taxonomía</strong> es la disciplina que clasifica a los organismos según sus semejanzas, mientras que la <strong>filogenia</strong> estudia las relaciones evolutivas entre ellos (es, literalmente, la "crónica" de su evolución). Respecto a la anatomía, los <strong>órganos homólogos</strong> son los que comparten una misma estructura interna aunque cumplan funciones muy distintas (las alas de un pájaro y los brazos de un hombre comparten el mismo patrón de huesos); en cambio, los <strong>órganos análogos</strong> cumplen la misma función sin compartir un origen cercano (las alas de una mosca y las de una paloma sirven ambas para volar, pero son el resultado de una evolución convergente). Un <strong>órgano vestigial</strong> es aquel cuya función original se perdió durante la evolución.',
      ejemplo: 'El ser humano tiene muchas estructuras vestigiales: el apéndice, los músculos de la nariz y las orejas, las muelas del juicio, el cóccix (remanente de una cola) y el tubérculo de Darwin en la oreja. En otros animales, los huesos pélvicos de las ballenas y las serpientes son vestigios de extremidades que ya no usan para caminar.',
      aplicacion: 'Cuando dos animales muy distintos (como el topo y el grillotopo, un mamífero y un insecto) tienen "manos" excavadoras con forma parecida, hay que revisar si comparten el mismo patrón óseo interno (homología) o si solo llegaron por caminos distintos a una solución similar (analogía) — esa distinción es clave para no clasificar especies de forma artificial.',
      compruebra: '¿Por qué las clasificaciones basadas en órganos análogos (como agrupar un insecto y un ave solo porque ambos vuelan) se consideran artificiales, mientras que las basadas en órganos homólogos se consideran naturales?' },

    { id: 't4', icon: '🧬', titulo: 'Evidencias embriológicas y bioquímicas',
      ideaClave: 'Los embriones de animales muy distintos pasan por etapas sorprendentemente parecidas, y a nivel molecular (ADN, proteínas) existe una continuidad genética que revela ancestros comunes.',
      explicacion: 'La <strong>embriología</strong> estudia el crecimiento, la formación y la morfogénesis de los organismos desde la fecundación del óvulo. El alemán <strong>Karl von Baer</strong> observó en el siglo XIX que animales muy distintos comparten etapas embrionarias semejantes: en etapas tempranas, peces, ratones, pollos, tortugas y seres humanos presentan cola y hendiduras branquiales; solo más adelante el desarrollo de cada especie sigue su propio camino. A nivel bioquímico, la presencia de biomoléculas y macromoléculas similares (como el ATP y el <strong>creatín fosfato</strong>) en organismos muy distintos sugiere que las heredaron de antepasados comunes. Con las modernas técnicas de biología molecular es posible estudiar la evolución al nivel más íntimo: el <strong>ADN</strong>, que contiene la historia evolutiva del organismo porque los genes cambian por mutaciones.',
      ejemplo: 'El corazón de los embriones humanos tiene dos cámaras en las primeras etapas, que se transforman en cuatro; y todos los vertebrados presentan, en algún momento de su desarrollo, una varilla de tejido a lo largo del dorso llamada notocordio, que en el ser humano termina siendo remplazada por la columna vertebral.',
      aplicacion: 'La secuenciación de ADN demostró que el chimpancé es el pariente actual más cercano del ser humano: su ADN difiere del nuestro en solo un 2,5%. El creatín fosfato, presente en los músculos de los vertebrados, también se ha encontrado en hemicordados y en equinodermos (como las estrellas de mar) — la primera evidencia experimental que estableció ese parentesco evolutivo.',
      compruebra: '¿Por qué el hecho de que peces, pollos y seres humanos tengan cola y hendiduras branquiales en sus primeras etapas embrionarias es considerado evidencia de un antepasado común?' },

    { id: 't5', icon: '🚢', titulo: 'Extinciones y el viaje del Beagle',
      ideaClave: 'La competencia y, sobre todo, la destrucción del hábitat son las principales causas de extinción; el viaje del Beagle y la observación de los pinzones de Galápagos fueron claves para que Darwin concibiera la Teoría de la Evolución.',
      explicacion: 'La <strong>extinción</strong> es la desaparición de todos los miembros de una especie o de un grupo de organismos emparentados. Según las investigaciones, dos factores pueden llevar a una especie a la extinción: la <strong>competencia entre especies</strong> y la <strong>destrucción del hábitat</strong>, siendo este último el factor de mayor peso. El <strong>Beagle</strong> fue el barco de la armada real inglesa que zarpó el 27 de diciembre de 1831 en un viaje de reconocimiento geográfico que duró cinco años, recorriendo las costas de Sudamérica, África y Australia; Charles Darwin fue el naturalista de la misión.',
      ejemplo: 'El sapo dorado, nativo de los bosques de Monteverde, Costa Rica, tuvo su último avistamiento en 1989; el biólogo australiano Tim Flannery lo describió como la primera especie extinta principalmente por el calentamiento global. El tigre de Tasmania (Thylacine), el marsupial carnívoro más grande de los tiempos modernos, murió en el zoológico de Hobart el 7 de setiembre de 1936, tras una campaña de caza masiva establecida por el gobierno de Tasmania entre 1888 y 1909.',
      aplicacion: 'Darwin llegó al archipiélago de Galápagos el 17 de setiembre de 1835 y permaneció hasta el 15 de octubre de ese año. Ahí comprendió que cada isla estaba poblada por su propia especie de pinzón, adaptada a un tipo particular de alimentación (semillas de distinto tamaño, frutos, insectos), pero todas procedentes de un ancestro común — una observación clave para la futura Teoría de la Evolución.',
      compruebra: '¿Por qué el milano de los pantanos de Florida, que se alimenta exclusivamente de un tipo de caracol, es un ejemplo de cómo la especialización extrema puede aumentar el riesgo de extinción de una especie?' },

    { id: 't6', icon: '🔀', titulo: 'Especiación',
      ideaClave: 'La especiación es el proceso por el cual una población da origen a nuevas poblaciones aisladas reproductivamente, ya sea por separación geográfica (alopátrica) o dentro de un mismo territorio (simpátrica).',
      explicacion: 'Una <strong>especie</strong> es un grupo de poblaciones naturales cuyos miembros pueden cruzarse entre sí y producir descendencia fértil. La <strong>especiación</strong> es el proceso mediante el cual una población da origen a otra u otras poblaciones aisladas reproductivamente. La <strong>especiación alopátrica</strong> ocurre por aislamiento geográfico (una cordillera, un río o un desierto que separa a una población en dos grupos); la <strong>especiación simpátrica</strong>, en cambio, ocurre dentro del mismo espacio geográfico, generalmente por especialización ecológica. Los mecanismos de aislamiento reproductivo pueden actuar antes del apareamiento (geográfico, ecológico, de temporada) o después del apareamiento (incompatibilidad gamética, falta de viabilidad híbrida, infertilidad híbrida).',
      ejemplo: 'La mosca Rhagoletis pomonella, que originalmente solo se alimentaba del espino americano, comenzó hace más de 100 años a alimentarse también de las manzanas introducidas desde Europa, y hoy muestra diferencias genéticas notables — un caso real de especiación simpátrica en curso. El cruce entre un caballo (64 cromosomas) y un burro (62 cromosomas) produce una mula estéril: un caso de infertilidad híbrida.',
      aplicacion: 'La <strong>radiación adaptativa</strong> de los pinzones de Darwin en Galápagos —donde cada especie desarrolló un pico distinto según su alimentación (semillas, insectos, frutos)— y la <strong>convergencia evolutiva</strong> del vuelo, desarrollado de forma independiente en murciélagos, aves e insectos, muestran las dos caras del proceso evolutivo: unas veces un ancestro común da origen a muchas especies distintas, y otras veces especies sin parentesco cercano llegan a soluciones anatómicas parecidas.',
      compruebra: '¿En qué se diferencia la especiación alopátrica (como la de dos poblaciones de caballos separadas por un río) de la especiación simpátrica (como la de la mosca Rhagoletis pomonella)?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Qué evidencia es?": 10 ejemplos reales del libro
     (fósiles, homología, embriones, ADN, biogeografía) para clasificar
     el TIPO de evidencia evolutiva que representan. Mismo patrón
     exacto de Sim1 de bio10-u03.js, con 5 categorías en vez de 2.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'El fósil de un trilobites, hallado en roca sedimentaria, forma parte de una serie progresiva que muestra cambios corporales a lo largo del tiempo.', correcta: 'paleontologica', explica: 'Es evidencia paleontológica: se basa en el registro fósil y su datación.' },
    { texto: 'Los huesos de la extremidad anterior de un topo, un murciélago y un delfín comparten el mismo patrón óseo interno, aunque cumplen funciones distintas.', correcta: 'anatomica', explica: 'Es evidencia anatómica: son órganos homólogos, con la misma estructura interna.' },
    { texto: 'En etapas tempranas, los embriones de peces, pollos, cerdos y seres humanos presentan cola y hendiduras branquiales.', correcta: 'embriologica', explica: 'Es evidencia embriológica: se basa en el desarrollo comparado de los embriones.' },
    { texto: 'El ADN del chimpancé difiere del ADN humano en solo un 2,5%.', correcta: 'bioquimica', explica: 'Es evidencia bioquímica y genética: se basa en la comparación de secuencias de ADN.' },
    { texto: 'En Sudamérica, zonas adyacentes están ocupadas por dos especies parecidas de ñandúes, y no por avestruces como en África.', correcta: 'biogeografica', explica: 'Es evidencia biogeográfica: se basa en la distribución geográfica de especies afines.' },
    { texto: 'El creatín fosfato, presente en los músculos de los vertebrados, también se encuentra en hemicordados y en equinodermos como las estrellas de mar.', correcta: 'bioquimica', explica: 'Es evidencia bioquímica y genética: compara biomoléculas presentes en distintos organismos.' },
    { texto: 'El apéndice, las muelas del juicio y el cóccix son remanentes de estructuras que tuvieron función en nuestros antepasados.', correcta: 'anatomica', explica: 'Es evidencia anatómica: son órganos vestigiales, otro tipo de evidencia anatómica.' },
    { texto: 'El enorme parecido entre los gliptodontes fósiles y los armadillos que viven hoy en Sudamérica llevó a Darwin a pensar en un antepasado común.', correcta: 'biogeografica', explica: 'Es evidencia biogeográfica: compara la distribución de una especie fósil y una especie viva en la misma región.' },
    { texto: 'El corazón de los embriones humanos tiene dos cámaras en etapas tempranas, igual que otros vertebrados, antes de transformarse en cuatro.', correcta: 'embriologica', explica: 'Es evidencia embriológica: compara el desarrollo del corazón en distintas etapas.' },
    { texto: 'Las series progresivas de fósiles del caballo muestran el cambio de sus estructuras corporales a lo largo de millones de años.', correcta: 'paleontologica', explica: 'Es evidencia paleontológica: se basa en series de fósiles ordenadas en el tiempo.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 10 situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    const opciones = [
      { id: 'paleontologica', label: 'Paleontológica' },
      { id: 'biogeografica', label: 'Biogeográfica' },
      { id: 'anatomica', label: 'Anatómica' },
      { id: 'embriologica', label: 'Embriológica' },
      { id: 'bioquimica', label: 'Bioquímica y genética' }
    ];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:grid;gap:.5rem">
          ${opciones.map(o => `<button class="btn btn-ghost" data-sim1-opcion="${o.id}">${o.label}</button>`).join('')}
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de mecanismos de especiación": 2 fases,
     mismo patrón exacto que Sim2 de bio10-u03.js — (A) explorar
     libremente 6 mecanismos reales de aislamiento reproductivo, y (B)
     un quiz de 2ª fase donde MQC da el caso y el estudiante elige el
     mecanismo.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'geografico', nombre: '⛰️ Aislamiento geográfico', areas: 'Una cordillera, un río o un desierto separa a dos poblaciones (especiación alopátrica)' },
    { id: 'ecologico', nombre: '🦟 Aislamiento ecológico', areas: 'Individuos del mismo territorio viven en hábitats distintos y no tienen oportunidad de cruzarse' },
    { id: 'temporada', nombre: '📅 Aislamiento de temporada', areas: 'Los individuos no pueden aparearse porque tienen estaciones de reproducción muy distintas' },
    { id: 'gametica', nombre: '🧬 Incompatibilidad gamética', areas: 'El esperma de una especie no puede fecundar los óvulos de otra' },
    { id: 'viabilidad', nombre: '💔 Falta de viabilidad híbrida', areas: 'El embrión híbrido de dos especies distintas muere antes de llegar a la madurez' },
    { id: 'infertilidad', nombre: '🐴 Infertilidad híbrida', areas: 'El híbrido llega a la madurez pero es estéril, por tener un número distinto de cromosomas' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Una población de caballos queda dividida en dos grupos cuando el río que los separaba se seca temporalmente y luego vuelve a fluir, aislando a cada grupo en una orilla distinta.', opciones: ['Una cordillera, un río o un desierto separa a dos poblaciones (especiación alopátrica)', 'Los individuos no pueden aparearse porque tienen estaciones de reproducción muy distintas', 'El esperma de una especie no puede fecundar los óvulos de otra', 'El híbrido llega a la madurez pero es estéril, por tener un número distinto de cromosomas'], correcta: 0 },
    { fenomeno: 'Varias especies del mosquito Anopheles, morfológicamente indistinguibles, están aisladas porque unas viven en aguas salobres, otras en aguas dulces y otras en aguas estancadas.', opciones: ['Individuos del mismo territorio viven en hábitats distintos y no tienen oportunidad de cruzarse', 'Una cordillera, un río o un desierto separa a dos poblaciones', 'El embrión híbrido de dos especies distintas muere antes de llegar a la madurez', 'El esperma de una especie no puede fecundar los óvulos de otra'], correcta: 0 },
    { fenomeno: 'Dos poblaciones de la misma región no pueden cruzarse porque una se reproduce solo en una época del año y la otra en una época completamente distinta.', opciones: ['Los individuos no pueden aparearse porque tienen estaciones de reproducción muy distintas', 'Individuos del mismo territorio viven en hábitats distintos', 'El híbrido llega a la madurez pero es estéril', 'Una cordillera separa a dos poblaciones'], correcta: 0 },
    { fenomeno: 'En animales con fecundación interna, los espermatozoides de una especie resultan inviables dentro de los conductos sexuales de las hembras de otra especie.', opciones: ['El esperma de una especie no puede fecundar los óvulos de otra', 'El embrión híbrido muere antes de llegar a la madurez', 'El híbrido llega a la madurez pero es estéril', 'Los individuos tienen estaciones de reproducción distintas'], correcta: 0 },
    { fenomeno: 'Los embriones híbridos resultantes del cruce entre un borrego y una vaca mueren en estados incipientes de su desarrollo.', opciones: ['El embrión híbrido de dos especies distintas muere antes de llegar a la madurez', 'El esperma de una especie no puede fecundar los óvulos de otra', 'El híbrido llega a la madurez pero es estéril', 'Una cordillera separa a dos poblaciones'], correcta: 0 },
    { fenomeno: 'El cruce entre un caballo (Equus caballus, 64 cromosomas) y un burro (Equus asinus, 62 cromosomas) produce una mula que llega a adulta pero no puede reproducirse.', opciones: ['El híbrido llega a la madurez pero es estéril, por tener un número distinto de cromosomas', 'El embrión híbrido muere antes de llegar a la madurez', 'Individuos del mismo territorio viven en hábitats distintos', 'Los individuos tienen estaciones de reproducción distintas'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada mecanismo real de aislamiento reproductivo para ver en qué consiste.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el mecanismo →</button>
      </div>`;
  }
  function renderSim2Quiz() {
    if (_sim2RondaIdx >= RONDAS_SIM2.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste el simulador!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim2">← Volver a Simuladores</button></div>`;
    }
    const r = RONDAS_SIM2[_sim2RondaIdx];
    if (!_sim2OpcionesMezcladas.length) _sim2OpcionesMezcladas = _mezclarConCorrecta(r.opciones, r.correcta);
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Fase 2 — Ronda ${_sim2RondaIdx + 1} de ${RONDAS_SIM2.length}</p>
        <p style="margin-bottom:1rem">${r.fenomeno}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué mecanismo de aislamiento es este?</p>
        <div style="display:grid;gap:.5rem">
          ${_sim2OpcionesMezcladas.opciones.map((op, i) => `<button class="btn btn-ghost" data-sim2q-opcion="${i}">${op}</button>`).join('')}
        </div>
        <p id="sim2q-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }
  function _mezclarConCorrecta(opciones, correctaIdx) {
    const indices = opciones.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
    return { opciones: indices.map(i => opciones[i]), correcta: indices.indexOf(correctaIdx) };
  }

  /* ================================================================
     SIMULADOR 3 — "Radiación adaptativa: los pinzones de Darwin":
     escenario guiado en 2 pasos, con el caso real de los pinzones de
     Galápagos. Mismo patrón exacto que Sim3 de bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: en las islas Galápagos, Darwin observó que <strong>cada isla tiene su propia especie de pinzón</strong>, con picos de forma distinta según el tipo de alimento disponible (semillas de distinto tamaño, frutos, insectos, cactus). Todas estas especies proceden de un ancestro común.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> ¿qué proceso evolutivo explica que, a partir de un ancestro común, hayan surgido varias especies de pinzón adaptadas cada una a un nicho ecológico distinto?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="radiacion">Radiación adaptativa</button>
            <button class="btn btn-ghost" data-sim3-opcion="convergencia">Convergencia evolutiva</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> ¿qué papel jugó el aislamiento geográfico entre las islas del archipiélago en este proceso?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="aislamiento">Permitió que cada población evolucionara de forma independiente y acumulara sus propias diferencias genéticas</button>
            <button class="btn btn-ghost" data-sim3-opcion2="ninguno">No tuvo ningún papel; todas las islas producen exactamente los mismos pinzones</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">La radiación adaptativa ocurre cuando, a partir de una especie común, surgen varias especies distintas, cada una adaptada a un nicho ecológico propio. El aislamiento geográfico entre las islas de Galápagos permitió que cada población de pinzones se adaptara de forma independiente a su propio tipo de alimento, sin dejar de compartir un ancestro común.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/u02.js/u03.js) ─ */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source, { disciplina: 'biologia', grado: 10 }); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','biologia10-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().biologia10[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateBiologia10Unit === 'function') {
      try { Storage.updateBiologia10Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markBiologia10TopicRead === 'function') {
      try { Storage.markBiologia10TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }

  /* ================================================================
     TEORÍA — 6 temas en acordeón. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  function _bloqueTema(etiqueta, texto, color, esPregunta) {
    if (!texto) return '';
    return `
      <div style="margin-bottom:.9rem;padding-left:.7rem;border-left:2px solid ${color}">
        <p style="font-size:.68rem;font-weight:800;letter-spacing:.04em;color:${color};margin:0 0 .25rem">${etiqueta}</p>
        <p style="margin:0;${esPregunta ? 'font-style:italic' : ''}">${texto}</p>
      </div>`;
  }

  function renderTeoria(unit, uData) {
    const leidos = uData.topicsRead || [];
    const total = TEMAS.length;
    const leidosCount = TEMAS.filter(t => leidos.includes(t.id)).length;

    const items = TEMAS.map((t, i) => {
      const isRead = leidos.includes(t.id);
      return `
        <div class="bio10-accordion" data-acc="${i}"
             style="background:var(--bg-card);border:1px solid var(--border);
                    border-left:3px solid ${isRead ? 'var(--green)' : C};
                    border-radius:var(--radius-md);margin-bottom:.6rem;overflow:hidden">
          <button class="bio10-acc-head" data-acc-toggle="${i}"
                  style="width:100%;text-align:left;background:none;border:none;cursor:pointer;
                         padding:.85rem 1rem;display:flex;align-items:center;gap:.6rem;
                         color:var(--text-primary);font-family:var(--font-body);font-size:.95rem;font-weight:700">
            <span style="font-size:1.2rem">${t.icon}</span>
            <span style="flex:1">${i + 1}. ${t.titulo}</span>
            <span style="font-size:.72rem;color:${isRead ? 'var(--green)' : 'var(--text-muted)'}">
              ${isRead ? '✓ leído' : ''}
            </span>
            <span class="bio10-acc-caret" style="transition:transform .25s;color:var(--text-muted)">▾</span>
          </button>
          <div class="bio10-acc-body" data-acc-body="${i}"
               style="display:none;padding:0 1rem 1rem;color:var(--text-secondary);line-height:1.6">
            ${_bloqueTema('💡 IDEA CLAVE', t.ideaClave, 'var(--xp-gold,#F9FF4D)')}
            ${_bloqueTema('📘 EXPLICACIÓN', t.explicacion, C)}
            ${_bloqueTema('🔎 EJEMPLO', t.ejemplo, 'var(--cyan)')}
            ${_bloqueTema('🌐 APLICACIÓN REAL', t.aplicacion, 'var(--violet)')}
            ${_bloqueTema('❓ COMPRUEBA', t.compruebra, 'var(--text-muted)', true)}
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" data-read="${i}" data-tema="${t.id}" ${isRead ? 'disabled' : ''}>
                ${isRead ? '✓ Tema leído' : '📖 Marcar como leído (+15 XP)'}
              </button>
              ${isRead ? '<span style="font-size:.78rem;color:var(--green)">¡Bien! XP otorgado.</span>' : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="bio10-teoria" style="animation:pageIn .4s ease">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <p style="color:var(--text-secondary);font-size:.85rem;margin:0">Progreso: ${leidosCount}/${total} temas leídos</p>
        </div>
        ${items}
      </div>`;
  }
  function bindTeoria(unit, uData) {
    document.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-acc-toggle');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const caret = btn.querySelector('.bio10-acc-caret');
        if (body) {
          const abierto = body.style.display !== 'none';
          body.style.display = abierto ? 'none' : 'block';
          if (caret) caret.style.transform = abierto ? '' : 'rotate(180deg)';
        }
      });
    });
    document.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', () => {
        const temaId = btn.getAttribute('data-tema');
        const yaLeidoAntes = (loadUnitData().topicsRead || []).includes(temaId);
        markRead(temaId);
        if (!yaLeidoAntes) awardXP('topic-read');
        const fresh = loadUnitData();
        const container = document.querySelector('.bio10-teoria').parentElement;
        container.innerHTML = renderTeoria(unit, fresh);
        bindTeoria(unit, fresh);
        const i = btn.closest('[data-acc]').getAttribute('data-acc');
        const body = document.querySelector(`[data-acc-body="${i}"]`);
        const head = document.querySelector(`[data-acc-toggle="${i}"] .bio10-acc-caret`);
        if (body) { body.style.display = 'block'; if (head) head.style.transform = 'rotate(180deg)'; }
      });
    });
  }

  /* ================================================================
     SIMULADORES — 3 experiencias. Mismo patrón exacto que
     bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  function markSimDone(simId) {
    const uData = loadUnitData();
    const done = Array.isArray(uData.simsDone) ? uData.simsDone.slice() : [];
    if (!done.includes(simId)) {
      done.push(simId);
      patchUnit({ simsDone: done });
      awardXP('simulator-done');
    }
  }
  let _simActivo = null;
  let _sim1Idx = 0;

  function renderSimuladores(unit, uData) {
    if (_simActivo === 'sim1') return `<div class="sim-grid">${renderSim1(_sim1Idx)}</div>`;
    if (_simActivo === 'sim2') return `<div class="sim-grid">${renderSim2()}</div>`;
    if (_simActivo === 'sim3') return `<div class="sim-grid">${renderSim3()}</div>`;

    const hechos = uData.simsDone || [];
    const metas = [
      { id: 'sim1', titulo: '🦴 ¿Qué evidencia es?', desc: '10 ejemplos reales (fósiles, homología, embriones, ADN, biogeografía) para clasificar el tipo de evidencia evolutiva.' },
      { id: 'sim2', titulo: '🧬 Explorador de mecanismos de especiación', desc: 'Explorá 6 mecanismos reales de aislamiento reproductivo y después probá identificando vos mismo el mecanismo, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '🐦 Radiación adaptativa: los pinzones de Darwin', desc: 'Un escenario guiado paso a paso con el caso real de los pinzones de Galápagos.' }
    ];
    return `
      <div class="sim-grid" style="display:grid;gap:1rem">
        ${metas.map(s => `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem">
            <h3 style="margin:0 0 .4rem">${hechos.includes(s.id) ? '✅' : ''} ${s.titulo}</h3>
            <p style="color:var(--text-secondary);font-size:.88rem">${s.desc}</p>
            <button class="btn btn-primary btn-sm" data-sim-abrir="${s.id}">${hechos.includes(s.id) ? 'Repasar' : 'Comenzar'}</button>
          </div>
        `).join('')}
      </div>`;
  }

  function _rerenderSimTab(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderSimuladores(unit, loadUnitData()); bindSimuladores(unit, loadUnitData()); }
  }

  function bindSimuladores(unit, uData) {
    document.querySelectorAll('[data-sim-abrir]').forEach(btn => {
      btn.addEventListener('click', () => {
        _simActivo = btn.getAttribute('data-sim-abrir');
        _sim1Idx = 0; _sim2Fase = 'explorar'; _sim2RondaIdx = 0; _sim2OpcionesMezcladas = []; _sim3Paso = 0;
        _rerenderSimTab(unit);
      });
    });
    document.querySelectorAll('[data-sim-cerrar]').forEach(btn => {
      btn.addEventListener('click', () => {
        markSimDone(btn.getAttribute('data-sim-cerrar'));
        _simActivo = null;
        _rerenderSimTab(unit);
      });
    });

    document.querySelectorAll('[data-sim1-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegido = btn.getAttribute('data-sim1-opcion');
        const s = SITUACIONES_SIM1[_sim1Idx];
        const fb = document.getElementById('sim1-feedback');
        if (fb) {
          const ok = elegido === s.correcta;
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = (ok ? '✅ ' : '💡 ') + s.explica;
        }
        setTimeout(() => {
          _sim1Idx++;
          if (_sim1Idx >= SITUACIONES_SIM1.length) markSimDone('sim1');
          _rerenderSimTab(unit);
        }, 1400);
      });
    });

    document.querySelectorAll('[data-sim2-el]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = ELEMENTOS_SIM2.find(x => x.id === btn.getAttribute('data-sim2-el'));
        const fb = document.getElementById('sim2-feedback');
        if (fb && el) fb.innerHTML = `<strong>${el.nombre}</strong> → ${el.areas}`;
      });
    });
    const irQuiz = document.getElementById('sim2-ir-quiz');
    if (irQuiz) irQuiz.addEventListener('click', () => { _sim2Fase = 'quiz'; _sim2RondaIdx = 0; _sim2OpcionesMezcladas = []; _rerenderSimTab(unit); });

    document.querySelectorAll('[data-sim2q-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-sim2q-opcion'), 10);
        const fb = document.getElementById('sim2q-feedback');
        const ok = idx === _sim2OpcionesMezcladas.correcta;
        if (fb) {
          fb.style.color = ok ? 'var(--green)' : 'var(--gold)';
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El mecanismo correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
        }
        setTimeout(() => {
          _sim2RondaIdx++;
          _sim2OpcionesMezcladas = [];
          if (_sim2RondaIdx >= RONDAS_SIM2.length) markSimDone('sim2');
          _rerenderSimTab(unit);
        }, 1300);
      });
    });

    const sim3Sig = document.getElementById('sim3-siguiente');
    if (sim3Sig) sim3Sig.addEventListener('click', () => { _sim3Paso = 1; _rerenderSimTab(unit); });
    document.querySelectorAll('[data-sim3-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback');
        const correcta = btn.getAttribute('data-sim3-opcion') === 'radiacion';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: es radiación adaptativa — a partir de una especie común surgen varias especies adaptadas a distintos nichos.'
            : '💡 En realidad es radiación adaptativa: la convergencia evolutiva ocurre entre especies NO emparentadas, no a partir de un ancestro común reciente.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'aislamiento';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: el aislamiento geográfico entre islas permitió que cada población evolucionara por separado.'
            : '💡 En realidad sí tuvo un papel clave: el aislamiento entre islas permitió que cada población acumulara sus propias diferencias genéticas.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de la evolución": 5 escenarios reales, cada
     uno pidiendo identificar el TIPO de evidencia evolutiva, con
     pistas que orientan sin revelar la respuesta. Mismo patrón exacto
     que bio10-u01.js/u02.js/u03.js: SIN XP al solo iniciar un nivel,
     y game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Las series progresivas de fósiles del caballo muestran cómo sus estructuras corporales cambiaron a lo largo de millones de años.',
      pista: 'Pensá en el registro fósil, no en el ADN ni en los embriones.',
      correcta: 'Evidencia paleontológica', opciones: ['Evidencia paleontológica', 'Evidencia biogeográfica', 'Evidencia embriológica', 'Evidencia bioquímica y genética'] },
    { id: 'nivel2', escenario: 'En Sudamérica, zonas adyacentes están ocupadas por dos especies parecidas de ñandúes, y no por avestruces como en África.',
      pista: 'Pensá en dónde viven las especies parecidas, no en su anatomía interna.',
      correcta: 'Evidencia biogeográfica', opciones: ['Evidencia biogeográfica', 'Evidencia paleontológica', 'Evidencia anatómica', 'Evidencia embriológica'] },
    { id: 'nivel3', escenario: 'Las alas de un pájaro y los brazos de un ser humano comparten el mismo patrón de huesos internos, aunque cumplen funciones muy distintas.',
      pista: 'Pensá en la estructura interna del cuerpo, no en dónde vive cada especie.',
      correcta: 'Evidencia anatómica', opciones: ['Evidencia anatómica', 'Evidencia biogeográfica', 'Evidencia bioquímica y genética', 'Evidencia paleontológica'] },
    { id: 'nivel4', escenario: 'En etapas tempranas, los embriones de peces, pollos y seres humanos presentan cola y hendiduras branquiales.',
      pista: 'Pensá en el desarrollo antes del nacimiento, no en los fósiles.',
      correcta: 'Evidencia embriológica', opciones: ['Evidencia embriológica', 'Evidencia anatómica', 'Evidencia paleontológica', 'Evidencia biogeográfica'] },
    { id: 'nivel5', escenario: 'El ADN del chimpancé difiere del ADN humano en solo un 2,5%.',
      pista: 'Pensá en la comparación de moléculas genéticas, no en dónde viven las especies.',
      correcta: 'Evidencia bioquímica y genética', opciones: ['Evidencia bioquímica y genética', 'Evidencia embriológica', 'Evidencia biogeográfica', 'Evidencia anatómica'] }
  ];
  let _juegoIdx = null;
  let _juegoOpcionesMezcladas = [];
  let _juegoFeedback = null;

  function renderJuego(unit, uData) {
    const nivelesHechos = uData.gameLevels || [];
    if (_juegoIdx === null) {
      const primerPendiente = NIVELES_JUEGO.findIndex(n => !nivelesHechos.includes(n.id));
      _juegoIdx = primerPendiente === -1 ? NIVELES_JUEGO.length : primerPendiente;
    }
    if (_juegoIdx >= NIVELES_JUEGO.length) {
      return `
        <div class="juego-panel" style="text-align:center">
          <h3>✅ ¡Completaste los ${NIVELES_JUEGO.length} escenarios!</h3>
          <p style="color:var(--text-secondary);font-size:.85rem">Ya resolviste todo el juego de esta unidad.</p>
        </div>`;
    }
    const n = NIVELES_JUEGO[_juegoIdx];
    if (!_juegoOpcionesMezcladas.length) _juegoOpcionesMezcladas = _mezclar(n.opciones);
    return `
      <div class="juego-panel">
        <h3 style="margin:0 0 .3rem">🔍 Detective de la Evolución</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué tipo de evidencia evolutiva es esta?</p>
        <div style="display:grid;gap:.5rem">
          ${_juegoOpcionesMezcladas.map(op => `<button class="btn btn-ghost" data-juego-opcion="${op}">${op}</button>`).join('')}
        </div>
        ${_juegoFeedback ? `<p style="margin-top:.9rem;font-size:.85rem;color:${_juegoFeedback.correcto ? 'var(--green)' : 'var(--gold)'}">${_juegoFeedback.texto}</p>` : ''}
      </div>`;
  }
  function _mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function bindJuego(unit, uData) {
    document.querySelectorAll('[data-juego-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const elegida = btn.getAttribute('data-juego-opcion');
        const n = NIVELES_JUEGO[_juegoIdx];
        const acierto = elegida === n.correcta;
        if (acierto) {
          const u = loadUnitData();
          const done = Array.isArray(u.gameLevels) ? u.gameLevels.slice() : [];
          const yaResuelto = done.includes(n.id);
          if (!yaResuelto) done.push(n.id);
          patchUnit({ gameLevels: done, gameScore: done.length });
          if (!yaResuelto) awardXP(done.length >= NIVELES_JUEGO.length ? 'game-won' : 'game-played');
          _juegoFeedback = { texto: `✅ ¡Correcto! Es ${n.correcta}.`, correcto: true };
          setTimeout(() => { _juegoIdx++; _juegoOpcionesMezcladas = []; _juegoFeedback = null; _rerenderJuego(unit); }, 1500);
        } else {
          _juegoFeedback = { texto: '💡 No es esa. Volvé a leer la pista y probá otra opción.', correcto: false };
        }
        _rerenderJuego(unit);
      });
    });
  }
  function _rerenderJuego(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderJuego(unit, loadUnitData()); bindJuego(unit, loadUnitData()); }
  }

  /* ================================================================
     EXAMEN — banco real (js/data/banco-bio10-u08.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/u02.js/u03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U08 !== 'undefined') ? PREGUNTAS_BIO10_U08 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U08</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 20 al azar.</p>
        <button class="btn btn-primary" id="bio10-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div id="bio10-exam-opts" style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
        <div id="bio10-exam-fb" style="margin-top:1rem"></div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('bio10-iniciar-examen');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const banco = _bancoDisponible().slice();
        for (let i = banco.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [banco[i], banco[j]] = [banco[j], banco[i]]; }
        const seleccionadas = banco.slice(0, Math.min(20, banco.length));
        const preguntasMezcladas = seleccionadas.map(q => {
          const indices = q.opciones.map((_, idx) => idx);
          for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
          return {
            ...q,
            opciones: indices.map(idx => q.opciones[idx]),
            correcta: indices.indexOf(q.correcta)
          };
        });
        _examEnCurso = { preguntas: preguntasMezcladas, i: 0, correctas: 0 };
        _rerenderExamen(unit);
      });
    }
    document.querySelectorAll('[data-opcion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-opcion'), 10);
        const q = _examEnCurso.preguntas[_examEnCurso.i];
        const ok = idx === q.correcta;
        if (ok) _examEnCurso.correctas++;

        const opts = document.getElementById('bio10-exam-opts');
        opts.querySelectorAll('[data-opcion]').forEach(b => {
          const k = parseInt(b.getAttribute('data-opcion'), 10);
          b.disabled = true;
          if (k === q.correcta) b.style.borderColor = 'var(--green)';
          if (k === idx && !ok) b.style.borderColor = 'var(--red)';
        });

        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react(ok ? 'topic-read' : 'answer-wrong'); } catch (e) {} }

        const esUltima = _examEnCurso.i >= _examEnCurso.preguntas.length - 1;
        document.getElementById('bio10-exam-fb').innerHTML = `
          <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                      border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
            <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
            <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion || ''}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="bio10-exam-next" style="margin-top:.8rem">
            ${esUltima ? 'Finalizar examen' : 'Siguiente pregunta →'}
          </button>`;
        document.getElementById('bio10-exam-next').addEventListener('click', () => {
          _examEnCurso.i++;
          if (_examEnCurso.i >= _examEnCurso.preguntas.length) _finalizarExamen(unit);
          else _rerenderExamen(unit);
        });
      });
    });
  }
  function _rerenderExamen(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderExamen(unit, loadUnitData()); bindExamen(unit, loadUnitData()); }
  }
  function _finalizarExamen(unit) {
    const score = Math.round((_examEnCurso.correctas / _examEnCurso.preguntas.length) * 100);
    const passed = score >= (unit.exam && unit.exam.pass || 70);
    const u = loadUnitData();
    const prevBest = u.examBest || 0;
    const yaOtorgadoAntes = !!u.examXpAwarded;
    patchUnit({
      examBest: Math.max(prevBest, score),
      examAttempts: (u.examAttempts || 0) + 1,
      examXpAwarded: u.examXpAwarded || passed
    });
    if (passed && !yaOtorgadoAntes) awardXP('exam-done');
    _examEnCurso = null;
    const tc = document.getElementById('tab-content');
    if (tc) {
      tc.innerHTML = `
        <div style="max-width:520px;text-align:center">
          <h3>${passed ? '🎉 ¡Aprobado!' : '📚 Seguí practicando'}</h3>
          <p style="font-size:1.6rem;font-weight:700">${score}%</p>
          <button class="btn btn-primary" id="bio10-volver-examen">Volver</button>
        </div>`;
      const b = document.getElementById('bio10-volver-examen');
      if (b) b.addEventListener('click', () => _rerenderExamen(unit));
    }
  }

  /* ================================================================
     MISIÓN FINAL — "Bajo la lupa: los pinzones de Darwin en las islas
     Galápagos" (mismo patrón exacto que bio10-u01.js/u02.js/u03.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía missionDone).
     Caso real del libro (apartado 8.9), con fechas reales del viaje
     del Beagle y cita textual de Darwin.
     ================================================================ */
  const MISION_A_OPCIONES = [
    'Cada isla tiene su propia especie de pinzón, adaptada a un tipo particular de alimento',
    'Todas las especies de pinzón proceden de un ancestro común',
    'Los pinzones de Galápagos son idénticos a los avestruces africanos',
    'Los pinzones no muestran ninguna variación entre las islas'
  ];
  const MISION_A_CORRECTAS = [
    'Cada isla tiene su propia especie de pinzón, adaptada a un tipo particular de alimento',
    'Todas las especies de pinzón proceden de un ancestro común'
  ];
  const MISION_B_OPCIONES = [
    'Del 17 de setiembre al 15 de octubre de 1835',
    'Cinco años completos',
    'Un solo día',
    'Del 27 de diciembre de 1831 al 15 de octubre de 1835'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Radiación adaptativa a partir de un ancestro común',
    'Extinción total de la especie original',
    'Aislamiento reproductivo sin ningún cambio genético',
    'Convergencia evolutiva entre especies no emparentadas'
  ];
  const MISION_C_CORRECTA = 0;
  const MISION_D_MIN = 30, MISION_D_MAX = 250;

  let _misionA = [];
  let _misionB = null;
  let _misionC = null;
  let _misionD = '';

  function _misionValida() {
    const aOk = _misionA.length === MISION_A_CORRECTAS.length && MISION_A_CORRECTAS.every(x => _misionA.includes(x));
    const bOk = _misionB === MISION_B_CORRECTA;
    const cOk = _misionC === MISION_C_CORRECTA;
    const dOk = _misionD.trim().length >= MISION_D_MIN && _misionD.trim().length <= MISION_D_MAX;
    return aOk && bOk && cOk && dOk;
  }

  function renderMision(unit, uData) {
    if (uData.missionDone) {
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: los pinzones de Darwin en las islas Galápagos".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🐦 Misión: Bajo la lupa — los pinzones de Darwin en las islas Galápagos</h3>
        <p style="color:var(--text-secondary)">Texto base: "Darwin llegó al archipiélago de Galápagos el 17 de setiembre de 1835 y permaneció hasta el 15 de octubre del mismo año. Pronto comprendió el significado de sus observaciones: cada isla está poblada de especies de pinzón que ocupan un nicho ecológico distinto, pues cada una se ha adaptado a una forma particular de alimentación (semillas de distinto tamaño, frutos, insectos, etc.), pero todas proceden de un ancestro común. 'Cuando veo estas islas próximas entre sí y habitadas por una escasa muestra de animales entre los que se encuentran estos pájaros de estructura muy semejante y que ocupan el mismo lugar en la naturaleza, debo sospechar que sólo son variedades (...) Si hay alguna base, por pequeña que sea, para estas afirmaciones, tales hechos echarían por tierra la estabilidad de las especies', escribió Darwin."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué observó Darwin sobre los pinzones, según el texto? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. ¿Cuánto tiempo permaneció Darwin en las islas Galápagos, según el texto?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Qué proceso evolutivo explica que cada isla tenga pinzones con picos distintos adaptados a su alimento, según el texto?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. ¿Por qué la frase de Darwin "tales hechos echarían por tierra la estabilidad de las especies" representa un quiebre respecto a las ideas de su época?</p>
          <textarea id="mision-d" rows="3" maxlength="${MISION_D_MAX}" placeholder="Escribí tu respuesta (mínimo ${MISION_D_MIN} caracteres)..." style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.6rem;font-family:inherit;font-size:.88rem">${_misionD}</textarea>
          <p style="font-size:.72rem;color:${dLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'};margin:.3rem 0 0">${dLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</p>
        </div>

        <button class="btn btn-primary" id="bio10-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
        <p id="mision-feedback" style="margin-top:.6rem;font-size:.85rem;color:var(--gold)"></p>
      </div>`;
  }

  function bindMision(unit, uData) {
    document.querySelectorAll('[data-mision-a]').forEach(chk => {
      chk.addEventListener('change', () => {
        const val = chk.getAttribute('data-mision-a');
        if (chk.checked) { if (!_misionA.includes(val)) _misionA.push(val); }
        else { _misionA = _misionA.filter(x => x !== val); }
        _rerenderMision(unit);
      });
    });
    document.querySelectorAll('[data-mision-b]').forEach(rad => {
      rad.addEventListener('change', () => { _misionB = parseInt(rad.getAttribute('data-mision-b'), 10); _rerenderMision(unit); });
    });
    document.querySelectorAll('[data-mision-c]').forEach(rad => {
      rad.addEventListener('change', () => { _misionC = parseInt(rad.getAttribute('data-mision-c'), 10); _rerenderMision(unit); });
    });
    const dArea = document.getElementById('mision-d');
    if (dArea) {
      dArea.addEventListener('input', () => {
        _misionD = dArea.value;
        const contador = dArea.parentElement.querySelector('p');
        const len = _misionD.trim().length;
        if (contador) {
          contador.textContent = `${len}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})`;
          contador.style.color = len >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)';
        }
        const btn = document.getElementById('bio10-entregar-mision');
        if (btn) {
          const valido = _misionValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    }
    const btn = document.getElementById('bio10-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte de la misión.';
          return;
        }
        const _misionYaOtorgada = !!loadUnitData().missionDone;
        patchUnit({ missionDone: true });
        if (!_misionYaOtorgada) awardXP('biologia10-mission-done');
        const tc = document.getElementById('tab-content');
        if (tc) tc.innerHTML = renderMision(unit, loadUnitData());
      });
    }
  }
  function _rerenderMision(unit) {
    const tc = document.getElementById('tab-content');
    if (tc) { tc.innerHTML = renderMision(unit, loadUnitData()); bindMision(unit, loadUnitData()); }
  }

  /* ── Registro en el sistema de pestañas (mismo mecanismo exacto que
     bio10-u01.js/u02.js/u03.js — ver biologia10.js) ────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
