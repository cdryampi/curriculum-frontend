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
npm run test        # Vitest (tests en src/**/*.test.{js,jsx})
npm run test:watch  # Vitest watch
```

## Estructura

```
src/
├── api/index.js           # Axios client (timeout 15s + interceptors) + endpoints
├── components/            # UI (incluye LanguageSwitcher, EmptyState, ErrorState, SafeImage)
├── hooks/                 # Data fetching + cacheStore (TTL 5 min) + i18n
├── pages/                 # HomePage, ErrorPage, StaticPage
├── router/Routes.jsx      # BrowserRouter + lazy
├── i18n.js                # i18next + traducciones es/en/qu
├── styles/global.css      # Tailwind CSS 4
└── config.js              # Variables de entorno
```

## Variables de entorno

Crear un `.env` local cuando se necesite levantar la app:

```bash
VITE_API_BASE_URL=https://backend.yampi.eu
VITE_GIT_HUB_URL=https://github.com/cdryampi/
```

## Notas

- Multilingüe: i18next (es/en/qu) con `useCurrentLanguage()`; el idioma se envía
  al backend vía cabecera `Accept-Language`.
- El `package.json` separa `dependencies` (runtime) y `devDependencies` (build).
- Vite usa `manualChunks` (react-vendor, router, axios, icons, swiper) para cacheo
  de vendor y un `index` más pequeño.
- Tests: Vitest + Testing Library + jsdom (`npm run test`). Los tests viven en
  `src/**/*.test.{js,jsx}` y cubren cliente API, hooks y `ContactForm`.

## Verificacion recomendada

- Para cambios de contenido o estilos: ejecutar `npm run build`.
- Para cambios en hooks/API: ejecutar `npm run test`.
- Para cambios visuales: revisar la app con `npm run dev` y una comprobacion en navegador desktop/mobile.
- Para cambios en llamadas API: verificar que `VITE_API_BASE_URL` apunta a un backend accesible.
