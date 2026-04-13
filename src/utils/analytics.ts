declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initAnalytics(measurementId: string) {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

export function disableAnalytics(measurementId: string) {
  // @ts-expect-error GA disable property
  window[`ga-disable-${measurementId}`] = true;
}

export function trackPageView(measurementId: string, path: string, title: string) {
  window.gtag?.("config", measurementId, {
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}
