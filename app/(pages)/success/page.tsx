"use client";

import Link from "next/link";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

   const searchParams = useSearchParams();

  const orderNumber = searchParams.get("order");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl rounded-3xl border bg-background p-10 text-center shadow-xl">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background">
          <CheckCircle2 className="h-14 w-14 text-accent" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-foreground">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-4 text-foreground/80">
          Thank you for your purchase.
          <br />
          Your order has been confirmed and will be processed shortly.
        </p>

        {/* Order Number */}
        <div className="mt-8 rounded-2xl bg-background p-6">
          <p className="text-sm text-foreground/60">
            Order Number
          </p>

          <h2 className="mt-2 text-2xl font-bold text-accent">
            {orderNumber}
          </h2>
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <Package className="mx-auto mb-3 text-primary" size={34} />

            <h3 className="font-semibold">
              Shipping
            </h3>

            <p className="mt-2 text-sm text-foreground/60">
              Estimated delivery in
              <br />
              3–5 business days.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <ShoppingBag
              className="mx-auto mb-3 text-primary"
              size={34}
            />

            <h3 className="font-semibold">
              Order Status
            </h3>

            <p className="mt-2 text-sm text-foreground/60">
              Your order is being
              prepared for shipment.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>

          <Button
            
            variant="outline"
            size="lg"
          >
            <Link href="/orders">
              View Orders
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}