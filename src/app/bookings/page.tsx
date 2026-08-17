import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FloatingChatButton } from "@/components/landing/floating-chat-button";
import { BookingContainer } from "@/components/bookings/booking-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking | Workyapa",
  description: "Manage your live, upcoming, completed, and canceled service bookings.",
};

export default function BookingsPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-[#101010] flex flex-col justify-between">
      <LandingHeader active="booking" />
      <div className="flex-1 bg-white">
        <BookingContainer />
      </div>
      <LandingFooter />
      <FloatingChatButton />
    </main>
  );
}
