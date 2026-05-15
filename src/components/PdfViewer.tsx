import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  title?: string;
}

const PdfViewer = ({ url, title }: PdfViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full bg-muted/30 rounded-lg border overflow-hidden"
      >
        {error ? (
          <div className="p-8 text-center">
            <p className="text-destructive mb-3">Kunne ikke laste PDF.</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" /> Åpne PDF i ny fane
              </Button>
            </a>
          </div>
        ) : (
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(e) => {
              console.error("PDF load error:", e);
              setError(e.message);
            }}
            loading={
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" /> Laster PDF...
              </div>
            }
          >
            {width > 0 &&
              Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="flex justify-center border-b last:border-b-0 bg-card">
                  <Page
                    pageNumber={i + 1}
                    width={width}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              ))}
          </Document>
        )}
      </div>
      <div className="mt-4">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" /> Åpne PDF i ny fane
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PdfViewer;
