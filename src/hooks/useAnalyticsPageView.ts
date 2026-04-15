import { useEffect } from "react";
import type { CookieConsentState } from "../types";
import { disableAnalytics, initAnalytics, trackPageView } from "../utils/analytics";

export function useAnalyticsPageView(
  path: string,
  consent: CookieConsentState,
  measurementId?: string,
) {
  useEffect(() => {
    if (!measurementId) return;
    if (consent === "accepted") {
      initAnalytics(measurementId);
      trackPageView(measurementId, path, document.title);
    } else if (consent === "rejected") {
      disableAnalytics(measurementId);
    }
  }, [path, consent, measurementId]);
}
