import { axiosInstance } from "@/lib/axios";

export type BookingLocation = {
  type?: string;
  coordinates?: number[];
  address?: string;
};

export type BookingUser = {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string;
};

export type BookingService = {
  _id: string;
  title?: string;
  serviceDetails?: {
    title?: string;
    perSessionPrice?: number;
    hourlyPrice?: number;
    details?: string;
    isActive?: boolean;
    address?: string;
    serviceThumbnails: string[];
    serviceType: "per session" | "hourly";
  } | null;
  providerId?: BookingUser | string;
  category?: { _id: string; name: string } | string;
};

export type Booking = {
  _id: string;
  userId: BookingUser;
  serviceId: BookingService;
  providerId?: BookingUser | string;
  title?: string;
  bookingTime: string;
  location?: BookingLocation;
  totalPrice: number;
  providerAmount?: number;
  status: string;
  requestSent?: boolean;
  requestAccepted?: boolean;
  acceptStartServiceTime?: string;
  bookingType: "per session" | "hourly";
  estimatedHours?: number;
  extraNote?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBookingPayload = {
  serviceId: string;
  title: string;
  bookingTime: string;
  location: { type: string; coordinates: number[]; address: string };
  estimatedHours: number;
  bookingType: "per session" | "hourly";
  extraNote?: string;
};

export type RescheduleBookingPayload = {
  bookingTime: string;
  estimatedHours?: number;
};

export type SubmitReviewPayload = {
  rating: number;
  message?: string;
  serviceId: string;
};

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export const createBooking = (payload: CreateBookingPayload) =>
  axiosInstance
    .post<ApiResponse<Booking>>("/bookings", payload)
    .then((response) => response.data);

export const getLiveBookings = () =>
  axiosInstance
    .get<ApiResponse<Booking[]>>("/bookings/live")
    .then((response) => response.data.data);

export const getUpcomingBookings = () =>
  axiosInstance
    .get<ApiResponse<Booking[]>>("/bookings/upcoming")
    .then((response) => response.data.data);

export const getCompletedBookings = () =>
  axiosInstance
    .get<ApiResponse<Booking[]>>("/bookings/completed")
    .then((response) => response.data.data);

export const getCancelledBookings = () =>
  axiosInstance
    .get<ApiResponse<Booking[]>>("/bookings/cancelled")
    .then((response) => response.data.data);

export const cancelBooking = (bookingId: string) =>
  axiosInstance
    .patch<ApiResponse<{ _id: string; status: string }>>(
      `/bookings/cancel/${bookingId}`
    )
    .then((response) => response.data);

export const confirmRequest = (bookingId: string) =>
  axiosInstance
    .patch<ApiResponse<Booking>>(`/bookings/confirm/${bookingId}`)
    .then((response) => response.data);

export const confirmCompletionRequest = (bookingId: string) =>
  axiosInstance
    .patch<ApiResponse<Booking>>(`/bookings/confirm-completion/${bookingId}`)
    .then((response) => response.data);

export const rescheduleBooking = (
  bookingId: string,
  payload: RescheduleBookingPayload
) =>
  axiosInstance
    .patch<ApiResponse<Booking>>(`/bookings/reschedule/${bookingId}`, payload)
    .then((response) => response.data);

export const submitServiceReview = (
  bookingId: string,
  payload: SubmitReviewPayload
) =>
  axiosInstance
    .post<ApiResponse<{ serviceId: string; review: unknown }>>(
      `/bookings/review/${bookingId}`,
      payload
    )
    .then((response) => response.data);
