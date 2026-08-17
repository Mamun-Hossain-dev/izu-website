"use client";

import React, { useState } from "react";
import { BookingCard, BookingItem, BookingStatus } from "./booking-card";
import { ReviewModal } from "./review-modal";
import { RescheduleModal } from "./reschedule-modal";
import { LocationModal } from "./location-modal";
import { toast } from "sonner";

const INITIAL_BOOKINGS: BookingItem[] = [
  // Live Bookings
  {
    id: "live-1",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "live",
    orderStatus: "Pending",
    initialTimerSeconds: 3630, // 01h 60m 30s
  },
  // Next Bookings
  {
    id: "next-1",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "next",
    orderStatus: "Pending",
  },
  {
    id: "next-2",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "next",
    orderStatus: "Pending",
  },
  // Completed Bookings
  {
    id: "completed-1",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "completed",
  },
  {
    id: "completed-2",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "completed",
  },
  {
    id: "completed-3",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    amount: "$550",
    status: "completed",
  },
  // Canceled Bookings
  {
    id: "canceled-1",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    status: "canceled",
  },
  {
    id: "canceled-2",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    status: "canceled",
  },
  {
    id: "canceled-3",
    providerName: "Priyanka Rs",
    providerAvatar: "/images/priyanka.png",
    address: "13th Street. 47 W 13th St, New York, NY 10011",
    date: "12 July 2025",
    time: "10:00 AM",
    status: "canceled",
  },
];

export function BookingContainer() {
  const [activeTab, setActiveTab] = useState<BookingStatus>("live");
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);

  // Modal States
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewProviderName, setReviewProviderName] = useState("Madiha Lata");
  const [reviewProviderAvatar, setReviewProviderAvatar] = useState("/images/madiha.png");

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [activeBookingForReschedule, setActiveBookingForReschedule] = useState<BookingItem | null>(null);

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeBookingForLocation, setActiveBookingForLocation] = useState<BookingItem | null>(null);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  // Handlers
  const handleOpenContact = (booking: BookingItem) => {
    setReviewProviderName(booking.providerName || "Madiha Lata");
    setReviewProviderAvatar(booking.providerAvatar || "/images/madiha.png");
    setReviewModalOpen(true);
  };

  const handleOpenReview = (booking: BookingItem) => {
    setReviewProviderName(booking.providerName);
    setReviewProviderAvatar(booking.providerAvatar);
    setReviewModalOpen(true);
  };

  const handleOpenLocation = (booking: BookingItem) => {
    setActiveBookingForLocation(booking);
    setLocationModalOpen(true);
  };

  const handleOpenReschedule = (booking: BookingItem) => {
    setActiveBookingForReschedule(booking);
    setRescheduleModalOpen(true);
  };

  const handleCancelBooking = (booking: BookingItem) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: "canceled" } : b
      )
    );
    toast.info(`Booking with ${booking.providerName} has been canceled.`);
  };

  const handleRescheduleSuccess = (newDate: string, newTime: string) => {
    if (!activeBookingForReschedule) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === activeBookingForReschedule.id
          ? { ...b, date: newDate, time: newTime, status: "next" }
          : b
      )
    );
  };

  const tabs: { key: BookingStatus; label: string }[] = [
    { key: "live", label: "Live" },
    { key: "next", label: "Next" },
    { key: "completed", label: "Completed" },
    { key: "canceled", label: "Canceled" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 sm:py-14">
      {/* Main Page Title & Subtitle */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#101010] mb-2 tracking-tight">
          Booking
        </h1>
        <p className="text-sm sm:text-base text-[#64748b] max-w-xl mx-auto">
          We provide modern, reliable, and scalable digital solutions to help
          businesses grow faster online.
        </p>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
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

      {/* Booking Cards Stack */}
      <div className="space-y-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onOpenLocation={handleOpenLocation}
              onOpenContact={handleOpenContact}
              onOpenReschedule={handleOpenReschedule}
              onCancelBooking={handleCancelBooking}
              onOpenReview={handleOpenReview}
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

      {/* Modals */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        providerName={reviewProviderName}
        providerAvatar={reviewProviderAvatar}
      />

      <RescheduleModal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        bookingId={activeBookingForReschedule?.id || ""}
        currentDate={activeBookingForReschedule?.date}
        currentTime={activeBookingForLocation?.time}
        onRescheduleSuccess={handleRescheduleSuccess}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        address={activeBookingForLocation?.address}
        providerName={activeBookingForLocation?.providerName}
      />
    </div>
  );
}
