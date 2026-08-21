"use client";

import React from "react";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="relative my-auto w-full max-w-[420px] bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-all scale-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-inner">
          <LogOut className="size-8" />
        </div>

        <h2 className="text-2xl font-bold text-[#101010] mb-2">
          Log Out
        </h2>
        <p className="text-[#64748b] text-sm mb-7 leading-relaxed">
          Are you sure you want to log out from your account? You will need to sign in again to manage your bookings.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-red-600 font-semibold text-white hover:bg-red-700 transition-colors shadow-md text-sm"
          >
            <LogOut className="size-4" />
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
