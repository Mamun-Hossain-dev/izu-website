import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative mx-auto min-h-[520px] max-w-[1920px] scroll-mt-20 overflow-hidden sm:aspect-[1920/700] sm:min-h-[460px] sm:max-h-[700px]">
      <Image
        src="/images/hero-construction-worker.jpg"
        alt="Construction professional working in a workshop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container relative flex h-full items-center py-16 sm:py-16">
        <div className="max-w-[620px] text-white">
          <h1 className="text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-4xl lg:text-[38px]">
            Whispers Beyond the Weight of<br className="hidden sm:block" /> Worries: A Journey to Peace Within
          </h1>
          <p className="mt-4 max-w-[600px] text-sm leading-6 text-white/90 sm:text-lg sm:leading-7">
            Personal coaching and wellness guidance to help you navigate life&apos;s complexities with clarity, purpose, and inner peace.
          </p>
          <Link href="#services" className="mt-7 inline-flex items-center gap-3 rounded bg-[#2877bb] px-6 py-3.5 text-sm font-bold transition hover:bg-[#1f639d] sm:px-7 sm:text-base">
            Explore <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
