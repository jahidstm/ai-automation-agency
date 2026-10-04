# 🗂️ AI Automation Agency — Task Tracker
> **GitHub:** https://github.com/jahidstm/ai-automation-agency
> **Brand Name:** TBD (পরে ঠিক হবে)
> **Last Updated:** October 2026

---

## 📊 Overall Progress

| Phase | Name | Status | Progress |
|-------|------|--------|----------|
| 0 | Project Setup & Foundation | ✅ Complete | 5/5 |
| 1 | Design System & Global Styles | ✅ Complete | 4/4 |
| 2 | Landing Page (Public) | 🔄 In Progress | 8/12 |
| 3 | Authentication & User Roles | ⬜ Pending | 0/4 |
| 4 | Client Dashboard | ⬜ Pending | 0/6 |
| 5 | Real-Time Messaging | ⬜ Pending | 0/4 |
| 6 | Payment System (Stripe) | ⬜ Pending | 0/4 |
| 7 | Admin Panel | ⬜ Pending | 0/5 |
| 8 | AI Tools Integration | ⬜ Pending | 0/4 |
| 9 | Team Management | ⬜ Pending | 0/4 |
| 10 | SEO, Analytics & Polish | ⬜ Pending | 0/4 |
| 11 | Deployment & Go Live | ⬜ Pending | 0/4 |

**Legend:** ✅ Complete | 🔄 In Progress | ⬜ Pending | 👤 User Task | 🤖 AI Task

---

---

## ✅ PHASE 0 — Project Setup & Foundation
> **Goal:** Local environment ready, Next.js project initialized, repo connected.
> **Commit Prefix:** `feat(setup):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 0.1 | Clone GitHub repo `ai-automation-agency` | 🤖 AI | ✅ Complete | — |
| 0.2 | Initialize Next.js 14 (TypeScript + Tailwind + App Router + src/) | 🤖 AI | ✅ Complete | — |
| 0.3 | Install core dependencies (Shadcn/UI, Framer Motion, Recharts, Zustand, React Query) | 🤖 AI | 🔄 In Progress | — |
| 0.4 | Create base folder structure (components, lib, hooks, types, styles) | 🤖 AI | ⬜ Pending | — |
| 0.5 | Add `.env.example`, `.gitignore`, README & push initial commit | 🤖 AI | ⬜ Pending | `feat(setup): initialize Next.js project` |

---

## ✅ PHASE 1 — Design System & Global Styles
> **Goal:** HigherVisibility-inspired color tokens, Poppins typography, reusable base components all configured in one place.
> **Commit Prefix:** `feat(design):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 1.1 | Add Poppins + Plus Jakarta Sans via Google Fonts, configure layout.tsx | 🤖 AI | ✅ Complete | eat(design): add fonts & layout |
| 1.2 | Create CSS design token variables (colors, spacing, radius, shadows) in globals.css | 🤖 AI | ✅ Complete | eat(design): add CSS design tokens |
| 1.3 | Configure Tailwind theme with brand tokens in globals.css | 🤖 AI | ✅ Complete | eat(design): extend tailwind theme |
| 1.4 | Initialize Shadcn/UI + install: Button, Card, Badge, Input, Dialog, Tabs, Accordion, Dropdown components | 🤖 AI | ✅ Complete | eat(design): setup shadcn/ui components |

---

