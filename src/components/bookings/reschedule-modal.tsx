"use client";

import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { rescheduleBooking } from "@/services/booking-api";
import { getApiErrorMessage } from "@/lib/api-error";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  currentDate?: string;
  currentTime?: string;
  onRescheduleSuccess?: () => void;
}

const toDateInputValue = (value: string): string => {
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
};

const to24h = (value: string): string => {
  const match = value.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return value;
  let hours = Number(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

export function RescheduleModal({
  isOpen,
  onClose,
  bookingId,
  currentDate = "12 July 2025",
  currentTime = "10:00 AM",
  onRescheduleSuccess,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    toDateInputValue(currentDate)
  );
  const [selectedTime, setSelectedTime] = useState<string>(currentTime);

  const mutation = useMutation({
    mutationFn: (bookingTime: string) =>
      rescheduleBooking(bookingId!, { bookingTime }),
    onSuccess: (result) => {
      toast.success(result.message || "Booking rescheduled successfully!");
      if (onRescheduleSuccess) onRescheduleSuccess();
      onClose();
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to reschedule booking.")),
  });

  if (!isOpen) return null;

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) {
      toast.error("Booking details are missing. Please try again.");
      return;
    }
    const date = selectedDate || toDateInputValue(currentDate);
    const bookingTime = new Date(`${date}T${to24h(selectedTime)}`).toISOString();
    mutation.mutate(bookingTime);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="relative my-auto w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl transition-all scale-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#101010] flex items-center gap-2">
            <CalendarIcon className="size-5 text-[#2674b7]" />
            Reschedule Booking
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Current schedule: {currentDate} at {currentTime}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select New Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#2674b7] focus:outline-none focus:ring-1 focus:ring-[#2674b7]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1 ${
                    selectedTime === slot
                      ? "bg-[#2674b7] text-white border-[#2674b7] shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Clock className="size-3" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-2.5 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              {mutation.isPending ? "Updating..." : "Confirm Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}