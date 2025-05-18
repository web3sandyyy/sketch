"use client";
import { useState, useEffect } from "react";
import FlippableImage from "./FlippableImage";
import SketchCarousel from "./SketchCarousel";
import { getSketchGrid } from "@/utils/supabase/apis";
import { SketchGridItem } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function SketchSection() {
  const [workImages, setWorkImages] = useState<SketchGridItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSketchGrid = async () => {
      const { data, error } = await getSketchGrid();
      if (error) {
        console.error("Error fetching sketch grid:", error);
      } else {
        setWorkImages(data || []);
      }
      setIsLoading(false);
    };

    fetchSketchGrid();
  }, []);

  return (
    <section id="sketch" className="w-full max-w-5xl mx-auto pt-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Sketches</h2>
      <p className="mb-6 text-gray-500">
        A hand-drawn portrait is a gift of emotion—a way to cherish the people
        and moments that matter most. See how your story can come to life on
        paper.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="space-y-4">
              <Skeleton className="w-full aspect-square rounded-xl" />
            </div>
          ))}
        </div>
      ) : workImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {workImages.map((img, i) => (
            <FlippableImage
              key={img.id}
              sketch={img.sketch}
              original={img.original}
              index={i}
              totalImages={workImages.length}
              flipDuration={2500}
            />
          ))}
        </div>
      ) : null}

      <hr className="my-6 md:my-8 border-t-2 border-gray-200" />
      <SketchCarousel />
    </section>
  );
}
