import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import Stripe from "stripe";

// Stripe Webhook handler
// এই route টি Stripe থেকে payment event receive করে DB update করে
// IMPORTANT: এই route-এ body parsing বন্ধ রাখতে হবে (raw body দরকার)
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook signature বা secret নেই।" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Event types handle করো
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const invoice_id = session.metadata?.invoice_id;
      const client_id = session.metadata?.client_id;

      if (!invoice_id || !client_id) {
        console.error("Missing metadata in checkout session:", session.id);
        break;
      }

      // Invoice কে "paid" করো
      const { error: updateError } = await supabase
        .from("invoices")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq("id", invoice_id);

      if (updateError) {
        console.error("Invoice update failed:", updateError);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }

      // Payment transaction log করো
      const { error: paymentError } = await supabase.from("payments").insert({
        invoice_id,
        client_id,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || "usd",
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_charge_id: null,
        status: "succeeded",
        metadata: {
          checkout_session_id: session.id,
          customer_email: session.customer_details?.email,
        },
      });

      if (paymentError) {
        console.error("Payment log failed:", paymentError);
        // Invoice update সফল হয়েছে, payment log fail হলে just warn করো
      }

      console.log(`Invoice ${invoice_id} marked as paid via Stripe.`);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn("Payment failed:", paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
