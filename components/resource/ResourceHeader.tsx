"use client";

import { Eye, Clock, Calendar } from "lucide-react";
import Image from "next/image";

interface BlogHeaderProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function ResourceHeader({
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
}: BlogHeaderProps) {
  return (
    <section className="w-full  border-b pb-4">
      {/* 🧠 Title */}
      <h1 className="md:text-3xl max-w-3xl text-5xl font-extrabold  mb-4">
        {title}
      </h1>

      {/* 🧠 Description */}
      <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-6">
        {excerpt}
      </p>

      {/* 🧠 Info Bar */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y py-3 mb-6">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 bc" />
          <span>{category}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 bc" />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 bc" />
          <span>{readTime}</span>
        </div>
      </div>

      {/* 🧠 Featured Image */}
      <div className="w-full  relative rounded-2xl overflow-hidden shadow-lg">
       <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className=" hover:scale-105 transition-transform duration-700"
          priority
        />
      </div>
    </section>
  );
}