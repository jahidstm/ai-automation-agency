"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { PUBLIC_NAV } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? "420px" : "0px",
          transition: "max-height 0.35s ease",
          backgroundColor: "#fff",
          borderTop: isOpen ? "1px solid var(--border-clean)" : "none",
        }}
      >
        <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid var(--border-clean)",
                  display: "block",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
            <Link href="/login" onClick={() => setIsOpen(false)} className="btn-ghost" style={{ textAlign: "center" }}>Login</Link>
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{ textAlign: "center" }}>Get Free Proposal</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
