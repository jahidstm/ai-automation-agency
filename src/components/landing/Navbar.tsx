"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { PUBLIC_NAV } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        id="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--border-clean)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-card)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
            padding: "0 1.5rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            id="navbar-logo"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px -2px rgba(99, 71, 251, 0.30)",
                flexShrink: 0,
              }}
            >
              <Zap size={20} color="#fff" strokeWidth={2.5} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "var(--navy-deep)",
                letterSpacing: "-0.02em",
              }}
            >
              AutomateAI<span style={{ color: "#F56962" }}>.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-desktop">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6347FB"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/login"
              id="nav-login-btn"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--text-body)",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6347FB"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; }}
            >
              Login
            </Link>
            <Link href="/#contact" id="nav-cta-btn" className="btn-primary" style={{ fontSize: "0.9rem", padding: "0.6rem 1.4rem" }}>
              Get Free Proposal
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="nav-mobile"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--navy-deep)",
              padding: "0.5rem",
              display: "flex",
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(12, 52, 74, 0.55)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Slide-in Panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(180deg, #0C1929 0%, #111827 100%)",
              padding: "0",
              boxShadow: "0 24px 48px -8px rgba(0,0,0,0.5)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Header row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              height: "70px",
            }}>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              >
                <span style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #6347FB 0%, #F56962 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Zap size={18} color="#fff" strokeWidth={2.5} />
                </span>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}>
                  AutomateAI<span style={{ color: "#F56962" }}>.</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav Links */}
            <nav style={{ padding: "1rem 1.5rem 0" }}>
              {PUBLIC_NAV.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 0",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    borderBottom: i < PUBLIC_NAV.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                >
                  {item.label}
                  <ArrowRight size={16} style={{ opacity: 0.4 }} />
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div style={{ padding: "1.25rem 1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                Login to Dashboard
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #F56962 0%, #fa7c76 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px -4px rgba(245, 105, 98, 0.5)",
                }}
              >
                Get Free Proposal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
