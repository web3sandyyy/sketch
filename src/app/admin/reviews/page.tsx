"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getReviews,
  postTestimonials,
  deleteTestimonials,
} from "@/utils/supabase/apis";
import { Testimonial } from "@/types";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageSkeleton from "@/components/admin/ImageSkeleton";

export default function ReviewsPage() {
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
        `Maximum limit of ${MAX_TESTIMONIALS} reviews reached. Please delete one to add a new one.`
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
        throw new Error("Failed to add review");
      }

      setTestimonials([...testimonials, data[0]]);
      toast.success("Review added successfully");
      setName("");
      setReview("");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add review"
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
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete review"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Reviews Management" />

      <div className="p-4 sm:p-6 md:p-8">
        {isLoading ? (
          <ImageSkeleton count={3} aspectRatio="review" />
        ) : (
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                Manage Reviews
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Add and manage customer reviews. Maximum of {MAX_TESTIMONIALS}{" "}
                reviews allowed.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">
                        {testimonial.review}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(testimonial.id)}
                      className="shrink-0 text-xs sm:text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {testimonials.length < MAX_TESTIMONIALS && (
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3 sm:mb-4">
                  Add New Review
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      Customer Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter customer name"
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="review" className="text-sm">
                      Review
                    </Label>
                    <Textarea
                      id="review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Enter customer review"
                      rows={4}
                      required
                      className="text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !review.trim()}
                    className="text-xs sm:text-sm"
                  >
                    {isSubmitting ? "Adding..." : "Add Review"}
                  </Button>
                </form>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
