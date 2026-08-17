"use client";

import { getCategories } from "@/services/catalog-api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CatalogEmpty, CatalogError } from "@/components/landing/catalog-states";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function ServicesSectionSkeleton() {
  return (
    <div className="container mt-9 flex gap-4 overflow-hidden">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="w-[290px] shrink-0 overflow-hidden rounded-xl bg-[#f1f1f1] sm:w-[340px]">
          <Skeleton className="h-[220px] w-full rounded-none sm:h-[250px]" />
          <div className="px-5 py-5">
            <Skeleton className="mx-auto h-6 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const track = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  function scroll(direction: number) {
    track.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  }

  return (
    <section id="services" className="relative scroll-mt-20 bg-white py-12 sm:py-14">
      <div className="container text-center">
        <h2 className="text-4xl font-bold text-[#343b40]">Services</h2>
        <p className="mt-2 text-base text-[#667078]">
          We provide modern, reliable, and scalable digital solutions to help businesses grow faster online.
        </p>
      </div>

      {isLoading ? (
        <ServicesSectionSkeleton />
      ) : isError ? (
        <CatalogError error={error} onRetry={() => refetch()} />
      ) : !data || data.length === 0 ? (
        <CatalogEmpty
          title="No services available"
          description="Service categories will appear here once they are added."
        />
      ) : (
        <div
          ref={track}
          className="container mt-9 flex snap-x gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.map((category) => (
            <Link
              key={category._id}
              href={`/services/${category._id}`}
              className="group w-[290px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#f1f1f1] sm:w-[340px]"
            >
              <div className="relative h-[220px] sm:h-[250px]">
                <Image
                  src={category.catImage}
                  alt={`${category.name} service`}
                  fill
                  sizes="340px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="py-5 text-center text-[26px] font-bold text-[#383f44]">{category.name.trim()}</h3>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-center gap-5">
        <button onClick={() => scroll(-1)} aria-label="Previous services" className="grid size-8 place-items-center rounded-full bg-[#f0f1f1] text-[#b7b7b7] hover:text-[#2877bb]">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={dot === 0 ? "size-2 rounded-full bg-[#31383c]" : "size-2 rounded-full bg-[#a7a7a7]"} />)}
        </div>
        <button onClick={() => scroll(1)} aria-label="Next services" className="grid size-8 place-items-center rounded-full bg-[#f0f1f1] text-[#555] hover:text-[#2877bb]">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}