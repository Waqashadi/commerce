import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;

  removeFromWishlist: (id: number) => void;

  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (item) =>
        set((state) => {
          const exists = state.wishlist.find((i) => i.id === item.id);

          if (exists) return state;

          return {
            wishlist: [...state.wishlist, item],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.id !== id),
        })),

      isWishlisted: (id) =>
        get().wishlist.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage",
    }
  )
);