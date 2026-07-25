# MásQueCiencia — Beta v1.0

> Borrador listo para pegar directamente en "Draft a new release" de GitHub al crear el tag `v1.0.0-beta`. No se publicó ningún release todavía — esto es solo el contenido preparado.

---

## 🧪 ¿Qué es MásQueCiencia?

Plataforma de química interactiva para Décimo Año, alineada al programa oficial del MEP (Costa Rica). Funciona 100% en el navegador, sin backend ni cuentas en la nube.

## ✨ Qué incluye esta versión

- Las 9 unidades completas del programa (teoría, simuladores, juego, examen).
- Proyecto Integrador Final (9 estaciones).
- Sistema de progreso: XP, 10 niveles, insignias.
- Tabla Periódica interactiva (118 elementos).
- Buscador, Glosario, Bitácora Científica exportable.
- Perfiles locales + modo invitado, exportar/importar.
- Accesibilidad: alto contraste y texto grande (lectura por voz y modo simplificado, experimentales).
- "La Curiosidad" — personaje ambiental vectorial que reacciona a los logros reales del estudiante.

## 🚀 Cómo probarlo

Descargá el `.zip` de este release, descomprimilo, y abrí `index.html` con doble clic en tu navegador. No requiere instalación.

## 🐛 Known Issues (no bloqueantes)

| Issue | Detalle |
|---|---|
| Sin sistema de sonido | `PhotonSound` nunca se implementó — la plataforma es visual y silenciosa por ahora |
| Tipografía depende de internet | Sin conexión, cae a fuente de sistema (no rompe nada, solo cambia la estética) |
| Sin sincronización entre dispositivos | El progreso vive en el navegador donde se creó — usar exportar/importar para moverlo |
| Sin confirmación exhaustiva en todos los navegadores/dispositivos físicos | Validado funcionalmente y en un recorrido real de navegador; no probado aún en el catálogo completo de dispositivos móviles existentes |

Ver `docs/qa/BUG_LIST_v1.0.md` y `ROADMAP.md` para el detalle completo.

## 🗺️ Qué sigue (Roadmap)

- Ejecutar el protocolo de validación con estudiantes reales (`docs/validacion/SAT_PROTOCOL_MQC_v1.0.md`).
- Escribir Manual Docente y Manual Estudiante.
- Evaluar la implementación de un sistema de sonido.
- Empaquetar las fuentes localmente para uso 100% offline.

Ver `ROADMAP.md` para la lista completa.

## 🙏 Créditos

Contenido académico: **Lic. Bryan Chavarría C.**

---

**Tag sugerido:** `v1.0.0-beta`
**Título sugerido del release:** `MásQueCiencia — Beta v1.0`
**Marcar como "Pre-release":** ✅ Sí (es una Beta, no una versión estable 1.0 final)
