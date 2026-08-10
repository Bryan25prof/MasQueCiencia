# Instrucciones — Publicar el SPRINT DE AFINAMIENTO PRE-PNE en GitHub

6 archivos funcionales cambiaron (ninguno nuevo en la arquitectura), más el CHANGELOG y 2 informes nuevos.

## Reemplazar/agregar archivos

1. Abrí tu repositorio local de MásQueCiencia.
2. **Reemplazá estos 6 archivos:**
   - `js/units/grade11/g11-u03.js`
   - `js/units/unit-06.js`
   - `js/shared/molecule-renderer.js`
   - `js/units/grade11/g11-u04.js`
   - `js/data/grade11/preguntas-g11-u04.js`
   - `js/data/grade11/banco-pne-g11-u04.js`
3. **Agregá 2 informes nuevos** (raíz del proyecto):
   - `INFORME_AUDITORIA_ATLAS_QUIMICO.md`
   - `SPRINT_PRE_PNE_REPORT.md`
4. En la terminal, dentro de la carpeta del repo:
   ```
   git add js/units/grade11/g11-u03.js js/units/unit-06.js js/shared/molecule-renderer.js js/units/grade11/g11-u04.js js/data/grade11/preguntas-g11-u04.js js/data/grade11/banco-pne-g11-u04.js INFORME_AUDITORIA_ATLAS_QUIMICO.md SPRINT_PRE_PNE_REPORT.md CHANGELOG.md
   git commit -m "SPRINT PRE-PNE: auditoria Atlas Quimico + Maestro del Mol Premium + distractores + Escaner Molecular + preguntas PNE"
   git push
   ```
5. Si usás GitHub Pages desde la rama `main`/`master`, el sitio se actualiza solo, en 1-2 minutos.

## Verificación después de publicar

1. **Atlas Químico** (Química 11.º → Atlas Químico): interactuá con el Constructor Molecular de la Unidad III (elegí "Doble" o "Triple") y confirmá que las fichas "Alqueno" y "Alquino" se desbloquean.
2. **Maestro del Mol** (Unidad VI → Juego, nivel "Calculista"): jugá varias rondas seguidas y confirmá que nunca se repite la misma cantidad 2 veces seguidas, y que aparecen preguntas sobre partículas (no solo masa/mol).
3. **Estequiometría** (Unidad VI → Simuladores → Balanceador): confirmá que la ecuación se ve con la flecha grande y los coeficientes destacados.
4. **Escáner Molecular** (Química 11.º Unidad IV → Simuladores → Escáner Molecular): acertá un grupo funcional y confirmá que aparece el mensaje "💡 Este grupo también aparece en…".
5. **Examen** (Química 11.º Unidad IV → Examen): hacé un intento y confirmá que aparecen preguntas de razonamiento (¿cuál grupo NO aparece?, ¿cuántos aparecen?, etc.).
6. Abrí la consola del navegador (F12) en cada una de estas pantallas y confirmá que no aparece ningún error rojo.
