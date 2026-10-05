import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export const metadata: Metadata = { title: "Payment Cancelled" };

export default async function PaymentCancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ invoice?: string }>;
}) {
  const params = await searchParams;
  const invoiceNumber = params.invoice || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-100">
          <XCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Cancelled</h1>
        <p className="text-slate-500 text-sm mb-6">
          পেমেন্ট বাতিল করা হয়েছে। আপনার কার্ড থেকে কোনো টাকা কাটা হয়নি।
        </p>

        {invoiceNumber && (
          <div className="bg-slate-50 rounded-2xl px-6 py-3 mb-6 flex items-center justify-between">
            <span className="text-xs text-slate-400">Invoice</span>
            <span className="text-sm font-bold text-slate-700 font-mono">{invoiceNumber}</span>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs text-amber-700 font-medium">💡 কী করবেন?</p>
          <ul className="mt-2 space-y-1 text-xs text-amber-600">
            <li>• Invoices পেজে গিয়ে আবার &ldquo;Pay Now&rdquo; ক্লিক করুন</li>
            <li>• ভিন্ন পেমেন্ট মেথড ব্যবহার করে দেখুন</li>
            <li>• কোনো সমস্যা হলে মেসেজিং থেকে আমাদের জানান</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/invoices"
            className="flex-1 flex items-center justify-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
