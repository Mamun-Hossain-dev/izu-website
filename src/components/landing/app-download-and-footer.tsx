import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = ["Home", "Categories", "Service", "Booking", "Contact"];
const services = ["Cleaning", "Plumbing", "Electrical", "View All"];

function StoreButton({ store }: { store: "App Store" | "Google Play" }) {
  const isApple = store === "App Store";
  return (
    <a href="#" className="flex min-w-[178px] items-center gap-3 rounded-md bg-[#2b75b7] px-5 py-3 text-white transition hover:bg-[#205f96]">
      <Image
        src={isApple ? "/images/apple-store-icon.png" : "/images/google-play-icon.png"}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
      <span className="text-left leading-tight">
        <small className="block text-sm text-white/70">{isApple ? "Download on" : "Get it on"}</small>
        <strong className="text-lg font-medium">{store}</strong>
      </span>
    </a>
  );
}

export function AppDownloadAndFooter() {
  return (
    <>
      <section className="bg-[#eff8ff] py-12 sm:py-16">
        <div className="mx-auto grid max-w-[800px] items-center gap-10 px-5 md:grid-cols-[1fr_250px] md:gap-20">
          <div>
            <h2 className="text-4xl font-extrabold leading-[1.4] sm:text-[40px]">
              Reliable Home Services at<br className="hidden sm:block" /> Your Doorstep
            </h2>
            <p className="mt-5 max-w-[540px] text-lg leading-6 text-[#74665e]">
              Book skilled plumbers and cleaning experts in minutes and manage all your home services from one convenient platform
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton store="App Store" />
              <StoreButton store="Google Play" />
            </div>
          </div>
          <div className="relative mx-auto h-[450px] w-[220px]">
            <Image src="/images/workyapa-app-preview.png" alt="Workyapa mobile application preview" fill sizes="220px" className="object-contain object-center" />
          </div>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-20 bg-[#2c76b8] py-10 text-white">
        <div className="container">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr]">
            <div className="self-start">
              <Image src="/images/workyapa-logo.png" alt="Workyapa" width={155} height={50} className="h-auto w-[155px]" />
            </div>
            <div>
              <h3 className="mb-4 font-medium">Quick Links</h3>
              <ul className="space-y-3 text-base">
                {footerLinks.map((item) => <li key={item}><Link href={item === "Home" ? "#home" : `#${item.toLowerCase()}`} className="hover:underline">{item}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Services</h3>
              <ul className="space-y-3 text-base">
                {services.map((item) => <li key={item}><Link href="#services" className="hover:underline">{item}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Contact Us</h3>
              <address className="space-y-4 text-base not-italic">
                <a href="mailto:support@codingmice.com" className="flex items-center gap-2 hover:underline"><Mail className="size-4" />support@codingmice.com</a>
                <a href="tel:+15551234567" className="flex items-center gap-2 hover:underline"><Phone className="size-4" />+1 (555) 123-4567FGHJ</a>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />123 Care Street, ,<br />Wroclaw, Poland</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-white/70 pt-4 text-center text-sm">© 2025 workyapa. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
