import HeroSection from "@/app/_components/HeroSection";
import CtaSection from "@/app/_components/CtaSection";
import TestimonialsSection from "@/app/_components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <HeroSection />
      <CtaSection />
      <TestimonialsSection />
    </main>
  );
}
