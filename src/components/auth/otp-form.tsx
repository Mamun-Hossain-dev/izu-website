"use client";

import { AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { getApiErrorMessage } from "@/lib/api-error";
import { forgotPassword, verifyOtp } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const OTP_LENGTH = 6;

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(59);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => verifyOtp({ email, otp }),
    onSuccess: (result, otp) => {
      toast.success(result.message || "OTP verified successfully.");
      router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
    },
    onError: (error) => {
      setFormError("");
      toast.error(getApiErrorMessage(error, "Invalid or expired OTP. Please try again."));
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => forgotPassword({ email }),
    onSuccess: (result) => {
      setDigits(Array(OTP_LENGTH).fill(""));
      setFormError("");
      setSeconds(59);
      toast.success(result.message || "A new OTP has been sent to your email.");
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to resend the OTP. Please try again.")),
  });

  function updateDigit(index: number, value: string) {
    setFormError("");
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item));
    if (digit && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    event.preventDefault();
    setDigits(Array.from({ length: OTP_LENGTH }, (_, index) => pasted[index] ?? ""));
    setFormError("");
    inputs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      toast.error("Missing email address. Please start the recovery again.");
      router.replace("/forgot-password");
      return;
    }
    if (!digits.every(Boolean)) {
      setFormError("Please enter the complete 6-digit code.");
      return;
    }

    verifyMutation.mutate(digits.join(""));
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => { inputs.current[index] = element; }}
            value={digit}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
            aria-invalid={formError ? true : undefined}
            className={`aspect-square min-w-0 flex-1 rounded border bg-transparent text-center text-lg font-semibold text-[#2875bb] outline-none focus:ring-2 ${
              formError
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/15"
                : "border-[#c9d6dd] focus:border-[#2875bb] focus:ring-[#2875bb]/15"
            }`}
          />
        ))}
      </div>
      {formError ? (
        <p role="alert" className="text-xs font-medium text-red-600">
          {formError}
        </p>
      ) : null}
      <div className="flex items-center justify-between text-xs text-[#68747d]">
        <span aria-live="polite">◷ 00:{String(seconds).padStart(2, "0")}</span>
        <span>
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            disabled={seconds > 0 || resendMutation.isPending}
            onClick={() => {
              if (!email) {
                toast.error("Missing email address. Please start the recovery again.");
                router.replace("/forgot-password");
                return;
              }
              resendMutation.mutate();
            }}
            className="font-semibold text-[#176bb3] hover:underline disabled:cursor-not-allowed disabled:text-[#8da5b5]"
          >
            {resendMutation.isPending ? "Sending..." : "Resend"}
          </button>
        </span>
      </div>
      <AuthSubmitButton pending={verifyMutation.isPending}>Verify</AuthSubmitButton>
    </form>
  );
}
