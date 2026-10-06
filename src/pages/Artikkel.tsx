import { useState, useEffect } from "react";
import { useParams, Link } from "@/lib/router-compat";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PdfViewer from "@/components/PdfViewer";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  pdf_url: string | null;
  cover_image_url: string | null;
  article_type: string;
  published: boolean;
  created_at: string;
};

const Artikkel = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) console.error(error);
      setArticle(data as Article | null);
      setLoading(false);
    };
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Laster artikkel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Artikkelen ble ikke funnet.</p>
        <Link to="/artikler">
          <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Tilbake til artikler</Button>
        </Link>
      </div>
    );
  }

  const articleUrl = `https://avisafe.no/artikler/${article.slug}`;
  const plainText = (article.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const fallback = `Les ${article.title} på AviSafe – innsikt og veiledning for norske droneoperatører.`;
  const rawDescription = plainText.length >= 50 ? plainText : fallback;
  const description = rawDescription.length > 157 ? `${rawDescription.slice(0, 157).trimEnd()}…` : rawDescription;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    datePublished: article.created_at,
    dateModified: article.created_at,
    ...(article.cover_image_url ? { image: article.cover_image_url } : {}),
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: "AviSafe" },
    publisher: {
      "@type": "Organization",
      name: "AviSafe",
      logo: { "@type": "ImageObject", url: "https://avisafe.no/logo.png" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${article.title} – AviSafe`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        {article.cover_image_url && <meta property="og:image" content={article.cover_image_url} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <header className="border-b bg-card px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/artikler">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Tilbake</Button>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            AviSafe
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
          />
        )}

        <div className="mb-4">
          <span className="text-sm text-muted-foreground">
            {new Date(article.created_at).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{article.title}</h1>

        {article.article_type === 'pdf' && article.pdf_url ? (
          <PdfViewer url={article.pdf_url} title={article.title} />
        ) : (
          <div
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        )}
      </main>
    </div>
  );
};

export default Artikkel;
