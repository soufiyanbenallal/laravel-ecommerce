# Backend

## Stack
- Laravel 12 (PHP 8.2+)
- Shopper 2.1 (admin panel, e-commerce models)
- Filament 3 (admin UI for Shopper)
- Inertia.js v2 (server-side rendering to React)

## Controllers
All controllers are thin — they validate input, delegate to services, and return Inertia responses.

| Controller | Purpose |
|---|---|
| `HomeController` | Home page data via `HomeService` |
| `CatalogController` | Product listing with filters, search, sort, pagination |
| `ProductController` | Single product detail + related products |
| `CartController` | Cart CRUD (session-based) |
| `CheckoutController` | Checkout flow, order creation, order history, invoices |
| `Auth\AuthController` | Login, register, logout |
| `ContactController` | Contact form + sourcing form submissions |

## Services
| Service | Purpose |
|---|---|
| `HomeService` | Home page data: categories, flash deals, new arrivals, collections, testimonials |
| `ShopperCheckoutService` | Cart management (session), order creation (DB transaction), totals calculation, promo codes |

## Routes (`routes/web.php`)
- Public: home, catalog, product detail, cart, static pages (contact, FAQ, sourcing, CGV, etc.)
- Auth-protected: checkout, account/orders
- Guest-only: login, register
- Throttled: cart operations (60/min), checkout (10/min)

## Middleware
- `HandleInertiaRequests` — Shares flash messages, auth user, currency with all Inertia pages
- `throttle:cart` — Rate limits cart operations
- `throttle:checkout` — Rate limits checkout submissions
- `auth` — Requires authentication

## Models (via Shopper)
- `Product` — with prices, media, categories, options, variants
- `Category` — with products_count, metadata
- `Collection` — product groupings
- `Order` — with items, addresses, payment method
- `OrderAddress` — billing/shipping addresses
- `PaymentMethod` — enabled payment methods
- `User` — extends ShopperUser with first_name, last_name

## Key Patterns
- Cart stored in session (`checkout.cart`) — synced from Zustand at checkout
- Orders created in DB transaction with stock validation
- Product data formatted in services (price formatting, image URLs, discount calc)
- Form validation via FormRequest classes
- Shopper table prefix: `sh_` (configurable in `config/shopper/core.php`)

## Validation
All user input validated via Form Requests or inline `$request->validate()`.
- `StoreCheckoutOrderRequest` — Checkout form fields
- `CartController` — Cart item validation (slug, quantity)
- `ContactController` — Contact/sourcing form fields

## Promo Codes
Hardcoded in `ShopperCheckoutService::calculateTotals()`. Currently: `KENZ10` (10% off).
