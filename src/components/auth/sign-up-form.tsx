"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (form.get("password") !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    router.push(`/verify-otp?email=${encodeURIComponent(String(form.get("email")))}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthField id="name" name="name" label="Your Full Name" placeholder="Write here..." autoComplete="name" required />
      <AuthField id="email" name="email" label="Email Address" type="email" placeholder="Enter your email..." autoComplete="email" required />
      <AuthField id="phone" name="phone" label="Phone Number" type="tel" placeholder="+88-0158*****" autoComplete="tel" required />
      <AuthField id="password" name="password" label="Create New Password" type="password" placeholder="Enter Password..." autoComplete="new-password" minLength={8} required />
      <AuthField id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" placeholder="Enter Password..." autoComplete="new-password" minLength={8} required />
      {error ? <p role="alert" className="text-xs font-medium text-red-600">{error}</p> : null}
      <AuthSubmitButton>Sign up</AuthSubmitButton>
    </form>
  );
}
