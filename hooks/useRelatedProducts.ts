"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "@/lib/api";

export function useRelatedProducts(category: string) {
  return useQuery({
    queryKey: ["related-products", category],
    queryFn: () => getProductsByCategory(category),

    enabled: !!category,

    staleTime: 1000 * 60 * 5,
  });
}