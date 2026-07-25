# LA CURIOSIDAD
## Visual Concept Document — Dirección Artística Oficial
**Versión 1.0 · EOP-026 (Visual Concept Approval) · Estado: propuesta del Director de Arte, para aprobación**

> Este documento define **cómo debe verse** "La Curiosidad", en cumplimiento estricto de `LA_CURIOSIDAD_Character_Design_Document.md` (EOP-025, ya aprobado y congelado). No contiene activos finales — ni PNG, ni SVG, ni animación implementada. Es la dirección de arte que gobernará cualquier ilustración futura.

---

## 0. Método de este documento

Se presentan primero tres propuestas conceptuales completas (A, B, C), cada una evaluada contra el Character Design Document. Al final, como Director de Arte del proyecto, se recomienda **una sola dirección** con su justificación — no se deja la decisión abierta.

---

## 1. Las tres propuestas conceptuales

### A — Energía Pura (minimalista)

Un único punto de luz con bloom suave, como mucho un solo anillo orbital finísimo, sin partículas visibles en reposo. La reducción máxima de vocabulario visual: si se pudiera quitar un elemento más y seguir siendo reconocible, se quita.

**Ventajas**
- Escala perfecta a cualquier tamaño, especialmente a 16px — no hay detalle que perder.
- Es la opción más atemporal: imposible que se vea "pasada de moda" en 3 años.
- Máxima coherencia con el principio "memorable por contención, no por espectáculo" del Character Design Document.
- La más barata de animar e implementar técnicamente.

**Desventajas**
- Riesgo real de **no ser reconocible como personaje**: a primera vista puede leerse como un simple indicador de carga o un cursor, no como una entidad con identidad propia.
- Silueta poco distintiva — comparado con Octocat (orejas de gato) o Clyde (forma de fantasma), no tiene un rasgo único que un estudiante pueda dibujar de memoria.
- Poco margen para expresar los 10 estados oficiales de forma diferenciable si el vocabulario visual es demasiado reducido.

### B — Energía Científica (más tecnológica)

Núcleo de luz con 2-3 anillos orbitales finos pero geométricamente precisos (inclinados, en perspectiva, como una órbita real vista de canto — no círculos planos), con motas de luz puntuales y definidas (no difusas) recorriendo esas órbitas. El glow es contenido, con un borde relativamente definido antes de difuminarse. La paleta se comporta con precisión de instrumento: cada estado tiene una transición de color clara y medible, no ambigua.

**Ventajas**
- Es la que mejor cumple, palabra por palabra, la instrucción explícita del Character Design Document de que el personaje debe sentirse **"elegante, premium, científico"** — de las tres, es la única que estas tres palabras describen sin matices.
- Silueta reconocible: el sistema de anillos inclinados en perspectiva ya es, desde sprints anteriores, un rasgo distintivo propio de MQC (no genérico).
- Escala razonablemente bien: a 16px se simplifica a "núcleo + un anillo", que sigue siendo identificable.
- Conecta visualmente con el resto del lenguaje de la plataforma (Tabla Periódica, visualizaciones de MQCChem, diagramas orbitales) sin *ser* literalmente un átomo — hay parentesco de familia, no imitación.

**Desventajas**
- Mayor riesgo de sentirse "frío" o impersonal si no se calibra bien el glow — puede debilitar los rasgos de personalidad "optimismo" y "acompañamiento".
- Requiere más disciplina de animación para no verse como un diagrama técnico estático.
- Ligeramente más compleja de renderizar que A en tamaños muy pequeños (aunque sigue siendo viable).

### C — Energía Cósmica (más emocional)

Halo grande y difuso, colores más cálidos en las transiciones, órbitas elípticas asimétricas (menos "diagrama", más "danza"), y un motivo de estela/cola de partículas que se desprende y se disuelve (eco de la ilustración de referencia recibida en un sprint anterior). El glow pulsa de forma más expresiva según el estado emocional.

**Ventajas**
- La mayor calidez emocional de las tres — la que mejor transmite "acompañamiento" y "optimismo" de forma inmediata.
- La estela/cola es un rasgo de silueta fuerte y único, con alto potencial de reconocibilidad (comparable a cómo el gesto o la forma distinguen a otras mascotas de producto).
- Conecta con el tono "museo interactivo de ciencia" (Kurzgesagt/Cosmos) que ya es parte del lenguaje general de la plataforma.

