---
name: shopify-theme
description: Shopify Theme development guidelines including Liquid, settings schemas, Tailwind CSS v4 integration, custom sections/blocks, and deployment.
---
# shopify-theme

Guidelines and best practices for developing, styling, validating, and deploying the Shopify theme in this repository.

## Theme Architecture

The Shopify theme is structured using the standard Shopify Online Store 2.0 folder hierarchy:

```
├── assets/             # JavaScript components, images, SVGs, compiled app.css, base.css
├── blocks/             # Theme blocks (.liquid)
├── config/             # settings_schema.json, settings_data.json
├── layout/             # layout templates (theme.liquid, password.liquid)
├── locales/            # Translation/translation schema files
├── sections/           # Section templates (.liquid)
├── snippets/           # Reusable snippets (.liquid)
├── src/                # Tailwind v4 source stylesheet (src/app.css)
├── templates/          # JSON template pages (index.json, product.json, etc.)
└── config.yml          # Connection configuration (Store, Theme ID, Password)
```

---

## Styling and Tailwind CSS v4 Rules

The theme uses **Tailwind CSS v4** compiled via `@tailwindcss/cli`.

### Build & Compilation Commands
* **Build Tailwind CSS:**
  ```bash
  pnpm run build
  ```
  *(Equiv: `npx @tailwindcss/cli -i src/app.css -o assets/app.css`)*
* **Watch Tailwind CSS:**
  ```bash
  pnpm run watch
  ```
  *(Equiv: `npx @tailwindcss/cli -i src/app.css -o assets/app.css --watch`)*

### Tailwind CSS v4 Syntax Guidelines
* **CSS Variable referencing:** In Tailwind v4, standard CSS variables are referenced directly using parenthesis instead of square brackets:
  * **Correct:** `bg-(--background)`, `text-(--foreground)`
  * **Incorrect:** `bg-[var(--background)]`, `text-[var(--foreground)]`
* **Theme Styling (KENZ Maison):** Maintain the "Quiet Luxury" aesthetic. Use curated, harmonious color palettes, sophisticated typography, smooth hover transitions, and subtle borders.

---

## Schema and Setting Guidelines

JSON schemas in sections, blocks, and configuration files must strictly adhere to Shopify specifications.

### Global settings_schema.json
* Located in `config/settings_schema.json`.
* When defining structured settings (like `color_palette`), ensure that the defaults in both `settings_schema.json` and `settings_data.json` match the expected structure precisely.
* Example structure:
  ```json
  {
    "type": "color_palette",
    "id": "color_palette",
    "label": "Color Palette",
    "default": {
      "background": "#ffffff",
      "foreground": "#000000",
      "color1": "#f5f5f5",
      "color2": "#e5e5e5",
      "color3": "#d5d5d5"
    }
  }
  ```
* Reference settings in Liquid using `{{ settings.color_palette.color1 }}`.

### Section and Block Schemas
* Local schemas are declared inside the `{% schema %}` block at the bottom of the `.liquid` file.
* Schemas must be valid JSON.
* For custom theme blocks (in the `blocks/` directory), ensure they are registered correctly. If a block is used in a JSON template, make sure it is defined in the `blocks` directory and registered under the template's schema settings if required.
* Do not mix standard blocks and theme blocks unless `@theme` is explicitly declared.

---

## Custom Interactions and Javascript

Interactive elements (drawers, product forms, filters, variant pickers) are built using standard Vanilla JavaScript and Custom Elements (Web Components) in the `assets/` folder.

### Rules for JavaScript Components
* **Extend HTMLElement:** Implement custom UI components by extending the standard `HTMLElement` class and registering it with `customElements.define('custom-name', CustomClass)`.
* **Events Coordination:** Use custom events dispatched from components to handle global actions (like adding items to the cart or updating price displays).
* **DOM Cleanup:** Ensure event listeners are properly registered and cleaned up in lifecycle hooks (e.g. `disconnectedCallback()`).
* **Visual Transitions:** Implement smooth hover, focus, and open states (e.g., using `transition-all duration-200` classes and the `transition-behavior` property where applicable).
* **Clickable Elements:** Add `cursor-pointer` to all clickable custom elements and check that hover states show proper visual feedback.

---

## Deployment Guidelines

Always deploy using the **Shopify CLI** instead of legacy ThemeKit to ensure that Online Store 2.0 blocks (in the `blocks/` directory) are compiled, validated, and pushed.

### Theme Push Command
To push files to the store specified in `config.yml` (e.g., `wevente.myshopify.com` / Theme ID `161373585661`), run:
```bash
shopify theme push --store wevente.myshopify.com --theme 161373585661 --password shptka_7032c0e6d70c419670c4fac14878c769 --allow-live
```

> [vanilla WARNING]
> The `--allow-live` flag is required because the target theme might be the active publishing theme. Double check that all schemas are valid before pushing.

---

## Pre-Push Schema & Liquid Checklist

Before pushing changes to the theme, verify the following:
- [ ] No JSON syntax errors in section or block schema definitions.
- [ ] All dynamic settings references (`{{ settings.color_palette.x }}`) exist in `config/settings_schema.json` and are initialized in `config/settings_data.json`.
- [ ] Tailwind CSS has been built using `pnpm run build` and files like `assets/app.css` are updated.
- [ ] Custom elements are declared properly and do not generate console errors.
- [ ] Liquid tags and control flows (`{% if %}`, `{% for %}`) are balanced and closed.
