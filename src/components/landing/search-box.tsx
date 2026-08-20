"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  searchCatalog,
  type SearchResults,
} from "@/services/catalog-api";

const fallbackThumb = "/images/service-cleaning.jpg";

function formatPrice(service: SearchResults["services"][number]): string | null {
  const details = service.serviceDetails;
  const value =
    details.serviceType === "hourly"
      ? details.hourlyPrice
      : details.perSessionPrice;
  if (value == null) return null;
  return `$${value}${details.serviceType === "hourly" ? "/hr" : "/session"}`;
}

export function SearchBox({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["catalog-search", debouncedQuery],
    queryFn: () => searchCatalog(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 30,
  });

  const showDropdown =
    open && debouncedQuery.length > 0 && (isFetching || data);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#747d8c]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              event.currentTarget.blur();
            }
          }}
          placeholder="Search services..."
          aria-label="Search services"
          className="h-10 w-full rounded-full border border-[#d7dde5] bg-white pl-9 pr-4 text-sm text-[#171717] outline-none transition placeholder:text-[#9aa3ad] focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15"
        />
      </div>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-12 z-50 h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {isFetching ? (
            <p className="px-4 py-6 text-center text-sm text-[#9aa3ad]">
              Searching...
            </p>
          ) : data && data.categories.length === 0 && data.services.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[#9aa3ad]">
              No results found for &ldquo;{debouncedQuery}&rdquo;.
            </p>
          ) : data ? (
            <>
              {data.categories.length > 0 ? (
                <section aria-label="Category results">
                  <h3 className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[#747d8c]">
                    Categories
                  </h3>
                  {data.categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/services/${category._id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#171717] transition hover:bg-[#eff7fd]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={category.catImage}
                        alt=""
                        className="size-9 rounded-lg object-cover"
                      />
                      <span className="font-medium">{category.name.trim()}</span>
                    </Link>
                  ))}
                </section>
              ) : null}

              {data.services.length > 0 ? (
                <section aria-label="Service results">
                  <h3 className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[#747d8c]">
                    Services
                  </h3>
                  {data.services.map((service) => {
                    const categoryId =
                      typeof service.category === "string"
                        ? service.category
                        : service.category._id;
                    const price = formatPrice(service);
                    return (
                      <Link
                        key={service._id}
                        href={`/services/${categoryId}/details/${service._id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#171717] transition hover:bg-[#eff7fd]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            service.serviceDetails.serviceThumbnails?.[0] ||
                            fallbackThumb
                          }
                          alt=""
                          className="size-9 rounded-lg object-cover"
                        />
                        <span className="min-w-0 flex-1 truncate font-medium">
                          {service.serviceDetails.title}
                        </span>
                        {price ? (
                          <span className="text-xs text-[#747d8c]">{price}</span>
                        ) : null}
                      </Link>
                    );
                  })}
                </section>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}