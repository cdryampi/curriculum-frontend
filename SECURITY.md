# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly instead of opening a public issue:

- **Email**: usa el formulario de contacto del sitio (`https://yampi.eu`)
  indicando el repositorio afectado y una descripción del problema.
- **No** publiques detalles de la vulnerabilidad en issues, PRs o redes sociales
  hasta que se haya aplicado una corrección.

## Modelo de seguridad

- La aplicación es una SPA estática; no se almacenan credenciales ni datos
  sensibles en el cliente. La autenticación con el backend se delega a sus
  propios mecanismos (tokens/sesiones).
- `VITE_API_BASE_URL` apunta al backend público; no se incluyen secretos en el
  bundle (todo lo que se compila es público por definición).
- Las llamadas a la API no usan cookies cross-site; se envía `Accept-Language`.

## Hardening aplicado

- Cliente Axios con `timeout` (15s) e interceptor de errores de red/timeout.
- Cabeceras de seguridad en `nginx.conf` (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Dependencias auditadas (`npm audit`); swiper actualizado a v12 por
  vulnerabilidad de prototype pollution. Restan avisos dev-only (CLI `vercel`,
  `esbuild`/`vitest`) y de react-router RSC (no aplicable a una SPA).
- Assets de imagen que no se usaban fueron eliminados del repo.

## Prácticas de desarrollo

- No commitees `.env`, claves API, tokens ni credenciales (ver `.gitignore`).
- Ejecuta `npm run build` y `npm run test` antes de abrir un PR.
- Revisa `npm audit` periódicamente para detectar dependencias con avisos.
