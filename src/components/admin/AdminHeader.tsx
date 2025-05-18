import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("authorized");
    router.push("/admin");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src="/assets/transparent-logo.png"
                alt="Anusketchart Logo"
                className="object-contain h-8 sm:h-10 md:h-12 w-auto"
                priority
                width={300}
                height={100}
              />
            </Link>
            <div className="h-6 sm:h-8 w-px bg-gray-300 hidden sm:block" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 hidden sm:block truncate">
              {title}
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/admin/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 text-xs sm:text-sm"
              >
                Dashboard
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile title - only visible on small screens */}
      <div className="sm:hidden px-4 pb-2">
        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default AdminHeader;
