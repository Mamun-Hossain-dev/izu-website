"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setPending(false);
    if (result?.error) setError("Email or password is incorrect.");
    else window.location.assign("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthField
        id="email"
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        required
      />
      <AuthField
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="current-password"
        required
      />
      <div className="flex items-center justify-between gap-3 text-xs">
        <label className="flex items-center gap-2 text-[#52616a]">
          <input
            type="checkbox"
            name="remember"
            className="size-3.5 accent-[#2875bb]"
          />
          Remember Me
        </label>
        <Link href="/forgot-password" className="font-medium text-[#176bb3] hover:underline">
          Forgot Password?
        </Link>
      </div>
      {error ? <p role="alert" className="text-xs font-medium text-red-600">{error}</p> : null}
      <AuthSubmitButton pending={pending}>Sign In</AuthSubmitButton>
    </form>
  );
}
