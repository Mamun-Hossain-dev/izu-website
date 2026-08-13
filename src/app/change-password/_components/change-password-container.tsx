"use client";

import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import ProfileSidebar from "../../my-profile/_components/profile-sidebar";

const rules = [
  { valid: true, label: "Minimum 8–12 characters (recommend 12+ for stronger security)." },
  { valid: true, label: "At least one uppercase letter must." },
  { valid: true, label: "At least one lowercase letter must." },
  { valid: true, label: "At least one number must (0–9)." },
  { valid: false, label: "At least special character (! @ # $ % ^ & * etc.)." },
  { valid: false, label: "No spaces allowed." },
];

function PasswordField({ id, label }: { id: string; label: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-900">{label}</label>
      <div className="relative">
        <input id={id} name={id} type={visible ? "text" : "password"} defaultValue="password" autoComplete={id === "currentPassword" ? "current-password" : "new-password"} className="h-11 w-full rounded border border-slate-300 bg-white px-3 pr-11 text-sm outline-none focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15" />
        <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? `Hide ${label}` : `Show ${label}`} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#2674b7]">
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

const ChangePasswordContainer = () => {
  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-12 pt-8 sm:pt-10 lg:pb-20">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">My Profile</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">Manage your Profile</p>
        </header>

        <div className="mt-10 grid items-start gap-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-12 sm:p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ProfileSidebar />
          <div className="min-h-[500px] rounded-lg border border-slate-200 bg-[#f8f9fa] p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold text-slate-800">Change Password</h2>
            <p className="mt-1 text-sm text-slate-500">Manage your account preferences, security settings, and privacy options.</p>
            <form className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <PasswordField id="currentPassword" label="Current Password" />
                <PasswordField id="newPassword" label="New Password" />
              </div>
              <div className="mt-5"><PasswordField id="confirmPassword" label="Confirm New Password" /></div>
              <ul className="mt-4 space-y-2">
                {rules.map((rule) => (
                  <li key={rule.label} className={`flex items-start gap-2 text-xs sm:text-sm ${rule.valid ? "text-emerald-600" : "text-rose-500"}`}>
                    {rule.valid ? <Check className="mt-0.5 size-4 shrink-0" /> : <X className="mt-0.5 size-4 shrink-0" />}
                    <span>{rule.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <button type="reset" className="h-10 rounded-full border border-[#2674b7] px-5 text-sm font-medium text-[#2674b7] transition hover:bg-[#eef7fd]">Cancel</button>
                <button type="submit" className="h-10 rounded-full bg-[#2a73b5] px-6 text-sm font-medium text-white transition hover:bg-[#205f96]">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePasswordContainer;
