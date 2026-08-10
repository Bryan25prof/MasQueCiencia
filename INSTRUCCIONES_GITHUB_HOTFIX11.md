# Instrucciones — Publicar HOTFIX-11 en GitHub

Solo 5 rutas cambiaron en todo el proyecto respecto a la versión ya publicada (verificado con `diff -rq` contra el ZIP anterior).

## Opción A — Reemplazar/agregar archivos sueltos (recomendada)

1. Abrí tu repositorio local de MásQueCiencia.
2. **Agregá 2 archivos nuevos:**
   - `css/intro.css`
   - `js/shared/intro.js`
3. **Reemplazá 3 archivos existentes:**
   - `index.html`
   - `css/main.css`
   - `js/core/router.js`
4. En la terminal, dentro de la carpeta del repo:
   ```
   git add css/intro.css js/shared/intro.js index.html css/main.css js/core/router.js CHANGELOG.md HOTFIX_11_REPORT.md
   git commit -m "HOTFIX-11: intro cinematografica de ingreso + rotulo de marca fijo + Acerca de actualizado"
   git push
   ```
5. Si usás GitHub Pages desde la rama `main`/`master`, el sitio se actualiza solo, en 1-2 minutos.

## Opción B — Reemplazar el proyecto completo

```
git add -A
git commit -m "HOTFIX-11: intro cinematografica de ingreso + rotulo de marca fijo + Acerca de actualizado"
git push
```
El resto del proyecto queda idéntico byte a byte, así que Git no mostrará más diferencias que esas 5 rutas.

## Verificación después de publicar

1. Entrá a tu sitio publicado **desde un navegador o pestaña donde nunca lo hayas abierto antes** (o borrá el localStorage del sitio) — así verás la intro completa.
2. Confirmá la secuencia completa: consola → lluvia de elementos → escáner cruzando de izquierda a derecha → "IDENTIDAD VERIFICADA" → laboratorio + Photon → "Todo listo." / "Comencemos." → pantalla de marca con el crédito "Lic. Bryan Chavarría C." arriba del título y la frase "Tú defines tu éxito, comienza ahora."
3. Presioná "Entrar al laboratorio" — deberías caer directo en la plataforma real, sin ninguna pantalla ficticia de por medio.
4. **Recargá la página** — la intro NO debería volver a aparecer (queda guardada en `localStorage`).
5. Si tenés un perfil ya creado de antes de esta actualización, abrí el sitio de nuevo (con la intro ya vista) y confirmá que **Photon aparece con normalidad en el sidebar**, como siempre.
6. Navegá a "Acerca de la Plataforma" (desde el sidebar/menú) y confirmá: el ícono ahora es un átomo (⚛️) con un brillo cian/violeta pulsante, y el texto describe la plataforma como "Química Interactiva 10.º y 11.º".
7. Mirá el encabezado del sidebar (o la barra superior en móvil) — debería decir siempre "QUÍMICA INTERACTIVA 10.º Y 11.º", sin importar en qué sección estés navegando.
8. Abrí la consola del navegador (F12) y confirmá que no aparece ningún error rojo.
