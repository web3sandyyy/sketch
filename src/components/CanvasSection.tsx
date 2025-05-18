import CanvasCarousel from "./CanvasCarousel";
import mehendi from "@/assets/mehendi.jpeg";

const mehendiImages = [
  mehendi,
  mehendi,
  mehendi,
  mehendi,
  mehendi,
  mehendi,
  mehendi,
];

export default function CanvasSection() {
  return (
    <section id="mehendi" className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Canvas Arts</h2>
      <p className="mb-6 text-gray-500">
        Canvas arts are more than decoration—it's a celebration of tradition,
        beauty, and joy. Let your hands tell a story with intricate, personalized
        designs for every occasion.
      </p>
      <CanvasCarousel images={mehendiImages} />
    </section>
  );
}
