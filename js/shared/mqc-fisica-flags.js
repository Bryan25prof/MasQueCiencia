/* ================================================================
   MÁSQUECIENCIA — js/shared/mqc-fisica-flags.js
   ================================================================
   Fuente ÚNICA de "¿Física ya es pública?", para que las pantallas de
   DESCUBRIMIENTO (insignia del sidebar en index.html, y "Selecciona
   tu ruta científica" en grade-select.js) siempre estén de acuerdo
   con fisica10.js/fisica11.js sobre si invitar a entrar o mostrar
   "en desarrollo".

   AUDITORÍA FASE 2 — bug encontrado (17 de setiembre de 2026):
   FISICA10_PUBLICO/FISICA11_PUBLICO ya se habían puesto en `true`
   dentro de fisica10.js/fisica11.js el 14 de setiembre de 2026 (el
   contenido real YA es público), pero index.html y grade-select.js
   seguían revisando una bandera de vista previa vieja
   (localStorage 'mqc_fisica10_preview'/'mqc_fisica11_preview') que
   NUNCA se activa para un estudiante real — ninguna pantalla la
   escribe, solo se leía (era un mecanismo manual para probar antes
   del lanzamiento, tecleado a mano en la consola del navegador).

   Resultado real del bug: "Selecciona tu ruta científica" —que es la
   PANTALLA DE ATERRIZAJE de todo estudiante, ver js/app.js,
   Router.navigate('grade-select') justo después de elegir perfil— le
   mostraba a cualquier estudiante real "Física / En desarrollo" con
   un botón deshabilitado sin ninguna acción: un callejón sin salida,
   aunque el contenido real ya estaba disponible entrando por el
   sidebar directo. La insignia del sidebar también decía "Física /
   Pronto" de forma incorrecta por el mismo motivo.

   Si en el futuro hay que volver a ocultar Física temporalmente
   (mantenimiento, revisión, etc.), cambiá los 2 valores de ACÁ a la
   vez que los de fisica10.js/fisica11.js — son 2 fuentes relacionadas
   a propósito, no una sola: fisica10.js/fisica11.js deciden si el
   CONTENIDO real se muestra al entrar de verdad a esa ruta; este
   archivo decide si las pantallas de descubrimiento invitan a entrar.
   Deben coincidir siempre.
================================================================ */
window.MQC_FISICA_FLAGS = {
  fisica10Publico: true, /* debe coincidir con FISICA10_PUBLICO en js/modules/fisica10.js */
  fisica11Publico: true  /* debe coincidir con FISICA11_PUBLICO en js/modules/fisica11.js */
};
