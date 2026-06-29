import { hydrateRoot } from 'react-dom/client';
import React from 'react';

export function createIsland<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  container: HTMLElement | null,
  props?: P
) {
  if (!container) return null;

  return hydrateRoot(container, React.createElement(Component, props));
}
