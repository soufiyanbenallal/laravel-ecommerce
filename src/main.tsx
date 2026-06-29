import { hydrateRoot } from 'react-dom/client';

type IslandLoader = () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;

const islands: Record<string, IslandLoader> = {
  header: () => import('./islands/header/HeaderIsland'),
  product: () => import('./islands/product/ProductIsland'),
  cart: () => import('./islands/cart/CartIsland'),
  search: () => import('./islands/search/SearchIsland'),
  wishlist: () => import('./islands/wishlist/WishlistIsland'),
  'hero-3d': () => import('./islands/3d/Hero3DIsland'),
};

async function hydrateIslands() {
  const elements = document.querySelectorAll<HTMLElement>('[data-island]');

  const hydrations = Array.from(elements).map(async (el) => {
    const islandName = el.dataset.island;
    if (!islandName || !islands[islandName]) return;

    const loader = islands[islandName];
    const { default: Component } = await loader();

    const props: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key === 'island') continue;
      try {
        props[key] = JSON.parse(value as string);
      } catch {
        props[key] = value;
      }
    }

    hydrateRoot(el, <Component {...props} />);
  });

  await Promise.allSettled(hydrations);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hydrateIslands);
} else {
  hydrateIslands();
}
