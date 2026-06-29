import { create } from 'zustand';
import type { Cart } from '@/types';
import { CartService } from '@/services/cart';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  fetchCart: () => Promise<void>;
  addItem: (variantId: number, quantity?: number) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isOpen: false,
  isLoading: false,
  error: null,
  itemCount: 0,
  totalPrice: 0,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.get();
      set({
        cart,
        itemCount: cart.item_count,
        totalPrice: cart.total_price,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to fetch cart', isLoading: false });
    }
  },

  addItem: async (variantId: number, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.addItem(variantId, quantity);
      set({
        cart,
        itemCount: cart.item_count,
        totalPrice: cart.total_price,
        isOpen: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to add item', isLoading: false });
    }
  },

  updateItem: async (key: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.updateItem(key, quantity);
      set({
        cart,
        itemCount: cart.item_count,
        totalPrice: cart.total_price,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to update item', isLoading: false });
    }
  },

  removeItem: async (key: string) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.removeItem(key);
      set({
        cart,
        itemCount: cart.item_count,
        totalPrice: cart.total_price,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to remove item', isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await CartService.clear();
      set({
        cart,
        itemCount: 0,
        totalPrice: 0,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to clear cart', isLoading: false });
    }
  },
}));
