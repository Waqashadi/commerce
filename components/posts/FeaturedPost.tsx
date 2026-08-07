"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Sparkles,
} from "lucide-react";

interface FeaturedPostProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

export default function FeaturedPost({
  id,
  title,
  body,
  tags,
}: FeaturedPostProps) {
  const image = `https://images.unsplash.com/featured/1200x700?${tags[0] ?? "technology"}`;

  const readingTime = Math.max(
    2,
    Math.ceil(body.split(" ").length / 200)
  );

  return (
    <section className="width py-20">
      <div className="mb-8 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />

        <span className="font-semibold text-primary">
          Featured Story
        </span>
      </div>

      <div className="group overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">

        <div className="grid lg:grid-cols-2">

          {/* Image */}

          <div className="relative h-[350px] overflow-hidden lg:h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-foreground" />

            <div className="absolute bottom-6 left-6 rounded-full bg-background/20 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur">
              Featured
            </div>
          </div>

          {/* Content */}

          <div className="flex flex-col justify-center p-10">

            <div className="mb-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              {title}
            </h2>

            <p className="mt-6 line-clamp-4 text-muted-foreground leading-8">
              {body}
            </p>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                July 2026
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} />
                {readingTime} min read
              </div>
            </div>

            <Link
              href={`/post/${id}`}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary"
            >
              Read Article

              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}