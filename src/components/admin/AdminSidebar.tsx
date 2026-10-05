"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, ShoppingBag, FileText, BookOpen, ChevronLeft, ChevronRight, LogOut, Zap, Settings, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
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
    <aside className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#0f0f1a] border-r border-white/5 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F56962] to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-white whitespace-nowrap">AutomateAI</span>
              <span className="block text-[10px] text-orange-400 font-medium tracking-wider uppercase">Admin Panel</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F56962] to-orange-600 flex items-center justify-center mx-auto">
            <Zap className="w-4 h-4 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg text-white/30 hover:bg-white/10 hover:text-white/70 transition-colors ${collapsed ? "absolute -right-3.5 top-5 bg-[#0f0f1a] border border-white/10 shadow-md z-10" : ""}`}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 pt-4 pb-1">
          <span className="text-[10px] font-semibold text-white/25 uppercase tracking-widest">Management</span>
        </div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive ? "bg-[#F56962]/15 text-[#F56962]" : "text-white/40 hover:bg-white/5 hover:text-white/80"}`}
            >
              <Icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? "text-[#F56962]" : "text-white/30 group-hover:text-white/60"}`} />
              {!collapsed && <span>{label}</span>}
              {isActive && !collapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F56962]" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-white/5 pt-3 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:bg-white/5 hover:text-white/60 transition-all group">
          <LayoutDashboard size={18} className="flex-shrink-0 text-white/20 group-hover:text-white/50" />
          {!collapsed && <span>Client View</span>}
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all group">
          <LogOut size={18} className="flex-shrink-0 text-white/20 group-hover:text-red-400" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
