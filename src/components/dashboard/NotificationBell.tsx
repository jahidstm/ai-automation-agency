"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Bell, X, MessageSquare, Package, FileText, Info } from "lucide-react";
import Link from "next/link";

type Notification = {
  id: string;
  type: "message" | "order_update" | "invoice" | "system";
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const typeIcon = {
  message: MessageSquare,
  order_update: Package,
  invoice: FileText,
  system: Info,
};

const typeColor = {
  message: "text-violet-600 bg-violet-100",
  order_update: "text-emerald-600 bg-emerald-100",
  invoice: "text-orange-600 bg-orange-100",
  system: "text-slate-600 bg-slate-100",
};

export default function NotificationBell() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  // Load notifications
  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setNotifications(data);
    };
    load();
  }, [userId]);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const markAllRead = async () => {
    if (!userId) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-[#F56962] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-11 z-20 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-[#F56962]/10 text-[#F56962] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#F56962] font-semibold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                  <Bell className="w-8 h-8 text-slate-200 mb-2" />
                  <p className="text-sm text-slate-500">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = typeIcon[n.type] ?? Info;
                  const color = typeColor[n.type] ?? typeColor.system;
                  const inner = (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`flex gap-3 px-4 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${
                        !n.is_read ? "bg-[#F56962]/5" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${!n.is_read ? "text-slate-900" : "text-slate-700"}`}>
                          {n.title}
                        </p>
                        {n.body && (
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.body}</p>
                        )}
                        <p className="text-[10px] text-slate-400 mt-1">{formatRelative(n.created_at)}</p>
                      </div>
                      {!n.is_read && (
                        <div className="w-2 h-2 rounded-full bg-[#F56962] flex-shrink-0 mt-1" />
                      )}
                    </div>
                  );

                  return n.link ? (
                    <Link key={n.id} href={n.link} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={n.id}>{inner}</div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}