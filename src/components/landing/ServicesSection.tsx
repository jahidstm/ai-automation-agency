"use client";

import Link from "next/link";
import { Bot, Zap, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  Bot,
  Zap,
  BarChart3,
};

const CARD_STYLES = [
  {
    gradient: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
    iconBg: "#EEF2FF",
    iconColor: "#6347FB",
    accentColor: "#6347FB",
    topBar: "linear-gradient(90deg, #6347FB, #9E77E0)",
  },
  {
    gradient: "linear-gradient(135deg, #FDEEE9 0%, #FFF5F4 100%)",
    iconBg: "#FDEEE9",
    iconColor: "#F56962",
    accentColor: "#F56962",
    topBar: "linear-gradient(90deg, #F56962, #9E77E0)",
  },
  {
    gradient: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
    accentColor: "#10B981",
    topBar: "linear-gradient(90deg, #10B981, #34d399)",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: "5rem 1.5rem", backgroundColor: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-heading)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6347FB",
              marginBottom: "1rem",
            }}
          >
            <Zap size={14} />
            What We Build
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--navy-deep)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Services That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Actually Deliver ROI
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every solution is custom-built for your workflow — not a template, not a generic tool.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          id="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {SERVICES.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Bot;
            const style = CARD_STYLES[index];

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  border: "1px solid var(--border-clean)",
                  boxShadow: "0 4px 16px -2px rgba(12, 52, 74, 0.07)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 16px 32px -6px rgba(12, 52, 74, 0.12)";
                  el.style.borderColor = style.accentColor;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 16px -2px rgba(12, 52, 74, 0.07)";
                  el.style.borderColor = "var(--border-clean)";
                }}
              >
                {/* Accent top bar */}
                <div style={{ height: "5px", background: style.topBar }} />

                {/* Card body */}
                <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Icon + price */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "12px",
                        background: style.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={26} color={style.iconColor} strokeWidth={2} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: style.accentColor,
                        background: style.gradient,
                        padding: "0.3rem 0.75rem",
                        borderRadius: "9999px",
                        border: `1px solid ${style.iconBg}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      From ${service.startingPrice}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--navy-deep)",
                      marginBottom: "0.6rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Outcome bullets */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      flex: 1,
                    }}
                  >
                    {service.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.9rem",
                          color: "var(--text-body)",
                          fontWeight: 500,
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color={style.iconColor}
                          strokeWidth={2.5}
                          style={{ flexShrink: 0 }}
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    href="/#contact"
                    style={{
                      marginTop: "1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: style.accentColor,
                      textDecoration: "none",
                      transition: "gap 0.15s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.625rem"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.375rem"; }}
                  >
                    Get a Free Proposal
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1.25rem" }}>
            Not sure which service fits your needs?
          </p>
          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              background: "transparent",
              color: "#6347FB",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "9999px",
              border: "1.5px solid #6347FB",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#6347FB";
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#6347FB";
            }}
          >
            Book a Free 15-Min Discovery Call
          </Link>
        </div>
      </div>
    </section>
  );
}
