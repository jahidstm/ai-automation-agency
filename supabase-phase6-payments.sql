-- ============================================================
-- PHASE 6: PAYMENT SYSTEM — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number    TEXT NOT NULL UNIQUE,
  client_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id          UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  description       TEXT NOT NULL,
  amount            NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  currency          TEXT NOT NULL DEFAULT 'usd',
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'unpaid', 'paid', 'overdue', 'cancelled')),
  due_date          DATE,
  stripe_payment_intent_id  TEXT,
  stripe_checkout_session_id TEXT,
  paid_at           TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. payments table (transaction log)
CREATE TABLE IF NOT EXISTS public.payments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id        UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  client_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount            NUMERIC(10, 2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id TEXT NOT NULL,
  stripe_charge_id  TEXT,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. updated_at auto-trigger for invoices
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_invoices_updated_at ON public.invoices;
CREATE TRIGGER set_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. RLS Enable
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies — invoices
-- Clients: own invoices only
DROP POLICY IF EXISTS "Clients can view own invoices" ON public.invoices;
CREATE POLICY "Clients can view own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = client_id);

-- Service role (admin API): full access
DROP POLICY IF EXISTS "Service role full access invoices" ON public.invoices;
CREATE POLICY "Service role full access invoices"
  ON public.invoices FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- 6. RLS Policies — payments
DROP POLICY IF EXISTS "Clients can view own payments" ON public.payments;
CREATE POLICY "Clients can view own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = client_id);

DROP POLICY IF EXISTS "Service role full access payments" ON public.payments;
CREATE POLICY "Service role full access payments"
  ON public.payments FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_stripe_session ON public.invoices(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_intent ON public.payments(stripe_payment_intent_id);

-- 8. Seed sample invoices (optional — for testing, replace UUID with real client user id)
-- INSERT INTO public.invoices (invoice_number, client_id, description, amount, status, due_date)
-- VALUES ('INV-2024-001', '<your-client-user-uuid>', 'AI Chatbot Integration — Initial Deposit', 900.00, 'unpaid', NOW() + INTERVAL '7 days');

SELECT 'Phase 6 payment tables created successfully! ✅' AS result;
