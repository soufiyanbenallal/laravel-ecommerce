---
name: laravel-shopper-inertia
description: Repository-specific skill for implementing features in this Laravel + Shopper + Inertia + React TypeScript + Tailwind CSS project with ACME-style frontend direction.
---

# Laravel Shopper Inertia

Use this skill when a task touches both backend and frontend in this repository.

## Load Context
Read these first:
- `AGENTS.md`
- `docs/LOCAL_DEV.md`
- `docs/MCP_AND_SKILLS.md`
- `docs/SHOPPER_CONFIGURATION.md`
- `docs/STRIPE_STEUP.md`

## Workflow
1. Confirm route and controller entry points (`routes/web.php`, `app/Http/Controllers/*`).
2. Define or update page props contract in TS before large UI changes.
3. Implement backend payload changes in controller/service.
4. Implement frontend rendering in Inertia page/components.
5. Keep style aligned with current premium ACME-like direction.
6. Run validation commands.

## Must Do
- Keep Laravel as data source of truth for page props.
- Keep Inertia page contracts synchronized between PHP payload and TS interfaces.
- Use `@/*` imports in React TS code.
- Prefer Shopper config/extension points for ecommerce concerns.
- Run:
  - `sail artisan test`
  - `pnpm run build`

## Must Not Do
- Do not edit package/vendor code.
- Do not move business logic into React components.
- Do not introduce generic UI defaults that break existing visual identity.
- Do not leave undocumented architecture changes.

## Known Caveats
- Home types are currently in `resources/js/Components/home/index.ts`.
- Duplicate `HomeController.php` exists in `resources/js/Components/home/` and should be treated as cleanup debt.
