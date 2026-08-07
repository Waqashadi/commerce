"use client";

import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import ErrorState from "../common/ErrorState";
import LoadingSpinner from "../common/LoadingSpinner";
import SkeletonLoader from "../common/SkeletonLoader";

interface ProductGridProps {
    search: string;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductGrid = ({ search, page, setPage }: ProductGridProps) => {
    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useProducts(page, search);

    const products = data?.products ?? [];

    const totalPages = Math.ceil(
        (data?.total ?? 0) / (data?.limit ?? 12)
    );

    if (isLoading) {
        return (
            <>
                <div className="px-4 py-8">
                    <SkeletonLoader />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="px-4 py-8">
                    <ErrorState />
                </div>
            </>
        );
    }

    console.log("products", products);

    return (
        <section className="width container py-12">
            {/* Searching Indicator */}
            {isFetching && (
                <>
                    <div className="px-4 py-8">
                        <LoadingSpinner />
                    </div>
                </>
            )}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        image={product.thumbnail}
                        rating={product.rating}
                        category={product.category}
                    />
                ))}
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="font-medium">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default ProductGrid;