import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

export function usePageTracking() {
  const location = useLocation();
  const startRef = useRef<number>(performance.now());
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    const path = location.pathname + location.search;
    // Track previous page duration on change
    if (lastPathRef.current && lastPathRef.current !== path) {
      const duration = Math.round(performance.now() - startRef.current);
      void trackPageView(lastPathRef.current, duration);
    }
    startRef.current = performance.now();
    lastPathRef.current = path;
    // Track new page view (no duration yet)
    void trackPageView(path);
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
