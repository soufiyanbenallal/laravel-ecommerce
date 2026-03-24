# Frontend Guide

## Stack
- React 19 + TypeScript
- Inertia.js React adapter
- Tailwind CSS v4 via `@tailwindcss/vite`
- Lucide icons

## Conventions
- Inertia pages live in `resources/js/Pages`.
- Feature components live in `resources/js/Components`.
- Use `@/*` imports for paths under `resources/js`.
- Keep page files small; move UI sections into feature folders.

## Styling Rules
- Tailwind utility-first is default.
- Theme tokens live in `resources/css/app.css` under `@theme`.
- Keep the existing premium editorial style:
  - expressive typography
  - strong contrast and hierarchy
  - intentional motion
  - non-generic compositions

## ACME / shadcn Direction
- This repo currently has no shadcn install (`components.json` not present).
- If you introduce shadcn/ui:
  1. initialize it for React + Tailwind in this repo
  2. set component path to `resources/js/components/ui`
  3. keep the project visual language (do not revert to generic defaults)
  4. document new primitives in this file

## Home Module Notes
- Types currently live in `resources/js/Components/home/index.ts`.
- `resources/js/Components/home/data/index.ts` is static mock data and should not become long-term source of truth once real Shopper-backed catalog endpoints are added.

## Frontend Validation
- `npm run build`
- `php artisan inertia:check-ssr` (if SSR is enabled later)
