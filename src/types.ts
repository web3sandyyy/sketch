export interface ApiResponse<T> {
  data: T[] | null;
  error: string | null;
  status: "success" | "error";
}

export interface SketchGridItem {
  id: number;
  sketch: string;
  original: string;
}

export interface CarouselImage {
  id: number;
  sketch: string;
}
