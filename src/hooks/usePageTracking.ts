import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, startPageTracking, endPageTracking } from "@/lib/analytics";

export function usePageTracking() {
  const location = useLocation();
  const startRef = useRef<number>(performance.now());
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPathRef.current && lastPathRef.current !== path) {
      const duration = Math.round(performance.now() - startRef.current);
      void trackPageView(lastPathRef.current, duration);
      endPageTracking();
    }
    startRef.current = performance.now();
    lastPathRef.current = path;
    void trackPageView(path);
    startPageTracking(path);
  }, [location.pathname, location.search]);


  useEffect(() => {
    const onHide = () => {
      if (!lastPathRef.current) return;
      const duration = Math.round(performance.now() - startRef.current);
      void trackPageView(lastPathRef.current, duration);
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);
}
