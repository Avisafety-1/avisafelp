import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelLeftClose, Plus, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleEditor from "@/components/ArticleEditor";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    if (!user) {
      query = query.eq("published", true);
    }
    const { data, error } = await query;
    if (error) console.error(error);
    else setArticles((data as Article[]) || []);
    setLoading(false);
  };

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

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne artikkelen?")) return;
    await supabase.from("articles").delete().eq("id", id);
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

  return (
    <div className="min-h-screen bg-background flex">
      <ArticleSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        articles={articles}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </Button>
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              AviSafe
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <h1 className="text-xl font-semibold text-foreground">Artikler</h1>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button onClick={() => setShowEditor(true)} size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Ny artikkel
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
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

        {/* Login form */}
        {showLogin && !user && (
          <div className="px-4 sm:px-8 py-4 border-b bg-muted/30">
            <form onSubmit={handleLogin} className="flex items-center gap-2 max-w-md">
              <Input type="email" placeholder="E-post" value={email} onChange={e => setEmail(e.target.value)} className="h-9" />
              <Input type="password" placeholder="Passord" value={password} onChange={e => setPassword(e.target.value)} className="h-9" />
              <Button type="submit" size="sm">Logg inn</Button>
            </form>
            {authError && <p className="text-sm text-destructive mt-1">{authError}</p>}
          </div>
        )}

        {/* Article list */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full">
          {loading ? (
            <p className="text-muted-foreground">Laster artikler...</p>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Ingen artikler publisert ennå.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map(article => (
                <Link
                  key={article.id}
                  to={`/artikler/${article.slug}`}
                  className="block group"
                >
                  <article className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-card">
                    {article.cover_image_url && (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {!article.published && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Utkast</span>
                        )}
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          {article.article_type === 'pdf' ? 'PDF' : 'Artikkel'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      {article.content && (
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {article.content.replace(/<[^>]*>/g, '').substring(0, 200)}
                        </p>
                      )}
                      {user && (
                        <div className="flex gap-2 mt-3" onClick={e => e.preventDefault()}>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>Rediger</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>Slett</Button>
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Artikler;
