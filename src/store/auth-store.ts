"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthUser = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  role: string;
};

type AuthState = {
  user: AuthUser | null;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: "izu-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().user?.accessToken;
