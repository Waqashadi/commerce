import {
  Layers,
  Rocket,
} from "lucide-react";

import { FileText } from "lucide-react";

export const resources = [
  {
    slug: "nextjs-commerce-starter",
    title: "Next.js Commerce Starter",
    excerpt: "Build a scalable ecommerce application...",
    description:
      "Production-ready architecture for scalable eCommerce applications.",
    body: "...",
    image: "https://picsum.photos/1200/700?random=1",
    category: "Commerce",
    type: "Starter",
    level: "Advanced",
    readTime: "8 min read",
    date: "July 19, 2026",

    icon: Rocket,
    color: "from-indigo-500 to-violet-600",
    action: "Read Resource",
  },

  {
    slug: "modern-ui-components",
    title: "Modern UI Components",
    excerpt: "Beautiful reusable UI components...",
    description:
      "Reusable React + Tailwind components built with accessibility in mind.",
    body: "...",
    image: "https://picsum.photos/1200/700?random=2",
    category: "UI",
    type: "Components",
    level: "Intermediate",
    readTime: "5 min read",
    date: "July 18, 2026",

    icon: Layers,
    color: "from-pink-500 to-rose-500",
    action: "Explore",
  },

  {
    slug: "performance-checklist",
    title: "Performance Checklist",
    excerpt: "Optimize Core Web Vitals...",
    description:
      "Best practices to improve Core Web Vitals and loading performance.",
    body: "...",
    image: "https://picsum.photos/1200/700?random=3",
    category: "Performance",
    type: "Guide",
    level: "Beginner",
    readTime: "6 min read",
    date: "July 17, 2026",

    icon: FileText,
    color: "from-emerald-500 to-teal-600",
    action: "Read Guide",
  },
];