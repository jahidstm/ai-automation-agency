"use client";

import { useState } from "react";
import { Plus, Search, ShoppingBag, Clock, TrendingUp, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { AdminOrder, AdminClient } from "@/app/(admin)/admin/orders/page";

interface Props {
  orders: AdminOrder[];
  clients: AdminClient[];
}

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700", icon: Clock },
  in_progress: { label: "In Progress", cls: "bg-violet-100 text-violet-700", icon: TrendingUp },
  review: { label: "Review", cls: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-slate-100 text-slate-500", icon: AlertCircle },
};

const priorityCls: Record<string, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700 font-semibold",
  high: "bg-orange-100 text-orange-700 font-semibold",
  urgent: "bg-red-100 text-red-700 font-bold",
};

const milestoneStatus: Record<string, string> = {
  pending: "bg-slate-100 text-slate-500",
  in_progress: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
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
      (o.profiles?.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.profiles?.email || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
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
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Order Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all client projects, milestones, and deliverables</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> New Order
        </button>
      </div>

      {(successMsg || errorMsg) && (
        <div
          className={`px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${
            successMsg ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {successMsg || errorMsg}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-900 mb-5">Create New Client Order</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Client *</label>
              <select
                required
                value={form.client_id}
                onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name || c.email} ({c.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Order Title *</label>
              <input
                required
                type="text"
                placeholder="e.g. AI Customer Support Chatbot"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Scope / Description</label>
              <textarea
                rows={3}
                placeholder="Details of deliverables, requirements..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Initial Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {Object.entries(statusConfig).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {["low", "medium", "high", "urgent"].map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Amount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.total_amount}
                onChange={(e) => setForm({ ...form, total_amount: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Deadline</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={16} />} Create Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders by title or client name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", ...Object.keys(statusConfig)].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === s
                  ? "bg-[#F56962] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
              }`}
            >
              {s === "all" ? "All Orders" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">{filtered.length} Orders Listed</h2>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No orders found matching the filter</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = sc.icon;
              const isExpanded = expandedId === order.id;
              const completedMilestones = (order.order_milestones || []).filter((m) => m.status === "completed").length;
              const totalMilestones = (order.order_milestones || []).length;
              return (
                <div key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-4 px-6 py-4.5 flex-wrap sm:flex-nowrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {order.order_number}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.cls}`}>
                          <StatusIcon size={11} className="inline mr-1" />
                          {sc.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-md ${priorityCls[order.priority]}`}>
                          {order.priority}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-slate-900 truncate">{order.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <span className="font-medium text-slate-700">{order.profiles?.full_name || "Client"}</span> ({order.profiles?.email})
                        {order.deadline && <span> • Due: {order.deadline}</span>}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-slate-900">${Number(order.total_amount).toLocaleString()}</div>
                      {totalMilestones > 0 && (
                        <div className="text-xs text-slate-500 mt-1">
                          {completedMilestones}/{totalMilestones} milestones
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
                      >
                        {Object.entries(statusConfig).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                      {totalMilestones > 0 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : order.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Milestones Drawer */}
                  {isExpanded && totalMilestones > 0 && (
                    <div className="px-6 pb-4 pt-2 bg-slate-50/70 border-t border-slate-100 space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Milestones Progress</p>
                      {[...order.order_milestones].sort((a, b) => a.sort_order - b.sort_order).map((m) => (
                        <div key={m.id} className="flex items-center gap-3 py-1">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              m.status === "completed"
                                ? "bg-emerald-100 text-emerald-600"
                                : m.status === "in_progress"
                                ? "bg-violet-100 text-violet-600"
                                : "bg-slate-200 text-slate-400"
                            }`}
                          >
                            {m.status === "completed" ? (
                              <CheckCircle2 size={12} />
                            ) : m.status === "in_progress" ? (
                              <TrendingUp size={12} />
                            ) : (
                              <Clock size={12} />
                            )}
                          </span>
                          <span className={`text-sm ${m.status === "completed" ? "text-slate-400 line-through" : "text-slate-800 font-medium"}`}>
                            {m.title}
                          </span>
                          <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${milestoneStatus[m.status]}`}>
                            {m.status.replace("_", " ")}
                          </span>
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
