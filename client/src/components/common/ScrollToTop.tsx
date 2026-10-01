import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Ensures smooth scroll restoration on route change:
 * 1. If an in-page hash is present (e.g. /about#step-inside), scrolls smoothly to the element.
 * 2. If no hash is present, resets scroll to top (0, 0) immediately.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      // Small timeout to allow DOM to render
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
}
