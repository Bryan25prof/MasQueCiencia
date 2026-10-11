# Corrección conservadora del XP "[object Object]" — reporte breve

**Autorización:** "corrección conservadora" (Bryan). No se inició XP 2.0, Bitácora, Simulacro, cantones ni auditoría.

## Causa (diagnóstico)
Los archivos nuevos de unidades llaman `Gamification.addXP(fuente, { disciplina, grado })`. Si el navegador/servidor tenía un `gamification.js` **antiguo**, ese segundo parámetro era el *monto*: el objeto se sumaba al total y JavaScript lo convirtió en texto (`4805` + `[object Object]` + `25`+`25`…). Con el total convertido en texto: el nivel se quedaba en 1, la medalla `xp-1000` no se otorgaba y el valor dañado se guardaba para siempre.

## Qué hace la corrección (3 capas)
1. **`js/core/storage.js` — autorreparación al cargar el perfil.** Si `xp.total` no es número: recupera el último total sano (prefijo numérico) y suma solo los montos válidos posteriores del historial → ejemplo reportado: `4805[object Object]25252525` → **4905**. Recalcula el nivel, anula (monto 0) la entrada dañada del historial conservando su `disciplina`/`grado`, guarda el valor original en `xp.reparado` (constancia) y persiste. Es idempotente, **subestima antes que sobreestimar** y no toca unidades, exámenes, PNE ni medallas. Perfil sano: cero escrituras.
2. **`js/core/gamification.js` — blindaje.** `addXP` ignora cualquier monto que no sea número finito (texto, NaN, objeto, arreglo, Infinity) y usa la recompensa normal; el monto numérico manual sigue funcionando. Se exporta `calcLevelForXP` (solo lectura) para la reparación.
3. **`js/shared/profiles.js` — solo presentación.** La lista de perfiles (que lee el JSON crudo de perfiles no activos) muestra siempre un número.

## Archivos (3) — subir en UN SOLO commit
`js/core/storage.js`, `js/core/gamification.js`, `js/shared/profiles.js`
(Los dos primeros deben ir juntos: la reparación usa `calcLevelForXP`. Aunque falte, no rompe: deja el nivel pendiente.)

## Pruebas
- Nueva suite `e2e-xp-reparacion.js`: **16/16** (lista de perfiles, reparación, nivel, historial, constancia, persistencia, unidades intactas, idempotencia, suma posterior numérica 4930, blindaje, caso sin entrada dañada → 1200, perfil sano sin cambios, invitado).
- Regresión: AccessControl 60/60; publicación Bio10 63/63; sidebar 114 ok (2 pruebas antiguas que esperaban Bio10 "en desarrollo").
- `node --check` limpio en los 3 archivos.

## Efecto esperable (avisar)
- Un perfil reparado con ≥ 1000 XP recibirá la medalla **`xp-1000`** y su nivel subirá al que le corresponde: es el mecanismo normal funcionando, no una concesión nueva.
- Si el valor real del estudiante era mayor (la entrada dañada ya había salido de las 100 del historial), se recupera solo el prefijo sano: queda por debajo, nunca por encima.
- `analytics-config.js`: **no lo reemplaces** (el de producción tiene tu configuración real).
- `js/core/xp2.js` sigue sin existir en producción; esta corrección no depende de él.
- Caché: Ctrl + F5 tras subir (GitHub Pages ~10 min).

## Cómo subirlo
```
git add js/core/storage.js js/core/gamification.js js/shared/profiles.js
git commit -m "Reparar XP corrupto ([object Object]) de forma conservadora y blindar addXP"
git push
```
Para verificar: abre el perfil que revisaste (el que mostraba "Object"); debe mostrar un XP numérico y el nivel correcto. Si me pasas ese valor exacto, confirmo el total esperado.
