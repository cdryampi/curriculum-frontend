# AGENTS.md

## Alcance del proyecto

Este repositorio contiene el frontend React/Vite del curriculum y portfolio personal. Consume la API del backend desplegada normalmente en `https://backend.yampi.eu`.

## Reglas de trabajo

- Modifica solo archivos de `curriculum-frontend/` salvo que el usuario pida tocar otro repositorio.
- Mantén los cambios pequenos y enfocados para facilitar PRs revisables.
- No commitees `.env`, credenciales, tokens, claves de API ni archivos generados locales.
- Conserva el estilo visual existente y las clases Tailwind ya usadas por los componentes.
- Evita refactors amplios si la tarea pide un ajuste puntual.
- Revisa estados de carga, error y datos vacios cuando cambies componentes que consumen API.

## Comandos utiles

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run test` existe en `package.json`, pero requiere que Jest este configurado en el entorno.

## Variables de entorno

Crear un `.env` local cuando se necesite levantar la app:

```bash
VITE_API_BASE_URL=https://backend.yampi.eu
VITE_GIT_HUB_URL=https://github.com/cdryampi/
```

## Verificacion recomendada

- Para cambios de contenido o estilos: ejecutar `npm run build`.
- Para cambios visuales: revisar la app con `npm run dev` y una comprobacion en navegador desktop/mobile.
- Para cambios en llamadas API: verificar que `VITE_API_BASE_URL` apunta a un backend accesible.
