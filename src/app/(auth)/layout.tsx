import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Sparkles, ShieldCheck, BarChart3, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "AutomateAI | Client Portal",
  description: "Sign in or create your AutomateAI client account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Column: Visual & Value Proposition (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[48%] relative bg-gradient-to-br from-[#0c0620] via-[#1a0f3d] to-[#080315] text-white p-12 xl:p-16 flex-col justify-between overflow-hidden border-r border-slate-800">
        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#F56962]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-[#F56962] p-0.5 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D0722] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#F56962]" />
              </div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              AutomateAI<span className="text-[#F56962]">.</span>
            </span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto py-8 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F56962]" /> Enterprise AI Platform
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Autonomous operations built for modern growth.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Manage your AI agents, review automated workflow runs, and monitor live ROI metrics from a single dashboard.
          </p>

          {/* Value Badges */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Autonomous 24/7 Execution</h4>
                <p className="text-xs text-slate-400 mt-0.5">Custom AI agents handling client support, data analysis & operations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Bank-Grade Data Security</h4>
                <p className="text-xs text-slate-400 mt-0.5">Row-level security, encrypted secrets & granular role permissions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-[#F56962]/20 flex items-center justify-center shrink-0 mt-0.5">
                <BarChart3 className="w-4 h-4 text-[#F56962]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Real-Time Cost & ROI Analytics</h4>
                <p className="text-xs text-slate-400 mt-0.5">Transparent token metrics, execution logs & cost monitoring.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-[#F56962] flex items-center justify-center text-white font-bold text-sm shadow">
            JD
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400 text-xs mb-0.5">
              {"★★★★★"}
            </div>
            <p className="text-xs text-slate-300">
              &ldquo;Cut manual operational overhead by 70% in the first 30 days.&rdquo;
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              Enterprise Operations Leader
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="w-full lg:w-1/2 xl:w-[52%] min-h-screen bg-slate-50 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative overflow-y-auto">
        {/* Top Header */}
        <div className="w-full max-w-md mx-auto flex items-center justify-between pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-200/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to website
          </Link>
          <div className="lg:hidden">
            <Link href="/" className="font-bold text-lg text-slate-900">
              AutomateAI<span className="text-[#F56962]">.</span>
            </Link>
          </div>
        </div>

        {/* Center Content */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {children}
        </div>

        {/* Footer */}
        <div className="w-full max-w-md mx-auto pt-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} AutomateAI Agency. All rights reserved.
        </div>
      </div>
    </div>
  );
}
