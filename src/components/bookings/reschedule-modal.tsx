"use client";

import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  currentDate?: string;
  currentTime?: string;
  onRescheduleSuccess?: (newDate: string, newTime: string) => void;
}

export function RescheduleModal({
  isOpen,
  onClose,
  currentDate = "12 July 2025",
  currentTime = "10:00 AM",
  onRescheduleSuccess,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("2025-07-15");
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      toast.success(`Booking rescheduled to ${formattedDate} at ${selectedTime}!`);
      if (onRescheduleSuccess) {
        onRescheduleSuccess(formattedDate, selectedTime);
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl transition-all scale-in-95 duration-200"
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
              disabled={isSubmitting}
              className="flex-1 bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-2.5 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Confirm Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
