"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Zap, CheckCircle2 } from "lucide-react";

const passwordStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = passwordStrength(password);
  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: "client" },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    // Since email confirmation is OFF in dev, redirect to dashboard
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">AutomateAI<span className="text-[#F56962]">.</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-1 text-sm">Start your automation journey today</p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Account created!</h2>
            <p className="text-slate-500 text-sm">Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
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
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          strength >= i ? strengthColors[strength - 1] : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  {strength > 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      Password strength: <span className="font-medium">{strengthLabels[strength]}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="register-submit-btn"
              className="w-full bg-[#F56962] hover:bg-[#e05a53] text-white font-semibold py-3 h-12 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Creating account..." : "Create free account"}
            </button>

            <p className="text-center text-xs text-slate-400 mt-2">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-violet-600 hover:underline">Terms</Link>
              {" & "}
              <Link href="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>
            </p>

            <p className="text-center text-sm text-slate-500 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}