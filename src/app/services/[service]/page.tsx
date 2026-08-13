import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { isServiceSlug, ServiceListing, serviceSlugs } from "@/components/landing/service-listing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export default function ServicePage({ params }: { params: { service: string } }) {
  if (!isServiceSlug(params.service)) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader active="categories" />
      <ServiceListing service={params.service} />
      <LandingFooter />
      <FloatingChatButton />
    </main>
  );
}
