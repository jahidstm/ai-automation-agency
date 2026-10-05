"use client";

import { useState } from "react";
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Loader2,
  XCircle,
  Send,
} from "lucide-react";
import type { Client, AdminInvoice } from "@/app/(admin)/admin/invoices/page";

interface Props {
  clients: Client[];
  invoices: AdminInvoice[];
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  unpaid: { label: "Unpaid", className: "bg-amber-100 text-amber-700", icon: Clock },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-600", icon: AlertCircle },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700", icon: Send },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-500", icon: FileText },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-400", icon: XCircle },
};

export default function AdminInvoicePanel({ clients, invoices: initialInvoices }: Props) {
  const [invoices, setInvoices] = useState<AdminInvoice[]>(initialInvoices);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    client_id: "",
    description: "",
    amount: "",
    currency: "usd",
    due_date: "",
    notes: "",
  });

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((a, c) => a + Number(c.amount), 0);
  const totalPending = invoices
    .filter((i) => i.status === "unpaid" || i.status === "sent" || i.status === "overdue")
    .reduce((a, c) => a + Number(c.amount), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/invoices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          due_date: form.due_date || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Invoice তৈরি করা যায়নি।");
        return;
      }

      setSuccessMsg(`✅ Invoice ${data.invoice.invoice_number} সফলভাবে তৈরি হয়েছে!`);
      setShowForm(false);
      setForm({ client_id: "", description: "", amount: "", currency: "usd", due_date: "", notes: "" });

      // নতুন invoice list-এ যোগ করি (optimistic update)
      const selectedClient = clients.find((c) => c.id === data.invoice.client_id);
      const newInvoice: AdminInvoice = {
        ...data.invoice,
        profiles: selectedClient ? { full_name: selectedClient.full_name, email: selectedClient.email } : null,
      };
      setInvoices((prev) => [newInvoice, ...prev]);
    } catch {
      setErrorMsg("Network error। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Invoice Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Client-দের invoice তৈরি ও ম্যানেজ করুন</p>
        </div>
        <button
          id="create-invoice-btn"
          onClick={() => { setShowForm(true); setSuccessMsg(null); setErrorMsg(null); }}
          className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Invoices", value: invoices.length.toString(), icon: FileText, color: "bg-violet-50 text-violet-600" },
          { label: "Revenue (Paid)", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
          { label: "Outstanding", value: `$${totalPending.toLocaleString()}`, icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Clients", value: clients.length.toString(), icon: Users, color: "bg-blue-50 text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Success / Error Messages */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Create Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#F56962]" />
              Create New Invoice
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Client Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Client <span className="text-red-500">*</span>
                </label>
                <select
                  id="invoice-client"
                  required
                  value={form.client_id}
                  onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
                >
                  <option value="">— Client বেছে নিন —</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Amount (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input
                    id="invoice-amount"
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                id="invoice-description"
                type="text"
                required
                placeholder="e.g. AI Chatbot Integration — Milestone 2"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Due Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Due Date</label>
                <input
                  id="invoice-due-date"
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
                >
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Notes (optional)</label>
              <textarea
                id="invoice-notes"
                rows={2}
                placeholder="Any additional notes for the client..."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#F56962]/30 focus:border-[#F56962]"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                id="submit-invoice-btn"
                disabled={loading}
                className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? "Creating..." : "Create Invoice"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-sm">All Invoices</h2>
          <span className="text-xs text-slate-400">{invoices.length} invoices</span>
        </div>

        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700">কোনো invoice নেই</p>
            <p className="text-sm text-slate-400 mt-1">উপরের &ldquo;New Invoice&rdquo; বাটনে ক্লিক করে প্রথম invoice তৈরি করুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Invoice</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Client</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Description</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => {
                  const sc = statusConfig[inv.status] || statusConfig.unpaid;
                  const formattedAmount = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: (inv.currency || "usd").toUpperCase(),
                  }).format(Number(inv.amount));

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-slate-700">{inv.invoice_number}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-slate-800 text-xs">{inv.profiles?.full_name || "—"}</p>
                          <p className="text-slate-400 text-xs">{inv.profiles?.email || "—"}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-slate-600 text-xs max-w-xs truncate">{inv.description}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-bold text-slate-900 text-sm">{formattedAmount}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${sc.className}`}>
                          <sc.icon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-slate-500">
                          {inv.due_date
                            ? new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
