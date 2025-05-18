import { createClient } from "./client";
import {
  ApiResponse,
  SketchGridItem,
  CarouselImage,
  CanvasImage,
  Testimonial,
} from "@/types";
const supabase = createClient();

const getData = async <T>(table: string): Promise<ApiResponse<T>> => {
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(`Error fetching from ${table}:`, error);
      return { data: null, error: error.message, status: "error" };
    }
    return { data, error: null, status: "success" };
  } catch (error) {
    console.error(`Unexpected error in ${table}:`, error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const getSketchGrid = () => {
  return getData<SketchGridItem>("sketchgrid");
};

export const getSketchCarousel = () => {
  return getData<CarouselImage>("sketchcarousel");
};

export const getCanvasCarousel = () => {
  return getData<CanvasImage>("canvascarousel");
};

export const getReviews = () => {
  return getData<Testimonial>("reviews");
};

// POST APIS
export const postSketchGrid = async (
  sketch: string,
  original: string,
  id: number
): Promise<ApiResponse<any>> => {
  try {
    const { data, error } = await supabase
      .from("sketchgrid")
      .update({ sketch, original })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating sketch grid:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "No record was updated", status: "error" };
    }

    return { data: data[0], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in postSketchGrid:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const postSketchCarousel = async (
  sketch: string
): Promise<ApiResponse<CarouselImage>> => {
  try {
    const { data, error } = await supabase
      .from("sketchcarousel")
      .insert({ sketch })
      .select();

    if (error) {
      console.error("Error inserting sketch carousel:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "Failed to insert record", status: "error" };
    }

    return { data: [data[0]], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in postSketchCarousel:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const deleteSketchCarousel = async (
  id: number
): Promise<ApiResponse<any>> => {
  try {
    const { data, error } = await supabase
      .from("sketchcarousel")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting sketch carousel:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "No record was deleted", status: "error" };
    }

    return { data: data[0], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in deleteSketchCarousel:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const postCanvasCarousel = async (
  canvas: string
): Promise<ApiResponse<CanvasImage>> => {
  try {
    const { data, error } = await supabase
      .from("canvascarousel")
      .insert({ canvas })
      .select();

    if (error) {
      console.error("Error inserting canvas carousel:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "Failed to insert record", status: "error" };
    }

    return { data: [data[0]], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in postCanvasCarousel:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const deleteCanvasCarousel = async (
  id: number
): Promise<ApiResponse<any>> => {
  try {
    const { data, error } = await supabase
      .from("canvascarousel")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting canvas carousel:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "No record was deleted", status: "error" };
    }

    return { data: data[0], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in deleteCanvasCarousel:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const postTestimonials = async (
  name: string,
  review: string
): Promise<ApiResponse<Testimonial>> => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert({ name, review })
      .select();

    if (error) {
      console.error("Error inserting testimonial:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "Failed to insert record", status: "error" };
    }

    return { data: [data[0]], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in postTestimonials:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};

export const deleteTestimonials = async (
  id: number
): Promise<ApiResponse<any>> => {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting testimonial:", error);
      return { data: null, error: error.message, status: "error" };
    }

    if (!data || data.length === 0) {
      return { data: null, error: "No record was deleted", status: "error" };
    }

    return { data: data[0], error: null, status: "success" };
  } catch (error) {
    console.error("Unexpected error in deleteTestimonials:", error);
    return {
      data: null,
      error: "An unexpected error occurred",
      status: "error",
    };
  }
};
