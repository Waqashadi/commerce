"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";

export function useProducts(page: number, search: string) {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts(page, 12, search),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,
  });
}