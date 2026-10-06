import { Link } from "@/lib/router-compat";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Article = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  published: boolean;
};

interface ArticleSidebarProps {
  open: boolean;
  onClose: () => void;
  articles: Article[];
}

const ArticleSidebar = ({ open, onClose, articles }: ArticleSidebarProps) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay on mobile */}
      <div
        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        onClick={onClose}
      />
      
      <aside className="fixed lg:relative z-40 top-0 left-0 h-full w-72 bg-card border-r flex flex-col shadow-lg lg:shadow-none">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Artikler</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {articles.map(article => (
            <Link
              key={article.id}
              to={`/artikler/${article.slug}`}
              className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors text-foreground"
              onClick={onClose}
            >
              <span className="line-clamp-1">{article.title}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(article.created_at).toLocaleDateString('nb-NO')}
              </span>
              {!article.published && (
                <span className="text-xs text-yellow-600 ml-1">(utkast)</span>
              )}
            </Link>
          ))}
          {articles.length === 0 && (
            <p className="text-sm text-muted-foreground px-3 py-2">Ingen artikler ennå</p>
          )}
        </nav>

        <div className="p-4 border-t">
          <a
            href="https://avisafe.no"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Tilbake til avisafe.no
          </a>
        </div>
      </aside>
    </>
  );
};

export default ArticleSidebar;
