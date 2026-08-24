import { axiosInstance } from "@/lib/axios";

type ApiResponse<T> = { success: boolean; message: string; data: T };
type CreatePaymentResponse = { clientSecret: string; paymentIntentId: string };

export const createPayment = (bookingId: string) =>
  axiosInstance
    .post<ApiResponse<CreatePaymentResponse>>("/payments/create-payment", {
      bookingId,
      paymentType: "booking",
    })
    .then((response) => response.data.data);

export const confirmPayment = (paymentIntentId: string) =>
  axiosInstance
    .post("/payments/confirm-payment", { paymentIntentId })
    .then((response) => response.data);
