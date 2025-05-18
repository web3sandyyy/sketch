export interface ApiResponse<T> {
  data: T[] | null;
  error: string | null;
}

export interface SketchGridItem {
  id: number;
  sketch: string;
  original: string;
}
