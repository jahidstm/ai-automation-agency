import type { Metadata } from "next";
import {
  ShoppingBag,
  DollarSign,
  FolderOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

export const metadata: Metadata = { title: "Overview" };

const stats = [
  {
    label: "Active Orders",
    value: "2",
    icon: ShoppingBag,
    trend: "+1 this month",
    trendUp: true,
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Total Spent",
    value: "$3,200",
    icon: DollarSign,
    trend: "Lifetime value",
    trendUp: true,
    bg: "bg-red-50",
    iconColor: "text-[#F56962]",
  },
  {
    label: "Files Delivered",
    value: "14",
    icon: FolderOpen,
    trend: "3 new this week",
    trendUp: true,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Unread Messages",
    value: "3",
    icon: MessageSquare,
    trend: "Reply needed",
    trendUp: false,
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const milestones = [
  { label: "Project Kickoff & Requirements", status: "done", date: "Sep 28" },
  { label: "AI Chatbot Development", status: "done", date: "Oct 1" },
  { label: "Integration & Testing", status: "active", date: "Oct 5" },
  { label: "Client Review & Feedback", status: "pending", date: "Oct 10" },
  { label: "Final Delivery & Documentation", status: "pending", date: "Oct 15" },
];

const recentActivity = [
  { action: "File uploaded", detail: "chatbot_v2_demo.mp4", time: "2h ago", icon: FolderOpen, color: "bg-violet-100 text-violet-600" },
  { action: "Message received", detail: "Update on integration progress", time: "5h ago", icon: MessageSquare, color: "bg-blue-100 text-blue-600" },
  { action: "Milestone completed", detail: "AI Chatbot Development ✓", time: "Oct 1", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
  { action: "Invoice sent", detail: "INV-2024-003 — $1,200", time: "Sep 30", icon: DollarSign, color: "bg-amber-100 text-amber-600" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0C344A] via-[#162742] to-[#2E1A47] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#F56962]" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Client Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Welcome back, Jahid! 👋</h1>
            <p className="text-white/80 text-sm md:text-base">You have 2 active projects and 3 unread messages.</p>
          </div>
          <a
            href="/dashboard/messages"
            className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow whitespace-nowrap"
          >
            View Messages <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${stat.trendUp ? "text-emerald-600" : "text-amber-600"}`}>
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active Order + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Order - Milestone Tracker */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div>
              <h2 className="font-semibold text-slate-900 text-base">Active Order</h2>
              <p className="text-xs text-slate-500 mt-0.5">AI Chatbot Integration — Order #ORD-2024-007</p>
            </div>
            <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">In Progress</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-semibold text-violet-600">40%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-gradient-to-r from-violet-500 to-violet-600 rounded-full" />
            </div>
          </div>

          {/* Milestones */}
          <div className="flex flex-col gap-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="mt-0.5 flex-shrink-0">
                  {m.status === "done" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {m.status === "active" && <AlertCircle className="w-5 h-5 text-violet-500 animate-pulse" />}
                  {m.status === "pending" && <Circle className="w-5 h-5 text-slate-300" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      m.status === "done" ? "text-slate-400 line-through" :
                      m.status === "active" ? "text-slate-900" : "text-slate-400"
                    }`}>{m.label}</span>
                    <span className="text-xs text-slate-400 ml-2 flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{m.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <a href="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-violet-600 font-semibold hover:underline">
              View full order details <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 text-base mb-5">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{item.action}</p>
                  <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
