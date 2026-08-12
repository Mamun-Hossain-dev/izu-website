import { AppDownloadAndFooter } from "@/components/landing/app-download-and-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingHeader } from "@/components/landing/landing-header";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustAndAchievements } from "@/components/landing/trust-and-achievements";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#101010]">
      <LandingHeader />
      <HeroSection />
      <ServicesSection />
      <TrustAndAchievements />
      <HowItWorks />
      <TestimonialsSection />
      <AppDownloadAndFooter />
    </main>
  );
}
