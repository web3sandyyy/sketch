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
import { getSketchGrid, postSketchGrid } from "@/utils/supabase/apis";
import { toast } from "sonner";

interface ImagePair {
  id: number;
  sketch: string;
  original: string;
}

const SketchSectionAdmin = () => {
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
      <h2 className="text-2xl font-semibold mb-2">Manage Sketches</h2>
      <p className="mb-6 text-gray-500">
        Upload and manage sketch pairs. Each pair consists of an original
        reference image and its sketch.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workImages.map((img, index) => (
          <Card key={img.id || index} className="p-4">
            <div className="space-y-4">
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
                    className="w-full"
                    onClick={() => handleImageChange(img.id)}
                  >
                    Change Images
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Image Pair</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Original Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, "original")}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Sketch Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, "sketch")}
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      disabled={!newSketch || !newOriginal || isUploading}
                      className="w-full"
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
  );
};

export default SketchSectionAdmin;
