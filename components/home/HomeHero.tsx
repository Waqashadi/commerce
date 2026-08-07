import React from "react";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section className="w-full">

    
      <div className="width py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-accent text-background px-4 py-2 text-sm font-semibold">
              🚀 Modern E-Commerce Experience
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Discover Premium
              <span className="text-primary"> Products </span>
              at the Best Prices
            </h1>

            <p className="mt-6 text-lg text-foreground/80 leading-8">
              Shop from thousands of high-quality products with secure
              payments, lightning-fast delivery, and an effortless shopping
              experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={"/products"} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-pink-600 cursor-pointer">
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <Link href={"/post"} className="rounded-xl border border-background px-6 py-3 font-semibold text-foreground transition hover:bg-primary cursor-pointer hover:text-background">
                Explore Posts
              </Link>
            </div>

            {/* Features */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Truck className="text-primary" />
                <span className="text-foreground">Free Shipping</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" />
                <span className="text-gray-700">Secure Payment</span>
              </div>

              <div className="flex items-center gap-2">
                <ShoppingBag className="text-orange-500" />
                <span className="text-gray-700">20K+ Products</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-indigo-200 blur-3xl opacity-60"></div>

            <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-primary/50 blur-3xl opacity-60"></div>

            <div className="relative overflow-hidden rounded-3xl bg-background shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                alt="E-Commerce Products"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeHero;