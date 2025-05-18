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
import AdminHeader from "@/components/admin/AdminHeader";
import ImageSkeleton from "@/components/admin/ImageSkeleton";

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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Canvas Carousel Management" />

      <div className="p-4 sm:p-6 md:p-8">
        {isLoading ? (
          <ImageSkeleton count={6} aspectRatio="carousel" />
        ) : (
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                Manage Canvas Carousel
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Upload and manage canvas carousel images. Maximum of 10 images
                allowed.
              </p>
            </div>

            <CommonCarouselAdmin
              title=""
              description=""
              images={carouselImages}
              imageKey="canvas"
              idKey="id"
              folder="canvascarousel"
              onAdd={postCanvasCarousel}
              onDelete={deleteCanvasCarousel}
              onImagesChange={setCarouselImages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
