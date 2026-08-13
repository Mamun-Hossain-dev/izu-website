"use client";

import { ArrowLeft, Bookmark, CalendarDays, Check, Clock3, MapPin, MessageCircle, Navigation, Star, Tag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type ServiceDetailsProps = {
  slug: string;
  name: string;
  title: string;
  images: string[];
  price: number;
};

type ModalName = "booking" | "accepted" | "confirm" | null;

function ModalShell({ children, onClose, label }: { children: React.ReactNode; onClose: () => void; label: string }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-4" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="w-full max-w-[590px] rounded-md bg-white p-5 shadow-2xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ServiceDetails({ slug, name, title, images, price }: ServiceDetailsProps) {
  const [modal, setModal] = useState<ModalName>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const gallery = Array.from({ length: 3 }, (_, index) => images[index % images.length]);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModal("accepted");
  }

  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-[1160px]">
            <Link href={`/services/${slug}`} aria-label={`Back to ${name} services`} className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-[#313131] transition hover:border-[#2877bb] hover:text-[#2877bb] sm:top-3">
              <ArrowLeft className="size-5" />
            </Link>
            <div className="px-12 text-center">
              <h1 className="text-3xl font-bold text-[#343b40] sm:text-4xl">Service Details</h1>
              <p className="mt-3 text-sm text-[#667078] sm:text-base">Everything you need to know before booking this professional service.</p>
            </div>
          </div>

          <article className="mx-auto mt-12 grid max-w-[1160px] gap-6 rounded-xl border border-[#8ebce8] p-3 lg:grid-cols-[390px_1fr]">
            <div className="grid grid-cols-3 gap-2">
              <div className="relative col-span-3 h-[280px] overflow-hidden rounded-lg">
                <Image src={gallery[0]} alt={`${name} service`} fill priority sizes="390px" className="object-cover" />
              </div>
              {gallery.map((image, index) => (
                <div key={`${image}-${index}`} className="relative h-[105px] overflow-hidden rounded-md">
                  <Image src={image} alt={`${name} service preview ${index + 1}`} fill sizes="130px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="relative flex min-w-0 flex-col p-2 sm:p-3">
              <button type="button" onClick={() => setBookmarked((value) => !value)} aria-label={bookmarked ? "Remove bookmark" : "Bookmark service"} className="absolute right-1 top-1 text-[#2877bb]">
                <Bookmark className={`size-6 ${bookmarked ? "fill-current" : ""}`} />
              </button>
              <h2 className="pr-10 text-3xl font-medium text-black">{title}</h2>
              <div className="mt-5 flex items-center gap-3">
                <Image src="/images/customer-rikan-bhart.jpg" alt="Priyanka Rs" width={44} height={44} className="size-11 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-medium">Owned by Priyanka Rs</h3>
                  <p className="flex items-center gap-1 text-sm text-[#626b76]"><Star className="size-4 fill-[#ffb000] text-[#ffb000]" />4.8</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm"><span className="grid size-7 place-items-center rounded bg-[#ff914d] text-white"><MapPin className="size-4" /></span>Adeola Odeku Street, Victoria Island, Lagos, Nigeria.</p>
              <p className="mt-3 flex items-center gap-2"><span className="grid size-7 place-items-center rounded bg-[#ff914d] text-white"><Tag className="size-4" /></span><strong>${price}</strong><span className="text-sm">/hour</span></p>

              <div className="mt-7">
                <h3 className="text-lg font-medium">About Service</h3>
                <p className="mt-2 max-w-[650px] text-base leading-6 text-[#404040]">
                  Get dependable {name.toLowerCase()} support from an experienced professional. The service includes careful assessment, quality workmanship, clear communication, and a clean finish tailored to your home.
                </p>
              </div>
              <button type="button" onClick={() => setModal("booking")} className="mt-auto flex h-12 items-center justify-center rounded-full bg-[#2d76b9] text-lg font-medium text-white transition hover:bg-[#205f96] lg:mt-8">
                Book Now
              </button>
            </div>
          </article>
        </div>
      </section>

      {modal === "booking" && (
        <ModalShell label="Book service" onClose={() => setModal(null)}>
          <form onSubmit={submitBooking}>
            <div className="rounded bg-gradient-to-r from-[#2e7bc1] to-[#9a684b] px-6 py-10 text-center text-white">
              <p className="text-xl">Total amount</p>
              <strong className="mt-1 block text-4xl">${price * 5}</strong>
            </div>
            <h2 className="mt-3 text-base font-medium">Select Booking Time &amp; Date</h2>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 rounded-full border border-[#ff914d] px-3 py-2 text-xs"><CalendarDays className="size-4" /><input type="date" required className="bg-transparent outline-none" /></label>
              <label className="flex items-center gap-2 rounded-full border border-[#ff914d] px-3 py-2 text-xs"><Clock3 className="size-4" /><input type="time" required className="bg-transparent outline-none" /></label>
            </div>
            <label className="mt-4 flex h-10 items-center gap-2 bg-[#edf8ff] px-3 text-sm"><MapPin className="size-4" /><input required placeholder="Set Your Location" className="w-full bg-transparent outline-none" /></label>
            <h3 className="mt-4 font-medium">Select Estimated</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="text-xs">Hour<select className="mt-2 h-10 w-full rounded bg-[#ff914d] px-4 text-center text-white"><option>1</option><option>2</option><option>3</option></select></label>
              <label className="text-xs">Time<input type="time" required className="mt-2 h-10 w-full rounded bg-[#ff914d] px-4 text-center text-white" /></label>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button type="submit" className="h-11 rounded-full bg-[#2d76b9] font-medium text-white">Book Now</button>
              <button type="button" onClick={() => setModal(null)} className="h-11 rounded-full border border-[#ff914d] font-medium">Cancel Booking</button>
            </div>
          </form>
        </ModalShell>
      )}

      {modal === "accepted" && (
        <ModalShell label="Booking accepted" onClose={() => setModal(null)}>
          <div className="py-5 text-center">
            <h2 className="mx-auto max-w-[330px] text-2xl leading-tight">Priyanka Rs has accepted your request.</h2>
            <Image src="/images/customer-rikan-bhart.jpg" alt="Priyanka Rs" width={76} height={76} className="mx-auto mt-6 size-[76px] rounded-full object-cover" />
            <p className="mt-4 text-[#777]">View Priyanka&apos;s location or contact!</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setModal("confirm")} className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#2d76b9] text-white"><Navigation className="size-5" />Location</button>
              <a href="mailto:support@codingmice.com" className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#ff914d] text-[#ff7d32]">Contact<MessageCircle className="size-5" /></a>
            </div>
          </div>
        </ModalShell>
      )}

      {modal === "confirm" && (
        <ModalShell label="Confirm service start" onClose={() => setModal(null)}>
          <div className="py-14 text-center">
            <h2 className="text-3xl">Are you sure?</h2>
            <p className="mx-auto mt-3 max-w-[400px] text-xl leading-6 text-[#747474]">Priyanka is ready to start the service. Are you ready?</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setModal(null)} className="flex h-12 items-center justify-center gap-3 rounded-full border border-[#ff914d] text-lg text-[#ff7d32]">Cancel<X className="size-5" /></button>
              <button type="button" onClick={() => setModal(null)} className="flex h-12 items-center justify-center gap-3 rounded-full bg-[#2d76b9] text-lg text-white"><Check className="size-5" />Accept</button>
            </div>
          </div>
        </ModalShell>
      )}
    </>
  );
}
