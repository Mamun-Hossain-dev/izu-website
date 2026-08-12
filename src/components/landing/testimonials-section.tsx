"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const testimonials = [
  {
    name: "Rikan Bhart",
    review: "Excellent roof repair service! The work was done professionally and on time. The team explained everything clearly and fixed the leak perfectly. Highly recommended.",
  },
  {
    name: "Daniel Harper",
    review: "The plumber arrived right on schedule and completed the repair quickly. Everything was clearly explained, the pricing was fair, and the workspace was left spotless.",
  },
  {
    name: "Sophia Miller",
    review: "Booking an electrician was simple and stress-free. The professional was friendly, experienced, and solved the issue safely in a single visit. Great service overall.",
  },
  {
    name: "Michael Brown",
    review: "Our cleaning service exceeded expectations. The team paid attention to every detail, worked efficiently, and made the whole house feel fresh and comfortable again.",
  },
  {
    name: "Emma Wilson",
    review: "A very reliable home-service platform. Communication was clear from booking through completion, and the technician delivered exactly what was promised.",
  },
  {
    name: "Noah Anderson",
    review: "The carpenter did a beautiful job repairing our cabinets. The finish looks professional, the work was completed on time, and the entire process was easy.",
  },
  {
    name: "Olivia Taylor",
    review: "Fast response, transparent pricing, and genuinely helpful support. The service provider was courteous and fixed our urgent plumbing problem without any hassle.",
  },
  {
    name: "James Carter",
    review: "I appreciated how easy it was to find and book a trusted professional. The technician arrived prepared, worked carefully, and delivered excellent results.",
  },
  {
    name: "Ava Thompson",
    review: "Professional service from beginning to end. The team kept me updated, respected my home, and completed the work to a very high standard. I would book again.",
  },
];

export function TestimonialsSection() {
  const track = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    track.current?.scrollBy({ left: direction * 270, behavior: "smooth" });
  }

  return (
    <section className="bg-[#f8f8f8] py-16 sm:py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#3e3029]">What Our Clients Love About Us</h2>
          <p className="mt-2 text-lg text-[#6f625c]">Discover how we help business succeed online.</p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={() => scroll(-1)} aria-label="Previous testimonial" className="grid size-8 place-items-center rounded-full bg-white text-[#777] shadow-md hover:text-[#2877bb]">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next testimonial" className="grid size-8 place-items-center rounded-full bg-white text-[#333] shadow-md hover:text-[#2877bb]">
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div ref={track} className="mt-4 flex snap-x gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="w-[245px] shrink-0 snap-start rounded-xl bg-white px-4 py-9 shadow-[1px_2px_4px_rgba(0,0,0,.25)] sm:w-[250px]">
              <p className="text-[15px] leading-[1.55] text-[#746b66]">{testimonial.review}</p>
              <div className="mt-5 flex items-center gap-3">
                <Image src="/images/customer-rikan-bhart.jpg" alt={testimonial.name} width={50} height={50} className="size-[50px] rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-[#43352f]">{testimonial.name}</h3>
                  <div className="mt-1 tracking-[2px] text-[#ffd400]" aria-label="5 out of 5 stars">★★★★★</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
