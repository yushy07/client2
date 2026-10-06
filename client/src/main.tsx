import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Cache same-site imagery in the background once the page is usable.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/media-cache-sw.js", { scope: "/" }).then(async () => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")) return;

      await new Promise((resolve) => window.setTimeout(resolve, 1800));
      const urls = Array.from(document.querySelectorAll("img[src], video[poster]"))
        .map((element) => element instanceof HTMLImageElement ? element.currentSrc || element.src : (element as HTMLVideoElement).poster)
        .filter((url, index, all) => url && new URL(url, location.href).origin === location.origin && all.indexOf(url) === index);
      const worker = (await navigator.serviceWorker.ready).active;
      if (!worker) return;

      let offset = 0;
      const warmBatch = () => {
        worker.postMessage({ type: "PREFETCH_MEDIA", urls: urls.slice(offset, offset + 8) });
        offset += 8;
        if (offset < urls.length) window.setTimeout(warmBatch, 4000);
      };
      const start = () => warmBatch();
      window.setTimeout(start, 2500);
      
    }).catch(() => undefined);
  }, { once: true });
}
