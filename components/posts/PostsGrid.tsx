"use client";

import PostCard from "./PostCard";

interface PostsGridProps {
  posts: {
    id: number;
    title: string;
    body: string;
    tags: string[];
  }[];
}

export default function PostsGrid({
  posts,
}: PostsGridProps) {
  return (
    <section className="width py-16">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Latest Articles
        </p>

        <h2 className="mt-3 text-5xl font-bold">
          Explore Our Journal
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover engineering stories, commerce insights,
          UI inspiration, and frontend best practices.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
}