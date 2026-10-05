"use client";

import { DollarSign, Users, ShoppingBag, FileText, MessageSquare, TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  stats: {
    totalRevenue: number;
    totalClients: number;
    activeOrders: number;
    pendingInvoices: number;
    pendingAmount: number;
    weeklyMessages: number;
  };
  revenueData: { month: string; revenue: number }[];
  recentOrders: { id: string; title: string; status: string; priority: string; total_amount: number; created_at: string }[];
  recentClients: { id: string; full_name: string; email: string; created_at: string }[];
}

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-400", icon: Clock },
  in_progress: { label: "In Progress", cls: "bg-blue-500/15 text-blue-400", icon: TrendingUp },
  review: { label: "Review", cls: "bg-purple-500/15 text-purple-400", icon: Clock },
  completed: { label: "Completed", cls: "bg-emerald-500/15 text-emerald-400", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-red-500/15 text-red-400", icon: AlertCircle },
};

const priorityConfig: Record<string, string> = {
  low: "text-slate-400",
  medium: "text-amber-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

const kpis = [
  { label: "Total Revenue", key: "totalRevenue", icon: DollarSign, format: "currency", color: "from-emerald-500 to-teal-600", glow: "shadow-emerald-900/30" },
  { label: "Total Clients", key: "totalClients", icon: Users, format: "number", color: "from-violet-500 to-violet-700", glow: "shadow-violet-900/30" },
  { label: "Active Orders", key: "activeOrders", icon: ShoppingBag, format: "number", color: "from-blue-500 to-blue-700", glow: "shadow-blue-900/30" },
  { label: "Pending Invoices", key: "pendingInvoices", icon: FileText, format: "number", color: "from-[#F56962] to-orange-600", glow: "shadow-orange-900/30" },
];

export default function AdminOverview({ stats, revenueData, recentOrders, recentClients }: Props) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, key, icon: Icon, format, color, glow }) => {
          const val = stats[key as keyof typeof stats] as number;
          const display = format === "currency" ? `$${val.toLocaleString("en-US", { minimumFractionDigits: 0 })}` : val.toString();
          return (
            <div key={key} className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ${glow}`}>
                  <Icon className="w-4.5 h-4.5 text-white" size={18} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{display}</div>
              {key === "pendingInvoices" && stats.pendingAmount > 0 && (
                <p className="text-xs text-white/30 mt-1">${stats.pendingAmount.toLocaleString()} outstanding</p>
              )}
              {key === "weeklyMessages" && (
                <p className="text-xs text-white/30 mt-1">this week</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-white/30 mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F56962] inline-block" />
              Revenue
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#F56962" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Recent Clients</h2>
          <div className="space-y-3">
            {recentClients.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-6">No clients yet</p>
            ) : (
              recentClients.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(c.full_name || c.email || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white/80 truncate">{c.full_name || "No Name"}</p>
                    <p className="text-[11px] text-white/30 truncate">{c.email}</p>
                  </div>
                  <span className="text-[10px] text-white/20 flex-shrink-0">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
          <a href="/admin/orders" className="text-xs text-[#F56962] hover:underline">View all</a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-white/30 text-sm">No orders yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = sc.icon;
              return (
                <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{order.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">
                      Priority: <span className={priorityConfig[order.priority]}>{order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}</span>
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${sc.cls}`}>
                    <StatusIcon size={12} />
                    {sc.label}
                  </span>
                  <span className="text-sm font-semibold text-white/70 flex-shrink-0">
                    ${Number(order.total_amount).toLocaleString()}
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
