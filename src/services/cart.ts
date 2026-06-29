import type { Cart } from '@/types';

export const CartService = {
  async get(): Promise<Cart> {
    const response = await fetch('/cart.js');
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addItem(variantId: number, quantity = 1): Promise<Cart> {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity }] }),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return this.get();
  },

  async updateItem(key: string, quantity: number): Promise<Cart> {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity }),
    });
    if (!response.ok) throw new Error('Failed to update item');
    return this.get();
  },

  async removeItem(key: string): Promise<Cart> {
    return this.updateItem(key, 0);
  },

  async clear(): Promise<Cart> {
    const response = await fetch('/cart/clear.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return this.get();
  },

  async updateNote(note: string): Promise<Cart> {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return this.get();
  },
};
