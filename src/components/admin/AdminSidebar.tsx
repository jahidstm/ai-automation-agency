"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  Settings,
  MessageSquare,
  ShieldAlert,
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: collapsed ? "72px" : "240px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0C1929 0%, #0d1f35 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "none",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        flexShrink: 0,
        position: "sticky",
        top: 0,
      }}
      className="md-admin-sidebar"
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 12px" : "0 16px",
          height: "64px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #F56962 0%, #6347FB 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(245,105,98,0.4)",
                flexShrink: 0,
              }}
            >
              <Zap size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#fff",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                }}
              >
                AutomateAI<span style={{ color: "#F56962" }}>.</span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "6px",
                  fontSize: "9px",
                  fontWeight: 700,
                  background: "rgba(245,105,98,0.2)",
                  color: "#F56962",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  verticalAlign: "middle",
                }}
              >
                Admin
              </span>
            </div>
          </Link>
        )}

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            title="Expand sidebar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #F56962 0%, #6347FB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(245,105,98,0.3)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Zap size={16} color="#fff" strokeWidth={2.5} />
          </button>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            title="Collapse sidebar"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "rgba(255,255,255,0.6)",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: collapsed ? "0" : "12px",
                justifyContent: collapsed ? "center" : "flex-start",
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "2px",
                textDecoration: "none",
                background: isActive
                  ? "linear-gradient(135deg, rgba(245,105,98,0.22) 0%, rgba(99,71,251,0.18) 100%)"
                  : "transparent",
                border: isActive ? "1px solid rgba(245,105,98,0.3)" : "1px solid transparent",
                color: isActive ? "#F56962" : "rgba(255,255,255,0.55)",
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.875rem",
                transition: "all 0.18s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.color = "rgba(255,255,255,0.85)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "rgba(255,255,255,0.55)";
                }
              }}
            >
              <Icon
                size={18}
                style={{
                  flexShrink: 0,
                  color: isActive ? "#F56962" : "rgba(255,255,255,0.45)",
                }}
              />
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
              {isActive && !collapsed && (
                <span
                  style={{
                    marginLeft: "auto",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#F56962",
                    boxShadow: "0 0 8px #F56962",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions: Client View & Logout */}
      <div
        style={{
          padding: "12px 10px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? "0" : "12px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
            padding: "9px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.08)";
            el.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.04)";
            el.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          {collapsed ? (
            <ChevronRight size={16} style={{ flexShrink: 0 }} />
          ) : (
            <>
              <ChevronLeft size={16} style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: "nowrap" }}>Collapse sidebar</span>
            </>
          )}
        </button>
        <Link
          href="/dashboard"
          title={collapsed ? "Client View" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? "0" : "12px",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: "9px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(99,71,251,0.15)";
            el.style.color = "#a78bfa";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <LayoutDashboard size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Client View</span>}
        </Link>

        <button
          onClick={handleLogout}
          title={collapsed ? "Sign out" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? "0" : "12px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
            padding: "9px 12px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(239, 68, 68, 0.12)";
            el.style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      <style jsx>{`
        .md-admin-sidebar { display: none !important; }
        @media (min-width: 768px) {
          .md-admin-sidebar { display: flex !important; }
        }
      `}</style>
    </aside>
  );
}
