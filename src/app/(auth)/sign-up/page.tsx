import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Create Account | Workyapa" };

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create Your Account"
      description="Connect families with trusted care today."
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-[#176bb3] hover:underline">Log In</Link></>}
    >
      <SignUpForm />
    </AuthCard>
  );
}
