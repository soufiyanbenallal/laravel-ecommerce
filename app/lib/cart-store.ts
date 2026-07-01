import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItemType = {
    id: string;
    name: string;
    price: number;
    image: string;
    color: string;
    size?: string;
    qty: number;
    slug?: string;
};

type CartStateType = {
    items: CartItemType[];
    isOpen: boolean;
    add: (item: Omit<CartItemType, "qty">, qty?: number) => void;
    remove: (id: string, color: string, size?: string) => void;
    setQty: (
        id: string,
        color: string,
        size: string | undefined,
        qty: number,
    ) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

const key = (id: string, color: string, size?: string) =>
    `${id}|${color}|${size ?? ""}`;

export const useCart = create<CartStateType>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            add: (item, qty = 1) =>
                set((state) => {
                    const k = key(item.id, item.color, item.size);
                    const existing = state.items.find(
                        (i) => key(i.id, i.color, i.size) === k,
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                key(i.id, i.color, i.size) === k
                                    ? { ...i, qty: i.qty + qty }
                                    : i,
                            ),
                            isOpen: true,
                        };
                    }
                    return {
                        items: [...state.items, { ...item, qty }],
                        isOpen: true,
                    };
                }),
            remove: (id, color, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) =>
                            key(i.id, i.color, i.size) !== key(id, color, size),
                    ),
                })),
            setQty: (id, color, size, qty) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        key(i.id, i.color, i.size) === key(id, color, size)
                            ? { ...i, qty: Math.max(1, qty) }
                            : i,
                    ),
                })),
            clear: () => set({ items: [] }),
            open: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),
            toggle: () => set((s) => ({ isOpen: !s.isOpen })),
        }),
        { name: "atelier-cart" },
    ),
);

export const cartCount = (items: CartItemType[]) =>
    items.reduce((s, i) => s + i.qty, 0);
export const cartTotal = (items: CartItemType[]) =>
    items.reduce((s, i) => s + i.qty * i.price, 0);
