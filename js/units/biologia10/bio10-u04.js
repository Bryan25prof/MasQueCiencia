/* ================================================================
   MÁSQUECIENCIA — js/units/biologia10/bio10-u04.js
   BIO10-U04 — Las poblaciones biológicas
   ================================================================
   FUENTES (combinadas, ver también banco-bio10-u04.js):

   (a) Libro fuente "Biología 10º: Un Enfoque Práctico" (Licda. Kathia
       E. Hernández Camacho, Ed. Didáctica Multimedia, 6.ª ed. 2018,
       ISBN 978-9968-9553-5-5), Unidad IV / Tema 4 "Las poblaciones
       biológicas" (páginas impresas 111-133). Se pudo leer de forma
       íntegra la inmensa mayoría del rango: el encabezado del Tema 4
       y sus preguntas guía (lapas rojas, pág. 111), 4.1 "Propiedades
       de las poblaciones" completo — tamaño y densidad poblacional
       con captura y recaptura (dantas del cerro Dantas, pág.
       111-112), natalidad, mortalidad y migraciones con datos reales
       de Costa Rica 2016 y el ejemplo de los pingüinos de la
       Patagonia y la paloma torcaza (pág. 113-114), potencial
       biótico con el cálculo de Darwin sobre los elefantes y el
       ejemplo de las moscas, las estrategias reproductivas r y K, y
       la resistencia ambiental con sus factores bióticos y
       abióticos (pág. 115-116), los patrones de crecimiento
       exponencial y logístico y la capacidad de carga ambiental con
       la gráfica de Gallardo (2012) (pág. 116-117), la abundancia y
       escasez y los tres patrones de distribución —agrupada,
       uniforme y aleatoria— con los ejemplos de los pingüinos
       emperadores y los pinos alelopáticos (pág. 118-119); 4.2
       "Impacto ambiental de la población humana en otras poblaciones
       biológicas", con las problemáticas de pobreza, suministro de
       alimentos (FAO) y salud pública (pág. 119) y el liderazgo de
       Costa Rica en esperanza de vida según la CEPAL (pág. 121); 4.3
       "Cálculo de la tasa de crecimiento anual y absoluta de una
       población", con sus fórmulas y los ejemplos reales de Escazú y
       Desamparados (pág. 121-122); Actividad 1 "Las propiedades de
       las poblaciones biológicas", con la tabla real de densidad de
       5 países (pág. 123) y el ejercicio real del santuario de osos
       perezosos FINMAC en Pueblo Nuevo de Guácimo (pág. 125);
       Actividad 2 "Poblaciones humanas y sostenibilidad", con la
       tabla real de necesidades humanas y prioridad (pág. 129) y el
       ejercicio real de la tasa de crecimiento anual de Heredia
       (pág. 131); la Guía de repaso completa de 21 preguntas (pág.
       132); y la Evaluación del tema, con el caso real y citado
       textualmente del derrumbe demográfico de la Isla de Pascua
       (pág. 133).

       El archivo del libro presentó daño real y puntual en dos
       páginas de este rango: la página 120 aparece casi
       completamente en blanco (solo un fragmento final sobre la
       esperanza de vida es legible) y el recuadro de encabezado de
       la Actividad 2 (número, título e indicadores 1-3, en la
       página 128) aparece vacío, dejando visible solo el indicador
       4, los recursos y el tiempo requerido. En ambos casos el resto
       de páginas del mismo tramo (119, 121 y 129-131) sí se pudieron
       leer de forma íntegra y aportan datos reales suficientes para
       cubrir el contenido de esas secciones sin necesidad de
       inventar nada.

   (b) Programa de Estudio de Biología del MEP ("Educar para una Nueva
       Ciudadanía", Educación Diversificada, Décimo año), Eje temático
       I, criterios de evaluación y situaciones de aprendizaje sobre
       crecimiento poblacional, potencial biótico, resistencia
       ambiental, abundancia y distribución de poblaciones, e impacto
       ambiental de la población humana (páginas 39-41 del programa
       oficial) — usado únicamente como apoyo de contexto para
       organizar los temas de esta unidad tal como los agrupa el MEP;
       ningún dato, cifra ni ejemplo de esta unidad proviene del
       programa: todos vienen del libro fuente.

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
  const UNIT_ID = 'bio10-u04';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🔢', titulo: 'Tamaño y densidad poblacional',
      ideaClave: 'El tamaño de una población es su cantidad de individuos; la densidad es esa cantidad por unidad de espacio. Ambos se estiman con técnicas de muestreo como la captura y recaptura.',
      explicacion: 'El <strong>tamaño de una población</strong> corresponde a la cantidad de individuos de una misma especie en un hábitat determinado. La <strong>densidad poblacional</strong> es el número de individuos en relación con alguna unidad de espacio (D = número de individuos / superficie). Para plantas se usan <strong>transectos cuadrados</strong> distribuidos al azar. Para animales que se mueven se usa la técnica de <strong>captura y recaptura</strong>: se captura y marca una muestra, se libera para que se mezcle con el resto, y luego se recaptura una segunda muestra para contar cuántos individuos marcados aparecen. Con esos datos se despeja la fórmula N = (n × M) / x, donde M es el número de marcados en la primera captura, n es el total de individuos de la segunda captura y x es el número de marcados encontrados en esa segunda captura.',
      ejemplo: 'Para estimar la población de dantas del cerro Dantas, se capturan y marcan 50 dantas, que se liberan. Después se capturan otras 70 dantas, de las cuales 15 están marcadas. Aplicando la fórmula: N = (70 × 50) / 15 = 233 dantas, aproximadamente.',
      aplicacion: 'La densidad poblacional de Costa Rica en 2016 (4 909 000 habitantes / 51 100 km²) es de 96 habitantes/km². El mismo método de captura y recaptura se aplicó a un santuario real de osos perezosos (FINMAC, en Pueblo Nuevo de Guácimo): se marcaron 58 osos, y en una segunda captura de 77 individuos, 10 estaban marcados.',
      compruebra: 'Con los datos del santuario FINMAC (M=58, n=77, x=10), ¿cuál sería el tamaño estimado de esa población de perezosos?' },

    { id: 't2', icon: '👶', titulo: 'Natalidad, mortalidad y migraciones',
      ideaClave: 'La natalidad, la mortalidad y las migraciones son las tres propiedades que hacen que el tamaño de una población cambie con el tiempo.',
      explicacion: 'La <strong>natalidad</strong> es la aparición de nuevos organismos en una población (por nacimiento, eclosión, germinación o división); su tasa bruta se calcula como n = (B/P) × 1000, donde B es el número de nacimientos en un año y P la población total. La <strong>mortalidad</strong> es la desaparición por muerte de los individuos; su tasa bruta es m = (F/P) × 1000, donde F es el número de decesos en un año. Las <strong>migraciones</strong> son los desplazamientos de toda o parte de una población de un ecosistema a otro; se distinguen las <strong>inmigraciones</strong> (aumentan el tamaño de la población) de las <strong>emigraciones</strong> (lo disminuyen), y suelen ser estacionales.',
      ejemplo: 'En 2016, Costa Rica tuvo aproximadamente 72 000 nacimientos con una población de 4 909 000 habitantes: n = (72 000/4 909 000) × 1000 = 14,67 nacimientos por cada 1000 habitantes. Ese mismo año hubo 22 680 fallecimientos: m = (22 680/4 909 000) × 1000 = 4,62 fallecimientos por cada 1000 habitantes.',
      aplicacion: 'Los pingüinos (Spheniscus magallanicus) llegan a las costas de la Patagonia a nidificar a fines del invierno, y a mediados del otoño se produce una gran emigración que deja las costas vacías — por eso el momento del muestreo puede cambiar radicalmente la estimación del tamaño poblacional. La paloma torcaza (Zenaida auriculata) empolla dos huevos a la vez, pero su natalidad real puede ser de uno o cero si se pierde algún huevo o un predador se lo come.',
      compruebra: 'Si una población recibe más inmigrantes que emigrantes en un año, ¿qué le ocurre a su tamaño?' },

    { id: 't3', icon: '📈', titulo: 'Potencial biótico, estrategias r/K y resistencia ambiental',
      ideaClave: 'El potencial biótico es la máxima capacidad reproductiva de una población en condiciones óptimas; la resistencia ambiental es lo que la limita en la práctica.',
      explicacion: 'El <strong>potencial biótico</strong> (pb = n − m) es la máxima capacidad de una población para reproducirse si no existieran muertes, desplazamientos ni carencias que alteraran su natalidad. Se han descrito dos <strong>estrategias reproductivas</strong>: la <strong>pródiga (r)</strong>, que produce muchos descendientes aunque una alta proporción no sobreviva (exitosa en ciclos de vida cortos y crecimiento rápido), y la <strong>prudente (K)</strong>, que produce pocos descendientes con alta proporción de sobrevivientes (típica de organismos de mayor longevidad y crecimiento lento). La <strong>resistencia ambiental</strong> es la influencia de todos los factores del ambiente que evitan que la población crezca desmesuradamente, e incluye <strong>factores bióticos</strong> (depredación, competencia, parasitismo, enfermedades transmisibles) y <strong>factores abióticos</strong> (luz, humedad, clima, agua, exceso de sales, sequía, inundaciones, erupciones volcánicas, destrucción de hábitats y uso de plaguicidas).',
      ejemplo: 'Darwin calculó que una sola pareja de elefantes, después de 750 años, si toda su descendencia sobreviviera y se reprodujera, estaría representada por 19 millones de descendientes. De forma similar, dos moscas comunes podrían producir, en el lapso de un año sin ninguna restricción, seis billones de individuos.',
      aplicacion: 'En condiciones de laboratorio, con ratas enjauladas y alimento suficiente, se ha demostrado que las crías podían morir en los conductos genitales de las hembras cuando la densidad de la población era elevada — un ejemplo real de cómo un factor biótico (la competencia por espacio) actúa como resistencia ambiental incluso cuando el alimento no falta.',
      compruebra: '¿Por qué una especie con estrategia reproductiva K (como los elefantes) tarda mucho más en recuperar su tamaño poblacional después de una crisis que una especie con estrategia r (como una mosca)?' },

    { id: 't4', icon: '📊', titulo: 'Patrones de crecimiento y capacidad de carga ambiental',
      ideaClave: 'El crecimiento exponencial se acelera sin freno; el crecimiento logístico se estabiliza en la capacidad de carga del ambiente.',
      explicacion: 'El <strong>crecimiento poblacional</strong> es el cambio en el número de individuos de una población a través del tiempo, resultado de la interacción entre el potencial biótico y la resistencia ambiental. El modelo más simple es el <strong>crecimiento exponencial</strong>, en el que el número de individuos se incrementa a una tasa constante mientras existan recursos disponibles (curva en forma de "J"). Luego de ese crecimiento, las poblaciones tienden a estabilizarse en la <strong>capacidad de carga ambiental</strong>: el crecimiento máximo que puede sostener el ambiente a muy largo plazo, según la disponibilidad de recursos. Ese proceso de estabilización se llama <strong>crecimiento logístico</strong> (curva en forma de "S"), que inicia con una fase lenta o "fase lag" antes de acelerarse y finalmente estabilizarse.',
      ejemplo: 'Si la capacidad de carga ambiental se ve rebasada por el crecimiento de una población, esta tiende a disminuir; si se mantiene por debajo de ella, puede seguir aumentando. El libro cita una gráfica real (Gallardo A., 2012) que compara el crecimiento sin control con un desarrollo sustentable que se ajusta mejor a la capacidad de carga (recursos) disponible.',
      aplicacion: 'El libro destaca que estas curvas de crecimiento son características de las poblaciones, no de especies aisladas, y sorprende su similitud entre organismos tan distintos como las bacterias y el ser humano.',
      compruebra: '¿Qué le pasaría a una población que sigue creciendo de forma exponencial después de rebasar la capacidad de carga de su ambiente?' },

    { id: 't5', icon: '🐧', titulo: 'Abundancia, escasez y distribución de las poblaciones',
      ideaClave: 'El tamaño de las poblaciones fluctúa entre la abundancia y la escasez, y los individuos se distribuyen en el espacio de forma agrupada, uniforme o aleatoria.',
      explicacion: 'El tamaño de las poblaciones biológicas <strong>fluctúa</strong> dependiendo de la cantidad de recursos disponibles, que puede variar de forma estacional o por las condiciones ambientales, generando ciclos de <strong>abundancia</strong> y <strong>escasez</strong>. Existen tres patrones de <strong>distribución</strong>: <strong>agrupada</strong> (las condiciones del medio son discontinuas y los recursos se concentran en un lugar específico), <strong>uniforme</strong> (los individuos están espaciados uniformemente, de modo que la presencia de uno disminuye la probabilidad de encontrar otro cerca) y <strong>aleatoria</strong> (los individuos se distribuyen de manera impredecible, sin relación con la presencia de otros) — esta última es muy rara en la naturaleza, ya que la mayoría de las poblaciones tiende a agruparse.',
      ejemplo: 'Los pingüinos emperadores, que forman parejas y familias para proteger a sus crías del intenso frío, ejemplifican la distribución agrupada. Algunos pinos secretan compuestos alelopáticos que impiden el crecimiento de otras plantas a su alrededor, generando una distribución uniforme; lo mismo ocurre con los comportamientos territoriales de ciertos animales, que hacen que los individuos se alejen y se ubiquen equidistantemente en el espacio.',
      aplicacion: 'El libro señala que las especies invasoras constituyen un problema mundial: al llegar a un lugar nuevo sin encontrar depredadores (o muy pocos), proliferan, y las especies locales experimentan periodos de escasez que, en los casos más drásticos, han llevado a la extinción.',
      compruebra: 'Si observás un bosque de árboles y arbustos creciendo muy concentrados cerca de una fuente de agua, ¿qué patrón de distribución estás observando y por qué?' },

    { id: 't6', icon: '🌍', titulo: 'Impacto ambiental de la población humana y tasa de crecimiento',
      ideaClave: 'El impacto ambiental de la población humana depende de su tamaño, sus niveles de consumo y su tecnología; la tasa de crecimiento anual permite proyectar cómo cambiará una población en el tiempo.',
      explicacion: 'El impacto ambiental de la <strong>población humana</strong> no depende solo del número de habitantes, sino también de las condiciones de la biosfera, los niveles de consumo de energía y materiales, y la tecnología disponible. Entre las problemáticas que señala el libro están: la <strong>pobreza</strong> (más devastadora en naciones con crecimiento acelerado y economías deficitarias), el <strong>suministro de alimentos</strong> (según la FAO, la población ha crecido más rápido que el suministro de alimentos, degradando unos 2 millones de hectáreas de tierra arable) y la <strong>salud pública</strong> (la propagación de enfermedades es más frecuente en ciudades con altas concentraciones de personas). Para proyectar el crecimiento de una población se usan la <strong>tasa de crecimiento demográfico</strong> (tcd = (natalidad − mortalidad) + saldo migratorio) y la <strong>tasa de crecimiento anual</strong> (tca), con la fórmula Pt = Po(1 + tca)^t para calcular la población futura.',
      ejemplo: 'Según datos de la CEPAL citados en el libro, Costa Rica lidera la esperanza de vida en América Latina con 79,6 años (seguida por Cuba con 79,4 y Chile con 79,2), y sería de los primeros países de la región en sobrepasar los 80 años entre 2015 y 2020.',
      aplicacion: 'El cantón de Escazú tenía 65 925 habitantes en 2014 y 67 362 en 2016, lo que da una tasa de crecimiento anual de 1,08%. Aplicando la fórmula Pt = Po(1 + tca)^t, el cantón de Desamparados, con 222 808 habitantes en 2011 y una tasa de 1,14%, tendría aproximadamente 235 801 habitantes 5 años después.',
      compruebra: 'La ciudad de Heredia tenía 468 497 habitantes en 2012 y 497 805 en 2016. Usando la fórmula de tasa de crecimiento anual, ¿cuál sería, aproximadamente, esa tasa?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Natalidad, mortalidad o migración?": 8
     situaciones reales (Costa Rica 2016, pingüinos, paloma torcaza)
     para clasificar entre las tres propiedades demográficas. Mismo
     patrón exacto que Sim1 de bio10-u01/02/03.js, con 3 opciones en
     vez de 2.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'En 2016 hubo aproximadamente 72 000 nacimientos en Costa Rica.', correcta: 'natalidad', explica: 'Es natalidad: describe la aparición de nuevos individuos por nacimiento.' },
    { texto: 'En 2016, Costa Rica tuvo 22 680 fallecimientos.', correcta: 'mortalidad', explica: 'Es mortalidad: describe la desaparición de individuos por muerte.' },
    { texto: 'Los pingüinos llegan a las costas de la Patagonia a nidificar a fines del invierno, y a mediados del otoño se produce una gran emigración que deja las costas vacías.', correcta: 'migracion', explica: 'Es migración: describe el desplazamiento estacional de toda la población hacia otro lugar.' },
    { texto: 'La paloma torcaza (Zenaida auriculata) empolla dos huevos a la vez.', correcta: 'natalidad', explica: 'Es natalidad: describe la capacidad reproductiva de la especie.' },
    { texto: 'El tamaño de una población aumenta por la llegada de nuevos individuos desde otro territorio.', correcta: 'migracion', explica: 'Es migración (inmigración): el tamaño aumenta por la llegada de individuos.' },
    { texto: 'El tamaño de una población disminuye por la partida de individuos hacia otro territorio.', correcta: 'migracion', explica: 'Es migración (emigración): el tamaño disminuye por la partida de individuos.' },
    { texto: 'Corresponde a la desaparición por muerte de los individuos de una población.', correcta: 'mortalidad', explica: 'Esa es, exactamente, la definición de mortalidad.' },
    { texto: 'Es la propiedad de aumento intrínseca a una población, por nacimiento, eclosión, germinación o división.', correcta: 'natalidad', explica: 'Esa es, exactamente, la definición de natalidad.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las ${SITUACIONES_SIM1.length} situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-sim1-opcion="natalidad">Natalidad</button>
          <button class="btn btn-ghost" data-sim1-opcion="mortalidad">Mortalidad</button>
          <button class="btn btn-ghost" data-sim1-opcion="migracion">Migración</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de patrones de distribución": 2 fases,
     mismo patrón exacto que Sim2 de bio10-u01/02/03.js — (A) explorar
     libremente los 3 patrones reales, y (B) un quiz de 2ª fase donde
     MQC da el caso real y el estudiante elige el patrón.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'agrupada', nombre: '🐧 Distribución agrupada', areas: 'Los recursos o condiciones se concentran en un lugar específico (ej.: pingüinos emperadores protegiendo a sus crías del frío).' },
    { id: 'uniforme', nombre: '🌲 Distribución uniforme', areas: 'Los individuos se espacian de forma pareja (ej.: pinos con compuestos alelopáticos, o comportamiento territorial).' },
    { id: 'aleatoria', nombre: '🎲 Distribución aleatoria', areas: 'Los individuos se ubican de forma impredecible, sin relación entre ellos; es un patrón muy raro en la naturaleza.' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Los pingüinos emperadores forman parejas y familias, agrupándose para proteger a sus crías del intenso frío.', opciones: ['Distribución agrupada', 'Distribución uniforme', 'Distribución aleatoria'], correcta: 0 },
    { fenomeno: 'Algunos pinos secretan compuestos alelopáticos que impiden el crecimiento de otras plantas a su alrededor.', opciones: ['Distribución uniforme', 'Distribución agrupada', 'Distribución aleatoria'], correcta: 0 },
    { fenomeno: 'Los bosques y arbustos crecen concentrados cerca de una fuente de agua, donde las condiciones aptas se encuentran en un lugar específico.', opciones: ['Distribución agrupada', 'Distribución aleatoria', 'Distribución uniforme'], correcta: 0 },
    { fenomeno: 'El comportamiento territorial de ciertas especies hace que los individuos se alejen y se ubiquen equidistantemente en el espacio.', opciones: ['Distribución uniforme', 'Distribución agrupada', 'Distribución aleatoria'], correcta: 0 },
    { fenomeno: 'Los individuos de una población se distribuyen de manera impredecible o al azar, sin que la presencia de uno afecte la ubicación de otro.', opciones: ['Distribución aleatoria', 'Distribución agrupada', 'Distribución uniforme'], correcta: 0 },
    { fenomeno: 'Este patrón es muy raro en la naturaleza, ya que la mayoría de las poblaciones muestra una tendencia a agruparse.', opciones: ['Distribución aleatoria', 'Distribución uniforme', 'Distribución agrupada'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada patrón para ver un ejemplo real de distribución.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el patrón →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.5rem">¿Qué patrón de distribución es este?</p>
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
     SIMULADOR 3 — "Calculadora de tasa de crecimiento anual":
     escenario guiado en 2 pasos con el caso real de Heredia (Guía de
     Trabajo, Actividad 2, pág. 131). Mismo patrón exacto que Sim3 de
     bio10-u01/02/03.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario real (Guía de Trabajo del libro): la ciudad de <strong>Heredia</strong> tenía <strong>468 497</strong> habitantes en el año 2012, y ya en el año 2016 tenía <strong>497 805</strong> habitantes.</p>
          <p style="color:var(--text-secondary);margin-top:.6rem">Fórmula: tca = <sup>t</sup>√(Pt / Po) − 1</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> entre 2012 y 2016 pasaron 4 años. ¿Cuál es el valor de "t" (tiempo en años a proyectar) que debés usar en la fórmula?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="4">t = 4</button>
            <button class="btn btn-ghost" data-sim3-opcion="2016">t = 2016</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> con Po = 468 497, Pt = 497 805 y t = 4, ¿cuál es, aproximadamente, la tasa de crecimiento anual (tca) de Heredia?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="1.53">Aproximadamente 1,53%</button>
            <button class="btn btn-ghost" data-sim3-opcion2="6.26">Aproximadamente 6,26%</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">tca = ⁴√(497 805 / 468 497) − 1 ≈ 0,0153, es decir, aproximadamente <strong>1,53%</strong> de crecimiento anual en Heredia entre 2012 y 2016. Notá que el 6,26% es solo el crecimiento total acumulado en esos 4 años (497805/468497 − 1), no la tasa anual.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01/02/03.js) ──── */
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
     bio10-u01/02/03.js.
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
     bio10-u01/02/03.js.
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
      { id: 'sim1', titulo: '👶 ¿Natalidad, mortalidad o migración?', desc: `${SITUACIONES_SIM1.length} situaciones reales (Costa Rica 2016, pingüinos de la Patagonia, paloma torcaza) para clasificar entre las tres propiedades demográficas.` },
      { id: 'sim2', titulo: '🐧 Explorador de patrones de distribución', desc: 'Explorá los 3 patrones reales de distribución (agrupada, uniforme, aleatoria) y después probá identificando vos mismo el patrón, en un quiz de 2 fases.' },
      { id: 'sim3', titulo: '📈 Calculadora de tasa de crecimiento anual', desc: 'Un escenario guiado paso a paso con el caso real de la tasa de crecimiento anual de Heredia (Guía de Trabajo del libro).' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El patrón correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === '4';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: t = 4, porque pasaron 4 años entre 2012 y 2016.'
            : '💡 En realidad t = 4: es la cantidad de años transcurridos entre 2012 y 2016, no el año en sí.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === '1.53';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: la tasa de crecimiento ANUAL es aproximadamente 1,53%.'
            : '💡 Ese valor (6,26%) es el crecimiento TOTAL acumulado en 4 años, no la tasa anual — hay que aplicar la raíz t-ésima de la fórmula.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de poblaciones": 5 escenarios reales para
     identificar el concepto correcto, con pistas que orientan sin
     revelar la respuesta. Mismo patrón exacto que bio10-u01/02/03.js:
     SIN XP al solo iniciar un nivel, y game-won/game-played UNA sola
     vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'En 2016, Costa Rica tuvo aproximadamente 72 000 nacimientos con una población de 4 909 000 habitantes.',
      pista: 'Pensá en la propiedad relacionada con la aparición de nuevos individuos.',
      correcta: 'Natalidad', opciones: ['Natalidad', 'Mortalidad', 'Migración', 'Potencial biótico'] },
    { id: 'nivel2', escenario: 'En el año 2016, Costa Rica registró 22 680 fallecimientos.',
      pista: 'Pensá en la desaparición de individuos por muerte, no en su nacimiento.',
      correcta: 'Mortalidad', opciones: ['Mortalidad', 'Natalidad', 'Migración', 'Resistencia ambiental'] },
    { id: 'nivel3', escenario: 'Los pingüinos llegan a las costas de la Patagonia a nidificar a fines del invierno, y a mediados del otoño se produce una gran emigración que deja las costas vacías.',
      pista: 'Pensá en el desplazamiento de toda o parte de la población hacia otro lugar.',
      correcta: 'Migración', opciones: ['Migración', 'Natalidad', 'Mortalidad', 'Capacidad de carga'] },
    { id: 'nivel4', escenario: 'Darwin calculó que una sola pareja de elefantes, después de 750 años, si toda la descendencia sobreviviera y se reprodujera sin restricciones, estaría representada por 19 millones de descendientes.',
      pista: 'Pensá en la máxima capacidad reproductiva de una población en condiciones óptimas, sin ningún límite.',
      correcta: 'Potencial biótico', opciones: ['Potencial biótico', 'Resistencia ambiental', 'Migración', 'Densidad poblacional'] },
    { id: 'nivel5', escenario: 'El aumento en el número de individuos de una población se contrarresta con la influencia de todos los factores del ambiente que evitan que esa población crezca desmesuradamente.',
      pista: 'Pensá en lo opuesto al potencial biótico: lo que frena el crecimiento, no lo que lo impulsa.',
      correcta: 'Resistencia ambiental', opciones: ['Resistencia ambiental', 'Potencial biótico', 'Migración', 'Capacidad de carga'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective de Poblaciones</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿Qué concepto describe este escenario?</p>
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
     EXAMEN — banco real (js/data/banco-bio10-u04.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01/02/03.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO10_U04 !== 'undefined') ? PREGUNTAS_BIO10_U04 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO10-U04</h3>
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
     MISIÓN FINAL — "Bajo la lupa: el derrumbe demográfico de la Isla
     de Pascua" (mismo patrón exacto que bio10-u01/02/03.js:
     awardXP('biologia10-mission-done') UNA sola vez, vía
     missionDone). Caso real citado textualmente en la Evaluación del
     tema del libro (pág. 133).
     ================================================================ */
  const MISION_A_OPCIONES = [
    'Una epidemia de tuberculosis acabó con una cuarta parte de la población',
    'Las ratas de Polinesia pudieron haber aniquilado los nidos terrestres de aves y las semillas de palmera',
    'En 1877 solo quedaban 111 habitantes en la isla',
    'La población se mantuvo estable en 2000-3000 habitantes durante todo el siglo XVIII'
  ];
  const MISION_A_CORRECTAS = [
    'Una epidemia de tuberculosis acabó con una cuarta parte de la población',
    'Las ratas de Polinesia pudieron haber aniquilado los nidos terrestres de aves y las semillas de palmera',
    'En 1877 solo quedaban 111 habitantes en la isla'
  ];
  const MISION_B_OPCIONES = [
    'La población había crecido considerablemente desde su llegada inicial, aprovechando los recursos de la isla',
    'La población nunca cambió desde que llegó menos de 100 personas por primera vez',
    'La isla nunca tuvo suficientes recursos para sostener a ningún ser humano',
    'Roggeveen fue la primera persona en llegar a la isla, en 1722'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'La población humana rebasó la capacidad de carga del ambiente insular, y luego la población se redujo drásticamente',
    'La capacidad de carga ambiental de la isla aumentó sin límite alguno junto con la población',
    'La capacidad de carga ambiental no tiene ninguna relación con lo ocurrido en la Isla de Pascua',
    'La isla nunca tuvo una capacidad de carga ambiental definida'
  ];
  const MISION_C_CORRECTA = 0;
  const MISION_D_MIN = 40, MISION_D_MAX = 250;

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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: el derrumbe demográfico de la Isla de Pascua".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>🗿 Misión: Bajo la lupa — el derrumbe demográfico de la Isla de Pascua</h3>
        <p style="color:var(--text-secondary)">Texto base (Evaluación del tema): "La Isla de Pascua ha sido citada como ejemplo de caída estrepitosa de población humana. Cuando algo menos de 100 personas llegó por primera vez a la isla, esta estaba cubierta de árboles y una gran variedad de alimentos. En 1722, la isla fue visitada por Jacob Roggeveen, quien estimó una población de 2 000 a 3 000 habitantes con muy pocos árboles, un suelo rico, buen clima y donde 'todo el condado era cultivado'. Medio siglo más tarde, fue descrito como 'una tierra pobre' y 'en gran parte sin cultivar'. El derrumbe ecológico que siguió ha sido atribuido indistintamente a superpoblación, comerciantes de esclavos, enfermedades europeas (incluyendo una epidemia de viruela que mató a tantos y tan rápido que los muertos se quedaron sin enterrar y una epidemia de tuberculosis que acabó con una cuarta parte de la población), agitación social y especies invasoras (como las ratas de Polinesia que pudieron haber aniquilado los nidos terrestres de aves y las semillas de palmera). Sea cual sea la combinación de factores, sólo 111 habitantes se quedaban en la isla en 1877."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. ¿Qué elementos del texto describen la caída de la población de la Isla de Pascua? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todos los que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, en 1722 la isla tenía muy pocos árboles, buen clima, suelo rico y "todo el condado era cultivado". ¿Qué sugiere esto sobre la población que llegó originalmente (menos de 100 personas)?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. ¿Cuál es la relación entre la capacidad de carga ambiental y lo que ocurrió en la Isla de Pascua?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. Según el texto, ¿qué factores mediaron para la disminución drástica de la población en la Isla de Pascua? Mencioná al menos tres.</p>
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
     bio10-u01/02/03.js — ver biologia10.js) ──────────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
