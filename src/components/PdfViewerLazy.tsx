import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

// react-pdf/pdfjs touch browser-only APIs (DOMMatrix) when the module is
// evaluated, so it is loaded only in the browser, never during server rendering.
const PdfViewer = lazy(() => import("./PdfViewer"));

type Props = { url: string; title?: string };

const Fallback = () => (
  <div className="flex items-center justify-center py-16 text-muted-foreground">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

const PdfViewerLazy = (props: Props) => (
  <ClientOnly fallback={<Fallback />}>
    <Suspense fallback={<Fallback />}>
      <PdfViewer {...props} />
    </Suspense>
  </ClientOnly>
);

export default PdfViewerLazy;
