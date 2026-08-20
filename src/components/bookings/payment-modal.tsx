"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayNow: () => void;
  amount?: string;
  isProcessing?: boolean;
}

export function PaymentModal({
  isOpen,
  onClose,
  onPayNow,
  amount = "$550",
  isProcessing = false,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("stripe");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="relative my-auto w-full max-w-[440px] bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-all scale-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[22px] font-bold text-[#101010] mb-4">
          Make payment
        </h2>
        
        <div className="text-[32px] font-bold text-[#101010] mb-6">
          {amount}
        </div>

        <div 
          className="flex items-center justify-between border border-gray-200 rounded-lg p-4 mb-8 cursor-pointer hover:border-[#2674b7] transition-colors"
          onClick={() => setSelectedMethod("stripe")}
        >
          {/* We use a text/span for Stripe if no logo is available, but Image 2 shows Stripe logo. Let's use simple text with color or an SVG if possible */}
          <div className="text-[#635BFF] font-bold text-xl tracking-tighter">
            stripe
          </div>
          <div className="relative flex size-5 items-center justify-center rounded-full border-2 border-[#2674b7]">
            {selectedMethod === "stripe" && (
              <div className="size-2.5 rounded-full bg-[#2674b7]" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full border border-[#f97316] font-semibold text-[#f97316] hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            Cancel
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={onPayNow}
            disabled={isProcessing}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-[#2674b7] font-semibold text-white hover:bg-[#1d64a0] transition-colors shadow-md disabled:opacity-60"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
