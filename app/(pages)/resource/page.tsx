import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceHeader from "@/components/resource/ResourceHeader";
import ResourceLeft from "@/components/resource/ResourceLeft";
import ResourceToRightC from "@/components/resource/ResourceToRightC";
import { resources } from "@/content/resource";
import EmptyState from "@/components/common/EmptyState";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    slug?: string;
    type?: string;
    level?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const {
    category,
    slug,
    type,
    level,
  } = await searchParams;

  // Fetch your resource here using slug
  // const blog = await getResourceBySlug(slug);

  const blog = resources.find(
  (item) =>
    item.slug === slug &&
    item.category === category &&
    item.type === type &&
    item.level === level
);

  if (!blog) {
    return (
      <div className="min-h-screen">
        <Navbar />

        <div className="m-5">
            <EmptyState/>
        </div>

        <Footer />
      </div>
    );
  }

  console.log("log",{
  category,
  slug,
  type,
  level,
});

console.log("res", resources);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto my-16 grid max-w-7xl grid-cols-10 gap-8 px-4 max-md:grid-cols-1">

        <ResourceLeft />

        <div className="col-span-6 flex flex-col gap-8">

          <ResourceHeader
            title={blog.title}
            excerpt={blog.excerpt}
            date={blog.date}
            readTime={blog.readTime}
            category={blog.category ?? ""}
            image={blog.image}
          />

          <div className="prose prose-lg max-w-none">

            <p>{blog.body}</p>

            <hr />

            <h2>Information from Query</h2>

            <ul>
              <li>
                <strong>Category:</strong> {category}
              </li>

              <li>
                <strong>Slug:</strong> {slug}
              </li>

              <li>
                <strong>Type:</strong> {type}
              </li>

              <li>
                <strong>Level:</strong> {level}
              </li>
            </ul>

          </div>
        </div>

        <div className="col-span-3 hidden md:block">
          <ResourceToRightC />
        </div>

      </main>

      <Footer />
    </div>
  );
}