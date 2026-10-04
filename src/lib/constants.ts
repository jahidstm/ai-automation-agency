// ============================================================
// APP-WIDE CONSTANTS
// ============================================================

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "AI Automation Agency";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// -------- Navigation --------
export const PUBLIC_NAV = [
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const CLIENT_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Orders", href: "/dashboard/orders", icon: "Package" },
  { label: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
  { label: "Files", href: "/dashboard/files", icon: "FolderOpen" },
  { label: "Payments", href: "/dashboard/payments", icon: "CreditCard" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "BarChart3" },
  { label: "Clients", href: "/admin/clients", icon: "Users" },
  { label: "Orders", href: "/admin/orders", icon: "Package" },
  { label: "Invoices", href: "/admin/invoices", icon: "Receipt" },
  { label: "Messages", href: "/admin/messages", icon: "MessageSquare" },
  { label: "Team", href: "/admin/team", icon: "UserPlus" },
  { label: "AI Tools", href: "/admin/ai-tools", icon: "Bot" },
  { label: "Blog / CMS", href: "/admin/blog", icon: "FileText" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

// -------- Services --------
export const SERVICES = [
  {
    id: "chatbot",
    icon: "Bot",
    title: "AI Support & Lead Bots",
    description: "24/7 autonomous customer support bots powered by RAG — integrates with your website, WhatsApp, and CRM.",
    outcomes: ["Cut support costs by 60%", "Respond in <2 seconds", "Handle 500+ queries/day"],
    startingPrice: 299,
  },
  {
    id: "automation",
    icon: "Zap",
    title: "Workflow Automation",
    description: "End-to-end n8n automations connecting your CRM, email, Google Sheets, invoicing, and beyond.",
    outcomes: ["Save 20+ hours/week", "Zero manual data entry", "Auto-invoice & follow-up"],
    startingPrice: 199,
  },
  {
    id: "data_pipeline",
    icon: "BarChart3",
    title: "Data Pipeline & Dashboards",
    description: "Automated web scraping, data cleaning pipelines, and live Streamlit/Power BI dashboards for decisions.",
    outcomes: ["Real-time intelligence", "1,000s of leads scraped", "Custom KPI dashboards"],
    startingPrice: 249,
  },
];

// -------- How It Works --------
export const HOW_IT_WORKS = [
  { step: 1, icon: "Phone", title: "Free Discovery Call", description: "15-minute call to understand your workflow bottlenecks and business goals." },
  { step: 2, icon: "Map", title: "Custom Blueprint", description: "We design a tailored automation architecture specific to your tech stack." },
  { step: 3, icon: "Code2", title: "Build & Test", description: "Rapid development with rigorous QA testing before anything goes live." },
  { step: 4, icon: "Rocket", title: "Deploy & Handover", description: "We deploy, train your team, and provide ongoing maintenance support." },
];

// -------- Pricing --------
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 299,
    delivery: "7 days",
    description: "Perfect for small businesses automating their first workflow.",
    features: ["1 AI Chatbot or Automation", "Basic CRM integration", "2 revisions", "Email support", "30-day maintenance"],
    highlighted: false,
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: 599,
    delivery: "14 days",
    description: "For growing teams ready to automate multiple workflows.",
    features: ["Up to 3 Automations / Bots", "Full CRM + Email + Sheets sync", "5 revisions", "Priority chat support", "60-day maintenance", "ROI Report included"],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    id: "scale",
    name: "Scale",
    price: 0,
    delivery: "Custom",
    description: "Enterprise-grade AI infrastructure for ambitious teams.",
    features: ["Unlimited automations", "Custom AI agent architecture", "Dedicated account manager", "Unlimited revisions", "6-month maintenance", "Team training included"],
    highlighted: false,
    cta: "Contact Us",
  },
];

// -------- Design Tokens (JS-accessible) --------
export const COLORS = {
  ctaPrimary: "#F56962",
  ctaHover: "#E0534C",
  brandRoyal: "#6347FB",
  brandGold: "#FCB816",
  navyDeep: "#0C344A",
  navySlate: "#1E293B",
  textBody: "#334155",
  textMuted: "#64748B",
  borderClean: "#E2E8F0",
  bgPage: "#FFFFFF",
  bgSubtle: "#F8FAFC",
};
