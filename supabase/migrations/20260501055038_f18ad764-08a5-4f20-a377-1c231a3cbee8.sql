
-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  pdf_url TEXT,
  cover_image_url TEXT,
  article_type TEXT NOT NULL DEFAULT 'richtext' CHECK (article_type IN ('richtext', 'pdf')),
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can read published articles"
ON public.articles FOR SELECT
USING (published = true);

-- Authenticated users can read all their own articles (including drafts)
CREATE POLICY "Authors can read own articles"
ON public.articles FOR SELECT
TO authenticated
USING (auth.uid() = author_id);

-- Authenticated users can create articles
CREATE POLICY "Authenticated users can create articles"
ON public.articles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

-- Authors can update own articles
CREATE POLICY "Authors can update own articles"
ON public.articles FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

-- Authors can delete own articles
CREATE POLICY "Authors can delete own articles"
ON public.articles FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for article assets (images and PDFs)
INSERT INTO storage.buckets (id, name, public) VALUES ('article-assets', 'article-assets', true);

-- Anyone can view article assets
CREATE POLICY "Anyone can view article assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-assets');

-- Authenticated users can upload article assets
CREATE POLICY "Authenticated users can upload article assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-assets');

-- Authenticated users can update their uploads
CREATE POLICY "Authenticated users can update article assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'article-assets');

-- Authenticated users can delete their uploads
CREATE POLICY "Authenticated users can delete article assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'article-assets');
