import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminClientsPanel from "@/components/admin/AdminClientsPanel";

export const metadata: Metadata = { title: "Client Management" };

export default async function AdminClientsPage() {
  const supabase = await createAdminSupabaseClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  // For each client fetch their order count and total invoiced
  const clientsWithStats = await Promise.all(
    (clients || []).map(async (c) => {
      const [{ count: orderCount }, { data: invData }] = await Promise.all([
        supabase.from("orders").select("*", { count: "exact", head: true }).eq("client_id", c.id),
        supabase.from("invoices").select("amount, status").eq("client_id", c.id),
      ]);
      const totalSpent = (invData || []).filter((i) => i.status === "paid").reduce((a, i) => a + Number(i.amount), 0);
      const outstanding = (invData || []).filter((i) => i.status !== "paid" && i.status !== "cancelled").reduce((a, i) => a + Number(i.amount), 0);
      return { ...c, orderCount: orderCount || 0, totalSpent, outstanding };
    })
  );

  return <AdminClientsPanel clients={clientsWithStats} />;
}
