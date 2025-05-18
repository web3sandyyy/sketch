import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { supabaseUrl } from "@/config";

function getStorage() {
  return createClient().storage;
}

type UploadProps = {
  file: File;
  bucket?: string;
  folder?: string;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
};

export const uploadImage = async ({ file, bucket = "images", folder, maxSizeMB = 2, maxWidthOrHeight = 500 }: UploadProps) => {
    if (file.size > 10 * 1024 * 1024) {
      return { imageUrl: "", error: "File size exceeds 10MB" };
    }
  
    try {
      file = await imageCompression(file, { maxSizeMB, maxWidthOrHeight });
    } catch (error) {
      return { imageUrl: "", error: "Image compression failed" };
    }
  
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;
  
    const storage = getStorage();
    const { data, error } = await storage.from(bucket).upload(path, file);
    if (error) return { imageUrl: "", error: "Image upload failed" };
  
    return { imageUrl: `${supabaseUrl}/storage/v1/object/public/${bucket}/${data.path}`, error: "" };
  };
  
  export const deleteImage = async (imageUrl: string) => {
    if (!imageUrl.includes("/storage/v1/object/public/")) {
      return { data: null, error: "Invalid image URL" };
    }
    const [bucket, ...pathArray] = imageUrl.split("/storage/v1/object/public/")[1].split("/");
    const storage = getStorage();
    return storage.from(bucket).remove([pathArray.join("/")]);
  };
  
  export const convertBlobUrlToFile = async (blobUrl: string) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = Math.random().toString(36).slice(2, 9);
    return new File([blob], `${fileName}.${blob.type.split("/")[1]}`, { type: blob.type });
  };