"use client";

import { Menu, Search, X, Zap, LogOut } from "lucide-react";
import NotificationBell from "@/components/dashboard/NotificationBell";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/files", label: "Files", icon: FolderOpen },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/orders": "My Orders",
  "/dashboard/files": "Files & Deliverables",
  "/dashboard/invoices": "Invoices & Billing",
  "/dashboard/messages": "Messages",
  "/dashboard/settings": "Profile & Settings",
};

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = Object.entries(pageTitles).find(([key]) =>
    key === "/dashboard" ? pathname === key : pathname.startsWith(key)
  )?.[1] ?? "Dashboard";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Top Bar */}
      <header style={{
        height: "64px",
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem 0 1rem",
        position: "sticky",
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}>
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            className="topbar-mobile-btn"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              borderRadius: "8px",
              color: "#64748B",
              cursor: "pointer",
              display: "none",
            }}
          >
            <Menu size={20} />
          </button>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <div style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6347FB, #F56962)",
              boxShadow: "0 0 8px rgba(99,71,251,0.5)",
            }} />
            <h2 style={{
              fontWeight: 700,
              fontSize: "1.025rem",
              color: "#0C344A",
              margin: 0,
              letterSpacing: "-0.01em",
            }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search */}
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 14px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "10px",
            color: "#94A3B8",
            fontSize: "0.8125rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            className="search-btn-desktop"
          >
            <Search size={13} />
            <span>Search...</span>
          </button>

          <NotificationBell />

          {/* Avatar */}
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6347FB 0%, #F56962 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(99,71,251,0.3)",
            flexShrink: 0,
          }}>
            J
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <aside style={{
            position: "relative",
            width: "260px",
            height: "100%",
            background: "linear-gradient(180deg, #0C1929 0%, #0d1f35 100%)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 32px rgba(0,0,0,0.4)",
          }}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              height: "64px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #6347FB, #F56962)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Zap size={15} color="#fff" strokeWidth={2.5} />
                </div>
                <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                  AutomateAI<span style={{ color: "#F56962" }}>.</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "7px",
                  color: "#fff",
                  width: "32px", height: "32px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "12px 10px" }}>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      marginBottom: "2px",
                      textDecoration: "none",
                      background: isActive ? "rgba(99,71,251,0.2)" : "transparent",
                      color: isActive ? "#a78bfa" : "rgba(255,255,255,0.55)",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.875rem",
                      border: isActive ? "1px solid rgba(99,71,251,0.2)" : "1px solid transparent",
                    }}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        .topbar-mobile-btn { display: none !important; }
        .search-btn-desktop { display: flex !important; }
        @media (max-width: 767px) {
          .topbar-mobile-btn { display: flex !important; }
          .search-btn-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
