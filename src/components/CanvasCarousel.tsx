"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getCanvasCarousel } from "@/utils/supabase/apis";
import { Skeleton } from "@/components/ui/skeleton";
import { CanvasImage } from "@/types";

export default function CanvasCarousel() {
  const [images, setImages] = useState<CanvasImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await getCanvasCarousel();
      if (error) {
        console.error("Error fetching canvas carousel images:", error);
      } else {
        setImages(data || []);
      }
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2].map((idx) => (
            <Skeleton key={idx} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="-ml-4">
          {images.reverse().map((img, idx) => (
            <CarouselItem
              key={img.id}
              className="pl-4 basis-[60%] sm:basis-[40%]"
            >
              <div className="p-1">
                <Image
                  src={img.canvas}
                  alt={`Canvas ${idx + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full aspect-square rounded-xl overflow-hidden shadow-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
