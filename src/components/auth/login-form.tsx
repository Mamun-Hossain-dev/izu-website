"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { getApiErrorMessage } from "@/lib/api-error";
import { loginSchema, type LoginValues } from "@/lib/schemas/auth";
import { getFieldErrors } from "@/lib/zod-form";
import { login } from "@/services/auth-api";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (payload: LoginValues) => login(payload),
    onSuccess: (result) => {
      setAuth(result.data);
      toast.success(result.message || "Login successful.");
      router.replace("/");
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to sign in. Please try again.")),
  });

  function update(field: keyof LoginValues, value: string) {
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
    const fieldErrors = getFieldErrors(loginSchema, values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <AuthField
        id="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) => update("email", event.target.value)}
        error={errors.email}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="current-password"
        required
        value={values.password}
        onChange={(event) => update("password", event.target.value)}
        error={errors.password}
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
      <AuthSubmitButton pending={mutation.isPending}>Sign In</AuthSubmitButton>
    </form>
  );
}