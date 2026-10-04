"use client";

import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Founder, CartFlow",
    avatar: "MJ",
    avatarBg: "#EEF2FF",
    avatarColor: "#6347FB",
    rating: 5,
    text: "We were drowning in manual order processing. AutomateAI built us an n8n pipeline in just 9 days that handles everything automatically. We now process 3x the orders with the same team size.",
    metric: "3x order volume",
    metricColor: "#6347FB",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Head of Marketing, GrowthLab",
    avatar: "SC",
    avatarBg: "#FDEEE9",
    avatarColor: "#F56962",
    rating: 5,
    text: "The AI lead scoring bot they built completely transformed our sales process. Our conversion rate jumped 312% in 60 days. The ROI was clear within the first week of launch.",
    metric: "312% conversion rate",
    metricColor: "#F56962",
  },
  {
    id: 3,
    name: "David Okonkwo",
    role: "CTO, NexusSaaS",
    avatar: "DO",
    avatarBg: "#ECFDF5",
    avatarColor: "#10B981",
    rating: 5,
    text: "Our RAG-powered support bot now handles 73% of tickets autonomously. Customer satisfaction actually went UP because response time dropped from 4 hours to under 30 seconds.",
    metric: "73% tickets automated",
    metricColor: "#10B981",
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Operations Manager, DataEdge",
    avatar: "PN",
    avatarBg: "#FEF9E7",
    avatarColor: "#FCB816",
    rating: 5,
    text: "The data pipeline they built pulls from 6 different sources, cleans it, and populates our Power BI dashboard in real-time. What used to take 2 analysts a full day now happens automatically every hour.",
    metric: "16 analyst-hours saved/day",
    metricColor: "#FCB816",
  },
  {
    id: 5,
    name: "James Rivera",
    role: "CEO, RevFlow Agency",
    avatar: "JR",
    avatarBg: "#F5F3FF",
    avatarColor: "#9E77E0",
    rating: 5,
    text: "I was skeptical AI automation could work for our niche B2B model. Jahid's team proved me wrong in under 2 weeks. The proposal automation alone saves us 20 hours a week.",
    metric: "20 hrs saved/week",
    metricColor: "#9E77E0",
  },
  {
    id: 6,
    name: "Amelia Torres",
    role: "Director of Ops, ScaleFirst",
    avatar: "AT",
    avatarBg: "#FEF2F2",
    avatarColor: "#EF4444",
    rating: 5,
    text: "Incredibly professional team. They delivered ahead of schedule, documented everything clearly, and trained our staff. 6 months in, the automation is still running flawlessly.",
    metric: "$8,500/mo cost reduction",
    metricColor: "#EF4444",
  },
];

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animFrame: number;
    const speed = 0.6;

    const animate = () => {
      if (!isPaused) {
        posRef.current -= speed;
        const totalWidth = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= totalWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isPaused]);

  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" style={{ padding: "5rem 0", backgroundColor: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "#FCB816", marginBottom: "1rem",
          }}>
            <Star size={14} fill="#FCB816" />
            Client Reviews
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Don't Take Our Word For It —{" "}
            <span style={{
              background: "linear-gradient(135deg, #FCB816 0%, #F56962 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Read Theirs
            </span>
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="#FCB816" color="#FCB816" />)}
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--navy-deep)" }}>5.0</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>from 50+ verified clients</span>
          </div>
        </div>
      </div>

      {/* Scrolling cards */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div aria-hidden="true" style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "150px",
          background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "150px",
          background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none",
        }} />

        <div ref={trackRef} style={{ display: "flex", gap: "1.25rem", padding: "1rem 0", width: "max-content" }}>
          {allTestimonials.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              style={{
                width: "340px",
                flexShrink: 0,
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "1px solid var(--border-clean)",
                boxShadow: "0 4px 16px -2px rgba(12, 52, 74, 0.07)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 12px 28px -4px rgba(12, 52, 74, 0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 4px 16px -2px rgba(12, 52, 74, 0.07)";
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="#FCB816" color="#FCB816" />
                ))}
              </div>

              {/* Quote mark */}
              <Quote size={22} color="#E2E8F0" style={{ flexShrink: 0 }} />

              {/* Text */}
              <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.7, flex: 1 }}>
                {t.text}
              </p>

              {/* Metric badge */}
              <div style={{
                display: "inline-flex", alignItems: "center",
                backgroundColor: t.avatarBg,
                color: t.metricColor,
                borderRadius: "9999px",
                padding: "0.25rem 0.75rem",
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem",
                alignSelf: "flex-start",
              }}>
                ✦ {t.metric}
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.25rem", borderTop: "1px solid var(--border-clean)" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  backgroundColor: t.avatarBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem",
                  color: t.avatarColor, flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-deep)" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
