"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import CommonCarouselAdmin from "@/components/admin/CommonCarouselAdmin";
import { CanvasImage } from "@/types";
import {
  getCanvasCarousel,
  postCanvasCarousel,
  deleteCanvasCarousel,
} from "@/utils/supabase/apis";

export default function CanvasCarouselPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Canvas Carousel Management
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
