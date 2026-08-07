"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
}