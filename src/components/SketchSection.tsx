import FlippableImage from "./FlippableImage";
import sketch from "@/assets/sketch.jpeg";
import original from "@/assets/original-sketch.jpeg";

const workImages = [
  {
    sketch: sketch,
    original: original,
  },
  {
    sketch: sketch,
    original: original,
  },
  {
    sketch: sketch,
    original: original,
  },
  {
    sketch: sketch,
    original: original,
  },
  {
    sketch: sketch,
    original: original,
  },
  {
    sketch: sketch,
    original: original,
  },
];

export default function WorkSection() {
  return (
    <section id="sketch" className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Sketches</h2>
      <p className="mb-6 text-gray-500">
        A hand-drawn portrait is a gift of emotion—a way to cherish the people
        and moments that matter most. See how your story can come to life on
        paper.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {workImages.map((img, i) => (
          <FlippableImage
            key={i}
            sketch={img.sketch}
            original={img.original}
            index={i}
            totalImages={workImages.length}
            flipDuration={2500}
          />
        ))}
      </div>
    </section>
  );
}
