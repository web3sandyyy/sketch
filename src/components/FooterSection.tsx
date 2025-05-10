import { Instagram, MessageCircle } from "lucide-react";

export default function FooterSection() {
  return (
    <>
      <div className="w-full py-8 text-center text-lg font-medium text-gray-700">
        Transform your ideas into stunning digital art with our expert sketching
        services. Get started today and bring your vision to life!
      </div>
      <footer className="w-full py-4 flex flex-col sm:flex-row items-center justify-between px-4 text-gray-400 text-sm border-t bg-white/80">
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Follow us on Instagram{" "}
            <Instagram className="inline ml-1" size={18} />
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Chat on WhatsApp <MessageCircle className="inline ml-1" size={18} />
          </a>
        </div>
        <div className="mt-2 sm:mt-0">
          &copy; {new Date().getFullYear()} Anusketchart - Your Digital Art
          Partner
        </div>
      </footer>
    </>
  );
}
