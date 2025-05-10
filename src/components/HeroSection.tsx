import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Header from "./Header";

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      >
        <source src="/assets/drawing1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-white/70 z-10" />
      <div className="relative z-20 h-[calc(100dvh-88px)] w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-6 -mt-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">
            Immortalize Your Memories with a Hand-Drawn Portrait
          </h1>
          <p className="text-lg text-center text-gray-700 max-w-xl">
            Every face tells a story. Let Anu capture yours with warmth, detail,
            and heart. A custom sketch is more than a picture—it's a memory you
            can hold forever.
          </p>
          <Button className="flex items-center gap-2 px-6 py-3 text-lg bg-gray-900 text-white hover:bg-gray-700 rounded-full shadow-lg">
            <MessageCircle size={20} /> Connect
          </Button>
        </div>
      </div>
    </section>
  );
}
