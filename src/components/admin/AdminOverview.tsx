"use client";

import {
  DollarSign,
  Users,
  ShoppingBag,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
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
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700", icon: Clock },
  in_progress: { label: "In Progress", cls: "bg-violet-100 text-violet-700", icon: TrendingUp },
  review: { label: "Review", cls: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-slate-100 text-slate-500", icon: AlertCircle },
};

const priorityConfig: Record<string, string> = {
  low: "text-slate-500",
  medium: "text-amber-600 font-medium",
  high: "text-orange-600 font-semibold",
  urgent: "text-red-600 font-bold",
};

const kpis = [
  {
    label: "Total Revenue",
    key: "totalRevenue",
    icon: DollarSign,
    format: "currency",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "+24% this month",
    trendUp: true,
  },
  {
    label: "Total Clients",
    key: "totalClients",
    icon: Users,
    format: "number",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    trend: "Active accounts",
    trendUp: true,
  },
  {
    label: "Active Orders",
    key: "activeOrders",
    icon: ShoppingBag,
    format: "number",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "In pipeline",
    trendUp: true,
  },
  {
    label: "Pending Invoices",
    key: "pendingInvoices",
    icon: FileText,
    format: "number",
    bg: "bg-red-50",
    iconColor: "text-[#F56962]",
    trend: "Awaiting payment",
    trendUp: false,
  },
];

export default function AdminOverview({ stats, revenueData, recentOrders, recentClients }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0C344A] via-[#162742] to-[#2E1A47] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#F56962]" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Agency Admin Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Agency Operations Overview 🚀</h1>
            <p className="text-white/80 text-sm md:text-base">
              You have <span className="font-semibold text-emerald-300">{stats.activeOrders} active orders</span> and{" "}
              <span className="font-semibold text-orange-300">${stats.pendingAmount.toLocaleString()} pending</span> across {stats.totalClients} clients.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/orders"
              className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] !text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow whitespace-nowrap"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>Manage Orders</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, key, icon: Icon, format, bg, iconColor, trend, trendUp }) => {
          const val = stats[key as keyof typeof stats] as number;
          const display = format === "currency" ? `$${val.toLocaleString("en-US", { minimumFractionDigits: 0 })}` : val.toString();
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${trendUp ? "text-emerald-600" : "text-amber-600"}`}>
                  <TrendingUp className="w-3 h-3" />
                  {trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{display}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
              {key === "pendingInvoices" && stats.pendingAmount > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-xs font-medium text-amber-600">
                  ${stats.pendingAmount.toLocaleString()} outstanding
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Grid: Revenue Chart + Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly collected payments (Last 6 months)</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F56962] inline-block" />
              Collected Revenue
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  color: "#0F172A",
                  fontWeight: 600,
                }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#F56962" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Clients</h2>
            <a href="/admin/clients" className="text-xs font-semibold text-violet-600 hover:underline">
              View all
            </a>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {recentClients.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                <Users className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs text-slate-400">No registered clients yet</p>
              </div>
            ) : (
              recentClients.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6347FB] to-[#F56962] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                    {(c.full_name || c.email || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.full_name || "Client"}</p>
                    <p className="text-xs text-slate-400 truncate">{c.email}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 flex-shrink-0">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest project orders across all clients</p>
          </div>
          <a href="/admin/orders" className="text-xs font-semibold text-violet-600 hover:underline flex items-center gap-1">
            View all orders <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="py-12 text-center">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No orders yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = sc.icon;
              return (
                <div
                  key={order.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors flex-wrap sm:flex-nowrap"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{order.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 font-mono">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">
                        Priority: <span className={priorityConfig[order.priority]}>{order.priority.toUpperCase()}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.cls}`}>
                    <StatusIcon size={12} />
                    {sc.label}
                  </span>
                  <span className="text-base font-bold text-slate-900 flex-shrink-0">
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
