-- ============================================================
-- PHASE 7: ADMIN PANEL — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      TEXT NOT NULL UNIQUE,
  client_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  description       TEXT,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled')),
  priority          TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  total_amount      NUMERIC(10, 2) DEFAULT 0,
  deadline          DATE,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. order_milestones table
CREATE TABLE IF NOT EXISTS public.order_milestones (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. blog_posts table (for CMS)
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT,
  cover_image      TEXT,
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id        UUID REFERENCES auth.users(id),
  tags             TEXT[] DEFAULT '{}',
  meta_title       TEXT,
  meta_description TEXT,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. updated_at triggers
DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_blog_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. RLS Enable
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. RLS — orders
DROP POLICY IF EXISTS "Clients can view own orders" ON public.orders;
CREATE POLICY "Clients can view own orders" ON public.orders FOR SELECT USING (auth.uid() = client_id);

DROP POLICY IF EXISTS "Service role full access orders" ON public.orders;
CREATE POLICY "Service role full access orders" ON public.orders FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 7. RLS — order_milestones
DROP POLICY IF EXISTS "Clients can view own milestones" ON public.order_milestones;
CREATE POLICY "Clients can view own milestones" ON public.order_milestones FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.client_id = auth.uid()));

DROP POLICY IF EXISTS "Service role full access milestones" ON public.order_milestones;
CREATE POLICY "Service role full access milestones" ON public.order_milestones FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 8. RLS — blog_posts
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
CREATE POLICY "Public can view published posts" ON public.blog_posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Service role full access blog" ON public.blog_posts;
CREATE POLICY "Service role full access blog" ON public.blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 9. Indexes
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON public.orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_milestones_order_id ON public.order_milestones(order_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON public.blog_posts(status);

SELECT 'Phase 7 admin tables created successfully!' AS result;
