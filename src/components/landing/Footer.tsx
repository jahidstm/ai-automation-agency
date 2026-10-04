"use client";

import Link from "next/link";
import { Zap, ExternalLink, Globe, Code2, Mail, ArrowRight, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { PUBLIC_NAV, SERVICES } from "@/lib/constants";

const SOCIAL_LINKS = [
  { icon: Globe, href: "https://twitter.com", label: "Twitter / X", color: "#1DA1F2" },
  { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
  { icon: Code2, href: "https://github.com/jahidstm/ai-automation-agency", label: "GitHub", color: "#6347FB" },
  { icon: Mail, href: "mailto:hello@automateai.dev", label: "Email", color: "#F56962" },
];

const FOOTER_LINKS = {
  Services: SERVICES.map((s) => ({ label: s.title, href: "/#services" })),
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/#portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer" style={{ backgroundColor: "var(--navy-slate)", color: "#fff" }}>

      {/* Main footer content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem 2.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
        className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "1.25rem" }}
            >
              <span style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 16px -2px rgba(99, 71, 251, 0.30)", flexShrink: 0,
              }}>
                <Zap size={20} color="#fff" strokeWidth={2.5} />
              </span>
              <span style={{
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem",
                color: "#fff", letterSpacing: "-0.02em",
              }}>
                AutomateAI<span style={{ color: "#F56962" }}>.</span>
              </span>
            </Link>

            <p style={{
              fontSize: "0.9rem", color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "280px",
            }}>
              We build custom AI agents, n8n automations, and data pipelines that save businesses
              20+ hours per week. Delivered in 7–14 days.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
              {[
                { icon: Mail, text: "hello@automateai.dev" },
                { icon: Phone, text: "+1 (555) 000-0000" },
                { icon: MapPin, text: "Remote — Worldwide" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Icon size={14} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = color + "20";
                    el.style.borderColor = color + "60";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "rgba(255,255,255,0.07)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.transform = "none";
                  }}
                >
                  <Icon size={16} color="rgba(255,255,255,0.6)" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem",
                color: "#fff", marginBottom: "1.25rem", textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                {title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontSize: "0.875rem", color: "rgba(255,255,255,0.5)",
                        textDecoration: "none", transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.25rem" }}>
              Get AI Automation Insights
            </div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
              Weekly tips, case studies & n8n workflows — straight to your inbox.
            </div>
          </div>

          {subscribed ? (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "#34d399", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
            }}>
              ✓ You're subscribed! Welcome aboard.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap" }}
            >
              <input
                id="footer-newsletter-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "0.625rem 1rem",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "9999px",
                  color: "#fff",
                  fontFamily: "var(--font-body)", fontSize: "0.875rem",
                  outline: "none",
                  width: "220px",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,71,251,0.6)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
              />
              <button
                type="submit"
                id="footer-subscribe-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  padding: "0.625rem 1.25rem",
                  background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem",
                  borderRadius: "9999px", border: "none", cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} AutomateAI. All rights reserved. Built with ❤️ for businesses that want to scale.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["Privacy Policy", "Terms", "Refund Policy"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                style={{
                  fontSize: "0.8rem", color: "rgba(255,255,255,0.35)",
                  textDecoration: "none", transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}


