import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, description, amount, currency, due_date, notes } = body;

    if (!client_id || !description || !amount) {
      return NextResponse.json({ error: "client_id, description, and amount are required" }, { status: 400 });
    }

    const supabase = await createAdminSupabaseClient();

    // Generate invoice number
    const { count } = await supabase.from("invoices").select("*", { count: "exact", head: true });
    const invNum = String((count || 0) + 1).padStart(3, "0");
    const year = new Date().getFullYear();
    const invoice_number = `INV-${year}-${invNum}`;

    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number,
        client_id,
        description,
        amount: parseFloat(amount),
        currency: currency || "usd",
        status: "unpaid",
        due_date: due_date || null,
        notes: notes || null,
      })
      .select(`*, profiles:client_id (full_name, email)`)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
