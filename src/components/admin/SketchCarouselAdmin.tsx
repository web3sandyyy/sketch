import React, { useState, useEffect } from "react";
import {
  getSketchCarousel,
  postSketchCarousel,
  deleteSketchCarousel,
} from "@/utils/supabase/apis";
import { CarouselImage } from "@/types";
import CommonCarouselAdmin from "./CommonCarouselAdmin";
import { toast } from "sonner";

const SketchCarouselAdmin = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = async () => {
    const { data, error } = await getSketchCarousel();
    if (error) {
      toast.error(error);
      return;
    }
    setCarouselImages(data || []);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <section className="w-full max-w-5xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <CommonCarouselAdmin
      title="Manage Sketch Carousel"
      description="Upload and manage sketch carousel images. Maximum of 10 images allowed."
      images={carouselImages}
      imageKey="sketch"
      idKey="id"
      folder="sketchcarousel"
      onAdd={postSketchCarousel}
      onDelete={deleteSketchCarousel}
      onImagesChange={setCarouselImages}
    />
  );
};

export default SketchCarouselAdmin;
