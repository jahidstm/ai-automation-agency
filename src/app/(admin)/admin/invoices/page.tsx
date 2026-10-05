import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminInvoicePanel from "@/components/admin/AdminInvoicePanel";

export const metadata: Metadata = { title: "Manage Invoices" };

export default async function AdminInvoicesPage() {
  const supabase = await createAdminSupabaseClient();

  // সকল clients fetch করো (profile table থেকে)
  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("role", "client")
    .order("full_name");

  // সকল invoices fetch করো
  const { data: invoices } = await supabase
    .from("invoices")
    .select(`
      *,
      profiles:client_id (full_name, email)
    `)
    .order("created_at", { ascending: false });

  return (
    <AdminInvoicePanel
      clients={(clients as Client[]) || []}
      invoices={(invoices as AdminInvoice[]) || []}
    />
  );
}

export interface Client {
  id: string;
  full_name: string;
  email: string;
}

export interface AdminInvoice {
  id: string;
  invoice_number: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}
