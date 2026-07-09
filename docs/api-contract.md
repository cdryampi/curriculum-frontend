# API contract

This is the frontend-side mirror of the backend contract. It documents the endpoints used by the React app, the helpers that wrap them, and the response fields the UI depends on.

The canonical source of truth is [`cdryampi/curriculum-backend` `docs/api-contract.md`](https://github.com/cdryampi/curriculum-backend). Update both documents together when something changes.

## Base URL

- Production: `https://backend.yampi.eu` (set via `VITE_API_BASE_URL`).
- Local development: `http://localhost:8000`.

Create a `.env` file at the project root with:

```bash
VITE_API_BASE_URL=https://backend.yampi.eu
VITE_GIT_HUB_URL=https://github.com/cdryampi/
```

## Authentication

`src/api/index.js` configures a single Axios client. Endpoints marked `*_private` require a DRF token. The token is currently not configured in the Axios client; that is a known gap tracked in `docs/architecture.md` and must be addressed before the public deploy is usable for private endpoints.

## Endpoint map

| Helper (`src/api/index.js`) | Method | Path                                              | Auth      |
|-----------------------------|--------|---------------------------------------------------|-----------|
| `fetchStaticPages`          | GET    | `/static_pages/private/`                          | Required  |
| `fetchStaticPage`           | GET    | `/static_pages/<slug>/`                           | Public    |
| `fetchSocialLinks`          | GET    | `/social/private/`                                | Required  |
| `fetchUserProfile`          | GET    | `/base/userprofile/private/`                      | Required  |
| `fetchUserPDF`              | GET    | `/base/userprofile/pdf/`                          | Public    |
| `fetchSkills`               | GET    | `/education_and_skills/skill_list/`               | Public    |
| `fetchEducationList`        | GET    | `/education_and_skills/education_list_private/`   | Required  |
| `fetchLaboralExperience`    | GET    | `/laboral_experience/laboral_experience_list_private/` | Required |
| `fetchSkillFilter`          | GET    | `/education_and_skills/skill_list_category/<slug>/` | Public |
| `fetchSkillFilterNextPrev`  | GET    | `<pagination URL>`                                | Public    |
| `fetchPortfolioList`        | GET    | `/portfolio/private/`                             | Required  |
| `fetchServicesList`         | GET    | `/services/private/`                              | Required  |
| `sendEmailService`          | POST   | `/email_service/enviar-correo/`                   | Public    |

## Field expectations

The UI reads only a small set of fields per endpoint. Keep them stable when changing backend serializers:

- Static pages: `slug`, `title`, optional `content`.
- Social links: list of `{ network, url, icon? }`.
- User profile: full profile object as rendered by the home page.
- Education list: list of education entries.
- Work experience list: list of experience entries.
- Skills (category filter): list of skills plus pagination links (next/previous).
- Portfolio: list of projects.
- Services: list of services (UI shows up to 4).
- Contact: accepts `{ name, email, message }`; no assumptions beyond 2xx.

## Error handling

Components render three explicit states from the shared hook (`useApiWithCache`):

- `loading` - render a skeleton from `src/components/Skeleton/`.
- `error` - render a retry button that calls the returned `refetch`.
- empty data - render an empty-state message.

The contact form additionally shows success and error toasts via `react-toastify`.

## Adding a new endpoint

1. Add the helper in `src/api/index.js` and keep the function naming (`fetch<Resource>` / `send<Resource>`).
2. Add a hook in `src/hooks/` (typically wrapping `useApiWithCache`).
3. Update the component to use the hook and handle the three states.
4. Update this document and the backend `docs/api-contract.md` in the same PR.
