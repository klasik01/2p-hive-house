import { useEffect, useState } from "react";

/**
 * Jednoduchý hash router.
 *
 * Formát hashe:
 *   #/                     -> route "/"
 *   #/#vcelin              -> route "/" + sub-anchor "vcelin"
 *   #/rezervace            -> route "/rezervace"
 *   #/kontakt              -> route "/kontakt"
 *   (žádný hash)           -> route "/"
 *
 * Po změně routy scrollneme na anchor (je-li) nebo nahoru.
 * Legacy anchor `#vcelin` (bez lomítka) je tolerován a normalizován.
 */
export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(() => parse(window.location.hash).route);

  useEffect(() => {
    const onChange = () => {
      const { route: next, anchor } = parse(window.location.hash);
      setRoute((prev) => (prev === next ? prev : next));
      // Defer scroll — počkej na re-render nové stránky.
      requestAnimationFrame(() => {
        if (anchor) {
          const el = document.getElementById(anchor);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

function parse(hash: string): { route: string; anchor: string | null } {
  if (!hash || hash === "#") return { route: "/", anchor: null };

  // Typický formát: "#/cesta" nebo "#/#anchor" nebo jen "#anchor"
  const raw = hash.replace(/^#/, "");            // odstraň první "#"
  // Podpora "#/path#anchor"
  if (raw.startsWith("/")) {
    const rest = raw.slice(1); // "rezervace" / "" / "#anchor" / "kontakt"
    if (rest.startsWith("#")) {
      return { route: "/", anchor: rest.slice(1).toLowerCase() || null };
    }
    const [path, anchor] = rest.split("#");
    if (!path) return { route: "/", anchor: anchor?.toLowerCase() || null };
    return { route: "/" + path.toLowerCase(), anchor: anchor?.toLowerCase() || null };
  }
  // Legacy "#vcelin" → homepage + anchor
  return { route: "/", anchor: raw.toLowerCase() };
}
