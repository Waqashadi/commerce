"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { TicketPercent, Truck } from "lucide-react";
import { toast } from "sonner";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OrderSummary() {
  const cart = useCartStore((state) => state.cart);

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const shipping = subtotal > 500 ? 0 : 20;

  const tax = subtotal * 0.1;

  const discountAmount = subtotal * (discount / 100);

  const total =
    subtotal + shipping + tax - discountAmount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(10);
      toast.success("Coupon Applied");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon");
    }
  };

  return (
    <div className="sticky top-24 rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      {/* Cart Items */}

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-background">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1">
              <h4 className="line-clamp-2 font-medium">
                {item.title}
              </h4>

              <p className="text-sm text-foreground/60">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="font-semibold">
              $
              {(
                item.price * item.quantity
              ).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}

      <div className="my-8">
        <div className="mb-3 flex items-center gap-2">
          <TicketPercent
            size={18}
            className="text-primary"
          />

          <span className="font-semibold">
            Coupon
          </span>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="SAVE10"
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
          />

          <Button onClick={applyCoupon}>
            Apply
          </Button>
        </div>
      </div>

      {/* Totals */}

      <div className="space-y-4 border-t pt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (10%)</span>

          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <Truck size={18} />

            Shipping
          </span>

          <span>
            {shipping === 0
              ? "Free"
              : `$${shipping}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-accent">
            <span>Discount</span>

            <span>- ${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between border-t pt-5 text-xl font-bold">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-background p-4 text-sm text-accent">
        🎉 Free shipping on orders above <b>$500</b>.
      </div>
    </div>
  );
}