import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { phoneNumber } from "@/config";

export default function FooterSection() {
  return (
    <footer className="w-full mt-16 sm:mt-24 border-t bg-white/80">
      <div className="max-w-5xl mx-auto">
        <div className="py-6 sm:py-8 text-center font-medium text-gray-700 px-4 border-b">
          <p className="text-base sm:text-lg italic">
            "1 Corinthians 13:13 And now these three remain: faith, hope and
            love. But the greatest of these is love."
          </p>
        </div>

        <div className="py-6 sm:py-8 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Anusketchart - Your Digital Art
            Partner
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com/anusketchart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href={phoneNumber}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
