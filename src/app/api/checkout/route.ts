import { NextRequest, NextResponse } from "next/server";
import { stripe, toCents } from "@/lib/stripe";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

// POST /api/checkout
// Client "Pay Now" button click করলে এই API call হয়
// Stripe Checkout Session তৈরি করে redirect URL return করে
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoice_id } = body;

    if (!invoice_id) {
      return NextResponse.json({ error: "invoice_id আবশ্যক।" }, { status: 400 });
    }

    const supabase = await createAdminSupabaseClient();

    // Invoice টি DB থেকে fetch করো
    const { data: invoice, error: fetchError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoice_id)
      .single();

    if (fetchError || !invoice) {
      return NextResponse.json({ error: "Invoice পাওয়া যায়নি।" }, { status: 404 });
    }

    if (invoice.status === "paid") {
      return NextResponse.json({ error: "এই invoice ইতিমধ্যে পেমেন্ট হয়ে গেছে।" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Stripe Checkout Session তৈরি করো (Stripe v23 — payment_method_types removed)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: invoice.currency || "usd",
            product_data: {
              name: `Invoice ${invoice.invoice_number}`,
              description: invoice.description,
            },
            unit_amount: toCents(Number(invoice.amount)),
          },
          quantity: 1,
        },
      ],
      metadata: {
        invoice_id: invoice.id,
        invoice_number: invoice.invoice_number,
        client_id: invoice.client_id,
      },
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice=${invoice.invoice_number}`,
      cancel_url: `${appUrl}/payment/cancelled?invoice=${invoice.invoice_number}`,
    });

    // Checkout session ID টি invoice-এ save করো (tracking-এর জন্য)
    await supabase
      .from("invoices")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", invoice_id);

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    console.error("Checkout session error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
