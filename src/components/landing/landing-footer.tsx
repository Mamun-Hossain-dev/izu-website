import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about-us" },
  { label: "Booking", href: "/#how-it-works" },
  { label: "Contact", href: "/contact-us" },
];

const services = [
  { label: "Cleaning", href: "/services/cleaning" },
  { label: "Plumbing", href: "/services/plumbing" },
  { label: "Electrical", href: "/services/electrical" },
  { label: "View All", href: "/categories" },
];

export function LandingFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-[#2c76b8] py-10 text-white">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr]">
          <div className="self-start">
            <Image src="/images/workyapa-logo.png" alt="Workyapa" width={155} height={50} className="h-auto w-[155px]" />
          </div>
          <div>
            <h3 className="mb-4 font-medium">Quick Links</h3>
            <ul className="space-y-3 text-base">
              {footerLinks.map((item) => <li key={item.label}><Link href={item.href} className="hover:underline">{item.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Services</h3>
            <ul className="space-y-3 text-base">
              {services.map((item) => <li key={item.label}><Link href={item.href} className="hover:underline">{item.label}</Link></li>)}
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
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/70 pt-4 text-sm sm:flex-row">
          <span>© 2025 workyapa. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:underline">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
