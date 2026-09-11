# Mejora FIX11-U03 (Electricidad) — Modo Desafío en Serie y Paralelo

## Contexto

Al revisar el módulo, confirmé que la teoría (Tema 6, con ejemplos numéricos separados para serie/paralelo/mixto) y el Circuit Builder MQC (sliders de V/R₁/R₂/R₃, cálculo en vivo de Req/I/reparto, 3 modos) ya estaban implementados de una mejora anterior a este hilo. Lo que faltaba, y es lo que pediste ahora, era el **Modo Desafío en Serie y en Paralelo** — hasta ahora ese modo solo existía para Mixto.

## Qué cambié

**Archivo modificado:** `js/units/fisica11/fix11-u03.js` (Simulador 2 — Circuit Builder MQC)

- Agregué dos bancos nuevos de 4 rondas cada uno: `CB_RONDAS_SERIE` y `CB_RONDAS_PARALELO` (antes solo existía `CB_RONDAS_MIXTO`).
- Generalicé el Modo Desafío: ahora el botón "Modo Desafío →" aparece en los 3 modos (Serie / Paralelo / Mixto), no solo en Mixto.
- El enunciado, la fórmula guía y la pregunta ("¿Cuál es Req?" / "¿Cuál es I_total?") se adaptan automáticamente según el modo activo.
- Refactor: unifiqué la lógica de cálculo (`_cbCalcularDesafio`) y de selección de rondas (`_cbRondasActuales`) para los 3 modos, en vez de tener funciones separadas por modo — reduce duplicación y riesgo de inconsistencias futuras.
- Actualicé las descripciones (tarjeta del simulador en la lista, y texto introductorio dentro del simulador) para reflejar que ahora se puede practicar Modo Desafío en cualquiera de los 3 tipos de circuito.
- **No toqué** el Modo Explora (sliders, SVG, desglose en vivo) ni el Tema 6 de teoría — ya estaban como pediste.

## Casos de control verificados con Node.js (antes de tocar el código)

**Serie** (Req=R₁+R₂+R₃, I=V/Req):
- V=24V, R=2/4/6Ω → Req=12Ω, I=2A
- V=45V, R=5/6/4Ω → Req=15Ω, I=3A
- V=100V, R=10/15/25Ω → Req=50Ω, I=2A
- V=36V, R=3/5/4Ω → Req=12Ω, I=3A

**Paralelo** (1/Req=1/R₁+1/R₂+1/R₃, I=V/Req):
- V=12V, R=6/6/6Ω → Req=2Ω, I=6A
- V=15V, R=9/9/9Ω → Req=3Ω, I=5A
- V=16V, R=4/8/8Ω → Req=2Ω, I=8A
- V=16V, R=4/4/8Ω → Req=1,6Ω, I=10A

**Mixto** (regresión — sin cambios en su lógica, solo confirmado que sigue igual): Req=4,50Ω / 4,00Ω / 7,00Ω / 8,00Ω según ronda.

## Verificado con Chromium real

- Los 3 modos (Serie, Paralelo, Mixto) muestran el botón "Modo Desafío" correspondiente.
- Completé las 4 rondas de cada uno de los 3 modos: cada respuesta correcta e incorrecta dio el feedback esperado, con los valores exactos calculados arriba. Cero errores de consola.
- Modo Explora: probé mover los 4 sliders (V, R₁, R₂, R₃) en modo Paralelo con V=20V y R₁=R₂=R₃=4Ω — el simulador mostró en vivo Req=1,33Ω, I_total=15,00A, e I por rama=5,00A cada una (correcto: 20/4=5A × 3 ramas = 15A). Coincide con la teoría.
- Regresión completa del sitio (desktop 1440×900, iPhone 414×896, Android 390×844): home, selección de grado, unidades, grade11, tabla periódica, progreso, atlas químico, acerca de — sin errores de consola en ningún viewport.
- Candados de publicación confirmados intactos: `FISICA10_PUBLICO=false` y `FISICA11_PUBLICO=false` siguen ocultando el contenido sin el parámetro de preview correspondiente.
- Verificación específica en mobile (iPhone/Android) del Modo Desafío mixto: el HTML se renderiza correctamente con el enunciado, la fórmula guía y el campo de respuesta, sin overflow horizontal ni errores de consola.

## Archivo entregado

`js/units/fisica11/fix11-u03.js` (reemplaza el de la entrega anterior de esta unidad — Modo Desafío ahora disponible en Serie, Paralelo y Mixto).
