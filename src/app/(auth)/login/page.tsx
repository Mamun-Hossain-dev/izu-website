import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign In | Workyapa" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Hello!"
      description="Access to manage your account."
      footer={<>Don&apos;t have an account? <Link href="/sign-up" className="font-semibold text-[#176bb3] hover:underline">Sign Up</Link></>}
    >
      <LoginForm />
    </AuthCard>
  );
}