**Desventajas**
- Es, de las tres, la que corre **mayor riesgo real de violar las reglas de NO uso** del Character Design Document — específicamente "nunca caricatura", "nunca videojuego" — si la ejecución no es extremadamente disciplinada. Es la dirección más cercana a la que ya se exploró y se descartó explícitamente en un sprint anterior (la mascota con rostro).
- La cola/estela es la más difícil de escalar a 16px sin perder toda su identidad (a esa escala tendría que eliminarse por completo, generando una versión "favicon" que se ve como un personaje distinto).
- Mayor complejidad de animación para mantener elegancia — el margen de error entre "elegante" y "efectista" es más estrecho que en A o B.

---

## 2. Decisión del Director de Arte

**Dirección recomendada: B — Energía Científica**, con un único préstamo deliberado de la propuesta C: un bloom secundario, suave y difuso, detrás del glow principal contenido (nunca una cola de partículas, nunca una estela).

**Justificación:**

1. El propio Character Design Document nombra explícitamente "elegante", "premium" y "científico" como las tres cualidades no negociables de su lenguaje visual — no "emocional" ni "cósmico". B es la única propuesta que estas tres palabras describen sin necesitar matices ni excepciones.
2. El riesgo más peligroso para este personaje, documentado en sus propias reglas de NO uso, es deslizarse hacia la caricatura — ya ocurrió una vez en este proyecto y se corrigió explícitamente. B es la dirección con menor superficie de riesgo hacia ese error; C es la de mayor riesgo.
3. A es visualmente más segura que C, pero insuficiente: arriesga la reconocibilidad del personaje como entidad memorable, un objetivo explícito de este sprint ("tan reconocible como Duo, Octocat, Clyde, Bugdroid"). B conserva ese nivel de seguridad sin sacrificar identidad.
4. B es la que mejor conversa con el resto del lenguaje visual ya construido en la plataforma (retículas moleculares del Portal de Entrada, tendencia a diagramas orbitales, tipografía técnica JetBrains Mono) — no introduce un lenguaje visual nuevo que compita con lo ya aprobado.
5. El único préstamo de C (bloom secundario difuso) es suficiente para resolver la única debilidad real de B — el riesgo de frialdad — sin heredar ninguno de sus riesgos de caricatura o de escalabilidad.

**Esta es la dirección oficial recomendada. A y C quedan documentadas como alternativas evaluadas y descartadas, no como opciones abiertas.**

---

## 3. Especificación de la dirección aprobada (B, con bloom secundario de C)

### 3.1 Concepto artístico general

Una entidad de energía con la precisión visual de un instrumento científico y la calidez mínima de un ser vivo. Si tuviera que describirse en una imagen de referencia no literal: un satélite de investigación visto de cerca, en la oscuridad del espacio, con una luz interior que respira.

### 3.2 Proporciones del núcleo de energía

El núcleo ocupa aproximadamente el **28-32% del diámetro total** de la composición (incluyendo halo y órbitas). Es una esfera, nunca un óvalo ni una forma irregular. Debe leerse como el centro de gravedad visual e informativo de toda la figura — todo lo demás (órbitas, halo, partículas) orbita/rodea, nunca compite en protagonismo con el núcleo.

### 3.3 Intensidad del halo

Dos capas de halo, no una:
- **Halo primario** (interno, ligado al núcleo): contenido, de borde relativamente definido, intensidad moderada — comunica el estado con precisión.
- **Halo secundario** (préstamo de C): mucho más difuso, de menor opacidad, apenas perceptible en reposo — aporta la calidez sin comprometer la nitidez general.

Regla: el halo nunca debe ser tan intenso que oscurezca la nitidez del núcleo o de los anillos orbitales. La precisión siempre gana sobre el brillo.

### 3.4 Cantidad de órbitas

**Tres** anillos orbitales, no más, no menos. Tres es el número mínimo que comunica "sistema" en vez de "aro decorativo único", y el máximo que se mantiene legible sin volverse ruido visual, incluso en tamaños medianos.

### 3.5 Forma de las órbitas

Elípticas, en perspectiva (inclinadas, nunca círculos perfectamente planos de frente) — como un anillo visto desde un ángulo, no un aro dibujado en 2D. Cada uno de los tres anillos con una inclinación y velocidad de rotación levemente distintas entre sí, para que la composición nunca se sienta simétrica ni mecánica.

### 3.6 Tipo de partículas

