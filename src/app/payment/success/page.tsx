import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Receipt } from "lucide-react";

export const metadata: Metadata = { title: "Payment Successful" };

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ invoice?: string; session_id?: string }>;
}) {
  // Note: searchParams is a promise in Next.js 15+
  return (
    <SuccessContent searchParams={searchParams} />
  );
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ invoice?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const invoiceNumber = params.invoice || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
        {/* Animated Check Icon */}
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 text-sm mb-6">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার প্রজেক্টে কাজ শুরু করব।
        </p>

        {invoiceNumber && (
          <div className="bg-slate-50 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Receipt className="w-4 h-4" />
              <span className="text-xs font-medium">Invoice</span>
            </div>
            <span className="text-sm font-bold text-slate-900 font-mono">{invoiceNumber}</span>
          </div>
        )}

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs text-emerald-700 font-medium">✅ এরপর কী হবে?</p>
          <ul className="mt-2 space-y-1 text-xs text-emerald-600">
            <li>• আপনার ইমেইলে রিসিপ্ট পাঠানো হবে</li>
            <li>• আপনার ড্যাশবোর্ডে invoice status আপডেট হয়ে যাবে</li>
            <li>• আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/invoices"
            className="flex-1 flex items-center justify-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
          >
            View Invoices
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
