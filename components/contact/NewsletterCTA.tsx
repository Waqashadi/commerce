"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  function handleSubscribe() {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Subscribed successfully!");

    setEmail("");
  }

  return (
    <section className="width py-20">
      <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-xl">
        <Mail className="mx-auto h-14 w-14" />

        <h2 className="mt-6 text-4xl font-bold">
          Subscribe to our Newsletter
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
          Get exclusive deals, new arrivals, and product updates delivered
          directly to your inbox.
        </p>

        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 flex-1 rounded-xl border border-background px-5 text-background outline-none"
          />

          <button
            onClick={handleSubscribe}
            className="rounded-xl bg-background px-8 cursor-pointer font-semibold text-primary transition hover:scale-105"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}