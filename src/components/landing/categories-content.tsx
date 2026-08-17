"use client";

import { getCategories } from "@/services/catalog-api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CatalogEmpty, CatalogError } from "@/components/landing/catalog-states";
import Image from "next/image";
import Link from "next/link";

export function CategoriesHero() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[500px]">
      <Image
        src="/images/trust-handshake.jpg"
        alt="Professionals agreeing on a home service"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative mx-auto px-4 text-center text-white">
        <h1 className="text-3xl font-bold text-[#559cff] sm:text-4xl">
          What We Provide
        </h1>
        <p className="mx-auto mt-3 max-w-[720px] text-sm leading-6 text-white/90 sm:text-base">
          Discover how The Unburdened Mind can support your journey toward
          clarity, purpose, and freedom from what no longer serves you.
        </p>
      </div>
    </section>
  );
}

function CategoryGridSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-[1160px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl bg-[#f1f1f1]">
          <Skeleton className="h-[230px] w-full rounded-none sm:h-[250px]" />
          <div className="px-5 py-5">
            <Skeleton className="mx-auto h-6 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CategoriesGrid() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <section id="services" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#343b40] sm:text-4xl">
            Services Categories
          </h2>
          <p className="mt-2 text-sm text-[#667078] sm:text-base">
            We provide modern, reliable, and scalable digital solutions to help
            businesses grow faster online.
          </p>
        </div>

        {isLoading ? (
          <CategoryGridSkeleton />
        ) : isError ? (
          <CatalogError error={error} onRetry={() => refetch()} />
        ) : !data || data.length === 0 ? (
          <CatalogEmpty
            title="No categories found"
            description="Categories will appear here once they are added."
          />
        ) : (
          <div className="mx-auto mt-10 grid max-w-[1160px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((category) => (
              <Link
                key={category._id}
                href={`/services/${category._id}`}
                className="group overflow-hidden rounded-xl bg-[#f1f1f1]"
              >
                <div className="relative h-[230px] sm:h-[250px]">
                  <Image
                    src={category.catImage}
                    alt={`${category.name} service`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="py-5 text-center text-2xl font-bold text-[#383f44]">
                  {category.name.trim()}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}