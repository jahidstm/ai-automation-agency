import type { Metadata } from "next";
import { CheckCircle2, Clock, DollarSign, FileText } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import InvoicesList from "@/components/dashboard/InvoicesList";

export const metadata: Metadata = { title: "Invoices & Billing" };

export default async function InvoicesPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let invoices: Invoice[] = [];
  if (user) {
    const { data } = await supabase
      .from("invoices")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

    invoices = (data as Invoice[]) || [];
  }

  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((a, c) => a + Number(c.amount), 0);
  const totalDue = invoices
    .filter((i) => i.status !== "paid" && i.status !== "cancelled")
    .reduce((a, c) => a + Number(c.amount), 0);
  const totalInvoiced = totalPaid + totalDue;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">Invoices & Billing</h1>
        <p className="text-sm text-slate-500 mt-1">View, track, and pay your project invoices securely</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Paid</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalPaid.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalDue.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Invoiced</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalInvoiced.toLocaleString()}</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-sm">All Invoices</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{invoices.length} invoices</span>
        </div>

        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700">No invoices yet</p>
            <p className="text-sm text-slate-400 mt-1">Your project invoices will show up here once generated.</p>
          </div>
        ) : (
          <InvoicesList invoices={invoices} />
        )}
      </div>
    </div>
  );
}

export interface Invoice {
  id: string;
  invoice_number: string;
  description: string;
  amount: number;
  currency: string;
  status: "draft" | "sent" | "unpaid" | "paid" | "overdue" | "cancelled";
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  order_id: string | null;
  notes: string | null;
}
