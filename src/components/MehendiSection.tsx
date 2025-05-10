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
    <section id="mehendi" className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Mehendi Arts</h2>
      <p className="mb-6 text-gray-500">
        Mehendi is more than decoration—it's a celebration of tradition, beauty,
        and joy. Let your hands tell a story with intricate, personalized
        designs for every occasion.
      </p>
      <MehendiCarousel images={mehendiImages} />
    </section>
  );
}
