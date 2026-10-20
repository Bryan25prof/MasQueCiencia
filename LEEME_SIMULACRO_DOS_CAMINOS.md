# Simulacro PNE · Ciencias — pantalla guía con dos caminos

Reemplaza el paquete anterior (MQC_SUFICIENCIA_DESBLOQUEA_SIMULACRO): incluye esos cambios y los supera. Si ya subiste aquel, este lo sobrescribe sin conflicto (mismos 2 archivos).

## Qué cambia para el estudiante
La pantalla bloqueada del Simulacro ahora explica qué hacer:
- **Camino 1 · Rápido:** acreditar la Suficiencia de Química Y la de Física (cada una de 10.º o de 11.º). Botones directos a cada Suficiencia.
- **Camino 2 · Guiado:** aprobar 2 exámenes de unidad (70 % o más) en CADA ciencia — Química, Física y Biología — sumando 10.º y 11.º. Barra de avance por ciencia y botón "Ir a ..." por ciencia.
- Con cumplir uno de los dos se desbloquea. Quien ya cumplía el desbloqueo anterior (Química 11.º desbloqueada, o progreso en 11.º) conserva el acceso; esas reglas ya no se muestran.
- "Volver" lleva ahora al inicio.

## Qué NO cambia
Suficiencia (sigue sin dar XP), Desafío Final de Química 10.º, Storage, XP, perfiles y Analytics. Solo se LEEN datos existentes (data.suficiencia y examBest de cada unidad). Docente verificado sigue entrando siempre.

## Archivos (2) — un solo commit
- js/shared/simulacro-nacional-adapter.js
- js/modules/simulacro-nacional.js

Commit sugerido: "Simulacro PNE: pantalla guía con dos caminos (Suficiencia o exámenes por ciencia)"
Ambos partieron de copias idénticas (SHA-256) a producción del 17-oct-2026.

## Pruebas locales: 14/14
Perfil nuevo bloqueado; solo Suficiencia de Química no basta; Química+Física desbloquea; 2+2+1 exámenes bloquea (69 % no cuenta); 2+2+2 desbloquea; Ruta anterior intacta; perfil viejo sin datos no falla; móvil 375 px sin scroll horizontal.
Pendiente tras subir: revisar en producción el aspecto real (el árbol de pruebas local no trae las hojas de estilo) y que los botones de Suficiencia abran con sus bancos de preguntas. Ctrl+F5 (caché ~10 min).

## Biología
Aún no tiene Suficiencia: por eso solo participa en el Camino 2. Si se crea (bio10/bio11 en data.suficiencia), aparece en cursosAcreditados sin tocar este código.
