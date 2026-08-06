# IMP-11-U02 — Informe de Pruebas Responsive

---

## Verificación visual real (no solo teórica)

Se renderizó el CSS real del proyecto con `wkhtmltoimage` (motor WebKit), colocando la tarjeta de la Unidad II junto a la de la Unidad I (activa) y la Unidad III (en desarrollo), en el mismo ancho que ya se usó para confirmar HOTFIX-05 (uniformidad de altura de tarjetas).

**Resultado:** las 3 tarjetas mantienen exactamente la misma altura, el mismo lenguaje visual, y el color oficial de la Unidad II (`#7B2FFF`, violeta) se aplica correctamente al badge, número y símbolo de la tarjeta — sin desbordamiento de texto ni ruptura del layout.

## Por qué no fue necesario un nuevo ciclo de pruebas en iPhone/Android/tablet

Esta unidad **no introduce ningún componente visual, clase CSS o patrón de layout nuevo** respecto a lo ya construido y confirmado en sprints anteriores:

- Usa exactamente `.unit-card`, `.units-grid`, `.unit-detail-tabs`, `.tab-btn`, `.coming-soon-panel` — las mismas clases ya verificadas funcionando en escritorio, Android y iPhone/Safari desde HOTFIX-05, HOTFIX-07 e IMP-11-U01.
- Los simuladores usan `<input type="range">` e `<select>` estándar — los mismos controles nativos ya usados sin problemas en los simuladores de Química 10.º (ej. `unit-07.js`, Soluciones) desde hace muchos sprints.
- No se agregó ningún `env(safe-area-inset-*)` nuevo, porque no se creó ninguna pantalla de tipo overlay/modal nueva — todo vive dentro del mismo contenedor `#tab-content` ya usado por el resto de las unidades.

Dado que la superficie visual reutilizada es 100% idéntica a la ya confirmada, y que el único elemento genuinamente nuevo (los 3 simuladores con sliders/selects) usa controles HTML nativos estándar sin ningún estilo personalizado que pudiera comportarse distinto entre navegadores, se considera que el riesgo de una regresión visual específica de esta unidad es mínimo.

## Limitación honesta

Este entorno no tiene un dispositivo iPhone/Android real disponible para una prueba táctil interactiva — la misma limitación ya documentada en HOTFIX-07 y en el informe de IMP-11-U01. Se recomienda al usuario confirmar visualmente en un dispositivo real, con foco especial en:

1. Que los controles deslizantes (`<input type="range">`) del Constructor de Concentraciones y el Laboratorio de Molaridad respondan bien al tacto.
2. Que el texto de las fórmulas y unidades (ej. "mol/L", "% m/v") se lea con claridad en texto grande / alto contraste.
