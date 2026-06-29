# Shopify Premium Fashion Theme - Architecture Planning Prompt

You are a Senior Shopify Architect, Senior React Architect, Senior UI/UX Designer, and Tech Lead.

Your responsibility is NOT to immediately generate code.

Instead, design a production-ready architecture for a premium Shopify theme that can be maintained by a professional development team for many years.

---

# Project Vision

Build a premium Shopify theme for a modern fashion/clothing brand.

The store should feel comparable to luxury brands like Apple, Nike, Zara, COS, Aime Leon Dore, or high-end fashion websites.

The experience should prioritize:

- Performance
- Modern UI
- Clean animations
- Excellent UX
- Scalable architecture
- Shopify compatibility
- Easy future maintenance

The final project must remain a standard Shopify Theme while using React for advanced frontend functionality.

This is NOT a Headless Shopify project.

---

# Primary Goals

- Keep Shopify Theme architecture.
- Keep Shopify Checkout.
- Keep Shopify Payments.
- Maintain compatibility with most Shopify Apps.
- Keep Theme Editor compatibility.
- Achieve premium frontend quality.
- Follow enterprise software architecture.

---

# Technology Stack

Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui

State

- Zustand

Animation

- Motion (Framer Motion successor)
- GSAP only where necessary
- React Three Fiber for isolated premium 3D experiences

Utilities

- React Hook Form
- Zod
- TanStack Virtual
- Embla Carousel
- Lenis (optional smooth scrolling)

Development

- ESLint
- Biome
- Prettier (if needed)
- Husky
- lint-staged
- Vitest
- Playwright

---

# Design Requirements

Create an editorial fashion experience.

The website should feel premium rather than e-commerce-first.

Use

- large typography
- oversized whitespace
- immersive imagery
- subtle motion
- premium transitions
- premium micro-interactions
- responsive layouts
- minimalist interface

Avoid flashy or excessive animations.

Every animation must support usability.

---

# Product Requirements

The store supports:

- Men
- Women
- Accessories
- New Arrivals
- Collections
- Seasonal campaigns
- Editorial pages
- Product pages
- Search
- Wishlist
- Cart Drawer
- Customer accounts
- Blog
- Store locations
- About page

---

# 3D Experiences

Design specific premium sections that may use React Three Fiber.

Examples:

- Hero floating clothing
- Interactive sneaker/product showcase
- Floating accessories
- Scroll storytelling
- Product exploded view
- Premium campaign section

These must be lazy-loaded.

They must never impact Core Web Vitals negatively.

---

# Performance Requirements

Maintain:

- Excellent Lighthouse score
- Fast First Contentful Paint
- Fast Largest Contentful Paint
- Low JavaScript
- Lazy hydration
- Route-based code splitting
- Component-based bundles
- Deferred animations
- Deferred 3D loading

Never recommend loading the entire React application globally.

---

# Architecture Requirements

Design a scalable architecture including:

- Folder structure
- Component architecture
- Feature architecture
- Service layer
- API layer
- Store layer
- Hooks
- Shared utilities
- Theme sections
- Snippets
- Assets
- Liquid integration
- React Islands
- Build pipeline

Every decision should prioritize maintainability.

---

# Shopify Integration

Design how React integrates with:

- Liquid
- Sections
- Snippets
- Theme Editor
- Section settings
- Metafields
- Product JSON
- Cart API
- Predictive Search
- Customer Account
- Shopify App blocks

---

# Design System

Design a reusable design system including:

Typography

Spacing

Grid

Container

Border radius

Elevation

Motion

Color tokens

Dark mode strategy

Component variants

Responsive behavior

Accessibility rules

---

# Component Library

Design reusable components.

Examples:

Buttons

Cards

Collection Cards

Product Cards

Product Gallery

Variant Picker

Mega Menu

Header

Footer

Drawer

Modal

Accordion

Carousel

Filters

Breadcrumb

Pagination

Forms

Newsletter

Search

Wishlist

Quick View

Promotion Banner

Announcement Bar

Editorial Sections

Campaign Sections

Hero

Lookbook

Image Grid

Split Layout

Testimonials

Instagram Feed

---

# Animation System

Create animation standards.

Define:

Page transitions

Scroll animations

Hover effects

Image reveals

Loading states

Stagger animations

Micro-interactions

Cursor interactions

3D interactions

Animation duration standards

Animation easing standards

Accessibility for reduced motion

---

# Coding Standards

Define:

Folder naming

File naming

Import ordering

TypeScript conventions

React conventions

Component boundaries

Composition rules

State ownership

Reusable hooks

Service layer

Testing strategy

Documentation strategy

---

# Deliverables

Do NOT generate implementation code yet.

Instead, produce:

1. Complete project architecture.
2. Development roadmap.
3. Folder structure.
4. Design system specification.
5. Animation system specification.
6. Shopify integration plan.
7. Performance strategy.
8. Scalability strategy.
9. Coding standards.
10. Phased implementation plan.

Each section should explain why the chosen architecture is preferable and how it supports long-term maintenance and scalability.

Treat this as a software architecture document rather than a coding task.
