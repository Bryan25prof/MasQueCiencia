# XP 2.0 — rangos de Biología, migración segura y Bitácora (reporte breve)

**Autorización:** "YA TODO CERRÓ" (Biología 11.º cerrada en 5 unidades) + "continúa" con los umbrales de la propuesta.
**No incluido (esperan tu decisión):** nivel 13 del tope heredado (27 000 XP), subir el historial de 100 a 200 eventos, y la interfaz de rangos en Mi Progreso (primero maqueta).

## Qué cambia

**Commit A — Bitácora (solo presentación)**
| Archivo | Cambio |
|---|---|
| `js/shared/profiles.js` | `_gradeOf`: Biología se clasifica `biologia10` / `biologia11` por grado (sin grado queda `biologia`, solo visible en "Todo"). Rótulos nuevos para misiones, Desafío Final PNE e Integrador (antes "Actividad"). |
| `js/shared/profiles-ui.js` | Filtros **Biología 10.º** y **Biología 11.º** en la vista cronológica. (Versión de 87 481 bytes = la de producción; el cambio es una línea + comentario.) |

**Commit B — XP 2.0**
| Archivo | Cambio |
|---|---|
| `js/core/xp2.js` | **Archivo nuevo en producción** (hoy da 404). Rangos de Biología: 0 · 450 · 1 400 · 3 000 · 5 400 · 7 700 (Semilla Curiosa, Observador de la Vida, Explorador de Ecosistemas, Biólogo en Formación, Guardián de la Biodiversidad, Leyenda de la Biología). `calcularXPVerificableBiologia` ya no devuelve 0: reconstruye desde `data.biologia10/11` (máximo 8 145). **`ensureMigrated` conserva el MAYOR entre el acumulador actual y la reconstrucción**, en las tres ciencias: evita que la migración borre el XP que Biología, Física y Química ya acumularon. |
| `js/core/gamification.js` | Una línea: `getXP2Summary()` devuelve el rango de Biología (antes `null`). |

Química y Física: umbrales sin cambio (0 · 500 · 1 500 · 3 200 · 5 800 · 8 500).

## Verificación contra producción (SHA-256 de los archivos vivos)
`gamification.js`, `storage.js`, `profiles.js` y `profiles-ui.js` que usé como base son **idénticos byte a byte** a los de tu sitio. `index.html` ya carga `xp2.js` (hoy sin efecto por el 404), así que no hay que tocarlo.

## Pruebas (app real, Chromium, escritorio y móvil)
- Suite nueva **29/29**: fronteras exactas de los 6 rangos (449/450 … 7 699/7 700); reconstrucción: 14 unidades = 8 145, 10.º = 5 295, 11.º = 2 850, BIO10-U01 = 585, U09 = 615, BIO11-U04 = 555, juego 3 niveles = 90 y 5 niveles = 180, examen solo si aprobó; migración: acumulador en vivo de Biología (900) y Física (120) **no bajan**, acumulador 0 con progreso se reconstruye, histórico/nivel/medallas/unidades intactos, idempotente; Bitácora: eventos por grado, evento sin grado no se inventa, filtros, rótulos, PNE sigue en su pestaña; móvil 390 px sin desborde con 8 filtros.
- Regresión **9/9**: perfil `[object Object]` se repara (4 905, nivel 6) y convive con la migración; flujo real por la interfaz (abrir BIO10-U01 y leer un tema suma 25 + 15 solo a Biología, y la Bitácora lo ve como Biología 10.º); Química/Física/transversal siguen enrutando bien, global = Q + F + B.

## Cómo subirlo (dos commits, en este orden)
```
git add js/shared/profiles.js js/shared/profiles-ui.js
git commit -m "Bitacora: Biologia 10.o y 11.o con filtros y rotulos"
git add js/core/xp2.js js/core/gamification.js
git commit -m "XP 2.0: rangos de Biologia y migracion que conserva el XP acumulado"
git push
```
**Importante:** `xp2.js` y `gamification.js` van en el mismo commit. No toques `analytics-config.js`. Tras subir: Ctrl + F5; GitHub Pages tarda hasta ~10 min.

## Efecto esperado al subir
Al cargar cada perfil, XP 2.0 se migra una sola vez (sin mostrar nada nuevo: ninguna pantalla usa aún los rangos). Los estudiantes no verán cambios salvo los dos filtros nuevos y los rótulos de la Bitácora.
