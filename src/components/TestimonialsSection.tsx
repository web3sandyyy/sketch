"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getReviews } from "@/utils/supabase/apis";
import { Testimonial } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await getReviews();
      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data || []);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section
        id="testimonials"
        className="w-full max-w-5xl mx-auto py-12 px-4"
      >
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        <p className="mb-6 text-gray-500">What my clients say</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl p-6 shadow">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="rounded-full w-10 h-10" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="w-full max-w-5xl mx-auto pt-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      <p className="mb-6 text-gray-500">What my clients say</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
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
