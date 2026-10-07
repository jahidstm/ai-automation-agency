"use client";

import { useState } from "react";
import { Search, Users, DollarSign, ShoppingBag, Mail, AlertCircle } from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  orderCount: number;
  totalSpent: number;
  outstanding: number;
}

interface Props {
  clients: Client[];
}

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
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-sm text-slate-500 mt-1">Directory of all client accounts, project orders, and financials</p>
        </div>
        <span className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-3.5 py-1.5 rounded-xl shadow-sm">
          {clients.length} clients total
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Clients", value: clients.length.toString(), icon: Users, bg: "bg-violet-50 text-violet-600" },
          { label: "Total Revenue", value: "$" + totalRevenue.toLocaleString(), icon: DollarSign, bg: "bg-emerald-50 text-emerald-600" },
          { label: "Outstanding", value: "$" + totalOutstanding.toLocaleString(), icon: AlertCircle, bg: "bg-red-50 text-[#F56962]" },
        ].map(({ label, value, icon: Icon, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search clients by name or email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">All Registered Clients</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{filtered.length} found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No clients match your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {["Client", "Orders", "Total Spent", "Outstanding", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6347FB] to-[#F56962] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
                          {(c.full_name || c.email || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{c.full_name || "No Name"}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <ShoppingBag size={14} className="text-slate-400" /> {c.orderCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-emerald-600">${c.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${c.outstanding > 0 ? "text-amber-600" : "text-slate-400"}`}>
                        {c.outstanding > 0 ? `$${c.outstanding.toLocaleString()}` : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500">
                        {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${c.email}`}
                          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="Send Email"
                        >
                          <Mail size={16} />
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
