import { Instagram, MessageCircle } from "lucide-react";

export default function FooterSection() {
  return (
    <>
      <div className="w-full py-8 text-center text-lg font-medium text-gray-700">
        Write something here so they will buy
      </div>
      <footer className="w-full py-4 flex flex-col sm:flex-row items-center justify-between px-4 text-gray-400 text-sm border-t bg-white/80">
        <div>
          Follow us on Insta <Instagram className="inline ml-1" size={18} /> and
          connect on WhatsApp{" "}
          <MessageCircle className="inline ml-1" size={18} />
        </div>
        <div className="mt-2 sm:mt-0">
          &copy; {new Date().getFullYear()} Anusketchart
        </div>
      </footer>
    </>
  );
}
