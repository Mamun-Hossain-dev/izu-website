import { AuthCard } from "@/components/auth/auth-card";
import { OtpForm } from "@/components/auth/otp-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Verify Email | Workyapa" };

export default function VerifyOtpPage() {
  return (
    <AuthCard title="Verify Email" description="Enter OTP to verify your email address.">
      <OtpForm />
    </AuthCard>
  );
}
