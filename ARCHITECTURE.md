# KENZ Maison - Premium Shopify Theme Architecture

> **Version:** 1.0.0  
> **Status:** Architecture Document  
> **Last Updated:** 2026-06-28

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Project Vision](#3-project-vision)
4. [Design System](#4-design-system)
5. [Architecture Overview](#5-architecture-overview)
6. [Folder Structure](#6-folder-structure)
7. [Component Architecture](#7-component-architecture)
8. [Shopify Integration](#8-shopify-integration)
9. [React Islands Architecture](#9-react-islands-architecture)
10. [Build Pipeline](#10-build-pipeline)
11. [Animation System](#11-animation-system)
12. [Performance Strategy](#12-performance-strategy)
13. [Coding Standards](#13-coding-standards)
14. [Development Roadmap](#14-development-roadmap)
15. [Phased Implementation](#15-phased-implementation)

---

## 1. Executive Summary

KENZ Maison is a premium Shopify theme designed for luxury fashion e-commerce. The architecture maintains full Shopify compatibility (checkout, payments, apps, theme editor) while delivering a React-powered frontend experience comparable to brands like COS, Aime Leon Dore, and high-end fashion houses.

**Key Architectural Decisions:**
- **React Islands Pattern**: React powers interactive components, not the entire page
- **Liquid Foundation**: Server-rendered HTML ensures SEO, performance, and Shopify compatibility
- **Lazy Hydration**: Components hydrate on-demand, not globally
- **Vite Build Pipeline**: Modern tooling for fast development and optimized production builds

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI components |
| TypeScript | 5.x | Type safety |
| Vite | 6.x | Build tool |
| Tailwind CSS | 4.x | Utility-first styling |
| shadcn/ui | Latest | Component primitives |

### State Management
| Technology | Purpose |
|------------|---------|
| Zustand | Lightweight global state |
| React Context | Component-scoped state |

### Animation
| Technology | Purpose |
|------------|---------|
| Motion (Framer Motion successor) | Primary animation library |
| GSAP | Complex timeline animations |
| React Three Fiber | Isolated 3D experiences |

### Utilities
| Technology | Purpose |
|------------|---------|
| React Hook Form | Form handling |
| Zod | Schema validation |
| TanStack Virtual | Virtualized lists |
| Embla Carousel | Carousel component |
| Lenis | Smooth scrolling (optional) |

### Development
| Technology | Purpose |
|------------|---------|
| ESLint | Code linting |
| Biome | Fast formatting |
| Prettier | Code formatting |
| Husky | Git hooks |
| lint-staged | Pre-commit checks |
| Vitest | Unit testing |
| Playwright | E2E testing |

---

## 3. Project Vision

### Brand Positioning
KENZ Maison targets the premium fashion segment with an editorial, luxury-first experience. The store should feel like a fashion magazine meets high-end boutique — not a traditional e-commerce grid.

### Experience Principles
1. **Editorial First**: Large typography, immersive imagery, editorial layouts
2. **Performance Obsessed**: Sub-second interactions, instant feedback
3. **Motion with Purpose**: Every animation serves usability
4. **Accessible Luxury**: Premium experience for all users
5. **Mobile Excellence**: Touch-optimized, not just responsive

### Competitive Benchmarks
- **Apple**: Product showcase quality, clean layouts
- **Nike**: Dynamic imagery, bold typography
- **COS**: Minimalist luxury, editorial approach
- **Aime Leon Dore**: Brand storytelling, community feel

---

## 4. Design System

### 4.1 Color Palette

**Primary Palette (Quiet Luxury)**
```css
--color-background: #FAFAF9;
--color-foreground: #0C0A09;
--color-primary: #1C1917;
--color-secondary: #44403C;
--color-accent: #CA8A04;
--color-muted: #78716C;
--color-border: #E7E5E4;
```

**Extended Palette**
```css
--color-surface: #FFFFFF;
--color-surface-elevated: #FAFAF9;
--color-surface-sunken: #F5F5F4;
--color-overlay: rgba(12, 10, 9, 0.5);
```

**Dark Mode**
```css
--color-background: #0C0A09;
--color-foreground: #FAFAF9;
--color-primary: #F5F5F4;
--color-secondary: #A8A29E;
--color-accent: #FACC15;
--color-muted: #78716C;
--color-border: #292524;
```

### 4.2 Typography

**Font Stack**
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Type Scale (Desktop)**
| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `--text-display` | 4.5rem | 700 | 1.1 | -0.02em |
| `--text-h1` | 3.5rem | 600 | 1.15 | -0.015em |
| `--text-h2` | 2.5rem | 600 | 1.2 | -0.01em |
| `--text-h3` | 2rem | 500 | 1.25 | -0.005em |
| `--text-h4` | 1.5rem | 500 | 1.3 | 0 |
| `--text-body-lg` | 1.125rem | 400 | 1.6 | 0 |
| `--text-body` | 1rem | 400 | 1.6 | 0 |
| `--text-body-sm` | 0.875rem | 400 | 1.5 | 0.01em |
| `--text-caption` | 0.75rem | 500 | 1.4 | 0.02em |
| `--text-overline` | 0.6875rem | 600 | 1.4 | 0.08em |

**Type Scale (Mobile)**
| Token | Size |
|-------|------|
| `--text-display` | 2.5rem |
| `--text-h1` | 2rem |
| `--text-h2` | 1.75rem |
| `--text-h3` | 1.5rem |

### 4.3 Spacing System

**Base Unit: 4px**
```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### 4.4 Grid System

**Container Widths**
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
--container-fluid: 100%;
```

**Grid Columns**
- Mobile: 4 columns, 16px gap
- Tablet: 8 columns, 24px gap
- Desktop: 12 columns, 32px gap

### 4.5 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

### 4.6 Elevation

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

### 4.7 Motion Standards

**Duration**
```css
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;
--duration-slowest: 1000ms;
```

**Easing**
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 4.8 Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## 5. Architecture Overview

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN (Shopify)                        │
├─────────────────────────────────────────────────────────────┤
│                      Liquid Layer                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Layout  │  │Sections │  │ Snippets│  │Templates│       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                    React Islands Layer                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  Header │  │ Product │  │  Cart   │  │ Search  │       │
│  │  Island │  │  Island │  │  Island │  │  Island │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                      Core Layer                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Store   │  │ Services│  │  Hooks  │  │  Utils  │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Integration Flow

1. **Server Request** → Shopify CDN serves Liquid-rendered HTML
2. **Initial Paint** → Static HTML with critical CSS renders immediately
3. **JavaScript Load** → Vite-bundled JS loads asynchronously
4. **Hydration** → React Islands hydrate on-demand
5. **Interaction** → Full React interactivity available

### 5.3 Data Flow

```
Shopify Liquid Data
        │
        ▼
┌───────────────────┐
│  data-attributes  │  ← Liquid injects JSON into data attributes
│  (JSON in HTML)   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  React Islands    │  ← Islands read data-attributes on mount
│  (Client-side)    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Shopify APIs     │  ← Islands call AJAX APIs for updates
│  (Cart, Search)   │
└───────────────────┘
```

---

## 6. Folder Structure

### 6.1 Root Structure

```
kenz-maison/
├── assets/                    # Compiled assets (Shopify standard)
│   ├── app.css                # Compiled Tailwind CSS
│   ├── app.js                 # Compiled React bundle
│   ├── base.css               # Base styles
│   ├── vendor/                # Third-party libraries
│   └── images/                # Static images
├── blocks/                    # Theme blocks (OS 2.0)
├── config/                    # Theme settings
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/                    # Layout templates
│   ├── theme.liquid
│   └── password.liquid
├── locales/                   # Translation files
├── sections/                  # Section templates
├── snippets/                  # Reusable snippets
├── src/                       # Source files (React + CSS)
│   ├── app.css                # Tailwind entry point
│   ├── main.tsx               # React entry point
│   ├── islands/               # React Island components
│   │   ├── header/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── search/
│   │   ├── wishlist/
│   │   └── 3d/
│   ├── components/            # Shared React components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layout/            # Layout components
│   │   ├── product/           # Product components
│   │   ├── cart/              # Cart components
│   │   ├── search/            # Search components
│   │   └── editorial/         # Editorial components
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Zustand stores
│   ├── services/              # API service layer
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript types
│   └── styles/                # Style utilities
├── templates/                 # JSON templates
├── config.yml                 # Shopify CLI config
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── ARCHITECTURE.md
```

### 6.2 Islands Structure (Detailed)

```
src/islands/
├── header/
│   ├── HeaderIsland.tsx       # Main header island
│   ├── Navigation.tsx
│   ├── MegaMenu.tsx
│   └── MobileMenu.tsx
├── product/
│   ├── ProductIsland.tsx      # Product page island
│   ├── ProductGallery.tsx
│   ├── VariantPicker.tsx
│   ├── AddToCart.tsx
│   ├── ProductInfo.tsx
│   └── SizeGuide.tsx
├── cart/
│   ├── CartIsland.tsx         # Cart drawer island
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── Upsell.tsx
├── search/
│   ├── SearchIsland.tsx       # Search island
│   ├── SearchInput.tsx
│   ├── SearchResults.tsx
│   └── PredictiveSearch.tsx
├── wishlist/
│   ├── WishlistIsland.tsx     # Wishlist island
│   └── WishlistButton.tsx
├── 3d/
│   ├── Hero3DIsland.tsx       # 3D hero section
│   ├── ProductShowcase3D.tsx
│   └── FloatingAccessories.tsx
└── shared/
    ├── CarouselIsland.tsx
    ├── ModalIsland.tsx
    └── DrawerIsland.tsx
```

---

## 7. Component Architecture

### 7.1 Component Categories

#### Foundation Components (shadcn/ui)
```typescript
// src/components/ui/
├── button.tsx
├── input.tsx
├── label.tsx
├── select.tsx
├── dialog.tsx
├── sheet.tsx
├── drawer.tsx
├── accordion.tsx
├── tabs.tsx
├── tooltip.tsx
└── ...
```

#### Layout Components
```typescript
// src/components/layout/
├── Container.tsx        # Max-width container
├── Grid.tsx             # Responsive grid
├── Stack.tsx            # Vertical/horizontal stack
├── SplitLayout.tsx      # 50/50 or custom split
├── Section.tsx          # Section wrapper with padding
└── PageHeader.tsx       # Page title + breadcrumb
```

#### Product Components
```typescript
// src/components/product/
├── ProductCard.tsx      # Grid/list product card
├── ProductGrid.tsx      # Product grid with filters
├── ProductGallery.tsx   # Image gallery with zoom
├── VariantPicker.tsx    # Size/color picker
├── PriceDisplay.tsx     # Price with compare-at
├── ProductMeta.tsx      # Ratings, SKU, availability
└── QuickView.tsx        # Quick view modal
```

#### Editorial Components
```typescript
// src/components/editorial/
├── Hero.tsx             # Full-width hero
├── Lookbook.tsx         # Lookbook grid
├── EditorialSection.tsx # Text + image section
├── CampaignSection.tsx  # Campaign feature
├── Testimonials.tsx     # Customer reviews
├── InstagramFeed.tsx    # Social feed
├── Newsletter.tsx       # Email signup
└── FeatureGrid.tsx      # Icon/text grid
```

### 7.2 Component Interface Pattern

```typescript
interface ProductCardProps {
  product: ShopifyProduct;
  variant?: 'grid' | 'list' | 'minimal';
  showQuickAdd?: boolean;
  showWishlist?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  variant = 'grid',
  showQuickAdd = true,
  showWishlist = true,
  className,
}: ProductCardProps) {
  // Component implementation
}
```

### 7.3 Composition Pattern

```typescript
// Good: Composition
<Section padding="lg" background="muted">
  <Container size="lg">
    <SectionHeader title="New Arrivals" />
    <ProductGrid products={products} />
  </Container>
</Section>

// Avoid: Monolithic components
<NewArrivalsSection
  title="New Arrivals"
  products={products}
  padding="lg"
  background="muted"
  containerSize="lg"
/>
```

---

## 8. Shopify Integration

### 8.1 Liquid Templates

**theme.liquid**
```liquid
<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page_title }}</title>
  
  <!-- Critical CSS -->
  <style>{{ 'base.css' | asset_url | stylesheet_tag }}</style>
  
  <!-- Preload fonts -->
  <link rel="preload" href="{{ 'inter.woff2' | asset_url }}" as="font" crossorigin>
  <link rel="preload" href="{{ 'playfair.woff2' | asset_url }}" as="font" crossorigin>
</head>
<body class="template-{{ template.name }}">
  {% section 'announcement-bar' %}
  {% section 'header' %}
  
  <main id="MainContent" role="main">
    {{ content_for_layout }}
  </main>
  
  {% section 'footer' %}
  
  <!-- React Islands -->
  <script type="module" src="{{ 'app.js' | asset_url }}" defer></script>
</body>
</html>
```

### 8.2 Section Schema Pattern

```liquid
{% comment %}
  sections/featured-collection.liquid
{% endcomment %}

<div 
  class="section-featured-collection"
  data-section-id="{{ section.id }}"
  data-section-type="featured-collection"
  data-collection="{{ section.settings.collection }}"
>
  <div class="container">
    <h2 class="section-title">{{ section.settings.title }}</h2>
    
    <product-grid
      data-products='{{ section.settings.collection.products_json }}'
      data-columns="{{ section.settings.columns }}"
    ></product-grid>
  </div>
</div>

{% schema %}
{
  "name": "Featured Collection",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Featured Collection"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection"
    },
    {
      "type": "range",
      "id": "columns",
      "min": 2,
      "max": 4,
      "default": 4,
      "label": "Columns"
    }
  ],
  "presets": [
    {
      "name": "Featured Collection"
    }
  ]
}
{% endschema %}
```

### 8.3 Data Passing Pattern

```liquid
{% comment %}
  Pass data from Liquid to React via data attributes
{% endcomment %}

<div 
  id="product-island"
  data-product='{{ product | json }}'
  data-variants='{{ product.variants | json }}'
  data-options='{{ product.options | json }}'
  data-metafields='{{ product.metafields.custom | json }}'
></div>
```

### 8.4 React Island Initialization

```typescript
// src/islands/product/ProductIsland.tsx
import { hydrate } from 'react-dom/client';
import { ProductPage } from './ProductPage';

function initProductIsland() {
  const container = document.getElementById('product-island');
  if (!container) return;
  
  const product = JSON.parse(container.dataset.product || '{}');
  const variants = JSON.parse(container.dataset.variants || '[]');
  
  hydrate(
    <ProductPage product={product} variants={variants} />,
    container
  );
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductIsland);
} else {
  initProductIsland();
}
```

### 8.5 Shopify API Integration

```typescript
// src/services/cart.ts
export const CartService = {
  async get() {
    const response = await fetch('/cart.js');
    return response.json();
  },
  
  async addItem(variantId: number, quantity: number = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity }] }),
    });
    return response.json();
  },
  
  async updateItem(key: string, quantity: number) {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity }),
    });
    return response.json();
  },
  
  async removeItem(key: string) {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 }),
    });
    return response.json();
  },
};
```

### 8.6 Predictive Search Integration

```typescript
// src/services/search.ts
export const SearchService = {
  async predictive(query: string) {
    const response = await fetch(
      `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,article,page&resources[limit]=6`
    );
    return response.json();
  },
  
  async search(query: string, page: number = 1) {
    const response = await fetch(
      `/search?q=${encodeURIComponent(query)}&page=${page}&type=product&view=json`
    );
    return response.json();
  },
};
```

---

## 9. React Islands Architecture

### 9.1 Island Definition

Each React Island is:
- **Self-contained**: Complete feature in a single bundle
- **Lazy-loaded**: Only loads when DOM element exists
- **Data-driven**: Reads initial state from data attributes
- **API-connected**: Calls Shopify AJAX APIs for updates

### 9.2 Island Registration

```typescript
// src/main.tsx - Island registry
const islands = {
  'header': () => import('./islands/header/HeaderIsland'),
  'product': () => import('./islands/product/ProductIsland'),
  'cart': () => import('./islands/cart/CartIsland'),
  'search': () => import('./islands/search/SearchIsland'),
  'wishlist': () => import('./islands/wishlist/WishlistIsland'),
  'hero-3d': () => import('./islands/3d/Hero3DIsland'),
};

async function hydrateIslands() {
  const elements = document.querySelectorAll('[data-island]');
  
  for (const el of elements) {
    const islandName = el.dataset.island;
    if (!islandName || !islands[islandName]) continue;
    
    const loader = islands[islandName];
    const { default: Component } = await loader();
    
    hydrate(<Component />, el);
  }
}

// Initialize
hydrateIslands();
```

### 9.3 Island Usage in Liquid

```liquid
{% comment %}
  Header section with React Island
{% endcomment %}

<header-section
  data-island="header"
  data-logo="{{ settings.logo | img_url: 'master' }}"
  data-menu='{{ linklists["main-menu"] | json }}'
  data-cart-count="{{ cart.item_count }}"
>
  {% comment %} Static fallback for no-JS {% endcomment %}
  <noscript>
    {% render 'header-static' %}
  </noscript>
</header-section>
```

### 9.4 Bundle Splitting Strategy

```
app.js (main bundle)
├── core.js              # React, Zustand, shared code
├── islands/
│   ├── header.js        # Header island
│   ├── product.js       # Product island
│   ├── cart.js          # Cart island
│   ├── search.js        # Search island
│   ├── wishlist.js      # Wishlist island
│   └── 3d/
│       ├── three.js     # React Three Fiber
│       └── models.js    # 3D model loaders
└── vendor/
    ├── motion.js        # Motion library
    └── embla.js         # Embla carousel
```

---

## 10. Build Pipeline

### 10.1 Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name][extname]',
      },
    },
    manifest: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

### 10.2 Tailwind CSS v4 Configuration

```css
/* src/app.css */
@import "tailwindcss";

@theme {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --color-primary: #1C1917;
  --color-secondary: #44403C;
  --color-accent: #CA8A04;
  --color-background: #FAFAF9;
  --color-foreground: #0C0A09;
  
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Base styles */
@layer base {
  body {
    font-family: var(--font-body);
    color: var(--color-foreground);
    background-color: var(--color-background);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
```

### 10.3 Build Commands

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && npx @tailwindcss/cli -i src/app.css -o assets/app.css",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "biome format --write src",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "push": "shopify theme push --store wevente.myshopify.com --theme 161373585661"
  }
}
```

### 10.4 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Theme
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run typecheck
      - run: pnpm run lint
      - run: pnpm run test
      - run: pnpm run build
      - uses: shopify/shopify-theme-action@v1
        with:
          password: ${{ secrets.SHOPIFY_PASSWORD }}
          store: wevente.myshopify.com
          theme_id: ${{ secrets.THEME_ID }}
```

---

## 11. Animation System

### 11.1 Animation Categories

#### Scroll Animations
```typescript
// Intersection Observer based
const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    }, { threshold: 0.1, ...options });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return ref;
};
```

#### Page Transitions
```typescript
// Motion-based page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};
```

#### Hover Effects
```typescript
// Product card hover
const cardHover = {
  rest: { scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  hover: { scale: 1.02, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Image reveal on hover
const imageReveal = {
  rest: { scale: 1.1, opacity: 0 },
  hover: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};
```

### 11.2 Animation Standards

| Animation Type | Duration | Easing | Use Case |
|---------------|----------|--------|----------|
| Micro-interaction | 150ms | ease-out | Buttons, toggles |
| Hover state | 200ms | ease-in-out | Cards, links |
| Page transition | 400ms | anticipate | Route changes |
| Scroll reveal | 600ms | ease-out | Content entrance |
| Image load | 800ms | ease-in-out | Fade in |
| 3D rotation | 1000ms | ease-in-out | Product showcase |

### 11.3 Reduced Motion

```typescript
// Always respect prefers-reduced-motion
const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  
  return prefersReduced;
};

// Usage
const shouldAnimate = !useReducedMotion();
```

---

## 12. Performance Strategy

### 12.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Critical CSS, image optimization, preloading |
| FID | < 100ms | Code splitting, lazy hydration |
| CLS | < 0.1 | Reserved space, font display |
| TTFB | < 200ms | Shopify CDN, minimal server logic |

### 12.2 Loading Strategy

```
1. Critical CSS (inline)
   └── Above-fold styles immediately available

2. Font Loading
   └── Preload WOFF2, font-display: swap

3. Image Loading
   └── Lazy load below-fold, LQIP placeholder

4. JavaScript Loading
   └── Core bundle (defer) → Islands (on-demand)

5. Hydration
   └── Critical islands first → Rest on interaction
```

### 12.3 Image Optimization

```liquid
{% comment %}
  Responsive image with Shopify CDN
{% endcomment %}

<img
  src="{{ product_image | image_url: width: 400 }}"
  srcset="
    {{ product_image | image_url: width: 400 }} 400w,
    {{ product_image | image_url: width: 600 }} 600w,
    {{ product_image | image_url: width: 800 }} 800w,
    {{ product_image | image_url: width: 1200 }} 1200w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  loading="lazy"
  decoding="async"
  alt="{{ product.title }}"
  width="800"
  height="1000"
>
```

### 12.4 Bundle Size Targets

| Bundle | Target Size | Strategy |
|--------|-------------|----------|
| Core | < 50KB | React + Zustand only |
| Per Island | < 30KB | Feature-specific code |
| 3D Bundle | < 150KB | Lazy-loaded, compressed |

### 12.5 Code Splitting

```typescript
// Dynamic imports for route-based splitting
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));

// Feature-based splitting
const CartDrawer = lazy(() => import('./components/cart/CartDrawer'));
const SearchModal = lazy(() => import('./components/search/SearchModal'));
```

---

## 13. Coding Standards

### 13.1 File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase, `use` prefix | `useCart.ts` |
| Services | PascalCase, `Service` suffix | `CartService.ts` |
| Utilities | camelCase | `formatPrice.ts` |
| Types | PascalCase, singular | `Product.ts` |
| Styles | kebab-case | `product-card.css` |

### 13.2 Import Ordering

```typescript
// 1. External libraries
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { create } from 'zustand';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';

// 3. Hooks
import { useCart } from '@/hooks/useCart';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// 4. Services
import { CartService } from '@/services/cart';

// 5. Types
import type { Product, CartItem } from '@/types';

// 6. Utils
import { formatPrice } from '@/lib/format';
```

### 13.3 TypeScript Conventions

```typescript
// Use explicit return types for public functions
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Use interfaces for props
interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  onAddToCart?: (product: Product) => void;
}

// Use type for unions and utilities
type ProductVariant = 'small' | 'medium' | 'large';
type CartStatus = 'idle' | 'loading' | 'error' | 'success';
```

### 13.4 Component Conventions

```typescript
// Use named exports
export function ProductCard({ product, variant }: ProductCardProps) {
  // Hooks at top
  const { addItem } = useCart();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Event handlers
  const handleClick = useCallback(() => {
    addItem(product);
  }, [product, addItem]);
  
  // Early returns
  if (!product) return null;
  
  // Render
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* JSX */}
    </motion.div>
  );
}
```

### 13.5 Git Conventions

**Commit Messages**
```
feat: add product quick view modal
fix: resolve cart count sync issue
refactor: extract image component
style: update button hover states
docs: add component usage examples
test: add product card unit tests
```

**Branch Naming**
```
feat/quick-view-modal
fix/cart-count-sync
refactor/image-component
```

---

## 14. Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project setup (Vite, React, TypeScript, Tailwind)
- [ ] Design system implementation
- [ ] Theme layout (theme.liquid, header, footer)
- [ ] Base CSS and typography
- [ ] Component library setup (shadcn/ui)

### Phase 2: Core Features (Weeks 3-4)
- [ ] Header island with navigation
- [ ] Product card component
- [ ] Collection grid with filters
- [ ] Product page island
- [ ] Cart drawer island

### Phase 3: Enhanced Features (Weeks 5-6)
- [ ] Search island with predictive search
- [ ] Wishlist functionality
- [ ] Quick view modal
- [ ] Mobile navigation
- [ ] Account pages

### Phase 4: Editorial (Weeks 7-8)
- [ ] Hero sections
- [ ] Lookbook component
- [ ] Campaign sections
- [ ] Editorial pages
- [ ] Blog integration

### Phase 5: Premium (Weeks 9-10)
- [ ] 3D product showcase
- [ ] Advanced animations
- [ ] Page transitions
- [ ] Performance optimization
- [ ] Accessibility audit

### Phase 6: Polish (Weeks 11-12)
- [ ] Cross-browser testing
- [ ] Mobile optimization
- [ ] SEO optimization
- [ ] Documentation
- [ ] Launch preparation

---

## 15. Phased Implementation

### Phase 1: Foundation

**Goal**: Establish project structure, design system, and core layout.

**Deliverables**:
- Vite + React + TypeScript project
- Tailwind CSS v4 with design tokens
- Theme layout with header/footer
- shadcn/ui component integration
- Development environment setup

**Success Criteria**:
- `pnpm run dev` starts without errors
- Tailwind CSS compiles successfully
- Basic theme structure renders in Shopify

### Phase 2: Core Features

**Goal**: Build essential e-commerce functionality.

**Deliverables**:
- Header with mega menu
- Product cards and grid
- Product page with gallery
- Cart drawer
- Basic filtering

**Success Criteria**:
- Products display correctly
- Add to cart works
- Mobile responsive
- Theme editor compatible

### Phase 3: Enhanced Features

**Goal**: Add advanced shopping features.

**Deliverables**:
- Predictive search
- Wishlist
- Quick view
- Account pages
- Checkout flow

**Success Criteria**:
- Search returns relevant results
- Wishlist persists
- Checkout completes
- Orders process correctly

### Phase 4: Editorial

**Goal**: Create premium editorial experience.

**Deliverables**:
- Hero sections
- Lookbook
- Campaign pages
- Blog
- Editorial content

**Success Criteria**:
- Immersive layouts
- Smooth animations
- Mobile optimized
- Content editable in theme editor

### Phase 5: Premium

**Goal**: Deliver luxury-grade experience.

**Deliverables**:
- 3D product showcase
- Advanced animations
- Page transitions
- Performance optimization

**Success Criteria**:
- Lighthouse score > 90
- LCP < 2.5s
- CLS < 0.1
- 60fps animations

### Phase 6: Polish

**Goal**: Prepare for production launch.

**Deliverables**:
- Cross-browser testing
- Accessibility audit
- SEO optimization
- Documentation
- Launch checklist

**Success Criteria**:
- All browsers supported
- WCAG 2.1 AA compliant
- SEO score > 90
- Zero critical bugs

---

## Appendix A: Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### package.json
```json
{
  "name": "kenz-maison-shopify-theme",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build && pnpm run build:css",
    "build:css": "npx @tailwindcss/cli -i src/app.css -o assets/app.css",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "biome format --write src",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "push": "shopify theme push --store wevente.myshopify.com --theme 161373585661",
    "pull": "shopify theme pull --store wevente.myshopify.com --theme 161373585661"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zustand": "^5.0.0",
    "motion": "^12.0.0",
    "react-hook-form": "^7.54.0",
    "zod": "^3.24.0",
    "@tanstack/react-virtual": "^3.10.0",
    "embla-carousel-react": "^8.5.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/cli": "^4.0.0",
    "eslint": "^9.0.0",
    "@biomejs/biome": "^1.9.0",
    "vitest": "^3.0.0",
    "@playwright/test": "^1.49.0",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0"
  }
}
```

---

## Appendix B: Shopify Metafields Reference

Based on the project's metafields configuration:

| Namespace | Key | Type | Purpose |
|-----------|-----|------|---------|
| `collection` | `icon` | file_reference | Collection icon |
| `wevente` | `product_condition` | single_line_text | Product condition (new/used) |
| `shopify` | `color-pattern` | list.metaobject_reference | Color/pattern options |
| `shopify` | `activity` | list.metaobject_reference | Sport/activity type |
| `shopify` | `target-gender` | list.metaobject_reference | Target gender |
| `shopify` | `pants-length-type` | list.metaobject_reference | Pants length |
| `shopify` | `fabric` | list.metaobject_reference | Fabric type |
| `reviews` | `rating` | rating | Average rating |
| `reviews` | `rating_count` | number_integer | Total ratings |

---

*This architecture document serves as the single source of truth for KENZ Maison theme development. All implementation decisions should reference this document.*
