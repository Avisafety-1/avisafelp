import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Product from "./pages/Product";
import SoraProcess from "./pages/SoraProcess";
import Sora from "./pages/Sora";
import Logg from "./pages/Logg";
import Artikler from "./pages/Artikler";
import Artikkel from "./pages/Artikkel";
import NotFound from "./pages/NotFound";
import Galleri from "./pages/Galleri";
import Operations from "./pages/Operations";
import Statistikk from "./pages/Statistikk";
import Personvern from "./pages/Personvern";
import SiteHeader from "./components/SiteHeader";
import CookieBanner from "./components/CookieBanner";
import { usePageTracking } from "./hooks/usePageTracking";
import { initAnalytics } from "./lib/analytics";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/artikler") || location.pathname.startsWith("/statistikk");
  usePageTracking();
  return (
    <>
      {!hideHeader && <SiteHeader />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:handle" element={<Product />} />
        <Route path="/sora-prosess" element={<SoraProcess />} />
        <Route path="/sora" element={<Sora />} />
        <Route path="/logg" element={<Logg />} />
        <Route path="/artikler" element={<Artikler />} />
        <Route path="/artikler/:slug" element={<Artikkel />} />
        <Route path="/galleri" element={<Galleri />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/operasjoner" element={<Operations />} />
        <Route path="/statistikk" element={<Statistikk />} />
        <Route path="/personvern" element={<Personvern />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  );
};

const App = () => {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
