import Image from "next/image";
import { Phone, Instagram } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const menuItems = [
    { label: "Sketch", href: "/work" },
    { label: "Mehendi", href: "/mehendi" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 flex justify-between items-center px-6 py-4">
      <Image
        src="/assets/transparent-logo.png"
        alt="Logo"
        width={180}
        height={60}
        className="h-14 w-auto"
      />

      <div className="flex items-center gap-4 text-lg font-medium">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a href="https://wa.me/919826000000" target="_blank" rel="noopener noreferrer">
          <Phone size={24} />
        </a>
        <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer">
          <Instagram size={24} />
        </a>
      </div>
    </header>
  );
}
