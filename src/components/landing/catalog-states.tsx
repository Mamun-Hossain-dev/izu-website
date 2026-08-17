"use client";

import { getApiErrorMessage } from "@/lib/api-error";
import { isAxiosError } from "axios";
import { AlertCircle, Inbox, LogIn, RotateCcw } from "lucide-react";
import Link from "next/link";

export function CatalogError({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry: () => void;
}) {
  const unauthorized = isAxiosError(error) && error.response?.status === 401;

  return (
    <div className="mx-auto mt-12 flex max-w-[420px] flex-col items-center rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
      <AlertCircle className="size-10 text-red-500" />
      <h3 className="mt-4 text-lg font-semibold text-red-700">
        {unauthorized ? "Authentication required" : "Something went wrong"}
      </h3>
      <p className="mt-2 text-sm text-red-600">{getApiErrorMessage(error)}</p>
      {unauthorized ? (
        <Link
          href="/login"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#2d76b9] px-5 text-sm font-medium text-white transition hover:bg-[#205f96]"
        >
          Sign in to continue
          <LogIn className="size-4" />
        </Link>
      ) : (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-[#2d76b9] px-5 text-sm font-medium text-[#2d76b9] transition hover:bg-[#eef7fd]"
        >
          Try again
          <RotateCcw className="size-4" />
        </button>
      )}
    </div>
  );
}

export function CatalogEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mt-12 flex max-w-[420px] flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
      <Inbox className="size-10 text-slate-400" />
      <h3 className="mt-4 text-lg font-semibold text-slate-700">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}