"use client";

import { AuthField, AuthSubmitButton } from "@/components/auth/auth-form-controls";
import { getApiErrorMessage } from "@/lib/api-error";
import { signupSchema, type SignUpValues } from "@/lib/schemas/auth";
import { getFieldErrors } from "@/lib/zod-form";
import { signup } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const accountTypes = [
  { value: "user", label: "I need a service" },
  { value: "provider", label: "I provide a service" },
] as const;

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpValues>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "user",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (payload: SignUpValues) => signup(payload),
    onSuccess: (result) => {
      toast.success(result.message || "Account created successfully. Please sign in.");
      router.replace("/login");
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to create your account. Please try again.")),
  });

  function update(field: keyof SignUpValues, value: string) {
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
    const fieldErrors = getFieldErrors(signupSchema, values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#0961ad]">I am joining as</label>
        <div className="grid grid-cols-2 gap-2">
          {accountTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                setValues((prev) => ({ ...prev, accountType: type.value }));
                if (errors.accountType) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.accountType;
                    return next;
                  });
                }
              }}
              aria-pressed={values.accountType === type.value}
              className={`h-10 rounded-full border px-3 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2875bb] ${
                values.accountType === type.value
                  ? "border-[#2875bb] bg-[#2875bb]/10 text-[#176bb3]"
                  : "border-[#aebbc3] bg-transparent text-[#52616a] hover:border-[#2875bb]"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
        {errors.accountType ? (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.accountType}
          </p>
        ) : null}
      </div>
      <AuthField
        id="name"
        label="Your Full Name"
        placeholder="Write here..."
        autoComplete="name"
        required
        value={values.name}
        onChange={(event) => update("name", event.target.value)}
        error={errors.name}
      />
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
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="+88-0158*****"
        autoComplete="tel"
        required
        value={values.phone}
        onChange={(event) => update("phone", event.target.value)}
        error={errors.phone}
      />
      <AuthField
        id="password"
        label="Create New Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="new-password"
        required
        value={values.password}
        onChange={(event) => update("password", event.target.value)}
        error={errors.password}
      />
      <AuthField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Enter Password..."
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        onChange={(event) => update("confirmPassword", event.target.value)}
        error={errors.confirmPassword}
      />
      <AuthSubmitButton pending={mutation.isPending}>Sign up</AuthSubmitButton>
    </form>
  );
}