Motas de luz puntuales y definidas (no difusas, no en forma de estrella de cuatro picos, no con estela). Una única partícula viajando por cada anillo en reposo. Partículas ambientales adicionales (sueltas, no orbitando) solo aparecen en estados de mayor intensidad (Celebración, Nivel) y se disuelven sin dejar rastro — nunca cola, nunca estela continua.

### 3.7 Paleta cromática oficial

Reutiliza sin excepción la paleta ya aprobada de la Identidad Visual v2.0 de MQC — este personaje no introduce ni un solo color nuevo:

| Estado | Color |
|---|---|
| Reposo / Bienvenida | Cian `#1FDBFF` |
| Motivación | Verde `#00FF88` |
| Desafío | Oro `#FFD700` / `--xp-gold` `#F9FF4D` |
| Celebración | Violeta `#7B2FFF` |
| Nivel | Oro intenso (máxima saturación e intensidad disponible) |
| Ayuda | Rosa suave `#FF8FAE` (nunca el rojo de error/`--red`, que se reserva para alertas del sistema, no para La Curiosidad) |
| Pensando / Esperando | Cian atenuado, brillo reducido |
| Despedida | Cian atenuado, tendiendo a un violeta muy tenue, brillo decreciente |

### 3.8 Comportamiento del glow

El halo primario responde con precisión al estado (intensidad y tamaño mapean directamente a `brightness`/`haloMul`, ya definidos técnicamente en `photon.js`). El halo secundario (bloom) solo debe variar en opacidad, nunca en color propio — siempre hereda el tono del estado activo, nunca introduce un segundo color simultáneo.

### 3.9 Tamaño recomendado en pantalla

- **Tamaño de acompañamiento estándar** (la mayoría de sus apariciones): 56-64px de diámetro total.
- **Tamaño de celebración** (Nivel, Celebración, fin de curso): hasta 120-140px, nunca más de un octavo del ancho de la pantalla en desktop.
- **Tamaño mínimo funcional**: 24px — por debajo de eso, usar la variante de favicon (ver 3.12), no una reducción proporcional del diseño completo.

### 3.10 Integración con fondos oscuros

Es su hábitat natural — toda la plataforma MQC ya usa un fondo oscuro (`--void`/`--bg-deep`) como base. El halo y el glow están calibrados sobre esa base. No requiere ajuste adicional.

### 3.11 Integración con fondos claros

MQC no tiene actualmente ninguna superficie de fondo claro en su Design System — pero si en el futuro se necesitara (ej. materiales impresos, un modo claro), el núcleo debe ganar un borde de contorno sutil (1px, del mismo color del estado activo, a baja opacidad) para no perderse contra un fondo blanco, y el halo secundario (bloom) debe desactivarse por completo en fondos claros — sobre blanco, un bloom difuso solo ensucia la imagen en vez de aportar profundidad.

### 3.12 Escalabilidad (16px hasta pantallas grandes)

Se definen 3 niveles de detalle (no un solo archivo escalado):
- **Nivel "Favicon" (16-24px):** núcleo + halo primario únicamente. Sin anillos, sin partículas — a ese tamaño se perderían y ensuciarían la imagen.
- **Nivel "Estándar" (32-140px):** especificación completa de este documento — núcleo, 2 halos, 3 anillos, partículas.
- **Nivel "Celebración" (140px+):** especificación completa más el permiso explícito de partículas ambientales adicionales durante Celebración/Nivel, dentro de las reglas ya definidas (nunca estela, nunca patrón simétrico).

Ningún nivel reinterpreta al personaje — cada uno es un recorte de detalle del mismo diseño único, nunca una versión alternativa.

---

## 4. Qué sigue (fuera de alcance de este documento)

Una vez aprobada esta dirección, el desarrollo del paquete oficial de activos puede comenzar:

`Photon_Master` · `Photon_SVG` · `Photon_Idle` · `Photon_Glow` · `Photon_Orbit` · `Photon_Particles` · `Motion Guide` · `Sound Guide` · `Brand Assets`

Cada uno de esos activos debe poder trazarse directamente a una sección específica de este documento (ej. `Photon_Orbit` implementa §3.4-3.5 sin desviación) y, más arriba, a `LA_CURIOSIDAD_Character_Design_Document.md`. Ninguna decisión de esos activos puede contradecir lo aquí definido sin reabrir un sprint de dirección visual.
