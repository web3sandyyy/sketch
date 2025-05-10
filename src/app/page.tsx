import HeroSection from "@/components/HeroSection";
import SketchSection from "@/components/SketchSection";
import MehendiSection from "@/components/MehendiSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import whatsapp from "@/assets/whatsapp.png";

export default function Home() {
  return (
    <div className=" text-gray-900 min-h-[100dvh] relative overflow-hidden">
      <Header />
      <div className="flex flex-col bg-white">
        <HeroSection />
        <SketchSection />
        <MehendiSection />
        <TestimonialsSection />
        <FooterSection />
      </div>
      <div className="fixed bottom-0 right-0 m-4 z-50">
        <Link href="https://wa.me/8657227361">
          <Image
            src={whatsapp}
            width={50}
            height={50}
            className="w-10 h-10"
            alt="WhatsApp"
          />
        </Link>
      </div>
    </div>
  );
}
