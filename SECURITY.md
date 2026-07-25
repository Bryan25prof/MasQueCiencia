# Política de Seguridad

## Contexto del proyecto

MásQueCiencia es una plataforma educativa estática (HTML/CSS/JavaScript puro, sin backend, sin base de datos remota). Todos los datos del estudiante (perfil, progreso, XP) se guardan **localmente en el navegador** (`localStorage`) — no se envían a ningún servidor, porque no existe ningún servidor de por medio. Esto reduce significativamente la superficie de riesgo respecto a una aplicación típica con backend.

## Versiones soportadas

| Versión | Soportada |
|---|---|
| Beta v1.0 | ✅ |
| Versiones anteriores (Alpha, RC1, RC2) | ❌ (solo se da soporte a la versión Beta más reciente) |

## Cómo reportar una vulnerabilidad

Si encontrás un problema de seguridad real (no un bug funcional — para eso, ver `CONTRIBUTING.md`), por favor:

1. **No lo publiques como un Issue público** hasta que se haya evaluado y, de ser necesario, corregido.
2. Reportalo de forma privada al responsable del proyecto (ver `README.md` para datos de contacto).
3. Incluí:
   - Descripción clara del problema.
   - Pasos para reproducirlo.
   - Impacto potencial (¿qué podría hacer alguien con esto?).

## Qué SÍ se considera una vulnerabilidad real en este proyecto

- Cualquier forma de ejecutar código no deseado en el navegador de otro usuario a partir de datos guardados por la plataforma (ej. una inyección vía el nombre de perfil, un archivo de importación malicioso).
- Cualquier forma de que un archivo de perfil exportado/importado corrompa o exponga datos de otro perfil sin que el usuario lo autorice.

## Qué NO se considera una vulnerabilidad (limitaciones conocidas, no fallas de seguridad)

- Los datos en `localStorage` son accesibles por cualquiera con acceso físico al mismo navegador/perfil de usuario del sistema operativo — esto es una limitación inherente y conocida del almacenamiento local del navegador, no una falla de la plataforma.
- No hay autenticación real (contraseñas) porque no hay cuentas remotas — los "perfiles" son locales al dispositivo, no credenciales de seguridad.

## Compromiso de respuesta

Este es un proyecto educativo mantenido sin un equipo de seguridad dedicado. Se hará el mejor esfuerzo razonable por revisar y responder a un reporte, pero no se garantiza un tiempo de respuesta específico.
