"use client";

import React from "react";
import { Bookmark, Share2, Layout } from "lucide-react";

export default function ResourceLeft() {
  return (
    <div className="flex flex-col items-center space-y-6 sticky top-32">
      {/* Bookmark */}
      <button className="p-3 rounded-xl bg-secondary text-primary   transition flex items-center justify-center cursor-pointer">
        <Bookmark className="h-6 w-6 " />
      </button>

      {/* Share */}
      <button className="p-3 rounded-xl bg-secondary text-primary  transition flex items-center justify-center cursor-pointer">
        <Share2 className="h-6 w-6 " />
      </button>

      {/* Content link (jump to middle) */}
      <a
        href="#blog-content"
        className="p-3 rounded-xl bg-secondary text-primary  transition flex items-center justify-center cursor-pointer"
      >
        <Layout className="h-6 w-6 " />
      </a>
    </div>
  );
}