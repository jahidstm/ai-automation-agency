"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { User, Lock, Bell, Save, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email_orders: true,
    email_messages: true,
    email_invoices: true,
    email_updates: false,
  });

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-2xl font-bold">
              J
            </div>
            <div>
              <button className="text-sm font-medium text-violet-600 hover:underline">
                Change avatar
              </button>
              <p className="text-xs text-slate-400 mt-0.5">JPG, PNG up to 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", id: "fullName", value: "Jahid Hasan", type: "text" },
              { label: "Email Address", id: "email", value: "jahid@example.com", type: "email" },
              { label: "Company Name", id: "company", value: "", placeholder: "Your company", type: "text" },
              { label: "Phone Number", id: "phone", value: "", placeholder: "+880 1700-000000", type: "tel" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1.5">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  defaultValue={field.value}
                  placeholder={field.placeholder || ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
              saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">Change Password</h3>
          <div className="space-y-4">
            {[
              { label: "Current Password", id: "currentPwd" },
              { label: "New Password", id: "newPwd" },
              { label: "Confirm New Password", id: "confirmPwd" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1.5">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.id}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">Email Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "email_orders", label: "Order Updates", desc: "Get notified when your order status changes" },
              { key: "email_messages", label: "New Messages", desc: "Receive emails when your project manager sends a message" },
              { key: "email_invoices", label: "Invoice & Payment", desc: "Get notified about new invoices and payments" },
              { key: "email_updates", label: "Product Updates", desc: "Occasionally hear about new features and improvements" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                    notifications[key as keyof typeof notifications] ? "bg-violet-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      notifications[key as keyof typeof notifications] ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#F56962] hover:bg-[#e05a53] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
              saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
          </button>
        </div>
      )}
    </div>
  );
}