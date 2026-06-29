# Plan: Porting React Design to Shopify Headless Storefront (Hydrogen)

This document outlines the step-by-step implementation plan to migrate the `react-design` assets and components into the Shopify Hydrogen storefront. The design system uses Tailwind CSS v4, shadcn UI, TypeScript, and Zustand, which we will port incrementally without modifying styles.

---

## 1. Objectives & Guidelines

1. **Maintain Styling Integrity**: Do not change the premium luxury style, layout, custom fonts, transitions, and OKLCH color palettes defined in `react-design/css/app.css`.
2. **React Router v7 / Hydrogen Compliance**: Replace all `@inertiajs/react` routing and client-side page state with React Router v7 components (`Link`, `Form`, etc.) and loaders/actions. Never use `react-router-dom` imports, per `.ai/rules/hydrogen-react-router.mdc`.
3. **Modular Architect Rules**:
   - Rename and restructure all files to use role-based suffixes:
     - Pages: `name.index.tsx`, `name.show.tsx`
     - Partials: `name.part.tsx`
     - Shared components: `name.shared.tsx` or `name.part.tsx`
   - Store all reusable types in `app/types/` using the `Type` or `ModelType` naming convention (e.g. `ProductModelType`).
   - Place page components inside `app/pages/` and import them inside `app/routes/` to keep routes clean and comply with React Router file-based routing.
4. **Zustand & Shopify Cart Integration**:
   - Use Zustand for UI states (wishlist, menu overlays, drawer states).
   - Use Shopify Storefront Cart API (via Hydrogen forms & hooks) for the cart instead of raw local storage, keeping the design layout exact but fetching live Shopify data.

---

## 2. Dependencies to Install

We will use `pnpm` to install these packages in the workspace:

| Package | Purpose | Scope |
|---|---|---|
| `tailwindcss@next` | Tailwind CSS v4 engine | Dev |
| `@tailwindcss/vite@next` | Tailwind CSS v4 integration with Vite | Dev |
| `tw-animate-css` | CSS animations for Tailwind v4 (shadcn utility) | Dev |
| `shadcn` | shadcn UI v4 compiler / styling bridge | Dev |
| `lucide-react` | Icons used in components | Prod |
| `zustand` | State management for Wishlist & UI overlays | Prod |
| `clsx` | Class name utility (shadcn `cn`) | Prod |
| `tailwind-merge` | Merge Tailwind class conflicts (shadcn `cn`) | Prod |
| `radix-ui` | Radix Primitives all-in-one package for UI components | Prod |
| `class-variance-authority` | Conditional styling variants for UI components | Prod |
| `sonner` | Toast notification provider (ported from react-design) | Prod |

---

## 3. Configuration Updates

### A. Vite Configuration (`vite.config.js`)
Integrate Tailwind v4 compilation by adding the `@tailwindcss/vite` plugin:
```js
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite'; // Import Tailwind CSS v4

export default defineConfig({
  plugins: [
    tailwindcss(), // Must be added before reactRouter()
    hydrogen(), 
    oxygen(), 
    reactRouter()
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // ... rest of config
});
```

### B. TypeScript Configuration (`tsconfig.json`)
Correct the paths to point `@/*` directly to the `app/` directory and ensure it parses all TSX files:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./app/*"]
    }
  },
  "include": [
    "app/**/*.ts",
    "app/**/*.tsx",
    "app/**/*.d.ts",
    "env.d.ts"
  ]
}
```

### C. Stylesheet Integration (`app/styles/app.css`)
Replace the contents of `app/styles/app.css` (retaining backup) with the Tailwind CSS v4 imports and theme definitions from `react-design/css/app.css`. Also import the Google fonts.

---

## 4. File Mapping & Structure

To implement the modular architecture, we will organize the files as follows:

```
app/
├── assets/                  # Images, logos, and local graphics
├── components/
│   ├── shared/              # Reusable shared components
│   │   ├── category-card.part.tsx
│   │   └── product-card.part.tsx
│   ├── site/                # Global layout components (Header, Footer, Menu)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── SearchOverlay.tsx
│   │   └── CartDrawer.tsx
│   └── ui/                  # Ported shadcn UI elements
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       └── tabs.tsx
├── lib/
│   ├── utils.ts             # Tailwind merge utility (`cn`)
│   ├── wishlist-store.ts    # Zustand wishlist store
│   └── cart-store.ts        # Zustand UI cart-open store (bridges with Shopify)
├── types/
│   └── ecommerce.types.ts   # Core TypeScript interfaces (using Type suffix)
├── pages/                   # Component views imported inside route handlers
│   ├── home/
│   │   ├── home.index.tsx
│   │   └── partials/        # Page-specific partial components
│   │       ├── home-hero.part.tsx
│   │       ├── home-collections.part.tsx
│   │       ├── home-new-arrivals.part.tsx
│   │       └── ...
│   ├── shop/
│   │   ├── catalog.index.tsx
│   │   └── product.show.tsx
│   ├── collections/
│   │   ├── collections.index.tsx
│   │   └── collections.show.tsx
│   ├── wishlist/
│   │   └── wishlist.index.tsx
│   └── cart/
│       └── cart.index.tsx
└── routes/                  # React Router 7 entry files (Loaders + View exports)
    ├── _index.tsx
    ├── products.$handle.tsx
    ├── collections.all.tsx
    ├── collections.$handle.tsx
    ├── wishlist.tsx
    └── cart.tsx
