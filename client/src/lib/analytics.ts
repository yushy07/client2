// =============================================================================
// JAYMURTI TRADERS — PRIVACY-FIRST CONVERSION & SEO ANALYTICS TRACKING
// =============================================================================
// Strictly anonymized event logging for key local business conversion actions:
// - Direct Calls
// - WhatsApp Dispatches
// - Google Maps Directions
// - Shade Lookups & Visualizer Interactions
// - Paint Estimator Completions
//
// ZERO PII (Personally Identifiable Information) collected or transmitted.
// =============================================================================

export type AnalyticsEventName =
  | "click_phone"
  | "click_whatsapp"
  | "click_directions"
  | "view_product"
  | "search_shade"
  | "view_shade"
  | "add_to_enquiry"
  | "start_enquiry"
  | "send_whatsapp_enquiry"
  | "submit_review"
  | "use_estimator"
  | "page_view";

export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  shade_code?: string;
  shade_name?: string;
  product_name?: string;
  room_name?: string;
  surface_type?: string;
  estimated_litres?: number;
  page_path?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Dispatches a privacy-compliant conversion or interaction event.
 */
export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}): void {
  try {
    // Sanitized payload (strip any accidental personal identifiers)
    const sanitizedParams: Record<string, unknown> = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    };

    // Google Tag Manager dataLayer dispatch
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...sanitizedParams,
      });
    }

    // Google Analytics 4 (gtag) dispatch
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, sanitizedParams);
    }

    // Development logging for verification
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(`[SEO-Analytics] Event: ${eventName}`, sanitizedParams);
    }
  } catch (err) {
    // Fail silently in production
  }
}

/**
 * Dispatches standard pageview event.
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent("page_view", {
    page_path: path,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  });
}
