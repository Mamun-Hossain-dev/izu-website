"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

type UserMenuProps = {
  variant?: "desktop" | "mobile";
};

const FALLBACK_AVATAR = "/images/customer-rikan-bhart.jpg";

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5008/api/v1";

const fetchProfile = async (accessToken: string) => {
  const response = await fetch(`${getApiBaseUrl()}/profile`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve your profile.");
  }

  const payload: { data: { name?: string; profileImage?: string } } =
    await response.json();
  return payload.data;
};

export function UserMenu({ variant = "desktop" }: UserMenuProps) {
  const user = useAuthStore((state) => state.user);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.userId],
    queryFn: () => fetchProfile(user!.accessToken),
    enabled: !!user,
    staleTime: 1000 * 60 * 2,
  });

  const avatar = profile?.profileImage || FALLBACK_AVATAR;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt="My profile"
          className="size-7 rounded-full object-cover"
        />
        My Profile
      </Link>
    );
  }

  return (
    <Link
      href="/my-profile"
      aria-label="My profile"
      title="My profile"
      className="grid size-9 place-items-center rounded-full text-[#2674b7] transition hover:bg-[#eff7fd]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt="My profile"
        className="size-9 rounded-full object-cover"
      />
    </Link>
  );
}