"use client"

import { Search, Sparkles } from "lucide-react";

interface ProductHeroProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Beauty",
    "Furniture",
];

const ProductHero = ({ search, setSearch }: ProductHeroProps) => {


    return (
        <section className="relative overflow-hidden py-16">
            {/* Background Blur */}
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-foreground blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-foreground blur-3xl" />

            <div className="relative width">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-primary-foreground backdrop-blur">
                        <Sparkles className="h-4 w-4" />
                        Explore our latest collection
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight text-primary md:text-6xl">
                        Discover Amazing Products
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-foreground">
                        Shop thousands of premium products with modern design, fast
                        delivery, and unbeatable prices.
                    </p>

                    {/* Search */}
                    <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-2xl bg-background p-2 shadow-2xl">
                        <Search className="ml-3 h-5 w-5 text-foreground/60" />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="flex-1 bg-transparent px-4 py-3 outline-none"
                        />
                        <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary">
                            Search
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="rounded-full border border-foreground bg-foreground px-5 py-2 text-sm font-medium text-primary-foreground backdrop-blur transition hover:bg-background hover:text-primary"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductHero;