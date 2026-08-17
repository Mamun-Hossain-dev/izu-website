"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

type UserMenuProps = {
  variant?: "desktop" | "mobile";
};

export function UserMenu({ variant = "desktop" }: UserMenuProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return variant === "mobile" ? (
      <Link href="/login" className="mt-1 rounded bg-[#2a73b5] px-4 py-3 text-center text-white">
        Sign in
      </Link>
    ) : (
      <Link
        href="/login"
        className="rounded-md bg-[#2a73b5] px-5 py-2 text-base font-medium text-white transition hover:bg-[#205f96]"
      >
        Sign in
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <Link
        href="/my-profile"
        className="mt-1 flex items-center gap-2 rounded bg-[#eff7fd] px-4 py-3 font-bold text-[#2674b7]"
      >
        <CircleUserRound className="size-5" />
        My Profile
      </Link>
    );
  }

  return (
    <Link
      href="/my-profile"
      aria-label="My profile"
      title="My profile"
      className="grid size-9 place-items-center rounded-md text-[#2674b7] transition hover:bg-[#eff7fd]"
    >
      <CircleUserRound className="size-6" />
    </Link>
  );
}