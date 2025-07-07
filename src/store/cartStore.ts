import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, Product } from '../types';

interface CartState extends Cart {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          let newItems: CartItem[];
          if (existing) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          } else {
            newItems = [...state.items, { product, quantity }];
          }
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
          );
          return { items: newItems, total: newTotal };
        });
      },
      removeFromCart: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
          );
          return { items: newItems, total: newTotal };
        });
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          );
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
          );
          return { items: newItems, total: newTotal };
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, total: state.total }),
    },
  ),
);
