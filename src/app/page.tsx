import HeroSection from "@/components/HeroSection";
import SketchSection from "@/components/SketchSection";
import MehendiSection from "@/components/MehendiSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingWhatsapp";
import Classes from "@/components/Classes";

export default function Home() {
  return (
    <div className=" text-gray-900 min-h-[100dvh] relative overflow-hidden">
      <Header />
      <div className="flex flex-col bg-white">
        <HeroSection />
        <SketchSection />
        <MehendiSection />
        <Classes />
        <TestimonialsSection />
        <FooterSection />
        <FloatingButtons />
      </div>
    </div>
  );
}
