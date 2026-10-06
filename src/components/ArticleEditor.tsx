import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Image, Loader2 } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";

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

interface ArticleEditorProps {
  article: Article | null;
  onSaved: () => void;
  onCancel: () => void;
}

const ArticleEditor = ({ article, onSaved, onCancel }: ArticleEditorProps) => {
  const [title, setTitle] = useState(article?.title || "");
  const [articleType, setArticleType] = useState<'richtext' | 'pdf'>(
    (article?.article_type as 'richtext' | 'pdf') || 'richtext'
  );
  const [coverImageUrl, setCoverImageUrl] = useState(article?.cover_image_url || "");
  const [pdfUrl, setPdfUrl] = useState(article?.pdf_url || "");
  const [published, setPublished] = useState(article?.published || false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({ HTMLAttributes: { class: 'max-w-full rounded-lg' } }),
    ],
    content: article?.content || "<p>Skriv artikkelen din her...</p>",
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[300px] focus:outline-hidden p-4',
      },
    },
  });

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const uploadFile = async (file: File, folder: string) => {
    const ext = file.name.split('.').pop();
    const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from('article-assets').upload(name, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('article-assets').getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'covers');
      setCoverImageUrl(url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'pdfs');
      setPdfUrl(url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
  };

  const insertImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;
      setUploading(true);
      try {
        const url = await uploadFile(file, 'images');
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        console.error('Image upload failed:', err);
      }
      setUploading(false);
    };
    input.click();
  }, [editor]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);

    const slug = article?.slug || generateSlug(title);
    const payload = {
      title,
      slug,
      content: articleType === 'richtext' ? editor?.getHTML() || '' : null,
      pdf_url: articleType === 'pdf' ? pdfUrl : null,
      cover_image_url: coverImageUrl || null,
      article_type: articleType,
      published,
    };

    let error;
    if (article) {
      ({ error } = await supabase.from("articles").update(payload).eq("id", article.id));
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      ({ error } = await supabase.from("articles").insert({ ...payload, author_id: user!.id }));
    }

    if (error) {
      console.error('Save error:', error);
      alert('Kunne ikke lagre artikkelen: ' + error.message);
    } else {
      onSaved();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Tilbake
        </Button>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="rounded-sm" />
            Publisert
          </label>
          <Button onClick={handleSave} disabled={saving || !title.trim()}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
            {article ? 'Oppdater' : 'Lagre'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Tittel</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Skriv tittel..."
            className="text-lg font-semibold mt-1"
          />
        </div>

        {/* Article type toggle */}
        <div className="flex gap-2">
          <Button
            variant={articleType === 'richtext' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setArticleType('richtext')}
          >
            Rik tekst
          </Button>
          <Button
            variant={articleType === 'pdf' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setArticleType('pdf')}
          >
            PDF-opplasting
          </Button>
        </div>

        {/* Cover image */}
        <div>
          <Label>Coverbilde (valgfritt)</Label>
          <div className="flex items-center gap-3 mt-1">
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-muted transition-colors">
                <Upload className="h-4 w-4" />
                {coverImageUrl ? 'Bytt bilde' : 'Last opp bilde'}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </label>
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {coverImageUrl && (
            <img src={coverImageUrl} alt="Cover" className="mt-2 h-32 object-cover rounded-md" />
          )}
        </div>

        {/* Content area */}
        {articleType === 'richtext' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Innhold</Label>
              <Button variant="outline" size="sm" onClick={insertImage} disabled={uploading}>
                <Image className="h-4 w-4 mr-1" /> Sett inn bilde
              </Button>
            </div>
            {/* Toolbar */}
            {editor && (
              <div className="flex flex-wrap gap-1 mb-2 p-2 border rounded-t-md bg-muted/30">
                <Button size="sm" variant={editor.isActive('bold') ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleBold().run()}>
                  <strong>B</strong>
                </Button>
                <Button size="sm" variant={editor.isActive('italic') ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <em>I</em>
                </Button>
                <Button size="sm" variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                  H2
                </Button>
                <Button size="sm" variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                  H3
                </Button>
                <Button size="sm" variant={editor.isActive('bulletList') ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                  • Liste
                </Button>
                <Button size="sm" variant={editor.isActive('orderedList') ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                  1. Liste
                </Button>
                <Button size="sm" variant={editor.isActive('blockquote') ? 'default' : 'ghost'} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                  " Sitat
                </Button>
              </div>
            )}
            <div className="border rounded-b-md bg-card">
              <EditorContent editor={editor} />
            </div>
          </div>
        ) : (
          <div>
            <Label>PDF-fil</Label>
            <div className="flex items-center gap-3 mt-1">
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  {pdfUrl ? 'Bytt PDF' : 'Last opp PDF'}
                </div>
                <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
              </label>
              {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {pdfUrl && (
              <iframe src={pdfUrl} className="w-full h-96 mt-3 rounded-md border" title="PDF preview" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;
