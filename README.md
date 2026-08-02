# MásQueCiencia (MQC)

### Plataforma Interactiva de Química • 10.° y 11.° Año (MEP Costa Rica) · Beta v1.1

**MásQueCiencia (MQC)** es una plataforma educativa interactiva de química desarrollada para la Educación Diversificada del Ministerio de Educación Pública (MEP) de Costa Rica.

Actualmente incorpora la ruta completa de **Química de 10.° Año** y la arquitectura académica de **11.° Año**, permitiendo la continuidad del progreso del estudiante entre ambos niveles mediante un sistema de perfiles, gamificación y evaluación progresiva.

La plataforma está desarrollada íntegramente con **HTML5, CSS3 y JavaScript puro**, sin frameworks, sin backend y sin procesos de compilación (build), funcionando completamente en el navegador.

> **Proyecto, arquitectura de software y contenido académico:**  
> **Lic. Bryan Chavarría C.**
---

## Descripción

MQC cubre las 9 unidades del programa oficial de Química de Décimo Año, cada una con teoría, simuladores interactivos, un minijuego y un examen — más un Proyecto Integrador final que conecta las 9 unidades en un caso real. Todo el progreso del estudiante (XP, nivel, insignias, respuestas) se guarda localmente en el navegador, sin necesidad de cuenta ni conexión a internet para funcionar.

## Características

- **9 unidades completas**, cada una con 4 modos: teoría, simuladores, juego y examen.
- **Proyecto Integrador Final** — caso real de 9 estaciones que conecta las 9 unidades.
- **Sistema de gamificación**: XP, 10 niveles, medallas/insignias, racha de días.
- **Tabla Periódica interactiva** con los 118 elementos.
- **Buscador global** y **Glosario** de términos.
- **Bitácora Científica** — historial de progreso del estudiante, exportable.
- **Perfiles locales** (hasta 10 por navegador) + modo invitado, con exportar/importar respaldo.
- **Accesibilidad**: alto contraste, texto grande, lectura por voz (experimental), modo simplificado (experimental).
- **"La Curiosidad"** — un personaje ambiental (modelo vectorial con ojos energéticos) que reacciona con color, movimiento y expresión a los logros reales del estudiante — nunca interrumpe, nunca decora sin motivo.
- Diseño responsive: funciona en celular, tablet y computadora.

## Capturas de pantalla

> **Pendiente.** Este repositorio se preparó en un entorno de desarrollo sin acceso a un navegador real, por lo que no fue posible generar capturas de pantalla genuinas de la interfaz en funcionamiento. Antes de publicar este repositorio, se recomienda agregar 3-5 capturas reales aquí (Portal de Entrada, una unidad con su teoría, un simulador, la Tabla Periódica, y Mi Progreso) — ver `docs/qa/` para el detalle de qué se validó funcionalmente sin esa confirmación visual.

## Tecnologías

- **HTML5 / CSS3 / JavaScript (ES6+)** — sin frameworks, sin librerías externas de UI.
- **`localStorage`** del navegador — toda la persistencia de datos, sin backend ni base de datos remota.
- **SVG generado en código** — iconografía e identidad visual (incluyendo "La Curiosidad"), sin archivos de imagen externos.
- **Google Fonts** (Space Grotesk, Inter, JetBrains Mono) — única dependencia externa real; sin conexión, el navegador usa una tipografía de sistema como reemplazo automático.
- Sin `npm`, sin build, sin transpilación — el código que ves en `js/` es exactamente el que se ejecuta en el navegador.

## Instalación local

No requiere instalación de dependencias, `npm install`, ni build. Dos formas de ejecutarlo:

**Opción 1 — Abrir directamente:**
1. Descomprimir el paquete.
2. Abrir `index.html` con doble clic en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

**Opción 2 — Servidor estático local (recomendado para evitar restricciones de algunos navegadores con `file://`):**
```bash
npx serve .
# o
python3 -m http.server 8080
```
y abrir `http://localhost:8080` (o el puerto que indique).

## Ejecución

Al abrir `index.html` por primera vez se muestra el Portal de Entrada: crear un perfil nuevo, importar un respaldo existente, o entrar como invitado. Desde ahí, la navegación completa vive en el sidebar (Inicio, Unidades, Proyecto Integrador, Tabla Periódica, Mi Progreso).

## Estructura del proyecto

```
index.html              punto de entrada único
css/                     main.css, standards.css, photon.css
js/
├── app.js               inicialización de la aplicación
├── core/                Storage, Router, Gamification
├── shared/              sistemas compartidos (perfiles, búsqueda, glosario,
│                        accesibilidad (PNE), Método MQC, Photon, etc.)
├── modules/              pantallas (Inicio, Unidades, Progreso, Tabla Periódica, Integrador)
├── units/                unit-01.js … unit-09.js — una por unidad
└── data/                 elementos, preguntas y banco PNE por unidad
assets/
├── icons/                iconografía SVG oficial
└── photon/               vacía a propósito — "La Curiosidad" se dibuja en código (ver LEEME.txt)
docs/
├── identidad/             Design System y documentos de "La Curiosidad"
├── qa/                    informes de control de calidad
└── validacion/            protocolo de aceptación de usuario (SAT)
README.md · LICENSE · CHANGELOG.md · ROADMAP.md · PROJECT_CONTEXT.md
CONTRIBUTING.md · CODE_OF_CONDUCT.md · SECURITY.md · GITHUB_RELEASE_DRAFT.md
```

**Nota de transparencia:** este proyecto es una SPA estática sin backend, no un monorepo — por eso no existen carpetas separadas de `games/`, `simulators/` o `audio/` como en una plantilla genérica de proyecto: los juegos y simuladores de cada unidad viven como funciones dentro de su propio `js/units/unit-0X.js` (no son archivos independientes), y no existe todavía ningún sistema de audio implementado (ver `ROADMAP.md`). Forzar esas carpetas sin contenido real habría sido cosmético, no estructural.

## Filosofía MQC — el Método

Cada tema de teoría sigue una misma estructura pedagógica intencional, no arbitraria:

1. **Detonante** — una pregunta real antes de dar la respuesta.
2. **Compromiso** — el estudiante elige lo que cree antes de leer o explorar (sin castigo por equivocarse).
3. **Exploración** — el contenido real, conectado a lo ya visto en unidades anteriores.
4. **Conexión** — cómo esto se relaciona con el resto del programa.

La identidad visual completa (paleta, tipografía, componentes, y las reglas de comportamiento de "La Curiosidad") está documentada en `docs/identidad/MQC_DESIGN_SYSTEM_MAESTRO.md`.

## Autor

**Lic. Bryan Chavarría C.** — autor del contenido académico, programa curricular y dirección pedagógica del proyecto.

## Créditos

- **Contenido académico y programa curricular:** Lic. Bryan Chavarría C.
- **Desarrollo de la plataforma, identidad visual e ingeniería de software:** construido con Claude (Anthropic) a lo largo de múltiples sprints de desarrollo, identidad y control de calidad — ver `CHANGELOG.md` para el historial completo.

## Licencia

Ver `LICENSE`. El contenido académico (preguntas, teoría, estructura curricular) pertenece a su autor; el código de la plataforma se distribuye según los términos indicados en ese archivo.

## Versión

**Beta v1.0** — ver `CHANGELOG.md` para el historial completo, `docs/qa/MQC_BETA_QA_REPORT_v1.0.md` para el informe de control de calidad, y `ROADMAP.md` para lo que sigue después de esta Beta.
