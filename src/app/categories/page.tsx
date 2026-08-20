import { AppDownloadSection } from "@/components/landing/app-download-section";
import { CategoriesGrid, CategoriesHero } from "@/components/landing/categories-content";
// import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustAndAchievements } from "@/components/landing/trust-and-achievements";

export default function CategoriesPage() {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader active="categories" />
      <CategoriesHero />
      <CategoriesGrid />
      <TrustAndAchievements showAchievements={false} />
      <HowItWorks />
      <TestimonialsSection />
      <AppDownloadSection />
      <LandingFooter />
      {/* <FloatingChatButton /> */}
    </main>
  );
}
