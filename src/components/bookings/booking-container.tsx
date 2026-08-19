"use client";

import React, { useState } from "react";
import { BookingCard, BookingItem, BookingStatus } from "./booking-card";
import { ReviewModal } from "./review-modal";
import { RescheduleModal } from "./reschedule-modal";
import { LocationModal } from "./location-modal";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLiveBookings,
  getUpcomingBookings,
  getCompletedBookings,
  getCancelledBookings,
  cancelBooking,
  confirmRequest,
  confirmCompletionRequest,
  type Booking,
} from "@/services/booking-api";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  accepted: "Accepted",
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  "waiting-for-start": "Waiting for provider",
  "awaiting-user-confirmation-for-acceptance": "Confirm to start",
  "awaiting-user-confirmation-for-completion": "Confirm completion",
  completed: "Completed",
  cancelled: "Cancelled",
};

function toBookingItem(booking: Booking, tab: BookingStatus): BookingItem {
  const provider =
    (typeof booking.serviceId?.providerId === "object"
      ? booking.serviceId.providerId
      : null) ||
    (typeof booking.providerId === "object" ? booking.providerId : null);
  const bookingDate = new Date(booking.bookingTime);
  const category = booking.serviceId?.category;
  const validDate = !isNaN(bookingDate.getTime());

  return {
    id: booking._id,
    providerName: provider?.name || "Service Provider",
    providerAvatar:
      provider?.profileImage || "/images/customer-rikan-bhart.jpg",
    address: booking.location?.address || "Location not provided",
    date: validDate
      ? bookingDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—",
    time: validDate
      ? bookingDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "—",
    amount: `$${booking.totalPrice ?? 0}`,
    status: tab,
    orderStatus: STATUS_LABELS[booking.status] || booking.status,
    startTime:
      booking.acceptStartServiceTime ||
      (booking.status === "ongoing" ? booking.bookingTime : undefined),
    serviceId: booking.serviceId?._id,
    serviceTitle:
      booking.serviceId?.serviceDetails?.title || booking.title || "",
    categoryId:
      typeof category === "object" && category
        ? category._id
        : typeof category === "string"
          ? category
          : undefined,
  };
}

