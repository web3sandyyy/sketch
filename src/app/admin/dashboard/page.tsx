"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("authorized");
    router.push("/admin");
  };

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminSections.map((section) => (
          <Card
            key={section.title}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-500 mb-4">{section.description}</p>
            <Link href={section.link}>
              <Button className="w-full">Manage</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
