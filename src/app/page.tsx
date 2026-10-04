import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import ServicesSection from "@/components/landing/ServicesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ServicesSection />
      </main>
    </>
  );
}
