"use client";

import { AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { useRouter } from "next/navigation";
import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const OTP_LENGTH = 6;

export function OtpForm() {
  const router = useRouter();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function updateDigit(index: number, value: string) {
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
    inputs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (digits.every(Boolean)) router.push("/change-password");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            required
            aria-label={`OTP digit ${index + 1}`}
            className="aspect-square min-w-0 flex-1 rounded border border-[#c9d6dd] bg-transparent text-center text-lg font-semibold text-[#2875bb] outline-none focus:border-[#2875bb] focus:ring-2 focus:ring-[#2875bb]/15"
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-[#68747d]">
        <span aria-live="polite">◷ 00:{String(seconds).padStart(2, "0")}</span>
        <span>
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            disabled={seconds > 0}
            onClick={() => setSeconds(59)}
            className="font-semibold text-[#176bb3] hover:underline disabled:cursor-not-allowed disabled:text-[#8da5b5]"
          >
            Resend
          </button>
        </span>
      </div>
      <AuthSubmitButton>Verify</AuthSubmitButton>
    </form>
  );
}
