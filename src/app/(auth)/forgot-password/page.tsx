"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/settings`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-7 sm:p-9">
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We sent password reset instructions to <strong className="text-slate-900 font-semibold">{email}</strong>.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-violet-600 font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5 text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Account Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#F56962] to-[#fa7c76] hover:from-[#e05a53] hover:to-[#f56962] text-white font-semibold rounded-xl shadow-lg shadow-[#F56962]/25 hover:shadow-xl hover:shadow-[#F56962]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm mt-3 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>

            <div className="pt-3 border-t border-slate-100 text-center text-sm text-slate-600">
              Remember your password?{" "}
              <Link href="/login" className="text-violet-600 font-semibold hover:text-violet-700 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
