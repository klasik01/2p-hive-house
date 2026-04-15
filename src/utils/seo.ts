import type { SeoMeta } from "../types";

/**
 * Aktualizuje <title> a <meta> tagy pro SEO dynamicky.
 * Používá se z komponenty SEOHead.
 */
export function applySeo(meta: SeoMeta) {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  setMeta("name", "description", meta.description);
  if (meta.keywords) setMeta("name", "keywords", meta.keywords);
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  if (meta.ogImage) setMeta("property", "og:image", meta.ogImage);
  if (meta.canonical) setLink("canonical", meta.canonical);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
