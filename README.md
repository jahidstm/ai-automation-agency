# AI Automation Agency

A full-stack agency platform built with Next.js 14, Supabase, Stripe, and AI integrations.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** Next.js API Routes, Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Payments:** Stripe
- **AI:** Groq / OpenAI, n8n automations
- **Hosting:** Vercel + Cloudflare

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/jahidstm/ai-automation-agency.git

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in values in .env.local

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/            # Next.js App Router pages
│   ├── (public)/   # Landing page, blog
│   ├── (auth)/     # Login, register
│   ├── (client)/   # Client dashboard
│   ├── (admin)/    # Admin panel
│   └── api/        # API routes
├── components/     # React components
├── lib/            # Utilities, Supabase, Stripe clients
├── types/          # TypeScript types
├── hooks/          # Custom React hooks
├── store/          # Zustand state
└── styles/         # Global CSS
```

## Build Progress

See [TASK_TRACKER.md](./TASK_TRACKER.md) for full build progress.

## License

Private — All rights reserved.
