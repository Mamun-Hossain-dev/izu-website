import { axiosInstance } from "@/lib/axios";

export type SignUpPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType: "user" | "provider";
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginData = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  role: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

type SignUpData = {
  userId: string;
  email: string;
  phone: string;
};

type EmailData = {
  email: string;
  otpExpiry?: number;
};

export const signup = (payload: SignUpPayload) =>
  axiosInstance
    .post<ApiResponse<SignUpData>>("/auth/signup", payload)
    .then((response) => response.data);

export const login = (payload: LoginPayload) =>
  axiosInstance
    .post<ApiResponse<LoginData>>("/auth/login", payload)
    .then((response) => response.data);

export const forgotPassword = (payload: ForgotPasswordPayload) =>
  axiosInstance
    .post<ApiResponse<EmailData>>("/auth/forgot-password", payload)
    .then((response) => response.data);

export const verifyOtp = (payload: VerifyOtpPayload) =>
  axiosInstance
    .post<ApiResponse<EmailData>>("/auth/verify-otp", payload)
    .then((response) => response.data);

export const resetPassword = (payload: ResetPasswordPayload) =>
  axiosInstance
    .post<ApiResponse<EmailData>>("/auth/reset-password", payload)
    .then((response) => response.data);
