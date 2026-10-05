"use client";

import { useState } from "react";
import { Search, Users, DollarSign, ShoppingBag, Mail, ExternalLink, AlertCircle } from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  orderCount: number;
  totalSpent: number;
  outstanding: number;
}

interface Props { clients: Client[] }

export default function AdminClientsPanel({ clients }: Props) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      (c.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = clients.reduce((a, c) => a + c.totalSpent, 0);
  const totalOutstanding = clients.reduce((a, c) => a + c.outstanding, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Client Management</h1>
          <p className="text-sm text-white/40 mt-0.5">{clients.length} clients total</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Clients", value: clients.length.toString(), icon: Users, color: "from-violet-500 to-violet-700" },
          { label: "Total Revenue", value: "$" + totalRevenue.toLocaleString(), icon: DollarSign, color: "from-emerald-500 to-teal-600" },
          { label: "Outstanding", value: "$" + totalOutstanding.toLocaleString(), icon: AlertCircle, color: "from-[#F56962] to-orange-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search clients by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#F56962]/50"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">All Clients</h2>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No clients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Client", "Orders", "Total Spent", "Outstanding", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {(c.full_name || c.email)[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/80">{c.full_name || "No Name"}</p>
                          <p className="text-xs text-white/30">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-white/60">
                        <ShoppingBag size={14} className="text-white/30" /> {c.orderCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-emerald-400">${c.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${c.outstanding > 0 ? "text-[#F56962]" : "text-white/30"}`}>
                        {c.outstanding > 0 ? `$${c.outstanding.toLocaleString()}` : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/30">
                        {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${c.email}`} className="p-1.5 rounded-lg text-white/30 hover:bg-white/10 hover:text-white/70 transition-colors" title="Send Email">
                          <Mail size={14} />
                        </a>
                        <a href={`/admin/clients/${c.id}`} className="p-1.5 rounded-lg text-white/30 hover:bg-white/10 hover:text-white/70 transition-colors" title="View Profile">
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
