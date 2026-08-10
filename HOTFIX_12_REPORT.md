# HOTFIX-12 — Informe de Implementación
## Sidebar compacto + consistencia de íconos + afinado de la intro

---

## 1. Alcance real

Verificado con `diff -rq` binario contra el ZIP inmediatamente anterior (post-HOTFIX-11): **solo 4 archivos cambiaron, todos ya existentes — ningún archivo nuevo.**

| Archivo | Cambio |
|---|---|
| `index.html` | Sidebar compacto + ícono "Acerca de" + texto por defecto de la intro |
| `css/main.css` | CSS de la tarjeta de usuario y los accesos rápidos, reescrito |
| `css/intro.css` | Estilo de las fichas "mensaje" (M·Q·C) |
| `js/shared/intro.js` | Siembra de letras + frase de desbloqueo actualizada |

## 2. Sidebar compacto

Se aplicó exactamente la dirección aprobada en la maqueta comparativa (Actual vs. Propuesta) del turno anterior.

- **Tarjeta de usuario**: de 4 líneas apiladas (avatar, nombre, nivel, barra de XP) a una sola fila: avatar + nombre + barra de XP a la izquierda, nivel + XP numérico a la derecha.
- **Accesos rápidos**: de 3 filas con ícono + nombre + descripción, a 3 chips en una sola fila con ícono + una palabra. La descripción completa no se perdió — vive como `title=""` (tooltip nativo del navegador al pasar el mouse).
- **Cero riesgo de romper funcionalidad**: se verificó primero qué IDs lee `js/app.js` (`updateUserUI()`) y qué IDs escucha `js/shared/launcher.js` antes de tocar el HTML. Los 6 IDs relevantes (`sidebar-user-name`, `sidebar-user-level`, `sidebar-xp-fill`, `sidebar-xp-text`, `qi-launch-search`, `qi-launch-gloss`, `qi-launch-pne`) se mantuvieron exactamente iguales — ninguno de esos 2 archivos necesitó ningún cambio.

## 3. Ícono de "Acerca de" — consistencia

HOTFIX-11 había actualizado el ícono del *banner* de "Acerca de" (de ℹ️ a ⚛️ con glow), pero dejó sin actualizar el ícono del *ítem de navegación* correspondiente en el sidebar, que seguía mostrando ℹ️. Es lo que se ve en la captura del docente: 2 íconos distintos para la misma sección. Se corrigió para que ambos usen el mismo átomo.

## 4. Intro cinematográfica — 2 afinados

### 4.1 Texto de desbloqueo
"IDENTIDAD VERIFICADA" → **"CARGANDO EXPERIENCIA"**.

### 4.2 La lluvia deja de ser 100% azar — revela "MQC"
Se sembraron 3 columnas específicas de la lluvia con las letras **M, Q, C**, elegidas en posiciones proporcionales al ancho de pantalla (20% / 50% / 80%), recalculadas en cada carga — así funciona igual en un teléfono angosto (mínimo 6 columnas) que en un monitor grande.

**Cómo se ve para el estudiante:** mientras esas 3 fichas caen, se ven exactamente igual que cualquier otro elemento químico (mismo símbolo aleatorio, mismo estilo) — no hay ninguna pista visual de que son especiales. El cambio ocurre en el instante exacto en que el escáner (que ya se movía de izquierda a derecha) llega a esa columna y la congela: en ese momento, y solo en ese momento, el contenido cambia a la letra sembrada, con un realce violeta distinto del blanco genérico de las demás fichas congeladas. Como el escáner se mueve de izquierda a derecha y las 3 columnas están en ese mismo orden, la palabra **"MQC" se lee de forma natural, letra por letra, según el escáner va pasando.**

## 5. Pruebas ejecutadas

| # | Prueba | Método | Resultado |
|---|---|---|---|
| 1 | Sintaxis de todo el proyecto | `node --check` en el 100% de los `.js` | ✅ |
| 2 | Sin IDs duplicados ni `<div>` desbalanceados en `index.html` | Verificación con Python/regex | ✅ |
| 3 | Las 3 columnas de mensaje (M/Q/C) caen dentro de rango y nunca chocan | Simulación en Node en 7 anchos de pantalla (320px–1920px) | ✅ |
| 4 | Alcance: solo 4 archivos existentes cambiaron, ninguno nuevo | `diff -rq` binario contra el ZIP post-HOTFIX-11 | ✅ |
| 5 | `js/app.js` y `js/shared/launcher.js` no necesitaron cambios | Confirmado por la prueba 4 (0 diferencias en esos archivos) | ✅ |

**Limitación honesta:** igual que en los HOTFIX anteriores, este entorno no tiene navegador real — no se puede confirmar visualmente el resultado final desde acá. Se recomienda una revisión rápida en el navegador antes de publicar, prestando atención especial a que el tooltip de los accesos rápidos se lea bien en móvil (donde no hay hover).
