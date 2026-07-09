# SESSION.md

## 2026-07-09

- Added `AGENTS.md` with scope, rules, commands, environment variables, and verification guidance for frontend agents.
- Updated `README.md` and `DEPLOY.md` with the real repository URL and production backend/GitHub environment examples.
- Verified with `npm run build`.
- Added `docs/architecture.md` describing the React/Vite app structure, data layer, and deploy targets.
- Added `docs/api-contract.md` mirroring the backend contract consumed by `src/api/index.js`.
- Added `docs/test-strategy.md`, configured Vitest, and added a smoke test for `src/hooks/cacheStore.js`. `npm test` passes.
- Aligned `Dockerfile`, `docker-compose.yml`, `nginx.conf`, and `DEPLOY.md` with the current build pipeline (multi-stage Docker, Compose v2, GitHub Pages primary, Vercel optional).
- Browser smoke test against `https://backend.yampi.eu`:
  - `npm run build` + `vite preview` on port 4173.
  - Home `/`: title and metadata OK, profile, services, portfolio, experience, education, skills, contact, and footer all render with real backend data. Console: 0 errors, 1 warning (`logo.png` preload not used within a few seconds; non-blocking).
  - Static page `/static-page/cookies`: title becomes `Cookies - Curriculum de Yampi`, no console errors.
  - Unknown route `/esta-ruta-no-existe`: renders the error page (`Error Page - Curriculum de Yampi`), no console errors.
  - Screenshot: `qa-home.png` saved at the repository root and ignored from git.
