"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Navigation,
  MessageCircleMore,
  XCircle,
  CheckCircle2,
  Clock3,
  Star,
  RotateCcw,
} from "lucide-react";

export type BookingStatus = "live" | "next" | "completed" | "canceled";

export interface BookingItem {
  id: string;
  providerName: string;
  providerAvatar: string;
  address: string;
  date: string;
  time: string;
  amount?: string;
  status: BookingStatus;
  orderStatus?: string;
  initialTimerSeconds?: number;
}

interface BookingCardProps {
  booking: BookingItem;
  onOpenLocation?: (booking: BookingItem) => void;
  onOpenContact?: (booking: BookingItem) => void;
  onOpenReschedule?: (booking: BookingItem) => void;
  onCancelBooking?: (booking: BookingItem) => void;
  onOpenReview?: (booking: BookingItem) => void;
}

export function BookingCard({
  booking,
  onOpenLocation,
  onOpenContact,
  onOpenReschedule,
  onCancelBooking,
  onOpenReview,
}: BookingCardProps) {
  // Live timer state for "live" booking items
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    booking.initialTimerSeconds || 7230 // 01h 60m 30s approx
  );

  useEffect(() => {
    if (booking.status !== "live") return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [booking.status]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#cbd5e1] p-6 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Top Header: Provider Avatar & Name + Status Badge */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
            <Image
              src={booking.providerAvatar}
              alt={booking.providerName}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold text-base text-[#101010]">
            {booking.providerName}
          </h3>
        </div>

        {/* Right Status Badges based on Tab */}
        {booking.status === "next" && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2674b7]">
            <Clock3 className="size-4" />
            <span>Upcoming</span>
          </div>
        )}

        {booking.status === "completed" && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#22c55e]">
            <CheckCircle2 className="size-4" />
            <span>Completed</span>
          </div>
        )}

        {booking.status === "canceled" && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#ef4444]">
            <XCircle className="size-4" />
            <span>Canceled</span>
          </div>
        )}
      </div>

      {/* Timer Section for LIVE status */}
      {booking.status === "live" && (
        <div className="mb-4">
          <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
            {formatTimer(secondsRemaining)}
          </div>
        </div>
      )}

      {/* Meta Information List */}
      <div className="space-y-2.5 text-sm text-[#475569] mb-6">
        {/* Address */}
        <div className="flex items-start gap-2.5">
          <MapPin className="size-4 text-gray-500 shrink-0 mt-0.5" />
          <span>{booking.address}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2.5">
          <Calendar className="size-4 text-gray-500 shrink-0" />
          <span>
            <strong className="font-semibold text-gray-900">Date:</strong>{" "}
            {booking.date}
          </span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2.5">
          <Clock className="size-4 text-gray-500 shrink-0" />
          <span>
            <strong className="font-semibold text-gray-900">Time:</strong>{" "}
            {booking.time}
          </span>
        </div>

        {/* Amount (Live, Next, Completed) */}
        {booking.amount && (
          <div className="flex items-center gap-2.5">
            <DollarSign className="size-4 text-gray-500 shrink-0" />
            <span>
              <strong className="font-semibold text-gray-900">Amount:</strong>{" "}
              {booking.amount}
            </span>
          </div>
        )}

        {/* Status indicator (Live, Next) */}
        {booking.orderStatus && (
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-gray-500 shrink-0" />
            <span>
              <strong className="font-semibold text-gray-900">Status:</strong>{" "}
              <span className="text-[#f97316] font-medium">
                {booking.orderStatus}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      {booking.status === "live" && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => onOpenLocation && onOpenLocation(booking)}
            className="w-full sm:flex-1 bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <Navigation className="size-4 rotate-45" />
            Location
          </button>
          <button
            onClick={() => onOpenContact && onOpenContact(booking)}
            className="w-full sm:flex-1 border border-[#f97316] text-[#f97316] hover:bg-orange-50 font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm"
          >
            Contact
            <MessageCircleMore className="size-4" />
          </button>
        </div>
      )}

      {booking.status === "next" && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => onCancelBooking && onCancelBooking(booking)}
            className="w-full sm:flex-1 border border-[#f97316] text-[#f97316] hover:bg-orange-50 font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span className="text-base font-bold">×</span> Cancel
          </button>
          <button
            onClick={() => onOpenReschedule && onOpenReschedule(booking)}
            className="w-full sm:flex-1 bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            Reschedule
          </button>
        </div>
      )}

      {booking.status === "completed" && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onOpenReview && onOpenReview(booking)}
            className="w-full sm:w-auto bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-2.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <Star className="size-4 fill-white" />
            Write Review
          </button>
        </div>
      )}

      {booking.status === "canceled" && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onOpenReschedule && onOpenReschedule(booking)}
            className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-5 rounded-full transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <RotateCcw className="size-3.5" />
            Re-book Service
          </button>
        </div>
      )}
    </div>
  );
}
