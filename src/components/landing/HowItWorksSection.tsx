"use client";

import { HOW_IT_WORKS } from "@/lib/constants";
import { Phone, Map, Code2, Rocket } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  Phone, Map, Code2, Rocket,
};

const STEP_COLORS = [
  { bg: "#EEF2FF", icon: "#6347FB", line: "#6347FB" },
  { bg: "#FDEEE9", icon: "#F56962", line: "#F56962" },
  { bg: "#FEF9E7", icon: "#FCB816", line: "#FCB816" },
  { bg: "#ECFDF5", icon: "#10B981", line: "#10B981" },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: "5rem 1.5rem", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "#6347FB", marginBottom: "1rem",
          }}>
            <Rocket size={14} />
            Our Process
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            From Idea to{" "}
            <span style={{
              background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Automation in 4 Steps
            </span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            A proven, transparent process designed to deliver results — fast.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0",
          position: "relative",
        }}>
          {HOW_IT_WORKS.map((step, index) => {
            const IconComponent = ICON_MAP[step.icon] || Phone;
            const colors = STEP_COLORS[index];
            const isLast = index === HOW_IT_WORKS.length - 1;

            return (
              <div
                key={step.step}
                id={`how-step-${step.step}`}
                style={{ position: "relative", padding: "0 1.5rem 2rem", textAlign: "center" }}
              >
                {/* Connector line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "36px",
                      right: "-1px",
                      width: "calc(50% + 1px)",
                      height: "2px",
                      background: "linear-gradient(90deg, " + colors.line + "60, " + STEP_COLORS[index + 1].line + "60)",
                      zIndex: 0,
                    }}
                  />
                )}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "36px",
                      left: "-1px",
                      width: "calc(50% + 1px)",
                      height: "2px",
                      background: colors.line + "30",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Icon circle */}
                <div
                  style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    backgroundColor: colors.bg,
                    border: "3px solid #fff",
                    boxShadow: "0 0 0 4px " + colors.bg + ", 0 8px 24px -4px " + colors.icon + "30",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    position: "relative", zIndex: 1,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1.08)";
                    el.style.boxShadow = "0 0 0 4px " + colors.bg + ", 0 12px 32px -4px " + colors.icon + "50";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1)";
                    el.style.boxShadow = "0 0 0 4px " + colors.bg + ", 0 8px 24px -4px " + colors.icon + "30";
                  }}
                >
                  <IconComponent size={30} color={colors.icon} strokeWidth={2} />
                </div>

                {/* Step number */}
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "24px", height: "24px", borderRadius: "50%",
                  backgroundColor: colors.icon, color: "#fff",
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem",
                  marginBottom: "0.75rem",
                }}>
                  {step.step}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700,
                  color: "var(--navy-deep)", marginBottom: "0.5rem",
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a
            href="/#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
              color: "#fff",
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9375rem",
              borderRadius: "9999px", textDecoration: "none",
              boxShadow: "0 6px 16px -2px rgba(99, 71, 251, 0.35)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 12px 28px -4px rgba(99, 71, 251, 0.45)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 6px 16px -2px rgba(99, 71, 251, 0.35)";
            }}
          >
            <Phone size={16} />
            Book Your Free Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
