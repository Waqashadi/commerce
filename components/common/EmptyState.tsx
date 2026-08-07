"use client";

import { PackageOpen, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
  icon?: "package" | "shopping";
}

export default function EmptyState({
  title = "Nothing here",
  description = "There is no data available right now.",
  buttonText,
  onAction,
  icon = "package",
}: EmptyStateProps) {
  const Icon =
    icon === "shopping"
      ? ShoppingBag
      : PackageOpen;

  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/30 p-8 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-background/40 p-5">
        <Icon className="h-12 w-12 text-primary" />
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {/* Action */}
      {buttonText && onAction && (
        <Button
          onClick={onAction}
          className="mt-6"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}




