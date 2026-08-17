import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { ServiceDetails } from "@/components/landing/service-details";

export default function ServiceDetailsPage({
  params,
}: {
  params: { service: string; serviceId: string };
}) {
  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader active="categories" />
      <ServiceDetails serviceId={params.serviceId} categoryId={params.service} />
      <LandingFooter />
      <FloatingChatButton />
    </main>
  );
}