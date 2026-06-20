
DROP POLICY IF EXISTS "Anyone can update own session page views" ON public.page_views;
REVOKE UPDATE ON public.page_views FROM anon, authenticated;
