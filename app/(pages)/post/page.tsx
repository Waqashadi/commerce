import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PostsHero from "@/components/posts/PostsHero";
import FeaturedPost from "@/components/posts/FeaturedPost";
import PostsGrid from "@/components/posts/PostsGrid";
import TrendingTopics from "@/components/posts/TrendingTopics";
import FeaturedResources from "@/components/posts/FeaturedResources";

import { getPosts } from "@/lib/api";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const posts = await getPosts();

  const filteredPosts =
    category && category !== "All"
      ? posts.filter((post) =>
          post.tags.some(
            (tag) => tag.toLowerCase() === category.toLowerCase()
          )
        )
      : posts;

  return (
    <>
      <Navbar />

      <PostsHero />

      <TrendingTopics activeCategory={category} />

      {filteredPosts.length > 0 && (
        <FeaturedPost
          id={filteredPosts[0].id}
          title={filteredPosts[0].title}
          body={filteredPosts[0].body}
          tags={filteredPosts[0].tags}
        />
      )}

      <PostsGrid posts={filteredPosts} />

      

      <FeaturedResources />

      <Footer />
    </>
  );
}