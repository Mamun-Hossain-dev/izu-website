// import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { ServiceListing } from "@/components/landing/service-listing";

export default function ServicePage({ params }: { params: { service: string } }) {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader active="categories" />
      <ServiceListing categoryId={params.service} />
      <LandingFooter />
      {/* <FloatingChatButton /> */}
    </main>
  );
}