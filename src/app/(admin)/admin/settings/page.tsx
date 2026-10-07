import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminSettingsPanel from "@/components/admin/AdminSettingsPanel";

export const metadata: Metadata = { title: "Admin Settings" };

export default async function AdminSettingsPage() {
  const supabase = await createAdminSupabaseClient();
  const { data: adminUser } = await supabase.auth.admin.listUsers();
  
  // Find current admin profile
  const adminAccount = adminUser?.users?.find((u) => u.email === "jahidhasan@gmail.com") || adminUser?.users?.[0];

  let adminProfile = null;
  if (adminAccount) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", adminAccount.id)
      .single();
    adminProfile = data;
  }

  return (
    <AdminSettingsPanel
      initialEmail={adminAccount?.email || "jahidhasan@gmail.com"}
      initialName={adminProfile?.full_name || "Jahid Hasan"}
      userId={adminAccount?.id || ""}
    />
  );
}
