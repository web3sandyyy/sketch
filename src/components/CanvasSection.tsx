"use client";
import CanvasCarousel from "./CanvasCarousel";

export default function CanvasSection() {
  return (
    <section
      id="canvas"
      className="w-full max-w-5xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3">
        Canvas Arts
      </h2>
      <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base text-gray-600 max-w-3xl">
        Canvas arts are more than decoration—it's a celebration of tradition,
        beauty, and joy. Let your hands tell a story with intricate,
        personalized designs for every occasion.
      </p>
      <CanvasCarousel />
    </section>
  );
}
