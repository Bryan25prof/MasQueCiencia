# Instrucciones — Publicar HOTFIX-10 PREMIUM en GitHub

Solo 3 archivos cambiaron en todo el proyecto respecto a la versión ya publicada (verificado con `diff -rq` contra el ZIP anterior). Podés aplicar el cambio de la forma más simple: reemplazar esos 3 archivos en tu repositorio ya existente.

## Opción A — Reemplazar archivos sueltos (recomendada, más simple)

1. Abrí tu repositorio local de MásQueCiencia (el mismo de siempre, con GitHub Pages ya activo).
2. Copiá estos 3 archivos desde este ZIP, reemplazando los que ya tenés:
   - `js/units/grade11/g11-u04.js`
   - `js/data/grade11/preguntas-g11-u04.js`
   - `js/data/grade11/banco-pne-g11-u04.js`
3. No hace falta tocar `index.html` ni ningún otro archivo — `atlas-quimico.js`, `moleculas-reales.js` y `molecule-renderer.js` ya estaban en tu repo desde la sesión anterior y no cambiaron.
4. En la terminal, dentro de la carpeta del repo:
   ```
   git add js/units/grade11/g11-u04.js js/data/grade11/preguntas-g11-u04.js js/data/grade11/banco-pne-g11-u04.js CHANGELOG.md HOTFIX_10_REPORT.md
   git commit -m "HOTFIX-10 PREMIUM: Unidad IV — interpretación molecular (Escáner Molecular, comparaciones, examen ampliado, nueva misión)"
   git push
   ```
5. Si usás GitHub Pages desde la rama `main`/`master` (configuración típica), el sitio se actualiza solo, en 1-2 minutos.

## Opción B — Reemplazar el proyecto completo

Si preferís no buscar archivo por archivo, podés reemplazar toda la carpeta del proyecto por el contenido de este ZIP y hacer commit de todo:
```
git add -A
git commit -m "HOTFIX-10 PREMIUM: Unidad IV — interpretación molecular"
git push
```
(Esto sube exactamente los mismos 3 archivos como cambio real — el resto queda idéntico byte a byte, así que Git no mostrará más diferencias que esas.)

## Verificación después de publicar

1. Entrá a tu sitio publicado → Química 11.º → Unidad IV.
2. Pestaña Simuladores: debería aparecer una 4ta tarjeta, **"Escáner Molecular"**.
3. Abrí el Constructor de Grupos Funcionales → al fondo debería aparecer el botón **"🔬 Nivel 2 — Reconocimiento en estructuras completas →"**.
4. Pestaña Teoría: deberían aparecer 9 temas (antes 7) — los 2 nuevos son "Biomoléculas — lo que revela su estructura" y "Comparaciones estructurales directas".
5. Pestaña Misión: debería mostrar **"Laboratorio de Análisis Molecular"** con 3 estructuras químicas dibujadas (no el texto anterior del Río Pacuare).
6. Abrí la consola del navegador (F12) y confirmá que no aparece ningún error rojo al navegar por la unidad.
