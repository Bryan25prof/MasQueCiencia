# MQC — Reglas de Desbloqueo de Química 11.º
**Fase 1 Multigrado**

---

## 1. Las 2 rutas (basta con cualquiera)

| Ruta | Condición | Umbral |
|---|---|---|
| **A** | Exámenes de Química 10.º aprobados | ≥ 6 de 9 |
| **B** | Mejor resultado histórico del Desafío Final PNE | ≥ 80/100 |

**No se exige cumplir ambas.** No se exige: todos los juegos, todos los simuladores, todas las insignias, el Proyecto Integrador, 9/9 exámenes, ni un nivel de XP específico — todo esto fue verificado explícitamente para NO formar parte de la condición.

## 2. Dónde vive la lógica (un solo lugar)

`js/core/gamification.js` → `checkBadges(data, skipPhotonReaction)`. Esta función ya se llama de forma amplia en todo el proyecto (tras cada `Gamification.addXP()`, al abrir Mi Progreso, al abrir el selector de ruta académica, etc.), así que es el punto correcto para revisar el desbloqueo sin necesitar tocar ninguna de las 9 unidades ni el módulo de PNE.

```js
const examsPassed = UNIDADES_DATA.filter(u => (data.units[u.id].examBest||0) >= (u.exam.pass||70)).length;
const pneBest = data.pne.bestScore || 0;
const routeA = examsPassed >= 6;
const routeB = pneBest >= 80;
if (routeA || routeB) { /* desbloquear */ }
```

## 3. Registro guardado al desbloquear

```js
grade11Unlock: {
  unlocked: true,
  method: "six-exams" | "pne-80",
  unlockedAt: <timestamp>,
  evidence: {
    examsPassed: <número real de exámenes aprobados en ese momento>,
    pneBestScore: <mejor puntuación PNE en ese momento>
  }
}
```

`method` registra **cuál** de las 2 rutas realmente disparó el desbloqueo (si por casualidad se cumplen ambas al mismo tiempo, se prioriza Ruta A en el chequeo, pero esto es un detalle de implementación sin relevancia práctica ya que cualquiera de las 2 alcanza).

## 4. Qué pasa cuando se cumple

- Se guarda `grade11Unlock` de inmediato (con guardado explícito en Storage — ver nota en §5).
- Se otorga la insignia **"Ruta de Undécimo Desbloqueada"** (única insignia nueva de esta fase, según lo permitido por el EOP).
- Reacciona La Curiosidad con el estado **"nivel"** (`Photon.react('level-up')`) — el reconocimiento más alto ya disponible en el sistema, sin crear ningún estado nuevo.
- Se muestra una notificación: *"¡Química 11.º desbloqueada!"* con el texto correspondiente a la ruta que se cumplió.

## 5. Por qué el guardado necesitó una línea explícita adicional

`checkBadges()` solo llamaba a `Storage.save(data)` **dentro** del bloque que se ejecuta si hay una insignia nueva. El desbloqueo de 11.º sí otorga una insignia (así que ese camino coincide), pero el **bloqueo de identidad** (ver `MQC_PROFILE_IDENTITY_SECURITY.md`) no siempre otorga una — así que, sin cuidado, ese cambio se habría perdido en silencio la primera vez que ocurriera sin una insignia acompañante. Se agregó una bandera `_multigradoChanged` y un `Storage.save(data)` explícito, independiente del guardado condicional existente, para garantizar que ambos cambios (identidad y desbloqueo) persistan siempre que ocurran.

## 6. El desbloqueo nunca se revierte

Una vez `grade11Unlock.unlocked === true`, la condición `!data.grade11Unlock.unlocked` en el chequeo nunca vuelve a evaluarse como verdadera para ese perfil — no importa si el mejor PNE baja después (no puede bajar en la práctica, ya que `pne.bestScore` solo aumenta, pero se verificó explícitamente con una prueba que simula ese escenario de todas formas) ni si ninguna otra condición cambia. **Verificado con prueba dedicada** en `MQC_MULTIGRADE_QA_REPORT.md`.

## 7. Umbrales verificados en el límite exacto

| Escenario | Resultado esperado | Verificado |
|---|---|---|
| 5 exámenes aprobados | NO desbloquea | ✅ |
| 6 exámenes aprobados | SÍ desbloquea | ✅ |
| PNE 79/100 | NO desbloquea | ✅ |
| PNE 80/100 | SÍ desbloquea | ✅ |

## 8. Dónde se muestra el progreso hacia el desbloqueo

- **Selector de ruta académica** (`grade-select`): dos barras de progreso, una por ruta, mostrando el avance real hacia cada umbral (ej. "4 de 6 exámenes requeridos", "Mejor resultado PNE: 76/100").
- **Vista Química 11.º** (`grade11`), mientras está bloqueada: mensaje de requisitos con ambas rutas.
- **Mi Progreso**: sección "Acceso a Química 11.º" con el estado (bloqueado/desbloqueado), y si está desbloqueado, qué ruta y cuándo.
