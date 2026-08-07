import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const ProductCard = ({
  id,
  title,
  description,
  price,
  image,
  rating,
  category,
}: ProductCardProps) => {

  const addToCart = useCartStore((state) => state.addToCart);

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlistStore
      ();

  const liked = isWishlisted(id);

  return (
    <div className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-6 transition duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => {
            if (liked) {
              removeFromWishlist(id);

              toast.success("Removed from wishlist");
            } else {
              addToWishlist({
                id,
                title,
                image,
                price,
              });

              toast.success("Added to wishlist");
            }
          }}
          className={`absolute right-4 top-2 rounded-full bg-background p-2 shadow-md transition hover:bg-primary hover:text-primary-foreground cursor-pointer`}>
          <Heart className={liked ? "fill-red-500 text-red-500 hover:text-primary-foreground" : ""} />
        </button>

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>

        <p className="line-clamp-2 text-sm text-foreground/60">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${price}
            </p>
          </div>

          <button
            onClick={() => {
              addToCart({
                id,
                title,
                price,
                image,
              });

              toast.success(`${title} added to cart`);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground transition hover:bg-indigo-700">
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;