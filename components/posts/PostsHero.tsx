import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";

export default function PostsHero() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-foreground blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-foreground blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Latest News & Articles
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-primary-foreground md:text-6xl">
            Discover Inspiring
            <span className="block text-accent">
              Stories & Insights
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-primary-foreground/80">
            Stay updated with the latest trends, shopping tips, product
            reviews, and expert insights. Explore articles designed to help
            you shop smarter.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#posts"
              className="inline-flex items-center rounded-xl bg-background px-6 py-3 font-semibold text-primary transition hover:scale-105"
            >
              Explore Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/products"
              className="rounded-xl border border-foreground px-6 py-3 font-semibold text-primary-foreground transition hover:bg-background hover:text-primary"
            >
              Browse Products
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-background/10 p-6 backdrop-blur">
              <BookOpen className="mx-auto h-10 w-10 text-accent" />
              <h3 className="mt-4 text-3xl font-bold text-primary-foreground">250+</h3>
              <p className="mt-2 text-primary-foreground/70">
                Published Articles
              </p>
            </div>

            <div className="rounded-2xl bg-background/10 p-6 backdrop-blur">
              <TrendingUp className="mx-auto h-10 w-10 text-accent" />
              <h3 className="mt-4 text-3xl font-bold text-primary-foreground">120K+</h3>
              <p className="mt-2 text-primary-foreground/70">
                Monthly Readers
              </p>
            </div>

            <div className="rounded-2xl bg-background/10 p-6 backdrop-blur">
              <Sparkles className="mx-auto h-10 w-10 text-accent" />
              <h3 className="mt-4 text-3xl font-bold text-primary-foreground">Weekly</h3>
              <p className="mt-2 text-primary-foreground/70">
                Fresh Content
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
