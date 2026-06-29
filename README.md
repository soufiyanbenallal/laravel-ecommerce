# KENZ Maison - Shopify Theme

A premium Shopify theme for luxury fashion e-commerce, built with React and modern web technologies.

## Features

- **React Islands Architecture** - Interactive components with lazy hydration
- **Tailwind CSS v4** - Utility-first styling with design tokens
- **Motion Animations** - Smooth, accessible animations
- **3D Experiences** - React Three Fiber for premium product showcases
- **Full Shopify Compatibility** - Checkout, payments, apps, theme editor

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand (State)
- Motion (Animations)
- React Three Fiber (3D)
- Embla Carousel

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Type check
pnpm run typecheck

# Deploy to Shopify
pnpm run push
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Vite dev server |
| `pnpm run build` | Production build |
| `pnpm run build:css` | Build Tailwind CSS |
| `pnpm run typecheck` | TypeScript type check |
| `pnpm run lint` | ESLint check |
| `pnpm run format` | Format with Biome |
| `pnpm run test` | Run Vitest |
| `pnpm run test:e2e` | Run Playwright tests |
| `pnpm run push` | Deploy to Shopify |

## Project Structure

```
kenz-maison/
├── assets/             # Compiled assets
├── blocks/             # Theme blocks
├── config/             # Settings
├── layout/             # Layout templates
├── locales/            # Translations
├── sections/           # Section templates
├── snippets/           # Reusable snippets
├── src/                # Source files
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── islands/        # React Islands
│   ├── lib/            # Utilities
│   ├── services/       # API services
│   ├── store/          # Zustand stores
│   └── types/          # TypeScript types
├── templates/          # JSON templates
└── design-system/      # Design documentation
```

## Architecture

### React Islands

Interactive components are implemented as React Islands that hydrate independently:

- `HeaderIsland` - Navigation and mega menu
- `CartIsland` - Cart drawer
- `SearchIsland` - Predictive search
- `ProductIsland` - Product page
- `WishlistIsland` - Wishlist drawer
- `Hero3DIsland` - 3D hero experience

### Shopify Integration

- Liquid templates for server rendering
- Data attributes for React hydration
- AJAX APIs for cart and search
- Theme editor compatibility

## Design System

See `design-system/MASTER.md` for the complete design system documentation.

## License

All rights reserved.
