CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  name text NOT NULL,
  path text,
  scroll_depth integer,
  duration_ms integer,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.events TO anon, authenticated;
GRANT SELECT ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events" ON public.events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can read events" ON public.events
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX events_created_at_idx ON public.events (created_at DESC);
CREATE INDEX events_name_idx ON public.events (name);
CREATE INDEX events_session_id_idx ON public.events (session_id);