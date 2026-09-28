/* ================================================================
   MÁSQUECIENCIA — js/shared/mqc-biologia-flags.js
   ================================================================
   Fuente ÚNICA de "¿Biología ya es pública?", para que las pantallas de
   DESCUBRIMIENTO (insignia del sidebar en index.html, y "Selecciona
   tu ruta científica" en grade-select.js) siempre estén de acuerdo
   con biologia10.js/biologia11.js sobre si invitar a entrar o mostrar
   "en desarrollo".

   FASE 2 — paso 4 (Biología), arranque de BIO10-U01 (25 de setiembre
   de 2026): este archivo nace en `false` a propósito. Es exactamente
   el mismo mecanismo que ya existe para Física (ver
   js/shared/mqc-fisica-flags.js y el bug que ese archivo documenta),
   creado desde el día uno para EVITAR esa misma clase de error, en
   lugar de construir el módulo primero y corregir la consistencia de
   las pantallas de descubrimiento después.

   BIO10-U01 (Unidad 1: "Las formas de vida y el entorno biofísico")
   ya tiene contenido real e implementado, pero se mantiene OCULTO por
   defecto hasta que Bryan lo revise y autorice explícitamente el
   lanzamiento — igual que se hizo con Física antes de su lanzamiento
   público. Mientras esta bandera esté en `false`, el sidebar y
   "Selecciona tu ruta científica" muestran "Biología / En desarrollo",
   sin importar qué tan avanzado esté el contenido interno.

   Si en el futuro hay que publicar Biología 10.º (o, más adelante,
   11.º), cambiá el valor correspondiente de ACÁ a la vez que la
   constante interna del módulo respectivo (BIOLOGIA10_PUBLICO en
   js/modules/biologia10.js, y en su momento BIOLOGIA11_PUBLICO en
   js/modules/biologia11.js) — son 2 fuentes relacionadas a propósito,
   no una sola: el módulo decide si el CONTENIDO real se muestra al
   entrar de verdad a esa ruta; este archivo decide si las pantallas
   de descubrimiento invitan a entrar. Deben coincidir siempre.
================================================================ */
window.MQC_BIOLOGIA_FLAGS = {
  biologia10Publico: false, /* debe coincidir con BIOLOGIA10_PUBLICO en js/modules/biologia10.js */
  biologia11Publico: false  /* Biología 11.º: aún sin iniciar (sin libro fuente todavía) */
};
