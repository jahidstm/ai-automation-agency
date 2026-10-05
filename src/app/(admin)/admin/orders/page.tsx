import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminOrdersPanel from "@/components/admin/AdminOrdersPanel";

export const metadata: Metadata = { title: "Order Management" };

export default async function AdminOrdersPage() {
  const supabase = await createAdminSupabaseClient();

  const [{ data: orders }, { data: clients }] = await Promise.all([
    supabase.from("orders").select(`
      *,
      profiles:client_id (full_name, email),
      order_milestones (id, title, status, sort_order)
    `).order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name, email").eq("role", "client").order("full_name"),
  ]);

  return <AdminOrdersPanel orders={(orders as AdminOrder[]) || []} clients={(clients as AdminClient[]) || []} />;
}

export interface AdminClient {
  id: string;
  full_name: string;
  email: string;
}

export interface OrderMilestone {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  sort_order: number;
}

export interface AdminOrder {
  id: string;
  order_number: string;
  client_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  total_amount: number;
  deadline: string | null;
  notes: string | null;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
  order_milestones: OrderMilestone[];
}
