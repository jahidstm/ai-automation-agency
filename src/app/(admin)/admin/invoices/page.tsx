import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminInvoicesPanel from "@/components/admin/AdminInvoicesPanel";

export const metadata: Metadata = { title: "Invoice Management" };

export default async function AdminInvoicesPage() {
  const supabase = await createAdminSupabaseClient();

  const [{ data: clientsRaw }, { data: invoicesRaw }, { data: authData }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").eq("role", "client").order("full_name"),
    supabase.from("invoices").select(`
      *,
      profiles:client_id (full_name)
    `).order("created_at", { ascending: false }),
    supabase.auth.admin.listUsers(),
  ]);

  const emailMap = new Map((authData?.users || []).map((u) => [u.id, u.email || ""]));

  const clients: AdminClient[] = (clientsRaw || []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    email: emailMap.get(c.id) || "",
  }));

  const invoices: AdminInvoice[] = (invoicesRaw || []).map((inv: any) => ({
    ...inv,
    profiles: inv.profiles ? {
      full_name: inv.profiles.full_name,
      email: emailMap.get(inv.client_id) || "",
    } : null,
  }));

  return <AdminInvoicesPanel invoices={invoices} clients={clients} />;
}

export interface AdminClient {
  id: string;
  full_name: string;
  email: string;
}

export interface AdminInvoice {
  id: string;
  invoice_number: string;
  client_id: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}
