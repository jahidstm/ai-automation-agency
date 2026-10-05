import type { Metadata } from "next";
import { createAdminSupabaseClient } from "@/lib/supabase-server";
import AdminBlogPanel from "@/components/admin/AdminBlogPanel";

export const metadata: Metadata = { title: "Blog & CMS" };

export default async function AdminBlogPage() {
  const supabase = await createAdminSupabaseClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, status, tags, published_at, created_at")
    .order("created_at", { ascending: false });

  return <AdminBlogPanel posts={(posts as BlogPost[]) || []} />;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: "draft" | "published" | "archived";
  tags: string[];
  published_at: string | null;
  created_at: string;
}
