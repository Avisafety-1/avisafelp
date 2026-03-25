
CREATE TABLE public.ai_search_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_search_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.ai_search_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON public.ai_search_logs
  FOR SELECT TO authenticated
  USING (true);
