import { useState, useEffect, useMemo } from "react";
import { Link } from "@/lib/router-compat";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, Plus, LogIn, LogOut, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ArticleEditor from "@/components/ArticleEditor";
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

const Artikler = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [user]);

  const fetchArticles = async () => {
    setLoading(true);
    let query = supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (!user) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) console.error(error);
    const list = (data as Article[]) || [];
    setArticles(list);
    setSelectedId(prev => prev && list.some(a => a.id === prev) ? prev : (list[0]?.id ?? null));
    setLoading(false);
  };

  const selected = useMemo(
    () => articles.find(a => a.id === selectedId) ?? null,
    [articles, selectedId]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    else setShowLogin(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowEditor(false);
    setEditingArticle(null);
  };

  const handleSaved = () => {
    setShowEditor(false);
    setEditingArticle(null);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne artikkelen?")) return;
    await supabase.from("articles").delete().eq("id", id);
    if (selectedId === id) setSelectedId(null);
    fetchArticles();
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        <ArticleEditor
          article={editingArticle}
          onSaved={handleSaved}
          onCancel={() => { setShowEditor(false); setEditingArticle(null); }}
        />
      </div>
    );
  }

  const Sidebar = (
    <nav className="h-full flex flex-col bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide text-muted-foreground">Artikler</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {articles.length === 0 && (
          <p className="text-sm text-muted-foreground px-3 py-2">Ingen artikler ennå</p>
        )}
        {articles.map(a => {
          const isActive = a.id === selectedId;
          return (
            <button
              key={a.id}
              onClick={() => { setSelectedId(a.id); setMobileNavOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
            >
              <div className="line-clamp-2 font-medium">{a.title}</div>
              <div className={`text-xs mt-0.5 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {new Date(a.created_at).toLocaleDateString('nb-NO')}
                {!a.published && " · utkast"}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Artikler – AviSafe</title>
        <link rel="canonical" href="https://avisafe.no/artikler" />
        <meta name="description" content="Artikler og innsikt om droneoperasjoner, sikkerhet og regelverk fra AviSafe." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Artikler",
          url: "https://avisafe.no/artikler",
          inLanguage: "nb-NO",
          isPartOf: { "@type": "WebSite", name: "AviSafe", url: "https://avisafe.no" },
          hasPart: articles.filter(a => a.published).map(a => ({
            "@type": "Article",
            headline: a.title,
            url: `https://avisafe.no/artikler/${a.slug}`,
            datePublished: a.created_at,
            ...(a.cover_image_url ? { image: a.cover_image_url } : {}),
          })),
        })}</script>
      </Helmet>
      {/* Header */}
      <header className="border-b bg-card px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Åpne meny">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            AviSafe
          </Link>
          <span className="text-muted-foreground mx-1">/</span>
          <h2 className="text-lg font-semibold text-foreground">Artikler</h2>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button onClick={() => { setEditingArticle(null); setShowEditor(true); }} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Ny artikkel
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logg ut">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setShowLogin(!showLogin)}>
              <LogIn className="h-4 w-4 mr-1" /> Logg inn
            </Button>
          )}
        </div>
      </header>

      {showLogin && !user && (
        <div className="px-4 sm:px-6 py-3 border-b bg-muted/30">
          <form onSubmit={handleLogin} className="flex items-center gap-2 max-w-md">
            <Input type="email" placeholder="E-post" value={email} onChange={e => setEmail(e.target.value)} className="h-9" />
            <Input type="password" placeholder="Passord" value={password} onChange={e => setPassword(e.target.value)} className="h-9" />
            <Button type="submit" size="sm">Logg inn</Button>
          </form>
          {authError && <p className="text-sm text-destructive mt-1">{authError}</p>}
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 border-r shrink-0">
          {Sidebar}
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileNavOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)} />
            <aside className="fixed top-0 left-0 h-full w-72 z-50 lg:hidden border-r shadow-lg">
              {Sidebar}
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-muted-foreground p-8">Laster artikler...</p>
          ) : !selected ? (
            <div className="text-center py-20 px-4">
              <p className="text-muted-foreground text-lg">Ingen artikler publisert ennå.</p>
            </div>
          ) : (
            <article className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
              {selected.cover_image_url && (
                <img
                  src={selected.cover_image_url}
                  alt={selected.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
                />
              )}
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  {new Date(selected.created_at).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {!selected.published && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Utkast</span>
                )}
                {user && (
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditingArticle(selected); setShowEditor(true); }}>
                      <Pencil className="h-4 w-4 mr-1" /> Rediger
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(selected.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Slett
                    </Button>
                  </div>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{selected.title}</h1>

              {selected.article_type === 'pdf' && selected.pdf_url ? (
                <PdfViewer url={selected.pdf_url} title={selected.title} />
              ) : (
                <div
                  className="prose prose-lg max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: selected.content || '' }}
                />
              )}

              <div className="mt-12 pt-6 border-t">
                <Link to={`/artikler/${selected.slug}`} className="text-sm text-primary hover:underline">
                  Åpne som egen side →
                </Link>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
};

export default Artikler;
