import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "Anu's portrait of my grandparents brought tears to our eyes. She captured their warmth and love so beautifully. This sketch is now a family treasure!",
  },
  {
    name: "Rahul Mehta",
    review:
      "I gifted my wife a hand-drawn portrait for our anniversary. Anu's attention to detail and ability to capture emotion is incredible. Highly recommended!",
  },
  {
    name: "Sonal Verma",
    review:
      "The mehendi design Anu created for my wedding was stunning and unique. She listened to my ideas and made them even better. Thank you for making my day extra special!",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Testimonials</h2>
      <p className="mb-6 text-gray-500">What my clients say</p>
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
