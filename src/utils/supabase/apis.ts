import { createClient } from "./client";
import { ApiResponse, SketchGridItem } from "@/types";
const supabase = createClient();

const getData = async <T>(table: string): Promise<ApiResponse<T>> => {
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "An unexpected error occurred" };
  }
};

export const getSketchGrid = () => {
  return getData<SketchGridItem>("sketchgrid");
};

export const getSketchCarousel = () => {
  return getData("sketchcarousel");
};

export const getCanvasCarousel = () => {
  return getData("canvascarousel");
};

export const getReviews = () => {
  return getData("reviews");
};

// POST APIS
export const postSketchGrid = async (
  sketch: string,
  original: string,
  id: number
) => {
  try {
    const { data, error } = await supabase
      .from("sketchgrid")
      .update({ sketch, original })
      .eq("id", id);

    if (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "An unexpected error occurred" };
  }
};