function BookingSkeleton() {
  return (
    <div className="space-y-6">
      {[0, 1, 2].map((item) => (
        <div key={item} className="w-full rounded-2xl border border-[#cbd5e1] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="mt-5 space-y-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="mt-6 h-11 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function BookingContainer() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<BookingStatus>("live");

  const [reviewBooking, setReviewBooking] = useState<BookingItem | null>(null);
  const [rescheduleBookingItem, setRescheduleBookingItem] =
    useState<BookingItem | null>(null);
  const [locationBooking, setLocationBooking] = useState<BookingItem | null>(
    null
  );

  const enabled = !!user;
  const liveQuery = useQuery({
    queryKey: ["bookings", "live"],
    queryFn: getLiveBookings,
    enabled,
  });
  const upcomingQuery = useQuery({
    queryKey: ["bookings", "upcoming"],
    queryFn: getUpcomingBookings,
    enabled,
  });
  const completedQuery = useQuery({
    queryKey: ["bookings", "completed"],
    queryFn: getCompletedBookings,
    enabled,
  });
  const cancelledQuery = useQuery({
    queryKey: ["bookings", "cancelled"],
    queryFn: getCancelledBookings,
    enabled,
  });

  const queries: Record<BookingStatus, typeof liveQuery> = {
    live: liveQuery,
    next: upcomingQuery,
    completed: completedQuery,
    canceled: cancelledQuery,
  };

  const activeQuery = queries[activeTab];
  const invalidateBookings = () =>
    queryClient.invalidateQueries({ queryKey: ["bookings"] });

  const cancelMutation = useMutation({
    mutationFn: (bookingId: string) => cancelBooking(bookingId),
    onSuccess: (result) => {
      toast.success(result.message || "Booking cancelled.");
      invalidateBookings();
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to cancel booking.")),
  });

  const confirmStartMutation = useMutation({
    mutationFn: (bookingId: string) => confirmRequest(bookingId),
    onSuccess: (result) => {
      toast.success(result.message || "Booking confirmed and started.");
      invalidateBookings();
    },
    onError: (error) =>
      toast.error(
        getApiErrorMessage(error, "Unable to confirm booking start.")
      ),
  });

  const confirmCompletionMutation = useMutation({
    mutationFn: (bookingId: string) => confirmCompletionRequest(bookingId),
    onSuccess: (result) => {
      toast.success(result.message || "Booking marked as completed.");
      invalidateBookings();
    },
    onError: (error) =>
      toast.error(
        getApiErrorMessage(error, "Unable to confirm booking completion.")
      ),
  });

  const handleOpenContact = () => router.push("/message");

  const handleRebook = (booking: BookingItem) => {
    if (!booking.categoryId || !booking.serviceId) return;
    router.push(`/services/${booking.categoryId}/details/${booking.serviceId}`);
  };

  const tabs: { key: BookingStatus; label: string }[] = [
    { key: "live", label: "Live" },
    { key: "next", label: "Next" },
    { key: "completed", label: "Completed" },
    { key: "canceled", label: "Canceled" },
  ];

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#101010]">Booking</h1>
        <p className="mt-2 max-w-xl text-sm text-[#64748b]">
          Sign in to view and manage your service bookings.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#2674b7] px-8 text-sm font-medium text-white transition hover:bg-[#1d64a0]"
        >
          Sign in to continue
        </Link>
      </div>
    );
  }

  const filteredBookings =
    activeQuery.data?.map((booking) => toBookingItem(booking, activeTab)) || [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 sm:py-14">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#101010] mb-2 tracking-tight">
          Booking
        </h1>
        <p className="text-sm sm:text-base text-[#64748b] max-w-xl mx-auto">
          We provide modern, reliable, and scalable digital solutions to help
          businesses grow faster online.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                isActive
                  ? "bg-[#2674b7] text-white border-[#2674b7] shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {activeQuery.isLoading ? (
          <BookingSkeleton />
        ) : activeQuery.isError ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-red-300">
            <p className="text-red-600 font-medium">
              {getApiErrorMessage(activeQuery.error, "Failed to load bookings.")}
            </p>
            <button
              type="button"
              onClick={() => activeQuery.refetch()}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[#2674b7] px-6 text-sm font-medium text-[#2674b7] transition hover:bg-[#eef7fd]"
            >
              Try again
            </button>
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onOpenLocation={(item) => setLocationBooking(item)}
              onOpenContact={handleOpenContact}
              onOpenReschedule={(item) => setRescheduleBookingItem(item)}
              onCancelBooking={(item) => cancelMutation.mutate(item.id)}
              onOpenReview={(item) => setReviewBooking(item)}
              onConfirmStart={(item) => confirmStartMutation.mutate(item.id)}
              onConfirmCompletion={(item) =>
                confirmCompletionMutation.mutate(item.id)
              }
              onRebook={handleRebook}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">
              No {activeTab} bookings found.
            </p>
          </div>
        )}
      </div>

      <ReviewModal
        isOpen={!!reviewBooking}
        onClose={() => setReviewBooking(null)}
        bookingId={reviewBooking?.id}
        serviceId={reviewBooking?.serviceId}
        providerName={reviewBooking?.providerName}
        providerAvatar={reviewBooking?.providerAvatar}
        onSubmitSuccess={() => invalidateBookings()}
      />

      <RescheduleModal
        isOpen={!!rescheduleBookingItem}
        onClose={() => setRescheduleBookingItem(null)}
        bookingId={rescheduleBookingItem?.id}
        currentDate={rescheduleBookingItem?.date}
        currentTime={rescheduleBookingItem?.time}
        onRescheduleSuccess={() => invalidateBookings()}
      />

      <LocationModal
        isOpen={!!locationBooking}
        onClose={() => setLocationBooking(null)}
        address={locationBooking?.address}
        providerName={locationBooking?.providerName}
      />
    </div>
  );
}