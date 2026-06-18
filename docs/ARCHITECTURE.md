# Architecture

## Overview
KENZ Import is a Laravel 12 + Shopper 2.1 + Inertia.js + React 19 TypeScript e-commerce storefront focused on direct imports from China to Morocco.

## Stack
- **Backend**: Laravel 12, Shopper 2.1 (admin panel), Filament 3, Stripe
- **Frontend**: React 19, TypeScript, Inertia.js v2, Tailwind CSS v4, Vite 7
- **State**: Zustand (client-side cart with localStorage persistence)
- **UI**: Radix UI primitives, shadcn/ui components, Lucide icons, Motion (Framer Motion)
- **Database**: MySQL via Laravel Sail (local dev)
- **Payments**: shopper/stripe, cash on delivery, bank transfer

## Request Flow
```
Browser → Inertia.js → Laravel Router → Controller → Service → Shopper Models
                                      ↓
                            Inertia::render('Page', $props)
                                      ↓
                            React Page Component ← props
```

## Module Map
- `routes/web.php` — All storefront routes (auth, cart, checkout, catalog, static pages)
- `app/Http/Controllers/` — Thin controllers delegating to services
- `app/Services/` — Business logic (HomeService, ShopperCheckoutService)
- `app/Http/Requests/` — Form validation (StoreCheckoutOrderRequest)
- `resources/js/Pages/` — Inertia page components
- `resources/js/Components/shared/` — Shared UI components (navbar, footer, cart-drawer, product-card)
- `resources/js/Components/ui/` — shadcn/ui primitives
- `resources/js/stores/` — Zustand stores (cart)
- `resources/js/types/` — TypeScript type definitions
- `config/shopper/*` — Shopper framework configuration

## Key Patterns
- Controllers stay thin; business logic lives in `app/Services/`
- Inertia props are typed on both PHP and TS sides
- Cart is client-side (Zustand + localStorage) synced to server session at checkout
- Product data comes from Shopper models; custom fields via `metadata` JSON column
- Flash messages shared via Inertia middleware (`HandleInertiaRequests`)
