import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminMessagesPanel, { ClientOption } from "@/components/admin/AdminMessagesPanel";

export const metadata: Metadata = { title: "Admin Messages & Support" };

export default async function AdminMessagesPage() {
  const supabase = await createAdminSupabaseClient();

  const [{ data: clientsRaw }, { data: authData }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("role", "client")
      .order("full_name"),
    supabase.auth.admin.listUsers(),
  ]);

  const emailMap = new Map((authData?.users || []).map((u) => [u.id, u.email || ""]));

  const clients: ClientOption[] = (clientsRaw || []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    email: emailMap.get(c.id) || "",
  }));

  return <AdminMessagesPanel initialClients={clients} />;
}
