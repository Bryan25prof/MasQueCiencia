# HOTFIX — Correcciones U06/U07/U08 + Sistema de Juego Unificado (Física 10°, 11°, Química)

**Fecha:** 2026-09-10
**Estado:** Probado con Chromium real en las 10 unidades de Física.

---

## 1. Bug real: "click fantasma" al reclickear una pestaña activa

**Causa encontrada:** el manejador de clic de las pestañas no verificaba si ya se estaba en esa misma pestaña. Al reclickear (por ejemplo "Simuladores" estando ya ahí, con un simulador en curso), se volvía a renderizar y re-vincular todo, generando el comportamiento errático descrito.

**Corrección:** guarda simple `if (_currentTab === btn.dataset.tab) return;` — aplicada en los 4 módulos con este patrón:
- `js/modules/fisica10.js`
- `js/modules/fisica11.js`
- `js/modules/units.js` (Química 10.°)
- `js/modules/grade11.js` (Química 11.°)

**Confirmado con Chromium:** reclickear la pestaña activa mientras un simulador muestra opciones de predicción ahora no dispara nada — el texto permanece idéntico.

## 2. Orbit Lab (U07) — "anular esta función"

**Causa encontrada:** el slider de velocidad disparaba un re-render completo en el evento `input` (continuo mientras se arrastra), reemplazando el propio slider a mitad del arrastre.

**Corrección:** cambiado a `change` (dispara una sola vez al soltar).

## 3. Unidad 6 — Force Lab

- Aclarado "Fx" (fuerza sobre el eje horizontal) en las etiquetas de Modo Explora y Modo Desafío.
- Corregido el formato de μ: siempre 2 decimales con coma (μ=0 ahora se ve "0,00", no solo "0").
- Reducido de 10 a 5 rondas en Modo Desafío (3 de fuerza neta, 2 de aceleración).
- Verificado: "Fuerza elástica y Ley de Hooke" es la terminología correcta (la fórmula usada es F=-kx, que es fuerza, no energía potencial elástica) — se dejó como estaba.

## 4. Unidad 8 — Energy Lab y Power Lab

- Redacción corregida: "En este instante está a Xm de altura" → "En el instante que se encuentra a Xm de altura".
- Diversificadas las 4 rondas de Power Lab (antes 3 de las 4 eran el mismo patrón "mismo trabajo, comparar tiempo"; ahora cada ronda evalúa un caso distinto, incluyendo un caso de potencias iguales pese a datos distintos).

## 5. Sistema de juego unificado (el cambio más grande)

**Antes:** cada juego mostraba la lista completa de niveles de una sola vez, con un botón "Resolver" en cada uno — visualmente abrumador.

**Ahora:** funciona igual que el examen — una pregunta a la vez, empezando en el primer nivel pendiente (respeta el progreso ya guardado), avanzando automáticamente al acertar. Aplicado en las 10 unidades de Física:

- Física 10.°: FIX10-U01 a U08 (8 archivos)
- Física 11.°: FIX11-U01, FIX11-U02 (2 archivos)

**Confirmado con Chromium:**
- Las 7 unidades de Física 10.° revisadas (además de U06 que fue la plantilla) empiezan directo en "Nivel 1", sin lista de niveles.
- Las 2 unidades de Física 11.° confirmadas igual.
- Flujo completo probado: falla → se queda en el mismo nivel; acierta → avanza al siguiente; completa todos → pantalla de "¡Completaste los N niveles!".

## 6. Pendiente — no incluido en esta entrega

**Química (10.° y 11.°)** todavía tiene el patrón viejo de "lista de niveles" en sus propios juegos — no se tocó en esta ronda, dado el volumen ya cubierto. Si querés que lo aplique ahí también, avisame y sigo con esos archivos.

## 7. Archivos modificados (14)

- `js/modules/fisica10.js`, `js/modules/fisica11.js`, `js/modules/units.js`, `js/modules/grade11.js` (guarda de pestañas)
- `js/units/fisica10/fix10-u01.js` a `fix10-u08.js` (sistema de juego unificado; U06/U07/U08 además con sus fixes específicos)
- `js/units/fisica11/fix11-u01.js`, `fix11-u02.js` (sistema de juego unificado)

## 8. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Bug original (reclick en pestaña activa durante simulador) ya no ocurre | ✅ |
| Orbit Lab: slider ya no se re-renderiza en cada movimiento | ✅ |
| Force Lab: 5 rondas, Fx visible, μ con 2 decimales | ✅ |
| Power Lab: 4 rondas diversificadas | ✅ |
| Juego unificado en las 7 unidades de Física 10.° revisadas | ✅ |
| Juego unificado en las 2 unidades de Física 11.° | ✅ |
| Flujo completo (fallar/acertar/avanzar/completar todos) | ✅ |
| No regresión general: Química, PNE, navegación | ✅ Sin errores de consola, desktop/iPhone/Android |
