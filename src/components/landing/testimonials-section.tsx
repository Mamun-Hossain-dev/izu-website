"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllAndPopularServices,
  type Review,
} from "@/services/catalog-api";
import { CatalogEmpty, CatalogError } from "@/components/landing/catalog-states";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewSectionHeader() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-[#3e3029]">
        What Our Clients Love About Us
      </h2>
      <p className="mt-2 text-lg text-[#6f625c]">
        Discover how we help business succeed online.
      </p>
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="mt-10 flex gap-6 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-[245px] shrink-0 rounded-xl bg-white px-4 py-9 shadow-[1px_2px_4px_rgba(0,0,0,.15)] sm:w-[250px]"
        >
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-11/12" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <div className="mt-6 flex items-center gap-3">
            <Skeleton className="size-[50px] rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-2 h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getApiTestimonials(
  catalog: Record<string, { _id: string; reviews: Review[] }[]>
) {
  const services = Object.values(catalog).flat();
  const uniqueServices = Array.from(
    new Map(services.map((service) => [service._id, service])).values()
  );

  return uniqueServices
    .flatMap((service) =>
      (service.reviews || []).map((review, index) => {
        const author =
          typeof review.submittedBy === "object" ? review.submittedBy : undefined;
        return {
          id: review._id || `${service._id}-${review.createdAt || index}`,
          name: author?.name || "Verified customer",
          review: review.message?.trim() || "Great service experience.",
          rating: review.rating,
          avatar:
            author?.profileImage?.includes("res.cloudinary.com")
              ? author.profileImage
              : "/images/customer-rikan-bhart.jpg",
          createdAt: review.createdAt ? new Date(review.createdAt).getTime() : 0,
        };
      })
    )
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      review: testimonial.review,
      rating: testimonial.rating,
      avatar: testimonial.avatar,
    }));
}

export function TestimonialsSection() {
  const track = useRef<HTMLDivElement>(null);
  const { data: catalog, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["services-catalog"],
    queryFn: getAllAndPopularServices,
    staleTime: 5 * 60 * 1000,
  });

  const apiTestimonials = catalog ? getApiTestimonials(catalog) : [];

  function scroll(direction: number) {
    track.current?.scrollBy({ left: direction * 270, behavior: "smooth" });
  }

  return (
    <section className="bg-[#f8f8f8] py-16 sm:py-20">
      <div className="container">
        <ReviewSectionHeader />

        {isLoading ? <ReviewSkeleton /> : null}

        {isError ? (
          <CatalogError error={error} onRetry={() => void refetch()} />
        ) : null}

        {!isLoading && !isError && !apiTestimonials.length ? (
          <CatalogEmpty
            title="No reviews found"
            description="There are no customer reviews available yet."
          />
        ) : null}

        {!isLoading && !isError && apiTestimonials.length ? (
          <>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={() => scroll(-1)} aria-label="Previous testimonial" className="grid size-8 place-items-center rounded-full bg-white text-[#777] shadow-md hover:text-[#2877bb]">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next testimonial" className="grid size-8 place-items-center rounded-full bg-white text-[#333] shadow-md hover:text-[#2877bb]">
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div ref={track} className="mt-4 flex snap-x gap-6 overflow-x-auto pb-2 scroll-px-4 sm:scroll-px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {apiTestimonials.map((testimonial) => (
            <article key={testimonial.id} className="w-[245px] shrink-0 snap-start rounded-xl bg-white px-4 py-9 shadow-[1px_2px_4px_rgba(0,0,0,.25)] sm:w-[250px]">
              <p className="text-[15px] leading-[1.55] text-[#746b66]">{testimonial.review}</p>
              <div className="mt-5 flex items-center gap-3">
                <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="size-[50px] rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-[#43352f]">{testimonial.name}</h3>
                  <div className="mt-1 tracking-[2px] text-[#ffd400]" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {"★".repeat(Math.max(0, Math.min(5, testimonial.rating)))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
