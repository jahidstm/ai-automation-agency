"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles, CheckCircle2, Zap } from "lucide-react";

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
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleMagicLink() {
    if (!email) { setError("Please enter your email first to receive a magic link."); return; }
    setMagicLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) { setError(error.message); } else { setMagicSent(true); }
    setMagicLoading(false);
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Card */}
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 24px -4px rgba(12,52,74,0.08), 0 2px 8px -2px rgba(12,52,74,0.04)",
        overflow: "hidden",
      }}>
        {/* Card Top Accent */}
        <div style={{
          height: "4px",
          background: "linear-gradient(90deg, #6347FB 0%, #F56962 100%)",
        }} />

        <div style={{ padding: "32px 36px" }}>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 12px", borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(99,71,251,0.08), rgba(158,119,224,0.08))",
              border: "1px solid rgba(99,71,251,0.15)",
              marginBottom: "14px",
            }}>
              <Zap size={12} style={{ color: "#6347FB" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6347FB", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Client Portal
              </span>
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0C344A", margin: "0 0 8px", letterSpacing: "-0.025em" }}>
              Welcome back
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Sign in to access your AI agency portal and workflows.
            </p>
          </div>

          {magicSent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(99,71,251,0.1), rgba(158,119,224,0.1))",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                border: "1px solid rgba(99,71,251,0.2)",
              }}>
                <CheckCircle2 size={28} style={{ color: "#6347FB" }} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0C344A", marginBottom: "8px" }}>Check your email</h2>
              <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.6 }}>
                We sent a secure login link to <strong style={{ color: "#0C344A" }}>{email}</strong>.
              </p>
              <button
                onClick={() => setMagicSent(false)}
                style={{
                  marginTop: "20px", color: "#6347FB", fontSize: "0.875rem",
                  fontWeight: 600, background: "none", border: "none",
                  cursor: "pointer", textDecoration: "underline",
                }}
              >
                Use password instead
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {error && (
                <div style={{
                  background: "#FEF2F2", border: "1px solid #FECACA",
                  borderRadius: "10px", padding: "12px 14px",
                  fontSize: "0.875rem", color: "#DC2626",
                  display: "flex", alignItems: "flex-start", gap: "8px",
                }}>
                  <span style={{ flexShrink: 0 }}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" style={{
                  display: "block", fontSize: "0.72rem", fontWeight: 700,
                  color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                    color: "#94A3B8", pointerEvents: "none",
                  }}>
                    <Mail size={16} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{
                      width: "100%", height: "48px",
                      paddingLeft: "42px", paddingRight: "14px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#F8FAFC",
                      color: "#0C344A", fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6347FB";
                      e.target.style.background = "#fff";
                      e.target.style.boxShadow = "0 0 0 4px rgba(99,71,251,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.background = "#F8FAFC";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label htmlFor="password" style={{
                    fontSize: "0.72rem", fontWeight: 700,
                    color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em",
                  }}>
                    Password
                  </label>
                  <Link href="/forgot-password" style={{ fontSize: "0.78rem", color: "#6347FB", fontWeight: 600, textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                    color: "#94A3B8", pointerEvents: "none",
                  }}>
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%", height: "48px",
                      paddingLeft: "42px", paddingRight: "44px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#F8FAFC",
                      color: "#0C344A", fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6347FB";
                      e.target.style.background = "#fff";
                      e.target.style.boxShadow = "0 0 0 4px rgba(99,71,251,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                      e.target.style.background = "#F8FAFC";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", color: "#94A3B8", cursor: "pointer",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                id="login-submit-btn"
                style={{
                  width: "100%", height: "50px",
                  background: loading ? "#E2E8F0" : "linear-gradient(135deg, #F56962 0%, #fa8c86 100%)",
                  color: loading ? "#94A3B8" : "#fff",
                  border: "none", borderRadius: "12px",
                  fontSize: "0.95rem", fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: loading ? "none" : "0 8px 24px -4px rgba(245,105,98,0.4)",
                  transition: "all 0.2s",
                  marginTop: "4px",
                }}
              >
                {loading ? <Loader2 size={17} className="animate-spin" /> : null}
                {loading ? "Signing in..." : "Sign in to Dashboard"}
              </button>

              {/* Divider */}
              <div style={{ position: "relative", margin: "4px 0" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", borderTop: "1px solid #E2E8F0" }} />
                </div>
                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                  <span style={{ background: "#fff", padding: "0 12px", fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    or continue with
                  </span>
                </div>
              </div>

              {/* Magic Link */}
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={magicLoading}
                id="magic-link-btn"
                style={{
                  width: "100%", height: "48px",
                  border: "1.5px solid #E2E8F0",
                  background: "#fff",
                  color: "#334155",
                  borderRadius: "12px", fontSize: "0.9rem", fontWeight: 600,
                  cursor: magicLoading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "all 0.2s",
                }}
              >
                {magicLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} style={{ color: "#6347FB" }} />}
                {magicLoading ? "Sending magic link..." : "Sign in with Magic Link"}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                Don&apos;t have an account?{" "}
                <Link href="/register" style={{ color: "#6347FB", fontWeight: 700, textDecoration: "none" }}>
                  Create free account
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
