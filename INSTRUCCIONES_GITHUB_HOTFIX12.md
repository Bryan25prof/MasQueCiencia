# Instrucciones — Publicar HOTFIX-12 en GitHub

Solo 4 archivos (ya existentes, ninguno nuevo) cambiaron respecto a la versión anterior.

## Reemplazar archivos

1. Abrí tu repositorio local de MásQueCiencia.
2. Reemplazá estos 4 archivos:
   - `index.html`
   - `css/main.css`
   - `css/intro.css`
   - `js/shared/intro.js`
3. En la terminal, dentro de la carpeta del repo:
   ```
   git add index.html css/main.css css/intro.css js/shared/intro.js CHANGELOG.md HOTFIX_12_REPORT.md
   git commit -m "HOTFIX-12: sidebar compacto, icono Acerca de consistente, intro afinada (MQC oculto + nuevo texto)"
   git push
   ```
4. Si usás GitHub Pages desde la rama `main`/`master`, el sitio se actualiza solo, en 1-2 minutos.

## Verificación después de publicar

1. Abrí el sidebar — la tarjeta de usuario debería verse en una sola fila (avatar, nombre y XP a la izquierda; nivel y XP numérico a la derecha), y los 3 accesos rápidos como chips compactos (ícono + palabra) en una fila.
2. Pasá el mouse sobre cada chip de acceso rápido — debería aparecer un tooltip con la descripción completa (ej. "Buscar — Encuentra lo que necesitas").
3. Navegá a "Acerca de" — el ícono en el sidebar (junto al texto "Acerca de") y el ícono grande del banner deberían ser el mismo átomo (⚛️).
4. Para ver la intro de nuevo, borrá el localStorage del sitio (o abrilo en una pestaña/navegador nuevo) — confirmá que el texto ya dice "CARGANDO EXPERIENCIA" en vez de "IDENTIDAD VERIFICADA".
5. Durante la lluvia de elementos, prestá atención a las fichas que el escáner va congelando de izquierda a derecha — deberían aparecer, en orden, las letras M, Q y C con un realce violeta (distinto del blanco de las demás).
6. Abrí la consola del navegador (F12) y confirmá que no aparece ningún error rojo.
