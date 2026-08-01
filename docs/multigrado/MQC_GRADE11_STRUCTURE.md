# MQC — Estructura de Química 11.º
**Fase 1 — Metadata e infraestructura visual, sin contenido académico todavía**

---

## 1. Convención de identificadores

Se evaluaron las 2 convenciones sugeridas por el EOP:

- `grade11-unit-01`, `grade11-unit-02`, ...
- `g11-u01`, `g11-u02`, ...

**Se eligió `g11-u01`..`g11-u04`** por ser la más corta y la más fácil de diferenciar a simple vista de `unit-01`..`unit-09` (Química 10.º) al leer el código — el prefijo `g11-` es inconfundible sin ser largo. Documentado acá para que cualquier desarrollo futuro de estas unidades use la misma convención sin ambigüedad.

**Nunca se reutilizan** `unit-01`..`unit-04` — esos IDs ya pertenecen permanentemente a Química 10.º.

## 2. Archivo de metadata

`js/data/unidades-grade11.js` — expone `window.GRADE11_UNIDADES_DATA`, un arreglo de 4 objetos:

```js
{
  id: 'g11-u01', grade: 11, num: 1,
  title: 'El Agua', shortName: 'El Agua',
  description: 'Propiedades, comportamiento e importancia química del agua.',
  color: '#1FDBFF', icon: '💧', status: 'development',
  theory: null, simulators: null, game: null, exam: null,
  mqcExperience: null, pneBank: null
}
```

Las 4 unidades:

| ID | Título | Ícono | Color |
|---|---|---|---|
| `g11-u01` | El Agua | 💧 | Cian `#1FDBFF` |
| `g11-u02` | Cálculo de concentraciones | ⚗️ | Violeta `#7B2FFF` |
| `g11-u03` | Química Orgánica I *(Introducción, alcanos, alquenos y alquinos)* | ⬡ | Verde `#5CF2A8` |
| `g11-u04` | Grupos funcionales y biomoléculas | 🧬 | Naranja `#FFA94D` |

Todas con `status: 'development'` y sus campos de contenido futuro (`theory`, `simulators`, `game`, `exam`, `mqcExperience`, `pneBank`) explícitamente `null` — no se inventó contenido académico, tal como exigía el EOP. La Unidad III tiene además un campo `subtitle` ("Introducción, alcanos, alquenos y alquinos") que las otras 3 no necesitan.

## 3. Progreso futuro — mismo patrón que décimo

`data.grade11` en el esquema de Storage usa exactamente la misma forma que `data.units` (vía `_emptyUnit()`):

```js
{ started:false, completed:false, topicsRead:[], simsDone:[], gameScore:0, examBest:0, examAttempts:0 }
```

Esto es intencional: cuando cada unidad de 11.º se desarrolle en el futuro, encajará en el **mismo sistema de tracking de progreso** que ya usan las 9 de décimo, sin necesitar ningún cambio de esquema adicional.

## 4. Vista "Química 11.º" — reutilización visual total

`js/modules/grade11.js` reutiliza literalmente las mismas clases CSS que la vista de Unidades de décimo:

- `.units-grid` — el mismo contenedor de grilla (hereda automáticamente el ajuste de altura uniforme de HOTFIX-05, sin ningún CSS adicional).
- `.unit-card` / `.unit-card-locked` — misma tarjeta, mismo lenguaje visual de "bloqueado/en desarrollo" que ya se usaba para la tarjeta PNE.
- `.unit-badge`, `.unit-number`, `.unit-symbol`, `.unit-name`, `.unit-meta`, `.unit-meta-item-clamp` — todos reutilizados sin modificación.

**Cero líneas de CSS nuevas** fueron necesarias para esta vista — es la evidencia de que la reutilización del Design System fue completa, tal como exigía el EOP ("Debe reutilizar exactamente: Design System MQC, tarjetas, fondos, tipografía...").

## 5. Comportamiento al hacer clic (mientras todo esté "En desarrollo")

Ninguna tarjeta abre una pantalla vacía. El clic muestra una vista informativa con:

- Nombre y descripción real de la unidad (tomados de `GRADE11_UNIDADES_DATA`).
- El texto exacto pedido por el EOP: *"Esta experiencia se encuentra en desarrollo. Tu acceso a Química 11.º ya está preparado. El contenido de esta unidad se incorporará en una próxima actualización."*
- Un solo botón: "Volver a Química 11.º" — sin botones falsos de teoría, simulador, juego o examen.

## 6. Qué falta para que una unidad deje de estar "en desarrollo"

Cuando llegue el momento de desarrollar, por ejemplo, `g11-u01`:

1. Reemplazar sus campos `null` en `unidades-grade11.js` con contenido real (siguiendo el mismo patrón que `js/data/unidades.js` usa para las unidades de décimo).
2. Cambiar `status: 'development'` a `status: 'active'` (o el valor que se decida).
3. Construir su archivo `js/units/g11-u01.js` (mismo patrón arquitectónico que `unit-0X.js`).
4. `grade11.js` necesitará una condición para renderizar contenido real en vez de la tarjeta "en desarrollo" cuando `status !== 'development'` — no implementado todavía, ya que ninguna unidad llegó a ese estado en esta fase.
