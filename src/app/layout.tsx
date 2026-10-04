import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Automation Agency | Custom AI Agents & Workflow Automations",
    template: "%s | AI Automation Agency",
  },
  description:
    "We build custom AI agents, workflow automations, and data pipelines that save your business 20+ hours per week. Expert n8n, RAG chatbot & Python automation services.",
  keywords: [
    "AI automation agency",
    "custom AI agents",
    "workflow automation",
    "n8n automation",
    "RAG chatbot",
    "data pipeline",
    "business automation",
  ],
  authors: [{ name: "AI Automation Agency" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AI Automation Agency | Custom AI Agents & Workflow Automations",
    description:
      "We build custom AI agents, workflow automations, and data pipelines that save your business 20+ hours per week.",
    siteName: "AI Automation Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Agency | Custom AI Agents & Workflow Automations",
    description:
      "We build custom AI agents, workflow automations, and data pipelines that save your business 20+ hours per week.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.variable, plusJakartaSans.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-bg-page text-text-body font-body">
        {children}
      </body>
    </html>
  );
}
