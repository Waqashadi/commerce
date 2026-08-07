"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { resources } from "@/content/resource";



export default function FeaturedResources() {
  return (
    <section className="width py-16">
      <div className="mb-14 text-center">
        <span className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-primary">
          Developer Resources
        </span>

        <h2 className="mt-6 text-5xl font-bold">
          Build Faster. Ship Better.
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          A curated collection of starter kits, UI systems, performance guides,
          and engineering resources for modern web developers.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {resources.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={{
                pathname: "/resource",
                query: {
                  category: item.category,
                  slug: item.slug,
                  type: item.type,
                  level: item.level,
                },
              }}
              className="group relative overflow-hidden rounded-3xl border bg-background p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
              />

              <div className="relative">
                <div
                  className={`mb-8 inline-flex rounded-2xl bg-gradient-to-br ${item.color} p-5 text-primary-foreground shadow-lg`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="text-3xl font-bold">{item.title}</h3>

                <p className="mt-4 leading-8 text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <span className="font-semibold text-primary">
                    {item.action}
                  </span>

                  <ArrowUpRight
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={22}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}