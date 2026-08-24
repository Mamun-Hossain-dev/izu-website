"use client";

import React, { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { X } from "lucide-react";
import { createPayment, confirmPayment } from "@/services/payment-api";
import { getApiErrorMessage } from "@/lib/api-error";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  bookingId?: string;
  amount?: string;
}

function PaymentForm({ onClose, onPaymentSuccess }: Pick<PaymentModalProps, "onClose" | "onPaymentSuccess">) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Please check your payment details.");
      setIsProcessing(false);
      return;
    }

    const result = await stripe.confirmPayment({ elements, redirect: "if_required" });
    if (result.error) {
      setError(result.error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      await confirmPayment(result.paymentIntent.id);
      onPaymentSuccess();
    } catch (confirmError) {
      setError(getApiErrorMessage(confirmError, "Unable to verify payment."));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p className="mt-3 text-left text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={onClose} disabled={isProcessing} className="h-12 flex-1 rounded-full border border-[#f97316] font-semibold text-[#f97316] disabled:opacity-50">
          Cancel <X className="ml-1 inline size-5" />
        </button>
        <button type="submit" disabled={!stripe || isProcessing} className="h-12 flex-1 rounded-full bg-[#2674b7] font-semibold text-white disabled:opacity-60">
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess, bookingId, amount = "$0" }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !bookingId) return;
    let cancelled = false;
    setClientSecret("");
    setError("");
    createPayment(bookingId)
      .then(({ clientSecret: secret }) => { if (!cancelled) setClientSecret(secret); })
      .catch((paymentError) => { if (!cancelled) setError(getApiErrorMessage(paymentError, "Unable to start payment.")); });
    return () => { cancelled = true; };
  }, [isOpen, bookingId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative my-auto w-full max-w-[440px] rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
        <h2 className="mb-4 text-[22px] font-bold text-[#101010]">Make payment</h2>
        <div className="mb-6 text-[32px] font-bold text-[#101010]">{amount}</div>
        {!stripePromise && <p className="text-sm text-red-600">Stripe is not configured. Please contact support.</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
            <PaymentForm onClose={onClose} onPaymentSuccess={onPaymentSuccess} />
          </Elements>
        )}
        {!error && stripePromise && !clientSecret && <p className="text-sm text-gray-500">Preparing secure payment…</p>}
      </div>
    </div>
  );
}
