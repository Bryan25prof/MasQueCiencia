# LA CURIOSIDAD — Adenda de Refinamiento de Comportamiento
## Jerarquía de estados y Motion Language definitivo
**Versión 1.0 · EOP-029 · Complementa a `Motion_Guide.pdf` y `LA_CURIOSIDAD_Visual_Concept_Document.md`**

> La identidad visual (núcleo, proporciones, órbitas, partículas, glow) queda **congelada** desde EOP-027/028. Este documento agrega la capa de comportamiento que la propuesta original no especificaba: la identidad debe reconocerse por cómo se mueve, no solo por su forma o color.

---

## 1. Jerarquía de tres niveles

| Nivel | % de los estados | Qué puede cambiar | Estados |
|---|---|---|---|
| **A** | 80% (8 de 10) | Intensidad de halo, velocidad orbital, ritmo de respiración, brillo, color | Reposo, Bienvenida, Desafío, Celebración, Nivel, Ayuda, Esperando, Despedida |
| **B** | 15% (2 de 10) | Todo lo anterior + geometría mínima, dentro de un vocabulario cerrado que no se amplía | Motivación (corazón), Pensando (interrogante) |
| **C** | 5% (reservado) | Sin definir — **no implementado**. Reservado para eventos verdaderamente excepcionales (ej. un hito que ocurra una sola vez en todo el recorrido del estudiante, como completar las 9 unidades por primera vez en la historia de un perfil) | Ninguno todavía |

**Corrección aplicada en este sprint:** Ayuda había recibido geometría de corazón en la primera versión del Diseño B — se retira. Ayuda es Nivel A: cambia únicamente a tono turquesa/azul verdoso, nunca su silueta. La razón, en palabras del propio criterio de dirección: *"eliminar sensación de ternura — no quiero un personaje adorable, quiero un mentor."*

---

## 2. Especificación de comportamiento por estado

### Nivel A

| Estado | Velocidad orbital | Respiración | Halo | Transición de entrada |
|---|---|---|---|---|
| Reposo | 1× (base) | 4.5s | 1× | Ninguna — más un pulso de brillo periódico cada ~7s |
| Bienvenida | 1× | 4.5s | 1.08× | Acercamiento breve (escala +6%, ~1.1s) + una órbita acelera ~2 vueltas y vuelve a la base |
| Desafío | 1.7× | 3.4s | 1.1× | Ninguna — el ritmo más rápido en sí ya comunica tensión |
| Celebración | 1.3× | 3.6s | 1.15× | El halo se expande un 35% durante 1s y regresa — nunca ráfaga de partículas nueva |
| Nivel | 1.05× (deliberadamente moderada, no la más rápida) | 5s | 1.4× | Expansión lenta del halo desde 0 hasta su tamaño final en 2.6s — estabilidad, no velocidad |
| Ayuda | 0.55× | 5.5s | 0.85× | Ninguna — el tono turquesa y el ritmo calmo son suficientes |
| Esperando | 0.15× (casi estático) | 8s | 0.8× | Ninguna — la diferencia con Reposo es exclusivamente esta lentitud extrema |
| Despedida | 0.3×, decayendo | 6s | 0.5×, se contrae en 3s | Las 3 órbitas se encogen a 72% de su tamaño en 3s; el halo se recoge hacia el núcleo — nunca desaparece de golpe |

### Nivel B

| Estado | Geometría | Comportamiento particular |
|---|---|---|
| Motivación | Dos órbitas se funden en un contorno de corazón (vocabulario cerrado, sin ampliar) | El trazo del corazón "vibra" (oscilación de grosor/opacidad cada 180ms, 10 repeticiones) antes de asentarse en un pulso lento — es energía, no una ilustración estática |
| Pensando | Interrogante minúsculo integrado junto a una de las órbitas (nunca centrado ni grande) | El halo se contrae (0.75×), la velocidad orbital baja a 0.7×, y cada ~3.4s las órbitas hacen una pausa breve (~900ms) antes de retomar — simula procesamiento, no decoración |

### Nivel C (reservado, sin implementar)

Se documenta la intención, no el diseño: eventos que ocurren **una sola vez** en la vida de un perfil (no repetibles, no forman parte del ciclo normal de estados) podrían justificar una variación mayor a la permitida en Nivel B. Ejemplos hipotéticos a evaluar en el futuro, no aprobados todavía: completar las 9 unidades por primera vez, o el primer aniversario de uso continuo de un perfil. **No se diseña ni se implementa hasta que se abra explícitamente un sprint para ello.**

---

## 3. Principio rector confirmado

> "La identidad debe venir del comportamiento, no del dibujo."

En la práctica, esto significa que si se silenciara el color de los 10 estados (mismo cian para todos, hipotéticamente), un estudiante que ya conoce a La Curiosidad debería poder distinguir Nivel de Esperando, o Desafío de Despedida, únicamente por cómo se mueven — no por de qué color son.
