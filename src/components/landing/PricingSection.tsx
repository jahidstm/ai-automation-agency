"use client";

import { Check, Zap, Star } from "lucide-react";
import Link from "next/link";
import { PRICING_PLANS } from "@/lib/constants";

export default function PricingSection() {
  return (
    <section id="pricing" style={{ padding: "5rem 1.5rem", backgroundColor: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "#6347FB", marginBottom: "1rem",
          }}>
            <Zap size={14} />
            Transparent Pricing
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Simple Pricing,{" "}
            <span style={{
              background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              No Surprises
            </span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            One-time project fees. No subscriptions, no hidden costs, no lock-in.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          alignItems: "stretch",
        }}>
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-${plan.id}`}
              style={{
                backgroundColor: plan.highlighted ? "var(--navy-deep)" : "#fff",
                borderRadius: "20px",
                border: plan.highlighted ? "2px solid #6347FB" : "1px solid var(--border-clean)",
                boxShadow: plan.highlighted
                  ? "0 20px 48px -8px rgba(99, 71, 251, 0.30)"
                  : "0 4px 16px -2px rgba(12, 52, 74, 0.07)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.25s ease",
                transform: plan.highlighted ? "translateY(-8px)" : "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (!plan.highlighted) {
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 32px -4px rgba(12, 52, 74, 0.12)";
                  el.style.borderColor = "#6347FB";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (!plan.highlighted) {
                  el.style.transform = "none";
                  el.style.boxShadow = "0 4px 16px -2px rgba(12, 52, 74, 0.07)";
                  el.style.borderColor = "var(--border-clean)";
                }
              }}
            >
              {/* Most Popular badge */}
              {plan.highlighted && (
                <div style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  padding: "0.3rem 1rem",
                  borderRadius: "9999px",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  boxShadow: "0 4px 12px rgba(245, 105, 98, 0.35)",
                }}>
                  <Star size={11} fill="#fff" /> Most Popular
                </div>
              )}

              {/* Plan name */}
              <div style={{
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem",
                color: plan.highlighted ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
                {plan.price === 0 ? (
                  <span style={{
                    fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.25rem",
                    color: plan.highlighted ? "#fff" : "var(--navy-deep)", lineHeight: 1,
                  }}>Custom</span>
                ) : (
                  <>
                    <span style={{
                      fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.75rem",
                      color: plan.highlighted ? "#fff" : "var(--navy-deep)", lineHeight: 1,
                    }}>${plan.price}</span>
                    <span style={{
                      fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "0.9rem",
                      color: plan.highlighted ? "rgba(255,255,255,0.5)" : "var(--text-muted)",
                      marginBottom: "0.4rem",
                    }}>one-time</span>
                  </>
                )}
              </div>

              {/* Delivery */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                backgroundColor: plan.highlighted ? "rgba(255,255,255,0.1)" : "#F8FAFC",
                color: plan.highlighted ? "rgba(255,255,255,0.8)" : "var(--text-muted)",
                borderRadius: "9999px", padding: "0.25rem 0.75rem",
                fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "0.8rem",
                marginBottom: "1rem",
              }}>
                <Zap size={12} />
                Delivered in {plan.delivery}
              </div>

              {/* Description */}
              <p style={{
                fontSize: "0.9rem",
                color: plan.highlighted ? "rgba(255,255,255,0.65)" : "var(--text-muted)",
                lineHeight: 1.65, marginBottom: "1.5rem",
              }}>
                {plan.description}
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                backgroundColor: plan.highlighted ? "rgba(255,255,255,0.12)" : "var(--border-clean)",
                marginBottom: "1.25rem",
              }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.9rem" }}>
                    <Check
                      size={16}
                      color={plan.highlighted ? "#34d399" : "#10B981"}
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <span style={{ color: plan.highlighted ? "rgba(255,255,255,0.8)" : "var(--text-body)" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/#contact"
                style={{
                  marginTop: "1.75rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.875rem",
                  background: plan.highlighted
                    ? "linear-gradient(135deg, #F56962 0%, #FCB816 100%)"
                    : "transparent",
                  color: plan.highlighted ? "#fff" : "#6347FB",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9375rem",
                  borderRadius: "12px",
                  border: plan.highlighted ? "none" : "1.5px solid #6347FB",
                  textDecoration: "none",
                  boxShadow: plan.highlighted ? "0 6px 16px rgba(245,105,98,0.35)" : "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.highlighted) {
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 10px 24px rgba(245,105,98,0.45)";
                  } else {
                    el.style.background = "#6347FB";
                    el.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.highlighted) {
                    el.style.transform = "none";
                    el.style.boxShadow = "0 6px 16px rgba(245,105,98,0.35)";
                  } else {
                    el.style.background = "transparent";
                    el.style.color = "#6347FB";
                  }
                }}
              >
                {plan.price === 0 ? "Contact Us" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            🛡️ All plans include a <strong style={{ color: "var(--navy-deep)" }}>100% satisfaction guarantee</strong> — if you're not happy, we'll fix it or refund you.
          </p>
        </div>
      </div>
    </section>
  );
}
