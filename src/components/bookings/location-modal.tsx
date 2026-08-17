"use client";

import React from "react";
import { X, MapPin, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: string;
  providerName?: string;
}

export function LocationModal({
  isOpen,
  onClose,
  address = "13th Street. 47 W 13th St, New York, NY 10011",
  providerName = "Priyanka Rs",
}: LocationModalProps) {
  if (!isOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!");
  };

  const openGoogleMaps = () => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl transition-all scale-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2674b7]">
            <MapPin className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#101010]">Service Location</h2>
            <p className="text-xs text-gray-500">Provider: {providerName}</p>
          </div>
        </div>

        {/* Map Preview Placeholder Visual */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-gray-200 mb-4 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          <div className="relative z-10 flex flex-col items-center p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/80 shadow-lg text-center max-w-[85%]">
            <MapPin className="size-8 text-[#2674b7] animate-bounce mb-1" />
            <p className="font-semibold text-xs text-gray-900">{address}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200/60 mb-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPin className="size-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-700 truncate">{address}</span>
          </div>
          <button
            onClick={copyAddress}
            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors shrink-0"
            title="Copy address"
          >
            <Copy className="size-4" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 text-sm"
          >
            Close
          </button>
          <button
            onClick={openGoogleMaps}
            className="flex-1 bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-2.5 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2"
          >
            <ExternalLink className="size-4" />
            Open Maps
          </button>
        </div>
      </div>
    </div>
  );
}
