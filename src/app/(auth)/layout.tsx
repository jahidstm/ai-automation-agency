import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | AI Automation Agency",
  description: "Sign in to your AI Automation Agency client dashboard.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
}