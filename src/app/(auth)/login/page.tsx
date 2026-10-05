"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";

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
      setError("Please enter your email first.");
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
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">AutomateAI<span className="text-[#F56962]">.</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-1 text-sm">Sign in to your dashboard</p>
        </div>

        {magicSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm">We sent a magic link to <strong>{email}</strong>. Click it to sign in.</p>
            <button onClick={() => setMagicSent(false)} className="mt-4 text-violet-600 text-sm font-medium hover:underline">
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-violet-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full bg-[#F56962] hover:bg-[#e05a53] text-white font-semibold py-3 h-12 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs text-slate-400 bg-white px-3">or</div>
            </div>

            <button
              type="button"
              onClick={handleMagicLink}
              disabled={magicLoading}
              id="magic-link-btn"
              className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 h-12 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {magicLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {magicLoading ? "Sending..." : "Sign in with Magic Link"}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-violet-600 font-medium hover:underline">
                Create one
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}