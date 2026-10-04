"use client";

import { ArrowUpRight, TrendingUp, Clock, DollarSign } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "ecommerce",
    tag: "E-Commerce",
    tagColor: "#6347FB",
    tagBg: "#EEF2FF",
    accentColor: "#6347FB",
    topBar: "linear-gradient(90deg, #6347FB, #9E77E0)",
    client: "Online Retail Store",
    problem: "Manually processing 200+ orders/day, copy-pasting tracking info across 4 platforms. Team spending 6+ hours daily on repetitive data entry.",
    solution: "Built a fully automated n8n pipeline: order confirmation → inventory update → shipping label → customer email → CRM sync. Zero manual intervention.",
    results: [
      { icon: Clock, value: "6 hrs", label: "Saved Daily", color: "#6347FB" },
      { icon: TrendingUp, value: "3x", label: "Order Capacity", color: "#10B981" },
      { icon: DollarSign, value: "$4,200", label: "Saved/Month", color: "#F56962" },
    ],
    deliveredIn: "9 days",
  },
  {
    id: "agency",
    tag: "Marketing Agency",
    tagColor: "#F56962",
    tagBg: "#FDEEE9",
    accentColor: "#F56962",
    topBar: "linear-gradient(90deg, #F56962, #FCB816)",
    client: "Digital Marketing Agency",
    problem: "Lead qualification taking 2–3 hours per day. Sales team overwhelmed with unqualified prospects. No automated follow-up system in place.",
    solution: "Deployed an AI lead-scoring bot: auto-qualifies from website forms → enriches with LinkedIn data → schedules calls for hot leads → sends personalized follow-ups.",
    results: [
      { icon: TrendingUp, value: "312%", label: "Lead Conversion", color: "#F56962" },
      { icon: Clock, value: "15 hrs", label: "Saved/Week", color: "#6347FB" },
      { icon: DollarSign, value: "$12K", label: "Extra Revenue/Mo", color: "#10B981" },
    ],
    deliveredIn: "12 days",
  },
  {
    id: "saas",
    tag: "SaaS Company",
    tagColor: "#10B981",
    tagBg: "#ECFDF5",
    accentColor: "#10B981",
    topBar: "linear-gradient(90deg, #10B981, #34d399)",
    client: "B2B SaaS Platform",
    problem: "Customer support team handling 500+ repetitive tickets/day. 40% were the same 15 questions. Average response time: 4 hours. High churn risk.",
    solution: "Trained a RAG-powered chatbot on their docs + product FAQs. Integrated with Intercom — handles Tier 1 support automatically, escalates complex cases.",
    results: [
      { icon: TrendingUp, value: "73%", label: "Tickets Auto-Resolved", color: "#10B981" },
      { icon: Clock, value: "< 30s", label: "Response Time", color: "#6347FB" },
      { icon: DollarSign, value: "$8,500", label: "Support Cost Cut/Mo", color: "#F56962" },
    ],
    deliveredIn: "14 days",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="portfolio" style={{ padding: "5rem 1.5rem", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "#F56962", marginBottom: "1rem",
          }}>
            <TrendingUp size={14} />
            Case Studies
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Real Problems.{" "}
            <span style={{
              background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Measurable Results.
            </span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            See exactly how we've transformed manual bottlenecks into automated systems that scale.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {CASE_STUDIES.map((cs, index) => (
            <div
              key={cs.id}
              id={`case-study-${cs.id}`}
              style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                border: "1px solid var(--border-clean)",
                boxShadow: "0 4px 16px -2px rgba(12, 52, 74, 0.07)",
                overflow: "hidden",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 16px 32px -6px rgba(12, 52, 74, 0.12)";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 4px 16px -2px rgba(12, 52, 74, 0.07)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Top accent */}
              <div style={{ height: "4px", background: cs.topBar }} />

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                padding: "2rem",
                alignItems: "start",
              }}
              className="case-study-inner"
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="case-study-cols">

                  {/* Column 1: Problem */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                      <span style={{
                        fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700,
                        color: cs.tagColor, backgroundColor: cs.tagBg,
                        padding: "0.25rem 0.75rem", borderRadius: "9999px",
                      }}>
                        {cs.tag}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-placeholder)",
                      marginBottom: "0.5rem",
                    }}>
                      The Problem
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                      {cs.problem}
                    </p>
                  </div>

                  {/* Column 2: Solution */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-placeholder)",
                      marginBottom: "0.5rem", marginTop: "2.125rem",
                    }}>
                      Our Solution
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                      {cs.solution}
                    </p>
                  </div>

                  {/* Column 3: Results */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-placeholder)",
                      marginBottom: "0.75rem", marginTop: "2.125rem",
                    }}>
                      The Results
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {cs.results.map(({ icon: Icon, value, label, color }) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            backgroundColor: color + "15",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}>
                            <Icon size={16} color={color} strokeWidth={2} />
                          </div>
                          <div>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "var(--navy-deep)", lineHeight: 1 }}>
                              {value}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                              {label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Delivered badge */}
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: cs.tagBg,
                    border: `1px solid ${cs.tagColor}30`,
                    borderRadius: "12px",
                    padding: "0.75rem 1rem",
                    marginBottom: "0.75rem",
                  }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.4rem", color: cs.tagColor }}>
                      {cs.deliveredIn}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: cs.tagColor, opacity: 0.8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Delivered
                    </div>
                  </div>
                  <a
                    href="/#contact"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.25rem",
                      fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.8rem",
                      color: cs.tagColor, textDecoration: "none", transition: "gap 0.15s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.25rem"; }}
                  >
                    Similar Project <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .case-study-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .case-study-inner { grid-template-columns: 1fr !important; }
          .case-study-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
