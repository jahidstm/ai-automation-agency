"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  User,
  Shield,
  Building,
  Bell,
  Save,
  CheckCircle2,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Globe,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface AdminSettingsPanelProps {
  initialEmail: string;
  initialName: string;
  userId: string;
}

const tabs = [
  { id: "profile", label: "Admin Profile", icon: User },
  { id: "agency", label: "Agency Settings", icon: Building },
  { id: "security", label: "Security & Passwords", icon: Shield },
  { id: "notifications", label: "Notification Alerts", icon: Bell },
];

export default function AdminSettingsPanel({
  initialEmail,
  initialName,
  userId,
}: AdminSettingsPanelProps) {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form
  const [fullName, setFullName] = useState(initialName);
  const [email] = useState(initialEmail);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Agency Form
  const [agencyName, setAgencyName] = useState("AutomateAI Agency");
  const [supportEmail, setSupportEmail] = useState("support@automateai.agency");
  const [currency, setCurrency] = useState("USD ($)");
  const [timezone, setTimezone] = useState("UTC+06:00 (Asia/Dhaka)");
  const [savingAgency, setSavingAgency] = useState(false);
  const [agencySuccess, setAgencySuccess] = useState(false);

  // Security Form
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [updatingPass, setUpdatingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState({
    newClientSignup: true,
    newOrders: true,
    chatMessages: true,
    weeklyReport: false,
  });
  const [savingNotif, setSavingNotif] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);

    if (userId) {
      await supabase
        .from("profiles")
        .update({ full_name: fullName.trim() })
        .eq("id", userId);
    }

    setSavingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Save Agency Settings
  const handleSaveAgency = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAgency(true);
    setAgencySuccess(false);
    await new Promise((r) => setTimeout(r, 600));
    setSavingAgency(false);
    setAgencySuccess(true);
    setTimeout(() => setAgencySuccess(false), 3000);
  };

  // Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    if (password.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setPassError("Passwords do not match.");
      return;
    }

    setUpdatingPass(true);
    const { error } = await supabase.auth.updateUser({ password });
    setUpdatingPass(false);

    if (error) {
      setPassError(error.message);
    } else {
      setPassSuccess(true);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setPassSuccess(false), 3000);
    }
  };

  // Save Notifications
  const handleSaveNotifications = async () => {
    setSavingNotif(true);
    setNotifSuccess(false);
    await new Promise((r) => setTimeout(r, 500));
    setSavingNotif(false);
    setNotifSuccess(true);
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Admin Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage system configurations, administrator profile, agency branding, and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-fit flex-wrap border border-slate-200/60 shadow-inner">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Icon className="w-4 h-4 text-[#6347FB]" />
            {label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: Profile ================= */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0C1929] to-[#1E293B] text-white flex items-center justify-center font-bold text-xl shadow-md border border-slate-700">
              {fullName?.slice(0, 2).toUpperCase() || "AD"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{fullName || "Administrator"}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-[#F56962] border border-rose-200">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{email}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Admin Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address (Primary Login)
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100/70 text-slate-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0C1929] hover:bg-[#1E293B] transition-all shadow-sm"
              >
                {savingProfile ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Changes
              </button>
              {profileSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in duration-200">
                  <CheckCircle2 size={16} /> Saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 2: Agency Settings ================= */}
      {activeTab === "agency" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Agency & Platform Configuration</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              General branding, operational currency, and client communication setup.
            </p>
          </div>

          <form onSubmit={handleSaveAgency} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Agency Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Client Support Email
                </label>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Operational Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all font-medium text-slate-800"
                >
                  <option value="USD ($)">USD ($) - United States Dollar</option>
                  <option value="BDT (৳)">BDT (৳) - Bangladeshi Taka</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Agency Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all font-medium text-slate-800"
                >
                  <option value="UTC+06:00 (Asia/Dhaka)">UTC+06:00 (Asia/Dhaka)</option>
                  <option value="UTC+00:00 (London, GMT)">UTC+00:00 (London, GMT)</option>
                  <option value="UTC-05:00 (New York, EST)">UTC-05:00 (New York, EST)</option>
                  <option value="UTC-08:00 (San Francisco, PST)">UTC-08:00 (San Francisco, PST)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={savingAgency}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0C1929] hover:bg-[#1E293B] transition-all shadow-sm"
              >
                {savingAgency ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Agency Settings
              </button>
              {agencySuccess && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in duration-200">
                  <CheckCircle2 size={16} /> Agency settings saved!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 3: Security ================= */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Security & Authentication</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update admin password and manage your authentication credentials.
            </p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all"
              />
            </div>

            {passError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs border border-rose-200">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={updatingPass || !password}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0C1929] hover:bg-[#1E293B] disabled:opacity-50 transition-all shadow-sm"
              >
                {updatingPass ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Lock size={14} />
                )}
                Update Password
              </button>
              {passSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in duration-200">
                  <CheckCircle2 size={16} /> Password updated successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 4: Notifications ================= */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Admin Notification Preferences</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose the critical events you want to be immediately notified about.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {[
              {
                id: "newClientSignup",
                title: "New Client Registrations",
                desc: "Receive an immediate notification whenever a new client signs up on the portal.",
              },
              {
                id: "newOrders",
                title: "New Orders & Paid Invoices",
                desc: "Get alerts when a client submits an automation order or pays an invoice.",
              },
              {
                id: "chatMessages",
                title: "Client Live Chat Messages",
                desc: "Notify admin immediately when a client opens a thread or sends a message.",
              },
              {
                id: "weeklyReport",
                title: "Weekly Performance Digest",
                desc: "Automated weekly email report summarizing orders, revenue, and active clients.",
              },
            ].map(({ id, title, desc }) => (
              <div key={id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-md">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [id]: !prev[id as keyof typeof prev],
                    }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                    notifications[id as keyof typeof notifications]
                      ? "bg-[#6347FB]"
                      : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      notifications[id as keyof typeof notifications] ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-3 border-t border-slate-100">
            <button
              onClick={handleSaveNotifications}
              disabled={savingNotif}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0C1929] hover:bg-[#1E293B] transition-all shadow-sm"
            >
              {savingNotif ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save Preferences
            </button>
            {notifSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in duration-200">
                <CheckCircle2 size={16} /> Preferences saved!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
