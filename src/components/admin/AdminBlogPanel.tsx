"use client";

import { useState } from "react";
import { Plus, Search, BookOpen, Globe, Archive, FileText, Loader2, Tag, Trash2 } from "lucide-react";
import type { BlogPost } from "@/app/(admin)/admin/blog/page";

interface Props {
  posts: BlogPost[];
}

const statusConfig = {
  draft: { label: "Draft", cls: "bg-slate-100 text-slate-600", icon: FileText },
  published: { label: "Published", cls: "bg-emerald-100 text-emerald-700", icon: Globe },
  archived: { label: "Archived", cls: "bg-amber-100 text-amber-700", icon: Archive },
};

export default function AdminBlogPanel({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", status: "draft", tags: "" });

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const slug = form.slug || autoSlug(form.title);
      const res = await fetch("/api/admin/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");
      setPosts([data.post, ...posts]);
      setSuccessMsg(`Post "${data.post.title}" created!`);
      setShowForm(false);
      setForm({ title: "", slug: "", excerpt: "", content: "", status: "draft", tags: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Blog & Case Studies CMS</h1>
          <p className="text-sm text-slate-500 mt-1">Publish marketing articles, client case studies, and SEO content</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(["published", "draft", "archived"] as const).map((s) => {
          const count = posts.filter((p) => p.status === s).length;
          const sc = statusConfig[s];
          const Icon = sc.icon;
          return (
            <div key={s} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${sc.cls} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-xs text-slate-500 mt-0.5">{sc.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {(successMsg || errorMsg) && (
        <div
          className={`px-4 py-3 rounded-xl text-sm ${
            successMsg ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {successMsg || errorMsg}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-900 mb-5">Draft New Article</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Title *</label>
              <input
                required
                type="text"
                placeholder="e.g. How We Automated Lead Qualification with n8n"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL Slug (leave blank to auto-generate)</label>
              <input
                type="text"
                placeholder="e.g. how-we-automated-lead-qualification"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Publish Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Excerpt (Short Summary)</label>
              <textarea
                rows={2}
                placeholder="Brief summary for Google search and preview cards..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Content (Markdown supported)</label>
              <textarea
                rows={6}
                placeholder="Write your article body here..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="AI, Automation, Case Study, n8n"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={16} />} Save Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">{filtered.length} Posts</h2>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No blog posts or case studies yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((post) => {
              const sc = statusConfig[post.status as keyof typeof statusConfig] || statusConfig.draft;
              return (
                <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.cls}`}>{sc.label}</span>
                      <span className="text-xs font-mono text-slate-400">/{post.slug}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 truncate">{post.title}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {post.tags.map((t) => (
                          <span key={t} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
