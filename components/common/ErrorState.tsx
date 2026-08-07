"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the requested data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-8 text-center">
      <div className="mb-5 rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-6"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}