"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("authorized");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Welcome to the admin dashboard!</p>
        </div>
      </div>
    </div>
  );
}
