import React, { useState } from "react";
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
import { toast } from "sonner";

interface CarouselAdminProps<T> {
  title: string;
  description: string;
  images: T[];
  imageKey: keyof T;
  idKey: keyof T;
  folder: string;
  maxImages?: number;
  onAdd: (
    imageUrl: string
  ) => Promise<{ data: T[] | null; error: string | null }>;
  onDelete: (id: number) => Promise<{ error: string | null }>;
  onImagesChange: (newImages: T[]) => void;
}

function CommonCarouselAdmin<T>({
  title,
  description,
  images,
  imageKey,
  idKey,
  folder,
  maxImages = 10,
  onAdd,
  onDelete,
  onImagesChange,
}: CarouselAdminProps<T>) {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleAddImage = async () => {
    if (!newImage) return;
    if (images.length >= maxImages) {
      toast.error(`Maximum limit of ${maxImages} images reached`);
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await uploadImage({ file: newImage, folder });
      if (uploadResult.error) {
        throw new Error(uploadResult.error);
      }

      const { data, error } = await onAdd(uploadResult.imageUrl);
      if (error) {
        throw new Error(error);
      }

      if (!data || data.length === 0) {
        throw new Error("Failed to add image to carousel");
      }

      onImagesChange([...images, data[0]]);
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
      const { error } = await onDelete(id);
      if (error) {
        throw new Error(error);
      }

      onImagesChange(images.filter((img) => Number(img[idKey]) !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete image"
      );
    }
  };

  return (
    <div className="w-full">
      {title && (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
            {title}
          </h2>
          <p className="mb-4 sm:mb-6 text-gray-500 text-sm sm:text-base">
            {description}
          </p>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {images.map((img) => (
          <Card key={String(img[idKey])} className="p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="aspect-square relative">
                <img
                  src={String(img[imageKey])}
                  alt={`Carousel Image ${String(img[idKey])}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <Button
                variant="destructive"
                className="w-full text-xs sm:text-sm"
                onClick={() => handleDeleteImage(Number(img[idKey]))}
              >
                Remove Image
              </Button>
            </div>
          </Card>
        ))}

        {images.length < maxImages && (
          <Card className="p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-full min-h-[150px] sm:min-h-[200px] text-xs sm:text-sm"
                  >
                    Add New Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">
                      Add New Image
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="w-full text-xs sm:text-sm"
                      />
                    </div>
                    <Button
                      onClick={handleAddImage}
                      disabled={!newImage || isUploading}
                      className="w-full text-xs sm:text-sm"
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
    </div>
  );
}

export default CommonCarouselAdmin;
