"use client";

import { useEffect, useRef } from "react";

const CLIENTS = [
  { name: "Shopify", logo: "shopify" },
  { name: "Notion", logo: "notion" },
  { name: "Slack", logo: "slack" },
  { name: "HubSpot", logo: "hubspot" },
  { name: "Zapier", logo: "zapier" },
  { name: "Airtable", logo: "airtable" },
  { name: "Stripe", logo: "stripe" },
  { name: "Intercom", logo: "intercom" },
];

// Simple SVG placeholder logos using text
function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2.5rem",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          transition: "color 0.2s ease",
          userSelect: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748B"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
      >
        {name}
      </span>
    </div>
  );
}

export default function SocialProofStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos -= speed;
      // Reset when half scrolled (since we duplicate the list)
      const totalWidth = track.scrollWidth / 2;
      if (Math.abs(pos) >= totalWidth) {
        pos = 0;
      }
      track.style.transform = `translateX(${pos}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(animate); };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate for infinite scroll
  const allClients = [...CLIENTS, ...CLIENTS];

  return (
    <section
      id="social-proof"
      style={{
        padding: "3rem 0",
        borderTop: "1px solid var(--border-clean)",
        borderBottom: "1px solid var(--border-clean)",
        background: "var(--bg-subtle)",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
          }}
        >
          Powering workflows at companies like
        </p>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, var(--bg-subtle), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, var(--bg-subtle), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          id="logo-scroll-track"
          style={{
            display: "flex",
            alignItems: "center",
            willChange: "transform",
          }}
        >
          {allClients.map((client, index) => (
            <div
              key={`${client.logo}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogoPlaceholder name={client.name} />
              {/* Dot separator */}
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "var(--border-medium)",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
