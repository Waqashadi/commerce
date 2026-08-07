import Link from "next/link";

const topics = [
  "All",
  "History",
  "American",
  "Crime",
  "French",
  "Love",
];

export default function TrendingTopics({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  return (
    <section className="width pt-16">
      <h2 className="text-primary mb-12 text-3xl text-center font-bold">
        Trending Topics
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 border-accent border-b-4 rounded-full pb-4">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={
              topic === "All"
                ? "/post"
                : `/post?category=${encodeURIComponent(topic)}`
            }
            className={`rounded-full px-5 py-3 transition ${
              (!activeCategory && topic === "All") ||
              activeCategory?.toLowerCase() === topic.toLowerCase()
                ? "bg-accent text-primary-foreground"
                : "border-b-2 border-accent hover:bg-background"
            }`}
          >
            {topic}
          </Link>
        ))}
      </div>
    </section>
  );
}