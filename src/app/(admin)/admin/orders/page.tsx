import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminOrdersPanel from "@/components/admin/AdminOrdersPanel";

export const metadata: Metadata = { title: "Order Management" };

export default async function AdminOrdersPage() {
  const supabase = await createAdminSupabaseClient();

  const [{ data: ordersRaw }, { data: clientsRaw }, { data: authData }] = await Promise.all([
    supabase.from("orders").select(`
      *,
      profiles:client_id (full_name),
      order_milestones (id, title, status, sort_order)
    `).order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name").eq("role", "client").order("full_name"),
    supabase.auth.admin.listUsers(),
  ]);

  const emailMap = new Map((authData?.users || []).map((u) => [u.id, u.email || ""]));

  const clients: AdminClient[] = (clientsRaw || []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    email: emailMap.get(c.id) || "",
  }));

  const orders: AdminOrder[] = (ordersRaw || []).map((o: any) => ({
    ...o,
    profiles: o.profiles ? {
      full_name: o.profiles.full_name,
      email: emailMap.get(o.client_id) || "",
    } : null,
  }));

  return <AdminOrdersPanel orders={orders} clients={clients} />;
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