## 🔄 PHASE 2 — Landing Page (All Public Sections)
> **Goal:** A stunning, high-converting public-facing website inspired by HigherVisibility.com.
> **Commit Prefix:** `feat(landing):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 2.1 | **Navbar** — Logo placeholder, nav links, "Get Free Proposal" coral CTA, mobile hamburger menu | 🤖 AI | ✅ Complete | `feat(landing): navbar` |
| 2.2 | **Hero Section** — Bold heading (Poppins), star rating pill, dual CTAs, lead audit input bar, floating trust badges | 🤖 AI | ✅ Complete | `feat(landing): hero section` |
| 2.3 | **Social Proof / Logo Strip** — Grayscale client logo cloud (placeholder logos), animated scroll | 🤖 AI | ✅ Complete | `feat(landing): social proof strip` |
| 2.4 | **Services Cards** — 3 cards: AI Chatbot, Workflow Automation, Data Pipeline with pricing & outcome badges | 🤖 AI | ✅ Complete | `feat(landing): services section` |
| 2.5 | **How It Works** — 4-step horizontal animated timeline | 🤖 AI | ✅ Complete | `feat(landing): how it works` |
| 2.6 | **Live Chatbot Demo Widget** — Embedded AI chat UI (static mock first, API later in Phase 8) | 🤖 AI | ✅ Complete | `feat(landing): chatbot demo widget` |
| 2.7 | **ROI Calculator** — Interactive sliders (team size, hours/day) → animated money/time saved counter | 🤖 AI | ✅ Complete | `feat(landing): roi calculator` |
| 2.8 | **Case Studies / Portfolio** — 3 project cards with Problem→Result metrics | 🤖 AI | ✅ Complete | `feat(landing): case studies` |
| 2.9 | **Pricing Table** — 3 tiers (Starter / Growth / Scale), coral "Most Popular" badge on Growth | 🤖 AI | ⬜ Pending | `feat(landing): pricing table` |
| 2.10 | **Testimonials Section** — Scrolling review cards with stars + client name | 🤖 AI | ⬜ Pending | `feat(landing): testimonials` |
| 2.11 | **Final CTA Strip** — Deep navy background, bold heading, coral CTA button | 🤖 AI | ⬜ Pending | `feat(landing): final cta strip` |
| 2.12 | **Footer** — Logo, service links, newsletter input, social icons, copyright | 🤖 AI | ⬜ Pending | `feat(landing): footer` |

---

## ⬜ PHASE 3 — Authentication & User Roles
> **Goal:** Secure login system with role-based routing (Client vs Admin vs Team).

### 👤 User Tasks (আপনাকে করতে হবে):
> **Step 1:** [supabase.com](https://supabase.com)-এ গিয়ে নতুন project তৈরি করুন (Free tier)
> **Step 2:** Project Settings → API থেকে `Project URL` এবং `anon public key` কপি করুন
> **Step 3:** Authentication → Providers → Email চালু রাখুন, "Enable email confirmations" OFF করুন (dev-এর জন্য)
> **Step 4:** `.env.local` ফাইলে paste করুন:
> ```
> NEXT_PUBLIC_SUPABASE_URL=your_project_url
> NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
> ```

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 3.1 | Install Supabase client + create `lib/supabase.ts` config | 🤖 AI | ⬜ Pending | `feat(auth): supabase client setup` |
| 3.2 | Create DB tables: `profiles`, `roles` — Run SQL in Supabase → trigger on `auth.users` | 🤖 AI | ⬜ Pending | `feat(auth): db schema profiles` |
| 3.3 | Build Login page (`/login`) + Register page (`/register`) — Magic Link + Email/Password | 🤖 AI | ⬜ Pending | `feat(auth): login register pages` |
| 3.4 | Add `middleware.ts` — Protected routes: `/dashboard/*` → client, `/admin/*` → admin only | 🤖 AI | ⬜ Pending | `feat(auth): protected route middleware` |

---

## ⬜ PHASE 4 — Client Dashboard
> **Goal:** Full Fiverr-level client portal where clients track everything.
> **Commit Prefix:** `feat(client-dash):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 4.1 | Dashboard Shell Layout — White sidebar (250px) + top navbar + content area | 🤖 AI | ⬜ Pending | `feat(client-dash): layout shell` |
| 4.2 | Overview Page — Welcome banner, 4 KPI stat cards, active order card with milestone stepper | 🤖 AI | ⬜ Pending | `feat(client-dash): overview page` |
| 4.3 | My Orders Page — Order list with status badges, order detail view with full milestone timeline + Loom embed | 🤖 AI | ⬜ Pending | `feat(client-dash): orders page` |
| 4.4 | Files & Deliverables — Categorized file vault (Supabase Storage), preview + download | 🤖 AI | ⬜ Pending | `feat(client-dash): file locker` |
| 4.5 | Invoices & Billing — Invoice list, PDF preview, payment status badges, "Pay Now" button stub | 🤖 AI | ⬜ Pending | `feat(client-dash): invoices page` |
| 4.6 | Profile & Settings — Edit profile, password change, notification preferences | 🤖 AI | ⬜ Pending | `feat(client-dash): profile settings` |

---

## ⬜ PHASE 5 — Real-Time Messaging System
> **Goal:** Fiverr-level live messaging between client and admin with file sharing.
> **Commit Prefix:** `feat(messaging):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 5.1 | Supabase: Create `messages` table + enable Realtime on it + RLS policies | 🤖 AI | ⬜ Pending | `feat(messaging): supabase realtime setup` |
| 5.2 | Build Messaging UI — Conversation list panel + chat window (read receipts, typing indicator, timestamps) | 🤖 AI | ⬜ Pending | `feat(messaging): messaging ui` |
| 5.3 | File attachment in messages — Upload to Supabase Storage, render preview in chat | 🤖 AI | ⬜ Pending | `feat(messaging): file attachments` |
| 5.4 | Notification System — Bell icon unread count (Realtime), email notification via Resend on new message | 🤖 AI | ⬜ Pending | `feat(messaging): notifications` |

---

## ⬜ PHASE 6 — Payment System (Stripe)
> **Goal:** Full invoice → checkout → confirmation payment flow.
> **Commit Prefix:** `feat(payments):`

### 👤 User Tasks (আপনাকে করতে হবে):
> **Step 1:** [stripe.com](https://stripe.com) এ account খুলুন
> **Step 2:** Developers → API Keys থেকে `Publishable Key` ও `Secret Key` কপি করুন
> **Step 3:** `.env.local`-এ add করুন:
> ```
> NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
> STRIPE_SECRET_KEY=sk_test_...
> STRIPE_WEBHOOK_SECRET=whsec_...
> ```
> **Step 4:** Stripe Dashboard → Webhooks → endpoint add করুন: `https://yourdomain.com/api/webhooks/stripe`
> (Vercel deploy-এর পরে করতে পারবেন, localhost-এও Stripe CLI দিয়ে test করা যায়)

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 6.1 | Install Stripe SDK + create `lib/stripe.ts` + `invoices` table in Supabase | 🤖 AI | ⬜ Pending | `feat(payments): stripe setup` |
| 6.2 | Invoice creation API (`/api/invoices/create`) — Admin creates invoice → saves to DB | 🤖 AI | ⬜ Pending | `feat(payments): invoice create api` |
| 6.3 | Stripe Checkout Session API (`/api/checkout`) → client clicks "Pay Now" → Stripe hosted page | 🤖 AI | ⬜ Pending | `feat(payments): stripe checkout` |
| 6.4 | Stripe Webhook handler (`/api/webhooks/stripe`) → `payment_intent.succeeded` → update invoice status in DB | 🤖 AI | ⬜ Pending | `feat(payments): webhook handler` |

---

## ⬜ PHASE 7 — Admin Panel
> **Goal:** Full agency operations portal — manage clients, orders, invoices, content.
> **Commit Prefix:** `feat(admin):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 7.1 | Admin Dashboard Overview — Revenue KPI cards, revenue chart (Recharts), leads pipeline, activity feed | 🤖 AI | ⬜ Pending | `feat(admin): dashboard overview` |
| 7.2 | Client Management — Client list table, client profile (orders, total spent), invite link, private notes | 🤖 AI | ⬜ Pending | `feat(admin): client management` |
| 7.3 | Order Management — Create/edit orders, update milestones, deliver, file upload, Loom video add | 🤖 AI | ⬜ Pending | `feat(admin): order management` |
| 7.4 | Invoice Management — Create invoice, set amount/due date, generate PDF, track payment status | 🤖 AI | ⬜ Pending | `feat(admin): invoice management` |
| 7.5 | Blog / Case Study CMS — Write, publish, schedule blog posts + case studies (SEO fields) | 🤖 AI | ⬜ Pending | `feat(admin): blog cms` |

---

## ⬜ PHASE 8 — AI Tools Integration
> **Goal:** Embed AI superpowers into admin dashboard and landing page.
> **Commit Prefix:** `feat(ai-tools):`

### 👤 User Tasks (আপনাকে করতে হবে):
> **Step 1:** [platform.openai.com](https://platform.openai.com) বা [console.groq.com](https://console.groq.com) (ফ্রি) তে API key নিন
> **Step 2:** `.env.local`-এ add করুন:
> ```
> OPENAI_API_KEY=sk-...
> # অথবা GROQ ব্যবহার করলে:
> GROQ_API_KEY=gsk_...
> ```

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 8.1 | AI Reply Assistant — Admin message panel-এ incoming message দেখালে AI draft reply দেখাবে (1-click send) | 🤖 AI | ⬜ Pending | `feat(ai-tools): ai reply assistant` |
| 8.2 | Proposal Generator — Admin-এ client requirement input দিলে AI full proposal draft করবে | 🤖 AI | ⬜ Pending | `feat(ai-tools): proposal generator` |
| 8.3 | Email Writer (Cold Outreach) — Prospect info দিলে AI personalized cold email draft করবে | 🤖 AI | ⬜ Pending | `feat(ai-tools): email writer` |
| 8.4 | Live Chatbot Demo (RAG) — Landing page-এ embed করা chatbot-এ real AI response চালু করা (Groq API) | 🤖 AI | ⬜ Pending | `feat(ai-tools): live chatbot rag` |

---

## ⬜ PHASE 9 — Team Management
> **Goal:** Scalable multi-role team system for when you hire your first team member.
> **Commit Prefix:** `feat(team):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 9.1 | `team_members` table + Role schema (Super Admin / Admin / PM / Developer) | 🤖 AI | ⬜ Pending | `feat(team): schema and roles` |
| 9.2 | Team Invite System — Send email invite → invite link → accept → create account with role | 🤖 AI | ⬜ Pending | `feat(team): invite system` |
| 9.3 | Task Assignment — Order-এর ভেতরে specific task একজন team member-কে assign করা | 🤖 AI | ⬜ Pending | `feat(team): task assignment` |
| 9.4 | Internal Team Messaging — Team-only chat (ক্লায়েন্ট দেখতে পাবে না) | 🤖 AI | ⬜ Pending | `feat(team): internal messaging` |

---

## ⬜ PHASE 10 — SEO, Analytics & Polish
> **Goal:** Production-ready quality with SEO, performance, and full mobile responsiveness.
> **Commit Prefix:** `feat(polish):`

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 10.1 | SEO — `metadata` object for every page, OG images, structured data (JSON-LD) | 🤖 AI | ⬜ Pending | `feat(polish): seo metadata` |
| 10.2 | Analytics — Plausible.io বা Vercel Analytics integration (cookie-free, GDPR safe) | 🤖 AI | ⬜ Pending | `feat(polish): analytics` |
| 10.3 | Performance — Image optimization (next/image), lazy loading, bundle analysis | 🤖 AI | ⬜ Pending | `feat(polish): performance optimize` |
| 10.4 | Mobile Responsiveness Audit — সব page ও dashboard mobile-এ ঠিকঠাক দেখা যাচ্ছে কিনা fix করা | 🤖 AI | ⬜ Pending | `feat(polish): mobile responsive` |

---

## ⬜ PHASE 11 — Deployment & Go Live 🚀
> **Goal:** Website live with custom domain and production Supabase.
> **Commit Prefix:** `feat(deploy):`

### 👤 User Tasks (আপনাকে করতে হবে):
> **Step 1:** [vercel.com](https://vercel.com) এ account খুলুন → "Import Git Repository" → `ai-automation-agency` select করুন
> **Step 2:** Vercel Dashboard → Settings → Environment Variables-এ সব `.env.local` keys add করুন
> **Step 3:** Namecheap (GitHub Student Pack) থেকে ডোমেইন নিন (`.me` বা `.tech`)
> **Step 4:** Vercel → Domains-এ custom domain add করুন → Namecheap DNS-এ Vercel nameservers set করুন

| # | Sub-Task | Executor | Status | Commit |
|---|----------|----------|--------|--------|
| 11.1 | Production Supabase setup — নতুন Production project (free tier) তৈরি, schema migrate করুন | 🤖 AI guide + 👤 User action | ⬜ Pending | — |
| 11.2 | Vercel deployment — GitHub-এর সাথে auto-deploy connect করুন | 👤 User (guide: Phase 11 notes) | ⬜ Pending | — |
| 11.3 | Domain configuration — Namecheap domain → Vercel DNS setup | 👤 User (guide: Phase 11 notes) | ⬜ Pending | — |
| 11.4 | Final smoke test — সব flow test করুন: Login → Order → Message → Pay → Admin | 🤖 AI + 👤 User | ⬜ Pending | `feat(deploy): production ready` |

---

## 📌 Rules & Conventions

### Git Commit Prefix Guide:
```
feat(setup):      → Project setup, dependencies
feat(design):     → Design system, styles
feat(landing):    → Landing page sections
feat(auth):       → Authentication, roles
feat(client-dash):→ Client dashboard pages
feat(messaging):  → Messaging system
feat(payments):   → Stripe payment flow
feat(admin):      → Admin panel features
feat(ai-tools):   → AI integrations
feat(team):       → Team management
feat(polish):     → SEO, performance, responsive
feat(deploy):     → Deployment tasks
fix:              → Bug fixes
```

### Branch Strategy:
```
main       → Always deployable, production code
dev        → Active development (আমরা এখানেই কাজ করব)
```

### Environment Files:
```
.env.local        → Never commit (gitignored)
.env.example      → Keys list with empty values (committed)
```

---

## 🔑 Required Accounts Checklist (আপনার কাজ)
- [ ] [Supabase.com](https://supabase.com) — Free account ✅ (Phase 3-এর আগে)
- [ ] [Stripe.com](https://stripe.com) — Free account ✅ (Phase 6-এর আগে)
- [ ] [Vercel.com](https://vercel.com) — Free account ✅ (Phase 11-এর আগে)
- [ ] [Cal.com](https://cal.com) — Meeting booking (landing page CTA-র জন্য)
- [ ] [Groq.com](https://console.groq.com) — Free LLM API key (Phase 8-এর আগে)
- [ ] [Resend.dev](https://resend.dev) — Email notification API (Phase 5-এর আগে)
- [ ] GitHub Student Pack domain (Namecheap) — Claim করুন

---

*এই tracker প্রতিটি sub-phase complete হওয়ার পর আপডেট করা হবে।*



