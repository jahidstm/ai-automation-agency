"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2 } from "lucide-react";

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
  const strengthColors = ["bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-green-500"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-7 sm:p-9">
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Start automating your enterprise workflows in minutes.
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Account created successfully!</h2>
            <p className="text-slate-500 text-sm">Redirecting you to your client dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5 text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
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

              {password && (
                <div className="mt-2.5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          strength >= i ? strengthColors[strength - 1] : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  {strength > 0 && (
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center justify-between">
                      <span>Password strength:</span>
                      <span className="font-semibold text-slate-700">{strengthLabels[strength]}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="register-submit-btn"
              className="w-full h-12 bg-gradient-to-r from-[#F56962] to-[#fa7c76] hover:from-[#e05a53] hover:to-[#f56962] text-white font-semibold rounded-xl shadow-lg shadow-[#F56962]/25 hover:shadow-xl hover:shadow-[#F56962]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm mt-3 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Creating account..." : "Create Free Account"}
            </button>

            <p className="text-center text-xs text-slate-500 mt-3 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-violet-600 hover:underline font-medium">Terms of Service</Link>
              {" and "}
              <Link href="/privacy" className="text-violet-600 hover:underline font-medium">Privacy Policy</Link>.
            </p>

            <div className="pt-3 border-t border-slate-100 text-center text-sm text-slate-600">
              Already have an account?{" "}
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
