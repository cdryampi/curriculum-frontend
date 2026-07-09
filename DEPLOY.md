# Deployment

The frontend is a static SPA built with Vite. It is primarily deployed to **GitHub Pages** by `.github/workflows/deploy.yml`. Docker and Vercel are documented as alternative hosts.

## Common environment variables

```bash
VITE_API_BASE_URL=https://backend.yampi.eu
VITE_GIT_HUB_URL=https://github.com/cdryampi/
```

These values must be present **at build time** because Vite inlines them into the bundle. Pass them as `--build-arg` (Docker), repository secrets (GitHub Actions), or project env vars (Vercel).

## 1. GitHub Pages (primary)

- Triggered on push to `master` and via `workflow_dispatch` by `.github/workflows/deploy.yml`.
- `vite.config.mjs` hardcodes `base: "/curriculum-frontend/"` so assets resolve under the project subpath on Pages.
- The workflow copies `dist/index.html` to `dist/404.html` as an SPA fallback.

PR checks run separately in `.github/workflows/ci.yml` (`npm ci` + `npm run build`).

## 2. Docker

The `Dockerfile` is a multi-stage build that:

1. Installs dependencies with `npm ci`.
2. Builds with `npm run build`, passing `VITE_API_BASE_URL` and `VITE_GIT_HUB_URL` as build args.
3. Serves `dist/` through `nginx:alpine` using the provided `nginx.conf`.

`docker-compose.yml` exposes the app on `http://localhost:80` and forwards the build args from the host environment (with safe defaults).

```bash
VITE_API_BASE_URL=https://backend.yampi.eu \
VITE_GIT_HUB_URL=https://github.com/cdryampi/ \
docker compose up -d --build
```

## 3. Vercel

`vercel.json` is kept for convenience. The `crons` entry used to ping `/api/ping-render` to keep the backend warm; it requires a Vercel serverless function that is not part of this repository. Remove or replace the `crons` block if the function is not deployed.

```bash
npm install -g vercel
vercel
vercel --prod
```

Set `VITE_API_BASE_URL` and `VITE_GIT_HUB_URL` in the Vercel project settings before deploying.

## CORS

The backend must allow the deployed origin in `CORS_ALLOWED_ORIGINS` (or `CORS_ALLOW_ALL_ORIGINS=True` in development). See `cdryampi/curriculum-backend/.env.example`.

## Troubleshooting

- **404 on deep links under GitHub Pages**: confirm the `base` in `vite.config.mjs` matches the project subpath and that the workflow copies `dist/index.html` to `dist/404.html`.
- **API calls go to the wrong host**: rebuild with the correct `VITE_API_BASE_URL`. Vite embeds the value at build time.
- **Cache after deploy**: hard-refresh or open an incognito window.
