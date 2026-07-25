# RELEASE REPORT — MasQueCiencia Beta v1.0
**EOP-035 · Informe final de ingeniería de publicación**

---

## 1. Versionado oficial

| Campo | Valor |
|---|---|
| **Producto** | MasQueCiencia |
| **Versión** | Beta v1.0 |
| **Fecha de release** | EOP-035 |
| **Build** | RC2 → Beta v1.0 (sin cambios funcionales desde RC2, ver `docs/qa/`) |
| **Estado de QA** | Aprobado — ver §5 |
| **Estado de publicación** | Preparado para GitHub, no publicado todavía (regla explícita del sprint) |

## 2. Notas de la versión (Release Notes)

MasQueCiencia Beta v1.0 es la primera versión preparada formalmente para distribución pública. Incluye:

- Las 9 unidades completas del programa oficial de Química de Décimo Año (MEP, Costa Rica), cada una con teoría, simuladores, juego y examen.
- Proyecto Integrador Final (9 estaciones).
- Sistema de gamificación completo (XP, 10 niveles, medallas, rachas).
- Identidad visual propia y congelada ("Cosmos de Laboratorio"), incluyendo "La Curiosidad" — personaje ambiental vectorial con expresión de mirada.
- Accesibilidad: alto contraste, texto grande, lectura por voz y modo simplificado (estos dos últimos, experimentales).
- Perfiles locales, modo invitado, exportar/importar respaldo.
- Diseño responsive (celular, tablet, escritorio).

## 3. Estructura del paquete

```
MasQueCiencia_Beta_v1.0/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── CHANGELOG.md
├── PROJECT_CONTEXT.md
├── ROADMAP.md
├── RELEASE_REPORT.md
├── css/            (3 archivos)
├── js/             (56 archivos: core, shared, modules, units, data)
├── assets/
│   └── icons/      (8 SVG oficiales)
└── docs/
    ├── identidad/   (5 documentos — Design System y La Curiosidad)
    ├── qa/          (3 informes de control de calidad)
    └── validacion/  (2 documentos del protocolo SAT)
```

## 4. Métricas reales del paquete (medidas, no estimadas)

| Métrica | Valor |
|---|---|
| Archivos `.js` | 56 |
| Archivos `.css` | 3 |
| Archivos `.svg` | 8 |
| Archivos `.md` (documentación) | 15 |
| Total de archivos en el paquete | 86 |
| Tamaño total | 1.7 MB |
| Tamaño de `js/` | 1.3 MB |
| Tamaño de `css/` | 92 KB |
| Tamaño de `assets/` | 48 KB |
| Tamaño de `docs/` | 128 KB |

## 5. Estado de QA

Ver `docs/qa/MQC_BETA_QA_REPORT_v1.0.md` para el detalle completo. Resumen:

- 55/56 módulos en **PASS** (1 módulo, `photon-sound.js`, no existe — hallazgo de severidad BAJA, no bloqueante).
- 0 errores críticos, 0 errores altos.
- Recorrido completo de estudiante (19 pasos) ejecutado sin excepciones.
- `node --check` limpio en los 56 archivos — **reverificado en este sprint tras la limpieza de Fase 1, sin regresiones.**

## 6. Estado de publicación (Fase 6 — GitHub Ready)

| Elemento | Estado |
|---|---|
| `.gitignore` | ✅ Creado |
| `README.md` | ✅ Reescrito completo (descripción, características, instalación, estructura, filosofía, créditos, licencia) |
| `LICENSE` | ✅ Creado — **valor por defecto conservador, pendiente de confirmación del autor** (ver §7) |
| Estructura de carpetas | ✅ Organizada (`docs/` con subcarpetas) |
| Documentación | ✅ Completa y actualizada |
| Rutas relativas | ✅ Verificado — 0 rutas absolutas de sistema de archivos |
| **Publicación real** | ❌ **No realizada** — regla explícita de este sprint ("no publicar todavía") |

## 7. Pendientes conocidos (no bloqueantes para esta Beta)

1. **`LICENSE` es un valor por defecto** ("todos los derechos reservados") porque nunca se definió una licencia explícita durante el desarrollo — el archivo mismo señala esto y sugiere alternativas (Creative Commons, MIT) para que el autor decida antes de publicar.
2. **Tipografía dependiente de internet** (Google Fonts) — contradice el principio de "100% offline" documentado en el propio código. No se corrigió en este sprint por no haber acceso de red disponible para empaquetar las fuentes localmente sin exceder el alcance de "solo limpieza y empaquetado". Ver `ROADMAP.md`.
3. **`PhotonSound` no existe** — documentado desde el QA de Beta (EOP-034), sigue pendiente para una versión futura.
4. Resto de pendientes menores (cobertura de íconos, ARIA, color del Integrador) — ver `ROADMAP.md`.

Ninguno de estos impide que el proyecto se use de principio a fin ni afecta la aprobación de esta Beta.

## 8. Declaración final

**"MasQueCiencia Beta v1.0 Release Package preparado y listo para publicación."**
