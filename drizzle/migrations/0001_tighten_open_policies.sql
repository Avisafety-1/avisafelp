DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.ai_search_logs;
CREATE POLICY "Allow anonymous inserts" ON public.ai_search_logs FOR INSERT TO anon, authenticated
WITH CHECK (char_length(query) BETWEEN 1 AND 1000);
DROP POLICY IF EXISTS "Allow authenticated select" ON public.ai_search_logs;
CREATE POLICY "Admins can read search logs" ON public.ai_search_logs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT TO anon, authenticated
WITH CHECK (char_length(path) BETWEEN 1 AND 2048 AND (duration_ms IS NULL OR duration_ms BETWEEN 0 AND 86400000));

DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;
CREATE POLICY "Anyone can insert events" ON public.events FOR INSERT TO anon, authenticated
WITH CHECK (char_length(name) BETWEEN 1 AND 200 AND (path IS NULL OR char_length(path) <= 2048)
  AND (scroll_depth IS NULL OR scroll_depth BETWEEN 0 AND 100) AND (duration_ms IS NULL OR duration_ms BETWEEN 0 AND 86400000));

DROP POLICY IF EXISTS "Authenticated users can upload article assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update article assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete article assets" ON storage.objects;
CREATE POLICY "Owners can upload article assets" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'article-assets' AND owner_id = (select auth.uid())::text);
CREATE POLICY "Owners can update article assets" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'article-assets' AND owner_id = (select auth.uid())::text)
WITH CHECK (bucket_id = 'article-assets' AND owner_id = (select auth.uid())::text);
CREATE POLICY "Owners can delete article assets" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'article-assets' AND owner_id = (select auth.uid())::text);