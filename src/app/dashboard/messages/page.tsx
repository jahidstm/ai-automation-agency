import type { Metadata } from "next";
import { MessageSquare, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center mb-5">
        <MessageSquare className="w-10 h-10 text-violet-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Messaging Coming Soon</h2>
      <p className="text-slate-500 text-sm max-w-sm mb-6">
        Real-time messaging with your project manager is coming in Phase 5. 
        In the meantime, reach us via email.
      </p>
      <a
        href="mailto:hello@automateai.com"
        className="flex items-center gap-2 bg-[#F56962] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e05a53] transition-colors"
      >
        Email Us <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}