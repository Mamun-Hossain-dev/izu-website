import { ArrowLeft, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const serviceCatalog = {
  cleaning: {
    name: "Cleaning",
    cardTitle: "Complete Kitchen Cleaning",
    images: ["/images/category-cleaning.jpg", "/images/service-cleaning.jpg"],
    price: 45,
  },
  plumbing: {
    name: "Plumbing",
    cardTitle: "Professional Plumbing Service",
    images: ["/images/category-plumbing.jpg", "/images/service-plumbing.jpg"],
    price: 55,
  },
  electrical: {
    name: "Electrical",
    cardTitle: "Certified Electrical Repair",
    images: ["/images/category-electrical.jpg", "/images/service-electrical.jpg"],
    price: 60,
  },
  carpentry: {
    name: "Carpentry",
    cardTitle: "Custom Carpentry Service",
    images: ["/images/category-carpentry.jpg", "/images/service-carpentry.jpg"],
    price: 50,
  },
  painting: {
    name: "Painting",
    cardTitle: "Professional Home Painting",
    images: ["/images/category-painting.jpg"],
    price: 48,
  },
  interior: {
    name: "Interior",
    cardTitle: "Modern Interior Service",
    images: ["/images/service-cleaning.jpg"],
    price: 65,
  },
  construction: {
    name: "Construction",
    cardTitle: "Reliable Construction Service",
    images: ["/images/category-construction.jpg", "/images/hero-construction-worker.jpg"],
    price: 75,
  },
} as const;

export type ServiceSlug = keyof typeof serviceCatalog;

export const serviceSlugs = Object.keys(serviceCatalog) as ServiceSlug[];

export function isServiceSlug(value: string): value is ServiceSlug {
  return value in serviceCatalog;
}

export function getServiceDetails(service: ServiceSlug) {
  return serviceCatalog[service];
}

function ServiceCard({ service, index }: { service: ServiceSlug; index: number }) {
  const details = serviceCatalog[service];
  const image = details.images[index % details.images.length];

  return (
    <article className="overflow-hidden rounded-lg border border-[#8ebce8] bg-white">
      <div className="relative h-[225px] overflow-hidden">
        <Image
          src={image}
          alt={`${details.name} service ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-white px-4 py-1 text-xs text-[#2877bb] shadow-sm">
          {details.name}
        </span>
      </div>

      <div className="p-3">
        <h2 className="text-xl font-medium text-black">{details.cardTitle}</h2>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/images/customer-rikan-bhart.jpg" alt="Mrs. Rani" width={34} height={34} className="size-[34px] rounded-full object-cover" />
            <div className="leading-tight">
              <h3 className="text-lg font-medium text-[#6b6b6b]">Mrs. Rani</h3>
              <p className="mt-1 text-xs text-[#777]">@Service Provider</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-[#4e5865]">
            <Star className="size-5 text-[#ffb000]" />
            <span>4.8</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-[#747d8c]">
          <span className="flex items-center gap-1"><MapPin className="size-5" />2.5 km</span>
          <span>$&nbsp; {details.price}/hr</span>
        </div>

        <Link href="#" className="mt-4 flex h-12 items-center justify-center rounded-full bg-[#2d76b9] text-lg font-medium text-white transition hover:bg-[#205f96]">
          View
        </Link>
      </div>
    </article>
  );
}

export function ServiceListing({ service }: { service: ServiceSlug }) {
  const details = serviceCatalog[service];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-[1160px]">
          <Link
            href="/categories"
            aria-label="Back to categories"
            className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-[#313131] text-[#313131] transition hover:border-[#2877bb] hover:text-[#2877bb] sm:top-3"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="px-12 text-center">
            <h1 className="text-3xl font-bold text-[#343b40] sm:text-4xl">{details.name} Services</h1>
            <p className="mx-auto mt-3 max-w-[760px] text-sm text-[#667078] sm:text-base">
              Find reliable, experienced professionals for high-quality {details.name.toLowerCase()} services near you.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1160px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }, (_, index) => (
            <ServiceCard key={`${service}-${index}`} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
