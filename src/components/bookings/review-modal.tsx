"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { submitServiceReview } from "@/services/booking-api";
import { getApiErrorMessage } from "@/lib/api-error";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  serviceId?: string;
  providerName?: string;
  providerAvatar?: string;
  onSubmitSuccess?: () => void;
}

export function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  serviceId,
  providerName = "Service Provider",
  providerAvatar = "/images/customer-rikan-bhart.jpg",
  onSubmitSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const mutation = useMutation({
    mutationFn: ({
      rating,
      message,
    }: {
      rating: number;
      message?: string;
    }) =>
      submitServiceReview(bookingId!, {
        rating,
        message,
        serviceId: serviceId!,
      }),
    onSuccess: (result) => {
      toast.success(result.message || "Review submitted successfully.");
      setRating(0);
      setReviewText("");
      if (onSubmitSuccess) onSubmitSuccess();
      onClose();
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to submit review.")),
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }
    if (!bookingId || !serviceId) {
      toast.error("Booking or service details missing. Cannot submit review.");
      return;
    }
    mutation.mutate({ rating, message: reviewText.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="relative my-auto w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-all scale-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex items-center justify-center size-20 rounded-full bg-blue-50">
            <span className="text-4xl animate-bounce">🎉</span>
          </div>

          <h2 className="text-2xl font-bold text-[#101010] mb-1">
            Congratulations!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Payment successful. Thank you!
          </p>

          <p className="text-base font-semibold text-[#101010] mb-4">
            How was your service?
          </p>

          <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl p-5 mb-6 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative size-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src={providerAvatar}
                  alt={providerName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                {providerName}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoveredRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        active
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "fill-none text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="w-full">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write a short review to describe your experience..."
                className="w-full min-h-[100px] resize-none rounded-xl border border-gray-200 p-3.5 text-sm focus:border-[#2674b7] focus:outline-none focus:ring-1 focus:ring-[#2674b7] transition-all"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#2674b7] hover:bg-[#1d64a0] text-white font-medium py-3 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {mutation.isPending ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}