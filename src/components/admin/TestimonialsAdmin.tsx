import React, { useState, useEffect } from "react";
import {
  getReviews,
  postTestimonials,
  deleteTestimonials,
} from "@/utils/supabase/apis";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_TESTIMONIALS = 3;

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await getReviews();
    if (error) {
      toast.error(error);
      return;
    }
    setTestimonials(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (testimonials.length >= MAX_TESTIMONIALS) {
      toast.error(
        `Maximum limit of ${MAX_TESTIMONIALS} testimonials reached. Please delete one to add a new one.`
      );
      return;
    }

    if (!name.trim() || !review.trim()) {
      toast.error("Please enter both name and review");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await postTestimonials(name, review);
      if (error) {
        throw new Error(error);
      }

      if (!data || data.length === 0) {
        throw new Error("Failed to add testimonial");
      }

      setTestimonials([...testimonials, data[0]]);
      toast.success("Testimonial added successfully");
      setName("");
      setReview("");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add testimonial"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await deleteTestimonials(id);
      if (error) {
        throw new Error(error);
      }

      setTestimonials(testimonials.filter((item) => item.id !== id));
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete testimonial"
      );
    }
  };

  if (isLoading) {
    return (
      <section className="w-full max-w-5xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">Manage Testimonials</h2>
      <p className="mb-6 text-gray-500">
        Add and manage customer testimonials. Maximum of {MAX_TESTIMONIALS}{" "}
        testimonials allowed.
      </p>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="mt-2 text-gray-700">{testimonial.review}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(testimonial.id)}
                className="shrink-0"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length < MAX_TESTIMONIALS && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Testimonial</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Testimonial</Label>
              <Textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Enter customer review"
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !review.trim()}
            >
              {isSubmitting ? "Adding..." : "Add Testimonial"}
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
};

export default TestimonialsAdmin;
