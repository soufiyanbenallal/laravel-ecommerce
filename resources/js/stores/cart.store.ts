import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductModelType } from '@/types/ecommerce.types';

export type CartItemType = ProductModelType & {
    quantity: number;
};

type CartStoreType = {
    items: CartItemType[];
    isOpen: boolean;
    addItem: (product: ProductModelType, quantity?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    totalItems: () => number;
    subtotal: () => number;
};

export const useCartStore = create<CartStoreType>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    set({
                        items: [...items, { ...product, quantity }],
                        isOpen: true,
                    });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            setIsOpen: (isOpen) => set({ isOpen }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            subtotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        }),
        {
            name: 'kenz-cart-storage',
        }
    )
);
