# Frontend test strategy

This document explains the current test setup, what is covered today, and how to extend it.

## Runner

- **Tool:** [Vitest](https://vitest.dev/) 2.x.
- **Why:** Vitest is the de-facto standard for Vite-based projects, runs the same configuration, and needs no separate Jest/Babel toolchain.
- **Config:** `vite.config.mjs` (the `test` block) and `package.json` scripts.
- **Commands:**
  - `npm test` - single run, suitable for CI.
  - `npm run test:watch` - interactive watch mode.

## Environment

- Default environment is `node` (see `vite.config.mjs`).
- For React component tests, set `environment: "jsdom"` per file with `// @vitest-environment jsdom` at the top, or switch the project to a jsdom environment in the config when a component test is added. The `jsdom` package is intentionally not added until it is needed.

## Conventions

- Tests live next to the code they cover: `src/<module>/<module>.test.{js,jsx}`.
- Test file names match the module name and end in `.test.js` or `.test.jsx`.
- The shared `npm run build` must keep passing after every change.

## Current coverage

| File                              | Tests | Notes                                                                 |
|-----------------------------------|-------|-----------------------------------------------------------------------|
| `src/hooks/cacheStore.js`         | 4     | get/set/delete/TTL behavior of the in-memory cache.                   |

The cache store is the only pure module today. React component tests and API client tests are intentionally out of scope until a real failure motivates them.

## Adding a new test

1. Place the test next to the module it covers.
2. Import from the same relative path used in production code.
3. If the module touches `window` or the DOM, mark the file with `// @vitest-environment jsdom` and add `jsdom` as a dev dependency in a separate PR.
4. Run `npm test` locally before opening a PR.

## CI

- `npm test` is **not** wired into `.github/workflows/ci.yml` yet. The next PR on the test track should add it as a separate step after `npm ci`.
