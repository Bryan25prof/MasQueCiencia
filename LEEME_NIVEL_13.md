# Nivel 13 — el tope de XP deja de recortar el XP legítimo

Un solo archivo, un solo commit: `js/core/gamification.js` (54,436 B). Incluye los comentarios del pendiente 6 (MQC_PENDIENTE6_XP_RESERVADAS.zip): si subes este, no necesitas subir aquel.

## Problema
El máximo legítimo del pool histórico (3 ciencias) es 25,710 XP (26,300 con la Tabla Periódica), pero el último nivel estaba en 22,000 y `addXP` recorta el total a ese valor: quien completaba todo perdía XP legítimo.

## Cambio
- Se agrega el **nivel 13 «Leyenda de las Ciencias» 🌠 en 27,000 XP** (nombre provisional; tuyo decidirlo).
- `MAX_XP` ya se derivaba del último nivel, así que el tope pasa solo a 27,000. Niveles 1-12: mismos umbrales, nombres e íconos → **nadie cambia de nivel por este cambio**.
- El nivel 13 solo se alcanza al terminar todo y acumular unos ~70 días de login diario (10 XP/día) sobre el máximo legítimo.
- Mi Progreso arma su tabla de niveles con `getAllLevels()`, así que mostrará el 13 automáticamente.

## No cambia
Acumuladores XP 2.0, rangos por ciencia, migración, Bitácora, Storage, perfiles, Analytics. El historial de XP sigue en 100 eventos (no se tocó).

Commit sugerido: `Nivel 13 (27000 XP): el tope de XP ya no recorta el maximo legitimo`
Pruebas locales 8/8 (umbrales 1-12 intactos; bordes 0/199/200/21999/22000/26999/27000; 25,700+10 ya no se recorta; 26,990+10 → nivel 13 y tope; regresión de XP por ciencia). La pantalla Mi Progreso no se pudo probar en mi copia local (no trae progress.js): revisarla en producción tras subir. Ctrl+F5 (caché ~10 min).
