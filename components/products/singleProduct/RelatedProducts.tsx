"use client";

import { useRelatedProducts } from "@/hooks/useRelatedProducts";
import ProductCard from "../ProductCard";

interface Props {
  category: string;
  currentId: number;
}

export default function RelatedProducts({
  category,
  currentId,
}: Props) {
  const { data, isLoading } =
    useRelatedProducts(category);

  if (isLoading) return null;

  const products =
    data?.products.filter(
      (p) => p.id !== currentId
    ) ?? [];

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">
        Related Products
      </h2>

      <div className="grid gap-8 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.thumbnail}
            rating={product.rating}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}