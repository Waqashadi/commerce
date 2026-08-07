"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import EmptyState from "../common/EmptyState";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  const addToCart = useCartStore((state) => state.addToCart);

  if (wishlist.length === 0) {
    return (
      <>
       <div className="my-12 px-4">
        <EmptyState
          title="No wishlist items"
          description="Save your favorite products here."
          />
          </div>
      </>

    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            My Wishlist
          </h1>

          <p className="mt-2 text-foreground/60">
            {wishlist.length} saved products
          </p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-lg"
          >
            <div className="relative h-64 bg-background">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="space-y-3 p-5">
              <h2 className="line-clamp-2 text-lg font-semibold">
                {item.title}
              </h2>

              <p className="text-2xl font-bold text-primary">
                ${item.price}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                    });

                    toast.success("Added to cart");
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-primary-foreground transition hover:bg-pink-600"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    removeFromWishlist(item.id);
                    toast.success("Removed from wishlist");
                  }}
                  className="rounded-xl border p-3 text-accent transition hover:bg-background"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}