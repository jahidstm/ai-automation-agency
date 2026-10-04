"use client";

import Link from "next/link";
import { ArrowRight, Phone, Zap } from "lucide-react";

const TRUST_STATS = [
  { value: "50+", label: "Projects" },
  { value: "98%", label: "Satisfaction" },
  { value: "7–14", label: "Days Delivery" },
];

export default function CTAStrip() {
  return (
    <section
      id="contact"
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(135deg, #0C344A 0%, #1E293B 50%, #0C344A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,71,251,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-60px", left: "-60px",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,105,98,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Dot grid overlay */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          backgroundColor: "rgba(99,71,251,0.2)",
          border: "1px solid rgba(99,71,251,0.4)",
          borderRadius: "9999px",
          padding: "0.4rem 1.1rem",
          marginBottom: "2rem",
        }}>
          <Zap size={14} color="#9E77E0" />
          <span style={{
            fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8125rem",
            color: "#C4B5FD", letterSpacing: "0.03em",
          }}>
            Limited Slots Available This Month
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 800,
          fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
          color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.03em",
        }}>
          Ready to Stop Wasting{" "}
          <span style={{
            background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            20 Hours
          </span>{" "}
          a Week?
        </h2>

        {/* Sub */}
        <p style={{
          fontSize: "1.125rem", color: "rgba(255,255,255,0.65)",
          lineHeight: 1.75, maxWidth: "600px", margin: "0 auto 2.5rem",
        }}>
          Book a free 15-minute discovery call. We'll audit your workflow, identify quick wins,
          and show you exactly what automation can do for your business — no obligation.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            id="cta-primary-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #F56962 0%, #E0534C 100%)",
              color: "#fff",
              fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem",
              borderRadius: "9999px", textDecoration: "none",
              boxShadow: "0 8px 24px -4px rgba(245, 105, 98, 0.45)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 16px 36px -6px rgba(245, 105, 98, 0.55)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 8px 24px -4px rgba(245, 105, 98, 0.45)";
            }}
          >
            <Phone size={18} />
            Book Free Discovery Call
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/#roi-calculator"
            id="cta-secondary-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "1rem 2rem",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem",
              borderRadius: "9999px", textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.2)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.14)";
              el.style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            Calculate My Savings
          </Link>
        </div>

        {/* Trust mini stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "2.5rem",
          marginTop: "2.5rem", flexWrap: "wrap",
        }}>
          {TRUST_STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem",
                color: "#fff", lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* No obligation note */}
        <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>
          No credit card required. No commitment. Just a conversation.
        </p>
      </div>
    </section>
  );
}
