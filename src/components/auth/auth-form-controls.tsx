"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function AuthField({ label, id, type = "text", ...props }: AuthFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#0961ad]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          className="h-11 w-full rounded-full border border-[#aebbc3] bg-transparent px-4 text-sm text-[#24343e] outline-none transition placeholder:text-[#b4bdc3] focus:border-[#2875bb] focus:ring-2 focus:ring-[#2875bb]/15"
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute inset-y-0 right-3 flex items-center p-1 text-[#9ba8b0] transition hover:text-[#2875bb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2875bb]"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

type AuthSubmitButtonProps = {
  children: React.ReactNode;
  pending?: boolean;
};

export function AuthSubmitButton({ children, pending }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-10 w-full items-center justify-center rounded-full bg-[#2b78bb] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#216aa9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2875bb] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}
