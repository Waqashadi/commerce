import { Post } from "@/types/post";
import { Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(
  page = 1,
  limit = 12,
  search = ""
): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;

  const url = search.trim()
    ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

  return request<ProductsResponse>(url);
}

export async function getProduct(id: number) {
  return request<Product>(`/products/${id}`);
}

// export async function searchProducts(search: string) {
//   if (!search.trim()) {
//     return getProducts();
//   }

//   const data = await request<{ products: Product[] }>(
//     `/products/search?q=${encodeURIComponent(search)}`
//   );

//   return data.products;
// }


export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  return request<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`
  );
}





export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.posts;
}

// lib/api.ts
export async function getPost(id: number) {
  return request<Post>(`/posts/${id}`);
}