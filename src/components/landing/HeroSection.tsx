"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Star, ShieldCheck, Clock, TrendingUp, Zap, ChevronRight } from "lucide-react";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "100% Satisfaction Guarantee", color: "#10B981" },
  { icon: Clock, label: "Delivered in 7–14 Days", color: "#6347FB" },
  { icon: TrendingUp, label: "20+ Hours Saved Per Week", color: "#F56962" },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Hours Saved/Week" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$1M+", label: "Client Revenue Unlocked" },
];

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/#contact?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section
      id="hero"
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 40%, #EEF2FF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          right: "-150px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,71,251,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,105,98,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Star rating pill */}
        <div
          id="hero-rating-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#fff",
            border: "1px solid var(--border-clean)",
            borderRadius: "var(--radius-pill)",
            padding: "0.4rem 1rem 0.4rem 0.75rem",
            marginBottom: "1.75rem",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={14} fill="#FCB816" color="#FCB816" />
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              color: "var(--navy-deep)",
            }}
          >
            5.0 — Trusted by 50+ businesses worldwide
          </span>
        </div>

        {/* Main Heading */}
        <h1
          id="hero-heading"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)",
            fontWeight: 800,
            color: "var(--navy-deep)",
            lineHeight: 1.1,
            maxWidth: "820px",
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          We Build{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Automations
          </span>{" "}
          That Save Your Team{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            20+ Hours
          </span>{" "}
          Every Week.
        </h1>

        {/* Sub-heading */}
        <p
          id="hero-subheading"
          style={{
            fontSize: "1.125rem",
            color: "var(--text-muted)",
            maxWidth: "600px",
            lineHeight: 1.75,
            marginBottom: "2.25rem",
          }}
        >
          Custom AI agents, n8n workflow automations, and data pipelines — built in 7–14 days.
          Stop wasting hours on manual tasks. Start scaling smarter.
        </p>

        {/* Lead Audit Input Bar */}
        <form
          id="hero-audit-form"
          onSubmit={handleAudit}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: "0.625rem",
            maxWidth: "540px",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              minWidth: "200px",
              backgroundColor: "#fff",
              border: "1.5px solid var(--border-clean)",
              borderRadius: "var(--radius-pill)",
              padding: "0 1.25rem",
              alignItems: "center",
              boxShadow: "var(--shadow-subtle)",
              gap: "0.5rem",
              transition: "border-color 0.2s ease",
            }}
            onFocus={() => {}}
          >
            <Zap size={16} color="var(--text-placeholder)" style={{ flexShrink: 0 }} />
            <input
              type="email"
              id="hero-email-input"
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--text-body)",
                width: "100%",
                padding: "0.8rem 0",
              }}
            />
          </div>
          <button
            type="submit"
            id="hero-audit-btn"
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            Get Free Audit
            <ArrowRight size={16} />
          </button>
        </form>

        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-placeholder)",
            marginBottom: "2.75rem",
          }}
        >
          No credit card required. Get your custom automation roadmap in 24 hours.
        </p>

        {/* Trust Badges */}
        <div
          id="hero-trust-badges"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.875rem",
            marginBottom: "3.5rem",
          }}
        >
          {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#fff",
                border: "1px solid var(--border-clean)",
                borderRadius: "var(--radius-pill)",
                padding: "0.4rem 0.875rem 0.4rem 0.6rem",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <Icon size={15} color={color} strokeWidth={2.5} />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--text-body)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div
          id="hero-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.5rem",
            maxWidth: "700px",
            padding: "1.5rem",
            backgroundColor: "#fff",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-clean)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "0.75rem 0.5rem",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border-clean)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--navy-deep)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
