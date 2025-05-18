import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { phoneNumber } from "@/config";

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      >
        <source src="/assets/drawing1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-white/60 z-10" />
      <div className="relative z-20 h-[calc(100dvh-88px)] w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4 sm:gap-6 -mt-10 px-4 md:px-0 mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
            Immortalize Your Memories with a Hand-Drawn Portrait
          </h1>
          <p className="text-base sm:text-lg text-center text-gray-700 max-w-xl">
            Every face tells a story. Let Anu capture yours with warmth, detail,
            and heart. A custom sketch is more than a picture—it's a memory you
            can hold forever.
          </p>
          <Link
            href={phoneNumber}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg bg-gray-900 text-white hover:bg-gray-700 rounded-full shadow-lg transition-colors"
          >
            <MessageCircle size={20} /> Connect
          </Link>
        </div>
      </div>
    </section>
  );
}
