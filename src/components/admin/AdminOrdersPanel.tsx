"use client";

import { useState } from "react";
import { Plus, Search, ShoppingBag, Clock, TrendingUp, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { AdminOrder, AdminClient } from "@/app/(admin)/admin/orders/page";

interface Props { orders: AdminOrder[]; clients: AdminClient[] }

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-400", icon: Clock },
  in_progress: { label: "In Progress", cls: "bg-blue-500/15 text-blue-400", icon: TrendingUp },
  review: { label: "Review", cls: "bg-purple-500/15 text-purple-400", icon: Clock },
  completed: { label: "Completed", cls: "bg-emerald-500/15 text-emerald-400", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-red-500/15 text-red-400", icon: AlertCircle },
};

const priorityCls: Record<string, string> = {
  low: "bg-slate-500/15 text-slate-400",
  medium: "bg-amber-500/15 text-amber-400",
  high: "bg-orange-500/15 text-orange-400",
  urgent: "bg-red-500/15 text-red-400",
};

const milestoneStatus: Record<string, string> = {
  pending: "bg-white/10 text-white/30",
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-emerald-500/20 text-emerald-400",
};

export default function AdminOrdersPanel({ orders: initialOrders, clients }: Props) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    client_id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    total_amount: "",
    deadline: "",
    notes: "",
  });

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      (o.profiles?.full_name || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErrorMsg(null); setSuccessMsg(null);
    try {
      const res = await fetch("/api/admin/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, total_amount: parseFloat(form.total_amount) || 0 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");
      setOrders([data.order, ...orders]);
      setSuccessMsg("Order " + data.order.order_number + " created successfully!");
      setShowForm(false);
      setForm({ client_id: "", title: "", description: "", status: "pending", priority: "medium", total_amount: "", deadline: "", notes: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error occurred");
    } finally { setLoading(false); }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch { /* noop */ }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Order Management</h1>
          <p className="text-sm text-white/40 mt-0.5">{orders.length} orders total</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus size={16} /> New Order
        </button>
      </div>

      {(successMsg || errorMsg) && (
        <div className={`px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${successMsg ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
          {successMsg || errorMsg}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Create New Order</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-white/50 mb-1.5">Client *</label>
              <select required value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/50">
                <option value="">Select client...</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name || c.email}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-white/50 mb-1.5">Order Title *</label>
              <input required type="text" placeholder="e.g. AI Chatbot Integration" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-white/50 mb-1.5">Description</label>
              <textarea rows={3} placeholder="Order details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/50">
                {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/50">
                {["low", "medium", "high", "urgent"].map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Total Amount ($)</label>
              <input type="number" min="0" step="0.01" placeholder="0.00" value={form.total_amount} onChange={(e) => setForm({ ...form, total_amount: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm text-white/40 hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={16} />} Create Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", ...Object.keys(statusConfig)].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${statusFilter === s ? "bg-[#F56962] text-white" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"}`}>
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">{filtered.length} Orders</h2>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = sc.icon;
              const isExpanded = expandedId === order.id;
              const completedMilestones = order.order_milestones.filter((m) => m.status === "completed").length;
              const totalMilestones = order.order_milestones.length;
              return (
                <div key={order.id} className="hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-4 px-6 py-4 flex-wrap sm:flex-nowrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-mono text-white/30">{order.order_number}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sc.cls}`}><StatusIcon size={10} className="inline mr-1" />{sc.label}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityCls[order.priority]}`}>{order.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-white/80 truncate">{order.title}</p>
                      <p className="text-xs text-white/30 mt-0.5">{order.profiles?.full_name || "Unknown Client"} • {order.profiles?.email}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-base font-bold text-white">${Number(order.total_amount).toLocaleString()}</div>
                      {totalMilestones > 0 && (
                        <div className="text-xs text-white/30 mt-1">{completedMilestones}/{totalMilestones} milestones</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs bg-white/8 border border-white/10 text-white/60 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#F56962]/50">
                        {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                      {totalMilestones > 0 && (
                        <button onClick={() => setExpandedId(isExpanded ? null : order.id)}
                          className="p-1.5 rounded-lg text-white/30 hover:bg-white/10 hover:text-white/60 transition-colors">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Milestones */}
                  {isExpanded && totalMilestones > 0 && (
                    <div className="px-6 pb-4 space-y-2">
                      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Milestones</p>
                      {[...order.order_milestones].sort((a, b) => a.sort_order - b.sort_order).map((m) => (
                        <div key={m.id} className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${m.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : m.status === "in_progress" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/20"}`}>
                            {m.status === "completed" ? <CheckCircle2 size={12} /> : m.status === "in_progress" ? <TrendingUp size={12} /> : <Clock size={12} />}
                          </span>
                          <span className={`text-sm ${m.status === "completed" ? "text-white/50 line-through" : "text-white/70"}`}>{m.title}</span>
                          <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${milestoneStatus[m.status]}`}>{m.status.replace("_", " ")}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
