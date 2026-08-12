import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/password-recovery-forms";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Forgot Password | Workyapa" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Forgot Password!" description="Enter your email to recover your password.">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
