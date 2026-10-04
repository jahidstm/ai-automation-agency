import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ChatbotDemoWidget from "@/components/landing/ChatbotDemoWidget";
import ROICalculator from "@/components/landing/ROICalculator";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTAStrip from "@/components/landing/CTAStrip";
import Footer from "@/components/landing/Footer";

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
        <PricingSection />
        <TestimonialsSection />
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
