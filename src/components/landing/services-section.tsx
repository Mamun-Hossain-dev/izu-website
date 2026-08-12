"use client";

import { Bot, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const services = [
  { title: "Plumbing", image: "/images/service-plumbing.jpg" },
  { title: "Electrical", image: "/images/service-electrical.jpg" },
  { title: "Carpentry", image: "/images/service-carpentry.jpg" },
  { title: "Cleaning", image: "/images/service-cleaning.jpg" },
];

export function ServicesSection() {
  const track = useRef<HTMLDivElement>(null);

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

      <div
        ref={track}
        className="container mt-9 flex snap-x gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <article key={service.title} className="w-[290px] shrink-0 snap-start overflow-hidden rounded-xl bg-[#f1f1f1] sm:w-[340px]">
            <div className="relative h-[220px] sm:h-[250px]">
              <Image src={service.image} alt={`${service.title} service`} fill sizes="340px" className="object-cover" />
            </div>
            <h3 className="py-5 text-center text-[26px] font-bold text-[#383f44]">{service.title}</h3>
          </article>
        ))}
      </div>

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
      <button
        type="button"
        aria-label="Open support chat"
        className="absolute bottom-3 right-5 grid size-16 place-items-center rounded-[22px] border-2 border-[#a8a8a8] bg-white text-[#2c76b9] shadow-sm transition hover:-translate-y-1 sm:right-12 sm:size-20"
      >
        <Bot className="size-9 sm:size-11" strokeWidth={2.3} />
      </button>
    </section>
  );
}
