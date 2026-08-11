# Instrucciones — Publicar HOTFIX-13 en GitHub

5 archivos cambiaron (ninguno nuevo).

## Reemplazar archivos

1. Reemplazá estos 5 archivos en tu repositorio:
   - `index.html`
   - `css/main.css`
   - `css/intro.css`
   - `js/shared/intro.js`
   - `js/shared/profiles-ui.js`
2. En la terminal:
   ```
   git add index.html css/main.css css/intro.css js/shared/intro.js js/shared/profiles-ui.js CHANGELOG.md HOTFIX_13_REPORT.md
   git commit -m "HOTFIX-13: intro se repite hasta crear perfil real, fix scroll iOS, compuerta de sonido"
   git push
   ```

## Verificación después de publicar (especialmente en iPhone real)

1. **Intro repetible**: borrá el localStorage del sitio (o abrí en incógnito), cargá la página — debería aparecer la compuerta "Toca para comenzar". Tocala, mirá la intro completa, pero **no crees un perfil todavía** (cerrá la pestaña en la pantalla de perfiles). Volvé a abrir el sitio — la intro debería aparecer de nuevo (antes no aparecía).
2. **Sonido desde el inicio**: al tocar "Toca para comenzar", deberías escuchar los beeps de la consola de arranque inmediatamente, sin tener que tocar nada más.
3. **Formulario de perfil en iPhone**: en un iPhone real, avanzá hasta "Crear tu perfil científico" — deslizá el dedo hacia abajo dentro de esa pantalla y confirmá que ahora sí se puede llegar hasta el botón "Crear y entrar", incluido el grid completo de insignias.
4. Una vez que crees un perfil real, recargá la página — ahora sí la intro NO debería volver a aparecer (confirmando que el "para siempre" funciona correctamente).
5. Consola del navegador (F12) sin errores rojos en ninguna de estas pantallas.
