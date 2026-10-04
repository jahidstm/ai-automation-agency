import type { Metadata } from "next";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  CreditCard,
  DollarSign,
  FileText,
} from "lucide-react";

export const metadata: Metadata = { title: "Invoices & Billing" };

const invoices = [
  {
    id: "INV-2024-008",
    description: "AI Chatbot Integration — Milestone 2",
    order: "ORD-2024-007",
    amount: "$900",
    amountNum: 900,
    status: "unpaid",
    issued: "Oct 3, 2024",
    due: "Oct 10, 2024",
  },
  {
    id: "INV-2024-006",
    description: "AI Chatbot Integration — Initial Deposit (50%)",
    order: "ORD-2024-007",
    amount: "$900",
    amountNum: 900,
    status: "paid",
    issued: "Sep 28, 2024",
    due: "Sep 28, 2024",
  },
  {
    id: "INV-2024-004",
    description: "Workflow Automation — Project Start",
    order: "ORD-2024-005",
    amount: "$700",
    amountNum: 700,
    status: "paid",
    issued: "Oct 1, 2024",
    due: "Oct 1, 2024",
  },
  {
    id: "INV-2024-003",
    description: "Data Pipeline — Full Project Payment",
    order: "ORD-2024-003",
    amount: "$2,200",
    amountNum: 2200,
    status: "paid",
    issued: "Sep 25, 2024",
    due: "Sep 25, 2024",
  },
  {
    id: "INV-2024-002",
    description: "Strategy Consultation — 2 hours",
    order: "—",
    amount: "$300",
    amountNum: 300,
    status: "overdue",
    issued: "Sep 15, 2024",
    due: "Sep 22, 2024",
  },
];

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  unpaid: { label: "Unpaid", className: "bg-amber-100 text-amber-700", icon: Clock },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-600", icon: AlertCircle },
};

const totalPaid = invoices.filter((i) => i.status === "paid").reduce((a, c) => a + c.amountNum, 0);
const totalDue = invoices.filter((i) => i.status !== "paid").reduce((a, c) => a + c.amountNum, 0);

export default function InvoicesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Invoices & Billing</h1>
        <p className="text-sm text-slate-500 mt-0.5">View and pay your project invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Paid</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalDue.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Invoiced</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${(totalPaid + totalDue).toLocaleString()}</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-sm">All Invoices</h2>
          <span className="text-xs text-slate-400">{invoices.length} invoices</span>
        </div>

        {/* Mobile + Desktop List */}
        <div className="divide-y divide-slate-100">
          {invoices.map((inv) => {
            const sc = statusConfig[inv.status];
            const needsPayment = inv.status === "unpaid" || inv.status === "overdue";
            return (
              <div
                key={inv.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors flex-wrap sm:flex-nowrap"
              >
                {/* Icon */}
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900 font-mono">{inv.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${sc.className}`}>
                      <sc.icon className="w-3 h-3" />
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{inv.description}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Due: {inv.due}</p>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-slate-900">{inv.amount}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {needsPayment && (
                    <button className="flex items-center gap-1.5 bg-[#F56962] hover:bg-[#e05a53] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                      <CreditCard className="w-3.5 h-3.5" />
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}