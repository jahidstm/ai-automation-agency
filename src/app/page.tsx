import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ChatbotDemoWidget from "@/components/landing/ChatbotDemoWidget";
import ROICalculator from "@/components/landing/ROICalculator";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ServicesSection />
        <HowItWorksSection />
        <ChatbotDemoWidget />
        <ROICalculator />
        <CaseStudiesSection />
      </main>
    </>
  );
}