```

---

## 5. Incremental Execution Roadmap

### Step 1: Base Configuration & Libraries (Foundational)
1. Install package dependencies (`pnpm install`).
2. Update `tsconfig.json` paths and Vite config.
3. Replace `app/styles/app.css` with the Tailwind v4 custom stylesheets from `react-design/css/app.css`.
4. Port `app/lib/utils.ts` and `app/types/ecommerce.types.ts`.
5. Create Zustand stores `app/lib/wishlist-store.ts` and `app/lib/cart-store.ts` (porting from design).
6. Verify development server compiles empty files and runs without errors.

### Step 2: UI Primitives (shadcn)
1. Copy shadcn primitives to `app/components/ui/`:
   - `button.tsx`, `card.tsx`, `separator.tsx`, `sheet.tsx`, `tabs.tsx`, `input.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `alert.tsx`, `accordion.tsx`.
2. Update imports inside primitives to point to `@/lib/utils` and use the `radix-ui` package instead of separate primitives if needed.

### Step 3: Shared & Global Layout Components
1. **Shared Cards**: Port `product-card.part.tsx` and `category-card.part.tsx` to `app/components/shared/`. Adjust them to use `react-router` `Link` (using `to` instead of `href`).
2. **Footer**: Port `Footer.tsx` to `app/components/site/Footer.tsx`. Adjust menu links to map dynamically from Shopify's footer menu data.
3. **MegaMenu & SearchOverlay**: Port components, ensuring search trigger hooks connect to the Hydrogen predictive search endpoints.
4. **Header & Cart Drawer**: 
   - Port `Header.tsx` and `CartDrawer.tsx` to `app/components/site/`.
   - Update `CartDrawer` to retrieve items from the Shopify Cart (passed from PageLayout context) and perform line quantity additions/removals via Hydrogen's `CartForm` actions.
5. **PageLayout.jsx -> PageLayout.tsx**: Merge the custom Header and Cart Drawer into the main layout wrapper in `app/components/PageLayout.tsx`.

### Step 4: Page-by-Page Migration

#### Phase 4.1: Home Page (`routes/_index.tsx`)
- Move components inside `Pages/home/partials/` to `app/pages/home/partials/`.
- Create `app/pages/home/home.index.tsx`.
- Update `app/routes/_index.jsx` to load featured products and collections from Shopify storefront API and pass them as props to `home.index.tsx`.
- Rename route file to `app/routes/_index.tsx`.

#### Phase 4.2: Catalog & Shop Pages (`routes/collections.all.tsx`)
- Create `app/pages/shop/catalog.index.tsx`.
- Map the filter sidebar, search triggers, sorting options to load from the Shopify Storefront collection query.
- Create/update `app/routes/collections.all.tsx` to export this catalog view.

#### Phase 4.3: Product Detail Page (`routes/products.$handle.tsx`)
- Create `app/pages/shop/product.show.tsx`.
- Implement variant selectors (color, size) using Hydrogen's `<VariantSelector>` helper.
- Set up `<CartForm>` to trigger the Shopify Cart line additions natively.
- Connect layout gallery to the product media edges.
- Port route file to `app/routes/products.$handle.tsx`.

#### Phase 4.4: Collection Show Page (`routes/collections.$handle.tsx`)
- Create `app/pages/collections/collections.show.tsx`.
- Hook it to the loader in `app/routes/collections.$handle.tsx`.

#### Phase 4.5: Wishlist Page (`routes/wishlist.tsx`)
- Create `app/pages/wishlist/wishlist.index.tsx` reading list ids from Zustand `useWishlist`.
- Create a new route `app/routes/wishlist.tsx` to display the wishlist page.

#### Phase 4.6: Cart Page (`routes/cart.tsx`)
- Port `cart.index.tsx` to `app/pages/cart/cart.index.tsx` using Shopify cart hook items.
- Render it in `app/routes/cart.tsx` with loader data.

---

## 6. Verification and Build Check

After each step, compile and run types check:
```bash
shopify hydrogen codegen && react-router typegen
pnpm build
```
This ensures that the project builds successfully on Shopify Oxygen and has zero runtime JS or styling regressions.
