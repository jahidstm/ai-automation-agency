import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { order_id, status } = await request.json();
    if (!order_id || !status) {
      return NextResponse.json({ error: "order_id and status required" }, { status: 400 });
    }
    const supabase = await createAdminSupabaseClient();
    const { error } = await supabase.from("orders").update({ status }).eq("id", order_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
