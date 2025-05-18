import React, { useState, useEffect } from "react";
import {
  getCanvasCarousel,
  postCanvasCarousel,
  deleteCanvasCarousel,
} from "@/utils/supabase/apis";
import { CanvasImage } from "@/types";
import CommonCarouselAdmin from "./CommonCarouselAdmin";
import { toast } from "sonner";

const CanvasCarouselAdmin = () => {
  const [carouselImages, setCarouselImages] = useState<CanvasImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = async () => {
    const { data, error } = await getCanvasCarousel();
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
      title="Manage Canvas Carousel"
      description="Upload and manage canvas carousel images. Maximum of 10 images allowed."
      images={carouselImages}
      imageKey="canvas"
      idKey="id"
      folder="canvascarousel"
      onAdd={postCanvasCarousel}
      onDelete={deleteCanvasCarousel}
      onImagesChange={setCarouselImages}
    />
  );
};

export default CanvasCarouselAdmin;
