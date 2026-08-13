import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { ServiceDetails } from "@/components/landing/service-details";
import { getServiceDetails, isServiceSlug, serviceSlugs } from "@/components/landing/service-listing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export default function ServiceDetailsPage({ params }: { params: { service: string } }) {
  if (!isServiceSlug(params.service)) notFound();
  const details = getServiceDetails(params.service);

  return (
    <main className="overflow-hidden bg-white pt-16 text-[#101010]">
      <LandingHeader active="categories" />
      <ServiceDetails slug={params.service} name={details.name} title={details.cardTitle} images={[...details.images]} price={details.price} />
      <LandingFooter />
      <FloatingChatButton />
    </main>
  );
}
