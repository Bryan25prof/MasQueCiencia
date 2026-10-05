/* ================================================================
   MÁSQUECIENCIA — js/units/biologia11/bio11-u03.js
   BIO11-U03 — Ciclos biogeoquímicos y sostenibilidad
   ================================================================
   FUENTE (ver también banco-bio11-u03.js):

   Esta unidad, como toda Biología 11.º, usa el Programa de Estudio
   oficial de Biología del Ministerio de Educación Pública de Costa
   Rica ("Educar para una nueva ciudadanía") como fuente primaria,
   porque Biología 11.º no tiene libro de texto propio (a diferencia
   de Biología 10.º, que sí cuenta con un libro fuente privado). Todo
   el contenido real de esta unidad —conceptos, procesos y ejemplos—
   proviene de ese documento oficial, sección "Undécimo año de
   Educación Académica; Duodécimo año de Educación Técnica", Eje
   temático II ("Uso sostenible de la energía y los materiales, para
   la preservación y protección de los recursos del planeta"),
   sub-tema x "¿Por qué los seres vivos dependemos unos de otros?" —
   el sub-tema con más lecciones asignadas oficialmente (30-35) de los
   5 que conforman Biología 11.º, y por eso el más extenso de la
   disciplina.

   Páginas impresas leídas y verificadas visualmente, una por una con
   pikepdf + pdftoppm (se confirmó el número de página al pie de cada
   imagen antes de redactar el contenido): 68, 69, 70, 71 y 72 del
   documento oficial. Contenido real usado:
   - Pág. 68: Criterios de Evaluación del eje temático (reciclaje de
     nutrientes e interdependencia de la vida en los ciclos
     biogeoquímicos; sistemas de fijación y emisión del carbono,
     productividad primaria y secundaria, acidificación de los
     océanos, huella ecológica; el ciclo del agua y su relación con
     otros ciclos globales y el sistema climático). Situación de
     aprendizaje real sobre el compostaje: el rol del ambiente, las
     bacterias, los hongos, los insectos y las lombrices de tierra en
     la descomposición de la materia orgánica, y la relación entre los
     componentes de la compostera y el reciclado de nutrientes en el
     sistema suelo (biomasa viva y no viva reciclada en biomoléculas y
     gases como CO2, CH4 y N2O).
   - Pág. 69: fotosíntesis y respiración celular como procesos
     complementarios y opuestos; organismos autótrofos que captan
     energía lumínica, CO2 y agua y producen O2 e hidratos de carbono;
     organismos heterótrofos (microorganismos y animales) que
     incorporan materia y energía liberando CO2; el papel de las
     moléculas transportadoras de energía, los pigmentos, los
     citocromos y las enzimas.
   - Pág. 70: productividad primaria; investigación por subgrupos del
     día y la noche en el ciclo del carbono, la concentración de CO2
     en la atmósfera, su efecto sobre las tasas de fotosíntesis y
     respiración, el efecto invernadero (considerando los principales
     emisores del país), el ciclo del carbono en el cambio climático.
   - Pág. 71: el ciclo del carbono en la acidificación de los océanos
     y en el calentamiento global (temperatura y nivel del mar); la
     humanidad en el reciclaje de carbono; investigación por subgrupos
     de los ciclos del azufre (lluvia ácida y contaminación con
     sulfatos), del nitrógeno (organismos nitrificantes y
     desnitrificantes, el flujo de nitrógeno como limitador de los
     procesos vitales de los océanos) y del fósforo.
   - Pág. 72: la dinámica de fosfatos dependiente de la actividad
     microbiana, el fósforo como limitante de la productividad de los
     ecosistemas y su relación con la eutrofización; investigación del
     ciclo del agua (vías de flujo hidrológico, ecosistemas acuáticos,
     humedad global y sistema climático, uso y disponibilidad de agua
     dulce, reutilización, recuperación o rehabilitación sostenible);
     la gestión sostenible del agua a nivel del centro educativo y el
     Programa Bandera Azul Ecológica; la participación antropogénica
     insostenible en los ciclos materiales (minerales reciclados de
     forma sostenible por los ecosistemas durante miles de millones de
     años, hoy acaparados por la humanidad para fabricar tecnologías
     móviles, alterando el ambiente físico, químico y biológico).

   Mismo patrón de plugin EXACTO que bio10-u01.js/.../u06.js —
   apunta a Storage.updateBiologia11Unit / markBiologia11TopicRead /
   data.biologia11 (nunca a las funciones de Biología 10.º, Química ni
   Física). Mismas protecciones anti-farming de XP y mismo mecanismo
   anti-trampa del examen (selección de preguntas Y orden de opciones
   aleatorios en cada intento). Los eventos de XP pasan
   {disciplina:'biologia', grado:11}.
================================================================ */

