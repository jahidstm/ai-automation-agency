"use client";

import { Menu, Search, Zap, LogOut, X } from "lucide-react";
import NotificationBell from "@/components/dashboard/NotificationBell";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
} from "lucide-react";
import { createClient } from "@/lib/supabase";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog / CMS", icon: BookOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/admin": "Admin Overview",
  "/admin/clients": "Client Management",
  "/admin/orders": "Order Management",
  "/admin/invoices": "Invoice Management",
  "/admin/messages": "Admin Messages",
  "/admin/blog": "Blog & Case Studies CMS",
  "/admin/settings": "Admin Settings",
};

export default function AdminTopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = Object.entries(pageTitles).find(([key]) =>
    key === "/admin" ? pathname === key : pathname.startsWith(key)
  )?.[1] ?? "Admin Panel";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <header
        style={{
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
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              borderRadius: "8px",
              color: "#64748B",
              cursor: "pointer",
            }}
            className="md:hidden"
          >
            <Menu size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F56962, #6347FB)",
                boxShadow: "0 0 8px rgba(245,105,98,0.5)",
              }}
            />
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.025rem",
                color: "#0C344A",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h2>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                background: "#FDEEE9",
                color: "#F56962",
                padding: "2px 7px",
                borderRadius: "6px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Agency Mode
            </span>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search */}
          <button
            style={{
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
            className="hidden sm:flex"
          >
            <Search size={13} />
            <span>Search admin...</span>
          </button>

          <NotificationBell />

          {/* Avatar */}
          <div
            title="Admin Profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F56962 0%, #6347FB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(245,105,98,0.3)",
              flexShrink: 0,
            }}
          >
            A
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            style={{
              position: "relative",
              width: "260px",
              height: "100%",
              background: "linear-gradient(180deg, #0C1929 0%, #0d1f35 100%)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 32px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                height: "64px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #F56962, #6347FB)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap size={15} color="#fff" strokeWidth={2.5} />
                </div>
                <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                  AutomateAI<span style={{ color: "#F56962" }}>.</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "7px",
                  color: "#fff",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <nav style={{ flex: 1, padding: "12px 10px" }}>
              {navItems.map(({ href, label, icon: Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
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
                      background: isActive ? "rgba(245,105,98,0.2)" : "transparent",
                      color: isActive ? "#F56962" : "rgba(255,255,255,0.6)",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  marginBottom: "4px",
                }}
              >
                <LayoutDashboard size={18} />
                Client View
              </Link>
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
                  color: "#f87171",
                  fontSize: "0.875rem",
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
    </>
  );
}
