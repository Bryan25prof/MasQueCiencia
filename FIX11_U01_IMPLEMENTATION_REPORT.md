# FIX11_U01_IMPLEMENTATION_REPORT.md
## Física 11.° — FIX11-U01: Hidrostática (RUTA DE CIERRE, FASE 1)

**Fecha:** 2026-09-09
**Fuente:** Libro "Física 11° — Un enfoque Práctico" (Lic. Kathia E. Hernández Camacho), Tema I (páginas 9-27).
**Estado:** Funcional de punta a punta, probada con Chromium real. Primera unidad de Física 11.° — arquitectura completa nueva, paralela e independiente de Física 10.°.

---

## 1. Contexto: por qué esta unidad responde la pregunta original del docente

El docente había preguntado si Hidrostática estaba en el libro de Física 10.° — no lo estaba. Al recibir el "Prompt Maestro — Ruta de Cierre" y el libro real de Física 11.°, se confirmó: **Hidrostática es efectivamente la primera unidad de Física 11.°** (Tema I), exactamente donde debía estar.

## 2. Arquitectura nueva construida (no solo contenido — toda la infraestructura)

A diferencia de las unidades anteriores (que se agregaban a una estructura ya existente), FIX11-U01 requirió construir un **carril completo nuevo, paralelo a Física 10.°**:

- `js/modules/fisica11.js` — módulo completo (grid, detalle de unidad, pestañas), calcado 1:1 del patrón de `fisica10.js`.
- `js/core/storage.js` — nuevo carril `data.fisica11` con `updateFisica11Unit`, `markFisica11TopicRead`, `getFisica11UnitProgress` (funciones paralelas, nunca mezcladas con `fisica10`).
- Candado de publicación independiente: `FISICA11_PUBLICO`/`mqc_fisica11_preview` (activable con `?fisica11preview=1`, separado del de Física 10.°).
- **Bug de navegación real encontrado y corregido**: el enlace del sidebar a "Física" apunta directo a la ruta `fisica10`, sin pasar por la pantalla "elegí tu año" — mi primer intento de conectar Física 11.° a través de esa pantalla nunca era alcanzable. Se corrigió agregando un botón "Undécimo Año → Física 11.º" directamente en la tarjeta de Física 10.°, verificado con Chromium real.

## 3. Verificación del índice completo del libro de Física 11.°

Se revisó el índice completo (páginas 3-6) antes de construir nada, confirmando las 6 unidades reales: Hidrostática, Electrostática, Electricidad, Magnetismo y electromagnetismo, Movimiento ondulatorio, Teoría de la Relatividad — coincidiendo exactamente con "FIX11-U01 a U06" del prompt maestro. Se confirmó también que U06 (Relatividad) es la más corta del libro (18 páginas vs. 40 de U01), tal como anticipaba el prompt.

## 4. Contenido curricular — 6 temas (apartados 1.1 a 1.7 del libro)

1. Densidad (ρ=m/V)
2. Presión (P=F/A, diferencia con peso)
3. Presión atmosférica e hidrostática (Torricelli, P=P₀+ρgh)
4. Principio de Pascal (F₁/A₁=F₂/A₂, prensa hidráulica)
5. Principio de Arquímedes (Fe=ρgV, flotación, peso aparente)
6. Ley de Boyle (P₁V₁=P₂V₂, isotérmico)

## 5. Simuladores (3)

1. **Densidad y Flotación Lab** (el estrella) — masa/volumen interactivos, predicción flota/hunde en tiempo real, Modo Desafío con 7 rondas (empuje y predicción de flotación).
2. **Prensa Hidráulica Lab** — F₁, A₁, A₂ interactivos, muestra ventaja mecánica en vivo.
3. **Ley de Boyle Lab** — 4 rondas aplicando P₁V₁=P₂V₂.

## 6. Verificación matemática — 6 casos de control reales del libro

Verificados con Node.js antes de escribir contenido, y confirmados en Chromium real:

