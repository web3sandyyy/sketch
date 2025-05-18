import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadImage } from "@/utils/supabase/storage";
import {
  getSketchCarousel,
  postSketchCarousel,
  deleteSketchCarousel,
} from "@/utils/supabase/apis";
import { toast } from "sonner";
import { CarouselImage } from "@/types";

const SketchCarouselAdmin = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleAddImage = async () => {
    if (!newImage) return;
    if (carouselImages.length >= 10) {
      toast.error("Maximum limit of 10 images reached");
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await uploadImage({
        file: newImage,
        folder: "sketchcarousel",
      });
      if (uploadResult.error) {
        throw new Error(uploadResult.error);
      }

      const { data, error } = await postSketchCarousel(uploadResult.imageUrl);
      if (error) {
        throw new Error(error);
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("Failed to add image to carousel");
      }

      const newImageData: CarouselImage = {
        id: data[0].id,
        sketch: data[0].sketch,
      };
      setCarouselImages([...carouselImages, newImageData]);
      toast.success("Image added successfully");
      setNewImage(null);
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      const { error } = await deleteSketchCarousel(id);
      console.log("error", error);
      if (error) {
        throw new Error(error);
      }

      setCarouselImages(carouselImages.filter((img) => img.id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete image"
      );
    }
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
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Manage Carousel Images</h2>
      <p className="mb-6 text-gray-500">
        Upload and manage carousel images. Maximum of 10 images allowed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {carouselImages.map((img) => (
          <Card key={img.id} className="p-4">
            <div className="space-y-4">
              <div className="aspect-square relative">
                <img
                  src={img.sketch}
                  alt={`Carousel Image ${img.id}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleDeleteImage(img.id)}
              >
                Remove Image
              </Button>
            </div>
          </Card>
        ))}

        {carouselImages.length < 10 && (
          <Card className="p-4">
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-full min-h-[200px]"
                  >
                    Add New Image
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Carousel Image</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={handleAddImage}
                      disabled={!newImage || isUploading}
                      className="w-full"
                    >
                      {isUploading ? "Uploading..." : "Add Image"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default SketchCarouselAdmin;
