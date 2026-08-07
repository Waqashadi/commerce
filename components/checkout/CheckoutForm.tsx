"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    checkoutSchema,
    CheckoutFormValues,
} from "@/libs/validation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { CreditCard, MapPin, User } from "lucide-react";

export default function CheckoutForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        console.log(data);

        toast.success("Order placed successfully!");

        const orderId = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

        router.push(`/success?order=${orderId}`);;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-3xl border bg-background p-8 shadow-sm"
        >
            {/* Heading */}
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-accent/20 p-3">
                    <User className="text-primary" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold">
                        Shipping Information
                    </h2>

                    <p className="text-sm text-foreground/60">
                        Enter your delivery details
                    </p>
                </div>
            </div>

            {/* Name */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <Label>First Name</Label>

                    <Input
                        placeholder="John"
                        {...register("firstName")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.firstName?.message}
                    </p>
                </div>

                <div>
                    <Label>Last Name</Label>

                    <Input
                        placeholder="Doe"
                        {...register("lastName")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.lastName?.message}
                    </p>
                </div>
            </div>

            {/* Contact */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <Label>Email</Label>

                    <Input
                        placeholder="john@gmail.com"
                        {...register("email")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.email?.message}
                    </p>
                </div>

                <div>
                    <Label>Phone</Label>

                    <Input
                        placeholder="+1 234 567890"
                        {...register("phone")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.phone?.message}
                    </p>
                </div>
            </div>

            {/* Address */}
            <div>
                <Label>Address</Label>

                <Input
                    placeholder="Street address"
                    {...register("address")}
                />

                <p className="mt-1 text-sm text-accent">
                    {errors.address?.message}
                </p>
            </div>

            {/* City */}
            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <Label>City</Label>

                    <Input
                        placeholder="New York"
                        {...register("city")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.city?.message}
                    </p>
                </div>

                <div>
                    <Label>Country</Label>

                    <Input
                        placeholder="United States"
                        {...register("country")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.country?.message}
                    </p>
                </div>

                <div>
                    <Label>ZIP Code</Label>

                    <Input
                        placeholder="10001"
                        {...register("zipCode")}
                    />

                    <p className="mt-1 text-sm text-accent">
                        {errors.zipCode?.message}
                    </p>
                </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border bg-background p-5">
                <div className="mb-4 flex items-center gap-2">
                    <CreditCard className="text-primary" />

                    <h3 className="font-semibold">
                        Payment Method
                    </h3>
                </div>

                <div className="space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-background p-4 hover:border-accent">
                        <input
                            type="radio"
                            defaultChecked
                        />

                        Credit / Debit Card
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-background p-4 hover:border-accent">
                        <input type="radio" />

                        Cash on Delivery
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-background p-4 hover:border-accent">
                        <input type="radio" />

                        PayPal
                    </label>
                </div>
            </div>

            {/* Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full text-base"
            >
                {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
                <MapPin size={16} />

                Secure checkout • Free shipping • Easy returns
            </div>
        </form>
    );
}