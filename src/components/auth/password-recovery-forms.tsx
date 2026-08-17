"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/schemas/auth";
import { getFieldErrors } from "@/lib/zod-form";
import { forgotPassword, resetPassword } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (value: string) => forgotPassword({ email: value }),
    onSuccess: (result, value) => {
      toast.success(result.message || "OTP sent to your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(value)}`);
    },
    onError: (err) =>
      toast.error(getApiErrorMessage(err, "Unable to send the OTP. Please try again.")),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = getFieldErrors(forgotPasswordSchema, { email });
    if (Object.keys(fieldErrors).length > 0) {
      setError(fieldErrors.email ?? "");
      return;
    }
    setError("");
    mutation.mutate(email);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <AuthField
        id="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError("");
        }}
        error={error}
      />
      <AuthSubmitButton pending={mutation.isPending}>Send OTP</AuthSubmitButton>
    </form>
  );
}

export function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const otp = searchParams.get("otp") ?? "";
  const [values, setValues] = useState<ResetPasswordValues>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordValues & { email: string; otp: string }) =>
      resetPassword(payload),
    onSuccess: (result) => {
      toast.success(result.message || "Password reset successfully. Please sign in.");
      router.replace("/login");
    },
    onError: (err) =>
      toast.error(getApiErrorMessage(err, "Unable to reset your password. Please try again.")),
  });

  function update(field: keyof ResetPasswordValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !otp) {
      toast.error("Missing email or verification code. Please start the recovery again.");
      router.replace("/forgot-password");
      return;
    }

    const fieldErrors = getFieldErrors(resetPasswordSchema, values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate({ ...values, email, otp });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <AuthField
        id="password"
        label="Create New Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="new-password"
        required
        value={values.newPassword}
        onChange={(event) => update("newPassword", event.target.value)}
        error={errors.newPassword}
      />
      <AuthField
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Re-Enter Password..."
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        onChange={(event) => update("confirmPassword", event.target.value)}
        error={errors.confirmPassword}
      />
      <AuthSubmitButton pending={mutation.isPending}>Verify</AuthSubmitButton>
    </form>
  );
}