import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, title, description, status, priority, total_amount, deadline, notes } = body;

    if (!client_id || !title) {
      return NextResponse.json({ error: "client_id and title are required" }, { status: 400 });
    }

    const supabase = await createAdminSupabaseClient();

    // Generate order number
    const { count } = await supabase.from("orders").select("*", { count: "exact", head: true });
    const orderNum = String((count || 0) + 1).padStart(3, "0");
    const year = new Date().getFullYear();
    const order_number = `ORD-${year}-${orderNum}`;

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number,
        client_id,
        title,
        description: description || null,
        status: status || "pending",
        priority: priority || "medium",
        total_amount: total_amount || 0,
        deadline: deadline || null,
        notes: notes || null,
      })
      .select(`*, profiles:client_id (full_name, email), order_milestones (*)`)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
