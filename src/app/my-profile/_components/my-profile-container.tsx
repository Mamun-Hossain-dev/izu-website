"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ProfileSidebar from "./profile-sidebar";

const inputClassName =
  "h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15";

type Profile = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
};

type UpdateProfileInput = {
  name: string;
  email: string;
  phone: string;
};

const profileQueryKey = ["profile"] as const;
const staticAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODE0MzRhY2M0OGVlODU2MGEwYjM2YSIsImlhdCI6MTc4Njg1NjI3OCwiZXhwIjoxNzg3NDYxMDc4fQ.TnbrIwpTFYJEsO5MoF-DrWMKo0DJXOIQgIoc8W9d2js";

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const fetchProfile = async (): Promise<Profile> => {
  const response = await fetch(`${getApiBaseUrl()}/profile`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${staticAccessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve your profile.");
  }

  const payload: { data: Profile } = await response.json();
  return payload.data;
};

const updateProfile = async (fields: UpdateProfileInput): Promise<Profile> => {
  const formData = new FormData();
  formData.append("name", fields.name);
  formData.append("email", fields.email);
  formData.append("phone", fields.phone);

  const response = await fetch(`${getApiBaseUrl()}/profile`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${staticAccessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || "Unable to update your profile.");
  }

  const payload: { data: Profile } = await response.json();
  return payload.data;
};

const MyProfileContainer = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 2,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKey, data);
      toast.success("Profile updated successfully.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const resetForm = () => {
    setName(profile?.name || "");
    setEmail(profile?.email || "");
    setPhone(profile?.phone || "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ name, email, phone });
  };

  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-12 pt-8 sm:pt-10 lg:pb-20">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">Manage your Profile</p>
        </header>

        <div className="mt-10 grid items-start gap-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-12 sm:p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ProfileSidebar />

          <div className="min-h-[500px] rounded-lg border border-slate-200 bg-[#f8f9fa] p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold text-slate-800">Edit Profile</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your personal information and profile details.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isError && (
                <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  Unable to load your profile. Please refresh and try again.
                </p>
              )}
              <div>
                <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-slate-900">Name</label>
                <input id="profile-name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" className={inputClassName} />
              </div>
              <div>
                <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-slate-900">Email Address</label>
                <input id="profile-email" name="email" type="email" value={email} placeholder="Your email address" disabled autoComplete="email" className={`${inputClassName} cursor-not-allowed bg-slate-100 text-slate-500`} />
                <p className="mt-1 text-xs text-slate-500">Email address cannot be changed.</p>
              </div>
              <div>
                <label htmlFor="profile-phone" className="mb-2 block text-sm font-medium text-slate-900">Phone Number</label>
                <input id="profile-phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +880 1700 000000" autoComplete="tel" className={inputClassName} />
              </div>
              <div className="flex flex-col justify-end gap-3 pt-3 sm:flex-row">
                <button type="button" onClick={resetForm} disabled={mutation.isPending} className="h-10 rounded-full border border-[#2674b7] px-5 text-sm font-medium text-[#2674b7] transition hover:bg-[#eef7fd] disabled:cursor-not-allowed disabled:opacity-60">Cancel</button>
                <button type="submit" disabled={isLoading || mutation.isPending} className="h-10 rounded-full bg-[#2a73b5] px-6 text-sm font-medium text-white transition hover:bg-[#205f96] disabled:cursor-not-allowed disabled:opacity-60">{mutation.isPending ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyProfileContainer;
