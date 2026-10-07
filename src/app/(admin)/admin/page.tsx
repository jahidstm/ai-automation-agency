import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminOverview from "@/components/admin/AdminOverview";

export const metadata: Metadata = { title: "Dashboard Overview" };

export default async function AdminDashboardPage() {
  const supabase = await createAdminSupabaseClient();

  const [
    { data: clientsRaw },
    { data: invoices },
    { data: orders },
    { data: payments },
    { data: messages },
    { data: authData },
  ] = await Promise.all([
    supabase.from("profiles").select("id, full_name, created_at").eq("role", "client").order("created_at", { ascending: false }),
    supabase.from("invoices").select("id, amount, status, created_at").order("created_at", { ascending: false }),
    supabase.from("orders").select("id, title, status, priority, total_amount, created_at").order("created_at", { ascending: false }),
    supabase.from("payments").select("id, amount, created_at").order("created_at", { ascending: false }),
    supabase.from("messages").select("id, created_at").gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.auth.admin.listUsers(),
  ]);

  const emailMap = new Map((authData?.users || []).map((u) => [u.id, u.email || ""]));
  const clients = (clientsRaw || []).map((c) => ({
    ...c,
    email: emailMap.get(c.id) || "",
  }));

  const stats = {
    totalRevenue: (payments || []).reduce((a, p) => a + Number(p.amount), 0),
    totalClients: clients.length,
    activeOrders: (orders || []).filter((o) => o.status === "in_progress" || o.status === "pending").length,
    pendingInvoices: (invoices || []).filter((i) => i.status === "unpaid" || i.status === "overdue").length,
    pendingAmount: (invoices || []).filter((i) => i.status === "unpaid" || i.status === "overdue").reduce((a, i) => a + Number(i.amount), 0),
    weeklyMessages: (messages || []).length,
  };

  // Monthly revenue breakdown (last 6 months)
  const revenueByMonth: Record<string, number> = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("default", { month: "short" });
    revenueByMonth[key] = 0;
  }
  (payments || []).forEach((p) => {
    const d = new Date(p.created_at);
    const key = d.toLocaleString("default", { month: "short" });
    if (key in revenueByMonth) revenueByMonth[key] += Number(p.amount);
  });
  const revenueData = Object.entries(revenueByMonth).map(([month, revenue]) => ({ month, revenue }));

  return (
    <AdminOverview
      stats={stats}
      revenueData={revenueData}
      recentOrders={(orders || []).slice(0, 5)}
      recentClients={clients.slice(0, 5)}
    />
  );
}
