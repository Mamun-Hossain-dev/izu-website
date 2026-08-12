"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function ForgotPasswordForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    router.push(`/verify-otp?email=${encodeURIComponent(String(email))}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthField
        id="email"
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        required
      />
      <AuthSubmitButton>Send OTP</AuthSubmitButton>
    </form>
  );
}

export function ChangePasswordForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (form.get("password") !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    router.push("/login?password=changed");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthField
        id="password"
        name="password"
        label="Create New Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="new-password"
        minLength={8}
        required
      />
      <AuthField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Re-Enter Password..."
        autoComplete="new-password"
        minLength={8}
        required
      />
      {error ? <p role="alert" className="text-xs font-medium text-red-600">{error}</p> : null}
      <AuthSubmitButton>Verify</AuthSubmitButton>
    </form>
  );
}
