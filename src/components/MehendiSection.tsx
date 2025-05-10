import MehendiCarousel from "./MehendiCarousel";
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

export default function MehendiSection() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Mehendi arts</h2>
      <p className="mb-6 text-gray-500">
        Something motivational or that will make people buy
      </p>
      <MehendiCarousel images={mehendiImages} />
    </section>
  );
}
