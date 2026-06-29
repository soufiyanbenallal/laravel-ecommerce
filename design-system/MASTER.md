# KENZ Maison - Design System

> **Product Type:** Premium Fashion E-commerce  
> **Style:** Quiet Luxury / Editorial  
> **Last Updated:** 2026-06-28

---

## Pattern

- **Name:** Feature-Rich Showcase
- **CTA Placement:** Above fold
- **Sections:** Hero > Features > CTA

---

## Style

- **Name:** Liquid Glass
- **Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur, iridescent
- **Best For:** Premium e-commerce, luxury portfolios, creative platforms
- **Performance:** Moderate | **Accessibility:** Text contrast required

---

## Colors

### Primary Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary | #1C1917 | Headers, primary text |
| Secondary | #44403C | Body text, secondary elements |
| CTA | #CA8A04 | Buttons, accents, links |
| Background | #FAFAF9 | Page background |
| Text | #0C0A09 | Primary text |

### Extended Palette
| Role | Hex | Usage |
|------|-----|-------|
| Surface | #FFFFFF | Cards, elevated surfaces |
| Surface Elevated | #FAFAF9 | Dropdown menus |
| Surface Sunken | #F5F5F4 | Input backgrounds |
| Muted | #78716C | Captions, hints |
| Border | #E7E5E4 | Dividers, borders |
| Overlay | rgba(12,10,9,0.5) | Modals, drawers |

### Dark Mode
| Role | Hex |
|------|-----|
| Background | #0C0A09 |
| Foreground | #FAFAF9 |
| Primary | #F5F5F4 |
| Secondary | #A8A29E |
| Accent | #FACC15 |
| Border | #292524 |

---

## Typography

### Font Families
- **Heading:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Mono:** JetBrains Mono

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Type Scale (Desktop)
| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display | 4.5rem | 700 | 1.1 |
| H1 | 3.5rem | 600 | 1.15 |
| H2 | 2.5rem | 600 | 1.2 |
| H3 | 2rem | 500 | 1.25 |
| H4 | 1.5rem | 500 | 1.3 |
| Body LG | 1.125rem | 400 | 1.6 |
| Body | 1rem | 400 | 1.6 |
| Body SM | 0.875rem | 400 | 1.5 |
| Caption | 0.75rem | 500 | 1.4 |
| Overline | 0.6875rem | 600 | 1.4 |

### Type Scale (Mobile)
| Token | Size |
|-------|------|
| Display | 2.5rem |
| H1 | 2rem |
| H2 | 1.75rem |
| H3 | 1.5rem |

---

## Spacing

Base unit: 4px

| Token | Value | Pixels |
|-------|-------|--------|
| space-1 | 0.25rem | 4px |
| space-2 | 0.5rem | 8px |
| space-3 | 0.75rem | 12px |
| space-4 | 1rem | 16px |
| space-6 | 1.5rem | 24px |
| space-8 | 2rem | 32px |
| space-10 | 2.5rem | 40px |
| space-12 | 3rem | 48px |
| space-16 | 4rem | 64px |
| space-20 | 5rem | 80px |
| space-24 | 6rem | 96px |
| space-32 | 8rem | 128px |

---

## Grid

### Container Widths
| Token | Value |
|-------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1440px |

### Columns
- Mobile: 4 columns, 16px gap
- Tablet: 8 columns, 24px gap
- Desktop: 12 columns, 32px gap

---

## Border Radius

| Token | Value | Pixels |
|-------|-------|--------|
| none | 0 | 0 |
| sm | 0.25rem | 4px |
| md | 0.5rem | 8px |
| lg | 0.75rem | 12px |
| xl | 1rem | 16px |
| 2xl | 1.5rem | 24px |
| full | 9999px | Circle |

---

## Elevation

| Token | Usage |
|-------|-------|
| shadow-xs | Subtle depth |
| shadow-sm | Cards, buttons |
| shadow-md | Dropdowns |
| shadow-lg | Modals |
| shadow-xl | Drawers |
| shadow-2xl | Floating elements |

---

## Motion

### Duration
| Token | Value | Use Case |
|-------|-------|----------|
| instant | 0ms | Immediate feedback |
| fast | 150ms | Micro-interactions |
| normal | 250ms | Hover states |
| slow | 400ms | Page transitions |
| slower | 600ms | Scroll reveals |
| slowest | 1000ms | 3D animations |

### Easing
| Token | Value | Use Case |
|-------|-------|----------|
| ease-default | cubic-bezier(0.4, 0, 0.2, 1) | General |
| ease-in | cubic-bezier(0.4, 0, 1, 1) | Exiting |
| ease-out | cubic-bezier(0, 0, 0.2, 1) | Entering |
| ease-bounce | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful |
| ease-elastic | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Spring |

### Animation Standards
| Type | Duration | Easing |
|------|----------|--------|
| Micro-interaction | 150ms | ease-out |
| Hover state | 200ms | ease-in-out |
| Page transition | 400ms | anticipate |
| Scroll reveal | 600ms | ease-out |
| Image load | 800ms | ease-in-out |
| 3D rotation | 1000ms | ease-in-out |

---

## Component Variants

### Button
- **Primary:** bg-accent, text-white
- **Secondary:** bg-transparent, border, text-primary
- **Ghost:** bg-transparent, text-primary
- **Danger:** bg-red-600, text-white

### Card
- **Default:** bg-white, shadow-sm
- **Elevated:** bg-white, shadow-lg
- **Outlined:** bg-white, border

### Input
- **Default:** border, bg-white
- **Error:** border-red-500
- **Success:** border-green-500

---

## Responsive Behavior

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Layout Strategy
- Mobile-first approach
- Stack columns on mobile
- 2 columns on tablet
- 3-4 columns on desktop
- Full-width hero on all sizes

---

## Accessibility

### Requirements
- Color contrast: 4.5:1 minimum for text
- Focus states: Visible on all interactive elements
- Keyboard navigation: Full support
- Screen reader: Proper ARIA labels
- Reduced motion: Respect prefers-reduced-motion
- Images: Alt text required
- Forms: Labels required

### Focus States
```css
focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
```

---

## Anti-patterns to Avoid

- Vibrant or playful colors
- Block-based layouts
- Excessive animations
- Emoji as icons
- Missing cursor-pointer on interactive elements
- Layout shift on hover
- Invisible borders in light mode
- Text contrast below 4.5:1

---

*This document is the single source of truth for KENZ Maison design decisions.*
