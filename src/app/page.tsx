import { AppDownloadSection } from "@/components/landing/app-download-section";
// import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustAndAchievements } from "@/components/landing/trust-and-achievements";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader />
      <HeroSection />
      <ServicesSection />
      <TrustAndAchievements />
      <HowItWorks />
      <TestimonialsSection />
      <AppDownloadSection />
      <LandingFooter />
      {/* <FloatingChatButton /> */}
    </main>
  );
}
