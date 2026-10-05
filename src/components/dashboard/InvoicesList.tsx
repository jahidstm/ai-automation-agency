"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  CreditCard,
  FileText,
  Loader2,
  XCircle,
} from "lucide-react";
import type { Invoice } from "@/app/dashboard/invoices/page";

const statusConfig: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  unpaid: { label: "Unpaid", className: "bg-amber-100 text-amber-700", icon: Clock },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-600", icon: AlertCircle },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700", icon: Clock },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-500", icon: FileText },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-400", icon: XCircle },
};

interface Props {
  invoices: Invoice[];
}

export default function InvoicesList({ invoices }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePayNow = async (invoiceId: string) => {
    setLoadingId(invoiceId);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoiceId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setErrorMsg(data.error || "Checkout session তৈরি করা যায়নি।");
        return;
      }

      // Stripe-hosted checkout page-এ redirect করো
      window.location.href = data.url;
    } catch {
      setErrorMsg("Network error। আবার চেষ্টা করুন।");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}
      <div className="divide-y divide-slate-100">
        {invoices.map((inv) => {
          const sc = statusConfig[inv.status] || statusConfig.unpaid;
          const needsPayment = inv.status === "unpaid" || inv.status === "overdue" || inv.status === "sent";
          const isLoading = loadingId === inv.id;

          const formattedAmount = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: (inv.currency || "usd").toUpperCase(),
          }).format(Number(inv.amount));

          const formattedDate = inv.due_date
            ? new Date(inv.due_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No due date";

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
                  <span className="text-sm font-semibold text-slate-900 font-mono">
                    {inv.invoice_number}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${sc.className}`}
                  >
                    <sc.icon className="w-3 h-3" />
                    {sc.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{inv.description}</p>
                <p className="text-xs text-slate-400 mt-0.5">Due: {formattedDate}</p>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <div className="text-base font-bold text-slate-900">{formattedAmount}</div>
                {inv.paid_at && (
                  <div className="text-xs text-emerald-600 mt-0.5">
                    Paid {new Date(inv.paid_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  title="Download PDF"
                  aria-label="Download Invoice PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                {needsPayment && (
                  <button
                    id={`pay-btn-${inv.id}`}
                    onClick={() => handlePayNow(inv.id)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 bg-[#F56962] hover:bg-[#e05a53] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CreditCard className="w-3.5 h-3.5" />
                    )}
                    {isLoading ? "Processing..." : "Pay Now"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
