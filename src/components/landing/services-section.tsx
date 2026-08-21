"use client";

import { getCategories } from "@/services/catalog-api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CatalogEmpty, CatalogError } from "@/components/landing/catalog-states";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

function ServicesSectionSkeleton() {
  return (
    <div className="container mt-9 flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const handleScroll = () => {
      const itemWidth =
        (el.firstElementChild?.getBoundingClientRect().width || 340) + 16;
      const index = Math.round(el.scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [data]);

  const scrollToDot = (index: number) => {
    if (!track.current) return;
    const itemWidth =
      (track.current.firstElementChild?.getBoundingClientRect().width || 340) + 16;
    track.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  function scroll(direction: number) {
    if (!data || data.length === 0) return;
    const nextIndex = Math.max(0, Math.min(data.length - 1, activeIndex + direction));
    scrollToDot(nextIndex);
  }

  return (
    <section id="services" className="relative scroll-mt-20 bg-white py-12 sm:py-14">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-[#343b40] sm:text-4xl">Services</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#667078] sm:text-base">
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
          className="container mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8"
        >
          {data.map((category) => (
            <Link
              key={category._id}
              href={`/services/${category._id}`}
              className="group w-[calc(100vw-2rem)] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#f1f1f1] transition-transform duration-300 hover:-translate-y-1 sm:w-[340px]"
            >
              <div className="relative h-[220px] sm:h-[250px]">
                <Image
                  src={category.catImage}
                  alt={`${category.name} service`}
                  fill
                  sizes="340px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="py-5 text-center text-[26px] font-bold text-[#383f44] transition-colors group-hover:text-[#2674b7]">
                {category.name.trim()}
              </h3>
            </Link>
          ))}
        </div>
      )}

      {data && data.length > 0 && (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => scroll(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous services"
            className="grid size-9 place-items-center rounded-full bg-[#f0f1f1] text-[#555] transition-all hover:bg-[#2674b7] hover:text-white disabled:opacity-40 disabled:hover:bg-[#f0f1f1] disabled:hover:text-[#555]"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {data.map((_, dotIndex) => {
              const isActive = dotIndex === activeIndex;
              return (
                <button
                  key={dotIndex}
                  onClick={() => scrollToDot(dotIndex)}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-[#2674b7]"
                      : "w-2.5 bg-[#a7a7a7] hover:bg-[#666]"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => scroll(1)}
            disabled={activeIndex === data.length - 1}
            aria-label="Next services"
            className="grid size-9 place-items-center rounded-full bg-[#f0f1f1] text-[#555] transition-all hover:bg-[#2674b7] hover:text-white disabled:opacity-40 disabled:hover:bg-[#f0f1f1] disabled:hover:text-[#555]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
