import { AuthCard } from "@/components/auth/auth-card";
import { ChangePasswordForm } from "@/components/auth/password-recovery-forms";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reset Password | Workyapa" };

export default function ChangePasswordPage() {
  return (
    <AuthCard title="Change Password" description="Enter your details to recover your password.">
      <ChangePasswordForm />
    </AuthCard>
  );
}
