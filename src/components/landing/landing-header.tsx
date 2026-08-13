import { Menu, MessageCircleMore, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Home", href: "/#home", key: "home" },
  { label: "Categories", href: "/categories", key: "categories" },
  { label: "Booking", href: "/#how-it-works", key: "booking" },
  { label: "Contact", href: "/#contact", key: "contact" },
];

export function LandingHeader({ active = "home" }: { active?: string }) {
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

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-base md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.key === active ? "font-bold text-[#2674b7]" : "text-[#171717] transition hover:text-[#2674b7]"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <button type="button" aria-label="Search" className="transition hover:text-[#2674b7]">
            <Search className="size-5" />
          </button>
          <button type="button" aria-label="Messages" className="transition hover:text-[#2674b7]">
            <MessageCircleMore className="size-5" />
          </button>
          <Link href="/login" className="rounded-md bg-[#2a73b5] px-5 py-2 text-base font-medium text-white transition hover:bg-[#205f96]">
            Sign in
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-md text-[#2674b7] [&::-webkit-details-marker]:hidden">
            <Menu />
          </summary>
          <nav className="absolute right-0 top-12 flex w-52 flex-col rounded-lg border bg-white p-2 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.key === active ? "rounded bg-[#eff7fd] px-4 py-3 font-bold text-[#2674b7]" : "rounded px-4 py-3 hover:bg-[#eff7fd]"}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="mt-1 rounded bg-[#2a73b5] px-4 py-3 text-center text-white">Sign in</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
