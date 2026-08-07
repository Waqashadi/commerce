"use client";

import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlistStore();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const increase = () => setQuantity((q) => q + 1);

  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      quantity,
    });

    toast.success(`${quantity} item(s) added to cart`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        image: product.thumbnail,
        price: product.price,
      });

      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="space-y-8">
      {/* Category */}
      <span className="rounded-full bg-background px-4 py-1 text-sm font-medium text-accent">
        {product.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Star className="fill-accent text-accent" size={20} />

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-foreground/60">
          (120 Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-bold text-primary">
          ${product.price}
        </h2>

        <span className="rounded-lg bg-background px-3 py-1 text-sm font-semibold text-accent">
          {product.discountPercentage}% OFF
        </span>
      </div>

      {/* Brand */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border p-5">
        <div>
          <p className="text-sm text-foreground/60">
            Brand
          </p>

          <p className="font-semibold">
            {product.brand}
          </p>
        </div>

        <div>
          <p className="text-sm text-foreground/60">
            Stock
          </p>

          <p className="font-semibold text-accent">
            {product.stock} Available
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="mb-3 text-xl font-semibold">
          Description
        </h3>

        <p className="leading-7 text-foreground/80">
          {product.description}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-5">
        <span className="font-semibold">
          Quantity
        </span>

        <div className="flex items-center rounded-xl border">
          <button
            onClick={decrease}
            className="p-3 hover:bg-background/20"
          >
            <Minus size={18} />
          </button>

          <span className="w-12 text-center font-semibold">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="p-3 hover:bg-background"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4 font-semibold text-primary-foreground transition hover:bg-pink-600"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className={`rounded-2xl border p-4 transition ${
            isWishlisted
              ? "border-accent bg-background text-primary"
              : "hover:bg-background"
          }`}
        >
          <Heart
            size={22}
            className={isWishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* Features */}
      <div className="space-y-4 rounded-2xl border bg-background p-6">
        <div className="flex items-center gap-3">
          <Truck className="text-accent" />

          <div>
            <h4 className="font-semibold">
              Free Delivery
            </h4>

            <p className="text-sm text-foreground/60">
              Delivery within 3–5 business days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary" />

          <div>
            <h4 className="font-semibold">
              Secure Payment
            </h4>

            <p className="text-sm text-foreground/60">
              100% secure payment with buyer protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}