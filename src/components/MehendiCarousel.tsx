"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function MehendiCarousel({ images }: { images: any[] }) {
  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="">
          {images.map((img, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/3"
            >
                <Image
                  src={img}
                  alt={`Mehendi ${idx + 1}`}
                  className="object-cover w-fit aspect-square rounded-xl overflow-hidden shadow-lg"
                />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
