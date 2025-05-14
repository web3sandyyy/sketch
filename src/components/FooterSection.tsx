import { Instagram, MessageCircle } from "lucide-react";

export default function FooterSection() {
  return (
    <>
      <div className="w-full py-8 text-center text-lg font-medium text-gray-700 px-4 md:px-0">
        Transform your ideas into stunning digital art with our expert sketching
        services. Get started today and bring your vision to life!
      </div>
      <footer className="w-full py-4 flex flex-col sm:flex-row items-center justify-between px-4 text-gray-400 text-sm border-t bg-white/80">
        &copy; {new Date().getFullYear()} Anusketchart - Your Digital Art
        Partner
      </footer>
    </>
  );
}
