import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-09-30.endive",
  typescript: true,
});

// Helper: amount কে Stripe-compatible cents-এ convert করো
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

// Helper: cents থেকে dollar string
export function fromCents(cents: number): string {
  return (cents / 100).toFixed(2);
}