| Caso | Datos del libro | Esperado | Confirmado |
|---|---|---|---|
| Densidad | V=0,25m³, ρ=7.784kg/m³ | m=1.946 kg | ✅ Node |
| Presión | mujer 65kg, 2×0,030m² | P≈1,06×10⁴ Pa | ✅ Node |
| Presión hidrostática | roca a 8m, ρ=1000 | P≈1,79×10⁵ Pa | ✅ Node |
| Presión hidrostática (inversa) | delfín P_T=2,22×10⁵Pa | h=12 m | ✅ Node |
| Pascal | elevador r₁=5,F₂=1,35×10⁴,r₂=50 | F₁=135 N | ✅ Node |
| Arquímedes | 7N aire, 4N agua | Fe=3N | ✅ Node + Chromium (escenario exacto replicado) |
| Boyle | P₁=2atm,V₁=20L,P₂=10atm | V₂=4L | ✅ Node + Chromium (escenario exacto replicado) |

## 7. Juego — "Ingeniero de Fluidos" (7 niveles)

Densidad comparada, presión y área, presión con profundidad, ventaja mecánica de Pascal, empuje de Arquímedes, predicción de flotación, Ley de Boyle. Mismo patrón anti-farming.

## 8. Misión — "Diseño de un Submarino" (2 fases)

Fase 1: submarino a 20 m de profundidad en el mar → calcular presión total (P=P₀+ρgh). Fase 2: mayor profundidad (40 m) → mismo cálculo, evaluando por qué el casco debe ser más resistente. Validación numérica (tolerancia 3%) y de texto (25-220 caracteres).

## 9. Examen — banco de 70 preguntas, 20 por intento

Regla global no negociable de la Ruta de Cierre. Distribución lograda: ~15% densidad, ~15% presión, ~20% presión atmosférica/hidrostática, ~15% Pascal, ~20% Arquímedes, ~15% Boyle, con 2 preguntas integradoras finales (submarinos, globos aerostáticos).

## 10. Gamificación

Insignia nueva: **🌊 Maestro de la Hidrostática**, mismo criterio anti-farming que todas las anteriores.

## 11. Pruebas realizadas (Chromium real)

| Prueba | Resultado |
|---|---|
| Flujo completo de navegación (sidebar → F10 → botón → F11 → U01) | ✅ Corregido tras encontrar el bug real |
| Los 7 casos de control matemáticos | ✅ |
| Densidad y Flotación Lab: cálculo en vivo (600g/500cm³ → ρ=1,20 g/cm³ → "SE HUNDE") | ✅ |
| Escenario exacto del libro (7N/4N → Fe=3N) replicado en Modo Desafío | ✅ |
| Escenario exacto del libro (Boyle P₁=2,V₁=20,P₂=10) replicado en simulador | ✅ |
| Prensa Hidráulica: carga y calcula correctamente | ✅ |
| Juego: 7 niveles presentes | ✅ |
| Misión: 2 fases, carga correctamente | ✅ |
| Examen: 20 de 70, examen completo de principio a fin | ✅ |
| Candado de publicación: probado con navegación directa a la ruta (sin ningún preview activo) — confirmado oculto | ✅ |
| No regresión: Química, Física 10.° completa (8 unidades), PNE, navegación | ✅ Sin errores de consola, desktop/iPhone/Android |

## 12. Archivos creados/modificados

- `js/modules/fisica11.js` (nuevo — módulo completo)
- `js/units/fisica11/fix11-u01.js` (nuevo)
- `js/data/banco-fix11-u01.js` (nuevo, 70 preguntas)
- `js/core/storage.js` (carril `fisica11` + 3 funciones nuevas)
- `js/core/gamification.js` (insignia 🌊 Maestro de la Hidrostática)
- `js/modules/fisica10.js` (botón de navegación a Física 11.°, corrigiendo el bug de navegación real)
- `js/modules/grade-select.js` (tarjeta de Física 11.° en la pantalla "elegí tu año" — camino alternativo)
- `index.html` (scripts de los 3 archivos nuevos)

## 13. Pendiente — FASE 1 continúa

FIX11-U02 (Electrostática) a FIX11-U06 (Relatividad) siguen sin construir. Se detiene acá para revisión docente, tal como pedía el prompt maestro ("unidad por unidad, como siempre").
