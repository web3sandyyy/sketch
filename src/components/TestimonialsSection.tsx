import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Some name",
    review:
      "Lorem review, will add some review, will add some review, will add some review, will add some review.",
  },
  {
    name: "Some name",
    review:
      "Lorem review, will add some review, will add some review, will add some review, will add some review.",
  },
  {
    name: "Some name",
    review:
      "Lorem review, will add some review, will add some review, will add some review, will add some review.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Testimonials</h2>
      <p className="mb-6 text-gray-500">Review of my customer</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <span className="font-semibold">{t.name}</span>
            </div>
            <p className="text-gray-600 text-sm">{t.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
