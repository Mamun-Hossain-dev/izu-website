import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/bookings' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Terms & Condition', href: '/terms-and-conditions' },
  { label: 'Privacy & Policy', href: '/privacy-policy' },
  { label: 'About Us', href: '/about-us' },
]

const categoryLinks = [
  { label: 'Cleaning', href: '/services/cleaning' },
  { label: 'Plumbing', href: '/services/plumbing' },
  { label: 'Electrical', href: '/services/electrical' },
  { label: 'Explore more', href: '/categories' },
]

export function LandingFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-[#0d78b8] text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-10 sm:px-10 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr] lg:items-start">
          <div className="flex items-center justify-center lg:justify-start">
            <Image
              src="/images/footer-logo.png"
              alt="Workyapa footer logo"
              width={360}
              height={180}
              className="h-auto w-[210px] sm:w-[250px] lg:w-[300px]"
            />
          </div>

          <div>
            <h3 className="mb-5 text-lg font-medium text-white/90">Quick Links</h3>
            <ul className="space-y-3 text-base text-white/95">
              {quickLinks.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-medium text-white/90">Categories</h3>
            <ul className="space-y-3 text-base text-white/95">
              {categoryLinks.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-medium text-white/90">Contact Us</h3>
            <address className="space-y-4 text-base not-italic text-white/95">
              <a
                href="mailto:support@codingmice.com"
                className="flex items-center gap-2 transition hover:text-white hover:underline"
              >
                <Mail className="size-4 shrink-0" />
                <span className="break-all">support@codingmice.com</span>
              </a>

              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 transition hover:text-white hover:underline"
              >
                <Phone className="size-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </a>

              <p className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 shrink-0" />
                <span>123 Care Street,<br />Wroclaw, Poland</span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-white/60 pt-6 text-center text-sm text-white/90 sm:text-base">
          <span>© 2025 workyapa. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
