"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-foreground blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-foreground blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm text-primary-foreground backdrop-blur">
            <MessageCircle className="h-4 w-4" />
            We&apos;d love to hear from you
          </div>

          <h1 className="text-5xl font-bold text-foreground md:text-6xl">
            Contact Us
          </h1>

          <p className="mt-6 text-lg leading-8 text-foreground">
            Have questions about your order, our products, or partnerships?
            Our team is here to help. Reach out anytime and we&apos;ll get back to
            you as soon as possible.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-foreground p-8 text-center backdrop-blur-lg transition hover:-translate-y-2 hover:bg-foreground">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <Phone className="text-primary-foreground" />
            </div>

            <h3 className="text-xl font-semibold text-primary-foreground">
              Phone
            </h3>

            <p className="mt-3 text-primary-foreground/80">
              +92 300 1234567
            </p>
          </div>

          <div className="rounded-3xl bg-foreground p-8 text-center backdrop-blur-lg transition hover:-translate-y-2 hover:bg-foreground">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Mail className="text-primary-foreground" />
            </div>

            <h3 className="text-xl font-semibold text-primary-foreground">
              Email
            </h3>

            <p className="mt-3 text-primary-foreground/80">
              support@example.com
            </p>
          </div>

          <div className="rounded-3xl bg-foreground p-8 text-center backdrop-blur-lg transition hover:-translate-y-2 hover:bg-foreground">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <MapPin className="text-primary-foreground" />
            </div>

            <h3 className="text-xl font-semibold text-primary-foreground">
              Office
            </h3>

            <p className="mt-3 text-primary-foreground/80">
              Lahore, Punjab, Pakistan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}