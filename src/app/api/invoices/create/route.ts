import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

// POST /api/invoices/create
// Admin-only: একটি নতুন invoice তৈরি করে client-এর জন্য
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, description, amount, currency = "usd", due_date, order_id, notes } = body;

    // Validation
    if (!client_id || !description || !amount) {
      return NextResponse.json(
        { error: "client_id, description, এবং amount আবশ্যক।" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "amount অবশ্যই positive number হতে হবে।" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Unique invoice number generate: INV-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const invoice_number = `INV-${dateStr}-${randomSuffix}`;

    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number,
        client_id,
        description,
        amount,
        currency,
        status: "unpaid",
        due_date: due_date || null,
        order_id: order_id || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Invoice creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