(function () {
  'use strict';

  window.UNIT_PLUGINS = window.UNIT_PLUGINS || {};
  const UNIT_ID = 'bio11-u03';
  const C = 'var(--green)';

  const TEMAS = [
    { id: 't1', icon: '🪱', titulo: 'Reciclaje de nutrientes y el papel de los desintegradores',
      ideaClave: 'Los desintegradores y saprófitos —bacterias, hongos, insectos y lombrices de tierra— son responsables de reciclar los materiales, los nutrientes minerales y el agua, haciendo posible que la naturaleza reutilice de forma indefinida lo que ya existe.',
      explicacion: 'Todo ecosistema depende de que sus nutrientes circulen una y otra vez, en vez de agotarse: eso es lo que hacen posible los <strong>desintegradores y saprófitos</strong>. El compostaje —ya sea doméstico o agrícola— es un ejemplo concreto y a pequeña escala de ese servicio ecosistémico: el ambiente, junto con bacterias, hongos, insectos y lombrices de tierra, descompone la materia orgánica de una compostera y la transforma en nutrientes minerales que las plantas pueden volver a aprovechar. Esa transformación no ocurre de forma aislada: los componentes biológicos y orgánicos de la compostera se relacionan directamente con la actividad de reciclado de nutrientes que ocurre en el <strong>sistema suelo</strong>, cuya organización, estructura y procesos aportan los nutrientes que las plantas y los demás organismos requieren. Esos nutrientes se integran a la <strong>biomasa viva y no viva</strong>, y se reciclan continuamente en forma de biomoléculas y de gases como el <strong>CO2, el CH4 y el N2O</strong>, entre otros. En el fondo, los ciclos globales de los elementos son el resultado de ese reciclado ecológico, regulado por la acción de las redes alimentarias.',
      ejemplo: 'En una compostera doméstica o de finca, los restos de comida y de hojas secas son descompuestos por bacterias, hongos, insectos y lombrices de tierra, hasta convertirse en un material rico en nutrientes minerales que puede devolverse al suelo de un huerto o un jardín.',
      aplicacion: 'Explicar el compostaje con este enfoque sistémico ayuda a entender preguntas más amplias, como cómo la naturaleza logra reciclar el 100% del material, cómo un desecho puede ser reconstituido de forma indefinida, y de qué depende, en general, el sistema de reciclado de la naturaleza.',
      compruebra: 'En el ejemplo de la compostera, ¿qué organismos identificás y qué papel cumple cada uno en el reciclaje de nutrientes hacia el sistema suelo?' },

    { id: 't2', icon: '🌿', titulo: 'Fotosíntesis y respiración celular: procesos complementarios',
      ideaClave: 'La fotosíntesis (propia de los organismos autótrofos) y la respiración celular (de autótrofos y heterótrofos) son procesos opuestos y a la vez complementarios: lo que uno produce, el otro lo consume.',
      explicacion: 'En la <strong>fotosíntesis</strong>, los organismos autótrofos captan energía lumínica, CO2 y agua, y producen O2 e hidratos de carbono (carbohidratos): así se forma materia orgánica por conversión de energía lumínica en energía química, lo que permite la mantención, el crecimiento y la reproducción del organismo, además de la formación de biomasa (lo que se conoce como <strong>productividad primaria</strong>). En la <strong>respiración celular</strong> —aerobia o anaerobia—, tanto los organismos heterótrofos (microorganismos y animales) como los propios autótrofos incorporan materia y energía liberando CO2; un ejemplo de ello es la fermentación producida por las levaduras, que también libera CO2. Ambos procesos dependen de moléculas transportadoras y almacenadoras de energía, de pigmentos, de citocromos y de enzimas. Precisamente por eso se dice que la fotosíntesis y la respiración celular son procesos <strong>opuestos y complementarios</strong>: el oxígeno y los carbohidratos que produce la fotosíntesis son consumidos por la respiración, mientras que el CO2 que libera la respiración es el que vuelve a fijar la fotosíntesis. Ambos, además, forman parte de los ciclos del carbono, el oxígeno y el hidrógeno.',
      ejemplo: 'En una planta acuática puede observarse, durante el día, la liberación de burbujas de oxígeno producto de la fotosíntesis; en cambio, la fermentación producida por las levaduras evidencia la liberación de CO2 característica de la respiración.',
      aplicacion: 'Comparar ambos procesos en una tabla de entradas y salidas (luz, CO2 y agua frente a O2 y carbohidratos, por un lado; O2 y carbohidratos frente a CO2, agua y energía liberada, por el otro) permite entender con claridad por qué son procesos opuestos y, a la vez, complementarios dentro del mismo ecosistema.',
      compruebra: '¿Por qué se dice que la fotosíntesis y la respiración celular son procesos "opuestos y complementarios" al mismo tiempo?' },

    { id: 't3', icon: '🌎', titulo: 'El ciclo del carbono, el cambio climático y la acidificación oceánica',
      ideaClave: 'El ciclo del carbono varía incluso entre el día y la noche, y su alteración por la actividad humana está detrás del efecto invernadero, el cambio climático y la acidificación de los océanos.',
      explicacion: 'La concentración de carbono en un ecosistema no es constante: varía entre el <strong>día y la noche</strong>, principalmente por los componentes biológicos —la fotosíntesis, que solo ocurre con luz, y la respiración celular, que ocurre todo el tiempo—. A su vez, la concentración de <strong>CO2 en la atmósfera</strong> influye sobre las tasas de fotosíntesis y de respiración celular de los organismos. El aumento de esa concentración, junto con la de otros gases, se relaciona con el <strong>efecto invernadero</strong> —considerando cuáles son los principales sectores emisores de CO2 en el país— y, a su vez, con el <strong>cambio climático</strong>, que afecta la biodiversidad, los recursos hídricos y las actividades agropecuarias. Parte de ese carbono también se disuelve en el mar, generando la <strong>acidificación de los océanos</strong>. El <strong>calentamiento global</strong> se traduce, además, en un aumento de la temperatura y del nivel del mar, con consecuencias sobre los componentes biológicos. La humanidad, finalmente, tiene un papel directo en el reciclaje del carbono: no es un ciclo ajeno a la actividad humana, sino uno que las personas alteran y en el que también pueden participar activamente.',
      ejemplo: 'En un bosque, la concentración de CO2 tiende a ser más baja durante el día —cuando la fotosíntesis predomina— y más alta durante la noche, cuando solo ocurre respiración celular; a escala global, el aumento sostenido de las emisiones de CO2 de los principales sectores del país se relaciona con el efecto invernadero.',
      aplicacion: 'Analizar cómo la concentración de CO2 en la atmósfera afecta, al mismo tiempo, al efecto invernadero, a la acidificación de los océanos y a las tasas de fotosíntesis y respiración, ayuda a comprender el ciclo del carbono como un sistema interconectado, y no como fenómenos aislados entre sí.',
      compruebra: '¿Por qué el aumento del CO2 en la atmósfera afecta tanto al clima como a la química de los océanos?' },

    { id: 't4', icon: '⚗️', titulo: 'Los ciclos del nitrógeno y del azufre',
      ideaClave: 'Los organismos nitrificantes y desnitrificantes reciclan el nitrógeno para hacerlo aprovechable por los seres vivos y limitar los procesos vitales de los océanos; las emisiones de compuestos de azufre, en cambio, generan lluvia ácida y contaminación con sulfatos.',
      explicacion: 'Cada ciclo biogeoquímico tiene sus propios reservorios, sus procesos biológicos y su origen natural y antropogénico. En el <strong>ciclo del azufre</strong>, la problemática central que se estudia es la <strong>lluvia ácida y la contaminación con sulfatos</strong>: las emisiones de compuestos de azufre a la atmósfera —muchas veces de origen humano— se disuelven en el agua de lluvia y la acidifican. En el <strong>ciclo del nitrógeno</strong>, los organismos <strong>nitrificantes</strong> transforman compuestos nitrogenados en formas aprovechables, como los nitratos, mientras que los organismos <strong>desnitrificantes</strong> devuelven nitrógeno a la atmósfera; ese reciclaje y la dinámica de nitratos son claves porque el flujo de nitrógeno actúa como <strong>limitador de los procesos vitales de los océanos</strong>. Cuando hay un exceso de nitrógeno disponible —por ejemplo, proveniente de fertilizantes agrícolas que llegan a un cuerpo de agua—, puede producirse <strong>eutrofización</strong>: un crecimiento excesivo de algas que, al descomponerse, agota el oxígeno disponible para el resto de la vida acuática.',
      ejemplo: 'La lluvia ácida derivada de emisiones industriales de compuestos de azufre puede dañar bosques y cuerpos de agua; en cambio, un exceso de nitratos provenientes de fertilizantes agrícolas que llega a un lago puede desencadenar eutrofización.',
      aplicacion: 'Identificar si un problema ambiental observado —como el agua verdosa de un estanque o la lluvia que corroe una fachada— corresponde al ciclo del nitrógeno o al del azufre ayuda a dirigir la causa y la posible solución hacia el lugar correcto: el control de fertilizantes en un caso, y el control de emisiones industriales en el otro.',
      compruebra: '¿Qué diferencia hay entre un organismo nitrificante y uno desnitrificante, y por qué ambos son necesarios para el ciclo del nitrógeno?' },

    { id: 't5', icon: '🪨', titulo: 'El ciclo del fósforo: un elemento limitante',
      ideaClave: 'La disponibilidad de fósforo depende, en gran medida, de la actividad microbiana, y actúa como un factor limitante de la productividad de los ecosistemas, de los procesos agrícolas y de los procesos vitales de los océanos.',
      explicacion: 'A diferencia del carbono, el nitrógeno o el azufre, el ciclo del fósforo no tiene una fase gaseosa relevante: el fósforo circula principalmente entre las rocas, el suelo, el agua y los organismos vivos. La dinámica de los <strong>fosfatos</strong> depende, sobre todo, de la <strong>actividad microbiana</strong>, que libera el fósforo contenido en la materia orgánica en descomposición y lo hace disponible para otros organismos. Precisamente por eso, la disponibilidad de fósforo actúa como un elemento <strong>limitante de la productividad</strong> de los ecosistemas —de los procesos agrícolas y de los procesos vitales de los océanos incluidos—: cuando escasea, limita cuánto pueden crecer las plantas y el fitoplancton; cuando se acumula en exceso —por ejemplo, por fertilizantes o detergentes con fosfatos—, puede desencadenar <strong>eutrofización</strong>, el mismo fenómeno asociado también al exceso de nitrógeno.',
      ejemplo: 'En muchos ecosistemas de agua dulce, el fósforo es el nutriente que más limita el crecimiento de las algas; un vertido de aguas residuales ricas en fosfatos hacia un río puede disparar un crecimiento excesivo de estas.',
      aplicacion: 'Comprender el fósforo como elemento limitante ayuda a explicar por qué los fertilizantes agrícolas suelen incluirlo deliberadamente para aumentar la productividad de los cultivos, y por qué su manejo descuidado es una causa frecuente de eutrofización en ríos y lagos cercanos a zonas agrícolas.',
      compruebra: '¿Por qué se dice que el fósforo es un elemento "limitante" de la productividad de un ecosistema, y qué papel cumplen los microorganismos en su disponibilidad?' },

    { id: 't6', icon: '💧', titulo: 'El ciclo del agua y la gestión sostenible del recurso hídrico',
      ideaClave: 'El ciclo del agua está vinculado a otros ciclos globales y al sistema climático; su gestión sostenible —incluyendo el Programa Bandera Azul Ecológica en los centros educativos— es clave frente al cambio climático y frente a la participación antropogénica en los ciclos materiales.',
      explicacion: 'El ciclo del agua se relaciona con otros ciclos globales a través de sus vías de flujo hidrológico y su vínculo con los ecosistemas acuáticos, de la humedad global y el funcionamiento del <strong>sistema climático</strong>, y de los recursos hídricos y sus impactos por el cambio climático. Comprenderlo implica analizar también el <strong>uso y la disponibilidad del agua dulce</strong>, y su <strong>reutilización, recuperación o rehabilitación sostenible</strong>. Una gestión sostenible del agua requiere actuaciones personales y colectivas —a nivel local, nacional y global— que reduzcan el consumo hídrico, incluyendo dentro del propio centro educativo, favoreciendo las acciones del <strong>Programa Bandera Azul Ecológica</strong> para centros educativos. Este eje temático conecta, además, con un problema más amplio: muchos minerales que los ecosistemas de la Tierra han reciclado de manera sostenible durante miles de millones de años son hoy acaparados por la humanidad, por ejemplo, para fabricar tecnologías móviles, alterando el ambiente físico, químico y biológico. A eso se le conoce como <strong>participación antropogénica insostenible en los ciclos materiales</strong>.',
      ejemplo: 'Un centro educativo costarricense que participa en el Programa Bandera Azul Ecológica puede implementar acciones concretas para reducir su consumo de agua —revisar fugas, reutilizar agua de lluvia, cerrar bien las llaves— como parte de su gestión ambiental institucional.',
      aplicacion: 'Proponer y documentar acciones personales y colectivas —tanto de reducción del consumo hídrico como de uso responsable de minerales, por ejemplo alargando la vida útil de un dispositivo móvil en vez de cambiarlo con frecuencia— es una forma concreta de cultura de sostenibilidad frente a la participación antropogénica en los ciclos biogeoquímicos.',
      compruebra: '¿Qué acción concreta podría implementar tu colegio, inspirada en el Programa Bandera Azul Ecológica, para reducir su consumo hídrico?' }
  ];

  /* ================================================================
     SIMULADOR 1 — "¿Fotosíntesis o respiración celular?": 10
     situaciones reales para clasificar si describen la FOTOSÍNTESIS o
     la RESPIRACIÓN CELULAR. Mismo patrón exacto que Sim1 de
     bio10-u01.js/.../u06.js.
     ================================================================ */
  const SITUACIONES_SIM1 = [
    { texto: 'Una planta capta energía lumínica, CO2 y agua, y libera oxígeno por sus hojas.', correcta: 'foto', explica: 'Es fotosíntesis: los organismos autótrofos captan energía lumínica, CO2 y agua, y producen O2 e hidratos de carbono.' },
    { texto: 'Una levadura libera CO2 durante el proceso de fermentación.', correcta: 'resp', explica: 'Es respiración: la fermentación de las levaduras libera CO2, tal como ocurre en la respiración celular.' },
    { texto: 'Un animal (organismo heterótrofo) incorpora materia y energía de su alimento, liberando CO2.', correcta: 'resp', explica: 'Es respiración: los organismos heterótrofos incorporan materia y energía mediante la respiración celular, liberando CO2.' },
    { texto: 'Un organismo autótrofo produce hidratos de carbono (carbohidratos) a partir de CO2 y agua.', correcta: 'foto', explica: 'Es fotosíntesis: así se forma materia orgánica por conversión de energía lumínica en energía química.' },
    { texto: 'En una planta acuática se observan burbujas de oxígeno liberándose durante el día.', correcta: 'foto', explica: 'Es fotosíntesis: la liberación de oxígeno en una planta acuática evidencia este proceso.' },
    { texto: 'Durante la noche, sin luz solar, una planta continúa liberando CO2 hacia la atmósfera.', correcta: 'resp', explica: 'Es respiración: de noche, sin fotosíntesis, predomina la liberación de CO2 propia de la respiración celular.' },
    { texto: 'Se forma materia orgánica por conversión de energía lumínica en energía química.', correcta: 'foto', explica: 'Es fotosíntesis: esa es, exactamente, la conversión de energía que ocurre en este proceso.' },
    { texto: 'Un microorganismo heterótrofo descompone materia orgánica liberando CO2 como parte de su metabolismo.', correcta: 'resp', explica: 'Es respiración: los microorganismos heterótrofos también incorporan materia y energía mediante la respiración celular.' },
    { texto: 'Un pigmento capta la energía lumínica necesaria para iniciar el proceso.', correcta: 'foto', explica: 'Es fotosíntesis: los pigmentos participan captando la energía lumínica que da inicio a este proceso.' },
    { texto: 'Las moléculas transportadoras de energía y las enzimas liberan la energía almacenada en los carbohidratos.', correcta: 'resp', explica: 'Es respiración: en este proceso se libera la energía química almacenada previamente en los carbohidratos.' }
  ];
  function renderSim1(idx) {
    if (idx >= SITUACIONES_SIM1.length) {
      return `<div style="text-align:center"><h3>✅ ¡Completaste las 10 situaciones!</h3><button class="btn btn-primary btn-sm" data-sim-cerrar="sim1">← Volver a Simuladores</button></div>`;
    }
    const s = SITUACIONES_SIM1[idx];
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim1" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-muted);font-size:.78rem">Situación ${idx + 1} de ${SITUACIONES_SIM1.length}</p>
        <p style="margin-bottom:1rem">${s.texto}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-ghost" data-sim1-opcion="foto">Fotosíntesis</button>
          <button class="btn btn-ghost" data-sim1-opcion="resp">Respiración celular</button>
        </div>
        <p id="sim1-feedback" style="margin-top:.8rem;font-size:.85rem"></p>
      </div>`;
  }

  /* ================================================================
     SIMULADOR 2 — "Explorador de los ciclos biogeoquímicos": 2 fases,
     mismo patrón exacto que Sim2 de bio10-u01.js/.../u06.js — (A)
     explorar libremente 6 ciclos/procesos reales, y (B) un quiz de 2ª
     fase donde MQC da el fenómeno y el estudiante elige el ciclo.
     ================================================================ */
  const ELEMENTOS_SIM2 = [
    { id: 'carbono', nombre: '🌎 Ciclo del carbono', areas: 'Fijado por la fotosíntesis y liberado por la respiración celular y la quema de combustibles; su exceso en la atmósfera genera efecto invernadero y, disuelto en el mar, acidificación de los océanos.' },
    { id: 'nitrogeno', nombre: '⚗️ Ciclo del nitrógeno', areas: 'Los organismos nitrificantes transforman el nitrógeno en formas aprovechables (nitratos); los desnitrificantes lo devuelven a la atmósfera. Es limitante de los procesos vitales de los océanos.' },
    { id: 'azufre', nombre: '🌧️ Ciclo del azufre', areas: 'Las emisiones de compuestos de azufre a la atmósfera se disuelven en el agua de lluvia, generando lluvia ácida y contaminación con sulfatos.' },
    { id: 'fosforo', nombre: '🪨 Ciclo del fósforo', areas: 'Circula entre rocas, suelo, agua y organismos gracias a la actividad microbiana; es un elemento limitante de la productividad de los ecosistemas.' },
    { id: 'agua', nombre: '💧 Ciclo del agua', areas: 'Vincula el flujo hidrológico con el sistema climático y los ecosistemas acuáticos; su gestión sostenible incluye reducir el consumo hídrico, como impulsa el Programa Bandera Azul Ecológica.' },
    { id: 'huella', nombre: '📱 Participación antropogénica', areas: 'Minerales reciclados de forma sostenible por los ecosistemas durante miles de millones de años son hoy acaparados por la humanidad, por ejemplo, en la fabricación de tecnologías móviles.' }
  ];
  const RONDAS_SIM2 = [
    { fenomeno: 'Un subgrupo expone la problemática de la lluvia ácida y la contaminación con sulfatos.', opciones: ['Ciclo del azufre', 'Ciclo del nitrógeno', 'Ciclo del carbono', 'Ciclo del fósforo'], correcta: 0 },
    { fenomeno: 'El exceso de nitratos de origen agrícola actúa como limitante de los procesos vitales de los océanos.', opciones: ['Ciclo del nitrógeno', 'Ciclo del fósforo', 'Ciclo del agua', 'Ciclo del azufre'], correcta: 0 },
    { fenomeno: 'El CO2 disuelto en el agua del mar está generando la acidificación de los océanos.', opciones: ['Ciclo del carbono', 'Ciclo del azufre', 'Ciclo del fósforo', 'Ciclo del nitrógeno'], correcta: 0 },
    { fenomeno: 'La disponibilidad de este elemento, dependiente de la actividad microbiana, limita la productividad de los ecosistemas y explica la eutrofización.', opciones: ['Ciclo del fósforo', 'Ciclo del nitrógeno', 'Ciclo del carbono', 'Ciclo del agua'], correcta: 0 },
    { fenomeno: 'Un centro educativo reduce su consumo hídrico siguiendo las acciones del Programa Bandera Azul Ecológica.', opciones: ['Ciclo del agua', 'Ciclo del carbono', 'Ciclo del azufre', 'Ciclo del nitrógeno'], correcta: 0 },
    { fenomeno: 'Minerales reciclados de forma sostenible durante miles de millones de años son hoy acaparados para fabricar tecnologías móviles.', opciones: ['Participación antropogénica en los ciclos', 'Ciclo del fósforo', 'Ciclo del agua', 'Ciclo del nitrógeno'], correcta: 0 }
  ];
  let _sim2Fase = 'explorar';
  let _sim2RondaIdx = 0;
  let _sim2OpcionesMezcladas = [];

  function renderSim2() {
    if (_sim2Fase === 'quiz') return renderSim2Quiz();
    return `
      <div>
        <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim2" style="margin-bottom:.8rem">← Volver a Simuladores</button>
        <p style="color:var(--text-secondary);margin-bottom:1rem">Fase 1 de 2 — Tocá cada ciclo real para ver su papel en la naturaleza.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.7rem">
          ${ELEMENTOS_SIM2.map(e => `
            <button class="btn btn-ghost" data-sim2-el="${e.id}" style="padding:1rem;text-align:center">${e.nombre}</button>
          `).join('')}
        </div>
        <p id="sim2-feedback" style="margin-top:1rem;font-size:.9rem;min-height:1.4em"></p>
        <button class="btn btn-primary btn-sm" id="sim2-ir-quiz" style="margin-top:1rem">Fase 2: ahora elegí vos el ciclo →</button>
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
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿A qué ciclo biogeoquímico corresponde?</p>
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
     SIMULADOR 3 — "El día y la noche en el ciclo del carbono":
     escenario guiado en 2 pasos, con el caso real de investigación
     propuesto por el programa oficial. Mismo patrón exacto que Sim3
     de bio10-u01.js/.../u06.js.
     ================================================================ */
  let _sim3Paso = 0;
  function renderSim3() {
    if (_sim3Paso === 0) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="color:var(--text-secondary)">Escenario: el programa oficial propone investigar, por subgrupos, "de qué manera influye el día y la noche en el ciclo del carbono, considerando los componentes biológicos". En un bosque, durante el día hay luz solar disponible; durante la noche, no.</p>
          <button class="btn btn-primary btn-sm" id="sim3-siguiente" style="margin-top:1rem">Comenzar</button>
        </div>`;
    }
    if (_sim3Paso === 1) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 1:</strong> durante el día, en un bosque con abundante vegetación, ¿qué proceso biológico adicional a la respiración celular ocurre gracias a la luz solar?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion="fotosintesis">La fotosíntesis, que consume CO2 y libera O2</button>
            <button class="btn btn-ghost" data-sim3-opcion="ninguno">Ningún proceso adicional: de día y de noche ocurre exactamente lo mismo</button>
          </div>
          <p id="sim3-feedback" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    if (_sim3Paso === 2) {
      return `
        <div>
          <button class="btn btn-ghost btn-sm" data-sim-cerrar="sim3" style="margin-bottom:.8rem">← Volver a Simuladores</button>
          <p style="margin-bottom:1rem"><strong>Paso 2:</strong> durante la noche, sin luz solar, ¿qué le ocurre a la concentración de CO2 producida por las plantas del bosque?</p>
          <div style="display:grid;gap:.5rem">
            <button class="btn btn-ghost" data-sim3-opcion2="aumenta">Tiende a aumentar, porque solo ocurre respiración celular, sin fotosíntesis que consuma CO2</button>
            <button class="btn btn-ghost" data-sim3-opcion2="desaparece">El CO2 desaparece por completo durante la noche</button>
          </div>
          <p id="sim3-feedback2" style="margin-top:.8rem;font-size:.85rem;min-height:2.4em"></p>
        </div>`;
    }
    return `
      <div style="text-align:center">
        <h3>✅ ¡Exacto!</h3>
        <p style="color:var(--text-secondary);max-width:460px;margin:0 auto">Durante el día, la fotosíntesis y la respiración celular ocurren a la vez, y como la fotosíntesis consume más CO2 del que libera la respiración, la concentración de CO2 tiende a bajar. Durante la noche, sin fotosíntesis, solo queda la respiración celular liberando CO2 — por eso el ciclo del carbono varía entre el día y la noche, tal como lo plantea el programa oficial.</p>
        <button class="btn btn-primary btn-sm" data-sim-cerrar="sim3" style="margin-top:1rem">← Volver a Simuladores</button>
      </div>`;
  }

  /* ── Helpers defensivos (mismo patrón que bio10-u01.js/.../u06.js,
     apuntando a las funciones paralelas de Biología 11.º) ────────── */
  function awardXP(source) {
    if (typeof Gamification !== 'undefined' && Gamification && typeof Gamification.addXP === 'function') {
      try { Gamification.addXP(source, { disciplina: 'biologia', grado: 11 }); } catch (e) {}
    }
    if (typeof Photon !== 'undefined' && Photon.react) {
      var _pmap = {'topic-read':'topic-read','exam-done':'exam-passed','game-won':'game-won','game-played':'simulator-commit','simulator-done':'simulator-commit','biologia11-mission-done':'exam-passed'};
      if (_pmap[source]) { try { Photon.react(_pmap[source]); } catch (e) {} }
    }
  }
  function loadUnitData() {
    if (typeof Storage !== 'undefined' && Storage && Storage.load) {
      try { return Storage.load().biologia11[UNIT_ID] || {}; } catch (e) { return {}; }
    }
    return {};
  }
  function patchUnit(update) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.updateBiologia11Unit === 'function') {
      try { Storage.updateBiologia11Unit(UNIT_ID, update); } catch (e) {}
    }
  }
  function markRead(topicId) {
    if (typeof Storage !== 'undefined' && Storage && typeof Storage.markBiologia11TopicRead === 'function') {
      try { Storage.markBiologia11TopicRead(UNIT_ID, topicId); } catch (e) {}
    }
  }

  /* ================================================================
     TEORÍA — 6 temas en acordeón. Mismo patrón exacto que
     bio10-u01.js/.../u06.js.
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
     bio10-u01.js/.../u06.js.
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
      { id: 'sim1', titulo: '🌿 ¿Fotosíntesis o respiración celular?', desc: '10 situaciones reales para distinguir la fotosíntesis de la respiración celular.' },
      { id: 'sim2', titulo: '♻️ Explorador de los ciclos biogeoquímicos', desc: 'Explorá 6 ciclos y procesos reales (carbono, nitrógeno, azufre, fósforo, agua y participación antropogénica) y después probá identificando vos mismo a cuál corresponde cada fenómeno.' },
      { id: 'sim3', titulo: '🌎 El día y la noche en el ciclo del carbono', desc: 'Un escenario guiado paso a paso sobre cómo varía el ciclo del carbono entre el día y la noche, según el programa oficial.' }
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
          fb.textContent = ok ? '✅ ¡Correcto!' : `💡 El ciclo correcto era: ${_sim2OpcionesMezcladas.opciones[_sim2OpcionesMezcladas.correcta]}`;
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
        const correcta = btn.getAttribute('data-sim3-opcion') === 'fotosintesis';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: durante el día, la fotosíntesis se suma a la respiración celular, consumiendo CO2 y liberando O2.'
            : '💡 En realidad sí ocurre un proceso adicional: la fotosíntesis, que solo es posible con luz solar, consume CO2 y libera O2.';
        }
        setTimeout(() => { _sim3Paso = 2; _rerenderSimTab(unit); }, 1600);
      });
    });
    document.querySelectorAll('[data-sim3-opcion2]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fb = document.getElementById('sim3-feedback2');
        const correcta = btn.getAttribute('data-sim3-opcion2') === 'aumenta';
        if (fb) {
          fb.style.color = correcta ? 'var(--green)' : 'var(--gold)';
          fb.textContent = correcta
            ? '✅ Correcto: sin fotosíntesis que consuma CO2, la respiración celular (que continúa toda la noche) hace que su concentración tienda a subir.'
            : '💡 En realidad tiende a aumentar: sin fotosíntesis que lo consuma, el CO2 liberado por la respiración celular no tiene nada que lo compense durante la noche.';
        }
        setTimeout(() => { _sim3Paso = 3; _rerenderSimTab(unit); }, 1800);
      });
    });
  }

  /* ================================================================
     JUEGO — "Detective de los ciclos biogeoquímicos": 5 escenarios
     reales para identificar a qué ciclo corresponde cada problema
     ambiental, con pistas que orientan sin revelar la respuesta.
     Mismo patrón exacto que bio10-u01.js/.../u06.js: SIN XP al solo
     iniciar un nivel, y game-won/game-played UNA sola vez por nivel.
     ================================================================ */
  const NIVELES_JUEGO = [
    { id: 'nivel1', escenario: 'Un subgrupo de investigación expone en clase la problemática de la lluvia ácida y la contaminación con sulfatos en una zona industrial.',
      pista: 'Pensá en el elemento presente en muchos gases contaminantes, cuyo símbolo químico es S.',
      correcta: 'Ciclo del azufre', opciones: ['Ciclo del azufre', 'Ciclo del nitrógeno', 'Ciclo del carbono', 'Ciclo del fósforo'] },
    { id: 'nivel2', escenario: 'Fertilizantes agrícolas ricos en nitratos llegan a un río y provocan una eutrofización que agota el oxígeno disponible en el agua.',
      pista: 'Pensá en los organismos nitrificantes y desnitrificantes que reciclan este elemento.',
      correcta: 'Ciclo del nitrógeno', opciones: ['Ciclo del nitrógeno', 'Ciclo del fósforo', 'Ciclo del agua', 'Ciclo del azufre'] },
    { id: 'nivel3', escenario: 'El aumento del CO2 atmosférico se disuelve en el agua del mar y está generando la acidificación de los océanos.',
      pista: 'Pensá en el gas que los organismos autótrofos fijan durante la fotosíntesis y liberan durante la respiración.',
      correcta: 'Ciclo del carbono', opciones: ['Ciclo del carbono', 'Ciclo del azufre', 'Ciclo del fósforo', 'Ciclo del nitrógeno'] },
    { id: 'nivel4', escenario: 'Un vertido de aguas residuales ricas en fosfatos llega a un lago y dispara el crecimiento excesivo de algas, afectando la productividad del ecosistema.',
      pista: 'Pensá en el elemento cuya disponibilidad, dependiente de la actividad microbiana, es limitante de la productividad.',
      correcta: 'Ciclo del fósforo', opciones: ['Ciclo del fósforo', 'Ciclo del nitrógeno', 'Ciclo del carbono', 'Ciclo del agua'] },
    { id: 'nivel5', escenario: 'Un centro educativo costarricense revisa fugas y reutiliza agua de lluvia como parte de las acciones del Programa Bandera Azul Ecológica para reducir su consumo hídrico.',
      pista: 'Pensá en el recurso cuyo flujo hidrológico está vinculado al sistema climático.',
      correcta: 'Ciclo del agua', opciones: ['Ciclo del agua', 'Ciclo del carbono', 'Ciclo del azufre', 'Ciclo del nitrógeno'] }
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
        <h3 style="margin:0 0 .3rem">🕵️ Detective de los Ciclos Biogeoquímicos</h3>
        <p style="color:var(--text-muted);font-size:.78rem;margin-bottom:.8rem">Escenario ${_juegoIdx + 1} de ${NIVELES_JUEGO.length}</p>
        <p style="margin:0 0 .3rem"><strong>${n.escenario}</strong></p>
        <p style="color:var(--text-muted);font-size:.82rem;margin-bottom:1rem">💡 ${n.pista}</p>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:.6rem">¿A qué ciclo biogeoquímico corresponde este problema?</p>
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
     EXAMEN — banco real (js/data/banco-bio11-u03.js). Mismo mecanismo
     anti-trampa exacto que bio10-u01.js/.../u06.js.
     ================================================================ */
  let _examEnCurso = null;
  function _bancoDisponible() { return (typeof PREGUNTAS_BIO11_U03 !== 'undefined') ? PREGUNTAS_BIO11_U03 : []; }
  function renderExamen(unit, uData) {
    if (_examEnCurso) return _renderPreguntaExamen();
    const banco = _bancoDisponible();
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center;max-width:520px">
        <h3>📝 Examen — BIO11-U03</h3>
        <p style="color:var(--text-secondary);font-size:.88rem">Mejor nota: ${uData.examBest || 0}% · Intentos: ${uData.examAttempts || 0}</p>
        <p style="color:var(--text-muted);font-size:.78rem">Banco de ${banco.length} preguntas — cada intento toma 20 al azar.</p>
        <button class="btn btn-primary" id="bio11-iniciar-examen">Iniciar examen</button>
      </div>`;
  }
  function _renderPreguntaExamen() {
    const q = _examEnCurso.preguntas[_examEnCurso.i];
    return `
      <div style="max-width:560px">
        <p style="color:var(--text-muted);font-size:.78rem">Pregunta ${_examEnCurso.i + 1} de ${_examEnCurso.preguntas.length}</p>
        <h3>${q.pregunta}</h3>
        <div id="bio11-exam-opts" style="display:grid;gap:.5rem;margin-top:1rem">
          ${q.opciones.map((op, idx) => `<button class="btn btn-ghost" data-opcion="${idx}">${op}</button>`).join('')}
        </div>
        <div id="bio11-exam-fb" style="margin-top:1rem"></div>
      </div>`;
  }
  function bindExamen(unit, uData) {
    const startBtn = document.getElementById('bio11-iniciar-examen');
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

        const opts = document.getElementById('bio11-exam-opts');
        opts.querySelectorAll('[data-opcion]').forEach(b => {
          const k = parseInt(b.getAttribute('data-opcion'), 10);
          b.disabled = true;
          if (k === q.correcta) b.style.borderColor = 'var(--green)';
          if (k === idx && !ok) b.style.borderColor = 'var(--red)';
        });

        if (typeof Photon !== 'undefined' && Photon.react) { try { Photon.react(ok ? 'topic-read' : 'answer-wrong'); } catch (e) {} }

        const esUltima = _examEnCurso.i >= _examEnCurso.preguntas.length - 1;
        document.getElementById('bio11-exam-fb').innerHTML = `
          <div style="border-left:4px solid ${ok ? 'var(--green)' : 'var(--red)'};background:var(--bg-elevated);
                      border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.7rem 1rem;font-size:.88rem;line-height:1.55">
            <strong style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
            <p style="margin:.35rem 0 0;color:var(--text-secondary)">${q.explicacion || ''}</p>
          </div>
          <button class="btn btn-primary btn-sm" id="bio11-exam-next" style="margin-top:.8rem">
            ${esUltima ? 'Finalizar examen' : 'Siguiente pregunta →'}
          </button>`;
        document.getElementById('bio11-exam-next').addEventListener('click', () => {
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
          <button class="btn btn-primary" id="bio11-volver-examen">Volver</button>
        </div>`;
      const b = document.getElementById('bio11-volver-examen');
      if (b) b.addEventListener('click', () => _rerenderExamen(unit));
    }
  }

  /* ================================================================
     MISIÓN FINAL — "Bajo la lupa: la gestión sostenible del agua y el
     Programa Bandera Azul Ecológica" (mismo patrón exacto que
     bio10-u01.js/.../u06.js: awardXP('biologia11-mission-done') UNA
     sola vez, vía missionDone). Caso real citado en el programa
     oficial del MEP, con su terminología precisa.
     ================================================================ */
  const MISION_A_OPCIONES = ['Su gestión sostenible incluye reducir el consumo hídrico en el centro educativo', 'Está vinculado al sistema climático y a otros ciclos globales', 'No tiene ninguna relación con el cambio climático', 'Es un recurso ilimitado que no requiere ninguna gestión'];
  const MISION_A_CORRECTAS = ['Su gestión sostenible incluye reducir el consumo hídrico en el centro educativo', 'Está vinculado al sistema climático y a otros ciclos globales'];
  const MISION_B_OPCIONES = [
    'El Programa Bandera Azul Ecológica',
    'El Programa Sinac de áreas protegidas',
    'El Programa Nacional de Becas',
    'El Programa de reciclaje de plástico'
  ];
  const MISION_B_CORRECTA = 0;
  const MISION_C_OPCIONES = [
    'Acaparar minerales reciclados de forma sostenible por los ecosistemas durante miles de millones de años, para fabricar tecnologías móviles',
    'Que las bacterias del suelo reciclen materia orgánica en una compostera',
    'Que los organismos autótrofos capten energía lumínica durante la fotosíntesis',
    'Que la lluvia disuelva sulfatos de origen exclusivamente natural'
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
      return `<div style="max-width:520px;text-align:center"><h3>✅ Misión completada</h3><p style="color:var(--text-secondary)">Ya entregaste "Bajo la lupa: la gestión sostenible del agua y el Programa Bandera Azul Ecológica".</p></div>`;
    }
    const dLen = _misionD.trim().length;
    return `
      <div style="max-width:600px">
        <h3>💧 Misión: Bajo la lupa — la gestión sostenible del agua y el Programa Bandera Azul Ecológica</h3>
        <p style="color:var(--text-secondary)">Texto base: "El ciclo del agua se relaciona con otros ciclos globales, con el sistema climático, con los recursos hídricos y sus impactos por el cambio climático, con el uso y la disponibilidad del agua dulce, y con su reutilización, recuperación o rehabilitación sostenible. El grupo valora la necesidad de una gestión sostenible del agua y las actuaciones personales y del colectivo local, nacional y global que potencien la gestión sostenible del recurso, enfatizando aquellas que reducen el consumo hídrico en el centro educativo y favorecen las acciones del Programa Bandera Azul Ecológica para centros educativos en la institución. Además, muchos minerales que los ecosistemas de la Tierra han reciclado, durante miles de millones de años, de manera sostenible, son hoy acaparados por la humanidad y utilizados en la fabricación de tecnologías móviles, alterando el ambiente físico, químico y biológico."</p>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">A. Según el texto, ¿qué características tiene el ciclo del agua y su gestión sostenible? <span style="color:var(--text-muted);font-weight:400;font-size:.78rem">(marcá todas las que correspondan)</span></p>
          ${MISION_A_OPCIONES.map(op => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;margin-bottom:.35rem;cursor:pointer">
              <input type="checkbox" data-mision-a="${op}" ${_misionA.includes(op) ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">B. Según el texto, ¿qué programa costarricense impulsa la gestión sostenible del agua en los centros educativos?</p>
          ${MISION_B_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-b" data-mision-b="${i}" ${_misionB === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">C. Según el texto, ¿qué describe la "participación antropogénica insostenible" en los ciclos materiales?</p>
          ${MISION_C_OPCIONES.map((op, i) => `
            <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;margin-bottom:.4rem;cursor:pointer">
              <input type="radio" name="mision-c" data-mision-c="${i}" ${_misionC === i ? 'checked' : ''}> ${op}
            </label>`).join('')}
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:.9rem">
          <p style="font-weight:700;margin:0 0 .5rem">D. Proponé una acción concreta, personal o colectiva, que tu centro educativo podría implementar para reducir su consumo hídrico, inspirada en el Programa Bandera Azul Ecológica.</p>
          <textarea id="mision-d" rows="3" maxlength="${MISION_D_MAX}" placeholder="Escribí tu respuesta (mínimo ${MISION_D_MIN} caracteres)..." style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);padding:.6rem;font-family:inherit;font-size:.88rem">${_misionD}</textarea>
          <p style="font-size:.72rem;color:${dLen >= MISION_D_MIN ? 'var(--green)' : 'var(--text-muted)'};margin:.3rem 0 0">${dLen}/${MISION_D_MAX} caracteres (mínimo ${MISION_D_MIN})</p>
        </div>

        <button class="btn btn-primary" id="bio11-entregar-mision" ${_misionValida() ? '' : 'disabled'} style="${_misionValida() ? '' : 'opacity:.5;cursor:not-allowed'}">Entregar misión</button>
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
        const btn = document.getElementById('bio11-entregar-mision');
        if (btn) {
          const valido = _misionValida();
          btn.disabled = !valido;
          btn.style.opacity = valido ? '' : '.5';
          btn.style.cursor = valido ? '' : 'not-allowed';
        }
      });
    }
    const btn = document.getElementById('bio11-entregar-mision');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!_misionValida()) {
          const fb = document.getElementById('mision-feedback');
          if (fb) fb.textContent = 'Todavía falta completar o corregir alguna parte de la misión.';
          return;
        }
        const _misionYaOtorgada = !!loadUnitData().missionDone;
        patchUnit({ missionDone: true });
        if (!_misionYaOtorgada) awardXP('biologia11-mission-done');
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
     bio10-u01.js/.../u06.js — ver biologia11.js) ─────────────────── */
  window.UNIT_PLUGINS[`${UNIT_ID}:teoria`]      = { render: renderTeoria,      bind: bindTeoria };
  window.UNIT_PLUGINS[`${UNIT_ID}:simuladores`] = { render: renderSimuladores, bind: bindSimuladores };
  window.UNIT_PLUGINS[`${UNIT_ID}:juego`]       = { render: renderJuego,       bind: bindJuego };
  window.UNIT_PLUGINS[`${UNIT_ID}:examen`]      = { render: renderExamen,      bind: bindExamen };
  window.UNIT_PLUGINS[`${UNIT_ID}:mision`]      = { render: renderMision,      bind: bindMision };
})();
