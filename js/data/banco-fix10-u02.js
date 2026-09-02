/* ================================================================
   MÁSQUECIENCIA — js/data/banco-fix10-u02.js
   FIX10-U02 — Cantidades escalares y vectoriales
   Banco de 50 preguntas. Distribución pedida por el sprint:
   25% conceptual · 25% interpretación gráfica/visual (SVG inline,
   sin imágenes externas) · 35% cálculo (variedad de magnitudes y
   ángulos, no solo 3-4-5) · 15% aplicación/contexto (GPS/rutas).
================================================================ */
function _svgVectorMini(vx, vy, color) {
  const cx = 60, cy = 60, escala = 0.4;
  const px = cx + vx * escala, py = cy - vy * escala;
  return `<svg viewBox="0 0 120 120" width="110" height="110" style="background:#161a3d;border-radius:8px;display:block;margin:.5rem 0">
    <line x1="0" y1="60" x2="120" y2="60" stroke="#2a2f5c" stroke-width="1"/>
    <line x1="60" y1="0" x2="60" y2="120" stroke="#2a2f5c" stroke-width="1"/>
    <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${color}" stroke-width="3"/>
    <circle cx="${px}" cy="${py}" r="4" fill="${color}"/>
  </svg>`;
}

const PREGUNTAS_FIX10_U02 = [
  /* ══════ CONCEPTUAL (~25%, 12-13 preguntas) ══════ */
  { id: 'fix10u02-01', tema: 't1', pregunta: '¿Qué caracteriza a una cantidad escalar?', opciones: ['Queda completamente definida solo con su magnitud', 'Siempre necesita una dirección para tener sentido', 'Solo puede medirse con instrumentos de laboratorio', 'Nunca tiene una unidad de medida asociada'], correcta: 0 },
  { id: 'fix10u02-02', tema: 't1', pregunta: '¿Qué caracteriza a una cantidad vectorial?', opciones: ['Además de magnitud, tiene dirección y sentido', 'Nunca puede representarse gráficamente', 'Solo puede tener valores negativos', 'No requiere ninguna unidad de medida'], correcta: 0 },
  { id: 'fix10u02-03', tema: 't1', pregunta: '¿Cuál de las siguientes es una cantidad escalar?', opciones: ['La masa', 'La fuerza', 'El desplazamiento', 'La velocidad'], correcta: 0 },
  { id: 'fix10u02-04', tema: 't1', pregunta: '¿Cuál de las siguientes es una cantidad vectorial?', opciones: ['La aceleración', 'El volumen', 'El tiempo', 'La temperatura'], correcta: 0 },
  { id: 'fix10u02-05', tema: 't2', pregunta: 'Los vectores consecutivos se caracterizan porque:', opciones: ['Cada uno empieza donde terminó el anterior', 'Todos parten de un mismo punto', 'Tienen siempre la misma magnitud', 'Nunca pueden sumarse entre sí'], correcta: 0 },
  { id: 'fix10u02-06', tema: 't2', pregunta: 'Los vectores concurrentes se caracterizan porque:', opciones: ['Todos parten de, o llegan a, un mismo punto', 'Cada uno empieza donde terminó el anterior', 'Siempre tienen dirección opuesta entre sí', 'No pueden representarse gráficamente'], correcta: 0 },
  { id: 'fix10u02-07', tema: 't2', pregunta: 'Los vectores opuestos se caracterizan porque:', opciones: ['Tienen la misma magnitud pero dirección contraria', 'Tienen distinta magnitud y la misma dirección', 'Siempre parten del mismo punto', 'Nunca pueden tener la misma magnitud'], correcta: 0 },
  { id: 'fix10u02-08', tema: 't3', pregunta: '¿Qué es la distancia recorrida por un objeto?', opciones: ['La medida de toda la trayectoria recorrida (escalar)', 'La línea recta entre el punto inicial y final (vectorial)', 'Siempre es igual al desplazamiento', 'Se mide únicamente en segundos'], correcta: 0 },
  { id: 'fix10u02-09', tema: 't3', pregunta: '¿Qué es el desplazamiento?', opciones: ['La línea recta que une el punto inicial con el final del recorrido', 'La medida total de la trayectoria recorrida', 'Una cantidad que nunca tiene dirección', 'Lo mismo que la rapidez'], correcta: 0 },
  { id: 'fix10u02-10', tema: 't3', pregunta: '¿Cuál es la principal diferencia entre rapidez y velocidad?', opciones: ['La rapidez es escalar y la velocidad es vectorial', 'Son exactamente lo mismo, solo cambia el nombre', 'La velocidad nunca tiene unidades', 'La rapidez siempre es mayor que la velocidad'], correcta: 0 },
  { id: 'fix10u02-11', tema: 't4', pregunta: '¿En qué consiste el método de las componentes para sumar vectores?', opciones: ['Descomponer cada vector en su componente x y su componente y, y sumarlas por separado', 'Medir directamente con una regla la longitud de cada vector', 'Sumar únicamente las magnitudes, sin considerar ángulos', 'Solo se puede aplicar a un vector a la vez'], correcta: 0 },
  { id: 'fix10u02-12', tema: 't6', pregunta: '¿Cuántas mediciones de distancia a satélites se necesitan, como mínimo, para determinar la posición con GPS?', opciones: ['4', '1', '2', '10'], correcta: 0 },
  { id: 'fix10u02-13', tema: 't1', pregunta: 'La frase "50 km" (sin ninguna otra información) describe una cantidad:', opciones: ['Escalar, porque no especifica ninguna dirección', 'Vectorial, porque incluye una dirección', 'Ninguna de las dos, porque no tiene unidad', 'Vectorial, porque incluye un sentido'], correcta: 0 },

  /* ══════ INTERPRETACIÓN GRÁFICA/VISUAL (~25%, 12-13 preguntas, con SVG) ══════ */
  { id: 'fix10u02-14', tema: 't5', pregunta: `${_svgVectorMini(70, 70, '#7B2FFF')}¿En qué cuadrante apunta este vector?`, opciones: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'], correcta: 0 },
  { id: 'fix10u02-15', tema: 't5', pregunta: `${_svgVectorMini(-70, 70, '#7B2FFF')}¿En qué cuadrante apunta este vector?`, opciones: ['Cuadrante II', 'Cuadrante I', 'Cuadrante III', 'Cuadrante IV'], correcta: 0 },
  { id: 'fix10u02-16', tema: 't5', pregunta: `${_svgVectorMini(-70, -70, '#7B2FFF')}¿En qué cuadrante apunta este vector?`, opciones: ['Cuadrante III', 'Cuadrante I', 'Cuadrante II', 'Cuadrante IV'], correcta: 0 },
  { id: 'fix10u02-17', tema: 't5', pregunta: `${_svgVectorMini(70, -70, '#7B2FFF')}¿En qué cuadrante apunta este vector?`, opciones: ['Cuadrante IV', 'Cuadrante I', 'Cuadrante II', 'Cuadrante III'], correcta: 0 },
  { id: 'fix10u02-18', tema: 't5', pregunta: `${_svgVectorMini(90, 0, '#1FDBFF')}¿Cuál es el signo de las componentes Vx y Vy de este vector?`, opciones: ['Vx positivo, Vy = 0', 'Vx negativo, Vy positivo', 'Vx = 0, Vy positivo', 'Vx negativo, Vy negativo'], correcta: 0 },
  { id: 'fix10u02-19', tema: 't5', pregunta: `${_svgVectorMini(0, 90, '#1FDBFF')}¿Cuál es el signo de las componentes Vx y Vy de este vector?`, opciones: ['Vx = 0, Vy positivo', 'Vx positivo, Vy = 0', 'Vx negativo, Vy = 0', 'Vx = 0, Vy negativo'], correcta: 0 },
  { id: 'fix10u02-20', tema: 't2', pregunta: 'En la representación gráfica de un vector, ¿qué representa la longitud de la flecha?', opciones: ['La magnitud', 'El sentido', 'La unidad de medida', 'El sistema de referencia'], correcta: 0 },
  { id: 'fix10u02-21', tema: 't2', pregunta: '¿Cómo se denota gráficamente un vector, según la convención usual?', opciones: ['Con una letra y una flecha en la parte superior', 'Únicamente con números romanos', 'Con un círculo alrededor de la magnitud', 'Nunca se le asigna una letra'], correcta: 0 },
  { id: 'fix10u02-22', tema: 't3', pregunta: 'Un excursionista camina 3 km al norte y luego 4 km al este. ¿Qué tipo de vectores son esos dos tramos entre sí?', opciones: ['Consecutivos', 'Concurrentes', 'Opuestos', 'Ninguno de los anteriores'], correcta: 0 },
  { id: 'fix10u02-23', tema: 't3', pregunta: 'Tres cables sostienen la misma lámpara, todos anclados al mismo gancho del techo. ¿Qué tipo de vectores son?', opciones: ['Concurrentes', 'Consecutivos', 'Opuestos', 'Ninguno de los anteriores'], correcta: 0 },
  { id: 'fix10u02-24', tema: 't3', pregunta: 'Dos personas empujan una puerta desde lados exactamente opuestos, con la misma fuerza. ¿Qué tipo de vectores son esas fuerzas?', opciones: ['Opuestos', 'Consecutivos', 'Concurrentes', 'Ninguno de los anteriores'], correcta: 0 },
  { id: 'fix10u02-25', tema: 't4', pregunta: 'Para sumar vectores consecutivos gráficamente, se procede así:', opciones: ['Se coloca cada vector a continuación del anterior, uno tras otro', 'Se colocan todos superpuestos en el mismo punto exacto', 'Se suman solo sus magnitudes, ignorando la dirección', 'No es posible sumarlos gráficamente'], correcta: 0 },
  { id: 'fix10u02-26', tema: 't4', pregunta: 'Al sumar vectores concurrentes gráficamente, todos los vectores se dibujan:', opciones: ['Desde un mismo punto de partida, con su magnitud y dirección exactas', 'Uno detrás de otro, en fila', 'Siempre en direcciones opuestas entre sí', 'Sin necesidad de indicar ninguna dirección'], correcta: 0 },

  /* ══════ CÁLCULO (~35%, 17-18 preguntas, variedad de magnitudes/ángulos) ══════ */
  { id: 'fix10u02-27', tema: 't5', pregunta: 'Un vector tiene magnitud V = 100 y ángulo θ = 0° (apunta al Este). ¿Cuáles son sus componentes Vx y Vy?', opciones: ['Vx = 100, Vy = 0', 'Vx = 0, Vy = 100', 'Vx = 50, Vy = 50', 'Vx = -100, Vy = 0'], correcta: 0 },
  { id: 'fix10u02-28', tema: 't5', pregunta: 'Un vector tiene magnitud V = 80 y ángulo θ = 90° (apunta al Norte). ¿Cuáles son sus componentes Vx y Vy?', opciones: ['Vx = 0, Vy = 80', 'Vx = 80, Vy = 0', 'Vx = 40, Vy = 40', 'Vx = 0, Vy = -80'], correcta: 0 },
  { id: 'fix10u02-29', tema: 't5', pregunta: 'Un vector tiene magnitud V = 60 y ángulo θ = 180°. ¿Cuáles son sus componentes Vx y Vy (aproximadamente)?', opciones: ['Vx = -60, Vy = 0', 'Vx = 60, Vy = 0', 'Vx = 0, Vy = -60', 'Vx = 0, Vy = 60'], correcta: 0 },
  { id: 'fix10u02-30', tema: 't5', pregunta: 'Un vector tiene magnitud V = 40 y ángulo θ = 270°. ¿Cuáles son sus componentes Vx y Vy (aproximadamente)?', opciones: ['Vx = 0, Vy = -40', 'Vx = -40, Vy = 0', 'Vx = 0, Vy = 40', 'Vx = 40, Vy = 0'], correcta: 0 },
  { id: 'fix10u02-31', tema: 't5', pregunta: 'Si ΣX = 300 m y ΣY = 400 m, ¿cuál es la magnitud del vector resultante (teorema de Pitágoras)?', opciones: ['500 m', '700 m', '100 m', '350 m'], correcta: 0 },
  { id: 'fix10u02-32', tema: 't5', pregunta: 'Si ΣX = 6 m y ΣY = 8 m, ¿cuál es la magnitud del vector resultante?', opciones: ['10 m', '14 m', '2 m', '48 m'], correcta: 0 },
  { id: 'fix10u02-33', tema: 't5', pregunta: 'Si ΣX = 9 m y ΣY = 12 m, ¿cuál es la magnitud del vector resultante?', opciones: ['15 m', '21 m', '3 m', '108 m'], correcta: 0 },
  { id: 'fix10u02-34', tema: 't5', pregunta: 'Al sumar dos vectores exactamente opuestos (misma magnitud, direcciones contrarias), el vector resultante tiene:', opciones: ['Magnitud cero', 'El doble de la magnitud de uno de ellos', 'La misma dirección que ambos vectores originales', 'Una magnitud imposible de calcular'], correcta: 0 },
  { id: 'fix10u02-35', tema: 't5', pregunta: 'Dos vectores de igual magnitud y misma dirección (no opuestos) se suman. La magnitud resultante es:', opciones: ['El doble de la magnitud de uno de ellos', 'Cero', 'La mitad de la magnitud de uno de ellos', 'Siempre 90°'], correcta: 0 },
  { id: 'fix10u02-36', tema: 't5', pregunta: 'Un vector A = 200 m al Este se suma con un vector B = 200 m al Oeste. ¿Cuál es la magnitud del vector resultante?', opciones: ['0 m', '400 m', '200 m', '100 m'], correcta: 0 },
  { id: 'fix10u02-37', tema: 't4', pregunta: 'Un recorrido de 100 m al Este, 100 m al Norte y 100 m al Oeste, ¿cuánta distancia total se recorrió?', opciones: ['300 m', '100 m', '200 m', '0 m'], correcta: 0 },
  { id: 'fix10u02-38', tema: 't4', pregunta: 'En el mismo recorrido anterior (100 m Este, 100 m Norte, 100 m Oeste), ¿cuál es la componente en x del desplazamiento final (Este menos Oeste)?', opciones: ['0 m', '100 m', '200 m', '300 m'], correcta: 0 },
  { id: 'fix10u02-39', tema: 't4', pregunta: 'Un atleta recorre 400 m en una pista circular y termina en el mismo punto donde partió. ¿Cuál es su desplazamiento?', opciones: ['0 m', '400 m', '200 m', 'No se puede determinar'], correcta: 0 },
  { id: 'fix10u02-40', tema: 't4', pregunta: 'Si un carro recorre 150 km en 3 horas en línea recta y sin desviarse, su rapidez media es:', opciones: ['50 km/h', '450 km/h', '3 km/h', '147 km/h'], correcta: 0 },
  { id: 'fix10u02-41', tema: 't4', pregunta: 'Un ciclista recorre 10 km, pero termina a solo 6 km en línea recta de su punto de partida. Distancia y desplazamiento en este caso:', opciones: ['Son distintos: 10 km de distancia, 6 km de desplazamiento', 'Son siempre iguales', 'El desplazamiento siempre es mayor que la distancia', 'No se pueden calcular en este caso'], correcta: 0 },
  { id: 'fix10u02-42', tema: 't5', pregunta: 'Un vector tiene componentes Vx = 30 y Vy = 40. ¿Cuál es su magnitud?', opciones: ['50', '70', '10', '1200'], correcta: 0 },
  { id: 'fix10u02-43', tema: 't5', pregunta: 'Un vector tiene componentes Vx = -5 y Vy = 12. ¿Cuál es su magnitud?', opciones: ['13', '17', '7', '60'], correcta: 0 },

  /* ══════ APLICACIÓN / CONTEXTO (~15%, 7-8 preguntas) ══════ */
  { id: 'fix10u02-44', tema: 't6', pregunta: '¿Cómo mide un receptor GPS la distancia a un satélite?', opciones: ['Midiendo el tiempo que tarda la señal de radio del satélite en llegar', 'Pesando el satélite desde la Tierra', 'Midiendo directamente con una cinta métrica', 'A través de un cable físico'], correcta: 0 },
  { id: 'fix10u02-45', tema: 't6', pregunta: '¿Qué tipo de cantidad es el desplazamiento que finalmente calcula un sistema GPS?', opciones: ['Vectorial, ya que tiene magnitud y dirección', 'Escalar, ya que solo importa la distancia total', 'Ninguna de las dos, es solo un número', 'Siempre igual a cero'], correcta: 0 },
  { id: 'fix10u02-46', tema: 't6', pregunta: 'El funcionamiento del GPS combina:', opciones: ['Mediciones escalares (como el tiempo) y resultados vectoriales (como la posición)', 'Únicamente cantidades escalares, sin ningún vector', 'Únicamente cantidades vectoriales, sin ningún escalar', 'Ninguna cantidad física medible'], correcta: 0 },
  { id: 'fix10u02-47', tema: 't6', pregunta: 'La "triangulación" en el contexto del GPS se refiere a:', opciones: ['Calcular la posición en base a la distancia medida a varios satélites', 'Un tipo de antena usada solo en teléfonos', 'Un método exclusivo para medir el tiempo', 'Una unidad de medida de velocidad'], correcta: 0 },
  { id: 'fix10u02-48', tema: 't4', pregunta: 'Un dron vuela 200 m al Este y luego 150 m al Norte para inspeccionar un cultivo. ¿Qué representa mejor la línea recta entre su punto de partida y su posición final?', opciones: ['Su desplazamiento', 'Su distancia recorrida', 'Su rapidez', 'Su tiempo de vuelo'], correcta: 0 },
  { id: 'fix10u02-49', tema: 't5', pregunta: 'Un ingeniero necesita calcular la fuerza resultante sobre una estructura a partir de varias fuerzas con distintas direcciones. ¿Qué método es más preciso para eso?', opciones: ['El método de las componentes (Pitágoras + tangente inversa)', 'Medir la fuerza total con una balanza', 'Sumar solo las magnitudes sin considerar la dirección', 'No es posible calcular una fuerza resultante'], correcta: 0 },
  { id: 'fix10u02-50', tema: 't1', pregunta: 'Un piloto reporta "velocidad 250 km/h, rumbo 30° Noreste". ¿Por qué esta información es una cantidad vectorial y no solo un número?', opciones: ['Porque incluye tanto la magnitud (250 km/h) como la dirección (rumbo 30° NE)', 'Porque 250 es un número muy grande', 'Porque los aviones siempre reportan cantidades vectoriales', 'Porque no tiene ninguna unidad de medida'], correcta: 0 }
];
