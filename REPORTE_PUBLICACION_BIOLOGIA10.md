# Publicación de Biología 10.º — reporte breve

**Autorización:** explícita de Bryan (mensaje "AUTORIZO PUBLICAR BIOLOGÍA 10.º").
**Alcance:** únicamente retirar las banderas de ocultamiento. No se tocó contenido, preguntas, XP, progreso, Storage, perfiles, Analytics, Supabase, Biología 11.º, Química ni Física.

## Archivos modificados (2) — subir en UN SOLO commit

| Archivo | Cambio (1 línea cada uno) |
|---|---|
| `js/modules/biologia10.js` | `BIOLOGIA10_PUBLICO = false` → `true` (puerta real de contenido) |
| `js/shared/mqc-biologia-flags.js` | `biologia10Publico: false` → `true` (puerta de las pantallas de descubrimiento) |

Las demás pantallas que decidían si invitar a Biología 10.º (menú lateral, "Selecciona tu ruta científica", "Elegí tu año", "Acerca de la Plataforma") ya leen estas mismas banderas desde la publicación de 11.º, así que no necesitan ningún cambio.

## Verificación previa a producción (comparación contra tu sitio en vivo)

Antes de preparar la entrega comparé, byte por byte, los 166 archivos que carga `index.html` contra tu sitio. **Las 9 unidades de Biología 10.º, sus 9 bancos, `biologia10.js` (salvo la bandera), `storage.js`, `grade-select.js`, `sidebar-nav.js`, `router.js` y todo Biología 11.º ya coinciden con el proyecto.** No falta ningún archivo de Biología 10.º en producción, así que con estos 2 archivos basta.

## Pruebas ejecutadas en el proyecto (estudiante real, sin ningún preview) — 63/63 exitosas, 0 errores de JavaScript

Escritorio (1280 px) y móvil (390 px):
- Banderas Bio10 = true, Bio11 = true; ningún preview en el navegador.
- "Selecciona tu ruta científica": Biología = Disponible. "Elegí tu año": botones "Continuar" activos en 10.º y 11.º, ninguna tarjeta bloqueada.
- Menú lateral (escritorio): abre el panel con 10.º y 11.º, sin "próximamente".
- Grilla de Biología 10.º: 9 unidades "Disponible", 0 "En desarrollo", sin desbordamiento horizontal en móvil.
- **Las 9 unidades (BIO10-U01 a U09), en ambos tamaños:** las 5 pestañas (teoría, simuladores, juego, examen, misión) renderizan sin texto roto; la teoría tiene sus temas; simuladores, juego, examen y misión tienen sus controles.
- Interacciones reales en U05: se abre un tema, el examen inicia y muestra preguntas, el primer simulador arranca.

Perfiles existentes:
- Perfil con progreso previo en Química 10.º, Física 10.º, Biología 11.º y Biología 10.º: los 4 porcentajes y todo el bloque de datos (units, grade11, fisica10/11, biologia10/11, xp, xpQuimica/Fisica/Biologia) quedan idénticos tras navegar; la tarjeta de BIO10-U01 muestra el % ya guardado.
- Docente verificado: explora Biología 10.º sin que se guarde progreso (guarda de Pendiente D intacta).

Regresión: Química 10.º, Física 10.º, Física 11.º y Biología 11.º (5 unidades) cargan normal; "Acerca de" ahora dice "Biología — Disponible". Suite de AccessControl: 60/60.

Pruebas antiguas que ya no aplican (describían Biología 10.º como oculta): bloque E de `e2e-biologia10`, TEST 1 y 5 de la publicación de 11.º, y las pruebas de sidebar/Elegí tu año que esperaban "10.º en desarrollo". No son errores de la aplicación.

## Verificación en producción

**Pendiente hasta que subas el commit.** Cuando avises, reviso tu sitio en vivo (escritorio y móvil, las 9 unidades y sus pestañas, un perfil con progreso, Química y Física) y te entrego el resultado.

Nota de caché: GitHub Pages guarda archivos hasta ~10 min. Si no lo ves de inmediato, Ctrl + F5 o ventana privada.

## Cómo subirlo

```
git add js/modules/biologia10.js js/shared/mqc-biologia-flags.js
git commit -m "Publicar Biologia 10.o: 9 unidades visibles para estudiantes"
git push
```

## Observación aparte (no se tocó, no bloquea esta publicación)

En la comparación contra producción aparecieron 33 archivos que difieren del proyecto, sin relación con Biología 10.º: `js/core/xp2.js` no existe en tu sitio (404; el código lo maneja sin romperse), las unidades de Química y Física (`unit-01..09`, `g11-u01..04`, `fix10-u01..08`, `fix11-u01..06`) tienen diferencias pequeñas, y también `home.js`, `progress.js`, `periodic-table.js`, `app.js`. Además `analytics-config.js` en producción es distinto al del proyecto (probablemente tu configuración real de Supabase: **no lo reemplaces con el del proyecto**). Esto coincide con tu decisión de no migrar XP 2.0 todavía; lo dejo documentado para el diagnóstico de XP que viene.
