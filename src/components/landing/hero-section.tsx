import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative mx-auto aspect-[1920/700] min-h-[500px] max-h-[700px] max-w-[1920px] scroll-mt-20 overflow-hidden">
      <Image
        src="/images/hero-construction-worker.jpg"
        alt="Construction professional working in a workshop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container relative flex h-full items-center py-16">
        <div className="max-w-[620px] text-white">
          <h1 className="text-4xl font-extrabold leading-[1.4] tracking-[-0.02em] lg:text-[38px]">
            Whispers Beyond the Weight of<br className="hidden sm:block" /> Worries: A Journey to Peace Within
          </h1>
          <p className="mt-3 max-w-[600px] text-base leading-7 text-white/90 sm:text-lg">
            Personal coaching and wellness guidance to help you navigate life&apos;s complexities with clarity, purpose, and inner peace.
          </p>
          <Link href="#services" className="mt-7 inline-flex items-center gap-4 rounded bg-[#2877bb] px-7 py-3.5 text-base font-bold transition hover:bg-[#1f639d]">
            Explore <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
