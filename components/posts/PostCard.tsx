"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Eye,
} from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

export default function PostCard({
  id,
  title,
  body,
  tags,
}: PostCardProps) {
  const image = `https://picsum.photos/600/400?random=${id}`;

  const readingTime = Math.max(
    2,
    Math.ceil(body.split(" ").length / 200)
  );

  const views = (id * 347) % 2500 + 300;

  return (
    <article className="group overflow-hidden rounded-3xl border bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE */}

      <div className="relative h-64 overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-foreground" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* CONTENT */}

      <div className="space-y-5 p-6">

        <div className="flex items-center gap-5 text-sm text-muted-foreground">

          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            July 2026
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={15} />
            {readingTime} min
          </div>

          <div className="flex items-center gap-2">
            <Eye size={15} />
            {views}
          </div>

        </div>

        <h3 className="line-clamp-2 text-2xl font-bold transition group-hover:text-primary">
          {title}
        </h3>

        <p className="line-clamp-3 leading-7 text-muted-foreground">
          {body}
        </p>

        {/* FOOTER */}

        <div className="flex items-center justify-between pt-3">

          <div className="flex items-center gap-3">

            <Image
              src={`https://api.dicebear.com/9.x/initials/svg?seed=Author${id}`}
              alt=""
              width={42}
              height={42}
              className="rounded-full border"
            />

            <div>

              <p className="font-semibold">
                John Carter
              </p>

              <p className="text-xs text-muted-foreground">
                Senior Frontend Engineer
              </p>

            </div>

          </div>

          <Link
            href={`/post/${id}`}
            className="rounded-full border p-3 transition hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </article>
  );
}