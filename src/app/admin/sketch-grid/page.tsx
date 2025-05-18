"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadImage } from "@/utils/supabase/storage";
import { getSketchGrid, postSketchGrid } from "@/utils/supabase/apis";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageSkeleton from "@/components/admin/ImageSkeleton";

interface ImagePair {
  id: number;
  sketch: string;
  original: string;
}

export default function SketchGridPage() {
  const [workImages, setWorkImages] = useState<ImagePair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPairIndex, setSelectedPairIndex] = useState<number | null>(
    null
  );
  const [newSketch, setNewSketch] = useState<File | null>(null);
  const [newOriginal, setNewOriginal] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSketchGrid();
  }, []);

  const fetchSketchGrid = async () => {
    const { data, error } = await getSketchGrid();
    if (error) {
      toast.error(error);
      return;
    }
    setWorkImages(data || []);
    setIsLoading(false);
  };

  const handleImageChange = async (index: number) => {
    setSelectedPairIndex(index);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "sketch" | "original"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "sketch") {
        setNewSketch(file);
      } else {
        setNewOriginal(file);
      }
    }
  };

  const handleSubmit = async () => {
    if (!newSketch || !newOriginal || selectedPairIndex === null) {
      toast.error("Please select both images and a position");
      return;
    }

    setIsUploading(true);
    try {
      const [sketchResult, originalResult] = await Promise.all([
        uploadImage({ file: newSketch, folder: "sketchgrid" }),
        uploadImage({
          file: newOriginal,
          folder: "sketchgrid",
        }),
      ]);

      if (sketchResult.error || originalResult.error) {
        throw new Error("Failed to upload images");
      }

      const { data, error } = await postSketchGrid(
        sketchResult.imageUrl,
        originalResult.imageUrl,
        selectedPairIndex
      );

      if (error) {
        throw new Error(error);
      }

      if (!data) {
        throw new Error("No data returned from update");
      }

      const newImages = [...workImages];
      newImages[selectedPairIndex] = {
        ...newImages[selectedPairIndex],
        sketch: sketchResult.imageUrl,
        original: originalResult.imageUrl,
      };
      setWorkImages(newImages);

      setNewSketch(null);
      setNewOriginal(null);
      setSelectedPairIndex(null);

      toast.success("Images updated successfully");
    } catch (error) {
      console.error("Error updating images:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update images"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Sketch Grid Management" />

      <div className="p-4 sm:p-6 md:p-8">
        {isLoading ? (
          <ImageSkeleton count={6} aspectRatio="square" />
        ) : (
          <section className="w-full max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                Manage Sketches
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Upload and manage sketch pairs. Each pair consists of an
                original reference image and its sketch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {workImages.map((img, index) => (
                <Card key={img.id || index} className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="aspect-square relative">
                      <img
                        src={img.original}
                        alt={`Original ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="aspect-square relative">
                      <img
                        src={img.sketch}
                        alt={`Sketch ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full text-xs sm:text-sm"
                          onClick={() => handleImageChange(img.id)}
                        >
                          Change Images
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-lg sm:text-xl">
                            Update Image Pair
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                          <div className="space-y-1 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium">
                              Original Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileSelect(e, "original")}
                              className="w-full text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium">
                              Sketch Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileSelect(e, "sketch")}
                              className="w-full text-xs sm:text-sm"
                            />
                          </div>
                          <Button
                            onClick={handleSubmit}
                            disabled={!newSketch || !newOriginal || isUploading}
                            className="w-full text-xs sm:text-sm"
                          >
                            {isUploading ? "Uploading..." : "Submit"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
