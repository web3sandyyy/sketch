"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";
import { getSketchCarousel } from "@/utils/supabase/apis";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselImage } from "@/types";

const SketchCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await getSketchCarousel();
      if (error) {
        console.error("Error fetching sketch carousel images:", error);
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
          {images.map((img, idx) => (
            <CarouselItem
              key={img.id}
              className="pl-4 basis-[60%] sm:basis-[34%]"
            >
              <div className="p-1">
                <Image
                  src={img.sketch}
                  alt={`Sketch ${idx + 1}`}
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
};

export default SketchCarousel;
