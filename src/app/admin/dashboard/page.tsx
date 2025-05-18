"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "Sketch Grid",
      description: "Manage sketch grid pairs",
      link: "/admin/sketch-grid",
    },
    {
      title: "Sketch Carousel",
      description: "Manage sketch carousel images",
      link: "/admin/sketch-carousel",
    },
    {
      title: "Canvas Carousel",
      description: "Manage canvas carousel images",
      link: "/admin/canvas-carousel",
    },
    {
      title: "Reviews",
      description: "Manage customer reviews",
      link: "/admin/reviews",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Admin Dashboard" />

      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {adminSections.map((section) => (
            <Card
              key={section.title}
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                {section.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3 sm:mb-4">
                {section.description}
              </p>
              <Link href={section.link}>
                <Button className="w-full text-sm">Manage</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
