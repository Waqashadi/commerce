"use client";

import { useProduct } from "@/hooks/useProduct";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";

interface Props {
    id: number;
}

export default function ProductDetails({ id }: Props) {
    const { data: product, isLoading } = useProduct(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <section className="container mx-auto py-16 px-4">
            <div className="grid gap-12 lg:grid-cols-2">
                <ProductGallery images={product.images} />

                <ProductInfo product={product} />
            </div>
            <div>

                <RelatedProducts
                    category={product.category}
                    currentId={product.id}
                />
            </div>
        </section>
    );
}