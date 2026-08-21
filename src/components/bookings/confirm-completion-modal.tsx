"use client";

import React from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";

interface ConfirmCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  providerName?: string;
  providerAvatar?: string;
}

export function ConfirmCompletionModal({
  isOpen,
  onClose,
  onConfirm,
  providerName = "Provider",
  providerAvatar = "/images/customer-rikan-bhart.jpg",
}: ConfirmCompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="relative my-auto w-full max-w-[440px] bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-all scale-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-[#101010] mb-3">
          Are you sure?
        </h2>
        <p className="text-[#475569] text-base mb-6">
          {providerName} wants to complete the service!
        </p>

        <div className="relative mx-auto size-24 rounded-full overflow-hidden border-[4px] border-white shadow-md mb-8">
          <Image
            src={providerAvatar}
            alt={providerName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full border border-[#f97316] font-semibold text-[#f97316] hover:bg-orange-50 transition-colors"
          >
            Cancel
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-[#2674b7] font-semibold text-white hover:bg-[#1d64a0] transition-colors shadow-md"
          >
            <Check className="size-5" />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
