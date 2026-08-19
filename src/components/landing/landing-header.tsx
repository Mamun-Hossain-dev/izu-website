import { Menu, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SearchBox } from '@/components/landing/search-box'
import { UserMenu } from '@/components/shared/UserMenu'

const links = [
  { label: 'Home', href: '/#home', key: 'home' },
  { label: 'Categories', href: '/categories', key: 'categories' },
  { label: 'Booking', href: '/bookings', key: 'booking' },
  { label: 'About Us', href: '/about-us', key: 'about' },
  { label: 'Contact', href: '/contact-us', key: 'contact' },
]

export function LandingHeader({ active = 'home' }: { active?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm">
      <div className="container flex h-full items-center justify-between">
        <Link href="/#home" aria-label="Workyapa home">
          <Image
            src="/images/workyapa-logo.png"
            alt="Workyapa"
            width={82}
            height={27}
            className="h-auto w-[82px]"
            priority
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-base md:flex"
        >
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.key === active
                  ? 'font-bold text-[#2674b7]'
                  : 'text-[#171717] transition hover:text-[#2674b7]'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <SearchBox className="hidden w-52 lg:block xl:w-72" />
          <Link
            href="/message"
            aria-label="Contact support"
            className="transition hover:text-[#2674b7]"
          >
            <MessageCircleMore className="size-5" />
          </Link>
          <UserMenu />
        </div>

        <details className="group relative md:hidden">
          <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-md text-[#2674b7] [&::-webkit-details-marker]:hidden">
            <Menu />
          </summary>
          <nav className="absolute right-0 top-12 flex w-64 max-h-[calc(100svh-4rem)] flex-col gap-2 overflow-y-auto rounded-lg border bg-white p-2 shadow-lg">
            <SearchBox className="w-full" />
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.key === active
                    ? 'rounded bg-[#eff7fd] px-4 py-3 font-bold text-[#2674b7]'
                    : 'rounded px-4 py-3 hover:bg-[#eff7fd]'
                }
              >
                {link.label}
              </Link>
            ))}
            <UserMenu variant="mobile" />
          </nav>
        </details>
      </div>
    </header>
  )
}
