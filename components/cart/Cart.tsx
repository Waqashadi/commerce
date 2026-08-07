"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCartStore();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 15;

  const tax = subtotal * 0.1;

  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="flex h-[78vh] flex-col items-center justify-center">
        <ShoppingBag className="h-20 w-20 text-accent-foreground" />

        <h1 className="mt-6 text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-accent-foreground">
          Looks like you haven&apos;t added anything yet.
        </p>

        <Link
          href="/products"
          className="mt-8 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-3">
      {/* Left */}

      <div className="space-y-6 lg:col-span-2">
        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 rounded-2xl border bg-background p-5 shadow-sm"
          >
            <div className="relative h-28 w-28">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="rounded-xl object-contain"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-primary font-bold">
                ${item.price}
              </p>
            </div>

            {/* Qty */}

            <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
              <button
                onClick={() => decreaseQty(item.id)}
              >
                <Minus size={18} />
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Total */}

            <div className="w-24 text-right font-bold">
              $
              {(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Delete */}

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
              className="text-accent"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      {/* Right */}

      <div className="rounded-3xl border bg-background p-8 shadow-lg">
        <h2 className="mb-8 text-2xl font-bold">
          Order Summary
        </h2>

        <div className="space-y-5">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>

            <span>
              {shipping === 0
                ? "FREE"
                : `$${shipping}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>

            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>

          <button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary">
            Proceed to Checkout
          </button>

          <Link
            href="/products"
            className="mt-4 block text-center font-semibold text-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}