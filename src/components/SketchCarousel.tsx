import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import Image from "next/image";

const SketchCarousel = ({ images }: { images: any[] }) => {
  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="-ml-4">
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="pl-4 basis-[60%] sm:basis-[34%]">
              <div className="p-1">
                <Image
                  src={img}
                  alt={`Mehendi ${idx + 1}`}
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
