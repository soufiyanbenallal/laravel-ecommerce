# Shopify Horizon React Foundation - Architecture & Bootstrap Prompt

You are a Senior Shopify Theme Architect and Senior React Architect.

Your goal is to create a production-ready Shopify theme foundation built on top of Shopify Horizon.

Do NOT create a complete ecommerce theme.

Do NOT create dozens of sections.

Do NOT create unnecessary features.

The objective is to establish a clean, scalable foundation that future developers can extend safely.

---

# Project Objective

Use Shopify Horizon as the base theme.

Immediately remove all unnecessary sections, templates, components, and styling that are not required for the foundation.

Create a minimal architecture that will serve as the long-term base for a premium fashion storefront.

The foundation should prioritize:

- Simplicity
- Scalability
- Performance
- Developer Experience
- Shopify Compatibility
- React Integration

---

# Core Principle

Liquid should remain responsible for:

- Layout
- SEO
- Server-rendered content
- Shopify Theme Editor compatibility

React should only be loaded where interactivity is required.

Never convert the entire storefront into a React SPA.

Use React Islands architecture.

---

# Theme Scope

Initial build should contain only:

## Layout

- Header
- Footer

## Homepage

Single Hero Section

## Product Page

Single Product Section

## Collection Page

Single Collection Section

No additional sections.

No testimonials.

No FAQ.

No newsletter.

No marketing blocks.

No sliders.

No popup systems.

No blog features.

No customer account customizations.

Everything else will be added later.

---

# Shopify Base

Start from:

Shopify Horizon

Tasks:

1. Analyze Horizon structure.
2. Identify reusable foundation pieces.
3. Remove unnecessary sections.
4. Remove unused assets.
5. Remove unused snippets.
6. Remove unused JavaScript.
7. Remove unused CSS.
8. Simplify templates.
9. Preserve Shopify best practices.

---

# Technology Stack

Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS

UI

- shadcn/ui (optional future usage)

State

- Zustand only if needed

Validation

- Zod

Animations

- Motion

No GSAP initially.

No Three.js initially.

No React Three Fiber initially.

These may be added later.

---

# Styling Strategy

Tailwind should become the primary styling system.

Requirements:

- Tailwind available in Liquid
- Tailwind available in React
- Single design token source
- Shared spacing scale
- Shared color system
- Shared typography scale

Avoid:

- Mixed styling systems
- Utility duplication
- Legacy Horizon CSS architecture

Design a clean integration strategy.

---

# React Islands Architecture

Design a lightweight island architecture.

Requirements:

- No global React root
- No SPA routing
- No full-page hydration

Each island should hydrate independently.

Example:

Hero Island

Product Island

Collection Island

Cart Drawer Island (future)

Search Island (future)

Each island must:

- Load only when present
- Support code splitting
- Support lazy loading
- Minimize JavaScript payload

---

# Hydration Requirements

Design a hydrateIslands() system.

Requirements:

1. Discover island containers automatically.
2. Dynamically import matching React entrypoints.
3. Hydrate only visible islands.
4. Avoid duplicate hydration.
5. Support section re-rendering in Shopify Theme Editor.
6. Support future islands without architecture changes.

Example concept:

data-island="hero"

data-island="product"

data-island="collection"

The hydration system should be designed for maximum scalability.

---

# Initial React Islands

## Hero Island

Homepage only.

Responsibilities:

- Lightweight animations
- CTA interactions
- Future campaign enhancements

---

## Product Island

Product template only.

Responsibilities:

- Variant selection
- Product media interactions
- Future add-to-cart enhancements

---

## Collection Island

Collection template only.

Responsibilities:

- Collection interactions
- Filtering foundation
- Sorting foundation

---

# Project Structure

Design a scalable structure.

Examples:

theme/

layout/

templates/

sections/

snippets/

assets/

config/

locales/

src/everything of react a

design-system/

The structure should support years of growth.

---

# Build System

Use Vite.

Requirements:

- Multiple entrypoints
- Fast HMR
- TypeScript
- Production optimization
- Asset hashing
- Shopify asset output

Build output should integrate cleanly with Shopify assets.

---

# Performance Budget

Optimize for:

- Minimal JavaScript
- Minimal hydration
- Fast LCP
- Fast INP
- Fast CLS

Rules:

- React only where necessary
- Lazy load islands
- Dynamic imports
- Route-level bundles
- Avoid unnecessary dependencies

---

# Theme Editor Compatibility

The architecture must support:

- Shopify Section Rendering API
- Theme Editor updates
- Section reloads
- Section selection events

React islands must safely remount when Shopify re-renders sections.

---

# Deliverables

Do NOT generate implementation code first.

Instead generate:

1. Recommended folder structure.
2. Horizon cleanup plan.
3. React Islands architecture.
4. hydrateIslands design.
5. Tailwind integration strategy.
6. Vite build architecture.
7. Theme Editor compatibility strategy.
8. Performance strategy.
9. Development roadmap.
10. Future scalability plan.

Treat this as a production architecture document for a premium Shopify theme foundation rather than a coding task.
