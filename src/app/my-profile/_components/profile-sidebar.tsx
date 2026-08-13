"use client";

import { ChevronRight, LockKeyhole, LogOut, Pencil, SquarePen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Edit Profile", href: "/my-profile", icon: SquarePen },
  {
    label: "Change Password",
    href: "/change-password",
    icon: LockKeyhole,
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const name = session?.user?.name || "Madina Lata";
  const email = session?.user?.email || "bessieedwards@gmail.com";
  const avatar = session?.user?.image || "/images/customer-rikan-bhart.jpg";

  return (
    <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="h-24 bg-[#69abe0] sm:h-28" />
      <div className="relative px-4 pb-4">
        <div className="relative mx-auto -mt-14 size-24 rounded-full border-4 border-white bg-slate-100 shadow-sm">
          <Image
            src={avatar}
            alt={`${name}'s profile`}
            fill
            sizes="96px"
            className="rounded-full object-cover"
          />
          <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-2 border-white bg-[#2a73b5] text-white">
            <Pencil className="size-3.5" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-lg font-semibold text-[#2674b7]">{name}</h2>
          <p className="break-all text-xs text-slate-500">{email}</p>
        </div>

        <nav aria-label="Profile navigation" className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 items-center gap-3 px-1 text-sm font-medium transition hover:text-[#2674b7] ${
                  active ? "text-[#2674b7]" : "text-slate-900"
                }`}
              >
                <Icon className="size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                <span>{label}</span>
                <ChevronRight className="ml-auto size-4" aria-hidden="true" />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex min-h-12 w-full items-center gap-3 px-1 text-left text-sm font-medium text-slate-900 transition hover:text-[#2674b7]"
          >
            <LogOut className="size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <span>Log Out</span>
            <ChevronRight className="ml-auto size-4" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
