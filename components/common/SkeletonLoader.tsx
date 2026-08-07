import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  variant?: "card" | "details" | "list";
  count?: number;
}

export default function SkeletonLoader({
  variant = "card",
  count = 8,
}: SkeletonLoaderProps) {
  if (variant === "details") {
    return (
      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="h-[550px] rounded-3xl" />

          <div className="space-y-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-5">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <Skeleton className="h-20 w-20 rounded-xl" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-28" />
            </div>

            <Skeleton className="h-10 w-24" />
          </div>
        ))}
      </div>
    );
  }

  // Default Card Skeleton
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border bg-background shadow-sm"
        >
          <Skeleton className="h-64 w-full" />

          <div className="space-y-4 p-5">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}