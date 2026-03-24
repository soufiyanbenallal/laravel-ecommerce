# Architecture

## Request Flow
1. Browser requests route (`routes/web.php`).
2. Laravel controller builds page data (`app/Http/Controllers/*`).
3. Controller returns `Inertia::render()` with typed props.
4. Inertia resolves React page in `resources/js/Pages/*`.
5. React page composes feature components in `resources/js/Components/*`.

## Current System Map
- `app/Http/Controllers/HomeController.php`: homepage payload assembly.
- `app/Http/Middleware/HandleInertiaRequests.php`: global Inertia shared props entry.
- `resources/js/app.tsx`: Inertia app bootstrap.
- `resources/js/Pages/Home.tsx`: page-level adapter.
- `resources/js/Components/home/*`: storefront section components.
- `config/shopper/*`: ecommerce package behavior and models.
- `app/Providers/Filament/AdminPanelProvider.php`: admin panel setup.

## Data Ownership
- Server-owned page data belongs in controllers/services.
- Client-owned interaction state belongs in React component state.
- Shared page contracts should be versioned by TypeScript interfaces close to page modules.

## Recommended Growth Pattern
- Add feature modules under:
  - backend: `app/Domain/<Feature>` or `app/Services/<Feature>`
  - frontend: `resources/js/Components/<feature>`
- Keep Inertia pages thin and composition-focused.
- Add API routes only when real client-side mutation/read isolation is needed.
