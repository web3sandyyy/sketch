"use client";

import Image from "next/image";
import { Instagram, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import whatsappIcon from "@/assets/icons/whatsapp.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import { instagramUrl, phoneNumber } from "@/config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const menuItems = [
    {
      label: "Sketches",
      sectionId: "sketch",
    },
    {
      label: "Canvas",
      sectionId: "mehendi",
    },
    {
      label: "Reviews",
      sectionId: "testimonials",
    },
  ];

  const handleNavigation = (sectionId: string) => {
    setIsSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300 overflow-hidden  ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden text-gray-700 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>

        {/* Logo - Hidden on mobile when sidebar is closed */}
        <div className={`${isSidebarOpen ? "hidden" : "block"} md:block`}>
          <Image
            src="/assets/transparent-logo.png"
            alt="Logo"
            width={180}
            height={60}
            className="h-10 md:h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center text-lg font-medium divide-x-2 divide-gray-600">
          {menuItems.map((item, index) => (
            <div key={index} className="">
              <button
                onClick={() => handleNavigation(item.sectionId)}
                className="hover:text-gray-600 transition-colors px-4"
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={phoneNumber}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <Image src={whatsappIcon} alt="WhatsApp" width={30} height={30} />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <Image src={instagramIcon} alt="Instagram" width={30} height={30} />
          </a>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed w-full h-full bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[100dvh] w-[80%] max-w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col min-h-full">
          <div className="mb-8 flex justify-between items-center">
            <Image
              src="/assets/transparent-logo.png"
              alt="Logo"
              width={180}
              height={60}
              className="h-10 w-auto"
            />

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-700 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col text-lg font-medium text-center divide-y divide-gray-600">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.sectionId)}
                className="hover:text-gray-600 transition-colors p-3 w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Icons - Bottom of Sidebar */}
          <div className="mt-auto pt-6 border-t">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Instagram size={24} />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
