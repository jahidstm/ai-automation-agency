"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleMagicLink() {
    if (!email) {
      setError("Please enter your email first to receive a magic link.");
      return;
    }
    setMagicLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      setError(error.message);
    } else {
      setMagicSent(true);
    }
    setMagicLoading(false);
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-7 sm:p-9">
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Sign in to access your AI agency portal and workflows.
          </p>
        </div>

        {magicSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We sent a secure login link to <strong className="text-slate-900 font-semibold">{email}</strong>. Click the link in the email to sign in directly.
            </p>
            <button
              onClick={() => setMagicSent(false)}
              className="mt-5 text-violet-600 text-sm font-semibold hover:underline"
            >
              Use password instead
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5 text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-violet-600 hover:text-violet-700 font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-11 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full h-12 bg-gradient-to-r from-[#F56962] to-[#fa7c76] hover:from-[#e05a53] hover:to-[#f56962] text-white font-semibold rounded-xl shadow-lg shadow-[#F56962]/25 hover:shadow-xl hover:shadow-[#F56962]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Signing in..." : "Sign in to Dashboard"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400 bg-white px-3">
                or continue with
              </div>
            </div>

            <button
              type="button"
              onClick={handleMagicLink}
              disabled={magicLoading}
              id="magic-link-btn"
              className="w-full h-12 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
            >
              {magicLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <Sparkles className="w-4 h-4 text-violet-600" />
              )}
              {magicLoading ? "Sending magic link..." : "Sign in with Magic Link"}
            </button>

            <div className="pt-2 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-violet-600 font-semibold hover:text-violet-700 hover:underline">
                Create free account
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
