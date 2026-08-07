import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, Heart, Clock3, Tag, CheckCircle2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/posts/TableOfContents";

import { getPost } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPost(Number(id));

  if (!post) {
    return (
      <>
        <Navbar />

        <div className="container py-32 text-center">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <p className="mt-4 text-muted-foreground">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/posts"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-primary-foreground"
          >
            Back to Posts
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  const primaryTag = post.tags[0] ?? "technology";
  const secondaryTag = post.tags[1] ?? primaryTag;

  const imageSrc = `https://images.unsplash.com/featured/1200x700?${primaryTag}`;

  // Rough word count across all generated sections, used for reading time
  const approxWordCount = post.body.split(" ").length + 650;
  const readingTime = Math.max(2, Math.ceil(approxWordCount / 200));

  const keyTakeaways = [
    `Why ${primaryTag} matters in modern, production-grade applications`,
    `How ${secondaryTag} fits into a scalable frontend architecture`,
    "Practical patterns you can apply in your own projects today",
    "Common pitfalls to avoid and how to sidestep them",
  ];

  return (
    <div className=" bg-background">
      <Navbar />

      <main className="width py-16">
        {/* Back */}
        <Link
          href="/posts"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Link>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] ">
          {/* ================= LEFT ================= */}
          <article className="">
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-primary"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {readingTime} min read
              </span>

              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views} Views
              </span>

              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {post.reactions.likes} Likes
              </span>
            </div>

            {/* Hero */}
            <div className="relative mt-10 overflow-hidden rounded-3xl">
              <Image
                src={imageSrc}
                alt={post.title}
                width={1200}
                height={700}
                className="h-[500px] w-full object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="prose mt-12 max-w-none dark:prose-invert">
              {/* Intro / original body */}
              <p className="lead">{post.body}</p>

              <h2 id="introduction">Introduction</h2>
              <p>
                Modern frontend development is no longer just about building
                interfaces — it&apos;s about crafting experiences that are fast,
                accessible, scalable, and maintainable at every layer. As
                products grow, the tooling and architectural decisions made
                early on around <strong>{primaryTag}</strong> and{" "}
                <strong>{secondaryTag}</strong> have an outsized impact on how
                easily a team can ship new features without accumulating
                technical debt.
              </p>
              <p>
                In this article, we&apos;ll break down what makes a solid
                foundation for a production application, walk through a
                practical example, and highlight the patterns that
                consistently separate maintainable codebases from fragile
                ones.
              </p>

              <h2 id="why-it-matters">Why {primaryTag} Matters</h2>
              <p>
                Technologies like React, Next.js, TypeScript, Tailwind CSS,
                and React Query allow developers to create fast, maintainable
                applications while keeping code clean and reusable. Choosing
                the right combination isn&apos;t about chasing trends — it&apos;s
                about matching tools to the problem you&apos;re actually solving.
              </p>
              <ul>
                <li>
                  <strong>Performance:</strong> Faster interfaces lead to
                  better engagement and lower bounce rates.
                </li>
                <li>
                  <strong>Maintainability:</strong> Clean architecture reduces
                  the cost of future changes.
                </li>
                <li>
                  <strong>Developer experience:</strong> Good tooling keeps
                  teams shipping quickly without sacrificing quality.
                </li>
              </ul>

              <h2 id="key-concepts">Key Concepts</h2>
              <p>
                Building production-ready software also involves performance
                optimization, reusable components, API integration, state
                management, caching, SEO, and responsive layouts across all
                devices. Each of these areas deserves deliberate attention
                rather than being treated as an afterthought.
              </p>
              <blockquote>
                &quot;Good architecture isn&apos;t about predicting the future — it&apos;s
                about making change cheap when the future inevitably shows
                up.&quot;
              </blockquote>

              <h2 id="code-example">A Practical Example</h2>
              <p>
                Here&apos;s a simplified example of a typed data-fetching helper,
                similar to the pattern used to power this very page:
              </p>
              <pre>
                <code>{`async function getPost(id: number) {
  const res = await fetch(\`https://dummyjson.com/posts/\${id}\`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}`}</code>
              </pre>
              <p>
                Wrapping fetch calls like this keeps your components free of
                boilerplate and gives you a single place to handle errors,
                caching, or retries as your app grows.
              </p>

              <h2 id="best-practices">Best Practices</h2>
              <ol>
                <li>Keep components small and focused on a single concern.</li>
                <li>
                  Co-locate data-fetching logic in a dedicated API layer, as
                  shown above.
                </li>
                <li>
                  Type everything — interfaces like <code>Post</code> and{" "}
                  <code>Product</code> catch bugs before they reach
                  production.
                </li>
                <li>
                  Optimize images and use responsive layouts from the start,
                  not as a retrofit.
                </li>
              </ol>

              <h2 id="real-world-use">Real-World Applications</h2>
              <p>
                This demo article showcases how a modern content page can
                look using the DummyJSON API while maintaining a premium user
                experience suitable for a professional portfolio. The same
                patterns — typed API clients, reusable UI primitives, and
                clear content hierarchy — scale directly to real production
                systems handling e-commerce, dashboards, or content
                platforms.
              </p>

              <h2 id="conclusion">Conclusion</h2>
              <p>
                Whether you&apos;re building a portfolio project or a
                production application, the fundamentals stay the same:
                thoughtful architecture, clean data flow, and attention to
                user experience. Mastering {primaryTag} and {secondaryTag}{" "}
                gives you a strong foundation to build on as your projects
                grow in complexity.
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="mt-12 rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Key Takeaways</h3>
              <ul className="space-y-3">
                {keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* ================= RIGHT ================= */}
          <aside className="hidden lg:block sticky top-8 h-fit space-y-6">
            {/* Author */}
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${post.id}`}
                  alt="Author"
                  width={70}
                  height={70}
                  className="rounded-full border"
                />

                <div>
                  <p className="text-sm text-muted-foreground">Written by</p>

                  <h3 className="font-bold text-xl">John Carter</h3>

                  <p className="text-sm text-muted-foreground">
                    Senior Frontend Engineer
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Article Stats</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Views</span>
                  <span>{post.views}</span>
                </div>

                <div className="flex justify-between">
                  <span>Likes</span>
                  <span>{post.reactions.likes}</span>
                </div>

                <div className="flex justify-between">
                  <span>Dislikes</span>
                  <span>{post.reactions.dislikes}</span>
                </div>

                <div className="flex justify-between">
                  <span>Reading Time</span>
                  <span>{readingTime} min</span>
                </div>
              </div>
            </div>

            {/* Related Tags */}
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Related Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* TOC */}
            <TableOfContents />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}