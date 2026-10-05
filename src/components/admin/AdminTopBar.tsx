"use client";

import { Menu, Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/clients": "Client Management",
  "/admin/orders": "Order Management",
  "/admin/invoices": "Invoice Management",
  "/admin/messages": "Messages",
  "/admin/blog": "Blog & Case Studies",
  "/admin/settings": "Settings",
};

export default function AdminTopBar() {
  const pathname = usePathname();
  const title = Object.entries(pageTitles).find(([key]) =>
    key === "/admin" ? pathname === key : pathname.startsWith(key)
  )?.[1] ?? "Admin Panel";

  return (
    <header className="h-16 bg-[#0f0f1a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 rounded-lg text-white/40 hover:bg-white/10">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p className="text-[11px] text-white/30">AutomateAI Agency</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/30 text-sm hover:bg-white/10 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Search...</span>
        </button>
        <button className="relative p-2 rounded-lg text-white/40 hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F56962] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F56962] to-orange-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
          A
        </div>
      </div>
    </header>
  );
}
