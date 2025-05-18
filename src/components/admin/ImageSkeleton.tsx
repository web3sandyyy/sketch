import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface ImageSkeletonProps {
  count?: number;
  aspectRatio?: "square" | "video" | "carousel" | "review";
  columns?: number;
}

const ImageSkeleton = ({
  count = 6,
  aspectRatio = "square",
  columns = 3,
}: ImageSkeletonProps) => {
  const getGridCols = () => {
    if (aspectRatio === "review") return "grid-cols-1";

    return (
      {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    );
  };

  const renderContent = () => {
    switch (aspectRatio) {
      case "square": // For sketch grid (two square images + button)
        return (
          <>
            <Skeleton className="w-full aspect-square" />
            <Skeleton className="w-full aspect-square" />
            <Skeleton className="h-10 w-full" />
          </>
        );

      case "carousel": // For carousels (one image + delete button)
        return (
          <>
            <Skeleton className="w-full aspect-square" />
            <div className="flex justify-between mt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </>
        );

      case "video": // For testimonials
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
              <Skeleton className="h-9 w-20 ml-4" />
            </div>
          </>
        );

      case "review": // For reviews
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-9 w-20 ml-4" />
            </div>
          </div>
        );

      default:
        return (
          <>
            <Skeleton className="w-full aspect-square" />
            <Skeleton className="h-10 w-full" />
          </>
        );
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 w-full max-w-5xl mx-auto`}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Card
            key={i}
            className={`p-4 overflow-hidden ${
              aspectRatio === "review" ? "w-full" : ""
            }`}
          >
            <div className="space-y-4">{renderContent()}</div>
          </Card>
        ))}
    </div>
  );
};

export default ImageSkeleton;
