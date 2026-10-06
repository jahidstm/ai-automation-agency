"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, Zap } from "lucide-react";

const passwordStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const inputStyle = {
  width: "100%", height: "48px",
  paddingLeft: "42px", paddingRight: "14px",
  borderRadius: "12px",
  border: "1.5px solid #E2E8F0",
  background: "#F8FAFC",
  color: "#0C344A", fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#6347FB";
  e.target.style.background = "#fff";
  e.target.style.boxShadow = "0 0 0 4px rgba(99,71,251,0.08)";
};
const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#E2E8F0";
  e.target.style.background = "#F8FAFC";
  e.target.style.boxShadow = "none";
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
  const strengthColors = ["#F87171", "#FBBF24", "#34D399", "#10B981"];
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
      email, password,
      options: {
        data: { full_name: fullName, role: "client" },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 24px -4px rgba(12,52,74,0.08), 0 2px 8px -2px rgba(12,52,74,0.04)",
        overflow: "hidden",
      }}>
        <div style={{ height: "4px", background: "linear-gradient(90deg, #6347FB 0%, #F56962 100%)" }} />

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
                Get Started
              </span>
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0C344A", margin: "0 0 8px", letterSpacing: "-0.025em" }}>
              Create your account
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
              Start automating your enterprise workflows in minutes.
            </p>
          </div>

          {success ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <CheckCircle2 size={28} style={{ color: "#10B981" }} />
              </div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0C344A", marginBottom: "8px" }}>Account created!</h2>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>Redirecting you to your client dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }}>
                    <User size={16} />
                  </div>
                  <input id="fullName" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
                  Work Email
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }}>
                    <Mail size={16} />
                  </div>
                  <input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }}>
                    <Lock size={16} />
                  </div>
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={inputFocus} onBlur={inputBlur}
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
                {password && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{
                          height: "5px", flex: 1, borderRadius: "100px",
                          background: strength >= i ? strengthColors[strength - 1] : "#E2E8F0",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    {strength > 0 && (
                      <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "6px", display: "flex", justifyContent: "space-between" }}>
                        <span>Password strength:</span>
                        <span style={{ fontWeight: 700, color: strengthColors[strength - 1] }}>{strengthLabels[strength]}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                id="register-submit-btn"
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
                {loading ? "Creating account..." : "Create Free Account"}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>
                By signing up, you agree to our{" "}
                <Link href="/terms" style={{ color: "#6347FB", fontWeight: 600, textDecoration: "none" }}>Terms of Service</Link>
                {" and "}
                <Link href="/privacy" style={{ color: "#6347FB", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</Link>.
              </p>

              <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "16px", textAlign: "center", fontSize: "0.875rem", color: "#64748B" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#6347FB", fontWeight: 700, textDecoration: "none" }}>
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
