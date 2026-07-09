# Frontend architecture

This document describes the high-level architecture of `curriculum-frontend`. It is the entry point for agents and humans who need a quick mental model before reading the code.

## Stack

- **Language / framework:** React 19 with React Router 7.
- **Build tool:** Vite 6.
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`).
- **HTTP client:** Axios.
- **UI helpers:** `react-icons`, `react-toastify`, `react-spinners`, `react-helmet-async`, `react-scroll`, `swiper`, `vite-plugin-svgr`.
- **Tests:** `npm run test` exists but no test runner is configured yet (see `docs/test-strategy.md`).

## High-level flow

1. `index.html` exposes a single mount point (`#front_curri`) and preloads critical fonts and the logo.
2. `src/main.jsx` mounts `<App />` inside `React.StrictMode`.
3. `src/App.jsx` wraps the app in `HelmetProvider` and `ErrorBoundary`, then hands off to `RouterLinks`.
4. `src/router/Routes.jsx` defines a `BrowserRouter` with `basename` set from `import.meta.env.BASE_URL`, a `Suspense` boundary, and the following routes:
   - `/` - `HomePage`
   - `/404` - `ErrorPage`
   - `/static-page/:slug` - `StaticPage`
   - `*` - `ErrorPage` (fallback)
5. Pages are loaded with `React.lazy` and `Suspense`, with a shared `PageFallback` that renders the header and bottom bar skeletons.

## Directory map

```
src/
  api/             Axios client and per-endpoint helpers (see docs/api-contract.md)
  assets/          Static images and SVG assets bundled by Vite
  components/      Section components, skeletons, shared UI primitives
  data/            Local static data (menu, social icons, skill categories)
  hooks/           Data fetching hooks, most built on useApiWithCache
  lib/             Small reusable helpers and icon maps
  pages/           Page-level components (HomePages, StaticPage, ErrorPage)
  router/          Routes.jsx
  styles/          Global styles (Tailwind import + custom CSS)
  App.jsx          Top-level provider chain
  config.js        Reads VITE_API_BASE_URL and VITE_GIT_HUB_URL
  main.jsx         React entrypoint
```

## Data fetching

- `src/api/index.js` exposes one function per endpoint, all using a shared Axios client configured with `VITE_API_BASE_URL`.
- `src/hooks/useApiWithCache.js` is the standard hook. It uses an in-memory cache (`src/hooks/cacheStore.js`, 5-minute TTL) to avoid re-fetching within a session and exposes `{ data, loading, error, refetch }`.
- Each section component has its own thin hook (e.g. `UseListStaticPagesHook`, `UseProfileUserHook`) that calls the hook with a stable cache key and fetcher.
- Components render three explicit states: loading (skeleton), error (retry button), and empty (no items).

## Configuration and environment

- `src/config.js` reads `VITE_API_BASE_URL` and `VITE_GIT_HUB_URL` via `import.meta.env`.
- `vite.config.mjs` hardcodes `base: "/curriculum-frontend/"` because the production deploy target is GitHub Pages under a project subpath. Vercel/Docker deployments should not need this base.
- `tailwind.config.js` configures plugins (`forms`, `typography`) and the content scan paths.

## Build and deploy

- Local: `npm run dev`, `npm run build`, `npm run preview`.
- Production primary target: GitHub Pages via `.github/workflows/deploy.yml` (runs on push to `master`).
- PR checks: `.github/workflows/ci.yml` runs `npm ci` and `npm run build` on every push and pull request.
- Docker: `Dockerfile` and `docker-compose.yml` are available for containerized hosting; `DEPLOY.md` covers both Docker and Vercel.

## Conventions

- Section components live under `src/components/<Section>/` with an `index.jsx` barrel.
- API helpers live exclusively in `src/api/`. Do not call Axios directly from components.
- New endpoints should come with a hook in `src/hooks/` and a state machine for loading/error/empty.
- All visible text is in Spanish. The HTML `lang` attribute and metadata are set in `index.html`.

## Where to start reading the code

- `src/router/Routes.jsx` and `src/pages/HomePages/HomePage.jsx` for the user-facing structure.
- `src/api/index.js` and `src/hooks/useApiWithCache.js` for the data layer.
- `src/config.js` and `vite.config.mjs` for environment and build configuration.
- `docs/api-contract.md` for the backend contract this app relies on.
