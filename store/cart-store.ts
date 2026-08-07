import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: number) => void;

  increaseQty: (id: number) => void;

  decreaseQty: (id: number) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

     addToCart: (product) =>
  set((state) => {
    const existing = state.cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        ),
      };
    }

    return {
      cart: [...state.cart, product],
    };
  }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) => i.id !== id
          ),
        })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                  }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
    }
  )
);