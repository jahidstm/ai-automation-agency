"use client";

import { useState } from "react";
import { Plus, Search, BookOpen, Globe, Archive, FileText, Loader2, Tag, Trash2 } from "lucide-react";
import type { BlogPost } from "@/app/(admin)/admin/blog/page";

interface Props { posts: BlogPost[] }

const statusConfig = {
  draft: { label: "Draft", cls: "bg-slate-500/15 text-slate-400", icon: FileText },
  published: { label: "Published", cls: "bg-emerald-500/15 text-emerald-400", icon: Globe },
  archived: { label: "Archived", cls: "bg-white/5 text-white/30", icon: Archive },
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
    setLoading(true); setErrorMsg(null); setSuccessMsg(null);
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
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Blog & Case Studies</h1>
          <p className="text-sm text-white/40 mt-0.5">{posts.length} posts total</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {(["published", "draft", "archived"] as const).map((s) => {
          const count = posts.filter((p) => p.status === s).length;
          const sc = statusConfig[s];
          const Icon = sc.icon;
          return (
            <div key={s} className="bg-white/5 border border-white/8 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${sc.cls} flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{count}</div>
                <div className="text-xs text-white/40">{sc.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {(successMsg || errorMsg) && (
        <div className={`px-4 py-3 rounded-xl text-sm ${successMsg ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
          {successMsg || errorMsg}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Create New Post</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Post Title *</label>
                <input required type="text" placeholder="How AI Saved 40hrs/Week..." value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Slug</label>
                <input type="text" placeholder="auto-generated" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Excerpt</label>
              <textarea rows={2} placeholder="Short summary of the post..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Content (Markdown)</label>
              <textarea rows={8} placeholder="# Your post content here...&#10;&#10;Write in Markdown format..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50 resize-none font-mono" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Tags (comma separated)</label>
                <input type="text" placeholder="AI, Automation, Case Study" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/50">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm text-white/40 hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={16} />} Create Post
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
        </div>
        <div className="flex gap-2">
          {["all", "published", "draft", "archived"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${statusFilter === s ? "bg-[#F56962] text-white" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">{filtered.length} Posts</h2>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((post) => {
              const sc = statusConfig[post.status];
              const StatusIcon = sc.icon;
              return (
                <div key={post.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen size={16} className="text-white/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sc.cls}`}>
                        <StatusIcon size={10} /> {sc.label}
                      </span>
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                          <Tag size={9} /> {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-white/80 truncate">{post.title}</p>
                    {post.excerpt && <p className="text-xs text-white/30 mt-1 line-clamp-1">{post.excerpt}</p>}
                    <p className="text-[11px] text-white/20 mt-1">
                      Created {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {post.published_at && " • Published " + new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
