import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import SoraProcess from "./pages/SoraProcess";
import Sora from "./pages/Sora";
import Logg from "./pages/Logg";
import Artikler from "./pages/Artikler";
import Artikkel from "./pages/Artikkel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="/sora-prosess" element={<SoraProcess />} />
          <Route path="/sora" element={<Sora />} />
          <Route path="/logg" element={<Logg />} />
          <Route path="/artikler" element={<Artikler />} />
          <Route path="/artikler/:slug" element={<Artikkel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
