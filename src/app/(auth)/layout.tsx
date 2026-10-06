import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Sparkles, ShieldCheck, BarChart3, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "AutomateAI | Client Portal",
  description: "Sign in or create your AutomateAI client account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
      {/* Left Column — Dark Visual Panel (Desktop only) */}
      <div
        className="auth-left-panel"
        style={{
          width: "48%",
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0c0620 0%, #1a0f3d 50%, #080315 100%)",
          color: "#fff",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Ambient Orbs */}
        <div style={{
          position: "absolute", top: "-120px", left: "-100px",
          width: "420px", height: "420px",
          background: "rgba(99,71,251,0.22)", borderRadius: "50%", filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-80px",
          width: "360px", height: "360px",
          background: "rgba(245,105,98,0.18)", borderRadius: "50%", filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "linear-gradient(135deg, #6347FB 0%, #F56962 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(99,71,251,0.35)",
            }}>
              <Zap size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.35rem", color: "#fff", letterSpacing: "-0.02em" }}>
              AutomateAI<span style={{ color: "#F56962" }}>.</span>
            </span>
          </Link>
        </div>

        {/* Center Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "440px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "100px",
            background: "rgba(99,71,251,0.18)", border: "1px solid rgba(99,71,251,0.3)",
            color: "#a78bfa", fontSize: "0.72rem", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "24px",
          }}>
            <Sparkles size={13} style={{ color: "#F56962" }} />
            Enterprise AI Platform
          </div>

          <h2 style={{
            fontSize: "2.15rem", fontWeight: 800, lineHeight: 1.18,
            color: "#fff", letterSpacing: "-0.03em", marginBottom: "16px",
          }}>
            Autonomous operations<br />
            <span style={{ color: "#a78bfa" }}>built for modern growth.</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "0.95rem",
            lineHeight: 1.7, marginBottom: "32px",
          }}>
            Manage your AI agents, review automated workflow runs, and monitor live ROI metrics from a single dashboard.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: Zap, color: "rgba(99,71,251,0.2)", iconColor: "#a78bfa", title: "Autonomous 24/7 Execution", desc: "Custom AI agents handling client support, data analysis & operations." },
              { icon: ShieldCheck, color: "rgba(16,185,129,0.15)", iconColor: "#6ee7b7", title: "Bank-Grade Data Security", desc: "Row-level security, encrypted secrets & granular role permissions." },
              { icon: BarChart3, color: "rgba(245,105,98,0.15)", iconColor: "#fca5a5", title: "Real-Time ROI Analytics", desc: "Transparent token metrics, execution logs & cost monitoring." },
            ].map(({ icon: Icon, color, iconColor, title, desc }) => (
              <div key={title} style={{
                display: "flex", alignItems: "flex-start", gap: "14px",
                padding: "14px 16px", borderRadius: "12px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: color, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0, marginTop: "1px",
                }}>
                  <Icon size={17} style={{ color: iconColor }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#fff", marginBottom: "3px" }}>{title}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Footer */}
        <div style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "20px",
          display: "flex", alignItems: "center", gap: "14px",
        }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6347FB, #F56962)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: "0.85rem",
            flexShrink: 0,
          }}>JD</div>
          <div>
            <div style={{ color: "#F59E0B", fontSize: "0.75rem", marginBottom: "3px" }}>★★★★★</div>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>
              "Cut manual operational overhead by 70% in the first 30 days."
            </p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", margin: "3px 0 0", fontWeight: 600 }}>
              Enterprise Operations Leader
            </p>
          </div>
        </div>
      </div>

      {/* Right Column — Auth Form */}
      <div style={{
        flex: 1,
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}>
        {/* Top Nav */}
        <div style={{
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #E2E8F0",
          background: "#fff",
          flexShrink: 0,
        }}>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              fontSize: "0.82rem", fontWeight: 600,
              color: "#64748B", textDecoration: "none",
              padding: "7px 12px", borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "#F8FAFC",
              transition: "all 0.2s",
            }}
          >
            <ArrowLeft size={13} />
            Back to website
          </Link>
          <div className="auth-mobile-logo" style={{ display: "none" }}>
            <Link href="/" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0C344A", textDecoration: "none" }}>
              AutomateAI<span style={{ color: "#F56962" }}>.</span>
            </Link>
          </div>
        </div>

        {/* Form Area */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}>
          <div style={{ width: "100%", maxWidth: "440px" }}>
            {children}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "#94A3B8",
          borderTop: "1px solid #E2E8F0",
          flexShrink: 0,
        }}>
          © {new Date().getFullYear()} AutomateAI Agency. All rights reserved.
        </div>
      </div>

      
    </div>
  );
}
