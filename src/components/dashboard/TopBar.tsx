"use client";

import { Menu, Search, X } from "lucide-react";
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
  Zap,
  LogOut,
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
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
        {/* Left: Mobile menu + Page title */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          </div>
        </div>

        {/* Right: Search + Notifications + Avatar */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm hover:bg-slate-100 transition-colors">
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">Search...</span>
          </button>

          {/* Notifications */}
          <NotificationBell />

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
            J
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-[250px] h-full bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-slate-900">
                  AutomateAI<span className="text-[#F56962]">.</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? "bg-violet-50 text-violet-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-violet-600" : "text-slate-400"}`} />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 pb-4 border-t border-slate-100 pt-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}