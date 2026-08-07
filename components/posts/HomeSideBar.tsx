import Image from "next/image";
import Link from "next/link";



function HomeSideBar({ blogs, currentSlug }: unknown) {
  const latestPosts = blogs
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    )
    .slice(0, 4)
    .filter((post) => post.slug !== currentSlug);

  return (
    <aside className="w-full rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Latest Posts
        </h3>
        <div className="mt-2 h-1 w-14 rounded-full bg-primary" />
      </div>

      <div className="space-y-4">
        {latestPosts.length > 0 ? (
          latestPosts.map((post) => {
            const imageSrc = `${process.env.BLOGREE_API_URL}${post.og_image}`;
            const firstTag = post.tags?.[0];
            const matchedCategory = blogCategories.find(
              (c) =>
                c.label !== "All" &&
                c.label.toLowerCase() === firstTag?.toLowerCase(),
            );
            const categorySlug = matchedCategory?.slug ?? "general";

            return (
              <Link
                key={post.id}
                href={`/blog/${categorySlug}/${post.slug}`}
                className="group flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  {post.tags?.[0] && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {post.tags[0]}
                    </span>
                  )}

                  <h4 className="line-clamp2 text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">
              No latest posts available.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check back soon for new articles.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default HomeSideBar;