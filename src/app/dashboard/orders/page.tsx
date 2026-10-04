import type { Metadata } from "next";
import {
  CheckCircle2,
  Clock,
  Circle,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = { title: "My Orders" };

const orders = [
  {
    id: "ORD-2024-007",
    title: "AI Chatbot Integration",
    service: "AI Chatbot Setup",
    status: "in_progress",
    startDate: "Sep 28, 2024",
    dueDate: "Oct 15, 2024",
    amount: "$1,800",
    progress: 40,
    milestones: [
      { label: "Project Kickoff & Requirements", status: "done", date: "Sep 28" },
      { label: "AI Chatbot Development", status: "done", date: "Oct 1" },
      { label: "Integration & Testing", status: "active", date: "Oct 5" },
      { label: "Client Review & Feedback", status: "pending", date: "Oct 10" },
      { label: "Final Delivery & Documentation", status: "pending", date: "Oct 15" },
    ],
  },
  {
    id: "ORD-2024-005",
    title: "Workflow Automation — Lead Pipeline",
    service: "n8n Workflow Automation",
    status: "in_progress",
    startDate: "Oct 1, 2024",
    dueDate: "Oct 20, 2024",
    amount: "$1,400",
    progress: 20,
    milestones: [
      { label: "Requirements Gathering", status: "done", date: "Oct 1" },
      { label: "Workflow Design", status: "active", date: "Oct 6" },
      { label: "Build & Test Automation", status: "pending", date: "Oct 13" },
      { label: "Final Delivery", status: "pending", date: "Oct 20" },
    ],
  },
  {
    id: "ORD-2024-003",
    title: "Data Pipeline — E-commerce Analytics",
    service: "Data Pipeline",
    status: "completed",
    startDate: "Sep 1, 2024",
    dueDate: "Sep 25, 2024",
    amount: "$2,200",
    progress: 100,
    milestones: [
      { label: "Data Source Mapping", status: "done", date: "Sep 1" },
      { label: "Pipeline Development", status: "done", date: "Sep 10" },
      { label: "Testing & QA", status: "done", date: "Sep 20" },
      { label: "Final Delivery", status: "done", date: "Sep 25" },
    ],
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  in_progress: { label: "In Progress", className: "bg-violet-100 text-violet-700" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending Start", className: "bg-amber-100 text-amber-700" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500" },
};

function MilestoneIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === "active") return <AlertCircle className="w-4 h-4 text-violet-500 animate-pulse" />;
  return <Circle className="w-4 h-4 text-slate-300" />;
}

export default function OrdersPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track all your project orders and deliveries</p>
        </div>
        <span className="bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-xl">
          {orders.length} orders
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const sc = statusConfig[order.status];
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-slate-400">{order.id}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.className}`}>
                        {sc.label}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{order.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{order.service}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-slate-900">{order.amount}</div>
                    <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />Due {order.dueDate}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span className={`font-semibold ${order.progress === 100 ? "text-emerald-600" : "text-violet-600"}`}>
                      {order.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${order.progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-violet-600"}`}
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Milestones</p>
                <div className="space-y-2.5">
                  {order.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <MilestoneIcon status={m.status} />
                      <span className={`text-sm flex-1 ${
                        m.status === "done" ? "text-slate-400 line-through" :
                        m.status === "active" ? "text-slate-900 font-medium" : "text-slate-400"
                      }`}>{m.label}</span>
                      <span className="text-xs text-slate-400">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer actions */}
              <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-white">
                <span className="text-xs text-slate-400">Started {order.startDate}</span>
                <div className="flex gap-3">
                  <a href="/dashboard/messages" className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> Message Us
                  </a>
                  <a href="/dashboard/files" className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors">
                    View Files <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}