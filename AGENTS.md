# Agent Guide

This repository is a Laravel 12 + Inertia + React TypeScript storefront with Shopper and Filament.

## Read First
- `docs/ARCHITECTURE.md`
- `docs/FRONTEND.md`
- `docs/BACKEND.md`
- `docs/LOCAL_DEV.md`
- `docs/MCP_AND_SKILLS.md`

## Core Stack
- Backend: Laravel 12, Shopper 2.1, Filament 3
- Frontend: React 19, TypeScript, Inertia.js, Tailwind CSS v4, Vite
- DB: SQLite in local dev (`database/database.sqlite`)

## Module Map
- Route entry: `routes/web.php`
- Home page controller: `app/Http/Controllers/HomeController.php`
- Inertia pages: `resources/js/Pages/*`
- Home feature module: `resources/js/Components/home/*`
- Shopper config: `config/shopper/*`

## Working Rules
- Keep controllers thin; move reusable business logic into `app/Services/*` when features grow.
- Keep Inertia page props stable and typed; update both PHP payload and TS interfaces together.
- Use the `@/*` alias for frontend imports from `resources/js`.
- Preserve the current visual direction: premium, editorial, ACME-like composition and typography.
- Treat Shopper as the source of ecommerce models and flows; prefer extension/configuration over framework edits.
- Do not edit `vendor/`.

## Frontend Rules
- Tailwind v4 utilities are the default; tokens and theme values live in `resources/css/app.css`.
- Current home types live in `resources/js/Components/home/index.ts`.
- If you introduce shared UI primitives, place them under `resources/js/components/ui` and document usage in `docs/FRONTEND.md`.

## Backend Rules
- New page data should come from Laravel controllers or service classes, not hardcoded in React components.
- Validate all user input via Form Requests for new write endpoints.
- Keep route names explicit and stable for Inertia links.

## Validation Checklist
- `sail artisan test`
- `pnpm run build`
- If changed backend config: `sail artisan optimize:clear`

## Known Cleanup Targets
- Duplicate controller file at `resources/js/Components/home/HomeController.php` (should not live in JS tree).
- Several home components import from `../types` while types are currently in `resources/js/Components/home/index.ts`.
