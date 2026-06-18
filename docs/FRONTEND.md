# Frontend

## Stack
- React 19 + TypeScript
- Inertia.js v2 (SPA-like navigation without API)
- Tailwind CSS v4 (utility-first, tokens in `resources/css/app.css`)
- Vite 7 (build tool)
- Zustand (state management for cart)
- Motion (animations)
- shadcn/ui + Radix UI (component primitives)

## Entry Point
`resources/js/app.tsx` — Inertia app setup with page resolution via `import.meta.glob`.

## Layout
`resources/js/Layouts/main-layout.tsx` — Shared layout wrapping all pages:
- AnnouncementBarPart (rotating promo messages)
- NavbarPart (sticky nav with mega menu, search, cart icon, auth state)
- FooterPart (links, newsletter, payment methods)
- PromoModalPart (welcome popup with sessionStorage dismiss)
- CartDrawerPart (slide-out cart drawer)
- Flash messages (success/error from session)

## Page Structure
```
Pages/
├── Auth/           Login.tsx, Register.tsx
├── Home/           home.index.tsx + partials/
├── Shop/           catalog.index.tsx, product.show.tsx
├── cart/           Index.tsx
├── checkout/       Index.tsx
├── account/        OrdersIndex.tsx, OrderSubmitted.tsx
├── Static/         Contact.tsx, Faq.tsx, Sourcing.tsx, Cgv.tsx, etc.
```

## Shared Components
- `Components/shared/navbar.part.tsx` — Navigation with mega menu, search, auth
- `Components/shared/footer.part.tsx` — Footer with real Inertia links
- `Components/shared/product-card.part.tsx` — Product card with add-to-cart
- `Components/shared/cart-drawer.part.tsx` — Slide-out cart
- `Components/shared/category-card.part.tsx` — Category card
- `Components/shared/sourcing-form.shared.tsx` — Sourcing request form
- `Components/shared/announcement-bar.part.tsx` — Rotating announcements
- `Components/shared/promo-modal.part.tsx` — Welcome popup

## Types
`resources/js/types/ecommerce.types.ts` — All shared TypeScript interfaces:
- `ProductModelType`, `CategoryModelType`, `CollectionModelType`, `TestimonialType`
- `CheckoutCartItem`, `CheckoutTotals`, `PaymentMethodItem`
- `HomePropsType`

## Cart (Zustand)
`resources/js/stores/cart.store.ts`:
- Client-side cart with `localStorage` persistence (`kenz-cart-storage`)
- `addItem(product, quantity?)` — adds or increments
- `removeItem(productId)`, `updateQuantity(productId, qty)`, `clearCart()`
- `totalItems()`, `subtotal()` — derived state
- Synced to server session via `POST /cart/sync` at checkout

## Conventions
- Use `@/*` alias for imports from `resources/js/`
- Component files: `*.part.tsx` for page sections, `*.tsx` for standalone
- Type suffix: `*Type` (e.g., `ProductModelType`)
- Props suffix: `*PropsType`
- Tailwind classes follow the theme tokens defined in `resources/css/app.css`
